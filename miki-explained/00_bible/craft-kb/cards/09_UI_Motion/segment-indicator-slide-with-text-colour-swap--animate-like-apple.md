---
title: Selection indicator slides between menu items while the passed-over and active labels swap colour
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Animate Like Apple After Effects.txt"
source_time: "27:05–27:41, 29:60–30:33"
tool_target: raea
tier: full
use_when: "a tab bar, segmented control or step list needs to show which item is currently active as the user (or the script) moves between options"
style_fit: "Fits UI-heavy scenes (tab bars, step selectors); keep the slide eased and the colour swap instant on the same frame the indicator arrives, never a separate fade race."
---

## METADATA
09_UI_Motion | After Effects (null-driven shape slide + split/duplicated text colour keys) → raea indicator track + conditional colour | raea

## CREATIVE_INTENT
A glass selection shape (its own controller, see the linked-siblings card) is driven by one "slider" null shared with the
text labels, so moving the null slides both the highlight and the label block together between menu positions. To show
state, the author duplicates the label that is entering/leaving the selection (`Command+Shift+D` "split") and recolours
the duplicate — the label under the indicator is white/bold, the one just vacated goes back to the base colour — rather
than animating a colour property over time. The swap lands exactly as the indicator settles on the new item.

## STE_PROCEDURE
1. Build the indicator shape as its own controller (see linked-siblings card) and link it, plus the label block, to one shared "slider" position value.
2. Key the slider to each menu item's centre in turn, eased in-out, timed to the line that names the new selection.
3. At the frame the slider settles, swap the active label to its "selected" colour and the previously active label back to its base colour.
4. Do the swap as a hard cut on colour (not a cross-fade) exactly on the settle frame — it reads as "this is now selected," not a transition in itself.
5. Keep the indicator's glass/stroke/shadow siblings deriving from the same controller as it moves (see linked-siblings card).

## AGENT_EXECUTION
raea: one `activeIndex` driven by the word timeline; interpolate the indicator's position to that index's slot, and
switch each label's colour by comparing its own index to the live (not yet settled) vs settled index:
```tsx
const target = itemCenter(activeIndex(f));                       // which slot is now active, from vo_timeline.json
const ix = interpolate(f, [t0, t0 + 14], [prevCenter, target], { ...CL, easing: inOut });
const settled = f >= t0 + 14;
const labelColor = (i: number) => (settled ? (i === activeIndex(f) ? C.onAccent : C.muted) : C.muted);
```
Shot row: `| 6 | "tukar ke simpan" | macro tab bar, 2 tabs | glass indicator slides to "Simpan"; "Bayar" fades to muted, "Simpan" turns bold white as indicator settles | this card |`.

### Worked example
Topic: switching a kedai runcit app from "Bayar" to "Simpan" tab (illustrative labels).
- BEFORE: the indicator slides, and a moment later the label colour cross-fades on its own timer.
- AFTER: the glass indicator slides to "Simpan" on the word; the instant it settles, "Simpan" snaps to bold white and
  "Bayar" snaps back to muted grey — the colour change reads as confirmation, not decoration.

### Check
- Does the indicator and label block share one driving value (not two independently-timed animations)?
- Does the colour swap land on the exact frame the indicator settles, not before or drifting after?
- Is the swap a clean colour change, not a slow cross-fade competing with the slide?
- Are the indicator's own stroke/shadow siblings still deriving from its controller while it moves?

## NOTES
- Visual gaps: none beyond the exact ease-curve shape, which the house in-out rule already covers.
- AE dropped: `Command+Shift+D` text-layer splitting to hand-recolour a duplicate — translated to a direct colour
  expression keyed off the active index, which is simpler in code than in keyframes.
