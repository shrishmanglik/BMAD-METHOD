/**
 * MDS Framework - Core Type Definitions
 *
 * Central type definitions for the entire MDS Framework.
 * All modules should import types from this file.
 *
 * @module core/engine/types
 * @version 1.0.0
 */

// ============================================================================
// AGENT TYPES
// ============================================================================

export interface AgentDefinition {
  metadata: AgentMetadata;
  persona: AgentPersona;
  criticalActions?: string[];
  menu?: AgentMenuItem[];
  prompts?: AgentPrompt[];
}

export interface AgentMetadata {
  id: string;
  name: string;
  title: string;
  icon: string;
  module: string;
  version?: string;
  description?: string;
}

export interface AgentPersona {
  role: string;
  identity: string;
  communicationStyle: string;
  principles: string;
  expertise?: string[];
  background?: string;
}

export interface AgentMenuItem {
  trigger: string;
  description: string;
  workflow?: string;
  exec?: string;
  task?: string;
  webOnly?: boolean;
  ideOnly?: boolean;
}

export interface AgentPrompt {
  id: string;
  name: string;
  content: string;
  variables?: string[];
}

// ============================================================================
// WORKFLOW TYPES
// ============================================================================

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  author?: string;
  version?: string;

  // Configuration
  configSource: string;
  variables: Record<string, VariableConfig>;

  // Components
  template?: string;
  instructions: string;
  validation?: string;

  // Input patterns for context discovery
  inputFilePatterns?: InputPattern[];

  // Output configuration
  defaultOutputFile?: string;
  outputFolder?: string;

  // Execution options
  standalone?: boolean;
  modes?: WorkflowMode[];

  // Integration
  webBundle?: WebBundleConfig;
}

export interface VariableConfig {
  source: 'config' | 'system' | 'context' | 'input' | 'computed';
  path?: string;
  default?: any;
  prompt?: string;
  required?: boolean;
  validation?: string;
}

export interface InputPattern {
  name: string;
  pattern: string;
  strategy: 'full_load' | 'selective_load' | 'index_guided';
  required?: boolean;
}

export interface WorkflowMode {
  name: string;
  description: string;
  entryStep: number;
}

export interface WebBundleConfig {
  name: string;
  description: string;
  files: string[];
}

// ============================================================================
// EXECUTION TYPES
// ============================================================================

export interface ExecutionContext {
  // Core identifiers
  sessionId: string;
  projectId: string;
  engagementId?: string;

  // Client information
  client: {
    name: string;
    industry: string;
    preferences: ClientPreferences;
  };

  // Current agent (if applicable)
  agent?: {
    id: string;
    name: string;
    role: string;
    principles: string;
  };

  // Request information
  request: {
    type: string;
    target: string;
    timestamp: string;
  };

  // Input data
  input: Record<string, any>;

  // Loaded documents
  documents?: LoadedDocument[];

  // User information
  user: {
    name: string;
    role: string;
    skillLevel: 'beginner' | 'intermediate' | 'expert';
  };

  // Execution options
  options?: ExecutionOptions;

  // Variables resolved from config
  variables: Record<string, any>;
}

export interface ClientPreferences {
  communicationStyle: 'formal' | 'casual' | 'technical';
  documentFormat: 'markdown' | 'docx' | 'pdf';
  language: string;
  timezone?: string;
}

export interface ExecutionOptions {
  mode: 'interactive' | 'autonomous' | 'validation';
  timeout?: number;
  retries?: number;
  checkpoints?: boolean;
  verbose?: boolean;
}

export interface LoadedDocument {
  path: string;
  name: string;
  content: string;
  type: string;
  loadedAt: string;
}

// ============================================================================
// RESULT TYPES
// ============================================================================

export interface ExecutionResult {
  status: 'completed' | 'halted' | 'awaiting_input' | 'error';
  message: string;
  artifacts?: GeneratedArtifact[];
  state?: any;
  results?: any[];
  inputRequired?: string[];
  error?: ExecutionError;
}

export interface GeneratedArtifact {
  id: string;
  type: ArtifactType;
  name: string;
  path?: string;
  content: string;
  generatedBy: string;
  generatedAt: string;
  version: number;
  metadata?: Record<string, any>;
}

export type ArtifactType =
  | 'document'
  | 'prd'
  | 'architecture'
  | 'design'
  | 'epic'
  | 'story'
  | 'test_plan'
  | 'code'
  | 'report'
  | 'presentation'
  | 'custom';

export interface ExecutionError {
  code: string;
  message: string;
  details?: any;
  recoverable: boolean;
  suggestions?: string[];
}

// ============================================================================
// STATE TYPES
// ============================================================================

