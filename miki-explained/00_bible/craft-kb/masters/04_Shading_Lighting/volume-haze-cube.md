---
title: Volume haze cube (low-density Volume Scatter over the scene)
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/fog-cube-volume-scatter--10-blender-tricks.md
  - cards/04_Shading_Lighting/low-density-volume-air--product-animation-masterclass.md
  - cards/04_Shading_Lighting/low-density-volume-cube-cool-spotlight--eevee-animation-blender5.md
  - cards/04_Shading_Lighting/low-volume-scatter-atmosphere--good-lighting-environments.md
  - cards/04_Shading_Lighting/scene-wide-volume-scatter-cube--dark-environments.md
  - cards/04_Shading_Lighting/volume-cube-atmosphere-strong-spot--renders-instantly-cooler.md
  - cards/04_Shading_Lighting/volume-haze-cube-and-colored-sun-point--crazy-renders-geo-nodes.md
  - cards/04_Shading_Lighting/volume-scatter-atmosphere-cube--beautiful-fire.md
  - cards/04_Shading_Lighting/volume-scatter-cube-atmosphere--industrial-scene.md
  - cards/04_Shading_Lighting/volume-scatter-cube-density-anisotropy--volumetrics-look-better.md
  - cards/04_Shading_Lighting/volume-scatter-cube-haze--add-depth-renders.md
  - cards/04_Shading_Lighting/volume-scatter-cube-over-scene--use-lighting-in-renders.md
  - cards/04_Shading_Lighting/volume-scatter-haze-cube--detail-isnt-hard.md
  - cards/04_Shading_Lighting/volumetric-density-anisotropy-tuning--special-look.md
  - cards/04_Shading_Lighting/volumetric-fog-box--ten-cinematic-tips.md
sources: ["10+ Blender Tricks That Will Make Your Renders Cinematic.txt", "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt", "Creating an Animation in Eevee (Blender 5.0).txt", "How to get good lighting in blender.srt", "How to Make DARK Environments in Blender.txt", "6 Tips to Make Your Renders Instantly Cooler.txt", "How To Make Crazy Renders With Easy Geometry Nodes.txt", "How to Make Beautiful Fire in Blender.txt", "Making an Industrial Scene in Blender.txt", "How I Make Any Environment Instantly Look Better With Volumetrics - Blender Tutorial.txt", "How to Add DEPTH to Your Renders.txt", "How To Use Lighting In Your Renders  Blender Tutorial.txt", "Detail Isn't Hard  Blender Tutorial.txt", "How to Add That Special Look To Your Renders.txt", "10 Tips to make Your 3D Render more Cinematic.txt", "Fern 3D Edits (RED style breakdown)"]
use_when: "making the top light read in the air of the dark room"
style_fit: Core Style D tool — a faint, neutral haze makes the single soft top light read as a soft cone and pushes the background back; raea's `<VolumetricFog>` + `<FogVolume>` + a `volumetric` SpotLight is the render-time equivalent (Blender volumes never reach the GLB). Keep it faint so the macro object stays crisp, never coloured in the brand accent; haze that appears fades in ≥0.4 s and holds constant within a shot.
---

## METADATA
04_Shading_Lighting | Blender 3.x–5.0 (source) → bpy 5.x look-dev + raea render | Blender bpy (Volume Scatter / Principled Volume) → raea VolumetricFog / FogVolume

