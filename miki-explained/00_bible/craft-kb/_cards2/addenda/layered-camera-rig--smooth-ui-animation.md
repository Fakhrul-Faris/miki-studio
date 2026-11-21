# Addendum → masters/05_Camera_Raea_Pipeline/layered-camera-rig.md
Source: "Motion Feel, Easing & Camera Choreography/Smooth UI Animation After Effects Tutorial.txt" — 09:52–14:23

## Variant: nested-null 3D UI tumble (screen flies in, flips, settles)
1. UI comp made 3D with collapse transformations (all inner layers must be 3D or it breaks); parented to 3D null 1.
2. Null 1: keys at ~25 f — start scale 30, X rot −30, Y rot −90 → end scale 100(~), X rot −10, Y 0; easy ease + graph.
3. Null 2 (child of 1): 20 f later X rot −20, Y rot 180; easy ease.
4. Back face: duplicate the UI layer, Y rot 180, nudge forward on Z — the flip reveals a real back side, seamless.
5. Null 3 (child of 2): orientation + position — a few frames: reduce Z (push) and tilt X orientation; 2 s later move down,
   orientation 0; a few frames later reset position, X orientation 10°; easy ease all, refine curves.
6. Re-adjust UI elements to the camera path; reduce the depth controller if Z feels too strong.

## VALUES BY SOURCE row
| parameter | Smooth UI Animation (AE) | recommended for Style D |
|---|---|---|
| layer 1 (entry) | scale 30→100, rotX −30→−10, rotY −90→0 over ~25 f | same angles over ≥ 36 f @30 fps (−90° in 25 f = 108°/s avg, peak > 130°/s eased) |
| layer 2 (flip) | rotX →−20, rotY →180 over 20 f | 180° needs ≥ ~1.4 s avg to stay ≤ 130°/s peak-ish → ≥ 54 f, or split across a cut |
| layer 3 (push/drift) | Z push + orientX tilt, down, orientX 10° | small push ≤ ~0.1 m, eased |
| back face | duplicate rotY 180, small +Z | two `Card3D`s back to back (kit pro.tsx `ry` = π) |