export interface WorkflowState {
  id: string;
  workflowId: string;
  projectId: string;
  status: WorkflowStatus;
  currentStep: number;
  completedSteps: number[];
  variables: Record<string, any>;
  artifacts: GeneratedArtifact[];
  checkpoints: Checkpoint[];
  history: StateTransition[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  haltReason?: string;
  awaitingInput?: AwaitingInput;
}

export type WorkflowStatus =
  | 'pending'
  | 'in_progress'
  | 'paused'
  | 'awaiting_input'
  | 'completed'
  | 'halted'
  | 'error';

export interface Checkpoint {
  stepNumber: number;
  timestamp: string;
  state: Record<string, any>;
  artifacts: string[]; // artifact IDs
}

export interface StateTransition {
  from: WorkflowStatus;
  to: WorkflowStatus;
  trigger: string;
  timestamp: string;
  details?: string;
}

export interface AwaitingInput {
  prompt: string;
  variables: string[];
  options?: string[];
  timeout?: number;
}

// ============================================================================
// TASK TYPES
// ============================================================================

export interface TaskDefinition {
  id: string;
  name: string;
  description: string;
  standalone?: boolean;

  // Inputs
  inputs: TaskInput[];

  // Execution flow
  flow: TaskStep[];

  // Output
  outputFormat?: string;
}

export interface TaskInput {
  name: string;
  description: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'file';
  required?: boolean;
  default?: any;
  validation?: string;
}

export interface TaskStep {
  number: number;
  title: string;
  critical?: boolean;
  actions: TaskAction[];
}

export interface TaskAction {
  type: 'action' | 'check' | 'mandate' | 'ask' | 'output' | 'goto';
  content: string;
  condition?: string;
  target?: string | number;
}

// ============================================================================
// PROTOCOL TYPES
// ============================================================================

export interface ProtocolDefinition {
  id: string;
  name: string;
  description: string;
  category: ProtocolCategory;
  steps: ProtocolStep[];
  triggers?: ProtocolTrigger[];
}

export type ProtocolCategory =
  | 'context_injection'
  | 'validation'
  | 'escalation'
  | 'handoff'
  | 'recovery'
  | 'quality_gate';

export interface ProtocolStep {
  number: number;
  name: string;
  description: string;
  actions: ProtocolAction[];
}

export interface ProtocolAction {
  type: string;
  params: Record<string, any>;
}

export interface ProtocolTrigger {
  event: string;
  condition?: string;
  auto?: boolean;
}

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

export interface MDSConfig {
  // Core settings
  core: CoreConfig;

  // Client settings
  client: ClientConfig;

  // Module settings
  modules: ModuleConfig[];

  // Integration settings
  integrations: IntegrationConfig;

  // Output settings
  output: OutputConfig;
}

export interface CoreConfig {
  projectRoot: string;
  configPath: string;
  version: string;
  language: string;
  documentLanguage: string;
}

export interface ClientConfig {
  id: string;
  name: string;
  industry: string;
  engagementType: EngagementType;
  preferences: ClientPreferences;
  contacts?: ContactInfo[];
}

export type EngagementType =
  | 'consulting'
  | 'development'
  | 'delivery'
  | 'managed_services'
  | 'custom';

export interface ContactInfo {
  name: string;
  role: string;
  email: string;
  primary?: boolean;
}

export interface ModuleConfig {
  id: string;
  name: string;
  enabled: boolean;
  config?: Record<string, any>;
}

export interface IntegrationConfig {
  googleAI?: GoogleAIConfig;
  n8n?: N8nConfig;
  database?: DatabaseConfig;
  notifications?: NotificationConfig;
}

export interface GoogleAIConfig {
  enabled: boolean;
  apiKey: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}

export interface N8nConfig {
  enabled: boolean;
  baseUrl: string;
  apiKey: string;
  webhookSecret?: string;
}

export interface DatabaseConfig {
  type: 'postgres' | 'sqlite' | 'firestore' | 'mongodb';
  connectionString: string;
  pool?: {
    min: number;
    max: number;
  };
}

export interface NotificationConfig {
  slack?: {
    webhookUrl: string;
    channel: string;
  };
  email?: {
    smtp: string;
    from: string;
  };
}

export interface OutputConfig {
  folder: string;
  format: 'markdown' | 'docx' | 'pdf';
  naming: {
    pattern: string;
    dateFormat: string;
  };
  versioning: boolean;
}

// ============================================================================
// EVENT TYPES
// ============================================================================

export interface MDSEvent {
  id: string;
  type: EventType;
  source: string;
  timestamp: string;
  data: Record<string, any>;
  metadata?: Record<string, any>;
}

export type EventType =
  | 'workflow.started'
  | 'workflow.completed'
  | 'workflow.halted'
  | 'workflow.error'
  | 'step.started'
  | 'step.completed'
  | 'agent.invoked'
  | 'agent.responded'
  | 'artifact.created'
  | 'artifact.updated'
  | 'validation.passed'
  | 'validation.failed'
  | 'escalation.triggered'
  | 'user.input_received';

// ============================================================================
// VALIDATION TYPES
// ============================================================================

export interface ValidationResult {
  passed: boolean;
  score: number;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  partialChecks: number;
  items: ValidationItem[];
  summary: string;
  recommendations?: string[];
}

export interface ValidationItem {
  id: string;
  category: string;
  requirement: string;
  status: 'pass' | 'fail' | 'partial' | 'na';
  evidence?: string;
  impact?: 'critical' | 'high' | 'medium' | 'low';
  recommendation?: string;
}

// ============================================================================
// HELPER TYPES
// ============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
