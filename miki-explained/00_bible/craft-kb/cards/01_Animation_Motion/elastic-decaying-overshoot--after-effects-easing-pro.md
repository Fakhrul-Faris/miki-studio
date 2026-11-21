---
title: Elastic decaying overshoot (chain of shrinking keyframes, eased all together)
bucket: 01_Animation_Motion
source: "Motion Feel, Easing & Camera Choreography/After Effects Easing Pro Transcript.txt"
source_time: "07:24–08:17"
tool_target: raea
tier: full
use_when: "a UI element, counter digit or diagram part needs a springy settle on arrival — never a Style D hero object"
style_fit: "⚠ conflict: house rule caps overshoot at 3–5 % over ≥0.4 s with no bouncy springs; the source's full multi-bounce elastic wobble is prohibited on any real object. Adapted below to either (a) a single settle within the cap, or (b) the full decaying-oscillation curve reserved for a non-physical UI/diagram accent (a counter digit, a pill, a line graph marker) where a playful settle is the point."
---

## METADATA
01_Animation_Motion | After Effects Graph Editor (value graph) | raea `interpolate` with a multi-stop decaying curve

## CREATIVE_INTENT
A single eased overshoot (one bounce back from 120 % to 100 %) reads as "pushed and stopped"; a believable spring instead
overshoots, swings back past centre a smaller amount, and repeats with each swing smaller than the last until it settles —
"the values get smaller and smaller until the last key frame". The same decaying-amplitude shape works on rotation too, and
the source explicitly prefers it on rotation over scale ("probably a better application of this technique than the scale
version"), warning against applying it to every object in a scene.

## STE_PROCEDURE
1. Before shaping, finish the object's base move (position/arrival) first; apply this only to the property that should spring (scale or rotation).
2. Set the first overshoot peak larger than the final value (source: scale 100 → 120, i.e. +20 %).
3. Add further keys at an even time spacing (source: 6 frames apart) alternating above/below the final value.
4. Make each new key's displacement from the final value smaller than the last (a decaying sequence, e.g. ~20 % → ~10 % → ~5 % → 0).
5. Ease every key in the chain together (select all, one easing pass) so the curve smooths into a single decaying wave, not separate bounces.
6. Prefer rotation over scale for this chain on a believable object; reserve scale-wobble for flat UI/diagram accents only.
7. Before accepting it, check it does not read as "every object in the scene wobbling" — use it on at most one element per beat.

## AGENT_EXECUTION
**raea:** a decaying-oscillation easing as a sum of an eased arrival plus a damped sine, or as explicit decaying stops in
`interpolate`. House-safe variant (single settle) vs full elastic (UI/diagram accent only):
```tsx
// (a) House-safe: one small settle, overshoot capped ~3-5%, ≥0.4s — for any real Style D object
const s = interpolate(f, [f0, f0 + 0.4 * fps], [0, 1.04, 1], [f0, f0 + 0.25 * fps, f0 + 0.4 * fps], {
  easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp",
});

// (b) Full decaying elastic — UI/diagram accent ONLY (a counter digit landing, a graph marker), never a real hero object
function decayingOvershoot(f: number, start: number, fps: number, finalValue: number, amp = 0.2) {
  const t = Math.max(0, (f - start) / fps);
  const settle = interpolate(f, [start, start + 0.3 * fps], [0, finalValue], {
    easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const decay = Math.exp(-6 * t) * Math.sin(2 * Math.PI * 5 * t) * amp;   // ~ period/damping tuned by eye
  return settle + decay * finalValue;
}
// use on rotation (preferred) or scale of a non-physical UI part only:
const rot = decayingOvershoot(f, wordFrame, fps, targetRad, 0.15);
```
Or use raea's built-in spring for a one-shot version without manual decay math: `spring({ frame: f - f0, fps, config: { damping: 8, stiffness: 120 } })` — raise `damping` toward critical to shrink the visible wobble count.

### Worked example
Topic: "Baki e-wallet lepas isi RM50" (illustrative numbers).
BEFORE: the balance counter jumps straight to "RM50.00" on the word, static.
AFTER (house-safe): `| 6 | "terus masuk, RM50" | macro of phone screen, balance digits | counter rolls to 50.00, settles with a ~4% overshoot over 0.4s on "RM50" | elastic-decaying-overshoot--after-effects-easing-pro |` — a single small settle, not a bouncing chain.
AFTER (diagram-only variant, not Style D hero): a bar-chart marker dot lands on its final value with 2–3 shrinking wobbles, used only on an explanatory diagram overlay, never on the macro object itself.

### Check
- Is the full decaying-wobble version used only on a UI/diagram element, never a real Style D hero object?
- On a hero object, is the overshoot ≤ ~3–5 % and the whole settle ≥ 0.4 s, with at most one small bounce?
- Is the chosen property rotation rather than scale, where the look allows it?
- Does at most one element per beat use this, not the whole frame?

## NOTES
- Visual gaps: exact handle drags in the Graph Editor and the precise decay ratio are shown, not stated in numbers (`~`).
- Rule conflicts: ⚠ the source's full multi-bounce elastic spring directly contradicts the no-bouncy-springs house rule on real
  objects; adapted to (a) a single capped settle for any Style D hero, (b) the full decaying curve reserved for a UI/diagram
  accent layer only. AE Graph Editor mechanics (convert-vertex tool, F9 easy-ease, breaking tangents) are AE-only and have no
  literal raea equivalent — the curve shape itself is what transfers, via `interpolate` multi-stops or `spring`.
