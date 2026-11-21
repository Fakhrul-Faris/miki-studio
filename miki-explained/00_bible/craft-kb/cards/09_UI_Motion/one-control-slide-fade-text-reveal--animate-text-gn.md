---
title: One-control slide + fade text reveal (axis switch, sign flip, curve-shaped opacity)
bucket: 09_UI_Motion
source: "Procedural Mograph & 3D-to-AI Render Passes/How to Animate Text in blender 4.4 | geometry nodes.txt"
source_time: "00:00–03:40"
tool_target: raea
tier: principle
use_when: "an on-screen label or RM number enters/leaves a setup (not subtitles)"
style_fit: "Fits house motion: clean text, slide + fade over ~0.4 s, eased, no pop. Captions stay EX15 capBlock; this is for kinetic labels/numbers only."
---

## METADATA
09_UI_Motion | Blender 4.4 Geometry Nodes + shader | → raea 2D text layer (interpolate + Easing)

## CREATIVE_INTENT
"Text is meant to be read, not to overwhelm people" — so: clean animated text driven by **one offset value**. The offset
moves the text along one axis (a Menu Switch picks X or Y; a negative offset flips direction) and the same value drives
opacity through a stored attribute, reshaped by a Float Curve so the fade's speed can be tuned independently.

## STE_PROCEDURE
1. Define one control value per label: `p` from 0 (hidden) to 1 (placed).
2. Pick the axis: vertical (Y) or horizontal (X); never diagonal (source limits it by multiplying with (0,1,0)).
3. Set position = (1 − p) × offset along that axis; a negative offset flips the entry side.
4. Set opacity = curve(p): a Float-Curve-style ease so the text is mostly visible before it stops moving.
5. Optionally drive the label's colour from the same control (source: second stored attribute, Color type).
6. Run the reverse (p 1 → 0) for the exit, same axis.

## AGENT_EXECUTION
**raea** (2D layer over the 3D canvas; ~0.4 s = 12 f at 30 fps / 24 f at 60 fps):
```tsx
const p = interpolate(f, [t0, t0 + 12], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const axis: "x" | "y" = "y"; const offset = -40;            // px; negative flips direction
const d = (1 - p) * offset;
const opacity = Easing.out(Easing.quad)(p);                  // the "float curve": fade leads the move
<div style={{ transform: axis === "y" ? `translateY(${d}px)` : `translateX(${d}px)`, opacity }}>RM30</div>
```
Durations in the source are visual only; the 0.4 s / 40 px values are house defaults (`~`).

### Worked example
BEFORE: `| 3 | "RM30 seminggu" | macro on the receipt | "RM30" pops on | — |`
AFTER: `| 3 | "RM30 seminggu" | macro on the receipt | on "RM30" the label rises 40 px into place over 0.4 s, fully opaque by 60 % of the move; exits downward with the next setup | one-control-slide-fade-text-reveal--animate-text-gn |`

### Check
- One axis only, eased in-out, ~0.4 s?
- Is opacity shaped so the text is readable before it stops?
- Is it a label/number, not a subtitle?

## NOTES
- Visual gaps: exact node socket wiring (00:00–01:32) and shader node graph (02:17–03:40) are visual only; float-curve shape unknown.
- Blender build: Set Position (offset = Mix(…) × Menu Switch vector), Store Named Attribute (opacity, colour) → material Mix Shader(Transparent, Emission) — use only for 3D Text3D-like labels baked in Blender; raea renders the 2D version.
