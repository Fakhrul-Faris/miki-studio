# EX46 — Sale ni betul ke tipu? (S16 How to, Bahasa Melayu)

Status: **FINAL rendered 2026-11-17: `export/EX46-Final.mp4`** (57.0 s, 1080×1920, 60 fps, −14.2 LUFS, peak −1.5 dBFS; `build/final46.sh`), every chunk BLACK/FLICKER clean. Cover `export/EX46-cover.png`. Pushed to Telegram (/ex46) + dashboard synced 17 Nov. Calendar Thu 26 Nov 12:30. Critic preview v3: gates ≥ 7, mean 7.6/8 (cap). Voice: `--plain` (user enhances outside).
`audio/raw/`, `build/voice_fix.py 1.25` (EX45 v3 chain) → `audio/L01..L11.wav`, `build/words.py` (faster-whisper, venv
`tools/.venv-whisper`) → `audio/words.json`, `build/timeline.py` → `audio/vo.wav` + `build/tl.json` (56.7 s). Line starts:
L01 0.25 · L02 6.55 · L03 13.44 · L04 17.40 · L05 21.67 · L06 26.63 · L07 30.44 · L08 36.45 · L09 42.06 · L10 46.24 · L11 48.45.
Voice notes: L01 heard as "Korang ada nampak tak" (captions follow the take); Whisper heard the L01 number as "290" — check by ear.
User's answers (RECIPE § 0.1): topic = check if a sale is real · angle = the "was" price never existed · EX38 default
length (~55 s, 3.4 w/s) · voice: the user (ElevenLabs v3) · look: Style D merged with the "Video from Facebook.mp4"
reference (gas-pump / engine explainer): macro hero ↔ wide establishing cycle, cutaway x-ray reveals, literal particle FX,
hard cut on the word, one key word per caption line emphasised. Captions stay EX15 capBlock.

Frame-0 text: **RM299 tu? Tak pernah wujud pun.** · End text: **Diskaun dari harga apa sebenarnya?** · Loop: back to the
frame-0 tag.

## Script v1 (11 lines, ~175 words)

| L | Caption (on screen) |
|---|---|
| L01 | Korang pernah nampak tak, "dari RM299, sekarang RM149"? Rasa macam untung gila kan? |
| L02 | Tapi kadang-kadang, harga RM299 tu tak pernah wujud pun. Kedai reka je, bagi nampak murah. |
| L03 | Kalau korang nak tahu sale tu betul ke tipu, ni caranya. Tiga step je. |
| L04 | Step satu. Sebelum sale start, screenshot dulu harga barang tu. Simpan dalam phone. |
| L05 | Bila sale dah start, compare. Kalau harga "asal" tiba-tiba naik, haa, dah tau dah kan. |
| L06 | Step dua. Kat kaunter, tengok resit betul-betul. Jangan terus masuk beg. |
| L07 | Kalau harga kat resit lain dengan tag kat rak, korang bayar yang lagi murah. Ni undang-undang, bukan ihsan kedai. |
| L08 | Step tiga. Kalau still rasa kena tipu, report je kat KPDN. Ambik gambar tag, simpan resit. |
| L09 | Sebab syarikat yang main-main dengan harga boleh kena denda sampai RM100,000. |
| L10 | Jadi lain kali nampak "diskaun 50%"… |
| L11 | Tanya diri sendiri: 50%… dari harga apa? |

## Voice text (Eleven v3, paste as is)

