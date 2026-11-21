---
title: Camera height, lens and roll set the viewer's relationship
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/camera-height-lens-roll-mood--lighting-characters.md
  - cards/05_Camera_Raea_Pipeline/camera-height-psychology--ten-cinematic-tips.md
sources: ["Lighting 3D Characters for Storytelling.txt", "10 Tips to make Your 3D Render more Cinematic.txt", "How Camera Angles Control What We Feel 8 Essential Shots | Visual Storytelling.txt"]
use_when: "low angle for a big cost, high for overview"
style_fit: Feeds "new camera setup every 2–3 s" — pick each setup's height/lens/roll for the line's relationship. Roll is a held angle, never a whip; height changes on hard cuts or eased flights ≤ ~130°/s. At macro scale "eye level" = the object's own height.
---

## METADATA
05_Camera_Raea_Pipeline | 2.8–3.x sources → 4.2+/5.x | Blender bpy + raea

## CREATIVE_INTENT
Camera height relative to the subject's eye line sets the viewer's power relation: high looking down = overview / viewer
superior / subject lesser; low looking up = viewer small, subject imposing, weight bears down (unease, scale, importance).
Above vs below the eye line matters more than the lens.
- Lighting Characters: adds lens and roll — neutral ~70 mm eye level; slightly low = admire; very low centred = dwarfed;
  directly below + short lens + roll = eerie; ~15 mm high + ~7° roll = dynamic, positive overview; DoF on the subject.
- Ten Cinematic Tips: adds the test method — Walk Navigation to find candidates, Workbench test renders in separate render
  slots, compare side by side.

## STE_PROCEDURE
1. Choose the relationship from the line: calm / admire / dwarfed / eerie / overview (superior) / small viewer (weight).
2. Calm: set ~70 mm, camera at subject height, roll 0.
3. Admire: lower the camera slightly below the subject's top.
4. Dwarfed / weight: place the camera very low (~0.1–0.3 m in a human-scale set; at the surface plane for a macro object), centre the subject, aim up.
5. Eerie: place the camera directly below, shorten the lens, roll it on its view axis.
6. Overview / superior: raise the camera above the subject and aim down; for dynamic-positive use ~15 mm with ~7° roll.
7. Focus DoF on the subject's front feature.
8. Fly the camera with Walk Navigation to test positions (W/A/S/D move, Q down, E up, wheel = speed).
9. Before rendering each candidate, switch the Image Editor render slot so earlier tests are kept.
10. Render quick Workbench test frames (raea: `raea render --frame N`) and keep the one matching the line's emotion.
11. (from 8 Essential Shots) Before building the setup, name which relationship the angle expresses — low = power
    or threat, high = smaller/exposed/outmatched — and write that name in the setup brief, same as you'd name it in
    an image-generation prompt.

## VALUES BY SOURCE
| parameter | Lighting Characters | Ten Cinematic Tips | 8 Essential Shots | recommended for Style D (+ why) |
|---|---|---|---|---|
| neutral lens | ~70 mm, eye level, roll 0 | — | — | ~70 mm-equiv on the hero's own height for calm lines |
| low angle | slightly low (admire) / very low (dwarfed) | ~0.1–0.3 m, aim up | subject towers = power **or threat** | at the table surface looking up — "big cost" or "threat" lines (a fee, a scam) |
| high angle | ~15 mm above + ~7° roll | above, aim down | subject smaller, **exposed or outmatched** | high, longer lens, roll 0 for overview; also for "small shop vs big competitor" / a loss |
| roll | ~7° (dynamic); rolled below (eerie) | — | — | ≤ ~7°, held, reached by an eased move |
| test method | stills | Walk nav + Workbench + render slots | — | raea stills per candidate (stills-for-look-tests rule) |
| planning habit | — | — | name the angle's meaning before building the setup | name the relationship in the setup brief first |

## AGENT_EXECUTION
Blender (5.x):
```python
import bpy
bpy.ops.object.camera_add(location=(0, -6, 0.25))
cam = bpy.context.object; sc = bpy.context.scene; sc.camera = cam
c = cam.constraints.new('TRACK_TO'); c.target = bpy.data.objects["Hero"]
c.track_axis = 'TRACK_NEGATIVE_Z'; c.up_axis = 'UP_Y'
sc.render.engine = 'BLENDER_WORKBENCH'                 # fast test renders
for i, z in enumerate([0.25, 1.6, 4.0]):               # low / eye / high
    cam.location.z = z
    sc.render.filepath = f"//tests/height_{i}.png"; bpy.ops.render.render(write_still=True)
# Walk navigation: bpy.ops.view3d.walk(); render slots: bpy.data.images["Render Result"].render_slots.active_index = n
```
raea (fov is vertical, radians; on 9:16 convert from the lens you want):
```tsx
const mmToFov = (mm: number, sensorH = 24) => 2 * Math.atan(sensorH / (2 * mm));
// low, looking up (big cost):
<Camera3d transform={Transform.fromXyz(0, 0.25, 6).lookingAt([0, 1.2, 0])} projection={{ Perspective: { fov: mmToFov(50) } }} />
// dynamic overview: 15 mm, above, 7° roll
<Camera3d transform={Transform.fromXyz(0, 3.0, 2.0).withRotation(Quat.fromEuler("YXZ", 0, -0.98, 7 * Math.PI / 180))}
  projection={{ Perspective: { fov: mmToFov(15) } }}>
  <DepthOfField focal_distance={3.6} aperture_f_stops={2.8} />
</Camera3d>
// calm: Transform.fromXyz(0, 0.5, 4).lookingAt([0, 0.5, 0]), fov mmToFov(70)
```
Yaw/pitch for `fromEuler("YXZ", yaw, pitch, roll)` are computed camera→subject (~ values); verify with `raea render EDIT.tsx --frame N -o F.png`.

## NOTES
- Deprecated: EEVEE engine id is `BLENDER_EEVEE_NEXT` in 4.2–4.x and `BLENDER_EEVEE` again in 5.x; Workbench test renders still valid.
- Visual gaps: exact camera positions in both videos are shown only.
- Related: "How to Find Nice Camera Angles" (low looking up = larger/overpowering; elevated = implies a balcony/raised space).
- Rule conflicts: rolls and low angles are held or reached by smooth eased moves (≤ ~130°/s); no crash zooms or whip pans.
