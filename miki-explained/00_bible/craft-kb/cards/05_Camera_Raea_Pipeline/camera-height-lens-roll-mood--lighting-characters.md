---
title: Camera height, focal length and roll set the viewer's relationship — neutral 70 mm, slightly low = admire, very low = dwarfed, low + roll = eerie, high wide + roll = dynamic
bucket: 05_Camera_Raea_Pipeline
source: "Lighting 3D Characters for Storytelling.txt"
source_time: "03:52–03:60, 09:16–09:39, 16:43–16:53, 21:49–22:07, 25:04–26:22, 20:50–20:58"
blender_version_source: 2.8–3.x? (EEVEE legacy)
tool_target: raea
tier: full
style_fit: Feeds our "new camera setup every 2–3 s": each setup's height/lens/roll should be chosen for the line's relationship, not at random. Roll is a held angle, never a whip.
---

## METADATA
05_Camera_Raea_Pipeline | 2.8–3.x? → raea | raea

## CREATIVE_INTENT
Camera placement relative to the subject's eye line decides how we feel about it. Neutral calm: ~70 mm, eye level, no roll. Slightly below: we feel a little inferior — the subject is cool. Very low and centred: we feel very small. Directly below, shorter lens, rolled: towering, eerie, overwhelming. A very wide 15 mm above the subject with ~7° roll is dynamic and positive, not ominous — showing a lot of environment gives an overview. Above vs below the eye line matters more than the lens. Depth of field focused on the subject blurs what isn't needed.

## STE_PROCEDURE
1. Choose the relationship (calm / admire / dwarfed / threatened / overview) from the line.
2. Calm: set ~70 mm, camera at subject height, roll 0.
3. Admire: lower the camera slightly below the subject's top.
4. Dwarfed: put the camera very low, centre the subject.
5. Eerie: place the camera directly below, shorten the lens, roll it on its view axis.
6. Dynamic overview: use ~15 mm from above with ~7° roll.
7. Focus DoF on the subject's front feature.

## AGENT_EXECUTION
raea (fov is vertical in radians; on a 9:16 frame convert from the horizontal-equivalent you want):
```tsx
const mmToFov = (mm: number, sensorH = 24) => 2 * Math.atan(sensorH / (2 * mm));
// dynamic overview: 15 mm, above, 7° roll
<Camera3d transform={Transform.fromXyz(0, 3.0, 2.0).withRotation(Quat.fromEuler("YXZ", 0, -0.98, 7 * Math.PI / 180))}
  projection={{ Perspective: { fov: mmToFov(15) } }}>
  <DepthOfField focal_distance={3.6} aperture_f_stops={2.8} />
</Camera3d>
// calm: Transform.fromXyz(0, 0.5, 4).lookingAt([0, 0.5, 0]), fov mmToFov(70)
```
Pitch/yaw in `fromEuler("YXZ", yaw, pitch, roll)` are computed from camera→subject (~ values above); verify with a still.

## NOTES
- Deprecated: none.
- Visual gaps: exact camera positions are shown only.
- Rule conflicts: rolls and low angles are held or reached by smooth eased moves (≤ ~130°/s); no crash zooms or whip pans to get there. Macro scale: "eye level" means the object's own height.
