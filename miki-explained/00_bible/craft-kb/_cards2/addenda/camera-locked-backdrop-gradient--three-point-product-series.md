# Addendum → cards/04_Shading_Lighting/camera-locked-backdrop-gradient--perfect-product-animations.md
Source: "Studio Lighting, Silhouettes & Color Theory/Three Point Lighting Tutorial | Blender Product Rendering Series.txt" — 00:23–00:36, 01:10–01:18.

## New VALUES BY SOURCE row
| parameter | three-point-product-series |
|---|---|
| gradient source | **Spot light** aimed at a backdrop plane behind the subject (instead of an area light in front of it) |
| gradient softness | Spot **Blend** amount sets the gradient's falloff ("a nice gradient behind our subject") |
| seamless trick | depth of field blurs the plane's edges so the backdrop reads as a seamless gradient |
| role | separates the background from the subject (replaces the classic rim's job) |

## Extra steps
1. Put a plane behind the subject; aim a Spot at it; raise Blend until the pool becomes a soft gradient.
2. Add DoF (focus on the hero) so the backdrop edge and pool blur into one gradient.

## raea
`<SpotLight outer_angle≈0.5 inner_angle≈0.05 ... lookingAt(backdrop)>` (small inner = large Blend) on a dark backdrop Cuboid; DoF via the camera's aperture (kit ProStage `aperture`). Values `~`. Keep the pool neutral or a dim accent tint only if the accent isn't used elsewhere in the frame.
