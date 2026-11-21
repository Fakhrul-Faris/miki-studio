---
title: Finishing glint — one extra small light added only for a highlight
bucket: 04_Shading_Lighting
type: master
members:
  - cards/04_Shading_Lighting/finishing-glint-extra-light--apple-commercial-breakdown.md
  - cards/04_Shading_Lighting/logo-catch-point-light--lighting-trick.md
  - cards/04_Shading_Lighting/top-surface-highlight-accent-light--lighting-products-breakdown.md
sources: ["Apple commercial Cinematography breakdown.txt", "This Lighting Trick Changed My Life...txt", "Lighting Products in Blender (Breakdown).txt"]
use_when: "a hero setup reads but looks dull/flat at phone size, or the real brand logo on the hero must glint and read from frame 1, or a glossy cap/lid/top edge goes dull under the soft top key"
style_fit: Last, optional polish after key/fill/rim are right — one tiny shadowless light placed for its reflection, not illumination, on exactly the spot the line is about (coin edge, logo, cap rim). Neutral colour so it never competes with the one brand accent; any change fades ≥0.4 s, never pops. ⚠ source "eye-light" examples target people — adapted to the hero object's edge/logo only (no people in Style D).
---

## METADATA
04_Shading_Lighting | general live-action / Blender (Cycles/Octane) | small PointLight/RectLight/narrow SpotLight, short `range`, placed by mirror-reflection geometry

## CREATIVE_INTENT
Shared why: the key and fill shape the object's form; one extra tiny light, placed purely for its reflection rather
than for illumination, puts a crisp finishing highlight exactly where the eye should land — "a cherry on top" that
"doesn't always naturally come out" from the main lights alone. It is optional, added last, and removed if it steals
attention from the line's real accent.
- Apple commercial breakdown ("eye-light"): named explicitly as the final, optional polish step — do it only after
  key/fill/rim are finished; one small light for "a little bit of pop," kept subtle enough it barely changes exposure.
- This Lighting Trick Changed My Life (logo-catch): a dedicated point light placed by reflection geometry (mirror
  angle: light ↔ logo normal ↔ camera) so the real brand logo becomes the one crisp highlight the eye lands on.
- Lighting Products in Blender (top-surface): a small Area or Point light whose spread is reduced so it only lights
  the product's top/cap, turning a dull cap into a glossy, finished-looking surface.

## STE_PROCEDURE
1. Finish key, fill and rim (and gobo, if used) first; only then consider a glint — this light is always last.
2. Pick exactly one spot the line is about: a coin edge, the real brand logo, a bottle cap/lid, a phone-camera ring.
3. For a logo or a specific reflective point: place the light by reflection geometry — move until its reflection
   sits on the target as seen from camera (mirror angle: light ↔ surface normal ↔ camera).
4. For a broader top surface (cap, lid): add a small Area light above and slightly in front of the top; reduce its
   Spread/size until only the top receives light, then position by the same reflection check.
5. Keep intensity low: the glint should be visible but should barely change the object's overall exposure, and
   should not be brighter than the key's own highlight.
6. Keep its radius/size small for a crisp (not diffuse) highlight; turn off its shadows if the engine allows — it
   should add highlight only, never cast a second shadow.
7. Check from the camera with the light toggled on/off: only the target spot should change; the rest of the object
   stays unchanged.
8. Check the glint survives at phone size and sits on the line's subject only; remove it if it draws the eye away
   from the scene's one accent colour.
9. If the glint's surface moves into frame mid-shot (a logo panning in), fade the light's intensity in over ~12
   frames rather than popping it on.

