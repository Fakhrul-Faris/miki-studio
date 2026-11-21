---
title: Dark edge framing / natural vignette from unlit objects
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/dark-edge-framing-blockers--improve-compositions.md
  - cards/05_Camera_Raea_Pipeline/dark-perimeter-natural-vignette--dark-environments.md
sources: ["3 Ways to Improve Your Compositions in Renders.txt", "How to Make DARK Environments in Blender.txt"]
use_when: "dark-room framing around the hero"
style_fit: Fits the Style D dark room — dark out-of-focus foreground shapes and shadowed props frame the bright hero; built in-scene first, `<Grade vignette>` only to enhance. Keep the bottom edge dark-but-readable for the EX15 caption panel; blockers move with the camera, never pop. No AE/Photoshop vignette.
---

## METADATA
05_Camera_Raea_Pipeline | n/a / 4.x sources → 4.2+/5.x, raea | Blender bpy + raea

## CREATIVE_INTENT
Keep the frame's border darker than its centre with big, bold, dark, unlit shapes from the scene itself — a vignette built from
objects — so unimportant areas are blocked off, the image feels darker overall and the eye snaps to the bright subject.
- Improve Compositions: bold simple masses (neutral foreground block, shadowed wagons, unlit trees), low detail, so they read as masses not competing objects.
- Dark Environments: audit each edge for bright areas, balance left vs right, keep foreground and ceiling unlit, then optionally a mild post vignette.

## STE_PROCEDURE
1. Identify frame areas that don't need attention (edges, corners, foreground, ceiling).
2. Before adding a post vignette, check each frame edge for bright areas.
3. Place large simple shapes there (foreground block, pillar, props, foliage, branch) — between the light and any bright edge.
4. Keep those shapes dark: in shadow, unlit, low detail, neutral colour.
5. Balance the sides: a blocker on the right mirrors a pillar on the left.
6. Keep the foreground out of the key's direct light so the bottom edge is dim; keep the top edge unlit.
7. Keep the centre (subject area) the brightest region.
8. Check that the frame shapes read as bold masses, not detailed objects competing for attention.
9. Re-check edges per camera setup (in-scene darkness follows each setup).
10. Then optionally enhance with a mild vignette in post.

## VALUES BY SOURCE
| parameter | Improve Compositions | Dark Environments | recommended for Style D (+ why) |
|---|---|---|---|
| blocker look | bold, dark, unlit, low detail, neutral | unlit pillars/branches, balanced L/R | `base_color` ~#15161a, roughness 0.9, blurred by DoF |
| exclusion from key | shadow / light linking | placement out of the key cone | placement outside SpotLight cone (`outer_angle` 0.3–0.6) or `shadow="only"` blocker — raea has no light linking |
| post vignette | — | mild, enhancement only | `<Grade vignette={{ intensity: ~0.25, radius: ~0.75, smoothness: ~0.5 }}>` (kit ProStage uses 0.18) |

## AGENT_EXECUTION
Blender 5.x: foreground blocker out of the key's reach, or excluded via light linking (4.0+; Cycles, EEVEE Next 4.2+):
```python
import bpy
fg = bpy.data.objects["FG_block"]
fg.visible_shadow = True
key = bpy.data.objects["Key"]
key.light_linking.receiver_collection = bpy.data.collections["Lit_by_key"]
```
raea:
```tsx
<Grade vignette={{ intensity: 0.25, radius: 0.75, smoothness: 0.5 }} />   {/* ~ enhancement only; first frame's Grade holds */}
<Mesh3d name="fgBlock" transform={Transform.fromXyz(-0.6, 0.1, 1.2)}>        {/* near the lens, outside the key cone */}
  <Cuboid half_size={[0.5, 0.3, 0.2]} />
  <StandardMaterial base_color="#15161a" perceptual_roughness={0.9} />
</Mesh3d>
<Mesh3d name="edgeBlockR" shadow="only" transform={Transform.fromXyz(1.6, 2.5, 0.5)}>   {/* blocks light, unseen */}
  <Cuboid half_size={[0.4, 2.5, 0.4]} />
  <StandardMaterial base_color="#000000" />
</Mesh3d>
```
With `<DepthOfField>` inside the camera the foreground blocker blurs into a soft dark mass.

## NOTES
- Deprecated: none.
- Light linking isn't exported by blend2raea/BlendShot; achieve the same by placement.
- `<Grade>` is first-frame-only for the whole piece (post.md); per-setup edge darkness must come from the scene.
- Visual gaps: which objects darken which edge is shown, not measured.
- Rule conflicts: blockers entering/leaving frame do so with the camera, never popping; bottom edge stays readable for the caption panel; vignette via `<Grade>`, never AE/Photoshop.
