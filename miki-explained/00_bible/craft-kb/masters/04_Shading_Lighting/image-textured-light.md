---
title: Image-textured light (photo/caustics in the light)
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/fake-caustics-light--lighting-secrets.md
  - cards/04_Shading_Lighting/image-textured-light--lighting-secrets.md
sources: ["5 Lighting SECRETS in Blender.txt", "Lighting Products in Blender (Breakdown).txt", "The Only Product Lighting Video You'll Ever Need (Blender Tutorial).txt"]
use_when: "natural uneven light pools, water caustics near glass"
style_fit: "Adds organic unevenness to the one soft top light and calm caustic life near glass/drinks. raea has no light cookie, so fake it with low-opacity Decals / sprite-sheet planes; keep it subtle (no rainbow competing with the accent) and any drift slow, in-out eased."
---

## METADATA
04_Shading_Lighting | Blender 3.x/4.x, Cycles only (EEVEE ignores light node trees) | Shader nodes (light node tree) → raea Decal / ImagePlane

## CREATIVE_INTENT
A light that is right in direction can still read as a perfect CG cone. Running a photo of real light (sun through a
door on a wall, refraction, ripples) or a water-caustic image through the light gives uneven, natural colour and
brightness in the pool; animating a caustic adds quiet life to a held shot. Use it as a secondary layer next to a normal
key, never as the only light. (Both members are from one video, two sections.)
- Image-textured light section adds: the full light node recipe (white light/Emission colours, Radius to blur grain,
  Color Ramp into Strength, HSV saturation for rainbow, Spot Blend, layered rotated copies).
- Fake caustics section adds: water-caustic image in a Point light, Light Falloff × image combo, animate via Mapping/Noise.

## STE_PROCEDURE
1. Add a Spot light (Area and Point also work; Point for caustics in the middle of the scene).
2. Before you texture an Area light, set its Spread to 0° and raise its Size.
3. Set the world background strength low (~0.0–0.05) so the pattern reads.
4. Enable Use Nodes on the light.
5. Keep the light's Color and the Emission node's Color white (both multiply the result).
6. Add an Image Texture: a photo of real light patterns (own phone photo, Unsplash) or a water-caustic image.
7. Link Image Texture [Color] → Emission [Color].
8. Rotate the light on its local Z to orient the pattern.
9. Raise Power until the pattern reads.
10. Raise the light Radius slightly to blur the photo's own surface grain; too high erases the pattern.
11. Optional: Image [Color] → Color Ramp (Ease or B-Spline) → (Math Multiply) → Emission [Strength] so dark areas emit less.
12. Optional: Hue/Saturation/Value (Saturation > 1) after the image to exaggerate the rainbow split.
13. Optional: Light Falloff [Linear] → Color Ramp → Mix (Color, Multiply) [A] with the image in [B] → Emission [Color].
14. Optional: tint the light Color (e.g. slight blue).
15. Raise Spot Blend to soften the cone edge.
16. To animate caustics, drive the image vector with an animated Mapping (or Noise distortion); keep it slow.
17. Duplicate and rotate copies to layer the pattern; keep one conventional key light in the scene.
18. (from lighting-products-breakdown) No add-on: download a B/W leaf/window mask, wire it Image → Emission Color/
    Strength inside the light's node tree, and set Spot Size to **180°** so the mask shapes the light, not the cone;
    Radius controls edge sharpness (small = sharp leaf edges, large = soft). A paid "Gobos Light Textures" add-on
    does the same as a drag-and-drop preset — skip it, any CC0 mask works (log it in ASSET-SOURCES.md).
19. (from only-product-lighting-video) For a clean controllable falloff with no image asset: on an Area light, wire a
    procedural **Gradient Texture** → Emission Strength (instead of a photo), lower Spread to ~1 to narrow where the
    gradient reads, and place a Color Ramp between the Gradient Texture and Strength to decide exactly where the
    light "ends" along the gradient.

## VALUES BY SOURCE
| parameter | Image-textured light section | Fake caustics section | lighting-products-breakdown | only-product-lighting-video | recommended for Style D (+ why) |
|---|---|---|---|---|---|
| Light | Spot, Power ~1,000, Radius ~0.1, Blend ~0.5 | Point at (0, 0, 1.5) | Spot, Spot Size **180°** when the mask is in-light, Radius = soft↔sharp | Area light, Spread lowered to ~1 | raea: soft top SpotLight stays the key; pattern faked on the surface |
| Image | photo of real light patterns | water caustic | B/W leaf or window mask (free/CC0) | **none** — procedural Gradient Texture instead of a photo | caustic loop for glass/drink beats; light-pattern photo for wall/table texture |
| Strength shaping | Color Ramp (Ease) → Strength; HSV Sat ~1.5 | Light Falloff × image | mask image → Emission Color/Strength directly; Radius = edge sharpness | Gradient Texture → Color Ramp → Emission Strength (ramp stops set where the light "ends") | subtle; no saturation boost (rainbow fights the accent) |
| Motion | static | Mapping Location (0,0,0) → (0.2, 0.1, 0) over 120 f | — | — | slow eased drift (Decal spin/opacity or sprite loop) |
| raea | Decal opacity ~0.2–0.4, warm colour; layered SpotLights | Decal pair offset/spin or ImagePlane sprite sheet | shadow="only" geometry gobo or Decal (no light cookie) | no equivalent for a light-internal gradient; fake with a RectLight whose visible "card" plane carries a gradient-alpha material (see `gradient-alpha-emissive-plane-light--key-to-realistic-renders.md`) | Decal, roughness ≥ 0.5 |

