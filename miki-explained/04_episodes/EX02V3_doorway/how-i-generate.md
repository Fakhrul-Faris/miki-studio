# THE DOORWAY: how the media was generated (corrected)

The worked example of the Miki Explained house format. The fill-in version for new episodes is
`.claude/skills/miki-explained-episode/templates/media-prompts.md`.

Every episode is built from **three ingredients**:

| Ingredient | What it is | Made by |
|---|---|---|
| **Collage stills** | Cut-paper storyboard frames, one per shot, separated into layers | You (image generator) → PhotoCraft (layers) |
| **Documentary images** | 2–3 real-world photos of the actual thing the story is about | You (image generator) → PhotoCraft (printed into the palette as torn prints) |
| **Diagram animation** | Lines, dots, counters, maps, typography: anything abstract | Native in EffectCraft (nothing to generate) |

Tools: Midjourney, Nano Banana, GPT-Image, Flux or Seedream. Each frame has a one-line **Move** note so the board shows the motion.

## Workflow

1. **Reference plate first** (here: the door). It recurs (1A, 5A, 6C), so lock it and use it as an image reference
   (`--cref` / `--sref` or equivalent) in those frames.
2. **Key colour frame second** (here: 4B, the green light). It anchors the frames that share its composition (4C, 4D).
3. **Then every other frame** at 9:16 with the same seed or style reference.
4. **Cut-out sheet:** every figure, pose or prop that has to move on its own, alone on plain paper.
5. **Documentary images:** 2–3 real-world photos.
6. Save everything to `media/`, named by shot code (`1A.png`, `4C1.png`, `M1.png`). No `|` or spaces in names.

## Rules that save PhotoCraft work (learned on this episode)

- **9:16, always.** The first round came out 16:9 and had to be regenerated.
- **No text in any image.** Every word is built natively so it can be stamped, wiped and timed to the voice.
  Ask for blank labels, blank flags, blank screens, and empty paper or sky where a headline will go.
- **Lights and glows off.** The glow is added natively at the moment it turns on, so generate the lamp dark.
- **Anything that moves needs its own picture:** both poses of a pose swap, a walking figure, one icon to duplicate.
- **Keep figures in front of simple backgrounds.** A plate filled in behind a figure is the roughest part of any shot.

## Style lock (paste before every collage prompt)

```
Editorial mixed-media collage in the style of Vox and Fern explainer films. Layered cut-paper construction with visible physical depth, torn paper edges, halftone-printed photo cutouts, risograph grain, slight ink misregistration. Warm off-white paper texture (#EFE8DC), ink black (#111111), single muted ochre accent (#C98A2B). Hard directional light, soft paper shadows. Poster-like composition, generous negative space, one hero element. No text, no letters, no numbers, blank labels. Vertical 9:16, ultra detailed.
```

**Negative (if the tool supports it):**
```
text, letters, words, numbers, typography, logos, signage, watermark, 3D render, glossy, gradients, rounded UI cards, stock icons, clipart, flat vector, cartoon faces, emoji, lens flare, drop-shadowed text boxes, color (except where specified)
```

**Colour rule:** ink, paper and ochre everywhere. One extra colour family only in the one segment that needs it.
Here: signal green, yellow and red in Segment 4 only.

## Documentary lock (paste before every documentary prompt)

```
Documentary photo, candid, natural available light, muted colours, 35mm film grain, shallow depth of field, real place, real people seen from behind or in profile, no identifiable faces, no logos, no readable text or signage, vertical 9:16.
```

These are recoloured to ink and paper in PhotoCraft, so colour in the photo doesn't matter, with one exception: check every
detail the story names against the facts. EX02's signal came out red / white / **blue**, not green / yellow / red. Say the
detail explicitly in the prompt, or plan to crop it.

---

## Reference plate: The Door

