---
title: Seamless loops with the Cycles F-modifier
bucket: 01_Animation_Motion
type: master
members:
  - cards/01_Animation_Motion/cycles-fmodifier-repeat-with-offset--car-animation.md
  - cards/01_Animation_Motion/seamless-cycle-curves--dinosaur-run-cycle.md
  - cards/01_Animation_Motion/shape-key-cyclic-wing-flap--renders-instantly-cooler.md
sources: ["Making a Car Animation in Blender!.txt", "Animation Masterclass- How to Create a Dinosaur Run Cycle in Maya.txt", "6 Tips to Make Your Renders Instantly Cooler.txt", "Blender Finally Did It!!.txt", "Mastering Blender Graph Editor.txt"]
use_when: "spinning coin, turning fan, looping flap or idle cycle under a held shot"
style_fit: Hold-shot ornament only (spin, fan, gauge, lid breathing) with small amplitude so it never reads as bounce; never on human figures (pose-only rule); linear only for continuous spin, everything else keeps eased Bezier keys.
---

## METADATA
01_Animation_Motion | Blender 3.x/4.x + Maya (sources) → Blender 5.3 (slotted actions) + raea | Blender bpy (F-curve Cycles modifier, shape keys) + raea frame functions

## CREATIVE_INTENT
Shared why: anything that keeps moving while a shot holds (a coin turning, a fan, a gauge needle, a lid breathing) should be
keyed once and repeat forever, and the repeat must be invisible — matched end values AND matched slope across the seam.
- Car animation: one 0→360° linear key pair + Cycles "Repeat with Offset" = endless accumulating spin (wheels, turntable).
- Dinosaur run cycle (Maya): seam rules — last key = first key, slope continuous through the seam (flat ease tangents cause a
  hiccup), drop the duplicate last frame from playback, mirror half-cycles by sign inversion.
- Renders Instantly Cooler: a shape key keyed 0→1→0 + Make Cyclic = cheap looping state change; vary period per copy so
  duplicates read as individuals; Cycles modifiers don't export to glTF — bake or drive in raea.

## STE_PROCEDURE
1. Set the scene frame rate before keying (our finals export at 60 fps — double any 30 fps frame counts).
2. Choose the loop length (dinosaur: 26 f @30 fps ≈ 0.87 s; wing flap: 40 f; wheel: one turn per ~24 f, tie to travel).
3. **Continuous spin:** key rotation 0° at frame 1 and 360° at the loop end; before adding the modifier set both keys to Linear.
4. **Spin:** add Modifier › Cycles to the rotation F-curve; set After (and Before) Mode = Repeat with Offset so each turn accumulates.
5. **Oscillation / state loop:** key the start pose on frame 0; copy it to the last frame so both ends match exactly.
6. **Shape-key loop:** add Basis, add a second key, edit the extreme pose; key Value 0 @0, 1 @20, 0 @40.
7. Add the Cycles modifier with Before/After Mode = Repeat (Graph Editor: Shift+E › Make Cyclic; Maya: Pre/Post Infinity = Cycle).
8. Inspect each curve across the seam; if both end keys are flat (ease in + ease out), rotate their tangents so the slope continues (or use cycle-aware Auto Clamped handles).
9. Where motion should accelerate into a key, break the tangent and raise the incoming handle toward linear.
10. For mirrored half-cycles, copy a first-half value to the matching second-half key and invert its sign (e.g. rot Z −1.021 @5 → +1.021 @18).
11. Before playing back, exclude the duplicated last frame from the playback range (0–25 for a 26 f loop) or the pose holds one frame.
12. Duplicate the looping object; on each copy change the period or add a second shape-key cycle so copies differ.
13. Before glTF export, bake the cycled curve over the shot's range (Cycles modifiers are not exported) — or drive the loop in raea instead.
14. (from blender-finally-did-it) For a looping *procedural noise pattern* rather than a keyed curve: lock the noise
    scale and Color Ramp gaps first, then duplicate the whole Position → Vector Math → Noise Texture chain with the
    duplicate's position offset shifted, and crossfade original → duplicate with a Mix node whose Factor is keyed
    0 @0 → 1 @25 → 0 at loop end, Linear interpolation (required). In raea: compute the same noise field twice with a
    phase offset and `mix` them with a 0→1→0 triangle wave over the loop length (linear) — raea has no Cycles-modifier
    equivalent because it already samples per frame.
