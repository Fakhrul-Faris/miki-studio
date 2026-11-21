---
title: Three-tier foreground detail (texture plane → medium chunks → fine scatter)
bucket: 03_Modeling_Modifiers
source: "How to get Detailed Foregrounds  Blender Tutorial.txt"
source_time: "00:00–01:51, 05:41–06:07, 10:16–10:36, 17:00–17:07"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Core Style D set-dressing order — the macro surface under the hero object is the "foreground" that fills most of a 9:16 close-up; build it in three tiers in Blender, export GLB, raea renders.
---

## METADATA
03_Modeling_Modifiers | 3.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
The foreground is a small area of the 3D set but a large share of the 2D frame; making only that area rich tricks the eye into believing the whole world is that detailed. Use it on every macro shot: the counter, mat or tray under the hero object gets three layers of detail so the close camera never lands on a flat plane.

## STE_PROCEDURE
1. Isolate the foreground: copy every object from the camera's near zone into an empty scene with the same camera (for review only).
2. Build Layer 1: add a ground plane with a good PBR texture; refine it until it looks right on its own.
3. Do not start Layer 2 until Layer 1 looks finished from the shot camera.
4. Build Layer 2: place medium-size objects (rocks, logs, pillars, pipes, beveled cubes; for us coins, receipts, cards) on and into the plane.
5. Cover as much ground as possible with Layer 2 medium-to-large pieces.
6. Build Layer 3: add the fine details last — scattered small pieces, hand-placed small objects, water, plants (for us crumbs, dust, staples, paper fibres).
7. Work biggest shapes → medium shapes → smallest shapes in every scene, so each step stays easy to control.
8. Light the set after the layers read well in an unlit (flat) view; good detail looks good in most light.

## AGENT_EXECUTION
```python
import bpy
# one collection per tier, so each can be hidden while judging the others
for name in ("FG_L1_ground", "FG_L2_medium", "FG_L3_fine"):
    if name not in bpy.data.collections:
        bpy.context.scene.collection.children.link(bpy.data.collections.new(name))

# Layer 1: ground plane in front of the camera
bpy.ops.mesh.primitive_plane_add(size=0.6)           # ~ macro scale: ~0.6 m counter patch (inferred)
ground = bpy.context.active_object
ground.name = "FG_ground"
# move to collection
for c in ground.users_collection: c.objects.unlink(ground)
bpy.data.collections["FG_L1_ground"].objects.link(ground)

# judge a tier alone: hide the others in the view layer
vl = bpy.context.view_layer.layer_collection.children
vl["FG_L2_medium"].hide_viewport = True
vl["FG_L3_fine"].hide_viewport = True
```
- Layer 1 surface: see `adaptive-subdivision-displacement-ground--detailed-foregrounds` and `noise-roughness-normal-wet-floor--detailed-foregrounds`.
- Layer 2: see `pile-layering-medium-chunks--detailed-foregrounds`.
- Layer 3: see `gn-scatter-fine-debris--detailed-foregrounds`.
- Export: one GLB per set, `bpy.ops.export_scene.gltf(filepath=..., use_selection=False, export_apply=True)`.

raea: renders the exported set with `<Model src={staticFile("set.glb")} position scale />`; shallow depth of field sells the foreground layers — `<DepthOfField focal_distance aperture_f_stops />` inside `<Camera3d>` (2.8 cinematic, 1.4 dreamy), focus on the hero, Layer 3 just in front softening.

## NOTES
- The video's author says his real workflow is less tidy than three named layers; the order (big → medium → small) is the point.
- Values: the video gives no sizes; the 0.6 m plane is our macro scale (`~`).
- Visual gaps: exact placement of every piece is by eye in the viewport; not followable from speech.
- Rule conflicts: none. If tiers enter on a word, grow/fade each piece in over ~0.4 s, never pop.
