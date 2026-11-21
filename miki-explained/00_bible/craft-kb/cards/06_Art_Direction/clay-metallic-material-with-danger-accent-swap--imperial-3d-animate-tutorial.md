---
title: Clay/metallic hero material, with a duplicated-and-recoloured "danger" accent variant
bucket: 06_Art_Direction
source: "3D Documentary Explainer Breakdowns/How To Animate Like Imperial (Blender & After Effects Tutorial).txt"
source_time: "12:39–13:35"
tool_target: raea
tier: full
use_when: "setting the default look for every prop in the scene, then flagging one object as the thing the line is about"
style_fit: "⚠ conflict: source applies this to human characters → adapted to hero OBJECTS only (no people in Style D); the duplicate-and-recolour step is exactly how to carry the one brand accent onto a single flagged prop without inventing a second material system."
---

## METADATA
06_Art_Direction | Imperial-style 3D breakdown | raea StandardMaterial

## CREATIVE_INTENT
Give every object in the scene one flat, de-detailed material family (metallic, low roughness, desaturated base colour)
so nothing competes for texture attention — "it's never detailed models, kind of like little clay models". Then, to mark
one object as the subject the line is about, duplicate that same material and swap only its colour toward a saturated
accent so it visibly stands out from its neutral neighbours without a different material language.

## STE_PROCEDURE
1. Set every prop's base material to Metallic = 1, Roughness lowered until it reads as a soft sheen (not a mirror).
2. Decrease the base colour's brightness slightly so the metallic sheen doesn't blow out.
3. For the one object the current line is about, duplicate its neutral material (don't build a new one from scratch).
4. On the duplicate, change only the base colour to the brand accent; optionally raise brightness slightly so it reads as "the important one".
5. Keep metallic/roughness identical between neutral and accent variants — only hue changes.
6. Check: in a wide shot, does the eye land on the accent object first, with every other object reading as one neutral family?

## AGENT_EXECUTION
Ref_<shot>.md palette: list the neutral family as one or two low-saturation hex values, plus the one accent hex, and
note which named prop carries it. In raea, build the neutral material once and reuse it; the accent object gets the
same `StandardMaterial` props with only `base_color` swapped.

```tsx
const neutral = { metallic: 1, perceptual_roughness: 0.35, base_color: "#2b2d33" };
const accent  = { ...neutral, base_color: ACCENT };   // same sheen, only the colour differs

<Mesh3d name="propA"><Cuboid half_size={[0.3,0.3,0.3]} /><StandardMaterial {...neutral} /></Mesh3d>
<Mesh3d name="heroProp"><Cuboid half_size={[0.3,0.3,0.3]} /><StandardMaterial {...accent} /></Mesh3d>
```

### Worked example
Topic: a pasar malam stall's "fast lane" item vs. the rest of the menu (illustrative).
BEFORE: every food item on the stand gets its own realistic colour and texture, so nothing is singled out.
AFTER: every item shares one neutral clay-metal material; the one item the line names ("Ni yang paling laku") is the
same material duplicated with the accent colour — it reads as the focus the instant the shot opens.

### Check
- Do all neutral objects share the same metallic/roughness values (one material family)?
- Is the accent variant a duplicate of that same material with only base_color changed?
- Is the accent used on exactly the object the current line is about, never decoratively?

## NOTES
- Visual gaps: the exact roughness/brightness values are judged on screen, not spoken (`~`).
- Rule conflicts: the source applies this material family to low-poly human characters (clay-model look); house rules
  forbid people/hands in Style D and forbid non-MPFB figures elsewhere — this card is adapted to apply to hero objects
  and props only. Do not use this to justify adding library characters.
