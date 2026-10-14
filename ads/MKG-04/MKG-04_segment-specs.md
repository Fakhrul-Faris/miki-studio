# MKG-04 Gate 10: Segment specs (Seedance generations)

Three segments, one generation each. Route for all three: first and last frame, from the locked keyframe stills (S1, S2: start and end; S3: start and end). The aspect ratio locks to the stills (16:9).

Order: render S1 first as the probe (hand identity, flat green screen, float-in and grip). Render S2 and S3 after it passes. Log every attempt (see `references/generation-log.md`).

## Camera rule that follows from the keyframes

S1 and S3 have the same framing in their start and end stills, so the camera in those two clips is **locked off**. The push-in and the arc to face-on that the script describes are built in post: scale the footage and animate the screen's corner pin to face-on, then cut to the full-frame UI. S2's end still is front-on, so S2's arc **is** generated.

## SEGMENT SPEC - MKG-04-S1 (phone)

### [SETTINGS]
Model: Seedance 2.5 | Route: first and last frame from locked stills | Budget: 4 s generated (the provider minimum), about 3 s used, the rest is trim handle
Aspect: 16:9 (locked to the stills), the device centred
Resolution: highest the provider offers | Native audio: on, room tone only | Music: none (added in post)

### [GOAL]
Product explainer beat: a phone floats gently down into an open waiting hand and settles in a relaxed grip. Duration: 4 s.

### [KEYFRAMES]
- First frame: MKG-04-S1-KF-START (open hand waiting, phone floating above it, flat green screen).
- Last frame: MKG-04-S1-KF-END (hand holding the phone, thumb off the screen, flat green screen).
Composition, blocking, hand, device, lighting and backdrop are fixed by these stills. The stages below describe only the motion between them.

### [REFERENCES]
- The two keyframe stills above are the only anchors. No supplementary references.

### [CONTINUITY]
- Exactly one hand and one phone in frame. Same hand identity, sleeve and nails throughout.
- Scene: one light grey seamless backdrop, one lighting setup, as fixed by the stills.

### [STAGES]
- STAGE 1 - 0 to 1.5 s - The float-in
  From: MKG-04-S1-KF-START  To: MKG-04-S1-KF-END
  Motion: the phone drifts straight down toward the open palm, slowly and weightlessly, with a slight settling tilt. The fingers close softly around it from below and behind as it arrives. The thumb comes to rest along the left edge, never touching the screen.
  End state: the phone is gripped, screen flat green facing the camera, as in MKG-04-S1-KF-END. The move finishes by 1.5 s.
  Transition out: NO CUT
- STAGE 2 - 1.5 to 4 s - The hold
  From: MKG-04-S1-KF-END
  Motion: almost none. A tiny natural breath-level drift of the hand only. The phone stays centred, at the same size and tilt.
  End state: identical to MKG-04-S1-KF-END, the phone steady and flat green.
  Transition out: NO CUT (segment end)

### [LOOK]
A real photographed studio, not a render. Soft large window-style key from camera-left and slightly above, neutral 5600K, gentle falloff to camera-right, faint natural vignette, fine sensor grain, true-to-life skin and material texture, slight incidental imperfection. Real light neutral grey seamless backdrop. Mood cues: still, calm, deliberate, unhurried.

### [CAMERA AND PERFORMANCE]
Camera: locked off, medium-close from slightly above, no zoom, no handheld shake, no drift. Cutting: one continuous take.
Hand: relaxed fingers, steady grip, thumb resting not pressing, no tremor, no tapping.

### [AUDIO]
Native audio: room tone only. SFX: none (added in post). Music: none. Subtitles: off.

### [KEEP CONSISTENT]
Same hand, same sleeve; the screen stays a perfectly flat chroma-key green with no UI, no glare; the phone keeps the same size and tilt once held.

### [DO NOT INCLUDE]
No on-screen text or interface on the screen, no logos, no finger or thumb on or across the screen, no rotating or re-gripping the phone after the grip, no texting grip, no second hand, no extra fingers, no change in the phone's shape or size, no motion blur trails, no camera move, no music.

