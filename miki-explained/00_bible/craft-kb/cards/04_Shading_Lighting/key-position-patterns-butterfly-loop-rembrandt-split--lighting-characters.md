---
title: Key-position patterns — butterfly/Paramount, loop, Rembrandt, split — and the two heights to avoid
bucket: 04_Shading_Lighting
source: "Lighting 3D Characters for Storytelling.txt"
source_time: "12:15–12:57, 18:25–18:44, 18:53–20:50, 24:04–24:21"
blender_version_source: 2.8–3.x? (EEVEE legacy)
tool_target: Blender bpy | raea
tier: full
style_fit: Named key positions as a vocabulary for the one soft top light: front-top (butterfly) for clean product reads, side (split) for "hidden truth" lines. Face-specific shadows map to an object's front feature (logo, edge, keyhole).
---

## METADATA
04_Shading_Lighting | 2.8–3.x? → raea | Blender bpy + raea

## CREATIVE_INTENT
Walking the key around the subject gives named looks: Paramount/butterfly (high, in front — a butterfly shadow under the nose, cheekbones lifted; old-Hollywood glamour), loop (moved a little to the side — modern, a small looped shadow), Rembrandt (further to the side but still reaching over the nose — a light triangle on the far cheek; classic cinema), split (fully to the side — the face divided into light and dark; mystery). Two heights to avoid: a key/back far above the subject empties the eye sockets (ghoulish); keys below the subject give the creepy campfire look and show the underside.

## STE_PROCEDURE
1. Start the key high and directly in front of the subject (butterfly / Paramount).
2. Move it ~15–30° to the side for loop lighting.
3. Move it ~45° to the side, keeping light spilling over the front onto the far side, for Rembrandt (a lit triangle on the far side).
4. Move it ~90° to the side for split lighting (half lit, half dark).
5. Before finalising, check the key/back is not so far above that recesses (eyes, a cup's interior) go black.
6. Do not put the main lights below the subject unless the line wants menace.

## AGENT_EXECUTION
Azimuth around the subject (0 = camera direction), elevation ~35–45°:
```ts
const PATTERN = { butterfly: 0, loop: 0.4, rembrandt: 0.8, split: 1.57 };   // radians, ~
const az = PATTERN.split, el = 0.7, d = 2.2;
const keyPos: [number, number, number] = [d * Math.sin(az) * Math.cos(el), d * Math.sin(el), d * Math.cos(az) * Math.cos(el)];
<SpotLight name="key" transform={Transform.fromXyz(...keyPos).lookingAt([0, 0.4, 0])} intensity={1_500_000}
  outer_angle={0.35} inner_angle={0.17} shadow_maps_enabled soft_shadows_enabled radius={0.3} />
```
Blender (video's split key): a Point light with warm torch colour (~#ff9a4a) placed slightly in front of the subject at its side; duplicate on the other side at lower power for fill.

## NOTES
- Deprecated: none.
- Visual gaps: the reference photos for each pattern are shown, not described further.
- Rule conflicts: video's subject is a face; ours is normally an object — read "nose/cheek" as the object's protruding feature and far face. No people in street scenes; figures pose only.
