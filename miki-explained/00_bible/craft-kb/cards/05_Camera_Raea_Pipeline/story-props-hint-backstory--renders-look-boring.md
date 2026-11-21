---
title: Environmental storytelling: place props that hint at a larger story
bucket: 05_Camera_Raea_Pipeline
source: "Why your Blender renders look BORING.txt"
source_time: "03:31–04:53, 05:22–06:11"
blender_version_source: n/a (art direction)
tool_target: principle-only | Blender bpy
tier: full
style_fit: Fits the macro hero on a real surface: one or two story props (a crumpled receipt, a half-empty cup) say who owns the business without people in shot.
---

## METADATA
05_Camera_Raea_Pipeline | n/a | principle-only

## CREATIVE_INTENT
Strategically placed props give context: a tipped-over mine cart says "abandoned"; incense burners say spiritual; treasure chests say a place of value; stairs say there is more to explore. Each prop is a sentence of backstory the viewer reads without narration.

## STE_PROCEDURE
1. Write one line of backstory for the setup (e.g. "the stall closed early; money was tight").
2. List 2–3 props that would exist only if that backstory were true.
3. Place each prop where it is seen but secondary to the hero (edges, mid-ground, partly in DoF blur).
4. Give each prop a state that tells time or use: tipped, worn, half-full, stacked.
5. Check the frame: remove any prop that contradicts the script line or competes with the hero.

## AGENT_EXECUTION
Blender (set dressing pass after the hero is lit):
```python
import bpy, math
STORY = [("PROP_receipt_crumpled", (0.25, -0.1, 0.0), 35),   # ~ name, location, z-rotation deg
         ("PROP_cup_half",         (-0.3, 0.2, 0.0), -10)]
for name, loc, rz in STORY:
    o = bpy.data.objects[name]; o.location = loc; o.rotation_euler.z = math.radians(rz)
```
raea: props are `<Model>`s; keep them out of the brand accent colour and let `<DepthOfField>` soften them. A prop that enters mid-shot fades or slides in over ~0.4 s (`name` it so it is matched across frames).

## NOTES
- Deprecated: none.
- Visual gaps: example images only on screen.
- Rule conflicts: no people in street scenes by default; props hint at people instead. The video's figure ("this guy discovering this") is a still pose; ours hold poses too if ever used.
