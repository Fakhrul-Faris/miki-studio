---
title: Blockers / off-screen casters to contain light
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/light-blockers-contain-bright-light--dark-environments.md
  - cards/04_Shading_Lighting/offscreen-shadow-casters--good-lighting-environments.md
sources: ["How to Make DARK Environments in Blender.txt", "How to get good lighting in blender.srt", "The Only Product Lighting Video You'll Ever Need (Blender Tutorial).txt"]
use_when: "keeping a bright light only where the line needs it, or a deliberate one-sided gradient shadow across the hero itself"
style_fit: "Strong fit: keeps the single top light on the hero only and darkens frame edges; raea's `<Mesh3d shadow=\"only\">` is a direct equivalent. A moving caster moves slowly on an eased path."
---

## METADATA
04_Shading_Lighting | Blender 3.x–4.x → 5.x / raea | Blender bpy + raea

## CREATIVE_INTENT
Bright light stays dramatic only if it lands just where you want it. Narrow the cone, then put objects in the light's
path that the camera can't see — duplicated pillars/props, a flag, a tree off-screen, a noise-alpha plane — so their
shadow cuts the spill and darkens a distracting bright area; the light is "revealed" only where attention belongs.
- Dark environments adds: narrow cone first; duplicate scene objects off-camera into the beam; a noise-alpha plane breaks
  the beam into patches; toggle the blockers off to see how much they hold back.
- Good lighting adds: target a bright foreground competing with the subject; any duplicated object hidden from camera
  but casting; subtle; off-screen casters also give dappled, motivated shadows in sunny scenes.

## STE_PROCEDURE
1. Identify the bright area that pulls attention from the subject (or the spill beyond where the line needs light).
2. Before raising the key, narrow its cone so it doesn't spread far.
3. Duplicate an existing scene object (pillar, prop, tree, cube) or add a flag.
4. Hide the duplicate from the camera while keeping its shadow (Ray Visibility: Camera off, Shadow on).
5. Move it between the light and the area to darken; adjust until its shadow covers the unwanted brightness.
6. Optional: add a plane in front of the light with Noise Texture → Color Ramp → Alpha to break the beam into patches (see gobo master).
7. Repeat for smaller distracting highlights.
8. Toggle the blockers off to confirm how much they hold back; keep them on, and keep the effect subtle.
9. (from The Only Product Lighting Video) Variant: use the same mechanism as a deliberate in-frame look rather than
   spill control — rake one Area light across the hero's own surface (e.g. RX 90, RZ 45), place a plain plane between
   the light and the hero as the blocker, and toggle its visibility to compare before/after; one side of the hero
   reads darker in a soft directional gradient (not a hard edge). Add a second blocker on the opposite side for a
   two-sided variant.

## VALUES BY SOURCE
| parameter | Dark environments | Good lighting | Only Product Lighting Video | recommended for Style D (+ why) |
|---|---|---|---|---|
| Light | narrow Spot, bright (raea 3,000,000, outer 0.3 / inner 0.15) | Sun | one Area lamp raking across the hero (RX 90, RZ 45) | soft top SpotLight, narrow cone |
| Blocker | duplicated pillar (linked data), noise-alpha plane size ~6 at z 5 | duplicated tree/rock/cube off-screen | plain plane between light and hero, toggled on/off | `shadow="only"` Cuboid flags / Manifold with holes |
| Visibility | `visible_camera = False` | `visible_camera = False`, `visible_shadow = True` | toggled visibility to A/B before/after | raea `shadow="only"` |
| Use case | off-screen spill control | off-screen spill control | deliberate one-sided (or two-sided) gradient shadow ON the hero's own surface, as a stylistic look | spill control is the default use; the in-frame hero-gradient variant is a look choice, applied the same way but positioned to graze the hero |
| Noise | Scale ~3, ramp contrast | — | — | geometry gobo (alpha shadows unverified in raea) |
| Motion | static | slow (cloud passing) | static | static, or slow eased drift |

## AGENT_EXECUTION
Blender:
```python
import bpy
# duplicate a scene object as an unseen blocker (linked data)
p = bpy.data.objects["Pillar"]
blk = p.copy(); blk.data = p.data; blk.name = "Blocker_L"; bpy.context.collection.objects.link(blk)
blk.location = (3.0, -6.0, 0)        # ~ between light and the area to darken
blk.visible_camera = False           # Object > Visibility > Ray Visibility > Camera off
blk.visible_shadow = True
# optional noise-alpha plane to break the beam
bpy.ops.mesh.primitive_plane_add(size=6, location=(0, 0, 5))
g = bpy.context.object; mat = bpy.data.materials.new("GoboNoise"); mat.use_nodes = True
N, L = mat.node_tree.nodes, mat.node_tree.links; bsdf = N["Principled BSDF"]
nz = N.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 3.0     # ~
cr = N.new('ShaderNodeValToRGB')                                              # ~ contrast the mask
L.new(nz.outputs['Fac'], cr.inputs['Fac']); L.new(cr.outputs['Color'], bsdf.inputs['Alpha'])
mat.surface_render_method = 'DITHERED'
g.data.materials.append(mat); g.visible_camera = False
```
Links: `Noise Texture [Fac] -> Color Ramp [Fac]`; `Color Ramp [Color] -> Principled BSDF [Alpha]`.

raea (`shadow="only"` casts without being drawn, and also blocks shafts in fog — lights.md):
```tsx
<SpotLight transform={Transform.fromXyz(0, 4, 1).lookingAt([0, 0, 0])} intensity={3_000_000}
  outer_angle={0.3} inner_angle={0.15} shadow_maps_enabled />
<Mesh3d name="blocker" shadow="only" transform={Transform.fromXyz(1.2, 2, 0)}>
  <Cuboid half_size={[0.3, 2, 0.3]} />
  <StandardMaterial base_color="#000000" />
</Mesh3d>
<Mesh3d name="flag" shadow="only" transform={Transform.fromXyz(3, 2, -6)}>
  <Cuboid half_size={[1.5, 1.5, 0.05]} />
  <StandardMaterial base_color="#000000" />
</Mesh3d>
```
Works with DirectionalLight / SpotLight / PointLight that have `shadow_maps_enabled`; not with `<Environment>` (it casts
no shadows). Noise-patterned gobo: build geometry with holes (gobo-shadow-patterns master); alpha-mask shadow casting in
raea is unverified.

## NOTES
- Deprecated: `Object.cycles_visibility` (pre-3.0) → `Object.visible_camera` etc.; legacy EEVEE (≤4.1) had no
  per-object camera-ray visibility (holdout / `hide_render` workarounds); EEVEE Legacy alpha blend modes → Render Method Dithered.
- Visual gaps: caster positions and the noise plane's material values are not narrated.
- Rule conflicts: none; if a caster moves (a passing cloud), move it slowly on an eased path.
