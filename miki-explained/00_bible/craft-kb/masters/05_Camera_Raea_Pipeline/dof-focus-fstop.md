---
title: DoF — focus on the hero, choose f-stop per shot
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/dof-eyedropper-conservative-fstop--nice-camera-angles.md
  - cards/05_Camera_Raea_Pipeline/dof-focus-object-fstop-per-shot--product-animation-masterclass.md
sources: ["How to Find Nice Camera Angles in Blender.txt", "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt", "Every Composition Concept Explained (In 3D).txt", "How to Make 3D Edits like Fern (RED STYLE).txt", "How To Animate Like Imperial (Blender & After Effects Tutorial).txt", "How To Edit Like Johnny Harris - 3D Soldiers (in Blender).txt", "Overwatch Dragon Brothers - Visual language and 3D camera lessons.txt"]
use_when: "setting focus and f-stop on each macro setup"
style_fit: House shallow DoF on the hero; the miniature read that f-stops below ~1.8 give is intended for macro objects, not for room shots. Stop down only when several objects must read (a "multiply"/reveal beat). Focus pulls eased in-out on the word.
---

## METADATA
05_Camera_Raea_Pipeline | 4.x / 4.3 sources → 4.2+/5.x | Blender bpy + raea DepthOfField

## CREATIVE_INTENT
Focus on the focal point and choose the f-stop per shot: shallow focus isolates a single product and feels photographic, but
too much blur makes a scene feel tiny and hides payoffs.
- Nice Camera Angles: eyedropper focus, f/2.8 default, not much below ~1.8 (miniature effect); DoF often off on wide environment shots (or f/22).
- Product masterclass: focus object = hero; f/2.8 to isolate; in a reveal stop down until the background reads but stays softer ("f/41 too much … f/8 … f/13").

## STE_PROCEDURE
1. Enable Depth of Field on the camera (Camera Properties > Depth of Field).
2. Set Focus Object to the hero (or use the Focus Distance eyedropper on the focal point).
3. For a hero beat, set F-Stop 2.8.
4. For a little more blur, lower to ~1.8; do not go much below for environments.
5. Check that foreground objects soften slightly and the focal point stays sharp.
6. If everything looks miniature on a room shot, raise the F-Stop.
7. For a reveal/group beat, raise the F-Stop until the background objects are readable but softer than the hero (author ends at 13).
8. For wide environment shots, consider DoF off (or F-Stop ~22).
9. After duplicating/swapping objects, make sure the correct object is still the focus target.
10. Before trusting any number, check the scene's units are metres at real size (blur depends on scale).
11. (from Every Composition Concept Explained (In 3D)) Before setting focal_distance, name the specific feature the
    line is about (the price, the seal, the chip) and measure/focus to that point, not the object's geometric centre.
12. (from How to Make 3D Edits like Fern (RED STYLE)) If the hero's own origin is inconvenient as a focus target
    (off-centre, animated, or part of a larger linked mesh), place a plain empty where focus should land and set it as
    Focus Object instead of the mesh itself; the empty can then be keyframed independently of the hero's own animation.
13. (from How To Animate Like Imperial) For a rack-focus beat between two named heroes inside one continuous camera
    move: key Focus Object on Subject A at the shot's start, hold it through the move, then reassign Focus Object to
    Subject B at the point the story's attention shifts and key again; key F-Stop at the same frame if the depth
    character should change too (e.g. tightening to isolate B).
14. (from How To Edit Like Johnny Harris - 3D Soldiers) For a single isolated hero with nothing else that must read,
    F-Stop can go to 1.0; to get shallower DoF without changing the framing, lengthen the lens and move the camera
    back instead of just lowering F-Stop further.
15. (from Overwatch Dragon Brothers) Before a close detail shot of a multi-part object, ask whether every part must
    read. If yes, close the aperture to ~f/7–8 and raise light power/exposure to compensate for the darker image —
    never lift it back up in the grade. If only one part matters, keep house shallow DoF and focus on that part.

## VALUES BY SOURCE
| parameter | Nice Camera Angles | Product masterclass | Every Composition Concept | Fern (RED style) | Imperial breakdown | Johnny Harris Soldiers | Overwatch Dragon Brothers | recommended for Style D (+ why) |
|---|---|---|---|---|---|---|---|---|
| focus | eyedropper on focal point | Focus Object = hero | subject in focus — face/eyes for a character, the showcased feature for a product | dedicated empty placed near the hero, used as Focus Object instead of the hero mesh | Subject A, reassigned to Subject B mid-move (rack focus) | eyedropper on the soldier | — | `focal_distance` = \|eye − hero\| per frame; focus on the feature the line names; use an empty as the focus target when the hero's own origin is inconvenient |
| hero f-stop | 2.8 (≥ ~1.8) | 2.8 | — | 1.4 (very shallow) | ~1.2 close subjects / ~8 background blades (to fake a real lens) | 1.0 ("something low") | — | 2.2–2.8 default (kit ProStage 2.2); 1.0 only for one isolated hero with nothing else that must read |
| group / reveal / multi-part detail | — | 13 (tried 41, 8) | — | — | — | — | ⚠ f/7–8, "so you can see the entire thing in focus"; open aperture on a detail shot "gives cheap" | ~8–13 so the count/parts read; raise key light power rather than lifting exposure in the grade |
| wide shot | DoF off or f/22 | — | — | — | — | — | — | f/8+ for establishing shots |
| rack focus (two heroes, one move) | — | — | — | — | key Focus Object A→B + F-Stop key at the pull frame | — | — | usable for a named two-hero pull beat (e.g. the register → the receipt) |

## AGENT_EXECUTION
Blender 5.x:
```python
import bpy
cam = bpy.context.scene.camera.data
cam.dof.use_dof = True
cam.dof.focus_object = bpy.data.objects["Hero"]   # eyedropper equivalent (or cam.dof.focus_distance = d)
cam.dof.aperture_fstop = 2.8                      # hero; ≥1.8 for natural rooms; 13 for a reveal; 22 ≈ off
```
raea:
```tsx
const dist = Math.hypot(cx - hx, cy - hy, cz - hz);   // per frame, so focus tracks during flights
<Camera3d transform={Transform.fromXyz(cx, cy, cz).lookingAt([hx, hy, hz])} projection={{ Perspective: { fov } }}>
  <DepthOfField focal_distance={dist} aperture_f_stops={reveal ? 13 : 2.8} />
</Camera3d>
```
`focal_distance` animates per frame (post.md); kit `pro.tsx` ProStage wraps it (`focus`, `aperture`).

## NOTES
- Deprecated: none.
- Blender and raea f-stops are both physical but blur depends on scene scale; check a still.
- Related: dof-close-ups-only--ten-cinematic-tips (same principle).
- Visual gaps: Fern and Imperial give no scene-scale numbers for their f-stops (treat as approximate, confirm on a
  still per step 10).
- Rule conflicts: none for the hero default. ⚠ Overwatch's f/7–8 multi-part close-up departs from house shallow DoF —
  flagged, and only usable when every part of the object IS the line (a cutaway, a full receipt, a row being
  counted); compensate the darker frame with light power, never with a grade lift. Style D pick elsewhere unchanged.
