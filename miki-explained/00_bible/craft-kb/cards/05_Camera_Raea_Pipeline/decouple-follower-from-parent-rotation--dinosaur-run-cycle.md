---
title: Decouple a follower from its parent's rotation (follow = 0) so it can be animated independently
bucket: 05_Camera_Raea_Pipeline
source: "Animation Masterclass- How to Create a Dinosaur Run Cycle in Maya.txt"
source_time: "48:17–50:04"
blender_version_source: n/a (Maya)
tool_target: principle-only
tier: principle
style_fit: Directly useful for camera rigs and parented objects in raea: keep the camera's aim (or a label, or a hero inside a moving tray) from inheriting a parent's tilt, so moves stay smooth and readable.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Maya source; Blender 4.2+ / raea translation) | principle-only

## CREATIVE_INTENT
Principle: when a child inherits its parent's rotation, every parent move must be counter-animated on the child — you fight the rig. Turning the inheritance off (head "follow" = 0) locks the child in world space so it can be animated on its own, then motion is added deliberately (overlap, lag).
Ideas for us: a camera riding a flight path but aiming at the hero in world space (no inherited roll/tilt); a price tag that stays level while its tray tilts; a 2D-feeling UI card in 3D that ignores the phone's wobble.

## STE_PROCEDURE
1. Before animating the follower, test the inheritance: rotate the parent (chest) and watch whether the child (head) follows.
2. Set the child's follow attribute to 0 on the current frame.
3. Before animating, set the same value on every existing key of that attribute so it is 0 for the whole range.
4. Re-pose the child, since its pose shifts slightly when the inheritance turns off (head translate Y raised to ~−5 / −6).
5. Animate the child independently (lag, overlap — see the overlap-cascade card).

## AGENT_EXECUTION
### Source tool (Maya)
- Head control → Channel Box attribute "follow" → 0; Graph Editor → follow curve → all keys 0.
- Later pose changes on top of animation: animation layer (see the additive-layer card).

### Blender / raea translation
- Blender: parent without rotation inheritance via constraints — `c = cam.constraints.new('CHILD_OF'); c.target = rig; c.use_rotation_x = c.use_rotation_y = c.use_rotation_z = False` (location only), and aim with `t = cam.constraints.new('TRACK_TO'); t.target = hero; t.track_axis = 'TRACK_NEGATIVE_Z'; t.up_axis = 'UP_Y'`. For a bone: `bone.use_inherit_rotation = False` (or `bone.inherit_scale`). Bake before GLB export: `bpy.ops.nla.bake(frame_start=s, frame_end=e, visual_keying=True, clear_constraints=True, bake_types={'OBJECT'})`.
- raea: nested `<Entity>` transforms compose (child inherits parent rotation). To decouple, do not nest — compute the follower's world transform yourself from the parent's position only:
```tsx
const p = trayPos(f);                                  // [x, y, z] of the moving parent
<Entity transform={Transform.fromXyz(...p).withRotation(Quat.fromEuler("XYZ", trayTilt(f), 0, 0))}>
  <Mesh3d name="tray">…</Mesh3d>
</Entity>
<Mesh3d name="tag" transform={Transform.fromXyz(p[0], p[1] + 0.03, p[2])}>…</Mesh3d>   // follows position, not tilt
<Camera3d transform={Transform.fromXyz(...camPos(f)).lookingAt(heroPos(f))} projection={{ Perspective: { fov: (35 * Math.PI) / 180 } }} />
```
`lookingAt` keeps the camera upright (no inherited roll); avoid aiming straight up/down (raea skill: no up to turn by).

## NOTES
- Transfers: inheritance check, turning follow off across all keys, re-posing after. Dropped: head/neck anatomy.
- Visual gaps: none.
- Rule conflicts: none; it makes smooth eased camera moves easier to keep.

## ADDENDUM — How To Master Saas Explainer – Full After Effects Tutorial
Source: "Minimalist Tech & SaaS 3D Staging/How To Master Saas Explainer – Full After Effects Tutorial.txt" (1:08:12–1:08:50).
- Concrete AE use-case for the same decouple principle: several character PNGs ("mimojis") are parented to one null
  and the null is rotated to orbit them around a shared centre; rotating the null also spins each character's own
  rotation (heads tip over) — undesired. Fix: on each child's own Rotation property, pick-whip an expression to the
  parent null's Rotation property and append `* -1`, so the child's rotation exactly cancels the inherited spin
  while its position still orbits. The same expression line is copy-pasted onto every other orbiting character.
- Extra step: if a child must orbit in position but stay upright, link its own rotation to `-(parent.rotation)` via
  a pick-whipped expression rather than zeroing inheritance at the rig level — useful when the parenting structure
  can't be changed (e.g. several pre-built assets sharing one controller null).
- raea translation: where several `Entity`s must share one orbiting parent transform and only their position should
  inherit, compute each child's own rotation as the negative of the parent's current rotation value each frame:
```tsx
const parentRot = orbitAngle(f);
<Entity transform={Transform.fromXyz(...orbitPos(f, i)).withRotation(Quat.fromEuler("Y", -parentRot, 0, 0))}>
```
