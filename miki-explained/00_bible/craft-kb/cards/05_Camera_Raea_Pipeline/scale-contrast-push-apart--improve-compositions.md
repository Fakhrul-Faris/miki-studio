---
title: Contrast of scale and importance — push the two extremes apart
bucket: 05_Camera_Raea_Pipeline
source: "3 Ways to Improve Your Compositions in Renders.txt"
source_time: "08:60–10:39"
blender_version_source: n/a (Blender, version not stated)
tool_target: Blender bpy | raea | principle-only
tier: full
style_fit: Fits Style D — macro hero next to a tiny recognisable cue (a grain of rice, a coin edge) makes it feel monumental; a "small number" next to something huge reads small.
---

## METADATA
05_Camera_Raea_Pipeline | n/a | principle + Blender bpy + raea

## CREATIVE_INTENT
Importance and size are relative. To make something feel big, put it next to something tiny (birds, tiny windows, a small wagon at the base of giant buildings); next to something bigger it will feel small. The further apart you push the important and the unimportant, the stronger the effect — "contrast of ideas or themes".

## STE_PROCEDURE
1. Decide what must feel big (or important).
2. Place a small, recognisable object near it whose real size the viewer knows.
3. Increase the size difference until the big thing reads as intended.
4. Keep nothing larger than the hero in the same frame.
5. For "small", reverse it: place the subject beside something much larger.

## AGENT_EXECUTION
- Blender: import a known-size reference prop at real scale (`bpy.ops.import_scene.gltf(filepath=...)`), place it at the hero's base; keep units metric (`scene.unit_settings.scale_length = 1.0`).
- raea: `<Model src={staticFile("coin.glb")} position={[x, 0, z]} scale={1} />` beside the hero at true scale; frame with a long lens so both read; for "it shrank", animate the hero's `withScale` down while the reference stays (eased).

## NOTES
- Related: scale-cue-recognisable-objects--serene-render (same idea, environment focus).
- Rule conflicts: no people as scale cues in street scenes by default — use objects.
