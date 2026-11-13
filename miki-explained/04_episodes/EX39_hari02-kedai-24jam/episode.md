# EX39 — Hari 2/30: KK Mart vs 7-Eleven vs FamilyMart

Status: **FINAL rendered 2026-11-13: `export/EX39-Final.mp4`** (41.35 s, 1080×1920, 60 fps, −14.1 LUFS; `build/final39.sh`, chunks 900/1200 re-rendered after a black-box glitch at 19.2–19.6 s and the field pile re-lit neutral). Preview v1 passed by the user ("the fix on ex39 is minimal and i give it a pass"). Cover `export/EX39-cover.png` (frame 0.9 s, the frame-0 headline). Flicker check: FamilyMart bundles falling at 32.2 s (by design). Known, passed: one smeared frame at the cut to the map (~8.5 s), heavy blur flying out of setup 2. Review tools added this episode: `build/cammap.part.tsx` → `stills/camera_map.jpg`, `tools/raea/animatic.sh` → `out/animatic.mp4`.
Series: S06 Versus · Slot: Day 2, Thu 19 Nov 20:00 · Format: Style D (RECIPE-D; copy EX38 `build/` when building)
Decided by the user 2026-11-13: ~35–40 s at 3.4 words/s (shorter than EX38) · voice = the user records Nathan in ElevenLabs ·
fix EX38 § 12 gaps: carry an object through set changes (no dark frames), real coin detail + brighter rooms, eased subtitle
re-centre + larger disclaimers + labels clear of objects, sound in the preview · **no need to render every board still; a board is ok.**
Switched from Shopee vs Lazada vs TikTok Shop (fee tables behind Seller Centre logins, public figures conflict and pre-date the 14 Aug 2026 changes).

