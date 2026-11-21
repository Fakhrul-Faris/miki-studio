---
title: Layered complementary gels — opposite colour per light role, not one whole-shot grade
bucket: 04_Shading_Lighting
source: "Studio Lighting, Silhouettes & Color Theory/How to Light Like JACK BRIDGLAND – Layered Studio Lighting Techniques Explained.txt"
source_time: "00:46–02:01 (Octa + warm gel), 02:01–02:54 (bounce, blue one side / warm the other), 04:12–05:05 (rim, cool gel), 05:05–06:21 (background, pink/red gradient)"
tool_target: raea
tier: full
use_when: "a multi-light setup where the final look should feel rich and balanced rather than pushed to one temperature"
style_fit: "⚠ conflict: Style D keeps ONE saturated brand accent; the source deliberately plays several different gel colours against each other across light roles (warm key, blue+warm bounce, cool rim, pink background). Adapted below: keep this layering structure (different light ROLES can sit at slightly different, mostly desaturated temperatures) but only the accent colour may be strongly saturated, and only on what the line is about."
---

## METADATA
04_Shading_Lighting | Studio photography / virtual lighting sim (general, engine-agnostic) | raea light `color` per role

## CREATIVE_INTENT
Rather than grading the whole shot one temperature, the source assigns a different gel to each light's structural ROLE —
key warm, side bounce fills split blue/warm, rim cool, background pink-to-deeper-pink gradient — then checks the combined
result: "the gels are balancing out quite nicely, it doesn't look really orange from one side, it really blue from the
other side". The point isn't any single gel; it's that opposing warm/cool choices across different roles cancel into a
neutral-reading whole while still giving each layer its own character when solo'd. This is additive colour-by-role, not a
single colour grade applied over everything.

## STE_PROCEDURE
1. Before adding any colour, confirm the light-layering order is already built (key → fill/bounce → rim → background).
2. Assign the key a single warm or neutral gel; this is the dominant light, so keep it the most restrained colour choice.
3. Assign bounce/fill lights on opposite sides different temperatures from each other (one cool, one warm) rather than matching them.
4. Assign the rim/back light a colour distinct from the key (source: cool, where the key is warm).
5. Assign the background its own colour, which may be a gradient (two gel colours fading into each other across the backdrop).
6. After all layers are on, check the combined image: no single hue should read as dominant; each layer's colour should be visible only as a subtle balancing note, not a cast.
7. Solo each light to confirm its individual colour contribution still looks intentional alone, not just in combination.

## AGENT_EXECUTION
**Shot list / frame brief:** use when a frame brief's Decision calls for a "rich but neutral" studio look rather than a
single warm/cool mood (compare warm-cool-mood.md, which is a single whole-shot temperature choice). Frame brief → Decision:
"each light role carries its own small colour note; only [object]'s accent is strongly saturated."

**raea** (⚠ adapted: desaturate every role colour except the one brand accent; the accent appears on the hero only, never
spread across fill/rim/background):
```tsx
<SpotLight name="key" color="#fff1e2" transform={Transform.fromXyz(0, 2.2, 1.8).lookingAt([0, 0.3, 0])}
  intensity={1_600_000} outer_angle={0.5} inner_angle={0.15} radius={0.5} soft_shadows_enabled shadow_maps_enabled />
{/* bounce/fill split: cool one side, warm the other — both desaturated, well below the key */}
<RectLight name="fill-cool" color="#dce6ff" transform={Transform.fromXyz(-1.2, 0.4, 1.0).lookingAt([0, 0.3, 0])}
  intensity={40_000} width={1} height={1.4} />
<RectLight name="fill-warm" color="#ffe6cf" transform={Transform.fromXyz(1.2, 0.4, 1.0).lookingAt([0, 0.3, 0])}
  intensity={40_000} width={1} height={1.4} />
{/* rim: opposite temperature to the key */}
<RectLight name="rim" color="#cfe0ff" transform={Transform.fromXyz(0, 1.8, -1.6).lookingAt([0, 0.4, 0])}
  intensity={120_000} width={1.5} height={1.5} />
{/* background: the ONE place the accent may appear, dim, as a gradient (see rgb-bounce-backdrop-gradient card) */}
```
Tune by rendering stills with one role toggled off at a time (`raea render EDIT.tsx --frame N -o step_k.png`), the raea
equivalent of "solo each light layer".

### Worked example
Topic: "kedai bunga malam Krismas" (illustrative; a flower-shop counter, warm Christmas evening mood).
BEFORE: `| 4 | "waktu sibuk" | counter lit flat, one white key, no character | — | — |` — functional but flat.
AFTER: `| 4 | "waktu sibuk" | counter under a warm key; a cool desaturated fill on the shadow side keeps detail without fighting the warmth; a faint cool rim separates the counter from the dark room; the one red ribbon on the flower bouquet (accent) stays the only saturated colour | nothing changes state here — a held lighting beat before the next cut | layered-complementary-gels-per-light-role--lighting-jack-bridgland |`

### Check
- Does each light role (key, fill, rim, background) carry a distinct, mostly desaturated colour rather than all matching one grade?
- When toggled on alone, does every light's colour still look like a deliberate choice, not an accident?
- Is the brand accent the only strongly saturated colour anywhere in the frame?
- Toggled all together, does no single hue dominate the image?

## NOTES
- Visual gaps: exact gel colours/intensities are visual-only (studio software sim); no numeric values given anywhere in the source.
- Rule conflicts: ⚠ the source freely uses several saturated gels (pink/red background, blue bounce) which directly
  conflicts with the one-accent house rule; adapted above to keep the layering STRUCTURE (different desaturated
  temperatures per role) while reserving real saturation for the single brand accent only.
