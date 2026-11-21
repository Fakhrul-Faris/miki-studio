# Addendum → masters/01_Animation_Motion/cycles-fmodifier-loops.md

Source: "Procedural Mograph & 3D-to-AI Render Passes/Blender Finally Did It!!.txt" — 08:05–10:11.

## New variant: dual-noise-sample crossfade loop (no Cycles F-modifier)
Instead of a Cycles modifier repeating a single curve, this method loops a *procedural noise pattern* (driving the
per-instance scale reveal in `mesh-to-volume-grid-noise-scale-reveal--blender-finally-did-it`) by duplicating the
whole noise-sampling chain, offsetting the duplicate's position input, and crossfading between the original and the
duplicate with an animated Mix node.

| parameter | blender-finally-did-it |
|---|---|
| what loops | a Noise Texture sample (position-offset through the field), not a single F-curve |
| method | duplicate the Position → Vector Math → Noise Texture chain; the duplicate's position offset is shifted; a Mix (Color, factor animated) node crossfades original → duplicate |
| loop length | 25 frames (`I` keyframe Factor 0 at frame 0, 1 at frame 25, back to 0 at loop end) |
| interpolation | Linear (required — "otherwise it will not loop") |
| decide-first rule | settings (Color Ramp gaps, noise scale) should be locked before duplicating the chain — editing the Color Ramp after is fine (there's only one), but the two Noise Textures must stay identical |

## Note
Same seam-matching goal as the master ("the repeat must be invisible") but solves it for a *procedural pattern*
rather than a keyed curve — closer to a crossfade dissolve between two identical-but-offset noise fields than to an
F-curve cycle. In raea: compute the same noise field twice with a phase offset and `mix` them with a triangle wave
(`0→1→0` over the loop length, linear), rather than looking for a Cycles-modifier equivalent (raea has none — it
samples per frame already).
