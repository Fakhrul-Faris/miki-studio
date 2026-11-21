---
title: Proximity gradient handed to the shader — material lights up only where something is near
bucket: 04_Shading_Lighting
source: "Procedural Mograph & 3D-to-AI Render Passes/You Should be Using Proximity in Your Animations (Blender).txt"
source_time: "16:05–18:42"
tool_target: raea
tier: full
use_when: "a surface or object should visibly glow/recolour only in the area a cause (a cursor, a sphere, a hand-height marker) is currently near, not everywhere at once"
style_fit: "A second Style D 'reacts on the word' layer on top of physical displacement — colour reacts, not just position. In raea, drive emissive strength from the same per-frame distance value used for displacement."
---

## METADATA
04_Shading_Lighting | Blender 4.2+ Geometry Nodes + Shader Editor | Store Named Attribute (Distance) → Attribute (Instancer) → Map Range → Mix Shader → raea per-item emissive

## CREATIVE_INTENT
The same Geometry Proximity distance value used to displace geometry can be stored as a named attribute and read back
in the Shader Editor via an Attribute node (Instancer), then reshaped with its own Map Range and fed into a Color
Ramp driving a Mix Shader's factor — so the material itself (not just the position) reacts to nearness: an object
"lights up" only in the zone the cause currently occupies, independent of the displacement's own falloff shape.

## STE_PROCEDURE
1. After building the Geometry Proximity → Distance chain (see `geometry-proximity-empty-driven-displacement`), add a
   Store Named Attribute node (Domain: Instance/Point) and plug Distance into its [Value]; name it (e.g. "proximity").
2. In the Shader Editor, add an Attribute node; type the same name; set type to Instancer (or Point, matching the
   domain used).
3. Plug Attribute [Factor] → its own Map Range (independent from the displacement one — the glow zone can be tighter
   or wider than the physical reaction).
4. Map Range [Result] → Color Ramp (two colours, or black→accent) [Fac] → Mix Shader [Fac], mixing a neutral material
   (Shader A) with an emissive/accent material (Shader B).
5. Tune the Color Ramp so the glow only shows near full proximity, not a slow fade across the whole field.
6. Confirm in viewport: moving the cause object recolours/lights only the zone nearest it, following smoothly.

## AGENT_EXECUTION
raea has no attribute pass-through; reuse the same per-frame distance already computed for displacement to also drive
each item's emissive strength, with its own independent falloff curve.
```tsx
const moverX = interpolate(f, [0, 120], [-2, 2], { easing: Easing.linear });
const glowRange = (d: number) => Math.max(0, 1 - d / 0.35);               // tighter falloff than the displacement one
{FIELD.map((p, i) => {
  const d = Math.abs(p.x - moverX);
  const glow = glowRange(d);
  return (
    <Mesh3d key={i} name={`tag-${i}`} transform={Transform.fromXyz(p.x, 0, 0)}>
      <StandardMaterial base_color="#1a1a1a"
        emissive={LinearRgba.from(Srgba.hex("#ffb000")).mul(6 * glow)} />   {/* "lights up" only near the cause */}
    </Mesh3d>
  );
})}
```

### Worked example
Topic: "Lampu kaunter kedai basuh kereta: hanya bahagian yang digunakan yang menyala." (illustrative).
BEFORE: `| 7 | "bahagian aktif menyala" | whole panel lit uniformly | — |` — no sense of "where" the action is.
AFTER: `| 7 | "bahagian aktif menyala" | a row of price tags; only the tag nearest the moving scanner glows warm amber,
fading as the scanner passes on | glow zone tighter than the physical lift, warm accent only | proximity-attribute-shader-glow-mask--proximity-animations |`

### Check
- Does the glow zone track the cause smoothly, with no hard on/off snap?
- Is the glow restrained to the single house accent colour, not a rainbow?
- Is the glow's falloff width deliberately chosen (can differ from any physical displacement happening at the same time)?

## NOTES
- Visual gaps: exact Map Range and Color Ramp values are tuned on screen by eye, not stated as numbers.
- Rule conflicts: none if the glow stays the one accent colour and the amplitude/zone is restrained (not the whole
  field lit at once).
