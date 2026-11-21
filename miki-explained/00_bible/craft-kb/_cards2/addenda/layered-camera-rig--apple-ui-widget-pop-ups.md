# Addendum → masters/05_Camera_Raea_Pipeline/layered-camera-rig.md
Source: "Minimalist Tech & SaaS 3D Staging/How to Create Viral Apple-Style UI Widget Animations in After Effects! (Apple Masterclass Part 2).txt" — 31:19–33:59

## Variant: one null per UI pop-up scene, chained serially, each pre-keyed before the current scene finishes
Rather than one dolly + one rotate layer, a fresh null is added per scene (one per UI pop-up: "exercise", "track your
progress", "hydration", "gym", the closing transition), each parented to the previous null and the camera parented to
the topmost one. Before the current scene's animation ends, the current null's position is keyed at its existing spot;
only then does the agent move forward to the next scene and key the null's new position — so the handoff is pre-loaded
rather than reacted to. Every move between scenes "zooms out just a tiny little bit" relative to the previous framing,
and every single move starts slow and ends slow (no exceptions across five consecutive handoffs). The final null's
move returns the camera to dead-centre on the hub shape (checked with the proportional/centre grid) exactly where the
hub-shape-morph transition (see that card, same source) begins.

## VALUES BY SOURCE row
| parameter | Apple-Style UI Widget Animations | recommended for Style D |
|---|---|---|
| rig shape | serial null chain, one new null per scene, each parented to the last | same structural idea as the master's "move" layer, repeated per setup rather than built once |
| key order | key the outgoing position before moving the playhead to the next scene | plan both ends of each handoff in the shot list up front so the raea curve's two ends are written together |
| inter-scene framing | each handoff "zooms out a tiny little bit" from the previous | keep a consistent slight pull-back per setup change, not per-scene improvisation |
| easing | slow start, slow end on every single handoff, no exceptions over 5 scenes | matches house eased in-out rule already |
| final move | returns camera to frame-centre on the hub shape via the proportional grid | cue the camera's centring to the same frame the hub-shape-morph transition starts |

## AGENT_EXECUTION note
In raea this is one continuous camera curve rather than a literal null chain (no parenting overhead needed): define
each scene's target framing as a keyframe in one array and `interpolate` through all of them with the same eased
curve, cross-referencing the "zoom out a tiny bit per handoff" value as a small, consistent FOV/position increment per
setup rather than a fixed one-time pull-back.
