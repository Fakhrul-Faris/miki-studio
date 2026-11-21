=== cards/01_Animation_Motion/detailed-blocking-breakdowns--five-steps-3d-animation.md
Line "RM100 jadi RM150" for a stall's weekly takings (illustrative):
- BEFORE: `| 5 | "jadi RM150" | push in 5 % | coin stack keys: 10 coins → 15 coins |` — coins pop in between.
- AFTER: `| 5 | "jadi RM150" | push in 5 % | breakdowns: coin 11 grows in at 20 %, 12–15 staggered every ~0.1 s on small arcs onto the stack, counter RM100 → RM150 lands on "RM150" | detailed-blocking |`

=== cards/01_Animation_Motion/halves-plus-thirds-slow-fast-slow--animate-like-japanese-pro.md
Kedai runcit in Shah Alam, line "Duit syiling RM0.50 tu masuk tabung" (illustrative):
- BEFORE: `| 7 | "masuk tabung" | side on the counter, camera follows | coin linear 0 → 1 over 0.8 s |` — starts and stops at full speed.
- AFTER: `| 7 | "masuk tabung" | side on the counter, camera eases with the coin | coin keys 0, 1/6, 1/2, 5/6, 1 over 0.8 s, 5 cm arc on the 1/2 key, lands on "tabung" | halves-plus-thirds |`

