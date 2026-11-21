---
title: Checkerboard lighting — alternate bright subject against dark ground and dark subject against bright ground
bucket: 04_Shading_Lighting
source: "Lighting 3D Characters for Storytelling.txt"
source_time: "27:23–27:60"
blender_version_source: 2.8–3.x? (EEVEE legacy)
tool_target: principle-only
tier: full
style_fit: Good for tall objects in 9:16 (a bottle, a phone on its edge, a receipt): lit top against a dark wall, dark base against a lit surface — the subject pops along its whole length.
---

## METADATA
04_Shading_Lighting | 2.8–3.x? | principle-only (+ raea pattern)

## CREATIVE_INTENT
Like a checkerboard, alternate bright and dark: the bright top of the subject sits against a dark background; the subject's dark lower part sits against a bright floor. Since the eye is drawn to contrast, the subject separates everywhere. Knowing the name means you place it on purpose.

## STE_PROCEDURE
1. Split the frame into an upper and lower zone along the subject.
2. In the upper zone, light the subject brightly and keep the background behind it dark (range-limit the lights).
3. In the lower zone, let the subject fall into shadow and light the floor/surface beneath it brightly.
4. Check every edge of the subject has contrast against what is behind it.

## AGENT_EXECUTION
raea:
```tsx
<SpotLight name="topKey" transform={Transform.fromXyz(0.6, 2.2, 0.8).lookingAt([0, 1.0, 0])} intensity={1_200_000}
  outer_angle={0.22} inner_angle={0.1} range={3} shadow_maps_enabled />          {/* upper subject only */}
<SpotLight name="floorPool" transform={Transform.fromXyz(0, 2.5, 1.2).lookingAt([0, 0, 0.6])} intensity={900_000}
  outer_angle={0.5} inner_angle={0.3} shadow_maps_enabled />                     {/* bright floor in front/under */}
```
The subject's own shadow on the lit floor keeps its base dark; the wall stays unlit.

## NOTES
- Deprecated: none.
- Visual gaps: light placement shown only.
- Rule conflicts: none.

## ADDENDUM — Apple commercial Cinematography breakdown
Source: "Studio Lighting, Silhouettes & Color Theory/Apple commercial Cinematography breakdown.txt" (09:55–10:27)

Variant: checkerboard in depth — alternating pockets of light and dark receding INTO the frame (the base card is
vertical: top vs bottom).

| parameter | Apple commercial breakdown | recommended for Style D |
|---|---|---|
| axis | depth: "light, then dark, then light again, then dark, then light" receding into a forest | depth along the surface: lit pool — dark gap — lit hero — dark gap — lit background prop |
| atmosphere | fog (fog machine or smoke cakes) so light rays show; "always makes your image pop and gives it more mystery" | low-density haze (`masters/04_Shading_Lighting/volume-haze-cube.md`) only if rays are wanted |
| lens | "really long lens, maybe 100 mm" (stacks the pockets) | long focal length compresses the pockets |

Extra steps: lay out 3–5 depth bands; light the odd ones, leave the even ones dark; put the hero in a lit band with
dark bands in front of and behind it; use a long lens so the bands stack.

Related: `cards/04_Shading_Lighting/light-pools-separate-depth-layers--add-depth-renders.md`.
