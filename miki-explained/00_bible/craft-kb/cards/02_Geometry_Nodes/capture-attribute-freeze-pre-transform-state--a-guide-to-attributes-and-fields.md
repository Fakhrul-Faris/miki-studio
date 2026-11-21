---
title: Capture Attribute — freeze an anonymous "before" value for a later node
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/A guide to attributes & fields - blender geometry nodes.txt"
source_time: "12:14–12:40"
tool_target: raea
tier: full
use_when: "a kit-piece build changes a geometry's position/value with one node (noise, offset, jitter) but a later node still needs the ORIGINAL value — e.g. to undo the change, or compare before vs. after"
style_fit: "Blender build-only node; no raea node equivalent — any 'restore original state' logic is resolved at bake time, never in TSX."
---

## METADATA
02_Geometry_Nodes | Blender Geometry Nodes (Capture Attribute) | Blender build only

## CREATIVE_INTENT
Once a node (e.g. Set Position with noise) overwrites position, the ORIGINAL position is gone from that point in the
chain — reading Position again downstream just returns the already-changed value. **Capture Attribute** solves this
by storing a field's value on the geometry at the moment you call it, without giving it a permanent name (an
"anonymous" attribute) — just a field socket you can reconnect later, e.g. to undo a noise offset or compare a
piece's state before vs. after a deformation.

## STE_PROCEDURE
1. Before the node that will change the value (e.g. a noise-driven Set Position), add a **Capture Attribute** node
   on the SAME wire, upstream of the change.
2. Plug the field to preserve (e.g. Position) into Capture Attribute's Value input; leave its name unset (anonymous).
3. Let the geometry continue through the changing node (e.g. Set Position + Noise Texture offset) as normal.
4. Downstream, where the "before" value is needed again, use Capture Attribute's own output field socket directly —
   do not re-read Position (it now returns the changed value).
5. Wire that preserved field into whatever needs it (a second Set Position to revert, a Compare node to measure
   displacement, etc.).

## AGENT_EXECUTION
**Blender build (kit-piece jitter with a revertible/comparable original position, bakes to GLB):**
```python
import bpy
N, L = ng.nodes, ng.links
pos = N.new("GeometryNodeInputPosition")
cap = N.new("GeometryNodeCaptureAttribute"); cap.domain = 'POINT'
cap.capture_items.new('FLOAT_VECTOR', "orig_pos")    # anonymous at the node-tree level; no world-facing name needed
L.new(pos.outputs["Position"], cap.inputs[0])
# ... noise-driven Set Position happens downstream of cap's geometry output ...
# later, to revert: Set Position fed from cap's preserved "orig_pos" output, not a fresh Position node
```
raea: no equivalent — this is purely a Blender build-stage bookkeeping trick; once baked, the GLB only carries the
final chosen state (jittered, reverted, or a comparison result already resolved).

### Worked example
Topic: "Kenapa sikit kotak kat rak nampak senget, tapi label still nampak lurus?" (illustrative — a jittered box kit
where the label decal must stay oriented to the box's ORIGINAL position, not its noise-offset one).
BEFORE: the builder noise-offsets the box positions for a natural scatter look, then tries to align label decals —
but Position now returns the already-jittered value, so decals drift with the noise instead of staying box-true.
AFTER (Blender build): Capture Attribute stores Position before the noise-driven Set Position runs; the decal
placement step reads the captured "orig_pos" field instead of Position, so labels stay correctly anchored to each
box's pre-jitter slot while the boxes themselves still scatter naturally.

### Check
- Is Capture Attribute placed BEFORE the node that changes the value, on the same wire?
- Does any downstream node that needs the "before" state read Capture Attribute's own output, not a fresh read of
  the (now-changed) built-in attribute?
- If the preserved value never needs a name outside this node tree, is it left anonymous (no unnecessary Store
  Named Attribute)?

## NOTES
- Visual gaps: none — the concept and node are named explicitly, though the full worked demo was cut short in the
  source ("writing this video was a lot harder than I expected") — the mechanism itself is stated clearly enough to
  reproduce.
- Rule conflicts: none; pure Blender GN literacy for kit-piece authoring.