### [COPY-READY PROMPT]
```
A real photographed studio shot on a light grey seamless backdrop. The phone floats gently and weightlessly straight down into the open waiting hand, and the fingers close softly around it from below and behind. The thumb rests along the left side edge of the phone, the fingers wrap around the back and the right edge so only their tips show at the right edge, and nothing crosses the screen at any point. The phone stays upright and tilted about 30 degrees toward the camera and never rotates after it is gripped. The grip is settled by 1.5 seconds. After that the hand holds the phone almost perfectly still for the rest of the clip, with only a tiny natural breath-level drift. The phone's screen is a perfectly flat chroma-key green facing the camera, with no interface, no text and no glare. The camera is locked off with no zoom or drift. Soft window-style key light from camera-left, neutral 5600K, fine sensor grain, natural skin texture. No text, no logos, no finger on the screen, no extra fingers, no music.
```

### [REVIEW]
Order: identity (the same hand as the stills), locks (flat green, no UI, thumb off the screen), end state (matches KF-END), motion and seams (the move finishes by 1.5 s, no drift after), audio. Stop at the first failure.

## SEGMENT SPEC - MKG-04-S2 (tablet)

### [SETTINGS]
Model: Seedance 2.5 | Route: first and last frame from locked stills | Budget: 4 s generated (the provider minimum), about 2 s used, the rest is trim handle
Aspect: 16:9 (locked to the stills) | Resolution: highest available | Native audio: on, room tone only | Music: none

### [GOAL]
Product explainer beat: a landscape tablet floats into two waiting hands, forms a relaxed grip at a 3/4 angle, then the camera arcs round to a symmetric front-on view. Duration: 4 s.

### [KEYFRAMES]
- First frame: MKG-04-S2-KF-START (tablet floating at a 3/4 angle, two open hands below, flat green screen).
- Last frame: MKG-04-S2-KF-END (tablet held front-on in landscape, thumbs on the side bezels, flat green screen).

### [REFERENCES]
- The two keyframe stills above are the only anchors. No supplementary references.

### [CONTINUITY]
- Exactly two hands (one left, one right) and one tablet in frame. Same hand identity, sleeves and nails throughout.
- Scene: one light grey seamless backdrop, one lighting setup, as fixed by the stills.

### [STAGES]
- STAGE 1 - 0 to 1 s - The float-in
  From: MKG-04-S2-KF-START
  Motion: the tablet drifts straight down between the two open hands, slowly and weightlessly. The fingers close softly behind the case, one hand at each side, thumbs settling on the side bezels and never on the screen.
  End state: the tablet is held in a relaxed two-handed grip at the same 3/4 angle, screen flat green.
  Transition out: NO CUT
- STAGE 2 - 1 to 2 s - The arc
  From: the held 3/4 grip  To: MKG-04-S2-KF-END
  Motion: the camera glides in a smooth slow arc around the tablet, from the 3/4 view to a symmetric front-on landscape view, with a hand at each side. The hands and tablet stay still relative to each other.
  End state: matches MKG-04-S2-KF-END. The arc finishes by 2 s.
  Transition out: NO CUT
- STAGE 3 - 2 to 4 s - The hold
  From: MKG-04-S2-KF-END
  Motion: almost none, a tiny natural drift of the hands only.
  End state: identical to MKG-04-S2-KF-END.
  Transition out: NO CUT (segment end)

### [LOOK]
A real photographed studio, not a render. Soft large window-style key from camera-left and slightly above, neutral 5600K, gentle falloff to camera-right, faint natural vignette, fine sensor grain, true-to-life skin and material texture, slight incidental imperfection. Real light neutral grey seamless backdrop. Mood cues: smooth, symmetric, deliberate.

### [CAMERA AND PERFORMANCE]
Camera: eased arc, no zoom, no handheld shake; locked off at the end of the arc. Cutting: one continuous take.
Hands: even grip, thumbs resting not pressing, forearms level, no tremor, no tapping.

### [AUDIO]
Native audio: room tone only. SFX: none (added in post). Music: none. Subtitles: off.

### [KEEP CONSISTENT]
Same two hands and sleeves; the screen stays a perfectly flat chroma-key green with no UI, no glare; the tablet keeps its size and shape throughout the arc.

### [DO NOT INCLUDE]
No on-screen text or interface on the screen, no logos, no thumb or finger on the screen, no third hand, no extra fingers, no change in the tablet's shape, no motion blur trails, no zoom, no music.

