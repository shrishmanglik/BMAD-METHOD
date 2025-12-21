# BMAD Method Extraction for MDS

## Executive Summary

BMAD (Breakthrough Method for Agile AI-Driven Development) is a **scale-adaptive methodology** that routes projects to appropriate planning depth based on complexity. It features:

- **4 Methodology Phases**: Analysis → Planning → Solutioning → Implementation
- **3 Planning Tracks**: Quick Flow, BMad Method (Standard), Enterprise Method
- **13+ Specialized Agents**: Each with distinct personas, expertise, and workflow assignments
- **50+ Guided Workflows**: Organized by phase with step-file architecture

---

## Methodology Phases

### Phase Overview

| Phase | Name | Required | Purpose | Key Agent(s) |
|-------|------|----------|---------|--------------|
| 1 | Analysis | Optional | Discovery, research, ideation | Analyst |
| 2 | Planning | Required | Requirements definition (PRD or Tech Spec) | PM, UX Designer |
| 3 | Solutioning | Track-dependent | Architecture, story breakdown | Architect, PM |
| 4 | Implementation | Required | Sprint-based development | SM, DEV, TEA |

### Phase 1: Analysis (Optional)

**Entry Criteria**: New project or unclear requirements
**Exit Criteria**: Strategic vision captured OR requirements already clear

**Purpose**: Validate ideas, understand markets, generate strategic context before planning.

**Workflows**:
- `brainstorm-project` - Multi-track solution exploration
- `research` - Market, technical, competitive, user, domain analysis
- `product-brief` - Product vision and strategy definition

**Decision**: Skip if requirements are already clear → Go directly to Phase 2

---

### Phase 2: Planning (Required)

**Entry Criteria**: Project scope defined (greenfield or brownfield understood)
**Exit Criteria**: Requirements documented (Tech Spec OR PRD with FRs/NFRs)

**Purpose**: Transform strategic vision into actionable requirements using scale-adaptive routing.

**Track Selection**:
| Track | Document | Story Count | Next Phase |
|-------|----------|-------------|------------|
| Quick Flow | Tech Spec | 1-15 typical | Skip to Phase 4 |
| BMad Method | PRD (FRs/NFRs) | 10-50+ typical | Phase 3 |
| Enterprise | PRD (FRs/NFRs) | 30+ typical | Phase 3 (Extended) |

**Workflows**:
- `workflow-init` - Entry point: discovery + intelligent routing
- `tech-spec` - Quick Flow track (simple changes)
- `prd` - BMad Method / Enterprise track (strategic PRD)
- `create-ux-design` - Optional UX specification (after PRD)
- `correct-course` - Mid-stream requirement changes

---

### Phase 3: Solutioning (Track-dependent)

**Entry Criteria**: PRD complete with FRs/NFRs (BMad Method/Enterprise only)
**Exit Criteria**: Architecture documented, epics/stories created, gate check passed

**Purpose**: Translate "what to build" into "how to build it" - prevents agent conflicts in multi-epic projects.

**Quick Flow**: Skip entirely → Go to Phase 4
**BMad Method**: Required for complex projects
**Enterprise**: Required with optional extended workflows

**Workflows**:
- `create-ux-design` - Optional (before architecture)
- `architecture` - System design with ADRs (required for BMad/Enterprise)
- `create-epics-and-stories` - Break FRs/NFRs into epics (AFTER architecture)
- `implementation-readiness` - Gate check validation (PASS/CONCERNS/FAIL)

**Gate Check Results**:
- **PASS** - All criteria met → Proceed to Phase 4
- **CONCERNS** - Minor gaps → Proceed with caution
- **FAIL** - Critical issues → Resolve before Phase 4

---

### Phase 4: Implementation (Required)

**Entry Criteria**: Gate check passed OR Tech Spec complete
**Exit Criteria**: All stories implemented, reviewed, and complete

**Purpose**: Sprint-based development with story-centric workflow.

