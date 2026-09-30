# Motion Design Analysis — "The Deal" (~46.8s)

Source: `reference-library/the-deal/source.mp4` (originally `Motion Design/The Deal (MD).mp4`)
Extracted via `tools/shot_extractor.py` (fixed-interval fallback only — no hard cuts detected by scene-change scoring; this is a continuous-animation kinetic-typography/UI spot, not live-action). Re-derived into 15 real beats from the 18 algorithmic sub-splits.

**Reference use:** typography, animation/transition technique, layout, background/accent-motif and pacing DNA only. This spot is a CRM product ad (Attio) that names and shows its own product throughout — do not carry over the brand name, logo, wordmark, product copy ("Ask Attio...", "Universal Context™", etc.), or its specific UI chrome design. Describe UI elements generically (e.g. "a floating chat input card") when anchoring a generation to this reference.

**Style summary:** a five-act kinetic-typography spot on flat light-gray/white and near-black backgrounds. Bookended by a screen-recorded product UI (open on a "Good morning" home screen, type a query, watch it process) around a middle "capability litany" built one short declarative phrase at a time, then a two-beat brand-statement pair on black, before returning to the UI-prompt style for a closing tagline and a static end card. No camera, no location — all motion lives in text/graphic choreography and background color changes.

---

## Beat 1 — 0.00s–3.87s (UI: greeting)
**Frames:** `shot01_*`, `shot02_start`

- **Typography:** Sans-serif, medium weight, sentence case, left-aligned near vertical center. Simple fade/settle-in, no motion trick.
- **Animation & transition:** Static hold, then the frame beneath it (input card) slides up from off-screen bottom to introduce Beat 2 — a smooth ease-out slide, no cut.
- **Layout & composition:** Generous negative space above; text sits in the left third at roughly mid-height, leaving the rest of the frame empty — establishes a calm, uncluttered opening.
- **Background & accent motifs:** Flat off-white/light-gray, no texture.
- **Pacing:** Slow, single beat, ~3.9s — sets an unhurried tone before the UI activates.
- **Mood/purpose:** Quiet hook — a "day in the life" open.

---

## Beat 2 — 3.87s–8.40s (UI: query + suggestions)
**Frames:** `shot02_end`, `shot03_start`

- **Typography:** Input-field placeholder-style text typed into a rounded card; smaller secondary chip labels below (pill-shaped suggestion buttons) fade in staggered after the main line.
- **Animation & transition:** Card slide-up settle, then staggered fade-in of suggestion chips and a list beneath — a UI-native reveal (elements appearing as if the app itself is loading in), not a graphic transition.
- **Layout & composition:** Card centered horizontally, occupying the frame's middle band; chips and list run below it, both left-aligned to the card's edge.
- **Background & accent motifs:** Same flat light background; the card itself has a thin hairline border and soft rounded corners.
- **Pacing:** Medium — several small staggered reveals inside one ~4.5s beat, denser than Beat 1.
- **Mood/purpose:** Demonstrates the product's input surface and suggested actions.

---

## Beat 3 — 8.40s–11.93s (UI: send + processing)
**Frames:** `shot03_end`, `shot04_start`

- **Typography:** The typed line reappears as a right-aligned chat-bubble (sent message), small italic/gray "Thinking…" label beneath it.
- **Animation & transition:** Message snaps into bubble form (implying a send action), then a hard cut to Beat 4's black frame — the only true cut in the spot's first half.
- **Layout & composition:** Bubble upper-right area; "Thinking…" sits lower-left, unbalanced/asymmetric to suggest something is about to happen off-frame.
- **Background & accent motifs:** Same flat light background, unchanged.
- **Pacing:** Quick, ~3.5s, ends on the spot's first hard cut.
- **Mood/purpose:** Processing/anticipation beat — bridges into the capability-litany section.

---

## Beat 4 — 11.93s–14.92s (kinetic word: "creates")
**Frames:** `shot04_end`, `shot05_start`

- **Typography:** Single lowercase word, large, centered, sans-serif, white-on-black.
- **Animation & transition:** Hard cut in from the light UI section; word likely scales/fades up from nothing (single held word, no further motion visible in sampled frames).
- **Layout & composition:** Dead-center, isolated — maximum negative space around a single word.
- **Background & accent motifs:** Near-black, with a faint fine dot-grid texture across the whole frame (subtle, low-contrast).
- **Pacing:** Short punch beat, ~3s — a deliberate tonal/color inversion from the UI section.
- **Mood/purpose:** Pivot point — signals the ad is about to list capabilities.

---

## Beat 5 — 14.92s–17.92s ("Every email")
**Frames:** `shot05_end`, `shot06_start`

