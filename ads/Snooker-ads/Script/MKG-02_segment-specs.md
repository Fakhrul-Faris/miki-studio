# MKG-02 — Segment specs (Gate 9)

11 generations for the 11-segment plan approved at Gate 8. Shared look block, reference handles and project-wide DO NOT INCLUDE rules are defined once below; each spec states only what's specific to it.

## Shared look block
```
Cinematic live-action commercial, warm late-afternoon Saturday light, stable camera, 35 mm lens with shallow depth of field, warm amber-and-teal grade with soft contrast, fine film grain, colourful lived-in production design, real skin texture, classic brick city-street neighbourhood with a retro wood-panelled barbershop, no on-screen text, no logos, no legible signage.
```

## Reference handles (all reused from MKG-01, no new generation except @shop_E)
- `@barber_face` / `@barber_body` — Karim, 38, Lebanese
- `@player_face` / `@player_body` — Min-jun, 33, Korean, black waistcoat/blue check shirt
- `@opponent_face` / `@opponent_body` — Tomasz, 44, Polish, mustard polo
- `@shop_A`, `@shop_B`, `@shop_C`, `@shop_D` — existing MKG-01 shop angles
- `@shop_E` — new chair-row angle (Gate 7)
- `@lane_A` — existing street plate
- `@table` — snooker table, 3/4 hero
- `@tablet` — front view, flat chroma-key green screen

## Project-wide DO NOT INCLUDE (restate the top 2-3 per segment, don't inherit the whole list blindly)
No on-screen text, no logos, no legible signage, no extra unplanned people, no music, no mirror reflections of people, no duplicated characters, no readable UI on the tablet screen.

---

## SEGMENT SPEC — MKG-02-S1

### [SETTINGS]
Model: Seedance 2.5 | Route: R2V asset references
Budget: 4 s (provider minimum; final cut trims to 2 s)
Aspect: 16:9, action in the center third | Native audio: on (ambience only) | Music: none

### [GOAL]
Hook: an extreme close-up on a snooker player's eye as he aims. Duration: 4 s.

### [REFERENCES]
- @player_face — @player face close-up. Controls face and eye only. Do not use its background.
- @lane_A — street plate. Controls the ambient light quality only. Do not use any people in it.

### [CONTINUITY]
- Player: the only person in frame, held on his eye and brow only.
- Scene: outdoors, late-afternoon light, one static setup.

Extreme close-up, eye level, static camera, no zoom. The player's eye is sharp and focused, faint catchlight from warm afternoon sun; a soft out-of-focus suggestion of a cue stick edge drifts into the lower right of frame. His gaze holds steady on an off-screen target.
End state: eye and brow held in sharp focus, gaze fixed forward, cue-edge blur still visible lower right.

### [LOOK]
[shared look block]. Mood: focused stillness — steady gaze, no blink.

### [CAMERA AND PERFORMANCE]
Cutting: none, single continuous take. No handheld shake, no zoom, no rack focus.
Player: eye steady, no blink, faint furrow of concentration in the brow.

### [AUDIO]
SFX: faint cue-chalk squeak, distant street ambience. Ambience: outdoor street room tone. Music: none. Subtitles: off.

### [KEEP CONSISTENT]
Same player identity and eye framing; same warm afternoon light as the rest of the lane segments.

### [DO NOT INCLUDE]
No on-screen text, no second person entering frame, no camera movement.

---

## SEGMENT SPEC — MKG-02-S2

### [SETTINGS]
Model: Seedance 2.5 | Route: R2V asset references
Budget: 4 s (provider minimum; final cut trims to 3 s)
Aspect: 16:9, action in the center third — queue composed receding into depth, not left-right | Native audio: on (ambience) | Music: none

### [GOAL]
Wide reveal: the snooker game in full, with the pavement queue trailing back behind it. Duration: 4 s.

### [REFERENCES]
- @player_face / @player_body — @player. Controls face, build and wardrobe only. Do not use its background.
- @opponent_face / @opponent_body — @opponent. Controls face, build and wardrobe only. Do not use its background.
- @table — snooker table. Controls table structure and layout only; exactly one table appears.
- @lane_A — street plate. Controls the location and light only. Do not use any people from it.

### [CONTINUITY]
- Player and opponent: the only named people in frame; up to 4 additional background queue figures in soft focus, unreferenced.
- Scene: same outdoor setup as S1, one lighting condition.

