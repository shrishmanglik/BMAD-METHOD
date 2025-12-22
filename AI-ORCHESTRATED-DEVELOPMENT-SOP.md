# AI-Orchestrated Development System
## Standard Operating Procedure (SOP) v2.0

**Version:** 2.0
**Last Updated:** December 2024
**Classification:** Operational Framework
**Applicable To:** Solo developers, teams, consultants, agencies

---

## Quick Start (5-Minute Overview)

### The Core Loop

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   IDEA → CLAUDE → AI STUDIO → GITHUB → CLAUDE CODE → REFINE → SHIP │
│            │          │          │           │            │         │
│         Strategy    Build     Version     Analyze      Iterate      │
│         & Design    App       Control     & Test       Loop         │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 60-Second Summary

| Step | Tool | Action | Time |
|------|------|--------|------|
| 1 | **Claude** | Generate PRD, architecture, prompts as artifacts | 2-4 hrs |
| 2 | **Google AI Studio** | Execute prompts, build application | 4-8 hrs |
| 3 | **GitHub** | Push code, create version | 15 min |
| 4 | **Claude Code** | Analyze, test, generate refinement prompts | 1-2 hrs |
| 5 | **Loop** | Return to Step 2 with refinements until done | Repeat |

### First Project Checklist

```
□ Create accounts: Claude Pro, Google AI Studio, GitHub
□ Install Claude Code CLI
□ Create project folder with structure (see Section 3.3)
□ Start with Phase 1: Open Claude, describe your project
□ Follow the phases sequentially
```

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Architecture](#2-system-architecture)
3. [Prerequisites & Setup](#3-prerequisites--setup)
4. [Phase 1: Strategy & Design](#4-phase-1-strategy--design)
5. [Phase 2: Development](#5-phase-2-development)
6. [Phase 3: Version Control](#6-phase-3-version-control)
7. [Phase 4: Testing & Refinement](#7-phase-4-testing--refinement)
8. [Phase 5: Iteration & Release](#8-phase-5-iteration--release)
9. [Metrics & Success Measurement](#9-metrics--success-measurement)
10. [Cost Management](#10-cost-management)
11. [Team Collaboration](#11-team-collaboration)
12. [Security & Compliance](#12-security--compliance)
13. [Tool Alternatives & Integrations](#13-tool-alternatives--integrations)
14. [Templates Library](#14-templates-library)
15. [Troubleshooting](#15-troubleshooting)
16. [Case Studies](#16-case-studies)
17. [Appendices](#17-appendices)

---

## 1. Executive Summary

### 1.1 What This System Does

This SOP defines a **repeatable, scalable process** for building software applications using AI systems as collaborative development partners. It orchestrates multiple AI tools in a feedback loop that continuously improves output quality.

### 1.2 Core Innovation

```
TRADITIONAL DEVELOPMENT          AI-ORCHESTRATED DEVELOPMENT
────────────────────────         ───────────────────────────
Human writes all code      →     AI generates code from specs
Manual testing             →     AI analyzes and tests
Human debugs               →     AI identifies and suggests fixes
Slow iteration             →     Rapid iteration loops
High cost                  →     10x cost reduction
```

### 1.3 System Flow Diagram

```
                    ╔═══════════════════════════════════════════════════════════╗
                    ║           AI-ORCHESTRATED DEVELOPMENT SYSTEM               ║
                    ╠═══════════════════════════════════════════════════════════╣
                    ║                                                            ║
                    ║    [BUSINESS IDEA / REQUIREMENTS]                          ║
                    ║                    │                                       ║
                    ║                    ▼                                       ║
                    ║    ┌─────────────────────────────┐                        ║
                    ║    │      PHASE 1: CLAUDE        │                        ║
                    ║    │      ─────────────────      │                        ║
                    ║    │  • PRD Document             │                        ║
                    ║    │  • System Architecture      │                        ║
                    ║    │  • Development Prompts      │◀──────────┐            ║
                    ║    │  • Context Documents        │           │            ║
                    ║    └──────────────┬──────────────┘           │            ║
                    ║                   │                          │            ║
                    ║          Download Artifacts                  │            ║
                    ║                   │                          │            ║
                    ║                   ▼                          │            ║
                    ║    ┌─────────────────────────────┐           │            ║
                    ║    │  PHASE 2: GOOGLE AI STUDIO  │           │            ║
                    ║    │  ─────────────────────────  │           │            ║
                    ║    │  • Upload Context           │           │  MAJOR     ║
                    ║    │  • Execute Prompts          │           │  CHANGES   ║
                    ║    │  • Generate Application     │◀────┐     │            ║
                    ║    │  • Export Code              │     │     │            ║
                    ║    └──────────────┬──────────────┘     │     │            ║
                    ║                   │                    │     │            ║
                    ║             Export Code                │     │            ║
                    ║                   │                    │     │            ║
                    ║                   ▼                    │     │            ║
                    ║    ┌─────────────────────────────┐     │     │            ║
                    ║    │     PHASE 3: GITHUB         │     │     │            ║
                    ║    │     ────────────────        │     │     │            ║
                    ║    │  • Commit Code              │     │     │            ║
                    ║    │  • Tag Version              │     │     │            ║
                    ║    │  • Branch Management        │     │     │            ║
                    ║    └──────────────┬──────────────┘     │     │            ║
                    ║                   │                    │     │            ║
                    ║            Access Repo                 │     │            ║
                    ║                   │                    │     │            ║
                    ║                   ▼                    │     │            ║
                    ║    ┌─────────────────────────────┐     │     │            ║
                    ║    │   PHASE 4: CLAUDE CODE      │     │     │            ║
                    ║    │   ─────────────────────     │     │     │            ║
                    ║    │  • Analyze Codebase         │     │     │            ║
                    ║    │  • Run Tests                │     │     │            ║
                    ║    │  • Identify Issues          │     │     │            ║
                    ║    │  • Generate Fix Prompts     │     │     │            ║
                    ║    └──────────────┬──────────────┘     │     │            ║
                    ║                   │                    │     │            ║
                    ║                   ▼                    │     │            ║
                    ║    ┌─────────────────────────────┐     │     │            ║
                    ║    │   PHASE 5: DECISION         │     │     │            ║
                    ║    │   ─────────────────         │     │     │            ║
                    ║    │                             │     │     │            ║
                    ║    │   Quality Acceptable?       │     │     │            ║
                    ║    │                             │     │     │            ║
                    ║    │    NO           YES         │     │     │            ║
                    ║    │     │            │          │     │     │            ║
                    ║    │     │            ▼          │     │     │            ║
                    ║    │     │      [RELEASE]        │     │     │            ║
                    ║    │     │                       │     │     │            ║
                    ║    │     ▼                       │     │     │            ║
                    ║    │  Minor Fix?                 │     │     │            ║
                    ║    │   YES    NO                 │     │     │            ║
                    ║    │    │      │                 │     │     │            ║
                    ║    └────┼──────┼─────────────────┘     │     │            ║
                    ║         │      │                       │     │            ║
                    ║         │      └───────────────────────┼─────┘            ║
                    ║         │      (Major: Back to Claude) │                  ║
                    ║         │                              │                  ║
                    ║         └──────────────────────────────┘                  ║
                    ║         (Minor: Back to AI Studio)                        ║
                    ║                                                            ║
                    ╚════════════════════════════════════════════════════════════╝
```

### 1.4 Key Benefits

| Benefit | Impact | How |
|---------|--------|-----|
| **Speed** | 10x faster | AI generates code in minutes vs hours |
| **Cost** | 80% reduction | Less human developer time needed |
| **Quality** | Consistent | Systematic testing and refinement |
| **Documentation** | Auto-generated | Every artifact is captured |
| **Scalability** | Unlimited | Same process works for any project |
| **Learning** | Continuous | Each iteration improves the system |

### 1.5 When to Use This System

**Ideal For:**
- MVP development
- Prototype creation
- Internal tools
- SaaS applications
- Automation systems
- AI-powered applications
- Rapid iteration projects

**Less Suitable For:**
- Mission-critical systems requiring formal verification
- Projects with strict regulatory compliance (without additional review)
- Real-time systems with microsecond requirements
- Projects requiring specific proprietary frameworks

---

## 2. System Architecture

### 2.1 Component Overview

```
┌────────────────────────────────────────────────────────────────────────────┐
│                           SYSTEM COMPONENTS                                 │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ LAYER 1: STRATEGY & PLANNING                                         │   │
│  │ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐               │   │
│  │ │   CLAUDE.AI   │ │   ARTIFACTS   │ │   DOWNLOADS   │               │   │
│  │ │               │ │               │ │               │               │   │
│  │ │ • Conversation│ │ • PRD.md      │ │ • /docs       │               │   │
│  │ │ • Analysis    │ │ • Arch.md     │ │ • /prompts    │               │   │
│  │ │ • Generation  │ │ • Prompts.md  │ │ • /context    │               │   │
│  │ └───────────────┘ └───────────────┘ └───────────────┘               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                      │                                      │
│                                      ▼                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ LAYER 2: DEVELOPMENT & GENERATION                                    │   │
│  │ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐               │   │
│  │ │ GOOGLE AI     │ │   GEMINI      │ │   OUTPUT      │               │   │
│  │ │ STUDIO        │ │   MODEL       │ │               │               │   │
│  │ │               │ │               │ │ • Components  │               │   │
│  │ │ • System Inst.│ │ • 1.5 Pro     │ │ • Pages       │               │   │
│  │ │ • Chat Mode   │ │ • 1.5 Ultra   │ │ • APIs        │               │   │
│  │ │ • File Upload │ │ • 2.0 Flash   │ │ • Configs     │               │   │
│  │ └───────────────┘ └───────────────┘ └───────────────┘               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                      │                                      │
│                                      ▼                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ LAYER 3: VERSION CONTROL & STORAGE                                   │   │
│  │ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐               │   │
│  │ │    GITHUB     │ │   GIT OPS     │ │   BRANCHES    │               │   │
│  │ │               │ │               │ │               │               │   │
│  │ │ • Repository  │ │ • Commits     │ │ • main        │               │   │
│  │ │ • Storage     │ │ • Tags        │ │ • develop     │               │   │
│  │ │ • History     │ │ • PRs         │ │ • feature/*   │               │   │
│  │ └───────────────┘ └───────────────┘ └───────────────┘               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                      │                                      │
│                                      ▼                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ LAYER 4: ANALYSIS & REFINEMENT                                       │   │
│  │ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐               │   │
│  │ │  CLAUDE CODE  │ │   ANALYSIS    │ │   OUTPUT      │               │   │
│  │ │               │ │               │ │               │               │   │
│  │ │ • CLI Access  │ │ • Code Review │ │ • Issues.md   │               │   │
│  │ │ • Repo Read   │ │ • Testing     │ │ • Fixes.md    │               │   │
│  │ │ • Generation  │ │ • Suggestions │ │ • Prompts.md  │               │   │
│  │ └───────────────┘ └───────────────┘ └───────────────┘               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow

```
INPUT                    PROCESSING                      OUTPUT
─────                    ──────────                      ──────

Business Idea     ──►    Claude Analysis          ──►    PRD Document
                                                         Architecture
                                                         Prompts
                                                         Context Docs
                         │
                         ▼
PRD + Prompts     ──►    Google AI Studio         ──►    Application Code
                         (Gemini)                        Components
                                                         Configuration
                         │
                         ▼
Application       ──►    GitHub                   ──►    Versioned Repo
Code                                                     Commit History
                                                         Release Tags
                         │
                         ▼
Repository        ──►    Claude Code              ──►    Analysis Report
                                                         Issue List
                                                         Refinement Prompts
                         │
                         ▼
Refinement        ──►    [Loop to AI Studio       ──►    Improved Code
Prompts                   or Claude]                     (Iteration N+1)
```

### 2.3 Role Matrix

| Role | AI System | Responsibilities | Outputs |
|------|-----------|------------------|---------|
| **Strategist** | Claude | Vision, requirements, architecture | PRD, specs, prompts |
| **Developer** | Google AI Studio | Code generation, implementation | Working code |
| **Librarian** | GitHub | Version control, history | Repository |
| **QA Engineer** | Claude Code | Testing, analysis, refinement | Issues, fixes |
| **Orchestrator** | Human (You) | Decision making, oversight | Direction, approval |

---

## 3. Prerequisites & Setup

### 3.1 Required Accounts & Tools

| Tool | URL | Purpose | Cost | Setup Time |
|------|-----|---------|------|------------|
| **Claude** | claude.ai | Strategy, PRD, prompts | $20/mo (Pro) | 5 min |
| **Google AI Studio** | aistudio.google.com | Code generation | Free | 5 min |
| **GitHub** | github.com | Version control | Free | 10 min |
| **Claude Code** | Anthropic API | Analysis & refinement | ~$0.01-0.10/session | 15 min |
| **Git** | git-scm.com | Local version control | Free | 10 min |
| **VS Code** (optional) | code.visualstudio.com | Code editing | Free | 5 min |

### 3.2 One-Time Setup Checklist

```
INITIAL SETUP (Complete Once)
═════════════════════════════

□ ACCOUNTS
  □ Create Claude account (Pro recommended for artifacts)
  □ Create Google account (if needed)
  □ Access Google AI Studio and create first project
  □ Create GitHub account
  □ Generate GitHub personal access token (Settings → Developer Settings)

□ LOCAL ENVIRONMENT
  □ Install Git (git-scm.com)
  □ Install Claude Code CLI
  □ Configure Git with name and email:
    git config --global user.name "Your Name"
    git config --global user.email "your@email.com"
  □ Set up SSH key for GitHub (optional but recommended)

□ WORKSPACE
  □ Create master projects folder: ~/ai-projects/
  □ Create template folder structure (copy for each project)

□ VERIFICATION
  □ Test Claude artifact download
  □ Test Google AI Studio code generation
  □ Test git push to GitHub
  □ Test Claude Code repository access
```

### 3.3 Project Folder Structure

```
project-name/
│
├── 📁 .github/                    # GitHub specific
│   └── workflows/                 # CI/CD (optional)
│
├── 📁 docs/                       # Documentation
│   ├── prd.md                     # Product Requirements
│   ├── architecture.md            # System Architecture
│   ├── technical-spec.md          # Technical Details
│   └── changelog.md               # Version History
│
├── 📁 prompts/                    # AI Prompts
│   ├── system-prompt.md           # Master prompt for AI Studio
│   ├── feature-prompts/           # Individual feature prompts
│   │   ├── 01-setup.md
│   │   ├── 02-feature-a.md
│   │   └── ...
│   └── refinement-prompts/        # Fix prompts from Claude Code
│       ├── iteration-01.md
│       └── ...
│
├── 📁 context/                    # Context for AI
│   ├── domain-knowledge.md        # Domain info
│   ├── examples.md                # Sample data
│   └── constraints.md             # Limitations
│
├── 📁 artifacts/                  # Claude artifacts archive
│   ├── v1/
│   ├── v2/
│   └── current/
│
├── 📁 iterations/                 # Iteration tracking
│   ├── iteration-01/
│   │   ├── analysis.md
│   │   ├── issues.md
│   │   └── changes.md
│   └── ...
│
├── 📁 src/                        # Application source code
│   └── [generated code here]
│
├── 📁 tests/                      # Test files
│
├── 📄 README.md                   # Project overview
├── 📄 .gitignore                  # Git ignore rules
└── 📄 package.json                # Dependencies (if applicable)
```

### 3.4 Quick Setup Script

```bash
#!/bin/bash
# Run: chmod +x setup.sh && ./setup.sh project-name

PROJECT_NAME=$1

if [ -z "$PROJECT_NAME" ]; then
    echo "Usage: ./setup.sh project-name"
    exit 1
fi

mkdir -p $PROJECT_NAME/{docs,prompts/{feature-prompts,refinement-prompts},context,artifacts/{v1,current},iterations,src,tests,.github/workflows}

cat > $PROJECT_NAME/README.md << 'EOF'
# Project Name

## Overview
[Project description]

## Setup
[Setup instructions]

## Development
Built using AI-Orchestrated Development System.
EOF

cat > $PROJECT_NAME/.gitignore << 'EOF'
node_modules/
.env
.DS_Store
*.log
dist/
build/
.next/
EOF

echo "✓ Project structure created at ./$PROJECT_NAME"
```

---

## 4. Phase 1: Strategy & Design

### 4.1 Phase Summary

| Aspect | Details |
|--------|---------|
| **Tool** | Claude (claude.ai) with Artifacts |
| **Duration** | 2-8 hours |
| **Input** | Business idea, requirements |
| **Output** | PRD, architecture, prompts, context docs |
| **Success Criteria** | Complete documentation ready for development |

### 4.2 Step-by-Step Process

#### Step 1.1: Project Initialization

```
┌─────────────────────────────────────────────────────────────────┐
│ ACTION: Start new Claude conversation                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ PROMPT:                                                          │
│ ───────                                                          │
│ I'm starting a new software project and need your help as a     │
│ strategic partner. Here's what I want to build:                 │
│                                                                  │
│ **Project:** [NAME]                                              │
│ **Problem:** [What problem does it solve?]                       │
│ **Users:** [Who will use it?]                                    │
│ **Core Features:**                                               │
│ 1. [Feature 1]                                                   │
│ 2. [Feature 2]                                                   │
│ 3. [Feature 3]                                                   │
│                                                                  │
│ **Technical Preferences:**                                       │
│ - Platform: [Web/Mobile/Desktop]                                 │
│ - Tech stack: [Any preferences or "recommend"]                   │
│ - Constraints: [Budget, time, hosting, etc.]                     │
│                                                                  │
│ Let's start by creating a comprehensive PRD (Product             │
│ Requirements Document). Generate it as a downloadable artifact.  │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│ EXPECTED OUTPUT:                                                 │
│ • Claude asks clarifying questions OR                            │
│ • Generates PRD artifact directly                                │
│ • Artifact icon appears - downloadable as .md                    │
└─────────────────────────────────────────────────────────────────┘
```

#### Step 1.2: PRD Generation

```
┌─────────────────────────────────────────────────────────────────┐
│ IF CLAUDE ASKS QUESTIONS: Answer them, then request:            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ PROMPT:                                                          │
│ ───────                                                          │
│ Based on our discussion, create a comprehensive PRD with:        │
│                                                                  │
│ 1. Executive Summary                                             │
│ 2. Problem Statement & Opportunity                               │
│ 3. Target Users & Personas                                       │
│ 4. User Stories (prioritized)                                    │
│ 5. Functional Requirements                                       │
│ 6. Non-Functional Requirements                                   │
│ 7. Success Metrics & KPIs                                        │
│ 8. Out of Scope (explicit exclusions)                           │
│ 9. Assumptions & Dependencies                                    │
│ 10. Risks & Mitigations                                          │
│                                                                  │
│ Generate as a downloadable artifact named "prd.md"               │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│ QUALITY CHECK:                                                   │
│ □ All sections present                                           │
│ □ User stories are specific and testable                        │
│ □ Requirements are unambiguous                                   │
│ □ Success metrics are measurable                                │
│ □ No contradictions                                              │
└─────────────────────────────────────────────────────────────────┘
```

#### Step 1.3: Architecture Design

```
┌─────────────────────────────────────────────────────────────────┐
│ ACTION: Request system architecture                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ PROMPT:                                                          │
│ ───────                                                          │
│ Now design the system architecture for this project.             │
│                                                                  │
│ Include:                                                         │
│ 1. High-level architecture diagram (ASCII or Mermaid)           │
│ 2. Component breakdown with responsibilities                    │
│ 3. Data model / database schema                                 │
│ 4. API endpoints (if applicable)                                │
│ 5. Technology stack with justification                          │
│ 6. Third-party integrations                                     │
│ 7. Security considerations                                       │
│ 8. Scalability approach                                          │
│ 9. File/folder structure                                         │
│                                                                  │
│ Generate as artifact "architecture.md"                           │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│ QUALITY CHECK:                                                   │
│ □ Architecture supports all PRD requirements                    │
│ □ Tech stack is appropriate for project                         │
│ □ Data model covers all entities                                │
│ □ APIs cover all functionality                                   │
│ □ Security is addressed                                          │
└─────────────────────────────────────────────────────────────────┘
```

#### Step 1.4: System Prompt for AI Studio

```
┌─────────────────────────────────────────────────────────────────┐
│ ACTION: Generate master development prompt                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ PROMPT:                                                          │
│ ───────                                                          │
│ Create a comprehensive system prompt that I'll use in           │
│ Google AI Studio (Gemini) to build this application.            │
│                                                                  │
│ The system prompt must:                                          │
│ 1. Define AI's role as senior developer                         │
│ 2. Include full project context from PRD                        │
│ 3. Specify the exact tech stack to use                          │
│ 4. Define coding standards and patterns                         │
│ 5. Specify output format (complete code, file paths)            │
│ 6. Include error handling requirements                           │
│ 7. Define component structure                                    │
│ 8. Include the data model                                        │
│                                                                  │
│ Make it 2000-4000 words. This will be the "brain" that          │
│ guides all code generation.                                      │
│                                                                  │
│ Generate as artifact "system-prompt.md"                          │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│ QUALITY CHECK:                                                   │
│ □ Prompt is self-contained (no external references needed)      │
│ □ Tech stack is explicitly specified                            │
│ □ Coding patterns are defined                                    │
│ □ Output format is clear                                         │
│ □ Length is 2000+ words                                          │
└─────────────────────────────────────────────────────────────────┘
```

#### Step 1.5: Feature Prompts

```
┌─────────────────────────────────────────────────────────────────┐
│ ACTION: Generate sequential feature prompts                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ PROMPT:                                                          │
│ ───────                                                          │
│ Create a series of prompts I'll execute sequentially in         │
│ Google AI Studio to build each feature.                         │
│                                                                  │
│ For each feature, format as:                                     │
│                                                                  │
│ ## Feature [N]: [Name]                                           │
│ **Prerequisites:** [What must exist first]                      │
│ **Estimated complexity:** [Low/Medium/High]                     │
│                                                                  │
│ ### Prompt                                                       │
│ ```                                                              │
│ [Exact prompt to paste into AI Studio]                          │
│ ```                                                              │
│                                                                  │
│ ### Expected Output                                              │
│ - [Files to be generated]                                        │
│ - [Functionality to verify]                                      │
│                                                                  │
│ ### Validation Steps                                             │
│ 1. [How to test this works]                                     │
│                                                                  │
│ ---                                                              │
│                                                                  │
│ Generate prompts for ALL features in the PRD.                   │
│ Artifact name: "feature-prompts.md"                              │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│ QUALITY CHECK:                                                   │
│ □ All PRD features have prompts                                 │
│ □ Correct sequence (dependencies respected)                     │
│ □ Each prompt is self-contained                                  │
│ □ Validation steps are specific                                  │
│ □ No circular dependencies                                       │
└─────────────────────────────────────────────────────────────────┘
```

#### Step 1.6: Context Documents

```
┌─────────────────────────────────────────────────────────────────┐
│ ACTION: Generate supporting context                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ PROMPT:                                                          │
│ ───────                                                          │
│ Create three context documents for upload to AI Studio:         │
│                                                                  │
│ 1. **domain-knowledge.md**                                       │
│    - Industry terminology                                        │
│    - Business rules                                              │
│    - Domain constraints                                          │
│    - User expectations                                           │
│                                                                  │
│ 2. **examples.md**                                               │
│    - Sample user inputs                                          │
│    - Expected outputs                                            │
│    - Edge cases                                                  │
│    - Error scenarios                                             │
│                                                                  │
│ 3. **constraints.md**                                            │
│    - Performance requirements                                    │
│    - Browser/device support                                      │
│    - Accessibility requirements                                  │
│    - Security requirements                                       │
│                                                                  │
│ Generate each as separate artifacts.                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Artifact Management

```
DOWNLOAD & ORGANIZE WORKFLOW
════════════════════════════

1. DOWNLOAD each artifact from Claude:
   • Click download icon on artifact
   • Save to: /project-name/artifacts/current/

2. RENAME files consistently:
   • prd-v1.md
   • architecture-v1.md
   • system-prompt-v1.md
   • feature-prompts-v1.md
   • domain-knowledge-v1.md
   • examples-v1.md
   • constraints-v1.md

3. COPY active files to working directories:
   • PRD, architecture → /docs/
   • system-prompt, feature-prompts → /prompts/
   • domain, examples, constraints → /context/

4. COMMIT to git:
   git add .
   git commit -m "docs: add Phase 1 artifacts - PRD, architecture, prompts"
```

### 4.4 Phase 1 Completion Checklist

```
PHASE 1 COMPLETE WHEN:
══════════════════════

□ PRD document generated and reviewed
  □ All features defined
  □ User stories written
  □ Success metrics established

□ Architecture document generated and reviewed
  □ Tech stack decided
  □ Data model defined
  □ APIs designed

□ System prompt generated
  □ 2000+ words
  □ Complete context included
  □ Coding standards defined

□ Feature prompts generated
  □ All features covered
  □ Correct sequence
  □ Validation steps included

□ Context documents generated
  □ Domain knowledge
  □ Examples
  □ Constraints

□ All artifacts downloaded and organized

□ Initial git commit made

─────────────────────────────────
READY FOR PHASE 2: DEVELOPMENT
─────────────────────────────────
```

---

## 5. Phase 2: Development

### 5.1 Phase Summary

| Aspect | Details |
|--------|---------|
| **Tool** | Google AI Studio (aistudio.google.com) |
| **Duration** | 4-40 hours (depends on complexity) |
| **Input** | System prompt, feature prompts, context docs |
| **Output** | Complete application code |
| **Success Criteria** | All features implemented, code organized |

### 5.2 AI Studio Configuration

```
┌─────────────────────────────────────────────────────────────────┐
│ GOOGLE AI STUDIO SETUP                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ 1. CREATE NEW CHAT                                               │
│    • Go to aistudio.google.com                                   │
│    • Click "Create New" → "Chat Prompt"                          │
│    • Name: "[Project Name] - Development"                        │
│                                                                  │
│ 2. SELECT MODEL                                                  │
│    Recommended: Gemini 1.5 Pro                                   │
│    Alternative: Gemini 2.0 Flash (faster, less context)         │
│    High-complexity: Gemini 1.5 Ultra                            │
│                                                                  │
│ 3. CONFIGURE SETTINGS                                            │
│    ┌─────────────────────────────────────────┐                  │
│    │ Setting              │ Value            │                  │
│    ├─────────────────────────────────────────┤                  │
│    │ Temperature          │ 0.4-0.7          │                  │
│    │ Max Output Tokens    │ 8192 (maximum)   │                  │
│    │ Top-p                │ 0.95             │                  │
│    │ Top-k                │ 40               │                  │
│    │ Safety Settings      │ Adjust as needed │                  │
│    └─────────────────────────────────────────┘                  │
│                                                                  │
│ 4. ADD SYSTEM INSTRUCTIONS                                       │
│    • Click "System Instructions"                                 │
│    • Paste ENTIRE content of system-prompt.md                   │
│    • Verify no truncation                                        │
│                                                                  │
│ 5. UPLOAD CONTEXT FILES (Optional)                              │
│    • Click file upload / attachment                             │
│    • Upload: domain-knowledge.md, examples.md, constraints.md   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Feature Development Workflow

```
FOR EACH FEATURE IN feature-prompts.md:
═══════════════════════════════════════

┌─────────────────────────────────────────────────────────────────┐
│ STEP 1: VERIFY PREREQUISITES                                    │
├─────────────────────────────────────────────────────────────────┤
│ □ Check prerequisites listed for this feature                  │
│ □ Confirm previous features are complete                       │
│ □ Have necessary context ready                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 2: EXECUTE PROMPT                                          │
├─────────────────────────────────────────────────────────────────┤
│ • Copy prompt from feature-prompts.md                           │
│ • Paste into AI Studio chat                                     │
│ • Submit and wait for response                                  │
│ • If output cuts off: "Continue generating from where you left" │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 3: REVIEW OUTPUT                                           │
├─────────────────────────────────────────────────────────────────┤
│ □ Code is complete (no TODO, no placeholders)                  │
│ □ All imports included                                          │
│ □ File paths specified                                          │
│ □ Logic appears correct                                         │
│ □ Matches expected output from prompt                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 4: ITERATE IF NEEDED                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ IF incomplete:                                                   │
│   "Continue generating the [component]. You stopped at [X]"     │
│                                                                  │
│ IF errors:                                                       │
│   "Fix these issues in the code:                                │
│    1. [Issue 1]                                                  │
│    2. [Issue 2]                                                  │
│    Regenerate the complete [file/component]."                   │
│                                                                  │
│ IF needs modification:                                           │
│   "Modify the [component] to [specific change].                 │
│    Keep everything else the same. Show complete code."          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 5: SAVE OUTPUT                                             │
├─────────────────────────────────────────────────────────────────┤
│ • Copy generated code                                            │
│ • Create file at specified path in /src/                        │
│ • Verify file saved correctly                                    │
│ • Run validation steps from prompt                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 6: DOCUMENT & CONTINUE                                     │
├─────────────────────────────────────────────────────────────────┤
│ • Mark feature complete in tracking                             │
│ • Note any deviations from spec                                 │
│ • Proceed to next feature                                        │
└─────────────────────────────────────────────────────────────────┘
```

### 5.4 Common AI Studio Commands

```
USEFUL PROMPTS FOR AI STUDIO
════════════════════════════

Continue Generation:
  "Continue from where you stopped."
  "Continue generating the [component name]."

Fix Specific Issue:
  "The [component] has this error: [error message].
   Fix it and show the complete corrected code."

Regenerate Component:
  "Regenerate the [component] with these changes:
   - [Change 1]
   - [Change 2]
   Show complete code."

Add Feature to Existing:
  "Add [feature] to the existing [component].
   Keep all existing functionality. Show complete updated code."

Generate Tests:
  "Generate unit tests for [component].
   Cover: [test cases]. Use [testing framework]."

Refactor:
  "Refactor [component] to:
   - [Improvement 1]
   - [Improvement 2]
   Maintain all existing functionality."

Context Refresh (for long sessions):
  "Here's a summary of what we've built so far:
   - [Component 1]: [description]
   - [Component 2]: [description]
   Now let's build [next feature]."
```

### 5.5 Code Organization

```
ORGANIZING GENERATED CODE
═════════════════════════

1. AS YOU GENERATE, save files to /src/ with correct paths:

   /src/
   ├── components/          # React/Vue components
   │   ├── Header.tsx
   │   ├── Footer.tsx
   │   └── ...
   ├── pages/               # Page components
   ├── api/                 # API routes
   ├── utils/               # Utility functions
   ├── hooks/               # Custom hooks
   ├── types/               # TypeScript types
   ├── styles/              # CSS/styling
   └── config/              # Configuration

2. CREATE dependency files:
   • package.json (Node.js)
   • requirements.txt (Python)
   • etc.

3. ADD configuration files:
   • .env.example
   • tsconfig.json
   • next.config.js
   • etc.

4. WRITE README with setup instructions
```

### 5.6 Phase 2 Completion Checklist

```
PHASE 2 COMPLETE WHEN:
══════════════════════

□ All feature prompts executed
  □ Feature 1 complete
  □ Feature 2 complete
  □ ... (all features)

□ Code organization
  □ All files in correct locations
  □ No duplicate code
  □ Imports resolve correctly

□ Dependencies
  □ package.json complete
  □ All dependencies listed
  □ Versions specified

□ Configuration
  □ Environment variables documented
  □ Config files present
  □ README with setup instructions

□ Quick test
  □ Application runs without errors
  □ Basic functionality works

─────────────────────────────────
READY FOR PHASE 3: VERSION CONTROL
─────────────────────────────────
```

---

## 6. Phase 3: Version Control

### 6.1 Phase Summary

| Aspect | Details |
|--------|---------|
| **Tool** | GitHub + Git |
| **Duration** | 15-30 minutes |
| **Input** | Generated code from Phase 2 |
| **Output** | Versioned repository |
| **Success Criteria** | Code pushed, tagged, accessible |

### 6.2 Repository Setup

```bash
# IF NEW REPOSITORY:
# ==================

# 1. Create on GitHub (via web)
# Go to github.com → New Repository
# Name: project-name
# Private (recommended)
# Don't initialize with README

# 2. Initialize locally
cd /path/to/project-name
git init
git remote add origin https://github.com/USERNAME/project-name.git

# IF REPOSITORY EXISTS:
# ====================
git clone https://github.com/USERNAME/project-name.git
cd project-name
```

### 6.3 Initial Commit & Push

```bash
# Ensure .gitignore is proper
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
venv/
.env

# Build
dist/
build/
.next/
out/

# IDE
.idea/
.vscode/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Test
coverage/
.nyc_output/
EOF

# Stage all files
git add .

# Create initial commit
git commit -m "feat: initial application build from AI Studio

- Implemented core features per PRD
- Built using AI-orchestrated development workflow
- Phase 1 artifacts included in /docs and /prompts

Features:
- [List major features]

Tech stack:
- [List technologies]"

# Push to GitHub
git push -u origin main

# Create version tag
git tag -a v1.0.0 -m "Version 1.0.0 - Initial build"
git push origin v1.0.0
```

### 6.4 Branch Strategy

```
BRANCH STRUCTURE
════════════════

main
 │
 ├── develop                 # Integration branch
 │    │
 │    ├── feature/iter-2-*   # Iteration 2 changes
 │    │
 │    ├── feature/iter-3-*   # Iteration 3 changes
 │    │
 │    └── fix/issue-*        # Bug fixes
 │
 └── release/v1.x            # Release branches


WORKFLOW:
─────────

1. For each iteration:
   git checkout develop
   git checkout -b feature/iter-N-description

2. After changes:
   git add .
   git commit -m "type: description"
   git push origin feature/iter-N-description

3. Merge to develop:
   git checkout develop
   git merge feature/iter-N-description

4. For release:
   git checkout main
   git merge develop
   git tag -a vX.Y.Z -m "Version X.Y.Z"
   git push origin main --tags
```

### 6.5 Phase 3 Completion Checklist

```
PHASE 3 COMPLETE WHEN:
══════════════════════

□ Repository exists on GitHub
□ All code committed
□ .gitignore configured
□ Initial push successful
□ Version tag created (v1.0.0)
□ README visible on GitHub
□ Repository accessible to Claude Code

─────────────────────────────────────
READY FOR PHASE 4: TESTING & REFINEMENT
─────────────────────────────────────
```

---

## 7. Phase 4: Testing & Refinement

### 7.1 Phase Summary

| Aspect | Details |
|--------|---------|
| **Tool** | Claude Code (CLI) |
| **Duration** | 1-4 hours per iteration |
| **Input** | GitHub repository |
| **Output** | Analysis, issues, refinement prompts |
| **Success Criteria** | Comprehensive analysis with actionable prompts |

### 7.2 Claude Code Setup

```bash
# Navigate to project or specify repo
cd /path/to/project-name

# Start Claude Code
claude

# OR with repository URL
claude --repo https://github.com/USERNAME/project-name
```

### 7.3 Analysis Prompts

#### Initial Comprehensive Analysis

```
┌─────────────────────────────────────────────────────────────────┐
│ PROMPT TO CLAUDE CODE:                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Analyze this codebase comprehensively. This is an application  │
│ built using AI-orchestrated development (Google AI Studio).     │
│                                                                  │
│ Please provide:                                                  │
│                                                                  │
│ ## 1. CODEBASE OVERVIEW                                          │
│ - File structure map                                             │
│ - Tech stack identified                                          │
│ - Architecture pattern used                                      │
│                                                                  │
│ ## 2. ISSUES FOUND                                               │
│ Categorize by severity (Critical/High/Medium/Low):              │
│ - Bugs                                                           │
│ - Security vulnerabilities                                       │
│ - Performance issues                                             │
│ - Missing error handling                                         │
│ - Incomplete implementations                                     │
│                                                                  │
│ ## 3. CODE QUALITY ASSESSMENT                                    │
│ - Organization and structure                                     │
│ - Naming conventions                                             │
│ - Code duplication                                               │
│ - Best practices adherence                                       │
│                                                                  │
│ ## 4. MISSING FROM PRD (if /docs/prd.md exists)                 │
│ - Features not implemented                                       │
│ - Partial implementations                                        │
│ - Deviations from spec                                           │
│                                                                  │
│ ## 5. RECOMMENDATIONS                                            │
│ - Priority fixes                                                 │
│ - Improvements                                                   │
│ - Optimizations                                                  │
│                                                                  │
│ Be thorough - this will guide our refinement iteration.         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Generate Refinement Prompts

```
┌─────────────────────────────────────────────────────────────────┐
│ PROMPT TO CLAUDE CODE:                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Based on your analysis, generate refinement prompts I can use   │
│ in Google AI Studio to fix issues and improve the application.  │
│                                                                  │
│ Format EACH issue as:                                            │
│                                                                  │
│ ---                                                              │
│ ## Issue [N]: [Title]                                            │
│ **Severity:** [Critical/High/Medium/Low]                        │
│ **Category:** [Bug/Security/Performance/Quality]                │
│ **File(s):** [path/to/file.ts]                                  │
│                                                                  │
│ ### Problem                                                      │
│ [Clear description of what's wrong]                             │
│                                                                  │
│ ### Current Code                                                 │
│ ```                                                              │
│ [Relevant code snippet]                                          │
│ ```                                                              │
│                                                                  │
│ ### Prompt for Google AI Studio                                  │
│ ```                                                              │
│ [Ready-to-paste prompt that will fix this issue]                │
│ ```                                                              │
│                                                                  │
│ ### Expected Result                                              │
│ [What the fix should accomplish]                                │
│                                                                  │
│ ### Validation                                                   │
│ [How to verify the fix works]                                   │
│ ---                                                              │
│                                                                  │
│ Order by: Critical first, then High, Medium, Low.               │
│ Generate for ALL issues found.                                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 7.4 Save Analysis Results

```
DOCUMENT ITERATION
══════════════════

1. Create iteration folder:
   mkdir -p iterations/iteration-01

2. Save analysis:
   /iterations/iteration-01/
   ├── analysis-report.md       # Full analysis from Claude Code
   ├── issues-list.md           # Just the issues, tabulated
   ├── refinement-prompts.md    # Prompts for AI Studio
   └── iteration-summary.md     # Overview and metrics

3. Update tracking log:
   | Iteration | Date | Issues Found | Critical | High | Med | Low |
   |-----------|------|--------------|----------|------|-----|-----|
   | 1         | DATE | 15           | 2        | 5    | 5   | 3   |
```

### 7.5 Phase 4 Completion Checklist

```
PHASE 4 COMPLETE WHEN:
══════════════════════

□ Claude Code analyzed full codebase
□ Issues documented with severity
□ Refinement prompts generated
□ Prompts are specific and actionable
□ Analysis saved to /iterations/
□ Iteration tracking updated

─────────────────────────────────
READY FOR PHASE 5: ITERATION LOOP
─────────────────────────────────
```

---

## 8. Phase 5: Iteration & Release

### 8.1 Iteration Decision Tree

```
                      ┌─────────────────────────┐
                      │   ANALYZE RESULTS       │
                      │   FROM PHASE 4          │
                      └───────────┬─────────────┘
                                  │
                                  ▼
                      ┌─────────────────────────┐
                      │   ANY CRITICAL ISSUES?  │
                      └───────────┬─────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │ YES                       │ NO
                    ▼                           ▼
        ┌───────────────────┐       ┌───────────────────┐
        │  MUST FIX         │       │  ANY HIGH ISSUES? │
        │  Continue to      │       └─────────┬─────────┘
        │  iteration        │                 │
        └───────────────────┘       ┌─────────┴─────────┐
                                    │ YES               │ NO
                                    ▼                   ▼
                        ┌───────────────────┐  ┌───────────────────┐
                        │  SHOULD FIX       │  │  MEETS QUALITY    │
                        │  Continue to      │  │  TARGETS?         │
                        │  iteration        │  └─────────┬─────────┘
                        └───────────────────┘            │
                                              ┌─────────┴─────────┐
                                              │ YES               │ NO
                                              ▼                   ▼
                                  ┌───────────────────┐  ┌───────────────────┐
                                  │     RELEASE       │  │  OPTIONAL:        │
                                  │     Ready to      │  │  Fix medium/low   │
                                  │     ship!         │  │  OR release       │
                                  └───────────────────┘  └───────────────────┘
```

### 8.2 Iteration Workflow

```
ITERATION LOOP
══════════════

┌─────────────────────────────────────────────────────────────────┐
│ STEP 1: PREPARE                                                 │
├─────────────────────────────────────────────────────────────────┤
│ □ Review refinement prompts from Phase 4                       │
│ □ Prioritize: Critical → High → Medium                         │
│ □ Group related fixes together                                  │
│ □ Create iteration branch:                                      │
│   git checkout -b feature/iter-N-fixes                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 2: EXECUTE IN AI STUDIO                                    │
├─────────────────────────────────────────────────────────────────┤
│ □ Open Google AI Studio                                         │
│ □ Provide current code context if needed                       │
│ □ Execute each refinement prompt                                │
│ □ Save updated code to /src/                                   │
│ □ Verify each fix works                                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 3: COMMIT & PUSH                                           │
├─────────────────────────────────────────────────────────────────┤
│ git add .                                                        │
│ git commit -m "fix: iteration N - [summary]                     │
│                                                                  │
│ Fixed:                                                           │
│ - Issue 1: [description]                                         │
│ - Issue 2: [description]                                         │
│ - Issue 3: [description]"                                        │
│                                                                  │
│ git push origin feature/iter-N-fixes                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 4: RE-ANALYZE                                              │
├─────────────────────────────────────────────────────────────────┤
│ □ Return to Claude Code                                         │
│ □ Analyze updated codebase                                      │
│ □ Verify fixes resolved issues                                  │
│ □ Check for new issues introduced                               │
│ □ Update iteration tracking                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 5: EVALUATE                                                │
├─────────────────────────────────────────────────────────────────┤
│ IF quality targets met:                                         │
│   → Proceed to RELEASE                                          │
│                                                                  │
│ IF more work needed:                                             │
│   → Return to STEP 1 (Iteration N+1)                            │
└─────────────────────────────────────────────────────────────────┘
```

### 8.3 Release Process

```
RELEASE CHECKLIST
═════════════════

□ PRE-RELEASE
  □ All critical issues resolved
  □ All high-priority issues resolved
  □ Tests pass (if applicable)
  □ Documentation updated
  □ README accurate
  □ Environment variables documented

□ RELEASE STEPS
  1. Merge to main:
     git checkout main
     git merge develop

  2. Tag release:
     git tag -a v1.X.X -m "Version 1.X.X - [summary]"

  3. Push:
     git push origin main --tags

  4. Create GitHub Release (optional):
     - Go to Releases on GitHub
     - Create release from tag
     - Add release notes

□ POST-RELEASE
  □ Announce/notify stakeholders
  □ Update project documentation
  □ Archive iteration documents
  □ Retrospective (what went well, what to improve)
```

### 8.4 Iteration Tracking Template

```markdown
# Iteration Tracking Log

## Project: [Name]
## Started: [Date]

### Summary Table

| Iter | Date | Issues Start | Fixed | New | Remaining | Status |
|------|------|--------------|-------|-----|-----------|--------|
| 1    |      | -            | -     | 15  | 15        | ✓      |
| 2    |      | 15           | 10    | 2   | 7         | ✓      |
| 3    |      | 7            | 5     | 1   | 3         | ✓      |
| 4    |      | 3            | 3     | 0   | 0         | RELEASE|

### Iteration 1: Initial Analysis
- **Date:**
- **Focus:** Initial build assessment
- **Issues Found:** 15
  - Critical: 2
  - High: 5
  - Medium: 5
  - Low: 3
- **Notes:**

### Iteration 2: Critical Fixes
- **Date:**
- **Focus:** Fix critical and high issues
- **Issues Fixed:** 10
- **New Issues:** 2 (discovered during fixes)
- **Notes:**

[Continue for each iteration...]
```

---

## 9. Metrics & Success Measurement

### 9.1 Key Performance Indicators

```
PROJECT METRICS
═══════════════

SPEED METRICS:
┌────────────────────────────────────┬─────────────────┬───────────┐
│ Metric                             │ Target          │ Actual    │
├────────────────────────────────────┼─────────────────┼───────────┤
│ Time to first working build        │ < 2 days        │           │
│ Iteration cycle time               │ < 4 hours       │           │
│ Total time to release              │ < 2 weeks       │           │
│ Prompts per feature                │ 1-3             │           │
└────────────────────────────────────┴─────────────────┴───────────┘

QUALITY METRICS:
┌────────────────────────────────────┬─────────────────┬───────────┐
│ Metric                             │ Target          │ Actual    │
├────────────────────────────────────┼─────────────────┼───────────┤
│ Critical issues at build           │ < 5             │           │
│ Iterations to release              │ < 5             │           │
│ Issues fixed per iteration         │ > 50%           │           │
│ New issues per iteration           │ < 20% of fixed  │           │
└────────────────────────────────────┴─────────────────┴───────────┘

EFFICIENCY METRICS:
┌────────────────────────────────────┬─────────────────┬───────────┐
│ Metric                             │ Target          │ Actual    │
├────────────────────────────────────┼─────────────────┼───────────┤
│ % code generated (vs written)      │ > 90%           │           │
│ Manual intervention rate           │ < 10%           │           │
│ Prompt success rate                │ > 80%           │           │
│ Rework rate                        │ < 20%           │           │
└────────────────────────────────────┴─────────────────┴───────────┘
```

### 9.2 Quality Gates

```
QUALITY GATE DEFINITIONS
════════════════════════

GATE 1: READY FOR DEVELOPMENT (After Phase 1)
─────────────────────────────────────────────
□ PRD complete and reviewed
□ Architecture approved
□ All artifacts generated
□ No ambiguous requirements

GATE 2: READY FOR VERSION CONTROL (After Phase 2)
─────────────────────────────────────────────────
□ All features implemented
□ Application runs
□ No placeholder code
□ Dependencies documented

GATE 3: READY FOR ANALYSIS (After Phase 3)
─────────────────────────────────────────────────
□ Code committed
□ Repository accessible
□ Version tagged

GATE 4: READY FOR ITERATION (After Phase 4)
─────────────────────────────────────────────────
□ Full analysis complete
□ Issues documented
□ Refinement prompts generated

GATE 5: READY FOR RELEASE
─────────────────────────────────────────────────
□ Zero critical issues
□ Zero high issues
□ Performance acceptable
□ Documentation complete
□ Stakeholder approval
```

---

## 10. Cost Management

### 10.1 Cost Breakdown

```
ESTIMATED COSTS PER PROJECT
═══════════════════════════

┌─────────────────────────────────────────────────────────────────┐
│ TOOL COSTS                                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Claude Pro                                                       │
│ ├── Monthly: $20                                                │
│ └── Per project: ~$5-10 (assuming 3-4 projects/month)          │
│                                                                  │
│ Google AI Studio                                                 │
│ ├── Free tier: Usually sufficient                               │
│ └── If exceeded: ~$0.01-0.05 per 1K tokens                     │
│                                                                  │
│ Claude Code (API)                                                │
│ ├── Per session: ~$0.05-0.50                                    │
│ ├── Per iteration: ~$0.10-1.00                                  │
│ └── Per project: ~$1-5                                          │
│                                                                  │
│ GitHub                                                           │
│ └── Free (for most use cases)                                   │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│ TOTAL PER PROJECT (ESTIMATED)                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Simple project (1-2 weeks):     $10-20                          │
│ Medium project (2-4 weeks):     $20-50                          │
│ Complex project (1-2 months):   $50-150                         │
│                                                                  │
│ COMPARISON TO TRADITIONAL:                                       │
│ Traditional developer cost:     $5,000-50,000+                  │
│ AI-orchestrated cost:           $10-150                         │
│ Savings:                        95-99%                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 10.2 Cost Optimization Tips

```
REDUCE COSTS
════════════

1. CLAUDE USAGE
   • Use concise prompts
   • Batch artifact requests
   • Reuse prompts across similar projects

2. AI STUDIO USAGE
   • Use Gemini Flash for simple tasks
   • Use Gemini Pro only for complex generation
   • Avoid regenerating entire files for small changes

3. CLAUDE CODE USAGE
   • Focus analysis on specific files/issues
   • Use targeted prompts vs. broad analysis
   • Batch questions in single sessions

4. GENERAL
   • Build prompt templates to reuse
   • Learn from each project to improve efficiency
   • Skip unnecessary iterations
```

---

## 11. Team Collaboration

### 11.1 Multi-Person Workflow

```
TEAM COLLABORATION MODEL
════════════════════════

ROLES:
──────
• Product Owner: Defines requirements, approves releases
• AI Orchestrator: Executes the SOP, manages AI tools
• Reviewer: Reviews outputs, identifies issues
• (Optional) Developer: Handles edge cases AI can't solve

WORKFLOW:
─────────

Product Owner          AI Orchestrator         Reviewer
     │                       │                    │
     │  Requirements         │                    │
     ├──────────────────────►│                    │
     │                       │                    │
     │                       │ Executes Phase 1-4 │
     │                       ├───────────────────►│
     │                       │                    │
     │                       │◄───────────────────┤ Feedback
     │                       │                    │
     │                       │ Iteration Loop     │
     │                       ├───────────────────►│
     │                       │                    │
     │◄──────────────────────┤ Release Candidate  │
     │                       │                    │
     │  Approval             │                    │
     ├──────────────────────►│                    │
     │                       │                    │
     │                       │ RELEASE            │
```

### 11.2 Handoff Documentation

```
PROJECT HANDOFF TEMPLATE
════════════════════════

## Project: [Name]

### Quick Start
1. Clone: `git clone [url]`
2. Install: `npm install`
3. Configure: Copy `.env.example` to `.env`
4. Run: `npm run dev`

### Documentation Locations
- PRD: `/docs/prd.md`
- Architecture: `/docs/architecture.md`
- System Prompt: `/prompts/system-prompt.md`
- Iteration History: `/iterations/`

### Current State
- Version: v1.X.X
- Status: [Development/Testing/Production]
- Last iteration: [N]
- Open issues: [N]

### How to Continue Development
1. Read the PRD and architecture docs
2. Review the system prompt to understand AI context
3. Check `/iterations/` for history
4. Use existing prompts as templates for new features

### Key Decisions Made
- [Decision 1]: [Rationale]
- [Decision 2]: [Rationale]

### Known Issues / Tech Debt
- [Issue 1]
- [Issue 2]
```

---

## 12. Security & Compliance

### 12.1 Security Checklist

```
SECURITY CONSIDERATIONS
═══════════════════════

□ BEFORE DEVELOPMENT
  □ No sensitive data in prompts
  □ No API keys in artifacts
  □ Private repository used

□ DURING DEVELOPMENT
  □ Environment variables for secrets
  □ .env files in .gitignore
  □ No hardcoded credentials
  □ Input validation included

□ CODE REVIEW (via Claude Code)
  □ Check for SQL injection vulnerabilities
  □ Check for XSS vulnerabilities
  □ Check for authentication issues
  □ Check for exposed endpoints

□ BEFORE RELEASE
  □ Security scan completed
  □ Dependencies audited (npm audit)
  □ No sensitive data in repository
  □ Access controls configured
```

### 12.2 Compliance Notes

```
COMPLIANCE CONSIDERATIONS
═════════════════════════

• AI-generated code should be reviewed for:
  - License compliance
  - Security vulnerabilities
  - Data handling practices

• For regulated industries:
  - Additional human review required
  - Audit trail documentation
  - Formal testing procedures

• Data privacy:
  - Don't share user data with AI tools
  - Anonymize any examples used
  - Check AI tool data policies
```

---

## 13. Tool Alternatives & Integrations

### 13.1 Alternative Tools

```
ALTERNATIVE OPTIONS
═══════════════════

INSTEAD OF CLAUDE (Phase 1):
├── ChatGPT (GPT-4) - Similar capabilities
├── Gemini Advanced - Google's alternative
└── Local LLMs - For privacy-sensitive projects

INSTEAD OF GOOGLE AI STUDIO (Phase 2):
├── ChatGPT - Code generation capable
├── Claude - Can also generate code
├── Cursor - AI-powered IDE
├── GitHub Copilot - In-IDE generation
└── Cline/Continue - VS Code extensions

INSTEAD OF GITHUB (Phase 3):
├── GitLab - Full DevOps platform
├── Bitbucket - Atlassian integration
└── Azure DevOps - Microsoft ecosystem

INSTEAD OF CLAUDE CODE (Phase 4):
├── ChatGPT + code upload
├── Cursor - AI analysis built-in
├── CodeRabbit - AI code review
└── Manual review process
```

### 13.2 Integration Options

```
INTEGRATIONS
════════════

PROJECT MANAGEMENT:
├── Linear - Task tracking
├── Jira - Enterprise PM
├── Notion - Documentation
└── Trello - Simple boards

CI/CD:
├── GitHub Actions - Automation
├── Vercel - Frontend deployment
├── Railway - Backend deployment
└── Netlify - Static sites

MONITORING:
├── Sentry - Error tracking
├── LogRocket - Session replay
└── Datadog - Full observability

COMMUNICATION:
├── Slack - Team chat
├── Discord - Community
└── Email - Notifications
```

---

## 14. Templates Library

### 14.1 Quick Prompt Templates

```markdown
# PROMPT TEMPLATES

## PRD Request
"Create a comprehensive PRD for [PROJECT] that [DOES WHAT]
for [TARGET USERS]. Include user stories, requirements, and
success metrics. Generate as artifact."

## Architecture Request
"Design system architecture for [PROJECT] using [TECH STACK].
Include diagrams, data model, and API design. Generate as artifact."

## System Prompt Request
"Create a system prompt for Google AI Studio to build [PROJECT].
Include full context, coding standards, and output format.
Make it 2000+ words. Generate as artifact."

## Feature Prompt Request
"Create sequential prompts to build all features in the PRD.
Format each with prerequisites, prompt, expected output, and
validation steps. Generate as artifact."

## Analysis Request (Claude Code)
"Analyze this codebase for bugs, security issues, and missing
features. Prioritize by severity. Generate refinement prompts."

## Fix Prompt Template
"Fix [ISSUE] in [FILE]. Current code: [CODE].
The problem is [PROBLEM]. Expected behavior: [EXPECTED].
Generate complete corrected code."
```

### 14.2 Status Report Template

```markdown
# Project Status Report

**Project:** [Name]
**Date:** [Date]
**Reporter:** [Name]

## Summary
[One paragraph overview]

## Progress
- **Phase:** [1-5]
- **Iteration:** [N]
- **Completion:** [X]%

## Metrics
| Metric | Value |
|--------|-------|
| Features complete | X/Y |
| Open issues | N |
| Days elapsed | N |

## Accomplishments This Period
- [Item 1]
- [Item 2]

## Blockers
- [Blocker 1]: [Mitigation]

## Next Steps
1. [Step 1]
2. [Step 2]

## Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| [Risk] | [H/M/L] | [Action] |
```

---

## 15. Troubleshooting

### 15.1 Common Issues by Phase

```
TROUBLESHOOTING QUICK REFERENCE
═══════════════════════════════

PHASE 1 - CLAUDE
────────────────
Problem: Artifact not generating
→ Break request into smaller parts
→ Be more specific about output format
→ Try "Generate as downloadable artifact"

Problem: Artifact truncated
→ Request in sections
→ "Continue generating" for more
→ Combine parts manually

Problem: Low quality output
→ Provide more context
→ Give examples of desired output
→ Iterate with feedback

PHASE 2 - AI STUDIO
───────────────────
Problem: Code cuts off
→ "Continue from where you stopped"
→ Request smaller components
→ Increase max tokens

Problem: Syntax errors
→ Specify language explicitly
→ Request "complete, working code"
→ Provide error message and ask for fix

Problem: Doesn't match requirements
→ Update system prompt with more detail
→ Reference specific PRD sections
→ Provide examples

Problem: Forgets context
→ Start new chat with fresh system prompt
→ Include summary of progress
→ Reference previous outputs

PHASE 3 - GITHUB
────────────────
Problem: Push rejected
→ git pull --rebase origin main
→ Resolve conflicts
→ Push again

Problem: Large files rejected
→ Add to .gitignore
→ Use Git LFS for large files
→ Remove from history if needed

PHASE 4 - CLAUDE CODE
─────────────────────
Problem: Can't access repo
→ Check repository URL
→ Verify permissions
→ Check authentication

Problem: Incomplete analysis
→ Request specific files/folders
→ Break into multiple requests
→ Provide focus areas

GENERAL
───────
Problem: Stuck in iteration loop
→ Define clear "done" criteria
→ Accept "good enough" for MVP
→ Time-box iterations
```

### 15.2 When to Abandon AI Approach

```
ESCAPE HATCHES
══════════════

Consider manual development when:

□ AI repeatedly fails same task after 5+ attempts
□ Highly specialized/niche technology
□ Complex algorithmic requirements
□ Real-time/performance critical systems
□ Regulatory/compliance requirements demand formal verification
□ AI costs exceed traditional development ROI

Hybrid approach:
→ Use AI for 80% (CRUD, UI, standard patterns)
→ Manual for 20% (complex logic, optimization)
```

---

## 16. Case Studies

### 16.1 Example: TEF Maître (Language Learning App)

```
PROJECT: TEF Maître - French Language Learning Platform
═══════════════════════════════════════════════════════

OVERVIEW:
- Purpose: TEF/TCF exam preparation for Canadian immigration
- Features: Reading, Listening, Writing, Speaking modules
- Tech Stack: Next.js, AI-powered assessment

TIMELINE:
- Phase 1 (Strategy): 4 hours
  - PRD: 15 pages covering all features
  - Architecture: Full-stack design
  - 25 feature prompts generated

- Phase 2 (Build): 16 hours across 3 days
  - Core modules implemented
  - AI coaching features
  - Assessment system

- Phase 3 (Version): 30 minutes
  - Initial commit: 150 files
  - Tagged v1.0.0

- Phase 4 (Analysis): 2 hours
  - 23 issues identified
  - Refinement prompts generated

- Iterations: 4 cycles
  - Iteration 1: Fixed audio issues
  - Iteration 2: Completed exam sections
  - Iteration 3: Level calibration
  - Iteration 4: Final polish

RESULTS:
- Total time: ~30 hours
- Traditional estimate: 300+ hours
- Time savings: 90%
- Cost: ~$50 (AI tools)
- Traditional cost: $15,000+ (developer time)
```

### 16.2 Example: Internal Dashboard

```
PROJECT: Sales Analytics Dashboard
══════════════════════════════════

OVERVIEW:
- Purpose: Internal sales team dashboard
- Features: Charts, filters, export, real-time data
- Tech Stack: React, Chart.js, REST API

TIMELINE:
- Phase 1: 2 hours
- Phase 2: 8 hours
- Phase 3: 15 minutes
- Phase 4: 1 hour
- Iterations: 2 cycles

TOTAL: 12 hours
Traditional: 80+ hours
Savings: 85%
```

---

## 17. Appendices

### Appendix A: One-Page Summary

```
╔═══════════════════════════════════════════════════════════════════╗
║            AI-ORCHESTRATED DEVELOPMENT - QUICK REFERENCE           ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  PHASE 1: STRATEGY (Claude)                    [2-8 hours]        ║
║  ───────────────────────────────                                   ║
║  □ Generate PRD                    → docs/prd.md                  ║
║  □ Generate Architecture           → docs/architecture.md         ║
║  □ Generate System Prompt          → prompts/system-prompt.md     ║
║  □ Generate Feature Prompts        → prompts/feature-prompts.md   ║
║  □ Download all artifacts                                          ║
║                                                                    ║
║  PHASE 2: BUILD (Google AI Studio)             [4-40 hours]       ║
║  ───────────────────────────────                                   ║
║  □ Configure system prompt                                         ║
║  □ Upload context documents                                        ║
║  □ Execute feature prompts sequentially                           ║
║  □ Save generated code to /src/                                   ║
║                                                                    ║
║  PHASE 3: VERSION (GitHub)                     [15-30 min]        ║
║  ───────────────────────────────                                   ║
║  □ git add . && git commit                                        ║
║  □ git push origin main                                            ║
║  □ git tag -a v1.0.0                                               ║
║                                                                    ║
║  PHASE 4: REFINE (Claude Code)                 [1-4 hours]        ║
║  ───────────────────────────────                                   ║
║  □ Analyze codebase                                                ║
║  □ Identify issues                                                 ║
║  □ Generate refinement prompts                                     ║
║                                                                    ║
║  PHASE 5: ITERATE                                                  ║
║  ───────────────────────────────                                   ║
║  □ Execute refinement prompts in AI Studio                        ║
║  □ Push updates to GitHub                                          ║
║  □ Re-analyze with Claude Code                                    ║
║  □ Repeat until quality targets met                               ║
║                                                                    ║
║  RELEASE CRITERIA:                                                 ║
║  ───────────────────────────────                                   ║
║  ✓ Zero critical issues                                            ║
║  ✓ Zero high issues                                                ║
║  ✓ All core features working                                       ║
║  ✓ Documentation complete                                          ║
║                                                                    ║
╚═══════════════════════════════════════════════════════════════════╝
```

### Appendix B: Keyboard Shortcuts & Efficiency Tips

```
EFFICIENCY TIPS
═══════════════

CLAUDE:
• Use Ctrl+Enter to submit long prompts
• Download artifacts immediately (they can be lost)
• Keep prompts in text file for reuse

AI STUDIO:
• Use Tab to accept autocomplete
• Ctrl+Shift+C to copy code blocks
• Save chat for context continuity

GITHUB:
• Use gh CLI for faster operations
• Set up SSH for passwordless push
• Use git aliases for common commands

GENERAL:
• Keep template prompts in clipboard manager
• Use VS Code snippets for repetitive text
• Dual monitor: AI tool + code editor
```

### Appendix C: Glossary

| Term | Definition |
|------|------------|
| **Artifact** | Downloadable document generated by Claude |
| **Claude Code** | CLI tool for AI-powered code analysis |
| **Feature Prompt** | Specific prompt to generate one feature |
| **Iteration** | One cycle through the refinement loop |
| **PRD** | Product Requirements Document |
| **Refinement Prompt** | Prompt to fix or improve existing code |
| **System Prompt** | Master context/instructions for AI |

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Dec 2024 | Initial SOP creation |
| 2.0 | Dec 2024 | Major enhancement: Quick Start, metrics, cost management, team collaboration, security, tool alternatives, case studies, templates |

---

**END OF DOCUMENT**

*This SOP is a living document. Update it as you learn and improve the process.*
