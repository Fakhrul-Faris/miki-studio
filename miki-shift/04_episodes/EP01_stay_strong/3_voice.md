# EP01 — Stay Strong — Voice (ElevenLabs)

**Model:** Eleven v4 · **Voices:** `<MIKI>` / `<CUST_M>` = the locked voices in `../../00_bible/voice-cast.md`
**Rule:** one line = one generation = one file → `audio/L01.wav` …

The **text** column is what you paste — audio tags in `[brackets]` steer delivery and aren't spoken.
The **caption** column is what's burned-in on screen.

## Lines

| ID | Who | Voice | Text (paste this) | Caption (on screen) | Delivery intent |
|----|-----|-------|-------------------|---------------------|-----------------|
| L01 | CUSTOMER | `<CUST_M>` | `[cheerful] Hey! Can I pay here?` | Hey—can I pay here? | Cheerful, good mood, cake in his system. Clueless. |
| L02 | MIKI | `<MIKI>` | `[softly, tenderly] Don't worry about it... it's on me.` | Don't worry about it. It's on me. | **Too tender.** Slow, careful. No exclamation. |
| L03 | CUSTOMER | `<CUST_M>` | `[surprised and delighted] Wait-- seriously?` | Wait—serious? | Delighted surprise |
| L04 | MIKI | `<MIKI>` | `[low, solemn voice] Serious.` | Serious. | Grave. One word. The nod is in the picture. |
| L05 | CUSTOMER | `<CUST_M>` | `[gushing] Oh my god, thank you! [casually] Oh, also-- my phone? It was charging.` | Oh my god, thank you. / Also—my phone? It was charging. | Gushing → remembers, breezy |
| L06 | MIKI | `<MIKI>` | `[softly] Oh... here. ... [sincerely] Stay strong.` | Oh—here. / Stay strong. | Soft and sincere. He means every word. |

Total spoken ≈ 10–11s inside a ~23s cut — the rest is notifications, faces, and holds. That ratio is intended.

### Notes per line

- **The contrast is the engine:** customer bright and quick (exclamations, upbeat tags), Miki slow and
  soft (periods and ellipses only). If both sound the same, the joke flattens — push the tags further apart.
- **L02** — no exclamation marks in Miki's lines; they pull the delivery upbeat.
- **L03** — script says "Wait—serious?"; "seriously" is more natural spoken, and L04's "Serious."
  echoes it harder. Caption keeps the script wording.
- **L04** — a one-word line gives v4 almost no context, so it can come out flat or rising. Take it from
  the dialogue-mode render below, where it follows L03.
- **L06** — the button. Pick the take where "Stay strong" sounds like real sympathy. Any irony or wink
  in the voice kills it — the irony belongs to the audience.
- The customer's exit has **no line** — a wordless half-wave in the picture is enough.
- Never voice the notifications. They're silent text on the lock screen; only the notification sound plays.

## Dialogue mode — whole scene (recommended for L03–L05)

Speaker 1 = `<CUST_M>` · Speaker 2 = `<MIKI>`. Render, then cut into L01–L06 and keep whichever
version of each line (line-by-line or scene) sounds better.

```text
Speaker 1: [cheerful] "Hey! Can I pay here?"
Speaker 2: [softly, tenderly] "Don't worry about it... it's on me."
Speaker 1: [surprised and delighted] "Wait-- seriously?"
Speaker 2: [low, solemn voice] "Serious."
Speaker 1: [gushing] "Oh my god, thank you!" [casually] "Oh, also-- my phone? It was charging."
Speaker 2: [softly] "Oh... here." [sincerely] "Stay strong."
```

## Takes to render

3 takes per line; pick by ear. If a line misses after 3, change the tag, not the words.

| Line | Alternate tags to try |
|------|----------------------|
| L01 | `[bright, upbeat]` |
| L02 | `[gently]` · `[quiet, careful voice]` |
| L03 | `[delighted]` |
| L04 | `[gravely]` · `[quietly]` — or take it from the dialogue render |
| L05 | `[excited]` → `[casually]` |
| L06 | `[gently]` … `[warmly]` · drop the second tag |

Sound effects and the mix: `3b_sound.md`.