| L | Voice |
|---|---|
| L01 | [curious] Korang pernah nampak tak… "dari dua ratus sembilan puluh sembilan, sekarang seratus empat puluh sembilan"? [excited] Rasa macam untung gila kan? |
| L02 | [conspiratorial] Tapi kadang-kadang… harga dua ratus sembilan puluh sembilan tu tak pernah wujud pun. Kedai reka je, bagi nampak murah. |
| L03 | Kalau korang nak tahu sale tu betul ke tipu… ni caranya. [confident] Tiga step je. |
| L04 | Step satu. Sebelum sale start, screenshot dulu harga barang tu. Simpan dalam phone. |
| L05 | Bila sale dah start, compare. Kalau harga asal tiba-tiba naik… [knowing] haa, dah tau dah kan. |
| L06 | Step dua. Kat kaunter, tengok resit betul-betul. Jangan terus masuk beg. |
| L07 | Kalau harga kat resit lain dengan tag kat rak… korang bayar yang lagi murah. [firm] Ni undang-undang — bukan ihsan kedai. |
| L08 | Step tiga. Kalau still rasa kena tipu, report je kat K P D N. Ambik gambar tag, simpan resit. |
| L09 | [serious] Sebab syarikat yang main-main dengan harga… boleh kena denda sampai seratus ribu ringgit. |
| L10 | Jadi lain kali nampak "diskaun lima puluh peratus"… |
| L11 | [thoughtful] Tanya diri sendiri… lima puluh peratus… [wry] dari harga apa? |

Caption: RM299 tu pernah wujud ke? 3 cara nak tahu sale tu betul ke tipu 🧾
Hashtags: #sale #diskaun #KPDN #tipsjimat #howto

## Claim ledger

| # | Claim | Kind | Status | Source | On screen as |
|---|---|---|---|---|---|
| 1 | A "was" price must be a real former selling price; an invented one is misleading | cause | verified (secondary) | Consumer Protection Act 1999 s12(3) via zenweb.my KPDN rules guide; malaymail 3 Nov 2026 cites s12(3) | no section number on screen |
| 2 | Shelf vs charged price differ → the lower price applies | quote | verified | Deputy Minister Fuziah Salleh, 29 Oct 2026 (newswav), citing Price Control and Anti-Profiteering (Price Marking for Goods and Charges for Services) Order 2020 | "Perintah Tanda Harga 2020" small type |
| 3 | Complaints go to KPDN; keep tag photo + receipt | sequence | verified | newswav 29 Oct 2026 (keep receipts as evidence for a KPDN complaint) | KPDN name, no logo copy |
| 4 | Company fine up to RM100,000 for misleading price | number | verified | Act 599 s145 via malaymail 3 Nov 2026 (individual RM50,000 / 3 yrs; company RM100,000) | "syarikat" said; "sehingga RM100,000" |
| 5 | RM299 → RM149, the shop, the product | illustration | conceptual | — | "ilustrasi" small type |

Not claimed: that any named shop fakes prices · that price-history apps exist for every store · a % of sales that are fake · the RM250,000 figure (repeat-offence, not read at source).
⚠ before posting: re-read Act 599 s145 on the AGC site if it loads.

## Shot list v2 (2026-11-17, approved structure: 5 worlds, state change on the word)

Measured from the full reference (2 fps contact sheets, `Video from Facebook.mp4`): it holds one world 8–20 s and changes
something on almost every word (~1 s): camera reframe, object state, a leader-line label, a thin-line chart. Worlds change
by pushing through an object, with a blur pass for bigger jumps. Wide shots only establish, then the camera goes back in.
Tiny source notes bottom-left. Loop: opens and ends on the same tag. No hands (rule): presses show as the object reacting.
Captions: EX15 capBlock, building word by word (key word in white bold); not the reference's blue box.
Hero: one red sale tag (white string loop, "RM299" struck through, big "RM149"). Red = the only accent; one red flash (W3).

