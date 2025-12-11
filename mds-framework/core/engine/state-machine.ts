/**
 * MDS Framework - State Machine
 *
 * Manages workflow state, transitions, checkpoints, and persistence.
 * Enables pause/resume and recovery of workflow execution.
 *
 * @module core/engine/state-machine
 * @version 1.0.0
 */

import {
  WorkflowState,
  WorkflowStatus,
  StateTransition,
  Checkpoint,
  GeneratedArtifact,
  AwaitingInput
} from './types';

// ============================================================================
// TYPES
// ============================================================================

export interface StateStore {
  get(id: string): Promise<WorkflowState | null>;
  set(id: string, state: WorkflowState): Promise<void>;
  delete(id: string): Promise<void>;
  list(filter?: StateFilter): Promise<WorkflowState[]>;
}

export interface StateFilter {
  status?: WorkflowStatus;
  workflowId?: string;
  projectId?: string;
  since?: Date;
}

export interface TransitionRule {
  from: WorkflowStatus | WorkflowStatus[];
  to: WorkflowStatus;
  condition?: (state: WorkflowState) => boolean;
  action?: (state: WorkflowState) => void;
}

// ============================================================================
// IN-MEMORY STORE (Default Implementation)
// ============================================================================

class InMemoryStateStore implements StateStore {
  private states: Map<string, WorkflowState> = new Map();

  async get(id: string): Promise<WorkflowState | null> {
    return this.states.get(id) || null;
  }

  async set(id: string, state: WorkflowState): Promise<void> {
    this.states.set(id, state);
  }

  async delete(id: string): Promise<void> {
    this.states.delete(id);
  }

  async list(filter?: StateFilter): Promise<WorkflowState[]> {
    let states = Array.from(this.states.values());

    if (filter) {
      if (filter.status) {
        states = states.filter(s => s.status === filter.status);
      }
      if (filter.workflowId) {
        states = states.filter(s => s.workflowId === filter.workflowId);
      }
      if (filter.projectId) {
        states = states.filter(s => s.projectId === filter.projectId);
      }
      if (filter.since) {
        states = states.filter(s => new Date(s.updatedAt) >= filter.since!);
      }
    }

    return states;
  }
}

// ============================================================================
// STATE MACHINE CLASS
// ============================================================================

export class StateMachine {
  private store: StateStore;
  private transitionRules: TransitionRule[];
  private eventHandlers: Map<string, Function[]> = new Map();

  constructor(store?: StateStore) {
    this.store = store || new InMemoryStateStore();
    this.transitionRules = this.initializeTransitionRules();
  }

  // --------------------------------------------------------------------------
  // TRANSITION RULES
  // --------------------------------------------------------------------------

  private initializeTransitionRules(): TransitionRule[] {
    return [
      // Initial transitions
      {
        from: 'pending',
        to: 'in_progress',
        action: (state) => {
          state.history.push(this.createTransition('pending', 'in_progress', 'workflow_started'));
        }
      },

      // Progress transitions
      {
        from: 'in_progress',
        to: 'awaiting_input',
        action: (state) => {
          state.history.push(this.createTransition('in_progress', 'awaiting_input', 'input_required'));
        }
      },
      {
        from: 'awaiting_input',
        to: 'in_progress',
        action: (state) => {
          state.awaitingInput = undefined;
          state.history.push(this.createTransition('awaiting_input', 'in_progress', 'input_received'));
        }
      },

      // Pause/Resume
      {
        from: 'in_progress',
        to: 'paused',
        action: (state) => {
          state.history.push(this.createTransition('in_progress', 'paused', 'user_paused'));
        }
      },
      {
        from: 'paused',
        to: 'in_progress',
        action: (state) => {
          state.history.push(this.createTransition('paused', 'in_progress', 'user_resumed'));
        }
      },

      // Completion
      {
        from: ['in_progress', 'awaiting_input'],
        to: 'completed',
        action: (state) => {
          state.completedAt = new Date().toISOString();
          state.history.push(this.createTransition(state.status, 'completed', 'workflow_completed'));
        }
      },

      // Halt
      {
        from: ['in_progress', 'awaiting_input'],
        to: 'halted',
        action: (state) => {
          state.history.push(this.createTransition(state.status, 'halted', 'workflow_halted'));
        }
      },

      // Error
      {
        from: ['pending', 'in_progress', 'awaiting_input', 'paused'],
        to: 'error',
        action: (state) => {
          state.history.push(this.createTransition(state.status, 'error', 'error_occurred'));
        }
      }
    ];
  }

