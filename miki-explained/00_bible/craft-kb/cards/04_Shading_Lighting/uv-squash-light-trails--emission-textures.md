---
title: Light trails from any image by squashing its UVs on one axis
bucket: 04_Shading_Lighting
source: "3 Ways To Make Stunning Emission Textures In Blender.txt"
source_time: "03:20–04:44"
blender_version_source: 3.x
tool_target: Blender bpy | Shader nodes | raea
tier: full
style_fit: Speed/flow streaks (payments moving, traffic of orders) as a static glowing object; streaks must sit still or slide slowly — no flashy whooshes.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | UV edit + Shader nodes → raea uv_transform

## CREATIVE_INTENT
Stretching any picture hard along one axis turns its colours into long streaks that read as light trails — the video makes them from a ramen photo.

## STE_PROCEDURE
1. Put the image into Emission Color and Alpha on a plane (photo cut-out set-up).
2. In the UV Editor, select all UVs and scale them down on X only (S X ~0.02).
3. Move the squashed UV strip until the streak pattern looks good.
4. Lower Emission Strength a little.
5. Recolour with Hue/Saturation and a Multiply mix (next card).

## AGENT_EXECUTION
```python
import bpy, bmesh
ob = bpy.data.objects["TrailPlane"]; me = ob.data
bm = bmesh.new(); bm.from_mesh(me); uv = bm.loops.layers.uv.active
for f in bm.faces:
    for l in f.loops: l[uv].uv.x = 0.5 + (l[uv].uv.x - 0.5) * 0.02    # ~ squash X
bm.to_mesh(me); bm.free()
```
Shader alternative (no UV edit): `Texture Coordinate [UV] -> Mapping [Vector] (Scale X = 0.02) -> Image Texture [Vector]`.
raea: `uv_transform={Affine2.fromScale([0.02, 1])}` on the StandardMaterial with the image as `emissive_texture` (materials.md: uv_transform tiles every map). Slide the streaks slowly with `Affine2.fromScaleAngleTranslation([0.02, 1], 0, [f * 0.0005, 0])` (~).

## NOTES
- Deprecated: none.
- Visual gaps: squash amount visual only (~03:22–04:07).
- Rule conflicts: no whoosh-fast motion; ease any slide.

