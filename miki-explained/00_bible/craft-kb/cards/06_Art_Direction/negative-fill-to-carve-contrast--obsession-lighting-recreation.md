---
title: Negative fill to carve contrast when a location isn't naturally dark
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/Obsession (2026) - Lighting Recreation in set.a.light 3D @Elixxier.txt"
source_time: "05:59–06:37; 07:17–07:40"
tool_target: raea
tier: full
use_when: "a scene's shadow side is reading brighter/flatter than the reference because of bounce off nearby surfaces"
style_fit: "No conflict — supports Style D's dark-room contrast."
---

## METADATA
06_Art_Direction | set.a.light 3D virtual gaffer (other) | raea light exclusion / absorbing plane

## CREATIVE_INTENT
When a location's walls or surfaces would naturally bounce ambient light back onto the shadow side (flattening
contrast), block that bounce with a negative-fill flag ("neg") so the dark side of the subject stays dark, matching
a contrastier reference instead of adding more fill.

## STE_PROCEDURE
1. Before adding negative fill, check whether the shadow side of the subject reads brighter than the reference.
2. If so, place a black flag between the subject's dark side and whatever would bounce light onto it (a bright
   surface, the camera-side ambience).
3. Size the flag to block only the bounce path, not the key light itself.
4. If contrast becomes too strong (shadow side goes fully black when the reference still shows detail), move the
   neg further away or use a smaller one — don't add a fill light back in to compensate.

## AGENT_EXECUTION
raea has no literal flag object; achieve the same effect by keeping a nearby light from casting onto the shadow
side (disable bounce/GI contribution for that light, or aim it only at the key side), or place a plain dark-material
plane out of camera on the shadow side to absorb bounce. Note the neg's purpose in the frame brief Decision line.

### Worked example
BEFORE: a product shot where ambient bounce off the macro surface fills in both sides evenly, reading flat.
AFTER: frame brief Decision adds "neg: a dark card out of frame on camera-left blocks the surface bounce, keeping
that side at the reference's contrast."

### Check
- Was negative fill added only after the shadow side was confirmed too bright against the reference?
- Does the neg block bounce without dimming the key light itself?
- If contrast overshot, was the fix a smaller/farther neg rather than an added fill light?

## NOTES
- No rule conflict.