Wide static shot, eye level. @player leans over the table lining up his shot; @opponent stands across the table leaning on his own cue, watching. Behind them, a queue of paired figures curves back along the brick wall, composed receding toward the center of frame so the 9:16 crop still reads its depth — not spread left-right. Queue figures stay soft/out of focus, at most 4 clear, the rest implied.
End state: both players held in their positions at the table, the queue visibly trailing back behind them, all in one static frame.

### [LOOK]
[shared look block]. Mood: idle tension — player focused, opponent watching, queue restless in the background.

### [CAMERA AND PERFORMANCE]
Cutting: none, single continuous take. No push-in, no pan.
Player: focused stillness over the shot. Opponent: relaxed, arms loose on the cue, mild boredom.

### [AUDIO]
SFX: cue chalk squeak, ambient street murmur, faint distant queue chatter. Ambience: outdoor street room tone. Music: none. Subtitles: off.

### [KEEP CONSISTENT]
Same two identities and wardrobe as S1/S7; same table and street plate; queue composed in depth, not spread.

### [DO NOT INCLUDE]
No more than 4 clear background figures, no legible signage, no camera movement.

---

## SEGMENT SPEC — MKG-02-S3

### [SETTINGS]
Model: Seedance 2.5 | Route: R2V asset references
Budget: 4 s (provider minimum; final cut trims to 2 s)
Aspect: 16:9, action in the center third | Native audio: on (ambience) | Music: none

### [GOAL]
Interior: the owner watching the chaos outside through his shop window. Duration: 4 s.

### [REFERENCES]
- @barber_face / @barber_body — @barber. Controls face, build and wardrobe only. Do not use its background.
- @shop_B — shop plate (front-facing angle, window visible). Controls the space, materials and light only. Do not use any people in it.

### [CONTINUITY]
- Barber: the only person in frame.
- Scene: interior, framed against the shop's front window, one lighting setup.

Medium static shot, eye level, from inside the shop looking toward the window. The barber stands still, clippers loose in one hand, watching through the glass; the pavement scene beyond is implied but out of focus. Mint-green interior wall and window frame visible around him.
End state: barber held still, gaze fixed through the window, clippers at rest in his hand.

### [LOOK]
[shared look block]. Mood: quiet concern — steady gaze, faint tension in the jaw.

### [CAMERA AND PERFORMANCE]
Cutting: none, single continuous take. No zoom, no handheld shake.
Barber: still, watchful, no other movement.

### [AUDIO]
SFX: faint clippers idle hum, muffled street sound through glass. Ambience: shop interior room tone. Music: none. Subtitles: off.

### [KEEP CONSISTENT]
Same barber identity and wardrobe as S4/S5/S6/S9; same shop interior light.

### [DO NOT INCLUDE]
No legible signage or window lettering, no second person, no camera movement.

---

## SEGMENT SPEC — MKG-02-S4

### [SETTINGS]
Model: Seedance 2.5 | Route: R2V asset references
Budget: 4 s (provider minimum; final cut trims to 3 s)
Aspect: 16:9, action in the center third | Native audio: on (dialogue) | Music: none

### [GOAL]
The owner mid-cut, clippers paused, counting the queue under his breath. Duration: 4 s.

### [REFERENCES]
- @barber_face / @barber_body — @barber. Controls face, build and wardrobe only. Do not use its background.
- @shop_A — shop plate (chair row, hero angle). Controls the space, chair and mirror layout only. Do not use any people in it.

### [CONTINUITY]
- Barber: the only named person in frame; one unreferenced background customer seated in the chair, back to camera, plain wardrobe.
- Scene: interior, one barber chair, one lighting setup.

Medium-close static shot, eye level. The barber stands beside the chair, clippers paused mid-air near the seated customer's head (customer's back to camera throughout), his gaze angled off toward the window, lips moving slightly as he counts under his breath.
End state: clippers held motionless near the customer's head, barber's gaze still off-frame toward the window.

### [LOOK]
[shared look block]. Mood: quiet arithmetic — lips moving, eyes distant.

### [CAMERA AND PERFORMANCE]
Cutting: none, single continuous take. No zoom, no handheld shake.
Barber: dialogue delivery is under-the-breath, low energy, minimal facial movement beyond the mouth.

### [AUDIO]
Dialogue: Barber, English: "Fourteen... fifteen..." SFX: clippers idle hum. Ambience: shop interior room tone, faint street noise through glass. Music: none. Subtitles: off.

