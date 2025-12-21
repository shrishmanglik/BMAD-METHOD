/**
 * BMAD Framework - Workflow Orchestration Engine
 *
 * Provides robust workflow execution with:
 * - State machine-based execution
 * - Step tracking and progress management
 * - Error handling and recovery
 * - Event emission for observability
 * - Checkpoint and rollback support
 *
 * @module framework/engine/workflow-engine
 */

const { EventEmitter } = require('events');
const crypto = require('crypto');
const path = require('path');

// ============================================================================
// Constants
// ============================================================================

const WORKFLOW_STATES = {
  IDLE: 'idle',
  INITIALIZING: 'initializing',
  RUNNING: 'running',
  PAUSED: 'paused',
  WAITING_USER: 'waiting_user',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
};

const STEP_STATES = {
  PENDING: 'pending',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  SKIPPED: 'skipped',
  FAILED: 'failed',
};

const EVENTS = {
  STATE_CHANGE: 'state:change',
  STEP_START: 'step:start',
  STEP_COMPLETE: 'step:complete',
  STEP_FAIL: 'step:fail',
  STEP_SKIP: 'step:skip',
  CHECKPOINT: 'checkpoint',
  ERROR: 'error',
  WARNING: 'warning',
  PROGRESS: 'progress',
};

// ============================================================================
// WorkflowExecution Class
// ============================================================================

/**
 * Represents a single workflow execution instance.
 */
class WorkflowExecution {
  constructor(workflow, options = {}) {
    this.id = options.id || crypto.randomUUID();
    this.workflow = workflow;
    this.state = WORKFLOW_STATES.IDLE;
    this.currentStep = null;
    this.steps = [];
    this.context = options.context || {};
    this.variables = options.variables || {};
    this.errors = [];
    this.checkpoints = [];

    // Timing
    this.createdAt = new Date().toISOString();
    this.startedAt = null;
    this.updatedAt = this.createdAt;
    this.completedAt = null;

    // Progress
    this.progress = {
      total: 0,
      completed: 0,
      percentage: 0,
    };
  }

  /**
   * Update execution state.
   */
  setState(newState) {
    const previousState = this.state;
    this.state = newState;
    this.updatedAt = new Date().toISOString();

    return { previous: previousState, current: newState };
  }

  /**
   * Create a checkpoint for recovery.
   */
  createCheckpoint() {
    const checkpoint = {
      id: crypto.randomUUID(),
      stepId: this.currentStep,
      timestamp: new Date().toISOString(),
      state: this.state,
      context: { ...this.context },
      variables: { ...this.variables },
      stepStates: this.steps.map((s) => ({ id: s.id, status: s.status })),
    };

    this.checkpoints.push(checkpoint);
    return checkpoint;
  }

  /**
   * Restore from a checkpoint.
   */
  restoreFromCheckpoint(checkpointId) {
    const checkpoint = this.checkpoints.find((c) => c.id === checkpointId);
    if (!checkpoint) {
      throw new Error(`Checkpoint not found: ${checkpointId}`);
    }

    this.currentStep = checkpoint.stepId;
    this.context = { ...checkpoint.context };
    this.variables = { ...checkpoint.variables };

    checkpoint.stepStates.forEach((ss) => {
      const step = this.steps.find((s) => s.id === ss.id);
      if (step) {
        step.status = ss.status;
      }
    });

    this.updatedAt = new Date().toISOString();
    return checkpoint;
  }

  /**
   * Add an error to the execution.
   */
  addError(error) {
    this.errors.push({
      id: crypto.randomUUID(),
      stepId: this.currentStep,
      code: error.code || 'UNKNOWN_ERROR',
      message: error.message,
      timestamp: new Date().toISOString(),
      recoverable: error.recoverable !== false,
      stack: error.stack,
    });
  }

  /**
   * Update progress information.
   */
  updateProgress() {
    const completed = this.steps.filter(
      (s) => s.status === STEP_STATES.COMPLETED || s.status === STEP_STATES.SKIPPED
    ).length;

    this.progress = {
      total: this.steps.length,
      completed,
      percentage: this.steps.length > 0 ? Math.round((completed / this.steps.length) * 100) : 0,
    };

    return this.progress;
  }

  /**
   * Serialize execution state for persistence.
   */
  toJSON() {
    return {
      id: this.id,
      workflowId: this.workflow.id || this.workflow.name,
      state: this.state,
      currentStep: this.currentStep,
      steps: this.steps,
      context: this.context,
      variables: this.variables,
      errors: this.errors,
      checkpoints: this.checkpoints,
      progress: this.progress,
      timing: {
        createdAt: this.createdAt,
        startedAt: this.startedAt,
        updatedAt: this.updatedAt,
        completedAt: this.completedAt,
      },
    };
  }

