---
title: Light linking (light only chosen objects)
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/light-linking-exclude-floor-reflection--perfect-product-animations.md
  - cards/04_Shading_Lighting/light-linking-protect-floor-reflection--realistic-product-lighting.md
  - cards/04_Shading_Lighting/light-linking-shadow-linking--key-to-realistic-renders.md
  - cards/04_Shading_Lighting/light-linking-single-product--product-animation-masterclass.md
sources: ["How to Make Perfect Product Animations in Blender.txt", "Realistic Product Lighting In Blender.txt", "The Key to Realistic Renders in Blender.txt", "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt", "Lighting With Only HDRIs? You're Doing it Wrong!.txt"]
use_when: "rim on the product but not the reflective floor"
style_fit: Useful — keeps one clean rim / accent light on the hero without a hot streak on the dark glossy floor; but raea has no documented per-light include list, so plan the raea rig with cone aim, range and floor roughness and treat `layers` as untested.
---

## METADATA
04_Shading_Lighting | Blender 4.0+ (Cycles; EEVEE Next 4.2+), source 4.0–4.4 | Blender bpy → raea workaround

## CREATIVE_INTENT
A light that rims or lifts the product also hits everything else: it burns a glare streak into a glossy floor, or flattens the hero while lifting a dim neighbour. Light linking restricts a light to a chosen collection (and shadow linking chooses who casts its shadow) — control impossible on a real set.
- perfect-product-animations: backlit rim stays on the product, the floor reflection goes dark.
- realistic-product-lighting: link every product light so the ground's reflections stay clean once a floor is added.
- key-to-realistic-renders: adds Shadow Linking (Blockers) and per-object include/exclude ticks.
- product-animation-masterclass: one extra area light brightens only the under-lit product in a group shot.

## STE_PROCEDURE
1. Name every object clearly before linking (not "Cylinder.001").
2. Select every object that belongs to the product; in the Outliner create a New Collection and move them in.
3. Toggle the collection's visibility; anything still visible is not in it — move it in.
4. Add the light (e.g. an Area light behind the product facing the camera, scaled up to rim the edges; or one beside an under-lit product).
5. Select the light; Object Properties › Shading › Light Linking › New.
6. Drag the product collection (or single target) into the Receiver box; everything else is excluded.
7. Toggle per-object check marks to include/exclude finer.
8. For shadows, create a Shadow Linking (Blockers) collection and exclude objects from casting.
9. Repeat for every light that should not touch the floor.
10. Check rendered view (Cycles, or EEVEE Next 4.2+): rim remains, floor glare gone; toggle the light to confirm only the target changes.
11. (from lighting-with-only-hdris, Octane/C4D route) In a renderer with no Blender-style receiver-collection panel,
    reach the same exclusion by ID-tagging: add an Object Tag on the receiver (e.g. the floor) telling it to ignore
    a chosen light ID, and assign that ID to the offending light(s) — same outcome (one light excluded from one
    object), different mechanism.

## VALUES BY SOURCE
| parameter | perfect-product-animations | realistic-product-lighting | key-to-realistic-renders | product-animation-masterclass | recommended for Style D (+ why) |
|---|---|---|---|---|---|
| linked light | Area rim behind product | every product light | Key | extra Area beside one product | the rim/accent light only; the top key lights everything |
| receivers | product collection | "ProductOnly" | "Key_receivers" (Hero) | one object (orange can) | hero collection |
| blockers (shadow linking) | — | — | "Key_blockers" | — | rarely needed |
| raea floor roughness | raise so glare spreads | ~0.35–0.5 (BlendShot ground 0.45) | raise | — | 0.45 (BlendShot default, keeps a soft reflection) |
| raea fallback | short `range`, narrow SpotLight | narrow SpotLight cones; RectLight fills | `receiveShadow={false}`, `shadow={false}`, narrow cone | narrow SpotLight or short-`range` PointLight | narrow SpotLight aimed at hero + short range; layers only after a still test |

## AGENT_EXECUTION
Blender (4.0+ / 5.x):
```python
import bpy

def link_light(light_name, receivers, blockers=None, col_name=None):
    col = bpy.data.collections.new(col_name or f"{light_name}_receivers")
    bpy.context.scene.collection.children.link(col)
    for o in receivers:
        col.objects.link(o)                 # an object may live in several collections; unlink elsewhere only if moving
    L = bpy.data.objects[light_name]
    L.light_linking.receiver_collection = col
    if blockers:
        bx = bpy.data.collections.new(f"{light_name}_blockers")
        for o in blockers: bx.objects.link(o)
        L.light_linking.blocker_collection = bx   # shadow linking
    return col

hero = [o for o in bpy.data.objects if o.name.startswith("Product")]
link_light("RimLight", hero)
# all product lights at once:
# for o in bpy.data.objects:
#     if o.type == "LIGHT": o.light_linking.receiver_collection = bpy.data.collections["RimLight_receivers"]
```
raea (no documented per-light linking; lights affect every mesh, every mesh casts and receives):
```tsx
// rim on the hero only: narrow cone + short reach, floor roughness spreads any leftover glare
<SpotLight transform={Transform.fromXyz(0, 0.9, -1.2).lookingAt([0, 0.3, 0])}
  intensity={400000} outer_angle={0.25} inner_angle={0.12} range={2.5} />
<Mesh3d name="floor" receiveShadow={false}>{/* only if its shadow must go */}
  <Cuboid half_size={[5, 0.02, 5]} />
  <StandardMaterial base_color="#101114" perceptual_roughness={0.45} />
</Mesh3d>
// soft fills that leave no hot spot: <RectLight transform intensity width height color /> (shadowless)
// stop a part casting: <Mesh3d shadow={false}>
```
`layers` exist on parts, lights and the camera (limits.md, Bevy RenderLayers): putting hero + rim on a layer the floor lacks, camera on both, may emulate linking — prop format undocumented and light exclusion untested; check `raea guide coverage` and verify on a still before relying on it. Intensity/position values above are `~`.

## NOTES
- Deprecated: none — light linking added in 4.0 (Cycles only in 4.0); EEVEE Next (4.2) supports light linking.
- Visual gaps: light placement is visual in all sources.
- Rule conflicts: none. Since Blender only builds, linking does not survive to the raea render — design the raea rig so it isn't needed.
- lighting-with-only-hdris: Octane/Cinema 4D object-tag ID exclusion is a second real-world precedent for the same
  "rim on the hero but not the floor" problem, confirming (not changing) the master's raea fallback — narrow
  SpotLight cone, short `range`, floor roughness — since raea has neither a receiver-collection panel nor ID tags.
