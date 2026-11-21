---
title: Short (reverse) vs broad lighting — key on the far side of the subject for drama, near side for openness
bucket: 04_Shading_Lighting
source: "Lighting 3D Characters for Storytelling.txt"
source_time: "11:54–12:15, 28:13–28:24"
blender_version_source: 2.8–3.x? (EEVEE legacy)
tool_target: Blender bpy | raea
tier: full
style_fit: Transfers to objects: lighting the face of the object turned away from camera carves form (drama); lighting the face turned toward camera shows it plainly (explanation beats).
---

## METADATA
04_Shading_Lighting | 2.8–3.x? → raea | Blender bpy + raea

## CREATIVE_INTENT
When the subject is turned slightly from camera, it has a near side and a far side. Short (reverse) lighting puts the key's brightest light on the far side — the near side falls into shadow, more drama and shape. Broad lighting lights the near side — less drama, more readable.

## STE_PROCEDURE
1. Turn the subject a little away from the camera so it has a near and a far side.
2. For drama, place the key on the far side so the near side sits in shadow (short lighting).
3. For a calm/readable beat, move the key to the camera side so the near side is lit (broad lighting).
4. Compare both stills; choose by the line's emotion.

## AGENT_EXECUTION
Geometry: with camera at C, subject at O and the subject's facing vector F, the far side is the side of F away from C. Key position for short lighting = O + rotate(F, +45°…+70° away from camera) × d, raised ~30–45°.
raea:
```tsx
const side = SHORT ? -1 : 1;   // -1 = far side from a camera on +x
<SpotLight name="key" transform={Transform.fromXyz(1.6 * side, 1.8, -0.6).lookingAt([0, 0.4, 0])}
  intensity={1_500_000} outer_angle={0.4} inner_angle={0.2} shadow_maps_enabled soft_shadows_enabled radius={0.3} />
```

## NOTES
- Deprecated: none.
- Visual gaps: exact key placement shown only.
- Rule conflicts: the object may turn slowly to reveal the change (eased), never snap.

## ADDENDUM — The secrets of Cinematic Lighting for 3D
Source: "Studio Lighting, Silhouettes & Color Theory/The secrets of Cinematic Lighting for 3D.txt" (05:23–06:02, 06:47–07:33)

| parameter | cinematic-lighting-3d | recommended for Style D |
|---|---|---|
| rule | "camera pointing into the key light = more flat; camera pointing into the shadow side = almost instantly more cinematic" | camera on the side away from the key; key lights the far side |
| demo | same Rembrandt key at 45°; camera moved from key side ("not as mysterious") to shadow side ("more appealing") | move the camera, not the light, when a setup looks flat |

Extra variant — move the camera instead of the light: when a setup reads flat, keep the key where it is and orbit
the camera to the key's shadow side; fits Style D's camera-led changes between setups. Extra steps: note which side
of the object the key lights; place the camera on the opposite side so the visible face is partly in shadow; compare
a still from each side; keep the shadow-side one unless the beat needs plain readability. Note: the readable side
still wins when the line needs a label or number read (break-physics-for-clarity card).
