---
title: Zoom-through text swap — a 70–80 % in/out ease makes a sharp speed peak, both lines scale on it, cut at the peak
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Cleanest Match-Cut Transition for SaaS.txt"
source_time: "02:52–05:05"
tool_target: raea
tier: full
use_when: "UI-heavy scenes: one on-screen line hands over to the next (step title → step title, claim → RM number) inside ~0.7 s"
style_fit: "Fits: no dissolve or wipe, the swap is hidden inside one eased scale move; slow ends (~0.3 s each) keep it calm. ⚠ not for EX15 captions (never restyle) — only designed on-screen lines/labels."
---

## METADATA
09_UI_Motion | DaVinci Resolve Fusion (source) → raea 2D layer `interpolate` + `Easing.bezier` | raea / HyperFrames

## CREATIVE_INTENT
The "smooth, seamless match cut … always used in SaaS explainers and premium motion graphics". Line 1 shrinks; line 2
also scales on the same frames (starting larger, "a zoom-out animation as well"); both curves are made into a "sharp
peak" — in/out values ~70–80 each, "very slow at the beginning and ending but really fast in mid, and that's where we'll
make the cut". Motion blur on every animated layer makes it "even smoother".

## STE_PROCEDURE
1. A few frames before line 1's entrance finishes, key line 1's size (start of the swap).
2. ~20 frames later, key line 1's size much smaller ("decrease the size by a lot").
3. Smooth both keys, then set in and out influence to ~70–80 % each (sharp peak).
4. Key line 2's size on the same two frames: first key larger than final, last key = final size.
5. Give line 2 the same 70–80 % curve.
6. Go to the middle frame (fastest point); end line 1 there and start line 2 there.
7. Enable motion blur on every animated layer.

## AGENT_EXECUTION
raea 2D (page elements over the 3D, on an opaque panel per scene.md):
```tsx
const S = 90, E = 110;                                     // ~20 f window @30 fps; CUT = 100
const sharp = Easing.bezier(0.75, 0, 0.25, 1);            // ~ 75 % influence each side (Fusion 70–80)
const p = interpolate(f, [S, E], [0, 1], { easing: sharp, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const CUT = (S + E) / 2;
const s1 = lerp(1, 0.15, p);                               // line 1 shrinks "by a lot"
const s2 = lerp(2.2, 1, p);                                // ~ line 2 starts bigger, lands at 1
return f < CUT
  ? <div style={{ transform: `scale(${s1})` }}>Harga asal RM100</div>
  : <div style={{ transform: `scale(${s2})` }}>Diskaun 30 %</div>;
```
For a 3D label, add `<MotionBlur shutterAngle={0.5} />` over the cut frames; for 2D text, a 2–3 frame directional blur
is the equivalent (HyperFrames CSS `filter: blur()` scaled by speed).

### Worked example
Topic: "Sale 70 % — betul ke murah?" (S16 how-to, numbers illustrative).
- BEFORE: line "Harga asal RM100" fades out, then "Lepas diskaun RM70" fades in (two separate 0.4 s fades, dead air between).
- AFTER: on "lepas", "Harga asal RM100" shrinks toward the price tag on a 75 % ease; at the peak frame it cuts to
  "RM70" arriving from 2.2× scale and settling on "tujuh puluh" — one gesture, 0.67 s.

### Check
- Are both lines keyed on the same frames with the same sharp curve?
- Does the incoming line start larger than final (or the outgoing end smaller) so scale direction matches?
- Is the cut on the middle frame?
- Is this an on-screen designed line, not a caption?

## NOTES
- Fusion steps dropped: Transform node, Spline Editor S (smooth) + T (in/out values), Merge-node keyframe-panel trim with a dummy key to activate it → raea conditional render at `CUT`.
- `Easing.bezier(0.75, 0, 0.25, 1)` is an approximation of 75 % influence (`~`); verify the peak visually.
- Fusion "decrease the size by a lot" has no number; 0.15 and 2.2 are inferred (`~`).
