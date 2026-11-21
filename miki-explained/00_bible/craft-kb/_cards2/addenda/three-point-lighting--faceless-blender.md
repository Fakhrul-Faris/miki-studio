# Addendum: three-point-lighting ← Edit Faceless Video's (like Fern, Neo & Imperial) - Blender Tutorial
Target: `masters/04_Shading_Lighting/three-point-lighting.md`
Source: "3D Documentary Explainer Breakdowns/Edit Faceless Video's (like Fern, Neo & Imperial) - Blender Tutorial.txt" (06:45–10:36)

## New VALUES BY SOURCE row
| parameter | Faceless (Fern-style) | recommended for Style D |
|---|---|---|
| set | cube 5×5×5 on the ground, faces deleted → a two-wall + floor corner | a corner backdrop only when walls must catch light; else dark room |
| key | Spot above-behind camera; beam angle widened, blend increased "by a lot" (soft fall-off), radius up (softer shadows), power very high (scene is large) | soft top Spot, small inner / wide outer cone, radius 0.4–0.6 |
| back | duplicate of the key, rotated X 90°, aimed at the back wall behind the subject; beam shape and size up, power down | pool of light on the surface behind the hero to separate it from the dark (RectLight or Spot with `range` set), well below key |
| fill | Area light as a ceiling light, size 1 → 2 m, power up "a bit", not too much | AmbientLight 20–40 or a dim RectLight |
| prop kicker | Point light near the food/drink, shadows off, low power so the key's shadows survive | shadowless PointLight, short `range` 1.5–3, only on the object the line names |
