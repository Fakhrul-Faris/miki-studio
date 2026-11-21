---
title: Per-piece noise offset to open irregular cracks between fracture pieces
bucket: 02_Geometry_Nodes
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "36:08–40:11"
blender_version_source: n/a (Houdini, Connectivity + Point VOP)
tool_target: Geometry Nodes
tier: principle
style_fit: Cracks that open and close along a seam read as real wear on a macro surface; also a "split apart" state change if animated slowly (~0.4 s ease). No conflict.
---

## METADATA
02_Geometry_Nodes | Houdini Connectivity + Point VOP (source) → Blender GN Mesh Island + Random Value | Geometry Nodes

## CREATIVE_INTENT
Principle: give every piece one unique random value and use it as the seed of the same low-frequency noise; neighbouring
pieces drift differently, so gaps open, close and reopen along a seam — "very realistic". Idea: hairline-to-wide cracks
in stone, dried mud, broken glaze.

## STE_PROCEDURE
1. Add Connectivity (Primitive/Point, attribute `class`) so each piece has a unique integer.
2. Check it: Color node, Random from attribute `class`.
3. In a Point VOP, import `class` and make a Random value from it (one per piece).
4. Feed that random value as an offset into the noise used to move P; lower the noise frequency and amplitude.
5. Before applying, make three different offsets: add a Constant (500) to the seed for each axis, Random again, Float to Vector.
6. Add the vector noise to P; accept slight overlaps — the volume pass fuses them.

## AGENT_EXECUTION
### Source tool (Houdini)
`Connectivity (class)` → Point VOP: `Bind class -> Random -> Add [noise offset]`; `class + 500 -> Random`, `class + 1000 -> Random`
`-> Float to Vector -> Noise (low freq, low amp) [offset]`; `Global P -> Noise [pos]`; `P + noise -> Bind Export P`.

### Blender / raea translation
GN (4.2+):
`Mesh Island [Island Index] -> Random Value (FLOAT_VECTOR, Min -1, Max 1, ID = Island Index, Seed 0) -> Vector Math (SCALE, 0.3) [offset]`
`Position -> Vector Math (ADD) [A]`, `offset -> [B]` → `Noise Texture (3D, Scale ~0.5, Detail 2) [Vector]`
`Noise [Color] -> Vector Math (SUBTRACT, 0.5,0.5,0.5) -> Vector Math (SCALE, ~0.02) -> Set Position [Offset]`.
Use Seed 0/500/1000 on three Random Value nodes if you want axis-independent noise (the course's +500 constant).
raea: at render time pieces exported as separate meshes can drift with `transform` per frame (an opening crack as a state
change), eased in/out over ≥0.4 s; static cracks are baked in Blender.

## NOTES
- Visual gap: final frequency/amplitude values for the cracks were tuned on screen ("lower the frequency, lower the amplitude").
- Rule: if animated, no snap or bounce — slow eased drift only.