## AGENT_EXECUTION
Blender (Cycles, look-dev / reference only):
```python
import bpy
bpy.ops.object.light_add(type='SPOT', location=(0, 0, 3))
L = bpy.context.object; ld = L.data
ld.energy = 1000; ld.shadow_soft_size = 0.1; ld.spot_blend = 0.5     # ~
ld.use_nodes = True
nt = ld.node_tree; N = nt.nodes; em = N["Emission"]
img = N.new("ShaderNodeTexImage"); img.image = bpy.data.images.load("//light_pattern.jpg")   # or water_caustic.jpg
tc = N.new("ShaderNodeTexCoord"); mapn = N.new("ShaderNodeMapping")
nt.links.new(tc.outputs["Normal"], mapn.inputs["Vector"])            # ~ coordinate not stated in the video
nt.links.new(mapn.outputs["Vector"], img.inputs["Vector"])
hsv = N.new("ShaderNodeHueSaturation"); hsv.inputs["Saturation"].default_value = 1.5         # ~ optional
ramp = N.new("ShaderNodeValToRGB"); ramp.color_ramp.interpolation = 'EASE'
nt.links.new(img.outputs["Color"], hsv.inputs["Color"]); nt.links.new(hsv.outputs["Color"], em.inputs["Color"])
nt.links.new(img.outputs["Color"], ramp.inputs["Fac"]); nt.links.new(ramp.outputs["Color"], em.inputs["Strength"])
L.rotation_euler[2] += 0.6                                            # ~ local-Z spin to place the pattern
# caustic drift
loc = mapn.inputs["Location"]
loc.default_value = (0, 0, 0); loc.keyframe_insert("default_value", frame=1)
loc.default_value = (0.2, 0.1, 0); loc.keyframe_insert("default_value", frame=120)
```
Nodes: `Image [Color] -> Hue/Saturation/Value [Color] -> Emission [Color]`; `Image [Color] -> Color Ramp [Fac] -> (Math
Multiply) -> Emission [Strength]`; `Emission -> Light Output [Surface]`. Falloff combo: `Light Falloff [Linear] -> Color
Ramp [Fac]`; `Color Ramp [Color] -> Mix(Color, Multiply) [A]`; `Image [Color] -> Mix [B]`; `Mix [Result] -> Emission [Color]`.

raea: no equivalent (no light cookie / projected-texture light; lights take `color`, `intensity`, cone angles). Translation:
```tsx
const t = interpolate(f, [0, 120], [0, 1], { easing: Easing.inOut(Easing.sin) });
{/* uneven pool / caustic pattern pressed onto the lit surface */}
<Decal src={staticFile("caustic.png")} position={[0, 0, 0]} normal={[0, 1, 0]} size={[0.6, 0.6]}
  color="#fff2dc" opacity={0.3} roughness={0.6} spin={t * 0.3} />
{/* second copy, offset, cross-fading, fakes drift */}
<Decal src={staticFile("caustic.png")} position={[0.05, 0, 0.03]} normal={[0, 1, 0]} size={[0.6, 0.6]}
  color="#fff2dc" opacity={0.3 * t} roughness={0.6} spin={-t * 0.2} />
{/* coloured layering: 2–3 soft spots with slightly different colours */}
<SpotLight transform={Transform.fromXyz(0, 3, 0.3).lookingAt([0, 0, 0])} color="#fff0dd" intensity={900000} outer_angle={0.5} inner_angle={0.25} />
<SpotLight transform={Transform.fromXyz(0.2, 3, 0.1).lookingAt([0, 0, 0])} color="#e6f0ff" intensity={300000} outer_angle={0.4} inner_angle={0.2} />
```
- Or an `<ImagePlane>` sprite sheet (`grid`, `frame` — limits.md) of a caustic loop laid on the surface.
- Decals with roughness < ~0.4 read as glass; keep ≥ 0.5. Shadow-shaped variation: a `shadow="only"` blocker (gobo master).

## NOTES
- Deprecated: "Mix RGB" → Mix node (Data Type Color, Blend Multiply), 3.4+. Light node trees are Cycles-only in every
  version (EEVEE Next ignores them).
- Visual gaps: exact power, radius, ramp handles shown only; the texture coordinate for the light's image is never stated;
  caustic animation is referenced to another video (Noise distortion values unknown).
- Rule conflicts: none if the drift is slow and the pattern subtle (no rainbow competing with the single accent).
- lighting-products-breakdown: Spanish-narrated, translated; the paid add-on is not usable here, but its manual
  wiring (mask → Emission, Spot Size 180°) is the same mechanism this master already documents. Doesn't change the
  Style D pick.
- only-product-lighting-video: same Image→Ramp→Strength mechanism as this master's optional step 11, with a
  procedural Gradient Texture swapped in for the driver — useful when no reference image exists. raea has no
  light-internal-gradient equivalent; the gradient-alpha plane card is the closest raea translation, not a change
  to this master's Decal-based pick.
