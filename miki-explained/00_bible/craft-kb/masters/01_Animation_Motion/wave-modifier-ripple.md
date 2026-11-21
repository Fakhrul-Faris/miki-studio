---
title: Wave modifier ripple
bucket: 01_Animation_Motion
type: master
members:
  - cards/03_Modeling_Modifiers/vertex-bevel-ripple-wave-modifier--perfect-product-animations.md
  - cards/01_Animation_Motion/wave-modifier-ripple--modifiers.md
sources: ["How to Make Perfect Product Animations in Blender.txt", "The Power of MODIFIERS in Blender!.txt"]
use_when: "a one-shot ripple when a coin/drop hits a surface"
style_fit: Good — a physical consequence on the word (contact → one ring that dies away); keep amplitude small and speed slow, the decaying height is the fade-out; no jelly wobble on hero objects. Baked in Blender (raea has no deformer).
---

## METADATA
01_Animation_Motion | Blender 3.x / 4.4 (sources) → Blender 5.3 bake → raea morph targets / baked clip | Blender bpy (Wave modifier, bmesh) + raea `<Model morphs|animation>`

## CREATIVE_INTENT
Shared why: when an object lands or a value changes, a single ring ripples out across the surface and dies away — a calm,
satisfying "click" beat with no hand keys for the wave itself.
- Perfect Product Animations: put dense geometry only where the ripple lives — bevel the centre vertex into 100–300 rings
  instead of subdividing a huge plane; un-cycle the wave, start it on the contact frame, key Height down to 0 to fade.
- Power of Modifiers: the Wave modifier's controls (Motion X/Y, Height, Width, Narrowness, Speed, Time Offset, Life,
  Damping, Start Position Object) and how to bake it to shape keys for an engine.

## STE_PROCEDURE
1. Subdivide the surface plane once so it has one centre vertex.
2. Select the centre vertex; Bevel Vertices (Ctrl+Shift+B) with Profile Shape 0.2; drag the width to cover the area around the hero.
3. Set Bevel Segments 100; raise to 300 if the wave is jagged.
4. Before you add the Wave modifier, apply Scale (Ctrl+A › Scale) or the wave distorts.
5. Add modifier Deform › Wave.
6. Enable Motion X and Y for a circular ripple from the origin (or one axis for linear waves).
7. Optionally set Start Position Object to an Empty at the contact point.
8. Set Height (amplitude), Width, Narrowness and Speed.
9. Uncheck Cyclic so one wave travels and ends.
10. Set Time › Offset to the contact frame so the wave starts on contact; set Life and Damping for a single decaying ripple.
11. Key Height at ~contact+20; key Height 0 at ~contact+30 so the wave fades out; slide those keys until the fade looks right.
12. Before export, bake the ripple to shape keys (one per few frames), keyed so glTF exports morph-weight animation; remove the modifier.
13. In raea, play the baked clip or drive the morphs per frame.

## VALUES BY SOURCE
| parameter | Perfect Product Animations | Power of Modifiers | recommended for Style D (+ why) |
|---|---|---|---|
| density | 1 subdivide + vertex bevel, profile 0.2, segments 100→300 | "subdivide enough" | vertex bevel (dense only near contact; smaller GLB) |
| motion | default (X+Y) | X+Y circular | X+Y, Start Position = contact Empty |
| height | 0.21 m (product scale) | ~0.003 (macro ~) | macro: ~0.002–0.005 m — small, calm |
| width / narrowness | default | ~0.03 / ~1.5 | ~0.03 / ~1.5 at macro scale |
| speed | default | ~0.005 (slow) | slow (~0.005) |
| cyclic | off | (single ripple via Life/Damping) | off |
| time offset | 59 (contact frame) | ~10 | = contact frame (on the word) |
| fade | Height keyed @contact+20 → 0 @contact+30 | lifetime ~30, damping ~20 | both: Life/Damping + Height key to 0 |
| raea route | bake to shape keys or fake with an expanding Torus ring | bake to morph/clip, or animated normal-map uv | bake morphs (real displacement); ring/uv fake for flat water |

