# AI VIDEO GENERATION — FORENSIC FINDINGS DATABASE

## THE FUNDAMENTAL INSIGHT

**AI video generators don't understand physics — they understand what things LOOK LIKE.**

The AI minimizes PIXEL difference from training data, not PHYSICS errors. If something LOOKS 99% correct, the AI is satisfied — even if it violates physical laws.

**Therefore:** Describe VISUAL APPEARANCE, not physical constraints. Paint what the final frame LOOKS LIKE, not the physics that produced it.

---

## CRITICAL FAILURE MODES & SOLUTIONS

### 1. THE "HONEY EFFECT" — Fluid Dynamics

**Problem:** AI renders ALL liquids too viscous. Water behaves like motor oil. Streams don't break into droplets. Splashes move in slow motion.

**Why It Happens:** Training data contains more close-up, slow-motion liquid footage where viscosity appears higher.

**Solution:** Describe the VISUAL APPEARANCE of proper flow, not physics.

| ❌ CONSTRAINT (Fails) | ✅ PROSE (Works) |
|----------------------|------------------|
| "Viscosity: 1.2 cP, turbulent flow" | "Water shattering into crystalline shards" |
| "Reynolds number >4000" | "Streams thickening as pressure builds" |
| "Surface tension: 72 dynes/cm" | "Surface tension surrendering to gravity" |
| "Laminar flow profile" | "Descending with viscous deliberation" |

**Liquid Behavior Reference:**

| Liquid | Real Viscosity | AI Tendency | Prose Translation |
|--------|----------------|-------------|-------------------|
| Water | 1 cP | Renders as 50+ cP | "Exploding into crystalline shards" |
| Wine | 2 cP | Renders as 100+ cP | "Cascading in ruby ribbons" |
| Coffee | 1.5 cP | Renders as 80+ cP | "Dark as secrets, steam rising" |
| Milk | 3 cP | Acceptable | "White clouds blooming" |
| Oil | 80 cP | Acceptable | "Golden viscosity sliding with patience" |
| Cream | 200 cP | Acceptable | "Thick ribbons descending with weight" |
| Honey | 10,000 cP | Often too thin | "Golden ropes stretching, resisting gravity" |

---

### 2. HAND ANATOMY DISASTERS

**Problem:** No inverse kinematics solver. Impossible joint angles, webbing between fingers, digit count fluctuation (4-7 fingers), thumbs on wrong side.

**Why It Happens:** Hands have complex articulation with 27 bones and 14 degrees of freedom. AI pattern-matches without understanding structure.

**Solution:** Keep hand poses simple. Describe expected visual outcome, not anatomical correctness.

| ❌ CONSTRAINT (Fails) | ✅ PROSE (Works) |
|----------------------|------------------|
| "Hand Digits: 5 (LOCKED)" | "Fingers settling into familiar positions" |
| "Phalangeal Structure: Integrity enforced" | "Hands finding their accustomed grip" |
| "FORBIDDEN: finger fusion" | "Each finger positioned with unconscious precision" |
| "Thumb opposition: anatomically correct" | "Thumb and forefinger meeting with practiced ease" |

**Safe Hand Poses:**
- Relaxed open (all fingers slightly curved)
- Simple grip (wrapped around cylindrical object)
- Resting on surface (palm down, fingers relaxed)
- Gesture with index (pointing, but minimizing visible fingers)

**Dangerous Hand Poses:**
- Complex grips (multiple objects)
- Spread fingers (maximizes articulation errors)
- Interlocked fingers (relationship errors)
- Gestures showing all five digits clearly
- Fast hand movements

---

### 3. REFLECTION HALLUCINATION

**Problem:** Chrome/metal/mirror surfaces reflect environments that don't exist in the scene. Windows appear in reflections when no windows in scene. Light sources multiply.

**Why It Happens:** AI has learned that shiny surfaces contain environment information, but can't compute actual ray tracing.

