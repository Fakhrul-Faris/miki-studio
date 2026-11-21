---
title: Twin lights (offset suns, or warm-soft + sharp spots) for a layered, less-CG shadow
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/twin-offset-sun-layered-soft-shadows--blender-lighting-hack.md
  - cards/04_Shading_Lighting/twin-spots-warm-soft-plus-sharp-sunlight--lighting-products-breakdown.md
sources: ["Easy Blender Lighting HACK [Blender Tutorial].txt", "Lighting Products in Blender (Breakdown).txt"]
use_when: "a hero's shadow looks razor-sharp and CG ('too precise') under the single top key, or under simulated daylight"
style_fit: Keep one clear light direction — both lights sit at (near enough) the same position so they read as ONE sun with a crisp core and a soft warm halo, never a double-shadow look. The warm light stays near-Kelvin so it never becomes a second accent. Prefer raea's single-DirectionalLight PCSS (soft_shadow_size) first; fall back to the twin-light build only if one soft light still reads too CG.
---

## METADATA
04_Shading_Lighting | Blender (World shader Sky Texture / Cycles Spot + Blackbody) | raea DirectionalLight / two SpotLights

## CREATIVE_INTENT
A single, perfectly uniform light gives a razor-sharp, "too precise" shadow that reads as CG — real light never comes
from one unchanging point. Splitting the key into two near-identical lights, offset only slightly in angle, size or
colour temperature, layers the shadow edge so it fades in steps rather than cutting cleanly, without introducing a
second visible light direction.
- Easy Blender Lighting HACK: two Sky Texture suns, same direction, rotated only ~2° apart (e.g. 30° and 32°), each
  at half intensity, with different sun angular sizes (5 and 1) — the two slightly different shadow softnesses
  layer into a shadow edge that "gently fades, blending seamlessly into the light".
- Lighting Products in Blender (B&O speaker scene): two spotlights at (almost) the same position/direction — one
  neutral and sharp (small radius), one warmed with a Blackbody node (~3,500 K) and given a larger radius (soft) —
  together giving "a mix of hard and soft shadows, which replicates how sunlight works" (a crisp core shadow with a
  softer warm fringe), filled by a low-strength HDRI.

## STE_PROCEDURE
1. Before adding a second light, confirm the hard/CG-looking shadow is actually the problem — render a still of the
   single-key version first.
2. Decide the variant: Sky-texture/world setup → twin suns; a direct Spot/Sun key on an outdoor/daylight setup →
   twin spots (one sharp, one warm-soft).
3. Twin-sun route: add a second sun at the same direction, rotated only ~2° off (source: 30° and 32°); lower both
   suns' intensity so the combined total stays close to one sun's brightness (source: 0.5 each); give them
   different angular sizes for contrast (source: 5 and 1).
4. Twin-spot route: duplicate the key spot almost in place; warm the duplicate's colour via Blackbody (~3,500 K,
   near-Kelvin, never a saturated hue) and raise its radius so its shadow is soft; keep the original sharp (small
   radius, neutral colour).
5. Balance the two lights' powers until the combined shadow shows a crisp core with a soft (warm, for the spot
   route) fringe — not two separately offset shadows.
6. For the spot route, add a low-strength HDRI to fill the shadows and give reflections (keep it low enough it
   doesn't become the scene's background or a second light direction).
7. Render and compare against the single-light still; keep the two-light version only if the hero still reads
   clearly in the first second and there is still only one clear light direction (no visible double shadow).
8. Check: each object casts one shadow (with a layered/fringed edge), never two visibly offset shadows.

## VALUES BY SOURCE
| parameter | Twin suns (Easy Blender Lighting HACK) | Twin spots (Lighting Products B&O) | recommended for Style D (+ why) |
|---|---|---|---|
| light type | 2× Sun (Sky Texture, World) | 2× Spot (Cycles, one Blackbody-warmed) | raea: 1 `DirectionalLight` with `soft_shadow_size` first; fallback = 2 lights of the matching type |
| offset | ~2° rotation apart, same position | almost the same position (≤ ~10 cm), same direction | PCSS single light preferred; twin fallback offset ≤ ~10 cm / ~2° so it reads as one source |
| intensity split | 0.5 each (half of a single sun) | not stated; balanced until the core/fringe mix looks right | keep combined total ≈ one light's brightness |
| size/radius contrast | sun angular size 5 vs 1 | sharp spot radius ~0.02–0.05 m vs soft spot radius ~0.3–0.6 m (not stated, inferred) | sharp: small radius/size; soft: larger radius/size, same colour direction |
| colour | both neutral (world background mix) | sharp = neutral; soft = warmed, ~3,500 K (Blackbody) | sharp neutral; soft near-Kellvin warm — never a saturated accent hue |
| fill | Mix Color into World background | low-strength HDRI (e.g. Poly Haven "brown photo studio") | HDRI fill at low intensity for the spot route only; twin-sun route has no separate fill step |
| use case | any hero under a simulated-daylight world light | an outdoor/stall/window-counter setup specifically | twin-sun for a world/sky setup; twin-spot for a direct outdoor key |
| raea equivalent | 2× `DirectionalLight`, half `illuminance` each, different `soft_shadow_size` | 2× `SpotLight`, offset position, one warm colour + larger `radius` | see AGENT_EXECUTION |

