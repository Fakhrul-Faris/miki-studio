---
title: Layered camera noise: amplitude rises as the subject gets close, falls when zoomed in
bucket: 01_Animation_Motion
source: "CG Cinematography 101 | Chapter 4 | Camera Analysis (The Chase).txt"
source_time: "14:05–15:45, 24:22–25:03"
blender_version_source: n/a (Houdini)
tool_target: principle-only | Blender bpy | raea
tier: principle
style_fit: "conflict: smooth camera" — keep only the rule that any residual motion scales with lens and proximity.
---

## METADATA
01_Animation_Motion | n/a (Houdini) → Blender 4.2+ / raea | principle + translation

## CREATIVE_INTENT
Principle: use several noise layers, each with its own job. A "ship noise" layer is animated: it bumps hard when a ship passes very close (the camera feels the wake), and its amplitude ramps up as the camera nears the engines, so intensity builds. A separate layer covers the lens: on a telephoto the same amplitude looks far too exaggerated, so tone it down when zoomed in, and keep separate controls for wide vs tele.
Ideas: tie any residual camera motion to distance (near = more) and focal length (tele = less).

## STE_PROCEDURE
Method:
1. Add a base noise layer for the overall handheld feel.
2. Add a proximity noise layer; key its amplitude up where the subject passes close or the camera approaches the danger.
3. Add a lens noise layer; key its amplitude down while the focal length is long.
4. Review wide and tele sections separately and balance the layers.

## AGENT_EXECUTION
### Source tool (Houdini)
Several Motion Effects > Noise CHOPs on the camera transforms; "Amplitude" parameter keyed per section.
### Blender / raea translation
Blender: one Noise F-modifier per layer empty; key `strength` with `fc.modifiers[0]` driven by a custom property, or use a driver on strength = f(distance).
raea (deterministic):
```tsx
const d = Math.hypot(sub[0] - p[0], sub[1] - p[1], sub[2] - p[2]);
const near = interpolate(d, [0.3, 2.0], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const lensK = 35 / focal;                              // tele → smaller
const amp = 0.0015 * (0.3 + 0.7 * near) * lensK;       // radians, tiny
const n = (k: number) => Math.sin(f * 0.1 + k) * 0.6 + Math.sin(f * 0.043 + 1.7 * k) * 0.4;
const aim: V3 = [t[0] + n(1) * amp * d, t[1] + n(2) * amp * d, t[2]];
```

## NOTES
- Deprecated: none.
- Visual gaps: the noise layers and amplitude curves are shown, not given as values (~14:05–15:45, ~17:08–19:33).
- Rule conflicts: visible shake and "intensifying" jitter conflict with smooth camera rules; use at most imperceptible amplitudes. The scaling logic (lens, distance) is the transferable part.
