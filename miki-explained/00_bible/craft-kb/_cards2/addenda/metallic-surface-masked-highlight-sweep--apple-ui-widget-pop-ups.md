# Addendum → cards/06_Art_Direction/metallic-surface-masked-highlight-sweep--apple-style-3d-motion.md
Source: "Minimalist Tech & SaaS 3D Staging/How to Create Viral Apple-Style UI Widget Animations in After Effects! (Apple Masterclass Part 2).txt" — 17:16–18:02

## Variant: a Light Sweep effect (not a masked ellipse) crossing a whole UI card as it rises, timed to the rise's peak
A built-in "Light Sweep" effect (rather than a hand-built blurred-ellipse-plus-matte) is applied directly to the UI card
layer: its width is increased so the band is broad, both edge-softness controls toned down to ~15, and edge thickness
lowered to ~3 (a tighter, cleaner-edged band than the default). The sweep's center position is keyframed starting off to
one side, ending having crossed to the far side, with the key timed so the crossing happens exactly as the card's own
bounce-in animation peaks — light and motion land together, not independently.

## VALUES BY SOURCE row
| parameter | Apple-Style UI Widget Animations | recommended for Style D |
|---|---|---|
| tool | built-in Light Sweep effect | CSS mask-position sweep (as the master card's flat-UI fallback) |
| width | increased (no exact %) | wide enough to cross the card in one pass, ≥ 0.4 s |
| edge softness | ~15 (both edge controls) | soft enough to avoid a hard line, tune on a still |
| edge thickness | ~3 | thin, crisp band |
| timing | sweep crossing lands exactly on the card's bounce-in peak frame | cue the sweep's midpoint to the element's own entrance peak frame, not an independent cue |

## AGENT_EXECUTION note
Confirms the master card's existing flat-UI fallback (masked gradient sweep via CSS) is the right target; the new
detail worth keeping is the **timing coupling** — don't cue the highlight sweep on its own word/frame, derive its
midpoint from the same `at`/peak frame already driving the element's entrance animation so the two always land together.
