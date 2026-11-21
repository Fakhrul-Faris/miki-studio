Target file: `cards/05_Camera_Raea_Pipeline/decouple-follower-from-parent-rotation--dinosaur-run-cycle.md`

## VALUES BY SOURCE (new row)
Source: "Minimalist Tech & SaaS 3D Staging/How To Master Saas Explainer – Full After Effects Tutorial.txt"
Timestamp: 1:08:12–1:08:50

Concrete After Effects use-case for the same decouple principle: several character PNGs ("mimojis") are parented to one
null and the null is rotated to orbit them around a shared centre. Rotating the null also spins each character's own
rotation (the heads tip over) — undesired. Fix: on each child's own Rotation property, alt-click to open the expression
editor, pick-whip the expression to the parent null's Rotation property, then append `* -1` so the child's rotation
exactly cancels the inherited spin while its position still orbits. The same expression line is copy-pasted onto every
other orbiting character.

## Extra step this video adds
6. If a child must orbit in position but stay upright, link its own rotation to `-(parent.rotation)` via a pick-whipped
   expression (`parentNull.rotation * -1`), rather than zeroing inheritance at the rig level — useful where you can't
   change the parenting structure (e.g. several pre-built assets sharing one controller null).

## raea translation
Same as the master card's `lookingAt`/no-nest approach is cleanest in raea, but where several `Entity`s must share one
orbiting parent transform and only their *position* should inherit: compute each child's own rotation as the negative of
the parent's current rotation value each frame, e.g. `const parentRot = orbitAngle(f); <Entity transform={Transform
.fromXyz(...orbitPos(f, i)).withRotation(Quat.fromEuler("Y", -parentRot, 0, 0))}>`, so the child visually orbits without
spinning on its own axis.
