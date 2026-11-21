---
title: Geometry-Nodes Mesh Bevel node — bevel instances natively, double-bevel + Delete Geometry for a wireframe look
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/Blender Finally Did It!!.txt"
source_time: "00:00–03:41"
blender_version_source: 5.2
tool_target: raea
tier: full
use_when: "an instanced prop (a cube, a tile) needs rounded/chamfered edges without leaving Geometry Nodes to bevel it externally first"
style_fit: "Fits our macro-object close-ups where edge quality reads at phone size; the double-bevel-plus-delete trick gives a free wireframe/cage look for a transition or background layer without new geometry."
---

## METADATA
02_Geometry_Nodes | Blender 5.2+ (Mesh Bevel node, new) | Geometry Nodes → bake to GLB → raea Model

## CREATIVE_INTENT
Before Blender 5.2, an instanced object needed its bevel built outside Geometry Nodes (a Bevel modifier applied, then
dragged in). The new Mesh Bevel node bevels inside the node tree itself — Amount, Segments, Shape and Spread as
sockets, with selection inputs (Top Vertex/Face, Edge/Face, Outer Edge, Mid Edge) for which part of the mesh is
beveled. Chaining two Mesh Bevel nodes and then a Delete Geometry node set to the "Outer Edge" selection keeps only
the beveled rim faces, producing a clean wireframe-cage look from a single solid mesh with no separate wire geometry.

## STE_PROCEDURE
1. Add a Cube (or any base mesh) directly inside the Geometry Nodes tree.
2. Add a Mesh Bevel node; plug the cube's geometry through it; for a uniform bevel, feed one Value node into all four
   amount sockets at once (Amount/Segments/Shape/Spread) rather than each one separately.
2a. Segments ≥ 1 for a hard chamfer; raise for a rounded edge. Shape pushes the profile in/out; Spread (labelled
    "miter"/"mitre" in the source, STT "meter"/"mter") can be keyframed for an animated bevel reveal.
3. For the wireframe look: add a second Mesh Bevel node after the first on the same mesh.
4. Add a Delete Geometry node set to Faces; plug the "Outer Edge" selection socket from the bevel chain into it.
5. Compare selections: Top Vertex/Face deletes corners; Edge/Face deletes face centres; Outer Edge (the wireframe
   look) keeps only the beveled rim ring around each original face; Mid Edge's effect is unconfirmed by the source.
6. Use Set Shade Smooth to finish once the final shape/selection is chosen.

## AGENT_EXECUTION
Blender (build step — bake the result, raea has no node graph):
```python
import bpy
ng = bpy.data.node_groups.new("BevelCage", "GeometryNodeTree")
N, L = ng.nodes, ng.links
cube_in = N.new("GeometryNodeMeshCube")
bevel1 = N.new("GeometryNodeMeshBevel")              # Blender 5.2+; verify exact bl_idname per version
amt = N.new("ShaderNodeValue"); amt.outputs[0].default_value = 0.08       # ~ shared Amount
L.new(amt.outputs[0], bevel1.inputs["Amount"])
bevel1.inputs["Segments"].default_value = 3
L.new(cube_in.outputs["Mesh"], bevel1.inputs["Mesh"])
bevel2 = N.new("GeometryNodeMeshBevel"); L.new(bevel1.outputs["Mesh"], bevel2.inputs["Mesh"])
dele = N.new("GeometryNodeDeleteGeometry"); dele.domain = 'FACE'
L.new(bevel2.outputs["Outer Edge"], dele.inputs["Selection"])             # keep only the beveled rim
L.new(bevel2.outputs["Mesh"], dele.inputs["Geometry"])
```
Once the cage shape is final in Blender, export the mesh as a static GLB (Mesh Bevel has no raea equivalent — raea has
no node graph, only meshes/materials at render time).
```tsx
<Model src={staticFile("bevel_cage_prop.glb")} transform={Transform.fromXyz(0, 0, 0)} />
```

### Worked example
Topic: "Kotak hadiah kedai online: bucu dibulatkan untuk nampak premium, bukan kotak kasar." (illustrative).
BEFORE: `| 2 | "kotak kemas" | sharp-edged cube prop, macro | price fades in | — |` — reads cheap/CG at macro distance.
AFTER: `| 2 | "kotak kemas" | same box, edges beveled (3 segments) so highlights wrap softly at macro distance | price
fades in on the beveled rim's highlight | gn-bevel-node-double-bevel-wireframe--blender-finally-did-it |`

### Check
- Do macro-distance edges show a soft rounded highlight, not a razor-sharp CG edge?
- If used for the wireframe-cage look, does Outer Edge selection leave a clean rim with no stray faces?
- Is the final shape baked to a static GLB before import into raea (no procedural dependency at render time)?

## NOTES
- Visual gaps: "meter"/"mter"/"mitre" (Spread) label and the exact Amount/Segments values used in the demo cube are
  shown on screen only, not stated as numbers.
- Deprecated/new: Mesh Bevel inside Geometry Nodes is new in Blender 5.2 — before it, bevels had to be built on a
  separate object with a Bevel modifier and dragged into the node tree as an instance (now unnecessary).
- Dropped: Patreon upsell segment.
- Rule conflicts: none.
