---
name: hero-frame-production
description: Locks the visual world before animation begins. Teaches art direction bible creation, lookbook building, camera body selection, hero still generation, and iteration until the frame does not look AI. Required after script-direction, before animation-direction. Triggers on art direction, production design, AI look, plastic skin, generic AI, cinematic look, hero frame, visual bible, color script, film grain, halation, lookbook.
---

# Hero Frame Production

## Core Principle

If the still looks AI, the video will look AI. Art direction forces specific visual choices about time, place, class, material, wear, and mood before you generate a single frame. You must lock the hero frame (keyframe 1, the visual anchor) with multiple iterations until it reads as cinema, not render. Only then do you animate.

All art direction text is written in Directive Voice.

## Workflow

1. Take the hero keyframe from your script (usually beat 1, the entrance).
2. Write an Art Direction Bible (one page, ~500 words).
3. Build a lookbook of 10–20 real references (film stills, photography, paintings, architecture). Avoid AI-only references; they cause visual inbreeding.
4. Specify camera body and film format with a stated reason.
5. Generate the hero frame using the brief + bible + lookbook + negative prompt.
6. Iterate. Spend ~80% of time here. The still must not read as AI.
7. When locked, move to animation phase. Do not start animation on a bad still.
8. Run the quality gate.

## Art Direction Bible Template

Fill this out for every production. Use Directive Voice throughout. One page. No excuses.

