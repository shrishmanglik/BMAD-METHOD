/**
 * BMAD Framework - Module Schema
 *
 * Provides comprehensive validation for module definitions including:
 * - Module manifest validation
 * - Agent and workflow references
 * - Module dependencies
 * - Configuration schema
 *
 * @module framework/schemas/module
 */

const { z } = require('zod');

// ============================================================================
// Constants
// ============================================================================

const VALID_MODULE_CODES = ['bmm', 'bmb', 'cis', 'bmgd'];
const MODULE_PHASES = ['analysis', 'planning', 'solutioning', 'implementation', 'testing'];

// ============================================================================
// Primitive Validators
// ============================================================================

function nonEmptyString(fieldName) {
  return z.string().min(1, { message: `${fieldName} must be a non-empty string` });
}

function pathReference(fieldName) {
  return z.string().min(1, { message: `${fieldName} must be a valid path reference` });
}

// ============================================================================
// Agent Reference Schema
// ============================================================================

const agentReferenceSchema = z.object({
  id: nonEmptyString('agent.id'),
  path: pathReference('agent.path'),
  name: z.string().optional(),
  title: z.string().optional(),
  primary: z.boolean().optional().default(false),
  web_bundle: z.boolean().optional().default(true),
});

// ============================================================================
// Workflow Reference Schema
// ============================================================================

const workflowReferenceSchema = z.object({
  id: nonEmptyString('workflow.id'),
  path: pathReference('workflow.path'),
  name: z.string().optional(),
  phase: z.enum(MODULE_PHASES).optional(),
  category: z.string().optional(),
  web_bundle: z.boolean().optional().default(false),
  standalone: z.boolean().optional().default(false),
});

// ============================================================================
// Team Definition Schema
// ============================================================================

const teamMemberSchema = z.object({
  agent: nonEmptyString('member.agent'),
  role: z.string().optional(),
  required: z.boolean().optional().default(true),
});

const teamDefinitionSchema = z.object({
  id: nonEmptyString('team.id'),
  name: nonEmptyString('team.name'),
  description: z.string().optional(),
  members: z.array(teamMemberSchema).min(1),
  leader: z.string().optional(),
});

// ============================================================================
// Data Resource Schema
// ============================================================================

const dataResourceSchema = z.object({
  id: nonEmptyString('data.id'),
  path: pathReference('data.path'),
  type: z.enum(['yaml', 'json', 'csv', 'markdown', 'text']).optional(),
  description: z.string().optional(),
  schema: z.record(z.any()).optional(),
});

// ============================================================================
// Module Configuration Field Schema
// ============================================================================

const moduleConfigFieldSchema = z.object({
  prompt: z.union([nonEmptyString('prompt'), z.array(nonEmptyString('prompt[]'))]),
  default: z.any(),
  result: z.string().optional(),
  type: z.enum(['string', 'number', 'boolean', 'select', 'multiselect', 'path']).optional(),
  'single-select': z.array(z.object({
    value: z.string(),
    label: z.string(),
    description: z.string().optional(),
  })).optional(),
  'multi-select': z.array(z.object({
    value: z.string(),
    label: z.string(),
    description: z.string().optional(),
  })).optional(),
  validation: z.string().optional(),
  depends_on: z.array(z.string()).optional(),
  condition: z.string().optional(),
});

// ============================================================================
// Module Manifest Schema
// ============================================================================

const moduleManifestSchema = z.object({
  // Core metadata
  code: nonEmptyString('module.code'),
  name: nonEmptyString('module.name'),
  version: z.string().optional().default('1.0.0'),
  description: z.string().optional(),
  author: z.string().optional(),
  license: z.string().optional().default('MIT'),

  // Installation settings
  default_selected: z.boolean().optional().default(false),
  installable: z.boolean().optional().default(true),
  experimental: z.boolean().optional().default(false),

  // UI/Display
  header: z.string().optional(),
  subheader: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),

  // Dependencies
  dependencies: z.object({
    core: z.string().optional().describe('Required core version'),
    modules: z.array(z.string()).optional().describe('Required module codes'),
    tools: z.array(z.string()).optional().describe('Required external tools'),
  }).optional(),

  // Configuration schema
  config: z.record(z.union([
    moduleConfigFieldSchema,
    z.string(),
    z.boolean(),
    z.number(),
  ])).optional(),

  // Resources
  agents: z.array(agentReferenceSchema).optional(),
  workflows: z.array(workflowReferenceSchema).optional(),
  teams: z.array(teamDefinitionSchema).optional(),
  data: z.array(dataResourceSchema).optional(),

  // Extension points
  extends: z.array(z.object({
    module: nonEmptyString('extends.module'),
    agents: z.array(z.string()).optional(),
    workflows: z.array(z.string()).optional(),
  })).optional(),

  // Hooks
  hooks: z.object({
    on_install: z.array(z.string()).optional(),
    on_uninstall: z.array(z.string()).optional(),
    on_update: z.array(z.string()).optional(),
    on_activate: z.array(z.string()).optional(),
  }).optional(),

  // Feature flags
  features: z.record(z.object({
    enabled: z.boolean().default(true),
    description: z.string().optional(),
    experimental: z.boolean().optional(),
  })).optional(),

  // Tags for discovery
  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
});

