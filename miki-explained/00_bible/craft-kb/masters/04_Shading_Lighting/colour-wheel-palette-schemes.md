---
title: Colour-wheel palette schemes (complementary, mono, tetradic...)
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/complementary-dominant-accent-palette--nice-colors.md
  - cards/04_Shading_Lighting/four-colour-schemes-four-questions--key-to-realistic-renders.md
  - cards/04_Shading_Lighting/monochromatic-palette--nice-colors.md
  - cards/04_Shading_Lighting/six-colour-schemes-colour-wheel--power-of-color.md
  - cards/04_Shading_Lighting/tetradic-palette-variant-colours--product-animation-masterclass.md
sources: ["How to get nice colors in your renders.txt", "The Key to Realistic Renders in Blender.txt", "The Power of Color in Blender 3D!.txt", "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt", "The SECRET to Great Movies The 60-30-10 Color Rule in Filmmaking (2025).txt", "Color Theory in Film — Color Psychology for Directors Ep5.txt", "Understanding the 60-30-10 Color Rule | Applying Color Theory to Film.txt"]
use_when: "picking the episode palette around the brand accent"
style_fit: "conflict (strictest, tetradic/triadic): Style D allows one saturated accent per setup on the line's subject. Use monochromatic or complementary/split-complementary in a frame; triadic/tetradic only across beats or as desaturated support."
---

## METADATA
04_Shading_Lighting | any (sources n/a–4.3) | principle-only (applied via raea materials / lights / grade)

## CREATIVE_INTENT
Pick a frame's colours from the wheel so they look intended: one dominant base hue covers most of the frame and one
accent breaks it on the point of interest, never 50/50. The scheme sets the mood:
- Monochromatic (one hue, varied value/saturation, shadows stay on-hue): harmonious, elegant, calm — the easiest
  cohesive frame; a single off-hue element then pops.
- Complementary (opposites, e.g. teal/orange): opposition, tension, drama, energy; the most common.
- Split-complementary (base + the two neighbours of its complement): complementary's energy with less tension.
- Analogous (~3 neighbours): sympathy, realism; found in nature and environments.
- Triadic (3 at 120°): balanced but vibrant, comic-like.
- Tetradic / double complementary (two complementary pairs): rich, complex, needs balancing; good for picking variant colours.
Happier images lean warm; sadder or alien ones cooler and stranger.
- Nice colors adds: dominant ~70–80% / complement ≤25%, never 50/50; monochromatic with on-hue shadows; eyedropper check.
- Key to realistic renders adds: four questions (mood, story, what pops, what to emphasise) to choose the scheme.
- Power of Color adds: the six-scheme vocabulary and wheel geometry.
- Product masterclass adds: tetradic anchored on the brand pair to pick variant/edition colours; swap a colour that sits too close to a neighbour.

## STE_PROCEDURE
1. Ask: what mood should this beat have, and what story am I telling?
2. Ask: which colour must pop, which must go unnoticed, and can I emphasise with more colour or light?
3. Place the brand accent on the colour wheel (Blender's colour picker wheel or a tool such as Canva's wheel).
4. Pick the scheme: monochromatic for calm beats, complementary / split-complementary for energy; analogous for natural environments.
5. Read the other hues off the wheel (exact maths not needed; roughly opposite works).
6. Give the base hue ~70–80% of the frame (Style D: the dark room, floor and props).
7. Limit the accent/complement to ≤25% of the area (Style D: usually ≤10%), on the line's subject or edges; never 50/50.
8. For monochromatic, keep lights, surfaces, background and shadows in a narrow hue band; vary only value and saturation; shadows darker, not grey.
9. When a beat needs more colours (variants, a row of products), take them from a tetradic scheme anchored on the brand pair; keep the hero in the brand colour.
10. Judge a set together; swap any colour sitting too close to a neighbour (author swapped pink → yellow beside orange/red).
11. Desaturate every scheme colour except the one accent.
12. Write the scheme + hexes into the episode frame brief before building.
13. Verify on a rendered still: hue nearly constant across the base, accent only in pockets, tone mapping hasn't muted the accent.
14. If unsure, trust what looks good; the theory is a fallback.
15. (from 60-30-10-color-rule) Check any frame against the area split 60% dominant / 30% secondary / 10% highlight;
    a near-monochrome base plus one secondary for contrast is a valid two-colour variant (keep harmonious unless the
    beat is a deliberate strong colour statement).
16. (from color-theory-film-ep5) Pick the episode's hue family ("hue affinity") for a reason tied to the topic, the
    way a film stays mostly one colour or neighbouring colours to signal its world; cap colours per frame at ≤ 3–4 roles.

