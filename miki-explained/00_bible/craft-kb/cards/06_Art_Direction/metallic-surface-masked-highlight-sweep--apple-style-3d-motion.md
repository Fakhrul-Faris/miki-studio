---
title: Metallic type/logo — fine noise texture plus a soft highlight that sweeps across and settles in a corner
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/Apple-Style 3D Motion Design.txt"
source_time: "02:41–04:46 (look + sweep), 11:12–12:09 (reuse, static), 27:40–29:50 (per-text highlights), 33:21–35:01 (logo + shimmer)"
tool_target: raea
tier: full
use_when: "a brand logo, RM number or Text3D word that should read as a premium physical object; the 'shine' beat when a price or result lands"
style_fit: Fits Style D's macro look — in 3D the sweep is a real light moving, not a 2D flash; keep it slow (≥ 0.6 s), one pass, then settle; no lens-flare streak.
---

## METADATA
06_Art_Direction | After Effects (source) → raea 3D light sweep (preferred) or 2D masked overlay | raea

## CREATIVE_INTENT
To copy the brushed-metal look of Apple's Mac Studio ad, the type gets a "slightly rough texture and a subtle
highlight": fine fractal noise in Hard Light, plus a large blurred white ellipse confined to the letters (Set Matte,
Screen blend). The highlight sweeps across "as it opens up and then settles near the corner"; a second small copy sits
in the opposite corner. On the logo, both highlights drift slightly (the second moves a little longer) and the noise's
Evolution is keyed a small amount so "the metal seems to shimmer" as the light moves.
Also in "Create Apple-Style UI Motion Graphics" (05:08–06:51): the same blurred ellipse, matted to a button and
parented to it, sweeps left→right as a subtle shine, with opacity fading it out at the end, plus a soft drop shadow.

## STE_PROCEDURE
1. Give the text/logo a fine noise texture (source: Fractal Noise, scale 1, Hard Light, contrast raised).
2. Make a large soft ellipse, near-white, blurred (Fast Box Blur), rotated to a diagonal.
3. Confine the ellipse to the letters (Set Matte from the text, effects and masks on) and blend it Screen.
4. Lower its opacity until it reads as a sheen, not a flash.
5. Start it outside the letters; animate it across, ending near one corner (curve: fast start, long settle).
6. Duplicate it, shrink it, park it in the opposite corner as a small static highlight.
7. When the shape moves with the text, parent the highlight to the text so it travels with it.
8. Optional: key the noise Evolution a small amount on the same curve for a shimmer.
9. Reuse the same texture and highlight on every metallic element (copy effects) so the film stays one material.

## AGENT_EXECUTION
Preferred (Style D, real 3D): the hero word or logo is a `Text3D`/Model with a metallic `StandardMaterial`
(`metallic` ~0.9, `perceptual_roughness` ~0.3 for "slightly rough"); the sweep is a narrow `RectLight` or `SpotLight`
moving across in the reflection path, so the highlight slides over the letters and stops near a corner. Frame brief
Moves: "key light slides L→R across the tag face on 'harga asal', settles top-right; second tiny practical stays
bottom-left."
```tsx
const s = k(f, word("asal"), 24, out);                       // ~0.8 s @30 fps, fast start, long settle
<RectLight transform={Transform.fromXyz(lerp(-0.6, 0.35, s), 0.9, 0.6).lookingAt([lerp(-0.2, 0.1, s), 0, 0])}
  intensity={60000} width={0.08} height={0.6} range={2.2} />  // range ≈ 2× light-to-subject distance
<Mesh3d name="tag-word"><Text3D size={0.12} depth={0.02}>RM49</Text3D>
  <StandardMaterial base_color="#cfd2d6" metallic={0.9} perceptual_roughness={0.3} /></Mesh3d>
```
Flat UI/2D fallback: duplicate the text in near-white and give the copy `maskImage: radial-gradient(ellipse 35% 70% at
${x}% 40%, #000 0%, transparent 70%)` with `x` animated, `mixBlendMode: "screen"`, opacity ~0.35 — the sheen exists only
inside the glyphs. Verify on a still.

### Worked example
Topic: "Sale ni betul ke tipu?" style how-to (illustrative shop).
- BEFORE: the new price "RM49" appears; a white diagonal flash wipes across the frame.
- AFTER: the brushed-metal "RM49" tag sits in the dark; on "harga asal" one soft highlight slides across its face and
  comes to rest at the top-right corner, a tiny glint stays bottom-left; the accent red stays on the struck-out price only.

### Check
- Is the sheen confined to the object (never a full-frame flash)?
- Does the highlight end at rest near a corner instead of leaving frame?
- Is the sweep one pass ≥ 0.6 s, landing on a named word?
- Is the metal look identical on every metallic element in the episode?

## NOTES
- Visual gaps: exact contrast, blur, rotation and opacity values are on screen only.
- AE dropped: Fractal Noise / Set Matte / Fast Box Blur / Screen; translated to real metallic material + moving light, or
  a CSS mask overlay for flat UI.
- ⚠ The UI-tutorial version sweeps on a button press; keep it to one pass and pair it with the press beat only.

## ADDENDUM — How to Create Viral Apple-Style UI Widget Animations in After Effects (Masterclass Part 2)
Source: "Minimalist Tech & SaaS 3D Staging/How to Create Viral Apple-Style UI Widget Animations in After Effects! (Apple Masterclass Part 2).txt" (17:16–18:02).
- Variant: a built-in Light Sweep effect crosses a whole UI card as it rises, instead of a hand-built blurred-ellipse-
  plus-matte. Widen the band, tone both edge-softness controls down to ~15, lower edge thickness to ~3 for a tighter,
  cleaner-edged band than the default. Keyframe the sweep's centre from off to one side to past the far side, timed
  so the crossing happens exactly as the card's own bounce-in animation peaks — light and motion land together.
- The detail worth keeping: timing coupling. Don't cue the highlight sweep on its own independent word/frame — derive
  its midpoint from the same `at`/peak frame already driving the element's entrance animation, so the two always
  land together.
| parameter | Apple-Style UI Widget Animations | recommended for Style D |
|---|---|---|
| tool | built-in Light Sweep effect | CSS mask-position sweep (as this card's flat-UI fallback) |
| width | increased (no exact %) | wide enough to cross the card in one pass, ≥ 0.4 s |
| edge softness | ~15 (both edge controls) | soft enough to avoid a hard line, tune on a still |
| edge thickness | ~3 | thin, crisp band |
| timing | sweep crossing lands exactly on the card's bounce-in peak frame | cue the sweep's midpoint to the element's own entrance peak frame, not an independent cue |
