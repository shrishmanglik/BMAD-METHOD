# MDS CONTENT CREATION OS
## Product Requirements Document (PRD)
### Version 2.0 — Production System

---

## Executive Summary

**What we're NOT building:** A prompt template library or documentation system.

**What we ARE building:** An autonomous AI production studio that can:
1. Take a single creative brief and produce production-ready outputs
2. Self-improve based on generation results
3. Chain multiple AI models together intelligently
4. Learn from every generation to get better over time
5. Operate as a real creative team, not a single prompt

---

## The Problem

Current AI content creation is:
- **Manual**: Human writes prompt → AI generates → Human evaluates → Repeat
- **Disconnected**: Each generation is isolated, no learning
- **Template-based**: Fill-in-the-blank prompts that produce generic results
- **Platform-ignorant**: Same prompt used everywhere, ignoring platform strengths
- **Single-shot**: One prompt, one output, no iteration

---

## The Vision

An **Autonomous Creative Production System** where:

```
USER INPUT                    SYSTEM OPERATION                      OUTPUT
─────────────────────────────────────────────────────────────────────────────

"Create a luxury           ┌─────────────────────────┐         • Sora prompt (20s)
 watch commercial"    ───▶ │  ORCHESTRATOR           │    ───▶ • VEO prompt (8s)
                           │  ↓                      │         • Midjourney prompts (5)
                           │  BRIEF ANALYZER         │         • Storyboard
                           │  ↓                      │         • Audio direction
                           │  CREATIVE STRATEGIST    │         • Brand guidelines
                           │  ↓                      │         • Shot list
                           │  CINEMATOGRAPHER        │         • Color script
                           │  ↓                      │         • Mood board prompts
                           │  PLATFORM OPTIMIZER     │
                           │  ↓                      │
                           │  OUTPUT GENERATOR       │
                           │  ↓                      │
                           │  QUALITY VALIDATOR      │
                           │  ↓                      │
                           │  SELF-IMPROVEMENT       │
                           └─────────────────────────┘
```

---

## Core Features

### Feature 1: Intelligent Orchestration Engine

**What it does:**
- Receives any creative brief (structured or unstructured)
- Automatically determines what outputs are needed
- Routes to appropriate specialist agents
- Manages dependencies between agents
- Handles parallel processing where possible

**How it works:**
```
INPUT: "I need content for a product launch next week"

ORCHESTRATOR ANALYSIS:
├── Intent: Product launch campaign
├── Timeline: Urgent (1 week)
├── Outputs needed:
│   ├── Hero video (announcement)
│   ├── Social cuts (5-6 versions)
│   ├── Static images (10+)
│   ├── Storyboard for production
│   └── Audio/music direction
├── Platforms detected:
│   ├── Long-form: YouTube, Website
│   ├── Short-form: TikTok, Reels, Shorts
│   └── Static: Instagram, LinkedIn, Twitter
└── Routing:
    ├── PARALLEL: Brief analysis + Brand context lookup
    ├── SEQUENTIAL: Strategy → Cinematography → Outputs
    └── FINAL: Quality gate → Delivery
```

**Why it matters:**
- No manual routing
- Intelligent parallelization
- Context maintained across agents

---

### Feature 2: Adaptive Creative Strategy Engine

**What it does:**
- Develops unique creative angles (not templates)
- Considers competitive landscape
- Adapts to brand voice and history
- Generates multiple strategic options
- Self-critiques before presenting

