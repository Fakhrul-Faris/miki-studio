# EX32 — The Ink Is the Business

Status: **final 2026-11-10** `export/EX32-Final.mp4` (28.0 s, 60 fps, −14 LUFS, Style B in HyperFrames) · pushed to Telegram /ex32 · slot Thu 12 Nov 12:30
Strategy: series **How It Makes Money** (calendar's next) · global brand, Malaysian prices · 22–26 s · **Style B**
(WORKING-RULES §1; flat-v3 playbook; EX28's build as the reference implementation — new palette, viewpoints, through-line).

## Sources
- **HP DeskJet Ink Advantage 2336: RM268** — [HP Store Malaysia](https://www.hp.com/my-en/shop/hp-deskjet-ink-advantage-2336-all-in-one-printer-7wq05b.html).
- **HP 682 Black cartridge: 8.5 ml, ~480 pages, RM51 (RRP; RM44 on promotion)** — [HP Store Malaysia](https://www.hp.com/my-en/shop/hp-682-black-original-ink-advantage-cartridge-3ym77aa.html).
  RM51 ÷ 8.5 ml = RM6 per ml = **RM6,000 a litre**.
- **HP FY2025: printing supplies US$10,916 m of US$16,702 m printing revenue (65%)** — HP 10-K FY2025
  ([SEC](https://www.sec.gov/Archives/edgar/data/47217/000004721725000071/hpq-20251031.htm)).
- ⚠ Check both HP Store prices on the day of posting (promotions change them).
- Not claimed: that HP loses money on each printer (no figure in the filing).

## Script v1 (~62 words, ~24 s)

| Line | Beat | Voice (display) | On the objects |
|---|---|---|---|
| L01 | Hook | This printer costs RM268. The expensive part is the ink inside it. | HP logo on the printer · RM268 swing tag |
| L02 | Mechanism | One black cartridge holds 8.5 millilitres and costs RM51. That's about RM6,000 a litre. | 8.5 ml on the cartridge · RM51 sticker · RM6,000 on a 1-litre bottle |
| L03 | Proof | Last year, about two thirds of HP's printing money came from ink and toner, not printers. | the 65% split, in cartridges |
| L04 | Twist | So the printer is the bait. You keep paying with every page. | each page out = a coin in |
| L05 | End | Cheap machine. Expensive refills. Follow for more hidden business models. | — (silent end) |

## Visual — Style B (no outlines, subtle grain, flat shapes with inner detail, light as a flat shape, words on objects)
Palette (new, from the product's meaning): warm paper-grey ground, ink black, and the three process inks — cyan,
magenta, yellow — as the only accents; one alarm (magenta) on the prices. Light and hand-offs (not EX28's window patch,
user 2026-11-10 "chase new idea"): **the printer's own print head** — a CMY band sweeps down and prints each scene in;
at the end it sweeps back up and leaves blank paper. Built: `build/hf_ex32.py` → `hf/`, sound `build/sfx.py`.

| Line | Viewpoint | Drawn | Hand-off |
|---|---|---|---|
| L01 | frontal elevation, the desk | a page already feeding out on frame 1; the printer (real HP logo, panel), its swing tag RM268; the ink door drops open to show the cartridges | an ink drop falls; the print head prints L02 in |
| L02 | macro cutaway of the cartridge | the cartridge cut open: the ink level, a measuring scale reading 8.5 ml, the RM51 price sticker; pull back: a 1-litre bottle fills drop by drop, its label counts to RM6,000 | the bottle's ink becomes the next scene's ground |
| L03 | top-down, an invented object | HP's money as a cash tray of 3 slots: 2 fill with cartridges and toner, 1 with a printer (≈ two thirds) — "≈ ⅔ (65%)" on the tray's label | zoom into the printer in its slot |
| L04 | side elevation | the printer hooked on a fishing line ("bait"); each page that comes out pulls an RM coin in ("you keep paying with every page") | the last page grows to fill the frame |
| L05 | frontal, the desk again (bookend) | the cheap printer beside a tall stack of cartridges | the print head sweeps up: blank paper, silent end |

Baseline checks (LESSONS.md): every line shown literally; nothing passes through anything; every number readable at phone
size and clear of the caption band; sound in the first preview; one preview → one final.

## Post (draft)
**Caption:**
```
Your printer costs RM268. The ink costs about RM6,000 a litre 🖨️ One HP 682 black cartridge: 8.5 ml for RM51. Last year about two thirds of HP's printing money came from ink and toner. Do you still buy original cartridges? 👇  #printer #hp #malaysia #businessmodel #bisnes
```
**Pinned comment:**
```
Sources: HP Store Malaysia (DeskJet Ink Advantage 2336 RM268; HP 682 black 8.5 ml RM51), HP 10-K FY2025 (supplies US$10.9bn of US$16.7bn printing revenue).
```
