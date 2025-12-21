/**
 * BMAD Framework - Enhanced Configuration Schema
 *
 * Provides comprehensive validation for configuration files including:
 * - Core configuration (config.yaml)
 * - Module configuration
 * - Variable resolution and substitution
 * - Type coercion and defaults
 *
 * @module framework/schemas/config
 */

const { z } = require('zod');

// ============================================================================
// Constants
// ============================================================================

const VALID_MODULES = ['bmm', 'bmb', 'cis', 'bmgd'];
const SKILL_LEVELS = ['beginner', 'intermediate', 'expert'];
const VARIABLE_PATTERN = /\{([^}]+)\}/g;

// ============================================================================
// Primitive Validators
// ============================================================================

function nonEmptyString(fieldName) {
  return z.string().min(1, { message: `${fieldName} must be a non-empty string` });
}

function pathString(fieldName) {
  return z.string().refine(
    (val) => val.includes('{') || val.startsWith('.') || val.startsWith('/') || !val.includes(' '),
    { message: `${fieldName} must be a valid path` }
  );
}

// ============================================================================
// Config Field Schema
// ============================================================================

/**
 * Schema for individual configuration fields that support prompts and defaults.
 */
const configFieldSchema = z.object({
  prompt: z.union([nonEmptyString('prompt'), z.array(nonEmptyString('prompt[]'))]),
  default: z.any(),
  result: z.string().optional(),
  'single-select': z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
        description: z.string().optional(),
      })
    )
    .optional(),
  'multi-select': z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
        description: z.string().optional(),
      })
    )
    .optional(),
  validation: z.string().optional(), // Regex or validation function name
  transform: z.string().optional(), // Transform function name
  depends_on: z.array(z.string()).optional(),
  condition: z.string().optional(),
});

// ============================================================================
// Core Configuration Schema
// ============================================================================

const coreConfigSchema = z.object({
  header: z.string().optional(),
  subheader: z.string().optional(),

  user_name: z.union([configFieldSchema, z.string()]),
  communication_language: z.union([configFieldSchema, z.string()]),
  document_output_language: z.union([configFieldSchema, z.string()]),
  agent_sidecar_folder: z.union([configFieldSchema, z.string()]),
  output_folder: z.union([configFieldSchema, z.string()]),
  install_user_docs: z.union([configFieldSchema, z.boolean()]),
});

// ============================================================================
// Resolved Core Configuration Schema
// ============================================================================

const resolvedCoreConfigSchema = z.object({
  user_name: nonEmptyString('user_name'),
  communication_language: nonEmptyString('communication_language'),
  document_output_language: nonEmptyString('document_output_language'),
  agent_sidecar_folder: pathString('agent_sidecar_folder'),
  output_folder: pathString('output_folder'),
  install_user_docs: z.boolean(),
});

// ============================================================================
// BMM Module Configuration Schema
// ============================================================================

const bmmConfigSchema = z.object({
  code: z.literal('bmm'),
  name: nonEmptyString('name'),
  default_selected: z.boolean().optional(),
  header: z.string().optional(),
  subheader: z.string().optional(),

  project_name: z.union([configFieldSchema, z.string()]),
  user_skill_level: z.union([
    configFieldSchema,
    z.enum(SKILL_LEVELS),
    z.string(),
  ]),
  sprint_artifacts: z.union([configFieldSchema, z.string()]),
  tea_use_mcp_enhancements: z.union([configFieldSchema, z.boolean()]),
  tea_use_playwright_utils: z.union([configFieldSchema, z.boolean()]),
});

const resolvedBmmConfigSchema = z.object({
  code: z.literal('bmm'),
  name: nonEmptyString('name'),
  project_name: nonEmptyString('project_name'),
  user_skill_level: z.enum(SKILL_LEVELS),
  sprint_artifacts: pathString('sprint_artifacts'),
  tea_use_mcp_enhancements: z.boolean(),
  tea_use_playwright_utils: z.boolean(),
  // Inherited from core
  user_name: nonEmptyString('user_name'),
  communication_language: nonEmptyString('communication_language'),
  document_output_language: nonEmptyString('document_output_language'),
  output_folder: pathString('output_folder'),
});

// ============================================================================
// BMB Module Configuration Schema
// ============================================================================

