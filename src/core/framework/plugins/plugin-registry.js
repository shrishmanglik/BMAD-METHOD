/**
 * BMAD Framework - Plugin Registry and System
 *
 * Provides a robust plugin architecture with:
 * - Plugin registration and discovery
 * - Hook-based extension points
 * - Plugin lifecycle management
 * - Dependency resolution
 * - Plugin isolation
 *
 * @module framework/plugins/plugin-registry
 */

const { EventEmitter } = require('events');
const crypto = require('crypto');

// ============================================================================
// Constants
// ============================================================================

const PLUGIN_STATES = {
  REGISTERED: 'registered',
  INITIALIZING: 'initializing',
  ACTIVE: 'active',
  DISABLED: 'disabled',
  ERROR: 'error',
};

const HOOK_PHASES = {
  BEFORE: 'before',
  AFTER: 'after',
  ON: 'on',
};

/**
 * Built-in extension points that plugins can hook into.
 */
const EXTENSION_POINTS = {
  // Lifecycle hooks
  'system:startup': { phase: HOOK_PHASES.ON, async: true },
  'system:shutdown': { phase: HOOK_PHASES.ON, async: true },

  // Agent hooks
  'agent:before-load': { phase: HOOK_PHASES.BEFORE, async: true, cancellable: true },
  'agent:after-load': { phase: HOOK_PHASES.AFTER, async: true },
  'agent:before-activate': { phase: HOOK_PHASES.BEFORE, async: true, cancellable: true },
  'agent:after-activate': { phase: HOOK_PHASES.AFTER, async: true },
  'agent:before-command': { phase: HOOK_PHASES.BEFORE, async: true, cancellable: true },
  'agent:after-command': { phase: HOOK_PHASES.AFTER, async: true },
  'agent:error': { phase: HOOK_PHASES.ON, async: true },

  // Workflow hooks
  'workflow:before-start': { phase: HOOK_PHASES.BEFORE, async: true, cancellable: true },
  'workflow:after-complete': { phase: HOOK_PHASES.AFTER, async: true },
  'workflow:before-step': { phase: HOOK_PHASES.BEFORE, async: true, cancellable: true },
  'workflow:after-step': { phase: HOOK_PHASES.AFTER, async: true },
  'workflow:step-error': { phase: HOOK_PHASES.ON, async: true },
  'workflow:checkpoint': { phase: HOOK_PHASES.ON, async: true },

  // Config hooks
  'config:before-load': { phase: HOOK_PHASES.BEFORE, async: true },
  'config:after-load': { phase: HOOK_PHASES.AFTER, async: true },
  'config:validate': { phase: HOOK_PHASES.ON, async: true },

  // File hooks
  'file:before-read': { phase: HOOK_PHASES.BEFORE, async: true },
  'file:after-read': { phase: HOOK_PHASES.AFTER, async: true },
  'file:before-write': { phase: HOOK_PHASES.BEFORE, async: true, cancellable: true },
  'file:after-write': { phase: HOOK_PHASES.AFTER, async: true },

  // Validation hooks
  'validate:agent': { phase: HOOK_PHASES.ON, async: true },
  'validate:workflow': { phase: HOOK_PHASES.ON, async: true },
  'validate:config': { phase: HOOK_PHASES.ON, async: true },

  // Transform hooks (for modifying data)
  'transform:agent-definition': { phase: HOOK_PHASES.ON, async: true },
  'transform:workflow-definition': { phase: HOOK_PHASES.ON, async: true },
  'transform:output': { phase: HOOK_PHASES.ON, async: true },
};

// ============================================================================
// Plugin Class
// ============================================================================

/**
 * Represents a registered plugin.
 */
class Plugin {
  constructor(definition) {
    this.id = definition.id || crypto.randomUUID();
    this.name = definition.name;
    this.version = definition.version || '1.0.0';
    this.description = definition.description || '';
    this.author = definition.author || 'Unknown';

    this.state = PLUGIN_STATES.REGISTERED;
    this.hooks = definition.hooks || {};
    this.provides = definition.provides || [];
    this.dependencies = definition.dependencies || [];

    // Plugin API methods
    this.initialize = definition.initialize || (() => {});
    this.shutdown = definition.shutdown || (() => {});

    // Configuration
    this.config = definition.config || {};
    this.defaultConfig = definition.defaultConfig || {};

    // Metadata
    this.registeredAt = new Date().toISOString();
    this.activatedAt = null;
    this.errorMessage = null;
  }

