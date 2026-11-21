Target file: `../cards/04_Shading_Lighting/rim-light-edge-reflection--fundamentals-of-lighting.md`

Source: "Studio Lighting, Silhouettes & Color Theory/How COLORS Completely Change Your LIGHTING!.txt" (08:18–09:21)

The target card places the rim light opposite the **camera**; this source places it opposite the **main light** and
adds values the target card doesn't have: edge thickness control and a source-size → sharpness rule.

## New VALUES BY SOURCE row

| parameter | fundamentals-of-lighting (existing) | how-colors-change-lighting (new) | recommended for Style D |
|---|---|---|---|
| Position rule | opposite the camera, behind/above the object | on the edge **opposite the main light** (not the camera) | check both — on a single-key macro setup these usually coincide; when they don't, follow the main-light-opposite rule, since it is what keeps the rim motivated by the scene's own light logic |
| Thickness | not stated | "keep it thin and controlled, not too thick or it will look unnatural" | thin line only, no wide glow band |
| Sharpness by source size | not stated | small/intense light source = sharper rim; larger light source = softer edge | pick `outer_angle`/light size to match: a tight Spot for a crisp rim, a small soft Area light if a softer edge is wanted |
| Colour choice | left white/neutral | "use warmer tones to contrast with cool shadows, or an analogous colour to harmonize" | keep neutral/white by default (house rule: no second saturated colour); only tint it when the line's mood specifically calls for warm/cool contrast, and keep it desaturated |

## Extra step for the target's STE_PROCEDURE
- Before placing the rim, check which edge sits opposite the scene's main (key) light, not just opposite the camera —
  use that edge when the two don't agree.
- Scale the rim light's apparent size to the wanted sharpness: small/tight for a crisp line, larger/softer for a
  diffused edge; never let the band grow thick enough to look like a second fill.

## Timestamps
08:18–09:21 (rim light tutorial: placement, thickness, sharpness-by-source-size, colour choice).
