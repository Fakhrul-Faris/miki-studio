---
title: Big soft point light as a "reflector patch" (bright background bounce)
bucket: 04_Shading_Lighting
source: "Get Better Lighting in Blender With This Easy Trick.txt"
source_time: "07:17–08:40"
blender_version_source: 3.x/4.x (Cycles)
tool_target: raea
tier: full
style_fit: Works as Style D's background lift: a large soft source behind/around the hero mimics the brightly lit area bouncing light back, like a photographer's white card.
---

## METADATA
04_Shading_Lighting | Blender 3.x/4.x (Cycles) | Blender bpy + raea

## CREATIVE_INTENT
Use when a whole region (the room behind the subject) should be glowing from heavy bounce but reads too dark. A strong, very large
soft light in the middle of that region acts like a big patch of reflected light — the same effect as holding white paper opposite
the sun in a portrait.

## STE_PROCEDURE
1. Identify the brightly lit region whose bounce is missing (the space behind the ring).
2. Add one Point light in the middle of that region.
3. Set Radius to at least 1 m so it is big and soft like a reflecting surface.
4. Raise Power until its effect is visible (author: 12,500 W — "much higher than usual", justified by the bright area).
5. Colour-match to the scene's warmth.
6. Check it still reads as plausible bounce, not a new source.

## AGENT_EXECUTION
### Blender (Cycles, look-dev)
```python
bpy.ops.object.light_add(type='POINT', location=(0, 2.0, 1.2))   # ~ centre of the bright back area
p = bpy.context.object
p.data.energy = 12500          # author's value in a large scene
p.data.shadow_soft_size = 1.0  # radius ≥ 1 m (author used less and recommends ≥ 1)
p.data.color = (1.0, 0.86, 0.7)  # ~ warm
```
### raea
```tsx
<PointLight transform={Transform.fromXyz(0, 2.0, -1.2)} intensity={1800000} range={8} radius={1}
            color="#ffdcb4" />
```
- `radius` is the bulb radius in metres (default 0.25); 1 = big and soft (used for soft shadows when `soft_shadows_enabled`).
- `intensity` in lumens: ~900,000 lights a surface 3 m away like daylight (lights.md) — tune on a still (~).
- Keep it outside every mesh (light never leaves a mesh) and non-`volumetric` unless the haze should glow.
- Alternative for a whole-frame lift: `<Environment>` or `<AmbientLight brightness>`; this card is for one region.

## NOTES
- Deprecated: none.
- Visual gaps: exact placement and the original radius are visual only.
- Rule conflicts: none.
