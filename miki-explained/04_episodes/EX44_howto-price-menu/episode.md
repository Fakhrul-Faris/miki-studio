# EX44 — If you want to price a nasi lemak so it makes money (S16 How to)

Status: **facts + script draft v1 (2026-11-14), waiting for the user.** Nothing built.
User's answers (RECIPE § 0.1): dish = nasi lemak bungkus · method = food cost % · look = ~60 % UI costing sheet / ~40 % food
macro (Style D motion) · ~45 s · voice: the user (ElevenLabs) · slot Mon 23 Nov 12:30.

## Ingredient prices (✅ official open data · ⚠ estimate)

National median price, PriceCatcher (KPDN, via DOSM open data, `pricecatcher_2026-10.parquet`, 10–31 Oct 2026, 1.36 m records):

| Ingredient | Item (PriceCatcher) | Median | Per packet (example recipe) | Cost |
|---|---|---|---|---|
| Rice | Beras putih Cap Faiza Emas (import) 10 kg | RM31.99 → RM3.20/kg | 100 g uncooked | RM0.32 |
| Santan | Santan kelapa segar (biasa) 1 kg | RM10.00 | 25 g | RM0.25 |
| Egg | Telur ayam gred B 30 biji | RM14.95 → RM0.50 each | ½ egg | RM0.25 |
| Ikan bilis | — not in PriceCatcher | ⚠ RM30/kg (shops RM20–60) | 10 g | RM0.30 |
| Groundnuts | Kacang tanah (import) 1 kg | RM9.00 | 10 g | RM0.09 |
| Cucumber | Timun 1 kg | RM4.50 | 20 g | RM0.09 |
| Sambal | Cili kering kerinting RM20.90/kg (5 g, 0.10) · bawang kecil merah India RM4.99/kg (15 g, 0.07) · minyak masak paket RM2.50/kg (10 g, 0.03) · gula kasar RM2.85/kg (5 g, 0.01) | | | RM0.21 |
| Wrap | paper + a piece of banana leaf | ⚠ estimate | 1 | RM0.10 |
| **Total** | | | | **≈ RM1.61** |

The recipe quantities are an example, not a measured stall: ⚠ on screen "example recipe". A real stall's numbers would beat this.

| # | Fact | Source | Strength |
|---|---|---|---|
| M1 | Ingredient prices above (Oct 2026, national median) | PriceCatcher, data.gov.my | ✅ (my median of the raw records) |
| M2 | Food cost "rule of thumb": 28–35 % of the menu price; price = food cost ÷ target % (e.g. $2.75 ÷ 0.30) | restaurant-industry guides (7shifts, Genius Food Purchasing) | 🟡 industry rule of thumb, not a law |
| M3 | Average plate of nasi lemak in Malaysia RM3.68 (2024) | DOSM CPI analysis 2024 (EX37 fact, via The Edge / SAYS) | 🟡 (EX37) |
| Calc | 1.61 ÷ 0.35 = RM4.60 · 1.61 ÷ 0.30 = RM5.37 ≈ RM5.40 · 1.61 ÷ 3.68 = 43.8 % ≈ 44 % | — | arithmetic |

Not claimed: any stall's real cost; that RM3.68 sellers lose money (food cost alone isn't profit or loss).

## Script draft v1 (~135 words, ≈ 45 s)

Frame-0 text: **YOUR NASI LEMAK'S REAL PRICE?**

| L | Voice | On screen |
|---|---|---|
| L01 | If you want to price a nasi lemak so it actually makes money, here's how. Four steps. | a bungkus at macro, its paper unfolds; a costing sheet slides beside it |
| L02 | Step one. Price every ingredient in one packet: rice, santan, half an egg, ikan bilis, peanuts, cucumber, sambal and the wrap. | each ingredient lands on the leaf on its word; a sheet row fills with its cost |
| L03 | With October's government prices, that's about one ringgit sixty. | the sheet totals to RM1.61; source PriceCatcher Oct 2026; "example recipe" |
| L04 | Step two. Pick your food cost. Most restaurants aim for thirty to thirty-five percent. | a slider 30–35 % |
| L05 | Step three. Divide. One sixty by point three five is about four sixty. At thirty percent, five forty. | calculator: 1.61 ÷ 0.35 = 4.60, then ÷ 0.30 = 5.37 → RM5.40 |
| L06 | Step four. Check it. The average plate in Malaysia was three sixty-eight. At that price, food eats forty-four percent. | price tag RM3.68; a bar fills to 44 % in red |
| L07 | The rest has to pay for gas, rent and your time. Which number surprised you? | the remaining bar splits: gas · rent · your time |

End text: **WHAT DO YOU CHARGE?** → sound C + Meikigo logo.

## Voice text (ElevenLabs v4)

| L | v4 text |
|---|---|
| L01 | If you want to price a nasi lemak so it actually makes money, here's how. Four steps. |
| L02 | Step one. Price every ingredient in one packet: rice, santan, half an egg, ikan bilis, peanuts, cucumber, sambal… and the wrap. |
| L03 | With October's government prices, that's about one ringgit sixty. |
| L04 | Step two. Pick your food cost. Most restaurants aim for thirty to thirty-five percent. |
| L05 | Step three. Divide. One sixty, divided by point three five, is about four sixty. At thirty percent… five forty. |
| L06 | Step four. Check it. The average plate in Malaysia was three sixty-eight. At that price, food eats FORTY-FOUR percent. |
| L07 | The rest has to pay for gas, rent, and your time. Which number surprised you? |

## Sources
- PriceCatcher (DOSM open data): https://open.dosm.gov.my/data-catalogue/pricecatcher · https://storage.data.gov.my/pricecatcher/pricecatcher_2026-10.parquet
- 7shifts, restaurant food cost: https://www.7shifts.com/blog/restaurant-food-cost/
- Genius Food Purchasing, 28–35 %: https://geniusfoodpurchasing.com/what-should-food-cost-be-in-restaurant/
- Ikan bilis price range: https://www.hargasekilo.my/harga-ikan-bilis-sekilo/
- RM3.68 (DOSM via The Edge): https://theedgemalaysia.com/node/753397
