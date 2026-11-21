---
title: Near ground for parallax, fogged distant layer to isolate the subject; fake what the camera sees
bucket: 05_Camera_Raea_Pipeline
source: "CG Cinematography 101 | Chapter 3 | Camera Analysis (The Nuke).txt"
source_time: "01:18–02:41, 09:46–10:60, 37:20–37:54"
blender_version_source: n/a (Houdini)
tool_target: principle-only
tier: principle
style_fit: Fits Style D — a real surface close under a moving macro camera gives parallax and speed; dark fogged background isolates the hero.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Houdini source) | principle → Blender bpy + raea

## CREATIVE_INTENT
Principle: in a shot with no story, layout supplies dynamism. Fly close to the ground so its texture streams past (parallax shows speed), add a simple distant layer (mountains, rocks) softened by fog so the subject stands isolated against it. Animate cheap stand-ins instead of simulating when the camera only needs the look (the ground was keyed, not an RBD sim); use proxies to scrub fast. Ideas: a camera gliding low across a wooden counter toward the hero object, with the room behind dissolved in dark fog.

## STE_PROCEDURE
Method:
1. Place a detailed ground surface close below the camera path.
2. Check ground parallax shows the speed; if the move reads slow, increase travel speed.
3. Add simple distant shapes behind the subject.
4. Fog the distance so those shapes separate from and frame the subject.
5. For effects the camera only glimpses, keyframe the geometry instead of simulating it.
6. Use a lightweight proxy of heavy elements while laying out the camera.
How-to:
7. Add finishing details (exhaust, flames, reactions to the event) only if time allows; the shot works without them.

## AGENT_EXECUTION
### Source tool (Houdini)
- Layout: ground replaced with a more detailed one; mountains + rocks with fog; explosion as a proxy for scrubbing; ground destruction keyed, not RBD.
### Blender / raea translation
- Blender: keyed "fake" destruction via shape keys or object keys instead of rigid body; proxies via a low-poly duplicate in a collection hidden at render (`col.hide_render = True`).
- raea: near surface as a textured `Mesh3d` close under the camera; distance fade with `<Fog color={bg} near={n} far={fr} />` using the background colour, or a `<FogVolume>` for light in the air (post.md). A real-surface material: `<StandardMaterial base_color_texture=... perceptual_roughness />` (see materials.md for texture props).

## NOTES
- Rule conflicts: none; keep camera speed ≤ ~40 m/s at scene scale (macro scale: far lower).
