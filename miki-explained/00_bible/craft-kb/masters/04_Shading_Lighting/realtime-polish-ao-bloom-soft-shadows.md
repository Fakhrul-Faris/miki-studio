---
title: Real-time render polish — AO, bloom, soft shadows
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/eevee-polish-soft-shadows-ao-bloom--ten-cinematic-tips.md
  - cards/05_Camera_Raea_Pipeline/realtime-render-settings-ao-bloom-soft-shadows--lighting-characters.md
sources: ["10 Tips to make Your 3D Render more Cinematic.txt", "Lighting 3D Characters for Storytelling.txt"]
use_when: "base raea look settings for every episode"
style_fit: Fits Style D — maps 1:1 onto raea's Bloom / soft shadows / Shadows / AmbientOcclusion, set once per piece after lighting is right (BlendShot already sets these). AO does nothing for scenes lit only by spots — add a little AmbientLight or an Environment.
---

## METADATA
04_Shading_Lighting | 2.8–3.x EEVEE Legacy (source) → EEVEE Next 4.2+/5.x and raea | Blender bpy + raea

## CREATIVE_INTENT
A handful of engine settings, set once after the lighting is right and left for the whole piece, remove the cheap real-time look: AO seats objects in their surroundings, bloom makes glints and bright parts glow, higher shadow resolution and soft shadows make shadows convincing. Reflections only matter with reflective materials. Change lights, not render settings, between shots.
- ten-cinematic-tips: order (light first, polish after), concrete AO Distance 2 / Factor 2, shadow cube 2048 / cascade 4096, moderate samples, resolution 100 %.
- lighting-characters: "set once for every scenario", bloom for specular glints, and the raea baseline with a short `<Shadows distance>` for macro sets.

## STE_PROCEDURE
1. Finish the lighting first.
2. Enable Ambient Occlusion; raise Distance/Factor a little (source: Distance 2, Factor 2, scene-scale dependent).
3. Enable Bloom so bright parts and specular glints glow; tune it.
4. Enable Soft Shadows (expect a slower viewport).
5. Increase shadow resolution (cube and cascade size).
6. Enable Screen Space Reflections only if the scene has reflective materials.
7. Raise render samples moderately; set Resolution % to 100.
8. Keep these settings for the whole piece; change lights, not render settings, between shots.

## VALUES BY SOURCE
| parameter | ten-cinematic-tips | lighting-characters | recommended for Style D (+ why) |
|---|---|---|---|
| AO | GTAO distance 2, factor 2 | GTAO distance ~1.0 | `<AmbientOcclusion quality="medium" thickness={0.25} />`; "high" on carved/close-ups (EEVEE values don't map 1:1 to `thickness` metres) |
| bloom | on, tuned | on for glints | `<Bloom intensity={0.45–0.6} threshold={0.85–0.9} />` — only emissive/hot highlights bloom |
| shadow resolution | cube 2048, cascade 4096 | cube 2048, cascade 2048 | `<Shadows mapSize={4096} distance={8} firstCascade={1.5} />` — short distance on macro sets |
| soft shadows | on | on | spot `soft_shadows_enabled radius={0.4}` or sun `soft_shadow_size` |
| SSR | off unless reflective | off unless reflective | n/a (raea reflections come from Environment) |
| samples | moderate (~64) | — | n/a |

## AGENT_EXECUTION
Blender 3.x as in the source (EEVEE Legacy — these props no longer exist in 5.x):
```python
# e = scene.eevee; e.use_bloom = True; e.use_soft_shadows = True; e.shadow_cube_size = '2048'
# e.shadow_cascade_size = '4096'; e.use_gtao = True; e.gtao_distance = 2; e.gtao_factor = 2; e.use_ssr = False
```
Blender 5.3 (EEVEE Next; preview only, verified props):
```python
import bpy
scn = bpy.context.scene; e = scn.eevee
e.shadow_resolution_scale = 1.0          # replaces cube/cascade sizes
e.use_fast_gi = True; e.fast_gi_distance = 2.0   # horizon scan replaces GTAO (~)
e.use_raytracing = False                 # replaces SSR; True only for reflective scenes
for L in bpy.data.lights: L.shadow_soft_size = max(L.shadow_soft_size, 0.25)   # soft shadows are per light
scn.render.resolution_percentage = 100
# bloom → compositor Glare node
ng = scn.compositing_node_group or bpy.data.node_groups.new("Comp", "CompositorNodeTree")
if not ng.interface.items_tree:
    ng.interface.new_socket("Image", in_out="OUTPUT", socket_type="NodeSocketColor")
scn.compositing_node_group = ng
rl = ng.nodes.new("CompositorNodeRLayers"); rl.scene = scn
gl = ng.nodes.new("CompositorNodeGlare"); gl.inputs["Type"].default_value = "Bloom"
out = ng.nodes.new("NodeGroupOutput")
ng.links.new(rl.outputs["Image"], gl.inputs["Image"]); ng.links.new(gl.outputs["Image"], out.inputs[0])
```
raea (the renderer; one set, the first frame's values hold for the piece):
```tsx
<AmbientLight brightness={30} />                            {/* AO only shades Ambient/Environment light */}
<AmbientOcclusion quality="medium" thickness={0.25} />
<Bloom intensity={0.6} threshold={0.9} />
<Shadows mapSize={4096} distance={8} firstCascade={1.5} />
<SpotLight transform={Transform.fromXyz(0, 3, 0.6).lookingAt([0, 0, 0])} intensity={2_700_000}
  outer_angle={0.45} inner_angle={0.22} shadow_maps_enabled soft_shadows_enabled radius={0.4} />
```
With `<AmbientOcclusion>` MSAA can't run; SMAA takes over (thin wires shimmer more). BlendShot already sets this baseline.

## NOTES
- Deprecated: EEVEE Legacy `use_bloom`, `use_soft_shadows`, `use_gtao`/`gtao_distance`/`gtao_factor`, `use_ssr`, `shadow_cube_size`/`shadow_cascade_size` are gone in EEVEE Next → bloom = compositor Glare (Type "Bloom", a menu socket in 5.x), soft shadows per light (`shadow_soft_size` / jitter), `shadow_resolution_scale`, horizon scan (`fast_gi_*`), `use_raytracing`. `scene.node_tree` → `scene.compositing_node_group`.
- Visual gaps: exact AO distance not given in lighting-characters.
- Rule conflicts: none; AO needs an AmbientLight or Environment in raea to show.
