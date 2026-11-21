---
title: Vary the cut rate to make fast and slow moments land
bucket: 08_Edit_Pacing
type: master
members:
  - cards/08_Edit_Pacing/pacing-shift-fast-cuts-to-slow-cinematic--match-cut-cinematic-breakdown.md
  - cards/08_Edit_Pacing/shift-cut-rate-at-the-turn--how-to-pace-your-film.md
  - cards/08_Edit_Pacing/vary-pace-slow-build-fast-peak--suspense-documentary.md
sources: ["The Match Cut Cinematic Breakdown EP 1.txt", "How to Pace Your Film — Examples of Good and Bad Pacing in Editing, Writing and More.txt", "How to Build Suspense in a Documentary.md"]
use_when: "planning setup durations across the shot list, especially around the contradiction reveal (L02) or the payoff number (L08–L09): a fast-cut run hands off to one slower held setup, cut rate quickens only at the shock/high-stakes stretch"
style_fit: "⚠ conflict: Style D keeps a new setup every 2–3 s throughout, and bans flashy transitions. → adapted: pace varies only through SETUP DURATION and event density inside/around the house band (fast ≈1.5–2 s, base ≈2–3 s, held ≈3.5–4 s), never through whip pans, glitches or a literal slow-motion edit; use at most one marked shift per episode, carried by a sound cue if one exists, and return to base rate after it."
---

## METADATA
08_Edit_Pacing | Live-action / general editing / documentary (sources) → shot-list duration + event-density column | shot-list

## CREATIVE_INTENT
"The art of editing is the art of pacing." Cut rate itself is a storytelling tool: a run of fast setups raises
urgency or compresses information; a held, more deliberately composed setup right after it reads as weighty by
contrast. Used once per episode, this contrast makes both the fast run and the held payoff land harder than either
would at a flat pace.
- Match Cut Cinematic Breakdown adds: the handoff from a fast match-cut information run into the Payoff needs one
  clear marker — a sound cue (e.g. two rising whooshes) exactly on the handoff frame — and every setup after that
  point must be chosen more deliberately (story, composition, lighting) because it will be seen longer.
- How to Pace Your Film adds: the shift can run either direction around a turn line — speed UP after a shock word
  (Hurt Locker: leisurely, then several quick cuts for sudden chaos) or slow DOWN at a payoff for weight (Platoon:
  frequent cuts, then a held slow-motion moment) — and recommends a specific duration recipe for each (~3 s base →
  ~1.5–2 s ×2–3 after a shock; or ~2 s base → one ~3.5–4 s hold at the payoff, with the camera itself moving slower
  in the held setup, not the event rate).
- How to Build Suspense in a Documentary adds: build the slow run first (Free Solo), tighten into a ~2 s-per-phrase
  high-stakes stretch right before the payoff, then hold the payoff setup (~3 s) longest so the number reads — a
  long → short → one long hold curve.

## STE_PROCEDURE
1. Pick at most one place in the episode for a pacing shift: the handoff from the Mechanism beat's fast run into Proof/Payoff, OR the turn line (a shock word or the payoff number).
2. If marking a handoff out of a fast run: place one sound cue exactly on the handoff frame, and make every setup after it more deliberately composed (it will be seen longer).
3. If marking a shock: before the shock, run setups at the base ~2–3 s; after the shock word, drop to ~1.5–2 s for 2–3 setups to raise urgency.
4. If marking a payoff for weight: before the payoff, keep setups near base (~2–3 s) or tighten toward ~2 s through the high-stakes stretch; then hold the payoff setup ~3–4 s, slowing the camera move itself (not the event rate) so the number/object reads.
5. In every setup touched by the shift, still land a state-change on a spoken word, within Style D's ≤ ~4 s ceiling — never stretch a setup into a long static hold with no event.
6. Return to the base rate immediately after the shifted stretch; use only one shift per episode.

