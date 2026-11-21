---
title: Animate slowly with long holds, then cut the holds out for a punchy sequence
bucket: 08_Edit_Pacing
source: "Minimalist Tech & SaaS 3D Staging/Apple-Style 3D Motion Design.txt"
source_time: "17:33–18:03 (method), 30:42–31:32 (pre-compose and cut), 31:36–32:18 (scale accents on the joins)"
tool_target: shot-list
tier: full
use_when: "a setup whose moves feel sluggish in the animatic; tightening a 3–4 s setup to the voice without re-animating"
style_fit: "⚠ conflict: hard 'quick dynamic jumps' can read as rushed/flashy cuts → adapted: cut only where the motion carries through, keep every remaining beat ≥ 0.4 s, eased accents on the joins, no jump-cut stutter."
---

## METADATA
08_Edit_Pacing | After Effects (source) → raea `edit={{ segments }}` / Sequence time remap | shot-list, raea

## CREATIVE_INTENT
Scene 4's "pretty dynamic" final feel came from a trick: "I first made a much simpler animation with longer pauses
between the movements. Then I pre-composed the entire scene and cut it up, removing the unnecessary pauses. That's what
creates these quick dynamic jumps." The joins are then smoothed with scale accents: the outgoing section scales on an
accelerating curve (100 left / 0 right), the incoming one on the opposite (0 / 100).

## STE_PROCEDURE
1. Block the setup as calm, separate moves with long holds between them.
2. Finish the full setup (all moves, texts, lights) before any cutting.
3. Pre-compose (render as one unit), then cut out the holds between moves.
4. Before removing a hold, check the move before and after it are each still ≥ 0.4 s.
5. On each join, key a small scale accent: outgoing part accelerates (ease-in), incoming part decelerates (ease-out).
6. Play the whole sequence with the voice; restore a hold where a word needs time to read.

## AGENT_EXECUTION
Animatic stage (before preview): mark holds in the camera map; tighten by trimming them, not by speeding the moves.
raea: a person's hand trim already comes back as `<Composition … edit={{ segments: [[0, 412], [430, 3285]] }}>` (raea
SKILL); use the same segments to drop holds from a setup. Join accent:
```tsx
const out = k(f, cut - 6, 6, Easing.in(Easing.cubic)), inn = k(f, cut, 8, Easing.out(Easing.cubic));
const s = f < cut ? lerp(1, 1.03, out) : lerp(1.03, 1, inn);   // ≤ 3 % accent, hides the join
```
Shot-list note column: `holds trimmed: 0:41–0:52, 1:10–1:18; join accent 3 %`.

### Worked example
Topic: how a 3-step "beli 2 percuma 1" check works (count × price arithmetic; illustrative).
- BEFORE: tag turns, holds 1 s, slides, holds 1 s, rotates — the animatic drags behind the voice.
- AFTER: same three moves, holds cut; each move still ≥ 0.5 s, joins carried by a 3 % scale accent; the setup now fits
  "tiga barang, bayar dua" in 2.6 s.

### Check
- Is every remaining move ≥ 0.4 s?
- Does each join cut on motion (no visible stop-start stutter)?
- Is the join accent ≤ ~3–5 % and eased?
- Can every on-screen word still be read before it leaves?

## NOTES
- Visual gaps: which frames were removed and the accent amounts are shown on screen only.
- AE dropped: pre-compose + layer split; translated to raea segments / Sequence offsets.
