---
title: Geometry Proximity driven by an empty — displacement/scale/rotation that reacts to nearness
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/You Should be Using Proximity in Your Animations (Blender).txt"
source_time: "01:24–04:39, 07:31–09:22, 12:30–13:14"
tool_target: raea
tier: full
use_when: "an object must visibly 'cause' a nearby field to react — a sphere pressing a stack of discs, a hand-height marker lifting a row of coins, a cursor displacing a grid of tiles"
style_fit: "This IS Style D's 'objects react on the word' beat: one moving cause, one reacting field. In raea there are no geometry nodes, so the distance test is computed per frame in TSX against the mover's real transform."
---

## METADATA
02_Geometry_Nodes | Blender 4.2+ Geometry Nodes | Geometry Proximity + Map Range → Set Position/Rotate Instances/Scale → raea per-frame distance falloff

## CREATIVE_INTENT
Geometry Proximity measures the distance from every point in a mesh/instance field to the nearest point of a
reference geometry — in practice, a single point parented to an empty the animator moves. Running that distance
through a Map Range node turns "far = 0, near = 1" into a usable 0–1 control signal with a tunable reach and plateau,
which can then displace, scale or rotate the reacting geometry. Parenting a *visible* hero object (a sphere, a cube)
to the same invisible empty makes it read as the physical cause of the reaction, instead of an abstract value.

## STE_PROCEDURE
1. Add an Empty (Plain Axes — it never renders) to control the system; this is the thing the animator moves.
2. Add a Mesh Line node at Count 1 (a single point) inside the Geometry Nodes tree; plug the empty's [Location] into
   its [Start Location] so the point tracks the empty.
3. Add a Geometry Proximity node (Points or Mesh mode, matching the single-point source); plug the reacting field's
   geometry into [Target Geometry]; plug [Distance] out.
4. Plug Distance into a Combine XYZ (to target one axis, e.g. Z for displacement) or directly into a Scale/Rotation
   input.
5. Add a Map Range node between Distance and the target input; raise From Max to set how big an area reacts; raise
   From Min to create a plateau (a flat "fully reacted" zone close to the empty) rather than a single sharp peak.
6. Plug the result into Set Position [Offset] (displacement), Rotate Instances [Rotation], or Instance on Points
   [Scale] — the same distance signal can drive any of these.
7. Add a visible object (sphere, cube) at the empty's location; select it then the empty; Ctrl+P → Object (Keep
   Transform) so the visible object moves the empty, and the reaction reads as caused by it.
8. Move the empty/visible object through the field and confirm the reaction follows smoothly with no snapping.

## AGENT_EXECUTION
raea has no Geometry Proximity node; compute the same 0–1 falloff per instance per frame from the real distance to the
mover's transform, then feed it the same way (displacement, scale or rotation).
```tsx
const moverX = interpolate(f, [0, 120], [-2, 2], { easing: Easing.linear });   // the "empty"'s own eased travel
const FIELD = Array.from({ length: 12 }, (_, i) => ({ x: i * 0.3 - 1.65 }));
const mapRange = (d: number, fromMax: number, fromMin: number) =>
  Math.max(0, Math.min(1, 1 - (d - fromMin) / (fromMax - fromMin)));          // "From Min/Max" plateau + reach
{FIELD.map((p, i) => {
  const d = Math.abs(p.x - moverX);
  const t = mapRange(d, /* reach */ 0.6, /* plateau */ 0.15);
  return (
    <Mesh3d key={i} name={`disc-${i}`} transform={Transform.fromXyz(p.x, t * 0.2, 0)}>…</Mesh3d>   // displaced on Z/Y by proximity
  );
})}
<Mesh3d name="mover-sphere" transform={Transform.fromXyz(moverX, 0.3, 0)}>…</Mesh3d>   {/* visible "cause", same transform as the empty */}
```

### Worked example
Topic: "Bila mesin kaunter tekan, harga setiap barang di rak terus naik paparan." (illustrative macro state-change).
BEFORE: `| 3 | "harga terus update" | a hand icon pops over each price, one by one | — |` — abrupt, no physical cause.
AFTER: `| 3 | "harga terus update" | a scanner glow sweeps along a shelf; each price tag lifts and lights up only as the
glow nears it, settling behind | lift/light follows the glow's eased travel, small amplitude | geometry-proximity-empty-driven-displacement--proximity-animations |`

### Check
- Does the reaction follow the mover smoothly (plateau + falloff), never snapping on/off?
- Is the visible "cause" object parented/matched to the same transform driving the reaction?
- Is the reaction's amplitude small enough to avoid reading as bounce?

## NOTES
- Visual gaps: exact Map Range From-Min/From-Max values are tuned by eye on screen, not stated as numbers.
- Dropped: the tutorial's seamless 120-frame loop/tiling setup — irrelevant to non-looping episode shots (the source
  itself calls this optional: "if you don't care you can move on").
- Rule conflicts: none; keep the reacting amplitude small (no bounce), and the mover's own travel eased in-out (no
  constant-velocity sweep above the house camera-speed cap if it is camera-attached).
