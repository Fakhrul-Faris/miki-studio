---
title: Fake bounce lights (soft point/area where bounce is plausible)
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/big-soft-fill-as-reflector-patch--better-lighting-trick.md
  - cards/04_Shading_Lighting/fake-bounce-area-lights-plausible-placement--better-lighting-trick.md
  - cards/04_Shading_Lighting/fake-bounce-point-light--lighting-secrets.md
  - cards/04_Shading_Lighting/faked-bounce-point-lights--dark-environments.md
sources: ["Get Better Lighting in Blender With This Easy Trick.txt", "5 Lighting SECRETS in Blender.txt", "How to Make DARK Environments in Blender.txt", "Three Point Lighting Tutorial | Blender Product Rendering Series.txt"]
use_when: "lifting dark corners believably in real-time (no path tracing)"
style_fit: "Core Style D move in raea (no path-traced GI): faint colour-matched fills placed only where a lit surface justifies them lift the hero's underside without a second visible source; static, or fade over ≥0.4 s if changed."
---

## METADATA
04_Shading_Lighting | Blender 3.x/4.x (Cycles look-dev) → 5.x / raea | Blender bpy + raea

## CREATIVE_INTENT
The key is right, but areas next to the bright patch fall into silhouette. Rather than raising exposure or floor albedo
(washes out the look), add hidden soft lights exactly where real bounce would come from — a brightly lit floor patch, a
lit wooden surface, a bright background region — aimed at what that bounce would hit. They tie the image together and
look fake only when they have no plausible source.
- Better lighting trick (area fills) adds: trace each fill from a lit surface toward what it would light; Area Size 1 m,
  Spread < 180° to limit it; colour-match (white looked wrong); the ×10 subtlety test; a fill toward camera from a bright background.
- Better lighting trick (reflector patch) adds: one strong, very large (Radius ≥ 1 m) point light in the middle of a bright
  region acts like a photographer's white card when a whole region should glow from bounce.
- Lighting secrets adds: try brightening the lit surface's albedo first; big-radius dim point, colour-matched to the light
  hitting that surface; Volume Scatter and MIS off.
- Dark environments adds: Glossy ray visibility off too (no orbs in puddles/metal); duplicate to other natural bounce
  spots; keep the group only if toggling it on improves the image.

## STE_PROCEDURE
1. Keep the key lights unchanged.
2. Before adding fills, reject the alternatives: raising exposure or floor albedo changes the look (tiles look wrong);
   a modest albedo raise on the lit surface may be tried first.
3. Find surfaces that already receive strong direct light (the patch under the top key).
4. Check where indirect light would already show (e.g. the underside of an object above that patch).
5. Add a light just above/inside that lit patch, on the side facing the receivers (never inside a mesh):
   an Area light aimed along the bounce direction, or a large-radius Point light.
6. Make it soft: Area Size ~1 m, or Point Radius ≥ 1 m.
7. Limit it: Area Spread below 180° (raea: a soft SpotLight cone or short `range`) so it lights only the target.
8. Set Power low; raise only when a fill must reach a far wall.
9. Colour-match each fill to the light hitting that surface (warm scene → slightly warm; low saturation).
10. For a whole bright region that should glow from bounce, place one strong, very large point light in its middle ("reflector patch").
11. Add further fills only where a lit surface justifies them, including one aimed toward the camera from a bright background.
12. Hide fills from reflections and fog: Ray Visibility Glossy off, Volume Scatter off, Multiple Importance off (Cycles).
13. Test subtlety: multiply one fill ×10 — if it looks fake, the useful value is well below.
14. Toggle the group off/on; keep it only if it ties the image together. Never add a fill with no apparent source.
15. Bounce-card variant for a key-opposite fill (product three-point lighting): instead of a second softbox, place a
    large plane opposite the key, facing it, with a plain white/light-grey diffuse material — the fill's direction
    and softness come from the key's own light bouncing off the card, not a second visible source. Move the plane
    closer/farther to raise/lower the fill; scale it up/down for a wider/tighter gradient; keep it out of frame but
    visible in reflections on glossy heroes (from Three Point Lighting Tutorial — physical-card version of this
    master's fake-light version; see `cards/04_Shading_Lighting/bounce-card-plane-fill--three-point-product-series.md`
    for the full worked example).

## VALUES BY SOURCE
| parameter | Trick: area fills | Trick: reflector patch | Lighting secrets | Dark environments | recommended for Style D (+ why) |
|---|---|---|---|---|---|
| Light type | Area, Size 1 m, Spread ~120° | Point, Radius ≥ 1 m | Point, large radius ~1 m | Point | RectLight (soft sheen) or PointLight radius 1, short range |
| Power | 160 W "extreme"; normal ~40–100 W | 12,500 W (large bright region) | ~100 W (1,000 W too bright) | ~200 W (not given) | raea 40,000–60,000 lm at ~0.5 m; 1.8 M only for a whole-region lift |
| Colour | warm (1.0, 0.88, 0.72)~ | warm (1.0, 0.86, 0.7)~ | desaturated blue-green (0.85, 0.95, 1.0)~ | warm `#ffd9b0`~ (wood) | match the surface's lit colour, low saturation |
| Visibility | — | — | Volume Scatter off, MIS off | MIS off, Glossy off, Volume Scatter off | raea: not `volumetric`; no glossy toggle — keep dim / use RectLight |
| Shadows | none | — | off (point = 6 maps) | none | off on all bounce lights |
| raea range | — | 8 | 3 | 1.5 | 1.5–3 (touch neighbours only) |

