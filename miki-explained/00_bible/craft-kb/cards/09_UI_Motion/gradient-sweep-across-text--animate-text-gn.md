---
title: Gradient sweep across text (low-scale wave gradient, animated phase, on/off toggle)
bucket: 09_UI_Motion
source: "Procedural Mograph & 3D-to-AI Render Passes/How to Animate Text in blender 4.4 | geometry nodes.txt"
source_time: "03:40–04:40"
tool_target: raea
tier: principle
use_when: "one key label (the RM result, the step number) needs a little life while it holds on screen"
style_fit: "⚠ house rule one accent colour → adapted: gradient runs between the accent and a lighter tint of it (or white), never two hues; sweep slow and eased, once per hold, never a looping shimmer."
---

## METADATA
09_UI_Motion | Blender 4.4 GN Store Named Attribute + Wave Texture | → raea CSS gradient on text (verify) or Text3D emissive

## CREATIVE_INTENT
"This gradient effect … just adds some life to the text." A Wave Texture at a very low scale stops repeating and becomes
a single gradient; animating its **phase offset** slides the gradient across the letters. Three stored attributes drive
it: the second colour, a Boolean "use gradient?" (usually off) and the gradient offset.

## STE_PROCEDURE
1. Before using it, decide if the label earns it (source: "usually we won't need a gradient"); default off.
2. Pick two colours: the accent and a lighter tint of it.
3. Make a gradient wider than the text (source: Wave Texture scale lowered until it stops repeating).
4. Animate the gradient position (phase offset) across the text once, slowly.
5. Gate it with a toggle so the plain colour is the default.

## AGENT_EXECUTION
**raea** (CSS on a 2D layer; confirm `background-clip: text` renders in raea on a still first):
```tsx
const sweep = interpolate(f, [t0, t0 + 45], [100, 0], { easing: Easing.inOut(Easing.sin), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const useGradient = true;
<span style={useGradient ? {
  backgroundImage: "linear-gradient(90deg, #57D100 0%, #B8F27A 50%, #57D100 100%)",
  backgroundSize: "200% 100%", backgroundPosition: `${sweep}% 0`,
  WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
} : { color: "#57D100" }}>RM1,200</span>
```
Fallback if clip-to-text fails: `Text3D` with `emissive` interpolated between the two colours over the hold. Colours are
an example accent (`GREEN` in kit/clay.tsx); use the episode's accent.

### Worked example
BEFORE: `| 9 | "untung RM1,200 sebulan" | top-down on the ledger | "RM1,200" holds 3 s, static | — |`
AFTER: `| 9 | "untung RM1,200 sebulan" | top-down on the ledger | "RM1,200" (accent) fades in 0.4 s, then one 1.5 s eased light sweep accent → tint → accent across it while it holds | gradient-sweep-across-text--animate-text-gn |`

### Check
- Only one hue (accent + its tint)?
- One slow sweep (≥ ~1 s), not a loop?
- Used on one label per setup at most?

## NOTES
- Visual gaps: wave scale, colours and the Mix wiring are visual only.
- Blender chain (reference): Wave Texture (low scale, Phase Offset ← attribute) → Mix(colour A, colour B) → Mix(plain, gradient, Fac ← Boolean attribute) → Emission.
