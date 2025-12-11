# BMAD Framework Implementation Guide for Google AI Studio & n8n

## Executive Summary

The **BMAD (Build More, Architect Dreams)** framework is an AI-driven agile development methodology that orchestrates specialized AI agents through structured workflows. This guide explains how to implement BMAD's core concepts into your AI systems built with **Google AI Studio** and **n8n**.

---

## Part 1: Understanding BMAD's Core Architecture

### 1.1 What is BMAD?

BMAD is a **multi-agent orchestration framework** built on the C.O.R.E. principle:
- **C**ollaboration - Human-AI partnership
- **O**ptimized - Refined collaborative processes
- **R**eflection - Guided thinking for better solutions
- **E**ngine - Orchestrates specialized agents and workflows

### 1.2 Key Components

| Component | Description | Implementation Target |
|-----------|-------------|----------------------|
| **Agents** | Specialized AI personas with expertise | Google AI Studio custom prompts / n8n AI nodes |
| **Workflows** | Multi-step guided processes | n8n workflows |
| **Personas** | Role-specific behavior and communication | System prompts |
| **Tasks** | Atomic operations within workflows | n8n function nodes |
| **Context** | Project-specific information | Database / file storage |

### 1.3 BMAD Agent Roster (21+ Agents)

**Core Development Agents:**
| Agent | Role | Icon | Key Responsibility |
|-------|------|------|-------------------|
| PM (John) | Product Manager | 📋 | PRDs, requirements, epics |
| Analyst (Mary) | Business Analyst | 📊 | Research, brainstorming |
| Architect (Winston) | System Architect | 🏗️ | Architecture design |
| SM (Bob) | Scrum Master | 🏃 | Sprint planning |
| DEV (Amelia) | Developer | 💻 | Implementation |
| TEA (Murat) | Test Architect | 🧪 | Testing strategy |
| UX Designer | UX/Design | 🎨 | User experience |

### 1.4 The 4-Phase Methodology

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   PHASE 1    │───▶│   PHASE 2    │───▶│   PHASE 3    │───▶│   PHASE 4    │
│   Analysis   │    │   Planning   │    │ Solutioning  │    │Implementation│
│  (Optional)  │    │  (Required)  │    │ (Level 3-4)  │    │  (Iterative) │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
│ Brainstorming │    │ Create PRD    │    │ Architecture  │    │ Sprint Plan  │
│ Research      │    │ Tech Spec     │    │ UX Design     │    │ Dev Stories  │
│ Product Brief │    │ Requirements  │    │ Epics/Stories │    │ Code Review  │
└───────────────┘    └───────────────┘    └───────────────┘    └───────────────┘
```

---

## Part 2: Google AI Studio Implementation

### 2.1 Architecture Overview

Google AI Studio can implement BMAD through:
1. **Gemini Gems** - Pre-configured agent personas
2. **Structured Prompts** - Multi-turn conversation templates
3. **System Instructions** - Agent behavior definitions

### 2.2 Creating BMAD Agents in Google AI Studio

#### Step 1: Define Agent System Instructions

For each BMAD agent, create a system instruction template:

```markdown
# Agent Definition: [Agent Name]

## Identity
You are [Name], a [Title] with expertise in [domain].

## Communication Style
[Define how the agent communicates - e.g., "Direct, data-driven, asks WHY relentlessly"]

## Core Principles
1. [Principle 1]
2. [Principle 2]
3. [Principle 3]

## Available Actions
- [Action 1]: [Description]
- [Action 2]: [Description]

## Context Requirements
Before responding, always request:
- Project context document
- Current phase/workflow status
- Relevant artifacts from previous phases

## Response Format
Structure all responses as:
1. **Understanding**: Confirm what you understood
2. **Analysis**: Your expert analysis
3. **Recommendations**: Actionable next steps
4. **Questions**: Clarifying questions if needed
```

#### Step 2: PM Agent Example (Google AI Studio)

```markdown
# System Instructions: Product Manager Agent (John)

## Identity
You are John, a Product Manager with 8+ years launching B2B and consumer products. You're an expert in market research, competitive analysis, and user behavior insights.

## Communication Style
- Ask "WHY?" relentlessly like a detective on a case
- Direct and data-sharp
- Cut through fluff to what matters
- Back all claims with data and user insights

