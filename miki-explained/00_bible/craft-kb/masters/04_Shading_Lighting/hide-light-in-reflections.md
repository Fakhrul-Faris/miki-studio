---
title: Hide a light's shape in reflections (Glossy visibility off)
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/disable-glossy-ray-visibility-on-light--key-to-realistic-renders.md
  - cards/04_Shading_Lighting/hide-light-in-reflections-mis-glossy--better-lighting-trick.md
sources: ["The Key to Realistic Renders in Blender.txt", "Get Better Lighting in Blender With This Easy Trick.txt"]
use_when: "glossy hero showing a fake CG light rectangle"
style_fit: "Glossy macro heroes (coins, phones, packaging) must not show a fake fill as a white disc/rectangle. raea has no per-light toggle: the fix is light radius/type, placement out of the mirror angle, and surface roughness."
---

## METADATA
04_Shading_Lighting | Blender 3.x/4.x (Cycles) → 5.x / raea | Blender bpy (look-dev) → raea radius / placement / roughness

## CREATIVE_INTENT
Light shapes (and invisible fills) reflect as sharp CG rectangles or white circles in glass, water and metal, which
exposes the trick. Remove the light from reflections or soften its contribution — but on very reflective surfaces a
missing reflection also looks wrong, since a real lamp would reflect; then replace it with a gradient emissive plane.
- Key to realistic renders adds: Glossy ray visibility off on the key; if it looks odd, use a gradient emissive plane instead.
- Better lighting trick adds: try Multiple Importance off first, then Glossy off; compare with lowering Power; use only when needed.

## STE_PROCEDURE
1. Look for each light's shape reflected in glossy surfaces (water, glass, metal).
2. First, in Light Properties (below Power), uncheck Multiple Importance.
3. If highlights are still too strong, open Object Properties › Visibility › Ray Visibility and uncheck Glossy.
4. Compare with simply lowering Power (a different look); pick per scene.
5. Check very reflective materials: if the missing reflection looks odd, use a gradient emissive plane softbox instead.
6. Use this only when needed; usually leave reflections on.
7. In raea, soften instead: larger light `radius`, a RectLight, more surface roughness, or move the light out of the camera's mirror angle.

## VALUES BY SOURCE
| parameter | Key to realistic | Better lighting trick | recommended for Style D (+ why) |
|---|---|---|---|
| Light | key | fills | any light whose shape reads in the hero |
| First step | Glossy off | MIS off | (Blender preview only) |
| Second step | gradient emissive plane if odd | Glossy off (author: all fills) | raea: radius / RectLight / roughness / placement |
| Alternative | — | lower Power | lower intensity if the highlight is just too hot |

## AGENT_EXECUTION
Blender (Cycles look-dev):
```python
import bpy
L = bpy.data.objects["Fill.001"]
L.data.cycles.use_multiple_importance_sampling = False   # 3.x/4.x path; verify in 5.x
L.visible_glossy = False                                  # Object > Visibility > Ray Visibility > Glossy
```
raea: no equivalent per-light MIS or glossy-visibility toggle (Bevy lights have no visible emitter shape, but their
specular highlight still shows on glossy materials). Nearest real controls:
```tsx
{/* bigger, softer highlight */}
<SpotLight ... radius={0.3} soft_shadows_enabled shadow_maps_enabled />
{/* or smaller highlight dot from a fill */}
<PointLight ... radius={0.05} />
{/* soft sheen instead of a dot, placed so its highlight falls off-frame */}
<RectLight transform={Transform.fromXyz(...).lookingAt([...])} width={1} height={1} intensity={...} />
{/* a touch more roughness on the hero */}
<StandardMaterial ... perceptual_roughness={0.3} clearcoat={1} clearcoat_perceptual_roughness={0.1} />
```
For a deliberate soft reflection strip use the gradient-emissive-softbox master.

## NOTES
- Deprecated: light ray visibility moved from `light.cycles` to `Object.visible_*` in 3.0; the Cycles MIS property path
  (`light.cycles.use_multiple_importance_sampling`) should be verified in 5.x (not stated in the videos).
- Visual gaps: none.
- Rule conflicts: none.
