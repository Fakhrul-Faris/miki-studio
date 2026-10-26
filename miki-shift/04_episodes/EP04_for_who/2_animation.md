# EP04 — For Who — Animation (Seedance)

Same method as EP01's `2c_full_animation.md`: **silent** clips (Seedance speech comes out in Mandarin),
timed mouth movement only, ElevenLabs voice and all sound added in the edit. End card added in post.

**Source of truth for the story:** `1_script.md` (v3).

## Split

4 segments, all under 15s. **Every shot is a new camera angle**, so any shot boundary is a clean hard
cut: if something breaks mid-generation, cut there and keep the good shots.

| Seg | Length | Shots | Talking |
|-----|--------|-------|---------|
| **S1** The order | 8s | 1 · wide front, Tess rushes in → 2 · over Juno's shoulder at Tess | L01 |
| **S2** The decoy | 7s | 3 · espresso insert → 4 · latte-art insert, top-down → 5 · Tess watching, from behind the counter | — |
| **S3** The swap | 7s | 6 · side angle, latte set by the machine → 7 · tap insert, glass filling → 8 · two-shot, glass slid to Tess | L02 · L03 |
| **S4** The button | 7s | 9 · low close-up on Tess → 10 · Juno by the machine → 11 · wide two-shot, Juno walks off | L04 · L05 |

≈ 29s raw → trim holds to ~20s in post, then the end card.

**If one shot fails:** regenerate only that shot — same segment prompt with every other shot line
deleted, duration = that shot's length (min. 4s, trim in post).

**Continuity (lesson from EP01, where the phone reappeared on its stand in the last shot):** once an
object moves, every later shot says where it is. Here: from shot 6 on, the latte sits **beside the
machine**; from shot 8 on, the glass of water is **in Tess's hand**.

---

## Step 0 — render the voice first

Render L01–L05 from `3_voice.md`, note each line's length, and adjust the talking windows below so the
mouth stops when the line does. Never quote the dialogue in a Seedance prompt — it invites speech.

| Line | Shot | Talking window (segment time) | Assumed length |
|------|------|-------------------------------|----------------|
| L01 Tess "Oh— hi, sorry, I'm so late… whatever's fastest for you." | 2 | 0:02.3–0:07.3 | 5.0s |
| L02 Juno "Here." | 8 | voice over the slide — Juno's mouth isn't in frame | 0.4s |
| L03 Tess "Thanks so much—" | 8 | 0:05.0–0:05.8 | 0.8s |
| L04 Tess "…For who?" | 9 | 0:01.4–0:02.2 | 0.8s |
| L05 Juno "For me." | 10 | 0:02.9–0:03.5 | 0.6s |

---

## Assets

Create once in Seedance from the reference images, then mention by alias. The asset carries identity,
look and art style — prompts don't re-describe them.

| Alias | Image | Prompt to generate it |
|-------|-------|-----------------------|
| `@Juno` | `assets/juno.png` | `0_assets.md` |
| `@Tess` | `assets/tess.png` | `0_assets.md` |
| `@Bar` | `assets/bar.png` | `0_assets.md` |

Turn audio generation **off** if the tool has a switch.

---

## Storyboard — Dreamina 9-grid (before any video)

Check the whole episode in one image before spending video generations: staging, who is where, the
latte vs water readability, and that Juno and Tess never look alike. Regenerate the grid until it reads.

**Generate in Dreamina's image generator (Seedream), 9-grid, ratio 9:16.** Attach in this order:
Image 1 = `assets/juno.png` · Image 2 = `assets/tess.png` · Image 3 = `assets/bar.png`

| | col 1 | col 2 | col 3 |
|---|---|---|---|
| **row 1** | P1 → shot 2, the order | P2 → shot 4, latte art | P3 → shot 5, Tess smiles |
| **row 2** | P4 → shot 6, latte by the machine | P5 → shot 7, tap fills glass | P6 → shot 8, water slid to Tess |
| **row 3** | P7 → shot 9, "…For who?" | P8 → shot 10, "For me." + sip | P9 → shot 11, Juno walks off |

Shots 1 and 3 (Tess rushing in, the espresso pull) are left out — they're simple and don't risk the joke.

```text
A 3×3 storyboard grid of 9 vertical panels for a comedy short, read left to right, top to bottom, separated by thin white gutters, with no captions, numbers or speech bubbles. Flat 2D adult animated sitcom style like Bob's Burgers: clean uniform black outlines, flat cel colours with almost no shading, simple white circle eyes with small black dot pupils, warm muted palette.
Characters: Juno, the barista from Image 1 — tall, short bleached-blonde pixie cut, black T-shirt, denim apron. Tess, the customer from Image 2 — shorter, long wavy dark-brown hair in a claw clip, camel trench coat, tote bag. They look nothing alike.
Setting: the specialty coffee bar from Image 3. The espresso machine and the water tap are behind the counter on Juno's side.
Panel 1: over Juno's shoulder at the counter; Tess, flustered, phone in hand, talks to her.
Panel 2: top-down close-up of a white ceramic cup as steamed milk forms a latte-art heart.
Panel 3: medium close-up of Tess from behind the counter, watching hopefully with a soft smile.
Panel 4: side view along the counter; Juno sets the finished latte down beside the espresso machine on her own side.
Panel 5: close-up of a plain clear drinking glass filling with water under the tap.
Panel 6: side two-shot across the counter; Juno slides the glass of water to Tess, who takes it while looking at her phone; the latte stays beside the machine behind Juno.
Panel 7: low close-up of Tess holding the glass of plain water, looking up past it, confused.
Panel 8: medium close-up of Juno beside the machine, sipping the latte, completely unbothered, not looking at Tess.
Panel 9: wide front shot; Juno walks off to the left with the latte while Tess stands frozen at the counter holding the water.
```

