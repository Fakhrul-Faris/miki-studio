---
title: Proxemics — camera distance to a subject sets how close the audience feels to it
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/You're Framing Every Shot Wrong (It's Control, Not Composition).txt"
source_time: "00:53–02:46"
tool_target: shot-list
tier: full
use_when: "choosing how tight a macro setup should be for a line about intimacy/drama vs. a line that's observed from a distance"
style_fit: "Fits Style D's macro-object close-ups directly: camera distance alone, independent of focal length, is an emotional-distance decision, not just a framing size."
---

## METADATA
06_Art_Direction | general (anthropologist Edward T. Hall, 1966; applied to film) | shot-list (camera distance column)

## CREATIVE_INTENT
People naturally keep invisible distance zones around themselves: intimate (0–18 in, reserved for the closest
people), personal (18 in–4 ft, close friends), social (4–12 ft, acquaintances), public (12 ft+, strangers/crowds). A
camera can place the audience inside any of these distances from its subject. Moving the camera close doesn't just
show more detail — it makes the audience feel like they have stepped into that subject's intimate or personal space;
pulling away creates the same distance a stranger would keep. The exact same moment reads completely differently
depending only on this distance choice.

## STE_PROCEDURE
1. Before framing a setup, ask: how close do I want the audience to feel to this object right now?
2. For a line about weight, reveal, or something personal/high-stakes: shoot at intimate/personal distance (macro-close).
3. For a line that is observed, explained, or kept at arm's length: shoot at social/public distance (pull back).
4. Keep the distance decision independent of lens choice — the feeling comes from the apparent closeness, not only focal length.
5. Record the chosen zone in the shot-list row so distance is a deliberate decision, not a default habit.

## AGENT_EXECUTION
Shot-list row: add the proxemic zone to "Setup and camera" (e.g. "intimate — macro on the coin's edge"). raea: the
zone maps to camera distance/FOV at a given focal length, not just FOV alone.
```tsx
{/* intimate: camera distance kept under ~15 cm from a hero of ~5 cm — fills frame with texture, no room context */}
<Camera3d transform={Transform.fromXyz(0, 0.03, -0.12).lookingAt([0, 0.02, 0])} projection={{ Perspective: { fov: 0.5 } }} />
{/* social: pulled back, the object is one part of a wider counter/shop context */}
<Camera3d transform={Transform.fromXyz(0.3, 0.5, -0.9).lookingAt([0, 0.05, 0])} projection={{ Perspective: { fov: 0.6 } }} />
```

### Worked example
Topic: a hawker finds out his rent went up (illustrative numbers).
BEFORE: every setup framed at a comfortable medium distance regardless of the line.
AFTER: shot-list — L03 "intimate: macro on the rent notice's new number, filling frame" (the gut-punch line);
L06 "social: pulled back to the whole stall with the notice small in it" (the line that steps back to the bigger picture).

### Check
- Does every setup's shot-list row name a proxemic zone, chosen for that line's feeling?
- Is the tightest zone (intimate) reserved for the line that needs the most emotional weight?
- Does distance vary across the episode instead of sitting at one default the whole time?

## NOTES
- Visual gaps: none — the zone definitions and film examples (Nosferatu, Jaws) are narrated.
- Rule conflicts: none — proxemics applies to the macro hero object itself; Style D has no people, so "intimate space"
  here means camera-to-object distance, not camera-to-actor distance.
