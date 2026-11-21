---
title: HDRI for bright scenes (rotate to find the angle); plain grey/black world for dark scenes unless there are reflective surfaces
bucket: 04_Shading_Lighting
source: "Lighting 3D Characters for Storytelling.txt"
source_time: "04:30–05:00, 09:44–10:17, 16:53–16:57, 29:08–29:19"
blender_version_source: 2.8–3.x? (EEVEE legacy)
tool_target: Blender bpy | raea
tier: full
style_fit: Style D is dark, so mostly plain-world + lamps; but our hero objects are often metal/glass (coins, phones), which is exactly the speaker's exception — keep a dim HDRI for reflections.
---

## METADATA
04_Shading_Lighting | 2.8–3.x? → 4.2+ / raea | Blender bpy + raea

## CREATIVE_INTENT
For high-key or bright outdoor shots an HDRI is the base light; choosing it and rotating it to a good angle influences everything after. The darker the scene, the more you light only with placed lamps and set the world to a plain dark colour — except when reflective materials need an environment to reflect.

## STE_PROCEDURE
1. For a bright shot, load an HDRI (Poly Haven / HDRI Haven, Openfootage.net) in the World.
2. Rotate the HDRI (Mapping Z rotation) until its light angle flatters the subject; take your time.
3. For a dark shot, replace the HDRI with a plain RGB world colour (grey, then lower toward black).
4. Before going fully plain, check for reflective materials; if present, keep an HDRI at low strength for reflections.
5. For a silhouette shot, set the world almost to black so no unwanted fill exists.

## AGENT_EXECUTION
Blender:
```python
import bpy, math
w = bpy.context.scene.world; w.use_nodes = True; nt = w.node_tree; N = nt.nodes
env = N.new("ShaderNodeTexEnvironment"); env.image = bpy.data.images.load("//hdri/studio_2k.hdr")
mp = N.new("ShaderNodeMapping"); tc = N.new("ShaderNodeTexCoord")
nt.links.new(tc.outputs["Generated"], mp.inputs["Vector"]); nt.links.new(mp.outputs["Vector"], env.inputs["Vector"])
nt.links.new(env.outputs["Color"], N["Background"].inputs["Color"])
mp.inputs["Rotation"].default_value[2] = math.radians(120)   # ~ rotate to taste
# dark scene: N["Background"].inputs["Color"].default_value = (0.02,0.02,0.02,1)
```
raea:
```tsx
<Environment src={staticFile("studio_small_09_2k.hdr")} intensity={1} rotation={2.1} />      // bright
<Environment src={staticFile("studio_small_09_2k.hdr")} intensity={0.08} rotation={2.1} />   // dark scene, reflections only
<AmbientLight brightness={5} />                                                              // near-black world
```
`rotation` is radians, turns light and reflections together; leave `background` off indoors.

## NOTES
- Deprecated: HDRI Haven is now Poly Haven.
- Visual gaps: which HDRI and its rotation are shown only.
- Rule conflicts: none.

## ADDENDUM — Modern Lighting Techniques in Blender
Source: "Studio Lighting, Silhouettes & Color Theory/Modern Lighting Techniques in Blender.txt" (02:43–05:39, 08:02–09:07)

This card's "dim HDRI for reflections" step gives no strength numbers (its own raea example uses a single
`intensity={0.08}`). This source gives an observed working range across four still-life setups:

| setup | HDRI/world strength | notes |
|---|---|---|
| soft stucco/cement still-life | very low ("just .015") | near-black world, main light is a single point light at power 4000–5000 |
| backlit-foliage calming scene | Sky Texture, Sun strength = **0**, overall sky/HDRI strength **0.24** | HDRI/sky does the fill entirely; no separate sun |
| Peter Tarka-style three-light recreation | plain grey world (no HDRI image), brought from 0 up only enough to lightly reinforce one side | used instead of an HDRI when a neutral fill (not reflections) is the only goal |
| beam-rig product shot | sky texture, sun strength = **0**, strength **0.3** | paired with two narrow-spread area-light beams |

Extra step — kill the sun, not just lower the HDRI: three of the four setups use Blender's Sky Texture world shader
with its Sun sub-element strength set to exactly 0, so only the HDRI/sky's ambient term lights the scene — a
different control than swapping to a flat RGB colour (already covered above). Worth using as an alternate dark-scene
method: Sky Texture + sun-strength-0 gives a very low, naturally-tinted ambient fill without a separate HDRI image.

Timestamps: 02:43–05:39 (point light + low HDRI still-life), 06:11–08:02 (backlit foliage, sun=0, strength 0.24),
09:07–11:20 (three-light Peter Tarka recreation, plain grey world), 14:18–16:11 (beam rig, sun=0, strength 0.3).
Visual gap: the exact point-light power values (4000, then 5000) and radius/spot-size adjustments are shown on
screen, not stated as a single clean number — kept as the closest readable values.

## ADDENDUM — Why your lighting looks flat
Source: "Studio Lighting, Silhouettes & Color Theory/Why your lighting looks flat.txt" — 02:14–03:44.

Variant: desaturated HDRI, background-only.
| parameter | why-your-lighting-looks-flat |
|---|---|
| source | a 3D-scanned/360° room HDRI (AmbientCG, Poly Haven) used purely for its reflections and background detail, not as the key |
| desaturation | run the HDRI through a Hue/Saturation node, saturation driven down to strip its colour, before it reaches the World background — keeps the lighting detail (reflections, subtle gradients) without the HDRI's own colour casting the scene |
| strength | world background set to 0 by default (flat grey rejected); with the desaturated HDRI in, brought down from full — "we could halve it… we could go 0.75" |
| reasoning | reflections are a reflection of the surrounding environment; a flat grey/black world flattens reflective surfaces, but a full-colour HDRI fights the scene's own key/accent colour — desaturating keeps the shape of the lighting information while dropping the colour |
| paired rule | start with exactly one key light before adding this background HDRI (`masters/04_Shading_Lighting/one-dominant-light.md`); this HDRI is background/reflection fill, never the light doing the main work |

Same card's "keep a dim HDRI for reflective surfaces" idea, with the added step of neutralising the HDRI's own hue
first so it can't compete with the scene's single accent colour. In raea: `<Environment src={...} intensity={0.5–0.75}
tint="#ffffff" saturation={0}/>` if the runtime exposes a saturation control, otherwise pre-desaturate the HDR file
once at build time (e.g. a one-off ImageMagick/compositor pass) before loading it.
