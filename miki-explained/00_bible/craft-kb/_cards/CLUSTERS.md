# Craft-KB topic clusters

One topic = one technique an animator would look up. Every card in `MANIFEST.tsv` belongs to exactly one topic. Topics marked `[merge]` hold ≥2 cards that teach the same technique (redundant as separate lookups); related-but-different techniques stay apart. A topic sits under the bucket of its first card; member paths keep their own bucket. Paths are relative to `craft-kb/`.

## 01_Animation_Motion

### additive-layer-variation — Additive layer for pose variation
cards/01_Animation_Motion/additive-layer-variation--dinosaur-run-cycle.md
use-when: twin/mirrored objects (two doors, two coins) share timing but must not look cloned

### boids-flock — Boids flock to a goal
cards/01_Animation_Motion/boids-flock-goal-leader--renders-instantly-cooler.md
use-when: a swarm of coins/parcels/notifications flowing to one account or shop

### camera-relative-motion — Camera catches up with a moving hero (not locked)
cards/01_Animation_Motion/camera-relative-motion-not-locked--car-animation.md
use-when: tracking a travelling token, scooter or parcel so it feels fast

### constant-speed-contact-spans — Linear spans inside eased moves for contact
cards/01_Animation_Motion/constant-speed-contact-spans--dinosaur-run-cycle.md
use-when: an object riding a conveyor/belt or rolling while touching a surface

### copy-flip-curve-counter-motion — Reuse and flip a curve for counter-motion
cards/01_Animation_Motion/copy-flip-curve-counter-motion--dinosaur-run-cycle.md
use-when: a lid or ring countering its object's tilt so the hero feels alive

### copy-location-rotation-constraints — Copy Location / Copy Rotation constraints
cards/01_Animation_Motion/copy-location-rotation-constraints--constraints.md
use-when: mirrored parts (double doors, twin flaps) driven from one control

### copy-scale-power-constraint — Copy Scale with negative Power
cards/01_Animation_Motion/copy-scale-power-constraint--constraints.md
use-when: one bar/pile grows while another shrinks on the word (money moving from A to B)

### curve-modifier-path-deform — Curve modifier path deform
cards/01_Animation_Motion/curve-modifier-path-deform--modifiers.md
use-when: an arrow, ribbon or receipt strip flowing along a path between objects

### cycles-fmodifier-loops — Seamless loops with the Cycles F-modifier `[merge]`
cards/01_Animation_Motion/cycles-fmodifier-repeat-with-offset--car-animation.md
cards/01_Animation_Motion/seamless-cycle-curves--dinosaur-run-cycle.md
cards/01_Animation_Motion/shape-key-cyclic-wing-flap--renders-instantly-cooler.md
use-when: spinning coin, turning fan, looping flap or idle cycle under a held shot

### drag-overlap-chain — Overlap / drag down a chain (frame-offset cascade) `[merge]`
cards/01_Animation_Motion/drag-chain-base-leads-tip-follows--dinosaur-run-cycle.md
cards/01_Animation_Motion/overlap-cascade-frame-offset--dinosaur-run-cycle.md
use-when: a strap, cable, receipt roll or stacked items following a lead part

### drop-in-then-slide — Drop in, hang, slide into place
cards/01_Animation_Motion/drop-in-then-slide--product-animation-masterclass.md
use-when: secondary products arriving beside the hero object

### edge-pivot-tilt-recover — Edge-pivot tilt and recover
cards/01_Animation_Motion/edge-pivot-tilt-and-recover--product-animation-masterclass.md
use-when: a box/phone tipping on its edge as a beat accent

### falling-leaves-particles — Falling leaves particles with wind/turbulence
cards/01_Animation_Motion/falling-leaves-particles-wind-turbulence--renders-instantly-cooler.md
use-when: ambient leaves or paper scraps drifting through a shot

### fcurve-noise-micro-wobble — F-Curve Noise micro wobble on objects
cards/01_Animation_Motion/fcurve-noise-modifier-micro-wobble--product-animation-masterclass.md
use-when: a hovering/held hero object that must never look frozen

### floating-dust-particles — Floating dust / debris with turbulence
cards/01_Animation_Motion/floating-dust-debris-turbulence-particles--animate-still-renders.md
use-when: dust motes in the top-light cone of a dark-room macro shot

### follow-path-camera — Camera on a Follow Path curve
cards/01_Animation_Motion/follow-path-camera-constraint-order--blender-camera-rig.md
use-when: a camera flight along a designed route between setups

### graph-editor-free-handle-easing — Graph Editor free-handle easing (S-curve, fast-out, slow-in)
cards/01_Animation_Motion/graph-editor-free-handle-easing--product-animation-masterclass.md
use-when: shaping the ease of any object or camera move so it feels physical

### graph-editor-smooth-camera-curves — Smooth camera curves (auto-slope, retime by spacing)
cards/01_Animation_Motion/graph-editor-smooth-auto-slope--cg-cine-ch3-nuke.md
use-when: cleaning a camera path so in/out stays smooth under the speed check

### gutter-information-density — The gutter: information density between frames
cards/01_Animation_Motion/gutter-principle-information-density--illusion-of-animation.md
use-when: deciding how much change a fast setup cut can carry

### handheld-camera-shake — Handheld camera shake (rotation noise layers / Shakify) `[merge]`
cards/05_Camera_Raea_Pipeline/camera-shakify-handheld-shake--cinematography-next-level.md
cards/01_Animation_Motion/noise-amplitude-by-proximity-and-lens--cg-cine-ch4-chase.md
cards/01_Animation_Motion/procedural-handheld-noise-layer--cg-cine-ch2-camera-breakdown.md
cards/05_Camera_Raea_Pipeline/rotation-noise-camera-shake-layers--cg-cine-ch3-nuke.md
cards/05_Camera_Raea_Pipeline/subtle-handheld-camera-shake--animate-still-renders.md
use-when: adding life to a held macro shot or a close pass, scaled by proximity

### hold-drift-rotation — Slow rotation drift through a hold
cards/01_Animation_Motion/hold-drift-rotation-after-landing--product-animation-masterclass.md
use-when: a hero object resting after landing while the voice explains it

### impact-bump-recovery — Impact bump: fast drop, slow recovery
cards/01_Animation_Motion/impact-bump-asymmetric-recovery--cg-cine-ch3-nuke.md
use-when: a stamp, coin or box landing on the word

### lagging-pan — Lagging pan: subject pulls the camera
cards/01_Animation_Motion/lagging-pan-subject-pulls-camera--cg-cine-ch4-chase.md
use-when: following a moving token so the subject seems to drag the frame

### layered-animation-root-first — Layered animation, root first
cards/01_Animation_Motion/layered-animation-root-first--dinosaur-run-cycle.md
use-when: animating a multi-part object (lid, drawer, body) without chaos

### limit-constraints — Limit Distance / Rotation / Scale constraints
cards/01_Animation_Motion/limit-distance-rotation-scale--constraints.md
use-when: door/lid swing ranges and fixed orbits that must not overshoot

### linear-vs-eased-interpolation — Linear vs eased keys (move already under way on frame 1) `[merge]`
cards/01_Animation_Motion/linear-start-keys-already-moving--cg-cine-ch2-camera-breakdown.md
cards/05_Camera_Raea_Pipeline/linear-vs-eased-camera-interpolation--animate-still-renders.md
use-when: an odd moving first frame, or continuing a flight across a setup join

### maintain-volume-squash — Maintain Volume constraint
cards/01_Animation_Motion/maintain-volume-squash--constraints.md
use-when: a soft object (pouch, cushion) squashing under a press

### mantaflow-liquid-splash — Mantaflow liquid splash on a product
cards/01_Animation_Motion/mantaflow-liquid-splash-on-product--product-animation-masterclass.md
use-when: a drink or sauce splashing against an F&B hero product

### mirror-art-and-motion-style — Mirror the art style in the motion style
cards/01_Animation_Motion/mirror-art-and-motion-style-then-bleed--illusion-of-animation.md
use-when: setting how realistic vs stylised Style D motion should feel

### motion-continuity-across-cuts — Motion continuity across cuts
cards/01_Animation_Motion/motion-continuity-across-cuts--cinematography-next-level.md
use-when: joining two setups so direction and speed carry over

### motion-style-axis — Motion-style axis: squash/stretch and spacing
cards/01_Animation_Motion/motion-style-axis-squash-spacing--illusion-of-animation.md
use-when: deciding how stylised an object's move can be

### occluder-reveal — Occluder reveal: sliding object hides appearance
cards/01_Animation_Motion/occluder-reveal-slide-across--product-animation-masterclass.md
use-when: new items appearing behind a passing receipt, card or phone

### offscreen-preposition-reveal — Off-screen pre-positioning, reveal by perspective
cards/01_Animation_Motion/offscreen-preposition-reveal-by-perspective--eevee-animation-blender5.md
use-when: set pieces arriving where the camera can't see, revealed by the flight

### path-evaluation-time — Path Evaluation Time speed ramps
cards/01_Animation_Motion/path-evaluation-time-speed-ramps--blender-camera-rig.md
use-when: slowing a token or camera along a path to land on a word

### pop-tip-slide-choreography — Alternating pop / tip / slide choreography
cards/01_Animation_Motion/pop-tip-slide-alternating-choreography--product-animation-masterclass.md
use-when: a sequence of items (products, steps) entering one after another

### preroll-spark-particles — Pre-rolled spark particles
cards/01_Animation_Motion/preroll-spark-particles--beautiful-fire.md
use-when: sparks or embers already moving on frame 1 (fire, welding, payoff glints)

### procedural-wind-sway — Procedural wind sway without simulation
cards/01_Animation_Motion/procedural-wind-sway-no-sim--realistic-environments.md
use-when: plants, banners or hanging tags moving subtly in a held shot

### product-slide-in-friction-stop — Slide-in with friction stop and edge rock
cards/01_Animation_Motion/product-slide-in-friction-stop--product-animation-masterclass.md
use-when: a product sliding onto the counter on its word

### reality-stylized-abstract-map — Reality-stylized-abstract triangle
cards/01_Animation_Motion/reality-stylized-abstract-style-map--illusion-of-animation.md
use-when: choosing where the episode's look sits and avoiding the failure zones

### scale-in-appear — Scale objects in/out to appear (keyframe any property) `[merge]`
cards/01_Animation_Motion/keyframe-any-property-scale-appear--animate-still-renders.md
cards/01_Animation_Motion/scale-pop-in-overshoot--product-animation-masterclass.md
use-when: a label, coin or prop growing in over ~0.4 s instead of popping

### silhouette-reveal-rising-camera-rim — Silhouette reveal: camera and rim rise together
cards/01_Animation_Motion/silhouette-reveal-rising-camera-and-rim--perfect-product-animations.md
use-when: hero object's first reveal out of the dark

### simple-deform-morphs — Simple Deform Twist/Bend/Taper/Stretch
cards/01_Animation_Motion/simple-deform-twist-bend-taper-stretch--modifiers.md
use-when: object morphs on the word (a bill curling, a bar bending into a chart)

### slow-descent-then-connect — Slow drift then quick connect
cards/01_Animation_Motion/slow-descent-then-connect--perfect-product-animations.md
use-when: a card meeting a terminal, a lid closing, a plug connecting

### staggered-pop-in — Staggered appearance order
cards/01_Animation_Motion/staggered-pop-in-sequence--product-animation-masterclass.md
use-when: hero first, supporting labels/objects offset on the beat

### transformation-constraint-map-range — Transformation constraint as Map Range
cards/01_Animation_Motion/transformation-constraint-map-range--constraints.md
use-when: mechanisms: a slider moving turns a dial, a handle lifts a flap

### transformation-modes-ideation — Transformation modes for ideas (X becomes Y ...)
cards/01_Animation_Motion/transformation-modes-ideation--product-animation-masterclass.md
use-when: designing how an object changes state on a line

### treadmill-to-travel-cycle — In-place cycle to travel (cycle with offset)
cards/01_Animation_Motion/treadmill-to-travel-cycle-offset--dinosaur-run-cycle.md
use-when: a rolling/walking cycle that must actually advance across the set

