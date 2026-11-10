# EX35 — How Is ZUS So Cheap? (Part 3)

Status: **script v1 + Style A plan for approval (2026-11-10)** · voice generated (Kokoro am_michael, `audio/L01–L06.mp3`, ~33 s of speech, ~35 s film)
Strategy: series **How is X so cheap?** Part 3 (Part 1 99 Speedmart EX25, Part 2 Mr DIY EX29; ZUS was in our own Part 3 vote) ·
passes the topic test (`06_analytics/marketing-research.md` §5: Malaysians search ZUS; the hook is their question) · 30–35 s · **Style A** (EX29 baseline).

## Sources
- **First outlet: a ~200 sq ft (19 m²) kiosk at Binjai 8, KLCC, Nov 2019** — [Wikipedia: Zus Coffee](https://en.wikipedia.org/wiki/Zus_Coffee); [VnExpress](https://e.vnexpress.net/news/business/companies/how-zus-coffee-become-malaysia-s-largest-coffee-chain-in-4-years-4824248.html).
- **566 stores (Sep 2024) vs Starbucks Malaysia's 411** — [VnExpress, Sep 2024](https://e.vnexpress.net/news/business/companies/how-zus-coffee-become-malaysia-s-largest-coffee-chain-in-4-years-4824248.html).
- **Over 70% of orders through its app; "build the app first, then open in cheaper off-street areas"** — co-founder Venon Tian
  on The Game of Impossible podcast, via [Unienrol (Apr 2026)](https://articles.unienrol.com/zus-coffee-rm1bil-revenue-taylors-alumni/).
- **Revenue "more than a billion" ringgit a year** — Venon Tian, same podcast (Apr 2026), via Unienrol. Earlier: RM15.7 m (2021) → RM200 m+ (FY to Jun 2023), VnExpress.
- ⚠ **Prices: ZUS Café Latte RM10.20; Starbucks Caffè Latte (tall) RM15.90** — unofficial menu listings
  ([syioknya](https://www.syioknya.com/promotion/zus-coffee-menu), [makanmenus](https://makanmenus.my/coffee-bakeries/starbucks-menu/)).
  Check both apps on the day before posting; the script says "about ten" / "about sixteen".
- Not claimed: ZUS's margins or rent figures (not public); that every store is a kiosk (it isn't).

## Script v1 (~66 words; Kokoro am_michael, speed 1.06; "Zoos" and "ringghit" spelled for the right sound)

| Line | Beat | Voice (display) | On the world's own objects |
|---|---|---|---|
| L01 | Hook | ZUS Coffee sells a latte for about RM10. Starbucks charges about RM16. How is ZUS so cheap? | the ZUS logo on the kiosk from frame 1 · RM10 / RM16 on the two cups' tags |
| L02 | Mechanism 1 | Its first shop was a 200-square-foot kiosk in KLCC. No seats. | "200 sq ft" marked on the floor round the kiosk · the empty pavement where chairs would be |
| L03 | Mechanism 2 | Over 70% of orders come through the app. Fewer cashiers, and cheaper side streets instead of the mall's front row. | order pings from phones in the windows → the kiosk · the till light goes off · the kiosk on a side lane vs the mall frontage's rent board |
| L04 | Proof | In 2024, it passed Starbucks: 566 stores to 411. | blue ZUS lights vs white cafés across the city |
| L05 | Payoff | Now it makes more than RM1 billion a year. | the token lands on a stack · RM1 billion |
| L06 | End | Small shops. A big app. Follow for Part 4. | — (silent end) |

## Visual — Style A (WORKING-RULES §1: dark near-isometric model world, the subject in real colour, a travelling token)
Three lines (rule 0.2):
- **Camera:** high three-quarter / near-isometric over a KL street block at night (the EX29 world), coming close for the reads.
- **World:** the dark charcoal model world as in EX29, dense and detailed (shophouses, five-foot way, scooters, stalls, posed figures from behind); a mall frontage with a big white café.
- **What changes:** the ZUS kiosk is the only thing in real colour (royal blue, white logo) and the warm light. The token is a takeaway cup (the latte) that travels the story: from the price comparison, to the app's order pings, to the city of blue lights, onto the RM1 billion stack.

| Line | What we see | Motion (objects move, camera stays near) | Hand-off |
|---|---|---|---|
| L01 | frame 1 is already moving: two cups slide across a counter edge toward camera, tags RM10 (ZUS blue) and RM16 (white café); behind, the lit ZUS kiosk | the cups slide and stop with weight; the camera eases back to show the kiosk on the street | follow the blue cup to the kiosk |
| L02 | the kiosk close: a 200 sq ft square painted round it on the pavement, "200 sq ft"; where a café's chairs would be, nothing | the floor marking draws itself; a passing figure (posed) is the scale | rise to the apartment windows above |
| L03 | phones glow in the windows; order pings (small blue arcs) fly down to the kiosk; the till's light switches off; then a cutaway pan: the mall's front row with a big "RENT" board vs ZUS on the side lane | pings in a rhythm; the pan along the street | pull up and out |
| L04 | the city block from high: blue ZUS lights come on (566) outnumbering white café lights (411); counters on two rooftop signs | lights in waves from KLCC outward | dive to one kiosk's counter |
| L05 | the cup lands on a stack of cups that becomes the RM1 billion number on the kiosk's menu board | the stack settles (physics bake) | back to the street |
| L06 | the kiosk at closing: the shutter rolls down, the blue light narrows; silent end | slow shutter | — |

Lessons applied (LESSONS §1–§11): detail first (library models; no box sets; the EX29 street's density) · objects move like
real ones (the shutter rolls, cups slide with friction, scooters are parked, not floating) · the camera stays near the action, no long
flights · every number on an object and readable at phone size, clear of the caption band · collision check (`paths.py`) +
zero raea clipping lines · sound in the first preview · **a preview to the user before the final**.

## Post (draft)
**Caption:**
```
How is ZUS Coffee so cheap? ☕ A latte for about RM10, Starbucks about RM16. ZUS started as a 200 sq ft kiosk in KLCC, takes over 70% of orders through its app, and opens on cheaper side streets. In 2024 it passed Starbucks: 566 stores to 411. Part 4: Daiso or KK Mart? 👇  #zuscoffee #malaysia #kopi #bisnes #businessmodel
```
**Pinned comment:**
```
Part 4: Daiso or KK Mart? Vote 👇
Sources: Wikipedia (first kiosk, KLCC 2019); VnExpress Sep 2024 (566 vs 411 stores); co-founder Venon Tian, The Game of Impossible podcast, Apr 2026 (70%+ app orders, revenue over RM1 billion). Prices from menu listings, Nov 2026.
```
