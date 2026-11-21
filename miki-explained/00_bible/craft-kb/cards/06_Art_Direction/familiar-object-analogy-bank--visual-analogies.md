---
title: Familiar-object analogy bank for invisible systems
bucket: 06_Art_Direction
source: "Analogies & Turning Invisible Concepts Into 3D Objects/Visual analogies.txt"
source_time: "none (text article, RTF)"
tool_target: shot-list
tier: full
use_when: "a line describes something with no physical form (an app backend, a permission, an automated flow, a blocked process) and there is no real object to show"
style_fit: "⚠ conflict: house rule 'visualise what the line literally says; a metaphor only when the line is one' → adapted: first look for a literal object/UI (phone screen, receipt, QR stand); use an analogy object only when the line is abstract or itself a metaphor, and then build it as one real macro hero (key, lock, gear) under Style D light."
---

## METADATA
06_Art_Direction (also 07_Script_Story) | general (explainer practice) | shot-list "Setup and camera" / frame brief "Idea"

## CREATIVE_INTENT
Visual analogies pair abstract technical systems with familiar physical objects or everyday scenes so viewers grasp how
something works without jargon. The source's high-impact patterns:
- **Infrastructure & scaling:** cloud servers = renting a storage unit instead of building a backyard shed — scale space
  up or down, someone else maintains it.
- **Security & access control:** a key fitting a lock (authentication/permissions); an alarm sounding on unusual activity.
- **System integration:** puzzle pieces locking together (APIs, modules, data pipelines connecting).
- **Workflows & automation:** interlocking gears (automated processes, dependencies, throughput).
- **Problem & resolution:** a mountain climb or bottleneck vs a clear path, or a key unlocking a door.

## STE_PROCEDURE
1. Before reaching for an analogy, check whether a literal object or UI screen can show the line; if yes, use it.
2. Name the system's one behaviour the line is about (scales, protects, connects, runs by itself, is blocked).
3. Pick the matching pattern: scaling → storage unit vs shed; access → key + lock / alarm; connecting → puzzle pieces;
   automatic → gears; problem/solution → bottleneck vs clear path / key opens door.
4. Choose a Malaysian everyday version of that object (padlock on a roller shutter, kunci on a kedai door).
5. Build it as one macro hero object under the house light, with the brand accent on the part that does the behaviour.
6. Make the object perform the behaviour on the spoken word (key turns, gear engages, pieces lock).
7. Return to the literal object/UI in the next setup so the analogy does not replace the topic.

## AGENT_EXECUTION
In the shot list, write the analogy in "Setup and camera" and the behaviour in "State change and events", with the
trigger word. Frame brief "Idea" names the system behaviour; "Not generic because" names the local object version.
raea: real props only — a GLB key/lock/gear from the library via `<Model src={staticFile(...)} />`, animated with
eased transforms (turn ≤ ~130°/s, no bounce); the accent as emissive on the moving part.
### Worked example
Topic: "Kenapa kena on 2FA untuk akaun bank perniagaan" (how-to; illustrative).
- BEFORE row: `| 4 | "2FA tambah satu lapis keselamatan" | phone with a shield icon | shield glows |` — generic icon,
  "security layer" is never shown.
- AFTER row: `| 4 | "Orang curi password pun, masih tak boleh masuk" | macro: brass padlock on a roller-shutter latch,
  low 3/4 angle | on "password" a key slides in and turns 30°; on "tak boleh" a second lock (accent orange) stays
  shut — key stops (eased, 0.4 s) | familiar-object-analogy-bank |`. Row 5 cuts back to the literal phone OTP screen.
### Check
- Was a literal object/UI tried first, and rejected for a stated reason?
- Does the analogy object perform the one behaviour the line names, on the word?
- Is it one object (not a stack of metaphors) with the accent on the acting part?
- Does the next setup return to the literal subject?

## NOTES
- Source is a web-search answer saved as RTF (not a video); markup stripped. Links/sponsor (Envato templates) dropped.
- Visual gaps: no visuals in source; animation specifics are ours.
- ⚠ Gears, puzzle pieces and mountain climbs are stock-explainer clichés; prefer the local, concrete version and the
  literal-first rule (anti-slop: "if it could be a slide, it's slop").
