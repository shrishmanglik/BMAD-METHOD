# TEF Maître App - Comprehensive Refinement Instructions for Google AI Studio

## Executive Summary

These instructions transform TEF Maître from a 1/10 to 10/10 French language learning app for TEF/TCF exam preparation and Canadian immigration. Follow each section systematically.

---

## 🎯 CRITICAL SYSTEM PROMPT (Use as Base Context)

```
You are TEF Maître, an expert French language learning system designed specifically for TEF Canada and TCF Canada exam preparation. Your primary users are immigration candidates targeting Canadian French programs (particularly Quebec).

CORE PRINCIPLES:
1. EXAM AUTHENTICITY: Every question must mirror actual TEF/TCF format, difficulty, and timing
2. LEVEL PRECISION: Strictly adhere to CEFR levels (A1-C2) and CLB equivalents (1-12)
3. ROBUSTNESS: All content must be complete, validated, and functional
4. NO REPETITION: Track and prevent question/content repetition across sessions
5. PROGRESSIVE LEARNING: Build skills systematically toward target scores

IMMIGRATION CONTEXT:
- TEF Canada minimum for Express Entry: CLB 7 (NCLC 7) = B2 level
- Quebec immigration (PEQ/QSWP): Often requires higher scores
- CRS points: Up to 136 points for language proficiency
- Understanding of NOC codes, CRS calculator, and provincial programs
```

---

## 🔊 SECTION 1: AUDIO SYSTEM ROBUSTNESS (Listening Module)

### Problem Statement
Audio not working for some listening sessions, causing incomplete practice and frustrated users.

### Refinement Instructions

```
AUDIO SYSTEM REQUIREMENTS:

1. AUDIO GENERATION PROTOCOL:
   - ALWAYS generate audio URLs from a reliable TTS service
   - Supported services: Google Cloud TTS, Amazon Polly, ElevenLabs, Azure Speech
   - NEVER leave audio fields empty or with placeholder values
   - VALIDATE audio URL accessibility before presenting to user

2. AUDIO CONTENT STRUCTURE:
   For each listening exercise, generate:
   {
     "audio_id": "unique-uuid-v4",
     "audio_url": "https://[validated-working-url]",
     "audio_duration_seconds": [number],
     "transcript": "[full text for verification]",
     "audio_type": "dialogue|monologue|announcement|interview|news",
     "speaker_count": [1-4],
     "speech_rate": "slow|normal|fast",
     "accent": "france|quebec|belgian|swiss|african",
     "background_noise": "none|light|moderate",
     "cefr_level": "A1|A2|B1|B2|C1|C2"
   }

3. FALLBACK MECHANISM:
   If audio generation fails:
   - Attempt retry with alternative TTS provider
   - If still failing, provide text-based alternative with disclaimer
   - Log failure for review
   - NEVER present exercise without working audio or explicit fallback

4. TEF/TCF LISTENING FORMATS:
   Section A (8 questions): Short dialogues, 1 listening
   Section B (6 questions): Longer recordings, 2 listenings allowed
   Section C (6 questions): Radio-style documents, 1 listening
   Section D (6 questions): Long presentations, note-taking required

5. AUDIO QUALITY REQUIREMENTS:
   - Clear pronunciation matching native French speakers
   - Appropriate speed for level (A1-A2: slower, B2-C2: natural speed)
   - Quebec accent option for TEF Canada specifically
   - Background context sounds where exam-appropriate

6. VALIDATION CHECKLIST (Run for every audio):
   [ ] Audio URL returns 200 status
   [ ] Audio duration matches expected length (±5%)
   [ ] Transcript word count reasonable for duration
   [ ] Audio plays without corruption
   [ ] Volume levels consistent
```

### Audio Exercise Generator Template