## Core Principles
1. Uncover the deeper WHY behind every requirement
2. Ruthless prioritization to achieve MVP goals
3. Proactively identify risks
4. Align efforts with measurable business impact

## Available Workflows
When user says:
- "create-prd" → Guide them through PRD creation
- "create-epics" → Help create epics and user stories
- "check-readiness" → Validate implementation readiness

## PRD Creation Process
1. Understand the problem space
2. Define target users and personas
3. Document requirements (functional & non-functional)
4. Prioritize features (MoSCoW method)
5. Define success metrics
6. Identify risks and dependencies

## Output Format
Always structure PRD outputs with:
- Problem Statement
- Goals & Success Metrics
- User Personas
- Requirements (categorized)
- Technical Constraints
- Timeline Considerations
```

#### Step 3: Create Gemini Gems for Each Agent

In Google AI Studio:
1. Go to **Library → Create Gem**
2. Name: `BMAD-PM-John` (or respective agent)
3. Paste the system instructions
4. Add relevant knowledge files (templates, examples)
5. Test with sample prompts
6. Save and deploy

### 2.3 Multi-Agent Orchestration in Google AI Studio

Since Google AI Studio doesn't natively support multi-agent systems, use this pattern:

```markdown
# Master Orchestrator System Instructions

You are the BMAD Master Orchestrator. You coordinate between specialized agents.

## Available Agents
- PM (John): Product requirements, PRDs
- Analyst (Mary): Research, brainstorming
- Architect (Winston): Technical design
- Developer (Amelia): Implementation
- Scrum Master (Bob): Sprint planning

## Orchestration Rules
1. Identify which agent should handle the request
2. Adopt that agent's persona and expertise
3. Maintain context across agent transitions
4. Track progress through the 4-phase methodology

## Agent Switching
When switching agents, announce:
"[Agent Icon] Switching to [Agent Name] ([Title])..."
Then adopt that agent's communication style and expertise.

## Phase Tracking
Maintain awareness of:
- Current phase (1-4)
- Completed artifacts
- Next required steps
- Blockers or dependencies
```

---

## Part 3: n8n Workflow Implementation

### 3.1 Architecture Overview

n8n provides powerful workflow automation that maps perfectly to BMAD:

```
┌─────────────────────────────────────────────────────────────────────┐
│                         n8n BMAD Architecture                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────┐    ┌─────────────┐    ┌─────────────┐    ┌──────────┐ │
│  │ Trigger │───▶│ Router Node │───▶│ Agent Node  │───▶│ Output   │ │
│  │ (Webhook│    │ (Phase/Task │    │ (AI + Prompt│    │ (Storage │ │
│  │  /Chat) │    │  Detection) │    │  Template)  │    │  /Notify)│ │
│  └─────────┘    └─────────────┘    └─────────────┘    └──────────┘ │
│                        │                                             │
│                        ▼                                             │
│              ┌─────────────────┐                                     │
│              │ Context Store   │                                     │
│              │ (Postgres/Redis)│                                     │
│              └─────────────────┘                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.2 Core n8n Workflows to Build

#### Workflow 1: BMAD Agent Router

```json
{
  "name": "BMAD-Agent-Router",
  "nodes": [
    {
      "name": "Webhook Trigger",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "bmad-agent",
        "method": "POST"
      }
    },
    {
      "name": "Detect Agent Request",
      "type": "n8n-nodes-base.switch",
      "parameters": {
        "rules": [
          { "value": "pm", "output": 0 },
          { "value": "analyst", "output": 1 },
          { "value": "architect", "output": 2 },
          { "value": "developer", "output": 3 },
          { "value": "scrum-master", "output": 4 }
        ]
      }
    },
    {
      "name": "PM Agent",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "parameters": {
        "systemMessage": "{{ PM_SYSTEM_PROMPT }}",
        "model": "gemini-pro"
      }
    }
  ]
}
```

#### Workflow 2: Phase 2 - PRD Creation Workflow

```
[Start] → [Get Project Context] → [PM Agent: Elicit Requirements]
                                           ↓
                                  [Store Requirements]
                                           ↓
                                  [PM Agent: Draft PRD]
                                           ↓
                                  [Validate PRD Structure]
                                           ↓
                                  [Store PRD Document]
                                           ↓
                              [Notify: PRD Ready for Review]
```

