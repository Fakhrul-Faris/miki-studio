---
title: Layer 2 — noise/Color Ramp masks for scatter distribution and scale (clumping)
bucket: 02_Geometry_Nodes
source: "The Key to Realistic Environments in Blender.txt"
source_time: "04:46–05:47, 06:17–06:49"
blender_version_source: 3.x
tool_target: Geometry Nodes
tier: principle
style_fit: Clumped, size-graded clusters read natural and leave negative space for the hero object; also lightens the build.
---

## METADATA
02_Geometry_Nodes | 3.x (Musgrave) → 4.1+ (Noise Texture types) | Geometry Nodes

## CREATIVE_INTENT
Principle: real things grow/gather in groups and at different ages, so uniform density and size is fake. Mask the distribution with one noise and the scale with a different noise so patches and sizes don't line up. Side benefit: fewer instances = lighter scene. Ideas: piles thick near the hero and thinning out; small items gathering in corners.

## STE_PROCEDURE
Method / how-to:
1. Add a mask effect to the distribution (video: a Musgrave mask); shape it with a Color Ramp.
2. Add a second, different mask to scale (video: Noise mask) so size and density vary independently.
3. Stack several masks on both distribution and scale for more randomness.
4. Check against reference; return to layer 1 (more types) if it still doesn't match.

## AGENT_EXECUTION
### Source tool (G-Scatter)
Scatter system → Distribution tab → add Mask effect (Musgrave) → edit its Color Ramp. Scale tab → add Mask effect (Noise). Values unknown (visual only).

### Blender / raea translation (GN, 4.2+)
Distribution mask:
`Position [Position] -> Noise Texture(type fBM ~, Scale ~3, Detail ~4) [Vector]`; `Noise Texture [Fac] -> Color Ramp(stops ~0.45 black, ~0.6 white) [Fac]`; `Color Ramp [Color] -> Math(Multiply, ×base density ~50) -> Distribute Points on Faces(Random) [Density]`.
Scale mask (separate noise, different Scale/W):
`Noise Texture(Scale ~1.2, W offset) [Fac] -> Map Range(From 0.3–0.7 → To 0.4–1.2) [Result] -> Math(Multiply) [Value] <- Random Value(Float 0.8–1.2)`; `-> Instance on Points [Scale]`.
```python
nz = N.new('ShaderNodeTexNoise'); nz.noise_type = 'FBM'   # 4.1+: replaces Musgrave
nz.inputs['Scale'].default_value = 3.0                      # ~
ramp = N.new('ShaderNodeValToRGB')                          # Color Ramp works in GN
mul = N.new('ShaderNodeMath'); mul.operation = 'MULTIPLY'; mul.inputs[1].default_value = 50  # ~
L.new(nz.outputs['Fac'], ramp.inputs['Fac']); L.new(ramp.outputs['Color'], mul.inputs[0])
L.new(mul.outputs['Value'], dist.inputs['Density'])        # Random mode Density is a field
```
raea: no equivalent (bake in Blender, export GLB).

## NOTES
- Deprecated: Musgrave Texture removed in 4.1 → Noise Texture with `noise_type` (FBM, Multifractal, Ridged, Hybrid, Hetero Terrain).
- All node values above are inferred (`~`); the video gives none.
- Visual gaps: G-Scatter panel walkthrough (04:46–06:49) is visual only.
- Rule conflicts: none.
