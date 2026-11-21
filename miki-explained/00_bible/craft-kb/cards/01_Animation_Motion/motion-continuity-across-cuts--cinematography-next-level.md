---
title: Motion continuity across cuts (and when to break it)
bucket: 01_Animation_Motion
source: "Take your Blender Cinematography to the Next Level!.txt"
source_time: "05:57–07:11"
blender_version_source: 3.x (concept, tool-agnostic)
tool_target: principle-only
tier: full
style_fit: directly serves Style D's new-setup-every-2–3 s rhythm — carries direction across setups so hard cuts on words feel like one flow
---

## METADATA
01_Animation_Motion | n/a | principle-only (applies to Blender keys and raea camera curves)

## CREATIVE_INTENT
Keep movement flowing from one shot into the next even when the camera angle changes completely (shot A: camera and product
move down with some rotation; shot B, a new angle, continues downward). Hold it for 2–3 shots, then break the pattern: a new
direction, a static "breather" shot, or a deliberately opposite move (up then down) for a contrast that grabs attention.
Overall motion should be wave-like — fast parts, slow parts, a mix.

## STE_PROCEDURE
1. Before cutting, note the outgoing shot's screen-space motion direction (e.g. down + rotation).
2. Start the next shot already moving in that same screen direction, from its new angle.
3. Continue the shared direction for 2–3 shots at most.
4. Break the pattern: change direction, or insert one static shot as a rest beat.
5. For emphasis, use an opposing move (previous up → next down) at a key line.
6. Do not overuse any of these; alternate fast and slow sections in a wave.

## AGENT_EXECUTION
- Plan it in the shot list: give each setup a `dir_in` / `dir_out` column (screen-space: up/down/left/right/push/pull/roll).
- raea: a cut is one camera whose transform jumps at the cut frame; give the next setup's first frames the same
  screen-space velocity sign:
```tsx
// shot A (f 0–59): camera descends; shot B (f 60–119): new angle, still descending
const camA = Transform.fromXyz(0, interpolate(f, [0, 59], [0.6, 0.4], { easing: Easing.in(Easing.sine), extrapolateLeft: "clamp", extrapolateRight: "clamp" }), 1.4).lookingAt([0, 0.1, 0]);
const camB = Transform.fromXyz(1.0, interpolate(f, [60, 119], [0.5, 0.25], { easing: Easing.out(Easing.sine), extrapolateLeft: "clamp", extrapolateRight: "clamp" }), 0.9).lookingAt([0, 0.05, 0]);
<Camera3d transform={f < 60 ? camA : camB} projection={{ Perspective: { fov: 0.6 } }} />
```
  (A eases *in* toward the cut and B eases *out* from it, so the motion carries through the cut instead of stopping dead
  on both sides.)
- Blender: same idea on the camera F-Curves — keep the last key of shot A and the first key of shot B with matching
  non-zero slope (Graph Editor handles), not flat ease handles at the cut.

## NOTES
- Deprecated: none.
- Visual gaps: the illustrating shot pair (Not Important Studios' product animation) is visual only.
- Rule conflicts: "opposing motion for contrast" must still be smooth eased moves — never a snap-back push or whip. Each
  shot's own start (the first shot of a sequence) and the last move before a hold still ease in-out.

## ADDENDUM — Apple-Style 3D Motion Design
Source: "Minimalist Tech & SaaS 3D Staging/Apple-Style 3D Motion Design.txt" — 01:35–02:21, 12:16–12:55, 20:46–21:40, 30:06–30:37.
- Parent everything in the outgoing scene to one carrier (null/Entity); animate its scale + position on a curve that
  goes "100 left / 0 right" — slow start, accelerating into the cut ("the animation speeds up here").
- The incoming scene opens on the matching "0 left / 100 right" curve (full speed in, long settle) — "it feels like
  the same text even though these are two separate scenes".
- The incoming 3D scene can also start slightly smaller and rotated a little, settling on the same 0/100 curve, to
  help it feel connected to the previous scene; shift keys a frame or two to fine-tune.
- Check every transition at once in the master composition before moving on.
| parameter | Apple-Style 3D Motion (AE) | recommended for Style D |
|---|---|---|
| out-curve | influence 100% / 0% on carrier scale + position | `Easing.in(cubic)` last 8–12 f |
| in-curve | influence 0% / 100% | kit `out` bezier(0.16, 1, 0.3, 1) first 12–18 f |
| carrier | one null holding the whole scene | one parent `Entity` per setup |

## ADDENDUM — Master SaaS Motion Graphics in 30 Minutes
Source: "Motion Feel, Easing & Camera Choreography/Master SaaS Motion Graphics in 30 Minutes.txt" — 24:23–25:08, 33:39–34:29.
- Avoid the frame going fully static once a match-cut push settles: after the main carrier's push settles, chain a
  second carrier parented under the first with its own small ongoing drift (eased in, then continuing), so the scene
  keeps gentle movement after the transition ends. "What is missing is continuous motion... we're just looking at a
  static frame" is named explicitly as an editor mistake to avoid.
- For a background element meant to drift perpetually (not settle), key it with **linear** (not eased) interpolation
  — an eased drift visibly stops, which reads as dead if the shot holds on it; linear reads as constant gentle motion.
| parameter | Master SaaS Motion Graphics (AE) | recommended for Style D |
|---|---|---|
| continuation driver | null-2 parented to null-1, own position key starting after the push settles | a second small `interpolate` added to the same transform after the main move's end frame |
| idle drift interpolation | linear (not eased) for keys meant to loop/hold | linear only for genuinely perpetual background motion; everything else stays eased per house rule |

## ADDENDUM — How to do SMOOTH SAAS Animation Like Creatoroly
Source: "Minimalist Tech & SaaS 3D Staging/How to do SMOOTH SAAS Animation Like Creatoroly | After Effects Tutorial.txt" — 23:23–24:37.
- Cut on the carrier's steepest (fastest) frame of its speed graph, so the cut lands at peak velocity and the next
  setup can start at a matching speed — "at this point it cuts and the next layer comes in very smoothly". A light
  sweep can be timed across the same moment.
| parameter | Smooth SaaS (AE) | recommended for Style D |
|---|---|---|
| cut frame | peak of a steep position curve (6 s) | cut at the eased curve's fastest frame (midpoint of an in-out) |
