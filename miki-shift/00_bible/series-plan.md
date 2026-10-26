# MIKI'S SHIFT — Series plan

**Format:** 9:16 · 15–30s · full animation (Seedance) · character dialogue only (no narrator) · English · new cast + location per episode · end card in post

> **The production method lives in the `miki-shift-episode` skill** (`../../.claude/skills/miki-shift-episode/`).
> This file keeps the series-level rules: joke method (§1), share/save mechanics (§4), checklist (§5).
> §2–3 describe the original stills pipeline — kept as a fallback and reference only; where they
> disagree with the skill, the skill wins.

**Goal:** daily post · optimise for **share, save, repost**
**Character + style:** `miki.md` (source of truth for this project)
**Voice:** `voice-cast.md` · **Overlays / subtitles:** `overlays.md` · **Schedule:** `../05_calendar/calendar.md`

---

## 1. Joke method

One skit = one knife. Write the **button first**, then the script, then a cold-read test:

1. Did you snort before the end?
2. Could a stranger get it with no source video?
3. Is every line in English?
4. If you remove the last line/image, does the short die? (good)

A script that fails its cold-read never reaches frames. Pitch and judge ideas in `../03_ideas/backlog.md`.

---

## 2. Still-frame grammar (fallback — stills pipeline)

| Rule | Detail |
|------|--------|
| **New image every 1.2–2.5s** | Never hold one still >3s unless it's the button hold. |
| **Expression swap = fake animation** | Generate a base frame, then *edit* it: "same image, change only Miki's face to E2". Same framing + new face reads as motion. Cheapest beat we have. |
| **Every frame moves in edit** | Slow push-in 100→108% over the frame, or slow pan 3–5% of width. Punch / button frames: faster push (100→115%). Never static, never shaky. |
| **Cut on the line** | A new frame lands on the first syllable of a new speaker, not mid-sentence. |
| **Hook frame reads muted in <1.5s** | First frame carries the premise visually (notification, prop, posture). No title card. |
| **Loop frame** | Last frame matches the first frame's angle where possible → TikTok loop feels seamless → rewatch. |
| **UI text is overlay, not pixels** | Phones are generated with a **blank dark screen**. Notifications are **stock lock-screen UI** screen-replaced onto the phone in the edit (`overlays.md`) — never custom cards. AI text garbles and can't animate in. |

### Shot vocabulary (keep to these)

`MS` counter medium · `MCU` Miki chest-up · `OTS` over customer's shoulder at Miki · `REV` reverse on customer · `INS` hands/prop insert · `WIDE` empty-counter button

---

## 3. Image generation — prompt rules (fallback — stills pipeline; current rules in the skill)

Source: BytePlus *Seedream 4.0–4.5 prompt guide*. What it says, and how we apply it:

| Guide says | We do |
|------------|-------|
| Concise, precise natural language beats stacked descriptors | One short paragraph per frame: **shot + subject + action + expression + key prop**. No keyword lists, no repeated style block. |
| Use **reference images** or precise style keywords | **Reference images carry identity only** (who someone is, what a place looks like). The art style is always written as the STYLE line below — never "the style of Image N" from a character image. Seedream copies the face of any person it's given: using Miki as a style ref turned CUST_A into a Miki clone. |
| Multi-image: state **what to take from each image** ("the character from Image 1… the style of Image 3") | Every prompt names images by number and gives each one job. Attach in the listed order. |
| Editing: concise instruction, name the target, **say what stays unchanged** | `Change <target> to <result>. Keep everything else unchanged.` |
| State purpose / type of image | Each base prompt opens with the STYLE line, then the shot type ("Medium close-up…"). |
| Text that must appear goes in "double quotes" | We avoid in-image text entirely — UI is overlaid in edit (`overlays.md`). |
| Series output: "a series" / "a set" / "N images" keeps characters consistent | Tested in EP01: a multi-frame prompt returns one collage, not separate frames. So we use that on purpose: **storyboard first** (Dreamina 9-grid, one image, all key shots), then **finals one per request**, each attaching its storyboard panel for framing plus the identity images. |

No negative-prompt field exists — don't write "NOT anime, NOT 3D…" lists. If a frame drifts,
**edit the closest good frame** with one instruction instead of re-rolling.

Aspect ratio **9:16** is set in the tool's ratio selector, not in the prompt.

### Per-episode image workflow

1. **Storyboard** — one Dreamina 9-grid prompt with all identity images attached (Miki, cast, location).
   Pick the 9 most distinct shots; expression-swap edits and reused frames don't need a panel.
   Review it with the sound off: does the story read? Is the loop (first/last angle) there?
2. **Split** — `tools/split_grid.sh 04_episodes/<EP>/stills/storyboard.png` → `sb_01.png … sb_09.png`.
3. **Finals** — one request per frame (image count 1): attach identity images + its `sb_NN` panel
   ("in the framing and setting of the storyboard panel in Image N"). Panels set layout only — they're
   too small to use as finals.
