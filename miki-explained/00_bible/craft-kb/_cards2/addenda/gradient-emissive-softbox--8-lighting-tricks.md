# Addendum → masters/04_Shading_Lighting/gradient-emissive-softbox.md
Source: "Studio Lighting, Silhouettes & Color Theory/8 Lighting Tricks I Wish I Knew Earlier (Blender Product Lighting Tutorial).txt" — 06:46–08:35 (glass and metal gradient lighting).

## New VALUES BY SOURCE row
| parameter | 8-lighting-tricks |
|---|---|
| Where the gradient lives | directly in the **light's own** shader node tree (Area light → Use Nodes → add a gradient texture, e.g. "elliptical sharper") connected to **Emission Color** — not on a separate plane/card in front of the light |
| Why | a plain Area light behind glass/metal shows a flat white disc with a completely sharp edge, "looks kind of ugly"; routing a soft gradient into the light's own emission removes the hard edge without adding geometry |
| Glass rig | one Area light behind the glass, gradient in its emission, rotated/distanced until the reflection/transmission looks natural (not physically accurate, "but it works") |
| Metal rig | same gradient-in-emission approach; additionally scale the light tall in Z, make it wider and stronger, and add two more lights in the background (each side) plus two in front so the metal object doesn't show large black unlit areas |
| Pre-made assets | the gradients used ("elliptical sharper" and others) are ready-made texture images, not hand-built node graphs, in this source |

## Extra step
Add to STE_PROCEDURE as an alternative to building a separate gradient card: for a light placed directly behind/beside a
glass or metal hero, put the gradient texture straight into that light's own Emission Color input (Area light → Use Nodes
→ Image/Gradient Texture → Emission Color) rather than building a separate plane in front of it. This is simpler to set up
when the light is already positioned exactly where the plane would go, at the cost of less independent control over the
gradient's scale/rotation versus the light's own transform (both move together).

## raea
No change to the raea route already in the master (bake planes/strips into a studio HDR, or a `StandardMaterial`
emissive card) — a gradient wired into a light's own node tree has no raea equivalent (lights have no texture input);
keep using the master's emissive-card approach for this variant too.

## Notes
- For a metal object specifically: if black unlit patches remain, add symmetric lights on both sides in the background
  AND two more in front, rather than raising one light's power (which the source found insufficient alone).
