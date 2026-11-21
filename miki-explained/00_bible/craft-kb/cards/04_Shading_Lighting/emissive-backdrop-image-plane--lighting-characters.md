---
title: Emissive backdrop image behind a window — a picture that both sets the place and lights the scene
bucket: 04_Shading_Lighting
source: "Lighting 3D Characters for Storytelling.txt"
source_time: "10:17–10:39"
blender_version_source: 2.8–3.x? (EEVEE legacy)
tool_target: Shader nodes | raea
tier: full
style_fit: Useful for a "where are we" establishing beat (shop window, street outside) without modelling it; keep it dim so the hero object still leads.
---

## METADATA
04_Shading_Lighting | 2.8–3.x? → 4.2+ / raea | Shader nodes + raea

## CREATIVE_INTENT
A photo plane behind a window (a mountain landscape) instantly makes the room feel spacious and placed. Plugged into an Emission shader it also lights the scene (in EEVEE with indirect light baked / in Cycles directly).

## STE_PROCEDURE
1. Add a Plane behind the window opening, scaled to fill the view through it.
2. Load the landscape image on it.
3. Link the image to an Emission shader (not Principled) so it glows.
4. Raise Emission Strength until the view reads as daylight outside; keep it below the key's brightness on the subject.

## AGENT_EXECUTION
Nodes: `Image Texture [Color] -> Emission [Color] -> Material Output [Surface]`, Strength ~2.
raea:
```tsx
<ImagePlane src={staticFile("street_outside.jpg")} width={4} position={[0, 1.5, -3]} />   {/* unlit card */}
<RectLight color="#dfe9ff" transform={Transform.fromXyz(0, 1.5, -2.9).lookingAt([0, 0.5, 0])} intensity={120_000} width={2} height={1.6} />
```
raea emissive/unlit surfaces don't light neighbours: add the `RectLight` at the window to cast the backdrop's light into the room. For bloom on the bright view, use a Mesh3d with `emissive_texture` and `emissive` > 1 plus `<Bloom threshold={0.9} />`.

## NOTES
- Deprecated: none.
- Visual gaps: emission strength not given.
- Rule conflicts: images are references/backdrops only — use a licensed or own photo; log in ASSET-SOURCES.md. Generated plates are not to be pushed as stills.
