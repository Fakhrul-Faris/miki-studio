---
title: Wave modifier — rippling wave deformation for motion graphics
bucket: 01_Animation_Motion
source: "The Power of MODIFIERS in Blender!.txt"
source_time: "03:10–03:22"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Usable as a soft, slow ripple through a surface (liquid in a cup, a cloth mat, a shockwave on the word); must be slow and calm, never bouncy.
---

## METADATA
01_Animation_Motion | 3.x → 4.2+ | Blender bpy (bake) → raea

## CREATIVE_INTENT
Principle: the Wave modifier pushes a ripple through a subdivided surface over time with no keyframes. Idea: a single ring rippling out from where an object lands or a value changes, as a calm accent.

## STE_PROCEDURE
Method:
1. Before adding the modifier, subdivide the surface enough for a smooth ripple.
2. Add a Wave modifier.
3. Choose Motion X/Y (linear waves) or both (circular ripple from the origin).
4. Set Height (amplitude), Width, Narrowness and Speed.
5. Set Time → Offset (start frame) and Life (frames) / Damping for a single decaying ripple.
6. Optionally set Start Position Object to an Empty to centre the ripple.
How-to (for raea):
7. Bake the ripple frames to shape keys or to a glTF morph animation and play it in raea.

## AGENT_EXECUTION
```python
import bpy
obj = bpy.data.objects["Surface"]                      # ~ subdivided plane
wv = obj.modifiers.new("Wave", 'WAVE')
wv.use_x = True; wv.use_y = True                       # circular ripple
wv.height = 0.003; wv.width = 0.03; wv.narrowness = 1.5   # ~ macro scale
wv.speed = 0.005                                       # ~ slow
wv.time_offset = 10; wv.lifetime = 30; wv.damping_time = 20   # ~ single decaying ripple
# bake: one shape key per few frames, keyframed so the glTF exports a morph-weight animation
sc = bpy.context.scene
if not obj.data.shape_keys: obj.shape_key_add(name="Basis", from_mix=False)
frames = range(10, 41, 3)                              # ~
for fr in frames:
    sc.frame_set(fr)
    bpy.ops.object.modifier_apply_as_shapekey(keep_modifier=True, modifier="Wave")
    obj.data.shape_keys.key_blocks[-1].name = f"wave_{fr:03d}"
obj.modifiers.remove(obj.modifiers["Wave"])
keys = obj.data.shape_keys.key_blocks
for fr in frames:                                      # each key 1 at its frame, 0 at neighbours
    k = keys[f"wave_{fr:03d}"]
    for t, v in ((fr - 3, 0.0), (fr, 1.0), (fr + 3, 0.0)):
        k.value = v; k.keyframe_insert("value", frame=t)
```
raea: no wave deformer. Play the baked GLB: `<Model src={staticFile("surface.glb")} animation="shot" time={frame / fps} />` (the house BlendShot exports a single merged clip), or drive `morphs={{ wave_010: w, ... }}` per frame (limits.md). A flat-water ripple can also be faked with a normal-map texture whose `uv_transform` animates (materials.md) — cheaper, no geometry.

## NOTES
- The video names the modifier only ("lots of settings to tweak"); every value is `~`.
- Mesh budget: a dense rippling surface in a GLB is fine; keep the GLB under ~20 MB.
- Deprecated: none.
- Rule conflicts: keep amplitude small and speed slow; no bouncy jelly wobble on hero objects.
