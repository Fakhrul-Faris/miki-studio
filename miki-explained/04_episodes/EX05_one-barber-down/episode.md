# EX05 — One Barber Down

Status: script for approval → voice/media → layers → build → post
Voice: Nathan, narrator, `v4k7NzxipnuJNJtrKxob`
Format: house cut-paper format, TikTok safe area, anti-slideshow check, cut to the voice

Lane: Queue Math
Named concept: **The queueing curve**: near full capacity, every extra customer adds more wait than the last
Lands on (Meikigo problem): customers can't see the wait jump → a visible, live queue
Setting: general

## The test stack (one option from each group, `03_ideas/experiments.md`)

| Group | Option | In this episode |
|---|---|---|
| H hook | **H3** motion at frame 0 | A barber cut-out is already walking out of frame as the video opens (the sick barber leaving) |
| E edit | **E4** pattern interrupt every 4 s | A break on a fixed 96-frame grid: stamp, freeze, paper flip |
| C camera | **C5** crash zoom on numbers | The camera snaps into 4 MIN, ×1.5, ×10, 45 MIN |
| A animation | **A4** live data build | The curve draws from the real numbers; a dot climbs it as the shop gets busier |
| S structure | **S1** seamless loop | The last line flows into the first; the last frame matches the first |
| U sound | **U1** no music | Voice, drone bed and hits only |
| T text | **T1** big word-by-word captions | Large captions in the middle instead of the small pill |

| Metric (72 h) | EX05 |
|---|---|
| 3 s retention · avg watch time · % watched full · biggest drop · rewatches | _ |
| Views · likes · comments · shares · saves | _ |

## Sources and the maths

- **Model:** the standard multi-server queue (Erlang C, M/M/c): customers arrive at random, cut times vary at random.
  Assumptions stated on screen and in the pinned comment: **5 walk-ins an hour, 20-minute cuts on average.**
  Computed 2026-10-30 (`build/queue_math.py` reproduces it):

  | | Barbers busy | Average wait |
  |---|---|---|
  | 3 barbers | 56 % | 4.5 min |
  | 2 barbers (one sick) | 83 % | 45.5 min |

  83 / 56 = 1.5× busier; 45.5 / 4.5 ≈ 10× the wait. At 6 walk-ins an hour, two barbers are 100 % busy and the queue never clears.
- **Why it curves:** Kingman, J. F. C. (1961), "The single server queue in heavy traffic", *Mathematical Proceedings of the
  Cambridge Philosophical Society* 57(4): waiting time grows with utilisation ÷ (1 − utilisation).
- Real shops differ (appointments, uneven cut lengths); the script says "in a standard queue" where it matters.

## Script — formula (`00_bible/script-formula.md`), length test **L2 standard** (~108 words), **Bridge test: off**
(`03_ideas/experiments.md` § 9 — no "now picture your shop" turn; the tie-in moves to the caption and pinned comment)

| Line | Beat | Voice |
|---|---|---|
| L01 | Hook | One sick barber can turn a four-minute wait into forty-five. |
| L02 | Stakes | Your shop is humming. Three barbers, fifty-six percent busy. About a four-minute wait. Nobody complains. |
| L03 | Mechanism | Then one barber calls in sick. Two barbers now. Same customers walking in. That's only one and a half times busier. Mathematicians have a name for what happens next: the queueing curve. Near full, every extra customer adds more wait than the last. |
| L04 | Twist | So the shop isn't one and a half times slower. It's ten times slower. |
| L05 | Payoff | Busy climbs from fifty-six percent to eighty-three. The wait jumps from four minutes to forty-five. |
| L06 | Loop | Most queues are closer to that edge than they look. |