### two-keyframe-camera-move — Two-keyframe camera move (slow push/pull, flight) `[merge]`
cards/05_Camera_Raea_Pipeline/two-keyframe-camera-flight--animate-still-renders.md
cards/01_Animation_Motion/two-keyframe-slow-push-pull--five-ways-environments.md
use-when: the simplest setup-to-setup push or flight on a still subject

### wave-modifier-ripple — Wave modifier ripple `[merge]`
cards/03_Modeling_Modifiers/vertex-bevel-ripple-wave-modifier--perfect-product-animations.md
cards/01_Animation_Motion/wave-modifier-ripple--modifiers.md
use-when: a one-shot ripple when a coin/drop hits a surface

### weight-spacing — Weight through asymmetric spacing
cards/01_Animation_Motion/weight-spacing-fast-drop-slow-apex--dinosaur-run-cycle.md
use-when: a heavy object being lifted or landing so it reads heavy

### zoom-overshoot-correct — Operated zoom with slight overshoot and correction
cards/01_Animation_Motion/zoom-overshoot-correct-settle--cg-cine-ch4-chase.md
use-when: a documentary-style lens adjustment (check against no-crash-zoom rule)

## 02_Geometry_Nodes

### edge-curvature-wear-mask — Edge/curvature masks for wear and scratches `[merge]`
cards/04_Shading_Lighting/curvature-and-painted-masks--houdini-volumes-masterclass.md
cards/02_Geometry_Nodes/edge-angle-attribute-scratch-mask--pro-materials.md
use-when: worn edges on a metal till, tin or tool in macro

### exposed-material-controls — Expose material controls on a GN modifier
cards/02_Geometry_Nodes/exposed-material-controls-gn-modifier--pro-materials.md
use-when: one reusable material tweaked per episode without opening nodes

### fracture-chunk-carving — Carve a silhouette by deleting fracture chunks
cards/02_Geometry_Nodes/fracture-chunk-carving-silhouette--houdini-volumes-masterclass.md
use-when: a broken/chipped object or a crumbling block as a metaphor

### gn-array — GN array with Mesh Line / Mesh Circle
cards/02_Geometry_Nodes/gn-array-mesh-line-circle-instance-on-points--modifiers.md
use-when: rows or rings of coins, stools, shelves

### gn-scatter-instance-on-points — Scatter with Distribute Points on Faces -> Instance on Points `[merge]`
cards/02_Geometry_Nodes/collection-scatter-instance-on-points--crazy-renders-geo-nodes.md
cards/02_Geometry_Nodes/gn-scatter-fine-debris--detailed-foregrounds.md
use-when: dressing a surface with props, pebbles or debris around the hero

### gn-water-droplets — Condensation droplets on a product
cards/02_Geometry_Nodes/gn-water-droplets-on-product--product-animation-masterclass.md
use-when: a cold drink can/bottle in an F&B macro

### gradient-directed-displacement — Gradient-directed volume displacement
cards/02_Geometry_Nodes/gradient-directed-volume-displacement--houdini-volumes-masterclass.md
use-when: rock/terrain detail built procedurally (rare for us)

### instance-random-scale-rotation — Random per-instance scale and rotation `[merge]`
cards/02_Geometry_Nodes/instance-variation-orient-pscale--houdini-volumes-masterclass.md
cards/02_Geometry_Nodes/random-scale-snapped-z-rotation--crazy-renders-geo-nodes.md
use-when: making scattered coins, tiles or debris look non-repeated

### layered-noise-rock — Layered noise stack for faceted rock
cards/02_Geometry_Nodes/layered-noise-stack-faceted-rock--houdini-volumes-masterclass.md
use-when: stylised rock or stone surfaces

### multi-species-scatter — Scatter variety: many asset types, never one
cards/02_Geometry_Nodes/multi-species-scatter-variety--realistic-environments.md
use-when: dressing a street/market so it doesn't look copy-pasted

### noise-mask-scatter-density — Noise masks for scatter density and scale
cards/02_Geometry_Nodes/noise-mask-density-and-scale--realistic-environments.md
use-when: natural clumping of scattered props

### normal-up-height-mask — Mask by dot(N, up) and height
cards/02_Geometry_Nodes/normal-up-height-mask-blend--houdini-volumes-masterclass.md
use-when: detail only on top faces (dust, moss, wear)

### per-piece-centroid-rotation — Random rotation per piece about its centroid
cards/02_Geometry_Nodes/per-piece-centroid-rotation--houdini-volumes-masterclass.md
use-when: tilting tiles/pieces of a broken object believably

### per-piece-noise-cracks — Per-piece noise offset to open cracks
cards/02_Geometry_Nodes/per-piece-noise-offset-cracks--houdini-volumes-masterclass.md
use-when: a cracked object as a metaphor (cracked margin, broken wall)

### proximity-exclusion-mask — Proximity exclusion mask for scatter
cards/02_Geometry_Nodes/proximity-exclusion-mask--realistic-environments.md
use-when: keeping scatter off the hero object and paths

### scatter-hero-cluster — Scatter a cluster of one asset and morph it into place
cards/02_Geometry_Nodes/scatter-hero-cluster-hide-intersections--serene-render.md
use-when: a pile of one item (coins, boxes) assembling

### unified-noise-rockifier — Rockifier: Worley terrain fractal + cellular cracks
cards/02_Geometry_Nodes/unified-noise-rockifier-cellular-cracks--houdini-volumes-masterclass.md
use-when: procedural rock (rare)

### volume-density-noise-multiply — Density x clamped noise to carve holes
cards/02_Geometry_Nodes/volume-density-noise-multiply--houdini-volumes-masterclass.md
use-when: eroded/porous volumes (rare)

### volume-sample-offset-displacement — Volume displacement by offset sampling
cards/02_Geometry_Nodes/volume-sample-offset-displacement--houdini-volumes-masterclass.md
use-when: procedural volume detail (rare)

### voronoi-plate-ground — Voronoi plate ground breakup
cards/02_Geometry_Nodes/voronoi-plate-ground-breakup--houdini-volumes-masterclass.md
use-when: cracked paving or tiled ground

### world-space-erosion-streaks — World-space anisotropic erosion streaks
cards/02_Geometry_Nodes/world-space-erosion-streak-noise--houdini-volumes-masterclass.md
use-when: weathered walls/stone streaks

## 03_Modeling_Modifiers

### array-railing — Railing from separated faces + Array
cards/03_Modeling_Modifiers/array-railing-from-separated-faces--add-tons-of-detail.md
use-when: railings/balustrades on shophouses

### array-set-dressing — Array modifier set dressing
cards/03_Modeling_Modifiers/array-modifier-set-dressing--car-animation.md
use-when: repeating lights, shelves, street lamps along a run

### arrayed-background-depth — Arrayed background towers in fog
cards/03_Modeling_Modifiers/arrayed-arch-towers-background-depth--eevee-animation-blender5.md
use-when: distant depth layers behind a scene

### arrayed-tile-strip-radial — Arrayed roof tiles, Boolean-trimmed, radial copies
cards/03_Modeling_Modifiers/arrayed-tile-strip-boolean-radial-copies--cyber-japan-breakdown.md
use-when: tiled roofs on a model shop

### base-geometry-first-slab-wall — Layered slab wall before any volume pass
cards/03_Modeling_Modifiers/base-geometry-first-clipped-slab-wall--houdini-volumes-masterclass.md
use-when: rock/stone walls (rare)

### bevel-miters — Bevel miters (Outer Arc / Inner Sharp)
cards/03_Modeling_Modifiers/bevel-miter-inner-outer--manual-bevels.md
use-when: clean rounded corners on hard-surface props

### bevel-modifier-limit-method — Bevel modifier Angle vs Weight limit
cards/03_Modeling_Modifiers/bevel-modifier-angle-vs-weight-limit--manual-bevels.md
use-when: bevelling a library or CAD prop so edges catch the top light

### bevel-segment-count — Bevel segment count (even numbers, 2 under SubD)
cards/03_Modeling_Modifiers/bevel-segments-even-count--manual-bevels.md
use-when: prop topology that subdivides cleanly

### bevel-tool-operator — Bevel tool operator settings and custom profile
cards/03_Modeling_Modifiers/bevel-tool-operator-settings--manual-bevels.md
use-when: hand-bevelling edges/vertices, stair profiles

### beveled-tile-cluster-dressing — Beveled tile clusters as foreground dressing
cards/03_Modeling_Modifiers/beveled-tile-cluster-foreground-dressing--eevee-animation-blender5.md
use-when: foreground floor detail in a low shot

### blockout-first — Blockout (and hero object) first, then detail `[merge]`
cards/03_Modeling_Modifiers/blockout-or-hero-object-first--beautiful-environments.md
cards/05_Camera_Raea_Pipeline/lightweight-blockout-then-detail-fast-tests--eevee-animation-blender5.md
cards/05_Camera_Raea_Pipeline/reference-blockout-camera-first--add-tons-of-detail.md
use-when: starting any new set or episode build

### boolean-grid-cutter — Boolean grid cutter for square-cell relief
cards/03_Modeling_Modifiers/boolean-grid-cutter-carve--serene-render.md
use-when: a gridded/pixelated relief surface

### boolean-weighted-normal — Boolean cuts + Weighted Normal fix
cards/03_Modeling_Modifiers/boolean-booltool-weighted-normal-fix--modifiers.md
use-when: cutting slots/holes in a hard-surface prop (card reader, till)

### break-repetition-kit-dressing — Break repetition: variants, messy offsets, bridges `[merge]`
cards/03_Modeling_Modifiers/break-repetition-variants-and-bridges--detail-isnt-hard.md
cards/03_Modeling_Modifiers/kit-dressing-arrays-messy-offsets-stack-set--add-tons-of-detail.md
use-when: dressing shelves/stacks so kit pieces don't read as copies

### camera-only-clutter-dressing — Foundation first, clutter last, dressed through the camera
cards/03_Modeling_Modifiers/camera-only-clutter-dressing--industrial-scene.md
use-when: final set dressing of a shot

### can-body-from-cylinder — Can body from a cylinder profile
cards/03_Modeling_Modifiers/can-body-from-cylinder-profile--product-animation-masterclass.md
use-when: modelling a drink can or tin hero object

### chamfer-weighted-normal-lowpoly — One-segment chamfer + Weighted Normal for background props
cards/03_Modeling_Modifiers/chamfer-weighted-normal-lowpoly--manual-bevels.md
use-when: cheap background props that still catch light

### cylinder-wall-checker-extrude — Cylinder wall with Checker Deselect + extrude
cards/03_Modeling_Modifiers/cylinder-wall-checker-deselect-extrude--serene-render.md
use-when: a regular relief backdrop wall

### detail-flat-then-warp — Detail flat, then warp with proportional editing
cards/03_Modeling_Modifiers/detail-flat-then-warp-proportional-editing--cyber-japan-breakdown.md
use-when: upswept roofs or curved signage

### displaced-ground-plane — Displaced ground plane
cards/03_Modeling_Modifiers/adaptive-subdivision-displacement-ground--detailed-foregrounds.md
use-when: a real-surface ground under the macro object

### edge-displacement-tangent-slide — Edge-only displacement by tangent sliding
cards/03_Modeling_Modifiers/edge-displacement-tangent-slide--houdini-volumes-masterclass.md
use-when: procedural edge breakup (rare)

### fog-volume-roundtrip — Fog-volume round trip (mesh -> voxels -> mesh)
cards/03_Modeling_Modifiers/fog-volume-roundtrip-iso-surface--houdini-volumes-masterclass.md
use-when: remeshing messy geometry into one skin (rare)

### fuse-pieces-via-volume — Fuse overlapping pieces via a volume
cards/03_Modeling_Modifiers/fuse-overlapping-pieces-via-volume--houdini-volumes-masterclass.md
use-when: merging overlapping chunks into one surface (rare)

### hard-surface-modifier-stack — Mirror -> Solidify -> SubD -> Weighted Normal stack
cards/03_Modeling_Modifiers/mirror-solidify-subd-weighted-normal-stack--modifiers.md
use-when: fast hard-surface props

