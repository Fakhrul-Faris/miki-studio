# Craft group (01–05) topic clusters, set 2

Scope: all MANIFEST2.tsv rows under `cards/01_Animation_Motion/` through `cards/05_Camera_Raea_Pipeline/` (91 cards;
`03_Modeling_Modifiers` has none in set 2). Checked against set 1's `../_cards/CLUSTERS.md` and `../masters/`.
Paths relative to `craft-kb/`.

## 01_Animation_Motion

### anchor-point-edge-orbit — Move the anchor point to an edge so rotation alone fakes an orbit
cards/01_Animation_Motion/anchor-point-at-edge-to-fake-an-orbit--wonil-seo-motion-design.md
use-when: an object needs to appear to orbit/swing around a point using only position and rotation, without hand-keying an arc

### anticipation-winding-up-squash — Anticipation, winding-up timing, and post-impact squash
cards/01_Animation_Motion/anticipation-pre-movement-winding-up-post-impact-squash--animation-anticipation.md
use-when: an object changes state or launches into motion and should read as building up to it, not just appearing to move

### detailed-blocking-breakdowns — Breakdowns of breakdowns until nothing is ambiguous
cards/01_Animation_Motion/detailed-blocking-breakdowns--five-steps-3d-animation.md
use-when: after the stepped animatic, defining how each object gets from one key state to the next before smoothing

### elastic-decaying-overshoot — Elastic decaying overshoot (chain of shrinking keyframes, eased together)
cards/01_Animation_Motion/elastic-decaying-overshoot--after-effects-easing-pro.md
use-when: a UI element, counter digit or diagram part needs a springy settle on arrival — never a Style D hero object

### follow-through-secondary-on-state-change — Follow-through and secondary animation on state changes
cards/01_Animation_Motion/follow-through-and-secondary-animation-on-state-changes--motion-design-principles.md
use-when: an object's main state change lands, and nothing else in frame reacts

### graph-editor-channel-normalize — Normalize the Graph Editor to compare mismatched-scale F-curves
cards/01_Animation_Motion/graph-editor-channel-normalize-compare-curves--mastering-blender-graph-editor.md
use-when: sculpting two or more channels together and one curve looks flat next to the other

### halves-thirds-slow-fast-slow — Halves + thirds combined for slow → fast → slow
cards/01_Animation_Motion/halves-plus-thirds-slow-fast-slow--animate-like-japanese-pro.md
use-when: keying an object move or camera flight between two setups that must ease in AND out with few keys

### hierarchy-of-motion-lead-then-secondary — Hierarchy of motion: lock the lead move before layering secondary elements `[fold → cards/01_Animation_Motion/layered-animation-root-first--dinosaur-run-cycle.md]`
cards/01_Animation_Motion/hierarchy-of-motion-lead-then-secondary--perfect-shape-morphs-after-effects.md
use-when: a setup has more moving pieces than one object and animating them all at once reads as chaotic

### morph-chain-infinite-loop — Morph-chain infinite loop: each chunk becomes its neighbour
cards/01_Animation_Motion/morph-chain-infinite-loop-background--camera-movement-animation-guide.md
use-when: a looping travel feel without moving the camera (a 'multiply' beat, or the last frame looping to frame 0)

### motion-path-debug-arc — Calculate a Motion Path to see and debug an object's real 3D arc
cards/01_Animation_Motion/motion-path-visualize-debug-arc--mastering-blender-graph-editor.md
use-when: pose-to-pose frame-by-frame animation isn't reading right in 3D and per-channel curves don't show the combined path

### multiplane-2d-layers-parallax-staging — Multiplane: 2D card layers staged at different depths for parallax `[merge]`
cards/01_Animation_Motion/multiplane-2d-layers-in-3d-space--japanese-studios-cg.md
cards/05_Camera_Raea_Pipeline/parallax-depth-card-staging-scale-to-preserve-size--eye-catching-3d-scenes.md
use-when: a flat 2D background/element needs real camera parallax, or a whole 2.5D scene is built from flat layers, without full 3D geometry

### nested-circular-matte-lens-reveal — Nested circular-matte lens reveal
cards/01_Animation_Motion/nested-circular-matte-lens-reveal--ae-techniques-improve-motiongraphics.md
use-when: revealing a hidden detail through a moving circular 'lens' that looks like it is focusing into view, not a crossfade/wipe

