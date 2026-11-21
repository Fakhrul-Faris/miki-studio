---
title: One focal point — supporting elements never outrank the hero
bucket: 06_Art_Direction
type: master
members:
  - cards/06_Art_Direction/focal-point-visual-hierarchy--every-composition-concept.md
  - cards/06_Art_Direction/one-point-of-interest-hierarchy--eye-catching-3d-scenes.md
sources: ["Every Composition Concept Explained (In 3D).txt", "How to actually make eye-catching 3D Scenes | After Effects.txt"]
use_when: "briefing any setup with more than one object on screen (hero + icons, hero + background props, hero + a second product)"
style_fit: "Fits Style D exactly: one hero object at macro detail, everything else supports without competing; rank 1 is always the object the line is about and always carries the brand accent."
---

## METADATA
06_Art_Direction | 3D staging (tool-agnostic, After Effects / general 3D) | frame-brief "Eye" field + raea transforms/materials/lights

## CREATIVE_INTENT
Before any effect is added, a scene needs exactly one point of interest, locked first; everything else is placed
around it only after, ranked so it supports without competing.
- Every Composition Concept adds the full hierarchy method: make the focal point the largest element at/near centre,
  then rank every other element (2nd, 3rd...) using more than one lever — size, colour, shape, position, texture,
  intensity, lighting — never matching the hero on any of them.
- Eye-Catching 3D Scenes adds the plainer statement of the same rule and its board-check form: supporting elements
  should be "significant but not significant enough to overshadow the main point of interest" — present, never
  distracting, checked by whether the eye lands on the hero first without hunting.

## STE_PROCEDURE
1. Before placing anything, name the single focal point — the object the line is about.
2. Make it the largest element and put it at or near centre; place supporting elements only after it is locked.
3. Rank every other element: 2nd, 3rd; give no two the same rank.
4. Set rank 2 slightly smaller than rank 1 (~70–80% of its screen size, inferred).
5. Separate ranks with at least one more lever beyond size: colour, shape, position, texture, intensity, light.
6. Give rank 1 the accent colour and the brightest light/sharpest focus; ranks 2+ stay neutral, dimmer, softer, or further back — never matching the hero's scale, brightness, or sharpness.
7. If a rank-3 element competes with rank 2, remove it; check the still — does the eye land on the hero first, without hunting?

## VALUES BY SOURCE
| parameter | Every Composition Concept | Eye-Catching 3D Scenes | recommended for Style D (+ why) |
|---|---|---|---|
| Ranking method | explicit numbered ranks (1, 2, 3) with multiple levers | binary: hero vs. "significant but not overshadowing" | use numbered ranks for scenes with 3+ objects; binary check suffices for hero + one support |
| Levers named | size, colour, shape, position, texture, intensity, lighting | not itemised (general "present but not distracting") | size + at least one more lever per rank, as in source 1 |
| Rank-2 size | ~70–80% of rank 1 (inferred, not stated as exact) | n/a | ~70–80% default, adjust by eye |
| Check method | "if rank-3 competes with rank 2, remove it" | "does the eye land on the hero first, without hunting?" | use both: board check = eye lands on hero first; removal test if any rank competes |

## AGENT_EXECUTION
Frame brief **Eye** field: write the order: "1 receipt total (accent, centre, sharp) → 2 coin stack (75% size, dim,
left third) → 3 till (blurred background)". raea: rank 1 gets the emissive accent + the key light target + focus
distance; rank 2 `Transform...withScale` ~0.75 and neutral `base_color`; rank 3 sits out of the DoF plane. Board
check: reject a still where a supporting prop is as bright, as sharp, or as large as the hero.
```tsx
<SpotLight transform={Transform.fromXyz(0, 1.2, 0.4).lookingAt([0, 0, 0])} intensity={...} outer_angle={0.45} />  {/* key on rank 1 */}
<Model src={staticFile("receipt.glb")} transform={Transform.fromXyz(0, 0, 0)} />                                 {/* rank 1, accent on total */}
<Model src={staticFile("coins.glb")} transform={Transform.fromXyz(-0.12, 0, -0.05).withScale([0.75, 0.75, 0.75])} /> {/* rank 2 */}
```
(Check the scale prop shape against `~/.claude/skills/raea-bevy/scene.md` before use; kit stages may wrap these.)

### Worked example
Topic: "Kenapa harga roti canai naik 20 sen?" (a mamak in Kuala Lumpur; illustrative numbers).
- BEFORE (frame brief Eye): "roti canai, flour bag, ghee tin, gas tank, price board" — five equal objects, eye wanders; or, in the binary form: stamp card, mirror and scissors all lit and in focus at once — no single read.
- AFTER: "1 price board RM1.80 → RM2.00 (accent on 2.00, centre, sharp) → 2 ghee tin with RM tag (75%, left third,
  half-lit) → 3 flour bag (blurred behind). Gas tank removed." The stamp-card case: card stays sharp, bright,
  centred; scissors and mirror sit soft, dim, at the frame edges, out of focus.

### Check
- Is there exactly one element ranked 1 (the hero), and is it what the line names?
- Does every ranked element differ from its neighbour by size plus one more lever?
- Is the accent only on rank 1, and are all other elements dimmer, softer, or smaller — never equal?
- Does the eye land on the hero first in the still, without hunting? Would removing any lower-ranked element still leave the idea intact — if so, remove it.

## NOTES
- Deprecated: none.
- Visual gaps: both sources' demo objects (cube/triangle; stamp card/mirror/scissors) are on screen only; "slightly larger" has no exact number — the ~70–80% is inferred.
- Related set-1 card: `cards/05_Camera_Raea_Pipeline/stepped-height-hierarchy-triangle--improve-compositions.md` (height only).
- Sponsor reads (PCBWay) stripped from source 1.
