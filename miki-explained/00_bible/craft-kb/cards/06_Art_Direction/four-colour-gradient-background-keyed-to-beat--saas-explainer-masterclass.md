---
title: Four-colour gradient background whose anchor points and hues key to the script beat
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/How To Master Saas Explainer – Full After Effects Tutorial.txt"
source_time: "01:38–02:21 (base tint), 11:06–12:36 (keyed anchor points + colour 2/3 keys on the line change)"
tool_target: raea
tier: principle
use_when: "setting up a flat UI-scene background that should shift mood with the line, not sit static behind text"
style_fit: "⚠ source darkens toward a flat near-black vignette purely for contrast → adapted: keep background legible, shift hue/anchor only, never darken past a point that would hide the UI accent."
---

## METADATA
06_Art_Direction | After Effects 4-Color Gradient effect (source) → raea gradient keyed on time | raea / HyperFrames

## CREATIVE_INTENT
A white solid gets a "4 Color Gradient" effect; one of its four anchor-point colours is set first (a brand pink), the rest
pushed to white, then darkened slightly so the field isn't flat white. When the line changes (new text enters), two of the
four anchor points get colour keyframes (color 2 → pink, color 3 moved) and the anchor points themselves are keyed closer
to the frame edges — the gradient visibly shifts and intensifies exactly as the new sentence lands.

## STE_PROCEDURE
1. Start the background from a single flat colour (white or near-white), not a scene photo.
2. Add a 4-point gradient effect; set one anchor to the brand accent, the rest to white/near-white.
3. Darken the overall field slightly so it isn't a flat white card.
4. On the frame a new line lands, key two anchor points' colour and position together so the gradient visibly moves.
5. Keep the shift subtle — a mood change, not a new background.

## AGENT_EXECUTION
raea: an SVG `<radialGradient>`/`<linearGradient>` (or CSS `background: radial-gradient(...)`) with 2–4 colour stops whose
stop-color and position are driven by `interpolate(f, [a, a+20], [...], { easing: out })`, cued at each line's `word()`.
Shot row: `| 2 | "RM30 sehari" | phone UI bg | background gradient drifts warmer + pink stop nudges inward on "RM30" | this card |`.
```tsx
const t = k(f, lineStart, 20, inOut);
const stop1 = lerp(0, 8, t);                 // % position shift
<radialGradient id="bg"><stop offset={`${stop1}%`} stopColor={C.accent} /><stop offset="100%" stopColor="#f4f2f0" /></radialGradient>
```

### Worked example
Topic: a kedai runcit tracking daily RM30 float (illustrative amount).
- BEFORE: a flat grey app background sits still behind every line.
- AFTER: on "RM30 sehari", the background's pink gradient stop drifts inward and warms slightly, settling before the
  next line; the colour never darkens enough to dim the on-screen RM30.

### Check
- Does the gradient shift land on a specific word, not drift continuously?
- Does the background stay light enough that text/UI/accent stay legible?
- Is only one hue family used (brand accent + neutral), not a rainbow?

## NOTES
- Visual gaps: exact anchor-point pixel positions and the darken amount are visual only.
- AE dropped: "4 Color Gradient" effect; translated to an SVG/CSS gradient with keyed stops.
- Rule conflict: source's instinct is to darken for contrast/mood; our house rule needs a bright, legible UI ground — kept
  the keying mechanism, dropped the darkening.
