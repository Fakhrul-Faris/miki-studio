---
title: Black world + soft key/edge lights (low-key reveal)
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/black-world-key-and-edge-rim-area-lights--product-animation-masterclass.md
  - cards/04_Shading_Lighting/black-world-soft-reveal-lighting--car-animation.md
sources: ["Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt", "Making a Car Animation in Blender!.txt", "8 Lighting Tricks I Wish I Knew Earlier (Blender Product Lighting Tutorial).txt", "The Science of Aesthetic YT 3D Documentaries (Blender tutorial).txt"]
use_when: "the opening dark-room reveal of the hero object"
style_fit: "Core Style D (dark room, form read from soft highlights). Key moves to one soft TOP light; side/rear lights are secondary edge lights only; anything that 'switches on' ramps over ~0.4 s, never pops."
---

## METADATA
04_Shading_Lighting | Blender 3.x–4.3 → 5.x | Blender bpy + raea

## CREATIVE_INTENT
Start from total black so every highlight is placed on purpose: the viewer reads the hero only from a few soft highlights
and its silhouette edge, which builds intrigue for an opening shot; then the hero's own detail (lights, screen) comes on
on the beat.
- Product masterclass adds: one soft key shapes the front, a rear area light "sits on the edge" to separate the
  silhouette from the backdrop; size controls softness; reuse the rig by duplicating the key per shot.
- Car animation adds: aim at the signature detail, use a few very soft slightly blue lights that catch only edges, and
  key the product's emissive lights on a beat; move a light to lift an empty corner if the frame feels lopsided.

## STE_PROCEDURE
1. Set World › Surface › Color to black and Strength 0 (pure black world).
2. Before you light, set the object to real-world size (a 10 W area light then lights a 15 cm can).
3. Aim the camera at the hero's signature detail (a light bar, a logo, a screen edge).
4. Add one soft key Area light; bring it close above the hero; scale its Size for softness; aim it at the upper/front side.
5. Add a rear Area light; rotate X 90° then X 180° to face back; slide it along Y behind until it "sits on the edge".
6. Optionally add one or two very soft, slightly cool (bluish) Area lights that catch only side edges.
7. Adjust Size (bigger = softer) and Power until the edge line reads and the rest stays black.
8. If the frame feels weighted to one side, move one light so its glow lifts the empty corner.
9. If an area light's shape shows in frame or in reflections, push it back out of view.
10. Key the hero's emissive detail switching on at the beat, ramping over ~0.4 s (12 frames at 30 fps); expect bloom.
11. When reusing the rig for a new shot, duplicate the key and move it to the new product position rather than rebuilding.
12. "Teaser" variant — withhold the full object, show only silhouette/edges: skip the key entirely, use a symmetric PAIR of backlights (duplicate one, rotate the copy to the opposite side), each light-linked to exclude the floor so no light spills onto the ground; power roughly 1/5 of the full key (from 8 Lighting Tricks).
13. Staggered multi-light reveal from black: finish the lighting at full values first, then key each light's intensity at 0 (or ~10 %) and ramp to full ~1–2 s later, eased in-out; order hero key first, then side/fill, then back; offset each next light's start by ~6–12 frames (~0.2–0.4 s @30 fps) so lights don't all brighten at once; land the last light's full value on the line's key word (from The Science of Aesthetic YT 3D Documentaries — see also cards/04_Shading_Lighting/staggered-light-fade-in-reveal--aesthetic-3d-documentaries.md for the full worked example).

## VALUES BY SOURCE
| parameter | Product masterclass | Car animation | recommended for Style D (+ why) |
|---|---|---|---|
| World | Strength 0 | Color black | Black colour + Strength 0 (both; no stray env light) |
| Key light | 1 Area, front/upper, 10 W at 15 cm scale, size ~0.3 | none distinct; "a few" soft Areas | 1 soft TOP key (house rule: one soft top light) |
| Edge light | 1 rear Area on the silhouette edge, ~15 W, size ~0.2 | soft side Areas size ~2, ~80 W, colour ~(0.8, 0.88, 1.0) | Rear edge light, neutral or very slightly cool; side edges optional |
| Light colour | white | slightly blue | Neutral key, cool edge allowed (keeps the brand accent the only saturated colour) |
| Reveal event | — | product lights switch on on a beat | Emissive ramp 0 → ~6 over ~0.4 s, eased out (no pop) |
| Bloom | — | expected on bright lights | `<Bloom intensity≈0.6 threshold≈0.9>` |

### Additional sources (folded, Phase C)
| parameter | 8 Lighting Tricks ("teaser") | Science of Aesthetic Documentaries (staggered reveal) | recommended for Style D (+ why) |
|---|---|---|---|
| Recipe | no key at all, symmetric backlight pair only | all lights at 0, staggered ramp to full | pick per shot: "teaser" for silhouette-only beats, staggered ramp for the opening frame-0 reveal |
| Floor | light-linked out so only the silhouette/edges light, not the ground | n/a | raea has no light-linking — keep lights' range short/aimed at the hero, or place floor outside their throw |
| Power/offset | backlights ~1/5 the full key's power | each next light offset ~6–12 f (~0.2–0.4 s @30 fps) after the previous | use the staggered offsets for the reveal ramp; keep backlight pair dimmer than the top key |
| ⚠ frame 0 | — | must already show the logo/hero — start from a low glow, never total black, on frame 0 | start any "from black" ramp at ~10 % on frame 0, not 0 |

