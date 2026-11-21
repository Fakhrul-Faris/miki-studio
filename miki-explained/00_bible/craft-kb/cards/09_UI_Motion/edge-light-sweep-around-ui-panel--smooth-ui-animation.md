---
title: Edge-only light sweep travelling around a UI panel's rim (width/thickness 0 → peak → 0)
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Smooth UI Animation After Effects Tutorial.txt"
source_time: "15:30–17:20"
tool_target: raea
tier: principle
use_when: "the moment a phone screen/UI panel 'arrives' or is confirmed; a premium touch on the hero device"
style_fit: Fits if single and slow; ⚠ source colours it with a 4-colour gradient + deep glow → adapted: neutral or accent-only rim, bloom threshold high, one pass.
---

## METADATA
09_UI_Motion | After Effects (source) → raea 3D rim light / CSS conic mask | raea

## CREATIVE_INTENT
A duplicate of the UI comp gets CC Light Sweep with sweep intensity 0 and high edge intensity, light reception
"cutout" — only the edges light. Keys on direction, width and edge thickness: a few frames in, width 200 and thickness 8;
both 0 at start and end; direction ends at −360 (one full trip). Then a 4-colour gradient and Deep Glow; "if the light
sweep feels too fast, slow it down slightly for a smoother glow".

## STE_PROCEDURE
1. Light only the panel's edge, not its face.
2. Animate the lit segment around the rim once (−360°).
3. Grow the segment from 0 to full (source width 200, thickness 8) early, back to 0 at the end.
4. Ease the trip; slow it if it reads hurried.
5. Add a gentle glow on the edge only.

## AGENT_EXECUTION
raea 3D: a phone `Model` with an emissive rim strip is heavy; simpler — a `PointLight` (small `range`) orbiting the
phone edge so it grazes the bezel, `<Bloom threshold={0.9} intensity={0.2} />`. 2D: a border element with
`maskImage: conic-gradient(from ${a}deg, transparent 0deg, #000 20deg, transparent 40deg)`, `a` 0 → −360 eased over ~1.2 s,
mask width scaled 0 → 1 → 0. Verify on a still.

### Worked example
Topic: a phone receiving a DuitNow transfer of RM150 (illustrative amount).
- BEFORE: the notification just appears.
- AFTER: as "RM150 masuk" lands, a thin white light runs once around the phone's edge (1.2 s) and fades; the amount
  is the only accent.

### Check
- Is only the rim lit (face untouched)?
- Is it one pass, ≥ ~1 s, eased?
- Is the glow single-colour?

## NOTES
- Visual gaps: CC Light Sweep start values beyond those spoken are visual only.
- AE dropped: CC Light Sweep, 4-Color Gradient, Deep Glow.

## ADDENDUM — SaaS Motion Graphics Masterclass Techniques
Source: "Motion Feel, Easing & Camera Choreography/SaaS Motion Graphics Masterclass Techniques.txt" — 13:10–16:09

Variant: two mirrored sweeps (0° and ±180°) at different, lower intensities, for a two-sided subtle edge glow on a
line/node rather than a whole panel's rim. Full/matching intensity on both reads "too much"; dialled down and made
asymmetric (one pair at 25/25, the other at 7/7) gives a subtle two-sided glow. Pitfall: CC Light Sweep's position is
comp-space, not layer-space — duplicating the shape elsewhere in the comp does not carry the sweep's centre with it;
each duplicate needs its sweep re-centred by hand.

| parameter | SaaS Motion Graphics Masterclass (AE) | recommended for Style D |
|---|---|---|
| count/direction | 2 sweeps, 0° and ±180° (opposite sides of one shape) | one `<Bloom>` pass is enough; for a two-sided highlight, two thin emissive rim strips on opposite edges |
| intensity | first pair 25/25, second (more subtle) pair 7/7 | keep whichever pair is used at the low end (≈ bloom `intensity` 0.15) |
| pitfall | sweep is comp-space; re-centre per duplicate | raea transforms are always layer-local — this pitfall does not carry over; noted only as a reason not to port the effect literally |

## ADDENDUM — Animate Like Apple After Effects
Source: "Motion Feel, Easing & Camera Choreography/Animate Like Apple After Effects.txt" — 08:19–09:30

Extra variant: CC Light Sweep, edge-only, one full rotation, applied to glass shapes instead of a plain UI panel: no
face sweep (sweep intensity 0), edge intensity 60, edge thickness ~3, light reception "cutout" so only the
silhouette's rim lights; direction keyed one full 360° rotation over the shape's settle. Source note: "if the light
sweep feels too fast, slow it down slightly for a smoother glow."

| parameter | Animate Like Apple (AE) | recommended for Style D |
|---|---|---|
| sweep intensity | 0 (edge-only) | 0 — face must stay clean |
| edge intensity | 60 | keep as one accent-neutral pass |
| edge thickness | ~3 | thin; scale to shape size against the other source's thickness 8 on a larger panel |
| rotation | one full 360° trip | same as this card's one-pass rule |
| speed | "slow it down if it feels too fast" | ease in-out, ≥ ~1 s, per this card |