```
LISTENING EXERCISE GENERATION:

When generating a listening exercise at level [LEVEL]:

1. SELECT appropriate audio type for [LEVEL]:
   - A1-A2: Simple announcements, basic dialogues, clear speech
   - B1: Radio ads, simple interviews, voicemails
   - B2: News reports, professional discussions, lectures
   - C1-C2: Complex debates, academic presentations, nuanced discussions

2. GENERATE audio with these specifications:
   - Duration: [specify based on section type]
   - Topic: [culturally relevant to French-Canadian context]
   - Vocabulary: [strictly level-appropriate]
   - Grammar structures: [matching CEFR descriptors]

3. CREATE questions that test:
   - A1-A2: Basic comprehension, concrete information extraction
   - B1: Main ideas, speaker attitudes, simple inferences
   - B2: Detailed understanding, implicit meanings, tone
   - C1-C2: Nuanced interpretation, abstract concepts, subtle implications

4. ENSURE audio is generated and validated BEFORE presenting questions

5. PROVIDE replay controls appropriate to exam section rules
```

---

## 📝 SECTION 2: EXAM SECTION COMPLETENESS

### Problem Statement
Exam sections are missing parts and questions, creating incomplete practice experiences.

### Refinement Instructions

```
EXAM STRUCTURE ENFORCEMENT:

1. TEF CANADA COMPLETE STRUCTURE:

   COMPRÉHENSION ÉCRITE (Reading) - 60 minutes, 50 questions:
   ├── Section A: 10-12 questions (short texts, signs, ads)
   ├── Section B: 10-12 questions (medium texts, articles)
   ├── Section C: 12-15 questions (long texts, arguments)
   └── Section D: 12-15 questions (complex texts, synthesis)

   COMPRÉHENSION ORALE (Listening) - 40 minutes, 40 questions:
   ├── Section A: 8 questions (short dialogues)
   ├── Section B: 6 questions (longer recordings)
   ├── Section C: 6 questions (radio documents)
   └── Section D: 6 questions (presentations)
   └── [Additional sections to reach 40 total]

   EXPRESSION ÉCRITE (Writing) - 60 minutes, 2 tasks:
   ├── Task 1: Report/summary (200+ words)
   └── Task 2: Argumentative essay (300+ words)

   EXPRESSION ORALE (Speaking) - 15 minutes, 2 tasks:
   ├── Task 1: Information gathering (5 min)
   └── Task 2: Argumentation/debate (10 min)

2. TCF CANADA COMPLETE STRUCTURE:

   COMPRÉHENSION ÉCRITE (Reading) - 60 minutes, 39 questions:
   ├── Questions 1-10: Level A1-A2 texts
   ├── Questions 11-25: Level B1-B2 texts
   └── Questions 26-39: Level C1-C2 texts

   COMPRÉHENSION ORALE (Listening) - 35 minutes, 29 questions:
   ├── Questions 1-8: Level A1-A2 audio
   ├── Questions 9-18: Level B1-B2 audio
   └── Questions 19-29: Level C1-C2 audio

   EXPRESSION ÉCRITE (Writing) - 60 minutes, 3 tasks:
   ├── Task 1: Message (60-120 words) - A1-A2
   ├── Task 2: Article/letter (120-180 words) - B1-B2
   └── Task 3: Essay (180-250 words) - C1-C2

   EXPRESSION ORALE (Speaking) - 12 minutes, 3 tasks:
   ├── Task 1: Interview (2 min) - A1-A2
   ├── Task 2: Interaction (5.5 min) - B1-B2
   └── Task 3: Expression of viewpoint (4.5 min) - C1-C2

3. COMPLETENESS VALIDATION:

   Before presenting ANY exam or practice session:

   VALIDATION_CHECKLIST = {
     "total_questions_generated": [must match exam spec],
     "all_sections_present": [boolean - must be true],
     "each_section_complete": {
       "section_a": {"required": X, "generated": X, "valid": true},
       "section_b": {"required": X, "generated": X, "valid": true},
       // ... for all sections
     },
     "question_types_balanced": true,
     "difficulty_distribution_correct": true,
     "time_allocation_set": true,
     "all_answers_provided": true,
     "all_explanations_ready": true
   }

   IF any validation fails → DO NOT present exam → regenerate missing parts

4. SECTION GENERATION PROTOCOL:

   For each exam section:
   a) Determine required question count from exam specification
   b) Generate questions incrementally until count met
   c) Validate each question for completeness
   d) Verify answer options are complete and correct
   e) Ensure explanation/rationale exists
   f) Check for level-appropriateness
   g) Only proceed when section is 100% complete

5. PARTIAL EXAM PREVENTION:

   NEVER present an exam/session if:
   - Any section has < 100% of required questions
   - Any question lacks all answer options
   - Any listening question lacks working audio
   - Any writing task lacks clear instructions
   - Any speaking task lacks scenario setup

   Instead: Complete generation before presentation
```

