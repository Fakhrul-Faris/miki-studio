---
title: Paint-over compositing to blend 2D/3D seams and add tactile texture
bucket: 06_Art_Direction
source: "Motion Feel, Easing & Camera Choreography/Japanese Studios CG 2D Animation.txt"
source_time: "02:30–02:45, 05:17–06:02"
tool_target: HyperFrames
tier: principle
use_when: "a composited shot mixes flat 2D art with 3D-rendered elements (or any CG render that needs to stop reading as 'clean CG') and the join is visible"
style_fit: "A finishing/grade step for HyperFrames or a raea post pass — adds texture/brush-stroke overlays and a paint-over pass so hand-built and rendered elements read as one surface; translate the Photoshop step to a raea grade/overlay, not After Effects."
---

## METADATA
06_Art_Direction | Photoshop paint-over + texture/brush compositing | HyperFrames overlay / raea `<Grade>` or texture overlay pass

## CREATIVE_INTENT
After 2D and 3D elements are combined (compositing), a paint-over pass — adding paper/brush-stroke textures to flat
cel shading, tracking subtle lighting/effects along camera arcs, even scanning a physical sticker pack to add a
shimmer/rainbow highlight layer — is what blends the seam between hand-crafted and rendered elements so the viewer
feels the result rather than consciously seeing where 2D ends and 3D begins.

## STE_PROCEDURE
1. After compositing 2D and 3D/CG elements together, identify where the join is still visible (a flat CG surface against hand-painted art, a hard digital edge).
2. Add a subtle brush-stroke/paper texture overlay onto the flat-shaded areas to match the hand-painted material around them.
3. Track any added lighting/effects to the camera's motion arcs so they feel locked to the shot, not pasted on top.
4. For an extra tactile highlight (e.g. a shimmer), consider scanning a real physical texture (the source scanned a sticker pack for a rainbow-shimmer layer) rather than only using digital effects.
5. Judge the result by whether the technique disappears — the goal is a cohesive image, not a visible compositing trick.

## AGENT_EXECUTION
Translate the Photoshop/AE-adjacent paint-over step to a HyperFrames overlay layer (a subtle noise/paper texture
PNG, low opacity, screen/overlay blend) composited over the raea render, or a raea `<Grade>`/post pass if the
texture can be expressed as a shader. Never use After Effects for this — build the overlay as a static or
slow-animated asset composited in the same render/edit pipeline.
### Worked example
Topic: a flat-shaded 3D coin prop composited against a hand-illustrated kedai runcit backdrop (illustrative).
BEFORE: the coin's CG surface reads noticeably cleaner/flatter than the painted backdrop around it — the seam is visible.
AFTER: a subtle paper-grain overlay at low opacity is composited over the whole frame (coin and backdrop alike),
pulling both into the same tactile register.
### Check
- Is the overlay subtle enough to be felt rather than consciously seen (per the source's own standard)?
- Is any added highlight/effect locked to the camera's motion, not static on top of a moving shot?
- Was the technique built without After Effects (HyperFrames overlay or a raea post pass)?

## NOTES
- Visual gaps: the exact texture assets (paper stock, scanned stickers) and opacity values are shown, not stated numerically.
- AE/other-tool note: the source's own pipeline uses Photoshop compositing (not After Effects), so no AE-prohibition conflict — still translated to HyperFrames/raea per our pipeline rule.
