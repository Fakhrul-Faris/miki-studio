---
title: Mask detail with dot(N, up) and height — blend deformed vs rest positions
bucket: 02_Geometry_Nodes
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "1:49:38–1:55:37"
blender_version_source: n/a (Houdini, Point VOP Dot Product + Mix)
tool_target: Geometry Nodes
tier: principle
style_fit: Keeps top faces clean/flat where light from the one soft top light lands, detail on the sides — good for macro hierarchy. Also a shader mask. No conflict.
---

## METADATA
02_Geometry_Nodes | Houdini Point VOP Dot Product + Mix + rest attribute (source) → Blender GN Vector Math DOT + Mix | Geometry Nodes

## CREATIVE_INTENT
Principle: dot(surface normal, direction) gives 1 facing, 0 perpendicular — the same maths as diffuse shading — so it masks
"up-facing" parts. Storing a `rest` position before a deformation lets you blend the deformation in or out by any mask. Idea:
smooth tops, eroded sides; or erosion that grows from bottom to top.

## STE_PROCEDURE
1. Before deforming, store the current P in a `rest` attribute.
2. Recompute normals (Normal node) after the deformation so N matches the detail.
3. In a Point VOP, compute Dot Product(N, (0,1,0)).
4. Mix between the deformed P and `rest`, Bias = the dot result; check with Bias 1 (all rest) and 0 (all deformed).
5. Multiply the dot result (course: ×3–4) when the mask is too weak.
6. For a height ramp instead, take Vector to Float of `rest`, use the Y value as Bias, and Clamp it to 0..1 (negatives push too far).

## AGENT_EXECUTION
### Source tool (Houdini)
`Attribute Wrangle (v@rest = @P)` → deformer (erosion Point VOP) → `Normal` → Point VOP:
`N · {0,1,0} -> Multiply (3–4) -> Mix [bias]` (input1 = P deformed, input2 = rest) → `Bind Export P`. Height variant: `rest.y -> Clamp (0,1) -> Mix [bias]`.

### Blender / raea translation
GN (4.2+):
`Store Named Attribute (FLOAT_VECTOR, Point, "rest", Value = Position)` → deformer (`Set Position`) →
`Normal -> Vector Math (DOT_PRODUCT, B = (0,0,1)) [Value] -> Math (MULTIPLY, 3.5) -> Math (clamp on)` = mask.
`Mix (Data Type VECTOR, Factor = mask, A = Position, B = Named Attribute("rest"))` → `Set Position [Position]`.
Height variant: `Named Attribute("rest") -> Separate XYZ [Z] -> Map Range (From Min/Max = bounds, Clamp on) -> Mix [Factor]`.
Shader version (same mask for materials): `Geometry [Normal] -> Vector Math (DOT_PRODUCT, (0,0,1)) -> Color Ramp -> Mix Shader / Principled Base Color`;
bake to a texture for raea.
raea: no per-vertex masks in StandardMaterial; bake the mask into `base_color_texture`/`metallic_roughness_texture` maps in Blender.

## NOTES
- Blender is Z-up: up vector is (0,0,1), not Houdini's (0,1,0).
- Visual gap: multiplier was chosen by eye ("three, four").
