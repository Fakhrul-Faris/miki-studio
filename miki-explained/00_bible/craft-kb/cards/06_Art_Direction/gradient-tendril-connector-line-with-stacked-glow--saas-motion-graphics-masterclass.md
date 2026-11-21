---
title: Gradient tendril line connects hero to a satellite node, revealed by a trim, faked deep glow from stacked glow copies
bucket: 06_Art_Direction
source: "Motion Feel, Easing & Camera Choreography/SaaS Motion Graphics Masterclass Techniques.txt"
source_time: "07:16–16:09"
tool_target: raea
tier: full
use_when: "a diagram beat where the hero links out to 2–4 related ideas/steps (hub-and-spoke: one object, several labelled outcomes)"
style_fit: Fits as the diagram "wire" for Style D's state changes; ⚠ source colours the gradient bright blue/red → adapted: the one brand accent only, muted (never fully saturated, "it will just look a bit cheap").
---

## METADATA
06_Art_Direction | After Effects (pen tool, gradient stroke, Glow, trim paths) → raea animated SVG stroke + Bloom | raea

## CREATIVE_INTENT
A curved line is drawn by hand with the pen tool from the hero shape out to a satellite label, given a **multi-stop
gradient stroke** (white → accent → darker accent, a few extra stops added partway for "a bit of change in color" so
it "will almost shimmer"), then a **Glow** effect duplicated three times at increasing radius (the author's own
words: "this will basically fake a deep glow") with intensity dialled back from the duplicated default so it reads
subtle, not harsh. The line is revealed with **Trim Paths** (end 0→100%, eased) rather than appearing all at once. The
explicit warning: avoid fully saturated color — "if you go for really bright blue or really bright red it will just
look a bit cheap."

## STE_PROCEDURE
1. Draw the connector as one smooth bezier curve from the hub to the satellite label.
2. Give the stroke a gradient with 3–4 stops (not 2): a light stop, the accent, and a darker accent stop, for shimmer.
3. Keep every stop desaturated/muted — never a fully saturated primary color.
4. Reveal the line with a 0→100% trim on its end point, eased, not an instant draw.
5. Fake a deep glow by stacking the same glow 2–3 times at increasing radius (e.g. 50 / 100 / 150), then turn each
   copy's intensity down until the stack reads soft, not blown out.
6. Place the glow stack below the line's own shape layer so it doesn't wash out the stroke.

## AGENT_EXECUTION
raea: an SVG `<path>` with a `linearGradient` (3–4 `<stop>`s) stroke, revealed via `strokeDasharray`/`strokeDashoffset`
keyed by an eased `t`; the "stacked glow" fake is just raea's own `<Bloom>` (one real bloom pass, not three duplicated
glows) tuned low, per `masters/05_Camera_Raea_Pipeline/glow-bloom.md` (`threshold` 0.85–0.9, `intensity` 0.15–0.3).
```tsx
const t = k(f, a, a + 20, Easing.inOut(Easing.cubic));
const L = pathLength(d);
<path d={d} stroke="url(#tendril)" strokeWidth={3}
  strokeDasharray={L} strokeDashoffset={L * (1 - t)} fill="none" />
<linearGradient id="tendril">
  <stop offset="0%" stopColor="#ffffff" stopOpacity={0.6} />
  <stop offset="55%" stopColor={ACCENT} />
  <stop offset="100%" stopColor={ACCENT_DARK} />
</linearGradient>
```

### Worked example
Topic: one "resit" (receipt) icon links out to three things it proves — harga, GST, tarikh (illustrative figures).
- BEFORE: three labels just appear next to the receipt with no visual link.
- AFTER: on "bukti ada tiga", three muted-accent gradient tendrils draw outward from the receipt's edge over ~0.6 s
  each, a soft bloom sitting under each line, landing on "harga", "GST" and "tarikh" as they label in.

### Check
- Does the line reveal by drawing (trim), never pop in whole?
- Are all gradient stops muted, none fully saturated?
- Is the glow one restrained bloom pass, not a blown-out stack?

## NOTES
- Visual gaps: exact gradient-stop positions and glow radius/intensity values are "something like this" on screen —
  not recoverable; values given are the spoken anchors only.
- AE dropped: pen-tool hand-drawn bezier, Glow effect ×3 duplicated-and-detuned, CC Light Sweep used on the hub shape
  at the point the line touches it (comp-space effect, breaks when the shape is duplicated elsewhere — not carried
  over; see raea's single `<Bloom>` instead).
