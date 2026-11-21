---
title: Hierarchy of motion — lock the lead move on one controller before layering secondary elements
bucket: 01_Animation_Motion
source: "Motion Feel, Easing & Camera Choreography/Perfect Shape Morphs After Effects Transcript.txt"
source_time: "19:29-20:48, 23:08-23:18, 32:50-36:06"
tool_target: raea
tier: full
use_when: "a setup has more moving pieces than one object (several shapes joining/separating into a hero form) and animating them all at once gets unmanageable or reads as chaotic"
style_fit: "This is exactly how Style D hides complexity inside a single on-the-word state change: the lead motion (rotation, scale) carries the read, secondary pieces appear/disappear during its fastest moment where the eye can't track detail - matches 'an on-screen event about every second, on the word' without looking busy."
---

## METADATA
01_Animation_Motion | After Effects (null-parented rotation + child layers) -> raea (one driver transform, children sample it) | multi-part object/icon state changes

## CREATIVE_INTENT
A shape made of several separate pieces (a heart splitting into three circles that then rotate into a club) "will
have far more moving elements than our first morph, so breaking it down into have a little hierarchy of the motion
will be helpful: we'll animate the rotation first, make sure that is feeling good, and then we're going to add our
extra bits on top of that." The lead motion goes on one controller (a null everything else parents to); only once
that single read is right does any secondary piece (color changes, a middle "stem" fading in, position dips) get
added - and those extra pieces are specifically timed to land during the lead motion's fastest point, "which is
where we can hide some of these other objects" popping in or changing, because fast motion is where the eye has the
least time to scrutinize detail. A final secondary layer (a gentle Y-position dip/rise, under the rotation) is added
last, purely to "reinforce these moments of change," never as the primary read.

## STE_PROCEDURE
1. Identify the single move that should read as "the thing happening" (here: a rotation) and put it on one driver
   (a null/parent transform) - every piece of the object parents to this driver, nothing animates independently yet.
2. Animate and ease the driver's lead motion alone first; play it back until that read alone feels right.
3. Find the driver's fastest moment (steepest point on its speed graph) - this is where new elements can appear
   without the eye catching the "pop."
4. Only now add secondary pieces (recolor, new shapes fading in, a part disappearing) timed to trigger at/near that
   fastest-motion frame.
5. Add a final, smaller secondary motion layer (e.g. a Y-position dip timed with the same beats as the lead motion)
   strictly after the lead motion and the state-change pieces already read correctly - it should reinforce, not
   compete with, the lead read.
6. If a secondary piece creates an unwanted artifact (a stray flash of color, a layer popping one frame too early),
   split/retime that one layer rather than re-timing the whole driver.

## AGENT_EXECUTION
**Shot-list "Setup and camera" / "State change" cells:** name the lead transform explicitly ("driver: rotation null"),
then list secondary pieces with "triggers at <word>, near the driver's fastest frame" rather than giving every piece
its own independent timing.

raea: drive every child transform from one source value, and gate secondary state changes by that driver's speed,
not by a separately-authored timeline:
```tsx
const driverRot = interpolate(f, [S, E], [0, -Math.PI], { easing: Easing.inOut(Easing.cubic) });
const driverSpeed = Math.abs(driverRot - prevDriverRot);     // proxy for "fastest point"
// children parent to the SAME transform:
<Transform rotateY={driverRot}>
  {/* lead geometry */}
</Transform>
// secondary state change gated to the fast window, not an independent key:
const showStem = f >= fastWindowStart && f <= fastWindowEnd;
```
Children never get their own independent easing for the lead axis - they read the driver.

### Worked example
Topic: "Resit kedai basuh kereta bertukar jadi ikon loyalty card" (illustrative - a receipt folds and rotates into a
loyalty-card icon on "dapat mata ganjaran").
BEFORE: the receipt's fold, the card's corner-rounding, and a new star icon popping in are all keyed on independent
timelines; they drift out of sync and the star's pop-in reads as a glitchy extra beat.
AFTER: the fold's rotation is the one driver; the card-corner change and the star icon are both triggered only
during the driver's fastest rotation frame - the whole thing reads as one clean flip with the star "already there,"
not a separate event.

### Check
- Is there one identifiable lead motion driving every other piece's parent transform?
- Was the lead motion animated and judged alone before any secondary piece was added?
- Do secondary state changes (recolor, new shape, disappearance) trigger at/near the lead motion's fastest frame?
- Is any final "reinforcing" secondary motion (dip/rise) clearly smaller and later-added than the lead read?

## NOTES
- Visual gaps: "feeling good" and "that's looking pretty good" judgments on the lead motion are by-eye, not numeric.
- Rule conflicts: none; this is exactly the mechanism Style D already relies on for busy state changes - document it
  so frame briefs name a driver explicitly instead of re-deriving the trick ad hoc per episode.
