---
title: Light quality — shadow softness comes from light size and light distance (and contact distance)
bucket: 04_Shading_Lighting
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "1:05:51–1:11:12; 1:48:27–1:50:06"
blender_version_source: n/a (Nuke + CG renders)
tool_target: raea
tier: principle
style_fit: Core of Style D: "one soft top light" = a large source close to the object; shadows are crisp at contact and soften with distance.
---

## METADATA
04_Shading_Lighting | n/a (Nuke + CG) | raea

## CREATIVE_INTENT
Principle: shadow sharpness depends on how parallel the light rays are. A small or far source gives hard shadows (the sun is huge but so far away that its shadows are sharp); a large or near source gives soft ones. Diffusion (cloud, silk) becomes a new, larger source. Shadows are sharpest where the caster touches the receiver and soften with distance. Indirect (bounced) light is always soft. Idea: pick plates and set lights so every shadow in the shot shares one quality — a soft-shadow element in a hard-sun plate reads as "lit on an overcast day".

## STE_PROCEDURE
1. Read the plate's shadow quality (hard sun, overcast, studio softbox); check lighting reference stills too.
2. To soften shadows, enlarge the light or move it closer.
3. To harden shadows, shrink the light or move it farther away.
4. Expect shadows sharp at contact and softer farther from the caster.
5. Keep bounce/indirect light soft; never give it a hard shadow.
6. When choosing background photos, filter for the same light (e.g. overcast, eye level).

## AGENT_EXECUTION
### Source tool (Nuke)
Area-light size/distance set in the CG package; comp checks with viewer gamma-up for shadow edges.
### Blender / raea translation
- raea SpotLight/PointLight: `soft_shadows_enabled shadow_maps_enabled radius={metres}` (kit ProStage key: `radius={3.2}`, i.e. a big softbox); DirectionalLight: `soft_shadow_size` (0.5 real sun; 5–10 studio softbox). PCSS already gives contact-sharp, distance-soft shadows.
- Softbox look: `<RectLight transform intensity width height color>`.
- Indirect softness: `<AmbientLight>` / `<Environment>` + `<AmbientOcclusion quality="medium" />` (AO shades indirect light only).
- Penumbra dither: raise `<Shadows mapSize={4096}>`, `bias={0.1–0.2}`.

## NOTES
- Rule conflicts: none.
