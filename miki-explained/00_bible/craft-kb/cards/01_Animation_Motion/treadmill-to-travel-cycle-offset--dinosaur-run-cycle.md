---
title: In-place cycle to travel — copy the contact curve to the root, flip it, cycle with offset
bucket: 01_Animation_Motion
source: "Animation Masterclass- How to Create a Dinosaur Run Cycle in Maya.txt"
source_time: "36:38–37:38, 1:52:34–1:56:28"
blender_version_source: n/a (Maya)
tool_target: principle-only
tier: principle
style_fit: Serves a looping in-place mechanism that also travels (a wheel or coin rolling across the counter, a ticket ratcheting out of a printer, a conveyor belt texture) with zero slip; a camera following it reveals weight problems an in-place loop hides.
---

## METADATA
01_Animation_Motion | n/a (Maya source; Blender 4.2+ / raea translation) | principle-only

## CREATIVE_INTENT
Principle: build the cycle in place first, then make the root travel by exactly the distance the contact part slides back during contact — the contact then appears locked to the ground. Viewing the cycle traveling exposes weight and spacing issues; muting the travel channel returns to the in-place loop for editing.
Ideas for us: a coin rolling — spin in place, then translate by angle × radius so it never skids; a receipt printer's paper advance; a stepping mechanism in an x-ray view.

## STE_PROCEDURE
1. Before converting, confirm the contact part's travel is linear during contact (see the constant-speed card).
2. Copy the two keys bounding the linear contact span from the contact part's travel channel (foot translate Z, frames 0 and 7).
3. On the root (mover), delete all travel keys except frame 0 and paste the two keys there.
4. Offset the pasted curve back so the root starts at 0.
5. Flip the pasted curve: the root must move forward as much as the contact part moves backward (otherwise travel doubles).
6. Set the root curve pre-infinity and post-infinity to Cycle with Offset so it keeps climbing.
7. Play; where sliding remains, nudge the key that is not on the straight line (frame 39 in the source) by eye.
8. Judge the cycle in travel (source: the vertical bob should be exaggerated for more weight).
9. Mute the root travel channel to return to the in-place version for further edits.

## AGENT_EXECUTION
### Source tool (Maya)
- Graph Editor: Edit → Copy (foot translate Z keys 0 and 7) → mover translate Z → Edit → Paste; shelf "flip" script; Curves → Pre Infinity → Cycle with Offset; Post Infinity → Cycle with Offset.
- Channel box: right-click translate Z → Mute Selected (toggle back to in-place).

### Blender / raea translation
Blender:
```python
m = root_travel_fc.modifiers.new('CYCLES')
m.mode_before = m.mode_after = 'REPEAT_OFFSET'   # = Maya "cycle with offset"
root_travel_fc.mute = True                        # = Maya "mute selected" (in-place view)
```
raea (analytic — no slip by construction):
```tsx
const r = 0.012;                                   // coin radius (m)
const ang = interpolate(f, [0, 90], [0, 6 * Math.PI], { easing: Easing.bezier(0.65, 0, 0.35, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const x = ang * r;                                 // travel = angle × radius: contact point is locked
<Mesh3d name="coin" transform={Transform.fromXyz(x, r, 0).withRotation(Quat.fromEuler("XYZ", 0, 0, -ang))}>…</Mesh3d>
```

## NOTES
- Transfers: in-place first, travel derived from contact, cycle-with-offset, mute to compare. Dropped: biped/creature run specifics.
- Visual gaps: the frame 39 slip fix is by eye.
- Rule conflicts: travel must still start and end eased (rule); the coupling (angle × radius) holds under any easing.
