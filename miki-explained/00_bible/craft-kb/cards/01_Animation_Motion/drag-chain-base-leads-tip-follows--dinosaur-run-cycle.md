---
title: Drag down a chain — base leads, tip follows, posed link by link (plus fixing computer in-betweens)
bucket: 01_Animation_Motion
source: "Animation Masterclass- How to Create a Dinosaur Run Cycle in Maya.txt"
source_time: "1:00:48–1:22:48"
blender_version_source: n/a (Maya)
tool_target: principle-only
tier: principle
style_fit: Serves long flexible objects that bend on a word (a receipt strip unrolling, a cable, a ribbon of tickets, a chart line morphing); must keep weight — never a floating ribbon.
---

## METADATA
01_Animation_Motion | n/a (Maya source; Blender 4.2+ / raea translation) | principle-only

## CREATIVE_INTENT
Principle: on a long chain, the base drives the action and each link toward the tip drags a little more; pose one link at a time from base to tip to keep a clean line of flow, check two views (side and top), and add an extra key wherever the computer's straight blend erases the drag. Keep muscle: it must not flow "like a ribbon".
Ideas for us: a printed receipt curling as it feeds out, a phone charging cable swinging as the phone is placed, a paper price strip or a bar of a chart bending into its new state with the root moving first and the tip arriving last.

## STE_PROCEDURE
1. Before posing, switch the chain to FK (IK/FK blend 10 → 0; break the connection on the blend attribute so it holds no keys).
2. Pose the rest shape first: a smooth curve continuing the line of flow from head through spine to tail tip.
3. Key all chain controls every 3 frames (0, 3, 6, 9, 12, 15, 18, 21) and pose straight ahead.
4. On each key, rotate the base first, then move to the next link, then the next — never rotate links out of order.
5. Make the base lead the body's motion and each further link lag more (base down while tip still up; tip catches up 3 frames later).
6. Check each pose in the top view as well; side-to-side (rotate Y) follows the same base-leads, tip-drags rule (e.g. base ~−1, outer links more; dial back to ~−4 if too strong).
7. If a link "hits a wall" (stops in space), push its rotation further so the motion continues through.
8. Copy the frame 0 pose to frame 26 to close the cycle.
9. Scrub the last span; where the interpolation blends straight (frame 21 → 26 lost the drag), add a key 2 frames in (frame 23) and re-pose the drag.
10. Before finishing, play and check the chain still reads heavy; reduce lag if it flops.
11. Prefer straight-ahead posing over copy-and-mirror here: a little variation between halves keeps it from feeling mechanical.

## AGENT_EXECUTION
### Source tool (Maya)
- Tail FK/IK switch: attribute "fk ik blend" 10 = IK → 0 = FK; right-click → Break Connection.
- Channel box: select rotate Z (side view) / rotate Y (top view), middle-mouse drag in the viewport to adjust; key with S on all tail controls.
- Keys every 3 frames 0–21, closing key 26 = copy of 0, fix key at 23.

### Blender / raea translation
- Blender (build): a bone chain or a curve with a Hook per segment; key rotations per link with an increasing frame delay, or use a Bend/Simple Deform (`modifiers.new('Bend', 'SIMPLE_DEFORM')`, `deform_method='BEND'`) whose `angle` is keyed with the tip segment's own delayed copy. Export the bake to GLB (raea plays model clips via `<Model src animation="…">`).
- raea (live, segments as separate meshes in nested Entities — each child composes its parent's rotation, so a per-link delayed angle produces base-leads/tip-follows):
```tsx
const bend = (fr: number) => interpolate(fr, [0, 24], [0, 0.35], { easing: Easing.bezier(0.65, 0, 0.35, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const link = (i: number, child?: JSX.Element) => (
  <Entity transform={Transform.fromXyz(0, 0, -0.03).withRotation(Quat.fromEuler("XYZ", bend(f - i * 3) / 6, 0, 0))}>
    <Mesh3d name={`strip-${i}`}>…</Mesh3d>{child}
  </Entity>);
// nest: link(0, link(1, link(2, link(3, link(4, link(5))))))
```

## NOTES
- Transfers: base-leads chain, posing link by link, two-view check, in-between fix key, weight not ribbon. Dropped: dinosaur tail specifics, arms/fingers pass (same principle, character content).
- Visual gaps: nearly every tail rotation is a by-eye drag; only rotate Y "~−1" and "~−4" are spoken — the rest is unknown (visual only).
- Rule conflicts: no wobble after the state change — the tip catches up and holds; no oscillation.