**Strategic Framework:**
```
BRIEF: "Luxury watch commercial"

STRATEGY ENGINE OUTPUT:

OPTION A: "Frozen Time"
├── Concept: Time stops for everyone except the wearer
├── Emotional hook: Power, control, mastery
├── Visual approach: Slow-motion world, real-time subject
├── Differentiation: Not about craftsmanship (overused), about what it gives you
└── Risk level: Medium (requires good VFX direction)

OPTION B: "Generations"
├── Concept: The same watch, different hands, different eras
├── Emotional hook: Legacy, permanence, heritage
├── Visual approach: Seamless time transitions
├── Differentiation: Story-driven, emotional
└── Risk level: Low (proven concept, execution-dependent)

OPTION C: "The Waiting"
├── Concept: Extreme close-up journey across the watch face
├── Emotional hook: Anticipation, detail obsession, craftsmanship
├── Visual approach: Macro cinematography, ASMR-adjacent
├── Differentiation: Sensory experience over narrative
└── Risk level: High (needs perfect execution)

RECOMMENDATION: Option B with elements of A
RATIONALE: Emotional resonance + manageable execution + differentiation
```

---

### Feature 3: Cinematographer Intelligence (Deep)

**Not just shot lists, but:**
- Emotional beat mapping
- Lens breathing patterns
- Light motivation tracking
- Material behavior poetry
- Camera personality definition

**Example Output:**
```
SHOT 003: "The Inheritance"
Duration: 3.2s
Position in arc: Emotional peak (Act 2 climax)

CAMERA PERSONALITY FOR THIS SHOT:
The camera is a grandchild seeing the watch for the first time.
It approaches with reverence, slight hesitation, then wonder.

TECHNICAL TRANSLATION:
├── Movement: Slow push (0.3cm/s) with micro-hesitation at 1.8s
├── Lens: 85mm at T2 (isolate subject, suggest intimacy)
├── Height: Slightly below eye level (looking up = reverence)
├── Stability: Subtle handheld (2% variance) for humanity
└── Focus: Rack from hands to dial at 2.4s (attention shift)

LIGHT MOTIVATION:
The warm key light comes from the window of the grandfather's study.
It's late afternoon. The light has traveled a long way to reach this moment.
├── Key: 3200K, 45° camera left, soft through sheer curtain
├── Fill: Ambient bounce from wooden desk (warm, 1:4 ratio)
├── Accent: Edge light on watch crystal (the watch glows with importance)
└── Practical: Desk lamp visible in background (grounds the scene)

MATERIAL POETRY:
The leather strap has been softened by decades of wear,
conforming to a wrist shape that no longer exists.
The crystal catches light like it's holding onto the last rays of a sunset.
The dial's patina tells time twice—once on its face, once in its aging.

AI GENERATION TRANSLATION (Sora):
"Weathered hands extend toward a vintage timepiece resting on aged mahogany,
fingers approaching with the hesitant reverence of receiving a sacred object.
Late afternoon light streams through gauze curtains, painting everything in
amber warmth. The watch's leather strap, softened to butter by fifty years of
devotion, catches the light along its worn edges. Camera breathes forward
almost imperceptibly, focus shifting from trembling fingertips to the dial's
patinated surface, where decades of tiny scratches create a constellation
of lived moments. The crystal holds the light like a promise kept."
```

---

### Feature 4: Platform-Native Output Engine

**Not conversion, but native creation for each platform:**

```
SAME BRIEF → DIFFERENT NATIVE OUTPUTS

SORA 2 PRO (20s):
├── Format: Prose-first narrative
├── Word density: 180-220 words/shot
├── Optimizations applied:
│   ├── Fluid dynamics → Visual poetry
│   ├── Hand poses → Simplified, described by outcome
│   ├── Text → Avoided or soft-focus
│   └── Movement → Deliberate, motivated
└── [FULL PROMPT: 1,200 words]

VEO 3.1 (8s):
├── Format: JSON priority cascade
├── Structure: 7-layer hierarchy
├── Optimizations applied:
│   ├── Compressed narrative (single emotional beat)
│   ├── Audio architecture emphasized
│   └── Single subject focus
└── [FULL JSON: 400 lines]

MIDJOURNEY:
├── Format: Evocative prose + parameters
├── Style: --sref maintained across series
├── Optimizations applied:
│   ├── Artistic interpretation welcomed
│   ├── Parameters tuned per shot type
│   └── Negative prompts for consistency
└── [5 PROMPTS: Hero, Detail, Lifestyle, Abstract, Close-up]

RUNWAY GEN-3:
├── Format: Concise + motion descriptors
├── Focus: Movement quality
└── [PROMPT: 80 words + motion tags]
```

