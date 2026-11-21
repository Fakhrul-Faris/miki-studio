---
title: Photo/video fire on an emissive keyed plane
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/photo-video-fire-emission-plane--emission-textures.md
  - cards/04_Shading_Lighting/video-fire-on-keyed-plane--beautiful-fire.md
sources: ["3 Ways To Make Stunning Emission Textures In Blender.txt", "How to Make Beautiful Fire in Blender.txt"]
use_when: "a stove or flame in an F&B shot without simulation"
style_fit: "Usable for a stove / 'money burning' beat, but raea's native volumetric <Fire> is the house route (circle-able, frame-exact, lit). The card route is front-on only; never pop the fire in — grow intensity over ~0.4 s."
---

## METADATA
04_Shading_Lighting | Blender 3.x–4.x → 5.x | Shader nodes → raea `<Fire>` / ImagePlane sprite sheet

## CREATIVE_INTENT
Real fire footage (or a photo) on a camera-facing emissive card, with black keyed to alpha, beats most simulations for
front-on shots and takes seconds; it breaks only when the camera circles or looks down on it.
- Emission textures adds: a photo on black is enough for a still flame; apply scale and re-unwrap so it isn't stretched;
  source Movie + Auto Refresh for motion.
- Beautiful fire adds: shoot your own slow-motion fire at night (black keys itself); Color Ramp key with lifted black
  stop; tint via Multiply; desaturate first for other colours; one clip → many fires via time offsets on single-user
  copies; bend a subdivided card to lick round an object; keep emission low and let a light carry the lighting.

## STE_PROCEDURE
1. Get a fire photo or video on black (stock, Unsplash, or your own slow-motion clip shot at night).
2. Add a Plane; rotate it 90° on X to face the camera.
3. Add a material; add an Image Texture with the photo (or Source Movie for video).
4. Apply scale (Ctrl+A › Scale) and unwrap (Cube Projection / Smart UV / Project from View); scale UVs until the flame fills the plane without stretching.
5. Link Image [Color] → Mix (Color, Multiply) [A]; set [B] to a rich orange to tint; Mix [Result] → Emission [Color].
6. For other colours: Hue/Saturation/Value Saturation 0 first, then multiply the new colour (or shift Hue).
7. Link Image [Color] → Color Ramp [Fac] → alpha (Mix Shader Fac between Transparent and Emission) so black turns transparent.
8. Lift the ramp's black stop slightly (~0.05) until the near-black edge line disappears.
9. For video: set Frames to the timeline length (e.g. 150), not the clip length; enable Cyclic and Auto Refresh.
10. Set Emission Strength so the card is visible but not the main light; add a matching light (see emissive-practical-plus-light).
11. For more fires: Shift+D, make the material single-user, raise Frames (~250) and set Offset (~50) per copy.
12. To wrap flames round an object: subdivide the plane and bend it with proportional editing, Correct Face Attributes off.
13. Keep the shot front-on; avoid orbits and top-down views (or use raea `<Fire>` instead).

## VALUES BY SOURCE
| parameter | Emission textures | Beautiful fire | recommended for Style D (+ why) |
|---|---|---|---|
| Source | photo on black (Unsplash) or video | stock/phone slow-mo video at night | raea `<Fire>` first; footage only for a specific real flame |
| Alpha key | Color Ramp → Alpha | Color Ramp, black stop lifted ~0.05 | same |
| UV | apply scale + Smart UV / Project from View | Cube Projection, scale UVs to clip | Cube Projection, scaled |
| Tint | — | Mix Multiply B ≈ (1.0, 0.45, 0.1) | match the stove/flame colour; keep it out of the brand accent unless fire IS the line |
| Emission | — | ~3, lowered to "visible" | low; light carried by a PointLight |
| Frames / offset | 240, cyclic | 150 (timeline length); copies 250 / offset 50 | — (raea: vary `seed`) |
| raea | `<Fire>` preferred | `<Fire scale 0.3 intensity 6 opacity 1.5 light 0>` or sprite-sheet ImagePlane | `<Fire>`; intensity 4–6 for a small stove flame (post.md) |

