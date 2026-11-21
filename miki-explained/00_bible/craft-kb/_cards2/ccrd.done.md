# ccrd done-list

## Cards (9)
- cards/01_Animation_Motion/elastic-decaying-overshoot--after-effects-easing-pro.md — decaying keyframe chain, eased together, for a springy settle; ⚠ adapted to house no-bounce cap, full version reserved for UI/diagram accents only
- cards/01_Animation_Motion/path-drawn-roving-keyframe-motion--after-effects-easing-pro.md — draw a path, convert to position keys, control "hang time" via key height → raea parametric path + per-segment eased progress
- cards/01_Animation_Motion/time-remapping-universal-ease--after-effects-easing-pro.md — precompose + time remap to slow down anywhere, independent of existing keyframes → raea eased clock-lookup
- cards/04_Shading_Lighting/layered-complementary-gels-per-light-role--lighting-jack-bridgland.md — different (mostly desaturated) gel per light ROLE so no single hue dominates; ⚠ adapted to keep only the brand accent saturated
- cards/04_Shading_Lighting/grid-size-controls-rim-spread--lighting-jack-bridgland.md — physical grid size narrows/widens a light's spread independent of softness → raea SpotLight outer_angle
- cards/01_Animation_Motion/anticipation-pre-movement-winding-up-post-impact-squash--animation-anticipation.md — pre-move opposite the action, winding-up timing, apex vs fall curve shape, squash keyed AFTER impact
- cards/04_Shading_Lighting/animated-wiggle-blur-gradient-material--level-up-animation-styles.md — wiggling colour blobs + heavy blur baked as a looping emissive texture for a soft drifting glow, real-geometry translation of the AE fake-3D build
- cards/04_Shading_Lighting/ecommerce-white-infinity-cove-two-light-combo--8-lighting-tricks.md — bevelled floor-to-wall cove + separate background blowout light + large key + small specular-only duplicate; ⚠ lighting adapted to stay dark-room by default, cove geometry kept
- cards/05_Camera_Raea_Pipeline/parallax-push-through-image-illusion--smooth-3d-camera-movement.md — masked foreground pushed far forward on Z past the camera while the full image arrives, finished with a soft reveal — a transition built from the scene's own objects

## Addenda (7)
- _cards2/addenda/light-stack-one-at-a-time--lighting-jack-bridgland.md — audition rim+background together (silhouette-only) before adding the key back, as an extra check beyond single-light soloing
- _cards2/addenda/motion-style-axis-squash-spacing--animation-anticipation.md — anchor point moved to the contact edge so scale reads as pressing into the ground; concrete 80/120 inverse-scale shorthand
- _cards2/addenda/gradient-emissive-softbox--8-lighting-tricks.md — gradient wired directly into a light's own Emission Color (no separate plane) for glass/metal reflections
- _cards2/addenda/bevel-modifier-angle-vs-weight-limit--8-lighting-tricks.md — shader Bevel node as a quick but silhouette-failing preview; modifier confirmed as the only real-geometry choice, with concrete radius/segment values
- _cards2/addenda/dim-fill-lift-shadows--8-lighting-tricks.md — passive invisible reflector Plane (camera+shadow visibility off, no own light) as a Blender-build alternative to a fake-bounce light
- _cards2/addenda/black-world-low-key-reveal--8-lighting-tricks.md — named "teaser" variant: no key at all, symmetric duplicated backlight pair, floor excluded via light-linking
- _cards2/addenda/layered-camera-rig--smooth-3d-camera-movement.md — chain one null per sequential MOVE (not only per fixed role); value-graph vs speed-graph choice by the move's position in the clip; partial-overlap and wider-key-spacing guidance