**Review before video:**
- Do Juno and Tess look clearly different in every panel?
- Is the latte (ceramic cup, latte art) obviously nicer than the water (plain clear glass)?
- Does the latte stay by the machine from P4 to P8, and the water stay with Tess from P6 on?
- Does P3 read as "she thinks it's hers"?

**Split it** (optional, to attach a panel to a segment as a framing reference):
save the grid as `stills/storyboard.png`, then run `../../tools/split_grid.sh stills/storyboard.png` → `stills/sb_01.png … sb_09.png`.

---

## S1 — The order · 8s
```text
Silent clip: no audio at all — no voices, no speech, no music, no sound effects.
An 8-second vertical 9:16 1080p animated clip, set at @Bar, with @Juno and @Tess.
Camera: every shot is locked off — no zoom, pan, tilt, orbit or shake. Shots are joined by hard cuts.
Talking means simple flat sitcom mouth shapes opening and closing, with no sound; outside those times mouths stay closed.
No subtitles, captions, on-screen text, logos or extra people.
Shot 1 (0:00–0:02) — wide front shot of the counter. @Juno stands behind it, still and bored. @Tess hurries in from the right to the counter, phone in one hand, coat half on, tote bag slipping off her shoulder.
Shot 2 (0:02–0:08) — hard cut to an over-the-shoulder shot from behind @Juno: the back of her head and shoulder in the left foreground, @Tess across the counter, flustered, glancing between her phone and @Juno. @Tess talks quickly from 0:02.3 to 0:07.3. At 0:07.6 @Juno gives one small nod.
```

## S2 — The decoy · 7s
```text
Silent clip: no audio at all — no voices, no speech, no music, no sound effects.
A 7-second vertical 9:16 1080p animated clip, set at @Bar, with @Juno and @Tess.
Camera: every shot is locked off — no zoom, pan, tilt, orbit or shake. Shots are joined by hard cuts.
Nobody talks in this clip; mouths stay closed. No subtitles, captions, on-screen text, logos or extra people.
Shot 3 (0:00–0:02) — close insert at the espresso machine: @Juno's hands lock the portafilter in, and a thin stream of espresso pours into a white ceramic cup.
Shot 4 (0:02–0:04.5) — hard cut to a top-down close-up of the cup: steamed milk pours from a steel pitcher and forms a neat latte-art heart.
Shot 5 (0:04.5–0:07) — hard cut to a medium close-up of @Tess from behind the counter: she watches the latte being made, her face softens into a hopeful smile and her shoulders relax, then she glances back down at her phone.
```

## S3 — The swap · 7s
```text
Silent clip: no audio at all — no voices, no speech, no music, no sound effects.
A 7-second vertical 9:16 1080p animated clip, set at @Bar, with @Juno and @Tess.
Camera: every shot is locked off — no zoom, pan, tilt, orbit or shake. Shots are joined by hard cuts.
Talking means simple flat sitcom mouth shapes opening and closing, with no sound; outside those times mouths stay closed.
No subtitles, captions, on-screen text, logos or extra people.
Shot 6 (0:00–0:02) — side angle along the counter: @Juno sets the finished latte, with its latte-art heart, down beside the espresso machine on her own side of the counter, away from the customer, and turns to the water tap.
Shot 7 (0:02–0:04) — hard cut to a close insert at the tap: a plain clear drinking glass fills with tap water. Nothing else is added.
Shot 8 (0:04–0:07) — hard cut to a two-shot across the counter from the side: @Juno slides the glass of water across to @Tess; the latte stays beside the machine behind @Juno. @Tess takes the glass without looking, eyes still on her phone, and talks briefly from 0:05.0 to 0:05.8. @Juno does not talk.
```

## S4 — The button · 7s
```text
Silent clip: no audio at all — no voices, no speech, no music, no sound effects.
A 7-second vertical 9:16 1080p animated clip, set at @Bar, with @Juno and @Tess.
Camera: every shot is locked off — no zoom, pan, tilt, orbit or shake. Shots are joined by hard cuts.
Talking means simple flat sitcom mouth shapes opening and closing, with no sound; outside those times mouths stay closed.
No subtitles, captions, on-screen text, logos or extra people. The latte stays beside the espresso machine until @Juno picks it up; the glass of water stays in @Tess's hand.
Never changes: the latte is a white ceramic cup with a handle — never a glass. The water is a clear glass. @Juno is behind the counter; @Tess is always in front of it, on the customer side.
Shot 9 (0:00–0:02.5) — low close-up on @Tess, in front of the counter, holding the glass of plain water: she looks down at it, then slowly up past the camera toward the latte, confused. She talks from 0:01.4 to 0:02.2.
Shot 10 (0:02.5–0:04.5) — hard cut to a medium close-up of @Juno beside the espresso machine: she picks up the white latte cup without looking at @Tess, talks briefly from 0:02.9 to 0:03.5, then takes a slow sip, completely unbothered.
Shot 11 (0:04.5–0:07) — hard cut to a wide front shot of the counter: @Juno, behind the counter, walks off to the left sipping from the white latte cup; @Tess stands frozen in front of the counter holding the glass of water. Hold.
```

---

## Assembly

1. S1 → S4, hard cuts. Trim holds to ~20s; replace any broken shot with a regenerated one.
2. **Voice:** L01–L05 from `audio/` on their talking windows; slip a few frames until mouths match.
   L02 "Here." plays over the slide in shot 8.
3. **Sound:** `3b_sound.md` (Anim time column).
4. Subtitles: `../../00_bible/overlays.md`.
5. **End card** after shot 11 (post).
6. Export to `export/EP04_for_who.mp4`.
