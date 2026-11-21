---
title: Variable-font "opening" — weight, tracking and scale animated together on one curve
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/Apple-Style 3D Motion Design.txt"
source_time: "00:21–01:35 (scene 1 open), 07:04–07:16 (single character), 22:30–23:51 / 25:29 / 27:19–27:34 (texts A, B, C)"
tool_target: raea
tier: full
use_when: "frame-0 text or a key word that should 'open up' on its spoken word instead of fading in; on-screen RM numbers and step titles"
style_fit: Fits — a text entrance built from the type itself (no wipe, no flash); eased fast-out settle, no overshoot; keep ≥ 0.4 s and one accent colour.
---

## METADATA
09_UI_Motion | After Effects (source) → raea 2D text layer | raea

## CREATIVE_INTENT
Apple's Mac Studio ad opens its words by letting the letterforms themselves change: the text scales up slightly while a
variable font goes from thin to heavy and the tracking tightens, all on the same curve ("zero on the left and 100 on the
right" — a fast start that settles slowly). Free variable fonts used: Big Shoulders, Anybody (weight + width), Archivo.
The same three-property opening is reused on every later text (A, B, C), so the film feels like one type system.

## STE_PROCEDURE
1. Before animating, set the text in a variable font (weight axis; width axis optional).
2. Key scale from slightly smaller to 100 % (source: "scale up slightly"; ~94 → 100 %).
3. Key font weight from thin to the final weight over the same span (source: "starts out thin").
4. Key tracking from wide to the final tracking over the same span; nudge its keys a few frames for variety.
5. Give all three the same curve: outgoing influence 0 %, incoming 100 % (fast start, long settle).
6. For a single standout character, animate only its weight with the same curve (07:04).
7. Add a small upward position move (text drifting up) on the same curve when the text arrives mid-motion (23:12).
8. Reuse the identical curve on every later text so the type moves as one family.

## AGENT_EXECUTION
Shot-list row: `L01 "RM2,000 sebulan" | macro tag, top light | number opens: thin→heavy, tracking closes, ~0.5 s on "dua ribu"`.
raea (2D layer over the 3D; fonts load by Google Fonts name; kit `ui.tsx` gives `k`, `lerp`, `out`):
```tsx
// out = Easing.bezier(0.16, 1, 0.3, 1) ≈ AE influence 0 % / 100 % (fast start, long settle, no overshoot)
const t = k(f, word("ribu"), 16, out);                       // 16 f @30 fps ≈ 0.53 s
<div style={{ fontFamily: "Big Shoulders Display", fontSize: 220, color: C.ink,
  fontVariationSettings: `"wght" ${lerp(120, 800, t)}`,     // thin → heavy
  letterSpacing: `${lerp(0.25, 0.02, t)}em`,                 // wide → tight
  transform: `scale(${lerp(0.94, 1, t)}) translateY(${lerp(18, 0, t)}px)`,
  opacity: k(f, word("ribu"), 6) }}>RM2,000</div>
```
Render one frame mid-move (`raea render … --frame N`) to confirm the variable axis is honoured; if not, interpolate
`fontWeight` in steps of 100 instead.

### Worked example
Topic: a kedai runcit in Shah Alam losing RM2,000 a month to expired stock (illustrative).
- BEFORE: "RM2,000" fades in at full weight 0.2 s after the word — reads like a slide.
- AFTER: on "dua ribu" the number arrives thin and widely spaced, then thickens and tightens over 0.5 s while the camera
  is already pushing in; the accent red lands only on "RM2,000" as it reaches full weight.

### Check
- Do weight, tracking and scale share one curve and one start word?
- Is the entrance ≥ 0.4 s with no overshoot past the final scale?
- Is the same opening reused for every designed headline in the episode (one type family)?
- Does the text sit off the hero (no text over the hero)?

## NOTES
- Visual gaps: exact start values (weight number, tracking amount, scale %) are shown on screen only — values above are `~`.
- AE steps dropped: Text › Animate › Font Weight / Tracking animators; translated to `fontVariationSettings` + `letterSpacing`.
