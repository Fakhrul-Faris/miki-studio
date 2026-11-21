# Addendum: Fern-style documentary render settings

Target: `masters/05_Camera_Raea_Pipeline/view-transform-agx.md`
Source: "3D Documentary Explainer Breakdowns/The Science of Aesthetic YT 3D Documentaries (Blender tutorial).txt" (08:19–09:43)

## VALUES BY SOURCE (new column)
| parameter | Aesthetic 3D documentaries | recommended for Style D |
|---|---|---|
| view transform / look | AgX, Medium High Contrast | unchanged (AgX ↔ raea `mode="agx"`) |
| frame rate / length | 24 fps, 150-frame shot | house 30 preview / 60 fps final |
| output | 1920×1080, 100 %, PNG 16-bit RGB, then FFmpeg MPEG-4 high quality in the VSE | raea renders directly |
| Cycles | noise threshold 0.01, max samples 100, OptiX denoise, persistent data, motion blur on | n/a (raea real-time); Blender only builds GLBs |

## Notes
- Only the AgX Medium High Contrast look is new evidence for the master; Cycles settings are Blender-render only and don't apply to raea.
