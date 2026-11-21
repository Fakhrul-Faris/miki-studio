---
title: Scale objects in/out to appear (keyframe any property)
bucket: 01_Animation_Motion
type: master
members:
  - cards/01_Animation_Motion/keyframe-any-property-scale-appear--animate-still-renders.md
  - cards/01_Animation_Motion/scale-pop-in-overshoot--product-animation-masterclass.md
sources: ["How to Easily Animate Still Renders in Blender.txt", "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt", "Create Apple-Style UI Motion Graphics in After Effects + Free Project File.txt", "How to do SMOOTH SAAS Animation Like Creatoroly | After Effects Tutorial.txt", "How to Create Viral Apple-Style UI Widget Animations in After Effects! (Apple Masterclass Part 2).txt", "SaaS Motion Graphics Masterclass Techniques.txt"]
use_when: "a label, coin or prop growing in over ~0.4 s instead of popping"
style_fit: "strong for grow-in/grow-out (our 'grow, never pop' rule); conflict: the masterclass's 0→110 %→100 % pop in 10 frames is bouncy — use ≥ 0.4 s, overshoot none or ≤ ~3–5 %, paired with an opacity fade"
---

## METADATA
01_Animation_Motion | Blender 3.x/4.x + 4.3 (sources) → Blender 5.3 + raea | Blender bpy scale keys + raea `interpolate`/`spring` on `.withScale`

## CREATIVE_INTENT
Shared why: objects arrive and leave by scaling from ~0 to full size (and back), so nothing pops on or off; anything with a
keyframe dot can be animated the same way, and parented "contraptions" let parts interlock as objects change state on the word.
- Animate Still Renders: scale keys to appear/disappear, location keys for sliding/interlocking parts, key any property
  via its dot, parent multi-part objects first; "most good animations are this simple".
- Product Animation Masterclass: the arrival should "look like magic" — fast start, slight overshoot past 100 % and settle
  ("Out Back Cubic", 0 → 110 % → 100 %), 15 f @24 fps, or 10 f when it should pop quickly; adds an extra overshoot key if Back easing is too slow.

## STE_PROCEDURE
1. Before animating a multi-part object, parent the parts (Ctrl+P › Object, Keep Transform) so children follow.
2. At the end frame, key Scale (and Location/Rotation if they move) on the final pose.
3. At the start frame, scale to ~0 (0.001, not 0 — avoids degenerate normals) and key it.
4. Set the span to ≥ 0.4 s (house; source: 15 f @24 fps, or 10 f for a quick pop).
5. Shape the curve: keep Bezier eased in-out (house) — or, for the masterclass feel, set the first key's handle Free and raise its right handle steeply (fast start).
6. Overshoot (optional, house cap ~3–5 %): set the last key Free and raise its left handle above the end value, or insert an overshoot key at the peak (~frame 10 of 15) and slide the last two keys closer.
7. In the Graph Editor, lock all channels except Scale while shaping (select the three Scale channels, A, Numpad .).
8. Pair the scale with an opacity/emission fade so the arrival never reads as a pop.
9. To disappear, key full Scale, then key ~0 ≥ 0.4 s later.
10. Key Location the same way for parts that slide or interlock.
11. To animate any other property (emission, colour, light power), hover it and insert a keyframe on its dot.
12. In raea, give every part that comes and goes a `name`.
13. ⚠ The AE sources pair scale-in with a decaying bounce/spring EXPRESSION (oscillating, decay 7–12, or a plugin at frequency 2 / amplitude ~50 / decay ~7) — port only the shape (fast-in, one small overshoot, settle, no second oscillation), never the oscillation itself (from Apple UI Face ID, Apple UI Widget Pop-ups).
14. Pair a blurry→sharp Fast Blur (keyed, eased) with the scale-in for UI elements, resolving to 0 px as the scale completes (from Apple UI Face ID).
15. The same capped overshoot shape generalises to any track (scale, position, rotation) on one element, not scale alone — e.g. a UI card's incoming position or a flying icon's rotation can use the identical curve (from Apple UI Widget Pop-ups).
16. For a shape (not a solid object) settling in, animate its own width/height independently (not a uniform scale) for a squash/stretch "liquid" read as it settles, each axis eased with its own small capped overshoot (from SaaS Motion Graphics Masterclass).

## VALUES BY SOURCE
| parameter | Animate Still Renders | Product Masterclass | recommended for Style D (+ why) |
|---|---|---|---|
| duration | "a few frames" (not given) | 15 f @24 fps (0.63 s); quick pop 10 f | ≥ 0.4 s (~24 f @60 fps) — house grow rule |
| start scale | 0 | 0 | 0.001 (no degenerate normals) |
| overshoot | none | ~110 % at ~frame 10, then 100 % | none, or ≤ 3–5 % (bezier 0.34, 1.12, 0.64, 1) |
| curve | Bezier (eased) | Free handles, steep start; or BACK ease-out, back = 1.0 | Bezier in-out / raea inOut cubic |
| paired fade | — | — | yes, opacity/emission fade with the scale |
| other props | any keyframe dot; location for contraptions | Loc/Rot/Scale keyed together | material alpha/emissive/roughness/metallic, light intensity, fov, DoF focal_distance |

