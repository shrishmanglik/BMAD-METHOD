# BMAD Framework v2.0 - Robust Architecture

> A comprehensive enhancement to the BMAD Method providing type safety, reliability, and extensibility

## Overview

BMAD Framework v2.0 is a significant architectural enhancement to the BMAD Method, introducing a robust foundation for AI-driven agile development. This framework provides:

- **Type Safety**: Comprehensive Zod-based schemas for all data structures
- **Reliability**: Robust error handling with recovery strategies
- **Extensibility**: Plugin architecture with hook-based extension points
- **Observability**: State management with transaction support
- **Consistency**: Standardized interfaces via formal contracts

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        BMAD Framework v2.0                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │   Schemas    │  │   Engines    │  │      Plugins & Hooks      │  │
│  │              │  │              │  │                           │  │
│  │ • Agent      │  │ • Workflow   │  │ • Plugin Registry         │  │
│  │ • Workflow   │  │   Engine     │  │ • Hook System             │  │
│  │ • Config     │  │              │  │ • Extension Points        │  │
│  │ • Module     │  │ • Agent      │  │                           │  │
│  │              │  │   Runtime    │  │                           │  │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘  │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │    Errors    │  │    State     │  │       Contracts          │  │
│  │              │  │              │  │                           │  │
│  │ • Error Types│  │ • State Mgr  │  │ • Agent Contract         │  │
│  │ • Error Codes│  │ • State Store│  │ • Workflow Contract      │  │
│  │ • Recovery   │  │ • Transactions│ │ • Lifecycle Contract     │  │
│  │              │  │              │  │                           │  │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## Key Components

### 1. Schema Validation System

Located in `src/core/framework/schemas/`, the schema system provides comprehensive validation:

#### Agent Schema (`agent.schema.js`)

```javascript
const { validateAgentWithReport } = require('@bmad/framework').schemas.agent;

const result = validateAgentWithReport(agentDefinition, { filePath: 'path/to/agent.yaml' });

if (!result.valid) {
  console.error('Validation errors:', result.errors);
}
```

Features:
- Metadata validation (id, name, title, icon, module)
- Persona validation (role, identity, communication_style, principles)
- Menu item validation (triggers, command targets)
- Lifecycle hooks validation (NEW in v2)
- Capability definitions (NEW in v2)

#### Workflow Schema (`workflow.schema.js`)

Validates both YAML and Markdown workflow formats:
- YAML workflow configuration
- Markdown frontmatter
- Step file definitions
- Workflow state tracking

#### Config Schema (`config.schema.js`)

Validates configuration files with variable resolution:
- Core configuration
- Module configuration
- Variable pattern matching
- Type coercion

#### Module Schema (`module.schema.js`)

Validates module manifests:
- Module metadata
- Agent and workflow references
- Team definitions
- Dependency resolution

### 2. Workflow Orchestration Engine

Located in `src/core/framework/engine/workflow-engine.js`:

```javascript
const { WorkflowEngine, WORKFLOW_STATES } = require('@bmad/framework').engines;

const engine = new WorkflowEngine({
  maxRetries: 3,
  checkpointInterval: 1,
  enableRecovery: true,
});

// Initialize and execute
const execution = await engine.initialize(workflow, context);
await engine.execute(execution.id);
```

Features:
- State machine-based execution
- Step-by-step progress tracking
- Checkpoint and recovery support
- Event emission for observability
- Hook integration for extensibility

#### Workflow States

```
IDLE → INITIALIZING → RUNNING → COMPLETED
                   ↘   ↓   ↙
                    PAUSED
                       ↓
               WAITING_USER
                       ↓
                   FAILED / CANCELLED
```

### 3. Agent Runtime

Located in `src/core/framework/engine/agent-runtime.js`:

```javascript
const { AgentRuntime, AGENT_STATES } = require('@bmad/framework').engines;

const runtime = new AgentRuntime({
  memoryPersistence: true,
  autoSuspend: true,
});

const instance = await runtime.loadAgent(definition);
await runtime.activateAgent(instance.id);
```

Features:
- Agent lifecycle management
- Memory persistence
- Command execution
- Inter-agent communication
- Lifecycle hooks (on_load, on_activate, on_deactivate)

### 4. Error Handling System

Located in `src/core/framework/errors/error-types.js`:

