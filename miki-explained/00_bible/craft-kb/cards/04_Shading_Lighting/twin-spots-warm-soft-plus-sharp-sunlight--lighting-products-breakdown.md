---
title: Twin spots, one warm and soft + one sharp, for a sunlight hard/soft shadow mix
bucket: 04_Shading_Lighting
source: "Studio Lighting, Silhouettes & Color Theory/Lighting Products in Blender (Breakdown).txt"
source_time: "01:20–02:58 (Bang & Olufsen scene)"
tool_target: raea
tier: full
use_when: "a hero in 'daylight' (stall under the sun, window counter) whose single shadow looks CG-clean"
style_fit: "⚠ conflict: two shadow casters vs one soft top light → adapted: both spots sit at the same top position (offset ≤ ~10 cm) so they read as ONE sun with a sharp core and soft warm halo; the warm one stays near-Kelvin so it never becomes a second accent."
---

## METADATA
04_Shading_Lighting | Blender (Cycles/Octane) | Blender Spot + Blackbody → raea two SpotLights

## CREATIVE_INTENT
The B&O speaker scene uses "a fairly basic setup": two spot lights and an HDRI. The second spot is **warmed with a
Blackbody node and given a larger radius (softer)**, while the other is kept **sharper**. Together they give "a mix of hard
and soft shadows, which replicates how sunlight works" (a real sun has a crisp core shadow and a softer warm sky/bounce
edge). The HDRI (Poly Haven "brown photo studio", the author's default) fills the shadows.

## STE_PROCEDURE
1. Add Spot A: neutral white, small Radius (sharp shadows), aimed at the hero.
2. Duplicate it as Spot B, almost the same position and direction.
3. Before tuning B, enable Use Nodes on it and drive Emission Color with a Blackbody node (warm, ~3,500 K, value not stated).
4. Raise Spot B's Radius so its shadow is soft (~0.3–0.6 m vs A ~0.02–0.05 m, values not stated).
5. Balance powers until the combined shadow shows a crisp core with a soft warm fringe.
6. Add an HDRI (brown photo studio) at low strength to fill shadows and give reflections.
7. Optionally add a particle system for floating dust in the beams.
8. Check: one shadow per object, not two separate shadows.

## AGENT_EXECUTION
**Frame brief:** Feeling "warm afternoon on a real counter"; Not generic because "shadow has a hard core and soft warm
edge like real sun". Use on an outdoor/stall setup only; studio dark-room setups keep the single soft key.

**raea** (Kelvin → hex; see kelvin-light-colour master):
```tsx
const top = [0.05, 2.4, 0.4] as const;
{/* A: sharp core, neutral */}
<SpotLight name="sunSharp" transform={Transform.fromXyz(...top).lookingAt([0, 0.1, 0])} color="#fff4e8"
  intensity={900_000} outer_angle={0.45} inner_angle={0.3} radius={0.03} range={6}
  shadow_maps_enabled soft_shadows_enabled />
{/* B: soft warm halo, ~3,500 K, same direction */}
<SpotLight name="sunSoft" transform={Transform.fromXyz(top[0] - 0.08, top[1], top[2]).lookingAt([0, 0.1, 0])} color="#ffd9b0"
  intensity={600_000} outer_angle={0.5} inner_angle={0.2} radius={0.5} range={6}
  shadow_maps_enabled soft_shadows_enabled />
<Environment src={staticFile("brown_photostudio_02_1k.hdr")} intensity={0.3} />  {/* reflections/fill; no background */}
<Shadows distance={8} firstCascade={2} mapSize={4096} />
```
Two shadowed spots = two shadow maps; keep it to these two. HDRI file name is a placeholder (check Poly Haven, log in
ASSET-SOURCES.md). Dust: a few slow `<Sphere>` motes, or skip.

### Worked example
Topic: "Gerai air tebu: untung RM40 sehari?" (illustrative).
BEFORE: `| 2 | "bawah panas terik" | top view of the cup, one spot | cup fades in | — |` — razor shadow, reads as a studio render.
AFTER: `| 2 | "bawah panas terik" | low 3/4 on the stall's steel counter; twin top spots: crisp core shadow of the cup with a warm soft fringe | on "terik" the condensation drops brighten over 0.4 s; light stays still | twin-spots-warm-soft-plus-sharp-sunlight--lighting-products-breakdown |`

### Check
- Does each object cast one shadow (core + fringe), not two offset shadows?
- Is the warm spot near-Kelvin (no saturated orange competing with the accent)?
- Are both spots from the top in a Style D shot?
- Are there only two shadow-casting lights?

## NOTES
- Visual gaps: Kelvin value, radii, powers not stated (`~`). Narration in Spanish (translated).
- Blackbody node on a light = Cycles-only light nodes; Blender 4.5+ has a native light Temperature field.
- Dropped: paid "Gobos Light Textures" add-on part of this scene → see addendum image-textured-light--lighting-products-breakdown.
