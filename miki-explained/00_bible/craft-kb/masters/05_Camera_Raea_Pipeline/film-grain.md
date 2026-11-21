---
title: Film grain (add / match and regrain)
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/film-grain-de-render--special-look.md
  - cards/05_Camera_Raea_Pipeline/grain-match-five-characteristics-and-regrain--advanced-comp-nuke-wk1.md
sources: ["How to Add That Special Look To Your Renders.txt", "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"]
use_when: "removing the rendered look from the final"
style_fit: Partial conflict — raea's PBR look has no grain prop and renders noiseless CG with no plate to match; grain costs bitrate and TikTok smears it. Default: no grain unless the user asks for a filmic look; if used, barely visible, added at encode (ffmpeg), tested on a phone.
---

## METADATA
05_Camera_Raea_Pipeline | Photoshop Camera Raw / Nuke (DasGrain, AdvancedGrain) | principle-only (raea: no equivalent in the PBR look)

## CREATIVE_INTENT
Straight-from-the-renderer images look computer-made; camera-like grain makes them read as photographed and unifies shots.
- Special Look: add grain "always", moderate amount, as the last grade move.
- Advanced Comp Nuke: grain must match on five traits — intensity, luminance curve (more in shadows, little in highlights), size,
  softness, pattern; grain (film, luminance) and noise (digital, per-channel) handled the same; each shot is a new grain
  structure; for a filmic look borrow real film grain from a reference clip rather than synthetic noise.

## STE_PROCEDURE
1. Before you add grain, finish all other grade/comp moves; regrain last, just before the final crop.
2. Simple add (Camera Raw): Effects → Grain Amount ~20–30; Size/Roughness default.
3. Check intensity: neither stronger nor weaker than the plate/reference.
4. Check the luminance curve: more visible grain in darks, little in highlights, never zero; uniform grain looks wrong.
5. Match grain size per channel, then sharpness/softness.
6. Match pattern/irregularity (less of an issue with modern sensors).
7. With an original plate: extract grain = plate − degrained plate, normalise it, adapt per luminance.
8. If the plate was transformed (camera shake), apply the same transform to both grain inputs.
9. Or sample a flat grain patch (scatter) and spread it over the frame to avoid detail ghosts.
10. Without DasGrain: per-channel size ~1.8, intensity ~0.05, shape R/G/B luminance-falloff curves by eye.
11. For film grain: degrain a film reference, feed it as the grain source, scatter from a flat area, reduce strength to taste.
12. Check at 100% and at viewing size (for us: on a phone after TikTok-like compression).

## VALUES BY SOURCE
| parameter | Special Look (Camera Raw) | Advanced Comp (Nuke) | recommended for Style D (+ why) |
|---|---|---|---|
| amount | Amount 20–30 | intensity ~0.05 (AdvancedGrain), matched to plate | none by default; if asked, ffmpeg `noise=alls=3–6:allf=t` (~), barely visible |
| size | default | ~1.8 per channel | encoder default (ffmpeg can't size grain) |
| luminance curve | — | more in shadows, flatten over highlights, never zero | not available in ffmpeg `noise` — keep amount low instead |
| source | synthetic | DasGrain from plate / real film scan | synthetic at encode (no plates in our CG) |
| live-action inserts | — | match grain to plate | denoise inserts (screen recordings, stock) to match clean CG |

## AGENT_EXECUTION
### Source tools
- Photoshop: Camera Raw → Effects → Grain: Amount 20–30, Size/Roughness default.
- Nuke: `DasGrain` (inputs: plate, degrained plate, comp) → Analyze; Adjust tab shows the per-luminance curve; Replace tab →
  Activate scatter with a sample box over a flat area; all inputs same resolution (Reformat). Fallback `F_ReGrain` / `Grain2` /
  `AdvancedGrain` (size R/G/B 1.8, intensity ~0.05, black 0, curves via Ctrl-Alt-click keys). Reference clips: `TimeOffset` so
  the range starts at 1001/1000.
### Blender / raea translation
- raea: **no equivalent** for the PBR look (`grain` exists only on `<Look mode="paint">` as fixed paper grain and as dither on
  the "site"/"pixel" looks — wrong look for Style D). No plate grain to analyse; renders are noiseless.
- Optional, outside raea, at encode (~; test bitrate first):
  ```bash
  ffmpeg -i final.mp4 -vf "noise=alls=4:allf=t" -c:v libx264 -crf 16 -c:a copy final_grain.mp4
  ```
- Blender compositor (look-dev only): no built-in film grain; would need a noise texture overlay.

## NOTES
- Deprecated: none.
- Visual gaps: AdvancedGrain curve shapes are shown, not spoken (only "flatten over highlights, more in shadows, never zero").
- Rule conflicts: grain inflates bitrate and TikTok re-compression smears it; raea's fog grid encodes small precisely because it
  has no noise (post.md). Default no grain unless the user asks; never in AE.
