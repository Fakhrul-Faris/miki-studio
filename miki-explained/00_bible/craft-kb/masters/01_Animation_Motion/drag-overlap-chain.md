---
title: Overlap / drag down a chain (frame-offset cascade)
bucket: 01_Animation_Motion
type: master
members:
  - cards/01_Animation_Motion/drag-chain-base-leads-tip-follows--dinosaur-run-cycle.md
  - cards/01_Animation_Motion/overlap-cascade-frame-offset--dinosaur-run-cycle.md
sources: ["Animation Masterclass- How to Create a Dinosaur Run Cycle in Maya.txt", "How To Master Shape Morphing For Apple Ui Style – Full After Effects Tutorial.txt", "Smooth UI Animation After Effects Tutorial.txt"]
use_when: "a strap, cable, receipt roll or stacked items following a lead part, or a row of UI icons/options revealing in sequence"
style_fit: Object morphs/multiplies and camera aim lag only; keep per-link delay ≤ ~2–4 f @60 fps with amplitude falloff, the tip catches up and holds — no wobble, no oscillation, no floppy ribbon; never on figures.
---

## METADATA
01_Animation_Motion | Maya (source) → Blender 5.3 + raea | principle-only (both members), translated to bpy + raea nested Entities

## CREATIVE_INTENT
Shared why: on any chain (a strip, a cable, a stack, a row of tags) the base drives the action and each link further out
repeats it slightly later and slightly smaller; that delay is what makes a moving thing feel heavy and physical. Keep
"muscle": too much lag reads as a floppy ribbon.
- Drag chain (1:00:48–1:22:48): pose link by link from base to tip, check two views, add an in-between key where the
  computer's straight blend erases the drag, prefer straight-ahead posing over mirroring.
- Overlap cascade (50:32–58:47): the shortcut — copy the leader's curve to each follower, shift +1, +2 frames, reduce the
  amplitude; keep infinity Cycle so shifted keys don't gap at a loop seam.
Ideas: receipt curling as it feeds out, a charging cable swinging as the phone lands, coins in a stack lifting one after
another, price tags following the lead tag's tilt, the camera's aim point lagging the hero by a few frames on a flight.
- Shape Morphing (Apple UI, 34:45–35:50) and Smooth UI Animation (01:08–02:10, 04:45–09:35) confirm the same idiom works
  on a row of **independent UI icons/layers**, not just a physically linked chain: one entrance (position + opacity)
  copied to every layer, each offset a consistent frame-distance after the previous one, ordered by the items' position
  on screen (emoji row, option list, icon row).

## STE_PROCEDURE
1. Before animating followers, make the leader independent of its parent's rotation if needed (decouple), and switch a rigged chain to FK (IK/FK blend 10 → 0; break the connection so it holds no keys).
2. Pose the rest shape first: one smooth curve continuing the line of flow from base to tip.
3. Key the leader straight ahead, letting it lag the body (source: head translate Y ≈ 0 @2 while the body drops, ≈ −29/−30 @7).
4. Add rotation lag the same way (head rotate X key @5 tilting up as the body drops; same value @18).
5. **Hand-posed route:** key all chain controls every 3 frames (0, 3, …, 21); on each key rotate the base first, then the next link, then the next — never out of order.
6. Make the base lead and each further link lag more (base down while tip still up; tip catches up ~3 frames later).
7. Check each pose in a second view (top); side-to-side (rotate Y) follows the same rule (base ~−1, outer links more; dial back to ~−4 if too strong).
8. If a link "hits a wall" (stops dead in space), push its rotation further so the motion continues through.
9. **Curve-offset route:** copy the leader's curve to the first follower; offset so its first key ≈ −1 and reduce its deepest keys.
10. Paste the same curve to the next link and shift all its keys +1 frame (30 fps); paste to the last link, reduce amplitude, shift +2 frames.
11. Before playing a loop, confirm Cycles (pre/post infinity) is on for every shifted curve, or the seam gaps.
12. Copy frame 0's pose to the loop end (26) to close a cycle.
13. Scrub the last span; where interpolation blends straight (21 → 26 lost the drag), add a key 2 frames in (23) and re-pose.
14. Before finishing, play and check the chain still reads heavy; reduce lag/offset if it flops.
15. (from Shape Morphing Apple UI) For a row of independent UI icons (not a physical chain): give every layer the
    same entrance (e.g. drop in + fade), then shift each layer's keys one consistent frame-distance after the
    previous one, in the icons' on-screen order; enable the layer's own motion-blur toggle so the staggered drops
    carry blur consistent with the rest of the scene.
16. (from Smooth UI Animation) For a UI cascade: key one Transform (position + opacity 0→100 over 1 s, eased, graph
    shaped), copy it to every other layer, and offset each by 2–3 f (≈30 fps) "to add overlapping"; order depth
    layers by their on-screen position (top→bottom / near→far).

