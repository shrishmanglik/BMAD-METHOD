/**
 * BMAD Framework - Agent Runtime
 *
 * Manages agent lifecycle with:
 * - Agent loading and compilation
 * - Lifecycle hooks (load, activate, deactivate)
 * - Memory/sidecar management
 * - Inter-agent communication
 * - Context and state management
 *
 * @module framework/engine/agent-runtime
 */

const { EventEmitter } = require('events');
const crypto = require('crypto');

// ============================================================================
// Constants
// ============================================================================

const AGENT_STATES = {
  UNLOADED: 'unloaded',
  LOADING: 'loading',
  LOADED: 'loaded',
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  ERROR: 'error',
};

const EVENTS = {
  AGENT_LOAD: 'agent:load',
  AGENT_ACTIVATE: 'agent:activate',
  AGENT_DEACTIVATE: 'agent:deactivate',
  AGENT_ERROR: 'agent:error',
  COMMAND_START: 'command:start',
  COMMAND_COMPLETE: 'command:complete',
  COMMAND_ERROR: 'command:error',
  MEMORY_UPDATE: 'memory:update',
  CONTEXT_CHANGE: 'context:change',
};

// ============================================================================
// AgentInstance Class
// ============================================================================

/**
 * Represents a loaded agent instance.
 */
class AgentInstance {
  constructor(definition, options = {}) {
    this.id = options.id || crypto.randomUUID();
    this.definition = definition;
    this.state = AGENT_STATES.UNLOADED;

    // Metadata from definition
    this.metadata = {
      agentId: definition.agent.metadata.id,
      name: definition.agent.metadata.name,
      title: definition.agent.metadata.title,
      icon: definition.agent.metadata.icon,
      module: definition.agent.metadata.module || 'core',
    };

    // Persona
    this.persona = definition.agent.persona;

    // Commands from menu
    this.commands = this.parseCommands(definition.agent.menu);

    // State
    this.context = options.context || {};
    this.memory = options.memory || {};
    this.variables = options.variables || {};

    // Session
    this.sessionId = options.sessionId || crypto.randomUUID();
    this.loadedAt = null;
    this.activatedAt = null;
    this.lastActiveAt = null;

    // Stats
    this.stats = {
      commandsExecuted: 0,
      errorsEncountered: 0,
      totalActiveTime: 0,
    };
  }

  /**
   * Parse menu items into command definitions.
   */
  parseCommands(menu) {
    const commands = new Map();

    for (const item of menu) {
      if (item.trigger) {
        // Legacy format
        commands.set(item.trigger, {
          trigger: item.trigger,
          description: item.description,
          type: this.determineCommandType(item),
          target: this.getCommandTarget(item),
          options: {
            ideOnly: item['ide-only'] || false,
            webOnly: item['web-only'] || false,
            discussion: item.discussion || false,
            deprecated: item.deprecated || false,
          },
        });
      } else if (item.multi && item.triggers) {
        // Multi format
        for (const trigger of item.triggers) {
          const triggerName = trigger.trigger || Object.keys(trigger)[0];
          const triggerData = trigger.trigger ? trigger : trigger[triggerName];

          commands.set(triggerName, {
            trigger: triggerName,
            description: item.multi,
            type: triggerData.type || 'action',
            target: triggerData.route || triggerData.action,
            input: triggerData.input,
            options: {
              discussion: item.discussion || false,
            },
          });
        }
      }
    }

    return commands;
  }

  /**
   * Determine command type from menu item.
   */
  determineCommandType(item) {
    if (item.workflow) return 'workflow';
    if (item['validate-workflow']) return 'validate-workflow';
    if (item.exec) return 'exec';
    if (item.action) return 'action';
    if (item.tmpl) return 'template';
    if (item.data) return 'data';
    return 'unknown';
  }

  /**
   * Get command target path from menu item.
   */
  getCommandTarget(item) {
    return (
      item.workflow ||
      item['validate-workflow'] ||
      item.exec ||
      item.action ||
      item.tmpl ||
      item.data
    );
  }

  /**
   * Get a command by trigger.
   */
  getCommand(trigger) {
    return this.commands.get(trigger);
  }

  /**
   * List all available commands.
   */
  listCommands(options = {}) {
    const { includeDeprecated = false, platform = 'ide' } = options;

    return [...this.commands.values()].filter((cmd) => {
      if (!includeDeprecated && cmd.options.deprecated) return false;
      if (platform === 'ide' && cmd.options.webOnly) return false;
      if (platform === 'web' && cmd.options.ideOnly) return false;
      return true;
    });
  }

