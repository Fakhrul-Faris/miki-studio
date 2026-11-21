---
title: Reactive shadow/light trailing a moving object (matte parented to the mover)
bucket: 01_Animation_Motion
source: "Procedural Mograph & 3D-to-AI Render Passes/after effects techniques to improve any motiongraphics project.txt"
source_time: "02:25–03:48"
tool_target: raea
tier: principle
use_when: "a hero object moves through a scene and the ground/background around it should visibly react (darken then brighten) as it passes, selling contact and presence"
style_fit: "Principle ports cleanly to raea's real lighting: a light or shadow following the hero as it moves is just a light/shadow-caster parented to the same transform. No AE matte/parenting steps needed — Bevy computes real shadows if the mover casts one."
---

## METADATA
01_Animation_Motion | After Effects (radial blur matte "Peak Whip"-parented to a mover + brightness-boosted matte reveal) | principle → raea parented light/shadow-caster

## CREATIVE_INTENT
A moving object that leaves the ground around it completely unaffected reads as pasted-on. The source fakes a
trailing "shadow" with a radial-blurred, color-filled matte parented to the mover's position, and a trailing
"highlight" with a brightness-boosted duplicate revealed through a matte circle also parented to the mover — both
riding along as the object moves, so the environment visibly reacts to its passage.

## STE_PROCEDURE
1. Identify the moving hero object's position channel — this is what any reactive effect must be parented to.
2. For a shadow trail: attach a soft, dark, radially-blurred falloff centered on the mover's ground-projected
   position, moving with it.
3. For a highlight trail: attach a soft, brighter falloff centered on the mover's position on the opposite/leading
   side from the shadow.
4. Keep both subtle enough to read as environmental reaction, not a spotlight following the object like a stage
   performer.
5. Check the trail disappears cleanly once the object leaves frame or stops (no lingering matte).

## AGENT_EXECUTION
raea (a real light/shadow, not a faked matte — parent it to the mover's own transform):
```tsx
const moverPos = heroTrajectory(f); // same function driving the hero object's own transform
<PointLight name="passReact" transform={Transform.fromXyz(moverPos[0], 0.05, moverPos[2] + 0.15)}
  color="#fff3dc" intensity={25000} range={0.8} />
{/* the hero itself still casts its own real shadow from the key — no extra fake shadow needed if shadow_maps_enabled is on */}
```

### Worked example
Topic: "Kenapa duit syiling bergerak kat atas meja nampak 'hidup'?" (illustrative — a coin sliding across a counter).
BEFORE: `| 4 | "duit bergerak" | coin slides across table, table surface unaffected | — | — |` — reads flat, pasted-on.
AFTER: `| 4 | "duit bergerak" | coin slides; a small soft PointLight (warm, range 0.8) parented to the coin's own
position trails just behind it, ground brightens slightly as the coin passes | coin's real cast shadow travels with
it from the existing key | reactive-shadow-follows-object--ae-techniques-improve-motiongraphics |`

### Check
- Is the reactive light/shadow parented to the SAME transform driving the hero, not independently keyframed?
- Is it subtle (environmental reaction), not a visible spotlight following the object?
- Does it stop cleanly when the object does?

## NOTES
- Visual gaps: exact radial-blur amount (~90, per source) and matte sizing are shown only on screen — AE-specific,
  not ported.
- AE steps dropped: Liquify is unrelated to this effect but shares the clip; radial-blur matte + Peak Whip parenting
  + brightness-boosted duplicate comp are all AE-only mechanics, replaced above by a real parented light since raea
  computes actual shadows/falloff rather than faking them with mattes.
