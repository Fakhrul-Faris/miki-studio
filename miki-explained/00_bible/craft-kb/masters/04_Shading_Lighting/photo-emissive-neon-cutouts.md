---
title: Photo -> emission + alpha cut-out planes (neon signs)
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/alpha-photo-planes-neon-signage--cyber-japan-breakdown.md
  - cards/04_Shading_Lighting/photo-emission-inverted-alpha-cutout--emission-textures.md
  - cards/04_Shading_Lighting/photo-to-tinted-neon-sign-emission--use-lighting-in-renders.md
sources: ["Cyber Japan Art Breakdown  Blender.txt", "3 Ways To Make Stunning Emission Textures In Blender.txt", "How To Use Lighting In Your Renders  Blender Tutorial.txt"]
use_when: "glowing shop signs or neon in the background"
style_fit: "Conflict (strictest, cyber-japan): multi-colour neon breaks the one-accent rule — keep background neon dim, desaturated or DoF-blurred, never brighter than the hero; a single-colour tinted sign (use-lighting) may carry the brand accent only when the line is about it. Stock street photos often contain people — crop or pick photos without them. Log every photo in ASSET-SOURCES.md."
---

## METADATA
04_Shading_Lighting | 3.x (source) → 4.x/5.x shader nodes → raea (baked RGBA PNG + emissive_texture) | Shader nodes, raea

## CREATIVE_INTENT
A flat white emissive bar screams "default Blender"; neon with real, irregular structure comes free from any photo. The photo drives where it glows (Emission Color / Strength) and where it's see-through (Alpha), so dark parts drop away and only the bright signage shows. Copies placed in background gaps, partly hidden by foreground, never read as repeats.
- cyber-japan-breakdown: photo of a neon street (Unsplash "Japan") → Alpha + Emission ~10 on plain planes, duplicated into gaps; ad-panel variant tinted red with a Math Multiply on strength; far filler buildings.
- emission-textures: Invert Color → Color Ramp before Alpha when the subject is dark on white; ramp stops make the cut-out crisp.
- use-lighting-in-renders: RGB Curves blow-out → Hue/Saturation/Value [Value] forces one sign colour; strength 66 on the main sign.

## STE_PROCEDURE
1. Find a photo with bright signage or a strong shape (night street for background neon; any photo for a unique cut-out); prefer no people.
2. Add a Plane; put the photo on it with default UVs (no unwrap).
3. Alpha: link Image [Color] → Principled BSDF [Alpha] (bright = opaque).
4. If the subject is dark on white, insert Invert Color → Color Ramp before [Alpha]; drag stops until background is fully transparent and the subject opaque.
5. Emission, multi-colour: link Image [Color] → Principled BSDF [Emission Color].
6. Emission, single colour: Image [Color] → RGB Curves (lift to blow out) → Hue/Saturation/Value [Value] (not [Color]); set HSV [Color] input to the sign colour; HSV [Color] → [Emission Color].
7. Ad-panel variant: Image → Mix (Multiply) with a red tint → [Emission Color]; Image → Math (Multiply, ~5) → [Emission Strength].
8. Raise Emission Strength (~10 background neon; up to 66 on a hero sign).
9. Before placing copies, set the material's render method to Blended (EEVEE Next); Cycles needs nothing.
10. Put something behind the plane to check transparency.
11. Duplicate the plane unchanged into background gaps, partly hidden behind foreground; check from camera — no two copies both clearly visible.
12. Fill the far background with any generic building pack.
13. For raea: bake the result to an RGBA PNG (colour + luminance alpha) and build the planes in TSX, not through the GLB.

## VALUES BY SOURCE
| parameter | cyber-japan-breakdown | emission-textures | use-lighting-in-renders | recommended for Style D (+ why) |
|---|---|---|---|---|
| alpha source | Image [Color] (luminance) | Image → Invert → Color Ramp (stops ~0.35 / ~0.55) | — (planes opaque) | luminance alpha baked into the PNG |
| colour | photo's own (multi) / ad tinted `#FF2A1A`~ | photo's own | one hue via HSV (e.g. red 1,0.05,0.05) | one colour: desaturated background, or brand accent on the line's subject |
| Emission Strength | ~10; ad: Math Multiply ~5 | ~10 | 66 (main sign) | raea emissive ×3–6 on background, ×6–10 on a hero sign |
| render method | Blend (EEVEE Legacy) | BLENDED | — | BLENDED (Blender preview only) |
| raea alpha | `alpha_mode="Blend"`, or `{ Mask: 0.3 }` if fill bleeds | `alpha_mode="Blend"` | — | Blend; Mask 0.3 if emissive shows through transparent parts |
| raea bloom | intensity 1, threshold 0.9 | threshold 0.9 | intensity 1, threshold 0.9 | intensity 1, threshold 0.9 |
| hiding | DoF f/2 + FogVolume | — | — | DoF f/2–2.8 on background neon |
| lighting neighbours | — | — | add a PointLight at the sign | PointLight only if the sign must light its surroundings |