### Exam Content Completeness Template

```
EXAM SESSION GENERATOR:

When user requests [EXAM_TYPE] practice:

1. INITIALIZE session structure:
   session = {
     "exam_type": "[TEF|TCF]_[section]",
     "target_questions": [exact count per spec],
     "sections": [initialize all required sections],
     "completion_status": "generating"
   }

2. FOR EACH section in exam:
   a) Calculate required questions for section
   b) Generate questions until section.count == required
   c) Validate each question:
      - Has stem/prompt
      - Has all answer options (usually 4)
      - Has correct answer marked
      - Has explanation
      - Has level tag
      - [For listening] Has working audio
      - [For reading] Has passage text
   d) Mark section complete only when validated

3. FINAL VALIDATION:
   - Sum all section questions
   - Verify total matches exam specification
   - Verify no duplicate questions
   - Verify difficulty distribution

4. PRESENT exam only after completion_status == "complete"

5. IF generation interrupted:
   - Save progress
   - Resume from last complete question
   - Never present partial results as complete
```

---

## 🔄 SECTION 3: QUESTION REPETITION PREVENTION

### Problem Statement
Users experiencing repeated questions across sessions, reducing learning effectiveness.

### Refinement Instructions

```
QUESTION DEDUPLICATION SYSTEM:

1. QUESTION FINGERPRINTING:

   For every generated question, create unique fingerprint:

   fingerprint = hash(
     normalize(question_stem) +
     normalize(passage_text) +  // if applicable
     sort(answer_options) +
     correct_answer +
     question_type +
     topic_tags
   )

   normalize() = lowercase + remove_punctuation + remove_extra_spaces

2. SESSION TRACKING DATABASE:

   Maintain per-user question history:

   user_question_history = {
     "user_id": "xxx",
     "questions_seen": [
       {
         "fingerprint": "abc123",
         "first_seen": "2024-01-15",
         "times_seen": 1,
         "last_result": "correct|incorrect",
         "section": "reading_a",
         "level": "B1"
       }
     ],
     "total_unique_questions": 450,
     "sessions_completed": 12
   }

3. GENERATION ANTI-REPETITION PROTOCOL:

   When generating new question:

   a) Generate candidate question
   b) Calculate fingerprint
   c) Check against user_question_history
   d) IF fingerprint exists AND times_seen > 0:
      - IF user got it wrong last time AND want_review mode:
        - Allow repeat (spaced repetition)
      - ELSE:
        - Regenerate with variation
        - Ensure new fingerprint is unique
   e) IF fingerprint is unique:
      - Add to history
      - Present to user

   MAXIMUM attempts before variation: 3
   Variation strategies:
   - Change context/scenario
   - Rephrase question stem
   - Alter distractor options
   - Use different text passage
   - Change numbers/names/dates

4. SMART REVIEW MODE (Exception to no-repeat):

   Enable repetition ONLY when:
   - User explicitly requests review
   - Spaced repetition algorithm triggers
   - User previously answered incorrectly
   - Minimum 7 days since last exposure

   Even in review mode:
   - Maximum 20% of session can be repeats
   - Always inform user "Review Question" badge

5. CONTENT POOL MANAGEMENT:

   Track content pool exhaustion:

   content_pool = {
     "reading_a1": {"total": 200, "user_seen": 45, "remaining": 155},
     "reading_a2": {"total": 250, "user_seen": 120, "remaining": 130},
     // ... for each section/level
   }

   IF remaining < 10% of total:
   - Generate new unique content
   - Notify user of achievement ("You've mastered 90% of our question bank!")
   - Offer variation-based questions

6. CROSS-SESSION DEDUPLICATION:

   Prevent repeats not just within session but across:
   - Different practice modes (quick practice vs full exam)
   - Different dates
   - Different devices (sync history)

   Implement via persistent user profile storage
```

