# AI GENERATION PLATFORM SPECIFICATIONS

## VIDEO PLATFORMS

### SORA 2 PRO

**Overview:**
OpenAI's flagship video generation model, optimized for long-form coherent narratives.

**Technical Specifications:**
- Duration: 5-20 seconds
- Aspect Ratios: 16:9, 9:16, 1:1, 2.39:1
- Resolution: Up to 1080p
- Frame Rate: 24fps standard
- Audio: Native audio generation supported

**Prompt Methodology: PROSE-FIRST**

Structure:
```
═══════════════════════════════════════════════════════════════════════════════
[PROJECT TITLE]
═══════════════════════════════════════════════════════════════════════════════

CORE VISUAL CONCEPT:
[2-4 richly evocative sentences]

THEMES: [5-7 comma-separated themes]
EMOTIONAL ARC: [Act 1] → [Act 2] → [Act 3] → [Resolution]

TECHNICAL SPECIFICATIONS:
- Duration: [X] seconds
- Aspect Ratio: [ratio]
- Camera System: [ARRI/RED/Sony]
- Primary Lens: [focal length]

═══════════════════════════════════════════════════════════════════════════════
ACT [N]: [EVOCATIVE TITLE] ([START]s - [END]s)
═══════════════════════════════════════════════════════════════════════════════

SHOT [N]: [EVOCATIVE SHOT TITLE]
Duration: [X.X] seconds
Shot Type: [ECU/CU/MS/LS], [Angle]

[150-250 WORDS OF DENSE, IMMERSIVE PROSE]
[Physics through poetry. Materials through behavior.]

Camera Movement:
- START: [Poetic description of initial framing]
- MOVEMENT: [Movement with emotional purpose]
- END: [Final composition and emotional landing]

Lighting:
- Key: [Source, Kelvin, mood]
- Fill: [Ratio, emotional purpose]
- Special: [Practicals, volumetrics]
```

**Best Practices:**
- Dense prose (150-250 words per shot)
- Physics described through poetry
- Simple hand poses
- Avoid specific text
- Accept fluid dynamics limitations

**Strengths:**
- Long-horizon temporal consistency
- Complex narrative handling
- Native audio generation
- Good character consistency

**Weaknesses:**
- Fluid dynamics (liquids too viscous)
- Hand anatomy
- Specific text rendering
- Fast motion artifacts

---

### VEO 3.1

**Overview:**
Google DeepMind's video generation with priority cascade architecture.

**Technical Specifications:**
- Duration: 8 seconds maximum
- Aspect Ratios: 16:9, 9:16, 1:1
- Resolution: Up to 1080p
- Frame Rate: 24fps
- Audio: Native audio architecture

**Prompt Methodology: JSON PRIORITY CASCADE**

Structure:
```json
{
  "prompt_architecture": "GOLD_STANDARD_VEO_3.1_CINEMATIC_v1",
  "priority_cascade": "1_VIDEO_FOUNDATION → 2_CINEMATOGRAPHY → 3_MOTION_BLOCKING → 4_SUBJECT_PERFORMANCE → 5_ENVIRONMENTAL_DYNAMICS → 6_AUDIO_ARCHITECTURE → 7_POST_PRODUCTION",

  "1_VIDEO_FOUNDATION": {
    "technical_specs": {
      "duration": "8s",
      "aspect_ratio": "16:9",
      "resolution": "1080p",
      "frame_rate": "24fps"
    },
    "shot_structure": {
      "type": "single_continuous",
      "coverage": "full_narrative_arc"
    },
    "narrative_objective": "..."
  },

  "2_CINEMATOGRAPHY": {
    "camera_system": {
      "body": "ARRI Alexa Mini LF",
      "format": "Full Frame"
    },
    "shot_progression": [
      {
        "timing": "0-2s",
        "shot_type": "...",
        "movement": "..."
      }
    ],
    "lens_behavior": {
      "focal_length": "...",
      "aperture": "...",
      "focus_strategy": "..."
    }
  },

  "3_MOTION_BLOCKING": {
    "primary_subject_motion": [...],
    "environmental_motion": [...],
    "camera_shake_profile": {...}
  },

  "4_SUBJECT_PERFORMANCE": {
    "character_direction": "...",
    "micro_expressions": [...],
    "body_language": "..."
  },

  "5_ENVIRONMENTAL_DYNAMICS": {
    "atmospheric_elements": [...],
    "practical_effects": [...],
    "environmental_response": "..."
  },

  "6_AUDIO_ARCHITECTURE": {
    "ambient_layer": "...",
    "foley_elements": [...],
    "music_direction": "...",
    "sync_points": [...]
  },

  "7_POST_PRODUCTION": {
    "color_grade": "...",
    "film_emulation": "...",
    "grain_structure": "..."
  },

  "FINAL_EXECUTABLE_PROMPT": "Dense prose summary of the entire scene..."
}
```

**Best Practices:**
- Priority cascade ensures critical elements render first
- Tight emotional arcs (8s maximum)
- Single subject focus
- Strong audio architecture

**Strengths:**
- Sharper textures than competitors
- Excellent photorealism
- Strong audio architecture
- Google ecosystem integration

**Weaknesses:**
- 8-second maximum duration
- Complex multi-subject motion
- Same fluid/hand issues as others

---

### RUNWAY GEN-3 ALPHA

**Overview:**
Fast iteration video model optimized for stylization and motion control.

**Technical Specifications:**
- Duration: 5-10 seconds
- Aspect Ratios: 16:9, 9:16, 1:1
- Resolution: Up to 1080p
- Motion Control: Camera/Subject motion parameters

**Prompt Methodology: CONCISE PROSE + MOTION**

