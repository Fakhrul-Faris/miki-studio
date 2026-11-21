---
title: Black world, a few soft cool area lights revealing only the shape (low-key intro reveal)
bucket: 04_Shading_Lighting
source: "Making a Car Animation in Blender!.txt"
source_time: "05:31–06:04, 13:39"
blender_version_source: 3.x/4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Direct match to Style D: dark room, the object's form read from soft highlights; lights coming on on the beat = an on-screen event on the word.
---

## METADATA
04_Shading_Lighting | 3.x/4.x → 4.2+ | Blender bpy + raea

## CREATIVE_INTENT
Opening shots build intrigue by showing almost nothing: a black world and a few soft, slightly blue lights catching only edges, then the product's own lights switch on on the beat.

## STE_PROCEDURE
1. Set the World colour to black.
2. Aim the camera at the hero's signature detail (video: the front light bar).
3. Add a few very soft, slightly bluish Area lights to catch only the shape's edges.
4. Load the audio; key the product's emissive lights switching on exactly on a beat.
5. Reviewer note: if the frame feels weighted to one side, move one light so its glow lifts the empty corner; expect bloom on bright lights.

## AGENT_EXECUTION
Blender:
```python
import bpy
w = bpy.context.scene.world; w.use_nodes = True
w.node_tree.nodes["Background"].inputs["Color"].default_value = (0, 0, 0, 1)
for i, loc in enumerate([(1.5, 1, 1.2), (-1.5, 1.5, 0.8)]):         # ~
    ld = bpy.data.lights.new(f"Soft{i}", 'AREA'); ld.size = 2.0; ld.energy = 80; ld.color = (0.8, 0.88, 1.0)
    ob = bpy.data.objects.new(f"Soft{i}", ld); ob.location = loc; bpy.context.collection.objects.link(ob)
```
raea:
```tsx
<AbsoluteFill style={{ background: "#000000" }}>
  <Camera3d … />
  <ToneMapping mode="agx" /><Bloom intensity={0.6} threshold={0.9} />
  <RectLight transform={Transform.fromXyz(1.5, 1.2, 1).lookingAt([0, 0.3, 0])} intensity={20000} width={2} height={2} color="#cfdcff" />
  <Mesh3d name="lightbar"><Cuboid half_size={[0.6, 0.01, 0.01]} />
    <StandardMaterial base_color="#111" emissive={LinearRgba.from(Srgba.hex("#ffffff")).mul(interpolate(f, [beat, beat + 12], [0, 6], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" }))} />
  </Mesh3d>
</AbsoluteFill>
```
RectLight casts no shadows; add a soft `SpotLight` (`soft_shadows_enabled`) as the shadow-casting top key.

## NOTES
- Deprecated: none.
- Visual gaps: light count/positions/powers not given ("a few").
- Rule conflicts: lights "coming on" must ramp over ~0.4 s (no pop). Style D's key is one soft TOP light; these side edge-lights are secondary.
