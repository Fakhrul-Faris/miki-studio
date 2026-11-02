# EX16 — Out of Turn

Status: story ✓ → script ✓ → voice ✓ → preview ✓ → build ✓ → **final ✓ (2026-11-02)** → posted
Voice: Nathan, narrator, `v4k7NzxipnuJNJtrKxob`
Calendar: Day 14, Fri 13 Nov 2026, 21:00

Lane: The Invisible Queue (P11) · Topic type: everyday thing nobody questioned
Hook pattern: H1 data at frame 0 (the number opens the frame)
Named concept: **Sorted by how sick, not when** (title card at Twist/Payoff)
**Bridge: off** (`experiments.md` § 9 BR-off test, user 2026-11-02: "skip Klang or back to business, serve the masses
first"). No shop turn in the video — the episode ends on Payoff → End → Follow, general-audience, nobody's queue named.
Any shop tie-in lives only in the caption/pinned comment, not on screen or in the voice.

**Style:** house format, smooth isometric (`isokit.py`). Setting is a generic Malaysian government hospital emergency
department — no real hospital's name or branding.

## Angle check (`00_bible/script-formula.md` § Angle check)

`03_ideas/experiments.md` § 14: EX13, EX14 and EX15 are all **Anthropological** (a felt moment, then the twist that
it's deliberate). Three in a row, so EX16 takes the other angle instead of defaulting back.

- **Anthropological draft (rejected):** "The emergency room doesn't see you in the order you arrived. It never did." →
  felt moment first, numbers held until Payoff. This was the first draft and it's the obvious one — it's the same
  shape as the last three episodes wearing a different topic.
- **Analytical draft (kept):** "71.8 percent. That's how many major Malaysian hospitals now get you a ward bed within
  eight hours." → the number opens the frame, the breakdown explains it, a second number closes the "so what." Rotates
  both the angle and the hook type (H1, last used EX13; EX14 was H2, EX15 was H3).

## Sources

- Triage sorts patients by medical severity, not arrival time; a patient who arrives later but is sicker is seen first —
  general emergency-medicine principle (Emergency Severity Index overview, [ScienceDirect](https://www.sciencedirect.com/topics/nursing-and-health-professions/emergency-severity-index)).
- Malaysia's Ministry of Health replaced the old three-tier triage system with the five-tier **Malaysian Triage Scale**
  in 2026: Level 1 (Resuscitation) down to Level 5 (Routine) — [Malay Mail, 3 Jul 2026](https://www.malaymail.com/news/malaysia/2026/07/03/moh-overhauls-emergency-triage-system-with-new-fivetier-malaysian-triage-scale-to-improve-assessments-and-cut-delays/226223).
  ⚠ Only Levels 1 and 5 are named in the source; Levels 2–4's exact names and minute targets weren't confirmed to a
  primary source, so the script doesn't quote them.
- MOH's reason for the overhaul, in its written reply to Parliament: the new scale "ensures a much more specific
  segregation of cases, reduces unnecessary overcrowding, and ensures that chronic patients do not fall through the
  cracks." — same source.
- "71.8% of major government hospitals recorded average waiting times of less than eight hours for emergency department
  patients awaiting ward admission as of June [2026]," up from 55.26% in 2025 — Health Minister Dzulkefly Ahmad,
  [The Sun, 2026](https://thesun.my/news/major-govt-hospitals-emergency-waiting-time-target/).
  ⚠ This is the wait for a **ward bed after admission**, not the triage-to-treatment time itself; the script keeps that
  distinction.
- Of the smaller Type 3/4 hospitals, 94 of 103 (91.3%) averaged under four hours for the same measure — same source.
  Now used (L05), previously held back for a caption only.

## Script (L2 standard; target ~140 words / ~48 s)

| Line | Beat | Voice |
|---|---|---|
| L01 | Hook | 71.8 percent. That's how many major Malaysian hospitals now get you a ward bed within eight hours. |
| L02 | Stakes | Last year it was fifty-five point three. The difference isn't more beds. It's who gets sorted first. |
| L03 | Mechanism | Hospitals don't queue you by when you arrived. They queue you by how sick you are. This year the Health Ministry rebuilt the whole scale: five levels, Resuscitation down to Routine. |
| L04 | Twist | Why rebuild it? Officials said the old system let chronic patients fall through the cracks. The new one catches them first. |
| L05 | Payoff | Smaller hospitals do even better. Ninety-one point three percent now average under four hours. Sharper sorting, not more capacity. |
| L06 | End (reframe) | Being called out of turn isn't unfair. It means the sorting is working. |
| L07 | Follow | Follow Meikigo for more. (reuse an earlier episode's L08) |

Word count: 122 (numbers spoken in full) · Checklist score: 6/7 (Bridge item not applicable, Bridge off)
- Sound-off hook ✓ ("71.8%" on screen at frame 0) · one idea (sorted by severity, not arrival), one comparison (this
  year vs last year's wait, not a shop analogy)
- Twist ✓: a viewer assumes faster wards meant more beds/money → it's the same beds, sorted smarter
- Numbers: 71.8%, 55.3%, five levels, 91.3% (four, all sourced) · Bridge off — no shop named on screen; general queue
  behaviour only, "serve the masses" (user, 2026-11-02)
- End: reframe (EX13 reframe, EX14 callback, EX15 "next time", EX16 reframe — rotates back without repeating EX13's
  wording) · a stranger can retell it ("Malaysian ERs got faster by sorting smarter, not by adding beds")
- No vague intensifiers (checked against the new Writing rule) · Honesty: 71.8%/55.3%/91.3% are the **ward-bed wait**,
  not triage speed; L02 states that distinction in-line

## Scene brief (device log check: `03_ideas/experiments.md` § 13)

Last 2 episodes' hero devices: EX14 = a path that draws itself; EX15 = a conveyor belt. Neither fits here, so:

- **Hero device (new): a reflow/resort queue.** Pictogram patients stand in a line in arrival order. As each is triaged,
  a coloured severity badge appears over their head and they **physically jump queue position** by severity, not by how
  long they've waited — the camera holds long enough that the reordering itself is the thing to watch.
- **Supporting devices:** an arc gauge sweeping to 71.8% at frame 0 (the Hook's number, landing immediately — new use;
  EX14/EX15 both used a roll-up counter instead, so this episode uses the gauge for the *lead* number and retires the
  counter a second episode running); a second, smaller gauge beside it for 55.3% (the Stakes comparison); floating
  severity badges pinned above each patient as they're triaged (new use of `pin()` — on a moving figure, not a static
  world point like EX15's signage); a five-level legend built as a vertical bar diagram; a third small gauge for 91.3%
  at Payoff. No Bridge scene (Bridge off) — the hospital floor is the only setting, held a few seconds longer at the
  end instead of cutting away to a shop.
- **One surprise:** the patient who arrived first and looks calm and fine has a small wait-time counter pinned above
  them that keeps climbing, visibly, through every beat, while more urgent patients keep cutting in front — the
  anomaly is that the "normal-looking" person is the one the frame keeps drawing you back to.
- **Reveal beat:** L01, frame 0 — the Hook's number (71.8%) lands immediately, on the gauge, before the world has even
  resolved into the hospital floor (Analytical angle: number first, everything after explains it). The Twist's number
  (91.3%, L05) lands as a second, smaller reveal, not a repeat of the same device at the same size.
- **Silhouette check:** to run once the hero queue is built — the badge colours must read as distinct dots even at small
  size; if two badge colours look the same stripped of hue, raise the brightness gap between them, not just the hue gap.

## Shot list (one isometric world, one camera, 60 fps)

| Shot | Starts on | What we see (world + device) | Camera |
|---|---|---|---|
| 1 | L01 frame 0 (already moving) | An arc gauge sweeps to 71.8%, alone in the dark | push in on the gauge, already sweeping at frame 0 |
| 2 | "ward bed" | The gauge resolves into the ED floor: a waiting line in arrival order, a triage desk at the front | pulls back from the gauge into the iso world |
| 3 | "Last year" | A second, smaller gauge appears beside the first, sweeping to 55.3%, visibly shorter | holds on both gauges |
| 4 | "sorted first" | The patient two back from "you" is pulled from the line first; a red badge appears over them | push in on the triage desk, holds on the reorder |
| 5 | "Health Ministry" | Legend card builds beside the desk: five bars, Resuscitation (tall, red) down to Routine (short, green) | camera drifts along the legend |
| 6 | "rebuild it" | A ghost line (the old 3-tier version, thinner, grey) dissolves and reforms into the 5-level line | match cut: old legend → new legend |
| 7 | L05 "91.3 percent" | A third, smaller gauge sweeps in beside the first two, fullest of the three | pulls back to frame all three gauges |
| 8 | L06 | Back to shot 2's framing (seamless loop); "you", the first-arrival patient, is finally called — their wait counter stops | pulls back to the waiting line, holds (no cutaway — Bridge off) |
| 9 | L07 | Follow card: Meikigo logo + "Follow Meikigo for more." | — |

## Experiments

Scr L2 (122 w) · **Bridge off** (general audience, no shop named — user 2026-11-02) · H1 data at frame 0 · E1 one
unbroken take · C iso camera · A smooth 60 fps · S1 seamless loop · T caption panel · END-reframe · V3 smooth isometric
(3rd episode) · **Analytical angle** (breaks EX13–EX15's Anthropological run, § 14)

**Note for § 9 (Bridge presence):** this is the first episode run Bridge-off since the rule existed as a tested
variable rather than the default. Compare its retention against EX12–EX15 (all Bridge-on) once posted — specifically
whether cutting the shop turn costs or helps 3 s retention and % watched full, per § 9's original question.

## Voice

`how-i-generate.md` (six lines; L07 reuses an earlier episode).

## Build (v2 remake, 2026-11-02)

User rejected v1 ("too simple, similar to previous episode which don't prove the point"; v1 kept as
`build/episode_v1.py`). v2 world (`build/episode.py`, on `tools/blender/isokit.py`):
- **Hero:** a 10-floor cutaway hospital, 100 beds; 71.8% = 72 beds light green in a wave from the first bed; 17 go dark
  for "55.3"; the same beds relight on "sorted first" (no new floors: "isn't more beds").
- **Mechanism:** a floating sorter plaza; one queue splits into 5 lanes (resuscitation short and green, routine a long
  switchback); badges light at the splitter.
- **One surprise, the metaphor made literal:** the old 3-lane sorter; tiles fall away under a cold spotlight and a patient
  drops into the dark on "fall through the cracks"; the gaps close and the next patient is caught.
- **Payoff:** a small clinic, 91 of 100 beds light; a slow pull-out over the lit campus at night under the follow card.
- **Light:** night, warm ceiling strips, green practicals, compositor bloom. Near-level camera (tilt 72-76) on the tower:
  at iso elevation the slabs hid every bed.
- **Sound:** earshot's free code bank (`sfx/es_*.wav`); `earshot sheet --cues`: 11/11 cues have an onset within 100 ms,
  27% land as strong accents (EX15's published mix: 67%, one inaudible).
- Export: `export/EX16.mp4`, 37.7 s, 60 fps, -19.1 LUFS. Checked: per-frame difference (largest change is the deliberate
  swoop from the tower down to the sorter at ~11 s; calm ending), full frames on every pinned label and caption block.
- Status: final for review; not yet watched in real time with sound.

## Post

Caption stays general, matching the video (Bridge off); the shop tie-in lives only in the pinned comment, per
`series-plan.md`'s "CTA lives in the pinned comment" — user confirmed 2026-11-02.

**Caption:**
```
The ER doesn't see you in the order you arrived. It never did. 🏥

Malaysia rebuilt its hospital triage system this year: five levels, from Resuscitation down to Routine, sorting by how sick you are, not when you walked in.

It's working. 71.8% of major government hospitals now get patients a ward bed within eight hours, up from 55.3% last year. Smaller hospitals do even better: 91.3%.

Being called out of turn isn't unfair. It means the system is working.

#malaysia #hospital #emergencyroom #triage #howthingswork
```

**Pinned comment:**
```
Ever wonder if your own queue should sort by urgency instead of arrival order? DM "SORT" and we'll show you how.
Sources: Malay Mail, 3 Jul 2026 (MOH's Malaysian Triage Scale overhaul — five levels, the "fall through the cracks" quote); Health Minister Dzulkefly Ahmad via The Sun, 2026 (71.8% / 55.26% / 91.3% figures — these measure the wait for a ward bed after admission, not triage speed itself).
```

- Turn on the AI-generated content label (synthetic voice, code-built graphics).
- Posted: _date_ · Link: _

## Before posting

- [ ] Sources quoted, open facts resolved
- [ ] Credit + sources in the pinned comment
- [ ] AI-generated content label (voice is AI)
- [ ] No real hospital name or branding in the picture
- [ ] Caption stays general (Bridge off); shop CTA only in the pinned comment
- [ ] TikTok safe area checked
- [ ] Silhouette check logged in `experiments.md` § 13
- [ ] Watched at full speed with sound
