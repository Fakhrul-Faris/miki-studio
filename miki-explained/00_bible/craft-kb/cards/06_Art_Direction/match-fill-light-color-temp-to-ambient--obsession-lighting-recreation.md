---
title: Match a fill light's colour temperature to the scene's ambient so it blends
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/Obsession (2026) - Lighting Recreation in set.a.light 3D @Elixxier.txt"
source_time: "05:18–05:44"
tool_target: raea
tier: full
use_when: "adding any secondary/fill light into a scene with a visible ambient source (sky, screen glow) so it reads as part of the scene, not an added light"
style_fit: "No conflict — a light-authoring detail that supports a believable macro set."
---

## METADATA
06_Art_Direction | set.a.light 3D virtual gaffer (other) | raea light colour

## CREATIVE_INTENT
Match a fill light's colour temperature to the scene's dominant ambient light (daylight sky ≈ 5600K; a tungsten
practical ≈ 2800–3200K) instead of leaving it neutral, so it blends in as if it were already part of the ambience
rather than reading as an inserted light.

## STE_PROCEDURE
1. Before setting a fill light's colour, identify the scene's dominant ambient colour temperature.
2. Set the fill light's colour temperature to that value, not a neutral default.
3. Toggle the fill on/off: it should raise the level in dark areas without shifting their colour.
4. If it still reads as its own light, lower intensity before adjusting colour further.

## AGENT_EXECUTION
raea: set the light's `color` (kelvin-to-rgb) to match the scene's stated ambient. Record the chosen kelvin on the
frame brief's "Decision" line next to the fill light, so future setups in the same scene stay consistent.

### Worked example
Topic: a daytime kedai runcit window display (illustrative).
BEFORE: fill light left at a neutral white default, visibly bluer than the rest of the shot.
AFTER: fill set to ~5600K to match the daylight through the shopfront window; frame brief Decision: "fill: small
RectLight, ~5600K to match the window daylight, 1/5 key intensity."

### Check
- Is the fill light's colour temperature matched to a named ambient source, not left at default?
- Does toggling the fill change brightness only, not the colour cast of the shadows?

## NOTES
- No rule conflict.
