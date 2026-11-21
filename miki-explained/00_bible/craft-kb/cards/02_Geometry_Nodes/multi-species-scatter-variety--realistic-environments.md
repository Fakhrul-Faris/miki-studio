---
title: Layer 1 of the realism stack — many species/asset types, never one (scatter variety)
bucket: 02_Geometry_Nodes
source: "The Key to Realistic Environments in Blender.txt"
source_time: "01:12–04:46"
blender_version_source: 3.x
tool_target: principle-only
tier: principle
style_fit: Transfers to macro set dressing: any "many things" shot (coins, receipts, beans, pills) needs several related variants, sizes and states, not one repeated mesh.
---

## METADATA
02_Geometry_Nodes | 3.x (G-Scatter add-on by Graswald) | principle-only (GN translation)

## CREATIVE_INTENT
Principle: realism comes from stacked layers — (1) variety of assets, (2) variation in size/distribution, (3) motion — each weak alone, convincing together ("like a burger"). Layer 1: a homogeneous scatter (one grass type) is the rookie mistake; real places mix many types and sizes that belong together. Ideas for us: a coin pile mixes denominations, wear and tilt; a receipt drift mixes lengths and crumple states; assets should come from one coherent source/scan set so they blend.

## STE_PROCEDURE
Method / how-to:
1. Collect reference (photos or go outside) of the real thing and list every element type present.
2. Gather 4+ asset types that belong together, at different sizes (big, medium, small, debris).
3. Prefer assets captured/made together (same scan set or same material family) so they blend.
4. Give each asset type its own scatter system on the same emitter.
5. Set density generously first, then thin with masks (layer 2).
6. Compare against reference; if it doesn't match, add more types before tuning anything else.

## AGENT_EXECUTION
### Source tool (G-Scatter, free Graswald add-on, Blender 3.x)
Select emitter → choose asset (or select an imported object in the Outliner → "Scatter Selected") → set Density. Purchased assets: emitter selected → asset icon → Install Asset. Each asset = one scatter system (GN-based).

### Blender / raea translation
- Blender: one GN modifier per asset type, or one tree with several `Distribute Points on Faces → Instance on Points` branches joined by **Join Geometry**, each with its own Collection Info and Seed (see `collection-scatter-instance-on-points--crazy-renders-geo-nodes.md`). Pick Instance + several variants per collection gives within-type variety.
- Library sources for our assets: CC0/CC-BY models logged in `ASSET-SOURCES.md` (Poly Haven, Scanned Objects).
- raea: no equivalent for scatter (bake to GLB in Blender; render with `<Model>`). raea `plant(ROOM, [{ src, count, from, to, spacing, scale }], seed, avoid)` exists only for garden scatter outside room windows (rooms.md) — not for macro sets.

## NOTES
- Tool is a paid-asset ecosystem add-on; the principle, not the add-on, is the takeaway.
- Visual gaps: the add-on panel steps are visual only.
- Rule conflicts: none.
