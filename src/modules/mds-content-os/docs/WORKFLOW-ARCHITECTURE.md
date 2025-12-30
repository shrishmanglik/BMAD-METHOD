# MDS CONTENT CREATION OS — WORKFLOW ARCHITECTURE

## System Flow Diagram

```
                                    USER INPUT
                                        │
                                        ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                              ORCHESTRATOR                                      │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │  1. PARSE INPUT                                                          │  │
│  │     ├── Command detection (/create, /video, /image, etc.)               │  │
│  │     ├── Brief extraction                                                 │  │
│  │     └── Context identification                                           │  │
│  │                                                                           │  │
│  │  2. CLASSIFY SCOPE                                                       │  │
│  │     ├── Quick (single output, minimal processing)                        │  │
│  │     ├── Standard (full pipeline, single platform)                        │  │
│  │     ├── Comprehensive (full pipeline, multi-platform)                    │  │
│  │     └── Campaign (all outputs, documentation, strategy)                  │  │
│  │                                                                           │  │
│  │  3. ROUTE TO AGENTS                                                      │  │
│  │     └── Determine optimal sequence based on scope                        │  │
│  └─────────────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
                    ▼                   ▼                   ▼
              ┌─────────┐         ┌─────────┐         ┌─────────┐
              │  QUICK  │         │STANDARD │         │CAMPAIGN │
              │  PATH   │         │  PATH   │         │  PATH   │
              └────┬────┘         └────┬────┘         └────┬────┘
                   │                   │                   │
                   │                   ▼                   │
                   │    ┌──────────────────────────┐      │
                   │    │   CREATIVE STRATEGIST    │      │
                   │    │  • Analyze brief         │      │
                   │    │  • Generate concepts     │◄─────┤
                   │    │  • Recommend approach    │      │
                   │    └───────────┬──────────────┘      │
                   │                │                      │
                   │                ▼                      │
                   │    ┌──────────────────────────┐      │
                   │    │    CINEMATOGRAPHER       │      │
                   │    │  • Design shots          │      │
                   │    │  • Specify camera        │◄─────┤
                   │    │  • Map lighting          │      │
                   │    │  • Material poetry       │      │
                   │    └───────────┬──────────────┘      │
                   │                │                      │
                   │    ┌───────────┴───────────┐         │
                   │    │                       │         │
                   │    ▼                       ▼         │
                   │ ┌──────────────┐  ┌──────────────┐   │
                   │ │  NARRATIVE   │  │  PRODUCTION  │   │
                   │ │  ARCHITECT   │  │  DESIGNER    │   │
                   │ │ • Emotional  │  │ • Environment│   │
                   │ │   arc        │  │ • Materials  │◄──┤
                   │ │ • Hook       │  │ • Atmosphere │   │
                   │ │ • Pacing     │  │ • Color      │   │
                   │ └──────┬───────┘  └──────┬───────┘   │
                   │        │                  │          │
                   │        └────────┬─────────┘          │
                   │                 │                    │
                   │                 ▼                    │
                   │    ┌──────────────────────────┐      │
                   │    │   PLATFORM OPTIMIZER     │      │
                   ├───►│  • Platform selection    │◄─────┤
                   │    │  • Format translation    │      │
                   │    │  • AI failure avoidance  │      │
                   │    │  • Native optimization   │      │
                   │    └───────────┬──────────────┘      │
                   │                │                      │
                   │    ┌───────────┴────────────────────┐│
                   │    │           │          │         ││
                   │    ▼           ▼          ▼         ▼│
                   │ ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
                   │ │ SORA │  │ VEO  │  │  MJ  │  │ FLUX │
                   │ │Prompt│  │ JSON │  │Prompt│  │Prompt│
                   │ └──┬───┘  └──┬───┘  └──┬───┘  └──┬───┘
                   │    │         │         │         │
                   │    └────┬────┴────┬────┴────┬────┘
                   │         │         │         │
                   │         ▼         ▼         ▼
                   │    ┌──────────────────────────┐
                   │    │   QUALITY VALIDATOR      │
                   └───►│  • Spec compliance       │
                        │  • Failure mode check    │
                        │  • Completeness          │
                        └───────────┬──────────────┘
                                    │
                                    ▼
                        ┌──────────────────────────┐
                        │    LEARNING ENGINE       │
                        │  • Log generation        │
                        │  • Track patterns        │
                        │  • Update knowledge      │
                        └───────────┬──────────────┘
                                    │
                                    ▼
                              FINAL OUTPUT
```

---

## Processing Paths

### QUICK PATH (< 30 seconds)
```
Trigger: /quick, simple requests, or urgency indicated

Flow:
INPUT → Orchestrator → Platform Optimizer → Output → Validate → DELIVER

Skip:
- Strategy development
- Deep cinematography
- Narrative architecture

Use when:
- User needs fast result
- Simple, single-platform output
- Iteration/refinement context exists
```

### STANDARD PATH (Full Pipeline)
```
Trigger: /create, /video, /image, or standard brief

Flow:
INPUT → Orchestrator → Strategist → Cinematographer →
        [Narrative + Production in parallel] →
        Platform Optimizer → Output → Validate → DELIVER

Duration: 60-120 seconds of processing

Use when:
- New creative direction needed
- Quality is priority
- Single or dual platform output
```

