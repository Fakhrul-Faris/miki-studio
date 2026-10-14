# Motion Design Analysis — "Pulse" (~52.1s, 16:9, 1276x718)

Source: `reference-library/pulse/source.mp4` (originally `Motion Design/Pulse (MD).mp4`)

**Revision note:** this replaces an earlier pass that sampled only start/mid/end frames per ~2.7-3s algorithmic chunk (18 chunks from `tools/shot_extractor.py`). That sparse sampling missed almost every word-by-word text build and two whole scenes (the "Organic Content" beat and the mid-roll "Meet Pulse" sting), because this spot changes state roughly every 150-400ms. Re-extracted as 17 **contact sheets**, one per original chunk window, each at 8fps (one frame per 0.125s) tiled into a single image — see `reference-library/pulse/contact_sheets/beat01.jpg` through `beat17.jpg`. Beat **boundary** times below are exact (from the extractor); in-beat sub-timings (word-by-word builds) are read off the contact sheets and are accurate to about ±0.1-0.15s.

**Reference use:** typography, animation/transition technique, layout, background/accent-motif and pacing DNA only. This is a content-attribution / marketing-analytics SaaS ad for content creators and agencies. Do not carry over the on-screen copy, the product name "Pulse," the green dot mark, the "Creator Funnel" content, any dollar figures, contact names, or the specific dashboard layout. Describe UI generically.

**Style summary:** a single unbroken kinetic-type + screen-capture reel. The entire piece is built from **word-by-word (sometimes letter-by-letter) sentence construction** — almost nothing fades in as a whole phrase. Sentences are typically paired with a UI screen that is itself live-updating (counters ticking, list items highlighting, nav items lighting up) in sync with the words. The product's accent green appears as: text gradients, a "typing cursor" bar, pill highlights around key words, UI accent color, a recurring pulse-ring transition graphic, and — twice — the brand's own wordmark substituted in as the final word of a sentence ("Everything is in **Pulse**.").

---

## Beat 1 — 0.00s–2.67s (hook: counter sentence)
**Frames:** `shot01_*`, contact sheet `beat01.jpg`

- **Typography:** Huge bold white sans, centered, on pure black.
- **Animation & transition:** Builds word-by-word: "You" (0.00s) → "You just" (~0.35s) → "You just got" (~0.47s) → a small green counter **badge** appears next to it and rapidly ticks up live (0 → 14 → 20 → 21 → 22, ~0.6s–1.3s) → "You just got 22 **warm**" (~1.3s) → "...**warm leads**" (~1.5s). From ~1.7s the counter badge morphs/grows into a solid green rounded block while the sentence compresses, then the whole thing dissolves into Beat 2's photo (~2.0-2.3s). Note: the number badge is a genuine count-up animation embedded mid-sentence, not a static chip.
- **Layout & composition:** Dead center, generous negative space.
- **Background & accent motifs:** Pure black. First appearance of the green accent, as the live counter badge.
- **Pacing:** Fast word-steps (~0.3-0.5s each) but the whole beat holds for 2.67s because of the counter animation and the pill-morph exit.
- **Mood/purpose:** Opens with a concrete, specific-sounding result stated as already true — a "notification" register rather than a question.

## Beat 2 — 2.67s–5.35s ("Organic Content" + proof photo)
**Frames:** `shot02_*`, contact sheet `beat02.jpg`

- **Typography:** "Organic Content" in large bold white sans, built with a brief scramble/glitch-in effect (letters jumble into place rather than a clean fade — visible as partial/overlapping characters for 2-3 frames before settling), upper-left area of frame.
- **Animation & transition:** Settles almost immediately (~2.9s) and holds for about 2s over a real photo (a creator at a laptop/mic setup, green-tinted grade) with three floating UI notification cards beside him (a "new email lead" card, a "call contact" card, a "form submitted" card) — a photo + live-UI-overlay composite, not a screen recording. Around 4.7-4.9s the whole composite shrinks/zooms down into a small rounded card as the exit transition.
- **Layout & composition:** Headline upper-left over the photo; photo fills most of the frame; UI cards float at lower-right, staggered.
- **Background & accent motifs:** Warm photo-real lighting with a green color grade pushed into it (ties the "found footage" back to the brand palette, unlike the fully neutral creator-video insert in Beat 4).
- **Pacing:** ~2.7s, the longest unbroken hold so far.
- **Mood/purpose:** Names the source of the leads (organic content) and proves it with "live" notification proof, before the next beat complicates the claim.

