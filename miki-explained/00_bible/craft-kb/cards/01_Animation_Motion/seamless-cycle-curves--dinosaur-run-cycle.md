---
title: Seamless cycle curves (matched end keys, infinity cycle, smooth seam tangents)
bucket: 01_Animation_Motion
source: "Animation Masterclass- How to Create a Dinosaur Run Cycle in Maya.txt"
source_time: "10:56–11:27, 16:00–17:33, 31:50–32:19, 1:35:46–1:36:25"
blender_version_source: n/a (Maya)
tool_target: principle-only
tier: principle
style_fit: Serves looping object motion (a coin that keeps turning, a fan, a ticking counter, an idle hover under a held shot); run-cycle body content dropped — figures never cycle in our films.
---

## METADATA
01_Animation_Motion | n/a (Maya source; Blender 4.2+ / raea translation) | principle-only

## CREATIVE_INTENT
Principle: a loop only reads as continuous when the last frame equals the first frame AND the curve's slope is the same on both sides of the seam; a flat (ease) tangent at the seam makes the motion slow down and speed up again each loop — a visible "hiccup" or hump.
Ideas for us: any object that repeats a motion while a shot holds (a rotating ring, a gauge needle hunting, a QR code pulsing, a turning gear inside an x-ray) — loop it without a seam stutter so the viewer never notices the repeat.

## STE_PROCEDURE
1. Set the scene rate before keying (source: 30 fps; our finals export at 60 fps — double frame counts).
2. Choose a cycle length (source: 26 frames at 30 fps ≈ 0.87 s); key the start pose on frame 0.
3. Copy the start pose to the last frame (frame 26) so both ends match exactly.
4. Set every curve's pre-infinity and post-infinity to Cycle so the loop is visible beyond the range.
5. Inspect each curve across the seam; if both end keys are flat (ease in and ease out), rotate their tangents so the slope continues through the seam.
6. Where the motion should accelerate into a key (not ease), break the tangent and raise the incoming handle toward linear.
7. Before playing back the loop, exclude the duplicated last frame from the playback range (play 0–25), or the matched pose holds for one frame.
8. For mirrored half-cycles, copy a value from the first half to the matching key of the second half and invert its sign (e.g. rotate Z −1.021 at frame 5 → +1.021 at frame 18).

## AGENT_EXECUTION
### Source tool (Maya)
- Graph Editor → Curves → Pre Infinity → Cycle; Curves → Post Infinity → Cycle; View → Infinity (to display).
- Tangents: select key → Break Tangents → drag one handle; Auto Tangent to re-flatten a handle that went straight; Linear Tangent for no ease.
- Timeline 0–26; key all controls via a quick-select set "all" (AnimBot) before posing.

### Blender / raea translation
Blender 4.2+ (in 4.4+/5.0 F-Curves live in the action's channelbag):
```python
import bpy
def fcurves(obj):
    ad = obj.animation_data
    try:  # Blender 4.4+ slotted actions (only path in 5.0)
        from bpy_extras.anim_utils import action_get_channelbag_for_slot
        return action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves
    except ImportError:
        return ad.action.fcurves

obj = bpy.context.object
P = 52                                   # 26 @30 fps -> 52 @60 fps
for fc in fcurves(obj):
    first = fc.keyframe_points[0]
    fc.keyframe_points.insert(P, first.co[1])          # matched end key
    m = fc.modifiers.new('CYCLES')       # pre/post infinity = Cycle
    m.mode_before = m.mode_after = 'REPEAT'
    for kp in fc.keyframe_points:        # cycle-aware auto handles smooth the seam (~)
        kp.handle_left_type = kp.handle_right_type = 'AUTO_CLAMPED'
    fc.update()
bpy.context.scene.frame_start, bpy.context.scene.frame_end = 0, P - 1   # drop the duplicate frame
bpy.context.scene.tool_settings.use_keyframe_cycle_aware = True
```
raea (render time; no keys — loop from the frame with a function whose slope is continuous at the seam):
```tsx
const P = 52;                                   // loop length in frames
const t = (((f % P) + P) % P) / P;              // 0..1, wraps exactly
const y = 0.02 * Math.sin(2 * Math.PI * t);      // seamless: value AND slope match at the seam
<Mesh3d name="coin" transform={Transform.fromXyz(0, y, 0).withRotation(Quat.fromEuler("XYZ", 0, 2 * Math.PI * t, 0))}>…</Mesh3d>
```
If the loop is built from `interpolate(t, [0, a, b, 1], [v0, v1, v2, v0], { easing })`, the ease at 0 and 1 creates the same seam hump the video fixes — use a sine/cosine form or linear segments at the seam instead.

## NOTES
- Transfers: matched ends, cycle display, seam-tangent check, dropping the duplicate frame. Dropped: everything about legs, feet and contact poses (character locomotion, conflicts with "figures hold poses").
- Visual gaps: exact tangent-handle angles are dragged by eye in the Graph Editor — unknown (visual only).
- Rule conflicts: a loop is a hold-shot ornament, not a transition; keep amplitude small so it never reads as bounce.
