/**
 * MDS Framework - Core Orchestrator Engine
 *
 * The central nervous system of the MDS Framework. Handles:
 * - Agent routing and invocation
 * - Workflow execution and state management
 * - Context injection and management
 * - Protocol execution
 *
 * @module core/engine/orchestrator
 * @version 1.0.0
 */

import { AgentDefinition, WorkflowDefinition, ExecutionContext, ExecutionResult } from './types';
import { ContextManager } from './context-manager';
import { StateMachine } from './state-machine';
import { AgentRouter } from './agent-router';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface OrchestratorConfig {
  projectRoot: string;
  configPath: string;
  outputFolder: string;
  client: ClientConfig;
  integrations: IntegrationConfig;
}

export interface ClientConfig {
  name: string;
  industry: string;
  engagementType: 'consulting' | 'development' | 'delivery' | 'custom';
  preferences: {
    communicationStyle: 'formal' | 'casual' | 'technical';
    documentFormat: 'markdown' | 'docx' | 'pdf';
    language: string;
  };
}

export interface IntegrationConfig {
  googleAI?: {
    apiKey: string;
    model: string;
  };
  n8n?: {
    webhookUrl: string;
    apiKey: string;
  };
  database?: {
    type: 'postgres' | 'sqlite' | 'firestore';
    connectionString: string;
  };
}

export interface InvocationRequest {
  type: 'agent' | 'workflow' | 'task' | 'protocol';
  target: string;
  input: Record<string, any>;
  context?: Partial<ExecutionContext>;
  options?: {
    mode?: 'interactive' | 'autonomous' | 'validation';
    timeout?: number;
    retries?: number;
  };
}

// ============================================================================
// ORCHESTRATOR CLASS
// ============================================================================

export class MDSOrchestrator {
  private config: OrchestratorConfig;
  private contextManager: ContextManager;
  private stateMachine: StateMachine;
  private agentRouter: AgentRouter;
  private agents: Map<string, AgentDefinition> = new Map();
  private workflows: Map<string, WorkflowDefinition> = new Map();

  constructor(config: OrchestratorConfig) {
    this.config = config;
    this.contextManager = new ContextManager(config);
    this.stateMachine = new StateMachine();
    this.agentRouter = new AgentRouter(this.agents);
  }

  // --------------------------------------------------------------------------
  // INITIALIZATION
  // --------------------------------------------------------------------------

  async initialize(): Promise<void> {
    console.log('[MDS] Initializing orchestrator...');

    // Load configuration hierarchy
    await this.loadConfiguration();

    // Load agents from registry
    await this.loadAgents();

    // Load workflow definitions
    await this.loadWorkflows();

    // Initialize context with client data
    await this.contextManager.initialize({
      client: this.config.client,
      projectRoot: this.config.projectRoot
    });

    console.log('[MDS] Orchestrator initialized successfully');
  }

  private async loadConfiguration(): Promise<void> {
    // Three-level configuration loading (Core -> Module -> Client)
    const coreConfig = await this.loadConfigFile('core/config/default.yaml');
    const moduleConfig = await this.loadConfigFile('modules/*/config.yaml');
    const clientConfig = await this.loadConfigFile('.mds/config.yaml');

    // Merge with priority: client > module > core
    this.config = this.mergeConfigs(coreConfig, moduleConfig, clientConfig);
  }

  private async loadConfigFile(pattern: string): Promise<Record<string, any>> {
    // Implementation: Load and parse YAML config files
    return {};
  }

  private mergeConfigs(...configs: Record<string, any>[]): OrchestratorConfig {
    // Deep merge with later configs taking precedence
    return configs.reduce((merged, config) => {
      return { ...merged, ...config };
    }, {} as OrchestratorConfig);
  }

  private async loadAgents(): Promise<void> {
    // Load agent definitions from:
    // 1. core/agents/*.agent.yaml
    // 2. modules/*/agents/*.agent.yaml
    // 3. .mds/agents/*.agent.yaml (client custom)
    console.log('[MDS] Loading agent definitions...');
  }

  private async loadWorkflows(): Promise<void> {
    // Load workflow definitions from:
    // 1. core/workflows/*/workflow.yaml
    // 2. modules/*/workflows/*/workflow.yaml
    // 3. .mds/workflows/*.yaml (client custom)
    console.log('[MDS] Loading workflow definitions...');
  }

