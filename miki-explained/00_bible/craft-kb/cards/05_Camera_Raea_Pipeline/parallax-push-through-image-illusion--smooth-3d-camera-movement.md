---
title: "\"Passing through\" zoom illusion — push a masked foreground card far forward on Z while the matching image zooms past it"
bucket: 05_Camera_Raea_Pipeline
source: "Minimalist Tech & SaaS 3D Staging/Smooth 3D Camera Movement in After Effects Transcript.txt"
source_time: "04:12–04:50 (approx., project-build section: card + photograph pushed on Z, gradient wipe)"
tool_target: raea
tier: principle
use_when: "a camera flight should feel like it physically passes through a photo/screen/panel into the next scene, not just zoom toward it"
style_fit: "Strong fit for a setup join: the camera appears to fly INTO a photo/screen on the object and arrive at the next setup, replacing a hard cut or a generic whip with a built transition from the scene's own objects (house rule: no generic wipes/flashes)."
---

## METADATA
05_Camera_Raea_Pipeline | After Effects (3D-layer parallax + gradient wipe) | raea Z-depth push + crossfade/mask reveal

## CREATIVE_INTENT
A photograph and a separately-masked cut-out of part of that same photo (source: a "card" and "photograph" split by
masking) are placed at different Z depths. As the camera zooms in, the masked foreground piece is pushed so far forward
on Z that it passes behind the camera (out of frame) while the full photo behind it keeps growing to fill the screen —
the two speeds together read as the camera literally flying through the picture, not just zooming toward it. A gradient
wipe on the photograph layer completes the illusion by softening the handoff from "looking at a photo" to "being inside
what the photo depicts".

## STE_PROCEDURE
1. Start from one source image that will become the "into" destination of the flight.
2. Separate a piece of that image (a card, a label, a subject) from the rest by masking, so it exists as its own foreground layer.
3. Place the full photo behind the masked foreground piece at a normal depth.
4. As the camera's zoom-in move begins, push BOTH the masked foreground piece and the photo forward on Z — but push the masked piece much further and faster, so it passes the camera (exits frame) partway through the move while the photo is still arriving.
5. Add a gradient wipe (a soft reveal, not a hard cut) on the photo layer timed to when the masked piece has passed, so the transition from "flat photo" to "the destination scene" is seamless.
6. Ease the whole move as any other camera flight (never linear); the illusion depends on continuous motion, not a cut.

## AGENT_EXECUTION
**raea:** build as two meshes/planes at different Z depths with different push speeds, the destination scene fading in
as the foreground card passes the camera:
```tsx
const t = interpolate(f, [f0, f0 + 50], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
// foreground masked piece: pushes forward MUCH faster, passes the camera around t≈0.6
const cardZ = -0.2 + 6 * t;              // starts just in front of camera's near plane, flies past it
// full photo behind: pushes forward more slowly, still arriving as the card passes
const photoZ = -2 + 2.2 * t;             // slower approach, fills frame near t=1
// destination scene reveal: fades in once the card has passed (gradient wipe equivalent)
const reveal = interpolate(t, [0.55, 0.85], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });

<Mesh3d name="card" transform={Transform.fromXyz(0, 0.2, cardZ)}>…</Mesh3d>
<Mesh3d name="photo" transform={Transform.fromXyz(0, 0.2, photoZ)}>
  <StandardMaterial base_color_texture={staticFile("photo.png")} alpha_mode={{ Blend: {} }} opacity={1 - reveal} />
</Mesh3d>
{/* destination scene fades in under the photo as it dissolves */}
<group style={{ opacity: reveal }}>{/* next setup's objects */}</group>
```
Tune `cardZ`'s multiplier so the masked piece visibly exits frame (passes the camera's near clip) before the reveal
crossfade finishes — the pass-through read depends on that ordering.

### Worked example
Topic: "lihat dalam resit digital" (illustrative; the camera flies through a printed receipt into the digital app view it describes).
BEFORE: `| 6 | "lihat dalam apl" | hard cut from a photo of a paper receipt straight to the app screen | — | — |` — an ordinary cut, no connective motion.
AFTER: `| 6 | "lihat dalam apl" | camera pushes into a macro photo of the receipt; a masked cut-out of its QR code flies past the lens while the photo keeps growing, dissolving into the matching QR code on the phone app screen | QR code passes camera and the app screen resolves on "apl" | parallax-push-through-image-illusion--smooth-3d-camera-movement |`

### Check
- Does the masked foreground piece visibly pass the camera (exit frame via Z, not fade out) before the destination reveal completes?
- Is the whole move eased throughout, with no linear start/stop?
- Does the transition use the scene's own objects (the photo/card itself), not a generic wipe or flash?
- Is the destination scene's reveal a soft crossfade, not a hard cut?

## NOTES
- Visual gaps: the exact Z distances, masked piece shape and crossfade timing are shown on screen, not stated in numbers; all values above are illustrative (`~`).
- Rule conflicts: none — this is exactly the kind of transition "built from the scene's own objects" the house rules ask
  for, in place of a generic wipe/flash/dissolve.