### [KEEP CONSISTENT]
Same barber identity and wardrobe as S3/S5/S6/S9; same chair and shop light; background customer stays generic and unreferenced.

### [DO NOT INCLUDE]
No visible face on the background customer, no second barber, no camera movement.

---

## SEGMENT SPEC — MKG-02-S5

### [SETTINGS]
Model: Seedance 2.5 | Route: R2V asset references
Budget: 6 s (final cut 5 s across two stages, +1 s trim handle)
Aspect: 16:9, action in the center third | Native audio: on (SFX) | Music: none

### [GOAL]
Product shots 1 and 2: the barber pulls the tablet from under the counter and taps it once. Duration: 6 s.

### [REFERENCES]
- @barber_face / @barber_body — @barber. Controls face, build and wardrobe only. Do not use its background.
- @shop_C — shop plate, counter view with clear countertop space. Controls the space, materials and light only. Do not use any people in it.
- @tablet — tablet front view. Controls case shape and the flat chroma-key green screen only. Exactly one tablet appears; the tablet belongs to the barber. Do not use its background.

### [CONTINUITY]
- Barber: the only person in frame; same identity and clothing throughout.
- Scene: the back counter of the barbershop, one lighting setup.

### [STAGES]
- STAGE 1 — 3 s — The pickup
  Uses: @barber_face, @barber_body, @shop_C, @tablet
  Frame: medium shot, eye level, static camera
  Action: the barber reaches under the counter, lifts the tablet out, and sets it down on the countertop, screen facing up.
  End state: the tablet rests flat on the counter, flat chroma-key green screen facing camera; the barber's hand still resting near it.
  Transition out: HARD CUT
- STAGE 2 — 3 s — One tap
  Uses: @barber_body, @shop_C, @tablet
  Frame: close-up on the tablet screen, top-down eye line, static camera
  Action: one fingertip touches the center of the flat green screen once.
  End state: one fingertip rests on the center of the green screen; the screen is still flat green with no interface.
  Transition out: NO CUT (segment end)

### [LOOK]
[shared look block]. Mood: quiet resolve — the barber's motion is calm, deliberate.

### [CAMERA AND PERFORMANCE]
Cutting: hard cut between the two stages. No zooms, no handheld shake.
Barber: economical, unhurried movement; only the hand and finger move in stage 2.

### [AUDIO]
SFX: soft thud as the tablet is set down (stage 1), single crisp tap (stage 2). Ambience: shop room tone. Music: none. Subtitles: off.

### [KEEP CONSISTENT]
Same barber; exactly one tablet with a flat matte chroma-key green screen; same counter and light.

### [DO NOT INCLUDE]
No on-screen text, no interface on the screen, no second person, no music.

---

## SEGMENT SPEC — MKG-02-S6a

### [SETTINGS]
Model: Seedance 2.5 | Route: R2V asset references
Budget: 4 s (provider minimum; final cut trims to ~1.5 s)
Aspect: 16:9, action in the center third | Native audio: on (SFX) | Music: none

### [GOAL]
Magical-realism beat, part 1 of 2: the first two customers poof onto chairs as the barber's finger runs across the tablet. Duration: 4 s.

### [REFERENCES]
- @barber_face / @barber_body — @barber. Controls face, build and wardrobe only. Do not use its background.
- @shop_E — chair-row plate (four chairs). Controls the space, chair and mirror layout only. Do not use any people in it.
- @tablet — tablet front view. Controls case shape and the flat chroma-key green screen only. Exactly one tablet appears. Do not use its background.

### [CONTINUITY]
- Barber: only named person, seen from behind/over-the-shoulder, tablet in his hand.
- Two unreferenced background barbers, backs to camera, plain shop-appropriate wardrobe, one already standing beside each of the two nearest chairs.
- Two unreferenced customers, backs to camera only — no faces generated for any of them.
- Scene: interior, chair-row angle, one lighting setup.

### [STAGES]
- STAGE 1 — 2 s — First poof
  Uses: @barber_body, @shop_E, @tablet
  Frame: over-the-shoulder behind the barber, tablet visible at the bottom of frame, chairs beyond
  Action: the barber's finger runs once across the tablet screen; on the nearest chair, a customer (back to camera) appears in a small puff of stylised smoke, and the barber standing beside that chair begins cutting immediately.
  End state: one chair now occupied, customer's back to camera, barber mid-cut; the smoke puff dissipating.
  Transition out: NO CUT
