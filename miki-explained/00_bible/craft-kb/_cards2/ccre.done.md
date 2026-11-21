# ccre done-list

## Cards (11)
- cards/02_Geometry_Nodes/attribute-anatomy-store-named-attribute--a-guide-to-attributes-and-fields.md — attribute's 4 parts (type/domain/name/value) + Store Named Attribute, Spreadsheet inspection
- cards/02_Geometry_Nodes/field-vs-single-value-field-context--a-guide-to-attributes-and-fields.md — dashed/diamond field sockets vs solid/circle single value; field context (same expression, different domain → different result)
- cards/02_Geometry_Nodes/evaluate-at-index-borrow-neighbor-data--a-guide-to-attributes-and-fields.md — remap a field so element N shows element M's data (e.g. half-index, pairing)
- cards/02_Geometry_Nodes/sample-index-transfer-attribute-cross-object--a-guide-to-attributes-and-fields.md — collapse a field to one value; cross-object/domain attribute transfer (vertices → instances)
- cards/02_Geometry_Nodes/capture-attribute-freeze-pre-transform-state--a-guide-to-attributes-and-fields.md — anonymous Capture Attribute to preserve a "before" value a later node has overwritten
- cards/05_Camera_Raea_Pipeline/seamless-depth-push-scene-join--master-infinite-camera-movement.md — Z-offset scene B's start depth to scene A's max depth + scene-native occluder hides the camera-flight join; raea real-3D translation (AE's 2D-layer-as-Z-cards faking dropped)
- cards/01_Animation_Motion/stepped-hold-frames-impact--choppy-animation-better.md — animate on twos/threes, zero-inbetween "pop" for impact; ⚠ flagged conflict with house no-pop rule, adapted as one rare named exception only
- cards/04_Shading_Lighting/motivated-area-lights-scale-matched-pools--lighting-with-only-hdris.md — HDRI/sun is the base exposure, layer color-matched motivated area lights on top; scale light-pool size to the space (small pools for small spaces, many small pools not one giant light for a huge space)
- cards/01_Animation_Motion/reactive-shadow-follows-object--ae-techniques-improve-motiongraphics.md — a light/shadow parented to a moving hero's own transform so the environment visibly reacts as it passes; raea real light replaces the AE matte-parenting fake
- cards/01_Animation_Motion/nested-circular-matte-lens-reveal--ae-techniques-improve-motiongraphics.md — two cancelling circular masks reveal a hidden layer as a focusing "lens" ring; ported to a CSS/SVG radial mask, capped to one use per episode
- (addenda target masters/cards directly — see below; no 6th new standalone card needed for the Smooth Blender Animations file, which is addendum-only per triage)

## Addenda (5)
- _cards2/addenda/sun-side-or-behind--lighting-with-only-hdris.md — explicit "front light = amateurish/onboard flash" rejection reason + Semtex Can's deliberate retro-flash exception
- _cards2/addenda/light-linking--lighting-with-only-hdris.md — Octane object-tag + light-ID variant of excluding one object from one light (same problem, different software, same raea fallback)
- _cards2/addenda/impact-bump-asymmetric-recovery--ae-techniques-improve-motiongraphics.md — diminishing distortion magnitude per successive bounce (100% → 70% → 20%), adapted as a capped settle-overshoot decay, not literal squash values
- _cards2/addenda/graph-editor-free-handle-easing--smooth-blender-animations-tutorial.md — "big three" naming, duration-vs-easing distinction, camera-switch-via-handle-scaling recipe, Easer plugin presets (⚠ overshoot/spring conflict with house no-bounce rule; only "super smooth" usable)

## Covered by
(none — all 6 files in this list were new to set 1/set 2; no file was a pure duplicate)

## Skipped
- Sponsor segments (Motion Duck extension plug in Master Infinite Camera Movement; Silvisor/Sirwizard plug in the AE-techniques video) — not technique content.

## Notes
- All 6 source files read in full; resume-mode grep found no existing cards or addenda referencing any of the six
  filenames before this pass — all work here is new, not a fix to prior truncated work.
- "A guide to attributes & fields" (full tier, foundational GN mental model) yielded 5 cards rather than one, since
  Store Named Attribute, field/field-context, Evaluate at Index, Sample Index and Capture Attribute are each a
  distinct, independently reusable node/technique per the brief's "one technique per card" rule.
- Nothing left unfinished for this list (ccre.list, 6 rows, all processed).
