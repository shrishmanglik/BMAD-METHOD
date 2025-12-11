# Discovery Kickoff - Workflow Instructions

## Critical Execution Rules

- Execute ALL steps in exact order - NO skipping
- Communicate in {{communication_style}} style
- Always address client as {{client_name}}
- Save progress after each major section
- Validate each section before proceeding

---

## Step 1: Initialize and Load Context

**Goal:** Set up the kickoff session and load all available context

### Actions:
1. Load client profile from `{client_profile}` if available
2. Load any existing engagement documents from `{engagement_docs}`
3. Check for previous engagement history with this client
4. Initialize the output document from template

### Outputs:
- Confirm client name and engagement type
- List available context documents
- Identify any gaps in information

### Checkpoint:
Ask user to confirm context is complete or provide additional information.

---

## Step 2: Executive Summary

**Goal:** Capture high-level engagement overview

### Actions:
1. Ask user to describe the engagement in 2-3 sentences
2. Identify the primary business driver
3. Summarize expected outcomes

### Questions to Ask:
- "What is the primary business problem we're solving?"
- "What does success look like for this engagement?"
- "What is the timeline expectation?"

### Template Output: `{{executive_summary}}`

---

## Step 3: Engagement Overview

**Goal:** Document detailed engagement context

### 3.1 Background
Ask about:
- How did this engagement originate?
- What has the client tried before?
- What is the current state?

### 3.2 Objectives
Elicit SMART objectives:
- Specific: What exactly will be achieved?
- Measurable: How will we measure success?
- Achievable: Is this realistic?
- Relevant: Why does this matter?
- Time-bound: What is the timeline?

### 3.3 Scope
Define boundaries:
- What IS included?
- What is explicitly OUT of scope?
- What might be considered in future phases?

### 3.4 Success Criteria
Define measurable success criteria:
- Business metrics
- Technical metrics
- User satisfaction metrics

### Template Outputs:
- `{{engagement_background}}`
- `{{engagement_objectives}}`
- `{{engagement_scope}}`
- `{{success_criteria}}`

---

## Step 4: Stakeholder Analysis

**Goal:** Map all stakeholders and their needs

### 4.1 Identify Stakeholders
For each stakeholder, capture:
- Name and role
- Level of influence (High/Medium/Low)
- Level of interest (High/Medium/Low)
- Communication preference (Email/Meeting/Report)
- Key concerns or priorities

### 4.2 Create Stakeholder Map
Categorize stakeholders:
- **Manage Closely:** High influence, high interest
- **Keep Satisfied:** High influence, low interest
- **Keep Informed:** Low influence, high interest
- **Monitor:** Low influence, low interest

### 4.3 Communication Plan
For each stakeholder category, define:
- Communication frequency
- Communication method
- Key messages
- Responsible party

### Template Outputs:
- `{{stakeholder_table}}`
- `{{stakeholder_map}}`
- `{{communication_plan}}`

---

## Step 5: Discovery Approach

**Goal:** Define how discovery will be conducted

### 5.1 Methodology
Select appropriate approach:
- Design Thinking
- Lean Discovery
- Traditional Requirements
- Hybrid

### 5.2 Key Activities
Identify discovery activities:
- Stakeholder interviews
- Document review
- System demonstrations
- Workshops
- Surveys

### 5.3 Timeline
Create discovery timeline with:
- Start and end dates
- Key milestones
- Dependencies

### Template Outputs:
- `{{discovery_methodology}}`
- `{{discovery_activities}}`
- `{{discovery_timeline}}`

---

## Step 6: Information Requirements

**Goal:** Identify all information needed for discovery

### 6.1 Documents
List required documents:
- Existing documentation
- Process documents
- Technical specifications
- Reports or analytics

### 6.2 Systems Access
Identify systems to review:
- System name and purpose
- Type of access needed
- Point of contact

### 6.3 Interviews
Plan interviews:
- Who needs to be interviewed?
- What topics to cover?
- Estimated duration?

### Template Outputs:
- `{{documents_needed}}`
- `{{systems_access}}`
- `{{interviews_planned}}`

---

## Step 7: Risks and Assumptions

**Goal:** Document initial risks and assumptions

### 7.1 Assumptions
Document all assumptions:
- Business assumptions
- Technical assumptions
- Resource assumptions
- Timeline assumptions

### 7.2 Risks
For each risk, capture:
- Description
- Likelihood (High/Medium/Low)
- Impact (High/Medium/Low)
- Mitigation strategy
- Owner

### 7.3 Dependencies
List dependencies:
- Internal dependencies
- External dependencies
- Client dependencies

### Template Outputs:
- `{{assumptions}}`
- `{{risks_table}}`
- `{{dependencies}}`

---

## Step 8: Team and Resources

**Goal:** Document team composition and needs

### 8.1 Engagement Team
List our team:
- Name and role
- Allocation percentage
- Key responsibilities

### 8.2 Client Team
List client participants:
- Name and role
- Availability
- Key responsibilities

### 8.3 Resource Requirements
Identify needs:
- Skills required
- Tools needed
- Budget considerations

### Template Outputs:
- `{{engagement_team}}`
- `{{client_team}}`
- `{{resource_requirements}}`

---

## Step 9: Logistics

**Goal:** Establish working logistics

### 9.1 Meeting Schedule
Define recurring meetings:
- Daily standups?
- Weekly status?
- Steering committee?

### 9.2 Tools and Access
Confirm tools:
- Project management tool
- Communication channels
- Document repository
- Access requests needed

### 9.3 Working Agreements
Establish norms:
- Working hours
- Response time expectations
- Escalation path
- Decision-making process

### Template Outputs:
- `{{meeting_schedule}}`
- `{{tools_access}}`
- `{{working_agreements}}`

---

## Step 10: Next Steps and Validation

**Goal:** Define immediate actions and validate document

### 10.1 Immediate Actions
List actions for next 48 hours:
- Who is responsible?
- What is the deadline?

### 10.2 First Week Priorities
Define week 1 focus:
- Key activities
- Expected deliverables
- Critical meetings

### 10.3 Key Milestones
Identify near-term milestones:
- Discovery complete date
- Key review points
- Decision gates

### Template Outputs:
- `{{immediate_actions}}`
- `{{first_week_priorities}}`
- `{{key_milestones}}`

---

## Step 11: Finalize and Validate

**Goal:** Complete document and validate

### Actions:
1. Fill in appendix sections
2. Run validation checklist
3. Generate final document
4. Confirm next steps with user

### Validation:
Execute validation against `{validation}` checklist.

### Output:
Display summary and confirm document location.

---

## Completion

Upon completion:
1. Save final document to `{default_output_file}`
2. Display summary of key items
3. Suggest next workflow: `requirements-gathering`
4. Offer to schedule follow-up activities
