---
title: Camera-move vocabulary mapped to transforms (dolly, boom, truck/slide, pan, tilt, roll)
bucket: 05_Camera_Raea_Pipeline
source: "CG Cinematography 101 | Chapter 2 | Basic Camera Breakdown.txt"
source_time: "00:06–01:31, 22:01–22:44"
blender_version_source: n/a (Houdini)
tool_target: principle-only | raea
tier: principle
style_fit: Gives shot lists and camera maps one shared word per move, each mapped to exactly one transform channel.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Houdini) | principle-only + raea

## CREATIVE_INTENT
Principle: the cinematic camera language is a small cheat sheet: translations (dolly in/out, boom up/down, truck = slide left/right) and rotations (pan, tilt, roll). Clients often call every move a "pan"; the operator should translate it to the real move. A complex sequence (push-ins, slides, zooms, a handheld feel) is just these moves combined.
Ideas: name every setup's move in the shot list with one of these words plus a direction and size.

## STE_PROCEDURE
Method:
1. Write each setup's move as `<move> <direction> <amount>` (e.g. "dolly in 0.3 m", "tilt up 8°").
2. Map translations to the dolly (position) layer and rotations to the main (aim) layer (see the layered-rig card).
3. When a brief says "pan", confirm whether it means pan (rotation) or truck/slide (translation).
4. Use zoom (focal length) only where the move should not change perspective.

## AGENT_EXECUTION
### Source tool (Houdini)
A cheat-sheet node shown in the viewport; moves performed on Transform nodes above a camera (see layered-rig card).
### Blender / raea translation
| move | Blender channel (camera-local) | raea |
|---|---|---|
| dolly in/out | location along local -Z | camera position moves along (target − position) |
| truck / slide | location along local X | position and look-at both shift sideways |
| boom / pedestal | location along local Y / world Z | position and look-at shift up |
| pan | rotation about world up | look-at point moves sideways, position fixed |
| tilt | rotation about local X | look-at point moves up/down |
| roll / dutch | rotation about local Z | `lookingAt(target, up)` with a rotated `up` |
| zoom | `cam.data.lens` | `projection={{ Perspective: { fov } }}` per frame |
```tsx
const p: V3 = [x0 + slide, y0 + boom, z0 - dolly];
const t: V3 = [tx + pan, ty + tilt, tz];
<Camera3d transform={Transform.fromXyz(...p).lookingAt(t, [Math.sin(roll), Math.cos(roll), 0])} projection={{ Perspective: { fov } }} />
```

## NOTES
- Deprecated: none.
- Visual gaps: the cheat-sheet image is on screen only; the move list above is what is spoken.
- Rule conflicts: none for the vocabulary. Each move is eased in-out (or enters already moving) and stays under ~130°/s and ~40 m/s.

## ADDENDUM — Camera move menu by meaning, from Cinematic Camera Movements Blender Tutorial
Source: "Motion Feel, Easing & Camera Choreography/Cinematic Camera Movements Blender Tutorial.txt" (00:19–01:03,
01:24–03:13, 04:12–04:34, 05:20–06:15); also documented as its own set-2 card,
`cards/05_Camera_Raea_Pipeline/camera-move-menu-by-meaning--cinematic-camera-movements.md`.
- Confirms the same discipline — name what the line needs (suspense, connection, scale, reveal, follow) before
  picking the move, and never reuse the previous setup's move type.
- Names 10 moves with explicit purpose (static = suspense through absence of movement; push/pull = connection or
  loneliness; truck = follow a moving subject; pedestal = truck but vertical; tilt, slow, = reveal scale; zoom =
  suspense or a practical phone-style look; tracking = the unnoticed workhorse, `.lookingAt()` every frame; arc =
  orbit around the subject; crane/jib = big high-to-low arcs for a big-budget feel).
- ⚠ Excluded from this source: whip pan, dolly zoom, POV walk-with-gravity, handheld — all house-banned (no whip
  pans/crash zooms, no handheld by default, no people/POV). Keep this card's 10 calm moves, eased in-out, under
  ~130°/s and ~40 m/s.
- Shot-list habit: write the move name first, then the framing (e.g. "tilt up (scale reveal): tag → full shelf");
  on the board/animatic, no two consecutive setups share the same move name.
