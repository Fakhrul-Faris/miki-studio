---
title: Camera tilt choice (up vs down) changes what dominates the frame, and the mood with it
bucket: 05_Camera_Raea_Pipeline
source: "Studio Lighting, Silhouettes & Color Theory/8 Cinematic Fundamentals for 3D Short Films #b3d.txt"
source_time: "05:16–05:52"
tool_target: shot-list
tier: full
use_when: "briefing a setup where the camera has room to tilt above or below the hero (open background, floor/table context)"
style_fit: "Fits: a small eased tilt adjustment on a macro setup's static frame, within the house camera-speed cap; use it to pick which empty space (above/below the hero) carries the beat's mood."
---

## METADATA
05_Camera_Raea_Pipeline | Blender (tool-agnostic principle) | shot-list (camera column) + raea camera tilt

## CREATIVE_INTENT
The same subject, the same spot, framed with a tilt up vs. a tilt down reads completely differently because of what
now dominates the frame. Tilt up and the overbearing empty space above the subject (sky, ceiling, void) creates
loneliness and solitude. Tilt down and the space below (ground, floor, a drop) creates dread and a sense of danger
coming from below. The subject hasn't moved — only which empty region now fills the frame has.

## STE_PROCEDURE
1. Before framing a setup with open space above or below the hero, name the beat's mood: solitude/smallness, or dread/danger.
2. For solitude: tilt the camera up so empty space above the hero dominates the frame.
3. For dread: tilt the camera down so the space/ground below the hero dominates instead.
4. Keep the subject itself in the same position; let the tilt change only which void surrounds it.
5. Keep the tilt move itself eased and small — this is a framing choice, not a sweeping reveal.

## AGENT_EXECUTION
Shot-list "Setup and camera": "tilt up (solitude)" or "tilt down (dread)" with the beat it serves. raea: adjust the
camera's pitch so the horizon/hero sits lower (tilt up) or higher (tilt down) in frame, same distance.
```tsx
{/* solitude: hero sits low in frame, empty dark room above it dominates */}
<Camera3d transform={Transform.fromXyz(0, 0.4, -0.6).lookingAt([0, 0.25, 0])} />
{/* dread: hero sits high in frame, the table/floor below it dominates */}
<Camera3d transform={Transform.fromXyz(0, 0.25, -0.6).lookingAt([0, -0.1, 0])} />
```

### Worked example
Topic: a hawker alone at his stall after a bad month (illustrative numbers).
BEFORE: a flat eye-level frame on the empty stall, no mood decision made by the tilt.
AFTER: shot-list — "tilt up (solitude): the stall sits low, a huge dark empty ceiling above it, for the line 'bulan
ni sunyi je.'"

### Check
- Does the shot-list name the mood (solitude or dread) the tilt is chosen for?
- Does the tilt change which void dominates (above vs. below) while the hero itself stays in place?
- Is the tilt itself a small, eased adjustment, not a sweeping move?

## NOTES
- Visual gaps: the two example stills (sky-dominant vs. ocean-dominant) are shown, not narrated with numeric tilt angles.
- Rule conflicts: none — this is a static framing choice within the existing eased-camera-move rule.
