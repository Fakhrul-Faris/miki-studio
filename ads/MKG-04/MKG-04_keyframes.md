# MKG-04 Gate 9: Keyframes

Six locked stills, start and end for each of the three Seedance segments (see the segment plan). A mid frame is added only if a grip fails in a test render. Route for every segment: first and last frame (I2V from the locked stills).

Attach each listed asset image to the image generator with its prompt. Do not describe the hand, device or backdrop beyond what is written here: the reference images carry them.

## S3 naming (to avoid mixing up file names)

| In these files | Your file name | What it is |
|---|---|---|
| S3-KF-FLOAT | (not made yet) | The laptop floating one hand's width above the desk, first frame of S3A |
| S3-KF-LAND | S3-KF-START-NEW | The laptop landed on the desk at the far-back spot, no hand; last frame of S3A and first frame of S3B |
| S3-KF-END | S3-KF-END_Smart Edit | The laptop at its final position with the hand on the trackpad; last frame of S3B |
| (retired) | S3-KF-START | The old front-on floating still; not used, because its angle doesn't match the others |

## Shared blocks (copy verbatim into every keyframe)

**LIGHTING LOCK**
```
Soft large window-style key light from camera-left and slightly above, neutral 5600K, gentle falloff to camera-right, faint natural vignette, fine sensor grain, true-to-life skin and material texture, slight incidental imperfection (faint dust, tiny reflections). Backdrop is a real light neutral grey seamless paper sweep with a soft natural falloff and soft contact shadows. No stylised grade, no glossy hero lighting.
```

**EXCLUSIONS (all keyframes)**
```
No text, no logos, no UI, no interface on any screen (the screen is perfectly flat chroma-key green #00B140, no glare, no reflections), no thumb or finger touching a screen, no second device, no motion blur baked into the still.
```

## Tier table

| Segment | Keyframes | Tier | Feeds |
|---|---|---|---|
| S1 phone (shots 5a, 5b) | S1-KF-START, S1-KF-END | Start + end | First and last frame of the S1 generation (4 s) |
| S2 tablet (shots 6b, 6c) | S2-KF-START, S2-KF-END | Start + end | First and last frame of the S2 generation (4 s) |
| S3 laptop (shots 7b, 7c) | S3-KF-LAND, S3-KF-END | Start + end | First and last frame of the S3 generation (4 s) |

## S1: phone

### S1-KF-START
```
[KEYFRAME ID] MKG-04-S1-KF-START
[SHOT] 5a (start)
[COMPOSITION] 16:9. Medium-close view from slightly above, camera about 25 degrees above horizontal looking down. The phone floats in the upper-centre of frame, about 45% of the frame height, centred horizontally, one phone-length above the open hand. Open hand in the lower centre of frame.
[CAST IN FRAME] @hand open: right forearm rising from the bottom edge of frame at the centre, palm tilted up about 30 degrees toward the camera, fingers loosely curled and slightly spread, thumb out to the side, ready to receive the device. Nothing touches the phone.
[EMOTION LOCK] Fingers relaxed and still, no tension in the knuckles, no tremor, wrist soft.
[LIGHTING LOCK] (copy the block above, verbatim)
[ENVIRONMENT] @studio A: empty light grey seamless backdrop, centre third empty.
[PROPS IN FRAME] @phone floating and tilted about 30 degrees toward the lens, screen flat chroma-key green facing the camera, no hand on it.
[REFERENCES]
- @image1 - @hand open - controls hand shape, skin, nails and sleeve only - do not use the background.
- @image2 - @phone three-quarter - controls body shape and flat green screen only - do not use the background.
- @image3 - @studio A - controls the space and light only - do not use any people in it.
[CAMERA] 50 mm feel, f/5.6, fine sensor grain.
[EXCLUSIONS] (copy the block above, verbatim)
[FEEDS] MKG-04-S1, first frame (route: first and last frame).
```

