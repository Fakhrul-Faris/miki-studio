---
title: Mantaflow liquid splash against a product (domain / flow plane / effector)
bucket: 01_Animation_Motion
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "2:07:25–2:28:44"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: "conflict: Blender fluid bake + Cycles glass don't render in raea; use raea <Goo solver=\"sph\"> or bake mesh sequence to GLB"
---

## METADATA
01_Animation_Motion | Blender 4.3 | Blender bpy (Mantaflow) → raea `<Goo>` translation

## CREATIVE_INTENT
A jet of liquid hits the product and splashes around it for a hero slow-motion beat. Rendered at high frame rate so it can be
slowed 2.5× on a 24 fps timeline. Slow to iterate: plan for many bakes.

## STE_PROCEDURE
1. Save a copy of the file; delete camera keys and lights.
2. Before you simulate, scale the scene up: the product from 1.5 m to ~10 m (`S 10`, then `S 7`), the backdrop too — small objects simulate badly.
3. Light with an HDRI (World › Color › Environment Texture) since the area lights no longer match the scale.
4. Add a Cube as Domain; snap the cursor to the floor, Pivot = 3D Cursor, scale it so its bounds stay outside the camera view (check in Wire display); leave room behind the product for the emitter.
5. Physics › Fluid › Type Domain; Domain Type Liquid; Viewport Display = Bounds.
6. Set Resolution Divisions 32–64 for tests, 128 for checks, 300–350 for the final.
7. Set Cache Type Modular and enable Is Resumable; Frame Start/End 1–200.
8. Add a Plane behind the product: Fluid Type Flow; Flow Type Liquid; Flow Behavior Geometry; Flow Source Mesh; Surface Emission 10 (~); enable Initial Velocity.
9. Aim the jet: Initial Velocity Normal 100 or Initial X velocity 40 → 100 m/s; add a second plane higher at ~70 m/s. (Emission is from the vertices, not the face centre.)
10. Select the product: Fluid Type Effector (defaults).
11. Turn off Border Collisions on all sides so liquid does not bounce off invisible walls.
12. Particles: Particle Radius 1.1; Mesh: Particle Minimum 16, Particle Maximum 32; Narrow Band Width ~9 (adherence, less flicker).
13. Optionally Time Scale 0.5; set scene FPS to 60 (or 120) for real slow motion.
14. Enable Mesh › Use Speed Vectors (motion blur for the liquid).
15. Bake Data, then Bake Mesh.
16. Material: Principled Transmission Weight 1 with a colour and IOR, or a Glass BSDF.
17. Add a Smooth modifier, Repeat 10.

## AGENT_EXECUTION
- Blender:
```python
import bpy
domain, emitter, can = (bpy.data.objects[n] for n in ("Domain", "Emitter", "Can"))   # ~ object names
d = domain.modifiers.new("Fluid", 'FLUID'); d.fluid_type = 'DOMAIN'
s = d.domain_settings
s.domain_type = 'LIQUID'; s.resolution_max = 128; s.cache_type = 'MODULAR'; s.cache_resumable = True
s.cache_frame_start, s.cache_frame_end = 1, 200
s.use_collision_border_front = s.use_collision_border_back = s.use_collision_border_right = False
s.use_collision_border_left = s.use_collision_border_top = s.use_collision_border_bottom = False
s.particle_radius = 1.1; s.particle_min, s.particle_max = 16, 32; s.particle_band_width = 9  # narrow band ~"nine"
s.use_speed_vectors = True
s.time_scale = 1.0
f = emitter.modifiers.new("Fluid", 'FLUID'); f.fluid_type = 'FLOW'
fs = f.flow_settings; fs.flow_type = 'LIQUID'; fs.flow_behavior = 'GEOMETRY'; fs.flow_source = 'MESH'
fs.surface_distance = 10  # ~ "surface emission 10"
fs.use_initial_velocity = True; fs.velocity_coord = (40, 0, 0)
e = can.modifiers.new("Fluid", 'FLUID'); e.fluid_type = 'EFFECTOR'
bpy.context.scene.render.fps = 60
bpy.ops.fluid.bake_data(); bpy.ops.fluid.bake_mesh()
```
- raea: `<Goo solver="sph" emitter={{ at, dir, radius, speed, start, end }} obstacles=[can GLB] colliders=[floor box] bounds=… />`;
  for clear liquid draw the bake with `useGoo` + `<MeshSequence transmission={1} ior={1.33} attenuationColor attenuationDistance />`.
  The sph solver works at real (mm) scale — do **not** apply the ×10 upscale there. `maxSpeed` default 25 m/s: a 40–100 m/s jet
  (valid only at ×10 scale) will stop the bake.

## NOTES
- Deprecated: "Surface emission" is `surface_distance` in the API; GPU motion-blur black lines were a Cycles GPU bug (CPU workaround).
- Visual gaps: many slider values are spoken loosely ("38 32 32", narrow band "nine"); emitter placement is visual only.
- Rule conflicts: splash must read calm/slow (slow-motion helps); no Cycles in our pipeline — Blender only bakes, raea renders.
- bpy fixed for 5.3: incomplete snippet: added `import bpy` and the `domain` / `emitter` / `can` lookups.
