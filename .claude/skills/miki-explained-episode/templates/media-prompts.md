# EXNN "Title": media prompts

Copy into the episode folder as `how-i-generate.md`, fill in one block per shot, hand it to the user.
Worked example: `miki-explained/04_episodes/EX02V3_doorway/how-i-generate.md`.

Every episode uses **all three ingredients**:

| Ingredient | Use it for | Made by |
|---|---|---|
| **Collage still** | Scenes: places, people, objects in cut paper | User generates → PhotoCraft separates layers |
| **Documentary image** (2–3, required) | Showing the real thing the story is about | User generates → PhotoCraft prints it as a torn ink-and-paper photo |
| **Diagram animation** | Anything abstract: comparisons, numbers, maps, time, typography | Native in EffectCraft, nothing to generate |

Rule of thumb: if the line names a real place or object, use a documentary image; if it explains how something works or
compares two things, use a diagram; collage carries everything else and holds the episode's look.

## Workflow

1. Reference plate first (the object that recurs), then reuse it as an image reference.
2. Key colour frame second (the one segment allowed an extra colour).
3. Every other collage frame, same seed or style reference.
4. Cut-out sheet: every figure, pose or prop that moves on its own.
5. Documentary images.
6. Save to `media/` as `<shot>.png`, extra poses `<shot>1.png`, photos `M1.png`… No `|` or spaces.

## Rules

- Vertical 9:16, always.
- No text in any image. Blank labels, flags, screens; empty paper or sky where a headline goes.
- Lights and glows off (added natively when they turn on).
- Anything that moves needs its own picture: both poses of a swap, a walker, one icon to duplicate.
- Figures in front of simple backgrounds.
- Check named details in documentary images against the facts; say them explicitly or plan to crop.

## Style lock (paste before every collage prompt)

```
Editorial mixed-media collage in the style of Vox and Fern explainer films. Layered cut-paper construction with visible physical depth, torn paper edges, halftone-printed photo cutouts, risograph grain, slight ink misregistration. Warm off-white paper texture (#EFE8DC), ink black (#111111), single muted ochre accent (#C98A2B). Hard directional light, soft paper shadows. Poster-like composition, generous negative space, one hero element. No text, no letters, no numbers, blank labels. Vertical 9:16, ultra detailed.
```

**Negative:**
```
text, letters, words, numbers, typography, logos, signage, watermark, 3D render, glossy, gradients, rounded UI cards, stock icons, clipart, flat vector, cartoon faces, emoji, lens flare, drop-shadowed text boxes, color (except where specified)
```

**Colour rule:** ink, paper and ochre. Extra colour: _[colour family]_ in Segment _[n]_ only.

## Documentary lock (paste before every documentary prompt)

```
Documentary photo, candid, natural available light, muted colours, 35mm film grain, shallow depth of field, real place, real people seen from behind or in profile, no identifiable faces, no logos, no readable text or signage, vertical 9:16.
```

---

## Reference plate: _name_
```
_prompt_
```

## Segment _n_: _name_

**_1A. Name_** · collage | documentary **M_n_** | diagram
Voice: "_the words this shot covers_"
Move: _one line: what moves, on which word_
```
_prompt (collage: style lock first; documentary: documentary lock first; diagram: "native, nothing to generate" + what it draws)_
```

---

## Cut-out sheet
```
[style lock] Character sheet on plain warm paper, one figure only, centred, full body, no shadow on the ground: _figure, pose, angle_.
```

## Documentary images
- **M1** (_shot_): _prompt_
- **M2** (_shot_): _prompt_
- **M3** (_shot_): _prompt_