```javascript
const { BmadError, ErrorCodes, ErrorHandler } = require('@bmad/framework').errors;

// Create typed error
throw new ConfigError('Configuration not found', {
  code: ErrorCodes.CONFIG_NOT_FOUND,
  configPath: '/path/to/config',
  suggestions: ['Run "bmad install"', 'Check project directory'],
});

// Handle errors with recovery
const handler = new ErrorHandler({ maxRetries: 3 });
const result = await handler.handle(error, { operation: retryFn });
```

Error Categories:
- Configuration Errors (BMAD-1xxx)
- Agent Errors (BMAD-2xxx)
- Workflow Errors (BMAD-3xxx)
- Module Errors (BMAD-4xxx)
- Plugin Errors (BMAD-5xxx)
- File System Errors (BMAD-6xxx)
- Validation Errors (BMAD-7xxx)
- Runtime Errors (BMAD-8xxx)
- User Errors (BMAD-9xxx)

Recovery Strategies:
- `RETRY`: Retry with exponential backoff
- `SKIP`: Skip and continue
- `ROLLBACK`: Restore to checkpoint
- `PROMPT_USER`: Ask user for decision
- `USE_DEFAULT`: Use default value
- `ABORT`: Stop execution

### 5. Plugin System

Located in `src/core/framework/plugins/plugin-registry.js`:

```javascript
const { PluginRegistry, getRegistry } = require('@bmad/framework').plugins;

// Register a plugin
const registry = getRegistry();
registry.register({
  name: 'my-plugin',
  version: '1.0.0',
  hooks: {
    'workflow:before-start': async (context) => {
      console.log('Workflow starting:', context.execution.id);
    },
    'agent:after-activate': async (context) => {
      console.log('Agent activated:', context.instance.metadata.name);
    },
  },
});

// Activate plugins
await registry.activateAll();
```

Extension Points:
- `system:startup`, `system:shutdown`
- `agent:before-load`, `agent:after-load`
- `agent:before-activate`, `agent:after-activate`
- `agent:before-command`, `agent:after-command`
- `workflow:before-start`, `workflow:after-complete`
- `workflow:before-step`, `workflow:after-step`
- `config:before-load`, `config:after-load`
- `validate:agent`, `validate:workflow`, `validate:config`
- `transform:agent-definition`, `transform:output`

### 6. State Management

Located in `src/core/framework/state/state-manager.js`:

```javascript
const { StateManager, getStateManager, STATE_DOMAINS } = require('@bmad/framework').state;

const manager = getStateManager();

// Set state
manager.set(STATE_DOMAINS.WORKFLOW, 'current.step', 'step-03');

// Get state
const step = manager.get(STATE_DOMAINS.WORKFLOW, 'current.step');

// Subscribe to changes
const unsubscribe = manager.subscribe(STATE_DOMAINS.AGENT, 'active', (change) => {
  console.log('Active agent changed:', change);
});

// Transactions
const tx = manager.beginTransaction();
tx.set(STATE_DOMAINS.WORKFLOW, 'status', 'running');
tx.set(STATE_DOMAINS.AGENT, 'active', agentId);
tx.commit();
```

State Domains:
- `SESSION`: Temporary session data
- `WORKFLOW`: Workflow execution state
- `AGENT`: Agent state and memory
- `CONFIG`: Configuration values
- `USER`: User preferences

Features:
- Immutable state updates
- State history and undo
- Subscriptions for reactivity
- Transaction support
- Persistence hooks

## Contracts

The framework defines formal contracts that specify the interface and behavior for all components:

### Agent Contract (`contracts/agent.contract.yaml`)

Defines:
- Agent structure and required fields
- Lifecycle states and transitions
- Command execution flow
- Memory management
- Inter-agent communication protocols

### Workflow Contract (`contracts/workflow.contract.yaml`)

Defines:
- Workflow types (YAML and Markdown)
- Execution states and transitions
- Variable resolution rules
- Checkpoint and recovery procedures
- Hook integration points

## Usage Examples

### Basic Framework Usage

```javascript
const { getFramework } = require('@bmad/framework');

async function main() {
  const framework = await getFramework({
    projectRoot: process.cwd(),
    enablePlugins: true,
    enableState: true,
  });

  // Load and activate an agent
  const agent = await framework.loadAgent(agentDefinition);
  await framework.activateAgent(agent.id);

  // Execute a command
  const result = await framework.executeCommand('create-architecture');

  // Start a workflow
  const execution = await framework.startWorkflow(workflowDefinition, context);

  // Get framework statistics
  console.log(framework.getStats());
}
```

### Custom Plugin Development

