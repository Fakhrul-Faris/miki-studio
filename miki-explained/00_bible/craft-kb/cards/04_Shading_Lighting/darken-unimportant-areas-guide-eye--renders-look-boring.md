---
title: Guide the eye's spotlight with value: darken the non-important parts of the frame
bucket: 04_Shading_Lighting
source: "Why your Blender renders look BORING.txt"
source_time: "07:31–10:56"
blender_version_source: n/a (art direction)
tool_target: principle-only | raea
tier: full
style_fit: The exact theory behind Style D's dark room + one soft top light on the hero.
---

## METADATA
04_Shading_Lighting | n/a | principle-only + raea

## CREATIVE_INTENT
The eye is not a camera: it has a small high-resolution spotlight and low-resolution periphery, so it has to travel around an image to read it. If everything looks equally important, the viewer must work to take it in, and the image feels unpleasant. Composition removes that effort; the simplest tool is light and dark. Make non-important areas darker so the spotlight lands where you want; framing and leading lines reinforce it.

## STE_PROCEDURE
1. Rank what is in frame: focal point, supporting, irrelevant.
2. Light the focal point brightest; let supporting elements fall to mid values.
3. Push irrelevant areas (corners, background, edges) darker.
4. Check with a squint / heavy blur of the still: the brightest blob must be the focal point.
5. If two areas compete, darken the lesser one rather than brightening the focal one.

## AGENT_EXECUTION
- Blender preview: a falloff key (Spot, `spot_size` ~45°, `spot_blend` ~0.6) on the hero; world strength ~0.05 so the room stays dark.
- raea (lights.md, post.md):
```tsx
<SpotLight transform={Transform.fromXyz(0, 2.0, 0.3).lookingAt([0, 0, 0])} intensity={1200000}
  outer_angle={0.35} inner_angle={0.12} shadow_maps_enabled soft_shadows_enabled radius={0.3} />
<AmbientLight brightness={15} />
<Grade vignette={{ intensity: 0.35, radius: 0.75, smoothness: 0.5 }} />
```
- Squint check of a rendered still:
```bash
ffmpeg -i out/s03.png -vf "gblur=sigma=40,format=gray" -y review/s03_squint.png
```

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none. Keep detail near black (no crushed shadows) and check on a phone screen at low brightness.
