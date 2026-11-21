---
title: Boids flock with Goal, Separate, Flock and Follow Leader rules
bucket: 01_Animation_Motion
source: "6 Tips to Make Your Renders Instantly Cooler.txt"
source_time: "unknown (tip 5 of 6, flock setup)"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Transfers to objects only: a swarm of coins/notifications/parcels flowing to a target (money flowing to one account) reads as a flock. Bake to keyframes; keep speeds gentle.
---

## METADATA
01_Animation_Motion | 3.x → 4.2+ | Blender Boids particle physics (bake) → raea Model clip

## CREATIVE_INTENT
Real flocks don't swarm an emitter like moths — they travel together toward a goal, often behind a leader. Boid rules make a crowd of objects cross the frame as one organism, which can visualise "many small things heading to one place".

## STE_PROCEDURE
1. Animate one source object (looping shape-key cycle); duplicate it with speed/cycle variations; put all in a collection ("Bird Particles").
2. Before adding the emitter, make sure the active collection is NOT "Bird Particles" (Blender adds new objects to the last active collection, which breaks the instancing).
3. Add a sphere emitter; add a Particle System; Render As = Collection, Instance Collection = Bird Particles.
4. Hide the emitter: Render › Show Emitter off and viewport visibility off.
5. Set Physics = Boids.
6. Enable Render › Rotation (Object Rotation) and rotate the source objects 90° so they fly nose-first.
7. In Boid Brain, add rules in this order: Separate, Follow Leader, Goal (Object = target cube), Flock; Rule Evaluation = Fuzzy (top first).
8. In Movement, lower Max Air Speed, Max Air Acceleration and Max Angular Velocity.
9. Lower Personal Space for a tighter flock; lower the particle Number.
10. For another flock, duplicate the emitter sphere in Edit Mode and move it.

## AGENT_EXECUTION
```python
import bpy
em = bpy.data.objects["FlockEmitter"]
ps = em.modifiers.new("Flock", "PARTICLE_SYSTEM").particle_system.settings
ps.count = 25                                   # ~ "much lower number"
ps.render_type = "COLLECTION"; ps.instance_collection = bpy.data.collections["Bird Particles"]
em.show_instancer_for_render = False; em.hide_render = False   # 5.x: Object.show_instancer_for_render (was ParticleSettings.use_render_emitter)
ps.use_rotation_instance = True                 # "object rotation"
ps.physics_type = "BOIDS"
b = ps.boids
b.air_speed_max = 5.0; b.air_acc_max = 0.3; b.air_ave_max = 0.3   # ~ lowered
b.air_personal_space = 0.5                     # ~ tighter
st = b.states[0]; st.ruleset_type = "FUZZY"
with bpy.context.temp_override(particle_settings=ps):   # boid rule ops need the particle settings in context
    for _ in range(len(st.rules)): bpy.ops.boid.rule_del()   # fresh order (rules collection has no .remove)
    for t in ("SEPARATE", "FOLLOW_LEADER", "GOAL", "FLOCK"):
        bpy.ops.boid.rule_add(type=t)
next(r for r in st.rules if r.type == "GOAL").object = bpy.data.objects["Target"]
```
Export: bake the particle cache and convert to keyframed objects (same loop as the falling-leaves card), then `<Model animation="shot" time={f/fps}>` in raea. raea has no particle/boid system (limits.md).

## NOTES
- Deprecated: none in 4.x; legacy particles are maintenance-only (GN simulation is the future).
- Visual gaps: final Movement values only shown on screen; rule order given verbally (separate → follow leader → goal → flock).
- Rule conflicts: wildlife flocks are props, but street/outdoor scenes default to no people and calm motion; cap Max Air Speed so nothing whips past (< ~40 m/s camera-relative, no flashy passes).
- bpy fixed for 5.3: ParticleSettings.use_render_emitter → Object.show_instancer_for_render on the emitter; also st.rules has no .remove → bpy.ops.boid.rule_del/rule_add inside temp_override(particle_settings=ps) (without it both ops cancel silently).