  /**
   * Restore execution from serialized state.
   */
  static fromJSON(data, workflow) {
    const execution = new WorkflowExecution(workflow, { id: data.id });
    execution.state = data.state;
    execution.currentStep = data.currentStep;
    execution.steps = data.steps;
    execution.context = data.context;
    execution.variables = data.variables;
    execution.errors = data.errors || [];
    execution.checkpoints = data.checkpoints || [];
    execution.progress = data.progress;
    execution.createdAt = data.timing.createdAt;
    execution.startedAt = data.timing.startedAt;
    execution.updatedAt = data.timing.updatedAt;
    execution.completedAt = data.timing.completedAt;
    return execution;
  }
}

// ============================================================================
// WorkflowEngine Class
// ============================================================================

/**
 * Main workflow execution engine.
 */
class WorkflowEngine extends EventEmitter {
  constructor(options = {}) {
    super();
    this.options = {
      maxRetries: 3,
      retryDelay: 1000,
      checkpointInterval: 1,
      enableRecovery: true,
      ...options,
    };
    this.executions = new Map();
    this.hooks = new Map();
    this.middlewares = [];
  }

  // --------------------------------------------------------------------------
  // Lifecycle Methods
  // --------------------------------------------------------------------------

  /**
   * Initialize a new workflow execution.
   */
  async initialize(workflow, context = {}) {
    const execution = new WorkflowExecution(workflow, { context });

    // Parse workflow steps
    const steps = await this.parseWorkflowSteps(workflow);
    execution.steps = steps.map((step, index) => ({
      id: step.id || `step-${index + 1}`,
      file: step.file,
      name: step.name,
      description: step.description,
      status: STEP_STATES.PENDING,
      required: step.required !== false,
      dependencies: step.dependencies || [],
      startedAt: null,
      completedAt: null,
      outputs: {},
      error: null,
    }));

    execution.updateProgress();
    this.executions.set(execution.id, execution);

    this.emit(EVENTS.STATE_CHANGE, {
      executionId: execution.id,
      previous: null,
      current: WORKFLOW_STATES.IDLE,
    });

    return execution;
  }

  /**
   * Parse workflow steps from workflow definition.
   */
  async parseWorkflowSteps(workflow) {
    // For YAML workflows, steps might be defined in the workflow file
    if (workflow.steps) {
      return workflow.steps;
    }

    // For markdown workflows, discover step files
    if (workflow.installed_path) {
      return this.discoverStepFiles(workflow.installed_path);
    }

    // Default: single-step workflow
    return [
      {
        id: 'main',
        name: workflow.name || 'Main',
        description: workflow.description,
        required: true,
      },
    ];
  }

  /**
   * Discover step files in a workflow directory.
   */
  async discoverStepFiles(workflowPath) {
    const stepsDir = path.join(workflowPath, 'steps');
    const steps = [];

    try {
      // This would normally use fs to read the directory
      // For framework definition, we define the interface
      const stepPattern = /^step-(\d+)-(.+)\.md$/;

      // Placeholder for actual file discovery
      // In real implementation, this would read the filesystem
      return steps;
    } catch (error) {
      return [];
    }
  }

  // --------------------------------------------------------------------------
  // Execution Methods
  // --------------------------------------------------------------------------

  /**
   * Start or resume workflow execution.
   */
  async execute(executionId, options = {}) {
    const execution = this.executions.get(executionId);
    if (!execution) {
      throw new Error(`Execution not found: ${executionId}`);
    }

    // Run before_start hooks
    await this.runHooks('before_start', execution);

    execution.setState(WORKFLOW_STATES.RUNNING);
    execution.startedAt = execution.startedAt || new Date().toISOString();

    this.emit(EVENTS.STATE_CHANGE, {
      executionId,
      previous: WORKFLOW_STATES.IDLE,
      current: WORKFLOW_STATES.RUNNING,
    });

    try {
      // Execute steps sequentially
      for (const step of execution.steps) {
        if (step.status === STEP_STATES.COMPLETED || step.status === STEP_STATES.SKIPPED) {
          continue;
        }

        // Check dependencies
        if (!this.checkDependencies(execution, step)) {
          step.status = STEP_STATES.SKIPPED;
          this.emit(EVENTS.STEP_SKIP, { executionId, step });
          continue;
        }

        await this.executeStep(execution, step);

        // Create checkpoint if interval reached
        if (this.shouldCreateCheckpoint(execution)) {
          const checkpoint = execution.createCheckpoint();
          this.emit(EVENTS.CHECKPOINT, { executionId, checkpoint });
        }
      }

      // All steps completed
      execution.setState(WORKFLOW_STATES.COMPLETED);
      execution.completedAt = new Date().toISOString();

      // Run after_complete hooks
      await this.runHooks('after_complete', execution);

      this.emit(EVENTS.STATE_CHANGE, {
        executionId,
        previous: WORKFLOW_STATES.RUNNING,
        current: WORKFLOW_STATES.COMPLETED,
      });

      return execution;
    } catch (error) {
      return this.handleExecutionError(execution, error);
    }
  }

