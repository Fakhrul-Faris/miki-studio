---
title: Handheld camera shake (rotation noise layers / Shakify)
bucket: 01_Animation_Motion
type: master
members:
  - cards/05_Camera_Raea_Pipeline/camera-shakify-handheld-shake--cinematography-next-level.md
  - cards/01_Animation_Motion/noise-amplitude-by-proximity-and-lens--cg-cine-ch4-chase.md
  - cards/01_Animation_Motion/procedural-handheld-noise-layer--cg-cine-ch2-camera-breakdown.md
  - cards/05_Camera_Raea_Pipeline/rotation-noise-camera-shake-layers--cg-cine-ch3-nuke.md
  - cards/05_Camera_Raea_Pipeline/subtle-handheld-camera-shake--animate-still-renders.md
sources: ["Take your Blender Cinematography to the Next Level!.txt", "CG Cinematography 101 | Chapter 4 | Camera Analysis (The Chase).txt", "CG Cinematography 101 | Chapter 2 | Basic Camera Breakdown.txt", "CG Cinematography 101 | Chapter 3 | Camera Analysis (The Nuke).txt", "How to Easily Animate Still Renders in Blender.txt", "Cinematic Camera Movements Blender Tutorial.txt"]
use_when: "adding life to a held macro shot or a close pass, scaled by proximity"
style_fit: "conflict: Style D camera is smooth, eased, tripod-feel macro — DEFAULT OFF; if used, only an imperceptible rotation-only breathing drift (≤ ~0.002 rad) on holds ≥ 2 s, never on a flight, cut or word hit, never visible shake"
---

## METADATA
01_Animation_Motion | Blender 3.x/4.x add-on + Houdini Noise CHOPs (sources) → Blender 5.3 F-curve Noise modifiers + raea deterministic per-frame drift | Blender bpy + raea

## CREATIVE_INTENT
Shared why: a perfectly still CG camera reads fake; a separate, tiny, rotation-only noise layer says "a real camera in a
real place" while the designed move stays clean and can be tuned or removed on its own.
- Cinematography Next Level: Camera Shakify add-on, preset "Investigation", default strength too high — lower it; tripod shots never shake.
- Animate Still Renders: Shakify "Walk to the Store" at Influence 0.1–0.2; add-on-free route = Noise F-modifier; "optional, depends on the look".
- CG Cine ch2: shake lives on its own duplicated "shake" transform layer with rotation noise (period ~3); duplicate the setup per rig, don't relative-reference it.
- CG Cine ch3: real shake is the camera rotating about its own pivot, never translating; two layers — slow base (period ~5) + offset high-frequency (2–3); amplitude ramps up (to 2) as the camera nears the subject.
- CG Cine ch4: one layer per job — base handheld, proximity layer keyed up on close passes, lens layer keyed down on telephoto (same amplitude looks exaggerated on a long lens).
Transferable rule for us: any residual camera motion scales with proximity (near = more) and focal length (tele = less).

## STE_PROCEDURE
1. Before adding any shake, confirm the setup holds ≥ 2 s, is not a flight, and the user wants it (house default: off).
2. Insert a "shake" layer between the designed move and the camera (an empty CAM_shake: child of CAM_dolly, parent of the camera); clean its transforms; its pivot is the camera position.
3. Add noise to the rotation channels only — never to translation.
4. Set the base layer to a slow period (source: ~5 after trying 3 and 10; Blender Noise `scale` ~40 frames).
5. Add a second, high-frequency layer with a shorter period and a different phase/offset so it doesn't repeat the base.
6. Add a proximity control: restrict the Noise modifiers' frame range to where the subject passes close, with blend in/out.
7. Add a lens control: key the amplitude down while the focal length is long.
8. Lower amplitude/influence until the shake is below the threshold where a viewer can name it (source: Influence 0.1–0.2).
9. Review wide and tele sections separately at real-time playback (turn off heavy display options) and balance the layers.
10. For a second rig, add its own noise; never link it by relative reference (edits would affect both).
11. Leave tripod-style setups, flights and every cut/word hit without shake.
12. With the add-on instead: install Camera Shakify (Get Extensions), Camera Properties › Camera Shakify › +, pick a preset, lower Influence and Scale.
13. Alternative build: a Noise F-modifier on each rotation channel (X, then Y, then Z) separately, not location, raise scale first then lower strength until barely visible — source settles on strength ~0.03, far above the house cap, so lower further still (from Cinematic Camera Movements).

