---
title: Desaturate every local material, then crush blacks with a Color Ramp, for one unified graphic look
bucket: 06_Art_Direction
source: "3D Documentary Explainer Breakdowns/How to Make 3D Edits like Fern (RED STYLE).txt"
source_time: "15:17–16:03"
tool_target: raea
tier: full
use_when: "a scene's library assets each arrive with their own realistic colour/texture, and the target look is a flat, graphic, near-monochrome style where only the accent reads as colour"
style_fit: "Strong fit for Style D's dark room + one accent: this is a stronger, scene-wide version of colour-match-library-assets.md — instead of nudging an asset toward the scene's existing palette, every material is stripped toward near-grey so only the accent carries colour."
---

## METADATA
06_Art_Direction | Fern/RED-style 3D breakdown | Blender Hue/Saturation + Color Ramp → raea material desaturation

## CREATIVE_INTENT
Where colour-matching (set 1) blends a new asset INTO an existing palette, this technique strips colour OUT of every
asset to build a deliberately graphic, near-monochrome world: add a Hue/Saturation node before each material's base
colour and push saturation down hard, then add a Color Ramp afterward and raise its black point so dark areas crush to
solid black rather than reading as muddy grey — the combination gives a flat, poster-like, high-contrast material look
across every prop in the scene.

## STE_PROCEDURE
1. For each material in the scene (not just the hero), insert a Hue/Saturation/Value node before the Base Color input.
2. Lower Saturation until the asset's original colour is barely present (judged by eye against the reference look, not a fixed number).
3. Add a Color Ramp node after the Hue/Saturation node, feeding into Base Color.
4. Raise the Color Ramp's black stop so darker texture values crush toward pure black rather than staying mid-grey.
5. Repeat for every asset in the scene so the treatment is consistent, not applied to only one object.
6. Keep the brand accent OUTSIDE this treatment (it stays saturated) — never desaturate the one thing meant to pop.
7. Check: does the scene now read as near-monochrome except for the accent, with no single prop left in its original colour?

## AGENT_EXECUTION
Apply as a scene-wide material rule in the frame brief's palette note, not a per-object exception. In raea, desaturate
and crush blacks on the baked textures before export (Blender bake), or approximate the look in the first-frame
`<Grade>` pass (saturation + a contrast/black-point curve) since raea materials don't carry live colour-correction nodes.

```tsx
<Grade saturation={0.15} blackPoint={0.08} />  {/* scene-wide, first-frame-only per post.md; keeps the accent readable since Grade is tonal, not per-material */}
```
If the crush must differ per asset (some materials need more black-point push than others), bake each asset's
treatment into its texture in Blender before GLB export, following colour-match-library-assets.md's bake step.

### Worked example
Topic: a repair shop's tool wall, told in a flat graphic style (illustrative).
BEFORE: each tool's library texture keeps its real-world colour (red handle, yellow caution tape, brown wood bench).
AFTER: every material is desaturated toward near-grey with crushed blacks; only the one tool the line is about keeps
its accent-coloured highlight, so it is the only colour in the frame.

### Check
- Is every scene material treated, not just the hero object?
- Does the brand accent stay outside the desaturation/crush treatment?
- Does the result still read the hero's shape and detail clearly, or has the crush gone so far it loses the silhouette?

## NOTES
- Visual gaps: exact saturation and black-point values are judged on screen, not spoken (`~`).
- Rule conflicts: none; this is a stronger, scene-wide sibling of colour-match-library-assets.md (set 1) — use that card when blending one new asset in, this one when building a whole scene toward a graphic monochrome look.