=== cards/01_Animation_Motion/morph-chain-infinite-loop-background--camera-movement-animation-guide.md
Line "Setiap hari, RM20 masuk" at a kuih stall in Melaka (illustrative):
- BEFORE: `| 6 | "setiap hari" | camera trucks along a long row of coins | — |` (camera move eats the setup's one move; row ends visibly).
- AFTER: `| 6 | "setiap hari" | locked macro, slow push 4 % | coin chain loops: each 50 sen coin slides into the next slot, a new one grows in left, the last fades out right; counter RM0 → RM20 on "RM20" | morph-chain-loop |`

=== cards/01_Animation_Motion/spline-pass-restore-contrast--five-steps-3d-animation.md
Line "Step 3: kira kos bahan" at a cendol stall, a cost tag RM1.80 slides on (illustrative):
- BEFORE: tag eases in over 0.9 s with `Easing.inOut(Easing.sin)`; arrives after the word, feels floaty.
- AFTER: `| 6 | "kira kos bahan" | push in 4 % | tag travel 0.45 s with `Easing.out(Easing.poly(4))`, lands on "kos"; 3 % overshoot over 0.4 s | spline-pass-restore-contrast |`

=== cards/01_Animation_Motion/thirds-inbetween-true-ease--animate-like-japanese-pro.md
Shot-list row, a Ramly burger stall in Kajang, line "Harga sebenar: RM6.50" (illustrative):
- BEFORE: `| 4 | "RM6.50" | top-down on the burger wrapper, push in 6 % | price tag slides on from the right on "RM6.50", keys 0 → 0.5 → 0.75 → 1 |` — the tag arrives at full speed and stops dead (halves).
- AFTER: `| 4 | "RM6.50" | top-down on the burger wrapper, push in 6 % | price tag slides on over 0.4 s on "RM6.50", keys 0 → 2/3 → 8/9 → 1 (thirds), last 3 frame gaps shrink | thirds-inbetween-true-ease |`

=== cards/04_Shading_Lighting/bounce-card-plane-fill--three-point-product-series.md
Topic: "Mesin kopi RM300 untuk gerai: balik modal berapa cawan?" (illustrative).
BEFORE: `| 5 | "seratus cawan" | side view of the coffee machine, key top-right, a second softbox left | cups count up | — |` — two highlights, two shadows.
AFTER: `| 5 | "seratus cawan" | slow 3/4 dolly along the machine; key top-right, bounce card camera-left gives a smooth gradient on the shadow side | counter (accent) 0 → 100 on "seratus", cups multiply in 0.4 s steps | bounce-card-plane-fill--three-point-product-series |`

=== cards/04_Shading_Lighting/close-key-highlight-spans-product--three-point-product-series.md
Topic: "Satu botol minyak masak RM31: berapa lama tahan untuk gerai goreng pisang?" (illustrative).
BEFORE: `| 1 | "RM31 sebotol" | low side view of the 5 kg bottle, small key far top-left | price fades in | — |` — dot highlight, bottle reads as a yellow block.
AFTER: `| 1 | "RM31 sebotol" | low side view; close strip key above runs one highlight from cap to base, bottle shape reads instantly | "RM31" (accent) grows in 0.4 s on "RM31"; camera creeps 3 cm along the highlight | close-key-highlight-spans-product--three-point-product-series |`

=== cards/04_Shading_Lighting/glossy-only-world-colour--blender-lighting-hack.md
Phone-screen setup for "Cara semak duit masuk dalam app" (how-to): BEFORE — the black glass reflects nothing, the phone
reads as a flat rectangle. AFTER — an off-camera RectLight (`#9fb2d9`, desaturated cool) streaks across the glass;
the room stays dark and the accent stays on the incoming amount.

=== cards/04_Shading_Lighting/logo-catch-point-light--lighting-trick.md
Topic: "Kenapa kopi jenama tempatan boleh lawan kopi import?" (illustrative; use the real brand's logo file only with a real brand).
BEFORE: `| 1 | frame 0 "Kopi RM2 lawan RM15?" | macro on a coffee tin, logo matte under the key | text fades in | — |` — logo grey, lost.
AFTER: `| 1 | frame 0 "Kopi RM2 lawan RM15?" | macro 3/4 on the tin's embossed logo; a tiny point light 15 cm off-frame makes the logo the one crisp glint | camera already drifting 2 cm/s, glint slides across the emboss; title fades 0.4 s | logo-catch-point-light--lighting-trick |`

=== cards/04_Shading_Lighting/natural-clay-material-speckle-pointiness-bump--natural-clay-material.md
Topic: "Pasu tanah liat RM8 vs pasu plastik RM3: untung mana untuk nurseri kecil?" (numbers illustrative; plain price comparison).
BEFORE: `| 2 | "pasu tanah liat, RM8" | macro on a pot, one flat orange material | price fades in | — |` — reads as plastic.
AFTER: `| 2 | "pasu tanah liat, RM8" | macro 3/4 down the pot rim under the soft top key; speckles, grain and soft lumps visible, sheen brighter on the rim | "RM8" tag (accent) fades in 0.4 s on "RM8"; camera slides 4 cm along the rim | natural-clay-material-speckle-pointiness-bump--natural-clay-material |`

=== cards/04_Shading_Lighting/top-surface-highlight-accent-light--lighting-products-breakdown.md
Topic: "Botol kicap RM3.50 vs RM6: beza apa?" (illustrative).
BEFORE: `| 4 | "penutup merah tu" | macro on the cap under the top key | cap fades in | — |` — cap a flat red blob.
AFTER: `| 4 | "penutup merah tu" | macro 3/4 down on the cap; a 6×4 cm panel 12 cm above puts one curved glint along the rim | on "merah" the cap (accent) brightens 0.4 s, glint slides as camera dollies 5 cm | top-surface-highlight-accent-light--lighting-products-breakdown |`

=== cards/04_Shading_Lighting/twin-offset-sun-layered-soft-shadows--blender-lighting-hack.md
Board still for "Cara susun stok supaya tak rugi expired" (kedai runcit; illustrative): BEFORE — a milk carton on the
shelf with a knife-edge black shadow, reads as a render. AFTER — the same key split into two suns 2° apart, sizes 5/1:
the shadow is dense at the carton's base and fades in two steps; the accent expiry-date label stays the brightest
thing.

=== cards/04_Shading_Lighting/twin-spots-warm-soft-plus-sharp-sunlight--lighting-products-breakdown.md
Topic: "Gerai air tebu: untung RM40 sehari?" (illustrative).
BEFORE: `| 2 | "bawah panas terik" | top view of the cup, one spot | cup fades in | — |` — razor shadow, reads as a studio render.
AFTER: `| 2 | "bawah panas terik" | low 3/4 on the stall's steel counter; twin top spots: crisp core shadow of the cup with a warm soft fringe | on "terik" the condensation drops brighten over 0.4 s; light stays still | twin-spots-warm-soft-plus-sharp-sunlight--lighting-products-breakdown |`

=== cards/04_Shading_Lighting/window-funnelled-key-narrow-spread--lighting-products-breakdown.md
Topic: "Modal stok sebulan kedai runcit: berapa?" (numbers illustrative; plain count × price).
BEFORE: `| 3 | "sepuluh bungkus gula, RM30" | wide of the shop interior, evenly lit | sugar packs fade in | — |` — every shelf
as bright as the sugar; nothing leads the eye.
AFTER: `| 3 | "sepuluh bungkus gula, RM30" | low 3/4 on the counter; key spot through a shelf gap lands only on the stack of 1 kg sugar packs, shelves fall to dark | packs multiply 1 → 10 on "sepuluh" (0.4 s each, counter ticks); "RM30" tag (accent) fades in on "RM30"; beam stays fixed | window-funnelled-key-narrow-spread--lighting-products-breakdown |`

=== cards/05_Camera_Raea_Pipeline/camera-follows-the-action--camera-movement-animation-guide.md
Line "Untung bulan ni RM1,200" at a car wash in Seremban, chart bar rising (illustrative):
- BEFORE: `| 8 | "RM1,200" | locked low angle on the bar chart | bar grows to RM1,200 |`
- AFTER: `| 8 | "RM1,200" | low angle; look-at tilts up with the bar's top (~50 % of its rise), eased, settles on "RM1,200" | bar grows, accent on the top, counter RM0 → RM1,200 | camera-follows-the-action |`

=== cards/05_Camera_Raea_Pipeline/image-plane-cutout-set-limit-rotation--camera-movement-animation-guide.md
Setup with a kopitiam's printed menu poster as an ImagePlane, line "Harga kopi naik ke RM2.80" (illustrative):
- BEFORE: `| 3 | "naik ke RM2.80" | orbit 40° around the poster wall |` — poster reads as a paper-thin card.
- AFTER: `| 3 | "naik ke RM2.80" | push in 8 % square to the poster, 5° drift, cup GLB in foreground | RM2.80 lights in accent on "RM2.80" | image-plane-limit-rotation |`

=== cards/06_Art_Direction/accent-colour-tracks-the-arc--60-30-10-color-rule.md
Topic: "Kenapa kedai makan tutup dalam tahun pertama?" (S16-style; illustrative numbers).
- BEFORE: the brand-orange accent at full glow on every line, from "sewa RM 3,000" (loss) to "untung balik" (payoff).
- AFTER: L02–L05 (rent, waste, debt): orange on the RM figures but dim, no bloom; L07 "untung balik bila menu dipotong
  separuh": the same orange at full glow on the shortened menu. The arc reads in colour with the sound off.

=== cards/06_Art_Direction/apple-minimal-ui-look-rules--apple-style-animation-guide.md
Topic: step 1 of "cara simpan RM10 sehari" — RM10 × 30 days = RM300 (plain arithmetic; generic savings app UI).
- BEFORE: a busy screen with 6 icons, three colours, left-aligned text.
- AFTER: light-grey ground, one centred rounded card: "Simpanan bulan ni" (bold) / "RM300" (regular, accent on RM300),
  generous margins; the card rises in 0.4 s.

=== cards/06_Art_Direction/art-ingredients-vocabulary-brief--johnny-harris-writes.md
Topic: a goldsmith shop in Kota Bharu pricing a 916 ring (numbers illustrative).
BEFORE: "Dark room, gold ring, accent gold." (generic)
AFTER ingredients: "jeweller's hush" (black velvet tray, one top light, dust in the beam) · "scale truth" (the digital
scale's green LCD is the only accent) · "receipt ink" (numbers appear as thermal-printer type) · "glass case clutter" (soft-
focus trays behind). Five-line AD: hero = ring on a velvet tray; accent = LCD green; grey = everything else; font = house; sets = velvet tray, scale pan, counter glass.

=== cards/06_Art_Direction/association-chart-past-the-cliche--4-steps-powerful-visuals.md
Line: "Simpan duit kecemasan, tiga bulan belanja." (everyday money; abstract "safety").
- BEFORE: piggy bank on a table (cliché).
- AFTER chart: "kecemasan" → bocor, banjir, payung, tayar pancit → spare tyre, umbrella; "tiga bulan" → calendar, 3
  envelopes; "belanja" → receipt, grocery bag. Candidates: spare tyre (a backup you hope not to use), 3 envelopes.
  Literal check: the line is about money set aside for 3 months → choose 3 labelled envelopes on the shelf (literal), and
  keep the spare-tyre idea only if the line itself says "tayar spare".

=== cards/06_Art_Direction/boost-tiny-detail-with-conforming-insert--apple-style-3d-motion.md
Topic: a phone's battery "saver" toggle at a kedai handphone (generic shop).
- BEFORE: wide macro of the phone; the tiny green charge LED is 4 px on a phone screen — the line "lampu hijau" shows nothing.
- AFTER: a flat disc conformed to the LED, accent-lit on "lampu hijau", parented to the phone through the push; dropped
  in the next setup where the LED faces away.

=== cards/06_Art_Direction/brightness-contrast-between-sequences--color-theory-film-ep5.md
Topic: "Bayar ansuran BNPL: bila jadi masalah" (everyday money; illustrative numbers).
- BEFORE: every setup the same mid-brightness.
- AFTER: L01–L06 (late fees piling) band D: dark leather wallet, charcoal phone, slips in grey paper, tight key.
  L07–L10 ("cara elak: satu ansuran je sekali") band B: white receipt, light pine counter, wider pool of light; the
  room stays black. The two halves read differently on the contact sheet.

=== cards/06_Art_Direction/colour-in-the-object-not-the-grade--60-30-10-color-rule.md
Topic: "Gerai nasi lemak: kenapa bungkus guna daun pisang lagi untung" (illustrative numbers).
- BEFORE: generic grey packet model; plan "grade the packet greener in post so it reads as banana leaf".
- AFTER: source a real banana-leaf texture (secondary, 30 %), dark charcoal stall counter (dominant, 60 %), and one
  real red sambal-chilli accent on the line "RM 0.30 je kos daun" — the coin counter appears in the same red (10 %).
  No grade touches the leaf.

=== cards/06_Art_Direction/desaturation-signals-past-or-cold--color-theory-film-ep5.md
Topic: Everyday Owners — a stall that started in 1990 (generic hawker; illustrative numbers).
- BEFORE: the 1990 line and the present line look identical; only the caption says "1990".
- AFTER: `| 2 | "Tahun 1990, sebungkus RM 1." | macro on an old enamel plate, faded paper wrapper | wrapper and table near-grey, contrast up; RM 1 in dim accent | desaturate-past |` → `| 3 | "Hari ni, RM 6." | same plate, camera rises; colour eases back over 0.6 s | RM 6 full accent on "RM 6" | desaturate-past |`

=== cards/06_Art_Direction/evidence-vs-soul-moments--johnny-harris-writes.md
Topic: a laksa stall in Ipoh, 3 steps to set a price (numbers illustrative).
BEFORE: every row a literal ingredient close-up; step breaks feel flat.
AFTER: rows 5, 9, 13 = S: the stall's steaming ladle, simplified and lit in the accent, rises over the pot as the step number "1/2/3" appears; all other rows E (noodles RM0.80 on a scale, broth cost counter).

=== cards/06_Art_Direction/familiar-object-analogy-bank--visual-analogies.md
Topic: "Kenapa kena on 2FA untuk akaun bank perniagaan" (how-to; illustrative).
- BEFORE row: `| 4 | "2FA tambah satu lapis keselamatan" | phone with a shield icon | shield glows |` — generic icon,
  "security layer" is never shown.
- AFTER row: `| 4 | "Orang curi password pun, masih tak boleh masuk" | macro: brass padlock on a roller-shutter latch,
  low 3/4 angle | on "password" a key slides in and turns 30°; on "tak boleh" a second lock (accent orange) stays
  shut — key stops (eased, 0.4 s) | familiar-object-analogy-bank |`. Row 5 cuts back to the literal phone OTP screen.

=== cards/06_Art_Direction/focal-point-visual-hierarchy--every-composition-concept.md
Topic: "Kenapa harga roti canai naik 20 sen?" (a mamak in Kuala Lumpur; illustrative numbers).
- BEFORE (frame brief Eye): "roti canai, flour bag, ghee tin, gas tank, price board" — five equal objects, eye wanders.
- AFTER: "1 price board RM 1.80 → RM 2.00 (accent on 2.00, centre, sharp) → 2 ghee tin with RM tag (75 %, left
  third, half-lit) → 3 flour bag (blurred behind). Gas tank removed."

=== cards/06_Art_Direction/four-visual-metaphor-types--visual-metaphors-mograph.md
Line (a metaphor in the script): "Duit korang bocor sikit-sikit tiap bulan."
- BEFORE: substitution — a cartoon leaking pipe appears.
- AFTER: transformation — the hero wallet's stitching opens and coins drip from the seam one by one, a counter beside it
  ticking RM5, RM10… (illustrative).

=== cards/06_Art_Direction/frame-within-a-frame--camera-angles-8-shots.md
Topic: "Sewa kedai 3 tahun: berapa sebenarnya korang komit" (rent illustrative; the logic is plain arithmetic).
- BEFORE: a tenancy agreement on a desk, medium shot.
- AFTER row: `| 7 | "Sewa RM 1,500 sebulan, tiga tahun, jadi RM 54,000" | frame-in-frame: through the gap of a half-closed
  roller shutter, the agreement sits small inside the dark opening | on "tiga tahun" the shutter lowers 10 cm (eased
  0.6 s), the gap tightens; on "54,000" the total (36 × 1,500) counts up in accent on the agreement | frame-within-a-frame |`

=== cards/06_Art_Direction/hook-built-from-the-subjects-own-artefact--saas-launch-video.md
Frame-0 text: "Salah satu digit. Rugi RM2,000." (kedai hardware in Klang, illustrative)
- BEFORE: dark background, the line in big white sans, an invoice icon above.
- AFTER: macro on a printed invoice at a low grazing angle; the words sit in its columns ("Kuantiti: 10" with the 0
  smudged, "Jumlah: RM2,000"); "RM2,000" is the only accent-red text; the camera is already pushing toward it.

=== cards/06_Art_Direction/hsb-three-levers-colour-spec--color-theory-film-ep5.md
Topic: "Cara pilih supplier ayam untuk gerai: 3 step" (illustrative).
- BEFORE (ref palette): "dark blue bg, warm wood, orange accent, white tag".
- AFTER: `H 230 S 25 B 10 #13141a dominant (room) · H 25 S 45 B 45 #735a3f secondary (chopping board) · H 40 S 8 B 92 #ebe6dc tag paper · H 28 S 90 B 100 #ff8a1a accent (price on the supplier slip)` — only one colour above S 60.

=== cards/06_Art_Direction/intensify-a-metaphor-by-adding-elements--visual-metaphors-mograph.md
Line: "Hutang kad kredit ni membesar sendiri." (illustrative; balance growth by interest is real)
- AFTER: row 1 a RM1,000 statement on a desk; row 2 the statement's pages multiply into a stack, counter RM1,180;
  row 3 the stack's shadow swallows the wallet beside it, counter RM1,400 in accent.

=== cards/06_Art_Direction/line-of-action-positive-negative--dynamic-poses-tips.md
Line: "Untung RM1,200 sebulan bila stok laku cepat." (illustrative)
- BEFORE: coins in a flat straight row on the counter.
- AFTER (shot-list row): `| 6 | "untung RM1,200" | low 3/4 on the counter, 85 mm | coin stack row rises in one upward C-arc toward the till drawer; counter ticks to RM1,200 on "RM1,200" | line-of-action |`
  For the loss line the same coins sag in a downward C toward the floor edge.

=== cards/06_Art_Direction/match-visual-mode-to-subject--visual-analogies.md
Topic: "Cara set up DuitNow QR untuk gerai" (how-to; illustrative).
- BEFORE: every row is the 3D stall with floating icons, including "Step 2: buka app bank korang".
- AFTER: L01 hook `[3D]` macro of a laminated QR stand on the stall counter; L03–L07 steps `[UI]` code-built app
  screens (tap highlights in accent, ~0.4 s eases); L08 "RM 3,000 sebulan masuk terus ke akaun" (illustrative; QR payments do land in the linked account) `[GFX]` counter on the bank
  balance; L10 question `[3D]` back on the QR stand (loops to frame 0).

=== cards/06_Art_Direction/merge-images-negative-space--4-steps-powerful-visuals.md
Line: "Kalau tak kira masa, kopi RM 3 korang sebenarnya rugi." (a home café owner; illustrative numbers).
- BEFORE: a cup, then a clock, side by side.
- AFTER: a cup seen top-down; the dark coffee surface plus the spoon handle form a clock face and hand (cup's negative
  space = clock). Shot-list row: `| 4 | "tak kira masa" | top-down macro on the cup, 100 mm | spoon rotates like a minute hand on "masa", 0.8 s eased; RM 3 tag fades in beside | merge-images |`.

=== cards/06_Art_Direction/metallic-surface-masked-highlight-sweep--apple-style-3d-motion.md
Topic: "Sale ni betul ke tipu?" style how-to (illustrative shop).
- BEFORE: the new price "RM49" appears; a white diagonal flash wipes across the frame.
- AFTER: the brushed-metal "RM49" tag sits in the dark; on "harga asal" one soft highlight slides across its face and
  comes to rest at the top-right corner, a tiny glint stays bottom-left; the accent red stays on the struck-out price only.

=== cards/06_Art_Direction/metaphor-build-process-core-message-to-one-use--visual-metaphors-mograph.md
Line: "Duit korang bocor sikit-sikit."
- BEFORE: first idea, a leaking tap, used again at L06 and L09.
- AFTER: candidates — tap, tyre, sieve, torn pocket, wallet seam; first (tap) crossed out; chosen: wallet seam (the
  hero, readable in 1 s); used only at L02.

=== cards/06_Art_Direction/milk-it-extra-story-layer--4-steps-powerful-visuals.md
Hero (from merge card): cup whose surface reads as a clock.
- BEFORE: the cup appears in L04 only; L06 ("Kira masa, harga naik RM 1") cuts to a new price board.
- AFTER: L06 reuses the cup: the "clock" hand reaches the cup's rim and a RM 1 coin rises out of the coffee in accent
  on "RM 1" — same object, next story (time spent = price added).

=== cards/06_Art_Direction/moving-light-guides-the-eye--animate-light-control-viewer.md
Topic: a resit at a kedai runcit — 3 items RM4.50 + RM6.00 + RM2.30 = RM12.80 (plain arithmetic, illustrative).
- BEFORE: whole receipt evenly lit; the eye wanders.
- AFTER: the top light rests on "RM4.50", travels down the column as each price is said, dims briefly as it crosses
  the fold, and settles on "RM12.80" lit in the accent.

=== cards/06_Art_Direction/odd-number-groupings--every-composition-concept.md
Topic: "Kedai kopi kecil: berapa cawan sehari baru untung?" (illustrative).
- BEFORE: two cups and four sugar sachets dressing the hero kettle.
- AFTER: three cups (middle one sharp under the key light), five sachets in soft focus behind. The L05 line "120 cawan
  sehari" is shown literally (counter ticks to 120) — not forced odd.

=== cards/06_Art_Direction/one-vision-holistic-world--tim-burton-set-design.md
Topic: "Cara buat invois guna phone dalam 3 step" (UI-heavy, ~80 % screens; illustrative).
- BEFORE: phone UI screens built in a bright white SaaS look; the 3D setups in Style D dark room — two videos stitched.
- AFTER: vision rules applied to the UI too: dark UI theme, the same single brand accent on the active field only,
  screens lit as an emissive phone in the dark room with bloom, the same eased 0.4 s grow-in. Board check: all 12
  stills pass "same video" test.

=== cards/06_Art_Direction/over-the-shoulder-relationship--camera-angles-8-shots.md
Topic: "Terima QR di gerai: apa pelanggan nampak" (illustrative).
- BEFORE: two separate setups — the phone alone, then the QR stand alone; the link is lost.
- AFTER row: `| 6 | "Pelanggan scan, duit masuk terus ke akaun korang" | over-the-object: customer's phone edge
  blurred left fg, QR stand sharp right | on "scan" phone screen glows (accent); on "masuk" RM 12.50 slides up on the
  stand's card | over-the-shoulder-relationship |`

=== cards/06_Art_Direction/overhead-shot-shows-layout--camera-angles-8-shots.md
Topic: "Cara bahagi duit jualan pasar malam: 3 bekas" (how-to; illustrative).
- BEFORE row: `| 5 | "Asingkan modal, untung, simpanan" | 3/4 close-up of one container | label pops |`
- AFTER row: `| 5 | "Asingkan modal, untung, simpanan" | top-down, three plastic containers in a row on a wooden stall
  table, group ~55 % of width | on "modal" RM 300 in notes slides into box 1; "untung" RM 120 into box 2; "simpanan"
  RM 50 into box 3 (accent lid) — each 0.4 s ease | overhead-shot-shows-layout |`

=== cards/06_Art_Direction/pair-analogy-with-visual--analogies-technical-ideas.md
Topic: e-wallet balance like a tabung ayam (illustrative).
BEFORE: split screen, left a phone app, right a cartoon piggy bank, labels "A" and "B".
AFTER: Ref tabung ayam macro on a kitchen table → Idea "baki e-wallet = tabung" → Decision the tabung morphs into the
phone on "e-wallet", balance RM500 in accent → Eye on the coin slot / balance number → Not generic because the slot
becomes the balance digits.

=== cards/06_Art_Direction/pattern-then-break--every-composition-concept.md
Topic: "Barang tiruan kat marketplace: cara cam dalam 3 step" (how-to; generic, no real brand).
- BEFORE: one bottle on screen with a caption "FAKE".
- AFTER: `| 5 | "Satu je yang palsu." | macro dolly along a row of 7 bottles, 85 mm | identical row for 1 s; on "palsu" bottle 5 lifts 3 cm and its seal glows accent, others stay still | pattern-then-break |`

=== cards/06_Art_Direction/pose-concept-from-object-interaction--dynamic-poses-tips.md
Topic: a kedai runcit in Shah Alam losing ~RM300 a month (illustrative) to expired stock.
- BEFORE (generic): "Figure standing beside shelf." — no object, no reaction.
- AFTER: Idea "owner + expired milk carton + quiet dread" → Decision: library figure holding a seated, shoulders-down
  pose on a stool, facing the chiller; the carton with the red date in the foreground (accent on the date).
  Style D variant (no people): Idea "milk carton + bin + about to fall" → carton tipped over the bin edge, date facing lens.

=== cards/06_Art_Direction/pov-shot-shared-attention--camera-angles-8-shots.md
Topic: "Sale ni betul ke tipu? Tengok tag harga" (how-to; illustrative).
- BEFORE: side-on product shot of a shirt with two price tags; the viewer watches a tag.
- AFTER row: `| 3 | "Bila korang tengok tag, cari harga asal dulu" | POV standing shopper, looking down ~35° at a rack
  tag, DoF on the crossed-out price | on "harga asal" the RM 89 line sharpens and goes accent; RM 59 stays grey |
  pov-shot-shared-attention |`

=== cards/06_Art_Direction/readability-clutter-silhouette-check--every-composition-concept.md
Topic: "Gerai burger: 3 benda makan untung korang" (illustrative).
- BEFORE: one still shows the burger, the grill, three sauce bottles, a cash tray and a price board — five competitors;
  the burger is seen from the top and reads as a disc.
- AFTER (shot-list row): `| 4 | "Benda pertama: sos." | macro 3/4 on the grill, 85 mm; one sauce bottle sharp, two blurred behind | bottle cap glows accent on "sos"; RM 0.40 per burger tag slides in 0.4 s | readability |` — burger moved out; the bottle shown in 3/4 with a cool rim so its shape cuts the dark.

=== cards/06_Art_Direction/setting-vs-set-script-breakdown--tim-burton-set-design.md
Setting: "a 24-hour mamak in PJ after midnight, dark, one warm light." (illustrative)
- BEFORE (shot list): `| 3 | "Teh tarik untung paling tinggi" | close on cup | — |` — no object list, generic cup.
- AFTER: breakdown row `| L03 "Teh tarik untung paling tinggi" | glass mug, pull jug, condensed-milk tin, RM 2.50
  price strip | set 2: steel counter | mug (accent on the RM 2.50 → RM 0.60 cost split, illustrative) |` →
  shot-list row `| 3 | "untung paling tinggi" | macro on the steel counter, mug + tin + price strip | price strip
  splits into RM 0.60 cost / RM 1.90 profit on "untung" | setting-vs-set |`.

=== cards/06_Art_Direction/shape-language-order-vs-chaos--every-composition-concept.md
Topic: "Cara susun duit niaga: 3 akaun, 3 tujuan" (how-to, illustrative).
- BEFORE: notes and coins in a loose pile through every step.
- AFTER (shot-list rows): `| 2 | "Duit korang campur aduk." | top-down macro on the counter | notes and coins scattered at random angles (chaos) | shape-language |` → `| 3 | "Step satu: asingkan tiga." | same top-down, slow push | notes slide into three neat squares on "tiga", 0.6 s eased; first square takes the accent | shape-language |`

=== cards/06_Art_Direction/sixty-thirty-ten-colour-split--60-30-10-color-rule.md
Topic: "Berapa modal stok seminggu kedai runcit" (a kedai runcit in Shah Alam; numbers illustrative, logic = summing a supplier invoice).
- BEFORE (frame brief palette): "dark background, wooden counter, orange highlights, blue phone, green notes on the receipt."
  Three saturated colours fight; the eye doesn't know where to land.
- AFTER: `60 % dominant #16151a → #2a2830 (dark room, two values for floor and wall falloff) · 30 % secondary #8a6a4a
  (worn wooden counter + #d8d2c4 receipt paper) · 10 % highlight #ff7a1a — only the RM 1,200 total line on the receipt`.
  The phone is dark grey; the notes are paper-white. On "RM 1,200 seminggu", the orange total line is the only saturated pixel.

=== cards/06_Art_Direction/soft-ambient-glow-blobs-behind-ui--smooth-saas-creatorly.md
Topic: a "Tabung kecemasan" app screen (RM50 a week × 52 = RM2,600, illustrative).
- BEFORE: flat white screen, black text — reads as a slide.
- AFTER: two pale-mint blobs drift behind the card, the card has a soft 40 % shadow; "RM2,600" stays the only saturated colour.

=== cards/06_Art_Direction/theatrical-vs-naturalistic-mise-en-scene--tim-burton-set-design.md
Topic: "Duit e-wallet korang sebenarnya duduk mana?" (illustrative)
- BEFORE: phone spins and glows for no reason; coins fly around the frame in L02.
- AFTER: Mode: real phone, real counter, one top light (naturalistic); bends only where lines ask — L04 "duit tu
  sebenarnya kat bank" → the phone screen turns transparent (opacity law) and a bank vault interior sits inside it at
  macro scale (scale law); every other setup obeys physics.

=== cards/06_Art_Direction/translucent-block-spacing-gauge--apple-style-ui-face-id.md
Topic: a price-compare card "Pasar RM8 vs Supermarket RM11" (illustrative).
- BEFORE: left padding 40 px, right 28 px; icon sits closer to the top — card looks off on a phone.
- AFTER: a 40 px red gauge fits every side and the icon-to-text gap; the card reads balanced.

=== cards/06_Art_Direction/two-worlds-opposite-exaggeration--tim-burton-set-design.md
Topic: "Promosi 'Beli 1 Free 1' — siapa sebenarnya bayar?" (a kedai runcit, illustrative numbers).
- BEFORE: both setups the same dark macro of the bottle; the "hidden cost" reads as a caption only.
- AFTER: World A (shelf): bottles in a perfect row, soft even top light, clean tag "B1F1" — over-tidy. Shot-list row
  `| 5 | "siapa sebenarnya bayar?" | camera dollies down through the shelf edge; bottle x-rays | B: inside, jagged stack of
  cost slips, hard side light, slips tilted at random; RM 4.20 (accent) on the slip that says margin on "bayar" | two-worlds |`.

=== cards/06_Art_Direction/weight-pillar-limb--dynamic-poses-tips.md
- BEFORE (frame brief Decision): "Stall owner stands at the counter" — both feet even, figure floats slightly.
- AFTER: "Owner holds a lean: weight on left leg (straight), right knee relaxed, left hand on counter; both soles on the
  tiles with contact shadow." Style D: "Phone rests on one corner against the QR stand; AO under the corner reads the weight."

=== cards/07_Script_Story/and-but-therefore-structure--abt-science-writing.md
Topic: a kedai runcit in Shah Alam choosing between cash and QR (illustrative numbers).
BEFORE (and-then list): "Kedai runcit terima cash. Ada juga QR. QR ada caj. Ada juga kad. Ni beza dia."
AFTER (ABT sentence): "Pakcik kedai runcit terima cash setiap hari **and** rasa duit tu selamat dalam laci, **but**
setiap bulan RM300 hilang sebab salah kira dan duit palsu, **therefore** dia buka QR — caj RM0, kira sendiri."
- L01 (And): "Kedai ni terima cash je. Pakcik kata paling selamat."
- L02 (But): "Tapi bulan lepas, RM300 hilang. Tak tahu ke mana."
- L03–L09 (Therefore): the QR steps and the RM0 fee.
- L11 (return): "Laci cash ke QR — korang pilih mana?"

=== cards/07_Script_Story/audience-matched-relatable-analogy--analogies-technical-ideas.md
Topic: why an e-wallet "balance" earns nothing (illustrative).
BEFORE: "Duit dalam e-wallet tak ada pulangan sebab ia bukan akaun simpanan berfaedah."
AFTER: "Duit dalam e-wallet macam duit dalam tabung ayam. Simpan setahun, RM500 tetap RM500."

=== cards/07_Script_Story/backbone-outline-before-visuals--johnny-harris-writes.md
Topic: how a burger stall in Shah Alam spends RM1,000 of sales (illustrative).
BEFORE: script written straight from notes; jumps between rent, buns, permits, profit.
AFTER backbone = money flow: 1 RM1,000 comes in (hook: "untung" vs real) · 2 buns + patties RM420 · 3 gas + minyak RM90 · 4 tapak + permit RM60 · 5 helper RM200 · 6 left: RM230 · 7 question: worth 6 nights a week?

=== cards/07_Script_Story/beat-wall-outline-before-lines--stone-parker-nyu.md
Topic: a kedai runcit's free plastic bags (numbers illustrative).
BEFORE: start straight on L01 wording and fix structure later.
AFTER (Beats v0): act 1 "beg plastik nampak percuma" → but → act 2 "setiap beg kos kedai 5 sen" → therefore →
"300 pelanggan sehari = RM15 sehari" → but → "sebulan dah RM450, sama macam sewa satu rak" → therefore → act 3
"patut ke kedai caj beg?"

=== cards/07_Script_Story/build-analogy-part-by-part--analogies-technical-ideas.md
Topic: what a kedai's monthly cost is made of (illustrative numbers).
BEFORE: "Kos bulanan kedai ada sewa, gaji, bil dan stok."
AFTER: "Bayangkan satu bekas nasi lemak. Nasi tu sewa, RM1,500. Sambal tu gaji. Telur tu bil. Baru ada untung — ikan bilis je."
Rows: `| 9 | "Nasi tu sewa, RM1,500" | top-down macro on the packet, opened | rice layer lights in accent, RM1,500 counter on "sewa" |` …

=== cards/07_Script_Story/but-therefore-not-and-then--stone-parker-nyu.md
Topic: a laundry shop owner pricing per kg (illustrative numbers).
BEFORE (and-then chain): L04 "Step satu, timbang baju." → and then → L05 "Step dua, kira harga." → and then →
L06 "Step tiga, bagi resit."
AFTER: L04 "Step satu, timbang baju depan pelanggan." → **but** → L05 "Tapi timbang je tak cukup, pelanggan still
rasa mahal." → **therefore** → L06 "Jadi, tulis RM4 sekilo besar-besar kat kaunter." → **but** → L07 "Tapi baju tebal
selimut? Lagi berat, lagi untung RM12."

=== cards/07_Script_Story/canal-wall-fresh-language--johnny-harris-writes.md
Topic: why a RM1 coin matters to a vending-machine owner in Cyberjaya (illustrative).
Bottom of canal: "Duit syiling penting untuk bisnes vending machine."
AFTER (lens: first time seeing it): "Mesin ni tak pernah tidur. Tiap malam dia telan 300 syiling — RM300 yang tak ada siapa kira."

=== cards/07_Script_Story/circle-back-reframe-close--vox-explainer-script.md
EX46.
- BEFORE: end "Jadi hati-hati masa sale ya. Follow untuk tips lagi."
- AFTER: L10 "Jadi lain kali nampak 'diskaun 50%'…" (callback to the RM299 → RM149 tag) L11 "50%… dari harga apa?"
  Last shot = the frame-0 tag macro.

=== cards/07_Script_Story/citation-tag-fact-check--johnny-harris-writes.md
Topic: price-tag vs receipt mismatch at a supermarket (EX46 style).
BEFORE: L07 "Kalau harga resit lain, korang bayar yang murah." — no source.
AFTER: L07 red → opened the KPDN price-display rules; quote + link pasted; second source a news explainer → green. Post copy lists both links.

=== cards/07_Script_Story/clarity-over-hype-declarative-lines-and-pauses--lemmino-script-writing.md
- BEFORE: "Korang takkan percaya berapa banyak duit hilang sebab scam QR ni, memang gila!"
- AFTER: "Satu sticker QR palsu. Seminggu. … RM600 masuk akaun orang lain." (illustrative amount)

=== cards/07_Script_Story/classic-style-active-agents--johnny-harris-writes.md
Topic: why a kopitiam in Ipoh raised its kopi price (illustrative).
BEFORE: "Peningkatan kos operasi menyebabkan pelarasan harga."
AFTER: "Pembekal naikkan harga susu pekat. Kopitiam ni naikkan kopi 20 sen." → shot: macro tin of condensed milk, price sticker peels off and a new one slides on; cup price tag ticks RM2.20 → RM2.40.

=== cards/07_Script_Story/cold-open-drop-into-action--johnny-harris-writes.md
Topic: a kedai bundle in Penang that buys stock by the bale (illustrative).
BEFORE L01: "Hari ni aku nak cerita pasal bisnes baju bundle."
AFTER L01: "Satu bal baju, RM800, dibelah — dan kedai tak tahu apa ada dalam tu." Frame 0: macro of a cutter slicing the bale strap, strap springing open; tone "tense, close, quiet".

=== cards/07_Script_Story/cold-open-under-20-words-with-one-anchor--vox-explainer-script.md
Topic: why every nasi lemak bungkus at a stall costs the same whatever the size.
- BEFORE: "Assalamualaikum korang, hari ni Miki nak share pasal harga nasi lemak yang ramai tak tahu."
- AFTER: L01 "Bungkus besar, bungkus kecil. Dua-dua RM3. Kenapa makcik tak rugi?" (11 words); frame-0 text "Besar
  RM3. Kecil RM3." over a macro of two bungkus side by side on a scale (illustrative prices).

=== cards/07_Script_Story/complication-beat-hidden-cost--vox-explainer-script.md
Topic: buy-now-pay-later for a RM1,200 phone (illustrative numbers, plain arithmetic).
- BEFORE: "BNPL memudahkan pengguna membeli barang."
- AFTER: L07 "Tapi lambat bayar sekali, kena caj lewat RM10." L08 "Lambat tiga bulan? RM30 hilang, phone sama je."
  Shot: three coins slide off the phone, one per month, each lighting in accent.

=== cards/07_Script_Story/contemplative-turn-ending--johnny-harris-writes.md
Topic: a tailor shop in Kota Bharu losing Raya orders to online baju (illustrative).
BEFORE L10–L11: "Jadi itulah sebab kedai jahit makin kurang. Follow untuk lagi."
AFTER L10: "Dulu, satu baju Raya maksudnya tiga kali datang kedai… sekarang, satu klik, RM89." (slow, held wide macro of tape measure on an empty cutting table). L11: "Korang pilih yang mana — muat sempurna, atau sampai esok?"

=== cards/07_Script_Story/curiosity-brief-first-glimpse--johnny-harris-writes.md
Topic: why a RM1 kuih stall in Bangi sells out by 9 a.m. (numbers illustrative).
Brief (excerpt): How many pieces a day? What does one cost to make? Who buys before 9? Why not make more? ...
First glimpse: "300 kuih gone before the office crowd even arrives — the stall wins by stopping." Script v1 drifted into
ingredient prices; v2 restores the hook: "Pukul 9 dah habis… dan makcik ni memang tak nak buat lebih."

=== cards/07_Script_Story/decide-whats-essential-for-this-viewer--explain-complex-things.md
Topic: "Kenapa kena bayar caj bila guna kad kat kedai kecil?" (card payments do carry merchant fees — true mechanism;
rate illustrative)
- BEFORE: lines on interchange, acquirer, scheme fees, MDR tiers, card network rules.
- AFTER: viewer's question "Siapa ambik duit tu?" Kept: "Setiap kali korang tap kad, bank ambik sikit dari kedai —
  contoh 1%. Jual RM50, kedai dapat RM49.50." Left out: interchange/acquirer split.

=== cards/07_Script_Story/effective-visual-hook-must-be-seen--fern-documentaries.md
Topic: why a pasar malam stall prices "3 for RM10".
- BEFORE: frame 0 = text "Kenapa 3 untuk RM10?" on a dark background.
- AFTER: visual hook = the stall's pile of keychains under one bulb; frame 0: macro, three keychains slide together on
  the tray as a hand-written "3/RM10" card tips into frame (no hands — the card tips by itself). Frame-0 text: "Satu
  RM4. Tiga RM10. Siapa untung?"

=== cards/07_Script_Story/escalating-explanation-one-throughline-concrete-scale--vox-explainer-script.md
Throughline: a RM3 nasi lemak's cost adds up from small parts (all numbers illustrative, plain arithmetic).
- BEFORE: "Kos bahan mentah, operasi dan overhead semua naik, jadi margin makin nipis."
- AFTER: L04 "Beras, santan, sambal: RM1.20." L05 "Telur separuh: 30 sen." L06 "Daun, kertas, getah: 20 sen."
  L07 "Gas dan sewa tapak: 50 sen." L08 "Tinggal 80 sen untung. Sebungkus."
  (1.20 + 0.30 + 0.20 + 0.50 = 2.20; RM3 − 2.20 = 0.80.)

=== cards/07_Script_Story/escalating-time-cost-triad--saas-launch-video.md
Topic: a kedai runcit owner who never records stock (illustrative).
- BEFORE: "Tak rekod stok ni banyak masalah, rugi masa dan duit."
- AFTER: "Sejam kira stok. Seminggu cari barang hilang. Sebulan rugi RM800. Padahal boleh settle lima minit."
  Shots: clock hand spins one turn → calendar flips 7 pages → coins stack to RM800 (accent) → phone screen shows a
  stock list, timer "5:00".

=== cards/07_Script_Story/evidence-first-timeline-reconstruction--lemmino-script-writing.md
Topic: one item's price across a sale season (EX46-type, using the user's own screenshots as the source).
- BEFORE: "Harga naik dulu sebelum sale, lepas tu turun."
- AFTER: "1 Nov: RM149." / "8 Nov: tiba-tiba RM299." / "11 Nov: 'sale' RM149." Each beat = the same tag macro, the
  date stamp ticking forward, the price changing on the date.

