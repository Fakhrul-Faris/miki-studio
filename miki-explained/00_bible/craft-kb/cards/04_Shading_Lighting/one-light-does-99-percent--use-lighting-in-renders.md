---
title: One dominant light does 99% of the work — the delete-the-rest test
bucket: 04_Shading_Lighting
source: "How To Use Lighting In Your Renders  Blender Tutorial.txt"
source_time: "00:35–01:53"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Direct match for Style D one soft top light: prove every extra light earns its place, or delete it.
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Blender bpy (light audit) → raea one key light

## CREATIVE_INTENT
Most good scenes are lit by one strong light; the rest add little. Isolating each light and deleting the ones that do nothing keeps the image clean, readable and focused.

## STE_PROCEDURE
1. Put every light in one collection.
2. Hide all lights except one; render the camera view.
3. Repeat for each light and judge how much it changes the frame.
4. Delete lights whose contribution is "basically nothing".
5. Keep the one light that "hits the hardest" as the key (the video: one 1,000,000 W light).

## AGENT_EXECUTION
```python
import bpy
lights = [o for o in bpy.data.collections["Lights"].objects if o.type == "LIGHT"]
for solo in lights:
    for o in lights: o.hide_render = (o is not solo)
    bpy.context.scene.render.filepath = f"//_audit/solo_{solo.name}.png"
    bpy.ops.render.render(write_still=True)       # EEVEE audit stills only; raea renders finals
for o in lights: o.hide_render = False
```
raea: the same audit is a `--frame N` render with lights commented out (`raea render EDIT.tsx --frame N -o F.png`). Target rig: one key (`<SpotLight ... soft_shadows_enabled shadow_maps_enabled radius>` or `<DirectionalLight soft_shadow_size>`) plus `<AmbientLight brightness={20-80}>`; BlendShot already treats the strongest exported light as key.

## NOTES
- Deprecated: none.
- Visual gaps: light values per scene not given ("don’t worry about intensity values, they change with scale").
- Rule conflicts: none — reinforces the house rule.

