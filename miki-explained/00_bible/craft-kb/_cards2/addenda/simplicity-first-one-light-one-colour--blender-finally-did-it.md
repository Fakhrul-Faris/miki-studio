# Addendum → cards/04_Shading_Lighting/simplicity-first-one-light-one-colour--serene-render.md

Source: "Procedural Mograph & 3D-to-AI Render Passes/Blender Finally Did It!!.txt" — 13:10–15:33.

## New VALUES BY SOURCE column (blender-finally-did-it: concrete two-light hero rig)
| parameter | blender-finally-did-it |
|---|---|
| world | background strength set to black (0) before placing any light |
| light 1 (key) | a large plain white Emission-material plane behind the field, brightness raised "a little bit" — lights the flat sections so they cast across the bottom cleanly |
| light 2 (accent) | one Area light set to Disc shape, rotated/aimed at one corner of the piece, coloured orange, Spread brought down until the disc edge is visible, exposure tuned by eye |
| rule in practice | exactly one neutral key (the plane) + exactly one coloured accent (the disc) — no third light added |
| render settings | Cycles, 300 samples, denoiser on, film transparency/volume/transmission caps off/zero — ~3 s per frame at 1080p |

## Note
A fully concrete, worked instance of the master's "one main light, one colour" principle — a neutral plane as the
sole key/fill across a noisy field (see `mesh-to-volume-grid-noise-scale-reveal--blender-finally-did-it`) plus a
single coloured disc as the only accent, with no fill/rim beyond those two. Confirms the principle scales down to
exactly two lights total when the scene is otherwise simple.
