# Addendum → masters/01_Animation_Motion/drag-overlap-chain.md
Source: "Minimalist Tech & SaaS 3D Staging/How To Master Shape Morphing For Apple Ui Style – Full After Effects Tutorial.txt" — 34:45–35:50

## Variant: a row of emoji reveals in sequence via per-layer frame offset, with native motion blur enabled
A row of six-to-seven downloaded emoji layers each get the same "down" entrance (position key), then are sequenced so
each layer's keys sit one consistent frame-distance after the previous layer's ("add one key frame distance in each and
every layer... but always do this in sequence according to the emojis placement") — the same copy/offset idiom as the
master card's overlap cascade, applied to a row of independent UI icons rather than a physical chain/cable. The layer's
native motion-blur toggle (not a plugin) is enabled on the group so the staggered drops carry a soft blur consistent
with the rest of the scene's eased moves.

## VALUES BY SOURCE row
| parameter | Shape Morphing (Apple UI) | recommended for Style D |
|---|---|---|
| offset unit | "one key frame distance" per layer (visual only — not an exact frame count) | 2–4 f @60 fps per item, matching the master's recommended range |
| applies to | independent UI icons in a row (not a physically linked chain) | same stagger idiom works for any repeated row (steps, option list, emoji reaction row) |
| motion blur | native per-layer toggle enabled, no plugin | raea: apply a short directional blur track only on the moving frames, matching shutter angle used elsewhere in the episode |

## AGENT_EXECUTION note
Confirms the master's `spring({ frame: f - i * k, fps })` stagger idiom extends cleanly to "a row of independent icons",
not just physically connected chains — no new mechanism, just a second valid use case worth noting in that card's
`use_when` reasoning.
