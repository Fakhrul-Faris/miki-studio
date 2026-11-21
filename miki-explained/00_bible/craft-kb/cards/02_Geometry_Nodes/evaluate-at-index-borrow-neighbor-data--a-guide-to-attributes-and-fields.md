---
title: Evaluate at Index — remap a field by borrowing another element's data
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/A guide to attributes & fields - blender geometry nodes.txt"
source_time: "08:21–09:39"
tool_target: raea
tier: full
use_when: "a kit-piece build needs element N to use element M's data (pairing, mirroring, half-speed indexing, neighbour lookups) within the same domain"
style_fit: "Blender build-only node; no raea node equivalent — result bakes into the GLB's per-instance layout."
---

## METADATA
02_Geometry_Nodes | Blender Geometry Nodes (Evaluate at Index) | Blender build only

## CREATIVE_INTENT
A field normally answers "what is MY value" for each element. **Evaluate at Index** changes the question to "what is
THAT element's value" — it modifies which index a field is read from, so element 3 can be made to show element 0's
position, or every element can show the position of the element at half its own index. This is the mechanism for
borrowing, mirroring or pairing data between elements of the same domain without a second object.

## STE_PROCEDURE
1. Start from a field you want to remap (e.g. Position).
2. Add an **Evaluate at Index** node; plug the field into its value input.
3. Feed its **Index** input a field (e.g. Index node) — this is the lookup key, not the output.
4. Confirm: with a plain Index node wired in unmodified, every element retrieves ITS OWN data — no visible change
   (this is the sanity-check state).
5. To actually remap, modify the index field before it reaches Evaluate at Index (e.g. multiply the Index field by
   0.5 to have each element borrow the data of the element at half its position).
6. Check the Spreadsheet: values should now be duplicated/shifted according to your index math, not one-per-element
   as before.

## AGENT_EXECUTION
**Blender build (kit-piece/scatter remap, bakes to GLB):**
```python
import bpy
N, L = ng.nodes, ng.links
pos = N.new("GeometryNodeInputPosition")
idx = N.new("GeometryNodeInputIndex")
half = N.new("ShaderNodeMath"); half.operation = 'MULTIPLY'; half.inputs[1].default_value = 0.5
L.new(idx.outputs["Index"], half.inputs[0])
ev = N.new("GeometryNodeFieldAtIndex"); ev.data_type = 'FLOAT_VECTOR'  # "Evaluate at Index"
L.new(pos.outputs["Position"], ev.inputs["Value"])
L.new(half.outputs["Value"], ev.inputs["Index"])
```
raea: no equivalent — this is a Blender build-stage remap of which kit-piece instance borrows which element's layout
data before the set is baked.

### Worked example
Topic: "Kenapa setiap dua balang kat rak nampak macam pasangan?" (illustrative — a shelf scatter where every pair of
jars should mirror each other's tilt).
BEFORE: a brief asks for "every second jar matches the one before it," but the builder tries to hand-author it per
instance — tedious and breaks if the scatter count changes.
AFTER (Blender build): Evaluate at Index on the Rotation field, with the Index input built from `floor(index / 2) *
2` (pairs share the even index below them) — every pair of jars now shares one tilt value automatically, confirmed
in the Spreadsheet, regardless of how many jars the scatter produces.

### Check
- Did you verify the "unmodified index = no change" sanity case before trusting your remap math?
- Is the index math (the lookup key) clearly separated from the field being remapped (the value)?
- Does the Spreadsheet show the expected borrowing/pairing pattern, not a flat repeat or a crash on out-of-range index?

## NOTES
- Visual gaps: none — narrated step by step with the Spreadsheet open throughout.
- Rule conflicts: none; pure Blender GN literacy for kit-piece authoring.
