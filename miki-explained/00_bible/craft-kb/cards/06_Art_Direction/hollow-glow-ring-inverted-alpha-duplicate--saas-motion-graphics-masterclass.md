---
title: Hollow glow ring — two duplicate glowing shapes, inner one inverted as the outer's alpha matte
bucket: 06_Art_Direction
source: "Motion Feel, Easing & Camera Choreography/SaaS Motion Graphics Masterclass Techniques.txt"
source_time: "47:29–49:47"
tool_target: raea
tier: principle
use_when: "a glowing hero (an orb, a hero icon) needs a ring/halo around it instead of a filled glow, e.g. to frame on-screen text"
style_fit: Fits as a quiet frame for on-screen text over a glowing hero; keep it one muted accent, not a second bright element.
---

## METADATA
06_Art_Direction | After Effects (duplicate layer, inverted alpha track matte, radial blur) → raea SVG ring mask / shader ring | raea

## CREATIVE_INTENT
To get a **ring** (hollow glow) instead of a filled glowing disc: duplicate the glowing shape, make the duplicate pure
white, and use it as an **inverted alpha track matte** on the original — this punches the center out, leaving only the
outer edge visible. The ring's thickness is set by shrinking the matte layer's size relative to the original (author:
"let's make it a bit smaller… we'll get this really cool nice and soft edge"); a further radial blur softens the cut
edge into a glow. The technique is then reused by duplicating the whole ring build and fading the first copy's opacity
to zero in its centre, letting text sit legibly inside the ring where the filled glow used to be.

## STE_PROCEDURE
1. Duplicate the glowing shape; set the duplicate to solid white (ignore its own glow/colour).
2. Apply the duplicate as an **inverted** alpha track matte on the original shape.
3. Shrink the matte copy's size relative to the original to set the ring's thickness (smaller matte = thicker ring).
4. Add a radial blur to soften the ring's inner and outer edges.
5. If text must sit inside the ring, fade the original's centre/fill to zero so only the ring glow remains.

## AGENT_EXECUTION
raea: a stroked circle (not a filled disc) is the direct equivalent — the "inverted matte" is just an SVG ring
achieved with two concentric circles or a `strokeWidth` on a circle path, softened with a blur filter.
```tsx
<svg>
  <defs><filter id="soft"><feGaussianBlur stdDeviation={6} /></filter></defs>
  <circle cx={cx} cy={cy} r={R} fill="none" stroke={ACCENT} strokeWidth={ringThickness} filter="url(#soft)" opacity={glowT} />
</svg>
```
For a 3D orb: keep the sphere's emissive mapped only to a thin shell (a slightly larger, inverted-normal duplicate
sphere with a Fresnel-style rim shader) rather than attempting an AE-style alpha-matte punch-through in 3D.

### Worked example
Topic: "RM50" sits inside a glowing ring instead of a solid glowing circle, in a savings-goal how-to.
- BEFORE: a filled glowing orb with "RM50" written over it (hard to read against the glow).
- AFTER: the glow is hollowed into a thin ring; "RM50" sits legibly in the dark centre, framed by the soft ring.

### Check
- Is the centre actually hollow (no residual glow behind the text)?
- Is the ring's edge soft (blurred), not a hard stroke?
- Is there still only one accent colour in the ring?

## NOTES
- Visual gaps: exact matte-shrink percentage and radial-blur amount are on-screen only ("something like 650" from an
  680 start) — treat as `~`, not exact.
- AE dropped: duplicate-as-white, invert-alpha track matte, Radial Blur; translated to a stroked/blurred ring in 2D,
  noted as not directly portable to a 3D sphere (adapt via rim shading instead).
