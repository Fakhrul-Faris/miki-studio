---
title: Graduated fisheye via Panoramic camera (Fisheye Lens Polynomial)
bucket: 05_Camera_Raea_Pipeline
source: "How To Get Super Wide Angle Shots in Blender.txt"
source_time: "00:37–05:01"
blender_version_source: 3.x/4.x (Fisheye Lens Polynomial described as "somewhat new")
tool_target: Blender bpy | raea
tier: principle
style_fit: usable as a rare, subtle edge-bend on a wide establishing setup; in raea it is <Fisheye>/<LensDistortion>, and must be eased in/out, never snapped or used as a flashy transition
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x–4.x source; API below for 4.2+ | Blender bpy (Cycles panoramic camera) → raea post lens

## CREATIVE_INTENT
Principle: a Perspective lens keeps straight lines straight to the frame edge; a Panoramic fisheye bends them around the
edges, which makes a wide shot feel fun, immersive and "shot on a real wide lens". Ideas: a dial between none and extreme —
pull distortion back so only the edges curve; the default Fisheye Equisolid at the same mm is far too extreme; keep it subtle,
because an extreme fisheye "can ruin things".

## STE_PROCEDURE
1. Select the camera and open Object Data Properties (camera).
2. Set Lens > Type from Perspective to Panoramic.
3. Note: the default Panorama Type is Fisheye Equisolid; at the same Focal Length (20 mm) it looks extreme.
4. Set Panorama Type to Fisheye Lens Polynomial.
5. Adjust K1 to set the effective focal length / zoom amount (per the video; value by eye, unknown (visual only)).
6. Adjust K2 to set the amount of distortion around the frame edge (value by eye, unknown (visual only)).
7. Pull K2 back until the edges only warp a little — between "perspective-like" and the default panoramic look.
8. Before you commit, compare against a Perspective render in a second render slot to judge the edge bend.
- Method note (from 01:50–02:30): changing focal length is not the same as moving the camera — zooming keeps perspective,
  moving the camera changes it (see `focal-length-zoom-vs-camera-move--super-wide-angle`).

## AGENT_EXECUTION
### Blender (4.2+; Cycles only)
```python
import bpy
cam = bpy.context.scene.camera.data
bpy.context.scene.render.engine = 'CYCLES'          # panoramic cameras are Cycles-only; EEVEE draws them as perspective
cam.type = 'PANO'
cam.panorama_type = 'FISHEYE_LENS_POLYNOMIAL'      # default when switching is 'FISHEYE_EQUISOLID'
# polynomial coefficients k0..k4; the video only says "K1 ≈ focal length, K2 ≈ edge distortion"
cam.fisheye_polynomial_k1 = cam.fisheye_polynomial_k1   # tune by eye (unknown (visual only))
cam.fisheye_polynomial_k2 = cam.fisheye_polynomial_k2   # tune by eye (unknown (visual only))
```
Blender is never our final renderer, so treat this only as a look-dev reference; the shipped effect lives in raea.

### raea translation (render time)
```tsx
import { track } from "raea";
import { Fisheye, LensDistortion } from "raea/3d";
// subtle barrel on the 3D only, corners stay filled
<LensDistortion k1={0.12} k2={0} />           // k1 0.1–0.4 = barrel; ~0.1 for "edges warp a little"
// or a true fisheye that ramps in and out on a beat (strength 0 = the camera's own picture)
<Fisheye strength={0} fov={110} mode="stereographic" animate={{ strength: track({ 0: 0, 24: 0.35, 60: 0.35, 84: 0 }, "in-out-sine") }} />
```
- `mode="stereographic"` is gentler at the edges (closest to "pulled back K2").
- The page (captions, HTML) is never bent; make words 3D (`Text3D`/`ImagePlane`) if they must pass through the lens.

## NOTES
- Deprecated: in Blender 3.x the panorama settings lived on `cam.cycles.panorama_type` / `cam.cycles.fisheye_*`;
  since 4.0 they are on `cam` (Camera data) directly.
- Visual gaps: actual K1/K2 numbers are set by eye on screen; the video gives none. The Panorama Type dropdown contents
  are shown, not read out.
- Rule conflicts: never animate the fisheye as a pop or whip; ramp `strength` with an in-out ease over ≥ ~0.4 s. Keep it
  off the macro hero shots (Style D macro wants a product lens ~30–40° vertical FOV, not edge bend).
