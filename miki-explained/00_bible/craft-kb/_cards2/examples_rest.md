=== cards/01_Animation_Motion/anchor-point-at-edge-to-fake-an-orbit--wonil-seo-motion-design.md
BEFORE: a row of RM-coin stacks is hand-keyed through several X/Y position points to fake a fan-out swing.
AFTER: each stack's pivot is moved to the shared edge point; one rotation value per stack (offset in time) produces
the fan-out.

=== cards/01_Animation_Motion/anticipation-pre-movement-winding-up-post-impact-squash--animation-anticipation.md
Topic: "harga minyak naik esok" (illustrative; a fuel-pump number is about to jump up).
BEFORE: `| 4 | "harga naik esok" | pump number display switches straight to the new price | — | — |` — the change is a pop, no build-up.
AFTER: `| 4 | "harga naik esok" | macro on the pump's digit display; it dips slightly dimmer/smaller just before, holds a beat (wind-up), then the new price arrives and gives one small settle after it lands | digits dim-compress on "naik", hold through "esok", then jump to the new price and settle ~0.1 s after landing | anticipation-pre-movement-winding-up-post-impact-squash--animation-anticipation |`

=== cards/01_Animation_Motion/elastic-decaying-overshoot--after-effects-easing-pro.md
Topic: "Baki e-wallet lepas isi RM50" (illustrative numbers).
BEFORE: the balance counter jumps straight to "RM50.00" on the word, static.
AFTER (house-safe): `| 6 | "terus masuk, RM50" | macro of phone screen, balance digits | counter rolls to 50.00, settles with a ~4% overshoot over 0.4s on "RM50" | elastic-decaying-overshoot--after-effects-easing-pro |` — a single small settle, not a bouncing chain.
AFTER (diagram-only variant, not Style D hero): a bar-chart marker dot lands on its final value with 2–3 shrinking wobbles, used only on an explanatory diagram overlay, never on the macro object itself.

=== cards/01_Animation_Motion/follow-through-and-secondary-animation-on-state-changes--motion-design-principles.md
Topic: a vending machine's price counter flips up when the price rises (illustrative numbers).
BEFORE: the counter flips; nothing else in frame changes.
AFTER: the counter flips at f40 (main action); the coin slot's small indicator light dims slightly starting f46,
easing to its new state by f64 (secondary animation — connected element reacts, single eased settle, no bounce).

=== cards/01_Animation_Motion/graph-editor-channel-normalize-compare-curves--mastering-blender-graph-editor.md
Topic: "Troli Mr DIY — kenapa roda selalu senget?" (illustrative).
BEFORE: a wheel-wobble shot keys rotation (0→−12°) and a Z-bounce (0→0.01 m) on the same trolley wheel; the bounce
curve looks flat next to the rotation curve, so the animator can't tell if the bounce peaks with the rotation.
AFTER: Normalize both channels, see the bounce actually peaks two frames late, and retime it to land with the
rotation's peak — the wobble now reads as one coordinated wiggle, not two unrelated channels.

=== cards/01_Animation_Motion/hierarchy-of-motion-lead-then-secondary--perfect-shape-morphs-after-effects.md
Topic: "Resit kedai basuh kereta bertukar jadi ikon loyalty card" (illustrative - a receipt folds and rotates into a
loyalty-card icon on "dapat mata ganjaran").
BEFORE: the receipt's fold, the card's corner-rounding, and a new star icon popping in are all keyed on independent
timelines; they drift out of sync and the star's pop-in reads as a glitchy extra beat.
AFTER: the fold's rotation is the one driver; the card-corner change and the star icon are both triggered only
during the driver's fastest rotation frame - the whole thing reads as one clean flip with the star "already there,"
not a separate event.

=== cards/01_Animation_Motion/motion-path-visualize-debug-arc--mastering-blender-graph-editor.md
Topic: "Mesin kopi RM300 untuk gerai: balik modal berapa cawan?" (illustrative).
BEFORE: a counter-chip "flies" from off-frame to the coffee machine on four separately-eased position/rotation
curves; on playback it clips through the machine's edge because no one checked the combined 3D path.
AFTER: calculate the chip's Motion Path, see it cuts the corner of the machine mesh at frame 18, and nudge that
key's Y value out by ~0.03 m so the arc clears the mesh — caught before render, not after.

=== cards/01_Animation_Motion/multiplane-2d-layers-in-3d-space--japanese-studios-cg.md
Topic: a flat street-market illustration as a setup's backdrop, with the camera pushing past a foreground stall (illustrative).
BEFORE: one flat background image pinned behind the hero object; a camera move just scales it, no depth.
AFTER: the stall sign, the background shophouses, and the sky are split onto three planes at different depths; the
same camera push now shows real parallax between them, at a fraction of the cost of modelling the street in 3D.