  /**
   * Update agent memory.
   */
  updateMemory(key, value) {
    this.memory[key] = value;
    this.lastActiveAt = new Date().toISOString();
  }

  /**
   * Get agent memory.
   */
  getMemory(key) {
    return key ? this.memory[key] : { ...this.memory };
  }

  /**
   * Clear agent memory.
   */
  clearMemory() {
    this.memory = {};
  }

  /**
   * Update context.
   */
  updateContext(updates) {
    Object.assign(this.context, updates);
    this.lastActiveAt = new Date().toISOString();
  }

  /**
   * Serialize instance for persistence.
   */
  toJSON() {
    return {
      id: this.id,
      metadata: this.metadata,
      state: this.state,
      context: this.context,
      memory: this.memory,
      variables: this.variables,
      sessionId: this.sessionId,
      timing: {
        loadedAt: this.loadedAt,
        activatedAt: this.activatedAt,
        lastActiveAt: this.lastActiveAt,
      },
      stats: this.stats,
    };
  }
}

// ============================================================================
// AgentRuntime Class
// ============================================================================

/**
 * Runtime environment for managing agents.
 */
class AgentRuntime extends EventEmitter {
  constructor(options = {}) {
    super();
    this.options = {
      maxConcurrentAgents: 5,
      memoryPersistence: true,
      autoSuspend: true,
      suspendAfterMs: 5 * 60 * 1000, // 5 minutes
      ...options,
    };

    this.agents = new Map();
    this.activeAgent = null;
    this.hooks = new Map();
    this.memoryStore = options.memoryStore || new Map();
    this.configResolver = options.configResolver || ((path) => ({}));
  }

  // --------------------------------------------------------------------------
  // Agent Lifecycle
  // --------------------------------------------------------------------------

  /**
   * Load an agent from definition.
   */
  async loadAgent(definition, options = {}) {
    const instance = new AgentInstance(definition, {
      ...options,
      sessionId: this.options.sessionId,
    });

    instance.state = AGENT_STATES.LOADING;

    try {
      // Load persisted memory if available
      if (this.options.memoryPersistence) {
        const persistedMemory = await this.loadPersistedMemory(instance.metadata.agentId);
        if (persistedMemory) {
          instance.memory = persistedMemory;
        }
      }

      // Execute critical_actions
      if (definition.agent.critical_actions) {
        await this.executeCriticalActions(instance, definition.agent.critical_actions);
      }

      // Run on_load lifecycle hooks
      if (definition.agent.lifecycle?.on_load) {
        await this.executeLifecycleHooks(instance, definition.agent.lifecycle.on_load);
      }

      instance.state = AGENT_STATES.LOADED;
      instance.loadedAt = new Date().toISOString();

      this.agents.set(instance.id, instance);

      // Run registered hooks
      await this.runHooks('agent:load', instance);

      this.emit(EVENTS.AGENT_LOAD, {
        instanceId: instance.id,
        agentId: instance.metadata.agentId,
        name: instance.metadata.name,
      });

      return instance;
    } catch (error) {
      instance.state = AGENT_STATES.ERROR;
      this.emit(EVENTS.AGENT_ERROR, {
        instanceId: instance.id,
        error: { code: 'LOAD_ERROR', message: error.message },
      });
      throw error;
    }
  }

  /**
   * Execute critical actions during agent load.
   */
  async executeCriticalActions(instance, actions) {
    for (const action of actions) {
      try {
        // Parse action string for variable references
        const resolvedAction = this.resolveVariables(action, instance);

        // Actions are typically instructions for the LLM
        // Store them for context
        if (!instance.context._criticalActions) {
          instance.context._criticalActions = [];
        }
        instance.context._criticalActions.push(resolvedAction);
      } catch (error) {
        console.warn(`Failed to execute critical action: ${action}`, error);
      }
    }
  }

  /**
   * Execute lifecycle hooks.
   */
  async executeLifecycleHooks(instance, hooks) {
    for (const hook of hooks) {
      try {
        const resolvedHook = this.resolveVariables(hook, instance);
        // Hooks are stored for execution by the LLM
        if (!instance.context._lifecycleHooks) {
          instance.context._lifecycleHooks = [];
        }
        instance.context._lifecycleHooks.push(resolvedHook);
      } catch (error) {
        console.warn(`Failed to execute lifecycle hook: ${hook}`, error);
      }
    }
  }

