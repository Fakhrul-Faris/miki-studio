Target: `cards/05_Camera_Raea_Pipeline/vignette-grain-curves-grade--ten-cinematic-tips.md`
Source: "Minimalist Tech & SaaS 3D Staging/How to actually make eye-catching 3D Scenes | After Effects.txt" (11:49–14:33)

## New VALUES BY SOURCE row (alternate/AE method for the same vignette + grade)
| parameter | this source ("eye-catching 3D Scenes", AE) |
|---|---|
| grade | Lumetri Color → Color Wheels: push Shadows toward blue; Curves: slight S-curve for contrast, "nothing over the top" — same direction (blue shadows + contrast) as the existing card's RGB Curves steps, confirms the recipe |
| vignette mechanism | separate adjustment layer: Radial Blur effect (amount brought down from default to **4**) + an inverted, feathered Ellipse mask targeting the sides only (not centre) — functionally the same "ellipse mask + blur, multiply toward the edges" idea as the existing card, built with a blur-the-edges effect instead of darkening them |
| extra: edge chromatic aberration | layered on the *same* edge-only masked region: VC Chromatic Aberrations or the free "Quick Chromatic Aberrations 3" plugin, amount **3–5** (source tried 3, settled near 5) — paired with the vignette mask so the fringe only shows at the edges, not the whole frame |

## NOTES
- This confirms the existing card's shadows-blue + S-curve direction is a repeatable cross-source recipe.
- The "blur the edges" vignette variant (vs. darken-the-edges) is a legitimate alternate mechanism worth noting if a
  setup wants a softer edge falloff rather than a dark one; raea equivalent: a separate blurred layer clipped to an
  edge-only feathered mask, same pattern as the masked-blur-for-DoF card from this source.
- Timestamps: 11:49–12:27 (grade + radial-blur vignette), 12:27–12:45 (edge chromatic aberration, masked to the same
  region).
