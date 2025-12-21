/**
 * BMAD Framework - Enhanced Workflow Schema
 *
 * Provides comprehensive validation for workflow definitions including:
 * - YAML-based workflows (workflow.yaml)
 * - Markdown-based step workflows (workflow.md)
 * - Step file validation
 * - State tracking validation
 *
 * @module framework/schemas/workflow
 */

const { z } = require('zod');

// ============================================================================
// Constants
// ============================================================================

const WORKFLOW_TYPES = ['prescriptive', 'intent-driven', 'hybrid'];
const STEP_STATUSES = ['pending', 'active', 'completed', 'skipped', 'failed'];
const LOADING_STRATEGIES = ['smart', 'eager', 'lazy', 'jit'];
const OUTPUT_MODES = ['create', 'append', 'replace', 'merge'];

// ============================================================================
// Primitive Validators
// ============================================================================

function nonEmptyString(fieldName) {
  return z.string().min(1, { message: `${fieldName} must be a non-empty string` });
}

function pathReference(fieldName) {
  return z.string().min(1, {
    message: `${fieldName} must be a valid path reference`,
  });
}

// ============================================================================
// Config Source Schema
// ============================================================================

const configSourceSchema = z.object({
  path: pathReference('config_source.path'),
  required: z.boolean().optional().default(true),
  fallback: z.record(z.any()).optional(),
});

// ============================================================================
// Input File Schema
// ============================================================================

const inputFileSchema = z.object({
  pattern: nonEmptyString('input.pattern'),
  loading_strategy: z.enum(LOADING_STRATEGIES).optional().default('smart'),
  required: z.boolean().optional().default(false),
  alias: z.string().optional(),
  transform: z.string().optional(), // e.g., "yaml", "json", "markdown"
});

// ============================================================================
// Output File Schema
// ============================================================================

const outputFileSchema = z.object({
  path: pathReference('output.path'),
  mode: z.enum(OUTPUT_MODES).optional().default('create'),
  template: pathReference('output.template').optional(),
  validate: z.boolean().optional().default(true),
  backup: z.boolean().optional().default(false),
});

// ============================================================================
// Step Schema (for markdown workflows)
// ============================================================================

const stepSchema = z.object({
  id: nonEmptyString('step.id'),
  file: pathReference('step.file'),
  name: nonEmptyString('step.name'),
  description: z.string().optional(),
  status: z.enum(STEP_STATUSES).optional().default('pending'),
  required: z.boolean().optional().default(true),
  dependencies: z.array(z.string()).optional(),
  timeout: z.number().positive().optional(),
  retry: z
    .object({
      max_attempts: z.number().int().min(1).max(5).optional().default(1),
      delay_ms: z.number().int().min(0).optional().default(1000),
    })
    .optional(),
  validation: z
    .object({
      checklist: pathReference('step.validation.checklist').optional(),
      schema: z.record(z.any()).optional(),
      custom: z.string().optional(),
    })
    .optional(),
  outputs: z.array(z.string()).optional(),
  rollback: z.string().optional(),
});

// ============================================================================
// Workflow Variables Schema
// ============================================================================

const workflowVariableSchema = z.object({
  name: nonEmptyString('variable.name'),
  type: z.enum(['string', 'number', 'boolean', 'array', 'object']).optional().default('string'),
  source: z.enum(['config', 'input', 'computed', 'system']).optional(),
  path: z.string().optional(),
  default: z.any().optional(),
  required: z.boolean().optional().default(false),
  validate: z.string().optional(),
});

// ============================================================================
// Workflow Hooks Schema
// ============================================================================

const workflowHooksSchema = z.object({
  before_start: z.array(z.string()).optional(),
  after_complete: z.array(z.string()).optional(),
  on_error: z.array(z.string()).optional(),
  on_cancel: z.array(z.string()).optional(),
  before_step: z.array(z.string()).optional(),
  after_step: z.array(z.string()).optional(),
});

// ============================================================================
// YAML Workflow Schema
// ============================================================================

const yamlWorkflowSchema = z
  .object({
    // Core metadata
    name: nonEmptyString('workflow.name'),
    description: nonEmptyString('workflow.description'),
    author: z.string().optional(),
    version: z.string().optional(),
    module: z.string().optional(),

    // Configuration
    config_source: z.union([pathReference('config_source'), configSourceSchema]).optional(),

    // Variables from config
    output_folder: z.string().optional(),
    user_name: z.string().optional(),
    communication_language: z.string().optional(),
    user_skill_level: z.string().optional(),
    document_output_language: z.string().optional(),

    // Paths and resources
    installed_path: pathReference('installed_path').optional(),
    instructions: pathReference('instructions').optional(),
    validation: pathReference('validation').optional(),

    // Inputs and outputs
    inputs: z.array(inputFileSchema).optional(),
    outputs: z.array(outputFileSchema).optional(),

    // Additional config variables (dynamic)
    variables: z.array(workflowVariableSchema).optional(),

    // Execution settings
    standalone: z.boolean().optional().default(false),
    web_bundle: z.boolean().optional().default(false),
    parallel_execution: z.boolean().optional().default(false),
    timeout_ms: z.number().positive().optional(),

    // Hooks
    hooks: workflowHooksSchema.optional(),

    // Type classification
    type: z.enum(WORKFLOW_TYPES).optional(),

    // Dependencies
    requires_agents: z.array(z.string()).optional(),
    requires_workflows: z.array(z.string()).optional(),
    requires_tools: z.array(z.string()).optional(),

    // Tags for discovery
    tags: z.array(z.string()).optional(),
    phase: z.string().optional(),
    category: z.string().optional(),
  })
  .passthrough(); // Allow additional config variables

// ============================================================================
// Markdown Workflow Schema
// ============================================================================

