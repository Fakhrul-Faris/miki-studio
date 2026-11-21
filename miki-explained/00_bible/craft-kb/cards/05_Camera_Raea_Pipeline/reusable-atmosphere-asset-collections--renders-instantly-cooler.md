---
title: Keep a library of append-ready atmosphere collections (birds, leaves, rays, haze)
bucket: 05_Camera_Raea_Pipeline
source: "6 Tips to Make Your Renders Instantly Cooler.txt"
source_time: "unknown (closing advice)"
blender_version_source: 3.x
tool_target: Blender bpy | principle-only
tier: full
style_fit: Matches our per-episode build flow: reusable FX blocks speed builds; log every third-party asset in ASSET-SOURCES.md.
---

## METADATA
05_Camera_Raea_Pipeline | any | Blender bpy (File › Append / Link)

## CREATIVE_INTENT
Finishing touches are used on every piece, so build them once: a flock, falling debris, ray planes, atmosphere planes, each in a self-contained collection (with its force fields and emitters) that you append when a scene is nearly done.

## STE_PROCEDURE
1. Build each effect in its own .blend with everything it needs in one collection (emitter, fields, source objects, materials).
2. Name collections clearly (FX_Leaves, FX_Flock, FX_Rays, FX_Haze).
3. When a scene is near final, File › Append › the .blend › Collection › the FX collection.
4. Re-aim emitters/fields to the new camera; adjust counts and scale.

## AGENT_EXECUTION
```python
import bpy
lib = "/path/to/fx_library.blend"
with bpy.data.libraries.load(lib, link=False) as (src, dst):
    dst.collections = [c for c in src.collections if c in ("FX_Leaves", "FX_Haze")]
for c in dst.collections: bpy.context.scene.collection.children.link(c)
```
raea: the equivalent is a TSX component per effect (a fog block, a light rig) kept in `tools/raea/kit/`, imported into each episode's build.

## NOTES
- Deprecated: none.
- Visual gaps: none.
- Rule conflicts: fresh assets per episode are the studio rule for hero materials (studio-production-pipeline); reusable FX blocks are fine but log sources.