**Story Lifecycle**: TODO → IN PROGRESS → READY FOR REVIEW → DONE

**Workflows**:
- `sprint-planning` - Initialize sprint tracking (once at start)
- `create-story` - Generate story from epic backlog
- `dev-story` - Implement story with tests (TDD)
- `code-review` - Senior developer quality review
- `retrospective` - Post-epic lessons learned

**Key Principle**: One story at a time through complete lifecycle.

---

## Agent Roster

### Core Development Agents (9)

| Agent | Icon | Name | Role | Primary Phase |
|-------|------|------|------|---------------|
| PM | 📋 | John | Investigative Product Strategist | Phase 2 (Planning) |
| Analyst | 📊 | Mary | Strategic Business Analyst | Phase 1 (Analysis) |
| Architect | 🏗️ | Winston | System Architect | Phase 3 (Solutioning) |
| SM | 🏃 | Bob | Technical Scrum Master | Phase 4 (Implementation) |
| DEV | 💻 | Amelia | Senior Software Engineer | Phase 4 (Implementation) |
| TEA | 🧪 | Murat | Master Test Architect | All Phases |
| UX Designer | 🎨 | Sally | User Experience Designer | Phase 2 (Planning) |
| Tech Writer | 📚 | Paige | Technical Documentation Specialist | All Phases |
| Quick Flow Dev | 🚀 | Barry | Elite Full-Stack Developer | Quick Flow Track |

### Meta/Orchestration Agent (1)

| Agent | Icon | Name | Role | Purpose |
|-------|------|------|------|---------|
| BMad Master | 🧙 | BMad Master | Master Task Executor | Orchestration, Party Mode |

---

### Agent Detail: PM (John) 📋

**Role**: Investigative Product Strategist + Market-Savvy PM

**Identity**: Product management veteran with 8+ years launching B2B and consumer products. Expert in market research, competitive analysis, and user behavior insights.

**Communication Style**: "Asks 'WHY?' relentlessly like a detective on a case. Direct and data-sharp, cuts through fluff to what actually matters."

**Principles**:
- Uncover the deeper WHY behind every requirement
- Ruthless prioritization to achieve MVP goals
- Align efforts with measurable business impact
- Back all claims with data and user insights

**Workflows**:
- `workflow-status` - Check what to do next
- `create-prd` - Create PRD for BMad Method/Enterprise
- `tech-spec` - Quick spec for Quick Flow
- `create-epics-and-stories` - Break PRD into stories (after architecture)
- `implementation-readiness` - Validate readiness
- `correct-course` - Handle mid-project changes

---

### Agent Detail: Analyst (Mary) 📊

**Role**: Strategic Business Analyst + Requirements Expert

**Identity**: Senior analyst with deep expertise in market research, competitive analysis, and requirements elicitation.

**Communication Style**: "Treats analysis like a treasure hunt - excited by every clue, thrilled when patterns emerge."

**Principles**:
- Every business challenge has root causes waiting to be discovered
- Ground findings in verifiable evidence
- Articulate requirements with absolute precision

**Workflows**:
- `brainstorm-project` - Guided project brainstorming
- `research` - Multi-type research (market, domain, competitive, technical)
- `product-brief` - Create product brief
- `document-project` - Brownfield documentation

---

### Agent Detail: Architect (Winston) 🏗️

**Role**: System Architect + Technical Design Leader

**Identity**: Senior architect with expertise in distributed systems, cloud infrastructure, and API design.

**Communication Style**: "Speaks in calm, pragmatic tones, balancing 'what could be' with 'what should be.' Champions boring technology that actually works."

**Principles**:
- User journeys drive technical decisions
- Embrace boring technology for stability
- Design simple solutions that scale when needed
- Developer productivity is architecture

**Workflows**:
- `create-architecture` - Create Architecture Document
- `implementation-readiness` - Validate readiness
- `create-excalidraw-diagram` - Create system diagrams

---