const markdownWorkflowFrontmatterSchema = z.object({
  name: nonEmptyString('frontmatter.name'),
  description: nonEmptyString('frontmatter.description'),
  web_bundle: z.boolean().optional().default(false),
  version: z.string().optional(),
  author: z.string().optional(),

  // Step tracking
  current_step: z.string().optional(),
  completed_steps: z.array(z.string()).optional(),

  // State
  status: z.enum(['not_started', 'in_progress', 'completed', 'failed', 'cancelled']).optional(),
  started_at: z.string().datetime().optional(),
  completed_at: z.string().datetime().optional(),

  // Variables
  variables: z.record(z.any()).optional(),
});

// ============================================================================
// Step File Schema
// ============================================================================

const stepFileFrontmatterSchema = z.object({
  step_id: nonEmptyString('step.id'),
  step_name: nonEmptyString('step.name'),
  dependencies: z.array(z.string()).optional(),
  outputs: z.array(z.string()).optional(),
  validation_required: z.boolean().optional().default(false),
  user_approval_required: z.boolean().optional().default(false),
});

// ============================================================================
// Workflow State Schema
// ============================================================================

const workflowStateSchema = z.object({
  workflow_id: nonEmptyString('state.workflow_id'),
  instance_id: z.string().uuid(),
  status: z.enum(['pending', 'running', 'paused', 'completed', 'failed', 'cancelled']),
  current_step: z.string().optional(),

  // Timing
  created_at: z.string().datetime(),
  started_at: z.string().datetime().optional(),
  updated_at: z.string().datetime(),
  completed_at: z.string().datetime().optional(),

  // Step tracking
  steps: z.array(
    z.object({
      id: z.string(),
      status: z.enum(STEP_STATUSES),
      started_at: z.string().datetime().optional(),
      completed_at: z.string().datetime().optional(),
      error: z.string().optional(),
      outputs: z.record(z.any()).optional(),
    })
  ),

  // Context
  context: z.record(z.any()).optional(),
  variables: z.record(z.any()).optional(),

  // Error handling
  errors: z.array(
    z.object({
      step_id: z.string().optional(),
      code: z.string(),
      message: z.string(),
      timestamp: z.string().datetime(),
      recoverable: z.boolean(),
    })
  ).optional(),

  // Checkpoints for recovery
  checkpoints: z.array(
    z.object({
      step_id: z.string(),
      timestamp: z.string().datetime(),
      state: z.record(z.any()),
    })
  ).optional(),
});

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validate a YAML workflow definition.
 */
function validateYamlWorkflow(workflowYaml, options = {}) {
  const result = yamlWorkflowSchema.safeParse(workflowYaml);

  if (!result.success && options.filePath) {
    result.error.issues = result.error.issues.map((issue) => ({
      ...issue,
      message: `[${options.filePath}] ${issue.message}`,
    }));
  }

  return result;
}

/**
 * Validate markdown workflow frontmatter.
 */
function validateMarkdownWorkflow(frontmatter, options = {}) {
  return markdownWorkflowFrontmatterSchema.safeParse(frontmatter);
}

/**
 * Validate a step file frontmatter.
 */
function validateStepFile(frontmatter, options = {}) {
  return stepFileFrontmatterSchema.safeParse(frontmatter);
}

/**
 * Validate workflow state.
 */
function validateWorkflowState(state, options = {}) {
  return workflowStateSchema.safeParse(state);
}

/**
 * Comprehensive workflow validation with detailed report.
 */
function validateWorkflowWithReport(workflow, options = {}) {
  const isYaml = options.type === 'yaml' || (typeof workflow === 'object' && !workflow.frontmatter);
  const result = isYaml ? validateYamlWorkflow(workflow, options) : validateMarkdownWorkflow(workflow, options);

  return {
    valid: result.success,
    workflow: result.success ? result.data : null,
    errors: result.success
      ? []
      : result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
          code: issue.code,
        })),
    warnings: generateWorkflowWarnings(workflow),
    metadata: result.success
      ? {
          name: result.data.name,
          type: options.type || 'yaml',
          webBundle: result.data.web_bundle || false,
          standalone: result.data.standalone || false,
          hasHooks: !!(result.data.hooks && Object.keys(result.data.hooks).length > 0),
        }
      : null,
  };
}

/**
 * Generate warnings for common workflow issues.
 */
function generateWorkflowWarnings(workflow) {
  const warnings = [];

  if (!workflow) return warnings;

  // Missing description detail
  if (workflow.description && workflow.description.length < 20) {
    warnings.push({
      path: 'description',
      message: 'Consider providing a more detailed description',
      severity: 'info',
    });
  }

  // Web bundle without validation
  if (workflow.web_bundle && !workflow.validation) {
    warnings.push({
      path: 'validation',
      message: 'Web bundle workflows should include validation checklist',
      severity: 'warning',
    });
  }

  // No error hooks
  if (!workflow.hooks?.on_error) {
    warnings.push({
      path: 'hooks.on_error',
      message: 'Consider adding on_error hook for better error handling',
      severity: 'info',
    });
  }

  return warnings;
}

// ============================================================================
// Exports
// ============================================================================

module.exports = {
  // Schemas
  yamlWorkflowSchema,
  markdownWorkflowFrontmatterSchema,
  stepFileFrontmatterSchema,
  stepSchema,
  workflowStateSchema,
  workflowVariableSchema,
  workflowHooksSchema,

  // Validators
  validateYamlWorkflow,
  validateMarkdownWorkflow,
  validateStepFile,
  validateWorkflowState,
  validateWorkflowWithReport,

  // Constants
  WORKFLOW_TYPES,
  STEP_STATUSES,
  LOADING_STRATEGIES,
  OUTPUT_MODES,
};
