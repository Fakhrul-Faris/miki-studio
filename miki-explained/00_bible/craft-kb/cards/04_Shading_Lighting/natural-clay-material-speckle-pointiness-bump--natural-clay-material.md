---
title: Natural (non-toy) clay material — speckle, pointiness roughness, two-scale bump, lump displacement
bucket: 04_Shading_Lighting
source: "Studio Lighting, Silhouettes & Color Theory/Blender 3.0 Natural Clay Material In Under 4 Mins!.txt"
source_time: "00:04–03:30"
tool_target: raea
tier: full
use_when: "a hero or prop that is real clay/terracotta/earthenware (flower pot, belanga, tembikar, kiln brick) and must read as a real surface at macro distance"
style_fit: "Fits Style D's 'real surface at macro detail'. Built procedurally in Blender, then BAKED to textures for raea (raea has no procedural nodes). Not a return to the clay-maquette house look: use for objects that are clay in reality."
---

## METADATA
04_Shading_Lighting | Blender 3.0 Cycles (Pointiness is Cycles-only) → 4.x/5.x | Shader nodes → bake → GLB → raea StandardMaterial textures

## CREATIVE_INTENT
A toy-looking clay is one flat colour with uniform gloss. Natural clay has fine dark speckles, slight colour variation,
a sheen that changes with curvature, fine grain, and larger soft lumps. The recipe builds each of these as its own small
node chain, all on Object coordinates, with low strengths so it stays subtle ("bump strength 0.07 to keep the speckles
from being too strong").

## STE_PROCEDURE
Speckle mask
1. Add Voronoi Texture; Ctrl+Shift+T (Node Wrangler) for Mapping + Texture Coordinate; plug **Object** into Vector.
2. Set Voronoi feature to **Smooth F1**, Scale **34**.
3. Plug Voronoi Distance → Color Ramp Fac; crunch the ramp stops together for contrast (speckle dots).
Base colour
4. Duplicate the Color Ramp as the base colour: stop 1 orange, stop 2 slightly lighter orange.
5. Add Mix RGB: base ramp → Color1, speckle ramp → Color2; mode **Multiply**, **Clamp** on, Factor **0.5 → 1.0**.
6. Mix → Principled Base Color.
Roughness
7. Add Geometry node; Pointiness → Color Ramp → Principled Roughness.
8. Crunch the ramp stops; set the colours to light grey (sells the clay sheen).
Bump (two scales)
9. Add Bump: speckle Color Ramp → Height; Bump Normal → Principled Normal; Strength **0.07**.
10. Add Noise Texture (Object coords via Mapping); duplicate the Bump, Noise Fac → Height; Scale **~3.3** (stated
    "scale ~3.3"; most likely the Noise scale); chain this Bump's Normal into the first Bump's Normal input.
Displacement (lumps)
11. Add Musgrave Texture with Object coords → Vector.
12. Add Mix RGB: Musgrave Height → Color1, Object coords → Color2; Factor **~0.9**.
13. Mix → Mapping Vector → Voronoi Texture → Color Ramp (contrast; dial the Voronoi scale by eye).
14. Color Ramp → Displacement Height; Displacement → Material Output Displacement; Scale **0.08**; Midlevel **0**.
15. Before rendering, set Material Properties › Settings › Displacement = **Displacement and Bump**.
16. Check at macro distance: speckles visible but quiet, sheen varies on edges, lumps soft.

## AGENT_EXECUTION
**Blender 4.x/5.x build (then bake):**
```python
import bpy
m = bpy.data.materials.new("NaturalClay"); m.use_nodes = True
N, L = m.node_tree.nodes, m.node_tree.links; P = N["Principled BSDF"]; out = N["Material Output"]
tc = N.new("ShaderNodeTexCoord")
vor = N.new("ShaderNodeTexVoronoi"); vor.feature = 'SMOOTH_F1'; vor.inputs["Scale"].default_value = 34
L.new(tc.outputs["Object"], vor.inputs["Vector"])
spk = N.new("ShaderNodeValToRGB"); spk.color_ramp.elements[0].position = 0.35; spk.color_ramp.elements[1].position = 0.45  # ~ "crunched"
L.new(vor.outputs["Distance"], spk.inputs["Fac"])
base = N.new("ShaderNodeValToRGB")
base.color_ramp.elements[0].color = (0.62, 0.25, 0.10, 1); base.color_ramp.elements[1].color = (0.75, 0.35, 0.16, 1)  # ~ orange → lighter
L.new(vor.outputs["Distance"], base.inputs["Fac"])                       # ~ base ramp input not stated
mix = N.new("ShaderNodeMix"); mix.data_type = 'RGBA'; mix.blend_type = 'MULTIPLY'; mix.clamp_result = True
mix.inputs["Factor"].default_value = 1.0
L.new(base.outputs["Color"], mix.inputs["A"]); L.new(spk.outputs["Color"], mix.inputs["B"]); L.new(mix.outputs["Result"], P.inputs["Base Color"])
geo = N.new("ShaderNodeNewGeometry"); rr = N.new("ShaderNodeValToRGB")
rr.color_ramp.elements[0].color = (0.55,)*3 + (1,); rr.color_ramp.elements[1].color = (0.8,)*3 + (1,)   # ~ light greys
L.new(geo.outputs["Pointiness"], rr.inputs["Fac"]); L.new(rr.outputs["Color"], P.inputs["Roughness"])
b1 = N.new("ShaderNodeBump"); b1.inputs["Strength"].default_value = 0.07; L.new(spk.outputs["Color"], b1.inputs["Height"])
nz = N.new("ShaderNodeTexNoise"); nz.inputs["Scale"].default_value = 3.3; L.new(tc.outputs["Object"], nz.inputs["Vector"])
b2 = N.new("ShaderNodeBump"); b2.inputs["Strength"].default_value = 0.07; L.new(nz.outputs["Fac"], b2.inputs["Height"])
L.new(b2.outputs["Normal"], b1.inputs["Normal"]); L.new(b1.outputs["Normal"], P.inputs["Normal"])
# lumps: Musgrave merged into Noise in 4.1+ (type 'FBM')
mus = N.new("ShaderNodeTexNoise"); mus.noise_type = 'FBM'; L.new(tc.outputs["Object"], mus.inputs["Vector"])
mx2 = N.new("ShaderNodeMix"); mx2.data_type = 'RGBA'; mx2.inputs["Factor"].default_value = 0.9
L.new(mus.outputs["Fac"], mx2.inputs["A"]); L.new(tc.outputs["Object"], mx2.inputs["B"])
mp = N.new("ShaderNodeMapping"); L.new(mx2.outputs["Result"], mp.inputs["Vector"])
v2 = N.new("ShaderNodeTexVoronoi"); L.new(mp.outputs["Vector"], v2.inputs["Vector"])
dr = N.new("ShaderNodeValToRGB"); L.new(v2.outputs["Distance"], dr.inputs["Fac"])
disp = N.new("ShaderNodeDisplacement"); disp.inputs["Scale"].default_value = 0.08; disp.inputs["Midlevel"].default_value = 0
L.new(dr.outputs["Color"], disp.inputs["Height"]); L.new(disp.outputs["Displacement"], out.inputs["Displacement"])
m.displacement_method = 'BOTH'      # "Displacement and Bump" (4.2+: material.displacement_method)
```
Then: subdivide the mesh, bake Diffuse (colour only), Roughness and Normal (Cycles bake) to 2k PNGs, and apply the
displacement as real geometry (Displace modifier from the baked height, or keep as normal only for small lumps);
export GLB. Log textures in ASSET-SOURCES.md.

**raea:**
```tsx
<Model src={staticFile("clay_pot.glb")} />          {/* baked maps travel in the GLB */}
{/* or on a raea mesh: */}
<StandardMaterial base_color_texture={staticFile("clay_diff_2k.png")} normal_map_texture={staticFile("clay_nor_gl_2k.png")}
  metallic_roughness_texture={staticFile("clay_rough_2k.png")} perceptual_roughness={1} />
```
Normal map must be OpenGL (`_nor_gl`) for Bevy. Kit `Clay` (`tools/raea/kit/clay.tsx`, roughness 0.66) is the flat
fallback.

### Worked example
Topic: "Pasu tanah liat RM8 vs pasu plastik RM3: untung mana untuk nurseri kecil?" (numbers illustrative; plain price comparison).
BEFORE: `| 2 | "pasu tanah liat, RM8" | macro on a pot, one flat orange material | price fades in | — |` — reads as plastic.
AFTER: `| 2 | "pasu tanah liat, RM8" | macro 3/4 down the pot rim under the soft top key; speckles, grain and soft lumps visible, sheen brighter on the rim | "RM8" tag (accent) fades in 0.4 s on "RM8"; camera slides 4 cm along the rim | natural-clay-material-speckle-pointiness-bump--natural-clay-material |`

### Check
- At phone size, are speckles visible but not noisy (bump ≤ ~0.1)?
- Does roughness vary on edges vs flats?
- Are all textures baked (no procedural nodes expected in raea)?
- Is the object actually clay in reality (not a maquette look)?

## NOTES
- Deprecated: Mix RGB → Mix node (Color) 3.4+; Musgrave → Noise Texture (type fBM) 4.1+; material displacement setting
  moved from Cycles settings to `material.displacement_method` (4.2+). Pointiness works in Cycles only (bake it).
- Visual gaps: ramp stop positions and exact orange hexes visual only (`~`); which input feeds the base ramp is not
  stated; the "scale 3.3" target (Noise vs Bump) is ambiguous.
- Dropped: sponsor (Skillshare).
