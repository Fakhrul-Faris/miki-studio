---
title: Edge/curvature masks for wear and scratches
bucket: 02_Geometry_Nodes
type: master
members:
  - cards/04_Shading_Lighting/curvature-and-painted-masks--houdini-volumes-masterclass.md
  - cards/02_Geometry_Nodes/edge-angle-attribute-scratch-mask--pro-materials.md
sources: ["Free Masterclass- Developing Complex Details Using Volumes in Houdini.txt", "How to Create PRO Materials in Blender.txt"]
use_when: "worn edges on a metal till, tin or tool in macro"
style_fit: Wear only on edges that stick out (grime in cavities) is the "real object" tell in a macro close-up under one top light; no conflict — bake to maps for raea, or use raea's WearExtension (chips land on sharp curvature) at render time; never accent-colour the wear.
---

## METADATA
02_Geometry_Nodes | Houdini Measure/Color/Paint + Blender 4.x GN (sources) → Blender 5.3 (GN attribute + Cycles bake) → raea maps / WearExtension | Geometry Nodes + Shader nodes

## CREATIVE_INTENT
Shared why: real damage lands where the form sticks out (convex edges) and dirt gathers where it sinks in (cavities); a
curvature/edge mask derived from the mesh adapts to any model, where a "dumb" material scratches everything evenly.
- Houdini Volumes masterclass: Measure › Curvature attribute shows where detail lives (convex vs cavity vs flat); painted
  attributes add art-directed control on flat regions; both drive shaders (moss, cracks, extra displacement) or scattering.
- PRO Materials: store GN Edge Angle [Signed Angle] as a named attribute, read it with an Attribute node as a convex/concave
  mask for scratches into the coat-roughness chain; unlike Pointiness it also works in EEVEE.

## STE_PROCEDURE
1. Before measuring a heavy mesh, cache it (Houdini File Cache; Blender: apply or bake upstream modifiers) so it doesn't recook.
2. Add a Geometry Nodes modifier; insert Store Named Attribute between Group Input and Group Output.
3. Link Edge Angle [Signed Angle] → Store Named Attribute [Value]; Name "edge_angle", data type Float.
4. Remap: Signed Angle is in radians and can exceed 0–1 — add Map Range (From −π…π ~ → 0…1) before storing or in the shader.
5. Alternative curvature proxy: difference of Normal vs Blur Attribute(Normal, Iterations 5) → Store "curv"; or Vertex Paint › Dirty Vertex Colors.
6. Preview the attribute (Houdini: Color › Ramp from Attribute, range 0–1000; Blender: Attribute → Emission in the viewport).
7. Before you use it as a mask, check convex = white, concave = black; invert with Map Range/Color Ramp if needed.
8. In the Shader Editor add an Attribute node with the exact same name.
9. Add a Mix (Color): A = black, B = scratch texture, Factor = Attribute [Fac].
10. Link Mix [Result] into the roughness / coat-roughness chain (and a darkened colour for chips).
11. Paint extra art-directed masks on flat regions (Texture Paint into an image) for where wear/grime should or shouldn't go.
12. For cavities, use Ambient Occlusion [AO] (or Pointiness, Cycles only) → Color Ramp → grime mix.
13. Before GLB export, bake the masked colour/roughness/AO to images with Cycles; plug them into the raea material.
14. Or skip the bake: give the painted part a raea WearExtension (chips on sharp edges, grime low/underneath) with a `seed` per copy.

## VALUES BY SOURCE
| parameter | Houdini Volumes | PRO Materials | recommended for Style D (+ why) |
|---|---|---|---|
| mask source | Measure Curvature (point attr) + Paint | GN Edge Angle [Signed Angle] → named attr | Edge Angle attr (works in EEVEE preview) + AO for cavities |
| preview range | ramp 0–1000 | concave black / convex white check | Map Range −π…π → 0…1 (~) |
| domain | points | Point (~, not stated) | Point (Edge Angle is an edge field; storing on Point averages it — fine for masks) |
| drives | moss in cavities, cracks, displacement, scatter | scratches → Coat Roughness | chips/scratch roughness on edges, grime in cavities |
| painted masks | Paint node on flat areas | — | Texture Paint image where art direction needs it |
| raea delivery | bake to maps | bake ROUGHNESS / WearExtension | bake for hero tills/tins with specific wear; WearExtension amount 0.4–0.6 for supporting props |

## AGENT_EXECUTION
### Source tool (Houdini)
`File Cache` → `Unpack` → `Measure (Type Curvature → curvature)` → `Color (Ramp from Attribute, curvature, 0–1000)`;
`Paint (Cd or custom attr)` → shader import for masked displacement/moss.