## VALUES BY SOURCE
| parameter | Match Cut Cinematic Breakdown | How to Pace Your Film | Suspense documentary | recommended for Style D (+ why) |
|---|---|---|---|---|
| Direction of shift | fast run → one slower, held payoff | either: speed up after a shock, OR slow down at a payoff for weight | slow build → fast high-stakes stretch → one long hold at payoff | Use whichever direction fits the line: shock words get faster; payoff numbers get held — Suspense's 3-phase curve covers both in one episode |
| Fast-section duration | not specified (reads for "a fraction of a second") | ~1.5–2 s after the shock, 2–3 setups | ~2 s per phrase through the high-stakes stretch | ~1.5–2 s, 2–3 setups — tight enough to feel urgent, still within the ≤4 s ceiling |
| Build/base duration | n/a | ~3 s before the shock | ~3–4 s on the build | ~2–3 s (house base); build sections may run toward the ~3–4 s edge of the house band |
| Held/payoff duration | "slightly longer", no fixed number | ~3.5–4 s | ~3 s | ~3–4 s, with the camera move (not the event rate) slowed |
| What marks the shift | one sound cue (rising whoosh) at the exact handoff frame | the shock word itself; camera slows, event rate doesn't | duration curve alone (no cue mentioned) | A sound cue is optional but preferred when one exists in the sound design; otherwise the duration curve alone must read clearly |
| Composition care | post-handoff setups chosen more deliberately (will be seen longer) | not specified | not specified | Apply to any held/payoff setup regardless of which source's recipe is used |

## AGENT_EXECUTION
Shot-list: add a `dur` note and mark the shifted row(s) in the cards column — "pacing shift" for a fast→slow
handoff, "rate ↑" for a post-shock speed-up, "rate ↓" for a payoff hold. Check the duration curve across the
episode: it should read as either long→short→hold (build → high-stakes → payoff) or base→fast (shock) or
fast-run→held (Mechanism → Payoff) — never flat, and never more than one shift per episode.
raea: a held setup uses a longer `interpolate` range on the camera with `Easing.inOut` (the camera itself moves
slower; state-change events still land on words at their normal rate); a fast-stretch setup shortens the
`interpolate` range between setups without changing the easing curve.

### Worked example
Topic: a kedai runcit's daily plastic-bag cost add-up, chained into "Bayar minimum kad kredit je — apa jadi?" and
"Bayar minimum kad kredit — berapa lama nak habis?" (illustrative; recompute any real rate before use).
- BEFORE: 6 quick bag-count cuts, then the RM total appears in the same rhythm, no shift; L07–L10 all flat 3 s
  setups; 24 setups all 2.5 s.
- AFTER (Mechanism → Payoff handoff): 6 quick bag-count cuts (Mechanism) → one whoosh cue → RM450/month total setup
  held slightly longer, framed with more care (counter catching the light).
- AFTER (shock, rate ↑): L07 3 s macro on the statement "Bayar minimum RM50"; L08 "**tapi** baki RM5,000 tak
  bergerak" — on "tapi" rate ↑: three 1.7 s setups (statement → calendar pages → the same RM5,000 figure); L09
  rate ↓: one 4 s slow push-in on the total, accent red on the number.
- AFTER (build → high-stakes → hold): L03–L05 build at 3.5 s; L06–L08 ("RM5,000… bayar RM150 sebulan… faedah makan
  separuh") at 2 s each; L09 payoff "Hampir 4 tahun" held 3 s.

### Check
- Is there exactly one marked pacing shift in the episode, with a clear return to base rate after it?
- Does the shift's direction match the line (shock → faster; payoff/weight → held and slower camera)?
- Does every setup in the shift still land a state-change on a spoken word, within ≤ ~4 s?
- Is the held/payoff setup's composition and light more deliberate than the surrounding shots?
- Is the pace varied only by duration/camera speed and event density — no whip pans, glitches or generic transitions?

## NOTES
- Rule conflict flagged above: the sources' "slow" sections are genuinely different edit paces (live-action B-roll
  held for seconds, or a literal slow-motion shot); adapted here to mean held duration + a slower camera move, never
  a drop below Style D's event-per-second cadence.
- Akerman-style lingering (named in How to Pace Your Film as the opposite extreme) is too slow for FYP retention;
  use only as a single held beat, never a sustained section.
- The three sources disagree on which direction a "shift" runs (toward fast, toward slow, or both in sequence) —
  kept as separate options above rather than averaged; pick per episode based on whether the turn line is a shock or a payoff.