## AGENT_EXECUTION
raea has no Sky Texture node; prefer one `DirectionalLight` with PCSS first:
```tsx
<DirectionalLight transform={Transform.fromXyz(0.4, 6, 1).lookingAt([0, 0, 0])} illuminance={9000}
  shadow_maps_enabled soft_shadow_size={5} />
```
Twin-sun fallback (each half intensity, ~2° apart; sizes 5 and 1 mirror the source; 0.21 m offset at 6 m height ≈ 2°):
```tsx
<DirectionalLight transform={Transform.fromXyz(0.40, 6, 1).lookingAt([0, 0, 0])} illuminance={4500} shadow_maps_enabled soft_shadow_size={5} />
<DirectionalLight transform={Transform.fromXyz(0.61, 6, 1).lookingAt([0, 0, 0])} illuminance={4500} shadow_maps_enabled soft_shadow_size={1} />
<Shadows distance={8} firstCascade={1} />
```
Twin-spot route (outdoor/daylight setup, sharp core + warm soft fringe — Kelvin → hex via `kelvin-light-colour` master):
```tsx
const top = [0.05, 2.4, 0.4] as const;
{/* A: sharp core, neutral */}
<SpotLight name="sunSharp" transform={Transform.fromXyz(...top).lookingAt([0, 0.1, 0])} color="#fff4e8"
  intensity={900_000} outer_angle={0.45} inner_angle={0.3} radius={0.03} range={6}
  shadow_maps_enabled soft_shadows_enabled />
{/* B: soft warm halo, ~3,500 K, same direction, offset ≤ ~10 cm */}
<SpotLight name="sunSoft" transform={Transform.fromXyz(top[0] - 0.08, top[1], top[2]).lookingAt([0, 0.1, 0])} color="#ffd9b0"
  intensity={600_000} outer_angle={0.5} inner_angle={0.2} radius={0.5} range={6}
  shadow_maps_enabled soft_shadows_enabled />
<Environment src={staticFile("brown_photostudio_02_1k.hdr")} intensity={0.3} />   {/* reflections/fill; no background */}
<Shadows distance={8} firstCascade={2} mapSize={4096} />
```
Two shadowed lights = two shadow maps; keep it to exactly two per hero. HDRI filename is a placeholder — check Poly
Haven and log the real asset in `ASSET-SOURCES.md`.

### Worked example
Topic: "Gerai air tebu: untung RM40 sehari?" (illustrative).
BEFORE: `| 2 | "bawah panas terik" | top view of the cup, one spot | cup fades in | — |` — razor shadow, reads as a
plain studio render.
AFTER: `| 2 | "bawah panas terik" | low 3/4 on the stall's steel counter; twin top spots: crisp core shadow of the
cup with a warm soft fringe | on "terik" the condensation drops brighten over 0.4 s; light stays still |
twin-light-layered-shadow-softness |`

### Check
- Is the shadow dense at contact and softer/fringed away from it, rather than one hard edge?
- Is there still one clear light direction (no visible double-shadow look)?
- Did total brightness stay close to a single light's level?
- Is the warm light near-Kelvin, never a saturated hue competing with the scene's one accent?
- Are there only two shadow-casting lights on this hero (not three or more)?

## NOTES
- Deprecated: none; Blackbody-driven light nodes are Cycles-only — Blender 4.5+ has a native light Temperature
  field, prefer it where available (see `masters/04_Shading_Lighting/kelvin-light-colour.md`).
- Values are the authors' own and approximate in both sources (30°/32°, strength 0.5, sizes 5/1; B&O radii/Kelvin
  not stated) — raea illuminance/intensity values above are `~`, tune on a still.
- Rule conflicts: ⚠ two shadow-casting lights is a departure from the house "single soft top light" default — only
  use this when the single-light still genuinely reads too sharp/CG, and keep the offset small enough (≤ ~10 cm /
  ~2°) that it still reads as one source, never two.
- Visual gaps: exact node layout (twin-sun) and exact radii/Kelvin (twin-spot) are shown on screen, not spoken;
  narration in the twin-spot source was Spanish (translated).
