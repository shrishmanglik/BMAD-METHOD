# AI-Orchestrated Development System
## Standard Operating Procedure (SOP)

**Version:** 1.0
**Last Updated:** December 2024
**Author:** TEF Maître Development Team
**Classification:** Internal Process Documentation

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Overview](#2-system-overview)
3. [Prerequisites & Setup](#3-prerequisites--setup)
4. [Phase 1: Strategy & Design (Claude Artifacts)](#4-phase-1-strategy--design-claude-artifacts)
5. [Phase 2: Development (Google AI Studio)](#5-phase-2-development-google-ai-studio)
6. [Phase 3: Version Control (GitHub)](#6-phase-3-version-control-github)
7. [Phase 4: Testing & Refinement (Claude Code)](#7-phase-4-testing--refinement-claude-code)
8. [Phase 5: Iteration Loop](#8-phase-5-iteration-loop)
9. [Templates & Checklists](#9-templates--checklists)
10. [Troubleshooting Guide](#10-troubleshooting-guide)
11. [Best Practices](#11-best-practices)
12. [Glossary](#12-glossary)

---

## 1. Executive Summary

### 1.1 Purpose

This SOP documents a revolutionary AI-orchestrated development workflow that leverages multiple AI systems in concert to design, build, test, and iteratively improve software applications. The system enables rapid development of AI-powered automation systems for any business or operational context.

### 1.2 Workflow Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    AI-ORCHESTRATED DEVELOPMENT SYSTEM                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐               │
│   │   CLAUDE     │────▶│  GOOGLE AI   │────▶│   GITHUB     │               │
│   │  (Artifacts) │     │   STUDIO     │     │  (Version    │               │
│   │              │     │              │     │   Control)   │               │
│   │ • Strategy   │     │ • Build App  │     │              │               │
│   │ • PRD        │     │ • Code Gen   │     │ • Store Code │               │
│   │ • Prompts    │     │ • Execute    │     │ • History    │               │
│   └──────────────┘     └──────────────┘     └──────┬───────┘               │
│          ▲                                          │                       │
│          │                                          ▼                       │
│          │              ┌──────────────┐     ┌──────────────┐               │
│          │              │   REFINED    │◀────│ CLAUDE CODE  │               │
│          └──────────────│   PROMPTS    │     │              │               │
│                         │              │     │ • Test       │               │
│                         │ For Google   │     │ • Analyze    │               │
│                         │ AI Studio    │     │ • Refine     │               │
│                         └──────────────┘     └──────────────┘               │
│                                                                              │
│                         ◀─── ITERATION LOOP ───▶                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Key Benefits

| Benefit | Description |
|---------|-------------|
| **Speed** | 10x faster development through AI automation |
| **Quality** | Systematic testing and refinement ensures robustness |
| **Scalability** | Works for any business domain or application type |
| **Documentation** | Every artifact is documented and version-controlled |
| **Iteration** | Continuous improvement through structured feedback loops |
| **Cost Efficiency** | Reduces need for large development teams |

### 1.4 Applicable Use Cases

- AI-powered business automation systems
- SaaS application development
- Internal tools and dashboards
- Customer-facing applications
- Data processing pipelines
- Chatbots and conversational AI
- Educational platforms
- E-commerce systems
- Any software requiring rapid iteration

---

## 2. System Overview

### 2.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SYSTEM COMPONENTS                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  LAYER 1: STRATEGY & DESIGN                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  CLAUDE (claude.ai - Artifact Mode)                                  │    │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │    │
│  │  │ PRD Docs    │ │ System      │ │ Prompts for │ │ Context     │   │    │
│  │  │ Generation  │ │ Architecture│ │ AI Studio   │ │ Documents   │   │    │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                      │                                       │
│                                      ▼ (Download Artifacts)                  │
│  LAYER 2: DEVELOPMENT                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  GOOGLE AI STUDIO (Gemini)                                           │    │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │    │
│  │  │ Upload      │ │ Execute     │ │ Generate    │ │ Preview &   │   │    │
│  │  │ Context     │ │ Prompts     │ │ Application │ │ Test        │   │    │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                      │                                       │
│                                      ▼ (Export/Push Code)                    │
│  LAYER 3: VERSION CONTROL                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  GITHUB                                                               │    │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │    │
│  │  │ Repository  │ │ Branches    │ │ Commit      │ │ Version     │   │    │
│  │  │ Storage     │ │ Management  │ │ History     │ │ Tags        │   │    │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                      │                                       │
│                                      ▼ (Clone/Access Repository)             │
│  LAYER 4: TESTING & REFINEMENT                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  CLAUDE CODE (CLI)                                                    │    │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │    │
│  │  │ Code        │ │ Issue       │ │ Generate    │ │ Create      │   │    │
│  │  │ Analysis    │ │ Detection   │ │ Fixes       │ │ AI Studio   │   │    │
│  │  │             │ │             │ │             │ │ Prompts     │   │    │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                      │                                       │
│                                      ▼ (Refinement Prompts)                  │
│                          ┌───────────────────────┐                           │
│                          │  BACK TO LAYER 1 OR 2 │                           │
│                          │  (Iteration Loop)     │                           │
│                          └───────────────────────┘                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow Diagram

```
┌────────────────────────────────────────────────────────────────────────────┐
│                              DATA FLOW                                      │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [Business Requirements]                                                    │
│         │                                                                   │
│         ▼                                                                   │
│  ┌─────────────────┐                                                       │
│  │ CLAUDE ARTIFACTS │                                                       │
│  │ • PRD.md        │──────┐                                                │
│  │ • Architecture.md│      │                                                │
│  │ • Prompts.md    │      │                                                │
│  │ • Context.md    │      │                                                │
│  └─────────────────┘      │                                                │
│                           ▼                                                 │
│                    [Download as Files]                                      │
│                           │                                                 │
│                           ▼                                                 │
│  ┌─────────────────┐     ┌─────────────────┐                               │
│  │ GOOGLE AI STUDIO│◀────│ Upload Context  │                               │
│  │                 │     │ Files           │                               │
│  │ Execute Prompts │     └─────────────────┘                               │
│  │       │         │                                                        │
│  │       ▼         │                                                        │
│  │ [Generated App] │                                                        │
│  └────────┬────────┘                                                       │
│           │                                                                 │
│           ▼                                                                 │
│    [Export Code]                                                            │
│           │                                                                 │
│           ▼                                                                 │
│  ┌─────────────────┐                                                       │
│  │     GITHUB      │                                                        │
│  │  • Commit Code  │                                                        │
│  │  • Version Tag  │                                                        │
│  │  • Branch       │                                                        │
│  └────────┬────────┘                                                       │
│           │                                                                 │
│           ▼                                                                 │
│  ┌─────────────────┐     ┌─────────────────┐                               │
│  │   CLAUDE CODE   │────▶│ Analysis Report │                               │
│  │                 │     │ • Issues Found  │                               │
│  │ • Read Repo     │     │ • Improvements  │                               │
│  │ • Analyze Code  │     │ • Test Results  │                               │
│  │ • Generate      │     └─────────────────┘                               │
│  │   Refinements   │            │                                          │
│  └─────────────────┘            │                                          │
│                                 ▼                                           │
│                    ┌─────────────────────────┐                              │
│                    │ REFINEMENT PROMPTS      │                              │
│                    │ (For Google AI Studio)  │──────┐                      │
│                    └─────────────────────────┘      │                      │
│                                                     │                      │
│                           ┌─────────────────────────┘                      │
│                           │                                                 │
│                           ▼                                                 │
│                    [Return to Google AI Studio]                             │
│                    [or Claude for Major Changes]                            │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Role Definitions

| Role | AI System | Primary Function | Output |
|------|-----------|------------------|--------|
| **Strategist** | Claude (Artifacts) | Define vision, requirements, architecture | PRD, system design, prompts |
| **Builder** | Google AI Studio | Execute prompts, generate code | Working application code |
| **Archivist** | GitHub | Store, version, track changes | Repository with history |
| **Analyst** | Claude Code | Test, analyze, identify improvements | Refinement instructions |

---

## 3. Prerequisites & Setup

### 3.1 Required Accounts

| Service | URL | Purpose | Cost |
|---------|-----|---------|------|
| **Claude** | claude.ai | Strategy, PRD, prompt generation | Pro: $20/mo |
| **Google AI Studio** | aistudio.google.com | App development & code generation | Free (with limits) |
| **GitHub** | github.com | Version control | Free |
| **Claude Code** | Via Anthropic API | Testing & refinement | API costs |

### 3.2 Initial Setup Checklist

```
SETUP CHECKLIST:

[ ] 1. CLAUDE SETUP
    [ ] Create Claude account (Pro recommended)
    [ ] Enable Artifacts feature
    [ ] Familiarize with artifact download functionality
    [ ] Create project folder structure

[ ] 2. GOOGLE AI STUDIO SETUP
    [ ] Create Google account (if needed)
    [ ] Access Google AI Studio
    [ ] Create new project
    [ ] Set up system instructions template
    [ ] Configure model settings (Gemini Pro/Ultra)

[ ] 3. GITHUB SETUP
    [ ] Create GitHub account
    [ ] Create repository for project
    [ ] Set up SSH keys or personal access token
    [ ] Configure branch protection (optional)
    [ ] Set up repository structure

[ ] 4. CLAUDE CODE SETUP
    [ ] Install Claude Code CLI
    [ ] Configure API key
    [ ] Test repository access
    [ ] Verify read/write permissions

[ ] 5. LOCAL ENVIRONMENT
    [ ] Create project folder
    [ ] Organize subfolder structure:
        /project-name
        ├── /docs           # PRD, architecture, context
        ├── /prompts        # AI Studio prompts
        ├── /artifacts      # Downloaded Claude artifacts
        ├── /iterations     # Version history of refinements
        └── /exports        # Exported code from AI Studio
```

### 3.3 Recommended Folder Structure

```
project-root/
├── docs/
│   ├── prd.md                    # Product Requirements Document
│   ├── architecture.md           # System Architecture
│   ├── user-stories.md           # User Stories & Flows
│   ├── technical-spec.md         # Technical Specifications
│   └── api-design.md             # API Design (if applicable)
│
├── prompts/
│   ├── system-prompt.md          # Master system prompt for AI Studio
│   ├── feature-prompts/          # Individual feature prompts
│   │   ├── 01-core-setup.md
│   │   ├── 02-feature-a.md
│   │   ├── 03-feature-b.md
│   │   └── ...
│   └── refinement-prompts/       # Prompts from Claude Code
│       ├── iteration-01.md
│       ├── iteration-02.md
│       └── ...
│
├── artifacts/
│   ├── v1/                       # Version 1 artifacts
│   ├── v2/                       # Version 2 artifacts
│   └── current/                  # Latest artifacts
│
├── context/
│   ├── domain-knowledge.md       # Domain-specific context
│   ├── constraints.md            # Technical constraints
│   ├── examples.md               # Example inputs/outputs
│   └── reference-materials/      # Supporting documents
│
├── iterations/
│   ├── iteration-01/
│   │   ├── changes.md
│   │   ├── issues-found.md
│   │   └── improvements.md
│   ├── iteration-02/
│   └── ...
│
├── exports/
│   ├── v1-export/                # First export from AI Studio
│   ├── v2-export/                # Second export
│   └── current/                  # Latest export
│
└── README.md                     # Project overview
```

---

## 4. Phase 1: Strategy & Design (Claude Artifacts)

### 4.1 Phase Overview

**Objective:** Generate comprehensive project documentation, architecture, and prompts using Claude's artifact feature.

**Duration:** 2-8 hours (depending on project complexity)

**Inputs:** Business requirements, domain knowledge, user needs

**Outputs:** PRD, architecture docs, system prompts, context documents

### 4.2 Step-by-Step Process

#### Step 1.1: Initial Project Brief

```
ACTION: Open Claude (claude.ai) and start a new conversation

PROMPT TEMPLATE:

"I want to build [PROJECT DESCRIPTION].

Target users: [USER DESCRIPTION]
Problem being solved: [PROBLEM STATEMENT]
Key features needed:
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]
...

Technical constraints:
- [Constraint 1]
- [Constraint 2]

Help me create a comprehensive Product Requirements Document (PRD)
for this project. Generate it as a downloadable artifact."

EXPECTED OUTPUT:
- Claude generates PRD as artifact
- Artifact can be downloaded as .md file
```

#### Step 1.2: System Architecture Design

```
ACTION: Continue conversation or start new thread

PROMPT TEMPLATE:

"Based on the PRD we created, now design the system architecture.

Include:
1. High-level system diagram
2. Component breakdown
3. Data models/schema
4. API design (if applicable)
5. Technology recommendations
6. Integration points

Generate this as a downloadable artifact."

EXPECTED OUTPUT:
- Architecture document as artifact
- Diagrams in Mermaid or ASCII format
- Technology stack recommendations
```

#### Step 1.3: Generate AI Studio System Prompt

```
ACTION: Request master system prompt for Google AI Studio

PROMPT TEMPLATE:

"Now create a comprehensive system prompt that I will use in
Google AI Studio to build this application.

The system prompt should:
1. Define the AI's role as a developer
2. Include all context from PRD and architecture
3. Specify coding standards and patterns
4. Define output format expectations
5. Include error handling guidelines
6. Specify the tech stack to use

Make it comprehensive enough that Google AI Studio can build
the entire application with follow-up feature prompts.

Generate as a downloadable artifact."

EXPECTED OUTPUT:
- Complete system prompt (typically 2000-5000 words)
- Ready to paste into Google AI Studio
```

#### Step 1.4: Generate Feature Prompts

```
ACTION: Create individual prompts for each feature

PROMPT TEMPLATE:

"Based on our PRD, create a series of sequential prompts I can
use in Google AI Studio to build each feature.

Format each prompt as:

## Feature: [Name]
### Prerequisites
- [What must be completed first]

### Prompt
```
[The actual prompt to use]
```

### Expected Output
- [What the AI should generate]

### Validation
- [How to verify it works]

Generate prompts for all major features as a single artifact."

EXPECTED OUTPUT:
- 5-20 feature prompts depending on project
- Clear sequence and dependencies
- Validation criteria for each
```

#### Step 1.5: Create Context Documents

```
ACTION: Generate supporting context documents

PROMPT TEMPLATE:

"Create the following context documents that I'll upload to
Google AI Studio for reference:

1. Domain Knowledge Document
   - Key terminology
   - Business rules
   - Industry standards

2. Data Examples Document
   - Sample inputs
   - Expected outputs
   - Edge cases

3. Constraints Document
   - Technical limitations
   - Performance requirements
   - Security considerations

Generate each as a separate artifact."

EXPECTED OUTPUT:
- 3 context documents as artifacts
- Ready for upload to AI Studio
```

### 4.3 Artifact Download & Organization

```
ARTIFACT MANAGEMENT PROCESS:

1. DOWNLOAD ARTIFACTS
   - Click the download button on each artifact
   - Save to /artifacts/current/ folder
   - Use consistent naming: prd-v1.md, architecture-v1.md, etc.

2. ORGANIZE FILES
   /artifacts/current/
   ├── prd-v1.md
   ├── architecture-v1.md
   ├── system-prompt-v1.md
   ├── feature-prompts-v1.md
   ├── domain-knowledge-v1.md
   ├── data-examples-v1.md
   └── constraints-v1.md

3. VERSION CONTROL
   - Copy to /prompts/ for active use
   - Keep originals in /artifacts/ for reference
   - Increment version numbers on updates

4. REVIEW CHECKLIST
   [ ] PRD is complete and accurate
   [ ] Architecture aligns with requirements
   [ ] System prompt is comprehensive
   [ ] Feature prompts are sequenced correctly
   [ ] Context documents are relevant
   [ ] All artifacts downloaded successfully
```

### 4.4 Phase 1 Completion Checklist

```
PHASE 1 COMPLETION CHECKLIST:

[ ] PRD document created and reviewed
[ ] System architecture designed
[ ] Tech stack decided
[ ] System prompt generated
[ ] Feature prompts created (all features covered)
[ ] Context documents prepared
[ ] All artifacts downloaded
[ ] Files organized in project structure
[ ] Version numbers assigned
[ ] Ready for Phase 2

QUALITY GATES:
[ ] PRD covers all user requirements
[ ] Architecture is technically feasible
[ ] System prompt is >1000 words with full context
[ ] Feature prompts have clear prerequisites
[ ] No ambiguity in instructions
```

---

## 5. Phase 2: Development (Google AI Studio)

### 5.1 Phase Overview

**Objective:** Use Google AI Studio to build the application by executing prompts generated in Phase 1.

**Duration:** 4-40 hours (depending on project complexity)

**Inputs:** System prompt, feature prompts, context documents

**Outputs:** Working application code

### 5.2 Google AI Studio Setup

#### Step 2.1: Create New Project

```
ACTION: Set up Google AI Studio environment

1. Navigate to aistudio.google.com
2. Click "Create New" → "Chat prompt" or "Structured prompt"
3. Name your project: [Project Name] - Development
4. Select model: Gemini 1.5 Pro (recommended) or Gemini Ultra
5. Configure settings:
   - Temperature: 0.7 (balanced creativity/consistency)
   - Max output tokens: 8192 (or maximum available)
   - Top-p: 0.95
   - Top-k: 40
```

#### Step 2.2: Upload Context Documents

```
ACTION: Add reference materials to AI Studio

1. Click "Add file" or use the file upload feature
2. Upload the following from your /context/ folder:
   - domain-knowledge.md
   - data-examples.md
   - constraints.md
3. Optionally upload:
   - prd.md (for reference)
   - architecture.md (for reference)

NOTE: Google AI Studio has file size limits. If documents
are too large, split them or summarize key points.
```

#### Step 2.3: Configure System Instructions

```
ACTION: Paste system prompt into System Instructions

1. Click "System Instructions" or equivalent
2. Paste the entire content of system-prompt-v1.md
3. Review that it renders correctly
4. Save/apply the system instructions

VERIFICATION:
- System instructions should be visible
- No truncation of long prompts
- All context is included
```

### 5.3 Feature Development Process

#### Step 2.4: Execute Feature Prompts Sequentially

```
ACTION: Build features one at a time

FOR EACH FEATURE:

1. LOAD FEATURE PROMPT
   - Open feature-prompts-v1.md
   - Find the next feature in sequence
   - Verify prerequisites are met

2. EXECUTE PROMPT
   - Paste the feature prompt into chat
   - Submit and wait for response
   - Review generated code

3. VALIDATE OUTPUT
   - Check code for completeness
   - Verify it matches expected output
   - Test in preview (if available)

4. ITERATE IF NEEDED
   - If output is incomplete: "Continue generating..."
   - If output has errors: "Fix the following issues: [issues]"
   - If output needs changes: "Modify to [specific change]"

5. SAVE OUTPUT
   - Copy generated code
   - Save to /exports/current/
   - Use appropriate file structure

6. DOCUMENT PROGRESS
   - Mark feature as complete
   - Note any deviations from spec
   - Record any issues encountered

REPEAT for each feature until application is complete
```

#### Step 2.5: Integration & Assembly

```
ACTION: Combine generated components

1. ORGANIZE GENERATED CODE
   /exports/current/
   ├── /src
   │   ├── /components
   │   ├── /pages
   │   ├── /utils
   │   └── /api
   ├── /public
   ├── package.json
   └── [config files]

2. RESOLVE DEPENDENCIES
   - Ensure imports are correct
   - Fix any naming conflicts
   - Verify file paths

3. TEST INTEGRATION
   - If AI Studio has preview: test there
   - If not: prepare for local testing later

4. FINAL REVIEW
   - All features implemented
   - Code is organized
   - No obvious errors
```

### 5.4 Export & Prepare for GitHub

```
ACTION: Export code for version control

1. COLLECT ALL GENERATED FILES
   - Gather all code from AI Studio sessions
   - Organize into proper project structure
   - Include configuration files

2. CREATE PACKAGE FILES
   - package.json (for Node.js projects)
   - requirements.txt (for Python projects)
   - Other dependency manifests

3. ADD DOCUMENTATION
   - README.md with setup instructions
   - Any generated docs from AI Studio

4. PREPARE EXPORT PACKAGE
   /exports/v1-complete/
   ├── /src
   ├── /public
   ├── package.json
   ├── README.md
   └── [all project files]
```

### 5.5 Phase 2 Completion Checklist

```
PHASE 2 COMPLETION CHECKLIST:

[ ] Google AI Studio project created
[ ] System prompt configured
[ ] Context documents uploaded
[ ] All feature prompts executed
[ ] All code generated and saved
[ ] Code organized in project structure
[ ] Dependencies documented
[ ] README created
[ ] Export package prepared
[ ] Ready for GitHub push

QUALITY GATES:
[ ] All planned features implemented
[ ] Code follows specified patterns
[ ] No placeholder/TODO code remaining
[ ] File structure is clean
[ ] Ready for version control
```

---

## 6. Phase 3: Version Control (GitHub)

### 6.1 Phase Overview

**Objective:** Push generated code to GitHub for version control and to enable Claude Code access.

**Duration:** 15-30 minutes

**Inputs:** Exported code from Google AI Studio

**Outputs:** GitHub repository with versioned code

### 6.2 Repository Setup (First Time Only)

```
ACTION: Create and configure repository

# If repository doesn't exist:
1. Go to github.com → New Repository
2. Name: [project-name]
3. Description: [Brief description]
4. Visibility: Private (recommended) or Public
5. Initialize with README: No (we have our own)
6. Create repository

# Clone locally:
git clone https://github.com/[username]/[project-name].git
cd [project-name]
```

### 6.3 Push Code to GitHub

```
ACTION: Push exported code to repository

# Navigate to repository
cd /path/to/[project-name]

# Copy exported code
cp -r /path/to/exports/v1-complete/* .

# Stage all files
git add .

# Create commit
git commit -m "feat: initial application from Google AI Studio

- Core features implemented
- Generated via AI-orchestrated development workflow
- Version: v1.0.0"

# Push to GitHub
git push origin main

# Create version tag
git tag -a v1.0.0 -m "Version 1.0.0 - Initial release"
git push origin v1.0.0
```

### 6.4 Branch Strategy for Iterations

```
BRANCHING STRATEGY:

main (or master)
  │
  ├── develop          # Integration branch
  │     │
  │     ├── feature/iteration-1
  │     │
  │     ├── feature/iteration-2
  │     │
  │     └── feature/iteration-n
  │
  └── releases/v1.0.0  # Stable releases

BRANCH NAMING:
- feature/[iteration-number]-[description]
- fix/[issue-number]-[description]
- refactor/[description]

EXAMPLE WORKFLOW:
# For each iteration:
git checkout develop
git pull origin develop
git checkout -b feature/iteration-2-audio-fixes

# After changes:
git add .
git commit -m "fix: resolve audio playback issues

- Fixed audio URL validation
- Added fallback mechanism
- Improved error handling"
git push origin feature/iteration-2-audio-fixes

# Create PR or merge to develop
```

### 6.5 Phase 3 Completion Checklist

```
PHASE 3 COMPLETION CHECKLIST:

[ ] GitHub repository exists
[ ] Code pushed to repository
[ ] Commit message is descriptive
[ ] Version tag created
[ ] Branch strategy established
[ ] Repository is accessible
[ ] Ready for Claude Code access

QUALITY GATES:
[ ] All files committed
[ ] No sensitive data in repository
[ ] .gitignore configured properly
[ ] README is present
[ ] Repository structure is clean
```

---

## 7. Phase 4: Testing & Refinement (Claude Code)

### 7.1 Phase Overview

**Objective:** Use Claude Code to analyze the repository, identify issues, test functionality, and generate refinement prompts for Google AI Studio.

**Duration:** 1-4 hours per iteration

**Inputs:** GitHub repository access

**Outputs:** Analysis report, issue list, refinement prompts

### 7.2 Claude Code Setup

```
ACTION: Configure Claude Code to access repository

# Ensure Claude Code is installed and configured
# Navigate to project directory or provide repo URL

# Start Claude Code session
claude

# Or with specific repository
claude --repo https://github.com/[username]/[project-name]
```

### 7.3 Analysis Process

#### Step 4.1: Initial Codebase Analysis

```
PROMPT TO CLAUDE CODE:

"Analyze this codebase comprehensively. I need you to:

1. UNDERSTAND THE STRUCTURE
   - Map out all files and their purposes
   - Identify the tech stack
   - Document the architecture

2. IDENTIFY ISSUES
   - Find bugs or potential bugs
   - Locate incomplete implementations
   - Identify security vulnerabilities
   - Find performance issues

3. ASSESS QUALITY
   - Code organization
   - Naming conventions
   - Error handling
   - Documentation

4. COMPARE TO REQUIREMENTS
   - Based on any PRD/docs in the repo
   - Identify missing features
   - Find deviations from spec

Provide a detailed analysis report."

EXPECTED OUTPUT:
- Comprehensive codebase map
- List of issues with severity
- Quality assessment
- Gap analysis vs requirements
```

#### Step 4.2: Specific Testing

```
PROMPT TO CLAUDE CODE:

"Test the following specific functionality:

1. [FEATURE 1]
   - Expected behavior: [description]
   - Test cases: [list]

2. [FEATURE 2]
   - Expected behavior: [description]
   - Test cases: [list]

For each feature:
- Document if it works as expected
- Note any failures or issues
- Identify edge cases that fail
- Suggest fixes

Provide a test report."

EXPECTED OUTPUT:
- Test results for each feature
- Pass/fail status
- Issue details for failures
- Recommended fixes
```

#### Step 4.3: Generate Refinement Prompts

```
PROMPT TO CLAUDE CODE:

"Based on your analysis and testing, generate specific prompts
that I can use in Google AI Studio to fix and improve the application.

For each issue/improvement:

## Issue: [Title]
### Problem
[Description of the issue]

### Current Code
```
[Relevant code snippet]
```

### Prompt for Google AI Studio
```
[The exact prompt to fix this issue]
```

### Expected Result
[What the fix should accomplish]

Generate prompts for ALL issues found, prioritized by severity."

EXPECTED OUTPUT:
- Numbered list of refinement prompts
- Ready to copy into Google AI Studio
- Prioritized by importance
```

### 7.4 Refinement Documentation

```
ACTION: Document refinement cycle

# Create iteration folder
mkdir -p iterations/iteration-[N]

# Save outputs
/iterations/iteration-[N]/
├── analysis-report.md      # Full analysis from Claude Code
├── test-results.md         # Test outcomes
├── issues-found.md         # List of issues
├── refinement-prompts.md   # Prompts for AI Studio
└── changes-summary.md      # Summary of changes needed

# Update tracking
# Add to master tracking document or spreadsheet
```

### 7.5 Phase 4 Completion Checklist

```
PHASE 4 COMPLETION CHECKLIST:

[ ] Claude Code accessed repository
[ ] Full codebase analysis completed
[ ] All features tested
[ ] Issues documented with severity
[ ] Refinement prompts generated
[ ] Prompts are specific and actionable
[ ] Documentation saved
[ ] Ready for next iteration

QUALITY GATES:
[ ] Analysis covers entire codebase
[ ] Tests cover all major features
[ ] Issues are clearly described
[ ] Prompts include context and expected output
[ ] Prioritization is logical
```

---

## 8. Phase 5: Iteration Loop

### 8.1 Iteration Process Overview

```
ITERATION LOOP:

┌─────────────────────────────────────────────────────────────┐
│                    ITERATION CYCLE                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐                                          │
│   │ START       │                                          │
│   │ ITERATION N │                                          │
│   └──────┬──────┘                                          │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────────────────────────────────┐              │
│   │ 1. REVIEW REFINEMENT PROMPTS            │              │
│   │    (From Claude Code Phase 4)           │              │
│   └──────┬──────────────────────────────────┘              │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────────────────────────────────┐              │
│   │ 2. EXECUTE IN GOOGLE AI STUDIO          │              │
│   │    - Load current codebase context      │              │
│   │    - Execute refinement prompts         │              │
│   │    - Generate fixes/improvements        │              │
│   └──────┬──────────────────────────────────┘              │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────────────────────────────────┐              │
│   │ 3. EXPORT UPDATED CODE                  │              │
│   │    - Save generated changes             │              │
│   │    - Update local files                 │              │
│   └──────┬──────────────────────────────────┘              │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────────────────────────────────┐              │
│   │ 4. PUSH TO GITHUB                       │              │
│   │    - Commit with iteration message      │              │
│   │    - Tag version                        │              │
│   └──────┬──────────────────────────────────┘              │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────────────────────────────────┐              │
│   │ 5. ANALYZE WITH CLAUDE CODE             │              │
│   │    - Verify fixes                       │              │
│   │    - Find remaining issues              │              │
│   │    - Generate new refinement prompts    │              │
│   └──────┬──────────────────────────────────┘              │
│          │                                                  │
│          ▼                                                  │
│   ┌─────────────────────────────────────────┐              │
│   │ 6. EVALUATE                             │              │
│   │    - All critical issues resolved?      │              │
│   │    - Quality targets met?               │              │
│   │    - Ready for release?                 │              │
│   └──────┬──────────────────────────────────┘              │
│          │                                                  │
│          ▼                                                  │
│     ┌────────────┐     ┌─────────────┐                     │
│     │ MORE WORK  │     │  COMPLETE   │                     │
│     │  NEEDED?   │────▶│  RELEASE    │                     │
│     └─────┬──────┘ No  └─────────────┘                     │
│           │ Yes                                             │
│           │                                                 │
│           └─────────────────────────────────────┐          │
│                                                  │          │
│           ┌──────────────────────────────────────┘          │
│           │                                                 │
│           ▼                                                 │
│   ┌─────────────┐                                          │
│   │ START       │                                          │
│   │ ITERATION   │                                          │
│   │ N+1         │                                          │
│   └─────────────┘                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 Iteration Decision Matrix

```
ITERATION CONTINUATION CRITERIA:

Continue Iterating If:
┌─────────────────────────────────────┬─────────────────────┐
│ Condition                            │ Action              │
├─────────────────────────────────────┼─────────────────────┤
│ Critical bugs remain                 │ MUST iterate        │
│ Core features not working            │ MUST iterate        │
│ Security vulnerabilities present     │ MUST iterate        │
│ Performance unacceptable             │ SHOULD iterate      │
│ User-facing errors present           │ SHOULD iterate      │
│ Code quality below standard          │ CONSIDER iterate    │
│ Minor cosmetic issues                │ OPTIONAL iterate    │
│ Nice-to-have features missing        │ OPTIONAL iterate    │
└─────────────────────────────────────┴─────────────────────┘

Stop Iterating When:
┌─────────────────────────────────────┬─────────────────────┐
│ Condition                            │ Status              │
├─────────────────────────────────────┼─────────────────────┤
│ All critical issues resolved         │ ✓ REQUIRED          │
│ All core features working            │ ✓ REQUIRED          │
│ No security vulnerabilities          │ ✓ REQUIRED          │
│ Performance targets met              │ ✓ REQUIRED          │
│ Quality checklist passed             │ ✓ REQUIRED          │
│ Stakeholder approval received        │ ✓ RECOMMENDED       │
│ All tests passing                    │ ✓ RECOMMENDED       │
└─────────────────────────────────────┴─────────────────────┘
```

### 8.3 Iteration Tracking Template

```markdown
# Iteration Tracking Log

## Project: [Project Name]
## Started: [Date]

| Iteration | Date | Issues Fixed | New Issues | Status |
|-----------|------|--------------|------------|--------|
| 1 | YYYY-MM-DD | N/A (Initial) | 15 | ✓ |
| 2 | YYYY-MM-DD | 10 | 8 | ✓ |
| 3 | YYYY-MM-DD | 6 | 3 | ✓ |
| 4 | YYYY-MM-DD | 5 | 0 | ✓ |
| 5 | YYYY-MM-DD | 0 | 0 | RELEASE |

## Iteration Details

### Iteration 1 - Initial Build
- **Input:** PRD + Feature Prompts
- **Output:** v1.0.0
- **Issues Found:** 15
  - Critical: 3
  - High: 5
  - Medium: 4
  - Low: 3

### Iteration 2 - Critical Fixes
- **Focus:** Critical bugs, core functionality
- **Issues Fixed:** 10
- **Remaining:** 8
- **New Issues:** 3 (discovered during testing)

[Continue for each iteration...]
```

### 8.4 Major vs Minor Refinements

```
REFINEMENT ROUTING:

┌─────────────────────────────────────────────────────────────┐
│                REFINEMENT TYPE ROUTING                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐                                        │
│  │ REFINEMENT      │                                        │
│  │ NEEDED          │                                        │
│  └────────┬────────┘                                        │
│           │                                                  │
│           ▼                                                  │
│  ┌─────────────────────────────────────────┐                │
│  │ Is this a MAJOR change?                  │                │
│  │                                          │                │
│  │ Major = :                                │                │
│  │ • New feature                            │                │
│  │ • Architecture change                    │                │
│  │ • Requirement change                     │                │
│  │ • Significant redesign                   │                │
│  └─────────┬──────────────────┬────────────┘                │
│            │ YES              │ NO                           │
│            ▼                  ▼                              │
│  ┌─────────────────┐ ┌─────────────────┐                    │
│  │ RETURN TO       │ │ CONTINUE TO     │                    │
│  │ PHASE 1:        │ │ GOOGLE AI       │                    │
│  │ CLAUDE          │ │ STUDIO          │                    │
│  │ (Update PRD,    │ │ (Direct         │                    │
│  │ architecture,   │ │ refinement      │                    │
│  │ prompts)        │ │ prompts)        │                    │
│  └─────────────────┘ └─────────────────┘                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘

EXAMPLES:

MAJOR CHANGES (→ Claude First):
- "Add new payment processing feature"
- "Redesign the database schema"
- "Change from REST to GraphQL"
- "Add user authentication system"

MINOR CHANGES (→ AI Studio Direct):
- "Fix audio playback bug"
- "Improve error messages"
- "Add input validation"
- "Optimize database query"
- "Fix UI alignment issues"
```

---

## 9. Templates & Checklists

### 9.1 PRD Request Template (for Claude)

```markdown
# PRD Generation Request

## Project Overview
**Project Name:** [Name]
**Project Type:** [Web App / Mobile App / API / Tool / etc.]
**Target Platform:** [Web / iOS / Android / Desktop / etc.]

## Problem Statement
[Describe the problem this project solves in 2-3 sentences]

## Target Users
- **Primary:** [Description]
- **Secondary:** [Description]

## Core Features
1. **[Feature Name]**
   - Description: [What it does]
   - Priority: [Must Have / Should Have / Nice to Have]

2. **[Feature Name]**
   - Description: [What it does]
   - Priority: [Must Have / Should Have / Nice to Have]

[Add more features as needed]

## Technical Constraints
- **Hosting:** [Requirements]
- **Performance:** [Requirements]
- **Security:** [Requirements]
- **Integrations:** [Required integrations]

## Success Criteria
- [Measurable outcome 1]
- [Measurable outcome 2]

## Timeline
- **MVP Target:** [Date or timeframe]
- **Full Release:** [Date or timeframe]

---

Please generate a comprehensive PRD document as an artifact based on this brief.
```

### 9.2 System Prompt Template (for Google AI Studio)

```markdown
# System Prompt Template for Google AI Studio

You are an expert software developer building [PROJECT NAME],
a [PROJECT TYPE] that [PRIMARY PURPOSE].

## Your Role
You are the sole developer responsible for implementing this
application. You write clean, production-ready code following
best practices.

## Technology Stack
- **Frontend:** [Framework/Library]
- **Backend:** [Framework/Language]
- **Database:** [Database type]
- **Styling:** [CSS framework]
- **Other:** [Other technologies]

## Coding Standards
- Use [language] best practices
- Follow [style guide] conventions
- Include error handling for all operations
- Add comments for complex logic
- Use meaningful variable and function names

## Project Context
[Paste PRD summary or key points here]

## Architecture Overview
[Paste architecture summary here]

## Output Format
When generating code:
1. Provide complete, working code (no placeholders)
2. Include all imports and dependencies
3. Add inline comments for clarity
4. Specify file paths for each code block
5. Note any setup or configuration required

## Current State
[Update this as you build]
- Completed: [List completed features]
- In Progress: [Current feature]
- Pending: [Remaining features]

---

I'm ready to help you build [PROJECT NAME].
What would you like to implement first?
```

### 9.3 Refinement Prompt Template (from Claude Code)

```markdown
# Refinement Prompt for Google AI Studio

## Issue: [Issue Title]

### Context
The following issue was identified during code analysis:
- **Severity:** [Critical / High / Medium / Low]
- **Category:** [Bug / Performance / Security / UX / etc.]
- **Location:** [File path(s)]

### Problem Description
[Detailed description of the issue]

### Current Implementation
```[language]
[Current code that has the issue]
```

### Required Fix
[Description of what needs to change]

### Prompt
```
In [file path], there is an issue with [component/function]:

[Describe the problem]

Please fix this by:
1. [Specific change 1]
2. [Specific change 2]
3. [Specific change 3]

The fixed code should:
- [Expected behavior 1]
- [Expected behavior 2]

Provide the complete updated [file/function/component].
```

### Validation
After implementing, verify:
- [ ] [Check 1]
- [ ] [Check 2]
- [ ] [Check 3]
```

### 9.4 Iteration Checklist

```markdown
# Iteration [N] Checklist

## Pre-Iteration
- [ ] Previous iteration documented
- [ ] Refinement prompts prepared
- [ ] Google AI Studio session ready
- [ ] GitHub branch created

## During Iteration

### Step 1: Execute Refinements
- [ ] Loaded current codebase context
- [ ] Executed refinement prompt 1
- [ ] Executed refinement prompt 2
- [ ] Executed refinement prompt 3
- [ ] [Add more as needed]
- [ ] All prompts completed

### Step 2: Export Code
- [ ] All changes copied/saved
- [ ] Files organized correctly
- [ ] No missing components

### Step 3: Push to GitHub
- [ ] Changes committed
- [ ] Descriptive commit message
- [ ] Pushed to correct branch
- [ ] Version tag created

### Step 4: Claude Code Analysis
- [ ] Repository accessed
- [ ] Full analysis completed
- [ ] Fixes verified
- [ ] New issues documented
- [ ] Refinement prompts generated

## Post-Iteration
- [ ] Iteration documented
- [ ] Tracking log updated
- [ ] Decision made: Continue or Release
- [ ] Next iteration planned (if continuing)

## Metrics
- Issues at start: [N]
- Issues fixed: [N]
- New issues found: [N]
- Issues remaining: [N]
```

### 9.5 Release Checklist

```markdown
# Release Checklist - Version [X.Y.Z]

## Code Quality
- [ ] All critical bugs fixed
- [ ] All high-priority bugs fixed
- [ ] No security vulnerabilities
- [ ] Performance targets met
- [ ] Code review completed (by Claude Code)

## Functionality
- [ ] All core features working
- [ ] All user flows tested
- [ ] Edge cases handled
- [ ] Error handling in place
- [ ] Fallbacks working

## Documentation
- [ ] README up to date
- [ ] Setup instructions clear
- [ ] API documented (if applicable)
- [ ] User guide available (if applicable)

## Deployment
- [ ] Environment variables documented
- [ ] Deployment instructions ready
- [ ] Rollback plan defined
- [ ] Monitoring configured

## Final Steps
- [ ] Version tag created
- [ ] Changelog updated
- [ ] Release notes written
- [ ] Stakeholders notified
- [ ] Release announced
```

---

## 10. Troubleshooting Guide

### 10.1 Common Issues & Solutions

```
TROUBLESHOOTING REFERENCE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 1: CLAUDE ARTIFACTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ISSUE: Artifact not generating
CAUSE: Request too complex or vague
SOLUTION: Break into smaller, specific requests

ISSUE: Artifact truncated
CAUSE: Content exceeds artifact limits
SOLUTION: Request in parts, combine manually

ISSUE: Downloaded file corrupted
CAUSE: Browser/download issue
SOLUTION: Try different browser, copy content manually

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 2: GOOGLE AI STUDIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ISSUE: Output cuts off mid-code
CAUSE: Token limit reached
SOLUTION: Request "Continue generating" or break into smaller features

ISSUE: Code has syntax errors
CAUSE: Incomplete generation or context missing
SOLUTION: Provide more context, request specific fix

ISSUE: Generated code doesn't match requirements
CAUSE: System prompt missing context
SOLUTION: Update system prompt with more details

ISSUE: AI forgets previous context
CAUSE: Long conversation, context limit
SOLUTION: Start new chat with updated system prompt including previous progress

ISSUE: File upload fails
CAUSE: File too large or format issue
SOLUTION: Compress files, use markdown instead of PDFs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 3: GITHUB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ISSUE: Push rejected
CAUSE: Remote has changes not in local
SOLUTION: git pull --rebase origin main, then push

ISSUE: Large files rejected
CAUSE: File exceeds GitHub limit (100MB)
SOLUTION: Use Git LFS or exclude large files

ISSUE: Sensitive data committed
CAUSE: Accidental commit of secrets
SOLUTION: Remove from history with git filter-branch, rotate credentials

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 4: CLAUDE CODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ISSUE: Cannot access repository
CAUSE: Permissions or configuration issue
SOLUTION: Check SSH keys, verify repository URL, check permissions

ISSUE: Analysis incomplete
CAUSE: Large codebase, timeout
SOLUTION: Request specific file/folder analysis, break into parts

ISSUE: Generated prompts too vague
CAUSE: Issue description unclear
SOLUTION: Request more specific prompts with code examples

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ITERATION LOOP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ISSUE: Same bug keeps returning
CAUSE: Root cause not addressed
SOLUTION: Request deeper analysis, understand why bug occurs

ISSUE: Iterations not improving quality
CAUSE: Prompts not specific enough
SOLUTION: Include more context, provide examples of expected output

ISSUE: Too many iterations
CAUSE: Scope creep, perfectionism
SOLUTION: Define clear "done" criteria, stick to requirements
```

### 10.2 Escalation Paths

```
ESCALATION MATRIX

Level 1: Self-Service
├── Check this troubleshooting guide
├── Review AI system documentation
├── Try alternative prompts
└── Search community forums

Level 2: AI Assistance
├── Ask Claude for help with the issue
├── Request diagnostic prompts
└── Get alternative approaches

Level 3: Manual Intervention
├── Debug code manually
├── Consult external resources
└── Engage human developer if needed

Level 4: Process Change
├── Document new edge case
├── Update SOP if needed
└── Create new template/checklist
```

---

## 11. Best Practices

### 11.1 Prompt Engineering Best Practices

```
EFFECTIVE PROMPTING:

DO:
✓ Be specific and detailed
✓ Provide context and examples
✓ Specify output format
✓ Break complex requests into steps
✓ Include constraints and requirements
✓ Request complete, working code
✓ Ask for explanations when needed

DON'T:
✗ Use vague language ("make it better")
✗ Assume AI remembers previous context
✗ Request everything at once
✗ Skip validation steps
✗ Ignore error messages
✗ Accept placeholder code
✗ Forget to specify file paths
```

### 11.2 Version Control Best Practices

```
VERSION CONTROL:

COMMIT MESSAGES:
- Use conventional commits format
- feat: new feature
- fix: bug fix
- docs: documentation
- refactor: code restructuring
- test: adding tests
- chore: maintenance

BRANCHING:
- Keep main/master stable
- Use feature branches for work
- Merge via pull requests
- Tag releases properly

HISTORY:
- Don't rewrite public history
- Keep commits atomic and focused
- Write meaningful messages
- Reference issues in commits
```

### 11.3 Iteration Best Practices

```
ITERATION MANAGEMENT:

EFFICIENCY:
- Batch similar fixes together
- Prioritize critical issues first
- Set iteration goals
- Time-box iterations

QUALITY:
- Verify fixes before moving on
- Don't introduce new bugs
- Maintain code consistency
- Keep documentation updated

DECISION MAKING:
- Define clear exit criteria
- Avoid perfectionism
- Know when to stop
- Document decisions
```

### 11.4 Documentation Best Practices

```
DOCUMENTATION:

DURING DEVELOPMENT:
- Document as you go
- Keep PRD updated
- Log all iterations
- Save all prompts used

FOR EACH ITERATION:
- What was changed
- Why it was changed
- How to verify the change
- Any new issues discovered

FOR RELEASE:
- Complete changelog
- Updated README
- User documentation
- Known issues list
```

---

## 12. Glossary

| Term | Definition |
|------|------------|
| **Artifact** | A downloadable document generated by Claude |
| **Claude Code** | CLI tool for code analysis and development |
| **Context Document** | Supporting information uploaded to AI Studio |
| **Feature Prompt** | Specific prompt to generate one feature |
| **Google AI Studio** | Google's platform for using Gemini models |
| **Iteration** | One complete cycle through the refinement loop |
| **PRD** | Product Requirements Document |
| **Refinement Prompt** | Prompt to fix or improve existing code |
| **System Prompt** | Master instructions for AI Studio session |
| **Version Tag** | Git tag marking a release version |

---

## Appendix A: Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│           AI-ORCHESTRATED DEVELOPMENT QUICK REFERENCE        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PHASE 1: STRATEGY (Claude)                                 │
│  ├── Generate PRD (artifact)                                │
│  ├── Generate Architecture (artifact)                       │
│  ├── Generate System Prompt (artifact)                      │
│  ├── Generate Feature Prompts (artifact)                    │
│  └── Download all artifacts                                 │
│                                                              │
│  PHASE 2: BUILD (Google AI Studio)                          │
│  ├── Upload context documents                               │
│  ├── Set system prompt                                      │
│  ├── Execute feature prompts sequentially                   │
│  └── Export generated code                                  │
│                                                              │
│  PHASE 3: VERSION (GitHub)                                  │
│  ├── Push code to repository                                │
│  ├── Create descriptive commit                              │
│  └── Tag version                                            │
│                                                              │
│  PHASE 4: REFINE (Claude Code)                              │
│  ├── Analyze codebase                                       │
│  ├── Test functionality                                     │
│  ├── Identify issues                                        │
│  └── Generate refinement prompts                            │
│                                                              │
│  PHASE 5: ITERATE                                           │
│  ├── Execute refinement prompts in AI Studio                │
│  ├── Export updated code                                    │
│  ├── Push to GitHub                                         │
│  ├── Re-analyze with Claude Code                            │
│  └── Repeat until quality targets met                       │
│                                                              │
│  RELEASE when:                                               │
│  ✓ All critical bugs fixed                                  │
│  ✓ Core features working                                    │
│  ✓ Performance acceptable                                   │
│  ✓ Documentation complete                                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Appendix B: Workflow Diagram (Printable)

```
                    AI-ORCHESTRATED DEVELOPMENT WORKFLOW
                    ====================================

    ┌─────────────────────────────────────────────────────────────┐
    │                                                              │
    │     [BUSINESS REQUIREMENTS]                                  │
    │              │                                               │
    │              ▼                                               │
    │     ┌───────────────┐                                       │
    │     │    CLAUDE     │  ──────▶  PRD, Architecture,          │
    │     │  (Artifacts)  │           Prompts, Context            │
    │     └───────┬───────┘                                       │
    │             │                                                │
    │             │ Download                                       │
    │             ▼                                                │
    │     ┌───────────────┐                                       │
    │     │  GOOGLE AI    │  ──────▶  Application Code            │
    │     │    STUDIO     │                                       │
    │     └───────┬───────┘                                       │
    │             │                                                │
    │             │ Export                                         │
    │             ▼                                                │
    │     ┌───────────────┐                                       │
    │     │    GITHUB     │  ──────▶  Versioned Repository        │
    │     │               │                                       │
    │     └───────┬───────┘                                       │
    │             │                                                │
    │             │ Access                                         │
    │             ▼                                                │
    │     ┌───────────────┐                                       │
    │     │  CLAUDE CODE  │  ──────▶  Analysis, Refinement        │
    │     │               │           Prompts                     │
    │     └───────┬───────┘                                       │
    │             │                                                │
    │             │                                                │
    │             ▼                                                │
    │     ┌───────────────┐                                       │
    │     │   COMPLETE?   │──── YES ────▶  [RELEASE]              │
    │     └───────┬───────┘                                       │
    │             │                                                │
    │             │ NO                                             │
    │             │                                                │
    │             └───────────────┐                                │
    │                             │                                │
    │                             │                                │
    │     ┌───────────────────────┘                                │
    │     │                                                        │
    │     │  ITERATION LOOP                                        │
    │     │  ┌────────────────────────────────────────┐           │
    │     │  │                                         │           │
    │     │  │  Refinement Prompts                     │           │
    │     │  │         │                               │           │
    │     │  │         ▼                               │           │
    │     │  │  Google AI Studio (Fix Issues)          │           │
    │     │  │         │                               │           │
    │     │  │         ▼                               │           │
    │     │  │  GitHub (Push Updates)                  │           │
    │     │  │         │                               │           │
    │     │  │         ▼                               │           │
    │     │  │  Claude Code (Re-Analyze)               │           │
    │     │  │         │                               │           │
    │     │  │         ▼                               │           │
    │     │  │  Continue or Release?                   │           │
    │     │  │                                         │           │
    │     │  └─────────────────────────────────────────┘           │
    │     │                                                        │
    │     └────────────────────────────────────────────────────────│
    │                                                              │
    └─────────────────────────────────────────────────────────────┘

    Created: [Date]
    Version: 1.0
    Author: [Your Name/Team]
```

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | December 2024 | AI Development Team | Initial SOP creation |

---

**END OF DOCUMENT**
