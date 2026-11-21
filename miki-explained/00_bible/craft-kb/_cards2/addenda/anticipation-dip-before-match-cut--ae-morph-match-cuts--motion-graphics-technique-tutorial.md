Target file: `../cards/08_Edit_Pacing/anticipation-dip-before-match-cut--ae-morph-match-cuts.md`

Source: "Motion Feel, Easing & Camera Choreography/Motion Graphics Technique Tutorial.txt", 05:17–09:50 (anticipation pull-back + whip), 09:52–10:19 (null-object repositioning of the landing point).

## New values/steps the master card lacks

1. **Anticipation can be a pull-BACK (opposite-direction) + scale-down, not only a position dip.** The source backs the shape up slightly (anticipation) and shrinks it to ~70% scale at the backed-up key, before the whip forward to ~90–100% at the cut. Add as an alternate anticipation shape alongside the existing "dip" (spatial Bézier) method: a position pull-back (opposite the travel direction) combined with a scale-down of ~20–30%, both easing out of the same anticipation key.
2. **Speed-graph shape named explicitly: "M" curve.** "If your graph doesn't look roughly like an M, it's because you're on your value graph not your speed graph... fast to slow, slow to fast as it anticipates." Add as explicit guidance: check the SPEED graph (not value graph) forms an M — slow at the anticipation key, fast through the whip, landing fast at the cut.
3. **Squash/stretch + rotate-to-follow-path during the whip's fastest segment.** At the fastest point of the whip, the source stretches the shape along its direction of travel (vertical stretch example) and rotates it so the stretch axis follows the path tangent, not just scales uniformly. Add as an optional extra step for the fastest frame only, reverting by the cut frame.
4. **Null-object parenting to reposition the landing point without re-animating.** The whole whip chain (position + scale + rotation keys) is parented to a null; moving the null repositions where the shape lands on screen without touching any of the underlying keys — useful for fitting a match cut's landing point to wherever the next shot's matched element actually sits. Add as a practical AGENT_EXECUTION note: group the raea transform under one parent/offset so the landing point can be nudged in one place.

No change to the card's CREATIVE_INTENT, Check section, or worked example — these are additive steps for a more dynamic/whippier anticipation variant; the existing gentle dip variant remains the default for Style D's eased, non-flashy joins.
