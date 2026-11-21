---
title: Image/photo-textured area lights for realistic reflections
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/image-textured-area-light-reflection--realistic-product-lighting.md
  - cards/04_Shading_Lighting/photo-based-light-shapers--key-to-realistic-renders.md
sources: ["Realistic Product Lighting In Blender.txt", "The Key to Realistic Renders in Blender.txt"]
use_when: "glossy hero whose reflection shows a fake rectangle"
style_fit: Softer, realistic highlight shapes on glossy heroes; raea has no textured lights, so the route is a studio HDRI `<Environment>` (no `background`) or a Blender-baked HDR of soft cards. Only CC0/licensed images (the source packs are paid/patreon); log in ASSET-SOURCES.md.
---

## METADATA
04_Shading_Lighting | Blender 4.x Cycles (light nodes Cycles-only) → raea Environment | Light shader nodes / emissive cards → raea

## CREATIVE_INTENT
A plain area light reflects as a hard, perfect rectangle on glossy products — an instant CG tell. Real studio lights have structure (ribs, falloff, diffusion); driving the light's emission with an image of a soft blob or a photographed softbox gives soft, shaped, believable reflections while keeping control of colour, blur and falloff.
- realistic-product-lighting: put the image directly into the area light's node tree (light nodes).
- key-to-realistic-renders: photo-based shaper pack (~50 shapers) — a softbox photo on an emissive plane hidden from camera, placed where the reflection should land.

## STE_PROCEDURE
1. Get a soft light-shape image (soft gradient blob, or a photo of a real softbox; any CC0 one works).
2. Variant A (light nodes, Cycles): select the area light; enable Use Nodes.
3. A: add an Image Texture; Texture Coordinate [UV] → Image [Vector] (area lights have UVs over their surface).
4. A: Image [Color] → Emission [Color] (or [Strength]).
5. Variant B (emissive card): put the softbox photo on a plane — Image [Color] → Principled [Emission Color]; alpha from luminance if needed.
6. B: hide the plane from camera (Object › Visibility › Ray Visibility › Camera off).
7. B: place it where the reflection should appear on the product; tune strength, colour, blur.
8. Check the reflection on the product in rendered view.
9. For raea: use a studio HDRI, or bake these cards into an HDR panorama and load it as `<Environment>`.

## VALUES BY SOURCE
| parameter | realistic-product-lighting | key-to-realistic-renders | recommended for Style D (+ why) |
|---|---|---|---|
| carrier | Area light node tree (Cycles) | emissive plane hidden from camera | raea `<Environment>` (no textured lights in raea) |
| image | soft blob / softbox shape PNG (patreon-only originals) | softbox photos (paid add-on, ~50 shapers) | Poly Haven `studio_*` CC0 HDRI, or own baked HDR |
| strength | — | Emission ~8 | Environment intensity ~0.3–0.6 in a dark room (reflection, not fill) |
| mapping | TexCoord [UV] → Image | default plane UVs | Environment `rotation` places the highlight |

## AGENT_EXECUTION
Blender 5.x:
```python
import bpy
# A) image on the area light itself (Cycles)
L = bpy.data.lights["Back"]; L.use_nodes = True
N, Lk = L.node_tree.nodes, L.node_tree.links                 # default nodes: Emission, Light Output
img = N.new("ShaderNodeTexImage"); img.image = bpy.data.images.load("//media/softbox_shape.png")
tc = N.new("ShaderNodeTexCoord"); Lk.new(tc.outputs["UV"], img.inputs["Vector"])
Lk.new(img.outputs["Color"], N["Emission"].inputs["Color"])

# B) photo softbox card, invisible to camera, seen in reflections
m = bpy.data.materials.new("Shaper"); N, Lk = m.node_tree.nodes, m.node_tree.links
b = N["Principled BSDF"]; im = N.new("ShaderNodeTexImage"); im.image = bpy.data.images.load("//media/softbox.jpg")
Lk.new(im.outputs["Color"], b.inputs["Emission Color"]); b.inputs["Emission Strength"].default_value = 8   # ~
card = bpy.data.objects["ShaperCard"]; card.data.materials.append(m)
card.visible_camera = False
```
Nodes: A `Texture Coordinate [UV] -> Image Texture [Vector]; Image Texture [Color] -> Emission [Color] -> Light Output`; B `Image Texture [Color] -> Principled BSDF [Emission Color]`.
raea (reflection shape comes only from the environment):
```tsx
<Environment src={staticFile("studio_small_09_1k.hdr")} intensity={0.4} rotation={0.8} />   {/* no background in a dark room */}
<AmbientLight brightness={20} />
{/* hero glossy: low perceptual_roughness so the softbox shapes read */}
<StandardMaterial base_color="#1a1a1a" perceptual_roughness={0.15} clearcoat={1} />
```
Baked-HDR route: render an equirectangular panorama of the soft cards from the hero's position in Blender (panoramic camera) to `.hdr`, then `src` it here (see gradient-card cards). HDRI filename is a placeholder; values `~`.

## NOTES
- Deprecated: none; light node trees are Cycles-only (EEVEE ignores them).
- Visual gaps: the authors' images are patreon-only / paid; the add-on UI is not shown in steps — any soft gradient/softbox image works.
- Rule conflicts: paid add-on — only CC0/licensed sources; log every image in `00_bible/ASSET-SOURCES.md`.
