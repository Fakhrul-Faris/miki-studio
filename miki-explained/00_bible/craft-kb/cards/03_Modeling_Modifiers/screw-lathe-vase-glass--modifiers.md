---
title: Lathe glassware/pottery from a curve — Curve → Screw → Solidify → Subdivision, then edit the profile
bucket: 03_Modeling_Modifiers
source: "The Power of MODIFIERS in Blender!.txt"
source_time: "01:59–02:10, 06:06–06:35"
blender_version_source: 3.x
tool_target: Blender bpy
tier: full
style_fit: Good for Style D round hero objects (cups, bottles, jars, coins' rims, bowls); profile stays editable until export.
---

## METADATA
03_Modeling_Modifiers | 3.x → 4.2+ | Blender bpy

## CREATIVE_INTENT
Any round object is a profile spun around an axis. Keeping the profile as a live curve under a Screw modifier lets you reshape a glass or vase by moving a few points.

## STE_PROCEDURE
1. Add a curve for the profile (half the silhouette, one side of the axis).
2. Add a Screw modifier (Axis Z, Angle 360°).
3. Add a Solidify modifier for wall thickness.
4. Add a Subdivision Surface modifier.
5. Switch to Front view (numpad 1) and enter Edit Mode on the curve.
6. Move the curve points to shape the vase or glass.
7. Add points by extruding (E) from an end point for more intricate profiles.

## AGENT_EXECUTION
```python
import bpy
# profile as a poly curve, points in the XZ plane, x >= 0 (axis at x = 0)
pts = [(0.0, 0, 0), (0.03, 0, 0), (0.035, 0, 0.02), (0.025, 0, 0.07), (0.032, 0, 0.11)]   # ~ a 11 cm glass
cu = bpy.data.curves.new("GlassProfile", 'CURVE'); cu.dimensions = '3D'
sp = cu.splines.new('POLY'); sp.points.add(len(pts) - 1)
for p, co in zip(sp.points, pts): p.co = (*co, 1.0)
obj = bpy.data.objects.new("Glass", cu); bpy.context.collection.objects.link(obj)

sc = obj.modifiers.new("Screw", 'SCREW')
sc.axis = 'Z'; sc.angle = 6.283185; sc.steps = 32; sc.render_steps = 64   # ~ steps
sc.use_merge_vertices = True; sc.use_normal_calculate = True
so = obj.modifiers.new("Solidify", 'SOLIDIFY'); so.thickness = 0.002      # ~ glass wall
su = obj.modifiers.new("Subdivision", 'SUBSURF'); su.levels = 2; su.render_levels = 2

# edit the profile (Front view, Edit Mode): bpy.ops.view3d.view_axis(type='FRONT'); bpy.ops.curve.extrude_move()
```
- Export: `export_apply=True` turns the curve + stack into a mesh in the GLB.

raea: direct equivalent at build time — Manifold revolve (meshes.md):
```tsx
const profile = crossSection.polygon([[0, 0], [0.03, 0], [0.035, 0.02], [0.025, 0.07], [0.032, 0.11], [0, 0.11]]);
const outer = profile.revolve({ segments: 64 });
const glass = outer.minus(outer.scale(0.94, 0.94, 1).move(0, 0, 0.004)).rotate(-90, 0, 0);   // hollow, stood up along y
// <Mesh3d shape={glass}><StandardMaterial base_color={Srgba.hex("#cfe8ff").with_alpha(0.35)} alpha_mode="Blend"
//   perceptual_roughness={0.05} specular_transmission={0.9} ior={1.5} thickness={0.002} /></Mesh3d>
```
Build the solid once at module level; revolve takes x ≥ 0.

## NOTES
- Video gives no step counts or thickness; `~`.
- Deprecated: none.
- Visual gaps: the profile shapes drawn are on screen only.
- Rule conflicts: none.
