# merge-m4 — done (25 masters, 05_Camera_Raea_Pipeline)

topic → master path → member count

- audio-first-beat-timing → masters/05_Camera_Raea_Pipeline/audio-first-beat-timing.md → 2
- bokeh-blades-shape → masters/05_Camera_Raea_Pipeline/bokeh-blades-shape.md → 2
- camera-height-psychology → masters/05_Camera_Raea_Pipeline/camera-height-psychology.md → 2
- camera-monitor-viewport → masters/05_Camera_Raea_Pipeline/camera-monitor-viewport.md → 2
- camera-plausible-position → masters/05_Camera_Raea_Pipeline/camera-plausible-position.md → 2
- cinematic-aspect-letterbox → masters/05_Camera_Raea_Pipeline/cinematic-aspect-letterbox.md → 2
- composition-guides → masters/05_Camera_Raea_Pipeline/composition-guides.md → 3
- dark-edge-framing → masters/05_Camera_Raea_Pipeline/dark-edge-framing.md → 2
- dof-focus-fstop → masters/05_Camera_Raea_Pipeline/dof-focus-fstop.md → 2
- dutch-roll → masters/05_Camera_Raea_Pipeline/dutch-roll.md → 2
- film-grain → masters/05_Camera_Raea_Pipeline/film-grain.md → 2
- final-grade-pass → masters/05_Camera_Raea_Pipeline/final-grade-pass.md → 5
- focal-length-choice → masters/05_Camera_Raea_Pipeline/focal-length-choice.md → 3
- foreground-framing → masters/05_Camera_Raea_Pipeline/foreground-framing.md → 2
- glow-bloom → masters/05_Camera_Raea_Pipeline/glow-bloom.md → 3
- layered-camera-rig → masters/05_Camera_Raea_Pipeline/layered-camera-rig.md → 2
- leading-lines → masters/05_Camera_Raea_Pipeline/leading-lines.md → 2
- lens-fringe-distortion → masters/05_Camera_Raea_Pipeline/lens-fringe-distortion.md → 3
- lighting-ab-compare → masters/05_Camera_Raea_Pipeline/lighting-ab-compare.md → 2
- orbit-camera-rig → masters/05_Camera_Raea_Pipeline/orbit-camera-rig.md → 2
- per-hue-correction → masters/05_Camera_Raea_Pipeline/per-hue-correction.md → 2
- rack-focus-target → masters/05_Camera_Raea_Pipeline/rack-focus-target.md → 3
- split-tone-cool-shadows → masters/05_Camera_Raea_Pipeline/split-tone-cool-shadows.md → 2
- view-transform-agx → masters/05_Camera_Raea_Pipeline/view-transform-agx.md → 2
- zoom-vs-move-compression → masters/05_Camera_Raea_Pipeline/zoom-vs-move-compression.md → 3

## Confirmed on Blender 5.3 (headless probe) — candidates for BPY-CHECK.md
- Compositor: `bpy.data.node_groups.new(name, "CompositorNodeTree")` + `ng.interface.new_socket("Image", in_out='OUTPUT', socket_type='NodeSocketColor')`, assigned to `scene.compositing_node_group` (DeprecationWarning: to be removed in 6.0). `CompositorNodeComposite` is gone → `NodeGroupOutput`.
- `CompositorNodeMixRGB` is gone → `ShaderNodeMix` (`data_type='RGBA'`, sockets `Factor_Float`, `A_Color`, `B_Color`, `Result_Color`).
- Node options are now input sockets with display-name menu values: Glare `Type` ('Bloom', 'Fog Glow', 'Streaks', 'Ghosts', 'Simple Star', 'Sun Beams', 'Kernel'), `Quality`, `Highlights Threshold`, `Strength`, `Size`; Lens Distortion `Type` ('Radial'|'Horizontal'), `Distortion`, `Dispersion`, `Fit`, `Jitter`; Blur `Type` ('Gaussian' …), `Size` (pixels, vector; no relative option); Ellipse Mask `Size` (vector); Color Balance `Type` ('Lift/Gamma/Gain' …), `Color Lift` etc.
- RGB Curves `mapping.curves`: 0 R, 1 G, 2 B, 3 Combined (the vignette-grain-curves member card used 3 = blue, 2 = green; corrected in the master). Hue Correct curves: 0 H, 1 S, 2 V.
- No `CompositorNodeSplitToning` type registered in 5.3.
- `bpy_extras.anim_utils.action_get_channelbag_for_slot` exists. `camera.dof` props: use_dof, focus_object, focus_subtarget, focus_distance, aperture_fstop/blades/rotation/ratio.
- OCIO looks in 5.3 keep the "AgX - " prefix ("AgX - Medium High Contrast", "AgX - Punchy").

Nothing skipped. Member cards untouched.
