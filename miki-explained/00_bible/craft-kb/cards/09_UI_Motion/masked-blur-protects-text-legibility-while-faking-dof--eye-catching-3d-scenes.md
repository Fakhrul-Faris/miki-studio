---
title: Masked blur fakes selective depth-of-field while keeping text/icons legible
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/How to actually make eye-catching 3D Scenes | After Effects.txt"
source_time: "12:56–14:13"
tool_target: raea
tier: full
use_when: "a setup needs background/foreground blur for depth, but the blurred zone would otherwise swallow a caption, icon, or UI label"
style_fit: "Directly useful for UI-heavy episodes (80/20 interface scenes): the real hero stays legible while depth cues still read."
---

## METADATA
09_UI_Motion | After Effects compositing (general, raea-portable) | raea masked blur pass

## CREATIVE_INTENT
A real camera aperture/focus-distance blur looked good on the background but made the on-screen text and icons
unreadably blurry too. Rather than accept that trade-off, the real DoF pass was disabled and replaced with a separate
masked blur layer — a blurred duplicate confined to a rectangle mask, feathered, and placed only over the region that
needs softening (the horizon/background), so text and icons outside the mask stay sharp.

## STE_PROCEDURE
1. If camera DoF blurs a UI element or caption you need to read, disable the camera-based DoF.
2. Duplicate the frame as a blur layer (box/gaussian blur) instead.
3. Mask the blur layer to only the region that should look soft (background, horizon) with a simple shape mask.
4. Feather the mask edge so the blur doesn't have a hard boundary.
5. Lower the masked blur's opacity if the transition between sharp and soft reads too abruptly.

## AGENT_EXECUTION
raea: render (or composite) a blurred duplicate pass and clip it with a feathered mask shape over only the background
region; keep all UI/text/icon layers on the unblurred pass, e.g. `skip={["ui","caption"]}` pattern already used for
`<Grade>`/`<LensDistortion>` so text-carrying layers never receive the blur.

### Worked example
Topic: a phone-banking app screen showing a transfer fee breakdown.
BEFORE: camera DoF set to focus on the fee line blurs the background app UI behind it into an unreadable smear that
also catches the edge of the fee text itself.
AFTER: DoF disabled; a masked, feathered blur covers only the area behind/below the phone screen (the dark room), while
the entire phone UI — including the fee text — stays pixel-sharp.

### Check
- Is every text/icon/caption layer excluded from the blur mask?
- Does the masked region have a feathered edge, not a hard blur boundary?
- Would disabling camera DoF entirely still leave the intended depth cue (soft background) in place?

## NOTES
- Visual gaps: the exact feather/opacity values are set by eye on screen, not stated as numbers.
- Rule conflict: none — actively supports the house rule that UI/captions stay crisp.
