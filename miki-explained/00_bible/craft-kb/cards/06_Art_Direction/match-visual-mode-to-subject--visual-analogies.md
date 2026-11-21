---
title: Match the visual mode to the subject type
bucket: 06_Art_Direction
source: "Analogies & Turning Invisible Concepts Into 3D Objects/Visual analogies.txt"
source_time: "none (text article, RTF)"
tool_target: shot-list
tier: full
use_when: "planning which setups are UI/motion-graphic scenes and which are 3D object scenes (episode split, per row)"
style_fit: "Matches the UI-heavy 80/20 rule: interface/data topics → code-built UI scenes in raea; physical steps → Style D macro object. Captions and accent stay the same across both modes."
---

## METADATA
06_Art_Direction | general | shot-list (per-row mode), art-direction five lines

## CREATIVE_INTENT
Use clean motion graphics for data, AI or abstract architecture, and 2D or 3D scenes when showing user journeys,
physical environments or product parts. The subject decides the mode, not habit.

## STE_PROCEDURE
1. Before writing the shot list, tag each script line: data/abstract, interface/user journey, or physical/object.
2. Give data/abstract lines a clean graphic: a counter, a chart the object becomes, a number on a label.
3. Give interface lines a phone/app screen built in code (raea 2D layers / HyperFrames).
4. Give physical lines the macro 3D hero on its real surface.
5. Count the tags; if ≥ ~60 % are interface lines, plan the episode ~80 % UI scenes, ~20 % physical.
6. Keep the same accent colour, caption style and light mood across modes so cuts feel like one film.
7. Join a mode change through an object (the phone in 3D becomes the full-frame UI), not a generic wipe.

## AGENT_EXECUTION
Add a mode tag to each shot-list row's "Setup and camera" cell: `[UI]`, `[GFX]`, `[3D]`. In raea, `[UI]`/`[GFX]` rows
are 2D layers (kit components in `tools/raea/kit/`), `[3D]` rows are Camera3d scenes; a `[3D]→[UI]` change flies the
camera into the phone screen so the screen fills the frame.
### Worked example
Topic: "Cara set up DuitNow QR untuk gerai" (how-to; illustrative).
- BEFORE: every row is the 3D stall with floating icons, including "Step 2: buka app bank korang".
- AFTER: L01 hook `[3D]` macro of a laminated QR stand on the stall counter; L03–L07 steps `[UI]` code-built app
  screens (tap highlights in accent, ~0.4 s eases); L08 "RM 3,000 sebulan masuk terus ke akaun" (illustrative; QR payments do land in the linked account) `[GFX]` counter on the bank
  balance; L10 question `[3D]` back on the QR stand (loops to frame 0).
### Check
- Does every row carry a mode tag that matches its line's subject?
- Are interface steps shown as real screens, not 3D icons?
- Is each mode change carried by an object, never a generic wipe?

## NOTES
- Source is a web-search answer saved as RTF. The linked "30 Best Explainer Video Examples" list was not available.
- No conflicts.
