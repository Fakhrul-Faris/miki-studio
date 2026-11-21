---
title: Parallax depth-card staging — spread flat layers in Z, scale up as they push back
bucket: 05_Camera_Raea_Pipeline
source: "Minimalist Tech & SaaS 3D Staging/How to actually make eye-catching 3D Scenes | After Effects.txt"
source_time: "01:36–04:32, 08:43–10:33"
tool_target: raea
tier: full
use_when: "building a 2.5D scene from flat image/graphic layers (sky, ground, hero, icon rows) instead of full 3D geometry"
style_fit: "Useful for board/animatic quick-builds and any flat-graphic UI backdrop; real Style D hero builds stay full 3D, but flat supporting layers (icon rows, distant backgrounds) can use this instead of modelling them."
---

## METADATA
06_Art_Direction / 05_Camera_Raea_Pipeline | After Effects 3D layers (general 2.5D method) | raea ImagePlane + Camera3d

## CREATIVE_INTENT
Flat image layers (sky/background, mid, hero, foreground icons) are spread apart along the camera's Z axis and turned
into pseudo-3D cards so a two-node camera can fly between them with real parallax. Because perspective shrinks
far-away layers, each layer is scaled up by roughly the same proportion it's pushed back, so it reads at its original
apparent size once placed.

## STE_PROCEDURE
1. Order layers back to front: farthest background first, hero layer, then foreground accents (icons, text).
2. Push each layer back in Z by a different amount — enough that a camera move reveals real parallax between them.
3. Scale each layer up in proportion to how far it was pushed back, so it doesn't look as if it shrank.
4. Keep the hero layer closest to its original scale/distance; push only background and foreground layers further.
5. Add motion blur to all layers once staged, so camera movement reads as one cohesive 3D space, not flat cards sliding.

## AGENT_EXECUTION
raea: build each layer as an `ImagePlane` (or flat geometry) positioned at its own Z depth; scale `transform.scale`
up proportionally to `|z|` so apparent size is preserved (`scale = baseScale * (1 + k * Math.abs(z))`, tune `k` on a
still). Fly a `Camera3d` between the layers for the reveal. The AE "hold Ctrl+Alt, drag Z" batch-reposition shortcut
has no raea equivalent — set each layer's `z` and matching scale explicitly in code instead.

### Worked example
Topic: a laundromat's per-wash cost breakdown (illustrative numbers).
BEFORE: all elements (machine icon, coin icon, RM label) sit on one flat plane; a camera push does nothing but zoom.
AFTER: background (washer row) pushed to z=-6 and scaled ×2.2; hero (the coin) stays near z=0; foreground RM label
cards pushed to z=+1.5, scaled ×1.3 — a camera push now reveals real depth between the washer row, the coin, and the
label as it flies past.

### Check
- Does each layer sit at a distinct Z depth, ordered back to front?
- Is each layer's scale increased in proportion to how far back it sits (no layer looks like it shrank)?
- Does motion blur read as one cohesive space when the camera moves, not separate flat cards?

## NOTES
- Visual gaps: the exact scale-up ratios are set by eye on screen, not stated as numbers (`~`).
- Overlaps `masters/05_Camera_Raea_Pipeline/layered-camera-rig.md` for the camera-side null-chaining; this card is the
  staging/depth-layout half (the layers themselves), which the master doesn't cover. See addendum for the camera-null
  specifics this source adds.
