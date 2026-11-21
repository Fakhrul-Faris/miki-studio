---
title: Animated LED back wall from Wave Texture + two Gradient masks + Modulo (backlight and reflections)
bucket: 04_Shading_Lighting
source: "Making a Car Animation in Blender!.txt"
source_time: "10:53–11:23, 13:39"
blender_version_source: 3.x/4.x
tool_target: Shader nodes | raea
tier: full
style_fit: A moving emissive backdrop gives glossy heroes living reflections; in Style D only if the brand colour is the LED colour and the backdrop stays dark/out of focus.
---

## METADATA
04_Shading_Lighting | 3.x/4.x → 4.2+ / raea | Shader nodes + raea

## CREATIVE_INTENT
A quiet hero end shot needs one more layer of life: a back wall of moving light bars creates reflections and a coloured contrast (video: red wall vs bluish key lights, the brand's colours).

## STE_PROCEDURE
1. Build a simple studio: reflective floor, ceiling, back wall.
2. On the back wall material, add a Wave Texture for the bars.
3. Add two Gradient Textures as masks (falloff across the wall).
4. Use a Math node set to Modulo (Floored Modulo in 4.x) to repeat/fall off the pattern.
5. Multiply the result into an Emission shader; colour it red (contrast with the blue key).
6. Animate the wave (e.g. keyframe or driver on the mapping offset / Phase Offset) so the bars move.
7. After render, check for bloom on the bright lights (reviewer note: missing bloom hurt realism).

## AGENT_EXECUTION
Shader nodes (layout inferred; the video says only "wave + two gradients as masks + modulo"):
```
Texture Coordinate [Object] -> Mapping [Vector] (Location X animated ~ #frame*0.01)
Mapping [Vector] -> Wave Texture [Vector] (Bands, X, Scale ~6)
Mapping [Vector] -> Math (Floored Modulo, ~0.2) -> Math (Greater Than ~0.1)      # LED cell steps ~
Gradient Texture A (Linear) [Fac] × Gradient Texture B (Linear, rotated 90°) -> mask
Wave [Fac] × step × mask -> Emission [Strength] (× ~10); Emission Color = #ff2020 ~
Emission -> Material Output [Surface]
```
raea: no shader nodes; build the wall as emissive geometry or a page:
```tsx
{Array.from({ length: 24 }, (_, i) => {
  const lit = 0.5 + 0.5 * Math.sin(i * 0.6 - f * 0.15);
  return <Mesh3d key={i} name={`led-${i}`} transform={Transform.fromXyz(-2.3 + i * 0.2, 1.2, -3)}>
    <Cuboid half_size={[0.07, 1.0, 0.01]} />
    <StandardMaterial base_color="#100404" emissive={LinearRgba.from(Srgba.hex("#ff2020")).mul(4 * lit)} />
  </Mesh3d>;
})}
<Bloom intensity={0.6} threshold={0.9} />
```
Add a `RectLight` behind the hero for the wall's actual light (emissive parts don't light neighbours). A `<Screen>` with an animated HTML/CSS bar pattern is the other route.

## NOTES
- Deprecated: Math "Modulo" was split into Truncated Modulo / Floored Modulo (3.x+); MixRGB → Mix node (Color).
- Visual gaps: exact node wiring, scales and colour stops are shown only; above is `~` reconstruction. Lightning (purchased geo-nodes "lightning bolt generator") skipped: paid add-on, no procedure given.
- Rule conflicts: no on/off strobing (user rejected flicker); bars drift smoothly. The LED colour must be the brand accent, used only when the line is about that object; otherwise keep the wall dim/neutral.
