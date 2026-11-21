---
title: Headline flies in from behind camera, per-character, in true Z-depth (not a fake 3D offset)
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Master SaaS Motion Graphics in 30 Minutes.txt"
source_time: "28:01–29:13"
tool_target: raea
tier: full
use_when: "a scene's title/wordmark needs a cinematic, depth-driven entrance distinct from the word-based 2D ramp reveal used elsewhere in the same episode"
style_fit: "Fits raea's real 3D text layer (true Z, not a 2D fake); keep it to the title/logo beat only — overusing true-3D depth entrances alongside the 2D word ramp dilutes both."
---

## METADATA
09_UI_Motion | After Effects ("enable per-character 3D" + per-character position/opacity animator) → raea Text3D per-glyph Z + opacity | raea

## CREATIVE_INTENT
Distinct from the standard word-based ramp-reveal used on body/label text (position+opacity, range selector, ramp
shape), the scene's big headline gets "enable per-character 3D" turned on so each character has its own Z position, not
just 2D offset. Z is pushed back (~1700 units) and opacity to 0 at the range selector's tail, with a ramp-up/ease-low
advanced shape and an offset key from −100% to 100% — the same math as the 2D version, but because the layer is truly
3D, letters appear to fly out of deep space toward camera rather than just rising/fading in place.

## STE_PROCEDURE
1. Reserve true per-character Z-depth entrances for one hero text element per scene (title/wordmark), not body copy.
2. Give the text layer real 3D (not 2D-with-a-shadow-fake).
3. Animate each character's Z from far (pushed back) to its resting depth, plus opacity 0 → 1, using a per-character range selector.
4. Use the same ramp-up/ease-low/offset recipe as the house word-based ramp reveal (see that card) so the timing feels consistent with the rest of the episode's text.
5. Keep the camera or other 3D elements' depth cues consistent with this text's depth so it doesn't look like a separate layer pasted on top.

## AGENT_EXECUTION
raea: per-glyph Z animation on a `Text3D` (or a 2D text split into per-character spans each given a `translateZ`/scale
proxy for depth):
```tsx
const glyphs = title.split("");
glyphs.map((g, i) => {
  const t0 = wordStart + i * 1;                     // per-character stagger, matches "advanced ramp" offset feel
  const z = interpolate(f, [t0, t0 + 14], [-1.7, 0], { ...CL, easing: out });     // deep → resting depth
  const op = interpolate(f, [t0, t0 + 14], [0, 1], CL);
  return <Text3D key={i} text={g} transform={Transform.fromXyz(baseX(i), 0, z)} opacity={op} />;
});
```

### Worked example
Topic: the episode's closing wordmark "Meikigo" settling into frame before the end card (brand logo, real).
- BEFORE: "Meikigo" fades up in 2D, same recipe as every other label in the episode.
- AFTER: each letter of "Meikigo" flies in from deep Z toward the camera on a staggered per-character ramp, landing in
  its resting position and in-focus just as the voice line ends — reserved for this one brand moment.

### Check
- Is this depth-entrance used on at most one hero text element per scene (not every label)?
- Does each character animate its own Z (true depth), not a 2D fake (scale/blur standing in for distance)?
- Does the stagger/offset recipe match the house word-based ramp reveal's timing feel?
- Does it land in sync with the scene's other depth cues (camera, 3D objects)?

## NOTES
- Visual gaps: exact per-character stagger value beyond "move that a bit towards the back" is visual only; the
  ramp-up/ease-low/offset values are shared with the 2D word-reveal card and carried over here.
- AE dropped: "enable per-character 3D" toggle — translated to a literal per-glyph 3D transform, which raea supports
  natively and more directly than AE's per-character 3D hack.
- Shares its ramp/offset math with `word-based-ramp-text-reveal--smooth-saas-creatorly.md`; see addendum there for the
  confirming values from this source.
