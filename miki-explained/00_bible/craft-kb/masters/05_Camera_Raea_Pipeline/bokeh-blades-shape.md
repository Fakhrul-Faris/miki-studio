---
title: Bokeh — aperture blades, ratio, focus distance
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/bokeh-aperture-blades-focus-distance--cinematography-next-level.md
  - cards/05_Camera_Raea_Pipeline/dof-blades-ratio-low-fstop--10-blender-tricks.md
sources: ["Take your Blender Cinematography to the Next Level!.txt", "10+ Blender Tricks That Will Make Your Renders Cinematic.txt"]
use_when: "shaping bokeh on the shallow-DoF macro look"
style_fit: Fits the Style D shallow-DoF macro look; small emissive points behind the hero become bokeh. Blade count / anamorphic ratio have no raea equivalent (round bokeh only). Keep the brand accent off the bokeh dots; focus pulls eased in-out on the word.
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x sources → 4.2+/5.x API | Blender camera DoF → raea DepthOfField + Bloom

## CREATIVE_INTENT
Bokeh is the quality and shape of out-of-focus blur and highlights: small lights behind (or in front of) the subject turn into
soft discs that make a macro shot feel photographic and "shot on a real lens".
- Cinematography Next Level: scatter small lights, set/animate Focus Distance, blades change disc → polygon.
- 10 Blender Tricks: a preset — focus object on the subject, 8 blades (octagon), ratio 2 (anamorphic oval), very low f-stop.

## STE_PROCEDURE
1. Scatter a few small lights (emissive points) behind the subject.
2. In Camera > Depth of Field, enable it.
3. Set Focus Object to the subject (or set Focus Distance by hand).
4. Adjust Focus Distance / F-Stop to set how much the lights blur.
5. Before copying an f-stop, check scene scale: Blender's blur depends on real units (0.1–0.8 is only right at the video's unknown scale).
6. Keyframe Focus Distance to animate the blur.
7. Set Aperture > Blades: 0 = round; 3 = triangle; 4 square; 5 pentagon; 6 hexagon; 8 = octagon (preset).
8. Set Aperture > Ratio (>1 = anamorphic oval bokeh; preset 2).
9. For textured/custom bokeh and imperfections, use an add-on (Pro Lens 2 named; not covered).

## VALUES BY SOURCE
| parameter | Cinematography Next Level | 10 Blender Tricks | recommended for Style D (+ why) |
|---|---|---|---|
| focus | Focus Distance, keyframed (1.2 → 0.6 example) | Focus Object = subject | `focal_distance` = camera→hero distance computed per frame (raea has no focus object) |
| f-stop | not given | 0.1–0.8 (scale-dependent) | `aperture_f_stops` ~1.8–2.2 (kit ProStage default 2.2) — Blender numbers don't transfer; judge on a still |
| blades | 0 round … 6 hexagon | 8 | round (raea has no blade control) |
| ratio | — | 2 (anamorphic) | n/a in raea |
| bokeh sources | small lights behind subject | — | tiny emissive spheres, warm/neutral, emissive ×6, Bloom threshold 0.9 |

## AGENT_EXECUTION
### Blender (4.2+/5.x)
```python
import bpy
cam = bpy.context.scene.camera.data
d = cam.dof
d.use_dof = True
d.focus_object = bpy.data.objects["Hero"]   # or focus_distance:
d.focus_distance = 1.2; d.keyframe_insert("focus_distance", frame=1)
d.focus_distance = 0.6; d.keyframe_insert("focus_distance", frame=40)
d.aperture_fstop = 0.5        # video range 0.1–0.8 at its scale
d.aperture_blades = 8         # 0 = round; 3 = triangle … 6 = hexagon; 8 = octagon
d.aperture_rotation = 0.0
d.aperture_ratio = 2.0        # >1 = anamorphic oval
```
### raea
```tsx
import { Bloom, DepthOfField, Sphere } from "raea/3d";
import { LinearRgba, Srgba } from "raea/color";
<Camera3d transform={camT} projection={{ Perspective: { fov: 0.6 } }}>
  <DepthOfField focal_distance={distToHero} aperture_f_stops={1.8} mode="bokeh" />   {/* focal_distance animates per frame */}
</Camera3d>
<Bloom intensity={0.6} threshold={0.9} />
{dots.map((p, i) => (
  <Mesh3d key={i} name={`bokeh-${i}`} transform={Transform.fromXyz(...p)}>
    <Sphere radius={0.01} />
    <StandardMaterial base_color="#000000" emissive={LinearRgba.from(Srgba.hex("#ffd9a0")).mul(6)} />
  </Mesh3d>
))}
```
- Blades, rotation, ratio: **raea: no equivalent** (DepthOfField props are focal_distance, aperture_f_stops, mode,
  max_circle_of_confusion_diameter). Kit `pro.tsx` ProStage wraps DoF (`focus`, `aperture`).

## NOTES
- Deprecated: none (`dof.aperture_*` unchanged since 2.8).
- Visual gaps: light placement in the demo scene and the scene scale behind f 0.1–0.8 are visual only; resulting blur unknown.
- Rule conflicts: one saturated accent only, on the subject — bokeh dots stay warm/neutral. Focus pulls are eased in-out and
  start on the spoken word.
