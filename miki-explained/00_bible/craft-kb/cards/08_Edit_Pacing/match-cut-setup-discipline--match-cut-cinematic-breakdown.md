---
title: Match-cut setup discipline — lock everything except the one thing that changes, centre it on a grid
bucket: 08_Edit_Pacing
source: "Motion Feel, Easing & Camera Choreography/The Match Cut Cinematic Breakdown EP 1.txt"
source_time: "00:20–03:51; 10:43–11:16"
tool_target: shot-list
tier: full
use_when: "planning a run of quick object-state cuts (L02–L04 style, coin→receipt→phone, tool open→closed) where the eye must read one continuous thing, not five separate shots"
style_fit: "Fits Style D directly: our setups already share the dark room/one top light/macro framing, so the discipline is cheap — hold camera distance, light angle and subject scale identical across the run, grid-centre the hero in every frame, and change exactly one property per cut (state, not object + state together)."
---

## METADATA
08_Edit_Pacing | Live-action (DaVinci Resolve) → raea shot-list rule, applied before any camera/object key is written | shot-list

## CREATIVE_INTENT
"Getting a good match cut all comes down to your setup... the more time you spend on your setup and get that perfect, the less work you have to do in your edit." Camera position, white balance and focus are locked for the whole run; only one element in the frame changes between shots. For stills/photos/books, a grid line keeps the subject centred in the exact same screen position on every frame so the cut reads as continuous, not jumped.

## STE_PROCEDURE
1. Before listing a run of quick cuts, pick ONE camera framing (distance, angle, lens) and hold it for every shot in the run.
2. Before listing the first row, decide the ONE property that changes shot-to-shot (open/closed, count, colour, state) — never two at once.
3. Grid-centre the hero object/subject at the same screen position in every shot of the run (same x/y, same approximate scale).
4. If a shot needs a different light angle or framing, end the run there — start a new setup instead of forcing it in.
5. Never knock the "camera" (never change unrelated background, light or scale) mid-run; if the story needs a scene change, that is a different card (set-swap), not this one.

## AGENT_EXECUTION
In the shot-list, group consecutive rows that are one match-cut run under a single "Setup and camera" cell (one locked raea `Camera3d` pose, one `RectLight`/key); the "State change and events" column carries only the ONE changing value per row. In raea, render the run from one fixed camera transform and swap only the one prop/material/count per frame range.

### Worked example
Topic: a gerai's plastic cup sizes (illustrative numbers).
BEFORE: `| 3 | "Cawan kecil, sederhana, besar" | three different camera angles, one per cup | cups appear | — |`
AFTER: `| 3 | "Cawan kecil, sederhana, besar" | ONE locked top-light macro framing, cups centred on the same grid point | small cup → medium cup → large cup, only scale changes, cut on each size word | match-cut-setup-discipline |`

### Check
- Is there exactly one camera framing for the whole run (no angle/distance changes mid-run)?
- Does exactly one property change per cut, never two?
- Is the hero centred at the same screen position in every shot of the run?

## NOTES
- Visual gaps: exact locked lens/WB values are live-action camera settings with no raea equivalent (raea is deterministic, so "locking" is automatic once the camera transform is fixed).
- AE/live-action step dropped: physically locking a tripod/WB/focus — raea has no camera drift to begin with, so the card keeps only the planning discipline (one framing, one changing property, grid-centred).
