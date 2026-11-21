---
title: "Gobos: alpha planes for patterned/moving shadows"
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/gobo-alpha-plane-shadow-pattern--power-of-lighting.md
  - cards/04_Shading_Lighting/lighting-gobo-alpha-plane--serene-render.md
  - cards/04_Shading_Lighting/lighting-gobo-blocker-plane--lighting-secrets.md
  - cards/04_Shading_Lighting/noise-alpha-cloud-shadow-gobo--renders-instantly-cooler.md
sources: ["The Power of LIGHTING in Blender!.txt", "Making a SERENE render in blender.txt", "5 Lighting SECRETS in Blender.txt", "6 Tips to Make Your Renders Instantly Cooler.txt", "This Lighting Trick Changed My Life....txt", "Modern Lighting Techniques in Blender.txt"]
use_when: "window blinds, leaves or drifting cloud shadows across the set"
style_fit: "Breaks Style D's one soft top light into motivated patches (blinds, leaves) without adding a second light; in raea build the gobo as real shadow-only geometry. Any drift is slow and eased; never flicker."
---

## METADATA
04_Shading_Lighting | Blender 3.x–4.x → 5.x / raea | Shader nodes + Blender bpy → raea shadow-only geometry

## CREATIVE_INTENT
When the light's direction and softness are right but the frame is flat, put a hidden shape between the light and the
set: its holes carve the light into patches — sun through leaves, window blinds, drifting clouds. It suggests an
off-screen world, darkens what the line isn't about and spotlights the hero. The viewer should not be able to tell what
the blocker is (unless it is a deliberate blind/leaf read).
- Power of Lighting adds: alpha image (leaves, blinds) on a plane; close to light = softer, close to subject = sharper; gobo add-ons have animated presets.
- Serene render adds: finalise the key first; one plane covering the whole scene (any photo, e.g. water, or Noise); real objects (tree, props) work too; keep it subtle for a peaceful dappled mood.
- Lighting secrets adds: Noise → high-contrast Color Ramp → Alpha; lower overall alpha so the scene isn't fully dark; light distance and Radius set softness (not the mask); parent the plane to the light.
- Renders instantly cooler adds: Texture Coordinate → Mapping on the Noise; keyframe Mapping Location to drift cloud shadows; ramp stops together = hard edges, apart = soft; works at any scale.

## STE_PROCEDURE
1. Before adding a gobo, finalise the key light's direction, shape and softness.
2. Use a Spot (Sun or Area also work); raise Power so it covers the area; set Radius > 0 and raise Spot Blend.
3. Add a Plane between the light and the scene, large enough to cover the whole lit area.
4. Give it a material: Image Texture (leaves, blinds, water photo) or Noise Texture → Color Ramp → Principled BSDF [Alpha].
5. For Noise, add Texture Coordinate [Object] → Mapping → Noise [Vector] (Ctrl+T with Node Wrangler).
6. Drag the Color Ramp stops together for hard edges, apart for soft ones; raise contrast until patches of light appear.
7. Raise Noise Detail and Roughness slightly.
8. Lower overall alpha until the plane casts shadow but the scene isn't fully dark.
9. Before the alpha shadows work in EEVEE, set Material › Render Method = Dithered (4.2+).
10. Hide the plane from the camera (Object › Visibility › Camera off).
11. Set softness by light distance/Radius and plane position (close to light = softer, close to subject = sharper), not by the mask.
12. Keep Radius large enough that the blocker's shape is unreadable; sharp (Radius ~0) only for deliberate leaf/tree shadows.
13. For an image blocker, UV-unwrap the plane (Cube Projection) and scale UVs.
14. Parent the plane to the light (Ctrl+P → Object (Keep Transform)) so they move together.
15. To animate, keyframe Mapping Location (or the plane/blocker transform) for a slow drift.
16. Alternatively place real objects (a tree, props, blind slats) in front of the light; optionally combine with an image-textured light.
17. (from lighting-trick) Variant with no plane: build the gobo *inside the light's own node tree* — Area light,
    Spread 1° ("hones the light in like a spotlight," Cycles only), Use Nodes on the light, select Emission,
    Ctrl+T, swap the generated Image Texture for a Noise Texture, then a Color Ramp to crunch it into moody patches;
    judge the pattern in the light node preview's checkered-floor view before rendering.