### Question Variation Generator

```
VARIATION GENERATION PROTOCOL:

When a question fingerprint matches existing:

ORIGINAL_QUESTION = {
  "stem": "Selon le texte, pourquoi Marie a-t-elle déménagé à Montréal?",
  "passage": "[passage about Marie moving to Montreal for work]",
  "options": ["Pour le travail", "Pour ses études", "Pour sa famille", "Pour le climat"],
  "correct": "Pour le travail"
}

VARIATION_STRATEGIES:

Strategy 1 - Character Swap:
- Replace "Marie" → "Sophie", "Jean", "Ahmed"
- Replace "Montréal" → "Québec", "Toronto", "Vancouver"
- Adjust passage accordingly

Strategy 2 - Reason Swap:
- Change motivation: work → studies, family, love
- Adjust all related content

Strategy 3 - Context Swap:
- Same grammatical structure
- Completely different scenario
- Example: Moving → Changing jobs → Starting business

Strategy 4 - Question Angle Swap:
- Original: "pourquoi" (why)
- Variation: "quand" (when), "comment" (how), "où" (where)

Strategy 5 - Format Swap:
- Multiple choice → True/False
- Direct question → Complete the sentence
- Explicit → Inference required

APPLY variation until new fingerprint is unique
```

---

## 🎯 SECTION 4: LEVEL-APPROPRIATE TEST SIMULATOR

### Problem Statement
Test simulator questions don't match selected difficulty level; assessments are miscalibrated.

### Refinement Instructions

