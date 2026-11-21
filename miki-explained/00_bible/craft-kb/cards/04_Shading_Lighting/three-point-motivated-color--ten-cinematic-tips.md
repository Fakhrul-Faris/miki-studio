---
title: Key / back / fill lighting with motivated colour temperature
bucket: 04_Shading_Lighting
source: "10 Tips to make Your 3D Render more Cinematic.txt"
source_time: "16:20–19:53"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: Partly fits — Style D is one soft top key; borrow the back light for separation and the "motivated colour" logic, keep fill minimal.
---

## METADATA
04_Shading_Lighting | 3.x (legacy EEVEE) | Blender bpy + raea

## CREATIVE_INTENT
Three roles: key (brightest, from a slight front angle), back light (silhouette that separates subject from background), fill (lifts the dark gap between them). Start from the emotion, then motivate each light's colour by a believable source (cool moon, warm street lamp/window); avoid unmotivated red/green. Skip fill on purpose to keep a subject mysterious.

## STE_PROCEDURE
1. Before adding lights, set the World colour almost to black and switch the viewport to Rendered (EEVEE).
2. Add the brightest, most natural source first (the source: moon = Sun lamp, faint blue tint).
3. Add the next most prominent motivated source (window = rectangular Area light sized to the window, orange tint).
4. Light the hero with a separate Spot light: large Spot Size, soft Blend, aimed to hit the character not the wall.
5. Give the hero light a colour that differs from existing sources (blue–magenta "neon") so it reads as its own source.
6. Add fill only where you want detail; omit it on subjects that should stay mysterious.
7. Add a back/rim light for separation (see "Cheated rim spot").

## AGENT_EXECUTION
- Blender:
  ```python
  import bpy, math
  w = bpy.context.scene.world; w.node_tree.nodes["Background"].inputs["Color"].default_value = (0.002,0.002,0.003,1)
  def light(name, kind, loc, energy, color, **kw):
      d = bpy.data.lights.new(name, kind); d.energy = energy; d.color = color
      for k,v in kw.items(): setattr(d,k,v)
      o = bpy.data.objects.new(name, d); bpy.context.collection.objects.link(o); o.location = loc; return o
  moon = light("Moon","SUN",(0,20,15), 2.0, (0.8,0.88,1.0))            # ~ strength
  win  = light("Window","AREA",(4,3,2.5), 200, (1.0,0.6,0.3), shape='RECTANGLE', size=1.2, size_y=1.6)  # ~
  hero = light("HeroSpot","SPOT",(-2,-2,3), 300, (0.6,0.4,1.0), spot_size=math.radians(60), spot_blend=0.8)  # ~
  ```
  Aim with a Track To constraint on each light.
- raea (skill: start with a key + a little fill):
  `<SpotLight transform={Transform.fromXyz(-2,3,-2).lookingAt(hero)} intensity={900000} color="#9a66ff" outer_angle={0.5} inner_angle={0.25} shadow_maps_enabled />`
  window: `<RectLight transform={...lookingAt(...)} intensity width height color="#ff9a4d" />` (no shadows);
  moon: `<DirectionalLight color="#cfe0ff" illuminance={2400} shadow_maps_enabled />`; fill: `<AmbientLight brightness={20-80} />`.

## NOTES
- Energies in the video are not stated (visual only); values above are `~`.
- Rule conflicts: Style D wants one soft top key + one accent; keep extra coloured sources to motivated practicals and never let a second saturated colour compete with the brand accent.
- bpy fixed for 5.3: incomplete snippet: added `import bpy, math`.
