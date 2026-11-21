---
title: Sample Index — collapse a field to one value, incl. transfer between two objects
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/A guide to attributes & fields - blender geometry nodes.txt"
source_time: "10:16–11:43"
tool_target: raea
tier: full
use_when: "a kit-piece build needs to drive one object's layout from ANOTHER object's data (e.g. a reference curve's point positions driving a separate instance collection), where the result must be a single value per target element, not a field still tied to the source"
style_fit: "Blender build-only node; no raea node equivalent — the cross-object transfer is baked into the GLB before it ever reaches raea."
---

## METADATA
02_Geometry_Nodes | Blender Geometry Nodes (Sample Index, Collection Info "Separate Children") | Blender build only

## CREATIVE_INTENT
**Sample Index** pulls ONE fixed value out of a field at a given index — its output is a single value (solid noodle),
not a field, which is what makes it able to carry data across a domain boundary a plain field cannot cross: for
example, reading the position of vertex N on one object and using it to set the position of instance N on a
completely different object (brought in via Collection Info with "Separate Children" so each collection member is
its own instance). Without Sample Index, a position field evaluated on the instances would mean the instances' OWN
positions (field context), never the source object's — Sample Index forces a specific, named value across.

## STE_PROCEDURE
1. Identify the SOURCE geometry holding the data you want (e.g. seven vertices with known positions) and the TARGET
   geometry that should receive it (e.g. seven instanced objects from a Collection Info node, "Separate Children" on).
2. On the source, take the field you want to transfer (e.g. Position) into a **Sample Index** node.
3. Feed Sample Index's **Index** input a field from the TARGET's own context (e.g. an Index field evaluated on the
   instances) if each target element should get a different source element's value — otherwise it is a single fixed
   value every target element shares.
4. Wire Sample Index's single-value output into the target's **Set Position** (or other) node.
5. To prove the field-context point: before adding Sample Index, confirm that plugging a Position field straight
   into the target's Set Position does nothing useful (it means "set each instance's position to its own position").
6. Store the index used, named, on the target domain if later nodes need to re-read it (see Store Named Attribute
   card) rather than recomputing it.

## AGENT_EXECUTION
**Blender build (driving one kit collection's layout from a reference object, bakes to GLB):**
```python
import bpy
N, L = ng.nodes, ng.links
src_pos = N.new("GeometryNodeInputPosition")          # evaluated on the SOURCE geometry's points
sample = N.new("GeometryNodeSampleIndex"); sample.data_type = 'FLOAT_VECTOR'; sample.domain = 'POINT'
tgt_idx = N.new("GeometryNodeInputIndex")             # evaluated on the TARGET instances
L.new(src_pos.outputs["Position"], sample.inputs["Value"])
L.new(tgt_idx.outputs["Index"], sample.inputs["Index"])
set_pos = N.new("GeometryNodeSetPosition")
L.new(sample.outputs["Value"], set_pos.inputs["Position"])
```
raea: no equivalent — cross-object attribute transfer is Blender build-stage authoring; the finished per-instance
layout ships as GLB transforms, nothing left to compute in TSX.

### Worked example
Topic: "Kenapa barang kat rak kedai disusun ikut lengkung meja, bukan garis lurus?" (illustrative — a kit scatter of
tins following a reference curve's shape instead of a straight row).
BEFORE: the builder manually places each tin instance to roughly match a curve sketch — breaks the moment the curve
is edited.
AFTER (Blender build): the curve's control-point positions (source) are read with Sample Index, indexed by each tin
instance's own Index field (target, via Collection Info "Separate Children"), and piped into each instance's Set
Position — moving the curve now moves every tin automatically, re-baked once into the kit's GLB.

### Check
- Is the value actually collapsed to a single number per target element (Sample Index output), not still a raw
  field evaluated in the wrong context?
- Did you confirm the naive "plug the field straight across" attempt fails for the stated field-context reason,
  before reaching for Sample Index?
- Is the source/target index relationship (same index, or a remapped one) deliberate, not left to Blender's default?

## NOTES
- Visual gaps: none — the seven-vertex/seven-instance example is fully narrated with the Spreadsheet open.
- Rule conflicts: none; pure Blender GN literacy for kit-piece authoring.
