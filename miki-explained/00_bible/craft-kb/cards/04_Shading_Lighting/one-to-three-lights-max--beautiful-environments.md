---
title: Keep the light count to one or two (three at most)
bucket: 04_Shading_Lighting
source: "How To Create Beautiful Environments In Blender.txt"
source_time: "03:53–04:40"
blender_version_source: n/a (general advice)
tool_target: principle-only
tier: principle
style_fit: Direct support for Style D's "one soft top light": fewer lights give a cleaner frame and fewer conflicts.
---

## METADATA
04_Shading_Lighting | n/a → 4.2+ | principle-only (Blender lights / raea lights)

## CREATIVE_INTENT
Principle: almost every strong environment render uses one or two lights, rarely three. Few lights are easier to balance and simply look cleaner than many lights fighting each other.
Ideas: when a shot looks muddy, delete lights before adding any; let one key define the shape and let the dark do the rest.

## STE_PROCEDURE
1. Start every shot with one key light only.
2. Judge the frame; add a second light only if a needed shape or the focal point is unreadable.
3. Before adding a third light, try moving or resizing the existing two.
4. If a scene grows past three lights, delete the weakest contributors until the frame breaks, then restore one.

## AGENT_EXECUTION
### Blender (build / preview only)
```python
import bpy
lights = [o for o in bpy.context.scene.objects if o.type == 'LIGHT']
print(len(lights), [(o.name, o.data.type, round(o.data.energy, 1)) for o in lights])
assert len(lights) <= 3, "light budget: 1–2, max 3"
```
### raea translation
One key and a low fill, nothing else (lights.md):
```tsx
<SpotLight transform={Transform.fromXyz(0, 2.2, 0.4).lookingAt([0, 0, 0])} intensity={900000}
  outer_angle={0.45} inner_angle={0.22} shadow_maps_enabled soft_shadows_enabled radius={0.3} />
<AmbientLight brightness={40} />   {/* fill so the shadow side isn't black */}
```
Emissive props (screens, LEDs) with `<Bloom>` are not counted as lights. Keep shadowed PointLights to one or two (each renders six shadow maps).

## NOTES
- Deprecated: none.
- Visual gaps: none (verbal advice).
- Rule conflicts: none; it reinforces the one-soft-top-light rule. Count a brand-accent rim as one of the three.
