---
title: Hub-and-spoke diagram — build one spoke fully, then mirror/duplicate for the rest, staggered
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/SaaS Motion Graphics Masterclass Techniques.txt"
source_time: "16:09–23:24"
tool_target: raea
tier: principle
use_when: "a hub object branches into 3–4 labelled outcomes (ID, hooks, titles, structure; or steps/benefits) — build efficiency and a guaranteed-symmetric result"
style_fit: Fits Style D state-change beats; keep each spoke's reveal inside the on-screen-event-every-second rhythm — never animate all spokes at once.
---

## METADATA
09_UI_Motion | After Effects (duplicate, flip horizontal, relink to null) → raea component reuse | shot-list + raea

## CREATIVE_INTENT
Rather than hand-build four matching line+node+label groups, build **one** complete spoke (line, glow, node shape,
label) to final quality, then duplicate it, flip it horizontally for the mirrored side, drag it to a new position and
swap only its label text — repeating until all spokes exist. Each spoke's null/position keys are then staggered in
sequence (first spoke moves, then the next starts before the first is fully settled, "once this button is not even
done yet, I already want to start the next animation") so the hub appears to "grow" its spokes one after another
rather than all popping at once.

## STE_PROCEDURE
1. Build and fully polish one spoke (line + glow + node + label) before duplicating anything.
2. Duplicate the finished spoke; use a horizontal flip for the mirror side instead of re-drawing.
3. Reposition each duplicate by holding the constrain-to-axis key so spokes stay aligned on a shared grid.
4. Swap only the label text per duplicate; keep every other property identical.
5. Order the reveal: start spoke 1, then start spoke 2 before spoke 1's move fully settles, then 3, then 4 — a
   continuous cascade, not four simultaneous pops.
6. Re-check alignment with a ruler or by eye against a shared edge (e.g. the window's top) once all spokes exist.

## AGENT_EXECUTION
raea: write one `Spoke` component (line + node + label) parameterised by `angle`/`flip`/`label`/`delay`; instantiate it
4× rather than hand-authoring each one, and stagger each instance's entrance off the previous one's delay so the reveal
reads as a continuous cascade (pairs with `masters/01_Animation_Motion/drag-overlap-chain.md`'s offset-cascade idiom).
```tsx
const Spoke = ({ angle, flip, label, delay }: SpokeProps) => {
  const t = k(f - delay, 0, 18, Easing.out(Easing.cubic));
  return <g transform={`translate(${cx},${cy}) rotate(${angle}) scale(${flip ? -1 : 1},1)`}>
    <TendrilLine t={t} /><Node t={t} /><Label text={label} t={t} />
  </g>;
};
{SPOKES.map((s, i) => <Spoke key={i} {...s} delay={i * 6} />)}   {/* next spoke starts ~0.2 s before the prior settles */}
```

### Worked example
Topic: a kedai runcit's one POS terminal feeds three things — stok, jualan, untung (illustrative labels/numbers).
- BEFORE: three labels fade in together next to the terminal.
- AFTER: the terminal's three tendrils draw out one after another (stok, then jualan starting before stok settles,
  then untung), each ending on its own labelled node — a single continuous cascade, not three pops.

### Check
- Is only one spoke hand-built, the rest reused/mirrored?
- Do later spokes start before the earlier one fully settles (continuous, not simultaneous)?
- Are all spokes on the same visual grid (aligned)?

## NOTES
- raea check (2026-11-21): `<Label>`, `<TendrilLine>` in the code above are stand-ins for a component the episode builds (from raea primitives such as `Cuboid`, `ImagePlane`, `Text3D`), not a raea built-in. Define it before use.
- Visual gaps: exact duplicate offsets and the "around 3 seconds" start times are on-screen drags — not recoverable;
  only the ordering and the overlap principle are spoken clearly.
- Overlap with set1: the per-spoke stagger is the same family as `masters/01_Animation_Motion/drag-overlap-chain.md`
  (offset cascade) and `cards/01_Animation_Motion/staggered-pop-in-sequence--…md` — no new timing values beyond
  "offset a bit, then a bit more"; carded here only for the build-once-mirror workflow, which those cards don't cover.
