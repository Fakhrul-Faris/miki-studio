# Experiments bank

What we test to learn what viewers actually watch. The art style never changes (cut paper, ink, ochre, documentary prints,
diagrams); **the editing, camera, motion and structure do.**

**Rules**
- **Stacked tests (user, 2026-10-30): every episode runs one option from each of the 7 groups** (H, E, C, A, S, U, T),
  so we learn seven things per post instead of one.
- **Attribution by rotation:** each option appears in at least two episodes, each time with different partners. After 8–10
  episodes, compare each option's average (episodes with it vs without). An option that wins across different mixes is real;
  one that wins once is noise. Avoid stacking options that contradict each other (e.g. S6 under 20 s with E3 long holds,
  T2 no captions with U3 voice-off).
- **Write the expectation first:** say what should move on the retention curve before posting.
- **Read it at 72 h** in the calendar's Results table: 3 s retention, average watch time, % watched full, where the biggest
  drop is, comments / shares / saves per 1 000 views. Two or three episodes per test before calling it.
- **Keep what wins in the house format; retire what loses.** Log the verdict in the Verdict column.

Sources folded in (2026-10-30): claymation look numbers (angrypenguinpng/blender-claymation-skill), paper mechanisms, depth planes, piece-by-piece assembly and the paper SFX list (MiniMax-H3 papercraft and paper-collage skills), staircase montage (smixs/visual-skills), rhythm patterns and director overlays (wuwangzhang1216/DirectorSKILL; its anti-slideshow rules are now house QC in `00_bible/visual-system.md`).

Built with what we have: EffectCraft (2D/3D layers, cameras, expressions, masks, time remap), PhotoCraft (cut-outs, depth
plates, fills), ffmpeg, and the stills / voice the user generates. **Feasibility:** ✓ easy · ◐ needs extra media or a test ·
✗ not with our tools.

## Running (assigned 2026-10-30; Scr and Bridge columns added 2026-10-31)

| Day | Episode | Scr length | Bridge | H hook | E edit | C camera | A animation | S structure | U sound | T text | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 2 | EX04 The Peak-End Rule | L1 short (95 w / 32 s) | on | H1 data at frame 0 | house | house | house | house | house | house | _ |
| 3 | EX05 One Barber Down | L2 standard (~108 w) | **off (test)** | H3 motion at frame 0 | E4 interrupt every 4 s | C5 crash zoom on numbers | A4 live data build | S1 seamless loop | U1 no music | T1 big word captions | _ |
| 4 | The Swipe Tax (EX06; C7 + S4 dropped in v2, still untested) | H4 wrong-on-purpose | E7 freeze + call-out | C7 locked-off camera | A1 stop-motion 8 fps | S4 myth vs fact split | U2 paper foley | T3 persistent headline | _ |
| 5 | EX07 Owns No Hotels (L1, Bridge off, diagram-led, 2 stills) | H2 answer first | E1 one unbroken take | C8 four depth planes | A8 paper mechanisms | S2 open loop | U4 faster voice | house subtitles (T2 dropped at review) | _ |
| 6 | EX08 The .99 Trick (L2, Bridge on, type only) | H6 guess-the-timer | E2 cut every 1–1.5 s (1.27 s, on the beat) | C7 locked-off (C6 swapped: no photos) | A2 type only | S3 countdown list | U3 voice-off, text only | T3 persistent headline | _ |
| 7 | EX09 The Other Line (L3, Bridge off, CTA-end, END-next, supermarket) | H2 answer first (H5 dropped: hook is no longer shop-first) | E8 speed ramp | C2 paper-set orbit (Blender) | A3 morph | S1 seamless loop | U1 no music | subtitles (T2 dropped at plan) | _ |
| 8 | Cinemas | H1 data at frame 0 | E6 silence drop | C1 infinite zoom | A7 halftone dissolve | S2 open loop | U2 paper foley | T1 big word captions | _ |
| 9 | EX11 The Price of a No-Show (L1, Bridge off, CTA-end, END-callback, clinic; first paperkit v2 set) | H4 wrong-on-purpose | E5 cut on the beat (every 2 beats, 100 BPM) | C3 top-down paper hands (Blender) | A1 stop-motion 8 fps | S6 under 20 s (19.2 s) | U4 faster voice (×1.1) | subtitles (T2 dropped at plan) | _ |
| 10 | EX12 The Button That Does Nothing (L3, Bridge on: bubble tea, CTA-end, END-next) | H6 guess-the-timer | E13 rule of three (1 · 2 · 3 matched presses, broken by the pull-back) | C4 first-person walk (Blender, five sets) | A8 paper mechanisms (buttons, sliding doors) | S3 countdown list | U2 paper foley + clicks | T1 big word captions | _ |
| 11 | EX13 The Hidden Queue (L2 134 w, Bridge on: Malaysian nasi kandar, CTA-end, END-reframe; first Opuscar beats) | H1 data at frame 0 (split-flap 60 → 23) | E12 the breath (2 s after "walk away") | C2 orbit (printed 3D queue, walls sink) | A4 live data build (pencil chart) | S1 seamless loop (board flips back to the opening) | house + flap clacks | subtitles | V1 News Package + V2 Data Storytelling | _ |
| 12 | EX14 The Long Path (L2 156 w, Bridge on: Klang hardware shop, retail, CTA-end, END-callback; **V3 smooth isometric: no paper, no dots, 60 fps, dark + ochre**) | H2 answer first ("IKEA's maze isn't bad design") | E1 one unbroken take | C new: orthographic isometric camera (top-down → iso swoop, city pull-out) | A new: smooth 60 fps (eased, motion blur, no stepping) | S1 seamless loop (path erases back to frame 0) | soft hits, no paper foley | T1 big word captions (Inter Display Black) | V3 smooth isometric | _ |