**n8n Implementation Steps:**

1. **Webhook Trigger**: Receives PRD creation request
2. **Context Loader**: Fetches project context from database
3. **AI Agent Node (PM)**: Uses Gemini/OpenAI with PM persona
4. **Loop Node**: Iterates through PRD sections
5. **Document Generator**: Creates formatted PRD
6. **Storage Node**: Saves to Google Drive/Database

#### Workflow 3: Story Development Workflow (Red-Green-Refactor)

```
[Get Story] → [Load Context] → [DEV Agent: Plan Implementation]
                                        ↓
                            ┌───────────────────────┐
                            │  Red-Green-Refactor   │
                            │        Loop           │
                            ├───────────────────────┤
                            │ 1. Write Failing Test │
                            │ 2. Implement Code     │
                            │ 3. Run Tests          │
                            │ 4. Refactor           │
                            │ 5. Mark Task Complete │
                            └───────────────────────┘
                                        ↓
                              [Update Story Status]
                                        ↓
                              [Trigger Code Review]
```

### 3.3 n8n Node Configuration Examples

#### AI Agent Node Configuration (PM Agent)

```javascript
// System Prompt for n8n AI Agent Node
const PM_SYSTEM_PROMPT = `
You are John, the Product Manager for the BMAD framework.

CONTEXT:
- Project: {{ $json.projectName }}
- Phase: {{ $json.currentPhase }}
- Previous Artifacts: {{ $json.artifacts }}

YOUR TASK:
{{ $json.taskDescription }}

PRINCIPLES:
1. Ask WHY relentlessly
2. Prioritize ruthlessly for MVP
3. Back claims with data
4. Identify risks proactively

OUTPUT FORMAT:
Return a JSON object with:
{
  "understanding": "Your interpretation of the request",
  "analysis": "Your expert analysis",
  "output": "The actual deliverable",
  "nextSteps": ["Step 1", "Step 2"],
  "questions": ["Clarifying question if needed"]
}
`;
```

#### Function Node: Phase Router

```javascript
// Route requests to appropriate workflow based on phase
const request = $input.first().json;

const phaseRouting = {
  'analysis': {
    workflows: ['brainstorm', 'research', 'product-brief'],
    agents: ['analyst', 'pm']
  },
  'planning': {
    workflows: ['create-prd', 'create-tech-spec'],
    agents: ['pm', 'analyst']
  },
  'solutioning': {
    workflows: ['create-architecture', 'create-epics'],
    agents: ['architect', 'pm', 'ux-designer']
  },
  'implementation': {
    workflows: ['sprint-planning', 'dev-story', 'code-review'],
    agents: ['scrum-master', 'developer', 'tester']
  }
};

const currentPhase = request.phase || 'planning';
const routing = phaseRouting[currentPhase];

return {
  phase: currentPhase,
  availableWorkflows: routing.workflows,
  activeAgents: routing.agents,
  nextAction: request.action
};
```

### 3.4 Complete n8n Workflow: BMAD Orchestrator

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        BMAD MASTER ORCHESTRATOR                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────┐     ┌──────────────┐     ┌─────────────┐                      │
│  │ Slack/   │────▶│ Parse Intent │────▶│ Load Project│                      │
│  │ Discord  │     │ & Agent      │     │ Context     │                      │
│  │ Webhook  │     └──────────────┘     └─────────────┘                      │
│  └──────────┘              │                   │                             │
│                            ▼                   ▼                             │
│                    ┌───────────────────────────────────┐                    │
│                    │       AGENT ROUTER (Switch)       │                    │
│                    ├───────────────────────────────────┤                    │
│                    │ PM │ Analyst │ Arch │ Dev │ SM    │                    │
│                    └─┬─────┬────────┬──────┬─────┬─────┘                    │
│                      │     │        │      │     │                          │
│                      ▼     ▼        ▼      ▼     ▼                          │
│              ┌────────────────────────────────────────────┐                 │
│              │            AI AGENT NODES                  │                 │
│              │  (Each with specific persona & prompts)    │                 │
│              └────────────────────────────────────────────┘                 │
│                                    │                                         │
│                                    ▼                                         │
│              ┌────────────────────────────────────────────┐                 │
│              │         POST-PROCESSING                    │                 │
│              ├────────────────────────────────────────────┤                 │
│              │ • Update Project State                     │                 │
│              │ • Store Artifacts                          │                 │
│              │ • Trigger Next Workflow (if applicable)    │                 │
│              │ • Send Response to User                    │                 │
│              └────────────────────────────────────────────┘                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Part 4: Step-by-Step Implementation Workflow

