---
title: Mirror the art style in the motion style, then bleed deliberately ("cartoon diamond")
bucket: 01_Animation_Motion
source: "The Illusion of Animation.txt"
source_time: "28:00–35:00"
blender_version_source: n/a (conference talk)
tool_target: principle-only
tier: principle
style_fit: strong — real macro objects (reality-side look) must move like real objects; the diagram layer may sit further toward stylized; flags "disconnects" before they ship
---

## METADATA
01_Animation_Motion | n/a | principle-only

## CREATIVE_INTENT
Principle: put the art-style triangle and the motion-style triangle back to back (the "cartoon diamond") to place a film on both at once. Most films that work mirror: motion sits where the look sits, then one bleeds a little — Coco's look bleeds toward reality while its motion bleeds toward stylized; stop-motion details (fingerprints) bleed far toward reality. Backgrounds and characters can sit in different places (Totoro's painted backdrops vs simpler characters; The Good Dinosaur's real backgrounds vs cartoon characters). A big disconnect between look and motion feels wonky — fine only if intended.
Rule of thumb: if the art style is nailed but the motion style isn't, start by mirroring it, then choose the direction to bleed.

## STE_PROCEDURE
1. Place the episode's look on the art-style map (Style D hero: near reality).
2. Set the motion style to the same place first (real mass, smooth eased moves).
3. Place secondary layers separately (diagram, UI, captions) and give them their own matching motion.
4. Choose one direction to bleed, and only a little (e.g. motion slightly cleaner than real for legibility).
5. Before you sign off, check for disconnects: realistic objects moving cartoonishly, or flat icons moving with heavy physics.

## AGENT_EXECUTION
### Source tool (none)
A conceptual map on slides; no software.
### Blender / raea translation
- Hero object (real surface, macro): eased in-out moves, physically believable speeds; no squash, no overshoot. In raea `interpolate` with `Easing.inOut(Easing.cubic)` or `Easing.inOut(Easing.sin)`.
- Diagram/UI layer (stylized): crisp eased moves on the same ~0.4 s scale; no springs with overshoot.
- Background vs hero: a darker, simpler room behind a highly detailed hero is a deliberate split (like Totoro's inverse); keep it consistent across the whole episode.
- raea: no equivalent (judgement framework). Run the fresh-critic skill and ask specifically "does any layer's motion disagree with its look?".

## NOTES
- Deprecated: n/a.
- Visual gaps: the diamond diagram and where each film sits on it are slides only.
- Rule conflicts: none; the "disconnected" corner (e.g. the short "going to the store" example) is not a target for us.
