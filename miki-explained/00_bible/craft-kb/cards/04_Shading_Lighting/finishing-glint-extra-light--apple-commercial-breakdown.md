---
title: Finishing glint — one extra small light just for a highlight ("eye-light" polish)
bucket: 04_Shading_Lighting
source: "Studio Lighting, Silhouettes & Color Theory/Apple commercial Cinematography breakdown.txt"
source_time: "02:00–02:20, 09:15–09:35"
tool_target: raea
tier: full
use_when: "final light pass on a hero setup: the object reads but looks dull/flat at phone size"
style_fit: "⚠ conflict: source adds eye-lights to people → adapted as a tiny glint on the hero object's edge or screen (no people in Style D). One glint, not sparkle."
---

## METADATA
04_Shading_Lighting | general (live-action) | raea light pass + board check

## CREATIVE_INTENT
"Every time you see eye-light in shots it's always like a cherry on top, because it doesn't always naturally come out;
you can always bring in an extra piece of lighting or reflection to give that a little bit of pop." It is the last,
optional polish: they "didn't have to do it but they did it".

## STE_PROCEDURE
1. Finish key, fill and rim first; only then consider a glint.
2. Pick one spot on the hero that the line is about (a coin edge, a logo, a phone camera ring).
3. Add one very small light placed for its reflection on that spot, not for illumination.
4. Keep its intensity so it creates a highlight but barely changes the object's exposure.
5. Check the glint survives at phone size and sits on the line's subject only.
6. Remove it if it draws the eye away from the accent.

## AGENT_EXECUTION
raea: a small `PointLight` with a short `range` (so it lights nothing else), placed at the mirror angle from the
camera to the target spot; or a tiny `RectLight` (with `range`) whose reflection lands on a glossy surface. Pair with
`<Bloom>` low so the glint blooms slightly. Start `~` intensity 50,000–150,000 lm at ~0.3 m, range 0.6 m; tune on a still.

### Worked example
Topic: "Kenapa syiling 5 sen masih penting di kaunter" (Malaysian cash totals are rounded to the nearest 5 sen — real).
- BEFORE: macro of a 5-sen coin under the top key; flat grey disc.
- AFTER frame brief: Light "top key + one glint PointLight at the mirror angle to the coin's rim, range 0.6 m";
  Eye "the rim glint, then the '5'"; Moves "on 'lima sen' the glint slides along the rim over 0.6 s eased".

### Check
- Is there exactly one glint, on the line's subject?
- Does the glint light anything else? (should not)
- Is it added only after the main light is right?

## NOTES
- Visual gaps: the eye-lights and their sources are only visible in the footage.
- People/eyes not used (Style D: no people); principle carried over to objects.