Each option shown twice or more is paired with different partners (e.g. S1 with E4/C5 on Day 3 and E8/C2 on Day 7).
Not yet scheduled: E3 long holds, S5 cliffhanger, S7 comment reply (needs comments), A6 rotoscope.

**Blender (pending install):** C2 paper-set orbit, A5 paper physics and C4 first-person walk get real 3D: stills on paper
cards with thickness, real light and shadow, rendered with transparency and composited in EffectCraft.

## 1. Hooks (the first 3 seconds)

| # | Test | Why it might hold people | How we build it | Measure | Feas. |
|---|---|---|---|---|---|
| H1 | **Data at frame 0**: the biggest number fills the screen before any voice | A number + a contradiction is understood in one glance | Stamped Anton at frame 0 | 3 s retention | ✓ (running) |
| H2 | **Answer first, then why**: open on the payoff ("Make it longer. They'll hate it less.") | No setup to sit through | Reorder the script | 3 s retention, avg watch | ✓ |
| H3 | **Motion at frame 0**: the first frame is already mid-move (a tear in progress, a stamp landing) | A static first frame reads as a still and gets skipped | Start the comp 6 frames into a move | 1 s and 3 s retention | ✓ |
| H4 | **Wrong-on-purpose opener**: a common belief stamped, then struck through within 1 s | Disagreement stops the thumb | Stamp + stepped strike | 3 s retention, comments | ✓ |
| H5 | **The viewer's own shop at frame 0**: open on "your shop" and go out to the study, reversing the usual order | Personal relevance first | Reorder; M-photo of a shop first | 3 s retention, saves | ✓ |
| H6 | **Question with a visible timer**: "Guess before 0:03" | A tiny game in the first second | Mono countdown overlay | 3 s retention, comments | ✓ |

## 2. Editing and pacing

