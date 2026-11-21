---
title: Apple-style UI look — neutral ground, bold/regular type pair, rounded panels, breathing room, centred, subtle motion
bucket: 06_Art_Direction
source: "Motion Feel, Easing & Camera Choreography/Apple Style Animation Guide.txt"
source_time: "01:22–03:17 (colour, font, shapes, spacing, centring, motion), 04:26–04:40 (bevel), 05:12–05:41 (shadow, sound)"
tool_target: frame-brief
tier: principle
use_when: "art-directing the UI-heavy (~80 %) scenes: phone screens, app cards, step titles"
style_fit: Fits the UI scenes; Style D 3D scenes keep their dark room — neutral ground here means the screen UI. ⚠ 'smooth SFX everywhere' conflicts with SFX restraint → keep sparse.
---

## METADATA
06_Art_Direction | After Effects (source) → frame brief + raea kit `ui.tsx` | frame-brief

## CREATIVE_INTENT
The trending Apple look is a system: (1) colour — white, black or very light grey backgrounds; "Apple rarely uses loud
colours"; (2) font — SF Pro Display, **Bold** for titles/headings, **Regular/Medium** for subheads and small text;
(3) shapes — UI panels as shape layers, morphing one shape to another, "always use rounded corners"; (4) spacing — "Apple
always leaves breathing room. Nothing feels cramped. Nothing feels accidental"; strip it down; (5) layout "should almost
always stay centred. That's how you lock the viewer in … confusion kills attention"; (6) only then animate — "subtle,
smooth and quick. Nothing is flashy or dramatic." Effects: bevel/emboss subtly; drop shadow "very subtle"; smooth sound
under smooth motion.

## STE_PROCEDURE
1. Set the UI ground to white, black or very light grey; one accent only.
2. Pair one family: bold for the headline, regular/medium for the rest.
3. Give every panel rounded corners.
4. Remove elements until each one has room around it.
5. Centre the main element on the vertical axis.
6. Lay out first; animate only after the still looks clean.
7. Keep motion short and eased; shadows barely visible.

## AGENT_EXECUTION
Frame brief: Decision → "centred card, 1 headline (Inter Display bold) + 1 subline (regular), 120 px margins";
Not generic because → the content is the episode's literal number/step. Use kit `ui.tsx` (`SANS = "Inter Display"`, `C`
palette, `Card`) instead of SF Pro (Apple's font licence restricts use to Apple platforms; the house face is Inter).

### Worked example
Topic: step 1 of "cara simpan RM10 sehari" — RM10 × 30 days = RM300 (plain arithmetic; generic savings app UI).
- BEFORE: a busy screen with 6 icons, three colours, left-aligned text.
- AFTER: light-grey ground, one centred rounded card: "Simpanan bulan ni" (bold) / "RM300" (regular, accent on RM300),
  generous margins; the card rises in 0.4 s.

### Check
- Is the ground neutral and the accent used once?
- Is there one bold + one regular weight only?
- Is the main element centred with clear margins on all sides?
- Would the frame pass as a clean still before any motion?

## NOTES
- Visual gaps: the palette hex codes were a free linked download — not in the transcript, not recovered.
- Skipped: news/iPhone Pocket montage and mentorship pitches (filler); STT "naughty Hua method", "track clients" ignored.

## ADDENDUM — Master SaaS Motion Graphics in 30 Minutes
Source: "Motion Feel, Easing & Camera Choreography/Master SaaS Motion Graphics in 30 Minutes.txt" — 00:34–03:23.
- Jittered four-colour gradient background kills banding and adds grain in one step: a 4-Color Gradient effect
  (off-white/light-blue tones) with Jitter set to 100% — "to make sure I don't have any bending [banding]; this will
  also add a bit of noise to it, which I actually like." Jitter-as-grain replaces a separate grain/noise pass.
- Soft-card recipe for the UI panel itself: rounded rectangle, full-white fill, light grey stroke, roundness ~60 (of
  max), drop shadow very soft (size way up, angle 90°, opacity ~5%, offset slightly below), optional inner glow
  (white, large size, low opacity) for an ambient lit-from-inside look.
| parameter | Apple Style Animation Guide (principle) | Master SaaS Motion Graphics (AE, exact) | recommended for Style D |
|---|---|---|---|
| ground | neutral white/black/grey | off-white 4-colour gradient, jitter 100% for grain/no-banding | neutral ground + subtle grain via dither/noise, not a flat fill |
| panel | rounded corners | roundness ~60 (of max), white fill, light grey stroke | rounded corners per house style, same proportions |
| shadow | "very subtle" | size large, angle 90°, opacity ~5%, offset slightly below | keep ≤5% opacity, soft and wide, never a hard/dark shadow |
| extra glow | not mentioned | inner glow: white, large size, low opacity, for an ambient lift | optional — only if the card needs to look lit from inside, single neutral colour |
