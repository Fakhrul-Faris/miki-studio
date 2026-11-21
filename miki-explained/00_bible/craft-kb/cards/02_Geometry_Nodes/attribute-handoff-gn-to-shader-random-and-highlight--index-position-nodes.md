---
title: Store Named Attribute — hand a Geometry-Nodes value to the Shader Editor (random colour, hero highlight)
bucket: 02_Geometry_Nodes
source: "Procedural Mograph & 3D-to-AI Render Passes/If You're Learning Blender, You Should Be Using This Node!.txt"
source_time: "19:12–23:33"
tool_target: raea
tier: full
use_when: "an instance's material must react to something only known inside Geometry Nodes — which instance is the hero, or a per-instance random value — without a separate material per object"
style_fit: "Lets the one selected hero instance be the only emissive/accent-coloured object in a static field — exactly Style D's 'one accent on the one thing the line is about'; in raea the equivalent is a per-item prop computed once, not a shared shader."
---

## METADATA
02_Geometry_Nodes | Blender 3.x–5.x Geometry Nodes + Shader Editor | Store Named Attribute → Attribute node (Instancer) → raea per-item material prop

## CREATIVE_INTENT
A Store Named Attribute node writes any Geometry-Nodes value (a random float, a Boolean selection) onto the instances
under a name; an Attribute node in the Shader Editor, set to read "Instancer", reads that same name back — passing
data from the geometry-nodes "bucket" into the shading "bucket" without scripting. Two uses in the source: (1) a
random per-instance value drives a Color Ramp between two material colours so a grid of identical instances looks
hand-varied instead of uniform; (2) the same Index+Compare Boolean used to pick the single hero instance (see
`index-compare-select-single-instance-and-animate`) is stored and read back to drive that one instance's emission
strength, so only the hero glows while every other instance stays unlit.

## STE_PROCEDURE
1. In Geometry Nodes, add a Store Named Attribute node; set Domain to Instance; pick a name (e.g. "random" or
   "highlight").
2. For random variation: plug a Random Value node into Store Named Attribute [Value].
3. For a hero highlight: plug the existing Index+Compare Boolean selection into Store Named Attribute [Value] instead.
4. In the Shader Editor, add an Attribute node; type the exact same name; set its type to "Instancer" (reads from the
   instance, not the base mesh).
5. Random-variation material: Attribute [Factor] → Color Ramp (two material colours) [Fac] → Base Color.
6. Hero-highlight material: Attribute [Factor] → Color Ramp (black/white) [Fac] → Emission [Strength] (e.g. strength
   10 on the hero's slot only); keep every non-hero instance's Emission at 0.
7. In compositing, add a Glare node (Fog Glow) restrained to the hero's brightness only (see `glare-node-glow` card)
   so the hero reads as lit from within, not just coloured.

## AGENT_EXECUTION
raea has no attribute hand-off between a geometry layer and a shader graph; the "random" and "hero" values are simply
computed once per item in the same TSX array that places the instances.
```tsx
const rnd = (i: number) => ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;     // deterministic "random" attribute
const HERO = 8;
{GRID.map((p, i) => {
  const isHero = i === HERO;
  const mix = rnd(i);                                   // "random" attribute -> base colour mix
  const base = mix > 0.5 ? "#2244aa" : "#ffffff";
  return (
    <Mesh3d key={i} name={`box-${i}`} transform={Transform.fromXyz(p.x, 0, p.z)}>
      <Cuboid half_size={[0.12, 0.12, 0.12]} />
      <StandardMaterial base_color={isHero ? "#ffffff" : base}
        emissive={isHero ? LinearRgba.from(Srgba.hex("#4da3ff")).mul(10) : LinearRgba.from(Srgba.hex("#000000"))} />
    </Mesh3d>
  );
})}
<Bloom intensity={0.6} threshold={0.9} />
```

### Worked example
Topic: "48 kotak snek, hanya satu yang bestseller — nampak dari cahaya je." (illustrative).
BEFORE: `| 6 | "yang bestseller" | all 48 boxes one flat colour, text label points at one | — |` — relies on a label, not light.
AFTER: `| 6 | "yang bestseller" | 48 boxes randomly mixed between two neutral colours; the one hero box glows softly blue,
rest stay unlit | glow fades in 0.4 s on "bestseller"; subtle Glare restrained to the hero | attribute-handoff-gn-to-shader-random-and-highlight--index-position-nodes |`

### Check
- Does only the hero instance emit light — is every other instance's emission exactly 0?
- Does the random colour mix look varied but not noisy at phone size?
- Is bloom/glare restrained to the one glowing accent, not blanket across the frame?

## NOTES
- Visual gaps: exact Color Ramp stop positions and Emission Strength values beyond "10" and "a strength of 10" are
  scrubbed on screen.
- Dropped: Patreon upsell segment.
- Rule conflicts: none — one accent only, on the one object the line is about.
