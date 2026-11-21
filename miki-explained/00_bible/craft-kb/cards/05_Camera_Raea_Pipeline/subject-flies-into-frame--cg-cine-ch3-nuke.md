---
title: Let the subject enter the frame instead of panning to it
bucket: 05_Camera_Raea_Pipeline
source: "CG Cinematography 101 | Chapter 3 | Camera Analysis (The Nuke).txt"
source_time: "02:08–03:18"
blender_version_source: n/a (Houdini)
tool_target: principle-only
tier: principle
style_fit: Fits Style D — a hero object sliding/growing into a held setup (~0.4 s ease, never popping) is livelier than the camera hunting for it.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Houdini source) | principle → Blender bpy + raea

## CREATIVE_INTENT
Principle: an object flying into the frame is more dynamic than panning the camera onto it or having it already sitting there. The camera "doesn't know" about the subject yet; the subject arrives, then the camera picks it up. Ideas for us: the hero object (a card, a coin, a phone) slides into an already-composed macro setup on the word that names it; the camera then reacts with a small eased reframe.

## STE_PROCEDURE
Method:
1. Compose the empty setup first, with space where the subject will land.
2. Start the subject outside the frame edge on the side it will travel from.
3. Animate the subject into its mark with an ease-out (fast in, settling).
4. After the subject settles, let the camera follow with a smaller, later eased move (pan down / push in).
How-to:
5. Time the subject's arrival to the spoken word; keep the entry ≥ ~0.4 s.

## AGENT_EXECUTION
### Source tool (Houdini)
- Spaceship keyed on its main move (linear forward Z), plus two rotation noise layers for rocking; the camera is held still at the start so the ship enters frame from behind/side, then the camera pans down to pick it up.
### Blender / raea translation
- Blender: key the hero's location from off-frame to mark: `ob.location = off; ob.keyframe_insert("location", frame=f0); ob.location = mark; ob.keyframe_insert("location", frame=f0+12)`; set the keys' `interpolation='BEZIER'`, `easing='EASE_OUT'`.
- raea: `const k = interpolate(f, [f0, f0 + 12], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });` → `<Mesh3d name="hero" transform={Transform.fromXyz(off[0] + (mark[0]-off[0])*k, ..., ...)}>`; camera reframe starts a few frames later with `Easing.inOut`.

## NOTES
- Source's ship animation is self-described as "janky"; take the principle, not the curve.
- Rule conflicts: no pop-ins and no "flashy" fly-bys — entry speed stays readable; no overshoot bounce on landing.
