---
title: Text revealed by the light itself — words exist only where the light falls; swap words while it is dark
bucket: 09_UI_Motion
source: "Studio Lighting, Silhouettes & Color Theory/Animate Light to Control Your Viewer | After Effects (No Plugins).txt"
source_time: "10:43–12:20"
tool_target: raea
tier: principle
use_when: "a dark Style D setup where a word or RM number should appear on the object as the light reaches it"
style_fit: Strong fit for Style D (dark room, one top light) — the reveal is the scene's own light, not a 2D fade; text never over the hero's focal point.
---

## METADATA
09_UI_Motion | After Effects (source) → raea Text3D lit by a moving light / 2D mask | raea

## CREATIVE_INTENT
Two static text layers ("make it look" / "premium") use the moving light line as a track matte, so "it shows wherever
that light is". The layers are split so the first text ends and the second begins at the moment the light switches off
mid-switch — "when the light goes off, it switches from make it look to premium". It "puts an emphasis on that word and
guides your eye towards the centre".

## STE_PROCEDURE
1. Place the words on the surface in a dark scene; leave them unlit.
2. Move the light across them on the spoken word; they appear only where lit.
3. To change words, dim the light to ~0, swap the text during the dark frames, bring the light back.
4. Keep the word in the light pool's centre at rest so it reads at phone size.

## AGENT_EXECUTION
Preferred 3D: `Text3D` with a dark, rough `StandardMaterial` on the table; no ambient on it; a `SpotLight` slides over
it (see "moving light guides the eye" card). Swap words inside `<Sequence>`s split at the light's dark frame; give each a
`name`. 2D fallback: a copy of the text with `maskImage: radial-gradient(circle 220px at ${x}px ${y}px, #000 40%, transparent 100%)`,
`x/y` from the light's path. Check legibility on a phone still: ≥ 70 % of the word must be lit at rest.

### Worked example
Topic: "kos sebenar" of a RM3.50 nasi lemak (rice + sambal + egg costs, illustrative arithmetic).
- BEFORE: "RM3.50" fades in over a lit table.
- AFTER: dark table; the top light slides in on "harga jual" and "RM3.50" appears engraved in its pool; the light dims,
  and as it returns on "kos" the same spot now reads "RM2.10".

### Check
- Is the word invisible until the light reaches it?
- Does the word swap happen only during the dark frames?
- Is the lit word readable at phone size when the light rests?

## NOTES
- Visual gaps: none for the method; text positions are visual.
- AE dropped: track matte + layer split; translated to real light falloff / CSS mask.
