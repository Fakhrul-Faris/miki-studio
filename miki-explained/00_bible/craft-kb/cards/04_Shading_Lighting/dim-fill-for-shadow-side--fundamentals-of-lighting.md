---
title: Dim purpose-driven fill for the shadow side (no key/fill ratio formula)
bucket: 04_Shading_Lighting
source: "Fundamentals of Lighting in Blender.txt"
source_time: "04:09–05:07; 34:39–35:38"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Fits Style D — the dark room stays dark; a faint second light only lifts the shadow side enough to read stickers, labels or edges.
---

## METADATA
04_Shading_Lighting | 4.x | Blender bpy, raea

## CREATIVE_INTENT
When the shadow side hides detail the story needs (a label, a sticker, a price tag), add a second light just bright enough to see into it while it still clearly reads as shadow. Every light needs a purpose; don't think "key, fill, rim" by recipe, and ignore fixed ratios such as "fill = half of key".

## STE_PROCEDURE
1. Select the key lamp and duplicate it (Shift+D).
2. Move the duplicate to the shadow side of the subject.
3. Lower its Power until the shadow side reads as shadow but details are visible.
4. Judge by eye; do not apply a fixed key-to-fill ratio.
5. Before you adjust this lamp, hide every other lamp.
6. Nudge it until it picks up a bevelled edge or a useful texture detail.
7. Show all lamps again and compare.

## AGENT_EXECUTION
Blender:
```python
import bpy
key = bpy.data.objects["Key"]
fill = key.copy(); fill.data = key.data.copy(); bpy.context.collection.objects.link(fill)
fill.location = (-1.8, -0.6, 1.4)          # ~ shadow side
fill.data.energy = key.data.energy * 0.2   # ~ start low, tune by eye (video: "a little brighter than off")
key.hide_render = True                      # isolate while tuning; restore after
```
raea:
```tsx
<SpotLight transform={Transform.fromXyz(-1.8, 1.4, 0.6).lookingAt([0, 0.3, 0])} intensity={300000} // ~ by eye
  outer_angle={0.6} inner_angle={0.3} color="#cfd8ff" />
// or the softer shadowless panel:
<RectLight transform={Transform.fromXyz(-2, 1.5, 1).lookingAt([0, 0.3, 0])} intensity={150000} width={1} height={1} />
```
House reference: `kit/pro.tsx` ProStage uses `<AmbientLight brightness={60} color="#9FB2D9" />` as the dim cool fill.

## NOTES
- Deprecated: none.
- Visual gaps: the fill's final strength is "by eye" — no number given (the key was 460 W).
- Rule conflicts: none. If the line's accent colour is the brand accent, keep the fill neutral or cool-grey so the accent stays the only saturated hue.
