---
title: Recolour cloned materials independently with a duplicated Hue/Saturation/Value node
bucket: 06_Art_Direction
source: "3D Documentary Explainer Breakdowns/How to Make 3D Characters Like Fern and Imperial.txt"
source_time: "09:54–13:00"
tool_target: raea
tier: principle
use_when: "several props/garments share one base material (same clothing asset reused) but each needs its own accent or neutral colour"
style_fit: "Fits Style D's one-accent rule: lets one shared material drive many objects while only the hero gets the saturated accent and the rest stay neutral, without duplicating the whole shader."
---

## METADATA
06_Art_Direction | Blender Shader Editor (Hue/Saturation/Value node) | raea material instancing

## CREATIVE_INTENT
Several assets (e.g. a clothing pack) share one imported material, so a direct colour edit changes every instance
at once. Making a copy of the material per object, then inserting a Hue/Saturation/Value node (Hue factor → 0,
pick the new colour, tune Value) before the base colour input, recolours that one copy without touching the
shared original or the other instances.

## STE_PROCEDURE
1. Before changing a shared material's colour, duplicate it (Blender: select the material slot, click the copy icon).
2. Add a Hue/Saturation/Value node between the texture/colour input and the BSDF.
3. Set the Hue node's Fac(tor) to 0 so hue is driven by the node's own Color swatch, not shifted from the source.
4. Pick the target colour in the node's Color field.
5. Raise/lower Value until the result matches the reference (brighter for a saturated accent, lower for a muted neutral).
6. Repeat per object that needs its own colour, each on its own material copy.

## AGENT_EXECUTION
In raea there is no shared node material to branch from — give each instance its own `StandardMaterial` prop and
set `base_color` directly; the "duplicate + HSV" step is Blender-side prep for a shared GLB asset reused with
colour variants (export one GLB per colour variant, or tint per-instance if the kit component supports it).
```tsx
<Model src={staticFile("garment.glb")} transform={Transform.fromXyz(-0.3, 0, 0)} />                         {/* neutral copy */}
<Model src={staticFile("garment_accent.glb")} transform={Transform.fromXyz(0.3, 0, 0)} />                   {/* accent copy, tinted in Blender before export */}
```
### Worked example
Topic: a row of identical plastic chairs outside a kedai kopi, one marked "reserved" (illustrative).
BEFORE: all chairs share one grey material; recolouring it turns every chair the same new colour.
AFTER: the reserved chair's material is duplicated and pushed through a Hue/Saturation/Value node to the brand
accent; the rest stay the shared neutral grey — one accent, on the one chair the line is about.
### Check
- Does only the hero/accent instance get its own material copy and HSV node?
- Do the untouched instances still share the original material?
- Is the accent colour the one brand accent, not an arbitrary hue?

## NOTES
- Visual gaps: exact Hue/Value numbers were picked by eye on screen; no values stated in speech.
- Translation: raea has no shader-node graph, so this becomes a Blender authoring step (per-variant GLB export), not a runtime raea node.