Word count: 108 (target 100–135). Checklist: 6/6 applicable (Bridge check N/A, off by design) — hook reads with sound off;
one idea (the queueing curve); a real twist (1.5× busier flips to 10× slower); 4 sourced numbers (56%, 83%, 4 min, 45 min,
plus ×1.5/×10); the Loop is a callback, not a question this time; retellable in one sentence ("one sick barber made the
wait ten times longer"). L06 into L01's "One sick barber…" plays as one continuous move (S1 loop).

## Voice direction (ElevenLabs: Nathan, narrator)

One file per line, `audio/L01.mp3` … `audio/L06.mp3`, about 0.3 s silence at both ends.
- **L01:** flat, matter-of-fact delivery of a surprising claim; land "forty-five" clean, no emphasis spike.
- **L02:** calm, scene-setting; "Nobody complains." short and final.
- **L03:** the long explain beat — even pace throughout, a small lift on "the queueing curve" (it's the named concept).
- **L04:** the twist: a beat before "So the shop isn't…", then "It's ten times slower." landed hard and slow.
- **L05:** the numbers read clearly and a touch slower than conversational.
- **L06:** settle into it, not a question's rising tone; end flat so it loops cleanly into L01.

## Shot plan (cut to the voice)

| Shot | Voice | Beat | Ingredient | On screen |
|---|---|---|---|---|
| 1A | L01 | Hook | **Blender paper set** + diagram | The 3D paper shop, 3 barbers. Frame 0: a barber cut-out already walking off (H3). A busy meter: **56 %**; **4 MIN** (crash zoom). |
| 1B | L02 | Stakes | documentary **M1** | A real, calm, busy barbershop bench — establishing, not a pitch (the documentary ingredient moved here since there's no Bridge shot). |
| 2A | L03 | Mechanism | **Blender paper set** + diagram | The same set, one chair empty; customers drop onto the bench on twos as the camera cranes up. Meter climbs to **83 %**; **×1.5** stamps; the queueing curve starts drawing. |
| 3A | L04 | Twist | diagram | "×1.5 SLOWER" stamps, struck through; "×10 SLOWER" stamps (crash zoom); "THE QUEUEING CURVE" title card. |
| 4A | L05 | Payoff | diagram | The two bars: busy 56 → 83; wait 4 → 45; numbers crash zoom. |
| 5A | L06 | Loop | **Blender paper set** | Back to the shop as at frame 0 (the loop): the barber walking off, matching the opening frame. |

The set is built once in Blender (`build/blender_test/` is the placeholder test): cut-outs from `media/CO_*` stand on a
paper floor in front of `media/wall.png`, lit hard from the side, stop-motion on twos with boil and flicker.
Pattern interrupts land on the 96-frame grid wherever no shot change falls. Colour: ink, paper, ochre.

## Post

Bridge is off in the video (§ 9 test): the shop tie-in lives here instead of in the narration.

**Caption:**
```
One sick barber can turn a 4-minute wait into 45 ⏱️

Three barbers, 56% busy: about a 4-minute wait. One calls in sick. Same customers walking in. The shop is only 1.5× busier, but the wait is 10× longer.

That's the queueing curve: near full, every extra customer adds more wait than the last.

Your shop is probably closer to that edge than it looks. How many chairs are you running on a Saturday? 👇

#smallbusiness #barbershop #businesstips #customerexperience #math
```

**Pinned comment:**
```
Want to see where your shop sits on the curve? DM "CURVE".
Model: a standard multi-server queue (Erlang C, M/M/c), 5 walk-ins an hour, 20-minute cuts on average. 3 barbers: 56% busy, 4.5 min average wait. 2 barbers: 83% busy, 45.5 min. Why it curves: Kingman, "The single server queue in heavy traffic" (1961).
```

- Turn on the AI-generated content label (generated stills and voice).
- Posted: _date_ · Link: _
- Results: fill the metrics table at 72 h.

## Before posting

- [ ] Maths reproduced by `build/queue_math.py`; assumptions in the pinned comment
- [ ] AI-generated content label on
- [ ] Captions hidden where the same words are stamped
- [ ] TikTok safe area: every word and key subject inside x 60–960, y 160–1440
- [ ] Anti-slideshow check on every cut
- [ ] Loop checked: last frame → first frame plays as one move
- [ ] Metrics table filled at 72 h
