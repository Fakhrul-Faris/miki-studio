# Addendum → masters/04_Shading_Lighting/image-textured-light.md

Source: "Studio Lighting, Silhouettes & Color Theory/The Only Product Lighting Video You'll Ever Need (Blender Tutorial).txt" — 11:57–12:29 ("if you want to make a gradient light" section).

## New VALUES BY SOURCE column (only-product-lighting-video: Gradient Texture into Strength, not an image photo)
| parameter | only-product-lighting-video |
|---|---|
| light | Area light, Shader Editor opened via "Use Nodes" on the light itself |
| driver texture | **Gradient Texture** (procedural, not a photo) → plugged into Emission **Strength** |
| shape control | Spread lowered to 1 (narrows/sharpens where the gradient reads); a Color Ramp placed between the Gradient Texture and Strength decides exactly where the light "ends" along the gradient |
| goal | a controllable soft falloff-shaped beam, tuned purely by the Color Ramp stops — no image asset needed |

## Note
Same mechanism as the master's optional step 11 ("Image [Color] → Color Ramp → Emission [Strength]"), but the driver
is a procedural Gradient Texture instead of a photographed pattern — useful when no reference image exists and the
look wanted is a clean, controllable falloff rather than organic unevenness. raea translation: no equivalent for a
light-internal gradient; fake with a `<RectLight>` whose visible "card" is a plane carrying a gradient-alpha material
(see `gradient-alpha-emissive-plane-light--key-to-realistic-renders.md` for the plane-based version of the same idea).