| # | Test | Why | How | Measure | Feas. |
|---|---|---|---|---|---|
| E1 | **One unbroken take**: the whole episode as a single camera move through one big paper world, no cuts | Nothing to scroll away at; continuity pulls forward | One giant 3D comp, stills placed in depth, one camera path | Avg watch, % full | ◐ (one long plate set) |
| E2 | **Fast cut rate**: a new image every 1–1.5 s | Each new picture resets attention | More, simpler shots; same voice | Drop points mid-video | ✓ |
| E3 | **Slow, held frames**: 3 shots total, long holds | Calm stands out in a fast feed | Fewer shots, longer camera drifts | Avg watch, saves | ✓ |
| E4 | **Pattern interrupt every 4 s**: a deliberate break (flip to negative paper, a hard freeze, a stamp) at fixed intervals | Fights the slow middle drop | Timed interrupts on a 96-frame grid | Mid-video drop | ✓ |
| E5 | **Cut on the beat**: cuts locked to the music's beats, not the voice | Rhythm feels "edited", not narrated | Beat detection with ffmpeg; cut list from beats | Avg watch, rewatches | ✓ |
| E6 | **Silence drop**: all sound cuts to nothing for 0.5 s before the key fact | The brain leans in when sound vanishes | Duck voice/music/bed | Retention at that moment | ✓ |
| E7 | **Freeze frame + call-out**: the picture freezes, an ink circle and arrow point at the detail | Directs the eye; "look at this" | Time remap hold + trim-path circle | Retention at the freeze, shares | ✓ |
| E9 | **Staircase montage**: shot lengths long → shorter → shorter → a pause → the impact shot | Builds tension into the key fact (a classic montage rhythm) | Plan shot lengths against the voice | Retention at the impact | ✓ |
| E10 | **Accelerating sequence**: each shot about 0.7× the last (4.0 / 2.8 / 2.0 / 1.4 / 1.0 / 0.7 s), then one long 5–8 s release | Pressure building to a decision; the release is mandatory | Plan shot lengths against the voice | Retention through the sequence | ✓ |
| E11 | **Long hold, sudden cut**: one 8–14 s held shot, then a 0.5–1 s shot | The mismatch is the effect | Script a long line over one shot | Retention at the cut | ✓ |
| E12 | **The breath**: a near-empty 2.5–4 s shot with only ambience right after the big fact | The fact sinks in and is remembered | Hold an empty paper frame, music out | Retention after the fact, saves | ✓ |
| E13 | **Rule of three**: three shots the same size, angle and length with one thing escalating, broken on the fourth | Setup → payoff, works for comedy and tension | Three matched shots, then a different size and length | Retention at the break, shares | ✓ |
| E14 | **Director overlay**: borrow one director's rhythm and camera rules for a whole episode (e.g. Kubrick symmetry and long holds, Wong Kar-wai step-printed motion, Fincher locked precise moves) | A strong, consistent authorial feel | DirectorSKILL style notes: average shot length, allowed and forbidden moves | Avg watch, comments | ✓ |
| E8 | **Speed ramp**: a move rushes, then slows to near-still on the key word | Emphasis by time, not by size | Time remap curves on the camera | Retention at the ramp | ✓ |

## 3. Camera

| # | Test | Why | How | Measure | Feas. |
|---|---|---|---|---|---|
| C1 | **Infinite zoom**: each scene is hidden inside a detail of the last (a photo on the wall becomes the next scene) | Endless forward motion; satisfying | Nested plates scaled into each other, log-space zoom | Avg watch, rewatches | ◐ (stills must leave a frame-in-frame) |
| C2 | **Paper-diorama orbit**: the camera circles a cut-paper set built in depth | Real 3D on a flat-art style is rare | PhotoCraft splits stills into 4–6 depth cards; 3D camera orbits ±20° | Avg watch at the orbit | ◐ |
| C3 | **Top-down desk with hands**: a pair of paper-cut hands place each card, as if building it live | Feels handmade and human | A generated hand cut-out, keyed in steps | Avg watch, comments | ◐ (hand poses on the cut-out sheet) |
| C4 | **First-person walk**: the camera is the customer walking in, waiting, paying | The viewer lives the story | A corridor of plates in depth, a slow bobbing camera | Avg watch, % full | ◐ |
| C5 | **Crash zoom on numbers**: the camera snaps into each figure | Punch on data | 3–4 frame zoom with a short hold | Retention at the zoom | ✓ |
| C6 | **Tilt-shift miniature**: documentary photos made to look like tiny models | Makes real places feel like a diagram | Graduated blur top and bottom in PhotoCraft + EffectCraft | Shares, saves | ✓ |
| C8 | **Four depth planes with foreground occluders**: paper leaves, clouds or a frame edge in front of the subject, plus midground, background and far background | Real parallax and a "peeking into a miniature" feel | Blender `card`/`sheet` at 4 depths + `miniature()` depth of field | Avg watch | ✓ |
| C7 | **Locked-off camera, everything moves to it**: the camera never moves, all motion comes from paper | Opposite of the drift; reads as stop-motion | No camera; layers move | Avg watch | ✓ |

