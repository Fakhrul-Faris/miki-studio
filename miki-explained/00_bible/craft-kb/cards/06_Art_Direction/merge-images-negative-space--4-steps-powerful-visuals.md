---
title: Merge two images — let one's shape or negative space form the other
bucket: 06_Art_Direction
source: "Explainer Visual Metaphors & Art Direction Critiques/4 Steps to Powerful Visuals.md"
source_time: "none (blog article, step 2)"
tool_target: frame-brief
tier: full
use_when: "a line joins two ideas (cost + time, saving + growth) and the shot needs one object that holds both"
style_fit: "Fits Style D object morphs: one real object morphs or is lit so its outline/shadow reads as the second. ⚠ no hand-drawn art; build the merge in 3D (silhouette, cut-out, shadow) or a code-built UI shape."
---

## METADATA
06_Art_Direction | illustration (tool-agnostic) | frame brief (Idea / Decision) + raea morph/shadow

## CREATIVE_INTENT
Combine the chart's images "in all the ways you can think": ask how they fit together and where they are similar;
experiment. Bonus points when the negative space around one picture looks like the other (the article's example: a
plant within a brain — "care, nurture and proper feeding will help your intelligence to grow").

## STE_PROCEDURE
1. Before merging, take the 2–3 candidate objects from the association chart.
2. For each pair, note shared shape traits (round, stacked, branching, rectangular).
3. Sketch (in words) 3+ ways they fit: one inside, one as outline, one as shadow, one morphing into the other.
4. Prefer the version where one object's negative space or shadow forms the other.
5. Check the merge reads in 1 s at phone size; if not, use a sequential morph instead.

## AGENT_EXECUTION
In Style D, build the merge physically: arrange instances so their outline/gap forms the second shape, cast a shadow
with a raking `SpotLight` so the shadow shape is the second image, or morph mesh A → B on the word. No new props: use
`<Model>`, `<Mesh3d>`, lights from the raea skill. Frame brief **Decision** names which merge type.
### Worked example
Line: "Kalau tak kira masa, kopi RM 3 korang sebenarnya rugi." (a home café owner; illustrative numbers).
- BEFORE: a cup, then a clock, side by side.
- AFTER: a cup seen top-down; the dark coffee surface plus the spoon handle form a clock face and hand (cup's negative
  space = clock). Shot-list row: `| 4 | "tak kira masa" | top-down macro on the cup, 100 mm | spoon rotates like a minute hand on "masa", 0.8 s eased; RM 3 tag fades in beside | merge-images |`.
### Check
- Does the merged object hold both ideas of the line?
- Does it read in 1 s at 270 × 480 px?
- Is it built from real 3D objects/light, not drawn?

## NOTES
- Visual gaps: the merged drawings (incl. plant-within-brain) are images; only the description survives.