### path-drawn-roving-keyframe-motion — Path-drawn motion via roving keyframes
cards/01_Animation_Motion/path-drawn-roving-keyframe-motion--after-effects-easing-pro.md
use-when: an object must travel a hand-drawn curved path with natural varying speed along it

### reactive-shadow-follows-object — Reactive shadow/light trailing a moving object
cards/01_Animation_Motion/reactive-shadow-follows-object--ae-techniques-improve-motiongraphics.md
use-when: a hero object moves through a scene and the ground/background around it should visibly react as it passes

### rotation-synced-shadow-occlusion — Key a flat shadow's opacity to the caster's own rotation to fake occlusion
cards/01_Animation_Motion/rotation-synced-shadow-opacity-for-occlusion--wonil-seo-motion-design.md
use-when: a flat/graphic shadow needs to look blocked by its caster as that object rotates, without real-time shadow casting

### secondary-reaction-to-the-cut — Objects in shot B react as if the cut hit them
cards/01_Animation_Motion/secondary-reaction-to-the-cut--animation-technique-guide.md
use-when: a hard cut with matched composition but no matched motion, where shot B is a contrast to shot A

### single-driver-rig-choreography — One driver, parented through the whole rig, controls a multi-object choreography
cards/01_Animation_Motion/single-driver-null-parented-through-rig--wonil-seo-motion-design.md
use-when: staging a multi-object choreography that should be controllable and retimeable from one value

### snapping-contact-pose-before-pass-through — Snapping: a short contact pose before two objects pass through each other
cards/01_Animation_Motion/snapping-contact-pose-before-pass-through--three-mograph-techniques.md
use-when: one thing must pass into/through another and the line is about friction, resistance or 'it doesn't fit'

### spline-pass-restore-contrast — Spline pass: restore the contrast interpolation flattens
cards/01_Animation_Motion/spline-pass-restore-contrast--five-steps-3d-animation.md
use-when: switching the blocked animatic from held states to eased curves, when the preview suddenly feels mushy

### stepped-hold-frames-impact — Stepped hold frames for impact (animating on twos/threes)
cards/01_Animation_Motion/stepped-hold-frames-impact--choppy-animation-better.md
use-when: a single on-the-word state-change beat needs to read as a hard hit — weighed against the house no-pop rule

### stepped-interpolation-stop-motion-feel — Stepped Interpolation modifier for a handcrafted stop-motion feel
cards/01_Animation_Motion/stepped-interpolation-stop-motion-feel--mastering-blender-graph-editor.md
use-when: a hero object's held-shot motion should read as deliberate, handcrafted claymation rather than smooth CG

### thirds-inbetween-true-ease — Thirds in-between for a true ease (and the halves trap)
cards/01_Animation_Motion/thirds-inbetween-true-ease--animate-like-japanese-pro.md
use-when: hand-placing intermediate keys for a short eased move, or checking that an eased curve really slows at the end

### time-remapping-universal-ease — Time remapping as a keyframe-independent ease tool
cards/01_Animation_Motion/time-remapping-universal-ease--after-effects-easing-pro.md
use-when: an already-built move needs an extra slow-down or lingering point that doesn't line up with any existing keyframe

### toon-shaded-3d-standin — Toon-shaded 3D stand-in for inanimate objects hard to hand-animate
cards/01_Animation_Motion/toon-shaded-3d-standin-hard-to-animate--japanese-studios-cg.md
use-when: an inanimate object needs to move in accurate perspective across a shot that would be hard to hand-draw frame by frame

## 02_Geometry_Nodes

### matrix-anatomy-shear — 4×4 transformation matrix anatomy, and shear via its off-diagonal elements
cards/02_Geometry_Nodes/4x4-transform-matrix-anatomy-and-shear--demystifying-geometry-nodes.md
use-when: briefing a custom procedural rig that needs a skew/shear move no Position/Rotation/Scale slider can give

### attribute-anatomy-store-named — Attribute anatomy (type/domain/name/value) + Store Named Attribute
cards/02_Geometry_Nodes/attribute-anatomy-store-named-attribute--a-guide-to-attributes-and-fields.md
use-when: briefing a GN rig that needs its own custom per-element value before deciding how that value should vary

### attribute-handoff-gn-to-shader — Store Named Attribute hands a Geometry-Nodes value to the Shader Editor
cards/02_Geometry_Nodes/attribute-handoff-gn-to-shader-random-and-highlight--index-position-nodes.md
use-when: an instance's material must react to something only known inside Geometry Nodes, without a separate material per object

