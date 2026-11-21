---
title: Seamless scene-to-scene camera push (Z-offset by prior max depth + occluder hides the cut)
bucket: 05_Camera_Raea_Pipeline
source: "Motion Feel, Easing & Camera Choreography/Master Infinite Camera Movement After Effects.txt"
source_time: "00:00–03:08 (depth basics), 03:08–06:33 (multi-scene seamless push)"
tool_target: raea
tier: full
use_when: "joining two consecutive setups with one continuous camera push instead of a hard cut — the camera flight between two on-screen setups (RECIPE-D §2)"
style_fit: "Matches house camera-flights-joined language directly. ⚠ the source fakes 3D with flat 2D layers staggered in Z (AE 'continuously rasterize' + manual Z-position cards) — raea builds real 3D geometry in Bevy, so the flat-card illusion itself doesn't apply. Only the higher recipe transfers: push the camera through nested real depth, hide the join behind a foreground occluder built from the scene's own objects (house rule), fade the next scene's background in to hide pop-in."
---

## METADATA
05_Camera_Raea_Pipeline | After Effects (2D layers faked into 3D via Z-position + continuously rasterize) | raea real 3D camera flight

## CREATIVE_INTENT
A camera that pushes continuously through depth, from one scene straight into the next, reads as one unbroken shot
even though two different setups were built separately. The trick that makes the join invisible is not the push
itself — it's (1) placing the next scene's depth range starting exactly where the previous scene's farthest object
ended, so there is no depth gap or overlap at the handoff, and (2) hiding the handoff itself behind something in the
foreground (an occluder) so the viewer's eye never lands on the seam.

## STE_PROCEDURE
1. Before building scene B, measure scene A's maximum depth (its farthest-back object's distance from the camera's
   starting point).
2. Position scene B's nearest object at that same depth value — not before it (gap) and not past it (overlap).
3. Animate the next scene's background opacity from 0% to 100% as the camera arrives, so it fades in rather than
   popping into existence.
4. Place one object near the front of the new scene, large enough to pass across the lens at the moment of the cut —
   built from the scene's own objects (a real prop, never a generic wipe shape) — so it visually "swallows" the join.
5. Add a touch of parallax / idle motion to background elements (a slow loop, not scene-defining) so depth still
   reads even on a slow push, not just a hard cut.
6. Keyframe camera depth-of-field focus distance to shift in sync with the scene change, so focus settles on the new
   scene's subject by the time the occluder clears.
7. Ease the push in-out across the whole multi-scene flight — never a hard linear start/stop at the join (house
   rule).
8. Check the full flight at real speed: the viewer should not be able to point to the exact frame where scene A
   became scene B.

## AGENT_EXECUTION
**Frame brief → Decision:** "flight continues straight through into the next setup; occluder = [named scene prop]
carries the join; next background fades in, not pops."

raea (real 3D — no flat-card faking needed, the depth is genuine Bevy geometry):
```tsx
// scene A's farthest object sits at z = -2.4; scene B starts there, not before/after it
const sceneBStartZ = -2.4;
const bgOpacity = interpolate(f, [joinFrame, joinFrame + 12], [0, 1], {
  easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp",
});
<Mesh3d name="sceneB_bg" transform={Transform.fromXyz(0, 0.4, sceneBStartZ - 1.5)}>
  <StandardMaterial base_color="#1a1a1e" alpha={bgOpacity} alpha_mode="Blend" />
</Mesh3d>
{/* occluder: a real scene prop (e.g. the receipt's torn edge) passes the lens at joinFrame, hiding the seam */}
<Model name="occluder" src={staticFile("receipt_edge.glb")}
  transform={Transform.fromXyz(occluderX(f), occluderY(f), -0.3).lookingAt(camPos(f))} />
<Camera3d transform={Transform.fromXyz(...flightPos(f)).lookingAt(flightTarget(f))}
  projection={{ Perspective: { fov: (35 * Math.PI) / 180 } }}>
  <DepthOfField focal_distance={interpolate(f, [joinFrame - 10, joinFrame + 10], [distA, distB], { easing: Easing.inOut(Easing.cubic) })}
    aperture_f_stops={2.2} />
</Camera3d>
```
Flight position/target functions follow the two-keyframe-camera-move / linear-vs-eased-interpolation masters (eased
in-out, virtual span if any hard cuts remain elsewhere in the sequence).

### Worked example
Topic: "Kemasukan parkir: bila bar automatik angkat?" (illustrative — a continuous push from the ticket slot into
the barcode scanner's screen).
BEFORE: `| 6 | "tiket keluar" | hard cut from ticket machine close-up to barcode-scanner close-up | — | — |` — two
separate setups, a visible cut.
AFTER: `| 6 | "tiket keluar...bar automatik angkat" | camera pushes continuously from the ticket slot (scene A, max
depth −2.4) straight through the ticket's own printed edge (occluder, scene-native) into the scanner screen (scene B
starting at −2.4); screen fades in 0.4 s behind the edge, DoF racks from ticket to screen mid-push | ticket text
morphs to barcode graphic on "bar automatik" | seamless-depth-push-scene-join--master-infinite-camera-movement |`

### Check
- Does scene B's nearest depth exactly match scene A's farthest depth (no gap, no overlap)?
- Is the occluder a real object already in the scene's story (not a generic shape or wipe)?
- Does the new background fade in rather than appear instantly?
- Is the whole push eased in-out, never linear, across the join?

## NOTES
- Visual gaps: none of substance — the AE depth-card technique is narrated step by step, though exact Z values and
  timing are "by feel" (`~`).
- AE-specific steps dropped entirely: 2D layers faked into 3D via Z-position stacking, "continuously rasterize" for
  vector scale quality, loop-out pingpong position offsets per card layer — none apply once depth is real 3D
  geometry in raea.
- This card is the join mechanism only; the push itself (eased in-out, speed caps) is covered by
  `masters/01_Animation_Motion/two-keyframe-camera-move.md` and `masters/05_Camera_Raea_Pipeline/zoom-vs-move-compression.md`.
