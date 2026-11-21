---
title: Lens distortion and lens breathing — account for them when tracking and when adding elements
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "57:41–58:51; 05:36–06:06; 07:16–07:56"
blender_version_source: n/a (Nuke)
tool_target: raea
tier: principle
style_fit: Mild barrel distortion can add lens character to a macro shot; must stay subtle and static (no animated warps that read as gimmicks).
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | raea

## CREATIVE_INTENT
Principle: wide lenses bend straight lines most; telephoto flattens; anamorphics add extra distortion. Distortion makes footage move non-linearly, so 2D tracks drift near the corners. Lens breathing: as focus changes, distortion and squeeze change (worst on old anamorphics). Idea: CG put into a distorted plate must be distorted the same way, and a rack focus may need a matching scale shift.

## STE_PROCEDURE
1. Check straight lines (shelves, frames) for bending to judge distortion strength.
2. Expect a 2D track to drift in corners on distorted plates; judge it in motion.
3. If it drifts visibly, undistort before tracking and redistort after.
4. During a focus pull, check whether the frame scale/squeeze shifts (breathing) and match it.

## AGENT_EXECUTION
### Source tool (Nuke)
`LensDistortion` (undistort → work → redistort); theory only in this video.
### Blender / raea translation
- raea: `<LensDistortion k1={0.1–0.4} k2 />` adds barrel (`k1` below 0 = pincushion) to the 3D pass, auto-zoomed to fill corners; the page/captions are never bent. Every value animates per frame.
- Breathing during a rack focus (~): animate the `<Camera3d>` fov by 1–2 % alongside `focal_distance`; keep it eased.
- Our renders have no plate to match, so distortion is a look choice; keep `k1` ≤ ~0.1 for Style D (~).

## NOTES
- Rule conflicts: an animated distortion pulse would be flashy; keep it static or very slow.
