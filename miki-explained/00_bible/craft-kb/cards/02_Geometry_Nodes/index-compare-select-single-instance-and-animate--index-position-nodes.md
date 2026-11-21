---
title: Index node + Compare — isolate one instance among many and animate only it
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/If You're Learning Blender, You Should Be Using This Node!.txt"
source_time: "01:25–02:27, 14:36–18:34"
tool_target: raea
tier: full
use_when: "planning a hero-reveal beat among many identical objects (a grid of boxes/coins/phones) — one must be singled out and brought forward on a word while the rest hold still"
style_fit: "Fits Style D's 'one object changes state while the field stays put' beat. Geometry Nodes selects the instance procedurally in Blender; raea has no per-instance node selection at render time, so the 'selection' is simply one known array index chosen at build time."
---

## METADATA
02_Geometry_Nodes | Blender 3.x–5.x Geometry Nodes | Index + Math(Compare) → Set Position/Rotate Instances → raea array index

## CREATIVE_INTENT
An Index node gives every Geometry-Nodes instance a stable integer "name" invisible anywhere else in the scene. Feeding
that Index into a Math node set to Compare, against one typed number, turns on a Boolean selection that is true for
only that instance (Epsilon widens it to a neighbourhood). Plugging that selection into a mover node (Set Position,
Rotate Instances) lets one specific instance move/rotate/scale while the rest of the procedural grid is untouched and
non-destructive — e.g. picking one box out of twenty to rise, spin and settle for a product-animation hero beat.

## STE_PROCEDURE
1. Before isolating one instance, build the instance grid with a stable per-point Index (Instance on Points keeps one).
2. Plug Index [Index] → Math(Compare) [A]; type the wanted instance number into [B].
3. Raise Epsilon to scrub and visually find which number is the instance you want (indices are unreadable in a crowded
   grid); once found, lower Epsilon back to 0 so only that one instance passes.
4. Plug Compare [Result] → the mover node's [Selection] input (Set Position for offset, Rotate Instances for spin).
5. Set the camera and composition first (Ctrl+Alt+Numpad0 snap-to-view, orthographic) so the fall/rise direction reads
   correctly before keying.
6. Key only the selected instance: start pose (e.g. raised, rotated 180°) at frame 0, end pose (settled, rotation 0°)
   at the loop-out frame; set default interpolation to Bezier before keying so the drop eases.

## AGENT_EXECUTION
In raea there is no Geometry Nodes layer, so "Index + Compare" has no runtime equivalent — the hero is simply one
known index in a TSX array, decided once at build time, and every other entry in the array stays static.
```tsx
const GRID = Array.from({ length: 20 }, (_, i) => ({ x: (i % 5) * 0.3 - 0.6, z: Math.floor(i / 5) * 0.3 - 0.45 }));
const HERO = 8;                                              // the "Index + Compare" pick, chosen once, not per frame
{GRID.map((p, i) => {
  const isHero = i === HERO;
  const t = isHero ? interpolate(f, [0, 30], [0, 1], { easing: Easing.inOut(Easing.sin), extrapolateRight: "clamp" }) : 0;
  const y = isHero ? 0.25 * Math.sin(Math.PI * t) : 0;        // rises then settles — never pops
  const rot = isHero ? (1 - t) * Math.PI : 0;                 // 180° -> 0°, eased
  return <Model key={i} src={staticFile("box.glb")}
    transform={Transform.fromXyz(p.x, y, p.z).withRotation(Quat.fromEuler("XYZ", 0, rot, 0))} />;
})}
```
Above ~300 instances, build the selection and the still grid once in Blender GN, bake the hero's animation as a
separate action, and export both (grid GLB + hero GLB) rather than looping 300 TSX entries per frame.

### Worked example
Topic: "Kedai runcit stok 20 jenis snek RM2: mana yang paling laku?" (illustrative counts).
BEFORE: `| 5 | "yang ni paling laku" | grid of 20 snack boxes, static | price tag fades in | — |` — nothing shows *which* one.
AFTER: `| 5 | "yang ni paling laku" | grid of 20 boxes; one box (index 8) rises, turns to face camera, settles while the rest hold | hero box lifts+turns 0.6 s on "laku"; "#1" tag fades in on settle | index-compare-select-single-instance-and-animate--index-position-nodes |`

### Check
- Is exactly one instance selected (not a cluster — Epsilon back to 0)?
- Does the hero's rise/turn ease in-out (Bezier/sine), never a linear pop?
- Does the rest of the grid stay completely still while the hero moves?

## NOTES
- Visual gaps: the exact instance number and Epsilon values used on screen are found by scrubbing, not stated as values
  (STT "espon" = "epsilon").
- Dropped: Patreon upsell segment.
- Rule conflicts: none — fits "objects change state on the word", no pop (eased rise/turn).
