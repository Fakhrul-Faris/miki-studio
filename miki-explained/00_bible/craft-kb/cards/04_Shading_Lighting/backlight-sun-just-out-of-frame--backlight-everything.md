---
title: Backlight with the source just out of frame — interest lives in the edges
bucket: 04_Shading_Lighting
source: "Backlight Everything - A Cinematographer's Hammer.txt"
source_time: "00:58–04:40, 18:03–18:35"
blender_version_source: n/a (live-action cinematography)
tool_target: principle-only
tier: principle
style_fit: Fits Style D — one soft top/back key just out of frame rims the hero object against a dark room; front light flattens it.
---

## METADATA
04_Shading_Lighting | n/a (live-action) | principle → Blender bpy + raea

## CREATIVE_INTENT
Principle: light from behind the subject with the sun (key) just outside the top of the frame. You shoot into the shadow side, so most of the frame is dark and the subjects get thin bright edges — "the interest is in the edges". Contrast creates depth and excitement; front light from behind the camera kills the edges, fills everything and looks "like Christmas lights on the trees". The source must stay out of frame or it wrecks the contrast. Ideas: every Style D setup checks "where is the key relative to the lens?" — key behind/above the object, camera on the shadow side.

## STE_PROCEDURE
Method:
1. Place the key light behind the subject, opposite the camera, slightly above.
2. Keep the key source itself outside the frame (just above or beside it).
3. Frame so the camera looks into the shadow side; most of the frame stays dark.
4. Check the subject's silhouette carries a thin bright rim.
5. If the subject is flat and evenly lit, the key has drifted toward the camera; move it back.
How-to:
6. On set the source plans the schedule with a sun app (Artemis / Sun Seeker; STT-uncertain names) so the sun sits just out of frame for the whole shooting window; in 3D, simply place the light.

## AGENT_EXECUTION
### Source tool (live-action set)
- Low sun just above frame behind the action; shoot wides first in the window (e.g., 3:15–4:00 pm) while the sun is in position; avoid times when the sun drops behind trees (subjects then need fake light).
### Blender / raea translation
- Blender: place the key opposite the camera: `key.location = hero + (hero - cam.location).normalized() * d + Vector((0,0,h))`, aim with a Track To constraint at the hero; check it is outside the camera frustum with `world_to_camera_view` (x or y outside 0..1, or z < 0).
- raea:
  ```tsx
  // camera at C, hero at H; key behind and above H, out of frame
  const back = norm(sub(H, C));                       // helper: your vector math
  const K = add(H, add(scale(back, 1.2), [0, 0.9, 0]));
  <SpotLight transform={Transform.fromXyz(...K).lookingAt(H)} intensity={900000} outer_angle={0.5} inner_angle={0.25} soft_shadows_enabled shadow_maps_enabled radius={0.3} />
  <AmbientLight brightness={40} />
  ```
  For a top-back key under BlendShot, place the Blender area light the same way; the export carries it.

## NOTES
- Visual gap: the shot-by-shot framing references ("this edge", "over here") point at the on-screen commercial and are not reconstructable from speech.
- STT: "Artemis" and "Sun Seeker" are likely the director's viewfinder app and the sun-path app; unverified.
- Rule conflicts: none; no people in our street scenes, the subject is an object.
