/**
 * BMAD Framework - Enhanced Agent Schema
 *
 * Provides comprehensive validation for agent definitions with:
 * - Strict type checking
 * - Semantic validation
 * - Cross-field validation
 * - Helpful error messages
 *
 * @module framework/schemas/agent
 */

const { z } = require('zod');

// ============================================================================
// Constants
// ============================================================================

const VALID_MODULES = ['bmm', 'bmb', 'cis', 'bmgd', 'core'];
const COMMAND_TARGET_KEYS = ['workflow', 'validate-workflow', 'exec', 'action', 'tmpl', 'data'];
const TRIGGER_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ID_PATH_PATTERN = /^\.bmad\/(?:core|[a-z]+)\/agents\/[\w-]+\.md$/;

// ============================================================================
// Primitive Validators
// ============================================================================

/**
 * Creates a non-empty string validator with a descriptive error message.
 */
function nonEmptyString(fieldName) {
  return z.string().min(1, { message: `${fieldName} must be a non-empty string` });
}

/**
 * Creates a kebab-case string validator.
 */
function kebabCaseString(fieldName) {
  return z.string().regex(TRIGGER_PATTERN, {
    message: `${fieldName} must be kebab-case (lowercase letters, numbers, hyphens only)`,
  });
}

/**
 * Creates a path reference validator.
 */
function pathReference(fieldName) {
  return z
    .string()
    .min(1)
    .refine((val) => val.includes('{') || val.startsWith('.') || val.startsWith('/'), {
      message: `${fieldName} must be a valid path reference (use {project-root} or relative path)`,
    });
}

// ============================================================================
// Metadata Schema
// ============================================================================

const metadataSchema = z
  .object({
    id: nonEmptyString('agent.metadata.id').refine(
      (val) => ID_PATH_PATTERN.test(val) || val.includes('.bmad/'),
      { message: 'agent.metadata.id must follow the pattern .bmad/[module]/agents/[name].md' }
    ),
    name: nonEmptyString('agent.metadata.name'),
    title: nonEmptyString('agent.metadata.title'),
    icon: z.string().emoji({ message: 'agent.metadata.icon must be a valid emoji' }).or(z.string().min(1)),
    module: z.enum(VALID_MODULES).optional(),
    version: z.string().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
  })
  .strict();

// ============================================================================
// Persona Schema
// ============================================================================

const personaSchema = z
  .object({
    role: nonEmptyString('agent.persona.role').describe(
      "The agent's primary role and responsibilities"
    ),
    identity: nonEmptyString('agent.persona.identity').describe(
      "Background, expertise, and personality"
    ),
    communication_style: nonEmptyString('agent.persona.communication_style').describe(
      'How the agent communicates with users'
    ),
    principles: z
      .union([
        nonEmptyString('agent.persona.principles'),
        z.array(nonEmptyString('agent.persona.principles[]')).min(1, {
          message: 'agent.persona.principles must have at least one entry',
        }),
      ])
      .describe('Core operational principles guiding agent behavior'),
    expertise: z.array(z.string()).optional().describe('Areas of specialized knowledge'),
    limitations: z.array(z.string()).optional().describe('Known limitations or boundaries'),
  })
  .strict();

// ============================================================================
// Menu Item Schemas
// ============================================================================

/**
 * Legacy menu item format (single trigger per item)
 */
const legacyMenuItemSchema = z
  .object({
    trigger: kebabCaseString('agent.menu[].trigger'),
    description: nonEmptyString('agent.menu[].description'),
    workflow: pathReference('agent.menu[].workflow').optional(),
    'workflow-install': pathReference('agent.menu[].workflow-install').optional(),
    'validate-workflow': pathReference('agent.menu[].validate-workflow').optional(),
    exec: pathReference('agent.menu[].exec').optional(),
    action: z.string().optional(),
    tmpl: pathReference('agent.menu[].tmpl').optional(),
    data: z.string().optional(),
    checklist: pathReference('agent.menu[].checklist').optional(),
    document: pathReference('agent.menu[].document').optional(),
    'ide-only': z.boolean().optional(),
    'web-only': z.boolean().optional(),
    discussion: z.boolean().optional(),
    deprecated: z.boolean().optional(),
    'deprecated-message': z.string().optional(),
  })
  .strict()
  .refine(
    (item) => COMMAND_TARGET_KEYS.some((key) => item[key]?.trim?.()),
    { message: 'Menu item must include at least one command target (workflow, exec, action, tmpl, or data)' }
  );

/**
 * Multi-trigger format (multiple triggers per group)
 */
const multiTriggerItemSchema = z.object({
  trigger: kebabCaseString('trigger').optional(),
  input: nonEmptyString('input'),
  route: pathReference('route').optional(),
  action: z.string().optional(),
  data: z.string().optional(),
  type: z.enum(['exec', 'action', 'workflow']).optional(),
});

const multiMenuItemSchema = z
  .object({
    multi: nonEmptyString('agent.menu[].multi'),
    triggers: z.array(z.union([multiTriggerItemSchema, z.record(z.any())])).min(1),
    discussion: z.boolean().optional(),
  })
  .strict();

const menuItemSchema = z.union([legacyMenuItemSchema, multiMenuItemSchema]);

// ============================================================================
// Prompt Schema
// ============================================================================

const promptSchema = z
  .object({
    id: kebabCaseString('agent.prompts[].id'),
    content: nonEmptyString('agent.prompts[].content'),
    description: z.string().optional(),
    priority: z.number().int().min(0).max(100).optional(),
    conditions: z.array(z.string()).optional(),
  })
  .strict();

// ============================================================================
// Lifecycle Hooks Schema (NEW in v2)
// ============================================================================