### S1-KF-END
```
[KEYFRAME ID] MKG-04-S1-KF-END
[SHOT] 5b (end of the hold, before the push-in)
[COMPOSITION] Same framing and camera as S1-KF-START. The phone is now at the centre of frame, about 50% of the frame height, tilted about 30 degrees toward the lens.
[CAST IN FRAME] @hand back: the same right hand now holds the phone one-handed from below and behind. Thumb along the left edge of the phone, off the screen. Four fingertips curl around the right edge, palm heel under the phone's lower edge. Forearm rising from the bottom of frame at the centre.
[EMOTION LOCK] Grip is loose and steady, fingers relaxed, thumb resting and not pressing, no knuckle whitening.
[LIGHTING LOCK] (copy the block above, verbatim)
[ENVIRONMENT] Identical to S1-KF-START.
[PROPS IN FRAME] @phone held, screen flat chroma-key green facing the camera.
[REFERENCES]
- @image1 - @hand back - controls hand shape, skin, nails and sleeve only - do not use the background.
- @image2 - @phone three-quarter - controls body shape and flat green screen only - do not use the background.
- @image3 - @studio A - controls the space and light only - do not use any people in it.
[CAMERA] Identical to S1-KF-START.
[EXCLUSIONS] (copy the block above, verbatim)
[FEEDS] MKG-04-S1, last frame (route: first and last frame). The push-in and the arc to face-on come from the video prompt, not from this still.
```

## S2: tablet

### S2-KF-START
```
[KEYFRAME ID] MKG-04-S2-KF-START
[SHOT] 6b (start)
[COMPOSITION] 16:9. Medium view from slightly above, camera about 25 degrees above horizontal. The tablet floats in landscape at the upper-centre of frame, about 55% of the frame width, centred horizontally, rotated about 20 degrees counter-clockwise in the image plane and tilted about 25 degrees toward the lens. It matches the phone-to-tablet morph's last frame in size and position. Two open hands wait below it.
[CAST IN FRAME] @hand open (right) at the lower right and @hand L (left) at the lower left, both forearms rising from the bottom edge, palms turned inward and up about 30 degrees, fingers loosely curled, about one tablet-length below the tablet. Nothing touches the tablet.
[EMOTION LOCK] Both hands relaxed and still, symmetric, fingers loose, no tension.
[LIGHTING LOCK] (copy the block above, verbatim)
[ENVIRONMENT] @studio A, as in S1.
[PROPS IN FRAME] @tablet floating, screen flat chroma-key green facing the camera.
[REFERENCES]
- @image1 - @hand open (right) - controls hand shape, skin, nails and sleeve only - do not use the background.
- @image2 - @hand L (left, back of hand) - controls the left hand's skin, nails and sleeve only; the pose comes from the text above - do not use the background.
- @image3 - @tablet three-quarter - controls case shape and flat green screen only - do not use the background.
- @image4 - @studio A - controls the space and light only - do not use any people in it.
[CAMERA] 50 mm feel, f/5.6, fine sensor grain.
[EXCLUSIONS] (copy the block above, verbatim)
[FEEDS] MKG-04-S2, first frame (route: first and last frame).
```

### S2-KF-END
```
[KEYFRAME ID] MKG-04-S2-KF-END
[SHOT] 6c (end of the hold, after the arc to front-on)
[COMPOSITION] Same lens and camera height. The camera has arced round so the tablet is now front-on in landscape, symmetric, centred, about 62% of the frame width. Hands at both sides.
[CAST IN FRAME] @hand back (right) and @hand L (left) hold the tablet one at each side in a relaxed two-handed grip, thumbs on the side bezels only and fully off the screen, fingers curling behind the case. Forearms rise from the bottom edge, symmetric.
[EMOTION LOCK] Grip is even and steady, thumbs resting not pressing, forearms level, no tremor.
[LIGHTING LOCK] (copy the block above, verbatim)
[ENVIRONMENT] Identical to S2-KF-START.
[PROPS IN FRAME] @tablet held, screen flat chroma-key green facing the camera, no glare.
[REFERENCES] Same four as S2-KF-START, with @image1 used as @hand back (right) - controls hand shape, skin, nails and sleeve only.
[CAMERA] Identical to S2-KF-START.
[EXCLUSIONS] (copy the block above, verbatim)
[FEEDS] MKG-04-S2, last frame (route: first and last frame).
```

## S3: laptop