### capture-attribute-freeze-before-value — Capture Attribute: freeze an anonymous 'before' value for a later node
cards/02_Geometry_Nodes/capture-attribute-freeze-pre-transform-state--a-guide-to-attributes-and-fields.md
use-when: a kit-piece build changes a value with one node but a later node still needs the ORIGINAL value

### capture-attribute-orient-to-curve — Capture Attribute (tilt + tangent) → double Align Rotation to Vector, fully orient instances to a path
cards/02_Geometry_Nodes/capture-attribute-freeze-tilt-tangent-orient-to-curve--only-geometry-nodes-tutorial.md
use-when: instances scattered along a curved path must stay upright AND rotated to the path's own twist

### chained-matrix-multiply-order — Chained Multiply Matrices: transform order is non-commutative
cards/02_Geometry_Nodes/chained-matrix-multiply-order-matters--demystifying-geometry-nodes.md
use-when: rigging a multi-step camera flight or parented prop chain where move-then-rotate and rotate-then-move give different results

### curve-to-mesh-profile-loft — Curve to Mesh with a profile curve: loft a width, or thicken many parallel lines with one curve
cards/02_Geometry_Nodes/curve-to-mesh-profile-curve-loft-width-and-multiline--only-geometry-nodes-tutorial.md
use-when: a procedural diagram asset needs several parallel thick lines following one path without hand-placing curves

### distance-from-trim-scale-band — Shrink instances to exactly zero at a moving trim point
cards/02_Geometry_Nodes/distance-from-trim-value-scale-band--only-geometry-nodes-tutorial.md
use-when: instances along a trimmed/animated line must shrink to invisible exactly where the line currently ends

### evaluate-at-index-borrow-neighbor — Evaluate at Index: remap a field by borrowing another element's data
cards/02_Geometry_Nodes/evaluate-at-index-borrow-neighbor-data--a-guide-to-attributes-and-fields.md
use-when: a kit-piece build needs element N to use element M's data within the same domain

### exposed-parameter-panels — Organise exposed Geometry Nodes parameters into named panels
cards/02_Geometry_Nodes/exposed-parameter-panels-full-options--only-geometry-nodes-tutorial.md
use-when: handing off a reusable Blender build that another pass or future episode will re-tune without opening the node graph

### field-vs-single-value-context — Field vs single value, and field context
cards/02_Geometry_Nodes/field-vs-single-value-field-context--a-guide-to-attributes-and-fields.md
use-when: deciding whether a procedural GN value should vary automatically per element, or be locked to one shared number

### geometry-proximity-empty-driven-displacement — Geometry Proximity driven by an empty: displacement/scale/rotation that reacts to nearness
cards/02_Geometry_Nodes/geometry-proximity-empty-driven-displacement--proximity-animations.md
use-when: an object must visibly 'cause' a nearby field to react (a sphere pressing discs, a cursor displacing tiles)

### gn-bevel-double-bevel-wireframe — Geometry-Nodes Mesh Bevel node: double-bevel + Delete Geometry for a wireframe look
cards/02_Geometry_Nodes/gn-bevel-node-double-bevel-wireframe--blender-finally-did-it.md
use-when: an instanced prop needs rounded/chamfered edges without leaving Geometry Nodes to bevel it externally

### index-compare-select-single-instance — Index node + Compare: isolate one instance among many and animate only it
cards/02_Geometry_Nodes/index-compare-select-single-instance-and-animate--index-position-nodes.md
use-when: a hero-reveal beat among many identical objects singles one out on a word while the rest hold still

### index-modulo-alternate-offset — Index node + Modulo: offset every Nth instance so an interlocking grid fits
cards/02_Geometry_Nodes/index-modulo-alternate-instance-offset--index-position-nodes.md
use-when: building a hex/brick/interlocking grid of hero props that must not sit flush on top of each other

### inset-via-extrude-zero-offset — Fake an Inset Faces with Extrude Mesh (offset 0) + Scale Elements
cards/02_Geometry_Nodes/inset-via-extrude-zero-offset-scale-elements--procedural-pathways.md
use-when: a procedural mesh needs an inset (recessed panel, tile grout line) and the node tree has no native Inset node

