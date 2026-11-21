# Addendum → masters/01_Animation_Motion/drag-overlap-chain.md
Source: "Motion Feel, Easing & Camera Choreography/Smooth UI Animation After Effects Tutorial.txt" — 01:08–02:10, 04:45–05:04, 09:35

## Variant: UI element cascade (one entrance copied, offset per layer)
One Transform effect: position + opacity keyed at 1 s; at 0 s position moved slightly, opacity 0; easy ease, graph
shaped. Copy the effect to every other layer and offset each by 2–3 frames "to add overlapping" — "a nice smooth
animation". Same for the rest of the UI layers; depth layers are offset "slightly based on their position".

## VALUES BY SOURCE row
| parameter | Smooth UI (AE) | recommended for Style D |
|---|---|---|
| per-item delay | 2–3 f (at ~30 fps) | 3–4 f @30 fps (raea `<Stagger each={3}>`), 6–8 f @60 fps |
| entrance | small position offset + opacity 0→100 over 1 s eased | `rise` ≥ 12 f |
| order | by position on screen | top→bottom / near→far |
