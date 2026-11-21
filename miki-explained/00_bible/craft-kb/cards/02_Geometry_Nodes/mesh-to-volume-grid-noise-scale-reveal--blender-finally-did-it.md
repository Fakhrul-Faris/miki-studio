---
title: Mesh to Volume → Distribute Points in Volume (grid) for an even instance field, scaled in/out by animated noise
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/Blender Finally Did It!!.txt"
source_time: "03:41–08:30"
blender_version_source: 5.2
tool_target: raea
tier: full
use_when: "a solid block/slab needs to read as 'made of many small identical pieces' that erode/reveal in a noise-driven pattern (a wall of tiles dissolving into place, a counter made of coins)"
style_fit: "A clean way to fill a solid shape with an even instance grid rather than a surface scatter; the noise-driven scale gives an organic reveal that still reads as one tidy object at macro distance, matching Style D's object-state-change beats."
---

## METADATA
02_Geometry_Nodes | Blender 5.2+ (Distribute Points in Volume "Grid" mode) | Mesh to Volume → Distribute Points in Volume → Instance on Points → Noise/Color Ramp [Scale] → raea baked GLB + shader-equivalent scale array

## CREATIVE_INTENT
Distribute Points on Faces only scatters across a surface; Mesh to Volume followed by Distribute Points in Volume set
to "Grid" mode (instead of Random) fills the *solid interior* of a shape with a perfectly even 3D grid of points —
density controlled by one very sensitive number (the grid cell size). Instancing a small beveled cube on those points
turns a solid block into "made of many little cubes". Driving each instance's Scale with a Noise Texture through a
Color Ramp (white = full scale, black = scaled to ~0) then makes patches of the block erode away or reform, which
reads as a material/reveal effect rather than random disappearing.

## STE_PROCEDURE
1. Build or shape the base mesh however wide/tall/deep the final field should be (video: a cube scaled wide/flat).
2. Add Mesh to Volume, then Distribute Points in Volume; switch its Mode from Random to Grid.
3. Tune the Grid density value: very sensitive — around 0.1–0.2 is usable; much smaller crashes the computer; start
   around 0.14 and adjust by eye.
4. Add Instance on Points; instance a small beveled cube (see `gn-bevel-node-double-bevel-wireframe`); scale the
   instance down until the individual pieces read as "small units", not full-size duplicates of the source mesh.
5. Add a Noise Texture → Color Ramp chain; plug Color Ramp [Color] into Instance on Points [Scale] (white keeps full
   scale, black shrinks toward 0 — a value of exactly 1.0 is "full scale").
6. Tune the Color Ramp stops: pull them apart for a harsher on/off threshold, or keep them close for a soft gradient
   of partial sizes.
7. Design rule: leave large flat, un-eroded sections alongside the noisy "eaten-through" areas — flat sections are
   what let the key light cast a clean, readable highlight across the piece; a field that's noisy everywhere reads busy.
8. To animate the erosion, feed the Noise Texture's Vector from a Position node run through Vector Math (Add) with an
   animated offset, so the noise pattern itself travels through the block over time.

## AGENT_EXECUTION
Bake the final grid/noise-eroded shape in Blender for a static hero; for a shot that must *animate* the erosion live,
reconstruct the same 0–1 noise-driven scale per instance per frame in raea (deterministic noise, not per-frame random).
```tsx
// simple 3D value-noise stand-in; replace with a baked noise texture lookup for production
const noise3 = (x: number, y: number, z: number) => {
  const s = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
  return ((s % 1) + 1) % 1;
};
const GRID = []; // build once: evenly spaced points filling the block's volume (the "Distribute Points in Volume, Grid" step)
for (let x = 0; x < 10; x++) for (let y = 0; y < 3; y++) for (let z = 0; z < 10; z++)
  GRID.push({ x: x * 0.14 - 0.63, y: y * 0.14, z: z * 0.14 - 0.63 });

const travel = f * 0.01;                          // the animated Position+offset driving the noise through the block
{GRID.map((p, i) => {
  const n = noise3(p.x + travel, p.y, p.z);
  const ramped = n > 0.55 ? 1 : n < 0.3 ? 0 : (n - 0.3) / 0.25;   // Color Ramp equivalent
  return <Mesh3d key={i} name={`unit-${i}`} transform={Transform.fromXyz(p.x, p.y, p.z).withScale(0.06 * ramped)}>…</Mesh3d>;
})}
```
Above a few hundred units, bake the whole shape (including the noise erosion, sampled at the shot's key frames) to a
GLB sequence or a single hero still in Blender rather than looping thousands of `<Mesh3d>` per frame in raea.

### Worked example
Topic: "Stok barang gudang kecil: nampak macam blok, tapi sebenarnya beribu unit kecil." (illustrative).
BEFORE: `| 4 | "beribu unit kecil" | one solid block prop, count overlay | — |` — the "many units" claim isn't shown.
AFTER: `| 4 | "beribu unit kecil" | the block visibly made of a grid of tiny beveled cubes; a noise pattern erodes
across it, flat clean sections beside eaten-through patches, lit by the one top key | erosion travels slowly on the
line, accent only on a counted-out hero unit | mesh-to-volume-grid-noise-scale-reveal--blender-finally-did-it |`

### Check
- Does the field keep a balance of flat (un-eroded) sections next to noisy ones, so the key light reads clean highlights?
- Is the grid genuinely even (volume-filled), not a surface-only scatter?
- Does any animated erosion travel slowly and read as organic, never as random per-frame flicker?

## NOTES
- Visual gaps: the exact Grid density (video settles near 0.14 by trial), Noise Texture scale and Color Ramp stop
  positions are tuned on screen, not given as final numbers.
- Deprecated/new: Distribute Points in Volume's "Grid" mode and the Mesh Bevel node are both new in Blender 5.2.
- Dropped: Patreon upsell segment; the tutorial's own "rain" loop-animation framing (kept here as a general
  erosion/reveal technique instead, since the episode need is a state-change beat, not a background loop).
- Rule conflicts: none if erosion amplitude/speed stays calm (no flicker, no bounce).
