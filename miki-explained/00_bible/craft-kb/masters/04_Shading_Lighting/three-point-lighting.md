---
title: Three-point key / fill / rim
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/soft-three-point-key-fill-back--lighting-characters.md
  - cards/04_Shading_Lighting/three-point-key-fill-rim--power-of-lighting.md
  - cards/04_Shading_Lighting/three-point-motivated-color--ten-cinematic-tips.md
sources: ["Lighting 3D Characters for Storytelling.txt", "The Power of LIGHTING in Blender!.txt", "10 Tips to make Your 3D Render more Cinematic.txt", "The secrets of Cinematic Lighting for 3D.txt", "Edit Faceless Video's (like Fern, Neo & Imperial) - Blender Tutorial.txt", "Lighting Products in Blender (Breakdown).txt"]
use_when: "a standard lit subject with warm key, cool back"
style_fit: "Partial fit (strictest, ten-cinematic-tips): Style D is one soft top key + one accent — key = the soft top light, fill = low AmbientLight (or omit for mystery), back/rim only when the hero must separate from the dark room, all far below the key; add fill/rim only when the delete-test shows they earn it; extra coloured sources only as motivated practicals, never a second saturated colour competing with the accent; no hard under-light."
---

## METADATA
04_Shading_Lighting | 2.8–3.x (source) → bpy 5.x + raea | Blender bpy (or Tri-Lighting extension) → raea lights

## CREATIVE_INTENT
Three roles almost always work: key reveals the subject and gives most light; fill opens the key's shadows to show detail (optional — skip it to keep a subject mysterious); back light separates subject from background and draws an edge highlight (rim from the side, halo from the top). In 3D use what serves the subject, not set ratios.
- lighting-characters: the soft "beauty" version — big soft Spot key, Area fill from below, big soft back light; warm key / slightly cool back (complementary colours the eye likes); calm, tension-free commercial look.
- power-of-lighting: classic geometry — key ~45° side and above, weaker fill opposite, rim behind toward camera; Tri-Lighting add-on for an instant rig.
- ten-cinematic-tips: start from emotion and near-black world; add the most natural motivated source first (moon), then the next (window), then a separate hero spot in its own colour; avoid unmotivated red/green.

## STE_PROCEDURE
1. Decide the emotion; set the World colour almost to black and switch to Rendered view.
2. If the scene has motivated sources (moon, window, lamp), add the brightest/most natural first, then the next; tint each by its source.
3. Add the key: a Spot front-above the subject (~45° to the side), large Radius and high Spot Blend for softness; aim it at the subject, not the wall.
4. Give the key white with a little warmth (or, in a motivated scene, its own colour distinct from the other sources).
5. Before adding fill, look at where the key's shadows fall.
6. Add fill only where detail is wanted: weaker, on the opposite side, or an Area light below facing up (softer than a spot); omit it for mystery.
7. Add a large soft back/rim light behind (and above for a halo) the subject, aimed toward the camera side, to separate it from the background.
8. Optionally tint the back light slightly cold against the warm key.
9. Shortcut: enable the Tri-Lighting extension (Add › Light › 3 Point Lights).
10. Adjust intensities/angles by eye; run the delete-test on fill and rim.
11. (from cinematic-lighting-3d) Build in this order when staging from scratch: back light alone first (check
    separation) → add fill (check shadow softness) → add key last, then move the camera to the key's shadow side →
    add any motivated source and background last.
12. (from faceless-blender) For a tight documentary set (two-wall + floor corner), widen the key Spot's beam angle and
    raise `spot_blend` "by a lot" for soft fall-off; duplicate it rotated 90° on X, aimed at the back wall, as the
    back light; add a ceiling Area as fill; add a shadowless, low-power Point kicker next to the hero prop only.
