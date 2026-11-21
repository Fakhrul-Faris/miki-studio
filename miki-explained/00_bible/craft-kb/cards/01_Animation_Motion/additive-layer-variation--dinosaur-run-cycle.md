---
title: Additive layer for pose changes and variation on top of finished (or mirrored) motion
bucket: 01_Animation_Motion
source: "Animation Masterclass- How to Create a Dinosaur Run Cycle in Maya.txt"
source_time: "50:04–50:32, 1:17:39–1:18:37, 1:38:21–1:39:54"
blender_version_source: n/a (Maya)
tool_target: principle-only
tier: principle
style_fit: Lets a mirrored/duplicated object (left/right doors, twin coins, multiplied items) keep shared timing but not look cloned; also a safe way to re-pose a hero after a user's .blend edit without re-keying.
---

## METADATA
01_Animation_Motion | n/a (Maya source; Blender 4.2+ / raea translation) | principle-only

## CREATIVE_INTENT
Principle: after copying or mirroring motion, put a small static offset on an additive layer so the copy differs slightly in pose while keeping the same timing; the same layer re-poses finished motion (raise the head, change a pose) without touching the base keys. Exact mirrors feel mechanical — add a little variation.
Ideas for us: multiplied objects (ten coins appear) share one move but each gets a tiny additive rotation/height offset; a hero's whole flight raised 2 cm on a layer instead of editing every key; mirrored panels opening with a few degrees' difference.

## STE_PROCEDURE
1. Before varying, copy or mirror the base motion (AnimBot "mirror all keys" for the left arm and fingers).
2. Select the copied controls and add a new animation layer.
3. Key once on the layer and change the pose slightly (left arm and clavicle back "a tiny bit").
4. Keep the difference small — in a broad sense both copies must still do the same thing.
5. For animated chains (tail), prefer posing straight ahead instead of mirroring halves, so small variations survive.

## AGENT_EXECUTION
### Source tool (Maya)
- Channel Box → Animation Layers → "Create layer from selected"; key with S on the layer; layer mode Additive (default).

### Blender / raea translation
Blender (NLA additive strip over the base action):
```python
import bpy
obj = bpy.context.object                   # the object that carries the finished base action
ad = obj.animation_data
base = ad.nla_tracks.new(); base.strips.new("base", 0, ad.action); ad.action = None
off_act = bpy.data.actions.new("offset")
lay = ad.nla_tracks.new(); s = lay.strips.new("offset", 0, off_act)
s.blend_type = 'ADD'                       # additive layer
s.action_frame_start, s.action_frame_end = 0, 1
s.extrapolation = 'HOLD'                   # hold the static offset for the whole range
# key the offset values into off_act (e.g. rotation_euler[2] = 0.05)
```
(Blender 4.4+ also has Action layers/strips in the slotted-action model; NLA ADD is the stable path in 4.2–5.x.)
raea (base function + per-instance offset, seeded so it holds still per frame):
```tsx
const seed = (i: number) => ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;   // deterministic, not Math.random()
{coins.map((c, i) => (
  <Mesh3d key={i} name={`coin-${i}`}
    transform={Transform.fromXyz(c.x, rise(f - i * 2) + 0.002 * seed(i), c.z)
      .withRotation(Quat.fromEuler("XYZ", 0, 0.08 * (seed(i + 7) - 0.5), 0))}>…</Mesh3d>
))}
```

## NOTES
- Transfers: additive offsets over shared motion, re-posing without re-keying, avoid perfect mirrors. Dropped: arm/finger animation details (character gestures — our figures never gesture).
- Visual gaps: the layer offset amounts are by eye.
- Rule conflicts: none; `Math.random()` per frame would flicker in raea — seed it (raea skill rule 1).
- bpy fixed for 5.3: incomplete snippet: added `import bpy` and `obj = bpy.context.object`; NlaStrip.extend_mode → NlaStrip.extrapolation.
