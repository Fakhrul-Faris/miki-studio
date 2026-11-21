---
title: Lattice modifier — non-destructive regional deform through a lattice cage's slices
bucket: 03_Modeling_Modifiers
source: "The Power of MODIFIERS in Blender!.txt"
source_time: "02:46–03:09"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Shapes or morphs a Style D hero (a bag that bulges, a wallet that thickens) without touching its mesh; animated morphs must ease in-out over ≥ ~0.4 s.
---

## METADATA
03_Modeling_Modifiers | 3.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
A lattice cage around an object cuts it into as many slices as you choose; moving the lattice points bends that region of the object while the mesh itself stays intact. Use it to reshape a whole object smoothly or to drive a shape-change morph.

## STE_PROCEDURE
1. Add a Lattice object and scale it to enclose the target.
2. Set the lattice resolution (Points U/V/W) to the number of cuts needed.
3. Add a Lattice modifier to the target and set Object = the lattice.
4. In the lattice's Edit Mode, select points and transform them; the region of the target inside follows.
5. Keep the modifier live (non-destructive) until export.

## AGENT_EXECUTION
```python
import bpy
target = bpy.data.objects["Hero"]                         # ~
bpy.ops.object.add(type='LATTICE', location=target.location)
lat = bpy.context.active_object
lat.scale = target.dimensions * 1.05
lat.data.points_u, lat.data.points_v, lat.data.points_w = 3, 3, 4     # ~ cuts
lat.data.interpolation_type_u = lat.data.interpolation_type_v = lat.data.interpolation_type_w = 'KEY_BSPLINE'
mod = target.modifiers.new("Lattice", 'LATTICE'); mod.object = lat

# move the top layer of points (lattice point coordinates are in -0.5..0.5 local space)
for p in lat.data.points:
    if p.co_deform.z > 0.4:
        p.co_deform.x *= 1.3; p.co_deform.y *= 1.3       # ~ flare the top
```
Animated lattice → raea: bake to shape keys, then blend in raea.
```python
import bpy
target = bpy.data.objects["Hero"]; END_FRAME = bpy.context.scene.frame_end   # ~ frame of the deformed state
bpy.context.view_layer.objects.active = target              # the operator applies on the active object
sc = bpy.context.scene
if not target.data.shape_keys: target.shape_key_add(name="Basis", from_mix=False)
sc.frame_set(END_FRAME)                                   # the deformed state
bpy.ops.object.modifier_apply_as_shapekey(keep_modifier=False, modifier="Lattice")
target.data.shape_keys.key_blocks[-1].name = "flare"
```
raea: `<Model src={staticFile("hero.glb")} morphs={{ flare: w }} />` with `w = interpolate(f, [a, a + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) })` (limits.md: Model morphs). Static deform code-side: `solid.refineToLength(0.01).warp((x, y, z) => [...])` (meshes.md).

## NOTES
- Shape-key blending is linear per vertex; one key is fine for a lattice flare/bulge.
- glTF export: verify the morph target survives — with `export_apply=True` some exporter versions drop shape keys when modifiers remain; apply/remove the lattice first as above (`~`, version-dependent).
- Deprecated: none.
- Visual gaps: lattice point moves are on screen only.
- Rule conflicts: no bounce/overshoot on the morph; ease in-out.
- bpy fixed for 5.3: incomplete bake snippet: added `import bpy`, `target`, `END_FRAME`, and made `target` active (block 1 leaves the lattice active).
