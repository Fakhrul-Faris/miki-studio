---
title: Overlay transition — an element rises to cover the frame (or moves away to reveal)
bucket: 09_UI_Motion
source: "Motion Feel, Easing & Camera Choreography/High End SaaS Video Transitions.txt"
source_time: "02:46–04:02"
tool_target: raea
tier: full
use_when: "going from a physical setup or logo into an app screen, or swapping one UI state without changing scene"
style_fit: "Fits: built from the scene's own object (phone, card, receipt); eased rise ≥ 0.4 s; vary execution each use."
---

## METADATA
09_UI_Motion | general → raea | shot-list join + raea

## CREATIVE_INTENT
"Place one element on top of another. Either bring a new element up from the bottom or top to cover the screen, or
move the existing element away to reveal what's hiding behind it." Client video: after the logo, "instead of a hard
cut or dissolve, which would have looked generic", a smartphone rose from the bottom, covered the entire frame, "and
boom, we are inside the app". Another sequence overlays one UI element over text to move on without changing scene.
It "never breaks the flow"; use it several times but "give every overlay a slightly different execution".

## STE_PROCEDURE
1. Choose the covering element from B's world (phone, card, receipt).
2. Start it off-frame (bottom or top).
3. Move it up until it fills the frame, eased in-out, ~0.5–0.8 s.
4. Cut to B inside that element (its screen/face is B).
5. Or reverse: move A's element away to reveal B underneath.
6. Before reusing, change direction, element or speed.

## AGENT_EXECUTION
raea: camera fixed; phone model y from below frame to filling it with `Easing.inOut(Easing.cubic)`; at full cover,
switch the composition to the UI screen scene. Log each overlay's variant (direction/element) in the shot list.

### Worked example
Topic: "Nak terima tempahan nasi kerabu guna WhatsApp Business — 3 step" (generic, no feature claims beyond catalogue/labels).
- BEFORE: `| 3 | "Ni caranya, tiga step je" | macro of the nasi kerabu plate | cut to app screen |`
- AFTER: `| 3 | "Ni caranya, **tiga step** je" | macro on the plate | a phone rises from the bottom over 0.6 s, eased, fills the frame on "tiga step" | overlay-rise |` → `| 4 | "Step satu, buat katalog" | inside the phone: catalogue screen | first item card slides in | — |`; later overlay variant: an order slip slides down from the top to cover.

### Check
- Is the covering element from B's world?
- Is the rise eased and ≥ 0.4 s?
- Is each overlay in the episode a different variant?

## NOTES
- Client frames visual only.
