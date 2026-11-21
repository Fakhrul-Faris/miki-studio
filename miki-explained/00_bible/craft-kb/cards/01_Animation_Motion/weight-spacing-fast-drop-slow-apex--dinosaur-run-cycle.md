---
title: Weight through asymmetric spacing (fast into the load, slow into the apex) and weight shift onto the support
bucket: 01_Animation_Motion
source: "Animation Masterclass- How to Create a Dinosaur Run Cycle in Maya.txt"
source_time: "12:23–19:02, 45:54–48:17, 58:47–1:00:20, 1:46:29–1:49:18"
blender_version_source: n/a (Maya)
tool_target: principle-only
tier: principle
style_fit: "conflict (partial): the bouncing-ball rhythm must not become a bounce; use it once, as a single settle when an object lands or takes a load, never repeated hops."
---

## METADATA
01_Animation_Motion | n/a (Maya source; Blender 4.2+ / raea translation) | principle-only

## CREATIVE_INTENT
Principle: weight reads from spacing, not from distance. The body drops fast into the "down" (load) position, then rises and slows into the top of its arc — like a ball's apex — and the mass shifts toward whatever is carrying it, with a steep value change right as the load lands.
Ideas for us: a coin stack or a parcel landing on a counter (quick final approach, short soft settle), a phone set down on a table, a scale needle that drops fast and creeps to its final reading, a product that leans slightly toward the side that takes the weight; small parts react on contact (a stack of notes fans out a touch, then gathers).

## STE_PROCEDURE
1. Before adding detail, animate only the vertical channel of the root (translate Y) to find the weight feel.
2. Key the down position 3 frames after contact (source: translate Y −30 at frame 3; contact pose was +10).
3. Key the up position past the contact height (source: +25 at frame 10).
4. Copy the down value to the opposite half's down key (frame 16) and the up value to its up key (frame 23).
5. Break the tangent on each down key and raise the incoming handle toward linear so the drop does not ease in.
6. Add a small extra key just before the apex (frames 7 and 20, a little above the line) so the rise slows into the top.
7. Add a matching rotation that drags with the drop (root rotate X ~6 at frame 7; ~−1 at the contact keys).
8. Shift the load-bearing mass toward the support: hips translate X −10.99 on frame 0, +10.99 on frame 13 (sign flipped per side); chest only ~−2 / +2.
9. Rotate toward the support with a steep change at the load key (hip rotate Z −5 at frame 3, −9 at frame 7; +5/+9 mirrored on 16/20).
10. On contact, spread small parts briefly, then gather (toe spread 0 → spread at frame 3 → 0 at frame 7 → in, ~5, mid-air → −6 at frame 23 just before the next contact).

## AGENT_EXECUTION
### Source tool (Maya)
- COG translate Y keys: 0:+10, 3:−30, 7:slightly above the 3→10 line, 10:+25, 13:+10 (copy), 16:−30 (copy), 20:small lift, 23:+25 (copy), 26:+10.
- Graph Editor: Break Tangents on 3 and 16, incoming handle up (near-linear); Pre/Post Infinity = Cycle.
- Hip: rotate Y ±11–12 (planted side), rotate Z −5/−9 then mirrored, translate X ±10.99; chest translate X ±2.
- Foot attribute "spread" on the foot control drives toe spread; AnimBot tweener "copy previous key value" to carry values forward.

### Blender / raea translation
Blender (one settle on landing; values scaled to our scene units, `~`):
```python
import bpy
from bpy_extras import anim_utils
o = bpy.context.object                       # e.g. the parcel
for fr, z in [(0, 0.30), (8, 0.0), (11, -0.006), (20, 0.0)]:   # ~ fast drop, tiny compress, slow settle (60 fps)
    o.location.z = z; o.keyframe_insert("location", index=2, frame=fr)
ad = o.animation_data
fc = anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves.find("location", index=2)
k = fc.keyframe_points
k[0].interpolation = 'BEZIER'; k[0].easing = 'EASE_IN'             # accelerate into the contact
k[1].handle_left_type = 'VECTOR'                                   # no ease into the load
k[2].handle_left_type = k[2].handle_right_type = 'AUTO_CLAMPED'
fc.update()
```
raea:
```tsx
const easeIn = Easing.bezier(0.55, 0, 1, 0.45);   // accelerate into contact
const settle = Easing.bezier(0.16, 1, 0.3, 1);    // kit/ui.tsx "out": gentle settle, no overshoot
const y = f < 8
  ? interpolate(f, [0, 8], [0.30, 0], { easing: easeIn, extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  : interpolate(f, [8, 11, 20], [0, -0.006, 0], { easing: settle, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const lean = interpolate(f, [8, 20], [0.03, 0], { easing: settle, extrapolateLeft: "clamp", extrapolateRight: "clamp" }); // radians, toward the load
<Mesh3d name="parcel" transform={Transform.fromXyz(0, y, 0).withRotation(Quat.fromEuler("XYZ", 0, 0, lean))}>…</Mesh3d>
```

## NOTES
- Transfers: fast-in/slow-apex spacing, weight leaning toward the support, contact spread. Dropped: the repeating bob of a running body (locomotion; conflicts with "figures hold poses").
- Visual gaps: the exact tangent shapes and the size of the frame 7/20 lift ("just a little") are visual only.
- Rule conflicts: our rule "no bouncy" — keep compression ≤ a few mm and never more than one settle; objects still enter with a ~0.4 s fade/grow/slide, the settle is the last ~0.2 s of it.
- bpy fixed for 5.3: action.fcurves → bpy_extras.anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves (slotted actions).
