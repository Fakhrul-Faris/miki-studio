---
title: Random per-instance scale and rotation
bucket: 02_Geometry_Nodes
type: master
members:
  - cards/02_Geometry_Nodes/instance-variation-orient-pscale--houdini-volumes-masterclass.md
  - cards/02_Geometry_Nodes/random-scale-snapped-z-rotation--crazy-renders-geo-nodes.md
sources: ["Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt", "How To Make Crazy Renders With Easy Geometry Nodes.txt"]
use_when: "making scattered coins, tiles or debris look non-repeated"
style_fit: No conflict — "designed variety" (snapped or axis-controlled spin, bounded scale) reads clean and calm in macro; build in Blender GN and bake; in raea keep < ~300 meshes and seed every random value.
---

## METADATA
02_Geometry_Nodes | Houdini Copy to Points + Attribute Randomize + Quaternion VOP, Blender 3.x+ GN (sources) → Blender 5.3 GN | Geometry Nodes (+ raea seeded placement)

## CREATIVE_INTENT
Shared why: uniform copies read computer-made; per-instance random size and spin read natural — but controlled spin
(about one chosen axis, or snapped to the piece's symmetry) keeps the cluster orderly, so the eye reads "designed variety", not mess.
- Houdini Volumes: copies need an explicit frame (N + up) before scale/rotation vary; random `pscale` 0.6–1.2; random
  angle −360…360° converted to radians and fed with an axis into an axis-angle quaternion (`orient`); change or randomise
  the axis to change how copies turn (61 rocks along a hand-drawn curve, later fused by a volume pass).
- Crazy Renders: Random Float scale 0.2–~1.0; Random Vector rotation only on Z (0–~2π) passed through Vector Math Snap
  with the Z increment = the piece's symmetry angle so hex pieces stay aligned but differ in heading.

## STE_PROCEDURE
1. Before copying, give the points a frame: Houdini `v@N = {0,0,1}`, `v@up = {0,1,0}`; Blender instances use the point's default orientation (align with Align Rotation to Vector if needed).
2. Add a Random Value (Float) → Instance on Points [Scale]; range 0.6–1.2 (Houdini) or 0.2–~1.0 (Crazy Renders).
3. Choose a rotation mode: (a) axis-angle — Random Value (Float, −2π…2π) as Angle + an Axis vector → Axis Angle to Rotation → [Rotation]; (b) snapped Z — Random Value (Vector, Min 0,0,0, Max 0,0,~2π) → Vector Math Snap → [Rotation].
4. Angles are radians: convert degrees first (the Houdini course forgot Degrees→Radians at first).
5. For (b), set the Snap Increment Z to the piece's symmetry angle (hexagon: π/3 = 1.0472 or a multiple; the video found ~2.95 by scrubbing).
6. For a random axis, Random Value (Vector, −1…1) → Vector Math Normalize → Axis Angle to Rotation [Axis].
7. Use ID = Index (or a per-layer Seed) on each Random Value so values are stable and layers differ.
8. For copies along a path: Curve to Points (Count 61) instead of a surface scatter.
9. Check in the viewport that pieces stay aligned to each other where intended but differ in size and heading.
10. Before fusing overlaps (Mesh to Volume → Volume to Mesh) or exporting, cache/apply, then Realize Instances.

## VALUES BY SOURCE
| parameter | Houdini Volumes | Crazy Renders | recommended for Style D (+ why) |
|---|---|---|---|
| scale range | pscale 0.6–1.2 (STT "69.6 to 1.2" → ~0.6–1.2) | 0.2–~1.0 | 0.7–1.15 for coins/tiles (believable stock), 0.2–1.0 for crystal/debris clusters |
| rotation | angle −360…360° → radians, axis-angle quaternion | Z only 0–~2π, Snap Z | Z-only + snap for tiles/coins/hex; axis-angle random axis for rocks/debris |
| snap increment | — | ~2.95 by eye | piece symmetry angle (π/3 hex, π/2 square — inferred) |
| axis | constant, change or randomise | Z | Y/Z up for objects on a surface |
| count | 61 copies along a curve | scatter density | < ~300 if placed in raea; any if baked to one GLB |
| post | fuse via volume round trip | — | realize + apply + GLB |

## AGENT_EXECUTION
### Source tool (Houdini)
`Grid/Curve → points` → `Attribute Wrangle (v@N={0,0,1}; v@up={0,1,0};)` → `Attribute Randomize (pscale, Uniform Continuous, 0.6–1.2)`
→ `Attribute Randomize (angle, −360..360)` → Point VOP: `angle -> Degrees to Radians -> Quaternion [angle]`, `Constant axis -> [axis]`
`-> Bind Export orient (vector4, export when input connected)` → `Copy to Points (Pack and Instance)`; curve drawn with Curve node (Enter, click points; T to move).

### Blender 5.3 (GN)
```python
import bpy, math

def sock(socks, name, typ=None):
    return next(s for s in socks if s.name == name and (typ is None or s.type == typ))

ng = bpy.data.node_groups["ScatterKit"]; N, L = ng.nodes, ng.links
iop = next(n for n in N if n.bl_idname == 'GeometryNodeInstanceOnPoints')
idx = N.new('GeometryNodeInputIndex')

# scale
rs = N.new('FunctionNodeRandomValue'); rs.data_type = 'FLOAT'
sock(rs.inputs, 'Min', 'VALUE').default_value = 0.6; sock(rs.inputs, 'Max', 'VALUE').default_value = 1.2
L.new(idx.outputs['Index'], sock(rs.inputs, 'ID'))
L.new(sock(rs.outputs, 'Value', 'VALUE'), iop.inputs['Scale'])

MODE = 'SNAP_Z'                                   # or 'AXIS_ANGLE'
if MODE == 'SNAP_Z':                              # Crazy Renders
    rr = N.new('FunctionNodeRandomValue'); rr.data_type = 'FLOAT_VECTOR'
    sock(rr.inputs, 'Min', 'VECTOR').default_value = (0, 0, 0)
    sock(rr.inputs, 'Max', 'VECTOR').default_value = (0, 0, 2 * math.pi)
    snap = N.new('ShaderNodeVectorMath'); snap.operation = 'SNAP'
    snap.inputs[1].default_value = (1, 1, math.pi / 3)          # Increment; video ~2.95 by eye
    L.new(sock(rr.outputs, 'Value', 'VECTOR'), snap.inputs[0])
    L.new(snap.outputs['Vector'], iop.inputs['Rotation'])      # Vector -> Rotation converts as Euler XYZ radians
else:                                             # Houdini axis-angle
    ra = N.new('FunctionNodeRandomValue'); ra.data_type = 'FLOAT'
    sock(ra.inputs, 'Min', 'VALUE').default_value = -2 * math.pi; sock(ra.inputs, 'Max', 'VALUE').default_value = 2 * math.pi
    L.new(idx.outputs['Index'], sock(ra.inputs, 'ID'))
    aa = N.new('FunctionNodeAxisAngleToRotation')
    aa.inputs['Axis'].default_value = (0, 0, 1)                 # Blender Z-up (Houdini axis (0,1,0) is Y-up)
    L.new(sock(ra.outputs, 'Value', 'VALUE'), aa.inputs['Angle'])
    # random axis: Random Value(FLOAT_VECTOR, -1..1) -> Vector Math(NORMALIZE) -> aa.inputs['Axis']
    L.new(aa.outputs['Rotation'], iop.inputs['Rotation'])
# copies along a path: Curve to Points (Count 61) -> Instance on Points [Points]; fuse: Mesh to Volume -> Volume to Mesh
```
Links: `Random Value(Float) [Value] -> Instance on Points [Scale]`;
snap: `Random Value(Vector, Z 0–2π) [Value] -> Vector Math(Snap, Increment Z π/3) [Vector] -> [Rotation]`;
axis-angle: `Random Value(Float, ±2π) [Value] -> Axis Angle to Rotation [Angle]`, `Axis (0,0,1) -> [Axis]`, `[Rotation] -> Instance on Points [Rotation]`.

### raea
Baked into the GLB at build level. If a handful of pieces are placed in TSX, compute scale/rotation once from a seeded
module-level list (radians):
```tsx
const rnd = (i: number, k: number) => ((Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1 + 1) % 1;   // deterministic
const PIECES = Array.from({ length: 24 }, (_, i) => ({ s: 0.7 + 0.45 * rnd(i, 1), ry: Math.round(rnd(i, 2) * 6) * (Math.PI / 3) }));
{PIECES.map((p, i) => (
  <Mesh3d key={i} name={`coin-${i}`} transform={Transform.fromXyz(...pos[i]).withRotation(Quat.fromEuler("XYZ", 0, p.ry, 0)).withScale(p.s)}>…</Mesh3d>
))}
```
Never `Math.random()` per frame; above ~300 copies, bake to one GLB (limits.md).

## NOTES
- Deprecated: pre-4.0 GN had no Axis Angle to Rotation / Rotation sockets (Euler vectors + Align Euler to Vector); in 4.x+
  Instance on Points [Rotation] is a Rotation socket and a Vector link converts implicitly as Euler XYZ radians. Random
  Value has same-named outputs per type — pick by name + type.
- Houdini `orient` and Blender Axis Angle both take radians. STT fix: "69.6 to 1.2" → ~0.6–1.2.
- Visual gaps: the Houdini curve was hand-drawn; the Crazy Renders snap value was found by scrubbing ("there's probably a
  better way") — π/3 for hexagons is inferred.
- Rule conflicts: none.