## 4. Animation and motion

| # | Test | Why | How | Measure | Feas. |
|---|---|---|---|---|---|
| A1 | **True stop-motion**: poses held on twos (12 fps) or 8 fps, with *boil* (tiny random hand-placement jitter on every held pose, also during holds) and a ±1–2 % light flicker | Feels physical and handmade, not digital | EffectCraft: posterizeTime + seeded 1–2 px / 0.2° random per step. Blender: `paperkit.on_twos`, `boil`, `flicker` | Avg watch, comments ("how was this made?") | ✓ |
| A2 | **Kinetic typography only**: no pictures, the words carry it | Readable with the sound off | Type-only shots, stamps, wipes | % full, retention with sound off | ✓ |
| A3 | **Morph between objects**: a clock becomes a carousel becomes a coin | Continuity without cuts | Shape layers morphing, or matched masks | Avg watch | ◐ |
| A4 | **Live data build**: charts draw from real numbers, bar by bar, as the voice says them | Proof feels earned | Bars and lines keyed to word times | Saves, shares | ✓ |
| A5 | **Paper physics**: cards fall, flutter and settle with weight | Tactile; satisfying | Stepped keyframes with overshoot-free settles, slight rotation drift | Avg watch | ✓ |
| A6 | **Rotoscoped documentary**: a real photo traced into ink lines that draw on | Bridges photo and diagram | PhotoCraft edge trace → trim-path reveal | Retention at the reveal | ◐ |
| A8 | **Paper mechanisms**: things move like real paper toys (pull-tabs, sliders, rotating discs, page flips, pop-up folds) | Mechanical cause and effect reads instantly and is satisfying | Hinged layers (anchor on the fold), masks for pull-tabs, Blender for pop-ups | Avg watch, shares | ◐ |
| A9 | **Build the still piece by piece**: each shot starts on empty paper and the final still assembles from its cut-outs (base, then the main object, then details), then holds | Viewers watch to see it complete | The PhotoCraft cut-outs we already make, entering one by one with press-flat settles | Avg watch, % full | ✓ |
| A7 | **Halftone dissolve**: a photo breaks into dots that become the diagram | A signature transition built from the style itself | Halftone layers + stepped masks | Avg watch | ◐ |

## 5. Structure and story

| # | Test | Why | How | Measure | Feas. |
|---|---|---|---|---|---|
| S1 | **Seamless loop**: the last line flows into the first, and the last frame matches the first | Replays count as watch time | Script the loop; match first and last frames | Avg watch > 100 %, rewatches | ✓ |
| S2 | **Open loop**: a question in the first 2 s, answered only at the end | Curiosity holds the middle | Script structure | % full | ✓ |
| S3 | **Countdown list**: "3 things…", numbered on screen | Viewers know how much is left | Big mono numbers | Mid-video drop | ✓ |
| S4 | **Myth vs fact split**: left = myth, right = fact, the whole way | A simple frame people can follow | Split screen | Comments, shares | ✓ |
| S5 | **Two-part cliffhanger** (breaks the "no Part 1/2" rule, as a deliberate one-off test) | Follows drive repeat views | End on the question, answer next day | Follows, Part 2 views | ✓ |
| S6 | **Under 20 s cut** of the same story | Short videos finish more often | Cut the script to one idea | % full, shares | ✓ |
| S7 | **Comment-reply episode**: answer a real viewer comment on screen | Social proof, conversation | Comment shown as a paper card (no platform logos) | Comments, follows | ✓ once comments exist |

