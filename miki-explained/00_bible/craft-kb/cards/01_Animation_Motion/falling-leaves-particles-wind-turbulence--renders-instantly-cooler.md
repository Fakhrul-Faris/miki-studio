---
title: Falling leaves — collection particles with damping, spin and wind/turbulence fields
bucket: 01_Animation_Motion
source: "6 Tips to Make Your Renders Instantly Cooler.txt"
source_time: "unknown (tip 4 of 6)"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Slow drifting debris (receipts, leaves, banknotes, dust) is calm ambient motion for a hold; must be baked to keyframes for raea. Keep it sparse and out of focus.
---

## METADATA
01_Animation_Motion | 3.x → 4.2+ | Blender particles + force fields (bake to keyframes) → raea Model clip

## CREATIVE_INTENT
A few objects drifting through the frame add poetry and life to a still-feeling shot (the video cites Ghost of Tsushima). Damping makes them float as if light, spin breaks uniformity, wind and turbulence give organic paths. Out of focus and few in number, they sit behind the story, not on top of it.

## STE_PROCEDURE
1. Build a leaf texture atlas (PNG with alpha) and import it with Images as Planes.
2. Cut each leaf into its own plane; optionally subdivide and bend it; add slight specular/bump.
3. Put all leaf objects in one collection ("Leaves").
4. Add an emitter plane above the camera's view; add a Particle System (Emitter).
5. Set Render › Render As = Collection, Instance Collection = Leaves (enable Pick Random ~).
6. Set Lifetime larger than the timeline (video: 2000) so leaves never vanish.
7. Set Physics › Damping = 0.5 so leaves fall slowly.
8. Enable Rotation › Dynamic; set Angular Velocity mode (~Velocity) with Amount = 4; raise Randomize for variety.
9. Add a Wind force field, Strength = 22, aimed sideways.
10. Reposition the emitter so the wind-blown leaves stay in shot.
11. Add a Turbulence force field, Size = 2, Strength = 50.
12. Lower the particle Number; keep the leaves out of the focus plane.
13. Bake the cache; append emitter + fields as a reusable collection.

## AGENT_EXECUTION
```python
import bpy
em = bpy.data.objects["LeafEmitter"]
ps = em.modifiers.new("Leaves", "PARTICLE_SYSTEM").particle_system.settings
ps.count = 60                          # ~ "limit the number"
ps.frame_start, ps.frame_end = 1, 240
ps.lifetime = 2000
ps.render_type = "COLLECTION"; ps.instance_collection = bpy.data.collections["Leaves"]; ps.use_collection_pick_random = True
ps.damping = 0.5
ps.use_rotations = True; ps.use_dynamic_rotation = True
ps.angular_velocity_mode = "VELOCITY"; ps.angular_velocity_factor = 4.0; ps.rotation_factor_random = 0.5   # ~
bpy.ops.object.effector_add(type="WIND", location=(-4, 0, 2)); w = bpy.context.object; w.field.strength = 22
w.rotation_euler = (0, 1.5708, 0)       # ~ blowing sideways
bpy.ops.object.effector_add(type="TURBULENCE", location=(0, 0, 2)); t = bpy.context.object
t.field.size = 2; t.field.strength = 50
```
Export for raea (particles do not export to glTF): bake each particle to a real keyframed object.
```python
import bpy
em = bpy.data.objects["LeafEmitter"]          # emitter from the block above
dg = bpy.context.evaluated_depsgraph_get(); sc = bpy.context.scene
src = list(bpy.data.collections["Leaves"].objects)
eps = em.evaluated_get(dg).particle_systems[0]
copies = [src[i % len(src)].copy() for i in range(len(eps.particles))]
for c in copies: sc.collection.objects.link(c)
for f in range(sc.frame_start, sc.frame_end + 1):
    sc.frame_set(f); eps = em.evaluated_get(bpy.context.evaluated_depsgraph_get()).particle_systems[0]
    for c, p in zip(copies, eps.particles):
        c.location = p.location; c.rotation_mode = "QUATERNION"; c.rotation_quaternion = p.rotation
        c.keyframe_insert("location", frame=f); c.keyframe_insert("rotation_quaternion", frame=f)
```
raea: `<Model src={staticFile("leaves.glb")} animation="shot" time={f / fps} />` (BlendShot pattern). Alternative with no Blender bake: ≤ ~300 seeded `<Mesh3d name=...>` cards whose transform is a function of the frame (limits.md: no particle systems; seed `Math.random`).

## NOTES
- Deprecated: Images as Planes is built in from 4.2. Particle API unchanged in 4.x; Blender 5.x still has legacy particles but new work is moving to Geometry Nodes simulation.
- Visual gaps: Angular Velocity mode name and Randomize values only shown on screen.
- Rule conflicts: no bouncy or flashy motion — keep turbulence gentle, fall speed slow; objects entering frame must not pop (emit from outside frame).
- bpy fixed for 5.3: incomplete export snippet: added `import bpy` and `em = bpy.data.objects["LeafEmitter"]`.
