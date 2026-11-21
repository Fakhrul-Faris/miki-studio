# Addendum → cards/04_Shading_Lighting/hdri-for-bright-plain-world-for-dark--lighting-characters.md

Source: "Studio Lighting, Silhouettes & Color Theory/Why your lighting looks flat.txt" — 02:14–03:44.

## New VALUES BY SOURCE column (why-your-lighting-looks-flat: desaturated HDRI, background-only)
| parameter | why-your-lighting-looks-flat |
|---|---|
| source | a 3D-scanned/360° room HDRI (AmbientCG, Poly Haven) used **purely for its reflections and background detail**, not as the key |
| desaturation | run the HDRI through a **Hue/Saturation node, Saturation driven down to strip its colour**, before it reaches the World background — keeps the imperfect lighting detail (reflections, subtle gradients) without the HDRI's own colour casting the scene |
| strength | world background set to 0 by default (flat grey rejected); with the desaturated HDRI in, brought down from full — "we could halve it… we could go 0.75" |
| reasoning | reflections are a reflection of the surrounding environment; a flat grey/black world flattens reflective surfaces, but a full-colour HDRI fights the scene's own key/accent colour — desaturating keeps the *shape* of the lighting information while dropping the *colour* |
| paired rule | start with exactly one key light before adding this background HDRI (set1 one-dominant-light.md); this HDRI is background/reflection fill, never the light doing the main work |

## Note
Same card's "keep a dim HDRI for reflective surfaces" idea, with the added step of neutralising the HDRI's own hue
first so it can't compete with the scene's single accent colour. In raea: `<Environment src={...} intensity={0.5–0.75}
tint="#ffffff" saturation={0}/>` if the runtime exposes a saturation control, otherwise pre-desaturate the HDR file
once at build time (e.g. a one-off ImageMagick/compositor pass) before loading it.
