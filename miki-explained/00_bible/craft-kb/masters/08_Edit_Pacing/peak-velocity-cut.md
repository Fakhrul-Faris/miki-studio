---
title: Cut or morph at the point of fastest motion to mask the join
bucket: 08_Edit_Pacing
type: master
members:
  - cards/08_Edit_Pacing/match-cut-at-the-fastest-frame--ae-morph-match-cuts.md
  - cards/08_Edit_Pacing/momentum-match-cut-at-peak-speed--mastering-match-cut.md
  - cards/08_Edit_Pacing/peak-velocity-pass-through-hides-impossible-move--three-mograph-techniques.md
sources: ["After Effects Morph Transition with Match Cuts.txt", "Mastering Match Cut Transition.txt", "Three motion graphics techniques for your After Effects projects.txt"]
use_when: "joining two setups where one object becomes another, or a camera flight hands off into B's own motion, or an impossible morph (one coin becomes two) must read as continuous — time the cut/swap to the move's fastest point so the eye can't see the discontinuity"
style_fit: "⚠ conflict: a hard cut/swap is a pop by default. → adapted: both sides of the join ride the SAME eased move (same path/direction/speed), the swap lands within 1–2 frames of the move's speed peak with motion blur on, and the swap lands on a spoken word — so it reads as one continuous move, never a pop. Camera pans stay under ~130°/s regardless of the cut."
---

## METADATA
08_Edit_Pacing | After Effects graph editor / pick-whip parenting (source) → raea shared progress value + conditional render at the peak frame | shot-list join + raea

