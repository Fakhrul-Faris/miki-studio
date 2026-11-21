---
title: Which already-present light source you key decides what the frame says matters right now
bucket: 06_Art_Direction
source: 'Cinematic Lighting, Gobos & Volumetrics/A Better Way to Think About "Cinematic" Lighting.txt'
source_time: "07:02–09:33"
tier: principle
tool_target: frame-brief
use_when: "two objects/elements in frame could both plausibly be lit; deciding which one the shot is 'about'"
style_fit: "Fits Style D macro setups with two props or a prop + UI screen in frame: instead of adding a new light to flag the subject, key from whichever existing source belongs to it."
---

## METADATA
06_Art_Direction | general (live-action lighting, tool-agnostic) | frame brief (Eye/Decision fields)

## CREATIVE_INTENT
Same two objects, same room, two real light sources already in the world (a ceiling lamp, a screen). Keying the lamp
and letting the screen barely touch the frame says "the work matters less than what he's about to notice"; keying the
screen's light instead says "this is the important thing right now." Nothing was added — the same two sources were
simply ranked differently. Choosing which already-present source to key is a cheap, motivated way to point at the
thing the line is about without inventing a new light.

## STE_PROCEDURE
1. Before adding any new light, list the sources already plausible in this setup (the room's top light, a screen, a
   reflective surface, a window).
2. Name which object the current line is about.
3. Key from whichever source belongs to that object (or sits closest to it); let the others fall back.
4. When the line's focus moves to the other object next, swap which source is keyed rather than cross-fading two accents.

## AGENT_EXECUTION
Frame brief **Decision** field: "key = <source>, because the line is about <object>." raea: raise the intensity on
the light that belongs to the current-focus object, lower/dim the other's.
```tsx
{/* line is about the receipt, not the phone beside it: key the desk lamp, not the phone's own glow */}
<SpotLight name="deskLamp" color="#ffe2c0" intensity={2_400_000} ... />   {/* keyed: belongs to the receipt */}
<PointLight name="phoneGlow" color="#bcd2ff" intensity={60_000} ... />    {/* present but subordinate */}
```

### Worked example
Topic: a customer checks a QR payment total against the cashier's handwritten total (illustrative numbers).
BEFORE: both the phone screen and the receipt lit evenly; no clear "what matters now."
AFTER: Decision — "L03 keys the receipt's desk lamp (line: 'kertas kata RM12')"; "L04 keys the phone's own screen glow
instead (line: 'tapi app kata RM15')" — the same two light sources, re-ranked per line, without adding a new light.

### Check
- Are all the lights used already motivated sources in the setup (not an invented new light)?
- Does the Decision field name which source is keyed and which object the current line is about?
- When focus moves to the other object, does the keyed source change instead of adding a second accent?

## NOTES
- Visual gaps: none — fully stated in speech (lamp vs. laptop-screen example).
- Rule conflicts: none; this replaces "add a light to flag the subject" with "re-rank the lights already there," which
  keeps the one-accent rule intact (no new coloured light is added).
