Target: `cards/04_Shading_Lighting/hdri-for-bright-plain-world-for-dark--lighting-characters.md`
Source: "Studio Lighting, Silhouettes & Color Theory/Modern Lighting Techniques in Blender.txt" (02:43–05:39, 08:02–09:07)

## New values the existing card doesn't state as numbers
The target card's "dark scene" step says to lower the world toward near-black and keep a dim HDRI "for reflections,"
but gives no strength numbers (its own raea example uses `intensity={0.08}` as one single value). This source gives a
observed working range across three different still-life setups:

| setup | HDRI/world strength | notes |
|---|---|---|
| soft stucco/cement still-life | very low ("just .015") | near-black world, main light is a single point light at power 4000–5000 |
| backlit-foliage calming scene | Sky Texture, Sun strength = **0**, overall sky/HDRI strength **0.24** | HDRI/sky does the fill entirely; no separate sun |
| Peter Tarka-style three-light recreation | plain grey world (no HDRI image), brought from 0 up only enough to lightly reinforce one side | used instead of an HDRI when a neutral fill (not reflections) is the only goal |
| beam-rig product shot | sky texture, sun strength = **0**, strength **0.3** | paired with two narrow-spread area-light beams (see new card: rectangular-beam-light-rig) |

## Extra step: kill the sun, not just lower the HDRI
Three of the four setups above use Blender's built-in Sky Texture world shader with its Sun sub-element strength set
to exactly **0**, so only the HDRI/sky's ambient term lights the scene — a different control than swapping to a flat
RGB colour (which the target card already covers). Worth adding as an alternate dark-scene method: Sky Texture +
sun-strength-0 gives a very low, naturally-tinted ambient fill without needing a separate HDRI image file.

## NOTES
- Timestamps: 02:43–05:39 (point light + low HDRI still-life), 06:11–08:02 (backlit foliage, sun=0, strength 0.24),
  09:07–11:20 (three-light Peter Tarka recreation, plain grey world), 14:18–16:11 (beam rig, sun=0, strength 0.3).
- Visual gap: the exact point-light power values (4000, then 5000) and radius/spot-size adjustments are shown on
  screen, not stated as a single clean number — kept as the closest readable values.
