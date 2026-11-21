---
title: Dashed flight-path lines drawn between points on a map/globe, parented to one control
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/Motion Explainer Ads Part 3.md"
source_time: "45:51–48:16 (lines drawn between countries), 48:16 (dashed stroke per line, grouped and linked to one null)"
tool_target: raea
tier: principle
use_when: "visualising a network — branches, delivery routes, payment rails, referral spread — between named points on a map/diagram"
style_fit: Fits — a literal drawn connection between two named places/nodes, built from the scene's own map, not a generic flashy line effect.
---

## METADATA
09_UI_Motion | After Effects (pen-tool strokes + per-line dashed pattern, grouped under one null) → raea array of dashed paths parented to one control | raea

## CREATIVE_INTENT
Between each pair of points that should read as "connected", a thin stroke is hand-drawn (not a programmatic arc), then
a dashed pattern is applied per line (dash length set manually per stroke, since auto-dash doesn't match every line
length). All the lines are grouped and parented to a single control object so the whole network can be revealed, moved or
faded together as one unit, timed with the rest of the globe/map scene.

## STE_PROCEDURE
1. Draw a straight or gently-arced stroke between each pair of points that should connect (named, real relationships only).
2. Apply a dashed stroke pattern to each line, tuning dash length per line so it reads evenly regardless of length.
3. Group all lines under one parent/null so they can be revealed, scaled or faded as a single unit.
4. Reveal the whole group on the word that names the network ("branches", "network", "reach"), not before.

## AGENT_EXECUTION
Shot-list row: `| 14 | "ada kat 20 cawangan" | map + dashed lines | lines draw between branch dots on '20 cawangan' | this card`.
raea: an array of dashed SVG paths between known point coordinates, drawn on together via one shared `t`:
```tsx
const t = k(f, word("cawangan"), 20, out);
{routes.map(([a, b], i) => (
  <path key={i} d={arcBetween(a, b)} stroke={C.accent} strokeWidth={2}
    strokeDasharray="6 4" strokeDashoffset={lerp(100, 0, t)} fill="none" opacity={0.8} />
))}
```

### Worked example
Topic: a kedai runcit franchise with branches across a state (illustrative generic network, not a real company's data).
- BEFORE: a map shows dots for each branch with no sense of a connected network.
- AFTER: dashed lines draw between the branch dots exactly on "20 cawangan", all appearing together as one revealed network.

### Check
- Does every line connect two real, named points (not decorative scribbles)?
- Do all lines reveal together as one group, timed to the word that names the network?
- Is dash spacing even across lines of different lengths?

## NOTES
- Visual gaps: exact per-line dash-length values are visual only.
- AE dropped: manual per-line dash tuning (tool-click repetition) — kept as the principle (tune dash density so lines of
  different length still read evenly), executed in raea with a shared dash-length formula instead of per-line tuning.
