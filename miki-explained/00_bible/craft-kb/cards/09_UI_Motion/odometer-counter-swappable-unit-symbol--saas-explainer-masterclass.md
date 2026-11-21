---
title: Odometer-style counter with a swappable unit symbol
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How To Create SaaS Explainer Ad in After Effects | For Beginners | +01 Hour Masterclass.txt"
source_time: "25:25–27:13"
tool_target: raea
tier: full
use_when: "an RM wow-number payoff that should count up on screen (savings, time saved, revenue recovered) rather than just appear"
style_fit: Fits directly — this is the house's RM-wow-number moment; keep the counting window ≤ 1 s so it reads as a result, not a slot machine, and the unit symbol must be the real one (RM), never a placeholder.
---

## METADATA
09_UI_Motion | After Effects (character-builder script generates a digit+symbol comp) → raea tabular-digit counter component | raea

## CREATIVE_INTENT
A script (Automator/character-exploder) builds a composition holding every digit and symbol as separate layers, so a
number can be "typed" and the comp assembles only the characters it needs. The key move beyond a plain counter: one of
the built-in symbol slots (the dollar sign) is swapped inside that generated comp for whatever unit the video actually
needs (here, a currency word) — so the same counter rig works for RM, %, or a unit label without rebuilding the digits.
The number itself is keyed from a start value to an end value (44,000 → 48,000) with eased interpolation, then the whole
thing is masked so only the digits show and faded from white to the accent colour as it completes.

## STE_PROCEDURE
1. Build (or reuse) a digit-slot comp: one layer per character 0–9 plus any unit symbols, all pre-sized to match.
2. Replace the symbol slot with the actual unit this video needs (not a generic placeholder).
3. Key the number from its start value to its end value over ≤ 1 s, eased (fast then settling, not linear).
4. Mask the comp so only the digits needed at each frame are visible.
5. Fade the digit colour from neutral to the brand accent as the count lands on its final value.

## AGENT_EXECUTION
Shot-list row: `| 6 | "jimat sampai RM300 sebulan" | macro tag, counter close-up | RM0 → RM300 counts in 0.8 s on "tiga ratus", digits turn accent on landing | this card`.
raea: tabular-nums digit component, each digit position independently eased to its target value, unit symbol as a fixed
real-text node:
```tsx
const t = k(f, word("ratus"), 24, out);                 // 0.8 s @30fps
const val = Math.round(lerp(0, 300, t));
<div style={{ fontVariantNumeric: "tabular-nums", fontSize: 160,
  color: lerpColor("#fff", C.accent, t) }}>
  RM{val.toLocaleString()}
</div>
```
Render a frame mid-count (`raea render … --frame N`) to confirm digits don't jitter in width (tabular-nums required).

### Worked example
Topic: a kedai runcit saving RM300 a month by catching expired stock early (illustrative).
- BEFORE: "RM300" appears already complete, static.
- AFTER: on "tiga ratus", the counter runs RM0 → RM300 in 0.8 s, landing exactly on the word, the digits turning from
  white to the brand accent as they settle.

### Check
- Does the count finish exactly on the word that names the number, not before or after?
- Is the counting window ≤ 1 s (a result, not a slot-machine spin)?
- Is the unit symbol the real one (RM), never a generic placeholder dollar sign?
- Do digit widths stay fixed (tabular figures) so the layout doesn't jitter?

## NOTES
- Visual gaps: the exact ease-curve values for the count are shown on screen only, marked `~`.
- AE dropped: the character-exploder/Automator script that builds the digit comp — translated to a tabular-nums text
  node with per-frame value computation (no per-character comp needed in raea/HTML text).

## ADDENDUM — Motion Explainer Ads Masterclass | 3 Different Scenes | Part 2
Source: "Minimalist Tech & SaaS 3D Staging/Motion Explainer Ads Masterclass | 3 Different Scenes | Part 2.txt" (37:03–40:50, 50:38–51:59).
- Extra variant for when no counter-expression script is available: build the counting illusion by hand instead of
  via expression. Duplicate the text layer once per digit frame (e.g. a 10-frame block), type the next digit value
  into each duplicate, arrange in sequence so playback reads as the number ticking up (0→5→…→500); synchronise a
  second, true odometer/counter-script comp underneath so the two match, then trim the manual version once the
  timing feels right.
- Values from this source: each duplicate held ~10 frames before advancing to the next digit; counter targets used
  were 0→500 (a generic money-counter stat) and 0→22 (an "8 seconds" stat context). Replacement icons were synced
  to a second counter via the same alt-drag icon-swap step as this card's own icon-swap note.
- Use case: confirm the manually-built illusion against a real counter before finalizing, when raea's per-frame
  value computation isn't yet wired up for a given shot.
