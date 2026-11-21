---
title: Pair every emissive practical with a real light
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/emissive-practical-plus-light--ten-cinematic-tips.md
  - cards/04_Shading_Lighting/practical-light-carries-emissive--beautiful-fire.md
sources: ["10 Tips to make Your 3D Render more Cinematic.txt", "How to Make Beautiful Fire in Blender.txt"]
use_when: "a glowing sign/screen that must light its surroundings"
style_fit: "Mandatory in raea (emissive surfaces don't light neighbours): screens, LEDs, signs, flames glow with bloom AND get a matching light. Any flicker is gentle, low amplitude, from the frame — never strobing."
---

## METADATA
04_Shading_Lighting | Blender 3.x/4.x → 5.x / raea | Blender bpy + raea

## CREATIVE_INTENT
A glowing surface (screen, lit window, lamp head, moon, flame card) sells the source, but in real-time it does not light
the scene. Keep the emissive "just visible" and bright enough to bloom, and let a real light of matching colour and shape,
hidden at the source, do the lighting.
- Ten cinematic tips adds: match light TYPE and shape to the practical — Sun for a moon, rectangular Area fitted to a
  window frame, Area under each lamp head; Emission Strength > 1 so it blooms; edit instanced practicals' shared material once.
- Beautiful fire adds: an emissive as the only source is noisy/flickery — turn it down; a Point light with Radius ≈ emitter
  size carries the lighting; keep a controlled flicker; MIS off if the light shows as a sphere in reflections.

## STE_PROCEDURE
1. Assign an Emission material to the visible source faces (Edit Mode: select faces, assign a new material).
2. Set Emission Strength above 1 so it reads bright and blooms; for a flame/screen used as a source, lower it until "just visible".
3. Add a matching light at the emitter: Sun for a moon, a rectangular Area fitted to a window/screen, an Area under each lamp head, a Point for a flame/bulb.
4. Size the light to the emitter (Area size = frame; Point Radius ≈ emitter size).
5. Match the light's colour to the emission colour.
6. Raise the light's Power until the surroundings read.
7. For flames, add a gentle deterministic flicker to the light (not the emissive alone).
8. If the light shows as a sphere in glossy/water reflections, disable its Multiple Importance (Cycles preview only).
9. If the practicals are instances, edit the shared material once.

## VALUES BY SOURCE
| parameter | Ten cinematic tips | Beautiful fire | recommended for Style D (+ why) |
|---|---|---|---|
| Emissive strength | > 1, ~5 | lowered to "just visible" | raea `.mul(3–6)` with `<Bloom threshold 0.9>` (glow reads on phone) |
| Light type | Sun (moon), Area (window, lamp head) | Point, Radius ≈ emitter (~0.25), MIS off | RectLight for flat screens/signs; PointLight for bulbs/flames |
| Colour | match emission (`#ff9a4d` ~) | orange (1.0, 0.5, 0.15) ~ | match emission hex exactly |
| Power | — | ~200 W (visual only) | raea RectLight/PointLight ~150,000 at close range (~) |
| Flicker | — | keep a little, controlled | ±12% + ±6% sines from the frame |

## AGENT_EXECUTION
Blender:
```python
import bpy
m = bpy.data.materials.new("Win"); m.use_nodes = True
b = m.node_tree.nodes["Principled BSDF"]
b.inputs["Emission Color"].default_value = (1, 0.55, 0.25, 1)
b.inputs["Emission Strength"].default_value = 5                 # ~
# Edit Mode, faces selected: bpy.ops.object.material_slot_assign()
bpy.ops.object.light_add(type='POINT', location=(0, 0, 0.3))    # flame / bulb
l = bpy.context.object.data
l.shadow_soft_size = 0.25; l.color = (1.0, 0.5, 0.15); l.energy = 200   # ~ visual only
l.cycles.use_multiple_importance_sampling = False               # Cycles preview only; verify path in 5.x
```
raea:
```tsx
const f = useCurrentFrame();
const flick = 1 + 0.12 * Math.sin(f * 0.9) + 0.06 * Math.sin(f * 2.3);   // deterministic, gentle
<Bloom intensity={1} threshold={0.9} />
{/* screen / window / sign: emissive + matching panel */}
<Mesh3d name="screen">...<StandardMaterial base_color="#1a1a1a" emissive={LinearRgba.from(Srgba.hex("#ff9a4d")).mul(6)} /></Mesh3d>
<RectLight transform={Transform.fromXyz(0, 0.8, 0.05).lookingAt([0, 0.8, 1])} width={1.2} height={1.6} color="#ff9a4d" intensity={150000} />
{/* bulb / flame: point light carrying the lighting */}
<PointLight transform={Transform.fromXyz(0, 0.1, 0.15)} color="#ffb070" intensity={150000 * flick} range={3} radius={0.1} />
```
- `<Fire light>` already adds a flickering PointLight; set `light={0}` if you place your own (post.md).
- Keep the light on the camera side of a flame near a wall (a light of 1 at 0.8 m turns a wall white — post.md).
- No MIS toggle in raea: punctual lights have no visible shape; if a specular hot spot bothers, raise the surface's
  `perceptual_roughness`.

## NOTES
- Deprecated: Principled v1 "Emission" → 4.x "Emission Color". `light.cycles.use_multiple_importance_sampling` is a 3.x
  path — verify in 5.x (Cycles is preview-only for us anyway).
- Visual gaps: light powers and radius values are on screen only.
- Rule conflicts: flicker must be gentle (low amplitude, from the frame), never strobing; emissives switching on ramp over ~0.4 s.
