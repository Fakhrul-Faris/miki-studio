---
title: Sun wrap — upstage bounce becomes the key; avoid the "sandwich"
bucket: 04_Shading_Lighting
source: "Backlight Everything - A Cinematographer's Hammer.txt"
source_time: "13:36–15:39, 19:05–20:16, 21:20–22:24"
blender_version_source: n/a (live-action cinematography)
tool_target: principle-only
tier: principle
style_fit: Fits Style D — a backlit hero gets its readable face from a soft upstage fill/bounce on the far side, keeping the camera side dark.
---

## METADATA
04_Shading_Lighting | n/a (live-action) | principle → Blender bpy + raea

## CREATIVE_INTENT
Principle: with the sun behind the subject (through diffusion for the edge), put a big white bounce off to the side, between subject and background ("upstage"), out of the diffusion's shadow. Sunlight hitting it reflects onto the face: the bounce becomes the effective key, wrapping the backlight around the subject. Do not put light on both sides (backlight + bounce from the camera side = a flat "sandwich"); keep the camera side dark. Ideas: hero object backlit, with a soft panel placed beside and slightly behind it on the side away from the camera, so the face toward camera rolls from lit to shadow.

## STE_PROCEDURE
Method:
1. Keep the main source behind the subject for the rim.
2. Place a large bounce (ultrabounce / bleached muslin) to the side, upstage of the subject, in direct light.
3. Angle it so its reflection reaches the subject's face; treat it as the key.
4. Keep the camera-side of the subject unlit (no second bounce there).
5. For more level, move the bounce closer or lighten the diffusion; do not add light on the camera side.
How-to:
6. Check the face transitions from lit (upstage side) to shadow (camera side) — "short side" lighting.

## AGENT_EXECUTION
### Source tool (live-action set)
- Sun → 12×12 diffusion (edge) ; sun → 12×12 or 8×8 ultrabounce/muslin outside the diffusion, upstage, bouncing back to the face; negative fill on the opposite side (see negative-fill-contrast-control--backlight-everything).
### Blender / raea translation
- Blender: bounce = Area light (no real bounce needed in EEVEE/raea): place it beside/behind the subject on the far side from camera, `shape='RECTANGLE'`, `size≈1–2` (`~`), warm sun colour, energy ~30–50 % of the key (`~`), aimed at the subject.
- raea:
  ```tsx
  <SpotLight transform={Transform.fromXyz(...keyBehind).lookingAt(H)} intensity={900000} outer_angle={0.5} inner_angle={0.25} shadow_maps_enabled soft_shadows_enabled />
  <RectLight transform={Transform.fromXyz(...upstageSide).lookingAt(H)} intensity={300000} width={1.2} height={1.2} color="#ffe2c0" />
  {/* no light from the camera side */}
  ```
  `upstageSide` = beside the hero, on the side away from camera, slightly behind it (`~` intensities).

## NOTES
- Visual gap: which side "over here" is in each shot is on-screen only.
- Rule conflicts: none.
