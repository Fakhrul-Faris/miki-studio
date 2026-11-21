---
title: Photo sky/backdrop on an emissive plane
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/bent-emissive-sky-cloud-plane--eevee-animation-blender5.md
  - cards/04_Shading_Lighting/emissive-backdrop-image-plane--lighting-characters.md
  - cards/04_Shading_Lighting/emissive-image-plane-fake-hdri--crazy-renders-geo-nodes.md
  - cards/04_Shading_Lighting/sky-image-plane-direction-matched--good-lighting-environments.md
  - cards/04_Shading_Lighting/sky-photo-backdrop-plane--cyber-japan-breakdown.md
  - cards/04_Shading_Lighting/sky-photo-plane-base-plus-emission--use-lighting-in-renders.md
sources: ["Creating an Animation in Eevee (Blender 5.0).txt", "Lighting 3D Characters for Storytelling.txt", "How To Make Crazy Renders With Easy Geometry Nodes.txt", "How to get good lighting in blender.srt", "Cyber Japan Art Breakdown  Blender.txt", "How To Use Lighting In Your Renders  Blender Tutorial.txt"]
use_when: "a window view or sky behind a set, also lighting it"
style_fit: "Partial conflict (strictest, cyber-japan / crazy-renders): Style D's default is a dark room with no sky — use only on exterior or window/shopfront beats, keep it dim, out of focus, below the hero's brightness and never in the brand accent colour; sun direction in the photo must match the scene light; cloud cards fade in, never pop. Photos are licensed/own backdrops (not generated plates pushed as stills); log in ASSET-SOURCES.md."
---

## METADATA
04_Shading_Lighting | 2.8–5.0 (source) → bpy 5.x + raea | Shader nodes, modifiers, raea ImagePlane / Environment / RectLight

## CREATIVE_INTENT
A real sky or landscape photo on a big plane behind the set looks natural because it is real, and gives more control than an HDRI: you choose exactly which part shows behind the subject, how crisp it is, and its tint. Made emissive it glows on its own (and in Cycles lights the scene); copies around the set give glossy surfaces something to reflect. In raea an image plane is unlit and lights nothing, so the "lights the room" half becomes a RectLight or Environment.
- eevee-animation-blender5: image → Emission Strength (darks emit less); vertical loop cuts + Simple Deform Bend so the edge never shows when the camera tilts; cloud cards via Alpha + Strength, kept conservative.
- lighting-characters: landscape behind a window sets the place and lights the room; keep below the key on the subject.
- crazy-renders-geo-nodes: duplicate the emissive sky card around the set as a "janky HDRI" for reflections, then lower World strength.
- good-lighting-environments: match the photo's sun side to the scene light (mirror X −1 if not), strength 5–10, darken Base Color, pick the sky for the mood.
- cyber-japan-breakdown: "my technique I always use" — giant far plane, tint slightly blue to fit the grade.
- use-lighting-in-renders: feed Base Color + Emission Color (low strength 0.5–1) so it both reflects scene light and glows; or pure Emission shader.

## STE_PROCEDURE
1. Pick the photo for the mood (overcast/dramatic behind a spot-lit scene); prefer no people; log the source.
2. Add a large Plane far behind the set (or behind the window opening), standing up and facing the camera.
3. Scale it until it extends slightly past the camera frame (or fills the view through the window).
4. If the camera tilts far, add vertical loop cuts and a Simple Deform (Bend, around the vertical) so it curves round the view; increase the bend until the top edge is out of view.
5. Give it a material and load the photo in an Image Texture.
6. Choose the shading: (a) Image → Emission shader [Color] → Material Output (pure glow); (b) Image → Principled [Base Color] + [Emission Color], low strength (lit + glow); (c) Image → Principled [Emission Color] with strength 5–10 and darkened Base Color.
7. Optional: Image → Emission [Strength] (or Math Multiply → [Emission Strength]) so darks emit less.
8. Optional tint: Image → Mix (Multiply) with pale blue before the colour inputs.
9. Alpha: only for cloud cards or photos with real alpha (Image [Alpha] → [Alpha]); keep cloud strength low.
10. Compare the sun side in the photo with the scene light; if they disagree, scale the plane by −1 on X.
11. Check it is not cut off in frame or in reflections.
12. For reflections, duplicate the card around the set out of shot; then lower World Background Strength if too bright.
13. Raise strength until the view reads as daylight outside but stays below the key on the subject.
14. For raea: build the backdrop as an `ImagePlane` in TSX, and add a RectLight / Environment for the light it should cast.

