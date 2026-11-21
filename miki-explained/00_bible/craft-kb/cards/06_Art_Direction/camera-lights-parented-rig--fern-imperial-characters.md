---
title: Parent camera + all lights together for a consistent swap-subject rig
bucket: 06_Art_Direction
source: "3D Documentary Explainer Breakdowns/How to Make 3D Characters Like Fern and Imperial.txt"
source_time: "17:10–20:38"
tool_target: raea
tier: principle
use_when: "building a lighting/camera rig that will be reused across several hero objects in the same episode or across episodes"
style_fit: "Fits Style D's repeatable 'new setup every 2–3 s' rhythm: one lighting rig stays correct no matter which hero prop drops into it, instead of relighting per object."
---

## METADATA
06_Art_Direction | Blender (Ctrl+P → Object parenting) | raea scene-graph parenting

## CREATIVE_INTENT
Build the camera and every light as children of one parent (or of the camera itself), so moving or swapping the
rig keeps the lighting relationship — rim, fill, key — identical relative to whatever subject sits at the origin.
The author builds a rim + fill + key set once, then drops in a new character under the same rig without relighting.

## STE_PROCEDURE
1. Place the camera and all lights relative to a subject at the world origin.
2. Select all lights, then shift-click the camera last (so it becomes the active/parent object).
3. Ctrl+P → Object, to parent the lights to the camera.
4. Moving the camera now moves the lighting with it, staying consistent for any object placed at the origin.
5. To light a new subject, delete/hide the old one and place the new one at the same origin point — no relight needed.

## AGENT_EXECUTION
In raea, group the camera and its lights under one parent `Transform`/entity so repositioning the rig between
setups (or across episodes reusing the same light recipe) moves everything together.
```tsx
<Entity transform={Transform.fromXyz(0, 1.2, 2.2).lookingAt([0, 0.3, 0])}>
  <Camera3d />
  <SpotLight transform={Transform.fromXyz(-0.4, 0.6, -0.8)} intensity={...} />   {/* rim, relative to the camera */}
  <RectLight transform={Transform.fromXyz(0.5, 0.3, 0.5)} width={0.6} height={0.6} intensity={...} range={...} /> {/* fill */}
</Entity>
```
### Worked example
Topic: Style D's recurring top-light + rim rig, reused across different hero objects in one episode (illustrative).
BEFORE: relight each new setup from scratch when the hero prop changes (a receipt, then a coin stack, then a QR code).
AFTER: one camera+lights rig built once at the origin; each new setup just swaps the object sitting under the
same rig, so lighting consistency across cuts is guaranteed, not re-eyeballed per shot.
### Check
- Are the camera and every light parented to one common entity/transform?
- Does swapping the hero object under the rig keep the same key/rim/fill relationship without relighting?
- Is the rig still obeying the single soft top light rule (this groups lights, it doesn't add extra ones)?

## NOTES
- Visual gaps: exact light power/radius values were tuned by eye on screen (~100–250 W point lights); not stated precisely.
- This is a workflow/rig technique only — it carries no figure or material content, so it has no conflict with house rules.
