---
title: Copy Scale with Power (negative power turns one object's growth into another's shrink)
bucket: 01_Animation_Motion
source: "The_Power_of_CONSTRAINTS_in_Blender.md"
source_time: "4:16–5:04"
blender_version_source: 3.x+
tool_target: Blender bpy
tier: principle
style_fit: Links two state changes on a word — one bar grows while another shrinks (savings vs spending), a coin swells as a wallet empties; bake for GLB or reproduce as frame math in raea.
---

## METADATA
01_Animation_Motion | 3.x+ → 4.2+ | Blender bpy → raea transform math

## CREATIVE_INTENT
Principle: Copy Scale copies a target's scale per axis, and its Power slider exponentiates the target's scale change — above 1 exaggerates it, below 1 damps it, negative inverts it, so a target scaling up makes the follower scale down. Idea: an explainer "trade-off" beat — two objects visibly tied, one growing as the other shrinks, from a single animated driver.

## STE_PROCEDURE
Method:
1. Add a Copy Scale constraint to the follower; set Target.
2. Limit the axes to copy if needed; set Influence.
3. Set Power > 1 to amplify, between 0 and 1 to damp, or negative to invert the scale change.
4. Enable Make Uniform to scale all axes evenly.
5. Enable Offset to keep a secondary scale animation on the follower.
How-to:
6. Bake to keyframes before GLB export.

## AGENT_EXECUTION
### Source tool (Blender)
```python
import bpy
spend, save = bpy.data.objects["BarSpend"], bpy.data.objects["BarSave"]
c = save.constraints.new('COPY_SCALE')
c.target = spend
c.use_x = c.use_y = False; c.use_z = True
c.power = -1.0                 # inverse: spend grows → save shrinks (scale^-1)
c.use_make_uniform = False
c.use_offset = False           # True: keep save's own scale animation too
c.use_add = False              # additive vs multiplicative offset
```
Bake: `bpy.ops.nla.bake(..., visual_keying=True, clear_constraints=True, bake_types={'OBJECT'})`.

### Blender / raea translation
```tsx
const s = interpolate(f, [0, 15], [1, 1.6], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
<Mesh3d name="barSpend" transform={Transform.fromXyz(-0.1, 0, 0).withScale([1, s, 1])}>...</Mesh3d>
<Mesh3d name="barSave"  transform={Transform.fromXyz( 0.1, 0, 0).withScale([1, Math.pow(s, -1), 1])}>...</Mesh3d>   {/* power -1 */}
```
Animate scale on the transform, never the shape (animation.md). Scale about the base: offset the y translation by half the height change so bars grow from the floor.

## NOTES
- Author notes Copy Scale is mostly used in rigging (copying bone scale).
- Power's exact math (scale^power) is our reading of "multiply the scale change"; `~`.
- Visual gaps: none.
- Rule conflicts: eased in-out growth over ≥ ~0.4 s; no overshoot/bounce.