=== cards/07_Script_Story/familiar-story-first-then-zip-the-complex--explain-complex-things.md
Topic: why savings left untouched grow faster each year (compound growth — plain arithmetic, no product named).
- BEFORE: "Compounding bermaksud faedah dikira atas pokok dan faedah terkumpul."
- AFTER: L03 "Bayangkan pokok rambutan. Tahun ni berbuah, korang tanam biji dia." L04 "Tahun depan, ada dua pokok
  berbuah." L05 "Duit sama. RM1,000 dapat 5%, jadi RM1,050." L06 "Tahun depan, 5% dikira atas RM1,050: RM1,102.50."
  Shots: one rambutan tree → two trees; the coin stack in the same framing grows 1,000 → 1,050 → 1,102.50.

=== cards/07_Script_Story/foundational-context-before-the-puzzle--lemmino-script-writing.md
Topic: why "beli 2 percuma 1" can cost more than a plain discount (plain arithmetic, illustrative).
- BEFORE: L03 jumps straight to "Promo ni sebenarnya tak untung."
- AFTER: L03 "Satu botol RM9. Beli dua, dapat tiga: RM18 untuk tiga botol." L04 "Tu RM6 sebotol." L05 "Tapi kedai
  sebelah jual RM5.50 sebotol, tak payah beli tiga."

