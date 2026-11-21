---
title: Depth of field amount and falloff sell scale (and must be lens-real)
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "44:46–52:14"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: Core of Style D (shallow DoF on a macro object): a very shallow focus band makes a normal object read as close and small — the macro look; keep it physically plausible.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: depth of field (the zone acceptably in focus) depends on aperture and subject distance; the zone grows rapidly as the subject moves away. Viewers read scale from it: a shallow DoF on a wide frame makes places feel tiny (Ant-Man, tilt-shift). Idea: match blur amount to depth (a far element as blurry as the far plate), and use physically based defocus, not a generic blur.

## STE_PROCEDURE
1. Match focus amount: an element at a given depth gets the blur of the plate at that depth.
2. Set shallow DoF (wide aperture) to make the subject read small and close; deep DoF for large/far.
3. Use an optically based defocus driven by real lens values, not a distance-ramped blur.
4. Check for lens softness: even "tack sharp" plates usually carry a 1–2 px softness; add it to CG elements.
5. If the plate uses a split diopter (two focus planes), match both planes.
6. For anamorphic plates, add edge/corner softness (see edge-softness card).

## AGENT_EXECUTION
### Source tool (Nuke)
Avoid stock `ZDefocus` for realism (not based on real-world lens values); use an optically correct defocus gizmo (taught later in the course).
### Blender / raea translation
- raea: `<DepthOfField focal_distance={d} aperture_f_stops={1.4–2.8} mode="bokeh" />` inside `<Camera3d>` (as in kit `pro.tsx` `ProStage`, default aperture 2.2). `focal_distance` in metres; animate it per frame for rack focus.
- Macro feel: small `focal_distance` (subject 0.2–0.6 m, ~) with f/1.4–2.8; real scale models (metres) so the lens math is honest (WORKING-RULES: real scale).
- The 1–2 px softness: no per-element blur prop; keep `<AntiAliasing>` default and avoid over-sharp textures, or slightly lower texture resolution on CG labels (~).
- Blender build/check: `cam.data.dof.use_dof = True; cam.data.dof.focus_distance = 0.4; cam.data.dof.aperture_fstop = 2.0`.

## NOTES
- Split diopter: raea has one focal plane; no equivalent.
- Rule conflicts: rack focus must ease in/out (no snap).
