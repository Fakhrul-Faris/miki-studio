# Addendum → masters/04_Shading_Lighting/dim-fill-lift-shadows.md
Source: "Studio Lighting, Silhouettes & Color Theory/8 Lighting Tricks I Wish I Knew Earlier (Blender Product Lighting Tutorial).txt" — 01:19–01:57 (sphere), 04:06–04:22 (real product).

## New VALUES BY SOURCE row
| parameter | 8-lighting-tricks |
|---|---|
| Build method | a plain **Plane** (no light data at all) scaled down and placed beside the subject, with Object Properties › Visibility › Camera AND Shadow both disabled — it is invisible to the render but still reflects/bounces the key light onto the subject |
| Why a plane instead of a light | "this doesn't need to be a light" — a passive reflector catches whatever the key is already throwing and bounces a softened version of it back, rather than adding a second independent light to balance |
| Fix for a visible seam | if the plane's own edge creates "an ugly line" in the shadow, move the plane up slightly until the line disappears |
| Confirmation method | toggle the plane's visibility off/on: hidden = shadow very dark; shown = soft shadow fill — the before/after comparison IS the audition |

## Extra step
Add to the master's STE_PROCEDURE as an alternative build method (Blender-only; this is a build-time trick, not a
render-time light): instead of adding a second Area/RectLight as the fill, add a plain reflective Plane near the subject's
shadow side with camera and shadow visibility both off. It bounces the existing key's light passively. Use this when a
build is in Blender and a second light would otherwise need separate tuning; in raea (real-time, no path-traced bounce)
there is no passive-reflector equivalent, so the raea route stays the master's existing RectLight/AmbientLight fill —
this addendum documents the Blender-side shortcut only, it does not change the raea recipe.

## Notes
- No new raea values; raea already has no light-bounce-off-passive-geometry capability, so its fill recipe is unchanged.
