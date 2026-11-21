---
title: "Black box" scenes — selective dramatic light over full realism
bucket: 06_Art_Direction
source: "3D Documentary Explainer Breakdowns/The Science of Aesthetic YT 3D Documentaries (Blender tutorial).txt"
source_time: "00:00–01:20, 03:04–03:26"
tool_target: frame-brief
tier: full
use_when: "briefing any setup that depicts a real place (shop, street, bank, mall): deciding what to build and what to leave in the dark"
style_fit: "Validates Style D (dark room, one top light, one hero): build only what the line needs, let the void hide the rest. Source's crowd-duplication step dropped (no people)."
---

## METADATA
06_Art_Direction | Blender (Fern-style documentary recreation) | frame brief "Decision" + build list

## CREATIVE_INTENT
"Everyone thinks the secret to a good 3D documentary is realism, but that's what's holding most creators back." Copying
reality makes you "logical instead of creative" and leads to "too many elements or bad lighting". Black-box scenes use
light "in a very artistic and dramatic way", are "not filled with unnecessary elements" and focus "only on the most
important parts, telling the viewer exactly where they should look" — using what makes 3D special without recreating reality.

## STE_PROCEDURE
1. Before you build a place, write the one element the line is about (the courthouse, not the street).
2. List everything else the real place has; keep only items that help read the line.
3. Set the world background to a dark void (no sky, no horizon).
4. Light the kept element with 1–2 spot lights; let everything outside their cones fall to black.
5. Add a back light linked only to the hero so it separates from the void without lighting the ground.
6. Delete or darken any item that pulls the eye and is not the line's subject.
7. Check the frame reads in 1 s with the void doing the framing.

## AGENT_EXECUTION
Frame brief: Decision "black box: only <hero> + ground"; Eye "<hero>"; Not generic because "the void removes
everything but the line's subject". Build list: hero model (library GLB), ground plane (dark, roughness ~0.3), 1–2
spots, linked back light; nothing else. raea: dark `AbsoluteFill` background, `SpotLight`s with `range`, no
`Environment` background. Source values: ground material roughness 0.3, darkened base colour; spot duplicated to the
opposite side "for more balanced illumination".

### Worked example
Topic: "Bank Negara tak cetak duit sesuka hati" (central bank issues currency — real; no numbers needed).
- BEFORE: a full street model of KL with traffic, trees, buildings, sky; the bank building is one of many.
- AFTER frame brief: Ref Fern opening shot; Idea "the institution alone"; Decision "black box: one neoclassical bank
  façade (library model) on a dark plane, void around"; Eye "the façade's pediment"; Light "two spots left/right,
  back light linked to the façade only"; Moves "on 'tak cetak' camera drifts down ~0.3 m, ease-out"; Handover "the
  door frame becomes the next setup's frame".

### Check
- Does the frame contain only the line's subject plus ground?
- Is the background a dark void with no horizon?
- Could any remaining item be removed without losing the line? (if yes, remove it)
- Does the eye land on the hero within 1 s?

## NOTES
- Set-1 overlaps not repeated: dark world + soft key (`masters/04_Shading_Lighting/black-world-low-key-reveal.md`),
  light-linked back light (`masters/04_Shading_Lighting/light-linking.md`), Track To camera target
  (`cards/04_Shading_Lighting/track-to-constraint-aim-lights--key-to-realistic-renders.md`).
- ⚠ The source fills the courtyard with duplicated low-poly people and camera props; dropped (no people in Style D).
- Subsurface scattering on the building (Cycles) has no raea equivalent; skip.
