---
title: View transform — AgX vs Filmic, Looks
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/agx-vs-filmic-highlights--key-to-realistic-renders.md
  - cards/05_Camera_Raea_Pipeline/colour-management-view-transform-look--power-of-color.md
sources: ["The Key to Realistic Renders in Blender.txt", "The Power of Color in Blender 3D!.txt", "The Science of Aesthetic YT 3D Documentaries (Blender tutorial).txt"]
use_when: "highlights rolling off naturally (raea tone map)"
style_fit: House look runs AgX (kit BlendShot LOOK: `ToneMapping mode="agx"` + `Grade midtones contrast 1.12` ≈ AgX Medium High Contrast); keep Blender look-test stills on the same transform so colours match raea finals and phones. UI-heavy ProStage pieces use `"tony"`. Avoid `"aces"` on brand colours.
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.0+ sources → 5.x | Color Management → raea ToneMapping / Grade

## CREATIVE_INTENT
Colour management keeps one image consistent across software, screens and people; the view transform is the tone-mapping
"filter" from scene light to display colour, and the Look adds contrast. AgX (4.0 default) rolls bright, saturated areas to
white like a camera, where Filmic skewed them into odd neon hues — vibrant, well-lit renders get easier.
- Key to Realistic Renders: AgX instead of Filmic; check emissive accents for clean roll-off to white.
- Power of Color: the full menu — sRGB display; Standard, Khronos PBR Neutral, AgX, Filmic, Filmic Log, False Color, Raw; Looks are view filters, changeable after rendering.

## STE_PROCEDURE
1. Open Render Properties › Color Management; leave Display Device = sRGB.
2. Set View Transform = AgX (default choice; ~16.5 stops). Not Filmic (older, worse).
3. Know the alternatives: Standard (no conversion), Khronos PBR Neutral (PBR colour accuracy for product work), Filmic Log (flat, for external grading), False Color (exposure check: white = over, black = under), Raw (skips display transform).
4. Pick a Look: Medium High Contrast (house) or Punchy.
5. Check bright, saturated areas (emissive accents) for clean roll-off to white.
6. Remember these are view filters: changeable after rendering (Blender); in raea set once per piece.
7. Match the raea tone mapping to the Blender look-test transform before comparing stills.
8. (from The Science of Aesthetic YT 3D Documentaries) For Blender-side render exports only: AgX + Medium High
   Contrast confirms the house look; set Cycles noise threshold 0.01, max samples 100, OptiX denoise and persistent
   data on, motion blur on, 1920×1080 at 100%, PNG 16-bit RGB — none of this touches raea, which renders directly.

## VALUES BY SOURCE
| parameter | Key to Realistic Renders | Power of Color | Aesthetic 3D documentaries | recommended for Style D (+ why) |
|---|---|---|---|---|
| view transform | AgX | AgX (default), Khronos PBR Neutral for product accuracy | AgX, Medium High Contrast | Blender AgX ↔ raea `mode="agx"` |
| look | Medium High Contrast / Punchy | Medium High Contrast / Punchy | Medium High Contrast | Medium High Contrast ↔ `Grade midtones contrast 1.12` (BlendShot LOOK) |
| exposure check | — | False Color | — | `tools/x1/exposure_check.py` on stills (raea has no False Color) |
| alternatives | — | Standard / Raw | — | raea `"none"` ≈ Standard/Raw; `"neutral"` ~ Khronos PBR Neutral (verify); `"tony"` default for UI pieces |
| frame rate / length | — | — | 24 fps, 150-frame shot | house 30 fps preview / 60 fps final (unchanged) |
| Blender export settings | — | — | 1920×1080 100%, PNG 16-bit RGB, FFmpeg MPEG-4 in VSE; Cycles noise 0.01, 100 samples, OptiX denoise, persistent data, motion blur on | Blender-only (building GLBs for raea); raea renders directly, no equivalent needed |

## AGENT_EXECUTION
Blender 5.x:
```python
import bpy
sc = bpy.context.scene
sc.display_settings.display_device = "sRGB"
vs = sc.view_settings
vs.view_transform = "AgX"                       # or "Khronos PBR Neutral" for product accuracy
vs.look = "AgX - Medium High Contrast"          # name present in 5.3's OCIO config
vs.exposure = 0.0
```
(5.3's bundled OCIO config lists views: Standard, ACES 1.3/2.0 (+HDR/SDR), Khronos PBR Neutral, AgX, AgX - HDR 1000 nits,
AgX - SDR, Filmic, Filmic Log, False Color, Raw; AgX looks: Punchy, Greyscale, Very High / High / Medium High / Base /
Medium Low / Low / Very Low Contrast, each prefixed "AgX - ".)
raea (one per piece; first frame's values hold):
```tsx
<ToneMapping mode="agx" exposure={0} />          {/* house; "tony" default/UI, "aces" contrasty (can muddy brand colours), "neutral", "reinhard", "none" */}
<Grade midtones={{ contrast: 1.12 }} />          {/* ≈ AgX Medium High Contrast (kit BlendShot LOOK) */}
```

## NOTES
- Deprecated: Filmic (pre-4.0 default) → AgX; Look names in 4.x are prefixed "AgX - ".
- `"neutral"` = Khronos PBR Neutral is a likely but unverified mapping.
- Visual gaps: none.
- Rule conflicts: none; check the brand accent on a still under the chosen transform.
