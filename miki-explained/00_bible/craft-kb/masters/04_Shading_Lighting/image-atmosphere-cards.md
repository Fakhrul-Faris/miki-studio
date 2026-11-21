---
title: Dust / light-ray / fog image cards on alpha planes
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/dust-and-light-ray-card-planes--lighting-characters.md
  - cards/04_Shading_Lighting/god-ray-image-plane-alpha--renders-instantly-cooler.md
sources: ["Lighting 3D Characters for Storytelling.txt", "6 Tips to Make Your Renders Instantly Cooler.txt"]
use_when: "cheap god rays or dust in the top-light cone"
style_fit: "Cheap air for the dark room; dust motes in the key's cone sell macro scale. Prefer raea's real volumetric shafts; keep cards faint (hero stays brightest), drifting slowly, and fade in over ≥0.4 s — never flashy glow, flicker or pop."
---

## METADATA
04_Shading_Lighting | Blender 2.8–3.x → 5.x / raea | Shader nodes (image plane) → raea VolumetricFog / unlit alpha card

## CREATIVE_INTENT
A dust, light-ray or fog-wisp image on a plane, plugged into colour/emission and alpha, gives air "very cheap, very
fast", and puts shafts exactly where you want them in frame. It is a finishing touch: if the base image is bad, no glow
saves it.
- Lighting characters adds: dust, light-streak and fog-wisp cards (image or moving-dust video); low emission so dust
  doesn't outshine the subject; tint with RGB Curves to match the colour story; fog cards between background pillars and above the subject.
- Renders instantly cooler adds: white-on-black ray image imported as a plane, Color → Alpha; check the base render first;
  place between light and subject, angled to camera.

## STE_PROCEDURE
1. Before adding cards, confirm the base render already reads well without them.
2. Get the image: dust PNG with alpha (or an image sequence / video), or a black-and-white ray image (white rays on black).
3. Import it as a plane (Images as Planes) or add a Plane in front of the camera, in the key light's beam.
4. Dust/fog: link Image [Color] → Principled BSDF [Base Color] and [Emission Color]; Image [Alpha] → [Alpha].
5. Rays: link Image [Color] → Principled BSDF [Alpha] (white = visible ray); set a warm Emission Color.
6. Set Material › Render Method = Blended (4.2+) so alpha takes effect.
7. Lower Emission Strength until the motes/rays glow faintly (~0.5–1).
8. To tint, insert RGB Curves between Image [Color] and [Emission Color]; raise one channel (video: Green) to match the scene.
9. Place ray cards along the light's direction, between light and subject, angled to the camera.
10. Place fog-wisp cards between background objects, and optionally one above the subject.
11. Drift cards slowly; with DoF they blur naturally — keep them out of focus-critical areas.

## VALUES BY SOURCE
| parameter | Lighting characters | Instantly cooler | recommended for Style D (+ why) |
|---|---|---|---|
| Image | dust PNG/video, light-streak, fog-wisp | white-on-black ray image | dust card in the top-light cone; rays via real volumetrics |
| Alpha | image Alpha → Alpha | image Color → Alpha | per image |
| Emission | Color via RGB Curves (G +~0.1), Strength ~0.5 | Emission Color (1, 0.95, 0.85), Strength ~1 | faint: raea emissive `.mul(0.5)` |
| Render method | Alpha Blend → Blended | Alpha Blend → Blended/Dithered | Blended / raea `alpha_mode="Blend"` |
| Placement | in key beam, between pillars, above subject | light direction, between light and subject | inside the top key's cone, near camera (DoF blur) |
| raea | card or FogVolume | VolumetricFog + FogVolume + volumetric SpotLight (preferred) | volumetric shaft first; dust card on top |

## AGENT_EXECUTION
Blender:
```python
import bpy
# 5.x: Images as Planes is core
bpy.ops.image.import_as_mesh_planes(files=[{"name": "rays.png"}], directory=bpy.path.abspath("//media/"))
ob = bpy.context.active_object; mat = ob.active_material
N, L = mat.node_tree.nodes, mat.node_tree.links
img = next(n for n in N if n.bl_idname == "ShaderNodeTexImage")
bsdf = N.get("Principled BSDF") or N.new("ShaderNodeBsdfPrincipled")
# rays: Color → Alpha
L.new(img.outputs["Color"], bsdf.inputs["Alpha"])
bsdf.inputs["Emission Color"].default_value = (1, 0.95, 0.85, 1); bsdf.inputs["Emission Strength"].default_value = 1.0  # ~
mat.surface_render_method = "BLENDED"
# dust/fog variant: Color → Base Color, Color → RGB Curves → Emission Color, Alpha → Alpha
# curves = N.new("ShaderNodeRGBCurve"); L.new(img.outputs["Color"], bsdf.inputs["Base Color"])
# L.new(img.outputs["Color"], curves.inputs["Color"]); L.new(curves.outputs["Color"], bsdf.inputs["Emission Color"])
# L.new(img.outputs["Alpha"], bsdf.inputs["Alpha"]); bsdf.inputs["Emission Strength"].default_value = 0.5
```
raea:
```tsx
{/* preferred: real shafts that respond to the scene's geometry */}
<VolumetricFog />
<FogVolume name="air" position={[0, 1, 0]} scale={[4, 3, 4]} density={0.05} scattering={0.5} anisotropy={0.7} />
<SpotLight volumetric shadow_maps_enabled transform={Transform.fromXyz(-1.5, 3, -1).lookingAt([0, 0, 0])}
  intensity={1500000} outer_angle={0.25} inner_angle={0.2} color="#ffe6c4" />
{/* dust card in the cone, drifting a few mm/s */}
<Mesh3d name="dust" transform={Transform.fromXyz(0, 0.6 + f * 0.0001, 1.2)} shadow={false}>
  <Plane3d normal={[0, 0, 1]} half_size={[0.8, 1.2]} />
  <StandardMaterial base_color={Srgba.hex("#ffffff").with_alpha(0.6)} base_color_texture={staticFile("dust.png")}
    emissive_texture={staticFile("dust.png")} emissive={LinearRgba.from(Srgba.hex("#fff2dc")).mul(0.5)}
    alpha_mode="Blend" unlit double_sided />
</Mesh3d>
{/* fallback painted rays: PNG must carry its own alpha */}
<Mesh3d name="rays"><Plane3d normal={[0, 0, 1]} half_size={[1, 2]} />
  <StandardMaterial base_color={Srgba.hex("#fff2e0").with_alpha(1)} base_color_texture={staticFile("rays.png")} alpha_mode="Blend" unlit />
</Mesh3d>
```
Fade any card's alpha in over ≥ 12 frames at 30 fps if it appears on a beat.

## NOTES
- Deprecated: Principled v1 "Emission" → "Emission Color" (4.0+); `blend_method` / Eevee Legacy Blend Mode →
  `surface_render_method` (4.2); Images as Planes add-on (`import_image.to_plane`) → core `bpy.ops.image.import_as_mesh_planes`.
- Visual gaps: dust texture source not named; ray-plane placement/angle not narrated.
- Rule conflicts: dust drifts slowly; never flicker or pop; no flashy glow; rays fade in over ≥0.4 s on a beat.
