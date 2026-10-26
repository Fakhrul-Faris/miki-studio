# Voice — ElevenLabs

**Model:** Eleven v4 (`eleven_v4`) — ElevenLabs' most expressive model; supports audio tags.
Fallback: Eleven v3 (same tag style).

## Locked cast

Once picked, never change. Miki's voice is the series' brand as much as his face.

| Role | Voice name | Voice ID | Settings |
|------|-----------|----------|----------|
| MIKI | _TBD after audition_ | | |
| CUST_M | _TBD_ | | |
| JUNO | _TBD after audition_ | | |
| CUST_F (Tess) | _TBD_ | | |

Record the voice ID, not just the name — names can repeat in the library.

## Making the voices — Voice Design

Create each character with **Voice Design** (describe the voice in text, pick from the previews, save
it to My Voices). A designed voice is ours and stays the same; a library voice can change or disappear.
Generate a few previews per prompt and pick by ear with the test lines.

| Role | Voice Design prompt | Test lines |
|------|---------------------|------------|
| **MIKI** | `A young man in his early twenties with a neutral American accent. Soft, slightly low voice with a dry, deadpan delivery; calm and unhurried, quietly tired. Clear, close-mic studio recording.` | `[deadpan] Serious.` · `[softly, tenderly] Don't worry about it... it's on me.` · `[too cheerful] Have a GREAT day!` |
| **CUST_M** (Customer A) | `A man in his late twenties with a neutral American accent. Warm, bright, slightly loud voice; friendly, quick and easily delighted. Clear, close-mic studio recording.` | `[cheerful] Hey! Can I pay here?` · `[surprised] Wait-- seriously?` |
| **JUNO** | `A young woman in her early twenties with a neutral American accent. Low, dry, flat voice; unbothered and minimal, never in a hurry, quietly smug. Clear, close-mic studio recording.` | `[deadpan] Here.` · `[flat, unbothered] For me.` |
| **CUST_F** (Tess) | `A woman in her late twenties with a neutral American accent. Breezy, quick and casual; friendly but distracted. Clear, close-mic studio recording.` | `[flustered, rushed] Sorry, I'm so late.` · `[confused] ...For who?` |

Miki's range is the joke engine: the same voice has to do **flat deadpan** and **wrong-sized warmth**
(too bright, too tender). Pick the preview that can do both test lines, not just the one that sounds nicest.

## How delivery is controlled (ElevenLabs "Prompting Eleven v4" guide, Oct 2026)

| Control | How | Notes |
|---------|-----|-------|
| Emotion / delivery | **Audio tags** `[tag]` placed right before the words they affect, or at a natural pause. Guide examples: `[whispers]` `[sighs]` `[exhales]` `[sarcastic]` `[curious]` `[excited]` `[laughs]` `[mischievously]` | Tags may be combined. **Describe the voice, never an action or a visual:** `[low, solemn voice]` ✓ · `[nods]` `[grinning]` `[standing]` ✗ |
| Pauses | **Ellipses** `...`, dashes, sentence structure | SSML `<break>` is **not** supported in v4 |
| Emphasis | CAPITALS on a word | `Have a GREAT day.` |
| Context | Natural speech, proper punctuation, clear emotional context | Text structure strongly shapes v4 output — a bare one-word line has little to go on (see dialogue mode below) |
| Voice fit | Tags work best inside the voice's natural range | A tag the voice wasn't designed for may come out weak. That's why the Voice Design prompts already include deadpan / warmth |
| Steadiness | Stability setting: lower = more expressive, higher = more consistent | Start in the middle; raise it if a take overacts |

Guide's don'ts: no tags that contradict the line's meaning; never change the script words to steer
delivery; no tags for non-voice things (music, movement); playful tags on a serious voice misfire.
Experimental tags can behave differently per voice — test before relying on one.

**Rule: one line = one file** (`audio/L01.wav` …). 3 takes per line, pick by ear.
If a tag word gets read out loud, move it to the front of the line or reword the tag.

## Writing lines for ElevenLabs

| Want | Write it like |
|------|---------------|
| Deadpan | `[deadpan] Serious.` — short, period, no exclamation |
| Too bright / manic | `[way too cheerful] Don't worry about it! It's ON me!` |
| Too tender | `[softly, tenderly] Don't worry about it... it's on me.` |
| Hesitation | `Oh... here.` / `Wait-- seriously?` |
| Mouth full | `[muffled, mouth full] Salted-egg chicken. To go.` — add a light muffle in edit if it doesn't read |
| Caught off guard | `[caught off guard] ...To go?` |

## Dialogue mode — a whole scene in one pass

Best for short reactive lines ("Serious.") that need the line before them for context, and for natural
back-and-forth timing. Assign the locked voice to each speaker, paste the scene in the guide's format,
then cut the result into L01, L02 … files.

```text
Speaker 1: [emotion] "Line."
Speaker 2: [emotion] "Line."
```

Each episode's `3_voice.md` has its scene ready in this format.

## SFX (non-voice — never ask the voice model for these)

Lives in `../06_sfx/`. Notification sound (stock iOS) · espresso grind + steam hiss · cup on counter ·
rag wipe · chew · fork on plate · door bell · room tone (cafe murmur, very low, under everything).
Reuse the same files every episode — the notification sound becomes a series signature.
