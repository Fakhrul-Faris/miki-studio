---
title: E-commerce pure-white background — bevelled floor/wall cove + large soft key + small hard specular light
bucket: 04_Shading_Lighting
source: "Studio Lighting, Silhouettes & Color Theory/8 Lighting Tricks I Wish I Knew Earlier (Blender Product Lighting Tutorial).txt"
source_time: "05:37–06:46"
tool_target: Blender bpy
tier: full
style_fit: "⚠ conflict: Style D is a dark room with one soft top light — a blown-out pure-white seamless background is the opposite of 'dark room, hero only lit'. Adapted below: keep the infinity-cove GEOMETRY technique (seamless curved floor-to-wall) for any shot that needs a seamless surface behind the hero, but light it to stay dark/neutral, not blown white, unless a specific beat (e.g. a 'before: plain white listing photo' comparison frame) deliberately calls for the e-commerce look."
---

## METADATA
04_Shading_Lighting | Blender 4.x | Blender bpy (geometry) + raea (lighting translation)

## CREATIVE_INTENT
Standard product-listing photography needs a background that reads as pure, seamless white with no visible floor/wall
seam and no harsh shadow. Two things make this work together: (1) the floor is extruded up and bevelled into a wall
("infinity cove") so there is no visible horizon line to light around, and (2) the background itself is lit by a
separate, strong, large light until it blows to white, while the PRODUCT is lit by its own two-light combo — one large
light for even coverage, duplicated as a second small, weaker copy placed to add just a tight specular highlight (a large
light alone gives no visible reflections; a small one is what the eye reads as "a reflection").

## STE_PROCEDURE
1. Shrink the floor plane to roughly the product's footprint (not a huge studio floor).
2. In Edit Mode, select the floor's back edge; extrude it upward (E) to form a wall.
3. Select the corner edge where floor meets wall; bevel it (Ctrl+B) with enough segments/width to remove the hard corner.
4. Shade the whole cove smooth; make sure it covers the entire visible camera area (no edge of the cove visible in frame).
5. Light the cove itself separately from the product: add a light above/behind, sized and powered until the background renders pure white.
6. Light the product with its own key: one light, made fairly strong.
7. Duplicate the key (Shift+D); shrink the duplicate much smaller and reduce its power — its only job is a tight specular highlight, not general illumination.
8. If the background still reads uneven or not wide enough, duplicate the background light again, make it smaller, and place it behind to extend the white coverage.
9. Render and check: the cove has no visible seam, the product shows one soft area of reflection AND one small sharp highlight, and the background is blown clean white without affecting the product's own exposure disproportionately.

## AGENT_EXECUTION
Blender (build/preview; the cove is geometry, carried into raea as a real mesh):
```python
import bpy, math
bpy.ops.mesh.primitive_plane_add(size=1.5, location=(0, 0, 0))   # ~ shrink to product footprint
floor = bpy.context.object; floor.name = "Cove"
bpy.ops.object.mode_set(mode='EDIT')
bpy.ops.mesh.select_all(action='DESELECT')
# select back edge loop, extrude up, then bevel the corner (interactive in the source; scripted approximation below)
bpy.ops.mesh.select_mode(type='EDGE')
# ... select back edge loop by index/position in practice ...
bpy.ops.mesh.extrude_region_move(TRANSFORM_OT_translate={"value": (0, 0, 1.2)})   # ~ wall height
bpy.ops.mesh.bevel(offset=0.15, segments=8)                                       # ~ soften the corner, no hard seam
bpy.ops.object.mode_set(mode='OBJECT')
bpy.ops.object.shade_smooth()

# background light: blown to white
bpy.ops.object.light_add(type='AREA', location=(0, -1.0, 1.5)); bg = bpy.context.object
bg.data.energy = 3000; bg.data.size = 2.0   # ~ strong + large enough to blow the cove white

# product key: large + fairly strong
bpy.ops.object.light_add(type='AREA', location=(0.8, -0.6, 1.0)); key = bpy.context.object
key.data.energy = 600; key.data.size = 1.0   # ~

# duplicate, shrink, weaken: the specular-only highlight light
spec = key.copy(); spec.data = key.data.copy(); bpy.context.collection.objects.link(spec)
spec.data.size = 0.08; spec.data.energy = 80   # ~ small and weak → a crisp catch-light, not general fill
spec.location = (0.5, -0.9, 1.1)
```
raea (⚠ keep the cove geometry; adapt the LIGHTING to Style D's dark-room default — use the full blown-white recipe only
when a frame deliberately needs an e-commerce-photo look):
```tsx
<Mesh3d name="cove" shape={COVE_MESH /* extrude+bevel baked from the Blender build above, exported as GLB */}>
  <StandardMaterial base_color="#e8e8e8" perceptual_roughness={0.6} />
</Mesh3d>
{/* Style D default: keep the cove in shadow/dark, not lit white — see black-world-low-key-reveal.md */}
{/* e-commerce-beat variant only: */}
<RectLight name="bg-blowout" transform={Transform.fromXyz(0, 1.5, -1)} intensity={300_000} width={2} height={2} color="#ffffff" />
<RectLight name="key" transform={Transform.fromXyz(0.8, 1.0, 0.6).lookingAt([0, 0.2, 0])} intensity={90_000} width={1} height={1} />
<PointLight name="specular" transform={Transform.fromXyz(0.5, 1.1, 0.9)} intensity={6_000} radius={0.02} range={1.5} />
```

### Worked example
Topic: "gambar produk untuk Shopee" (illustrative; a seller photographing a product for an online listing).
BEFORE: `| 2 | "letak gambar di Shopee" | product on a plain flat background, visible floor-wall seam | — | — |` — reads amateur.
AFTER: `| 2 | "letak gambar di Shopee" | split-frame comparison: left half shows the old flat-seam photo, right half shows the cove-lit clean white listing photo with a crisp specular catch-light | wipe reveal from old to new photo on "Shopee" | ecommerce-white-infinity-cove-two-light-combo--8-lighting-tricks |`

### Check
- Does the cove geometry show no visible floor-to-wall seam in frame?
- Is the background light separate from the product's own key, so each can be tuned independently?
- Does the product show one small, crisp specular highlight distinct from its broader soft fill?
- Unless the beat specifically is an "e-commerce photo" comparison, does the scene stay in Style D's dark-room default rather than blown white?

## NOTES
- Visual gaps: exact bevel width/segments, light sizes and energies are tuned live on screen; all values above are `~`.
- Rule conflicts: ⚠ a fully blown-white background directly conflicts with Style D's dark room; use the cove GEOMETRY
  freely, but default its lighting to the dark-room rules, reserving the lit-white version for a deliberate
  "listing photo" comparison beat only.