### invert-transpose-determinant-matrix — Invert / Determinant / Transpose matrix utilities
cards/02_Geometry_Nodes/invert-transpose-determinant-matrix-utilities--demystifying-geometry-nodes.md
use-when: a custom rig needs to undo or borrow a parent's transform — rare, hand-built matrix rigs only

### mesh-to-volume-grid-noise-reveal — Mesh to Volume → Distribute Points in Volume for an even field, scaled by animated noise
cards/02_Geometry_Nodes/mesh-to-volume-grid-noise-scale-reveal--blender-finally-did-it.md
use-when: a solid block needs to read as 'made of many small identical pieces' that erode/reveal in a noise-driven pattern

### position-node-delete-isolate-strip — Position node + Delete Geometry: isolate one coordinate strip from an existing grid
cards/02_Geometry_Nodes/position-node-delete-geometry-isolate-strip--index-position-nodes.md
use-when: a secondary prop must run through the middle of an existing procedural grid without building new geometry

### position-node-directional-rotation-wave — Position node (vs Index) drives a directional rotation wave across a grid
cards/02_Geometry_Nodes/position-node-directional-rotation-wave--index-position-nodes.md
use-when: a field of identical props needs a wave of rotation that travels in one chosen direction, not just 'by order'

### project-vs-transform-point-direction — Project Point vs Transform Point vs Transform Direction
cards/02_Geometry_Nodes/project-point-vs-transform-point-direction-perspective-warp--demystifying-geometry-nodes.md
use-when: a custom GN rig's effect depends on whether position should shift or only facing should change

### randomized-triangulate-dual-mesh-paving — Randomly triangulate quads, then Dual Mesh, for mixed paving shapes
cards/02_Geometry_Nodes/randomized-triangulate-dual-mesh-paving-shapes--procedural-pathways.md
use-when: a flat tiled/gridded surface needs to look naturally irregular while still reading clearly

### raycast-curve-snap-to-surface — Raycast a curve down onto a displaced ground
cards/02_Geometry_Nodes/raycast-curve-snap-to-displaced-surface--procedural-pathways.md
use-when: a drawn curve must lie exactly on an uneven/displaced ground mesh, avoiding floating or sinking

### sample-index-transfer-attribute — Sample Index: collapse a field to one value, incl. transfer between two objects
cards/02_Geometry_Nodes/sample-index-transfer-attribute-cross-object--a-guide-to-attributes-and-fields.md
use-when: a kit-piece build needs to drive one object's layout from another object's data, as a single value per element

### tapered-radius-spline-remap — Taper a curve's thickness with Spline Parameter → remapped curve → Set Curve Radius
cards/02_Geometry_Nodes/tapered-radius-via-spline-factor-remap--only-geometry-nodes-tutorial.md
use-when: a lofted line/ribbon diagram should fade to a point at both ends instead of a hard-cut flat tip

### trim-curve-factor-wipe-reveal — Trim Curve (Factor mode): a scale-independent 0→1 wipe to reveal or retract a line
cards/02_Geometry_Nodes/trim-curve-factor-wipe-reveal--only-geometry-nodes-tutorial.md
use-when: an on-screen line/path/route needs to draw itself in or retract, landing on the word

## 04_Shading_Lighting

### animated-liquid-gradient-material — Procedural 'liquid gradient' material (wiggling colour patches + blur)
cards/04_Shading_Lighting/animated-wiggle-blur-gradient-material--level-up-animation-styles.md
use-when: a flat-coloured hero face or panel needs a soft, slowly-shifting multicolour glow instead of a static flat fill

### backlight-liquid-so-it-reads — Backlight water and liquid, or it disappears
cards/04_Shading_Lighting/backlight-liquid-so-it-reads--apple-commercial-breakdown.md
use-when: any setup whose hero or event is a liquid, drink, steam, bubbles or a wet surface

### bounce-card-plane-fill — Bounce-card fill (large plane opposite the key instead of a second softbox) `[fold → masters/04_Shading_Lighting/fake-bounce-lights.md]`
cards/04_Shading_Lighting/bounce-card-plane-fill--three-point-product-series.md
use-when: the shadow side of a product under the top key is too dark, and a second light would look like a second source

### close-key-highlight-spans-product — Close plane key whose highlight runs the product's full length `[fold → cards/04_Shading_Lighting/side-strip-reflection-lights--perfect-product-animations.md]`
cards/04_Shading_Lighting/close-key-highlight-spans-product--three-point-product-series.md
use-when: a long or tall hero whose shape must read at phone size in under 1 s