### Additional sources (folded, Phase C)
| parameter | Apple UI Face ID | Apple UI Widget Pop-ups | SaaS Motion Graphics Masterclass | recommended for Style D (+ why) |
|---|---|---|---|---|
| overshoot method | ⚠ bounce expression, decay 12/10/7 | ⚠ manual 1-extra-key spike, or Bounce R plugin (freq 2, amp ~50, decay ~7) | ⚠ same bounce expression pasted onto shape `Size` (squash/stretch) | no oscillation: one overshoot ≤ 3–5 % or none, ≥ 0.4 s (same bezier the master already uses) |
| applies to | scale + Face ID comp scale-in | scale, position, rotation — any linear-keyed property | shape's own width/height, not layer scale | capped shape generalises across scale/position/rotation/width/height |
| paired treatment | Fast Blur keyed blurry→sharp with the grow | fast-start/slow-end outer curve kept regardless of bounce (house-compliant) | reads as liquid squash, not a resize | blur 10–12 px → 0 with the grow; width/height on separate eased tracks for a shape, not shared uniform scale |
| raea | `<Animate enter="pop">` defaults 8 % — tune `pop({ peak: 1.03 })` or use `rise` | n/a — port shape only, not the plugin | animate `width`/`height` on separate eased tracks with a tiny settle overshoot | see raea block below |

## AGENT_EXECUTION
Blender 5.3:
```python
import bpy
from bpy_extras.anim_utils import action_get_channelbag_for_slot

FPS = bpy.context.scene.render.fps
IN = round(0.4 * FPS)                                    # house ~0.4 s grow

def appear(ob, f0, full=(1, 1, 1)):
    ob.scale = (0.001,) * 3; ob.keyframe_insert("scale", frame=f0)
    ob.scale = full;         ob.keyframe_insert("scale", frame=f0 + IN)

def disappear(ob, f1, full=(1, 1, 1)):
    ob.scale = full;         ob.keyframe_insert("scale", frame=f1)
    ob.scale = (0.001,) * 3; ob.keyframe_insert("scale", frame=f1 + IN)

def overshoot(ob, f0, dur, peak=1.03):                   # masterclass shape, house-capped (source: 1.10)
    ob.scale = (0.001,) * 3; ob.keyframe_insert("scale", frame=f0)
    ob.scale = (peak,) * 3;  ob.keyframe_insert("scale", frame=f0 + round(dur * 2 / 3))
    ob.scale = (1,) * 3;     ob.keyframe_insert("scale", frame=f0 + dur)
    ad = ob.animation_data
    for fc in action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves:
        if fc.data_path == "scale":
            for k in fc.keyframe_points:
                k.handle_left_type = k.handle_right_type = 'FREE'
# Alternative to the extra key: k.interpolation = 'BACK'; k.easing = 'EASE_OUT'; k.back = 1.0 (source value; lower for house)

# any property with a keyframe dot, by data path
mat = bpy.data.materials["Accent"]
mat.node_tree.nodes["Principled BSDF"].inputs["Emission Strength"].keyframe_insert("default_value", frame=48)

# contraption parenting (Ctrl+P › Object, Keep Transform)
child, parent = bpy.data.objects["lid"], bpy.data.objects["box"]
child.parent = parent; child.matrix_parent_inverse = parent.matrix_world.inverted()
```

raea:
```tsx
const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const d = Math.round(0.4 * fps);
// house default: eased grow, no overshoot
const s = interpolate(f, [at, at + d], [0, 1], { ...CL, easing: Easing.inOut(Easing.cubic) });
// optional tiny overshoot (~3 %), ≥ 0.4–0.5 s
const s2 = interpolate(f, [at, at + 0.5 * fps], [0.001, 1], { ...CL, easing: Easing.bezier(0.34, 1.12, 0.64, 1) });
// or no-overshoot spring: spring({ frame: f - at, fps, config: { damping: 200 } })
<Sequence from={at} layout="none">
  <Mesh3d name="coin" transform={Transform.fromXyz(0, 0.3, 0).withScale(Math.max(0.001, s))}>…</Mesh3d>
</Sequence>
// parts that move together: nest in <Entity transform>; other animatable props: material base_color / alpha / emissive /
// perceptual_roughness / metallic, light intensity, camera fov, DepthOfField focal_distance
```

## NOTES
- Deprecated: `Action.fcurves` → channelbag (5.x); 4.4+ Insert Keyframe menu changed (I inserts preference channels, K
  opens Keying Sets) — `keyframe_insert` in Python unchanged. "Out back cubic" is DaVinci Resolve's name; Blender = Back
  easing or a manual overshoot key.
- Visual gaps: Still Renders' contraption rigs are shown only on screen and give no frame count; masterclass handle drags
  are visual (110 %, 15 f and 10 f are stated).
- Rule conflicts (strictest wins): no bouncy/pop motion — never the 110 % rebound in 10 frames, no Back/Elastic easing or
  low-damping `spring`; grow from ~0 over ≥ 0.4 s, overshoot none or ≤ ~3–5 %, with an opacity fade. The Still Renders
  "linear" advice is for the camera only and is overridden by our easing rule too. Apple UI Face ID/Widget Pop-ups'
  decaying bounce expressions and SaaS Masterclass's reused bounce-on-Size expression are the same banned oscillating
  spring family — ported here only as the capped single-overshoot shape, applied across whichever track(s) fit
  (scale, position, rotation, width/height).
