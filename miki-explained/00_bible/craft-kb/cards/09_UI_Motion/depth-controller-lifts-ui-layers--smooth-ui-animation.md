---
title: One depth controller lifts UI layers toward camera as it passes, with shadow distance and opacity tied to the lift
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Smooth UI Animation After Effects Tutorial.txt"
source_time: "05:07–09:52 (controller, Z/shadow expressions), 14:44–15:09 (reduce Z)"
tool_target: raea
tier: principle
use_when: "a dashboard/app screen in 3D where the element the line names should rise off the screen"
style_fit: Fits — depth separation on the word; lift eased; keep shadow subtle; ⚠ as a looping wave it becomes decoration → trigger it on words, not continuously.
---

## METADATA
09_UI_Motion | After Effects (source) → raea 3D cards / CSS translateZ | raea

## CREATIVE_INTENT
A null "controller" with sliders **length** and **range** feeds an expression on every 3D UI layer's position: each
layer's Z reacts to its distance from the controller, so as the controller moves the layers rise toward camera and fall
back. Drop shadow distance and opacity get matching expressions (distance reduced to ~150 when too strong; softness up).
Controller keyed: outside the comp → centre at 15 f → back out at 1 s, repeated as a loop; eased with continuous
tangents; layers offset slightly by position.

## STE_PROCEDURE
1. Put every UI element on its own layer in depth-capable space.
2. For each element, compute lift = falloff(distance to a controller point), within a range.
3. Map lift to Z offset, shadow distance and shadow opacity together.
4. Move the controller across the element the line names: in by ~15 f, out by ~1 s.
5. Ease the controller with continuous (smooth) tangents.
6. If the lift reads too strong, lower the max Z.

## AGENT_EXECUTION
raea: kit `pro.tsx` `Card3D` (props `p`, `w`, `h`, `rx`, `ry`) per UI element in a `ProStage`; for each card
`lift = Math.max(0, 1 - Math.abs(cx - card.x) / RANGE)`, `p[2] = base + MAXZ * lift`, `boxShadow` blur/offset × lift.
`cx` keyed with in-out-cubic to the named card on its word.

### Worked example
Topic: a bank app home screen — "Baki", "Bil", "Simpanan" tiles (generic app, illustrative).
- BEFORE: all tiles flat; a red outline marks "Bil".
- AFTER: on "bil bulan ni", the "Bil RM320" tile lifts toward camera, its shadow growing softer and longer; neighbours
  rise a little less; on the next line it settles back.

### Check
- Does the lifted element match the spoken word?
- Do Z, shadow distance and opacity move together?
- Is the controller move eased, not a continuous loop?

## NOTES
- Visual gaps: the three expressions were only in the project file ("you'll get this expression in the project file") —
  formula not recovered; the falloff above is `~`.