## CREATIVE_INTENT
Without a medium a render "takes place in a vacuum": a dark render is fine but missing something. One cube of thin, forward-scattering volume over the whole set solidifies the air: light becomes visible as beams, distant things get hazier (so they read as further away), foreground/midground/background separate, contrast softens. Anisotropy pulls the glow toward the light source so it sits where the light comes from and blooms. Not realistic, just better looking — most of the sources use it on nearly every render. Revisit density at the end of lighting; there is no universal value.
- 10-blender-tricks: density 0.01, anisotropy 0.7, plus optional tiny volume Emission 0.03 to lift the haze.
- product-animation-masterclass: Principled Volume, default density 1 is far too much — 0.01–0.05, just visible; hide cube while working.
- eevee-animation-blender5: black world + one bright slightly-cool spot from above; EEVEE Render › Volumes resolution 1:2; Volume probe didn't help dark corners.
- good-lighting-environments: very low on sunny scenes (high reads as wildfire smoke), denser for overcast; make the box taller if a hard edge line appears; volume bounces (Cycles).
- dark-environments: used on nearly every dark render; anisotropy only a little (0.2–0.3).
- renders-instantly-cooler: Principled Volume 0.02 / 0.5 + one very strong spot to show the beam; bloom for glow; higher density = mist.
- crazy-renders-geo-nodes: 0.01 / 0.8 + a warm, desaturated light high above as a sun through haze.
- beautiful-fire: 0.02 / 0.7, Display As Bounds.
- industrial-scene: darken the scatter Color to thin the fog; density 0.0025 (start 0.01–0.001), anisotropy 0.5; Quick Favourites shortcut for bounds toggle.
- volumetrics-look-better: 1 is pitch black → 0.01; anisotropy ~0.7 (too high looks odd); halve/quarter if thick; scroll to refresh viewport.
- add-depth-renders: 0.1 density, anisotropy 0.5–0.8, Cycles volume bounces 1–2; box edges must not be seen from camera.
- use-lighting-in-renders: "important" for a light in a dark interior; ~0.01.
- detail-isnt-hard: 0.02 / 0.8, "always looks good"; toggle to confirm it adds scale, not mud; exclude from GLB.
- special-look: a finishing move — raise density in small steps (0.005 → 0.015), back off if milky.
- ten-cinematic-tips: Principled Volume, box spans from just in front of the subject to the back building; adjust colour too.

## STE_PROCEDURE
1. Set the World to black (dark room) and light the key first; haze comes after lighting is nearly final.
2. Add a Cube; scale it to enclose the whole set, the lights and the camera's view (or span from just in front of the subject to the back wall).
3. Set Object › Viewport Display › Display As = Bounds (optionally a Quick Favourites shortcut).
4. Give it a new material; delete the Principled BSDF (no surface shader).
5. Add Volume Scatter (or Principled Volume); connect [Volume] → Material Output [Volume], not Surface.
6. Before judging, lower Density from 1 (pitch black) to ~0.01 (range 0.001–0.05; 0.1 for a strong look).
7. Raise Anisotropy (~0.3–0.8; ~0.7 typical) so the haze brightens toward the light; too high looks odd.
8. Optional: darken the scatter Color slightly to thin the fog; or add a tiny Emission (0.03) via Add Shader to lift the haze.
9. Aim one strong Spot through the volume (slightly cool, low saturation, or warm-desaturated from high above as a "sun").
10. If a hard line appears at the box edge, make the box taller/larger.
11. Sunny/clean: keep it very low (high reads as smoke); overcast/mist: raise density.
12. Toggle the cube off/on; it must add scale, not mud; halve/quarter density if thick or milky.
13. Optional: bloom for glow around the light; EEVEE Render › Volumes resolution 1:2; Cycles volume bounces 1–2 (not in raea).
14. Exclude the cube from the GLB export; rebuild the haze in raea with `<VolumetricFog>` + `<FogVolume>` and mark the key `volumetric`.
15. Final pass: revisit density in small steps on a still.

