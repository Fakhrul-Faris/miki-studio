---
title: One shared key/controller drives multi-layer depth parallax
bucket: 09_UI_Motion
type: master
members:
  - cards/09_UI_Motion/depth-controller-lifts-ui-layers--smooth-ui-animation.md
  - cards/09_UI_Motion/depth-position-parallax-single-key--saas-motion-30min.md
sources: ["Smooth UI Animation After Effects Tutorial.txt", "Master SaaS Motion Graphics in 30 Minutes.txt"]
use_when: "a dashboard/app screen in 3D where the named element should rise off the screen, or a match-cut push/slide needs some elements to travel faster/further than the rest — drive every layer's depth from one shared key instead of hand-authoring a curve per layer"
style_fit: "Fits raea's native 3D camera — both variants are literally perspective depth once elements sit at different Z, free of extra curves. Trigger any lift/separation on the spoken word, not as a continuous loop; keep resulting speeds within the house camera-move cap."
---

## METADATA
09_UI_Motion | After Effects 3D layers + expressions / one null's shared position key (source) → raea: one driver, children at different Z | raea

## CREATIVE_INTENT
Rather than hand-keying a separate Z/position curve for every UI layer that should feel closer or livelier, one
shared value (a controller's position, or a single move all layers already share) drives every layer's depth, and
perspective alone produces the differential motion. The two sources use the same mechanism for two different
purposes.
- Smooth UI Animation adds: a null "controller" with **length** and **range** sliders feeds an expression on every
  3D UI layer's position — each layer's Z offset is a falloff of its distance from the controller, so as the
  controller moves across the screen, the nearest named element lifts toward camera and the rest rise a little less;
  drop-shadow distance and opacity are mapped from the same lift so the shadow sells the depth, not just the Z move.
  The controller itself is keyed in on the named word (~15 frames in, ~1 s out), eased with continuous tangents.
- Master SaaS Motion Graphics adds: when a group of elements is already parented to one null sharing a single
  eased position key (e.g. everything moving left together for a match-cut push), pushing just one layer (a cursor)
  toward the camera in Z — without re-keying its X/Y — makes it automatically travel a larger screen distance in the
  same time, purely from perspective. No second curve is authored at all; only the pushed layer's scale/offset is
  nudged back to the intended on-screen position after the Z push.

## STE_PROCEDURE
1. Build the shared move first: one controller/null (or the group's existing shared key) moves across the screen on one eased curve.
2. Put every UI element that should respond on its own layer in depth-capable (3D) space.
3. Variant A (named-element lift): for each element compute `lift = falloff(distance from controller, range)`; map `lift` to a Z offset AND to drop-shadow distance/opacity together, so the shadow sells the lift.
4. Variant B (free parallax speed): instead of computing a falloff, simply push the one layer that should read as closer/faster further toward the camera in Z — give it no second time-curve, only the existing shared key.
5. For Variant A, move the controller onto the element the line names, timed to that word (in ~15 frames, out ~1 s), eased with continuous/smooth tangents — never loop it continuously.
6. For Variant B, after the Z push, check the layer's apparent size/position and nudge its scale/offset back to the intended frame — never re-key its X/Y to compensate.
7. Confirm the resulting relative speed/lift reads correctly at the move's peak frame, and stays within the house camera-move cap.

## VALUES BY SOURCE
| parameter | Smooth UI Animation | Master SaaS Motion Graphics | recommended for Style D (+ why) |
|---|---|---|---|
| Driver | a dedicated controller null with length/range sliders | the group's existing shared position key (no new driver) | Use a dedicated controller only when more than one element needs independent falloff; reuse an existing shared key when just one layer needs to stand out |
| Mechanism | falloff of distance-to-controller → Z + shadow distance + shadow opacity, all together | pure Z push on one layer; perspective alone produces the speed difference | Both are valid; falloff for "the named element visibly lifts", Z-push for "this one layer races ahead during a push" |
| Trigger | timed to the spoken word (controller keyed in ~15 f, out ~1 s) | timed to the shared push/slide's existing keyframes (no separate trigger) | Named-element lift always triggers on the word; parallax-speed variant inherits the host move's timing |
| What moves on the named word | Z offset + shadow distance + shadow opacity (3 properties from one falloff) | nothing extra — only scale/offset correction after the Z push | Keep shadow distance/opacity tied to Z in the lift variant; in the parallax variant, correct scale/offset only, never add a second curve |
| Looping risk | ⚠ source loops the controller continuously — decoration risk | not applicable (one-shot push) | Trigger on words only, never a continuous loop |
| Exact values | expression formula not recovered from source (project-file only); falloff is `~` | AE Z value (−2000) and compensating scale are visual-only, AE units | Tune both to raea's own scene scale; keep the principle (one driver, Z does the rest) |

## AGENT_EXECUTION
raea: kit `pro.tsx` `Card3D` (props `p`, `w`, `h`, `rx`, `ry`) per UI element in a `ProStage` for the named-element
lift variant:
```tsx
// Variant A — named-element lift (falloff + shadow)
const lift = Math.max(0, 1 - Math.abs(cx - card.x) / RANGE);
card.p[2] = base + MAXZ * lift;
card.boxShadow = { blur: baseBlur + liftBlur * lift, offset: baseOffset + liftOffset * lift, opacity: baseOpacity + liftOpacity * lift };
// cx keyed with in-out-cubic to the named card, timed to its spoken word
```
```tsx
// Variant B — free parallax speed via Z push on a shared key
const worldX = interpolate(f, [a, a + 20], [0, -1.2], { ...CL, easing: inOut });  // one shared driver, world units
<Model transform={Transform.fromXyz(worldX, 0, 0)} />                             {/* far layer: normal Z */}
<Model transform={Transform.fromXyz(worldX * 1, -0.1, 0.6)} scale={0.6} />        {/* cursor: pushed toward camera */}
```
The near layer's `worldX * 1` with the *same* interpolation already reads faster on screen purely from perspective —
only adjust its local scale/offset, never give it a separate time curve.
Shot-list: name the lifted/faster element and its trigger word in the events cell, e.g.
`| 5 | "bil bulan ni" | bank app tiles | "Bil RM320" tile lifts toward camera, shadow softens/lengthens, neighbours lift less | parallax-single-key-controller |`.

### Worked example
Topic: a bank app home screen with "Baki", "Bil", "Simpanan" tiles, chained into a cursor tapping "Bayar" as the
screen match-cuts to the next step (generic app, illustrative).
- BEFORE: all tiles flat, a red outline marks "Bil"; separately, the cursor and the UI card use the same 2D position
  key and the same screen speed — flat, no depth.
- AFTER (Variant A): on "bil bulan ni", the "Bil RM320" tile lifts toward camera, its shadow growing softer and
  longer; neighbours rise a little less; on the next line it settles back.
- AFTER (Variant B): the UI card stays at its scene depth; the cursor is pushed closer to camera (same shared key,
  smaller scale, repositioned to compensate) — it now visibly races ahead of the card during the push, with zero
  extra keyframes.

### Check
- Does the lifted/faster element match the spoken word or the host move it's riding on?
- (Variant A) Do Z, shadow distance and shadow opacity move together from one falloff?
- (Variant B) Does the "faster" layer get its speed purely from a Z offset, not a second time-curve, with its scale/position re-checked after the push?
- Is the controller/driver move eased, not a continuous loop?
- Is the resulting speed/lift difference within the house camera-move cap?

## NOTES
- Visual gaps: Smooth UI Animation's three expressions (Z, shadow distance, shadow opacity) were only in the
  project file, not spoken — the falloff shape above is `~`; Master SaaS Motion Graphics' exact Z value (−2000, an
  AE unit) and compensating scale are visual-only and will differ by raea's own scene scale.
- AE dropped: AE's 3D-layer toggle and absolute Z/expression units — translated to raea's native 3D transform,
  which is a closer match than most AE techniques in this set.
- ⚠ Looping risk: Smooth UI Animation's source keys the controller as a repeating loop — adapted here to trigger
  only on the spoken word, since a continuous loop reads as decoration against the house "events land on words" rule.
