---
title: Impact bump — fast drop, slower recovery, zigzag settle
bucket: 01_Animation_Motion
source: "CG Cinematography 101 | Chapter 3 | Camera Analysis (The Nuke).txt"
source_time: "05:14–05:55, 32:49–35:55"
blender_version_source: n/a (Houdini)
tool_target: principle-only
tier: principle
style_fit: "conflict: a hand-keyed camera jolt on impact is a flashy/bouncy move; transfer only the asymmetric-timing principle to object state changes"
---

## METADATA
01_Animation_Motion | n/a (Houdini source) | principle → Blender bpy + raea

## CREATIVE_INTENT
Principle: an impact reads through asymmetric timing, not equal curves — a quick drop, then a slower attempt to recover, with a few decreasing zigzags on one axis before the camera rises to reveal the result. Equal up/down curves feel mechanical. The source hand-keys the big hit and leaves small vibration to noise. Transferable idea: when an object changes state on a word (a stamp lands, a price drops), use fast-in / slow-out timing with a short settle — without bounce or camera shake.

## STE_PROCEDURE
Method:
1. Key the moment of impact; the camera (or object) drops quickly over a few frames.
2. Key the recovery more slowly, so the down is more impactful than the up.
3. Add one or two smaller zigzags on the main axis only, each smaller than the last.
4. Then key the rise/tilt that reveals the aftermath.
5. Preview at real speed; lengthen keys that feel too fast.
How-to (our adaptation):
6. Replace the zigzag with a single eased settle (ease-out, no overshoot) for objects; never on the camera.

## AGENT_EXECUTION
### Source tool (Houdini)
- On the `correct` transform: keys on translate/rotate X — up, fast down ("bam"), slower partial recovery, smaller zigzag; ample frames after; Animation Editor "9"/"=" smoothing applied (see graph-editor-smooth-auto-slope--cg-cine-ch3-nuke).
### Blender / raea translation
- Blender (object state change, adapted): key `ob.location.z` drop over ~4 frames with `easing='EASE_IN'`, settle over ~10 frames `easing='EASE_OUT'`, interpolation `'BEZIER'` (or `'EXPO'`), no back/elastic.
- raea: `const y = f < fHit ? interpolate(f, [f0, fHit], [y0, yHit], { easing: Easing.in(Easing.cubic) }) : interpolate(f, [fHit, fHit + 10], [yHit, yRest], { easing: Easing.out(Easing.cubic), extrapolateRight: "clamp" });`

## NOTES
- Rule conflicts: camera bumps, jolts and zigzag settles are banned ("no bouncy … transitions"); objects get the asymmetric ease only.

## ADDENDUM — after effects techniques to improve any motiongraphics project
Adds the MAGNITUDE-decay half this card's TIMING-only principle lacks: across repeated impacts (a series of
bounces), scale each successive hit's distortion/displacement amount down, not just its duration — the source's own
Liquify Distortion keyframes go 100% (1st bounce) → 70% (2nd, "loses kinetic energy at every bounce") → 20% (3rd).
For an object-state-change analogue (e.g. several coins dropping one after another), scale each beat's settle
overshoot down by roughly the same ratio relative to the first, rather than repeating identical settles. ⚠ The
Liquify brush deformation itself is AE-only, not ported; only the decay-per-repeat ratio is useful, and only within
the house's no-bounce overshoot cap (≤ 3–5% over ≥ 0.4 s) — never literal 100%/70%/20% distortion, which would read
as squash-and-stretch.
