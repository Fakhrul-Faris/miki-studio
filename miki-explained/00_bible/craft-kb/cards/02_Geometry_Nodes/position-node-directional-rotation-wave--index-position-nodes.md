---
title: Position node (vs Index) drives a directional rotation wave across a grid
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/If You're Learning Blender, You Should Be Using This Node!.txt"
source_time: "05:11–09:08"
tool_target: raea
tier: full
use_when: "a field of identical props (grass of signage, rows of cards, a wall of tiles) needs a wave of rotation that visibly travels in one chosen direction (left-right vs front-back) rather than just 'by order'"
style_fit: "Fits Style D camera-driven reveals over a field of repeated props; the key creative choice (Position vs Index) decides which direction the wave reads as travelling, which must match the camera move."
---

## METADATA
02_Geometry_Nodes | Blender 3.x–5.x Geometry Nodes | Position/Index + Separate XYZ → Rotate Instances → raea per-item phase offset

## CREATIVE_INTENT
Both the Index node and the Position node can drive a rotation gradient across a grid of instances, but they read
differently: Index only knows an instance's place in its *list*, so its wave always "travels" in scan order (the grid's
build order) no matter which axis you rotate on. Position knows the instance's actual X/Y/Z in space, so feeding one
axis of Position (via Separate XYZ) into the rotation lets the wave travel along *that exact axis* — X-position in
makes the wave travel left-to-right, Y-position in makes it travel front-to-back — independent of rotation axis.
Position is the only one of the two that can aim the wave's direction of travel deliberately.

## STE_PROCEDURE
1. Build the instance grid (video: 10×10 Grid, Instance on Points, thin cylinders not touching).
2. Get a Combine XYZ node; plug it into Rotate Instances [Rotation] so one axis (e.g. Z) is driven.
3. Get a Position node; plug a Separate XYZ after it; plug the X output into the Combine XYZ's rotation axis input to
   make the wave travel along world X (the Y output would make it travel along world Y instead).
4. Add a Math(Multiply) node as a strength slider between Position and the rotation input to scale the wave amplitude.
5. Compare: swap the Position node for an Index node feeding the same Combine XYZ slot — confirm the wave now follows
   build order (list sequence) instead of physical direction, and can no longer be redirected by choosing a different
   axis of Position.
6. Pick Position when the wave must travel along a specific physical direction that matches the camera move; pick
   Index only when a simple build-order gradient is acceptable.

## AGENT_EXECUTION
raea has no node graph; translate "Position drives rotation" as reading each instance's own X (or Z) coordinate when
computing its phase, so the eased wave travels along the chosen world axis.
```tsx
const GRID = Array.from({ length: 100 }, (_, i) => ({ x: (i % 10) * 0.3 - 1.35, z: Math.floor(i / 10) * 0.3 - 1.35 }));
const SPEED = 1.2;                                   // wave travel speed, eased overall by the shot's own camera move
{GRID.map((p, i) => {
  const phase = p.x * SPEED - f * 0.05;              // world-X drives the wave — travels left-to-right
  const rotX = 0.3 * Math.sin(phase);                // small amplitude, never full flips (no bounce)
  return <Mesh3d key={i} name={`rod-${i}`} transform={Transform.fromXyz(p.x, 0, p.z).withRotation(Quat.fromEuler("XYZ", rotX, 0, 0))}>…</Mesh3d>;
})}
```
Swap `p.x` for `p.z` to make the wave travel front-to-back instead; swap `p.x` for `i` (the build index) to get the
Index-node equivalent (travels in array order, not physical direction).

### Worked example
Topic: "Kedai tayar susun 50 batang besi: lihat macam ombak bila kita lalu." (illustrative set dressing).
BEFORE: `| 4 | "susunan kemas" | static grid of rods | camera pushes through | — |` — no life in the field.
AFTER: `| 4 | "susunan kemas" | grid of 50 rods; a rotation wave travels left-to-right across the field as the camera
tracks right | wave timed to the camera's own left-to-right push, small amplitude | position-node-directional-rotation-wave--index-position-nodes |`

### Check
- Does the wave visibly travel along one chosen physical axis (not scan order)?
- Does the wave's direction match the camera's own movement direction in that shot?
- Is the rotation amplitude small (no full flips, no bounce) per house rules?

## NOTES
- Visual gaps: exact Multiply ("strength slider") values are scrubbed on screen, not stated.
- Dropped: Patreon upsell segment.
- Rule conflicts: none if amplitude stays small and eased; this is a background/field effect, never applied to a
  posed human figure.
