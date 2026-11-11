# Script formula

**v2, 2026-11-11.** Merges the Fable 5.2 script prompt (`04_episodes/Meikigo TikTok Script Prompt.md`) with the series'
own rules and the 10 Nov postmortem (`06_analytics/2026-11-10/postmortem.md`). Replaces the 2026-10-31 formula
(Hook → Stakes → Mechanism → Twist → Payoff → Bridge → End → Follow; see § History). The paste-ready prompt for an
outside model is `04_episodes/Meikigo TikTok Script Prompt v2.md`; this file is the source of truth if they disagree.

## Who is watching

- 95–99% Malaysia, 85–90% aged 18–34, about two thirds male; 99–100% non-followers from the For You page.
- They decide in the first second: every video so far loses most viewers at 0:01–0:02.
- They know ZUS, Mixue, 99 Speedmart, Mr DIY, Grab, McDonald's Malaysia, IKEA on sight; not Costco, Marriott, US banks.

What the data says (17 videos to 10 Nov): only IKEA and McDonald's passed the ~700-view first pool (Malaysian-searched
brand + a question viewers already had); 6 of 8 follows came from "How is 99 Speedmart so cheap?" and the McDonald's
machine (30–35 s); search arrives as "<brand> malaysia" and "part 3 4 5"; 3 comments in 17 videos.

## Topic gate (before writing)

1. A brand, shop or habit a Malaysian sees every week **and searches for**.
2. The hook asks a question the viewer has half-wondered: why is it so cheap, why is it always like that, how does it
   make money, who really owns it.
3. One idea; two mechanisms at most.
4. Ringgit, Malaysian store counts and examples. Foreign-only data → say so and find a Malaysian angle.
5. Would a viewer say "wait, really?"

Any no → don't write it now. Topic types still allowed: everyday thing nobody questioned; insider secret on a named
company (the How It Makes Money / How is X so cheap? / Who Secretly Owns What series); founder stories (Malaysian).

## Length

- **Default 55–70 spoken words ≈ 25–35 s.** Time it at the measured rate of the voice in use (the voice is still a
  test): Kokoro `am_michael` ~2.0 words/s incl. pauses (EX33 68 words/32.0 s, EX35 74/37.4 s); Eleven Nathan ~2.75
  (EX24 95/34.7 s, EX25 87/31.5 s). Aim for 30–35 s on whichever voice records it.
- **Exception:** a story with a timeline or several turns gets the length its beats need, 60 s+ allowed (LESSONS §11,
  EX34). Decide the length from the beats before writing; state the target in `episode.md` (`experiments.md` § 8).
- Lines of one or two sentences, 15 words at most; sentences under 12 words.

## The beats

**HOOK → OPEN LOOP → MECHANISM 1 → (MECHANISM 2) → PROOF ↔ PAYOFF → END → FOLLOW**

| Beat | Job | Rules |
|---|---|---|
| Hook | Asks the question | First words, ≤ 12 words, brand in the first three spoken words, a price or number the viewer knows. No setup, greeting, "did you know" or "In 2001". Works as on-screen text with sound off. |
| Open loop | Rules out the obvious answer | Contradict in the first breath ("It's not the coffee. It's what ZUS refuses to pay for."). Don't give the real answer. |
| Mechanism 1 | First concrete piece | One picturable fact, one number, one physical detail (a size, a count, a material). |
| Mechanism 2 | Second piece | Only if new. A few words of re-hook near 10 s ("But that's not the clever part."). |
| Proof | One number that shows it worked | A single figure, never a list. Before or after the Payoff: the stronger of the two goes last. |
| Payoff | The real answer, as a reframe | Answers the hook directly; < 12 words, two mirrored halves; repeatable to a friend. This is the twist: the viewer's assumption flips here. |
| End | A comment or a loop | A forced choice answerable in one word (a matter of opinion), or a line that leads back into the hook. Rotate and log (`experiments.md` § 11). |
| Follow | "Follow Meikigo for more." | Kept (user, 2026-11-11). Last line, after the End, said flatter so the End lands. |

Whole-script rules:

