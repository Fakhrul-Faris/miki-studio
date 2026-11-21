---
title: Zoom vs moving the camera (lens compression)
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/focal-length-phone-equivalents-distance-vs-zoom--nice-camera-angles.md
  - cards/05_Camera_Raea_Pipeline/focal-length-zoom-vs-camera-move--super-wide-angle.md
  - cards/05_Camera_Raea_Pipeline/lens-compression-focal-sensor-scale--advanced-comp-nuke-wk1.md
sources: ["How to Find Nice Camera Angles in Blender.txt", "How To Get Super Wide Angle Shots in Blender.txt", "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt", "Animate After Effects Camera Guide.txt", "Apple-Style 3D Motion Design.txt"]
use_when: "deciding dolly vs focal change in a move"
style_fit: Core to Style D flights — push-in (camera move) for depth/parallax, focal change only for flat reframing; choose distance and fov together (macro hero far-long, establishing near-wide). Both eased in-out and slow: no crash zooms, camera ≤ ~40 m/s, rotation ≤ ~130°/s; a very close wide lens turns small moves into large screen motion.
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x–4.x / Nuke sources → 4.2+/5.x | Blender bpy → raea Camera3d fov / transform

## CREATIVE_INTENT
Millimetres are just the amount of zoom; zooming keeps perspective, moving the camera changes it. Compression comes from
camera distance, not the lens itself: a long lens forces the camera far away so near and far objects sit at similar relative
distances. So the same subject size from near-wide or far-long feels different — near-wide shows space and stretches depth;
far-long flattens and isolates.
- Nice Camera Angles: phone equivalents (0.5x ≈ 16 mm, 1x ≈ 24 mm, 2x ≈ 50 mm); compare near-wide vs far-long at the same subject size.
- Super Wide Angle: change focal length to reframe without changing perspective; move the camera for parallax/foreground growth; render both and compare.
- Advanced Comp Nuke: the numbers (20 mm: back cube ~2.5× farther; 200 mm: ~1.15–1.2×) and the focal/sensor scale formula to match two plates; read compression from receding angles.

## STE_PROCEDURE
1. Read Focal Length: 50 mm Blender default; ~24 mm ≈ phone main camera (1x); 16 mm ≈ 0.5x; 20 mm fairly wide; 50 mm ≈ 2x.
2. Pick the compression you want first (distance), then the focal length for the framing.
3. Interiors that must show the room: 20–30 mm (24 mm natural default); if too wide for the subject, step in to ~35 mm.
4. Compressed, isolated look: 50–70 mm+ and pull the camera back along its view axis (G Z Z) — distance scales with focal length (d × f1/f0).
5. To reframe without changing perspective, change Focal Length only (zoom).
6. To change perspective (parallax, foreground growth), move the camera's Location instead (push-in).
7. Render the near-wide and far-long (or zoom and push) versions at the same subject size; compare how foreground and background relate; keep the one matching the intent.
8. On 9:16, test the lens on a vertical still — a wide lens's horizontal coverage is much smaller than in 16:9 examples.
9. Matching two plates (backplate): record focal + sensor for each; same sensor → scale BG = FG focal ÷ BG focal (80/40 → 2.0).
10. Different sensors: effective BG focal = BG focal × (FG sensor width ÷ BG sensor width); scale BG = FG focal ÷ effective BG focal (150 mm/25 mm vs 30 mm/20 mm → 37.5 → 4.0; shot: 150/25.53 vs 133/35.9 → 94.58 → 1.58).
11. Reformat plates to equal horizontal resolution first; without metadata, read compression from receding angles (flat, tightly packed = long; strong angles = wide).
12. Before animating any push/truck, scrub it once: if the background moves at the same screen rate as the hero, the scene lacks depth — spread hero/surface/background onto clearly different Z distances before touching the camera (e.g. background ≥ 3× the hero distance) (from Animate After Effects Camera Guide).
13. To calm a background that moves too fast under a push, push it farther away rather than re-keying its speed; bring it closer for more apparent speed (from Animate After Effects Camera Guide).
14. Near-orthographic "catalogue" look (flat, perspective-free product shot): pull the camera far back and zoom to compensate so subject size is unchanged but perspective nearly vanishes; reuse one such camera across every scene that needs to match (from Apple-Style 3D Motion Design) — Style D default stays 70–85 mm; reserve the far-long extreme for a deliberate flat "catalogue" setup only.

