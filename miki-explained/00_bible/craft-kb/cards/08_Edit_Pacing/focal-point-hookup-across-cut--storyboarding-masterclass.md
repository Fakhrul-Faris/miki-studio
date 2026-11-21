---
title: Focal-point hookup — the end framing of one shot puts the subject where the next shot starts it
bucket: 08_Edit_Pacing
source: "Explainer Visual Metaphors & Art Direction Critiques/2D:3D STORYBOARDING MASTERCLASS - Creating Animatics in BLENDER.txt"
source_time: "13:02–13:23"
tool_target: shot-list
tier: principle
use_when: "planning the joins between setups (a hard cut on the word every 2–3 s)"
style_fit: Fits Style D's frequent cuts: keeps the eye in place across a new setup so cuts feel like one flow (no flashy transitions needed).
---

## METADATA
08_Edit_Pacing | principle | shot list, board

## CREATIVE_INTENT
In the source, the camera orbits framing one subject, then focus shifts to a second subject near the end. "That end
framing of shot one takes us into the next shot. So the focal point of where I end on the first shot needs to hook up to
roughly where he is on the second shot. This helps keep our eye where we want it to be."

## STE_PROCEDURE
1. Before cutting, mark the screen position of the focal object in the outgoing shot's last frame (e.g. upper-left third).
2. Frame the incoming shot so its focal object sits at roughly the same screen position on its first frame.
3. If the focal object changes within a shot, move focus/aim to the new object before the cut, so the cut carries it.
4. Board-check: lay last frame A over first frame B; the focal points should be within ~10 % of frame width (`~`).

## AGENT_EXECUTION
Shot-list "State change and events" cell ends with `exit focal: <x%,y%>`; the next row's starts with `enter focal: <x%,y%>`.
In raea, compute both from the camera (project the hero's world point) or check on the board stills.

### Worked example
BEFORE: row 4 ends on a price tag at lower-right; row 5 opens on the calculator centred top. Eye jumps.
AFTER (pasar malam stall profit, illustrative): row 4 `exit focal: 62%,58%` — tag RM3.50 at lower-right of centre; row 5
`enter focal: 60%,55%` — calculator display showing RM3.50 − RM2.10 = RM1.40 placed at the same spot; the cut lands on
"untung".

### Check
- Does every cut have exit and enter focal positions written?
- Are they within ~10 % of frame width of each other (unless a deliberate break)?
- If focus changes subject mid-shot, does it change before the cut?

## NOTES
- Visual gaps: the source's example framings are visual only.
- Related: `cards/01_Animation_Motion/motion-continuity-across-cuts--cinematography-next-level.md` (direction across cuts); this card is about position.
