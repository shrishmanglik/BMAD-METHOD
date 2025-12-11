# MDS Framework Architecture

## Overview

The MDS (Multi-agent Delivery System) Framework is a proprietary AI orchestration system designed for professional services delivery. It provides a structured approach to client engagements using specialized AI agents and workflows.

---

## Architectural Patterns

### 1. Core Engine Pattern

The MDS Orchestrator is the central nervous system that coordinates all framework activities.

```
┌─────────────────────────────────────────────────────────────────────┐
│                         MDS ORCHESTRATOR                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐               │
│  │   Router    │   │   Context   │   │    State    │               │
│  │   Engine    │   │   Manager   │   │   Machine   │               │
│  └──────┬──────┘   └──────┬──────┘   └──────┬──────┘               │
│         │                 │                 │                        │
│         └────────────────┴─────────────────┘                        │
│                           │                                          │
│                    ┌──────┴──────┐                                  │
│                    │  Invoke API │                                  │
│                    └─────────────┘                                  │
└─────────────────────────────────────────────────────────────────────┘
```

**Key Components:**

| Component | Responsibility |
|-----------|---------------|
| Router Engine | Routes requests to appropriate agents/workflows |
| Context Manager | Loads and manages execution context |
| State Machine | Tracks workflow state and enables pause/resume |
| Invoke API | Unified interface for all invocations |

### 2. Agent Architecture Pattern

Agents are specialized AI personas with domain expertise.

```yaml
agent:
  metadata:        # Identity (id, name, title, icon)
  persona:         # Personality (role, identity, communication_style, principles)
  critical_actions: # Initialization mandates
  menu:            # Available actions/workflows
  prompts:         # Pre-built prompt templates
```

**Agent Lifecycle:**

```
┌─────────┐     ┌─────────────┐     ┌─────────────┐     ┌──────────┐
│ Invoke  │────▶│ Load Agent  │────▶│ Build       │────▶│ Execute  │
│ Request │     │ Definition  │     │ Context     │     │ Action   │
└─────────┘     └─────────────┘     └─────────────┘     └──────────┘
                       │                   │
                       ▼                   ▼
                ┌─────────────┐     ┌─────────────┐
                │   Persona   │     │   Project   │
                │   Config    │     │   Context   │
                └─────────────┘     └─────────────┘
```

### 3. Workflow Pattern

Workflows are multi-step processes with state management and checkpointing.

**Workflow Structure:**

```
workflow/
├── workflow.yaml      # Configuration and variables
├── template.md        # Output document template
├── instructions.md    # Step-by-step execution guide
├── checklist.md       # Validation checklist
└── steps/             # Individual step files (optional)
```

**Workflow State Machine:**

```
                    ┌─────────────────┐
                    │     PENDING     │
                    └────────┬────────┘
                             │ start
                             ▼
    ┌───────────────────────────────────────────────┐
    │                 IN_PROGRESS                    │
    │  ┌─────────┐   ┌─────────┐   ┌─────────┐    │
    │  │ Step 1  │──▶│ Step 2  │──▶│ Step N  │    │
    │  └─────────┘   └─────────┘   └─────────┘    │
    └───────────────────────┬───────────────────────┘
              │             │             │
     await_input       complete         halt
              │             │             │
              ▼             ▼             ▼
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │  AWAITING   │  │  COMPLETED  │  │   HALTED    │
    │   INPUT     │  └─────────────┘  └─────────────┘
    └─────────────┘
```

### 4. Context Injection Pattern

Context is loaded using smart discovery strategies.

**Discovery Strategies:**

| Strategy | Use Case | Behavior |
|----------|----------|----------|
| FULL_LOAD | Load all context | Glob pattern, load everything |
| SELECTIVE_LOAD | Load specific file | Variable-based file selection |
| INDEX_GUIDED | Intelligent loading | Parse index, load relevant docs |

**Context Hierarchy:**

```
Level 1: Framework Defaults
    └─ core/config/default.yaml

Level 2: Client Configuration
    └─ .mds/config.yaml

Level 3: Workflow Variables
    └─ workflow.yaml

Level 4: Runtime Context
    └─ User input + discovered documents
```

### 5. Variable Resolution Pattern

Variables are resolved through multiple phases:

```
Phase 1: Config Loading
{config_source}: "path/to/config.yaml"
         │
         ▼
Phase 2: Config Substitution
{config_source}:key_name → resolved value
         │
         ▼
Phase 3: System Variables
{system:date} → "2024-01-15"
{system:projectRoot} → "/path/to/project"
         │
         ▼
Phase 4: Template Variables
{{variable}} → user input or computed value
```

### 6. Validation Pattern