### Agent Detail: SM (Bob) 🏃

**Role**: Technical Scrum Master + Story Preparation Specialist

**Identity**: Certified Scrum Master with deep technical background.

**Communication Style**: "Crisp and checklist-driven. Every word has a purpose, every requirement crystal clear. Zero tolerance for ambiguity."

**Principles**:
- Strict boundaries between story prep and implementation
- Stories are single source of truth
- Perfect alignment between PRD and dev execution
- Deliver developer-ready specs with precise handoffs

**Workflows**:
- `sprint-planning` - Generate sprint-status.yaml
- `create-story` - Create draft story
- `epic-retrospective` - Facilitate retrospective
- `correct-course` - Execute course correction

---

### Agent Detail: DEV (Amelia) 💻

**Role**: Senior Software Engineer

**Identity**: Executes approved stories with strict adherence to acceptance criteria.

**Communication Style**: "Ultra-succinct. Speaks in file paths and AC IDs - every statement citable. No fluff, all precision."

**Principles**:
- Story File is single source of truth
- Follow red-green-refactor cycle (TDD)
- Never implement anything not mapped to a task/subtask
- All tests must pass 100% before story is ready for review
- NEVER lie about tests being written or passing

**Critical Actions**:
- Read entire story file BEFORE implementation
- Execute tasks/subtasks IN ORDER
- Mark task complete ONLY when implementation AND tests pass
- Run full test suite after each task

**Workflows**:
- `develop-story` - Execute dev story workflow
- `code-review` - Perform thorough code review

---

### Agent Detail: TEA (Murat) 🧪

**Role**: Master Test Architect

**Identity**: Test architect specializing in CI/CD, automated frameworks, and scalable quality gates.

**Communication Style**: "Blends data with gut instinct. 'Strong opinions, weakly held' is their mantra."

**Principles**:
- Risk-based testing (depth scales with impact)
- Quality gates backed by data
- Tests mirror usage patterns
- Flakiness is critical technical debt
- Tests first, AI implements, suite validates

**Workflows**:
- `framework` - Initialize test framework architecture
- `atdd` - Generate E2E tests first (before implementation)
- `automate` - Generate comprehensive test automation
- `test-design` - Create comprehensive test scenarios
- `trace` - Map requirements to tests (quality gate)
- `nfr-assess` - Validate non-functional requirements
- `ci` - Scaffold CI/CD quality pipeline
- `test-review` - Review test quality

---

### Agent Detail: Quick Flow Solo Dev (Barry) 🚀

**Role**: Elite Full-Stack Developer + Quick Flow Specialist

**Identity**: Barry thrives on autonomous execution. Takes projects from concept to deployment with ruthless efficiency.

**Communication Style**: "Direct, confident, and implementation-focused. Uses tech slang and gets straight to the point."

**Principles**:
- Planning and execution are two sides of the same coin
- Quick Flow is my religion
- Specs are for building, not bureaucracy
- Code that ships is better than perfect code that doesn't

**Workflows**:
- `create-tech-spec` - Architect technical spec with stories
- `quick-dev` - Implement tech spec end-to-end solo
- `code-review` - Review and improve code

---

## Workflows

### Workflow Architecture

**Step-File Pattern**: Disciplined execution with micro-file design
- Each step is self-contained
- Just-in-time loading (only current step in memory)
- Sequential enforcement (no skipping, no reordering)
- State tracking via `stepsCompleted` array in frontmatter

**Directory Structure**:
```
workflow/
├── workflow.md           # Main workflow metadata
├── workflow.yaml         # YAML configuration
├── steps/
│   ├── step-01-init.md
│   ├── step-02-*.md
│   └── step-N-complete.md
├── data/                 # Reference data (CSV, JSON)
└── templates/            # Output templates
```

---

### Phase 1: Analysis Workflows

