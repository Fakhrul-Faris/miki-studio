---
title: Stagger-reveal text segments with an eased position+opacity ramp
bucket: 09_UI_Motion
type: master
members:
  - cards/09_UI_Motion/letter-by-letter-text-reveal-position-opacity-ramp--imperial-3d-animate-tutorial.md
  - cards/09_UI_Motion/word-based-ramp-text-reveal--smooth-saas-creatorly.md
sources: ["How To Animate Like Imperial (Blender & After Effects Tutorial).txt", "How to do SMOOTH SAAS Animation Like Creatoroly | After Effects Tutorial.txt"]
use_when: "a short title/label needs to read as handwritten-in-motion, or a designed on-screen line in a UI-heavy scene needs a built-in reveal — ramp each segment's (letter or word) position, opacity (and optionally blur) in on an eased curve"
style_fit: "Fits — each segment rises/fades (and optionally unblurs) in over ≥ 0.4 s, eased, never a hard pop; no bouncy springs (overshoot stays capped at 3–5 % per house rule). Never restyles the EX15 captions — this is for designed text only (titles, step labels, frame-0 text)."
---

## METADATA
09_UI_Motion | After Effects Range Selector / text animator (source) → raea per-segment `interpolate` stagger / `<Stagger>` + `rise` | raea

## CREATIVE_INTENT
A short line reads as "handwritten-in-motion" rather than a flat cut or pop by revealing it one segment at a time:
each letter or word slides in from an offset while fading from 0 opacity, staggered left to right so the whole line
completes in about a second, eased so it starts slow, speeds up, and settles rather than crawling at a constant
speed; the exit mirrors or steepens the entrance.
- Imperial 3D Animate adds the letter-level version: a Range Selector sweeps 0→100 over ~1 s so letters reveal left
  to right; Position (offset → 0) and Opacity (0 → 100) key together on that same range, with motion blur so the
  motion reads as fast rather than jittery; the word holds for its spoken duration, then exits on a shorter, steeper
  curve than the entrance (faster out than in).
- Smooth SaaS Creatorly adds the word-level version: words rise +75 px and unblur (10 px → 0) while fading in,
  range-selector based on words with shape "Ramp Up" (Ease High 25%, Ease Low 100%), offset swept −100%→100% over
  ~1 s; the whole line then exits upward together (y 0 → −75, opacity → 0, "Square" shape, all words at once), and
  the next line enters on the same frame — "by lines" or "by words".

## STE_PROCEDURE
1. Choose the segment granularity: letters (for a very short word/label) or words (for a full designed line).
2. Give every segment the same entrance: position slides in from an offset (letters: ~12 px; words: ~75 px) to 0, opacity 0 → 1, and optionally blur 10 px → 0 for the word variant.
3. Stagger the segments left to right so the whole line/word completes in about 1 s (letters: ~3-frame stagger at 24–30 fps; words: offset swept over ~1 s, Ease Low ~100%).
4. Ease each segment with a fast start and soft landing (never linear, never a bounce/overshoot on position).
5. Hold the fully revealed text on screen for its spoken duration.
6. Exit on a shorter, steeper curve than the entrance: letters exit faster (~8–10 frames vs. ~14 in); words exit upward together, all at once, mirroring or steepening the entrance.
7. If a next line follows, bring it in on the same frame as the exit.

## VALUES BY SOURCE
| parameter | Imperial 3D Animate (letters) | Smooth SaaS Creatorly (words) | recommended for Style D (+ why) |
|---|---|---|---|
| Segment | letter | word | Letters for a very short label (≤ ~6 chars); words for a full designed line |
| Offset distance | ~12 px (position down to 0) | +75 px (y down to 0) | Scale offset to segment size: smaller for letters, larger for words |
| Blur | not used (motion blur only, for smoothness) | 10 px → 0, unblurs alongside fade | Use blur only on the word variant — adds "typing feel"; skip for letter-level micro-labels |
| Stagger/total duration | ~3-frame per-letter stagger, full reveal ~1 s | offset swept −100%→100% over ~1 s | ~1 s total reveal either way; segment stagger scales to fit |
| Easing shape | ease out cubic per letter (slow→fast→settle implied by Range Selector sweep) | "Ramp Up", Ease High 25%, Ease Low 100% (fast start, soft landing) | Ease-out cubic per segment, fast start/soft landing — matches both |
| Exit | shorter, steeper curve than entrance (8–10 f vs 14 f) | whole line exits upward together, "Square" shape, mirrors entry | Exit faster than entrance; for words exit as one block, for letters exit per-letter but faster |
| Bounce | not present | ⚠ source has a pasted bounce expression on position — dropped | Never use a bounce/spring; house rule caps overshoot at 3–5% |