4. **Edits** — expression/pose swaps are one-line edits of a finished final.

### STYLE line (starts every base prompt — the only repeated text)

```text
Flat 2D adult animated sitcom style like Bob's Burgers: clean uniform black outlines, flat cel colours with almost no shading, simple white circle eyes with small black dot pupils, warm muted palette.
```

### Keeping characters apart

- Call Miki by name in every prompt: "Miki, the barista from Image 1". Name others by role: "the customer from Image 3".
- Attach Miki's image **only** when Miki is in frame. Inserts (hands, phones) and other-character shots don't get it.
- Every new character is designed to be the **opposite of Miki's silhouette** (Miki = long black hair, freckles, pink nose, slim). Give them a different hair shape plus one strong accessory (glasses, cap, beard…), and repeat their two most distinctive features in any prompt where they share the frame with Miki.

### Reference images

| Short name | File | Job in the prompt |
|------------|------|-------------------|
| MIKI | `00_bible/miki_ref_clean.png` | "Miki, the barista from Image N" — only when he's in frame |
| LOCATION | `04_episodes/<EP>/assets/<name>.png` | "the cafe counter from Image N" |
| CHARACTER | `04_episodes/<EP>/assets/<name>.png` | "the customer from Image N" |
| previous frame | `stills/FNN.png` | the image being edited (always Image 1 in an edit) |

`miki_ref_clean.png` is the main panel cropped from `miki_cast_lock.png` — no labels or expression
row, so sheet layout and text don't leak into frames. Use the full sheet only to check expressions.

### Base frame template

```text
<STYLE line> <Shot type> of Miki, the barista from Image 1, behind the counter from Image 2, <action>.
<Expression in plain words>. <Key prop + where it sits>. <Phone screen blank and dark, if in frame>.
```

### Edit template

```text
Change the man's <expression / pose / prop> to <result>. Keep everything else unchanged.
```

### Seedream vs GPT image

| | Seedream (default) | GPT image (occasional) |
|---|---|---|
| Best for | base frames with 2–3 reference images | edits, fixing hands/props in one frame |
| Prompts | as above | same prompts work — keep the Image 1/2/3 wording |

**Every episode has its own characters and location.** Their prompts live in that episode's `0_assets.md`;
the images go in its `assets/` folder. Generate them from the STYLE line with **no reference image**.

### Motion clips (optional)

2–4 short Seedance image-to-video clips per episode, only where movement pays off (hook, button).
Each starts from an approved still, **locked camera**, character acting only, mouth closed, phone
screen blank. Template and rules: `04_episodes/EP01_stay_strong/2b_motion.md`.

### Expression IDs (from `miki.md`)

E0 deadpan side-eye · E1 eye twitch / scribble pupil · E2 manic service smile, too bright ·
E3 neutral prop focus · E4 soft manic "misaimed care" smile · E5 held smile, micro-crack

---

## 4. Share / save / repost mechanics

| Lever | Built in how |
|-------|--------------|
| **Share** ("this is literally you") | Premises are universal service-job / money / dating pain. No local-only references. |
| **Save** (series) | Recurring characters and places people come back for; add every episode to a TikTok playlist. No series tag on the video. |
| **Repost** (reaction-ready) | Every button is a short quotable line or face ("For me." / "Stay strong."). End on the face, not on a wide. |
| **Rewatch / loop** | Last shot = first shot's angle where possible. Every episode ends on the **end card (added in post)** — keep it short so the loop back to the hook still feels quick. No "follow for more". |
| **Comments** | Pinned comment asks a *personal* question tied to the premise ("worst notification you got mid-shift?"). |
| **Caption** | ≤ 1 line, adds a second joke or a tag-a-friend prompt — never explains the joke. |
| **Hashtags** | 3–5 max: one niche (`#baristalife`), one format (`#animation`), one feeling (`#relatable`), optional `#customerservice` `#workhumor`. |
| **Subtitles** | Burned-in dialogue, speaker by colour (`overlays.md`). Many viewers watch muted. |

Buffer rule: keep **≥ 5 finished episodes** queued before Day 1 posts, so a bad generation day
never breaks the daily streak.

---

## 5. Per-episode checklist (before scheduling)

Full checklists per gate: the skill's `references/review-checklists.md`. Final pass:

- [ ] Hook reads with sound off in the first 1.5s
- [ ] Every character on-model in every shot; characters never blend
- [ ] Props and positions hold (nothing changes material or side)
- [ ] Phone UI is stock iOS, spelled right, readable on a phone
- [ ] Voice lines match mouths; no stray Seedance speech or music
- [ ] Button ends on a face / quotable line
- [ ] Burned-in subtitles
- [ ] End card added after the last shot (post)
- [ ] `5_post.md` filled; calendar row updated
