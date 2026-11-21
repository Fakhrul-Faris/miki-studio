---
title: God rays from a black-and-white ray image on an alpha plane
bucket: 04_Shading_Lighting
source: "6 Tips to Make Your Renders Instantly Cooler.txt"
source_time: "unknown (tip 3 of 6)"
blender_version_source: 3.x
tool_target: Shader nodes | raea
tier: full
style_fit: A light shaft over the hero object fits the dark-room look; in raea prefer real volumetric shafts. Use sparingly — "if the base image is bad, no glow saves it".
---

## METADATA
04_Shading_Lighting | 3.x → 4.2+ | Shader nodes (image plane) → raea VolumetricFog + FogVolume + volumetric SpotLight

## CREATIVE_INTENT
Light rays are a finishing touch on an image whose base already works. A painted/downloaded ray image on a transparent plane is the cheapest way to put shafts exactly where you want them in frame.

## STE_PROCEDURE
1. Before adding rays, confirm the base render already reads well without them.
2. Create or download a black-and-white light-ray image (white rays on black).
3. Import it with Add › Image › Images as Planes.
4. Link Image Texture [Color] → Principled BSDF [Alpha] (white = visible ray).
5. Set the material's blend/render method so alpha takes effect (Alpha Blend in Eevee Legacy; Blended/Dithered in 4.2+).
6. Place the plane in the light's direction, between light and subject, angled to the camera.

## AGENT_EXECUTION
```python
import bpy
bpy.ops.image.import_as_mesh_planes(files=[{"name": "rays.png"}], directory=bpy.path.abspath("//media/"))   # core since 4.2 (File › Import › Images as Planes)
ob = bpy.context.active_object; mat = ob.active_material
N, L = mat.node_tree.nodes, mat.node_tree.links
img = next(n for n in N if n.bl_idname == "ShaderNodeTexImage")
bsdf = N.get("Principled BSDF") or N.new("ShaderNodeBsdfPrincipled")
L.new(img.outputs["Color"], bsdf.inputs["Alpha"])
bsdf.inputs["Emission Color"].default_value = (1, 0.95, 0.85, 1); bsdf.inputs["Emission Strength"].default_value = 1.0  # ~
mat.surface_render_method = "BLENDED"
```
raea (preferred, real shafts that respond to the scene's geometry):
```tsx
<VolumetricFog />
<FogVolume name="air" position={[0, 1, 0]} scale={[4, 3, 4]} density={0.05} scattering={0.5} anisotropy={0.7} />
<SpotLight volumetric shadow_maps_enabled transform={Transform.fromXyz(-1.5, 3, -1).lookingAt([0, 0, 0])}
  intensity={1500000} outer_angle={0.25} inner_angle={0.2} color="#ffe6c4" />
```
Fallback (painted rays): a `<Mesh3d>` plane with `<StandardMaterial base_color={Srgba.hex("#fff2e0").with_alpha(1)} base_color_texture={staticFile("rays.png")} alpha_mode="Blend" unlit />` — rays PNG must carry its own alpha.

## NOTES
- Deprecated: Images as Planes moved from add-on to built-in importer (4.2); Eevee Legacy Blend Mode → Render Method.
- Visual gaps: plane placement/angle not narrated.
- Rule conflicts: no flashy glow; rays fade in over ≥0.4 s if they appear on a beat.
- bpy fixed for 5.3: Images as Planes add-on → core `bpy.ops.image.import_as_mesh_planes` (directory made absolute).
