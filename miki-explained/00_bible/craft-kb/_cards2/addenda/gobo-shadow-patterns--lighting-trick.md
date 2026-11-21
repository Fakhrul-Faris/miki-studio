# Addendum → masters/04_Shading_Lighting/gobo-shadow-patterns.md
Source: "Studio Lighting, Silhouettes & Color Theory/This Lighting Trick Changed My Life...txt" — 00:00–01:27.

## New VALUES BY SOURCE column (lighting-trick: procedural gobo INSIDE the light, no plane)
| parameter | lighting-trick |
|---|---|
| Light | default **Area light, Spread 1°** ("hones the light in like a spotlight"), Cycles only |
| Pattern | light Use Nodes → select Emission → Ctrl+T (Texture Coordinate + Mapping + Image) → Shift+S swap Image for **Noise Texture** |
| Ramp | Color Ramp after the Noise to "crunch" it into dramatic moody patches (settings visual only) |
| Preview | light node preview dropdown shows the light on a **checkered floor** in real time |
| Accents | disc Area light for background + bounce on the lower half; point light on the metal logo (→ cards/04_Shading_Lighting/logo-catch-point-light--lighting-trick.md) |

## Extra steps
- Variant to the master's plane gobo: put Texture Coordinate → Mapping → Noise → Color Ramp → Emission inside the area light's own node tree; narrow Spread to 1° first so the pattern projects instead of washing out.
- Use the checkered-floor preview to judge the pattern before rendering.

## Notes
- Light node trees are Cycles-only (EEVEE ignores them); raea route unchanged (shadow="only" geometry gobo). Noise scale/ramp values visual only.