- **Typography:** Short declarative phrase, medium-large sans-serif, centered, dark-on-light.
- **Animation & transition:** Cut back to light background; a stack of flat card/document icon shapes animates upward from below the text, settling into a layered stack directly under it.
- **Layout & composition:** Text sits above the icon stack, both centered on the same vertical axis; thin vertical dashed guide-lines run the full frame height either side, suggesting a grid/ruler motif.
- **Background & accent motifs:** Flat white, dashed vertical guide lines, stacked flat-icon graphic.
- **Pacing:** ~3s, first entry in a repeating "Every ___" phrase pattern.
- **Mood/purpose:** Opens the capability litany — each beat names one thing the product handles.

---

## Beat 6 — 17.92s–20.91s ("Every note" + product mark)
**Frames:** `shot06_end`, `shot07_start`, `shot07_end`

- **Typography:** Same "Every ___" phrase pattern, centered; a small rounded-square icon mark slides in beside the text partway through the beat.
- **Animation & transition:** A row of short vertical tick marks (waveform/audio-note motif) fades in above the text first, then the icon mark slides in from the side to sit inline with the words — a two-stage reveal within one beat.
- **Layout & composition:** Centered composition; tick-mark row sits directly above the text baseline, icon mark inline at the text's right edge.
- **Background & accent motifs:** Flat white with a faint full-bleed grid texture (thin gray lines) fading in late in the beat.
- **Pacing:** ~3s but busier than Beat 5 — two motion events instead of one.
- **Mood/purpose:** Second litany entry; introduces the product's icon mark as a recurring inline motif (generic small rounded-square glyph — do not reuse the specific brand mark).

---

## Beat 7 — 20.91s–23.91s (grid transition/wipe)
**Frames:** `shot08_*`

- **Typography:** None — a bare beat.
- **Animation & transition:** Text and icon from Beat 6 clear out, leaving only the background grid texture briefly on-screen before Beat 8's text enters — functions as a breath/wipe between litany entries.
- **Layout & composition:** Empty frame except the grid texture.
- **Background & accent motifs:** Flat white with the same fine grid lines, slightly more visible with nothing competing for attention.
- **Pacing:** Brief, ~3s but registers as "empty" — a deliberate rest beat in an otherwise dense sequence.
- **Mood/purpose:** Pacing device — prevents the litany from feeling monotonous by inserting a blank breath.

---

## Beat 8 — 23.91s–26.90s ("and every")
**Frames:** `shot09_*`

- **Typography:** Lowercase connective phrase, same weight/size as prior litany entries, centered.
- **Animation & transition:** Fades/settles in over the grid background; a thin dashed horizontal line sits just below the text baseline.
- **Layout & composition:** Centered, text vertically mid-frame, dashed line anchoring it from below.
- **Background & accent motifs:** Same flat white with faint grid.
- **Pacing:** ~3s, sets up the litany's final/summary entry.
- **Mood/purpose:** Grammatical bridge into the closing litany item — builds one continuous sentence across beats 5, 6, 8 and 9.

---

