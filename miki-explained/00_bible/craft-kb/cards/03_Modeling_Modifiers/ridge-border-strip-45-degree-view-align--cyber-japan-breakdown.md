---
title: Ridge/border tile strip (bevel + array) aligned on a 45° view with numpad orbit steps
bucket: 03_Modeling_Modifiers
source: "Cyber Japan Art Breakdown  Blender.txt"
source_time: "14:17–16:17"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Covers messy seams where two surfaces meet (edge trims on a counter, a housing seam) — the clean-edge detail macro shots expose.
---

## METADATA
03_Modeling_Modifiers | 3.x source → 4.2+ code | Blender bpy

## CREATIVE_INTENT
Where tiles change direction the seam looks broken; real roofs hide it with a border strip down the hip. Make a small
bevelled tile, array it, and place it exactly on the 45° hip by orbiting the view in fixed steps until the strip is seen
edge-on.

## STE_PROCEDURE
1. Make a small tile piece; add a little geometry.
2. Add a Bevel modifier and an Array modifier; set Count ≈ 8–9.
3. Apply Scale (`Ctrl+A` → Scale); Shade Auto Smooth; reduce the bevel width so it is not extreme.
4. Place the strip roughly on the hip.
5. Go to front view (`Numpad 1`); press `Numpad 6`/`Numpad 4` to orbit in 15° steps until the view looks straight down the 45° hip (3 presses = 45°).
6. If unsure of the angle, use wireframe (`Z` → Wireframe) and orbit until edges snap visually into line.
7. Rotate/move the strip to sit exactly on the hip line in that view.
8. Apply all modifiers on the strip.
9. With the 3D cursor on the roof centre and Pivot = 3D Cursor, `Alt+D`, `R Z 90`, then `Shift+R` for the other hips.
10. Add more variation: extrude/bevel some copies, repeat.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy, math
s = bpy.context.object                                            # the tile piece
bev = s.modifiers.new("Bevel", 'BEVEL'); bev.width = 0.005; bev.segments = 2   # ~ "not so extreme"
arr = s.modifiers.new("Array", 'ARRAY'); arr.count = 9; arr.relative_offset_displace = (1.0, 0, 0)
bpy.ops.object.transform_apply(scale=True)
bpy.ops.object.shade_auto_smooth()                                # 4.1+; adds "Smooth by Angle" modifier
# place on the hip without viewport orbiting: rotate the strip directly to the hip direction
s.rotation_euler = (0, math.radians(-30), math.radians(45))       # ~ pitch = roof slope, yaw = 45° hip
for m in list(s.modifiers): bpy.ops.object.modifier_apply(modifier=m.name)
```
- Viewport method (interactive only): `bpy.ops.view3d.view_axis(type='FRONT')`, then `bpy.ops.view3d.view_orbit(angle=math.radians(15), type='ORBITRIGHT')` ×3.

### raea
- raea: no equivalent (modelled and baked in Blender).

## NOTES
- Deprecated: "Shade Auto Smooth" — pre-4.1 it was Shade Smooth + Mesh data `use_auto_smooth`; 4.1+ `bpy.ops.object.shade_auto_smooth()` adds a Smooth by Angle modifier. Apply or keep it before GLB export (exporter evaluates modifiers).
- Visual gaps: tile shape and slope angle are only on screen; rotation values `~`.
- STT fix: "YF frame" = wireframe; "six and six or four" = Numpad 6 / Numpad 4 (15° orbit steps by default).
