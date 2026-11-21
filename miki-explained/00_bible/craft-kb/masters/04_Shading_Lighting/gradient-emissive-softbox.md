---
title: Gradient-falloff emissive plane softbox
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/gradient-alpha-emissive-plane-light--key-to-realistic-renders.md
  - cards/04_Shading_Lighting/gradient-emission-planes-for-glass--realistic-product-lighting.md
  - cards/04_Shading_Lighting/gradient-emissive-plane-softbox--car-animation.md
sources: ["The Key to Realistic Renders in Blender.txt", "Realistic Product Lighting In Blender.txt", "Making a Car Animation in Blender!.txt", "8 Lighting Tricks I Wish I Knew Earlier (Blender Product Lighting Tutorial).txt"]
use_when: "soft reflection strips on glass/gloss instead of hard rectangles"
style_fit: "Serves Style D's soft top light on glossy heroes (phone glass, coins, cans, bottles). raea emissives don't light or reflect into neighbours, so split the job: RectLight lights, an emissive card or a baked studio HDRI gives the reflection shape. Keep it neutral; accent only on the subject."
---

## METADATA
04_Shading_Lighting | Blender 3.x–4.x → 5.x / raea | Shader nodes → raea Environment / emissive card + RectLight

## CREATIVE_INTENT
Glass and gloss show their lights as reflections, so a hard Area light leaves an ugly white rectangle. A plane whose
emission (or alpha) fades with a spline gradient reads as a studio softbox: smooth falloff strips that describe the
product's edges, with full control of falloff, strength and colour.
- Key to realistic renders adds: drive ALPHA with the gradient (Mix Shader Transparent/Emission) so the plane fades out at one edge.
- Realistic product lighting adds: the glass rig — a back plane plus two side planes orbited round the product centre, gradient bright side facing the back of the product, one rotated slightly; hide from camera; strength "not too high".
- Car animation adds: a spherical gradient (centre white, edges black) multiplied into Emission Strength; several planes to rim the shape and big glass panels; raea split of light vs reflection card.

## STE_PROCEDURE
1. Add a plane where the area light/softbox would be; aim it at the hero.
2. Replace Principled with Emission → Material Output; set Strength (not too high).
3. Add Texture Coordinate [UV or Generated] → Mapping → Gradient Texture → Color Ramp (Interpolation B-Spline).
4. Choose the falloff: Linear for an edge fade (strip), Quadratic Sphere / Spherical for a centre-bright softbox (recentre Generated coords by −0.5).
5. Feed the ramp into either Emission [Color], Emission [Strength] (via Math Multiply), or Mix Shader [Fac] between Transparent BSDF and Emission.
6. Rotate the gradient (Mapping Rotation, R 180 if reversed) so the bright side faces the back of the product.
7. Scale the plane to the product.
8. For glass: put one plane behind; set 3D cursor to the product centre; duplicate and orbit a plane to each side; rotate one slightly for a nicer result.
9. Use several planes to rim the shape and long glass panels.
10. Hide every plane from Camera rays (Object › Visibility › Ray Visibility › Camera off).
11. For raea, bake the planes into a studio HDR or use emissive cards for the reflection shape, plus RectLights at the planes' positions for the light.
12. (from 8 Lighting Tricks) Alternative when the light is already positioned exactly where the gradient card would go
    (directly behind/beside glass or metal): skip the separate plane and wire the gradient straight into that Area
    light's own Emission Color (Area light → Use Nodes → Image/Gradient Texture → Emission Color). Simpler to set up,
    at the cost of the gradient's scale/rotation being locked to the light's own transform. For metal specifically, if
    black unlit patches remain, add symmetric lights on both sides in the background AND two more in front — raising
    one light's power alone was not enough.

## VALUES BY SOURCE
| parameter | Key to realistic | Realistic product | Car animation | 8 Lighting Tricks | recommended for Style D (+ why) |
|---|---|---|---|---|---|
| Ramp target | Mix Shader Fac (alpha fade) | Emission Color | Emission Strength (× ~20) | gradient wired straight into the light's own Emission Color (no separate card) | alpha/strength fade (no visible plane edge) |
| Gradient | Linear, UV, B-Spline | Linear, UV → Mapping (rot ~90°), B-Spline | Quadratic Sphere, Generated | pre-made texture images ("elliptical sharper" etc.), not hand-built node graphs | Linear strip for glass edges; spherical for a top softbox |
| Strength | ~10 | ~5 ("not too high") | ~20 (multiply) | not given | raea card emissive `.mul(4)` |
| Rig | one card | back + two side planes, bright side to back | several planes rimming the shape | glass: 1 light behind, gradient in emission; metal: same + scaled tall/wide/stronger + 2 bg + 2 front lights | one top card + two side strips for glass heroes |
| raea route | bake studio HDR → Environment; RectLight at card | real glass material + baked HDR + RectLights | RectLight + emissive_texture card | no raea equivalent (lights have no texture input) — use the master's emissive-card approach instead | RectLight + emissive card in shot-adjacent space; HDR for many strips |