See `references/art-direction-bible-template.md` for the detailed template with field descriptions and one worked example (the fisherman's kitchen).

## Six Pillars of Art Direction

These are the non-negotiable visual layers. Omit none.

### Pillar 1: World & Era
**What is the time, place, class, weather, and age of this space?**

Specify: Decade (or range). Geography. Social/economic context. Current season or weather. How long has this space existed? What is its purpose? One refusal: what era/place is it NOT?

Example: "1995. Coastal Portugal. Working-class fishing village. Golden hour, wind from the harbor. The kitchen exists as a shell of a 1960s build. Not aspirational. Not a restaurant. Not a vacation rental aesthetic."

### Pillar 2: Palette & Color Script
**3–5 colors, dominant + secondary + accent. No full rainbow.**

Specify: Dominant color (by area, not by emotional weight). Secondary color. Accent color. All with hex values or reference. What does NOT get saturated? What is muted?

Example: "Dominant: warm beige (linoleum, worn). Secondary: pale blue (window frame, faded paint). Accent: rust (sink hardware, oxidized). Protect skin tones from saturation. No bright primaries."

### Pillar 3: Production Design
**Materials, props, wear, clutter, damage, one refusal.**

What is on every surface? What is broken and how long has it been broken? What is repaired (badly or well)? What matches and what doesn't? One clear refusal: what kind of design is NOT here?

Example: "Linoleum worn to white. Dishes don't match. One shelf holds water bottles, rope, a broken radio. Calendar from 2019. A chair with a replaced rush seat. Not new. Not clean. Not a museum piece. Not aspirational."

### Pillar 4: Wardrobe, Hair, Makeup
**Fabric, fit, condition. Skin texture: pores, freckles, scars, sweat, stubble.**

What does the character wear? How long have they worn it? What is torn, darned, faded? What is the fiber (wool, cotton, synthetic)? For skin: pores visible? Asymmetry? Scars? Stubble? Sweat? Age showing?

Example: "Wool sweater, charcoal, darned at the elbow. Long-sleeved. Worn for ten years. The cuffs are loose. Skin: pores visible. Face asymmetrical. Forehead lined. Hands scarred from saltwater work. No makeup. Stubble shadow on the jaw, three-days grown."

### Pillar 5: Lighting & Atmosphere
**Motivated sources, direction, quality, color temperature, contrast ratio, fill policy.**

Where does light come from? Is the source visible (practical) or off-frame (motivated)? Is it hard or soft? Warm or cool? What is the ratio of bright to dark (contrast)? What is the fill policy (do shadows get fill, or do they go black)?

Example: "One practical: the window. Midday sun, hard light, one direction. Color temperature: daylight (5500K). Contrast ratio: 6:1 (bright areas 6 times brighter than shadows). Fill policy: no fill. Shadows go dark. Her face is half-lit, half-black."

### Pillar 6: Lens, Film & Post
**Camera body, film format, lens, aperture, grain, grade.**

What camera body? What film stock (if reference) or digital sensor? What lens? What aperture? Is grain present? What is the grade logic (color, contrast, saturation)?

Example: "ARRI Alexa. 35mm anamorphic. Wide open (T1.3). Visible grain (like Kodak Portra 400). Grade: Kodak Portra logic. Crush blacks. Protect skin. No saturation boost. Cool neutral with warm accent only (rust)."

## Camera Body / Film Format

Choose the format with a stated reason. Use the table below. The reason must be about the story or the image, not about defaults.

| Format | Effect | Use When | Do NOT Use When |
|---|---|---|---|
| IMAX / 15-70mm | Massive detail, exaggerated perspective, monumental scale, blockbuster energy | Epic landscapes, architectural reveals, environmental storytelling at scale, spectacle that is the story | Intimate dialogue, cramped interiors, scenes that need softness or imperfection, human-scale stories |
| ARRI Alexa | Warm, filmic, natural skin, emotional realism | Character work, dialogue, warmth, human-scale stories, skin that reads as human | Spectacle, monumentality, exaggerated scale, high-tech product focus |
| RED V-Raptor | Sharp, high-contrast, modern digital, detailed | Action, high-detail product photography, contemporary energy, technical precision | Nostalgia, texture-forward period work, soft or filmic look |
| Sony Venice | Clean, wide latitude, neutral, versatile | Versatile default, mixed environments, technical safety | Strong stylization, specific mood |
| Panavision DXL2 | Large-format digital, prestige, warm anamorphic | Prestige drama, anamorphic work, emotional depth | Lo-fi or documentary intimacy, indie aesthetic |

**IMPORTANT CAVEAT:** IMAX is powerful but not universal. Defaulting to it for everything creates a different kind of genericness — every shot monumental, hyper-detailed, emotionally flat. Reach for IMAX when scale or spectacle is the point. Reach for Alexa when skin and feeling are the point. This distinction is part of the craft.

## AI Tells to Eliminate

These are visual signatures that mark a frame as AI. If you see any of these in your generated still, iterate. Do not animate.

Full list in `references/ai-tells.md`. Quick version:

- Plastic poreless skin (add pores, asymmetry, texture)
- Perfect symmetry (break it, shift something)
- Oversaturated HDR (crush blacks, mute palette, protect skin)
- Uniform sharpness (add shallow depth of field or motion blur where appropriate)
- Empty generic environments (add props, wear, clutter, story)
- No prop wear or history (everything looks new; replace with used, repaired, mismatched)
- Flat unmotivated lighting (add hard light, shadows, directional quality)
- Centered composition with no foreground/midground/background (add depth layers)
- Inconsistency between characters or objects (lock them, run quality gate across all keyframes)
- Generic "cinematic" language (replace with specific decisions)

## Negative Prompt

Use this negative prompt for all generation. Do not soften it.

```
AI, CGI, 3D render, video game, plastic skin, oversaturated, HDR, smooth, 
generic, symmetrical, flat lighting, empty background, morphing, deformed 
hands, extra fingers, watermark, text, logo, blurry, soft focus, beauty 
photography, slow motion, dreamy, ethereal, glowing, light leak, lens flare
```

## Quality Gate

Run this before you move to animation. If any box fails, iterate the still.

- [ ] Brief written in Directive Voice.
- [ ] At least one explicit refusal present.
- [ ] Specific era, place, class, weather, age of space.
- [ ] 3–5 color palette specified, no full rainbow.
- [ ] Props show wear, repair, clutter, or story.
- [ ] Wardrobe has fabric texture, fit, condition.
- [ ] Skin has pores, asymmetry, imperfections.
- [ ] Lighting is motivated and directional; fill policy stated explicitly.
- [ ] Atmosphere present (haze, smoke, dust, condensation, or deliberate absence).
- [ ] Camera body / format chosen with a stated reason, not by default.
- [ ] No AI tells visible (plastic skin, perfect symmetry, oversaturated, etc.).
- [ ] Still reads as cinema, not render.
