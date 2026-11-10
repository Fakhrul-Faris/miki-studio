# EX34 — One Ringgit, One Airline

Status: **final 2026-11-10** `export/EX34-Final.mp4` (31.6 s, 60 fps, −14 LUFS, Style B on the EX33 baseline, pushed further) · voice Kokoro `am_michael` · pushed to Telegram /ex34 · slot Fri 13 Nov 12:30
**User verdict 2026-11-10:** "it become plain back, not enough detail. not good. and this topic should be longer. the
motion is not on point … i like the ex33 better. no need to re-render" → lessons in `00_bible/LESSONS.md` §11.
The final stays as made (on Telegram /ex34, dashboard Fri 13 Nov 12:30); not a baseline.
Gates: pass-through check clean (`window.__ex34check()`: coin, planes, truck, CRT, hangar, board — part by part) · no flicker / black frames (frame diff) · `hyperframes check` 0 errors.
Strategy: series **Founder stories** (Malaysia's own: Tony Fernandes / AirAsia) · ~31 s · **Style B, EX33 = baseline** (user 2026-11-10: "apply all three. go beyond now. this is the baseline. push far larger boundaries").

## Sources
- **5 Sep 2001: Tune Air (Tony Fernandes, Kamarudin Meranun) bought AirAsia from DRB-Hicom for RM1, with two Boeing 737-300s and RM40 m (US$11 m) of debt** — [Wikipedia: AirAsia](https://en.wikipedia.org/wiki/AirAsia), [Wikipedia: Tony Fernandes](https://en.wikipedia.org/wiki/Tony_Fernandes) (citing [Stuff NZ](https://www.stuff.co.nz/business/world/64525206/the-man-behind-airasia-tony-fernandes), [Washington Post 2014](https://www.washingtonpost.com/news/world/wp/2014/12/28/the-man-behind-airasia-flamboyant-chief-executive-tony-fernandes/)).
- **Within a year it broke even and cleared its debts** — same (Wikipedia: "In its first year under the low-cost model, AirAsia achieved profitability").
- **63 million passengers in 2024** (AirAsia Aviation Group, load factor 89%) — [New Straits Times, Feb 2025](https://www.nst.com.my/business/corporate/2025/02/1174098/airasia-flies-63mil-passengers-2024-load-factor-89pct).
- ⚠ **25-minute turnaround** — widely cited (AirAsia's low-cost model, case studies) but no primary source read; fallback line "planes back in the air fast".
- ⚠ The coin is a stylised ringgit coin of the period ("1 RINGGIT · BANK NEGARA MALAYSIA · 2001"), not a replica of the 1989-series design (RM1 coins were withdrawn in 2005).
- No faces: Tony Fernandes is named, never shown.

## Script (Kokoro am_michael; "ringgit" respelled "ringghit" for the hard g)

| Line | Beat | Voice (display) |
|---|---|---|
| L01 | Hook | In 2001, Tony Fernandes bought an airline for RM1. |
| L02 | Stakes | It came with two old planes, and RM40 million of debt. |
| L03 | Mechanism | So he cut every cost. No free meals. Tickets sold online. Planes back in the air in 25 minutes. |
| L04 | Twist | Within a year, the debt was cleared. |
| L05 | Payoff | In 2024, AirAsia flew 63 million passengers. |
| L06 | End | RM1. A whole airline. Follow for more hidden business models. |

## Visual — one continuous Three.js world on an airport apron (build/world.src.html)
Locked Style B traits kept (no outlines, two-tone toon, grain, hard light as shape, words/logos on objects). New:
1. **Shadows carry the story** (shadow-only casters): the spinning coin's shadow is an airliner · RM40 MILLION cast
   in shadow across both old planes · noon = no shadow = the debt cleared · the tail fin is a sundial's gnomon, its
   shadow ticks 0→25 MIN · 2024 = the fleet's shadows racing across the apron.
2. **Colour script**: one sun over the film — pre-dawn blue (2001) → dawn rose (debt) → morning beige (work) → white
   noon (cleared) → golden 2024 (AirAsia red is the hot accent; the plane is repainted red tail→nose) → dusk purple.
3. **Motion = sound**: the coin spins like Euler's disk; `build/sfx.py` integrates the same φ(t), so every rattle
   click is the contact point coming round, rising to the settle · split-flap clacks on each flip · sundial ticks.
Logos: AirAsia script (2000s) on the hangar and the repainted plane; the 2020 wordmark on the 2024 board.

## Post (draft)
**Caption:**
```
Tony Fernandes bought AirAsia for RM1 in 2001 ✈️ It came with two old planes and RM40 million of debt. No free meals, online tickets, fast turnarounds: within a year the debt was cleared. In 2024 AirAsia flew 63 million passengers. Would you have taken the deal? 👇  #airasia #tonyfernandes #malaysia #businessmodel #bisnes
```
**Pinned comment:**
```
Sources: AirAsia/Tune Air acquisition, 5 Sep 2001 (RM1, two Boeing 737-300s, RM40m debt); NST Feb 2025 (63 million passengers in 2024).
```
