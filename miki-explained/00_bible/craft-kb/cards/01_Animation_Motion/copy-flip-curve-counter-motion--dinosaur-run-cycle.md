---
title: Reuse a curve on another part and flip it for counter-motion (offset)
bucket: 01_Animation_Motion
source: "Animation Masterclass- How to Create a Dinosaur Run Cycle in Maya.txt"
source_time: "23:16–28:13, 28:44–29:47, 40:06–41:58, 55:54–57:20"
blender_version_source: n/a (Maya)
tool_target: principle-only
tier: principle
style_fit: Gives a single hero object a "fleshy", organic feel with no extra design work (a lid counter-tilting its box, a ring counter-rotating around a coin); stays subtle so it never reads as bounce.
---

## METADATA
01_Animation_Motion | n/a (Maya source; Blender 4.2+ / raea translation) | principle-only

## CREATIVE_INTENT
Principle: a secondary part can reuse the primary part's curve; inverting it (flip) makes the part counter the main motion, which reads as mass and flexibility ("fleshiness") instead of a rigid block. Reusing curves also keeps timing coherent and saves work.
Ideas for us: copy the hero object's tilt curve onto its lid/cap/label and flip it at reduced amplitude; copy a card's rise onto its shadow-casting tag, flipped; mirror one half of a symmetric move onto the other side by sign-flipping (left/right panels opening).

## STE_PROCEDURE
1. Select all keys of the source curve (COG rotate X) and copy them.
2. Before pasting, note the target part's current start value (chest rotate X was 6.25).
3. Delete the target's keys, paste at frame 0, then offset the whole curve back to the noted start value.
4. Flip the pasted curve (invert values around its start) so the part counters the source.
5. Repeat for translation (COG translate Y → chest translate Y), offsetting the first key back to 0.
6. Before playing, set any straight handles that the flip created back to Auto Tangent.
7. Reduce amplitude on the copy if the counter-motion is too strong.
8. For a mirrored second half of a cycle, copy the first-half value and invert the sign (chest rotate Y −0.5 at frame 0 → +0.5 at frame 13).

## AGENT_EXECUTION
### Source tool (Maya)
- Graph Editor: Edit → Copy on the source channel; on the target: delete keys, select frame 0 key, Edit → Paste; drag the curve back to the original value.
- "Flip" is a custom shelf script (linked in the video description, not shown) — effectively scale keys by −1 around a pivot value.
- AnimBot "Mirror all keys" mirrors left/right controls; the copy-pose / paste-pose tools move a mirrored pose onto frame 13.

### Blender / raea translation
Blender:
```python
import bpy
def copy_flip(src_fc, dst_fc, gain=-0.6):     # gain<0 = flip; |gain|<1 = subtler
    pivot = src_fc.keyframe_points[0].co[1]
    base = dst_fc.keyframe_points[0].co[1] if dst_fc.keyframe_points else 0.0
    dst_fc.keyframe_points.clear()
    for kp in src_fc.keyframe_points:
        dst_fc.keyframe_points.insert(kp.co[0], base + gain * (kp.co[1] - pivot))
    for kp in dst_fc.keyframe_points:
        kp.handle_left_type = kp.handle_right_type = 'AUTO_CLAMPED'
    dst_fc.update()
```
(Get F-Curves via `action.fcurves` in 4.2–4.3, via the channelbag in 4.4+/5.0 — see the seamless-cycle card. Graph Editor equivalent: `bpy.ops.graph.copy()`, `bpy.ops.graph.paste(flipped=False)`, then scale keys −1 with pivot = 2D cursor.)
raea (same function, negated and scaled, on the child part):
```tsx
const tilt = (fr: number) => 0.06 * Math.sin((2 * Math.PI * fr) / 52);   // hero tilt (radians)
<Entity transform={Transform.IDENTITY.withRotation(Quat.fromEuler("XYZ", tilt(f), 0, 0))}>
  <Mesh3d name="box">…</Mesh3d>
  <Entity transform={Transform.fromXyz(0, 0.05, 0).withRotation(Quat.fromEuler("XYZ", -0.5 * tilt(f), 0, 0))}>
    <Mesh3d name="lid">…</Mesh3d>
  </Entity>
</Entity>
```

## NOTES
- Transfers: curve reuse, flip for counter-motion, sign-flip for mirrored halves. Dropped: mirroring leg/arm keys between sides of a creature (locomotion).
- Visual gaps: the flip script's code is not in the transcript (description link only).
- Rule conflicts: none if amplitude stays small; it is secondary motion under a held pose, not a gesture.
