---
title: Post-production concealment (pixelation / blur) as a storytelling device
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/100 Art Direction Ideas - Build Your Creative Toolkit.txt"
source_time: "23:04–23:31"
tool_target: frame-brief
tier: full
use_when: "a line implies something is hidden, redacted, or deliberately unclear, and a plain object shot won't carry that"
style_fit: "⚠ generated/comped imagery is reference-only in our pipeline → adapted: the concealment effect must be built as a real in-scene or raea post effect (a Grade/mask), not an AI-generated composite."
---

## METADATA
06_Art_Direction | brand/photo art-direction talk (pixelated-car photo reference) | post-production device

## CREATIVE_INTENT
A simple photo becomes a story the instant one area is visibly concealed — pixelating a car in an otherwise plain shot
tells the viewer "something's happening here" without showing it. The device works because concealment implies meaning
the eye fills in; it's a cheap, single-step addition to an otherwise ordinary frame.

## STE_PROCEDURE
1. Identify the line that implies something hidden, redacted, unclear, or "not shown yet" (a number withheld, an identity hidden, a surprise reveal coming later).
2. Choose the smallest area that needs concealing (one object, one number, one face-equivalent detail) — not the whole frame.
3. Apply a visible, obviously-artificial concealment (pixelation, a solid block, a heavy blur) rather than hiding it off-frame.
4. Keep everything else in the shot sharp and normal, so the concealment reads as deliberate, not a technical fault.
5. Pay it off later in the sequence by revealing what was concealed, timed to the line that explains it.
6. Check: does the concealment itself raise a question the next beat answers?

## AGENT_EXECUTION
Frame-brief "Not generic because": name what's concealed and when it pays off. Build the effect as a real raea post
pass (a pixelation/blur region tied to the object, animated open on the reveal line), never as an AI-generated image
with the detail already removed.

```tsx
<Grade pixelate={{ region: priceTagRect, size: hideAmount }} />  {/* hideAmount: 1 at setup, eased to 0 on the reveal word */}
```

### Worked example
Topic: a mechanic's hidden "extra parts" line item on a repair bill (illustrative).
BEFORE: the full repair bill is shown clearly from the first frame.
AFTER: the bill is shown with one line pixelated from the start; on the words "ada caj tersembunyi", the pixelation
clears to reveal the hidden charge.

### Check
- Is only the specific hidden detail concealed, not the whole frame?
- Does the concealment pay off on a specific later line, not left unresolved?
- Is the effect built as a real raea/in-scene mask, never an AI-generated "already redacted" image?

## NOTES
- Visual gaps: the pixelated-car reference image's exact styling is visual only.
- Rule conflicts: the source's broader examples include AI-comped/generated backgrounds presented as finished shots — our pipeline treats any generated image as a mood reference only, never finished footage; this card keeps strictly to the pixelation/concealment device itself, built as a real effect.
