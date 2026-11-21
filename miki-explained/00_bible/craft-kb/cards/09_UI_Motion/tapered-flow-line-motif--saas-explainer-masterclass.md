---
title: Flow-line motif — a tapered stroke draws on, with colour travelling along its length
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How To Create SaaS Explainer Ad in After Effects | For Beginners | +01 Hour Masterclass.txt"
source_time: "01:47–02:53 (first line draw-on + taper), 09:14–11:16 (second line, mirrored copies, taper, colour animation)"
tool_target: raea
tier: full
use_when: "visualising money/data moving between two points on screen — a payment travelling, a process flowing step to step"
style_fit: Fits — a literal line for a literal "flow" line in the script; keep it one accent colour and let it draw on over the word, never snap in.
---

## METADATA
09_UI_Motion | After Effects (trim paths + taper, mirrored duplicates) → raea stroke-dasharray draw-on | raea

## CREATIVE_INTENT
A single pen-tool stroke is drawn on with trim-path offset (start/end keyframed so it looks hand-drawn), then a taper is
added so the stroke thins toward its ends instead of a uniform width. The stroke's colour itself is keyed to shift along
the draw (e.g. white → accent) as it travels, read with a glow. The same stroke is duplicated, flipped vertically and
offset to build a denser flow-field (four copies, reduced opacity) rather than one lone line.

## STE_PROCEDURE
1. Draw one open path between the two points the line connects (a source and a destination, not decoration).
2. Animate stroke draw-on: start 0 %, end keyed from 0 → 100 % over the word that names the motion.
3. Add a taper so width narrows toward both ends (not a flat pipe).
4. Key the stroke's colour to travel along the draw (not a static single colour).
5. Duplicate the stroke 2–4× (flip vertical / offset position), reduce opacity on the copies, for a denser field.
6. Finish with a light bloom on the stroke only (not the background).

## AGENT_EXECUTION
Shot-list row: `| 4 | "duit terus masuk" | phone → bank icon | line draws from phone to bank icon on "terus", tapered, glows accent | this card`.
raea: an SVG `<path>` with `pathLength=100`, `strokeDasharray="100"`, `strokeDashoffset` keyed by `word()`, stroke width
via a `stroke-width` gradient trick (duplicate `<path>` masks) or a tapered custom path; colour travel via a
`<linearGradient>` whose stops shift with `t`.
```tsx
const t = k(f, word("terus"), 18, out);
<path d={flowPath} pathLength={100} strokeDasharray={100} strokeDashoffset={lerp(100, 0, t)}
  stroke="url(#flowGrad)" strokeWidth={6} strokeLinecap="round" fill="none" />
<linearGradient id="flowGrad"><stop offset={`${lerp(0,100,t)}%`} stopColor="#fff" />
  <stop offset="100%" stopColor={C.accent} /></linearGradient>
```

### Worked example
Topic: a kedai runcit receiving an e-wallet payment that lands in its account the same second (illustrative).
- BEFORE: a static arrow icon between phone and bank — no sense of movement.
- AFTER: on "terus masuk", one tapered line draws from the phone to the bank icon, its colour travelling from white to
  the brand accent as it goes, with two fainter duplicate lines behind it suggesting a steady flow.

### Check
- Does the line draw on exactly as the word is spoken, not before or lingering after?
- Does the stroke taper (not a uniform-width pipe) and travel colour (not a static fill)?
- Is the glow only on the line, not spilling onto the background or hero?

## NOTES
- Visual gaps: exact taper percentages and gradient colour stops are shown on screen only, marked `~`.
- AE dropped: Trim Paths + Taper (native), mirrored-copy stacking for density — translated to SVG dash-offset draw-on with
  a gradient-stop sweep.
