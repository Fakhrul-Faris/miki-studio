---
title: Simple Deform modifier — Twist, Bend, Taper, Stretch on any axis for motion-graphic object morphs
bucket: 01_Animation_Motion
source: "The Power of MODIFIERS in Blender!.txt"
source_time: "03:00–03:10"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Fits Style D object morphs on the word (a receipt curls, a bar twists into a spiral, a stack tapers into a chart); must be eased in-out over ≥ ~0.4 s, no wobble.
---

## METADATA
01_Animation_Motion | 3.x → 4.2+ | Blender bpy (bake) → raea morphs

## CREATIVE_INTENT
One modifier twists, bends, tapers or stretches an object along an axis, and its Angle/Factor can be keyframed — a cheap way to make an object change shape as a motion-graphic beat.

## STE_PROCEDURE
1. Before adding the modifier, give the object enough segments along the deform axis (loop cuts or subdivision), or it cannot bend.
2. Add a Simple Deform modifier.
3. Choose the mode: Twist, Bend, Taper or Stretch.
4. Set Axis (X, Y or Z).
5. Set Angle (Twist/Bend) or Factor (Taper/Stretch).
6. Optionally set Origin to an Empty to move/rotate the deform centre, and Limits to deform only part of the length.
7. Keyframe Angle/Factor with eased in-out interpolation for the morph.
8. Bake the morph to shape keys for raea (below).

## AGENT_EXECUTION
```python
import bpy, math
from bpy_extras import anim_utils
obj = bpy.data.objects["Receipt"]                       # ~ name; mesh needs segments along the axis
sd = obj.modifiers.new("SimpleDeform", 'SIMPLE_DEFORM')
sd.deform_method = 'BEND'                               # 'TWIST' | 'BEND' | 'TAPER' | 'STRETCH'
sd.deform_axis = 'X'
sd.angle = math.radians(0)                              # Twist/Bend; .factor for Taper/Stretch
sd.limits = (0.0, 1.0)

# keyframes (in-out ease)
sd.angle = 0.0;               sd.keyframe_insert("angle", frame=1)
sd.angle = math.radians(180); sd.keyframe_insert("angle", frame=13)       # ~ 0.4 s at 30 fps
# 4.4+ slotted actions: fcurves via the action slot's channelbag
ad = obj.animation_data
for fc in anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves:
    for k in fc.keyframe_points: k.interpolation = 'BEZIER'; k.easing = 'EASE_IN_OUT'

# bake to shape keys (a few in-between keys keep a large twist/bend from collapsing in a linear blend)
sc = bpy.context.scene
if not obj.data.shape_keys: obj.shape_key_add(name="Basis", from_mix=False)
for i, fr in enumerate((4, 7, 10, 13)):                 # ~ in-betweens
    sc.frame_set(fr)
    bpy.ops.object.modifier_apply_as_shapekey(keep_modifier=True, modifier="SimpleDeform")
    obj.data.shape_keys.key_blocks[-1].name = f"bend_{i+1}"
obj.modifiers.remove(obj.modifiers["SimpleDeform"])
```
raea: blend the baked keys with `<Model src={staticFile("receipt.glb")} morphs={{ bend_1: w1, bend_2: w2, bend_3: w3, bend_4: w4 }} />`, weights computed from an eased `interpolate` so only two neighbouring keys are non-zero at any frame (limits.md: Model morphs). For a static twisted/tapered shape built in code: `manifold.extrude(outline, h, { divisions, twist, scaleTop })` or `solid.refineToLength(len).warp(fn)` (meshes.md). raea cannot animate a Mesh3d's shape — only its transform/material.

## NOTES
- The video only names the four modes and "perfect for all your animation needs"; all values `~`.
- Shape keys interpolate vertex positions linearly: a 180° bend from a single key would shrink through the middle; hence the in-between keys.
- glTF: with `export_apply=True` check the morph targets survive in the GLB (`~`, version-dependent); removing the modifier after baking avoids the conflict.
- Rule conflicts: no bouncy or overshooting deform; ease in-out; no flashy twist-whips.
- bpy fixed for 5.3: action.fcurves → bpy_extras.anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves (slotted actions).
