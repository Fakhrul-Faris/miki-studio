---
title: Darken/leave unlit what doesn't matter
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/darken-unimportant-areas-guide-eye--renders-look-boring.md
  - cards/04_Shading_Lighting/hide-weak-areas-in-darkness--dark-environments.md
sources: ["Why your Blender renders look BORING.txt", "How to Make DARK Environments in Blender.txt"]
use_when: "hiding weak areas and steering the eye to the subject"
style_fit: "The theory behind Style D's dark room + one soft top light; the line's subject must never be the hidden part, and near-black keeps detail (no crushed shadows on a phone)."
---

## METADATA
04_Shading_Lighting | n/a / 4.x → raea | principle-only + raea

## CREATIVE_INTENT
The eye has a small sharp spotlight and a blurry periphery, so it must travel round a frame; if everything looks equally
important the frame is tiring. Light and dark are the simplest composition tool: make what doesn't matter darker so the
eye lands on the subject. The same darkness is a production budget: rough or placeholder areas left in shadow pass, so
detail is spent only where light lands, and the light/dark balance is dramatic on its own.
- Renders look boring adds: the eye-spotlight reason, ranking focal/supporting/irrelevant, the squint check, darken the lesser of two competitors.
- Dark environments adds: darkness as a set-dressing budget — keep lights off weak areas, block spill, detail only where lit.

## STE_PROCEDURE
1. Before modelling more detail, rank what is in frame: focal point (the line's subject), supporting, irrelevant/weak.
2. Light the focal point brightest; let supporting elements fall to mid values.
3. Keep key and support lights off weak or placeholder areas; push corners, background and edges darker.
4. If weak areas still catch spill, darken them further with blockers.
5. Spend modelling/texture detail only where the light lands.
6. Check with a squint (heavy blur of the still): the brightest blob must be the focal point.
7. If two areas compete, darken the lesser one rather than brightening the focal one.
8. Render each setup's first frame as a still and look for lit placeholder geometry before the preview.

## VALUES BY SOURCE
| parameter | Renders look boring | Dark environments | recommended for Style D (+ why) |
|---|---|---|---|
| Key | Spot `spot_size` ~45°, `spot_blend` ~0.6 (Blender preview); raea SpotLight outer 0.35 / inner 0.12 | narrow cones on finished assets | narrow soft top SpotLight on the hero (one soft top light) |
| World/ambient | world strength ~0.05; `AmbientLight` 15 | — | ambient 5–15 (dark room, shadows not crushed) |
| Vignette | `Grade vignette` 0.35 / radius 0.75 / smoothness 0.5 | — | keep, subtle |
| Spill control | darken the lesser competitor | blockers (`shadow="only"`) over placeholders | both |
| Check | squint blur sigma 40 | per-setup first-frame stills | both |

## AGENT_EXECUTION
Blender preview: a falloff key (Spot, `spot_size` ~0.785 rad (45°), `spot_blend` ~0.6) on the hero; world strength
~0.05 so the room stays dark.
raea (lights.md, post.md):
```tsx
<SpotLight transform={Transform.fromXyz(0, 2.0, 0.3).lookingAt([0, 0, 0])} intensity={1200000}
  outer_angle={0.35} inner_angle={0.12} shadow_maps_enabled soft_shadows_enabled radius={0.3} />
<AmbientLight brightness={15} />
<Grade vignette={{ intensity: 0.35, radius: 0.75, smoothness: 0.5 }} />
{/* invisible blocker over a placeholder corner: casts shadow, never drawn */}
<Mesh3d name="flag" shadow="only" transform={Transform.fromXyz(-0.8, 1.2, 0)}><Cuboid half_size={[0.5, 0.01, 0.5]} />
  <StandardMaterial base_color="#000000" /></Mesh3d>
```
Squint check of a rendered still:
```bash
ffmpeg -i out/s03.png -vf "gblur=sigma=40,format=gray" -y review/s03_squint.png
```

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none, but the line's subject must never be the hidden part. Keep detail near black (no crushed
  shadows) and check on a phone at low brightness. Anti-slop "shadow as character" agrees.