### Phase 1: Foundation Setup (Week 1-2)

#### Step 1.1: Set Up Infrastructure

**For Google AI Studio:**
```
1. Create Google Cloud Project
2. Enable Vertex AI API
3. Create service account with AI Platform permissions
4. Set up Gemini API access
```

**For n8n:**
```
1. Deploy n8n (self-hosted or cloud)
2. Configure database (PostgreSQL recommended)
3. Set up Google AI credentials in n8n
4. Create credential entries for all integrations
```

#### Step 1.2: Create Context Storage

```sql
-- PostgreSQL schema for BMAD context
CREATE TABLE projects (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    current_phase VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE artifacts (
    id UUID PRIMARY KEY,
    project_id UUID REFERENCES projects(id),
    type VARCHAR(50),  -- 'prd', 'architecture', 'epic', 'story'
    content JSONB,
    version INT,
    created_by VARCHAR(50),  -- agent name
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE workflow_status (
    id UUID PRIMARY KEY,
    project_id UUID REFERENCES projects(id),
    phase INT,
    workflow_name VARCHAR(100),
    status VARCHAR(50),  -- 'pending', 'in_progress', 'completed'
    started_at TIMESTAMP,
    completed_at TIMESTAMP
);
```

#### Step 1.3: Define Agent Prompts

Create a prompts library file or database table:

```javascript
// agents/prompts.js
const AGENT_PROMPTS = {
  pm: {
    name: "John",
    title: "Product Manager",
    icon: "📋",
    systemPrompt: `You are John, a Product Manager...`,
    workflows: ["create-prd", "create-epics", "validate-readiness"]
  },
  analyst: {
    name: "Mary",
    title: "Business Analyst",
    icon: "📊",
    systemPrompt: `You are Mary, a Business Analyst...`,
    workflows: ["brainstorm", "research", "document"]
  },
  architect: {
    name: "Winston",
    title: "System Architect",
    icon: "🏗️",
    systemPrompt: `You are Winston, a System Architect...`,
    workflows: ["create-architecture", "technical-review"]
  },
  developer: {
    name: "Amelia",
    title: "Developer",
    icon: "💻",
    systemPrompt: `You are Amelia, a Senior Developer...`,
    workflows: ["develop-story", "code-review"]
  },
  scrumMaster: {
    name: "Bob",
    title: "Scrum Master",
    icon: "🏃",
    systemPrompt: `You are Bob, a Scrum Master...`,
    workflows: ["sprint-planning", "retrospective"]
  }
};
```

### Phase 2: Core Agent Implementation (Week 2-3)

#### Step 2.1: Create Base Agent Workflow in n8n

```
Workflow: base-agent-executor
Trigger: Called by other workflows

Nodes:
1. [Input] - Receives: agentType, task, context
2. [Get Agent Config] - Loads agent from prompts library
3. [Merge Context] - Combines project context + agent config
4. [AI Chat] - Executes with Gemini/GPT
5. [Parse Response] - Extracts structured output
6. [Output] - Returns agent response
```

#### Step 2.2: Create PM Agent Workflow

```
Workflow: pm-agent-prd-creation
Trigger: Webhook or manual

Nodes:
1. [Webhook] - POST /api/bmad/prd/create
2. [Load Project] - Get project from database
3. [Check Prerequisites] - Verify analysis phase complete
4. [Execute PM Agent] - Call base-agent with PM config
   - Task: "Create PRD based on project brief"
5. [Loop: PRD Sections]
   - Problem Statement
   - Goals & Metrics
   - User Personas
   - Requirements
   - Technical Constraints
6. [Validate PRD] - Check completeness
7. [Store Artifact] - Save PRD to database
8. [Update Status] - Mark workflow complete
9. [Respond] - Return PRD document
```

