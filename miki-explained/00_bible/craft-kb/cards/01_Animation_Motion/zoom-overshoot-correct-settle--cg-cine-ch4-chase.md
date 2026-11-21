---
title: Operated zoom: animate focal length, overshoot the framing slightly, then correct
bucket: 01_Animation_Motion
source: "CG Cinematography 101 | Chapter 4 | Camera Analysis (The Chase).txt"
source_time: "12:34–14:55, 25:48–26:29"
blender_version_source: n/a (Houdini)
tool_target: principle-only | Blender bpy | raea
tier: principle
style_fit: "conflict: no snap-back pushes / crash zooms / bounce" — only a very small, slow re-frame after a zoom survives our rules.
---

## METADATA
01_Animation_Motion | n/a (Houdini) → Blender 4.2+ / raea | principle + translation

## CREATIVE_INTENT
Principle: the "JJ Abrams zoom": animate only the focal length to zoom in, and as the zoom ends let the camera overshoot its aim (tilt down a bit too far), then correct to regain composition balance, as a real operator re-finds the frame. Faster sequences correct sooner. A zoom also needs its own, lower noise amplitude (see noise card).
Ideas: for us, the useful part is the late, gentle re-frame after a focal-length change, not the overshoot.

## STE_PROCEDURE
Method:
1. Animate focal length from wide to tele over the zoom.
2. Near the end of the zoom, key the tilt slightly past the final framing.
3. Key a correction back to the balanced framing a few frames later.
4. For faster shots, place the correction sooner.
5. Reduce shake amplitude while zoomed in.

## AGENT_EXECUTION
### Source tool (Houdini)
Camera focal length keyed; tilt keys on the main camera (or a separate "correction" camera transform, which the author recommends) for the overshoot and correction.
### Blender / raea translation
Blender: `cam.data.lens` keyed (e.g. 35 → 85, ~); tilt keys on the rotation layer.
raea (fov is per frame):
```tsx
const focal = interpolate(f, [0, 24], [35, 85], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const fov = 2 * Math.atan(24 / (2 * focal));         // vertical, 24 mm sensor height
// re-frame: settle without passing the target (critically damped, no overshoot)
const settle = spring({ frame: f - 18, fps, config: { damping: 200 } });
const aim: V3 = [hero[0], hero[1] + 0.02 * (1 - settle), hero[2]];
```

## NOTES
- Deprecated: none.
- Visual gaps: the overshoot/correct curves are tuned on screen (~09:52–14:05).
- Rule conflicts: overshoot-and-snap-back is explicitly banned (bounce, snap-back pushes, crash zooms). Use only a critically damped settle (no pass beyond target) and a zoom eased in-out; the video's "very cool" fast zoom is not for us.