### S3-KF-LAND
```
[KEYFRAME ID] MKG-04-S3-KF-LAND
[SHOT] 7b (start)
[COMPOSITION] 16:9. Eye-level view about 15 degrees above the desk surface, camera at the left of the desk about 25 degrees off the laptop's axis. The open laptop sits on the desk at the centre of frame, about 8% smaller and about 10 cm further back along the desk than in S3-KF-END (it will be pulled toward the camera), hinge level, screen turned toward the camera. It matches the tablet-to-laptop morph's last frame in size and position. The desk surface fills the lower third.
[CAST IN FRAME] No hand in frame.
[EMOTION LOCK] N/A (no person in frame).
[LIGHTING LOCK] (copy the block above, verbatim)
[ENVIRONMENT] @studio B: light grey seamless with the plain pale-oak desk in the lower third, nothing on the desk.
[PROPS IN FRAME] @laptop resting on the desk with a soft contact shadow, open about 110 degrees, screen flat chroma-key green facing the camera, keys blank.
[REFERENCES]
- @image1 - @laptop three-quarter - controls body shape and flat green screen only - do not use the background.
- @image2 - @studio B - controls the space, desk and light only - do not use any people in it.
[CAMERA] 50 mm feel, f/5.6, fine sensor grain.
[EXCLUSIONS] (copy the block above, verbatim; also no key legends)
[FEEDS] MKG-04-S3, first frame (route: first and last frame).
```

### S3-KF-END
```
[KEYFRAME ID] MKG-04-S3-KF-END
[SHOT] 7c (end of the hold, before the push-in)
[COMPOSITION] Same framing and camera as S3-KF-LAND. The laptop now rests on the desk at the centre of frame, soft contact shadow under it.
[CAST IN FRAME] @hand back: the right forearm and hand lie fully on the desk surface, entering from the right edge of the frame at a natural angle with the elbow implied off-frame, palm down and flat, wrist on the desk and level, fingers relaxed and slightly curled, thumb lying beside the index finger. The hand rests lightly on the trackpad with the pad of the index fingertip on it, the other fingers curled loosely beside it and the thumb on the laptop's front edge, nothing pressed and nothing sliding. No finger touches any key. A soft contact shadow lies under the forearm and hand on the desk.
[EMOTION LOCK] Hand at rest, fingers loose and slightly curled, no tapping, wrist neutral, forearm fully supported by the desk.
[LIGHTING LOCK] (copy the block above, verbatim)
[ENVIRONMENT] Identical to S3-KF-LAND.
[PROPS IN FRAME] @laptop resting on the desk, open about 110 degrees, screen flat chroma-key green facing the camera.
[REFERENCES] Attach two images, in this order:
- @image1 - the locked S3-KF-LAND still - this is the base: keep its camera, framing, backdrop, desk and laptop exactly; change only what the text above says.
- @image2 - @hand back - controls hand shape, skin, nails and sleeve only - do not use the background.
(If you generate from scratch instead of editing, attach @laptop three-quarter, @studio B and @hand back, in that order.)
[CAMERA] Identical to S3-KF-LAND.
[EXCLUSIONS] (copy the block above, verbatim). Also: keys are blank and smooth with no legends or symbols, no logo or text mark anywhere on the laptop including the lip below the screen, no corner badge or watermark, no finger on any key, no hand floating above the desk, no fingertip pressing or sliding on the trackpad.
[BUILD] Generate this as an edit of the locked S3-KF-LAND still, not from scratch: keep the camera, framing, backdrop, desk and laptop identical, lower the laptop onto the desk with a soft contact shadow, and add the hand as written above.
[FEEDS] MKG-04-S3, last frame (route: first and last frame).
[STATUS] The S3 plan changed (see the segment spec): S3-KF-LAND must be regenerated, because it now shows the laptop sitting on the desk, not floating. S3-KF-END is unchanged. The generated still with the hand resting on the trackpad is accepted as the pose. It is locked once the cleanup edit is done: blank front lip, blank keys, no corner badge, and the laptop's size and position checked against S3-KF-LAND.
```

