---
title: Maintain Volume constraint (scale one axis, the others compensate)
bucket: 01_Animation_Motion
source: "The_Power_of_CONSTRAINTS_in_Blender.md"
source_time: "8:26–9:57"
blender_version_source: 3.x+
tool_target: Blender bpy
tier: principle
style_fit: "conflict: the video's use is bouncing squash-and-stretch (forbidden: no bouncy motion). Keep only the volume-preserving idea for slow object morphs (a dough-like coin stretching into a bar, a bag compressing)."
---

## METADATA
01_Animation_Motion | 3.x+ → 4.2+ | Blender bpy → raea transform math

## CREATIVE_INTENT
Principle: a real object keeps its volume when it deforms; if one axis stretches, the others thin. Maintain Volume enforces this from one animated axis. Idea for us (not the video's bounce): a calm morph where an object elongates into a new state while visibly staying "the same stuff".

## STE_PROCEDURE
Method:
1. Add a Maintain Volume constraint to the object.
2. Set Free Axis = the axis you will animate (the one that should not be compensated).
3. Leave Mode = Strict.
4. Set Volume: 1 is the object's applied base size (a default 2×2×2 cube counts as 1); 2 doubles it.
5. Animate scale on the Free Axis only; the other two axes adjust to keep the volume.
How-to:
6. Bake to keyframes before GLB export.

## AGENT_EXECUTION
### Source tool (Blender)
```python
import bpy
from bpy_extras import anim_utils
ob = bpy.data.objects["Coin"]
c = ob.constraints.new('MAINTAIN_VOLUME')
c.free_axis = 'SAMEVOL_Y'      # SAMEVOL_X | SAMEVOL_Y | SAMEVOL_Z
c.mode = 'STRICT'              # STRICT | UNIFORM | SINGLE_AXIS
c.volume = 1.0                 # video: 1 = base size; 2 doubles volume
ob.scale.y = 1.0; ob.keyframe_insert("scale", index=1, frame=1)
ob.scale.y = 1.8; ob.keyframe_insert("scale", index=1, frame=24)   # ~ slow stretch
ad = ob.animation_data
for fc in anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves:
    for k in fc.keyframe_points: k.interpolation = 'BEZIER'; k.easing = 'AUTO'
```
### Blender / raea translation
Strict mode = the other two axes scale by `1/sqrt(s)`:
```tsx
const s = interpolate(f, [0, 23], [1, 1.8], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const k = 1 / Math.sqrt(s);
<Mesh3d name="coin" transform={Transform.fromXyz(0, 0, 0).withScale([k, s, k])}>...</Mesh3d>
```

## NOTES
- Video's "volume 1 = default cube" is a normalisation (the cube is actually 8 m³) — author says so.
- Deprecated: `action.fcurves` direct access changes with 4.4+ slotted actions (use `action.layers[0].strips[0].channelbags`); legacy path still works for simple actions in 4.4.
- Visual gaps: the bouncing-ball and jumping-sphere demos are visual only.
- Rule conflicts: no bounce, no cartoon jump, no squash on landing; use only slow eased morphs (≥ ~0.4 s). Figures never get this.
- bpy fixed for 5.3: action.fcurves → bpy_extras.anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves (slotted actions).