## Sources (read at source)
- **7-Eleven Malaysia Holdings, FY2025 (year to 31 Dec 2025): revenue RM3,177.9m; gross profit RM957.4m, "stable Gross Profit margin of 30.1%";
  net profit for the year RM32.357m (attributable to equity holders RM31.994m); 2,735 stores at end-4Q25; CAFé by 7-Eleven 859;
  opex up RM84.6m "higher store rental costs and utilities … store depreciation"** — company's unaudited 4Q25 interim report,
  `refs/7eleven_4Q25_quarterly_report.pdf` ([7eleven.com.my](https://www.7eleven.com.my/wp-content/uploads/2026/02/Quarterly-Report-for-the-Financial-period-Ended-31-Dec-2025.pdf)). VERIFIED (read).
- **7-Eleven: 2,776 stores at 30 Jun 2026; H1 FY2026 net profit RM13m (−57.5 %), revenue RM1.72b; 2Q net profit RM8.28m on RM883.61m; 1,010 CAFé stores** —
  [The Edge, 20 Aug 2026](https://theedgemalaysia.com/node/815296). VERIFIED (read).
- **KK Mart: 996 outlets "nationwide"; FY2025 (year to 30 Jun 2025) revenue RM1.57b (+7.7 %), net profit RM96.98m (−4.5 %); gross margin 28.8 %;
  PAT margin 6.2 %; founded 2001 in Kuchai Lama by Datuk Seri Dr Chan Kee Kan; 95.05 % held with Datin Seri Loh Siew Mui via K8 Resources;
  IPO 840m shares; 302 new stores in 15 months → 1,290** — [The Exchange Asia, 21 Apr 2026](https://theexchangeasia.com/?p=38539). VERIFIED (one outlet, read).
  Inside Retail's "Malaysia, India, and Nepal" is wrong: the prospectus says "996 stores throughout Malaysia" (no India/Nepal anywhere).
- **KK Mart prospectus (SC exposure, 20 Apr 2026, updated 28 Sep 2026), read: `refs/kkmart_prospectus_summary.pdf`, `refs/kkmart_prospectus_business.pdf`**
  ([SC page](https://www.sc.com.my/resources/prospectus-exposure/prospectus-exposure-kk-mart-retail-berhad)). Company's own claims, say "KK Mart says":
  - "a home-grown brand with full ownership of our brand" (summary 3.3 i).
  - "approximately 50.6% of our sales for the FYE 30 June 2025" were made between 10.00 p.m. and 10.00 a.m. (business 7, 24-7 concept).
  - Lean model: standard layouts and clear price labels let customers "shop independently with minimal assistance … reduce staff costs".
  - Asset-light: 987 of 996 stores rented; 3-year tenancies, renewals "generally subject to a rental escalation cap of 10.0% every three years";
    a familiar brand lets it "open stores in non-prime locations and benefit from favourable commercial terms".
  - FY2025: 465 transactions per store per day, average RM10.45 each, average daily sales per store RM4,865; SSSG −2.7 % (FY2025), 2.2 % (Jul 2025–Mar 2026).
  - 156 house-brand products; GP margin 28.8 %; EBITDA margin 9.5 % (FY2025).
- **FamilyMart (QL Resources): 490 stores as at FY2026 (year to 31 Mar 2026); ~60 new in FY2027 vs 45 in FY2026; convenience segment 1QFY2027
  (Apr–Jun 2026) revenue RM326.55m (−1 %), PBT RM8.78m (−54 %)** — [The Edge, 27 Aug 2026](https://theedgemalaysia.com/node/816000). VERIFIED (read).
- **FamilyMart segment PBT fell on "exclusion from the Sumbangan Asas Rahmah programme" and higher rental and logistics costs** —
  [The Edge, 26 Aug 2026](https://theedgemalaysia.com/node/815827). VERIFIED (read).

## Calculations (say "about"; different year-ends must be labelled on screen)
- 7-Eleven net margin FY2025: 32.357 / 3,177.9 = 1.02 % → about 1 sen per RM1.
- KK Mart net margin FY2025: 6.2 % (source) → about 6 sen per RM1.
- Profit ratio: 32.357 / 96.98 = 0.334 → 7-Eleven made about a third of KK Mart's profit with 2.7× the stores.
- Per store per year: 7-Eleven 32.357m / 2,735 ≈ RM11,800; KK Mart 96.98m / 996 ≈ RM97,400 (≈ 8×). Per day ≈ RM32 vs ≈ RM267.
  (Year-end store counts, not averages: "about", "illustration".)
- Gross margin: 7-Eleven 30.1 % vs KK Mart 28.8 % — 7-Eleven keeps MORE per item at the till, then loses it below gross profit.
- FamilyMart segment PBT margin 1QFY27: 8.78 / 326.55 = 2.7 % (before tax, one quarter).

## Not claimed
- That 7-Eleven pays a royalty or licence fee (not in its report; its report says only "under the '7-Eleven' brand name").
- That KK Mart's rent per store is lower than 7-Eleven's (no comparable figure): say only what KK Mart says about its own terms.
- KK Mart's reasons are the company's own description (prospectus), not independent findings: attribute them.
- Any royalty 7-Eleven Malaysia pays to 7-Eleven Inc.: not sourced.
- KK Mart's profit for calendar 2025 (its year ends 30 June).

## Script v1 (2026-11-13, SUPERSEDED: user "profit can be the first … less on metrics … for 12 year old to understand … too analytic rather than for mass purpose") — 112 words written, ≈ 125 spoken ≈ 37 s at 3.4 w/s
Frame 0 text: **2,735 stores. A third of the profit.** (7 words) + "HARI 2/30" + the three logos, source line top-left.

| Line | Voice | On screen (what the line literally shows) | Source |
|---|---|---|---|
| L01 | 7-Eleven has 2,735 stores in Malaysia. KK Mart has 996. | Two counters of store pins; 7-Eleven's grid is nearly 3× larger. | 7-E 4Q25 report; KK prospectus |
| L02 | But last year, KK Mart made 97 million ringgit in profit. 7-Eleven made 32. A third. | Two coin stacks, KK's 3× taller; "FY2025 · year-ends differ (Jun / Dec)". | same |
| L03 | And it isn't the till. On each sale, 7-Eleven actually keeps more than KK Mart. | Receipt prints: GROSS MARGIN 30.1 % vs 28.8 %. | same |
| L04 | The gap opens after. Rent, utilities, upkeep: 7-Eleven's own report says they all rose as it added stores. | The receipt's lines are eaten one by one by labelled costs. | 7-E 4Q25 report |
| L05 | KK Mart says it rents cheaper spots, caps its rent rises, and needs fewer staff. | Rent tag "+10 % max / 3 yrs", one standard shelf layout repeating. "KK Mart, prospectus". | KK prospectus |
| L06 | And half its sales happen between 10 at night and 10 in the morning. | Clock face sweeps 22:00 → 10:00, half the receipt lights up. "50.6 %". | KK prospectus |
| L07 | FamilyMart, 490 stores, just watched its profit fall by more than half. | Third stack (FamilyMart) drops 54 %. "convenience segment, Apr–Jun 2026, before tax". | The Edge 26–27 Aug 2026 |
| L08 | So from every ringgit you spend, KK Mart keeps about 6 sen. 7-Eleven, about 1. | One RM1 coin splits: 6 sen vs 1 sen. | calc in § Calculations |

End text: **7-Eleven or KK Mart: which is yours?** (7 words) · no follow line.
Loop: the last frame returns to the frame-0 receipt with "2,735" in the same framing.
Hero object (proposal for the art-direction gate): a till receipt that prints, gets eaten by costs and splits; the brand colours are the accents (7-Eleven green/orange vs KK red).

### Voice text (ElevenLabs v4, numbers as words)
L01 Seven-Eleven has two thousand, seven hundred and thirty-five stores in Malaysia. KK Mart has… nine hundred and ninety-six.
L02 But last year, KK Mart made ninety-seven million ringgit in profit. Seven-Eleven made thirty-two. A THIRD.
L03 And it isn't the till. On each sale, Seven-Eleven actually keeps MORE than KK Mart.
L04 The gap opens after. Rent, utilities, upkeep… Seven-Eleven's own report says they all rose as it added stores.
L05 KK Mart says it rents cheaper spots, caps its rent rises, and needs fewer staff.
L06 And HALF its sales happen between ten at night… and ten in the morning.
L07 FamilyMart, four hundred and ninety stores, just watched its profit fall by more than half.
L08 So from every ringgit you spend, KK Mart keeps about six sen. Seven-Eleven… about one.

### Caption
7-Eleven vs KK Mart Malaysia: more stores, less profit? Hari 2/30 · 30 hari, 30 bisnes Malaysia
#kkmart #7eleven #familymart #bisnesmalaysia #malaysia

## Script v2 (2026-11-13, SUPERSEDED: user "this is no metric at all … some metrics are okay for wow factor such as profit and loss") — plain words, profit first; ≈ 120 spoken words ≈ 36 s
Frame 0 text: **Fewer shops. Three times the profit.** (6 words) + "HARI 2/30" + KK Mart and 7-Eleven logos.

| Line | Voice | On screen |
|---|---|---|
| L01 | Last year, KK Mart made three times more profit than 7-Eleven. | Two piles of money; KK's grows to 3× (RM97m vs RM32m, small). |
| L02 | With about a third of the shops. | Shop pins: ~1,000 KK vs ~2,700 7-Eleven. |
| L03 | So how? It's not the prices. At the counter, 7-Eleven actually earns a little more on each thing it sells. | Same item at both tills; 7-Eleven's coin is a hair bigger. |
| L04 | The money leaks out after. Rent. Electricity. Keeping thousands of shops running. | The 7-Eleven pile drains through three labelled holes. |
| L05 | KK Mart says it does the opposite: cheaper shop lots, fewer workers, the same simple shelves everywhere. | One plain shelf layout stamped across many small shops. "KK Mart, prospectus". |
| L06 | And it never closes. Half its sales come between ten at night and ten in the morning. | Clock spins through the night; the shop stays lit; half the pile fills. |
| L07 | FamilyMart? Its profit just fell by more than half. | A third, smaller pile halves. "Apr–Jun 2026, before tax". |
| L08 | So spend one ringgit at KK Mart, and it keeps about six sen. At 7-Eleven, about one. | One RM1 coin; 6 sen vs 1 sen glow. |

End text: **7-Eleven or KK Mart: which is yours?** · no follow line · loop back to the frame-0 money piles.
Dropped from v1 (too analytic): gross-margin %, store counts to the unit, the 10 % rent cap, the 54 %.

### Voice text (ElevenLabs v4)
L01 Last year, KK Mart made THREE times more profit than Seven-Eleven.
L02 With about a third of the shops.
L03 So how? It's not the prices. At the counter, Seven-Eleven actually earns a little MORE on each thing it sells.
L04 The money leaks out after. Rent… electricity… keeping thousands of shops running.
L05 KK Mart says it does the opposite: cheaper shop lots, fewer workers, the same simple shelves everywhere.
L06 And it never closes. HALF its sales come between ten at night… and ten in the morning.
L07 FamilyMart? Its profit just fell by more than half.
L08 So spend one ringgit at KK Mart, and it keeps about six sen. At Seven-Eleven… about one.

## Script v3 (2026-11-13, waiting for approval) — plain words + the wow numbers (profit, shops, RM); ≈ 125 spoken words ≈ 37 s
Frame 0 text: **RM97 million vs RM32 million. Fewer shops.** (7 words) + "HARI 2/30" + KK Mart and 7-Eleven logos.

| Line | Voice | On screen |
|---|---|---|
| L01 | Last year, KK Mart made 97 million ringgit in profit. 7-Eleven made 32 million. | Two money piles counting up: RM97m vs RM32m. "FY2025 · year-ends differ". |
| L02 | Three times more… with about a third of the shops. 1,000 against 2,700. | Shop pins counting: ~1,000 vs ~2,700. |
| L03 | And it's not the prices. At the counter, 7-Eleven actually earns a little more on each thing it sells. | Same item at both tills; 7-Eleven's coin a hair bigger. "30.1 % vs 28.8 %" small. |
| L04 | The money leaks out after. Rent. Electricity. Keeping 2,700 shops running. | The 7-Eleven pile drains through three labelled holes. |
| L05 | KK Mart says it does the opposite: cheaper shop lots, fewer workers, the same simple shelves everywhere. | One plain shelf layout stamped across many small shops. "KK Mart, prospectus". |
| L06 | And it stays open all night. Half its sales come between 10 p.m. and 10 a.m. | Clock spins through the night; the shop stays lit; half the pile fills. "50.6 %". |
| L07 | FamilyMart? Its profit just crashed 54 percent. | A third pile drops 54 %. "convenience segment, Apr–Jun 2026, before tax". |
| L08 | So spend RM1 at KK Mart, and it keeps about 6 sen. At 7-Eleven… about 1 sen. | One RM1 coin; 6 sen vs 1 sen glow. |

End text: **7-Eleven or KK Mart: which is yours?** · no follow line · loop back to the frame-0 money piles.

### Voice text (ElevenLabs v4)
L01 Last year, KK Mart made ninety-seven MILLION ringgit in profit. Seven-Eleven made thirty-two million.
L02 Three times more… with about a third of the shops. One thousand… against two thousand seven hundred.
L03 And it's not the prices. At the counter, Seven-Eleven actually earns a little MORE on each thing it sells.
L04 The money leaks out after. Rent… electricity… keeping two thousand seven hundred shops running.
L05 KK Mart says it does the opposite: cheaper shop lots, fewer workers, the same simple shelves everywhere.
L06 And it stays open all night. HALF its sales come between ten p.m.… and ten a.m.
L07 FamilyMart? Its profit just crashed fifty-four percent.
L08 So spend one ringgit at KK Mart, and it keeps about six sen. At Seven-Eleven… about ONE sen.

**Script v3 APPROVED by the user 2026-11-13 ("approve. proceed to shot list").**

## Shot list v1 (2026-11-13, waiting for "ok") — 21 setups in ~38 s (incl. end hold), one every ~1.8 s
Rules: RECIPE-D § 4 + § 14–15; events on the words; no setup over ~3 s; neighbours differ in angle/height/lens.
§ 12 fixes built in: **every set change carries an object through it** (marked ⇢; no push through dark frames); sound
events listed per row go into the preview. No hands, no people (things move by themselves).
Sets: **A** dark counter with two cash piles · **B** void floor · **C** dot map of Malaysia (EX38's Natural Earth map) ·
**D** a shop-lot model street at night (KK Mart front + a 7-Eleven front) · **E** RM1 note on the counter (= set A).

| # | Line / words | Set · camera (cookbook move) | State change on the word | ⇢ carry / sound |
|---|---|---|---|---|
| 1 | L01 "Last year, KK Mart made" | A · **low push** between two cash piles, each on its till receipt (logos printed) | frame-0 text; HARI 2/30 tag; source line; KK pile's top bundle lands | soft paper thud |
| 2 | "97 million ringgit in profit" | A · **rack focus** onto the KK pile, rising crane | KK pile grows bundle by bundle; counter RM0 → 97m (red) | ticking count |
| 3 | "7-Eleven made 32 million" | A · **orbit** 70° to the 7-Eleven pile, eye level | its pile grows and stops at a third of the height; counter → 32m (grey); "FY2025 · year-ends Jun / Dec" | count stops with a click |
| 4 | L02 "Three times more…" | B · **pull out into the void**, side elevation | ⇢ KK pile carried into the void; it splits into three piles each 7-Eleven's height; "×3" | three soft thuds |
| 5 | "with about a third of the shops" | B → C · **scale travel**: crane straight up | ⇢ the piles shrink to two dots and drop onto the map of Malaysia | whoosh up |
| 6 | "1,000" | C · **tilted top-down map** | red dots light across the map; counter 0 → 1,000 | light crackle |
| 7 | "against 2,700" | C · crane higher, tilt eases | grey dots flood in, the map gets crowded; counter → 2,700 | denser crackle |
| 8 | L03 "And it's not the prices." | C → A · **dive** into one grey dot | ⇢ the dot becomes a drink can on the 7-Eleven till; a twin can on the KK till; same price tag on both | dive whoosh |
| 9 | "At the counter, 7-Eleven actually earns a little more" | A · **high three-quarter**, f/5.6 | both cans go **x-ray**: a coin stack inside each, 7-Eleven's a hair taller; small "gross margin 30.1 % vs 28.8 %" | soft glass ping |
| 10 | L04 "The money leaks out after." | A · **pull back along the counter** to the 7-Eleven cash pile | ⇢ the can's coins drop into the pile; the pile starts draining through the counter | trickle of coins |
| 11 | "Rent. Electricity." | A (under the counter) · **low skim, tilted horizon** | two outlets light on their words: a key tag RENT, an electricity meter with spinning digits | two low clunks |
| 12 | "Keeping 2,700 shops running." | D · **crane up** through the counter to a field of tiny lit 7-Eleven shops | ⇢ a coin thread runs from the pile to each shop; counter 2,700 | hum swell |
| 13 | L05 "KK Mart says it does the opposite:" | D · **side slide** along the street to a plain KK Mart shop lot, **eye-level frontal** | KK sign lights (red); note "KK Mart, prospectus" | sign buzz |
| 14 | "cheaper shop lots, fewer workers," | D · **orbit to top-down cutaway** of that shop | a small rent tag drops on the roof; three staff lanyards on hooks, two dim out | tag tick ×2 |
| 15 | "the same simple shelves everywhere" | D · **crane up to top-down** | the floor plan stamps itself into a grid of identical plans; counter | stamp ×4, accelerating |
| 16 | L06 "And it stays open all night." | D · **low grazing angle** on the KK front | street drops to night blue; the shop stays lit; neighbours' shutters close | shutters roll down |
| 17 | "Half its sales come between 10 p.m. and 10 a.m." | D · **macro on a 24-hour wall clock** in the window | hand sweeps 22:00 → 10:00; that half of the dial fills red; "50.6 % of sales" | clock tick → soft chime |
| 18 | L07 "FamilyMart? Its profit just crashed 54 percent." | B · **pull out into the void** (side transition), **long-lens frontal** fov 16 | ⇢ the clock's red half slides off as a coin; a third pile on a FamilyMart receipt drops to under half; counter −54 %; "convenience segment, Apr–Jun 2026, before tax" | one heavy drop |
| 19 | L08 "So spend RM1 at KK Mart, and it keeps about 6 sen." | A · **macro** on an RM1 note lying on the KK receipt | the note slices into 100 strips (sen); 6 lift and glow red; "about 6 sen" | paper slices |
| 20 | "At 7-Eleven… about 1 sen." | A · **orbit** to the 7-Eleven receipt, same height | its note slices; one strip lifts, grey; "about 1 sen" | one thin slice |
| 21 | end text "7-Eleven or KK Mart: which is yours?" | A · **dive to the loop** | both piles back in frame; camera settles on setup 1's exact pose (loop) | silence |

Open questions for the art-direction gate (not decided here):
- Accent colour: **KK red** as the one accent (the money that stays); 7-Eleven and FamilyMart stay neutral grey, their logos in true colour only on receipts/signs.
- Banknotes: illustrated generic RM notes marked "illustration" (not reproductions of Bank Negara notes; Malaysia has no RM1 coin, so L08 is a note).
- Shop lots: library shophouse models at small scale, desaturated with `grey.py`.

## Post (Day 2 · Thu 19 Nov 20:00)

**Caption:**
```
KK Mart made RM97 million. 7-Eleven made RM32 million, with almost 3× the shops. 🏪
Hari 2/30 · 30 hari, 30 bisnes Malaysia
Which one is your kedai: 7-Eleven, KK Mart or FamilyMart? 👇

Sources: KK Mart prospectus (SC, 2026) · 7-Eleven Malaysia 4Q25 report · The Edge (Aug 2026). Banknotes and the model street are illustrations.
KK Mart sign: "KK Super Mart.jpg" by Fred Cherrygarden, Wikimedia Commons, CC BY-SA 4.0.

#kkmart #7eleven #familymart #bisnesmalaysia #malaysia
```

**Pinned comment:**
```
Hari 3 esok: which business should we break down next? 👇
```
