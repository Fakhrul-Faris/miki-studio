---
title: Compositional balance: weigh the subject against negative space; unbalance only on purpose
bucket: 05_Camera_Raea_Pipeline
source: "CG Cinematography 101 | Chapter 4 | Camera Analysis (The Chase).txt"
source_time: "05:32–06:59, 09:52–10:39"
blender_version_source: n/a (Houdini)
tool_target: principle-only
tier: principle
style_fit: Helps one-hero macro frames: a secondary element (a glow, a label, a price) can fill the empty side.
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Houdini) | principle-only

## CREATIVE_INTENT
Principle: in the reference, the ship on one side is balanced by the explosion on the other; without the explosion that side is blank space and the frame tips. Think about whether each frame is balanced. Sometimes you want it off balance: in their pan shot the ship is left off-centre so it seems to pull the camera after it.
Ideas: when the hero sits on one third, give the other side a lighter counterweight (a soft glow, a secondary object in blur); leave it empty only when the emptiness says something (motion about to fill it).

## STE_PROCEDURE
Method:
1. Mentally split the frame in half; compare visual weight (size, brightness, contrast, saturation) on each side.
2. If one side is blank and the shot is meant to be stable, add a lighter counterweight there.
3. If the shot should feel pulled or tense, leave the imbalance in the direction of motion.
4. Re-check balance at the end of the move, after the camera settles.

## AGENT_EXECUTION
### Source tool (Houdini)
None (judged in the viewport).
### Blender / raea translation
Weight check on a rendered still (left vs right luminance):
```bash
ffmpeg -v error -i out/s03.png -vf "format=gray,crop=iw/2:ih:0:0,signalstats,metadata=print" -f null - 2>&1 | grep YAVG
ffmpeg -v error -i out/s03.png -vf "format=gray,crop=iw/2:ih:iw/2:0,signalstats,metadata=print" -f null - 2>&1 | grep YAVG
```
raea: counterweight = an emissive secondary in DoF blur, or a light pool falling on the empty side; no dedicated prop.

## NOTES
- Deprecated: none.
- Visual gaps: balance examples drawn on screen ("spaceship is here … explosion").
- Rule conflicts: the counterweight must not carry the brand accent (one accent, on the subject of the line only).

## ADDENDUM — Every Composition Concept Explained (In 3D)
Source: "Minimalist Tech & SaaS 3D Staging/Every Composition Concept Explained (In 3D).txt" (02:03–02:25)

| parameter | Every Composition Concept | recommended for Style D |
|---|---|---|
| amount of negative space | "what's not in the frame is just as important"; too little → cluttered; a lot → "emphasizes what's in the frame"; use it to focus on certain elements | large dark negative space around the single hero is the default; cut negative space only on deliberate "crowded/too much" lines |

Extra step: before adding a counterweight, decide whether the line wants emphasis (keep the space empty) or balance (add a light counterweight).

## ADDENDUM — Why Your Videos Don't Look Like Movies Yet
Source: "Studio Lighting, Silhouettes & Color Theory/Why Your Videos Don't Look Like Movies Yet.txt" (03:36–04:00)

| parameter | look-like-movies | recommended for Style D |
|---|---|---|
| weight factors | "Big, dark and bright things weigh more" | size, darkness, brightness (+ saturation, from the base card) |
| failure | "all the heavy things on one side, the frame tips over and the viewer senses something's wrong" | — |
| counterweights | a second figure, a window, a lamp | a soft glow, a secondary prop in blur, a light pool (no figures) |
| extreme | symmetry → see `cards/06_Art_Direction/symmetry-amplifies-the-feeling--look-like-movies.md` | — |

Note: counterweight never carries the brand accent.
