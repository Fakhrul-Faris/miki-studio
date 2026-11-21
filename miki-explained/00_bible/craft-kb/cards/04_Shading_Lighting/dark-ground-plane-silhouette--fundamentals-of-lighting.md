---
title: Near-black rough ground plane for silhouette and bounce control
bucket: 04_Shading_Lighting
source: "Fundamentals of Lighting in Blender.txt"
source_time: "06:49–11:04"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Direct match — Style D puts the object on a real surface in a dark room; a dark, rough surface keeps the silhouette readable and the bounce low.
---

## METADATA
04_Shading_Lighting | 4.x (EEVEE ray-traced GI) | Blender bpy, raea

## CREATIVE_INTENT
An object floating on pure black feels fake, and its shadow side merges with the background so its silhouette is lost. A ground plane grounds it; making that plane dark and rough stops it bouncing fill light into the shadows and makes a light object read sharply against it.

## STE_PROCEDURE
1. Add a Plane under the object.
2. Scale the Plane until it extends past the camera frame.
3. Compare renders with and without the Plane: a white Plane bounces light into shadows.
4. Add a material to the Plane.
5. Set Base Color to near-black, not pure black (leave headroom).
6. If the Plane shows distracting reflections, raise Roughness toward a diffuse look.
7. Check that the silhouette of the subject now separates from the ground.

## AGENT_EXECUTION
Blender:
```python
import bpy
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, 0)); g = bpy.context.object
g.scale = (10, 10, 1)                                   # ~ past camera frame
m = bpy.data.materials.new("Ground"); m.use_nodes = True; g.data.materials.append(m)
b = m.node_tree.nodes["Principled BSDF"]
b.inputs["Base Color"].default_value = (0.02, 0.02, 0.02, 1)   # ~ "almost black"
b.inputs["Roughness"].default_value = 0.8                       # ~ "increase the roughness"
```
raea:
```tsx
<Mesh3d name="ground" transform={Transform.fromXyz(0, -0.05, 0)}>
  <Cuboid half_size={[10, 0.05, 10]} />
  <StandardMaterial base_color="#0d0e10" perceptual_roughness={0.85} />
</Mesh3d>
```
House references: `kit/BlendShot.tsx` LOOK `ground: "#3E424A", groundRough: 0.45`; `kit/pro.tsx` backdrop `#101217`, roughness 0.95. raea has no ray-traced bounce, so the "white plane fills the shadows" effect comes from `AmbientLight`/`Environment` (+ `AmbientOcclusion`) instead — keep them low.

## NOTES
- Deprecated: none. The bounce described is EEVEE Next's ray-traced GI approximation (4.2+); legacy EEVEE had none.
- Visual gaps: exact base colour and roughness values are not stated (`~`).
- Rule conflicts: none.
