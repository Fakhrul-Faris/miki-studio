---
title: Practical point lights placed inside an instanced cluster (interior glow everywhere)
bucket: 04_Shading_Lighting
source: "Detail Isn't Hard  Blender Tutorial.txt"
source_time: "34:48–37:30"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: "partial conflict: warm torch pockets add a second colour; keep them dim and neutral-warm, never the brand accent; and our exporter does not carry instanced lights"
---

## METADATA
04_Shading_Lighting | 3.x source → 4.2+ / raea | Blender bpy, raea

## CREATIVE_INTENT
Small point lights tucked into hollows of the cluster make it feel inhabited (lit rooms, torches). Put them inside the
source collection once and every instance gets them, so the whole set glows from within with zero extra placement.

## STE_PROCEDURE
1. Open the cluster's source collection in Local View.
2. Add Point lights inside hollow pockets (chambers, gaps between pillars) — "places that seem like a room".
3. Judge power by how bright the pocket looks, not by a number (values: unknown (visual only)).
4. Keep the lights inside the source collection; every instance updates immediately.
5. Before you render, check the main light off: the pockets alone should still give the set life.

## AGENT_EXECUTION
### Blender
```python
import bpy
coll = bpy.data.collections["Tower"]
for i, p in enumerate([(0.2, 0.1, 3.4), (-0.3, 0.2, 7.9)]):        # ~ pocket positions in cluster space
    l = bpy.data.lights.new(f"pocket_{i}", 'POINT'); l.energy = 50; l.color = (1.0, 0.75, 0.45); l.shadow_soft_size = 0.1  # ~
    o = bpy.data.objects.new(l.name, l); o.location = p; coll.objects.link(o)
```
### raea
- Pipeline gap: `tools/raea/blend2raea.py` exports with `export_lights=False` and lists lights from `bpy.data.objects` —
  a light inside an instanced collection is ONE object, so it is listed once (at its source position), not per instance.
  BlendShot also turns every non-key light into a `RectLight`. So these pockets will NOT survive the current export.
- Re-create them in TSX, one per instance: for each instance transform `M` and pocket offset `q`,
  `<PointLight transform={Transform.fromXyz(...M(q))} intensity={~40000} color="#ffcf9a" range={3} />`
  (lumens; ~1,000,000 is a bright bulb at a few metres, so pockets are tens of thousands). No `shadow_maps_enabled` — each shadowed point light costs six maps.
- A point light inside a closed mesh lights nothing outside it (lights.md): pockets must be open to the camera.
- Optional fake: an emissive card in the pocket (`emissive={LinearRgba.from(Srgba.hex("#ffb060")).mul(3)}`) with `<Bloom threshold={0.9} />`; emissive does not light neighbours.

## NOTES
- Visual gaps: pocket positions shown in x-ray only (36:31–36:57).
- Rule conflicts: one saturated accent only — pockets stay low-saturation warm and dim, never compete with the accent.
