---
title: Stage each feature as a floating UI "widget card" in 3D space; the camera flies from one to the next
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How To Create Apple Style UI Ad in After Effects | For Beginners | +01 Hour Masterclass.txt"
source_time: "13:32–15:58 (null-chain camera approach to the first card), 22:29–23:01 (widget staged + tracked to its background shape), 25:11–28:10 (second widget, a QR/boarding-pass card, staged the same way)"
tool_target: raea
tier: full
use_when: "an episode has 3+ discrete features/steps to show on one object or app — structuring the whole middle of the film as a sequence of visited setups"
style_fit: Fits directly — this is the shot-list spine for a how-to: each "setup" (RECIPE-D §4) is one widget card, camera flies to it on the step's word, matching the ≤4 s/setup and new-framing-per-setup rules.
---

## METADATA
09_UI_Motion | After Effects (null-chained camera, each widget its own tracked comp) → raea: camera rig visiting staged UI panels | raea

## CREATIVE_INTENT
Rather than cutting between flat screens, every feature/step is built as its own self-contained "card" (a rounded panel
with its icon, label and state) positioned at its own point in 3D space around the hero object. A camera, parented
through a chain of null objects, approaches each card in turn — camera position/rotation keyed to arrive exactly as that
step's line starts, each card's own internal animation (icon draw-on, counter, press) playing once the camera settles.
When all steps are shown, the camera (or the cards) returns to a centred framing holding only one hero element, closing
the sequence.

## STE_PROCEDURE
1. Decide the fixed number of steps/features first (our format: 3–5 steps for an S16 how-to).
2. Place one card per step in 3D space, each with room to be read on its own (not overlapping neighbours).
3. Build a camera-null chain; key the camera to arrive at each card exactly on that step's named word (its own setup).
4. Let the camera settle (ease out) before the card's own internal animation (icon, counter, state change) plays.
5. After the last card, return camera/cards to a single centred framing — don't end mid-tour.
6. Each card shares one template (container, type scale, icon weight) so the tour reads as one system, only content differs.

## AGENT_EXECUTION
Shot-list rows: `| 10 | "satu, scan QR" | camera arrives card 1 | icon draws on, label fades in | this card`
`| 11 | "dua, confirm jumlah" | camera arrives card 2 | amount counts up, confirm button presses | this card + odometer card`
`| 12 | "tiga, siap" | camera arrives card 3, then recentres | check icon draws, cards recede to hero | this card`.
raea: one `<Camera3d>` keyed through named waypoints, each card a `<Entity>` with its own internal `k()` timers gated on
the camera's arrival frame:
```tsx
const arriveCard2 = word("jumlah");
const camT = k(f, arriveCard2 - 10, 20, out);
camera.position = lerpVec3(wp1, wp2, camT);
// card 2's own content only starts once the camera has mostly arrived:
const contentT = k(f, arriveCard2, 14, out);
```

### Worked example
Topic: a 3-step QR top-up at a kedai runcit (illustrative generic steps).
- BEFORE: three separate flat screenshots cut between with no spatial relationship.
- AFTER: the camera flies past three floating cards arranged around the phone — "scan" card lights up on "satu", "confirm"
  card's amount counts up on "dua", "done" card's check mark draws on "tiga" — then the camera pulls back to the phone alone.

### Check
- Does the camera arrive at each card exactly on that step's named word?
- Do all cards share one visual template (only content differs)?
- Does the sequence end on a single centred framing, not mid-tour?
- Is the step count 3–5, matching the S16 how-to format?

## NOTES
- Visual gaps: exact null-chain position values are visual only, marked `~`.
- AE dropped: True Comp Duplicator / Overlord plugin exports (tool convenience, no transferable principle) — kept: the
  one-template-per-card structure and the camera-arrival timing.
- Folds in the same file's QR/boarding-pass widget (25:11–28:10), which is simply one more card in this tour, not a
  separate technique.

## ADDENDUM — Motion Explainer Ads Part 3
Source: "Minimalist Tech & SaaS 3D Staging/Motion Explainer Ads Part 3.md" (12:56–21:02, 39:03–48:16)

Extra variant: a single logo/UI-element "card" visited by cursor + camera, then a flag/UI-chip carousel on the same
rig. This source's first scene is a one-card version of the camera-tour pattern: instead of several feature cards,
one glass-style UI "gloss" panel (logo + highlight sweep template) sits in 3D space; a cursor graphic slides in from
below and "clicks" it (scale-dip keyframes synced to the click), then the camera pushes past it into the next part of
the scene — confirming the same beat (camera/cursor arrives on the card, card's own animation plays, camera moves on)
works for a single hero card, not only a multi-card tour.

Second scene extends the pattern to a carousel of near-identical cards: a row of country-flag chips (each a small
UI-card template: rounded rectangle + flag image + label) is built once, then duplicated per flag/country, each chip
linked individually to the group's parent null so the whole row can be panned/revealed together — i.e. the
one-template-per-card rule above, applied to many near-identical small chips rather than a few large feature cards.

Values by source: cursor click — scale keyframes duplicated with a reduced mid-value (~75% dip) for the press,
eased, synced to the card's own highlight-sweep animation. Flag carousel — each chip = rounded-rectangle + flag
image + text, built once and duplicated per country; all chips linked to one parent null for shared pan/reveal.

Timestamps: 12:56–14:50 (single logo card + cursor approach), 15:01–18:10 (cursor click scale-dip + camera
push-through), 39:03–41:00 (flag-chip template built), 42:02–43:00 (chips duplicated and linked to one null for the
carousel row).