- STAGE 2 — 2 s — Second poof
  Uses: @barber_body, @shop_E, @tablet
  Frame: same over-the-shoulder framing, static
  Action: a second puff of smoke appears at the next chair over; a second customer (back to camera) appears seated, and the second background barber begins cutting immediately.
  End state: two chairs now occupied, both barbers mid-cut, both smoke puffs dissipated.
  Transition out: HARD CUT (to S6b)

### [LOOK]
[shared look block], plus for this segment only: soft grey stylised smoke puffs accompanying each appearance — a deliberate magical-realism device, not photoreal VFX.

### [CAMERA AND PERFORMANCE]
Cutting: none within the segment; hard cut out to S6b. No zoom, no handheld shake.
Barber: focused on the tablet, unbothered by the poofs behind him.

### [AUDIO]
SFX: soft "poof" plus light smoke-puff foley on each appearance, clippers starting up as each barber begins cutting. Ambience: shop room tone. Music: none. Subtitles: off.

### [KEEP CONSISTENT]
Same barber and tablet; same chair-row plate as S6b; customers and background barbers stay backs-only and unreferenced.

### [DO NOT INCLUDE]
No faces on any poofed customer or background barber, no more than 2 poof events in this segment, no readable UI on the tablet.

---

## SEGMENT SPEC — MKG-02-S6b

### [SETTINGS]
Model: Seedance 2.5 | Route: R2V asset references
Budget: 4 s (provider minimum; final cut trims to ~1.5 s)
Aspect: 16:9, action in the center third | Native audio: on (SFX) | Music: none

### [GOAL]
Magical-realism beat, part 2 of 2: the last two customers poof onto chairs, one of them still holding a snooker cue. Duration: 4 s.

### [REFERENCES]
- @barber_face / @barber_body — @barber. Controls face, build and wardrobe only. Do not use its background.
- @shop_E — chair-row plate. Controls the space, chair and mirror layout only. Do not use any people in it.
- @tablet — tablet front view. Controls case shape and the flat chroma-key green screen only. Do not use its background.

### [CONTINUITY]
- Barber: same as S6a, tablet still in hand.
- Continuing from S6a's end state: two chairs already occupied and being cut, visible in the background of this frame.
- Two more unreferenced background barbers and two more unreferenced customers (backs only), one customer holding a snooker cue.
- Scene: same chair-row angle and lighting as S6a.

### [STAGES]
- STAGE 1 — 2 s — Third poof
  Uses: @barber_body, @shop_E, @tablet
  Frame: same over-the-shoulder framing as S6a, static
  Action: a third puff of smoke appears at the next chair; a customer (back to camera) appears seated, third background barber begins cutting immediately.
  End state: three chairs now occupied and being cut.
  Transition out: NO CUT
- STAGE 2 — 2 s — Fourth poof (button-gag plant)
  Uses: @barber_body, @shop_E, @tablet
  Frame: same framing, static
  Action: a fourth puff of smoke appears at the last chair; a customer (back to camera) appears seated, still holding a snooker cue upright against the chair arm, and the fourth background barber begins cutting immediately.
  End state: all four chairs occupied and being cut; the cue clearly visible leaning against the last chair.
  Transition out: HARD CUT (to lane, S7)

### [LOOK]
[shared look block], plus the same stylised smoke-puff device as S6a.

### [CAMERA AND PERFORMANCE]
Cutting: none within the segment. No zoom, no handheld shake.
Barber: unchanged focus on the tablet.

### [AUDIO]
SFX: soft "poof" plus light smoke-puff foley on each appearance, clippers starting up as each barber begins cutting. Ambience: shop room tone. Music: none. Subtitles: off.

### [KEEP CONSISTENT]
Same barber, tablet and chair-row plate as S6a; the cue-holding customer must read clearly — this plant pays off in S9.

### [DO NOT INCLUDE]
No faces on any poofed customer or background barber, no more than 2 poof events in this segment, no readable UI on the tablet.

---

## SEGMENT SPEC — MKG-02-S7

### [SETTINGS]
Model: Seedance 2.5 | Route: R2V asset references
Budget: 6 s (final cut 4 s across two stages, +2 s trim handle)
Aspect: 16:9, action in the center third | Native audio: on (dialogue, SFX) | Music: none

### [GOAL]
The called man peels off from the table mid-aim; his partner is left alone and shrugs. Duration: 6 s.

