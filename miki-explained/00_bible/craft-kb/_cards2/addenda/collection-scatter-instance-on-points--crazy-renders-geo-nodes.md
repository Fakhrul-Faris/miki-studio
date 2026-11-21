# Addendum → cards/02_Geometry_Nodes/collection-scatter-instance-on-points--crazy-renders-geo-nodes.md
Source: "Procedural Mograph & 3D-to-AI Render Passes/The ONLY Geometry Nodes Tutorial You'll Ever Need!.txt" — 29:41–30:08.

## New VALUES BY SOURCE column/row (only-geometry-nodes-tutorial)
| parameter | crazy-renders-geo-nodes (existing card) | only-geometry-nodes-tutorial (this source) |
|---|---|---|
| Which instance per point | Pick Instance = True → random pick, not separately seeded | Pick Instance = True **plus** a `Random Value (Integer, min/max ~1000)` wired into **Instance on Points → Instance Index**, with its Seed exposed as a single Group Input |
| Purpose | get a random instance per point at all | **reshuffle the whole layout** on demand — one exposed seed slider gives a different complete arrangement without touching density/position |

## Extra step
- After the existing Collection Info → Instance on Points setup (Separate Children, Reset Children, Pick Instance
  all on), add a `Random Value` node set to **Integer**, Min 0, Max ~1000, and plug its output into **Instance on
  Points → Instance Index**. Drag the Random Value's **Seed** input back to Group Input and expose it (e.g. as
  `layout_seed`) so a single slider regenerates which instance lands on every point at once.

## Notes
- This is additive to the master's existing Pick Instance behaviour, not a replacement: Pick Instance still makes
  each point use one object from the collection; the Instance Index random value controls *which* one, globally
  reseedable.
- raea: still no equivalent (bake the chosen seed's result to GLB; raea never re-scatters live).
