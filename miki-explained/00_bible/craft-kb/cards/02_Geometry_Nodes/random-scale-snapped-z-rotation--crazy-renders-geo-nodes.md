---
title: Random per-instance scale and Z rotation snapped to the piece's symmetry
bucket: 02_Geometry_Nodes
source: "How To Make Crazy Renders With Easy Geometry Nodes.txt"
source_time: "07:22–09:42"
blender_version_source: 3.x+
tool_target: Geometry Nodes
tier: full
style_fit: Gives a scattered cluster organic size variety while keeping pieces "in line" (ordered, not chaotic), which reads clean and calm in a macro shot.
---

## METADATA
02_Geometry_Nodes | 3.x+ → 4.2+ | Geometry Nodes

## CREATIVE_INTENT
Uniform instances read as computer-made; random size and spin read as natural. Snapping the random spin to the piece's own symmetry angle keeps the cluster orderly (hex columns still tile), so the eye reads "designed variety" rather than mess.

## STE_PROCEDURE
1. Add a **Random Value** (Float); set Min = 0.2, Max = ~1.0 (video: "something like that").
2. Link Random Value [Value] → Instance on Points [Scale].
3. Add a second **Random Value**; set Data Type = Vector.
4. Set its Min = (0, 0, 0) and Max = (0, 0, ~6.283) so only Z rotates.
5. Add a **Vector Math** node with operation = Snap between Random Value [Value] and Instance on Points [Rotation].
6. Set the Snap Increment Z to the piece's symmetry angle (video found ~2.95 by scrubbing; exact for a 6-sided piece is π/3 = 1.0472 or a multiple, inferred).
7. Check in the viewport that pieces stay aligned to each other but differ in heading.

## AGENT_EXECUTION
```python
import bpy, math
ng = bpy.data.node_groups["ScatterKit"]; N, L = ng.nodes, ng.links
iop = next(n for n in N if n.bl_idname == 'GeometryNodeInstanceOnPoints')
rs = N.new('FunctionNodeRandomValue'); rs.data_type = 'FLOAT'
rs.inputs[2].default_value = 0.2          # Min (float)
rs.inputs[3].default_value = 1.0          # Max (float) ~
L.new(rs.outputs[1], iop.inputs['Scale'])  # float "Value" output
rr = N.new('FunctionNodeRandomValue'); rr.data_type = 'FLOAT_VECTOR'
rr.inputs[0].default_value = (0, 0, 0)    # Min (vector)
rr.inputs[1].default_value = (0, 0, 2*math.pi)  # Max (vector) ~
snap = N.new('ShaderNodeVectorMath'); snap.operation = 'SNAP'
snap.inputs[1].default_value = (1, 1, math.pi/3)   # Increment; video ~2.95 found by eye
L.new(rr.outputs[0], snap.inputs[0])
L.new(snap.outputs['Vector'], iop.inputs['Rotation'])
```
Node links: `Random Value(Float, 0.2–~1) [Value] -> Instance on Points [Scale]`; `Random Value(Vector, Z 0–~2π) [Value] -> Vector Math(Snap, Increment Z ~π/3) [Vector] -> Instance on Points [Rotation]`.

raea: no equivalent at build level (baked into the GLB). If pieces are placed in TSX instead, compute scale/rotation from a seeded list once (seeded values, radians: `Quat.fromEuler`), never `Math.random()` per frame.

## NOTES
- In 4.x Instance on Points [Rotation] is a Rotation socket; a Vector link converts implicitly as Euler XYZ radians.
- Random Value has duplicate "Value" outputs per type; index them (Vector = 0, Float = 1) in Python.
- Visual gaps: the exact snap value is found by scrubbing on screen; the speaker says "there's probably a better way". π/3 for hexagons is inferred, not from the video.
- Rule conflicts: none.
