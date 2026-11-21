---
title: Match light direction from the plate's shadows — and expect it to look different across the frame
bucket: 04_Shading_Lighting
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "1:00:57–1:05:51; 1:13:30–1:15:06"
blender_version_source: n/a (Nuke + CG renders)
tool_target: raea
tier: principle
style_fit: Supports Style D's one soft top light: every object, inserted card and shadow must agree with that one source; cheat it only slightly.
---

## METADATA
04_Shading_Lighting | n/a (Nuke + CG) | raea

## CREATIVE_INTENT
Principle: any element (CG, photo, video) must share the shot's light direction, quality and intensity, or it never feels real; direction is read from cast shadows. With one sun, objects on one side of frame show more shadow side and objects on the other look front-lit — that is perspective, not a second light. Idea: after the light is "correct", cheating it a little for beauty is fine; cheating a lot looks "compy".

## STE_PROCEDURE
1. Read the key's direction from a clear cast shadow in the plate (e.g. a foreground rock).
2. Place the 3D light to cast the same shadow direction.
3. Check elements at different frame positions; expect more front-lit look where the camera sees the lit side.
4. Do not add a second light to "fix" that variation.
5. Compare the element's shadow side with plate objects near it; reduce backlight if it shows more shadow than they do.
6. Reject mirrored setups (shadow cast right-to-left when the plate's goes left-to-right) and top-down spotlight looks.
7. Allow small aesthetic cheats only after direction matches.

## AGENT_EXECUTION
### Source tool (Nuke)
Lighting is fixed in the CG render (Maya/Houdini equivalent); comp only checks it. No node chain.
### Blender / raea translation
- raea: one key — `<SpotLight transform={Transform.fromXyz(...keyAt).lookingAt(target)} … shadow_maps_enabled />` (kit `ProStage` `keyAt=[-3,5,6]`) or `<DirectionalLight transform … illuminance shadow_maps_enabled />`. Every object in the shot is lit by this one light; never add per-object lights to make one object look front-lit.
- Inserted 2D images/screens: choose or paint photos lit from the same side as the key; an `ImagePlane` photo with opposite lighting breaks the shot.
- Blender build check: `bpy.data.objects['Key'].rotation_euler` matched to the raea key before export (only if lights are exported).

## NOTES
- Rule conflicts: none.
