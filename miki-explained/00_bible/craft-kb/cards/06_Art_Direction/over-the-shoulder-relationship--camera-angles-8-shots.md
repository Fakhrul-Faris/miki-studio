---
title: Over-the-shoulder — one foreground element ties two subjects together
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/How Camera Angles Control What We Feel 8 Essential Shots | Visual Storytelling.txt"
source_time: "01:50–02:41"
tool_target: shot-list
tier: full
use_when: "a line sets two things against or toward each other (seller vs buyer, your price vs competitor's, phone vs QR stand)"
style_fit: "⚠ conflict: OTS uses a person's shoulder; Style D has no people → adapted as an over-the-object shot: a blurred edge of object A in the near foreground, looking toward sharp object B. Fits foreground-framing and DoF rules."
---

## METADATA
06_Art_Direction | general (live-action film) | shot-list setup, frame brief "Idea", raea Camera3d + DepthOfField

## CREATIVE_INTENT
Look past one character toward the other. The shoulder connects both people in a single visual relationship — the
shot is about the pair, not either one alone.

## STE_PROCEDURE
1. Use it when a line links two subjects (A acts on B, A compared to B, A faces B).
2. Put subject A's edge in the near foreground, filling ~20–35 % of one side of the frame.
3. Aim past A at subject B, in focus, inside the 25–60 % band.
4. Blur A with shallow DoF (~f/2) so B reads first.
5. Put the accent on whichever subject the line is about.
6. For the reverse line, flip to look past B at A from the opposite side (keep the same screen sides).

## AGENT_EXECUTION
Shot-list cell: `over-the-object: blurred phone edge left fg, QR stand sharp right`. raea: camera behind and beside A,
lookingAt B, DoF on B.
```tsx
<Camera3d transform={Transform.fromXyz(-0.12, 0.10, 0.35).lookingAt([0.05, 0.08, -0.25])}
  projection={{ Perspective: { fov: (40 * Math.PI) / 180 } }}>
  <DepthOfField focal_distance={0.63} aperture_f_stops={2.0} />
</Camera3d>
```
(~ values; A sits ~0.15 m in front of the lens.)
### Worked example
Topic: "Terima QR di gerai: apa pelanggan nampak" (illustrative).
- BEFORE: two separate setups — the phone alone, then the QR stand alone; the link is lost.
- AFTER row: `| 6 | "Pelanggan scan, duit masuk terus ke akaun korang" | over-the-object: customer's phone edge
  blurred left fg, QR stand sharp right | on "scan" phone screen glows (accent); on "masuk" RM 12.50 slides up on the
  stand's card | over-the-shoulder-relationship |`
### Check
- Does the line link two subjects?
- Is A a blurred foreground edge and B sharp in the subject band?
- On a reverse, do both objects keep their screen sides?

## NOTES
- Visual gaps: the film clip is not described.
- Related set-1 master: `masters/05_Camera_Raea_Pipeline/foreground-framing.md` (blurred foreground for depth); OTS adds
  the relationship meaning and the reverse-angle rule.
- ⚠ No people/hands in Style D.
