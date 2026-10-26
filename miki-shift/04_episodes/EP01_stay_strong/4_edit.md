# EP01 — Stay Strong — Edit sheet

**Episode:** MIKI'S SHIFT #01 · 1080×1920 · 30fps · ~23s
**Inputs:** `stills/F01–F12.png` · `audio/L01–L06.wav` · `06_sfx/` · notification screenshots (below) · `00_bible/overlays.md`
**Times are targets** — slide them to the rendered audio, but keep frame order and hold lengths.
**Sound IDs (S01–S10) and mix levels:** `3b_sound.md`.

## Timeline

| In | Out | Frame | Move | Audio | SFX | Phone screen |
|----|-----|-------|------|-------|-----|--------------|
| 0.0 | 2.0 | **F01** MS wiping | push 100→106% toward phone | — | S01 S02 · S03 @0.4 | Lock screen, **N1** slides in @0.4 |
| 2.0 | 3.2 | **F02** "oof" wince | hold 106→110% | — | S02 | N1 |
| 3.2 | 5.4 | **F03** phone close-up | push 100→108% | — | S03 @3.8 | N1, then **N2** slides in under it @3.8 |
| 5.4 | 7.2 | **F04** pity → customer eating cake | slow pan toward the customer 4% | — | S07 · S08 @7.0 | — |
| 7.2 | 8.8 | **F05** customer arrives | push 100→105% | L01 | — | N1 + N2 small on the stand phone |
| 8.8 | 11.0 | **F06** "It's on me" | push 100→108% | L02 | — | — |
| 11.0 | 12.2 | **F07** customer delighted | push 100→106% | L03 | S09 @11.0 | — |
| 12.2 | 13.4 | **F08** grave nod | push 104→110% | L04 | — | — |
| 13.4 | 15.6 | **F09** customer grateful | push 100→105% | L05 | — | — |
| 15.6 | 17.0 | **F10** unplugging his phone | push 100→106% | — | S04 @16.0 | N1 + N2 |
| 17.0 | 20.0 | **F11** "Stay strong" | push 100→110%, last 0.8s faster →115% | L06 | S10 @19.2 | N1 + N2 — the audience reads it one last time |
| 20.0 | 23.0 | **F12** empty stand, he watches the door | very slow push 100→104% | — | S05 @20.0 · S06 | — (phone is gone) |
| 23.0 | — | hard cut → loops to F01 | — | — | — | — |

### Timing rules that protect the joke
- **Each notification is readable ≥ 1.5s** before anything else happens — F03 carries the read.
- **F04 must land before the customer speaks.** If the audience doesn't know whose phone it is, nothing after works.
- **L01 plays over F05 with the notifications still visible on the stand phone** — he's cheerful, we know.
- **F11: hold ≥ 0.8s after "Stay strong" ends** before cutting to F12.
- **F12 is silent** except the door bell. No music, no sting.
- If total runs long, trim F05 and F09 first. Never trim F01, F03, F04, F11, F12.

## Phone screens — stock notifications

Rule: stock lock screen only (`../../00_bible/overlays.md`). Screen-replace onto the blank phone in each frame.

| Name | Content (as the OS shows it) | How to make it |
|------|------------------------------|----------------|
| **N1** | Messages · **Babe ❤️** · "We're done." | Real phone: save a contact as `Babe ❤️`, text yourself "We're done." from it, screenshot the lock screen |
| **N2** | **PayLater** · "Payment overdue" · "Your payment of $87.40 is overdue." | Fictional app, so build it in the official iOS (or Android Material) UI kit with stock layout, font and spacing — only the text and a plain app icon change |
| **Lock screen** | Stock wallpaper, stock clock, no widgets | One screenshot per state: N1 only, N1 + N2 |

Notifications appear with the stock slide-in, never a custom pop or scale.

Subtitles, safe zones: `../../00_bible/overlays.md`.
Subtitle text = caption column of `3_voice.md`. Notification text is never subtitled.

Export settings: `../../00_bible/overlays.md` → Export. Files go in `export/`.
