---
title: Saturation matrix for highlight/shadow mood (4 combinations)
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/How COLORS Completely Change Your LIGHTING!.txt"
source_time: "02:05–02:55"
tool_target: frame-brief
tier: full
use_when: "briefing a setup's mood when the line is tense/dramatic vs calm/muted vs loud/vibrant"
style_fit: "Fits Style D's one-accent rule: push saturation, not hue count, to shift mood — the accent itself stays the only saturated colour, everything else moves along this matrix."
---

## METADATA
06_Art_Direction | general (digital painting, tool-agnostic) | frame brief (Feeling field) + raea `<Grade>` / material saturation

## CREATIVE_INTENT
Highlights and shadows don't just go lighter/darker — their *saturation* carries separate mood information from their
value. Four combinations, same base hue: saturated highlights + desaturated shadows = high contrast, clear, legible;
desaturated highlights + saturated shadows = bold, dramatic; everything saturated = vibrant, loud, high-energy;
everything desaturated = muted, moody. Pick the combination before picking the hue.

## STE_PROCEDURE
1. Before lighting a beat, name its mood word (clear / dramatic / loud / moody).
2. Clear: push saturation up on the lit side, pull it down in shadow.
3. Dramatic: invert it — desaturate the lit side, saturate the shadow side.
4. Loud/vibrant: keep both lit and shadow sides saturated.
5. Muted/moody: desaturate both sides; let value (not colour) carry the read.
6. Never change the brand accent's own saturation to make this work — the accent is the one exception that stays fixed.

## AGENT_EXECUTION
Frame brief **Feeling** field: name the mood word, then the matrix cell: "dramatic → desat highlight / sat shadow".
raea: saturation is set per-material (`base_color`/`emissive` saturation) or globally via `<Grade saturation>` split
by `shadows`/`highlights` ranges if the skill exposes them (check `post.md`); simplest control is per-prop material
saturation plus a small `<Grade shadows={{ saturation: ... }} highlights={{ saturation: ... }}>` push.
```tsx
{/* dramatic cell: desaturated key light on the hero, saturated accent only in the shadow pool */}
<SpotLight color="#d8d2c8" intensity={...} />                         {/* desaturated highlight */}
<Grade shadows={{ saturation: 1.3 }} highlights={{ saturation: 0.6 }} /> {/* push the matrix cell */}
```

### Worked example
Topic: a kedai runcit owner finds out her supplier quietly raised prices (illustrative numbers).
BEFORE: standard key + fill, no saturation decision — the reveal reads flat.
AFTER: Feeling "dramatic" → desaturate the invoice's lit face, push saturation into the shadow under it; the one
accent (the new price in red) stays fully saturated and is now the only saturated thing in frame, so it reads instantly.

### Check
- Is there a named mood word for the beat before lighting it?
- Does the saturation combination match that mood word (one of the four cells)?
- Does the brand accent's saturation stay untouched by the push?

## NOTES
- Visual gaps: the four example renders are stills only; no numeric saturation values given (all `~`).
- Rule conflicts: none — this sits inside the existing one-accent rule, it only changes how support colours vs. the
  accent's own saturation relate, not how many saturated colours are on screen.
