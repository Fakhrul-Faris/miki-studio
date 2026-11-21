---
title: Camera motion as a tempo lever — locked-off breathes, slow dolly dreams, constant motion urges
bucket: 05_Camera_Raea_Pipeline
source: "Cinematic & Documentary Narrative Structure/How to Pace Your Film — Examples of Good and Bad Pacing in Editing, Writing and More.txt"
source_time: "06:45–09:16"
tool_target: shot-list
tier: principle
use_when: "choosing the camera move per setup to match the beat's tempo tag (F/S)"
style_fit: "⚠ conflict: the source cites Tarantino's crash zooms and whip pans and handheld one-ers as fast-pace tools — banned here → adapted: tempo comes from move speed within the limits (≤ ~130°/s, ≤ ~40 m/s, eased) and setup length."
---

## METADATA
05_Camera_Raea_Pipeline | general (directing/cinematography) | shot-list "Setup and camera" + raea camera props

## CREATIVE_INTENT
Covering a scene in one or two shots slows the tempo (Apichatpong Weerasethakul's long single takes). A single take
can still be fast when the camera is handheld and constantly moving (Children of Men). Ozu's locked-off shots let
scenes breathe; Tarkovsky's sedate dolly in Stalker evokes a dream state. Camera movement affects tempo.

## STE_PROCEDURE
1. Read the beat's tempo tag before choosing the move.
2. For S beats, use a near-locked camera or a slow push (≤ ~5 % frame change per second, inferred).
3. For F beats, use a continuous eased flight that keeps moving into the next setup.
4. Never use crash zooms, whip pans or shake to add speed.
5. Before handing off, check every move against ~130°/s and ~40 m/s.

## AGENT_EXECUTION
Shot-list: write "locked", "slow push", or "flight" in the camera cell matching F/S. raea: camera transform from an
`interpolate` with `Easing.inOut`; a "locked" setup still has a tiny drift so the frame is alive.
### Worked example
Topic: "Simpan RM10 sehari — setahun jadi berapa?" (plain arithmetic: 10 × 365 = RM3,650).
- BEFORE: every setup a fast orbit.
- AFTER: L03–L06 F: one continuous eased flight across a row of tabung coins growing; L09 S: locked macro, slow 3 % push on the tabung while "RM3,650" counts up in the accent colour.
### Check
- Does each camera choice match the beat's F/S tag?
- Is there no crash zoom, whip or shake?
- Are all moves within the speed limits?

## NOTES
- Safdie-style multiple simultaneous threads (Uncut Gems) were cited as a pacing tool; skipped — conflicts with one idea per episode.
