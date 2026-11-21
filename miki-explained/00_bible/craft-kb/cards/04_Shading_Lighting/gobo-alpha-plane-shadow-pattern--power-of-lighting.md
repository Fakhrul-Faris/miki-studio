---
title: Gobos — an alpha-textured plane in front of a light for patterned shadows (leaves, blinds)
bucket: 04_Shading_Lighting
source: "The Power of LIGHTING in Blender!.txt"
source_time: "04:05–05:04"
blender_version_source: 3.2+
tool_target: Shader nodes | raea
tier: full
style_fit: Window-blind or leaf shadows across the tabletop give the dark room a motivated off-screen world.
---

## METADATA
04_Shading_Lighting | any | Shader nodes → raea shadow-only geometry

## CREATIVE_INTENT
Shapes placed in front of a light carve its shadow: sun through trees, blinds, or any interesting pattern. A gobo add-on also offers animated gobos.

## STE_PROCEDURE
1. Add a plane between the light and the subject (close to the light = softer, close to the subject = sharper).
2. Give it a material with an alpha image (leaves, blinds) → Principled BSDF [Alpha].
3. Ensure the material’s shadow uses alpha (Dithered render method in 4.2+).
4. Hide the plane from camera if in view.
5. Optionally use a gobo add-on for presets and animated versions.

## AGENT_EXECUTION
```python
import bpy
m = bpy.data.materials.new("Gobo"); m.use_nodes = True; N, L = m.node_tree.nodes, m.node_tree.links
img = N.new("ShaderNodeTexImage"); img.image = bpy.data.images.load("//media/gobo_leaves.png")
L.new(img.outputs["Color"], N["Principled BSDF"].inputs["Alpha"]); m.surface_render_method = "DITHERED"
bpy.data.objects["GoboPlane"].visible_camera = False
```
raea: no light cookie. Build the gobo as real geometry: blind slats as Cuboids, leaves as a cut-out mesh (Blender: image → mesh by redrawing outlines, export GLB), then `<Mesh3d shadow="only">`/`<Model>` between a shadow-casting `<SpotLight>` and the set. Soft edges: SpotLight `radius` + `soft_shadows_enabled`. Volumetric shafts through the slats come free with `volumetric` + FogVolume.

## NOTES
- Deprecated: Eevee Legacy Shadow Mode → Render Method.
- Visual gaps: none.
- Rule conflicts: animated gobos must drift slowly; no flicker.

