---
title: Blockout (and hero object) first, then detail
bucket: 03_Modeling_Modifiers
type: master
members:
  - cards/03_Modeling_Modifiers/blockout-or-hero-object-first--beautiful-environments.md
  - cards/05_Camera_Raea_Pipeline/lightweight-blockout-then-detail-fast-tests--eevee-animation-blender5.md
  - cards/05_Camera_Raea_Pipeline/reference-blockout-camera-first--add-tons-of-detail.md
sources: ["How To Create Beautiful Environments In Blender.txt", "Creating an Animation in Eevee (Blender 5.0).txt", "How to Add Tons of Detail To Your Renders  Blender.txt"]
use_when: "starting any new set or episode build"
style_fit: Strong — matches our shot-first gates (study → shot list → grey-box board → world → check .blend → preview before full render); in Style D the "blockout" is the hero object + its surface + every 2–3 s camera setup, fixed before any dressing.
---

## METADATA
03_Modeling_Modifiers | general / Blender 4.x / Blender 5.0 (sources) → Blender 5.3 build + raea preview | Blender bpy + raea (principle + pipeline)

## CREATIVE_INTENT
Shared why: start with whatever has the biggest effect on the final image, fix the camera and timing while the scene is
light, and only then spend time on detail — so detail goes only where the lens looks and no hour is spent on 1 % of the frame.
- Beautiful Environments: blockout of the whole scene, or drop-in finished models as blockers, or the focal object
  itself first; anything under ~5 % of frame area is low priority; replace blockers largest-on-screen first.
- EEVEE Animation (Blender 5.0): very low-detail set so the viewport stays smooth while animating the camera; fix timing
  on the blockout; quick tests at 50 % resolution, low samples (~0.5 s/frame on an RTX 4090); heavy late geometry lags EEVEE, so animation decisions belong to the blockout stage.
- Add Tons of Detail: order of work — loose shape references → cube blockout + camera (24 mm) + rough light → list and
  build the pieces that repeat → a few unique models to break the pattern.

## STE_PROCEDURE
1. Collect loose reference photos for the shapes and style (they need not be specific).
2. Set the delivery resolution first (ours: 1080 × 1920, 9:16).
3. Place the hero / largest object first — a finished library model if one exists.
4. Otherwise block out with cubes and cylinders where every major object sits (extrude a cube into the rough space).
5. Add a camera and frame it (source: Focal Length 24 mm, Clip End 1000 m so the whole blockout shows); Style D: one camera pose per 2–3 s setup.
6. Add a basic light right after the blockout (one soft top light for Style D).
7. Animate the camera / carrier on the blockout.
8. Before you add detail, render quick tests (Blender: Resolution % = 50, low samples; ours: raea stills / preview.sh) and fix timing on the blockout.
9. Check frame coverage per setup: anything under ~5 % of frame area gets low priority.
10. List the pieces that will repeat (railings, pipes, brackets, stock); model them or bring them from the Asset Browser / CC0 libraries (log in ASSET-SOURCES.md).
11. Replace blockers with detail, largest-on-screen first; re-test after each major addition.
12. Before you finish, add a few unique models to break the repeated pieces (see break-repetition-kit-dressing).
13. When the viewport lags, edit in Solid shading.

## VALUES BY SOURCE
| parameter | Beautiful Environments | EEVEE Animation (5.0) | Add Tons of Detail | recommended for Style D (+ why) |
|---|---|---|---|---|
| first object | hero / largest, or library blockers | primitive set | extruded cube space | the real hero library model + its surface |
| camera | "basic angle" after blockout | animated on blockout | 24 mm, Clip End 1000 m, aimed up | all setups placed before dressing; macro fov from blend2raea |
| light | basic, right after blockout | — | basic area light (~500 W ~) | one soft top light |
| test renders | — | 50 % res, low samples (~16 ~), ~0.5 s/frame | — | raea stills + preview.sh before any full render |
| resolution | — | 1080 × 1920 (Instagram) | 1920 × 1080 (thumbnail) | 1080 × 1920 |
| priority rule | < ~5 % of frame = low | detail after timing | repeat kit, then unique breakers | detail only where a setup looks |

## AGENT_EXECUTION
Blender 5.3:
```python
import bpy, math
sc = bpy.context.scene
sc.render.resolution_x, sc.render.resolution_y = 1080, 1920          # 9:16 delivery

def block(name, kind, loc, dims):
    (bpy.ops.mesh.primitive_cube_add if kind == 'CUBE' else bpy.ops.mesh.primitive_cylinder_add)(location=loc)
    o = bpy.context.active_object; o.name = f"BLK_{name}"; o.dimensions = dims
    return o
block("hero", 'CYLINDER', (0, 0, 0.5), (0.4, 0.4, 1.0))               # ~ sizes per shot (or link the hero GLB)
block("counter", 'CUBE', (0, 0, -0.05), (3, 1.2, 0.1))

cam_data = bpy.data.cameras.new("Cam"); cam_data.lens = 24; cam_data.clip_end = 1000      # Add Tons of Detail values
cam = bpy.data.objects.new("Cam", cam_data); sc.collection.objects.link(cam); sc.camera = cam
cam.location = (3, -3, 2); cam.rotation_euler = (math.radians(75), 0, math.radians(45))   # ~ frame by eye

key = bpy.data.objects.new("blockout_key", bpy.data.lights.new("blockout_key", 'AREA'))
key.data.energy = 500; key.data.size = 1.0; key.location = (0, 0, 2); sc.collection.objects.link(key)   # ~ soft top light

# quick blockout timing test (Blender side only)
sc.render.engine = 'BLENDER_EEVEE'                                   # 5.x id (4.2–4.5 was 'BLENDER_EEVEE_NEXT')
sc.render.resolution_percentage = 50
sc.eevee.taa_render_samples = 16                                     # ~ "low samples"
sc.render.filepath = "//test/"
# bpy.ops.render.render(animation=True)
```
Then replace `BLK_*` largest-on-screen first.

raea (our renderer — Blender only builds):
- Same order in TSX: hero `<Model>` / `<Mesh3d>` + `<Camera3d>` + key light first; set dressing later in its own component.
- Grey-box board: BlendShot plays the blockout `.glb` as clay; judge on stills (`raea render EDIT.tsx --frame N -o F.png`),
  then a cheap preview with `tools/raea/preview.sh` before any full render.
- Lens: 24 mm on 9:16 (36 mm sensor, fit to the long side) → vertical fov `2 * Math.atan(18 / 24)` ≈ 1.287 rad;
  `blend2raea.py` computes it per frame. Clip End has no raea prop.

## NOTES
- Deprecated: EEVEE Next's id was `BLENDER_EEVEE_NEXT` in 4.2–4.5 and is `BLENDER_EEVEE` again in 5.0+.
- Visual gaps: blockout proportions, camera position and the shaft opening (Add Tons of Detail 01:49–02:36) are by eye;
  the EEVEE sample count is not given.
- Kit-piece cards from Add Tons of Detail: pipe cluster, array railing, structural bracket, kit dressing.
- Rule conflicts: none. Viewport exposure boosts / Cycles-viewport speed remarks are irrelevant (raea renders). Fix all
  setups before dressing; respect the user's saved check .blend edits when rebuilding.