### S3-KF-FLOAT (first frame of S3A)
```
[KEYFRAME ID] MKG-04-S3-KF-FLOAT
[SHOT] 7b (start, the float)
[COMPOSITION] Same camera and framing as S3-KF-LAND, but the laptop is front-on and centred, floating one hand's width above the desk, screen facing the camera squarely, hinge level. This is accepted as generated. It matches the tablet-to-laptop morph's last frame (the tablet is also front-on at the end of S2). The laptop will turn in mid-air to the 3/4 view of S3-KF-LAND as it descends.
[CAST IN FRAME] No hand in frame.
[EMOTION LOCK] N/A (no person in frame).
[LIGHTING LOCK] (copy the block above, verbatim)
[ENVIRONMENT] Identical to S3-KF-LAND, with only a faint soft shadow on the desk below the floating laptop.
[PROPS IN FRAME] @laptop floating, open about 110 degrees, screen flat chroma-key green facing the camera, keys blank.
[REFERENCES] Attach the locked S3-KF-LAND as @image1 (the base: keep the camera, framing, desk, backdrop and laptop exactly; change only that the laptop now hovers one hand's width above the desk).
[EXCLUSIONS] (copy the block above, verbatim). Also: no text mark on the laptop, no key legends, no hand.
[BUILD] Accepted as generated: front-on and centred (the generator would not keep the 3/4 view). The turn to 3/4 happens in the clip.
[FEEDS] MKG-04-S3A, first frame. S3-KF-LAND is S3A's last frame and also S3B's first frame.
```

### S3-KF-MID (optional, generate only if the pull fails)
```
[KEYFRAME ID] MKG-04-S3-KF-MID
[SHOT] 7b (the pull, halfway)
[COMPOSITION] Same camera and framing as S3-KF-LAND. The laptop is halfway between its START and END positions, about 5 cm further back than in S3-KF-END.
[CAST IN FRAME] @hand back: the right forearm lies on the desk entering from the right edge. The tip of the index finger touches the front-right corner of the laptop's base; the other fingers are curled loosely beside it.
[EMOTION LOCK] Finger gentle and light, forearm relaxed on the desk, no tension in the knuckles.
[LIGHTING LOCK] (copy the block above, verbatim)
[ENVIRONMENT] Identical to S3-KF-LAND.
[PROPS IN FRAME] @laptop on the desk with a soft contact shadow, open about 110 degrees, screen flat chroma-key green, keys blank.
[REFERENCES] Attach the locked S3-KF-LAND as @image1 (the base, keep everything), @hand back as @image2 (hand identity only).
[EXCLUSIONS] (copy the block above, verbatim). Also: no text mark on the laptop, no key legends, no finger on any key or the trackpad.
[FEEDS] MKG-04-S3, mid frame (only if the segment is split into two chained generations).
```

## Review checklist for each generated still

Check each against its prompt before it feeds a segment: hand identity (skin tone, nails, sleeve) matches across all stills; thumb and fingers are off the screen; the screen is flat green with no UI or glare; device size and position match the same segment's other frame; the tablet and laptop start frames match the morph end frames; lighting matches across all six; the backdrop is the same grey. Regenerate only the stills that fail.

## Flags

1. **Left hand has only a back-of-hand reference.** S2's start frame needs the left hand open and palm-in. If the generator drifts, add one more asset, `@hand L (open)`, and bind it in place of the text-only pose.
2. **S2 combines a grip and a camera arc in one 4 s generation.** If the grip comes out wrong, add an S2-KF-MID (the held 3/4 frame) and chain two shorter generations.
3. **The morph end frames are post-built.** S2-KF-START and S3-KF-LAND must be matched to them in size, angle and position, so generate them first, then build the morphs to fit.


# v4.4 additions: keyframes for the new generated pieces

Seven new stills. The device and hand stills for M1, D1, D2 and D3 already exist (see the lists in each spec).

Top-down scenes (N1, N2) use a light grey seamless surface seen straight from above, with the same lighting lock as above. Attach the asset images listed.

## N1 (scene 1, notebook and handwriting)

The pen is held by the right hand (the same hand as S1, S2 and S3B), so the writing is physically real. The entries are placeholder values: a name, a phone number and a booking number, as a short booking-ledger entry.

