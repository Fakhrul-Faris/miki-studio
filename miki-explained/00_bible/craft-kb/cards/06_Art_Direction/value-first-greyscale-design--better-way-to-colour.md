---
title: Value first — design and judge the frame in greyscale before any colour
bucket: 06_Art_Direction
source: "Procedural Mograph & 3D-to-AI Render Passes/A better way to colour your work!.txt"
source_time: "03:31–04:00"
tool_target: board-check
tier: principle
use_when: "grey-box board stage and the first look still of each setup, before materials and the accent are set"
style_fit: "Fits Style D: the dark room + one top light is a value design; the accent is added last and must also win in value, not only in hue."
---

## METADATA
06_Art_Direction | After Effects (principle only) | board check + look stills

## CREATIVE_INTENT
Start a style frame in greyscale "because you don't overcomplicate things with colour and you can just focus on the
values and the contrast. If something looks good in greyscale you can be sure it's going to look good in colour." The
same holds for motion: "getting your movement right before adding colours and effects is a really good idea."

## STE_PROCEDURE
1. Before choosing materials, render each grey-box setup in greyscale.
2. Check the focal point is the brightest or highest-contrast area.
3. Fix value problems with light and placement, not colour.
4. Lock camera and animation timing on the greyscale board.
5. Add colour and the accent only after values and motion pass.
6. Convert the coloured still back to greyscale; the focal point must still win.

## AGENT_EXECUTION
Greyscale check on any still (raea `<Grade>` holds for the whole piece, so do the check outside the render):
```bash
ffmpeg -v error -i out/s04.png -vf "hue=s=0" -frames:v 1 out/s04_grey.png
```
Board check line: "greyscale: focal point wins ✓/✗". Ref analysis: list palette roles with value (dark/mid/light) as well as hex.

### Worked example
Topic: "Nasi lemak RM3 vs RM5: beza untung sebungkus" (illustrative: price − cost per pack).
- BEFORE: two coloured packs side by side; the RM5 pack's red accent label looks strong, but in greyscale the white RM3 pack is brighter and wins.
- AFTER: greyscale pass first — key moved so the RM5 pack is the brightest value, RM3 pack falls to mid-grey; then colour added; the accent on "untung RM2.10" (illustrative) also reads as the lightest label in greyscale.

### Check
- Was the setup judged in greyscale before colour?
- In greyscale, is the focal point the brightest/highest-contrast area?
- Is motion timing locked before grading?

## NOTES
- AE-specific workflow (adjustment layer on a grey comp) replaced by greyscale stills via ffmpeg.
