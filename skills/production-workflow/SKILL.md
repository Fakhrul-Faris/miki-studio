---
name: production-workflow
description: Composes the complete AI video generation workflow from script to delivery. Orchestrates directive-voice, script-direction, hero-frame-production, animation-direction, and brand-profiles into a single end-to-end process. This is the master workflow; reference it when beginning any AI video project. Triggers on AI video, Higgsfield, Sora, Runway, Kling, Veo, cinematic, movie-like, commercial, brand film, ad, video production workflow.
---

# Production Workflow: From Script to Delivery

## The Layers (This Ordering Is the Whole Point)

**Layer 0 — Directive Voice.** How every word is written. Foundation. Everything inherits this.

**Layer 1 — Script & Direction.** What is happening. Narrative structure, beats, keyframe identification.

**Layer 2 — Hero Frame & Art.** What the world is. Visual lock on the still before animation.

**Layer 3 — Animation & Camera.** What the camera does. Keyframes sequenced with named camera moves.

**Layer 4 — Brand (Optional).** Which defaults get overridden. If a brand is named, load its Call Sheet Block.

Each layer can only work if the layer beneath it stopped being tag soup.

## The Nine-Step Workflow

### STEP 1: Directive Voice Commitment

Load `directive-voice` skill.

Write your brief using the field mapping: Asset / Character, Location, Keyframe, Motion, Camera, Grade.

Run the quality gate. At least one refusal must be present.

**Deliverable:** A director's brief, ~300–500 words, written in Directive Voice.

---

### STEP 2: Script & Beat Sheet

Load `script-direction` skill.

Write the scene as a beat sheet, not as dialogue. Each beat states action and emotion.

Identify which beats are keyframes (visual intensity, emotional weight, action change) and which are transitions.

Mark at least 3 keyframes for this sequence.

**Deliverable:** A beat sheet with keyframes marked and visual intent stated for each.

---

### STEP 3: Hero Frame Production

Load `hero-frame-production` skill.

Take the first keyframe from your beat sheet (usually the entrance, the anchor frame).

Write an Art Direction Bible (one page, ~500 words). Use the template in references/art-direction-bible-template.md.

Build a lookbook: 10–20 real references (film stills, photography, paintings, architecture). Avoid AI-only references.

Specify camera body / film format with a stated reason.

Generate the hero frame using:
- Directive Voice brief + art direction bible
- Lookbook as reference
- Negative prompt (from references)

**Iterate the still.** Spend ~80% of time here. The frame must not look AI. Check against the AI tells list (references/ai-tells.md).

**Run the quality gate.** Every box must pass.

**Deliverable:** A locked hero frame + art direction bible + lookbook. Do not proceed until this is locked.

---

### STEP 4: Animation & Camera Planning

Load `animation-direction` skill.

For each keyframe from your beat sheet:

Specify:
- Shot size and composition (maintain consistency with hero frame).
- The action or revelation at this keyframe.
- One named camera move, its speed, and endpoint.
- Lens, aperture, lighting (usually inherited from hero frame unless change is motivated).

Use the "How to Direct" template from animation-direction/SKILL.md.

Reference the camera preset table (references/camera-presets.md) for exact prompt language.

**Deliverable:** Animation direction for all keyframes. Each keyframe has a brief using the template. One camera move per keyframe. Endpoints stated explicitly.

---

### STEP 5: Brand Mode (If Applicable)

If a brand is named, load `brand-profiles` skill.

Identify the brand from the profile index (Nike, OnCloud, Grab, or new).

Copy the **Call Sheet Block** from the profile.

Inject this block into your prompt assembly, after the art direction bible and before the animation direction.

The brand profile overrides:
- Palette and texture
- Edit rhythm and pacing
- Camera energy (handheld vs stabilized, etc.)
- Emotional register

Run the brand quality gate.

**Deliverable:** Call Sheet Block injected into the prompt. Brand-specific choices locked.

---

### STEP 6: Generate Hero Frame(s)

Assemble the complete hero frame prompt:

```
DIRECTIVE VOICE
[Your brief with all fields]

ART DIRECTION BIBLE
[Filled-out bible with era, palette, design, wardrobe, lighting, camera, grade]

LOOKBOOK
[Reference images or links]

CAMERA BODY / FILM FORMAT
[Chosen body with reason]

[IF BRAND MODE ACTIVE]
BRAND MODE: [BRAND NAME]
[Call Sheet Block]

NEGATIVE PROMPT
[From references/ai-tells.md]
```

Generate the hero frame.

Iterate against the AI tells. Does it look AI? Does skin look plastic? Lighting flat? Palette oversaturated? Does the frame look like memory, or like a render?

When locked, move to animation.

**Do not generate animation on a bad still.**

**Deliverable:** Final hero frame(s). All quality gates passed.

---

### STEP 7: Generate Animation

Assemble the complete animation prompt for each keyframe:

