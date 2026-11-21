---
title: Looping shape-key cycle (0 → 1 → 0) made infinite with Cycles F-modifier
bucket: 01_Animation_Motion
source: "6 Tips to Make Your Renders Instantly Cooler.txt"
source_time: "unknown (tip 5 of 6, bird setup)"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Transfers to objects: a wallet flexing, a lid breathing, a receipt curling — a cheap looping state change. Never apply to human figures (pose-only rule).
---

## METADATA
01_Animation_Motion | 3.x → 4.2+ | Blender shape keys + F-curve Cycles modifier → glTF morph targets → raea `<Model morphs>` / clip

## CREATIVE_INTENT
One extra shape key keyed 0 → 1 → 0 and set cyclic gives endless secondary motion with almost no work. Varying speed and adding a second cycle per copy makes duplicates read as individuals.

## STE_PROCEDURE
1. In Object Data › Shape Keys, add the Basis key (rest shape).
2. Add a second key; in Edit Mode, move the mesh into the extreme pose (wings down).
3. Keyframe the key's Value = 0 at frame 0.
4. Keyframe Value = 1 at frame 20.
5. Keyframe Value = 0 at frame 40.
6. In the Graph Editor, select all keys (A) and press Shift+E › Make Cyclic (F-Modifier).
7. Duplicate the object; on each copy change cycle length or add a second shape-key cycle so copies differ.

## AGENT_EXECUTION
```python
import bpy
from bpy_extras import anim_utils
ob = bpy.data.objects["Bird"]
if not ob.data.shape_keys: ob.shape_key_add(name="Basis")
k = ob.shape_key_add(name="Down", from_mix=False)
# ... move k.data[i].co for the wing vertices (pose authored by hand / script)
for fr, v in ((0, 0.0), (20, 1.0), (40, 0.0)):
    k.value = v; k.keyframe_insert("value", frame=fr)
ad = ob.data.shape_keys.animation_data
fc = anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves.find('key_blocks["Down"].value')
fc.modifiers.new("CYCLES")
```
glTF: shape keys export as morph targets (Export › Data › Shape Keys on). A Cycles F-modifier is not exported — bake the curve over the shot's range first (Graph Editor › Channel › Bake Channels, or `bpy.ops.graph.bake_keys()`), or drive it in raea:
```tsx
const w = 0.5 - 0.5 * Math.cos((2 * Math.PI * f) / 40);   // 0→1→0 every 40 frames, eased
<Model src={staticFile("bird.glb")} morphs={{ Down: w }} />
```
(`<Model morphs>` is listed in limits.md.)

## NOTES
- Deprecated: none. In 4.4+ actions are layered/slotted; `fcurves` access may need `action.layers[0].strips[0].channelbag(slot).fcurves` in 5.x.
- Visual gaps: the actual wing-down mesh edit is visual only.
- Rule conflicts: figures hold poses — never flap/gesture human figures; Bezier keys at 0/20/40 already ease in-out (keep them, no linear).
- bpy fixed for 5.3: action.fcurves → bpy_extras.anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves (slotted actions).
