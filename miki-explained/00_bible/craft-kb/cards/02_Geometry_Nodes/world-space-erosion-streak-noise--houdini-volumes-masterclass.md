---
title: World-space erosion pass with anisotropic (stretched) noise after the fuse
bucket: 02_Geometry_Nodes
source: "Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt"
source_time: "1:46:50–1:49:38"
blender_version_source: n/a (Houdini, Point VOP on the fused mesh)
tool_target: Geometry Nodes
tier: principle
style_fit: Unifies repeated copies with one shared weathering direction (wind/water streaks) — macro surfaces read as one material. Build-time. No conflict.
---

## METADATA
02_Geometry_Nodes | Houdini Point VOP noise on mesh points (source) → Blender GN Set Position + Noise Texture with per-axis scale | Geometry Nodes

## CREATIVE_INTENT
Principle: copies of one rock repeat the same local detail; a final noise in world space, applied to the fused mesh's points
(not the volume), ties them together. Stretching one noise along an axis gives directional "wind erosion" lines. Idea: streaks
down a cliff face, grain along wood, drip lines on concrete.

## STE_PROCEDURE
1. After the fused mesh exists, add a Point VOP and add 3D Noise(P) to P (course: frequency 0.5/0.25 first, amplitude small).
2. Add a second noise: frequency (3, 3, 3), amplitude ~0.6.
3. Add a third fine noise with per-axis frequency (6, 60, 6) — Y stretched — then tune to ~(22 on Y), amplitude ~0.2.
4. Before applying the streak noise, take its input from the original P, not from P already displaced by the other noises, so the streaks stay straight.
5. Sum: P + noiseA + noiseB, then add the streak noise in a separate Add node.

## AGENT_EXECUTION
### Source tool (Houdini)
Point VOP: `P -> Noise (0.5) -> Add`; `P -> Noise (3,3,3, amp 0.6) -> Add`; `P(original) -> Noise (freq 6,60,6 → 6,22,6, amp 0.2) -> Add (separate)` → `Bind Export P`.

### Blender / raea translation
GN (4.2+), on the fused mesh:
`Position -> Vector Math (MULTIPLY, (6, 22, 6))` → `Noise Texture (3D, Scale 1, Detail 2) [Color]` → `Vector Math (SUBTRACT, 0.5)` → `Vector Math (SCALE, 0.02~)` = streak offset.
`Position -> Noise Texture (Scale 3) [Color] - 0.5 -> SCALE 0.06~` = break-up offset.
`Vector Math (ADD) both -> Set Position [Offset]`. Feeding the raw `Position` (not the displaced one) to the streak noise = step 4.
Blender is Z-up: stretch on the Z component for vertical streaks (Houdini's Y).
raea: no runtime displacement; for render-time streaks use a stretched normal map (`normal_map_texture` with `uv_transform={Affine2.fromScale([1, 6])}`) or `WearExtension` `rust` streaks on a painted part.

## NOTES
- Visual gap: final amplitudes after "set it to 0 2" (likely 0.2) are approximate; STT values marked as spoken.
- Heavy mesh (millions of points): run this before decimation.