#### Step 2.3: Implement in Google AI Studio

For each agent, create a Gemini Gem with:

```markdown
# Gem: BMAD-PM-John

## Instructions
[Full PM system prompt from prompts library]

## Knowledge
- Upload: prd-template.md
- Upload: sample-prd-examples.md
- Upload: bmad-methodology.md

## Conversation Starters
- "Create a PRD for my project"
- "Review these requirements"
- "Help me prioritize features"
```

### Phase 3: Workflow Integration (Week 3-4)

#### Step 3.1: Create Phase Router Workflow

```javascript
// n8n Function Node: Phase Router
const input = $input.first().json;

const phaseConfig = {
  1: { // Analysis
    name: "Analysis",
    requiredArtifacts: [],
    availableWorkflows: ["brainstorm", "research", "create-brief"],
    primaryAgents: ["analyst", "pm"]
  },
  2: { // Planning
    name: "Planning",
    requiredArtifacts: ["product-brief"],
    availableWorkflows: ["create-prd", "create-tech-spec"],
    primaryAgents: ["pm"]
  },
  3: { // Solutioning
    name: "Solutioning",
    requiredArtifacts: ["prd"],
    availableWorkflows: ["create-architecture", "create-ux", "create-epics"],
    primaryAgents: ["architect", "ux-designer", "pm"]
  },
  4: { // Implementation
    name: "Implementation",
    requiredArtifacts: ["prd", "architecture", "epics"],
    availableWorkflows: ["sprint-planning", "dev-story", "code-review"],
    primaryAgents: ["scrum-master", "developer"]
  }
};

const phase = input.phase || determinePhase(input.artifacts);
return phaseConfig[phase];
```

#### Step 3.2: Create Sprint Planning Workflow

```
Workflow: sprint-planning
Trigger: Manual or scheduled

Nodes:
1. [Get Epics] - Load all epics from database
2. [Get Backlog] - Load prioritized stories
3. [Scrum Master Agent] - Plan sprint
   Input: epics, backlog, team capacity
   Output: sprint plan with selected stories
4. [Create Sprint Record] - Store sprint in database
5. [Update Story Status] - Mark stories as "in-sprint"
6. [Generate Sprint Board] - Create visual board
7. [Notify Team] - Send sprint kickoff notification
```

#### Step 3.3: Create Dev Story Workflow

```
Workflow: develop-story
Trigger: Webhook or story selection

Nodes:
1. [Get Story] - Load story from database
2. [Load Context] - Get architecture, coding standards
3. [Developer Agent] - Plan implementation
4. [Loop: Tasks]
   For each task in story:
   a. [DEV Agent: Write Test] - Red phase
   b. [DEV Agent: Implement] - Green phase
   c. [DEV Agent: Refactor] - Refactor phase
   d. [Run Tests] - Validate (external call)
   e. [Update Task Status] - Mark complete
5. [Update Story Status] - Mark "ready-for-review"
6. [Trigger Code Review] - Call code-review workflow
```

### Phase 4: Integration & Testing (Week 4-5)

#### Step 4.1: Create Master Orchestrator

```
Workflow: bmad-orchestrator
Trigger: Webhook (main entry point)

Nodes:
1. [Parse Request] - Extract intent, agent, action
2. [Authenticate] - Verify user/API key
3. [Load Project State] - Get current phase, artifacts
4. [Route to Agent] - Switch based on request
5. [Execute Workflow] - Call appropriate sub-workflow
6. [Update State] - Store new artifacts, update phase
7. [Format Response] - Structure output
8. [Respond] - Return to caller
```

#### Step 4.2: Create Chat Interface Workflow

```
Workflow: bmad-chat-interface
Trigger: Slack/Discord webhook

Nodes:
1. [Receive Message] - Get user message
2. [Parse Intent] - Use AI to understand request
3. [Determine Agent] - Map to BMAD agent
4. [Check Context] - Load conversation history
5. [Execute Agent] - Call appropriate agent workflow
6. [Format for Chat] - Make response chat-friendly
7. [Send Response] - Post back to channel
8. [Store History] - Save conversation
```

### Phase 5: Advanced Features (Week 5-6)

