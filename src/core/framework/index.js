/**
 * BMAD Framework - Core Module
 *
 * The robust framework core providing:
 * - Comprehensive validation schemas
 * - Workflow orchestration engine
 * - Agent runtime management
 * - Plugin system with hooks
 * - State management
 * - Error handling
 *
 * @module framework
 * @version 2.0.0
 */

// ============================================================================
// Schema Exports
// ============================================================================

const agentSchema = require('./schemas/agent.schema');
const workflowSchema = require('./schemas/workflow.schema');
const configSchema = require('./schemas/config.schema');
const moduleSchema = require('./schemas/module.schema');

// ============================================================================
// Engine Exports
// ============================================================================

const { WorkflowEngine, WorkflowExecution, WORKFLOW_STATES, STEP_STATES } = require('./engine/workflow-engine');
const { AgentRuntime, AgentInstance, AGENT_STATES } = require('./engine/agent-runtime');

// ============================================================================
// Error Exports
// ============================================================================

const {
  ErrorCodes,
  RecoveryStrategies,
  BmadError,
  ConfigError,
  AgentError,
  WorkflowError,
  ModuleError,
  PluginError,
  ValidationError,
  FileSystemError,
  TimeoutError,
  UserError,
  ErrorHandler,
  withErrorHandling,
  createErrorWithSuggestions,
} = require('./errors/error-types');

// ============================================================================
// Plugin Exports
// ============================================================================

const {
  Plugin,
  PluginRegistry,
  PLUGIN_STATES,
  HOOK_PHASES,
  EXTENSION_POINTS,
  getRegistry,
  resetRegistry,
} = require('./plugins/plugin-registry');

// ============================================================================
// State Exports
// ============================================================================

const {
  StateStore,
  StateManager,
  Transaction,
  STATE_DOMAINS,
  getStateManager,
  resetStateManager,
} = require('./state/state-manager');

// ============================================================================
// Framework Class
// ============================================================================

/**
 * Main BMAD Framework class that provides a unified interface
 * to all framework components.
 */
class BmadFramework {
  constructor(options = {}) {
    this.options = {
      projectRoot: process.cwd(),
      enablePlugins: true,
      enableState: true,
      ...options,
    };

    this.version = '2.0.0';
    this.initialized = false;

    // Core components
    this.workflowEngine = null;
    this.agentRuntime = null;
    this.pluginRegistry = null;
    this.stateManager = null;
    this.errorHandler = null;
  }

  /**
   * Initialize the framework.
   */
  async initialize() {
    if (this.initialized) {
      return this;
    }

    // Initialize error handler
    this.errorHandler = new ErrorHandler({
      logErrors: this.options.logErrors !== false,
    });

    // Initialize state manager
    if (this.options.enableState) {
      this.stateManager = getStateManager({
        persistOnChange: this.options.persistState,
        persistenceHandler: this.options.persistenceHandler,
      });
    }

    // Initialize plugin registry
    if (this.options.enablePlugins) {
      this.pluginRegistry = getRegistry();
    }

    // Initialize workflow engine
    this.workflowEngine = new WorkflowEngine({
      maxRetries: this.options.maxRetries || 3,
      enableRecovery: this.options.enableRecovery !== false,
    });

    // Initialize agent runtime
    this.agentRuntime = new AgentRuntime({
      memoryPersistence: this.options.memoryPersistence !== false,
      configResolver: this.createConfigResolver(),
    });

    // Connect components
    this.connectComponents();

    this.initialized = true;

    return this;
  }

  /**
   * Create a config resolver function.
   */
  createConfigResolver() {
    return (varName) => {
      if (this.stateManager) {
        return this.stateManager.get(STATE_DOMAINS.CONFIG, varName);
      }
      return undefined;
    };
  }

