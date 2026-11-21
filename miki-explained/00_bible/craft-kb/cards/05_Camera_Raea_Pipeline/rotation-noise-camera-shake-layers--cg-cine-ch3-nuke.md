---
title: Camera shake on rotation only — base + high-frequency noise layers, ramped by proximity
bucket: 05_Camera_Raea_Pipeline
source: "CG Cinematography 101 | Chapter 3 | Camera Analysis (The Nuke).txt"
source_time: "29:21–33:43"
blender_version_source: n/a (Houdini)
tool_target: principle-only
tier: principle
style_fit: "conflict: visible shake is outside our smooth camera language; keep only the principle (shake = pivot rotation, never translation) for a near-invisible tremor if ever used"
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Houdini source) | principle → Blender bpy + raea

## CREATIVE_INTENT
Principle (from live-action experience): real camera shake is almost never the camera translating up/down/left/right; it is the camera rotating about its own pivot. So shake goes on rotation channels only. Two noise layers: a slow "base" shake and an offset "high-frequency" shake. Shake intensifies as the camera gets closer to a moving subject, as if inheriting its motion. Ideas: none needed for Style D finals; useful if a deliberately "documentary" beat is ever approved.

## STE_PROCEDURE
Method:
1. Duplicate the camera transform as a "shake" layer; remove its keys and clean transforms.
2. Confirm its pivot is the camera position.
3. Add a noise to the rotation channels only (never translate).
4. Set the base layer to a longer period (source: ~5, after trying 3 and 10; units `~` frames).
5. Duplicate as a "high shake" layer with a shorter period and a different offset (source: 2–3) so it doesn't repeat the base.
6. Animate the noise amplitude up (source: to 2) as the camera nears the subject.
How-to:
7. Turn off heavy display options to judge the shake at real-time playback.

## AGENT_EXECUTION
### Source tool (Houdini)
- Channel editor: select rotation channels → Motion Effects > Noise (creates a CHOP noise; parameters period, amplitude, offset). Base: period ~5. High: separate noise, offset 2/3. Amplitude keyed to 2 while zooming in. Values are partly garbled in speech; treat as `~`.
### Blender / raea translation
- Blender: on `CAM_shake.rotation_euler` F-curves add two Noise modifiers: base `scale=~40, strength=~0.004`; high `scale=~6, strength=~0.0015, phase=7.3`; ramp with `mod.use_influence = True; mod.influence` keyed 0→1 (`~` all values).
- raea (deterministic, rotation-only — perturb the aim point, not the eye):
  ```tsx
  const amp = interpolate(f, [f0, f1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * 0.002; // rad, tiny
  const n = (k: number) => Math.sin(f*0.13 + k)*0.6 + Math.sin(f*0.71 + 2.3*k)*0.25;   // base + high
  const aim: [number, number, number] = [tx + n(1)*amp*dist, ty + n(2)*amp*dist, tz];
  <Camera3d transform={Transform.fromXyz(...eye).lookingAt(aim)} projection={{ Perspective: { fov } }} />
  ```

## NOTES
- See also subtle-handheld-camera-shake--animate-still-renders (default: off).
- Rule conflicts: no shake in Style D by default; if approved, below the threshold where a viewer can name it, never on a cut or word hit.