### N1-KF-START
```
[KEYFRAME ID] MKG-04-N1-KF-START
[SHOT] Scene 1 (start)
[COMPOSITION] 16:9, straight top-down, the notebook centred, about 60% of the frame height. The notebook lies open with the right page lifted mid-turn, curling up about 45 degrees at its outer edge. The pages beneath are blank with faint ruled lines. No hand and no pen in frame.
[CAST IN FRAME] No person.
[LIGHTING LOCK] (copy the block above, verbatim)
[ENVIRONMENT] A light grey seamless surface, nothing else.
[PROPS IN FRAME] @notebook (page mid-turn), blank.
[REFERENCES] @image1 - @notebook (page mid-turn) - controls cover, paper colour and the page curl only.
[EXCLUSIONS] (copy the block above, verbatim). Also: pages completely blank, no writing, no marks.
[FEEDS] MKG-04-N1, first frame.
```

### N1-KF-END
```
[KEYFRAME ID] MKG-04-N1-KF-END
[SHOT] Scene 1 (end)
[COMPOSITION] Same camera and framing as N1-KF-START. The notebook lies flat. The left page is blank. The right page carries three short lines of neat handwriting in dark blue ballpoint ink, one entry per ruled line, sitting on the lines with even spacing: a first name (Aiman), a phone number (012-345 6789) and a booking number (Booking #12). The right hand enters from the lower right edge.
[CAST IN FRAME] @hand back: the right forearm and hand enter from the lower right, wrist and the outer edge of the palm resting lightly on the page's lower right, holding the pen in a relaxed tripod grip (thumb and index finger pinching the barrel, middle finger supporting it). The pen slopes about 60 degrees from the page, its tip touching the paper at the end of the last written line, the ink just behind the tip and no ink ahead of it.
[EMOTION LOCK] Hand relaxed and steady, fingers loose on the barrel, no knuckle tension, wrist supported on the page, no tremor.
[LIGHTING LOCK] (copy the block above, verbatim)
[ENVIRONMENT] A light grey seamless surface, nothing else.
[PROPS IN FRAME] @notebook lying flat with a soft contact shadow; @pen held; the writing is dark blue, slightly glossy where the ink is fresh, with the last line a little wetter than the first.
[REFERENCES]
- @image1 - @notebook (open flat) - controls cover, paper and ruling only.
- @image2 - @pen - controls the pen's shape only.
- @image3 - @hand back - controls the hand shape, skin, nails and sleeve only - do not use the background.
[EXCLUSIONS] (copy the block above, verbatim). Also: no pen floating without a hand, no ink ahead of the pen tip, no ink on the left page, no other words than the three entries, no logo on the pen, no corner badge.
[FEEDS] MKG-04-N1, last frame.
```

Physics checks for this still (all must be true):
1. The pen is held by the hand in a normal tripod grip. Nothing floats.
2. The pen tip touches the paper at the end of the last line and the ink is behind the tip only.
3. The wrist or the outer edge of the palm rests on the page, and the forearm enters at a natural angle from the lower right.
4. The handwriting sits on the ruled lines with consistent slant and spacing, and the hand covers only the page area where it would.
5. A soft shadow of the pen and hand falls on the page, consistent with the key light from camera-left.
6. The notebook lies flat and has not moved or curled.

If the generator garbles the digits or the name, regenerate once or twice. If it still garbles them, keep the pseudo-handwriting from the best take and replace the ink in post with a handwriting-style text reveal masked to the pen path (the final words are placeholders either way).

## N2 (scene 3, booking sheet and pen)

### N2-KF-A1
```
[KEYFRAME ID] MKG-04-N2-KF-A1
[SHOT] Scene 3a (start)
[COMPOSITION] 16:9, straight top-down on the light grey surface. A paper commission sheet floats about one hand's width above the surface at the centre, slightly tilted, upright. The sheet is already filled in by hand except for the last cell. No hand and no pen in frame.
[CONTENT OF THE SHEET] A printed grid of three columns and four rows. The first row is the header, handwritten in dark blue ballpoint: "Barber", "Customers", "Salary". The three rows below it, handwritten: "Aiman", "12", "RM 480" / "Raj", "9", "RM 360" / "Wei", "14", and the last Salary cell empty.
[LIGHTING LOCK] (copy the block above, verbatim)
[ENVIRONMENT] A light grey seamless surface, nothing else.
[PROPS IN FRAME] @sheet (flat) with the handwriting described above.
[REFERENCES] @image1 - the locked N2-KF-A2 - the base: keep the sheet's cream paper, vertical fold, table lines and handwriting exactly; change only what the edit prompt below says. (Do not use the white @sheet asset.)
[EXCLUSIONS] (copy the block above, verbatim). Also: no other words or numbers, no pen, no hand, no logo.
[FEEDS] MKG-04-N2A, first frame.
[BUILD] Generate as an edit of the locked N2-KF-A2: remove the hand and pen, erase "RM 560" from the last Salary cell, and lift the sheet one hand's width above the surface with a soft shadow, keeping its cream paper, vertical fold and handwriting. A2 is the master look for the sheet; do not use the white @sheet asset as the reference.
```

