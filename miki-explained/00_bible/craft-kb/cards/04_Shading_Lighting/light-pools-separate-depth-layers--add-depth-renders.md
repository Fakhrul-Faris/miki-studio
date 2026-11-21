---
title: Use light to separate layers: a hard top spotlight on the midground, everything in front and behind left dark
bucket: 04_Shading_Lighting
source: "How to Add DEPTH to Your Renders.txt"
source_time: "06:03–08:49"
blender_version_source: 3.x?
tool_target: Blender bpy | raea
tier: full
style_fit: This is Style D's lighting: one top light pooling on the hero against a dark room, with haze.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Blender bpy + raea

## CREATIVE_INTENT
Light isn't only for seeing; it is a tool for separation. A dark background, a harsh spotlight (or a couple) falling from the top onto the midground objects, and the areas in front and behind deliberately left very dark make shapes and depth unmistakable. If light were everywhere, near and far objects would merge.

## STE_PROCEDURE
1. Make the background dark (world strength low, dark backdrop).
2. Aim one or two Spot lights from above onto the midground subject only.
3. Narrow the spot cones so the area in front of and behind the subject stays dark.
4. Let the top light create highlights on the subject's upper edges for crisp shape and contrast.
5. Keep the foreground dark (silhouette) for its own separation.
6. Add the volume haze so the cone of light reads in the air.

## AGENT_EXECUTION
Blender:
```python
import bpy, math
bpy.context.scene.world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.02  # ~ dark world
bpy.ops.object.light_add(type='SPOT', location=(0, 0, 3))
s = bpy.context.active_object; s.data.energy = 1500          # ~ W
s.data.spot_size = math.radians(30); s.data.spot_blend = 0.15  # ~ "harsh"
s.rotation_euler = (0, 0, 0)                                  # points straight down (-Z)
```
raea (lights.md, post.md):
```tsx
<AbsoluteFill style={{ background: "#060607" }}>
  <SpotLight volumetric shadow_maps_enabled transform={Transform.fromXyz(0, 3, 0.2).lookingAt([0, 0.3, 0])}
    intensity={1800000} outer_angle={0.28} inner_angle={0.2} />
  <AmbientLight brightness={8} />
  <VolumetricFog />
  <FogVolume name="air" position={[0, 1.5, 0]} scale={[4, 3, 4]} density={0.03} scattering={0.5} anisotropy={0.6} />
</AbsoluteFill>
```
`inner_angle` close to `outer_angle` = harsh edge as in the video; halve it for Style D's softer pool.

## NOTES
- Deprecated: none.
- Visual gaps: spotlight count/positions shown in the .blend on screen ("this spotlight or couple of spotlights"); values above are `~`.
- Rule conflicts: none. Style D wants a soft top light; use a wider `inner_angle` gap and `soft_shadows_enabled` rather than the video's harsh edge unless the shot calls for drama.
