---
title: Thicken the volumetric haze late (density + anisotropy tuning)
bucket: 04_Shading_Lighting
source: "How to Add That Special Look To Your Renders.txt"
source_time: "01:55–03:18"
blender_version_source: 3.x
tool_target: raea
tier: principle
style_fit: A faint haze adds depth and catches the single top light in the Style D dark room; keep it faint so the macro object stays crisp.
---

## METADATA
04_Shading_Lighting | Blender 3.x (Cycles) | Shader nodes (Volume Scatter) → raea FogVolume

## CREATIVE_INTENT
Principle: once the render is "almost there", a slightly thicker atmosphere is one of several small moves that together give
the finished look — it adds depth and a sense of air. Ideas: revisit density at the end of lighting, not the start; there is
no universal value — some scenes look better thinner.

## STE_PROCEDURE
Method: one value change at a time, judged on a still.
1. Finish the base render (lighting, materials) before touching the haze.
2. Select the volume cube's Volume Scatter material.
3. Raise Density in small steps (author: 0.005 → 0.015, i.e. ×3).
4. Adjust Anisotropy until light shafts read toward the camera.
5. Compare before/after; lower again if the image goes milky.

## AGENT_EXECUTION
### Blender (look-dev only)
```python
vs = bpy.data.materials["Atmosphere"].node_tree.nodes["Volume Scatter"]
vs.inputs["Density"].default_value = 0.015      # was 0.005
vs.inputs["Anisotropy"].default_value = 0.5      # ~ not given in this video
```
### raea (the renderer)
```tsx
<VolumetricFog />
<FogVolume name="air" position={[0, 0.5, 0]} scale={[4, 2, 4]} density={0.02} scattering={0.45} anisotropy={0.6} color="#fff2e0" />
<SpotLight volumetric transform={Transform.fromXyz(0, 3, 0).lookingAt([0, 0, 0])} intensity={900000} outer_angle={0.4} inner_angle={0.2} shadow_maps_enabled />
```
- `density` 0.02 is a faint haze, 0.1 dust (post.md); the Blender numbers do not map 1:1 — tune on `raea render --frame N`.
- Only `volumetric` lights inside the volume shaft; the volume must contain the camera's view of that air.
- The fog volume's density can animate per frame (unlike other effects) — keep it constant within a shot.

## NOTES
- Deprecated: none.
- Visual gaps: the "before" density and the anisotropy value are shown on screen only ("something like this").
- Rule conflicts: none; never let haze soften the hero object's macro detail.