### [REFERENCES]
- @opponent_face / @opponent_body — @opponent. Controls face, build and wardrobe only. Do not use its background.
- @player_face / @player_body — @player. Controls face, build and wardrobe only. Do not use its background.
- @table — snooker table. Controls table structure only; exactly one table appears.
- @lane_A — street plate. Controls the location and light only.

### [CONTINUITY]
- Opponent and player: the only two people in frame throughout.
- Scene: same outdoor table setup as S1/S2, one lighting condition.

### [STAGES]
- STAGE 1 — 3 s — The peel-off
  Uses: @opponent_face, @opponent_body, @player_body, @table, @lane_A
  Frame: medium shot, eye level, static camera
  Action: @opponent, cue lifted mid-aim, feels his phone buzz in his pocket, pauses, straightens up, and turns to walk off toward the shop; @player stays down at the table in the background, out of focus.
  End state: opponent mid-stride leaving frame; player still positioned at the table, unmoved.
  Transition out: NO CUT
- STAGE 2 — 3 s — The shrug
  Uses: @player_face, @player_body, @table, @lane_A
  Frame: medium shot, eye level, static camera, opponent now absent from frame
  Action: @player, now alone at the table, looks at the empty side where his partner stood, raises his shoulders in a shrug, and speaks his line.
  Dialogue: Player, English: "...your shot."
  End state: player mid-shrug, alone at the table, gaze on the empty spot.
  Transition out: HARD CUT (to S8a)

### [LOOK]
[shared look block]. Mood: mild bemusement — raised brows, half-smile, open palms.

### [CAMERA AND PERFORMANCE]
Cutting: hard cut between the two stages (opponent exits between them). No zoom, no handheld shake.
Opponent: distracted then decisive. Player: puzzled, dry delivery, no exaggeration.

### [AUDIO]
SFX: phone buzz (stage 1), departing footsteps, cue-strike snap sold entirely by foley — no rendered ball/pocket physics (stage 2 or the cut point). Ambience: outdoor street room tone. Music: none. Subtitles: off.

### [KEEP CONSISTENT]
Same two identities and wardrobe as S1/S2; same table and street plate; no ball/pocket physics rendered.

### [DO NOT INCLUDE]
No rendered cue-strike or ball-into-pocket physics, no third person entering frame, no camera movement.

---

## SEGMENT SPEC — MKG-02-S8a

### [SETTINGS]
Model: Seedance 2.5 | Route: R2V asset references
Budget: 5 s (final cut 4 s across two stages, +1 s trim handle)
Aspect: 16:9, action in the center third | Native audio: on (SFX) | Music: none

### [GOAL]
Product shots 4 and 5: two static top-down payment taps, different hand and phone each time, everything else locked. Duration: 5 s.

### [REFERENCES]
- @tablet — tablet front view. Controls case shape and the flat chroma-key green screen only. Exactly one tablet appears. Do not use its background.
- @shop_C — shop plate, counter view. Controls the space, materials and light only. Do not use any people in it.

### [CONTINUITY]
- No named characters; unreferenced hands and phones only, deliberately varied between the two stages.
- Scene: same counter, camera position and lighting locked identically across both stages.

### [STAGES]
- STAGE 1 — 2 s — Tap one
  Uses: @tablet, @shop_C
  Frame: directly overhead, top-down, static camera
  Action: one hand holds a phone just above the tablet's edge, taps once.
  End state: fingertip/phone held at the tablet's edge, tap completed.
  Transition out: HARD CUT
- STAGE 2 — 2 s — Tap two
  Uses: @tablet, @shop_C
  Frame: same overhead framing, identical camera position
  Action: a different hand (different skin tone) holds a different phone (different case colour) above the same spot on the tablet, taps once.
  End state: second fingertip/phone held at the tablet's edge, tap completed; tablet, counter and framing unchanged from stage 1.
  Transition out: NO CUT (segment end)

### [LOOK]
[shared look block]. Mood: brisk, functional — no performance beyond the tap itself.

### [CAMERA AND PERFORMANCE]
Cutting: hard cut between the two stages. Camera position, height and lens identical in both — nothing else may vary except the hand and phone.

### [AUDIO]
SFX: one soft UI chime per tap. Ambience: shop room tone, kept quiet. Music: none. Subtitles: off. (Final pacing/sound sweetening done in post.)

### [KEEP CONSISTENT]
Same tablet, same counter, same camera framing and lighting across both stages — only the hand and phone change.

### [DO NOT INCLUDE]
No readable UI or text on the tablet screen, no faces, no second tablet.