Quality gates using checklist-based validation.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Document     │────▶│   Checklist     │────▶│   Validation    │
│    Content      │     │   Requirements  │     │   Report        │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
                                                ┌─────────────────┐
                                                │  ✓ PASS (n/N)   │
                                                │  ⚠ PARTIAL      │
                                                │  ✗ FAIL         │
                                                └─────────────────┘
```

---

## Integration Architecture

### Google AI Studio Integration

```
┌─────────────────────────────────────────────────────────────────────┐
│                    GOOGLE AI STUDIO INTEGRATION                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────────┐                                            │
│  │    GEMINI GEMS      │                                            │
│  │  ┌───────────────┐  │     ┌─────────────────────────────────┐   │
│  │  │ Delivery Lead │  │     │       MDS FRAMEWORK             │   │
│  │  │    (Alex)     │◀─┼────▶│  - Agent Definitions (.yaml)    │   │
│  │  └───────────────┘  │     │  - Workflow Templates           │   │
│  │  ┌───────────────┐  │     │  - Knowledge Files              │   │
│  │  │ Sol. Architect│  │     └─────────────────────────────────┘   │
│  │  │   (Morgan)    │  │                                            │
│  │  └───────────────┘  │                                            │
│  │  ┌───────────────┐  │                                            │
│  │  │  Tech Lead    │  │                                            │
│  │  │   (Jordan)    │  │                                            │
│  │  └───────────────┘  │                                            │
│  └─────────────────────┘                                            │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### n8n Integration

```
┌─────────────────────────────────────────────────────────────────────┐
│                        N8N INTEGRATION                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   MDS ORCHESTRATOR WORKFLOW                  │   │
│  │                                                               │   │
│  │  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐ │   │
│  │  │ Webhook  │──▶│  Parse   │──▶│  Route   │──▶│  Agent   │ │   │
│  │  │ Trigger  │   │ Request  │   │  (Switch)│   │  Node    │ │   │
│  │  └──────────┘   └──────────┘   └──────────┘   └──────────┘ │   │
│  │                                                      │       │   │
│  │                                                      ▼       │   │
│  │                                               ┌──────────┐  │   │
│  │                                               │ Response │  │   │
│  │                                               └──────────┘  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  EXPORTED WORKFLOWS:                                                 │
│  - mds-orchestrator-workflow.json                                   │
│  - mds-discovery-workflow.json                                      │
│  - mds-status-report-workflow.json                                  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Key Differentiators from Source Framework

| Aspect | Source (BMAD) | MDS Framework |
|--------|---------------|---------------|
| **Domain** | Software development | Professional services delivery |
| **Primary Users** | Developers | Consultants, delivery teams |
| **Agents** | Dev-focused (PM, Dev, QA) | Client-focused (Delivery Lead, Client Success) |
| **Workflows** | Sprint-based, code-centric | Engagement-based, deliverable-centric |
| **Integration** | IDE-focused | Google AI Studio + n8n native |
| **Output** | Code, technical docs | Client deliverables, reports |
| **Phases** | Analysis→Planning→Implementation | Discovery→Planning→Execution→Closure |

---

## Deployment Options

### Option 1: Standalone (Google AI Studio)

Use Gemini Gems directly for individual agent interactions.

```
User → Google AI Studio → Gemini Gem (Agent) → Response
```

### Option 2: Orchestrated (n8n)

Use n8n for multi-agent orchestration and workflow automation.

```
User → n8n Webhook → Orchestrator → Agent(s) → Response
         │
         └──→ Database (State) ──→ Artifacts
```

### Option 3: Full Framework

Use the complete MDS Framework with TypeScript engine.

```
User → API Gateway → MDS Orchestrator → Agent Router
                           │                  │
                           ▼                  ▼
                     Context Manager    State Machine
                           │                  │
                           └────────┬─────────┘
                                    ▼
                              Workflow Engine
                                    │
                                    ▼
                           Output Generation
```

---

## Security Considerations

1. **API Keys**: Store in environment variables, never in config files
2. **Client Data**: Implement data isolation per engagement
3. **Access Control**: Role-based access to agents and workflows
4. **Audit Trail**: Log all interactions for compliance
5. **Data Retention**: Follow client data retention policies

---

## Extension Points

### Custom Agents

Add custom agents to `modules/custom/agents/`:

```yaml
agent:
  metadata:
    id: "custom.agents.industry-expert"
    name: "Industry Expert"
    module: "custom"
  # ... rest of agent definition
```

### Custom Workflows

Add custom workflows to `modules/custom/workflows/`:

```yaml
name: "custom-workflow"
description: "Client-specific workflow"
# ... workflow configuration
```

### Custom Protocols

Add reusable protocols to `core/protocols/`:

```yaml
protocol:
  id: "custom-protocol"
  category: "custom"
  # ... protocol definition
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01 | Initial release |
