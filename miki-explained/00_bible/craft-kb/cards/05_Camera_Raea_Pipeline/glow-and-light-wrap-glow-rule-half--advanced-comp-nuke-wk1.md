---
title: Glow and light wrap — reference the plate, key only the highlights, then cut it in half
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "54:59–56:35; 3:22:26–3:24:12; 3:41:01–3:41:38"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: Direct fit: Style D uses bloom; this sets its restraint — glow only from the hottest highlights, at a level nobody would notice unless told.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: glow comes from the lens (diffusion filters like Black Satin catch bright areas; some lenses bleed light around bright boards). Beginners use glow and light wrap as a crutch to hide edges — it is rarely the answer. Idea: the "glow rule" — dial glow to what looks just right, then cut it in half. Success benchmark: if nobody told you it was there, you would not notice it.

## STE_PROCEDURE
1. Check the plate for its glow amount before adding any.
2. Build the glow from an exponential (natural-falloff) blur with a large radius.
3. Key only the brightest highlights so the whole image does not glow.
4. Key from the original (upstream) plate, not downstream of grades, so later grades don't change the key.
5. Premultiply the keyed highlights, glow them, merge with plus.
6. If the glow should not brighten the surroundings, merge over instead of plus.
7. Dial to "just right", then halve it (mix ~0.5 in the example).

## AGENT_EXECUTION
### Source tool (Nuke)
`Keyer (luminance)` on the source plate → `Premult` → `ExponBlur`/"true exponential blur" gizmo (large radius) → `Merge (plus)`, mix 0.5.
### Blender / raea translation
- raea: `<Bloom intensity={~0.15–0.3} threshold={0.9} />` — threshold 0.8–1 keys only emissive parts and hot highlights; kit `ProStage` uses `intensity={0.18}`. Apply the rule: find the look, halve `intensity`.
- Make only the things that should glow bright: emissive `LinearRgba.from(Srgba.hex(c)).mul(3–10)` on the accent screen/LED; everything else stays below threshold.
- Keep UI crisp: `<Bloom skip={["ui"]} />` or `passes={{ ui: 0.5 }}`.
- Bloom is fixed from the first frame; animate the emissive multiplier, not Bloom.

## NOTES
- Rule conflicts: none. `threshold={0}` with a light background turns the frame milky (post.md).
