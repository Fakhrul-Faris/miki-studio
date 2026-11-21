---
title: Word-by-word text reveal — position + opacity + blur, ramped per word with asymmetric easing
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How to do SMOOTH SAAS Animation Like Creatoroly | After Effects Tutorial.txt"
source_time: "00:27–02:02 (reveal), 10:22–12:23 (exit up + next line by lines)"
tool_target: raea
tier: principle
use_when: "designed on-screen lines in UI-heavy scenes (step titles, frame-0 text) — not the EX15 captions"
style_fit: Fits — each word rises/fades/unblurs over ≥ 0.4 s; ⚠ the source adds a pasted bounce expression on position → dropped (no bouncy springs); exit mirrors entry.
---

## METADATA
09_UI_Motion | After Effects (source) → raea `<Animate>` / per-word interpolate | raea

## CREATIVE_INTENT
SaaS-style text (Creatorly look) arrives word by word "for a natural typing feel": one animator moves Y +75 px, sets
opacity 0 and blur 10; the range selector is based on **words**, shape **Ramp Up**, Ease High 25 %, Ease Low 100 %;
offset keyed −100 % → 100 % over ~1 s. Exit: Y −75, shape **Square**, offset −100 → 0 so the line leaves upward;
the next line enters "by lines" from a duplicate. Also in "Apple Style Animation Guide" (03:47–04:12): position 100,
opacity 0, words + Ramp Up, Ease High −50, Ease Low 100, offset keyed across the full range; variants there — separate
words on their own layers with staggered position/opacity keys, or a slide-up behind a square mask for a clean reveal.

## STE_PROCEDURE
1. Split the line into words; give each word the same entrance: y +75 px → 0, opacity 0 → 1, blur 10 px → 0.
2. Stagger the words so the whole line takes ~1 s (source offset sweep 0 → 1 s).
3. Ease each word with a fast start and soft landing (ramp, Ease Low 100 %).
4. Exit the line upward together (y 0 → −75, opacity → 0), all words at once ("square" shape).
5. Bring the next line in on the same frame as the exit, by lines or by words.

## AGENT_EXECUTION
raea named moves: `<Stagger each={3} enter={rise({ distance: 75, frames: 12, ease: "out-cubic" })}>` around word spans
(raea guide animating), adding `blur` via `track({ 0: 10, 12: 0 })`; cue the first word with `at={word("…")}`. Each
word ≥ 12 f @30 fps (0.4 s); `each` 3–4 f so a 5-word line completes in ~1 s. Exit: `exit="rise" exitAt={…}` plays the
move backwards. Mask variant: wrap the line in `overflow: "hidden"` and rise from 100 % of its height.

### Worked example
Line (S16 step, BM casual): "Step dua: tengok harga sebelum diskaun".
- BEFORE: whole sentence fades in at once, 0.2 s.
- AFTER: words rise 75 px and unblur one after another from "Step" to "diskaun" in ~1 s; on the next line the whole
  sentence lifts out upward while "Step tiga" rises in.

### Check
- Is every word's own entrance ≥ 0.4 s and the line done within ~1 s?
- Is there no bounce/overshoot on position?
- Is this designed text, not a restyled caption?

## NOTES
- Visual gaps: the bounce expression code was only in the description (not spoken) — not recovered, and dropped anyway.
- STT fixes: "rain/ren selector" = range selector; "easy high/low" = Ease High/Low.
- AE dropped: text animator + range selector; translated to raea `Stagger` + `rise` + blur track.

## ADDENDUM — After Effects Text Animation Tutorial
Entrance: x +50 px from the right (not y), opacity 0 → default, based on **words**. Sweep 0 % → 100 % over ~1 s.
Ease: F9 Easy Ease base; Quint In/Out for a "very rapid" feel → raea `ease: "out-quint"` per word, in-out-quint on
the whole-line sweep. Exit variant: a *separate* animator, **opacity only** (no position), range End keyed
100 % → 0 % between 2 s–3 s, curve pulled steeper — calmer than the master card's exit-up; use when the next setup
cuts on the word rather than bringing in a new line. Name animators by job ("start animation" / "end animation") so
entry and exit stay independently editable. raea: `slide({ from: "right", distance: 50 })` or this card's `rise`;
exit as `exit="fade"` with `exitAt`, ≥ 12 f, no position change.

## ADDENDUM — How to Create Viral Apple-Style UI Widget Animations in After Effects! (Apple Masterclass Part 2)
Variant: **letter-level**, not word-level — Advanced > Units set to Index so the ramp runs per letter, a tighter
cascade for short hero words/labels. Same paired properties (position low, opacity 0%, blur 10, shape Ramp Up).
Source quirk (AE-only, no raea equivalent): because Ramp Up distorts keyed values, End is set to 0 first, then Start
raised to 100 at the end frame; and because Ramp Up itself eases the start, the entry easing is slowed and the exit
sped up on top, to counteract the ramp's own bias ("slow down the entry and speed up the exit just to counteract the
ramp up movement"). Style D: skip the ordering trap (interpolate 0→1 directly) and bake the counter-correction into
one asymmetric curve (e.g. `Easing.inOut` with a steeper out) instead of stacking two corrections. Use per-letter
granularity only for a single short hero word — a full line at letter level reads busy on a phone; raea
`each={1}`, ≥ ~6–8 f per letter @30 fps so a short word still completes within ~0.5 s.

## ADDENDUM — Cleanest Match-Cut Transition for SaaS
Confirms the words-based recipe on a different tool (Resolve Fusion Follower): per-word Offset Y (start lower) +
opacity 0 → 1, 15 frames per word (~0.5 s @30 fps, matches the house ≥ 0.4 s fade), 1-frame delay per word (reads as
a near-unison ripple), easing Out Cubic (`Easing.out(Easing.cubic)`), unit = words. ⚠ Source styles word 1 with a
gradient, word 2 solid — conflicts with the house's one flat accent colour; adapt as accent on the one key word only,
no gradient. Extra step: start the next text swap a few frames before this reveal ends so motion never stops (see
`cards/09_UI_Motion/sharp-peak-curve-zoom-through-text-swap--saas-match-cut-resolve.md`).

## ADDENDUM — SaaS Motion Graphics Masterclass Techniques
Variant for text over a glowing/voice-presence visual (see
`cards/06_Art_Direction/organic-light-orb-from-displaced-shapes--saas-motion-graphics-masterclass.md`): same
word-based opacity ramp, but starting from an opacity floor of ~15 % (not 0) so the word is already faintly visible,
paired with a synced Gaussian blur keyed 25 → 0 on the same span — the line reads as forming out of the light itself
rather than sliding/fading in on a flat panel. Style D: use this only when the text sits over a bright/glowing
background; start the word's opacity track at ~0.15 and use the higher 25 → 0 blur value there (vs. this card's
10 → 0) for the extra softening a bright background needs. Same ≥ 0.4 s per word / ~1 s per line budget applies.

## ADDENDUM — Master SaaS Motion Graphics in 30 Minutes
Independent second source confirming the same recipe (Animate Position + Opacity; range selector words; Ramp Up;
Ease Low 100 %; Offset −100 % → 100 %), with explicit deltas this card's own source left partly unstated: position
offset **50 px** (vs. this card's 75 px — use 50–75 px scaled to text size), opacity **0 → 100 %**. Confirms the
recipe is meant to be saved as a reusable preset and re-timed per block ("we can save this as a preset... or copy
this over and paste it onto our text") rather than re-authored each time — in raea, implement as one shared
text-reveal component parametrised by start frame.
