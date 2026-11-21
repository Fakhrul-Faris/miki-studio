---
title: Reverse-engineer a lit reference from its visual clues before building the rig
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/Obsession (2026) - Lighting Recreation in set.a.light 3D @Elixxier.txt"
source_time: "00:18–02:04; 04:14–05:18; 08:19–09:02"
tool_target: ref-analysis
tier: full
use_when: "writing ref_<shot>.md for any lit reference still, before placing a single raea light"
style_fit: "Method only — serves any ref_<shot>.md lighting section; no conflict with house rules."
---

## METADATA
06_Art_Direction | set.a.light 3D virtual gaffer (other) | ref-analysis + raea light build order

## CREATIVE_INTENT
Before building a lighting rig, read the reference photo for physical clues rather than guessing: dirt/smudge on
glass means the scene is backlit; the direction of a shadow on a feature (a nose, an edge) tells you where the key
sits; a tinted highlight on a surface reveals a hidden coloured practical nearby. Name the brightest source first,
then work outward light by light, checking against the still each time. "We'll never know for sure, but this gets
us ~98% there" — accept a close reconstruction over chasing exact certainty.

## STE_PROCEDURE
1. Before adding any light, name the single brightest source in the reference and its approximate position.
2. Read physical clues for hidden sources: dirt/smudge on glass → backlit; shadow direction on a feature → the
   key's rotation from camera; a tinted highlight on a surface → a coloured practical nearby.
3. Add the key light first; dial intensity until it matches the reference's exposure on the subject.
4. Add each secondary source (fill, practical, rim) one at a time, checking the render against the still before
   adding the next.
5. If a region's level can't be explained by any added light, add one ambient/fill light and raise it until that
   area reads correctly.
6. Stop once the match is close; mark unresolved details "unknown (visual only)" rather than inventing them.

## AGENT_EXECUTION
In `ref_<shot>.md`, write the deduction chain under a "light clues" line before naming any raea light; in the frame
brief, "Decision" lists lights in the order they were deduced, not alphabetically or by type. Convert each named
real fixture (Nova 300, Titan tube, 600D, Amaran 22/MC) to the nearest raea light per `lights.md` (SpotLight/
PointLight/RectLight at equivalent softness and output ratio) — never keep the fixture's brand name in the build.

### Worked example
Topic: a kedai runcit's night counter, closing-up (illustrative).
BEFORE: "add a key light, plus some fill" with no reasoning written down.
AFTER `ref_<shot>.md`: "light clues: receipt-paper glare on the counter top-right → a hard source off-frame right at
~45°; the till screen glow lights the cashier's chin from below → a small coloured practical, not the key. Lights,
build order: 1) key = SpotLight stand-in for the off-frame hard source, dialed until the counter matches reference
exposure; 2) chin fill = small warm PointLight at the till-screen height, ~1/6 the key's intensity."

### Check
- Is the brightest source in the reference named and placed before any other light is added?
- Does every added light trace to a specific visual clue (shadow direction, tint, glare), not a guess?
- Were secondary lights added one at a time, each checked against the reference still?

## NOTES
- Visual gaps: clue-reading depends on seeing the reference still; a transcript-only pass can verify the deduction
  method but not the exposure match itself.
- No rule conflicts.
