---
title: Oversized or undersized version of the hero object as a recurring bit
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/100 Art Direction Ideas - Build Your Creative Toolkit.txt"
source_time: "12:15–12:40, 16:07"
tool_target: frame-brief
tier: full
use_when: "the hero object has no interesting visual variation on its own (plain box, plain packet) and a single setup needs a stand-out idea"
style_fit: "Strong fit for Style D macro: scale play is already a listed anti-slop trait ('angle, light, scale play'); this card gives a concrete recurring device — not just occasional scale tricks, but a repeatable bit the series can return to."
---

## METADATA
06_Art_Direction | brand/photo art-direction talk (SKIMS-style oversized launch items, small-box brand) | scale-based staging

## CREATIVE_INTENT
When a product has no compelling aesthetic variation (a plain box, a simple packet), making an oversized or undersized
version of it and placing that version in new scenarios becomes its own recurring content engine — "if you do have a
product where... it's not some crazy aesthetic thing, you don't have tons of variations, doing something like this...
is a [serious] strategy in itself". It also works as a one-off launch stunt (giant inflatable props) when budget allows.

## STE_PROCEDURE
1. Identify a hero object with little inherent visual variety (same shape/colour every time).
2. Build or imply one oversized (or undersized) version of it at a scale clearly different from reality.
3. Place that scaled version in a scenario the real object wouldn't fit (a room, a street, a hand).
4. Use the scaled object, not the normal one, as the frame's single surprising element.
5. Reuse this device across multiple episodes about similar "plain object" topics rather than inventing a new trick each time.
6. Check: is the scale change itself the idea, or is it hidden behind other decoration that dilutes it?

## AGENT_EXECUTION
Shot-list "State change and events": note a scale-morph event (object grows/shrinks to an exaggerated size) tied to a
word, e.g. the line names a huge total and the object itself swells to oversized before settling back. In raea, scale
is a per-frame transform value — no new asset is needed beyond the existing hero GLB.

```tsx
const scale = interpolate(f, [inF, inF + 18], [1, 6], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
<Model src={staticFile("packet.glb")} transform={Transform.fromXyz(...).withScale([scale, scale, scale])} />
```

### Worked example
Topic: a convenience store's small single-use sachet pricing adding up over a month (illustrative).
BEFORE: the sachet sits at normal size next to a running total counter.
AFTER: on the line "sebulan jadi RM60", the same plain sachet swells to fill the frame — oversized, same object, same
accent colour — making the invisible monthly total suddenly physically large.

### Check
- Is the scaled object otherwise identical to its normal form (same material, same accent), so it reads as "the same thing, bigger" not a new prop?
- Does the scale change land on the specific word that names the bigger/smaller amount?
- Is this reserved for objects that are otherwise visually plain, not used on every setup?

## NOTES
- Visual gaps: the launch-campaign inflatable examples (paddleboard, giant map) are big-budget references only — the transferable device is scale change on the existing hero object, not a new built prop.
- Rule conflicts: none; scale change must still fade/grow over ~0.4 s per the no-harsh-cuts rule, never pop to the new size.
