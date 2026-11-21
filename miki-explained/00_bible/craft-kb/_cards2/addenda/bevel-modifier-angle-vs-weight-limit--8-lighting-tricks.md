# Addendum → cards/03_Modeling_Modifiers/bevel-modifier-angle-vs-weight-limit--manual-bevels.md
Source: "Studio Lighting, Silhouettes & Color Theory/8 Lighting Tricks I Wish I Knew Earlier (Blender Product Lighting Tutorial).txt" — 02:54–03:47.

## New VALUES BY SOURCE row
| parameter | 8-lighting-tricks |
|---|---|
| Fast/fake option | a **Bevel shader node** (Normal input), connected into the Normal socket of the Principled BSDF — rounds the apparent edge in shading only, no mesh change |
| Shader bevel value | Radius 0.02 (at the source's cube scale) — the default looked "too strong" |
| Limitation shown on screen | zooming in on the cube's silhouette still shows the original hard mesh edge — the shader bevel only fakes the shading, the actual geometric edge is still sharp |
| Real option (preferred) | Bevel **modifier**, Amount 0.03, Segments 5 — "much higher quality... looks more realistic" because the edge is real geometry, holds up on silhouette and at any angle |
| When the source reaches for the shader version at all | quick look-dev / comparison only — the video's own conclusion is to remove the shader bevel and use the modifier for the final look |

## Extra step
Add an explicit comparison step to the master's STE_PROCEDURE: before committing to the modifier, optionally preview a
Bevel shader node (Geometry → Bevel → Normal, Radius ~0.02) wired into the material's Normal input, to cheaply check how
a rounded edge will read — then discard it and build the real bevel with the modifier (Angle or Weight, per the master),
since the shader-only version fails on silhouette and under close inspection, both of which a macro Style D shot relies on.

## raea
No new raea step — the master already correctly routes to real modifier-built geometry for raea export; this addendum
only documents why the shader-node shortcut should never be the final choice for a macro hero (visible silhouette edge
would betray the fake).
