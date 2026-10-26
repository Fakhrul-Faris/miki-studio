# EPNN — <Title> — Animation (Seedance)

Seedance clips: **no speech** (it speaks Mandarin) — timed mouth movement only; Seedance's own sound
effects are kept as the sound bed. Voice (ElevenLabs) and mix go on in the edit. End card in post.

## Split

| Seg | Length | Shots (each a new angle) | Talking |
|-----|--------|--------------------------|---------|
| **S1** <name> | <6–10>s | 1 · <angle> → 2 · <angle> | <L01> |
| **S2** … | | | |
| **S3** … | | | |
| **S4** … | | | |

**If one shot fails:** regenerate only that shot — same segment prompt with the other shot lines
deleted, ≥4s, trim in post.

**Continuity:** <object> is <where> from shot <n>; <person> holds <thing> from shot <m>.

---

## Step 0 — render the voice first
Render the lines in `3_voice.md`, then set each talking window to the real line length.

| Line | Shot | Talking window (segment time) | Assumed length |
|------|------|-------------------------------|----------------|
| L01 | | | |

---

## Storyboard — Dreamina 9-grid (before any video)

Seedream, 9-grid, 9:16. Mention @<Name>, @<Name2>, @<Place>.

| | col 1 | col 2 | col 3 |
|---|---|---|---|
| **row 1** | P1 → shot | P2 → shot | P3 → shot |
| **row 2** | P4 → shot | P5 → shot | P6 → shot |
| **row 3** | P7 → shot | P8 → shot | P9 → shot |

```text
A 3×3 storyboard grid of 9 vertical panels for a comedy short, read left to right, top to bottom, separated by thin white gutters, with no captions, numbers or speech bubbles. Flat 2D adult animated sitcom style like Bob's Burgers: clean uniform black outlines, flat cel colours with almost no shading, simple white circle eyes with small black dot pupils, warm muted palette.
@<Name> is <role>; @<Name2> is <role>. They look nothing alike. Setting: @<Place>.
Panel 1: …
…
Panel 9: …
```

**Review before video:** `references/review-checklists.md` → Storyboard.

---

## S1 — <name> · <N>s
```text
No speech, no voices, no music.
A <N>-second vertical 9:16 1080p animated clip, set at @<Place>, with @<Name> and @<Name2>.
Camera: every shot is locked off — no zoom, pan, tilt, orbit or shake. Shots are joined by hard cuts.
Talking means simple flat sitcom mouth shapes opening and closing, with no sound; outside those times mouths stay closed.
No subtitles, captions, on-screen text, logos or extra people.
Never changes: <prop is X, never Y>. <who is on which side>.
Shot 1 (0:00–0:0x) — <framing>: <action>.
Shot 2 (0:0x–0:0x) — hard cut to <new angle>: <action>. @<Name2> talks from 0:0x.x to 0:0x.x.
```

## S2 … S4 — same shape

---

## Assembly
1. S1 → S4, hard cuts; trim holds; replace any broken shot.
2. Clip audio = sound bed; run remove-vocals on it if any murmur slipped in.
3. Voice lines on their talking windows; slip until mouths match.
4. Extra sounds and mix: `3b_sound.md`.
5. Subtitles (`../../00_bible/overlays.md`), then the **end card**.
6. Export `export/EPNN_<slug>.mp4`.
