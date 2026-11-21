---
title: Dim fill to lift shadow detail (keep the dark)
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/area-light-shadow-lift-fill--dark-environments.md
  - cards/04_Shading_Lighting/dim-fill-for-shadow-side--fundamentals-of-lighting.md
  - cards/04_Shading_Lighting/large-dim-fill-lifts-crushed-blacks--product-animation-masterclass.md
sources: ["How to Make DARK Environments in Blender.txt", "Fundamentals of Lighting in Blender.txt", "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"]
use_when: "dark-room macro where blacks crush on the phone"
style_fit: "The 'little fill' under Style D's single soft top light: shadow side reads as shadow but keeps texture/labels; fill stays neutral or cool-grey and well below the key so the brand accent stays the only saturated hue."
---

## METADATA
04_Shading_Lighting | Blender 4.x–4.3 → 5.x / raea | Blender bpy + raea

## CREATIVE_INTENT
After the key alone, the shadow side is a black hole: modelled detail, a label or a price tag is lost, and a black product
clips to 0 so there is nothing to grade. One big, soft, dim light reveals what is already there without making it
daytime or adding a new light direction — "it doesn't do that much, but enough". Every light needs a purpose; ignore
fixed key:fill ratios.
- Dark environments adds: area light just above/ahead of the camera; key + this fill ≈ 80% of the look; overshoot once
  then dial back; bigger dim duplicates deeper in the set where bounce is plausible.
- Fundamentals of lighting adds: duplicate the key to the shadow side, judge by eye with other lamps hidden, nudge it to
  catch a bevel or texture; no ratio formula.
- Product masterclass adds: a huge (~8 m) very dim (~30 W) area light at an angle for a 15 cm product, to lift crushed
  blacks for grading headroom.

## STE_PROCEDURE
1. Before adding the fill, settle the key light alone.
2. Add a large Area light: either just above and slightly ahead of the camera, or to the subject's shadow side at an angle
   (or duplicate the key with Shift+D and move it to the shadow side).
3. Make it much larger than the subject (soft) and set Power low.
4. Before you adjust it, hide every other lamp; tune it alone.
5. Raise Power until the shadow side goes from crushed black to dark grey with visible form/labels; it must still read as shadow.
6. Push it too far once (the scene stops being dark), then dial back.
7. Nudge its position until it picks up a bevelled edge or a useful texture detail.
8. Show all lamps; toggle the fill off/on: it must only reveal shadow detail, not add a new light direction.
9. Judge by eye; do not apply a fixed key-to-fill ratio.
10. If deeper areas stay black, duplicate the fill, move it back into the set, make it larger and still dim, where ambient bounce could plausibly come from.
11. Check the still on a phone at low brightness.

## VALUES BY SOURCE
| parameter | Dark environments | Fundamentals of lighting | Product masterclass | recommended for Style D (+ why) |
|---|---|---|---|---|
| Placement | above camera, slightly ahead | shadow side (duplicated key) | off to one side, angled | above/near camera or shadow side; never a second hard direction |
| Size | ~4 m (~), rear dup ~10 m | key's size | ~8 m (huge vs 15 cm can) | ≥ 20× subject size (soft, directionless) |
| Power | 500 → 1,000 → 2,000 W final; 20,000 too much; rear dup 3,000 W | "a little brighter than off", ~0.2 × key (key 460 W) | ~30 W | start ~0.1–0.2 × key, by eye |
| Colour | — | slightly cool (`#cfd8ff`~) | white | neutral or cool-grey (accent stays alone) |
| raea form | AmbientLight 40 + RectLight 60,000 3×3 m | SpotLight 300,000 or RectLight 150,000 1×1 m; kit AmbientLight 60 `#9FB2D9` | AmbientLight 20 or RectLight 40,000 4×4 m + AO high | AmbientLight 15–40 + one big dim RectLight; AO keeps contact shadows |

## AGENT_EXECUTION
Blender (build/preview):
```python
import bpy
from mathutils import Vector
cam = bpy.context.scene.camera
d = bpy.data.lights.new("FillArea", type='AREA'); d.energy = 2000; d.size = 4.0      # dark-env scale; ~ size
o = bpy.data.objects.new("FillArea", d); bpy.context.collection.objects.link(o)
o.location = cam.location + cam.matrix_world.to_3x3() @ Vector((0, 2.0, -1.0))     # ~ above, slightly ahead
o.rotation_euler = (0, 0, 0)                                                        # facing down
# variant: product scale (15 cm) — huge, very dim, angled from the side
p = bpy.data.lights.new("FillBig", 'AREA'); p.size = 8.0; p.energy = 30.0
po = bpy.data.objects.new("FillBig", p); po.location = (-3.0, -2.0, 1.5); po.rotation_euler = (1.2, 0, -0.9)
bpy.context.collection.objects.link(po)
# variant: duplicated key on the shadow side
key = bpy.data.objects["Key"]
fill = key.copy(); fill.data = key.data.copy(); bpy.context.collection.objects.link(fill)
fill.location = (-1.8, -0.6, 1.4); fill.data.energy = key.data.energy * 0.2         # ~ tune by eye
# deeper set: bigger, still dim duplicate where bounce is plausible
d2 = d.copy(); d2.energy = 3000; d2.size = 10.0
o2 = bpy.data.objects.new("FillAreaRear", d2); bpy.context.collection.objects.link(o2)
```
raea:
```tsx
<AmbientLight brightness={20} color="#9FB2D9" />    {/* floor of the shadows; color as used in kit/pro.tsx (not in skill docs) */}
<RectLight transform={Transform.fromXyz(-2, 1, 1.5).lookingAt([0, 0.08, 0])}
  intensity={40000} width={4} height={4} color="#dfe6f2" />                     {/* ~ big dim soft fill, no shadows */}
{/* variant: dim spot on the shadow side, by eye */}
<SpotLight transform={Transform.fromXyz(-1.8, 1.4, 0.6).lookingAt([0, 0.3, 0])} intensity={300000}
  outer_angle={0.6} inner_angle={0.3} color="#cfd8ff" />
<AmbientOcclusion quality="high" />                 {/* AO shades ambient only, so contact shadows survive the lift */}
```
`RectLight` casts no shadows (fine for a fill). With an `<Environment>` keep `AmbientLight` ≤ 20–80 (lights.md).
Bracket the fill off / ×4 / ×0.25 on stills.

## NOTES
- Deprecated: none.
- Visual gaps: exact positions and sizes are viewport-only (dark env ~08:21–09:00; rear duplicate's location not
  narrated); fundamentals gives no fill number (key was 460 W); masterclass position/angle visual only.
- Rule conflicts: none — keep the fill well below the top key so the dark-room mood stays, and neutral/cool-grey so the
  brand accent remains the only saturated hue.
