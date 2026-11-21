---
title: Snapping — a short contact pose before two objects pass through each other
bucket: 01_Animation_Motion
source: "Procedural Mograph & 3D-to-AI Render Passes/Three motion graphics techniques for your After Effects projects.txt"
source_time: "00:18–02:29"
tool_target: raea
tier: principle
use_when: "an object state change where one thing must pass into/through another (a card into a reader, two price tags swapping) and the line is about friction, resistance or 'it doesn't fit'"
style_fit: "⚠ the source's 'snap through' is a fast release; adapted: the contact hold is a deliberate on-word accent, release eased over ≥ 0.4 s, squash ≤ 5 %, at most once per episode — never a bounce."
---

## METADATA
01_Animation_Motion | After Effects (keyframes, graph editor, path keys) → raea | raea props + shot-list "State change and events" cell

## CREATIVE_INTENT
"Snapping" is the source's twist on the match-cut move. A plain velocity pass-through hides an impossible move (two
closed circles intertwining) by making the middle the fastest point. Snapping does the opposite: it **emphasises the
impossibility and the weight** — "two objects not quite fitting together". The objects meet, pause for a few frames,
deform against each other (contact, friction), then snap through.

## STE_PROCEDURE
1. Key the start position and the end position of both objects.
2. Add a "point of contact" key in the middle, then a "switched positions" key.
3. Move the contact key a few frames earlier (~2–4 frames) so the move breaks before the halfway point.
4. Shape the curve so velocity drops to near zero at contact (the small impact), then grows back slowly.
5. Keep the shape unchanged until just before contact, then squash it at contact (source: path squash; ours ≤ 5 %).
6. Hold the struggle for "just a few frames" (~4–8 frames at 30 fps), then release through.
7. Put one sound on the contact and one on the release (source matches each sound to its action).

## AGENT_EXECUTION
Shot-list: put the contact on the named word. raea: drive position with two clamped `interpolate` segments — segment 1
eased out to the contact frame, a hold of ~6 frames, segment 2 with `Easing.inOut` to the end; scale on the contact
axis `interpolate(f, [c-3, c, c+6], [1, 0.96, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})` (4 % squash).
No `spring` (house: no bouncy springs).

### Worked example
Topic: "Kenapa kad korang kena tolak kat mesin" (illustrative).
- BEFORE: `| 6 | "Kad korang tak lepas" | macro of card sliding into the reader | card slides in, screen shows error |`
- AFTER: `| 6 | "Kad korang **tak lepas**" | low macro on the reader slot | card meets the slot edge on "tak", holds 6 frames squashed 4 %, accent-red rim on the slot on "lepas"; card eases back out over 0.5 s | snapping-contact-pose |`

### Check
- Is there a visible stop (velocity near zero) at the contact, on a named word?
- Is the squash ≤ 5 % and the release eased over ≥ 0.4 s?
- Is it the only snapping beat in the episode?

## NOTES
- AE path-squash keys → raea scale on one axis (no path editing of 3D meshes).
- Exact pose length is visual only; "a few frames" is the source's wording.
- Source pairs every movement with an SFX (sponsor section stripped); house rule: sparse SFX only.