  /**
   * Execute a single step.
   */
  async executeStep(execution, step) {
    execution.currentStep = step.id;
    step.status = STEP_STATES.ACTIVE;
    step.startedAt = new Date().toISOString();

    // Run before_step hooks
    await this.runHooks('before_step', execution, step);

    this.emit(EVENTS.STEP_START, {
      executionId: execution.id,
      step: { id: step.id, name: step.name },
    });

    try {
      // Apply middlewares
      for (const middleware of this.middlewares) {
        await middleware(execution, step);
      }

      // Execute step logic
      const result = await this.runStepLogic(execution, step);

      // Store outputs
      step.outputs = result?.outputs || {};
      step.status = STEP_STATES.COMPLETED;
      step.completedAt = new Date().toISOString();

      // Merge outputs into context
      Object.assign(execution.context, step.outputs);

      // Run after_step hooks
      await this.runHooks('after_step', execution, step);

      execution.updateProgress();

      this.emit(EVENTS.STEP_COMPLETE, {
        executionId: execution.id,
        step: { id: step.id, name: step.name, outputs: step.outputs },
      });

      this.emit(EVENTS.PROGRESS, {
        executionId: execution.id,
        progress: execution.progress,
      });

      return result;
    } catch (error) {
      return this.handleStepError(execution, step, error);
    }
  }

  /**
   * Run the actual step logic.
   * Override this in subclasses for specific implementations.
   */
  async runStepLogic(execution, step) {
    // Default implementation - step is just a marker
    // Real implementations would load and execute step files
    return { outputs: {} };
  }

  // --------------------------------------------------------------------------
  // Error Handling
  // --------------------------------------------------------------------------

  /**
   * Handle step-level errors.
   */
  async handleStepError(execution, step, error) {
    step.status = STEP_STATES.FAILED;
    step.error = {
      code: error.code || 'STEP_ERROR',
      message: error.message,
      stack: error.stack,
    };

    execution.addError({
      ...step.error,
      recoverable: step.required === false,
    });

    this.emit(EVENTS.STEP_FAIL, {
      executionId: execution.id,
      step: { id: step.id, name: step.name },
      error: step.error,
    });

    // Run on_error hooks
    await this.runHooks('on_error', execution, step, error);

    // If step is optional, continue
    if (!step.required) {
      return { skipped: true };
    }

    // Try recovery if enabled
    if (this.options.enableRecovery && step.retry !== false) {
      return this.attemptRecovery(execution, step, error);
    }

    throw error;
  }

  /**
   * Handle execution-level errors.
   */
  async handleExecutionError(execution, error) {
    execution.setState(WORKFLOW_STATES.FAILED);
    execution.addError({
      code: error.code || 'EXECUTION_ERROR',
      message: error.message,
      recoverable: false,
    });

    this.emit(EVENTS.ERROR, {
      executionId: execution.id,
      error: { code: error.code, message: error.message },
    });

    this.emit(EVENTS.STATE_CHANGE, {
      executionId: execution.id,
      previous: WORKFLOW_STATES.RUNNING,
      current: WORKFLOW_STATES.FAILED,
    });

    return execution;
  }

  /**
   * Attempt to recover from a step failure.
   */
  async attemptRecovery(execution, step, error) {
    const maxRetries = step.retry?.max_attempts || this.options.maxRetries;
    const retryDelay = step.retry?.delay_ms || this.options.retryDelay;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      this.emit(EVENTS.WARNING, {
        executionId: execution.id,
        message: `Retry attempt ${attempt}/${maxRetries} for step ${step.id}`,
      });

      await this.delay(retryDelay * attempt);

      try {
        step.status = STEP_STATES.ACTIVE;
        const result = await this.runStepLogic(execution, step);

        step.status = STEP_STATES.COMPLETED;
        step.completedAt = new Date().toISOString();
        step.error = null;

        return result;
      } catch (retryError) {
        if (attempt === maxRetries) {
          throw retryError;
        }
      }
    }