#### Step 5.1: Multi-Agent Collaboration (Party Mode)

```
Workflow: party-mode
Trigger: Manual with topic

Nodes:
1. [Set Topic] - Define discussion topic
2. [Select Agents] - Choose relevant agents
3. [Loop: Discussion Rounds]
   For each round:
   a. [Current Agent] - Get perspective
   b. [Store Perspective] - Add to discussion
   c. [Synthesize] - AI summarizes progress
   d. [Check Consensus] - Determine if resolved
   e. [Next Agent] - Rotate to next agent
4. [Final Synthesis] - Combine all perspectives
5. [Generate Decision] - Create actionable decision
6. [Store Outcome] - Save discussion results
```

#### Step 5.2: Artifact Generation Templates

Create templates for each artifact type:

```javascript
// templates/prd-template.js
const PRD_TEMPLATE = {
  sections: [
    {
      name: "Executive Summary",
      prompt: "Summarize the product in 2-3 paragraphs"
    },
    {
      name: "Problem Statement",
      prompt: "Describe the problem being solved and why it matters"
    },
    {
      name: "Goals & Success Metrics",
      prompt: "Define measurable goals and KPIs"
    },
    {
      name: "User Personas",
      prompt: "Describe target users with demographics and behaviors"
    },
    {
      name: "Functional Requirements",
      prompt: "List features with priority (Must/Should/Could/Won't)"
    },
    {
      name: "Non-Functional Requirements",
      prompt: "Define performance, security, scalability needs"
    },
    {
      name: "Technical Constraints",
      prompt: "List known technical limitations or requirements"
    },
    {
      name: "Timeline & Milestones",
      prompt: "Outline key milestones and dependencies"
    },
    {
      name: "Risks & Mitigations",
      prompt: "Identify risks and mitigation strategies"
    }
  ]
};
```

---

## Part 5: Integration Patterns

### 5.1 Google AI Studio + n8n Integration

```
┌─────────────────────────────────────────────────────────────────────┐
│                    HYBRID ARCHITECTURE                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌─────────────┐      ┌─────────────┐      ┌─────────────┐        │
│   │   Google    │      │    n8n      │      │  External   │        │
│   │  AI Studio  │◀────▶│ Orchestrator│◀────▶│  Services   │        │
│   │   (Gems)    │      │             │      │             │        │
│   └─────────────┘      └─────────────┘      └─────────────┘        │
│         │                    │                    │                 │
│         │              ┌─────┴─────┐              │                 │
│         │              │           │              │                 │
│         ▼              ▼           ▼              ▼                 │
│   ┌─────────────────────────────────────────────────────────┐      │
│   │                    SHARED STATE                          │      │
│   │  (PostgreSQL / Redis / Google Cloud Firestore)          │      │
│   └─────────────────────────────────────────────────────────┘      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.2 API Endpoints to Expose

```yaml
# API Structure
/api/bmad/
  /projects/
    POST   /              # Create new project
    GET    /:id           # Get project details
    PUT    /:id/phase     # Update project phase

  /agents/
    POST   /invoke        # Invoke any agent
    GET    /list          # List available agents

  /workflows/
    POST   /execute       # Execute workflow
    GET    /status/:id    # Get workflow status

  /artifacts/
    POST   /              # Create artifact
    GET    /:projectId    # List project artifacts
    GET    /:id           # Get specific artifact

  /chat/
    POST   /message       # Send chat message
    GET    /history/:id   # Get conversation history