### ecommerce-white-infinity-cove — E-commerce pure-white background: bevelled cove + large soft key + small hard specular light
cards/04_Shading_Lighting/ecommerce-white-infinity-cove-two-light-combo--8-lighting-tricks.md
use-when: a clean e-commerce-style pure-white backdrop beat, no visible floor/wall seam

### environment-light-grounds-imported-model — An environment light with cast shadows enabled grounds an imported 3D prop
cards/04_Shading_Lighting/environment-light-grounds-imported-model--motion-explainer-3-scenes-part2.md
use-when: a library CC0/CC-BY model is imported and sits in the scene looking like a flat sticker

### finishing-glint-extra-light — One extra small light added only for a highlight/glint `[merge]`
cards/04_Shading_Lighting/finishing-glint-extra-light--apple-commercial-breakdown.md
cards/04_Shading_Lighting/logo-catch-point-light--lighting-trick.md
cards/04_Shading_Lighting/top-surface-highlight-accent-light--lighting-products-breakdown.md
use-when: a hero setup reads but looks dull/flat at phone size, or the real brand logo on the hero must glint and read from frame 1

### glossy-only-world-colour — A separate world colour seen only in reflections (Light Path glossy ray)
cards/04_Shading_Lighting/glossy-only-world-colour--blender-lighting-hack.md
use-when: glossy heroes (phone glass, coins, metal tins) need richer reflections without changing the room's lighting

### grid-size-controls-rim-spread — Grid size controls a light's spread (tight grid = narrow rim, wide grid = spreads down the body)
cards/04_Shading_Lighting/grid-size-controls-rim-spread--lighting-jack-bridgland.md
use-when: a rim/edge light must be confined to a small zone of the hero, vs. one that should wash a larger area

### layered-complementary-gels-per-light-role — Layered complementary gels: opposite colour per light role, not one whole-shot grade
cards/04_Shading_Lighting/layered-complementary-gels-per-light-role--lighting-jack-bridgland.md
use-when: a multi-light setup where the final look should feel rich and balanced rather than pushed to one temperature

### motivated-area-lights-scale-matched-pools — Motivated area lights over an HDRI/sun, scaled to the space
cards/04_Shading_Lighting/motivated-area-lights-scale-matched-pools--lighting-with-only-hdris.md
use-when: an exterior/establishing beat looks flat with only an Environment + DirectionalLight, or a large set needs believable scale

### natural-clay-material — Natural (non-toy) clay material: speckle, pointiness roughness, two-scale bump, lump displacement
cards/04_Shading_Lighting/natural-clay-material-speckle-pointiness-bump--natural-clay-material.md
use-when: a hero or prop that is real clay/terracotta/earthenware and must read as a real surface at macro distance

### proximity-attribute-shader-glow-mask — Proximity gradient handed to the shader: material lights up only where something is near
cards/04_Shading_Lighting/proximity-attribute-shader-glow-mask--proximity-animations.md
use-when: a surface should visibly glow/recolour only in the area a cause is currently near, not everywhere at once

### rectangular-beam-light-rig — Rectangular beam light rig: narrow-spread area lights for visible light-streak drama
cards/04_Shading_Lighting/rectangular-beam-light-rig-narrow-spread--modern-lighting-techniques.md
use-when: briefing a product/hero-object shot that wants a visible dramatic beam of light, not just illumination

### staggered-light-fade-in-reveal — Staggered light fade-in: each light rises from 0, offset, to reveal the scene `[fold → masters/04_Shading_Lighting/black-world-low-key-reveal.md]`
cards/04_Shading_Lighting/staggered-light-fade-in-reveal--aesthetic-3d-documentaries.md
use-when: an opening or new-place setup that should emerge from black

### twin-light-layered-shadow-softness — Twin lights (offset suns, or warm-soft + sharp spots) for a layered, less-CG shadow `[merge]`
cards/04_Shading_Lighting/twin-offset-sun-layered-soft-shadows--blender-lighting-hack.md
cards/04_Shading_Lighting/twin-spots-warm-soft-plus-sharp-sunlight--lighting-products-breakdown.md
use-when: a hero's shadow looks razor-sharp and CG ('too precise') under the single top key, or under simulated daylight

