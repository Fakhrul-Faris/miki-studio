---
title: Render at 60/120 fps so the edit can speed-ramp into slow motion on a beat
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "2:23:27–2:24:29, edit 3:06:50–3:10:30, 3:26:25"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Useful for one slow hero moment (pour, splash); ramps must be smooth eased speed changes, not jarring.
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 | Blender bpy + Resolve (Retime) + raea

## CREATIVE_INTENT
Slowing a 24 fps render in the edit stutters (24 frames stretched over 5 s ≈ 4–5 frames per second). Rendering at 60 fps gives
2.5× clean slow motion on a 24 fps timeline (120 fps → 5×). Speed points then put the slow part exactly on the beat.

## STE_PROCEDURE
1. Before you render a shot that will be slowed, set the scene frame rate to 60 (or 120) fps.
2. Optionally also slow the simulation (Fluid Time Scale 0.5) for extra slow motion.
3. In Resolve, put the clip on the 24 fps timeline; open Retime Controls (`Ctrl+R`).
4. Add speed points; set the fast section to ~233–260 % and keep the slow section at 100 % (= 60/24 slower than real time).
5. Drag the speed point so the slow-down begins exactly on the beat; slide the clip's lower half (not the retime) to reposition.
6. Very high values (author tried 1400 %) read as a hard rush — use sparingly.

## AGENT_EXECUTION
- Blender: `scn.render.fps = 60` (or 120); fluid: `domain.modifiers["Fluid"].domain_settings.time_scale = 0.5`.
- raea: no retime of rendered footage is needed — time is a function of the frame. Remap: `const t = f < a ? f : a + (f - a) * 0.4;`
  and drive the animation/simulation from `t` (for `<Goo>`, bake at the shot's real seconds and sample the bake at `t / fps`).
  Smooth the speed change with an eased blend over ~10 frames.

## NOTES
- Deprecated: none.
- Visual gaps: Resolve UI steps are shown on screen.
- Rule conflicts: abrupt speed ramps (fast → slow snaps) read as flashy; ease the ramp in raea and keep the fast part under the
  speed caps.
