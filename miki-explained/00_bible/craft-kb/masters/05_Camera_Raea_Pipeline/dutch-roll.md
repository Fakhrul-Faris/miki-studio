---
title: Dutch roll (small tilt, roll during pans)
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/dutch-roll-during-fast-pan-geometric--cg-cine-ch4-chase.md
  - cards/05_Camera_Raea_Pipeline/dutch-tilt-small-roll--ten-cinematic-tips.md
sources: ["CG Cinematography 101 | Chapter 4 | Camera Analysis (The Chase).txt", "10 Tips to make Your 3D Render more Cinematic.txt", "How Camera Angles Control What We Feel 8 Essential Shots | Visual Storytelling.txt"]
use_when: "tension or energy in a setup"
style_fit: Use sparingly — a held 2–4° roll on an unease line (scam, loss), or a few degrees of roll inside an eased move that resolves to level as it lands. Never a tilt "swing" or whip; pans ≤ ~130°/s eased in-out. Roll must be added in TSX (BlendShot camera data has no roll).
---

## METADATA
05_Camera_Raea_Pipeline | Houdini / Blender 3.x sources → 4.2+/5.x, raea | principle + Blender bpy + raea

## CREATIVE_INTENT
A level horizon reads relaxed; a roll on the view axis makes the frame feel slightly wrong, ominous or energetic.
- Ten Cinematic Tips: a still 2–4° tilt, leaning the eye toward the element to be feared/noticed; keep it subtle.
- CG Cinematography 101 (The Chase): roll during a fast, motivated pan — an operator couldn't stay level — and against straight geometric shapes any roll amplifies the motion; the camera can also pull up and back "as if afraid".
Idea for us: on a turn to reveal the next object, a few degrees of roll that resolves to level as the camera lands.

## STE_PROCEDURE
1. Before you tilt, finish framing with a level horizon.
2. Use roll only where straight lines are in frame (shelves, counters, UI slabs); on organic shapes it barely reads.
3. Static variant: rotate the camera about its view axis (local Z) by 2–4°.
4. Choose the roll direction so the frame leans toward the target element.
5. Check the flipped frame ("Flip the composition") to confirm the tilt does not unbalance the image.
6. Moving variant: motivate the pan (a sound, a line, an object's movement).
7. Animate the pan toward the new subject, eased in-out.
8. Key roll rising during the pan (a few degrees, ~6°) and returning to level as it settles.
9. (from 8 Essential Shots) Use it specifically to make a familiar, everyday space (shelf, counter, straight lines)
   feel unstable — roll held, subject itself stays still.

## VALUES BY SOURCE
| parameter | CG Cine 101 Chase (Houdini) | Ten Cinematic Tips | 8 Essential Shots | recommended for Style D (+ why) |
|---|---|---|---|---|
| roll amount | a few degrees (shown, ~6°) | 2–4° | not given (visual only) | static 2–4°; in-move ≤ ~6°, resolved to 0 at landing |
| timing | during a fast pan | held | held, subject static | held, or inside an eased move only |
| speed | near whip | — | — | ≤ ~130°/s, eased in-out (house rule) |
| purpose | energy, fear (pull up/back) | ominous/unease | makes a familiar everyday space feel unstable | unease lines (scam, loss) or a reveal turn; best on sets with straight lines (shelf, counter) |

## AGENT_EXECUTION
### Source tool (Houdini)
Rotate Z on the main (rotation-only) camera, keyed through the pan.
### Blender 5.x
```python
import bpy, math
cam = bpy.context.scene.camera
# static: roll about local Z (the source says "y-axis"; in camera view the visible tilt is local-Z roll)
with bpy.context.temp_override(selected_objects=[cam], active_object=cam):
    bpy.ops.transform.rotate(value=math.radians(3), orient_axis='Z', orient_type='LOCAL')
# moving: key local-Z on the rotation layer (or an Empty parent if a Track To constraint drives aim)
for fr, deg in [(10, 0), (25, 6), (40, 0)]:
    cam.rotation_euler.z = math.radians(deg); cam.keyframe_insert("rotation_euler", index=2, frame=fr)
```
### raea (roll via the up vector of `lookingAt(target, up)`)
```tsx
// static, camera looking roughly down -Z: up = [sin r, cos r, 0]
const r = (3 * Math.PI) / 180;
<Camera3d transform={Transform.fromXyz(...p).lookingAt(t, [Math.sin(r), Math.cos(r), 0])} projection={{ Perspective: { fov } }} />
// moving: rises and resolves, eased
const roll = 0.1 * Math.sin(Math.PI * ease(f, 10, 40));      // ~6°
const fwd = norm(sub(t, p));
const up = rotateAround([0, 1, 0], fwd, roll);                // Rodrigues rotation
<Camera3d transform={Transform.fromXyz(...p).lookingAt(t, up)} projection={{ Perspective: { fov } }} />
```
(`ease`, `norm`, `sub`, `rotateAround` are small local helpers, not raea exports.)

## NOTES
- Deprecated: none.
- Pipeline gap: BlendShot camera data is `{p, t, fov}` only — a roll keyed in Blender is lost on export; add roll in TSX via `up`.
- Visual gaps: the Chase's roll amount is shown, not spoken.
- Rule conflicts: the video's fast pan is near whip speed — ours stays ≤ ~130°/s eased; no tilt swings; only on lines whose meaning is unease/energy.
