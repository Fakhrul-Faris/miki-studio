---
title: Normalize the Graph Editor to compare mismatched-scale F-curves on one screen
bucket: 01_Animation_Motion
source: "Motion Feel, Easing & Camera Choreography/Mastering Blender Graph Editor.txt"
source_time: "08:17–09:16"
blender_version_source: 4.3 (unstated; workflow unchanged across 3.x–5.x)
tool_target: Blender bpy | raea
tier: full
use_when: "sculpting two or more channels together (e.g. rotation −30° and location +8 cm) and one curve looks flat next to the other"
style_fit: "Pure authoring-tool literacy; makes multi-channel hand animation (Style D's hand-built state changes) easier to judge by eye. No house-rule conflict."
---

## METADATA
01_Animation_Motion | Blender 4.3 | Blender bpy (Graph Editor "Normalize" toggle) + raea (per-channel `interpolate` range check)

## CREATIVE_INTENT
Two channels keyed on the same object (an X-rotation going to −30° and a Z-location going to 8) sit at wildly
different scales in the Graph Editor, so one looks like a flat line next to the other and you "can't really see them
in relation to one another." Normalize re-maps every channel to a shared −1…0…1 band (bottom extreme, no
transform, top extreme) so their *shapes* — timing and spacing — become comparable regardless of their real units.

## STE_PROCEDURE
1. Before shaping two or more channels together, open the Graph Editor's channel list (left side panel).
2. Select the channels to compare (e.g. rotation and location on the same object).
3. Click **Normalize** (top of the Graph Editor).
4. Read each curve as a −1…1 band: −1 = that channel's lowest keyed value, +1 = its highest, 0 = no change.
5. Shape handles/timing by comparing the normalized curves' silhouettes, not their raw numbers.
6. Toggle Normalize off again before reading or typing exact values back into a channel.

## AGENT_EXECUTION
Blender: Normalize is a view-only toggle (`space_data.use_normalization = True` in the Graph Editor's
`SpaceGraphEditor`); it never changes keyframe data, only the display scale, so it's safe to leave on while sculpting
and off while typing exact values.

raea: there is no Graph Editor to toggle, but the same comparison problem exists when hand-tuning two
`interpolate(...)` tracks with different output ranges (e.g. rotation in radians next to position in metres). Before
comparing their eased shapes, temporarily normalize both to 0–1 in a scratch calculation:
```tsx
const norm = (v: number, lo: number, hi: number) => (v - lo) / (hi - lo);   // view-only, for comparing shapes
```
Use this only to eyeball whether two tracks' easing *reads* in step (e.g. "does the rotation finish its ease at the
same relative moment as the location dip?"); keep the real `interpolate` calls in native units.

### Worked example
Topic: "Troli Mr DIY — kenapa roda selalu senget?" (illustrative).
BEFORE: a wheel-wobble shot keys rotation (0→−12°) and a Z-bounce (0→0.01 m) on the same trolley wheel; the bounce
curve looks flat next to the rotation curve, so the animator can't tell if the bounce peaks with the rotation.
AFTER: Normalize both channels, see the bounce actually peaks two frames late, and retime it to land with the
rotation's peak — the wobble now reads as one coordinated wiggle, not two unrelated channels.

### Check
- When two channels of different scale are keyed on the same object, is Normalize on before judging their timing together?
- Is Normalize off again before typing or reading an exact keyed value?
- Does the raea equivalent (temporary 0–1 remap) only change what's displayed/compared, never the actual output values?

## NOTES
- Visual gaps: none — the toggle and its effect are shown directly on screen.
- Rule conflicts: none; this is a viewing aid, not a motion technique, so it doesn't touch any house rule.