## VALUES BY SOURCE
| parameter | Drag chain (Maya) | Overlap cascade (Maya) | Shape Morphing (Apple UI) | Smooth UI (AE) | recommended for Style D (+ why) |
|---|---|---|---|---|---|
| key spacing | every 3 f (0–21), close @26, fix @23 | leader keys @0/2/5/7, mirrored @13/15/18/20 | — | position+opacity keyed @0 and @1 s | key only the lead; derive links by offset |
| per-link delay | tip ~3 f behind base | 0, +1, +2 f @30 fps | "one key frame distance" per layer (by eye) | 2–3 f @~30 fps | 0, 2, 4 f @60 fps (= source), max ~4 f — more reads as jelly; 3–4 f @30 fps / 6–8 f @60 fps for UI rows |
| amplitude falloff | by eye, "keep muscle" | reduced deepest keys on outer links | — | — | gain 1.0 / 0.85 / 0.7 … (~) |
| side-to-side | rot Y ~−1, dial ~−4 | n/a | n/a | n/a | n/a (objects) |
| posing method | straight ahead, link by link | copy/paste/shift curve | copy entrance to each layer, shift by on-screen order | copy Transform effect, offset per layer | curve offset (procedural, rebuildable); `<Stagger each={3..4}>` / `spring({ frame: f - i*k })` for UI rows |
| applies to | physical chain/tail | physical chain/stack | independent UI icon row (no physical link) | UI element cascade (independent layers) | same stagger idiom covers both physical chains and independent UI rows |
| motion blur | n/a | n/a | native per-layer toggle, no plugin | — | raea: short directional blur track on moving frames, matching the episode's shutter angle |
| end behaviour | tip catches up | loop | holds (reveal, no loop) | holds (reveal, no loop) | tip catches up and HOLDS (no settle oscillation) |

## AGENT_EXECUTION
### Source tool (Maya)
- Tail FK/IK: attribute "fk ik blend" 10 = IK → 0 = FK; right-click → Break Connection.
- Channel box rotate Z (side) / rotate Y (top), middle-mouse drag; key all tail controls with S.
- Graph Editor: Insert Key; Edit → Copy/Paste @0; Shift+middle-drag to slide keys in time; Auto Tangent to flatten.

### Blender 5.3 (build)
```python
import bpy
from bpy_extras.anim_utils import action_get_channelbag_for_slot

def fcurves(ob):
    ad = ob.animation_data
    return action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves

def paste_shifted(src_fc, dst_fc, shift, gain=1.0, base=0.0, cyclic=False):
    dst_fc.keyframe_points.clear()
    for kp in src_fc.keyframe_points:
        dst_fc.keyframe_points.insert(kp.co[0] + shift, base + gain * kp.co[1])
    if cyclic:
        m = dst_fc.modifiers.new('CYCLES'); m.mode_before = m.mode_after = 'REPEAT'
    dst_fc.update()

lead = bpy.data.objects["strip_0"]
src = fcurves(lead).find("rotation_euler", index=0)
for i in range(1, 6):                                   # links 1..5
    ob = bpy.data.objects[f"strip_{i}"]
    ob.keyframe_insert("rotation_euler", index=0, frame=0)
    paste_shifted(src, fcurves(ob).find("rotation_euler", index=0), shift=2 * i, gain=1.0 - 0.15 * i)   # ~
```
Alternative bend: a `SIMPLE_DEFORM` modifier (`deform_method='BEND'`) whose `angle` is keyed, with the tip segment's own
delayed copy; or a bone chain / curve with a Hook per segment. Export the baked result to GLB; raea plays it with
`<Model src animation="…">`.

### raea (live; segments nested in Entities so each child composes its parent's rotation)
```tsx
const ease = Easing.bezier(0.65, 0, 0.35, 1);
const bend = (fr: number) => interpolate(fr, [0, 24], [0, 0.35], { easing: ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const link = (i: number, child?: JSX.Element) => (
  <Entity transform={Transform.fromXyz(0, 0, -0.03).withRotation(Quat.fromEuler("XYZ", bend(f - i * 3) / 6, 0, 0))}>
    <Mesh3d name={`strip-${i}`}>…</Mesh3d>{child}
  </Entity>);
// nest: link(0, link(1, link(2, link(3, link(4, link(5))))))

// stacked items (not nested): same lead curve, delayed per index, amplitude falloff
const lead = (fr: number) => interpolate(fr, [0, 18], [0, 0.12], { easing: ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
{[0, 1, 2, 3].map((i) => (
  <Mesh3d key={i} name={`coin-${i}`} transform={Transform.fromXyz(0, i * 0.004 + lead(f - i * 2) * (1 - i * 0.15), 0)}>…</Mesh3d>
))}
// camera aim lag: .lookingAt([hx(f - 4), hy(f - 4), hz(f - 4)]) while the camera position follows hx(f)…
```
Equivalent raea stagger idiom: `spring({ frame: f - i * 4, fps })` (animation.md) — use a high damping (no overshoot).

## NOTES
- Transfers: base-leads chain, link-by-link posing, two-view check, in-between fix key, frame-offset cascade with
  amplitude falloff, "weight not ribbon". Dropped: dinosaur tail/neck/head anatomy, arms/fingers pass.
- Confirmed (Shape Morphing Apple UI, Smooth UI Animation): the same per-item frame-offset idiom covers a row of
  independent UI icons/layers, not only a physically linked chain — widen `use_when` to "or a row of UI icons/options
  revealing in sequence". Style D pick (0/2/4 f @60 fps lead; max ~4 f) unchanged for physical chains; UI rows read
  fine slightly looser (3–4 f @30 fps / 6–8 f @60 fps) since there's no physical mass to oversell.
- Deprecated: `Action.fcurves` → channelbag (5.x).
- Visual gaps: nearly every tail rotation and the reduced neck key heights are by-eye drags; only rot Y "~−1"/"~−4",
  head Y ≈ −29/−30 and the 0/+1/+2 offsets are spoken.
- Rule conflicts: no wobble after the state change — the tip catches up and holds; per-link delay ≤ ~2–4 f @60 fps with
  falloff or it becomes jelly/bounce; figures never animate.
