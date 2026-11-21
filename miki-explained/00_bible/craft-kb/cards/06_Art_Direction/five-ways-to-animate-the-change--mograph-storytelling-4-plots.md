---
title: Five ways to animate the change (transform, remove, merge, side by side, stop) + the pause test
bucket: 06_Art_Direction
source: "Explainer Visual Metaphors & Art Direction Critiques/Motion Graphics Storytelling Example.md"
source_time: "n/a (article): 'How do you animate the change…', Domino, Nalco Water, Esper entries"
tool_target: frame-brief
tier: full
use_when: "briefing the payoff setup (usually L08–L10) — the one shot the story leads to"
style_fit: "Fits Style D object state changes (morph, multiply, x-ray). ⚠ Esper's 'shattering effect' sweep → adapted as the object's own pieces sliding/fading out over ≥ 0.4 s (no flashy transitions). Side-by-side split screen → one frame with two copies of the hero on the same surface, not a hard split line."
---

## METADATA
06_Art_Direction | general | frame brief (Decision, Moves) + shot-list state change

## CREATIVE_INTENT
"The change is the one shot the whole story leads to. Pick how it moves before you design anything else." Five ways:
**Transform it** (one object turns into its better version — PharMerica's loose pills become blister packs in one drawn
transition); **Remove it** (the mess leaves the frame — Wirepas's tangled wires taken away); **Merge it** (separate pieces
join into one — BioStar 2's visitor management, parking and video surveillance into one system); **Run it side by side**
(old and new share the frame — Domino runs each ribbon-saving mode next to "Default Mode": "If viewers have to remember
the before, they won't"); **Stop it** (a moving machine halts — the EU's VAT carousel stops). The test: "pause your video
on the change shot. If a viewer can't tell what got better from that one frame, redraw the shot."

## STE_PROCEDURE
1. Before you design any other setup, pick one of the 5 change moves for the payoff shot.
2. Transform: morph the hero into its better version in one continuous move.
3. Remove: take the mess-object off the frame; keep the clean surface held ≥ 1 s.
4. Merge: bring separate pieces together into one object on the word.
5. Side by side: put old and new in the same frame, running at the same time.
6. Stop: halt the moving metaphor/machine on the payoff word.
7. Variant (Nalco Water): show the same failure twice — once after it happens, once before; the gap is the story.
8. Pause on the change frame; if what improved isn't readable from that still, redraw.

## AGENT_EXECUTION
Frame brief for the payoff setup: `Decision:` names the move (e.g. "Merge: 3 receipts slide into one"), `Moves:` gives
timing on the word (≥ 0.4 s, eased in-out, overshoot ≤ 3–5 %). Shot-list row's state-change column names before → after.
Board check: export the change frame as a still and run the pause test at phone size.
raea: Transform → swap two named `Model`/`Mesh3d` parts with crossfading opacity + scale tracks (shape is fixed per part;
RECIPE-D morph = two parts). Remove/Merge → animate each named part's `transform` (translation) with in-out-cubic.
Stop → drive rotation from `interpolate(frame, [start, stopWord], [0, angle])` clamped so it eases to rest at `word("…")`.
Side by side → two instances of the hero model at ±x on the same surface, same light.

### Worked example
Topic: a laundromat in Bangi paying for 3 separate payment apps (illustrative).
- BEFORE: the payoff line "Satu QR je, semua masuk" shows a logo and a tick icon.
- AFTER (Merge): row `| 9 | "Satu QR je" | low grazing angle on the counter | 3 phone-stand QR plaques slide together on
  "Satu", merge into one plaque on "QR"; accent glows on the merged plaque |`. Pause test: still shows 3 → 1; readable.

### Check
- Is the change move named before the other setups are designed?
- Is the move one of the 5 (or the twice-shown failure)?
- Paused on the change frame, can you tell what improved without sound?
- Does it obey ≥ 0.4 s eased motion with no shatter/flash?

## NOTES
- Visual gaps: example videos not viewable; timing values of the source transitions unknown (visual only).
- ⚠ shattering effect, hard split-screen line → adapted (house rule: transitions from the scene's own objects).
- Overlap: `four-visual-metaphor-types--visual-metaphors-mograph.md` (transformation type); this card is about the
  payoff shot's change, not metaphor choice.
