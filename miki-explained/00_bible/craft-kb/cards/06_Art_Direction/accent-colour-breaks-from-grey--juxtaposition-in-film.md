---
title: Colour and light juxtaposition — the one coloured thing in a grey world marks the change; light vs shadow marks the conflict
bucket: 06_Art_Direction
source: "Studio Lighting, Silhouettes & Color Theory/What is Juxtaposition in Film — How to Take Visual Storytelling to the Next Level.txt"
source_time: "06:16–07:22"
tool_target: frame-brief
tier: full
use_when: "deciding where the accent goes on a turning-point line; a 'good vs bad deal' line"
style_fit: "Exactly our one-accent rule, with a reason: the accent appears where something has changed or broken from the norm."
---

## METADATA
06_Art_Direction | general (film) | frame brief "Eye/Decision" + colour script

## CREATIVE_INTENT
In *Pleasantville*, colour inside a largely black-and-white palette shows a character "has started to think for
themselves rather than adhere to the grayscale conformity". In *Star Wars*, two lightsaber colours mark two sides; "when
the colors are in the same space conflict is imminent". Lighting juxtaposition: highlights opposed to shadows (film noir,
chiaroscuro) create mystery; in *Lord of the Rings* they represent good vs evil, and placed together "the audience expects a
tonal shift or a conflict".

## STE_PROCEDURE
1. Keep the frame neutral (greys, real surface tones) by default.
2. Before adding the accent, name what has changed or broken from the norm on this line.
3. Put the accent only on that thing, at the moment it changes (fade in ~0.4 s on the word).
4. For a two-sided conflict, split the frame into lit and shadowed halves, one side per party; keep colour to one accent.
5. Check across the episode: the accent's appearances trace the turning points.

## AGENT_EXECUTION
Frame brief: Eye = the accented item; Decision = "neutral frame; accent arrives on <word>". raea: animate
`emissive`/`base_color` of the one part from neutral to the accent hex over 12 frames at the word.

### Worked example
Topic: "Satu kedai je yang naik harga — kenapa ramai tetap beli?" (illustrative).
- BEFORE: a row of 5 coloured stall price boards, all saturated.
- AFTER: `| 6 | "Semua gerai RM8… satu je RM10" | dolly along 5 grey price boards under a soft top light | on "satu je", the fifth board's "RM10" turns accent over 0.4 s | accent-colour-breaks-from-grey |`

### Check
- Is the frame neutral before the accent arrives?
- Does the accent mark exactly the thing that changed?
- Is there still only one accent colour (two-sided conflict = light vs shadow, not two colours)?

## NOTES
- ⚠ Star Wars' two colours → adapted: two sides shown by light vs shadow, because the house allows one accent.
- Related: cards/06_Art_Direction/accent-colour-tracks-the-arc--60-30-10-color-rule.md.