```
Straight-on view of a glass shop door with a plain header above it, built from cut paper in ink line style, centered, symmetrical. A small dark circular hole sits in the center of the header, unexplained and empty. Black background, door lit by hard side light so the paper edges and glass frame cast soft shadows. No color. Clean and architectural, like a technical drawing made from paper.
```

---

## Segment 1: The Hook

**1A. The door** · collage
Move: slow push-in toward the door, WAIT wipes onto the glass on "wait", 1 s hold, push through the glass.
```
Straight-on view of the reference glass shop door in cut-paper ink style. Through the glass, a row of torn-paper silhouettes sit shoulder to shoulder on a bench, dark and anonymous. The door glass is clear and blank, with empty space at eye level. A dark circular hole is centered in the header above, unlit. Mostly black frame, the door lit by hard side light. Moody and quiet. Monochrome only.
```

**1B. The arrow** · collage
Move: the arrow scores itself toward the door; the hole steps on to a faint ochre glow on "in".
```
Low camera angle, floor level, looking toward the glass shop door at the end of a dark paper floor. A thin hand-cut ochre paper arrow runs along the floor from the foreground to the door's threshold and stops exactly at the doorsill. The dark hole in the header is unlit. Deep black surroundings, hard side light, paper grain. Monochrome plus the ochre arrow only.
```

---

## Segment 2: Japan, 1996

**2A. WHY?** · collage
Move: slow parallax push; WHY? stamps three times, each larger.
```
A halftone-printed paper cutout of a man in a dark suit seen from behind, standing small in a layered collage street of early-1990s Tokyo, with paper buildings in three depth layers and signage with blank panels. Wide empty sky in the top third. Warm paper tones, ochre on one building only.
```

**2B. The hour** · documentary image **M2** + typography
Move: the torn photo slides in; OVER and AN HOUR? stamp on the words; an ochre underline draws on "hour".
(Replaced the tape-measure collage in the final cut: a real photo of the old full-service shop says "over an hour" better.)
```
[documentary lock] A traditional Japanese barbershop in the early 1990s, a customer reclined in a barber chair with a hot towel on his face, a barber preparing shaving foam, warm tungsten light, slightly faded film colours.
```

**2D. The shop opens** · collage
Move: walls stand up from a slight fold (about 5°), awning folds down, 1996 stamps, then the camera pushes into the scissors on the table.
```
A small paper architectural model of a barbershop storefront standing on an unfolded paper floor plan on a dark table, walls upright, a blank ochre awning, a pair of scissors lying on the table in the lower left. A blank torn paper card in the top-right corner. Overhead hard light, ink, paper and ochre palette.
```

**2C. The cut** · typography (diagram, native)
Move: JUST THE CUT. word by word, an ink line snaps on "cut", a big 10 stamps on "10" and match-cuts into the stopwatch's 10.
(Replaced the scissors collage in the final cut. Nothing to generate.)

---

## Segment 3: The False Answer

**3A. Speed** · collage
Move: lines slide in, hand spins, SPEED stamps on "speed", short whip left.
```
A large cream paper stopwatch face filling the lower two thirds of the frame, numerals 10 to 60 printed on the dial, a black sweeping hand blurred mid-motion, long horizontal ink speed lines streaking from both sides. Empty paper above the dial. A faint ghost of a small shop on the left edge. High contrast, ink and paper only.
```

**3B. Struck out** · collage
Move: an ink strike crosses SPEED, the strip peels off and reveals the torn hole (match cut into 4A).
```
A long blank torn paper strip lying flat across the middle of a warm off-white page, straight and uncurled, with a hand-drawn rough ink brush stroke beside it on the paper. Quiet, held, tense. Ink and paper only, fine grain.
```

---

## Segment 4: The Light

**4A. The hole** · collage
Move: push in toward the hole until the frame goes dark.
```
Extreme close-up of a round torn hole in dark paper, edges frayed, centred. Through the hole, the door header in soft focus. Completely monochrome, no color yet. Quiet frame, hard side light on the torn edge.
```

