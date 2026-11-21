---
title: Flat text backdrop — radial-gradient glow + faint grid (10 %) + grain
bucket: 06_Art_Direction
source: "Motion Feel, Easing & Camera Choreography/After Effects Text Animation Tutorial.txt"
source_time: "23:13–25:00"
tool_target: HyperFrames
tier: principle
use_when: "a full-frame 2D text or UI card (flat scenes, end card behind the question) — not Style D macro sets"
style_fit: "⚠ Style D is a dark room with one soft top light → adapted: radial glow mimics that light (centre-top, accent-tinted at low strength); grid only on UI/diagram scenes; grain subtle."
---

## METADATA
06_Art_Direction | After Effects + Motion Bro (source) → HyperFrames CSS / raea 2D layer | frame brief (Look)

## CREATIVE_INTENT
The preview's background: a full-frame rectangle with a **radial gradient** fill whose outer stop is 0 % opacity (a soft
pool of light), a **grid overlay** of 4 rows (columns set to match) at ~10 % opacity, and a grain effect on top — so plain
text doesn't sit on a dead flat colour.

## STE_PROCEDURE
1. Fill the frame with the base dark colour.
2. Add a radial gradient: lit centre, outer stop at 0 % opacity; place the centre where the text sits.
3. Overlay a grid of 4 rows (square cells) at ~10 % opacity.
4. Add fine static grain at low strength.

## AGENT_EXECUTION
HyperFrames/raea 2D: `background: radial-gradient(circle at 50% 38%, rgba(ACCENT,0.18), transparent 60%), #0d0d0f`;
grid layer `backgroundImage: linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg,
rgba(255,255,255,.1) 1px, transparent 1px); backgroundSize: 480px 480px` (1920/4 = 480 px rows); grain = a seeded noise PNG
via `staticFile("grain.png")` at ~6–10 % opacity (raea has no flat-layer grain primitive; SVG `feTurbulence` in
HyperFrames). Frame brief `Look:` names these three layers.

### Worked example
End card for the question "Kedai korang masih ambil cash je?"
- BEFORE: white text on flat #000.
- AFTER: text sits in a soft accent-tinted pool at centre-top, a barely visible 4-row grid, fine grain; reads as the same
  dark room as the 3D setups.

### Check
- Is the glow centred where the text is, and soft (0 % outer stop)?
- Is the grid ≤ ~10 % and only on UI/diagram scenes?
- Is there still only one accent hue?

## NOTES
- AE dropped: shape-layer radial gradient, Motion Bro grid overlay, grain preset (from another video, not shown).
- Visual gaps: the gradient colours and grain amount are not spoken.
