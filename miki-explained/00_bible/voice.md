# Voice (ElevenLabs)

- **Direction:** calm, low, unhurried. A documentary narrator, not an ad read.
- **Language:** English only.
- **Word budget:** varies by episode — length is a tested variable (`03_ideas/experiments.md` § 8). The script formula
  (`00_bible/script-formula.md`) natively runs 120–170 words / 45–60s; compress or extend per test. One idea per video.
- **Render line by line** (L01–L06) so pauses can be retimed in the edit (`tools/vo_tighten.py`). The silence before the reveal is
  what makes it land.
- Lock one voice and never change it; the voice is half the series identity.

## Locked voice

- **Name:** Nathan, narrator
- **ElevenLabs voice ID:** `v4k7NzxipnuJNJtrKxob`
- Locked 2026-10-28 (EX02V3 "The Doorway"). Every episode uses this voice; record any settings changes here.
- Earlier: Paige (`NDTYOmYEjbDIVCKB35i3`), EX00–EX02V2. Retired.

## Eleven v4 prompting (from 2026-11-07, ElevenLabs best practices — user: "we don't practice this")

Source: elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices#prompting-eleven-v4. Every episode's
`how-i-generate.md` carries a **v4 text** column: the exact text to paste, separate from the script's display text.

- **Normalise everything spoken:** numbers, money, dates, units and abbreviations as words. "$1.75 billion" → "one
  point seven five billion dollars"; "RM500" → "five hundred ringgit"; "11.11" → "eleven eleven"; "2025" → "twenty
  twenty-five"; "10%" → "ten percent"; "Mr DIY" → "Mister D I Y". (EX27 L02 "11.11," came back as "… comma".)
- **Pacing by punctuation, not SSML:** v4 has no break tags. "…" adds a pause and weight before a reveal; full stops
  for beats; no commas next to dates or numbers that could be read aloud.
- **Emphasis by CAPITALS**, one word per line at most ("costs MORE than the normal price").
- **Audio tags** in square brackets, auditory only, one per line at most, tested on Nathan first: `[matter-of-fact]`,
  `[curious]`, `[amused]`, `[lowers voice]`, `[sighs]`. Never visual actions (`[smiling]`, `[pacing]`), never music.
  A tag must not fight the line's meaning.
- Captions still show the script's display text (digits, RM, %); only the voice text is normalised.
