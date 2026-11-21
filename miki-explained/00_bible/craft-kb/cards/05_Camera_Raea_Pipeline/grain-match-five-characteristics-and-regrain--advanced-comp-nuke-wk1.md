---
title: Match grain on five characteristics (intensity, luminance curve, size, softness, pattern) and regrain the comp
bucket: 05_Camera_Raea_Pipeline
source: "Advanced Compositing for VFX | Week 1 Lessons for Nuke Artists.txt"
source_time: "30:40–35:59; 4:13:27–4:24:15; 4:44:39"
blender_version_source: n/a (Nuke, DasGrain / AdvancedGrain)
tool_target: principle-only
tier: principle
style_fit: Partly conflicts with our pipeline — raea renders clean CG with no plate to match; grain is an optional unifying texture across shots, kept very subtle (it also costs bitrate on TikTok).
---

## METADATA
05_Camera_Raea_Pipeline | n/a (Nuke) | principle-only

## CREATIVE_INTENT
Principle: every added element needs grain matching the plate on five traits — intensity, luminance curve (more grain in shadows than highlights), grain size, sharpness/softness, and pattern/irregularity. Grain (film, luminance-only) and noise (digital, per-channel RGB) are handled the same way. Each shot is a new grain structure, even from the same camera. Idea: for a filmic look, borrow real film grain from a reference clip rather than synthetic noise.

## STE_PROCEDURE
1. Check intensity: added grain neither stronger nor weaker than the plate's.
2. Check the luminance curve: more visible grain in darks, little in highlights; uniform grain looks wrong.
3. Match grain size per channel; then match sharpness/softness.
4. Match pattern/irregularity (less of an issue with modern sensors).
5. Regrain last, after all comp work and just before the final crop.
6. With the original plate: extract grain as plate minus degrained plate, normalise it, adapt it per luminance.
7. If the plate was transformed (camera shake), apply the same transform to both grain inputs.
8. Or sample a flat grain patch (scatter) and spread it over the frame to avoid detail ghosts.
9. Without DasGrain: set per-channel size (~1.8) and intensity (~0.05), shape the R/G/B luminance-falloff curves by eye.
10. For film grain: degrain a film reference, feed it as the grain source, scatter from a flat area, reduce strength to taste.

## AGENT_EXECUTION
### Source tool (Nuke)
`DasGrain` (inputs: plate, degrained plate, comp) → Analyze; Adjust tab shows the per-luminance curve; Replace tab → Activate scatter with a sample box over a flat area; all inputs same resolution (Reformat). Fallback `F_ReGrain`/`Grain2` or `AdvancedGrain` (size R/G/B 1.8, intensity ~0.05, black 0, curves edited with Ctrl-Alt-click keys). Reference clips: `TimeOffset` so the frame range starts at 1001/1000.
### Blender / raea translation
- raea: no film-grain prop for the standard look (`<Look grain>` exists only for the `paint`/`site`/`pixel` looks). raea: no equivalent (no plate grain to analyse; renders are noiseless).
- Optional post step outside raea (~): ffmpeg `-vf "noise=alls=3:allf=t"` at encode, luminance-weighted grain is not available there; keep it barely visible.
- Live-action inserts (phone screen recordings, stock video on a `<Screen>`): denoise them first so they match the clean CG instead of adding grain to the CG.

## NOTES
- Visual gaps: AdvancedGrain curve shapes are shown, not spoken; only "flatten over highlights, more in shadows, never zero" is given.
- Rule conflicts: none, but default is no grain unless the user asks for a filmic look.
