---
title: Loop ending — eased push into a white letter on the label until its white becomes the next shot's white backdrop
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "3:03:37–3:04:21, 3:19:27–3:23:03"
blender_version_source: 4.3
tool_target: Blender bpy | raea
tier: full
style_fit: Strong fit — a transition built from the scene's own object (the label's letter); do it as a 3D camera flight.
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 | DaVinci Resolve Fusion (DVE) → Blender/raea camera

## CREATIVE_INTENT
The ad ends by diving into the white of one letter; that white fills the frame and becomes the white backdrop of the first shot,
so the film loops. The author does it in 2D (Fusion DVE Z move) but says a real 3D camera move is higher quality.

## STE_PROCEDURE
### Source tool (DaVinci Resolve Fusion)
1. Duplicate the clip (`Alt`+drag) as a backup; remove its retime (`Ctrl+R`).
2. In Fusion add a DVE after MediaIn; key Z Move 0 on the beat frame.
3. Key Z Move at the last frame so the letter fills the frame.
4. In the Spline editor set the keys to ease (In Cubic), so the push starts slowly and accelerates in; adjust so the final frame is fully inside the letter.
5. Add Zoom Blur from the push's first frame (0 → 0.4 → stronger to the end).
6. Cut the music back to its start so sound and picture loop together.

## AGENT_EXECUTION
### Blender / raea translation
- Blender: animate the camera dolly toward a letter on the label with ease-in; end when the letter's white fills the frame.
- raea: compute the letter's world point on the can (from the label UV → can radius/height) and fly the camera to it:
  `const u = interpolate(f, [a, b], [0, 1], { ...clamp, easing: Easing.bezier(0.55, 0, 1, 0.45) });`
  `Transform.fromXyz(...lerp3(camA, letterPt_offset_2cm, u)).lookingAt(letterPt)`; focal_distance tracks the distance;
  the next shot opens on a white unlit backdrop of the same colour.

## NOTES
- Deprecated: none.
- Visual gaps: which letter and the DVE values are visual.
- Rule conflicts: ease-in (accelerating) end is acceptable only if it reaches the white before peak speed exceeds the cap;
  otherwise use in-out and a soft fade to white.

## ADDENDUM — Video Transitions Tips (camera-driven push/pull transitions)
Source: "Motion Feel, Easing & Camera Choreography/Video Transitions Tips.txt" (01:15–01:23, 02:12–02:27).
- The transition engine is the camera's own motion ("organic"), not a digital transition. Two variants: push through
  something to move between scenes (the letter-dive case this card already covers), or pull back to reveal new
  information (the reverse — start tight on one detail, pull back so the next line's information enters frame, e.g.
  from one price tag back to the whole menu board).
- Decide push vs pull from the join's job: "go inside / closer" = push; "show the bigger picture / new info" = pull.
  Move the camera in the direction the new content lies, never against it. Ease in-out; the reveal lands on the word.
| parameter | Video Transitions Tips | recommended for Style D |
|---|---|---|
| variants | push through (dive in) / pull out (reveal) | `tr: "in"` / `tr: "out"` (RECIPE-D §6.2) |
| numeric values | none given | keep this card's eased push; ≤ ~40 m/s, ≤ ~130°/s |
- ⚠ Source also offers whip pans (incl. a sponsored whip pack) as an energy transition — banned house transition, not carried over.

## ADDENDUM — Smooth 3D Camera Movement in After Effects (parallax push-through illusion)
Source: "Minimalist Tech & SaaS 3D Staging/Smooth 3D Camera Movement in After Effects Transcript.txt" (04:12–04:50);
also documented as its own set-2 card, `cards/05_Camera_Raea_Pipeline/parallax-push-through-image-illusion--smooth-3d-camera-movement.md`.
- A different "passing through" mechanism for the same push-transition job: split a source image into a masked
  foreground piece (card/label/subject) and the full photo behind it, both on different Z depths. As the camera
  zooms in, push the masked foreground piece forward on Z much faster than the photo so it visibly passes the
  camera (exits frame) partway through the move, while the photo keeps growing to fill the screen; add a gradient
  wipe on the photo layer timed to when the foreground piece has passed, so "looking at a photo" dissolves into
  "being inside what the photo depicts". Ease the whole move; the illusion depends on continuous motion, not a cut.
- raea sketch: `cardZ` pushes ~3x faster than `photoZ`; a `reveal` crossfade (interpolate t∈[0.55,0.85]) fades in the
  destination scene once the masked piece has passed — see the sibling card for the full snippet and worked example.
- Use this card's own letter-dive method when the hero already has a clear flat label/letter to dive into; use this
  parallax variant when the transition should read as flying through a whole photo/scene rather than a single glyph.
