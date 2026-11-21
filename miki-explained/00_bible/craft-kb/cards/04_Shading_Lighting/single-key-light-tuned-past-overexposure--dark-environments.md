---
title: One key light, brightness tuned by overshooting then dialling back
bucket: 04_Shading_Lighting
source: "How to Make DARK Environments in Blender.txt"
source_time: "00:57–06:56"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Exactly Style D's "dark room, one soft top light": one light does the heavy lifting on the hero object before any support light exists.
---

## METADATA
04_Shading_Lighting | 4.x (Cycles shown) → 4.2+ / raea | Blender bpy + raea

## CREATIVE_INTENT
In a dark shot the eye goes to the brightest point, so one key light decides what the viewer reads first. Get that light right alone (position, angle, brightness) before adding anything; most dark renders fail by being under-exposed, not over-exposed.

## STE_PROCEDURE
1. Before adding any other light, hide every light except one key (Spot Light in the video).
2. Aim the key so its brightest patch lands on the subject the line is about.
3. Move and rotate the key until its cone and fall-off frame that subject.
4. Raise the key's Power until the lit surface washes out toward white (video: 8,000,000 W turned a green surface white).
5. Lower the Power until the brightest highlights stop clipping (video settled at 1,000,000 W; 2,000,000 W was "a little too washed out").
6. Ignore the absolute number; judge only the render. Values differ per scene, texture brightness and distance.
7. Accept "roughly right": any value between the two extremes that looks good is fine.
8. Only after the key is settled, add fill and supporting lights (see the shadow-lift and contained-spot cards).

## AGENT_EXECUTION
Blender (look-dev / check .blend only — raea renders the final):
```python
import bpy
for o in bpy.data.objects:
    if o.type == 'LIGHT':
        o.hide_render = o.hide_viewport = True
key_data = bpy.data.lights.new("Key", type='SPOT')
key_data.energy = 1_000_000          # video final, Cycles scene units; ~ scene-dependent
key_data.spot_size = 0.9             # ~ rad, not given
key_data.spot_blend = 0.3            # ~
key = bpy.data.objects.new("Key", key_data)
bpy.context.collection.objects.link(key)
# bracket: render at 8e6 (washed), 2e6 (slightly washed), settle 1e6
```
raea (the real render): one key, brightness bracketed by `ToneMapping exposure` or `intensity`:
```tsx
<ToneMapping mode="tony" exposure={0} />
<SpotLight transform={Transform.fromXyz(0, 3, 0.6).lookingAt([0, 0, 0])}
  intensity={2_700_000} outer_angle={0.45} inner_angle={0.22} radius={0.6}
  soft_shadows_enabled shadow_maps_enabled color="#fff2e2" />
```
Bracket by rendering stills (`raea render EDIT.tsx --frame N -o F.png`) at `intensity` ×4 and ×0.25, then pick the middle. Light units (lumens) do not transfer from Blender watts.

## NOTES
- Deprecated: none in this step; Blender has no live histogram (speaker's point) — in raea, judge the PNG.
- Visual gaps: exact key position and spot angle are shown only in the viewport (~01:00–03:16); STT number "63,9 163 Watts" is garbled (likely ~63,9xx W, a quarter of the earlier value).
- Rule conflicts: none. Key is static or slowly eased; never animate it as a flicker unless the script calls for it.