  /**
   * Activate an agent (make it the current active agent).
   */
  async activateAgent(instanceId) {
    const instance = this.agents.get(instanceId);
    if (!instance) {
      throw new Error(`Agent instance not found: ${instanceId}`);
    }

    if (instance.state === AGENT_STATES.ERROR) {
      throw new Error(`Cannot activate agent in error state`);
    }

    // Deactivate current active agent
    if (this.activeAgent && this.activeAgent.id !== instanceId) {
      await this.deactivateAgent(this.activeAgent.id);
    }

    // Activate the agent
    instance.state = AGENT_STATES.ACTIVE;
    instance.activatedAt = new Date().toISOString();
    instance.lastActiveAt = instance.activatedAt;
    this.activeAgent = instance;

    // Run on_activate lifecycle hooks
    const definition = instance.definition;
    if (definition.agent.lifecycle?.on_activate) {
      await this.executeLifecycleHooks(instance, definition.agent.lifecycle.on_activate);
    }

    // Run registered hooks
    await this.runHooks('agent:activate', instance);

    this.emit(EVENTS.AGENT_ACTIVATE, {
      instanceId: instance.id,
      agentId: instance.metadata.agentId,
      name: instance.metadata.name,
    });

    return instance;
  }

  /**
   * Deactivate an agent.
   */
  async deactivateAgent(instanceId) {
    const instance = this.agents.get(instanceId);
    if (!instance) {
      throw new Error(`Agent instance not found: ${instanceId}`);
    }

    if (instance.state !== AGENT_STATES.ACTIVE) {
      return instance;
    }

    // Calculate active time
    if (instance.activatedAt) {
      const activeTime = Date.now() - new Date(instance.activatedAt).getTime();
      instance.stats.totalActiveTime += activeTime;
    }

    // Run on_deactivate lifecycle hooks
    const definition = instance.definition;
    if (definition.agent.lifecycle?.on_deactivate) {
      await this.executeLifecycleHooks(instance, definition.agent.lifecycle.on_deactivate);
    }

    // Persist memory
    if (this.options.memoryPersistence) {
      await this.persistMemory(instance);
    }

    instance.state = AGENT_STATES.SUSPENDED;

    if (this.activeAgent?.id === instanceId) {
      this.activeAgent = null;
    }

    // Run registered hooks
    await this.runHooks('agent:deactivate', instance);

    this.emit(EVENTS.AGENT_DEACTIVATE, {
      instanceId: instance.id,
      agentId: instance.metadata.agentId,
      name: instance.metadata.name,
    });

    return instance;
  }

  /**
   * Unload an agent completely.
   */
  async unloadAgent(instanceId) {
    const instance = this.agents.get(instanceId);
    if (!instance) {
      return;
    }

    if (instance.state === AGENT_STATES.ACTIVE) {
      await this.deactivateAgent(instanceId);
    }

    // Persist final memory state
    if (this.options.memoryPersistence) {
      await this.persistMemory(instance);
    }

    instance.state = AGENT_STATES.UNLOADED;
    this.agents.delete(instanceId);
  }

  // --------------------------------------------------------------------------
  // Command Execution
  // --------------------------------------------------------------------------

  /**
   * Execute a command on the active agent.
   */
  async executeCommand(trigger, input = {}) {
    if (!this.activeAgent) {
      throw new Error('No active agent');
    }

    const command = this.activeAgent.getCommand(trigger);
    if (!command) {
      throw new Error(`Unknown command: ${trigger}`);
    }

    // Run before_command hooks
    const definition = this.activeAgent.definition;
    if (definition.agent.lifecycle?.before_command) {
      await this.executeLifecycleHooks(this.activeAgent, definition.agent.lifecycle.before_command);
    }

    this.emit(EVENTS.COMMAND_START, {
      instanceId: this.activeAgent.id,
      trigger,
      command,
    });

    try {
      this.activeAgent.lastActiveAt = new Date().toISOString();
      this.activeAgent.stats.commandsExecuted++;

      // Resolve command target path
      const target = this.resolveVariables(command.target, this.activeAgent);

      const result = {
        trigger,
        type: command.type,
        target,
        description: command.description,
        input,
        options: command.options,
      };

      // Run after_command hooks
      if (definition.agent.lifecycle?.after_command) {
        await this.executeLifecycleHooks(this.activeAgent, definition.agent.lifecycle.after_command);
      }

      this.emit(EVENTS.COMMAND_COMPLETE, {
        instanceId: this.activeAgent.id,
        trigger,
        result,
      });

      return result;
    } catch (error) {
      this.activeAgent.stats.errorsEncountered++;

      // Run on_error hooks
      if (definition.agent.lifecycle?.on_error) {
        await this.executeLifecycleHooks(this.activeAgent, definition.agent.lifecycle.on_error);
      }

      this.emit(EVENTS.COMMAND_ERROR, {
        instanceId: this.activeAgent.id,
        trigger,
        error: { code: 'COMMAND_ERROR', message: error.message },
      });

      throw error;
    }
  }

