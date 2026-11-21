---
title: Expanding-mask wipe — scene change built from a shape growing out of the frame, not a flash
bucket: 08_Edit_Pacing
source: "Minimalist Tech & SaaS 3D Staging/How To Create SaaS Explainer Ad in After Effects | For Beginners | +01 Hour Masterclass.txt"
source_time: "13:51–15:00 (adjustment-layer glow+radial-blur whoosh, as built), 24:06–24:55 (mask-path wipe used as the actual scene-to-scene cut), 27:36 (CC Light Sweep across the counter)"
tool_target: raea
tier: full
use_when: "cutting from one scene to the next where no single hero prop can carry a match-cut morph; the join still needs to read as an object doing something, not a generic effect"
style_fit: "⚠ conflict: source's go-to connector is an adjustment-layer radial-blur + glow 'whoosh' wash across the whole frame — reads as a crash-zoom/flash, against the no-generic-wipes/flashes rule → adapted: use the mask-path wipe (a shape's edge sweeping through frame, built from the scene's own elements) as the join instead."
---

## METADATA
08_Edit_Pacing | After Effects (adjustment-layer mask path + feather, rejecting Glow/Radial Blur whoosh) → raea animated clip-path | raea

## CREATIVE_INTENT
Two different joins appear in the same build. The rejected one: an adjustment layer carries Glow (exposure keyed up then
down) plus Radial Blur (amount keyed 0→3) as a blanket "whoosh" over the cut — fast to build but reads as a flash/crash-
zoom, which breaks the house no-generic-transition rule. The adopted one: a mask path on a comp is keyed so its edge
sweeps across the frame (feather increased for a soft edge) while the next scene's layer is already stacked beneath,
fading it from one state to the next as the shape clears the frame — the join is carried by an actual edge moving, not a
blanket post effect.

## STE_PROCEDURE
1. Before cutting, place the next scene's layer directly under the outgoing scene's layer, stacked and ready.
2. On the outgoing layer, key a mask path's edge from covering the frame to clear of the frame over ~0.3–0.5 s.
3. Feather that mask edge so the sweep isn't a hard line.
4. Never use a frame-wide glow+radial-blur wash as the join — it reads as a flash/crash-zoom (⚠ dropped).
5. If a light-sweep is wanted on a specific element (not the whole join), key it locally (CC Light Sweep on one shape),
   not across the full frame.

## AGENT_EXECUTION
Shot-list row: `| 5 | "— cut to app home —" | mask-edge wipe | L04's panel edge sweeps left to clear, L05 already staged beneath | this card`.
raea: an animated `clip-path` (an inset or a polygon edge) on the outgoing layer, keyed with `k()`, outgoing layer on top,
incoming layer rendered underneath from frame 0 of the cut:
```tsx
const t = k(f, cutFrame, 14, inOut);
<div style={{ clipPath: `inset(0 0 0 ${lerp(0, 100, t)}%)` }}>{OutgoingScene}</div> // sweeps clear from the left
{IncomingScene /* already mounted beneath, visible as the clip reveals it */}
```

### Worked example
Topic: a kedai runcit's phone cutting from the receipt screen to the day's sales chart (illustrative RM figures).
- BEFORE: a full-frame glow+blur flash washes the screen white for two frames between scenes — reads as a crash-zoom.
- AFTER: the receipt panel's edge sweeps left and clears in 0.4 s, revealing the sales-chart screen that was already
  staged underneath — no flash, no blanket post effect.

### Check
- Does the join come from an edge/shape moving, not a frame-wide post-process wash?
- Is the incoming scene already staged under the outgoing one before the sweep starts?
- Is any light-sweep used locally on one element, never across the whole frame as the cut itself?

## NOTES
- Visual gaps: exact mask-path feather amount and sweep duration are visual only, marked `~`.
- AE dropped: Glow + CC Radial Blur full-frame "whoosh" adjustment-layer connector (⚠ rejected, see style_fit); kept and
  translated: the mask-path edge-sweep, built with a real `clip-path`.
