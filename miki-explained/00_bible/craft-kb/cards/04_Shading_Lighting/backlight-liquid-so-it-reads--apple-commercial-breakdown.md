---
title: Backlight water and liquid, or it disappears
bucket: 04_Shading_Lighting
source: "Studio Lighting, Silhouettes & Color Theory/Apple commercial Cinematography breakdown.txt"
source_time: "05:00–05:32, 06:06–06:30"
tool_target: raea
tier: full
use_when: "any setup whose hero or event is a liquid, drink, steam, bubbles or a wet surface (teh tarik pour, rain on a shop shutter, oil in a wok)"
style_fit: "Fits Style D: one soft top key stays; the liquid gets a separate rim/back source from behind, range-limited so the dark room stays dark."
---

## METADATA
04_Shading_Lighting | general (live-action) | raea light setup + frame brief "Moves"

## CREATIVE_INTENT
"Whenever you shoot anything with water you always want to make sure that you're backlighting the water, otherwise you
can't see it." In the Apple spot a big source sits behind the branches, behind the water, so droplets and splashes
light up; in the bubbles shot the small reflections show where the lights are, and a diffusion source only adds fill.

## STE_PROCEDURE
1. Before you light a liquid, find which side the camera sees it from.
2. Place the liquid's light behind it, facing the camera, just outside frame.
3. Raise or offset the back light so the source itself never shows in frame.
4. Keep the front key for the object; do not light the liquid from the front.
5. Add a soft, dim fill only so the shadow side is not black.
6. Check that drops, rims and steam edges glow against a dark background.

## AGENT_EXECUTION
raea: a back `SpotLight` or `PointLight` behind the liquid, aimed at the camera through the liquid, with `range` so it
does not light the back wall; keep the top key as is. Use `liquids.md` in the raea-bevy skill for the liquid itself;
`<Bloom>` lets the backlit drops glow.
```tsx
<SpotLight name="liquidBack" transform={Transform.fromXyz(0, 0.35, -0.6).lookingAt([0, 0.2, 0.4])}
  intensity={600_000} outer_angle={0.35} inner_angle={0.15} range={1.4} color="#fff3e6" />
```
Values are a start point (`~`); tune on a still. Ref analysis: list "backlit liquid" under light, and the background
must stay dark behind the liquid.

### Worked example
Topic: "Teh tarik RM2.50: berapa untung sebenar segelas" (illustrative numbers; cost = susu + teh + gula + cawan).
- BEFORE frame brief: Light "top key on the glass"; the pour reads as a grey smear.
- AFTER frame brief: Ref macro pour at the stall; Decision "the pour is the line's subject"; Eye "the falling stream";
  Light "top key on the glass rim + back spot behind the stream at 0.6 m, range 1.4 m; wall stays black";
  Moves "on 'tarik' the stream lengthens over 0.6 s, eased; RM0.90 cost (illustrative) appears in accent beside the glass".

### Check
- Is the liquid lit from behind, not only from the front?
- Is the back source out of frame and out of reflections?
- Does the background behind the liquid stay dark?
- Do drops/steam edges read at phone size?

## NOTES
- Visual gaps: exact light positions are the narrator's inference from shadows; not shown.
- Fog for light rays ("you can only do those if you have fog") is covered by `masters/04_Shading_Lighting/volume-haze-cube.md`.
