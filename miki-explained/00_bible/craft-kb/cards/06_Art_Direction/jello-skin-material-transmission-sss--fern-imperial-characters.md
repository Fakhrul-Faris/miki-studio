---
title: "'Jello' material: Transmission + random-walk SSS for a translucent stylized surface"
bucket: 06_Art_Direction
source: "3D Documentary Explainer Breakdowns/How to Make 3D Characters Like Fern and Imperial.txt"
source_time: "16:03–16:56"
tool_target: raea
tier: principle
use_when: "a hero object or material needs a glassy, translucent, slightly glowing read (not photoreal skin/plastic)"
style_fit: "A material recipe only — usable on any Style D macro prop that should read as soft/translucent (e.g. a gummy, a wax candle, a bar of soap), not restricted to figures."
---

## METADATA
06_Art_Direction | Blender Principled BSDF (Transmission + Subsurface random walk) | raea StandardMaterial equivalent

## CREATIVE_INTENT
Pushing a Principled BSDF's Transmission up and adding Subsurface Scattering set to "Random Walk" with a high SSS
weight gives a surface a soft, glassy "jello" look — light passes through and scatters inside it — distinct from
flat opaque plastic or realistic skin. The author uses it deliberately to match a stylized documentary-channel look.

## STE_PROCEDURE
1. Start a new material; set a base colour.
2. Raise Roughness (author used ~2.3 on the stated 0–1-ish dial, i.e. push it high/matte, then eased back ~2.8 after adding transmission — read as "high" by feel, not an exact 0–1 value).
3. Add Transmission and raise it until the surface starts to look translucent ("jello").
4. Set Subsurface Scattering method to Random Walk.
5. Raise the Subsurface Weight a lot until the scattering effect reads clearly, especially in the render view (not just viewport preview).

## AGENT_EXECUTION
Translate to a raea `StandardMaterial` using its transmission/subsurface-equivalent props (consult
`~/.claude/skills/raea-bevy/materials.md` for the exact prop names before use — the source gives relative dial
direction, not raea's parameter scale).
```tsx
<StandardMaterial base_color="#ffcf6b" roughness={0.6} transmission={0.6} /* ~ raise until translucent */ />
```
### Worked example
Topic: a bar of handmade soap as the hero macro object for a small-business episode (illustrative).
BEFORE: a flat opaque `StandardMaterial` — reads like plastic, no softness.
AFTER: transmission raised and a subsurface pass added so the soap's edges glow softly under the top light,
reinforcing the "handmade" feel the line is making.
### Check
- Does the material read as softly translucent on a render, not just flat opaque?
- Is Random Walk (not the cheaper Christensen-Burley) used for the scattering, matching the source's "jello" look?
- Does the effect serve the object the line is actually about, not applied as decoration?

## NOTES
- Visual gaps: the Roughness/Transmission/Weight numbers quoted are the dial values shown on screen at the moment
  described, not a verified final recipe — treat all as `~` starting points to dial in by eye.
- raea's exact material prop names for transmission/subsurface are not confirmed here — check `materials.md` before use.