## Beat 9 — 26.90s–28.45s (typewriter reveal: "Company record")
**Frames:** `shot12_*` (algorithmic slivers `shot10`/`shot11` collapse into this beat's tail — see note below)

- **Typography:** Same phrase style, but revealed via a typewriter/character-by-character effect with a visible blinking cursor, rather than a single fade-in.
- **Animation & transition:** Characters appear left-to-right in real time; ends on two near-instant (~0.03s) frames that read as a whip-flash/glitch cut straight into Beat 10's black background — the sharpest transition in the piece.
- **Layout & composition:** Centered, cursor visible at the text's trailing edge mid-type.
- **Background & accent motifs:** Same flat white as Beats 5–8.
- **Pacing:** Short, ~1.5s of visible typing plus an near-instant flash-cut — the fastest beat in the spot.
- **Mood/purpose:** Closes the capability litany on its most concrete, specific item — a typewriter effect reads as "live" data entry rather than marketing copy.

*Note: the extractor's `shot10`/`shot11` (28.40s–28.47s, 0.03s each) are the flash-cut frames themselves, not separate beats — collapsed into this beat's ending per the README's sub-split guidance.*

---

## Beat 10 — 28.47s–33.07s (brand statement 1, black + radial line motif)
**Frames:** `shot12_end`, `shot13_*`

- **Typography:** Short trademark-style statement, large, centered, white-on-black, with a small superscript trademark symbol.
- **Animation & transition:** Whip-cut in from Beat 9; a radial arc made of many thin vertical lines (reads as a sound-wave or burst graphic) animates upward/outward from below the text over the course of the beat.
- **Layout & composition:** Text upper-middle, radial line-burst graphic occupies the lower half, symmetrical about the vertical center axis.
- **Background & accent motifs:** Near-black, radial thin-line burst motif (visually rhymes with the tick-mark motif from Beat 6).
- **Pacing:** Longer hold, ~4.6s — the first of two consecutive "statement" beats, slower than the litany section.
- **Mood/purpose:** Brand thesis statement — the ad's core claim, given room to breathe after the fast litany section.

---

## Beat 11 — 33.07s–35.81s (brand statement 2, black + dashed line)
**Frames:** `shot14_*`

- **Typography:** A second, plainer declarative statement (no trademark symbol), same size/weight/centering as Beat 10.
- **Animation & transition:** Crossfade/hold from Beat 10 (both black-background beats, no hard cut between them); a thin dashed horizontal line sits below the text.
- **Layout & composition:** Centered, text mid-frame, dashed line anchoring below — visually echoes Beat 8's dashed-line treatment but on black instead of white.
- **Background & accent motifs:** Near-black, thin dashed line.
- **Pacing:** ~2.7s, shorter than Beat 10 — the two statement beats read as a matched pair, second slightly quicker.
- **Mood/purpose:** Reinforces/plainspoken restatement of Beat 10's claim before returning to product UI.

---

## Beat 12 — 35.81s–38.55s (UI prompt example 1)
**Frames:** `shot15_*`

- **Typography:** Returns to the light background and the two-tone treatment from Beats 2–3 (a bold lead phrase + lighter-weight trailing phrase in the same line, implying "type this / here's what happens").
- **Animation & transition:** Hard cut from black (Beat 11) back to white — mirrors the Beat 3→4 cut, bookending the litany+statement section.
- **Layout & composition:** Centered, single line, no card chrome visible (simpler than Beat 2's full input card).
- **Background & accent motifs:** Flat white, no texture.
- **Pacing:** ~2.7s.
- **Mood/purpose:** Shifts from brand statement back to product utility — "here's an example of what you'd ask."

---

## Beat 13 — 38.55s–41.29s (UI prompt example, truncated)
**Frames:** `shot16_*`

- **Typography:** Shorter partial phrase in the same bold lead-word style as Beat 12, suggesting a cycling/rotating set of example prompts rather than one static line.
- **Animation & transition:** Likely a quick swap/crossfade between example phrases (consistent with a "rotating suggestions" UI pattern) rather than a fresh compositional idea.
- **Layout & composition:** Same centered single-line treatment as Beat 12.
- **Background & accent motifs:** Flat white, unchanged.
- **Pacing:** ~2.7s, matches Beat 12's rhythm — the two beats read as one cycling unit.
- **Mood/purpose:** Reinforces the "ask it anything" utility message with a second example.

---

## Beat 14 — 41.29s–44.02s (closing tagline)
**Frames:** `shot17_*`

- **Typography:** Short imperative statement, same bold-lead-word styling, centered.
- **Animation & transition:** Continues the light-background rhythm from Beats 12–13, no hard cut.
- **Layout & composition:** Centered single line, consistent with the prior two beats.
- **Background & accent motifs:** Flat white, unchanged.
- **Pacing:** ~2.7s.
- **Mood/purpose:** Final call-to-action-style line before the end card — a direct, plain imperative closes the message.

---

## Beat 15 — 44.02s–46.77s (end card)
**Frames:** `shot18_*`

- **Typography:** Logo mark + wordmark centered, small URL line in gray beneath it.
- **Animation & transition:** Cut/settle into a static hold; no further motion through the beat's remainder (both `mid` and `end` frames are identical).
- **Layout & composition:** Logo lockup dead-center, generous negative space, URL small and centered well below it.
- **Background & accent motifs:** Flat light gray/white, no texture — matches the spot's opening background, bookending the piece.
- **Pacing:** Static hold, ~2.75s — the only genuinely still frame in the spot.
- **Mood/purpose:** Sign-off. The static hold after 44s of continuous motion gives the end card weight.

---

## Cross-beat notes for prompt-writing

- **Five-act structure is the reusable device**: UI-demo hook → kinetic capability litany (one short phrase per beat, building a single sentence) → paired black-background brand-statement beats → return to UI-demo style for a closing tagline → static end card. This shape works for any "the product does X, Y, and Z" message, independent of what X/Y/Z are.
- **Color as act-break signal**: every major section change is marked by a flat-white ↔ near-black background swap, always on a hard cut (Beat 3→4, Beat 9→10, Beat 11→12). Within a section, beats crossfade/settle rather than cut. Worth reusing as a pacing device — color inversion reads as "new idea," not just "new shot."
- **Recurring line/tick/dash graphic family** (dashed verticals in Beat 5, tick marks in Beat 6, grid in Beats 6–9, radial burst in Beat 10, dashed horizontal in Beats 8 & 11) ties the whole piece together visually without needing a literal recurring icon — a generic "thin-line accent motif, reused with variation" is a strong anchor for a UI-style spot that wants restraint plus polish.
- **Pacing rule**: litany beats run fast and uniform (~3s each, mostly crossfade/fade), the two brand-statement beats slow down and hold longer (~4.6s then ~2.7s), and the end card is the only fully static beat. A generation anchored to this reference should compress dialogue/product-benefit lines into single short phrases and lean on beat-to-beat rhythm rather than motion within a beat to carry pacing.
- **Typewriter/cursor reveal (Beat 9) is the one "live data" moment** in an otherwise typographic piece — reserve that specific technique for the single most concrete/specific claim, not for general copy, or it loses its effect.