## Covered by (no addendum — adds nothing beyond what's already captured)
- After Effects Easing Pro: timing-vs-spacing intro vocabulary and general believability framing — folded into the new cards' CREATIVE_INTENT rather than carded standalone (no isolable procedure beyond what graph-editor-free-handle-easing--product-animation-masterclass.md already covers)
- After Effects Easing Pro: accelerating fall + single overshoot-settle on landing (the position-key version, not scale) → covered by cards/01_Animation_Motion/weight-spacing-fast-drop-slow-apex--dinosaur-run-cycle.md (fast-drop/slow-apex spacing) and cards/01_Animation_Motion/scale-pop-in-overshoot--product-animation-masterclass.md (extra-key overshoot mechanism); no new numeric values given (qualitative only)
- JACK BRIDGLAND: light layering order (key → fill/bounce → rim → background) and soloing each layer → masters/04_Shading_Lighting/three-point-lighting.md, masters/04_Shading_Lighting/light-stack-one-at-a-time.md
- JACK BRIDGLAND: flags/poly-boards to stop light spill between layers → masters/04_Shading_Lighting/light-blockers-flags.md
- JACK BRIDGLAND: two-colour gradient across the backdrop (pink/red, lighter one side deeper the other) → cards/06_Art_Direction/rgb-bounce-backdrop-gradient-without-printed-paper--creative-lighting-setups-portrait.md (same technique and same ⚠ one-accent adaptation already documented there)
- Level Up Your Animation Styles: Leave Color + Linear Color Key per-face isolation, Inner Glow + Bevel/Emboss fake-3D layer styles → dropped as pure AE 2D-fake-3D workarounds (real 3D geometry needs neither); noted in the new gradient card's NOTES, not carded
- Level Up Your Animation Styles: 90%→50%→120% anticipation/overshoot scale entrance → cards/01_Animation_Motion/scale-pop-in-overshoot--product-animation-masterclass.md + cards/08_Edit_Pacing/anticipation-dip-before-match-cut--ae-morph-match-cuts.md (same mechanism family, both already more detailed)
- Level Up Your Animation Styles: staggered grid-line secondary motion → cards/01_Animation_Motion/staggered-pop-in-sequence--product-animation-masterclass.md
- 8 Lighting Tricks: three-point lighting on the sphere (key/invisible-bounce-fill/backlight + light-linking) → masters/04_Shading_Lighting/three-point-lighting.md, masters/04_Shading_Lighting/light-linking.md (the invisible-bounce PLANE build method itself is captured as an addendum, see above)
- 8 Lighting Tricks: gobo texture on a spotlight for dappled shadows → masters/04_Shading_Lighting/gobo-shadow-patterns.md
- 8 Lighting Tricks: sunlight for hard shadows on a flat matte product, soften via Sun angle → masters/04_Shading_Lighting/sun-side-or-behind.md
- Smooth 3D Camera Movement: null-parented camera + separate-dimension easing, Z-position (not scale) for true depth, two-view workflow for placing Z by eye, DoF focus-distance rack timed to the zoom subject → masters/05_Camera_Raea_Pipeline/layered-camera-rig.md (new nuances captured as addendum, see above) and masters/05_Camera_Raea_Pipeline/rack-focus-target.md (DoF rack — no new numeric values beyond what that master already has)

## Skipped
- None of the 6 source files had sponsor/intro/outro content substantial enough to need separate exclusion notes beyond the
  normal filler strip (Patreon plugs, subscribe asks, "AUJ" sponsor segment in Smooth 3D Camera Movement — excluded from all cards).

## Notes
- RESUME MODE check: `grep -rlF` for each of the 6 file names (no folder) against `../cards` and `../_cards2/addenda` found
  zero existing hits before this pass — all 6 files were previously untouched; nothing here overwrites or duplicates prior work.
- Several techniques across these 6 files directly conflict with house rules (full elastic multi-bounce springs, several
  saturated gels across light roles, a blown-white background) — each is flagged ⚠ in its card's style_fit/NOTES and
  adapted rather than dropped, per BRIEF instructions.
- Nothing left unfinished on this list; all 6 rows processed (4 full-tier, 2 principle-tier entries in ccrd.list — note the
  principle-tier "Principles of Animation Anticipation" and "Quick & Easy Ways to Level Up Your Animation Styles" sources
  still yielded full-tier-quality cards/addenda above, since the specific techniques extracted were concrete and
  procedural; this matches the other full-tier sources' depth and is noted for the later clustering pass.
