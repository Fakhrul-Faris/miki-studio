---
title: A single light-sweep across a static logo as a one-off brand beat (not a scene transition)
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/How To Master Saas Explainer – Full After Effects Tutorial.txt"
source_time: "1:54:08–1:55:05"
tool_target: raea
tier: principle
use_when: "the brand logo holds still on screen and needs one small, premium flourish — never used as a cut/transition"
style_fit: "⚠ a light sweep used as a wipe/transition is a generic flash per house rule → kept narrow: allowed only as a one-off beat on a static logo already on screen, never to join two shots."
---

## METADATA
06_Art_Direction | After Effects CC Light Sweep (source) → raea masked gradient pass | raea

## CREATIVE_INTENT
Once the logo has settled (after the drop-in beat), a single diagonal light sweep crosses it once — shape set to
"smooth", direction/position keyed so it travels once and stops, sweep intensity adjusted to taste. It is not used to
cut between shots; it is a single finishing touch on a logo that is already sitting still in frame.

## STE_PROCEDURE
1. Only apply this after the logo has already landed and settled — never mid-transition.
2. Sweep a soft diagonal highlight across the logo once (smooth shape, not a hard edge).
3. Run it once, `~`0.4–0.6 s, then stop — no loop, no repeat.
4. Keep it to the logo only, not the whole frame.

## AGENT_EXECUTION
raea: a masked gradient band swept across the logo's bounding box once. `<div style={{ maskImage: diagonalSweepGrad,
maskPosition: `${lerp(-120, 120, t)}% 0` }}>{logo}</div>`, `t` eased 0→1 once, triggered on the logo's settle frame.

### Worked example
Topic: Meikigo logo settling at the end of a "how korang boleh check resit" how-to.
- BEFORE: the logo sits still with no flourish once it lands.
- AFTER: once settled, one soft diagonal sweep crosses the logo over ~0.5 s and stops — no repeat, no use as a cut.

### Check
- Does the sweep run on a logo that is already static (not mid-transition)?
- Does it fire exactly once, not loop?
- Is it confined to the logo, not the whole frame?

## NOTES
- Visual gaps: exact sweep-intensity value is visual only.
- Rule conflict: house rule forbids generic flashes/wipes as transitions — this card is scoped narrowly to a static-logo
  finishing beat only; do not reuse it to join shots.
