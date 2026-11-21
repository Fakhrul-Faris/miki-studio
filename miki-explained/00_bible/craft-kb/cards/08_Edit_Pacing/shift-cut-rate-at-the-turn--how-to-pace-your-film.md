---
title: Shift the cut rate at the turn — speed up at the shock, slow down for weight
bucket: 08_Edit_Pacing
source: "Cinematic & Documentary Narrative Structure/How to Pace Your Film — Examples of Good and Bad Pacing in Editing, Writing and More.txt"
source_time: "11:18–13:26"
tool_target: shot-list
tier: principle
use_when: "planning setup durations around the contradiction reveal (L02) or the payoff number (L09)"
style_fit: "Fits Style D (setup every 2–3 s): the change is in duration and event density, not flashy cuts; slow-motion = slower eased camera, still ≥ one event/s."
---

## METADATA
08_Edit_Pacing | general (editing) | shot-list durations column

## CREATIVE_INTENT
"The art of editing is the art of pacing." Fast cuts are the most immediate way to raise tempo (Baz Luhrmann);
sparse cuts let viewers sink in (Chantal Akerman). The Hurt Locker starts with leisurely cuts, then after a shot is
fired uses several quick cuts for the sudden chaos; Platoon does the opposite — frequent cuts, then holds on slow
motion so the death becomes more excruciating.

## STE_PROCEDURE
1. Find the turn line (the shock or the payoff).
2. Before the shock, run setups ~3 s; after the shock word, drop to ~1.5–2 s for 2–3 setups.
3. For weight instead, run ~2 s setups, then hold one setup ~3.5–4 s at the payoff.
4. Slow the camera move (not the event rate) in the held setup.
5. Use one shift per episode; return to the base rate after it.

## AGENT_EXECUTION
Shot-list: write the duration in the setup cell and mark the turn row "rate ↑" or "rate ↓". raea: a held setup uses a
longer `interpolate` range on the camera with `Easing.inOut`, while state events keep landing on words.
### Worked example
Topic: "Bayar minimum kad kredit je — apa jadi?" (plain arithmetic, illustrative).
- BEFORE: L07–L10 all 3 s setups.
- AFTER: L07 3 s macro on the statement "Bayar minimum RM50"; L08 "**tapi** baki RM5,000 tak bergerak" — on "tapi" rate ↑: three 1.7 s setups (statement → calendar pages → the same RM5,000 figure); L09 rate ↓: one 4 s slow push-in on the total, accent red on the number.
### Check
- Is there exactly one marked rate shift?
- Does it start on the turn word?
- Does every held setup still have an event per ~1 s?

## NOTES
- Akerman-style lingering is too slow for FYP retention; use only as a single held beat.
