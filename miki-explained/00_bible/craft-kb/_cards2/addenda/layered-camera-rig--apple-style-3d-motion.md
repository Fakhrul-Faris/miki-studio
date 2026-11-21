# Addendum → masters/05_Camera_Raea_Pipeline/layered-camera-rig.md
Source: "Minimalist Tech & SaaS 3D Staging/Apple-Style 3D Motion Design.txt" — 13:52–17:31 (scene 3), 21:46–26:37 (scene 4)

## Variant: two-carrier object rig (accent layer + travel layer)
Applied to the hero object, not the camera. Model parented to null 1; null 1 parented to null 2.
- Null 1 = the sharp rotation accents only: an opening rotation (+ model scale) on curve "0 left / 100 right" (fast start,
  long settle), and a small closing rotation on the opposite curve "100 left / 0 right" (accelerating out into the cut).
- Null 2 = the sustained linear travel across the whole shot.
- Before animating, move the model's anchor point to the screen centre so rotations pivot on the framed middle.
- Scene 4 stacks further carriers (one new 3D null per text beat, curve "100 on both sides"), with the model and all lights
  parented to the first so the light rig travels with the product.

## VALUES BY SOURCE row
| parameter | Apple-Style 3D Motion (AE) | recommended for Style D |
|---|---|---|
| layers | accent null (in/out rotation) → travel null (linear) | accent `Entity` (eased-out entry, eased-in exit) inside travel `Entity` (steady drift) |
| entry curve | influence 0 % / 100 % | kit `out` = bezier(0.16, 1, 0.3, 1) |
| exit curve | influence 100 % / 0 % | Easing.in(Easing.cubic) into the cut |
| per-beat carriers | 100 % / 100 % | kit `inOut` |
| pivot | anchor moved to screen centre | `Entity` origin at the framed centre |

Note: travel "linear" is house-OK only because it never starts/stops on screen (see linear-vs-eased-interpolation).
