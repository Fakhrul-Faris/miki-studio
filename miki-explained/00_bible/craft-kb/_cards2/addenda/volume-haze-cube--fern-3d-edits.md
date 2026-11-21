Target: `masters/04_Shading_Lighting/volume-haze-cube.md`

## New VALUES BY SOURCE row
| source | node | Blender density | anisotropy | extras | raea values in card |
|---|---|---|---|---|---|
| fern-3d-edits (RED style) | Volume Scatter | 0.005 | ~0.3 (STT heard "2.3", outside Blender's -1..1 range — read as 0.3, consistent with the video's thin, not-smoky haze) | box spans from just before the desk to the back wall behind the second character; raised volume light-pass for this volume specifically | density 0.02 (keep Style D median; 0.005 source value is thinner than our baseline), scattering 0.45, absorption 0.1, anisotropy 0.3–0.5, neutral warm tone |

## Notes
- Source also raises the render engine's "light pass for the volume" (a Cycles light-path/volume setting) specifically because this scene has volume in frame — not a new visual value, just a render-correctness step; no raea equivalent needed since raea's volumetric rendering doesn't have a separate per-pass toggle for this.
- No rule conflict; this reinforces the master's existing "keep it faint, neutral, never the brand accent" guidance — fern's 0.005 density is on the fainter end of the master's range, useful as a reference point for a very subtle haze.

## Source timestamp
17:06–17:41, 18:38–19:09
