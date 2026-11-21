---
title: Focal length by shot type and mood
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/focal-length-by-shot-type--10-blender-tricks.md
  - cards/05_Camera_Raea_Pipeline/focal-length-mood--ten-cinematic-tips.md
  - cards/05_Camera_Raea_Pipeline/longer-focal-length-reduce-distortion--fundamentals-of-lighting.md
sources: ["10+ Blender Tricks That Will Make Your Renders Cinematic.txt", "10 Tips to make Your 3D Render more Cinematic.txt", "Fundamentals of Lighting in Blender.txt", "Every Composition Concept Explained (In 3D).txt"]
use_when: "choosing lens per setup (macro, wide, product)"
style_fit: Style D hero/macro setups want long lenses (70–85 mm: compressed depth, honest geometry, stronger DoF); 24–30 mm only for establishing/world beats or a deliberate uneasy moment. Any lens change inside a shot is slow and eased — never a crash zoom; prefer moving the camera.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x / 4.x sources → 4.2+/5.x | Blender Camera Lens → raea Perspective fov (vertical, radians)

## CREATIVE_INTENT
The lens should match what the shot is about and how the viewer should feel: wide shows space and context (and bends
perspective), normal reads like the eye, long isolates one point, compresses depth and keeps shapes honest.
- 10 Blender Tricks: decide "place or thing?" — 24 mm environment, 70–80 mm subject.
- Ten Cinematic Tips: mood — 40–50 mm neutral/relatable; 60–120 mm (210 mm+) importance and compression; ~30 mm whole scene with mild unsettling bend.
- Fundamentals of Lighting: 50 mm still bends a box's verticals; ~80 mm (camera pulled back) reads cleaner; very long looks orthographic, very short fisheye-like (stylised/intimate).

## STE_PROCEDURE
1. Decide what the shot is about: the place (environment) or the thing (hero object), and the mood.
2. Select the camera, open Object Data Properties > Lens; keep Sensor 36 mm, Fit Auto so mm values match the videos.
3. Environment / establishing: set Focal Length 24 mm (~30 mm for a slightly unsettling whole-scene view).
4. Neutral, relatable: set 40–50 mm.
5. Hero / product: set 70–85 mm (80 mm balance for boxy objects); 60–120 mm+ to make one point important.
6. Move the camera back along its view axis until the framing matches (keep subject size: distance × f1/f0) — move the camera, not the lens, to re-frame.
7. Compare with the previous lens render; check perspective lines at the frame edges (wider bends more).
8. If the image starts to feel orthographic, reduce the focal length.
9. (from every-composition-concept) For a deliberate extreme-distortion beat: 12 mm exaggerates features (wide),
   200 mm flattens them (long) — reserve the 12 mm extreme for at most one distortion beat per episode, never a
   default lens.

## VALUES BY SOURCE
| parameter | 10 Blender Tricks | Ten Cinematic Tips | Fundamentals of Lighting | every-composition-concept | recommended for Style D (+ why) |
|---|---|---|---|---|---|
| wide | 24 mm environment | ~30 mm (unsettling) | very short = fisheye-like | 12 mm extreme ("exaggerates features") | 24 mm establishing only (vfov ≈ 73.7°) |
| normal | — | 40–50 mm | 50 mm bends verticals | — | 50 mm for room/UI-on-desk setups (≈ 39.6°) |
| long | 70–80 mm subject | 60–120 mm, 210 mm+ | 80 mm product | 200 mm extreme ("flattens them") | 75–85 mm macro hero (≈ 27°–24°); kit ProStage fov 0.6 rad ≈ 34° vertical |
| re-frame | move camera | move camera | dolly back × f1/f0 | — | dolly × f1/f0 |

Fov at the extremes (36 mm sensor, vfov = 2·atan(18/f)): 12 mm ≈ 112.6° (vertical, 9:16); 200 mm ≈ 10.3°.

Vertical fov on 9:16 (36 mm sensor, Auto fit → the long, vertical side): 24 mm ≈ 73.7°, 30 mm ≈ 62°, 50 mm ≈ 40°, 70 mm ≈ 28.9°,
80 mm ≈ 25.4° (0.443 rad), 85 mm ≈ 24°, 120 mm ≈ 17°. Landscape 16:9: vertical fov = 2·atan(10.125/f).

## AGENT_EXECUTION
Blender 5.x:
```python
import bpy
cam = bpy.context.scene.camera
cam.data.lens_unit = 'MILLIMETERS'
cam.data.sensor_fit = 'AUTO'; cam.data.sensor_width = 36.0
f0, f1 = cam.data.lens, 80.0           # 24 environment / 50 neutral / 75–85 hero
cam.data.lens = f1
tgt = bpy.data.objects["Hero"].location
cam.location = tgt + (cam.location - tgt) * (f1 / f0)   # dolly back to keep subject size
```
raea (vertical fov, radians):
```tsx
const fovFromMm = (mm: number) => 2 * Math.atan(18 / mm);   // 9:16, 36 mm sensor, Auto fit
<Camera3d transform={Transform.fromXyz(0, 0.9, 4.8).lookingAt([0, 0.3, 0])}
  projection={{ Perspective: { fov: fovFromMm(80) } }}>
  <DepthOfField focal_distance={4.8} aperture_f_stops={2.8} />
</Camera3d>
```
The scene skill calls ~40° vertical "a product lens" and 60°+ "wide". Shots exported from Blender already carry fov through
BlendShot (`blend2raea.py`). A longer lens strengthens the DoF falloff for the same framing (helps shallow focus).

## NOTES
- Deprecated: none.
- Check `cam.data.sensor_fit` before converting (landscape: the sensor spans the width).
- Visual gaps: dolly distance by eye (Fundamentals).
- Rule conflicts: animated focal changes ease in-out, never crash-zoom; prefer moving the camera (see zoom-vs-move-compression master).
- every-composition-concept: 12 mm/200 mm are stated as extremes for effect, not working lenses — use rarely and
  deliberately (a multiply/"so many" beat suits 200 mm's compression; 12 mm suits a single disorientation beat).
  Doesn't change the Style D working range (24/50/75–85 mm).