// ============================================================================
// Installed Module Schema
// ============================================================================

const installedModuleSchema = z.object({
  code: nonEmptyString('installed.code'),
  name: nonEmptyString('installed.name'),
  version: z.string(),
  installed_at: z.string().datetime(),
  updated_at: z.string().datetime().optional(),
  path: pathReference('installed.path'),
  config: z.record(z.any()).optional(),
  enabled: z.boolean().default(true),
  agents: z.array(z.string()).optional(),
  workflows: z.array(z.string()).optional(),
});

// ============================================================================
// Module Registration Schema
// ============================================================================

const moduleRegistrationSchema = z.object({
  manifest: moduleManifestSchema,
  path: pathReference('registration.path'),
  installed_at: z.string().datetime(),
  enabled: z.boolean().default(true),
  config_resolved: z.record(z.any()).optional(),
});

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validate a module manifest.
 */
function validateModuleManifest(manifest, options = {}) {
  const result = moduleManifestSchema.safeParse(manifest);

  if (!result.success && options.filePath) {
    result.error.issues = result.error.issues.map((issue) => ({
      ...issue,
      message: `[${options.filePath}] ${issue.message}`,
    }));
  }

  return result;
}

/**
 * Validate an installed module.
 */
function validateInstalledModule(module, options = {}) {
  return installedModuleSchema.safeParse(module);
}

/**
 * Validate module registration.
 */
function validateModuleRegistration(registration, options = {}) {
  return moduleRegistrationSchema.safeParse(registration);
}

/**
 * Comprehensive module validation with detailed report.
 */
function validateModuleWithReport(module, options = {}) {
  const { type = 'manifest' } = options;

  let result;
  switch (type) {
    case 'manifest':
      result = validateModuleManifest(module, options);
      break;
    case 'installed':
      result = validateInstalledModule(module, options);
      break;
    case 'registration':
      result = validateModuleRegistration(module, options);
      break;
    default:
      result = { success: false, error: { issues: [{ message: `Unknown type: ${type}` }] } };
  }

  const warnings = [];

  // Check for common issues
  if (result.success && module) {
    // No agents defined
    if (!module.agents || module.agents.length === 0) {
      warnings.push({
        path: 'agents',
        message: 'Module has no agents defined',
        severity: 'info',
      });
    }

    // No workflows defined
    if (!module.workflows || module.workflows.length === 0) {
      warnings.push({
        path: 'workflows',
        message: 'Module has no workflows defined',
        severity: 'info',
      });
    }

    // Experimental module
    if (module.experimental) {
      warnings.push({
        path: 'experimental',
        message: 'This module is marked as experimental',
        severity: 'warning',
      });
    }

    // Missing version
    if (!module.version) {
      warnings.push({
        path: 'version',
        message: 'Module should specify a version',
        severity: 'warning',
      });
    }
  }

  return {
    valid: result.success,
    module: result.success ? result.data : null,
    errors: result.success
      ? []
      : result.error.issues.map((issue) => ({
          path: issue.path?.join('.') || '',
          message: issue.message,
          code: issue.code,
        })),
    warnings,
    metadata: result.success
      ? {
          code: result.data.code,
          name: result.data.name,
          version: result.data.version,
          agentCount: result.data.agents?.length || 0,
          workflowCount: result.data.workflows?.length || 0,
          teamCount: result.data.teams?.length || 0,
          hasConfig: Object.keys(result.data.config || {}).length > 0,
          hasDependencies: !!(result.data.dependencies?.modules?.length),
        }
      : null,
  };
}

/**
 * Validate module dependencies.
 */
function validateModuleDependencies(manifest, installedModules) {
  const errors = [];
  const warnings = [];

  const deps = manifest.dependencies || {};

  // Check module dependencies
  if (deps.modules && deps.modules.length > 0) {
    for (const depCode of deps.modules) {
      const found = installedModules.find((m) => m.code === depCode);
      if (!found) {
        errors.push({
          type: 'missing_dependency',
          dependency: depCode,
          message: `Required module not installed: ${depCode}`,
        });
      } else if (!found.enabled) {
        warnings.push({
          type: 'disabled_dependency',
          dependency: depCode,
          message: `Dependent module is disabled: ${depCode}`,
        });
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// ============================================================================
// Exports
// ============================================================================

module.exports = {
  // Schemas
  moduleManifestSchema,
  installedModuleSchema,
  moduleRegistrationSchema,
  agentReferenceSchema,
  workflowReferenceSchema,
  teamDefinitionSchema,
  dataResourceSchema,
  moduleConfigFieldSchema,

  // Validators
  validateModuleManifest,
  validateInstalledModule,
  validateModuleRegistration,
  validateModuleWithReport,
  validateModuleDependencies,

  // Constants
  VALID_MODULE_CODES,
  MODULE_PHASES,
};
