---
title: Loop a gradient (or any ambient background value) with a time-driven phase offset
bucket: 06_Art_Direction
type: master
members:
  - cards/06_Art_Direction/animate-gradient-phase-seamless-loop--pick-colors-blender.md
  - cards/06_Art_Direction/infinite-colour-cycling-gradient-blob--motion-explainer-3-scenes-part2.md
sources: ["Do This Next Time You Pick Colors for Your Art (Blender Tutorial).txt", "Motion Explainer Ads Masterclass | 3 Different Scenes | Part 2.txt"]
use_when: "a background/backdrop gradient needs to drift or cycle forever without a visible seam"
style_fit: "Background motion only, never the camera or hero object; keep the cycle slow/subtle and restrict colours to neutral + the one brand accent (⚠ source 2's 3-arbitrary-hue sweep breaks the one-accent rule)."
---

## METADATA
06_Art_Direction | Blender Wave Texture phase (geometry nodes) / After Effects gradient ramp + time-expression | raea interpolate / shader-equivalent uniform on a background layer

## CREATIVE_INTENT
A background value (a texture's phase, a gradient's stop position) can be driven continuously by a periodic function
so it never looks static but also never visibly jumps or resets at a loop point.
- Pick colors adds: a Wave Texture phase keyframed from 0 to exactly `2*pi` over the clip length — because sine is
  periodic, frame 1 and the final frame are identical, so the loop point is invisible.
- Motion Explainer Ads adds: instead of a fixed loop length, drive the gradient's phase continuously from `time * N`
  (no keyed start/end) for a backdrop that just drifts for as long as the card holds, plus a soft inner-glow duplicate
  layered on top for depth.

## STE_PROCEDURE
1. Identify the moving background element (gradient stop, texture phase, ambient wash) — never the camera or hero object.
2. Choose the drive method for the shot's length:
   - **Fixed-length loop** (e.g. a looping backdrop clip): keyframe the phase from `0` at frame 1 to exactly one full
     period (`2 * pi`) at the final frame.
   - **Open-ended hold** (e.g. a title card held an unknown length): drive the phase continuously from `f / fps * N`
     with no keyed end; it never needs to "complete" a loop because the viewer never sees the seam.
3. Feed the phase into a periodic function (`sin`/`cos`), not a raw position — a literal 0→2π position would itself jump.
4. Restrict the colour field to neutral + the one brand accent (⚠ adapted: drop any arbitrary second/third hue).
5. Keep the drift slow enough to read as ambient, not an obvious animated loop the eye tracks.
6. Optionally layer a soft inner-glow duplicate behind the subject (blend mode overlay/lighten) for depth.
7. Play back and confirm the loop point (fixed-length case) or the overall motion (open-ended case) never pops/jumps.

## VALUES BY SOURCE
| parameter | Pick colors (Blender) | Motion Explainer Ads (AE) | recommended for Style D (+ why) |
|---|---|---|---|
| Drive method | keyframed phase, 0 → 2π over 300 frames | continuous `time * N` on the gradient phase, no keyed end | continuous `f/fps * N` for open-ended holds; keyed 0→2π for a fixed-length clip |
| Colour count | n/a (single texture, not a colour sweep) | 3 arbitrary hues (orange/pink/blue) cycling freely | neutral + one brand accent only (⚠ adapted from source 2) |
| Extra layers | none | masked inner-glow duplicate, blend overlay/lighten | optional soft glow duplicate for depth, kept subtle |
| Target | per-instance Z/position fed by Wave Texture phase | radial gradient stop offset | raea gradient stop offset or a sine-driven uniform |

## AGENT_EXECUTION
Fixed-length loop (feeds a periodic function, never a raw position):
```tsx
const phase = interpolate(f, [0, 300], [0, 2 * Math.PI]);   // loops because sin(phase) at f=0 === sin(phase) at f=300
const drift = Math.sin(phase) * AMPLITUDE;
```
Open-ended ambient drift (no keyed end; restricted to neutral + accent):
```tsx
const phase = (f / 30) * 0.05;                       // slow continuous drift, ~0.05 cycles/s
<radialGradient id="bg">
  <stop offset={`${(phase * 100) % 100}%`} stopColor={C.accent} />
  <stop offset="100%" stopColor="#111" />
</radialGradient>
```

### Worked example
Topic: a title card opening an episode about a kedai runcit's daily float (illustrative).
BEFORE: a flat dark background sits still under the hook text, or a looping wash that visibly jumps every cycle.
AFTER: a slow accent-coloured glow drifts behind the hook text, driven by `f/fps*N` into the gradient's stop offset —
it never settles, never distracts from the text, and (because it's open-ended, not keyed to a fixed loop length) has
no seam to hide.

### Check
- Is the driving value periodic (sin/cos of a phase, or a continuously advancing offset), not a raw position that would jump?
- For a fixed-length loop, does the end keyframe sit at exactly one full period from the start?
- Is the cycling field restricted to neutral + one brand accent, never an arbitrary multi-hue sweep?
- Does the field stay behind the subject, never crossing over text or the hero, and read as ambient rather than an obvious loop?

## NOTES
- Deprecated: none.
- Visual gaps: exact original hue values and phase speed (source 2) are visual only.
- Rule conflicts: source 2's 3-arbitrary-hue sweep breaks the one-accent rule — adapted to neutral + accent. AE's
  Gradient Ramp + colour-remap + Deep Glow dropped — translated to an SVG radial gradient with a driven stop offset
  and a raea `<Bloom>` pass.
