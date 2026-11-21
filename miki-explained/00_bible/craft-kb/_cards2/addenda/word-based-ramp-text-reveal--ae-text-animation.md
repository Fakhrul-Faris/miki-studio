# Addendum → cards/09_UI_Motion/word-based-ramp-text-reveal--smooth-saas-creatorly.md
Source: "Motion Feel, Easing & Camera Choreography/After Effects Text Animation Tutorial.txt" (01:20–04:55)

## New VALUES BY SOURCE row(s)
| parameter | AE Text Animation Tutorial | recommended for raea (+ why) |
|---|---|---|
| entrance offset | x +50 px (from the right), opacity 0 → default | `slide({ from: "right", distance: 50 })` per word, or `rise` for vertical; horizontal reads as "arriving" in reading direction |
| based on | **words**, not characters ("word by word rather than character by character") | per-word spans in `<Stagger>`; never per-letter for spoken lines |
| sweep | range-selector offset 0 % → 100 % over ~1 s | stagger `each` so the line finishes in ~1 s (same as Creatorly) |
| ease | F9 Easy Ease (slow in/out) as base; for "very rapid" feel Quint In + Quint Out (steep graph) | `ease: "out-quint"` per word; in-out-quint only on the whole-line sweep |
| exit | duplicate animator, **opacity only** (position removed); range End keyed 100 % → 0 % between 2 s and 3 s; curve pulled steeper | `exit="fade"` with `exitAt`, ≥ 12 f; the whole line fades without moving |

## Extra steps / variants
- Name animators by job ("start animation", "end animation") so entry and exit stay separate and editable.
- Exit variant: fade only, no position — calmer than Creatorly's exit-up; use when the next setup is a cut on the word rather than a new line.
- AE dropped: Motion Bro ("mobar") easing presets, range selector — translated to raea named moves.
