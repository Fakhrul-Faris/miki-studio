---
title: Dim the world, place a large area light for reflections on metal, add a low tinted uplight — then spend most time on light and camera
bucket: 04_Shading_Lighting
source: "How to Add Tons of Detail To Your Renders  Blender.txt"
source_time: "21:26–22:08, 22:48–23:54"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: "The world-down / one-big-soft-key / judge-by-reflections method matches Style D. Partial conflict: the source's warm-orange uplight is a second colour; keep it neutral and dim, or make it the brand accent only when the line is about that part."
---

## METADATA
04_Shading_Lighting | 4.x source (Cycles) → raea | Blender bpy (layout), raea

## CREATIVE_INTENT
A flat white world light makes kit detail mushy. Turn the world down. Add one area light, sized up for soft falloff,
and move it until reflections slide along the pipes and railings: that is what shows the detail. Tint it slightly cool.
A weak spotlight pointing up from below, warm orange or red, separates the upper structure. The source names this the
stage it spends the most time on: light placement and camera, by trial.

## STE_PROCEDURE
1. Turn the World background strength down (the default white environment flattens everything).
2. Add an Area light for directional control over where the set is lit.
3. Lower its Power until highlights stop clipping ("take out a digit").
4. Increase its Size for softer light and broader reflections.
5. Move and rotate the area light until reflections run along the metal edges; judge in Rendered view.
6. Tint the area light slightly blue.
7. Add a Spot light pointing upward from below.
8. Raise its Spot Blend; reduce its Spot Size; keep its Power low so it only lights a little.
9. Tint the uplight orange or red.
10. Re-frame the camera together with the lights. The source changes the opening's size while lighting.

## AGENT_EXECUTION
### Blender (layout)
```python
import bpy, math
w = bpy.context.scene.world; w.node_tree.nodes["Background"].inputs['Strength'].default_value = 0.2   # ~ "turn that down"
a = bpy.data.lights.new("key_area", 'AREA'); a.energy = 2000; a.size = 8; a.color = (0.85, 0.92, 1.0)   # ~
ka = bpy.data.objects.new("key_area", a); ka.location = (0, 2, 30); ka.rotation_euler = (math.radians(10), 0, 0)
s = bpy.data.lights.new("uplight", 'SPOT'); s.energy = 300; s.spot_size = math.radians(60); s.spot_blend = 0.6
s.color = (1.0, 0.45, 0.2)                                                                            # ~ orange
up = bpy.data.objects.new("uplight", s); up.location = (0, 0, 0.5)
up.rotation_euler = (math.pi, 0, 0)                                    # a Spot points along local -Z; flipped, it points up
for o in (ka, up): bpy.context.scene.collection.objects.link(o)
```
### raea
```tsx
<AmbientLight brightness={40} />                                           {/* the dimmed world */}
<Environment src={staticFile("studio_small_2k.hdr")} intensity={0.3} />    {/* optional: gives metal something to reflect */}
<SpotLight transform={Transform.fromXyz(0, 9, 1.5).lookingAt([0, 0, 0])} color="#d8e6ff" intensity={2700000}
  outer_angle={0.7} inner_angle={0.35} shadow_maps_enabled soft_shadows_enabled radius={1.5} />   {/* soft key: big radius */}
<SpotLight transform={Transform.fromXyz(0, 0.3, 0).lookingAt([0, 6, 0])} color="#ff8a4a" intensity={250000}
  outer_angle={0.6} inner_angle={0.1} />                                    {/* weak uplight, soft edge */}
```
- BlendShot already maps an exported Blender area key to a SpotLight (`keyGain` 1100 lm/W) plus a RectLight panel;
  watts don't convert 1:1, so calibrate on a still.
- Reflections on metal need something to reflect. Without an `<Environment>`, fully metallic parts look dark
  (materials.md); keep `metallic` 0.2–0.6 or add an HDRI at low intensity.
- `inner_angle` small vs `outer_angle` gives the soft "Spot Blend" edge (lights.md: half the outer angle softens well, 0 the most).

## NOTES
- Visual gaps: 21:48–23:54 every power, size and position is set "by eye" while watching reflections; the music section (23:54–24:41) shows unexplained adjustments.
- Rule conflicts: Style D = one soft top light. Here the area key is that light; the uplight is optional fill. The
  uplight's warm colour must not compete with the brand accent, so make it neutral, or use the accent hex only when the
  line is about what it lights. Any light change on a word fades over ~0.4 s.
- Volume haze in this source (20:50–21:32: density 0.001 → 0.005, anisotropy raised, Cycles Volume Bounces) is covered in
  `volume-scatter-haze-cube--detail-isnt-hard.md` (NOTES), so it has no separate card.
