---
title: Bevel tool (Ctrl+B edge / Shift+Ctrl+B vertex) — operator panel settings, maximum width, custom profile (stairs)
bucket: 03_Modeling_Modifiers
source: "The Trick that will Make Your 3D Models 10X Better!.txt"
source_time: "05:22–08:23"
blender_version_source: 4.x
tool_target: Blender bpy
tier: full
style_fit: Supports Style D hero modeling — exact per-edge control of the highlight lines the top light picks out.
---

## METADATA
03_Modeling_Modifiers | 4.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
The interactive Bevel tool is how you place one bevel exactly where the object needs it, with every setting adjustable in the Adjust Last Operation panel until you close it. Know which settings matter (width, segments, shape, clamp overlap, miters) and the physical limit on width.

## STE_PROCEDURE
1. Select an edge and press Ctrl+B for an edge bevel; select a vertex and press Shift+Ctrl+B for a vertex bevel.
2. Open the Adjust Last Operation panel (bottom-left) rather than memorising the modal shortcuts.
3. Confirm Affect = Edges or Vertices matches the intent.
4. Leave Width Type = Offset.
5. Set Width for the bevel size.
6. Set Segments for smoothness (see bevel-segments-even-count--manual-bevels).
7. Leave Shape = 0.5 for a perfectly round profile; lower is concave, higher is convex.
8. Set Material Index if the bevel face should get another material automatically (-1 = keep).
9. Enable Harden Normals to match bevel normals to the adjacent faces.
10. Enable Clamp Overlap to stop overlapping faces at high widths.
11. Leave Loop Slide on (prefers sliding along adjacent edges over even width).
12. Enable Mark Seams / Mark Sharp if the bevel should be a UV seam or shading-sharp edge.
13. Set Outer and Inner Miter (see bevel-miter-inner-outer--manual-bevels).
14. Leave Intersection Type and Face Strength at default unless needed.
15. For stepped edges, set Profile Type = Custom and choose the Steps preset.
16. Know the maximum width: the new edges may not pass the existing neighbouring edges; past that the bevel overlaps.

## AGENT_EXECUTION
```python
import bpy
# edge bevel on the current edge selection (Edit Mode)
bpy.ops.mesh.bevel(
    affect='EDGES',              # 'VERTICES' = Shift+Ctrl+B
    offset_type='OFFSET',        # Width Type
    offset=0.003,                # ~ Width (macro scale)
    segments=2,
    profile=0.5,                 # Shape
    material=-1,                 # Material Index (-1 keeps)
    harden_normals=False,
    clamp_overlap=True,
    loop_slide=True,
    mark_seam=False, mark_sharp=False,
    miter_outer='ARC', miter_inner='SHARP',
    vmesh_method='ADJ',          # Intersection Type: 'ADJ' (Grid Fill) | 'CUTOFF'
    face_strength_mode='NONE',
    profile_type='SUPERELLIPSE', # 'CUSTOM' for a custom profile
)

# custom stepped profile (stairs)
prof = bpy.context.scene.tool_settings.custom_bevel_profile_preset
prof.preset = 'STEPS'                      # ~ presets: LINE, SUPPORTS, CORNICE, CROWN, STEPS
prof.reset_view()
bpy.ops.mesh.bevel(affect='EDGES', offset=0.02, segments=8, profile_type='CUSTOM', clamp_overlap=True)  # ~ values
```
raea: no equivalent (bevels are mesh edits done before GLB export). Manifold `crossSection.offset(d, {join: "round" | "bevel"})` rounds/chamfers the corners of a 2D outline before `.extrude()` — the closest code-side equivalent for simple extruded props.

## NOTES
- Harden Normals needs smooth shading; in 4.1+ there is no Auto Smooth toggle to enable first (pre-4.1 it required `use_auto_smooth`).
- "Loop Slide off" = even-width edges, "a more spaced out version" per the video.
- Visual gaps: the modal shortcut legend and the stairs result are on screen only; `~` values above are not from the video.
- Rule conflicts: none.