**4B. Green ignites (key colour frame)** · collage
Move: black, then the light snaps on in green on "light"; GO stamps on "Go"; the figure strides in.
```
Looking up at a paper shop door header from outside, a round signal lamp set into the header, unlit and dark, a blank paper label panel beside it. A halftone paper silhouette strides toward the open door from the lower left. Everything ink, paper and ochre.
```

**4C. Yellow** · collage, two poses (`4C1` arm down, `4C` arm raised)
Move: light switches to yellow on "Yellow", 5-10 stamps, the arm rises to check a watch.
```
Same door header composition as 4B, lamp unlit, label panel blank. A paper silhouette stands at the threshold, [arm down at his side | one hand raised to check a wristwatch]. Ink and paper only.
```

**4D. Red** · collage
Move: light switches to red on "Red", 15+ stamps, the figure turns away and walks out toward the camera.
```
Same door header composition, lamp unlit, label panel blank. A paper silhouette at the threshold, glancing back over her shoulder, already turning away from the door. Tense, restrained. Ink and paper only.
```

**4E. The scan** · collage
Move: ticket slides under the scanner, flash, counter 0 → 1, an ink line draws up to the light, light switches green → yellow.
```
Cutaway diagram in cut-paper style: a slice through the shop wall. Inside, a paper ticket beside a small scanner and a small blank counter display. Outside on the wall, a round signal lamp, unlit. No wires drawn. Patent-drawing precision, ink and paper only.
```

**4F. 700+** · documentary image **M1** + clean map + native doors and counter
Move: opens on M1's signal, pulls out to M1 pinned beside the map; 130 native doors pop on outward from Tokyo; the counter climbs to 700+.
```
Overhead view of Japan built from halftone paper dots on warm paper, empty: no markers, no icons, no labels. Generous empty paper around it.
```
```
[documentary lock] A tiny modern barbershop inside a Tokyo train station concourse, narrow glass shopfront, three barber chairs visible inside, a slim vertical three-lamp signal light mounted beside the door (green top, yellow middle, red bottom), commuters walking past in a blur, clean fluorescent light.
```

---

## Segment 5: Your Door

**5A. The guess** · documentary image **M3**, then collage
Move: the real doorway holds through "…sees a full bench"; SATURDAY stamps; on "and guesses" it cuts to the collage, the ? scribble draws and the coin spins.
```
[documentary lock] Just outside a small Malaysian neighbourhood barbershop on a Saturday, looking in through the open glass door: a long bench of waiting customers along the wall, two barbers working, a man standing at the doorway hesitating, warm afternoon light.
```
```
Straight-on view of a shopfront on a sunny street, a paper silhouette leaning toward the window, one foot forward and one foot back, looking in at a crammed bench of overlapping torn-paper figures. A small coin hangs in the air beside him. Empty wall above his head. Fully monochrome, quiet, tense.
```

---

## Segment 6: The Doorway Decision

**6A. Known vs unknown** · diagram (native)
Move: top line runs to a 40 MIN flag and a dot arrives; bottom line breaks into a scribble and ?, the dot turns back on "walk away".
(Replaced the two-track collage in the final cut. Nothing to generate.)

**6B. Title** · typography over 6A's two halves (native)
Move: 6A splits into two flaps that fold away, THE DOORWAY DECISION wipes on, a rule draws, hold 1 s, the title rises.

**6C. Final frame** · collage
Move: the question builds word by word with the voice, one ochre pulse in the hole, cut to black.
```
The reference glass door, pulled back to a wide frame, the header hole dark. A blank torn paper strip across the top of the frame. Black surround, hard side light on the paper door. Quiet and unresolved.
```

---

## Cut-out sheet (things that move on their own, each on plain paper)

```
[style lock] Character sheet on plain warm paper, one figure only, centred, full body, no shadow on the ground: [figure, pose, angle — e.g. "the same paper silhouette walking in side profile, left to right"].
```
Still missing for Doorway (stand-ins used): the 6A walker, a single door icon for 4F, the 4D customer walking away.