=== cards/07_Script_Story/grounded-resolution-no-forced-twist--lemmino-script-writing.md
Topic: the kedai makan with a queue that still closed (illustrative).
- BEFORE: "Rupanya owner dia lari dengan duit!" (unsupported twist)
- AFTER: L09 "Untung 30 sen sepinggan tak cukup bayar sewa RM4,000." L10 "Banyak kedai beratur panjang pun sama." L11
  "Korang sanggup bayar 50 sen lebih?"

=== cards/07_Script_Story/icon-dialogue-compression--johnny-harris-writes.md
Topic: a home baker in Johor Bahru joining a food delivery app (illustrative).
BEFORE: "Platform mengenakan komisen dan syarat yang ketat kepada peniaga."
AFTER: L06 (app notification on the phone): "Okay, kami hantar order. Tapi 30 % untuk kami, ya." L07: "Untuk kek RM50, kakak ni simpan RM35 je."

=== cards/07_Script_Story/in-media-res-or-paradox-cold-open--lemmino-script-writing.md
Topic: why a kedai makan with a long queue can still close down (plain arithmetic, illustrative).
- BEFORE: "Hari ni kita bincang kenapa kedai makan tutup."
- AFTER (paradox): frame-0 text "Beratur panjang. Tapi tutup kedai." L01 "Jual 300 pinggan sehari, tapi akaun dia
  merah." Frame 0: macro of a tray of order slips piling up while a shutter's shadow slides down over them.

