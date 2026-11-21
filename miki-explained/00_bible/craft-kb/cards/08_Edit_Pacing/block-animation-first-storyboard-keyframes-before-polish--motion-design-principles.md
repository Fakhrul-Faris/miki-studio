---
title: Block the animation first (storyboard the keyframes), polish the easing second
bucket: 08_Edit_Pacing
source: "Motion Feel, Easing & Camera Choreography/Motion Design Principles.txt"
source_time: "03:32–05:57"
tier: principle
tool_target: shot-list
use_when: "starting to build any setup's motion, before touching easing curves"
style_fit: "Fits raea builds directly: decide each setup's key moments and how long each holds (the pacing) before shaping any easing curve."
---

## METADATA
08_Edit_Pacing | After Effects (tool-agnostic workflow order) | shot-list / raea keyframe planning

## CREATIVE_INTENT
Timing is hierarchy in the fourth dimension — changing how long something holds the screen changes what the audience
understands and feels, and can make or break legibility. So block the animation first: figure out the main moments of
action (the keyframes) and how long each holds, before deciding what happens in between them (the easing). In the
source's dodgeball example, giving one beat much more screen time than the others, after the scenes were
pre-comped at equal length, is what let a reveal land as a surprise instead of rushing past it.

## STE_PROCEDURE
1. Before shaping any easing curve, hold-frame every setup's key pose/state for its planned duration first.
2. Compare the run of setups played back as holds only — check the pacing (which beat gets more time) before polishing motion.
3. Give the beat that needs a reaction or "aha" moment noticeably more hold time than its neighbours.
4. Only after the hold-frame pacing reads correctly, add easing between the holds.

## AGENT_EXECUTION
Shot-list: a duration column per row, set deliberately (not all equal) before any easing is touched. raea build
order: lay out each setup's `interpolate` start/end frames and durations first (flat holds), preview the cut as a
sequence, adjust durations, then add `Easing.*` curves last.

### Worked example
Topic: revealing a shop's actual profit per item after costs (illustrative numbers).
BEFORE: every setup built with easing from the start, each held for the same ~2 s by default; the reveal line
(profit number) gets the same screen time as the setup before it and passes too fast to register.
AFTER: hold-frame pass first — the reveal setup gets ~1 s more hold than its neighbours (set in the shot-list before
any easing is written); only after that pacing is checked in a flat preview is easing added to each move.

### Check
- Were setup durations set and checked as flat holds before any easing curve was written?
- Does the beat that needs the most impact get noticeably more hold time than its neighbours?
- Was the pacing re-checked after easing was added, to confirm it still reads?

## NOTES
- Visual gaps: the exact duration values used in the dodgeball example are shown on a timeline, not stated in seconds.
- Rule conflicts: none — this is a build-order discipline, compatible with the existing eased-move rules.
