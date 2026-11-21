---
title: Gaffer mindset — intentional story lighting (light the key element, back-light silhouettes, viewer POV, soft = positive)
bucket: 04_Shading_Lighting
source: "The Key to Realistic Renders in Blender.txt"
source_time: "01:42–04:44"
blender_version_source: 4.x
tool_target: principle-only | raea
tier: full
style_fit: Core of Style D: the hero (what the line is about) is always the best-lit thing; nothing is lit "because it’s realistic".
---

## METADATA
04_Shading_Lighting | any | Principle → raea light placement

## CREATIVE_INTENT
Don’t settle for "realistic" light (one sun outdoors). A gaffer adds, redirects and removes light on every shot — even sunny exteriors — to tell the story and guide the eye. Light is the strongest attention tool a 3D artist has.

## STE_PROCEDURE
1. Before placing any light, name the most important element of the shot.
2. Make sure that element is lit — even a dark silhouette gets light behind it to separate it.
3. Place lights so they make sense from the viewer’s point of view, not from random angles.
4. Use large (soft) lights for soft, emotional, positive moments; small hard lights for tension.
5. Add, redirect or remove light per shot regardless of "natural" conditions.
6. Decide placement, strength, colour and number of lights on every shot.

## AGENT_EXECUTION
- Blender: light types Point / Sun / Spot / Area / emissive mesh (`bpy.ops.object.light_add(type=...)`).
- raea: hero lit by the key `<SpotLight ... lookingAt(hero)>`; a silhouette gets a rim `<PointLight>` or `<SpotLight>` behind it aimed at the camera side; soft = large `<RectLight width height>` or a spot with big `radius` + `soft_shadows_enabled`; hard = small `radius`, narrow `outer_angle`.
- Per-shot light changes are normal in raea: lights are rows keyed per frame; animate `intensity` with an eased `interpolate` across a beat.

## NOTES
- Deprecated: none.
- Visual gaps: none (conceptual).
- Rule conflicts: none.

