---
title: Constant speed while in contact — linear spans inside eased moves, and lock axes that must not move
bucket: 01_Animation_Motion
source: "Animation Masterclass- How to Create a Dinosaur Run Cycle in Maya.txt"
source_time: "36:38–39:09, 1:40:25–1:42:25"
blender_version_source: n/a (Maya)
tool_target: principle-only
tier: principle
style_fit: "conflict (partial): our camera moves start and stop eased; linear is only for the middle of a span where something rides a surface (conveyor, a coin rolling, a scrolling list) — never a linear start/stop."
---

## METADATA
01_Animation_Motion | n/a (Maya source; Blender 4.2+ / raea translation) | principle-only

## CREATIVE_INTENT
Principle: while a part is in contact with the ground (or with a moving surface), its travel must be linear — any slow-in/slow-out there shows up as jitter or sliding once the whole thing travels; axes that physically cannot move while loaded (side-to-side of a planted foot) must hold the exact same value.
Ideas for us: an item riding a checkout conveyor, a rolling coin whose spin matches its travel, a card sliding along a counter in contact; a phone lying on a table must not drift on X while the camera flies.

## STE_PROCEDURE
1. Identify the span where the part is in contact (source: foot planted frames 0–7 and 23–26).
2. Set the travel channel (translate Z) to linear tangents across that span; break the tangent at the span's end key and make only the contact-side handle linear.
3. Delete keys inside the span that would bend the line (frame 3 key removed).
4. Before moving on, nudge the end key value so the two linear spans line up as one straight line through the seam (frame 23 moved up).
5. Copy the contact value of every locked axis to all keys in the contact span (translate X frame 0 → frames 3 and 7; frame 26 → frame 23).
6. Off contact, ease freely; smooth the transition key next to the lock (frame 20 raised).

## AGENT_EXECUTION
### Source tool (Maya)
- Graph Editor: select key → Linear Tangent; Break Tangents → set one side Linear.
- Copy a value: select key, Ctrl+C in the value field, select target keys, Ctrl+V.

### Blender / raea translation
Blender:
```python
fc = action_fcurve  # e.g. location index 1 of the conveyor item (4.4+/5.0: from the channelbag)
for kp in fc.keyframe_points:
    if c0 <= kp.co[0] < c1:          # contact span
        kp.interpolation = 'LINEAR'
# lock an axis: same value on every key of the span
for kp in lock_fc.keyframe_points:
    if c0 <= kp.co[0] <= c1: kp.co[1] = lock_value
lock_fc.update()
```
raea (eased start, linear middle, eased stop — piecewise, slopes matched by hand):
```tsx
const v = 0.15;                                   // m per second on the belt
const t = f / fps;
const x = t < 0.5 ? v * t * t / (2 * 0.5)         // accelerate over 0.5 s (quadratic: ends at speed v)
        : v * (t - 0.25);                          // constant speed, continuous with the ramp
<Mesh3d name="item" transform={Transform.fromXyz(x, 0, 0)}>…</Mesh3d>
// rolling without slip: rotation angle = x / radius
```

## NOTES
- Transfers: linear contact spans, one straight line across the seam, locked axes. Dropped: foot-plant animation itself.
- Visual gaps: how far frame 23 was moved is by eye.
- Rule conflicts: camera moves keep eased in/out ends (rule); linear only inside a span and only for contact travel.
