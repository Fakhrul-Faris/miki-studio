---
title: Glow / bloom on highlights (glare, light wrap)
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/blur-screen-glow-layer--special-look.md
  - cards/05_Camera_Raea_Pipeline/glare-node-glow--10-blender-tricks.md
  - cards/05_Camera_Raea_Pipeline/glow-and-light-wrap-glow-rule-half--advanced-comp-nuke-wk1.md
sources: ["How to Add That Special Look To Your Renders.txt", "10+ Blender Tricks That Will Make Your Renders Cinematic.txt", "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt", "Animate Light to Control Your Viewer | After Effects (No Plugins).txt"]
use_when: "glints on metal and lit signs"
style_fit: Direct fit — Style D bloom on the hottest highlights and the one accent/emissive only, at a level nobody notices unless told (glow rule: find it, then halve it). No streak/star flares (flashy; and no raea equivalent). UI kept crisp with `skip={["ui"]}`; threshold never 0.
---

## METADATA
05_Camera_Raea_Pipeline | Photoshop / Blender 3.x compositor / Nuke sources → 5.x compositor (look-dev) | raea Bloom + emissive

## CREATIVE_INTENT
A soft glow bleeding from the brightest areas (lens diffusion, "Orton effect", glare) sells light intensity and a filmic lens
and makes renders feel finished — but only from the brights, and with restraint.
- Special Look: duplicate + Gaussian blur + Screen, limited to brights with Blend If; apply before the main grade (the grade looks better with glow under it).
- 10 Blender Tricks: Glare node (Fog Glow; Streaks for flares) on the brightest pixels, Threshold raised until only highlights glow.
- Advanced Comp Nuke: glow comes from the lens; key only the highlights from the upstream plate, exponential falloff, merge plus (or over), then the "glow rule": dial to just right and cut it in half — not a crutch to hide edges.

## STE_PROCEDURE
1. Check the plate/reference for its glow amount before adding any.
2. Decide what may glow: hot highlights and real emissive sources (screen, LED, lit sign, the accent) only.
3. Key only the brightest pixels (Blend If dark handle / Glare Threshold / luminance key / raea `threshold` 0.8–1).
4. Key from the original (upstream) image, not downstream of grades, so later grades don't change the key.
5. Build the glow with a large-radius, natural-falloff (exponential / fog glow) blur.
6. Combine with Screen/plus; use "over" if the glow must not brighten its surroundings.
7. Split the Blend If handle (Alt-drag) or soften the key for a gradual falloff; optionally brush the glow into bright areas only.
8. Apply the glow before the main grade.
9. Dial to "just right", then halve it (mix ~0.5).
10. Check: if nobody told you it was there, you would not notice it.
11. (from animate-light-control-viewer) For a light line/stroke that needs depth, stack 2–3 glow layers instead of
    one: a tight glow (low radius, moderate intensity), a second thresholded glow (slightly raised threshold,
    higher intensity) for "control over the type of light", and a final wide, low-intensity glow for faint ambient
    haze; offsetting 2–3 blur centres slightly gives the light apparent depth (reads as more than one source).

## VALUES BY SOURCE
| parameter | Special Look (Photoshop) | 10 Blender Tricks (Glare) | Advanced Comp (Nuke) | animate-light-control-viewer (AE) | recommended for Style D (+ why) |
|---|---|---|---|---|---|
| method | blur copy, Screen, Blend If | Glare Fog Glow (Streaks for flares) | luminance key → premult → ExponBlur → plus | stacked glows: tight (r0, 0.6) + thresholded (0.8) + wide haze (r100, 0.1) | raea `<Bloom>` + emissive on what should glow |
| key / threshold | Blend If dark handle (visual) | Threshold ~1.0 (raise until only highlights) | highlights only, upstream plate | threshold raised on the second glow layer only | `threshold` 0.85–0.9 |
| amount | layer opacity (visual) | Size ~8, mix ~0 (~, 4.x props) | "just right" × 0.5 (mix 0.5) | 3 intensities stacked: 0.6 / 0.8 / 0.1 | `intensity` 0.15–0.3 (ProStage 0.18; BlendShot 0.45) |
| emissive | — | — | — | 2–3 offset blur centres fake depth | accent ×3–×10 (`LinearRgba.from(Srgba.hex(c)).mul(k)`) |
| flares | — | Streaks optional | — | — | none |

