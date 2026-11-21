---
title: Roll (dutch) the camera during a fast pan over straight, geometric shapes
bucket: 05_Camera_Raea_Pipeline
source: "CG Cinematography 101 | Chapter 4 | Camera Analysis (The Chase).txt"
source_time: "23:02–25:03"
blender_version_source: n/a (Houdini)
tool_target: principle-only | Blender bpy | raea
tier: principle
style_fit: Works on our geometric subjects (shelves, phone UI slabs, counters) as a small roll inside an eased move; not as a whip.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Houdini) → Blender 4.2+ / raea | principle + translation

## CREATIVE_INTENT
Principle: an operator couldn't pan that fast and stay level, so roll the camera while it pans. Against straight, geometric shapes any roll on the view axis amplifies the dynamism of the motion. The camera can also pull up and back as if afraid of what it sees. Motivate the pan (a sound of the second ship; "what about the other one? — oh, here it is").
Ideas: on a turn to reveal the next object, add a few degrees of roll that resolves to level as the camera lands.

## STE_PROCEDURE
Method:
1. Motivate the pan (sound, line of dialogue, an object's movement).
2. Animate the pan toward the new subject.
3. Key roll on the view axis rising during the pan (a few degrees, ~) and returning to level as it settles.
4. Use it only where straight lines are in frame; roll on organic shapes barely reads.

## AGENT_EXECUTION
### Source tool (Houdini)
Rotate Z on the main (rotation-only) camera, keyed through the pan.
### Blender / raea translation
Blender: key `rotation_euler` local Z on the camera (rotation layer); e.g. 0° → ~6° → 0°.
raea (roll via a rotated up vector, as in dutch-tilt-small-roll--ten-cinematic-tips):
```tsx
const roll = 0.1 * Math.sin(Math.PI * ease(f, 10, 40));      // ~6°, rises and resolves, eased
const fwd = norm(sub(t, p));                                   // view direction
const up = rotateAround([0, 1, 0], fwd, roll);                 // helper: Rodrigues rotation
<Camera3d transform={Transform.fromXyz(...p).lookingAt(t, up)} projection={{ Perspective: { fov } }} />
```
(`norm`, `sub`, `rotateAround` are small local helpers, not raea exports.)

## NOTES
- Deprecated: none.
- Visual gaps: roll amount shown, not spoken.
- Rule conflicts: the video's fast pan is near whip speed — ours stays ≤ ~130°/s with eased in-out; roll small and resolved to level by the end.
