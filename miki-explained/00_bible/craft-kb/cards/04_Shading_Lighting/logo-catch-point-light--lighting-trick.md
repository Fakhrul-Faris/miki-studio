---
title: Logo-catch point light (a small light placed only to make the metal logo glint)
bucket: 04_Shading_Lighting
source: "Studio Lighting, Silhouettes & Color Theory/This Lighting Trick Changed My Life...txt"
source_time: "01:27–01:40"
tool_target: raea
tier: full
use_when: "the real brand logo is on the hero (embossed, printed foil, metal badge) and must read from frame 1"
style_fit: "Serves the house rule 'real brand logo on screen from frame 1': the logo becomes the brightest small detail. Tiny, shadowless, neutral; a glint that slides with the camera move, never a flash."
---

## METADATA
04_Shading_Lighting | Blender (Cycles) | Point light → raea PointLight (small range) or tiny RectLight

## CREATIVE_INTENT
After the gobo key, the author adds accent lights: a disc area light for the background and bounce, and "a simple point
light to catch on the metal logo in the top right". The key sells mood; the accent light makes the brand mark the one
crisp highlight the eye lands on.

## STE_PROCEDURE
1. Finish the key (and gobo) first; locate the logo in the camera view.
2. Add a small Point light near the logo, off-frame.
3. Before fine-tuning, view from the camera in Rendered mode.
4. Move the light until its reflection sits on the logo (mirror angle: light ↔ logo normal ↔ camera).
5. Lower power until only the logo's metal catches it; the surrounding surface stays unchanged.
6. Keep its radius small so the glint is crisp.

## AGENT_EXECUTION
**Frame 0 / board check:** on the logo setup add "logo glint present?". **Frame brief → Eye:** "logo glint → hero → number".

**raea** (place by reflection: light on the mirror direction of camera about the logo normal):
```tsx
// logo at P with normal N; camera at C. Mirror the view direction to place the light.
const P = [0.06, 0.12, 0.03], N = [0, 0, 1], C = [0.1, 0.2, 0.6];
const v = norm(sub(C, P)); const r = sub(scale(N, 2 * dot(v, N)), v);           // reflect
const Lp = add(P, scale(r, 0.15));                                                // 15 cm out along it
<PointLight name="logoGlint" transform={Transform.fromXyz(...Lp)} intensity={6_000} radius={0.005}
  range={0.3} color="#ffffff" />
```
(`norm/sub/add/scale/dot` = small local helpers; write them in the episode file.) Logo material: `metallic={1}`,
`perceptual_roughness` 0.15–0.3, or the logo decal on a glossy surface. Fade the light's `intensity` in over 12 frames
if the logo enters mid-shot. Values `~`.

### Worked example
Topic: "Kenapa kopi jenama tempatan boleh lawan kopi import?" (illustrative; use the real brand's logo file only with a real brand).
BEFORE: `| 1 | frame 0 "Kopi RM2 lawan RM15?" | macro on a coffee tin, logo matte under the key | text fades in | — |` — logo grey, lost.
AFTER: `| 1 | frame 0 "Kopi RM2 lawan RM15?" | macro 3/4 on the tin's embossed logo; a tiny point light 15 cm off-frame makes the logo the one crisp glint | camera already drifting 2 cm/s, glint slides across the emboss; title fades 0.4 s | logo-catch-point-light--lighting-trick |`

### Check
- Is the logo the crispest highlight in frame?
- Does toggling the light change only the logo area?
- Is the light off-frame and shadowless?
- Is the logo the real brand file (not redrawn)?

## NOTES
- Visual gaps: position/power on screen only (`~`).
- The disc background/bounce light in the same video is covered by masters/04_Shading_Lighting/fake-bounce-lights.md.
- Related: top-surface-highlight-accent-light--lighting-products-breakdown.
