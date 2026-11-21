---
title: Foreshadow an off-frame reveal with a light cue before the cut shows it
bucket: 06_Art_Direction
source: 'Cinematic Lighting, Gobos & Volumetrics/A Better Way to Think About "Cinematic" Lighting.txt'
source_time: "09:58–14:02"
tier: principle
tool_target: raea
use_when: "briefing the setup just before a reveal/twist line, when something is about to change or appear"
style_fit: "⚠ adapted — source is a person-behind-a-door suspense scene; Style D has no people, so the cue moves to an object/event about to appear (a new number, a hidden fee, a state change) instead of a hidden figure."
---

## METADATA
06_Art_Direction | general (live-action lighting, tool-agnostic) | raea light/shadow cue, planned one beat ahead of the reveal

## CREATIVE_INTENT
Before the thing itself is shown, change the light so its effect is visible first: a shadow sweeps in from under a
door before the person behind it is seen; a floor-bounce light dims as whatever is approaching blocks it. The audience
reads the light change and starts asking "what's causing that?" one beat before the cut answers them — suspense built
entirely from a light/shadow change, with nothing new added to frame yet.

## STE_PROCEDURE
1. Before the reveal line, name what light/shadow effect that reveal would physically cause if it already existed.
2. Place that effect one setup earlier, with nothing else changed (no new prop, no accent yet).
3. Keep the cue subtle enough to register as "something's different" without giving away what.
4. Pay it off on the reveal line: the thing the cue implied now appears/changes, in the accent.

## AGENT_EXECUTION
raea: dim/shift a light or animate a soft moving shadow across the hero one setup before the reveal; the reveal
setup then snaps the implied change into the actual object/number.
```tsx
{/* L04: cue — a shadow edges across the counter, nothing named yet */}
<SpotLight color="#ffe2c0" intensity={interpolate(f, [0, 59], [intensity, intensity * 0.7])} ... />
{/* L05: payoff — the hidden fee line appears where the shadow had been darkening, now in the accent */}
```

### Worked example
Topic: a parking-app's hidden service fee that only appears at checkout (illustrative numbers).
BEFORE: the fee simply appears on the summary screen with no lead-in.
AFTER: L05 (one setup before) — the summary screen's total number dims slightly at its edge, as if something is about
to be added, no number shown yet; L06 — the hidden "Caj perkhidmatan RM1.20" line snaps into that dimmed spot in the
accent as the voice names it.

### Check
- Was the light/shadow cue placed one setup before the reveal, not on the same setup as the reveal?
- Does the cue avoid naming or showing the actual object/number early?
- Does the reveal setup pay the cue off in the accent colour, closing the loop?

## NOTES
- Visual gaps: the source's technique (a mirror/projector trick to get an "impossible" low door-crack angle, a
  black-flag swing to fake someone approaching) is a physical rigging trick for a live-action set; raea builds the
  same light-change digitally, so the rigging itself isn't translated, only the story beat it produces.
- Rule conflicts: must not imply a person in the street/off-frame (house rule: no people) — the cue is always about an
  object, number or state change, never a hidden figure.
