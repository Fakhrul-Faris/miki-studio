---
title: Field vs single value, and field context (same expression, different result per domain)
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/A guide to attributes & fields - blender geometry nodes.txt"
source_time: "04:12–07:51"
tool_target: raea
tier: full
use_when: "deciding whether a procedural GN value (the index, a compare result, a noise sample) should vary automatically per element, or must be locked down to one shared number"
style_fit: "Blender build-only mental model (how a kit-piece/scatter rig's internals behave); no raea node equivalent — the finished variation is baked into the GLB."
---

## METADATA
02_Geometry_Nodes | Blender Geometry Nodes (Index node, Compare node, socket shapes) | Blender build only

## CREATIVE_INTENT
A single value (e.g. a plain Integer node set to 4) gets stored identically on every element — a solid noodle, a
circular socket. A **field** is a set of instructions ("use each element's own index") carried on a dashed noodle
into a diamond socket; the node whispers the same instruction to every element in the domain, and each element
answers differently. The same field expression can mean different things depending on **field context** — which
domain it is actually evaluated on (e.g. "index" means a different number depending on whether it's asked of the
vertices or of the scattered instances). Knowing this stops an agent from assuming a GN value is fixed when it is
secretly per-element, or vice-versa.

## STE_PROCEDURE
1. Look at the noodle: solid = single value (one number everywhere); dashed = field (instructions per element).
2. Look at the socket: circle = accepts only a single value; diamond = accepts a field or a single value; a diamond
   with a dot shown = currently holding just one value.
3. To make a value vary per element, feed it a field input node (Index, Position, Normal, …) instead of a constant.
4. To test "what domain is this field actually evaluated on," trace the noodle back to where **Store Named
   Attribute**'s Domain is set, or where the geometry was switched (e.g. instances vs. the points that generated them)
   — that switch point is the field context.
5. Before trusting a field's output, ask explicitly: "on this wire, which domain gives the index/position its
   meaning right now?" Don't assume it is the domain you started with.
6. Build up a field by chaining: a field (Index) → Add/Compare/Multiply node with a constant → the field keeps
   varying per element but the operation is now baked into the instruction.

## AGENT_EXECUTION
**Blender build (kit-piece/scatter logic, bakes to GLB — not a raea runtime concept):**
```python
import bpy
N, L = ng.nodes, ng.links
idx = N.new("GeometryNodeInputIndex")              # field: "use each element's own index"
cmp = N.new("FunctionNodeCompare"); cmp.data_type = 'INT'; cmp.operation = 'EQUAL'
cmp.inputs[3].default_value = 0                    # compares the field against a single value — output stays a field
L.new(idx.outputs["Index"], cmp.inputs[2])
```
raea: no equivalent — this is the authoring-time reasoning for why a kit-piece scatter ends up with N distinct
variants instead of N copies of the same thing once baked.

### Worked example
Topic: "Kenapa setiap lajur resit kedai lain-lain panjang?" (illustrative — a shelf of receipt-roll kit pieces).
BEFORE: a brief says "make every roll slightly shorter than the last," but the builder wires a single fixed Integer
into the height offset — every roll comes out identical because the value was never a field.
AFTER (Blender build): swap the fixed Integer for an **Index** field feeding a Multiply-by-constant node, still a
field all the way into Store Named Attribute on the Instance domain — each roll now gets its own height offset
proportional to its position in the row, confirmed in the Spreadsheet before baking.

### Check
- Is the noodle you're relying on for "per-element variation" actually dashed (a field), not solid?
- Have you named the domain the field is evaluated on, out loud, before trusting its output?
- Does the Spreadsheet show a different value per row, not one repeated number, when variation was the goal?

## NOTES
- Visual gaps: socket shapes (circle vs. diamond, dot-in-diamond) are shown on screen only — described here from the
  narration, not pixel-measured.
- Rule conflicts: none; pure Blender GN literacy.
