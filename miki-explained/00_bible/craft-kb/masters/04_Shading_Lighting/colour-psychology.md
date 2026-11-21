---
title: Colour psychology of hues and light tints
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/colour-psychology-light-tints--lighting-characters.md
  - cards/04_Shading_Lighting/hsv-colour-psychology-cultural-meaning--power-of-color.md
sources: ["Lighting 3D Characters for Storytelling.txt", "The Power of Color in Blender 3D!.txt"]
use_when: "choosing the accent/light tint for a line's meaning"
style_fit: "Style D has one saturated brand accent (fixed by the kit) on the line's subject; psychology picks support colours, light temperature and the grade — light tints stay subtle and never compete with the accent."
---

## METADATA
04_Shading_Lighting | any (source 2.8–4.x) | principle-only (+ raea values)

## CREATIVE_INTENT
Colour carries meaning before the viewer reads a word. Hue is the tint, saturation runs pastel → vivid (energy), value
dark → light (weight). Learned associations: finance brands use blue for trust, dating apps warm reds for love; red reads
love/danger/urgency in the West, luck and New Year in Chinese culture, purity in India. Light tints: warm key + cool
back/fill is a complementary pair the eye loves; warm orange = late-afternoon sun, but saturated yellow reads unstable;
blue from above = moonlight; a green world tint feels unwell; red + green together feel sickening; red rim for villains;
purple-pink = mysticism / sci-fi. Placement changes meaning: glow behind the top of the head reads divine, from below
earthly-mysterious. Knowing the rules lets you break them on purpose.
- Lighting characters adds: the light-tint meanings, pairs and placement.
- Power of Color adds: HSV vocabulary, brand and cultural meanings, check against the audience's culture.

## STE_PROCEDURE
1. Name the feeling or meaning the line must carry (trust, gain, loss, scam, urgency).
2. Pick the hue whose association matches (trust → blue, urgency/danger → red, unease → green).
3. Check the hue against the audience's cultural reading (Malaysia-first: red = luck/festive for Chinese viewers as well as danger).
4. Set saturation for energy (pastel calm, vivid loud) and value for weight.
5. Default the light pair to warm key + cool back.
6. Keep warm tints orange-ish; avoid saturated yellow unless instability is the point.
7. For unease, tint the world/ambient slightly green and justify it with a source (green glass, slats).
8. For "sick/wrong", combine a red back rim with a green opposite rim (desaturated in Style D).
9. For mystic/unreal, use one purple-pink light, low (earthly) or behind the top (divine).
10. Justify every tint with a motivated source.
11. Break a convention only on purpose, supported by light and story.
12. Record hue choice + reason in the episode frame brief.

## VALUES BY SOURCE
| parameter | Lighting characters | Power of Color | recommended for Style D (+ why) |
|---|---|---|---|
| Default pair | warm key `#ffcf9e`~ / cool back `#bcd2ff`~ | — | keep, low saturation (accent stays the only saturated colour) |
| Unease | slight green world tint | alien = red/green/purple | `<Grade tint>` slight green, scam/loss beats only |
| Sick / villain | red rim `#ff3b30`~ + green rim `#5cff6a`~ | — | desaturated versions, only when the line calls for it |
| Mystic | purple-pink `#c86bff`~ | — | rarely; not our tone |
| Trust / love / urgency | — | blue / warm red / red | support colours and grade, not a second accent |
| Culture | — | red: West danger, China luck, India purity | check Malaysian reading before locking |

## AGENT_EXECUTION
- Pre-build decision: record hue + reason in the frame brief; feed hexes into raea `base_color` / `emissive` / light `color`.
- raea (`~` hexes; not given in the videos):
```tsx
<SpotLight name="key" color="#ffcf9e" ... />                       // warm late-sun key
<RectLight name="back" color="#bcd2ff" ... />                      // cool complement
<Environment src={staticFile("room_2k.hdr")} intensity={0.1} />    // dim base fill
<Grade temperature={-0.06} tint={0.03} />                          // whole-piece shift instead of extra coloured lights
// sickly pair: rim A "#ff3b30", rim B "#5cff6a" (desaturate for Style D); mystic: "#c86bff"
```
`<Grade>`'s first frame holds for the whole piece; per-shot colour goes on a light's `color`.

## NOTES
- Deprecated: none.
- Visual gaps: exact colour values and the keyword chart are on screen only.
- Rule conflicts: one saturated accent only, on the subject of the line — coloured rims must be desaturated or used only
  when the line's mood demands (villain/scam beats). The brand accent is fixed by the kit; psychology guides support
  colours and gain vs loss framing. Check brand colours under `aces` (muddy) — prefer `tony`.
