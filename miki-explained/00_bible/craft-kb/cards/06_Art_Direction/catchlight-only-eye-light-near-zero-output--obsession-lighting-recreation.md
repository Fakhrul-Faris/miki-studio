---
title: Catchlight-only eye light — a spherical light near camera at near-zero output
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/Obsession (2026) - Lighting Recreation in set.a.light 3D @Elixxier.txt"
source_time: "02:54–03:18; 11:46–12:29; 13:10–13:50"
tool_target: raea
tier: full
use_when: "a hero close-up needs a reflection/catchlight in an eye, glass or polished metal, without adding visible illumination"
style_fit: "No conflict — a macro/close-up detail trick, consistent with the 25–60% subject band."
---

## METADATA
06_Art_Direction | set.a.light 3D virtual gaffer (other) | raea point light at near-zero intensity

## CREATIVE_INTENT
Hang a small spherical light very close to camera at an extremely low output (≈0.5–1%) so it does nothing to overall
exposure but still shows up as a reflected pinpoint highlight in a reflective surface — "the trick with the circle
lights works every time."

## STE_PROCEDURE
1. Before adding an eye-light, confirm the reference has a small round highlight on a reflective surface with no
   matching rise in overall exposure.
2. Place a small point light close to camera, aimed at the reflective surface.
3. Set its intensity to roughly 0.5–1% of the key light's output.
4. Confirm by toggling: exposure on the subject should not visibly change; only the pinpoint reflection appears or
   disappears.

## AGENT_EXECUTION
raea: a PointLight placed near the camera position (offset a few cm so it doesn't clip the lens), `intensity` set to
~1% of the key's value. Only worth adding when the reflective surface is large enough on screen (within the 25–60%
subject band) to show the catchlight clearly.

### Worked example
Topic: a macro shot of a coin or a glossy phone screen on the counter (illustrative).
BEFORE: no catchlight; the glossy surface reads flat and dead.
AFTER: frame brief Decision: "eye-light: tiny PointLight beside the camera, ~1% of key intensity, visible only as a
point reflection on the coin's glossy face."

### Check
- Is the light's intensity low enough that exposure doesn't change when toggled?
- Is the catchlight visible only on the specific reflective surface, not spilling as general light?

## NOTES
- No rule conflict.
