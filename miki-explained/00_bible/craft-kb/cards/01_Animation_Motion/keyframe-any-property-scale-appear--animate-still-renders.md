---
title: Keyframe any property; scale objects in and out to appear/disappear
bucket: 01_Animation_Motion
source: "How to Easily Animate Still Renders in Blender.txt"
source_time: "13:13–15:02"
blender_version_source: 3.x/4.x (no version markers)
tool_target: Blender bpy
tier: full
style_fit: strong — scale-in/scale-out is our "grow, never pop" rule; parented "contraptions" are how objects change state on the word
---

## METADATA
01_Animation_Motion | Blender 3.x/4.x (source), 4.2+/5.x code | Blender bpy + raea

## CREATIVE_INTENT
Beyond the camera flight and drifting dust, simple object animation is enough: location keys, scale keys that make things appear and disappear, and small parented "contraptions" whose parts interlock. Anything with a keyframe dot next to it can be animated; the video's point is that most good animations are this simple.

## STE_PROCEDURE
1. Before you animate a multi-part object, parent the parts in a hierarchy (child moves with parent).
2. To make an object appear, key Scale at 0 on the start frame.
3. Key Scale at its full value a few frames later.
4. To make it disappear, key full Scale, then key Scale 0 later.
5. Key Location the same way for parts that slide or interlock.
6. To animate any other property, hover it and insert a keyframe on the dot beside the field.

## AGENT_EXECUTION
```python
import bpy
FPS = bpy.context.scene.render.fps
IN = round(0.4 * FPS)                       # house: ~0.4 s grow (video gives no frame count)
def appear(ob, f0, full=(1, 1, 1)):
    ob.scale = (0.001, 0.001, 0.001); ob.keyframe_insert("scale", frame=f0)   # 0.001 not 0: avoids degenerate normals
    ob.scale = full;                  ob.keyframe_insert("scale", frame=f0 + IN)
def disappear(ob, f1, full=(1, 1, 1)):
    ob.scale = full;                  ob.keyframe_insert("scale", frame=f1)
    ob.scale = (0.001, 0.001, 0.001); ob.keyframe_insert("scale", frame=f1 + IN)
# any property with a keyframe dot, by data path:
mat = bpy.data.materials["Accent"]
mat.node_tree.nodes["Principled BSDF"].inputs["Emission Strength"].keyframe_insert("default_value", frame=48)
# parenting a contraption (Ctrl+P > Object, Keep Transform):
child, parent = bpy.data.objects["lid"], bpy.data.objects["box"]
child.parent = parent; child.matrix_parent_inverse = parent.matrix_world.inverted()
```
Keep the scale keys' interpolation Bezier (eased) — the "linear" advice in this video is for the camera only, and our rule eases that too.

raea:
```tsx
const s = interpolate(f, [at, at + Math.round(0.4 * fps)], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
<Sequence from={at} layout="none">
  <Mesh3d name="coin" transform={Transform.fromXyz(0, 0.3, 0).withScale(Math.max(0.001, s))}>...</Mesh3d>
</Sequence>
// parts that move together: nest them in <Entity transform> (children compose with the parent)
// other animatable props: material base_color / alpha / emissive / roughness / metallic, light intensity, camera fov, DepthOfField focal_distance
```

## NOTES
- Deprecated: Blender 4.4+ slotted actions — F-curves via `action_get_channelbag_for_slot`; `action.fcurves` removed in 5.0.
- Visual gaps: the contraption examples are shown only on screen; no rig details are spoken.
- Rule conflicts: no frame count is given; house rule is ~0.4 s eased grow/fade, no overshoot/bounce (don't use Back/Elastic easing or `spring` with low damping for these).