**Solution:** Keep reflections vague. Describe the QUALITY of reflection, not specific content.

| ❌ CONSTRAINT (Fails) | ✅ PROSE (Works) |
|----------------------|------------------|
| "Reflection must match surrounding geometry" | "Surfaces catching ambient light" |
| "HDRI-consistent environment mapping" | "Worn to soft focus by years of cleaning" |
| "No phantom light sources" | "Brushed steel reflecting nothing specific" |
| "Mirror accuracy: 100%" | "Reflections suggesting depth beyond" |

**Safe Reflection Approaches:**
- Brushed/matte metals (diffuse reflections)
- Motion blur on reflective surfaces
- Extreme close-up (reflections indistinct)
- Dirty/worn surfaces

**Dangerous Reflection Scenarios:**
- Large chrome surfaces
- Mirrors showing room environment
- Multiple reflective surfaces
- Reflections with text/logos

---

### 4. STEAM/SMOKE/FOG MORPHING

**Problem:** Volumetric effects loop repetitively, morph unnaturally, or remain frozen. Steam doesn't rise naturally. Smoke doesn't dissipate.

**Why It Happens:** Fluid simulation is computationally expensive; AI substitutes pattern-matched textures that lack temporal coherence.

**Solution:** Use soft descriptions that accept imperfection. Frame as atmospheric rather than specific.

| ❌ CONSTRAINT (Fails) | ✅ PROSE (Works) |
|----------------------|------------------|
| "Steam: Must rise chaotically, NO looping" | "Steam rising in ephemeral wisps" |
| "Maintain thermal updraft physics" | "Vapor tendrils catching light before dissolving" |
| "Smoke particle simulation accurate" | "Atmosphere thick with possibility" |
| "Fog: consistent density gradient" | "Air heavy with morning moisture" |

**Safe Volumetric Approaches:**
- Background atmosphere (less scrutiny)
- Subtle, diffuse presence
- Backlit (hides detail issues)
- Brief visibility

**Dangerous Volumetric Scenarios:**
- Hero steam (main focus)
- Long duration visibility
- Complex interaction with objects
- Multiple volumetric layers

---

### 5. TEXT/LOGO HALLUCINATION

**Problem:** Specific text requests produce gibberish. "OMEGA" becomes "VONESTRAMOOR." Numbers scramble. Logos become abstract shapes.

**Why It Happens:** AI treats text as visual pattern, not symbolic information. Each character is a shape, not a meaningful unit.

**Solution:** Describe QUALITY/FEELING, not literal text. Avoid text entirely in hero positions.

| ❌ CONSTRAINT (Fails) | ✅ PROSE (Works) |
|----------------------|------------------|
| "Text reads: OMEGA Seamaster" | "The dial displays quiet confidence of Swiss precision" |
| "Logo: Apple Inc." | "A mark of technological elegance" |
| "Price tag: $49.99" | "A small label suggesting value" |
| "Screen shows: Settings" | "Interface elements pulsing with soft notification shapes" |

**Text Strategies:**
- Soft focus any text (bokeh)
- Angle text away from camera
- Obscure with shadow/lighting
- Use motion blur
- Keep in background
- Describe feeling, not content

---

### 6. SCREEN/UI HALLUCINATION

**Problem:** Phone screens, computer monitors, TVs show unreadable glitches or completely wrong content.

**Why It Happens:** Screen content is dynamic and context-dependent; AI can't generate coherent UI.

**Solution:** Keep screens soft-focus, abstract, or turned away.

| ❌ CONSTRAINT (Fails) | ✅ PROSE (Works) |
|----------------------|------------------|
| "iPhone shows Instagram app" | "Phone screen glowing with notification light" |
| "Laptop displays code" | "Screen casting pale light on face" |
| "TV shows news broadcast" | "Television flickering in the background" |

**Safe Screen Approaches:**
- Black/off screens
- Single color glow
- Extreme angle (screen not visible)
- Reflection only (screen facing away)
- Motion blur

