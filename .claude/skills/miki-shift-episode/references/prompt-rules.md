# Prompt rules

The rules that made EP04 work, per tool. Each has a reason; when a situation isn't covered, reason
from the "why".

## Seedream / Dreamina image (assets, storyboard)

- **Style sentence — only in asset prompts and the storyboard:**
  `Flat 2D adult animated sitcom style like Bob's Burgers: clean uniform black outlines, flat cel colours with almost no shading, simple white circle eyes with small black dot pupils, warm muted palette.`
  Why: the asset images then carry the style; repeating it later only adds noise.
- **No reference image when creating a character.** Seedream copies the face of any person attached
  "for style" (EP01: the customer came out as a Miki clone).
- **One image per request** (image count 1). Asking for several frames in one prompt returns a single
  collage.
- Ratio 9:16 is set in the tool, not written in the prompt.
- Edits: `Change <target> to <result>. Keep everything else unchanged.` One change per edit. Fixing a
  near-miss by edit beats re-rolling — drift compounds, edits don't.
- No negative-prompt field exists; don't write "NOT anime, NOT 3D" lists.

## Storyboard (Dreamina 9-grid)

Opening line: `A 3×3 storyboard grid of 9 vertical panels for a comedy short, read left to right, top to bottom, separated by thin white gutters, with no captions, numbers or speech bubbles.` + style
sentence + one line naming each asset by alias + `They look nothing alike.` when two characters could
blend + one line per panel.

## Seedance segments

Every segment prompt has this shape, nothing more:

```text
No speech, no voices, no music.
A <N>-second vertical 9:16 1080p animated clip, set at @<Place>, with @<A> and @<B>.
Camera: every shot is locked off — no zoom, pan, tilt, orbit or shake. Shots are joined by hard cuts.
Talking means simple flat sitcom mouth shapes opening and closing, with no sound; outside those times mouths stay closed.
No subtitles, captions, on-screen text, logos or extra people.
Never changes: <prop A is X, never Y>. <Who is on which side of the counter>.
Shot <n> (0:00–0:0x) — <framing>: <action>. <@A talks from 0:0x.x to 0:0x.x.>
Shot <n+1> (…) — hard cut to <new angle>: …
```

- **Aliases only.** No style sentence, no character descriptions — the asset carries them.
- **Sound effects are welcome** (Seedance adds good ones unprompted). Only speech and music are banned.
- **Talking windows**, never quoted dialogue — quoting a line makes Seedance speak it (in Mandarin).
- **Every shot a new angle.** Hard cut between shots; first shot of a segment differs from the last
  shot of the previous one.
- **"Never changes:" line** for anything that drifted or could drift — object material/shape and
  which side of the counter each person is on. EP04 S4: the ceramic latte cup turned into a glass and
  the customer appeared behind the counter until these were pinned.
- **State after change:** once something moves (latte set down, phone unplugged, person leaves), every
  later shot says where it is now. EP01: the phone reappeared on its stand in the last shot.
- Phones: say the screen state (lit with stock notifications / asleep and dark). Notification text
  goes in quotes and must be stock iOS design.
- Budget about 2–3s per spoken line; a segment is 6–10s.

## ElevenLabs Eleven v4 — voice

- Tags in square brackets describe **the voice**: `[softly, tenderly]`, `[low, solemn voice]`,
  `[flustered, rushed]`. Never actions or visuals (`[nods]`, `[grinning]`).
- No SSML `<break>`; pauses come from `...` and `--`. CAPITALS for emphasis.
- Never change the script's words to steer delivery — change the tag.
- Dialogue mode format: `Speaker 1: [emotion] "Line."` — use it for short reactive lines.
- Each speaking character gets a Voice Design prompt in `00_bible/voice-cast.md`; record the voice ID.

## ElevenLabs Sound Effects — only for what Seedance can't do

Name the source, the surface and the distance; sequences as "X, then Y"; end with "No music".
Prompt influence High; loop only for beds; WAV 48 kHz. Save to `miki-shift/06_sfx/` and list there.