```
LEVEL ENFORCEMENT SYSTEM:

1. CEFR LEVEL DEFINITIONS (Strict Criteria):

   A1 (Breakthrough) - CLB 1-2:
   ├── Vocabulary: ~500 words, concrete nouns, basic verbs
   ├── Grammar: Present tense, simple sentences, basic questions
   ├── Topics: Self, family, basic needs, numbers, time
   ├── Text length: 30-50 words max
   ├── Audio speed: 100-120 words/minute, clear articulation
   └── Tasks: Fill basic forms, simple greetings, identify single facts

   A2 (Waystage) - CLB 3-4:
   ├── Vocabulary: ~1000 words, daily life, common adjectives
   ├── Grammar: Past tense (passé composé), basic connectors
   ├── Topics: Shopping, travel, daily routines, simple opinions
   ├── Text length: 50-100 words
   ├── Audio speed: 120-140 words/minute
   └── Tasks: Short messages, routine information exchange

   B1 (Threshold) - CLB 5-6:
   ├── Vocabulary: ~2000 words, abstract concepts introduced
   ├── Grammar: Imperfect, future, conditionals, relative clauses
   ├── Topics: Work, education, current events, personal experiences
   ├── Text length: 150-250 words
   ├── Audio speed: 140-160 words/minute
   └── Tasks: Main points extraction, simple arguments, personal letters

   B2 (Vantage) - CLB 7-8:
   ├── Vocabulary: ~4000 words, professional terminology
   ├── Grammar: Subjunctive, complex sentences, all tenses
   ├── Topics: Professional, social issues, abstract discussions
   ├── Text length: 300-500 words
   ├── Audio speed: 160-180 words/minute
   └── Tasks: Detailed comprehension, argumentation, formal writing

   C1 (Advanced) - CLB 9-10:
   ├── Vocabulary: ~8000 words, nuanced expressions, idioms
   ├── Grammar: Sophisticated structures, literary tenses
   ├── Topics: Complex social/professional, specialized fields
   ├── Text length: 500-800 words
   ├── Audio speed: 180-200 words/minute, natural speech
   └── Tasks: Implicit meanings, restructuring, synthesis

   C2 (Mastery) - CLB 11-12:
   ├── Vocabulary: ~16000 words, rare expressions, register shifts
   ├── Grammar: All structures including archaic/literary
   ├── Topics: Any topic including highly specialized
   ├── Text length: 800+ words
   ├── Audio speed: Natural native speed with accents/dialects
   └── Tasks: Subtle nuances, cultural references, near-native performance

2. LEVEL VALIDATION ALGORITHM:

   For each generated question:

   function validateLevel(question, targetLevel) {
     scores = {
       vocabulary_score: analyzeVocabularyLevel(question.text),
       grammar_score: analyzeGrammarLevel(question.text),
       complexity_score: analyzeTextComplexity(question.text),
       task_demand_score: analyzeTaskDemand(question.type),
       audio_speed_score: analyzeAudioSpeed(question.audio) // if applicable
     }

     overall_level = calculateWeightedAverage(scores)

     // Must be within ±0.5 level of target
     if (abs(overall_level - targetLevel) <= 0.5) {
       return VALID
     } else {
       return REGENERATE_AT_CORRECT_LEVEL
     }
   }

3. VOCABULARY LEVEL CHECKER:

   Maintain word frequency lists by CEFR level:
   - A1_vocabulary.json (500 most common words)
   - A2_vocabulary.json (next 500 words)
   - B1_vocabulary.json (words 1001-2000)
   - B2_vocabulary.json (words 2001-4000)
   - C1_vocabulary.json (words 4001-8000)
   - C2_vocabulary.json (words 8001+)

   For any text:
   - Tokenize all words
   - Look up each word's level
   - Calculate: 80% of words should be at or below target level
   - Remaining 20% can be one level higher (stretch vocabulary)

4. GRAMMAR STRUCTURE CHECKER:

   A1 structures: être, avoir, present tense, simple negation
   A2 structures: passé composé, futur proche, basic adverbs
   B1 structures: imparfait, conditionnel présent, relative qui/que
   B2 structures: subjonctif, plus-que-parfait, passive voice
   C1 structures: passé simple, conditionnel passé, all relatives
   C2 structures: literary tenses, archaic forms, all registers

   ENFORCE: Questions at level X should not require grammar above level X+0.5

5. QUESTION TYPE BY LEVEL:

   A1-A2:
   - Multiple choice with obvious distractors
   - True/False
   - Simple matching
   - Single fact identification

   B1-B2:
   - Multiple choice with plausible distractors
   - Main idea identification
   - Inference questions
   - Author's purpose

   C1-C2:
   - Subtle distinction questions
   - Implicit meaning inference
   - Tone/attitude identification
   - Synthesis across texts

6. LEVEL-LOCKED GENERATION:

   When user selects level [X]:

   a) Set hard constraints in generation prompt:
      "Generate a question STRICTLY at CEFR level [X].
       Vocabulary must be from A1 through [X] word lists.
       Grammar structures must not exceed [X] level.
       Text complexity must match [X] descriptors."

   b) After generation, run validation algorithm

   c) If validation fails:
      - Identify which aspect is out of level
      - Regenerate with specific correction
      - Maximum 3 regeneration attempts
      - If still failing, use pre-validated backup question

   d) Log level adherence metrics for quality monitoring
```

### Level-Appropriate Content Generator

```
LEVEL-LOCKED QUESTION GENERATOR:

Input: target_level = "[A1|A2|B1|B2|C1|C2]", section = "[reading|listening|etc]"

STEP 1: Load level constraints
constraints = LEVEL_DEFINITIONS[target_level]

STEP 2: Generate content with explicit constraints
prompt = f"""
Generate a {section} question for CEFR level {target_level}.

MANDATORY CONSTRAINTS:
- Maximum vocabulary level: {constraints.vocabulary}
- Grammar structures allowed: {constraints.grammar}
- Text length: {constraints.text_length}
- Topic areas: {constraints.topics}
- Question complexity: {constraints.task_demand}

The question MUST be answerable by a student at EXACTLY {target_level} level.
A student at level below should find it challenging.
A student at level above should find it straightforward.

DO NOT use any vocabulary, grammar, or concepts from higher levels.
"""

STEP 3: Validate generated content
validation = validateLevel(generated_question, target_level)

STEP 4: If invalid, regenerate with feedback
if not validation.valid:
    feedback = f"The generated question was level {validation.detected_level}.
                 Issues: {validation.issues}.
                 Regenerate at exactly {target_level}."
    regenerate(prompt + feedback)

STEP 5: Return only validated, level-appropriate content
```

