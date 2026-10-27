# Sound library (miki-explained)

`tools/sfxmix.py` uses `06_sfx/<name>.wav` first and falls back to `06_sfx/synth/<name>.wav` (ffmpeg-synthesised
placeholders from EX01). Generate the set below **once** in ElevenLabs Sound Effects and save each as `<name>.wav` here;
every future episode picks them up automatically.

Rules: 4–6 effects per episode, key moments only. **No sound on the Meikigo logo outro, ever.**

| File | Use | ElevenLabs prompt | Length |
|---|---|---|---|
| `pop.wav` | a tile or chip appears (one per beat at most) | Soft, clean UI pop, like a small rubber bubble, warm and quiet, no reverb | 0.3s |
| `whoosh.wav` | a card swap or a customer walking out | Short soft air whoosh, cloth-like, gentle, left to right, no hiss | 0.6s |
| `whoosh_long.wav` | the zoom-through into brown | Deep, slow, rising whoosh that swells and stops, cinematic but soft, no impact | 1.2s |
| `swipe.wav` | highlighter or strike-through | A felt-tip marker swiped quickly across paper, one stroke | 0.4s |
| `paper.wav` | a framed photo print lands | A single photo print placed down on a wooden table, soft paper tap | 0.5s |
| `tick.wav` | a counter changing (use sparingly) | One quiet mechanical tick, like a small clock, dry | 0.1s |
| `bed.wav` | the drone bed under the whole episode | Warm, low, slowly evolving ambient pad, documentary, no melody, no drums, seamless | 60s |

`synth/` holds the placeholders: pop, pop_big, tick, whoosh, whoosh_long, swipe, ding, drone.
