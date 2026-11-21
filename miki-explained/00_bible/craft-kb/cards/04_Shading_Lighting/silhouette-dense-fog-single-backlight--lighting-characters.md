---
title: Silhouette lighting — near-black world, dense fog (density 0.1, anisotropy 0.8), one strong coloured spot behind
bucket: 04_Shading_Lighting
source: "Lighting 3D Characters for Storytelling.txt"
source_time: "28:30–32:24"
blender_version_source: 2.8–3.x? (EEVEE legacy)
tool_target: Blender bpy | raea
tier: full
style_fit: A "the unknown / hidden cost" beat: the hero object shown only as a shape in shafts of light. Simple to build; use once per film at most.
---

## METADATA
04_Shading_Lighting | 2.8–3.x? → 4.2+ / raea | Blender bpy + raea

## CREATIVE_INTENT
The most extreme and simplest setup: show only the shape of the subject, nothing else, with dusty light streaks. Key is a dense volume so one spotlight immediately makes shafts. Light below the subject = mysterious but earthly; a glow behind the head/top = divine. A hint of face/detail survives because the world is not quite black. Small spheres in the background catch light and break up emptiness; cubes in front of the spot vary the shafts; dust and fog cards and a few floating stones finish it.

## STE_PROCEDURE
1. Set the world colour almost to black so there is no unwanted fill.
2. Set the fog volume's Principled Volume Density to 0.1 and Anisotropy to 0.8.
3. Add a single strong Spot behind the subject, tinted (video: purple-pink).
4. Place it low behind for earthly mystery, or behind the top for a divine glow.
5. Hide all extra fills; keep only a hint of detail from the non-black world.
6. Add a few small spheres in the background to catch light.
7. Put a few cubes in front of the spot so the shafts become uneven.
8. Add dust cards (lower emission) and fog-overlay cards between background objects.

## AGENT_EXECUTION
Blender:
```python
w = bpy.context.scene.world.node_tree.nodes["Background"]; w.inputs["Color"].default_value = (.005, .005, .008, 1)
vol = bpy.data.materials["Fog"].node_tree.nodes["Principled Volume"]
vol.inputs["Density"].default_value = 0.1; vol.inputs["Anisotropy"].default_value = 0.8
```
raea:
```tsx
<AmbientLight brightness={4} />
<VolumetricFog />
<FogVolume name="air" position={[0, 1.5, 0]} scale={[6, 4, 6]} density={0.1} scattering={0.5} absorption={0.1} anisotropy={0.8} />
<SpotLight name="back" color="#c86bff" volumetric shadow_maps_enabled
  transform={Transform.fromXyz(0, 0.3, -2.2).lookingAt([0, 1.0, 1.5])} intensity={4_000_000} outer_angle={0.35} inner_angle={0.2} />
<Mesh3d name="breakup1" shadow="only" transform={Transform.fromXyz(0.2, 0.9, -1.6)}><Cuboid half_size={[0.08, 0.08, 0.08]} /><StandardMaterial /></Mesh3d>
```
`anisotropy` near 1 makes shafts glow when the camera looks toward the light — keep the spot roughly behind the subject facing camera.

## NOTES
- Deprecated: legacy EEVEE "Volumetric" tile/sample settings → EEVEE Next volume settings; raea uses the froxel grid (default).
- Visual gaps: spot power not given ("quite a lot").
- Rule conflicts: the video's levitating figure is a character; ours is an object (figures pose only, no people by default). Floating stones/objects drift slowly, never bounce.