## 6. Sound

| # | Test | Why | How | Measure | Feas. |
|---|---|---|---|---|---|
| U1 | **No music**, voice and effects only | Clarity vs mood | Mute the music layer | Avg watch | ✓ |
| U2 | **Paper foley throughout**: every card makes its real sound (paper flip, scissor snip, cardboard slide, rustle, tape peel, press-flat tap, small paper snap) | ASMR texture keeps people in | Small library of paper sounds | Avg watch, comments | ◐ (sound files) |
| U3 | **Voice-off, text-only** version | Most people scroll muted | Captions become the main text | Retention, sound-off share | ✓ |
| U4 | **Faster voice** (+10 % speed) | Same words, less time | ffmpeg atempo on the voice | % full | ✓ |

## 7. Text on screen

| # | Test | Why | How | Measure | Feas. |
|---|---|---|---|---|---|
| T1 | **Big word-by-word captions** in the middle (instead of the small pill) | Reads at a glance, muted | Anton word captions | Retention, % full | ✓ |
| T2 | **No captions at all** | Cleaner picture | Turn subtitles off | Retention vs T1 | ✓ |
| T3 | **One persistent headline** that stays on top all the way through | Viewers always know the point | A fixed title in the safe area | Mid-video drop | ✓ |

## 8. Script length and formula adherence

User, 2026-10-31: length "can be varied… we need to experiment" — never default to a fixed word count. Written against
`00_bible/script-formula.md` (Hook → Stakes → Mechanism → Twist → Payoff → Bridge → Loop).

| # | Test | Why | How | Measure | Feas. |
|---|---|---|---|---|---|
| L1 | **Short cut**, ~70–100 words / 22–32 s | Faster finish, higher completion | Compress Stakes and Mechanism to one line each | % watched full, avg watch | ✓ |
| L2 | **Standard**, ~100–135 words / 32–45 s | The house baseline so far | Normal beat lengths, one Mechanism line | all | ✓ |
| L3 | **Full formula length**, ~135–170 words / 45–60 s | The formula's native target; room for a fuller Mechanism and Twist | Don't compress; let Payoff and Bridge breathe, maybe split Mechanism in two lines | avg watch, saves | ✓ |

## 9. Bridge presence

User, 2026-10-31: "maybe we can skip turning back to business" — the Bridge is the moment most likely to read as a pitch.
Testing whether dropping it helps retention costs the explicit on-screen "your shop" CTA; the tie-in then has to live in
the caption and pinned comment instead.

| # | Test | Why | How | Measure | Feas. |
|---|---|---|---|---|---|
| BR-on | **Bridge present** (house default) | The format's reason to exist; direct CTA | "Now picture your shop…" before the Loop | baseline | ✓ |
| BR-off | **No bridge**: end on Payoff → Loop, general not shop-specific | Removes the moment that can feel like a pitch | Move any documentary image to Stakes; shop tie-in moves to caption/pinned comment | avg watch, % full, comments vs DM-keyword replies | ✓ |

## 10. Follow call-to-action

User, 2026-10-31: "place [the follow] at the end, follow meikigo account for more content."

| # | Test | Why | How | Measure | Feas. |
|---|---|---|---|---|---|
| CTA-none | No follow line (EX01V3–EX08) | baseline | — | follows per 1k views | ✓ |
| CTA-end | **"Follow Meikigo for more."** as the last line | A clear ask after the payoff, tied to more of the same | Last voice line + "FOLLOW MEIKIGO" chip and logo (silent) | follows per 1k views, % watched full | ✓ |
| CTA-mid | A teasing follow mid-video ("Follow, because the fix looks completely wrong") | Catches viewers before the drop | After Stakes | follows per 1k, retention at that second | ✓ |

## 11. Ending type

| # | Ending | Example |
|---|---|---|
| END-q | A question (the old default; use sparingly) | "So which line are you in?" |
| END-reframe | One line that recasts the whole story | "They never checked your receipt. They only listened." |
| END-next | A "next time you…" instruction | "Next time you see one long snaking line, don't groan. It's the fast one." |
| END-callback | The hook, answered in its own words | "The other line moves faster. Because it usually does." |

