---
title: Colour-key a screen recording's flat background out so it drops cleanly onto a UI card
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How To Master Shape Morphing For Apple Ui Style – Full After Effects Tutorial.txt"
source_time: "29:01–29:19, 29:35–29:54"
tool_target: principle-only
tier: principle
use_when: "an episode embeds a real captured screen recording (an actual app's play-button / waveform UI) instead of a code-built one, and its flat background needs to vanish"
style_fit: "⚠ Style D/UI-heavy scenes build UI natively in raea, so there is normally no footage to key. Keep only for the rare case of embedding a genuine third-party screen recording (e.g. showing the real TNG/DuitNow app flow) where raea cannot redraw the exact interface."
---

## METADATA
09_UI_Motion | After Effects Color Key / Keylight-style colour picker (source) → raea: avoid footage, or luma/chroma key | principle-only

## CREATIVE_INTENT
A screen recording (a play/pause button, an audio waveform) was captured against a plain white background. Rather than
mask it by hand, a colour-key effect samples that white and removes it, letting the recording's foreground elements
(button, waveform) sit directly on the episode's own coloured panel.

## STE_PROCEDURE
1. Before keying, confirm the recording's background is a single flat, even colour (white works best; avoid gradients).
2. Sample that exact colour with the key effect's eyedropper.
3. Check edges for a colour fringe at the cutout boundary; tighten tolerance if the foreground gets clipped.
4. Place the keyed layer over the episode's own panel colour.

## AGENT_EXECUTION
raea has no footage-keying step by default — this only applies if a real external recording must be embedded as-is:
```tsx
// Only when embedding real captured footage (rare): key a known flat background colour per pixel
// (do this once at import time, not per frame, and cache the result as a transparent-PNG sequence)
```
Prefer building the UI element natively (the real logo/brand chrome on a code-drawn panel) over keying footage — it
keeps the flat UI look consistent and avoids compression/fringe artefacts. Flag in the frame brief's Handover whenever
real footage is used: "embedded recording, background keyed — verify no fringe on export".

### Worked example
Topic: showing the real bank app's transfer-confirmation screen inside a Style D phone shot (illustrative data on screen).
- BEFORE: a screen recording of the confirmation screen sits in its own white-bordered rectangle, visibly a separate clip.
- AFTER: the recording's white ground is keyed out so only the confirmation card appears, sitting flush on the
  episode's own panel colour as if it were drawn there.

### Check
- Was a native raea build considered first, before reaching for captured footage?
- Is the keyed background a single flat colour (not a gradient, which keys unevenly)?
- Are the cutout edges free of a colour fringe at full export resolution?

## NOTES
- Visual gaps: exact key tolerance/edge settings are on-screen only.
- AE dropped: Color Key effect and its tolerance/edge controls; raea's working equivalent is simply not to use footage
  for UI — build the interface in code so there is nothing to key.
