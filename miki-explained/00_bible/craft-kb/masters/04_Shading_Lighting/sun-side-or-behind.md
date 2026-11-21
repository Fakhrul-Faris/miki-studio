---
title: Sun/HDRI from the side or behind, never from the camera
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/hdri-rotation-side-sun--good-lighting-environments.md
  - cards/04_Shading_Lighting/sky-texture-side-sun--use-lighting-in-renders.md
  - cards/04_Shading_Lighting/sun-behind-or-beside-subject--10-blender-tricks.md
sources: ["How to get good lighting in blender.srt", "How To Use Lighting In Your Renders  Blender Tutorial.txt", "10+ Blender Tricks That Will Make Your Renders Cinematic.txt", "Lighting With Only HDRIs? You're Doing it Wrong!.txt"]
use_when: "exterior or daylight setups"
style_fit: For exterior/street beats (no people by default); in Style D studio shots the soft top light stays the key and this becomes a low-intensity back/side rim that separates the silhouette from the dark room. Never animate HDRI rotation as a visible sky spin.
---

## METADATA
04_Shading_Lighting | 3.x (source) → bpy 5.x + raea | World nodes / Sun → raea DirectionalLight, Environment, Atmosphere

## CREATIVE_INTENT
Light from the camera's direction throws every shadow behind the objects and flattens form; light straight at the lens silhouettes everything. Put the sun to the side (lit side + shadow side, detail brought out) or behind (lit edge, rim). This is the first and most important outdoor lighting decision; outdoors, one sky is the whole rig. Front-backlight is an exception for experienced hands.
- good-lighting-environments: rotate the HDRI with Mapping Rotation Z, judging shadows not the background.
- use-lighting-in-renders: Sky Texture (or a Sun) at ~90° to the camera axis; try elevations in camera view.
- 10-blender-tricks: a Sun light behind or beside the subject; check for a bright edge and a visible shadow side.

## STE_PROCEDURE
1. Choose the source: HDRI (Environment Texture), procedural Sky Texture, or a Sun light.
2. HDRI: plug Environment Texture → World Background; Ctrl+T (Node Wrangler) adds Mapping + Texture Coordinate.
3. Sky: replace the Background colour with a Sky Texture → Background [Color].
4. Sun: add a Sun light.
5. Turn the light (Mapping Rotation Z / Sun Rotation + Elevation / Sun object rotation) step by step in camera view.
6. Judge the light direction and shadows, not the background image.
7. If shadows fall straight behind objects (sun behind camera), keep rotating.
8. If the sun faces the camera and objects silhouette, keep rotating (unless a deliberate backlight).
9. Stop when the sun is left/right of the camera axis (~90°) or behind/beside the subject with a bright edge and a visible shadow side.
10. In raea, add a DirectionalLight from the HDRI sun's direction — an Environment casts no shadows.
11. Before placing any rim/key light, check its angle relative to the camera axis; if it sits close to the camera's own view direction and is acting as the KEY (not a fill), move it — reads as "amateurish", "like an onboard flash" (from Lighting With Only HDRIs? You're Doing it Wrong!). Front light is acceptable only as a FILL (secondary, not the key) or as a stated, deliberate retro-flash style — never as an unexamined default key placement.

## VALUES BY SOURCE
| parameter | good-lighting-environments | use-lighting-in-renders | 10-blender-tricks | recommended for Style D (+ why) |
|---|---|---|---|---|
| source | HDRI + Mapping | Sky Texture (Nishita) or Sun | Sun light | raea Environment (+ DirectionalLight) or `<Atmosphere light />` |
| angle | rotation Z ~110° (by feel) | elevation ~25°, rotation ~90° (side) | from behind-right ~(0.6, 1.0, 0.5), ~30° up | side (~90° to camera axis) for form; behind for rim |
| sun strength | — | — | ~4 (not given) | illuminance ~9,000–10,000 exterior; low rim in studio |
| shadow softness | soft_shadow_size 0.5 | 0.5 | 2 | 0.5 real sun; 2 softer |
| ambient | — | — | AmbientLight 60 | 20–80 with an Environment, or none |

