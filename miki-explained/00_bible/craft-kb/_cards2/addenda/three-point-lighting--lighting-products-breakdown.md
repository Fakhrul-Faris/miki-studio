# Addendum → masters/04_Shading_Lighting/three-point-lighting.md
Source: "Studio Lighting, Silhouettes & Color Theory/Lighting Products in Blender (Breakdown).txt" — 02:58–03:45 (deodorant scene). Spanish narration, translated.

## New VALUES BY SOURCE column (lighting-products-breakdown, product variant: 3 area lights + HDRI)
| parameter | lighting-products-breakdown |
|---|---|
| key | Area light **stretched along Z** (tall strip) → long vertical reflections on the product |
| back / rim | "background light": Area behind that lights the product so it **stands out from the background** and adds reflections on the bubbles |
| extra | small Area with **reduced spread, only on the product's top** (→ cards/04_Shading_Lighting/top-surface-highlight-accent-light--lighting-products-breakdown.md) |
| fill | HDRI only (no fill light) |
| engine | Octane; "principles are the same in all render engines" |

## Variant
- Product three-point with the fill replaced by an HDRI at low strength; in raea: `<Environment>` intensity ~0.3 (no background) instead of AmbientLight fill. Strip key in raea: RectLight width ≪ height, `range` ≈ 2× distance.
- Values beyond roles are visual only.
