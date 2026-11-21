---
title: Attribute anatomy (type/domain/name/value) + Store Named Attribute
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/A guide to attributes & fields - blender geometry nodes.txt"
source_time: "00:01–04:12"
tool_target: raea
tier: full
use_when: "briefing a Blender-build-stage GN rig that needs its own custom per-element value (a variant id, a counter digit's slot, a per-instance offset) before deciding how that value should vary"
style_fit: "Blender build-only mental model (GN authoring happens at the modelling/kit-piece stage, result goes out as GLB); no raea node equivalent — see AGENT_EXECUTION."
---

## METADATA
02_Geometry_Nodes | Blender Geometry Nodes (Store Named Attribute, Spreadsheet) | Blender build only

## CREATIVE_INTENT
Every value geometry nodes can hold — a position, a count, a flag — is an attribute, and every attribute has the same
four parts: data type (float, integer, vector, boolean, 4×4 matrix, …), domain (which geometry element it lives on:
point, edge, face, curve control point), name, and value. The Spreadsheet is how you inspect any of this live. Store
Named Attribute is the one node that lets you author a custom attribute by setting those same four parts yourself —
useful whenever a kit-piece or scatter build needs a value Blender doesn't already track (e.g. "which variant is
this instance" or "is this the hero piece").

## STE_PROCEDURE
1. Before adding any node, open the Spreadsheet and confirm which domain (point/edge/face/curve) the value belongs on.
2. Add a **Store Named Attribute** node (not confused with the plain "Store Attribute" — it is always named).
3. Set **Data Type** first (float for a plain number, integer for an id/index, vector for an offset, boolean for a flag).
4. Set **Domain** to match where the value must live (point domain covers mesh vertices, point-cloud points and curve
   control points alike).
5. Give it a **Name** distinct from built-ins (`position`, `radius`, …) so later nodes can find it.
6. Wire the **Value** input (a single value, or a field — see the field-vs-single-value card).
7. Check the Spreadsheet: the new attribute column appears with the name, type and value you set, on every element of
   that domain.

## AGENT_EXECUTION
**Blender build (kit-piece/set-dressing stage, not reusable at runtime — bakes into the GLB):**
```python
import bpy
mod = obj.modifiers.new("KitVariants", 'NODES')
ng = mod.node_group = bpy.data.node_groups.new("KitVariants", 'GeometryNodeTree')
N, L = ng.nodes, ng.links
store = N.new("GeometryNodeStoreNamedAttribute")
store.data_type = 'INT'          # id/index use case
store.domain = 'INSTANCE'        # e.g. one id per scattered kit piece
store.inputs["Name"].default_value = "variant_id"
# Value input wired from an Index field node (see evaluate-at-index / field cards) or a fixed int
```
raea: no equivalent — this is Blender-authoring vocabulary for deciding what data a kit-piece scatter carries before
it is baked to GLB; nothing crosses into the raea TSX scene.

### Worked example
Topic: "Kenapa rak kedai runcit ada pelbagai jenis balang simpanan?" (illustrative — a shelf scatter of storage jars).
BEFORE: one jar model duplicated identically across the shelf — reads as a texture-tiled repeat, not real stock.
AFTER (Blender build): Store Named Attribute, Data Type Integer, Domain Instance, Name `variant_id`, Value = an Index
field — every scattered jar instance now carries its own id, which a later node (see sample-index / evaluate-at-index
cards) reads to pick a different height, label colour or lid for each one before baking the kit to GLB.

### Check
- Did you pick the Spreadsheet domain BEFORE adding the node, not after?
- Is the attribute name distinct from built-ins so downstream nodes can find it by name?
- Does the Spreadsheet confirm the value landed on every element of the chosen domain, not just one?
- Is this strictly a Blender build-stage step (nothing attempted as a raea runtime prop)?

## NOTES
- Visual gaps: none of substance — the whole demo is narrated over the Spreadsheet and node editor together.
- Anonymous (unnamed) attributes are a separate technique — see
  `capture-attribute-freeze-pre-transform-state--a-guide-to-attributes-and-fields.md`.
- Rule conflicts: none against house rules; pure Blender authoring literacy for kit-piece/set-dressing builds.