| t (s) | Word | World · camera | Event (on the word) | Label / note |
|---|---|---|---|---|
| **W1 Shelf + tag** | | dark aisle, soft bokeh, tag on a grey hook | | |
| 0.0 | (frame 0) | macro on the tag, already pushing | strike line drawing across RM299 | |
| 1.9 | RM299 | rack focus to "RM299" | number glints | `HARGA ASAL` leader line |
| 3.2 | RM149 | pull back, whole tag | RM149 digits roll down to place | |
| 5.4 | untung | tag swings once on its string | | |
| 8.5 | RM299 | tag turns side-on, cutaway (hatched cut face) | tag splits into two layers | `CETAKAN` / `KAD` labels |
| 10.2 | wujud | inside the layers | behind RM299: blank card | `TIADA REKOD` label |
| 11.7 | reka | macro from above | a stamp presses "RM299", ink particles puff | |
| 12.9 | murah | pull up: a stack of identical tags | all stamped the same | "ilustrasi" note |
| **W2 Phone** | | push through the tag's string hole → blur → phone screen | | |
| 13.4 | Kalau | through the hole | blur pass | |
| 16.3 | Tiga | phone home screen top-down | three numbered slots 1·2·3 light in turn | |
| 17.4 | Step satu | slot 1 fills the frame | | |
| 19.2 | screenshot | product page at RM199 (normal price) | shutter flash, screen shrinks to a thumbnail | date `10 Nov` under it |
| 20.7 | Simpan | thumbnail drops into a gallery grid | | |
| 22.7 | compare | split screen: old screenshot · sale page | dates `10 Nov` · `11 Nov` | |
| 23.6 | harga asal | thin-line price chart draws above the split | flat line at RM199 | `HARGA` axis label |
| 24.6 | naik | chart spikes to RM299 the day before the sale, then "sale" to RM149 | spike marked | `NAIK SEHARI SEBELUM SALE` |
| 25.5 | tau | push into the spike | the RM149 "discount" sits above the old RM199 → only RM50 off | "ilustrasi" note |
| **W3 Counter** | | blur pass → wide: checkout counter, conveyor, printer | | |
| 26.6 | Step dua | slot 2 flash, then the wide counter (short) | | |
| 27.6 | kaunter | push in to the thermal printer | printer shell goes see-through | `PENCETAK RESIT` |
| 28.3 | resit | inside: receipt feeding out | thermal text appears line by line | |
| 29.9 | beg | receipt pulls up toward a grey bag, stops | | |
| 31.3 | lain | split: receipt line · shelf tag | RM169 vs RM149 highlight | `RESIT` / `TAG RAK` |
| 33.5 | murah | macro: RM169 struck, RM149 stamps in | the one red flash + dust | |
| 34.4 | undang-undang | pull back, top light | card on the counter | `Perintah Tanda Harga 2020` note |
| 36.5 | Step tiga | slot 3 flash | | |
| 38.8 | report | phone camera over the tag | photo snaps | |
| 40.4 | gambar | tag photo + receipt slide into a grey folder | | `KPDN` label |
| **W4 Fine** | | push into the folder → blur → counter display | | |
| 42.3 | syarikat | macro on a mechanical counter | digits start rolling | |
| 44.8 | RM100,000 | lands on 100,000 | particles settle | `Akta Perlindungan Pengguna 1999` note |
| **W5 Wall of tags** | | blur pass → wide | | |
| 46.2 | Jadi | wide: a wall of red sale tags in fog | | |
| 47.1 | diskaun 50% | every tag swings once | "50%" on every tag | |
| 49.7 | 50% | slow push toward one tag | others go soft | |
| 50.8 | dari | close on the hero tag | | |
| 51.9 | apa | frame-0 framing: struck RM299 | end text, hold → loop | |

Fix in v2 vs the plan above: the "compare" spike uses RM199 normal → RM299 the day before → RM149 sale (a real-world
pattern; numbers illustrative). The receipt mismatch stays RM169 vs RM149 (illustrative).

## Shot list v1 (superseded)
 (reference cycle: macro → cutaway → wide, cut on the bold word)

Hero object: **one red sale tag** (card, string loop, printed "RM299" struck through, "RM149" big). Accent: sale red
only. Everything else grey/silver on the dark studio. ~24 setups in ~55 s.

