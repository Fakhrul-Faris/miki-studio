---
title: IES light profiles — real manufacturer light distribution via the IES Texture node
bucket: 04_Shading_Lighting
source: "The Power of LIGHTING in Blender!.txt"
source_time: "08:39–09:46"
blender_version_source: 3.2+
tool_target: Shader nodes | raea
tier: full
style_fit: Realistic downlight cones on a shop wall; no raea equivalent — approximate with SpotLight angles.
---

## METADATA
04_Shading_Lighting | any (Cycles only) | Light shader nodes → raea: no equivalent

## CREATIVE_INTENT
IES files describe how a real fixture spreads light; manufacturers publish them free. They add authenticity, especially to interiors/archviz.

## STE_PROCEDURE
1. Download an IES file (common-profile libraries with thumbnails exist).
2. Select a Point/Spot light; enable Use Nodes.
3. Add an IES Texture node; Mode = External; load the .ies file.
4. Link IES Texture [Fac] → Emission [Strength].
5. Raise the light power as needed; render in Cycles.

## AGENT_EXECUTION
```python
import bpy
L = bpy.data.lights["Downlight"]; L.use_nodes = True; N, Lk = L.node_tree.nodes, L.node_tree.links
ies = N.new("ShaderNodeTexIES"); ies.mode = "EXTERNAL"; ies.filepath = "//media/downlight.ies"
Lk.new(ies.outputs["Fac"], N["Emission"].inputs["Strength"])
```
raea: no equivalent (no light profiles/cookies). Approximate: `<SpotLight outer_angle inner_angle>` tuned to the IES beam angle (half-angle in radians), `inner_angle` ≈ 0.5–0.8 × outer for a hot centre; for the scallop on a wall, a soft `radius`.

## NOTES
- Deprecated: none; Cycles only (EEVEE ignores).
- Visual gaps: none.
- Rule conflicts: none.

