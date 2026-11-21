---
title: Motion match, subject swap — the move continues while the object changes, to say "this became that"
bucket: 06_Art_Direction
source: "Motion Feel, Easing & Camera Choreography/Animation Technique Guide.txt"
source_time: "00:35–00:54, 03:13–03:43"
tool_target: shot-list
tier: full
use_when: "a line that literally states a transformation or comparison (cash → QR, a stall → a shop, a receipt → a chart)"
style_fit: "Fits Style D object morphs and 'visualise what the line says'; use only when the line states the change (not as a decorative metaphor)."
---

## METADATA
06_Art_Direction | After Effects → raea | shot-list rows (join) + frame brief "Idea"

## CREATIVE_INTENT
"You can have the motion match and the subject changes" — 2001's bone tool to spaceship summarises man and
technology "in just one editing choice". In the boxed-wine piece the cut goes from a kangaroo's pouch to the goon
sack with the motion moving up-left along the pouch shape, and "one or two frames beforehand I've even swapped out to
the metallic sack" to smooth it.

## STE_PROCEDURE
1. Before planning, confirm the line names both things (A becomes/compares to B).
2. Give A a clear motion vector (direction + speed) in its last ~0.5 s.
3. Start B moving on the same vector, at a similar screen position and similar silhouette.
4. Swap A's material or shape to B's 1–2 frames before the cut.
5. Cut on the word naming B.

## AGENT_EXECUTION
Shot list: both rows carry the same vector ("rises up-left"). raea: in A's last 2 frames swap the material
(`StandardMaterial` colour/metalness) toward B's; B's `interpolate` starts mid-speed (no ease-in) and eases out.

### Worked example
Topic: "Dari tin duit syiling ke QR — gerai makin laju" (no fee claims).
- BEFORE: `| 3 | "Dulu bayar guna syiling" | coins in a tin | — |` cut `| 4 | "Sekarang scan je" | phone showing QR | — |`
- AFTER: `| 3 | "Dulu bayar guna syiling" | macro on a coin tilting up-left out of a tin | coin rises up-left, 2 frames before the cut it flattens and turns black-and-white like a QR tile | motion-match-subject-swap |`
  `| 4 | "Sekarang **scan** je" | macro on the QR stand at the same screen spot | the QR tile continues up-left and lands into the stand's code on "scan"; accent on the scan frame | motion-match-subject-swap |`

### Check
- Does the line explicitly name both A and B?
- Is the motion vector identical across the cut?
- Is there a 1–2 frame pre-swap toward B?

## NOTES
- Visual gap: the pouch → sack frames are only described.
