---
title: Negative fill (black blocker) for contrast
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/black-blocker-box-negative-fill--good-lighting-environments.md
  - cards/04_Shading_Lighting/negative-fill-contrast-control--backlight-everything.md
sources: ["How to get good lighting in blender.srt", "Backlight Everything - A Cinematographer's Hammer.txt"]
use_when: "carving contrast on the hero's shadow side"
style_fit: Principle fits Style D (dark room, shadow as character, contrast chosen per shot); the mechanism has no raea equivalent — raea's Environment/Ambient cast no shadows and can't be blocked by geometry — so take light away by lowering/rotating fill, never by a "negative light". Keep detail near black (no crushed shadows).
---

## METADATA
04_Shading_Lighting | Blender 3.x + live-action principle → bpy 5.x + raea approximations | Blender bpy, raea

## CREATIVE_INTENT
Ambient bounce and an all-round sky flatten a subject. A large black blocker on the shadow side absorbs light from that direction, deepening shadows and giving direction and drama — "choose your own contrast". Its size and distance set the shadow depth; subtle amounts only.
- good-lighting-environments: Blender mechanism — a big black cube behind the camera (or an open-faced box over the foreground) so a white world/HDRI lights only from the open sides.
- backlight-everything: cinematographer's method — decide the lit:shadow ratio first, meter both sides, keep values close on soft front light (graphic look = harder), back the neg off or add a small white fill to open up.

## STE_PROCEDURE
1. Decide the shot's contrast ratio (lit side vs shadow side) before adding any fill.
2. Add a Cube, scale it large; place it on the shadow side or behind the camera, outside the frame.
3. Give it a material with Base Color pure black, Roughness 1.
4. Optionally delete the face toward the scene and wrap the box over the foreground.
5. Check the box is not visible in the camera (Object › Visibility › Camera off).
6. Make the neg bigger or closer for deeper shadows.
7. To soften, move the neg back, or replace it with a small white fill.
8. Measure: sample lit and shadow luminance (meter / false colour); for soft front light keep them close.
9. Check across an object's width that exposure changes gradually, not crunches.
10. Compare before/after; back off if the effect is extreme.

## VALUES BY SOURCE
| parameter | good-lighting-environments | backlight-everything | recommended for Style D (+ why) |
|---|---|---|---|
| blocker | black cube ~25×2×15 at ~(0,-30,5), behind camera | 20×20 black solid on shadow side | Blender look tests only |
| material | Base Color (0,0,0), Roughness 1 | black flag | — |
| strength | subtle | size/distance set depth; ratio metered | moderate ratio; keep detail near black |
| raea ambient | — | AmbientLight 55 → 20 | 20–40 (lower = deeper shadow side) |
| raea Environment | lower `intensity`, rotate bright side away | same | rotate so bright side faces away from the shadow side |
| raea blocker | `<Mesh3d shadow="only">` blocks a DirectionalLight | `shadow="only"` blocks direct light | for direct key/fill only |
| AO | `<AmbientOcclusion quality="high" />` | AO deepens contact for indirect only | "medium"; "high" on close-ups |

## AGENT_EXECUTION
Blender (5.x, look tests):
```python
import bpy
bpy.ops.mesh.primitive_cube_add(location=(0, -30, 5)); b = bpy.context.object   # ~ behind camera / shadow side
b.scale = (25, 2, 15)
m = bpy.data.materials.new("Blocker")
p = m.node_tree.nodes["Principled BSDF"]
p.inputs["Base Color"].default_value = (0, 0, 0, 1); p.inputs["Roughness"].default_value = 1.0
b.data.materials.append(m)
b.visible_camera = False     # still blocks world light (Cycles / EEVEE Next raytracing)
```
raea (no negative light; take light away instead):
```tsx
<AmbientLight brightness={20} />                                         {/* was 55: deeper shadow side */}
<Environment src={staticFile("studio_1k.hdr")} intensity={0.5} rotation={2.6} />  {/* bright side away */}
<DirectionalLight transform={Transform.fromXyz(3, 6, 2).lookingAt([0, 0, 0])} illuminance={9000}
  shadow_maps_enabled soft_shadow_size={6} />
<Mesh3d name="flag" shadow="only" transform={Transform.fromXyz(-1.2, 1, 0)}>   {/* blocks direct light, unseen */}
  <Cuboid half_size={[0.05, 1, 1]} />
  <StandardMaterial base_color="#000000" />
</Mesh3d>
<AmbientOcclusion quality="medium" />
// and: remove any RectLight / fill on the shadow side
```
Values `~`; HDRI filename is a placeholder.

## NOTES
- Deprecated: none (5.x: `Material.use_nodes` is default-on and warns of removal in 6.0 — not needed).
- raea ambient is uniform and cannot be blocked by geometry; only AO darkens creases, and only indirect light. For a directional "neg", rotate an Environment or keep fills on one side only.
- Visual gaps: box size and placement shown, not stated; live-action neg in one shot visible in a helmet reflection.
- Rule conflicts: none; keep detail near black (see keep-detail-near-black-no-crushed-shadows--dark-environments).
