---
title: Scale cueing with recognisable objects instead of people
bucket: 05_Camera_Raea_Pipeline
source: "Making a SERENE render in blender.txt"
source_time: "21:38–22:53"
blender_version_source: 4.x
tool_target: principle-only
tier: full
style_fit: Strong fit — Style D is macro and has no people by default; a coin, a key or a receipt next to the hero tells size instantly.
---

## METADATA
05_Camera_Raea_Pipeline | any | principle-only

## CREATIVE_INTENT
Without a reference the viewer can't tell how big anything is. Put a universally known object (stairs, railings, windows, a chair, birds) in shot so size reads in an instant, without placing a person.

## STE_PROCEDURE
1. Before finalising a shot, ask: can a viewer tell the hero's size within one second?
2. If not, add one familiar object of known size beside or behind it.
3. Make the cue obvious (clear silhouette, in the lit area or in silhouette against light).
4. Keep it secondary: no accent colour, not brighter than the hero.

## AGENT_EXECUTION
Blender: place a library model at true scale (`obj.dimensions` checked against real size in metres).
raea: `<Model src={staticFile("coin_1sen.glb")} position={[0.06, 0, 0.02]} scale={1} />` — keep real-world scale (macro scenes in metres: a coin ≈ 0.02 m). DoF focus stays on the hero.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: video's suggestions include people/birds — we use objects only (no-people rule; figures pose only). Our cues: coins, banknotes, phone, keys, receipt, hand-sized tools.
