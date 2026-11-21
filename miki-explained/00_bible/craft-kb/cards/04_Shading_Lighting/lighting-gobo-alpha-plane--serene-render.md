---
title: Lighting gobo — a cut-out plane over the key light for dappled shadows
bucket: 04_Shading_Lighting
source: "Making a SERENE render in blender.txt"
source_time: "19:38–21:38"
blender_version_source: 4.x
tool_target: Blender bpy | Shader nodes | raea
tier: full
style_fit: Breaks a flat top light on the hero's surface into soft patches without moving the light — calm, "sun through leaves" mood; raea `shadow="only"` mesh with holes is the safe equivalent.
---

## METADATA
04_Shading_Lighting | 4.x → 4.2+ / raea | Blender bpy + Shader nodes + raea

## CREATIVE_INTENT
When the light's direction and softness are right but the result is boring (flat overhead), cover the light with a gobo: a plane whose alpha has holes, casting interesting shadow patterns over the whole scene. Even a subtle version adds a peaceful dappled feel, like sitting under a tree.

## STE_PROCEDURE
1. Before adding a gobo, finalise the key light's direction, shape and softness.
2. Add a Plane between the key light and the scene, large enough to shadow the whole scene.
3. Give it a material with an Image Texture (video: a random water photo) or Noise Texture feeding Principled BSDF [Alpha].
4. Check the render: transparent parts pass light, opaque parts cast shadow.
5. Scale and move the plane to change pattern size and sharpness (closer to the subject = sharper ~).
6. Alternatively place real objects (a tree, props) in front of the light for the same effect.
7. Keep it subtle unless you want strong bright/dark contrast.

## AGENT_EXECUTION
Blender:
```python
import bpy
bpy.ops.mesh.primitive_plane_add(size=12, location=(0, 0, 8))      # ~ between spot and scene
g = bpy.context.object; g.name = "Gobo"
m = bpy.data.materials.new("Gobo"); m.use_nodes = True
N, L = m.node_tree.nodes, m.node_tree.links; bsdf = N["Principled BSDF"]
img = N.new('ShaderNodeTexImage'); img.image = bpy.data.images.load("//tex/water_caustic.jpg")  # any greyscale pattern
L.new(img.outputs['Color'], bsdf.inputs['Alpha'])
g.data.materials.append(m); g.visible_camera = False
# EEVEE (4.2+) needs alpha-blended/hashed shadows: m.surface_render_method = 'DITHERED'
```
Node links: `Image Texture [Color] -> Principled BSDF [Alpha]` (or `Noise Texture [Fac] -> [Alpha]`).

raea (geometry gobo, known to cast):
```tsx
// module level: a board with holes
const GOBO = manifold.box(4, 0.02, 4).minus(manifold.union(
  [[-1,0.6],[0.4,-0.8],[1.1,1.2],[-0.5,-1.4]].map(([x,z]) => manifold.cylinder(0.1, 0.35).move(x, 0, z))));
<Mesh3d name="gobo" shadow="only" shape={GOBO} transform={Transform.fromXyz(0, 2.6, 0)}>
  <StandardMaterial base_color="#000000" />
</Mesh3d>
<SpotLight transform={Transform.fromXyz(0, 4, 0.5).lookingAt([0, 0, 0])} intensity={2_500_000}
  outer_angle={0.5} inner_angle={0.25} radius={0.3} soft_shadows_enabled shadow_maps_enabled />
```
An image-alpha gobo in raea (`alpha_mode={{ Mask: 0.5 }}` + `base_color_texture`) may or may not mask the shadow map — unverified; test on a still before relying on it. Manifold args are illustrative; check `meshes.md` for exact `manifold.cylinder` signature.

## NOTES
- Deprecated: EEVEE legacy "Blend Mode / Shadow Mode" → 4.2 `surface_render_method` ('DITHERED'/'BLENDED').
- Visual gaps: plane size/distance and the image are shown, not stated.
- Rule conflicts: a moving gobo would animate shadows; keep any drift slow and eased (no flicker).
