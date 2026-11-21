---
title: Background neon from stock photos — image drives alpha + emission on plain planes, duplicated carelessly
bucket: 04_Shading_Lighting
source: "Cyber Japan Art Breakdown  Blender.txt"
source_time: "30:53–31:33 (emissive ad panel), 34:27–36:32 (alpha neon planes), 36:32–37:01 (filler buildings)"
blender_version_source: 3.x
tool_target: Shader nodes | raea
tier: full
style_fit: "Cheap depth behind a street or shopfront beat: glowing bits poking through out-of-focus background. Conflict: multi-colour neon breaks the one-accent rule; keep it dim, desaturated or blurred, never brighter than the hero."
---

## METADATA
04_Shading_Lighting | 3.x source (Cycles) → 4.x nodes → raea | Shader nodes, raea

## CREATIVE_INTENT
A background full of neon is just a photo of a neon street (Unsplash, search "Japan") on a plane, with no unwrap. The
photo's brightness drives transparency, so only the bright signs show and the dark parts drop away. The same photo
drives emission (strength ~10). Copies of the same plane go wherever a gap looks empty. Because the eye only catches
fragments through the foreground, the repeats never read. A sibling trick: any advert photo on a UV-mapped panel, tinted
red, into Emission Color, with Emission Strength raised through a Math node.

## STE_PROCEDURE
1. Find a night street photo with bright signage (Unsplash, "Japan").
2. Add a Plane; put the photo on it with the default UVs (no unwrapping).
3. Link the photo to the Principled BSDF Alpha input, so bright pixels are opaque and dark pixels are transparent.
4. Link the photo to Emission Color; set Emission Strength ≈ 10.
5. Before you place copies, set Blend Mode so transparency renders (EEVEE); Cycles needs nothing extra.
6. Duplicate the plane, unchanged, into background gaps "that look kind of cool", partly hidden behind foreground structures.
7. Check from the camera only. Repeats are fine as long as no two copies are both clearly visible.
8. Ad-panel variant: photo on the panel's UVs → tint red → Emission Color; photo → Math (Multiply, ~) → Emission Strength.
9. Fill the far background with any generic building pack (the source uses its own free pack). At that distance anything works.

## AGENT_EXECUTION
### Shader nodes (4.x)
```
Neon:  Image(street.jpg) [Color] -> Principled BSDF [Alpha]          (colour → float: luminance)
       Image(street.jpg) [Color] -> Principled BSDF [Emission Color]
       Principled BSDF [Emission Strength] = 10
Ad:    Image(ad.jpg) [Color] -> Mix(Color, MULTIPLY) [A] ; [B] = #FF2A1A (~) ; Mix [Result] -> Principled [Emission Color]
       Image(ad.jpg) [Color] -> Math(MULTIPLY, ~5) [Value] -> Principled [Emission Strength]
```
```python
import bpy
m = bpy.data.materials.new("neon_photo"); m.use_nodes = True; nt = m.node_tree; N, L = nt.nodes, nt.links
img = N.new('ShaderNodeTexImage'); img.image = bpy.data.images.load("//tex/street.jpg")
b = N["Principled BSDF"]
L.new(img.outputs['Color'], b.inputs['Alpha']); L.new(img.outputs['Color'], b.inputs['Emission Color'])
b.inputs['Emission Strength'].default_value = 10.0
m.blend_method = 'BLEND'          # EEVEE Legacy; in EEVEE Next (4.2+) use m.surface_render_method = 'BLENDED'
```

### raea
- Don't send these planes through the GLB. `blend2raea.py` exports images as JPEG, which drops alpha, and a
  colour-to-alpha node link doesn't survive glTF. Pre-bake the alpha into a PNG and build the planes in TSX:
```bash
ffmpeg -i street.jpg -vf "format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='lum(X,Y)'" street_neon.png
```
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
```
  `alpha_mode="Blend"` takes the alpha from the base colour × texture. The black base keeps scene light off the
  plane, so only `emissive` × `emissive_texture` shows, and that is what blooms. If the emissive fill shows through the transparent parts, swap Blend for `alpha_mode={{ Mask: 0.3 }}` (~).
  `Plane3d normal={[0, 0, 1]}` faces +z, like a wall.
- Depth of field does the hiding: `<DepthOfField focal_distance={heroDist} aperture_f_stops={2} />`. Fog and image
  planes are fogged at their own depth (post.md), so a `<FogVolume>` softens them further.
- Keep the count low (limits.md: ~300 parts in total).

## NOTES
- STT fixes: "math no" = Math node; "Basse color" = Base Color.
- Visual gaps: the Math node's value and the red tint are on screen only (`~`). The plane placements are by eye.
- Deprecated: Principled v1 "Emission" → "Emission Color" (4.0+). The EEVEE Legacy Blend Mode → EEVEE Next `surface_render_method`.
- Rule conflicts: Style D allows one saturated accent. Multi-colour neon must sit in the blurred background, low in
  brightness, or be desaturated with `<Grade>` (it applies frame-wide). The accent colour stays on what the line is about.
  "No people in street scenes": stock street photos often contain people, so crop or pick photos without them.
- Log every photo and building pack in `00_bible/ASSET-SOURCES.md`.