### Additional source (folded, Phase C)
| parameter | Three Point Lighting Tutorial (bounce card) | recommended for Style D |
|---|---|---|
| Light type | large white/light-grey plane opposite the key (physical card, not a hidden light) | shadowless RectLight at the card's position (raea has no path-traced bounce) |
| Power | — | ~10–20 % of the key, slightly warm like the key |
| Distance/size | closer = more fill, farther = less; bigger = softer/wider gradient, smaller = tighter | mirror in raea: distance ↔ intensity, size ↔ RectLight width/height |
| Visibility | kept out of frame, visible in reflections on glossy heroes | keep the card as real geometry (`Mesh3d`) off-frame so glossy surfaces still show its soft reflection |

## AGENT_EXECUTION
Blender (Cycles look-dev only):
```python
import bpy, math
# A: directed area fill in the lit patch, flipped to face up toward the object above
bpy.ops.object.light_add(type='AREA', location=(0.4, -0.2, 0.05), rotation=(math.pi, 0, 0))
a = bpy.context.object
a.data.size = 1.0; a.data.spread = math.radians(120); a.data.energy = 160    # author's extreme; normal ~40–100
a.data.color = (1.0, 0.88, 0.72)
# B: large soft point in the bounce zone
bpy.ops.object.light_add(type='POINT', location=(0.5, -0.3, 0.4))
b = bpy.context.object
b.data.energy = 100; b.data.shadow_soft_size = 1.0; b.data.color = (0.85, 0.95, 1.0)
# C: reflector patch in the middle of a bright back region
bpy.ops.object.light_add(type='POINT', location=(0, 2.0, 1.2))
c = bpy.context.object; c.data.energy = 12500; c.data.shadow_soft_size = 1.0; c.data.color = (1.0, 0.86, 0.7)
for o in (a, b, c):
    o.visible_glossy = False                               # Object > Visibility > Ray Visibility
    o.visible_volume_scatter = False
    o.data.cycles.use_multiple_importance_sampling = False # verify attribute in 5.x
```
Area lights emit along local −Z: rotate so −Z points from the patch to the shadowed object.

raea:
```tsx
{/* directed soft fill from the lit patch up to the hero's underside (no spread prop: RectLight or soft SpotLight) */}
<RectLight transform={Transform.fromXyz(0.4, 0.02, -0.2).lookingAt([0.4, 1, -0.2])} width={1} height={1}
  intensity={40000} color="#ffe2c0" />
<SpotLight transform={Transform.fromXyz(0.4, 0.02, -0.2).lookingAt([0.3, 0.6, 0])} intensity={60000}
  outer_angle={1.0} inner_angle={0} color="#ffe2c0" />                         {/* narrower "spread" variant */}
{/* local point bounce, short range */}
<PointLight transform={Transform.fromXyz(0.5, 0.05, 0.4)} color="#dceeff" intensity={60000} range={3} radius={1} />
<PointLight transform={Transform.fromXyz(0.3, 0.15, 0.4)} color="#ffd9b0" intensity={60000} range={1.5} />
{/* reflector patch for a whole bright region */}
<PointLight transform={Transform.fromXyz(0, 2.0, -1.2)} color="#ffdcb4" intensity={1800000} range={8} radius={1} />
```
- No `shadow_maps_enabled` (bounce casts no crisp shadow; point shadows cost six maps) and not `volumetric` (no glow in
  `<FogVolume>` — equivalent to Volume Scatter off).
- Glossy visibility off / MIS: raea: no equivalent (Bevy lights always add specular; not a path tracer). Keep bounce
  lights dim and placed so their highlight falls out of shot, or use a RectLight (soft sheen, not a dot).
- Intensities are lumens and fall off with distance squared (lights.md); Blender watts do not convert — tune on a still (`~`).
- Whole-frame lift is `<AmbientLight brightness>` / `<Environment>`; this card is for one local area.

raea (bounce-card variant — shadowless RectLight at the card's position + the card as real geometry so glossy heroes reflect it):
```tsx
const card = Transform.fromXyz(-0.35, 0.15, 0.1).lookingAt([0, 0.12, 0]);
<RectLight name="bounce" transform={card} intensity={30_000} width={0.4} height={0.5} color="#fff4e8" range={0.8} />
<Mesh3d name="bounceCard" transform={card}>
  <Cuboid half_size={[0.2, 0.25, 0.005]} />
  <StandardMaterial base_color="#e6e6e6" perceptual_roughness={0.9} emissive={glow("#ffffff", 0.4)} />
</Mesh3d>
```

## NOTES
- Deprecated: none; the Cycles light property is `light.cycles.use_multiple_importance_sampling` in 4.x (verify in 5.x).
- Visual gaps: exact positions, sizes, the reflector patch's original radius and the other fills' power ("quite a bit
  brighter") are visual only / not narrated. Three Point Lighting Tutorial's plane size/distance and render values are
  not stated either (`~`).
- Rule conflicts: none; fills are static. If a fill must change, fade intensity over ≥0.4 s.
