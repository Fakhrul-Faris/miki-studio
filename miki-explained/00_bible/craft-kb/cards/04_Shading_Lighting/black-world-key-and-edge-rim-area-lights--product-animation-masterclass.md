---
title: Black world, one soft key area light plus a rear area light sitting on the product's edge
bucket: 04_Shading_Lighting
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "36:20–36:48, 39:30–40:49, 1:13:41–1:14:15, 1:34:21–1:34:58"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Close to Style D (dark room, one soft light, edge separation); keep the key from the top and the rim subtle.
---

## METADATA
04_Shading_Lighting | Blender 4.3 | Blender bpy + raea

## CREATIVE_INTENT
Start from total black so every highlight is placed on purpose: one area light shapes the front, a second from behind skims
the can's edge so the silhouette separates from the backdrop. Size controls softness.

## STE_PROCEDURE
1. World Properties › Surface › Strength 0 (pure black world).
2. Before you light, set the object to real size (see real-world scale card) — a 10 W area light then lights a 15 cm can.
3. Add an Area light; bring it close, scale it on Z (light Size), aim it at the can's front/upper side.
4. Add a second Area light; rotate `R X 90`, then `R X 180` to face back toward the can; move it along Y behind the can so it "sits on that edge".
5. Adjust Size (bigger = softer) and Power until the edge line reads.
6. When reusing the rig for a new shot, duplicate the key and move it to the new product position rather than rebuilding.
7. If an area light's shape shows in the frame or in reflections, push it back out of view.

## AGENT_EXECUTION
- Blender:
```python
w = bpy.context.scene.world; w.use_nodes = True; w.node_tree.nodes["Background"].inputs["Strength"].default_value = 0
def area(name, loc, rot, size, power):
    d = bpy.data.lights.new(name, 'AREA'); d.size = size; d.energy = power
    o = bpy.data.objects.new(name, d); o.location = loc; o.rotation_euler = rot
    bpy.context.collection.objects.link(o); return o
key = area("Key", (0.0, -0.25, 0.3), (0.9, 0, 0), 0.3, 10)        # 10 W stated; placement ~
rim = area("Rim", (0.0, 0.3, 0.12), (-1.57, 0, 0), 0.2, 15)       # ~ behind, skimming the edge
```
- raea (use a soft top/key and a rim spot; RectLight casts no shadows):
```tsx
<AbsoluteFill style={{ background: "#000000" }}>
  <Camera3d ... />
  <SpotLight transform={Transform.fromXyz(0, 0.45, 0.15).lookingAt([0, 0.08, 0])} intensity={180000} outer_angle={0.6} inner_angle={0.3}
    shadow_maps_enabled soft_shadows_enabled radius={0.15} />
  <RectLight transform={Transform.fromXyz(0, 0.12, -0.3).lookingAt([0, 0.08, 0])} intensity={60000} width={0.25} height={0.1} color="#ffffff" />
  <AmbientLight brightness={5} />
</AbsoluteFill>
```
  Intensities are `~` starting points at 15 cm scale; tune with `raea render --frame N`.

## NOTES
- Deprecated: none.
- Visual gaps: light positions/angles/powers beyond "10 W" are shown on screen only.
- Rule conflicts: Style D's key is one soft TOP light; the video's key is front-side. Move the key overhead and keep the rear
  light as the edge/rim.
