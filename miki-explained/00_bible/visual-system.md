# Visual system

## North point (V2, 2026-10-28): **nothing appears from nowhere**

Every frame is born from the one before it. The next scene grows out of a shape, position, colour or object already on
screen, carried by motion (a morph, a shape match, the camera travelling), never by a cut or an effect. One subject at a
time, in plenty of space. This is what all 32 references share (`01_references/v2-style-study.md` § North point).

### How to apply it
1. **Choose the thread first.** Before the visuals, decide the one hero element the episode carries (a sticker, a dot,
   a line, a chair, a coin). Every beat is a new *state* of it.
2. **Bookend.** End on the shape you opened with, changed by what the story taught.
3. **Transitions are motion:** morph (same place, new form), shape match (a circle becomes a different circle), the camera
   travelling or pulling back (EX00V3's field reveal). Cross-fades only *during* a morph. No flash fills, bursts, sparks.
4. **Soft motion:** decelerate into place, no bounce (`pop()` is soft by default; `popBounce()` is a rare exception);
   big moves 0.6–1.2s; moves overlap; the camera never stops drifting.
   **Camera moves ease in and out** (`camMove()`: log-space zoom, a 1.5–2s move with holds either side), and a field around the
   hero sits in depth (`depth()`) so the camera reads as travelling, not zooming a flat page (EX00V4).
5. **One subject, lots of space.** At most ~3 things moving; text small and calm, beside the subject; holds of at least 1s.
6. **2D first.** 3D only where a beat truly needs depth; humans only Fern-style (generated stills in space).
7. **Velocity comes from travel and the camera**, not from effects.

Kit: `soft`, `enter`, `leave`, `glide`, `calmReveal`, `camera`, `camMove`, `depth` (blocks.jsx); proven in `04_episodes/EX00V3_flow-test`
and `04_episodes/EX00V4_camera-test`.

---

## V1 system (EX01–EX03), still valid for colour, type, captions, safe zones and sound

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