### window-funnelled-key-narrow-spread — Window-funnelled key: narrow-spread light through an opening onto the product only
cards/04_Shading_Lighting/window-funnelled-key-narrow-spread--lighting-products-breakdown.md
use-when: a hero object sitting in a small built room that must be the only bright thing in frame

## 05_Camera_Raea_Pipeline

### frames-back-deceleration-into-cut — Key the deceleration a fixed interval (14 frames) before the cut
cards/05_Camera_Raea_Pipeline/14-frames-back-deceleration-into-cut--3d-camera-transitions-pt2.md
use-when: building the last leg of a camera/object move before a hard cut, so it decelerates INTO the cut

### bake-and-smooth-camera-path — Steadicam smoothing: bake a rough camera path to every frame, smooth, then decimate to editable keys
cards/05_Camera_Raea_Pipeline/bake-and-smooth-camera-path--cinematic-camera-movements.md
use-when: a camera path roughed in by hand has bumps or jitter before it goes to raea

### camera-follows-the-action — Camera follows the action to make it punchier
cards/05_Camera_Raea_Pipeline/camera-follows-the-action--camera-movement-animation-guide.md
use-when: an object's state change that should feel big (a coin dropping, a bar rising, a notification sliding up)

### camera-motion-as-tempo-lever — Camera motion as a tempo lever: locked-off breathes, slow dolly dreams, constant motion urges
cards/05_Camera_Raea_Pipeline/camera-motion-as-tempo-lever--how-to-pace-your-film.md
use-when: choosing the camera move per setup to match the beat's tempo tag

### camera-move-menu-by-meaning — Camera move menu by meaning: static, pan, push/pull, truck, pedestal, tilt, zoom, tracking, arc, crane `[fold → cards/05_Camera_Raea_Pipeline/camera-move-vocabulary-transforms--cg-cine-ch2-camera-breakdown.md]`
cards/05_Camera_Raea_Pipeline/camera-move-menu-by-meaning--cinematic-camera-movements.md
use-when: filling the 'Setup and camera' column; choosing a different move type for consecutive setups

### camera-tilt-sky-vs-ground-mood — Camera tilt choice (up vs down) changes what dominates the frame, and the mood
cards/05_Camera_Raea_Pipeline/camera-tilt-sky-vs-ground-mood--8-cinematic-fundamentals.md
use-when: briefing a setup where the camera has room to tilt above or below the hero

### cross-the-180-line-safely — The 180-degree line, and how to cross it safely with a medial/head-on shot
cards/05_Camera_Raea_Pipeline/cross-the-180-line-safely--8-cinematic-fundamentals.md
use-when: planning a run of setups around two fixed elements that must keep their screen-side relationship across cuts

### fov-vs-orthographic-zoom-mechanics — FOV zooms the frustum angle; orthographic 'zoom' scales the whole scene
cards/05_Camera_Raea_Pipeline/fov-vs-orthographic-zoom-mechanics--understanding-cameras.md
use-when: choosing or animating a zoom for a diagram/data shot, perspective-compressed vs flat/technical

### free-look-vs-point-of-interest-camera — Free-look (one-node) vs point-of-interest (two-node) camera, choose per setup
cards/05_Camera_Raea_Pipeline/free-look-vs-point-of-interest-camera--ae-camera-guide.md
use-when: planning the camera of each shot-list row: does it look AT the named object, or look around freely?

### height-minus-offset-math-seamless-whip — Height-minus-offset math: calculate the next setup's start position from the previous setup's end value `[fold → cards/05_Camera_Raea_Pipeline/end-frame-is-next-start-frame-chaining--product-animation-masterclass.md]`
cards/05_Camera_Raea_Pipeline/height-minus-offset-math-seamless-whip--3d-camera-transitions-pt2.md
use-when: two adjacent setups move along the same axis across a hard cut and the join shows a visible jump or double-travel

### seamless-depth-push-scene-join — Seamless scene-to-scene camera push (Z-offset by prior max depth + occluder hides the cut) `[fold → cards/05_Camera_Raea_Pipeline/end-frame-is-next-start-frame-chaining--product-animation-masterclass.md]`
cards/05_Camera_Raea_Pipeline/seamless-depth-push-scene-join--master-infinite-camera-movement.md
use-when: joining two consecutive setups with one continuous camera push instead of a hard cut