  /**
   * Connect framework components together.
   */
  connectComponents() {
    // Connect workflow engine to state manager
    if (this.stateManager) {
      this.workflowEngine.on('state:change', (data) => {
        this.stateManager.set(STATE_DOMAINS.WORKFLOW, `executions.${data.executionId}`, {
          state: data.current,
          timestamp: new Date().toISOString(),
        });
      });

      this.agentRuntime.on('agent:activate', (data) => {
        this.stateManager.set(STATE_DOMAINS.AGENT, 'active', {
          instanceId: data.instanceId,
          agentId: data.agentId,
          name: data.name,
        });
      });
    }

    // Connect to plugin registry hooks
    if (this.pluginRegistry) {
      this.workflowEngine.registerHook('before_start', async (execution) => {
        await this.pluginRegistry.executeHook('workflow:before-start', { execution });
      });

      this.workflowEngine.registerHook('after_complete', async (execution) => {
        await this.pluginRegistry.executeHook('workflow:after-complete', { execution });
      });

      this.agentRuntime.registerHook('agent:load', async (instance) => {
        await this.pluginRegistry.executeHook('agent:after-load', { instance });
      });

      this.agentRuntime.registerHook('agent:activate', async (instance) => {
        await this.pluginRegistry.executeHook('agent:after-activate', { instance });
      });
    }
  }

  /**
   * Shutdown the framework.
   */
  async shutdown() {
    if (!this.initialized) {
      return;
    }

    // Deactivate all plugins
    if (this.pluginRegistry) {
      await this.pluginRegistry.deactivateAll();
    }

    // Persist state
    if (this.stateManager && this.options.persistState) {
      await this.stateManager.persistAll();
    }

    this.initialized = false;
  }

  // --------------------------------------------------------------------------
  // Validation API
  // --------------------------------------------------------------------------

  /**
   * Validate an agent definition.
   */
  validateAgent(definition, options = {}) {
    return agentSchema.validateAgentWithReport(definition, options);
  }

  /**
   * Validate a workflow definition.
   */
  validateWorkflow(definition, options = {}) {
    return workflowSchema.validateWorkflowWithReport(definition, options);
  }

  /**
   * Validate a configuration.
   */
  validateConfig(config, options = {}) {
    return configSchema.validateConfigWithReport(config, options);
  }

  /**
   * Validate a module manifest.
   */
  validateModule(manifest, options = {}) {
    return moduleSchema.validateModuleWithReport(manifest, options);
  }

  // --------------------------------------------------------------------------
  // Agent API
  // --------------------------------------------------------------------------

  /**
   * Load an agent.
   */
  async loadAgent(definition, options = {}) {
    const validation = this.validateAgent(definition);
    if (!validation.valid) {
      throw new ValidationError('Invalid agent definition', {
        validationErrors: validation.errors,
      });
    }

    return this.agentRuntime.loadAgent(definition, options);
  }

  /**
   * Activate an agent.
   */
  async activateAgent(instanceId) {
    return this.agentRuntime.activateAgent(instanceId);
  }

  /**
   * Execute an agent command.
   */
  async executeCommand(trigger, input = {}) {
    return this.agentRuntime.executeCommand(trigger, input);
  }

  /**
   * Get the active agent.
   */
  getActiveAgent() {
    return this.agentRuntime.getActiveAgent();
  }

  // --------------------------------------------------------------------------
  // Workflow API
  // --------------------------------------------------------------------------

  /**
   * Start a workflow.
   */
  async startWorkflow(workflow, context = {}) {
    const validation = this.validateWorkflow(workflow);
    if (!validation.valid) {
      throw new ValidationError('Invalid workflow definition', {
        validationErrors: validation.errors,
      });
    }

    const execution = await this.workflowEngine.initialize(workflow, context);
    return this.workflowEngine.execute(execution.id);
  }

  /**
   * Pause a workflow execution.
   */
  async pauseWorkflow(executionId) {
    return this.workflowEngine.pause(executionId);
  }

  /**
   * Resume a workflow execution.
   */
  async resumeWorkflow(executionId) {
    return this.workflowEngine.resume(executionId);
  }

  /**
   * Cancel a workflow execution.
   */
  async cancelWorkflow(executionId, reason) {
    return this.workflowEngine.cancel(executionId, reason);
  }

  /**
   * Get workflow execution status.
   */
  getWorkflowExecution(executionId) {
    return this.workflowEngine.getExecution(executionId);
  }

  // --------------------------------------------------------------------------
  // Plugin API
  // --------------------------------------------------------------------------

