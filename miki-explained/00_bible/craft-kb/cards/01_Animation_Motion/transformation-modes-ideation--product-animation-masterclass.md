---
title: Transformation modes for idea generation (X becomes Y, movement, combination, subtraction, creation, destruction, unity, separation)
bucket: 01_Animation_Motion
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "3:26:49–3:34:40"
blender_version_source: 4.3
tool_target: principle-only
tier: principle
style_fit: Direct fit with Style D "objects change state on the words" — a checklist for choosing each beat's state change.
---

## METADATA
01_Animation_Motion | n/a | principle-only

## CREATIVE_INTENT
Principle: every product-animation idea is a transformation "X becomes Y". Ideas per mode:
- Transformation: a can becomes fluid; a letter becomes a number; a blue can becomes orange.
- Movement: move/rotate/slide/fall/wobble/turn — look at your own hand's motions; keep it simple.
- Combination (X + Y): add fluid to a can; add growing geometry-nodes detail while it moves.
- Subtraction: remove an icon from a screen, drain colour to B/W, a light backing away, an object leaving frame.
- Creation (from nothing): scale pop-in; reveal from behind a sliding object.
- Destruction (to nothing): explode/destroy the object's recognisable form.
- Unity: separate parts come together (blob → headphones; assembly animations).
- Separation: the whole divides into its parts (exploded view of a mechanism).
Modes stack: move while changing colour, separate and rebuild as something else, smash two products into a new one.

## STE_PROCEDURE
1. For each script line, write the beat as "X becomes Y" in one sentence.
2. Pick the mode that matches the line's verb (gain → combination/creation; loss → subtraction/destruction; "made of" → separation; "together" → unity).
3. Add one movement mode to carry the camera or object between setups.
4. Check the state change lands on the spoken word.

## AGENT_EXECUTION
- Blender/raea mapping: creation = grow-in from scale ~0 with fade (`interpolate` → `withScale`); subtraction = fade
  `base_color` alpha with `alpha_mode="Blend"`, or colour → grey via `animate={{ base_color: track(...) }}`; separation =
  per-part `Entity` offsets along an exploded axis; unity = the reverse; transformation = cross-fade two named parts or a
  colour track; liquid = `<Goo>` (`liquids.md`).

## NOTES
- Deprecated: none.
- Visual gaps: examples shown on screen (headphones blob, quick explode) are not described in detail.
- Rule conflicts: "destruction / quick explode" must stay calm (no flashy burst); everything else is compatible.