  /**
   * Serialize plugin info.
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      version: this.version,
      description: this.description,
      author: this.author,
      state: this.state,
      provides: this.provides,
      dependencies: this.dependencies,
      registeredAt: this.registeredAt,
      activatedAt: this.activatedAt,
    };
  }
}

// ============================================================================
// Plugin Registry Class
// ============================================================================

/**
 * Central registry for plugin management.
 */
class PluginRegistry extends EventEmitter {
  constructor(options = {}) {
    super();
    this.options = {
      maxPlugins: 100,
      strictDependencies: true,
      ...options,
    };

    this.plugins = new Map();
    this.hooks = new Map();
    this.extensionPoints = new Map(Object.entries(EXTENSION_POINTS));
    this.provides = new Map();
  }

  // --------------------------------------------------------------------------
  // Registration
  // --------------------------------------------------------------------------

  /**
   * Register a plugin.
   */
  register(definition) {
    // Validate definition
    if (!definition.name) {
      throw new Error('Plugin must have a name');
    }

    // Check for duplicate
    if (this.findByName(definition.name)) {
      throw new Error(`Plugin already registered: ${definition.name}`);
    }

    // Check limit
    if (this.plugins.size >= this.options.maxPlugins) {
      throw new Error(`Maximum plugin limit reached: ${this.options.maxPlugins}`);
    }

    const plugin = new Plugin(definition);

    // Validate hooks
    for (const hookName of Object.keys(plugin.hooks)) {
      if (!this.extensionPoints.has(hookName)) {
        console.warn(`Unknown hook: ${hookName} in plugin ${plugin.name}`);
      }
    }

    // Register provides
    for (const provide of plugin.provides) {
      this.provides.set(provide, plugin.id);
    }

    this.plugins.set(plugin.id, plugin);

    this.emit('plugin:registered', { plugin: plugin.toJSON() });

    return plugin;
  }

  /**
   * Unregister a plugin.
   */
  unregister(pluginId) {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin not found: ${pluginId}`);
    }

    // Check for dependents
    const dependents = this.findDependents(plugin.name);
    if (dependents.length > 0 && this.options.strictDependencies) {
      throw new Error(
        `Cannot unregister plugin ${plugin.name}: required by ${dependents.map((p) => p.name).join(', ')}`
      );
    }

    // Remove hooks
    for (const hookName of Object.keys(plugin.hooks)) {
      this.removeHook(hookName, plugin.id);
    }

    // Remove provides
    for (const provide of plugin.provides) {
      if (this.provides.get(provide) === plugin.id) {
        this.provides.delete(provide);
      }
    }

    this.plugins.delete(pluginId);

    this.emit('plugin:unregistered', { pluginId, pluginName: plugin.name });

    return true;
  }

  // --------------------------------------------------------------------------
  // Lifecycle
  // --------------------------------------------------------------------------

  /**
   * Initialize and activate a plugin.
   */
  async activate(pluginId) {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin not found: ${pluginId}`);
    }

    if (plugin.state === PLUGIN_STATES.ACTIVE) {
      return plugin;
    }

    // Check dependencies
    await this.resolveDependencies(plugin);

    plugin.state = PLUGIN_STATES.INITIALIZING;