  // --------------------------------------------------------------------------
  // Memory Management
  // --------------------------------------------------------------------------

  /**
   * Load persisted memory for an agent.
   */
  async loadPersistedMemory(agentId) {
    return this.memoryStore.get(agentId);
  }

  /**
   * Persist agent memory.
   */
  async persistMemory(instance) {
    if (Object.keys(instance.memory).length > 0) {
      this.memoryStore.set(instance.metadata.agentId, instance.memory);
      this.emit(EVENTS.MEMORY_UPDATE, {
        agentId: instance.metadata.agentId,
        memory: instance.memory,
      });
    }
  }

  /**
   * Clear persisted memory for an agent.
   */
  async clearPersistedMemory(agentId) {
    this.memoryStore.delete(agentId);
  }

  // --------------------------------------------------------------------------
  // Hook System
  // --------------------------------------------------------------------------

  /**
   * Register a hook for an event.
   */
  registerHook(event, handler) {
    if (!this.hooks.has(event)) {
      this.hooks.set(event, []);
    }
    this.hooks.get(event).push(handler);
    return this;
  }

  /**
   * Run all hooks for an event.
   */
  async runHooks(event, ...args) {
    const handlers = this.hooks.get(event) || [];
    for (const handler of handlers) {
      await handler(...args);
    }
  }

  // --------------------------------------------------------------------------
  // Utility Methods
  // --------------------------------------------------------------------------

  /**
   * Resolve variables in a string.
   */
  resolveVariables(str, instance) {
    if (typeof str !== 'string') return str;

    return str.replace(/\{([^}]+)\}/g, (match, varName) => {
      // Check instance variables first
      if (instance.variables[varName] !== undefined) {
        return instance.variables[varName];
      }

      // Check instance context
      if (instance.context[varName] !== undefined) {
        return instance.context[varName];
      }

      // Check runtime config
      const config = this.configResolver(varName);
      if (config !== undefined) {
        return config;
      }

      // Return original if not found
      return match;
    });
  }

  /**
   * Get the currently active agent.
   */
  getActiveAgent() {
    return this.activeAgent;
  }

  /**
   * Get an agent instance by ID.
   */
  getAgent(instanceId) {
    return this.agents.get(instanceId);
  }

  /**
   * Get all loaded agents.
   */
  getAllAgents() {
    return [...this.agents.values()];
  }

  /**
   * Find agent by metadata ID.
   */
  findAgentByMetadataId(agentId) {
    return [...this.agents.values()].find((a) => a.metadata.agentId === agentId);
  }

  /**
   * Get runtime statistics.
   */
  getStats() {
    return {
      loadedAgents: this.agents.size,
      activeAgent: this.activeAgent?.metadata.name || null,
      totalCommandsExecuted: [...this.agents.values()].reduce(
        (sum, a) => sum + a.stats.commandsExecuted,
        0
      ),
      totalErrors: [...this.agents.values()].reduce(
        (sum, a) => sum + a.stats.errorsEncountered,
        0
      ),
    };
  }

  /**
   * Auto-suspend inactive agents.
   */
  async autoSuspend() {
    if (!this.options.autoSuspend) return;

    const cutoff = Date.now() - this.options.suspendAfterMs;

    for (const [id, instance] of this.agents) {
      if (
        instance.state === AGENT_STATES.ACTIVE &&
        instance.lastActiveAt &&
        new Date(instance.lastActiveAt).getTime() < cutoff &&
        instance.id !== this.activeAgent?.id
      ) {
        await this.deactivateAgent(id);
      }
    }
  }
}

// ============================================================================
// Exports
// ============================================================================

module.exports = {
  AgentRuntime,
  AgentInstance,
  AGENT_STATES,
  EVENTS,
};
