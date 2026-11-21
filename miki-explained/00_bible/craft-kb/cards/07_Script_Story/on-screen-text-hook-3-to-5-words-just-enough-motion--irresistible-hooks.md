---
title: Visual hook — 3–5 bold words on screen plus "just enough" motion
bucket: 07_Script_Story
source: 'Hooks, Open Loops & "But:Therefore" Pacing/How to Create Irresistible Hooks (and blow up your content).txt'
source_time: "09:32–11:42"
tool_target: frame-brief
tier: full
use_when: "writing the frame-0 text and briefing the frame-0 setup (L01)"
style_fit: "Fits RECIPE-D frame-0 text ≤ 8 words (source tightens to 3–5) and 'odd moving first frame'. ⚠ Captions keep house style; this is the frame-0 title text, not a restyled caption."
---

## METADATA
07_Script_Story | short-form creator hook tactics | frame-0 text + frame-0 brief (Moves field)

## CREATIVE_INTENT
Visual hooks are "probably 100 times more powerful than just spoken-word hooks" because people read faster than they
hear or parse a full scene. Two parts: (1) **3–5 words in a big bold font** that distil the 1–2 spoken sentences and
build the context lean; choose words that can't be misunderstood (he wrote "future of home design" rather than the
product name "life-size floor plans" to avoid confusion); (2) **the visual itself, with just enough motion** — like a
deer catching movement at the edge of its eye: too much motion overwhelms and the context is missed, too little bores
and they churn. The combo text + motion + spoken word beats spoken word alone.

## STE_PROCEDURE
1. Before you brief frame 0, write the spoken hook (1–2 lines).
2. Distil it to 3–5 words; hard cap 8 (RECIPE-D).
3. Replace any name or jargon a stranger might misread with the plain benefit or contradiction.
4. Set the text big and bold, clear of the hero (no text over the hero).
5. Give the hero one continuous, slow motion from frame 0 (a drift, a turn, a state change starting).
6. Remove any second competing motion in frame 0 (no simultaneous camera move + object morph + text animation).
7. Fade/grow the text in over ~0.4 s, never pop.

## AGENT_EXECUTION
Frame brief for setup 1: **Idea** = the 3–5 word text; **Moves** = one motion only ("price tag turns ~15° over 2 s,
strike line draws on 'tipu'"). raea: text layer opacity and scale from `interpolate(f, [0, 12], [0, 1], {extrapolateRight: "clamp"})`
with `Easing.inOut` (12 frames = 0.4 s at 30 fps; 24 at 60 fps); hero rotation from frame-linked `Quat.fromEuler`, slow
(e.g. ~0.005 rad/frame, ~). Board check: text and hero both readable at phone size; the text is not the caption bar.

### Worked example
Topic: fake "harga asal" on sale tags (S16 how-to).
BEFORE: frame-0 text "Cara Semak Harga Asal Sebenar Sebelum Beli Masa Sale" (9 words), static tag, camera dolly + tag
spin + confetti of % signs.
AFTER: text "Diskaun 50% ni tipu?" (4 words, bold, upper third). Hero: one macro price tag RM199 → RM99 on dark wood; the
only motion is the tag turning slowly toward the top light while a strike line draws across "RM199" (~0.6 s, ~).

### Check
- Is the frame-0 text 3–5 words (never > 8)?
- Could a stranger misread any word (product names, jargon)?
- Is there exactly one motion in frame 0, already moving at frame 1?
- Does the text avoid the hero and appear over ≥ ~0.4 s?

## NOTES
- Source examples (life-size floor plans, ~15 M views; Colin and Samir Ray-Ban Metas, ~60 M views) are visual; the
  exact motion speeds are unknown (visual only).
- "100×" here and "10×" in the same creator's storyteller video are rhetorical, not measured.
