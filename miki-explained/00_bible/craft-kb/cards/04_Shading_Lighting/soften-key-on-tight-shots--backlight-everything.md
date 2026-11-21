---
title: Soften the key on tight shots (overhead diffusion) where the cheat can't be seen
bucket: 04_Shading_Lighting
source: "Backlight Everything - A Cinematographer's Hammer.txt"
source_time: "04:40–07:38, 11:18–12:41, 20:50–21:20"
blender_version_source: n/a (live-action cinematography)
tool_target: principle-only
tier: principle
style_fit: Fits Style D — macro setups are tight by nature, so the key can be as soft as the shot wants; harsh light stays for deliberate contrast shots.
---

## METADATA
04_Shading_Lighting | n/a (live-action) | principle → Blender bpy + raea

## CREATIVE_INTENT
Principle: harsh backlight is fine; harsh front light is not. When the subject must face the light, soften it — a large diffusion frame between the sun and the subject — so the shadow transition across the face is gentle and exposure is even across the hands. The cheat only works if the ground (where the frame's shadow and exposure step would show) is out of shot; tight framings make it invisible. Soft light at magic hour gives soft shadows and keeps details readable even inside a glossy helmet. Ideas: Style D close-ups use a big soft key (large light size) for the object's front faces; reserve hard sun for a deliberate graphic beat.

## STE_PROCEDURE
Method:
1. If the subject is front-lit by a hard source, place large diffusion between the source and subject.
2. Choose diffusion density by look: highlight (light) < half soft frost < quarter grid (heavy) (as named in the source; STT may vary).
3. Size it to the shot: a 12×12 ft frame or smaller for a close-up.
4. Before softening, check that no ground or surface where the frame's shadow would fall is in shot.
5. If the ground is visible, hide the frame's edge (camouflage with branches) or keep the hard light.
How-to:
6. Compare transitions: the shadow edge across the subject should roll off gradually, not crunch.

## AGENT_EXECUTION
### Source tool (live-action set)
- 12×12 (or 8×8) overhead frame on two stands either side of the frame; fabrics highlight / half soft frost / quarter grid; dulling spray on reflective surfaces that would show the frame.
### Blender / raea translation
- Blender: soften a light by size, not by a frame: Area light `size` large (e.g., `light.size = 1.0–2.0` at ~1 m `~`); Sun `angle` ↑ for softer shadows (`sun.data.angle = math.radians(10)` `~`).
- raea: soft key = big source: `<DirectionalLight … shadow_maps_enabled soft_shadow_size={6} />` (5–10 = studio softbox), or a `<SpotLight … soft_shadows_enabled shadow_maps_enabled radius={0.5} />` plus a `<RectLight width={1.5} height={1.5} … />` for wrap (RectLight casts no shadows). Hard look: `soft_shadow_size={0.5}`. Reflective subject showing a light shape: raise `perceptual_roughness` slightly (the "dulling spray").

## NOTES
- A render has no rig to hide, so the "ground visible" limit doesn't apply — but the read does: soft key on the object while the set's cast shadows stay crisp is a mismatch the eye catches; soften both or neither.
- Rule conflicts: none.