const bmbConfigSchema = z.object({
  code: z.literal('bmb'),
  name: nonEmptyString('name'),
  default_selected: z.boolean().optional(),
  header: z.string().optional(),
  subheader: z.string().optional(),

  custom_stand_alone_location: z.union([configFieldSchema, z.string()]).optional(),
  custom_module_location: z.union([configFieldSchema, z.string()]).optional(),
});

// ============================================================================
// CIS Module Configuration Schema
// ============================================================================

const cisConfigSchema = z.object({
  code: z.literal('cis'),
  name: nonEmptyString('name'),
  default_selected: z.boolean().optional(),
  header: z.string().optional(),
  subheader: z.string().optional(),
  // CIS has no additional config fields
});

// ============================================================================
// BMGD Module Configuration Schema
// ============================================================================

const bmgdConfigSchema = z.object({
  code: z.literal('bmgd'),
  name: nonEmptyString('name'),
  default_selected: z.boolean().optional(),
  header: z.string().optional(),
  subheader: z.string().optional(),

  game_engine: z.union([configFieldSchema, z.string()]).optional(),
  target_platforms: z.union([configFieldSchema, z.array(z.string())]).optional(),
});

// ============================================================================
// Module Configuration Union
// ============================================================================

const moduleConfigSchema = z.discriminatedUnion('code', [
  bmmConfigSchema,
  bmbConfigSchema,
  cisConfigSchema,
  bmgdConfigSchema,
]);

// ============================================================================
// Installation Configuration Schema
// ============================================================================

const installationConfigSchema = z.object({
  version: z.string(),
  installed_at: z.string().datetime(),
  updated_at: z.string().datetime().optional(),
  modules: z.array(z.enum(VALID_MODULES)),
  core: resolvedCoreConfigSchema,
  project_root: pathString('project_root'),
  ide: z.string().optional(),
});

// ============================================================================
// Variable Resolution
// ============================================================================

/**
 * Extract variable names from a string.
 */
function extractVariables(str) {
  if (typeof str !== 'string') return [];
  const matches = str.matchAll(VARIABLE_PATTERN);
  return [...matches].map((m) => m[1]);
}

/**
 * Check if a string contains unresolved variables.
 */
function hasUnresolvedVariables(str) {
  if (typeof str !== 'string') return false;
  return VARIABLE_PATTERN.test(str);
}

/**
 * Resolve variables in a string using a context object.
 */
function resolveVariables(str, context, options = {}) {
  if (typeof str !== 'string') return str;

  const { throwOnMissing = false, defaultValue = '' } = options;

  return str.replace(VARIABLE_PATTERN, (match, varPath) => {
    const parts = varPath.split(':');
    let value;

    if (parts.length === 1) {
      // Simple variable: {variable_name}
      value = context[parts[0]];
    } else {
      // Config reference: {config-source}:property
      const source = context[parts[0]];
      if (source && typeof source === 'object') {
        value = source[parts[1]];
      }
    }

    if (value === undefined) {
      if (throwOnMissing) {
        throw new Error(`Unresolved variable: ${match}`);
      }
      return defaultValue;
    }

    return String(value);
  });
}

/**
 * Recursively resolve all variables in an object.
 */
function resolveAllVariables(obj, context, options = {}) {
  if (typeof obj === 'string') {
    return resolveVariables(obj, context, options);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => resolveAllVariables(item, context, options));
  }

  if (obj && typeof obj === 'object') {
    const resolved = {};
    for (const [key, value] of Object.entries(obj)) {
      resolved[key] = resolveAllVariables(value, context, options);
    }
    return resolved;
  }

  return obj;
}

// ============================================================================
// Configuration Validation Functions
// ============================================================================

/**
 * Validate core configuration file.
 */
function validateCoreConfig(config, options = {}) {
  const result = coreConfigSchema.safeParse(config);

  if (!result.success && options.filePath) {
    result.error.issues = result.error.issues.map((issue) => ({
      ...issue,
      message: `[${options.filePath}] ${issue.message}`,
    }));
  }

  return result;
}

/**
 * Validate resolved core configuration.
 */
function validateResolvedCoreConfig(config, options = {}) {
  return resolvedCoreConfigSchema.safeParse(config);
}

/**
 * Validate module configuration file.
 */
function validateModuleConfig(config, options = {}) {
  const result = moduleConfigSchema.safeParse(config);

  if (!result.success && options.filePath) {
    result.error.issues = result.error.issues.map((issue) => ({
      ...issue,
      message: `[${options.filePath}] ${issue.message}`,
    }));
  }

  return result;
}

