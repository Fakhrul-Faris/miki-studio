---
title: Each new word appears at the peak of a fresh push — nested carriers, one move per word
bucket: 08_Edit_Pacing
source: "Minimalist Tech & SaaS 3D Staging/Apple-Style 3D Motion Design.txt"
source_time: "21:46–27:07 (scene 4: nulls 1–3, texts A/B/C), 29:16–29:32 (light shifts right→left as text C enters), 30:06–30:37 (exit)"
tool_target: shot-list
tier: full
use_when: "planning a setup that carries 2–3 words/numbers in a row (e.g. L04–L06 steps) on one hero object"
style_fit: Fits Style D's 'an event about every second, on the word' — every word gets its own eased camera/object move; moves eased in-out, under ~130°/s and ~40 m/s.
---

## METADATA
08_Edit_Pacing | After Effects (source) → shot-list rows + raea nested `Entity` transforms | shot-list, raea

## CREATIVE_INTENT
In scene 4 the product and its lights sit under a 3D null; each time a new text appears, a new null is added above the
previous one and given its own move (scale/position, curve "100 on both sides" = strong ease in-out) while the model
gets a matching extra rotation. Each text layer is trimmed to start "right at the peak of the movement" — the point read
off the animation curve — then opens with its own small weight/position animation. As text C enters, the lighting shifts
slightly right→left on the same curve. The whole stack ends on the opposite curve (100 left / 0 right: accelerate out)
into the next scene.

## STE_PROCEDURE
1. Parent the hero and all its lights to one 3D carrier so they move as one.
2. A couple of seconds after the opening, key carrier 1 (scale/position) with a strong ease in-out.
3. Read the curve; find its peak (fastest point); start text A exactly there.
4. Give text A a small upward drift and its own weight/tracking opening on the same curve.
5. Add carrier 2 above carrier 1 (and text A); key a new move; add a matching small model rotation.
6. Start text B at carrier 2's peak; parent B to carrier 2 so it travels with the push.
7. Repeat with carrier 3 for text C; shift the key light slightly right→left as C enters.
8. Remove details that the new angle can no longer see (source trims the power-indicator layer).
9. Exit: key the last carrier's scale down + position with an accelerating curve, and the model with the same curve.

## AGENT_EXECUTION
Shot-list rows (one hero, three words, three pushes):
`| 4 | "Step satu: semak harga asal" | macro tag, carrier push 1, cam drifts in | "harga asal" appears at the push's fastest frame | this card |`
`| 5 | "Step dua: kira diskaun" | same tag, carrier push 2 + 8° turn | "kira" appears at push-2 peak; key light slides R→L | this card |`
raea: nest `Entity` transforms (raea-bevy/scene.md) — each word's move is one more parent, so moves add without
re-keying the earlier ones; the word's `at` is the peak frame of its push (midpoint of an in-out curve).
```tsx
const p1 = k(f, A0, 24, inOut), p2 = k(f, B0, 24, inOut);
// peak of an in-out curve = its midpoint: show word A at A0 + 12, word B at B0 + 12
<Entity transform={Transform.fromXyz(0, 0, lerp(0, 0.06, p2)).withRotation(Quat.fromEuler("XYZ", 0, lerp(0, 0.14, p2), 0))}>
  <Entity transform={Transform.fromXyz(0, lerp(0, 0.03, p1), 0).withScale(lerp(1, 1.08, p1))}>
    {/* hero model + its lights */}
  </Entity>
</Entity>
```

### Worked example
Topic: checking a "50 % off" claim (price arithmetic only; illustrative numbers).
- BEFORE: one static macro of the tag; "RM100", "RM50", "jimat RM50" fade in one after another on a still frame.
- AFTER: tag under the top light; push 1 peaks on "seratus" → "RM100" appears; push 2 (with an 8° turn) peaks on
  "lima puluh" → "RM50"; on "jimat" the key light slides across and "jimat RM50" opens in the accent colour.

### Check
- Does every word start on the fastest frame of its own move (not on a still frame)?
- Is each move a new parent layer rather than extra keys on one transform?
- Are all moves eased in-out and under ~130°/s / ~40 m/s?
- Does the setup still end ≤ ~4 s, with an exit move that hands into the next setup?

## NOTES
- Visual gaps: exact null scale/position/rotation values and the curve peak positions are visual only.
- Related set-1: layered rig mechanics → `masters/05_Camera_Raea_Pipeline/layered-camera-rig.md`; this card is the
  word-timing rule on top of it.