## AGENT_EXECUTION
Blender (build/preview only; raea renders):
```python
import bpy
w = bpy.context.scene.world; w.use_nodes = True
bg = w.node_tree.nodes["Background"]
bg.inputs["Color"].default_value = (0, 0, 0, 1); bg.inputs["Strength"].default_value = 0

def area(name, loc, rot, size, power, color=(1, 1, 1)):
    d = bpy.data.lights.new(name, 'AREA'); d.size = size; d.energy = power; d.color = color
    o = bpy.data.objects.new(name, d); o.location = loc; o.rotation_euler = rot
    bpy.context.collection.objects.link(o); return o

key = area("Key",  (0.0, -0.05, 0.40), (0.15, 0, 0), 0.3, 10)              # 10 W stated; moved overhead for Style D
rim = area("Rim",  (0.0, 0.30, 0.12), (-1.57, 0, 0), 0.2, 15)               # ~ behind, skimming the edge
side = area("Side", (1.5, 1.0, 1.2), (0, 0.9, 0), 2.0, 80, (0.8, 0.88, 1.0))  # ~ optional cool edge (car-animation scale)
```
raea:
```tsx
const on = interpolate(f, [beat, beat + 12], [0, 6], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
<AbsoluteFill style={{ background: "#000000" }}>
  <Camera3d ... />
  <ToneMapping mode="agx" />
  <Bloom intensity={0.6} threshold={0.9} />
  <AmbientLight brightness={5} />
  {/* soft top key, the only shadow caster */}
  <SpotLight transform={Transform.fromXyz(0, 0.45, 0.15).lookingAt([0, 0.08, 0])} intensity={180000} outer_angle={0.6} inner_angle={0.3}
    shadow_maps_enabled soft_shadows_enabled radius={0.15} />
  {/* rear edge light (RectLight: soft, no shadows) */}
  <RectLight transform={Transform.fromXyz(0, 0.12, -0.3).lookingAt([0, 0.08, 0])} intensity={60000} width={0.25} height={0.1} color="#ffffff" />
  {/* optional cool side edge */}
  <RectLight transform={Transform.fromXyz(1.5, 1.2, 1).lookingAt([0, 0.3, 0])} intensity={20000} width={2} height={2} color="#cfdcff" />
  <Mesh3d name="lightbar"><Cuboid half_size={[0.6, 0.01, 0.01]} />
    <StandardMaterial base_color="#111111" emissive={LinearRgba.from(Srgba.hex("#ffffff")).mul(on)} />
  </Mesh3d>
</AbsoluteFill>
```
Intensities are `~` starting points (15 cm scale for key/rim, car scale for the side light); tune with
`raea render EDIT.tsx --frame N -o F.png`.

raea (teaser variant — no key, symmetric backlight pair, product only, floor unlit):
```tsx
<RectLight name="back-L" color="#ffffff" transform={Transform.fromXyz(-0.6, 0.3, -0.5).lookingAt([0, 0.15, 0])}
  intensity={40_000} width={0.3} height={0.3} />
<RectLight name="back-R" color="#ffffff" transform={Transform.fromXyz(0.6, 0.3, -0.5).lookingAt([0, 0.15, 0])}
  intensity={40_000} width={0.3} height={0.3} />
{/* raea has no light-linking: keep both lights' range short and aimed at the hero only, or place the floor outside
    their narrow throw (see light-linking.md raea fallback) */}
```
raea (staggered multi-light reveal, offset ramps, source 24 fps/150-frame timing):
```tsx
const ramp = (start: number, full: number) =>
  interpolate(f, [start, start + 36], [full * 0.1, full], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
<SpotLight name="key"  intensity={ramp(0, 900_000)} ... />
<SpotLight name="side" intensity={ramp(9, 400_000)} ... />
<RectLight name="back" intensity={ramp(18, 150_000)} range={2} ... />
```

## NOTES
- Deprecated: none.
- Visual gaps: light positions/angles/powers beyond "10 W" (masterclass) and "a few" (car) are on screen only. 8 Lighting
  Tricks gives only a relative power ratio ("five" vs "25"), not absolute units — raea intensities above are illustrative
  placeholders tuned on a still. The staggered-reveal source gives no exact offset frames or curve shape; values are `~`.
- Rule conflicts: Style D's key is one soft TOP light; both videos key from front/side — move the key overhead and keep
  rear/side lights as edge lights. Lights or emissives "coming on" must ramp over ~0.4 s (no pop). RectLight casts no
  shadows, so the top SpotLight is the shadow caster. The teaser variant's no-key, backlight-only rig is a valid Style D
  exception for silhouette-only beats, not a replacement for the default top-key rig.