```

### 5.3 Webhook Integration Example

```javascript
// n8n Webhook handler for Slack integration
module.exports = {
  async handleSlackEvent(event) {
    const { text, user, channel } = event;

    // Parse BMAD command
    const command = parseBmadCommand(text);

    // Route to appropriate workflow
    const response = await n8nClient.executeWorkflow('bmad-orchestrator', {
      command: command.action,
      agent: command.agent,
      context: {
        user,
        channel,
        projectId: await getProjectForChannel(channel)
      },
      input: command.parameters
    });

    // Send response back to Slack
    await slack.postMessage({
      channel,
      text: formatResponse(response)
    });
  }
};
```

---

## Part 6: Best Practices & Recommendations

### 6.1 Agent Design Principles

1. **Single Responsibility**: Each agent handles one domain
2. **Clear Persona**: Distinct communication style per agent
3. **Context-Aware**: Always load relevant project context
4. **Output Structured**: Use JSON/YAML for programmatic processing
5. **Validation Built-in**: Agents validate their own outputs

### 6.2 Workflow Design Principles

1. **Atomic Steps**: Each node does one thing well
2. **Error Handling**: Always have fallback paths
3. **State Persistence**: Save progress at each step
4. **Idempotent**: Safe to retry failed workflows
5. **Observable**: Log all actions for debugging

### 6.3 Context Management

```javascript
// Context structure for BMAD workflows
const projectContext = {
  // Project identification
  projectId: "uuid",
  projectName: "My Project",

  // Current state
  currentPhase: 2,
  activeWorkflow: "create-prd",

  // Artifacts (references, not full content)
  artifacts: {
    brief: { id: "uuid", version: 1 },
    prd: { id: "uuid", version: 2 },
    architecture: null
  },

  // Team configuration
  agents: ["pm", "analyst", "architect"],

  // Project-specific standards
  codingStandards: "typescript-strict",
  testingFramework: "jest",

  // History (for context-aware responses)
  recentActions: [
    { agent: "pm", action: "updated-prd", timestamp: "..." },
    { agent: "analyst", action: "completed-research", timestamp: "..." }
  ]
};
```

### 6.4 Error Handling Strategy

```javascript
// n8n Error Handler Node
const error = $input.first().error;

const errorHandlers = {
  'AI_RATE_LIMIT': async () => {
    // Wait and retry
    await sleep(60000);
    return { action: 'retry' };
  },
  'CONTEXT_MISSING': async () => {
    // Request missing context
    return {
      action: 'request_input',
      message: 'Missing required context. Please provide project details.'
    };
  },
  'VALIDATION_FAILED': async () => {
    // Log and alert
    await logError(error);
    return {
      action: 'manual_intervention',
      message: 'Validation failed. Manual review required.'
    };
  }
};

const handler = errorHandlers[error.type] || defaultHandler;
return await handler();
```

---

## Part 7: Quick Start Checklist

### Prerequisites Checklist
- [ ] Google Cloud account with Vertex AI enabled
- [ ] n8n instance (self-hosted or cloud)
- [ ] PostgreSQL database for state management
- [ ] API credentials configured in n8n

### Implementation Checklist

#### Week 1: Foundation
- [ ] Set up n8n instance
- [ ] Create database schema
- [ ] Configure Google AI credentials
- [ ] Create agent prompts library

#### Week 2: Core Agents
- [ ] Implement PM Agent
- [ ] Implement Analyst Agent
- [ ] Implement Architect Agent
- [ ] Implement Developer Agent
- [ ] Create base agent executor workflow

#### Week 3: Workflows
- [ ] Create PRD workflow
- [ ] Create Architecture workflow
- [ ] Create Sprint Planning workflow
- [ ] Create Dev Story workflow

#### Week 4: Integration
- [ ] Build Master Orchestrator
- [ ] Create API endpoints
- [ ] Integrate chat interface
- [ ] Test end-to-end flow

#### Week 5: Enhancement
- [ ] Add Party Mode
- [ ] Implement error handling
- [ ] Add monitoring/logging
- [ ] Create documentation

---

## Conclusion

The BMAD framework provides a robust methodology for AI-driven development that can be effectively implemented using Google AI Studio for agent intelligence and n8n for workflow orchestration. The key is to:

1. **Define clear agent personas** with specific expertise and communication styles
2. **Create structured workflows** that follow the 4-phase methodology
3. **Maintain shared context** across agents and workflows
4. **Implement proper state management** for tracking progress
5. **Build error handling** for resilient operation

By following this guide, you can build a powerful multi-agent AI system that mimics the collaborative nature of a real development team, with each agent contributing their specialized expertise to deliver high-quality software products.

---

## Resources

- [BMAD Framework GitHub](https://github.com/bmad-code-org/BMAD-METHOD)
- [Google AI Studio Documentation](https://ai.google.dev/docs)
- [n8n Documentation](https://docs.n8n.io/)
- [n8n AI Nodes](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain/)