=== cards/01_Animation_Motion/nested-circular-matte-lens-reveal--ae-techniques-improve-motiongraphics.md
Topic: "Dalam dompet digital, berapa banyak yang masuk akaun simpanan automatik?" (illustrative — revealing a hidden
savings counter through a coin's glint as the camera passes it).
BEFORE: `| 8 | "automatik masuk simpanan" | hard cut to a savings counter graphic | counter 0→RM50 | — |` — an
ordinary cut, no connective tissue to the coin the line is about.
AFTER: `| 8 | "automatik masuk simpanan" | a soft circular glint on the coin's surface sharpens into focus as camera
nears it, revealing the savings counter as if seen THROUGH the coin's glint | counter 0→RM50 appears only inside the
sharpened ring, 0.4 s fade-through | nested-circular-matte-lens-reveal--ae-techniques-improve-motiongraphics |`

=== cards/01_Animation_Motion/path-drawn-roving-keyframe-motion--after-effects-easing-pro.md
Topic: "resit hilang, jejak balik ke kedai" (illustrative; a receipt icon travels back along a route to a shop icon).
BEFORE: `| 5 | "resit hilang" | receipt icon slides straight A to B | — | — |` — flat, mechanical, no sense of a real route.
AFTER: `| 5 | "ia datang dari sini" | macro follows the receipt along a drawn route over the counter, lingering briefly at the till before continuing to the shop icon | receipt eases to a near-stop at the till (long tail, "hang"), then moves quickly to the shop icon (short ease) on "sini" | path-drawn-roving-keyframe-motion--after-effects-easing-pro |`

=== cards/01_Animation_Motion/reactive-shadow-follows-object--ae-techniques-improve-motiongraphics.md
Topic: "Kenapa duit syiling bergerak kat atas meja nampak 'hidup'?" (illustrative — a coin sliding across a counter).
BEFORE: `| 4 | "duit bergerak" | coin slides across table, table surface unaffected | — | — |` — reads flat, pasted-on.
AFTER: `| 4 | "duit bergerak" | coin slides; a small soft PointLight (warm, range 0.8) parented to the coin's own
position trails just behind it, ground brightens slightly as the coin passes | coin's real cast shadow travels with
it from the existing key | reactive-shadow-follows-object--ae-techniques-improve-motiongraphics |`

=== cards/01_Animation_Motion/rotation-synced-shadow-opacity-for-occlusion--wonil-seo-motion-design.md
BEFORE: a flat drop-shadow under a spinning coin stays at constant opacity through the spin, reading as pasted-on.
AFTER: shadow opacity keyed from the same rotation value, dimming out when the coin's edge would block the light
and returning when it wouldn't.

=== cards/01_Animation_Motion/secondary-reaction-to-the-cut--animation-technique-guide.md
Topic: "Jual 100 cawan sehari vs 10 cawan sehari" (plain arithmetic at RM2 = RM200 vs RM20).
- BEFORE: cut from a busy counter to a quiet counter, nothing moves.
- AFTER: `| 8 | "Seratus cawan, **RM200**" | macro on a cash tray full of notes | count up in accent |` → hard cut → `| 9 | "Sepuluh cawan, RM20" | same framing, nearly empty tray | the two lone notes lift 2 % and settle over 0.5 s, staggered 2 frames; the RM20 label grows in | secondary-reaction-to-cut |`

=== cards/01_Animation_Motion/single-driver-null-parented-through-rig--wonil-seo-motion-design.md
Topic: a row of RM-coin denominations rotating together to reveal totals (illustrative).
BEFORE: each coin instance gets its own hand-placed rotation keyframes, hard to retime.
AFTER: all coin instances parented to one driver empty; only the driver's Z-rotation is keyframed (eased in-out),
retiming the whole reveal by editing one curve.

=== cards/01_Animation_Motion/snapping-contact-pose-before-pass-through--three-mograph-techniques.md
Topic: "Kenapa kad korang kena tolak kat mesin" (illustrative).
- BEFORE: `| 6 | "Kad korang tak lepas" | macro of card sliding into the reader | card slides in, screen shows error |`
- AFTER: `| 6 | "Kad korang **tak lepas**" | low macro on the reader slot | card meets the slot edge on "tak", holds 6 frames squashed 4 %, accent-red rim on the slot on "lepas"; card eases back out over 0.5 s | snapping-contact-pose |`

=== cards/01_Animation_Motion/stepped-hold-frames-impact--choppy-animation-better.md
Topic: "Bila kedai letak 'SALE' — berapa cepat harga jatuh?" (illustrative — a price tag swap).
BEFORE (house default, used everywhere): `| 7 | "harga turun" | price tag number eases/counts down over 0.4 s | — | — |`
AFTER (the ONE flagged exception, used once in the whole episode): `| 7 | "harga turun" | old price tag held 3 frames,
then the new price is simply THERE (no eased count) — a stamp, not a slide | a single brand-accent flash lasting one
frame on the new number, then settles to the normal house tone | stepped-hold-frames-impact--choppy-animation-better (⚠ exception, used once) |`

=== cards/01_Animation_Motion/stepped-interpolation-stop-motion-feel--mastering-blender-graph-editor.md
Topic: "Berapa untung kedai basuh kereta bila 1 kereta = RM15?" (illustrative).
BEFORE: `| 7 | "lima belas kereta" | counter ticks RM15→RM225 smoothly over 1 s | counter animates | — |`
AFTER: `| 7 | "lima belas kereta" | counter ticks RM15→RM225 in stepped, hand-thunked jumps (step = 2 @ 60 fps) | each
jump lands on a coin-drop sound cue | stepped-interpolation-stop-motion-feel |`

=== cards/01_Animation_Motion/time-remapping-universal-ease--after-effects-easing-pro.md
Topic: "stok habis dalam 3 hari" (illustrative; a stock-level bar drains on a path-drawn camera flight past shelf icons).
BEFORE: the camera flight's pacing is fixed by its original keyframes; adding a pause mid-flight means re-keying the whole move.
AFTER: frame brief Moves: "camera flight unchanged in its own keys; a time-remap layer adds one extra 0.3 s hold exactly
where the camera passes the near-empty shelf, on the word 'habis', without touching the flight's own keyframes." Shot-list
row: `| 7 | "stok habis dalam 3 hari" | camera flight along shelves, holds briefly at the emptiest shelf | hold synced to "habis" via time-remap, not a re-key of the flight | time-remapping-universal-ease--after-effects-easing-pro |`

=== cards/01_Animation_Motion/toon-shaded-3d-standin-hard-to-animate--japanese-studios-cg.md
Topic: a trolley/hand-truck rolling and turning toward camera at a loading bay (illustrative, Style D macro prop).
BEFORE: try to fake the turn as a 2D flat cut-out, which breaks perspective once it rotates past a certain angle.
AFTER: the trolley is a real 3D model moved through the turn, so perspective stays correct at every angle, shaded flat to match the rest of the scene's graphic language.

=== cards/02_Geometry_Nodes/4x4-transform-matrix-anatomy-and-shear--demystifying-geometry-nodes.md
Topic: "Kenapa rak kedai runcit letak barang senget sikit, bukan lurus?" (illustrative framing, plain visual point).
BEFORE: `| 4 | "barang senget sikit" | shelf rotates 10° | tins tilt | — |` — reads as the whole shelf turning, not a lean.
AFTER: `| 4 | "barang senget sikit" | shelf geometry sheared (Blender build: Combine Matrix row2,col1 = 0.35) so each
tin's base stays put but its top leans right, like a pushed stack; baked to GLB | tins fade in already leaning, 0.4 s | raea: no equivalent, baked in Blender |`

=== cards/02_Geometry_Nodes/attribute-anatomy-store-named-attribute--a-guide-to-attributes-and-fields.md
Topic: "Kenapa rak kedai runcit ada pelbagai jenis balang simpanan?" (illustrative — a shelf scatter of storage jars).
BEFORE: one jar model duplicated identically across the shelf — reads as a texture-tiled repeat, not real stock.
AFTER (Blender build): Store Named Attribute, Data Type Integer, Domain Instance, Name `variant_id`, Value = an Index
field — every scattered jar instance now carries its own id, which a later node (see sample-index / evaluate-at-index
cards) reads to pick a different height, label colour or lid for each one before baking the kit to GLB.

=== cards/02_Geometry_Nodes/attribute-handoff-gn-to-shader-random-and-highlight--index-position-nodes.md
Topic: "48 kotak snek, hanya satu yang bestseller — nampak dari cahaya je." (illustrative).
BEFORE: `| 6 | "yang bestseller" | all 48 boxes one flat colour, text label points at one | — |` — relies on a label, not light.
AFTER: `| 6 | "yang bestseller" | 48 boxes randomly mixed between two neutral colours; the one hero box glows softly blue,
rest stay unlit | glow fades in 0.4 s on "bestseller"; subtle Glare restrained to the hero | attribute-handoff-gn-to-shader-random-and-highlight--index-position-nodes |`

=== cards/02_Geometry_Nodes/capture-attribute-freeze-pre-transform-state--a-guide-to-attributes-and-fields.md
Topic: "Kenapa sikit kotak kat rak nampak senget, tapi label still nampak lurus?" (illustrative — a jittered box kit
where the label decal must stay oriented to the box's ORIGINAL position, not its noise-offset one).
BEFORE: the builder noise-offsets the box positions for a natural scatter look, then tries to align label decals —
but Position now returns the already-jittered value, so decals drift with the noise instead of staying box-true.
AFTER (Blender build): Capture Attribute stores Position before the noise-driven Set Position runs; the decal
placement step reads the captured "orig_pos" field instead of Position, so labels stay correctly anchored to each
box's pre-jitter slot while the boxes themselves still scatter naturally.

=== cards/02_Geometry_Nodes/capture-attribute-freeze-tilt-tangent-orient-to-curve--only-geometry-nodes-tutorial.md
Topic: "Troli runcit ikut laluan rak — kenapa ia senget ikut selekoh?" (illustrative route visualization).
BEFORE: `| 5 | "ikut selekoh" | trolley icons placed along a path, all facing the same flat direction | icons fade in | — |` — ignores the path's curve/banking.
AFTER: `| 5 | "ikut selekoh" | trolley icons' tilt + tangent captured right after resample (before offset), oriented via double Align Rotation to Vector so each one banks with the path's turn | icons fade in already banked to the curve, 0.4 s | capture-attribute-freeze-tilt-tangent-orient-to-curve--only-geometry-nodes-tutorial |`

=== cards/02_Geometry_Nodes/chained-matrix-multiply-order-matters--demystifying-geometry-nodes.md
Topic: "Kenapa troli runcit kedai ikut laluan tertentu, bukan terus ke rak?" (illustrative shot staging, not a
real logistics claim).
BEFORE: a camera-flight shot-list row just says "camera flies to the shelf" — ambiguous order if the flight both
orbits and pushes in.
AFTER: `| 3 | "troli ikut laluan" | camera: parent under a rail (world move along aisle), THEN rotate to face the
shelf, THEN push in 0.6 m — in that order, so it arrives facing the shelf, not mid-turn | — | chained-matrix-
multiply-order-matters--demystifying-geometry-nodes |`

=== cards/02_Geometry_Nodes/curve-to-mesh-profile-curve-loft-width-and-multiline--only-geometry-nodes-tutorial.md
Topic: "Berapa banyak bil air anda bayar tiap bulan? Ni 5 bar untuk 5 bulan" (illustrative numbers).
BEFORE: `| 5 | "5 bulan" | five flat bars hand-modeled side by side | bars grow in | — |` — static, re-modeled by hand if the count changes.
AFTER: `| 5 | "5 bulan" | one bezier curve + 5-circle profile curve, lofted once via Curve to Mesh; line_spacing slider sets the 0.4 s stagger gap | bars fade/grow in on each month-word, 0.4 s each | curve-to-mesh-profile-curve-loft-width-and-multiline--only-geometry-nodes-tutorial |`

=== cards/02_Geometry_Nodes/distance-from-trim-value-scale-band--only-geometry-nodes-tutorial.md
Topic: "RM50 jimat sebulan jadi RM600 setahun — macam mana ia bertambah?" (illustrative savings build-up).
BEFORE: `| 7 | "bertambah setiap bulan" | 12 coin-stack icons along a bar, all visible from frame 1 | bar grows | — |` — nothing marks "how far the count has gotten".
AFTER: `| 7 | "bertambah setiap bulan" | 12 coin icons along the bar; each coin's scale = distance-from-trim band (multiply-clamped, expand_start 1.4) so coins pop into existence from zero exactly as the bar's trim reaches them | coins grow from zero on each spoken month, never pop | distance-from-trim-value-scale-band--only-geometry-nodes-tutorial |`

=== cards/02_Geometry_Nodes/evaluate-at-index-borrow-neighbor-data--a-guide-to-attributes-and-fields.md
Topic: "Kenapa setiap dua balang kat rak nampak macam pasangan?" (illustrative — a shelf scatter where every pair of
jars should mirror each other's tilt).
BEFORE: a brief asks for "every second jar matches the one before it," but the builder tries to hand-author it per
instance — tedious and breaks if the scatter count changes.
AFTER (Blender build): Evaluate at Index on the Rotation field, with the Index input built from `floor(index / 2) *
2` (pairs share the even index below them) — every pair of jars now shares one tilt value automatically, confirmed
in the Spreadsheet, regardless of how many jars the scatter produces.

=== cards/02_Geometry_Nodes/exposed-parameter-panels-full-options--only-geometry-nodes-tutorial.md
Internal build note (not a script line): handing off a reusable "counter ticks" kit piece to a future episode.
BEFORE: the kit piece's Blender file has a dozen unlabelled Value nodes buried in the node tree; a future pass has
to open and trace the graph to change the tick count.
AFTER (ASSET-SOURCES.md entry): "`ticks.blend` — exposed params: `tick_count` (Int, 1–30, default 12, 'number of
ticks'), `tick_spacing` (Float, 0–5, default 0.3), `seed` (Int, panel: General). Panel 'Ticks' groups all three."

=== cards/02_Geometry_Nodes/field-vs-single-value-field-context--a-guide-to-attributes-and-fields.md
Topic: "Kenapa setiap lajur resit kedai lain-lain panjang?" (illustrative — a shelf of receipt-roll kit pieces).
BEFORE: a brief says "make every roll slightly shorter than the last," but the builder wires a single fixed Integer
into the height offset — every roll comes out identical because the value was never a field.
AFTER (Blender build): swap the fixed Integer for an **Index** field feeding a Multiply-by-constant node, still a
field all the way into Store Named Attribute on the Instance domain — each roll now gets its own height offset
proportional to its position in the row, confirmed in the Spreadsheet before baking.

=== cards/02_Geometry_Nodes/geometry-proximity-empty-driven-displacement--proximity-animations.md
Topic: "Bila mesin kaunter tekan, harga setiap barang di rak terus naik paparan." (illustrative macro state-change).
BEFORE: `| 3 | "harga terus update" | a hand icon pops over each price, one by one | — |` — abrupt, no physical cause.
AFTER: `| 3 | "harga terus update" | a scanner glow sweeps along a shelf; each price tag lifts and lights up only as the
glow nears it, settling behind | lift/light follows the glow's eased travel, small amplitude | geometry-proximity-empty-driven-displacement--proximity-animations |`

=== cards/02_Geometry_Nodes/gn-bevel-node-double-bevel-wireframe--blender-finally-did-it.md
Topic: "Kotak hadiah kedai online: bucu dibulatkan untuk nampak premium, bukan kotak kasar." (illustrative).
BEFORE: `| 2 | "kotak kemas" | sharp-edged cube prop, macro | price fades in | — |` — reads cheap/CG at macro distance.
AFTER: `| 2 | "kotak kemas" | same box, edges beveled (3 segments) so highlights wrap softly at macro distance | price
fades in on the beveled rim's highlight | gn-bevel-node-double-bevel-wireframe--blender-finally-did-it |`

=== cards/02_Geometry_Nodes/index-compare-select-single-instance-and-animate--index-position-nodes.md
Topic: "Kedai runcit stok 20 jenis snek RM2: mana yang paling laku?" (illustrative counts).
BEFORE: `| 5 | "yang ni paling laku" | grid of 20 snack boxes, static | price tag fades in | — |` — nothing shows *which* one.
AFTER: `| 5 | "yang ni paling laku" | grid of 20 boxes; one box (index 8) rises, turns to face camera, settles while the rest hold | hero box lifts+turns 0.6 s on "laku"; "#1" tag fades in on settle | index-compare-select-single-instance-and-animate--index-position-nodes |`

=== cards/02_Geometry_Nodes/index-modulo-alternate-instance-offset--index-position-nodes.md
Topic: "Kedai madu susun 48 botol heksagon: berapa RM untung sebulan?" (illustrative count/price).
BEFORE: `| 3 | "48 botol madu" | grid of bottles in straight rows | count ticks up | — |` — reads as a flat spreadsheet grid.
AFTER: `| 3 | "48 botol madu susun heksagon" | bottles nested in an interlocking hex grid (alternate rows offset half a
cell), camera flies low across the field | count ticks up as camera passes each row | index-modulo-alternate-instance-offset--index-position-nodes |`

=== cards/02_Geometry_Nodes/inset-via-extrude-zero-offset-scale-elements--procedural-pathways.md
Topic: "Jubin kedai nampak ada gap kecil antara setiap satu — kenapa?" (illustrative tile-grout note).
BEFORE: `| 3 | "ada gap kecil" | flat tiles with no visible seams | tiles fade in | — |` — reads as one solid slab, not individual tiles.
AFTER: `| 3 | "ada gap kecil" | each tile face: Extrude Mesh offset 0 → Scale Elements on the Top selection, scale 0.9–0.95 randomised per tile — produces a grout-gap ring per tile without a native inset node | tiles fade in with visible seams, 0.4 s | inset-via-extrude-zero-offset-scale-elements--procedural-pathways |`

=== cards/02_Geometry_Nodes/invert-transpose-determinant-matrix-utilities--demystifying-geometry-nodes.md
Topic: internal rig note (not a script line) — a kit piece's shear rig from the shear card above needs to
"un-shear" a copy for a clean silhouette reference.
BEFORE: re-derive the un-sheared shape by hand-adjusting values until it looks right.
AFTER (NOTES field on the shear rig's build log): "Un-sheared copy = Invert Matrix of the shear's Combine Matrix,
applied to the sheared mesh; checked Invert Matrix's boolean output = true before trusting it (no axis was scaled
to 0)."

=== cards/02_Geometry_Nodes/mesh-to-volume-grid-noise-scale-reveal--blender-finally-did-it.md
Topic: "Stok barang gudang kecil: nampak macam blok, tapi sebenarnya beribu unit kecil." (illustrative).
BEFORE: `| 4 | "beribu unit kecil" | one solid block prop, count overlay | — |` — the "many units" claim isn't shown.
AFTER: `| 4 | "beribu unit kecil" | the block visibly made of a grid of tiny beveled cubes; a noise pattern erodes
across it, flat clean sections beside eaten-through patches, lit by the one top key | erosion travels slowly on the
line, accent only on a counted-out hero unit | mesh-to-volume-grid-noise-scale-reveal--blender-finally-did-it |`

=== cards/02_Geometry_Nodes/position-node-delete-geometry-isolate-strip--index-position-nodes.md
Topic: "Rak kedai runcit: satu palang besi tengah pegang semua botol minyak." (illustrative set dressing).
BEFORE: `| 2 | "rak tersusun" | hexagon-packed bottle grid built separately from a straight support rail, hand-placed |
— |` — rail risks not lining up with the grid.
AFTER: `| 2 | "rak tersusun" | bottle grid built once; one coordinate strip is filtered from the same placement array
to carry the support rail, so it always lines up | rail fades in after the grid settles | position-node-delete-geometry-isolate-strip--index-position-nodes |`

=== cards/02_Geometry_Nodes/position-node-directional-rotation-wave--index-position-nodes.md
Topic: "Kedai tayar susun 50 batang besi: lihat macam ombak bila kita lalu." (illustrative set dressing).
BEFORE: `| 4 | "susunan kemas" | static grid of rods | camera pushes through | — |` — no life in the field.
AFTER: `| 4 | "susunan kemas" | grid of 50 rods; a rotation wave travels left-to-right across the field as the camera
tracks right | wave timed to the camera's own left-to-right push, small amplitude | position-node-directional-rotation-wave--index-position-nodes |`

=== cards/02_Geometry_Nodes/project-point-vs-transform-point-direction-perspective-warp--demystifying-geometry-nodes.md
Topic: "Kenapa kipas tunjuk arah angin, bukan ikut ke mana kipas tu bergerak?" (illustrative, plain mechanism).
BEFORE: frame brief just says "arrow rotates with the fan" — doesn't say whether the arrow's base should also
drift if the fan object is repositioned.
AFTER (frame brief field): `Moves: arrow is a DIRECTION — reorients with the fan's rotation only; its base position
never drifts even if the fan prop itself is nudged in a later pass (Transform Direction logic, not Transform Point)`.

=== cards/02_Geometry_Nodes/randomized-triangulate-dual-mesh-paving-shapes--procedural-pathways.md
Topic: "Lantai kedai runcit — kenapa jubin dia tak sekata semua?" (illustrative floor-pattern note).
BEFORE: `| 3 | "jubin tak sekata" | a perfectly even hexagon-tile floor | floor fades in | — |` — too uniform to read as "irregular".
AFTER: `| 3 | "jubin tak sekata" | grid Triangulate (Beauty) on ~60% of quads via Random Value Boolean, then Dual Mesh — mixed hexagon/irregular tile floor, seeded | floor fades in, 0.4 s, no pop | randomized-triangulate-dual-mesh-paving-shapes--procedural-pathways |`

=== cards/02_Geometry_Nodes/raycast-curve-snap-to-displaced-surface--procedural-pathways.md
Topic: "Laluan troli dalam kedai — kenapa ia ikut bentuk lantai, bukan garis lurus?" (illustrative layout note).
BEFORE: `| 2 | "ikut bentuk lantai" | a hand-placed path mesh, some tiles floating slightly above the floor texture | path fades in | — |` — visible floating/sinking on a bumpy floor render.
AFTER: `| 2 | "ikut bentuk lantai" | curve raised +10 m, Raycast onto the displaced floor mesh, Set Position snaps every point to the Hit Position; resampled to 12 points first | path fades in already flush with the floor, 0.4 s | raycast-curve-snap-to-displaced-surface--procedural-pathways |`

=== cards/02_Geometry_Nodes/sample-index-transfer-attribute-cross-object--a-guide-to-attributes-and-fields.md
Topic: "Kenapa barang kat rak kedai disusun ikut lengkung meja, bukan garis lurus?" (illustrative — a kit scatter of
tins following a reference curve's shape instead of a straight row).
BEFORE: the builder manually places each tin instance to roughly match a curve sketch — breaks the moment the curve
is edited.
AFTER (Blender build): the curve's control-point positions (source) are read with Sample Index, indexed by each tin
instance's own Index field (target, via Collection Info "Separate Children"), and piped into each instance's Set
Position — moving the curve now moves every tin automatically, re-baked once into the kit's GLB.

=== cards/02_Geometry_Nodes/tapered-radius-via-spline-factor-remap--only-geometry-nodes-tutorial.md
Topic: "Garis masa untung kedai sepanjang tahun" (illustrative profit-line diagram, numbers marked illustrative).
BEFORE: `| 6 | "sepanjang tahun" | a flat-thickness line across the year | line fades in | — |` — reads mechanical, cut-off ends.
AFTER: `| 6 | "sepanjang tahun" | same line, radius tapered 0→1→0 via Spline Parameter + RGB Curves remap before Curve to Mesh, so it thins to a point at Jan and Dec | line grows in from the centre outward, 0.4 s, no pop | tapered-radius-via-spline-factor-remap--only-geometry-nodes-tutorial |`

=== cards/02_Geometry_Nodes/trim-curve-factor-wipe-reveal--only-geometry-nodes-tutorial.md
Topic: "Macam mana duit anda sampai dari bank ke kedai runcit?" (illustrative flow diagram, plain mechanism).
BEFORE: `| 4 | "duit sampai ke kedai" | a static line with an arrowhead | arrow pulses | — |` — the line is already there, no sense of travel.
AFTER: `| 4 | "duit sampai ke kedai" | one curve from bank icon to kedai icon; Trim Curve End animates 0→1 across the line, drawing the route in as the word lands | route draws in 0.6 s on "sampai", eased in-out, no pop | trim-curve-factor-wipe-reveal--only-geometry-nodes-tutorial |`

=== cards/04_Shading_Lighting/animated-wiggle-blur-gradient-material--level-up-animation-styles.md
Topic: "produk baharu, kemasan premium" (illustrative; a product's packaging face should feel rich, not flat-printed).
BEFORE: `| 5 | "kemasan premium" | product face is a flat single-colour print | — | — |` — reads cheap, static.
AFTER: `| 5 | "kemasan premium" | macro on one face of the packaging; a slow-drifting soft multicolour gradient glows faintly under the label (desaturated except the brand's own accent colour), edges picked out by a thin rim light | gradient keeps drifting continuously (not tied to a word); label logo fades in on "kemasan premium" | animated-wiggle-blur-gradient-material--level-up-animation-styles |`

=== cards/04_Shading_Lighting/backlight-liquid-so-it-reads--apple-commercial-breakdown.md
Topic: "Teh tarik RM2.50: berapa untung sebenar segelas" (illustrative numbers; cost = susu + teh + gula + cawan).
- BEFORE frame brief: Light "top key on the glass"; the pour reads as a grey smear.
- AFTER frame brief: Ref macro pour at the stall; Decision "the pour is the line's subject"; Eye "the falling stream";
  Light "top key on the glass rim + back spot behind the stream at 0.6 m, range 1.4 m; wall stays black";
  Moves "on 'tarik' the stream lengthens over 0.6 s, eased; RM0.90 cost (illustrative) appears in accent beside the glass".

=== cards/04_Shading_Lighting/ecommerce-white-infinity-cove-two-light-combo--8-lighting-tricks.md
Topic: "gambar produk untuk Shopee" (illustrative; a seller photographing a product for an online listing).
BEFORE: `| 2 | "letak gambar di Shopee" | product on a plain flat background, visible floor-wall seam | — | — |` — reads amateur.
AFTER: `| 2 | "letak gambar di Shopee" | split-frame comparison: left half shows the old flat-seam photo, right half shows the cove-lit clean white listing photo with a crisp specular catch-light | wipe reveal from old to new photo on "Shopee" | ecommerce-white-infinity-cove-two-light-combo--8-lighting-tricks |`

=== cards/04_Shading_Lighting/environment-light-grounds-imported-model--motion-explainer-3-scenes-part2.md
Topic: an imported library coin/token prop sitting on a kedai runcit's counter (illustrative prop use).
- BEFORE: the coin model sits on the counter with no shadow — reads like a cut-out sticker.
- AFTER: the same coin casts a soft contact shadow onto the counter surface under the top light — it reads as physically present.

=== cards/04_Shading_Lighting/finishing-glint-extra-light--apple-commercial-breakdown.md
Topic: "Kenapa syiling 5 sen masih penting di kaunter" (Malaysian cash totals are rounded to the nearest 5 sen — real).
- BEFORE: macro of a 5-sen coin under the top key; flat grey disc.
- AFTER frame brief: Light "top key + one glint PointLight at the mirror angle to the coin's rim, range 0.6 m";
  Eye "the rim glint, then the '5'"; Moves "on 'lima sen' the glint slides along the rim over 0.6 s eased".

=== cards/04_Shading_Lighting/grid-size-controls-rim-spread--lighting-jack-bridgland.md
Topic: "logo kedai kopi bersinar di tepi" (illustrative; a coffee-shop logo's edge should catch light, not the whole cup).
BEFORE: `| 3 | "kedai kopi ini" | rim light washes the whole cup evenly | — | — |` — no focal point, everything equally lit.
AFTER: `| 3 | "logo kedai kopi" | a tight-grid rim (outer_angle 0.18) catches only the embossed logo's edge; the rest of the cup stays in the soft top key | logo edge brightens on "kedai kopi", rest of cup unchanged | grid-size-controls-rim-spread--lighting-jack-bridgland |`

=== cards/04_Shading_Lighting/layered-complementary-gels-per-light-role--lighting-jack-bridgland.md
Topic: "kedai bunga malam Krismas" (illustrative; a flower-shop counter, warm Christmas evening mood).
BEFORE: `| 4 | "waktu sibuk" | counter lit flat, one white key, no character | — | — |` — functional but flat.
AFTER: `| 4 | "waktu sibuk" | counter under a warm key; a cool desaturated fill on the shadow side keeps detail without fighting the warmth; a faint cool rim separates the counter from the dark room; the one red ribbon on the flower bouquet (accent) stays the only saturated colour | nothing changes state here — a held lighting beat before the next cut | layered-complementary-gels-per-light-role--lighting-jack-bridgland |`

=== cards/04_Shading_Lighting/motivated-area-lights-scale-matched-pools--lighting-with-only-hdris.md
Topic: "Kenapa lorong belakang gerai makan nampak lebih 'hidup' waktu malam?" (illustrative — a night back-alley
establishing shot for a food-stall episode).
BEFORE: `| 2 | "lorong belakang" | Environment (night HDRI) + one big DirectionalLight over the whole alley | — | — |`
— flat, no sense of scale, every stall lit identically.
AFTER: `| 2 | "lorong belakang" | night Environment stays the base; one small warm RectLight motivated by each stall's
own signboard, sized to that stall's pocket (not the whole alley); one cool-tinted PointLight at the one working
streetlamp | signboards light up one at a time as camera passes, 0.4 s fade each | motivated-area-lights-scale-matched-pools--lighting-with-only-hdris |`

=== cards/04_Shading_Lighting/proximity-attribute-shader-glow-mask--proximity-animations.md
Topic: "Lampu kaunter kedai basuh kereta: hanya bahagian yang digunakan yang menyala." (illustrative).
BEFORE: `| 7 | "bahagian aktif menyala" | whole panel lit uniformly | — |` — no sense of "where" the action is.
AFTER: `| 7 | "bahagian aktif menyala" | a row of price tags; only the tag nearest the moving scanner glows warm amber,
fading as the scanner passes on | glow zone tighter than the physical lift, warm accent only | proximity-attribute-shader-glow-mask--proximity-animations |`

=== cards/04_Shading_Lighting/rectangular-beam-light-rig-narrow-spread--modern-lighting-techniques.md
Topic: a vending machine's coin slot lit for a macro "this is where the money goes" beat.
BEFORE: one soft top light evenly fills the whole machine face — no sense of drama on the slot itself.
AFTER: a narrow RectLight beam angled down across the coin slot (spread tight enough to stay a defined shaft), a
second long skinny RectLight crossing it from the side, both against a near-black world with only a faint ambient
fill — the coin slot reads as the one dramatically lit point on the machine.

=== cards/04_Shading_Lighting/staggered-light-fade-in-reveal--aesthetic-3d-documentaries.md
Topic: "Kedai runcit buka pukul 6 pagi: apa jadi sebelum pintu dibuka" (illustrative).
- BEFORE: `| 1 | "Pukul 6 pagi, kedai ni dah hidup" | macro of shelves, all lights on from frame 0 | — |`
- AFTER: `| 1 | "Pukul 6 pagi, kedai ni dah hidup" | macro of the shop's roller-shutter logo, near-black, top key at 10 % on frame 0 | key ramps to full on "6 pagi" (1.2 s eased), shelf side light +0.3 s, back rim +0.6 s lands on "hidup" | staggered-light-fade-in |`

=== cards/05_Camera_Raea_Pipeline/14-frames-back-deceleration-into-cut--3d-camera-transitions-pt2.md
Topic: a warung's gas-tank swap, camera push ending on the new tank (illustrative).
BEFORE: camera push decelerates "whenever it looks right" — inconsistent timing across the episode's cuts.
AFTER: every push-to-cut in the episode starts its deceleration key exactly 12 frames (0.4 s at 30fps) before the cut, eased within speed limits → 14-frames-back-deceleration-into-cut.

=== cards/05_Camera_Raea_Pipeline/bake-and-smooth-camera-path--cinematic-camera-movements.md
Topic: "Dari ladang ke gerai — perjalanan sebiji kelapa RM3" (illustrative).
- BEFORE: `| 6 | "Kelapa ni naik lori 300 km" | camera flight over a toy-scale road, hand-keyed in 6 keys; visible bumps at keys 3 and 5 |`
- AFTER: same row, path baked → 4 smooth passes → decimated to 3 keys; the flight glides like a gimbal, ending on the composed truck frame on "300 km".

=== cards/05_Camera_Raea_Pipeline/camera-motion-as-tempo-lever--how-to-pace-your-film.md
Topic: "Simpan RM10 sehari — setahun jadi berapa?" (plain arithmetic: 10 × 365 = RM3,650).
- BEFORE: every setup a fast orbit.
- AFTER: L03–L06 F: one continuous eased flight across a row of tabung coins growing; L09 S: locked macro, slow 3 % push on the tabung while "RM3,650" counts up in the accent colour.

=== cards/05_Camera_Raea_Pipeline/camera-move-menu-by-meaning--cinematic-camera-movements.md
Topic: "Kalau korang nak jual kuih online, ni caranya. 3 step je." (S16, illustrative)
- BEFORE: rows 3–5 all `slow push on the kuih`.
- AFTER: `| 3 | "Step satu: gambar cantik" | static over the kuih tray, phone shutter frame appears | shutter event on "gambar" |`
  `| 4 | "Step dua: letak harga RM1.20 sebiji" | tilt up from one kuih to the full 50-piece tray (scale) | "RM1.20" tag fades in |`
  `| 5 | "Step tiga: hantar sebelum pukul 10" | tracking: camera follows the boxed order sliding to a delivery bag, always looking at it | clock face shows 10:00 |`

=== cards/05_Camera_Raea_Pipeline/camera-tilt-sky-vs-ground-mood--8-cinematic-fundamentals.md
Topic: a hawker alone at his stall after a bad month (illustrative numbers).
BEFORE: a flat eye-level frame on the empty stall, no mood decision made by the tilt.
AFTER: shot-list — "tilt up (solitude): the stall sits low, a huge dark empty ceiling above it, for the line 'bulan
ni sunyi je.'"

=== cards/05_Camera_Raea_Pipeline/cross-the-180-line-safely--8-cinematic-fundamentals.md
Topic: comparing two competing kedai's prices for the same item, side by side (illustrative numbers).
BEFORE: L03 shows kedai A on the left; L05 jumps the camera to the far side without warning, and kedai A is now on
the right — reads as confusing even though nothing else changed.
AFTER: shot-list — "L03 side A (kedai A left, kedai B right)"; "L04 bridge: medial, camera head-on between them";
"L05 side B (kedai A right, kedai B left) — now a deliberate flip, read as a clean turn, not a continuity error."

=== cards/05_Camera_Raea_Pipeline/fov-vs-orthographic-zoom-mechanics--understanding-cameras.md
Topic: a data-diagram insert showing a chart of daily sales (flat, technical read wanted).
BEFORE: used a perspective camera for the chart insert; pushing the camera in to "zoom" on one bar also perspective-
skews the bar's apparent height relative to its neighbours.
AFTER: switched to an orthographic camera for this insert; all bars keep true relative height regardless of distance;
the "zoom" on one bar is done by animating the orthographic scale value, not camera position.

=== cards/05_Camera_Raea_Pipeline/free-look-vs-point-of-interest-camera--ae-camera-guide.md
Topic: "Berapa sebenarnya kos secawan teh tarik kat gerai" (illustrative RM).
Row BEFORE: `| 7 | "Gula, susu, teh, semua naik harga" | camera orbits the table | items appear | |`
Row AFTER: `| 7 | "Gula, susu, teh, semua naik harga" | aimed camera, slow eased arc; aim point eased sugar tin → milk can → tea pack on each word | each item's price tag rises RM0.20 in accent as the aim lands on it | free-look-vs-point-of-interest-camera |`

=== cards/05_Camera_Raea_Pipeline/height-minus-offset-math-seamless-whip--3d-camera-transitions-pt2.md
Topic: a vending machine's coin drop, camera tracking down through two setups (illustrative).
BEFORE: setup A's coin travels to y = −0.6 (of a −1.0 full drop); setup B starts the next coin at y = 0 — visible re-pop/jump at the cut.
AFTER: setup B's coin starts at y = −1.0 − (−0.6) = −0.4, so the combined travel across both setups reads as one continuous fall → height-minus-offset-math-seamless-whip.

=== cards/05_Camera_Raea_Pipeline/jib-down-opens-a-story--overwatch-dragons-camera.md
Topic: "Kalau korang nak buka gerai burger, ni caranya. 4 step je." (S16, illustrative)
- BEFORE: `| 3 | "Step satu: kira modal" | static macro of a burger bun | — |`
- AFTER: `| 3 | "Step satu: kira modal" | jib down from above the gerai's grill plate to grill height, bun enters lower third | "RM800 modal" (illustrative) label fades in on "modal" | jib-down-opens-a-story |`

=== cards/05_Camera_Raea_Pipeline/multi-stop-camera-move-no-stall--ae-camera-guide.md
Topic: "Kenapa harga sale kat kedai runcit Shah Alam nampak murah" (illustrative).
Row BEFORE: `| 5 | "Tengok tag lama, then tag baru" | camera keys A→B→C, eased | stops on old tag, then moves | |`
Row AFTER: `| 5 | "Tengok tag lama, then tag baru" | macro flight, two overlapping eased legs: glide past old tag RM12.90 (no stop) → land on new tag RM9.90 on "baru" | old tag dims as the camera passes; new tag's price lights accent on "baru" | multi-stop-camera-move-no-stall |`

=== cards/05_Camera_Raea_Pipeline/near-far-clip-plane-tradeoffs--understanding-cameras.md
Topic: a macro push-in on a coin's milled edge.
BEFORE: global default `near=0.1` (in metres) used for every shot; on the closest frame of the push-in (camera 0.04 m
from the coin edge) the coin's inside renders visible through its face — clipping.
AFTER: this shot's `near` lowered to 0.02 for the push-in's duration; the clip no longer shows. A separate wide
establishing shot keeps `near=0.1` since its closest approach is much farther away.

=== cards/05_Camera_Raea_Pipeline/parallax-depth-card-staging-scale-to-preserve-size--eye-catching-3d-scenes.md
Topic: a laundromat's per-wash cost breakdown (illustrative numbers).
BEFORE: all elements (machine icon, coin icon, RM label) sit on one flat plane; a camera push does nothing but zoom.
AFTER: background (washer row) pushed to z=-6 and scaled ×2.2; hero (the coin) stays near z=0; foreground RM label
cards pushed to z=+1.5, scaled ×1.3 — a camera push now reveals real depth between the washer row, the coin, and the
label as it flies past.

=== cards/05_Camera_Raea_Pipeline/parallax-push-through-image-illusion--smooth-3d-camera-movement.md
Topic: "lihat dalam resit digital" (illustrative; the camera flies through a printed receipt into the digital app view it describes).
BEFORE: `| 6 | "lihat dalam apl" | hard cut from a photo of a paper receipt straight to the app screen | — | — |` — an ordinary cut, no connective motion.
AFTER: `| 6 | "lihat dalam apl" | camera pushes into a macro photo of the receipt; a masked cut-out of its QR code flies past the lens while the photo keeps growing, dissolving into the matching QR code on the phone app screen | QR code passes camera and the app screen resolves on "apl" | parallax-push-through-image-illusion--smooth-3d-camera-movement |`

=== cards/05_Camera_Raea_Pipeline/pull-out-closes-a-chapter--overwatch-dragons-camera.md
Topic: "Kenapa kedai buku kecil makin hilang" (illustrative).
- BEFORE: `| 10 | "Tinggal satu kedai je kat jalan ni" | static wide of a shopfront |`
- AFTER: `| 10 | "Tinggal satu kedai je kat jalan ni" | pull out from one lit book spine on the counter to a dark row of shuttered shop models, the lit one alone in frame | accent light stays only on that shop | pull-out-closes-a-chapter |`

=== cards/05_Camera_Raea_Pipeline/seamless-depth-push-scene-join--master-infinite-camera-movement.md
Topic: "Kemasukan parkir: bila bar automatik angkat?" (illustrative — a continuous push from the ticket slot into
the barcode scanner's screen).
BEFORE: `| 6 | "tiket keluar" | hard cut from ticket machine close-up to barcode-scanner close-up | — | — |` — two
separate setups, a visible cut.
AFTER: `| 6 | "tiket keluar...bar automatik angkat" | camera pushes continuously from the ticket slot (scene A, max
depth −2.4) straight through the ticket's own printed edge (occluder, scene-native) into the scanner screen (scene B
starting at −2.4); screen fades in 0.4 s behind the edge, DoF racks from ticket to screen mid-push | ticket text
morphs to barcode graphic on "bar automatik" | seamless-depth-push-scene-join--master-infinite-camera-movement |`

=== cards/05_Camera_Raea_Pipeline/slow-push-in-marks-the-key-moment--overwatch-dragons-camera.md
Topic: "Gerai air tebu untung berapa sehari?" (illustrative).
- BEFORE: `| 9 | "Untung bersih dia RM180 sehari" | orbit around the cup | counter counts |`
- AFTER: `| 9 | "Untung bersih dia RM180 sehari" | subtle push-in on the cup, no orbit, 2.6 s | counter rolls to RM180 on "RM180"; accent glow on the number | slow-push-in-marks-the-key-moment |`

=== cards/05_Camera_Raea_Pipeline/two-axis-camera-move--overwatch-dragons-camera.md
Topic: "Harga minyak masak paket vs botol" (illustrative).
- BEFORE: `| 4 | "Paket 1 kg RM2.50" | slow push on the static pack |`
- AFTER: `| 4 | "Paket 1 kg RM2.50" | camera rises ~7 cm while trucking left ~9 cm, ending above-left of the pack | "RM2.50" tag fades in on "RM2.50" | two-axis-camera-move |`

=== cards/05_Camera_Raea_Pipeline/view-frustum-culling-check--understanding-cameras.md
Topic: a shot-list row placing a row of small payment-method icons along the frame's right edge.
BEFORE: icons placed right at the calculated frustum boundary for the widest-FOV frame of the camera move; on a
slightly different frame (narrower FOV mid-move) half the row clips off-screen.
AFTER: icons placed with a safety margin inside the frustum boundary for the move's narrowest FOV frame, so they stay
fully visible across the whole camera move.

=== cards/06_Art_Direction/accent-colour-breaks-from-grey--juxtaposition-in-film.md
Topic: "Satu kedai je yang naik harga — kenapa ramai tetap beli?" (illustrative).
- BEFORE: a row of 5 coloured stall price boards, all saturated.
- AFTER: `| 6 | "Semua gerai RM8… satu je RM10" | dolly along 5 grey price boards under a soft top light | on "satu je", the fifth board's "RM10" turns accent over 0.4 s | accent-colour-breaks-from-grey |`

=== cards/06_Art_Direction/ai-3d-base-mesh-from-2d-concept-reference-only--japanese-studios-cg.md
Topic: blocking a hero prop's rough silhouette from a hand sketch before full modelling (illustrative).
BEFORE: skip straight from a sketch to final modelling, guessing proportions from the 2D image alone.
AFTER: generate a quick 3D block-in from the orthographic sketch to confirm the silhouette and proportions read
correctly from the intended camera angle, then rebuild it as a proper asset — the generated mesh itself never ships.

=== cards/06_Art_Direction/always-be-collecting-swipe-file--ideas-in-motion-design.md
Topic: DuitNow QR at a gerai.
BEFORE: build a new "squares assemble" transition from scratch for L05.
AFTER: an earlier episode's grid-reveal (tiles flipping into a screen) is found in its build folder; re-fitted so the QR
modules flip into the bank app's success screen, in this episode's accent; saves the build and stays object-based.

=== cards/06_Art_Direction/ambient-background-props-drift--saas-explainer-masterclass.md
Topic: a laundromat's app background behind a "3 mesin kosong" (3 machines free) UI card (illustrative count).
- BEFORE: three machine-icon PNGs sit flat and static behind the card.
- AFTER: the icons are tinted to the app's accent, lightly blurred, each drifts a hair of rotation, and fades in a few
  frames apart — the background reads alive without pulling focus from "3 mesin kosong".

=== cards/06_Art_Direction/ambient-vs-reflective-light-distinction--how-colors-change-lighting.md
Topic: a warung's gas stove, close-up on the burner (illustrative).
BEFORE: a single low-power fill light, undirected, slightly blue — reads as generic CG fill.
AFTER: Decision — "reflective, from the stainless counter below" → a dim warm-grey RectLight aimed up from where the
counter would be, plus a small neutral AmbientLight just to keep the top of the burner's shadow side off pure black.

=== cards/06_Art_Direction/animate-gradient-phase-seamless-loop--pick-colors-blender.md
Topic: a slowly breathing accent-colour wash behind a "Follow Meikigo for more" end card (illustrative use).
BEFORE: a looping background clip that visibly jumps/resets every cycle, a distracting flicker on loop.
AFTER: the wash is driven by a sine phase keyframed 0 → 2π over the card's full hold; the loop point is invisible.

=== cards/06_Art_Direction/attention-pull-ladder-focus-light-colour--look-like-movies.md
Topic: "Satu barang je yang buat untung kedai serbaneka" (illustrative: 1 item × RM1.20 margin × 300 sold = RM360/day).
- BEFORE: a sharp shelf of 40 snacks, evenly lit, all colourful; the hero item is just sharper.
- AFTER Eye field: "the ice-cream freezer lid — focus ✓ (shelf blurred), contrast ✓ (narrow top spot on the freezer, aisle dark), accent ✓ (only the price sticker 'RM1.20 untung' in brand colour; other packs desaturated)".

=== cards/06_Art_Direction/attract-intrigue-deliver-flow--visual-hierarchy-graphic-design.md
Topic: frame 0 for "kenapa kedai ni sentiasa penuh waktu tengah hari?" — a busy stall at lunch (illustrative).
BEFORE: hero stall, hook text, and a RM number all land on screen with equal weight — the eye doesn't know where to start.
AFTER: attract = the stall's steaming wok (biggest, accent-lit) → intrigue = the ≤8-word hook text appearing a beat
later, smaller → deliver = the RM number counting up, smallest, landing last on the word it supports.

=== cards/06_Art_Direction/avoid-tangents-keep-silhouettes-clear--tips-for-drawing-backgrounds.md
BEFORE: a coin's edge just grazes the frame's bottom edge in the final held frame.
AFTER: camera adjusted so the coin either clears the bottom edge with a gap or is deliberately cropped by it, not
grazing.

=== cards/06_Art_Direction/big-idea-pyramid-insight-idea-execution--art-direction-ingredients.md
Topic: a warung's RM1 delivery "service fee" that quietly repeats on every order (numbers illustrative).
BEFORE: start drafting Script v1 lines about delivery fees with no guiding sentence.
AFTER: Insight — "a fee too small to argue over is exactly the one nobody tracks." Idea — "make the viewer watch their
own RM1 fees stack into a real number before they can look away." Every later beat (the counter ticking, the receipt
pile, the end question) traces back to that idea.

=== cards/06_Art_Direction/black-box-scene-selective-over-realism--aesthetic-3d-documentaries.md
Topic: "Bank Negara tak cetak duit sesuka hati" (central bank issues currency — real; no numbers needed).
- BEFORE: a full street model of KL with traffic, trees, buildings, sky; the bank building is one of many.
- AFTER frame brief: Ref Fern opening shot; Idea "the institution alone"; Decision "black box: one neoclassical bank
  façade (library model) on a dark plane, void around"; Eye "the façade's pediment"; Light "two spots left/right,
  back light linked to the façade only"; Moves "on 'tak cetak' camera drifts down ~0.3 m, ease-out"; Handover "the
  door frame becomes the next setup's frame".

=== cards/06_Art_Direction/break-physics-for-clarity--animated-movies-lighting.md
Topic: "Harga petrol RON95: kenapa sama di semua stesen" (Malaysian pump prices for RON95 are set by the government, so every station shows the same price — real).
- BEFORE still: macro of the pump display; the nozzle's shadow covers the price digits.
- AFTER: same framing and top key; one `PointLight` (range 0.4 m) lifts the display area; the digits read sharp; accent on the price; board check passes "subject fully readable".

=== cards/06_Art_Direction/break-sequence-into-sections-each-own-statement--sony-animated-masterpieces.md
Topic: "3 cara elak kena scam QR palsu" (how-to, 3 steps).
BEFORE: all three steps lit the same flat top light.
AFTER: step 1 (spot the fake QR) flat even light; step 2 (check the merchant name) hard side light picks out the
mismatch; step 3 (report it) backlit silhouette on the phone being put down — three sections, one accent colour
throughout, each with a different light statement.

=== cards/06_Art_Direction/budget-tiered-idea-generation-list-odd-objects--100-art-direction-ideas.md
Topic: a locksmith's "hidden fee for a duplicate key" (illustrative).
BEFORE: commissioning a custom-built oversized key prop to make the point visually big.
AFTER (lowest tier first): an existing CC0 keyring asset from the library, re-scaled and re-lit, already does the job —
no new asset needed; a "higher tier" (a fully custom giant key sculpture) is noted but skipped as unnecessary for this episode.

=== cards/06_Art_Direction/bw-tonal-pass-then-color-pass-backgrounds--japanese-studios-cg.md
Topic: a hazy street backdrop behind a hero object at a construction site (illustrative).
BEFORE: pick colours straight from a reference photo; the backdrop ends up with correct hues but a flat, same-depth read.
AFTER: desaturate the reference first, confirm which buildings read near vs far by tone alone, then reapply colour — the backdrop now holds depth even before the accent colour is added.

=== cards/06_Art_Direction/camera-lights-parented-rig--fern-imperial-characters.md
Topic: Style D's recurring top-light + rim rig, reused across different hero objects in one episode (illustrative).
BEFORE: relight each new setup from scratch when the hero prop changes (a receipt, then a coin stack, then a QR code).
AFTER: one camera+lights rig built once at the origin; each new setup just swaps the object sitting under the
same rig, so lighting consistency across cuts is guaranteed, not re-eyeballed per shot.

=== cards/06_Art_Direction/camera-on-shadow-side-of-fixed-light--match-cut-cinematic-breakdown.md
Topic: a pasar malam stall's weighing scale (illustrative).
BEFORE: camera placed facing straight into the key light's direction — the scale reads flat, no edge definition.
AFTER: camera moved ~45–60° off the light axis so the scale's dial rim catches light while its base falls into shadow → frame-brief "Eye: scale rim lit, base in shadow, reads with depth" → camera-on-shadow-side-of-fixed-light.

=== cards/06_Art_Direction/camera-position-follows-attention-arc--directing-without-words.md
Topic: a laundromat's coin box vs the phone QR sticker beside it (generic, illustrative).
BEFORE: four random angles on the machine.
AFTER
- L03 "Mesin ni dulu terima syiling je." front, eye-level on the coin slot.
- L04 "Sekarang ada QR kecil kat tepi." behind the coin slot, looking past it to the QR sticker.
- L05 "Setengah pelanggan dah scan." closer on sticker and slot together; a counter reaches 50 %.
- L06 "Satu sticker. Tapi tu separuh duit kedai." wide: the whole row of machines, one sticker each.

=== cards/06_Art_Direction/catchlight-only-eye-light-near-zero-output--obsession-lighting-recreation.md
Topic: a macro shot of a coin or a glossy phone screen on the counter (illustrative).
BEFORE: no catchlight; the glossy surface reads flat and dead.
AFTER: frame brief Decision: "eye-light: tiny PointLight beside the camera, ~1% of key intensity, visible only as a
point reflection on the coin's glossy face."

=== cards/06_Art_Direction/clay-metallic-material-with-danger-accent-swap--imperial-3d-animate-tutorial.md
Topic: a pasar malam stall's "fast lane" item vs. the rest of the menu (illustrative).
BEFORE: every food item on the stand gets its own realistic colour and texture, so nothing is singled out.
AFTER: every item shares one neutral clay-metal material; the one item the line names ("Ni yang paling laku") is the
same material duplicated with the accent colour — it reads as the focus the instant the shot opens.

=== cards/06_Art_Direction/close-up-on-the-decision-beat--shot-sizes-explained.md
Topic: "Beli pukal RM90 atau beli kecil-kecil?" (plain arithmetic: 10 × RM10 = RM100 vs RM90 bulk).
- BEFORE: `| 10 | "Jadi korang pilih mana?" | WS of two shopping bags | — |`
- AFTER: `| 10 | "RM90 sekali… atau RM100 sikit-sikit?" | CU · eye-level on two price tags side by side | the RM90 tag lights accent green on "RM90" |` → `| 11 | "Korang pilih mana?" | same CU | both tags hold |`

=== cards/06_Art_Direction/colour-attention-ranking-one-accent--visual-hierarchy-graphic-design.md
Topic: a dashboard screen showing one overdue bill among several paid ones (illustrative UI scene).
BEFORE: all bill rows use the same neutral colour with small text labels ("paid"/"overdue") — nothing pulls the eye.
AFTER: every row stays greyscale except the overdue row, which gets the one brand accent (in the red/orange family) —
the eye lands on it immediately, no label needed.

=== cards/06_Art_Direction/colour-key-cutout-flat-character-rim-stroke--saas-explainer-masterclass.md
Topic: three regulars reacting to a kedai kopi's new price list on a chat-style UI (generic names, no real people).
- BEFORE: three generic circular avatar PNGs sit flat on the screen.
- AFTER: each avatar is a clean cutout (rim intact, no white fringe) sitting on its own gradient badge colour, reused
  from one pre-built template per person.

=== cards/06_Art_Direction/colour-key-per-shot-light-spec--animated-movies-lighting.md
Topic: "Bayar ansuran telefon: RM3,600 jadi RM4,200" (illustrative; total = monthly × months).
- BEFORE frame brief light line: "moody lighting".
- AFTER colour key, setup 7 ("RM175 sebulan, 24 bulan" — illustrative, 175 × 24 = 4,200): level `dark` · lights `2` · sources `desk lamp above (key), phone screen (practical)` · hex `#fff3e6` key, `#cfe0ff` screen · shadow `soft, short, under the phone` · accent on "RM4,200" only.

=== cards/06_Art_Direction/colour-match-cut-carries-the-accent--mastering-match-cut.md
Topic: "Tag SALE RM89 — resit pun sama ke?" (illustrative price).
- BEFORE: a red sale sign → cut → a receipt.
- AFTER: the red "SALE" tag at upper-left third; cut on "bayar"; the receipt's total "RM89" printed in the same red at the upper-left third; rest neutral.

=== cards/06_Art_Direction/colour-matched-blurred-duplicate-as-text-glow--saas-explainer-masterclass.md
Topic: "RM50 untung" (RM50 profit) headline on a stall's daily tally (illustrative amount).
- BEFORE: "RM50 untung" fades in with a generic AE-style drop shadow.
- AFTER: "RM50 untung" is coloured in the stall's accent; a blurred, same-colour duplicate glows softly behind it at
  ~32% opacity, both fading in together.

=== cards/06_Art_Direction/colour-script-emotional-arc--animated-movies-lighting.md
Topic: "Kenapa gerai burger tutup lepas 6 bulan" (illustrative numbers; profit = sales − costs).
- BEFORE: all 11 setups lit the same warm top key; the loss beat feels like the open.
- AFTER colour column: L01 hook `mid-neutral` · L03 "Jual 80 biji sehari" `bright-warm` · L06 "Sewa RM1,500, minyak naik" `mid-cool` · L08 "Untung sebenar: RM3 sehari" (low point) `dark-cool` · L10 the fix `bright-warm` · L11 question `mid-neutral` (loops to L01). Accent (brand colour) on the RM numbers in every setup.

=== cards/06_Art_Direction/composition-bias-check-avoid-one-side-weight--100-art-direction-ideas.md
Topic: a motorbike repair shop's spare-parts wall (illustrative).
BEFORE: the hero wrench fills the right two-thirds of frame in bright light; the left third is flat dark wall, empty.
AFTER: a single blurred spare tyre (dark, out of focus, in shadow) sits low-left — enough mass to balance the frame
without pulling attention from the wrench.

=== cards/06_Art_Direction/concentric-shape-echo-stagger-background--saas-motion-30min.md
Topic: a savings-goal card settling into frame (illustrative numbers on the card).
- BEFORE: the card appears against a flat, static background.
- AFTER: four faint outlines of the same card shape ripple outward behind it as it settles, each a frame or two behind
  the last — the scene feels alive without any new on-screen content.

=== cards/06_Art_Direction/consistent-visual-device-across-series-for-recall--art-direction-ingredients.md
Series: "Everyday Owners." Recurring device: every episode opens on the same macro object type (a cash drawer, in
some form) before cutting to that owner's specific business — so viewers recognise the series within the first second
even before the logo appears.

=== cards/06_Art_Direction/contrasting-colour-grammar-past-vs-present--sony-animated-masterpieces.md
Topic: a stall owner who used to lose cash to miscounted change, now uses a QR till (illustrative numbers).
BEFORE grade: "before" setups (counting loose coins, shadowed till) are lit low, cool, grounded — matching the
money-loss mood. AFTER grade: "after" setups (the QR scan, the running total) are lit brighter, key light fuller — the
accent colour on the RM number is the only constant between both states.

=== cards/06_Art_Direction/controlnet-depth-guided-concept-art-reference-only--3d-blockout-ai-concept.md
Topic: deciding the mood/lighting direction for a "closed-down shoplot" backdrop before building it for real (illustrative).
BEFORE: jump straight into modelling the backdrop and lighting it, discovering late that the mood doesn't match the script's tone.
AFTER: a quick blockout + depth-guided AI concept pass (with negative prompts and a style reference) settles the
mood direction fast, labelled explicitly as reference-only; the actual backdrop is then built and lit for real from that direction.

=== cards/06_Art_Direction/courier-run-follow-one-object--mograph-storytelling-4-plots.md
Topic: where one RM5 from a teh tarik goes at a mamak in PJ (illustrative split).
- BEFORE: L05 "Kos operasi tinggi" over a pie chart.
- AFTER: object = one RM5 note. Stop 1 (the cup): RM1.20 tea, milk, sugar peel off. Stop 2 (the wall): RM1.50 rent
  slides to a key. Stop 3 (the worker's apron): RM1.30 wages. Stop 4 (back on the counter): RM1 left glows accent. End
  question on frame-0 framing: "RM1 untung secawan… berbaloi ke buka pukul 3 pagi?" (1.20 + 1.50 + 1.30 + 1 = 5.)

=== cards/06_Art_Direction/derive-look-from-the-story-world--story-to-motion-workflow.md
Topic: a kedai gunting rambut's daily takings (generic shop, illustrative).
BEFORE frame brief: "Hero: a gold coin on a dark gradient."
AFTER: world list = barber chair vinyl, steel comb tray, clipper, talc tin, cash drawer. Hero surface = the steel comb
tray; hero = the day's notes fanned on it; swap-in prop = a phone showing a DuitNow notification; room tone = a distant
clipper hum.

=== cards/06_Art_Direction/desaturate-and-crush-blacks-for-monochrome-style--fern-3d-edits.md
Topic: a repair shop's tool wall, told in a flat graphic style (illustrative).
BEFORE: each tool's library texture keeps its real-world colour (red handle, yellow caution tape, brown wood bench).
AFTER: every material is desaturated toward near-grey with crushed blacks; only the one tool the line is about keeps
its accent-coloured highlight, so it is the only colour in the frame.

=== cards/06_Art_Direction/desaturate-one-world-so-other-pops--animated-movies-lighting.md
Topic: "Buku 555 vs app akaun: kedai runcit kira untung" (how-to; arithmetic: profit = sales − cost).
- BEFORE: both the paper-notebook setups and the app setups are lit the same warm and colourful; the app doesn't feel like a relief.
- AFTER: L02–L05 (world A) — grey paper 555 notebook, neutral top light, accent only on the handwritten "RM?" · L06 "Kalau korang nak tahu untung tiap hari, ni caranya. 3 step je." (world B starts) — the phone screen glows, warm key, bloom on the app UI; accent on "Untung hari ni: RM142" (illustrative).

=== cards/06_Art_Direction/design-first-animate-second--ideas-in-motion-design.md
Topic: nasi lemak cost split (illustrative).
BEFORE: L06 animated straight away; the sambal spoon sits at frame edge, dark on dark, and the price tag overlaps it.
AFTER: still first: spoon moved to ~40 % of frame on the lower third, rim light from the top light lifts it off the
banana leaf, tag placed beside, not over; still passes, then the tag's 0.4 s slide is animated.

=== cards/06_Art_Direction/detail-the-environment-only-when-it-carries-meaning--land-of-the-lustrous-negative-space.md
Topic: a shot of a receipt on a counter (illustrative).
BEFORE: a fully dressed counter (till, bags, other products) even though the line is only about the receipt's
total.
AFTER: frame brief Decision: "object-only: dark surface, no other props — the line is about the number on the
receipt, not the counter."

=== cards/06_Art_Direction/directional-highlight-pops-subject-off-busy-background--sony-animation-goat.md
Topic: a phone screen showing a QR scan beside a cluttered counter background (illustrative).
BEFORE: relying only on shallow DoF to separate the phone from the busy counter behind it.
AFTER: Decision: "key light angled to rim the phone's top edge brighter than the counter behind it, so it reads
first even where the background stays in focus for legibility."

=== cards/06_Art_Direction/duotone-toned-atmosphere-background--saas-explainer-masterclass.md
Topic: a kedai runcit's phone app showing automatic end-of-day cash reconciliation (illustrative).
- BEFORE: the phone UI floats over a flat grey studio background — reads static.
- AFTER: behind the phone, a slow duotone ripple field (dark ink → warung-red accent in the highlights) blooms softly as
  the line "duit masuk automatik" lands, then settles; the field never crosses onto the phone screen itself.

=== cards/06_Art_Direction/emissive-spline-accent-grown-via-start-end-mapping--imperial-3d-animate-tutorial.md
Topic: a kedai runcit's 5 sen plastic-bag charge (numbers illustrative).
BEFORE: the fee just appears as on-screen text next to the register.
AFTER: a thin accent-coloured line grows out of the register slot, across the counter, and lands under the words
"5 sen" exactly as the voice says them — the line IS the fee being tracked, not a decoration next to it.

=== cards/06_Art_Direction/emotional-colour-over-accurate-colour--animated-movies-lighting.md
Topic: "Kenapa stok sayur kedai runcit rosak setiap minggu" (illustrative: 20 kg × RM4/kg = RM80 a week thrown away).
- BEFORE frame brief: "fresh green vegetables under a white light" — the loss beat looks appetising.
- AFTER: Feeling "loss"; Light "dim murky green-grey key #8a9a7a, haze low"; Eye "the wilted bayam"; accent on "RM80 seminggu" in brand colour; logo untouched.

=== cards/06_Art_Direction/empty-vs-filled-twin-framing--juxtaposition-in-film.md
Topic: "Kenapa kedai kek tutup selepas 2 tahun" (illustrative).
- BEFORE: `| 9 | "Sekarang order tinggal 5 sehari" | macro of one cake box |`
- AFTER: `| 3 | "Tahun pertama, 60 order sehari" | top-down counter packed with cake boxes, one box centred in accent | counter 60 | twin A |`
  `| 9 | "Sekarang tinggal 5 sehari" | same top-down pose: only the centred box and 4 others, wide empty counter | counter rolls 60 → 5 | twin B |`

=== cards/06_Art_Direction/environment-as-a-character-with-its-own-feeling--tips-for-drawing-backgrounds.md
Topic: a loan shark's office vs a legit bank counter (illustrative).
BEFORE: both shots use the same neutral dark macro surface.
AFTER: Feeling "risky, cold" → Decision "harder, colder surface reflections, tighter framing" vs Feeling "safe,
orderly" → Decision "cleaner, evenly lit surface, more breathing room".

=== cards/06_Art_Direction/envision-staged-model-one-example-per-stage--explain-anything-clear.md
Topic: where RM10 of a nasi lemak sale goes (illustrative split).
BEFORE: L05 "Bahan RM4, sewa dan gas RM2, gaji RM2, untung RM2." — one spoken list over one static shot.
AFTER: the RM10 note on the banana leaf becomes a 4-band stack, one band per line:
| 5 | "Empat ringgit, bahan." | macro top-down on the note | on "empat": a band slides out, rice + sambal icon on it |
| 6 | "Dua ringgit, sewa dan gas." | 30° lower angle | 2nd band in, first dims |
| 7 | "Dua ringgit, gaji helper." | side angle | 3rd band in |
| 8 | "Tinggal dua ringgit je untuk dia." | top-down, whole stack | last band in accent colour; full stack holds 1 s |

=== cards/06_Art_Direction/establishing-shot-for-a-new-place--shot-sizes-explained.md
Topic: "Sewa tapak pasar malam — RM15 semalam, berbaloi?" (illustrative).
- BEFORE: `| 4 | "Tapak pasar malam" | macro on a canopy pole | — |` (no sense of place).
- AFTER: `| 4 | "Pukul lapan malam, tapak RM15" | EST · high wide over an empty row of canopies under warm bulbs, one tapak marked with chalk "RM15" | camera flies down eased 2 s into the chalk mark; "RM15" in accent | establishing-shot |`

=== cards/06_Art_Direction/everyday-action-slightly-off-concept--100-art-direction-ideas.md
Topic: a small business owner topping up change for the till each morning (illustrative).
BEFORE: a generic shot of coins being poured into a till drawer.
AFTER (one element off): the same pouring motion, same coin sound, but the coins are being poured not into the till —
into a glass jar already overflowing onto the counter, visualising "lebih duit masuk dari laci boleh tampung".

=== cards/06_Art_Direction/exact-angle-compositional-lines--overwatch-dragons-camera.md
Topic: "Satu resit, tiga caj tersembunyi" (illustrative).
- BEFORE: frame brief "Decision: receipt on the counter, camera above" → receipt lies at ~30°, counter edge at ~10°.
- AFTER: "Decision: top-down; receipt rotated to exactly 45°, its lines running bottom-left → top-right; counter edge parallel to the frame bottom (0°); the 'caj servis RM2.40' line in accent at the frame centre."

=== cards/06_Art_Direction/extend-art-direction-across-touchpoints--100-art-direction-ideas.md
Topic: an episode whose hero device is "the invoice tears open to reveal the hidden fee" (illustrative).
BEFORE: the cover still is a generic close-up of the invoice, chosen separately from the episode's visual idea.
AFTER: the cover still IS the torn-open invoice frame mid-reveal, and the caption echoes it ("the bill was hiding
something — swipe to see").

=== cards/06_Art_Direction/f-z-pattern-scan-path-three-flow-check--visual-hierarchy-graphic-design.md
Topic: a how-to step still showing a phone screen, a hand gesture area (no hands per house rule — use a cursor/tap
indicator instead), and a step number (illustrative).
BEFORE: phone screen, step number, and a label are scattered with no scan logic — three-flow check comes back "unclear."
AFTER: laid out Z-pattern — 1st: the phone screen (top-left, biggest), 2nd: the step number (top-right), last: the
label/detail (bottom-right) — three-flow check now answers cleanly.

=== cards/06_Art_Direction/faceted-low-poly-clay-look-decimate-shade-flat--fern-imperial-characters.md
Topic: a kedai runcit's weighing scale, built as a stylized hero prop (illustrative numbers).
BEFORE: smooth, photoreal scale model — reads like stock 3D, no personality.
AFTER: same scale decimated to ~0.2 ratio + Shade Flat — visible facets on the dial and base give it the same
hand-made "clay" read as the reference channels, before the brand accent light hits it.

=== cards/06_Art_Direction/fake-a-practical-implied-by-blocking--invisible-line.md
Topic: a laundromat scene implying another customer is active in the next machine over, off-frame.
BEFORE: nothing suggests the shop is otherwise occupied — the hero machine feels alone in an empty void.
AFTER: a faint light dips and releases from off-frame-left for half a second (as if someone briefly blocked a
neighbouring machine's display light), with no figure built or shown — the shop reads as alive without adding a person.

=== cards/06_Art_Direction/feathered-grid-texture-contained-to-panel--saas-motion-graphics-masterclass.md
Topic: a "senarai belanja" (spending list) UI panel in a budgeting how-to.
- BEFORE: the list panel is flat solid gray with no depth.
- AFTER: a faint 100 px grid sits behind the list at 35% opacity, fading out at the panel's top and bottom edges,
  never touching the list text.

=== cards/06_Art_Direction/figure-ground-contrast-for-high-stress-emphasis--land-of-the-lustrous-negative-space.md
BEFORE: the "scam revealed" line uses the same dark-room-with-bloom look as every other beat.
AFTER: for that one line only, the counterfeit note is shown stark black against a flat white surface (or the
reverse), nothing else in frame.

=== cards/06_Art_Direction/five-point-graphic-design-checklist-for-every-frame--motion-design-principles.md
Topic: a laundromat's new pricing board (illustrative numbers).
BEFORE: a still of the board feels flat and unclear why.
AFTER: 5-point run — hierarchy ✗ (three prices at equal size); contrast ✗ (new price isn't separated from old);
fix: scale the new price up (hierarchy) and desaturate the old price while the new one keeps the accent (contrast).
Balance, negative space and repetition already passed.

=== cards/06_Art_Direction/five-ways-to-animate-the-change--mograph-storytelling-4-plots.md
Topic: a laundromat in Bangi paying for 3 separate payment apps (illustrative).
- BEFORE: the payoff line "Satu QR je, semua masuk" shows a logo and a tick icon.
- AFTER (Merge): row `| 9 | "Satu QR je" | low grazing angle on the counter | 3 phone-stand QR plaques slide together on
  "Satu", merge into one plaque on "QR"; accent glows on the merged plaque |`. Pause test: still shows 3 → 1; readable.

=== cards/06_Art_Direction/flat-map-zooms-into-rotating-globe--motion-explainer-ads-part3.md
Topic: a delivery service that now reaches every state in Malaysia (illustrative generic claim, not a real company's coverage data).
- BEFORE: a static "Malaysia map, all states highlighted" graphic appears.
- AFTER: the flat map zooms in and becomes a slowly spinning globe centred on Malaysia exactly on "seluruh", then zooms
  back out to a flat, readable map with the highlighted states.

=== cards/06_Art_Direction/flat-text-backdrop-radial-grid-grain--ae-text-animation.md
End card for the question "Kedai korang masih ambil cash je?"
- BEFORE: white text on flat #000.
- AFTER: text sits in a soft accent-tinted pool at centre-top, a barely visible 4-row grid, fine grain; reads as the same
  dark room as the 3D setups.

=== cards/06_Art_Direction/foreshadow-off-frame-reveal-with-light-cue--better-way-cinematic-lighting.md
Topic: a parking-app's hidden service fee that only appears at checkout (illustrative numbers).
BEFORE: the fee simply appears on the summary screen with no lead-in.
AFTER: L05 (one setup before) — the summary screen's total number dims slightly at its edge, as if something is about
to be added, no number shown yet; L06 — the hidden "Caj perkhidmatan RM1.20" line snaps into that dimmed spot in the
accent as the voice names it.

=== cards/06_Art_Direction/form-shadow-vs-cast-shadow--rella-lighting.md
Topic: a hero stack of ringgit notes under the Style D top light (illustrative).
BEFORE: "add a dark patch on the left side of the notes" — ambiguous, could be either kind of shadow.
AFTER: "form shadow: the top note's own fold curves away from the key light on its left edge" + "cast shadow: the
coin jar beside it throws a hard-edged shadow across the table, not onto the notes themselves" — two different
raea setups (light angle vs a blocker object), briefed correctly.

=== cards/06_Art_Direction/four-color-gradient-icon-recolor--apple-ui-widget-pop-ups.md
Topic: a kedai runcit's daily sales dashboard (illustrative numbers).
- BEFORE: a downloaded cash-register icon keeps its original green-and-orange stock colours, clashing with the UI.
- AFTER: the icon is remapped to the house white→gray→dark-gray tones before it appears; only the ring around it carries
  the episode's accent (red).

=== cards/06_Art_Direction/four-colour-gradient-background-keyed-to-beat--saas-explainer-masterclass.md
Topic: a kedai runcit tracking daily RM30 float (illustrative amount).
- BEFORE: a flat grey app background sits still behind every line.
- AFTER: on "RM30 sehari", the background's pink gradient stop drifts inward and warms slightly, settling before the
  next line; the colour never darkens enough to dim the on-screen RM30.

=== cards/06_Art_Direction/glow-pulse-on-arrival--apple-ui-widget-pop-ups.md
Topic: a kedai's RM45 monthly subscription fee landing on screen (illustrative amount).
- BEFORE: "RM45" sits with a constant soft glow behind it the whole shot.
- AFTER: "RM45" has zero glow, then pulses to a faint bloom the instant the digits finish counting on "sebulan", and
  fades back to flat within half a second.

=== cards/06_Art_Direction/gradient-tendril-connector-line-with-stacked-glow--saas-motion-graphics-masterclass.md
Topic: one "resit" (receipt) icon links out to three things it proves — harga, GST, tarikh (illustrative figures).
- BEFORE: three labels just appear next to the receipt with no visual link.
- AFTER: on "bukti ada tiga", three muted-accent gradient tendrils draw outward from the receipt's edge over ~0.6 s
  each, a soft bloom sitting under each line, landing on "harga", "GST" and "tarikh" as they label in.

=== cards/06_Art_Direction/grid-spill-control-keeps-dark-backdrop-black--creative-lighting-setups-portrait.md
BEFORE: a dark backdrop shows a visible lighter patch near the hero's base.
AFTER: `outer_angle` narrowed until the backdrop near the base reads flat black again.

=== cards/06_Art_Direction/haze-not-blur-for-atmospheric-depth--sony-animation-goat.md
Topic: a wide establishing shot of a row of shoplots (illustrative).
BEFORE: distant shoplots thrown out of focus to show depth, losing their signage.
AFTER: Decision: "all shoplots kept in focus; distance signalled by increasing fog density toward the back, so
signage stays legible while depth still reads."

=== cards/06_Art_Direction/hero-product-shots-carry-the-film--apple-commercial-breakdown.md
Topic: "Terima QR di gerai: duit masuk terus" (how-to; DuitNow QR is a real Malaysian standard).
- BEFORE: 11 setups, all story (stall, customer phone, receipts); the QR standee only appears blurred in two.
- AFTER: row 1 `| 1 | frame-0 text | HERO: macro of the stall's QR standee on the counter, one strip reflection across the acrylic, logo sharp | reflection slides across over 1.2 s eased | hero-product-shots |` and row 10 `| 10 | "RM30 sehari tak payah cari duit kecil" (illustrative) | HERO: same standee, low angle, accent on the QR frame | RM30 counts up beside it | hero-product-shots |`.

=== cards/06_Art_Direction/hollow-glow-ring-inverted-alpha-duplicate--saas-motion-graphics-masterclass.md
Topic: "RM50" sits inside a glowing ring instead of a solid glowing circle, in a savings-goal how-to.
- BEFORE: a filled glowing orb with "RM50" written over it (hard to read against the glow).
- AFTER: the glow is hollowed into a thin ring; "RM50" sits legibly in the dark centre, framed by the soft ring.

=== cards/06_Art_Direction/hook-withhold-the-reveal-question--three-act-structure.md
Topic: why a RM1 kuih costs a stall more than RM1 to make (illustrative).
- BEFORE: frame 0 = the whole kuih on a plate, centred, static.
- AFTER: frame 0 = extreme macro of a banana-leaf fold, slowly unwrapping, the stall's logo on the tray edge; on
  "sebiji" (L02) the camera pulls out to show one kuih and a tiny receipt "kos RM1.10".

=== cards/06_Art_Direction/horizon-line-height-sets-the-storytelling--tips-for-drawing-backgrounds.md
BEFORE: an establishing shot of a row of shoplots picked at an arbitrary camera height.
AFTER: Decision: "low horizon (camera near ground) so the shoplots feel tall and the street recedes dramatically,
matching the line's 'this used to be a whole street of them'."

=== cards/06_Art_Direction/human-scale-box-camera-only-blockout--3d-blockout-ai-concept.md
Topic: blocking a macro hero prop (a drink can) against a kedai runcit shelf background (illustrative).
BEFORE: scale the shelf and can by guesswork, discover in the board check that the can reads too large/small for a human hand.
AFTER: a human-height reference box is placed once, the can and shelf are scaled against it by eye, and only the
shelf face visible to the macro camera is built — the back and sides of the shelf are left unmodelled.

=== cards/06_Art_Direction/hundred-eighty-degree-line--overwatch-dragons-camera.md
Topic: "Bayar tunai vs QR — mana lagi murah untuk peniaga" (illustrative fees).
- BEFORE: `| 3 | cash tin left, QR stand right |` → `| 5 | reverse angle: QR stand now left |` (viewers confuse which is which)
- AFTER: `| 3 | "Tunai kiri, QR kanan" | wide low angle, cash tin left, QR stand right | labels fade in | hundred-eighty-degree-line |`
  `| 5 | "QR caj 0.5 % (illustrative)" | close on the QR stand, camera still on the front side, stand stays screen-right | "0.5 %" tag fades in | hundred-eighty-degree-line |`

=== cards/06_Art_Direction/if-not-important-not-there--writing-for-motion-design.md
Topic: a laundry shop's per-kg pricing (illustrative).
BEFORE: Setup "Inside a laundry shop, customer at counter, machines, posters, plants."
AFTER: Setup "macro, three-quarter top: digital scale reading 3.0 kg (hero); folded towel stack on it; price card
'RM4/kg' at the edge, out of focus." Nothing else in frame.

=== cards/06_Art_Direction/incremental-silhouette-building-re-evaluate--3d-blockout-ai-concept.md
Topic: dressing a construction-site backdrop behind a hero hand-truck prop (illustrative).
BEFORE: all clutter (bins, barriers, debris) placed in one pass, then the whole frame judged once at the end.
AFTER: barriers placed first and checked (verdict: reads too empty still) → bins added, checked (verdict: ground
level now reads busy) → a single overturned crate added leaning into a barrier, checked (verdict: adds the "messy"
feel the line needs) — each addition evaluated before the next.

=== cards/06_Art_Direction/infinite-colour-cycling-gradient-blob--motion-explainer-3-scenes-part2.md
Topic: a title card opening an episode about a kedai runcit's daily float.
- BEFORE: a flat dark background sits still under the hook text.
- AFTER: a slow accent-coloured glow drifts behind the hook text, never settling, never distracting from the text itself.

=== cards/06_Art_Direction/ingredients-framework-two-to-three-per-concept--art-direction-ingredients.md
Topic: a kedai runcit's expired-stock shrinkage (numbers illustrative).
BEFORE "Not generic because": "it feels urgent and relatable."
AFTER: "(1) the expiry-date sticker peeling off in macro — the one prop that is the whole idea; (2) brand accent only on
the loss number, nothing else lit warm; (3) the shelf gets visibly emptier each cut, no other change." Three ingredients,
each doing real work; everything else (camera, room, grade) stays the house default.

=== cards/06_Art_Direction/insert-ecu-isolates-the-crucial-detail--shot-sizes-explained.md
Topic: "Tarikh luput vs 'best before'" (generic labels; no regulation claims).
- BEFORE: `| 5 | "Tengok tarikh kat tin" | MS of a tin on a shelf | — |`
- AFTER: `| 5 | "Tengok **tarikh** kat bawah tin" | ECU · embossed date on the tin's base, raking light | date edge lit accent on "tarikh", 1.5 s | insert-ecu |`

=== cards/06_Art_Direction/insert-shot-bomb-under-the-table--framing-every-shot-wrong.md
Topic: a small clinic's consultation fee goes up by RM5 (illustrative numbers).
BEFORE: the fee is simply stated by the voice over a wide shot of the clinic counter.
AFTER: L02 — insert, tight on the printed fee card with the old number still showing, held a beat longer than the
line ("plants: why show us this card now?"); L07 — the same card's number updates to the new fee in the accent
("pays off L02's insert").

=== cards/06_Art_Direction/intellectual-montage-concept-from-two-images--juxtaposition-in-film.md
Topic: "Bila satu pembekal naik harga, semua kedai kena" (illustrative).
- AFTER: `| 6 | "Satu pembekal naik harga…" | macro supplier invoice, +RM0.20 per unit in accent |` → `| 7 | "…macam domino" | row of dominoes on the same counter, the first one marked +RM0.20 tips the rest | tips on "domino" |` → `| 8 | "Kedai runcit, gerai, kafe — semua naik RM0.20" | back to the invoice, 3 shop tags appear |`

=== cards/06_Art_Direction/jello-skin-material-transmission-sss--fern-imperial-characters.md
Topic: a bar of handmade soap as the hero macro object for a small-business episode (illustrative).
BEFORE: a flat opaque `StandardMaterial` — reads like plastic, no softness.
AFTER: transmission raised and a subsurface pass added so the soap's edges glow softly under the top light,
reinforcing the "handmade" feel the line is making.

=== cards/06_Art_Direction/let-it-brew-gap-between-research-and-design--ideas-in-motion-design.md
Topic: car wash pricing (illustrative).
BEFORE: research, script, shot list and frame briefs in one sitting; the frame briefs repeat the first ideas.
AFTER: Mon: claim ledger + outline; parking list gains "foam rising like a bar chart" overnight; Tue: frame briefs start
from the parking list; L07's foam-chart setup replaces a generic counter.

=== cards/06_Art_Direction/letter-by-letter-fill-wipe-logo-reveal--apple-style-ui-ad.md
Topic: Meikigo end card closing an episode (real brand wordmark).
- BEFORE: the logo fades in flat and whole — no sense of being built.
- AFTER: each letter of "Meikigo" fills bottom-up in the brand accent, one letter settling just before the next starts,
  landing on the loop-back to frame 0's object exactly as the last letter completes.

=== cards/06_Art_Direction/light-color-shift-tied-to-story-beat--fern-3d-edits.md
Topic: a tuition centre's "hidden registration fee" reveal (illustrative).
BEFORE: the light stays constant through the whole shot; only the camera push signals the reveal.
AFTER: as the camera arrives on the fee line, the light dims from its full read down to a tighter, dimmer pool — same
accent colour throughout — landing exactly on the word "RM200 tambahan".

=== cards/06_Art_Direction/light-the-gap-not-the-window--invisible-line.md
Topic: a tailor shop's single shopfront window as the only daylight source in an interior beat.
BEFORE: a light rigged directly behind the window, aimed straight through — the window blows out white, the interior
reads flat.
AFTER: the light moved beside the window frame, shining across past it — the window itself stays a soft, readable
rectangle of daylight, while the bounce gives the sewing machine on the counter a believable soft edge-light.

=== cards/06_Art_Direction/liquid-glass-refraction-recipe--animate-like-apple.md
Topic: a "Bayar" pill floating over a kedai runcit receipt before paying RM12.80 (illustrative amount).
- BEFORE: a flat green "Bayar" button sits on top of the receipt.
- AFTER: the pill is glass — the receipt's lines bend faintly through it, a thin white rim catches the one top light,
  and a soft shadow sits under it on the paper; on "tekan" the pill presses down 1–2 % and the glass briefly flattens.

=== cards/06_Art_Direction/literalization-vs-abstraction-per-line--writing-for-motion-design.md
Topic: expired stock at a kedai runcit (illustrative).
L06 "Kedai ni buang RM2,000 barang expired sebulan."
BEFORE [ABS]: banknotes melting into a drain.
AFTER [LIT]: macro over a bin: yoghurt cups and bread loaves with dated labels slide in one by one; a counter on the bin
rim climbs RM0 → RM2,000 on "RM2,000". L07 joins by flying the camera from the bin label to the shelf-date label of the
next line.

=== cards/06_Art_Direction/location-scout-the-built-world--storyboarding-masterclass.md
Frame brief BEFORE: `Idea: show the coin piling. Decision: front view, mid shot.`
AFTER (kedai runcit savings how-to): `Ref: scout_04_b. Idea: daily RM5 savings piling into RM150 by month end (5 × 30).
Decision: angle b, lens at coin height looking up the stack against the dark room — the stack grows past the top of
frame on "seratus lima puluh". Moves: stack moved 4 cm left so the jar rim frames it; growth slowed to 0.4 s per coin.`

=== cards/06_Art_Direction/logo-shine-sweep-one-off-brand-beat--saas-explainer-masterclass.md
Topic: Meikigo logo settling at the end of a "how korang boleh check resit" how-to.
- BEFORE: the logo sits still with no flourish once it lands.
- AFTER: once settled, one soft diagonal sweep crosses the logo over ~0.5 s and stops — no repeat, no use as a cut.

=== cards/06_Art_Direction/master-then-isolate-the-one-that-breaks--shot-sizes-explained.md
Topic: "Satu kos kecil yang makan untung kedai" (illustrative monthly costs).
- BEFORE: a list graphic of costs.
- AFTER: `| 6 | "Sewa, bil, gaji — semua dah kira" | master · five labelled jars on a shelf in a row | each jar label lights on its word |` → `| 7 | "Tapi **langganan app** RM180 sebulan…" | MCU · that one jar alone at frame right, empty shelf left | jar label turns accent red on "langganan app" |`

=== cards/06_Art_Direction/match-fill-light-color-temp-to-ambient--obsession-lighting-recreation.md
Topic: a daytime kedai runcit window display (illustrative).
BEFORE: fill light left at a neutral white default, visibly bluer than the rest of the shot.
AFTER: fill set to ~5600K to match the daylight through the shopfront window; frame brief Decision: "fill: small
RectLight, ~5600K to match the window daylight, 1/5 key intensity."

=== cards/06_Art_Direction/mcu-action-and-result-in-one-frame--shot-sizes-explained.md
Topic: "Tap kad kat terminal — kenapa kadang-kadang minta PIN" (generic: shows the PIN prompt; no limit values claimed).
- BEFORE: CU card tap → cut → CU screen.
- AFTER: `| 6 | "Tap… tapi skrin minta PIN" | MCU · card corner touching the terminal, screen in the top of frame | card taps on "tap"; screen changes to "Masukkan PIN" on "PIN", accent outline |`

=== cards/06_Art_Direction/medium-shot-object-plus-context--shot-sizes-explained.md
Topic: "Timbang sayur — kenapa harga lain kat kaunter" (tare/plastic weight arithmetic, illustrative: 1.02 kg vs 1.00 kg at RM5/kg).
- BEFORE: ECU on the scale display only.
- AFTER: `| 5 | "Plastik pun kena timbang" | MS · scale with a bag of sawi and the price card beside it | display shows 1.02 kg, plastic bag edge in accent on "plastik" |`

=== cards/06_Art_Direction/motif-hunt-in-the-subjects-own-material--ideas-in-motion-design.md
Topic: a kedai runcit's daily takings (illustrative).
BEFORE: setups unrelated: shelf, till, phone app, chart; joined by fades.
AFTER: motif = **lines**: shelf rows (L02) → barcode bars on a tin (L04, camera pushes into the bars) → receipt lines
printing (L06) → the receipt lines rise into a bar chart of the week (L08) → back to shelf rows (L11 loop).

=== cards/06_Art_Direction/motion-match-subject-swap-for-meaning--animation-technique-guide.md
Topic: "Dari tin duit syiling ke QR — gerai makin laju" (no fee claims).
- BEFORE: `| 3 | "Dulu bayar guna syiling" | coins in a tin | — |` cut `| 4 | "Sekarang scan je" | phone showing QR | — |`
- AFTER: `| 3 | "Dulu bayar guna syiling" | macro on a coin tilting up-left out of a tin | coin rises up-left, 2 frames before the cut it flattens and turns black-and-white like a QR tile | motion-match-subject-swap |`
  `| 4 | "Sekarang **scan** je" | macro on the QR stand at the same screen spot | the QR tile continues up-left and lands into the stand's code on "scan"; accent on the scan frame | motion-match-subject-swap |`

=== cards/06_Art_Direction/music-as-nonvisual-ingredient-for-recall--art-direction-ingredients.md
Topic: a laundromat's hidden per-wash fee.
BEFORE: generic light "mood" music bed under the whole video.
AFTER: silence through the build (so the coin-drop SFX reads clearly), then the one signature Meikigo sound only on
the outro logo beat — the recall moment, not spent elsewhere.

=== cards/06_Art_Direction/named-lighting-scenario-checklist--rella-lighting.md
Topic: a night-market stall's hero lantern, built as a "stage/rim" scenario (illustrative).
BEFORE: generic soft top light with no named mood — reads flat, no drama.
AFTER: background dropped near-black, one thin rim light behind the lantern catching its edge, any steam/smoke
particles passing through it lit up — named "stage/rim," built to a 3-item checklist instead of eyeballed.

=== cards/06_Art_Direction/negative-fill-to-carve-contrast--obsession-lighting-recreation.md
BEFORE: a product shot where ambient bounce off the macro surface fills in both sides evenly, reading flat.
AFTER: frame brief Decision adds "neg: a dark card out of frame on camera-left blocks the surface bounce, keeping
that side at the reference's contrast."

=== cards/06_Art_Direction/negative-space-sets-the-feeling--look-like-movies.md
Topic: "Gerai kecil lawan francais besar: macam mana nak hidup" (illustrative).
- BEFORE frame brief: Decision "medium shot of the gerai's tray of kuih, centred, filling 55 %".
- AFTER: Feeling "crushed"; Decision "the tray sits low (bottom third, above captions) at ~28 % height; a huge dark empty area above, the chain's lit sign far off as a blur at the top edge"; Eye "the tray, then RM1 per piece (illustrative) in accent".

=== cards/06_Art_Direction/non-obvious-reference-for-lighting-key--sony-animated-masterpieces.md
Topic: a 24-hour mamak stall counter at night.
BEFORE: lit like every other "night market" render (warm bulbs, busy background).
AFTER ref: borrowed the lighting quality of a jewellery product shot (single hard beam, near-black background,
everything else starved of light) applied to the stall counter — the RM coins on the counter read like product
photography, not like a generic night scene.

=== cards/06_Art_Direction/odd-object-count-centered-focal-group--visual-hierarchy-graphic-design.md
Topic: a "5 customers walked past, 1 bought" counter visualisation outside a stall (illustrative numbers, kept real to the claim).
BEFORE: five identical customer icons scattered unevenly across the frame — no clear focal point.
AFTER: the five icons (odd count, matching the real number) are arranged with the one who bought centred and
slightly larger, two smaller icons mirrored on each side — an automatic focal point with no extra colour needed.

=== cards/06_Art_Direction/one-added-thing-minimum-viable-art-direction--100-art-direction-ideas.md
Topic: a laundromat's RM0.50 dryer-minute fee (illustrative).
BEFORE: a generic macro shot of a coin slot on a dryer.
AFTER (one thing added): the coin is mid-drop, caught exactly at the slot's edge, with the accent-coloured digital
timer already ticking down behind it — one addition (the suspended coin) turns a plain coin-slot shot into a shot
about time literally draining with the coin.

=== cards/06_Art_Direction/one-central-picture-three-words--mograph-storytelling-4-plots.md
Topic: why a small bakery's RM3 croissant barely profits (illustrative).
- BEFORE: setups jump between an oven, a rent invoice, a delivery rider, a butter block, a phone app.
- AFTER: central picture "one croissant, sliced". Butter cost = the croissant x-rayed; rent = croissant on a tiny shop
  floor plan; delivery cut = a slice pulled away; end question back on the whole croissant.

=== cards/06_Art_Direction/one-focal-point-centred-for-fast-cuts--look-like-movies.md
Topic: "Kalau korang nak buka akaun simpanan anak, ni caranya. 4 step je." (how-to; illustrative amounts).
- BEFORE: L03 MyKid card at lower-left third; L04 bank app button at upper-right; L05 RM50 note centre-left — the eye hunts every 2.5 s.
- AFTER: `| 3 | "Step 1: bawa MyKid" | macro MyKid card, focal: card chip @ centre | card slides in 0.4 s | one-focal-point |` · `| 4 | "Step 2: isi borang" | form on counter, focal: the signature box @ centre | pen line draws | one-focal-point |` · `| 5 | "Step 3: masuk RM50" (illustrative) | RM50 note, focal: the '50' @ centre | note settles, accent on 50 | one-focal-point |`.

=== cards/06_Art_Direction/one-hex-monochrome-world--johnny-harris-3d-soldiers.md
BEFORE: `Idea: show the RM2 bubble tea markup. Decision: full colourful shop counter.`
AFTER (bubble tea kiosk, illustrative): `Idea: of the RM8 cup, only ~RM2 is ingredients. Decision: on "bahan", every
object on the counter drains to one flat grey over 0.4 s; only the tapioca pearls and milk tea stay in the accent; a
counter reads RM2. Not generic because: the colour itself does the subtraction.`

=== cards/06_Art_Direction/one-point-of-interest-hierarchy--eye-catching-3d-scenes.md
Topic: a barbershop's loyalty-stamp card (illustrative numbers).
BEFORE: the stamp card, a mirror, and a row of scissors all lit and in focus at once — no single read.
AFTER: the stamp card stays sharp, bright, centred; scissors and mirror sit soft, dim, at the frame edges, out of
focus — the eye lands on the card first, every time.

=== cards/06_Art_Direction/orbiting-pair-blocking-tension--directing-without-words.md
Topic: 1 kg rice bag vs 5 kg rice bag per kilo (illustrative).
BEFORE: split screen, two bags, a "VS" graphic.
AFTER: L04 "Beras 1 kilo RM3.60. Beras 5 kilo RM15." Both bags on a kedai counter, camera orbits 90° over 3 s, bags
slide closer, the shelf behind turns into view. L05 "Sekilo, RM3 je." on "RM3" the 5 kg bag's tag lights accent, the
1 kg bag dims.

=== cards/06_Art_Direction/organic-light-orb-from-displaced-shapes--saas-motion-graphics-masterclass.md
Topic: a chatbot "thinking" beat before giving a tip on splitting a RM50 bill three ways (illustrative amount).
- BEFORE: a generic spinning-circle loader.
- AFTER: a small accent-coloured orb grows in from a dot and pulses gently in time with the voice line, its surface
  subtly uneven rather than a perfect sphere, before the answer appears.

=== cards/06_Art_Direction/out-of-genre-mood-board--motion-design-really-made.md
BEFORE: mood board = 6 other finance TikToks.
AFTER (kedai runcit cashflow episode): film still of a late-night counter lit by one bulb (trait: single top light pool);
a 1960s Malaysian product poster (trait: one saturated red against cream); a magazine spread of a receipt shot macro
(trait: paper texture at 1:1 scale); one explainer (trait: counter that ticks on the word).

=== cards/06_Art_Direction/oversized-undersized-product-recurring-bit--100-art-direction-ideas.md
Topic: a convenience store's small single-use sachet pricing adding up over a month (illustrative).
BEFORE: the sachet sits at normal size next to a running total counter.
AFTER: on the line "sebulan jadi RM60", the same plain sachet swells to fill the frame — oversized, same object, same
accent colour — making the invisible monthly total suddenly physically large.

=== cards/06_Art_Direction/paint-over-compositing-blend-2d-3d-seams--japanese-studios-cg.md
Topic: a flat-shaded 3D coin prop composited against a hand-illustrated kedai runcit backdrop (illustrative).
BEFORE: the coin's CG surface reads noticeably cleaner/flatter than the painted backdrop around it — the seam is visible.
AFTER: a subtle paper-grain overlay at low opacity is composited over the whole frame (coin and backdrop alike),
pulling both into the same tactile register.

=== cards/06_Art_Direction/per-garment-hsv-recolor-duplicate-nodes--fern-imperial-characters.md
Topic: a row of identical plastic chairs outside a kedai kopi, one marked "reserved" (illustrative).
BEFORE: all chairs share one grey material; recolouring it turns every chair the same new colour.
AFTER: the reserved chair's material is duplicated and pushed through a Hue/Saturation/Value node to the brand
accent; the rest stay the shared neutral grey — one accent, on the one chair the line is about.

=== cards/06_Art_Direction/persistent-colour-symbol-motif-tied-to-theme--sony-animated-masterpieces.md
Topic: a phone instalment plan's hidden total interest (numbers illustrative).
BEFORE: accent colour used loosely — sometimes the brand logo, sometimes the price, sometimes a highlight.
AFTER: the accent colour appears on exactly one thing across all 11 setups — the real total once it's revealed (first
hidden, grey; then it pops in accent colour the moment the true RM4,200 appears) — so by setup 6, the viewer's eye
jumps to the accent colour the instant it appears, expecting the catch.

=== cards/06_Art_Direction/plan-motivated-light-across-a-sequence--better-way-cinematic-lighting.md
Topic: a kedai runcit's hidden extra charge on a receipt (illustrative numbers).
BEFORE: L04 (receipt close-up) lit flat and even because "that's what the object needs" in isolation.
AFTER: light plan written above L04–L06 — "L04–L05 keep the extra line dim/unlit (the viewer hasn't noticed it yet);
L06's key swings onto that one line as the voice says the number, in the accent." L04 on its own now looks
under-lit, but it is correct because it is part of the planned L04–L06 reveal.

=== cards/06_Art_Direction/playground-metaphor-three-tests--mograph-storytelling-4-plots.md
Line (a metaphor in the script): "Ansuran BNPL ni macam kereta api — satu gerabak tambah, tak nampak hujung."
- BEFORE: generic credit-card icons multiplying.
- AFTER: a toy train on a kitchen table; each RM50 instalment hooks on a carriage (known rules: carriages couple; lasts:
  every later setup adds carriages; change: on "berhenti" the train halts and the carriages count up — 6 × RM50 = RM300).
  End question: "Berapa gerabak korang tengah tarik?"

=== cards/06_Art_Direction/post-production-concealment-pixelation-storytelling--100-art-direction-ideas.md
Topic: a mechanic's hidden "extra parts" line item on a repair bill (illustrative).
BEFORE: the full repair bill is shown clearly from the first frame.
AFTER: the bill is shown with one line pixelated from the start; on the words "ada caj tersembunyi", the pixelation
clears to reveal the hidden charge.

=== cards/06_Art_Direction/posterize-gradient-map-range-stepped--pick-colors-blender.md
Topic: a "before/after" savings bar chart fill for a kedai runcit's monthly cost (illustrative numbers).
BEFORE: a smooth gradient fill behind the bar — reads soft, photographic, competes with the sharp data line.
AFTER: the same hues posterized into 4–5 flat bands — reads as a graphic/infographic element, matching the chart's flat data style instead of fighting it.

=== cards/06_Art_Direction/procedural-sky-as-sole-key-light--imperial-3d-animate-tutorial.md
Topic: an outdoor establishing shot of a warung before the macro cutaway (illustrative framing only).
BEFORE: three separate lights are placed and balanced by eye to fake daylight.
AFTER: one angled DirectionalLight stands in for "the sky"; rotating it alone resets the whole shot's shadows and mood.

=== cards/06_Art_Direction/product-in-uncommon-context-staging--100-art-direction-ideas.md
Topic: a nail salon's cuticle oil (illustrative).
BEFORE: the oil bottle sits on a plain marble counter, lit softly.
AFTER: the same bottle sits balanced on a cracked terracotta roof tile — no logical connection, but the tile's rough
orange-red texture against the bottle's clean glass makes the product read as premium and tactile.

=== cards/06_Art_Direction/prop-pair-juxtaposition--juxtaposition-in-film.md
Topic: "Barang sama, harga beza — kenapa?" (illustrative).
- BEFORE: `| 2 | "Sabun ni RM4.90 kat sini, RM6.50 kat sana" | macro of one soap bar | price tag counts |`
- AFTER: `| 2 | "Sabun ni RM4.90 kat sini, RM6.50 kat sana" | two identical soap bars side by side on a counter, top-down 45° | tags fade in one after the other on "RM4.90" and "RM6.50"; accent only on RM6.50 | prop-pair-juxtaposition |`

=== cards/06_Art_Direction/proxemics-distance-to-emotional-closeness--framing-every-shot-wrong.md
Topic: a hawker finds out his rent went up (illustrative numbers).
BEFORE: every setup framed at a comfortable medium distance regardless of the line.
AFTER: shot-list — L03 "intimate: macro on the rent notice's new number, filling frame" (the gut-punch line);
L06 "social: pulled back to the whole stall with the notice small in it" (the line that steps back to the bigger picture).

=== cards/06_Art_Direction/punchy-gradient-dark-light-stops--pick-colors-blender.md
Topic: a chart background behind "sebulan RM450" — the monthly plastic-bag cost total for a kedai runcit (illustrative numbers).
BEFORE: a flat blue-to-brand-accent gradient fill behind the number — reads muddy, doesn't separate from the number on top.
AFTER: the same two hues with a near-black and near-white stop inserted between them — the fill now has a visible
"highlight" band the RM450 can sit inside, without adding any extra light or object.

=== cards/06_Art_Direction/push-speed-changes-the-insert-meaning--framing-every-shot-wrong.md
Topic: a small business owner checks the bank app and sees an unexpected deduction (illustrative numbers).
BEFORE: a single medium shot of the phone, camera static, for both the lead-up and the reveal.
AFTER: shot-list — L04 "push-in (dread): camera eases slowly toward the balance line as the voice trails off";
L05 "hard cut (shock): straight to the deduction line in the accent, no move."

=== cards/06_Art_Direction/recurring-motif-as-brand-trademark--100-art-direction-ideas.md
Topic series: several "fee breakdown" how-to episodes (illustrative).
BEFORE: each episode invents its own way to show a fee being deducted — one draws it as a bar chart, another as falling coins, with no connection between them.
AFTER: the series commits to one motif — every fee always drains visibly out of the real object it comes from (coin
slot, receipt total, phone balance) — and each new episode's frame brief says "fee-drain motif, as in EX20" instead of
reinventing it.

=== cards/06_Art_Direction/repeating-shape-language-per-world--tips-for-drawing-backgrounds.md
Topic: an episode contrasting a modern mall kiosk vs a traditional pasar stall (illustrative).
BEFORE: both locations use the same prop shapes.
AFTER: Decision for mall setups: "rectilinear, straight edges throughout"; Decision for pasar setups: "rounded
baskets, curved awning lines throughout" — the two worlds read as different places at a glance.

=== cards/06_Art_Direction/reverse-engineer-lit-reference-from-visual-clues--obsession-lighting-recreation.md
Topic: a kedai runcit's night counter, closing-up (illustrative).
BEFORE: "add a key light, plus some fill" with no reasoning written down.
AFTER `ref_<shot>.md`: "light clues: receipt-paper glare on the counter top-right → a hard source off-frame right at
~45°; the till screen glow lights the cashier's chin from below → a small coloured practical, not the key. Lights,
build order: 1) key = SpotLight stand-in for the off-frame hard source, dialed until the counter matches reference
exposure; 2) chin fill = small warm PointLight at the till-screen height, ~1/6 the key's intensity."

=== cards/06_Art_Direction/rgb-bounce-backdrop-gradient-without-printed-paper--creative-lighting-setups-portrait.md
BEFORE: a plain flat dark backdrop behind a product shot.
AFTER: frame brief Decision: "backdrop: one small light bounces low-intensity brand-accent colour onto the lower
third of the dark backdrop; the rest stays neutral/black — not a two-colour gradient."

=== cards/06_Art_Direction/rgb-curves-palette-discovery--better-way-to-colour.md
Topic: "Kedai kopi kecil: berapa cawan sehari untuk tutup sewa" (illustrative: RM2,400 rent ÷ RM3 margin ÷ 30 days ≈ 27 cups a day).
- BEFORE ref palette: "brown, cream, coffee colours" (generic).
- AFTER: greyscale still of the cup → curves try 2 (red lifted in shadows, blue lifted in highlights) → ref_03.md palette: shadow `#1d1416` (room), mid `#6b5a55` (counter), highlight `#e9e4ea` (cup rim), accent `<brand>` on "27 cawan" only.

=== cards/06_Art_Direction/rough-pairing-board-sketches--ideas-in-motion-design.md
Topic: QR payments at a gerai.
BEFORE: one ref per setup chosen in isolation.
AFTER: on the board, a top-down shot of a laminated QR stand sits beside a phone-camera viewfinder image → idea: L04
camera starts top-down on the stand, the phone frame slides over it and the QR squares snap into the viewfinder grid
(transition from scene objects). Promoted to the L04→L05 frame brief.

=== cards/06_Art_Direction/same-place-relit-for-mood-shift--animated-movies-lighting.md
Topic: "Kedai dobi layan diri: kenapa mesin kosong waktu siang" (illustrative).
- BEFORE: L02 and L10 are different shots (empty machines; then a busy shop wide).
- AFTER: `| 2 | "Siang, 10 mesin, 1 je jalan" | macro row of washer doors, flat cool overhead light #dfe8ff | the one running drum turns | same-place-relit |` … `| 10 | "Promo RM5 waktu siang, 6 mesin jalan" (illustrative) | identical framing, warm low side light #ffe2c0 through the shop front, soft long shadows | drums start one by one, RM5 in accent | same-place-relit |`.

=== cards/06_Art_Direction/saturation-matrix-highlight-shadow-mood--how-colors-change-lighting.md
Topic: a kedai runcit owner finds out her supplier quietly raised prices (illustrative numbers).
BEFORE: standard key + fill, no saturation decision — the reveal reads flat.
AFTER: Feeling "dramatic" → desaturate the invoice's lit face, push saturation into the shadow under it; the one
accent (the new price in red) stays fully saturated and is now the only saturated thing in frame, so it reads instantly.

=== cards/06_Art_Direction/scenario-transplant-method--100-art-direction-ideas.md
Reference: a jewelry brand's product shot with the model's head emerging through a torn paper hole.
Topic: a workshop's hidden extra labour cost (illustrative).
- Ref: the torn-hole emergence shot.
- Idea (abstracted): something ordinary emerges unexpectedly through a surface that shouldn't open.
- Decision: the invoice itself tears open from inside, and the hidden labour-cost line pokes through the paper.

=== cards/06_Art_Direction/seven-tools-one-point-stack-check--look-like-movies.md
Topic: "Kalau korang nak tahu duit QR dah masuk, ni caranya. 3 step je." (how-to; DuitNow QR is real).
- BEFORE board still: phone on the counter showing the notification; a bright kuih tray in the corner; counter edge runs off to the right.
- AFTER check: P ✓ (notification) · L ✗ counter edge leads away → camera rotated so the edge points at the phone · S ✓ · B ✗ tray outweighs → tray darkened · F ✓ (phone bezel frames the text) · D ✓ · Li ✓ accent on "RM12.50 diterima" (illustrative) · squint ✓ phone screen first.

=== cards/06_Art_Direction/shape-anchor-match-cut--mastering-match-cut.md
Topic: "Satu syiling 10 sen sehari, setahun?" (10 × 365 = RM36.50).
- BEFORE: a chart → cut → a coin on a table.
- AFTER: a round pie-chart slice-ring at centre 38 % width on "setahun"; cut to a macro 10 sen coin at the same centre and size; camera pulls back to show 365 coins in rows, "RM36.50" in accent.

=== cards/06_Art_Direction/shape-hierarchy-light-direction-before-detail--rella-lighting.md
Topic: a hero stack of RM coins catching the one top light (illustrative).
BEFORE: build the coin texture/engraving detail first, then try to find a light that makes it all read.
AFTER: block the big light/shadow split across the stack first (which side is lit, which falls into shadow) and
confirm it reads on a still — only then add the small highlight catching each coin's edge.

=== cards/06_Art_Direction/shift-key-source-to-shift-narrative-focus--better-way-cinematic-lighting.md
Topic: a customer checks a QR payment total against the cashier's handwritten total (illustrative numbers).
BEFORE: both the phone screen and the receipt lit evenly; no clear "what matters now."
AFTER: Decision — "L03 keys the receipt's desk lamp (line: 'kertas kata RM12')"; "L04 keys the phone's own screen glow
instead (line: 'tapi app kata RM15')" — the same two light sources, re-ranked per line, without adding a new light.

=== cards/06_Art_Direction/shoot-from-the-shadow-side-of-the-light--invisible-line.md
Topic: a hawker stall's weighing scale lit by one hanging bulb (illustrative numbers).
BEFORE: camera placed directly between the bulb and the scale, looking toward the bulb — the scale reads flat, no
depth to the numbers on its dial.
AFTER: camera moved to the opposite side of the scale, now looking past it into the bulb's shadow — the dial's
engraved numbers pick up visible edge shadow, reading as a real dimensional object instead of a flat graphic.

=== cards/06_Art_Direction/shoot-through-foreground-to-frame-the-subject--tips-for-drawing-backgrounds.md
BEFORE: an open, unframed wide shot of a shuttered shop.
AFTER: Decision: "shoot through a blurred stack of unsold stock in the foreground, camera-left, framing the
shuttered sign in the clear two-thirds of frame."

=== cards/06_Art_Direction/size-contrast-juxtaposition--juxtaposition-in-film.md
Topic: "Kedai runcit vs hypermarket sebelah" (illustrative).
- BEFORE: `| 5 | "Kedai kecil ni untung RM40 sehari" | macro of the small shop model alone |`
- AFTER: `| 5 | "Kedai kecil ni untung RM40 sehari…" | low macro beside a small lit shop model abutting a wall-sized dark box (the hypermarket), 5× taller | "RM40" fades in over the small shop | size-contrast-juxtaposition |`

=== cards/06_Art_Direction/small-change-in-close-up-carries-the-beat--directing-without-words.md
Topic: a kedai makan's electricity bill after adding a second freezer (illustrative).
BEFORE row: "Wide of the kedai, bill appears, numbers fly in, arrows, freezer, icons."
AFTER rows: L05 "Bil bulan lepas: RM480." (wide on the bill on the counter) → L06 "Bulan ni…" macro on the bill's total;
on "RM720" only the first digit rolls 4 → 7 in accent; hold 0.8 s.

=== cards/06_Art_Direction/sound-off-decide-what-leads--writing-for-motion-design.md
Topic: hidden cost of free delivery for a kedai (illustrative).
BEFORE: L05 voice "Penghantaran percuma tu kos kedai RM6 setiap order." Picture: generic van icon.
AFTER: Concept: "every 'free' has an RM tag." Picture: macro of a delivery box; on "RM6" a price tag unfolds from under
the flap, in the accent colour. Muted, the tag still says RM6.

=== cards/06_Art_Direction/study-fundamentals-not-just-mimicry--rella-lighting.md
Topic: a board-check pass where a hero prop's lighting "looks flat" despite following the gobo/rim checklist cards (illustrative).
BEFORE: keep nudging light intensity and gobo opacity, hoping one more pass will fix "flat."
AFTER: check first whether the big light/shadow shape (shape-hierarchy card) and form-vs-cast distinction are even
correct — if not, fix those fundamentals first, then re-apply the checklist.

=== cards/06_Art_Direction/subject-match-across-time-or-place--animation-technique-guide.md
Topic: "Simpan RM100 sebulan — 1, 5, 10 tahun" (plain arithmetic, no interest: RM1,200 / RM6,000 / RM12,000).
- BEFORE: three unrelated shots — a piggy bank, a calendar, a bank card.
- AFTER: the same glass jar centred at 40 % frame height in three setups: on a student desk ("setahun, RM1,200"), on a kedai counter ("lima tahun, RM6,000"), on a home shelf ("sepuluh tahun, RM12,000"); notes fill it more each time; one slow 4° turn carries across both cuts; the amount label in the accent colour.

=== cards/06_Art_Direction/symbol-pairing-visual-device-no-copy--art-direction-ingredients.md
Topic: how a 0% instalment plan secretly adds the interest into the sticker price (numbers illustrative).
BEFORE: narrator says "the price already includes hidden interest" over a generic price tag.
AFTER device: the price tag shown next to its own shadow — but the shadow is a taller, second price tag (the real
"0% interest" cost folded in). No caption needed; the mismatch between object and shadow proves the hidden markup.

=== cards/06_Art_Direction/symmetry-amplifies-the-feeling--look-like-movies.md
Topic: "Kenapa harga sama di semua kedai 'RM2' (kedai harga tetap)" (illustrative; a fixed-price shop is plain arithmetic: every item one price).
- BEFORE frame brief: "shelf with products, three-quarter view".
- AFTER: Decision "symmetry, calm-dollhouse"; Ref a perfectly ordered shelf; camera on axis; 5 identical RM2 tags in a row mirrored around the centre item; Feeling "everything in its place"; Moves "on 'tapi' one tag tilts 8° off-axis over 0.5 s — the order breaks"; accent on the centre tag only.

=== cards/06_Art_Direction/three-approach-concept-doc--motion-design-really-made.md
Topic: "Kenapa kedai makan suka bundle air + makanan" (illustrative).
BEFORE: one approach drafted and built straight away.
AFTER: A (literal, object): tray with nasi + teh ais; frames: price tags separate → bundle tag → margin counter; red accent.
B (UI-led): POS screen; frames: two line items → combo button → profit field ticks up; green accent.
C (text-led over macro receipt): receipt lines strike through into one combo line; amber accent. User picks A.

=== cards/06_Art_Direction/three-level-type-ladder-hook-secondary-finisher--visual-hierarchy-graphic-design.md
Topic: a how-to episode's closing frame (illustrative, S16 how-to format).
BEFORE: the end question and a supporting RM number are set at the same size — the eye doesn't know which to read first.
AFTER: the RM number (already paid off) renders at tier 2 size as it fades, and the closing question renders at
tier 1 size as the last thing on screen, matching its role as the final hook-weight line.

=== cards/06_Art_Direction/tidy-up-mess-as-one-object--mograph-storytelling-4-plots.md
Topic: a home baker in Ipoh taking orders across WhatsApp, Instagram DMs and paper (illustrative).
- BEFORE: "Order bersepah" shown as three app icons and a sad emoji.
- AFTER: mess object = "a pile of order slips". Row 2: macro on a spike of 30 paper slips, two fallen. Fix row on "satu
  senarai": slips lift and stack into one clipboard list in one move; WhatsApp stays (she keeps it); accent on "30 order,
  0 tercicir".

=== cards/06_Art_Direction/tint-every-light-to-match-palette-instead-of-grading--obsession-lighting-recreation.md
BEFORE: a cold warehouse shot with all-neutral lights; reference calls for a teal-orange night mood.
AFTER: frame brief Decision: "ambient + rim lights tinted cool blue (desaturated, not the accent); key light stays
neutral; the RM price tag keeps the single orange brand accent — no other light carries that colour."

=== cards/06_Art_Direction/two-polyboard-light-gap-frame-for-subject-to-step-into--creative-lighting-setups-portrait.md
Topic: a small kedai's new signboard "reveal" beat (illustrative).
BEFORE: backdrop evenly lit; the signboard just fades in.
AFTER: shot-list row — a narrow lit rectangle appears on the dark backdrop first (the gap-frame look), then the
signboard slides into that lit frame.

=== cards/06_Art_Direction/two-subject-interaction-toolkit--100-art-direction-ideas.md
Topic: a car-wash's add-on wax service upselling the base wash (illustrative).
BEFORE: the wash bucket and the wax bottle sit side by side on the counter, both lit, both in focus.
AFTER: the wax bottle tips and feeds a thin accent-coloured stream directly into the bucket's water — a contact beat
between the two objects that visualises "the wax gets added to the wash", not two props posed next to each other.

=== cards/06_Art_Direction/value-first-greyscale-design--better-way-to-colour.md
Topic: "Nasi lemak RM3 vs RM5: beza untung sebungkus" (illustrative: price − cost per pack).
- BEFORE: two coloured packs side by side; the RM5 pack's red accent label looks strong, but in greyscale the white RM3 pack is brighter and wins.
- AFTER: greyscale pass first — key moved so the RM5 pack is the brightest value, RM3 pack falls to mid-grey; then colour added; the accent on "untung RM2.10" (illustrative) also reads as the lightest label in greyscale.

=== cards/06_Art_Direction/vary-light-ratios-per-setup-avoid-samey--invisible-line.md
Topic: a 4-step how-to on checking a shop's SST registration (illustrative).
BEFORE: all four step setups sit at the same soft, even top-light ratio — the sequence feels like one flat slide deck.
AFTER: step 1 soft even ratio (intro); step 2 harder ratio, single hard-edged shadow (the check itself); step 3 back
to soft but dimmer (the wait/uncertainty beat); step 4 bright, low ratio again (the resolved answer) — no two
adjacent steps share the same ratio.

=== cards/06_Art_Direction/visual-feeling-vs-visual-device-spectrum--art-direction-ingredients.md
Topic: a laundromat where a coin counts down to show the real cost per wash (numbers illustrative).
Line: "Basuh sekali — RM3.50 terus hilang."
BEFORE (feeling only): nice lighting on a washing machine while the line is read.
AFTER (device): a coin visibly drops into the slot and the display ticks straight from RM3.50 to RM0.00 in one cut —
the pairing (coin in / balance gone) proves the cost with no caption needed; the spoken line becomes a confirmation,
not the carrier.

=== cards/06_Art_Direction/white-space-makes-the-hero-breathe--visual-hierarchy-graphic-design.md
Topic: a board still of a hero receipt total surrounded by tightly packed secondary props (illustrative).
BEFORE: the receipt sits correctly in the 25–60% band, but props crowd right up against its edges — it doesn't pop.
AFTER: secondary props are pulled back, leaving clear dark-room space around the receipt — the same object, same
size, now reads as unmistakably the hero.

=== cards/06_Art_Direction/wide-shot-dwarfs-the-subject--shot-sizes-explained.md
Topic: "Bayar hutang RM50 sebulan, hutang RM6,000 — berapa lama?" (no interest, plain arithmetic: 120 months = 10 years).
- BEFORE: CU on an RM50 note.
- AFTER: `| 8 | "RM50 sebulan…" | WS · one RM50 note at the foot of a stack of 120 notes, stack fills 55 % of frame | note rim-lit in accent |` → `| 9 | "sepuluh tahun" | — | stack counter 120 |`

=== cards/07_Script_Story/before-state-cost-and-clock--mograph-storytelling-4-plots.md
Topic: a car wash in Seremban that lets customers pay "nanti" (illustrative).
- BEFORE: L02 "Hutang pelanggan boleh jadi masalah besar."
- AFTER: L02 "Seorang customer hutang RM15. Nampak sikit je." L03 "Tapi 4 orang seminggu, sebulan dah RM240 hilang."
  (4 × RM15 × 4 weeks.) Clock: a wall calendar on the counter flips to the 30th as the counter reaches RM240.

=== cards/07_Script_Story/building-block-concept-chain--how-to-explain-complicated.md
Topic: "Kenapa kedai bundle boleh jual baju RM10 dan masih untung?" (illustrative numbers).
BEFORE: "Kedai bundle untung sebab beli borong, kos rendah dan jualan laju." (three ideas in one line)
AFTER
- Block A "harga bal": "Satu bal baju terpakai, 100 helai, RM300. Tiga ringgit sehelai."
- Block B "baju bintang": "Dalam bal tu, ada 5 helai jenama. Jual RM80 sehelai."
- Block C "baki RM10": "95 helai lagi, jual RM10. Dapat RM950."
- Payoff: "Harga bal RM300. Baju bintang RM400, baki RM950. Satu bal, RM1,350."

=== cards/07_Script_Story/clear-filter-calibrate-link-envision-abstract-repeat--explain-anything-clear.md
Topic: why a catering business "untung" but has no cash (credit sales; numbers illustrative).
BEFORE: "Keuntungan perakaunan tidak sama dengan aliran tunai disebabkan akaun belum terima."
AFTER: C — viewer knows "untung" and "hutang", not "aliran tunai". L — "Macam kawan pinjam duit: dalam buku ada, dalam
dompet takde." E — one RM10,000 invoice stack splits: RM3,000 paid (cash), RM7,000 still owed (grey). A — "Kerja dah
siap, duit belum masuk." R — end on the same invoice stack: "Korang lebih rela untung atas kertas, atau duit dalam
tangan?"

=== cards/07_Script_Story/click-confirmation-beat-the-promise--killer-script-hooked.md
Frame-0 text: "Semua RM5. Tapi untung dia besar." (a generic RM5 shop, illustrative)
- BEFORE: L01 "Hari ni kita cerita pasal bisnes runcit." (doesn't confirm) 
- AFTER: L01 "Kedai ni jual semua barang RM5." (confirms) L02 "Tapi ada barang yang kos dia cuma RM1.20 je." (beats:
  RM3.80 margin on a RM5 item, plain arithmetic).

=== cards/07_Script_Story/cult-hopping-borrow-a-known-reference--irresistible-hooks.md
Topic: a kedai runcit in Kajang running a one-evening flash sale (illustrative).
BEFORE: L01 "Flash sale ialah strategi diskaun yang dihadkan kepada tempoh masa tertentu."
AFTER: L01 "Korang tahu sale 11.11 online? Kedai runcit pun boleh buat versi kecil." L02 "Dua jam je, satu rak je."
L03 "Tapi kalau salah kira, kedai rugi." (Mechanism then counts: 40 tin × RM1 off = RM40 given away.)

=== cards/07_Script_Story/curiosity-spark-before-concept--how-to-explain-complicated.md
Topic: why a mamak's teh tarik price barely moves (illustrative numbers).
BEFORE: "Hari ni kita belajar konsep margin untung dalam perniagaan mamak."
AFTER
- L01 "Teh tarik RM2.50. Kos dia… lebih kurang 80 sen." (fact, number)
- L02 "Habis tu, kenapa mamak tak naikkan harga?" (question)
- L03 "Sebab duit dia bukan dari teh. Dari benda lain atas meja ni." (clue + narrower question: which thing?)

=== cards/07_Script_Story/descriptive-visual-emotive-voice-two-registers--scriptwriting-motion-graphics.md
Topic: a burger stall's cheese slice cost (illustrative).
BEFORE — voice: "Kos bahan mentah memberi impak signifikan kepada margin." · visual: "Dramatic shot of burger."
AFTER — voice: "Satu keping cheese je… tapi korang tahu tak, tu RM40 sebulan?" · visual: "Macro, low grazing: one cheese
slice on the griddle edge; on 'RM40' a stack of 100 slices grows beside it, counter to RM40."

=== cards/07_Script_Story/eight-beat-three-act-compressed-to-11-lines--three-act-structure.md
Everyday Owners-style story of a generic burger stall (illustrative numbers):
L01 Hook "RM9,000 sebulan… dari satu gerai burger." · L02 Inciting: rent doubles to RM1,600. · L03 PP1: he quits his
office job; no going back. · L04 Pinch: a franchise opens across the road. · L05–06 Midpoint: he stops reacting, starts
selling only 3 burgers, done right. · L07 Pinch 2: patty supplier raises price 30 %. · L08 PP3: queue doubles (win) but
he's out of stock by 9 pm (low). · L09–10 Climax: pre-orders by WhatsApp; RM9,000 month. · L11 "Kurang menu… lagi
untung?"

=== cards/07_Script_Story/filler-audio-filler-video-cut-to-terse--writing-for-motion-design.md
Topic: fake "harga asal" on sale tags.
BEFORE (16 words): "Jadi sebenarnya apa yang korang perlu tahu adalah harga asal tu kadang-kadang tak betul pun."
Visual cell: "text on screen" (filler).
AFTER (6 words): "Harga asal tu kadang-kadang reka je." Visual: the RM199 tag flips over, the back is blank.

=== cards/07_Script_Story/flip-the-familiar-question--stop-chasing-original-ideas.md
Topic: pasar malam traders (generic, illustrative).
BEFORE (usual): "Macam mana peniaga pasar malam buat untung?"
AFTER flips: reverse "Kenapa ramai peniaga pasar malam berhenti?" · other side "Kenapa korang beli lebih bila ada
lampu?" · zoom on last step "Apa jadi pada makanan yang tak habis pukul 11?" → keep the zoom. Frame 0: "Pukul 11.
Makanan ni nak ke mana?"

=== cards/07_Script_Story/follow-one-item-journey--scriptwriting-motion-graphics.md
Topic: why a RM12 ikan kembung pack costs that much at the pasar (illustrative numbers).
BEFORE: "Harga ikan naik sebab kos pengangkutan, orang tengah dan peruncit."
AFTER: one fish, four stops — bot (RM5/kg) → jeti, ais + lori (+RM2) → pemborong (+RM2) → gerai pasar (+RM3) = RM12.
Each stop: same fish, new surface (deck, ice crate, steel scale, wet-market tile), tag grows on the number word.

=== cards/07_Script_Story/four-hook-failure-modes-audit--hooks-impossible-to-skip.md
Topic: QR payments at a gerai (S16 how-to).
BEFORE: L01 "Korang, benda ni memang gila." L02 "Saya tak sangka langsung." L03 "Gerai pun dah boleh terima QR."
(delay: topic in L03; L01–L02 vague.)
AFTER: L01 "Gerai korang masih cash je?" L02 "Pelanggan tak bawa duit, terus jalan." L03 "Kalau korang nak terima
QR, ni caranya. 3 step je."

=== cards/07_Script_Story/four-plots-pick-by-what-changes--mograph-storytelling-4-plots.md
Topic: a nasi lemak stall in Shah Alam that loses track of daily takings (illustrative numbers).
- BEFORE (moving slides): L04 icon of a notebook slides in; L05 a counter "RM480" ticks; L06 a logo spins.
- AFTER (Courier Run, one RM10 note): "Must see: where one RM10 note goes." L01 the RM10 lands in the tin. L04 it splits
  into RM4.50 rice-and-sambal cost, RM1.50 packaging, RM4 left. L06 the RM4 is the only part that's yours. L11 back on the
  tin: "Dari RM10 tu, berapa korang betul-betul simpan?"

=== cards/07_Script_Story/hard-number-at-moment-of-change--mograph-storytelling-4-plots.md
Topic: a kedai runcit switching from a paper hutang book to a simple spreadsheet (illustrative).
- BEFORE: L09 "Lepas tu, semua jadi lagi senang dan teratur."
- AFTER: L09 "Sebulan je, RM180 hutang yang dah lupa tu… masuk balik." The notebook closes; the till drawer slides out
  and RM180 counts up on its display on "RM180".

=== cards/07_Script_Story/held-beat-then-rush--how-to-pace-your-film.md
Topic: "Jual air balang RM2 secawan — untung ke?" (plain arithmetic, illustrative costs).
- BEFORE: `L09 | Selepas tolak kos gula, cawan dan ais, untung setiap cawan cuma 30 sen.`
- AFTER: `L09 | Jual RM2 secawan… [wry] untung 30 sen je.` / `L10 | Gula 60 sen, cawan 40, ais 30, sirap 40.` (held beat before "30 sen", then a burst; 60+40+30+40 = RM1.70, so RM2 − RM1.70 = 30 sen).

=== cards/07_Script_Story/high-note-recap-before-the-question--killer-script-hooked.md
Topic: checking whether a sale is real (generic; RM figure illustrative).
- BEFORE: L10 "Okay itu je untuk hari ni." L11 "Follow untuk lagi!"
- AFTER: L10 "Screenshot, semak resit, report. Tiga benda, RM40 tak hilang bulan ni." L11 "Korang pernah semak resit
  sendiri?"

=== cards/07_Script_Story/hitchcock-bomb-tell-the-viewer-first--suspense-documentary.md
Topic: "Beli Raya ansuran 0 % — betul ke takde kos?" (illustrative).
- BEFORE: L06 "Rupanya ada caj lewat RM10 sebulan." (surprise only at the end)
- AFTER: L02 (visual): the checkout screen, a tiny "lewat bayar: RM10/bulan" line glows in accent while the voice says "0 % faedah, senang je." L03–L05 follow the buyer's unaware steps; the line stays lit in the corner. L06 "Lewat dua bulan? Tambah RM20." — the line expands to fill the frame.

=== cards/07_Script_Story/hook-clarity-proof-misreading-test--hooks-impossible-to-skip.md
Topic: a car wash's monthly profit (illustrative).
BEFORE: "Pendapatan kedai cuci kereta ni mungkin nampak tinggi tapi selepas ditolak perbelanjaan operasi yang dibuat
setiap bulan ia tak banyak." (passive, long, two readings: is the revenue high or not?)
AFTER: "Kedai cuci kereta ni dapat RM12,000 sebulan. Simpan? RM1,800 je."

=== cards/07_Script_Story/intro-context-belief-contrarian-proof-plan--killer-script-hooked.md
Topic: running a stall from home (illustrative).
- BEFORE: L01 "Hari ni saya nak share tips jual kuih." L02 "Ada tiga tips." L03 "Jom tengok."
- AFTER: L01 "Jual kuih dari rumah, ramai kata kena murah baru laku." (context + belief) L02 "Tapi naik 20 sen sebiji, 100
  biji sehari, dah RM20 lebih." (contrarian + proof: 100 × RM0.20) L03 "Kalau korang nak naik harga tanpa hilang
  customer, ni caranya. Tiga step je." (plan)

=== cards/07_Script_Story/jargon-sentence-to-plain-sentence--explain-anything-clear.md
Topic: a kedai bundle deal (illustrative).
BEFORE: "Margin kasar produk ini ialah 35 peratus selepas kos barang dijual."
AFTER: "Jual RM10, modal RM6.50. RM3.50 masuk poket." (check: 3.50 ÷ 10 = 35 %.)

=== cards/07_Script_Story/last-frame-first-three-frame-story--mograph-storytelling-4-plots.md
Topic: a kedai runcit in Kajang whose shelf has expired stock (illustrative).
- BEFORE: writer starts at L01 with "Ramai kedai rugi sebab stok" and discovers the end at L11.
- AFTER: Last frame: the same shelf, front row all newest dates, one tin glowing accent. Frame 0: that shelf, close, a
  dented tin with last month's date. 3 frames: mess (tins mixed, 6 expired) → choice (oldest to the front, every
  Monday) → result (0 expired, RM36 not thrown away — 6 tins × RM6, illustrative). L11 on frame-0 framing: "Stok lama
  kat depan… atau kat belakang?"

=== cards/07_Script_Story/lead-with-benefit-or-pain-before-the-solution--irresistible-hooks.md
Topic: separate bank account for a small shop.
BEFORE: L01 "Akaun bank bisnes ialah akaun yang berasingan daripada akaun peribadi."
AFTER: L01 "Kedai laku, tapi hujung bulan korang tak tahu duit lari ke mana?" L02 "Kalau korang nak nampak duit kedai
jelas, ni caranya. 3 step je." L03 "Step satu: buka akaun kedua, untuk kedai je."

=== cards/07_Script_Story/line-novelty-cut-test--great-motion-design-script.md
Topic: a nasi lemak stall in Shah Alam pricing its egg (numbers illustrative).
BEFORE
- L03 "Telur ni kos dia RM0.50 sebiji."
- L04 "Jadi kos telur memang penting untuk peniaga." ← new for viewer: nothing (restates L03)
- L05 "Kalau jual RM1.50, untung RM1 sebiji."
AFTER
- L03 "Telur ni kos dia RM0.50 sebiji."
- L04 "Jual RM1.50. Untung RM1 sebiji."
- L05 "Seratus pinggan sehari? RM100 dari telur je."
Each line now adds a fact: cost → margin → daily total.

=== cards/07_Script_Story/loop-rhyme-start-end-sound-and-frame--match-cut-cinematic-breakdown.md
Topic: a bengkel kereta's RM50 oil-change upsell (illustrative).
BEFORE: End line "Jadi, servis asas ke servis penuh?" over a static shot of an oil can, no loop sound.
AFTER: frame-0 opens on the oil can lid snapping shut (soft click); End line "Jadi, servis asas ke servis penuh?" over the SAME lid snapping shut from the other side → loop-rhyme-start-end-sound-and-frame; the click plays once, at the seam, read as both the end and the next start.

=== cards/07_Script_Story/metaphor-for-shape-example-for-action--how-to-explain-complicated.md
Block: "kos tetap" for a dobi layan diri (illustrative numbers).
BEFORE: "Kos tetap ialah kos yang tidak berubah dengan jumlah jualan, contohnya sewa, insurans, lesen dan gaji."
AFTER
- Shape: "Kos tetap ni macam sewa bilik — guna ke tak, tetap bayar."
- Example: "Sewa kedai RM2,500. Sebulan tak ada orang basuh pun, tetap RM2,500."
Shot: the rent invoice on the folding table, the empty washers behind it out of focus; "RM2,500" stays while a usage
counter beside it reads 0.

=== cards/07_Script_Story/mid-story-expectation-break--suspense-documentary.md
Topic: "Kedai RM2 — macam mana boleh untung?" (illustrative numbers).
- BEFORE: L06 "Sebab beli banyak, kos rendah." (predictable)
- AFTER: L05 "Beli pukal, kos turun." (viewer predicts: that's it) → L06 "Tapi untung sebenar datang dari barang RM5 kat kaunter." (illustrative; must be verified for any real chain) → end text "Korang beli lebih dari RM2?"

=== cards/07_Script_Story/midpoint-moment-of-truth-flip--three-act-structure.md
Topic: why a bubble-tea kiosk is busy but broke (illustrative).
- BEFORE: L05 "Ada banyak faktor kenapa untung rendah."
- AFTER: L04 "Dia tambah menu, tambah promo, still rugi." (reacting) L05 "Rupanya, setiap cup pakai straw dan seal
  RM0.40 — dan dia bagi free extra topping RM0.80." (truth: cup x-rays to show the hidden RM1.20) L06 "Jadi dia buang
  topping free." (acting)

=== cards/07_Script_Story/narration-carried-montage--how-to-pace-your-film.md
Topic: "Buka gerai burger — modal awal" (illustrative numbers).
- BEFORE: L04 "Mula-mula korang beli dapur." L05 "Lepas tu beli peti sejuk." L06 "Lepas tu kanopi." (3 lines, 3 setups).
- AFTER: L04 "Dapur RM400, peti RM900, kanopi RM300 — dah RM1,600." → one top-down setup on a receipt that prints a line on each item word; the total lands in the accent colour on "RM1,600".

=== cards/07_Script_Story/narration-image-counterpoint--juxtaposition-in-film.md
Topic: "Free delivery tu betul ke free?" (illustrative).
- BEFORE: L03 "Free delivery buat korang jimat." / visual: a delivery box with a "FREE" sticker.
- AFTER: L03 "Free delivery. Jimat, kan?" / visual: the same order's two receipts side by side — the in-app price RM12.90 vs the shop-counter price RM10.90; accent on the RM2 gap on "jimat".
  L04 "Sebenarnya RM2 dah masuk dalam harga makanan." / visual: the RM2 slides out of the menu price into the box.

=== cards/07_Script_Story/native-localisation-pass--motion-design-really-made.md
BEFORE: "Anda boleh menjimatkan wang dengan membandingkan harga seunit."
AFTER: "Korang boleh jimat — tengok harga seunit, bukan harga pek."

=== cards/07_Script_Story/on-screen-text-hook-3-to-5-words-just-enough-motion--irresistible-hooks.md
Topic: fake "harga asal" on sale tags (S16 how-to).
BEFORE: frame-0 text "Cara Semak Harga Asal Sebenar Sebelum Beli Masa Sale" (9 words), static tag, camera dolly + tag
spin + confetti of % signs.
AFTER: text "Diskaun 50% ni tipu?" (4 words, bold, upper third). Hero: one macro price tag RM199 → RM99 on dark wood; the
only motion is the tag turning slowly toward the top light while a strike line draws across "RM199" (~0.6 s, ~).

=== cards/07_Script_Story/opening-line-specific-scenario-self-select--great-motion-design-script.md
Topic: a small kedai runcit owner who mixes shop and personal money (generic shop).
BEFORE: "Hai semua! Hari ni kita belajar pasal pengurusan kewangan kedai."
AFTER — frame 0: "Kedai untung. Duit tetap tak cukup." · L01: "Satu laci duit, untuk kedai, untuk dapur, untuk
anak." (recognition: the owner sees their own drawer; a salaried viewer self-selects out.)

=== cards/07_Script_Story/outline-novelty-gate-what-why-how--killer-script-hooked.md
Topic: "Cara elak kena tipu masa sale" (generic).
- BEFORE outline: 1) bandingkan harga 2) baca review 3) jangan terburu-buru (all known → fails).
- AFTER: 1) screenshot the price a week before the sale (novel: example) — why: proves whether the "original" price
  existed; how: step 1. 2) check the receipt against the shelf tag before bagging (novel: moment) — why: the error is
  found while you can still fix it at the counter. Passes with 2 novel points.

=== cards/07_Script_Story/personify-the-product-or-service--scriptwriting-motion-graphics.md
Topic: a POS app for a small kedai runcit (generic).
BEFORE: "Sistem POS ni ada fungsi inventori, laporan jualan dan amaran stok."
AFTER: "POS ni macam kerani yang tak pernah tidur — stok habis, dia bagitau." Shot: the shelf's last tin slides out; the
tablet on the counter lights a "stok: 0" alert on "bagitau".

=== cards/07_Script_Story/prediction-pop-quiz-knowledge-gap--how-to-explain-complicated.md
Topic: buying a RM5,000 laptop on 0 % instalment versus cash (illustrative; plain arithmetic, no fees assumed).
BEFORE: "Ramai tak tahu ansuran 0 % kadang-kadang ada kos tersembunyi."
AFTER
- "Cash RM5,000, atau ansuran RM417 sebulan, 12 bulan. Mana lagi murah?"
- "Ramai pilih ansuran." (expected tag: "jimat")
- "Kira: 417 kali 12… RM5,004." (real number in accent)
- "Nama dia: harga bulat-bulat." (name)
- next line explains the rounding up of RM416.67 to RM417.

=== cards/07_Script_Story/problem-open-fix-middle-changed-state-end--mograph-storytelling-4-plots.md
Topic: a small clothing shop on Instagram losing sales to slow replies (illustrative).
- BEFORE: L01 "Instagram ni platform yang besar untuk bisnes." (setting) … L11 "Follow untuk tips lagi!"
- AFTER: L01 "12 orang DM tanya harga semalam. 3 je dapat reply." L03 "Kalau korang nak reply laju, ni caranya. Dua step
  je." L09 "Minggu ni, 12 tanya, 12 dapat reply." (phone inbox in after-state) L11 "Customer tunggu berapa lama… sebelum
  dia lari?"

=== cards/07_Script_Story/problem-to-metaphor-schrader-exercise--stop-chasing-original-ideas.md
Topic: small daily spending (RM8 kopi, illustrative).
BEFORE (concept): "Mari faham konsep perbelanjaan kecil yang berulang."
AFTER: felt problem "gaji masuk, tapi hilang tak tahu ke mana" → image "dompet bocor". Line: "Dompet korang bocor —
RM8 sehari, RM240 sebulan." Shot: a wallet on a café table, notes slipping out one by one on each number word.

=== cards/07_Script_Story/purpose-and-viewer-warmth-brief--motion-design-really-made.md
BEFORE: `Purpose: explain e-wallets. Viewer: everyone.`
AFTER (S16 how-to): `Purpose: one how-to — check your e-wallet transaction history every night. Viewer warmth: cold,
18–34, scrolling FYP, has an e-wallet. Leaves with: "RM8 a day unnoticed is RM240 a month" (8 × 30). End
question: "Korang rasa sehari habis berapa?"` (amounts illustrative).

=== cards/07_Script_Story/rehook-bridge-between-points--killer-script-hooked.md
Topic: screenshot the price before a sale (generic).
- BEFORE: L05 "…simpan dalam phone." L06 "Step dua. Kat kaunter…"
- AFTER: L05 "…simpan dalam phone. Tapi screenshot je tak cukup kalau kat kaunter lain pula." L06 "Step dua. Kat kaunter,
  tengok resit betul-betul." Visual on "tak cukup": the saved screenshot's price and the receipt's price sit side by side,
  not matching.

=== cards/07_Script_Story/said-wont-then-did-smash-cut--juxtaposition-in-film.md
Topic: "Kenapa gaji habis sebelum hujung bulan" (illustrative).
- BEFORE: L01 "Ramai orang belanja lebih daripada yang mereka sangka."
- AFTER: L01 (frame 0 text) "Bulan ni aku tak beli air manis." / macro: a fresh coffee loyalty card, 0 stamps.
  L02 "Hari ke-12: 9 cawan, RM58." / same card, same framing, 9 stamps; "RM58" fades in on the word.

=== cards/07_Script_Story/second-best-point-first-rising-order--killer-script-hooked.md
Topic: 3 ways a kedai makan cuts waste (illustrative). Ranked: A) weigh leftover rice each night → found 4 kg/day (best);
B) smaller default portions with free top-up (2nd); C) label containers by date (3rd).
- BEFORE: A, B, C (best first, then declining).
- AFTER: B → A → C. L04 B: "Nasi kurang sikit, tambah free." L06 A: "Timbang nasi lebih tiap malam: 4 kilo sehari
  dibuang." L08 C.

=== cards/07_Script_Story/seven-elements-suspense-checklist--suspense-documentary.md
Topic: "Kenapa kedai dobi buka 24 jam" (illustrative).
- BEFORE draft: hook "Kedai dobi buka 24 jam" (no conflict), mechanism lines, end "Menarik kan?"
- AFTER check: conflict ✗ → frame 0 "Takde pekerja. Tetap untung RM3,000." (illustrative); foreshadowing ✗ → L02 shows the electricity meter in accent, paid off at L08 "Bil elektrik RM900 sebulan"; end text "Korang percaya mesin lebih dari orang?"

=== cards/07_Script_Story/six-part-explainer-sequence-fixed-order--great-motion-design-script.md
Topic: "Jual kek dari rumah: harga ikut kos, bukan ikut kawan" (illustrative numbers).
BEFORE (feature-first): "Ada tiga cara kira harga kek: kos bahan, kos masa, kos packaging…"
AFTER outline:
- Hook (0–6 s): "Kek RM60 ni… sebenarnya rugi."
- Context (6–18 s): bahan RM38, kotak RM4, gas + elektrik RM5, 4 jam kerja.
- Turn (18–23 s): "Kalau korang nak harga yang tak rugi, ni caranya. Tiga step je."
- Mechanism (23–50 s): 1 tambah semua kos (RM47) · 2 letak upah RM10 sejam (RM40) · 3 tambah untung 20 %.
- Proof (50–56 s): RM87 × 1.2 = RM104.40 → "harga sebenar dalam RM105."
- End (56–60 s): "RM60 atau RM105 — korang pilih mana?"

=== cards/07_Script_Story/specific-insight-not-generic-pain--great-motion-design-script.md
Topic: a home baker selling on WhatsApp (illustrative).
BEFORE: "Ramai peniaga online hadapi masalah pengurusan pesanan yang tak efisien."
AFTER: "Setiap malam pukul 11, dia scroll 40 mesej WhatsApp… cari siapa dah bayar."
Insight on file: "the pain is matching payments to chats at night, not 'order management'."

=== cards/07_Script_Story/speed-slow-speed-tempo-cycles--how-to-pace-your-film.md
Topic: "Harga nasi lemak naik — untung peniaga turun?" (illustrative numbers).
- BEFORE: 11 lines all ~16 words, every setup 3 s — a constant lope.
- AFTER: L01–L03 F ("Nasi lemak naik 50 sen." / "Tapi untung makcik turun."); L04–L08 middle (cost per bungkus: beras, santan, telur); L09 S — "Sebungkus RM3, kos dah RM2.60, tinggal 40 sen je." held 4 s on the receipt; L10–L11 F — "Jadi siapa yang untung sebenarnya?"

=== cards/07_Script_Story/stakes-before-the-inciting-event--three-act-structure.md
Topic: a tuition centre owner and late fees (illustrative).
- BEFORE: L01 "Yuran lewat boleh rosakkan bisnes tuisyen."
- AFTER: L01 "Cikgu Aina ada 40 student, RM150 sebulan — RM6,000 masuk." L02 "Tapi bulan ni, 12 orang belum bayar.
  RM1,800 tergantung." (12 × RM150.)

=== cards/07_Script_Story/stated-vs-implied-contrast-curiosity-loop--hooks-impossible-to-skip.md
Topic: unit price at a pasaraya (how-to; prices illustrative).
- Stated: L01 "Orang ingat pek besar mesti lagi murah." L02 "Kira harga per 100g dulu. Kadang pek kecil menang."
- Implied: L01 "Pek kecil ni lagi murah daripada pek besar." (A = "big pack is cheaper" is known to everyone.)
Frame-0 text: "Pek besar. Lagi mahal?" Proof later: 500g RM8.50 = RM1.70/100g vs 200g RM3.20 = RM1.60/100g.

=== cards/07_Script_Story/story-lens-least-common-angle--master-storyteller.md
Topic: Ramadan bazaar stalls (illustrative numbers).
Common: best food to buy; prices this year; crowded bazaars. Less common: which stalls sell out first. Least common: how
much a kuih stall keeps after 30 days of tapak rent, ingredients and helper pay.
Chosen lens: "RM15,000 jualan sebulan. Tinggal berapa?" (worked out from count × price − costs, illustrative).

=== cards/07_Script_Story/surface-need-vs-misbelief--story-to-motion-workflow.md
Topic: a goreng pisang seller thinking about accepting QR payments (generic stall).
BEFORE (surface): "Cara setup QR untuk gerai."
AFTER: surface need "terima bayaran tanpa tunai" → why: customers walk away with no cash → why: each walk-away is a lost
RM5 sale · misbelief: "QR untuk kedai besar, gerai kecil tak perlu." · hero: the stall's cash tin, half empty.
Hook: "Gerai kecil. Pelanggan lari sebab tak ada tunai."

=== cards/07_Script_Story/talk-to-one-friend-conversational-tone--master-storyteller.md
Topic: QR payments at a gerai. Listener: "Pak Mat, burger stall, Bangi" (fictional persona).
BEFORE: "Hari ini kita akan membincangkan kepentingan pembayaran tanpa tunai untuk peniaga kecil."
AFTER: "Pak Mat, berapa ramai budak datang, tengok dompet… terus blah? Jom pasang QR. Tiga step je."

=== cards/07_Script_Story/three-stakes-layers--suspense-documentary.md
Topic: "Peniaga online kena bayar caj platform — adil tak?" (illustrative).
- BEFORE: end question "Korang setuju tak?"
- AFTER: stakes — external: "RM1,200 sebulan hilang pada caj" (illustrative); internal: "penat kerja, untung tipis"; philosophical: "siapa patut tanggung caj — penjual atau pembeli?" → payoff line uses RM1,200; end text "Pembeli patut tanggung caj?"

=== cards/07_Script_Story/three-step-hook-context-lean-interjection-snapback--irresistible-hooks.md
Topic: real profit of a burger stall in Shah Alam (numbers illustrative).
BEFORE: L01 "Hari ni kita cerita pasal untung gerai burger." L02 "Ramai nak tahu berapa dia dapat."
AFTER: frame-0 text "RM600 masuk. Untung? Bukan RM600."
- L01 (lean, wow fact): "Gerai burger ni jual 100 biji semalam. RM600 masuk."
- L02 (interjection): "Tapi RM600 tu bukan duit dia."
- L03 (snapback): "Yang tinggal dalam poket? RM150 je. Ni ke mana RM450 lagi."
L04 onward answers the loop: buns + patties RM250, sos + bungkus RM60, gas RM40, tapak RM100 (total RM450).

=== cards/07_Script_Story/ticking-clock-deadline--suspense-documentary.md
Topic: "Gerai buah — kenapa harga turun waktu petang" (illustrative).
- BEFORE: L05 "Petang, peniaga turunkan harga."
- AFTER: L02 "Durian ni kena habis sebelum pukul 7 malam." (a price card with "7:00" stamp; the shadow of the light moves on it)
  L05 "Pukul 5, tinggal 20 biji. Harga turun RM5." (shadow longer, card re-priced)
  L08 "Pukul 7, habis. Untung kurang RM100, tapi takde yang busuk." (stamp reaches 7:00)

=== cards/07_Script_Story/value-loop-context-application-framing--killer-script-hooked.md
Step: record daily sales (illustrative).
- BEFORE: "Step satu, rekod jualan. Ini penting."
- AFTER: L04 "Step satu: tulis jualan setiap malam. Satu baris je — tarikh, jumlah." (context + application) L05 "Sebab
  bila Jumaat selalu RM300 dan Isnin RM90, korang tahu hari mana nak masak lebih." (framing)

=== cards/07_Script_Story/visual-weight-sets-segment-length--motion-design-really-made.md
BEFORE (15 words, 1 visual): "Bila korang nak bayar, korang cuma perlu buka app dan scan QR kat kaunter tu."
AFTER (5 words, 1 setup): "Buka app, scan QR, siap." — the longer version had one image (phone → QR stand) and
lost the 2–3 s rhythm.

=== cards/07_Script_Story/want-vs-need-gap--suspense-documentary.md
Topic: "Nak kedai makan ramai pelanggan" (illustrative).
- BEFORE: "Ni 3 tips tarik pelanggan."
- AFTER: want (L01): "Korang nak kedai penuh setiap hari?" → need (payoff): "Sebenarnya korang perlu untung RM2 sepinggan, bukan kedai penuh. 100 pinggan × RM0.50 = RM50; 60 × RM2 = RM120."

=== cards/07_Script_Story/word-budget-cut-content-not-read-speed--great-motion-design-script.md
Topic: "Kenapa kedai dobi layan diri buka 24 jam?" target 60 s → ceiling 204 words.
BEFORE: draft at 238 words; plan was "minta baca laju sikit".
AFTER: cut L06 (history of the first dobi, 21 words) and the second example in L08 (17 words) → 200 words; the read
speed stays as recorded.

=== cards/07_Script_Story/write-tempo-into-the-voice-text--how-to-pace-your-film.md
Topic: "Kedai dobi — duit masuk waktu korang tidur" (illustrative).
- BEFORE voice: `L02 | Mesin basuh tu buat duit sepanjang malam walaupun tauke dah balik rumah.`
- AFTER voice: `L02 | Pukul 2 pagi… mesin pusing… duit masuk… [whispers] tauke tengah tidur.` (burst, 4 fragments, 4 captions, 2 setups)
- AFTER payoff: `L09 | [serious] Satu mesin… RM15 sejam… [thoughtful] darab lapan jam.` (held).

=== cards/07_Script_Story/write-the-last-line-first-last-dab--master-storyteller.md
Topic: fake "harga asal" on sale tags.
BEFORE: last line written last: "Jadi, hati-hati masa sale. Follow untuk tips lagi." (statement + follow request.)
AFTER (written first): L01 "Diskaun 50%. Tapi harga asal tu, pernah wujud ke?" Last line: "RM99 ni, murah betul ke
korang kena?" Frame: back on the same RM199→RM99 tag as frame 0; on replay, L01 answers "pernah wujud ke?" again.

=== cards/07_Script_Story/write-what-we-show-alternate-cards--writing-for-motion-design.md
Topic: a kedai runcit owner running out of a best-seller (illustrative).
BEFORE: | 5 | "Stok habis, owner panik." | shelf | owner panics |
AFTER: | 5 | "Stok habis, owner panik." | macro, low angle along an empty shelf row | on "habis": the last tin slides
off the end, the shelf light flickers once to dim (~0.4 s) |
Alternates (L05): supplier invoice pages riffle by themselves · phone face-up, five missed-call cards stack in ·
price label of the empty slot tips forward · counter on the shelf edge ticks 12 → 0.

=== cards/07_Script_Story/you-your-framing-need-to-have-pain--hooks-impossible-to-skip.md
Topic: stock expiring at a small shop (illustrative).
BEFORE: L01 "Saya dulu selalu buang stok expired." / "Ni 3 trend pengurusan stok kedai runcit."
AFTER: L01 "Kalau stok kedai korang selalu expired atas rak…" L02 "…buat 3 benda ni. Boleh jimat RM300 sebulan."
(illustrative) L03 "Satu: barang lama depan, baru belakang."

=== cards/08_Edit_Pacing/a-to-b-composed-start-and-end-frames--overwatch-dragons-camera.md
Topic: "Kenapa harga nasi lemak naik RM0.50" (illustrative).
- BEFORE: `| 3 | "Harga telur naik 3 sen sebiji" | camera drifts over the counter | egg tray visible |`
- AFTER: `| 3 | "Harga telur naik 3 sen sebiji" | A: top-down egg tray, grid of 30 eggs filling 55 %, one egg in accent light → B: low 20° side angle, that egg 40 % of frame, tray edges as leading lines | "+3 sen" tag fades in on "3 sen" at B | a-to-b-composed-start-and-end-frames |`

=== cards/08_Edit_Pacing/ambient-room-tone-glues-silence--match-cut-cinematic-breakdown.md
Topic: a kedai runcit's closing-time till count (illustrative).
BEFORE: payoff shot (till drawer closing on the day's total) scored with music only, feels sterile.
AFTER: add a faint shop-hum ambient bed under the held shot → "ambient-room-tone-glues-silence" tag in shot-list.

=== cards/08_Edit_Pacing/anticipation-dip-before-match-cut--ae-morph-match-cuts.md
Topic: "Kedai kopi untung RM0.80 secawan, bukan RM5" (illustrative).
- BEFORE: `| 4 | "Harga secawan RM5…" | price tag slides straight to the cup | cut to cup |`
- AFTER: `| 4 | "Harga secawan RM5…" | price tag drops ~4 cm (dip), then swings up-right toward the cup | tag accelerates; cut to the cup at the peak on "tapi" | anticipation-dip-before-match-cut |`
  `| 5 | "…tapi untung cuma 80 sen" | cup continues the swing and settles centre | "RM0.80" counter fades in 0.4 s on "80 sen" | — |`

=== cards/08_Edit_Pacing/background-color-shift-timed-to-cut--motion-graphics-technique-tutorial.md
Topic: a kedai runcit's till drawer open→close state change (illustrative).
BEFORE: dark room stays one flat near-black tone across the whole run; the drawer's open→closed match cut reads slightly off.
AFTER: room's base tone steps from near-black to a faint warm charcoal exactly on the cut frame, cutting away attention from the imperfect match → background-color-shift-timed-to-cut.

=== cards/08_Edit_Pacing/block-animation-first-storyboard-keyframes-before-polish--motion-design-principles.md
Topic: revealing a shop's actual profit per item after costs (illustrative numbers).
BEFORE: every setup built with easing from the start, each held for the same ~2 s by default; the reveal line
(profit number) gets the same screen time as the setup before it and passes too fast to register.
AFTER: hold-frame pass first — the reveal setup gets ~1 s more hold than its neighbours (set in the shot-list before
any easing is written); only after that pacing is checked in a flat preview is easing added to each move.

=== cards/08_Edit_Pacing/carried-motion-match-cut-scale-push--animation-technique-guide.md
Topic: "Kenapa restoran letak harga RM9.90, bukan RM10" (plain pricing, no real-company claim).
- BEFORE: `| 4 | "Nampak murah sikit kan?" | macro on a menu card | price fades in |` hard cut to `| 5 | "Tapi beza dia 10 sen je" | macro on a 10 sen coin | — |` (dead join).
- AFTER: `| 4 | "Nampak murah sikit kan?" | macro low angle on menu card "RM9.90" | camera pushes 3 % accelerating into the cut | carried-motion-match-cut |`
  `| 5 | "Tapi beza dia **10 sen** je" | macro on a 10 sen coin, same screen centre | push continues 3 % out of the cut, easing to rest; accent on the coin on "10 sen" | carried-motion-match-cut |`

=== cards/08_Edit_Pacing/chained-match-cuts-loop-a-process--animation-technique-guide.md
Topic: "Nak buka akaun simpanan anak — 3 step" (generic steps, no bank-specific rules).
- BEFORE: three static step cards, then an end card.
- AFTER: `| 1 | "Satu duit raya…" | macro on an RM10 note dropping into an envelope (frame 0) | note falls down |`
  `| 4 | "Step satu, bawa IC" | IC card falls into frame at the same speed, lands on a counter | carry: fall → land |`
  `| 5 | "Step dua, isi borang" | pen rolls off the IC and writes across a form | carry: roll → write |`
  `| 6 | "Step tiga, simpan" | the form slides right into a passbook that closes | carry: slide → close |`
  `| 11 | "Korang mula umur berapa?" | the passbook flips open, an RM10 note lifts out and falls toward the envelope — frame-0 framing | carry: back to row 1 |`

=== cards/08_Edit_Pacing/chunk-audio-into-sentence-blocks-transition-at-paragraph--writing-for-motion-design.md
Voice (S16, illustrative): "Kalau korang nak tahu sale tu betul ke tak, ni caranya. Tiga step je. Step satu, screenshot
harga sebelum sale."
| 2 | "Kalau korang nak … ni caranya." 3.1 s | macro tag | on "caranya": tag tilts up to camera |
| 3 | "Tiga step je." 1.0 s | same tag, top-down | three numbered notches fade in on the tag edge; → T: tag slides
under a phone, screen fills frame |
| 4 | "Step satu, screenshot harga sebelum sale." 2.6 s | [UI] phone camera view | on "screenshot": shutter flash
inside the UI only, thumbnail slides to corner (0.4 s) |

=== cards/08_Edit_Pacing/composition-match-cut-to-compare--juxtaposition-in-film.md
Topic: "Kopi RM12 sehari — berapa setahun?" (illustrative arithmetic).
- BEFORE: `| 8 | "Setahun, RM4,380" | wide shot of a pile of cash |`
- AFTER: `| 7 | "Secawan RM12…" | top-down cup, round rim centred at 40 % width | — |` → `| 8 | "…setahun, RM4,380" | top-down round wall clock, same position and size; hands sweep | "RM4,380" (12 × 365) fades in | composition-match-cut-to-compare |`

=== cards/08_Edit_Pacing/connecting-element-crosses-between-scenes--high-end-saas-transitions.md
Topic: "Kos hantar barang online — siapa tanggung?" (illustrative RM8 postage).
- BEFORE: shop table → cut → customer's door.
- AFTER: a small parcel slides off the seller's table L→R; cut mid-slide; it continues across a map card and lands at a door mat with an "RM8" tag in accent on "pos RM8".

=== cards/08_Edit_Pacing/cost-check-the-video-column--writing-for-motion-design.md
Topic: a nasi lemak stall's cost per pack (illustrative).
BEFORE: | 6 | "Sambal je makan RM1.20 sebungkus." | camera orbits a full 3D stall with steam sim and moving crowd | L |
AFTER: | 6 | same line | macro: a spoon of sambal on a banana leaf, top light; on "RM1.20" a price tag slides in | S |
(the orbit and crowd weren't what the line was about; the cost moves to L01's hook, where the stall is the subject.)

=== cards/08_Edit_Pacing/cross-cut-two-parallel-threads--juxtaposition-in-film.md
Topic: "Dua gerai nasi lemak, satu untung, satu rugi" (illustrative).
- BEFORE: L03–L05 all about gerai A, then L06–L08 about gerai B.
- AFTER: `| A3 | "Gerai A beli telur pukal" | egg tray, left-lit, warm |` → `| B3 | "Gerai B beli ikut papan" | single egg cartons, right-lit, cool |` → `| A4 | "Kos sebungkus RM2.10" |` → `| B4 | "Kos sebungkus RM2.80" |` → `| 7 | "Harga jual sama: RM3" | both packets side by side, margins RM0.90 vs RM0.20 grow as bars | converge |`

=== cards/08_Edit_Pacing/drop-the-voice-let-sound-carry--directing-without-words.md
Topic: a kedai's daily cash count (illustrative).
BEFORE: L09 "Dan bila dikira, jumlah jualan hari ni ialah RM1,240."
AFTER: L09 "Kira." → 1.2 s no voice: notes flip onto the counter one by one, real note-flick sound; the total "RM1,240"
grows in accent at the end of the gap → L10 "Tapi untung dia… RM180 je."

=== cards/08_Edit_Pacing/expanding-mask-wipe-transition--saas-explainer-masterclass.md
Topic: a kedai runcit's phone cutting from the receipt screen to the day's sales chart (illustrative RM figures).
- BEFORE: a full-frame glow+blur flash washes the screen white for two frames between scenes — reads as a crash-zoom.
- AFTER: the receipt panel's edge sweeps left and clears in 0.4 s, revealing the sales-chart screen that was already
  staged underneath — no flash, no blanket post effect.

=== cards/08_Edit_Pacing/eye-tracing-continuous-path--motion-graphics-technique-tutorial.md
Topic: a kedai basikal's tyre-pressure check (illustrative).
BEFORE: `| 5 | "Tayar kempis buang minyak" | tyre gauge appears top-right | reading drops | — |` then `| 6 | "...sampai RM2 sebulan" | RM counter appears bottom-left | — |` (eye must jump corner to corner).
AFTER: row 6's counter enters where row 5's needle ended (top-right), then a small coin-icon leads the eye down-left as the counter animates in → eye-tracing-continuous-path.

=== cards/08_Edit_Pacing/eyeline-match-chain-suspense--directing-without-words.md
Topic: a home-based kuih seller checking if one order covers her gas (illustrative).
BEFORE: one wide shot, numbers appear all at once.
AFTER (L07–L08 "Satu tong gas RM26… order ni RM30… jadi untung?")
1/5 gas tank valve (A), its shadow points right · 2/5 order slip on the counter (B) · 3/5 closer on the valve's price tag
"RM26" · 4/5 closer on "RM30" · 5/5 tank and slip together, hold 2 s; on "untung" a "RM4" tag grows between them in accent.

=== cards/08_Edit_Pacing/five-second-animation-test-before-full-build--motion-design-really-made.md
BEFORE: 60 s preview built, user rejects the camera speed in every shot.
AFTER (S16 how-to, gerai QR): test = rows 1–2 — macro QR stand, flight down to phone screen as "Scan je" lands (≈5 s);
user asks for slower landing; landing ease applied to all 22 rows before they're built.

=== cards/08_Edit_Pacing/focal-point-hookup-across-cut--storyboarding-masterclass.md
BEFORE: row 4 ends on a price tag at lower-right; row 5 opens on the calculator centred top. Eye jumps.
AFTER (pasar malam stall profit, illustrative): row 4 `exit focal: 62%,58%` — tag RM3.50 at lower-right of centre; row 5
`enter focal: 60%,55%` — calculator display showing RM3.50 − RM2.10 = RM1.40 placed at the same spot; the cut lands on
"untung".

=== cards/08_Edit_Pacing/freeze-frame-toggle-hold-mid-animation--saas-explainer-masterclass.md
Topic: a cinema app's "tiket disahkan" (ticket confirmed) badge that finishes its pop-in early but the line runs on.
- BEFORE: the badge's animation ends and it just sits there unattended, risking a late re-render edit if timing shifts.
- AFTER: the badge's local time is explicitly clamped at its last frame so it holds cleanly for however long the shot
  needs, independent of the rest of the scene's timing.

=== cards/08_Edit_Pacing/freeze-last-frame-extend-clip--shape-morphing-apple-ui.md
Topic: a kedai's QR payment app showing a loading spinner finishing into a checkmark (illustrative flow).
- BEFORE (AE habit): the checkmark animation is 12 frames long but the beat needs to hold it for 45 frames, so the
  last frame gets frozen and pasted 33 times.
- AFTER (raea): the checkmark's draw function is written as `t = clamp01((f-at)/12)`; at any `f` beyond `at+12` it
  simply keeps returning the completed checkmark — no padding step exists.

=== cards/08_Edit_Pacing/hand-drop-logo-intro-choreography--saas-explainer-masterclass.md
Topic: frame 0 of an app-install UI explainer — the brand logo needs to "land" on the home screen.
- BEFORE: the logo simply fades into the centre of the screen.
- AFTER: a small ripple/cursor glyph travels in on a curved path, "taps" with a brief scale pulse, the logo settles
  into place with a capped bounce, and the ripple clears off-path — no literal hand or finger drawn.

=== cards/08_Edit_Pacing/hold-a-near-empty-frame-as-a-dramatic-pause-beat--land-of-the-lustrous-negative-space.md
Topic: a small kedai forced to close after rent doubles (illustrative numbers).
BEFORE: the shutter-closing line gets the same busy macro object and camera move as every other beat.
AFTER: shot-list row: `| 9 | "Kedai tutup." | static hold, the shutter tiny at the bottom third of a mostly empty
dark frame | nothing else moves for this ~2 s beat | pause-beat |`

=== cards/08_Edit_Pacing/hub-shape-morph-transition--apple-ui-widget-pop-ups.md
Topic: a kedai runcit's "jualan harian" dashboard scene handing off to its "untung bulanan" scene (illustrative).
- BEFORE: a hard cut or a generic cross-dissolve between the two dashboard cards.
- AFTER: the daily-sales ring's highlight stroke retracts, the icon and "RM120" fade out, then the ring itself shrinks,
  its stroke brightens to white and its fill turns from gray to the accent gold while the background panels crossfade
  to the monthly-view palette — the same ring then grows the new "untung bulanan" card around itself.

=== cards/08_Edit_Pacing/impact-accent-tied-to-a-real-state-change-not-a-flash--sony-animation-goat.md
Topic: a receipt total completing a calculation (illustrative).
BEFORE: the final total appears with a generic white flash across the frame.
AFTER: shot-list event: "on the final digit, the receipt's printed total briefly takes the brand accent colour and
the paper texture catches a harder highlight — no overlay, the object itself changes."

=== cards/08_Edit_Pacing/light-continuity-match-cut--apple-commercial-breakdown.md
Topic: "Kenapa kedai makan 24 jam boleh untung waktu malam" (illustrative).
- BEFORE: `| 5 | "Pukul 2 pagi, jalan dah sunyi" | wide of an empty street | — |` cut to `| 6 | "tapi dapur masih panas" | macro of a wok | flame grows |` — two unrelated shots.
- AFTER: `| 5 | "Pukul 2 pagi, jalan dah sunyi" | low macro over a wet road, one headlight beam sweeps left→right | beam reaches frame right at y≈45 % on "sunyi" | light-continuity-match-cut |`
  `| 6 | "tapi dapur masih panas" | macro of the wok rim, same warm-white beam colour enters frame left at y≈45 % and becomes the stove glow | glow settles on the wok over 0.6 s eased; accent on the RM12 (illustrative) price tag in the steam | light-continuity-match-cut |`

=== cards/08_Edit_Pacing/longer-lens-tighter-framing-fakes-density--invisible-line.md
Topic: a small bakery's single display shelf (minimal build).
BEFORE: wide lens on the shelf reveals the empty unbuilt sides of the stall, reading as a bare set.
AFTER: longer lens, tighter framing on just the shelf and the hero pastry — the compression makes the shelf's few
items feel stacked and dense, and the unbuilt sides never enter frame.

=== cards/08_Edit_Pacing/match-cut-as-base-for-morph-transition--animation-technique-guide.md
Topic: "Beli guna ansuran 3 bulan — tarikh yang korang kena ingat" (no rate or fee claims).
- BEFORE: cut from a phone checkout screen to a calendar.
- AFTER: base match: round "Pay" button → round calendar date circle, same screen spot. Add-on: the button's accent ring expands across the cut into the circle around "15 haribulan". Secondary: three more date circles light up in sequence on "tiga bulan".

=== cards/08_Edit_Pacing/match-cut-at-the-fastest-frame--ae-morph-match-cuts.md
Topic: "Kenapa kedai dobi layan diri guna token, bukan syiling" (illustrative).
- BEFORE: `| 6 | "Korang masuk syiling RM1…" | macro coin | — |` hard cut → `| 7 | "…mesin bagi token" | macro token | token pops in |`
- AFTER: `| 6 | "Korang masuk syiling RM1…" | macro coin on the counter, starts sliding right and turning | coin accelerates on "syiling" | match-cut-at-the-fastest-frame |`
  `| 7 | "…mesin bagi token" | same path continues: token decelerates into frame centre, turn finishes 180° | cut at the peak lands on "token"; accent ring lights the token 0.4 s later | match-cut-at-the-fastest-frame |`

=== cards/08_Edit_Pacing/match-cut-setup-discipline--match-cut-cinematic-breakdown.md
Topic: a gerai's plastic cup sizes (illustrative numbers).
BEFORE: `| 3 | "Cawan kecil, sederhana, besar" | three different camera angles, one per cup | cups appear | — |`
AFTER: `| 3 | "Cawan kecil, sederhana, besar" | ONE locked top-light macro framing, cups centred on the same grid point | small cup → medium cup → large cup, only scale changes, cut on each size word | match-cut-setup-discipline |`

=== cards/08_Edit_Pacing/momentum-match-cut-at-peak-speed--mastering-match-cut.md
Topic: "Kedai runcit — kenapa barang laku letak paras mata" (phrase as the shop's layout choice; no sales-uplift numbers).
- BEFORE: shelf wide → cut → product macro, both static.
- AFTER: camera pans left along a shelf, accelerating; cut at peak speed on "paras mata"; B: a row of packs sliding left on a counter at the same speed, easing to stop with the eye-level pack centred, price tag in accent.

=== cards/08_Edit_Pacing/motion-direction-matches-the-spoken-verb--animation-technique-guide.md
Topic: "Harga ayam naik, harga nasi ayam?" (illustrative).
- BEFORE: `| 2 | "Harga ayam naik, untung turun" | macro on a chicken price tag | — |`
- AFTER: `| 2 | "Harga ayam **naik**, untung **turun**" | macro on a chicken price tag beside a nasi ayam plate tag | on "naik" the chicken tag rises 15 % frame height in accent red; on "turun" the plate's "untung" tag slides down 15 %, eased 0.5 s each | motion-direction-matches-verb |`

=== cards/08_Edit_Pacing/null-rig-zoom-whip-transition--saas-explainer-masterclass.md
Topic: a laundromat app's "pilih mesin" (choose a machine) screen handing off to the "bayar" (pay) screen.
- BEFORE: a hard cut between the two UI screens.
- AFTER: the camera eases into the chosen machine icon until it fills frame, cuts on the fill, then eases back out of
  that same icon into the payment screen — built from the machine icon, not a blank colour field.

=== cards/08_Edit_Pacing/pacing-shift-fast-cuts-to-slow-cinematic--match-cut-cinematic-breakdown.md
Topic: a kedai runcit's daily plastic-bag cost add-up (illustrative).
BEFORE: 6 quick bag-count cuts, then the RM total appears in the same rhythm, no shift.
AFTER: 6 quick bag-count cuts (Mechanism) → one whoosh cue → RM450/month total setup held slightly longer, framed with more care (counter catching the light) → pacing-shift-fast-cuts-to-slow-cinematic.

=== cards/08_Edit_Pacing/peak-velocity-pass-through-hides-impossible-move--three-mograph-techniques.md
Topic: "Satu modal, dua gerai" (illustrative).
- BEFORE: `| 7 | "Satu modal, dua gerai" | coin on a table; cut to two coins | — |` (two unrelated frames).
- AFTER: `| 7 | "Satu modal, **dua** gerai" | macro top-down on one RM1 coin on a wooden counter | coin slides right, eased in-out over 0.6 s; at the speed peak (on "dua") the mesh swaps to two coins drifting apart; they settle eased under two small stall-roof models | peak-velocity-pass-through |`

=== cards/08_Edit_Pacing/plan-before-talent-lands-seven-minutes--invisible-line.md
Topic: any episode's preview review.
BEFORE: the preview review surfaces "this setup needs a completely different light" or "this shot needs a different
angle" — a planning-stage decision discovered too late.
AFTER: those decisions were made and checked at the grey-box board stage; the preview review only adjusts timing,
colour level and minor nudges — no new setups invented at that point.

=== cards/08_Edit_Pacing/repeated-word-anchor-match-cut--animate-like-dodford.md
Topic: three different kedai runcit receipts, all with a "SST 6%" line (illustrative).
BEFORE: three receipt photos shown full-frame, one after another — the viewer has to re-find the SST line each time.
AFTER: each receipt scaled/positioned so "SST 6%" sits centre-frame at the same spot, cut every ~8 frames, a thin underline reveals under it on the first receipt only → repeated-word-anchor-match-cut.

=== cards/08_Edit_Pacing/rotation-only-continuity-transition--3d-camera-transitions-pt2.md
Topic: a kedai gunting rambut's clippers switching on (illustrative).
BEFORE: camera flies in to sell the clippers' entrance.
AFTER: camera holds static; the clippers themselves rotate in from +20° settling to 0°, still decelerating on the cut to the next line → rotation-only-continuity-transition.

=== cards/08_Edit_Pacing/same-motion-cut--high-end-saas-transitions.md
Topic: "Kenapa kedai tutup walaupun ramai pelanggan" (generic cash-flow arithmetic, illustrative).
- BEFORE: L07 receipt text fades; cut; L08 a bill appears.
- AFTER: L07 "Jualan RM8,000" slides L→R across a receipt; cut on "tapi"; L08 "Kos RM8,500" slides L→R at the same height and speed over a pile of bills, accent red.

=== cards/08_Edit_Pacing/shift-cut-rate-at-the-turn--how-to-pace-your-film.md
Topic: "Bayar minimum kad kredit je — apa jadi?" (plain arithmetic, illustrative).
- BEFORE: L07–L10 all 3 s setups.
- AFTER: L07 3 s macro on the statement "Bayar minimum RM50"; L08 "**tapi** baki RM5,000 tak bergerak" — on "tapi" rate ↑: three 1.7 s setups (statement → calendar pages → the same RM5,000 figure); L09 rate ↓: one 4 s slow push-in on the total, accent red on the number.

=== cards/08_Edit_Pacing/shot-size-ladder-in-the-shot-list--shot-sizes-explained.md
Topic: "Mesin layan diri dobi — RM5 untuk apa?" (illustrative).
- BEFORE: rows 1–5 all "macro of the washing machine".
- AFTER: 1 `ECU · coin slot with an RM5 token` → 2 `FS · whole machine, front` → 3 `EST · row of machines in a night shop` → 4 `MCU · drum + display counting 30 min` → 5 `CU · the display "RM5 = 30 min"` (accent).

=== cards/08_Edit_Pacing/shutter-click-sfx-matched-and-varied--match-cut-cinematic-breakdown.md
Topic: a resit (receipt) total counting up through 5 items (illustrative RM values).
BEFORE: 5 quick item-add cuts, silent except the music bed.
AFTER: `| 6 | "Item satu... dua... tiga..." | locked receipt macro framing, line adds per cut | each line-add gets one click, pitched up slightly each time | shutter-click-sfx-matched-and-varied |`

=== cards/08_Edit_Pacing/silence-drop-before-the-reveal--suspense-documentary.md
Topic: "Gerai cendol — untung sebenar sebulan" (illustrative).
- BEFORE: bed runs flat under L09 "Untung bersih RM2,400 sebulan."
- AFTER: `| 9 | "Untung bersih…RM2,400 sebulan." | subtle push on the bowl | bed drops to silence 0.5 s before "untung"; counter stops at RM2,400 in silence; bed returns 0.4 s after | silence-drop-before-the-reveal |`

=== cards/08_Edit_Pacing/single-owner-transition-pass--motion-design-really-made.md
BEFORE: joins chosen shot by shot; four flights in a row, one crossfade.
AFTER (pasar malam profit, illustrative): `1→2 cut on "tapi"` · `2→3 morph: price tag RM3.50 → bar in chart` ·
`3→4 flight through the cash box slot` · `4→5 cut on "untung"`; crossfade removed.

=== cards/08_Edit_Pacing/sound-subtext-juxtaposition--juxtaposition-in-film.md
Topic: "Hutang BNPL — kenapa cepat sangat bertambah" (illustrative numbers).
- BEFORE: whoosh on every setup change; cash-register ding on every number.
- AFTER: no SFX except one: `| 7 | "Lewat sebulan, caj tambah RM15…" | macro of the phone's due-date screen | faint kettle hiss rises under the line and cuts at "RM15" | sound-subtext-juxtaposition |` + the outro signature.

=== cards/08_Edit_Pacing/sound-tempo-sets-scene-urgency--how-to-pace-your-film.md
Topic: "Sewa kedai lambat bayar" (illustrative: a tenancy agreement with a RM50 late charge written into it; RM1,500 rent).
- BEFORE: generic upbeat bed, a whoosh on every cut.
- AFTER: steady pulse bed; on L05–L07 a macro on a wall clock over the rent envelope, one soft tick per second following the second hand; tick stops dead on L09 "RM1,550" (accent).

=== cards/08_Edit_Pacing/speed-to-value-frontload-first-hit--irresistible-hooks.md
Topic: comparing pack sizes at a pasaraya (how-to).
BEFORE: L01 "Ramai orang suka beli pek besar." L02 "Sebab rasa lebih jimat." L03 "Tapi betul ke?" L04 "Hari ni saya
tunjuk 3 cara…" (first usable tip at ~12 s).
AFTER: L01 "Pek besar tak semestinya lagi murah." L02 "Tengok harga per 100g, bukan harga tag." (value at ~3 s) L03
"Pek 500g RM8.50, so RM1.70 per 100g. Pek 200g RM3.20, so RM1.60." (arithmetic check: 8.50÷5 = 1.70; 3.20÷2 = 1.60).

=== cards/08_Edit_Pacing/stack-beats-in-one-take--overwatch-dragons-camera.md
Topic: "Satu resit kedai runcit — ke mana duit RM50 korang pergi" (illustrative).
- BEFORE: `| 5 | "Duit masuk laci" | macro cash drawer |` cut `| 6 | "terus ke pembekal" | macro supplier invoice |`
- AFTER: `| 5 | "RM50 korang masuk laci…" | follow the folded RM50 note sliding across the counter | — | stack-beats-in-one-take |`
  `| 6 | "…tapi RM41 terus ke pembekal" | same take: note stops against the invoice clip, camera stops with it; the invoice is revealed | "RM41" fades in on the invoice on "RM41" | stack-beats-in-one-take |`

=== cards/08_Edit_Pacing/static-anchor-world-slides-past--animate-like-apple.md
Topic: confirming a RM50 top-up on a phone (illustrative amount).
- BEFORE: a hard cut from "confirm screen" to "receipt screen."
- AFTER: the "Sahkan" (confirm) button stays dead centre and still; the confirm screen's background and labels slide
  left past it while the receipt screen's background and "RM50" slide in from the right — one continuous push, no cut,
  and the button is always exactly where the viewer expects to find it.

=== cards/08_Edit_Pacing/three-transition-chooser-morph-overlay-cut--high-end-saas-transitions.md
Topic: "Terima bayaran online untuk kedai kek rumah — 3 step" (generic steps).
- BEFORE: every join "cut".
- AFTER: L03→L04 `join: overlay — the phone rises from the bottom to fill the frame` ; L04→L05 `join: cut-design — the order card layout repeats in the payment screen` ; L05→L06 `join: morph — the round "Paid" badge becomes the round cake top` ; L06→L07 `join: cut-motion — text and cake both slide in left→right`.

=== cards/08_Edit_Pacing/top-down-staging-plan-before-3d--storyboarding-masterclass.md
BEFORE: shot list goes straight to 3D; rows 3 and 6 both end up front-on to the QR stand.
AFTER (map, gerai nasi lemak QR how-to): `C1` low front of QR stand · `C2` top-down over phone · `C3` side grazing along
counter · `C4` behind the stand looking at the customer's phone screen; rows cite `C1→C2` etc.; row 6 moved from `C1`
to `C3` because the map showed a repeat.

=== cards/08_Edit_Pacing/vary-pace-slow-build-fast-peak--suspense-documentary.md
Topic: "Bayar minimum kad kredit — berapa lama nak habis?" (illustrative arithmetic).
- BEFORE: 24 setups all 2.5 s.
- AFTER: L03–L05 build at 3.5 s; L06–L08 ("RM5,000… bayar RM150 sebulan… faedah makan separuh") at 2 s each; L09 payoff "Hampir 4 tahun" held 3 s.

=== cards/08_Edit_Pacing/whole-scene-swap-at-match-cut--ae-morph-match-cuts.md
Topic: "Dari mana datangnya stok kedai runcit" (illustrative).
- BEFORE: `| 8 | "Barang ni sampai dari gudang" | cut to a warehouse wide shot | crates appear |`
- AFTER: `| 7 | "Satu kotak susu atas rak…" | macro carton on a kedai runcit shelf, slides right, accelerating | — | whole-scene-swap-at-match-cut |`
  `| 8 | "…asalnya dari gudang pemborong" | at the peak (on "gudang") the carton continues right onto a pallet; dark concrete floor replaces the shelf; pallet slats slide right and ease out | 2 more cartons grow in 0.4 s behind; "gudang" label fades in | whole-scene-swap-at-match-cut |`

=== cards/08_Edit_Pacing/withhold-the-payoff-cutaway--suspense-documentary.md
Topic: "Berapa sebenarnya kos sebiji burger RM6?" (illustrative).
- BEFORE: `| 2 | "Kos dia…RM4.20" | counter shows RM4.20 immediately |`
- AFTER: `| 2 | "Burger RM6. Kos dia berapa?" | macro receipt, cost counter rolls RM0.00 → RM2.?? and still rolling | cut away on "berapa" | withheld → 9 |` … `| 9 | "Kos semua: RM4.20. Untung RM1.80." | same receipt framing, counter resumes and stops at RM4.20 on the word | resolve ← 2 |`

=== cards/09_UI_Motion/3d-tilt-in-partial-rotation-hero-entrance--saas-motion-graphics-masterclass.md
Topic: a "Bayar" pay button is the frame-0 hero for a QR-payment how-to (illustrative RM amount).
- BEFORE: the button fades in flat and static.
- AFTER: the button flies toward camera and down over ~1.2 s, tilting on X only; it settles holding a slight ~4° tilt
  (not flat), then the "Bayar" label and icon pop in a few frames later.

=== cards/09_UI_Motion/accent-word-colour-after-line-lands--ae-text-animation.md
Designed line: "Bayar yang lagi murah."
- BEFORE: "murah" appears already in accent as it rises.
- AFTER: the full line rises white; 0.2 s after "murah" lands, it warms into the accent over 0.4 s as the voice ends.

=== cards/09_UI_Motion/click-echo-trail-ripple-feedback--motion-explainer-3-scenes-part2.md
Topic: tapping "confirm" on a kedai runcit's QR-payment screen (illustrative UI).
- BEFORE: the confirm button just scales down with no sense of a finger/cursor arriving.
- AFTER: a small accent dot slides in with a 3-copy fading trail, landing on the button exactly as it scales down on "confirm".

=== cards/09_UI_Motion/color-key-remove-recording-background--shape-morphing-apple-ui.md
Topic: showing the real bank app's transfer-confirmation screen inside a Style D phone shot (illustrative data on screen).
- BEFORE: a screen recording of the confirmation screen sits in its own white-bordered rectangle, visibly a separate clip.
- AFTER: the recording's white ground is keyed out so only the confirmation card appears, sitting flush on the
  episode's own panel colour as if it were drawn there.

=== cards/09_UI_Motion/controller-shape-drives-linked-siblings--animate-like-apple.md
Topic: a QR code card on a phone growing to confirm a RM12.80 payment (illustrative amount).
- BEFORE: the card's fill, its white rim and its shadow are animated with three separate keyframe sets — on a late script
  change to the card's size, only the fill is resized and the rim/shadow look detached.
- AFTER: the card's `width`/`height`/`borderRadius` are the single source; rim and shadow read the same three values every
  frame, so resizing the card (a script edit, a different device mock) moves all three together with zero extra work.

=== cards/09_UI_Motion/dashed-flight-path-lines-between-points--motion-explainer-ads-part3.md
Topic: a kedai runcit franchise with branches across a state (illustrative generic network, not a real company's data).
- BEFORE: a map shows dots for each branch with no sense of a connected network.
- AFTER: dashed lines draw between the branch dots exactly on "20 cawangan", all appearing together as one revealed network.

=== cards/09_UI_Motion/depth-position-parallax-single-key--saas-motion-30min.md
Topic: a cursor tapping "Bayar" as the whole screen match-cuts to the next step (illustrative UI).
- BEFORE: the cursor and the UI card use the same 2D position key and the same screen speed — flat, no depth.
- AFTER: the UI card stays at its scene depth; the cursor is pushed closer to camera (same shared key, smaller scale,
  repositioned to compensate) — it now visibly races ahead of the card during the push, with zero extra keyframes.

=== cards/09_UI_Motion/designed-in-between-shape-not-auto-interpolate--perfect-shape-morphs-after-effects.md
Topic: "Ikon kedai runcit bertukar jadi grafik carta" (illustrative — a shop-icon morphs into a bar-chart icon on
"lihat jualan").
BEFORE: shop icon (roof + door, all straight lines) morphs directly into chart bars (all straight lines) using the
engine's default blend — looks fine by luck, since both ends are rectilinear, so no hand-design needed.
AFTER (contrast case): a coin icon (all curves) morphing into the same chart bars would need a hand-authored
in-between that bridges "round" to "rectilinear" deliberately (e.g. a rounded-rectangle midpoint) rather than letting
the engine crush the circle into jagged rectangles mid-morph.

=== cards/09_UI_Motion/detour-morph-through-associated-shapes--high-end-saas-transitions.md
Topic: "Kenapa kena simpan resit bisnes" (generic record-keeping).
- BEFORE: stack of receipts → cut → a folder.
- AFTER: the receipt stack (square) compresses into a pill-shaped tag on "simpan"; the tag duplicates into five tags linked into a chain labelled Jan–Mei on "lima bulan rekod"; accent on the current month.

=== cards/09_UI_Motion/direction-matched-slide-text-to-logo--saas-match-cut-resolve.md
Topic: "Terima bayaran QR di gerai — 3 step" (illustrative).
- BEFORE: "Step 1: daftar akaun merchant" fades out; the bank app icon fades in 0.5 s later.
- AFTER: on "daftar", the step line slides left (30 f, 75 % ease); at the peak it cuts to the real app icon still sliding left, settling centre on "app" — the accent outline grows round the icon 0.4 s later.

=== cards/09_UI_Motion/floating-widget-cards-camera-tour--apple-style-ui-ad.md
Topic: a 3-step QR top-up at a kedai runcit (illustrative generic steps).
- BEFORE: three separate flat screenshots cut between with no spatial relationship.
- AFTER: the camera flies past three floating cards arranged around the phone — "scan" card lights up on "satu", "confirm"
  card's amount counts up on "dua", "done" card's check mark draws on "tiga" — then the camera pulls back to the phone alone.

=== cards/09_UI_Motion/hand-built-icon-pen-trim-path--saas-explainer-masterclass.md
Topic: a kedai runcit's 3-step QR setup (illustrative generic steps).
- BEFORE: three stock icon PNGs fade in together — no sense of sequence or system.
- AFTER: the "scan", "confirm", "done" icons each draw on stroke-first exactly on "satu", "dua", "tiga", sharing one
  stroke weight and one draw-on duration so the three feel like one built set.

=== cards/09_UI_Motion/hold-frames-flat-color-no-gradient-swap--perfect-shape-morphs-after-effects.md
Topic: "Resit berubah warna bila diskaun disahkan" (illustrative - a receipt icon's total turns from black to the
brand accent colour on "sah").
BEFORE: the total's colour is keyed black -> accent with normal interpolation; for two frames it reads as an
unplanned dark-red/brown blend that looks like a rendering error.
AFTER: both colour keys are held (snap); the total is simply black, then simply accent, with no in-between hue -
matching the house's flat, single-accent palette exactly.

=== cards/09_UI_Motion/hub-spoke-build-once-mirror-duplicate--saas-motion-graphics-masterclass.md
Topic: a kedai runcit's one POS terminal feeds three things — stok, jualan, untung (illustrative labels/numbers).
- BEFORE: three labels fade in together next to the terminal.
- AFTER: the terminal's three tendrils draw out one after another (stok, then jualan starting before stok settles,
  then untung), each ending on its own labelled node — a single continuous cascade, not three pops.

=== cards/09_UI_Motion/inner-glow-drop-shadow-stack-elevation--saas-explainer-masterclass.md
Topic: a phone UI card showing "3 tempahan baru" (3 new orders) for a small catering stall (illustrative count).
- BEFORE: the order card is a flat rounded rectangle with no shadow.
- AFTER: the same card gets a soft drop shadow and a faint white inner glow at its top edge — it now reads as a card
  resting slightly above the app background, still flat and clean.

=== cards/09_UI_Motion/instanced-shape-morph-with-spin--saas-match-cut-resolve.md
Topic: "Macam mana nak tahu review Shopee tu betul" (S16, illustrative; no claim about the platform's system).
- BEFORE: 5 stars fade out; a "real buyer?" tick icon fades in.
- AFTER: on "betul", the 5th star slides right spinning from 200° on a 30-frame sharp curve; at frame 15 it is a magnifier icon that lands upright on "betul ke" — the step title follows.

=== cards/09_UI_Motion/keep-line-centred-while-words-reveal--ae-text-animation.md
End text (≤ 7 words): "50%… dari harga apa?"
- BEFORE: words appear in place; "50%…" sits far left, the eye jumps right as "apa?" lands.
- AFTER: the line drifts from right to centre as each word rises; when "apa?" lands the line is centred and still.

=== cards/09_UI_Motion/letter-by-letter-text-reveal-position-opacity-ramp--imperial-3d-animate-tutorial.md
Topic: the register total resolving to "RM 450" at month's end (illustrative).
BEFORE: "RM 450" cuts in as a flat static title.
AFTER: each character slides up and fades in left to right over ~1 s, eased so it starts slow and lands with a
settle; it holds through the line, then exits in a faster ~0.3 s.

=== cards/09_UI_Motion/mask-path-scrub-progress-indicator--animate-like-apple.md
Topic: a savings goal bar filling as "RM300 daripada RM500" is said (illustrative numbers).
- BEFORE: the bar just appears already 60% full.
- AFTER: on "RM300", the accent fill eases from 0 to 60% of the track, landing exactly as the number is said.

=== cards/09_UI_Motion/masked-blur-protects-text-legibility-while-faking-dof--eye-catching-3d-scenes.md
Topic: a phone-banking app screen showing a transfer fee breakdown.
BEFORE: camera DoF set to focus on the fee line blurs the background app UI behind it into an unreadable smear that
also catches the edge of the fee text itself.
AFTER: DoF disabled; a masked, feathered blur covers only the area behind/below the phone screen (the dark room), while
the entire phone UI — including the fee text — stays pixel-sharp.

=== cards/09_UI_Motion/match-cut-symmetric-half-shape-duplicate-flip--perfect-shape-morphs-after-effects.md
Topic: "Logo kedai bertukar bentuk ikut waktu operasi" (illustrative — a symmetric storefront icon folds into a
clock icon on "buka 24 jam").
BEFORE: both halves of the storefront-to-clock morph are keyed by hand twice (left and right), doubling the work and
risking the two sides drifting apart by a frame.
AFTER: only the left half is animated; the right half is `mirrorPathX(left)`, always in sync; the handover from
"storefront-half" to "clock-half" layers happens at the one frame both halves are built to match exactly, so the cut
is invisible.

=== cards/09_UI_Motion/menu-pill-expand-path-morph-synced-icons--animate-like-apple.md
Topic: a kedai runcit app's pill toggle for "Bayar" vs "Simpan" (illustrative labels).
- BEFORE: a small round button pops into a wide bar with both options already inside it.
- AFTER: on "pilih", the pill's two sides stretch open together (left edge out, right edge out), and the "Bayar" and
  "Simpan" icons ride each side out to the new edges in the same eased move — reads as one continuous open gesture.

=== cards/09_UI_Motion/multiply-blend-merge-flat-graphic--shape-morphing-apple-ui.md
Topic: a kedai's closing-time countdown on a phone screen (illustrative).
- BEFORE: an imported stopwatch icon sits on the UI panel inside a visible light-gray box (its own baked background).
- AFTER: the layer is set to multiply blend over the panel colour; the box disappears and only the stopwatch linework
  shows.

=== cards/09_UI_Motion/odometer-counter-swappable-unit-symbol--saas-explainer-masterclass.md
Topic: a kedai runcit saving RM300 a month by catching expired stock early (illustrative).
- BEFORE: "RM300" appears already complete, static.
- AFTER: on "tiga ratus", the counter runs RM0 → RM300 in 0.8 s, landing exactly on the word, the digits turning from
  white to the brand accent as they settle.

=== cards/09_UI_Motion/overlay-rise-to-cover-transition--high-end-saas-transitions.md
Topic: "Nak terima tempahan nasi kerabu guna WhatsApp Business — 3 step" (generic, no feature claims beyond catalogue/labels).
- BEFORE: `| 3 | "Ni caranya, tiga step je" | macro of the nasi kerabu plate | cut to app screen |`
- AFTER: `| 3 | "Ni caranya, **tiga step** je" | macro on the plate | a phone rises from the bottom over 0.6 s, eased, fills the frame on "tiga step" | overlay-rise |` → `| 4 | "Step satu, buat katalog" | inside the phone: catalogue screen | first item card slides in | — |`; later overlay variant: an order slip slides down from the top to cover.

=== cards/09_UI_Motion/point-correspondence-vertex-count-and-first-vertex--perfect-shape-morphs-after-effects.md
Topic: "Ikon dompet digital bertukar jadi resit" (illustrative — wallet icon morphs into a receipt icon on "lepas
scan").
BEFORE: wallet path (5 points) and receipt path (9 points) interpolated directly; on "lepas scan" the wallet
corners fly to the nearest receipt points and the shape briefly looks like a crushed triangle.
AFTER: resample the wallet path to 9 points, set both paths' first vertex at the icon's top-left corner, then morph —
the wallet's top edge opens cleanly into the receipt's top edge on "lepas scan."

=== cards/09_UI_Motion/press-feedback-darken-not-lighten--saas-motion-30min.md
Topic: tapping "Hantar" (send) to submit a kedai runcit stock order (illustrative UI).
- BEFORE: "Hantar" scales up 5% and brightens on tap.
- AFTER: "Hantar" dips to 94% scale and darkens briefly on "tekan," then recovers — reads as a physical press, not a
  decorative pop.

=== cards/09_UI_Motion/radial-carousel-one-rotation-value--saas-motion-30min.md
Topic: four reasons a pasar malam stall uses a simple ledger app — "jualan, kos, untung, stok" (illustrative keywords).
- BEFORE: four static labels appear one after another with independent fade-ins.
- AFTER: four dots are placed once at 90° apart around a hub; one rotation value steps the group through four stops,
  and each keyword fades in exactly as its dot reaches the active slot — one authored value drives both the motion and
  the four label swaps.

=== cards/09_UI_Motion/rebuild-screenshotted-ui-as-separate-layers--apple-style-ui-ad.md
Topic: a kedai runcit's QR-payment app confirming a sale (illustrative screen).
- BEFORE: a screen-recording plays while the agent/editor narrates over it — nothing can be isolated or re-timed.
- AFTER: the confirm button, the status dot and the amount are each their own component; the button presses exactly on
  "tekan", the status dot flips to accent exactly on "confirm" — both independently timed to the voice.

=== cards/09_UI_Motion/same-design-cut--high-end-saas-transitions.md
Topic: "Semak duit masuk sebelum serah barang" (generic).
- BEFORE: order chat screen → cut → banking app screen, different layouts.
- AFTER: the chat's green "RM120 diterima?" bar sits at y 62 %; cut on "semak"; the banking screen's green "RM120 masuk" bar is at the same y and slides up 4 % on both sides of the cut.

=== cards/09_UI_Motion/segment-indicator-slide-with-text-colour-swap--animate-like-apple.md
Topic: switching a kedai runcit app from "Bayar" to "Simpan" tab (illustrative labels).
- BEFORE: the indicator slides, and a moment later the label colour cross-fades on its own timer.
- AFTER: the glass indicator slides to "Simpan" on the word; the instant it settles, "Simpan" snaps to bold white and
  "Bayar" snaps back to muted grey — the colour change reads as confirmation, not decoration.

=== cards/09_UI_Motion/shape-to-shape-morph-transition--high-end-saas-transitions.md
Topic: "Bayar sewa gerai guna DuitNow QR" (generic flow; no fee claims).
- BEFORE: `| 5 | "Scan QR kat tiang" | macro on a QR sticker | — |` cut to `| 6 | "Masuk amaun RM350" | phone screen | — |`
- AFTER: `| 5 | "Scan QR kat tiang" | macro on the square QR sticker | QR stand and pole fade out 0.4 s; the square stretches to a tall rounded rectangle | shape-to-shape-morph |`
  `| 6 | "Masuk amaun **RM350**" | the rectangle is now the phone screen | keypad and amount field grow in around it 0.4 s; "RM350" in accent | shape-to-shape-morph |`

=== cards/09_UI_Motion/sharp-peak-curve-zoom-through-text-swap--saas-match-cut-resolve.md
Topic: "Sale 70 % — betul ke murah?" (S16 how-to, numbers illustrative).
- BEFORE: line "Harga asal RM100" fades out, then "Lepas diskaun RM70" fades in (two separate 0.4 s fades, dead air between).
- AFTER: on "lepas", "Harga asal RM100" shrinks toward the price tag on a 75 % ease; at the peak frame it cuts to
  "RM70" arriving from 2.2× scale and settling on "tujuh puluh" — one gesture, 0.67 s.

=== cards/09_UI_Motion/single-word-emphasis-pulse-adapted-from-wiggle--motion-explainer-3-scenes-part2.md
Topic: a script line asking whether a "sale" at a kedai is real or fake (illustrative).
- BEFORE: the word "tipu" (fake) sits flat with the rest of the sentence.
- AFTER: "tipu" alone pulses once (+8% scale, 0.3 s) exactly as it's spoken, then settles — the rest of the line stays still.

=== cards/09_UI_Motion/single-word-emphasis-secondary-move--ae-text-animation.md
Designed line in a phone-UI setup: "Harga asal tu tak pernah wujud."
- BEFORE: whole line accent-coloured and bold.
- AFTER: line lands white; 0.4 s later "wujud" leans ~20° and thickens to semibold in the accent while the voice
  stresses it.

=== cards/09_UI_Motion/soft-overlap-bleed-intertwine--three-mograph-techniques.md
Topic: "Duit bisnes vs duit peribadi — kenapa kena asingkan" (illustrative).
- BEFORE: two flat circles labelled "Bisnes" and "Peribadi" overlapping; one simply sits on top.
- AFTER: the two circles interlock like chain links; in the overlap the RM200 (illustrative) "duit bercampur" shows as a faint blurred bleed; the accent (green) is only on the "Bisnes" ring, which pulls free on "asingkan".

=== cards/09_UI_Motion/sound-wave-bars-expanding-mask-reveal--saas-explainer-masterclass.md
Topic: a kedai runcit's app showing a live transaction-volume graphic (illustrative shape, generic values).
- BEFORE: a bar chart fades in all at once — flat.
- AFTER: on "setiap transaksi", the bars grow outward from the centre bar first, outer bars landing a beat later,
  reading as the chart assembling itself.

=== cards/09_UI_Motion/split-screen-side-by-side-compare--juxtaposition-in-film.md
Topic: "Bayar dengan kad vs QR di kedai — mana lagi cepat" (illustrative timings).
- BEFORE: two separate scenes, 6 s each.
- AFTER: top panel = card terminal flow (insert, PIN, approved, 3 steps), bottom = QR flow (scan, confirm, done, 3 steps); both in sync; a timer in accent shows "8 s" vs "5 s" on "lagi cepat".

=== cards/09_UI_Motion/staged-sentence-reveal-hold-then-rest--ae-text-animation.md
End text: "Diskaun 50%… dari harga apa?"
- BEFORE: all five words stagger in one sweep before the voice reaches "dari".
- AFTER: "Diskaun 50%…" rises with the voice and holds; "dari harga apa?" rises on "dari".

=== cards/09_UI_Motion/storyboard-kanban-card-assembly--saas-explainer-masterclass.md
Topic: a tuition centre's weekly booking board — 3 students booked this week (illustrative count).
- BEFORE: all three booking rows fade in at once inside a static card.
- AFTER: the card appears, then each student's row populates top-down 4 frames apart, each settling with a tiny bounce,
  reading as the board actively filling rather than a static screenshot.

=== cards/09_UI_Motion/stroke-stretches-and-splits-into-two-shapes--three-mograph-techniques.md
Topic: "Bayar RM1,200 sekali atau 3 × RM400?" (plain arithmetic).
- BEFORE: a static bar labelled RM1,200, then a cut to three bars.
- AFTER: one grey line "RM1,200" stretches on "sekali"; its accent-green end pulls away; at full speed it splits into rings that open from flat to full, each tagged RM400, on "tiga kali".

=== cards/09_UI_Motion/tab-card-ui-recipe-icon-badge-gradient-button--saas-explainer-masterclass.md
Topic: a small bakery's order-queue UI showing "Kek coklat — RM45" (illustrative price).
- BEFORE: a plain white rectangle with text pasted on top.
- AFTER: a card with a subtle back-layer + hairline border, a cake icon tile with its own glow, "Kek coklat" bold over
  "RM45 · baru" in lower-opacity meta text, and a gradient "Sahkan" (confirm) button beside it.

=== cards/09_UI_Motion/tapered-flow-line-motif--saas-explainer-masterclass.md
Topic: a kedai runcit receiving an e-wallet payment that lands in its account the same second (illustrative).
- BEFORE: a static arrow icon between phone and bank — no sense of movement.
- AFTER: on "terus masuk", one tapered line draws from the phone to the bank icon, its colour travelling from white to
  the brand accent as it goes, with two fainter duplicate lines behind it suggesting a steady flow.

=== cards/09_UI_Motion/text-flies-in-from-depth-per-character-3d--saas-motion-30min.md
Topic: the episode's closing wordmark "Meikigo" settling into frame before the end card (brand logo, real).
- BEFORE: "Meikigo" fades up in 2D, same recipe as every other label in the episode.
- AFTER: each letter of "Meikigo" flies in from deep Z toward the camera on a staggered per-character ramp, landing in
  its resting position and in-focus just as the voice line ends — reserved for this one brand moment.

=== cards/09_UI_Motion/text-scatter-and-reform-morph--high-end-saas-transitions.md
Topic: "Jual kuih RM1 seketul — mana untung?" (plain arithmetic, illustrative: 50 sen cost).
- BEFORE: label "Harga RM1, kos 50 sen" then a cut to "Untung 50 sen".
- AFTER: "Tepung · gula · minyak · bungkus" scatter across the tray, regroup into "kos 50 sen", then collapse into "untung 50 sen" on "untung", accent green.

=== cards/09_UI_Motion/trim-path-underline-connector-draw--saas-explainer-masterclass.md
Topic: a nasi lemak stall's daily "untung RM50" (profit) line on a receipt UI (illustrative amount).
- BEFORE: "RM50" just changes colour when the VO says it.
- AFTER: as "RM50" is spoken, a gradient underline draws itself under the number left to right, in Multiply so it reads
  as ink on the receipt.

=== cards/09_UI_Motion/typewriter-type-delete-retype--ae-text-animation.md
Line: "Search je nama kedai tu, tambah 'scam'."
- BEFORE: the search bar shows "kedai abc scam" at once.
- AFTER: in the phone's search bar, "Kedai ABC" types in eased, then " scam" types on the word "scam"; caret blinks.

=== masters/06_Art_Direction/gradient-phase-loop.md
Topic: a title card opening an episode about a kedai runcit's daily float (illustrative).
BEFORE: a flat dark background sits still under the hook text, or a looping wash that visibly jumps every cycle.
AFTER: a slow accent-coloured glow drifts behind the hook text, driven by `f/fps*N` into the gradient's stop offset —
it never settles, never distracts from the text, and (because it's open-ended, not keyed to a fixed loop length) has
no seam to hide.

=== masters/06_Art_Direction/insert-shot-crucial-detail.md
Topic: "Tarikh luput vs 'best before'" (generic labels; no regulation claims), and a small clinic's consultation fee
going up by RM5 (illustrative numbers).
- BEFORE: `| 5 | "Tengok kat tin" | MS of a tin on a shelf | — |`; fee simply stated by the voice over a wide shot of the counter.
- AFTER: `| 5 | "Tengok **tarikh** kat bawah tin" | ECU · embossed date on the tin's base, raking light | date edge lit accent on "tarikh", 1.5 s | insert-ecu |`. Fee example: L02 — insert, tight on the printed fee card with the old
  number still showing, held a beat longer than the line ("plants: why show us this card now?"); L07 — the same
  card's number updates to the new fee in the accent ("pays off L02's insert").

=== masters/06_Art_Direction/odd-number-focal-group.md
Topic: "Kedai kopi kecil: berapa cawan sehari baru untung?" (illustrative), and a "5 customers walked past, 1 bought"
counter visualisation outside a stall (illustrative, kept real to the claim).
- BEFORE: two cups and four sugar sachets dressing the hero kettle; five customer icons scattered unevenly with no clear focal point.
- AFTER: three cups (middle one sharp under the key light), five sachets in soft focus behind — the L05 line "120
  cawan sehari" is shown literally (counter ticks to 120), not forced odd. The five customer icons (odd count,
  matching the real number) are arranged with the one who bought centred and slightly larger, two smaller icons
  mirrored on each side — an automatic focal point with no extra colour needed.

=== masters/06_Art_Direction/one-focal-point-hierarchy.md
Topic: "Kenapa harga roti canai naik 20 sen?" (a mamak in Kuala Lumpur; illustrative numbers).
- BEFORE (frame brief Eye): "roti canai, flour bag, ghee tin, gas tank, price board" — five equal objects, eye wanders; or, in the binary form: stamp card, mirror and scissors all lit and in focus at once — no single read.
- AFTER: "1 price board RM1.80 → RM2.00 (accent on 2.00, centre, sharp) → 2 ghee tin with RM tag (75%, left third,
  half-lit) → 3 flour bag (blurred behind). Gas tank removed." The stamp-card case: card stays sharp, bright,
  centred; scissors and mirror sit soft, dim, at the frame edges, out of focus.

=== masters/06_Art_Direction/recurring-motif-across-series.md
Series: "Everyday Owners." Recurring device: every episode opens on the same macro object type (a cash drawer, in
some form) before cutting to that owner's specific business — so viewers recognise the series within the first
second even before the logo appears. For a second series of "fee breakdown" how-to episodes (illustrative): the
series commits to one motif — every fee drains visibly out of the real object it comes from (coin slot, receipt
total, phone balance) — and each new episode's frame brief says "fee-drain motif, as in EX20" instead of reinventing it.

=== masters/06_Art_Direction/shadow-side-of-light-camera.md
Topic: a pasar malam stall's weighing scale (illustrative).
BEFORE: camera placed facing straight into the key light's direction (or directly between the bulb and the scale) —
the scale reads flat, no edge definition, numbers on the dial unreadable as dimensional.
AFTER: camera moved ~45–60° off the light axis, now looking past the scale into the light's shadow, so the dial's
rim catches light while its base and the engraved numbers fall into visible edge shadow → frame-brief "Eye: scale
rim lit, base in shadow, reads with depth."

=== masters/07_Script_Story/and-but-therefore-not-and-then.md
Topic: a kedai runcit in Shah Alam choosing between cash and QR, told as a laundry shop owner's pricing-per-kg steps
(illustrative numbers).
- BEFORE (and-then, whole episode): "Kedai runcit terima cash. Ada juga QR. QR ada caj. Ada juga kad. Ni beza dia."
- BEFORE (and-then, steps): L04 "Step satu, timbang baju." → and then → L05 "Step dua, kira harga." → and then →
  L06 "Step tiga, bagi resit."
- AFTER (ABT sentence): "Pakcik kedai runcit terima cash setiap hari **and** rasa duit tu selamat dalam laci, **but**
  setiap bulan RM300 hilang sebab salah kira dan duit palsu, **therefore** dia buka QR — caj RM0, kira sendiri."
  - L01 (And): "Kedai ni terima cash je. Pakcik kata paling selamat."
  - L02 (But): "Tapi bulan lepas, RM300 hilang. Tak tahu ke mana."
  - L03–L09 (Therefore): the QR steps and the RM0 fee.
  - L11 (return): "Laci cash ke QR — korang pilih mana?"
- AFTER (join check, steps): L04 "Step satu, timbang baju depan pelanggan." → **but** → L05 "Tapi timbang je tak
  cukup, pelanggan still rasa mahal." → **therefore** → L06 "Jadi, tulis RM4 sekilo besar-besar kat kaunter." →
  **but** → L07 "Tapi baju tebal selimut? Lagi berat, lagi untung RM12."

=== masters/07_Script_Story/build-analogy-part-by-part.md
Topic: what a kedai's monthly cost is made of (parts-mapping), chained with why savings left untouched grow faster
each year (zipper pairing; both illustrative numbers, 5% rate illustrative).
- BEFORE (parts): "Kos bulanan kedai ada sewa, gaji, bil dan stok."
- BEFORE (zipper): "Compounding bermaksud faedah dikira atas pokok dan faedah terkumpul."
- AFTER (parts): "Bayangkan satu bekas nasi lemak. Nasi tu sewa, RM1,500. Sambal tu gaji. Telur tu bil. Baru ada
  untung — ikan bilis je." Rows: `| 9 | "Nasi tu sewa, RM1,500" | top-down macro on the packet, opened | rice layer
  lights in accent, RM1,500 counter on "sewa" |` …
- AFTER (zipper): L03 "Bayangkan pokok rambutan. Tahun ni berbuah, korang tanam biji dia." L04 "Tahun depan, ada dua
  pokok berbuah." L05 "Duit sama. RM1,000 dapat 5%, jadi RM1,050." L06 "Tahun depan, 5% dikira atas RM1,050:
  RM1,102.50." Shots: one rambutan tree → two trees; the coin stack in the same framing grows
  1,000 → 1,050 → 1,102.50.

=== masters/07_Script_Story/cold-open-drop-into-action-or-paradox.md
Topic: a kedai bundle in Penang that buys stock by the bale (action mode), chained with why a kedai makan with a
long queue can still close down (paradox mode) — both illustrative.
- BEFORE (action): "Hari ni aku nak cerita pasal bisnes baju bundle."
- BEFORE (paradox): "Hari ni kita bincang kenapa kedai makan tutup."
- AFTER (action): L01 "Satu bal baju, RM800, dibelah — dan kedai tak tahu apa ada dalam tu." Frame 0: macro of a
  cutter slicing the bale strap, strap springing open; tone "tense, close, quiet".
- AFTER (paradox): frame-0 text "Beratur panjang. Tapi tutup kedai." L01 "Jual 300 pinggan sehari, tapi akaun dia
  merah." Frame 0: macro of a tray of order slips piling up while a shutter's shadow slides down over them.

=== masters/07_Script_Story/filler-audio-filler-video-cut-to-terse.md
Topic: fake "harga asal" on sale tags (illustrative), and "Kenapa kedai dobi layan diri buka 24 jam?" at target 60 s
(ceiling 204 words).
- BEFORE (16 words, filler visual): "Jadi sebenarnya apa yang korang perlu tahu adalah harga asal tu kadang-kadang
  tak betul pun." Visual cell: "text on screen" (filler). Second example: draft at 238 words; plan was "minta baca
  laju sikit."
- AFTER (6 words, concrete visual): "Harga asal tu kadang-kadang reka je." Visual: the RM199 tag flips over, the
  back is blank. Second example: cut L06 (history of the first dobi, 21 words) and the second example in L08 (17
  words) → 200 words; the read speed stays as recorded.

=== masters/07_Script_Story/last-frame-first-then-fill-the-middle.md
Topic: a kedai runcit in Kajang whose shelf has expired stock (illustrative), and fake "harga asal" on sale tags.
- BEFORE: writer starts at L01 with "Ramai kedai rugi sebab stok" and discovers the end at L11; last line written
  last: "Jadi, hati-hati masa sale. Follow untuk tips lagi." (statement + follow request).
- AFTER: Last frame: the same shelf, front row all newest dates, one tin glowing accent. Frame 0: that shelf, close,
  a dented tin with last month's date. 3 frames: mess (tins mixed, 6 expired) → choice (oldest to the front, every
  Monday) → result (0 expired, RM36 not thrown away — 6 tins × RM6, illustrative). L11 on frame-0 framing: "Stok
  lama kat depan… atau kat belakang?" Sale-tags example, written end-first: L01 "Diskaun 50%. Tapi harga asal tu,
  pernah wujud ke?" Last line: "RM99 ni, murah betul ke korang kena?" — back on the same RM199→RM99 tag as frame 0;
  on replay, L01 answers "pernah wujud ke?" again.

=== masters/07_Script_Story/let-me-show-you-peer-voice.md
Topic: reading a supplier invoice for a laundromat in Melaka, and QR payments at a gerai (numbers illustrative).
- BEFORE: "Analisis invois menunjukkan kos tambahan memberi impak signifikan kepada margin." / "Hari ini kita akan membincangkan kepentingan pembayaran tanpa tunai untuk peniaga kecil."
- AFTER: "Jom tengok invois sabun ni sama-sama. Nampak baris kecil ni? Caj hantar RM25, tiap minggu. Setahun,
  RM1,300." / Listener "Pak Mat, burger stall, Bangi": "Pak Mat, berapa ramai budak datang, tengok dompet… terus
  blah? Jom pasang QR. Tiga step je."

=== masters/07_Script_Story/promise-and-purpose-brief-before-script.md
Topic: a kedai runcit in Shah Alam selling RM1 kuih from a supplier, and checking e-wallet transaction history
(numbers illustrative; plain arithmetic).
- BEFORE: `Purpose: explain e-wallets. Viewer: everyone.` Script: frame 0 "Tips untuk kedai runcit" → L01 "Hari ni
  kita cerita pasal kuih." (no promise; nothing to pay off.)
- AFTER (S16 how-to): `Purpose: one how-to — check your e-wallet transaction history every night. Viewer warmth:
  cold, 18–34, scrolling FYP, has an e-wallet. Leaves with: "RM8 a day unnoticed is RM240 a month" (8 × 30). End
  question: "Korang rasa sehari habis berapa?"` Kuih example: packagings tried — (a) "Kuih RM1. Untung berapa sen?"
  (b) "Habis 100 biji. Untung RM10?" (c) "Kenapa kedai jual kuih juga?" Pick (b) (answerable by arithmetic). Frame
  0: "Habis 100 biji. Untung RM10 je?" L02 reinforce: "Kuih tu RM1, tapi kedai beli dari pembuat 90 sen sebiji."
  L09 pay off: "100 biji × 10 sen = RM10 sehari… tapi kuih tu bawa pelanggan beli air RM2." L11: "Korang rasa
  berbaloi ke jual kuih untung 10 sen?"

=== masters/08_Edit_Pacing/freeze-frame-hold-extend.md
Topic: a cinema app's "tiket disahkan" (ticket confirmed) badge pops in on L05, but the line runs 1.5 s longer than
the badge's own 12-frame pop animation; separately, a loading-spinner-to-checkmark icon on a kedai's QR payment
screen (illustrative flow) needs to hold its finished checkmark for 45 frames though the animation is only 12 long.
- BEFORE (AE habit): toggle the badge's last keys to Hold, or freeze the checkmark's last frame and paste it 33 times
  to pad the span — both re-done by hand if the shot's timing shifts later.
- AFTER (raea): the badge's local frame is clamped (`et = Math.min(f, elementEndFrame)`) and the checkmark's progress
  is clamped (`t = clamp01((f - at) / 12)`); either one already returns the finished state for any `f` past
  completion, so retiming the shot needs no re-key.

=== masters/08_Edit_Pacing/pacing-contrast-fast-slow.md
Topic: a kedai runcit's daily plastic-bag cost add-up, chained into "Bayar minimum kad kredit je — apa jadi?" and
"Bayar minimum kad kredit — berapa lama nak habis?" (illustrative; recompute any real rate before use).
- BEFORE: 6 quick bag-count cuts, then the RM total appears in the same rhythm, no shift; L07–L10 all flat 3 s
  setups; 24 setups all 2.5 s.
- AFTER (Mechanism → Payoff handoff): 6 quick bag-count cuts (Mechanism) → one whoosh cue → RM450/month total setup
  held slightly longer, framed with more care (counter catching the light).
- AFTER (shock, rate ↑): L07 3 s macro on the statement "Bayar minimum RM50"; L08 "**tapi** baki RM5,000 tak
  bergerak" — on "tapi" rate ↑: three 1.7 s setups (statement → calendar pages → the same RM5,000 figure); L09
  rate ↓: one 4 s slow push-in on the total, accent red on the number.
- AFTER (build → high-stakes → hold): L03–L05 build at 3.5 s; L06–L08 ("RM5,000… bayar RM150 sebulan… faedah makan
  separuh") at 2 s each; L09 payoff "Hampir 4 tahun" held 3 s.

=== masters/08_Edit_Pacing/peak-velocity-cut.md
Topic: "Kenapa kedai dobi layan diri guna token, bukan syiling" chained with "Satu modal, dua gerai" and "Kedai
runcit — kenapa barang laku letak paras mata" (all illustrative; no sales-uplift numbers claimed).
- BEFORE: `| 6 | "Korang masuk syiling RM1…" | macro coin | — |` hard cut → `| 7 | "…mesin bagi token" | macro token | token pops in |` — a flat pop, plus a separate unrelated coin→two-coins cut, plus a static shelf-to-product cut.
- AFTER: `| 6 | "Korang masuk syiling RM1…" | macro coin on the counter, starts sliding right and turning | coin accelerates on "syiling" | peak-velocity-cut |`
  `| 7 | "…mesin bagi token" | same path continues: token decelerates into frame centre, turn finishes 180° | cut at the peak lands on "token"; accent ring lights the token 0.4 s later | peak-velocity-cut |`
  `| 8 | "Satu modal, **dua** gerai" | macro top-down on one RM1 coin on a wooden counter | coin slides right, eased in-out over 0.6 s; at the speed peak (on "dua") the mesh swaps to two coins drifting apart, settling under two small stall-roof models | peak-velocity-cut |`
  `| 9 | "…letak **paras mata**" | camera pans left along a shelf, accelerating | cut at peak speed on "paras mata"; a row of packs slides left on the counter at the same speed, easing to stop with the eye-level pack centred, price tag in accent | peak-velocity-cut |`

=== masters/09_UI_Motion/parallax-single-key-controller.md
Topic: a bank app home screen with "Baki", "Bil", "Simpanan" tiles, chained into a cursor tapping "Bayar" as the
screen match-cuts to the next step (generic app, illustrative).
- BEFORE: all tiles flat, a red outline marks "Bil"; separately, the cursor and the UI card use the same 2D position
  key and the same screen speed — flat, no depth.
- AFTER (Variant A): on "bil bulan ni", the "Bil RM320" tile lifts toward camera, its shadow growing softer and
  longer; neighbours rise a little less; on the next line it settles back.
- AFTER (Variant B): the UI card stays at its scene depth; the cursor is pushed closer to camera (same shared key,
  smaller scale, repositioned to compensate) — it now visibly races ahead of the card during the push, with zero
  extra keyframes.

=== masters/09_UI_Motion/ramped-stagger-text-reveal.md
Topic: the register total resolving to "RM 450" at month's end (letters), followed by the S16 step line "Step dua:
tengok harga sebelum diskaun" (words) — illustrative.
- BEFORE: "RM 450" cuts in as a flat static title; separately, the whole step sentence fades in at once, 0.2 s.
- AFTER (letters): each character of "RM 450" slides up and fades in left to right over ~1 s, eased so it starts
  slow and lands with a settle; it holds through the line, then exits in a faster ~0.3 s.
- AFTER (words): "Step dua: tengok harga sebelum diskaun" rises 75 px and unblurs word by word from "Step" to
  "diskaun" in ~1 s; on the next line the whole sentence lifts out upward while "Step tiga" rises in.

=== masters/09_UI_Motion/shared-shape-morph-transition.md
Topic: a kedai runcit's "jualan harian" (daily sales) dashboard handing off to its "untung bulanan" (monthly profit)
dashboard, and — chained straight after — "Scan QR kat tiang" handing off to "Masuk amaun RM350" (illustrative, no
fee claims).
- BEFORE: a hard cut or a generic cross-dissolve between each pair of cards/screens.
- AFTER (shared hub): the daily-sales ring's highlight stroke retracts, its icon and "RM120" fade out, then the ring
  shrinks, its stroke brightens to white and its fill turns gray → accent gold while the background panels crossfade
  to the monthly-view palette — the same ring then grows the new "untung bulanan" card around itself.
- AFTER (dominant-shape morph): `| 5 | "Scan QR kat tiang" | macro on the square QR sticker | QR stand and pole fade
  out 0.4 s; the square stretches to a tall rounded rectangle | shared-shape-morph |`
  `| 6 | "Masuk amaun **RM350**" | the rectangle is now the phone screen | keypad and amount field grow in around it
  0.4 s; "RM350" in accent | shared-shape-morph |`
