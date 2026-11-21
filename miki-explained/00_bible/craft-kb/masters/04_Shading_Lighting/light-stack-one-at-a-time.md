---
title: Build lights from black, one layer at a time
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/light-stack-key-fill-support-bounce-layers--dark-environments.md
  - cards/04_Shading_Lighting/pitch-black-one-light-at-a-time--good-lighting-environments.md
sources: ["How to Make DARK Environments in Blender.txt", "How to get good lighting in blender.srt", "How to Light Like JACK BRIDGLAND – Layered Studio Lighting Techniques Explained.txt"]
use_when: "starting any lighting pass"
style_fit: Gives Style D's "one soft top light" a fixed build order — every later light must fix a named problem and is judged by toggling its layer against the key. Layer toggles are look-dev only; in the film lights never pop (fade ~0.4 s).
---

## METADATA
04_Shading_Lighting | 3.x–4.x (source) → bpy 5.x + raea | Blender bpy, raea

## CREATIVE_INTENT
A uniform grey world lights from every direction: no shadows, boring image. Start from pitch black, add one light, get it right, and add the next only to solve a problem the first could not; several lights tuned at once interfere. Order the stack by how much ground each layer covers: key does the heavy lifting, a dim area fill brings the image to ~80 %, narrow supports and faked bounces are the optional last 20 %, each soloable.
- good-lighting-environments: the black start, "name the problem before the next light", gather mood references first.
- dark-environments: the key → fill → supports → bounce order in separate collections; an emissive object (screen, sign) may be the key.

## STE_PROCEDURE
1. Gather photo or film references of the target mood.
2. Unplug the World Background (or set its Strength to 0).
3. Turn off every lamp, including dim practicals; confirm the rendered view is pitch black.
4. Create light collections "Key", "Fill", "Supporting", "Bounce".
5. Add the key alone and position it until it works (an emissive screen/sign/glow can be the key — settle it the same way).
6. Name the problem the key leaves (dark shadows, empty sky).
7. Add the area fill to solve it; it should bring the image to roughly 80 % of the final.
8. Only after the fill is right, add narrow support spots, then bounce lights — each for a named problem.
9. Solo each collection to check what that layer alone contributes.
9b. (from Jack Bridgland) Before combining everything, specifically solo the two layers furthest from the key — rim +
    background — together, with the key off, and judge the silhouette they produce alone; it should already read as
    a usable (if moody) image before the key restores front detail. Check this from a top-down view too, to see every
    light's position relative to the others before judging the render.
10. Toggle each optional layer on/off; drop it if the difference does not earn its place.
11. Stop when no named problem remains.

## VALUES BY SOURCE
| parameter | dark-environments | good-lighting-environments | Jack Bridgland | recommended for Style D (+ why) |
|---|---|---|---|---|
| start state | key first, others hidden | world unplugged, all lamps off, pitch black | — | pitch black (no Ambient, no Environment) |
| layers | Key, Supporting, Bounce (+ Fill) | one light per named problem | rim, background, (front/key) | Key (soft top spot), Fill only if the shadow side dies, Support/Bounce rarely |
| fill target | ~80 % of final image | — | — | ~80 % rule as a stop check |
| audition order | solo each collection one at a time | — | solo the two FURTHEST layers (rim + background) together, key off, judge the silhouette; also check from top-down | after the normal solo pass, add a rim+background-only silhouette check before combining |
| raea key | SpotLight 2,700,000 lm, outer 0.45 / inner 0.22, radius 0.6 | — | — | as dark-environments |
| raea fill | RectLight 60,000, 2×2 m | — | — | RectLight, dim |
| emissive key | emissive ×6 + PointLight at the object | — | — | emissive ×3–10 + a PointLight (emissive doesn't light neighbours) |

## AGENT_EXECUTION
Blender (check .blend):
```python
import bpy
scene = bpy.context.scene
w = scene.world.node_tree
for l in list(w.nodes["World Output"].inputs["Surface"].links): w.links.remove(l)   # unplug background
for o in bpy.data.objects:
    if o.type == 'LIGHT': o.hide_render = True; o.hide_viewport = True

LAYERS = ("Key", "Fill", "Supporting", "Bounce")
for name in LAYERS:
    if name not in bpy.data.collections:
        scene.collection.children.link(bpy.data.collections.new(name))
def solo(layer):
    for name in LAYERS:
        bpy.context.view_layer.layer_collection.children[name].exclude = (name != layer)
solo("Key")   # then "Fill", ...; set all exclude=False for the full stack
```
raea (no collections — gate named groups with a constant, render a still per step):
```tsx
const LAYERS = { key: true, fill: false, support: false, bounce: false }; // flip one, re-render a still
{LAYERS.key && <SpotLight name="key" transform={Transform.fromXyz(0, 3, 0.6).lookingAt([0, 0, 0])} intensity={2_700_000}
  outer_angle={0.45} inner_angle={0.22} shadow_maps_enabled soft_shadows_enabled radius={0.6} />}
{LAYERS.fill && <RectLight name="fill" transform={Transform.fromXyz(0, 2.2, 3).lookingAt([0, 0, 0])} intensity={60_000} width={2} height={2} />}
// emissive key: emissive={LinearRgba.from(Srgba.hex(c)).mul(6)} plus a PointLight at the object
```
Start with no `<AmbientLight>`, no `<Environment>`, no lights (renders black); after each step: `raea render EDIT.tsx --frame N -o step_k.png`.
```tsx
const SOLO = { key: false, rim: true, background: true };  // silhouette-only check (Jack Bridgland): render a still, compare to the full stack
```

## NOTES
- Deprecated: none.
- Visual gaps: the outliner collection layout is shown, not narrated beyond the three names; Jack Bridgland gives no
  numeric light positions/powers — the addition is the audition order only.
- Rule conflicts: none. Layer toggles are a look-dev tool; in the film a layer change on a word fades intensity over ~0.4 s, never pops.
