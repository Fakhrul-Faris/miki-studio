---
title: Load two agents with motives and place them in space before the action
bucket: 07_Script_Story
source: "Cinematic & Documentary Narrative Structure/Johnny Harris Reveals How He Writes YouTube Videos.txt"
source_time: "24:16–26:21"
tool_target: shot-list
tier: full
use_when: "planning the mechanism (L04–L08) when the story is a pull between two sides: shop vs supplier, buyer vs platform, owner vs bank"
style_fit: Fits Style D if the "icons" are real hero objects (two objects on one surface) and space = distance on the table; ⚠ no figures/people — agents are objects, logos or UI cards.
---

## METADATA
07_Script_Story | map animation with two icons | shot-list rows for the mechanism; frame brief "Idea/Decision"

## CREATIVE_INTENT
Harris "immediately thinks in terms of characters and on the map": two icons (the Mormons in Mexico, the federal
government in the east), far apart. "Loading up the icon with motives": tell the viewer each agent's agenda, need and worry.
Once both are loaded, motion between them creates tension and anticipation ("here they come") — the federal icon slowly
moves west toward the small, scared Mormon icon. "Now the stage is set."

## STE_PROCEDURE
1. Before planning the mechanism, name the two agents in the story (≤ 3 words each).
2. Write each agent's motive in one line: what it wants, what it fears.
3. Put both agents in one frame, with distance between them that stands for the conflict.
4. State each motive in the voice on its own line, while that agent is lit/accented.
5. Only after both are loaded, move one agent toward the other, slowly (eased, over ≥ 2 s).
6. Keep the size difference meaningful (big = powerful, small = vulnerable).
7. Return to the same two-agent frame when the conflict resolves.

## AGENT_EXECUTION
Shot list: one establishing row with both objects on the surface (wide macro), then a row per motive (accent on the agent
speaking), then the approach row. The frame brief "Idea" names the tension; "Moves" is the approach. In raea, the approach
is the camera/object position driven by `interpolate(frame, [word("datang"), word("datang")+60], [x0, x1], {extrapolateLeft:"clamp", extrapolateRight:"clamp"})` with an in-out ease.
### Worked example
Topic: a small kedai runcit in Seremban vs a new hypermarket nearby (illustrative).
BEFORE: L05 "Persaingan dalam sektor runcit semakin sengit." — one shot of a shop shelf.
AFTER: Row 5: wide macro, a tiny wooden kedai sign at left, a huge glossy shopping trolley at the far right of the table. L05 "Kedai Pak Mat ni hidup dengan pelanggan taman je." (accent on the sign). L06 "Hypermarket tu nak semua pelanggan dalam 5 km." (accent on trolley). L07 "Dan dia makin dekat." — trolley slides 40 % closer over 2 s, eased.
### Check
- Are both agents named with a one-line motive each?
- Is each motive voiced before any movement happens?
- Does the distance/size in frame stand for the conflict?
- Are agents objects/logos/UI, never figures?

## NOTES
- ⚠ Harris uses map icons of groups of people; Style D forbids people → agents become hero objects or brand logos.
- Visual gaps: map style and icon design are only described verbally.