## VALUES BY SOURCE
| parameter | Apple commercial (eye-light) | Logo-catch (lighting trick) | Top-surface highlight (products breakdown) | recommended for Style D (+ why) |
|---|---|---|---|---|
| target | a person's eye (adapted: hero edge/logo/screen) | the real brand logo (embossed/foil/metal) | the glossy top/cap/lid specifically | logo, rim, or top surface — whichever the line is about |
| light type | unspecified small light/reflection | small Point light, small radius | small Area light (reduced Spread) or Point | `PointLight` (point target) or small `RectLight`/narrow `SpotLight` (surface target) |
| placement method | "extra piece of lighting or reflection" (by eye) | mirror angle: light ↔ logo normal ↔ camera, 15 cm out | reflection check: move until highlight sits on the top's curve from camera | mirror-reflection formula (AGENT_EXECUTION) |
| intensity | "barely changes the object's exposure" | lowered "until only the logo's metal catches it" | lowered until visible but not brighter than key's highlight | ~ (tuned per scene); keep below key's own highlight brightness |
| size/radius | small | small radius for a crisp glint | small Area, Spread reduced so only the top is lit | small RectLight (6×4 cm-ish) or narrow SpotLight (outer_angle ≈0.08) |
| shadows | — | — | turned off where possible | shadowless where the engine allows |
| raea starting values | intensity ~50,000–150,000 lm at ~0.3 m, range 0.6 m (point) | `PointLight` intensity 6,000, radius 0.005, range 0.3 | `RectLight` intensity 8,000, width 0.06/height 0.04, range 0.3; or `SpotLight` intensity 20,000, outer_angle 0.08, inner_angle 0.03, range 0.7 | pick the closer-matching prop by target type; tune all values on a still |

## AGENT_EXECUTION
raea — place a point-target glint by reflecting the camera direction about the target's surface normal:
```tsx
// target at P with normal N; camera at C. Mirror the view direction to place the light.
const norm = (v: V3) => { const l = Math.hypot(...v); return [v[0]/l, v[1]/l, v[2]/l] as V3; };
const sub = (a: V3, b: V3): V3 => [a[0]-b[0], a[1]-b[1], a[2]-b[2]];
const add = (a: V3, b: V3): V3 => [a[0]+b[0], a[1]+b[1], a[2]+b[2]];
const scale = (v: V3, s: number): V3 => [v[0]*s, v[1]*s, v[2]*s];
const dot = (a: V3, b: V3) => a[0]*b[0] + a[1]*b[1] + a[2]*b[2];

const P: V3 = [0.06, 0.12, 0.03], N: V3 = [0, 0, 1], C: V3 = [0.1, 0.2, 0.6];
const v = norm(sub(C, P));
const r = sub(scale(N, 2 * dot(v, N)), v);                 // reflect camera direction about the normal
const Lp = add(P, scale(r, 0.15));                          // ~15 cm out along the reflected ray

<PointLight name="glint" transform={Transform.fromXyz(...Lp)} intensity={6_000} radius={0.005}
  range={0.3} color="#ffffff" />
```
Broader top-surface variant (reduced-spread panel, no reflection math needed — position by eye then verify on a still):
```tsx
<RectLight name="topGlint" transform={Transform.fromXyz(0, 0.32, 0.08).lookingAt([0, 0.2, 0])}
  intensity={8_000} width={0.06} height={0.04} color="#ffffff" range={0.3} />
```
The target surface needs low `perceptual_roughness` (0.1–0.3) and some metalness for the highlight to read. Fade
`intensity` in over ~12 frames if the glint's surface enters mid-shot.

### Worked example
Topic: "Kenapa syiling 5 sen masih penting di kaunter" (Malaysian cash totals rounded to the nearest 5 sen — real).
BEFORE: macro of a 5-sen coin under the top key only; a flat grey disc.
AFTER frame brief: Light "top key + one glint PointLight at the mirror angle to the coin's rim, range 0.6 m"; Eye
"the rim glint, then the '5'"; Moves "on 'lima sen' the glint slides along the rim over 0.6 s eased".

### Check
- Is there exactly one glint, on the line's subject (logo, rim, or top surface)?
- Was the glint added only after key/fill/rim were already right?
- Does toggling the light change only the target spot, and nothing else?
- Is it shadowless (or near enough) and dimmer than the key's own highlight?
- Does the glint survive at phone size?
- If it's the real brand logo: is the logo the real brand file, not redrawn?

## NOTES
- Deprecated: none.
- Visual gaps: exact positions/powers/radii in all three sources are shown on screen or implied by eye; all numeric
  starting values above are `~`.
- Rule conflicts: Apple commercial's source material lights people's eyes — Style D has no people, so this is
  adapted to object edges/logos/screens only; the mechanism (reflection-placed tiny light) is unchanged.
- Dropped: the disc background/bounce light shown alongside logo-catch in its source video is covered by
  `masters/04_Shading_Lighting/fake-bounce-lights.md`, not this master.
