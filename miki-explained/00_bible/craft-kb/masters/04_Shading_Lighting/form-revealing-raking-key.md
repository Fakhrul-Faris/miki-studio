---
title: Hard raking side key so shadows reveal form
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/hard-side-light-reveals-form--improve-compositions.md
  - cards/04_Shading_Lighting/raking-key-angle-reveals-form--serene-render.md
  - cards/04_Shading_Lighting/shadow-reveals-form--fundamentals-of-lighting.md
sources: ["3 Ways to Improve Your Compositions in Renders.txt", "Making a SERENE render in blender.txt", "Fundamentals of Lighting in Blender.txt"]
use_when: "showing texture/relief of the hero object"
style_fit: "Partial (strictest): Style D's key is one soft TOP light. Default = tilt that top key off-axis toward a raking top-side angle; a hard ~90° side key is a per-setup variant only when surface detail (emboss, relief, weave) is the line's point. Any key orbit in shot is slow and eased."
---

## METADATA
04_Shading_Lighting | Blender 4.x (EEVEE Next) → 5.x / raea | Blender bpy + raea

## CREATIVE_INTENT
Shadow is how the eye reads shape: without it a viewer can't tell a protrusion from an intrusion, and a frontal or
straight-overhead key turns a hero into a flat blob. The fix is to move the one key off-axis toward a raking angle — not
to add lights that kill the shadows. Half of lighting is placing shadow.
- Improve compositions adds: strongest form contrast from a hard source at ~90° to the camera, one side only, world very
  dim, no fill from the other side.
- Serene render adds: rake the key more extreme AND turn the subject slightly away from it; clear hidden clutter first;
  orbit the key to explore mood (no angle is "right").
- Fundamentals of lighting adds: world strength 0, one lamp; don't add lamps just to remove shadows (each flattens form);
  a key straight above or behind the camera reads flat — rotate it a few degrees off-axis; fill only if detail is hidden.

## STE_PROCEDURE
1. Set World Background Strength to 0–0.02 so only placed lamps light the scene.
2. Before adding lights to fix a "blobby" subject, delete hidden clutter that blocks repositioning the key.
3. Place one key; if it sits straight above or straight behind the camera, rotate it off-axis (Style D: 20–45° off the top).
4. For maximum form contrast on a detail beat, move it toward ~90° to the camera's view direction, one side only.
5. Rake it steeper relative to the surface until relief, emboss or weave casts visible shadow.
6. Rotate the subject slightly away from the light.
7. Keep the source small/hard for crisp detail shadows on a detail beat; otherwise keep the Style D soft radius.
8. Do not add lamps only to remove shadows; no fill from the opposite side by default.
9. Check that recesses and protrusions now show a clear shadow edge.
10. If the shadow side hides detail the line needs, add one dim fill (see dim-fill-lift-shadows).
11. To explore mood, render stills with the key at four azimuths and pick one.

## VALUES BY SOURCE
| parameter | Improve compositions | Serene render | Fundamentals of lighting | recommended for Style D (+ why) |
|---|---|---|---|---|
| World | very dim, ~0.02 | — | Strength 0 | 0 (dark room) + raea AmbientLight 10–40 |
| Key angle | ~90° to camera, one side | "more extreme" rake, ~+25° (~); subject turned ~−15° | a few degrees off a top/behind-camera axis (sun ~25°, 10°) | top-side rake, ~40° above the surface; 90° side only on detail beats |
| Hardness | hard: Spot `shadow_soft_size` ~0.05 | soft-ish, raea radius 0.15 | point / sun | soft radius 0.15 (house); hard only for a relief close-up |
| Power | ~2,000 W (several spots one side; count not stated) | raea 1,500,000 lm | Point 460 W; raea sun 10,000 lux | raea SpotLight ~1.5 M lm at ~1.5 m (~) |
| Fill | none | — | only if detail hidden | none by default |
| raea ambient | 10 or none | — | 40–80 | 10–40 |

## AGENT_EXECUTION
Blender:
```python
import bpy, math
from mathutils import Vector
sc = bpy.context.scene
sc.world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.0      # 0.02 also used
hero = bpy.data.objects["Hero"]; cam = sc.camera; H = hero.location
# Style D default: top-side raking key, tilted off the lens axis
bpy.ops.object.light_add(type='SPOT', location=H + Vector((-1.2, 0.2, 1.0)))
key = bpy.context.object; key.data.energy = 460; key.data.shadow_soft_size = 0.15
t = key.constraints.new('TRACK_TO'); t.target = hero
hero.rotation_euler.z += math.radians(-15)                                         # ~ turn away from the light
# detail-beat variant: hard key at 90° to the view direction, one side only
view = (H - cam.location).normalized(); side = view.cross(Vector((0, 0, 1))).normalized()
bpy.ops.object.light_add(type='SPOT', location=H + side * 4 + Vector((0, 0, 1.5)))
hard = bpy.context.object; hard.data.energy = 2000; hard.data.shadow_soft_size = 0.05   # ~ hard
hard.constraints.new('TRACK_TO').target = hero
# sun variant: tilt off a straight-down axis
bpy.ops.object.light_add(type='SUN', rotation=(math.radians(25), math.radians(10), 0))  # ~ angles inferred
```
raea:
```tsx
<AmbientLight brightness={20} />
{/* Style D: soft top-side raking key, ~40° above the surface */}
<SpotLight transform={Transform.fromXyz(-1.2, 1.0, 0.2).lookingAt([0, 0, 0])} intensity={1_500_000}
  outer_angle={0.5} inner_angle={0.25} radius={0.15} soft_shadows_enabled shadow_maps_enabled />
{/* detail-beat variant: hard ~90° side key (no soft_shadows_enabled) */}
<SpotLight transform={Transform.fromXyz(sideX, 1.5, sideZ).lookingAt([0, 0, 0])} intensity={1_800_000}
  outer_angle={0.4} inner_angle={0.2} shadow_maps_enabled />
{/* sun variant */}
<DirectionalLight transform={Transform.fromXyz(1.2, 6, 2).lookingAt([0, 0, 0])} illuminance={10000} shadow_maps_enabled soft_shadow_size={0.5} />
<Shadows distance={5} firstCascade={1} />   {/* ~ tight cascades for crisp small-scale shadows */}
```
Shadows appear only with `shadow_maps_enabled` and a surface to receive them. A light at the camera position gives flat
flash-photo light — offset it 20–45° (`~`). Mood exploration: stills with the key at `Transform.fromXyz(r*Math.cos(a), h,
r*Math.sin(a))` for four azimuths.

## NOTES
- Deprecated: none.
- Visual gaps: exact angles, the crate's readable rotation and the composition video's spot count/energies are shown, not stated (`~`).
- Rule conflicts: Style D's key is one soft TOP light — a raking key is a top-side light kept soft and single; the hard
  90° side key is a per-setup variant when detail is the subject. Animating a key orbit inside a shot must be slow and
  eased. Keep ambient low so the shadow side stays dark but not black.