Edit prompt for N2-KF-A1 (attach the locked N2-KF-A2 as the base image):
```
Edit the image. Keep the sheet exactly as it is: its cream paper, vertical fold, table lines, the Barber and Customers columns, and the handwriting for Aiman 12 RM 480, Raj 9 RM 360 and Wei 14. Keep the surface and the lighting. Change only these things: remove the hand and the pen completely; erase "RM 560" so the last Salary cell is empty; lift the whole sheet so it floats about one hand's width above the surface at the centre of the frame, slightly tilted, with a soft shadow on the surface below it. Do not add any other writing, no corner badge.
```

### N2-KF-A2
```
[KEYFRAME ID] MKG-04-N2-KF-A2
[SHOT] Scene 3a (end), also the first frame of 3b
[COMPOSITION] Same camera and framing. The sheet now lies flat at the centre of the surface. Every cell is filled: the header "Barber", "Customers", "Salary", then "Aiman", "12", "RM 480" / "Raj", "9", "RM 360" / "Wei", "14", "RM 560". The right hand enters from the lower right edge.
[CAST IN FRAME] @hand back: the right forearm and hand enter from the lower right, the outer edge of the palm resting lightly on the sheet's lower right margin, holding the pen in a relaxed tripod grip, thumb and index finger pinching the barrel, middle finger supporting it. The pen slopes about 60 degrees from the paper, its tip touching the paper at the end of "RM 560", the ink just behind the tip and none ahead of it.
[EMOTION LOCK] Hand relaxed and steady, fingers loose on the barrel, no knuckle tension, wrist supported, no tremor.
[LIGHTING LOCK] (copy the block above, verbatim)
[ENVIRONMENT] A light grey seamless surface, nothing else.
[PROPS IN FRAME] @sheet lying flat with a soft contact shadow; @pen held; handwriting dark blue, the last entry a little wetter than the first.
[REFERENCES]
- @image1 - @sheet (flat) - controls paper colour, grid and wear only.
- @image2 - @pen - controls the pen's shape only.
- @image3 - @hand back - controls the hand shape, skin, nails and sleeve only - do not use the background.
[EXCLUSIONS] (copy the block above, verbatim). Also: no pen floating without a hand, no ink ahead of the pen tip, no other words or numbers than the table, no logo on the pen, no corner badge.
[FEEDS] MKG-04-N2A, last frame. Also MKG-04-N2B, first frame.
```

Master sheet: the sheet in the locked N2-KF-A2 is the master look for all N2 stills (cream paper, a vertical fold down the middle). Its Salary entries must start at the same left position inside the Salary column and none may cross the column's right border, and the pen tip must touch the paper immediately after the last digit of "RM 560".

Physics checks for N2-KF-A2: the pen is held in a normal grip and nothing floats; the tip touches the paper at the end of the last entry with ink behind it only; the palm edge rests on the sheet and the forearm enters at a natural angle; the entries sit in their cells with consistent slant; the shadows match the key light from camera-left; the sheet lies flat. The numbers are consistent (each barber earns RM 40 per customer). If the text garbles after a couple of takes, keep the best take and replace the ink in post with a handwriting-style reveal; the words are placeholders either way.

