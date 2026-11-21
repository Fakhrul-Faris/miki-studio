---
title: One-shot ripple on contact — vertex-bevel dense centre + Wave modifier
bucket: 03_Modeling_Modifiers
source: "How to Make Perfect Product Animations in Blender.txt"
source_time: "19:02–21:08, 23:52–24:36"
blender_version_source: 4.x (~4.4)
tool_target: Blender bpy
tier: full
style_fit: good — a physical consequence on the word (contact → ripple); the ripple fades out rather than popping
---

## METADATA
03_Modeling_Modifiers | Blender 4.4 (source), 4.2+/5.x code | Blender bpy + raea (baked)

## CREATIVE_INTENT
When the product lands or connects, a single ring ripple spreads across the floor and dies away — a satisfying "click" beat. Dense geometry is needed only around the contact point, so bevel the centre vertex into rings instead of subdividing the whole huge plane.

## STE_PROCEDURE
1. Subdivide the floor plane once (one centre vertex).
2. Select the centre vertex; Bevel Vertices (Ctrl Shift B / Ctrl B then V).
3. Set Bevel Profile Shape 0.2; drag the width out to cover the area around the product.
4. Set Bevel Segments 100, then 300 if the wave is jagged.
5. Before you add the Wave modifier, apply Scale (Ctrl A → Scale) or the wave distorts.
6. Add modifier Deform → Wave.
7. Set Height 0.21 m.
8. Uncheck Cyclic so one wave travels and ends.
9. Under Time, set Offset to the contact frame (59) so the wave starts on contact.
10. Key Height at ~contact+20 frames; at ~contact+30 set Height 0 and key it, so the wave fades out.
11. Slide those two keys until the fade looks right.

## AGENT_EXECUTION
```python
import bpy, bmesh
fl = bpy.data.objects["Water"]
bpy.context.view_layer.objects.active = fl
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)   # step 5
bm = bmesh.new(); bm.from_mesh(fl.data)
bmesh.ops.subdivide_edges(bm, edges=bm.edges[:], cuts=1, use_grid_fill=True)
centre = min(bm.verts, key=lambda v: v.co.length)
bmesh.ops.bevel(bm, geom=[centre], offset=0.45, offset_type='PERCENT',      # ~ width visual only
                segments=300, profile=0.2, affect='VERTICES')
bm.to_mesh(fl.data); bm.free()
w = fl.modifiers.new("Wave", 'WAVE')
w.height = 0.21; w.use_cyclic = False; w.time_offset = 59
CONTACT = 59
w.keyframe_insert("height", frame=CONTACT + 20)       # ~ source moved these keys "further down"
w.height = 0.0; w.keyframe_insert("height", frame=CONTACT + 30)
```
Wave also exposes `width`, `narrowness`, `speed`, `falloff_radius`, `damping_time`, `lifetime` (source leaves defaults).

raea: no equivalent for a modifier deform (a part's shape is fixed; only transform/material animate). Options: (a) bake in Blender — Object → Shape Keys from the evaluated mesh every N frames, export GLB, drive with `<Model morphs={{ ripple_10: w }}>` (morph targets are supported); (b) fake with a ring: a flat `Torus` (`major_radius` growing via transform scale, emissive/alpha fading) lying on the floor — an expanding light ring, not displacement.

## NOTES
- Deprecated: none.
- Visual gaps: bevel width and the final key frames were tuned by eye.
- Rule conflicts: none; the decaying height is the fade-out.
- Contact frame 59 comes from the descent animation (see slow-descent-then-connect card).
