---
title: Build a set from copies of one scattered cluster (re-scale, re-place, any emitter shape)
bucket: 03_Modeling_Modifiers
source: "How To Make Crazy Renders With Easy Geometry Nodes.txt"
source_time: "09:42–11:08, 13:21–14:13"
blender_version_source: 3.x+
tool_target: Blender bpy
tier: full
style_fit: Fits a macro set where one hero object sits among similar forms; conflict: the video's 16 mm wide lens is not Style D's tight macro look — use it only for an establishing setup.
---

## METADATA
03_Modeling_Modifiers | 3.x+ → 4.2+ | Blender bpy

## CREATIVE_INTENT
One cluster duplicated at different scales and heights gives a whole environment in minutes, with layered foreground/background depth. Scattering the same kit onto a non-flat emitter (e.g. a skull, a coin, a product shell) turns an object itself into the "landscape" — a strong metaphor shot (the object is made of many small things).

## STE_PROCEDURE
1. Add a floor plane under the cluster; scale it in Edit Mode so its texture tiles instead of stretching.
2. Duplicate the cluster object (Shift+D) several times.
3. Change each copy's scale and position; put some above eye-level for depth (positions by eye).
4. Frame in camera view and move clusters until the composition works.
5. Try a wide focal length, e.g. Lens = 16 mm, for scale (video).
6. For an object-as-landscape shot, set the scatter modifier's emitter to the object mesh instead of a plane.

## AGENT_EXECUTION
```python
import bpy
src = bpy.data.objects["Cluster"]
for loc, s in [((3,0,0),0.6), ((-2,4,0),1.4), ((1,-3,2.5),0.8)]:   # ~ by eye
    c = src.copy(); c.data = src.data; bpy.context.scene.collection.objects.link(c)
    c.location = loc; c.scale = (s, s, s)
bpy.context.scene.camera.data.lens = 16.0
# object-as-landscape: add the same GN modifier to the skull/product mesh:
# mod = bpy.data.objects["Skull"].modifiers.new("Scatter",'NODES'); mod.node_group = bpy.data.node_groups["ScatterKit"]
```
Note copies sharing a GN modifier evaluate identical point layouts; change the Distribute Points on Faces [Seed] per copy if repeats show.

raea: place the baked cluster several times with `<Model src={staticFile("cluster.glb")} position={[x,y,z]} scale={s} />` (same GLB loaded once, cheap). Lens: `<Camera3d projection={{ Perspective: { fov } }} />`, fov in radians vertical; 16 mm on a 36 mm sensor across the long side of a 9:16 frame ≈ `2*Math.atan(18/16)` ≈ 1.69 rad (~97°, inferred).

## NOTES
- Visual gaps: all placements and the final composition are done by eye; no values.
- Rule conflicts: Style D wants shallow-DoF macro framing; a 16 mm vista is one setup at most. Any camera move across the set stays eased and under ~130°/s.
