---
title: Match cut at the fastest frame — two objects share one eased move, cut where the curve peaks
bucket: 08_Edit_Pacing
source: "Motion Feel, Easing & Camera Choreography/After Effects Morph Transition with Match Cuts.txt"
source_time: "01:08–04:00 (square→circle), 04:10–06:41 (match→sword), 06:41–06:57 (any property)"
tool_target: raea
tier: full
use_when: "joining two setups where one object becomes another (coin → token, receipt → phone screen) without a morph rig"
style_fit: "⚠ conflict: a match cut is a hard cut; the house bans pops. → adapted: both objects ride the SAME eased move (position/rotation/scale), the cut sits on the fastest frame with MotionBlur on, so the eye reads one continuous move; the cut lands on the spoken word; no flash/dissolve."
---

## METADATA
08_Edit_Pacing | After Effects (source) → raea `interpolate` + `Easing` + one cut frame | shot-list join + raea

## CREATIVE_INTENT
Instead of tweening a square into a circle (position + Round Corners radius 0 → ~200, "a whole bunch of extra
frames"), give both shapes the same move and cut between them at the move's fastest point. "Exactly the same morph
but with far less information, and the eye is still completely fooled." Match cuts "match either the action or the
subject matter" (2001: A Space Odyssey); here the action — direction and speed — is matched.

## STE_PROCEDURE
1. Place object A at the start pose and object B at the end pose.
2. Key A's position one second apart (source: 1 s; match→sword: keys at 4 s and 5 s) from its pose to B's pose.
3. Optionally key rotation on the same frames (source: match rotates 180° so its head lands where the sword's hilt is).
4. Parent B to A so B travels on exactly the same path and curve (source: pick-whip parent; for several objects use one "master match cut" null).
5. Ease the keys (source: Easy Ease / F9).
6. Read the speed graph; find its peak (fastest frame). With symmetric easing it is the middle frame.
7. End A one frame after the peak; start B on the same frame (source: Alt+] on A, then pull one frame, Alt+[ on B).
8. Play it back; if the swap reads, you are done — any transform works (scale alone, position alone).

## AGENT_EXECUTION
Shot-list: write the shared move in both join rows: `| 7 | "…duit syiling tu jadi token" | coin slides L→R and turns 180° | cut to token at the move's peak frame, on "token" | match-cut-at-the-fastest-frame |`.
raea: one progress value drives both parts; the cut frame is the midpoint of an in-out curve.
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
Pick the cut frame so it also falls on the spoken word (move the curve, not the word).

### Worked example
Topic: "Kenapa kedai dobi layan diri guna token, bukan syiling" (illustrative).
- BEFORE: `| 6 | "Korang masuk syiling 50 sen…" | macro coin | — |` hard cut → `| 7 | "…mesin bagi token" | macro token | token pops in |`
- AFTER: `| 6 | "Korang masuk syiling 50 sen…" | macro coin on the counter, starts sliding right and turning | coin accelerates on "syiling" | match-cut-at-the-fastest-frame |`
  `| 7 | "…mesin bagi token" | same path continues: token decelerates into frame centre, turn finishes 180° | cut at the peak lands on "token"; accent ring lights the token 0.4 s later | match-cut-at-the-fastest-frame |`

### Check
- Do both objects share one curve (same path, same timing)?
- Is the cut on the fastest frame (±1 frame), not at rest?
- Is MotionBlur on across the cut frames?
- Does the cut frame coincide with the spoken word?

## NOTES
- Visual gaps: the exact shapes/positions of the AE comps are visual only; values given are the spoken ones.
- AE steps dropped: pick-whip parenting, Alt+[ / Alt+] trimming, Graph Editor → raea shared progress value + conditional render at `CUT`.
- Object turn speed at the peak is ~2× the average (180° in 1 s ≈ 360°/s at the peak); the ~130°/s cap applies to the camera, not the object, but keep camera still or slow during the cut.