---

## 📊 SECTION 5: ASSESSMENT & SCORING CALIBRATION

### Problem Statement
Assessment doesn't accurately reflect actual TEF/TCF scoring; misaligned with official scoring criteria.

### Refinement Instructions

```
TEF/TCF SCORING SYSTEM IMPLEMENTATION:

1. OFFICIAL TEF CANADA SCORING:

   Score Range: 0-699 per section (mapped to CEFR/NCLC)

   SCORE_TO_LEVEL_MAP = {
     "0-120": "Below A1 / NCLC 0",
     "121-180": "A1 / NCLC 1-2",
     "181-225": "A2 / NCLC 3-4",
     "226-360": "B1 / NCLC 5-6",
     "361-499": "B2 / NCLC 7-8",
     "500-598": "C1 / NCLC 9-10",
     "599-699": "C2 / NCLC 11-12"
   }

   Scoring formula per section:
   raw_score = correct_answers / total_questions
   scaled_score = apply_TEF_scaling(raw_score, section_difficulty)

   TEF uses Item Response Theory (IRT) - harder questions worth more

2. OFFICIAL TCF CANADA SCORING:

   Score Range: 100-699 per section

   SCORE_TO_LEVEL_MAP = {
     "100-199": "A1 / NCLC 1-2",
     "200-299": "A2 / NCLC 3-4",
     "300-399": "B1 / NCLC 5-6",
     "400-499": "B2 / NCLC 7-8",
     "500-599": "C1 / NCLC 9-10",
     "600-699": "C2 / NCLC 11-12"
   }

3. ADAPTIVE SCORING ALGORITHM:

   For practice exams, implement:

   function calculateScore(responses, section) {
     // Weight questions by difficulty
     let weighted_correct = 0
     let total_weight = 0

     for (response in responses) {
       question_weight = DIFFICULTY_WEIGHTS[response.question.level]
       total_weight += question_weight

       if (response.is_correct) {
         weighted_correct += question_weight
       }
     }

     // Calculate raw percentage
     raw_percentage = weighted_correct / total_weight

     // Apply section-specific scaling curve
     scaled_score = applyScalingCurve(raw_percentage, section)

     // Map to official score range
     official_score = Math.round(scaled_score * (699 - 100) + 100)

     return {
       raw_percentage: raw_percentage,
       scaled_score: scaled_score,
       official_equivalent: official_score,
       cefr_level: mapToLevel(official_score),
       nclc_level: mapToNCLC(official_score)
     }
   }

4. DIFFICULTY WEIGHTS:

   A1 questions: weight = 1.0
   A2 questions: weight = 1.2
   B1 questions: weight = 1.5
   B2 questions: weight = 2.0
   C1 questions: weight = 2.5
   C2 questions: weight = 3.0

   This means correctly answering a C2 question contributes 3x more than an A1 question.

5. SECTION-SPECIFIC SCORING:

   COMPREHENSION ÉCRITE (Reading):
   - Speed bonus: +5% if completed in < 80% of time limit
   - Accuracy focus: No partial credit
   - Wrong answer penalty: None (no negative marking)

   COMPREHENSION ORALE (Listening):
   - First-listen bonus: +3% for questions answered correctly on first play
   - No replay penalty for exam sections that allow replays

   EXPRESSION ÉCRITE (Writing):
   - Multi-criteria scoring (see rubric below)
   - Holistic + analytic combined approach

   EXPRESSION ORALE (Speaking):
   - Multi-criteria scoring (see rubric below)
   - Pronunciation, fluency, vocabulary, grammar, task completion

6. WRITING ASSESSMENT RUBRIC:

   Score each criterion 0-5, then weight:

   CRITERION_WEIGHTS = {
     "task_completion": 0.25,      // Did they answer the prompt fully?
     "coherence": 0.20,            // Logical flow, connectors, organization
     "vocabulary_range": 0.20,     // Appropriate, varied word choice
     "grammatical_accuracy": 0.20, // Correct grammar usage
     "grammatical_range": 0.15     // Variety of structures used
   }

   For each criterion, level descriptors:
   5 = C1-C2 performance
   4 = B2 performance
   3 = B1 performance
   2 = A2 performance
   1 = A1 performance
   0 = Below A1 / Incomprehensible

7. SPEAKING ASSESSMENT RUBRIC:

   CRITERION_WEIGHTS = {
     "task_completion": 0.20,
     "fluency": 0.20,
     "pronunciation": 0.15,
     "vocabulary_range": 0.15,
     "grammatical_accuracy": 0.15,
     "interaction": 0.15
   }

8. CRS POINTS CALCULATOR INTEGRATION:

   Express Entry CRS points for language:

   FIRST_LANGUAGE_POINTS = {
     "CLB_4_or_less": 0,
     "CLB_5": 1,
     "CLB_6": 1,
     "CLB_7": 4,
     "CLB_8": 5,
     "CLB_9": 6,
     "CLB_10+": 6
   } // Per ability (reading, writing, listening, speaking)
   // Maximum: 24 points (6 x 4 abilities)

   SECOND_LANGUAGE_POINTS = {
     "CLB_5_6": 1,
     "CLB_7_8": 3,
     "CLB_9+": 6
   } // Per ability
   // Maximum: 24 points

   Display to user:
   "Your estimated score: [score]
    CEFR Level: [level]
    NCLC/CLB Equivalent: [clb]
    Potential CRS Points (first language): [points] per ability
    Total potential CRS language points: [total]"

9. SCORE RELIABILITY INDICATOR:

   Show confidence level based on:
   - Number of questions answered (more = more reliable)
   - Consistency of performance (stable = more reliable)
   - Time taken (rushed = less reliable)

   Display: "Score reliability: High/Medium/Low"

   If Low: "Complete more questions for accurate assessment"
```