  // --------------------------------------------------------------------------
  // INVOCATION API
  // --------------------------------------------------------------------------

  /**
   * Main entry point for all invocations
   */
  async invoke(request: InvocationRequest): Promise<ExecutionResult> {
    console.log(`[MDS] Invoking ${request.type}: ${request.target}`);

    // Build execution context
    const context = await this.buildContext(request);

    // Route to appropriate handler
    switch (request.type) {
      case 'agent':
        return this.invokeAgent(request.target, request.input, context);
      case 'workflow':
        return this.invokeWorkflow(request.target, request.input, context);
      case 'task':
        return this.invokeTask(request.target, request.input, context);
      case 'protocol':
        return this.invokeProtocol(request.target, request.input, context);
      default:
        throw new Error(`Unknown invocation type: ${request.type}`);
    }
  }

  /**
   * Invoke a specific agent with a task
   */
  async invokeAgent(
    agentId: string,
    input: Record<string, any>,
    context: ExecutionContext
  ): Promise<ExecutionResult> {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent not found: ${agentId}`);
    }

    // Build agent-specific context
    const agentContext = {
      ...context,
      agent: {
        id: agent.metadata.id,
        name: agent.metadata.name,
        role: agent.persona.role,
        principles: agent.persona.principles
      }
    };

    // Check if this maps to a workflow
    const menuItem = agent.menu?.find(m => m.trigger === input.action);
    if (menuItem?.workflow) {
      return this.invokeWorkflow(menuItem.workflow, input, agentContext);
    }

    // Direct agent invocation
    return this.executeAgentPrompt(agent, input, agentContext);
  }

  /**
   * Invoke a workflow with state management
   */
  async invokeWorkflow(
    workflowId: string,
    input: Record<string, any>,
    context: ExecutionContext
  ): Promise<ExecutionResult> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    // Initialize or resume workflow state
    const state = await this.stateMachine.getOrCreateState(workflowId, context);

    // Check for continuation
    if (state.status === 'in_progress') {
      return this.continueWorkflow(workflow, state, context);
    }

    // Start fresh workflow
    return this.startWorkflow(workflow, input, context);
  }

  /**
   * Invoke an atomic task
   */
  async invokeTask(
    taskId: string,
    input: Record<string, any>,
    context: ExecutionContext
  ): Promise<ExecutionResult> {
    // Tasks are atomic, single-step operations
    const taskPath = this.resolveTaskPath(taskId);
    const taskDefinition = await this.loadTaskDefinition(taskPath);

    return this.executeTask(taskDefinition, input, context);
  }

  /**
   * Invoke a reusable protocol
   */
  async invokeProtocol(
    protocolId: string,
    input: Record<string, any>,
    context: ExecutionContext
  ): Promise<ExecutionResult> {
    // Protocols are reusable patterns (validation, escalation, etc.)
    const protocol = await this.loadProtocol(protocolId);
    return this.executeProtocol(protocol, input, context);
  }

  // --------------------------------------------------------------------------
  // CONTEXT MANAGEMENT
  // --------------------------------------------------------------------------

  private async buildContext(request: InvocationRequest): Promise<ExecutionContext> {
    // Start with base context
    const baseContext = this.contextManager.getBaseContext();

    // Add request-specific context
    const requestContext = {
      ...baseContext,
      request: {
        type: request.type,
        target: request.target,
        timestamp: new Date().toISOString()
      },
      input: request.input
    };

    // Inject smart context if needed
    if (request.context?.requiresDocuments) {
      const documents = await this.contextManager.discoverDocuments(
        request.context.documentPatterns || []
      );
      requestContext.documents = documents;
    }

    return requestContext;
  }

  // --------------------------------------------------------------------------
  // WORKFLOW EXECUTION
  // --------------------------------------------------------------------------

  private async startWorkflow(
    workflow: WorkflowDefinition,
    input: Record<string, any>,
    context: ExecutionContext
  ): Promise<ExecutionResult> {
    console.log(`[MDS] Starting workflow: ${workflow.name}`);

    // Create initial state
    const state = await this.stateMachine.createState(workflow.id, {
      status: 'in_progress',
      currentStep: 1,
      completedSteps: [],
      variables: this.resolveVariables(workflow.variables, context),
      artifacts: []
    });

    // Load workflow components
    const template = workflow.template
      ? await this.loadTemplate(workflow.template)
      : null;
    const instructions = await this.loadInstructions(workflow.instructions);

    // Execute step by step
    return this.executeWorkflowSteps(workflow, instructions, state, context);
  }

  private async continueWorkflow(
    workflow: WorkflowDefinition,
    state: WorkflowState,
    context: ExecutionContext
  ): Promise<ExecutionResult> {
    console.log(`[MDS] Continuing workflow: ${workflow.name} from step ${state.currentStep}`);

    const instructions = await this.loadInstructions(workflow.instructions);

    // Resume from current step
    return this.executeWorkflowSteps(workflow, instructions, state, context);
  }

  private async executeWorkflowSteps(
    workflow: WorkflowDefinition,
    instructions: WorkflowInstructions,
    state: WorkflowState,
    context: ExecutionContext
  ): Promise<ExecutionResult> {
    const results: StepResult[] = [];

    for (let i = state.currentStep; i <= instructions.steps.length; i++) {
      const step = instructions.steps[i - 1];

      // Check step conditions
      if (step.condition && !this.evaluateCondition(step.condition, state)) {
        continue;
      }

      // Execute step
      const stepResult = await this.executeStep(step, state, context);
      results.push(stepResult);

      // Handle step result
      if (stepResult.status === 'halt') {
        await this.stateMachine.updateState(workflow.id, {
          ...state,
          currentStep: i,
          haltReason: stepResult.haltReason
        });
        return {
          status: 'halted',
          message: stepResult.haltReason,
          state: state,
          results
        };
      }

      if (stepResult.status === 'await_input') {
        await this.stateMachine.updateState(workflow.id, {
          ...state,
          currentStep: i,
          awaitingInput: stepResult.inputRequired
        });
        return {
          status: 'awaiting_input',
          message: stepResult.prompt,
          inputRequired: stepResult.inputRequired,
          state: state,
          results
        };
      }

      // Update state
      state.completedSteps.push(i);
      state.currentStep = i + 1;

      // Handle goto
      if (stepResult.goto) {
        state.currentStep = stepResult.goto;
        i = stepResult.goto - 1; // Loop will increment
      }

      // Save checkpoint
      await this.stateMachine.updateState(workflow.id, state);
    }

    // Workflow complete
    await this.stateMachine.updateState(workflow.id, {
      ...state,
      status: 'completed',
      completedAt: new Date().toISOString()
    });

    return {
      status: 'completed',
      message: 'Workflow completed successfully',
      artifacts: state.artifacts,
      results
    };
  }

  private async executeStep(
    step: WorkflowStep,
    state: WorkflowState,
    context: ExecutionContext
  ): Promise<StepResult> {
    console.log(`[MDS] Executing step ${step.number}: ${step.goal}`);

    // Process step actions
    for (const action of step.actions || []) {
      await this.executeAction(action, state, context);
    }

    // Handle template-output
    if (step.templateOutput) {
      const content = await this.generateContent(step.templateOutput, state, context);
      state.artifacts.push({
        section: step.templateOutput.section,
        content,
        generatedAt: new Date().toISOString()
      });

      // Checkpoint with user options
      if (!context.options?.mode || context.options.mode === 'interactive') {
        return {
          status: 'await_input',
          prompt: `Generated ${step.templateOutput.section}. [c] Continue, [r] Regenerate, [e] Edit`,
          inputRequired: ['action']
        };
      }
    }

    // Handle ask
    if (step.ask) {
      return {
        status: 'await_input',
        prompt: step.ask.prompt,
        inputRequired: step.ask.variables
      };
    }

    return { status: 'success' };
  }

  // --------------------------------------------------------------------------
  // VARIABLE RESOLUTION
  // --------------------------------------------------------------------------

  private resolveVariables(
    variables: Record<string, VariableDefinition>,
    context: ExecutionContext
  ): Record<string, any> {
    const resolved: Record<string, any> = {};

    for (const [key, def] of Object.entries(variables)) {
      if (def.source === 'config') {
        resolved[key] = this.resolveConfigVariable(def.path);
      } else if (def.source === 'system') {
        resolved[key] = this.resolveSystemVariable(def.path);
      } else if (def.source === 'context') {
        resolved[key] = this.getNestedValue(context, def.path);
      } else if (def.default !== undefined) {
        resolved[key] = def.default;
      }
    }

    return resolved;
  }

  private resolveConfigVariable(path: string): any {
    // Resolve {config_source}:key patterns
    const parts = path.split(':');
    if (parts.length === 2) {
      return this.getNestedValue(this.config, parts[1]);
    }
    return this.getNestedValue(this.config, path);
  }

  private resolveSystemVariable(path: string): any {
    const systemVars: Record<string, any> = {
      date: new Date().toISOString().split('T')[0],
      datetime: new Date().toISOString(),
      projectRoot: this.config.projectRoot,
      outputFolder: this.config.outputFolder
    };
    return systemVars[path];
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  }

  // --------------------------------------------------------------------------
  // HELPER METHODS
  // --------------------------------------------------------------------------

  private resolveTaskPath(taskId: string): string {
    return `${this.config.projectRoot}/core/tasks/${taskId}.yaml`;
  }

  private async loadTaskDefinition(path: string): Promise<TaskDefinition> {
    // Load and parse task definition
    return {} as TaskDefinition;
  }

  private async loadProtocol(protocolId: string): Promise<ProtocolDefinition> {
    // Load protocol definition
    return {} as ProtocolDefinition;
  }

  private async loadTemplate(path: string): Promise<string> {
    // Load template file
    return '';
  }

  private async loadInstructions(path: string): Promise<WorkflowInstructions> {
    // Load and parse instructions
    return { steps: [] };
  }

  private evaluateCondition(condition: string, state: WorkflowState): boolean {
    // Simple condition evaluation
    return true;
  }

  private async executeAction(
    action: ActionDefinition,
    state: WorkflowState,
    context: ExecutionContext
  ): Promise<void> {
    // Execute workflow action
  }

  private async generateContent(
    templateOutput: TemplateOutput,
    state: WorkflowState,
    context: ExecutionContext
  ): Promise<string> {
    // Generate content using AI
    return '';
  }

  private async executeAgentPrompt(
    agent: AgentDefinition,
    input: Record<string, any>,
    context: ExecutionContext
  ): Promise<ExecutionResult> {
    // Execute agent prompt with AI
    return { status: 'completed', message: '' };
  }

  private async executeTask(
    task: TaskDefinition,
    input: Record<string, any>,
    context: ExecutionContext
  ): Promise<ExecutionResult> {
    // Execute task
    return { status: 'completed', message: '' };
  }

  private async executeProtocol(
    protocol: ProtocolDefinition,
    input: Record<string, any>,
    context: ExecutionContext
  ): Promise<ExecutionResult> {
    // Execute protocol
    return { status: 'completed', message: '' };
  }
}

// ============================================================================
// SUPPORTING TYPES
// ============================================================================

interface WorkflowState {
  status: 'pending' | 'in_progress' | 'completed' | 'halted';
  currentStep: number;
  completedSteps: number[];
  variables: Record<string, any>;
  artifacts: Artifact[];
  haltReason?: string;
  awaitingInput?: string[];
  completedAt?: string;
}

interface WorkflowInstructions {
  steps: WorkflowStep[];
}

interface WorkflowStep {
  number: number;
  goal: string;
  condition?: string;
  actions?: ActionDefinition[];
  templateOutput?: TemplateOutput;
  ask?: AskDefinition;
}

interface ActionDefinition {
  type: string;
  params: Record<string, any>;
}

interface TemplateOutput {
  section: string;
  template: string;
}

interface AskDefinition {
  prompt: string;
  variables: string[];
}

interface StepResult {
  status: 'success' | 'halt' | 'await_input';
  haltReason?: string;
  prompt?: string;
  inputRequired?: string[];
  goto?: number;
}

interface Artifact {
  section: string;
  content: string;
  generatedAt: string;
}

interface VariableDefinition {
  source: 'config' | 'system' | 'context' | 'input';
  path: string;
  default?: any;
}

interface TaskDefinition {
  id: string;
  name: string;
  actions: ActionDefinition[];
}

interface ProtocolDefinition {
  id: string;
  name: string;
  steps: any[];
}

// Export for use
export default MDSOrchestrator;
