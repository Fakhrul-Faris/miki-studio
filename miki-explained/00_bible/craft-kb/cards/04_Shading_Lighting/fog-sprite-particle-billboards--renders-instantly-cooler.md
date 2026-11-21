---
title: Fog sprites — a fog-image plane scattered as camera-facing particles over a ground plane
bucket: 04_Shading_Lighting
source: "6 Tips to Make Your Renders Instantly Cooler.txt"
source_time: "unknown (tip 6 of 6, fog extra)"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Low-lying patchy mist for wide establishing shots; rarely needed at macro scale. raea's FogVolume with falloff is the native ground fog.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Blender particles (Hair, Collection/Object) → raea FogVolume / ImagePlanes

## CREATIVE_INTENT
Uneven, patchy mist sells scale. A single fog photo on an alpha plane, instanced many times across the ground and turned to face the camera, adds that breakup on top of the gradient planes and the volume.

## STE_PROCEDURE
1. Put a fog image on a plane with the same alpha set-up as the atmosphere planes (image → Alpha, blend mode set).
2. Add a large ground plane spanning almost the whole scene.
3. Add a Particle System (Hair) on it; Render As = Object, Instance Object = fog plane.
4. Enable Advanced › Rotation; set Orientation Axis so the planes face the camera (~Global Y / rotate toward camera).
5. Combine with the atmosphere planes and the mist volume.

## AGENT_EXECUTION
```python
import bpy
g = bpy.data.objects["FogGround"]
ps = g.modifiers.new("FogSprites", "PARTICLE_SYSTEM").particle_system.settings
ps.type = "HAIR"; ps.count = 80; ps.use_advanced_hair = True        # ~
ps.render_type = "OBJECT"; ps.instance_object = bpy.data.objects["FogCard"]
ps.use_rotations = True; ps.rotation_mode = "GLOB_Y"                   # ~ face camera axis
ps.particle_size = 3.0; ps.size_random = 0.5                           # ~
```
raea: ground fog is `<FogVolume name="ground" position={[0, 0.3, 0]} scale={[40, 1.5, 40]} density={0.05} falloff={1} />` with `<VolumetricFog />` (falloff thins it upward, post.md). For painted sprites, a handful of `<ImagePlane src={staticFile("fog.png")} width position rotation />` turned toward the camera — ImagePlane is unlit and uses the PNG's alpha; keep the count low.

## NOTES
- Deprecated: none.
- Visual gaps: rotation/orientation settings named only as "the rotation here".
- Rule conflicts: none.
