---
title: Organic glowing orb built from flat noise-displaced shapes wrapped onto a sphere
bucket: 06_Art_Direction
source: "Motion Feel, Easing & Camera Choreography/SaaS Motion Graphics Masterclass Techniques.txt"
source_time: "38:56–45:07"
tool_target: raea
tier: full
use_when: "an AI/assistant/'thinking' beat needs a visual stand-in that isn't a generic spinner — a glowing orb that can pulse 'in sync with' a line of dialogue"
style_fit: "⚠ raea has no direct CC-Sphere/turbulent-displace equivalent → adapted to a noise-warped sphere mesh with an emissive accent material and bloom; keep pulsing on one accent colour only, muted intensity, no rainbow."
---

## METADATA
06_Art_Direction | After Effects (CC Sphere, Turbulent Displace, radial blur) → raea `manifold.sphere().warp()` + emissive material + Bloom | raea

## CREATIVE_INTENT
Flat 2D shapes (a rough ellipse, rectangle, a thick hand-drawn stroke) are each given a wiggle-path distortion so
they're never static, then wrapped onto **CC Sphere** (rendering only the outside) to read as a lit, rotating 3D orb;
a light-intensity key and slow Z rotation sell dimensionality, and **Turbulent Displace** on top breaks the orb's
perfect roundness into something organic ("I like it when it's a bit more organic"). The orb animates in by keying its
radius 0 → final value, and the light intensity can itself be keyed in sync with a line of dialogue so "it can talk to
us" — i.e. the orb visually pulses with speech, a stand-in for an AI/assistant presence.

## STE_PROCEDURE
1. Build 2–3 rough flat shapes with a noise/wiggle distortion on their paths (never perfectly static).
2. Wrap them onto a sphere, rendering only its outer surface.
3. Light the sphere from one side; raise intensity until the form reads clearly (too dark reads as a dead ball).
4. Add a soft organic surface distortion so the silhouette isn't a perfect circle.
5. Animate the sphere's size in from 0 (no bounce — see house cap).
6. Optionally key the light/emissive intensity to the line's rhythm so the orb reads as "speaking" or "thinking".

## AGENT_EXECUTION
raea: a `manifold.sphere(r)` warped with a low-frequency noise function for the organic surface, lit by one
directional light plus its own emissive accent, with `<Bloom>` picking up only the brightest facets.
```tsx
import { Bloom, Sphere } from "raea/3d";
const pulse = 2 + 1.2 * Math.sin(f * 0.15 + wordBeat);      // tie to dialogue rhythm, not random
const grow = k(f, a, a + 18, Easing.out(Easing.back(0)));    // no overshoot (house cap)
<Mesh3d transform={Transform.fromXyz(...).withScale(grow)}>
  <Sphere radius={0.4} />                                     {/* swap for manifold.sphere(0.4).warp(noiseFn) for the organic surface */}
  <StandardMaterial base_color="#141414" emissive={LinearRgba.from(Srgba.hex(ACCENT)).mul(pulse)} perceptual_roughness={0.6} />
</Mesh3d>
<Bloom intensity={0.25} threshold={0.88} />
```

### Worked example
Topic: a chatbot "thinking" beat before giving a tip on splitting a RM50 bill three ways (illustrative amount).
- BEFORE: a generic spinning-circle loader.
- AFTER: a small accent-coloured orb grows in from a dot and pulses gently in time with the voice line, its surface
  subtly uneven rather than a perfect sphere, before the answer appears.

### Check
- Does the orb read as organic (not a perfect static ball)?
- Is the pulse tied to the dialogue's rhythm, not decorative randomness?
- Is the glow one accent colour, muted, never a rainbow or multi-hue?

## NOTES
- Visual gaps: exact noise/wiggle frequency, CC Sphere light height/intensity numbers and Turbulent Displace size
  (author tunes "by eye", "something like this") are on-screen only — not recoverable.
- AE dropped: CC Sphere (render-outside-only sphere wrap), Turbulent Displace, two stacked Radial Fast Blurs used to
  hide the flat shapes' edges before wrapping; translated to a warped manifold sphere + emissive material + Bloom.
- Rule conflict: source's demo rotates the sphere fairly fast and freely on Z with no cap stated — keep rotation slow
  and continuous, not a snap-spin (no whip-equivalent on a 3D prop).
