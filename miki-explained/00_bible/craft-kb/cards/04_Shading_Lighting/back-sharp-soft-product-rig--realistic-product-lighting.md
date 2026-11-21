---
title: Three-light product rig — strong back highlight, sharp side light, soft opposite fill (area-light Spread as the hard/soft control)
bucket: 04_Shading_Lighting
source: "Realistic Product Lighting In Blender.txt"
source_time: "01:46–04:01"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Core macro-hero rig; for Style D keep the back light as the "top-back" key and the soft fill weak.
---

## METADATA
04_Shading_Lighting | 4.x | Blender bpy → raea Spot/Rect lights

## CREATIVE_INTENT
Light the product from three sides: a strong back light for bright edge highlights, a sharp low-spread light on one side for defining shadows, and a soft high-spread light on the other side to light the product itself. Set camera and product angle first (a slight rotation gives a "dynamic touch").

## STE_PROCEDURE
1. Before lighting, lock the camera and rotate the product slightly for dynamism.
2. Open a small rendered-view window to judge as you go.
3. Add an Area light behind the product; raise Power moderately (not too much).
4. Set the 3D cursor to the product centre and Pivot = 3D Cursor (see orbit card).
5. Duplicate the back light, rotate it around the product (R R) to the side opposite to where the product faces.
6. Lower its Power and lower Spread (sharper, hard shadows).
7. Duplicate it and rotate 180° around the product to the other side.
8. Raise this copy’s Spread (soft light).

## AGENT_EXECUTION
```python
import bpy, math
def area(name, loc, energy, spread_deg):
    bpy.ops.object.light_add(type="AREA", location=loc); o = bpy.context.object; o.name = name
    o.data.energy = energy; o.data.size = 1.0; o.data.spread = math.radians(spread_deg)
    c = o.constraints.new("TRACK_TO"); c.target = bpy.data.objects["Product"]; c.track_axis = "TRACK_NEGATIVE_Z"
area("Back", (0, 2.0, 1.2), 300, 180)     # ~ strong highlight
area("Sharp", (2.0, 0, 0.8), 150, 30)     # ~ low spread = hard shadows
area("Soft", (-2.0, 0, 0.8), 120, 180)    # ~ high spread = soft
```
raea (Spread ≈ cone width + shadow softness):
```tsx
<SpotLight transform={Transform.fromXyz(0, 1.2, -2).lookingAt(p)} intensity={3000000} outer_angle={0.9} inner_angle={0.4} radius={0.4} soft_shadows_enabled shadow_maps_enabled />  {/* back */}
<SpotLight transform={Transform.fromXyz(2, 0.8, 0).lookingAt(p)} intensity={1200000} outer_angle={0.3} inner_angle={0.25} radius={0.05} shadow_maps_enabled />  {/* sharp */}
<RectLight transform={Transform.fromXyz(-2, 0.8, 0).lookingAt(p)} intensity={400000} width={1.5} height={1.5} />  {/* soft */}
```

## NOTES
- Deprecated: none (Area light Spread exists since 2.9x).
- Visual gaps: power values shown on screen only.
- Rule conflicts: none.

