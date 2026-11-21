---
title: Bokeh — focus distance, animated focus, aperture blade shape
bucket: 05_Camera_Raea_Pipeline
source: "Take your Blender Cinematography to the Next Level!.txt"
source_time: "07:14–08:20"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: house look (shallow DoF, dark room) — small emissive points behind the macro object become bokeh; blade-shape control has no raea equivalent
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x source; 4.2+ API | Blender bpy → raea DepthOfField + Bloom

## CREATIVE_INTENT
Bokeh is the quality and shape of out-of-focus blur and highlights; scattered small lights behind (or in front of) a subject
turn into soft discs that make a macro shot feel photographic. Blade count turns the disc into a polygon for a stylised
lens character.

## STE_PROCEDURE
1. Scatter a few small lights behind the subject.
2. In Camera > Depth of Field, enable it.
3. Adjust Focus Distance to set how much the lights blur.
4. Keyframe Focus Distance to animate the blur.
5. Set Aperture > Blades: 0 = infinite (round bokeh); minimum 3 = triangle; 4 square; 5 pentagon; 6 hexagon, etc.
6. For textured/custom bokeh and imperfections, use an add-on (Pro Lens 2 named; not covered).

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy
d = bpy.context.scene.camera.data.dof
d.use_dof = True
d.focus_distance = 1.2; d.keyframe_insert("focus_distance", frame=1)
d.focus_distance = 0.6; d.keyframe_insert("focus_distance", frame=40)
d.aperture_blades = 6         # 0 = round; 3 = triangle … 6 = hexagon
d.aperture_rotation = 0.0
```
### raea
```tsx
import { Bloom, DepthOfField, Sphere } from "raea/3d";
import { LinearRgba, Srgba } from "raea/color";
<Camera3d transform={camT} projection={{ Perspective: { fov: 0.6 } }}>
  <DepthOfField focal_distance={focus} aperture_f_stops={1.8} mode="bokeh" />   {/* focal_distance animates per frame */}
</Camera3d>
<Bloom intensity={0.6} threshold={0.9} />
{dots.map((p, i) => (
  <Mesh3d key={i} name={`bokeh-${i}`} transform={Transform.fromXyz(...p)}>
    <Sphere radius={0.01} />
    <StandardMaterial base_color="#000000" emissive={LinearRgba.from(Srgba.hex("#ffd9a0")).mul(6)} />
  </Mesh3d>
))}
```
- Blade count / aperture shape: **raea: no equivalent** (the documented DepthOfField props are focal_distance,
  aperture_f_stops, mode, max_circle_of_confusion_diameter; no blade count or anamorphic ratio).

## NOTES
- Deprecated: none.
- Visual gaps: the demo scene's light placement is visual only; no values given.
- Rule conflicts: keep the brand accent off the bokeh dots (one saturated accent only, on the subject); use warm/neutral dots.