### [COPY-READY PROMPT]
```
A real photographed studio shot on a light grey seamless backdrop. A landscape tablet floats gently and weightlessly straight down between two open waiting hands, and the fingers close softly behind its case, one hand at each side, with the thumbs resting on the side bezels and never on the screen. By 1 second the grip is settled at a three-quarter angle. From 1 to 2 seconds the camera glides in a smooth slow arc round the tablet to a symmetric front-on landscape view, with a hand at each side, while the hands and tablet stay still relative to each other. After 2 seconds everything holds almost perfectly still, with only a tiny natural drift. The tablet's screen is a perfectly flat chroma-key green facing the camera, with no interface, no text and no glare. Soft window-style key light from camera-left, neutral 5600K, fine sensor grain, natural skin texture. No text, no logos, no finger on the screen, no extra fingers, no music.
```

### [REVIEW]
Order: identity (both hands match the stills and each other), locks (flat green, no UI, thumbs off the screen), end state (matches KF-END), motion and seams (grip forms by 1 s, arc finishes by 2 s, no device warp), audio. Stop at the first failure.

## SEGMENT SPEC - MKG-04-S3B (laptop pull and trackpad)

### [SETTINGS]
Model: Seedance 2.5 | Route: first and last frame from locked stills | Budget: 4 s generated (the provider minimum), about 2.5 s used, the rest is trim handle
Aspect: 16:9 (locked to the stills) | Resolution: highest available | Native audio: on, room tone only | Music: none

### [GOAL]
Product explainer beat: a hand reaches in, hooks the front-right corner of an open laptop with the index fingertip, pulls it about 10 cm toward the camera, then the fingertip moves left and rests lightly on the trackpad. Duration: 4 s.

### [KEYFRAMES]
- First frame: MKG-04-S3-KF-LAND (the laptop sitting on the desk about 10 cm further back, no hand in frame, flat green screen). This is also S3A's last frame.
- Last frame: MKG-04-S3-KF-END (the laptop at its final position, forearm on the desk, hand resting on the trackpad, flat green screen). Unchanged from before.
- Optional mid frame: MKG-04-S3-KF-MID (fingertip hooked on the front-right corner, the laptop halfway through the pull). Add it only if the pull fails in a test render; then this segment becomes two chained generations (see `references/keyframe-chaining.md`).

### [REFERENCES]
- The two keyframe stills above are the only anchors. No supplementary references.

### [CONTINUITY]
- Exactly one laptop and, from the start of the clip, one right hand and forearm. Same hand identity, sleeve and nails as in the S1 and S2 stills.
- Scene: one light grey seamless backdrop with the same oak desk, one lighting setup, as fixed by the stills. The laptop's lid angle stays at about 110 degrees throughout.

### [STAGES]
- STAGE 1 - 0 to 1.4 s - The reach and pull
  From: MKG-04-S3-KF-LAND  To: the laptop at its KF-END position
  Motion: the right hand and forearm slide in from the right edge along the desk, the forearm always resting on the desk. The index fingertip hooks the front-right corner of the laptop's base and pulls the laptop slowly and straight about 10 cm toward the camera, the laptop sliding on its own contact shadow without tilting or changing its lid angle.
  End state: the laptop at its KF-END position, still, screen flat green. The pull finishes by 1.4 s.
  Transition out: NO CUT
- STAGE 2 - 1.4 to 2.4 s - The trackpad
  From: the fingertip at the corner  To: MKG-04-S3-KF-END
  Motion: the fingertip lifts off the corner, moves left along the front edge of the base, and the hand settles so the index fingertip rests lightly on the trackpad, pressing nothing. The hand then stops.
  End state: matches MKG-04-S3-KF-END. The hand has stopped by 2.4 s.
  Transition out: NO CUT
- STAGE 3 - 2.4 to 4 s - The hold
  From: MKG-04-S3-KF-END
  Motion: almost none, a tiny natural drift of the hand only.
  End state: identical to MKG-04-S3-KF-END.
  Transition out: NO CUT (segment end)

### [LOOK]
A real photographed studio, not a render. Soft large window-style key from camera-left and slightly above, neutral 5600K, gentle falloff to camera-right, faint natural vignette, fine sensor grain, true-to-life skin and material texture, slight incidental imperfection. Real light neutral grey seamless backdrop and a plain pale-oak desk. Mood cues: quiet, deliberate, unhurried.