## Beat 3 — 5.35s–8.03s ("But which video actually sent them?")
**Frames:** `shot03_*`, contact sheet `beat03.jpg`

- **Typography:** Smaller left-aligned sans (much smaller than Beats 1-2), white, with a **blinking vertical cursor bar** in brand green riding at the end of the typed text like a live text cursor.
- **Animation & transition:** True letter/word-by-letter typewriter build, roughly one word every 0.2-0.3s: "B" (green-pill cursor) → "But" → "But wh" → "But which" → "But which v" → "But which vid" → "But which video" → "But which video actu" → "...actually" → then a green pill grows in under the last clause: "sent th[em]" → "**sent them?**" (full sentence complete by ~6.0s). Holds static for about 1s, then quick-cuts (via a small flash/UI-glimpse transition) straight into Beat 4's video insert.
- **Layout & composition:** Left-aligned, vertically centered, small type relative to Beats 1-2 — a deliberate scale-down for the "turn" in the pitch.
- **Background & accent motifs:** Pure black; green only in the cursor bar and the final pill.
- **Pacing:** The fastest word-by-word build in the piece so far.
- **Mood/purpose:** The turn — undercuts the easy win of Beats 1-2 with the real question (attribution), stated conversationally with a live-typing cadence rather than a bold statement.

## Beat 4 — 8.03s–10.70s (creator-reaction video insert)
**Frames:** `shot04_*`, contact sheet `beat04.jpg`

- **Typography:** A small green pill caption rendered *inside* the embedded video, styled like a creator's own caption sticker ("This one?", then "Or this one?").
- **Animation & transition:** A tall 9:16 video card (talking-head creator, warm practical lighting, plant, mic, visible like/comment/share counts and a handle) sits centered on black, letterboxed left/right. Holds on "This one?" for about 1s, then a quick flash-cut (a brief green wash + a glimpse of the phone-shaped placeholder) swaps to a near-identical shot with the creator now pointing at the camera, caption "**Or this one?**" — holds to the end of the beat.
- **Layout & composition:** One tall card centered in the 16:9 frame — "video inside a video."
- **Background & accent motifs:** Black outside the card; naturalistic warm lighting inside it (the one beat that steps outside the brand palette entirely, on purpose — it's meant to read as someone else's real footage).
- **Pacing:** Two held shots, ~1.3s each.
- **Mood/purpose:** Dramatizes the actual pain point concretely — a creator genuinely guessing between two cuts, no narration needed.

## Beat 5 — 10.70s–13.69s (mid-roll brand sting: "Meet Pulse")
**Frames:** `shot04_end` into `shot05_*`, contact sheet `beat04.jpg`→`beat05.jpg`

