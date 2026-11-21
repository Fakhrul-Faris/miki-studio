---
title: Point-of-view shot — the viewer sees what the customer sees
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/How Camera Angles Control What We Feel 8 Essential Shots | Visual Storytelling.txt"
source_time: "01:50"
tool_target: shot-list
tier: full
use_when: "a line addresses 'korang' doing something (reading a price tag, scanning a QR, checking an app) — put the viewer in that seat"
style_fit: "⚠ conflict: POV is a character's eyes; Style D has no people/hands → adapted as an implied POV: camera at a standing customer's eye height (~1.6 m scale) or phone-in-hand angle, looking at the object, with no body in frame."
---

## METADATA
06_Art_Direction | general (live-action film) | shot-list setup, frame brief "Feeling"

## CREATIVE_INTENT
Put the camera where a character's eyes would be. We see the scene as they do and share their attention — the viewer
stops watching the subject and starts being the subject.

## STE_PROCEDURE
1. Use POV when the line is in second person and describes looking or choosing.
2. Place the camera at the eye height and distance that person would have (customer at a counter: above and in front).
3. Aim at exactly what they would look at; nothing else in focus.
4. Keep hands and bodies out of frame (house rule); let the framing imply the person.
5. Add a slight, eased drift (look from tag to tag) instead of handheld shake.
6. Put the accent on the detail the person should notice.

## AGENT_EXECUTION
Shot-list cell: `POV customer, eye height, looking down ~35° at the shelf`. Frame brief "Feeling": "I'm the one
choosing". raea: camera above and in front of the set, looking down at the target; DoF on the noticed detail.
```tsx
<Camera3d transform={Transform.fromXyz(0, 0.45, 0.55).lookingAt([0, 0.1, 0])}
  projection={{ Perspective: { fov: (45 * Math.PI) / 180 } }}>
  <DepthOfField focal_distance={0.62} aperture_f_stops={2.2} />
</Camera3d>
```
(Values ~ for a tabletop set at macro scale; compute focal_distance as camera→target.)
### Worked example
Topic: "Sale ni betul ke tipu? Tengok tag harga" (how-to; illustrative).
- BEFORE: side-on product shot of a shirt with two price tags; the viewer watches a tag.
- AFTER row: `| 3 | "Bila korang tengok tag, cari harga asal dulu" | POV standing shopper, looking down ~35° at a rack
  tag, DoF on the crossed-out price | on "harga asal" the RM 89 line sharpens and goes accent; RM 59 stays grey |
  pov-shot-shared-attention |`
### Check
- Is the line in second person or about the viewer's own look/choice?
- Is the camera at a believable eye position for that person?
- Are hands/bodies absent (Style D)?

## NOTES
- Visual gaps: the film clip is not described.
- ⚠ No people/hands in Style D; in other styles figures hold poses only — never a walking POV.