## First eight to run (in calendar order, one per episode)

1. **H1 Data at frame 0** (EX04, running)
2. **S1 Seamless loop**: cheapest way to raise average watch time
3. **A1 Stop-motion at 8 fps**: the most "never seen this" look that keeps the art style
4. **E1 One unbroken take**: tests whether no cuts beats cuts
5. **T1 Big word-by-word captions**: most viewers are muted
6. **C2 Paper-diorama orbit**: real depth on paper
7. **E6 Silence drop** before the key fact
8. **S6 Under 20 s cut**: does shorter win on completion?

## 12. Visual style beat (Opuscar, from 2026-11-01)

One style from `00_bible/style-menu.md` carries one or two beats per episode, rendered as its own clip and cut in
EffectCraft. Rotate; log the style, the beat and the retention at that second.

| # | Style | Beat it carries | Feas. |
|---|---|---|---|
| V1 | Broadcast News Package (split-flap, quote card, stamp) | hook / evidence | ✓ |
| V2 | Data Storytelling (pencil chart, "headline revised") | evidence / payoff | ✓ |
| V3 | Constructivist Montage (ink-paper cut-outs, red bar → number block) | any | ✓ |
| V4 | Caption News (number rolls in, stacked captions) | hook | ✓ |
| V5 | Isometric Picture Book (floor type, lid off, bars on the ground) | mechanism / Bridge | ✓ |
| V6 | Memphis Diorama (cutaway) | mechanism | ✓ |
| V7 | Desktop Flythrough (printed app cards, whip) | data / Bridge | ✓ |
| V8 | Spy Title Sequence (type as set, stop-time) | hook / twist | ✓ |
| V9 | Visual Investigation (view cones, then-vs-record) | evidence / twist | ◐ |
| V10 | Data Physicalization (stacks, paired climb) | payoff | ◐ |

## 13. Visual device log (added 2026-11-02, adapted from an external stat-viz Blender workflow)

**Why:** devices (the 3D mechanism a beat is built from — a path that draws itself, x-ray walls, a counter) can repeat
across episodes without anyone noticing, the same way camera angles or edits can. Log them so the next shot list checks
before picking.

**Rule:** before writing a shot list (skill step 2), read the last 5 episodes' rows below. The new episode's **hero
device** (the one the Twist/Payoff beat is built from) must not match the hero device of the last 2 episodes. Supporting
devices may repeat, but not more than 2 of them should match the immediately previous episode's set.

**One surprise:** every episode plans one deliberate visual anomaly in the world (a scale break, a colour break, an
object out of place) landing on or just before the Twist line — not just a narrative twist in the voice, something the
eye catches on a second look. Note it in the shot list and in the row below.

**Silhouette check:** before the full render, the hero object/device is checked at small size — cropped to its own
frame, scaled down to roughly thumbnail size, eyeballed for whether it still reads as one clear shape with the colour
stripped. Note pass/fail below; if it fails, simplify the shape or raise its contrast against the floor, not just add
more light.

| Episode | Hero device | Supporting devices | One surprise | Silhouette check |
|---|---|---|---|---|
| EX14 The Long Path | path that draws itself through the whole plan | x-ray walls + glowing hidden doors, sight cone, 10×10 dot grid filling to a %, counter roll-up, pull-out to a city of instanced tiles | the ochre figure stepping into an otherwise all-grey queue | pass (figure silhouette distinct on the grey line) |
| EX15 The $1.50 Promise | a conveyor belt snaking through every aisle carrying 245M hot dogs | price bars rising except one, x-ray walls (racks lower), two compared columns (fees vs profit) with pinned labels, counter roll-up, members looping through a gate | one green hot-dog-price bar staying flat while eight grey bars climb past it | pass (green bar reads against the grey row even at thumbnail size) |

