---
title: Colour psychology of light tints — warm/cool complements, no pure yellow, green = unwell, red+green = sickly, purple = mystic
bucket: 04_Shading_Lighting
source: "Lighting 3D Characters for Storytelling.txt"
source_time: "07:09–07:19, 12:57–13:09, 18:12–18:17, 22:07–24:04, 29:41–30:19"
blender_version_source: 2.8–3.x? (EEVEE legacy)
tool_target: principle-only
tier: full
style_fit: "Style D allows one saturated brand accent; light tints must stay subtle so they never compete with it. Use these meanings for the grade/key temperature, not for extra coloured lights."
---

## METADATA
04_Shading_Lighting | 2.8–3.x? | principle-only (+ raea values)

## CREATIVE_INTENT
Light colour carries meaning: warm key + cool back/fill is a complementary pair the eye loves; warm orange = late-afternoon sun (but pure yellow reads unstable, even insane); blue from above = moonlight; a green world tint makes people feel unwell (much of The Matrix); red + green together feel sickening, red + pink feminine-but-twisted; red rim/silhouette for villains; purple-pink = mysticism, sci-fi, eroticism. Placement changes it too: a glow behind the head reads divine; from below, earthly-mysterious.

## STE_PROCEDURE
1. Pick the emotion of the line, then the tint pair (default: warm key, cool back).
2. Keep warm tints orange-ish; avoid saturated yellow unless instability is the point.
3. For unease, tint the world/ambient slightly green and justify it in the scene (green glass, slats).
4. For "sick/wrong", combine a red back rim with a green opposite rim.
5. For mystic/unreal, use a single purple-pink light; place it low (earthly) or behind the subject's top (divine).
6. Justify every tint with a motivated source (see motivated-lighting card).

## AGENT_EXECUTION
raea hex values (~):
```tsx
<SpotLight name="key"  color="#ffcf9e" ... />   // warm late sun
<RectLight name="back" color="#bcd2ff" ... />   // cool complement
<Environment src={staticFile("room_2k.hdr")} intensity={0.1} />  // dim base fill
<Grade temperature={-0.06} tint={0.03} />        // slight green unease / whole-piece shift instead of extra coloured lights
// sickly pair: rim A "#ff3b30", rim B "#5cff6a"; mystic: "#c86bff"
```
The `<Grade>` first frame holds for the whole piece; per-shot colour goes on light `color`.

## NOTES
- Deprecated: none.
- Visual gaps: exact colour values not given.
- Rule conflicts: one saturated accent only, on the subject of the line — coloured light rims must be desaturated or used only when the line calls for that mood (villain/scam beats). Check brand colours under `aces` (muddy) — prefer `tony`.
