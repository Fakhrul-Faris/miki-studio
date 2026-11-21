---
title: Shrink instances to exactly zero at a moving trim point — distance-from-trim scale band, multiply-clamped
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/The ONLY Geometry Nodes Tutorial You'll Ever Need!.txt"
source_time: "20:39–25:54"
tool_target: raea
tier: full
use_when: "instances along a trimmed/animated line (notes on a staff, ticks on a progress route, counters appearing along a growing bar) must shrink to invisible exactly where the line currently ends, with independently tunable band widths at each end — not just fade the whole set uniformly"
style_fit: "This is the mechanism behind a clean 'objects appear one at a time as a line draws in' Style D beat — each instance's scale is tied to its distance from the live trim point, so it never pops, it grows from zero as the line reaches it."
---

## METADATA
02_Geometry_Nodes | Blender Geometry Nodes (Vector Math Distance/Subtract, Map Range, Math Multiply+Clamp) | Geometry Nodes → bake/animate for raea

## CREATIVE_INTENT
Give every instance a stored "where am I along the curve" factor (0→1), then measure the **distance** from that
factor to the current trim-start value: at the trim point the distance is 0 (so scale → 0, the instance vanishes),
and it grows the further an instance sits from the trim. Two such bands (one from trim-start, one from trim-end)
are combined by **multiplying and clamping to 1** — not adding — so the overlapping middle doesn't over-brighten,
and each band's width stays independently controllable.

## STE_PROCEDURE
1. Store each point's position-along-curve as a named Factor attribute (captured before any offset, as in the
   orientation card).
2. **Band 1 (start):** Vector Math **Subtract** (factor − trim-start) → Vector Math **Distance** → gives 0 exactly
   at the trim point, rising away from it.
3. Feed that into **Map Range**, inverted (From Min 0 → To Max 1, From Max 1 → To Min 0) so the instance is tiny at
   the trim and full-size away from it; raise **From Max** above 1 (e.g. 1.4) to widen the "big" band; expose this
   as `expand_start`.
4. **Band 2 (end):** repeat steps 2–3 against trim-end, expose as `expand_end`.
5. **Combine:** Math **Multiply** the two bands together, then **Clamp** to a max of 1 — multiplying (not adding)
   means a point near *either* trim point still shrinks correctly, and clamping stops the un-clamped product from
   exceeding 1 and over-growing the untouched middle.
6. For a wider "big" middle band, multiply again by an `expand_both` value and clamp again.
7. Finish with one un-clamped **Multiply** for an overall `note_scale`/`instance_scale` control (allowed to exceed
   1 deliberately for an emphasis pulse).
8. Plug the final value into **Instance on Points** [Scale].

## AGENT_EXECUTION
```python
def band(factor_attr, trim_value, expand_name):
    sub = N.new("ShaderNodeVectorMath"); sub.operation = 'SUBTRACT'
    L.new(factor_attr, sub.inputs[0]); L.new(trim_value, sub.inputs[1])
    dist = N.new("ShaderNodeVectorMath"); dist.operation = 'DISTANCE'
    L.new(sub.outputs["Vector"], dist.inputs[0])
    mr = N.new("ShaderNodeMapRange")
    mr.inputs["From Min"].default_value = 0; mr.inputs["From Max"].default_value = 1.4   # expose as expand_name
    mr.inputs["To Min"].default_value = 1;   mr.inputs["To Max"].default_value = 0
    L.new(dist.outputs["Value"], mr.inputs["Value"])
    return mr

band_start = band(factor_attr, trim_start, "expand_start")
band_end   = band(factor_attr, trim_end,   "expand_end")
combine = N.new("ShaderNodeMath"); combine.operation = 'MULTIPLY'; combine.use_clamp = True
L.new(band_start.outputs["Result"], combine.inputs[0]); L.new(band_end.outputs["Result"], combine.inputs[1])
overall = N.new("ShaderNodeMath"); overall.operation = 'MULTIPLY'                       # note_scale, unclamped
L.new(combine.outputs["Value"], overall.inputs[0])
L.new(overall.outputs["Value"], instance_on_points.inputs["Scale"])
```
raea: no curve/instance nodes — bake the band-scale math as a precomputed per-instance scale curve (one value per
frame per instance) at build time, or, for a small fixed instance count placed live in TSX, port the same formula
(subtract → distance → remap → multiply-clamp) into a small TS helper driving each `Mesh3d`'s `scale` prop per
frame from the current trim-start/trim-end state.

### Worked example
Topic: "RM50 jimat sebulan jadi RM600 setahun — macam mana ia bertambah?" (illustrative savings build-up).
BEFORE: `| 7 | "bertambah setiap bulan" | 12 coin-stack icons along a bar, all visible from frame 1 | bar grows | — |` — nothing marks "how far the count has gotten".
AFTER: `| 7 | "bertambah setiap bulan" | 12 coin icons along the bar; each coin's scale = distance-from-trim band (multiply-clamped, expand_start 1.4) so coins pop into existence from zero exactly as the bar's trim reaches them | coins grow from zero on each spoken month, never pop | distance-from-trim-value-scale-band--only-geometry-nodes-tutorial |`

### Check
- Do the two bands combine by multiply+clamp, not add (add would over-brighten the overlapping middle)?
- Does each instance reach exactly scale 0 at the live trim point (no instance appears "ahead of" the line)?
- Are `expand_start`/`expand_end`/`expand_both`/overall scale each independently exposed and tunable?

## NOTES
- Visual gaps: the exact `expand_start 1.4` / `expand_end 2.4` values are the creator's own eyeballed tuning
  ("your results might vary") — keep marked `~`, re-tune per asset.
- Rule conflict: none; this mechanism is precisely how to satisfy the house "objects fade/grow in, never pop" rule
  for a multi-instance count-up, rather than a blanket fade on the whole group.
