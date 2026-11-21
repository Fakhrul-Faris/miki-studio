---
title: Toon-shaded 3D stand-in for inanimate objects hard to hand-animate
bucket: 01_Animation_Motion
source: "Motion Feel, Easing & Camera Choreography/Japanese Studios CG 2D Animation.txt"
source_time: "02:13–02:30"
tool_target: raea
tier: principle
use_when: "an inanimate object needs to move in accurate perspective across a shot (a vehicle, a mechanical prop, a falling object) that would be hard or slow to hand-draw frame by frame"
style_fit: "Directly matches Style D: our hero objects already are real 3D props rendered with a flat/graphic lean when needed — this names the reason (perspective accuracy for a moving rigid object beats hand-drawn-per-frame), not a new build step."
---

## METADATA
01_Animation_Motion | Japanese anime CG pipeline (Blender, toon shaders) | raea flat/cel-leaning material on a 3D prop

## CREATIVE_INTENT
Rigid, inanimate objects that must move in correct perspective (a car turning, a mechanical arm) are animated in 3D
with a toon/cel shader rather than hand-drawn frame by frame, because 3D guarantees perspective accuracy across the
move for free, while a human-drawn object would need to be redrawn correctly from every new angle. The toon shader
keeps the object visually matched to the surrounding hand-drawn 2D art rather than reading as photoreal CG.

## STE_PROCEDURE
1. Identify which objects in a shot are rigid/inanimate but need to move in accurate changing perspective.
2. Build/animate those specific objects in 3D rather than by hand, to get perspective correctness automatically.
3. Shade them with a flat/toon (cel) shader matching the surrounding 2D art's value structure, not a photoreal material.
4. Leave organic/performed elements (characters acting) to hand-drawn or other methods — this technique is for inanimate objects only.

## AGENT_EXECUTION
In raea, for a hero prop that must move through a complex perspective change, use a flat-leaning `StandardMaterial`
(low specular variance, hard-edged light falloff, or a toon-step on the key light) on the real 3D model, rather than
trying to fake the same move as a 2D sprite/plane.
```tsx
<Model src={staticFile("delivery_cart.glb")} transform={...moves through a perspective turn...} />
<StandardMaterial base_color="#..." metallic={0} roughness={0.9} /> {/* flat/toon-leaning, not photoreal */}
```
### Worked example
Topic: a trolley/hand-truck rolling and turning toward camera at a loading bay (illustrative, Style D macro prop).
BEFORE: try to fake the turn as a 2D flat cut-out, which breaks perspective once it rotates past a certain angle.
AFTER: the trolley is a real 3D model moved through the turn, so perspective stays correct at every angle, shaded flat to match the rest of the scene's graphic language.
### Check
- Is the object rigid/inanimate (not a performed figure), and does its move require changing perspective?
- Is 3D used specifically because hand-drawing the perspective change would be harder, not as a default?
- Does the shader stay flat/graphic rather than reading as photoreal CG dropped into a 2D scene?

## NOTES
- Visual gaps: no specific example object/shader values are given beyond the general statement — this is stated as
  a principle in speech, not demonstrated with a concrete walkthrough.
