---
title: Copy Location / Copy Rotation constraints (axes, invert for mirrored motion, offset, influence, mix Replace/Add)
bucket: 01_Animation_Motion
source: "The_Power_of_CONSTRAINTS_in_Blender.md"
source_time: "0:12–4:16, 5:04–6:02"
blender_version_source: 3.x+
tool_target: Blender bpy
tier: principle
style_fit: Drives linked object-state changes (sliding doors parting, gear trains, a lid following a box) from one animated driver object; bake to keys for GLB, or reproduce as frame math in raea.
---

## METADATA
01_Animation_Motion | 3.x+ → 4.2+ | Blender bpy → raea transform math

## CREATIVE_INTENT
Principle: constraints are object relationships — one object's motion copied onto another, per axis, inverted or offset. Ideas: two sliding doors that part symmetrically from one animated door (Copy Location, Invert X); a gear train where each gear copies a driver's rotation (Copy Rotation, Invert for counter-rotation); Influence below 1 for a softer, more natural follow.

## STE_PROCEDURE
Method (Copy Location):
1. Select the follower; add a Copy Location constraint; set Target = driver object.
2. Disable axes you do not want copied (only Z enabled → follower copies only vertical motion).
3. Enable Invert on an axis to mirror the driver's motion on that axis.
4. Enable Offset to add the driver's motion on top of the follower's original location.
5. Leave Owner/Target space on World Space.
6. Lower Influence to weaken the follow.
Method (Copy Rotation):
7. Add Copy Rotation; set Target; limit axes and Invert per axis as above.
8. Set Mix = Replace to discard the follower's own rotation, or Add to add it to the target's.
How-to:
9. Prefer separate Copy Location / Rotation / Scale over Copy Transforms (author: more flexibility; Copy Transforms ≈ parenting).
10. Before GLB export, bake the constraint motion to keyframes and remove the constraints.

## AGENT_EXECUTION
### Source tool (Blender)
```python
import bpy
door_l, door_r = bpy.data.objects["DoorL"], bpy.data.objects["DoorR"]
c = door_r.constraints.new('COPY_LOCATION')
c.target = door_l
c.use_x, c.use_y, c.use_z = True, False, False
c.invert_x = True                       # mirror: doors part symmetrically
c.use_offset = True                     # keep DoorR's own rest position
c.target_space = c.owner_space = 'WORLD'
c.influence = 1.0

gear_a, gear_b = bpy.data.objects["GearA"], bpy.data.objects["GearB"]
r = gear_b.constraints.new('COPY_ROTATION')
r.target = gear_a
r.use_x = r.use_y = False; r.use_z = True
r.invert_z = True                       # meshing gears counter-rotate
r.mix_mode = 'ADD'                      # 'REPLACE' | 'ADD' (4.x also BEFORE/AFTER/OFFSET legacy)

# bake for export (constraints do not travel in glTF)
bpy.ops.object.select_all(action='DESELECT'); door_r.select_set(True); gear_b.select_set(True)
bpy.context.view_layer.objects.active = door_r
sc = bpy.context.scene
bpy.ops.nla.bake(frame_start=sc.frame_start, frame_end=sc.frame_end, only_selected=True,
                 visual_keying=True, clear_constraints=True, bake_types={'OBJECT'})
```
### Blender / raea translation
raea has no constraints; compute the relationship from the frame (animation.md):
```tsx
const f = useCurrentFrame();
const open = interpolate(f, [0, 18], [0, 0.12], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
<Mesh3d name="doorL" transform={Transform.fromXyz(-0.1 - open, 0, 0)}>...</Mesh3d>
<Mesh3d name="doorR" transform={Transform.fromXyz( 0.1 + open, 0, 0)}>...</Mesh3d>   {/* invert X */}
const a = f * 0.05;                                    // driver gear
<Mesh3d name="gearB" transform={Transform.fromXyz(0.2, 0, 0).withRotation(Quat.fromEuler("XYZ", 0, 0, -a * (Ra / Rb)))}>...</Mesh3d>
```
(Gear ratio Ra/Rb is our addition; the video only copies rotation 1:1.)

## NOTES
- Vertex Group option exists on these constraints (advanced rigging); not covered.
- Copy Transforms has Remove Target Shear and Mix options; author finds it rarely useful.
- Deprecated: none; `nla.bake` still works with 4.4+ slotted actions.
- Visual gaps: none.
- Rule conflicts: driver motion must be eased in-out (no linear starts), ~0.4 s+ for object state changes; no snap.
