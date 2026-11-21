---
title: Shape language — regular shapes for order, irregular shapes for chaos
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/Every Composition Concept Explained (In 3D).txt"
source_time: "03:45–04:05"
tool_target: frame-brief
tier: full
use_when: "choosing object arrangement and set dressing per beat: calm steps vs a problem/scam/loss beat"
style_fit: "Fits: arrangement and silhouette carry the mood instead of extra colour (one-accent rule). ⚠ 'movement' from chaos must come from layout, never shaky camera."
---

## METADATA
06_Art_Direction | 3D (tool-agnostic) | frame brief (Feeling / Decision) + raea layout

## CREATIVE_INTENT
Triangles, circles and squares "help create unity and order", while irregular shapes "create chaos and movement".
Shapes therefore set the beat's feeling before anything moves.

## STE_PROCEDURE
1. Before laying out a setup, mark its feeling: order (solution, steps) or chaos (problem, loss, scam).
2. For order, arrange objects into a clear triangle, circle or square, aligned and evenly spaced.
3. For chaos, scatter objects into an irregular outline with varied angles and gaps.
4. Keep the hero's own silhouette clean in both cases.
5. Move from chaos to order on the line's solution word, by eased object moves (~0.4 s+).

## AGENT_EXECUTION
Frame brief **Feeling** → shape: "order: coins in a circle" / "chaos: receipts scattered". raea layout helpers:
```tsx
const circle = (i: number, n: number, r: number) => [Math.cos(2*Math.PI*i/n)*r, 0, Math.sin(2*Math.PI*i/n)*r];
const chaos  = (i: number) => [rand(i)*0.3-0.15, 0, rand(i+99)*0.3-0.15];   // seeded rand, stable between renders
// blend on the word: pos = mix(chaos(i), circle(i,n,r), ease(t))  — eased in-out, no overshoot beyond 3–5 %
```
### Worked example
Topic: "Cara susun duit niaga: 3 akaun, 3 tujuan" (how-to, illustrative).
- BEFORE: notes and coins in a loose pile through every step.
- AFTER (shot-list rows): `| 2 | "Duit korang campur aduk." | top-down macro on the counter | notes and coins scattered at random angles (chaos) | shape-language |` → `| 3 | "Step satu: asingkan tiga." | same top-down, slow push | notes slide into three neat squares on "tiga", 0.6 s eased; first square takes the accent | shape-language |`
### Check
- Does the arrangement's shape match the beat's feeling?
- Is the chaos → order change on the solution word and eased (no pop, no bounce)?
- Is the seed fixed so layout is stable across renders?

## NOTES
- Visual gaps: the specific irregular shape shown is on screen only.
- `rand` = any seeded hash; never `Math.random()` (frames must be deterministic).
