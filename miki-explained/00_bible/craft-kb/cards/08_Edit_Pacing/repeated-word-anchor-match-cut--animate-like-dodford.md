---
title: Repeated-word anchor match cut — centre the same word/detail across different sources so the eye never searches
bucket: 08_Edit_Pacing
source: "Procedural Mograph & 3D-to-AI Render Passes/How To Animate Like Dodford (After Effects Tutorial).txt"
source_time: "00:54–03:36"
tool_target: raea
tier: principle
use_when: "cutting quickly between several different source stills/screens/documents that each contain the same word, number or detail (several receipts, several screenshots, several articles)"
style_fit: "Fits Style D's rapid-fire proof beats: when several different real-world sources back one claim, anchor the eye on the shared detail across the cuts instead of making the viewer relocate it each time."
---

## METADATA
08_Edit_Pacing | After Effects (source) → raea 2D layer scale/position keyed per still | raea

## CREATIVE_INTENT
Several different source images (articles) all contain the same word ("anniversary"); the technique scales/repositions each still so that word sits at the exact same screen location, then cuts rapidly between them: "we have anniversary and anniversary, the same focal points, which is just going to help draw your attention into that specific point — your eyes already know where to look." A thin highlighter stroke "traces" under the word on entry (trim-path reveal) to reinforce the anchor. Each still is also graded (levels) to similar brightness/contrast so the sources read as one consistent set.

## STE_PROCEDURE
1. Before cutting between several different source stills, identify the one shared word/number/detail they all contain.
2. Scale and reposition each still so that shared detail lands at the same screen x/y across every cut.
3. Cut rapidly between them (source uses ~6–12 frames each) with no other element moving.
4. Optionally underline/highlight the shared detail with a short reveal on its first appearance only.
5. Match brightness/contrast across the stills so they read as one consistent set, not mismatched grabs (see levels-luminance-black-white-midtone-contrast).

## AGENT_EXECUTION
raea: render each source still as an `ImagePlane`, keyed to the same screen-space scale/position for the shared detail (compute per-still offset so the detail's coordinates coincide); cut on fixed short intervals.

### Worked example
Topic: three different kedai runcit receipts, all with a "SST 6%" line (illustrative).
BEFORE: three receipt photos shown full-frame, one after another — the viewer has to re-find the SST line each time.
AFTER: each receipt scaled/positioned so "SST 6%" sits centre-frame at the same spot, cut every ~8 frames, a thin underline reveals under it on the first receipt only → repeated-word-anchor-match-cut.

### Check
- Does the shared detail land at the same screen position in every cut of the run?
- Is nothing else in frame moving or relocating during the run?
- Are the stills graded to similar brightness/contrast before the cut (not mismatched)?

## NOTES
- Visual gaps: exact per-still scale/position values are visual-only ("scale this one up a bit, move it there").
- Covered elsewhere: the cross-clip levels/contrast match step is the same principle as `cards/05_Camera_Raea_Pipeline/levels-luminance-black-white-midtone-contrast--advanced-comp-nuke-wk1.md` — no separate card written for it here.
- AE steps dropped/skipped: PDF-rescaling-for-quality, pen-tool highlighter stroke rig, parented TV-screen mask reveal, turbulent-displace "blur map" blob, paid Chroma plugin, grain/vignette/camera-shake wiggle — each is either a flat-footage AE workaround that raea's native 3D DoF/compositing replaces, or already covered by existing cards (film-grain, lens-fringe-distortion, handheld-camera-shake, vignette cards); not translated.