  /**
   * Register a plugin.
   */
  registerPlugin(definition) {
    if (!this.pluginRegistry) {
      throw new Error('Plugin system not enabled');
    }
    return this.pluginRegistry.register(definition);
  }

  /**
   * Activate a plugin.
   */
  async activatePlugin(pluginId) {
    if (!this.pluginRegistry) {
      throw new Error('Plugin system not enabled');
    }
    return this.pluginRegistry.activate(pluginId);
  }

  /**
   * Execute a hook.
   */
  async executeHook(hookName, context = {}) {
    if (!this.pluginRegistry) {
      return context;
    }
    return this.pluginRegistry.executeHook(hookName, context);
  }

  // --------------------------------------------------------------------------
  // State API
  // --------------------------------------------------------------------------

  /**
   * Get state value.
   */
  getState(domain, path, defaultValue) {
    if (!this.stateManager) {
      return defaultValue;
    }
    return this.stateManager.get(domain, path, defaultValue);
  }

  /**
   * Set state value.
   */
  setState(domain, path, value) {
    if (!this.stateManager) {
      throw new Error('State management not enabled');
    }
    return this.stateManager.set(domain, path, value);
  }

  /**
   * Subscribe to state changes.
   */
  subscribeToState(domain, path, callback) {
    if (!this.stateManager) {
      throw new Error('State management not enabled');
    }
    return this.stateManager.subscribe(domain, path, callback);
  }

  // --------------------------------------------------------------------------
  // Error API
  // --------------------------------------------------------------------------

  /**
   * Handle an error.
   */
  async handleError(error, context = {}) {
    return this.errorHandler.handle(error, context);
  }

  /**
   * Register an error handler.
   */
  registerErrorHandler(code, handler) {
    return this.errorHandler.registerHandler(code, handler);
  }

  // --------------------------------------------------------------------------
  // Utility Methods
  // --------------------------------------------------------------------------

  /**
   * Get framework statistics.
   */
  getStats() {
    return {
      version: this.version,
      initialized: this.initialized,
      agents: this.agentRuntime?.getStats() || null,
      workflows: {
        activeExecutions: this.workflowEngine?.getActiveExecutions().length || 0,
      },
      plugins: this.pluginRegistry?.getStats() || null,
      state: this.stateManager?.getStats() || null,
    };
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

let frameworkInstance = null;

/**
 * Get or create the global framework instance.
 */
async function getFramework(options = {}) {
  if (!frameworkInstance) {
    frameworkInstance = new BmadFramework(options);
    await frameworkInstance.initialize();
  }
  return frameworkInstance;
}

/**
 * Reset the global framework instance (for testing).
 */
function resetFramework() {
  if (frameworkInstance) {
    frameworkInstance.shutdown();
  }
  frameworkInstance = null;
  resetRegistry();
  resetStateManager();
}

// ============================================================================
// Exports
// ============================================================================

module.exports = {
  // Main Framework
  BmadFramework,
  getFramework,
  resetFramework,

  // Schemas
  schemas: {
    agent: agentSchema,
    workflow: workflowSchema,
    config: configSchema,
    module: moduleSchema,
  },

  // Engines
  engines: {
    WorkflowEngine,
    WorkflowExecution,
    AgentRuntime,
    AgentInstance,
  },

  // Errors
  errors: {
    ErrorCodes,
    RecoveryStrategies,
    BmadError,
    ConfigError,
    AgentError,
    WorkflowError,
    ModuleError,
    PluginError,
    ValidationError,
    FileSystemError,
    TimeoutError,
    UserError,
    ErrorHandler,
    withErrorHandling,
    createErrorWithSuggestions,
  },

  // Plugins
  plugins: {
    Plugin,
    PluginRegistry,
    getRegistry,
    resetRegistry,
  },

  // State
  state: {
    StateStore,
    StateManager,
    Transaction,
    getStateManager,
    resetStateManager,
  },

  // Constants
  constants: {
    WORKFLOW_STATES,
    STEP_STATES,
    AGENT_STATES,
    PLUGIN_STATES,
    HOOK_PHASES,
    EXTENSION_POINTS,
    STATE_DOMAINS,
  },
};
