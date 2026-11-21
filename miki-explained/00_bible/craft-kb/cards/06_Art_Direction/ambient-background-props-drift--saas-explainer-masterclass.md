---
title: Ambient background props — tinted, blurred, fading in, barely rotating ("so it doesn't look like a rough PNG")
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/How To Master Saas Explainer – Full After Effects Tutorial.txt"
source_time: "05:08–09:30"
tool_target: raea
tier: principle
use_when: "filling a UI-scene background with secondary icon/prop PNGs so it doesn't read empty, without them competing with the hero"
style_fit: Fits our "no cheap defaults" rule if kept this restrained — the point is exactly that static props read cheap, so each gets one quiet motion; adapt PNG icons to real raea 3D/2D kit props.
---

## METADATA
06_Art_Direction | After Effects tint + fast box blur + rotation/opacity keys (source) → raea opacity/rotation tracks | raea

## CREATIVE_INTENT
Secondary folder-icon PNGs are tinted to the scene's palette (two-colour tint, white → accent), given a small fast-box-
blur (radius ~7–15, "very low, just slightly blurry") so they don't look pasted-in, and each gets its own very slow,
barely-visible rotation ("keep it very slow, like it's barely move... we just want to show it's not a rough PNG"). They
fade in via opacity (no position move — a position move "did not look good") and sit behind/around the hero text.

## STE_PROCEDURE
1. Tint every secondary prop to the scene's two-colour palette (white + one accent), never leave it at native colour.
2. Add a very light blur (`~`7–15 px radius) so it doesn't look flat-pasted against the blurred/soft hero.
3. Give each prop one slow, small rotation (barely visible) — never a position move for a static background prop.
4. Fade each prop in by opacity only, staggered a few frames apart.
5. Keep the whole layer subordinate: lower contrast/opacity than the hero and the text.

## AGENT_EXECUTION
raea: background props as low-opacity `Mesh3d`/`ImagePlane` or SVG icons, each with its own tiny rotation drift and a
fade-in track, never a position key. `const rot = lerp(0, 2, t) * dir; const op = interpolate(f, [a, a+12], [0, 0.35]);`
Keep opacity capped well under the hero's.

### Worked example
Topic: a laundromat's app background behind a "3 mesin kosong" (3 machines free) UI card (illustrative count).
- BEFORE: three machine-icon PNGs sit flat and static behind the card.
- AFTER: the icons are tinted to the app's accent, lightly blurred, each drifts a hair of rotation, and fades in a few
  frames apart — the background reads alive without pulling focus from "3 mesin kosong".

### Check
- Does every prop have its own small rotation (not a shared one)?
- Is the fade opacity-only, with no position move?
- Is the prop layer visibly lower-contrast than the hero/text?

## NOTES
- Visual gaps: exact tint hex values and blur radius per prop are visual only.
- AE dropped: Tint effect, Fast Box Blur; translated to raea colour multiply + CSS/shader blur or a simple low-opacity
  render pass.
