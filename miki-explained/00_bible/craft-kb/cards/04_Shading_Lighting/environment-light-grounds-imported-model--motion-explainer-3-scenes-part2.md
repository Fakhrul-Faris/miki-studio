---
title: An environment light with cast shadows enabled grounds an imported 3D prop
bucket: 04_Shading_Lighting
source: "Minimalist Tech & SaaS 3D Staging/Motion Explainer Ads Masterclass | 3 Different Scenes | Part 2.txt"
source_time: "30:14–30:51"
tool_target: raea
tier: principle
use_when: "a library CC0/CC-BY model (coin, box, tool) is imported and sits in the scene looking like a flat sticker — no contact with the surface below it"
style_fit: Fits the use-library-3d-models rule — the missing step that makes an imported model read as physically present rather than pasted on.
---

## METADATA
04_Shading_Lighting | After Effects (Environment Light + "enable cast shadow" on an imported 3D model) → raea/Bevy: a light with shadows enabled + the model set to cast/receive shadows | raea

## CREATIVE_INTENT
An imported 3D model (here, Sketchfab coin models) looks "bit unrealistic" the moment it's placed — flat, no contact
with anything — because there's no shadow being cast. Adding one environment/ambient light and explicitly enabling cast
shadows on it is the single step that grounds the object: a visible contact shadow appears under it, and it reads as
sitting in the scene rather than floating over it.

## STE_PROCEDURE
1. Before judging an imported model "looks fine" or "looks flat", check whether it casts a visible shadow.
2. If not, add (or check) a light with shadows enabled, positioned so the model casts onto its ground/surface.
3. Keep shadow intensity readable but not heavy — enough for contact, not a hard black blob.
4. Re-render one still frame to confirm the contact shadow reads before animating.

## AGENT_EXECUTION
raea/Bevy: ensure the scene's key `<RectLight>`/`<SpotLight>` has `shadows_enabled` on, and the imported `<Model>` has
shadow casting/receiving enabled (not disabled for performance) — this is the default in raea-bevy but must not be
switched off for an imported prop:
```tsx
<Model path="assets/coin.glb" castShadow receiveShadow />
<RectLight transform={...} shadowsEnabled range={2 * distanceToSubject} />
```

### Worked example
Topic: an imported library coin/token prop sitting on a kedai runcit's counter (illustrative prop use).
- BEFORE: the coin model sits on the counter with no shadow — reads like a cut-out sticker.
- AFTER: the same coin casts a soft contact shadow onto the counter surface under the top light — it reads as physically present.

### Check
- Does every imported library model cast a visible contact shadow onto its surface?
- Is the shadow soft/readable, not a hard black patch?
- Was this confirmed on a still frame before animating?

## NOTES
- Visual gaps: exact shadow-softness value is visual only.
- AE step ("Environment Light" + its "enable cast shadow" checkbox) is AE-specific; translated directly to raea-bevy's
  existing shadow system, which should simply not be disabled on imported props.
