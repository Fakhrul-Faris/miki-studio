---
title: Edge detail — extract the edge true to the plate, then fix edge colour, then (only if context demands) edge position and softness
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "36:00–44:15"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: Serves any cut-out or UI card laid over the 3D scene, and the hero-object silhouette against the dark room; edges must carry the softness the lens and background imply.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: edges decide realism — right sharpness/softness, right colour, right motion blur, fine hair kept. Two merge families exist: extraction (roto, key → matte) and blending modes (plus, multiply, overlay, colour dodge — math, no matte); they are often combined. Idea: an edge may legitimately differ from the plate when the new background changes what the edge should look like (a bright background "ate" the defocused edge; over a dark one it would be wider and softer).

## STE_PROCEDURE
1. Extract the edge so the matte matches the original in detail and shape (keep every fine hair).
2. Merge over the new background and look for halos (bright or dark rims, green fringe).
3. Fix edge colour so the rim takes the new background's colour; keep the edge detail.
4. Ask whether the new background changes how the edge should look.
5. If the old background was bright and the new one dark, widen and soften the defocused edge to match an equally defocused edge elsewhere in the plate.
6. Rebuild light hits lost in the original edge (rim highlights) if the new context implies them.
7. Keep edges as close to the plate as possible; deviate only when context demands.

## AGENT_EXECUTION
### Source tool (Nuke)
Keyer/roto → Premult → `Merge over`; edge colour via despill / edge-extend; softness via erode + blur on the alpha. (Specific node chains are shown, not spoken.)
### Blender / raea translation
- 3D objects in raea get edge softness from the renderer: `<DepthOfField>` blurs silhouettes by depth, `<MotionBlur>` on fast moves, `<AntiAliasing mode="msaa">`.
- Image cut-outs on an `ImagePlane`/`<Screen>`: give PNGs a 1–2 px soft alpha edge (premultiplied) — a hard-cut edge over a DoF-blurred background reads pasted.
- Under DoF, a `pass="ui"` edge blurs with the frame (post.md), so no hard halo.

## NOTES
- Visual gaps: the exact edge-colour and edge-softness node values are not spoken.
- Rule conflicts: none.
