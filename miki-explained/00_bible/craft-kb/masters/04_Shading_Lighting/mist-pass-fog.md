---
title: Mist pass depth fog
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/mist-pass-background-fog--10-blender-tricks.md
  - cards/04_Shading_Lighting/mist-pass-depth-fog-masked--add-depth-renders.md
sources: ["10+ Blender Tricks That Will Make Your Renders Cinematic.txt", "How to Add DEPTH to Your Renders.txt"]
use_when: "background fog without render cost"
style_fit: Fits — the distant set fades into the dark-room colour so the macro object stays the only read; the Photoshop paint-over is outside our pipeline (raea finals, no paint-over) and becomes raea `<Fog>` + a placed `<FogVolume>`; fog that appears ramps in over ~0.4 s, never pops.
---

## METADATA
04_Shading_Lighting | Blender 3.x (source) → 5.3 compositor node group | Mist pass + Color Ramp + Mix → raea Fog / FogVolume

## CREATIVE_INTENT
Depth-based fog separates foreground from background and adds atmosphere without volumetric cost. The Mist pass is a 0–1 greyscale distance image; shaped by a ramp it becomes the factor that mixes a fog colour over the image — and used as a mask, it lets fog be placed only where wanted.
- 10-blender-tricks: the in-compositor version — Mist → Color Ramp → Mix over the beauty.
- add-depth-renders: Mist preview in the viewport, export the pass separately, and the "brush it in only where wanted" (ground fog) idea via a luminance mask in Photoshop.

## STE_PROCEDURE
1. In View Layer Properties › Passes › Data, enable Mist.
2. In World Properties › Mist Pass, set Start and Depth/End (source default 0 m → 100 m; trim to cover the scene) and Falloff.
3. Preview: Viewport Shading › Render Pass = Mist; adjust Start/End until the gradient covers the set.
4. In the Compositor, create/assign the compositing node group.
5. Connect Render Layers [Mist] → Color Ramp [Factor]; move ramp stops to set where fog starts and how thick it is.
6. Connect Color Ramp [Color] → Mix [Factor]; Render Layers [Image] → Mix [A]; fog colour → Mix [B].
7. Connect Mix [Result] → Group Output [Image].
8. Variant (export mask): Render Layers [Mist] → (Lens Distortion if used) → Denoise (if noisy) → File Output; save Mist separately from the beauty.
9. Variant (paint-over, Photoshop, reference only): select the Mist layer by luminance, mask a fog-colour layer, Curves on the mask for range, add an inverted mask and brush fog in where wanted, blend Screen or Lighten.
10. In raea: replace all of the above with `<Fog>` (distance) and a `<FogVolume>` only where fog is wanted.

## VALUES BY SOURCE
| parameter | 10-blender-tricks | add-depth-renders | recommended for Style D (+ why) |
|---|---|---|---|
| Mist start / depth | ~5 / ~25 m, falloff QUADRATIC | 0 / 100 m (default), tuned to scene | macro set: start just past the hero, depth = set depth |
| fog colour | ~(0.05, 0.05, 0.06) dark room | fog colour by eye (light/smoky) | the background colour (`#0d0d10`-ish) so the set dissolves into the room |
| shaping | Color Ramp stops | Photoshop Curves on mask | n/a in raea — use `near`/`far` |
| raea distance fog | `<Fog near={3} far={12}>` or `density={0.1}` | `<Fog near={2} far={10}>` | `near` just behind the hero, `far` < back wall; `far` must stay beyond the subject |
| placed fog | — | FogVolume ground fog 12×1.2×8, density 0.06, falloff 1, scattering 0.5, `#d8dde6` | only if the line needs ground haze |
| blend | Mix | Screen / Lighten | none needed — raea fog is additive scattering |

## AGENT_EXECUTION
Blender 5.3 (verified idnames; reference/preview only — Blender never renders finals):
```python
import bpy
scn = bpy.context.scene
scn.view_layers[0].use_pass_mist = True
m = scn.world.mist_settings; m.start, m.depth, m.falloff = 5.0, 25.0, 'QUADRATIC'   # ~

ng = bpy.data.node_groups.new("Comp", "CompositorNodeTree")
ng.interface.new_socket("Image", in_out="OUTPUT", socket_type="NodeSocketColor")
scn.compositing_node_group = ng                    # 5.x: replaces scene.node_tree / Composite node
rl = ng.nodes.new("CompositorNodeRLayers"); rl.scene = scn
ramp = ng.nodes.new("ShaderNodeValToRGB")          # Color Ramp (input socket "Factor" in 5.x)
mix = ng.nodes.new("ShaderNodeMix"); mix.data_type = 'RGBA'; mix.blend_type = 'MIX'
out = ng.nodes.new("NodeGroupOutput")
ng.links.new(rl.outputs["Mist"], ramp.inputs["Factor"])
ng.links.new(ramp.outputs["Color"], mix.inputs["Factor"])
ng.links.new(rl.outputs["Image"], mix.inputs[6])   # A (RGBA)
mix.inputs[7].default_value = (0.05, 0.05, 0.06, 1) # B = fog colour ~
ng.links.new(mix.outputs[2], out.inputs[0])         # Result (RGBA)

# variant: export the mist mask
dn = ng.nodes.new("CompositorNodeDenoise")
fo = ng.nodes.new("CompositorNodeOutputFile")      # set its directory/path in the UI or via its 5.x props
ng.links.new(rl.outputs["Mist"], dn.inputs["Image"]); ng.links.new(dn.outputs["Image"], fo.inputs[0])
```
Nodes: `Render Layers [Mist] -> Color Ramp [Factor]`, `Color Ramp [Color] -> Mix [Factor]`, `Render Layers [Image] -> Mix [A]`, `RGB fog -> Mix [B]`, `Mix [Result] -> Group Output [Image]`; mask variant `Render Layers [Mist] -> (Lens Distortion [Image]) -> Denoise [Image] -> File Output`.

raea (post.md):
```tsx
<AbsoluteFill style={{ background: "#0d0d10" }}>
  <Fog color="#0d0d10" near={3} far={12} />          {/* or exponential: density={0.1} */}
  {/* placed ground fog, the "brushed-in" part */}
  <VolumetricFog />
  <FogVolume name="groundfog" position={[0, 0, -3]} scale={[12, 1.2, 8]} density={fogIn * 0.06} falloff={1}
    scattering={0.5} color="#d8dde6" />
</AbsoluteFill>
```
`fogIn` = an eased 0→1 ramp over ~0.4 s from `useCurrentFrame()` (FogVolume density animates per frame; `<Fog>` does not).

## NOTES
- Deprecated: `scene.node_tree` / `scene.use_nodes` / `CompositorNodeComposite` → `scene.compositing_node_group` + Group Output (5.x); `CompositorNodeMixRGB` → `ShaderNodeMix` (data_type 'RGBA'); `CompositorNodeValToRGB` → `ShaderNodeValToRGB` with input "Factor" (was "Fac"). `compositing_node_group` itself warns of removal in 6.0.
- Visual gaps: Mist Start/Depth values and exact node wiring in 10-blender-tricks shown too fast to read (wiring above is the standard set-up, `~`); Photoshop curve shape and brush strokes shown, not described (~10:00–12:20).
- Rule conflicts: Photoshop paint-over is not AE (allowed) but our finals are raea renders with no paint-over — use raea fog. `<Fog>` values are the first frame's for the whole piece; animate FogVolume density instead, ramped ~0.4 s, never a pop.
