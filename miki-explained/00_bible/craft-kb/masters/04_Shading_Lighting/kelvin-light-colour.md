---
title: Light colour in Kelvin (Blackbody) vs free colour
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/blackbody-kelvin-light-colour--power-of-lighting.md
  - cards/04_Shading_Lighting/kelvin-vs-colour-light--fundamentals-of-lighting.md
sources: ["The Power of LIGHTING in Blender!.txt", "Fundamentals of Lighting in Blender.txt", "Easy Blender Lighting HACK [Blender Tutorial].txt"]
use_when: "warm practical vs cool ambient light colour choices"
style_fit: "Neutral/warm Kelvin key for the real room; a free non-natural colour only where it carries meaning — a coloured light that tints the whole frame counts as the single brand accent. raea takes hex only, so convert."
---

## METADATA
04_Shading_Lighting | Blender 3.2+ / 4.5+ / 5.x | Light shader nodes / light Temperature → raea hex colour

## CREATIVE_INTENT
Real lights run warm-yellow to white on the Kelvin (blackbody) scale (~1,000–7,000 K): candle ~1,500 K, incandescent
2,000–2,700 K, office ~4,000 K, daylight ~5,500–6,500 K, sky bluer. Picking by Kelvin makes light read as real; pick a
free RGB colour only when the light should feel man-made or unreal (neon, club, sci-fi — purple never comes from
nature). A slight colour difference between two lights also helps separate two faces of an object.
- Power of Lighting adds: the Blackbody node recipe and Kelvin ranges.
- Fundamentals of lighting adds: natural vs artificial decision, colour separation between two lights, contain tint spill
  (move back / make it a Spot), the 5.x Temperature field.

## STE_PROCEDURE
1. Decide whether each light should read as natural or artificial.
2. If natural, set its colour on the Kelvin scale: Blender 4.5+/5.x light Temperature field; older Cycles: light Use Nodes, Blackbody [Color] → Emission [Color].
3. Pick the temperature: 1,500 K candle, 2,700 K bulb/practical, 4,000 K office, 5,500–6,500 K daylight.
4. If artificial, set the lamp Color to a hue not on the Kelvin scale — only where the line's meaning calls for it.
5. If two faces blend together, tint the second light slightly differently from the key.
6. If a tint spills onto unimportant surfaces, move the light back or make it a Spot.
7. For raea, convert each Kelvin value to hex and set it on the light's `color`.
8. (from Easy Blender Lighting HACK) For a world/sky warmth dial instead of a single light: mix the Sky Texture's two
   colours in one Mix Color node, then mix that result with a Blackbody colour in a second Mix Color node, feeding
   World Output › Background Color — one Blackbody slider (0–10,000 K, lower = warmer) tints the whole world at once.

## VALUES BY SOURCE
| parameter | Power of Lighting | Fundamentals of lighting | Easy Blender Lighting HACK | recommended for Style D (+ why) |
|---|---|---|---|---|
| Range | 1,000–7,000 K | candle 1,500; incandescent 2,000–2,500; daylight 5,500–6,500 | 0–10,000 K (world dial) | key ~5,500 K warm-neutral (`#fff4e8`, house ProStage); practicals 2,700 K; world ambience ~2,700–6,500 K |
| Examples | 2,700 bulb, 4,000 office, 5,500–6,500 daylight | 2,700 (`#ffd2a1`~) | — | shop bulbs 2,700 K; cool fill `#9FB2D9` |
| Method | Blackbody node (Cycles); 4.5+ native temperature | 5.x `use_temperature` / `temperature` (verify); explicit RGB | World shader: Blackbody → Mix Color (with Sky colours) → Background Color | Kelvin → hex (formula below); raea sets sun/ambient `color` from `kelvin_hex()`, no world node |
| Free colour | — | non-natural lights; slight separation tint (0.65, 0.75, 1.0)~ | — | only on the line's subject / meaning beat |

## AGENT_EXECUTION
Blender:
```python
import bpy
L = bpy.data.lights["Key"]
# Blender 4.5+/5.x: native temperature (~ API name per UI; verify in your build)
L.use_temperature = True; L.temperature = 2700
# Cycles light node tree (any version): Blackbody → Emission
L.use_nodes = True; N, Lk = L.node_tree.nodes, L.node_tree.links
bb = N.new("ShaderNodeBlackbody"); bb.inputs["Temperature"].default_value = 2700
Lk.new(bb.outputs["Color"], N["Emission"].inputs["Color"])
# free colour (artificial / separation)
bpy.data.lights["Fill"].color = (0.65, 0.75, 1.0)     # ~ "a little bluer"
```
Kelvin → hex for raea (Tanner Helland approximation):
```python
import math
def kelvin_hex(k):
    t = k / 100
    r = 255 if t <= 66 else 329.698727446 * (t - 60) ** -0.1332047592
    g = 99.4708025861 * math.log(t) - 161.1195681661 if t <= 66 else 288.1221695283 * (t - 60) ** -0.0755148492
    b = 255 if t >= 66 else (0 if t <= 19 else 138.5177312231 * math.log(t - 10) - 305.0447927307)
    c = lambda v: max(0, min(255, int(v)))
    return "#%02x%02x%02x" % (c(r), c(g), c(b))
# kelvin_hex(2700) ≈ "#ffa757", kelvin_hex(6500) ≈ "#fff9fd"
```
raea (hex only; no Kelvin prop):
```tsx
<SpotLight color="#fff4e8" ... />                  {/* ~5,500 K warm-neutral key (house ProStage) */}
<PointLight color="#ffd2a1" ... />                 {/* ~2,700 K practical bulb (softer than the raw formula's #ffa757) */}
<AmbientLight brightness={60} color="#9FB2D9" />   {/* cool fill; color as used in kit/pro.tsx */}
<Grade temperature={...} />                        {/* whole-film warm/cool shift (first frame holds) */}
```

## NOTES
- Deprecated: light node trees are Cycles-only (EEVEE ignores them). Blender 4.5 added a per-light temperature property —
  prefer it where available (verify the exact API name).
- Kelvin values and hex conversions are approximate (`~`); the two members' 2,700 K hexes differ (`#ffa757` formula vs
  `#ffd2a1` hand-picked) — use the softer one for Style D practicals so they don't read orange.
- Visual gaps: the exact blue picked is visual only.
- Rule conflicts: one saturated accent only on the line's subject — a coloured light tinting the whole frame counts as
  that accent. Keep other lights neutral or near-Kelvin.
