---
title: Light-continuity match cut — the same light carries across the cut
bucket: 08_Edit_Pacing
source: "Studio Lighting, Silhouettes & Color Theory/Apple commercial Cinematography breakdown.txt"
source_time: "02:37–02:52"
tool_target: shot-list
tier: full
use_when: "planning the join between two setups that change place or object (L03→L04 etc.) and you want the cut to feel bound, not jumped"
style_fit: "Fits Style D joins built from the scene's own objects: the light (a passing beam, a screen glow, the top key's pool) is the carried element; no flash/dissolve; light moves eased."
---

## METADATA
08_Edit_Pacing | general (live-action commercial, iPhone 7 "The City") | shot-list row (join column) + frame brief "Handover"

## CREATIVE_INTENT
In the Apple spot a car's headlights pass across the first shot and the light "continues" in the next shot, so the
two shots "bind well together": a match cut made from light, not from shape. The viewer reads one continuous event
across two places.

## STE_PROCEDURE
1. Before you plan the cut, name one light event in shot A (a beam sweeping, a glow rising, a pool sliding).
2. Give that light a direction and screen position at the last frame of shot A.
3. Start shot B with the same light at the same screen position, moving in the same direction.
4. Keep the light's colour and softness identical across the cut.
5. Place the cut while the light is mid-move, not after it stops.
6. Let shot B's light settle on the new subject within ~0.4–0.8 s, eased.

## AGENT_EXECUTION
Shot-list: write the carried light in the "State change and events" cell of both rows ("beam exits frame right at
y≈40 %" → "beam enters frame left at y≈40 %"). Frame brief "Handover": name the light, its screen position and
direction. raea: animate the same light prop in both scenes with matching colour; e.g. a `SpotLight` whose transform
is interpolated across the last 12 frames of A and the first 12 of B, or an emissive strip (screen glow) that crosses
both. The cut is a hard cut on the word (house rule: cuts on words), the light makes it read as continuous.

### Worked example
Topic: "Kenapa kedai makan 24 jam boleh untung waktu malam" (illustrative).
- BEFORE: `| 5 | "Pukul 2 pagi, jalan dah sunyi" | wide of an empty street | — |` cut to `| 6 | "tapi dapur masih panas" | macro of a wok | flame grows |` — two unrelated shots.
- AFTER: `| 5 | "Pukul 2 pagi, jalan dah sunyi" | low macro over a wet road, one headlight beam sweeps left→right | beam reaches frame right at y≈45 % on "sunyi" | light-continuity-match-cut |`
  `| 6 | "tapi dapur masih panas" | macro of the wok rim, same warm-white beam colour enters frame left at y≈45 % and becomes the stove glow | glow settles on the wok over 0.6 s eased; accent on the RM12 (illustrative) price tag in the steam | light-continuity-match-cut |`

### Check
- Is one light event named in both rows of the join?
- Does it exit A and enter B at the same screen height and direction?
- Are colour and softness the same on both sides of the cut?
- Is the cut placed while the light is still moving?

## NOTES
- Visual gaps: the exact headlight path and the next shot's composition are only visible in the commercial.
- No flash or white-out across the cut (house rule); the light carries the join, not an effect.

## ADDENDUM — Directing Without Words: Visual Storytelling in Film
Source: "Studio Lighting, Silhouettes & Color Theory/Directing Without Words Visual Storytelling in Film.txt" (05:12–05:41)

| Source | Value / rule |
|---|---|
| StudioBinder (Portrait of a Lady on Fire) | Motif match cut across a time jump: the bonfire (sparks in front of Héloïse, her dress catching fire) matches into the next day; "the match signals… the yearning continues unabated". The carried element is a symbolic motif (fire), not only light. |

Extra variant "motif across time": when the next setup is later in time (next day, next month), carry the scene's
motif object or its glow into the same screen position of the new setup, so the jump reads as continuity of the idea
(e.g. a stall's lamp glow at night → the same glow position as the morning sun on the shutter, "esok pagi"). Choose a
motif that already means something in the line (fire = passion/danger in the source); no generic flash.