## AGENT_EXECUTION
Blender:
```python
import bpy, math
def grad_card(name, mode="alpha", gtype="LINEAR", strength=10, rot_z=0.0):
    m = bpy.data.materials.new(name); m.use_nodes = True; N, L = m.node_tree.nodes, m.node_tree.links
    N.remove(N["Principled BSDF"]); out = N["Material Output"]
    tc = N.new("ShaderNodeTexCoord"); mp = N.new("ShaderNodeMapping"); mp.inputs["Rotation"].default_value[2] = rot_z
    gr = N.new("ShaderNodeTexGradient"); gr.gradient_type = gtype
    cr = N.new("ShaderNodeValToRGB"); cr.color_ramp.interpolation = "B_SPLINE"
    em = N.new("ShaderNodeEmission"); em.inputs["Strength"].default_value = strength
    L.new(tc.outputs["UV"], mp.inputs["Vector"]); L.new(mp.outputs["Vector"], gr.inputs["Vector"])
    L.new(gr.outputs["Fac"], cr.inputs["Fac"])
    if mode == "alpha":            # key-to-realistic: fade via transparency
        tr = N.new("ShaderNodeBsdfTransparent"); mx = N.new("ShaderNodeMixShader")
        L.new(cr.outputs["Color"], mx.inputs["Fac"]); L.new(tr.outputs["BSDF"], mx.inputs[1])
        L.new(em.outputs["Emission"], mx.inputs[2]); L.new(mx.outputs["Shader"], out.inputs["Surface"])
    elif mode == "color":          # realistic product: gradient into Emission Color
        L.new(cr.outputs["Color"], em.inputs["Color"]); L.new(em.outputs["Emission"], out.inputs["Surface"])
    else:                          # car animation: gradient × 20 into Emission Strength
        mul = N.new("ShaderNodeMath"); mul.operation = 'MULTIPLY'; mul.inputs[1].default_value = 20
        L.new(cr.outputs["Color"], mul.inputs[0]); L.new(mul.outputs[0], em.inputs["Strength"])
        L.new(em.outputs["Emission"], out.inputs["Surface"])
    return m
side = grad_card("GradEmit", mode="color", strength=5, rot_z=math.radians(90))        # ~
soft = grad_card("Softbox", mode="strength", gtype="QUADRATIC_SPHERE")                 # recentre coords for spherical
for n in ("Glass_L", "Glass_R", "Glass_Back"): bpy.data.objects[n].visible_camera = False
```
Links (alpha variant): `Texture Coordinate [UV] -> Mapping -> Gradient Texture [Vector] -> Color Ramp [Fac] -> Mix Shader [Fac]`;
`Transparent BSDF -> Mix [Shader 1]`; `Emission -> Mix [Shader 2]`. Spherical variant: use `[Generated]` and Vector Math
Subtract 0.5 before the gradient (Generated is 0–1 on a plane).

raea (emissives don't light or reflect into neighbours):
```tsx
{/* the light */}
<RectLight transform={Transform.fromXyz(0, 0.8, 0.3).lookingAt([0, 0, 0])} intensity={40000} width={0.6} height={0.3} color="#f4f6ff" />
{/* the reflection shape: card with a pre-made radial/linear falloff PNG */}
<Mesh3d name="softbox-card" transform={Transform.fromXyz(0, 0.8, 0.3).lookingAt([0, 0, 0])}>
  <Cuboid half_size={[0.3, 0.15, 0.002]} />
  <StandardMaterial base_color="#000000" emissive_texture={staticFile("softbox_falloff.png")}
    emissive={LinearRgba.from(Srgba.hex("#ffffff")).mul(4)} unlit />
</Mesh3d>
{/* glass hero */}
<StandardMaterial specular_transmission={1} ior={1.5} thickness={0.005} perceptual_roughness={0.05} />
{/* many strips: bake them into a studio panorama (Blender Cycles panoramic camera, 2k .hdr — an asset, not the final render) */}
<Environment src={staticFile("studio_cards.hdr")} intensity={1} />
```
`softbox_falloff.png` = a white→black gradient generated once (radial for a softbox, linear for a strip).

## NOTES
- Deprecated: none (on a Principled BSDF, "Emission" → "Emission Color").
- Visual gaps: node set-ups shown as screenshots; gradient type, ramp stops and mapping rotation are `~`.
- Rule conflicts: none. Keep the softbox colour neutral; the brand accent belongs only on the line's subject. Blender
  Cycles is used only to bake the HDR asset, never as the final renderer.
- raea has no texture input on lights, so the in-light-emission variant (8 Lighting Tricks) stays a Blender-only
  authoring shortcut; always export/bake to a card or HDR for raea.
