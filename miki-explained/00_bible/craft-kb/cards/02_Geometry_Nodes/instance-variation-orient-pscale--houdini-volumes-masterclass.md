---
title: Instance variation — N/up, random pscale, axis-angle orient quaternion
bucket: 02_Geometry_Nodes
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "1:21:29–1:26:35, 1:35:53–1:40:48"
blender_version_source: n/a (Houdini, Copy to Points + Attribute Randomize + Point VOP quaternion)
tool_target: Geometry Nodes
tier: principle
style_fit: Scattering many copies of one object with scale/rotation variety (coins, grains, rocks along a curve). Fine in Blender; in raea keep the count < ~300 meshes. No conflict.
---

## METADATA
02_Geometry_Nodes | Houdini Copy to Points / Attribute Randomize / Quaternion VOP (source) → Blender GN Instance on Points | Geometry Nodes

## CREATIVE_INTENT
Principle: copies need an explicit frame (N + up) before scale and rotation can vary; a float angle about a chosen axis,
converted to a quaternion, gives controlled spin. Idea: copy one finished rock 61 times along a hand-drawn curve with varied
size and spin, then fuse the overlaps with a volume pass into a rock formation.

## STE_PROCEDURE
1. Before copying, set `v@N = {0,0,1}` and `v@up = {0,1,0}` on the target points (Attribute Wrangle).
2. Add Attribute Randomize: `pscale`, Uniform (Continuous), range 0.6–1.2.
3. Add Attribute Randomize: `angle`, float, range -360 to 360.
4. In a Point VOP, convert `angle` Degrees to Radians, feed it and an Axis vector into Quaternion (axis-angle).
5. Bind Export as `orient` (4-float vector), "export when input connected".
6. Change or randomise the Axis to change how the copies turn.
7. Copy to Points: geometry = the rock, points = the curve's points (course: 61), Pack and Instance on.
8. Draw the curve with Curve node: Enter in viewport, click points; move points later with T.
9. Before fusing, File Cache the copies; then volume round trip (fuse card).

## AGENT_EXECUTION
### Source tool (Houdini)
`Grid/Curve → Scatter/points` → `Attribute Wrangle (v@N={0,0,1}; v@up={0,1,0};)` → `Attribute Randomize (pscale 0.6–1.2)`
→ `Attribute Randomize (angle −360..360)` → Point VOP: `angle -> Degrees to Radians -> Quaternion [angle]`, `Constant axis -> [axis]`
`-> Bind Export orient (vector4)` → `Copy to Points (Pack and Instance)`.

### Blender / raea translation
GN (4.2+):
`Curve to Points (Count 61)` → `Instance on Points [Instance = Object Info(Rock) Geometry]`
`Rotation <- Axis Angle to Rotation (Axis (0,1,0), Angle = Random Value FLOAT -6.283..6.283, ID = Index)`
`Scale <- Random Value (FLOAT, 0.6, 1.2, ID = Index)` → `Realize Instances` → (fuse via `Mesh to Volume` → `Volume to Mesh`).
Random axis: `Random Value (FLOAT_VECTOR, -1..1) -> Vector Math (NORMALIZE) -> Axis Angle to Rotation [Axis]`.
raea: for a handful of copies, map over seeded arrays at module level and render `<Model>`/`<Mesh3d>` with
`Quat.fromEuler("XYZ", ...)` (radians) and `.withScale(...)`; never `Math.random()` per frame. Above ~300 copies, bake to one GLB.

## NOTES
- Houdini `orient` needs radians — the course initially forgot the Degrees→Radians conversion; Blender's Axis Angle node also takes radians.
- Pre-4.0 GN: "Axis Angle to Rotation" did not exist (Euler vectors + `Align Euler to Vector`); 4.x Rotation sockets replace it.
- STT: transcript says "69.6 to 1.2" for pscale; read as ~0.6–1.2.
- Visual gap: the curve shape was hand-drawn.