- **Typography:** "Meet" builds letter-by-letter with a soft blur/glow trailing each letter (out-of-focus-to-sharp, not a clean fade) — "Mee" (blurred) → "Mee" (sharper) → "**Meet**" (crisp). It fades out as the mark takes over. "Pulse" then builds the same letter-by-letter way beside the mark: "Pu" → "Puls" → "**Pulse**."
- **Animation & transition:** Underneath/behind the word, the concentric green pulse-ring graphic (same device as a transition motif — see Beat 16 and the closing card) animates rings contracting inward into a single solid dot exactly as "Meet" clears, and the dot becomes the logo mark that "Pulse" builds beside. Holds for only a few frames, then hard-cuts straight into the first dashboard screenshot.
- **Layout & composition:** Centered.
- **Background & accent motifs:** Pure black with the green glow/rings.
- **Pacing:** ~2.4s total — a quick confirmation, not a lingering reveal (that's saved for the close).
- **Mood/purpose:** A brand confirmation planted mid-piece, *before* any product UI is shown — tells the viewer who's talking right as the pitch turns from problem to solution, then gets out of the way fast. The full-length version of this exact beat (rings + wordmark + tagline) returns as the closing card (Beat 17), bookending the piece.

## Beat 6 — 13.69s–16.68s (dashboard reveal 1: "It lets you track conversions.")
**Frames:** `shot05_mid`→`shot06_*`, contact sheet `beat05.jpg`→`beat06.jpg`

- **Typography:** Small left-aligned sans caption above the UI, one keyword in a green pill ("**track conversions**").
- **Animation & transition:** Cut straight from the sting into a full-bleed dashboard screenshot whose own revenue number is **live-ticking** upward in real time ($29,003.13 → $30,168.82 → $30,612.71 → $30,779.36 → settles at $30,797.00) while the caption builds beside it: "It" → "It lets" → "It lets you" → "...**track conversions**." A line chart draws in below the stat once the sentence completes.
- **Layout & composition:** Caption upper-left, dashboard card filling the frame below it.
- **Background & accent motifs:** White/light dashboard, one dark stat card with the green accent number.
- **Pacing:** ~3s; the counter keeps moving even after the caption finishes, so the beat never feels static.
- **Mood/purpose:** First concrete feature proof, paired with a number that's visibly alive.

## Beat 7 — 16.68s–19.67s ("from your organic content.")
**Frames:** `shot06_end`→`shot07_*`, contact sheet `beat06.jpg`→`beat07.jpg`

- **Typography:** Continues the sentence grammatically from Beat 6 ("It lets you track conversions... **from your organic content.**") — left-aligned, one word green ("organic").
- **Animation & transition:** Builds word-by-word ("from" → "from your" → "from your organic" → "...organic content.") beside a ranked, scrolling content list (thumbnails + dollar figures, "What made you money"-style). Resolves into small per-channel sparkline mini-cards (first one: a platform icon + "$27,097.00" + a pink trend line + a mini click/lead/call/customer funnel row).
- **Layout & composition:** Text-left / UI-right split, the template this spot repeats most often.
- **Background & accent motifs:** White; list items carry small thumbnail photos; sparkline cards each keep their own native platform color.
- **Pacing:** ~3s.
- **Mood/purpose:** Grounds the previous claim in a specific content-level payoff.

## Beat 8 — 19.67s–22.66s ("From first touch to conversion." / "Everything is in Pulse.")
**Frames:** `shot07_end`→`shot08_*`, contact sheet `beat07.jpg`→`beat08.jpg`

- **Typography:** A phrase split across both screen edges, sandwiching the UI — "**From first touch**" far left, "**to conversion.**" far right, building in on their respective sides as the per-channel cards (a second channel, "$1,200.00," a magenta trend line; a third, greyed-out, no-data row) stack through the center. Then a fresh centered sentence starts alone on white: "Everything" → "Everything is" → "Everything is in" → the final word is **not typed** — the green dot mark slides in and "**Pulse**" builds letter-by-letter to complete the sentence in place of a generic noun.
- **Animation & transition:** Two back-to-back micro-beats in one window: the bookend-text/UI-center attribution proof, then the logo-as-payoff-word sentence, cut to the funnel-builder diagram as it resolves.
- **Layout & composition:** Text-bookend/UI-center, then simple centered type.
- **Background & accent motifs:** White; per-channel native colors; then black-on-white for the "Everything is in Pulse" line (the wordmark itself provides the only color).
- **Pacing:** ~3s split across two sentence builds.
- **Mood/purpose:** Closes the attribution argument, then lands a pun ("everything is in Pulse" = both "tracked by Pulse" and "within Pulse") as a lightweight logo touch, mid-piece, without stopping the pitch to do it.

## Beat 9 — 22.66s–25.64s (funnel diagram "And that's it!" / dashboard "You're ready to go.")
**Frames:** `shot08_end`→`shot09_*`, contact sheet `beat08.jpg`(tail)→`beat09.jpg`

- **Typography:** "And" → "And that's" → "**And that's it!**" centered over the funnel diagram; then, after a cut, "You're" → "You're ready" → "You're ready to" → "**You're ready to go.**" centered over the dashboard.
- **Animation & transition:** A tilted-perspective app window shows a node-and-edge funnel diagram (four source icons converging through a funnel icon into two destination nodes, dot-grid canvas background) with a cursor implying interactivity, while the first sentence builds over it. Cuts to the dashboard revenue card, ticking again ($29,983 → $30,437 → $30,721 → settling), while the second sentence builds.
- **Layout & composition:** Centered text over full-bleed UI in both halves.
- **Background & accent motifs:** White UI; dot-grid canvas in the funnel view; each source icon keeps its real platform color (the one deliberate native-color exception elsewhere in the piece).
- **Pacing:** ~3s across two short sentence builds.
- **Mood/purpose:** A confident "that's the setup" close to the funnel-building feature, immediately followed by a readiness cue that sets up the pivot beat.

## Beat 10 — 25.64s–28.63s (punch beat: "Stop making content for views.")
**Frames:** `shot09_end`→`shot10_*`, contact sheet `beat09.jpg`(tail)→`beat10.jpg`

- **Typography:** Bold, left-aligned, black on flat white. **Correction from the earlier pass:** "Stop" is not an isolated one-word rest beat — it's the first word of a full sentence that keeps building in the same shot: "Stop" → "Stop making" → "Stop making content" → "Stop making content for" → "...for **views.**" (green pill on "views.").
- **Animation & transition:** Settles alone on pure white, hard cut in, builds word-by-word at a slightly slower cadence than Beat 3 (~0.3-0.4s/word, letting "Stop" register alone for a few frames before continuing), holds the complete sentence briefly, hard cut out.
- **Layout & composition:** Off-center left, large empty margin.
- **Background & accent motifs:** Pure flat white — the starkest, emptiest beat in the piece, but not a silent one; it's the setup for an imperative statement.
- **Pacing:** ~3s.
- **Mood/purpose:** The sharpest, most negative-framed line in the ad — a direct imperative aimed at a specific bad habit (vanity-metric content), positioned right before the "do this instead" feature run.

## Beat 11 — 28.63s–31.62s ("Double down on the content that actually made you money.")
**Frames:** `shot10_end`→`shot11_*`, contact sheet `beat10.jpg`(tail)→`beat11.jpg`

- **Typography:** Two-line left-aligned phrase, builds across the whole beat: "Double" → "Double down" → "Double down on" → "...on the" → "...on the content" (continues past the sheet boundary) → "that" → "that actually" → "that actually made" → "...made you" → "...**made you money.**"
- **Animation & transition:** The dashboard's own left nav sidebar becomes visible (Overview / Funnel Builder / Content / Sources / Contacts / Traffic), and the **sidebar's "Content" item highlights in sync with the word "content"** landing in the sentence — text and UI state change are locked together, not just adjacent. The Content page shows a big revenue stat; as "made you money" completes, the page's ranked list items get a **glowing green outline** that sweeps/pulses around them.
- **Layout & composition:** Text-left / UI-right.
- **Background & accent motifs:** White; dark stat card; the glow-outline on the list is a new highlight technique (distinct from a plain color accent — it's a soft green bloom traced around the card's border).
- **Pacing:** ~3s, the longest single sentence build so far (spans this beat and runs to the start of Beat 12's visual hold).
- **Mood/purpose:** Names the benefit (focus on what's proven) while the UI's own navigation literally demonstrates the word being spoken.

## Beat 12 — 31.62s–34.61s ("And know which platform makes you the most.")
**Frames:** `shot11_end`→`shot12_*`, contact sheet `beat11.jpg`(tail)→`beat12.jpg`

- **Typography:** Two-line left phrase: "And" → "And know" → "And know which" → "And know which platform" → (cut) "makes you" → "makes you the" → "...**the most.**"
- **Animation & transition:** The dashboard switches from the Content page to the Sources page mid-sentence (nav highlight moves to "Sources" the same way it moved to "Content" in Beat 11); per-channel revenue cards stack in (YouTube $27,997 with its own chart, LinkedIn $1,600, Instagram $1,200).
- **Layout & composition:** Text-left / UI-right, same template as Beats 7, 9 and 11 — by now a fully established rhythm.
- **Background & accent motifs:** White; each channel keeps its native brand color on its chart line.
- **Pacing:** ~3s.
- **Mood/purpose:** Completes the "double down" thought with the channel-level version of the same idea.

## Beat 13 — 34.61s–37.60s ("Track your leads.")
**Frames:** `shot12_end`→`shot13_*`, contact sheet `beat12.jpg`(tail)→`beat13.jpg`

- **Typography:** Short green-pill-styled caption: "Track" → "Track your" → "**Track your leads.**"
- **Animation & transition:** Cuts to a Contacts/CRM table whose own header metrics **tick up live** in sync with the caption (0 leads/0 days/$0 → 130/5 days/$18,582 → 189/7 days/$26,689 → 204/7 days/$29,137 → settles at 209/8 days/$29,897, sourced "YouTube"). Once settled, a toast notification slides in from the top of the table: "**Call Booked** — Someone booked a call with you? · now," and holds.
- **Layout & composition:** Caption small, upper-left; full-bleed table below; toast overlays center-left.
- **Background & accent motifs:** White table; the toast has its own soft shadow/elevation, reads as a native OS/app notification rather than a graphic overlay.
- **Pacing:** ~3s.
- **Mood/purpose:** Demonstrates the live/automatic nature of the tracking with a real-time event, not just a static table.

## Beat 14 — 37.60s–40.59s (CRM walkthrough — no text)
**Frames:** `shot13_end`→`shot14_*`, contact sheet `beat13.jpg`(tail)→`beat14.jpg`

- **Typography:** None.
- **Animation & transition:** Pure UI demonstration: the Contacts table now shows named rows (James Novak, Ines Brien, Rachel Simmons, Sofia Eriksen, Alba Kim, Felix Foster, Zara Patel, Theo Rodriguez) with a cursor visibly clicking through rows; one contact (Rachel Simmons) opens into a detail modal showing a chronological touchpoint timeline (came from Instagram → page visit → watched on YouTube → page visit → booked a meeting), each entry with its own icon and relative timestamp.
- **Layout & composition:** Full-bleed table behind a centered, slightly-scaled-up modal card with a soft drop shadow.
- **Background & accent motifs:** White; one colored platform-source tag pill per row is the only saturated color.
- **Pacing:** ~3s, the only beat in the second half with zero kinetic type — a deliberate "just watch it work" pause before the biggest sentence in the piece.
- **Mood/purpose:** Lets the product demonstrate itself without a caption telling you what to think, building credibility right before the emotional-peak line.

## Beat 15 — 40.59s–43.58s ("See every single step they took before deciding to reach out.")
**Frames:** `shot14_end`→`shot15_*`, contact sheet `beat14.jpg`(tail)→`beat15.jpg`

- **Typography:** Two-line left-aligned phrase, the longest sentence in the piece, two different words picked out in green at different points ("every single step," then later "reach out" is plain — the highlight moves, it doesn't accumulate).
- **Animation & transition:** Builds in roughly 8 steps, ~0.3-0.4s apart: "See" → "See every" → "See every single" → "...single step" → "...step they" → "...they took" → "...took before" → "...before deciding" → "...deciding to" → "...to reach" → "**...reach out.**" The same Rachel Simmons timeline modal sits under the text the whole time, now with a soft green radial wash bleeding in from the bottom corner of frame (a vignette, not a new graphic).
- **Layout & composition:** Text-left (~35%), modal-right (~65%), nearly full-height.
- **Background & accent motifs:** White behind, green corner-glow wash.
- **Pacing:** The single longest, most deliberate word-by-word build in the ad (~3s for 11 words, i.e. the one place the typing visibly slows down to let the claim land).
- **Mood/purpose:** The emotional peak of the feature run — ties every earlier beat (leads, content, channels, contacts) into one payoff: a complete, individual customer journey.

## Beat 16 — 43.58s–46.57s (funnel chip-chain → becomes the logo)
**Frames:** `shot15_end`→`shot16_*`, contact sheet `beat15.jpg`(tail)→`beat16.jpg`

- **Typography:** None overlaid; the chips carry their own bold numerals.
- **Animation & transition:** A horizontal chain of rounded pill/chip shapes pans/slides left across the frame while its own numbers tick up live: "1.7K Clicks" → "**2.7K Clicks** →[2.5%]→ **24 Leads**" →[4.5%]→ "**129 Leads**" →[6.5%]→ "**165 Leads**" →[9%]→ "**176 Leads**" → (settles) "2.7K Clicks →[6.5%]→ 177 Leads →[12%]→ **12 Calls**" → "...→31 Calls" → "...→37 Calls" → "...→**39 Calls**" →[21%]→"**8 Customers**"→[31%]→"**13 Customers**"→[41%]→"**15 Customers**" → settles at "**16 Customers**" — and at that exact moment the green dot-and-wordmark **slides in from the right and merges into the end of the chain**, i.e. the data literally becomes the logo.
- **Layout & composition:** One continuous horizontal band at vertical center, edge-to-edge, cropped at both sides (implying it continues off-screen).
- **Background & accent motifs:** Black background (the only dark beat in the whole mid-to-late section) with black metric chips and bright-green percentage/number chips — the highest-contrast moment in the piece.
- **Pacing:** ~3s of continuous number ticking with no pause.
- **Mood/purpose:** Distills the entire funnel into one number-chain "proof in one glance," and uses its own momentum to carry straight into the brand mark rather than cutting to it — the strongest shared-element transition in the spot.

## Beat 17 — 46.57s–52.13s (pivot, agency proof, and the close)
**Frames:** `shot16_end`→`shot17_*`/`shot18_*`, contact sheet `beat16.jpg`(tail)→`beat17.jpg`

This window packs four distinct moments into 5.5s:

1. **Pivot (~46.6-47.3s):** "Own" → "Own a" → "Own a content" → "Own a content **agency?**" (green pill), alone on white, mirrors the Beat 10 punch-beat treatment — a direct-address qualifying question aimed at a specific buyer before the close.
2. **Agency proof (~47.3-49.3s):** Cuts to a "Create a new workspace" modal being filled in and submitted (client name, campaign name, Cancel/Create Workspace buttons, a visible click), then the Overview dashboard jumps from its running total straight to agency-scale numbers: **$104,644.55 revenue, 163 customers, 183 calls booked, 545 leads, <1 day median time to convert.** "And" → "**And yours too.**" builds beside it, paired with notification toasts stacking in: an email ("Mike: Deal done"), then a wallet payment ("**You have received $60,000** from Trevor...").
3. **Logo close (~49.3-51.1s):** The green pulse rings contract and merge into the dot mark (the same graphic as Beat 5, now played in full and held rather than rushed); "**Pulse**" wordmark builds letter-by-letter beside it; a tagline builds word-by-word in a lighter weight: "Intelligent" → "...tracking" → "...tracking for" → "...for content" → "...**for content funnels.**"
4. **CTA (~51.1-52.1s):** Below the lockup, "Start" → "Start your" → a green pill ("**Free trial.**") → "...**today.**" fades in, holds for about a second, then the entire frame fades to black for the final ~0.1-0.2s.
- **Layout & composition:** Centered lockup (mark + wordmark + tagline + CTA stacked), generous margins.
- **Background & accent motifs:** Pure black with the soft green glow from the rings bleeding behind the type — the same black-and-green palette the piece opened with (Beats 1 and 3), now held much longer as a deliberate, unhurried sign-off (the longest uninterrupted hold in the ad).
- **Pacing:** Busiest beat in terms of content (4 sub-moments) but the close itself (sub-moments 3-4) is the slowest, calmest motion in the piece — rapid pace right up to the edge of the logo, then a full stop.
- **Mood/purpose:** Qualifies the buyer, delivers the single biggest proof number last (not first), then closes on brand plus a specific, low-friction CTA.

---

## Techniques worth carrying into other builds

1. **Word-by-word (not phrase-at-once) kinetic type, everywhere.** Nearly every caption in this spot builds one word (sometimes one letter) at a time rather than fading in as a whole line — including the "rest" beats (Beat 10's "Stop" is the first word of a sentence, not a standalone card). This is the single biggest structural fact about the piece and the most relevant technique for MKG-04's own cascade-text requirement.
2. **Live-ticking numbers embedded inside real UI**, not just counted-up headline stats: a dashboard's own revenue figure, a CRM table's own lead count, and a notification's own dollar amount all animate upward in place while a caption builds beside them — the proof and the pitch move together, frame for frame.
3. **UI state changes synced to the exact word landing** — a sidebar nav item highlights the instant its name appears in the caption (Beats 11-12). Directly reusable for MKG-04: e.g. a tablet's queue-status chip filling exactly as "checked in" lands in the VO/caption.
4. **The brand mark substituted in as the payoff word of a sentence** ("Everything is in **Pulse**," Beat 8) and **data morphing directly into the logo** (the funnel chip-chain sliding into the mark, Beat 16) — two different ways of landing the brand without stopping the pitch to do a dedicated logo beat. MKG-04's RM-total count-up (Part 4a in the motion plan) could end the same way: the final total sliding into the Meikigo mark instead of a hard cut to the tagline card.
5. **A brand sting planted mid-piece, then replayed in full at the close** (Beat 5 vs. Beat 17) — same rings-into-wordmark graphic, played fast with no tagline the first time, slow with the full tagline and CTA the second time. Gives the piece a bookend without being repetitive, since the two instances have different jobs (confirm who's talking vs. close the pitch).
6. **One pure-white punch beat and one pure-black high-contrast beat** (Beats 10 and 16) dropped into an otherwise light, UI-heavy piece — both are the highest-contrast, most graphically simple moments, and both land at a tonal pivot (into the "do this instead" feature run, and into the brand close).
7. **A quiet, text-free UI-only beat right before the biggest sentence** (Beat 14, before Beat 15's longest line) — lets the product demonstrate itself once without narration, so the big claim that follows reads as earned rather than asserted.