13. (from lighting-products-breakdown) For a product hero, stretch the key Area along one axis (tall strip) for long
    vertical reflections; put the back/rim light behind the product so it separates from the background and adds
    reflections; replace the fill with an HDRI at low strength instead of a fill light; add a small, tightly spread
    Area on the product's top only for a highlight accent.

## VALUES BY SOURCE
| parameter | lighting-characters | power-of-lighting | ten-cinematic-tips | cinematic-lighting-3d | faceless-blender | lighting-products-breakdown | recommended for Style D (+ why) |
|---|---|---|---|---|---|---|---|
| key | Spot (1.2,-2,2.2), ~800 W, radius 0.6, blend 0.8, `#fff3e6`; raea 1,400,000 lm, outer 0.5 / inner 0.1 | Area (2,-2,3) ~500 W; raea Spot 2,700,000, outer 0.6 / inner 0.3, radius 0.4 | separate hero Spot ~300 W, size 60°, blend 0.8, blue–magenta `#9a66ff`; raea 900,000 | Rembrandt 45° / split / butterfly (top, nose shadow) — pattern choice, no numeric values given | Spot above-behind camera, beam widened, blend up "a lot" (soft fall-off), radius up, power very high (large scene) | Area light **stretched along Z** (tall strip) → long vertical reflections | soft top Spot, warm-white `#fff3e6`, radius 0.4–0.6, inner small for soft edge |
| fill | Area below facing up, ~150 W, size 1.5; raea RectLight 80,000, 1.5×1.5 | Area opposite ~120 W; raea AmbientLight 60 | only where detail is wanted; AmbientLight 20–80 | off = low-key/mystery, up = high-key; softens the key's shadows | ceiling Area, size 1→2 m, power up "a bit", not too much | **HDRI only, no fill light** (low-strength Environment) | AmbientLight 20–40, or omit |
| back / rim | Area behind-top ~400 W, size 2, `#dfe8ff`; raea RectLight 200,000, 2×2 | Area (0,2.5,2.5) ~400 W; raea PointLight 500,000, range 6, `#dfe8ff` | see cheated rim spot card | one or two backs; separation + depth; backlight alone usable as rim | duplicate of key, rotated X 90°, aimed at back wall, shape/size up, power down | Area behind product, makes it "stand out from the background", adds bubble/surface reflections | RectLight (shadowless) cool `#dfe8ff`, well below key; only if the silhouette is lost |
| extra / prop kicker | — | — | — | gobos = textured light; flags shape the light; fog/smoke = natural diffusion | shadowless Point near the food/drink prop, low power, so key's shadows survive | small Area, reduced spread, only on the product's **top** (→ top-surface-highlight-accent-light card) | shadowless PointLight, short `range` 1.5–3, only on the object the line names |
| colour / emotion | warm key / cool back (complementary) | — | tint each motivated source distinctly; avoid unmotivated red/green | hard light/shadow = drama; soft = subtlety/elegance; industry warm-skin/cool-bg split | — | — | soft for explainer beats; warm key, cool background; harder (smaller source) only for a tense line |
| motivated sources | — | — | moon Sun ~2.0 `(0.8,0.88,1.0)` / raea DirectionalLight 2400 `#cfe0ff`; window Area 1.2×1.6 ~200 W `(1,0.6,0.3)` / RectLight `#ff9a4d` | — | — | — | only practicals the scene shows, desaturated |
| world | — | — | near black (0.002,0.002,0.003) | — | — | Octane HDRI env (engine differs; "principles are the same in all render engines") | dark room, no Environment background |

