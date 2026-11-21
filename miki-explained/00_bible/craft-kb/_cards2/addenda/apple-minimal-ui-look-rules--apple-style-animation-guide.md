# Addendum → cards/06_Art_Direction/apple-minimal-ui-look-rules--apple-style-animation-guide.md
Source: "Motion Feel, Easing & Camera Choreography/Master SaaS Motion Graphics in 30 Minutes.txt" — 00:34–03:23

## Extra technique: jittered four-colour gradient background (kills banding, adds grain) + soft card recipe
A background solid gets a 4-Color Gradient effect (off-white/light-blue tones), blend pushed up, then **Jitter set to
100%** specifically "to make sure that I don't have any bending [banding]. This will also add a bit of noise to it,
which I actually like" — jitter-as-grain is the fix, not a separate grain/noise effect. The UI card itself: rounded
rectangle, full-white fill, light grey stroke, roundness ~60, drop shadow very soft (size way up, angle 90°, opacity
~5%), optional inner glow (white, large size, low opacity) for an ambient soft-card look.

## VALUES BY SOURCE row
| parameter | Apple Style Animation Guide (principle, no numbers) | Master SaaS Motion Graphics (AE, exact) | recommended for Style D |
|---|---|---|---|
| ground | neutral white/black/grey | off-white 4-colour gradient, jitter 100% for grain/no-banding | neutral ground + subtle grain via dither/noise, not a flat fill |
| panel | rounded corners | roundness ~60 (of max), white fill, light grey stroke | rounded corners per house style, same proportions |
| shadow | "very subtle" | size large, angle 90°, opacity ~5%, offset slightly below | keep ≤5% opacity, soft and wide, never a hard/dark shadow |
| extra glow | not mentioned | inner glow: white, large size, low opacity, for an ambient lift | optional — only if the card needs to look lit from inside, single neutral colour |
