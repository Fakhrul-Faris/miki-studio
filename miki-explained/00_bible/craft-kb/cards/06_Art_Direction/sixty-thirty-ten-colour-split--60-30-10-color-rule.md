---
title: 60-30-10 colour split (dominant / secondary / highlight)
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/The SECRET to Great Movies The 60-30-10 Color Rule in Filmmaking (2025).txt"
source_time: "00:43–01:24, 02:44–03:25, 03:25–04:04, 04:42"
tool_target: frame-brief
tier: full
use_when: "writing the art-direction five lines and each frame brief's palette; filling ref_<shot>.md palette roles"
style_fit: "Near-exact match to Style D: 60 % = the dark room (one dominant mood colour with value variation), 30 % = the hero's real material/surface, 10 % = the single brand accent on what the line is about. Never a second saturated 10 %."
---

## METADATA
06_Art_Direction | general (production design / colour theory, no software) | frame brief, ref_<shot>.md palette, board check

## CREATIVE_INTENT
The 60-30-10 rule ("as old as art itself": interiors, painting, film) splits every frame into 60 % one dominant colour
that sets tone and mood, 30 % a secondary colour that complements it and adds depth and realism ("without it everything
can look artificial"), and 10 % a highlight colour used sparingly to draw the eye to the important element and "make a
statement". The dominant colour should come in variations (values/shades) so the frame doesn't look flat. Examples:
La La Land (dominant yellow = warm, nostalgic), The Matrix (dark dominant, green secondary = futuristic), Mad Max: Fury
Road (~60 % sandy desert, ~30 % cool sky blue / muted vehicle metallics, ~10 % red of Furiosa's rig and explosions).
Colour design must be harmonious unless you are deliberately making a strong colour statement.

## STE_PROCEDURE
1. Before choosing any colour, write the beat's mood in 2–3 words (warm and safe / cold and risky).
2. Pick the dominant colour that carries that mood; it covers ~60 % of the frame.
3. Plan 2–3 value variations of the dominant (lit wall, shadow, floor) so it reads 3D, not flat.
4. Pick the secondary colour that complements the dominant; give it ~30 % of the frame.
5. Put the secondary on surfaces that add depth: the hero's body material, the tabletop, a rim light.
6. Pick one highlight colour; limit it to ~10 % of the frame.
7. Place the highlight only on the element the line is about.
8. Keep all three harmonious unless the beat is a deliberate colour statement (e.g. a loss beat in red).
9. Write the three colours with hex and % role into the frame brief and ref_<shot>.md before building.
10. On the rendered still, estimate the area split; if the highlight spreads past ~10 %, pull it back.

## AGENT_EXECUTION
- **Art direction (five lines):** state the episode's split once: `60 % dominant <hex> (room) · 30 % secondary <hex>
  (hero material/surface) · 10 % accent <brand hex> (subject of the line)`. Each frame brief's "Decision" field restates
  which object holds the 10 % in that setup.
- **ref_<shot>.md palette:** list 5–8 hexes grouped under the three roles (dominant: 2–3 values; secondary: 1–3;
  highlight: exactly 1).
- **Board check:** add "accent ≤ ~10 % of the frame and only on the line's subject" — the accent-coverage script in
  `masters/04_Shading_Lighting/colour-wheel-palette-schemes.md` measures it.
- **raea:** dominant = room/floor `StandardMaterial base_color` + light colour; secondary = hero material; highlight =
  emissive or base_color on the subject mesh only.
```tsx
<Mesh3d><Cuboid half_size={[3, 0.02, 3]} /><StandardMaterial base_color="#1b1a1f" perceptual_roughness={0.6} /></Mesh3d> {/* 60 % dominant */}
<Model src={staticFile("hero.glb")} />                                    {/* 30 % secondary: its real steel/wood */}
<Mesh3d name="subject"><Cuboid half_size={[0.2, 0.01, 0.1]} />
  <StandardMaterial base_color="#202020" emissive={LinearRgba.from(Srgba.hex("#ff7a1a")).mul(2)} /></Mesh3d> {/* 10 % accent */}
```
### Worked example
Topic: "Berapa modal stok seminggu kedai runcit" (a kedai runcit in Shah Alam; numbers illustrative, logic = summing a supplier invoice).
- BEFORE (frame brief palette): "dark background, wooden counter, orange highlights, blue phone, green notes on the receipt."
  Three saturated colours fight; the eye doesn't know where to land.
- AFTER: `60 % dominant #16151a → #2a2830 (dark room, two values for floor and wall falloff) · 30 % secondary #8a6a4a
  (worn wooden counter + #d8d2c4 receipt paper) · 10 % highlight #ff7a1a — only the RM 1,200 total line on the receipt`.
  The phone is dark grey; the notes are paper-white. On "RM 1,200 seminggu", the orange total line is the only saturated pixel.
### Check
- Does the frame brief name exactly three roles with hexes, and exactly one highlight?
- Is the highlight on the object the current line names, and ≤ ~10 % of the frame?
- Does the dominant have at least two values (not one flat fill)?
- Does the secondary add depth (material/surface), not a second accent?

## NOTES
- Visual gaps: the film frames are shown on screen only; the % splits are the narrator's approximations.
- The colour-wheel master (`masters/04_Shading_Lighting/colour-wheel-palette-schemes.md`) gives base 70–80 % / accent
  ≤ 25 %; 60-30-10 adds an explicit middle tier. For Style D, keep the highlight at ≤ ~10 %.
- The brand logo keeps its real colours; if they differ from the accent, keep the logo small so it does not become a
  second 10 %.

## ADDENDUM — Understanding the 60-30-10 Color Rule | Applying Color Theory to Film
Source: "Studio Lighting, Silhouettes & Color Theory/Understanding the 60-30-10 Color Rule | Applying Color Theory to Film.txt" (00:03–03:06).
- Batman: The Animated Series rarely used more than 3–4 colours in a frame — confirms this card's ≤3 hue-role cap
  (the brand logo is the only exception).
- 60% role sets mood/atmosphere (2001: A Space Odyssey — plain interiors made eerie/artificial by colour alone).
- 30% role: similar to the dominant colour (Studio Ghibli) reads calm/grounded; contrasting (Spider-Verse universes)
  reads as energy/snappy visuals. For Style D: similar/calm for how-to steps; contrasting secondary only for a
  high-energy hook or payoff.
- 10% role is reserved almost exclusively for characters (Tartakovsky) so they win visual attention at any size —
  for Style D, the line's subject only.
- Extra variants: an isolated colour makes a subject stand out from its environment; two contrasting colours can
  separate opposing sides; a shift in colour alone can move the story from excitement to normality without dialogue.
- A follow-on technique card was written from this source: `cards/06_Art_Direction/accent-colour-tracks-the-arc--60-30-10-color-rule.md`.
| parameter | Understanding 60-30-10 | recommended for Style D |
|---|---|---|
| colours per frame | rarely more than 3–4 | ≤ 3 hue roles + values; brand logo is the only exception |
| 60% role | mood/atmosphere | dark room |
| 30% role | similar (calm/grounded) or contrasting (energy/snappy) | similar for how-to steps; contrasting secondary only for a high-energy hook/payoff |
| 10% role | reserved for characters, so they win at any size | the line's subject only |
