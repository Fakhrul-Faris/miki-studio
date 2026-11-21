---
title: Long side strip lights orbited round the product for reflection lines
bucket: 04_Shading_Lighting
source: "How to Make Perfect Product Animations in Blender.txt"
source_time: "12:07–13:44"
blender_version_source: 4.x (~4.4)
tool_target: Blender bpy
tier: full
style_fit: good for glossy macro objects — clean specular lines define form; keep them low-saturation so the accent stays singular
---

## METADATA
04_Shading_Lighting | Blender 4.4 (source), 4.2+/5.x code | Blender bpy + raea

## CREATIVE_INTENT
A rim alone leaves the product's face black. Two long, thin area lights, one each side, drop crisp reflection lines down a glossy body — the "product ad" highlight. Rotating them around the product (pivot = product centre) slides the reflection across the surface and can itself be animated.

## STE_PROCEDURE
1. Snap the 3D cursor to the product centre.
2. Add an Area light; move it above the product.
3. Set Transform Pivot Point to 3D Cursor.
4. Rotate the light 90° around X about the cursor so it sits to the side.
5. Scale it long on local Z (the product's length) and a little wider on X.
6. Set Power to 200 W, then raise to ~700 W until a reflection line shows.
7. Set Color to light blue (accent, desaturated).
8. Rotate the light around global Z about the cursor to slide the line around the product.
9. Duplicate it (Shift D), rotate the copy to the opposite side for a second line.

## AGENT_EXECUTION
```python
import bpy, math
from mathutils import Matrix, Vector
prod = bpy.data.objects["Product"]; c = prod.matrix_world.translation.copy()
def orbit(ob, axis, deg, pivot):
    R = Matrix.Rotation(math.radians(deg), 4, axis)
    ob.matrix_world = Matrix.Translation(pivot) @ R @ Matrix.Translation(-pivot) @ ob.matrix_world
bpy.ops.object.light_add(type='AREA', location=c + Vector((0, 0, 1.0)))   # ~ height
s = bpy.context.object
s.data.shape = 'RECTANGLE'; s.data.size, s.data.size_y = 0.3, 2.0         # ~ long strip
s.data.energy = 700; s.data.color = (0.7, 0.85, 1.0)
orbit(s, 'X', 90, c)                    # to the side
orbit(s, 'Z', 35, c)                    # ~ slide the reflection
s2 = s.copy(); s2.data = s.data.copy(); bpy.context.collection.objects.link(s2)
orbit(s2, 'Z', 180 - 70, c)             # ~ opposite side
```
To animate the slide: key `rotation_euler`/`location` on an Empty at `c` that parents the strips, and rotate the Empty in Z.

raea:
```tsx
const a = interpolate(f, [0, 69], [0.6, 0.9], { easing: Easing.inOut(Easing.sine), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
{[a, a + Math.PI * 0.8].map((ang, i) => (
  <RectLight key={i} transform={Transform.fromXyz(Math.sin(ang) * 1.2, 0.6, Math.cos(ang) * 1.2).lookingAt([0, 0.6, 0])}
    intensity={300000} width={0.25} height={2.0} color="#b3d4ff" />
))}
```
Reflections of a RectLight show as specular highlights on low-`perceptual_roughness` materials (0.05–0.2); glossy clear parts use `clearcoat`.

## NOTES
- Deprecated: none.
- Visual gaps: exact rotation angles and strip widths are on screen only (`~`).
- Rule conflicts: none; an animated slide must ease in-out.
- Adding these lights brightens a near backdrop — see backdrop-distance-controls-light-spill.

## ADDENDUM — Three Point Lighting Tutorial | Blender Product Rendering Series
Adds the complementary key setup for a long/tall hero (bottle, machine, card, phone, receipt roll) whose shape must
read at phone size in under 1 s: place a plane (Area) light at least as long as the hero's long axis (~1–1.2×),
really close to the product (~0.3–0.5× the long axis away), aligned so its long side runs along the hero's long
axis — close + long gives one continuous highlight tracing the whole silhouette, where a small or far key gives
only a dot that says nothing about shape. Check the silhouette/form read with every other light off. ⚠ Source
places this key to the side; in Style D the plane sits close above/top-front instead, sized to the hero's long
axis. raea: `<RectLight>` strip (width ≈ hero length × 1.1) paired with the house top SpotLight for shadow (RectLight
casts none); hero material `perceptual_roughness` 0.15–0.35 so the strip reads as a highlight, not a flat fill —
this is additive to this card's side strip-lights (which define form via reflection *lines*); use the long-close
plane when the goal is one highlight that reads the hero's full length at a glance, and the side strips when the
line needs reflection lines sliding across the surface.