## VALUES BY SOURCE
| parameter | Next Level (Shakify) | Still Renders | CG ch2 | CG ch3 | CG ch4 | recommended for Style D (+ why) |
|---|---|---|---|---|---|---|
| tool | Shakify "Investigation" | Shakify "Walk to the Store" / Noise mod | Houdini Noise on "shake" layer | 2 Noise CHOPs on rotation | 3 Noise layers | Noise F-modifier / raea sum-of-sines (deterministic, add-on-free) |
| channels | add-on (rot+loc) | rotation | rotation | rotation only, never translate | camera transforms | rotation only (perturb aim point in raea) |
| strength | default too high, lowered | Influence 0.1–0.2 | "5, probably 4" (unit unclear) | amplitude up to 2 (~) | keyed, shown not given | ≤ ~0.002 rad (imperceptible) |
| period | preset | Noise scale large (~40 f) | ~3 | base ~5, high 2–3 | — | base ~40 f, high ~6 f @Blender; raea f·0.09–0.13 and f·0.037–0.71 |
| ramp | none | none | none | amp keyed up near subject | proximity up, tele down | amp ∝ near-ness × 35/focal |
| where | not on tripod shots | optional | whole shot | whole shot, ramps | chase passes | holds ≥ 2 s only; never on flights/cuts |

### Additional source (folded, Phase C)
| parameter | Cinematic Camera Movements | recommended for Style D (+ why) |
|---|---|---|
| method | Noise F-modifier per rotation channel on an already animated camera | same mechanism, already the master's add-on-free route |
| strength | "0.03 tends to be good" | ⚠ far above the house ≤ ~0.002 rad cap; keep the default off |
| scale | "increase the scale a bit" (value not given) | ~40 f base, matching this master |
| purpose | intensify mood / realism | only if the user explicitly asks for a documentary feel |

## AGENT_EXECUTION
Blender 5.3 (add-on-free; two Noise modifiers per rotation channel on the shake empty, influence keyed for proximity/lens):
```python
import bpy
from bpy_extras.anim_utils import action_get_channelbag_for_slot

shake = bpy.data.objects["CAM_shake"]                    # child of CAM_dolly, parent of the camera
for i in range(3):
    shake.keyframe_insert("rotation_euler", index=i, frame=bpy.context.scene.frame_start)
ad = shake.animation_data
for fc in action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves:
    if fc.data_path != "rotation_euler":
        continue
    base = fc.modifiers.new('NOISE')
    base.scale = 40.0; base.strength = 0.004; base.phase = fc.array_index * 13.7     # ~ slow base
    high = fc.modifiers.new('NOISE')
    high.scale = 6.0; high.strength = 0.0015; high.phase = 7.3 + fc.array_index * 3.1  # ~ high-frequency
    for m in (base, high):  # proximity ramp: F-modifier props can't be keyed, so restrict the range and blend in/out
        m.use_restricted_range = True
        m.frame_start, m.frame_end = 40, 90            # ~ frames where the subject passes close
        m.blend_in, m.blend_out = 12, 12               # ~ eased ramp up/down (frames)
        m.use_influence = True; m.influence = 0.5      # ~ lower on tele shots
```
Camera Shakify itself is GUI-driven (`camera.camera_shakes` via the add-on); its Python API is not given in any source.

raea (deterministic sum of sines from the frame — never `Math.random()`; rotation-only = perturb the look-at point, not the eye):
```tsx
const f = useCurrentFrame();
const d = Math.hypot(sub[0] - eye[0], sub[1] - eye[1], sub[2] - eye[2]);          // camera–subject distance
const near = interpolate(d, [0.3, 2.0], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const lensK = 35 / focalMm;                                                       // tele → smaller
const ramp = interpolate(f, [f0, f1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const amp = 0.002 * (0.3 + 0.7 * near) * lensK * ramp;                            // radians, imperceptible
const n = (k: number) => Math.sin(f * 0.11 + k) * 0.6 + Math.sin(f * 0.047 + 2 * k) * 0.4;   // base + slower layer
const aim: [number, number, number] = [tgt[0] + n(1) * amp * d, tgt[1] + n(2) * amp * d, tgt[2]];
<Camera3d transform={Transform.fromXyz(...eye).lookingAt(aim)} projection={{ Perspective: { fov } }} />
```
raea has no Shakify component; the above is the only form. Set `amp = 0` during flights and on cut/word-hit frames.

## NOTES
- Deprecated: Blender 4.2+ distributes add-ons as Extensions (check Shakify's current distribution); `Action.fcurves` → channelbag in 5.x.
- Visual gaps: Shakify preset list and default Influence/Scale numbers are on screen only; Houdini noise parameters are typed on screen with units not spoken (periods 3/5/10, amplitude 2, "five, probably four" partly garbled — treat as `~`); ch4 amplitude curves shown not given (~14:05–15:45, ~17:08–19:33).
- Rule conflicts (strictest wins): no visible shake in Style D — reads as rushed, amateur handheld in a macro product look; "intensifying" jitter conflicts with smooth eased camera rules. Allowed only as a barely perceptible breathing layer on long holds, below the level a viewer can name, never on top of a flight, never on a cut or word hit, never as an energy effect. Default: off. The transferable part is the scaling logic (proximity, lens) and "rotation, not translation".