=== cards/07_Script_Story/learn-the-product-and-name-two-must-haves--saas-launch-video.md
Topic: "Terima QR di gerai" (S16 how-to, a burger stall in Bangi).
- BEFORE: script drafted from a general idea of DuitNow QR; L05 names menu items from memory, which may not match the
  bank's merchant app at all.
- AFTER: Must-haves: (1) the real QR standee on the stall counter, (2) the exact taps in the merchant app. Flow walked:
  "<screen 1> → <screen 2> → <screen 3>", copied label for label from the user's screen recording (never typed from
  memory). L05 quotes those real button labels, and shot rows 9–11 rebuild those three screens.

=== cards/07_Script_Story/let-me-show-you-peer-voice--johnny-harris-writes.md
Topic: reading a supplier invoice for a laundromat in Melaka (numbers illustrative).
BEFORE: "Analisis invois menunjukkan kos tambahan memberi impak signifikan kepada margin."
AFTER: "Jom tengok invois sabun ni sama-sama. Nampak baris kecil ni? Caj hantar RM25, tiap minggu. Setahun, RM1,300."

=== cards/07_Script_Story/load-icons-with-motives--johnny-harris-writes.md
Topic: a small kedai runcit in Seremban vs a new hypermarket nearby (illustrative).
BEFORE: L05 "Persaingan dalam sektor runcit semakin sengit." — one shot of a shop shelf.
AFTER: Row 5: wide macro, a tiny wooden kedai sign at left, a huge glossy shopping trolley at the far right of the table. L05 "Kedai Pak Mat ni hidup dengan pelanggan taman je." (accent on the sign). L06 "Hypermarket tu nak semua pelanggan dalam 5 km." (accent on trolley). L07 "Dan dia makin dekat." — trolley slides 40 % closer over 2 s, eased.

