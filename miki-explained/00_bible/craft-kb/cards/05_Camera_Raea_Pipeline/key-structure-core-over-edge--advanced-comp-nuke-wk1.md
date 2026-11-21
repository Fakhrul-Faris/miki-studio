---
title: Key structure — a soft edge key (IBK colour stack) plus an eroded, softened core key merged over it
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "2:38:53–2:51:25; 3:04:44–3:08:55; 4:25:19–4:30:10"
blender_version_source: n/a (Nuke, IBK / Keylight)
tool_target: principle-only
tier: principle
style_fit: Only for live-action inserts (green-screen hands, a filmed product). Our CG needs no keys; the principle "split a matte into a delicate edge and a solid interior" still applies to any mask we build.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | principle-only

## CREATIVE_INTENT
Principle: every key structure separates an edge key (soft, semi-transparent pixels where screen and subject blend; never crunched) from a core key (solid opaque interior; may be crunched hard). Core merges over edge. Idea: an uneven screen is best handled by a difference key against a generated clean plate; stacking the clean-plate fill avoids blurring right at the edge.

## STE_PROCEDURE
1. Build two branches, edge and core; merge core (A) over edge (B).
2. For the edge, avoid crunching clip black/white; it destroys edge transparency.
3. Generate a clean screen plate: colour set to green, size 1, tune darks/lights until the subject disappears.
4. Fill the subject hole by eroding/stacking the clean plate inward rather than with a blurring patch-black.
5. Raise the stack count only until no subject pixels remain (each step costs speed).
6. Difference-key the plate against that clean plate for the edge key; check the background is pure 0.
7. For the core, pick the screen colour, raise clip black just until the outside is gone, lower clip white to fill.
8. Invert the core alpha and gamma up the viewer to find holes; leave real holes (costume gaps).
9. Output the core as alpha only (no despill), premultiply it yourself.
10. Erode the core ~3 px and soften it so it blends into the edge key.
11. Where a small-area core forms "globs", pull a second harder core inside a tracked garbage roto and keymix it in.
12. Kill single-frame key pops with one-frame ellipse rotos; fade multi-frame ones over their life.

## AGENT_EXECUTION
### Source tool (Nuke)
Edge: `IBKColour` → (better) "IBK colour stack" gizmo (size 1, stack number up, not patch black) → `IBKGizmo` (screen green). Core: `Keylight` (screen matte clip black up, clip white down; view "Intermediate Result") → `Premult`; `Erode`(~3) + `Blur`; `Merge(over)` core over edge. Glob fix: second `Keylight` + `Keymix` with tracked `Roto` (Transform MatchMove from a quick 2D track). Pops: Roto `life` = frame range / start-to-frame.
### Blender / raea translation
- raea: no equivalent (no keyer). Key live-action inserts outside raea and import them as alpha video/PNG sequences via `raea/video` / `ImagePlane`.
- Transfer: masks we build (e.g. an x-ray reveal) should have a solid core and a separately controlled soft edge.

## NOTES
- Visual gaps: IBKColour darks/lights values are tuned by eye; none spoken.
- Rule conflicts: none.