---

## SEGMENT SPEC — MKG-02-S8b

### [SETTINGS]
Model: Seedance 2.5 | Route: R2V asset references
Budget: 5 s (final cut 4 s across two stages, +1 s trim handle)
Aspect: 16:9, action in the center third | Native audio: on (SFX) | Music: none

### [GOAL]
Product shots 6 and 7: two more static top-down payment taps, same locked setup as S8a. Duration: 5 s.

### [REFERENCES]
- @tablet — tablet front view. Controls case shape and the flat chroma-key green screen only. Exactly one tablet appears. Do not use its background.
- @shop_C — shop plate, counter view. Controls the space, materials and light only. Do not use any people in it.

### [CONTINUITY]
- No named characters; unreferenced hands and phones only, deliberately varied between the two stages and distinct from S8a's two hands.
- Scene: identical counter, camera position and lighting to S8a.

### [STAGES]
- STAGE 1 — 2 s — Tap three
  Uses: @tablet, @shop_C
  Frame: directly overhead, top-down, static camera — identical position to S8a
  Action: a third distinct hand and phone tap the same spot on the tablet once.
  End state: fingertip/phone held at the tablet's edge, tap completed.
  Transition out: HARD CUT
- STAGE 2 — 2 s — Tap four
  Uses: @tablet, @shop_C
  Frame: same overhead framing
  Action: a fourth distinct hand and phone tap the same spot once.
  End state: fourth fingertip/phone held at the tablet's edge, tap completed; tablet, counter and framing unchanged throughout.
  Transition out: HARD CUT (to S9)

### [LOOK]
[shared look block]. Mood: brisk, functional.

### [CAMERA AND PERFORMANCE]
Cutting: hard cut between the two stages. Camera position, height and lens identical to S8a and within this segment.

### [AUDIO]
SFX: one soft UI chime per tap. Ambience: shop room tone, kept quiet. Music: none. Subtitles: off.

### [KEEP CONSISTENT]
Same tablet, counter, camera framing and lighting as S8a — only the hand and phone change, and all four hands across S8a/S8b must read as visibly different people.

### [DO NOT INCLUDE]
No readable UI or text on the tablet screen, no faces, no second tablet, no repeat of a hand/phone already used in S8a.

---

## SEGMENT SPEC — MKG-02-S9

### [SETTINGS]
Model: Seedance 2.5 | Route: R2V asset references
Budget: 6 s (final cut 5 s, +1 s trim handle)
Aspect: 16:9, action in the center third; clear upper-frame band reserved as the text-safe zone | Native audio: on (ambience) | Music: none

### [GOAL]
Living end card: barbers serving customers down the row, ending on the button-gag payoff of the cue-holding customer. Duration: 6 s.

### [REFERENCES]
- @barber_face / @barber_body — @barber. Controls face, build and wardrobe only. Do not use its background.
- @shop_D — shop plate, empty plate with plain mint-green upper third. Controls the space and the clear upper band only. Do not use any people in it.

### [CONTINUITY]
- Barber: one named person, positioned among several unreferenced background barbers, all mid-cut.
- Several unreferenced customers, backs to camera only, including one holding a snooker cue leaning against his chair (continuing from S6b).
- Scene: interior, wide angle, one lighting setup, calm clear band in the upper third reserved for post compositing.

Wide static shot, gentle eye level, angled down the length of the shop. The barbers — backs to camera — work down the row of chairs, each cutting a customer's hair; the rightmost chair holds the customer with the snooker cue still leaning against the chair arm, caped and mid-cut. The upper third of frame stays clear, evenly lit, free of fans, frames or clutter, reserved for the slogan and logo added later in post.
End state: full row occupied and being cut, cue clearly visible at the rightmost chair, upper third clean and evenly lit.

### [LOOK]
[shared look block]. Mood: settled, busy calm — steady hands, low chatter.

### [CAMERA AND PERFORMANCE]
Cutting: none, single continuous take. No zoom, no handheld shake, no pan.
Barbers: steady working motion, no exaggerated performance.

### [AUDIO]
SFX: ambient clippers, low chatter. Ambience: shop room tone. Music: none. Subtitles: off.

### [KEEP CONSISTENT]
Same barber identity; same chair row and cue-holding customer established in S6b; upper third stays clear for post text.

### [DO NOT INCLUDE]
No ceiling fans, frames or clutter in the upper third, no on-screen text or logo (composited later), no faces on background customers.