```javascript
const { getRegistry } = require('@bmad/framework').plugins;

const myPlugin = {
  name: 'custom-validator',
  version: '1.0.0',
  description: 'Custom validation for domain-specific rules',

  hooks: {
    'validate:agent': async (context) => {
      const { definition } = context;

      // Custom validation logic
      if (definition.agent.metadata.module === 'custom') {
        if (!definition.agent.customField) {
          return {
            valid: false,
            errors: [{ path: 'agent.customField', message: 'Required for custom module' }],
          };
        }
      }

      return { valid: true };
    },
  },

  initialize: async (ctx) => {
    ctx.log('Custom validator initialized');
  },
};

const registry = getRegistry();
const plugin = registry.register(myPlugin);
await registry.activate(plugin.id);
```

### State-Driven Development

```javascript
const { getStateManager, STATE_DOMAINS } = require('@bmad/framework').state;

const state = getStateManager();

// Create derived state with selectors
const getActiveWorkflowProgress = state.createSelector(
  [
    { domain: STATE_DOMAINS.WORKFLOW, path: 'executions' },
    { domain: STATE_DOMAINS.WORKFLOW, path: 'activeId' },
  ],
  (executions, activeId) => {
    if (!activeId || !executions[activeId]) return null;
    return executions[activeId].progress;
  }
);

// Subscribe to progress changes
state.subscribe(STATE_DOMAINS.WORKFLOW, 'executions', () => {
  const progress = getActiveWorkflowProgress();
  if (progress) {
    console.log(`Progress: ${progress.percentage}%`);
  }
});
```

## Migration from v1

The framework v2 is fully backward compatible with existing agents and workflows. Existing code will continue to work without modification.

### New Features Available in v2

1. **Lifecycle Hooks**: Add `lifecycle` section to agent definitions
2. **Capabilities**: Define agent capabilities for discovery
3. **Extended Validation**: More detailed error messages
4. **Plugin System**: Create custom extensions
5. **State Management**: Track and react to state changes

### Recommended Updates

```yaml
# v1 agent (still works)
agent:
  metadata:
    id: ".bmad/bmm/agents/my-agent.md"
    name: My Agent
    title: Example Agent
    icon: "🤖"
    module: bmm

  persona:
    role: Example role
    identity: Example identity
    communication_style: Example style
    principles:
      - Principle 1

  menu:
    - trigger: example
      exec: "./example.md"
      description: Example command

# v2 agent (with new features)
agent:
  metadata:
    id: ".bmad/bmm/agents/my-agent.md"
    name: My Agent
    title: Example Agent
    icon: "🤖"
    module: bmm
    version: "2.0.0"  # NEW
    author: "Your Name"  # NEW
    tags: ["example", "demo"]  # NEW

  persona:
    role: Example role
    identity: Example identity
    communication_style: Example style
    principles:
      - Principle 1
    expertise: ["area1", "area2"]  # NEW
    limitations: ["limitation1"]  # NEW

  lifecycle:  # NEW
    on_load:
      - "Load configuration"
    on_activate:
      - "Greet user"
    on_error:
      - "Log error details"

  capabilities:  # NEW
    - name: example-capability
      description: What this agent can do
      requires: []
      provides: ["feature-x"]

  menu:
    - trigger: example
      exec: "./example.md"
      description: Example command
```

## Performance Considerations

- **Lazy Loading**: Schemas are loaded on first use
- **Caching**: Plugin contexts and selectors are cached
- **Efficient State**: Immutable updates minimize memory churn
- **Event-Driven**: Hooks use async event patterns

## Testing

```javascript
const { resetFramework, resetRegistry, resetStateManager } = require('@bmad/framework');

describe('My Plugin', () => {
  beforeEach(() => {
    resetFramework();
    resetRegistry();
    resetStateManager();
  });

  it('should validate correctly', async () => {
    const framework = await getFramework();
    // ... test code
  });
});
```

## Best Practices

1. **Always Validate**: Use schemas before processing data
2. **Handle Errors**: Use the error handling system with appropriate recovery
3. **Use State**: Track important values in the state manager
4. **Write Plugins**: Extend via plugins, don't modify core
5. **Follow Contracts**: Adhere to the defined contracts for interoperability

## API Reference

See the individual module documentation:
- `src/core/framework/schemas/` - Schema definitions
- `src/core/framework/engine/` - Execution engines
- `src/core/framework/errors/` - Error types and handling
- `src/core/framework/plugins/` - Plugin system
- `src/core/framework/state/` - State management
- `src/core/framework/contracts/` - Interface contracts
