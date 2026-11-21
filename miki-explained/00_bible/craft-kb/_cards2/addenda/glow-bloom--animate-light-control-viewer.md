# Addendum → masters/05_Camera_Raea_Pipeline/glow-bloom.md
Source: "Studio Lighting, Silhouettes & Color Theory/Animate Light to Control Your Viewer | After Effects (No Plugins).txt" — 01:05–03:45

## Variant: stacked glows for a light line (core → mid → wide haze)
1. Line stroke 10; CC Radial Fast Blur amount 95 % (centre sets the light direction).
2. Glow 1: radius 0, intensity 0.6. Glow 2 (duplicate): threshold raised slightly, intensity ~0.8 — "with the glow
   threshold we can really control the type of light".
3. Second Radial Fast Blur, zoom "brightest", its centre Y offset → two light sources for depth (a third possible).
4. Final glow: radius ~100, intensity 0.1 for a wide faint haze.

## VALUES BY SOURCE row
| parameter | Animate Light (AE) | recommended for Style D |
|---|---|---|
| layers | tight glow (r 0, 0.6) + thresholded glow (0.8) + wide haze (r 100, 0.1) | one `<Bloom>` (threshold 0.85–0.9, intensity 0.15–0.3); wide haze from volume/fog, not extra bloom |
| sources | 2–3 offset centres | 2 lights ≤ ~0.1 m apart for a split highlight |
