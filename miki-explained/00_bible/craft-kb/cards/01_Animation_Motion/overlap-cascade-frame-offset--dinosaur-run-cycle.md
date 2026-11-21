---
title: Overlap cascade — the same curve shifted 1–2 frames per link down a chain
bucket: 01_Animation_Motion
source: "Animation Masterclass- How to Create a Dinosaur Run Cycle in Maya.txt"
source_time: "50:32–53:29, 55:27–58:47"
blender_version_source: n/a (Maya)
tool_target: principle-only
tier: principle
style_fit: Fits Style D object morphs and multiplies (a row of coins, receipt lines, stacked cards following one lead move) and camera-to-subject lag; keep offsets small so it reads as flow, not wobble.
---

## METADATA
01_Animation_Motion | n/a (Maya source; Blender 4.2+ / raea translation) | principle-only

## CREATIVE_INTENT
Principle: drag and overlap — followers repeat the leader's motion slightly later and slightly smaller; shifting one copied curve forward 1 frame, then 2, down a chain gives successive overlap almost for free. Too much offset reads floppy; keep it "with muscle".
Ideas for us: coins in a stack lifting one after another; receipt lines settling in a ripple; a group of price tags following the lead tag's tilt; the camera's aim point lagging the hero by a few frames on a flight so the move feels physical.

## STE_PROCEDURE
1. Before animating followers, make the leader independent of its parent's rotation if needed (see the decouple card).
2. Key the leader straight ahead: let it lag the body — head translate Y at frame 2 ≈ 0 (still up while the body drops), frame 7 ≈ −29/−30.
3. Copy the half-cycle values to the mirrored half (frame 13 = frame 0, frame 15 = frame 2, frame 20 = frame 7).
4. Add rotation lag the same way (head rotate X key at frame 5 tilting up as the body drops; same value at frame 18).
5. Copy the leader's translate Y curve to the first follower (neck base); offset it so the first key ≈ −1 and reduce the deepest keys (frames 7 and 20).
6. Paste the same curve to the next link (neck mid) and shift all its keys +1 frame.
7. Paste to the last link (neck top), reduce amplitude, and shift all its keys +2 frames.
8. Before playing, confirm pre/post infinity is Cycle on every shifted curve, or the shifted keys leave a gap at the loop seam.

## AGENT_EXECUTION
### Source tool (Maya)
- Graph Editor: right-click curve → Insert Key at chosen frames; Edit → Copy / Paste on frame 0; Shift + middle-mouse drag to slide keys in time; Auto Tangent to flatten.
- Offsets used: neck base 0, neck mid +1 frame, neck top +2 frames (30 fps).

### Blender / raea translation
Blender:
```python
def paste_shifted(src_fc, dst_fc, shift, gain=1.0, base=0.0):
    dst_fc.keyframe_points.clear()
    for kp in src_fc.keyframe_points:
        dst_fc.keyframe_points.insert(kp.co[0] + shift, base + gain * kp.co[1])
    m = dst_fc.modifiers.new('CYCLES'); m.mode_before = m.mode_after = 'REPEAT'
    dst_fc.update()
# links: shift 0, 2, 4 frames at 60 fps (= 0, 1, 2 at 30 fps), gain 1.0, 0.8, 0.6 (~)
```
raea (one function, delayed per index — same as `spring({ frame: f - i * 4, fps })` staggering in the raea skill):
```tsx
const lead = (fr: number) => interpolate(fr, [0, 18], [0, 0.12], { easing: Easing.bezier(0.65, 0, 0.35, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
{[0, 1, 2, 3].map((i) => (
  <Mesh3d key={i} name={`coin-${i}`} transform={Transform.fromXyz(0, i * 0.004 + lead(f - i * 2) * (1 - i * 0.15), 0)}>…</Mesh3d>
))}
// camera aim lag: .lookingAt([hx(f - 4), hy(f - 4), hz(f - 4)]) while the camera position follows hx(f)…
```

## NOTES
- Transfers: frame-offset cascade, amplitude falloff down the chain, "not floppy" limit. Dropped: neck/head anatomy.
- Visual gaps: the exact reduced key heights on neck links are dragged by eye — unknown (visual only).
- Rule conflicts: keep per-link delay ≤ ~2–4 frames at 60 fps and amplitude falloff, or it becomes jelly/bounce.
