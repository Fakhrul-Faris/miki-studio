# Addendum → masters/04_Shading_Lighting/kelvin-light-colour.md
Source: "Studio Lighting, Silhouettes & Color Theory/Easy Blender Lighting HACK [Blender Tutorial].txt" (00:58–01:27)

## New VALUES BY SOURCE row(s)
| parameter | Easy Blender Lighting HACK | recommended for Style D (+ why) |
|---|---|---|
| Where Blackbody goes | World shader: Blackbody → Mix Color (with the mixed sky colours) → Background Color | raea: set the sun/ambient `color` hex from kelvin_hex(); no world node |
| Range | 0–10,000 K; lower = warmer scene | stay ~2,700–6,500 K |

## Extra steps / variants
1. Mix the two Sky Texture colours (Mix Color A/B), then mix that result with a Blackbody colour in a second Mix Color node, into the Background colour — a single warmth dial for the whole world.
