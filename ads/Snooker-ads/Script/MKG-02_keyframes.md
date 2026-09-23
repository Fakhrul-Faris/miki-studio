# MKG-02 — Keyframes (Gate 9)

24 locked stills (25 slots, S6b's start frame reuses S6a's final frame) anchoring the 11 segments. Poofs are tiered start+end (de-tiered from start+mid+end at the user's request, trading some motion-guessing risk for 6 fewer generations — see the segment-plan cost note). Generate and get each approved before it feeds a segment-spec stage. Shared look block and reference handles are the same as `MKG-02_segment-specs.md`.

## Shared look block
```
Authentic live-action documentary realism (`references/documentary-realism.md` in the seedance-commercial-production skill is the governing technique — real camera behavior, ordinary practical lighting, restrained natural color, moderate depth of field, incidental human-scale composition, physical wear on every surface; no teal-and-orange grade, no artificial haze, no hero framing). Classic brick city-street neighbourhood with a classic Americana barbershop: deep burgundy/maroon leather chairs with heavy chrome mechanisms showing wear, black-and-white checkerboard tile floor with years of accumulated use, dark wood wainscoting below aged cream plaster, large aged wood-framed mirrors over a pale marble counter with casually arranged tools, a red/white/blue barber pole, a wall of old black-and-white photos, a jukebox-shaped decor piece with no real branding. No on-screen text, no logos, no legible signage.
```

---

## Video generation — how each still becomes a shot

This is a workflow note, not a template. From here, the process for turning a locked keyframe into a video instruction changes: **you attach the actual generated still, and I look at it and direct it** — the way a director calls the next setup off what's actually on the monitor, not off what the shot list predicted would be there. The keyframe prompts above got us a still worth shooting; what happens next is a judgment call made from the image itself.

What I write for each still will read like a shot direction, not a form:
- What's already true in the frame, and what has to happen next for the story to move — said the way you'd say it to a DP and an actor, not itemized into fields.
- The one thing this shot is *for* — the beat it has to land — stated plainly, so nothing else competes with it.
- Performance as behavior, not labels: what a face does, what a hand does, what changes and when it changes, triggered by something happening in frame, not by a clock.
- Camera as a decision, not a menu: does it hold, does it breathe, does it move — and only because the shot earns it, never as decoration.
- The cut out, if there is one, and what it's cutting to.

**I'll follow the script's intent, not necessarily its exact staging.** If the still shows something the written stage description didn't quite anticipate — a hand fell differently, a gaze landed somewhere better, the room reads calmer or more chaotic than planned — I'll direct what's actually in front of me and say so, rather than force the original stage notes onto a frame that's telling a slightly different, better story. The beat still has to land (the count, the tap, the poof, the shrug, the payoff), but how it gets there is open once the still exists. Flag anything I change from the locked script explicitly, so it's a visible decision, not a quiet drift.

This replaces the mechanical `[STAGES]` field-filling for these instructions — the segment-spec template still exists as the record of what was decided, but the decision itself gets made by looking at the image, not by filling in blanks.

---

## S1 — single

```
[KEYFRAME ID] MKG-02-S1-KF-START
[SHOT] 1a
[COMPOSITION] Extreme close-up, eye level, static, collapsing toward the iris. Nothing important in the outer thirds.
[CAST IN FRAME] @player's eye and brow only, filling the frame, gaze fixed forward.
[EMOTION LOCK] @player: eyes fixed and unblinking, brow faintly furrowed in concentration, no other visible expression.
[LIGHTING LOCK] [shared look block]
[ENVIRONMENT] @lane_A: ambient outdoor light quality only, no people, no set visible at this scale.
[PROPS IN FRAME] Soft out-of-focus suggestion of a cue stick edge entering lower right.
[REFERENCES]
- @image1 - @player_face. Controls face and eye only. Do not use its background.
Do not re-describe the eye/face beyond what's above; do not use any background from the reference.
[CAMERA] Extreme close-up, 85mm feel, very shallow DOF, fine film grain.
[EXCLUSIONS] No text, no logos, no second person, no camera movement baked into the still.
[FEEDS] MKG-02-S1, single-frame stage (route: I2V/R2V from this frame, held/no motion or minimal settle).
```

---

## S2 — single

```
[KEYFRAME ID] MKG-02-S2-KF-START
[SHOT] 1b
[COMPOSITION] Wide, eye level, static, one-point perspective toward center. Table centered lower-mid frame; queue recedes in depth along the wall, not spread left-right, so the 9:16 crop still holds it.
[CAST IN FRAME] @player bent over the table lining up his shot, cue level. @opponent standing across the table, leaning on his own cue, watching. Up to 4 background queue figures, paired, soft focus, curving back along the brick wall.
[EMOTION LOCK] @player: eyes fixed on the cue ball, jaw relaxed, focused stillness. @opponent: relaxed posture, faint amusement, weight on one hip.
[LIGHTING LOCK] [shared look block]
[ENVIRONMENT] @lane_A → use @laneAfar.png (wide/farther camera variant): brick street, classic barbershop storefront with a red/white/blue barber pole and awning, plain brick wall receding to center, cobblestone foreground, street lamp, no legible signage.
[PROPS IN FRAME] @table centered, both players' cues in hand.
[REFERENCES]
- @image1 - @player_face. Controls face and hair only. Do not use its background.
- @image2 - @player_body. Controls build and wardrobe only. Do not use its background.
- @image3 - @opponent_face. Controls face and hair only. Do not use its background.
- @image4 - @opponent_body. Controls build and wardrobe only. Do not use its background.
- @image5 - @table. Controls table structure and layout only; exactly one table appears.
- @image6 - @lane_A (@laneAfar.png). Controls the location and light only. Do not use any people from it.
Do not re-describe either player's face, hair or wardrobe beyond pose above.
[CAMERA] 35mm feel, shallow DOF, fine film grain.
[EXCLUSIONS] No text, no logos, no more than 4 clear background figures, no cars.
[FEEDS] MKG-02-S2, single-frame stage (route: I2V/R2V from this frame, held).
```

---

## S3 — single

```
[KEYFRAME ID] MKG-02-S3-KF-START
[SHOT] 2a
[COMPOSITION] Medium, eye level, static, from inside the shop looking toward the window. Barber centered between the window frame.
[CAST IN FRAME] @barber standing still, clippers loose in one hand, facing the window, watching outside.
[EMOTION LOCK] @barber: steady gaze fixed through the glass, faint tension in the jaw, otherwise still.
[LIGHTING LOCK] [shared look block]
[ENVIRONMENT] @shop_B: front-facing angle, window visible, cream plaster interior wall above wood wainscoting.
[PROPS IN FRAME] Clippers held loosely in the barber's hand, at rest.
[REFERENCES]
- @image1 - @barber_face. Controls face and hair only. Do not use its background.
- @image2 - @barber_body. Controls build and wardrobe only. Do not use its background.
- @image3 - @shop_B. Controls the space, materials and light only. Do not use any people in it.
Do not re-describe the barber's face, hair or wardrobe beyond pose above.
[CAMERA] 35mm feel, shallow DOF.
[EXCLUSIONS] No legible signage or window lettering, no second person.
[FEEDS] MKG-02-S3, single-frame stage (route: I2V/R2V from this frame, held).
```

---

## S4 — single

```
[KEYFRAME ID] MKG-02-S4-KF-START
[SHOT] 3a
[COMPOSITION] Medium-close, eye level, static. Barber and chair centered.
[CAST IN FRAME] @barber standing beside the deep red/maroon leather chair, clippers paused mid-air near a seated customer's head. Customer's back to camera, unreferenced, plain wardrobe. Barber's gaze angled off toward the window.
[EMOTION LOCK] @barber: lips slightly parted mid-count, eyes distant, brow faintly drawn.
[LIGHTING LOCK] [shared look block]
[ENVIRONMENT] @shop_A: chair-row hero angle, large wood-framed mirrors behind, black-and-white checkerboard floor, cream wall above wood wainscoting, warm tungsten sconce light suggested top of frame.
[PROPS IN FRAME] Clippers held near the customer's head, not touching hair.
[REFERENCES]
- @image1 - @barber_face. Controls face and hair only. Do not use its background.
- @image2 - @barber_body. Controls build and wardrobe only. Do not use its background.
- @image3 - @shop_A. Controls the space, chair and mirror layout only. Do not use any people in it.
Do not re-describe the barber's face, hair or wardrobe beyond pose above. Background customer stays generic and unreferenced.
[CAMERA] 35mm feel, shallow DOF.
[EXCLUSIONS] No visible face on the background customer, no second barber.
[FEEDS] MKG-02-S4, single-frame stage (route: I2V/R2V from this frame; dialogue and mouth movement handled in the video stage).
```

---

## S5 — start + end (two chained stages, 3 frames)

```
[KEYFRAME ID] MKG-02-S5-KF-START
[FEEDS] Stage 1 start
[SHOT] 4a
[COMPOSITION] Medium, eye level, static.
[CAST IN FRAME] @barber, centered, reaching toward the counter, both hands empty, about to bend for the tablet.
[EMOTION LOCK] @barber: focused downward gaze, calm, unhurried posture.
[LIGHTING LOCK] [shared look block]
[ENVIRONMENT] @shop_C: counter view, clear countertop space, plain cream wall above wood wainscoting.
[PROPS IN FRAME] Nothing in his hands yet. Tablet not visible (still under the counter).
[REFERENCES]
- @image1 - @barber_face. Controls face and hair only. Do not use its background.
- @image2 - @barber_body. Controls build and wardrobe only. Do not use its background.
- @image3 - @shop_C. Controls the space, materials and light only. Do not use any people in it.
[CAMERA] 35mm feel, shallow DOF.
[EXCLUSIONS] No text, no logos, no second person, no tablet yet.
```
```
[KEYFRAME ID] MKG-02-S5-KF-MID
[FEEDS] Stage 1 end / Stage 2 start (this single frame does both jobs)
[SHOT] 4a end / 5a start
[COMPOSITION] Same framing as KF-START, no camera change.
[CAST IN FRAME] @barber, same pose, tablet now set on the counter, screen facing up, his hand resting near it.
[EMOTION LOCK] @barber: calm, settled, unhurried.
[LIGHTING LOCK] Identical to KF-START.
[ENVIRONMENT] Identical to KF-START.
[PROPS IN FRAME] @tablet resting flat on the counter, flat chroma-key green screen facing camera, no glare.
[REFERENCES]
- Same three as KF-START, plus @image4 - @tablet. Controls case shape and the flat chroma-key green screen only. Exactly one tablet appears; belongs to the barber. Do not use its background.
[CAMERA] Identical to KF-START.
[EXCLUSIONS] No text, no logos, no interface on the screen, no second person.
```
```
[KEYFRAME ID] MKG-02-S5-KF-END
[FEEDS] Stage 2 end
[SHOT] 5a end
[COMPOSITION] Close-up on the tablet screen, top-down eye line, static camera.
[CAST IN FRAME] @barber's hand and one fingertip only, resting on the center of the screen.
[EMOTION LOCK] N/A (face not in frame).
[LIGHTING LOCK] Identical to KF-START.
[ENVIRONMENT] @shop_C, tight on the counter.
[PROPS IN FRAME] One fingertip resting on the center of the flat green screen; screen still flat green, no interface.
[REFERENCES]
- @image2 - @barber_body. Controls hand only.
- @image4 - @tablet. Controls case shape and the flat chroma-key green screen only.
[CAMERA] Close-up, top-down, 50mm feel.
[EXCLUSIONS] No text, no logos, no interface on the screen, no second device.
```

---

## S6a — start + end, two chained stages (3 frames)

```
[KEYFRAME ID] MKG-02-S6a-KF-START
[FEEDS] Stage 1 start
[SHOT] 6a (poof 1 of 4)
[COMPOSITION] Over-the-shoulder behind @barber, tablet edge visible at the bottom of frame, chair row beyond, receding toward center (not spread left-right).
[CAST IN FRAME] @barber, back/shoulder in foreground, finger about to touch the tablet screen. All four chairs beyond him empty. Two unreferenced background barbers already standing beside the two nearest chairs, waiting.
[EMOTION LOCK] @barber: focused on the tablet, unbothered.
[LIGHTING LOCK] [shared look block]
[ENVIRONMENT] @shop_A (reused — no separate @shop_E plate was generated; same chair-row/mirror/counter room as S4).
[PROPS IN FRAME] @tablet in the barber's hand, all four chairs empty.
[REFERENCES]
- @image1 - @barber_face. Controls face and hair only. Do not use its background.
- @image2 - @barber_body. Controls build and wardrobe only. Do not use its background.
- @image3 - @shop_A (reused as @shop_E). Controls the space, chair and mirror layout only. Do not use any people in it.
- @image4 - @tablet. Controls case shape and the flat chroma-key green screen only.
[CAMERA] 35mm feel, shallow DOF.
[EXCLUSIONS] No faces on the background barbers, no customers seated yet, no readable UI on the tablet.
```
```
[KEYFRAME ID] MKG-02-S6a-KF-A
[FEEDS] Stage 1 end / Stage 2 start (this single frame does both jobs)
[SHOT] 6a (poof 1 complete / poof 2 start)
[COMPOSITION] Same OTS framing, no camera change.
[CAST IN FRAME] Same as KF-START. Nearest chair now occupied by a customer (back to camera, unreferenced), the background barber beside it now cutting. Smoke dissipated. Remaining chairs still empty.
[EMOTION LOCK] @barber: unchanged, focused on the tablet.
[LIGHTING LOCK] Identical to KF-START.
[ENVIRONMENT] Identical to KF-START.
[PROPS IN FRAME] One chair occupied, clippers in the first background barber's hand, active.
[REFERENCES] Same as KF-START.
[CAMERA] Identical to KF-START.
[EXCLUSIONS] No face on the seated customer, no smoke residue.
```
```
[KEYFRAME ID] MKG-02-S6a-KF-END
[FEEDS] Stage 2 end
[SHOT] 6a (poofs 1-2 complete)
[COMPOSITION] Same OTS framing.
[CAST IN FRAME] Same as KF-A. Two nearest chairs now occupied and being cut. Remaining two chairs still empty.
[EMOTION LOCK] @barber: unchanged.
[LIGHTING LOCK] Identical to KF-START.
[ENVIRONMENT] Identical to KF-START.
[PROPS IN FRAME] Two chairs occupied, both background barbers cutting, no smoke visible.
[REFERENCES] Same as KF-START.
[CAMERA] Identical to KF-START.
[EXCLUSIONS] No faces on seated customers, no smoke residue.
```

---

## S6b — start + end, two chained stages (2 new frames; start frame reuses S6a-KF-END)

```
[KEYFRAME ID] MKG-02-S6b-KF-START
[FEEDS] Stage 1 start — this is MKG-02-S6a-KF-END, reused verbatim (no new generation).
```
```
[KEYFRAME ID] MKG-02-S6b-KF-B
[FEEDS] Stage 1 end / Stage 2 start
[SHOT] 6a (poof 3 complete / poof 4 start)
[COMPOSITION] Same OTS framing.
[CAST IN FRAME] Third chair now occupied and being cut. Fourth chair still empty. First two chairs unchanged from S6a-KF-END.
[EMOTION LOCK] @barber: unchanged.
[LIGHTING LOCK] [shared look block]
[ENVIRONMENT] @shop_A (reused as @shop_E).
[PROPS IN FRAME] Three chairs occupied, three barbers cutting.
[REFERENCES] Same as S6a-KF-START.
[CAMERA] Identical to S6a.
[EXCLUSIONS] No face on the seated customer.
```
```
[KEYFRAME ID] MKG-02-S6b-KF-END
[FEEDS] Stage 2 end
[SHOT] 6a complete — this is the state S9's opening must match.
[COMPOSITION] Same OTS framing.
[CAST IN FRAME] All four chairs occupied and being cut. The customer at the last (fourth) chair is clearly holding a snooker cue, leaning it against the chair arm.
[EMOTION LOCK] @barber: unchanged.
[LIGHTING LOCK] [shared look block]
[ENVIRONMENT] @shop_A (reused as @shop_E).
[PROPS IN FRAME] Four chairs occupied, four barbers cutting, the cue clearly visible and unambiguous at the last chair — this detail must read clearly since it pays off in S9.
[REFERENCES] Same as S6a-KF-START.
[CAMERA] Identical to S6a.
[EXCLUSIONS] No faces on seated customers, no smoke residue, cue must not be ambiguous or obscured.
```

---

## S7 — start + end, two chained stages (3 frames)

```
[KEYFRAME ID] MKG-02-S7-KF-START
[FEEDS] Stage 1 start
[SHOT] 7a
[COMPOSITION] Medium, eye level, static, at the snooker table.
[CAST IN FRAME] @opponent, cue lifted mid-aim, head turning slightly toward his pocket. @player stays down at the table in the background, soft focus.
[EMOTION LOCK] @opponent: mid-distraction, eyes flicking off his shot, brow twitching. @player: unchanged focus on his own stance.
[LIGHTING LOCK] [shared look block]
[ENVIRONMENT] @lane_A → use @laneA.png (tighter/nearer camera variant, matching this shot's medium framing), same table setup as S2.
[PROPS IN FRAME] @table, both cues in hand.
[REFERENCES]
- @image1 - @opponent_face. Controls face and hair only. Do not use its background.
- @image2 - @opponent_body. Controls build and wardrobe only. Do not use its background.
- @image3 - @player_body. Controls build and wardrobe only (background figure). Do not use its background.
- @image4 - @table. Controls table structure only.
- @image5 - @lane_A (@laneA.png). Controls the location and light only.
[CAMERA] 35mm feel, shallow DOF.
[EXCLUSIONS] No text, no logos, no third person, no rendered ball/pocket physics.
```
```
[KEYFRAME ID] MKG-02-S7-KF-MID
[FEEDS] Stage 1 end / Stage 2 start (this single frame does both jobs)
[SHOT] 7a end / 7b start
[COMPOSITION] Same framing, @opponent now just exiting the frame edge (back visible, departing).
[CAST IN FRAME] @opponent's back, exiting frame right. @player, alone at the table now, looking toward the empty side where his partner stood.
[EMOTION LOCK] @player: beginning to register the empty spot, brows starting to lift.
[LIGHTING LOCK] Identical to KF-START.
[ENVIRONMENT] Identical to KF-START.
[PROPS IN FRAME] @table, @player's cue in hand. @opponent has taken his own cue with him — it is not left on the table.
[REFERENCES] Same as KF-START.
[CAMERA] Identical to KF-START.
[EXCLUSIONS] No rendered ball/pocket physics, no third person.
```
```
[KEYFRAME ID] MKG-02-S7-KF-END
[FEEDS] Stage 2 end
[SHOT] 7b end
[COMPOSITION] Same framing, @opponent fully gone from frame.
[CAST IN FRAME] @player, alone at the table, mid-shrug, shoulders raised, gaze on the empty spot, speaking his line.
[EMOTION LOCK] @player: shoulders raised in a shrug, faint half-smile, open posture, mild bemusement.
[LIGHTING LOCK] Identical to KF-START.
[ENVIRONMENT] Identical to KF-START.
[PROPS IN FRAME] @table, consistent with KF-MID's cue placement.
[REFERENCES]
- @image3 - @player_face. Controls face and hair only. Do not use its background.
- Plus @player_body, @table, @lane_A as above.
[CAMERA] Identical to KF-START.
[EXCLUSIONS] No rendered ball/pocket physics, no second person.
```

---

## S8a — two independent start+end stages, NOT chained (4 frames)

```
[KEYFRAME ID] MKG-02-S8a-KF-1-START
[FEEDS] Stage 1 start
[SHOT] 8a start
[COMPOSITION] Directly overhead, top-down, static camera.
[CAST IN FRAME] One hand (unreferenced) holding a phone, approaching the tablet's edge, not yet touching.
[EMOTION LOCK] N/A (hand only, no face).
[LIGHTING LOCK] [shared look block], even soft light, minimal shadow.
[ENVIRONMENT] @shop_C, counter view.
[PROPS IN FRAME] @tablet flat on the counter, screen blank/uncomposited. One hand + phone (case colour and skin tone to be decided at generation, distinct from the other three taps in S8a/S8b).
[REFERENCES]
- @image1 - @tablet. Controls case shape and the flat chroma-key green screen only. Exactly one tablet appears.
- @image2 - @shop_C. Controls the space, materials and light only. Do not use any people in it.
[CAMERA] Overhead, top-down, 50mm feel.
[EXCLUSIONS] No readable UI or text on the tablet screen, no face, no second tablet.
```
```
[KEYFRAME ID] MKG-02-S8a-KF-1-END
[FEEDS] Stage 1 end
[SHOT] 8a end
[COMPOSITION] Identical framing to KF-1-START, no camera change.
[CAST IN FRAME] Same hand and phone, now touching the tablet's edge, tap complete.
[EMOTION LOCK] N/A.
[LIGHTING LOCK] Identical to KF-1-START.
[ENVIRONMENT] Identical to KF-1-START.
[PROPS IN FRAME] Fingertip/phone resting at the tablet's edge, tap completed.
[REFERENCES] Same as KF-1-START.
[CAMERA] Identical to KF-1-START.
[EXCLUSIONS] Same as KF-1-START.
```
```
[KEYFRAME ID] MKG-02-S8a-KF-2-START
[FEEDS] Stage 2 start
[SHOT] 8b start
[COMPOSITION] Identical framing to KF-1-START/END — camera position, height and lens must match exactly.
[CAST IN FRAME] A different hand (different skin tone) holding a different phone (different case colour), approaching the same spot on the tablet.
[EMOTION LOCK] N/A.
[LIGHTING LOCK] Identical to KF-1-START.
[ENVIRONMENT] Identical to KF-1-START.
[PROPS IN FRAME] @tablet unchanged from KF-1-END (same counter, same tablet); new hand + phone not yet touching.
[REFERENCES] Same two as KF-1-START.
[CAMERA] Identical to KF-1-START.
[EXCLUSIONS] Same as KF-1-START, plus: must visibly differ from the hand/phone in KF-1.
```
```
[KEYFRAME ID] MKG-02-S8a-KF-2-END
[FEEDS] Stage 2 end
[SHOT] 8b end
[COMPOSITION] Identical framing.
[CAST IN FRAME] Same second hand/phone, tap complete.
[EMOTION LOCK] N/A.
[LIGHTING LOCK] Identical to KF-1-START.
[ENVIRONMENT] Identical to KF-1-START.
[PROPS IN FRAME] Fingertip/phone resting at the tablet's edge, tap completed; tablet, counter and framing unchanged throughout S8a.
[REFERENCES] Same as KF-1-START.
[CAMERA] Identical to KF-1-START.
[EXCLUSIONS] Same as KF-1-START.
```

---

## S8b — two independent start+end stages, NOT chained (4 frames)

Identical structure to S8a, same locked framing, two more distinct hands/phones — both must visibly differ from each other and from the two used in S8a.

```
[KEYFRAME ID] MKG-02-S8b-KF-3-START
[FEEDS] Stage 1 start
[SHOT] 8c start
[COMPOSITION] Identical framing to S8a's frames — camera position, height and lens must match exactly across S8a and S8b.
[CAST IN FRAME] A third distinct hand and phone, approaching the tablet's same spot.
[EMOTION LOCK] N/A.
[LIGHTING LOCK] Identical to S8a.
[ENVIRONMENT] Identical to S8a (@shop_C).
[PROPS IN FRAME] @tablet unchanged; third hand + phone not yet touching.
[REFERENCES]
- @image1 - @tablet. Controls case shape and the flat chroma-key green screen only.
- @image2 - @shop_C. Controls the space, materials and light only.
[CAMERA] Identical to S8a.
[EXCLUSIONS] No readable UI, no face, no second tablet, no repeat of a hand/phone used in S8a.
```
```
[KEYFRAME ID] MKG-02-S8b-KF-3-END
[FEEDS] Stage 1 end
[SHOT] 8c end
[COMPOSITION] Identical framing.
[CAST IN FRAME] Same third hand/phone, tap complete.
[EMOTION LOCK] N/A.
[LIGHTING LOCK] Identical to S8a.
[ENVIRONMENT] Identical to S8a.
[PROPS IN FRAME] Fingertip/phone resting at the tablet's edge, tap completed.
[REFERENCES] Same as KF-3-START.
[CAMERA] Identical to S8a.
[EXCLUSIONS] Same as KF-3-START.
```
```
[KEYFRAME ID] MKG-02-S8b-KF-4-START
[FEEDS] Stage 2 start
[SHOT] 8d start
[COMPOSITION] Identical framing.
[CAST IN FRAME] A fourth distinct hand and phone, approaching the tablet's same spot.
[EMOTION LOCK] N/A.
[LIGHTING LOCK] Identical to S8a.
[ENVIRONMENT] Identical to S8a.
[PROPS IN FRAME] @tablet unchanged; fourth hand + phone not yet touching.
[REFERENCES] Same as KF-3-START.
[CAMERA] Identical to S8a.
[EXCLUSIONS] No readable UI, no face, no second tablet, no repeat of any hand/phone used in S8a or S8b-KF-3.
```
```
[KEYFRAME ID] MKG-02-S8b-KF-4-END
[FEEDS] Stage 2 end
[SHOT] 8d end
[COMPOSITION] Identical framing.
[CAST IN FRAME] Same fourth hand/phone, tap complete.
[EMOTION LOCK] N/A.
[LIGHTING LOCK] Identical to S8a.
[ENVIRONMENT] Identical to S8a.
[PROPS IN FRAME] Fingertip/phone resting at the tablet's edge, tap completed; all four hands across S8a/S8b must read as visibly different people.
[REFERENCES] Same as KF-3-START.
[CAMERA] Identical to S8a.
[EXCLUSIONS] Same as KF-3-START.
```

---

## S9 — single

```
[KEYFRAME ID] MKG-02-S9-KF-START
[SHOT] 9a
[COMPOSITION] Wide, gentle eye level, static, angled down the length of the shop. Row of chairs centered, nothing important in the outer thirds. Clear, evenly lit band in the upper third reserved as the text-safe zone.
[CAST IN FRAME] Barbers (backs to camera, unreferenced) working down the row of chairs, each cutting a customer's hair (backs to camera). The rightmost chair holds the customer with the snooker cue — matching MKG-02-S6b-KF-END exactly — caped and mid-cut, cue leaning against the chair arm.
[EMOTION LOCK] N/A (backs to camera; no faces in frame).
[LIGHTING LOCK] [shared look block]
[ENVIRONMENT] @shop_A (reused — no separate @shop_D plate was generated). CAUTION: the
generated @shop_A still shows ceiling detail (a light fixture, crown molding, water
staining) near the top of frame, not a guaranteed clean band. When composing this
keyframe, crop/frame so the text-safe upper third lands on the plainer stretch of
wall above the mirrors rather than the ceiling — check this specifically when
reviewing the generated still, since S9's logo/tagline compositing depends on it.
[PROPS IN FRAME] Full row occupied, cue clearly visible at the rightmost chair, upper third clean — no fans, frames or clutter.
[REFERENCES]
- @image1 - @barber_face. Controls face and hair only (barber is present in the row but back to camera; identity carried loosely). Do not use its background.
- @image2 - @barber_body. Controls build and wardrobe only. Do not use its background.
- @image3 - @shop_A (reused as @shop_D). Controls the space only — see the CAUTION above about the upper band. Do not use any people in it.
[CAMERA] 35mm feel, shallow DOF, fine film grain.
[EXCLUSIONS] No ceiling fans, frames or clutter in the upper third, no on-screen text or logo (composited later), no faces on background customers.
[FEEDS] MKG-02-S9, single-frame stage (route: I2V/R2V from this frame, held/minimal settle).
```
