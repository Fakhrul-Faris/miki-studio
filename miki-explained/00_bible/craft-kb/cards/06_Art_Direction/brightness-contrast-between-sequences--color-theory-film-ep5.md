---
title: Contrast whole sequences by brightness — all-dark colours vs all-bright colours
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/Color Theory in Film — Color Psychology for Directors Ep5.txt"
source_time: "01:47–02:59"
tool_target: shot-list
tier: full
use_when: "planning the episode's colour script: making the problem section and the payoff section feel different at a glance"
style_fit: "⚠ conflict: Style D is a dark room throughout → adapted: keep the dark room, contrast by the brightness of the objects and key light (dim, low-value props for the problem; brighter props/surfaces and wider light pool for the payoff)."
---

## METADATA
06_Art_Direction | film colour | shot list (colour-script column) + raea light/material values

## CREATIVE_INTENT
Brightness affects individual colours, not only overall tone. Technicolor-era films used entirely bright colours; in
darker scenes "you could almost forget the movie was shot in color". One film does both: a greed sequence uses all
darker colours, another scene all bright — "every element you see was chosen for its darker color or lighter color to
create a contrast within the film". Bright images often seem lively and exciting; darker ones dramatic.

## STE_PROCEDURE
1. Before the shot list, split the script into sections by feeling (e.g. problem vs payoff).
2. Assign each section a brightness band: dark-dramatic or bright-lively.
3. Choose every prop and surface colour in a section from its band.
4. Keep the switch between bands at a section boundary, eased over ≥ 0.4 s.
5. Check a contact sheet: sections must separate by brightness at thumbnail size.

## AGENT_EXECUTION
Shot list: add a column "band" (D/B). raea: band D = props' `base_color` value ≤ ~30 %, key light narrow; band B =
lighter props (paper, light wood), key intensity up / wider `outer_angle`, room stays dark. Contact sheet:
```bash
ffmpeg -v error -i preview.mp4 -vf "fps=1/2,scale=135:-1,tile=8x4" sheet.png
```
### Worked example
Topic: "Bayar ansuran BNPL: bila jadi masalah" (everyday money; illustrative numbers).
- BEFORE: every setup the same mid-brightness.
- AFTER: L01–L06 (late fees piling) band D: dark leather wallet, charcoal phone, slips in grey paper, tight key.
  L07–L10 ("cara elak: satu ansuran je sekali") band B: white receipt, light pine counter, wider pool of light; the
  room stays black. The two halves read differently on the contact sheet.
### Check
- Does each section have one brightness band?
- Is every prop in a section chosen for that band?
- Does the switch land on a section boundary, eased?

## NOTES
- Visual gaps: the films in the examples are not named in the transcript (shown on screen) — unknown.
- ~ values inferred. Late fees on BNPL are a real mechanism (providers may charge late fees); amounts kept illustrative.