=== cards/07_Script_Story/low-context-high-intelligence--johnny-harris-writes.md
Topic: why a hardware shop in Rawang gives 30-day credit to contractors (illustrative).
BEFORE: "Kedai ni bagi kredit 30 hari, so cash flow dia jadi ketat." (assumes "cash flow").
AFTER: "Kontraktor ambik simen RM5,000 hari ni, bayar bulan depan. Tapi kedai dah bayar supplier semalam. Selama 30 hari, RM5,000 tu duit kedai yang tersangkut."

=== cards/07_Script_Story/map-visual-per-line-rewrite-blind-lines--visual-analogies.md
Topic: "Kenapa harga sama, untung kedai lain lain" (kedai runcit, illustrative).
- BEFORE: `"Pengurusan kos yang efisien sangat penting." | ??? (graphic of efficiency)` — blind.
- AFTER: `"Satu kotak air mineral, beli RM 18, jual RM 24." | macro: a shrink-wrapped carton, two price tags flip in
  on "18" and "24"`; `"Kedai sebelah beli RM 15." | same carton, the 18 tag slides off, a 15 tag in accent orange`.

=== cards/07_Script_Story/one-metaphor-per-beat--visual-analogies.md
Topic: "Kenapa simpan duit kecemasan dalam akaun lain" (everyday money, illustrative).
- BEFORE: Mechanism beat — "Duit kecemasan tu macam payung" (umbrella), then "dia benteng banjir" (flood wall), then a
  safe opening. Three images, one idea.
- AFTER: Mechanism beat keeps one — a real tin coin bank (tabung) on a shelf: "Duit kecemasan duduk dalam tabung lain"
  → next setup the tabung from above with RM 3,000 counting up → next setup the main wallet empties but the tabung stays
  full (accent on the tabung). Metaphor note: `tabung (literal object)`.

=== cards/07_Script_Story/pay-off-the-visual-then-ask-the-deeper-why--fern-documentaries.md
Visual hook: a coffee cup at a kopitiam costing RM2.20 next to a café's RM14 latte (illustrative).
- BEFORE: L02 "Harga kopi memang lain-lain ikut kedai."
- AFTER: L02 "Biji kopi sama je. Jadi kenapa beza RM11.80?" — deeper question: "Apa sebenarnya korang bayar?"
  L04–L08 break the RM14 into rent, staff, milk, cup; L09 shows the coffee itself is ~RM1.

=== cards/07_Script_Story/plant-and-payoff--vox-explainer-script.md
Topic: why the "dari RM299" price can be fake (EX46).
- BEFORE: the tag just shows RM149; the price-history screenshot appears out of nowhere at L05.
- AFTER: frame 0: the tag's small print "harga asal" is in focus for ~0.8 s next to RM299 (plant). L05: the screenshot
  from before the sale shows the item at RM149 the whole time; cut back to the same tag macro, "harga asal" lights in
  accent (payoff).

=== cards/07_Script_Story/praise-inside-criticism--johnny-harris-writes.md
Topic: Buy Now Pay Later for a RM1,200 phone (illustrative).
BEFORE: "BNPL ni perangkap, jangan guna."
AFTER: "BNPL bagi korang bawa balik phone RM1,200 hari ni… tapi lambat sehari, caj lewat dah menunggu." Shot: phone box opens (good), then flip to the back showing a small red late-fee tag.

=== cards/07_Script_Story/promise-packaging-before-script--johnny-harris-writes.md
Topic: a kedai runcit in Shah Alam selling RM1 kuih from a supplier (numbers illustrative; plain arithmetic).
BEFORE: frame 0 "Tips untuk kedai runcit" → L01 "Hari ni kita cerita pasal kuih." (no promise; nothing to pay off)
AFTER: packagings tried — (a) "Kuih RM1. Untung berapa sen?" (b) "Habis 100 biji. Untung RM10?" (c) "Kenapa kedai jual kuih juga?".
Pick (b) (answerable by arithmetic). Frame 0: "Habis 100 biji. Untung RM10 je?" L02 reinforce: "Kuih tu RM1, tapi kedai
beli dari pembuat 90 sen sebiji." L09 pay off: "100 biji × 10 sen = RM10 sehari… tapi kuih tu bawa pelanggan beli air RM2."
L11: "Korang rasa berbaloi ke jual kuih untung 10 sen?"

=== cards/07_Script_Story/raise-stakes-with-a-near-miss-counterfactual--fern-documentaries.md
Topic: a stall owner whose QR payment went to a scammer's sticker (illustrative case).
- BEFORE: "Benda ni boleh jadi kat sesiapa."
- AFTER: "Dia rugi RM600. Kalau tak perasan seminggu lagi, RM4,000. Macam mana sticker tu boleh ada?"
  Shot: the RM600 counter rolls on to RM4,000 (accent), freezes, rolls back to RM600.

=== cards/07_Script_Story/reassurance-beat-before-the-end--saas-launch-video.md
- BEFORE: "Jadi guna cara ni, follow untuk tips lagi!"
- AFTER: "Kurang salah kira. Kurang stok hilang. Jimat RM300 sebulan." → end: "Korang still kira guna kepala?"
  (kedai runcit, illustrative)

=== cards/07_Script_Story/sentence-music-escalating-list--johnny-harris-writes.md
Topic: a car wash in Klang (illustrative).
BEFORE: "Kedai cuci kereta ni dah lama beroperasi dan ramai pelanggan."
AFTER caption: "Satu kedai cuci kereta. 12 tahun. 80 kereta sehari. Satu je pekerja."
Voice: "Satu kedai cuci kereta, dua belas tahun, lapan puluh kereta sehari… satu je pekerja."

=== cards/07_Script_Story/signpost-pivot-to-context--vox-explainer-script.md
Hook: "Bungkus besar, bungkus kecil. Dua-dua RM3."
- BEFORE: L02 "Jadi, harga nasi lemak ni sebenarnya macam ni…"
- AFTER: L02 "Nak faham, kena tengok dulu dapur makcik pukul 5 pagi." L03 puzzle: "Apa yang dia kira, korang tak
  nampak?" Camera pulls out of the bungkus, through the stall, into the kitchen.

=== cards/07_Script_Story/spoken-rhythm-mixed-lengths-read-aloud--vox-explainer-script.md
- BEFORE: "Harga asal yang dipaparkan oleh kedai mungkin telah dimanipulasi untuk mewujudkan persepsi penjimatan."
- AFTER: "Kedai tulis harga asal RM299. Padahal tak pernah jual RM299 pun. Reka je."

=== cards/07_Script_Story/stop-once-the-point-lands--analogies-technical-ideas.md
BEFORE: "E-wallet macam tabung ayam. Duit masuk, tak bertambah. Tabung tak bagi faedah. Sama macam e-wallet, tak ada untung."
AFTER: "E-wallet macam tabung ayam. Simpan setahun, RM500 tetap RM500." → next line returns to the topic: "ASB pula, RM500 boleh jadi RM520." (illustrative)

