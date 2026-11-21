---
title: Negative fill — choose your contrast by taking light away
bucket: 04_Shading_Lighting
source: "Backlight Everything - A Cinematographer's Hammer.txt"
source_time: "05:08–05:41, 08:11–09:09, 14:40–15:39, 16:33–17:31, 22:24"
blender_version_source: n/a (live-action cinematography)
tool_target: principle-only
tier: principle
style_fit: Fits Style D — dark room, shadow as character; contrast is set per shot, not left to the ambient.
---

## METADATA
04_Shading_Lighting | n/a (live-action) | principle → Blender bpy + raea

## CREATIVE_INTENT
Principle: daylight exteriors don't come contrasty on their own; a large black "neg" on the shadow side removes bounce and deepens the shadows. Its size and distance set the shadow depth — "choose your own contrast". Keep the lit-to-shadow ratio moderate on soft front light (values close together for a pleasing fall-off); go harder for a graphic look. To open up for a nervous client: pull the neg back, or add a little white fill. Ideas: in Style D, lower the ambient and remove fill on the camera side to make the hero's shadow side read as a shape.

## STE_PROCEDURE
Method:
1. Decide the shot's contrast ratio (lit side vs shadow side) before adding fill.
2. Put negative fill (a large black flag) on the shadow side to remove ambient bounce.
3. Make the neg bigger or closer for deeper shadows.
4. To soften contrast, move the neg back, or replace it with a small white fill.
5. Measure: meter (or false colour) the lit and shadow sides; for soft front light keep the readings close.
How-to:
6. Check across a hand or object width: exposure should change gradually, not crunch.

## AGENT_EXECUTION
### Source tool (live-action set)
- Neg = black solid / 20×20 (as spoken) on the shadow side; visible in a helmet reflection on one shot; meter readings lit vs shadow.
### Blender / raea translation
- Blender: negative fill = less world/ambient light on that side: lower World strength, or a black emissive-free plane that blocks the world lighting (EEVEE Next with raytracing / Cycles only); simplest: drop fill lights on that side. Ratio check: render and sample pixel luminance on both sides.
- raea: there is no "negative light". Equivalent controls: lower `<AmbientLight brightness>` (e.g., 55 → 20), lower `<Environment intensity>` or rotate it so its bright side faces away (`rotation`), remove any `RectLight` on the shadow side; a shadow-casting blocker with `<Mesh3d shadow="only">` stops a direct light from reaching that side without being seen. `<AmbientOcclusion>` deepens contact areas only for indirect light.

## NOTES
- raea ambient is uniform; it cannot be blocked by geometry (only AO darkens creases). For a directional negative fill use an `<Environment>` and rotate it, or keep fill lights on one side only.
- Rule conflicts: none; keep detail near black (keep-detail-near-black-no-crushed-shadows--dark-environments).
