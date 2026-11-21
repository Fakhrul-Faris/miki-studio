---
title: Aluminium top/bottom — Noise Texture on Object coordinates into colour + second noise into a low Bump
bucket: 04_Shading_Lighting
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "33:52–35:41"
blender_version_source: 4.3
tool_target: Shader nodes | raea
tier: full
style_fit: Gives the unprinted metal real micro-variation for macro close-ups (Style D real surfaces).
---

## METADATA
04_Shading_Lighting | Blender 4.3 | Shader nodes + raea

## CREATIVE_INTENT
Bare aluminium with faint mottling and micro-bumps so the lid and base don't read as flat CG grey under a raking top light.
Object coordinates make the noise follow the can's shape and stick to it when it moves.

## STE_PROCEDURE
1. Select the aluminium slot; add a Principled BSDF if empty.
2. Add Texture Coordinate; connect Object → Noise Texture Vector.
3. Raise Noise Scale a lot (~50+) and Detail to max (15).
4. Feed the noise into a Color Ramp; set the dark stop to dark grey and lift the light stop slightly; Color Ramp → Base Color.
5. Set Metallic high (~1) and Roughness low (~0.2–0.3).
6. Add a second Noise Texture (Object coords) → Bump Height; Bump Strength 0.1; Bump Normal → Principled Normal.
7. Check in Cycles with an HDRI; raise Coat / Specular if the metal looks dull, and adjust Roughness.

## AGENT_EXECUTION
- Blender (links):
  - `Texture Coordinate [Object] -> Noise Texture A [Vector]` (Scale ~60, Detail 15)
  - `Noise Texture A [Fac] -> Color Ramp [Fac]` (stops #2a2a2a / #bcbcbc ~) `-> Principled BSDF [Base Color]`
  - `Texture Coordinate [Object] -> Noise Texture B [Vector]`; `Noise Texture B [Fac] -> Bump [Height]` (Strength 0.1) `-> Principled BSDF [Normal]`
```python
tc = N.new("ShaderNodeTexCoord"); n1 = N.new("ShaderNodeTexNoise"); n1.inputs["Scale"].default_value = 60; n1.inputs["Detail"].default_value = 15
ramp = N.new("ShaderNodeValToRGB"); n2 = N.new("ShaderNodeTexNoise"); bump = N.new("ShaderNodeBump"); bump.inputs["Strength"].default_value = 0.1
L.new(tc.outputs["Object"], n1.inputs["Vector"]); L.new(n1.outputs["Fac"], ramp.inputs["Fac"]); L.new(ramp.outputs["Color"], bsdf.inputs["Base Color"])
L.new(tc.outputs["Object"], n2.inputs["Vector"]); L.new(n2.outputs["Fac"], bump.inputs["Height"]); L.new(bump.outputs["Normal"], bsdf.inputs["Normal"])
bsdf.inputs["Metallic"].default_value = 1.0; bsdf.inputs["Roughness"].default_value = 0.25
```
- raea: bake colour + normal to images (procedural noise doesn't export), then
  `<StandardMaterial material="aluminium" base_color_texture={...} normal_map_texture={...} metallic={1} perceptual_roughness={0.25} />`
  with an `<Environment>` for reflections. Alternative: `<ExtendedMaterial base={<StandardMaterial .../>} extension={<WearExtension amount={0.15} />} />` for faint breakup.

## NOTES
- Deprecated: none (Noise Texture; if a guide says Musgrave, use Noise Texture with type fBM in 4.1+).
- Visual gaps: noise scale ("increase it by a whole lot") and the ramp colours are not stated `~`; the colour ramp is
  implied by "change this colour to a darker greyish and increase the whites".
- Rule conflicts: none.