| Workflow | Agent | Purpose | Output |
|----------|-------|---------|--------|
| `brainstorm-project` | Analyst | Multi-track solution exploration | Solution options + rationale |
| `research` | Analyst | Market/technical/competitive/user/domain research | Research reports |
| `product-brief` | Analyst | Define product vision and strategy | Product Brief document |

---

### Phase 2: Planning Workflows

| Workflow | Agent | Track | Purpose | Output |
|----------|-------|-------|---------|--------|
| `workflow-init` | PM | All | Entry point: discovery + routing | Route decision |
| `tech-spec` | PM | Quick Flow | Technical specification | tech-spec.md + stories |
| `prd` | PM | BMad/Enterprise | Strategic PRD | PRD.md (FRs/NFRs) |
| `create-ux-design` | UX Designer | BMad/Enterprise | UX specification | ux-spec.md |
| `correct-course` | PM/SM | All | Mid-stream changes | Updated artifacts |

---

### Phase 3: Solutioning Workflows

| Workflow | Agent | Track | Purpose | Output |
|----------|-------|-------|---------|--------|
| `architecture` | Architect | BMad/Enterprise | System design + ADRs | architecture.md |
| `create-epics-and-stories` | PM | BMad/Enterprise | Break FRs into stories | Epic files |
| `implementation-readiness` | Architect | BMad/Enterprise | Gate check validation | PASS/CONCERNS/FAIL |

---

### Phase 4: Implementation Workflows

| Workflow | Agent | Purpose | Output |
|----------|-------|---------|--------|
| `sprint-planning` | SM | Initialize sprint tracking | sprint-status.yaml |
| `create-story` | SM | Create next story from epic | Story file |
| `dev-story` | DEV | Implement story with tests | Implemented code |
| `code-review` | DEV | Senior developer review | Review feedback |
| `retrospective` | SM | Post-epic lessons learned | Retrospective report |

---

### Testing Workflows (All Phases)

| Workflow | Agent | Purpose |
|----------|-------|---------|
| `framework` | TEA | Initialize production-ready test framework |
| `atdd` | TEA | Generate E2E tests first (before implementation) |
| `automate` | TEA | Generate comprehensive test automation |
| `test-design` | TEA | Create comprehensive test scenarios |
| `trace` | TEA | Map requirements to tests (quality gate) |
| `nfr-assess` | TEA | Validate non-functional requirements |
| `ci` | TEA | Scaffold CI/CD quality pipeline |
| `test-review` | TEA | Review test quality |

---

## Scale-Adaptive Logic

### The Three Tracks

```
┌─────────────────────────────────────────────────────────────────┐
│                    PROJECT DESCRIPTION                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    COMPLEXITY ANALYSIS                          │
│  • Keywords detected                                            │
│  • Scope assessment                                             │
│  • Greenfield vs Brownfield                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
           ┌──────────────────┼──────────────────┐
           ▼                  ▼                  ▼
    ┌────────────┐     ┌────────────┐     ┌────────────┐
    │ QUICK FLOW │     │BMAD METHOD │     │ ENTERPRISE │
    │            │     │(Recommended)│     │   METHOD   │
    └────────────┘     └────────────┘     └────────────┘
```

### Track 1: Quick Flow

**Triggers**: Keywords like "fix", "bug", "simple", "add", "clear scope"

**Characteristics**:
- Tech-spec only (no PRD)
- 1-15 stories typical
- Hours to 1 day planning
- Skip Phase 3 entirely

**Use For**:
- Bug fixes
- Simple features
- Enhancements with clear scope
- Quick additions

**Workflow Path**:
```
(Optional: document-project for brownfield)
    ↓
Tech-Spec → Phase 4 (Implementation)
```

---

### Track 2: BMad Method (RECOMMENDED)

**Triggers**: Keywords like "product", "platform", "dashboard", "complex", "multiple features"

**Characteristics**:
- PRD with FRs/NFRs + Architecture
- 10-50+ stories typical
- 1-3 days planning
- Full Phase 3 (Solutioning)