### N2-KF-MID (NOT NEEDED: scene 3 now cuts on the crush; kept for reference only)
```
[KEYFRAME ID] MKG-04-N2-KF-MID
[SHOT] Scene 3b (the crush)
[COMPOSITION] Same camera and framing. The pen lies on the surface to the lower right of the sheet. The right hand has closed over the middle of the sheet and is crushing it: the paper is gathered up in the fist, partly crumpled, with the table's handwriting still visible on the uncrushed corners.
[CAST IN FRAME] @hand back: the right forearm enters from the right edge at a natural angle, the fingers closing over the paper, knuckles visible from above.
[LIGHTING LOCK] (copy the block above, verbatim)
[ENVIRONMENT] A light grey seamless surface.
[PROPS IN FRAME] @sheet (partly crumpled in the hand); @pen lying on the surface.
[REFERENCES] @image1 - @sheet (crumpled ball) - controls the paper's creases only. @image2 - @pen. @image3 - @hand back - controls the hand shape, skin, nails and sleeve only.
[EXCLUSIONS] (copy the block above, verbatim). Also: no second hand, no extra fingers.
[FEEDS] MKG-04-N2B, mid frame (only if N2B is split into two chained generations).
[BUILD] The crumpled paper must match the cream colour and the fold lines of the locked N2-KF-A2, with a few of the table's handwritten lines still visible on the creases. Use N2-KF-A2 as the paper reference, not the white @sheet asset.
```

### N2-KF-B2 (RETIRED, not needed)
```
[KEYFRAME ID] MKG-04-N2-KF-B2
[SHOT] Scene 3b (end)
[COMPOSITION] Same camera and framing. The surface is empty except for the pen lying where it was set down, to the lower right of the frame's centre. The sheet is gone. The right hand is leaving at the right edge of the frame in a loose fist, the crumpled paper ball visible between the fingers, the forearm entering from the right.
[CAST IN FRAME] @hand back: forearm and knuckles at the right edge, the fist closed around the crumpled paper ball.
[LIGHTING LOCK] (copy the block above, verbatim)
[ENVIRONMENT] A light grey seamless surface, nothing else.
[PROPS IN FRAME] @pen lying on the surface with a soft contact shadow; @sheet (crumpled ball) held in the fist.
[REFERENCES] @image1 - @sheet (crumpled ball) - controls the paper's creases only. @image2 - @pen. @image3 - @hand back - controls the hand shape, skin, nails and sleeve only.
[EXCLUSIONS] (copy the block above, verbatim). Also: no sheet left on the surface, no second hand, no extra fingers.
[FEEDS] MKG-04-N2B, last frame.
[BUILD] Same paper rule as N2-KF-MID: the crumpled ball matches the cream paper and fold lines of the locked N2-KF-A2.
```

## M2 (RETIRED: replaced by R3, no new still needed)

### M2-KF-START
```
[KEYFRAME ID] MKG-04-M2-KF-START
[COMPOSITION] Same camera and framing as S3-KF-FLOAT. The tablet (landscape, in its case) floats front-on and centred, one hand's width above the desk, in the same size and position as the laptop in S3-KF-FLOAT. No hands.
[PROPS IN FRAME] @tablet floating, screen flat chroma-key green facing the camera.
[REFERENCES] @image1 - the locked S3-KF-FLOAT - the base: keep the camera, framing, backdrop and desk exactly; replace only the laptop with the tablet. @image2 - @tablet front - controls case shape and flat green screen only.
[EXCLUSIONS] (copy the block above, verbatim). Also: no hand, no logo on the tablet.
[FEEDS] MKG-04-M2, first frame.
```

## MACRO-STILL (shared last frame for D1, D2, D3)

```
[KEYFRAME ID] MKG-04-MACRO-STILL
[COMPOSITION] 16:9, an extreme close-up straight on a device screen, the green fills the whole frame edge to edge, no bezel visible, face-on.
[LIGHTING LOCK] (copy the block above, verbatim)
[PROPS IN FRAME] A perfectly flat chroma-key green screen (#00B140) with a faint real glass look: one soft diagonal reflection of the window light, a few fine dust specks, a very fine pixel texture, slightly shallow depth of field at the corners.
[EXCLUSIONS] (copy the block above, verbatim). Also: no tracking markers, no grid, no pixels of UI, no text, no logo.
[FEEDS] MKG-04-D1, D2 and D3, last frame (the same still for all three).
```
