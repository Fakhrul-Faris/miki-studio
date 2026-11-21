---
title: Defocus with a real bokeh shape (convolve), ring edge and inner texture
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "45:18–48:26; 3:11:06–3:17:52"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: Supports Style D's shallow DoF and bloom: out-of-focus highlights should read as lens discs, not mush; raea gives the bokeh mode, not custom kernels.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: what makes defocus photographic is the bokeh — bright out-of-focus points take the lens's shape (round discs, often a brighter outer ring and faint inner texture, onion rings). A plain blur turns them into mush. Idea: convolve the background with a photographed bokeh disc, contrast it up for texture, and squeeze it for anamorphic lenses.

## STE_PROCEDURE
1. Load a real bokeh photo (e.g. an "onion ring" sample).
2. Roto one disc (Shift-drag for a perfect circle), premultiply, feather slightly to keep the outer ring.
3. Reformat to a 256 × 256 box without resizing.
4. Centre the disc: translate by minus its centre, then add 128 px on x and y; crop.
5. Feed the disc into the convolve node's filter input; feed the background into the image input.
6. Enable "use input channels" so the filter's RGB is used (not only alpha).
7. Add a transform after the crop (pivot at centre); its scale is the defocus amount.
8. Test with one extremely bright paint dot (value 100) to see the kernel shape.
9. Add contrast and lower gamma on the kernel to strengthen ring and texture.
10. For anamorphic: scale the kernel width to ~0.6 before the size scale ("aspect ratio" node, then "defocus amount").

## AGENT_EXECUTION
### Source tool (Nuke)
`Read(bokeh)` → `Roto` → `Premult` → `Reformat(256×256, no resize)` → `Transform(centre)` → `Crop` → `ColorCorrect(contrast up, gamma down)` → `Transform "aspect ratio" (scale w 0.6)` → `Transform "defocus amount"` → `Convolve.filter` ; `Convolve [use input channels ✓]`.
### Blender / raea translation
- raea: `<DepthOfField focal_distance aperture_f_stops mode="bokeh" />`; no custom kernel image, no anamorphic squeeze, no ring control — raea: no equivalent (fixed engine kernel). Make highlights worth blooming instead: small emissive points behind the subject + `<Bloom intensity threshold={0.8–1} />`.
- Blender (asset prep / look test only, never the final render): Compositor `CompositorNodeBokehImage` (flaps, angle, rounding, catadioptric = ring, shift) → `CompositorNodeBokehBlur` [Bokeh] input; size via the Size input.

## NOTES
- Visual gaps: exact contrast/gamma values on the kernel not spoken.
- Rule conflicts: none.
