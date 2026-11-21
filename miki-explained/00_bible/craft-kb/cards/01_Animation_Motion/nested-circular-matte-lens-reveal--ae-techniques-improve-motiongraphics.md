---
title: Nested circular-matte lens reveal (two cancelling circles reveal a hidden layer as a focus ring)
bucket: 01_Animation_Motion
source: "Procedural Mograph & 3D-to-AI Render Passes/after effects techniques to improve any motiongraphics project.txt"
source_time: "04:41–08:24"
tool_target: raea | HyperFrames
tier: principle
use_when: "revealing a hidden detail (a number, an icon, a small scene) through a moving circular 'lens' that looks like it is focusing into view, rather than a plain crossfade or wipe"
style_fit: "Principle is a 2D overlay/mask technique, usable in raea's 2D layer or HyperFrames (SVG). ⚠ keep it to ONE accent use (a single diagnostic/reveal moment), moving the lens with eased in-out motion per house rules — never as a generic wipe/dissolve (those are banned)."
---

## METADATA
01_Animation_Motion | After Effects (Gaussian-blur circular mattes, invert + set-as-matte to cancel) | principle → raea 2D overlay / HyperFrames SVG mask

## CREATIVE_INTENT
A blurred circular matte over a brighter duplicate layer looks like an out-of-focus spot; a SECOND, smaller circle
set to cancel the first circle's blur (inverted and layered) creates a sharp "focus ring" that reveals a hidden
layer (e.g. floating objects inside a sphere) only where the two circles overlap just right — reading as the lens
genuinely focusing onto the hidden content as it moves and scales into frame.

## STE_PROCEDURE
1. Build the HIDDEN layer (the content only revealed through the lens) as a separate layer/composition.
2. Build the BASE layer the viewer already sees (the sphere/circle shape with its own motion).
3. Duplicate the base environment, brighten it, and reveal it only inside a soft circular mask (this becomes the
   "blurred lens" state).
4. Add a second, smaller circular mask set to cancel the first circle's blur where they overlap (inverted so the
   first circle's softness is removed inside the second) — this is the sharp "in focus" ring.
5. Animate the lens(es) moving and scaling as they travel toward the hidden layer, with eased in-out timing.
6. Offset the two circles' keyframes by a few frames from each other for a more organic, less mechanical reveal.
7. Add rotation around a shared center if the brief wants the lenses to orbit while revealing.
8. Keep it to ONE reveal moment per episode at most — this is a specific diagnostic/payoff beat, not a transition
   style to reuse everywhere.

## AGENT_EXECUTION
raea (2D overlay layer, since the "lens" is a flat compositing trick even inside an otherwise-3D scene):
```tsx
// two soft-edged circular masks; the inner one cancels the outer one's blur where they overlap
const lensPos = interpolate(f, [f0, f1], [[0.2, 0.3], [0, 0]], { easing: Easing.inOut(Easing.cubic) });
<group style={{ maskImage: `radial-gradient(circle at ${lensPos[0]*100}% ${lensPos[1]*100}%, transparent 60%, black 85%)` }}>
  <HiddenLayerContent /> {/* only visible where the mask is sharp */}
</group>
```
HyperFrames (SVG `<mask>` with two circles, the inner one solid white — "cancelling" the outer's feathered edge)
is the more native route if the reveal is a flat 2D overlay rather than part of the 3D scene itself.

### Worked example
Topic: "Dalam dompet digital, berapa banyak yang masuk akaun simpanan automatik?" (illustrative — revealing a hidden
savings counter through a coin's glint as the camera passes it).
BEFORE: `| 8 | "automatik masuk simpanan" | hard cut to a savings counter graphic | counter 0→RM50 | — |` — an
ordinary cut, no connective tissue to the coin the line is about.
AFTER: `| 8 | "automatik masuk simpanan" | a soft circular glint on the coin's surface sharpens into focus as camera
nears it, revealing the savings counter as if seen THROUGH the coin's glint | counter 0→RM50 appears only inside the
sharpened ring, 0.4 s fade-through | nested-circular-matte-lens-reveal--ae-techniques-improve-motiongraphics |`

### Check
- Is this used at most once in the episode, as a deliberate reveal beat (not a repeatable transition style)?
- Does the lens move/scale with eased in-out timing, never a snap zoom?
- Does the reveal read as "focusing onto something already in the scene" rather than a generic wipe/dissolve (banned)?

## NOTES
- raea check (2026-11-21): `<HiddenLayerContent>` in the code above is a stand-in for a component the episode builds (from raea primitives such as `Cuboid`, `ImagePlane`, `Text3D`), not a raea built-in. Define it before use.
- Visual gaps: exact mask feather/blur amounts and the offset-frame count (source: "5 or 10 frames") are shown only
  on screen — treat as `~`.
- AE steps dropped: track-matte stacking, "set matte" and invert toggles are AE-specific compositing mechanics;
  translated above to a CSS/SVG radial-gradient mask (raea) or an SVG `<mask>` (HyperFrames), which achieve the same
  cancelling-circle result natively.