```
HERO FRAME REFERENCE
[Image of the locked hero frame]

KEYFRAME [N]: [NAME]
[Action. Composition. Camera move. Speed. Endpoint. Lens. Light. Atmosphere. Format. Grade. Refusal.]

[IF BRAND MODE ACTIVE]
BRAND CALL SHEET BLOCK
[Inserted here]

CONSISTENCY NOTES
[Character position, scale, lighting direction, matching previous keyframe]
```

Generate each keyframe animation.

Check for consistency across all keyframes:
- Character position and scale
- Lighting direction
- Prop placement
- Camera position coherence

**Deliverable:** Animated keyframes for the entire sequence. All quality gates passed. Consistency verified.

---

### STEP 8: Post-Production

Apply post-processing:
- Grade (matching the art direction bible + brand profile, if active)
- Grain (type and amount from the bible)
- Halation or vignette (if earned by format or story)
- Letterbox (if format dictates)
- Color correction (protect skin, protect sky, enforce palette limits)

Ensure consistency across all clips.

**Deliverable:** Final grade, post-processed sequence.

---

### STEP 9: Quality Gate — Full Sequence

Run the complete quality gate:

**Directive Voice:**
- [ ] Brief written in Directive Voice.
- [ ] At least one refusal present.
- [ ] No forbidden words.

**Script & Direction:**
- [ ] Beat sheet exists with keyframes marked.
- [ ] Visual intent is clear for each beat.

**Hero Frame & Art:**
- [ ] Art direction bible completed and locked.
- [ ] Specific era, place, class, weather.
- [ ] 3–5 color palette specified.
- [ ] Props show wear, repair, history.
- [ ] Skin has pores, asymmetry, texture.
- [ ] Lighting is motivated and directional.
- [ ] Still does not look AI.

**Animation & Camera:**
- [ ] One named move per keyframe.
- [ ] Move is motivated by story.
- [ ] Speed and endpoint stated.
- [ ] Parallax preserved in dolly moves.
- [ ] Camera position is consistent.
- [ ] Character scale is consistent.
- [ ] Lighting direction is consistent.

**Brand (If Active):**
- [ ] Call Sheet Block is present.
- [ ] Palette honors profile restrictions.
- [ ] Edit rhythm matches profile.
- [ ] Camera behavior matches profile.
- [ ] Video reads as the brand's decision system.

**Final:**
- [ ] Sequence does not look AI.
- [ ] Every choice is specific, not generic.
- [ ] The work is ready to ship.

---

## How This Differs from Standard Prompt Engineering

**Standard AI video prompt:**
"Cinematic slow push in. Award-winning. Shot on ARRI Alexa, 35mm anamorphic. Dramatic lighting. A woman in a kitchen. 8k. Masterpiece."

**This workflow:**
```
CHARACTER: ROSA. Seventies. No makeup. Hair tied back badly.

LOCATION: A kitchen used every day for thirty years. Linoleum worn to white 
at the sink. Dishes don't match.

CAMERA: 35mm anamorphic, wide open. We are inside her head; the street can 
blur.

LIGHT: One practical: the window. Hard light. No fill. Her face is half-lit, 
half-black.

MOTION: Push in. Slow. Stop when we see her eyes.

GRADE: Kodak Portra 400 logic. Crush blacks. Protect skin.

REFUSAL: Not a photoshoot. Not symmetrical. Not beauty lighting.

PALETTE: Dominant warm beige (#D4C5A0). Secondary pale blue (#8B9FB8). 
Accent rust (#A0533E).

ART DIRECTION BIBLE: [500 words of specific visual decisions]

NEGATIVE PROMPT: [Comprehensive list of AI tells]

[IF BRAND]: BRAND CALL SHEET BLOCK: [Brand-specific overrides]
```

The first reads as wishes. The second reads as instructions.

---

## Summary: The Production Path

1. Write the brief (directive voice).
2. Structure the narrative (beat sheet, keyframes).
3. Lock the visual world (hero frame, art direction).
4. Plan the animation (keyframes, camera moves).
5. Apply brand (if named).
6. Generate (hero frame, then animation, then post).
7. Verify consistency.
8. Deliver.

Every step depends on the one before. The order is not optional. Skip no steps. Rush no layer. The still must be locked before animation begins.

---

## References (Do Not Duplicate in This Skill)

- `directive-voice/SKILL.md` — The foundation. Read this first.
- `script-direction/SKILL.md` — Narrative structure and keyframe identification.
- `hero-frame-production/SKILL.md` — Art direction and hero frame lock.
- `animation-direction/SKILL.md` — Camera moves and animation planning.
- `brand-profiles/SKILL.md` — Brand decision systems.

All references and templates are in each skill's `references/` folder.

---

**This workflow is not a suggestion. This is how professional filmmaking happens. AI video that reads as cinema follows this path. AI video that reads as AI tries to skip steps.**