18. (from modern-lighting-techniques) Area-light Spread is an independent sharpness control for the same blocker
    gobo: a black-and-white cut-out (e.g. a leaf/plant PNG) in front of an area light reads as a crisp, solid
    silhouette at Spread = 1° and fully disappears into soft wash by Spread = 10°; use Spread as a second knob
    alongside plane distance when tuning how readable the blocker shape is.

## VALUES BY SOURCE
| parameter | Power of Lighting | Serene render | Lighting secrets | Instantly cooler | lighting-trick | modern-lighting-techniques | recommended for Style D (+ why) |
|---|---|---|---|---|---|---|---|
| Pattern | alpha image (leaves, blinds) | water photo or Noise | Noise (Detail ~6, Roughness ~0.6) or image | Noise Scale ~3, Object coords + Mapping | Noise Texture → Color Ramp, built inside the light's Emission node tree (no plane) | B/W leaf/plant PNG cut-out blocker in front of an area light | blind slats or leaf cut-out (motivated, reads as a world off-screen) |
| Ramp | — | — | stops ~0.45 / 0.55 (hard contrast) | stops ~0.45 / 0.6 | crunches noise into dramatic moody patches (visual only) | — | soft (stops apart) — shape unreadable unless deliberate |
| Light | any | key spot | Spot ~3,000 W, Radius ~0.3, Blend ~0.6 | top-down Sun | Area, **Spread 1°** (narrows light like a spot), Cycles-only node tree | Area light; **Spread** is the sharpness control (1°=hard/solid, 10°=invisible) | the existing soft top SpotLight, `radius` ~0.3 |
| Plane | between light and subject | size ~12 at z ~8 (~) | size ~4 at z ~2.5, parented to light | above scene | none — pattern lives in the light's own nodes | blocker PNG placed in front of the light, no plane material path described | covers the lit area, shadow-only |
| Motion | animated gobo add-on | — | — | Mapping X 0 → 0.5 over 240 f | — | — | slow eased drift only |
| Render method | Dithered (4.2+) | Dithered | Hashed (Legacy) → Dithered | Alpha Blend/Hashed (Legacy) → Dithered | Cycles-only light nodes (EEVEE ignores them) | not stated | n/a in raea (geometry gobo) |

## AGENT_EXECUTION
Blender (build/preview):
```python
import bpy
bpy.ops.object.light_add(type='SPOT', location=(0, 0, 4))
light = bpy.context.object
light.data.energy = 3000; light.data.shadow_soft_size = 0.3; light.data.spot_blend = 0.6   # ~
bpy.ops.mesh.primitive_plane_add(size=4, location=(0, 0, 2.5)); plane = bpy.context.object; plane.name = "Gobo"
mat = bpy.data.materials.new("Gobo"); mat.use_nodes = True; plane.data.materials.append(mat)
N, L = mat.node_tree.nodes, mat.node_tree.links; bsdf = N["Principled BSDF"]
tc = N.new("ShaderNodeTexCoord"); mp = N.new("ShaderNodeMapping")
nz = N.new("ShaderNodeTexNoise"); nz.inputs["Scale"].default_value = 3.0
nz.inputs["Detail"].default_value = 6; nz.inputs["Roughness"].default_value = 0.6       # ~
cr = N.new("ShaderNodeValToRGB")
cr.color_ramp.elements[0].position = 0.45; cr.color_ramp.elements[1].position = 0.55   # ~ together = hard
L.new(tc.outputs["Object"], mp.inputs["Vector"]); L.new(mp.outputs["Vector"], nz.inputs["Vector"])
L.new(nz.outputs["Fac"], cr.inputs["Fac"]); L.new(cr.outputs["Color"], bsdf.inputs["Alpha"])
# image variant: img = N.new("ShaderNodeTexImage"); img.image = bpy.data.images.load("//media/gobo_leaves.png")
#                L.new(img.outputs["Color"], cr.inputs["Fac"])   (or straight into Alpha)
mat.surface_render_method = 'DITHERED'           # EEVEE Next: alpha casts shadows
plane.visible_camera = False
plane.parent = light; plane.matrix_parent_inverse = light.matrix_world.inverted()       # = Ctrl+P Keep Transform
# slow drift
mp.inputs["Location"].default_value[0] = 0.0; mp.inputs["Location"].keyframe_insert("default_value", frame=1)
mp.inputs["Location"].default_value[0] = 0.5; mp.inputs["Location"].keyframe_insert("default_value", frame=240)
```
Links: `Texture Coordinate [Object] -> Mapping [Vector] -> Noise Texture [Vector]`; `Noise [Fac] -> Color Ramp [Fac]`;
`Color Ramp [Color] -> Principled BSDF [Alpha]` (image variant: `Image Texture [Color] -> Color Ramp [Fac]` or `-> [Alpha]`).

