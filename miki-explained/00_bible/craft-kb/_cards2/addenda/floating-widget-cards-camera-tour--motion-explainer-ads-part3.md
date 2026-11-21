Target: `../cards/09_UI_Motion/floating-widget-cards-camera-tour--apple-style-ui-ad.md`
Source: "Minimalist Tech & SaaS 3D Staging/Motion Explainer Ads Part 3.md" (12:56–21:02, 39:03–48:16)

## Extra variant: a single logo/UI-element "card" visited by cursor + camera, then a flag/UI-chip carousel on the same rig
This video's first scene is a one-card version of the camera-tour pattern: instead of several feature cards, one glass-
style UI "gloss" panel (logo + highlight sweep template) sits in 3D space; a cursor graphic slides in from below and
"clicks" it (scale-dip keyframes synced to the click), then the camera pushes past it into the next part of the scene —
confirming the same beat (camera/cursor arrives on the card, card's own animation plays, camera moves on) works for a
single hero card, not only a multi-card tour.

Second scene extends the pattern to a **carousel of near-identical cards**: a row of country-flag chips (each a small
UI-card template: rounded rectangle + flag image + label) is built once, then duplicated per flag/country, each chip
linked individually to the group's parent null so the whole row can be panned/revealed together — i.e. the one-template-
per-card rule from the master card, applied to many near-identical small chips rather than a few large feature cards.

VALUES BY SOURCE:
- Cursor click: scale keyframes duplicated with a reduced mid-value (~75% dip) for the press, eased, synced to the card's
  own highlight-sweep animation.
- Flag carousel: each chip = rounded-rectangle + flag image + text, built once and duplicated per country; all chips
  linked to one parent null for shared pan/reveal.

Timestamps: 12:56–14:50 (single logo card + cursor approach), 15:01–18:10 (cursor click scale-dip + camera push-through),
39:03–41:00 (flag-chip template built), 42:02–43:00 (chips duplicated and linked to one null for the carousel row).
