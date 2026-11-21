# Addendum → cards/01_Animation_Motion/motion-continuity-across-cuts--cinematography-next-level.md
Source: "Motion Feel, Easing & Camera Choreography/Master SaaS Motion Graphics in 30 Minutes.txt" — 24:23–25:08, 33:39–34:29

## Extra variant: chain a second null so motion never goes static after the push settles
"What is missing is continuous motion. This is a mistake that a lot of editors make. It just makes it really boring.
We're just looking at a static frame." Fix: after the main match-cut push settles (null 1), create a second null
parented under the first and give *it* its own ongoing drift (position key, eased in, then continuing) so the scene
still has gentle movement once the push itself has stopped — rather than the whole group going motionless the instant
the transition ends.

## Extra variant: linear (non-eased) keys for perpetual idle drift
For a background element meant to drift continuously (not settle), two early keyframes are set to "hold," then the
drift keys are right-clicked to **Linear** interpolation instead of eased — "so there's just a nice smooth motion... a
nice slow movement," constant-velocity rather than decelerating, because an eased drift would visibly stop, which
reads as dead if the shot holds on it.

## STE additions
- After any settle-point in a push/slide transition, chain a second driver under the first with its own small ongoing
  motion, so the frame is never fully static once the main move ends.
- For intentionally perpetual (not settling) background drift, key it linear/constant-velocity, not eased — eased
  implies an arrival, which a perpetual drift shouldn't have.

## VALUES BY SOURCE row
| parameter | Master SaaS Motion Graphics (AE) | recommended for Style D |
|---|---|---|
| continuation driver | null-2 parented to null-1, own position key starting after the push settles | a second small `interpolate` added to the same transform after the main move's end frame |
| idle drift interpolation | linear (not eased) for keys meant to loop/hold | linear only for genuinely perpetual background motion; everything else stays eased per house rule |