    throw error;
  }

  // --------------------------------------------------------------------------
  // Control Methods
  // --------------------------------------------------------------------------

  /**
   * Pause workflow execution.
   */
  async pause(executionId) {
    const execution = this.executions.get(executionId);
    if (!execution) {
      throw new Error(`Execution not found: ${executionId}`);
    }

    if (execution.state !== WORKFLOW_STATES.RUNNING) {
      throw new Error(`Cannot pause execution in state: ${execution.state}`);
    }

    execution.setState(WORKFLOW_STATES.PAUSED);
    execution.createCheckpoint();

    this.emit(EVENTS.STATE_CHANGE, {
      executionId,
      previous: WORKFLOW_STATES.RUNNING,
      current: WORKFLOW_STATES.PAUSED,
    });

    return execution;
  }

  /**
   * Resume paused workflow execution.
   */
  async resume(executionId) {
    const execution = this.executions.get(executionId);
    if (!execution) {
      throw new Error(`Execution not found: ${executionId}`);
    }

    if (execution.state !== WORKFLOW_STATES.PAUSED) {
      throw new Error(`Cannot resume execution in state: ${execution.state}`);
    }

    return this.execute(executionId);
  }

  /**
   * Cancel workflow execution.
   */
  async cancel(executionId, reason) {
    const execution = this.executions.get(executionId);
    if (!execution) {
      throw new Error(`Execution not found: ${executionId}`);
    }

    if (
      execution.state === WORKFLOW_STATES.COMPLETED ||
      execution.state === WORKFLOW_STATES.CANCELLED
    ) {
      throw new Error(`Cannot cancel execution in state: ${execution.state}`);
    }

    execution.setState(WORKFLOW_STATES.CANCELLED);
    execution.addError({
      code: 'CANCELLED',
      message: reason || 'Execution cancelled by user',
      recoverable: false,
    });

    // Run on_cancel hooks
    await this.runHooks('on_cancel', execution);

    this.emit(EVENTS.STATE_CHANGE, {
      executionId,
      previous: execution.state,
      current: WORKFLOW_STATES.CANCELLED,
    });

    return execution;
  }

  /**
   * Mark execution as waiting for user input.
   */
  async waitForUser(executionId, prompt) {
    const execution = this.executions.get(executionId);
    if (!execution) {
      throw new Error(`Execution not found: ${executionId}`);
    }

    execution.setState(WORKFLOW_STATES.WAITING_USER);
    execution.context._userPrompt = prompt;

    this.emit(EVENTS.STATE_CHANGE, {
      executionId,
      previous: WORKFLOW_STATES.RUNNING,
      current: WORKFLOW_STATES.WAITING_USER,
      prompt,
    });

    return execution;
  }

  /**
   * Provide user response and continue execution.
   */
  async provideUserResponse(executionId, response) {
    const execution = this.executions.get(executionId);
    if (!execution) {
      throw new Error(`Execution not found: ${executionId}`);
    }

    if (execution.state !== WORKFLOW_STATES.WAITING_USER) {
      throw new Error(`Execution is not waiting for user: ${execution.state}`);
    }

    execution.context._userResponse = response;
    delete execution.context._userPrompt;

    return this.execute(executionId);
  }

  // --------------------------------------------------------------------------
  // Hook System
  // --------------------------------------------------------------------------

  /**
   * Register a hook for a specific event.
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

  /**
   * Add middleware for step execution.
   */
  use(middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  // --------------------------------------------------------------------------
  // Utility Methods
  // --------------------------------------------------------------------------

  /**
   * Check if step dependencies are satisfied.
   */
  checkDependencies(execution, step) {
    if (!step.dependencies || step.dependencies.length === 0) {
      return true;
    }

    return step.dependencies.every((depId) => {
      const depStep = execution.steps.find((s) => s.id === depId);
      return depStep && depStep.status === STEP_STATES.COMPLETED;
    });
  }

  /**
   * Determine if a checkpoint should be created.
   */
  shouldCreateCheckpoint(execution) {
    const completedCount = execution.steps.filter(
      (s) => s.status === STEP_STATES.COMPLETED
    ).length;
    return completedCount % this.options.checkpointInterval === 0;
  }

  /**
   * Utility delay function.
   */
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get execution by ID.
   */
  getExecution(executionId) {
    return this.executions.get(executionId);
  }

  /**
   * Get all active executions.
   */
  getActiveExecutions() {
    return [...this.executions.values()].filter(
      (e) => e.state === WORKFLOW_STATES.RUNNING || e.state === WORKFLOW_STATES.PAUSED
    );
  }

  /**
   * Clean up completed executions.
   */
  cleanup(olderThanMs = 24 * 60 * 60 * 1000) {
    const cutoff = Date.now() - olderThanMs;

    for (const [id, execution] of this.executions) {
      if (
        (execution.state === WORKFLOW_STATES.COMPLETED ||
          execution.state === WORKFLOW_STATES.CANCELLED ||
          execution.state === WORKFLOW_STATES.FAILED) &&
        new Date(execution.completedAt || execution.updatedAt).getTime() < cutoff
      ) {
        this.executions.delete(id);
      }
    }
  }
}

// ============================================================================
// Exports
// ============================================================================

module.exports = {
  WorkflowEngine,
  WorkflowExecution,
  WORKFLOW_STATES,
  STEP_STATES,
  EVENTS,
};