### kit-piece-variants-correct-face-attributes — Kit piece variants with Correct Face Attributes
cards/03_Modeling_Modifiers/kit-piece-variants-correct-face-attributes--crazy-renders-geo-nodes.md
use-when: resizing kit pieces without stretching their texture

### kitbash-module-reuse — Build kit modules/clusters once, reuse as instances `[merge]`
cards/03_Modeling_Modifiers/cluster-reuse-set-building--crazy-renders-geo-nodes.md
cards/03_Modeling_Modifiers/collection-instance-kitbash--detail-isnt-hard.md
cards/03_Modeling_Modifiers/modular-kitbash-chunks-asset-library--industrial-scene.md
cards/03_Modeling_Modifiers/reusable-kitbash-modules-bevel-mirror-array--serene-render.md
use-when: building a set fast from reusable pieces

### lattice-deform — Lattice regional deform
cards/03_Modeling_Modifiers/lattice-regional-deform--modifiers.md
use-when: bulging/pinching part of an object on a word

### low-poly-layout-proxies — Low-poly layout proxies and obstacles
cards/03_Modeling_Modifiers/low-poly-layout-proxies-and-obstacles--cg-cine-ch4-chase.md
use-when: grey-box motion layout before detail

### modifier-stack-order — Modifier stack order and applying
cards/03_Modeling_Modifiers/modifier-stack-order-and-apply--modifiers.md
use-when: fixing a modifier result / preparing GLB export

### per-edge-bevel-hierarchy — Per-edge manual bevels in a size hierarchy
cards/03_Modeling_Modifiers/per-edge-manual-bevel-hierarchy--manual-bevels.md
use-when: macro hero props where every edge is seen

### pile-layering — Medium-chunk piles from duplicated models
cards/03_Modeling_Modifiers/pile-layering-medium-chunks--detailed-foregrounds.md
use-when: a pile of boxes/sacks/coins

### pipe-cluster-kit — Pipe-cluster kit piece with linked data
cards/03_Modeling_Modifiers/pipe-cluster-kit-linked-data--add-tons-of-detail.md
use-when: pipes/cables on walls and back rooms

### pull-tab-mirror-clipping — Pull tab: half-model with Mirror + Clipping
cards/03_Modeling_Modifiers/pull-tab-mirror-clipping-from-plane--product-animation-masterclass.md
use-when: a can pull tab or small symmetric part

### reference-mirror-trim-piece — Reference board -> repeating trim piece with Mirror
cards/03_Modeling_Modifiers/reference-repeat-shapes-mirror-trim--cyber-japan-breakdown.md
use-when: architectural trim from a mood board

### remesh-text-to-quads — Remesh text to quads
cards/03_Modeling_Modifiers/remesh-text-to-quads--modifiers.md
use-when: 3D text/numbers that must deform or bevel cleanly

### ridge-border-strip — Ridge/border tile strip on a 45° view
cards/03_Modeling_Modifiers/ridge-border-strip-45-degree-view-align--cyber-japan-breakdown.md
use-when: roof ridges and border trims

### screw-lathe — Lathe glassware with the Screw modifier
cards/03_Modeling_Modifiers/screw-lathe-vase-glass--modifiers.md
use-when: cups, bottles, bowls for F&B shots

### sdf-volume-displacement — Displace an SDF instead of a fog volume
cards/03_Modeling_Modifiers/sdf-surface-volume-displacement--houdini-volumes-masterclass.md
use-when: procedural volume surfaces (rare)

### simple-shape-detail-module — Detail module from one cube
cards/03_Modeling_Modifiers/simple-shape-detail-module--detail-isnt-hard.md
use-when: quick detail pieces (vents, panels) for props

### simple-shapes-good-texture — Simple shapes + a good texture
cards/03_Modeling_Modifiers/simple-shapes-good-texture-arch--five-ways-environments.md
use-when: background architecture that only needs to read

### structural-bracket-snap-base — Structural bracket + Snap Base assembly
cards/03_Modeling_Modifiers/structural-bracket-and-snap-combined-variants--add-tons-of-detail.md
use-when: shelf brackets, frames, joined kit pieces

### sweep-backdrop — Seamless sweep backdrop
cards/03_Modeling_Modifiers/sweep-backdrop-plane-extrude-bevel--product-animation-masterclass.md
use-when: a studio-sweep stage under the hero object

### terraced-steps-depth — Terraced steps descending into water
cards/03_Modeling_Modifiers/terraced-steps-into-water-depth--serene-render.md
use-when: showing levels/depth (tiers of a number)

### three-tier-foreground-detail — Three-tier foreground detail
cards/03_Modeling_Modifiers/three-tier-foreground-detail--detailed-foregrounds.md
use-when: a low macro shot where the ground fills the frame

### volume-boolean-clip — Clip a volume with another volume
cards/03_Modeling_Modifiers/volume-boolean-clip--houdini-volumes-masterclass.md
use-when: trimming a fog/volume shape (rare)

### wall-panel-inset-extrude — Panelled walls via inset + extrude along normals
cards/03_Modeling_Modifiers/wall-panel-inset-extrude-detail--add-tons-of-detail.md
use-when: detailed walls/shutters behind the hero

### wireframe-modifier — Wireframe modifier wire model
cards/03_Modeling_Modifiers/wireframe-modifier-wire-model--modifiers.md
use-when: an x-ray/blueprint state of the hero object on the word

## 04_Shading_Lighting

### accent-colour-rim — Backlit disk rim light in the accent colour
cards/04_Shading_Lighting/backlit-disk-rim-light--perfect-product-animations.md
use-when: the brand accent on what the line is about

### ao-node-dirt-mask — AO node as a proximity dirt mask
cards/04_Shading_Lighting/ao-node-dirt-mask--pro-materials.md
use-when: grime in the crevices of a well-used object

### area-key-reflections-coloured-uplight — Large area key for metal reflections + tinted uplight
cards/04_Shading_Lighting/area-key-reflections-plus-colored-uplight--add-tons-of-detail.md
use-when: metallic hero (till, coin, tin) in the dark room

### back-light-first-halo — Low-key build starting from the back light
cards/04_Shading_Lighting/back-light-first-hair-rim-halo--lighting-characters.md
use-when: a silhouette-first hero reveal in haze

### backdrop-distance-spill — Push the backdrop away to kill spill
cards/04_Shading_Lighting/backdrop-distance-controls-light-spill--perfect-product-animations.md
use-when: keeping the background black behind a lit object

### backlight-source-out-of-frame — Backlight with the source just out of frame
cards/04_Shading_Lighting/backlight-sun-just-out-of-frame--backlight-everything.md
use-when: glowing edges on an object against the dark

### balance-to-uncontrolled-brightest — Balance exposure to the brightest thing you can't control
cards/04_Shading_Lighting/balance-to-what-you-cant-control--backlight-everything.md
use-when: a shot with a bright screen or sign in frame

### black-world-low-key-reveal — Black world + soft key/edge lights (low-key reveal) `[merge]`
cards/04_Shading_Lighting/black-world-key-and-edge-rim-area-lights--product-animation-masterclass.md
cards/04_Shading_Lighting/black-world-soft-reveal-lighting--car-animation.md
use-when: the opening dark-room reveal of the hero object

### brushed-aluminium — Brushed aluminium from noise on Object coords
cards/04_Shading_Lighting/brushed-aluminium-noise-object-coords--product-animation-masterclass.md
use-when: a can/tin/appliance hero in macro

### camera-locked-backdrop-gradient — Camera-parented backdrop with a light gradient
cards/04_Shading_Lighting/camera-locked-backdrop-gradient--perfect-product-animations.md
use-when: a clean gradient behind the hero that follows every setup

### cheated-rim-spot — Cheated rim spot in the source's colour
cards/04_Shading_Lighting/cheated-rim-spot--ten-cinematic-tips.md
use-when: separating the hero from the dark background

### checkerboard-lighting — Checkerboard lighting (alternate contrast)
cards/04_Shading_Lighting/checkerboard-lighting-alternating-contrast--lighting-characters.md
use-when: making layered objects read against each other

### coated-metal-can — Printed metal can surface (metallic + anisotropy + coat)
cards/04_Shading_Lighting/coated-metal-can-principled-settings--product-animation-masterclass.md
use-when: a drink can or printed tin as the hero

### colour-match-library-assets — Colour-match library assets (Hue/Sat + Multiply) `[merge]`
cards/04_Shading_Lighting/color-match-asset-hue-sat-multiply--eevee-animation-blender5.md
cards/04_Shading_Lighting/colour-match-imported-assets-hue-saturation--serene-render.md
use-when: making a downloaded model sit in the episode palette

### colour-psychology — Colour psychology of hues and light tints `[merge]`
cards/04_Shading_Lighting/colour-psychology-light-tints--lighting-characters.md
cards/04_Shading_Lighting/hsv-colour-psychology-cultural-meaning--power-of-color.md
use-when: choosing the accent/light tint for a line's meaning

### colour-wheel-palette-schemes — Colour-wheel palette schemes (complementary, mono, tetradic...) `[merge]`
cards/04_Shading_Lighting/complementary-dominant-accent-palette--nice-colors.md
cards/04_Shading_Lighting/four-colour-schemes-four-questions--key-to-realistic-renders.md
cards/04_Shading_Lighting/monochromatic-palette--nice-colors.md
cards/04_Shading_Lighting/six-colour-schemes-colour-wheel--power-of-color.md
cards/04_Shading_Lighting/tetradic-palette-variant-colours--product-animation-masterclass.md
use-when: picking the episode palette around the brand accent

### colourful-texture-coloured-key — Colour-rich texture + coloured key
cards/04_Shading_Lighting/colorful-texture-plus-colored-key--nice-colors.md
use-when: adding natural colour without a saturated grade

### colourway-variants-alpha-mask — Colourway variants via the label's alpha as mix factor
cards/04_Shading_Lighting/colourway-variants-alpha-mask-mix--product-animation-masterclass.md
use-when: showing the same product in several colours

### crush-ground-texture — Story texture on the ground, crushed dark
cards/04_Shading_Lighting/rgb-curves-crush-ground-texture--fundamentals-of-lighting.md
use-when: a ground that tells story but keeps the silhouette

### dark-ground-plane — Near-black rough ground plane
cards/04_Shading_Lighting/dark-ground-plane-silhouette--fundamentals-of-lighting.md
use-when: silhouette and bounce control under the hero

### darkness-guides-the-eye — Darken/leave unlit what doesn't matter `[merge]`
cards/04_Shading_Lighting/darken-unimportant-areas-guide-eye--renders-look-boring.md
cards/04_Shading_Lighting/hide-weak-areas-in-darkness--dark-environments.md
use-when: hiding weak areas and steering the eye to the subject

