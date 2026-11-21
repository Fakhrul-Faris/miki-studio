---
title: Per-edge manual bevels in a size hierarchy (why every real edge is rounded; cup-lid worked example)
bucket: 03_Modeling_Modifiers
source: "The Trick that will Make Your 3D Models 10X Better!.txt"
source_time: "00:00–02:04, 09:23–12:19"
blender_version_source: 4.x
tool_target: Blender bpy
tier: full
style_fit: Core for Style D — the hero object is seen at macro distance under one soft top light; edges with real, varied bevels are what catch that light and stop the object reading as CG.
---

## METADATA
03_Modeling_Modifiers | 4.x (video) → 4.2+ | Blender bpy

## CREATIVE_INTENT
Nothing in the real world has a perfectly sharp edge, and real objects do not bevel every edge equally: production limits, design choices and wear give each edge its own radius. Bevelling edge by edge, big edges big and small details small, gives the hero object weight, thickness and highlights that a blanket Bevel modifier cannot; use it on any hero model that the camera will hold close.

## STE_PROCEDURE
1. Start from a clean low-poly hard-surface model with good quad topology that will take a Subdivision Surface modifier.
2. Before bevelling, decide each edge's role: main silhouette edges get large bevels, functional details (lips, rims, grooves) get small ones.
3. Select the largest outer edge loop (the top rim of the object).
4. Bevel it with Ctrl+B: large Width, Segments 2, Clamp Overlap on.
5. Select the drinking-lip edge loop; bevel it relatively large but smaller than step 4, Segments 2.
6. Select the outer top rim; give it a larger bevel. Select the inner rim; give it a small bevel.
7. Select the surrounding edge loop plus its connecting edges; give them a small 2-segment bevel.
8. Give the large edge around the body a larger bevel for a smooth read.
9. Select all edges of the back part; give them a very small bevel with Outer Miter = Arc (smoother under subdivision).
10. Finish with one very small bevel on all remaining hard edges, Outer Miter = Sharp, to keep quad topology.
11. Keep Segments at 2 throughout when a Subdivision Surface modifier follows; it does the remaining smoothing.
12. Compare against a Bevel-modifier-only version from the shot camera; keep the manual version if edges read more natural.

## AGENT_EXECUTION
Blender: manual bevels are operator calls on chosen edges; the choice of edges is by eye in the video, so an agent selects them by rule (loop, angle, height) with bmesh and bevels each group with its own width.
```python
import bpy, bmesh, math

obj = bpy.context.active_object
bpy.ops.object.mode_set(mode='EDIT')
me = obj.data
bm = bmesh.from_edit_mesh(me)

def bevel_group(edges, width, segments=2, miter_outer='ARC', miter_inner='SHARP'):
    """One manual bevel pass on a group of edges (Ctrl+B equivalent)."""
    bmesh.ops.bevel(bm, geom=list(edges), offset=width, offset_type='OFFSET',
                    segments=segments, profile=0.5, affect='EDGES',
                    clamp_overlap=True, loop_slide=True,
                    miter_outer=miter_outer, miter_inner=miter_inner,
                    harden_normals=False)
    bmesh.update_edit_mesh(me)

# Example selection rules (replace with the object's real edge roles):
zmax = max(v.co.z for v in bm.verts)
top_rim  = [e for e in bm.edges if all(abs(v.co.z - zmax) < 1e-4 for v in e.verts) and not e.is_boundary]
bevel_group(top_rim, width=0.004)          # ~ largest bevel (macro object ~10 cm); video: "big bevel, two segments"

bm.edges.ensure_lookup_table()
hard = [e for e in bm.edges if e.is_manifold and e.calc_face_angle(0) > math.radians(30)]
bevel_group(hard, width=0.0006, miter_outer='SHARP')   # ~ final very small pass, sharp outer miter for quads

bpy.ops.object.mode_set(mode='OBJECT')
sub = obj.modifiers.new("Subdivision", 'SUBSURF'); sub.levels = 2; sub.render_levels = 2
bpy.ops.object.shade_smooth()
```
- Interactive equivalent of one pass: `bpy.ops.mesh.bevel(offset_type='OFFSET', offset=0.004, segments=2, profile=0.5, affect='EDGES', clamp_overlap=True, miter_outer='ARC', miter_inner='SHARP')` on the current edge selection.
- Export: subdivision + bevels must be in the GLB — `bpy.ops.export_scene.gltf(..., export_apply=True)` (blend2raea already does this).

raea: no equivalent for per-edge bevels (geometry is fixed when it reaches raea). Manifold `roundedBox(w, h, d, r)` or `.minkowski(manifold.sphere(r))` rounds **every** edge by one radius — the blanket look this card argues against; use it only for background props. The hero comes in as `<Model src={staticFile("hero.glb")} />`; bevels show under a raking key (`SpotLight` / `DirectionalLight`, lights.md) and with `perceptual_roughness` ≈ 0.3–0.5 so the rounded edges carry a highlight line.

## NOTES
- Widths in the video are relative ("big", "relatively large but still quite small", "very small"); absolute values above are `~` for a ~10 cm object.
- Deprecated: none in the video's workflow. Pre-4.1, smooth shading of bevelled hard surface often relied on Auto Smooth (`mesh.use_auto_smooth`); 4.1+ removed it — use Shade Smooth / Shade Auto Smooth (a modifier node group) instead.
- Visual gaps: which exact edges belong to each pass on the cup lid is shown, not described; the rules in the code are a starting point.
- Rule conflicts: none.