---

### 7. MACRO DEPTH FLICKER

**Problem:** In extreme close-ups, thin objects drift in and out of focus unexpectedly. Focus plane appears to wander.

**Why It Happens:** AI can't maintain consistent depth maps across frames at micro scale.

**Solution:** Describe as intentional "breathing" or use deeper DOF at macro.

| ❌ CONSTRAINT (Fails) | ✅ PROSE (Works) |
|----------------------|------------------|
| "DOF: 8mm plane, constant" | "Focus plane breathing with the subject" |
| "Background blur radius: consistent" | "Depth dissolving into atmospheric washes" |
| "No focus hunting" | "The lens finding its subject with organic rhythm" |

---

### 8. TEMPORAL COHERENCE BREAKDOWN

**Problem:** Objects subtly change between frames. Textures shift. Colors drift. Proportions fluctuate.

**Why It Happens:** Each frame is generated with some independence; perfect consistency is not guaranteed.

**Solution:** Describe strong, distinctive features. Use motion to mask minor inconsistencies.

**Strategies:**
- Keep camera moving (masks frame-to-frame issues)
- Use atmospheric elements (provides visual noise)
- Strong lighting (reduces detail scrutiny)
- Consistent costume/environment colors (easier to maintain)

---

### 9. PHYSICS VIOLATIONS

**Problem:** Objects pass through each other. Gravity inconsistent. Cause-effect timing wrong.

**Why It Happens:** AI has no physics engine; it pattern-matches "what happens next" from training data.

**Solution:** Describe outcomes, not physics. Accept minor violations.

| ❌ CONSTRAINT (Fails) | ✅ PROSE (Works) |
|----------------------|------------------|
| "Objects must not intersect" | "Elements maintaining respectful distance" |
| "Gravity: 9.8 m/s²" | "Weight finding its natural path downward" |
| "Momentum conserved" | "Motion carrying through with expected force" |

---

### 10. FAST MOTION ARTIFACTS

**Problem:** Fast movement creates artifacts. Limbs stretch. Objects duplicate. Motion blur becomes smearing.

**Why It Happens:** Training data contains motion blur that AI can pattern-match, but not generate correctly.

**Solution:** Slow down key moments. Use cuts instead of fast continuous motion.

**Strategies:**
- Break fast action into slower shots
- Cut on action (hide transitions)
- Use blur as stylistic choice
- Describe "deliberate" movement

---

## PLATFORM-SPECIFIC QUIRKS

### SORA 2 PRO
- **Strengths:** Long-horizon consistency, complex narratives, native audio
- **Weaknesses:** Fluid dynamics, hand anatomy, fast motion
- **Strategy:** Prose-first methodology, simple hand poses, deliberate pacing
- **Duration:** 5-20 seconds
- **Format:** Dense prose (150-250 words/shot)

### VEO 3.1
- **Strengths:** Sharper textures, photorealism, audio architecture, Google integration
- **Weaknesses:** 8-second max, complex multi-subject motion
- **Strategy:** JSON priority cascade, tight emotional arcs, single-subject focus
- **Duration:** 8 seconds max
- **Format:** Structured JSON with priority layers

### RUNWAY GEN-3
- **Strengths:** Fast iteration, motion control, stylization options
- **Weaknesses:** Less photorealistic, shorter duration, consistency
- **Strategy:** Concise prompts, motion description, accept stylization
- **Duration:** 5-10 seconds
- **Format:** Concise prose + motion hints

### KLING 1.6
- **Strengths:** Good motion understanding, cost-effective
- **Weaknesses:** Consistency issues, detail accuracy
- **Strategy:** Clear subject isolation, strong lighting
- **Duration:** 5-10 seconds
- **Format:** Subject-focused prompt

### MIDJOURNEY V6.1
- **Strengths:** Artistic interpretation, style control, composition
- **Weaknesses:** Text rendering, specific details
- **Strategy:** Evocative prose, --sref for style consistency
- **Format:** Prose + parameters (--ar --style --sref --v 6.1)