### Blender 5.3
```python
import bpy, math
ob = bpy.context.active_object

def sock(socks, name, typ=None):                      # robust across versions (shared-node sockets)
    return next(s for s in socks if s.name == name and (typ is None or s.type == typ))

# GN: store the remapped signed edge angle
mod = ob.modifiers.new("SmartMat", 'NODES')
ng = bpy.data.node_groups.new("SmartMat", 'GeometryNodeTree'); mod.node_group = ng
ng.interface.new_socket("Geometry", in_out='INPUT', socket_type='NodeSocketGeometry')
ng.interface.new_socket("Geometry", in_out='OUTPUT', socket_type='NodeSocketGeometry')
N, L = ng.nodes, ng.links
gi, go = N.new("NodeGroupInput"), N.new("NodeGroupOutput")
ea = N.new("GeometryNodeInputMeshEdgeAngle")
mr = N.new("ShaderNodeMapRange")                        # radians -> 0..1
mr.inputs["From Min"].default_value = -math.pi; mr.inputs["From Max"].default_value = math.pi   # ~
st = N.new("GeometryNodeStoreNamedAttribute"); st.data_type = 'FLOAT'; st.domain = 'POINT'
st.inputs["Name"].default_value = "edge_angle"
L.new(gi.outputs[0], st.inputs["Geometry"])
L.new(ea.outputs["Signed Angle"], mr.inputs["Value"])
L.new(mr.outputs["Result"], sock(st.inputs, "Value", "VALUE"))
L.new(st.outputs["Geometry"], go.inputs[0])

# Shader: mask -> scratches -> coat roughness; AO -> grime
m = ob.active_material; SN, SL = m.node_tree.nodes, m.node_tree.links
bsdf = SN["Principled BSDF"]
at = SN.new("ShaderNodeAttribute"); at.attribute_name = "edge_angle"
scr = SN.new("ShaderNodeTexImage"); scr.image = bpy.data.images.load("//tex/scratches_seamless.jpg")
mix = SN.new("ShaderNodeMix"); mix.data_type = 'RGBA'
sock(mix.inputs, "A", "RGBA").default_value = (0, 0, 0, 1)        # A = black (no scratch)
SL.new(at.outputs["Fac"], mix.inputs["Factor"])
SL.new(scr.outputs["Color"], sock(mix.inputs, "B", "RGBA"))
SL.new(sock(mix.outputs, "Result", "RGBA"), bsdf.inputs["Coat Roughness"])
ao = SN.new("ShaderNodeAmbientOcclusion"); ramp = SN.new("ShaderNodeValToRGB")
SL.new(ao.outputs["AO"], ramp.inputs["Fac"])                       # cavity grime factor (mix into Base Color)

# Alternative curvature to vertex colour (Vertex Paint mode):
# bpy.ops.geometry.color_attribute_add(name="Curv", domain='POINT', data_type='FLOAT_COLOR')
# bpy.ops.paint.vertex_color_dirt(blur_strength=1.0, blur_iterations=1, clean_angle=3.14159, dirt_angle=0.0, dirt_only=False, normalize=True)
# Cycles-only: Geometry [Pointiness] -> Color Ramp -> Mix [Factor]

# Bake for raea (apply the GN modifier first; target image node active in the material)
bpy.ops.object.modifier_apply(modifier="SmartMat")
bpy.context.scene.render.engine = 'CYCLES'
bpy.ops.object.bake(type='ROUGHNESS')
# colour: bpy.ops.object.bake(type='DIFFUSE', pass_filter={'COLOR'}); AO: bpy.ops.object.bake(type='AO')
```
Links: `Edge Angle [Signed Angle] -> Map Range -> Store Named Attribute("edge_angle") [Value]`;
`Attribute("edge_angle") [Fac] -> Mix(Color) [Factor]`; `Image(scratches) [Color] -> Mix [B]`; `Mix [Result] -> Principled BSDF [Coat Roughness]`;
`Ambient Occlusion [AO] -> Color Ramp -> (grime mix into Base Color)`.

### raea
```tsx
// baked maps
<StandardMaterial base_color_texture={staticFile("till_diff.png")} metallic_roughness_texture={staticFile("till_rough.png")}
  occlusion_texture={staticFile("till_ao.png")} perceptual_roughness={1} />
// render-time wear (chips on sharply curved edges, grime low, rust streaks); seed differs per copy
<ExtendedMaterial base={<StandardMaterial base_color="#d9c69c" perceptual_roughness={0.55} />}
  extension={<WearExtension amount={0.5} chips={0.6} grime={0.5} rust={0} scale={0.02} seed={3} />} />
```
WearExtension: `scale` is blotch size in metres (0.08 default; smaller for a macro object); leave lenses, rubber and
polished steel without it or use a small amount. Wear is fixed in the part's own space.

## NOTES
- Deprecated: Principled v1 "Specular" → "Specular IOR Level"; MixRGB → Mix node (Color). Pointiness exists only in Cycles
  (EEVEE/raea can't read it) — always bake; the GN stored attribute works in EEVEE too. Geometry (shader) node ≠ Geometry Nodes.
- Visual gaps: Houdini painted regions brushed by hand; PRO Materials doesn't narrate the storage domain or remap values.
- The Houdini course's "week three" displacement maps (cracks/moss) are outside its file.
- Rule conflicts: none. Keep wear subtle in macro (it catches the top light); the one accent colour never goes on wear.
