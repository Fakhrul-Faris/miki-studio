---
title: Stepped Interpolation modifier for a handcrafted stop-motion feel
bucket: 01_Animation_Motion
source: "Motion Feel, Easing & Camera Choreography/Mastering Blender Graph Editor.txt"
source_time: "20:50–21:46, 24:51–25:05 (default-interpolation preference), 21:46–22:14 (stack order)"
blender_version_source: 4.3 (unstated; workflow unchanged across 3.x–5.x)
tool_target: Blender bpy | raea
tier: full
use_when: "a hero object's held-shot motion should read as deliberate, handcrafted claymation rather than smooth CG — e.g. an object flip, a counter tick, a pose-to-pose state change"
style_fit: "Opt-in look, not default: Style D's normal language is smooth eased motion with events on the word. Use stepped feel only when a shot is explicitly going for a handcrafted/claymation beat (e.g. a counter 'thunking' up one digit at a time), never on camera moves (house rule: camera moves stay eased, never stepped)."
---

## METADATA
01_Animation_Motion | Blender 4.3 | Blender bpy (F-curve "Stepped Interpolation" modifier + Cycles modifier) + raea (frame-floor function)

## CREATIVE_INTENT
Adding a Stepped Interpolation modifier on top of already-keyed, eased curves holds each value for N frames before
jumping to the next, "like it was a constant interpolation" sampled from the real curve underneath — "it adds this
kind of handcrafted look." Step Size 2 takes a 24 fps animation and makes it read like 12 fps (half-rate, classic
stop-motion/hand-drawn feel); Step Size 10 reads as one pose change per 10 frames. The bezier curve underneath is
untouched, so the easing shape still controls *which* value gets sampled at each step.

## STE_PROCEDURE
1. Finish keying and easing the motion normally (bezier handles, anticipation, overshoot) first.
2. Select the channel(s) to feel "stepped"; open the Graph Editor Sidebar (`N`) › Modifiers.
3. Add Modifier › Stepped Interpolation.
4. Set **Step Size** = 2 for a half-rate (24→12 fps-equivalent) handcrafted feel; raise it (e.g. 10) for a slower,
   chunkier pose-to-pose feel.
5. If this object will also get new key frames while the modifier is active, first set Preferences › Animation ›
   F-Curves › Default Interpolation to **Constant**, so newly inserted keys don't fight the stepped look with their
   own eased segments.
6. If this channel also carries a Cycles (loop) modifier, add Cycles **first**, Stepped Interpolation **second** —
   modifier order matters, and Cycles-then-Stepped is the order that produces a clean stepped loop.
7. Play back and confirm the hold reads as a deliberate frame, not a stutter (if it dies too early, the underlying
   bezier curve needs a longer/flatter tail — see graph-editor-free-handle-easing).

## AGENT_EXECUTION
**Shot-list → State change cell:** "stepped feel, step = 2" on any setup that should read handcrafted.

Blender:
```python
fc = ob.animation_data.action.fcurves.find("rotation_euler", index=0)   # after shaping bezier easing
m = fc.modifiers.new('STEPPED'); m.step_size = 2.0   # 2 = half-rate stop-motion; 10 = slow pose-to-pose
# Preferences, not per-curve: bpy.context.preferences.edit.keyframe_new_interpolation_type = 'CONSTANT'
```
raea: Stepped Interpolation samples a continuous eased curve at a coarser rate — do the same by flooring the frame
before evaluating `interpolate`:
```tsx
const stepSize = 2;                                   // ~ match the Blender Step Size
const sampledFrame = Math.floor(f / stepSize) * stepSize;
const rot = interpolate(sampledFrame, [a, b], [from, to], { easing: Easing.bezier(0.65, 0, 0.35, 1) });
```
Render = play, since `sampledFrame` is a pure function of `f`.

### Worked example
Topic: "Berapa untung kedai basuh kereta bila 1 kereta = RM15?" (illustrative).
BEFORE: `| 7 | "lima belas kereta" | counter ticks RM15→RM225 smoothly over 1 s | counter animates | — |`
AFTER: `| 7 | "lima belas kereta" | counter ticks RM15→RM225 in stepped, hand-thunked jumps (step = 2 @ 60 fps) | each
jump lands on a coin-drop sound cue | stepped-interpolation-stop-motion-feel |`

### Check
- Is the stepped feel used only where a shot is deliberately going for a handcrafted/claymation beat, never on camera moves?
- Is there still a real eased bezier curve underneath (so the *values* sampled still have weight/anticipation), not a flat linear ramp?
- If this channel also loops (Cycles modifier), is Cycles below Stepped Interpolation in the stack?
- Does the step rate stay legible at the final frame rate (step 2 @ 60 fps ≈ 30 fps-equivalent; check it doesn't read as dropped frames/a bug)?

## NOTES
- Visual gaps: none — Step Size and the preference toggle are both named and shown on screen.
- Rule conflicts: ⚠ house rule keeps camera moves eased, never stepped, and caps overshoot at 3–5%; Stepped
  Interpolation is for a held hero object's *state-change* motion only, and the underlying bezier curve (not the
  modifier) still carries whatever anticipation/overshoot the shot needs.
- The "set default interpolation to Constant" preference (24:51–25:05) is a workflow convenience for this technique,
  not a separate technique — included as a procedure step rather than its own card.