### CAMPAIGN PATH (Full Production)
```
Trigger: /campaign, or extensive brief with multiple deliverables

Flow:
INPUT → Orchestrator → Strategist (multiple concepts) →
        Cinematographer (full shot breakdown) →
        Narrative + Production + Audio (parallel) →
        Platform Optimizer (all relevant platforms) →
        Document Generator →
        Validate → Package → DELIVER

Output includes:
- Strategy document
- Multiple creative concepts
- Video prompts (multiple platforms)
- Image prompts (hero, lifestyle, detail, etc.)
- Audio direction
- Storyboard
- Shot list
- Production notes

Use when:
- Full campaign needed
- Multiple stakeholders
- Production team handoff
```

---

## Agent Communication Protocol

### Context Passing
```
Each agent receives:
{
  "original_input": "[User's original request]",
  "orchestrator_analysis": {
    "scope": "[quick/standard/campaign]",
    "platforms": ["list", "of", "targets"],
    "outputs_needed": ["list", "of", "deliverables"]
  },
  "previous_agent_outputs": {
    "strategist": { ... },
    "cinematographer": { ... },
    // etc.
  },
  "session_context": {
    "project_name": "[if established]",
    "style_references": "[if any]",
    "previous_generations": "[summary]",
    "user_preferences": "[learned]"
  }
}
```

### Output Format
```
Each agent outputs:
{
  "agent": "[agent_name]",
  "status": "complete",
  "output": {
    // Agent-specific structured output
  },
  "notes_for_next_agent": "[anything the next agent should know]",
  "learning_observations": "[patterns noticed for learning engine]"
}
```

---

## Decision Trees

### Platform Selection Logic
```
IF user specified platform:
  USE specified platform
ELSE:
  IF duration > 10s:
    PRIMARY: Sora 2 Pro
    SECONDARY: Runway Gen-3
  ELSE IF duration <= 8s:
    PRIMARY: VEO 3.1
    SECONDARY: Sora 2 Pro

  IF content_type == "product_shot":
    ADD: Midjourney (hero)
    ADD: Flux (clean product)

  IF content_type == "social_campaign":
    ADD: Multiple platforms for format variations

  IF has_text_requirement:
    IMAGE_PLATFORM: Ideogram 2.0
```

### Scope Determination
```
QUICK if:
  - Command is /quick
  - Brief is < 10 words
  - Request is refinement/adaptation
  - User indicates urgency

STANDARD if:
  - Command is /create, /video, /image
  - New creative direction needed
  - Single deliverable focus

CAMPAIGN if:
  - Command is /campaign
  - Multiple deliverables mentioned
  - Timeline/launch mentioned
  - "Full campaign" or "complete package" requested
```

---

## Parallel Processing Points

### Safe to Parallelize
```
After CINEMATOGRAPHER completes:
  PARALLEL {
    NARRATIVE ARCHITECT
    PRODUCTION DESIGNER
    AUDIO DESIGNER (if needed)
  }
  THEN → PLATFORM OPTIMIZER

After PLATFORM OPTIMIZER:
  PARALLEL {
    SORA output generation
    VEO output generation
    MIDJOURNEY output generation
    FLUX output generation
    // etc.
  }
  THEN → QUALITY VALIDATOR
```

### Must Be Sequential
```
ORCHESTRATOR → STRATEGIST (needs orchestrator analysis)
STRATEGIST → CINEMATOGRAPHER (needs creative direction)
ALL AGENTS → QUALITY VALIDATOR (needs complete outputs)
QUALITY VALIDATOR → LEARNING ENGINE (needs validation results)
```

---

## Error Handling

### Missing Information
```
IF critical information missing:
  ASK user for clarification before proceeding
  DO NOT assume or guess on:
    - Brand requirements
    - Specific platform needs
    - Duration requirements (for video)
    - Aspect ratio (for images)

IF non-critical information missing:
  PROCEED with sensible defaults
  NOTE in output what was assumed
```

### Quality Gate Failures
```
IF validation fails:
  IDENTIFY specific failure
  AUTO-CORRECT if possible
  REGENERATE affected section
  IF still fails after 1 retry:
    FLAG to user with explanation
    OFFER manual override option
```

---

## Memory Architecture

### Session Memory (Temporary)
```
Stored during conversation:
- Current project context
- All generations in session
- User feedback received
- Style/brand established
- Preferences learned
```

### Project Memory (Persistent)
```
Stored across sessions (if platform supports):
- Project name and brief
- Style references
- Brand guidelines
- Generation history
- What worked/didn't work
```

### Global Learning (System)
```
Aggregated patterns:
- Platform success rates
- Common failure modes
- Effective prompt patterns
- User preference patterns
```

---

## Output Delivery

### Standard Delivery
```
CREATIVE STRATEGY (brief)
↓
PRODUCTION PACKAGE (full prompts)
↓
EXECUTION NOTES (tips, warnings)
↓
NEXT ACTIONS (what user can do)
```

### Campaign Delivery
```
EXECUTIVE SUMMARY
↓
STRATEGIC OPTIONS (2-3 concepts)
↓
RECOMMENDED APPROACH
↓
DELIVERABLES:
├── Video Prompts (by platform)
├── Image Prompts (by type)
├── Audio Direction
├── Storyboard
├── Shot List
└── Production Notes
↓
USAGE GUIDE
```