---

### Feature 5: Self-Improvement Loop

**The system learns from every generation:**

```
GENERATION FEEDBACK LOOP:

1. GENERATION
   └── System produces prompt for Sora

2. USER FEEDBACK (or automated analysis)
   └── "The hands looked weird, liquid was too thick"

3. PATTERN RECOGNITION
   └── System logs: {
         platform: "sora",
         issue: "hand_anatomy",
         context: "close-up, multiple fingers visible",
         frequency: 47 (across all users)
       }

4. KNOWLEDGE UPDATE
   └── Rule added: "For Sora close-ups with hands,
       reduce visible fingers, describe by action outcome"

5. FUTURE GENERATIONS
   └── All future hand shots automatically apply this learning

SYSTEM IMPROVEMENT METRICS:
├── Generation success rate: 67% → 84% (over 1000 generations)
├── Revision requests: 3.2 avg → 1.4 avg
├── Platform-specific optimizations: 142 rules learned
└── User satisfaction: 7.2 → 8.9 (10-point scale)
```

---

### Feature 6: Multi-Modal Chain Generation

**One brief → Complete production package:**

```
INPUT: "/create Luxury watch commercial, 30 seconds, cinematic"

OUTPUT PACKAGE:

📁 LUXURY_WATCH_CAMPAIGN/
├── 📁 video/
│   ├── sora_hero_20s.txt          # Main hero video prompt
│   ├── sora_hero_20s_v2.txt       # Alternate version
│   ├── veo_teaser_8s.txt          # Teaser cut
│   ├── veo_social_8s_v1-5.txt     # 5 social variations
│   └── runway_broll_10s.txt       # B-roll generation
│
├── 📁 image/
│   ├── mj_hero_16x9.txt           # Hero image
│   ├── mj_lifestyle_1-3.txt       # Lifestyle shots
│   ├── mj_detail_1-5.txt          # Product details
│   ├── flux_product_white.txt     # Clean product shot
│   └── ideogram_logo_endcard.txt  # End card with text
│
├── 📁 audio/
│   ├── music_direction.md         # Music brief for composer/Suno
│   ├── sound_design.md            # SFX direction
│   └── vo_script.md               # Voiceover if needed
│
├── 📁 production/
│   ├── storyboard.md              # Full visual storyboard
│   ├── shot_list.csv              # Technical shot list
│   ├── color_script.md            # Color progression
│   └── mood_board_prompts.txt     # Reference image prompts
│
├── 📁 strategy/
│   ├── creative_brief.md          # Expanded brief
│   ├── competitive_analysis.md    # What others are doing
│   └── platform_strategy.md       # Distribution plan
│
└── 📄 GENERATION_REPORT.md        # What was created, why, how to use
```

---

### Feature 7: Context Persistence & Memory

**The system remembers:**

```
SESSION MEMORY:
├── Current project context
├── Brand guidelines loaded
├── Style references established
├── Previous generations in session
└── User preferences learned

PROJECT MEMORY:
├── All generations for this project
├── What worked, what didn't
├── Style evolution over time
└── Client feedback incorporated

GLOBAL MEMORY:
├── Platform behavior patterns
├── Common failure modes
├── Successful prompt patterns
└── Emerging techniques
```

---

## User Journeys

### Journey 1: Quick Generation

```
User: /video coffee pour morning light

System: [Analyzes, detects: product shot, beverage, warm mood]

Output (in 30 seconds):
├── Creative strategy (2 sentences)
├── Sora prompt (optimized for liquid physics)
├── VEO prompt (alternate)
├── 3 Midjourney prompts (hero, detail, steam)
└── Execution notes
```