### [CAMERA AND PERFORMANCE]
Camera: locked off at the keyframe framing (3/4 view from the left, slightly above the desk), no zoom, no handheld shake. Cutting: one continuous take.
Hand: a single fingertip does the pulling, gentle and slow, forearm supported by the desk, no tapping, no sliding on the trackpad, no pressing.

### [AUDIO]
Native audio: room tone only. SFX: none (added in post). Music: none. Subtitles: off.

### [KEEP CONSISTENT]
Same hand and sleeve as the earlier clips; the screen stays a perfectly flat chroma-key green with no UI, no glare; the laptop keeps its size, shape and lid angle during and after the pull; keys and the lip under the screen stay blank.

### [DO NOT INCLUDE]
No on-screen text or interface on the screen, no logos or text marks on the laptop, no key legends, no finger on any key, no typing, no sliding on the trackpad, no pushing the laptop away from the camera, no lifting or tilting the laptop, no laptop moving before the fingertip touches it, no hand floating above the desk, no second hand, no extra fingers, no change in the laptop's shape or lid angle, no camera move, no music.

### [COPY-READY PROMPT]
```
A real photographed studio shot on a light grey seamless backdrop with a plain pale-oak desk in the lower third, viewed in three-quarters from the left. An open laptop sits on the desk. From the right edge of the frame a hand and forearm slide along the desk with the forearm resting on it. The index fingertip hooks the front-right corner of the laptop's base and slowly pulls the whole laptop straight about ten centimetres toward the camera, sliding it on the desk on its own shadow, with the laptop moving only while the fingertip is touching it and keeping its lid angle without tilting. The pull is finished by 1.4 seconds. Then the fingertip lifts off the corner, moves left along the front edge, and the hand settles so the index fingertip rests lightly on the trackpad, pressing nothing, and stops by 2.4 seconds. After that everything holds almost perfectly still, with only a tiny natural drift. The laptop's screen is a perfectly flat chroma-key green facing the camera, with no interface, no text and no glare. The keys and the front lip of the laptop are blank and smooth. The camera is locked off with no zoom or drift. Soft window-style key light from camera-left, neutral 5600K, fine sensor grain, natural skin texture. No text, no logos, no typing, no sliding on the trackpad, no extra fingers, no music.
```

### [REVIEW]
Order: identity (the hand matches the earlier clips), locks (flat green, no UI, blank keys and lip, nothing pressed), end state (matches KF-END), motion and seams (the laptop only moves while touched, slides straight, keeps its lid angle; the pull ends by 1.4 s, the hand stops by 2.4 s, the forearm always on the desk), audio. Stop at the first failure.

## SEGMENT SPEC - MKG-04-S3A (laptop float and landing)

**STATUS: PARKED.** Two takes spun the laptop instead of turning it 35 degrees and invented a logo on the lid. For now scene 7 uses S3B alone: the tablet-to-laptop morph ends with the laptop already landed on the desk (the S3-KF-LAND view), then S3B plays. Revisit later with the S3-KF-TURN chain (FLOAT to TURN, then TURN to LAND), or keep the plain landing.

Render this segment first, then join it to S3B (already rendered). The last frame of S3A and the first frame of S3B are the same still (S3-KF-LAND), so the seam is continuous. Use about 1 s of S3A, then cut to S3B.

### [SETTINGS]
Model: Seedance 2.5 | Route: first and last frame from locked stills | Budget: 4 s generated (the provider minimum), about 1 s used, the rest is trim handle
Aspect: 16:9 (locked to the stills) | Resolution: highest available | Native audio: on, room tone only | Music: none

### [GOAL]
Product explainer beat: an open laptop floats gently down from a front-on, centred view, turns in mid-air to a 3/4 view, and lands softly on the desk. Duration: 4 s.

