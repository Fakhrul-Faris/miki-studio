---
title: Single-word emphasis — one controlled pulse, adapted from a continuous wiggle
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/Motion Explainer Ads Masterclass | 3 Different Scenes | Part 2.txt"
source_time: "25:01–26:49"
tool_target: raea
tier: principle
use_when: "one keyword in a line needs to stand out physically, not just by colour (a surprising number, a warning word)"
style_fit: "⚠ conflict: source adds a continuous per-character wiggle expression (scale jitter, wiggles/sec + correlation) to the whole word → adapted: replace with one capped scale pulse eased in-out (no continuous jitter), matching the no-bouncy-flashy rule."
---

## METADATA
09_UI_Motion | After Effects (Animate > Scale + Wiggly Selector expression, continuous jitter) → raea single eased pulse | raea

## CREATIVE_INTENT
The source makes one word in a line "wiggle" continuously by keying its scale up slightly and adding a per-character
wiggle expression — a jittery, always-moving emphasis. That continuous jitter reads as bouncy/flashy against house rules,
so the technique is kept only as "give one word its own extra motion the rest of the line doesn't get" — executed instead
as a single controlled pulse (scale up, hold briefly, settle) rather than ongoing jitter.

## STE_PROCEDURE
1. Pick at most one word per line to receive extra emphasis motion (not the whole line).
2. Key its scale from 100 % up to ~106–110 % and back to 100 %, eased in-out, over ≤ 0.4 s.
3. Do not loop or repeat the motion — one pulse, then stillness.
4. Never add continuous per-character jitter/wiggle (⚠ dropped).

## AGENT_EXECUTION
Shot-list field: Events → "'tipu' pulses once, 0.3 s, as the word lands".
raea:
```tsx
const t = k(f, word("tipu"), 10, inOut);                 // up and back within ~0.33 s
const pulse = 1 + 0.08 * Math.sin(Math.PI * t);
<span style={{ display: "inline-block", transform: `scale(${pulse})` }}>tipu</span>
```

### Worked example
Topic: a script line asking whether a "sale" at a kedai is real or fake (illustrative).
- BEFORE: the word "tipu" (fake) sits flat with the rest of the sentence.
- AFTER: "tipu" alone pulses once (+8% scale, 0.3 s) exactly as it's spoken, then settles — the rest of the line stays still.

### Check
- Does only one word in the line get extra motion?
- Is it a single pulse (not a repeating/continuous jitter)?
- Does it settle back to 100% and stay still afterward?

## NOTES
- Visual gaps: source's exact wiggle amount/frequency values are visual only and moot once adapted.
- AE dropped: Wiggly Selector expression (wiggles/sec, correlation) — a continuous-motion tool incompatible with the
  house no-bouncy rule; replaced with a single eased pulse.