## VALUES BY SOURCE
| source | node | Blender density | anisotropy | extras | raea values in card |
|---|---|---|---|---|---|
| 10-blender-tricks | Volume Scatter | 0.01 | 0.7 | Emission 0.03 via Add Shader | density 0.01, scattering 0.5, anis 0.7, `#fff4e6`; spot 500,000 |
| product-animation-masterclass | Principled Volume | ~0.02 (0.01–0.05) | — | hide cube in viewport | density 0.02, color `#ffffff`, scattering 0.4, absorption 0.1, anis 0.5 |
| eevee-animation-blender5 | Volume Scatter | ~0.01 | — | spot 5000 W cool (0.85,0.93,1.0); volumetric_tile_size '2' | density 0.02, scattering 0.45, absorption 0.1, anis 0.55; spot `#d9ecff` 2,700,000 |
| good-lighting-environments | Volume Scatter | ~0.005 sunny / ~0.03 overcast | ~0.3 | box 60×60×20; volume bounces 2 | density 0.02, scattering 0.5, absorption 0.05, anis 0.5; spot 2,500,000 |
| dark-environments | Volume Scatter | ~0.02 (0.01–0.05) | ~0.25 | box 20×20×10 | density 0.02, scattering 0.4, absorption 0.1, anis 0.3, `#f2ece4`; spot 2,500,000 |
| renders-instantly-cooler | Principled Volume | 0.02 | 0.5 | very strong spot; bloom | density 0.02, scattering 0.5, anis 0.5; spot 3,000,000; Bloom 0.6 / 0.85 |
| crazy-renders-geo-nodes | Volume Scatter | 0.01 | 0.8 | point light high, colour (1,0.85,0.55) | density 0.02, scattering 0.5, anis 0.8, `#fff4e0`; spot `#ffd98c` 3,600,000 |
| beautiful-fire | Volume Scatter | 0.02 | 0.7 | — | density 0.02, scattering 0.5, anis 0.7 |
| industrial-scene | Volume Scatter, Color (0.6) | 0.0025 (start 0.01–0.001) | 0.5 | darker colour thins fog | density 0.02, `#d8d4cc`, scattering 0.4, absorption 0.1, anis 0.5; spot 900,000 |
| volumetrics-look-better | Volume Scatter | 0.01 (halve/quarter) | ~0.7 | — | density 0.01, anis 0.7, scattering 0.5 |
| add-depth-renders | Volume Scatter | 0.1 | ~0.6 (0.5–0.8) | volume bounces 1 | density 0.02 → 0.1, scattering 0.45, absorption 0.1, anis 0.6; spot 1,500,000 |
| use-lighting-in-renders | Volume Scatter | ~0.01 | — | — | density 0.01–0.03, anis 0.5–0.7 |
| detail-isnt-hard | Volume Scatter | 0.02 (0.001→0.005 in a sibling video) | 0.8 | box 60×60×40 | density 0.02, scattering 0.5, absorption 0.1, anis 0.8; spot 2,700,000 |
| special-look | Volume Scatter | 0.005 → 0.015 | ~0.5 | finishing move | density 0.02, scattering 0.45, anis 0.6, `#fff2e0`; spot 900,000 |
| ten-cinematic-tips | Principled Volume | ~0.02 | ~0.3 | colour adjusted | density 0.02, scattering 0.45, anis 0.55 |
| fern-3d-edits (RED style) | Volume Scatter | 0.005 (thinner than our baseline) | ~0.3 (STT heard "2.3", outside range, read as 0.3) | box spans just before the desk to the back wall; raised the engine's "light pass for the volume" (Cycles-only render-correctness step, no raea equivalent) | density 0.02 (keep Style D median; source's 0.005 is on the fainter end), scattering 0.45, absorption 0.1, anisotropy 0.3–0.5, neutral warm tone |
| **recommended for Style D** | — | look-dev only | — | — | **`density` 0.02 (faint haze; up to ~0.05, 0.1 = dust), `scattering` 0.45, `absorption` 0.1, `anisotropy` 0.6 (0.5–0.8: the shaft glows when the camera looks toward the top light), neutral warm-white `#fff2e0`; key SpotLight `volumetric shadow_maps_enabled`; Bloom 0.6 / 0.9. Why: post.md calibrates 0.02 as faint haze; the median of the sources' raea values; keeps the macro object crisp and the accent the only colour.** |

Blender and raea density are different scales — never copy Blender numbers into raea; judge on `raea render --frame N`.

