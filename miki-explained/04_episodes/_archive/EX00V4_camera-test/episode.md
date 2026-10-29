# EX00V4 — camera test (2026-10-28)

A/B/C/D on EX02V2's two camera moves (pull-back 28.3–30.1s, push into the green lamp), from the motion-explainer
camera-moves study. Built headless on copies of EX02V2: `effectcraft-cli script build/cam.jsx` with `VARIANT` prepended.

| | Change | Result |
|---|---|---|
| A | as built: linear CAM scale keys + `soft()`, push 24% → 2600% in 0.95s | push lurches: 38.6 doublings/s on its first frame, 94% of the zoom in the first half |
| B | log-space zoom + cubic ease-in-out, same times | smooth hump, peak 20.4 doublings/s mid-move |
| C | B + the field of signals in depth (z = 0.1 × grid distance) | dolly parallax: far signals lag; random depths overlapped, K = 0.25 shrank the field |
| **D** ✓ | C + push 30.25 → 31.75s (1.5s) | peak 12.8 doublings/s. **Chosen by the user**; now in EX02V2 and the kit (`camMove`, `depth`) |

Trap found: `.parent =` in a script compensates under a scaled parent (effectcraft-notes #32).
Review files (gitignored): `review/compare.mp4`, `review/speed.png`, `review/stills/`.
