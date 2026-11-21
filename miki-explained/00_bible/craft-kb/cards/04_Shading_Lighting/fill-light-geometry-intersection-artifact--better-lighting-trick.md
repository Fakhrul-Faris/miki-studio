---
title: Keep fill lights clear of geometry (intersection lines)
bucket: 04_Shading_Lighting
source: "Get Better Lighting in Blender With This Easy Trick.txt"
source_time: "05:48–06:21"
blender_version_source: 3.x/4.x (Cycles)
tool_target: raea
tier: full
style_fit: Macro close-ups magnify any light artefact on the hero object; a clean fill placement check belongs in every Style D lighting pass.
---

## METADATA
04_Shading_Lighting | Blender 3.x/4.x (Cycles) | Blender bpy + raea

## CREATIVE_INTENT
A stretched area light that passes through an object (here, chains) can draw a harsh line across it and "ruin everything". Check
every fake fill's extent against nearby geometry before rendering.

## STE_PROCEDURE
1. After you place or stretch a fill, orbit around it.
2. Check whether its shape intersects any mesh.
3. If it does, move it or shrink Size so it clears the mesh.
4. Re-render the area at full resolution and look for a hard bright/dark line.

## AGENT_EXECUTION
### Blender
```python
import bpy, mathutils
def light_hits(light, objs):
    r = max(light.data.size, getattr(light.data, "size_y", 0)) / 2 if light.data.type == 'AREA' else light.data.shadow_soft_size
    for o in objs:
        if o.type != 'MESH': continue
        bb = [o.matrix_world @ mathutils.Vector(c) for c in o.bound_box]
        lo = mathutils.Vector([min(v[i] for v in bb) for i in range(3)]); hi = mathutils.Vector([max(v[i] for v in bb) for i in range(3)])
        p = light.location
        if all(lo[i] - r <= p[i] <= hi[i] + r for i in range(3)): yield o.name
```
(Bounding-box check — coarse; confirm visually.)
### raea
- `<PointLight>` inside a mesh: its light never leaves the mesh (lights.md) — the raea version of this failure.
- `<RectLight width height>` crossing a surface lights it from inside: keep the rect in open air; shrink `width`/`height`.
- Check with `raea render EDIT.tsx --frame N -o F.png` at the closest camera setup of the shot.

## NOTES
- Deprecated: none.
- Visual gaps: the artefact itself is not shown clearly ("you can't really see it" in this render).
- Rule conflicts: none.
