# Addendum → cards/05_Camera_Raea_Pipeline/motion-blur-shutter--cinematography-next-level.md
Sources: "Motion Feel, Easing & Camera Choreography/Cleanest Match-Cut Transition for SaaS.txt" (06:57–07:33, 11:04–11:13);
"Motion Feel, Easing & Camera Choreography/After Effects Morph Transition with Match Cuts.txt" (implied by "silky smooth")

## New VALUES BY SOURCE row(s)
| parameter | Cleanest Match-Cut (Resolve) | recommended for Style D (+ why) |
|---|---|---|
| where | every animated node of a match cut / shape morph (identify by the keyframe icon on the node) | every part moving at the match-cut frame |
| when | after the cut timing is locked ("to make it look even smoother") | add last, judge the cut first without it |
| raea | — | `<MotionBlur shutterAngle={0.5} samples={4} />` only over CUT±4 frames (it reads only on fast moves) |

## Extra steps / variants
1. After trimming a match cut at the speed peak, enable motion blur on every animated layer involved.
2. Check no animated layer was missed (Fusion: the key icon on the node; raea: every part whose transform changes in CUT±4).
