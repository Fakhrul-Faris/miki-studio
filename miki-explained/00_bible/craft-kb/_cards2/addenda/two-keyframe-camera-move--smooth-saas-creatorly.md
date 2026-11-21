# Addendum → masters/01_Animation_Motion/two-keyframe-camera-move.md
Source: "Minimalist Tech & SaaS 3D Staging/How to do SMOOTH SAAS Animation Like Creatoroly | After Effects Tutorial.txt" — 05:08–05:51, 13:37–15:04

## Extra variant: settle-in pull back on a controller
A "controller" null parents the scene layers: scale 130 % at the start → 100 % at ~1 s 10 f (eased) — the scene arrives
zoomed in and settles out. Later the controller moves everything up (to ~3 s) while scaling down, graph shaped by hand.

## VALUES BY SOURCE row
| parameter | Smooth SaaS (AE) | recommended for Style D |
|---|---|---|
| settle | scale 130 → 100 % over ~40 f @30 fps | camera pull ≤ ~10–15 % framing change, eased out, ≥ 1 s |
