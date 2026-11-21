---
title: Focal point first, then a ranked visual hierarchy
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/Every Composition Concept Explained (In 3D).txt"
source_time: "00:51–01:43"
tool_target: frame-brief
tier: full
use_when: "briefing any setup with more than one object: the hero plus a price, a counter, a second product"
style_fit: "Fits Style D: rank 1 = the object the line is about (accent, sharp, biggest); rank 2–3 recede by size, light and focus. The brand accent is always rank 1's colour."
---

## METADATA
06_Art_Direction | 3D (tool-agnostic) | frame brief (Eye field) + raea transforms/materials/lights

## CREATIVE_INTENT
Composition is how elements are arranged; changing it changes the whole feeling. "Easiest place to start is by choosing
a focal point": scale the cube up and centre it and it becomes the focal point. Then **hierarchy** — how much emphasis
each element gets and in what order: make the triangle slightly larger and it is second. Besides size, hierarchy is
set by colour, shape, position, texture, intensity and lighting. Too many elements and it clutters (see the readability card).

## STE_PROCEDURE
1. Before placing anything, name the single focal point (the object the line is about).
2. Make it the largest element and put it at or near centre.
3. Rank every other element: 2nd, 3rd; give no two the same rank.
4. Set rank 2 slightly smaller than rank 1 (~70–80 % of its screen size ~).
5. Separate ranks with at least one more lever: colour, shape, position, texture, intensity, light.
6. Give rank 1 the accent colour and the brightest light; ranks 2+ neutral and dimmer.
7. If a rank-3 element competes with rank 2, remove it.

## AGENT_EXECUTION
Frame brief **Eye** field: write the order: "1 receipt total (accent, centre, sharp) → 2 coin stack (75 % size, dim,
left third) → 3 till (blurred background)". raea: rank 1 gets the emissive accent + the key light target + focus
distance; rank 2 `Transform...withScale` ~0.75 and neutral `base_color`; rank 3 out of the DoF plane.
```tsx
<SpotLight transform={Transform.fromXyz(0, 1.2, 0.4).lookingAt([0, 0, 0])} intensity={...} outer_angle={0.45} />  {/* key on rank 1 */}
<Model src={staticFile("receipt.glb")} transform={Transform.fromXyz(0, 0, 0)} />                                 {/* rank 1, accent on total */}
<Model src={staticFile("coins.glb")} transform={Transform.fromXyz(-0.12, 0, -0.05).withScale([0.75, 0.75, 0.75])} /> {/* rank 2 */}
```
(Check the scale prop shape against `~/.claude/skills/raea-bevy/scene.md` before use; kit stages may wrap these.)
### Worked example
Topic: "Kenapa harga roti canai naik 20 sen?" (a mamak in Kuala Lumpur; illustrative numbers).
- BEFORE (frame brief Eye): "roti canai, flour bag, ghee tin, gas tank, price board" — five equal objects, eye wanders.
- AFTER: "1 price board RM 1.80 → RM 2.00 (accent on 2.00, centre, sharp) → 2 ghee tin with RM tag (75 %, left
  third, half-lit) → 3 flour bag (blurred behind). Gas tank removed."
### Check
- Is exactly one element ranked 1, and is it what the line names?
- Does every ranked element differ from its neighbour by size plus one more lever?
- Is the accent only on rank 1?
- Would removing any element make the frame clearer? If yes, remove it.

## NOTES
- Visual gaps: the cube/triangle demo is on screen; "slightly larger" has no number — the ~70–80 % is inferred.
- Related set-1 card: `cards/05_Camera_Raea_Pipeline/stepped-height-hierarchy-triangle--improve-compositions.md` (height only).
- Sponsor reads (PCBWay) stripped.

## ADDENDUM — 8 Cinematic Fundamentals for 3D Short Films
Source: "Studio Lighting, Silhouettes & Color Theory/8 Cinematic Fundamentals for 3D Short Films #b3d.txt" (01:13–02:20).
- Failure case for an ambiguous focal point: the hero blends into the background because CONTRAST, not size or
  colour, is wrong — the eye doesn't know where to look even though composition and lighting both already hint at
  it correctly (black-and-white scene example: a character blends with a background tree until contrast is pushed
  on the character alone).
- Fix: darken (or otherwise separate in value) just the hero against its background — no repositioning, no new
  light needed.
- Extra step for STE_PROCEDURE: if a still fails the focal-point check and size/colour/position already look right,
  isolate the fix to contrast alone — darken or lighten rank 1 against its background until it separates, before
  touching any other lever.
| parameter | 8-cinematic-fundamentals | recommended for Style D |
|---|---|---|
| failure case | hero blends into background from wrong contrast, despite correct size/position/light | check contrast first when a setup "looks okay but unclear" despite correct size/position |
| fix | darken/separate just the hero in value, no repositioning | try a pure contrast/value push on rank 1 before changing anything else |
