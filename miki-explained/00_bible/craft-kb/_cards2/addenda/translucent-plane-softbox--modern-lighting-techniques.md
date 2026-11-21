Target: `cards/04_Shading_Lighting/translucent-plane-softbox--power-of-lighting.md`
Source: "Studio Lighting, Silhouettes & Color Theory/Modern Lighting Techniques in Blender.txt" (02:43–04:55)

## Alternate method for the same goal (soft key light on a still-life/product), no diffuser plane needed
The target card softens an area light's harsh glossy reflections by parenting a Translucent-BSDF diffuser plane in
front of it. This source reaches a comparably soft key using a **Point** (or Spot) light's own **Radius** and
**Spot Size** parameters instead, with no extra geometry:

1. Add a point/spot light, scale it down from its large default, aim it at a slight diagonal onto the subject.
2. Raise Power first (source: 4000, then 5000) — still harsh at this point.
3. Narrow the Spot Size so the spot is condensed onto just the intended area.
4. Raise the Radius value until the condensed spot's shadow turns soft — "bring that radius up until it's nice and
   soft."
5. Result: a soft, directional key with a defined "attack" area, no diffuser plane or extra objects required.

## When to use which
- Diffuser-plane method (existing card): needed when the light source itself must stay large/visible or must give
  soft *reflections* on a glossy hero object (the plane physically softens what's reflected).
- Radius+Spot-Size method (this addendum): faster, no extra geometry, good when only the shadow/falloff needs to
  soften and the object isn't glossy enough for reflection shape to matter.

## NOTES
- Timestamps: 02:43–04:55.
- Visual gap: the exact final Radius value chosen by eye isn't stated as a number, only "bring it up until it's soft."
