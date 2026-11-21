---
title: Split screen — two simultaneous routines side by side to show their similarities and differences
bucket: 09_UI_Motion
source: "Studio Lighting, Silhouettes & Color Theory/What is Juxtaposition in Film — How to Take Visual Storytelling to the Next Level.txt"
source_time: "15:37–16:11"
tool_target: raea
tier: full
use_when: "UI-heavy comparisons (app A vs app B checkout, cash vs e-wallet flow) where both run at the same time"
style_fit: "Fits UI scenes in 9:16 as a top/bottom split; panels slide in ~0.4 s, never pop; ⚠ not over the hero object in Style D 3D shots — use as a UI scene."
---

## METADATA
09_UI_Motion | general (film) → raea 2D layout (two panels) | raea / HyperFrames

## CREATIVE_INTENT
"Split screens can also directly contrast two ideas." *Euphoria*: two characters' routines side by side, "emphasizing the
similarities and differences of their days". *22 Jump Street*: "vastly different visuals" for two different experiences.

## STE_PROCEDURE
1. Before splitting, confirm both actions happen at the same time and have matching steps.
2. Split the 9:16 frame top/bottom (two ~16:9-ish panels).
3. Run both flows in sync, step for step, on the same beats.
4. Keep identical layout and scale in both panels; let only the differing step differ.
5. Highlight the difference with the one accent (a step count, a fee, a timer).
6. Slide the panels in/out over ~0.4 s (eased), never cut them on.

## AGENT_EXECUTION
raea: two `AbsoluteFill` boxes (top: `top: 0, height: H/2`; bottom: `top: H/2`), each holding a phone-screen component
from `tools/raea/kit/ui.tsx` (e.g. `Card`, `Count`); both driven by the same frame so steps align; panels enter with
`translateY` from ±H/2 on `Easing.out(Easing.cubic)` over 12 f.

### Worked example
Topic: "Bayar dengan kad vs QR di kedai — mana lagi cepat" (illustrative timings).
- BEFORE: two separate scenes, 6 s each.
- AFTER: top panel = card terminal flow (insert, PIN, approved, 3 steps), bottom = QR flow (scan, confirm, done, 3 steps); both in sync; a timer in accent shows "8 s" vs "5 s" on "lagi cepat".

### Check
- Do both panels run at the same time with matched steps?
- Are layout and scale identical so only the difference stands out?
- Do the panels slide in/out over ~0.4 s?

## NOTES
- Visual gaps: film split layouts visual only.
