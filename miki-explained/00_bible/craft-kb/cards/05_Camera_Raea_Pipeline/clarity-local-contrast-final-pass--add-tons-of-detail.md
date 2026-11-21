---
title: Final detail pop — Camera Raw "Clarity" (local contrast), applied gently
bucket: 05_Camera_Raea_Pipeline
source: "How to Add Tons of Detail To Your Renders  Blender.txt"
source_time: "24:47–25:08"
blender_version_source: 4.x
tool_target: principle-only
tier: principle
style_fit: "Small midtone local contrast helps macro texture read on phone screens. raea has no clarity pass; approximate it in the grade or with ffmpeg after render. Never strong (halos look cheap)."
---

## METADATA
05_Camera_Raea_Pipeline | 4.x source (Photoshop post) → raea / ffmpeg | principle-only

## CREATIVE_INTENT
Principle: detail is partly a post decision. Raising local contrast in the midtones makes every edge, bolt and scratch
separate from its neighbour, so a dense render reads as more detailed. Idea: treat it as the last 5%, "as long as you
don't push it too high".

## STE_PROCEDURE
1. Finish the render with the look already right; clarity is a final pass, not a fix.
2. Method (source): open the render in Photoshop → Filter → Camera Raw Filter → raise Clarity (value unknown (visual only)).
3. Compare before and after at 100%; back off at the first sign of halos around bright edges.
4. Our how-to: approximate it per frame with a large-radius, low-amount unsharp mask after the raea render, tested on a still first.

## AGENT_EXECUTION
### Source tool (Photoshop)
- Filter → Camera Raw Filter → Basic → Clarity slider (positive). Clarity is a midtone-weighted large-radius local-contrast boost.

### Blender / raea translation
- raea: no equivalent (no local-contrast or unsharp pass in post.md). Nearest in-engine option: `<Grade midtones={{ contrast: 1.08 }} />`
  (global midtone contrast, not local; BlendShot already sets `midtones.contrast` from `LOOK.contrast`).
- Post-render approximation with ffmpeg (a separate tool, not raea; test on a still first):
```bash
ffmpeg -i final.mp4 -vf "unsharp=lx=13:ly=13:la=0.35:cx=13:cy=13:ca=0" -c:v libx264 -crf 16 -pix_fmt yuv420p final_clarity.mp4
```
  `lx/ly` = matrix size (odd, 3–23; large ≈ clarity, small ≈ sharpening), `la` = amount (keep ≤ ~0.5), `ca=0` leaves chroma alone.
- Blender is never the final renderer here, so there is no Blender compositor step to translate.

## NOTES
- Rule conflicts: none (Photoshop is not After Effects).
- Captions are HTML over the 3D in raea, so an ffmpeg pass on the final would also sharpen them (they are an EX15 locked
  style). Apply it to a caption-free render and add captions after, or don't use it.
- Big unsharp radii raise bitrate and grain, so check the 60 fps export size.
- Visual gaps: the Clarity value used is not stated.