| EX16 Out of Turn (v2) | a 100-bed cutaway tower where the percentage is beds lighting (72 of 100) | a 5-lane triage sorter splitting one queue, a 91/100 clinic, a pulled-back night campus | the old sorter's tiles fall away and a patient drops through the crack on "fall through the cracks" | pass (lit beds and the hole both read at thumbnail size). v1 (reflow queue + gauges) rejected as too simple |
| EX17 Five Times | a hollow monument: a 5× on a plinth whose ground is cut open into strata (2014 / 1990 / late-1980s memo) that crumble away | ground opening like a cake cut, two roads of customers through year gates, coin stacks lifting the kept, two value bars, walk cycles, bounded haze | the column under the plinth crumbles and the 5× stays in mid-air over the empty slot on "No study behind it" | pass (green 5× over a black slot reads at thumbnail size) |

**EX16 note:** the brief planned 4 reorder events; cut to 2 during the build because the camera never actually held
still at each look-at point (it continuously drifted toward the next keyframe), so most of the events played off-screen.
Two, each timed inside a verified camera hold, read clearly; see `episode.md` § Build for the full account.

Next episode (EX17): hero device must not be "a reflow/resort queue" or "a conveyor belt" — pick from the unused list:
x-ray used twice (retire), dot grid once, counter roll-up twice (retire), pull-out-to-many-instances once, compared
columns once, gate/loop-with-colour-change once, arc gauges once. Favor something not yet tried: a fold/reveal (lid off,
roof lifts), an erosion/depletion (something visibly runs out).

Next episode (EX18): hero must not be the tower of beds (EX16) or the hollow monument / strata cutaway (EX17). EX17 used
erosion; still unused: a fold/reveal (lid off, roof lifts), a scale zoom through nested worlds, a balance/scale tipping.

## 14. Narrative angle log (added 2026-11-02, from the same external workflow as § 13)

**Rule:** before locking a script, check the last 3 episodes' angle below. If they share one, write the hook both ways
(`00_bible/script-formula.md` § Angle check) and pick the other angle unless the topic genuinely can't carry it.

| Episode | Angle | Hook type | Setting / Bridge |
|---|---|---|---|
| EX13 The Hidden Queue | Anthropological (the felt moment: you wait, it's padded on purpose) | H1 data at frame 0 (60→23 split-flap) | theme park / Malaysian nasi kandar counter |
| EX14 The Long Path | Anthropological (the maze feels accidental, isn't) | H2 answer first | retail store / Klang hardware shop |
| EX15 The $1.50 Promise | Anthropological (a flat price feels like a mistake, isn't) | H3 surprising claim | warehouse retail / Shah Alam car wash |
| EX16 Out of Turn | **Analytical** (the number leads: 71.8%, then why) | H1 data at frame 0 | hospital ED (Bridge turned off before the final cut — no shop shown) |
| EX17 Five Times | Analytical (the number leads, contradicted in the same breath) | H3 surprising claim | business folklore (Bridge off) |

Found on backfill: EX13–EX15 are all Anthropological — three in a row before anyone noticed, because nothing was
checking. EX16 switches to Analytical specifically to break that run, not because the topic demanded it either way.

## 15. Bridge opener log (added 2026-11-02)

The six openers are in `00_bible/script-formula.md` § Bridge openers. Check the last 3 episodes before picking one.

| Episode | Opener used |
|---|---|
| EX12 The Button That Does Nothing | "Now picture your bubble tea counter." — the old default, before this log existed |
| EX13 The Hidden Queue | "Now picture your nasi kandar counter at one o'clock." — same |
| EX14 The Long Path | "Now picture your hardware shop in Klang." — same |
| EX15 The $1.50 Promise | "Now picture your car wash in Shah Alam." — same |
| EX16 Out of Turn | n/a — Bridge off, see § 9; the B1 draft is in episode.md history |
| EX17 Five Times | n/a — Bridge off (2nd run); shop tie-in in the pinned comment only |

Found on backfill: five straight episodes opened the Bridge with "Now picture your…" before this log existed to catch
it. EX16 switches to B1; the next one shouldn't repeat B1, or match EX13–EX15's "Now picture" default either.
