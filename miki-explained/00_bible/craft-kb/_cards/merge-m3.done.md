# merge-m3 — done (19 masters, 04_Shading_Lighting)

| topic | master | members |
|---|---|---|
| light-falloff-distance | masters/04_Shading_Lighting/light-falloff-distance.md | 2 |
| light-linking | masters/04_Shading_Lighting/light-linking.md | 4 |
| light-orbit-3d-cursor-pivot | masters/04_Shading_Lighting/light-orbit-3d-cursor-pivot.md | 2 |
| light-range-cutoff | masters/04_Shading_Lighting/light-range-cutoff.md | 2 |
| light-softness-size-distance | masters/04_Shading_Lighting/light-softness-size-distance.md | 2 |
| light-stack-one-at-a-time | masters/04_Shading_Lighting/light-stack-one-at-a-time.md | 2 |
| mist-pass-fog | masters/04_Shading_Lighting/mist-pass-fog.md | 2 |
| negative-fill | masters/04_Shading_Lighting/negative-fill.md | 2 |
| one-dominant-light | masters/04_Shading_Lighting/one-dominant-light.md | 4 |
| photo-emissive-neon-cutouts | masters/04_Shading_Lighting/photo-emissive-neon-cutouts.md | 3 |
| photo-sky-backdrop-plane | masters/04_Shading_Lighting/photo-sky-backdrop-plane.md | 6 |
| photo-textured-light-shapers | masters/04_Shading_Lighting/photo-textured-light-shapers.md | 2 |
| practical-light-inside-object | masters/04_Shading_Lighting/practical-light-inside-object.md | 2 |
| realtime-polish-ao-bloom-soft-shadows | masters/04_Shading_Lighting/realtime-polish-ao-bloom-soft-shadows.md | 2 |
| sun-side-or-behind | masters/04_Shading_Lighting/sun-side-or-behind.md | 3 |
| texture-self-masked-mix | masters/04_Shading_Lighting/texture-self-masked-mix.md | 2 |
| three-point-lighting | masters/04_Shading_Lighting/three-point-lighting.md | 3 |
| volume-haze-cube | masters/04_Shading_Lighting/volume-haze-cube.md | 15 |
| warm-cool-mood | masters/04_Shading_Lighting/warm-cool-mood.md | 2 |

## Blender 5.3 API facts confirmed on this machine (`blender -b`, 5.3.0) — candidates for BPY-CHECK.md
- Compositor: `bpy.data.node_groups.new(name, "CompositorNodeTree")` + `ng.interface.new_socket("Image", in_out="OUTPUT", socket_type="NodeSocketColor")` + `scene.compositing_node_group = ng`; output is `NodeGroupOutput` (`CompositorNodeComposite` is gone). `compositing_node_group` itself warns of removal in 6.0.
- `CompositorNodeMixRGB` and `CompositorNodeValToRGB` are gone → `ShaderNodeMix` (data_type 'RGBA'; A/B = inputs[6]/[7], Result = outputs[2]) and `ShaderNodeValToRGB` (input renamed "Fac" → "Factor").
- Glare: type is a menu socket — `glare.inputs["Type"].default_value = "Bloom"` (not `glare_type = 'BLOOM'`).
- Color Balance: `inputs["Type"].default_value = "Offset/Power/Slope (ASC-CDL)"`; Slope colour = `inputs[14]` (no `.correction_method` / `.slope` props).
- Sky Texture enums: SINGLE_SCATTERING, MULTIPLE_SCATTERING, PREETHAM, HOSEK_WILKIE.
- `Object.light_linking.receiver_collection / blocker_collection`, light `use_custom_distance / cutoff_distance`, light node trees (`Emission` + `Light Output`), `scene.eevee.volumetric_tile_size`, `shadow_resolution_scale`, `fast_gi_distance`, `use_raytracing` all exist. `Material.use_nodes` / `World.use_nodes` warn of removal in 6.0 (node trees exist by default).
- Smoke-tested snippets: polish (Glare bloom), warm-cool (Color Balance), haze cube, sun/sky/HDRI, light nodes, neon cut-out + light linking + cutoff — all PASS.

## Notes
- No member card edited or deleted. Values that disagreed are kept per source in VALUES BY SOURCE, with a Style D pick and a reason.
- Dropped one invalid raea prop: `range` on `RectLight` (in the practical-light-inside-object member card) — it is documented only for Point/Spot. Noted in that master.
- raea light linking: none documented; `layers` (limits.md) left as "untested, verify on a still".
