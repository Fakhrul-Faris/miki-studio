---
title: Key a flat shadow's opacity to the caster's own rotation to fake occlusion
bucket: 01_Animation_Motion
source: "Procedural Mograph & 3D-to-AI Render Passes/How to create Motion Design like Seven (Wonil Seo).txt"
source_time: "08:56–09:26"
tool_target: raea
tier: principle
use_when: "a flat/graphic shadow needs to look blocked by the object casting it as that object rotates, without real-time shadow casting"
style_fit: "⚠ adapt: prefer a real shadow-casting light wherever raea can cast one; use this proxy only for a deliberate flat 2D shadow layer."
---

## METADATA
01_Animation_Motion | After Effects (source) → raea | opacity driven by shared rotation value

## CREATIVE_INTENT
Key a shadow shape's opacity to disappear and reappear in sync with the rotation of the object that would be
blocking it, faking believable occlusion without a real shadow-casting light: "the shadow layer will now follow
perfectly with rotation of the disc."

## STE_PROCEDURE
1. Before adding a shadow proxy, identify the points in the rotation where the real object would occlude the light
   reaching the shadow's position.
2. Key the shadow shape's opacity to drop to 0 at those rotation points and back up elsewhere, timed to the same
   rotation curve.
3. Match the shadow's own rotation to the casting object's so it still reads as attached.

## AGENT_EXECUTION
raea has native real-time shadow maps (`lights.md`) — prefer an actual shadow-casting light over this fake wherever
a true 3D shadow is in play. Use this proxy only when a flat 2D shadow element is used deliberately (a HyperFrames
or flat raea layer); drive the shadow layer's opacity from the same rotation value used for the caster, not a
separate hand-keyed curve.

### Worked example
BEFORE: a flat drop-shadow under a spinning coin stays at constant opacity through the spin, reading as pasted-on.
AFTER: shadow opacity keyed from the same rotation value, dimming out when the coin's edge would block the light
and returning when it wouldn't.

### Check
- Is the shadow's opacity driven by the same rotation value as the object casting it, not a separate hand-tuned
  curve?
- Is this used only for a flat/2D shadow layer, with real shadow-casting lights preferred wherever raea can cast
  one natively?

## NOTES
- raea's real-time shadow maps make this unnecessary for true 3D shadows; keep as a fallback for flat 2D shadow
  layers only.
- AE-only workarounds dropped entirely (no raea equivalent needed): rim-light via duplicate+mask+subtract+feather,
  inner-glow via duplicate+mask+feather, the Classic3D/Cinema4D dual-render colour-key extrusion workaround, the
  glass partial-blur-via-Set-Matte refraction fake, reflection via duplicate+flip+reduced-opacity — raea's native
  PBR materials and real 3D extrusion/transparency replace all of these directly.
