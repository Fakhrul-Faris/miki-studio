---
title: A grid on the key narrows spill so a dark backdrop stays pure black
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/Creative Lighting Set Ups for Portrait Photography in the Studio.txt"
source_time: "02:00–02:25; 03:36–04:17"
tool_target: raea
tier: principle
use_when: "lighting a hero against a black/dark backdrop and spill from the key is lightening it"
style_fit: "Directly supports Style D's dark room requirement."
---

## METADATA
06_Art_Direction | studio photography (general) | raea light cone narrowing

## CREATIVE_INTENT
Fit a grid (egg-crate) onto a softbox/light to narrow its spread so light reaches only the subject, keeping an
unlit backdrop reading as pure black/dark instead of showing visible spill.

## STE_PROCEDURE
1. Before judging a dark backdrop "dark enough", check for visible light fall near the light source.
2. If spill shows, add a grid/egg-crate to narrow the light's beam.
3. Re-check the backdrop near the subject's base, where spill is most visible.
4. Keep the subject's own exposure unchanged — the grid narrows spread, not output.

## AGENT_EXECUTION
raea: narrow the SpotLight's `outer_angle`/`inner_angle` rather than relying on falloff alone, so the lit cone
doesn't reach the backdrop plane; verify with a still render checking backdrop luminance near the subject's base.

### Worked example
BEFORE: a dark backdrop shows a visible lighter patch near the hero's base.
AFTER: `outer_angle` narrowed until the backdrop near the base reads flat black again.

### Check
- Does the backdrop stay dark/flat right up to the subject's base, with no visible light pool?
- Was the fix a narrower beam, not a dimmer light (which would also dim the subject)?
