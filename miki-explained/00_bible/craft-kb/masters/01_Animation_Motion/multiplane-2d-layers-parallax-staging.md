---
title: Multiplane — flat 2D/image layers staged at different Z depths for real camera parallax
bucket: 01_Animation_Motion
type: master
members:
  - cards/01_Animation_Motion/multiplane-2d-layers-in-3d-space--japanese-studios-cg.md
  - cards/05_Camera_Raea_Pipeline/parallax-depth-card-staging-scale-to-preserve-size--eye-catching-3d-scenes.md
sources: ["Japanese Studios CG 2D Animation.txt", "How to actually make eye-catching 3D Scenes | After Effects.txt"]
use_when: "a flat 2D background/element needs real camera parallax, or a whole 2.5D scene is built from flat layers, without full 3D geometry"
style_fit: Real Style D hero builds stay full 3D; this is for supporting layers only — board/animatic quick-builds, flat graphic UI backdrops, distant backgrounds, icon rows. Scale each layer up as it's pushed back so it doesn't look like it shrank; add motion blur once staged so the move reads as one cohesive space, not flat cards sliding.
---

## METADATA
01_Animation_Motion / 05_Camera_Raea_Pipeline | Japanese anime studio pipeline (Blender) / After Effects 3D layers (general 2.5D method) | raea `<ImagePlane>` staged at depth + `<Camera3d>`

## CREATIVE_INTENT
Classic multiplane-camera technique done in 3D: split a flat 2D image into its depth elements (background, mid,
foreground), put each on its own flat plane, and place those planes at different distances from the camera. Moving
the camera through the stack gives real parallax (near layers shift faster than far ones) for a fraction of the cost
of modelling everything in 3D.
- Japanese Studios CG adds: the layout/planning use-case — separate a hand-painted background into elements by depth,
  stage the planes, move the camera, then paint over the seams so the flat-plane joins blend into the final look.
- Eye-Catching 3D Scenes adds: the scale-compensation step — because perspective shrinks far-away layers, scale each
  layer up roughly in proportion to how far it's pushed back, so each layer still reads at its intended apparent
  size; order layers back to front and add motion blur once staged.

## STE_PROCEDURE
1. Separate the 2D art into distinct elements by intended depth (background, midground, hero, foreground accents).
2. Order the layers back to front: farthest background first, hero layer, then foreground accents.
3. Place each element on its own flat plane (`<ImagePlane>` or a flat textured `<Mesh3d>`).
4. Push each layer back in Z by a different amount — enough that a camera move reveals real parallax between layers.
5. Scale each layer up in proportion to how far it was pushed back, so it doesn't look like it shrank (`scale = baseScale * (1 + k * |z|)`, tune `k` on a still). Keep the hero layer closest to its original scale/distance.
6. Move the camera through the stack; parallax between planes happens automatically from depth placement, not from manual per-layer animation.
7. Add motion blur to all layers once staged, so the camera move reads as one cohesive 3D space rather than flat cards sliding past each other.
8. If staging over hand-painted art, composite/paint over the result so the flat-plane seams blend into the final look.

## VALUES BY SOURCE
| parameter | Japanese Studios CG | Eye-Catching 3D Scenes | recommended for Style D (+ why) |
|---|---|---|---|
| layer count | foreground / midground / far background (3) | sky-bg / mid / hero / foreground icons (3–4) | 2–3 depth layers minimum, each at a distinct Z |
| depth placement | "different distances... matching their intended depth" (no numbers) | pushed back by varying amounts; example z=-6 (bg), z=0 (hero), z=+1.5 (fg) | far bg z≈-6 to -8, hero near z=0, fg accents z≈+1–2 (tune on a still) |
| scale compensation | not addressed (paint-over hides any mismatch) | scale up proportional to `\|z\|` so apparent size is preserved; example ×2.2 at z=-6, ×1.3 at z=+1.5 | `scale = baseScale * (1 + k * \|z\|)`, k tuned on a still |
| camera | moves through the stack; parallax is automatic | two-node camera flies between layers | `<Camera3d>` flight; no manual per-layer animation |
| finishing | paint over seams for a hand-painted look | motion blur across all layers for cohesion | motion blur once staged; paint-over only if the art style calls for it |
| equivalent raea prop | `<ImagePlane>` at depth | `<ImagePlane>` + proportional `transform.scale` | both combined |

## AGENT_EXECUTION
raea: build the shot as a stack of `<ImagePlane>` entities at different Z positions under one `<Camera3d>`, with
scale compensating for the push-back, and move the camera rather than animating each plane individually.
```tsx
const k = 0.18;                                            // ~ tune on a still
const layerScale = (baseScale: number, z: number) => baseScale * (1 + k * Math.abs(z));

<ImagePlane src={staticFile("bg_far.png")}
  transform={Transform.fromXyz(0, 1, -8).withScale(layerScale(1, 8))} />            {/* far layer, scaled up */}
<ImagePlane src={staticFile("bg_mid.png")}
  transform={Transform.fromXyz(0, 1, -4).withScale(layerScale(1, 4))} />             {/* mid layer */}
<ImagePlane src={staticFile("hero.png")}
  transform={Transform.fromXyz(0, 1, 0)} />                                          {/* hero: near original scale */}
<ImagePlane src={staticFile("fg_prop.png")}
  transform={Transform.fromXyz(0, 1, 1.5).withScale(layerScale(1, 1.5))} />          {/* foreground, scaled up */}

<MotionBlur shutterAngle={0.5} samples={4} />   {/* once staged, so the move reads as one space */}
```
`<Camera3d>` flies between the layers for the reveal; the AE "hold Ctrl+Alt, drag Z" batch-reposition shortcut has
no raea equivalent — set each layer's `z` and matching scale explicitly in code.

### Worked example
Topic: a laundromat's per-wash cost breakdown (illustrative numbers).
BEFORE: machine icon, coin icon and the RM label all sit on one flat plane; a camera push just zooms, no depth.
AFTER: background washer row pushed to z=-6 and scaled ×2.2; hero coin stays near z=0; foreground RM-label cards
pushed to z=+1.5 and scaled ×1.3 — a camera push now reveals real depth between the washer row, the coin and the
label as it flies past.

### Check
- Are at least 2–3 depth layers used, each at a distinct Z distance, rather than one flat plane?
- Is each layer's scale increased in proportion to how far back it sits (no layer looks like it shrank)?
- Does the camera move (not manual per-layer animation) produce the parallax?
- Does motion blur read as one cohesive space when the camera moves, not separate flat cards?
- Does the seam between flat planes and any 3D hero object stay invisible (matched lighting/scale)?

## NOTES
- Deprecated: none.
- Visual gaps: exact layer-splitting, plane placement and scale-up ratios are shown on screen in both sources, not
  stated as numbers (`~`); `k` above is a tuning starting point only.
- Rule conflicts: none — real Style D hero builds stay full 3D; this technique is for supporting flat layers only
  (backgrounds, icon rows, board/animatic quick-builds), never the hero itself.
- Overlaps `masters/05_Camera_Raea_Pipeline/layered-camera-rig.md` for the camera-side null-chaining; that master
  covers the camera rig, this one covers the layer staging/depth-layout half.