### Assessment Report Generator

```
COMPREHENSIVE ASSESSMENT REPORT:

After each practice session, generate:

{
  "session_summary": {
    "date": "[timestamp]",
    "section": "[reading|listening|writing|speaking]",
    "duration": "[time taken]",
    "questions_answered": [count]
  },

  "scores": {
    "raw_percentage": [0-100],
    "weighted_score": [0-100],
    "estimated_official_score": [100-699],
    "cefr_level": "[A1-C2]",
    "nclc_level": "[1-12]",
    "crs_points_equivalent": [0-6]
  },

  "performance_breakdown": {
    "by_level": {
      "A1_questions": {"correct": X, "total": Y, "percentage": Z},
      "A2_questions": {"correct": X, "total": Y, "percentage": Z},
      // ... for each level
    },
    "by_skill": {
      "vocabulary": {"score": X, "level": "B1"},
      "grammar": {"score": X, "level": "B2"},
      "comprehension": {"score": X, "level": "B1"}
    }
  },

  "strengths": [
    "Strong vocabulary at B1 level",
    "Good grasp of passé composé"
  ],

  "areas_for_improvement": [
    "Subjunctive mood needs practice",
    "Inference questions below target"
  ],

  "recommended_next_steps": [
    "Complete 10 more B2 reading exercises",
    "Review subjunctive formation rules",
    "Practice with longer audio passages"
  ],

  "progress_tracking": {
    "sessions_completed": [total],
    "average_score_trend": "[improving|stable|declining]",
    "estimated_days_to_target": [number]
  }
}
```

---

## 🏆 SECTION 6: QUALITY ASSURANCE FRAMEWORK

### Comprehensive QA Checklist

