---
title: Emissive spline accent, grown across the scene via Start/End Mapping
bucket: 06_Art_Direction
source: "3D Documentary Explainer Breakdowns/How To Animate Like Imperial (Blender & After Effects Tutorial).txt"
source_time: "13:35–16:53"
tool_target: raea
tier: full
use_when: "a setup needs one small glowing detail that threads through the frame and animates in on its own, without adding a new object"
style_fit: "Fits the one-brand-accent rule directly — the curve is emissive in the accent colour only; adapt the growth timing to land on the word, not as ambient decoration."
---

## METADATA
06_Art_Direction | Imperial/Lemmino/Fun Neo-style 3D breakdown | raea bezier curve + emission material + growth animation

## CREATIVE_INTENT
The style's signature detail is a thin glowing line (spline) that snakes through the scene — "he'll often times have
this curve spline type of thing going through his scenes" — made from a Bezier curve with a beveled, filled cross-section
and an emission material, then animated so it visibly grows across the shot by keying how much of the curve's length is
drawn (Start/End Mapping on the Bevel modifier).

## STE_PROCEDURE
1. Draw the curve's path in the scene from the camera's angle so it reads against the background (not floating or crossing the hero oddly).
2. Give the curve thickness via a Bevel (Geometry panel) and enable Fill Caps so it reads as a solid cord, not a tube.
3. Add a Subdivision Surface modifier (2 levels) so the beveled cord shades smoothly, not jagged.
4. Assign a material with Emission colour = the brand accent, Emission Strength high enough to bloom and reflect faintly off nearby glossy surfaces.
5. To animate the growth: enable the Bevel's Start/End Mapping; at frame 0 set End = 0 (nothing drawn); ease it to End = 1 over ~100 frames (≈ 4 s at 24 fps) so the line sneaks across the shot.
6. Check: does the growing line land its full length on, or just before, the line it is illustrating?

## AGENT_EXECUTION
Shot-list row: add an "accent line" event under State change and events, e.g. "spline traces the fee path, lands on
'5 sen'". Frame-brief Moves: name the curve's start and end points relative to the hero. raea has no spline-bevel-fill
primitive at this fidelity — bake the curve to a tube mesh in Blender (Bevel + Fill Caps + Subdivision Surface) and
export as GLB; in raea, reveal it by animating its own geometry's visible fraction, or (cheaper, matches the look)
scale/opacity-stagger a chain of small accent-coloured spheres or a thin strip along the path.

```tsx
const grow = interpolate(f, [inF, inF + 100], [0, 1], {
  easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp",
});
<Model name="accentLine" src={staticFile("fee_path.glb")} morphWeight={grow} />  {/* if exported with a "draw" shape key */}
<Mesh3d name="accentLineFallback" transform={Transform.fromXyz(...)} scale={[grow, 1, 1]}>
  <Cuboid half_size={[0.4, 0.01, 0.01]} />
  <StandardMaterial base_color="#000000" emissive={ACCENT} emissive_exposure_weight={1} />
</Mesh3d>
```

### Worked example
Topic: a kedai runcit's 5 sen plastic-bag charge (numbers illustrative).
BEFORE: the fee just appears as on-screen text next to the register.
AFTER: a thin accent-coloured line grows out of the register slot, across the counter, and lands under the words
"5 sen" exactly as the voice says them — the line IS the fee being tracked, not a decoration next to it.

### Check
- Is the line in the one brand accent colour only, never a second hue?
- Does its growth timing land on the word it illustrates, not drift loose?
- Is it built from the scene's own geometry (a real path), never a generic UI underline?

## NOTES
- Visual gaps: curve shape and exact bevel/subdivision values are drawn on screen, not spoken (`~`).
- Rule conflicts: none; this is a clean fit for "a new camera setup every 2–3 s" with "an on-screen event about every second, on the word" — the growing line is itself that event.
