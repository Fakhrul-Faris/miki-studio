---
title: Chained Multiply Matrices — transform order is non-commutative, so sequence the moves deliberately
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/Demystifying Geometry Nodes The Ultimate Guide to Mastering Blender's Procedural Power.txt"
source_time: "29:25–35:13"
tool_target: raea
tier: principle
use_when: "rigging a multi-step camera flight or a parented prop chain (object on an arm on a base) where 'move then rotate' and 'rotate then move' give different results, and the brief needs one specific result"
style_fit: "Build/rig-logic principle; raea equivalent is simply nesting Transform3d parents in the right order — no new component needed, just sequencing discipline."
---

## METADATA
02_Geometry_Nodes | Blender Geometry Nodes (Multiply Matrices node) | Blender build / raea scene-graph parenting

## CREATIVE_INTENT
Combined Transform Matrix = combined transform. Multiplying two transform matrices chains their operations, but
**A × B ≠ B × A**: "move on Y, then move on Z, then rotate on Y" lands the object somewhere different than "rotate
on Y, then move on Z, then move on Y" — same three operations, different order, different result. This is also why
a parented rig (an arm, then a hand, then a held prop) must walk its transforms link-by-link from the base (world)
frame outward: each child's position is "this joint's matrix × the next joint's matrix", not a single flat offset.

## STE_PROCEDURE
1. List the intended moves in the exact order the brief implies (e.g. "slide the UI card in, then it rotates to
   face camera" ≠ "rotate it, then slide").
2. Build one Combine/Combined Transform matrix per step; chain them with **Multiply Matrices** in that same order
   (left operand = already-applied transforms, right operand = the new step).
3. If the result lands wrong, swap the multiply order first — before touching any single transform's values.
4. For a parented chain (base → arm → prop), treat each parent-to-child step as its own matrix and multiply down
   the chain: `world_from_prop = world_from_base × base_from_arm × arm_from_prop`.
5. Verify in the viewport (or raea preview) with each link isolated before trusting the full chain.

## AGENT_EXECUTION
Blender: `GeometryNodeMultiplyMatrices` chained left-to-right in the exact operation order; swapping two upstream
Combine Transform nodes' positions in the chain re-tests the alternate order without re-deriving values.
```python
m1 = translate_matrix(y=20); m2 = translate_matrix(z=5); m3 = rotate_matrix(axis='Y', deg=45)
result = multiply(multiply(m1, m2), m3)       # order matches the brief: Y-move, then Z-move, then rotate
```
raea: no Multiply Matrices node — the equivalent is nested `Transform3d`/parenting order in the scene graph (a
camera rig on a rail parented under a dolly parented under a crane): author the parent chain in the same
base→outward order the brief implies, and if a move lands wrong, check parenting order before re-tuning any single
transform's numbers.
```tsx
<Transform3d position={[0, 20, 0]}>        {/* step 1: world move */}
  <Transform3d position={[0, 0, 5]}>       {/* step 2: then this move, in the moved frame */}
    <Transform3d rotation={[0, Math.PI / 4, 0]}>  {/* step 3: then this rotate, in that frame */}
      <Camera3d />
    </Transform3d>
  </Transform3d>
</Transform3d>
```

### Worked example
Topic: "Kenapa troli runcit kedai ikut laluan tertentu, bukan terus ke rak?" (illustrative shot staging, not a
real logistics claim).
BEFORE: a camera-flight shot-list row just says "camera flies to the shelf" — ambiguous order if the flight both
orbits and pushes in.
AFTER: `| 3 | "troli ikut laluan" | camera: parent under a rail (world move along aisle), THEN rotate to face the
shelf, THEN push in 0.6 m — in that order, so it arrives facing the shelf, not mid-turn | — | chained-matrix-
multiply-order-matters--demystifying-geometry-nodes |`

### Check
- Is the move order in the shot-list row the same order the brief/line implies (not just whatever felt natural)?
- If a chained move landed wrong, was the fix "swap the order" before "re-tune the numbers"?
- For a parented rig, does each link's transform read as relative to its own parent, not world space?

## NOTES
- Visual gaps: none — the video demonstrates both orders side by side on screen.
- Rule conflict: none; this is rig/camera-chain logic, not a visible effect on its own.
