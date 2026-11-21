---
title: Animate the light source to steer attention — light tracks the moving element, snaps sides, dims on the switch
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/Animate Light to Control Your Viewer | After Effects (No Plugins).txt"
source_time: "00:04–00:42 (principle), 01:05–05:44 (two-source light rig), 07:28–10:43 (animation, dim at switch), 12:58–14:19 (colour)"
tool_target: frame-brief
tier: principle
use_when: "a setup where the eye must move from one part of the hero to another on the word; briefing the 'Eye' and 'Moves' fields"
style_fit: Fits Style D — the one soft top light becomes the pointer; ⚠ the source's multi-colour gradient light → adapted: neutral light, the accent stays on the subject; light moves eased, never a flash.
---

## METADATA
06_Art_Direction | After Effects (source) → raea SpotLight/RectLight transform keyed on words | frame-brief, raea

## CREATIVE_INTENT
"Most of the premium effect is actually coming from the light source" — studios animate light to "guide exactly where the
viewer needs to look". The author builds a light that follows a null; it starts close to the moving line, opens up as it
nears, then comes from the other side. Keys are matched to the animated element's keys and "squeezed" in the graph
editor so the light jumps quickly between positions and settles slowly. As it switches sides it dims to zero (amount and
opacity 100 → 0 → 100, the middle squeezed so the dark moment is fast). Depth comes from two offset sources (second
radial blur centre moved in Y; a third possible).

## STE_PROCEDURE
1. Decide where the eye must be on each named word.
2. Key the light position to each target, using the hero's own key frames as the timing.
3. Squeeze the keys: fast travel between targets, long gentle settle at each.
4. When the light swaps sides, dip its intensity to ~0 for a few frames in the middle, then back.
5. Use two slightly offset sources for depth rather than one flat beam.
6. Keep the light neutral; let the subject carry the accent colour.

## AGENT_EXECUTION
Frame brief: Eye → "light pool on the price digit, then on the total"; Moves → "key slides from tag edge to total on 'jumlah', dips 0.15 s while crossing".
raea: SpotLight transform + intensity from the frame; two lights offset ~0.1 m for the split source:
```tsx
const t = k(f, word("jumlah"), 18, out);                          // fast travel, long settle
const dip = 1 - 0.9 * Math.sin(Math.PI * k(f, word("jumlah"), 8, inOut)); // dims mid-switch
<SpotLight transform={Transform.fromXyz(lerp(-0.3, 0.25, t), 1.2, 0.4).lookingAt([lerp(-0.1, 0.08, t), 0, 0])}
  intensity={1800000 * dip} outer_angle={0.35} inner_angle={0.2} shadow_maps_enabled />
```

### Worked example
Topic: a resit at a kedai runcit — 3 items RM4.50 + RM6.00 + RM2.30 = RM12.80 (plain arithmetic, illustrative).
- BEFORE: whole receipt evenly lit; the eye wanders.
- AFTER: the top light rests on "RM4.50", travels down the column as each price is said, dims briefly as it crosses
  the fold, and settles on "RM12.80" lit in the accent.

### Check
- On each named word, is the brightest spot on what the line names?
- Does the light travel fast and settle slowly (no linear crawl)?
- Is there no colour gradient on the light (accent on the subject only)?

## NOTES
- Visual gaps: null paths and squeezed curve shapes are visual only.
- AE dropped: CC Radial Fast Blur (amount 95 %, second copy "brightest" zoom, Y offset for second source), Glow stack →
  see addendum `addenda/glow-bloom--animate-light-control-viewer.md`; translated to real moving lights + `<Bloom>`.
- ⚠ Gradient light (blue → purple → yellow) dropped (one-accent rule).
