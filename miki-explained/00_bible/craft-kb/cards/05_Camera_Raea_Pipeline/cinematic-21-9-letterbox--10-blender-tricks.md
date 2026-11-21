---
title: Cinematic 21:9 aspect ratio / letterbox bars
bucket: 05_Camera_Raea_Pipeline
source: "10+ Blender Tricks That Will Make Your Renders Cinematic.txt"
source_time: "01:26–01:37"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: principle
style_fit: "conflict: our deliverable is 9:16 vertical; 21:9 only as an in-frame letterbox device, used rarely"
---

## METADATA
05_Camera_Raea_Pipeline | Blender 3.x (4.2+ same) | Output Resolution → raea Composition size / page bars

## CREATIVE_INTENT
Principle: a 21:9 frame reads as "cinema" because audiences associate wide bars with film. Idea (video): set the output
resolution to a 21:9 size so the render itself is widescreen. For us: a 21:9 window inside the 9:16 frame can mark a
"film-like" or flashback beat, but the delivered video stays 9:16.

## STE_PROCEDURE
1. Open Output Properties > Format.
2. Set Resolution X / Y to a 21:9 pair (the video's list is on screen only; e.g. `~` 2560 × 1080 or 1920 × 822).
3. Before using this for Meikigo, keep the Composition at 1080 × 1920 and add bars inside it instead.
4. Fade or slide the bars in over ~0.4 s; never pop them on.

## AGENT_EXECUTION
### Blender (4.2+), video's method
```python
import bpy
r = bpy.context.scene.render
r.resolution_x, r.resolution_y = 2560, 1080   # ~ 21:9 (≈2.37:1)
```

### raea (9:16 with an in-frame 21:9 window)
```tsx
// band height for a 21:9 window across a 1080-wide frame: 1080 * 9/21 ≈ 463 px; bars fill the rest
const f = useCurrentFrame(); const { fps } = useVideoConfig();
const t = interpolate(f, [0, 0.4 * fps], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const bar = ((1920 - 463) / 2) * t;
<AbsoluteFill style={{ background: "#0b0b0d" }}>
  {/* 3D: Camera3d etc. */}
  <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: bar, background: "#000" }} />
  <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: bar, background: "#000" }} />
</AbsoluteFill>
```
Bars are opaque page elements over the 3D (scene.md: keep page parts over 3D opaque).

## NOTES
- Deprecated: none.
- Visual gaps: the video's list of 21:9 resolutions is on screen only.
- Rule conflicts: 9:16 is fixed for delivery and captions/logo need the vertical space; treat this as a rare motif,
  never the default framing. Bars must ease in/out, not pop.
