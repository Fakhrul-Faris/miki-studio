---
title: Patch an under-lit backdrop in the edit — a white solid colour clip with keyed opacity fade in/out
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "2:58:26–3:00:19"
blender_version_source: 4.3
tool_target: raea
tier: full
style_fit: A fix, not a style; in raea the cause (backdrop not lit along the camera move) is fixed in the scene.
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 | DaVinci Resolve → raea

## CREATIVE_INTENT
When the camera flies up, the backdrop leaves the lights and turns grey. Rather than re-render, a white Solid Color clip fades in
just as the products are gone, holds over the grey section, and fades out as the next animation starts.

## STE_PROCEDURE
### Source tool (DaVinci Resolve)
1. Toolbox › Generators › Solid Color; drag above the shot; Inspector colour white.
2. Start it one frame before the next animation begins, ending where the grey ends.
3. Drag the clip's opacity handles to fade in quickly and fade out; lengthen by a frame if it pops.
4. Expect a mismatch between the solid's white and the render's white; fix in the grade later.

## AGENT_EXECUTION
### Blender / raea translation
- Blender: light the backdrop along the whole move (add an area light above the camera path) instead of patching.
- raea: fix in the scene — a backdrop light or `unlit` backdrop material (`<StandardMaterial base_color="#f4f4f4" unlit />`) so it
  stays white whatever the camera does; if a 2D fade is still needed, an opaque page `<div>` with `opacity` from `vis(f, a, b, 12)`
  (kit/ui.tsx) over the canvas (keep page parts over 3D opaque where it matters, limits.md).

## NOTES
- Deprecated: none.
- Visual gaps: frame positions are by eye.
- Rule conflicts: a white flash must be a ≥0.4 s fade, never a pop.
