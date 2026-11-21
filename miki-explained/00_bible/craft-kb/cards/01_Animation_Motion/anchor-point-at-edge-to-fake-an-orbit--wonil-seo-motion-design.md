---
title: Move the anchor point to an edge so rotation alone fakes an orbit
bucket: 01_Animation_Motion
source: "Procedural Mograph & 3D-to-AI Render Passes/How to create Motion Design like Seven (Wonil Seo).txt"
source_time: "00:28–00:57"
tool_target: raea
tier: principle
use_when: "an object needs to appear to orbit/swing around a point using only position and rotation, without hand-keying an arc"
style_fit: "No conflict — distinct from camera-orbit rigs (this orbits an object's own geometry around an off-centre pivot)."
---

## METADATA
01_Animation_Motion | After Effects (source) → raea | pivot offset + rotation

## CREATIVE_INTENT
Move an object's pivot (anchor point) to its edge rather than its centre; rotating it then swings the object around
that edge like an orbit, without hand-animating an arc of position values — "it's super accurate."

## STE_PROCEDURE
1. Before animating an orbit-like swing, set the object's pivot to the edge/point it should swing around, not its
   centre.
2. Animate only the rotation around that pivot; position follows automatically.
3. Use this instead of keying a circular path of position values by hand.

## AGENT_EXECUTION
raea: offset the mesh's local origin (or wrap it in a group whose origin sits at the desired pivot) so rotating
that group's `Transform` produces the swing; animate one rotation value with `interpolate()`, eased in-out per the
camera/motion rules.

### Worked example
BEFORE: a row of RM-coin stacks is hand-keyed through several X/Y position points to fake a fan-out swing.
AFTER: each stack's pivot is moved to the shared edge point; one rotation value per stack (offset in time) produces
the fan-out.

### Check
- Is the pivot moved to the swing point rather than hand-keying a position arc?
- Is only rotation animated, with position left to follow the pivot?

## NOTES
- Distinct from `cards/05_Camera_Raea_Pipeline/empty-parent-orbit-camera-rig--cinematography-next-level.md` (that
  card orbits the camera around a subject; this one orbits an object's own geometry around an off-centre pivot).
