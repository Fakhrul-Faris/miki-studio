# Addendum → masters/04_Shading_Lighting/light-blockers-flags.md

Source: "Studio Lighting, Silhouettes & Color Theory/The Only Product Lighting Video You'll Ever Need (Blender Tutorial).txt" — 11:21–11:57 (product-lighting "bonus tip" section).

## New VALUES BY SOURCE column (only-product-lighting-video: in-frame gradient shadow on the product itself)
| parameter | only-product-lighting-video |
|---|---|
| use case | not an off-screen spill fix — a deliberate **one-sided gradient shadow across the product's own surface**, used as a stylistic look |
| light | one Area lamp placed/rotated to rake across the product (RX 90, RZ 45 in the demo) |
| blocker | a plain plane placed between the light and the product, toggled visibility on/off to compare before/after |
| result | one side of the product reads darker than the other — a soft directional gradient, not a hard shadow edge |
| second blocker | a second plane added on the opposite side for a two-sided variant |

## Note
Same mechanism as the master (an unseen/partial caster between light and subject darkens an area) applied in-frame as
a deliberate look rather than spill control. In raea: a `shadow="only"` Cuboid/Manifold flag placed to clip one side of
the key's cone — same card pattern as the master's `<Mesh3d shadow="only">` example, just positioned to graze the
hero rather than hide fully off-camera.