## AGENT_EXECUTION
Shader nodes (5.x):
```
Neon (multi):   Image [Color] -> Principled BSDF [Alpha];  Image [Color] -> Principled BSDF [Emission Color];  [Emission Strength] = 10
Cut-out:        Image [Color] -> Invert Color [Color] -> Color Ramp [Factor] -> Principled BSDF [Alpha]
Single colour:  Image [Color] -> RGB Curves [Color] -> Hue/Saturation/Value [Value];  HSV [Color] input = sign colour;  HSV [Color] -> Principled [Emission Color]
Ad panel:       Image [Color] -> Mix(RGBA, MULTIPLY) [A]; [B] = #FF2A1A~; Mix [Result] -> Principled [Emission Color]
                Image [Color] -> Math(MULTIPLY, ~5) [Value] -> Principled [Emission Strength]
```
```python
import bpy
def photo_emit(name, path, strength=10.0, invert_ramp=None, tint=None):
    m = bpy.data.materials.new(name); N, L = m.node_tree.nodes, m.node_tree.links
    b = N["Principled BSDF"]
    img = N.new("ShaderNodeTexImage"); img.image = bpy.data.images.load(path)
    if invert_ramp:                                   # (lo, hi) ramp stops, e.g. (0.35, 0.55)
        inv = N.new("ShaderNodeInvert"); cr = N.new("ShaderNodeValToRGB")
        cr.color_ramp.elements[0].position, cr.color_ramp.elements[1].position = invert_ramp
        L.new(img.outputs["Color"], inv.inputs["Color"]); L.new(inv.outputs["Color"], cr.inputs["Factor"])
        L.new(cr.outputs["Color"], b.inputs["Alpha"])
    else:
        L.new(img.outputs["Color"], b.inputs["Alpha"])
    if tint:                                          # single-colour neon
        cv = N.new("ShaderNodeRGBCurve"); cv.mapping.curves[3].points[1].location = (0.6, 1.0)   # ~ blow out
        hsv = N.new("ShaderNodeHueSaturation"); hsv.inputs["Color"].default_value = tint
        L.new(img.outputs["Color"], cv.inputs["Color"]); L.new(cv.outputs["Color"], hsv.inputs["Value"])
        L.new(hsv.outputs["Color"], b.inputs["Emission Color"])
    else:
        L.new(img.outputs["Color"], b.inputs["Emission Color"])
    b.inputs["Emission Strength"].default_value = strength
    m.surface_render_method = "BLENDED"               # EEVEE Next; replaces blend_method
    return m

photo_emit("neon_street", "//tex/street.jpg", 10)
photo_emit("cutout", "//media/photo.jpg", 10, invert_ramp=(0.35, 0.55))
photo_emit("sign_red", "//media/photo.jpg", 66, tint=(1, 0.05, 0.05, 1))
```
Bake to an RGBA PNG for raea (glTF/blend2raea drops colour-to-alpha links and exports JPEG without alpha):
```bash
ffmpeg -i street.jpg -vf "format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='lum(X,Y)'" street_neon.png
# single-colour sign: Cycles bake (Emit pass) of the tinted material -> sign_emit.png
```
raea:
```tsx
const NEON = LinearRgba.from(Srgba.hex("#ffffff"));
{SPOTS.map((s, i) => (
  <Mesh3d key={i} name={`neon_${i}`} transform={Transform.fromXyz(...s.p)}>
    <Plane3d normal={[0, 0, 1]} half_size={[s.w / 2, s.h / 2]} />
    <StandardMaterial base_color="#000000" base_color_texture={staticFile("street_neon.png")}
      alpha_mode="Blend" emissive={NEON.mul(4)} emissive_texture={staticFile("street_neon.png")} perceptual_roughness={1} />
  </Mesh3d>
))}
<Bloom intensity={1} threshold={0.9} />
// inside <Camera3d>: <DepthOfField focal_distance={heroDist} aperture_f_stops={2} />
// sign lights its surroundings: <PointLight color="#ff3030" transform={...} intensity={~} range={2} />
// unlit glow card alternative: <ImagePlane src={staticFile("emit_rgba.png")} width={1} position rotation />
```
The black base keeps scene light off the plane, so only `emissive` × `emissive_texture` shows and blooms; the multiplier scales the map (`~`, verify on a still). If the fill shows through transparent parts, swap to `alpha_mode={{ Mask: 0.3 }}`. Keep part count low (limits.md ~300 total).

## NOTES
- Deprecated: Principled v1 "Emission" → "Emission Color" (4.0+); EEVEE Legacy `blend_method` → EEVEE Next `surface_render_method` ('BLENDED'/'DITHERED'); Color Ramp input "Fac" → "Factor" (5.x); MixRGB → Mix node (RGBA).
- STT fixes: "math no" = Math node; "Basse color" = Base Color.
- Visual gaps: Math value and red tint (cyber-japan), ramp stop positions (emission-textures ~00:34–01:22), curve shape (use-lighting) and plane placements are on screen only (`~`).
- raea: emissive surfaces don't light neighbours — add a PointLight if needed.
- Rule conflicts: one saturated accent — multi-colour neon only blurred, dim or desaturated (`<Grade>` is frame-wide, so prefer desaturating the PNG); accent stays on what the line is about. No people in street scenes — crop. Log every photo and building pack in `00_bible/ASSET-SOURCES.md`.
