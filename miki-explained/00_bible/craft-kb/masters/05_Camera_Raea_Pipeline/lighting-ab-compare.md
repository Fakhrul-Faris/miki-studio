---
title: A/B lighting comparison (collections / render slots)
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/collection-ab-lighting-setups--good-lighting-environments.md
  - cards/05_Camera_Raea_Pipeline/render-slot-ab-compare--fundamentals-of-lighting.md
sources: ["How to get good lighting in blender.srt", "Fundamentals of Lighting in Blender.txt"]
use_when: "choosing between two light setups"
style_fit: Fits stills-for-look-tests and the A/B/C style tests — compare lighting on stills, keep the approved setup intact, and break tunnel vision with a fresh viewer (house `fresh-critic` skill; the builder never scores its own work). No test clip renders unless asked.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x / 4.x sources → 4.2+/5.x | Blender bpy + raea stills

## CREATIVE_INTENT
Lighting judgements drift; keep whole setups switchable and flip between the previous and current render to see whether a
change helped, and occasionally try something radically different to escape micro-tweaks.
- Good Lighting Environments: park each setup in its own hideable collection (World/HDRI as separate World datablocks) — toggling switches whole rigs, so experiments are risk-free.
- Fundamentals of Lighting: render-slot flipping for one change at a time, "throw a spanner" radical variants, and show the options to someone who hasn't been staring at them.

## STE_PROCEDURE
1. Select every light of the current setup (incl. world/HDRI proxies); press M → New Collection; name it after the setup (e.g. "Golden hour").
2. Store World/HDRI alternatives as separate World datablocks.
3. Render the current setup into a render slot (or save a still).
4. Disable the collection (the scene goes black) and build the next setup in a new collection.
5. Switch to the next empty render slot; make one lighting change and render again.
6. Flip between the slots / toggle collections and keep the better one.
7. Sometimes build a radically different setup and compare it too.
8. Save each variant to disk for a side-by-side.
9. Show the options to a fresh viewer before deciding.

## VALUES BY SOURCE
| parameter | Good Lighting Environments | Fundamentals of Lighting | recommended for Style D (+ why) |
|---|---|---|---|
| storage | collection per setup (+ World datablocks) | render slots | collection per rig in the check .blend; rig component per variant in TSX |
| compare | toggle collections | flip slots, one change at a time | side-by-side stills (ffmpeg hstack) |
| radical variant | "something completely different" | "throw a spanner" | yes, one per look test |
| judge | self | fresh viewer | `fresh-critic` skill |

## AGENT_EXECUTION
Blender 5.x:
```python
import bpy
sc = bpy.context.scene
lights = [o for o in sc.objects if o.type == 'LIGHT']
col = bpy.data.collections.new("Light_GoldenHour"); sc.collection.children.link(col)
for o in lights:
    for c in o.users_collection: c.objects.unlink(o)
    col.objects.link(o)
col.hide_render = True; col.hide_viewport = True             # park it
sc.world = bpy.data.worlds["W_Overcast"]                     # World alternatives are datablocks
img = bpy.data.images["Render Result"]
img.render_slots.active_index = 3                            # slot 4 (0-based)
bpy.ops.render.render()                                       # F12 into this slot
img.save_render(filepath="//light_try_04.png")
```
raea: each rig is its own component, picked by a constant; one still per variant, then side by side:
```tsx
const RIG = "golden";   // "golden" | "spot" | "overcast"
{RIG === "golden" && <GoldenRig />}{RIG === "spot" && <SpotRig />}{RIG === "overcast" && <OvercastRig />}
```
```bash
raea render EDIT.tsx --frame N -o light_vA.png   # RIG = A
raea render EDIT.tsx --frame N -o light_vB.png   # RIG = B
ffmpeg -i light_vA.png -i light_vB.png -filter_complex hstack ab.png
```

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none; judge on stills (no test clip renders unless asked); scoring by a fresh critic, not the builder.
