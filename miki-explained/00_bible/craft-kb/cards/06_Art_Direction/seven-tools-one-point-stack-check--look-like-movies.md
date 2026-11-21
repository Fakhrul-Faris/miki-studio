---
title: Seven-tool stack check — all tools point to one point, then squint
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/Why Your Videos Don't Look Like Movies Yet.txt"
source_time: "00:01–00:48, 06:38–08:20"
tool_target: board-check
tier: full
use_when: "board check on every still before preview; also when a frame 'feels dead' and you can't say why"
style_fit: "Extends RECIPE-D §7 board check with a composition audit; no conflicts."
---

## METADATA
06_Art_Direction | general (Genery video essay) | board check

## CREATIVE_INTENT
The opening shot: you find a man "in less than a second, even though he's less than half a percent of the frame"; shift
the frame — "same statues, same light, same man" — and it is "a random snapshot". Seven tools: **point, lines, space,
balance, frame, depth, light** (colour as light's strongest form). In the good frame all seven point to the man; in
the shifted one a statue profile pulls the eye away and the weight tips: "the tools argue and the shot is dead."
Ask "Where will they look first, and what will they feel?" Then check all seven lead to one point. "The fastest test,
squint. Whatever you can still see, that's where they'll look first." Rule-breaking is fine when deliberate.

## STE_PROCEDURE
1. Before checking, write the setup's answer to "where do they look first?" and "what do they feel?".
2. Point: is there exactly one focal point?
3. Lines: do edges and lines lead to it (none pulling away)?
4. Space: does the empty space match the feeling?
5. Balance: is visual weight balanced, or tipped on purpose?
6. Frame: does an inner frame (if any) surround the focal point?
7. Depth: are foreground/midground/background layered, with the focal point in its own layer?
8. Light/colour: is the brightest contrast and the accent on the focal point?
9. Squint: blur the still; the first visible blob must be the focal point.
10. If any one tool pulls away, fix that tool before preview.

## AGENT_EXECUTION
Add a `7-tool` row to the board check for each still: `P L S B F D Li` with ✓/✗ and a squint result. Squint test on a
still:
```bash
ffmpeg -v error -i out/s05.png -vf "gblur=sigma=24" -frames:v 1 out/s05_squint.png
```
Look at `s05_squint.png`: the brightest/most contrasting blob must sit on the focal point. A ✗ names the fix (e.g.
"Lines ✗: counter edge leads off frame → rotate camera 8°").

### Worked example
Topic: "Kalau korang nak tahu duit QR dah masuk, ni caranya. 3 step je." (how-to; DuitNow QR is real).
- BEFORE board still: phone on the counter showing the notification; a bright kuih tray in the corner; counter edge runs off to the right.
- AFTER check: P ✓ (notification) · L ✗ counter edge leads away → camera rotated so the edge points at the phone · S ✓ · B ✗ tray outweighs → tray darkened · F ✓ (phone bezel frames the text) · D ✓ · Li ✓ accent on "RM12.50 diterima" (illustrative) · squint ✓ phone screen first.

### Check
- Are all seven tools marked ✓ or deliberately ✗ with a reason?
- Does the squinted still show the focal point first?
- Is the "what will they feel" answer supported by space, balance and frame?

## NOTES
- Set-1 related: `masters/05_Camera_Raea_Pipeline/leading-lines.md`, `masters/05_Camera_Raea_Pipeline/foreground-framing.md`, `cards/06_Art_Direction/frame-within-a-frame--camera-angles-8-shots.md`, `masters/04_Shading_Lighting/darkness-guides-the-eye.md` (squint).
- Visual gaps: the statue shot (00:01–00:24, 07:04–07:33) needs the footage to compare the shifted frame.
