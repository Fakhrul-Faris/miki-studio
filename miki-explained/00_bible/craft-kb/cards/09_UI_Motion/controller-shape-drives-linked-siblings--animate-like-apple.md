---
title: One controller shape drives every linked sibling (stroke, shadow, glow) — animate the source once
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/Animate Like Apple After Effects.txt"
source_time: "06:00–08:30 (property links), 08:30–09:30 (duplicate keeps links), 17:40–19:40 (path + position links), 24:19–24:33 (parent-and-link only)"
tool_target: raea
tier: full
use_when: "a shape that has a stroke/shadow/glow built as separate duplicate layers needs to morph, move or resize — the agent must decide whether every sibling updates automatically or has to be re-authored by hand"
style_fit: "Fits directly — raea's shared-state model is this exact pattern made structural; translate as one source-of-truth value, never duplicate the morph math per layer."
---

## METADATA
09_UI_Motion | After Effects (pick-whip property links + parent-and-link) → raea shared props/derived style | raea

## CREATIVE_INTENT
Instead of animating a shape's stroke and drop-shadow duplicates separately (and the two drifting out of sync the moment
the main shape is retouched), the author designates the main shape as the **controller**: its path, size, position and
roundness are pick-whip-linked from the stroke and shadow layers, so moving/morphing the controller moves all of them
automatically ("the main shape layer acts as our controller… the stroke follows with the values it's been linked to").
Property links survive duplication — copy the controller's whole glass/stroke/shadow stack and the links stay intact.
Property links alone do **not** move a layer if its parent position changes — for that, the stroke and shadow layers are
additionally parented to the controller via parent-and-link, so moving the controller moves the whole stack as one object.

## STE_PROCEDURE
1. Pick one shape as the controller before building any siblings from it.
2. Author every visual variant (stroke, shadow, glow, mask) as a **read** of the controller's state, not a parallel animation.
3. If a property changes shape/size (path, width, height, roundness), derive the sibling's matching property from the same source value.
4. If the controller's position/transform moves, parent the siblings to it so they move as one object (position does not follow from a shape-property link).
5. When duplicating the whole stack for a new instance (a second button, a second card), keep the derivation live — never hard-code the copied values.

## AGENT_EXECUTION
raea: this is a one-line translation of the AE workflow into normal React state — compute the controller's values once
per frame and pass them to every sibling:
```tsx
const w = interpolate(f, [a, a + 14], [120, 520], { ...CL, easing: out });   // controller width
const h = interpolate(f, [a + 3, a + 17], [120, 140], { ...CL, easing: out });
const r = Math.min(w, h) / 2;
<div style={{ transform: `translate(${x}px,${y}px)` }}>                      {/* parent transform = "parent and link" */}
  <div style={{ width: w, height: h, borderRadius: r, background: C.accent }} />           {/* fill */}
  <div style={{ width: w, height: h, borderRadius: r, border: "2px solid #fff", opacity: .5, mixBlendMode: "overlay" }} />  {/* stroke, derived */}
  <div style={{ width: w, height: h, borderRadius: r, filter: "blur(18px)", opacity: .3, transform: "translateY(6px)" }} /> {/* shadow, derived */}
</div>
```
Shot/frame-brief note: when a frame brief calls for "a glass pill that morphs", write ONE size/path spec in the brief,
not three — the stroke/shadow/glow are always "same as the pill, derived."

### Worked example
Topic: a QR code card on a phone growing to confirm a RM12.80 payment (illustrative amount).
- BEFORE: the card's fill, its white rim and its shadow are animated with three separate keyframe sets — on a late script
  change to the card's size, only the fill is resized and the rim/shadow look detached.
- AFTER: the card's `width`/`height`/`borderRadius` are the single source; rim and shadow read the same three values every
  frame, so resizing the card (a script edit, a different device mock) moves all three together with zero extra work.

### Check
- Is there exactly one place where the shape's size/path/position is authored?
- Do the stroke/shadow/glow read that value, rather than keeping their own copy?
- If the controller moves (not just resizes), are the siblings parented to it, not just property-linked?
- Does duplicating the whole group for a second instance keep every sibling deriving from its own local controller?

## NOTES
- Visual gaps: none — this is a structural/workflow technique, fully recoverable from speech.
- AE dropped: pick-whip property links and parent-and-link (AE-only UI gestures) — translated to shared React state /
  props, which is the native raea equivalent and strictly simpler.
- Distinct from the glass material itself — see `liquid-glass-refraction-recipe--animate-like-apple.md` for the look
  this controller pattern is usually driving.
