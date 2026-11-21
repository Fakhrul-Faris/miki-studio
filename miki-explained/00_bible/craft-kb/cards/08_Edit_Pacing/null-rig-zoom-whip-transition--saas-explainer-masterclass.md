---
title: Null-rig zoom-through transition — zoom a whole scene into a blank area, cut, zoom back out into the next scene
bucket: 08_Edit_Pacing
source: "Minimalist Tech & SaaS 3D Staging/How To Master Saas Explainer – Full After Effects Tutorial.txt"
source_time: "11:06–11:32, 56:24–57:50"
tool_target: raea
tier: principle
use_when: "joining two fully different scenes/animations with no shared leading object to morph between"
style_fit: "⚠ a fast zoom-through-white reads as a crash zoom / generic wipe → adapt: only use when the zoom target is a real object in both scenes (zoom into the hero prop itself, not a blank colour field), eased, ≥ ~0.4 s either side of the cut."
---

## METADATA
08_Edit_Pacing | After Effects null + position/scale keys, cut at a frame-hold (source) → raea camera/scale track | raea

## CREATIVE_INTENT
A parent null carries an entire scene's layers. Its scale is keyed to zoom in until the frame fills with a single flat
area (here, the white background) — timed to land exactly at the middle of another layer's keyframe pair. The cut
happens inside that zoomed-in blank frame, then the next scene's own null zooms back out from the same blank state,
so the join is invisible: zoom in to white, cut, zoom out of white into the next scene.

## STE_PROCEDURE
1. Pick the frame where scene A should end: the point its own carrier null is mid-zoom.
2. Key scene A's null to scale up until the frame is filled by one flat area.
3. Cut at that exact filled frame.
4. Start scene B's null already at the same filled/zoomed state, keyed to scale back down into scene B.
5. Ease both sides; never let the zoom itself look like a hard snap.

## AGENT_EXECUTION
raea: treat it as a camera dolly-in on a shared anchor (the hero object, not blank colour), `const s = k(f, [cutFrame-15, cutFrame], [1, zoomTarget], out)`, cut, then scene B opens at `s0 = zoomTarget` and eases back to 1. Per house rule, replace "zoom into blank white" with "zoom into/out of the hero object itself" so the transition is built from the scene's own object, not a flash-to-colour wipe.

### Worked example
Topic: a laundromat app's "pilih mesin" (choose a machine) screen handing off to the "bayar" (pay) screen.
- BEFORE: a hard cut between the two UI screens.
- AFTER: the camera eases into the chosen machine icon until it fills frame, cuts on the fill, then eases back out of
  that same icon into the payment screen — built from the machine icon, not a blank colour field.

### Check
- Does the zoom's end point share a real object with the next scene's start point (not a blank colour)?
- Is the zoom eased on both sides of the cut, under the ~130°/s, ~40 m/s move cap?
- Would it read as a crash zoom at full speed — if so, slow it down or drop it?

## NOTES
- Visual gaps: exact scale values are visual only.
- Rule conflict: source zooms into flat white as a generic wipe substitute — our house rule forbids generic wipes/
  flashes; adapted to always zoom into/out of a real object already in both scenes.
