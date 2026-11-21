---
title: Multiplane — 2D card layers staged at different depths inside 3D space
bucket: 01_Animation_Motion
source: "Motion Feel, Easing & Camera Choreography/Japanese Studios CG 2D Animation.txt"
source_time: "00:53–02:30"
tool_target: raea
tier: principle
use_when: "a flat 2D background/element needs real camera parallax (a dolly or pan past it) without redrawing it as full 3D geometry"
style_fit: "Fits raea's stated '2D layers over 3D' pipeline directly — place flat painted/drawn elements at different Z depths so a camera move reads as real depth, cheaper than modelling everything in 3D."
---

## METADATA
01_Animation_Motion | Japanese anime studio pipeline (Blender) | raea `<ImagePlane>` staged at depth

## CREATIVE_INTENT
Classic multiplane camera technique, done in 3D: separate a 2D background's elements onto individual layers/planes,
then place those planes at different distances from the camera inside a 3D scene. Moving the camera through this
stack gives real parallax (near layers shift faster than far ones) without having to build the background as full
3D geometry — used for layout/planning phases that feed the final pencil test and 2D animation.

## STE_PROCEDURE
1. Separate the 2D background art into distinct elements by depth (foreground props, midground structures, far background).
2. Place each element on its own flat plane inside the 3D scene.
3. Position the planes at different distances from the camera matching their intended depth.
4. Move the camera through the 3D space; parallax between planes happens automatically from their depth placement, not from manual per-layer animation.
5. Composite/paint over the result so the flat-plane seams blend into the final hand-painted look.

## AGENT_EXECUTION
In raea, build the shot as a stack of `<ImagePlane>` (or flat `<Mesh3d>` with an image texture) entities at
different Z positions under one `<Camera3d>`, and move the camera rather than animating each plane individually.
```tsx
<ImagePlane src={staticFile("bg_far.png")} transform={Transform.fromXyz(0, 1, -8)} />   {/* far layer */}
<ImagePlane src={staticFile("bg_mid.png")} transform={Transform.fromXyz(0, 1, -4)} />    {/* mid layer */}
<ImagePlane src={staticFile("fg_prop.png")} transform={Transform.fromXyz(0, 1, -1)} />   {/* near layer, fastest parallax */}
```
### Worked example
Topic: a flat street-market illustration as a setup's backdrop, with the camera pushing past a foreground stall (illustrative).
BEFORE: one flat background image pinned behind the hero object; a camera move just scales it, no depth.
AFTER: the stall sign, the background shophouses, and the sky are split onto three planes at different depths; the
same camera push now shows real parallax between them, at a fraction of the cost of modelling the street in 3D.
### Check
- Are at least 2–3 depth layers used, each at a distinct Z distance, rather than one flat plane?
- Does the camera move (not manual per-layer animation) produce the parallax?
- Does the seam between flat planes and any 3D hero object stay invisible (matched lighting/scale)?

## NOTES
- Visual gaps: the exact layer-splitting and plane placement is shown as a side-by-side comparison on screen (03:51–04:33 range in the source), not narrated with numbers.
- No overlap found in set-1 cards/masters for multiplane/paint-over/toon-shading (checked via grep).