### day-to-night-transition — Day-to-night transition (sky ramp + light fades)
cards/04_Shading_Lighting/sky-and-light-fade-day-to-night-transition--eevee-animation-blender5.md
use-when: time passing on a line (opening hours, a day's sales)

### dim-fill-lift-shadows — Dim fill to lift shadow detail (keep the dark) `[merge]`
cards/04_Shading_Lighting/area-light-shadow-lift-fill--dark-environments.md
cards/04_Shading_Lighting/dim-fill-for-shadow-side--fundamentals-of-lighting.md
cards/04_Shading_Lighting/large-dim-fill-lifts-crushed-blacks--product-animation-masterclass.md
use-when: dark-room macro where blacks crush on the phone

### displacement-map-emissive-pattern — Displacement maps as glowing emissive patterns
cards/04_Shading_Lighting/displacement-map-emissive-pattern--emission-textures.md
use-when: sci-fi/tech glowing patterns on a screen or surface

### dramatic-spot-area-fill — Dramatic spotlight key + faint area fill
cards/04_Shading_Lighting/dramatic-spot-plus-area-fill--good-lighting-environments.md
use-when: a motivated hard pool of light on the subject

### duplicate-key-support-lights — Support lights = duplicated key at lower power `[merge]`
cards/04_Shading_Lighting/duplicate-key-as-same-direction-fill--use-lighting-in-renders.md
cards/04_Shading_Lighting/narrow-contained-support-spots--dark-environments.md
use-when: adding light without breaking the one-source read

### emission-colour-state-change — Keyframed emission colour as a state change
cards/04_Shading_Lighting/emission-colour-state-change-keys--perfect-product-animations.md
use-when: an object lighting up in the accent on its word

### emissive-lantern-core-shell — Glowing lantern: emission core in translucent shell
cards/04_Shading_Lighting/emissive-lantern-inner-core-translucent-shell--cyber-japan-breakdown.md
use-when: lanterns, lamps, lit signs

### emissive-practical-plus-light — Pair every emissive practical with a real light `[merge]`
cards/04_Shading_Lighting/emissive-practical-plus-light--ten-cinematic-tips.md
cards/04_Shading_Lighting/practical-light-carries-emissive--beautiful-fire.md
use-when: a glowing sign/screen that must light its surroundings

### exclude-fills-from-volume — Keep fake fills out of volumetric fog
cards/04_Shading_Lighting/exclude-fill-lights-from-volume--better-lighting-trick.md
use-when: fills making the haze glow everywhere (washout)

### fake-bounce-lights — Fake bounce lights (soft point/area where bounce is plausible) `[merge]`
cards/04_Shading_Lighting/big-soft-fill-as-reflector-patch--better-lighting-trick.md
cards/04_Shading_Lighting/fake-bounce-area-lights-plausible-placement--better-lighting-trick.md
cards/04_Shading_Lighting/fake-bounce-point-light--lighting-secrets.md
cards/04_Shading_Lighting/faked-bounce-point-lights--dark-environments.md
use-when: lifting dark corners believably in real-time (no path tracing)

### fill-light-intersection-artifact — Keep fill lights clear of geometry
cards/04_Shading_Lighting/fill-light-geometry-intersection-artifact--better-lighting-trick.md
use-when: fixing light-intersection lines

### film-palette-selective-pop — Film palettes and selective colour pop
cards/04_Shading_Lighting/film-palettes-selective-colour-pop--key-to-realistic-renders.md
use-when: one saturated accent in a neutral frame (Style D)

### fire-on-emissive-plane — Photo/video fire on an emissive keyed plane `[merge]`
cards/04_Shading_Lighting/photo-video-fire-emission-plane--emission-textures.md
cards/04_Shading_Lighting/video-fire-on-keyed-plane--beautiful-fire.md
use-when: a stove or flame in an F&B shot without simulation

### fog-sprite-billboards — Fog sprites as camera-facing particles
cards/04_Shading_Lighting/fog-sprite-particle-billboards--renders-instantly-cooler.md
use-when: ground fog patches in a wide

### form-light-rig-jobs — Lights with jobs: top base, side spots carve, back points silhouette
cards/04_Shading_Lighting/form-light-rig-top-area-side-spots-backlight-silhouette--cyber-japan-breakdown.md
use-when: a full set light plan for a shop/diorama

### form-revealing-raking-key — Hard raking side key so shadows reveal form `[merge]`
cards/04_Shading_Lighting/hard-side-light-reveals-form--improve-compositions.md
cards/04_Shading_Lighting/raking-key-angle-reveals-form--serene-render.md
cards/04_Shading_Lighting/shadow-reveals-form--fundamentals-of-lighting.md
use-when: showing texture/relief of the hero object

### gaffer-story-lighting — Gaffer mindset: intentional story lighting
cards/04_Shading_Lighting/gaffer-intentional-story-lighting--key-to-realistic-renders.md
use-when: deciding what the light says on each line

### gobo-shadow-patterns — Gobos: alpha planes for patterned/moving shadows `[merge]`
cards/04_Shading_Lighting/gobo-alpha-plane-shadow-pattern--power-of-lighting.md
cards/04_Shading_Lighting/lighting-gobo-alpha-plane--serene-render.md
cards/04_Shading_Lighting/lighting-gobo-blocker-plane--lighting-secrets.md
cards/04_Shading_Lighting/noise-alpha-cloud-shadow-gobo--renders-instantly-cooler.md
use-when: window blinds, leaves or drifting cloud shadows across the set

### golden-hour-low-sun — Golden-hour low sun
cards/04_Shading_Lighting/golden-hour-low-sun--good-lighting-environments.md
use-when: warm late-day street/exterior shots

### gradient-alpha-atmosphere-planes — Gradient-alpha atmosphere planes between depth layers
cards/04_Shading_Lighting/gradient-alpha-atmosphere-planes--renders-instantly-cooler.md
use-when: 2D depth haze between layers of a wide

### gradient-emissive-softbox — Gradient-falloff emissive plane softbox `[merge]`
cards/04_Shading_Lighting/gradient-alpha-emissive-plane-light--key-to-realistic-renders.md
cards/04_Shading_Lighting/gradient-emission-planes-for-glass--realistic-product-lighting.md
cards/04_Shading_Lighting/gradient-emissive-plane-softbox--car-animation.md
use-when: soft reflection strips on glass/gloss instead of hard rectangles

### grunge-image-roughness — Grunge/imperfection image into roughness `[merge]`
cards/04_Shading_Lighting/grunge-image-roughness-ramp--industrial-scene.md
cards/04_Shading_Lighting/image-imperfections-into-coat-roughness--pro-materials.md
cards/04_Shading_Lighting/single-photo-grunge-material--crazy-renders-geo-nodes.md
use-when: wear and fingerprints on a macro surface

### hdri-vs-plain-world — HDRI for bright scenes, plain world for dark
cards/04_Shading_Lighting/hdri-for-bright-plain-world-for-dark--lighting-characters.md
use-when: choosing the world lighting for a set

### hidden-emission-planes-interior — Hidden emission planes for interior light
cards/04_Shading_Lighting/hidden-emission-planes-interior-light--10-blender-tricks.md
use-when: lighting a shop interior or box interior

### hide-light-in-reflections — Hide a light's shape in reflections (Glossy visibility off) `[merge]`
cards/04_Shading_Lighting/disable-glossy-ray-visibility-on-light--key-to-realistic-renders.md
cards/04_Shading_Lighting/hide-light-in-reflections-mis-glossy--better-lighting-trick.md
use-when: glossy hero showing a fake CG light rectangle

### ies-light-profiles — IES light profiles
cards/04_Shading_Lighting/ies-light-profiles--power-of-lighting.md
use-when: real fixture light shapes (downlights on a counter)

### image-atmosphere-cards — Dust / light-ray / fog image cards on alpha planes `[merge]`
cards/04_Shading_Lighting/dust-and-light-ray-card-planes--lighting-characters.md
cards/04_Shading_Lighting/god-ray-image-plane-alpha--renders-instantly-cooler.md
use-when: cheap god rays or dust in the top-light cone

### image-textured-light — Image-textured light (photo/caustics in the light) `[merge]`
cards/04_Shading_Lighting/fake-caustics-light--lighting-secrets.md
cards/04_Shading_Lighting/image-textured-light--lighting-secrets.md
use-when: natural uneven light pools, water caustics near glass

### kelvin-light-colour — Light colour in Kelvin (Blackbody) vs free colour `[merge]`
cards/04_Shading_Lighting/blackbody-kelvin-light-colour--power-of-lighting.md
cards/04_Shading_Lighting/kelvin-vs-colour-light--fundamentals-of-lighting.md
use-when: warm practical vs cool ambient light colour choices

### key-position-patterns — Key-position patterns (butterfly, loop, Rembrandt, split)
cards/04_Shading_Lighting/key-position-patterns-butterfly-loop-rembrandt-split--lighting-characters.md
use-when: lighting faces/figures (rare; figures hold poses)

### layered-see-through-emitters — Split colour/alpha for layered see-through emitters
cards/04_Shading_Lighting/split-colour-alpha-layered-emitters--emission-textures.md
use-when: holographic or layered glowing graphics

### library-texture-cube-projection — One library texture + Cube Projection UV on everything `[merge]`
cards/04_Shading_Lighting/library-texture-cube-projection-kit-library--detail-isnt-hard.md
cards/04_Shading_Lighting/whole-scene-cube-projection-uv-material-link--add-tons-of-detail.md
use-when: texturing many kit pieces/props fast

### library-texture-light-touch — Use library textures with only light adjustments
cards/04_Shading_Lighting/library-texture-light-touch--beautiful-environments.md
use-when: applying fresh 2k PBR sets per episode

### light-blockers-flags — Blockers / off-screen casters to contain light `[merge]`
cards/04_Shading_Lighting/light-blockers-contain-bright-light--dark-environments.md
cards/04_Shading_Lighting/offscreen-shadow-casters--good-lighting-environments.md
use-when: keeping a bright light only where the line needs it

### light-falloff-colour-gradient — Light Falloff colour gradient with distance
cards/04_Shading_Lighting/light-falloff-color-gradient--lighting-secrets.md
use-when: warm-to-cool shift across a light pool

### light-falloff-distance — Inverse-square falloff: near light steers, high light evens `[merge]`
cards/04_Shading_Lighting/high-point-light-minimal-falloff--fundamentals-of-lighting.md
cards/04_Shading_Lighting/inverse-square-falloff-attention--fundamentals-of-lighting.md
use-when: controlling where attention falls by light distance

### light-intensity-remove-unmotivated — Balance each light; remove unmotivated lights
cards/04_Shading_Lighting/light-intensity-per-light-group-remove-unmotivated--advanced-comp-nuke-wk1.md
use-when: checking a light rig for fake-looking sources

### light-linking — Light linking (light only chosen objects) `[merge]`
cards/04_Shading_Lighting/light-linking-exclude-floor-reflection--perfect-product-animations.md
cards/04_Shading_Lighting/light-linking-protect-floor-reflection--realistic-product-lighting.md
cards/04_Shading_Lighting/light-linking-shadow-linking--key-to-realistic-renders.md
cards/04_Shading_Lighting/light-linking-single-product--product-animation-masterclass.md
use-when: rim on the product but not the reflective floor

### light-orbit-3d-cursor-pivot — Orbit/sweep lights around the subject with a 3D-cursor pivot `[merge]`
cards/04_Shading_Lighting/3d-cursor-orbit-duplicate-lights--realistic-product-lighting.md
cards/04_Shading_Lighting/3d-cursor-pivot-light-angle-sweep--use-lighting-in-renders.md
use-when: finding the key angle on the hero object fast

### light-pools-depth-layers — Light pools separate depth layers
cards/04_Shading_Lighting/light-pools-separate-depth-layers--add-depth-renders.md
use-when: midground hero lit, fore/background left dark

### light-range-cutoff — Per-light range cutoff (light the subject only) `[merge]`
cards/04_Shading_Lighting/light-range-cutoff--ten-cinematic-tips.md
cards/04_Shading_Lighting/range-limited-fill-subject-only--lighting-characters.md
use-when: keeping fills off the floor/background

### light-softness-size-distance — Shadow softness from light size and distance `[merge]`
cards/04_Shading_Lighting/light-quality-shadow-softness-size-and-distance--advanced-comp-nuke-wk1.md
cards/04_Shading_Lighting/light-size-softness-vs-detail--fundamentals-of-lighting.md
use-when: choosing the soft top light's size for the macro look

### light-stack-one-at-a-time — Build lights from black, one layer at a time `[merge]`
cards/04_Shading_Lighting/light-stack-key-fill-support-bounce-layers--dark-environments.md
cards/04_Shading_Lighting/pitch-black-one-light-at-a-time--good-lighting-environments.md
use-when: starting any lighting pass

### light-through-openings — Light through openings for shadow play
cards/04_Shading_Lighting/light-through-openings-shadow-play--lighting-characters.md
use-when: light streaks through a shutter or window

### light-types-multipliers — Light types and their multipliers
cards/04_Shading_Lighting/light-types-and-multipliers--power-of-lighting.md
use-when: picking point/sun/spot/area and per-light multipliers

### lighting-ratio-high-low-key — Lighting ratio: high key vs low key
cards/04_Shading_Lighting/lighting-ratio-high-key-low-key--lighting-characters.md
use-when: setting calm vs dramatic contrast per episode

### lights-parented-to-hero — Accent lights parented to the moving hero
cards/04_Shading_Lighting/lights-parented-to-hero--car-animation.md
use-when: keeping a travelling object's shape lit through a flight

### masked-dodge-burn — Masked dodge/burn after render
cards/04_Shading_Lighting/masked-dodge-burn-local-light--special-look.md
use-when: brightening or darkening one region in post

### match-light-direction-plate — Match light direction from the plate's shadows
cards/04_Shading_Lighting/match-light-direction-per-frame-position--advanced-comp-nuke-wk1.md
use-when: integrating a CG object into a photo/footage plate

### material-slots-cylinder-label — Two material slots + seam unwrap for a cylinder label
cards/04_Shading_Lighting/material-slots-seam-unwrap-cylinder-label--product-animation-masterclass.md
use-when: a label on a can/bottle hero

### material-variant-shared-maps — Material variant keeping normal/roughness, swap colour
cards/04_Shading_Lighting/material-variant-shared-normal-roughness--add-tons-of-detail.md
use-when: colour variants of one PBR material

### mirror-water-floor — Seamless mirror floor with animated noise bump
cards/04_Shading_Lighting/mirror-water-floor-noise-bump--perfect-product-animations.md
use-when: a reflective surface under the hero

### mist-pass-fog — Mist pass depth fog `[merge]`
cards/04_Shading_Lighting/mist-pass-background-fog--10-blender-tricks.md
cards/04_Shading_Lighting/mist-pass-depth-fog-masked--add-depth-renders.md
use-when: background fog without render cost

### mix-shader-masked-dirt — Mix Shader with a noise-masked dirt layer
cards/04_Shading_Lighting/mix-shader-masked-dirt-layer--pro-materials.md
use-when: a second material layer (dirt, rust) on a surface

### moody-overcast — Moody overcast: sky + denser volume + soft area
cards/04_Shading_Lighting/moody-overcast-sky-volume-area--good-lighting-environments.md
use-when: a grey, sombre beat (loss, closure)

### motivated-fewest-lights — Motivated lighting with the fewest lights
cards/04_Shading_Lighting/motivated-lighting-fewest-lights--lighting-characters.md
use-when: every light must have a believable source

### negative-fill — Negative fill (black blocker) for contrast `[merge]`
cards/04_Shading_Lighting/black-blocker-box-negative-fill--good-lighting-environments.md
cards/04_Shading_Lighting/negative-fill-contrast-control--backlight-everything.md
use-when: carving contrast on the hero's shadow side

### nudge-key-face-separation — Nudge the key so adjacent faces differ in value
cards/04_Shading_Lighting/nudge-key-for-face-separation--fundamentals-of-lighting.md
use-when: boxy objects whose faces merge into one tone

### offscreen-motivated-uplight — Off-screen motivated light and up-lighting
cards/04_Shading_Lighting/offscreen-motivated-light--ten-cinematic-tips.md
use-when: ominous scale (a looming cost, a giant bill)

### one-dominant-emissive-colour — One dominant emissive colour, others at a tenth
cards/04_Shading_Lighting/one-dominant-neon-colour-tenth-strength--use-lighting-in-renders.md
use-when: many glowing signs without competing with the accent

### one-dominant-light — One dominant light does almost everything `[merge]`
cards/04_Shading_Lighting/one-light-does-99-percent--use-lighting-in-renders.md
cards/04_Shading_Lighting/one-to-three-lights-max--beautiful-environments.md
cards/04_Shading_Lighting/simplicity-first-one-light-one-colour--serene-render.md
cards/04_Shading_Lighting/single-key-spotlight--industrial-scene.md
use-when: the Style D single soft top light

### parallel-spot-sunbeams — Parallel spotlights as broken sunlight
cards/04_Shading_Lighting/parallel-spotlights-fake-sunbeams--detail-isnt-hard.md
use-when: patches of light picking out only what should be seen

### photo-emissive-neon-cutouts — Photo -> emission + alpha cut-out planes (neon signs) `[merge]`
cards/04_Shading_Lighting/alpha-photo-planes-neon-signage--cyber-japan-breakdown.md
cards/04_Shading_Lighting/photo-emission-inverted-alpha-cutout--emission-textures.md
cards/04_Shading_Lighting/photo-to-tinted-neon-sign-emission--use-lighting-in-renders.md
use-when: glowing shop signs or neon in the background

### photo-sky-backdrop-plane — Photo sky/backdrop on an emissive plane `[merge]`
cards/04_Shading_Lighting/bent-emissive-sky-cloud-plane--eevee-animation-blender5.md
cards/04_Shading_Lighting/emissive-backdrop-image-plane--lighting-characters.md
cards/04_Shading_Lighting/emissive-image-plane-fake-hdri--crazy-renders-geo-nodes.md
cards/04_Shading_Lighting/sky-image-plane-direction-matched--good-lighting-environments.md
cards/04_Shading_Lighting/sky-photo-backdrop-plane--cyber-japan-breakdown.md
cards/04_Shading_Lighting/sky-photo-plane-base-plus-emission--use-lighting-in-renders.md
use-when: a window view or sky behind a set, also lighting it

### photo-textured-light-shapers — Image/photo-textured area lights for realistic reflections `[merge]`
cards/04_Shading_Lighting/image-textured-area-light-reflection--realistic-product-lighting.md
cards/04_Shading_Lighting/photo-based-light-shapers--key-to-realistic-renders.md
use-when: glossy hero whose reflection shows a fake rectangle

### point-to-spot-cull-spill — Start with points, convert to spots to cut spill
cards/04_Shading_Lighting/point-to-spot-cull-spill--fundamentals-of-lighting.md
use-when: containing lights once positions are found

### practical-light-inside-object — Practical lights inside objects/instances `[merge]`
cards/04_Shading_Lighting/practical-light-inside-object--fundamentals-of-lighting.md
cards/04_Shading_Lighting/practical-point-lights-inside-instances--detail-isnt-hard.md
use-when: an object glowing from within (lit drawer, lit windows)

### principled-preset-finishes — Principled BSDF preset finishes
cards/04_Shading_Lighting/principled-preset-finishes--pro-materials.md
use-when: plastic, thin-film, coated paint surfaces

### procedural-led-wall — Procedural LED wall (Wave + Gradient + Modulo)
cards/04_Shading_Lighting/procedural-led-wall-wave-modulo--car-animation.md
use-when: an animated LED/screen backdrop

### product-many-hidden-lights — Product lighting with many hidden lights
cards/04_Shading_Lighting/product-lighting-many-hidden-lights--key-to-realistic-renders.md
use-when: a commercial-grade product hero

### product-three-light-rig — Product rig: back highlight, sharp side, soft fill
cards/04_Shading_Lighting/back-sharp-soft-product-rig--realistic-product-lighting.md
use-when: glossy product hero shot

### realtime-gi-workarounds — Bounce light in a real-time engine (SSGI / irradiance)
cards/04_Shading_Lighting/eevee-gi-workarounds--power-of-lighting.md
use-when: raea scenes that look flat without GI

### realtime-polish-ao-bloom-soft-shadows — Real-time render polish: AO, bloom, soft shadows `[merge]`
cards/04_Shading_Lighting/eevee-polish-soft-shadows-ao-bloom--ten-cinematic-tips.md
cards/05_Camera_Raea_Pipeline/realtime-render-settings-ao-bloom-soft-shadows--lighting-characters.md
use-when: base raea look settings for every episode

### recolour-emission — Recolour an emissive image (Hue/Sat + Multiply)
cards/04_Shading_Lighting/recolour-emission-hue-sat-multiply--emission-textures.md
use-when: matching a glowing texture to the brand accent

### reference-images-photoreal — Reference images for photoreal materials and camera
cards/04_Shading_Lighting/reference-images-for-photoreal-materials--renders-look-boring.md
use-when: grounding a material/camera in reality

### reflections-carry-light — Reflective surfaces carry light into dark areas
cards/04_Shading_Lighting/reflections-carry-light-into-dark-areas--dark-environments.md
use-when: bringing life to dark zones without adding light

### reliable-god-rays — Reliable god rays (hard light + complex shadow + volume)
cards/04_Shading_Lighting/reliable-god-rays--lighting-secrets.md
use-when: beams through a shutter or window in haze

### remap-texture-range — Remap texture range with Color Ramp / Map Range
cards/04_Shading_Lighting/remap-texture-range-colorramp-maprange--pro-materials.md
use-when: bringing a texture into sane roughness/bump values

### rim-edge-reflection — Rim light placed for an edge reflection
cards/04_Shading_Lighting/rim-light-edge-reflection--fundamentals-of-lighting.md
use-when: catching bevels on the hero's top edge

### second-uv-symbol-under-text — Second UV map: symbol layered under text
cards/04_Shading_Lighting/second-uv-map-masked-symbol-under-text--product-animation-masterclass.md
use-when: a logo/symbol on a label with embossing

### sell-glow — Sell glow: reflective floor, volume, bloom
cards/04_Shading_Lighting/sell-glow-volume-bloom-reflective-floor--emission-textures.md
use-when: making an emissive sign/screen feel bright

### short-vs-broad-key — Short vs broad key side
cards/04_Shading_Lighting/short-vs-broad-key-side--lighting-characters.md
use-when: drama vs openness on a subject

### side-strip-reflection-lights — Side strip lights for reflection lines
cards/04_Shading_Lighting/side-strip-reflection-lights--perfect-product-animations.md
use-when: the 'product ad' highlight down a glossy body

### silhouette-dense-fog-backlight — Silhouette: dense fog + one coloured backlight
cards/04_Shading_Lighting/silhouette-dense-fog-single-backlight--lighting-characters.md
use-when: a mysterious/hook silhouette beat

### single-key-tune-by-overshoot — Tune key brightness by overshooting then dialling back
cards/04_Shading_Lighting/single-key-light-tuned-past-overexposure--dark-environments.md
use-when: setting the one key light's power

### soft-foreground-hard-subject — Soft neutral foreground vs hard-lit subject
cards/04_Shading_Lighting/soft-neutral-foreground-vs-hard-lit-subject--improve-compositions.md
use-when: separating subject from foreground by light quality

### soft-sky-reflective-product — Soft sky, no hard sun, for reflective products
cards/04_Shading_Lighting/soft-sky-for-reflective-product--backlight-everything.md
use-when: shiny product in daylight

### soften-key-tight-shots — Soften the key on tight shots
cards/04_Shading_Lighting/soften-key-on-tight-shots--backlight-everything.md
use-when: close macro where hard light looks harsh

### stacked-water-layers — Stacked over-bright transparent water layers
cards/04_Shading_Lighting/stacked-bright-transparent-water-layers--serene-render.md
use-when: clear water look (Cycles-only; flag for raea)

### steal-photo-lighting — Steal lighting setups from real photography
cards/04_Shading_Lighting/steal-real-photo-lighting-setups--power-of-lighting.md
use-when: recreating a real product/car photo look

### sun-side-or-behind — Sun/HDRI from the side or behind, never from the camera `[merge]`
cards/04_Shading_Lighting/hdri-rotation-side-sun--good-lighting-environments.md
cards/04_Shading_Lighting/sky-texture-side-sun--use-lighting-in-renders.md
cards/04_Shading_Lighting/sun-behind-or-beside-subject--10-blender-tricks.md
use-when: exterior or daylight setups

### sun-wrap-upstage — Sun wrap: upstage bounce as key, no sandwich
cards/04_Shading_Lighting/sun-wrap-bounce-upstage-not-sandwich--backlight-everything.md
use-when: exterior subject lit from behind with wrap

### texture-self-masked-mix — Blend textures with an image-derived (Color Ramp) mask `[merge]`
cards/04_Shading_Lighting/brightness-masked-texture-mix--cyber-japan-breakdown.md
cards/04_Shading_Lighting/self-masked-texture-mix-color-ramp--eevee-animation-blender5.md
use-when: grunge or painted-wood variation on a surface

### three-point-lighting — Three-point key / fill / rim `[merge]`
cards/04_Shading_Lighting/soft-three-point-key-fill-back--lighting-characters.md
cards/04_Shading_Lighting/three-point-key-fill-rim--power-of-lighting.md
cards/04_Shading_Lighting/three-point-motivated-color--ten-cinematic-tips.md
use-when: a standard lit subject with warm key, cool back

### three-questions-before-lighting — Three questions before lighting
cards/04_Shading_Lighting/three-questions-before-lighting--lighting-characters.md
use-when: starting the light plan for a line

### tiny-back-point-fill — Tiny background point light fills empty space
cards/04_Shading_Lighting/tiny-back-point-light-fills-empty-space--use-lighting-in-renders.md
use-when: a dead black hole in the background

### top-light-mood — Top light mood (pleasing vs sinister)
cards/04_Shading_Lighting/top-light-mood--ten-cinematic-tips.md
use-when: the Style D top light, and a sinister beat

### track-to-aim-lights — Track To constraint to aim lights
cards/04_Shading_Lighting/track-to-constraint-aim-lights--key-to-realistic-renders.md
use-when: lights that stay on a moving/rotating hero

### translucent-plane-softbox — DIY softbox: translucent plane before an area light
cards/04_Shading_Lighting/translucent-plane-softbox--power-of-lighting.md
use-when: softening a light's quality

### uv-squash-light-trails — Light trails by squashing UVs
cards/04_Shading_Lighting/uv-squash-light-trails--emission-textures.md
use-when: speed/flow streaks (payments moving)

### volume-bounces-soften-cone — Volume bounces to soften a hard spot cone
cards/04_Shading_Lighting/volume-bounces-soften-spot-cone--special-look.md
use-when: a harsh cone in the haze

### volume-haze-cube — Volume haze cube (low-density Volume Scatter over the scene) `[merge]`
cards/04_Shading_Lighting/fog-cube-volume-scatter--10-blender-tricks.md
cards/04_Shading_Lighting/low-density-volume-air--product-animation-masterclass.md
cards/04_Shading_Lighting/low-density-volume-cube-cool-spotlight--eevee-animation-blender5.md
cards/04_Shading_Lighting/low-volume-scatter-atmosphere--good-lighting-environments.md
cards/04_Shading_Lighting/scene-wide-volume-scatter-cube--dark-environments.md
cards/04_Shading_Lighting/volume-cube-atmosphere-strong-spot--renders-instantly-cooler.md
cards/04_Shading_Lighting/volume-haze-cube-and-colored-sun-point--crazy-renders-geo-nodes.md
cards/04_Shading_Lighting/volume-scatter-atmosphere-cube--beautiful-fire.md
cards/04_Shading_Lighting/volume-scatter-cube-atmosphere--industrial-scene.md
cards/04_Shading_Lighting/volume-scatter-cube-density-anisotropy--volumetrics-look-better.md
cards/04_Shading_Lighting/volume-scatter-cube-haze--add-depth-renders.md
cards/04_Shading_Lighting/volume-scatter-cube-over-scene--use-lighting-in-renders.md
cards/04_Shading_Lighting/volume-scatter-haze-cube--detail-isnt-hard.md
cards/04_Shading_Lighting/volumetric-density-anisotropy-tuning--special-look.md
cards/04_Shading_Lighting/volumetric-fog-box--ten-cinematic-tips.md
use-when: making the top light read in the air of the dark room

### voronoi-flake-normal — Metallic flake speckle via Voronoi normal
cards/04_Shading_Lighting/voronoi-flake-normal-detail--pro-materials.md
use-when: car paint / sparkly packaging

### warm-cool-mood — Warm vs cool colour moods (light + grade) `[merge]`
cards/04_Shading_Lighting/warm-cool-colour-moods--power-of-color.md
cards/04_Shading_Lighting/warm-cool-mood-lights-and-grade--key-to-realistic-renders.md
use-when: cosy vs corporate mood on a line

### wet-floor-puddles — Wet-floor puddles from noise roughness/normal
cards/04_Shading_Lighting/noise-roughness-normal-wet-floor--detailed-foregrounds.md
use-when: a rainy street or wet counter

## 05_Camera_Raea_Pipeline

### aim-target-follows-subject — Aim target glued to a moving subject
cards/05_Camera_Raea_Pipeline/aim-target-follows-moving-subject--blender-camera-rig.md
use-when: camera on its own path while always looking at the token

### anamorphic-bokeh — Anamorphic bokeh (oval, cat-eye, fringe)
cards/05_Camera_Raea_Pipeline/anamorphic-bokeh-cat-eye-barn-doors--advanced-comp-nuke-wk1.md
use-when: a filmic bokeh character on highlights

### atmosphere-asset-collections — Reusable atmosphere asset collections
cards/05_Camera_Raea_Pipeline/reusable-atmosphere-asset-collections--renders-instantly-cooler.md
use-when: quickly adding birds, leaves, rays, haze

### audio-first-beat-timing — Audio first: time shots to the beat `[merge]`
cards/05_Camera_Raea_Pipeline/beat-counted-shot-timing--product-animation-masterclass.md
cards/05_Camera_Raea_Pipeline/soundtrack-first-shot-timing--car-animation.md
use-when: locking setup changes to voice/music beats

### backlit-depth-layers — Depth through backlit layers
cards/05_Camera_Raea_Pipeline/backlit-depth-layers-and-facing-the-light--backlight-everything.md
use-when: wide shots with layered silhouettes

### beat-punch-in — Post punch-in zoom on the beat
cards/05_Camera_Raea_Pipeline/beat-punch-in-zoom-adjustment-clip--product-animation-masterclass.md
use-when: an emphasis push on a key word (check rules)

### blend-mode-detail-matte — Blending-mode detail masked by an extracted matte
cards/05_Camera_Raea_Pipeline/blending-mode-detail-masked-by-extracted-matte--advanced-comp-nuke-wk1.md
use-when: comp texture on bright areas

### bokeh-blades-shape — Bokeh: aperture blades, ratio, focus distance `[merge]`
cards/05_Camera_Raea_Pipeline/bokeh-aperture-blades-focus-distance--cinematography-next-level.md
cards/05_Camera_Raea_Pipeline/dof-blades-ratio-low-fstop--10-blender-tricks.md
use-when: shaping bokeh on the shallow-DoF macro look

### bokeh-highlight-pops — Art-directed bokeh highlight pops
cards/05_Camera_Raea_Pipeline/bokeh-highlight-pops-luma-mask--advanced-comp-nuke-wk1.md
use-when: sparkle in the defocused background

### camera-body-vs-lens — Camera body vs lens settings in Blender
cards/05_Camera_Raea_Pipeline/camera-body-vs-lens-dynamic-range--cinematography-next-level.md
use-when: mapping real camera knowledge to raea camera props

### camera-driven-by-subject — Camera driven by the subject's transform + correction layer
cards/05_Camera_Raea_Pipeline/camera-driven-by-subject-transform--cg-cine-ch4-chase.md
use-when: a camera riding along with a travelling token

### camera-height-horizon-match — Match camera height by horizon line
cards/05_Camera_Raea_Pipeline/camera-height-horizon-match--advanced-comp-nuke-wk1.md
use-when: placing CG into a photo plate

### camera-height-psychology — Camera height, lens and roll set the viewer's relationship `[merge]`
cards/05_Camera_Raea_Pipeline/camera-height-lens-roll-mood--lighting-characters.md
cards/05_Camera_Raea_Pipeline/camera-height-psychology--ten-cinematic-tips.md
use-when: low angle for a big cost, high for overview

### camera-markers-cuts — Camera markers to switch cameras on frames
cards/05_Camera_Raea_Pipeline/camera-markers-bound-cuts--car-animation.md
use-when: hard cuts between setups on words

### camera-monitor-viewport — Camera monitor viewport / workspace `[merge]`
cards/05_Camera_Raea_Pipeline/camera-monitor-workspace--blender-camera-rig.md
cards/05_Camera_Raea_Pipeline/dual-viewport-camera-preview--nice-camera-angles.md
use-when: seeing the shot framing while editing

### camera-move-vocabulary — Camera-move vocabulary mapped to transforms
cards/05_Camera_Raea_Pipeline/camera-move-vocabulary-transforms--cg-cine-ch2-camera-breakdown.md
use-when: naming and building each setup's move

### camera-on-moving-platform — Camera parented to a moving platform
cards/05_Camera_Raea_Pipeline/camera-parented-to-moving-platform--eevee-animation-blender5.md
use-when: an elevator/crane rise then push

### camera-pendulum-swing — Camera pendulum swing, cut at fastest moment
cards/05_Camera_Raea_Pipeline/camera-pendulum-swing-cut-on-action--product-animation-masterclass.md
use-when: a swing join between two setups

### camera-plausible-position — Camera where a person could stand `[merge]`
cards/05_Camera_Raea_Pipeline/camera-as-visitor-placement--detail-isnt-hard.md
cards/05_Camera_Raea_Pipeline/physically-plausible-camera-position--nice-camera-angles.md
use-when: grounding a setup so it doesn't feel CG

### cinematic-aspect-letterbox — Cinematic aspect: letterbox / anamorphic squeeze `[merge]`
cards/05_Camera_Raea_Pipeline/anamorphic-squeeze-aspect--cg-cine-ch2-camera-breakdown.md
cards/05_Camera_Raea_Pipeline/cinematic-21-9-letterbox--10-blender-tricks.md
use-when: a widescreen 'film' moment inside 9:16

### clarity-local-contrast — Clarity / local contrast final pass
cards/05_Camera_Raea_Pipeline/clarity-local-contrast-final-pass--add-tons-of-detail.md
use-when: a final detail pop

### colour-balance-tone — Colour balance: saturation and shadow/highlight tone
cards/05_Camera_Raea_Pipeline/color-balance-saturation-and-color-tone--advanced-comp-nuke-wk1.md
use-when: matching CG colour to a plate

### colour-variant-stack-cut — Same move in several colourways, cut on hits
cards/05_Camera_Raea_Pipeline/colour-variant-stack-cut-on-hits--product-animation-masterclass.md
use-when: showing variants on rhythm

### composition-guides — Composition guides: centre, thirds, golden triangle `[merge]`
cards/05_Camera_Raea_Pipeline/centre-and-thirds-guides-passepartout--product-animation-masterclass.md
cards/05_Camera_Raea_Pipeline/composition-guides-golden-triangle--ten-cinematic-tips.md
cards/05_Camera_Raea_Pipeline/thirds-or-centre-line-placement--five-ways-environments.md
use-when: placing the hero and labels in a 9:16 frame

### compositional-balance — Compositional balance and negative space
cards/05_Camera_Raea_Pipeline/compositional-balance-negative-space--cg-cine-ch4-chase.md
use-when: room for captions/labels against the subject

### constraint-influence-release — Release a Track To (influence 1 -> 0) for camera exit
cards/05_Camera_Raea_Pipeline/constraint-influence-release-camera-exit--product-animation-masterclass.md
use-when: flying out of a tracked setup to the next

### contrast-reads-distance — Contrast falloff and haze read as distance
cards/05_Camera_Raea_Pipeline/contrast-falloff-reads-distance-haze--advanced-comp-nuke-wk1.md
use-when: placing elements deep in the scene

### creep-in-reframe — Creep-in push to reframe and add depth
cards/05_Camera_Raea_Pipeline/creep-in-reframe-eye-triangle--cg-cine-ch3-nuke.md
use-when: a slow push during an explanation line

### crop-big-event — Let the big thing spill out of frame
cards/05_Camera_Raea_Pipeline/crop-big-event-out-of-frame--cg-cine-ch3-nuke.md
use-when: making a big number/object feel huge

### curated-asset-library — Curated asset library with licence check
cards/05_Camera_Raea_Pipeline/curated-asset-library-licence-check--beautiful-environments.md
use-when: logging fresh assets in ASSET-SOURCES.md

### dark-edge-framing — Dark edge framing / natural vignette from unlit objects `[merge]`
cards/05_Camera_Raea_Pipeline/dark-edge-framing-blockers--improve-compositions.md
cards/05_Camera_Raea_Pipeline/dark-perimeter-natural-vignette--dark-environments.md
use-when: dark-room framing around the hero

### decouple-follower-rotation — Decouple a follower from its parent's rotation
cards/05_Camera_Raea_Pipeline/decouple-follower-from-parent-rotation--dinosaur-run-cycle.md
use-when: a child object animated independently of a moving parent

### denoise-before-comp — Denoise the plate first
cards/05_Camera_Raea_Pipeline/denoise-first-before-key-track-paint--advanced-comp-nuke-wk1.md
use-when: comp work on footage (rare)

### desaturate-3d-saturate-grade — Desaturate in 3D, saturate in the grade
cards/05_Camera_Raea_Pipeline/desaturate-in-3d-saturate-in-grade--nice-colors.md
use-when: keeping colour headroom for the accent

### despill-keymix — Despill to environment, keymix original
cards/05_Camera_Raea_Pipeline/despill-tint-to-environment-keymix-original--advanced-comp-nuke-wk1.md
use-when: keying footage (rare)

### display-as-bounds — Display fog cube as Bounds
cards/05_Camera_Raea_Pipeline/display-as-bounds-shortcut--volumetrics-look-better.md
use-when: keeping the viewport fast with a haze cube

### dof-close-ups-only — Reserve DoF for close-ups
cards/05_Camera_Raea_Pipeline/dof-close-ups-only--ten-cinematic-tips.md
use-when: deciding DoF per setup

### dof-focus-fstop — DoF: focus on the hero, choose f-stop per shot `[merge]`
cards/05_Camera_Raea_Pipeline/dof-eyedropper-conservative-fstop--nice-camera-angles.md
cards/05_Camera_Raea_Pipeline/dof-focus-object-fstop-per-shot--product-animation-masterclass.md
use-when: setting focus and f-stop on each macro setup

### dof-sells-scale — DoF amount sells scale
cards/05_Camera_Raea_Pipeline/depth-of-field-sells-scale--advanced-comp-nuke-wk1.md
use-when: miniature vs life-size read of a macro object

### dolly-zoom — Dolly zoom (Vertigo)
cards/05_Camera_Raea_Pipeline/dolly-zoom--cinematography-next-level.md
use-when: a realisation beat (check rule: no crash zooms)

### duplicate-cameras-audition — Duplicate cameras to audition angles
cards/05_Camera_Raea_Pipeline/duplicate-cameras-audition-angles--nice-camera-angles.md
use-when: exploring setups for a line

### dutch-roll — Dutch roll (small tilt, roll during pans) `[merge]`
cards/05_Camera_Raea_Pipeline/dutch-roll-during-fast-pan-geometric--cg-cine-ch4-chase.md
cards/05_Camera_Raea_Pipeline/dutch-tilt-small-roll--ten-cinematic-tips.md
use-when: tension or energy in a setup

### edge-detail-extract — Edge detail: extract, then fix colour and softness
cards/05_Camera_Raea_Pipeline/edge-detail-extract-then-fix-edge-colour-and-softness--advanced-comp-nuke-wk1.md
use-when: key edges in comp (rare)

### edge-detect-flash — Edge-detect flash on a snare (rejected)
cards/05_Camera_Raea_Pipeline/edge-detect-flash-on-snare--product-animation-masterclass.md
use-when: reference only: why the author dropped it

### edge-halo-fix — Fix key edge halos
cards/05_Camera_Raea_Pipeline/edge-halo-fix-mix-dark-and-bright-edge-versions--advanced-comp-nuke-wk1.md
use-when: keying footage (rare)

### end-frame-chaining — Each shot's end frame is the next start frame
cards/05_Camera_Raea_Pipeline/end-frame-is-next-start-frame-chaining--product-animation-masterclass.md
use-when: joining setups without hard cuts

### explore-fast-then-commit — Explore fast, then commit
cards/05_Camera_Raea_Pipeline/explore-fast-then-commit--serene-render.md
use-when: trying many setup ideas before building one

### extreme-contrast-focal-check — Extreme-contrast focal check
cards/05_Camera_Raea_Pipeline/extreme-contrast-focal-check--improve-compositions.md
use-when: verifying the focal point reads

### false-colour-exposure — False Color exposure check
cards/05_Camera_Raea_Pipeline/false-colour-exposure-check--power-of-lighting.md
use-when: checking exposure of a dark-room frame

### fg-mg-bg-layers — Foreground / midground / background layers
cards/05_Camera_Raea_Pipeline/foreground-midground-background-layers--add-depth-renders.md
use-when: giving every setup depth

### film-grain — Film grain (add / match and regrain) `[merge]`
cards/05_Camera_Raea_Pipeline/film-grain-de-render--special-look.md
cards/05_Camera_Raea_Pipeline/grain-match-five-characteristics-and-regrain--advanced-comp-nuke-wk1.md
use-when: removing the rendered look from the final

### final-grade-pass — Restrained final grade pass `[merge]`
cards/05_Camera_Raea_Pipeline/merged-layer-grade-pass-slider-sweep--special-look.md
cards/05_Camera_Raea_Pipeline/primary-grade-exposure-contrast-gain--product-animation-masterclass.md
cards/05_Camera_Raea_Pipeline/restrained-final-grade--serene-render.md
cards/05_Camera_Raea_Pipeline/soft-final-grade-pass--realistic-product-lighting.md
cards/05_Camera_Raea_Pipeline/vignette-grain-curves-grade--ten-cinematic-tips.md
use-when: the finishing grade on every episode

### fisheye-panoramic — Graduated fisheye via panoramic camera
cards/05_Camera_Raea_Pipeline/fisheye-lens-polynomial-panoramic-camera--super-wide-angle.md
use-when: an extreme-wide stylised view

### flip-composition-check — Flip the frame to re-check balance
cards/05_Camera_Raea_Pipeline/flip-composition-check--ten-cinematic-tips.md
use-when: reviewing a board/still

### fly-mode-capture — Capture a camera path in Fly mode with Auto Keying
cards/05_Camera_Raea_Pipeline/fly-mode-autokey-camera-capture-smooth--eevee-animation-blender5.md
use-when: organic hand-flown camera paths

### focal-length-choice — Focal length by shot type and mood `[merge]`
cards/05_Camera_Raea_Pipeline/focal-length-by-shot-type--10-blender-tricks.md
cards/05_Camera_Raea_Pipeline/focal-length-mood--ten-cinematic-tips.md
cards/05_Camera_Raea_Pipeline/longer-focal-length-reduce-distortion--fundamentals-of-lighting.md
use-when: choosing lens per setup (macro, wide, product)

### focal-point-breathing-room — One focal point with breathing room
cards/05_Camera_Raea_Pipeline/focal-point-and-breathing-room--nice-camera-angles.md
use-when: framing the hero with space for captions

### focal-pull-with-turn — Slow focal-length pull with product turn and DoF
cards/05_Camera_Raea_Pipeline/focal-length-pull-and-dof-focus--perfect-product-animations.md
use-when: a calm hero beat

### foreground-density-illusion — Dense foreground, sparse background
cards/05_Camera_Raea_Pipeline/foreground-density-detail-illusion--detail-isnt-hard.md
use-when: cheap perceived detail in a wide

### foreground-framing — Frame the subject with scene elements / blurred foreground `[merge]`
cards/05_Camera_Raea_Pipeline/blurred-foreground-framing-dof--renders-instantly-cooler.md
cards/05_Camera_Raea_Pipeline/natural-framing-elements--five-ways-environments.md
use-when: depth and framing in a macro setup

### glow-bloom — Glow / bloom on highlights (glare, light wrap) `[merge]`
cards/05_Camera_Raea_Pipeline/blur-screen-glow-layer--special-look.md
cards/05_Camera_Raea_Pipeline/glare-node-glow--10-blender-tricks.md
cards/05_Camera_Raea_Pipeline/glow-and-light-wrap-glow-rule-half--advanced-comp-nuke-wk1.md
use-when: glints on metal and lit signs

### ground-parallax-fog-isolation — Near ground for parallax, fogged distance to isolate
cards/05_Camera_Raea_Pipeline/ground-parallax-distant-fog-isolation--cg-cine-ch3-nuke.md
use-when: a low tracking shot past the hero

### high-fps-speed-ramp — Render high fps for speed ramps
cards/05_Camera_Raea_Pipeline/high-fps-render-for-speed-ramp--product-animation-masterclass.md
use-when: slow motion on a key word (60 fps finals)

### high-low-res-export — High/low-res pair via Poly Reduce for export
cards/05_Camera_Raea_Pipeline/high-low-res-poly-reduce-export--houdini-volumes-masterclass.md
use-when: lighter GLBs for raea

### highpass-tracking — High-pass + offset tracking
cards/05_Camera_Raea_Pipeline/highpass-offset-tracking-low-contrast--advanced-comp-nuke-wk1.md
use-when: tracking low-contrast footage (rare)

### importance-tiers — Rank objects into importance tiers
cards/05_Camera_Raea_Pipeline/importance-tiers-centre-light-size--improve-compositions.md
use-when: deciding what gets light, centre and size

### keep-detail-near-black — Keep detail near black (no crushed shadows)
cards/05_Camera_Raea_Pipeline/keep-detail-near-black-no-crushed-shadows--dark-environments.md
use-when: dark-room frames on phone screens

### key-structure-core-edge — Key structure: soft edge key + eroded core
cards/05_Camera_Raea_Pipeline/key-structure-core-over-edge--advanced-comp-nuke-wk1.md
use-when: keying footage (rare)

### layered-camera-rig — Layered camera rig (separate translate/rotate/shake transforms) `[merge]`
cards/05_Camera_Raea_Pipeline/layered-camera-transform-stack--cg-cine-ch3-nuke.md
cards/05_Camera_Raea_Pipeline/layered-rotation-dolly-camera-rig--cg-cine-ch2-camera-breakdown.md
use-when: complex camera flights that stay editable

### leading-lines — Leading lines converge on the focal point `[merge]`
cards/05_Camera_Raea_Pipeline/leading-lines-converge-on-focal--improve-compositions.md
cards/05_Camera_Raea_Pipeline/leading-lines-to-focal-point--five-ways-environments.md
use-when: pointing the eye to the hero via set lines

### lens-distortion-breathing-tracking — Lens distortion and breathing in tracking
cards/05_Camera_Raea_Pipeline/lens-distortion-and-breathing-affect-tracking--advanced-comp-nuke-wk1.md
use-when: matching CG to filmed footage (rare)

### lens-edge-softness — Lens edge softness via variable blur
cards/05_Camera_Raea_Pipeline/lens-edge-softness-sharpness-map-variable-blur--advanced-comp-nuke-wk1.md
use-when: de-CG frame corners

### lens-flares-grime — Lens flares, grime, ghosting matched to the lens
cards/05_Camera_Raea_Pipeline/lens-flares-grime-ghosting-match-the-lens--advanced-comp-nuke-wk1.md
use-when: a bright light hitting the lens

### lens-fringe-distortion — Subtle lens distortion / chromatic aberration `[merge]`
cards/05_Camera_Raea_Pipeline/chromatic-aberration-fringe-match--advanced-comp-nuke-wk1.md
cards/05_Camera_Raea_Pipeline/compositor-lens-distortion-edge-fringing--super-wide-angle.md
cards/05_Camera_Raea_Pipeline/lens-distortion-node-subtle-barrel--10-blender-tricks.md
use-when: de-CG the final frame edges

### levels-luminance-match — Levels: match white, black and mid-tone contrast
cards/05_Camera_Raea_Pipeline/levels-luminance-black-white-midtone-contrast--advanced-comp-nuke-wk1.md
use-when: matching CG to a plate/reference

### lift-gamma-gain — What lift/gamma/gain/offset do
cards/05_Camera_Raea_Pipeline/lift-gamma-gain-offset-blackpoint-whitepoint--advanced-comp-nuke-wk1.md
use-when: understanding grade controls

### light-and-camera-before-detail — Light and camera before modelling detail
cards/05_Camera_Raea_Pipeline/light-and-camera-before-detail--beautiful-environments.md
use-when: prioritising build time

### light-groups-relight — Light Groups: relight in the compositor
cards/05_Camera_Raea_Pipeline/light-groups-compositor-relight--power-of-lighting.md
use-when: re-balancing lights without re-render

### light-reference-board — Small light reference board
cards/05_Camera_Raea_Pipeline/light-reference-board-no-overplanning--five-ways-environments.md
use-when: planning a lighting look

### lighting-ab-compare — A/B lighting comparison (collections / render slots) `[merge]`
cards/05_Camera_Raea_Pipeline/collection-ab-lighting-setups--good-lighting-environments.md
cards/05_Camera_Raea_Pipeline/render-slot-ab-compare--fundamentals-of-lighting.md
use-when: choosing between two light setups

### local-axis-camera-moves — Move the camera on its own axes
cards/05_Camera_Raea_Pipeline/local-axis-camera-moves-rxx-gzz--nice-camera-angles.md
use-when: precise framing adjustments

### lock-camera-before-lighting — Lock the camera before lighting
cards/05_Camera_Raea_Pipeline/lock-camera-before-lighting--fundamentals-of-lighting.md
use-when: starting the light pass per setup

### long-lens-matched-pan — Very long lens for scale, pans matched to motion
cards/05_Camera_Raea_Pipeline/long-lens-scale-and-motion-matched-pan--cg-cine-ch3-nuke.md
use-when: a compressed tracking shot of a moving token

### motion-blur-shutter — Motion blur as shutter
cards/05_Camera_Raea_Pipeline/motion-blur-shutter--cinematography-next-level.md
use-when: fast flights and spinning coins

### motivated-operator — Give every camera move an operator's reason
cards/05_Camera_Raea_Pipeline/motivated-operator-story-per-move--cg-cine-ch3-nuke.md
use-when: justifying each setup's move

### object-wipe-cut — Object wipe hides the cut
cards/05_Camera_Raea_Pipeline/object-wipe-hides-cut--product-animation-masterclass.md
use-when: a product crossing the lens joins two setups

### occlusion-overlap — Deliberate overlap for depth
cards/05_Camera_Raea_Pipeline/occlusion-overlap-stacking--add-depth-renders.md
use-when: stacking objects so depth reads

### off-centre-rebalance — Slide off-centre, then rebalance the aim
cards/05_Camera_Raea_Pipeline/off-centre-then-rebalance-aim--nice-camera-angles.md
use-when: finding a less static angle

### one-clear-focal-point — One clear focal point per frame
cards/05_Camera_Raea_Pipeline/one-clear-focal-point--renders-look-boring.md
use-when: every setup must read in 1 s on mute

### one-scene-per-shot — One Blender scene per shot
cards/05_Camera_Raea_Pipeline/one-scene-per-shot--car-animation.md
use-when: isolating shot setups in the build file

### orbit-camera-rig — Orbit camera rig (Empty parent or Follow Path + Track To) `[merge]`
cards/05_Camera_Raea_Pipeline/empty-parent-orbit-camera-rig--cinematography-next-level.md
cards/05_Camera_Raea_Pipeline/follow-path-orbit-camera-track-to--product-animation-masterclass.md
use-when: orbit around the hero object, orbit to top-down

### paint-out-tracked-patch — Paint out with a tracked plate patch
cards/05_Camera_Raea_Pipeline/paint-out-by-sliding-tracked-plate-patch--advanced-comp-nuke-wk1.md
use-when: removing things from footage (rare)

### per-hue-correction — Per-hue colour correction (Hue-vs curves / colour mixer) `[merge]`
cards/05_Camera_Raea_Pipeline/hue-vs-curves-per-colour-correction--product-animation-masterclass.md
cards/05_Camera_Raea_Pipeline/per-hue-color-mixer-calibration--nice-colors.md
use-when: fixing one colour without touching the accent

### phone-brightness-check — Judge brightness on a phone
cards/05_Camera_Raea_Pipeline/phone-screen-brightness-check--dark-environments.md
use-when: checking a dark-room preview

### pose-questions — Pose questions, don't reveal answers
cards/05_Camera_Raea_Pipeline/pose-questions-not-answers--renders-look-boring.md
use-when: the hook / open loop frames

### post-zoom-blur — Fake motion blur with post zoom blur
cards/05_Camera_Raea_Pipeline/post-zoom-blur-fake-motion-blur--product-animation-masterclass.md
use-when: a fast move without render motion blur

### pre-render-heavy-stages — Pre-render heavy stages to image sequences
cards/05_Camera_Raea_Pipeline/pre-render-heavy-stages-image-sequences--advanced-comp-nuke-wk1.md
use-when: long renders in chunks

### rack-focus-target — Rack focus / focus locked to a target Empty `[merge]`
cards/05_Camera_Raea_Pipeline/focus-distance-measured-to-target--cg-cine-ch2-camera-breakdown.md
cards/05_Camera_Raea_Pipeline/rack-focus-empty-target--cinematography-next-level.md
cards/05_Camera_Raea_Pipeline/two-empty-aim-and-focus-rig--blender-camera-rig.md
use-when: shifting attention from one object to another on the word

### real-bokeh-convolve — Defocus with a real bokeh shape (convolve)
cards/05_Camera_Raea_Pipeline/real-bokeh-shape-convolve--advanced-comp-nuke-wk1.md
use-when: photographic bokeh in comp

### real-handheld-shake-transfer — Shake from real handheld footage
cards/05_Camera_Raea_Pipeline/real-handheld-camera-shake-transfer--advanced-comp-nuke-wk1.md
use-when: authentic handheld feel from a recorded track

### real-world-scale — Model at real-world scale for light and DoF
cards/05_Camera_Raea_Pipeline/real-world-scale-for-light-and-dof--product-animation-masterclass.md
use-when: every macro object before lighting

### reference-shot-breakdown — Reference breakdown: copy each shot's purpose
cards/05_Camera_Raea_Pipeline/reference-shot-breakdown-copy-the-why--cg-cine-ch4-chase.md
use-when: studying a reference video before planning

### reframe-to-hide-flaws — Reframe before relighting or remodelling
cards/05_Camera_Raea_Pipeline/reframe-to-hide-flaws--nice-camera-angles.md
use-when: a weak frame in review

### relight-every-shot — Relight every shot; match by contrast
cards/05_Camera_Raea_Pipeline/relight-every-shot-match-by-contrast--backlight-everything.md
use-when: each setup lit for itself

### render-first-grade-amplifies — Get it right in 3D; grade only amplifies
cards/05_Camera_Raea_Pipeline/render-first-grade-amplifies--special-look.md
use-when: resisting fixing the look in grade

### render-output-handoff — Render output and edit handoff (PNG sequences, proxies)
cards/05_Camera_Raea_Pipeline/render-output-and-edit-handoff--product-animation-masterclass.md
use-when: final render to edit

### scale-contrast — Contrast of scale: push extremes apart
cards/05_Camera_Raea_Pipeline/scale-contrast-push-apart--improve-compositions.md
use-when: a tiny coin vs a huge bill

### scale-cue-objects — Scale cue with recognisable objects
cards/05_Camera_Raea_Pipeline/scale-cue-recognisable-objects--serene-render.md
use-when: showing size without people

### self-review-fundamentals — Self-review by walking the fundamentals
cards/05_Camera_Raea_Pipeline/self-review-by-fundamentals-checklist--advanced-comp-nuke-wk1.md
use-when: checking a frame before showing

### separate-modelling-scene-building — Separate modelling from scene building
cards/05_Camera_Raea_Pipeline/separate-modelling-from-scene-building--five-ways-environments.md
use-when: organising the build phases

### set-dressing-along-guides — Adjust set dressing to the composition
cards/05_Camera_Raea_Pipeline/set-dressing-along-guides--ten-cinematic-tips.md
use-when: final per-setup dressing through camera

### single-source-linked-transforms — One source of motion data, linked everywhere
cards/05_Camera_Raea_Pipeline/single-source-linked-transforms-reference-offset--advanced-comp-nuke-wk1.md
use-when: camera/object data shared between build and render

### slap-comp — Slap comp first pass
cards/05_Camera_Raea_Pipeline/slap-comp-first-pass-scale-correct--advanced-comp-nuke-wk1.md
use-when: fast look first, polish later

### split-tone-cool-shadows — Split-tone: cool shadows in a warm frame `[merge]`
cards/05_Camera_Raea_Pipeline/cool-split-tone-shadows--nice-colors.md
cards/05_Camera_Raea_Pipeline/split-toning-cool-shadows-grade--eevee-animation-blender5.md
use-when: final grade colour separation

### stabilize-verify-roto — Stabilize to verify tracks, roto on stabilized plate
cards/05_Camera_Raea_Pipeline/stabilize-verify-and-roto-on-stabilized-plate--advanced-comp-nuke-wk1.md
use-when: footage work (rare)

### stepped-height-hierarchy — Stepped height hierarchy rising to one peak
cards/05_Camera_Raea_Pipeline/stepped-height-hierarchy-triangle--improve-compositions.md
use-when: arranging props or bars toward the hero

### story-emotion-before-camera — Decide the emotion before the camera
cards/05_Camera_Raea_Pipeline/story-emotion-before-camera--ten-cinematic-tips.md
use-when: planning each setup per line

### story-props-backstory — Story props hint at backstory
cards/05_Camera_Raea_Pipeline/story-props-hint-backstory--renders-look-boring.md
use-when: dressing the shop with the owner's story

### subject-flies-into-frame — Let the subject enter the frame
cards/05_Camera_Raea_Pipeline/subject-flies-into-frame--cg-cine-ch3-nuke.md
use-when: a token arriving into a held setup

### track-type-selection — Choose 2D / planar / 3D track by parallax
cards/05_Camera_Raea_Pipeline/track-type-selection-2d-planar-3d--advanced-comp-nuke-wk1.md
use-when: attaching graphics to footage (rare)

### vanishing-point-alignment — Align a background by vanishing points
cards/05_Camera_Raea_Pipeline/vanishing-point-alignment-corner-pin--advanced-comp-nuke-wk1.md
use-when: placing a photo backdrop

### view-transform-agx — View transform: AgX vs Filmic, Looks `[merge]`
cards/05_Camera_Raea_Pipeline/agx-vs-filmic-highlights--key-to-realistic-renders.md
cards/05_Camera_Raea_Pipeline/colour-management-view-transform-look--power-of-color.md
use-when: highlights rolling off naturally (raea tone map)

### vignette-match — Vignetting match and soft final vignette
cards/05_Camera_Raea_Pipeline/vignetting-match-and-final-polish--advanced-comp-nuke-wk1.md
use-when: focusing the eye in the final

### white-solid-fade-patch — Patch an under-lit backdrop with a white solid fade
cards/05_Camera_Raea_Pipeline/white-solid-fade-fixes-grey-backdrop--product-animation-masterclass.md
use-when: emergency edit fix (rare)

### wide-angle-limits — Wide-angle limits for natural look
cards/05_Camera_Raea_Pipeline/wide-angle-limits-tight-spaces--nice-camera-angles.md
use-when: lens choice in tight interiors

### zoom-into-letter-transition — Push into a letter until it becomes the next backdrop
cards/05_Camera_Raea_Pipeline/zoom-into-letter-loop-transition--product-animation-masterclass.md
use-when: a transition built from the object's own label

### zoom-vs-move-compression — Zoom vs moving the camera (lens compression) `[merge]`
cards/05_Camera_Raea_Pipeline/focal-length-phone-equivalents-distance-vs-zoom--nice-camera-angles.md
cards/05_Camera_Raea_Pipeline/focal-length-zoom-vs-camera-move--super-wide-angle.md
cards/05_Camera_Raea_Pipeline/lens-compression-focal-sensor-scale--advanced-comp-nuke-wk1.md
use-when: deciding dolly vs focal change in a move

## Counts

- Cards: 500
- Topics: 372
- Merge topics (≥2 cards): 77 (holding 205 cards)
- Singletons: 295

- 01_Animation_Motion: 51 topics (7 merge)
- 02_Geometry_Nodes: 21 topics (3 merge)
- 03_Modeling_Modifiers: 47 topics (3 merge)
- 04_Shading_Lighting: 126 topics (39 merge)
- 05_Camera_Raea_Pipeline: 127 topics (25 merge)
