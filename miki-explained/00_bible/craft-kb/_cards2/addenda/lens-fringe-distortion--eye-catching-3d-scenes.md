Target: `masters/05_Camera_Raea_Pipeline/lens-fringe-distortion.md`
Source: "Minimalist Tech & SaaS 3D Staging/How to actually make eye-catching 3D Scenes | After Effects.txt" (12:27–12:45)

## New VALUES BY SOURCE row
| parameter | this source |
|---|---|
| tool | VC Chromatic Aberrations, or free alternative "Quick Chromatic Aberrations 3" |
| amount | tried 3, settled near 5 (AE plugin units, not Blender's Dispersion 0–1 scale — don't map directly) |
| masking | applied over the *same* edge-only feathered ellipse-mask region used for the vignette (addendum: vignette-grain-curves-grade--eye-catching-3d-scenes.md), not whole-frame — differs from the master's current recommendation of a frame-wide `<Grade aberration>` pass |

## Note on the masked-vs-whole-frame difference
The existing master's raea recipe (`<Grade aberration={0.002}>`) applies a frame-wide RGB split and already says
"raea: no equivalent" for confining the fringe to over-exposed/edge regions only. This source confirms that confining
it to the edges (via a mask) is the intended real-lens behaviour, reinforcing that gap rather than closing it — still
no raea equivalent for a masked, edge-only aberration pass; `<Grade aberration>` remains the closest available option.

## NOTES
- Timestamp: 12:27–12:45.
- Visual gap: none; values and tool name stated directly.