### image-plane-cutout-limit-rotation — Image-plane cutout sets: push/truck freely, barely rotate
cards/05_Camera_Raea_Pipeline/image-plane-cutout-set-limit-rotation--camera-movement-animation-guide.md
use-when: a setup uses flat ImagePlane elements and the camera map shows an orbit or turn

### jib-down-opens-a-story — Jib down = a story or action begins
cards/05_Camera_Raea_Pipeline/jib-down-opens-a-story--overwatch-dragons-camera.md
use-when: the first setup after the hook, or the first setup of the 'steps' block

### multi-stop-camera-move-no-stall — Multi-stop camera move without the stall at middle keys
cards/05_Camera_Raea_Pipeline/multi-stop-camera-move-no-stall--ae-camera-guide.md
use-when: a camera flight with more than one leg: setup A → pass B → land on C without stopping at B

### near-far-clip-plane-tradeoffs — Near/far clip-plane trade-offs: set near as small as needed, not smaller
cards/05_Camera_Raea_Pipeline/near-far-clip-plane-tradeoffs--understanding-cameras.md
use-when: a macro hero object clips/shows its inside, or flickers, when the camera pushes in close

### parallax-push-through-image-illusion — 'Passing through' zoom illusion: push a masked foreground card forward while the matching image zooms past it `[fold → cards/05_Camera_Raea_Pipeline/zoom-into-letter-loop-transition--product-animation-masterclass.md]`
cards/05_Camera_Raea_Pipeline/parallax-push-through-image-illusion--smooth-3d-camera-movement.md
use-when: a camera flight should feel like it physically passes through a photo/screen/panel into the next scene

### pull-out-closes-a-chapter — Pull out (dolly out) = an ending, or loneliness
cards/05_Camera_Raea_Pipeline/pull-out-closes-a-chapter--overwatch-dragons-camera.md
use-when: the last setup of a block, or a line about a business left behind

### slow-push-in-marks-the-key-moment — Very subtle push-in = a key story moment
cards/05_Camera_Raea_Pipeline/slow-push-in-marks-the-key-moment--overwatch-dragons-camera.md
use-when: the payoff line (the RM number lands) or the line just before the reveal

### two-axis-camera-move — Combine two axes of camera movement when a move has no clear motive
cards/05_Camera_Raea_Pipeline/two-axis-camera-move--overwatch-dragons-camera.md
use-when: a setup with no object moving to motivate the camera

### view-frustum-culling-check — View-frustum visibility: an object outside the frustum isn't visible even if 'in front of' the camera
cards/05_Camera_Raea_Pipeline/view-frustum-culling-check--understanding-cameras.md
use-when: debugging why an object that should be on camera isn't rendering, or placing small props near the frame edge

## Counts

- Craft-group manifest rows covered: 91 (01_Animation_Motion 24, 02_Geometry_Nodes 26, 03_Modeling_Modifiers 0,
  04_Shading_Lighting 20, 05_Camera_Raea_Pipeline 21)
- Topics: 87 (76 standalone + 3 merge topics + 8 fold topics). By bucket: 01 has 22 standalone + 1 fold topic +
  1 merge topic (its other member sits in 05) = 24 cards; 02 has 26 standalone = 26 cards; 04 has 12 standalone +
  3 fold topics + 2 merge topics (3+2 members) = 20 cards; 05 has 16 standalone + 4 fold topics + 1 merge member
  (counted under 01) = 21 cards
- Merge topics (`[merge]`): 3 — multiplane-2d-layers-parallax-staging (member cards in 01 and 05),
  finishing-glint-extra-light (3 members, 04), twin-light-layered-shadow-softness (2 members, 04)
- Folds (`[fold → …]`): 8 — hierarchy-of-motion-lead-then-secondary → layered-animation-root-first (01);
  bounce-card-plane-fill → masters/04_Shading_Lighting/fake-bounce-lights.md, close-key-highlight-spans-product →
  side-strip-reflection-lights, staggered-light-fade-in-reveal → masters/04_Shading_Lighting/black-world-low-key-reveal.md (04);
  camera-move-menu-by-meaning → camera-move-vocabulary-transforms, height-minus-offset-math-seamless-whip →
  end-frame-is-next-start-frame-chaining, seamless-depth-push-scene-join → end-frame-is-next-start-frame-chaining,
  parallax-push-through-image-illusion → zoom-into-letter-loop-transition (05)
