# Addendum → cards/01_Animation_Motion/motion-continuity-across-cuts--cinematography-next-level.md
Source: "Minimalist Tech & SaaS 3D Staging/Apple-Style 3D Motion Design.txt" — 01:35–02:21 (scene 1→2), 12:16–12:55 (2→3), 20:46–21:40 (→4), 30:06–30:37 (4→5)

## Extra steps / values
1. Parent everything in the outgoing scene to one null; animate its scale + position on curve "100 left / 0 right"
   (slow start, accelerating into the cut) — "the animation speeds up here".
2. The incoming scene opens with the same direction of movement on "0 left / 100 right" (full speed in, long settle) —
   "it feels like the same text even though these are two separate scenes".
3. Check every transition at once in the master composition before moving on.
4. Incoming 3D scene: model starts slightly smaller and rotated a little, settling on the 0/100 curve ("helps connect the
   previous scene"); shift keys a frame or two to fine-tune.

## VALUES BY SOURCE row
| parameter | Apple-Style 3D Motion (AE) | recommended for Style D |
|---|---|---|
| out-curve | influence 100 % / 0 % on carrier scale + position | Easing.in(cubic) last 8–12 f |
| in-curve | influence 0 % / 100 % | kit `out` bezier(0.16, 1, 0.3, 1) first 12–18 f |
| carrier | one null holding the whole scene | one parent `Entity` per setup |
