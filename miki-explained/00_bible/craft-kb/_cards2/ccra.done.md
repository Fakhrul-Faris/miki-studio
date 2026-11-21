# ccra done-list

## Cards (8)
- cards/01_Animation_Motion/graph-editor-channel-normalize-compare-curves--mastering-blender-graph-editor.md — Normalize view to compare F-curves of different scale/units on one screen (viewing aid, no data change)
- cards/01_Animation_Motion/stepped-interpolation-stop-motion-feel--mastering-blender-graph-editor.md — Stepped Interpolation modifier for a handcrafted/claymation step rate over real eased curves; default-interpolation-constant prefs tip and Cycles-before-Stepped stack order folded in as procedure steps
- cards/01_Animation_Motion/motion-path-visualize-debug-arc--mastering-blender-graph-editor.md — Pose/Object Motion Paths to see and debug an object's real 3D arc before trusting per-axis curves
- cards/09_UI_Motion/point-correspondence-vertex-count-and-first-vertex--perfect-shape-morphs-after-effects.md — match vertex count + set first vertex to fix a bad nearest-point shape-path morph
- cards/09_UI_Motion/designed-in-between-shape-not-auto-interpolate--perfect-shape-morphs-after-effects.md — hand-author the morph's midpoint shape (visual language, no pinched negative space) instead of the engine's default blend
- cards/09_UI_Motion/match-cut-symmetric-half-shape-duplicate-flip--perfect-shape-morphs-after-effects.md — animate one symmetric half, mirror it, swap layers at the one frame both halves are pixel-matched
- cards/01_Animation_Motion/hierarchy-of-motion-lead-then-secondary--perfect-shape-morphs-after-effects.md — one driver carries the lead motion; secondary pieces/colour changes trigger only at the driver's fastest frame
- cards/09_UI_Motion/hold-frames-flat-color-no-gradient-swap--perfect-shape-morphs-after-effects.md — snap (Hold) a colour change instead of crossfading it, for a flat no-gradient palette; frame-by-frame occlusion-flash check

## Addenda (4)
- _cards2/addenda/graph-editor-free-handle-easing--mastering-blender-graph-editor.md — hand-keyed anticipation/overshoot as extra pose keyframes (not just two-key bezier shaping), plus a Motion-Path-checked refinement pass → cards/01_Animation_Motion/graph-editor-free-handle-easing--product-animation-masterclass.md
- _cards2/addenda/cycles-fmodifier-loops--mastering-blender-graph-editor.md — bounded repeat count + reset-gap-frame variant, copy-modifier-to-all-channels workflow, Cycles-before-Stepped stack order → masters/01_Animation_Motion/cycles-fmodifier-loops.md
- _cards2/addenda/fcurve-noise-modifier-micro-wobble--mastering-blender-graph-editor.md — Scale 10 / Strength 0.5 "mild" value on a primary object, documented as an upper bound to avoid (too strong for Style D's barely-perceptible wobble) → cards/01_Animation_Motion/fcurve-noise-modifier-micro-wobble--product-animation-masterclass.md
- _cards2/addenda/anticipation-dip-before-match-cut--perfect-shape-morphs-after-effects.md — scale-shrink (~9–10%) anticipation variant for a split/burst state change (one object becoming several), vs. the master's position-dip variant → cards/08_Edit_Pacing/anticipation-dip-before-match-cut--ae-morph-match-cuts.md

## Covered by
(none — both source files' distinct techniques are new or variants of existing cards, listed above)

## Skipped
- "Modifier stack order matters (cycles before stepped)" — folded into the stepped-interpolation card's procedure and the cycles-fmodifier-loops addendum rather than its own card (dependency note, not a standalone technique).
- "Default interpolation preference set to constant" — folded into the stepped-interpolation card as a procedure step (workflow convenience for that technique, not separable).
- AE "copy with relative property links" expression mechanic — AE-specific UI; principle (derive duplicates from one source so they don't cross-link to the wrong copy) folded into the match-cut-symmetric-half card's NOTES; general single-source-drives-duplicates concept already exists at cards/05_Camera_Raea_Pipeline/single-source-linked-transforms-reference-offset--advanced-comp-nuke-wk1.md (not duplicated).
- Eyeballing/equalizing motion-path spacing across duplicated circles, and reducing on-screen clutter (hide guides/solo layers) while tuning a transition — production-hygiene habits, not standalone transferable techniques; not card-worthy on their own.
- Sponsors (Invato) and channel outro/plugin plugs — filler, dropped per brief.

## Notes
- Verified by grep before writing: "cycles modifier (loop/repeat-with-offset)" from Mastering Blender Graph Editor is
  NOT new — it's the same Cycles F-modifier already covered by masters/01_Animation_Motion/cycles-fmodifier-loops.md
  (TRIAGE-2.md's "(new)" tag for this item was not accurate); written as an addendum instead of a duplicate card.
  Likewise "anticipation before a shape splits apart" overlaps cards/08_Edit_Pacing/anticipation-dip-before-match-cut--
  ae-morph-match-cuts.md (TRIAGE-2.md marked it only "set1-adjacent"); written as an addendum, not a new card.
- RESUME MODE check: `grep -rlF` for both source filenames against ../cards and ../_cards2/addenda returned nothing
  before this pass — no prior cards existed for either file, so nothing was being resumed; all cards/addenda above
  are new writes, none overwritten.
