---
title: Primary grade — exponential exposure +0.3, small contrast with pivot back, lowered output gain; copy the grade to every render clip
bucket: 05_Camera_Raea_Pipeline
source: "Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt"
source_time: "3:12:02–3:15:25, 3:24:12"
blender_version_source: 4.3
tool_target: raea
tier: full
style_fit: One consistent grade over the whole film; in raea this is one `<Grade>` + ToneMapping exposure.
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 | DaVinci Resolve Color page → raea Grade

## CREATIVE_INTENT
Renders come out flat and slightly dark. Brighten the whites naturally (exponential exposure, not a linear brightness), add a
little contrast, pull saturation back so it pops without distracting, and apply the same node to every clip so shots match.

## STE_PROCEDURE
### Source tool (DaVinci Resolve)
1. Color page; select the clip; add a serial node (`Alt+S`).
2. HDR palette › Exposure (the exponential one) to 0.3; lower Global slightly (~0.2).
3. Primaries: Contrast up slightly; turn Pivot down a little to bring back highlights.
4. Optional: raise RGB outputs then reduce Output Gain to ~0.3 for a controlled saturation lift.
5. Skip film grain for clean 3D (author tested and deleted it).
6. Toggle the node (`Ctrl+D`) / compare (`Shift+D`) to judge before/after.
7. Copy the grade to other clips: select the target clip, middle-click the graded clip's thumbnail. Never grade the adjustment clips (doubles the grade).
8. If two neighbouring shots differ in contrast, raise contrast on the weaker one.

## AGENT_EXECUTION
### Blender / raea translation
- Blender: View Transform AgX, Look "AgX - Medium High Contrast", Exposure +0.3 (`scn.view_settings.exposure = 0.3`) as a preview only.
- raea (one grade for the whole piece; first frame's values hold):
```tsx
<ToneMapping mode="agx" exposure={0.3} />
<Grade saturation={1.05} midtones={{ saturation: 1, contrast: 1.08, gamma: 1, gain: 1, lift: 0 }} highlights={{ saturation: 1, contrast: 1, gamma: 1, gain: 1.02, lift: 0 }} />
```
  Values `~` translated from the Resolve moves; check on a still with `raea render --frame N`.

## NOTES
- Deprecated: none.
- Visual gaps: contrast/pivot amounts are not given; "0.3" exposure and "0.3" output gain are stated.
- Rule conflicts: none.