## AGENT_EXECUTION
Blender 5.x (look-dev only; never exported):
```python
import bpy
w = bpy.context.scene.world; w.node_tree.nodes["Background"].inputs["Color"].default_value = (0, 0, 0, 1)
bpy.ops.mesh.primitive_cube_add(size=1); v = bpy.context.object; v.name = "Haze"
v.scale = (20, 20, 10)                       # ~ enclose set, lights and camera view
v.display_type = 'BOUNDS'
m = bpy.data.materials.new("Haze"); nt = m.node_tree; N, L = nt.nodes, nt.links
N.remove(N["Principled BSDF"])
vs = N.new("ShaderNodeVolumeScatter")
vs.inputs["Density"].default_value = 0.01    # 0.001–0.05; 0.1 strong
vs.inputs["Anisotropy"].default_value = 0.7  # 0.3–0.8
vs.inputs["Color"].default_value = (0.8, 0.8, 0.8, 1)   # optional: darker = thinner fog
# optional lift: tiny emission into the volume
em = N.new("ShaderNodeEmission"); em.inputs["Strength"].default_value = 0.03
add = N.new("ShaderNodeAddShader")
L.new(vs.outputs["Volume"], add.inputs[0]); L.new(em.outputs["Emission"], add.inputs[1])
L.new(add.outputs["Shader"], N["Material Output"].inputs["Volume"])
# variant: one node — ShaderNodeVolumePrincipled (Density, Anisotropy, Emission Strength) -> [Volume]
v.data.materials.append(m)
bpy.context.scene.eevee.volumetric_tile_size = '2'      # EEVEE Render › Volumes resolution 1:2
# Cycles look tests only: bpy.context.scene.cycles.volume_bounces = 1
```
Nodes: `Volume Scatter [Volume] -> Add Shader [Shader]; Emission [Emission] -> Add Shader [Shader]; Add Shader -> Material Output [Volume]` (without the lift: `Volume Scatter [Volume] -> Material Output [Volume]`).
raea (the real implementation):
```tsx
const haze = interpolate(f, [inF, inF + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); // ≥0.4 s fade-in if it appears mid-film
<AbsoluteFill style={{ background: "#000000" }}>
  <VolumetricFog />                                  {/* hero={false} when no hard-edged shaft is in shot (cheaper) */}
  <FogVolume name="haze" position={[0, 1, 0]} scale={[8, 4, 8]} density={0.02 * haze}
    scattering={0.45} absorption={0.1} anisotropy={0.6} color="#fff2e0" />
  <SpotLight name="key" volumetric shadow_maps_enabled color="#fff4ea"
    transform={Transform.fromXyz(0, 3, 0.4).lookingAt([0, 0, 0])}
    intensity={1_500_000} outer_angle={0.4} inner_angle={0.2} />
  <Bloom intensity={0.6} threshold={0.9} />
  {/* fuller fill instead of Cycles volume bounces: <VolumetricFog ambient={0.3} ambientColor="#1a1c22" /> */}
  {/* distance-only fade, no shafts: <Fog color="#000000" near={n} far={f} /> */}
</AbsoluteFill>
```
Only lights marked `volumetric` shaft; the FogVolume must contain the air the light crosses AND the camera's view of it. A SpotLight is the cheap volumetric light (a PointLight pays six shadow maps); the first two volumetric spots/suns are hero lights with exact shafts. FogVolume density animates per frame (unlike other effects) — keep it constant within a shot.

## NOTES
- Deprecated: EEVEE Legacy Volumetrics panel (Start/End/Tile Size, "Volumetric lighting" toggle) → EEVEE Next Render › Volumes (`volumetric_tile_size`, volumes lit by default); legacy Bloom → compositor Glare. Cycles "volume bounces" (Light Paths) has no raea equivalent — raea's froxel grid scatters single-bounce; use `scattering` or `<VolumetricFog ambient ambientColor>`. Volume emission: no direct raea equivalent (ambient lifts the haze evenly).
- STT fix: "wall metric / f metric" = volumetric.
- Visual gaps: cube sizes/placement, and several density/anisotropy values (dark-environments, add-depth, ten-cinematic-tips, special-look "before" value, use-lighting) are shown not spoken (`~`). The EEVEE Volume light probe did not help dark corners (eevee-blender5) — accept weak bounce or add a fill.
- Sibling sources noted in detail-isnt-hard: Cyber Japan (37:01–37:34, same cube, values shown) and "How to Add Tons of Detail" (20:59–21:24, density 0.001 → 0.005, anisotropy raised, Cycles volume bounces up).
- Rule conflicts: none; keep haze neutral and faint (a coloured haze spreads the accent; a thick one softens the hero's macro detail or goes milky); fade in ≥0.4 s, never pop.
- fern-3d-edits: its 0.005 density is thinner, not stronger, than the Style D median — a useful reference point for
  a very subtle haze, not a reason to move the pick. The Cycles "volume light pass" toggle it raises is a
  render-correctness step for this scene having volume in frame, not a new visual value; raea's volumetric
  rendering has no equivalent per-pass toggle, none needed.
