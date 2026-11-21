---
title: Random rotation per piece about its own centroid (pivot-correct tilt)
bucket: 02_Geometry_Nodes
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "41:55–47:45"
blender_version_source: n/a (Houdini, Assemble/pack + Attribute Copy + Point VOP)
tool_target: Geometry Nodes
tier: principle
style_fit: Tilted slabs break flatness on a surface; the same pivot logic drives "pieces lift and tilt" state changes in raea. No conflict if eased.
---

## METADATA
02_Geometry_Nodes | Houdini packed-primitive centroid + rest + transform matrix (source) → Blender GN Accumulate Field + Vector Rotate | Geometry Nodes

## CREATIVE_INTENT
Principle: random rotation about the world origin flings pieces apart; rotating each piece about its own centroid tilts it
in place, like plates shifted by frost. Idea: stagger slab tilts on a cracked ground or a stack of cards/tiles.

## STE_PROCEDURE
1. Create a `name` attribute per piece (Assemble, Create Name on, Create Packed off).
2. Pack a copy (second Assemble, Create Packed Geometry on, display as Centroid) so each piece becomes one point at its centroid.
3. Store that point's P in a `rest` attribute.
4. Promote `name` from Primitive to Point (Promote mode First Match).
5. Attribute Copy `rest` back onto the unpacked mesh, matching by attribute `name`.
6. In a Point VOP, build a rotation matrix with pivot = `rest`; check with a Mix between P and rest (should collapse to centroids at 1).
7. Drive the rotation with three noises of `rest` (one value per piece), each Fit from -1..1 to X: -5..5°, Y: 15..-5°, Z: -10..10°.
8. Change the noise seed/offset if the pattern doesn't please.

## AGENT_EXECUTION
### Source tool (Houdini)
`Assemble (name only)` → `Assemble (pack, centroid)` → `Attribute Create/Wrangle (v@rest = @P)` → `Attribute Promote (name prim→point, First Match)`
→ `Attribute Copy (rest, match by name)` → Point VOP: `rest -> Noise ×3 -> Fit (-1,1 → ranges) -> Float to Vector [angles]`
`-> Make Transform (pivot = rest) -> P * matrix`.

### Blender / raea translation
GN (4.2+):
- `Mesh Island [Island Index]` → `Accumulate Field (VECTOR, Value = Position, Group ID = Island Index) [Total]`;
  `Accumulate Field (FLOAT, Value 1, Group ID = Island Index) [Total]` → `Vector Math (DIVIDE)` = centroid (Houdini `rest`).
- `Random Value (FLOAT_VECTOR, Min (-0.087, -0.087, -0.175), Max (0.087, 0.262, 0.175), ID = Island Index)` (radians for ±5°, -5..15°, ±10°).
- `Vector Rotate (Type EULER_XYZ, Vector = Position, Center = centroid, Rotation = random)` → `Set Position [Position]`.
Instance route: `Split to Instances (Group ID = Island Index)` then `Rotate Instances (Local Space on)` — only if instance origins sit at centroids (~; verify).
raea: export pieces as separate named meshes with origins at centroids (`bpy.ops.object.origin_set(type='ORIGIN_CENTER_OF_MASS')`);
then `transform={Transform.fromXyz(x,y,z).withRotation(Quat.fromEuler("XYZ", rx, ry, rz))}` per piece with eased `interpolate`.

## NOTES
- Course angle ranges are spoken (Y "15 to -5, which is probably too much"); final values after "add more" are visual only.
- Rule conflict: when animated, no bounce/spring overshoot — use eased in-out tilts.