=== cards/07_Script_Story/systematic-elimination-of-myths--lemmino-script-writing.md
Topic: why a nasi lemak price went from RM2.50 to RM3 (illustrative numbers; the costs are the stall's own).
- BEFORE: "Ada banyak faktor kenapa harga naik."
- AFTER: L05 "Makcik tamak? Untung dia sama je, 80 sen." L06 "Sewa naik? Sewa tapak tak berubah." L07 "Yang naik:
  santan dan telur, 50 sen sebungkus." Labels "tamak" and "sewa" strike out; "santan + telur" lights in accent.

=== cards/07_Script_Story/teaser-ending-open-strand--abt-science-writing.md
Topic: QR at a gerai (illustrative).
BEFORE: "Jadi tu je cara nak terima QR. Follow untuk part dua!" (request to follow — banned)
AFTER: L10 "Sekarang duit masuk terus, kira sendiri." L11 (end text) "Tapi pelanggan warga emas… nak ke scan?"
— main problem (lost cash) solved; new doubt (older customers) left open for the viewer to take a side.

=== cards/07_Script_Story/telling-human-detail--johnny-harris-writes.md
Topic: a mamak in Petaling Jaya short of workers (illustrative).
BEFORE: "Restoran ni sedang menghadapi masalah kekurangan pekerja."
AFTER: "Pukul 2 pagi, 40 meja penuh… dan satu je orang yang buat teh tarik." Shot: macro of a single steel mug pouring, 40 order chits stacking on the spike behind (counter 1→40).

=== cards/07_Script_Story/theres-more-going-on-foreshadow--johnny-harris-writes.md
Topic: checking a used car's price at a dealer in Kajang (illustrative).
BEFORE L03: "Tunggu sampai habis untuk tip paling penting!"
AFTER L03: "Harga kat cermin RM38,000… tapi ada satu nombor lain kat geran yang dealer tak sebut." (macro of windscreen tag; the geran corner stays out of focus). Payoff L05: geran racks into focus, year circled.

=== cards/07_Script_Story/title-options-how-why-divergent--johnny-harris-writes.md
Topic: how to price nasi lemak at a stall in Kuantan (illustrative).
BEFORE: one option, "Tips harga nasi lemak".
AFTER: 1 "Kenapa nasi lemak RM3 boleh rugi?" 2 "Macam mana gerai kira harga sebungkus?" 3 "Laku 200 bungkus. Untung kosong?" 4 "Kenapa telur je makan separuh untung?" 5 "Macam mana nak tahu harga betul?" 6 "Jual habis, duit tak ada?" 7 "Kenapa RM3 tak cukup?". Frame 0 = 3 (contradiction, 6 words). Cover directions: A macro of the egg with "RM0.70?" ; B the receipt-total counter; C a phone calculator screen.

=== cards/07_Script_Story/two-column-script-coding--johnny-harris-writes.md
Topic: a phone repair kiosk in Low Yat pricing a screen swap (numbers illustrative).
BEFORE: script written alone; shot list made later, with L04 "Kos skrin RM180" getting a generic phone close-up.
AFTER: | L04 | "Skrin baru, kedai beli RM180." | macro, low angle on the cracked phone, top light | on "RM180": cracked glass lifts off, new panel slides in with a price tag; counter 0→180 | ☐ NEED: replacement panel GLB | cards: … |

=== cards/07_Script_Story/viewer-reaction-word-audit--johnny-harris-writes.md
Topic: why pasar malam traders pay "duit tapak" (illustrative).
BEFORE L02: "Peniaga pasar malam kena bayar macam-macam, kesian betul."
Groups: traders, shoppers, council staff. Charged detail: "RM15 satu malam untuk tapak". Traders: "betul, mahal"; shoppers: "oh, patutlah harga naik"; council: "itu yuran sah". Keep, neutral frame.
AFTER L02: "Setiap malam, peniaga ni bayar RM15 untuk tapak sebesar meja ni."

=== cards/07_Script_Story/visual-in-cover-why-in-caption--fern-documentaries.md
Topic: "dari RM299, sekarang RM149" (EX46).
- BEFORE: caption "Kenapa harga sale kadang-kadang tipu? Jom tengok!"
- AFTER: cover = macro of the red tag with RM299 struck through; caption "RM299 tu pernah wujud ke? 3 cara nak tahu"
  — the "how do they fake it" is promised, not asked.

=== cards/08_Edit_Pacing/animate-with-pauses-then-cut-them-out--apple-style-3d-motion.md
Topic: how a 3-step "beli 2 percuma 1" check works (count × price arithmetic; illustrative).
- BEFORE: tag turns, holds 1 s, slides, holds 1 s, rotates — the animatic drags behind the voice.
- AFTER: same three moves, holds cut; each move still ≥ 0.5 s, joins carried by a 3 % scale accent; the setup now fits
  "tiga barang, bayar dua" in 2.6 s.

=== cards/08_Edit_Pacing/beat-row-script-layout-vo-visual-super-duration--vox-explainer-script.md
BEFORE: `| 4 | Step satu… | receipt | screenshot appears | |`
AFTER: `| 4 | "Step satu. Sebelum sale start, screenshot dulu harga barang tu." (10 w) | phone face-up beside the tag, top-down |
on "screenshot" the phone screen fades up to a capture of the tag over 0.4 s | SUPER: "1. Screenshot harga" | 2.9 | beat-row |`

=== cards/08_Edit_Pacing/every-scene-earns-its-place--stone-parker-nyu.md
Topic: QR at a gerai (illustrative).
BEFORE: `| 7 | L04 "Step satu…" | slow orbit around the QR stand | — |` (point: none, just keeps the stand on screen)
AFTER: `| 7 | L04 "Step satu, daftar akaun merchant" | low grazing angle on the QR stand, rack focus to the code | the code
assembles square by square, last square lands on "merchant"; payoff: the stand becomes yours |`

=== cards/08_Edit_Pacing/frame-by-frame-polish-pass--five-steps-3d-animation.md
Preview of a how-to on splitting a RM60 dinner bill four ways (RM15 each, plain arithmetic):
- BEFORE: approved preview sent straight to the 60 fps final; S4's RM15 tags clip through the plate rim on two frames.
- AFTER: `S4 f233–234: tags clip plate rim → lift 3 mm; S8: receipt static 3 s → add a slow curl settle; S10: remove stray dust card` → final render.

=== cards/08_Edit_Pacing/leading-object-transition-face-into-ui--saas-launch-video.md
EX45-style "Terima QR di gerai".
- BEFORE: stall counter macro → white flash → app screen.
- AFTER: camera pushes into the printed QR standee on the counter; its white card fills the frame, its rounded corners
  become the phone screen's edge, and the QR code itself becomes the QR shown on the merchant app's screen (join: standee card → app
  screen).

=== cards/08_Edit_Pacing/look-at-this-eye-direction--johnny-harris-writes.md
Topic: checking the receipt at the counter (EX46 step 2).
BEFORE: L06 "Tengok resit betul-betul." over a static receipt; the eye wanders.
AFTER row: macro receipt, top light | on "tengok": accent ring draws round the shelf-price line in 12 frames; on "betul-betul" camera pushes 15 % in, eased over 1 s.

=== cards/08_Edit_Pacing/shame-cut-radio-edit--johnny-harris-writes.md
Topic: 3 steps to read a payslip for a first job in KL (numbers illustrative).
BEFORE: went straight to a 3D preview; at 74 s, step 2 ran 14 s and the user rejected the pace after a 3-hour build.
AFTER: shame cut in 20 min shows step 2 is 14 s; L06 merged into L05, two setups cut; runtime 61 s; then the preview.

=== cards/08_Edit_Pacing/stepped-blocking-key-states-with-camera--five-steps-3d-animation.md
How-to: setting a price at a burger stall (cost RM3.20 + profit RM2.30 = price RM5.50, plain arithmetic, illustrative):
- BEFORE: first pass fully animated setup 1 (flight, easing, bloom) before setups 2–12 existed; setup 6 then needed a new idea and the flight was redone.
- AFTER: `| 1–12 | all lines | each setup blocked as a held end pose: S3 "patty + bun = RM3.20" grey box, S6 "tambah RM2.30" stacked coin boxes, S9 "RM5.50" tag | held states on their words; no easing yet | stepped-blocking |` → animatic review → curves on.

=== cards/08_Edit_Pacing/storyboard-one-frame-per-beat-as-foundation--saas-launch-video.md
Row BEFORE: `| 3 | "Tiga step je" | phone on table | number 3 appears | |`
Row AFTER: `| 3 | "Tiga step je" | macro, low grazing on a receipt roll | on "tiga" three tear-lines print across the
roll, each lighting in the accent red; why: the three steps are three cuts of the one receipt we follow | storyboard-one-frame-per-beat |`

=== cards/08_Edit_Pacing/tease-reveal-on-the-word--4-steps-powerful-visuals.md
Line: "Harga RM 9.90, tapi kos sebenar cuma RM 4." (a pasar malam stall; illustrative numbers).
- BEFORE: the price tag and the cost slip both visible from the first frame of the setup.
- AFTER: `| 3 | "kos sebenar cuma RM 4" | macro on the tag, 85 mm, cost slip behind in deep blur | rack focus to the slip on "kos", 0.5 s eased; RM 4 lights in accent on "RM 4" | tease-reveal |`.

=== cards/08_Edit_Pacing/text-appears-at-motion-peak-nested-pushes--apple-style-3d-motion.md
Topic: checking a "50 % off" claim (price arithmetic only; illustrative numbers).
- BEFORE: one static macro of the tag; "RM100", "RM50", "jimat RM50" fade in one after another on a still frame.
- AFTER: tag under the top light; push 1 peaks on "seratus" → "RM100" appears; push 2 (with an 8° turn) peaks on
  "lima puluh" → "RM50"; on "jimat" the key light slides across and "jimat RM50" opens in the accent colour.

=== cards/08_Edit_Pacing/transition-purpose-test--video-transitions-tips.md
S16 how-to, a nasi lemak stall in Bangsar deciding whether a "50 % off" bundle is real (illustrative):
- BEFORE: `| 5 | "Step 2: tengok harga asal" | whip pan to the menu board | glitch on "harga asal" |`
- AFTER: `| 5 | "Step 2: tengok harga asal" | tr: "out" — pull back from the RM8 tag to reveal the menu board's old RM6 price (job: reveals new info) | RM6 lights in accent on "harga asal" | transition-purpose-test |`
- Match cut kept: `| 9 | "Seminggu lepas…" | same top-down on the bungkus, now three bungkus (job: time passes) | counter 1 → 3 on "seminggu" |`

=== cards/08_Edit_Pacing/transition-scarcity-earn-its-spot--video-transitions-tips.md
EX-style how-to, a kedai gunting rambut in Ipoh pricing a RM15 haircut (illustrative):
- BEFORE: 18 setups, 11 joins with a push-through or morph; the RM15 → RM12 reveal is just another push-through and is lost.
- AFTER: `Featured joins: 4 / 18` — hook (push through the price board into the scissors), L04 morph (scissors → coin stack), L08 pull back to reveal the RM12 rival board ★, loop to frame 0; all others plain flights cut on the word.

=== cards/08_Edit_Pacing/write-narration-against-the-visual-cue--lemmino-script-writing.md
- BEFORE: L06 "Resit ni ada nama kedai, tarikh, senarai barang, dan jumlah RM56.40 di bawah sekali."
- AFTER: L06 "Tengok baris paling bawah." … (0.8 s hold on the receipt, RM56.40 lights in accent) L07 "Tu je yang
  penting."

=== cards/09_UI_Motion/animate-panel-size-not-scale--smooth-saas-creatorly.md
Topic: a monthly bill card (RM45 + RM30 + RM25 = RM100, illustrative).
- BEFORE: the bill card scales to 0 — corners and text squash.
- AFTER: on "jumlah", the three rows slide out and the card's height closes to a slim pill reading "RM100", corners
  unchanged.

=== cards/09_UI_Motion/button-press-as-state-change--apple-style-ui-face-id.md
Topic: confirming a RM25 online top-up (illustrative).
- BEFORE: button turns grey, next screen cuts in.
- AFTER: on "tekan", "Top up RM25" dips 6 %, its label blurs away, the pill squares into a card that turns green; a
  check draws in as "Berjaya" rises.

=== cards/09_UI_Motion/colour-field-grow-with-recoloured-duplicates--smooth-saas-creatorly.md
Topic: a gerai accepting DuitNow QR (illustrative amount).
- BEFORE: hard cut from a white "Scan" card to a green "Paid RM12.50" card.
- AFTER: on "bayar", the green of the pay button grows out across the card in 0.8 s; under its edge "Scan" becomes
  "Paid RM12.50" in white.

=== cards/09_UI_Motion/contain-glow-inside-its-shape--animate-light-control-viewer.md
Topic: a phone notification card "Baki: RM230" (illustrative).
- BEFORE: the card outline draws on and its glow spills across the screen.
- AFTER: the outline draws on, the glow sweeps inside the card only, ending behind "RM230".

=== cards/09_UI_Motion/container-matte-reveal-icon-and-list--smooth-saas-creatorly.md
Topic: finding a kedai's reviews before buying (generic app UI).
- BEFORE: icon and result rows fade in over the search bar; rows briefly overlap the bar.
- AFTER: the magnifier rises from inside the bar on "cari"; three result rows slide down inside their rounded card; on
  the next line the rows slide out left and the card closes to the centre.

=== cards/09_UI_Motion/cursor-press-dip-and-ride-along--smooth-saas-creatorly.md
Topic: turning on a bank app's transaction alert (generic app; mechanism = a settings toggle).
- BEFORE: the toggle just flips green.
- AFTER: the tap ring arrives on "tekan", dips 10 %, the toggle slides to on; the ring follows the toggle knob, then fades
  out up-right as the next screen rises.

=== cards/09_UI_Motion/depth-controller-lifts-ui-layers--smooth-ui-animation.md
Topic: a bank app home screen — "Baki", "Bil", "Simpanan" tiles (generic app, illustrative).
- BEFORE: all tiles flat; a red outline marks "Bil".
- AFTER: on "bil bulan ni", the "Bil RM320" tile lifts toward camera, its shadow growing softer and longer; neighbours
  rise a little less; on the next line it settles back.

=== cards/09_UI_Motion/edge-light-sweep-around-ui-panel--smooth-ui-animation.md
Topic: a phone receiving a DuitNow transfer of RM150 (illustrative amount).
- BEFORE: the notification just appears.
- AFTER: as "RM150 masuk" lands, a thin white light runs once around the phone's edge (1.2 s) and fades; the amount
  is the only accent.

=== cards/09_UI_Motion/four-point-sparkle-accents--smooth-saas-creatorly.md
Topic: savings from bringing your own container to a kopitiam (illustrative: RM0.20 × 20 days = RM4).
- BEFORE: sparkles around every UI card in the video.
- AFTER: one cluster of three white sparkles appears only when "RM4 jimat" lands, fades out with the card.

=== cards/09_UI_Motion/glassmorphism-panel-over-busy-ground--apple-style-animation-guide.md
Topic: the cost of a RM5 teh tarik habit — RM5 × 22 work days = RM110 a month (arithmetic, illustrative price).
- BEFORE: an opaque white card covers half the macro shot of the glass.
- AFTER: a glass card sits in the lower third over the blurred kopitiam background; "RM110 sebulan" reads clearly while
  the cup stays sharp above.

=== cards/09_UI_Motion/gradient-sweep-across-text--animate-text-gn.md
BEFORE: `| 9 | "untung RM1,200 sebulan" | top-down on the ledger | "RM1,200" holds 3 s, static | — |`
AFTER: `| 9 | "untung RM1,200 sebulan" | top-down on the ledger | "RM1,200" (accent) fades in 0.4 s, then one 1.5 s eased light sweep accent → tint → accent across it while it holds | gradient-sweep-across-text--animate-text-gn |`

=== cards/09_UI_Motion/hold-on-screen-text-through-the-voice-line--saas-launch-video.md
Frame-0 text "Diskaun 50%… dari harga apa?" (EX46 style).
- BEFORE: each word fades 0.6 s after it lands; when the voice lingers on "dari harga apa", "Diskaun 50%" is gone.
- AFTER: words land on their spoken frames, all hold until "apa" + 0.5 s, then the group slides off as the tag turns.

=== cards/09_UI_Motion/line-icon-draw-on-round-caps--apple-style-ui-face-id.md
Topic: scanning a receipt into an expense app (generic app).
- BEFORE: a static check icon pops in.
- AFTER: four round-capped brackets close in on the receipt on "scan", then a green check draws on in 0.5 s on "siap".

=== cards/09_UI_Motion/object-to-loader-returns-wearing-the-ui--saas-launch-video.md
Step: "Snap resit, app rekod belanja sendiri" (receipt-scanning expense tracker; amounts illustrative).
- BEFORE: receipt → cut to a generic spinning circle → cut to a table of numbers.
- AFTER: macro receipt on a counter → a thin accent scan line runs top to bottom of the receipt (loader) → the same
  receipt returns with leader-line labels on three items and "Jumlah: RM18.50" in accent, on the word "belanja" (the three item prices add up to RM18.50).

=== cards/09_UI_Motion/one-control-slide-fade-text-reveal--animate-text-gn.md
BEFORE: `| 3 | "RM30 seminggu" | macro on the receipt | "RM30" pops on | — |`
AFTER: `| 3 | "RM30 seminggu" | macro on the receipt | on "RM30" the label rises 40 px into place over 0.4 s, fully opaque by 60 % of the move; exits downward with the next setup | one-control-slide-fade-text-reveal--animate-text-gn |`

=== cards/09_UI_Motion/partial-staging-click-to-fix-payoff--saas-launch-video.md
EX46 step 2 "tengok resit betul-betul".
- BEFORE: full receipt and full shelf in one wide frame, a red X then a green tick.
- AFTER: crop to two receipt lines; "RM12.90" outlined in accent next to the shelf tag "RM9.90" → a panel slides in:
  "Beza RM3" → the panel's "Bayar harga murah" button presses → cut on "lagi murah": receipt line now reads RM9.90,
  status "Harga betul".

=== cards/09_UI_Motion/progress-ring-draw-with-counter-spin--smooth-ui-animation.md
Topic: the 50/30/20 budget split on RM3,000 salary → RM900 wants (arithmetic; illustrative salary).
- BEFORE: a static pie with "30 %".
- AFTER: on "tiga puluh peratus", the ring draws to 30 % while unwinding from −200°, and "RM900" counts up in the centre.

=== cards/09_UI_Motion/ring-tumble-in-depth-with-speed-streak--apple-style-ui-face-id.md
Topic: "pembayaran sedang diproses" after scanning a QR at a pasar malam stall (illustrative RM6).
- BEFORE: a spinning loader icon for 2 s.
- AFTER: the QR frame's circle lifts into depth and tumbles once on X/Y in opposite directions (1.2 s), settles flat, and
  a check draws on as "RM6 diterima" rises.

=== cards/09_UI_Motion/text-exists-only-where-light-falls--animate-light-control-viewer.md
Topic: "kos sebenar" of a RM3.50 nasi lemak (rice + sambal + egg costs, illustrative arithmetic).
- BEFORE: "RM3.50" fades in over a lit table.
- AFTER: dark table; the top light slides in on "harga jual" and "RM3.50" appears engraved in its pool; the light dims,
  and as it returns on "kos" the same spot now reads "RM2.10".

=== cards/09_UI_Motion/variable-font-weight-tracking-open--apple-style-3d-motion.md
Topic: a kedai runcit in Shah Alam losing RM2,000 a month to expired stock (illustrative).
- BEFORE: "RM2,000" fades in at full weight 0.2 s after the word — reads like a slide.
- AFTER: on "dua ribu" the number arrives thin and widely spaced, then thickens and tightens over 0.5 s while the camera
  is already pushing in; the accent red lands only on "RM2,000" as it reaches full weight.

=== cards/09_UI_Motion/word-based-ramp-text-reveal--smooth-saas-creatorly.md
Line (S16 step, BM casual): "Step dua: tengok harga sebelum diskaun".
- BEFORE: whole sentence fades in at once, 0.2 s.
- AFTER: words rise 75 px and unblur one after another from "Step" to "diskaun" in ~1 s; on the next line the whole
  sentence lifts out upward while "Step tiga" rises in.

=== cards/09_UI_Motion/xy-size-sliders-offset-shape-morph--apple-style-ui-face-id.md
Topic: paying RM8.40 at a mamak via e-wallet QR (illustrative amount; QR payment confirmation is real).
- BEFORE: a "Bayar" button fades in, then turns green.
- AFTER: a dot appears, stretches into the "Bayar" pill (height follows 3 f later); on "tekan" it squares off, corners
  sharpen and fill turns green with its shadow, as "RM8.40" settles inside.
