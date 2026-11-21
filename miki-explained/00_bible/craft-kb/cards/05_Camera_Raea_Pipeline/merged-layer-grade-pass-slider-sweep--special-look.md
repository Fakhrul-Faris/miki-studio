---
title: One non-destructive grade pass, swept slider by slider (clarity, saturation, white/black point, sharpening, vignette)
bucket: 05_Camera_Raea_Pipeline
source: "How to Add That Special Look To Your Renders.txt"
source_time: "08:53–16:00"
blender_version_source: n/a (Photoshop Camera Raw)
tool_target: raea
tier: principle
style_fit: Matches raea's single <Grade> over the whole piece; Style D wants deep blacks with detail and one accent, so push full range and saturation with restraint.
---

## METADATA
05_Camera_Raea_Pipeline | Photoshop Camera Raw / Lightroom | raea Grade + ToneMapping

## CREATIVE_INTENT
Principle: one Lightroom-style grade over the merged image is the single biggest finishing step ("use it 100% of the time"). Method
is a sweep: nudge each slider both ways, keep the direction that looks better, else leave it. Ideas: clarity high, saturation up,
contrast usually untouched (renders come out contrasty), whites up / blacks down until a few true white and black pixels exist,
sharpening only on detail, a little vignette.

## STE_PROCEDURE
Method (Photoshop, non-destructive):
1. Select the top layer of the stack.
2. Press Ctrl+Alt+Shift+E to stamp all visible layers into one new merged layer.
3. Choose Filter → Convert for Smart Filters (settings stay editable).
4. Open Filter → Camera Raw Filter.
5. Sweep every slider: nudge both ways; keep the better direction, else reset.
6. Raise Clarity well (author goes far past +10; back off if it looks wrong).
7. Raise Saturation (author likes it high; "eye candy").
8. Leave Contrast unless the render is flat.
9. Alt-drag Whites up until the first pixels clip; Alt-drag Blacks down until the first pixels clip (full dynamic range).
10. Raise Sharpening Amount, then raise Masking (Alt to preview) so only edges/detail sharpen.
11. Optional: Color Grading → ~5–10% blue in Shadows (see cool-split-tone-shadows--nice-colors).
12. Add Grain (see film-grain-de-render--special-look) and a little negative Vignetting.
13. Optional: Calibration hue/saturation (see per-hue-color-mixer-calibration--nice-colors).
14. Add Curves above only if an area needs darkening.

## AGENT_EXECUTION
### Source tool (Photoshop)
Stamp visible (Ctrl+Alt+Shift+E) → Smart Object → Camera Raw: Clarity high (~+30–50, visual), Saturation up (~+15–25),
Whites + / Blacks − to clip point, Sharpening Amount high + Masking high, Shadows hue blue 5–10 %, Vignetting slightly negative.
### Blender / raea translation
- raea `<Grade>` is the single non-destructive merged pass (edit values, re-render; first frame's grade holds for the piece):
```tsx
<ToneMapping mode="tony" />
<Grade saturation={1.15}
       shadows={{ lift: -0.01 }} highlights={{ gain: 1.05 }}
       midtones={{ contrast: 1.04 }}
       vignette={0.18} />
```
  (~ values; `kit/pro.tsx` ships `midtones={{ contrast: 1.04 }} vignette={0.18}`.)
- Whites/Blacks clip point → `highlights.gain` / `shadows.lift` (or `<ToneMapping exposure>`); check a still for true black that
  still holds detail (Style D rule: no crushed shadows).
- Slider sweep → render one still per change: `raea render EDIT.tsx --frame N -o F.png`; compare A/B.
- Clarity (local contrast): raea: no equivalent (Grade has only global contrast per tonal range); nearest is a slightly higher
  `midtones.contrast` plus roughness/normal detail in materials.
- Sharpening with masking: raea: no equivalent (no sharpen pass); rely on MSAA/SMAA and full-res textures.

## NOTES
- Deprecated: none.
- Visual gaps: every slider value is shown on screen, not spoken (only grain "20 or 30" and blue shadows "5–10 %").
- Rule conflicts: high saturation conflicts with one-saturated-accent — raise saturation mainly via the accent material, keep
  global `saturation` modest. Clarity "cranked" can look harsh on macro surfaces — judge at phone size.