## AGENT_EXECUTION
Blender (build / reference only):
```python
import bpy, math
bpy.ops.mesh.primitive_plane_add(size=1, rotation=(math.radians(90), 0, 0))
p = bpy.context.object
bpy.ops.object.transform_apply(scale=True)
m = bpy.data.materials.new("Fire"); m.use_nodes = True; p.data.materials.append(m)
nt = m.node_tree; N = nt.nodes; N.remove(N["Principled BSDF"])
vid = N.new("ShaderNodeTexImage"); vid.image = bpy.data.images.load("//media/fire_slowmo.mp4")   # or a photo
vid.image.source = 'MOVIE'
iu = vid.image_user; iu.frame_duration = 150; iu.use_cyclic = True; iu.use_auto_refresh = True; iu.frame_offset = 0
mix = N.new("ShaderNodeMix"); mix.data_type = 'RGBA'; mix.blend_type = 'MULTIPLY'
mix.inputs[0].default_value = 1.0; mix.inputs[7].default_value = (1.0, 0.45, 0.1, 1)   # B = orange ~
em = N.new("ShaderNodeEmission"); em.inputs["Strength"].default_value = 3              # ~
ramp = N.new("ShaderNodeValToRGB"); ramp.color_ramp.elements[0].position = 0.05        # ~ lift black stop
tr = N.new("ShaderNodeBsdfTransparent"); mixs = N.new("ShaderNodeMixShader")
nt.links.new(vid.outputs["Color"], mix.inputs[6])          # A
nt.links.new(mix.outputs[2], em.inputs["Color"])
nt.links.new(vid.outputs["Color"], ramp.inputs["Fac"])
nt.links.new(ramp.outputs["Color"], mixs.inputs["Fac"])
nt.links.new(tr.outputs[0], mixs.inputs[1]); nt.links.new(em.outputs[0], mixs.inputs[2])
nt.links.new(mixs.outputs[0], N["Material Output"].inputs["Surface"])
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.uv.cube_project(); bpy.ops.object.mode_set(mode='OBJECT')
# variation copy (single-user material): iu.frame_duration = 250; iu.frame_offset = 50
```
Links: `Image [Color] -> Mix(Multiply) [A] -> Emission [Color]`; `Image [Color] -> Color Ramp [Fac]`; `Color Ramp [Color]
-> Mix Shader [Fac]`; `Transparent -> Mix Shader [1]`, `Emission -> Mix Shader [2]` (the video says "run the colour into
the alpha" without naming the shader; this Mix Shader is the standard equivalent, `~`). Emission-textures variant:
Color Ramp output straight into a Principled BSDF's Alpha with the image in Emission Color.

raea:
```tsx
const grow = interpolate(f, [on, on + 12], [0, 6], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
<Fire name="stove" position={[0, 0.02, 0]} scale={0.3} intensity={grow} color="#ff7a1f" seed={3} opacity={1.5} light={0} />
<PointLight transform={Transform.fromXyz(0, 0.1, 0.15)} color="#ffb070" intensity={150000} range={3} radius={0.1} />
```
- `<Fire>` is a real volume (the camera can circle it); vary `seed` per copy instead of time offsets; keep `scale` fixed
  and grow `intensity` (post.md). `light={0}` when you place your own light (on the camera side near a wall).
- Footage route: export the keyed clip to a transparent PNG sprite sheet and show it on an `<ImagePlane>` (sprite
  sheets `grid`, `frame` — limits.md); ImagePlane is unlit. No in-scene video texture is documented.

## NOTES
- Deprecated: "Mix RGB" → Mix node (Data Type Color, Blend Multiply), 3.4+.
- Visual gaps: node wiring for alpha, UV scale/crop and exact ramp positions are shown on screen only.
- Rule conflicts: none; never pop the fire in — grow `intensity` over ~0.4 s. Keep footage cards front-on.
