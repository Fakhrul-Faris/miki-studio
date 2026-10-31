# Script formula

Adopted 2026-10-31, replacing the old Hook/Setup/Guess/Reveal/Turn/Takeaway skeleton (kept in `series-plan.md`'s history
for reference). Every script is written to this shape, then checked against the list below before it goes to the user.

## The beats

**HOOK → STAKES → MECHANISM → TWIST → PAYOFF → BRIDGE → LOOP**

BRIDGE is our brand's addition (the series' "Niche Variant"); it's now optional and tested (below).

| Beat | Job | Rule |
|---|---|---|
| Hook | A claim or question the viewer must see resolved | Works as on-screen text with sound off. No "Today I'll explain…" |
| Stakes | The problem, one concrete physical detail | A scene, not a statistic |
| Mechanism | How it works, one vivid image or analogy | 3–5 short sentences; a named person/thing beats "researchers" or "a company" |
| Twist | An assumption the viewer held gets flipped | At about the 60% mark. "It wasn't X, it was Y." Without this it's an explainer, not a story |
| Payoff | Hard numbers, a clear before/after | At least 3 specific numbers total across the script |
| Bridge | "Now picture your shop…", one concrete scene | Our named concept gets a title card here or in Twist/Payoff |
| End | A landing line (rotated: reframe · "next time you…" · callback · question sparingly) | Not a question by default — see the competitor rules below |
| Follow | "Follow Meikigo for more." | Last line, after the End |

## The Bridge is optional, and tested

The Bridge ("now picture your shop…") is the series' default, but whether to include it is itself a tested variable
(`03_ideas/experiments.md` § 9 Bridge presence), since it's also the moment most likely to read as a pitch and cost
retention. **Default: on** (series-plan's "every story ends inside a shop" rule). When a script tests it **off**: end on
Payoff → Loop, move any documentary image earlier (Stakes is a natural spot) so the three-ingredient rule still holds,
and carry the shop tie-in in the caption and pinned comment instead of the narration.

## Competitor-informed rules (2026-10-31)

The user flagged the scripts as repetitive ("it will always be question at the end") and pointed at two competitor scripts
(how the store exit gates know you didn't pay; hedge funds counting cars from space). What they do, and what we now do:

1. **Everyday, viewer's-eye topics are allowed** — the viewer as a customer ("why does the other line move faster?"), not
   only "your shop". The shop tie-in can live in the caption and pinned comment (Bridge off).
2. **Contradict in the first breath:** "How do the gates know? They don't." / "Because it usually does."
3. **Go deep and physical in the Mechanism:** a concrete size, count or material ("38 mm, thinner than paper, 58,000 times
   a second") and **one** comparison (a tuning fork).
4. **Put the viewer in the scene** at least once: "Imagine you're walking out with…"
5. **Name the thing they've lived:** "That's why the alarm goes off even when you did pay." — the "so THAT's why" moment.
6. **Escalate when the topic allows:** "But X is just the start" → two more cases, each with a number.
7. **Rotate the ending — no default question.** Pick one per episode and log it (`experiments.md` § 11):
   reframe line ("They never checked your receipt. They only listened.") · "next time you…" instruction · callback to the
   hook · a question (sparingly).
8. **Follow line at the end:** "Follow Meikigo for more." (user, 2026-10-31: put the follow at the end). Its presence and
   wording are logged (`experiments.md` § 10).

The beats become: **HOOK → STAKES → MECHANISM → TWIST → PAYOFF → (BRIDGE) → END → FOLLOW**. "Loop" in older episodes =
END here; a seamless visual loop (S1) can still carry the last frame back to the first.

## Length is a variable, not fixed

The formula's native target is 120–170 words / 45–60s. **We don't default to that — length is tested per episode**
(`03_ideas/experiments.md` § 8 Script length). State the target in `episode.md` and report the actual word count and
tightened duration once the voice is in.

## Writing rules

- Sentences under 12 words. One idea per sentence.
- A new fact, image or number roughly every 5s.
- At least 3 specific numbers; never "a lot", "many", "significantly" when a number exists.
- Delete any line that wouldn't make a viewer keep scrolling if it were cut.
- No filler, no recap of what was just said, no pitch before Payoff.
- Don't reveal the Twist before its beat.

## Topic types

1. **Everyday thing nobody questioned** (store security gates, zip files).
2. **Unexpected source solves a problem** (a bird's beak fixes a train).
3. **Insider secret, calling out big corp** (user, 2026-10-31): name the company directly, "insider secret" framing,
   not a neutral explainer. This is the **How It Makes Money** bank (`03_ideas/content-bank.md` § 2) — hospitals, cinemas,
   airlines, gyms, printers, Costco's hot dog, McDonald's, banks, petrol stations, supermarkets, hotels, delivery apps.

Topic test: would a viewer say "wait, really?" If no, pick a different topic.

## Hook patterns

1. **Impossible question:** "How does one sick barber cost you forty minutes?"
2. **Concrete problem:** "Japan's bullet train had a problem."
3. **Surprising claim:** "Doctors made colonoscopies longer. On purpose."
4. **Counterintuitive claim:** "This airport fixed complaints by making people walk further."

First frame is already in motion (never a title card); the hook line, if it's on screen, is at least 84px; it's under 12 words.

## Quality checklist

Run before presenting a script. Score 1 per yes; below 6/7, rewrite.

- [ ] First line works as on-screen text with sound off
- [ ] Exactly one big idea, one analogy
- [ ] A real twist (an assumption flips), not facts in sequence
- [ ] At least 3 specific, sourced numbers
- [ ] The Bridge names "your shop" concretely
- [ ] The last line invites a comment, share or follow
- [ ] A stranger could repeat the idea to a friend after one watch

## `episode.md` table shape

| Line | Beat | Voice |
|---|---|---|
| L01 | Hook | |
| L02 | Stakes | |
| L03 | Mechanism | |
| L04 | Twist | |
| L05 | Payoff | |
| L06 | Bridge | |
| L07 | Loop | |

Lines can combine beats (Twist and Payoff often sit in one line) or split a long Mechanism into two; the beat column is what
matters, not a fixed line count.

## Worked example: EX05 "One Barber Down"

See `04_episodes/EX05_one-barber-down/episode.md` § Script.
