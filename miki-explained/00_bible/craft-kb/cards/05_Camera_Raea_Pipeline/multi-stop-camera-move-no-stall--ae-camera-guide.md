---
title: Multi-stop camera move without the stall at middle keys (chained nulls → additive eased layers)
bucket: 05_Camera_Raea_Pipeline
source: "Motion Feel, Easing & Camera Choreography/Animate After Effects Camera Guide.txt"
source_time: "06:09–07:23, 11:06–11:20"
tool_target: raea
tier: full
use_when: "a camera flight with more than one leg: setup A → pass B → land on C without stopping at B"
style_fit: Serves Style D flights between setups (eased in-out, continuous); AE null-parenting translated to summed eased offsets in raea. Each leg still obeys ≤ ~130°/s and ≤ ~40 m/s.
---

## METADATA
05_Camera_Raea_Pipeline | After Effects (prohibited) → raea Camera3d | raea

## CREATIVE_INTENT
A camera move from one point to another must start from zero acceleration, reach max speed and slow to the end, so every
key is eased. But once a move has **more than two keyframes** on one eased property, the camera "stops completely for a
moment" at each middle key, "which doesn't feel good". The source lists three fixes: (1) separate dimensions and animate
each axis on its own (restricts free movement); (2) parent the camera to a null and move the null; (3) duplicate the null
**4–5 times**, each parented to the one above, one move per null: "as many camera movements as we want without stopping
the camera".

## STE_PROCEDURE
1. Before keying, count the legs of the flight; if more than one, do not put all stops on one eased curve.
2. Give each leg its own offset (one null per leg in AE terms; one vector term in raea).
3. Ease each leg in-out over its own window.
4. Overlap neighbouring windows by ~30–50 % so the next leg accelerates before the previous one settles.
5. Sum the legs onto the base position each frame; the total velocity never reaches zero until the final landing.
6. Keep aim separate (a look-at point with its own eased legs) so turns don't stall either.
7. Check peak speed of the summed move stays ≤ ~40 m/s and ≤ ~130°/s.

## AGENT_EXECUTION
Shot-list: write a multi-leg flight as one row with named waypoints and the word each leg lands on
(`flight: shelf → over receipt (on "harga") → land on tag (on "diskaun")`).
raea (no parenting needed; transforms of `<Entity>` compose, but for a camera sum offsets directly):
```tsx
const e = (a: number, b: number) => interpolate(f, [a, b], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const base: V3 = [0, 0.35, 1.6];
const leg1: V3 = [0.4, -0.10, -0.6]; const k1 = e(0, 36);    // A → B
const leg2: V3 = [-0.2, -0.12, -0.5]; const k2 = e(22, 60);  // B → C, starts while leg1 still moving (overlap 14 f)
const p: V3 = [0, 1, 2].map(i => base[i] + leg1[i] * k1 + leg2[i] * k2) as V3;
const t: V3 = [0, 1, 2].map(i => aimA[i] + (aimB[i] - aimA[i]) * e(0, 40) + (aimC[i] - aimB[i]) * e(26, 60)) as V3;
<Camera3d transform={Transform.fromXyz(...p).lookingAt(t)} projection={{ Perspective: { fov: (40 * Math.PI) / 180 } }} />
```
Avoid `interpolate(f, [0, 30, 60], [A, B, C], { easing })`: the easing applies per segment and stalls at B.

### Worked example
Topic: "Kenapa harga sale kat kedai runcit Shah Alam nampak murah" (illustrative).
Row BEFORE: `| 5 | "Tengok tag lama, then tag baru" | camera keys A→B→C, eased | stops on old tag, then moves | |`
Row AFTER: `| 5 | "Tengok tag lama, then tag baru" | macro flight, two overlapping eased legs: glide past old tag RM12.90 (no stop) → land on new tag RM9.90 on "baru" | old tag dims as the camera passes; new tag's price lights accent on "baru" | multi-stop-camera-move-no-stall |`

### Check
- Does any eased curve in the flight have more than two keys? (should be no)
- Do neighbouring legs overlap so speed never hits zero before the landing?
- Is the aim point eased in legs too?
- Is the peak summed speed under ~40 m/s and ~130°/s?

## NOTES
- AE steps dropped: pick-whip parenting, separate-dimensions toggle. raea translation: summed eased offset vectors (or nested `<Entity>` for objects).
- Related: `masters/05_Camera_Raea_Pipeline/layered-camera-rig.md` (translate/rotate layers); this card adds the stall problem and leg overlap.
- Overlap % is `~` inferred; the source gives no timing values.
