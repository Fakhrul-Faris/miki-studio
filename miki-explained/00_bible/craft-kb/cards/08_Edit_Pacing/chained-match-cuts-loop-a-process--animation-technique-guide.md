---
title: Chained match cuts tell a whole process and loop back to the start
bucket: 08_Edit_Pacing
source: "Motion Feel, Easing & Camera Choreography/Animation Technique Guide.txt"
source_time: "05:19–07:35"
tool_target: shot-list
tier: full
use_when: "planning an S16 how-to's 3–5 steps or a mechanism sequence, and the end frame that must loop to frame 0"
style_fit: "Strong fit: RECIPE-D's last frame loops to the first object/framing; each step a new setup; joins built from the scene's own motion."
---

## METADATA
08_Edit_Pacing | After Effects (student assignments) → shot list + raea | shot list (whole sequence)

## CREATIVE_INTENT
Student examples: Philip Zhang's Newton's cradle — the ball swings left→right, cut, the motion continues; the swing
up-right becomes a flower growing; the flower head detaches and swings down-left, "reconnects that motion right back
at the beginning". Champion K's cake: one continuous motion tells the whole process, and the motion changes with the
action (ingredients falling, pouring, stirring, mixing), with an oven beat to break it up, then cookies fall into a
jar and transition back to the bowl. Neil Cochlin matches composition, scale and rotation; Mikhail matches a swing with
3D rotation and adds a small antenna flying off.

## STE_PROCEDURE
1. List the process steps (3–5).
2. For each step, write the action's motion vector (fall, pour, stir, swing).
3. End each step's setup with a motion that the next step's setup begins with.
4. Let the motion type change with the action; keep only the join continuous.
5. Insert one "break" setup mid-sequence (source: the oven) to reset the eye.
6. Make the last motion lead into the frame-0 object and framing.
7. Before locking, check the motion immediately before each cut is anticipated (the source's key success factor).

## AGENT_EXECUTION
Shot-list: add a "carry out → carry in" note per row ("pour down → falls in"). The last row's carry must point at row 1.
raea: carry vectors as camera or object `interpolate` continuations; reuse the frame-0 camera transform at the end.

### Worked example
Topic: "Nak buka akaun simpanan anak — 3 step" (generic steps, no bank-specific rules).
- BEFORE: three static step cards, then an end card.
- AFTER: `| 1 | "Satu duit raya…" | macro on an RM10 note dropping into an envelope (frame 0) | note falls down |`
  `| 4 | "Step satu, bawa IC" | IC card falls into frame at the same speed, lands on a counter | carry: fall → land |`
  `| 5 | "Step dua, isi borang" | pen rolls off the IC and writes across a form | carry: roll → write |`
  `| 6 | "Step tiga, simpan" | the form slides right into a passbook that closes | carry: slide → close |`
  `| 11 | "Korang mula umur berapa?" | the passbook flips open, an RM10 note lifts out and falls toward the envelope — frame-0 framing | carry: back to row 1 |`

### Check
- Does every cut carry a motion from the previous setup?
- Does the motion type change with each action?
- Does the last setup lead back to the frame-0 object and framing?
- Is there one break setup in a sequence longer than 4 joins?

## NOTES
- Visual gaps: all student pieces are visual; descriptions above are the narrator's words.
- Account-opening steps are generic; an episode must check the real bank/ID requirements before claiming them.
