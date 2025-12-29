# MDS Content Creation Operating System

## The Vision

This is not a prompt generator. This is an **AI Creative Director** that:
- **THINKS** like a cinematographer (visual language, shot grammar, emotional beats)
- **DESIGNS** like a director (narrative structure, pacing, dramatic tension)
- **CREATES** like a production house (platform-optimized, format-aware, deployment-ready)

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MDS CONTENT CREATION OPERATING SYSTEM                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                      CREATIVE INTAKE LAYER                          │    │
│  │  Brief Parser → Brand Context → Platform Detector → Format Classifier│    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    CREATIVE DIRECTOR BRAIN                          │    │
│  │  Cinematographer Intelligence │ Narrative Architect                 │    │
│  │  Production Designer          │ Platform Optimizer                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                      OUTPUT GENERATION LAYER                        │    │
│  │  Video Prompts │ Image Prompts │ Audio Design │ Storyboards         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Supported Platforms

### Video Generation
| Platform | Duration | Format |
|----------|----------|--------|
| **Sora 2 Pro** | 5-20s | Prose-first (150-250 words/shot) |
| **VEO 3.1** | 8s max | JSON Priority Cascade |
| **Runway Gen-3** | 5-10s | Concise prose + motion |
| **Kling AI 1.6** | 5-10s | Subject-focused |

### Image Generation
| Platform | Strengths | Format |
|----------|-----------|--------|
| **Midjourney V6.1** | Artistic, composition | Prose + parameters |
| **DALL-E 3** | Instruction following | Precise instructions |
| **Flux Pro** | Photorealism | Technical precision |
| **Ideogram 2.0** | Text/logos | Text-optimized |

---

## Command Interface

| Command | Action |
|---------|--------|
| `/create [brief]` | Full creative process → multi-platform output |
| `/video [brief]` | Video-optimized output (auto-select Sora/VEO) |
| `/sora [brief]` | Sora 2 Pro format specifically |
| `/veo [brief]` | VEO 3.1 JSON format specifically |
| `/image [brief]` | Image prompt (auto-select MJ/DALL-E) |
| `/mj [brief]` | Midjourney format specifically |
| `/storyboard [brief]` | Full storyboard with shot breakdowns |
| `/adapt [platform]` | Convert existing output to new platform |
| `/refine [feedback]` | Iterate on previous generation |

---

## File Structure

```
mds-content-os/
├── module.yaml                     # System configuration
├── README.md                       # This file
├── GOOGLE-AI-STUDIO-IMPLEMENTATION.md
│
├── agents/
│   └── creative-director.md        # Main Creative Director prompt
│
├── config/
│   ├── agents.yaml                 # Agent definitions (CrewAI-compatible)
│   ├── tasks.yaml                  # Task workflows
│   ├── tools.yaml                  # Tool specifications
│   └── commands.yaml               # Command interface
│
├── knowledge/
│   ├── visual-language-reference.md    # Cinematography reference
│   ├── ai-forensics-database.md        # AI limitations & solutions
│   └── platform-specifications.md      # Platform specs
│
└── workflows/
    ├── create-content.yaml         # Full creative pipeline
    ├── video-only.yaml             # Video-focused workflow
    ├── image-only.yaml             # Image-focused workflow
    └── storyboard.yaml             # Storyboard workflow
```

---

## Quick Start

### For Google AI Studio

1. Upload all files from `knowledge/` folder
2. Upload `agents/creative-director.md`
3. Copy system prompt from `GOOGLE-AI-STUDIO-IMPLEMENTATION.md`
4. Set temperature to 0.7-0.9
5. Start with `/create [your brief]`

### For CrewAI / Agent Framework

1. Use `config/agents.yaml` for agent definitions
2. Use `config/tasks.yaml` for task workflows
3. Use `config/tools.yaml` for tool specifications
4. Orchestrate with `workflows/create-content.yaml`

---

## The Golden Rules

1. **Describe APPEARANCE, not PHYSICS** - "crystalline shards" not "viscosity 1.2 cP"
2. **Simple hand poses ONLY** - Avoid complex finger articulation
3. **Reflections stay VAGUE** - No specific reflected content
4. **Text/logos in SOFT FOCUS** - Describe feeling, not literal text
5. **Accept IMPERFECTION** - Real cameras have flaws
6. **Physics through POETRY** - Paint what it looks like

---

## Credits

Built on research from:
- CrewAI multi-agent framework patterns
- Microsoft AutoGen conversational agents
- Claude Agents architecture principles
- 7,000+ AI video generation experiments

---

*"Every frame tells a story. Every shot has purpose. Every detail earns its place."*
