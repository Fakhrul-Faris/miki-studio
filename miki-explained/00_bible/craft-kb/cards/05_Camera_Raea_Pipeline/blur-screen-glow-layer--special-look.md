---
title: Glow layer (duplicate, Gaussian blur, Screen, limit to brights) = bloom
bucket: 05_Camera_Raea_Pipeline
source: "How to Add That Special Look To Your Renders.txt"
source_time: "05:59–08:14"
blender_version_source: n/a (Photoshop); Blender Glare node mentioned
tool_target: raea
tier: principle
style_fit: Same job as Style D's bloom — a soft halo on the brightest highlights only; keep it subtle so the accent, not the whole frame, glows.
---

## METADATA
05_Camera_Raea_Pipeline | Photoshop (any) / Blender Glare node | raea Bloom

## CREATIVE_INTENT
Principle: a soft glow over the bright areas ("Orton effect", glare) makes almost every render feel more finished. Ideas: limit it
to the brights so darks stay clean; apply it before the main grade — the grade looks different (better) with the glow underneath.

## STE_PROCEDURE
Method (Photoshop):
1. Duplicate the background (render) layer.
2. Apply Filter → Blur → Gaussian Blur (radius scene-dependent; visual only).
3. Set the blur layer's Blending Mode to Screen (Lighten sometimes; Screen usually better).
4. If too intense, limit where it shows: paint a layer mask, or
5. Open Blending Options → Blend If; raise the dark handle so pixels below a brightness don't show.
6. Alt-drag to split the handle for a gradual falloff.
7. Brush the glow into the bright areas only.

## AGENT_EXECUTION
### Source tool (Photoshop)
Layer stack: Render → Render copy (Gaussian Blur ~unknown px, Blend = Screen, Blend If "This Layer" black split ~unknown).
### Blender / raea translation
- Blender equivalent (compositor, look-dev only): `Render Layers [Image] -> Glare (Fog Glow) [Image] -> Composite`.
- raea (renderer): `<Bloom intensity={0.6} threshold={0.9} />` beside the camera (~ values).
  - `threshold` = Blend If: only pixels brighter than it glow (0.8–1 = emissives and hot highlights only).
  - `intensity` = layer opacity: 1 natural, 2 strong.
  - Brush-in mask → no painted mask in raea; control *what* glows with `emissive` (`LinearRgba.from(Srgba.hex(c)).mul(3)`) on
    the accent only, and keep UI out with `<Bloom skip={["ui"]} />` on a `pass="ui"` screen.
- One Bloom per piece; the first frame's values hold.

## NOTES
- Deprecated: none.
- Visual gaps: blur radius and Blend If handle positions are shown, not spoken.
- Rule conflicts: none; `threshold={0}` with a light background goes milky (post.md) — avoid.