## AGENT_EXECUTION
Blender 5.3:
```python
import bpy, bmesh
sc = bpy.context.scene
fl = bpy.data.objects["Surface"]
bpy.context.view_layer.objects.active = fl; fl.select_set(True)
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)          # step 4

bm = bmesh.new(); bm.from_mesh(fl.data)                                            # steps 1–3
bmesh.ops.subdivide_edges(bm, edges=bm.edges[:], cuts=1, use_grid_fill=True)
centre = min(bm.verts, key=lambda v: v.co.length)
bmesh.ops.bevel(bm, geom=[centre], offset=0.45, offset_type='PERCENT',             # ~ width visual only
                segments=300, profile=0.2, affect='VERTICES')
bm.to_mesh(fl.data); bm.free()

CONTACT = 59                                                                       # contact frame (from the descent)
w = fl.modifiers.new("Wave", 'WAVE')
w.use_x = True; w.use_y = True; w.use_cyclic = False
w.height = 0.003; w.width = 0.03; w.narrowness = 1.5; w.speed = 0.005              # ~ macro (source product: height 0.21)
w.time_offset = CONTACT; w.lifetime = 30; w.damping_time = 20                      # ~
# w.start_position_object = bpy.data.objects["Contact"]                            # optional centre Empty
w.keyframe_insert("height", frame=CONTACT + 20)
w.height = 0.0; w.keyframe_insert("height", frame=CONTACT + 30)
# also: w.falloff_radius

# bake to shape keys (one per 3 frames), each 1 at its frame, 0 at neighbours
if not fl.data.shape_keys: fl.shape_key_add(name="Basis", from_mix=False)
frames = range(CONTACT, CONTACT + 31, 3)
for fr in frames:
    sc.frame_set(fr)
    bpy.ops.object.modifier_apply_as_shapekey(keep_modifier=True, modifier="Wave")
    fl.data.shape_keys.key_blocks[-1].name = f"wave_{fr:03d}"
fl.modifiers.remove(fl.modifiers["Wave"])
keys = fl.data.shape_keys.key_blocks
for fr in frames:
    k = keys[f"wave_{fr:03d}"]
    for t, v in ((fr - 3, 0.0), (fr, 1.0), (fr + 3, 0.0)):
        k.value = v; k.keyframe_insert("value", frame=t)
# export: bpy.ops.export_scene.gltf(filepath=..., export_morph=True, export_animations=True)
```

raea (no deformer — a part's shape is fixed; only transform/material animate):
```tsx
// (a) baked clip (house BlendShot exports one merged clip)
<Model src={staticFile("surface.glb")} animation="shot" time={f / fps} />
// (b) drive the morphs yourself
<Model src={staticFile("surface.glb")} morphs={{ wave_059: w59, wave_062: w62 /* … */ }} />
// (c) fake for flat water: a flat Torus ring lying on the floor (turn Mesh3d by PI/2 about x), scale grows, alpha fades
const r = interpolate(f, [c0, c0 + 30], [0.01, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
<Mesh3d name="ripple" transform={Transform.fromXyz(...hit).withRotation(Quat.fromEuler("XYZ", Math.PI / 2, 0, 0)).withScale(r)}>
  <Torus major_radius={0.1} minor_radius={0.002} />
  <StandardMaterial base_color={Srgba.hex("#ffffff").with_alpha(1 - r)} alpha_mode="Blend" />
</Mesh3d>
// (d) cheaper flat ripple: normal_map_texture whose uv_transform animates (materials.md)
```

## NOTES
- Deprecated: none.
- Visual gaps: bevel width and the final Height key frames were tuned by eye; Power of Modifiers names the modifier only
  ("lots of settings to tweak") — all its values are `~`.
- Mesh budget: a dense rippling surface in a GLB is fine; keep the GLB under ~20 MB (limits.md).
- Contact frame 59 comes from the source's descent animation (slow-descent-then-connect card).
- Rule conflicts: keep amplitude small and speed slow; the decaying height is the fade-out (no pop); no bouncy jelly
  wobble on hero objects.
