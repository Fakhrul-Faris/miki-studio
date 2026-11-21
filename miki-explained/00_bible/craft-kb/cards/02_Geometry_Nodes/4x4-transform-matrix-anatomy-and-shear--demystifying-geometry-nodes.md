---
title: 4×4 transformation matrix anatomy — and shear via its off-diagonal elements
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/Demystifying Geometry Nodes The Ultimate Guide to Mastering Blender's Procedural Power.txt"
source_time: "00:24–13:42"
tool_target: raea
tier: principle
use_when: "briefing a custom procedural rig (Blender build stage) that needs a skew/shear move no Position/Rotation/Scale slider can give — e.g. a shelf of stock leaning as if pushed, or a parallax-layer slant"
style_fit: "Blender build-only technique (no raea node equivalent); translate the result to a baked GLB or, for a live raea shear, a custom Transform matrix in TSX — see AGENT_EXECUTION."
---

## METADATA
02_Geometry_Nodes | Blender Geometry Nodes (Combine Matrix / Transform Geometry, matrix mode) | Blender build only

## CREATIVE_INTENT
A 4×4 transform matrix is the one object that can encode move + rotate + scale + (for rendering only) perspective
warp together, and — uniquely — it can also **shear**, which no combination of plain Position/Rotation/Scale
sockets can do. Use it when a brief literally calls for a skew (a stack of boxes leaning, a flag-like slant) rather
than a straight rotation.

## STE_PROCEDURE
1. Know the matrix's four blocks before touching a node: top-left 3×3 = scale/rotation; top-right 3×1 (row 4 of
   each column) = translation (X, Y, Z); bottom-left 1×3 = perspective warp (render-only, ignored by Transform
   Geometry); bottom-right 1×1 = w (**1** = a point, **0** = a direction).
2. An identity matrix (diagonal **1,1,1,1**, everything else 0) causes no change — start every custom matrix from it.
3. To scale on one axis only, change that axis's diagonal element (e.g. column 1 row 1 = **2** doubles X).
4. To shear, change an **off-diagonal** element in the 3×3 block (e.g. column 1 row 2 = **0.5** → new Y = old Y +
   0.5 × old X): this slants the shape without rotating it uniformly.
5. Build it with the **Combine Matrix** node (one socket per element) → **Transform Geometry** node set to
   **Matrix** mode (not Components).
6. Before shipping, confirm a shear move serves the brief's literal line — don't use it just because it looks cool.

## AGENT_EXECUTION
Blender build (one-off custom rig, not reusable across episodes): wire a `ShaderNodeCombineMatrix`-equivalent
(`FunctionNodeCombineMatrix` in GN) into `GeometryNodeTransformGeometry` with `mode='MATRIX'`; set the shear
element(s) directly or drive one with a Value node for an animatable skew.
```python
import bpy
ng = bpy.data.node_groups["ShearRig"]; N, L = ng.nodes, ng.links
cm = N.new("FunctionNodeCombineMatrix")              # 16 scalar inputs, defaults = identity
cm.inputs[4].default_value = 0.5                      # row2,col1 slot — "~" node index may shift by Blender version
tg = N.new("GeometryNodeTransformGeometry"); tg.mode = 'MATRIX'
L.new(cm.outputs["Matrix"], tg.inputs["Transform"])
```
raea: no native shear prop on `Transform`/`Mesh3d` (position/rotation/scale only). If a shot truly needs shear,
either (a) bake the sheared shape into the GLB at build time (preferred — matches "Blender only builds models"), or
(b) in code, combine a non-uniform scale with a small rotation on the same axis — the video shows this produces a
visually equivalent slant ("you can get the same shearing effect by causing some form of rotation followed by
scaling") when a literal shear matrix isn't exposed.

### Worked example
Topic: "Kenapa rak kedai runcit letak barang senget sikit, bukan lurus?" (illustrative framing, plain visual point).
BEFORE: `| 4 | "barang senget sikit" | shelf rotates 10° | tins tilt | — |` — reads as the whole shelf turning, not a lean.
AFTER: `| 4 | "barang senget sikit" | shelf geometry sheared (Blender build: Combine Matrix row2,col1 = 0.35) so each
tin's base stays put but its top leans right, like a pushed stack; baked to GLB | tins fade in already leaning, 0.4 s | raea: no equivalent, baked in Blender |`

### Check
- Does the brief actually ask for a lean/skew, not a rotation (if it's just "tilted", use Rotation instead — simpler)?
- Is the shear baked in Blender (not attempted as a raea prop)?
- Is the result still plain and readable at phone size (no "flashy" distortion)?

## NOTES
- Visual gaps: none — every matrix slot is shown on screen with its row/column position.
- Rule conflict: none against house rules; this is geometry authoring, not a camera/transition move.
