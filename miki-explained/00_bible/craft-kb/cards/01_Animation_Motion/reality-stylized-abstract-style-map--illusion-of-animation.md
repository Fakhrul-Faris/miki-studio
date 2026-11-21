---
title: Reality–stylized–abstract triangle (art-style map with its failure zones)
bucket: 01_Animation_Motion
source: "The Illusion of Animation.txt"
source_time: "00:00–22:21"
blender_version_source: n/a (conference talk, no DCC)
tool_target: principle-only
tier: principle
style_fit: useful for deciding how far each object/diagram in a Style D episode may be simplified before it stops reading as the real thing; no conflict
---

## METADATA
01_Animation_Motion | n/a | principle-only

## CREATIVE_INTENT
Principle: "real → cartoony" is one line, but style is a triangle. Bottom edge: reality ↔ stylized (still clearly representational — the brain instantly knows what it is). Top corner: abstract / non-representational (the brain must work and imagine to know what it is). Two fuzzy failure zones: the uncanny valley near reality (brain accepts it as real, then finds it weird) and "ungrounded" far into stylized (too little information to carry empathy or emotion). Going too far toward abstract becomes "disconnected", then "confusing". The interesting sweet spot is usually inside, not at the edges — but no value judgement: an edge can be the goal.
Ideas: two dots and a line already read as a face; cherry-pick the wrong features (one eyebrow, nose bridge, one ear) and it stops reading. Adding emotion means adding information, which pushes a design toward reality. A design can sit in one place overall while its details "bleed" toward reality (freckles, hair, shading) or toward abstract (details that don't move with the form).

## STE_PROCEDURE
1. Place the subject's overall design on the triangle: reality, stylized, or abstract.
2. Place its details separately; note which direction they bleed.
3. Before you simplify an object, keep the features the brain uses to recognise it (its "two dots and a line").
4. To add emotion or meaning, add information; expect the design to move toward reality.
5. Check both failure zones: uncanny (near-real but wrong) and ungrounded (too sparse to carry the point).
6. If you need the viewer to work and imagine, move toward abstract; stop before it reads as confusing.

## AGENT_EXECUTION
### Source tool (none)
A talk built on slides (Scott McCloud's Understanding Comics "picture plane" adapted; semiotics: icon stops before symbol/letters). No software setup.
### Blender / raea translation
- Style D sits at the reality corner for the hero object (real surface, macro detail) — a real-looking object with wrong proportions or mushy detail falls into the uncanny zone; check macro stills for "real but weird".
- Diagram/UI layers (charts, icons, numbers) sit stylized→abstract; keep each one's recognition features (a coin's rim and face, a phone's bezel and notch) so it stays representational.
- Object morphs (object → chart) travel from the reality edge toward abstract; the end state must still be recognisable for the line being spoken.
- raea: no equivalent (a design-judgement framework, not a render feature). Use `tools/raea/frame_metrics.py` / the fresh-critic skill on stills to judge legibility.

## NOTES
- Deprecated: n/a.
- Visual gaps: the triangle map, the face ladders (Bell, Popeye, Miguel/Coco, Chowder, SpongeBob) and the speaker's short-film character redesign are slides only; positions on the map are not recoverable from audio.
- Rule conflicts: none. Character examples are illustrations of style, not a proposal to animate figures (figures hold poses only).
- STT repaired: "apathy Nia" → apophenia; "semiotic" → semiotics; speaker's name is garbled in the transcript and is not reproduced.
