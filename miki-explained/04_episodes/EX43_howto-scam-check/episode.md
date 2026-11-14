# EX43 — If you want to check whether an investment is a scam (S16 How to)

Status: **preview v2 (2026-11-14, 30 fps, 47.7 s): `out/preview_v2.mp4`, waiting for the user.** Critic on v1: SHIP WITH NOTES (clarity 7, readability 5, craft 6, pace 5, facts 8); all 7 notes fixed in v2. Invented names checked: none on BNM's full FCA list; none on the SC page (partial list).ng for the user.** Board v2 (desk framing, motion audit) → animatic → preview.n (43 s, 46.5 s with end); 13 interface + 5 physical setups; fonts Public Sans + Anton (OFL).nd). Shot list v1 (80 % UI / 20 % physical) waiting for "ok".**
Series S16 How to (main focus from 14 Nov) · opens "If you want to…" · 4 checks · ~45 s · look: Style D (macro objects:
phone, documents, the 997 call) with Style D motion · slot Sun 22 Nov 12:30 · voice: the user (ElevenLabs).

## Facts (✅ read at the official source · 🟡 secondary)

| # | Fact | Source | Strength |
|---|---|---|---|
| S1 | BNM's Financial Consumer Alert List: entities/schemes "wrongly perceived or represented as being licensed or regulated by BNM"; includes "potential clone entity" flags; searchable table; "the absence or subsequent removal of an entity… should not be construed as confirmation that such entity… is licensed"; latest additions dated 3 Aug 2026; BNMLINK 1-300-88-5465 | bnm.gov.my/financial-consumer-alert-list | ✅ |
| S2 | SC's Investor Alert List: "names of unauthorised entities and individuals. You are advised not to deal with or invest through them"; "not exhaustive"; SC also has an Investment Checker and a list of Licensed and Registered Persons; +603-6204 8999 | sc.com.my/investor-alert-list | ✅ |
| S3 | Semak Mule (PDRM CCID): check whether a phone number, bank account number or company name is associated with fraud; semakmule.rmp.gov.my | malaysia.gov.my (official portal page) | ✅ |
| S4 | An empty Semak Mule result is not proof of safety (only reported cases are listed) | ABM, PDRM guidance via several sources | 🟡 (logic of the list; same caveat as S1/S2) |
| S5 | NSRC hotline 997, 24/7 since 3 Mar 2026 (opened 7 Oct 2022): "the quicker victims contact them, the faster Bank Negara can stop funds"; 2025: 146,167 calls, 138,915 accounts frozen, RM34.05m saved from syndicates, RM6.65m returned | The Star, 3 Mar 2026 (Home Minister) | ✅ news, read |

Not claimed: that any listed name is a scam (the lists say "unauthorised"); time to check ("five minutes" removed); legal advice.

## Script draft v1 (~120 words, ≈ 42 s)

Frame-0 text: **SCAM OR NOT? 4 FREE CHECKS.**

| L | Voice | On screen |
|---|---|---|
| L01 | If you want to check whether an investment is a scam, here's how. Four checks, all free. | a glossy "guaranteed 20 % a month" flyer on a desk, the 4-step rail |
| L02 | Check one. Search the company on Bank Negara's Financial Consumer Alert List. If it's there, walk away. | phone: the BNM list, a name typed, a red row |
| L03 | Check two. Search the Securities Commission's Investor Alert List, and its list of licensed firms. Not licensed? Don't invest. | the SC list; a licence stamp missing on the flyer |
| L04 | Check three. Before you transfer, put the bank account or phone number into Semak Mule, the police portal. | a bank slip with the account number → Semak Mule search |
| L05 | But no result doesn't mean safe. It only means nobody has reported it yet. | an empty result card, "not proof of safety" |
| L06 | Check four. If you've already paid, call nine nine seven. It's open twenty-four hours, and the faster you call, the more they can freeze. | a phone dialling 997, frozen-account blocks |
| L07 | In 2025, it stopped thirty-four million ringgit reaching scammers. Which check will you do first? | counter RM34.05m · source The Star / Home Minister |

End text: **WHICH CHECK FIRST?** → sound C + Meikigo logo.

## Design (user 2026-11-14: "80% ui work and 20% physical visual"; frontend-design + ui-ux-pro-max)

- **Idea:** the loud scam flyer vs the calm official lookup. The flyer is the only loud thing in the film.
- **Palette:** ink `#1C2430` · paper `#EEF1F4` · official teal `#1F6F78` · flag red `#D6452E` (listed results only) ·
  scam gold `#E8B53A` (flyer only) · freeze blue `#8EC9F0` (997 only).