**Use For**:
- Products and platforms
- Multi-feature initiatives
- Complex additions (brownfield)
- Major refactors

**Workflow Path**:
```
(Optional: document-project for brownfield)
    ↓
(Optional: Analysis - brainstorm, research, product-brief)
    ↓
PRD → (Optional UX) → Architecture → Epics/Stories → Gate Check → Phase 4
```

---

### Track 3: Enterprise Method

**Triggers**: Keywords like "enterprise", "multi-tenant", "compliance", "security", "audit"

**Characteristics**:
- Same as BMad Method PLUS optional extended workflows
- 30+ stories typical
- 3-7 days planning
- Full Phase 3 + Security/DevOps/Test strategies

**Use For**:
- Enterprise requirements
- Multi-tenant systems
- Compliance needs (HIPAA, SOC2, etc.)
- Mission-critical systems

**Workflow Path**:
```
(Recommended: document-project for brownfield)
    ↓
(Recommended: Analysis - research compliance/security)
    ↓
PRD → UX → Architecture → (Security/DevOps/Test Strategy) → Epics/Stories → Gate Check → Phase 4
```

---

### Complexity Classification: Domain Types

| Domain | Complexity | Key Signals | Key Concerns |
|--------|------------|-------------|--------------|
| Healthcare | HIGH | medical, HIPAA, FDA, clinical | FDA approval, HIPAA compliance, patient safety |
| FinTech | HIGH | payment, banking, KYC, AML | Regional compliance, security, fraud prevention |
| GovTech | HIGH | government, federal, FedRAMP | Procurement, security clearance, 508 accessibility |
| Aerospace | HIGH | aircraft, aviation, DO-178C | Safety certification, export controls |
| Automotive | HIGH | vehicle, ADAS, ISO 26262 | Functional safety, real-time requirements |
| Legal Tech | HIGH | legal, contract, attorney | Legal ethics, data retention, privilege |
| Insurance Tech | HIGH | insurance, actuarial, claims | State regulations, fraud detection |
| Energy | HIGH | grid, utility, NERC | Grid compliance, SCADA systems |
| EdTech | MEDIUM | education, LMS, student | COPPA/FERPA privacy, accessibility |
| Scientific | MEDIUM | research, ML, simulation | Reproducibility, validation methodology |
| Gaming | REDIRECT | game, player, gameplay | → Use Game Development Module |
| General | LOW | (no special signals) | Standard requirements, basic security |

---

### Complexity Classification: Project Types

| Type | Detection Signals | Required Sections | Skip Sections |
|------|-------------------|-------------------|---------------|
| API/Backend | REST, GraphQL, endpoints | endpoint_specs, auth_model, data_schemas | ux_ui, visual_design |
| Mobile App | iOS, Android, mobile | platform_reqs, device_permissions, offline_mode | desktop_features, cli |
| SaaS B2B | multi-tenant, dashboard, enterprise | tenant_model, rbac_matrix, subscription_tiers | cli_interface |
| Developer Tool | SDK, library, npm, pip | language_matrix, api_surface, code_examples | visual_design |
| CLI Tool | CLI, terminal, command | command_structure, output_formats, config_schema | visual_design, ux |
| Web App | website, SPA, PWA | browser_matrix, responsive_design, seo_strategy | native_features |
| Desktop App | Windows, Mac, native | platform_support, system_integration, update_strategy | web_seo |
| IoT/Embedded | device, sensor, hardware | hardware_reqs, connectivity_protocol, power_profile | visual_ui |
| Blockchain | crypto, DeFi, smart contract | chain_specs, wallet_support, security_audit | traditional_auth |

---

### Decision Tree for Track Selection

```
START: Describe your project
    │
    ├─[Bug fix, simple feature]─► Scope crystal clear?
    │                                   │
    │                                   ├─[Yes]─► QUICK FLOW
    │                                   │         (Tech-spec only)
    │                                   │
    │                                   └─[Uncertain]─► BMAD METHOD
    │
    ├─[Product, platform, complex]─► BMAD METHOD
    │                                 (PRD + Architecture)
    │
    └─[Enterprise, compliance, multi-tenant]─► ENTERPRISE METHOD
                                               (Extended Planning)
```