### DALL-E 3
- **Strengths:** Instruction following, text rendering
- **Weaknesses:** Artistic consistency, some style limitations
- **Strategy:** Specific compositions, clear instructions
- **Format:** Precise instructional prose

### IDEOGRAM 2.0
- **Strengths:** Text rendering, logos, typography
- **Weaknesses:** Less artistic interpretation
- **Strategy:** Clear text specifications, simple compositions
- **Format:** Text-optimized prompts

### FLUX PRO
- **Strengths:** Photorealism, fine detail, technical precision
- **Weaknesses:** Creative interpretation
- **Strategy:** Technical precision, photographic language
- **Format:** Technical prose

---

## THE GOLDEN RULES

1. **Describe APPEARANCE, not PHYSICS**
2. **Simple hand poses ONLY**
3. **Reflections stay VAGUE**
4. **Text/logos in SOFT FOCUS**
5. **Volumetrics are ATMOSPHERIC**
6. **Accept IMPERFECTION as authenticity**
7. **Motion MASKS inconsistency**
8. **Outcomes over CONSTRAINTS**

---

## PROSE TRANSLATION EXAMPLES

### Material Properties → Poetry

| Technical | Poetic Translation |
|-----------|-------------------|
| "316L stainless steel, metalness 0.92" | "Surgical steel catching light like captured stars" |
| "Borosilicate glass, IOR 1.52" | "Glass so clear it seems to hold light hostage" |
| "Full-grain leather, 1.2mm thickness" | "Leather worn to whisper-soft by years of devotion" |
| "Walnut wood, albedo 0.32" | "Walnut carrying the warmth of forests in its grain" |
| "Cotton canvas, 12oz weight" | "Canvas heavy with possibility" |

### Physics → Poetry

| Technical | Poetic Translation |
|-----------|-------------------|
| "Laminar flow, Re < 2300" | "Liquid descending with deliberate grace" |
| "Turbulent cascade, Re > 4000" | "Water shattering into chaos" |
| "Surface tension 0.073 N/m" | "Surface tension surrendering to gravity" |
| "Viscosity 3.5 cP" | "Syrupy weight resisting haste" |
| "Heat convection 10 W/m²K" | "Warmth radiating like contentment" |

### Camera → Poetry

| Technical | Poetic Translation |
|-----------|-------------------|
| "Push-in 0.5cm/s on dolly" | "The lens breathing with the subject" |
| "Rack focus, 0.6m to 0.4m" | "Attention shifting like a whispered secret" |
| "180° shutter, 1/48s exposure" | "Motion carrying the ghost of its journey" |
| "Aperture T1.4, DOF 8mm" | "Everything but the subject dissolving into possibility" |

---

## CONTENT TYPE QUICK REFERENCE

### VIDEO CONTENT

| Category | Duration | Key Considerations |
|----------|----------|-------------------|
| **Ads** | 5-60s | Hook in 0.8s, CTA timing, platform specs |
| **Social** | 5-90s | Vertical 9:16, caption safe zones, trending hooks |
| **Narrative** | 60s-10min | Character arcs, act structure, emotional beats |
| **Corporate** | 30s-3min | Brand guidelines, talking heads, B-roll |
| **Product** | 15s-2min | Hero shots, detail reveals, use cases |
| **Cinematic** | 15s-2min | High production value, dramatic tension |

### IMAGE CONTENT

| Category | Aspect Ratios | Key Considerations |
|----------|---------------|-------------------|
| **Social Posts** | 1:1, 4:5, 9:16 | Platform templates, text overlay zones |
| **Advertising** | Variable | CTA placement, brand compliance |
| **Product** | 1:1, 4:3, 16:9 | Background removal, shadow consistency |
| **Editorial** | 16:9, 3:2 | Text wrap, visual hierarchy |
| **Concept Art** | Variable | Style consistency, detail level |