```
BEFORE RELEASING ANY FEATURE TO USERS:

1. CONTENT COMPLETENESS:
   [ ] All exam sections have 100% of required questions
   [ ] No placeholder text remains
   [ ] All audio files are generated and accessible
   [ ] All images/diagrams are loaded
   [ ] All answer options present (no missing choices)
   [ ] All explanations written

2. LEVEL ACCURACY:
   [ ] Each question validated against CEFR descriptors
   [ ] Vocabulary within level bounds
   [ ] Grammar structures appropriate
   [ ] Text complexity matches level
   [ ] Audio speed appropriate

3. TECHNICAL ROBUSTNESS:
   [ ] Audio plays on all browsers (Chrome, Safari, Firefox)
   [ ] Audio plays on mobile devices
   [ ] Loading states handle slow connections
   [ ] Error states display helpful messages
   [ ] Offline mode graceful degradation

4. USER EXPERIENCE:
   [ ] Clear instructions before each exercise
   [ ] Timer visible and accurate
   [ ] Progress indicator shows completion
   [ ] Easy navigation between questions
   [ ] Review mode available after completion

5. ASSESSMENT ACCURACY:
   [ ] Scoring matches official formula
   [ ] Level mapping is correct
   [ ] CRS points calculation verified
   [ ] Progress tracking updates correctly

6. ANTI-REPETITION:
   [ ] No duplicate questions in same session
   [ ] Cross-session repetition tracked
   [ ] Variation system working
   [ ] User history persisted

7. IMMIGRATION RELEVANCE:
   [ ] Content reflects Canadian French context
   [ ] Quebec-specific content where appropriate
   [ ] Immigration terminology included
   [ ] CRS/Express Entry integration accurate
```

### Quality Metrics Dashboard

```
TRACK THESE METRICS:

USER ENGAGEMENT:
- Daily active users
- Session completion rate
- Average session duration
- Feature usage distribution

CONTENT QUALITY:
- Question generation success rate (target: >98%)
- Audio generation success rate (target: >99%)
- Level validation pass rate (target: >95%)
- User-reported content issues

LEARNING OUTCOMES:
- Average score improvement over time
- Level progression rate
- Target achievement rate (users reaching CLB 7+)
- User retention (30-day, 90-day)

TECHNICAL HEALTH:
- Audio playback success rate
- Page load times
- Error rates by feature
- API response times
```

---

## 🚀 IMPLEMENTATION PRIORITY

### Phase 1: Critical Fixes (Week 1)
1. ✅ Fix audio generation and playback
2. ✅ Ensure exam section completeness
3. ✅ Implement level validation

### Phase 2: Core Improvements (Week 2)
4. ✅ Question deduplication system
5. ✅ Accurate scoring implementation
6. ✅ CRS points integration

### Phase 3: Polish (Week 3)
7. ✅ Comprehensive assessment reports
8. ✅ Progress tracking
9. ✅ User experience refinements

### Phase 4: Excellence (Week 4)
10. ✅ QA framework implementation
11. ✅ Metrics dashboard
12. ✅ Final testing and launch

---

## 📋 QUICK REFERENCE PROMPTS

### For Reading Question Generation:
```
Generate a TEF Canada reading comprehension question at CEFR [LEVEL].
Include: passage text, question, 4 answer options, correct answer, explanation.
Ensure vocabulary and grammar match [LEVEL] descriptors exactly.
Topic should be relevant to French-Canadian context.
```

### For Listening Exercise Generation:
```
Generate a TEF Canada listening exercise at CEFR [LEVEL].
Provide: audio script, audio generation instructions, 4 questions per audio.
Speech rate: [LEVEL-appropriate speed] words/minute.
Include Quebec accent option.
Validate audio URL before presenting.
```

### For Writing Prompt Generation:
```
Generate a TEF Canada writing task at CEFR [LEVEL].
Include: task description, word count requirement, evaluation criteria.
Provide sample response at [LEVEL] for reference.
Include detailed rubric for self-assessment.
```

### For Speaking Task Generation:
```
Generate a TEF Canada speaking task at CEFR [LEVEL].
Include: scenario description, required elements, time limit.
Provide evaluation criteria matching official rubric.
Include example responses at different levels for calibration.
```

---

## CONCLUSION

These instructions provide a comprehensive framework for transforming TEF Maître into a professional-grade exam preparation platform. Apply each section systematically, validate thoroughly, and iterate based on user feedback.

The key differentiators that will make this a 10/10 product:
1. **Authentic exam simulation** matching real TEF/TCF format exactly
2. **Robust audio** that never fails
3. **Level-precise content** that accurately prepares users
4. **No repetition** keeping content fresh
5. **Accurate scoring** users can trust
6. **Immigration integration** showing real CRS impact
7. **Quality assurance** ensuring consistent excellence

