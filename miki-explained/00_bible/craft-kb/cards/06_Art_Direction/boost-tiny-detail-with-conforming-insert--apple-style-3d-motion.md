---
title: Make a tiny product detail readable — a flat white insert conformed to the surface
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/Apple-Style 3D Motion Design.txt"
source_time: "19:30–20:37 (power indicator), 24:36–24:40 (removed when no longer visible)"
tool_target: frame-brief
tier: full
use_when: "a macro setup where the line names a small part (LED, button, QR corner, price digit) that is too faint on a phone"
style_fit: Fits — clarifies what the line literally names; can carry the one accent (emissive) when the line is about that part; must sit on the object, not float.
---

## METADATA
06_Art_Direction | After Effects 3D (source) → Blender model tweak or raea primitive parented to the model | frame-brief, raea

## CREATIVE_INTENT
"I want to make the max power indicator a little more visible": the author adds a thin white cylinder, turns off its
extra 3D controls, flattens it, scales it until its circle lines up with the indicator, tilts it to follow the curved
surface, and parents it to the model so it moves with it. It is trimmed away once the camera angle no longer shows it.

## STE_PROCEDURE
1. Identify the detail the line is about and check it on a phone-size still.
2. If it does not read, add a thin flat disc/plate over it, white (or the accent if the line is about it).
3. Scale it until its outline lines up exactly with the real detail.
4. Rotate it to follow the local surface curvature.
5. Parent it to the hero so it moves with every push and turn.
6. Remove it from the setups where the angle hides the detail.

## AGENT_EXECUTION
Frame brief: Eye → "the indicator dot"; Not generic because → "the exact part the line names, made readable".
raea: a `Cylinder` with tiny `half_height` inside the hero's `Entity`, emissive only when it is the accent:
```tsx
<Entity transform={heroT}>{/* hero Model */}
  <Mesh3d name="indicator" transform={Transform.fromXyz(0.11, 0.04, 0.152).withRotation(Quat.fromEuler("XYZ", Math.PI / 2 - 0.12, 0, 0))}>
    <Cylinder radius={0.006} half_height={0.0004} />
    <StandardMaterial base_color="#ffffff" emissive={LinearRgba.from(Srgba.hex("#ff3b30")).mul(accentOn ? 4 : 0)} />
  </Mesh3d>
</Entity>
```
Fade it with the setup (opacity/scale over ~0.4 s), never pop.

### Worked example
Topic: a phone's battery "saver" toggle at a kedai handphone (generic shop).
- BEFORE: wide macro of the phone; the tiny green charge LED is 4 px on a phone screen — the line "lampu hijau" shows nothing.
- AFTER: a flat disc conformed to the LED, accent-lit on "lampu hijau", parented to the phone through the push; dropped
  in the next setup where the LED faces away.

### Check
- Does the named detail read at phone size in the still?
- Is the insert exactly aligned and following the surface (no floating sticker)?
- Is it parented so it never slides during moves?
- Is it removed where the angle can't see it?

## NOTES
- Visual gaps: the exact cylinder settings ("turn all three of these controls off") are visual only.