## VALUES BY SOURCE
| parameter | eevee-blender5 | lighting-characters | crazy-renders | good-lighting-env | cyber-japan | use-lighting | recommended for Style D (+ why) |
|---|---|---|---|---|---|---|---|
| shader | Emission; image → Strength | Emission shader | Principled Base + Emission (+Alpha) | Principled Emission (+Alpha / Math Multiply) | Principled Base + Emission, tinted | Principled Base + Emission, or Emission | raea ImagePlane (unlit) |
| strength | image-driven; clouds low | ~2 | ~1 (unknown) | 5–10 | ~1 | ~0.5–1 | bake brightness into the JPG; keep below hero |
| geometry | 40 m plane, 24 cuts, Bend ~120° (axis Y~) | plane behind window | plane + copies around set | ~60×34 at (0,60,15) | ~160×90 at (0,120,30) | 40 wide at (0,8,−30) | flat ImagePlane; bend only if camera tilts far (GLB mesh) |
| tint/darken | — | — | World strength ~0.3 | Base Color ~(0.05) darker | Multiply (0.85,0.92,1.0) | — | tint/darken the JPG, or `<Grade>` frame-wide |
| sun match | — | — | — | mirror X −1 | — | match sun | flip the file (PIL `ImageOps.mirror`) |
| light it casts | (Cycles/EEVEE GI) | RectLight `#dfe9ff` 120,000, 2×1.6 | Environment intensity 0.3 | — | Environment 0.6 | Environment, no `background` | RectLight at the window, or low Environment |
| blur | — | — | — | DoF | DoF f/2.8 | — | `<DepthOfField>` f/2–2.8 |

## AGENT_EXECUTION
Blender (5.x):
```python
import bpy, math
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 60, 15), rotation=(math.radians(90), 0, 0))
p = bpy.context.object; p.name = "sky_backdrop"; p.scale = (60, 34, 1)       # ~ just past the frame

# optional bend for tilting cameras
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.subdivide(number_cuts=24); bpy.ops.object.mode_set(mode='OBJECT')  # ~ loop cuts
sd = p.modifiers.new("Bend", 'SIMPLE_DEFORM'); sd.deform_method = 'BEND'; sd.deform_axis = 'Y'; sd.angle = math.radians(120)  # ~

m = bpy.data.materials.new("sky"); N, L = m.node_tree.nodes, m.node_tree.links
img = N.new("ShaderNodeTexImage"); img.image = bpy.data.images.load("//tex/sky.jpg")
tint = N.new("ShaderNodeMix"); tint.data_type = 'RGBA'; tint.blend_type = 'MULTIPLY'
tint.inputs["Factor"].default_value = 1.0; tint.inputs[7].default_value = (0.85, 0.92, 1.0, 1)  # ~ slightly blue
L.new(img.outputs["Color"], tint.inputs[6])
b = N["Principled BSDF"]
L.new(tint.outputs[2], b.inputs["Base Color"])          # lit + glow variant
L.new(tint.outputs[2], b.inputs["Emission Color"])
b.inputs["Emission Strength"].default_value = 0.8       # 0.5–1 lit+glow; 5–10 with darkened Base Color
# variant (pure glow, darks darker): Emission shader, Image [Color] -> Emission [Color] and -> Emission [Strength]
# variant (cloud card): Image [Alpha] -> Principled [Alpha]; m.surface_render_method = 'BLENDED'
p.data.materials.append(m)
p.scale.x *= -1                                         # mirror if the photo's sun side disagrees with the scene light
bpy.context.scene.world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.3   # ~ if copies over-brighten
```
raea (render time):
```tsx
{/* visible sky / window view: an unlit card; flip, tint and darken the JPG beforehand (no tint/mirror prop) */}
<ImagePlane src={staticFile("sky_overcast.jpg")} width={60} position={[0, 15, -60]} />
{/* light the room from the window */}
<RectLight color="#dfe9ff" transform={Transform.fromXyz(0, 1.5, -2.9).lookingAt([0, 0.5, 0])} intensity={120_000} width={2} height={1.6} />
{/* reflections + soft light instead of duplicated cards; no `background` in a dark-room shot */}
<Environment src={staticFile("sky_2k.hdr")} intensity={0.3} rotation={1.2} />
{/* lit + glow variant on a mesh */}
<Mesh3d transform={Transform.fromXyz(0, 8, -30)}>
  <Plane3d normal={[0, 0, 1]} half_size={[20, 11]} />
  <StandardMaterial base_color_texture={staticFile("sky.jpg")} emissive_texture={staticFile("sky.jpg")} emissive="#cccccc" />
</Mesh3d>
{/* bent sky: export the bent plane as GLB (modifier applied), cover with <StandardMaterial base_color_texture={staticFile("sky.jpg")} unlit /> */}
{/* cloud card: <ImagePlane src={staticFile("cloud.png")} width={8} ... /> with PNG alpha, faded in */}
// inside <Camera3d>: <DepthOfField focal_distance={heroDist} aperture_f_stops={2.8} />
```
ImagePlane faces +z by default (rotate to face the camera); its height comes from the picture's shape. A 1k–2k sky is soft on 9:16 anyway.

## NOTES
- Deprecated: Principled "Emission" → "Emission Color" (4.0+); EEVEE Legacy Blend Mode → `surface_render_method` ('DITHERED' / 'BLENDED'); MixRGB → Mix (RGBA).
- raea: ImagePlane and emissive meshes don't light neighbours (in Cycles emissive planes do) — use RectLight / Environment for light; `<Environment>` casts no shadows.
- Visual gaps: number of loop cuts, bend angle and axis (eevee-blender5); emission strengths (lighting-characters, crazy-renders); exact node setup and Alpha wiring (cyber-japan — leave Alpha off unless the photo has real alpha); plane sizes/distances — all `~`.
- Rule conflicts: dark-room default — exterior/window beats only, dim, blurred, not the accent colour; never show a cloud card's flat edge, fade it in; use licensed or own photos (generated plates are not pushed as stills); log in `00_bible/ASSET-SOURCES.md`.