## AGENT_EXECUTION
Blender 5.x:
```python
import bpy, math
from mathutils import Vector
w = bpy.context.scene.world; N, L = w.node_tree.nodes, w.node_tree.links

# A) HDRI rotated to a side sun
env = N.new("ShaderNodeTexEnvironment"); env.image = bpy.data.images.load("//sky_2k.hdr")
mp = N.new("ShaderNodeMapping"); tc = N.new("ShaderNodeTexCoord")
L.new(tc.outputs["Generated"], mp.inputs["Vector"]); L.new(mp.outputs["Vector"], env.inputs["Vector"])
L.new(env.outputs["Color"], N["Background"].inputs["Color"])
mp.inputs["Rotation"].default_value[2] = math.radians(110)       # ~ by feel

# B) procedural sky, side sun (5.x: NISHITA -> MULTIPLE_SCATTERING)
sky = N.new("ShaderNodeTexSky"); sky.sky_type = "MULTIPLE_SCATTERING"
sky.sun_elevation = math.radians(25); sky.sun_rotation = math.radians(90)   # ~
# L.new(sky.outputs["Color"], N["Background"].inputs["Color"])   # use A or B

# C) sun light behind/beside the subject (camera looks along -Y)
bpy.ops.object.light_add(type='SUN', location=(0, 0, 10)); sun = bpy.context.object
sun.data.energy = 4.0                                            # ~
from_dir = Vector((0.6, 1.0, 0.5)).normalized()                  # ~ behind-right, ~30° up
sun.rotation_euler = (-from_dir).to_track_quat('-Z', 'Y').to_euler()
```
Nodes: `Texture Coordinate [Generated] -> Mapping [Vector] (Rotation Z) -> Environment Texture [Vector]; Environment Texture [Color] -> Background [Color]`; or `Sky Texture [Color] -> Background [Color]`.
raea:
```tsx
{/* exterior with an HDRI: rotation = radians CCW from above, turn until its sun is beside/behind */}
<Environment src={staticFile("sky_2k.hdr")} intensity={1} rotation={1.9} background />
<DirectionalLight transform={Transform.fromXyz(-6, 5, 0).lookingAt([0, 0, 0])} illuminance={10000}
  shadow_maps_enabled soft_shadow_size={0.5} />   {/* from the HDRI sun's direction, for the shadows */}
{/* or a procedural sky: */}
<Atmosphere light />
{/* studio rim (Style D): low sun behind the subject relative to the camera at (0, 0.3, 2) */}
<DirectionalLight transform={Transform.fromXyz(1.5, 2, -3).lookingAt([0, 0, 0])} illuminance={3000} shadow_maps_enabled soft_shadow_size={2} />
```
Values `~`; HDRI filename is a placeholder (Poly Haven CC0).

## NOTES
- Deprecated: Sky Texture `NISHITA` → `MULTIPLE_SCATTERING` in 5.x (enum: SINGLE_SCATTERING, MULTIPLE_SCATTERING, PREETHAM, HOSEK_WILKIE); EEVEE got Sky Texture support in 4.x (EEVEE Next).
- raea: `<Environment>` lights but casts no shadows — always pair with a DirectionalLight from its sun.
- Visual gaps: final rotation, elevation and sun angles are by feel / shown only.
- Rule conflicts: street scenes default to no people; never animate HDRI rotation as a visible sky spin; in Style D this is a rim, not the key.
- Lighting With Only HDRIs adds the explicit rejection reason ("amateurish", "onboard flash") for a front-lit key, and
  one named deliberate exception (a retro on-camera-flash photo-album look) — cite it when rejecting a front-lit draft.
  No new numeric values beyond this master's existing ~90°-to-camera-axis guidance.