## CREATIVE_INTENT
A swap, cut, or an otherwise-impossible state change (one coin becomes a token; one coin becomes two; a camera pan
hands off to B's own motion) is hidden by making the change happen exactly where the eye is least able to track
detail: the instant of highest velocity on an eased curve. Because both sides share the same move, "the eye is still
completely fooled" even though far less has actually been animated or built.
- AE morph match cuts adds: give A and B the exact same keyed move (position and/or rotation, parented so B
  literally travels A's path/curve), ease both ends (Easy Ease), find the speed graph's peak (the middle frame for
  symmetric easing), and swap the rendered object one frame after the peak.
- Mastering match cut adds: the two sides don't need to be the same object — A's camera or object move eases in to
  the cut at its speed peak, and B starts with its own motion already running in the same direction at a similar
  screen speed, then eases out to rest on the subject (a "momentum match cut").
- Three mograph techniques adds: for an impossible shape change (two closed circles intertwining, a flat stroke
  becoming two full circles), pull long velocity handles into both extreme keys so the centre of the action is the
  fastest moment, and swap the mesh/state exactly there (within 1–2 frames) — "a very smooth and fast movement"
  solves what a cut alone couldn't.

## STE_PROCEDURE
1. Place object/camera A at its start pose and object/camera B (or B's own motion) at its matching pose or direction.
2. Key A's move across ~1 s (or less), eased in-out (long handles into both extreme keys so the centre is fastest).
3. If B is a different object meant to continue A's exact path, parent B to A (or drive both from one shared progress value) so it travels the identical curve; if B already has its own motion (a conveyor, a scrolling screen), start it running in the same direction at a similar screen speed instead.
4. Read the speed graph (or compute it): for a symmetric in-out curve, the peak sits at the midpoint.
5. Swap the rendered object/state, or make the cut, within 1–2 frames of that peak — never at rest, never linear.
6. Turn motion blur on across the few frames spanning the swap/cut.
7. Pick the peak frame so it also lands on the spoken word (move the curve to meet the word, not the word to meet the curve).
8. Play back at speed before polishing; confirm the swap/cut is invisible.

## VALUES BY SOURCE
| parameter | AE morph match cuts | Mastering match cut | Three mograph techniques | recommended for Style D (+ why) |
|---|---|---|---|---|
| What's being joined | two different objects on one shared path (coin → token) | A's camera/object move → B's own already-running motion | one object's impossible state change (1 coin → 2 coins) | All three are the same mechanism; pick per shot: shared-path swap, momentum handoff, or impossible-state swap |
| Keyed duration | ~1 s (1 s apart; one example at 4 s/5 s) | not specified | not specified | ~0.6–1 s eased window, tuned to the beat |
| Peak location | midpoint for symmetric easing | the move's speed peak (wherever it falls) | midpoint, achieved via long velocity handles | Symmetric in-out ease → midpoint is the peak; use `Easing.inOut(Easing.cubic)` |
| Swap timing | 1 frame after the peak | at the peak | within 1–2 frames of the peak | Within 1–2 frames of peak, snapped to the nearest frame that also lands on the spoken word |
| Motion blur | on, across the cut frames (shutterAngle 0.5, 4 samples) | implied (natural shutter blur outside a bus) | not specified | On, ~4 frames either side of the swap; never a whip-pan blur |
| Camera speed cap | n/a (object move) | eased pan, ⚠ source syncs with a whip-like blur → adapted to stay under ~130°/s | n/a | Camera pans stay under ~130°/s regardless of which variant is used |

## AGENT_EXECUTION
Shot-list: name the shared move and the peak word in both join rows:
`| 7 | "…duit syiling tu jadi token" | coin slides L→R and turns 180° | cut to token at the move's peak frame, on "token" | peak-velocity-cut |`.
raea: one progress value drives both parts; the swap/cut frame is the midpoint of an in-out curve (or the measured
peak, for a momentum handoff):
```tsx
const f = useCurrentFrame();
const A0 = 120, A1 = 150;                                    // 1 s @30 fps; peak = 135 for a symmetric ease
const p = interpolate(f, [A0, A1], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const CUT = (A0 + A1) / 2;
const t = Transform.fromXyz(lerp(-0.12, 0.12, p), 0, 0).withRotation(Quat.fromEuler("XYZ", 0, 0, Math.PI * p));
return (<>
  {f < CUT  && <Model name="coin"  src={staticFile("coin.glb")}  transform={t} />}
  {f >= CUT && <Model name="token" src={staticFile("token.glb")} transform={t} />}
  {f > CUT - 4 && f < CUT + 4 ? <MotionBlur shutterAngle={0.5} samples={4} /> : null}
</>);
```
For a momentum handoff (camera → B's own motion): ease A's camera `interpolate` with `Easing.in` ending at the cut
frame; start B's scene element moving at the matching screen speed from frame 0, easing out to rest on the subject.
For an impossible-state swap: same `interpolate`/`CUT` pattern, conditional render swaps the mesh/state at `mid`.

### Worked example
Topic: "Kenapa kedai dobi layan diri guna token, bukan syiling" chained with "Satu modal, dua gerai" and "Kedai
runcit — kenapa barang laku letak paras mata" (all illustrative; no sales-uplift numbers claimed).
- BEFORE: `| 6 | "Korang masuk syiling 50 sen…" | macro coin | — |` hard cut → `| 7 | "…mesin bagi token" | macro token | token pops in |` — a flat pop, plus a separate unrelated coin→two-coins cut, plus a static shelf-to-product cut.
- AFTER: `| 6 | "Korang masuk syiling 50 sen…" | macro coin on the counter, starts sliding right and turning | coin accelerates on "syiling" | peak-velocity-cut |`
  `| 7 | "…mesin bagi token" | same path continues: token decelerates into frame centre, turn finishes 180° | cut at the peak lands on "token"; accent ring lights the token 0.4 s later | peak-velocity-cut |`
  `| 8 | "Satu modal, **dua** gerai" | macro top-down on one 50 sen coin on a wooden counter | coin slides right, eased in-out over 0.6 s; at the speed peak (on "dua") the mesh swaps to two coins drifting apart, settling under two small stall-roof models | peak-velocity-cut |`
  `| 9 | "…letak **paras mata**" | camera pans left along a shelf, accelerating | cut at peak speed on "paras mata"; a row of packs slides left on the counter at the same speed, easing to stop with the eye-level pack centred, price tag in accent | peak-velocity-cut |`

### Check
- Do both sides of the join share one curve (same path/direction/speed), or does B's own motion match A's screen speed at the handoff?
- Is the swap/cut on the fastest frame (±1–2 frames), never at rest, never linear?
- Is motion blur on across the swap/cut frames (never a whip blur)?
- Does the swap/cut frame coincide with the spoken word?
- Does any camera pan involved stay under ~130°/s?

## NOTES
- Visual gaps: exact AE comp shapes/positions and the bus-pan reference frame are visual only; values given above are the spoken ones.
- AE steps dropped: pick-whip parenting, Alt+[ / Alt+] trimming, graph-editor velocity handles → replaced by raea's
  shared progress value, conditional render at the peak/cut frame, and `Easing.inOut` for symmetric peak placement.
- Object turn speed at the peak can run well above the camera's ~130°/s cap (e.g. 180° in 1 s ≈ 360°/s at the peak)
  — that cap applies to the camera, not the swapped object; keep the camera itself still or slow during the swap.
- "Audio match cut" was named in the Mastering match cut source but not covered there — not included here.
