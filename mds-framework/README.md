# MDS Framework

## Multi-agent Delivery System

**Version:** 1.0.0
**License:** Proprietary
**Owner:** [Your Company Name]

---

## Overview

MDS (Multi-agent Delivery System) is a proprietary AI orchestration framework designed for professional services delivery. Built on proven multi-agent patterns, MDS enables consistent, high-quality AI-driven project execution for consulting, development, and delivery engagements.

### Key Differentiators

| Feature | MDS Framework | Generic AI Tools |
|---------|---------------|------------------|
| **Domain Focus** | Professional services delivery | General purpose |
| **Agent Specialization** | Client-facing personas | Generic assistants |
| **Workflow Engine** | State-machine based with checkpoints | Ad-hoc prompting |
| **Quality Assurance** | Built-in validation protocols | Manual review |
| **Integration** | Native Google AI Studio & n8n | API-only |
| **Customization** | Client-specific configurations | One-size-fits-all |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MDS FRAMEWORK ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         ORCHESTRATION LAYER                          │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │   │
│  │  │   Router     │  │   Context    │  │    State     │              │   │
│  │  │   Engine     │  │   Manager    │  │   Machine    │              │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│  ┌─────────────────────────────────┴───────────────────────────────────┐   │
│  │                           AGENT LAYER                                │   │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐       │   │
│  │  │Delivery│  │Solution│  │  Tech  │  │  QA    │  │ Client │       │   │
│  │  │  Lead  │  │Architect│ │  Lead  │  │ Agent  │  │Success │       │   │
│  │  └────────┘  └────────┘  └────────┘  └────────┘  └────────┘       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│  ┌─────────────────────────────────┴───────────────────────────────────┐   │
│  │                          WORKFLOW LAYER                              │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │   │
│  │  │  Discovery   │  │   Delivery   │  │   Closure    │              │   │
│  │  │   Phase      │  │    Phase     │  │    Phase     │              │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│  ┌─────────────────────────────────┴───────────────────────────────────┐   │
│  │                        INTEGRATION LAYER                             │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │   │
│  │  │ Google AI    │  │     n8n      │  │   REST API   │              │   │
│  │  │   Studio     │  │  Workflows   │  │   Gateway    │              │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Quick Start

### 1. Installation

```bash
# Clone the framework
git clone [your-repo]/mds-framework.git

# Install dependencies
npm install

# Initialize for a new project
npx mds init --client "ClientName" --type "consulting"
```

### 2. Configure Client

```yaml
# .mds/config.yaml
client:
  name: "Acme Corp"
  industry: "Financial Services"

engagement:
  type: "consulting"
  duration: "12 weeks"

team:
  delivery_lead: "Your Name"
  communication_style: "formal"
```

### 3. Start Delivery Workflow

```bash
# Using CLI
npx mds workflow start discovery

# Using n8n
# Import workflow from integrations/n8n/discovery-workflow.json

# Using Google AI Studio
# Load gem from integrations/google-ai-studio/delivery-lead.gem
```

---

## Core Concepts

### Agents

Specialized AI personas with domain expertise:

| Agent | Role | Primary Workflows |
|-------|------|-------------------|
| **Delivery Lead** | Project orchestration, stakeholder management | Discovery, Planning, Status |
| **Solution Architect** | Technical design, architecture decisions | Solution Design, Technical Review |
| **Tech Lead** | Implementation guidance, code review | Development, Code Review |
| **QA Agent** | Quality assurance, validation | Testing, Validation |
| **Client Success** | Client communication, satisfaction | Onboarding, Feedback |

### Workflows

Structured processes with state management:

- **Discovery Phase**: Requirements gathering, stakeholder analysis
- **Planning Phase**: Solution design, resource planning
- **Delivery Phase**: Implementation, testing, deployment
- **Closure Phase**: Handover, documentation, retrospective

### Protocols

Reusable patterns for common operations:

- **Context Injection**: Smart document loading
- **Validation**: Checklist-based quality gates
- **Escalation**: Issue handling and routing
- **Handoff**: Agent-to-agent transitions

---

## Directory Structure

```
mds-framework/
├── core/
│   ├── engine/           # Orchestration engine
│   ├── agents/           # Base agent definitions
│   ├── workflows/        # Core workflow definitions
│   ├── tasks/            # Atomic task definitions
│   ├── protocols/        # Reusable protocols
│   └── config/           # Framework configuration
├── modules/
│   ├── delivery/         # Delivery management module
│   ├── consulting/       # Consulting engagement module
│   └── development/      # Software development module
├── templates/
│   ├── agents/           # Agent templates
│   ├── workflows/        # Workflow templates
│   └── documents/        # Document templates
├── integrations/
│   ├── google-ai-studio/ # Google AI Studio configs
│   ├── n8n/              # n8n workflow exports
│   └── api/              # REST API specifications
├── examples/             # Example implementations
└── docs/                 # Documentation
```

---

## Integration Options

### Google AI Studio (Gemini Gems)

Pre-configured gems for each agent with:
- System instructions
- Knowledge files
- Conversation starters

### n8n Workflows

Importable workflow templates:
- Agent router
- Phase workflows
- Validation workflows
- Integration workflows

### REST API

OpenAPI-compliant endpoints for:
- Agent invocation
- Workflow execution
- Status queries
- Artifact management

---

## Customization

### Client-Specific Agents

```yaml
# templates/agents/custom-agent.yaml
agent:
  metadata:
    name: "ClientSpecificAgent"
    client: "{{client_name}}"

  persona:
    role: "Domain Expert for {{client_industry}}"
    communication_style: "{{client_preferred_style}}"
```

### Industry Templates

Pre-built configurations for:
- Financial Services
- Healthcare
- Technology
- Manufacturing
- Retail

---

## Support

- Documentation: `/docs`
- Examples: `/examples`
- Issues: [Internal Tracker]

---

## License

Proprietary - All Rights Reserved
Copyright (c) 2024 [Your Company Name]
