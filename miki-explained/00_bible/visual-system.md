# Visual system

r06's storytelling grammar (claim → evidence → "what it means" → turn), built with Base44's craft (UI cards,
flat tiles, assembly bursts, framed photos, constant drift). Proven in EX01 and EX02. The look is the brand, since
there is no series name. All of it lives in `tools/ec/core.jsx` and `tools/ec/blocks.jsx`.

## Colour: one meaning each

| Name (core.jsx) | Colour | Means | Never use it for |
|---|---|---|---|
| `ANSWER` | green `#21A35E` | the fix, the good outcome, Meikigo, the named concept's highlighter | the problem |
| `PROBLEM` | coral `#E65C42` | the problem: the waiting, the loss, the customer who walks out | anything good |
| `BLUE` | `#4F6BF5` | neutral data (walking time, handlers, a person who isn't the problem yet) | emphasis |
| `INK` / `CREAM` / `CARD` | | text, background, cards | |
| `BROWN` | `#2A221C` | "your shop": the turn and the takeaway are always on brown | the story half |
| `RED` / `YELLOW` | | only when drawing something literally that colour (a traffic signal) | meaning |

EX01 and EX02 predate this rule (green meant both). From EX03 on, green is never the problem.

## Structure

- **Story half on cream, "your shop" half on brown.** The zoom-through (a bar swells to fill the frame, then darkens to
  brown) is the hinge, every episode.
- **One continuous canvas.** The camera drifts (DRIFT null, 100→104% over the episode) and pushes in to annotate.
  No hard cuts except into brown.
- **Shared elements carry across beats.** A tile or photo from one beat becomes part of the next (the EX01 suitcase → card header).

## Type

- **Work Sans** (Medium / SemiBold / Black) for claims, numbers and headlines. **Inclusive Sans** (Medium / SemiBold) for
  labels, chips and captions.
- **Minimum 32px for any text** (`MIN_TEXT`, enforced in `core.jsx`). Labels that need to be smaller are a sign of too much on screen.
- **Hook line at least 84px**, and something visibly changes within the first 0.5s (a push, a pop, a burst).
- Words appear as they are spoken (word timings from `tools/words.py`). The screen never runs ahead of the voice.

## Mixed media

- AI-generated stills (Seedream): grayscale-tinted documentary photos as full-bleed backgrounds (`bleed()`) or white-framed
  prints (`print()`). Generic only: no logos, no readable signage, no identifiable people.
- **Label it.** Turn on the platform's AI-generated content label (TikTok "AI-generated content", Instagram "AI info") on every
  post that uses generated photos. The series runs on credibility.
- Check generated details against the facts (EX02's signal came out red/yellow/**blue**). Prompt the detail explicitly or crop it.

## Layout and safe zones

- Nothing important below **y 1460** (captions sit at y 1488–1552; platform UI covers below ~1536) or right of **x 960**.
- Captions: dark pill, Inclusive Sans SemiBold 40, words revealed as spoken (`captions()`). **Mute captions** where the big
  on-screen headline says the same words (the guess, the named concept): `captions.py --mute`.

## Motion

- Pops: scale 0 → 116 → 96 → 100 (`pop()`). Anticipation on emphasis: 100 → 92 → 114 → 100 (`pulse()`).
- Motion blur on anything that travels (cards, pointer, the zoom-through, walking tiles).
- Constant slow drift; nothing holds dead still for more than ~1s.
- Review in motion at 12fps (`tools/review.sh`), never on stills alone.

## Sound

Drone bed under the voice (−12dB) plus **4–6 effects on key moments only**. **The logo outro is always silent.**
See `06_sfx/README.md` and `series-plan.md` § Sound rules.
