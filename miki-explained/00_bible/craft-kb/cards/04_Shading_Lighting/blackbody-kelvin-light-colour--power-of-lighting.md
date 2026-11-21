---
title: Real light colours in Kelvin with a Blackbody node (1000–7000 K)
bucket: 04_Shading_Lighting
source: "The Power of LIGHTING in Blender!.txt"
source_time: "07:05–07:38"
blender_version_source: 3.2+
tool_target: Shader nodes | raea
tier: full
style_fit: Gives believable warm practicals (shop bulbs ~2700 K) vs daylight (~5500–6500 K); raea needs hex, so convert.
---

## METADATA
04_Shading_Lighting | any | Light shader nodes → raea hex colour

## CREATIVE_INTENT
Real lights run from warm yellow to white (≈1000–7000 K). Picking colours by Kelvin instead of by eye makes lighting read as real.

## STE_PROCEDURE
1. Select the light; enable Use Nodes (Cycles).
2. Add a Blackbody node; link Blackbody [Color] → Emission [Color].
3. Set Temperature (e.g. 2700 K bulb, 4000 K office, 5500–6500 K daylight).
4. 4.x alternative: set the light’s Temperature directly (Blender 4.5+ has a native light temperature option).

## AGENT_EXECUTION
```python
import bpy
L = bpy.data.lights["Key"]; L.use_nodes = True; N, Lk = L.node_tree.nodes, L.node_tree.links
bb = N.new("ShaderNodeBlackbody"); bb.inputs["Temperature"].default_value = 2700
Lk.new(bb.outputs["Color"], N["Emission"].inputs["Color"])
```
raea takes hex only. Kelvin → hex (Tanner Helland approximation):
```python
import math
def kelvin_hex(k):
    t = k / 100
    r = 255 if t <= 66 else 329.698727446 * (t - 60) ** -0.1332047592
    g = 99.4708025861 * math.log(t) - 161.1195681661 if t <= 66 else 288.1221695283 * (t - 60) ** -0.0755148492
    b = 255 if t >= 66 else (0 if t <= 19 else 138.5177312231 * math.log(t - 10) - 305.0447927307)
    c = lambda v: max(0, min(255, int(v)))
    return "#%02x%02x%02x" % (c(r), c(g), c(b))
# kelvin_hex(2700) ≈ "#ffa757", kelvin_hex(6500) ≈ "#fff9fd"
```
`<SpotLight color={kelvin_hex(2700)} ... />` (compute in TSX with the same formula, or paste the hex).

## NOTES
- Deprecated: light node trees are Cycles-only; EEVEE ignores them. Blender 4.5 added a per-light temperature property — prefer it where available (verify name).
- Visual gaps: none.
- Rule conflicts: none.

