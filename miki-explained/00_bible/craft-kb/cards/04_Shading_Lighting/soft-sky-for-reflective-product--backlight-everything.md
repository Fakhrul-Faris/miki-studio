---
title: Reflective product shot — no hard sun, soft sky for clean reflections
bucket: 04_Shading_Lighting
source: "Backlight Everything - A Cinematographer's Hammer.txt"
source_time: "07:38–07:53, 20:50–21:20, 22:24–22:56"
blender_version_source: n/a (live-action cinematography)
tool_target: principle-only
tier: principle
style_fit: Fits Style D — glossy/metal hero objects (phones, coins, cards) read best lit by large soft sources and a soft environment, with the hard sun out of frame.
---

## METADATA
04_Shading_Lighting | n/a (live-action) | principle → Blender bpy + raea

## CREATIVE_INTENT
Principle: for the product (a CG car), keep the sun out of shot and use soft, shadowless light so the surface carries smooth reflections of the sky and clouds — the reason car work shoots at magic hour. Soft light keeps details visible even inside a glossy helmet. Where a reflective surface shows an unwanted rig shape, dull it (dulling spray). Ideas: glossy hero objects in Style D lit by a big soft panel plus an environment map for reflections; small roughness bump to kill a distracting highlight.

## STE_PROCEDURE
Method:
1. Remove the hard direct source from the frame and from the product's reflections.
2. Light with large soft sources and a soft sky so reflections are broad gradients.
3. Check reflections for detail: the sky/clouds should read in the surface.
4. If a reflection shows something unwanted, reduce glossiness on that part.
How-to:
5. Keep ground shadows soft or absent so the product doesn't sit in a hard pool.

## AGENT_EXECUTION
### Source tool (live-action set / VFX)
- Magic-hour plate, CG car added in VFX, sky replaced/augmented (clouds, birds); dulling spray on reflective props.
### Blender / raea translation
- Blender: HDRI world (soft overcast/sunset), large Area lights; product Principled `Roughness` 0.1–0.3 (`~`).
- raea: `<Environment src={staticFile("studio_or_sky_1k.hdr")} intensity={1} rotation={r} />` for reflections (no `background` indoors), a large `<RectLight width={2} height={1} … />` as a softbox, `<AmbientLight brightness={20} />` at most; product `<StandardMaterial perceptual_roughness={0.15} metallic={1} />`; raise `perceptual_roughness` locally to dull a hotspot. Soft shadows: `soft_shadow_size={5–10}` on a DirectionalLight.

## NOTES
- Poly Haven CC0 HDRIs (1k/2k); log any asset in ASSET-SOURCES.md.
- Rule conflicts: none.
