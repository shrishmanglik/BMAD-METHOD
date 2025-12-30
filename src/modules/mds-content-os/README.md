# MDS CONTENT CREATION OS v2.0

## An Autonomous AI Creative Production System

This is **not** a prompt template library.
This is **not** a configuration system.
This is a **complete AI creative production studio**.

---

## What It Does

```
INPUT: "Create a luxury watch commercial"

OUTPUT:
├── Creative strategy with 3 distinct concepts
├── Recommended approach with rationale
├── Sora 2 Pro prompt (20s hero video)
├── VEO 3.1 prompts (5 social cuts)
├── Midjourney prompts (hero, lifestyle, detail shots)
├── Audio direction (music, sound design)
├── Storyboard with shot-by-shot breakdown
└── Production notes for execution
```

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MDS CONTENT CREATION OS v2.0                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ORCHESTRATOR ─────► Routes all operations intelligently                     │
│       │                                                                      │
│       ├──► CREATIVE STRATEGIST ───► Multi-concept development               │
│       │                                                                      │
│       ├──► CINEMATOGRAPHER ───────► Emotional shot design                   │
│       │                                                                      │
│       ├──► NARRATIVE ARCHITECT ───► Arc engineering                         │
│       │                                                                      │
│       ├──► PRODUCTION DESIGNER ───► World building                          │
│       │                                                                      │
│       ├──► PLATFORM OPTIMIZER ────► Native outputs                          │
│       │    ├── Sora 2 Pro (prose-first)                                     │
│       │    ├── VEO 3.1 (JSON cascade)                                       │
│       │    ├── Midjourney (prose + params)                                  │
│       │    └── Runway, Flux, DALL-E, etc.                                   │
│       │                                                                      │
│       ├──► QUALITY VALIDATOR ─────► AI failure prevention                   │
│       │                                                                      │
│       └──► LEARNING ENGINE ───────► Self-improvement                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Quick Start

### Google AI Studio Setup

1. Create new project in [Google AI Studio](https://aistudio.google.com)
2. Upload: `system/MASTER-SYSTEM-PROMPT.md` as System Instruction
3. Upload knowledge files from `/knowledge/`
4. Set temperature: 0.8, max tokens: 8192
5. Type `/status` to verify

See `GOOGLE-AI-STUDIO-SETUP.md` for detailed instructions.

---

## Commands

| Command | Description |
|---------|-------------|
| `/create [brief]` | Full creative process, multi-platform output |
| `/video [brief]` | Video-optimized, auto-selects platform |
| `/image [brief]` | Image-optimized, auto-selects platform |
| `/quick [brief]` | Fast single output |
| `/campaign [brief]` | Full production package |
| `/sora [brief]` | Sora 2 Pro format specifically |
| `/veo [brief]` | VEO 3.1 JSON format |
| `/mj [brief]` | Midjourney with parameters |
| `/adapt [platform]` | Convert to new platform |
| `/refine [feedback]` | Iterate on previous output |
| `/status` | System status |

---

## File Structure

```
mds-content-os/
├── README.md                          # This file
├── GOOGLE-AI-STUDIO-SETUP.md          # Setup guide
│
├── system/
│   └── MASTER-SYSTEM-PROMPT.md        # Complete system prompt
│
├── knowledge/
│   ├── visual-language-reference.md   # Cinematography knowledge
│   ├── ai-forensics-database.md       # AI failure prevention
│   └── platform-specifications.md     # Platform-specific formats
│
├── docs/
│   ├── PRD-v2.md                      # Product requirements
│   ├── WORKFLOW-ARCHITECTURE.md       # System flow diagrams
│   └── FEATURE-SPECIFICATIONS.md      # Feature details
│
├── config/                            # CrewAI-compatible configs
│   ├── agents.yaml
│   ├── tasks.yaml
│   ├── tools.yaml
│   └── commands.yaml
│
└── workflows/                         # Workflow definitions
    ├── create-content.yaml
    ├── video-only.yaml
    ├── image-only.yaml
    └── storyboard.yaml
```

---

## Key Features

### 1. Intelligent Orchestration
System automatically determines the right processing path based on your input.

### 2. Multi-Concept Strategy
Generates genuinely different creative approaches, not variations.

### 3. Deep Cinematography
Every shot has emotional purpose, not just technical specs.

### 4. AI Failure Prevention
Built-in knowledge of what AI generators can't do well.

### 5. Platform-Native Output
Prompts designed FOR each platform, not converted.

### 6. Self-Improvement
System learns from every generation.

---

## The Difference

| Traditional Approach | MDS Content OS |
|---------------------|----------------|
| "Write me a prompt" | Autonomous creative production |
| Template filling | Strategic problem-solving |
| Single output | Complete production package |
| Platform-agnostic | Platform-native |
| Manual iteration | Self-improving |
| Physics specifications | Visual poetry |
| Shot lists | Emotional cinematography |

---

## Documentation

- **PRD-v2.md** — Full product requirements and vision
- **WORKFLOW-ARCHITECTURE.md** — System flow and agent communication
- **FEATURE-SPECIFICATIONS.md** — Detailed feature specs
- **GOOGLE-AI-STUDIO-SETUP.md** — Implementation guide

---

## Philosophy

> "Every frame tells a story. Every shot has purpose. Every detail earns its place."

We're not generating prompts. We're creating cinema.

---

## Version History

- **v2.0** — Complete system rewrite with autonomous agents, PRD, workflow architecture
- **v1.0** — Initial configuration-based system
