---
title: Decide the shot's emotion before placing the camera
bucket: 05_Camera_Raea_Pipeline
source: "10 Tips to make Your 3D Render more Cinematic.txt"
source_time: "02:45–04:45"
blender_version_source: 3.x
tool_target: principle-only
tier: full
style_fit: Fits Style D — every 2–3 s setup must carry the line's meaning; pick the feeling first, then height/lens/light.
---

## METADATA
05_Camera_Raea_Pipeline | 3.x (legacy EEVEE) | principle-only

## CREATIVE_INTENT
Before any camera or light goes in, name the shot's single focus and the emotion it must carry (inviting, ominous, colossal, mysterious). Even a scene with no characters (an object, a building) should tell a small story through camera, light and set choices; every later decision (height, lens, tilt, light colour) is then tested against that emotion.

## STE_PROCEDURE
1. Identify the main focus of the shot (one object or area).
2. Write the emotion the focus must give, in one word (e.g. "mysterious", "inviting", "colossal").
3. Read the story already in the scene: poses, props, time of day.
4. Choose time-of-day and light key from that emotion (the source chose night + dark key for "mysterious").
5. Decide which part the composition must lean toward (the source tilts toward the threat while keeping the hero in focus).
6. Before you place the camera, list which elements must be in frame (the source: hero, two policemen, street, back building); this limits the camera angle.

## AGENT_EXECUTION
- Blender: no op; record intent as a custom property for later checks:
  `bpy.context.scene["shot_intent"] = {"focus": "receipt", "emotion": "ominous", "must_see": ["receipt","total"]}`
- raea: no equivalent (planning step). Put the intent in the shot list / ref_<shot>.md next to the shot's `<Sequence>`.

## NOTES
- Map to our pipeline: the "focus" is the one hero object; the "emotion" chooses the accent and how much of the room stays dark.
- Rule conflicts: none.
