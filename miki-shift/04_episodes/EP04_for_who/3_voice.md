# EP04 — For Who — Voice (ElevenLabs)

**Model:** Eleven v4 · **Voices:** `<JUNO>` / `<CUST_F>` (Tess) = the locked voices in `../../00_bible/voice-cast.md`
**Rule:** one line = one generation = one file → `audio/L01.wav` …

The **text** column is what you paste — audio tags in `[brackets]` describe the voice and aren't spoken.
The **caption** column is what's burned-in on screen.

## Lines

| ID | Who | Voice | Text (paste this) | Caption (on screen) | Delivery intent |
|----|-----|-------|-------------------|---------------------|-----------------|
| L01 | TESS | `<CUST_F>` | `[flustered, rushed] Oh-- hi, sorry, I'm SO late. Can I just get whatever's easiest? Honestly... whatever's fastest for you.` | Oh— hi, sorry, I'm so late. Can I just get whatever's easiest? Honestly, whatever's fastest for you. | Breathless, apologetic, half on her phone. "for you" lands clearly — it's the setup for the button. |
| L02 | JUNO | `<JUNO>` | `[deadpan] Here.` | Here. | Flat. Zero ceremony. |
| L03 | TESS | `<CUST_F>` | `[distracted, warm] Thanks so much--` | Thanks so much— | Autopilot gratitude, cut off by her own realisation |
| L04 | TESS | `<CUST_F>` | `[confused, quiet] ...For who?` | …For who? | Genuinely asking. Not angry — yet. |
| L05 | JUNO | `<JUNO>` | `[flat, unbothered] For me.` | For me. | No smugness in the voice, no pause before it. The calm is the joke. |

Total spoken ≈ 8s inside a ~20s cut — the decoy is silent and carries the middle.

### Notes per line

- **L01** — the only long line, and it carries the pun. If "for you" gets swallowed, try
  `...whatever's fastest for YOU.` — but don't change the words.
- **L02 / L05** — Juno never raises her voice or adds an exclamation mark. Keep her lines short and level.
- **L04 → L05** — no gap. "For me." answers instantly; take both from the dialogue-mode render if the
  line-by-line versions feel disconnected.
- One-word and two-word lines (L02, L04, L05) have little context on their own — the dialogue render
  below usually gives better versions.

## Dialogue mode — whole scene (recommended)

Speaker 1 = `<CUST_F>` (Tess) · Speaker 2 = `<JUNO>`. Render, cut into L01–L05, keep the better version of each line.

```text
Speaker 1: [flustered, rushed] "Oh-- hi, sorry, I'm SO late. Can I just get whatever's easiest? Honestly... whatever's fastest for you."
Speaker 2: [deadpan] "Here."
Speaker 1: [distracted, warm] "Thanks so much--"
Speaker 1: [confused, quiet] "...For who?"
Speaker 2: [flat, unbothered] "For me."
```

## Takes to render

3 takes per line; pick by ear. If a line misses after 3, change the tag, not the words.

| Line | Alternate tags to try |
|------|----------------------|
| L01 | `[apologetic, out of breath]` |
| L02 | `[bored]` |
| L03 | `[absent-minded]` |
| L04 | `[puzzled]` · `[slowly]` |
| L05 | `[deadpan]` · `[calm, matter-of-fact]` |

Sound effects and the mix: `3b_sound.md`.
