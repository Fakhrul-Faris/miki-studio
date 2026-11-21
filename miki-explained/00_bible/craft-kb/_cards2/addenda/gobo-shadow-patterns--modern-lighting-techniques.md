Target: `masters/04_Shading_Lighting/gobo-shadow-patterns.md`
Source: "Studio Lighting, Silhouettes & Color Theory/Modern Lighting Techniques in Blender.txt" (05:39–07:25)

## New VALUES BY SOURCE row
| parameter | this source |
|---|---|
| light type | **area light**, not the master's Spot-with-Radius/Blend recipe |
| control parameter | area light **Spread** (degrees) controls gobo sharpness directly — at Spread = 1°, the leaf/plant
cut-out silhouette is "as solid as it gets," a crisp hard-edged gobo; at Spread = 10°, "that entire thing is gone" —
the silhouette fully disappears into soft wash |
| blocker | a black-and-white PNG cut-out of a plant/leaf shape (from a texture site), placed as the blocker in front of
the area light, shining through it |
| pairing | combined with Sky Texture sun strength = 0, overall strength 0.24 (see HDRI addendum) as the only other
light in the scene — the gobo silhouette is the sole shaping light |

## Why this matters for the raea build
The master's raea recipe uses `SpotLight` `outer_angle`/`inner_angle`/`radius` to control gobo softness. This source
shows area-light **Spread** is a second, independent control knob for the same softness goal, with an unusually wide
effective range (1°=hard, 10°=invisible) — useful if a `RectLight`-based gobo rig is used instead of a `SpotLight`
one; tune `RectLight` width/height-to-distance ratio as the Spread-equivalent (smaller apparent size = harder gobo
edge, matching Spread→1°; larger = softer, matching Spread→10°).

## NOTES
- Timestamp: 05:39–07:25.
- Visual gap: the exact PNG cut-out source/threshold isn't shown beyond "black and white image... from textures.com."
