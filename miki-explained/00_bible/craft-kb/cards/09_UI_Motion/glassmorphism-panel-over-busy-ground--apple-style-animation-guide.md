---
title: Glassmorphism panel — background blur plus a white overlay stroke at ~30 %, only over a busy background
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Apple Style Animation Guide.txt"
source_time: "04:42–05:12"
tool_target: raea
tier: principle
use_when: "a UI card floating over a photo/3D scene (e.g. a price card over the macro hero's blurred background)"
style_fit: Fits when the panel sits over the 3D scene (busy ground); never over the hero's focal point (no text over the hero).
---

## METADATA
09_UI_Motion | After Effects (source) → raea `backdropFilter` | raea

## CREATIVE_INTENT
Shape layer in adjustment-layer mode with Fast Box Blur (radius to taste); duplicate it, disable fill, add a white
stroke, turn off adjustment mode and blur, blend Overlay, opacity ~30 % — "a nice border"; link the stroke to the main
shape. "Works best when there's a cool background, since technically it's only blur. On a solid background it'll basically
just be transparent."

## STE_PROCEDURE
1. Only use glass when the panel sits over a detailed background.
2. Blur what is behind the panel (radius to taste).
3. Add a thin white border at ~30 % opacity, overlay blend.
4. Keep border and panel locked together.
5. Check the text on the panel still reads at phone size.

## AGENT_EXECUTION
raea: `<div style={{ backdropFilter: "blur(24px)", background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.3)",
borderRadius: 32, mixBlendMode: "normal" }}>` over the 3D layer (3D background is transparent so 2D over it works,
raea-bevy scene.md). Supported per raea sdk-coverage (`backdrop-filter`, `mix-blend-mode`); verify on a still.

### Worked example
Topic: the cost of a RM5 teh tarik habit — RM5 × 22 work days = RM110 a month (arithmetic, illustrative price).
- BEFORE: an opaque white card covers half the macro shot of the glass.
- AFTER: a glass card sits in the lower third over the blurred kopitiam background; "RM110 sebulan" reads clearly while
  the cup stays sharp above.

### Check
- Is there detail behind the panel for the blur to show?
- Is the border ≤ ~30 % white?
- Is the hero clear of the panel?

## NOTES
- Visual gaps: blur radius "to your liking" — unknown.
