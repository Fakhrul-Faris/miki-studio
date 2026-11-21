---
title: Curated, organised asset library (Asset Browser) with a CC0 / attribution check
bucket: 05_Camera_Raea_Pipeline
source: "How To Create Beautiful Environments In Blender.txt"
source_time: "05:18–07:03, 08:46–09:23, 10:36–11:09"
blender_version_source: n/a (Asset Browser = 3.0+)
tool_target: Blender bpy | principle-only
tier: principle
style_fit: Matches "use library 3D models" and ASSET-SOURCES.md logging; the licence check matches our CC-BY credit rule.
---

## METADATA
05_Camera_Raea_Pipeline | 3.0+ → 4.2+ | Blender bpy

## CREATIVE_INTENT
Principle: good scenes come fast from a collection of good, organised models and textures. Basic modelling skill fills gaps, but a library removes most of the hunting. Many free models (e.g. on Sketchfab) are not CC0 and require attribution.
Ideas: mark each episode's assets as assets in one library .blend so later episodes drag them in; log the licence at download time.

## STE_PROCEDURE
1. Before downloading a free model, check its licence (CC0 vs CC-BY vs paid); log it in ASSET-SOURCES.md.
2. Prefer CC0 sources; for CC-BY, record the credit line.
3. Open the asset .blend, select all objects, run Mark as Asset, save the file.
4. Keep library .blends in one folder registered under Preferences > File Paths > Asset Libraries.
5. Keep textures, images and .blend files in one consistent folder structure.

## AGENT_EXECUTION
### Blender
```python
import bpy
for o in bpy.context.selected_objects:
    o.asset_mark(); o.asset_generate_preview()
bpy.ops.wm.save_mainfile()
libs = bpy.context.preferences.filepaths.asset_libraries
if "Meikigo" not in [l.name for l in libs]:
    bpy.ops.preferences.asset_library_add(directory="/path/to/asset_lib")   # ~ path
```
Sources named in the video: CGTrader, TurboSquid (paid marketplaces); Sketchfab (mixed licences); Quixel Megascans (Bridge add-on "janky" with recent Blender); KitBash3D (heavy on weak machines); ambientCG (free 4K textures); textures.com.
### raea translation
Export chosen assets to GLB and load them with `<Model src={staticFile("x.glb")} />` (assets.md).

## NOTES
- Deprecated: none. Asset Browser needs 3.0+.
- Visual gaps: none.
- Rule conflicts: the video's purchased / course asset packs are advertising, not a dependency. Log every asset in ASSET-SOURCES.md before deleting it.
