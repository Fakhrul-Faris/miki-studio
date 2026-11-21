---
title: The gutter — information density (lack of info vs misinformation), not frame rate
bucket: 01_Animation_Motion
source: "The Illusion of Animation.txt"
source_time: "22:21–28:00"
blender_version_source: n/a (conference talk)
tool_target: principle-only
tier: principle
style_fit: strong — explains why a hard cut on the word between two held states reads as motion, and how much in-between to show in a 2–3 s setup
---

## METADATA
01_Animation_Motion | n/a | principle-only

## CREATIVE_INTENT
Principle (after Scott McCloud's comic "gutter"): two panels — a figure holding a top hat, then holding it raised — and the brain invents the motion between them. Every viewer imagines their own version. Add a middle panel and the brain does less work (clearer, more spoon-fed). Insert a wacky in-between and the brain works hardest: motion can move toward abstract by lack of information OR by misinformation.
Spectrum: more information = less work for the brain = clear but passive ("swimming", loses snappiness); less information = more imagination = snappier, but too far = confusing.
It is not about frame rate. Showing more information needs more frames, but removing frames is not the goal — removing information is. (The speaker's 120 fps "reality" sample could only show at 50 Hz on the projector; the point held.)

## STE_PROCEDURE
1. For each state change, decide how much in-between the viewer needs: none (cut), one key pose, or the full move.
2. To make a change snappier, remove in-between information (show start and end states).
3. To make a change clearer, add one middle state that explains the action.
4. Before you add a surprise in-between (misinformation), check the end state still explains what happened.
5. Do not lower the frame rate to get snappiness; cut information instead.

## AGENT_EXECUTION
### Source tool (none)
Comic-panel slides and the falling-cube demo, from "stylized" up to "first frame, last frame only".
### Blender / raea translation
- Our hard cut on the word between two setups is a gutter: setup A shows state 1, setup B shows state 2; the viewer builds the change. Use when the change is obvious from the two states (closed → open, one coin → stack).
- When the change is the point of the line (x-ray, slice, morph), show the move (one ~0.4 s eased transition) — that is the "middle panel".
- raea: a cut is one camera whose transform jumps at the cut frame (scene.md: "Use one camera whose transform jumps at the cut frame"); state 2 enters inside a `<Sequence from={cut} layout="none">`. Keep 30/60 fps as delivered; never drop frames for style.

## NOTES
- Deprecated: n/a.
- Visual gaps: the comic panels and every cube variant are slides/clips; not reconstructable from audio.
- Rule conflicts: "misinformation" in-betweens (wacky, surprising moves) read as flashy — avoid in Style D; at most one deliberate surprise, never bouncy.
