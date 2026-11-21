---
title: Rotate the HDRI so the sun comes from the side, never from the camera
bucket: 04_Shading_Lighting
source: "How to get good lighting in blender.srt"
source_time: "00:01:58–00:05:35; 00:13:52–00:14:23"
blender_version_source: 3.x (inferred)
tool_target: Blender bpy | Shader nodes | raea
tier: full
style_fit: Useful for outdoor/street setups (Style A/D street beats); Style D studio shots use a top light instead, but the side-light rule holds for both.
---

## METADATA
04_Shading_Lighting | 3.x (inferred) | Shader nodes, raea

## CREATIVE_INTENT
Light from the camera's direction throws every shadow behind the objects, flattening form and detail; light straight at the lens silhouettes everything. Rotate the HDRI until the sun is off to one side: lit side / shadow side on every object, detail brought out. Front-backlight can work but is an exception for experienced hands.

## STE_PROCEDURE
1. Plug an Environment Texture (HDRI) into the World Background.
2. Select the Environment Texture node and press Ctrl+T (Node Wrangler) to add Mapping and Texture Coordinate.
3. Change the Mapping Rotation Z value step by step.
4. Judge the light direction and shadows, not the background image.
5. If shadows fall behind objects, keep rotating.
6. If the sun faces the camera and objects silhouette, keep rotating.
7. Stop when the sun is to the left or right of the camera axis.

## AGENT_EXECUTION
Blender:
```python
import bpy, math
w = bpy.context.scene.world; w.use_nodes = True; nt = w.node_tree; N, L = nt.nodes, nt.links
env = N.new("ShaderNodeTexEnvironment"); env.image = bpy.data.images.load("//sky_2k.hdr")
mp = N.new("ShaderNodeMapping"); tc = N.new("ShaderNodeTexCoord")
L.new(tc.outputs["Generated"], mp.inputs["Vector"])
L.new(mp.outputs["Vector"], env.inputs["Vector"])
L.new(env.outputs["Color"], N["Background"].inputs["Color"])
mp.inputs["Rotation"].default_value[2] = math.radians(110)   # ~ "by feel"; not stated
```
Nodes: `Texture Coordinate [Generated] -> Mapping [Vector] (Rotation Z) -> Environment Texture [Vector]; Environment Texture [Color] -> Background [Color]`.
raea:
```tsx
<Environment src={staticFile("sky_2k.hdr")} intensity={1} rotation={1.9} background />  {/* rotation: radians CCW from above, ~ */}
<DirectionalLight transform={Transform.fromXyz(-6, 5, 0).lookingAt([0, 0, 0])} illuminance={10000}
  shadow_maps_enabled soft_shadow_size={0.5} />
```
In raea the Environment casts no shadows (`lights.md`): add a DirectionalLight aimed from the HDRI sun's direction for the shadows that make this technique work.

## NOTES
- Deprecated: none.
- Visual gaps: final rotation value not stated (by feel).
- Rule conflicts: none. Do not animate HDRI rotation as a visible sky spin.
