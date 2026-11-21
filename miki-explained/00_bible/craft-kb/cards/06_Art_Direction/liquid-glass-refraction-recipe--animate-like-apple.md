---
title: Liquid-glass refraction look — bump-mapped shape + trackmatted stroke and drop shadow
bucket: 06_Art_Direction
source: "Motion Feel, Easing & Camera Choreography/Animate Like Apple After Effects.txt"
source_time: "00:43–05:58 (build), 12:17–14:22, 23:00–24:30, 42:01–44:49 (reused on 3 more shapes)"
tool_target: raea
tier: full
use_when: "a UI pill/card/button needs to look like it refracts the scene behind it (a 'glass' chip, a floating control) rather than sit flat"
style_fit: "Fits our macro-glass-material episodes and UI-heavy frames; ⚠ source blurs/darkens the background through the shape and uses a 4-colour gradient edge glow → adapted: keep the refraction and rim, drop the multicolour gradient (one accent rule)."
---

## METADATA
06_Art_Direction | After Effects (CC Glass + trackmattes) → raea backdrop-filter / refraction shader + layered stroke | raea

## CREATIVE_INTENT
To fake Apple's "liquid glass", the author bump-maps a CC Glass adjustment layer to the shape's own alpha (softness 25,
height 60, AE light not the effect's own, ambient light 200%), trackmatted to that shape so the refraction stays inside
it. A duplicate of the shape becomes a white stroke (2 px, blend overlay, opacity 50%) so the rim "reacts to the
background colours". Another duplicate becomes a drop shadow (black fill, box blur ~40%, nudged down, opacity ~35%,
inverted trackmat so it only shows under the shape). The same three-layer stack (glass / stroke / shadow) is rebuilt for
every glass shape in the project (menu pill, selection dot, iPhone card, music-player box, buttons) — each time changing
only the bump-map source and softness/height/displacement/blur numbers to match that shape's size.

## STE_PROCEDURE
1. Before building the glass, finish the shape's path (the thing light will bend around).
2. Add one adjustment layer per glass shape; bump-map it to that shape, light source = scene lights (not the effect's own).
3. Set softness ~20–35, height ~40–60, displacement ~100–180 depending on shape size (larger shape → higher displacement).
4. Trackmat the adjustment layer to the shape so refraction stays inside its silhouette.
5. Duplicate the shape for a stroke: hide fill, stroke 2 px, blend mode overlay, opacity 50%.
6. Duplicate the shape again for a drop shadow: black fill, blur, offset down, opacity 30–35%, trackmat inverted to the shape.
7. Add a gaussian/box blur (~15–28%) to the glass layer if the look should read "frosted" rather than clear.
8. Repeat per shape, scaling the numbers to the shape's size; never reuse one bump map across unrelated shapes.

## AGENT_EXECUTION
raea has no AE bump-map/CC-Glass equivalent; rebuild the *result* — a shape that bends and dims what's behind it, with a
reactive rim and a contact shadow — using `backdrop-filter` on a 2D layer or a refraction material in Bevy:
```tsx
// 2D UI layer (HyperFrames/raea div): glass chip
<div style={{
  position: "absolute", borderRadius: 28, width: w, height: h,
  backdropFilter: "blur(14px) saturate(1.1)",
  background: "rgba(255,255,255,0.08)",
  boxShadow: `inset 0 1px 1px rgba(255,255,255,0.35), 0 ${h*0.12}px ${h*0.3}px rgba(0,0,0,0.32)`,
  border: "1px solid rgba(255,255,255,0.25)" }} />
```
For a 3D macro shot: a glass `StandardMaterial` (high roughness-complement, ior ~1.45, transmission) on a thin panel
mesh placed in front of the hero, one soft top light only (house rule), `<Bloom>` low threshold on its rim.
Shot row: `| 5 | "tekan untuk bayar" | macro, glass "Bayar" pill over the receipt | pill refracts the receipt text behind it, rim catches the top light | this card |`.

### Worked example
Topic: a "Bayar" pill floating over a kedai runcit receipt before paying RM12.80 (illustrative amount).
- BEFORE: a flat green "Bayar" button sits on top of the receipt.
- AFTER: the pill is glass — the receipt's lines bend faintly through it, a thin white rim catches the one top light,
  and a soft shadow sits under it on the paper; on "tekan" the pill presses down 1–2 % and the glass briefly flattens.

### Check
- Does the shape visibly bend/dim what's directly behind it (not just blur its own fill)?
- Is the rim reactive to the scene (light/background), not a static painted stroke?
- Is there a soft contact shadow confined to the shape's silhouette?
- Is the glow/rim one colour (the brand accent or neutral), never a multicolour gradient?

## NOTES
- Visual gaps: exact CC Glass per-shape numbers beyond those spoken (softness/height/displacement for the iPhone card
  and music-player box) are visual only; general ranges given above.
- AE dropped entirely (CC Glass, trackmattes, duplicate-and-link stacks): translated to a `backdrop-filter`/refraction
  material driven by the shape's own size, since raea has no plugin-equivalent bump-map effect.
- The property-link rig that keeps the stroke/shadow glued to the controller shape as it morphs is its own technique —
  see `controller-shape-drives-linked-siblings--animate-like-apple.md`.
- ⚠ Source's edge glow (CC Light Sweep, 4-colour gradient) dropped here for the one-accent rule; see addendum to
  `edge-light-sweep-around-ui-panel--smooth-ui-animation.md`.