## AGENT_EXECUTION
### Source tools
- Photoshop: Render → Render copy (Gaussian Blur ~unknown px, Blend = Screen (Lighten sometimes), Blend If "This Layer" black split ~unknown); optional layer mask brushed on brights.
- Nuke: `Keyer (luminance)` on the source plate → `Premult` → `ExponBlur` (large radius) → `Merge (plus)`, mix 0.5.
### Blender 5.x compositor (look-dev only) — verified on 5.3
```python
import bpy
sc = bpy.context.scene
ng = bpy.data.node_groups.new("Glow", "CompositorNodeTree")
ng.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')
sc.compositing_node_group = ng
N, L = ng.nodes, ng.links
S = lambda n, i: next(s for s in n.inputs if s.identifier == i)
rl = N.new("CompositorNodeRLayers"); out = N.new("NodeGroupOutput")
g = N.new("CompositorNodeGlare")
S(g, "Type").default_value = "Fog Glow"          # 'Bloom' | 'Fog Glow' | 'Streaks' | 'Ghosts' | 'Simple Star' | 'Sun Beams' | 'Kernel'
S(g, "Quality").default_value = "High"
S(g, "Highlights Threshold").default_value = 1.0  # ~ raise until only highlights glow
S(g, "Strength").default_value = 0.5              # glow rule: just right, then halve ~
S(g, "Size").default_value = 0.5                  # ~ (5.x: 0–1 relative)
L.new(rl.outputs["Image"], S(g, "Image")); L.new(g.outputs["Image"], out.inputs[0])
```
Links: `Render Layers [Image] -> Glare [Image] -> Group Output [Image]`.
### raea (renderer)
```tsx
<Bloom intensity={0.2} threshold={0.9} skip={["ui"]} />     {/* one per piece; first frame's values hold */}
<StandardMaterial base_color="#111111" emissive={LinearRgba.from(Srgba.hex("#57D100")).mul(4)} />   {/* accent only */}
```
- `threshold` = Blend If / key; `intensity` = layer opacity (1 natural, 2 strong). No painted mask: control *what* glows with
  `emissive` on the accent; everything else stays below threshold. `<Bloom passes={{ ui: 0.5 }} />` gives a `pass="ui"` screen half the glow.
- Animate the emissive multiplier, never Bloom (fixed from frame 1).
- Streak/star flares and light wrap: **raea: no equivalent** (Bevy bloom is a soft glow only; no edge light-wrap pass).

## NOTES
- Deprecated: legacy EEVEE Render > Bloom is gone (4.2+ EEVEE Next) → compositor Glare / raea `<Bloom>`. Glare 4.2–4.3 props
  (`glare_type='FOG_GLOW'`, `quality`, `threshold`, `size` 1–9, `mix`) became input sockets in 4.4+/5.x (menu values are
  display names, e.g. "Fog Glow"; new type "Bloom"); `scene.node_tree` → `scene.compositing_node_group`, Composite → Group Output.
- Visual gaps: blur radius, Blend If handles, Glare type/values (author points to a preset pack) are on screen only.
- Rule conflicts: no flashy flares; `threshold={0}` with a light background goes milky (post.md); Bloom with `layered`
  lightens the page under the 3D around bright parts (scene.md).
- animate-light-control-viewer: raea has one `<Bloom>` pass, not a stack of independently-keyed glow layers — fake
  the "tight + thresholded + wide haze" look with one Bloom tuned toward the middle of this master's range plus
  volume/fog for the wide haze component, rather than trying to stack multiple Bloom passes. Doesn't change the
  Style D pick.
