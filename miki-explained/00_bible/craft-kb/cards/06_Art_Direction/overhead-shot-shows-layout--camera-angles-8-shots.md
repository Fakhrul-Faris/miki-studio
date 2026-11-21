---
title: Overhead (top-down) shot to show the whole layout and how parts relate
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/How Camera Angles Control What We Feel 8 Essential Shots | Visual Storytelling.txt"
source_time: "00:51"
tool_target: shot-list
tier: full
use_when: "a line is about how several things relate or are arranged (steps in order, stock on a shelf, money split into parts)"
style_fit: "Fits Style D: a top-down setup is a strong 'new angle' between low 3/4 macro setups; keep the soft top light off-axis so the hero still casts a readable shadow; camera reaches it by an eased flight, never a whip."
---

## METADATA
06_Art_Direction | general (live-action film) | shot-list setup, frame brief, raea Camera3d

## CREATIVE_INTENT
Point the camera straight down. Now we see the whole layout and how each element fits within it — the shot explains
relationships, not emotion.

## STE_PROCEDURE
1. Use an overhead setup when the line names several items, an order, or a split.
2. Arrange the items on the surface so their layout itself shows the relation (a row = order, piles = split).
3. Place the camera directly above, aimed straight down (pitch −90°).
4. Fill the 25–60 % subject band with the group, not one item; keep the lower ~25 % clear for captions.
5. Put the accent on the one item the line names.
6. Enter the overhead by an eased rise from the previous setup's angle (≤ ~130°/s).
7. Before the next line, leave the overhead for a low or 3/4 angle so stills do not repeat.

## AGENT_EXECUTION
Shot-list cell: `top-down, straight down, group fills ~50 % width`. Frame brief "Eye": the accent item. raea (pitch
straight down needs an up vector that is not parallel to the view):
```tsx
<Camera3d transform={Transform.fromXyz(0, 1.2, 0).lookingAt([0, 0, 0], [0, 0, -1])}
  projection={{ Perspective: { fov: (35 * Math.PI) / 180 } }} />
```
Use `up = [0, 0, -1]` so the frame's top is the set's far side; the default `[0, 1, 0]` up is degenerate when looking
straight down.
### Worked example
Topic: "Cara bahagi duit jualan pasar malam: 3 bekas" (how-to; illustrative).
- BEFORE row: `| 5 | "Asingkan modal, untung, simpanan" | 3/4 close-up of one container | label pops |`
- AFTER row: `| 5 | "Asingkan modal, untung, simpanan" | top-down, three plastic containers in a row on a wooden stall
  table, group ~55 % of width | on "modal" RM 300 in notes slides into box 1; "untung" RM 120 into box 2; "simpanan"
  RM 50 into box 3 (accent lid) — each 0.4 s ease | overhead-shot-shows-layout |`
### Check
- Does the line name a relation, order or split (else, why top-down)?
- Is the camera truly straight down with a valid up vector?
- Is the overhead joined by an eased move and followed by a different angle?

## NOTES
- Visual gaps: the film clip under the narration is not described; the meaning is from speech.
- No conflicts.
