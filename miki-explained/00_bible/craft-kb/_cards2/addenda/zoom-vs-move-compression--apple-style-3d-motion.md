# Addendum → masters/05_Camera_Raea_Pipeline/zoom-vs-move-compression.md
Source: "Minimalist Tech & SaaS 3D Staging/Apple-Style 3D Motion Design.txt" — 08:17–08:35 (camera reused in scenes 3–4)

## Variant: near-orthographic product look (push far back, zoom to compensate)
"To reduce the perspective distortion": a new camera at Z −35,000 with zoom 35,000 — the model keeps its size but
perspective nearly vanishes, giving the flat, catalogue-like Apple product look; the same camera is copied into every
later scene for consistency.

## VALUES BY SOURCE row
| parameter | Apple-Style 3D Motion (AE) | recommended for Style D |
|---|---|---|
| camera distance / zoom | Z −35,000 px, zoom 35,000 (≈ very long lens) | macro hero far-long: fov ~10–15° with distance d = d24 × mm/24; only for a flat "catalogue" setup — default Style D stays 70–85 mm |
| reuse | one camera copied to all scenes | one camera (raea rule), keep fov constant across setups that must match |