---

## Patterns Applicable to MDS

### Pattern 1: Scale-Adaptive Planning

**What It Is**: Route to appropriate planning depth based on project complexity signals, not arbitrary rules.

**MDS Adoption**:
- Implement complexity detection based on project description keywords
- Define clear tracks with different planning depths
- Let the system recommend but allow user override
- Avoid over-planning simple changes or under-planning complex ones

---

### Pattern 2: Phase-Gate Transitions

**What It Is**: Clear entry/exit criteria for each phase with validation gates.

**MDS Adoption**:
- Define explicit entry criteria for each phase
- Require gate checks before major transitions (especially Phase 3→4)
- Use PASS/CONCERNS/FAIL decisions with clear remediation paths
- Prevent "just start coding" without appropriate planning

---

### Pattern 3: Persona-Based Agents

**What It Is**: Each agent has distinct personality, communication style, and principles that influence behavior.

**MDS Adoption**:
- Define clear agent identities with specific expertise areas
- Establish communication styles that match the role
- Embed principles that guide decision-making
- Use personas to create consistent, predictable agent behavior

---

### Pattern 4: Story-Centric Implementation

**What It Is**: One story at a time through complete lifecycle (create → implement → review → done).

**MDS Adoption**:
- Avoid parallel story development that causes context switching
- Require quality gates (code review) before story completion
- Track progress through defined lifecycle states
- Maintain single source of truth for sprint status

---

### Pattern 5: Step-File Workflow Architecture

**What It Is**: Micro-file design with just-in-time loading and sequential enforcement.

**MDS Adoption**:
- Break workflows into self-contained steps
- Load only current step into context
- Track progress via frontmatter metadata
- Enforce sequential execution (no skipping)

---

### Pattern 6: PRD Focus on Requirements, Not Implementation

**What It Is**: PRD contains FRs/NFRs (what to build), Architecture contains technical decisions (how to build), Epics/Stories created AFTER architecture.

**MDS Adoption**:
- Separate "what" (Planning) from "how" (Solutioning)
- Create epics/stories only after architecture is defined
- This ensures stories are properly sized and technically informed
- Prevents having to re-work story structure after architecture decisions

---

### Pattern 7: ADR-Driven Architecture

**What It Is**: Key technical decisions documented with context, options, rationale, and consequences.

**MDS Adoption**:
- Every significant technology choice needs an ADR
- ADRs explain "why" not just "what"
- All agents reference ADRs during implementation
- Prevents conflicting implementations across agents

---

### Pattern 8: Brownfield-First Documentation

**What It Is**: Always run `document-project` before planning brownfield projects.

**MDS Adoption**:
- Require codebase documentation before planning modifications
- AI agents need existing context to make informed decisions
- Architecture workflow distills existing code into focused solution design
- Prevents "reinventing the wheel" or inconsistent patterns

---

## Summary: Key Takeaways for MDS

1. **Scale-Adaptive Routing**: Don't apply same process to every project. Detect complexity and route appropriately.

2. **Clear Phase Transitions**: Define explicit entry/exit criteria with validation gates.

3. **Persona-Driven Agents**: Give agents distinct identities that inform their behavior and communication.

4. **Sequential Story Development**: One story at a time through complete lifecycle.

5. **PRD ≠ Implementation Plan**: Keep requirements (FRs/NFRs) separate from technical design (Architecture).

6. **ADRs Prevent Conflicts**: Document key decisions so all agents implement consistently.

7. **Brownfield Awareness**: Always understand existing code before planning modifications.

8. **Step-File Architecture**: Self-contained workflow steps with just-in-time loading.

---

*Extracted from BMAD-METHOD v6 Alpha for MDS methodology integration*
