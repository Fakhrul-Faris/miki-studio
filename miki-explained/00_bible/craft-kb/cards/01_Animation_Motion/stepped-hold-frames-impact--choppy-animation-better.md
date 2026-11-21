---
title: Stepped hold frames for impact (animating on twos/threes; zero-inbetween "pop")
bucket: 01_Animation_Motion
source: "Motion Feel, Easing & Camera Choreography/Choppy Animation Better.txt"
source_time: "00:02–02:19, 03:44–04:04"
tool_target: principle-only
tier: full
use_when: "a single on-the-word state-change beat needs to read as a hard hit — weighed against the house no-pop rule before ever proposing it"
style_fit: "⚠ direct conflict: the source's headline move (a change appearing with literally zero in-between frames) contradicts the house rule 'objects fade/grow/slide in ~0.4 s, never pop.' Adapted as a named, rare exception only: a single brand-accent flash or hero reveal may hold a frame (animate on twos/threes going in) but must still resolve into the house's eased settle — never used for normal object entrances/exits, and always flagged when proposed."
---

## METADATA
01_Animation_Motion | general (2D/3D animation theory, Cowboy Bebop / Dragon Ball Z / Puss in Boots 2 examples) | principle → raea frame-hold adaptation

## CREATIVE_INTENT
Holding a drawing or pose for an extra frame (animating on twos or threes instead of every frame, "ones") reads as
MORE impactful than filling every frame with interpolated motion, because the viewer's brain supplies the missing
motion between two held frames — "it's often more important what happens between frames than what's happening in a
single frame." The extreme version holds a frame with literally zero in-betweens before or after a sudden appearance
(an arrow already in the bullseye, a flash held one frame in Dragon Ball Z), which the source argues feels more
impactful than any animated transition into that moment.

## STE_PROCEDURE
1. Identify the single moment in a setup that is meant to land as a hit, not a glide (a stamp, a price change, a
   reveal) — most of a shot should NOT use this; it is a rare accent, not a house default.
2. Hold the frame immediately before the hit for slightly longer than its neighbours (on threes/fours instead of
   twos), so the viewer feels the anticipation beat.
3. Let the hit itself land with a bigger visual jump between the held frame and the next than the surrounding motion
   — the jump itself reads as the impact, not a smoothly animated arc into it.
4. Never apply this to a camera move or to ordinary object entrances/exits — it is reserved for the one accent beat
   a brief explicitly calls for.
5. Immediately after the held/stepped beat, return to the house's normal eased settle (no further pop, no bounce) so
   the rest of the shot still reads as deliberate, not glitchy.

## AGENT_EXECUTION
**Frame brief → Decision:** "this ONE beat (named: e.g. the price-drop stamp) holds on threes going in, as the sole
deliberate exception; every other state change in the shot still fades/slides in 0.4 s."

raea (stepped-hold variant, flagged as an exception every time it's proposed):
```tsx
// ⚠ exception only — the hero accent beat (one per episode at most), not a default entrance style
const HOLD_FRAMES = 3; // "on threes" — the stepped read, not every frame
const heldFrame = Math.floor(f / HOLD_FRAMES) * HOLD_FRAMES;
const stamped = heldFrame >= hitFrame; // appears already-landed, no eased grow-in
<Mesh3d visible={stamped}>
  {/* still obeys the house settle AFTER the hit: a brief eased scale-down from an intentional overshoot cap */}
  <StandardMaterial emissive={glow(accent, stamped ? interpolate(f, [hitFrame, hitFrame + 10],
    [1, 0.3], { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0)} />
</Mesh3d>
```

### Worked example
Topic: "Bila kedai letak 'SALE' — berapa cepat harga jatuh?" (illustrative — a price tag swap).
BEFORE (house default, used everywhere): `| 7 | "harga turun" | price tag number eases/counts down over 0.4 s | — | — |`
AFTER (the ONE flagged exception, used once in the whole episode): `| 7 | "harga turun" | old price tag held 3 frames,
then the new price is simply THERE (no eased count) — a stamp, not a slide | a single brand-accent flash lasting one
frame on the new number, then settles to the normal house tone | stepped-hold-frames-impact--choppy-animation-better (⚠ exception, used once) |`

### Check
- Is this the ONLY beat in the episode using a stepped/zero-inbetween pop (not a new default style)?
- Is it explicitly flagged to the user as a deliberate house-rule exception before it ships?
- Does the shot return to normal eased motion immediately after the held beat?
- Was this never applied to a camera move or an ordinary object entrance/exit?

## NOTES
- Visual gaps: the Cowboy Bebop / Dragon Ball Z frame comparisons are shown side by side on screen; exact frame
  counts for those examples are stated in narration and used here as given.
- Rule conflict (stated above in style_fit): this is the single clearest conflict found across set 2 so far between a
  craft technique and the house no-pop rule — never propose it as a general technique, only ever as one named,
  approved exception per use.
