---
title: Art-directed bokeh highlight pops from a luma key, masked by hand
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "3:18:32–3:22:26; 3:36:04–3:41:38"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: Fits Style D's dark room + bloom: a few bright out-of-focus specks behind the hero make the background cinematic; keep them uneven and few, never a uniform sparkle.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: bright pops in a defocused background feel cinematic, but they must be broken up and organic, not uniform. Idea: key the brightest points of the background, limit them with hand-drawn masks (additive and subtractive), and gain them up before the defocus so they become discs.

## STE_PROCEDURE
1. Pull a luma key on the background for only its brightest points.
2. Draw a roto around the areas that should pop (e.g. the mountain ridge).
3. Before you use the roto, set its clip to "no clip" so it doesn't stretch outside the format.
4. Set the merge to mask with bbox intersection.
5. Feed the mask into a colour correct; raise gain, then gamma, by eye.
6. Remove too-busy areas with a second roto shape coloured 0 (draw subtractive shapes in a dark colour to tell them apart).
7. Add small extra masks where a pop is missing; lower opacity if one is too strong.
8. Pull every luma key from the original plate, not downstream, so later grades don't change the mask.
9. Before you key-frame any roto, turn off auto-key in preferences; masks then stay put on every frame.

## AGENT_EXECUTION
### Source tool (Nuke)
`Keyer(luminance)` → `Merge(mask, bbox intersect)` ← `Roto(clip to: no clip)`; subtractive shape colour 0; → `ColorCorrect(gain, gamma)` → defocus. Preferences → Nodes → Roto: auto key off.
### Blender / raea translation
- raea: place a few small emissive meshes (`<Mesh3d name="spec1">` + `<StandardMaterial emissive={LinearRgba.from(Srgba.hex("#ffd9a8")).mul(4–10)} />`) behind the focal plane so `<DepthOfField mode="bokeh">` turns them into discs and `<Bloom intensity={1} threshold={0.9} />` glows them. Seed their positions (never `Math.random()` per frame); vary size and brightness; cluster unevenly.
- Fade them in over ~0.4 s if they appear on a word.

## NOTES
- Rule conflicts: "one saturated accent" — keep specks warm-neutral unless the brand accent belongs there.
