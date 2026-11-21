---
title: DIY softbox — a Translucent BSDF plane parented just in front of an area light
bucket: 04_Shading_Lighting
source: "The Power of LIGHTING in Blender!.txt"
source_time: "06:32–07:05"
blender_version_source: 3.2+
tool_target: Blender bpy | raea
tier: full
style_fit: Soft key with soft reflections for glossy heroes; in raea, soft = RectLight / large spot radius.
---

## METADATA
04_Shading_Lighting | any | Blender bpy + Shader nodes → raea RectLight / SpotLight radius

## CREATIVE_INTENT
Area lights give harsh reflections on shiny objects. Making the light bigger just makes bigger sharp reflections. A diffuser plane in front scatters the light like a real softbox: softer light and softer reflections.

## STE_PROCEDURE
1. Reset the area light’s location (Alt+G) to work at origin.
2. Add a plane slightly below (in front of) the area light, same size or a bit larger.
3. Parent the plane to the light (select plane, then light, Ctrl+P › Object).
4. Replace the plane’s Principled BSDF with Translucent BSDF (Shift+S node swap in Node Wrangler).
5. Move the light back into position; the plane follows.

## AGENT_EXECUTION
```python
import bpy
light = bpy.data.objects["Key"]
bpy.ops.mesh.primitive_plane_add(size=light.data.size * 1.1); diff = bpy.context.object
diff.parent = light; diff.matrix_parent_inverse.identity(); diff.location = (0, 0, -0.05)   # just in front along -Z
m = bpy.data.materials.new("Diffuser"); m.use_nodes = True; N, L = m.node_tree.nodes, m.node_tree.links
N.remove(N["Principled BSDF"]); t = N.new("ShaderNodeBsdfTranslucent")
L.new(t.outputs["BSDF"], N["Material Output"].inputs["Surface"]); diff.data.materials.append(m)
```
raea: `<RectLight transform intensity width height>` is already a soft panel (no shadows); pair it with a `<SpotLight radius={0.5} soft_shadows_enabled shadow_maps_enabled>` at the same spot for soft shadows (BlendShot pattern). Reflection shape on glossy surfaces comes from `<Environment>` (studio HDRI with softboxes).

## NOTES
- Deprecated: none (Cycles; EEVEE Next handles translucency differently — check).
- Visual gaps: none.
- Rule conflicts: none.

## ADDENDUM — Modern Lighting Techniques in Blender
Alternate method for the same soft-key goal, no diffuser plane or extra geometry needed: add a point/spot light,
aim it at a slight diagonal onto the subject; raise Power first (still harsh at this point); narrow the Spot Size
so the spot condenses onto just the intended area; then raise the light's own **Radius** until the condensed
spot's shadow turns soft ("bring that radius up until it's nice and soft"). Use this card's diffuser-plane method
when the light source itself must stay large/visible or must soften *reflections* on a glossy hero (the plane
physically softens what's reflected); use this Radius+Spot-Size route when only the shadow/falloff needs to soften
and the object isn't glossy enough for reflection shape to matter — faster, no extra geometry. Exact final Radius
value is by eye, not stated as a number.