Structure:
```
[Scene description in 50-100 words]

Camera: [Movement description]
Motion: [Subject movement description]

Style: [Artistic direction]
```

**Best Practices:**
- Concise, focused prompts
- Clear motion descriptions
- Accept stylization as feature
- Fast iteration approach

**Strengths:**
- Fast generation speed
- Motion control parameters
- Good stylization options
- Quick iteration cycles

**Weaknesses:**
- Less photorealistic
- Shorter duration
- Consistency across generations

---

### KLING AI 1.6

**Overview:**
Cost-effective video generation with good motion understanding.

**Technical Specifications:**
- Duration: 5-10 seconds
- Aspect Ratios: 16:9, 9:16
- Resolution: Up to 1080p

**Prompt Methodology: SUBJECT-FOCUSED**

Structure:
```
[Clear subject description]
[Action/motion description]
[Environment brief]
[Lighting note]
```

**Best Practices:**
- Clear subject isolation
- Strong lighting specifications
- Simple motion paths
- Accept consistency variations

**Strengths:**
- Good motion understanding
- Cost-effective
- Decent quality/speed ratio

**Weaknesses:**
- Consistency issues
- Detail accuracy
- Complex scenes challenging

---

## IMAGE PLATFORMS

### MIDJOURNEY V6.1

**Overview:**
Industry-leading artistic interpretation with excellent composition.

**Technical Specifications:**
- Aspect Ratios: Any (via --ar)
- Resolution: Up to 1792x1024 native
- Upscaling: 4x available

**Prompt Methodology: EVOCATIVE PROSE + PARAMETERS**

Structure:
```
[Evocative description, 50-150 words]

--ar [aspect_ratio] --style [raw/4a/4b/4c] --sref [style_reference_url] --v 6.1 --stylize [0-1000] --chaos [0-100]
```

**Key Parameters:**
- `--ar` : Aspect ratio (16:9, 9:16, 1:1, 4:3, 3:2)
- `--style` : Style preset (raw for photorealism)
- `--sref` : Style reference URL for consistency
- `--v 6.1` : Version specification
- `--stylize` : Stylization strength (0-1000)
- `--chaos` : Variation level (0-100)

**Best Practices:**
- Evocative, poetic descriptions
- Use --sref for series consistency
- --style raw for photorealism
- Avoid specific text requests

**Strengths:**
- Artistic interpretation
- Excellent composition
- Style control
- Community and tooling

**Weaknesses:**
- Text rendering
- Very specific details
- Anatomical precision

---

### DALL-E 3

**Overview:**
OpenAI's image model with excellent instruction following.

**Technical Specifications:**
- Aspect Ratios: 1:1, 16:9, 9:16
- Resolution: 1024x1024, 1792x1024, 1024x1792

**Prompt Methodology: PRECISE INSTRUCTIONS**

Structure:
```
[Detailed, specific description]
[Composition instructions]
[Style and mood direction]
[Technical specifications]
```

**Best Practices:**
- Precise, detailed instructions
- Clear composition requests
- Can handle text better than most
- Good for specific layouts

**Strengths:**
- Instruction following
- Text rendering (better than MJ)
- Predictable outputs
- API integration

**Weaknesses:**
- Less artistic interpretation
- Some style limitations
- Consistency across generations

---

### IDEOGRAM 2.0

**Overview:**
Specialized for text rendering and typography.

**Technical Specifications:**
- Aspect Ratios: Various
- Resolution: High quality

**Prompt Methodology: TEXT-OPTIMIZED**

Structure:
```
[Scene description]
Text: "[Exact text to render]"
[Typography direction]
[Style notes]
```

**Best Practices:**
- Specify exact text in quotes
- Clear typography direction
- Simple compositions
- Logo-friendly

**Strengths:**
- Text rendering
- Logo generation
- Typography control

**Weaknesses:**
- Less artistic
- Limited style range
- Complex scenes

---

### FLUX PRO

**Overview:**
Black Forest Labs' photorealistic image model.

**Technical Specifications:**
- Aspect Ratios: Various
- Resolution: High quality
- Photorealism focus

**Prompt Methodology: TECHNICAL PRECISION**

Structure:
```
[Technical photographic description]
[Camera and lens simulation]
[Lighting specifications]
[Post-processing notes]
```

**Best Practices:**
- Photographic language
- Technical precision
- Camera simulation
- Lighting detail

**Strengths:**
- Photorealism
- Fine detail
- Technical precision
- Realistic lighting

**Weaknesses:**
- Creative interpretation
- Artistic styles
- Abstract concepts

---

## AUDIO PLATFORMS

### ELEVENLABS

**Overview:**
Industry-leading voice synthesis and cloning.

**Capabilities:**
- Voice cloning
- Text-to-speech
- Voice design
- Multilingual support

**Best Practices:**
- Clear script formatting
- Emotion/delivery notes
- Pacing markers
- Character voice profiles

### SUNO

**Overview:**
AI music generation from text prompts.

**Capabilities:**
- Full song generation
- Style specification
- Lyrics integration
- Instrumental tracks

**Best Practices:**
- Genre specification
- Tempo and mood
- Structural notes
- Reference styles

---

## PLATFORM SELECTION MATRIX

| Use Case | Primary | Secondary |
|----------|---------|-----------|
| Long narrative (15-20s) | Sora 2 Pro | - |
| Short punchy (5-8s) | VEO 3.1 | Runway Gen-3 |
| Fast iteration | Runway Gen-3 | Kling 1.6 |
| Budget production | Kling 1.6 | Runway Gen-3 |
| Artistic image | Midjourney | Flux Pro |
| Precise image | DALL-E 3 | Flux Pro |
| Text/logo image | Ideogram 2.0 | DALL-E 3 |
| Photorealistic image | Flux Pro | Midjourney --style raw |