const lifecycleHooksSchema = z
  .object({
    on_load: z.array(z.string()).optional().describe('Actions executed when agent loads'),
    on_activate: z.array(z.string()).optional().describe('Actions executed when agent becomes active'),
    on_deactivate: z.array(z.string()).optional().describe('Actions executed when agent deactivates'),
    on_error: z.array(z.string()).optional().describe('Actions executed on error'),
    before_command: z.array(z.string()).optional().describe('Actions before any command'),
    after_command: z.array(z.string()).optional().describe('Actions after any command'),
  })
  .strict();

// ============================================================================
// Conversational Knowledge Schema (NEW in v2)
// ============================================================================

const conversationalKnowledgeSchema = z.object({
  topic: nonEmptyString('topic'),
  content: nonEmptyString('content'),
  priority: z.number().int().min(1).max(10).optional(),
  conditions: z.array(z.string()).optional(),
});

// ============================================================================
// Capability Schema (NEW in v2)
// ============================================================================

const capabilitySchema = z.object({
  name: nonEmptyString('capability.name'),
  description: nonEmptyString('capability.description'),
  requires: z.array(z.string()).optional(),
  provides: z.array(z.string()).optional(),
});

// ============================================================================
// Main Agent Schema
// ============================================================================

const agentBodySchema = z
  .object({
    metadata: metadataSchema,
    persona: personaSchema,
    critical_actions: z.array(nonEmptyString('agent.critical_actions[]')).optional(),
    menu: z.array(menuItemSchema).min(1, {
      message: 'agent.menu must include at least one entry',
    }),
    prompts: z.array(promptSchema).optional(),
    webskip: z.boolean().optional(),
    discussion: z.boolean().optional(),
    conversational_knowledge: z.array(conversationalKnowledgeSchema).optional(),
    // NEW v2 fields
    lifecycle: lifecycleHooksSchema.optional(),
    capabilities: z.array(capabilitySchema).optional(),
    requires_modules: z.array(z.enum(VALID_MODULES)).optional(),
    requires_tools: z.array(z.string()).optional(),
    config_schema: z.record(z.any()).optional(),
  })
  .strict();

const agentSchema = z
  .object({
    agent: agentBodySchema,
  })
  .strict()
  .superRefine((value, ctx) => {
    // Cross-field validation: discussion requires conversational_knowledge
    if (value.agent.discussion === true && !value.agent.conversational_knowledge?.length) {
      ctx.addIssue({
        code: 'custom',
        path: ['agent', 'conversational_knowledge'],
        message: 'Agents with discussion:true should include conversational_knowledge',
      });
    }

    // Validate trigger uniqueness
    const triggers = new Set();
    value.agent.menu.forEach((item, index) => {
      if (item.trigger) {
        if (triggers.has(item.trigger)) {
          ctx.addIssue({
            code: 'custom',
            path: ['agent', 'menu', index, 'trigger'],
            message: `Duplicate trigger: "${item.trigger}"`,
          });
        }
        triggers.add(item.trigger);
      }
    });

    // Validate module consistency
    const idMatch = value.agent.metadata.id.match(/\.bmad\/([^/]+)\/agents\//);
    if (idMatch) {
      const idModule = idMatch[1];
      const declaredModule = value.agent.metadata.module;

      if (idModule !== 'core' && !declaredModule) {
        ctx.addIssue({
          code: 'custom',
          path: ['agent', 'metadata', 'module'],
          message: `Module agent must declare metadata.module (expected: ${idModule})`,
        });
      }

      if (declaredModule && idModule !== declaredModule && idModule !== 'core') {
        ctx.addIssue({
          code: 'custom',
          path: ['agent', 'metadata', 'module'],
          message: `metadata.module (${declaredModule}) does not match path module (${idModule})`,
        });
      }
    }
  });

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validate an agent YAML payload against the schema.
 *
 * @param {unknown} agentYaml - Parsed YAML content
 * @param {Object} options - Validation options
 * @param {string} [options.filePath] - Path to agent file for context
 * @param {boolean} [options.strict=true] - Enable strict mode
 * @returns {import('zod').SafeParseReturnType}
 */
function validateAgent(agentYaml, options = {}) {
  const result = agentSchema.safeParse(agentYaml);

  if (!result.success && options.filePath) {
    // Enhance error messages with file context
    result.error.issues = result.error.issues.map((issue) => ({
      ...issue,
      message: `[${options.filePath}] ${issue.message}`,
    }));
  }

  return result;
}

/**
 * Validate an agent and return a detailed report.
 *
 * @param {unknown} agentYaml - Parsed YAML content
 * @param {Object} options - Validation options
 * @returns {Object} Detailed validation report
 */
function validateAgentWithReport(agentYaml, options = {}) {
  const result = validateAgent(agentYaml, options);

  return {
    valid: result.success,
    agent: result.success ? result.data : null,
    errors: result.success
      ? []
      : result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
          code: issue.code,
        })),
    warnings: [], // Could add soft validation warnings here
    metadata: result.success
      ? {
          id: result.data.agent.metadata.id,
          name: result.data.agent.metadata.name,
          module: result.data.agent.metadata.module || 'core',
          menuItems: result.data.agent.menu.length,
          hasDiscussion: result.data.agent.discussion || false,
          hasLifecycle: !!result.data.agent.lifecycle,
        }
      : null,
  };
}

// ============================================================================
// Exports
// ============================================================================

module.exports = {
  // Schemas
  agentSchema,
  metadataSchema,
  personaSchema,
  menuItemSchema,
  promptSchema,
  lifecycleHooksSchema,
  capabilitySchema,

  // Validators
  validateAgent,
  validateAgentWithReport,

  // Constants
  VALID_MODULES,
  COMMAND_TARGET_KEYS,
  TRIGGER_PATTERN,
};