## VALUES BY SOURCE
| parameter | Nice colors | Key to realistic | Power of Color | Product masterclass | 60-30-10-color-rule | color-theory-film-ep5 | recommended for Style D (+ why) |
|---|---|---|---|---|---|---|---|
| Schemes covered | complementary, split-comp, monochromatic | mono, complementary, analogous, triadic | all six | tetradic | 60/30/10 area split, two-colour variant | monochromatic/analogous "hue affinity" | mono or complementary/split-comp per frame (one accent) |
| Area split | base 70–80% / accent ≤25%, never 50/50 | — | one dominant, rest lower sat/area | hero in brand colour | 60% dominant / 30% secondary / 10% highlight | ≤ 3–4 colours per frame (Batman: TAS) | accent ≤10% (one accent on the line's subject); dark room 60 / hero material 30 / accent ≤10 lines up with 60-30-10 |
| Hue maths | "roughly opposite" | — | comp h+180; analogous h±30; triadic h±120; split h+150/h+210; tetradic h, h+60, h+180, h+240 | tetradic ±90°/180° (OKLCH if no tool) | — | — | use the HSV maths below; tetradic only across beats |
| Example hues | orange-yellow, blue-green (mono) | warm happy / cool sad | blue/orange | blue + orange → pink/purple + green | orange/teal (skin-tone pair); Mad Max: sand 60% / sky-blue+muted metal 30% / red rig+explosions 10% | The Matrix = green, tied to "code" + a sickly quality | brand accent vs neutral-cool room |
| Mood | — | mono harmony, comp drama, analogous realism, triadic cartoonish | comp energy, split controlled, tetradic busy | moody near-mono + one secondary (The Batman); brown-vs-blue (Uncharted) | hue affinity signals the world (colour tied to the topic/theme) | complementary for gain/loss tension, mono for calm steps |

## AGENT_EXECUTION
Palette maths (HSV degrees):
```python
import colorsys
def hexs(h, s=0.7, v=0.9):
    r, g, b = colorsys.hsv_to_rgb((h % 360) / 360, s, v); return "#%02x%02x%02x" % (int(r*255), int(g*255), int(b*255))
SCHEMES = {"complementary": [0, 180], "analogous": [-30, 0, 30], "triadic": [0, 120, 240],
           "split": [0, 150, 210], "tetradic": [0, 60, 180, 240]}
def palette(accent_h, scheme, support_s=0.25):        # support colours desaturated (one-accent rule)
    return [hexs(accent_h + d, 0.8 if d == 0 else support_s) for d in SCHEMES[scheme]]
```
Accent-coverage check on a rendered still (`raea render EDIT.tsx --frame N -o F.png`):
```python
from PIL import Image; import colorsys
im = Image.open("F.png").convert("RGB").resize((270, 480)); px = list(im.getdata())
def hue(p): return colorsys.rgb_to_hsv(*[c/255 for c in p])
acc = sum(1 for p in px if (h := hue(p))[1] > 0.5 and abs(h[0] - ACCENT_H) < 0.06)   # ACCENT_H in 0..1
print(acc / len(px))   # ≤ 0.25 (nice colors); Style D usually ≤ 0.10
```
raea:
```tsx
const P = { brand: "#1f6bff", accent: "#ff7a1a", alt1: "#c83cff", alt2: "#2fbf71" };  // ~ example tetradic set
<SpotLight color="#ffd9a0" ... />                                         // base-hue key (mono: on-hue)
<RectLight color="#8a5a2a" intensity={...} width={...} height={...} ... /> // dim on-hue fill opposite the key keeps shadows on-hue
<Mesh3d><Cuboid half_size={[2, 0.02, 2]} /><StandardMaterial base_color="#6b4a2a" /></Mesh3d>   // floor in the base family
<Mesh3d name="subject">...<StandardMaterial base_color="#202020" emissive={LinearRgba.from(Srgba.hex(P.accent)).mul(2)} /></Mesh3d>
<PointLight color="#9fc4ff" ... />                                        // a cool rim counts as the complement
<Grade temperature={...} shadows={{ saturation: 1.1 }} />                 // lean the whole piece (first frame holds)
```
`<AmbientLight>` takes `brightness`; a `color` prop is not documented in the skill, so use a dim on-hue RectLight for
on-hue shadows. Blender: set a material copy's colour from a hex converted sRGB → linear (e.g. `mix.inputs[6].default_value`).

## NOTES
- Deprecated: none.
- Visual gaps: wheel diagrams, colour-picker positions and example hex values are on screen only.
- Rule conflicts: triadic/tetradic put several saturated hues in one frame and break Style D's single-accent rule — use
  them across beats (one accent per setup) or keep non-subject colours desaturated / neutral grey. Complementary and
  monochromatic reinforce the one-accent rule. Check the accent under the tone mapper (`aces` mutes; prefer `tony`).
- 60-30-10-color-rule: ⚠ its orange/teal complementary pair is framed as flattering to skin tones — Style D has no
  people, so the pair still works but keep the reason tied to the accent-vs-room contrast, not skin tone. Also
  spawned its own card: `cards/06_Art_Direction/sixty-thirty-ten-colour-split--60-30-10-color-rule.md` (not folded
  here — different technique, the area-split framing itself).
- color-theory-film-ep5 / Understanding the 60-30-10 Color Rule: no numeric values beyond the ≤3–4 colours/frame cap;
  "hue affinity" is a selection principle, not a new scheme — doesn't change the Style D pick.