## AGENT_EXECUTION
Blender (5.x, check .blend):
```python
import bpy, math
bpy.context.scene.world.node_tree.nodes["Background"].inputs["Color"].default_value = (0.002, 0.002, 0.003, 1)
hero = bpy.data.objects["Hero"]
def light(name, kind, loc, energy, color, **kw):
    d = bpy.data.lights.new(name, kind); d.energy = energy; d.color = color
    for k, v in kw.items(): setattr(d, k, v)
    o = bpy.data.objects.new(name, d); o.location = loc; bpy.context.collection.objects.link(o)
    c = o.constraints.new("TRACK_TO"); c.target = hero; c.track_axis = "TRACK_NEGATIVE_Z"; c.up_axis = "UP_Y"
    return o
light("Key",  'SPOT', (1.2, -2.0, 2.2), 800, (1, .96, .9), shadow_soft_size=0.6, spot_blend=0.8)   # ~
light("Fill", 'AREA', (0, -1.5, -0.4), 150, (1, 1, 1), size=1.5)                                   # ~ below, aims up
light("Back", 'AREA', (0, 1.8, 2.4), 400, (.88, .92, 1), size=2.0)                                 # ~ behind-top
# motivated variant: light("Moon", 'SUN', (0, 20, 15), 2.0, (0.8, 0.88, 1.0))
#                    light("Window", 'AREA', (4, 3, 2.5), 200, (1.0, 0.6, 0.3), shape='RECTANGLE', size=1.2, size_y=1.6)
#                    light("HeroSpot", 'SPOT', (-2, -2, 3), 300, (0.6, 0.4, 1.0), spot_size=math.radians(60), spot_blend=0.8)
# instant rig: Tri-Lighting is an extension from 4.2 (extensions.blender.org), then Add › Light › 3 Point Lights
```
raea (Style D variant):
```tsx
<SpotLight name="key" color="#fff3e6" transform={Transform.fromXyz(1.2, 2.2, 2).lookingAt([0, 0.3, 0])} intensity={1_400_000}
  outer_angle={0.5} inner_angle={0.1} radius={0.6} soft_shadows_enabled shadow_maps_enabled />
<AmbientLight brightness={30} />                                                   {/* fill; omit for mystery */}
<RectLight name="fill" transform={Transform.fromXyz(0, -0.3, 1.5).lookingAt([0, 0.3, 0])} intensity={80_000} width={1.5} height={1.5} />  {/* only if needed */}
<RectLight name="back" color="#dfe8ff" transform={Transform.fromXyz(0, 2.4, -1.8).lookingAt([0, 0.3, 0])} intensity={200_000} width={2} height={2} />
{/* alt rim: <PointLight transform={Transform.fromXyz(0, 2.5, -2.5)} intensity={500000} range={6} color="#dfe8ff" /> */}
{/* motivated: <DirectionalLight color="#cfe0ff" illuminance={2400} transform={...lookingAt} shadow_maps_enabled />, window <RectLight color="#ff9a4d" .../> */}
```
Softness in raea: `radius` + `soft_shadows_enabled` on spots/points; a small `inner_angle` softens the cone edge; RectLight casts no shadows (good for fill/back).

## NOTES
- Deprecated: Tri-Lighting add-on (`lighting_tri_lights`) became an extension in 4.2.
- Visual gaps: light energies and exact positions not given in any source (viewport only) — all values `~`.
- Rule conflicts: Style D = one soft top key + one accent; fill/back far below the key and only after the delete-test; a soft fill from below is fine, a hard under-light is not (see key-pattern card); no second saturated colour competing with the brand accent.
- cinematic-lighting-3d: demo is visual only, no numeric values; its hard-light/soft-light emotion read and build order (back → fill → key → motivated/background) fold in as technique, not values. Industry warm-skin/cool-bg colour split kept as the existing warm-key/cool-back pick.
- faceless-blender: large-scene energies ("power very high") don't carry to Style D's macro-object scale; kept as pattern only (wide soft key, duplicate-rotated back, shadowless prop kicker), not as a number.
- lighting-products-breakdown: ⚠ its fill is HDRI-only, no fill light, which the Style D pick already allows ("AmbientLight 20–40, or omit") — no change to the pick. Translated from Octane; strip-key and top-highlight values are visual-only, not numeric.
- Style D pick kept unchanged by all three new sources — none gave a reason to move off soft top key + low/omitted fill + conditional rim.
