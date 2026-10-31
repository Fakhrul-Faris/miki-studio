# EX09 — The Other Line

Status: script ✓ (2026-10-31) → voice/media → Blender set → build → post
Voice: Nathan, narrator, `v4k7NzxipnuJNJtrKxob` · U1: no music (voice, drone bed, sparse hits) · **subtitles on**
Format: house cut-paper format, TikTok safe area. A Blender paper supermarket from four new stills (a checkout, two shoppers,
one documentary photo); EffectCraft diagrams on top. First episode written to the competitor-informed rules
(`00_bible/script-formula.md`): an everyday, viewer's-eye topic; a "next time you…" ending; a follow line at the end.

Lane: The Invisible Queue (calendar P12) · Setting: **supermarket checkout** (retail; the viewer as the shopper)
Named concept: **The wrong-line trap**: separate lines make you gamble; one line to the next free checkout can't be lost

## The test stack (Day 7's slot)

| Group | Option | In this episode |
|---|---|---|
| H hook | **H2** answer first (H5 dropped: the hook is no longer shop-first) | "Why does the other line always move faster? Because it usually does." |
| E edit | **E8** speed ramp | 1A rushes along lane 1, slows to near-still on "because it usually does"; 3A's flow stops dead on "freezes" |
| C camera | **C2** paper-set orbit (Blender) | The paper supermarket, orbited in real 3D (1A, 5A, 6A) |
| A animation | **A3** morph | 3D lanes → flat paper strips (2A); three lanes → one snaking line (4A) |
| S structure | **S1** seamless loop | 6A's orbit ends on 1A's first frame |
| U sound | **U1** no music | Voice, a low drone bed, a till beep and ticks |
| T text | subtitles (T2 dropped at plan) | House pill, hidden where the same words are stamped |
| Scr length | **L3** full (~155 words) | |
| Bridge | **off** | The shop tie-in goes in the caption and pinned comment |
| CTA | **CTA-end** (§ 10) | "Follow Meikigo for more." + FOLLOW MEIKIGO chip and logo (silent) |
| Ending | **END-next** (§ 11) | "So next time you see one long, snaking line, don't groan. It's the fast one." |

## Sources and the maths

- **The 2/3 rule:** with three equally fast lines you have a 1-in-3 chance of being in the fastest, so 2 times out of 3
  another line beats yours. — Bill Hammack ("The Engineer Guy", University of Illinois), via
  https://hothardware.com/news/scientifically-you-probably-are-in-the-slowest-moving-line ·
  https://www.qminder.com/blog/queue-management/other-queue-moves-faster/
- **One line, many counters:** a single queue feeding every counter cuts the variability of waits (no "wrong line"), and
  is used by airports, banks and Whole Foods Manhattan. — https://mat.tepper.cmu.edu/blog/index.php/2007/06/23/queue-or-queues/ ·
  https://www.supermarketnews.com/technology/queuing-question
- **The checkout numbers (computed, `build/queue_math.py`):** 3 checkouts, 3-minute baskets on average, 70 % busy (42
  shoppers an hour), shoppers stay in the line they joined (no switching): separate lines → **7.0 min** average wait, 42 % wait over
  5 min; one line to the next free checkout → **1.6 min**, 11 % over 5 min (**77 % shorter**). Model: M/M/1 ×3 vs M/M/3
  (Erlang C). Real customers who switch lines narrow the gap; the script says "in a standard queue model".

## Script — formula (competitor-informed), length **L3**, Bridge off, CTA end

| Line | Beat | Voice |
|---|---|---|
| L01 | Hook | Why does the other line always move faster? Because it usually does. |
| L02 | Stakes | Pick one of three checkout lines. Only one can be the fastest. So two times out of three, another line beats yours. It's not bad luck. It's math. |
| L03 | Mechanism | Every line hides a jam. A price check. A coupon. A card that won't tap. One slow customer, and everyone behind them freezes, while the next counter sits empty. You can't see it coming, so you can't pick around it. |
| L04 | Twist | The fix is one long line. Airports use it. Banks use it. It snakes back and forth and looks twice as long. But it feeds every counter, so nobody gets stuck behind the jam. |
| L05 | Payoff | Three counters, one standard queue model. Separate lines: seven minutes on average. One snaking line: under two. |
| L06 | End | So next time you see one long, snaking line, don't groan. It's the fast one. |
| L07 | Follow | Follow Meikigo for more. |

