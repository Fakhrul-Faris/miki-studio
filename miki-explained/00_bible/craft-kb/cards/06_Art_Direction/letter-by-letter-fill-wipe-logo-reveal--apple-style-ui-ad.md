---
title: Letter-by-letter fill-wipe logo reveal — a coloured wipe fills each letter inside a logo-shaped mask
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/How To Create Apple Style UI Ad in After Effects | For Beginners | +01 Hour Masterclass.txt"
source_time: "59:52–1:03:42"
tool_target: raea
tier: full
use_when: "the outro/end-card logo reveal — or any moment the real brand name/logo needs to feel like it's being built, not just faded in"
style_fit: Fits the brand-logo-first rule directly — gives the real logo a built, on-brand reveal rather than a generic fade/pop; keep it to the one brand accent colour.
---

## METADATA
06_Art_Direction | After Effects (Wave Warp inside a track-matte logo mask, then per-letter mask + bounce stagger) → raea clip-path fill wipe | raea

## CREATIVE_INTENT
The logotype's letters are each masked out individually (pen tool, one mask per letter). A solid shape in the brand
colour is given a Wave Warp (so its top edge ripples rather than being a flat line) and keyed to rise and "fill" the
logo's silhouette from the bottom up, track-matted to only show inside each letter's mask. Letters are then staggered so
they fill one after another (position/rotation/scale keyed with a bounce-decay expression, sequenced a few frames apart)
rather than all at once, and the fill colour itself is keyed (block colour → final brand colour) as it completes.

## STE_PROCEDURE
1. Mask each letter/glyph of the logotype separately (not one mask for the whole word).
2. Build a rising fill shape in the brand colour with a rippled (not flat) top edge.
3. Track-matte the fill to show only inside each letter's own mask.
4. Key the fill's rise so it completes inside each letter at a slightly staggered time (one letter, then the next).
5. Key the fill's colour from a neutral block tone to the final brand colour as it completes inside each letter.
6. Cap the per-letter settle motion — small scale/position only, no springy overshoot beyond the house limit.

## AGENT_EXECUTION
Shot-list row: `| end | "Meikigo" wordmark | outro card | each letter fills bottom-up with the brand accent, staggered | this card`.
raea: per-letter `<clipPath>` with an animated rect/wave rising inside it, staggered start per letter index:
```tsx
{letters.map((ch, i) => {
  const t = k(f, outroStart + i * 3, 16, out);                 // 3-frame stagger per letter
  return (
    <g key={i} clipPath={`url(#letter-${i})`}>
      <rect x={0} y={lerp(letterH, 0, t)} width={letterW} height={letterH}
        fill={lerpColor("#444", C.accent, t)} />
    </g>
  );
})}
```

### Worked example
Topic: Meikigo end card closing an episode (real brand wordmark).
- BEFORE: the logo fades in flat and whole — no sense of being built.
- AFTER: each letter of "Meikigo" fills bottom-up in the brand accent, one letter settling just before the next starts,
  landing on the loop-back to frame 0's object exactly as the last letter completes.

### Check
- Is each letter masked and filled individually, with a small stagger between letters?
- Does the fill land in the single brand accent, not a generic white-to-colour wipe?
- Is any settle motion capped within the house overshoot limit (no springy bounce)?

## NOTES
- Visual gaps: exact per-letter mask paths and stagger-frame counts are visual only, marked `~`.
- AE dropped: Wave Warp (used only for the organic rippled edge of the rising fill) — translated to an SVG wave path or a
  simple sine-offset on the rect's top edge if the ripple is wanted; the bounce-decay expression is capped per house rule
  (see addendum `addenda/scale-in-appear--apple-style-ui-face-id.md` for the capped-decay value already catalogued).
