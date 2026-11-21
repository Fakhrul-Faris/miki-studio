---
title: Graph Editor free-handle easing (S-curve, fast-out "friction", slow-in "tired runner")
bucket: 01_Animation_Motion
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "50:34–53:20 (theory), 56:10–59:18 (applied), 1:01:21–1:08:50"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Core of Style D motion feel — eased in-out moves and fast-out/soft-landing slides; keep starts eased (no hard linear start) for camera moves.
---

## METADATA
01_Animation_Motion | Blender 4.3 | Blender bpy (Graph Editor F-curves) + raea `interpolate` easing

## CREATIVE_INTENT
Every move gets a speed story read off the F-curve slope ("the steeper the hill, the faster"): an S-curve (slow–fast–slow) for
a calm transfer like a car leaving a street, joining a highway and parking; a fast-start/long-settle curve for anything pushed
and stopped by friction (a product sliding on a table, a skier); and a slow-start/fast-end curve for a "tired runner" build.
Linear interpolation reads mechanical and cheap; shaping one handle per key gives a professional landing.

## STE_PROCEDURE
1. Key the start and end poses (`I` → Location, Rotation & Scale) in the Timeline first; shape the curves second.
2. Before you edit curves, enable Preferences › Animation › F-Curves › "Only Show Selected Keyframes' Handles" ~ (the video calls it "only show selected curves").
3. In the Graph Editor channel list, lock every channel except the one you shape (padlock); show only that channel.
4. Press `A`, then Numpad `.` (View Selected) to frame the curve.
5. Select the key and set Key › Handle Type › Free (`V` → Free) so each handle moves independently.
6. For a fast start that settles by friction: drag the first key's right handle up steeply; drag the last key's left handle out long and flat.
7. For a slow start that ends fast: keep the first handle flat and long; steepen the last key's left handle.
8. For an S-curve: keep both handles horizontal (Auto Clamped default) and lengthen them equally.
9. Play back; if the move dies too early, drag the last key's left handle further left (longer, flatter tail).
10. When the curve is shaped, unlock all channels so keys can be moved in the Dope Sheet again.

## AGENT_EXECUTION
- Blender (4.2+):
```python
import bpy
from bpy_extras import anim_utils
ob = bpy.context.object
ad = ob.animation_data   # object must already have its location keys
fc = anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves.find("location", index=1)   # Y location
k0, k1 = fc.keyframe_points[0], fc.keyframe_points[-1]
for k in (k0, k1):
    k.interpolation = 'BEZIER'
    k.handle_left_type = k.handle_right_type = 'FREE'
dx = k1.co.x - k0.co.x; dy = k1.co.y - k0.co.y
# fast-out / friction settle: steep exit, long flat landing
k0.handle_right = (k0.co.x + 0.10*dx, k0.co.y + 0.60*dy)   # ~ steep
k1.handle_left  = (k1.co.x - 0.55*dx, k1.co.y)             # ~ long flat tail
fc.update()
```
  Blender 5.x: actions are layered/slotted; reach F-curves via `action.layers[0].strips[0].channelbag(slot).fcurves`
  (or `bpy_extras.anim_utils.action_get_channelbag_for_slot`).
- raea: the same curves are `interpolate(f, [a, b], [from, to], { easing, extrapolateLeft: "clamp", extrapolateRight: "clamp" })`
  with `Easing.bezier(x1, y1, x2, y2)` = the two free handles normalised to the segment:
  - S-curve: `Easing.bezier(0.65, 0, 0.35, 1)` (house in-out).
  - friction slide (fast out, long settle): `Easing.bezier(0.16, 1, 0.3, 1)` or `Easing.out(Easing.poly(4))`.
  - tired runner (slow start, fast end): `Easing.bezier(0.7, 0, 0.84, 0)` ~.
  - material-side keys: `animate={{ base_color: track({0: "#…", 30: "#…"}, "in-out-cubic") }}`.

## NOTES
- Deprecated: none (Graph Editor workflow unchanged 2.8→4.3). In 5.x use the slotted-action API above.
- Visual gaps: exact handle positions are dragged by eye ("like so"); no numeric handle values given. Values above are `~`.
- Rule conflicts: friction curves (instant full speed at frame 0) are fine for an object entering from outside frame; for
  camera moves and objects starting on screen, keep an eased start (in-out), and check the peak speed stays under
  ~130°/s / ~40 m/s.
- bpy fixed for 5.3: action.fcurves → bpy_extras.anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves (slotted actions).

## ADDENDUM — Mastering Blender Graph Editor
Source: "Motion Feel, Easing & Camera Choreography/Mastering Blender Graph Editor.txt", 12:19–15:27, 25:55–28:51.
- Complementary method to handle-shaping two keys: hand-key a real anticipation POSE (e.g. a third key ~frame 15
  dropping down a little, after a start at frame 12) and a real overshoot POSE (a fourth key ~frame 25, exaggerated
  past the rest value, before settling back) — then shape the handles smooth across all four keys with no sharp
  pivots. Use for shots a single two-key bezier S-curve can't express (a flip, a slap-down, a lid snap).
- Diagnose a "dead" stretch by scrubbing frame-by-frame and comparing values directly between adjacent frames (not
  just eyeballing the curve's silhouette); fix by rotating the handle down and pulling it out so the curve spends
  less time flat near the peak.
- Iterate the whole curve against a Motion Path pass once pose-keyed: recalculate the object's Motion Path, compare
  the plotted 3D arc to what it should look like, and re-adjust key values/timing (e.g. nudging an "almost there"
  moment by ±2 frames) as a second refinement pass on top of the initial handle-shaping pass.
- No change to CREATIVE_INTENT, Check or the worked example — additive for multi-keyframe pose-to-pose motion.

## ADDENDUM — Smooth Blender Animations Tutorial
Source: "Motion Feel, Easing & Camera Choreography/Smooth Blender Animations Tutorial.txt" — 00:00–03:37.
- Names "the big three" base shapes explicitly: ease out (scale the end key's incoming handle, smooth ending), ease
  in-out (both ends scaled, reads as a quick whip), ease in (slow start, quick end).
- Duration and easing are separate controls: moving the same eased keys closer together in time keeps the same shape
  but reads much quicker.
- Camera-switch-via-easing recipe (no extra keys, pure handle scaling): scale camera A's first key to almost full
  (slow start held) and A's last key down to almost zero (quick exit); scale B's first key to almost zero (quick
  entry) and B's last key to full (settles) — produces a slow-start/quick-swap/settle feel across the cut. Already
  covered in spirit by `masters/01_Animation_Motion/two-keyframe-camera-move.md`; useful here as a concrete
  near-full/near-zero handle-scaling instruction.
- Third-party tool named: the **Easer** Blender extension (N-panel) applies named presets to selected Graph Editor
  keys — presets named super smooth, overshoot, spring.
- ⚠ Rule conflict: Easer's overshoot and spring presets contradict the house no-bounce/no-spring rule (overshoot
  capped at 3–5% over ≥0.4 s, no bouncy springs) — do not use those two presets for Style D; only super smooth
  (≈ the card's S-curve / `Easing.inOut`) is usable as-is.
