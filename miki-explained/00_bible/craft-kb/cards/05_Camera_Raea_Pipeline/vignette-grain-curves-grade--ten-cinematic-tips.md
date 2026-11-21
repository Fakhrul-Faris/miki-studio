---
title: Finishing grade — vignette, film grain, curves (blue shadows, warmer highlights, contrast)
bucket: 05_Camera_Raea_Pipeline
source: "10 Tips to make Your 3D Render more Cinematic.txt"
source_time: "27:57–30:05"
blender_version_source: 3.x
tool_target: Blender bpy (Compositor) | raea
tier: full
style_fit: Fits Style D — vignette + split-tone grade via raea <Grade>; grain has no clean raea equivalent. Done in Blender compositor in the video (not After Effects).
---

## METADATA
05_Camera_Raea_Pipeline | 3.x | Blender Compositor + raea Grade

## CREATIVE_INTENT
Three finishing touches imitate a real camera and a film grade: a soft vignette (lens edge falloff) draws the eye in; film grain adds photographic texture; a curves grade lifts blue in the shadows and trims green in the highlights so orange/skin tones get richer, then a little extra contrast.

## STE_PROCEDURE
1. In the Compositor, add an Ellipse Mask; set its Width and Height to the frame.
2. Add a Blur node after the mask; set it to Relative, X = 40%, Y = 40%.
3. Add a Mix node set to Multiply; plug the image into the first input and the blurred mask into the second.
4. Control vignette strength with the Mix Factor.
5. Load a film-grain noise image and mix it over the result with an Overlay blend.
6. Add an RGB Curves node at the end.
7. In the Blue channel, raise the shadow end of the curve.
8. In the Green channel, add a point near the top and lower only the highlights.
9. In the Combined (C) channel, add a gentle S-curve for contrast.

## AGENT_EXECUTION
- Blender (4.x compositor; 5.x uses `scene.compositing_node_group`):
  ```python
  import bpy
  sc = bpy.context.scene
  nt = sc.compositing_node_group or bpy.data.node_groups.new("Compositor", "CompositorNodeTree")
  sc.compositing_node_group = nt                     # 5.x: the compositor is a node group assigned to the scene
  if not nt.interface.items_tree: nt.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')
  N = nt.nodes; Lk = nt.links
  rl = N.get("Render Layers") or N.new("CompositorNodeRLayers"); comp = N.get("Group Output") or N.new("NodeGroupOutput")
  em = N.new("CompositorNodeEllipseMask"); em.inputs["Size"].default_value = (0.9, 0.9)   # ~ inferred
  bl = N.new("CompositorNodeBlur"); bl.inputs["Size"].default_value = (432, 768)   # was relative 40 % × 40 % → pixels at 1080×1920 ~
  mul = N.new("ShaderNodeMix"); mul.data_type = 'RGBA'; mul.blend_type = 'MULTIPLY'; mul.inputs[0].default_value = 0.6   # ~ inferred
  img = N.new("CompositorNodeImage"); img.image = bpy.data.images.load("//grain.png")
  ov = N.new("ShaderNodeMix"); ov.data_type = 'RGBA'; ov.blend_type = 'OVERLAY'; ov.inputs[0].default_value = 0.3   # ~ inferred
  cv = N.new("CompositorNodeCurveRGB")
  Lk.new(em.outputs["Mask"], bl.inputs["Image"])
  Lk.new(rl.outputs["Image"], mul.inputs[6]); Lk.new(bl.outputs["Image"], mul.inputs[7])     # Mix RGBA: A=6, B=7, Result=outputs[2]
  Lk.new(mul.outputs[2], ov.inputs[6]); Lk.new(img.outputs["Image"], ov.inputs[7])
  Lk.new(ov.outputs[2], cv.inputs["Image"]); Lk.new(cv.outputs["Image"], comp.inputs["Image"])
  b = cv.mapping.curves[3]; b.points[0].location = (0, 0.06)            # blue shadows up   # ~ inferred
  g = cv.mapping.curves[2]; g.points.new(0.7, 0.7); g.points[-1].location = (1, 0.94)  # green highlights down   # ~ inferred
  cv.mapping.update()
  ```
  Links: `Ellipse Mask [Mask] -> Blur [Image] -> Mix(Multiply) [Image2]`, `Render Layers [Image] -> Mix [Image1] -> Mix(Overlay) [Image1]`, `Grain Image [Image] -> Overlay [Image2] -> RGB Curves -> Composite`.
- raea: `<Grade vignette={{ intensity: 0.3, radius: ~0.8, smoothness: ~0.5 }} shadows={{ lift: ~0.02 }} highlights={{ gain: ~1.0 }} midtones={{ contrast: 1.12 }} temperature={~1} />` — split toning via `shadows`/`highlights` groups (cool shadows with temperature is global only; per-channel curves have no exact equivalent). Grain: raea: no equivalent (`grain` exists only on `<Look>` modes paint/site/pixel, which change the whole look).

## NOTES
- Deprecated: in 4.x+ the compositor Mix node is still `CompositorNodeMixRGB`; in 5.x the compositor uses node groups and the general Mix node.
- Values for mask size, mix factors and curve points are visual only (`~`), except blur 40% relative.
- Skipped from this tip: anamorphic/2.39 aspect-ratio talk — irrelevant for 9:16 (the source itself calls it a curiosity).
- Rule conflicts: none (Blender compositor / raea, no After Effects).
- bpy fixed for 5.3: scene.node_tree → scene.compositing_node_group (new CompositorNodeTree, Group Output replaces Composite); added `import bpy`; Ellipse Mask width/height → inputs["Size"]; Blur relative factor → inputs["Size"] in pixels (40 % of 1080×1920 ~); MixRGB → ShaderNodeMix RGBA.

## ADDENDUM — How to actually make eye-catching 3D Scenes | After Effects
Source: "Minimalist Tech & SaaS 3D Staging/How to actually make eye-catching 3D Scenes | After Effects.txt" (11:49–14:33)

Alternate/AE method for the same vignette + grade:
| parameter | this source ("eye-catching 3D Scenes", AE) |
|---|---|
| grade | Lumetri Color → Color Wheels: push Shadows toward blue; Curves: slight S-curve for contrast, "nothing over the top" — same direction (blue shadows + contrast) as this card's RGB Curves steps, confirms the recipe |
| vignette mechanism | separate adjustment layer: Radial Blur effect (amount brought down from default to 4) + an inverted, feathered Ellipse mask targeting the sides only (not centre) — functionally the same "ellipse mask + blur, multiply toward the edges" idea as this card, built with a blur-the-edges effect instead of darkening them |
| extra: edge chromatic aberration | layered on the same edge-only masked region: VC Chromatic Aberrations or the free "Quick Chromatic Aberrations 3" plugin, amount 3–5 (source tried 3, settled near 5) — paired with the vignette mask so the fringe only shows at the edges, not the whole frame |

This confirms this card's shadows-blue + S-curve direction is a repeatable cross-source recipe. The "blur the edges"
vignette variant (vs. darken-the-edges) is a legitimate alternate mechanism worth noting if a setup wants a softer
edge falloff rather than a dark one; raea equivalent: a separate blurred layer clipped to an edge-only feathered
mask, same pattern as the masked-blur-for-DoF card from this source. Timestamps: 11:49–12:27 (grade + radial-blur
vignette), 12:27–12:45 (edge chromatic aberration, masked to the same region).
