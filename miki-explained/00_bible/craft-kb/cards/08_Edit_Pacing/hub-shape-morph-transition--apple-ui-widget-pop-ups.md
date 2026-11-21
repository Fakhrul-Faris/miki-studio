---
title: One surviving shape carries the scene change — it shrinks, recolours and regrows into the next UI
bucket: 08_Edit_Pacing
source: "Minimalist Tech & SaaS 3D Staging/How to Create Viral Apple-Style UI Widget Animations in After Effects! (Apple Masterclass Part 2).txt"
source_time: "26:24–29:27"
tool_target: raea
tier: full
use_when: "cutting from one UI/content block to the next without a wipe, flash or dissolve"
style_fit: "Fits exactly — the house rule is transitions built from the scene's own objects; here one shape IS the join, so nothing generic is added."
---

## METADATA
08_Edit_Pacing | After Effects (source) → raea single Entity morph across a cut | raea

## CREATIVE_INTENT
Everything built around a hub shape (the accent ring and its highlight stroke) is un-built first — the two stroke rings
retract their trim-path end to 0% (green stroke starting its retreat slightly before the gray one), the label text and
icons fade their opacity to 0, all on a slow-start/fast-end curve. The hub shape itself then does the opposite: it
shrinks to a small circle (fast start, elastic-feeling bounce down then back up), and while that bounce happens its
stroke width grows and brightens to white, its fill crossfades gray → the episode's accent colour, and — simultaneously
— the four background colour blocks crossfade to their next scene's lighter variants. Nothing else happens during this
window; because every change lands in the same breath, "none of these animations being noticed" is the goal and the
hub shape is what's left standing to build the next UI on.

## STE_PROCEDURE
1. Pick one on-screen shape (a ring, a circle, a card) to be the thing that survives the cut.
2. Retract every dependent stroke/line's drawn length to 0% and fade every dependent icon/text to 0 opacity, staggered
   a few frames apart, before touching the hub shape.
3. Shrink the hub shape to a small, simple form (ease fast-in/fast-out, no sustained bounce after it settles).
4. During that same shrink, cross-fade the hub's fill colour toward the next scene's accent and grow/brighten its
   stroke to white.
5. At the identical moment, cross-fade the background colour blocks to the next scene's variants.
6. Build the next scene's content outward from the now-recoloured hub shape.

## AGENT_EXECUTION
raea: one `Entity` (the hub) that never unmounts across the cut; everything else cued to retract/fade before it, then
the hub's scale/fill/stroke and the background colours interpolate on one shared window:
```tsx
const t = k(f, cutAt, 20, inOut);
// dependents retract first (cutAt-16 .. cutAt), hub changes on cutAt .. cutAt+20
<Entity name="hub" transform={Transform.fromXyz(0,0,0).withScale(lerp(1, 0.4, t))}>
  <Circle radius={0.3} fill={mixColor(C.grayFill, C.accent, t)} stroke={mixColor(C.grayStroke, "#fff", t)} strokeWidth={lerp(2, 6, t)} />
</Entity>
<Rect fill={mixColor(bg.sceneA, bg.sceneB, t)} />  // same t drives all four background blocks
```
Shot row: `| 6→7 | (scene join, no line) | hub ring shrinks + recolours as backgrounds swap | strokes retract, icons fade, ring becomes the next scene's accent | this card |`.

### Worked example
Topic: a kedai runcit's "jualan harian" dashboard scene handing off to its "untung bulanan" scene (illustrative).
- BEFORE: a hard cut or a generic cross-dissolve between the two dashboard cards.
- AFTER: the daily-sales ring's highlight stroke retracts, the icon and "RM120" fade out, then the ring itself shrinks,
  its stroke brightens to white and its fill turns from gray to the accent gold while the background panels crossfade
  to the monthly-view palette — the same ring then grows the new "untung bulanan" card around itself.

### Check
- Is exactly one shape kept alive across the cut (not a new object cutting in)?
- Do the dependents (strokes/icons/text) finish retracting/fading before the hub's own shrink-recolour plays?
- Do the hub's colour change and the background's colour change land on the same frames (so nothing else is noticed)?

## NOTES
- raea check (2026-11-21): `<Circle>`, `<Rect>` in the code above are stand-ins for a component the episode builds (from raea primitives such as `Cuboid`, `ImagePlane`, `Text3D`), not a raea built-in. Define it before use.
- Visual gaps: exact background hex values per scene and precise frame offsets between the two stroke retreats are
  on-screen only.
- AE dropped: trim-path end%, Deep Glow exposure pulses on the fading elements (see the glow-pulse card), and the 3D
  camera null-chain that plays over this same window (see the layered-camera-rig addendum from this source).
