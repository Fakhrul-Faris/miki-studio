---
title: 3D hero entrance — tilt toward camera on one rotation axis, stop short of flat
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/SaaS Motion Graphics Masterclass Techniques.txt"
source_time: "00:33–05:30"
tool_target: raea
tier: full
use_when: "the hero object/button/card's first arrival (frame-0 or L01) in a UI-heavy scene — the 'nice big moment'"
style_fit: Fits — one eased move on real UI geometry; ⚠ source then adds a bounce expression to the same move → dropped (no bouncy springs); keep the single tilt-and-settle, no oscillation.
---

## METADATA
09_UI_Motion | After Effects (Classic 3D, parented layers) → raea `Transform` + `Entity` nesting | raea

## CREATIVE_INTENT
A hero button (with its icon/text parented to it) is made 3D and flown toward camera as the opening "hook" moment: the
shape moves toward the camera and down while rotating on **one axis only** (X). The key choice is to **not** let the
rotation finish flat — "I always like to do is not make it completely flat, but just have it something like this. So
there's a bit of rotation but not too much" — the object settles holding a few degrees of tilt, which keeps it feeling
dimensional instead of collapsing into a flat card. Icon and text are parented so they inherit the move for free, then
get their own small pop-ins afterward.

## STE_PROCEDURE
1. Parent all child elements (icon, label) to the hero shape's position and rotation before animating.
2. Animate position on one straight path: toward the camera (Z) and slightly down, nothing more.
3. Animate rotation on **one axis only** (X); do not add a second rotation axis.
4. End the rotation key short of 0° — leave a residual few degrees of tilt, never a flat finish.
5. Ease both tracks (fast out, settle); drag the graph-editor end handle left for a softer landing.
6. Pop the icon/text in afterward, offset a few frames behind the shape's settle.

## AGENT_EXECUTION
raea: nest icon/text as children of the hero `Entity` so they inherit its transform; animate `rotateX` only, hold the
settle value above 0.
```tsx
const t = k(f, 0, 36, Easing.out(Easing.cubic));           // ~1.2 s @30fps
const tilt = lerp(0.32, 0.07, t);                           // settle at ~4°, never 0
<Entity transform={Transform
  .fromXyz(0, lerp(0.9, 0.55, t), lerp(-1.4, -0.35, t))     // toward camera + down
  .withRotation(Quat.fromEuler("XYZ", tilt, 0, 0))}>
  <Mesh3d name="hero-card">…</Mesh3d>
  {/* icon/text as children, inherit the transform; their own pop-in cued a few frames later */}
</Entity>
```

### Worked example
Topic: a "Bayar" pay button is the frame-0 hero for a QR-payment how-to (illustrative RM amount).
- BEFORE: the button fades in flat and static.
- AFTER: the button flies toward camera and down over ~1.2 s, tilting on X only; it settles holding a slight ~4° tilt
  (not flat), then the "Bayar" label and icon pop in a few frames later.

### Check
- Is only one rotation axis animated?
- Does the rotation settle above 0° (residual tilt), never fully flat?
- Is there no bounce/oscillation on the settle?

## NOTES
- Visual gaps: exact position/rotation drag distances are "something like this" on screen — not recoverable; values
  above are illustrative targets, marked `~`.
- AE dropped: Classic 3D renderer, null-free direct parenting; translated to raea `Entity` nesting.
- Rule conflict: source adds a bounce (inertia) expression to the icon/text scale pop that follows — dropped per the
  house no-bounce rule (see `addenda/scale-in-appear--apple-style-ui-face-id.md` for the capped-overshoot treatment).
