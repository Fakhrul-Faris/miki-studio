# EX38 — Why is everything RM2.60? (Eco-Shop)

Status: **FINAL rendered 2026-11-13: `export/EX38-Final.mp4`** (59.5 s, 1080×1920, 60 fps, −14.1 LUFS; `build/final.sh` + `build/mix.py`), pushed to Telegram (`/ex38`) and shown in the dashboard as ready, no slot yet. ⚠ The voice is still the VoiceStudio scratch take the user called "trash" (OmniVoice weights CC-BY-NC, the user's call before posting): when `audio/L01.mp3`–`L11.mp3` arrive, re-run `timeline.py`, `mix.py`, `final.sh` (about 12 min) and push again. Sound: bed + 7 sparse effects, set by measurement, not heard. Cover `export/EX38-cover.png` is still the v1 look. Flicker check flags the falling coins at 5.9–6.6 s (by design) and one transition frame. Earlier: **preview v2 rendered 2026-11-13, APPROVED by the user 2026-11-13 ("everything is perfect"); recipe written to `00_bible/series-bible/RECIPE-D.md`.** `out/preview_v2.mp4` (59.5 s, 1080×1920, 30 fps, scratch voice = the rejected VoiceStudio take, for timing only) and `out/preview_v2_silent.mp4`; sheets every 0.5 s `stills/preview_v2_sheet_1..4.jpg`; board v3 (27 stills from the same file) `stills/board_v3.jpg`, `board_v3_vs_ref_1..3.jpg`, `stills/board_v3/`. Build: `build/kit.part.tsx` + `build/film2.part.tsx` → `film2.tsx` (compositions `film`, `board`); `build/preview2.sh` renders in 300-frame chunks (~5 min); `build/grey.py` makes the grey-textured product copies (`*_g.gltf`). All events hang on word indices in `build/tl.json`, so a new voice only needs `timeline.py` re-run. Fixed since board v2: products keep their surface detail in grey (no flat repaint); Outfit font loaded from `media/fonts/`; 15 reframed with the container (rebuilt as plain walls: the boolean shell never drew) and a MADE IN CHINA carton; 16 map larger; 22 note readable with red underlines; 10 reframed; middle coin stack is now **FY2025 28.2 %** (The Star, 30 Jul 2025, read) instead of the unverified FY2024. Known gaps: set changes are a blurred push/pull through ~2 dark frames (12 of them), not true morphs; caption line jumps (no ease) when it re-centres; coins still not convincingly metal; rooms darker than the reference; no sound design; voice is scratch. Voice: the user records in ElevenLabs (`audio/L01.mp3`–`L11.mp3`).
Series: S01 Why is [Malaysian brand] so cheap? · Format: **Style D macro object** (WORKING-RULES §1; reference = `refs/ref_hero.jpg`, the TV-box video)
Length target: ~200 words ≈ 60 s at 3.4 words/s (the reference's pace) · No follow line, end on a question (user 2026-11-12)

## Sources
- **RM2.60 in Peninsular Malaysia, RM2.80 in Sabah and Sarawak; 462 outlets; house brands 60 % of sales in FY2026; record gross
  profit margin 33.3 % in FY2026 (year to 31 May 2026), up from 19.6 % in FY2022; over 65 % of products sourced from China;
  255 new stores planned in three years** — [The Edge, 14 Aug 2026](https://theedgemalaysia.com/node/814545) (CIMB Securities). VERIFIED (one outlet, read).
- **Analysts expect a higher fixed price: CIMB "within the next 12 months"; UOB Kay Hian has factored in a 20 sen hike, "quantum and
  timing remain undecided"; minimum wage rising to RM2,000 from RM1,700; yuan appreciation** — [The Star, 29 Oct 2026](https://www.thestar.com.my/business/business-news/2026/10/29/eco-shop-to-defend-margins-via-price-hikes). VERIFIED (read).
- **Founded 2003 by Lee Kar Whatt with his brother and two others; HQ Jementah, Johor** — [Malay Mail, 22 May 2025](https://www.malaymail.com/news/money/2025/05/22/how-a-rm260-pricing-strategy-will-make-eco-shops-lee-a-billionaire-through-malaysias-biggest-ipo-of-2025/177677). Not used in the script.
- **RM2.40 → RM2.60 in Peninsular Malaysia (RM2.60 → RM2.80 in East Malaysia) from 14 April 2025, after the minimum wage rose to RM1,700** — [The Edge, 29 Apr 2025](https://theedgemalaysia.com/node/753405). VERIFIED (read 2026-11-12).
- **Gross margin 28.2 % in FY2025 (year to 31 May 2025), "grew by 1.8 percentage points to 28.2%"** — [The Star, 30 Jul 2025](https://www.thestar.com.my/business/business-news/2025/07/30/eco-shop-profits-from-rising-demand-for-affordable-products). VERIFIED (read 2026-11-13). Used only as the middle coin stack in setup 5.
- **Calculation (L03):** 33.3 % × RM2.60 = RM0.866 → "about 87 sen". It applies the company-wide gross margin to one RM2.60 item, so it is an average, said as "on average, about".
- **Not claimed:** the cost or margin of any single product; that house brands are cheaper to buy (the source says only "higher-margin"); that the price will rise (analysts expect it; the company has not announced it); the bottle is a library model with an invented label, not an Eco-Shop product (on-screen note in L04); "60 % of sales" is shown on an illustrative shelf.

## Voice v1 (2026-11-12, REJECTED: "the voice from voicestudio is trash" — the user records in ElevenLabs)
Nathan profile in VoiceStudio (`a000dca6`, local API 127.0.0.1:3900, engine OmniVoice), speed 1.2, seed 7, one WAV per line
(`audio/L01–L11.wav`), joined to `audio/vo.wav` (59.5 s with the end hold; 196 spoken words ≈ 3.5 words/s). Spoken text is in
`build/vo.py` (numbers as words). Two wording changes for the voice: L02 "up from under twenty percent, just four years ago";
L09 "the Chinese yuan". Checked by transcript only (not by ear): Whisper hears "sen" as "cents" in L03/L09.
⚠ OmniVoice's weights are CC-BY-NC (non-commercial) — the user's call before posting.

## Hero object
The Eco-Shop shopping bag (user's photo `refs/ecoshop_bag_user.png`, front panel rectified to `build/media/bag_front.png`) stands on a
counter with one bottle and a price sign; shelves behind.

## Frame 0 text
**Everything RM2.60. Record profit margin.** (5 words) — plus the Eco-Shop logo on the shelf label from frame one.

## Script (182 words as written, about 195 when numbers are spoken ≈ 55–58 s at 3.4 w/s)
| Line | Voice | On screen (one continuous camera, a new event on the word) |
|---|---|---|
| L01 | Eco-Shop sells almost everything for RM2.60, and it has never made more money per item. | Slow push along a dark shelf to one bottle; the shelf label "eco-shop RM2.60" is the only colour. Source line top-left. |
| L02 | Its gross margin just hit a record 33%, up from under 20, four years ago. | Label: GROSS MARGIN 19.6 % → 33.3 %, counting, on a leader line from the price label. |
| L03 | Imagine one bottle on that shelf. You pay RM2.60. On average, about 87 sen of that stays with Eco-Shop before rent and wages. | Rack focus to the label; it lifts off the shelf and splits into two stacked slices, 87 sen glowing red. "average, FY2026" in small type. |
| L04 | How? Look at the label. It isn't a brand you know. It's Eco-Shop's own. | Orbit to a macro on the bottle's label; neighbours' labels come into focus one by one. "illustrative label". |
| L05 | House brands are now 60% of its sales, and they earn Eco-Shop more than the names you know. | Pull out along the shelf: 6 in 10 bottles light up red at the base. |
| L06 | More than 65% of its products come from China, bought for 462 stores at once. | Camera drops behind the shelf to a carton and a pallet; counter 1 → 462 on the carton's side. |
| L07 | But here's the part the sign doesn't say. Fixed doesn't mean forever. | Back to the price label, tight macro. |
| L08 | Until April last year, it was RM2.40. | The label's digits flip back to 2.40, then forward to 2.60. "Apr 2025". |
| L09 | Now minimum wage is rising to RM2,000, the yuan is getting stronger, and analysts expect the price to move again within 12 months. One has pencilled in 20 sen. | Two small weights land on the shelf (RM1,700 → RM2,000; CNY); the label's last digits blur. "analyst forecast, not announced". |
| L10 | So the price was never really the product. The promise is. One number, on every shelf, that you never have to check. | Pull back: the whole aisle, every shelf label the same red line. |
| L11 | And the day that number changes, 462 stores change with it. | Top-down: a grid of 462 small red labels, all flipping at once. |

## End text
**Would you still go at RM2.80?** (6 words; Sabah and Sarawak already pay RM2.80)

## Loop
The last frame pushes into one label of the grid as its digits settle on RM2.60: the same label, same framing, as frame 0.

## Caption (short form; the full post text is in § Post)
Why is everything at Eco-Shop Malaysia RM2.60?
#ecoshop #malaysia #rm260 #bisnesmalaysia #kedaimurah

## Post

**Caption:**
```
why is eco shop so cheap malaysia 🛍️ Everything at Eco-Shop is RM2.60, and its profit margin just hit a record 33%. On average about 87 sen of every RM2.60 stays with Eco-Shop before rent and wages. How: its own house brands are now 60% of sales, and more than 65% of products come from China, bought for 462 stores at once. But until April 2025 the price was RM2.40, and analysts expect it to move again. Would you still go at RM2.80? 👇  #ecoshop #malaysia #rm260 #bisnesmalaysia #kedaimurah
```
**Pinned comment:**
```
Would you still shop there at RM2.80? 👇
Sources: The Edge Malaysia, 14 Aug 2026 (FY2026 margin 33.3%, 462 outlets, house brands 60%, 65%+ from China) and 29 Apr 2025 (RM2.40 → RM2.60); The Star, 30 Jul 2025 (FY2025 margin 28.2%) and 29 Oct 2026 (analyst forecasts). "About 87 sen" = 33.3% × RM2.60, a company-wide average. A price rise is an analyst forecast, not announced by Eco-Shop.
```

## Tags
Series: S01 Why is [Malaysian brand] so cheap? · Hook type: number-contradiction · Topic category: retail / fixed price ·
Local to audience: yes · Length: 58 s · End question type: take-a-side

## Look test (2026-11-12)
`stills/ref_vs_hero_vs_cover.jpg` = reference frame · hero still v1 · cover v1. Build: `build/hero.tsx` (compositions `hero`, `cover`).
Still failing against the reference: light is a hard spot on black (the reference is a soft top light in a grey room with depth
behind); neighbours too saturated; no blurred room behind the shelf; caption font is Inter (the reference uses a rounder sans);
the hero label is invented text.

## Credits
Outfit typeface (Google Fonts, SIL OFL 1.1).
Poly Haven, CC0: multi_cleaner_bottle, bleach_bottle, drain_cleaner, multi_cleaner_5_litre, cleaner_tin_01, all_purpose_cleaner.
Eco-Shop logo: "Eco-Shop Logo.jpg", Stella Soon, Wikimedia Commons, CC BY-SA 4.0 (trademark of Eco-Shop Marketing Berhad, used editorially).

## Shot list v2 (2026-11-12) — 27 setups in ~58 s, one every ~2.1 s (reference B: one every 2.3 s)

Rules from STUDY-D: every setup has its events on the words; no setup over ~4 s; objects change state; the picture sits in
the 25–60 % band; one accent (Eco-Shop red); captions animate as STUDY-D § 6. No hands (house rule), so nothing is "placed" by a hand.

| # | Line / words | Setup and camera | State change and events |
|---|---|---|---|
| 1 | L01 "Eco-Shop sells" | **Macro** on the price sign (logo + RM2.60), slow push; frame-0 text | source line fades in |
| 2 | "almost everything" | **Rack focus** past the sign to the bag behind; tilt up | the bag goes **x-ray**: 12 products glow inside as outlines |
| 3 | "for RM2.60" | **Orbit up to top-down** | the products rise out and land in a ring round the bag, each with a RM2.60 tag; counter 1 → 12 |
| 4 | "never made more money per item" | Push in on one tag, low angle | the tag's back turns over: a coin stack grows on it |
| 5 | L02 "gross margin … record 33%" | **Pull out into a void**: five coin stacks in a row = FY22…FY26 | stacks rise one by one; counter 19.6 → 33.3 %; a line draws across the tops |
| 6 | "up from under 20 … four years ago" | Skim low along the row back to the first stack (**low angle, Dutch tilt**) | labels FY2022 19.6 %, FY2026 33.3 %; small source note |
| 7 | L03 "Imagine one bottle on that shelf" | **Eye-level frontal** down a dark aisle, rack focus to one bottle | shelf label lights under it |
| 8 | "You pay RM2.60" | Macro on the shelf label, then a till display behind it | display types RM2.60 |
| 9 | "about 87 sen of that stays" | Top-down 3/4 on the bottle | the bottle **slices into 26 discs** (10 sen each); the top 8.7 lift and glow red; label ABOUT 87 SEN, note "average" |
| 10 | "before rent and wages" | Orbit to side elevation of the slices | lower stack labelled COST OF THE GOODS about RM1.73 |
| 11 | L04 "How? Look at the label." | **Macro** on the bottle's label, raking light | spotlight pool crosses the print |
| 12 | "It isn't a brand you know. It's Eco-Shop's own." | Pull back along the shelf | the famous-brand silhouettes dim; a red HOUSE BRAND stamp lands on six labels |
| 13 | L05 "House brands are now 60%" | **Crane up to top-down**: ten products in two rows | six light red; counter 0 → 60 % of sales |
| 14 | "they earn Eco-Shop more" | The ten shrink into a header; two coin stacks below (house brand vs known name) | the house-brand stack rises higher; label "higher margin (company statement)" |
| 15 | L06 "More than 65% … from China" | **Scale travel**: pull out to a container on a dark quay, top-down 3/4 | cartons slide out of it; counter over 65 %; label SOURCED FROM CHINA |
| 16 | "bought for 462 stores at once" | Crane higher: a map of Malaysia in dots (Natural Earth data) | 462 points light west to east; counter 1 → 462 |
| 17 | L07 "the part the sign doesn't say" | Dive back to the sign, **low angle from behind it** | its back is blank; camera orbits to the front |
| 18 | "Fixed doesn't mean forever" | Frontal macro on the digits | the digits shiver once |
| 19 | L08 "Until April last year, it was RM2.40" | A wall calendar beside it, eye level | pages flip back to APR 2025; the sign's split-flap digits turn to 2.40, then forward to 2.60 |
| 20 | L09 "minimum wage is rising to RM2,000" | Macro on a payslip under a spotlight (as C's paper shots) | the figure types RM1,700 → RM2,000; highlight bar |
| 21 | "the Chinese yuan is getting stronger" | Skim to an exchange-rate board (split-flap) | CNY row ticks up; red arrow |
| 22 | "analysts expect the price to move again" | A research note on the counter, **Dutch tilt**, spotlight pool on one sentence | "within the next 12 months" lights; note "forecast, not announced" |
| 23 | "One has pencilled in 20 sen" | Back to the sign, tight | a ghost digit "+20 sen" floats beside it, dashed outline |
| 24 | L10 "The promise is." | **Pull out** to the aisle, eye level | one label after another lights down the aisle |
| 25 | "One number, on every shelf" | Crane up to top-down of the whole store | every shelf edge a red line; counter of labels |
| 26 | L11 "the day that number changes" | Higher: the map of 462 dots again | all dots flip in a wave |
| 27 | "462 stores change with it" + end text | Dive into one dot → it is the price sign, macro | digits settle on RM2.60 = frame 0 (loop) |

New models and pieces this needs: split-flap price sign, coin stacks, till display, sliced bottle, calendar, payslip and research
note (real text, readable), exchange board, container + quay, dot map, an aisle of shelves, 12 varied products (Poly Haven).

## Voice text for ElevenLabs (v4 text: numbers as words; captions keep the digits)

Target pace about 3.4 words per second (the references run 3.4–3.6): 196 words ≈ 58 s. One file per line (`audio/L01.mp3` …).

| Line | v4 text |
|---|---|
| L01 | Eco-Shop sells almost everything for two ringgit sixty… and it has NEVER made more money per item. |
| L02 | Its gross margin just hit a record thirty-three percent. Up from under twenty percent, just four years ago. |
| L03 | Imagine one bottle on that shelf. You pay two sixty. On average, about eighty-seven sen of that stays with Eco-Shop… before rent and wages. |
| L04 | How? Look at the label. It isn't a brand you know. It's Eco-Shop's OWN. |
| L05 | House brands are now sixty percent of its sales, and they earn Eco-Shop more than the names you know. |
| L06 | More than sixty-five percent of its products come from China, bought for four hundred and sixty-two stores at once. |
| L07 | But here's the part the sign doesn't say. Fixed… doesn't mean forever. |
| L08 | Until April last year, it was two forty. |
| L09 | Now minimum wage is rising to two thousand ringgit, the Chinese yuan is getting stronger, and analysts expect the price to move again within twelve months. One has pencilled in twenty sen. |
| L10 | So the price was never really the product. The promise is. One number, on every shelf, that you never have to check. |
| L11 | And the day that number changes… four hundred and sixty-two stores change with it. |

