---
title: Pre-rolled spark particles with turbulence and motion blur
bucket: 01_Animation_Motion
source: "How to Make Beautiful Fire in Blender.txt"
source_time: "10:23–18:11, 20:11–20:30"
blender_version_source: 3.x/4.x
tool_target: Blender bpy
tier: principle
style_fit: Embers drifting around a hero object suit a burn/heat beat; the particle sim doesn't reach raea, so bake or rebuild as seeded emissive meshes (≤ ~300).
---

## METADATA
01_Animation_Motion | Blender 3.x/4.x | Blender bpy (particles + force field) → raea seeded meshes

## CREATIVE_INTENT
Principle: the scene should feel already alive at frame 1 — start emitting well before the first frame so sparks are mid-air when
the shot opens (transfers to any looping ambient motion). Ideas: no gravity, a turbulence field for wandering paths, motion blur so
small fast sparks streak naturally.

## STE_PROCEDURE
Method:
1. Add an Icosphere, Subdivisions 1 (a Cube also works); scale it tiny.
2. Give it an emissive spark-colour material, Strength ~5.
3. Add a Plane at the fire as emitter.
4. Add a Particle System (Emitter).
5. Set Field Weights → Gravity to 0 (or near).
6. Set Normal velocity 1–2 m/s (lowered later once turbulence is on).
7. Set Number 1000, Frame Start −200, Frame End 150, Lifetime 400.
8. Set Render As Object, Instance Object = the icosphere; raise Scale; small Scale Randomness.
9. Add a Force Field → Turbulence; Strength ~2.5 (2 too weak, 4 too much).
10. Uncheck Render → Show Emitter (and Viewport Display) to hide the plane.
11. Bake the particle cache (Cache → Bake); delete bake, edit, rebake when changing.
12. Enable Motion Blur, Shutter ~0.7–0.8.

## AGENT_EXECUTION
### Blender
```python
import bpy
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=0.01, location=(5, 0, 0))
spark = bpy.context.object
sm = bpy.data.materials.new("Spark"); sm.use_nodes = True; spark.data.materials.append(sm)
bsdf = sm.node_tree.nodes["Principled BSDF"]
bsdf.inputs["Emission Color"].default_value = (1, 0.5, 0.1, 1); bsdf.inputs["Emission Strength"].default_value = 5
bpy.ops.mesh.primitive_plane_add(size=0.5, location=(0, 0, 0.1))
em = bpy.context.object
bpy.ops.object.particle_system_add()
s = em.particle_systems[0].settings
s.count = 1000; s.frame_start = -200; s.frame_end = 150; s.lifetime = 400
s.normal_factor = 1.0                     # ~ lowered from 2 after adding turbulence
s.effector_weights.gravity = 0.0
s.render_type = 'OBJECT'; s.instance_object = spark; s.particle_size = 1.0; s.size_random = 0.3  # ~
s.use_render_emitter = False
bpy.ops.object.effector_add(type='TURBULENCE', location=(0, 0, 0.5))
bpy.context.object.field.strength = 2.5
sc = bpy.context.scene; sc.render.use_motion_blur = True; sc.render.motion_blur_shutter = 0.75
bpy.ops.ptcache.bake_all(bake=True)
```

### Blender / raea translation
- raea has no particle system (limits.md). Rebuild as ≤ ~300 `<Mesh3d name={"spark"+i}>` small spheres with `emissive={LinearRgba.from(Srgba.hex("#ffa040")).mul(6)}`, each on a seeded path computed from the frame (pre-roll = evaluate the path at `f + 200`).
- Or bake in Blender and export positions (per-frame JSON) to drive the meshes.
- `<Bloom threshold={0.9}>` makes them glow; `<MotionBlur shutterAngle={0.5} />` streaks only fast parts (it won't show on slow drift).

## NOTES
- Deprecated: Principled "Emission" → "Emission Color" (4.0+); Render As Halo is a viewport preview only (Cycles/EEVEE don't render halos since 2.8), so switch to Render As Object.
- Visual gaps: turbulence size/flow values not given; spark material colour visual only.
- Rule conflicts: none if drift is calm; no sparks bursting toward the lens.