- **Type:** Avenir Next for every interface; a heavy condensed face for the flyer; captions stay Outfit (EX39/40).
- **Layout:** in UI scenes the 9:16 frame *is* the phone screen: a slim browser bar with the real address
  (bnm.gov.my, sc.com.my, semakmule.rmp.gov.my) so viewers know where to go; page bodies are my illustrations of the
  tools (search box, results table, empty state), no copied logos or layouts, "illustration" on each. The camera
  moves *inside* the UI (zoom to the search field, pan to the result row) at Style D pace.
- **Example names are invented** ("Profit Emas Club"): never a real company on a list.

## Shot list v1 (18 setups · 13 UI / 5 physical · ≈ 80 % of the time on screens)

| S | Words | Kind | What happens |
|---|---|---|---|
| 1 | "If you want to check whether an investment is a scam, here's how." | 3D | a gold flyer "GUARANTEED 20% A MONTH" lands on a desk beside a phone; frame-0 text **SCAM OR NOT? 4 FREE CHECKS.** |
| 2 | "Four checks, all free." | UI | a checklist card with four rows draws in, one per beat |
| 3 | "Check one. Search the company on Bank Negara's Financial Consumer Alert List." | UI | browser at bnm.gov.my → the alert-list page; the name types into search |
| 4 | "If it's there," | UI | zoom to the result row: it slides in, flag-red |
| 5 | "walk away." | UI | the row stamps LISTED; the tab slides shut |
| 6 | "Check two. Search the Securities Commission's Investor Alert List," | UI | sc.com.my alert list, the same name searched |
| 7 | "and its list of licensed firms." | UI | the licensed-persons search: "no match" |
| 8 | "Not licensed? Don't invest." | UI | the flyer's "INVEST NOW" button greys out and strikes through |
| 9 | "Check three. Before you transfer," | 3D | the phone on the desk: a banking transfer screen with an account number, thumb-free (things move by themselves) |
| 10 | "put the bank account or phone number into Semak Mule, the police portal." | UI | semakmule.rmp.gov.my form: account no. and phone no. type in |
| 11 | "But no result doesn't mean safe." | UI | empty result card; "not proof of safety" |
| 12 | "It only means nobody has reported it yet." | UI | a report counter at 0 with a ticking "first report?" |
| 13 | "Check four. If you've already paid, call 997." | 3D | the phone's dial pad: 9 · 9 · 7 light in turn |
| 14 | "It's open 24 hours," | UI | a 24-hour ring fills |
| 15 | "and the faster you call, the more they can freeze." | UI | a transfer progress bar races; on "freeze" it stops, tiles ice over |
| 16 | "In 2025, it stopped RM34 million reaching scammers." | UI | counter → RM34.05m; small cards: 146,167 calls · 138,915 accounts frozen (source: The Star, 3 Mar 2026) |
| 17 | "Which check will you do first?" | UI | the checklist from 2 returns, all four ticked |
| 18 | end text + sound C | 3D | back to the flyer on the desk (loop); end text **WHICH CHECK FIRST?** |

## Voice text (ElevenLabs v4)

| L | v4 text |
|---|---|
| L01 | If you want to check whether an investment is a scam, here's how. Four checks… all free. |
| L02 | Check one. Search the company on Bank Negara's Financial Consumer Alert List. If it's there… walk away. |
| L03 | Check two. Search the Securities Commission's Investor Alert List, and its list of licensed firms. Not licensed? Don't invest. |
| L04 | Check three. Before you transfer, put the bank account or phone number into Semak Mule, the police portal. |
| L05 | But no result doesn't mean SAFE. It only means nobody has reported it yet. |
| L06 | Check four. If you've already paid, call nine-nine-seven. It's open twenty-four hours… and the faster you call, the more they can freeze. |
| L07 | In twenty twenty-five, it stopped thirty-four million ringgit reaching scammers. Which check will you do first? |

## Sources
- BNM Financial Consumer Alert List: https://www.bnm.gov.my/financial-consumer-alert-list
- SC Investor Alert List: https://www.sc.com.my/investor-alert-list
- Semak Mule (MyGOV): https://www.malaysia.gov.my/en/categories/safety-and-community/cybersecurity/scammer-account-verification-portal
- The Star, 3 Mar 2026: https://www.thestar.com.my/news/nation/2026/03/03/national-scam-response-centre-now-running-247
