---
title: Depth through backlit layers; subject faces the light, tallest and brightest in frame
bucket: 05_Camera_Raea_Pipeline
source: "Backlight Everything - A Cinematographer's Hammer.txt"
source_time: "02:51–03:21, 15:39–16:33, 18:35–19:05"
blender_version_source: n/a (live-action cinematography)
tool_target: principle-only
tier: principle
style_fit: Fits Style D (adapted to objects) — hero turned toward its key side, the brightest and dominant shape, with darker layers behind.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (live-action) | principle → Blender bpy + raea

## CREATIVE_INTENT
Principle: backlight separates layers — front row, second row, background people, trees — each edged in light, which builds depth. The hero faces toward the light side (not into the dark side of the frame), keeping the thin rim that separates it from the background; it is the tallest thing in frame and the only bright one (the gold helmet against a background in shadow). If the background is lit as brightly as the subject, nothing pulls out. Ideas: Style D hero object angled so its main face turns toward the key, background props stepping back into darkness, accent only on the hero.

## STE_PROCEDURE
Method:
1. Arrange the set in at least three depth layers (foreground, subject, background).
2. Backlight so each layer gets an edge.
3. Turn the subject to face toward the light side of the frame, not into the dark side.
4. Make the subject the tallest/most dominant shape; keep taller shapes out of its background.
5. Keep the background in shadow and darker than the subject.
6. Add shallow depth of field to separate the subject further.
How-to:
7. If the subject doesn't pop, darken the background before brightening the subject.

## AGENT_EXECUTION
### Source tool (live-action set)
- Shoot into shadow; subjects edged by low sun; hero framed facing the light side; background people shorter/smaller; shallow DoF.
### Blender / raea translation
- Blender: rotate the hero so its front normal points between camera and key (`~` 30–60° off camera axis toward the key side); dim background materials or remove fill that reaches them.
- raea: background meshes with darker `base_color` / higher roughness; key as `SpotLight` with tight `outer_angle` (0.3–0.6) aimed at the hero so the pool falls off before the background; `<DepthOfField focal_distance={heroDist} aperture_f_stops={2.8} />` inside the camera; brand accent `emissive` on the hero only.

## NOTES
- Source subjects are people; for us the "gaze" is the object's front face (no figures; figures-pose-only if ever used).
- Rule conflicts: none.