| # | L | On word | Setup (camera) | Event inside | Reference beat |
|---|---|---|---|---|---|
| 1 | L01 | (frame 0) | macro on the tag, slow push, already moving | "RM299" strike line draws on | pump display macro (0:00) |
| 2 | L01 | **untung** | wide: tag hanging on a shelf hook, aisle in fog | "RM149" digits roll down | car at pump wide (0:17) |
| 3 | L02 | **wujud** | cutaway: tag splits into two paper layers | under "RM299" the back layer is blank | engine cutaway reveal (0:26) |
| 4 | L02 | **reka** | macro: a stamp presses "RM299" onto the tag | ink particles puff off | fuel spray FX (0:00) |
| 5 | L02 | **murah** | tilt-down: the tag on a stack of identical tags | all stamped the same day | — |
| 6 | L03 | **tipu** | push into the tag hole (string loop) | black, cut through | lens dive transition |
| 7 | L03 | **Tiga** | flat top-down: three numbered slots | 1 · 2 · 3 light in turn | — |
| 8 | L04 | **Step satu** | phone macro, shutter flash | screenshot of the product page "RM149" | — |
| 9 | L04 | **Simpan** | phone tilts back, wide | screenshot drops into a gallery grid | — |
| 10 | L05 | **compare** | split: old screenshot vs new sale page | dates under each | x-ray side by side |
| 11 | L05 | **naik** | macro on the "was" price | number climbs RM149 → RM299 in the new page | gauge/counter beat |
| 12 | L05 | **tau** | pull back, both screens dim, red stays | — | — |
| 13 | L06 | **Step dua** | wide: checkout counter, conveyor | item slides in | car at pump |
| 14 | L06 | **resit** | macro: thermal receipt prints | paper curls out of the printer | pump display macro |
| 15 | L06 | **beg** | receipt almost drops into a bag, freezes | — | — |
| 16 | L07 | **lain** | cutaway: tag and receipt side by side, x-ray line | RM149 vs RM169 highlight | engine cutaway |
| 17 | L07 | **murah** | macro: RM169 crossed, RM149 stamps | dust particles off the stamp | combustion flash (red only) |
| 18 | L07 | **undang-undang** | wide, top light: "Perintah Tanda Harga 2020" card on the counter | — | — |
| 19 | L08 | **Step tiga** | phone, camera app over the tag | photo snaps | — |
| 20 | L08 | **resit** | receipt + tag photo stacked into a folder | "KPDN" label on the folder | — |
| 21 | L09 | **RM100,000** | macro on a counter: digits roll up to 100,000 | particles settle | gauge beat |
| 22 | L10 | **50%** | wide: a wall of red sale tags in fog | every tag swings once | car-at-night wide |
| 23 | L11 | **dari** | push in to one tag on the wall | — | — |
| 24 | L11 | **apa** | macro on the struck-out "RM299" = frame 1 framing | loop | loop back |

All screens (phone, product page) are illustrations: small "ilustrasi" on frame. No real shop logos or names.

## Board (2026-11-17)

Build: `build/film46.tsx` (head46 + film46.part + cammap; `assemble.sh`), textures `build/tex46.py`, board sheets
`build/sheet.py`, pairs `build/pairs.py` (reference frames `build/media/_ref/`). Sheets in `stills/board_v0..v7.jpg`,
pairs `stills/pairs_v3..v7_*.jpg`. 0 clipping lines.
Critic (fresh agent, X1 rubric), still-only mean by round: 6.1 → 6.7 → 7.2 → 7.4 → 7.6 (bar 8; 5-round board cap reached).
Fixed along the way: W3 relight + printer lid + bag, labels off the tag, chart 11 rebuilt, step tags in the aisle (8),
step bar only on step beats, one red RM100,000 on the fine document (20), hero tag + focus pull (22).
Carry into the animatic: 21 wall still reads as floating tags (show pegboard holes/edge, tighter grid, hero not overlapping);
22 hero rod lands on the tag behind; 21–22 tags behind the caption band; check 7 vs 19 don't feel repeated; decide whether
the red caption key word on 1/23 stays; check the stamp hit at 16 within ±2 frames.