  private createTransition(
    from: WorkflowStatus,
    to: WorkflowStatus,
    trigger: string
  ): StateTransition {
    return {
      from,
      to,
      trigger,
      timestamp: new Date().toISOString()
    };
  }

  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------

  /**
   * Create a new workflow state
   */
  async createState(
    workflowId: string,
    options: {
      projectId?: string;
      variables?: Record<string, any>;
    } = {}
  ): Promise<WorkflowState> {
    const now = new Date().toISOString();
    const state: WorkflowState = {
      id: this.generateStateId(),
      workflowId,
      projectId: options.projectId || 'default',
      status: 'pending',
      currentStep: 1,
      completedSteps: [],
      variables: options.variables || {},
      artifacts: [],
      checkpoints: [],
      history: [],
      createdAt: now,
      updatedAt: now
    };

    await this.store.set(state.id, state);
    this.emit('state.created', state);

    return state;
  }

  /**
   * Get existing state or create new one
   */
  async getOrCreateState(
    workflowId: string,
    context: { projectId?: string; variables?: Record<string, any> }
  ): Promise<WorkflowState> {
    // Check for existing in-progress state
    const existing = await this.findActiveState(workflowId, context.projectId);
    if (existing) {
      return existing;
    }

    return this.createState(workflowId, context);
  }

  /**
   * Find active (non-completed) state for a workflow
   */
  async findActiveState(workflowId: string, projectId?: string): Promise<WorkflowState | null> {
    const states = await this.store.list({
      workflowId,
      projectId
    });

    // Find first non-terminal state
    return states.find(s =>
      s.status !== 'completed' &&
      s.status !== 'halted' &&
      s.status !== 'error'
    ) || null;
  }

  /**
   * Get state by ID
   */
  async getState(stateId: string): Promise<WorkflowState | null> {
    return this.store.get(stateId);
  }

