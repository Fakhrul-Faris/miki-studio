---
title: Procedural sky texture as the scene's sole key light
bucket: 06_Art_Direction
source: "3D Documentary Explainer Breakdowns/How To Animate Like Imperial (Blender & After Effects Tutorial).txt"
source_time: "10:46–12:12"
tool_target: raea
tier: full
use_when: "an outdoor or window-lit Style D or world-shot setup that needs one soft, directional light with almost no setup"
style_fit: "⚠ conflict: Style D's room is dark with one soft top light, not an open sky → adapted: use this only for outdoor/establishing setups (not the macro-object room), and keep it the single light source, matching the one-soft-top-light rule's spirit."
---

## METADATA
06_Art_Direction | Imperial-style 3D breakdown | Blender World (Nishita/Preetham sky) → raea DirectionalLight + environment tone

## CREATIVE_INTENT
Instead of placing and balancing multiple lights, point the World's background at a procedural sky texture (Nishita for
a realistic sky with real shadows, or the simpler Preetham for a flatter stylised sky) and control direction/brightness
with one rotation dial and one strength slider. One control surface, one light source, consistent soft shadows.

## STE_PROCEDURE
1. Go to World properties; click the colour swatch and switch it from flat colour to a Sky Texture.
2. Choose the sky model: Nishita for realistic elevation-based shadows, Preetham/Preum for a simplified, flatter look.
3. Set elevation/rotation by dragging the sky-direction dial until the shadow direction suits the shot.
4. Raise or lower Strength until the key reads as bright as the shot needs, without a second light.
5. Check: does the whole shot's lighting trace back to this one control, with no extra fill lights fighting it?

## AGENT_EXECUTION
Frame-brief Moves/Decision: name this as the shot's single light source and its direction in plain terms ("low sun,
camera-left"). raea has no sky-texture node; recreate the same one-dial-one-slider control with a single angled
DirectionalLight (or a very wide, soft RectLight for an interior window-sky read) and an ambient/environment tone that
tracks its colour, so moving one prop moves the whole look.

```tsx
const sunDir = Transform.fromXyz(-4, 6, -2).lookingAt([0, 0, 0]);  // one dial: angle sets shadow direction
<DirectionalLight transform={sunDir} color="#fff4e0" illuminance={20000} />
<AmbientLight color="#cfd6e4" brightness={0.15} />  {/* low fill only, never a second key */}
```

### Worked example
Topic: an outdoor establishing shot of a warung before the macro cutaway (illustrative framing only).
BEFORE: three separate lights are placed and balanced by eye to fake daylight.
AFTER: one angled DirectionalLight stands in for "the sky"; rotating it alone resets the whole shot's shadows and mood.

### Check
- Is there exactly one directional light source driving the shot's shadows?
- Does the direction/colour choice match the time of day the line implies?
- Is this kept to outdoor/establishing setups, not substituted for the Style D room's single soft top light?

## NOTES
- Visual gaps: the exact rotation/strength values are set by eye on screen, not spoken (`~`).
- Rule conflicts: Style D's macro-object room uses one soft top light in a dark room, not an open sky; this card applies
  to outdoor or window-facing setups only, kept to a single light source so it does not multiply lights.
