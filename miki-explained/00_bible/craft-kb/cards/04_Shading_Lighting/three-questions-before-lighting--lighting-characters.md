---
title: Three questions before lighting — what is the focus, how do we feel about the subject, which camera/light/colour choices serve that
bucket: 04_Shading_Lighting
source: "Lighting 3D Characters for Storytelling.txt"
source_time: "02:22–04:30"
blender_version_source: 2.8–3.x? (EEVEE legacy)
tool_target: principle-only
tier: full
style_fit: Matches Style D's "one saturated accent only on what the line is about": answer question 1 from the script line before placing any light.
---

## METADATA
04_Shading_Lighting | 2.8–3.x? | principle-only

## CREATIVE_INTENT
Endless setups exist; three questions narrow them. (1) Focus: attention goes to the brightest spot or the spot with the most contrast, so the subject gets that. (2) Relationship: how should the viewer feel toward the subject (calm, admiring, small, uneasy)? (3) Choices: lens, camera height, lighting angle, quality (hard/soft), quantity and colour are then picked to deliver 1 and 2.

## STE_PROCEDURE
1. Before placing a light, name the focus of the shot (for us: the object/part the voice line is about).
2. Make the focus the brightest or highest-contrast area of the frame.
3. Name the viewer's relationship to the subject (calm / impressed / dwarfed / uneasy / curious).
4. Pick lens and camera height from that relationship (see the camera-mood card).
5. Pick lighting angle, softness, number of lights and colour from that relationship (see ratio, pattern and colour cards).
6. Check the render: if the eye lands elsewhere first, dim or darken that area, don't brighten the focus further.

## AGENT_EXECUTION
Write the answers into the shot card before building, e.g.:
```
shot 04  focus: coin stack (accent #E8B23A)   relation: impressed   lens 50mm low   key: soft top-side, ratio high
```
raea check: render a still (`raea render EDIT.tsx --frame N -o F.png`) and confirm the brightest/most contrasted region is the focus. Tools: dim competitors with lower `intensity` or a `range` limit on their light; darken surroundings with `<Grade vignette={{ intensity: 0.3, radius: 0.8, smoothness: 0.5 }} />`.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: none; the video's subject is a character — our subject is normally an object (no people by default).
