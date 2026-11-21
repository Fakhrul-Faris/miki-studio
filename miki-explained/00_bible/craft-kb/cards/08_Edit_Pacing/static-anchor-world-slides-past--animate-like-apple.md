---
title: A persistent hero stays centred and still while the whole world slides past it (continuity push, no cut)
bucket: 08_Edit_Pacing
source: "Motion Feel, Easing & Camera Choreography/Animate Like Apple After Effects.txt"
source_time: "34:19–37:16"
tool_target: raea
tier: full
use_when: "moving between two UI states or two beats of the same scene inside one continuous shot, without a hard cut, by keeping one element fixed as its anchor"
style_fit: "Fits 'transitions built from the scene's own objects'; keeps a hard brand/action element always legible (never obscured) while everything else carries the viewer to the next beat; ⚠ cap the slide speed at the house camera-move limits."
---

## METADATA
08_Edit_Pacing | After Effects (one element un-parented from the scene's moving null) → raea: one element's transform fixed while siblings' transform is driven | shot-list, raea

## CREATIVE_INTENT
In the "incoming call" scene, every layer (background, text, extras) is parented to one sliding null so the whole scene
moves left. The call button itself is deliberately kept off that null and centred separately, so while the background
and labels slide away, the button never moves — it "remains in the center and everything else is moving behind it. So
that way, it's going to look like we're sliding over to the right [past the button]." The button is the one constant the
eye locks onto; the moving world around it carries the sense of progress/transition without needing a cut.

## STE_PROCEDURE
1. Pick the one element the viewer must never lose track of (the action button, the hero object, the price).
2. Parent every other layer in the scene (background, labels, decoration) to a single driving transform.
3. Keep the anchor element's own transform independent of that driver — centred, not parented to it.
4. Animate the driver (position/scale) so the world moves past the anchor; ease in-out, cap speed to house limits.
5. Let the anchor itself only change on its own cue (e.g. it still presses/states-change), never drifting with the world.

## AGENT_EXECUTION
raea: render the anchor with a fixed/independent transform; drive every sibling from one interpolated value:
```tsx
const worldX = interpolate(f, [a, a + 20], [0, -480], { ...CL, easing: out });  // world slides left
<group transform={Transform.fromXyz(worldX, 0, 0)}>{background}{labels}{decoration}</group>
<div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>{heroButton}</div>
```
Shot row: `| 9 | "sambung panggilan" | phone UI, call screen | call button stays centred; background and labels slide left past it, revealing the next screen's elements entering from the right | this card |`.

### Worked example
Topic: confirming a RM50 top-up on a phone (illustrative amount).
- BEFORE: a hard cut from "confirm screen" to "receipt screen."
- AFTER: the "Sahkan" (confirm) button stays dead centre and still; the confirm screen's background and labels slide
  left past it while the receipt screen's background and "RM50" slide in from the right — one continuous push, no cut,
  and the button is always exactly where the viewer expects to find it.

### Check
- Is there exactly one element the viewer's eye can anchor to throughout the move?
- Does every other layer share one driving transform (not individually hand-timed)?
- Does the anchor's own transform stay independent of the world's slide?
- Is the slide speed within the house camera-move cap (eased, no whip)?

## NOTES
- Visual gaps: none — the mechanism is fully described in speech (what's parented to the null vs what isn't).
- AE dropped: manual parent-and-link per layer — translated to a raea `<group>` wrapper carrying the shared transform,
  with the anchor rendered as a sibling outside it.
- Distinct from `whole-scene-swap-at-match-cut--ae-morph-match-cuts.md` (a hard cut with carried motion): this technique
  has no cut at all — continuity comes from the still anchor, not from matched motion across an edit point.