  /**
   * Update state with new values
   */
  async updateState(
    stateId: string,
    updates: Partial<WorkflowState>
  ): Promise<WorkflowState> {
    const state = await this.store.get(stateId);
    if (!state) {
      throw new Error(`State not found: ${stateId}`);
    }

    const updatedState: WorkflowState = {
      ...state,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await this.store.set(stateId, updatedState);
    this.emit('state.updated', updatedState);

    return updatedState;
  }

  // --------------------------------------------------------------------------
  // STATE TRANSITIONS
  // --------------------------------------------------------------------------

  /**
   * Transition state to a new status
   */
  async transition(
    stateId: string,
    toStatus: WorkflowStatus,
    details?: string
  ): Promise<WorkflowState> {
    const state = await this.store.get(stateId);
    if (!state) {
      throw new Error(`State not found: ${stateId}`);
    }

    // Validate transition
    const rule = this.findTransitionRule(state.status, toStatus);
    if (!rule) {
      throw new Error(`Invalid transition: ${state.status} -> ${toStatus}`);
    }

    // Check condition
    if (rule.condition && !rule.condition(state)) {
      throw new Error(`Transition condition not met: ${state.status} -> ${toStatus}`);
    }

    // Execute transition action
    if (rule.action) {
      rule.action(state);
    }

    // Update status
    state.status = toStatus;
    state.updatedAt = new Date().toISOString();

    if (details) {
      state.history[state.history.length - 1].details = details;
    }

    await this.store.set(stateId, state);
    this.emit('state.transitioned', { state, from: state.status, to: toStatus });

    return state;
  }

  private findTransitionRule(from: WorkflowStatus, to: WorkflowStatus): TransitionRule | null {
    return this.transitionRules.find(rule => {
      const fromMatch = Array.isArray(rule.from)
        ? rule.from.includes(from)
        : rule.from === from;
      return fromMatch && rule.to === to;
    }) || null;
  }

  // --------------------------------------------------------------------------
  // CHECKPOINTING
  // --------------------------------------------------------------------------

  /**
   * Create a checkpoint at current state
   */
  async createCheckpoint(stateId: string): Promise<Checkpoint> {
    const state = await this.store.get(stateId);
    if (!state) {
      throw new Error(`State not found: ${stateId}`);
    }

    const checkpoint: Checkpoint = {
      stepNumber: state.currentStep,
      timestamp: new Date().toISOString(),
      state: {
        variables: { ...state.variables },
        completedSteps: [...state.completedSteps]
      },
      artifacts: state.artifacts.map(a => a.id)
    };

    state.checkpoints.push(checkpoint);
    await this.store.set(stateId, state);

    this.emit('checkpoint.created', { stateId, checkpoint });
    return checkpoint;
  }

  /**
   * Restore state from a checkpoint
   */
  async restoreCheckpoint(stateId: string, stepNumber: number): Promise<WorkflowState> {
    const state = await this.store.get(stateId);
    if (!state) {
      throw new Error(`State not found: ${stateId}`);
    }

    const checkpoint = state.checkpoints.find(c => c.stepNumber === stepNumber);
    if (!checkpoint) {
      throw new Error(`Checkpoint not found for step: ${stepNumber}`);
    }

    // Restore state from checkpoint
    state.currentStep = checkpoint.stepNumber;
    state.variables = { ...checkpoint.state.variables };
    state.completedSteps = [...checkpoint.state.completedSteps];
    state.status = 'in_progress';
    state.updatedAt = new Date().toISOString();

    // Add history entry
    state.history.push({
      from: state.status,
      to: 'in_progress',
      trigger: 'checkpoint_restored',
      timestamp: new Date().toISOString(),
      details: `Restored to step ${stepNumber}`
    });

    await this.store.set(stateId, state);
    this.emit('checkpoint.restored', { stateId, checkpoint });

    return state;
  }

  // --------------------------------------------------------------------------
  // STEP MANAGEMENT
  // --------------------------------------------------------------------------

  /**
   * Mark current step as completed and advance
   */
  async completeStep(stateId: string): Promise<WorkflowState> {
    const state = await this.store.get(stateId);
    if (!state) {
      throw new Error(`State not found: ${stateId}`);
    }

    // Mark step completed
    if (!state.completedSteps.includes(state.currentStep)) {
      state.completedSteps.push(state.currentStep);
    }

    // Advance to next step
    state.currentStep += 1;
    state.updatedAt = new Date().toISOString();

    await this.store.set(stateId, state);
    this.emit('step.completed', { stateId, step: state.currentStep - 1 });

    return state;
  }

  /**
   * Jump to a specific step (goto)
   */
  async gotoStep(stateId: string, stepNumber: number): Promise<WorkflowState> {
    const state = await this.store.get(stateId);
    if (!state) {
      throw new Error(`State not found: ${stateId}`);
    }

    state.currentStep = stepNumber;
    state.updatedAt = new Date().toISOString();

    await this.store.set(stateId, state);
    this.emit('step.goto', { stateId, step: stepNumber });

    return state;
  }

  // --------------------------------------------------------------------------
  // ARTIFACT MANAGEMENT
  // --------------------------------------------------------------------------

  /**
   * Add an artifact to state
   */
  async addArtifact(stateId: string, artifact: GeneratedArtifact): Promise<WorkflowState> {
    const state = await this.store.get(stateId);
    if (!state) {
      throw new Error(`State not found: ${stateId}`);
    }

    state.artifacts.push(artifact);
    state.updatedAt = new Date().toISOString();

    await this.store.set(stateId, state);
    this.emit('artifact.added', { stateId, artifact });

    return state;
  }

  // --------------------------------------------------------------------------
  // AWAITING INPUT
  // --------------------------------------------------------------------------

  /**
   * Set state to awaiting input
   */
  async setAwaitingInput(
    stateId: string,
    input: AwaitingInput
  ): Promise<WorkflowState> {
    const state = await this.store.get(stateId);
    if (!state) {
      throw new Error(`State not found: ${stateId}`);
    }

    state.awaitingInput = input;
    await this.transition(stateId, 'awaiting_input');

    return this.store.get(stateId) as Promise<WorkflowState>;
  }

  /**
   * Provide input and resume
   */
  async provideInput(
    stateId: string,
    input: Record<string, any>
  ): Promise<WorkflowState> {
    const state = await this.store.get(stateId);
    if (!state) {
      throw new Error(`State not found: ${stateId}`);
    }

    if (state.status !== 'awaiting_input') {
      throw new Error(`State is not awaiting input: ${state.status}`);
    }

    // Merge input into variables
    state.variables = { ...state.variables, ...input };
    await this.transition(stateId, 'in_progress');

    return this.store.get(stateId) as Promise<WorkflowState>;
  }

  // --------------------------------------------------------------------------
  // EVENT HANDLING
  // --------------------------------------------------------------------------

  on(event: string, handler: Function): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(handler);
  }

  private emit(event: string, data: any): void {
    const handlers = this.eventHandlers.get(event) || [];
    for (const handler of handlers) {
      handler(data);
    }
  }

  // --------------------------------------------------------------------------
  // HELPER METHODS
  // --------------------------------------------------------------------------

  private generateStateId(): string {
    return `state-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default StateMachine;
