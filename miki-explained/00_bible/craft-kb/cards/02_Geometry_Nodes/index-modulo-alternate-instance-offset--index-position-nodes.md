---
title: Index node + Modulo — offset every Nth instance so an interlocking grid fits
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/If You're Learning Blender, You Should Be Using This Node!.txt"
source_time: "02:27–04:39"
tool_target: raea
tier: full
use_when: "building a hex/brick/interlocking grid of hero props (jars, coins, tiles) that must not sit flush on top of each other"
style_fit: "A clean procedural way to build interlocking fields — fits Style D's tidy geometric backgrounds for a 'many of the same item' beat; in raea it is a deterministic row-offset computed once in the array, not a per-frame effect."
---

## METADATA
02_Geometry_Nodes | Blender 3.x–5.x Geometry Nodes | Index + Math(Modulo) → Set Position [Offset] → raea array offset

## CREATIVE_INTENT
Index knows the numerical position of every instance in its sequence. Feeding it through a Math node set to Modulo
with a value of 2 produces "skip him, use him, skip him, use him…" — true for every other instance. Plugging that
selection into Set Position's [Selection] and offsetting those instances on X alone slots a hexagon grid together
without overlapping copies (every other row shifted half a cell), instead of hand-placing each hexagon.

## STE_PROCEDURE
1. Build the instanced grid first (video: Grid + Instance on Points + a beveled 6-vertex cylinder rotated 90° for a
   hexagon prop).
2. Plug Index [Index] → Math(Modulo) [Value]; set the Modulo divisor to 2 (every other instance) or any N for a
   different repeat.
3. Plug Modulo [Value] → the mover node's [Selection] (Boolean implicit from non-zero/zero).
4. Add a Set Position node after Instance on Points; plug the selection in; offset on X only (Combine XYZ → X) by
   half the hexagon's horizontal pitch so the selected row nests into the gaps of the unselected row.
5. Check the result forms one continuous interlocking field with no gaps or overlaps.

## AGENT_EXECUTION
In raea, bake the interlocking offset into the placement array once — it is a fixed pattern, not something computed
per frame.
```tsx
const COLS = 8, ROWS = 6, PITCH_X = 0.3, PITCH_Z = 0.26;
const HEX = Array.from({ length: COLS * ROWS }, (_, idx) => {
  const col = idx % COLS, row = Math.floor(idx / COLS);
  const offset = (idx % 2 === 0) ? PITCH_X * 0.5 : 0;        // "Index + Modulo 2" — every other instance shifted
  return { x: col * PITCH_X + offset, z: row * PITCH_Z };
});
{HEX.map((p, i) => (
  <Model key={i} src={staticFile("hex_tile.glb")} transform={Transform.fromXyz(p.x, 0, p.z)} />
))}
```
For N > 2 (e.g. every 3rd instance offset further), swap `idx % 2` for `idx % N` and scale the offset accordingly.

### Worked example
Topic: "Kedai madu susun 48 botol heksagon: berapa RM untung sebulan?" (illustrative count/price).
BEFORE: `| 3 | "48 botol madu" | grid of bottles in straight rows | count ticks up | — |` — reads as a flat spreadsheet grid.
AFTER: `| 3 | "48 botol madu susun heksagon" | bottles nested in an interlocking hex grid (alternate rows offset half a
cell), camera flies low across the field | count ticks up as camera passes each row | index-modulo-alternate-instance-offset--index-position-nodes |`

### Check
- Do alternating instances (or every Nth) sit offset, with no row sitting flush on top of another?
- Is the offset exactly half the pitch (or the correct fraction for N), not an eyeballed guess?
- Does the field read as one tidy interlocking pattern, not a messy overlap?

## NOTES
- Visual gaps: the exact hexagon pitch/scale values are set by eye in the video, not stated as numbers.
- Dropped: Patreon upsell segment.
- Rule conflicts: none.
