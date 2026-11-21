---
title: Layer 3 — subtle non-simulated sway (wind) on scattered items, shared across systems
bucket: 01_Animation_Motion
source: "The Key to Realistic Environments in Blender.txt"
source_time: "06:49–09:30"
blender_version_source: 3.x
tool_target: raea
tier: principle
style_fit: Ambient micro-motion keeps a held macro setup alive between word-cued state changes; must stay very slow and small (no bouncy motion).
---

## METADATA
01_Animation_Motion | 3.x (G-Scatter Wind effect, GN-based) | raea (render-time motion)

## CREATIVE_INTENT
Principle: motion is the layer that turns an accurate scene "alive", and it adds realism even to stills. Use very low speed and strength with a lot of detail so individual items move differently but the sway stays subtle. Ideas for us: a leaf, steam, a dangling tag, paper edges barely breathing in a held shot — never the hero's state change itself.

## STE_PROCEDURE
Method / how-to:
1. Add a wind/sway effect to the rotation of scattered items (procedural, not a force-field simulation).
2. Set low speed, low strength, high detail (values unknown, visual only).
3. Raise strength only if the scene is meant to be windy.
4. Link the same effect to every scatter system so one change updates all.

## AGENT_EXECUTION
### Source tool (G-Scatter)
Rotation tab → add **Wind** effect → low Speed/Strength, high Detail. Other systems: select asset → link-effect icon in Rotation tab → type "w" → linked Wind effect (shared settings).

### Blender / raea translation
- Blender GN (only if baking to per-object keyframes): `Scene Time [Seconds] -> Math(Multiply, ×~0.2 speed) -> Noise Texture(4D) [W]`; `Position -> Noise Texture [Vector]`; `Noise [Fac] -> Map Range(0–1 → -~0.03–~0.03 rad) -> Combine XYZ [X],[Y] -> Rotate Instances [Rotation]` (Local Space on). One node group reused by every system = the "linked effect". GN instance motion does not export as glTF animation unless baked per object — prefer raea.
- raea (preferred): give each swaying part its own `<Mesh3d name>`/`<Model>` and drive `transform` from the frame with a seeded per-part phase:
```tsx
const f = useCurrentFrame(); const t = f / fps;
const sway = 0.02 * Math.sin(t * 2 * Math.PI * 0.25 + phase[i]) + 0.008 * Math.sin(t * 2 * Math.PI * 0.61 + phase2[i]); // ~ rad
<Model name={`leaf${i}`} src={staticFile("leaf.glb")} transform={Transform.fromXyz(...p[i]).withRotation(Quat.fromEuler("XYZ", sway, 0, sway * 0.5))} />
```
  `phase` from a seeded list (never `Math.random()` per frame). Smooth sines only — no springs. (`Transform.fromXyz(...).withRotation(Quat.fromEuler("XYZ", x, y, z))` per animation.md.)

## NOTES
- No simulation = light and render-equals-play safe.
- Visual gaps: the add-on's Speed/Strength/Detail values are not spoken.
- Rule conflicts: no bounce, no rushed motion; amplitude a few degrees max, period ≥ 2 s. Never apply to figures (they hold poses). Default no plants/people in street scenes.