15. (from mastering-blender-graph-editor) For a shot that must repeat a *fixed* number of times then stop, set Cycles
    mode to "No Cycles" with an explicit Count instead of an infinite Repeat/Repeat with Offset. Copy the value at
    the end of one cycle and paste it onto a later frame (not the next cycle's start frame) so the object holds
    before repeating, rather than snapping straight into the next loop. When a loop should also read as stop-motion,
    stack the Cycles modifier *first*, Stepped Interpolation *second* on the same channel. Add Cycles to one channel,
    then Copy/Paste F-Modifiers onto the object's other channels instead of re-adding it per channel.

## VALUES BY SOURCE
| parameter | Car animation | Dinosaur run cycle | Renders Instantly Cooler | blender-finally-did-it | mastering-blender-graph-editor | recommended for Style D (+ why) |
|---|---|---|---|---|---|---|
| curve type | rotation, 0→2π | all pose channels | shape-key Value 0→1→0 | Noise Texture sample (procedural field, not an F-curve) | any channel; demoed on a fish-flip pose | spin: rotation; state loop: shape key/morph |
| interpolation | Linear | Bezier, seam tangents continuous | Bezier (eased 0/20/40) | Linear (required for the Mix factor, "otherwise it will not loop") | Stepped Interpolation stacked after Cycles, for a stop-motion read | Linear for spin only; Bezier/sine for everything else (house: no linear stops) |
| Cycles mode | After = Repeat with Offset | Pre/Post = Cycle (Repeat) | Make Cyclic (Repeat) | n/a — crossfade via Mix node, not a Cycles modifier | "No Cycles" + explicit Count (e.g. 3), for a bounded repeat that stops | Repeat with Offset for spin; Repeat for oscillations; bounded Count for a line's "N kali" beat |
| loop length | 24 f (~) | 26 f @30 fps | 40 f | 25 f (Mix factor 0→1→0) | ~32 f cycle + 8 f reset gap pasted further out (fish-flip, `~`) | 52 f @60 fps-ish; long enough to stay calm (≥ ~0.8 s) |
| amplitude | 360° per loop | by eye | full 0→1 | n/a (noise field, not amplitude-keyed) | by eye | small for ornaments (e.g. ±0.02 m hover) — never bounce |
| seam fix | n/a (offset accumulates) | drop duplicate frame; rotate flat tangents | none mentioned | keep both Noise Texture chains identical except the position offset; only the Mix factor animates | copy the end-of-cycle value, paste onto a later frame as a held gap before the next repeat | sine/cosine in raea; cycle-aware handles in Blender |
| variation | duplicate wheels identically | straight-ahead halves vary | vary period per copy | — | — | vary period/phase per copy |

## AGENT_EXECUTION
Blender 5.3 (F-curves live in the slot's channelbag; `Action.fcurves` is gone):
```python
import bpy, math
from bpy_extras.anim_utils import action_get_channelbag_for_slot

def fcurves(id_):                      # works for objects and for Key datablocks (shape keys)
    ad = id_.animation_data
    return action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves

# A) endless spin (car wheels, coin, turntable)
w = bpy.data.objects["Wheel_FL"]
w.rotation_euler.x = 0.0;          w.keyframe_insert("rotation_euler", index=0, frame=1)
w.rotation_euler.x = 2 * math.pi;  w.keyframe_insert("rotation_euler", index=0, frame=24)   # ~ speed
fc = fcurves(w).find("rotation_euler", index=0)
for k in fc.keyframe_points: k.interpolation = 'LINEAR'
m = fc.modifiers.new('CYCLES'); m.mode_before = m.mode_after = 'REPEAT_OFFSET'

# B) seamless oscillation / pose loop (dinosaur seam rules)
obj = bpy.context.object
P = 52                                    # 26 @30 fps -> 52 @60 fps
bpy.context.scene.tool_settings.use_keyframe_cycle_aware = True
for fc in fcurves(obj):
    first = fc.keyframe_points[0]
    fc.keyframe_points.insert(P, first.co[1])                # matched end key
    m = fc.modifiers.new('CYCLES'); m.mode_before = m.mode_after = 'REPEAT'
    for kp in fc.keyframe_points:                            # cycle-aware auto handles smooth the seam (~)
        kp.handle_left_type = kp.handle_right_type = 'AUTO_CLAMPED'
    fc.update()
bpy.context.scene.frame_start, bpy.context.scene.frame_end = 0, P - 1   # drop the duplicate frame

# C) shape-key loop 0 -> 1 -> 0 (lid breathing, receipt curl, wallet flex)
ob = bpy.data.objects["Lid"]
if not ob.data.shape_keys: ob.shape_key_add(name="Basis")
k = ob.shape_key_add(name="Down", from_mix=False)            # pose k.data[i].co by hand / script
for fr, v in ((0, 0.0), (20, 1.0), (40, 0.0)):
    k.value = v; k.keyframe_insert("value", frame=fr)
sk_fc = fcurves(ob.data.shape_keys).find('key_blocks["Down"].value')
sk_fc.modifiers.new('CYCLES')

# glTF: Cycles modifiers are not exported -> sample the animation on export (bakes modifiers over the range)
# bpy.ops.export_scene.gltf(filepath=..., export_force_sampling=True, export_morph=True)
```
Mirrored half-cycle (dinosaur step 10): `fc.keyframe_points.insert(18, -value_at_5)`.

raea (render time — no keys; loop from the frame with value AND slope continuous at the seam):
```tsx
const f = useCurrentFrame(); const { fps } = useVideoConfig();
// spin: endless by construction; for wheels derive from (eased) distance travelled so they never slip
const spin = travelled(f) / wheelRadius;                      // radians
<Mesh3d name="wheel-fl" transform={Transform.fromXyz(...wheelPos).withRotation(Quat.fromEuler("XYZ", spin, 0, 0))}>…</Mesh3d>

// oscillation: sine form is seamless (no ease hump at the seam)
const P = 52;
const t = (((f % P) + P) % P) / P;
const y = 0.02 * Math.sin(2 * Math.PI * t);
<Mesh3d name="coin" transform={Transform.fromXyz(0, y, 0).withRotation(Quat.fromEuler("XYZ", 0, 2 * Math.PI * t, 0))}>…</Mesh3d>

// shape-key loop via morph targets (glTF export with shape keys on)
const w = 0.5 - 0.5 * Math.cos((2 * Math.PI * f) / 40);       // 0→1→0 every 40 frames, eased
<Model src={staticFile("lid.glb")} morphs={{ Down: w }} />
// a baked clip loops by itself: <Model src animation="Loop" time={f / fps} />
```
Do NOT build a loop from `interpolate(t, [0, a, b, 1], [v0, v1, v2, v0], { easing })` — the ease at 0 and 1 is exactly the
seam hump the dinosaur source fixes; use sine/cosine or linear segments at the seam.

## NOTES
- Deprecated: `Action.fcurves` removed in Blender 5.x → `action_get_channelbag_for_slot(action, slot).fcurves` (with
  `animation_data.action_slot`); applies to shape-key actions too (Key datablock's animation_data).
- glTF: F-curve modifiers are not exported; use `export_force_sampling=True` (or Graph Editor › Channel › Bake Channels)
  over the shot range, or compute the loop in raea.
- Maya terms (Pre/Post Infinity = Cycle, Break Tangents, Auto Tangent) map to Blender's Cycles modifier and handle types.
- Visual gaps: dinosaur tangent-handle angles are dragged by eye (unknown); the wing-down mesh edit is visual only.
- Rule conflicts (union): figures hold poses — never cycle/flap/gesture human figures, run-cycle body content dropped;
  linear only for continuous spin, the vehicle/object travel itself must ease in/out (derive spin from eased travel);
  loops are hold-shot ornaments, never transitions; keep amplitude small so nothing reads as bounce.
- blender-finally-did-it: a dual-noise-sample crossfade, not an F-curve cycle — folded here because it solves the
  same "repeat must be invisible" goal for a procedural pattern; see also
  `cards/01_Animation_Motion/mesh-to-volume-grid-noise-scale-reveal--blender-finally-did-it.md` for the reveal it drives.
- mastering-blender-graph-editor: bounded-repeat-with-gap is additionally useful for Style D's "do X exactly N times"
  beats (e.g. "tiga kali" — three flips, then stop), where an infinite Repeat with Offset would be wrong; exact
  pasted-frame numbers (32/40) are from its specific fish-flip shot, treat as `~` starting points. Style D pick
  unchanged by either addendum — both add variants/bounds, no reason to move off the existing picks.
