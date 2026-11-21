---
title: Organise exposed Geometry Nodes parameters into named panels with type, range, description and default
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/The ONLY Geometry Nodes Tutorial You'll Ever Need!.txt"
source_time: "06:38–07:30, 31:24–31:48"
tool_target: raea
tier: principle
use_when: "handing off a reusable Blender build (a kit piece, a diagram generator) that another pass — or a future episode — will re-tune without opening the node graph"
style_fit: "Build-stage hand-off hygiene; keeps a procedural asset editable per-episode without re-deriving the node tree each time, matching the 'procedural, endlessly editable' preference."
---

## METADATA
02_Geometry_Nodes | Blender Geometry Nodes (Group Input sockets, N-panel group settings, modifier panels) | Blender build only

## CREATIVE_INTENT
Any value dragged back onto the Group Input node becomes a modifier-panel control, but left as a flat list it gets
unreadable fast. The socket's own settings (type — float/integer/vector/object/colour —, min/max, a text
description, a default value, visibility) plus grouping related sockets into named panels (e.g. "Lines", "Notes")
makes a build genuinely reusable by a future pass without re-opening the node editor.

## STE_PROCEDURE
1. Drag any internal value node's socket backward onto the **Group Input** node to expose it as a modifier input.
2. Select the new socket in the N-panel's **Group** list; set its **type** to match intent (Float for a slider,
   Integer for a count/seed, Vector for XYZ, Object for a swappable prop reference).
3. Set **Min/Max** to the value's real usable range (e.g. a 0–10 spacing, not an unbounded float).
4. Give it a plain-language **description** and a sensible **default value** so a re-user doesn't have to guess.
5. For a single-value socket not meant to be attribute-driven, tick **Single Value** so the modifier panel shows a
   clean field instead of an attribute-toggle box.
6. Group related sockets into a named **panel** (the panel icon in the modifier header) — e.g. all line-related
   controls under "Lines", all note-related controls under "Notes" — and drag sockets into the right panel.
7. Reorder sockets by dragging in the list so the panel reads top-to-bottom in the order someone would actually
   tune them.

## AGENT_EXECUTION
```python
ng.interface.new_socket("line_spacing", in_out='INPUT', socket_type='NodeSocketFloat')
item = ng.interface.items_tree["line_spacing"]
item.min_value, item.max_value, item.default_value = 0.0, 10.0, 0.2
item.description = "Gap between the five staff lines"
panel = ng.interface.new_panel("Lines")
# move the item under the panel in the interface tree (API varies by version; do via N-panel drag if scripting is awkward)
```
raea: no modifier-panel equivalent — a baked GLB carries no exposed parameters at render time. The raea-side
analogue is simply well-named, well-typed TSX props on the component that wraps the `<Model>` (e.g.
`<StaffLines spacing={0.2} noteCount={12} seed={3} />`), documented the same way (sensible defaults, a comment
naming the practical range) so a future episode's pass can re-tune without reading the component's internals.

### Worked example
Internal build note (not a script line): handing off a reusable "counter ticks" kit piece to a future episode.
BEFORE: the kit piece's Blender file has a dozen unlabelled Value nodes buried in the node tree; a future pass has
to open and trace the graph to change the tick count.
AFTER (ASSET-SOURCES.md entry): "`ticks.blend` — exposed params: `tick_count` (Int, 1–30, default 12, 'number of
ticks'), `tick_spacing` (Float, 0–5, default 0.3), `seed` (Int, panel: General). Panel 'Ticks' groups all three."

### Check
- Does every exposed socket have a real min/max (not left at the unbounded default)?
- Is each socket's type correct for what it represents (Integer for counts/seeds, not Float)?
- Are related sockets grouped into a named panel, not a flat unsorted list?
- Is the raea-side component's props documented the same way (default + usable range) in its own file or
  ASSET-SOURCES.md?

## NOTES
- Visual gaps: the exact panel API calls aren't narrated in code, only clicked in the UI — the scripted
  `new_panel`/assignment API may need adjusting per Blender version; doing this step by hand in the UI is the
  safe fallback.
- Rule conflict: none.
