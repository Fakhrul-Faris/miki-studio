---
title: Procedural "liquid gradient" material (wiggling colour patches + blur) for a glowing colourful surface
bucket: 04_Shading_Lighting
source: "Procedural Mograph & 3D-to-AI Render Passes/Quick & Easy Ways to Level Up Your Animation Styles | Motion Design Pro Tips | Motion Circles.txt"
source_time: "04:12–05:21 (gradient build), 07:41–08:46 (glow/dimension layer), 09:00–09:56 (curves/deep-glow/vibrance stack)"
tool_target: raea
tier: principle
use_when: "a flat-coloured hero face or panel needs a soft, slowly-shifting multicolour glow instead of a static flat fill"
style_fit: "Translated from a 2D AE fake-3D workaround into a real material: in raea this is an animated emissive texture or shader on a real mesh face, not a precomposed 2D layer stack. Keep saturation low except where the brand accent should read."
---

## METADATA
04_Shading_Lighting | After Effects (wiggle + box blur on shape layers, track matte per face) | raea animated emissive texture / shader param

## CREATIVE_INTENT
A flat single-colour fill on a product face reads as cheap. The source builds a "liquid gradient" by scattering several
circles, each with position wiggle (1 wiggle/second, 200px amount), then heavily blurring the whole stack (70% box blur
radius) — the result is a soft, slowly-morphing multicolour gradient rather than a static one. It's then track-matted onto
each face of a 3D shape so every face gets its own cropped slice of the same moving gradient, and finished with Inner Glow
(edge brightening) and a Curves/Deep Glow/Vibrance stack for a saturated, glowing final look. The AE 3D (six flat solids +
track mattes + layer styles) is a 2D workaround for lacking real 3D — in raea the hero is already real geometry, so the
per-face isolation step is dropped entirely; only the moving-gradient-texture idea and the glow/colour finishing transfer.

## STE_PROCEDURE
1. Before building the gradient, decide which real surface(s) will carry it (a real mesh face, not a flat AE solid).
2. Generate several soft colour blobs at random positions across a square texture.
3. Animate each blob's position with a small, slow continuous drift (source: ~1 cycle/second, ~200px amount at 1080px scale — i.e. drift amplitude ≈ 18% of the texture size).
4. Heavily blur the whole blob layer (source: ~70% box-blur radius) so individual blobs merge into soft colour fields, not visible circles.
5. Bake or render this as a looping texture (or drive it live as a shader) rather than a one-off still.
6. Apply the texture as the emissive/base colour of the real hero face(s) — no per-face track-matte isolation needed on real 3D geometry.
7. Add an edge brightening pass (source: Inner Glow, darken blend, opacity 75%, size 100 at 1080px scale ≈ 9% of frame) for edge definition.
8. Finish with a contrast/saturation pass: darken the midtones first (Curves) before adding any bloom, then push saturation/vibrance, so the glow doesn't overexpose.

## AGENT_EXECUTION
**raea:** the moving blob-gradient as a baked looping texture or a live shader; the per-face/edge-glow finishing as real
material properties plus `<Bloom>`, never AE layer styles:
```tsx
// live variant: a small number of soft radial colour fields, drifting slowly, summed per-pixel in a fragment shader
// (see raea-bevy/SKILL.md materials.md for custom shader wiring); baked variant: render the AE-equivalent recipe once
// to a looping PNG/video sequence and use it as an emissive_texture — cheaper, and avoids a live shader for a background prop.
<Mesh3d name="hero-face">
  <StandardMaterial
    base_color="#0a0a0c"
    emissive_texture={staticFile("liquid_gradient_loop.png")}   // baked: wiggling blobs + heavy blur, pre-rendered
    emissive={LinearRgba.from(Srgba.hex("#ffffff")).mul(2.5)}   // ~ overall glow strength, tune against Bloom
  />
</Mesh3d>
<Bloom intensity={0.5} threshold={0.85} />   {/* replaces Deep Glow */}
<ToneMapping mode="agx" />                    {/* a Curves-like darken-first pass before the bloom blows out */}
```
Edge brightening (replaces Inner Glow + Bevel/Emboss): use real bevelled geometry (bevel-modifier-angle-vs-weight-limit
card) plus a thin RectLight or the rim-light recipe (backlit-disk-rim-light card) along the hero's edges — these give a
true edge highlight from real geometry and lighting, not a 2D layer-style fake.

### Worked example
Topic: "produk baharu, kemasan premium" (illustrative; a product's packaging face should feel rich, not flat-printed).
BEFORE: `| 5 | "kemasan premium" | product face is a flat single-colour print | — | — |` — reads cheap, static.
AFTER: `| 5 | "kemasan premium" | macro on one face of the packaging; a slow-drifting soft multicolour gradient glows faintly under the label (desaturated except the brand's own accent colour), edges picked out by a thin rim light | gradient keeps drifting continuously (not tied to a word); label logo fades in on "kemasan premium" | animated-wiggle-blur-gradient-material--level-up-animation-styles |`

### Check
- Is the gradient texture built once (baked or shader) and reused, not regenerated per shot?
- Is the drift slow and continuous (no sudden jumps), matching the house's no-flashy-transitions rule?
- Is saturation kept low except where the brand accent is meant to read?
- Is any edge highlight built from real bevelled geometry + a rim light, not a 2D Inner Glow/Bevel-Emboss fake?

## NOTES
- Visual gaps: exact blob count, colours and blur radius beyond the stated 70% are shown on screen only.
- Rule conflicts: none in principle (a slow ambient glow fits a "premium" beat); keep saturation restrained to protect
  the one-accent rule.
- Dropped (AE-only, no transfer value): Leave Color + Linear Color Key to isolate one AE "face" by colour for track-matte
  texturing is a workaround for 2D shape layers faking 3D — real 3D geometry in Blender/raea already has per-face material
  slots natively, so this step is simply skipped, not translated. Likewise the six-flat-solid "cube" construction itself
  is replaced by a real cube mesh. The 90%→50%→120% anticipation/overshoot scale entrance on the pyramid is covered by
  scale-pop-in-overshoot--product-animation-masterclass.md and anticipation-dip-before-match-cut--ae-morph-match-cuts.md
  (a simpler variant of both) — not re-carded here. The staggered grid-line secondary animation is covered by
  staggered-pop-in-sequence--product-animation-masterclass.md.