    try {
      // Initialize plugin
      await plugin.initialize(this.createPluginContext(plugin));

      // Register hooks
      for (const [hookName, handler] of Object.entries(plugin.hooks)) {
        this.addHook(hookName, plugin.id, handler);
      }

      plugin.state = PLUGIN_STATES.ACTIVE;
      plugin.activatedAt = new Date().toISOString();

      this.emit('plugin:activated', { plugin: plugin.toJSON() });

      return plugin;
    } catch (error) {
      plugin.state = PLUGIN_STATES.ERROR;
      plugin.errorMessage = error.message;

      this.emit('plugin:error', { pluginId, error: error.message });

      throw error;
    }
  }

  /**
   * Deactivate a plugin.
   */
  async deactivate(pluginId) {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin not found: ${pluginId}`);
    }

    if (plugin.state !== PLUGIN_STATES.ACTIVE) {
      return plugin;
    }

    try {
      // Shutdown plugin
      await plugin.shutdown(this.createPluginContext(plugin));

      // Remove hooks
      for (const hookName of Object.keys(plugin.hooks)) {
        this.removeHook(hookName, plugin.id);
      }

      plugin.state = PLUGIN_STATES.DISABLED;

      this.emit('plugin:deactivated', { pluginId, pluginName: plugin.name });

      return plugin;
    } catch (error) {
      plugin.state = PLUGIN_STATES.ERROR;
      plugin.errorMessage = error.message;
      throw error;
    }
  }

  /**
   * Activate all registered plugins.
   */
  async activateAll() {
    // Sort by dependencies
    const sorted = this.topologicalSort();

    for (const plugin of sorted) {
      if (plugin.state === PLUGIN_STATES.REGISTERED) {
        await this.activate(plugin.id);
      }
    }
  }

  /**
   * Deactivate all plugins.
   */
  async deactivateAll() {
    // Reverse order of activation
    const sorted = this.topologicalSort().reverse();

    for (const plugin of sorted) {
      if (plugin.state === PLUGIN_STATES.ACTIVE) {
        await this.deactivate(plugin.id);
      }
    }
  }

  // --------------------------------------------------------------------------
  // Hooks
  // --------------------------------------------------------------------------

  /**
   * Add a hook handler.
   */
  addHook(hookName, pluginId, handler) {
    if (!this.hooks.has(hookName)) {
      this.hooks.set(hookName, []);
    }

    this.hooks.get(hookName).push({
      pluginId,
      handler,
      priority: handler.priority || 100,
    });

    // Sort by priority
    this.hooks.get(hookName).sort((a, b) => a.priority - b.priority);
  }

  /**
   * Remove a hook handler.
   */
  removeHook(hookName, pluginId) {
    if (!this.hooks.has(hookName)) return;

    const handlers = this.hooks.get(hookName);
    const index = handlers.findIndex((h) => h.pluginId === pluginId);

    if (index !== -1) {
      handlers.splice(index, 1);
    }
  }

  /**
   * Execute all handlers for a hook.
   */
  async executeHook(hookName, context = {}) {
    const handlers = this.hooks.get(hookName) || [];
    const extensionPoint = this.extensionPoints.get(hookName);

    if (!extensionPoint) {
      console.warn(`Unknown hook: ${hookName}`);
      return context;
    }

    let result = { ...context };

    for (const { pluginId, handler } of handlers) {
      try {
        const plugin = this.plugins.get(pluginId);
        if (!plugin || plugin.state !== PLUGIN_STATES.ACTIVE) {
          continue;
        }

        const hookResult = await handler(result, this.createPluginContext(plugin));

        // Handle cancellation for cancellable hooks
        if (extensionPoint.cancellable && hookResult?.cancelled) {
          return { ...result, cancelled: true, cancelledBy: plugin.name };
        }

        // Merge result for transform hooks
        if (extensionPoint.phase === HOOK_PHASES.ON && hookResult) {
          result = { ...result, ...hookResult };
        }
      } catch (error) {
        this.emit('hook:error', { hookName, pluginId, error: error.message });

        // Continue with other handlers unless critical
        if (context.strict) {
          throw error;
        }
      }
    }

    return result;
  }

  /**
   * Register a custom extension point.
   */
  registerExtensionPoint(name, config = {}) {
    if (this.extensionPoints.has(name)) {
      throw new Error(`Extension point already exists: ${name}`);
    }

    this.extensionPoints.set(name, {
      phase: config.phase || HOOK_PHASES.ON,
      async: config.async !== false,
      cancellable: config.cancellable || false,
      ...config,
    });

    this.emit('extension-point:registered', { name, config });
  }

  // --------------------------------------------------------------------------
  // Dependency Resolution
  // --------------------------------------------------------------------------

  /**
   * Resolve and activate dependencies for a plugin.
   */
  async resolveDependencies(plugin) {
    for (const dep of plugin.dependencies) {
      // Check if dependency is provided
      const providerId = this.provides.get(dep);

      if (providerId) {
        const provider = this.plugins.get(providerId);
        if (provider && provider.state !== PLUGIN_STATES.ACTIVE) {
          await this.activate(providerId);
        }
        continue;
      }

      // Check if dependency is a plugin name
      const depPlugin = this.findByName(dep);

      if (!depPlugin) {
        if (this.options.strictDependencies) {
          throw new Error(`Missing dependency: ${dep} for plugin ${plugin.name}`);
        }
        console.warn(`Missing optional dependency: ${dep} for plugin ${plugin.name}`);
        continue;
      }

      if (depPlugin.state !== PLUGIN_STATES.ACTIVE) {
        await this.activate(depPlugin.id);
      }
    }
  }

  /**
   * Find plugins that depend on a given plugin.
   */
  findDependents(pluginName) {
    return [...this.plugins.values()].filter(
      (p) => p.dependencies.includes(pluginName) && p.state === PLUGIN_STATES.ACTIVE
    );
  }

  /**
   * Topological sort of plugins by dependencies.
   */
  topologicalSort() {
    const sorted = [];
    const visited = new Set();
    const visiting = new Set();

    const visit = (plugin) => {
      if (visited.has(plugin.id)) return;
      if (visiting.has(plugin.id)) {
        throw new Error(`Circular dependency detected: ${plugin.name}`);
      }

      visiting.add(plugin.id);

      for (const dep of plugin.dependencies) {
        const depPlugin = this.findByName(dep);
        if (depPlugin) {
          visit(depPlugin);
        }
      }

      visiting.delete(plugin.id);
      visited.add(plugin.id);
      sorted.push(plugin);
    };

    for (const plugin of this.plugins.values()) {
      visit(plugin);
    }

    return sorted;
  }

  // --------------------------------------------------------------------------
  // Context & Utilities
  // --------------------------------------------------------------------------

  /**
   * Create context object for plugin API.
   */
  createPluginContext(plugin) {
    return {
      // Plugin info
      plugin: plugin.toJSON(),
      config: { ...plugin.defaultConfig, ...plugin.config },

      // Registry access (limited)
      getPlugin: (name) => this.findByName(name)?.toJSON(),
      listPlugins: () => [...this.plugins.values()].map((p) => p.toJSON()),

      // Hook execution
      executeHook: (hookName, context) => this.executeHook(hookName, context),

      // Logging
      log: (...args) => console.log(`[${plugin.name}]`, ...args),
      warn: (...args) => console.warn(`[${plugin.name}]`, ...args),
      error: (...args) => console.error(`[${plugin.name}]`, ...args),

      // Events
      emit: (event, data) => this.emit(`plugin:${plugin.name}:${event}`, data),
    };
  }

  /**
   * Find plugin by name.
   */
  findByName(name) {
    return [...this.plugins.values()].find((p) => p.name === name);
  }

  /**
   * Get all active plugins.
   */
  getActive() {
    return [...this.plugins.values()].filter((p) => p.state === PLUGIN_STATES.ACTIVE);
  }

  /**
   * Get plugin statistics.
   */
  getStats() {
    const plugins = [...this.plugins.values()];

    return {
      total: plugins.length,
      active: plugins.filter((p) => p.state === PLUGIN_STATES.ACTIVE).length,
      disabled: plugins.filter((p) => p.state === PLUGIN_STATES.DISABLED).length,
      error: plugins.filter((p) => p.state === PLUGIN_STATES.ERROR).length,
      hookCount: [...this.hooks.values()].reduce((sum, h) => sum + h.length, 0),
      extensionPoints: this.extensionPoints.size,
    };
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

let globalRegistry = null;

/**
 * Get or create the global plugin registry.
 */
function getRegistry(options = {}) {
  if (!globalRegistry) {
    globalRegistry = new PluginRegistry(options);
  }
  return globalRegistry;
}

/**
 * Reset the global registry (for testing).
 */
function resetRegistry() {
  globalRegistry = null;
}

// ============================================================================
// Exports
// ============================================================================

module.exports = {
  // Classes
  Plugin,
  PluginRegistry,

  // Constants
  PLUGIN_STATES,
  HOOK_PHASES,
  EXTENSION_POINTS,

  // Singleton
  getRegistry,
  resetRegistry,
};