- The real answer never appears before the Payoff. A revenue or size figure is Proof, not Payoff ("It makes RM1
  billion" doesn't answer "why is it cheap" — EX35's mistake).
- **Series parts never in the voice** ("Part 4", "Follow for Part 4"): they tell a new viewer they missed something.
  Series name and part go in the caption, a small on-screen label and the pinned comment's next-part vote.
- **No Bridge to "your shop" in the voice** (off since EX24; the account now serves a general Malaysian audience). Any
  shop tie-in goes in the caption or pinned comment.
- Plain spoken English a 12-year-old follows: no "leverages", no "business model" in the voice. No vague intensifiers
  (huge, massive, crazy, insane, amazing, incredible): name the number, object or gesture.
- Link lines with "but" and "so", never "and". If two lines could swap unnoticed, it's a list: fix it.
- Say "you" at least once (their money, their queue, their habit). Use contrast: this brand does X, that one Y.
- At least three specific, sourced numbers; one number per line; exact numbers (566, not "over 500").
- Every line gives the animator a new picture; two lines on one picture → merge or cut.
- No "comment YES if", "wait for the end", fake urgency, deliberate mistakes, factual traps or accusations.

## Angle check (before locking)

Sketch the hook both ways and pick the sharper:
- **Number-led (analytical):** the price gap or figure opens; mechanisms break it down.
- **Moment-led (anthropological):** a lived moment opens ("You've stood in that line"); numbers land at Proof.

Draft ten hooks of different types (price gap · contradiction · a thing you do without knowing why · surprising number ·
impossible question), return three, recommend one. The first one is what every other account wrote. Log angle, hook
type and ending in `experiments.md` § 14 and don't repeat all three of the last three episodes.

## Visual column (the build starts from it)

- **Frame 0 already moving and odd:** the real logo and the hook's number on an object in the world at 0.0 s, shown in
  a way people don't see day to day (memories: odd-moving-first-frame, brand-logo-first). Most viewers are muted.
- **30 hari run (18 Nov – 17 Dec):** "Hari N/30" on screen at frame one with the logo; caption line 2 = "30 hari, 30 bisnes Malaysia · Hari N"; the pinned comment asks which business is next.
- Show what each line **literally** says; a metaphor only if the line is one.
- Numbers and brands on the world's own objects, readable at phone size, clear of the caption band.
- UI makes physical sense: phones are held by people, never posters on walls.
- Every claim gets a visual; nothing said only in the voice.

## Voice text

Each line in two forms: **display** (captions: "RM8.90") and **spoken** (numbers, money, dates, units as words;
respellings checked by ear: "Zoos", "ringghit"). Kokoro: plain text, pauses from full stops. Eleven v4: "…" pauses,
one CAPS word, one [tag] max per line. `voice.md`.

## Facts

Never invent a number, date, price or quote; unsure → UNVERIFIED with what to check. Source and date for every figure,
Malaysian and recent first. Prices: "about RM16" unless checked in the app on the day. Write a "Not claimed" line
(what isn't public: margins, rent). Describe how the business works; no accusations.

## Deliverables in `episode.md`

1. Topic gate answers. 2. Three hooks (of ten) + the pick. 3. Script table:
   `| Line | Beat | Voice (display) | Voice (spoken) | On the objects | Visual |` (L01's Visual describes frame 0).
4. Word count + duration at the voice's rate. 5. Caption: first line the search phrase with "malaysia", one sentence, series
   name + part, 3–5 hashtags (≥ 2 Malaysian). 6. Pinned comment: next-part binary vote + sources, worded unlike the End.
7. BM version of the voice (for a BM caption or a later test). 8. Fact sheet + "Not claimed". 9. Log line for
   `experiments.md`. 10. Self-check below.

## Self-check (all yes, or fix before presenting)

- [ ] Brand in the first three spoken words and on screen, moving, at frame 0
- [ ] Question asked in the first sentence; delete L01 and the script breaks
- [ ] Real answer held until the Payoff; the Payoff answers the hook and is a reframe, not a statistic
- [ ] Within the length target for this topic
- [ ] Every brand known to a Malaysian 22-year-old
- [ ] End answerable in one word or loops; no "Part N" in the voice; ends "Follow Meikigo for more."
- [ ] ≥ 3 numbers, each in the fact sheet and on an object
- [ ] Every line has its own literal picture
- [ ] A stranger could repeat the Payoff to a friend after one watch

## Example of the shape (don't copy its wording)

| Line | Beat | Voice (display) |
|---|---|---|
| L01 | Hook | ZUS is RM8.90. Starbucks is RM16. Why? |
| L02 | Open loop | It's not the coffee. It's what ZUS refuses to pay for. |
| L03 | Mechanism 1 | The first ZUS was a 200-square-foot kiosk in KLCC. No seats. |
| L04 | Mechanism 2 | But here's the clever part. Over 70% of orders come through the app. |
| L05 | Mechanism 2 | So it skips the mall's front row for cheaper side streets. |
| L06 | Proof | By 2024: 566 stores to Starbucks' 411. |
| L07 | Payoff | Starbucks sells you a seat. ZUS only sells the cup. |
| L08 | End | So which one are you paying for? |
| L09 | Follow | Follow Meikigo for more. |

~75 words ≈ 36 s, one line over the default: merge L04–L05 or drop L06 to fit.

## History

- **2026-10-31 → 2026-11-11:** Hook → Stakes → Mechanism → Twist → Payoff → Bridge → End → Follow, 7-point checklist,
  Bridge on by default with six rotating openers (fragment · present-tense claim · causal carry-over · instruction ·
  demonstrative · comparative ellipsis; never "now picture…"). Stakes and Twist live on as the Open loop and the
  Payoff-as-reframe. If the Bridge is ever tested again, reuse those openers.
- Before 2026-10-31: Hook / Setup / Guess / Reveal / Turn / Takeaway (`series-plan.md`).
