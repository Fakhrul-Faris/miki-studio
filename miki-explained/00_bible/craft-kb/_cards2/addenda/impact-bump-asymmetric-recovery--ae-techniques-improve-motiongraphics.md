# Addendum → cards/01_Animation_Motion/impact-bump-asymmetric-recovery--cg-cine-ch3-nuke.md
Source: "Procedural Mograph & 3D-to-AI Render Passes/after effects techniques to improve any motiongraphics project.txt" — 00:00–02:25.

## New VALUES BY SOURCE column (ae-techniques: diminishing distortion per successive bounce)
| parameter | ae-techniques (Liquify impact bump) |
|---|---|
| Tool | After Effects Liquify effect, Distortion % keyframed 0 → 100 → 0 per bounce (brush-deformed, not geometry) |
| 1st bounce | Distortion 100% at point of impact, back to 0 roughly a second after |
| 2nd bounce | Distortion lowered to **70%** ("the sphere loses kinetic energy at every bounce") |
| 3rd bounce | Distortion lowered further to **20%** |
| Smoothing | curve smoothed slightly after keying, same asymmetric fast-in idea as the master card |

## Extra steps
- Where the master card already gives the fast-drop / slow-recovery TIMING shape, this adds the explicit MAGNITUDE
  decay across repeated impacts: scale each successive bounce's distortion/displacement amount down (100% → 70% →
  20% in the source), not just its timing — so a series of bounces/impacts reads as losing energy, matching the
  house "settle" idea but applied per-repeat rather than within one hit.
- For an object-state-change analogue (per the master's adaptation: no camera shake, no squash-and-stretch pop): if
  a brief needs several repeated impact beats (e.g. coins dropping one after another), scale each beat's settle
  overshoot down by roughly the same ratio (~70%, then ~20% of the first) rather than repeating identical settles.

## Notes
- Liquify brush-based deformation itself is AE-only and not ported (raea has no equivalent brush deformer); only the
  decay-per-repeat NUMBER pattern is useful, and only applied to object settle amounts within the house's no-bounce
  cap (overshoot ≤ 3–5% over ≥ 0.4 s) — never literally 100%/70%/20% distortion, which would read as squash-and-stretch.