### Journey 2: Full Campaign

```
User: /create Complete launch campaign for new EV, targeting millennials,
      emphasizing sustainability and performance, 2-week runway

System: [Full analysis, multi-agent processing]

Output (in 5 minutes):
├── Campaign strategy document
├── 3 creative concepts with rationale
├── Hero video (Sora, 20s)
├── 6 social cuts (VEO, 8s each)
├── 15 static images (various platforms)
├── Storyboard for production shoot
├── Audio/music direction
├── Influencer brief
├── Platform-specific posting guide
└── Performance prediction
```

### Journey 3: Iteration Loop

```
User: /refine The car reveal felt too slow, need more energy

System: [Loads context, identifies specific shots]

Output:
├── Updated shots with faster pacing
├── Comparison: before/after timing
├── Alternative approaches offered
└── Learning logged for future EV content
```

---

## Technical Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MDS CONTENT CREATION OS                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                        ORCHESTRATION LAYER                            │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │
│  │  │   Intent    │  │   Router    │  │  Dependency │  │   State     │  │   │
│  │  │   Parser    │  │   Engine    │  │   Manager   │  │   Manager   │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                         AGENT LAYER                                   │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │
│  │  │  Creative   │  │   Cinema-   │  │  Narrative  │  │ Production  │  │   │
│  │  │ Strategist  │  │  tographer  │  │  Architect  │  │  Designer   │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │
│  │  │  Platform   │  │   Audio     │  │   Quality   │  │  Learning   │  │   │
│  │  │  Optimizer  │  │  Designer   │  │  Validator  │  │   Engine    │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                        KNOWLEDGE LAYER                                │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │
│  │  │   Visual    │  │     AI      │  │  Platform   │  │   Learned   │  │   │
│  │  │  Language   │  │  Forensics  │  │    Specs    │  │   Patterns  │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                         OUTPUT LAYER                                  │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │
│  │  │   Video     │  │   Image     │  │   Audio     │  │  Document   │  │   │
│  │  │  Generator  │  │  Generator  │  │  Generator  │  │  Generator  │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Success Metrics

| Metric | Current State | Target | How We Measure |
|--------|---------------|--------|----------------|
| Brief to output time | Manual (30+ min) | < 2 min | System timer |
| Revision cycles | 3-5 average | < 1.5 | User feedback |
| Platform optimization | Manual | 100% auto | Spec compliance check |
| Output quality | Varies | 8.5+ / 10 | User rating |
| Learning rate | None | +5% weekly | Success rate delta |

---

## Roadmap

### Phase 1: Core Engine (Week 1-2)
- [ ] Orchestration layer
- [ ] 4 core agents (Strategy, Cinema, Platform, Output)
- [ ] Knowledge base integration
- [ ] Basic command interface

### Phase 2: Intelligence (Week 3-4)
- [ ] Multi-strategy generation
- [ ] Deep cinematographer intelligence
- [ ] Platform-native optimization
- [ ] Quality validation

### Phase 3: Learning (Week 5-6)
- [ ] Feedback loop implementation
- [ ] Pattern recognition
- [ ] Knowledge base self-update
- [ ] Performance tracking

### Phase 4: Scale (Week 7-8)
- [ ] Multi-modal chain generation
- [ ] Campaign package generation
- [ ] Context persistence
- [ ] API integration ready

---

## Appendix: What Makes This Different

| Traditional Approach | MDS Content OS |
|---------------------|----------------|
| Single prompt | Multi-agent pipeline |
| Template filling | Creative problem-solving |
| Platform-agnostic | Platform-native |
| Stateless | Context-aware |
| Manual iteration | Self-improving |
| One output | Production package |
| Human QA | Automated validation |
| Static knowledge | Learning system |

---

*"We're not building a prompt generator. We're building an autonomous creative department."*
