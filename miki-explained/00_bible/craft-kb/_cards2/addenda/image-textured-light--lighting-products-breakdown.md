# Addendum → masters/04_Shading_Lighting/image-textured-light.md
Source: "Studio Lighting, Silhouettes & Color Theory/Lighting Products in Blender (Breakdown).txt" — 01:26–02:30 (Bang & Olufsen scene). Spanish narration, translated.

## New VALUES BY SOURCE column/rows (lighting-products-breakdown)
| parameter | lighting-products-breakdown |
|---|---|
| Light | Spot; **Spot Size 180°** when the image mask is inside the light; Radius sets soft ↔ sharp |
| Image | black-and-white mask of a **leaf or window** (free download) in the light's node tree |
| Purpose | patterned shadows "without any light blocker or gobo plane" — the texture lives inside the light |
| Workflow shortcut | paid add-on "Gobos Light Textures": drag & drop preset, set position/rotation, raise intensity, Radius soft/sharp |
| Fill | HDRI (Poly Haven brown photo studio, author's default) fills the shadows |

## Extra steps
- If no add-on: download a B/W leaf/window mask, wire it into the light node setup (Image → Emission Color/Strength), and set the Spot Size to 180° so the mask, not the cone, shapes the light.
- Radius controls the pattern's edge: small = sharp leaf edges, large = soft.

## Notes
- Paid add-on not usable; any CC0 mask works (log in ASSET-SOURCES.md). raea route unchanged (no light cookie → shadow="only" geometry gobo or Decal; see master).
