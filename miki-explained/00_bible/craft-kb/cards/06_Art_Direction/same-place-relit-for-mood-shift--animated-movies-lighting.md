---
title: Same place, new light — relight one location to mark the mood arc
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/Why Lighting Animated Movies Is So Complicated | Movies Insider | Insider.txt"
source_time: "04:04–04:20, 06:28–06:46"
tool_target: frame-brief
tier: full
use_when: "the loop ending or a payoff that returns to an earlier object/framing; any 'same shop, different result' beat"
style_fit: "Fits Style D's last-frame-loops-to-first rule: the end setup reuses the frame-0 object and framing; only the light changes to say the story moved."
---

## METADATA
06_Art_Direction | general (Pixar, *Incredibles 2*) | frame brief (Feeling + light) + shot list

## CREATIVE_INTENT
In *Incredibles 2* the school hallway is lit by overhead fluorescents that create "a sterile and uncomfortable feeling",
mirroring how Violet feels when Tony can't remember her (Charu Clark, Pixar lighting artist). "Later in the movie when
Tony finally remembers Violet, the same location is lit up with bright sunlight to evoke a happy ending and the two
characters' fresh start. Different lighting for a different mood."

## STE_PROCEDURE
1. Before you plan the payoff, find an earlier setup the payoff can return to.
2. Reuse that setup's object, camera framing and lens exactly.
3. Change only the light: source type, colour temperature and direction.
4. Use cold, flat, top-down light for the problem state (fluorescent feel).
5. Use warm, directional light with longer soft shadows for the resolved state (sunlight feel).
6. Check the two stills side by side read as "same place, different mood".

## AGENT_EXECUTION
Shot list: mark the pair (`L02 ↔ L10 relight`). Frame brief "Feeling": cold/uneasy → warm/fresh start. raea: same
camera `Transform` and model; problem state = `RectLight` overhead `#dfe8ff` wide and flat; resolved state =
`DirectionalLight` low-angle `#ffe2c0` with `shadow_maps_enabled` (or a warm `SpotLight` from the side). If the
relight happens within one setup, ramp light values over ≥ 0.4 s eased.

### Worked example
Topic: "Kedai dobi layan diri: kenapa mesin kosong waktu siang" (illustrative).
- BEFORE: L02 and L10 are different shots (empty machines; then a busy shop wide).
- AFTER: `| 2 | "Siang, 10 mesin, 1 je jalan" | macro row of washer doors, flat cool overhead light #dfe8ff | the one running drum turns | same-place-relit |` … `| 10 | "Promo RM5 waktu siang, 6 mesin jalan" (illustrative) | identical framing, warm low side light #ffe2c0 through the shop front, soft long shadows | drums start one by one, RM5 in accent | same-place-relit |`.

### Check
- Do the two setups share object, framing and lens exactly?
- Is the light the only change?
- Does the problem setup read colder/flatter than the resolved one?

## NOTES
- Visual gaps: hallway frames not described beyond source type and mood.
- Lighting a figure's face is not carried over (no people in Style D).