## AGENT_EXECUTION
Shot-list cards column / frame-brief Moves: name the label/line, its reveal duration (~1 s in, hold, ~0.3–0.4 s out),
and which word it's timed to. In raea this is a per-segment stagger on a text layer — no AE import, no range
selector, no transparent-ProRes roundtrip.
```tsx
// Letter-level (short label)
const letters = "5 SEN".split("");
const revealStart = inF;
const perLetter = 3;  // frame stagger between letters (~1 s total reveal at 24–30 fps for a short word)
{letters.map((ch, i) => {
  const t0 = revealStart + i * perLetter;
  const y = interpolate(f, [t0, t0 + 14], [12, 0], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const o = interpolate(f, [t0, t0 + 14], [0, 1],  { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <span key={i} style={{ transform: `translateY(${y}px)`, opacity: o }}>{ch}</span>;
})}
// exit: shorter, steeper curve than the entrance, e.g. 8–10 frames instead of 14
```
```tsx
// Word-level (designed line), raea named moves
<Stagger each={3} enter={rise({ distance: 75, frames: 12, ease: "out-cubic" })}>
  {/* wrap each word span; add blur via track({ 0: 10, 12: 0 }) */}
</Stagger>
// cue the first word with at={word("…")}; each word ≥ 12 f @30 fps (0.4 s); `each` 3–4 f so a 5-word line completes in ~1 s
// exit="rise" exitAt={…} plays the move backwards, all words together
// mask variant: wrap the line in overflow:"hidden" and rise from 100% of its height
```

### Worked example
Topic: the register total resolving to "RM 450" at month's end (letters), followed by the S16 step line "Step dua:
tengok harga sebelum diskaun" (words) — illustrative.
- BEFORE: "RM 450" cuts in as a flat static title; separately, the whole step sentence fades in at once, 0.2 s.
- AFTER (letters): each character of "RM 450" slides up and fades in left to right over ~1 s, eased so it starts
  slow and lands with a settle; it holds through the line, then exits in a faster ~0.3 s.
- AFTER (words): "Step dua: tengok harga sebelum diskaun" rises 75 px and unblurs word by word from "Step" to
  "diskaun" in ~1 s; on the next line the whole sentence lifts out upward while "Step tiga" rises in.

### Check
- Does the reveal move position AND opacity together (plus blur for the word variant), not opacity alone?
- Is the entrance eased (slow→fast→settle), never constant-speed, with no bounce/overshoot on position?
- Is the exit faster than (or at least as steep as) the entrance?
- Does the whole reveal land inside ~1 s, avoiding a hard pop on or off (house rule: fade/grow ~0.4 s)?
- Is this designed text (title/step label/frame-0 text), never a restyled EX15 caption?

## NOTES
- Visual gaps: Imperial 3D Animate's exact offset distance, stagger timing, and ease-curve shape are judged on
  screen (`~`); Smooth SaaS Creatorly's bounce-expression code was only in the video description (not spoken) and
  wasn't recovered — dropped anyway since it conflicts with the house no-bounce rule.
- AE dropped: Range Selector keyframing (both sources), Easy Ease "Flow" presets, motion blur, ProRes 444 +
  premultiplied-alpha export, and Blender "Images as Planes" import — translated directly to raea per-segment
  `interpolate`/`<Stagger>` + `rise`, since raea renders and composites text natively.
- STT fixes carried from source: "rain/ren selector" = range selector; "easy high/low" = Ease High/Low.