Word count: ~155. Checklist — hook contradicts in the first breath and reads muted; one idea (one line beats many); a real
twist (the longer-looking line is faster); numbers (1 of 3, 2 of 3, 7 min, under 2); the viewer is in the scene ("pick one
of three checkout lines"); the lived moment named (the jam you can't see coming); a "next time you…" ending; the follow line.

## Voice direction (ElevenLabs: Nathan, narrator)

One file per line, `audio/L01.mp3` … `audio/L07.mp3`.
- **L01:** the question light and curious; "Because it usually does." flat and certain, after a tiny beat.
- **L02:** brisk; "It's not bad luck. It's math." landed.
- **L03:** the three jams quick, like a list ("A price check. A coupon. A card that won't tap."); "freezes" slowed.
- **L04:** "The fix is one long line." confident; "looks twice as long. But…" turns on "But".
- **L05:** numbers clear; "under two" landed.
- **L06:** warm, a half-smile on "It's the fast one."
- **L07:** short, friendly, not salesy.

## The edit (cut to the voice)

| Shot | Line | Built in | What happens |
|---|---|---|---|
| 1A | L01 | **Blender**, speed ramp | A paper supermarket, three checkout lanes, real light and shadow. The camera rushes along lane 1 (our shopper, ochre YOU tag), then slows to near-still as a shopper in lane 2 walks out — on "because it usually does". |
| 2A | L02 | **Blender → diagram**, morph | The camera cranes to top-down; the 3D lanes morph into three flat paper strips. Dots race three times: YOU loses, loses, wins (✗ ✗ ✓). "2 OF 3" stamps. |
| 3A | L03 | **Diagram**, stop-motion | Lane 1 jams: a price tag, a coupon, a card with ✕ stamp on each word; the dots behind freeze on twos; counter 2 empty, ochre ring "EMPTY". The flow ramps to a dead stop on "freezes". |
| 4A | L04 | **Diagram morph + documentary** | The three lanes morph into one snaking line; dots peel off to whichever counter frees up. The airport photo (M1) slides in on "Airports use it". "LOOKS LONGER" struck → "IS FASTER". |
| 5A | L05 | **Blender orbit** + number wheels | Back in the paper supermarket, now one snaking line between rope posts. Slow orbit; wheels roll to 7 MIN (separate) and 1.6 MIN (one line). |
| 6A | L06–L07 | **Blender** → loop | The orbit continues; "IT'S THE FAST ONE." stamps; then "FOLLOW MEIKIGO" chip + logo (no sound on the logo). The camera lands on 1A's opening pose: seamless loop. |

Subtitles: house pill (IBM Plex Mono on paper), inside the safe area, hidden where the same words are stamped.

## What to generate (`how-i-generate.md`)

1. Voice L01–L07 (Nathan).
2. `CO_checkout`: a supermarket checkout with conveyor and till (used ×3 in the Blender set).
3. `CO_shopper1`, `CO_shopper2`: two different shoppers standing, seen from behind (basket / trolley); more by mirror + recolour.
4. `M1`: documentary photo, an airport security snaking queue from behind.

## Post

Bridge is off in the video: the shop tie-in lives in the caption and the pinned comment.

**Caption:**
```
Why does the other line always move faster? Because it usually does. 🛒

Pick one of three checkout lines. Only one can be the fastest. So 2 times out of 3, another line beats yours. It's not bad luck. It's math.

The fix looks wrong: one long snaking line that feeds every counter. In a standard queue model, the average wait drops from 7 minutes to under 2.

Run a café, a shop or a clinic? Your lunch-rush queue works exactly the same way.

#queue #supermarket #retail #smallbusiness #customerexperience
```

**Pinned comment:**
```
Running a counter? DM "LINE" and we'll show you how one queue can cut your wait.
The numbers: a standard queue model (3 separate M/M/1 lines vs one M/M/3 line, Erlang C) with 3 counters, 3-minute baskets on average, 70% busy, and shoppers who stay in the line they join: 7.0 min average wait vs 1.6 min. The 2-in-3 rule: Bill Hammack, "The Engineer Guy" (University of Illinois). One-line queues at airports, banks and Whole Foods: Carnegie Mellon's OR blog; Supermarket News.
```

- Turn on the AI-generated content label (generated stills and voice).
- Posted: _date_ · Link: _
- Results: fill the metrics table at 72 h.

## Before posting
- [ ] Model numbers reproduced by `build/queue_math.py`; "standard queue model" in voice and pinned comment
- [ ] AI-generated content label on
- [ ] TikTok safe area: every word inside x 60–960, y 160–1440
- [ ] Loop checked: last frame → first frame
- [ ] Metrics table filled at 72 h
