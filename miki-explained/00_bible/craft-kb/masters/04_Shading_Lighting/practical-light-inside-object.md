---
title: Practical lights inside objects/instances
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/practical-light-inside-object--fundamentals-of-lighting.md
  - cards/04_Shading_Lighting/practical-point-lights-inside-instances--detail-isnt-hard.md
sources: ["Fundamentals of Lighting in Blender.txt", "Detail Isn't Hard  Blender Tutorial.txt"]
use_when: "an object glowing from within (lit drawer, lit windows)"
style_fit: "Fits object state changes (open, x-ray): a glow inside reveals what's in it; an emissive LED + bloom is a natural accent. Partial conflict (detail-isnt-hard): warm pockets add a second colour — keep them dim, low-saturation warm, never the brand accent; and blend2raea does not carry instanced lights (re-create in TSX). Inner lights fade up over ≥0.4 s when the object opens, never pop."
---

## METADATA
04_Shading_Lighting | 3.x–4.x (source) → bpy 5.x + raea | Blender bpy, raea

## CREATIVE_INTENT
A light inside the object (under a lid, behind a window, in a hollow) adds story — something is in there, the place is inhabited — and a warm incandescent tone feels vintage/cosy. Small emissive parts (LEDs) are the cheapest practicals.
- fundamentals-of-lighting: one flat Area lamp under the lid so nothing leaks above its plane (a Point with radius leaks); emissive LED.
- detail-isnt-hard: point lights inside the source collection of an instanced cluster, so every instance glows with zero extra placement; check the set still lives with the main light off.

## STE_PROCEDURE
1. Decide the inside spots: one cavity (lid, drawer, window) or hollow pockets in a cluster ("places that seem like a room").
2. For a lidded/flat cavity, add an Area lamp, not a Point (a point with radius has thickness and leaks).
3. Place it just under the inside top, facing down; reduce Size to fit inside.
4. For pockets in a cluster, open the cluster's source collection in Local View and add small Point lights there; every instance updates.
5. Set a warm incandescent colour (or a garish hue for sci-fi — not in Style D).
6. Judge power by how bright the pocket looks, not by a number.
7. If the model has an LED, raise its material Emission Strength.
8. Check with the main light off: the practicals alone should give the set life.
9. Make sure each light can reach the camera: a light inside a closed mesh lights nothing outside it.
10. For raea: re-create the lights in TSX (one per instance), and fade them up on the word when the object opens.

## VALUES BY SOURCE
| parameter | fundamentals-of-lighting | detail-isnt-hard | recommended for Style D (+ why) |
|---|---|---|---|
| light type | Area (no leak above plane) | Point in pockets | raea RectLight for a lid/drawer; PointLight for open pockets |
| size | Area size ~0.3 | point radius ~0.1 | fit the cavity |
| Blender power | ~20 W | ~50 W (visual only) | n/a — judge on a raea still |
| colour | ~(1.0, 0.72, 0.42) incandescent | ~(1.0, 0.75, 0.45) | `#ffb874`–`#ffcf9a`, low saturation; accent never |
| raea intensity | RectLight 40,000 lm, 0.3×0.3 | PointLight ~40,000 lm, range 3, no shadows | tens of thousands of lm (1,000,000 is a bright bulb at a few m) |
| LED | emissive ×6 `#ff3b30` + Bloom 0.6 / 0.9 | emissive card ×3 `#ffb060` + Bloom threshold 0.9 | emissive ×3–6; red only if it is the line's accent |
| shadows | RectLight is shadowless | none (6 maps each) | none on pocket lights |

## AGENT_EXECUTION
Blender (5.x):
```python
import bpy
# A) area lamp under a lid + LED
bpy.ops.object.light_add(type='AREA', location=(0, 0, 0.55))     # ~ just under lid, default faces down (-Z)
a = bpy.context.object; a.data.size = 0.3; a.data.energy = 20    # ~
a.data.color = (1.0, 0.72, 0.42)                                  # ~ incandescent
bpy.data.materials["LED"].node_tree.nodes["Principled BSDF"].inputs["Emission Strength"].default_value = 10   # ~

# B) pocket lights inside an instanced cluster's source collection
coll = bpy.data.collections["Tower"]
for i, p in enumerate([(0.2, 0.1, 3.4), (-0.3, 0.2, 7.9)]):       # ~ pocket positions in cluster space
    l = bpy.data.lights.new(f"pocket_{i}", 'POINT'); l.energy = 50; l.color = (1.0, 0.75, 0.45); l.shadow_soft_size = 0.1
    o = bpy.data.objects.new(l.name, l); o.location = p; coll.objects.link(o)
```
raea:
```tsx
const glow = interpolate(f, [openF, openF + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }); // ~0.4 s at 30 fps, ease it
{/* A) lid / drawer: shadowless panel facing -Z (down) */}
<RectLight transform={Transform.fromXyz(0, 0.55, 0).lookingAt([0, 0, 0])} intensity={40000 * glow}
  width={0.3} height={0.3} color="#ffb874" range={2} />
<Mesh3d name="led"><Sphere radius={0.01} />
  <StandardMaterial base_color="#111111" emissive={LinearRgba.from(Srgba.hex("#ff3b30")).mul(6 * glow)} /></Mesh3d>
<Bloom intensity={0.6} threshold={0.9} />
{/* B) one PointLight per instance M and pocket offset q, no shadow maps */}
{INSTANCES.flatMap((M, i) => POCKETS.map((q, j) => (
  <PointLight key={`${i}_${j}`} transform={Transform.fromXyz(...M(q))} intensity={40000 * glow} color="#ffcf9a" range={3} />
)))}
```
Emissive surfaces don't light neighbours in raea (materials.md) — pair with a small light if the glow must spill.

## NOTES
- Deprecated: Principled "Emission" → "Emission Color" + "Emission Strength" (4.0+).
- Pipeline gap: `tools/raea/blend2raea.py` exports with `export_lights=False` and lists lights from `bpy.data.objects` — a light inside an instanced collection is ONE object, listed once at its source position; BlendShot also turns every non-key light into a RectLight. Pocket lights will NOT survive the export — re-create per instance in TSX.
- raea: a PointLight inside a closed mesh lights nothing outside it (lights.md); pockets must be open to the camera. Each shadowed PointLight costs six shadow maps. `range` is documented for Point/Spot only, but the house rule (WORKING-RULES §5, used in EX46) is that RectLight needs `range` too — kept (~2 m here).
- Visual gaps: sizes/strengths not stated; pocket positions shown in x-ray only (36:31–36:57).
- Rule conflicts: one saturated accent — pockets low-saturation warm and dim; fade inner lights up ≥0.4 s on open, never pop.
