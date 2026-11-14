# EX42 — Touch 'n Go: one number (S13 One number)

Status: **script v1 (2026-11-14) waiting for the user.** User picked option 1 (RM43) after the float proved unpublished.
User's answers (RECIPE § 0.1): number = the float; look = Style C painted (raea, EX30) with Style D motion; ~40 s; number at
frame 0 with its source. Slot: Sat 21 Nov 12:30 (shuffle #4).

## What exists (✅ read at source · 🟡 secondary · ✗ not found)

| # | Fact | Source | Strength |
|---|---|---|---|
| T1 | E-money liabilities (the float, all issuers) grew from RM500m to RM1.6b over five years to 2021 | BNM exposure draft, reported by The Edge, 11 Jun 2021 | 🟡 (old; industry-wide, not TnG) |
| T2 | TnG eWallet's own float / trust-account balance | — | ✗ not published (searched TNG news, The Edge cover story, BNM AR2025) |
| T3 | E-money funds must sit in a trust account at a licensed bank, used only for refunds and payments to merchants; investment limited to high-quality liquid ringgit assets | BNM E-money policy document (31 Jan 2025), via law-firm summaries | 🟡 (read the PD itself before scripting) |
| T4 | 2025: 6.37b e-money transactions worth RM272.5b; average RM43 (2024: RM33); 123.8m network-based e-money accounts at end-2025 | BNM AR2025 / payment statistics, via fintechnews.my, Bernama | 🟡 RM43 read in AR2025 p.72 ✅; the rest not found in the AR text yet (likely the statistics tables) |
| T5 | TnG eWallet: 24m+ verified users; RM16b+ payments a month | TNG Digital (company), via search summary | 🟡 company figures |

## Options for the one number
1. **RM43**: the average e-money payment in 2025, up from RM33 (BNM AR2025, read). Story: e-wallets moved from tolls and teh tarik to bigger spends.
2. **The float as a mechanism, no figure**: "your balance sits in a trust account" (T3), with T1 as the only number (2021, labelled).
3. **24 million users** (company figure) → how free transfers still make money.

## Facts used (option 1, user 2026-11-14)

| # | Fact | Source | Strength |
|---|---|---|---|
| N1 | Average e-money transaction RM43 in 2025 (2024: RM33): "growing user confidence, not just for daily spending such as transport, food and beverages, but also for higher-value payments… micro-financing, money-market fund investment and micro-insurance/takaful" | BNM Annual Report 2025, p. 69 (pdf p. 72), read | ✅ |
| N2 | E-money = e-wallet (71%) + prepaid card (29%) of e-money transactions; 6.4b e-money transactions in 2025 (2024: 5.0b) | BNM AR2025 Diagram 1, p. 70, read | ✅ |
| N3 | Each Malaysian made 538 e-payments in 2025 (2024: 432) | BNM AR2025 p. 69, read | ✅ |
| N4 | GO+: a money-market investment in the TNG eWallet, anchored on the Principal e-Cash Fund (Principal Asset Management), from RM10, returns credited daily, cash-out to a bank; live 29 Mar 2021 | Principal Malaysia press release, read | ✅ (returns not guaranteed: on screen) |

Not claimed: TnG's float or share of e-money; GO+ return rates; that RM43 is TnG's own average.

## Script v1 (~115 words, ≈ 37 s + end)

Frame-0 text: **RM43.** · small: "average e-money payment, 2025 · Bank Negara" · TnG logo.

| L | Voice | On screen |
|---|---|---|
| L01 | Forty-three ringgit. That's the average payment Malaysians made with an e-wallet or a prepaid card like Touch 'n Go, last year. | RM43 on a painted toll-card / phone, the number at frame 0 |
| L02 | The year before, it was thirty-three. | counter RM33 → RM43 |
| L03 | E-wallets started with tolls, parking and teh tarik. Small money. | painted toll gate, parking meter, a glass of teh tarik, coins |
| L04 | Now Bank Negara says people use them for bigger things: small loans, insurance, and investment funds. | three bigger objects slide in: a loan slip, an insurance card, a fund chart |
| L05 | In Touch 'n Go, that's GO+. Your balance goes into a money-market fund and can earn a little every day. | the wallet balance pours into a jar labelled GO+, a small daily tick; "returns not guaranteed" |
| L06 | And Malaysians made five hundred and thirty-eight e-payments each last year. | counter 432 → 538, one tap per… |
| L07 | Your e-wallet isn't a toll card anymore. It's where your money lives. | back to the phone/card from frame 0 |

End text: **HOW MUCH SITS IN YOURS?** → sound C + Meikigo logo.

## Voice text (ElevenLabs v4)

| L | v4 text |
|---|---|
| L01 | [matter-of-fact] Forty-three ringgit. That's the average payment Malaysians made with an e-wallet… or a prepaid card like Touch 'n Go, last year. |
| L02 | The year before, it was thirty-three. |
| L03 | E-wallets started with tolls, parking, and teh tarik. Small money. |
| L04 | Now Bank Negara says people use them for BIGGER things: small loans, insurance, and investment funds. |
| L05 | In Touch 'n Go, that's GO-plus. Your balance goes into a money-market fund… and can earn a little every day. |
| L06 | And Malaysians made five hundred and thirty-eight e-payments each, last year. |
| L07 | Your e-wallet isn't a toll card anymore. It's where your money lives. |

## Sources
- BNM Annual Report 2025: https://www.bnm.gov.my/documents/20124/21185005/ar2025_en_book.pdf
- Principal Malaysia, GO+ release: https://www.principal.com.my/index.php/en/touch-n-go-ewallet-enters-mainstream-financial-services-sector
- The Edge, 11 Jun 2021 (e-money liabilities): https://theedgemalaysia.com/article/bnm-emoney-liabilities-have-grown-significantly-rm500m-rm16b