## VALUES BY SOURCE
| parameter | Nice Camera Angles | Super Wide Angle | Advanced Comp (Nuke) | recommended for Style D (+ why) |
|---|---|---|---|---|
| wide | 20–30 mm (24 default), 16 mm = 0.5x | 20 mm (≈84° v on 9:16) | close + wide fov 50–70° (dramatic macro) | 24–35 mm establishing only |
| long | 50–70 mm, pulled back | 50 mm default | far + 15–25° fov | 70–85 mm macro hero, far |
| constant size | d = d24 × mm / 24 | — | formula for plates | same rule in TSX |
| move type | compare both | zoom = flat reframe; move = parallax | choose distance first | push-in default; zoom only when flat reframing is the intent, eased |
| sensor fit | Auto (36 mm on tall side) | Auto | `sensor_fit='HORIZONTAL'` suggested | Auto — keeps vfov = 2·atan(18/f); blend2raea exports per-frame fov either way |

### Additional sources (folded, Phase C)
| parameter | Animate After Effects Camera Guide | Apple-Style 3D Motion | recommended for Style D (+ why) |
|---|---|---|---|
| parallax precondition | layers 3D but left on one plane = flat, no real parallax — spread on Z first | one camera copied to every scene for a consistent flat look | check hero/surface/background sit at clearly different depths before any push |
| background speed | push the background farther (not slower keys) to calm it; closer = faster | — | distance, not keyed speed, is the lever for how fast a background layer reads |
| extreme far-long | — | camera at Z −35,000 px, zoom 35,000 (≈ very long lens) — flat catalogue look | only for a deliberate flat "catalogue" setup; default stays 70–85 mm |
| reuse | — | one camera copied into every later scene | matches this master's "one camera (raea rule)" row |

## AGENT_EXECUTION
### Source tool (Nuke)
Sticky note with focal/sensor values → `Transform` scale 1.58 on the reformatted background, before positioning on the horizon.
### Blender 5.x
```python
import bpy
cam = bpy.context.scene.camera
cam.data.lens_unit = 'MILLIMETERS'; cam.data.sensor_fit = 'AUTO'; cam.data.sensor_width = 36
def frame_same(cam, target, lens):
    # keep subject size: distance scales with focal length
    d = (cam.location - target).length
    new_d = d * lens / cam.data.lens
    fwd = (target - cam.location).normalized()
    cam.location = target - fwd * new_d
    cam.data.lens = lens
frame_same(cam, bpy.data.objects["Hero"].location, 70)    # far-long variant
# zoom only (perspective unchanged): cam.data.lens = 20.0
# push-in (perspective changes):    cam.location.y -= 1.0
```
### raea
`fov` is vertical, radians. 9:16 with 36 mm sensor, Auto fit: `fov = 2·atan(18/mm)` — 20 mm ≈ 84°, 24 mm ≈ 73.7°, 35 mm ≈ 54.4°,
50 mm ≈ 39.6°, 70 mm ≈ 28.8°. scene.md: 40° reads as a product lens.
```tsx
const fovFromMm = (mm: number) => 2 * Math.atan(18 / mm);
const e = interpolate(f, [0, 45], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
// zoom: perspective unchanged
<Camera3d transform={Transform.fromXyz(0, 0.3, 2).lookingAt([0, 0.1, 0])} projection={{ Perspective: { fov: interpolate(e, [0, 1], [fovFromMm(35), fovFromMm(70)]) } }} />
// push-in: perspective changes
<Camera3d transform={Transform.fromXyz(0, 0.3, interpolate(e, [0, 1], [2, 1])).lookingAt([0, 0.1, 0])} projection={{ Perspective: { fov: fovFromMm(35) } }} />
// same subject size at another lens: dist = dist24 * mm / 24; eye = target − dir * dist
```
Photo backplate on `<ImagePlane src width position />`: `width = 2 * dist * Math.tan(hfovBG / 2)`, scaled by the plate formula.
BlendShot exports `fov` per frame, so a Blender focal animation carries over.

## NOTES
- Deprecated: none.
- Phone equivalences are 35 mm-equivalent marketing approximations — fine as a mental model.
- Member conflict resolved: the Nuke card's `sensor_fit='HORIZONTAL'` with 36 mm on a 9:16 frame gives vfov = 2·atan(32/f), not 2·atan(18/f); the other members (and this master) use Auto.
- Visual gaps: none of substance.
- Rule conflicts: no crash zooms — FOV changes eased and slow; speed limits apply (close wide lenses exaggerate screen motion).
