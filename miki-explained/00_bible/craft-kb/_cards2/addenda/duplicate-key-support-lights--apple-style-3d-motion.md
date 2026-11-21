# Addendum → masters/04_Shading_Lighting/duplicate-key-support-lights.md
Source: "Minimalist Tech & SaaS 3D Staging/Apple-Style 3D Motion Design.txt" — 08:37–10:23 (scene 2), 14:17–15:28 (scene 3), 18:13–19:30 (scene 4)

## Variant: duplicate-and-nudge product rig (one key, copies left/right, rims, under-fill)
1. Ambient first: 28 % (scene 2), ~18 % (scene 4).
2. Key spot from above and slightly in front, point of interest on the model's centre; radius 5,000 (scene 2) / 9,000 (scenes 3–4).
3. Duplicate → move far left; duplicate → opposite side; lower their intensity a little.
4. Duplicate again, lower and pushed to the frame edge → rim light along the side, intensity reduced; mirror to the other side.
5. One point light under the model, soft fill from below (lower intensity).
6. Scene 3: reduce a copy's radius to keep light off specific parts (the ports) — contain spill by cone size.
7. Parent the under-light (or all lights) to the model/its carrier so the rig moves with it; shift the lights right→left on a text beat.

## VALUES BY SOURCE row
| parameter | Apple-Style 3D Motion (AE) | recommended for Style D |
|---|---|---|
| ambient | 28 % / 18 % | AmbientLight 20–80 (dark room) |
| key | spot above + slightly front, radius 5,000–9,000 | SpotLight/RectLight top, `range` ≈ 2× distance |
| copies | 2 sides + 2 rims (lower intensity) + 1 under point | ≤ 0.2 × key each; rims for edge only; under-fill very low |
| spill control | reduce cone radius on one copy | narrow `outer_angle` |
