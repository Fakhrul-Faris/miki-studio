---
title: One-hex monochrome world — strip every material to a single base colour, background props to plain grey
bucket: 06_Art_Direction
source: "3D Documentary Explainer Breakdowns/How To Edit Like Johnny Harris - 3D Soldiers (in Blender).txt"
source_time: "07:35–10:07"
tool_target: frame-brief
tier: principle
use_when: "briefing a diagram-like or 'x-ray' state frame where texture would distract, or a hero-vs-world contrast frame"
style_fit: "⚠ conflict: Style D wants real surfaces and a dark room; source uses a light-grey world → adapted: use as a state change (world drains to one neutral tone while the hero keeps the one brand accent), dark room kept."
---

## METADATA
06_Art_Direction | Blender materials → raea StandardMaterial | frame brief

## CREATIVE_INTENT
The Johnny Harris 3D-soldier look: delete all materials on the figure and props, add one new material, pick one colour
("a bit of a bluish"), copy its **hex code** and paste it onto every other object (gun, ammo, phone) "so it's exactly the
same colour". Background trees and rocks lose their textures and go white/grey — "you want it to look just really gray";
they will be out of focus anyway, so their quality doesn't matter. Light: a light-grey world colour (not full white —
"really really bright") also lights the scene; Sun angle and strength dialled down.

## STE_PROCEDURE
1. Before the frame brief, pick one hex for the subject group and one neutral grey for everything else.
2. Remove all original materials/textures from subject-group objects; assign the one hex to all.
3. Assign the neutral grey (no texture) to every background object.
4. Keep background objects out of focus; don't spend detail on them.
5. In Style D: make this a state change on the word (texture → mono over ~0.4 s), not the default look.

## AGENT_EXECUTION
raea: lerp each mesh's `StandardMaterial base_color` from its textured look to the neutral (`#3a3a3a`~ in the dark room);
the hero keeps or gains the brand accent. Frame brief "Feeling": "everything else stops mattering". Palette in
`ref_<shot>.md`: neutral grey (world), accent hex (hero), nothing else.

### Worked example
BEFORE: `Idea: show the RM2 bubble tea markup. Decision: full colourful shop counter.`
AFTER (bubble tea kiosk, illustrative): `Idea: of the RM8 cup, only ~RM2 is ingredients. Decision: on "bahan", every
object on the counter drains to one flat grey over 0.4 s; only the tapioca pearls and milk tea stay in the accent; a
counter reads RM2. Not generic because: the colour itself does the subtraction.`

### Check
- Does the subject group share exactly one hex?
- Is everything else one textureless neutral?
- Is the mono switch a timed state change on a named word (Style D), not the whole episode's look?

## NOTES
- Variant in `3D Documentary Explainer Breakdowns/Edit Faceless Video's (like Fern, Neo & Imperial) - Blender Tutorial.txt` (08:55–09:30): table set Pure White, one couch turned red — monochrome set + one accent object.
- ⚠ Light-grey world as bounce fill conflicts with the dark room; not adopted.
- Dropped (Blender ops / people): FBX import scale 0.1, deleting floating bones, Convert-to-Mesh + Origin-to-Geometry to detach the gun, pose-mode re-posing of the soldier (no people in Style D).
- Covered elsewhere: linear push into the cut at frame 100 (`masters/01_Animation_Motion/linear-vs-eased-interpolation.md`); DoF eyedropper (addendum to `masters/05_Camera_Raea_Pipeline/dof-focus-fstop.md`).
