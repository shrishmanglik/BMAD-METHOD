# BMAD Framework Core Architecture

> Version 2.0 - Robust Framework Enhancement

## Overview

This directory contains the enhanced BMAD Framework core architecture, designed to provide:

- **Type Safety**: Comprehensive schemas and contracts for all framework components
- **Reliability**: Robust error handling and recovery patterns
- **Extensibility**: Plugin architecture for custom modules and integrations
- **Observability**: State management and lifecycle tracking
- **Consistency**: Standardized interfaces across all agents and workflows

## Directory Structure

```
framework/
├── schemas/           # Zod-based validation schemas
│   ├── agent.schema.js
│   ├── workflow.schema.js
│   ├── config.schema.js
│   └── module.schema.js
├── contracts/         # Interface contracts and types
│   ├── agent.contract.yaml
│   ├── workflow.contract.yaml
│   └── lifecycle.contract.yaml
├── engine/           # Core execution engines
│   ├── workflow-engine.js
│   ├── agent-runtime.js
│   └── state-machine.js
├── plugins/          # Plugin system
│   ├── plugin-registry.js
│   ├── hook-system.js
│   └── extension-points.js
├── errors/           # Error handling
│   ├── error-types.js
│   ├── error-codes.yaml
│   └── recovery-strategies.js
└── state/           # State management
    ├── workflow-state.js
    ├── agent-memory.js
    └── session-store.js
```

## Core Principles

### 1. Contract-First Design
Every component in BMAD is defined by its contract first. This ensures:
- Clear interfaces between components
- Validation at boundaries
- Documentation as code

### 2. Fail-Fast with Recovery
The framework validates early and provides clear recovery paths:
- Schema validation on load
- Runtime checks at critical points
- Graceful degradation where possible

### 3. Observable State
All state changes are tracked and observable:
- Workflow progress tracking
- Agent lifecycle events
- Configuration resolution tracing

### 4. Extensibility Through Plugins
Core functionality can be extended without modification:
- Hook-based extension points
- Plugin registration system
- Module-level customization

## Usage

### Validating an Agent

```javascript
const { validateAgent } = require('./schemas/agent.schema');
const result = validateAgent(agentYaml);
if (!result.success) {
  console.error('Validation failed:', result.errors);
}
```

### Executing a Workflow

```javascript
const { WorkflowEngine } = require('./engine/workflow-engine');
const engine = new WorkflowEngine(config);
const execution = await engine.execute(workflowId, context);
```

### Registering a Plugin

```javascript
const { PluginRegistry } = require('./plugins/plugin-registry');
PluginRegistry.register({
  name: 'my-plugin',
  hooks: {
    'workflow:before-step': async (context) => {
      // Custom logic
    }
  }
});
```

## Migration from v1

Existing agents and workflows are fully compatible. The new framework provides:
- Additional validation (opt-in)
- Enhanced lifecycle hooks
- Better error messages
- State tracking capabilities

See `docs/migration-v2.md` for detailed migration guide.
