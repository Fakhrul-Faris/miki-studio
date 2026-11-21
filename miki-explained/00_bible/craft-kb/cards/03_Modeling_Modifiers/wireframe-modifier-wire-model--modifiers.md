---
title: Wireframe modifier — turn any mesh into a solid wire model (x-ray / blueprint state)
bucket: 03_Modeling_Modifiers
source: "The Power of MODIFIERS in Blender!.txt"
source_time: "02:40–02:46"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Serves Style D's state changes on the word ("x-ray", "how it's built"): the hero cross-fades from solid to its wire version over ~0.4 s, wire in the brand accent.
---

## METADATA
03_Modeling_Modifiers | 3.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
The Wireframe modifier replaces each edge with a thin solid strut, giving a real 3D wire model that lights, casts shadows and can glow. In an explainer it shows the structure or "inside logic" of an object as a state change.

## STE_PROCEDURE
1. Duplicate the hero mesh (keep the solid version for the cross-fade).
2. Add a Wireframe modifier to the duplicate.
3. Set Thickness for the strut size; enable Even Thickness.
4. Keep Replace Original on for wire only; turn it off to keep the faces too.
5. Give the wire copy its own material (accent or emissive).
6. Export solid and wire as separate named meshes.

## AGENT_EXECUTION
```python
import bpy
src = bpy.data.objects["Hero"]                       # ~ name
wire = src.copy(); wire.data = src.data.copy(); wire.name = "Hero_wire"
bpy.context.collection.objects.link(wire)
w = wire.modifiers.new("Wireframe", 'WIREFRAME')
w.thickness = 0.0008                                 # ~ macro scale
w.use_even_offset = True
w.use_replace = True
w.use_boundary = True
w.use_relative_offset = False
```
raea: no wireframe modifier at render time (the wire is baked into the GLB). The state change itself is raea: two named parts, the solid fading out and the wire fading in over ~0.4 s, eased:
```tsx
const t = interpolate(f, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
// solid: StandardMaterial base_color={Srgba.hex("#c9c4bb").with_alpha(1 - t)} alpha_mode="Blend"
// wire:  StandardMaterial base_color="#ff3d7f" emissive={LinearRgba.from(Srgba.hex("#ff3d7f")).mul(2 * t)} with alpha t
```
(Use separate GLBs or separate `Mesh3d`s so each has its own material; with `<Bloom>` the emissive wire glows.)

## NOTES
- Wire on a dense subdivided mesh becomes noise; apply it to the low-poly cage (before subdivision) for a clean read (`~`, not from the video).
- Thin struts shimmer under SMAA (post.md); keep thickness visible at the shot's distance.
- Deprecated: none.
- Visual gaps: the video only names the modifier; settings are `~`.
- Rule conflicts: no popping the wire on — fade/grow over ~0.4 s.