### [KEYFRAMES]
- First frame: MKG-04-S3-KF-FLOAT (the laptop front-on and centred, one hand's width above the desk, no hand in frame, flat green screen).
- Last frame: MKG-04-S3-KF-LAND (the laptop landed on the desk, no hand in frame, flat green screen).

### [REFERENCES]
- The two keyframe stills above are the only anchors. No supplementary references.

### [CONTINUITY]
- Exactly one laptop and no person in frame. Scene: one light grey seamless backdrop with the same oak desk, as fixed by the stills. The laptop's lid angle stays at about 110 degrees.

### [STAGES]
- STAGE 1 - 0 to 1 s - The float-down and turn
  From: MKG-04-S3-KF-FLOAT  To: MKG-04-S3-KF-LAND
  Motion: the laptop descends slowly and weightlessly while turning smoothly in mid-air about 35 degrees from front-on to the 3/4 view, drifting slightly to the right of centre, and touches down softly on the desk with a soft contact shadow forming, without bouncing.
  End state: matches MKG-04-S3-KF-LAND, still, screen flat green. The turn and landing are finished by 1 s.
  Transition out: NO CUT
- STAGE 2 - 1 to 4 s - The hold
  Motion: none. The laptop stays perfectly still. (Only the first 1 s is used; the hold is trim handle.)
  End state: identical to MKG-04-S3-KF-LAND.
  Transition out: NO CUT (segment end)

### [LOOK]
Same as S3B.

### [CAMERA AND PERFORMANCE]
Camera: locked off at the keyframe framing, no zoom, no drift. One continuous take.

### [AUDIO]
Native audio: room tone only. SFX: none (added in post). Music: none.

### [DO NOT INCLUDE]
No on-screen text or interface on the screen, no logos or text marks on the laptop, no key legends, no hand or any person, no bouncing, no change in the laptop's lid angle or size, no camera move or camera turn (the 3/4 view comes from the laptop turning), no camera move, no music.

### [COPY-READY PROMPT]
```
A real photographed studio shot on a light grey seamless backdrop with a plain pale-oak desk in the lower third, seen from a fixed camera facing the desk. An open laptop starts front-on and centred, floating one hand's width above the desk. It descends gently and weightlessly while turning only slightly, about thirty-five degrees in total and never more, and ends exactly as in the last frame image. The screen faces the camera for the whole clip, and the back of the lid is never visible. The laptop drifts slightly to the right of centre and touches down softly on the desk with a soft contact shadow, keeping its lid angle without bouncing. The turn and landing are finished by 1 second. After that the laptop stays perfectly still. The laptop's screen is a perfectly flat chroma-key green facing the camera, with no interface, no text and no glare. The keys and the front lip of the laptop are blank and smooth. The camera is locked off with no zoom or drift. There is no hand and no person in frame. Soft window-style key light from camera-left, neutral 5600K, fine sensor grain. No text, no logos anywhere on the laptop, the back of the lid is never seen, no spinning, no music.
```

### [REVIEW]
Order: locks (flat green, blank keys and lip, no hand), end state (matches S3-KF-LAND exactly in position and size), motion (smooth mid-air turn to 3/4, soft landing, no bounce, finished by 1 s), audio. Stop at the first failure.

## Fallbacks

- **S2:** if the grip or the arc fails, add an S2-KF-MID (the held 3/4 frame) and chain two shorter generations, or generate the float-in and grip as one clip and build the front-on move in post.
- **S3:** if the pull fails (the laptop moves without contact, or tilts), generate S3-KF-MID and chain two clips: start to mid (reach and hook), then mid to end (pull and trackpad).
- **Any clip:** a failed still gets regenerated as a still. Don't patch it in the video prompt.


# v4.4 additions: specs for the new generated pieces

Shared for all of these: Model Seedance 2.5, route first and last frame from locked stills, 4 s generated (the provider minimum), 16:9 locked to the stills, resolution as high as offered, audio on (room tone only), no music. Paste only the copy-ready prompt. LOOK for every clip: a real photographed studio, soft large window-style key light from camera-left and slightly above, neutral 5600K, fine sensor grain, real light grey seamless surface or backdrop. Camera is locked off unless a spec says otherwise.

## Generation tracker

| Clip | Scene | First frame | Last frame | Used | Status |
|---|---|---|---|---|---|
| S1 phone float and hold | 5a, 5b | S1-KF-START | S1-KF-END | 3.0 s | Done |
| D1 phone macro dive | 5c | S1-KF-END | MACRO-STILL | 2.0 s | To generate |
| R1 tablet reveal (push-in, played in reverse) | 6a | S2-KF-START | MACRO-STILL | 1.0 s | To generate |
| S2 tablet float and arc | 6b | S2-KF-START | S2-KF-END | 2.0 s | Done |
| D2 tablet macro dive | 6c | S2-KF-END | MACRO-STILL | 2.0 s | To generate |
| R3 laptop reveal (push-in, played in reverse) | 7a | S3-KF-LAND | MACRO-STILL | 1.2 s | To generate |
| S3B laptop pull and trackpad | 7b | S3-KF-LAND | S3-KF-END | 2.4 s | Done |
| D3 laptop macro dive | 7c | S3-KF-END | MACRO-STILL | 2.4 s | To generate |
| N1 notebook and handwriting | 1 | N1-KF-START | N1-KF-END | 3.0 s | To generate |
| N2A barber commission sheet | 3a | N2-KF-A1 | N2-KF-A2 | 1.2 s | To generate |
| N2B pen set down, fist closes on the sheet | 3b | N2-KF-A2 | (none, trimmed at the crush) | 0.8 s | Done (cut on the crush) |
| S3A laptop float and turn | (parked) | S3-KF-FLOAT | S3-KF-LAND | - | Parked |

## SEGMENT SPEC - MKG-04-N1 (notebook and handwriting)

Keyframes: N1-KF-START (right page mid-turn, no hand), N1-KF-END (blank left page, three handwritten lines on the right page, the right hand holding the pen with its tip at the end of the last line). Used 3.0 s.

Stages:
- 0 to 0.7 s: the lifted page completes its turn and settles flat, showing a blank spread.
- 0.5 to 1.0 s: the right hand, holding a pen in a relaxed grip, enters from the lower right edge and settles its wrist on the page, the tip touching the first ruled line.
- 1.0 to 2.7 s: the hand writes three short lines in order, left to right, a first name, a phone number and a booking number, brisk and neat, lifting the tip between lines. The ink appears only behind the tip.
- 2.7 to 4 s: hold, the tip resting at the end of the last line.

Copy-ready prompt:
```
A real photographed studio shot looking straight down on a light grey seamless surface. A notebook lies open at the centre with its right page lifted mid-turn. The page finishes turning and settles flat, showing a blank page spread with faint ruled lines. Then a right hand holding a ballpoint pen in a relaxed tripod grip enters from the lower right edge, resting its wrist lightly on the page. With brisk, neat handwriting it writes three short lines on the ruled lines of the right page, left to right: the name Aiman, then the phone number 012-345 6789, then Booking #12. The ink is dark blue and appears only behind the pen tip as it writes, the pen lifting slightly between lines. The hand finishes with the tip resting at the end of the last line, and everything holds still. The camera is locked off, straight down, with no zoom or drift. Soft window-style key light from camera-left, neutral 5600K, fine sensor grain, natural paper and skin texture. No other words, no logos, no floating pen, no music.
```
Do not include: a pen with no hand, ink ahead of the tip, any words other than the three entries, writing on the left page, a second hand, extra fingers, a camera move, a logo on the pen. Review (stop at the first failure): the hand is the same as in S1, S2 and S3B; the pen is held in a normal grip and never floats; ink appears only behind the tip; the three entries sit on the ruled lines; the end matches N1-KF-END. If the handwriting is garbled, keep the best take and replace the ink in post.

## SEGMENT SPEC - MKG-04-N2A (barber commission sheet)

Keyframes: N2-KF-A1 (the sheet floating above the surface, filled in except the last salary cell, no hand), N2-KF-A2 (the sheet flat and complete, the right hand holding the pen with its tip at the end of "RM 560"). Used 1.2 s.

Stages:
- 0 to 0.5 s: the sheet drifts gently down and lands flat.
- 0.4 to 0.7 s: the right hand, holding a pen in a relaxed grip, enters from the lower right and settles the palm edge on the sheet's lower right margin, the tip touching the last empty Salary cell.
- 0.7 to 1.2 s: the hand writes "RM 560" in the last cell, brisk and neat. The ink appears only behind the tip.
- 1.2 to 4 s: hold, the tip resting at the end of the entry.

Copy-ready prompt:
```
A real photographed studio shot looking straight down on a light grey seamless surface. A paper commission sheet with a printed three-column grid floats gently down from above and lands flat at the centre. The sheet is already filled in by hand in dark blue ballpoint ink: a header row of Barber, Customers, Salary, then Aiman, 12, RM 480, then Raj, 9, RM 360, then Wei, 14 and an empty last cell. A right hand holding a ballpoint pen in a relaxed tripod grip enters from the lower right edge and rests the edge of its palm lightly on the sheet's lower right margin. With brisk, neat handwriting it writes RM 560 in the last empty cell. The ink appears only behind the pen tip. The hand finishes with the tip resting at the end of the entry and everything holds still. The camera is locked off, straight down, with no zoom or drift. Soft window-style key light from camera-left, neutral 5600K, fine sensor grain, natural paper and skin texture. No other words or numbers, no logos, no floating pen, no music.
```
Do not include: a pen with no hand, ink ahead of the tip, changed or extra words and numbers, a second hand, extra fingers, a camera move, a logo on the pen. Review (stop at the first failure): the hand matches S1, S2, S3B and N1; the pen is held normally and never floats; the table content is unchanged except the new last entry; the end matches N2-KF-A2.

## SEGMENT SPEC - MKG-04-N2B (the hand sets the pen down and starts crushing the sheet)

**STATUS: done, cut on the crush.** The full crumple into a ball did not work (the hand got stuck mid-crumple), so scene 3 stops at that moment. Use the existing N2B take trimmed to about 0.8 s: the hand sets the pen down and closes its fist over the sheet, then hard cut to scene 4. No end still (N2-KF-B2) and no further generation needed. If a take is ever regenerated, the first frame is N2-KF-A2 and the prompt is the same as before, but ask only for the pen set-down and the fist closing over the sheet, not for the ball.

## SEGMENT SPEC - MKG-04-R1 (tablet reveal by pulling back out of the screen)

Replaces M1 (the phone-to-tablet morph), for the same reason R3 replaced M2: a morph in mid-air comes out cartoonish and breaks physics. The device change happens through the screen: the phone dive (D1) ends full-frame on the phone UI, the UI dissolves into the tablet's UI at full frame, and the camera pulls back out of the tablet's screen to reveal the tablet floating above two open hands. S2 starts from that same frame.

Generate a **push-in**, then **reverse it in post**.

Keyframes: first frame S2-KF-START (the tablet floating in landscape above two open waiting hands, 3/4 view), last frame MACRO-STILL (the green screen filling the frame). Generated 4 s. In post: cut at the moment the green fills the frame (about 1.0 s), reverse that 1.0 s, and use it as scene 6a. The reversed clip ends exactly on S2-KF-START, which is S2's first frame.

Stages (as generated, before reversing):
- 0 to 1.0 s: the camera pushes smoothly and steadily straight into the tablet screen, easing from the 3/4 view to face-on, until the green fills the whole frame, ending as in the last frame image. The tablet and the two hands do not move; only the camera moves.
- 1.0 to 4 s: discarded.

Copy-ready prompt:
```
A real photographed studio shot on a light grey seamless backdrop, seen from slightly above at a three-quarter angle. A tablet in a slim case floats in landscape above two open waiting hands, its screen a perfectly flat chroma-key green. The camera pushes smoothly and steadily straight into the tablet screen, easing from the three-quarter view to face-on, until the green fills the whole frame by 1 second, ending exactly as in the last frame image. The tablet and the two hands do not move at all, only the camera moves. The screen stays a perfectly flat chroma-key green with no interface, no text, no glare and no logos, and a soft reflection of the window light slides across the glass as the camera moves. The camera move is smooth with no shake. Soft window-style key light from camera-left, neutral 5600K, fine sensor grain, natural skin texture. No text, no logos, no extra fingers, no music.
```

Do not include: any movement of the tablet or the hands, a third hand, extra fingers, logos, a shaky camera, UI or text on the screen. Review (stop at the first failure): the tablet and hands are perfectly still; the camera push is smooth; the first frame matches S2-KF-START and the frame at 1.0 s matches MACRO-STILL; the two hands match the earlier clips.

Post for scene 6a: reverse the first 1.0 s; at the start (full-frame green) dissolve the phone UI (UI-P4, the booked tick) into the tablet UI (UI-T1) in the first 0.3 s; UI-T1 then sits on the tablet screen as the camera pulls back, following the screen's corner pin as it eases from face-on to 3/4, and stays on screen through S2.

## SEGMENT SPEC - MKG-04-R3 (laptop reveal by pulling back out of the screen)

Replaces M2 (the tablet-to-laptop morph, which came out cartoonish and broke physics). The device change now happens through the screen: the tablet dive (D2) ends full-frame on the tablet UI, the UI dissolves into the laptop's UI at full frame, and the camera pulls back out of the laptop's screen to reveal the laptop already landed on the desk. There is no morph.

How it is made: generate a **push-in** (the easy direction for the model), then **reverse it in post**.

Keyframes: first frame S3-KF-LAND (the laptop landed, 3/4 view, no hand), last frame MACRO-STILL (the green screen filling the frame). Generated 4 s. In post: cut the clip at the moment the green fills the frame (about 1.2 s), reverse that 1.2 s, and use it as scene 7a. The reversed clip ends exactly on S3-KF-LAND, which is S3B's first frame.

Stages (as generated, before reversing):
- 0 to 1.2 s: the camera pushes smoothly and steadily straight into the laptop screen, easing from the 3/4 view to face-on, until the green fills the whole frame, ending as in the last frame image. The laptop and desk do not move; only the camera moves.
- 1.2 to 4 s: discarded.

Copy-ready prompt:
```
A real photographed studio shot on a light grey seamless backdrop with a plain pale-oak desk in the lower third. An open laptop sits perfectly still on the desk, seen in three-quarters, its screen a perfectly flat chroma-key green. There is no hand and no person. The camera pushes smoothly and steadily straight into the laptop screen, easing from the three-quarter view to face-on, until the green fills the whole frame by 1.2 seconds, ending exactly as in the last frame image. The laptop and the desk do not move at all, only the camera moves. The screen stays a perfectly flat chroma-key green with no interface, no text, no glare and no logos, and a soft reflection of the window light slides across the glass as the camera moves. The camera move is smooth with no shake. Soft window-style key light from camera-left, neutral 5600K, fine sensor grain. No text, no logos anywhere on the laptop, no hands, no music.
```

Do not include: any movement of the laptop, a hand, the back of the lid, logos, a shaky camera, UI or text on the screen. Review (stop at the first failure): the laptop is perfectly still; the camera push is smooth and steady; the first frame matches S3-KF-LAND and the frame at 1.2 s matches MACRO-STILL; no logos.

Post for scene 7a: reverse the first 1.2 s; at the start (full-frame green) dissolve the tablet UI (UI-T4, the paid tick) into the laptop UI (UI-L1) in the first 0.3 s, then the UI sits on the laptop screen as the camera pulls back; the UI follows the screen's corner pin as it eases from face-on to 3/4.

## SEGMENT SPEC - MKG-04-D1, D2, D3 (macro dives)

Same structure for the three clips. Last frame for all three: MACRO-STILL. Used 2.0 s each for D1 and D2, 2.4 s for D3.

| Clip | First frame | Device in view |
|---|---|---|
| D1 | S1-KF-END | the held phone, high 3/4 |
| D2 | S2-KF-END | the held tablet, front-on landscape |
| D3 | S3-KF-END | the laptop with the hand on the trackpad, 3/4 |

Stages:
- 0 to 0.8 s: the camera pushes straight into the screen, easing from the starting view to face-on, until the green fills the frame.
- 0.8 s to the end of the used part: the camera glides slowly upward across the screen in extreme close-up, the glass reflection sliding across it.
- The rest of the 4 s: the same glide continues slowly; it is trim handle.

Copy-ready prompt (change the first sentence for D2 and D3):
```
A real photographed studio shot. A phone, held in a hand on a light grey seamless backdrop, with its screen a perfectly flat chroma-key green. The camera pushes fast and straight into the screen, so that by 1 second the green fills the entire frame edge to edge and the phone's bezel, camera island, edges, the hand and the backdrop have all left the frame. From 1 second the camera keeps going and glides slowly upward across the green glass in extreme close-up, showing nothing but flat green with a soft reflection of the window light sliding across it and a few fine dust specks catching the light, until the end of the clip, matching the last frame image. The screen stays a perfectly flat green with no interface, no text, no logos and no tracking markers. The camera move is smooth and steady with no shake. Soft window-style key light from camera-left, neutral 5600K, fine sensor grain. No text, no logos, no markers, no music.
```
For D2: "A tablet, held in two hands, ... from the front-on landscape view". For D3: "A laptop on a desk with a hand resting on its trackpad, ... from the three-quarter view".

How it is used: the clip supplies the real glass, glare and light. The UI is a full-frame Figma animation placed under the clip's reflections (key the green, put the glare over the UI). No tracking markers are needed. If the UI and the glare drift apart in a test, add a faint grid of small black crosses to the MACRO-STILL as a fallback.

Do not include: any UI or text on the screen, markers, a back-of-device view, a shaky camera, a logo.
