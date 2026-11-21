---
title: Dark perimeter framing — a natural vignette from unlit objects at the frame edges
bucket: 05_Camera_Raea_Pipeline
source: "How to Make DARK Environments in Blender.txt"
source_time: "21:15–23:29"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D's dark room; the frame edges stay dark so captions and the hero read; built in-scene first, `<Grade vignette>` only to enhance.
---

## METADATA
05_Camera_Raea_Pipeline | 4.x → raea | Blender bpy + raea

## CREATIVE_INTENT
Keeping the outer border of the frame darker than the centre makes the whole image feel darker and pushes the eye to the middle, even when overall brightness is moderate. Build it with objects in the scene (pillars, foreground, ceiling, branches) and balance left vs right; add a post vignette only on top.

## STE_PROCEDURE
1. Before adding a post vignette, check each frame edge for bright areas.
2. Place an unlit object (pillar, blocker, branch) between the light and any bright edge.
3. Balance the sides: a blocker on the right mirrors a pillar on the left.
4. Keep the foreground out of the key's direct light so the bottom edge is dim.
5. Keep the ceiling/top edge unlit.
6. Then optionally enhance with a mild vignette in post.

## AGENT_EXECUTION
Blender: blockers as in the light-blockers card; foreground kept out of the key cone.
raea:
```tsx
<Grade vignette={{ intensity: 0.25, radius: 0.75, smoothness: 0.5 }} />   {/* ~ enhancement only */}
<Mesh3d name="edgeBlockR" shadow="only" transform={Transform.fromXyz(1.6, 2.5, 0.5)}>
  <Cuboid half_size={[0.4, 2.5, 0.4]} />
  <StandardMaterial base_color="#000000" />
</Mesh3d>
```
Like every effect, the first frame's `Grade` holds for the whole piece (post.md); the in-scene darkness follows each camera setup, so re-check edges per setup.

## NOTES
- Deprecated: none.
- Visual gaps: which objects darken which edge is shown, not measured.
- Rule conflicts: 9:16 frame — caption panel sits low; keep the bottom edge dark-but-readable so the EX15 caption panel still reads. No After Effects/Photoshop vignette in our pipeline: use `<Grade>`.