raea (no light cookie; build the gobo as real geometry that casts, `shadow="only"` = casts without being drawn):
```tsx
// module level: a board with round holes (leaf-like dapple) — or blind slats as separate thin Cuboids
const GOBO = manifold.difference(
  manifold.box(4, 0.02, 4),
  ...[[-1, 0.6], [0.4, -0.8], [1.1, 1.2], [-0.5, -1.4]].map(([x, z]) => manifold.sphere(0.35).move(x, 0, z)),
);
const drift = interpolate(f, [0, 240], [0, 0.5], { easing: Easing.inOut(Easing.sin) });
<Mesh3d name="gobo" shadow="only" shape={GOBO} transform={Transform.fromXyz(drift, 2.6, 0)}>
  <StandardMaterial base_color="#000000" />
</Mesh3d>
<SpotLight transform={Transform.fromXyz(0, 4, 0.5).lookingAt([0, 0, 0])} intensity={2_500_000}
  outer_angle={0.5} inner_angle={0.25} radius={0.3} soft_shadows_enabled shadow_maps_enabled />
<Shadows distance={20} firstCascade={3} />
```
- Softness: SpotLight `radius` with `soft_shadows_enabled` (PCSS; larger = softer); a sun: `DirectionalLight soft_shadow_size` (5 for a big soft key).
- Sky scale: `<Cloud>` volumes cast drifting soft shadows into the sun's maps (post.md "Clouds, smoke and contrails"); soften with the sun's soft shadow 2–4.
- Volumetric shafts through the slats come free with a `volumetric` light + `<VolumetricFog>` + `<FogVolume>`.
- Whether an image-alpha plane (`alpha_mode={{ Mask: 0.5 }}` + `base_color_texture`) masks the shadow map is not documented — test on a still before relying on it.
- Leaf cut-outs from an image: redraw the outlines as geometry in Blender, export GLB, use `<Model>` (a `<Mesh3d shadow="only">` cut-out mesh works the same).

## NOTES
- Deprecated: EEVEE Legacy Blend Mode / Shadow Mode (Alpha Blend / Alpha Hashed, `mat.blend_method`) → EEVEE Next 4.2+
  Material › Render Method (`surface_render_method` 'DITHERED'/'BLENDED'); shadows follow alpha in Dithered.
- Visual gaps: plane size/distance, images, ramp handle positions and noise scale are shown, not stated (`~`).
- Rule conflicts: drift must be slow and eased, never flicker. The gobo breaks the one top light; it doesn't add a second.
- lighting-trick: Cycles-only light node trees have no EEVEE/raea equivalent — keep the raea route as the existing
  shadow-only geometry gobo; use the checkered-floor node preview in Blender only, as a judging aid during build.
  Also introduces a logo-catch point light accent, tracked as its own card (not folded here).
- modern-lighting-techniques: confirms area-light Spread as a real, usable second softness knob — for a `RectLight`
  gobo rig (vs. `SpotLight`), map Spread→1°(hard) through 10°(invisible) onto the RectLight's width/height-to-distance
  ratio (smaller apparent size = harder edge). Doesn't change the Style D pick (SpotLight `radius`/`inner_angle`
  stays primary); this is an alternate control path when a RectLight-based rig is used instead.
