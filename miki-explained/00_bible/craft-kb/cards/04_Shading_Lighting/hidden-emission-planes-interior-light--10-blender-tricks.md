---
title: Interior light from hidden emission planes (top + back)
bucket: 04_Shading_Lighting
source: "10+ Blender Tricks That Will Make Your Renders Cinematic.txt"
source_time: "00:28–00:55"
blender_version_source: 3.x
tool_target: Blender bpy | Shader nodes | raea
tier: principle
style_fit: fits — a top panel is Style D's one soft top light; the back panel is a rim. No front light, matching the dark-room look
---

## METADATA
04_Shading_Lighting | Blender 3.x (4.2+ same) | Emission plane + Ray Visibility → raea RectLight

## CREATIVE_INTENT
Principle: big soft area sources above and behind the subject give interior scenes soft top light and a rim without
flattening the front. Idea: use emissive planes as softboxes, hide them from the camera so only their light shows, and
never add light in front of the subject.

## STE_PROCEDURE
1. Add a Plane above the subject, facing down.
2. Add a second Plane behind the subject, facing the subject.
3. Assign each Plane a material whose Surface is an Emission shader (Strength `unknown (visual only)`).
4. In Object Properties > Visibility > Ray Visibility, uncheck Camera on both Planes.
5. Before you render, confirm that no light sits in front of the subject.

## AGENT_EXECUTION
### Blender (4.2+)
```python
import bpy, math
def emission_plane(name, loc, rot, size, strength=10.0):  # strength ~ not given
    bpy.ops.mesh.primitive_plane_add(size=size, location=loc, rotation=rot)
    ob = bpy.context.object; ob.name = name
    mat = bpy.data.materials.new(name + "_mat"); mat.use_nodes = True
    nt = mat.node_tree; nt.nodes.clear()
    em = nt.nodes.new("ShaderNodeEmission"); out = nt.nodes.new("ShaderNodeOutputMaterial")
    em.inputs["Strength"].default_value = strength
    nt.links.new(em.outputs["Emission"], out.inputs["Surface"])   # Emission [Emission] -> Material Output [Surface]
    ob.data.materials.append(mat)
    ob.visible_camera = False      # Object > Visibility > Ray Visibility > Camera
    return ob
emission_plane("TopPanel",  (0, 0, 3),  (math.pi, 0, 0), 2.0)           # normal flipped to face down
emission_plane("BackPanel", (0, 2.5, 1), (math.radians(90), 0, 0), 2.0)  # ~ faces the subject along -Y
```
Note: the build is exported to raea as GLB; emission planes do not light anything there. Recreate them as lights.

### raea
```tsx
// RectLight = a softbox: lights from a rectangle facing its -Z, invisible to the camera, soft wide falloff, NO shadows
<RectLight transform={Transform.fromXyz(0, 3, 0.2).lookingAt([0, 0, 0])} intensity={60000} width={2} height={2} color="#fff1e0" range={20} />
<RectLight transform={Transform.fromXyz(0, 1, -2.5).lookingAt([0, 0.3, 0])} intensity={25000} width={2} height={1} color="#ffe6cc" range={20} />
// RectLight casts no shadows: keep a shadowed SpotLight (or DirectionalLight) from the top for contact shadows
<SpotLight transform={Transform.fromXyz(0, 3, 0.2).lookingAt([0, 0, 0])} intensity={400000} outer_angle={0.5} inner_angle={0.25} shadow_maps_enabled soft_shadows_enabled />
```
Intensities `~` — tune on a still. The kit's `BlendShot.tsx` / `clay.tsx` already build key/fill RectLights from the
.blend's light data.

## NOTES
- Deprecated: in EEVEE Legacy emission planes did not light the scene without baked light probes; EEVEE Next (4.2+) and
  Cycles both light from emissive meshes. `obj.visible_camera` replaces the pre-3.0 `cycles_visibility.camera`.
- Visual gaps: plane sizes, distances and emission strength are on screen only.
- Rule conflicts: none.
