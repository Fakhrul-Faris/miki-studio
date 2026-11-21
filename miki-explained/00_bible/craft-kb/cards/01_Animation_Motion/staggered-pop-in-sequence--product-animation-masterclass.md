---
title: Staggered appearance order (hero first, supporting objects offset, "pop pop pop")
bucket: 01_Animation_Motion
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "1:20:51–1:27:16"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Staging hierarchy for "multiply" beats — hero arrives first, others follow on a rhythm; damp each arrival per house rules.
---

## METADATA
01_Animation_Motion | Blender 4.3 | Blender bpy + raea

## CREATIVE_INTENT
Objects that "do not have the main-character focus" arrive later than the hero, one after another, laid out in a zig-zag
("lightning bolt") so the eye travels across the frame. Re-using the same curve with offsets keeps them a family.

## STE_PROCEDURE
1. Finish the hero's arrival first (scale in done by frame 15).
2. Place secondary A (right, closer to camera) and key its arrival end at frame 24, its start (scale 0) at frame 9 — same 15-frame length.
3. Place secondary B (left, behind) in a zig-zag layout; key its end at frame 31, start at frame 16.
4. Shape each Scale curve with the same fast-start/overshoot handles as the hero.
5. Tilt secondaries so their modelled top is visible; light under-lit ones with a light-linked fill (see light-linking card).
6. Play back; offsets ~7 frames read as a rhythm.

## AGENT_EXECUTION
- Blender: loop objects with an index offset:
```python
for i, ob in enumerate([hero, a, b]):
    start = [0, 9, 16][i]; end = start + 15
    ob.scale = (1,1,1); ob.keyframe_insert("scale", frame=end)
    ob.scale = (0,0,0); ob.keyframe_insert("scale", frame=start)
```
- raea: stagger from the index:
```tsx
{ITEMS.map((it, i) => { const t0 = [0, 9, 16][i] / 24 * fps;
  const s = interpolate(f, [t0, t0 + 0.6*fps], [0.001, 1], { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
  return <Entity key={it.name} name={it.name} transform={Transform.fromXyz(...it.p).withScale(s)}><Model src={it.src} /></Entity>; })}
```

## NOTES
- Deprecated: none.
- Visual gaps: positions are placed by eye.
- Rule conflicts: keep each arrival ≥0.4 s and with no rebound; one saturated accent only on the object the line is about — the
  others stay neutral.
