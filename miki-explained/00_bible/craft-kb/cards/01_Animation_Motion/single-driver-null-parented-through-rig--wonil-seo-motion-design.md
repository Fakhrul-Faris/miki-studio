---
title: One driver, parented through the whole rig, controls a multi-object choreography
bucket: 01_Animation_Motion
source: "Procedural Mograph & 3D-to-AI Render Passes/How to create Motion Design like Seven (Wonil Seo).txt"
source_time: "00:28–02:31"
tool_target: raea
tier: principle
use_when: "staging a multi-object choreography (several discs/panels/cards moving together) that should be controllable and retimeable from one value"
style_fit: "No conflict — a rigging discipline for raea scene graphs; execution is AE-specific, principle ports directly."
---

## METADATA
01_Animation_Motion | After Effects (source) → raea | parent hierarchy + single animated property

## CREATIVE_INTENT
Parent every moving piece — directly or through intermediate parents — to one driver (a null/empty), then animate
only that driver's single property (its Z-rotation). The whole multi-object choreography plays back from that one
curve: "it's all driven by one property."

## STE_PROCEDURE
1. Before keyframing each object separately, build the parent hierarchy first: every piece that should move
   together parents (directly or via another moving piece) up to one driver null.
2. Animate exactly one property on the driver (e.g. rotation) with eased keyframes.
3. If a sub-group needs its own offset timing/scale, duplicate from a sibling to keep the family's shape
   consistent, not hand-build it fresh.
4. Iterate by changing only the driver's curve, not re-touching every child.

## AGENT_EXECUTION
raea equivalent: a parent `Transform` hierarchy where child meshes read the parent's transform; animate one
`interpolate()` call driving the top node's rotation, children inherit it, adding only their own fixed offset
transforms (not their own keyframes).

### Worked example
Topic: a row of RM-coin denominations rotating together to reveal totals (illustrative).
BEFORE: each coin instance gets its own hand-placed rotation keyframes, hard to retime.
AFTER: all coin instances parented to one driver empty; only the driver's Z-rotation is keyframed (eased in-out),
retiming the whole reveal by editing one curve.

### Check
- Do all moving pieces trace up to one driver through parenting, rather than each having independent keyframes?
- Is exactly one property animated on the driver?

## NOTES
- AE-only workarounds in this source dropped entirely — raea does not need them: rim-light/inner-glow via
  duplicate+mask+subtract+feather, the Classic3D/Cinema4D dual-render colour-key extrusion workaround, and the
  glass partial-blur-via-Set-Matte refraction fake. raea's native PBR materials and real 3D extrusion/transparency
  replace these directly; only the parenting/staging idea above is portable.