## Animatic (2026-11-17)
`out/animatic.mp4` (15 fps draft, 56.7 s, yellow S·time tag), mix `audio/mix.wav` (`build/mix.sh`: voice + EX45 bed ducked +
stamp on "reka" / "murah", shutter tick "screenshot", tick "naik", snap "gambar" + sound C; −14.2 LUFS). Camera map
`stills/camera_map.jpg`: pushes kept only on impact beats (1, 16, 22, 23); rack focus 2, orbits 5/13/19, crane-downs 6/14/20,
tracks 4/8/21, top-down rotation 15, dutch 18. Fixed: 21 pegboard with holes, tighter grid; 22 camera above the hero
(rod runs back to the board); the hero tag stays in 8 until the step tags swing in. python3 → 3.14 symlink (yt-dlp keeps 3.15).

## Products (2026-11-17, user: "opt the box with real random product")
Cardboard boxes replaced with real scanned products, greyed to 20% colour (`build/gso_grey.py`, Blender builds only):
hero = electric pressure cooker (shelf, conveyor, phone page photo); shelves = a seeded random mix by real width.
Renamed on screen: "Periuk tekanan elektrik 6L" (phone), "Periuk tekanan 6L" (receipt). Clock and milk frother dropped
(brand printed on the face/body). The fake-discount story never names a brand; product + prices stay "ilustrasi".
Credits (CC-BY 4.0, Google Research, Google Scanned Objects, via huggingface.co/datasets/codepawl/scanned-objects-glb):
TriStar Power Pressure Cooker XL · Threshold Porcelain Teapot, Pitcher, Serving Bowl · Cole Hardware Mug Classic Blue,
Deep Bowl Good Earth · Room Essentials Mug, Dish Drainer · Chefmate 8" Frypan · Bradshaw 7 Qt Bowl · Ecoforms Pot Nova ·
Black & Decker 4-Slice Toaster. Also CC-BY 3.0: Rubber Stamp (Poly by Google). Put these in the post caption credits.

## Preview (2026-11-17)
`build/preview46.sh` → `out/preview_v1..v3.mp4`. Critic (video) by round: 6.9 → 7.3 → 7.6 (bar 8; gates 1–3, 11 all ≥ 7 in v3).
Fixed: fine split into 2 setups with RM100,000 stamping on its word; strike moving at frame 0; transition blur moved off
"Ambik", "murah", "Sebab", "Jadi"; captions laid out once (no re-centring); wall swing + clear of captions; folder push;
line tails +0.18 s (L11 "apa?" kept, film 56.9 s); RM100,000 fully in frame.
Open (critic, for the final): exit blur off the document at 45.5–46 s; the printer is a built model (no library thermal
printer); a stranger frame 0 would lift the hook. No brand in the story by design (no logo-first). Listen to vo.wav once.

## Post (Thu 26 Nov 12:30 · S16 How to · Bahasa Melayu)

**Caption:**
```
RM299 tu? Kadang-kadang tak pernah wujud pun. 3 cara nak tahu sale tu betul ke tipu 🧾
1 Screenshot harga barang tu sebelum sale start
2 Kat kaunter, semak resit dengan tag kat rak. Kalau lain, korang bayar harga yang lebih murah
3 Still rasa kena tipu? Report kat KPDN, simpan gambar tag + resit
Diskaun 50%… dari harga apa sebenarnya? 👇

Sumber: Akta Perlindungan Pengguna 1999 s12(3) (harga mengelirukan) & s145 (denda syarikat sehingga RM100,000); Perintah Kawalan Harga dan Antipencatutan (Penandaan Harga) 2020, harga lebih rendah terpakai (Timbalan Menteri KPDN, 29 Okt 2026). Kedai, produk dan harga ialah ilustrasi.
Model 3D: Google Scanned Objects (Google Research, CC BY 4.0); Rubber Stamp oleh Poly by Google (CC BY 3.0).

#diskaun #sale #KPDN #tipsjimat #caranya
```

**Pinned comment:**
```
Pernah jumpa harga "asal" yang naik sehari sebelum sale? Kedai online ke kedai fizikal? 👇
```