/**
 * Validate installation configuration.
 */
function validateInstallationConfig(config, options = {}) {
  return installationConfigSchema.safeParse(config);
}

/**
 * Comprehensive configuration validation with detailed report.
 */
function validateConfigWithReport(config, options = {}) {
  const { type = 'core' } = options;

  let result;
  switch (type) {
    case 'core':
      result = validateCoreConfig(config, options);
      break;
    case 'module':
      result = validateModuleConfig(config, options);
      break;
    case 'installation':
      result = validateInstallationConfig(config, options);
      break;
    default:
      result = { success: false, error: { issues: [{ message: `Unknown config type: ${type}` }] } };
  }

  // Check for unresolved variables
  const unresolvedVars = [];
  const checkUnresolved = (obj, path = '') => {
    if (typeof obj === 'string' && hasUnresolvedVariables(obj)) {
      unresolvedVars.push({ path, value: obj, variables: extractVariables(obj) });
    } else if (Array.isArray(obj)) {
      obj.forEach((item, i) => checkUnresolved(item, `${path}[${i}]`));
    } else if (obj && typeof obj === 'object') {
      Object.entries(obj).forEach(([key, value]) => {
        checkUnresolved(value, path ? `${path}.${key}` : key);
      });
    }
  };
  checkUnresolved(config);

  return {
    valid: result.success,
    config: result.success ? result.data : null,
    errors: result.success
      ? []
      : result.error.issues.map((issue) => ({
          path: issue.path?.join('.') || '',
          message: issue.message,
          code: issue.code,
        })),
    warnings: unresolvedVars.map((v) => ({
      path: v.path,
      message: `Unresolved variables: ${v.variables.join(', ')}`,
      severity: 'warning',
    })),
    metadata: {
      type,
      hasUnresolvedVariables: unresolvedVars.length > 0,
      unresolvedCount: unresolvedVars.length,
    },
  };
}

// ============================================================================
// Configuration Builder
// ============================================================================

/**
 * Build a resolved configuration by merging core and module configs.
 */
function buildResolvedConfig(coreConfig, moduleConfig, context = {}) {
  const baseContext = {
    'project-root': context.projectRoot || process.cwd(),
    directory_name: context.directoryName || require('path').basename(process.cwd()),
    ...context,
  };

  // First pass: resolve core config
  const resolvedCore = resolveAllVariables(
    {
      user_name: extractValue(coreConfig.user_name),
      communication_language: extractValue(coreConfig.communication_language),
      document_output_language: extractValue(coreConfig.document_output_language),
      agent_sidecar_folder: extractValue(coreConfig.agent_sidecar_folder),
      output_folder: extractValue(coreConfig.output_folder),
      install_user_docs: extractValue(coreConfig.install_user_docs),
    },
    baseContext
  );

  // Second pass: resolve module config with core values available
  const moduleContext = {
    ...baseContext,
    ...resolvedCore,
    communication_language: resolvedCore.communication_language,
    output_folder: resolvedCore.output_folder,
  };

  const resolvedModule = moduleConfig
    ? resolveAllVariables(moduleConfig, moduleContext)
    : {};

  return {
    ...resolvedCore,
    ...resolvedModule,
    _meta: {
      resolved_at: new Date().toISOString(),
      project_root: baseContext['project-root'],
    },
  };
}

/**
 * Extract the value from a config field (handles both direct values and field objects).
 */
function extractValue(field) {
  if (field && typeof field === 'object' && 'default' in field) {
    return field.default;
  }
  return field;
}

// ============================================================================
// Exports
// ============================================================================

module.exports = {
  // Schemas
  coreConfigSchema,
  resolvedCoreConfigSchema,
  bmmConfigSchema,
  resolvedBmmConfigSchema,
  bmbConfigSchema,
  cisConfigSchema,
  bmgdConfigSchema,
  moduleConfigSchema,
  installationConfigSchema,
  configFieldSchema,

  // Validators
  validateCoreConfig,
  validateResolvedCoreConfig,
  validateModuleConfig,
  validateInstallationConfig,
  validateConfigWithReport,

  // Variable utilities
  extractVariables,
  hasUnresolvedVariables,
  resolveVariables,
  resolveAllVariables,

  // Config building
  buildResolvedConfig,
  extractValue,

  // Constants
  VALID_MODULES,
  SKILL_LEVELS,
  VARIABLE_PATTERN,
};
