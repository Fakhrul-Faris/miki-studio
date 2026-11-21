---
title: Floating dust, light-ray and fog-overlay cards — a texture on a plane into Base Color, Emission and Alpha
bucket: 04_Shading_Lighting
source: "Lighting 3D Characters for Storytelling.txt"
source_time: "08:24–08:49, 16:16–16:33, 24:39–24:52, 31:41–32:10"
blender_version_source: 2.8–3.x? (EEVEE legacy)
tool_target: Shader nodes | raea
tier: full
style_fit: Cheap atmosphere for the dark room; dust motes in the key's cone sell macro scale. Keep them faint so the hero object stays the brightest thing.
---

## METADATA
04_Shading_Lighting | 2.8–3.x? → 4.2+ / raea | Shader nodes + raea

## CREATIVE_INTENT
A dust (or light-streak, or fog-wisp) image on a plane, plugged into colour, emission and alpha, gives air in the scene "very cheap, very fast". A video of moving dust works the same way. Lower the emission so the dust doesn't outshine the subject; tint it with an RGB Curves node to match the scene's colour story; place fog cards between background pillars and even one above the subject.

## STE_PROCEDURE
1. Add a Plane in front of the camera, in the key light's beam.
2. Before linking nodes, load the dust image (PNG with alpha, or an image sequence/video).
3. Link the image Color to Base Color and Emission Color, and image Alpha to Alpha.
4. Set the material Blend Mode to Alpha Blend (4.2+: Render Method = Blended).
5. Lower Emission Strength until the motes glow faintly (video: "turn their emission a little lower").
6. To tint, insert an RGB Curves node between image Color and Emission Color and raise one channel (video: Green).
7. Repeat with light-ray and fog-wisp images; place fog cards between background objects.

## AGENT_EXECUTION
Nodes:
- `Image Texture (dust.png) [Color] -> Principled BSDF [Base Color]`
- `Image Texture [Color] -> RGB Curves (G curve raised ~+0.1) [Color] -> Principled BSDF [Emission Color]`; Emission Strength ~0.5
- `Image Texture [Alpha] -> Principled BSDF [Alpha]`
```python
m = bpy.data.materials.new("Dust"); m.use_nodes = True
m.surface_render_method = 'BLENDED'          # 4.2+; legacy: m.blend_method = 'BLEND'
```
raea:
```tsx
<Mesh3d name="dust" transform={Transform.fromXyz(0, 0.6, 1.2)} shadow={false}>
  <Plane3d normal={[0, 0, 1]} half_size={[0.8, 1.2]} />
  <StandardMaterial base_color={Srgba.hex("#ffffff").with_alpha(0.6)} base_color_texture={staticFile("dust.png")}
    emissive_texture={staticFile("dust.png")} emissive={LinearRgba.from(Srgba.hex("#fff2dc")).mul(0.5)}
    alpha_mode="Blend" unlit double_sided />
</Mesh3d>
```
Drift the card slowly via its `transform` from the frame (a few mm/s). Real volumetric alternative: `<FogVolume>` + `volumetric` SpotLight (post.md).

## NOTES
- Deprecated: Principled v1 "Emission" → "Emission Color" (4.0+); `blend_method` → `surface_render_method` (4.2).
- Visual gaps: the dust texture source isn't named.
- Rule conflicts: dust drifts slowly; never flicker or pop. Cards must stay out of focus-critical areas; with DoF they blur naturally.
