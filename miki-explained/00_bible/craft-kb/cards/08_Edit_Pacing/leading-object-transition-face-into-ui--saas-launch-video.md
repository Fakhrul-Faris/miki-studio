---
title: Leading-object transition — close out of one object straight into a UI element (never a flash)
bucket: 08_Edit_Pacing
source: "Minimalist Tech & SaaS 3D Staging/Animated SaaS Videos Transcript.md"
source_time: "2:05–3:08"
tool_target: shot-list
tier: full
use_when: "planning the join between two setups, especially a physical setup → a phone/app screen in UI-heavy episodes"
style_fit: "⚠ conflict: the source uses a flash transition 'because I didn't have any leading object' → adapted: always build a leading object; no flashes"
---

## METADATA
08_Edit_Pacing | general | shot-list "Setup and camera" + join

## CREATIVE_INTENT
On "weeks fixing what should have been caught in hours", the film "closes out of his face right into a chat box" — the
shape of one shot becomes the UI element of the next. Earlier, text on the left slides to the right "to create some sense
of motion and… break the pattern". For the logo, he used a flash because he had no leading object, and matched the
speed between the scenes.

## STE_PROCEDURE
1. Before you plan a join, name the leading object: a shape in shot A that can become a shape in shot B.
2. Scale or crop shot A's object until its outline matches the UI element in shot B (card, chat box, button).
3. Match the motion speed and direction across the cut.
4. If no leading object exists, create one: add a prop, label or card in shot A that becomes shot B.
5. Never use a flash, white frame or generic wipe.
6. Use a lateral slide of the frame's text only to break a held pattern, ~0.4 s, eased.

## AGENT_EXECUTION
Shot-list row: in "Setup and camera" write `join: <object A> → <element B>`. raea: animate the outgoing object's
`scale`/clip rectangle with `interpolate(…, { easing: Easing.inOut(Easing.cubic) })` over ~12–18 f (30 fps) to the
incoming element's rect, cross the two layers at matched size and velocity. Camera speed caps (~130°/s, ~40 m/s) apply.

### Worked example
EX45-style "Terima QR di gerai".
- BEFORE: stall counter macro → white flash → app screen.
- AFTER: camera pushes into the printed QR standee on the counter; its white card fills the frame, its rounded corners
  become the phone screen's edge, and the QR code itself becomes the QR shown on the merchant app's screen (join: standee card → app
  screen).

### Check
- Does each join name its leading object?
- Is there no flash, white frame or generic wipe anywhere?
- Do size and speed match across the cut?
- Where the source had no leading object, did we add one?

## NOTES
- ⚠ Flash transition dropped (house rule: transitions built from the scene's own objects).
- ⚠ The source's face-cam is a person; Style D has no people — the "face" becomes any physical hero object.
- Visual gaps: timing and shape of the face→chat-box move are visual only.
