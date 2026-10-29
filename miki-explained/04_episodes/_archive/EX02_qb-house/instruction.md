
## 1. Master prompt (paste once, first)

```
ROLE
You are the motion designer operating EffectCraft. We are building a 53-second editorial cut-paper motion graphic called "THE DOORWAY" in the style of Vox and Fern explainers. Build ONE shot at a time from my imported layered assets. Never improvise assets or timings.

PROJECT SETUP
- Shot comps: 1920x1080, 24fps, named by shot code (1A, 1B, 2A ... 6C). Plus a MASTER comp that sequences all shots with hard cuts only. Total 1272 frames (53s).
- Palette: paper #EFE8DC, ink #111111, ochre #C98A2B.
- Signal colors, ONLY in shots 4B to 4F: green #27D45A, yellow #F5C518, red #E5322D. Every other shot is strictly paper, ink and ochre. If anything else appears, tell me.
- Fonts: headlines in a bold condensed grotesque (Anton; fallback Bebas Neue or Oswald Bold). Labels and numbers in a mono (IBM Plex Mono; fallback JetBrains Mono).
- Assets are layered PNGs prefixed by shot code, listed back to front in each shot prompt. My actual layer names are authoritative; if a layer is missing or unclear, ask me. Do not invent it.
- All on-screen text is built natively in EffectCraft. Do not use any text baked into images.

STYLE RULES (apply to every shot)
1. Two clocks. The camera moves smoothly at 24fps. Every element animates on 12fps steps: add the expression posterizeTime(12); value to animated properties (position, scale, rotation, opacity, trim paths). NEVER on the camera. If expressions are unsupported, use hold-interpolated keyframes every 2 frames instead.
2. Easing: expo ease-out (fast start, long settle), or custom value = 1 - 2^(-10t). No bounce, overshoot or elastic. Use linear only for continuous mechanical motion (tape, stopwatch hand).
3. Snap and hold: each key pose holds 6 to 8 frames before the next move.
4. Type never fades. Type is stamped (scale 118% to 100% in 2 frames with an instant opacity cut-on), mask-revealed, or cut on letter by letter. Every stamped headline gets misregistration: duplicate the layer, offset 3 to 5 px, multiply at 40-60%.
5. Transitions are hard cuts or match cuts only. No dissolves, wipes or fades, except the final cut to black.
6. Depth: 3D layers spaced in Z, one camera per shot. All parallax comes from the camera, not from layer keyframes.
7. Overlay stack on every shot (top layers, built once as a precomp called OVERLAY and reused): grain (6-8%, overlay), paper texture (multiply, 10-15%), very subtle vignette.
8. No gradients, no lens flares, no glows except the signal light in Segment 4 and the ochre pulse in 6C.
9. Audio: do not generate sound. Add labeled timeline markers for the SFX cues I list per shot.

WORK PROTOCOL
- Build order: 3B first as the technique test, then 3A, then 1A onward in order, then assemble MASTER.
- After each shot: render a low-res preview, summarize what you built, and list anything the tool could not do and what you substituted. Do not silently fake anything.
- Do not change durations or timings without asking me.
- Precomp complex elements. Name layers clearly.

Confirm you understand, and wait for the first shot.
```

## 2. Shot prompts (paste one at a time, in this order: 3B, 3A, 1A to 2D, 4A to 6C)

### Segment 1: The Hook

```
SHOT 1A. The Door. 72 frames (3s).
LAYERS (back to front): 1A_interior_bench (torn-paper silhouettes behind glass), 1A_glass, 1A_door_frame, 1A_foreground_shadow.
CAMERA: smooth push-in toward the door, about 12% scale-equivalent in Z over 72 frames, ease in-out.
ELEMENTS: Native text "WAIT" printed on the glass so it reads correctly from OUTSIDE the shop (not mirrored). Reveal by hard mask wipe left to right in 4 frames, starting at frame 12, multiply on the glass at 85%, with misregistration. Bench layer holds still with a 1px stepped wobble at 12fps.
MARKERS: clock tick at f20, relay click at f60.
```

```
SHOT 1B. The Arrow. 48 frames (2s).
LAYERS: 1B_floor_and_door (low-angle floor with the door at the far end), 1B_arrow (cut-paper arrow, separate layer), 1B_header_hole (dark circle).
CAMERA: hold, with a 2% creep push-in over the full shot.
ELEMENTS: The arrow draws itself from the foreground to the threshold with a trim path (0 to 100% over f0-f30, stepped), then holds. At f36 the header hole steps on to a faint ochre glow (25% opacity, hard cut, no fade) and holds.
MARKERS: paper score sound f0-f30, relay click f36.
```

### Segment 2: Japan, 1996

```
SHOT 2A. WHY? 96 frames (4s).
LAYERS: 2A_sky, 2A_far_buildings, 2A_mid_buildings, 2A_near_left, 2A_near_right, 2A_man (halftone cutout, seen from behind).
CAMERA: slow parallax push, Z spacing so far layers move least, over 96 frames.
ELEMENTS: Native "WHY?" in ink black condensed type, stamped three times, each larger: f12 at 60% size, f36 at 80%, f60 at 100%. Each hit: scale 118% to 100% in 2 frames, with misregistration. Earlier stamps remain behind as ghosts at 35% opacity. Man holds still.
MARKERS: stamp thuds at f12, f36, f60.
```

```
SHOT 2B. The Hour. 60 frames (2.5s).
LAYERS: 2B_desk, 2B_scraps_back, 2B_tape (one long strip running past both frame edges, numbers 20 to 60+), 2B_scraps_front.
CAMERA: linear tracking move along the tape (right to left), ease in-out at the ends.
ELEMENTS: Front scraps move 1.4x the camera speed for parallax. Tape holds. Shadow offset drifts slowly with the move.
MARKERS: tape rasp f0-f50.
```

```
SHOT 2C. The Cut. 60 frames (2.5s).
LAYERS: 2C_bg_paper, 2C_tape_left (short remnant ending at the cut, carries the "10"), 2C_tape_tail (long cut-off piece), 2C_blade_A, 2C_blade_B, 2C_handles. Blades must pivot on one shared anchor.
CAMERA: locked overhead.
ELEMENTS: f6 scissors slide in from the top (expo ease-out, 6 frames). f8-f12 blades open +/-18 degrees. f16-f18 blades snap shut in 2 frames, hard. f18-f42 the tail rotates 12 degrees and falls off the bottom of the frame, ease-in. Native mono-bold "10" on the remnant if the baked numeral is not clean. Hold the final frame 12 frames.
MARKERS: snip at f17, then 8 frames of silence.
```

```
SHOT 2D. The Shop Opens. 72 frames (3s).
LAYERS: 2D_table, 2D_plan_floor, 2D_wall_back, 2D_wall_left, 2D_wall_right, 2D_awning, 2D_door_and_props.
CAMERA: slow orbit, about 8 degrees Y over 72 frames.
ELEMENTS: Walls are 3D layers hinged at their floor edges, rotating from 0 to 90 degrees with expo ease-out and a hard stop, no bounce. Stagger: back wall f6, left f10, right f14, awning folds down (hinge at its top edge) f20. Native "CUT. ONLY." on the awning, corner-pinned to its angle. Native "1996" in the top-right corner, stamped at f48 (scale 120% to 100% in 2 frames, ink bleed). Hold the last 12 frames.
MARKERS: paper fold sounds at f6, f10, f14, f20, stamp thud at f48.
```

### Segment 3: The False Answer

```
SHOT 3A. Speed. 36 frames (1.5s).
LAYERS: 3A_stopwatch_face, 3A_hand (separate layer, pivot at center), 3A_lines_left, 3A_lines_right, 3A_ghost_shop (faint, left edge).
CAMERA: whip left, 0 to -8% X in 8 frames, ease-in, with brief motion blur.
ELEMENTS: Hand rotates linearly, one revolution per 12 frames. Native "SPEED" in bold condensed type above the dial. Speed lines slide in from both edges, f0-f6. At f24 everything freezes (time-hold) and stays frozen for the last 12 frames.
MARKERS: whoosh f0-f20, abrupt silence at f24.
```

```
SHOT 3B. Struck Out. 36 frames (1.5s). BUILD THIS FIRST AS THE TECHNIQUE TEST.
LAYERS: 3B_paper_bg, 3B_tear_patch (dark torn-edge patch beneath, centered), 3B_strip (torn paper strip that will carry the word).
CAMERA: smooth pull-back, 100% to 92% scale over 36 frames.
ELEMENTS: Native "SPEED" in black condensed type on the strip. f0-f6 an ink strike-through draws left to right (trim path, hard, stepped). f12 the strip peels: rotate 0 to 25 degrees around its right edge while sliding off frame right over 10 frames, ease-in, revealing the tear patch. The tear patch must end centered at exactly the size and position the hole starts in 4A (this is a match cut).
MARKERS: paper rip f12.
```

### Segment 4: The Light

```
SHOT 4A. The Hole. 48 frames (2s).
LAYERS: 4A_dark_paper (with torn circular hole), 4A_header_through_hole (door header visible behind), 4A_torn_edge.
CAMERA: push in toward the hole, ease-in, 100% to 400% scale. The hole fills the frame and the last frame is near-black.
CONTINUITY: the hole's position and size at f0 must match the end of 3B.
ELEMENTS: none, camera only. No color.
```

```
SHOT 4B. Green Ignites. 84 frames (3.5s).
LAYERS: 4B_bg_far, 4B_bg_mid, 4B_header_and_light_housing, 4B_door_interior, 4B_silhouette_stride, 4B_ground. Create a native light layer (radial glow, screen) and a native color-wash layer (solid green, overlay 25%).
CAMERA: slight tilt-up with parallax over 84 frames.
ELEMENTS: Starts on black (continuing from 4A). f6 hard cut to the scene, monochrome, light dark. f8 light ON by hard cut in #27D45A: glow layer plus wash layer, the wash mask expanding from the light over 4 frames (expo). The first color in the film, so keep everything else strictly monochrome. f20 native stamp "GO" in condensed type, scale 118% to 100% in 2 frames. Silhouette strides toward the door in 4-frame stepped bob, entering the doorway by f60.
MARKERS: relay click f8, stamp f20.
```

```
SHOT 4C. Yellow. 48 frames (2s).
Duplicate comp 4B, replace the light, wash and label.
ELEMENTS: Light and wash switch to #F5C518 by hard cut at f0 (no crossfade); amber wash. Stamp "5-10" at f8 (same stamp style as "GO"). Silhouette arrives at the threshold by f12, raises an arm to check a watch by pose swap f14-f18, holds 10 frames, steps inside f34-f48.
MARKERS: relay click f0, stamp f8.
```

```
SHOT 4D. Red. 48 frames (2s).
Duplicate comp 4B again.
ELEMENTS: Light and wash switch to #E5322D by hard cut at f0, red wash. Stamp "15+" at f8. Silhouette steps toward the door f0-f8, hesitates (hold 8 frames), then turns by hard flip of the layer (scale X -100%) at f24, and walks away f30-f48.
MARKERS: relay click f0, stamp f8.
```

```
SHOT 4E. The Scan. 72 frames (3s).
LAYERS: 4E_wall_cutaway, 4E_scanner, 4E_ticket, 4E_signal_light_outside. Native: counter digits (mono), ink line (shape layer with trim path).
CAMERA: locked.
ELEMENTS: f6 ticket slides under the scanner (expo, 6 frames). f14 scanner flashes ochre for 2 frames. f16 counter digit flips 0 to 1 by hard cut. f18-f36 a thin ink line draws from scanner up through the wall to the signal light (trim path 0 to 100%, linear, stepped). f38 light changes green to yellow by hard cut (glow and wash swap). Hold.
MARKERS: scanner beep f14, relay click f38.
```

```
SHOT 4F. 700+. 84 frames (3.5s).
LAYERS: 4F_map_japan_dots (halftone paper map), 4F_door_icon (one small door with a light; duplicate it).
CAMERA: slow rise (Z push-out, 100% to 108%) with a slight drift.
ELEMENTS: Place at least 120 door icons across the map, staggered by distance from Tokyo. Each pops on by scale 0 to 100% in 2 frames (hard, 12fps stepped), radiating outward in waves. Light color per door weighted roughly 60% green, 25% yellow, 15% red. Native mono counter bottom-right counts 0 to 700 with Math.floor(linear(time, startTime, endTime, 0, 700)) and ends on "700+", holding the last 10 frames.
MARKERS: rising stepped ticks f6-f70.
```

### Segment 5: Your Door

```
SHOT 5A. The Guess. 168 frames (7s).
LAYERS: 5A_wall, 5A_door_window_bench (crowded interior), 5A_silhouette (frozen, one foot forward, one back), 5A_coin. Native: scribble question mark (shape layer, trim path), mono label "SATURDAY".
CONTINUITY: hard cut from 4F, and color is gone. Fully monochrome. The header above the door is empty, with no light.
CAMERA: very slow push-in, 100% to 108% over 168 frames.
ELEMENTS: f20-f50 the scribble draws itself above the silhouette's head (trim path, stepped). The coin spins on Y rotation, looping continuously on 12fps steps with a tiny vertical bob. It never lands. Silhouette holds with a 1px stepped breathing wobble. Stamp "SATURDAY" bottom-left at f10, small mono.
MARKERS: room tone returns f0, coin spin loop f20-f168. No relay click.
```

### Segment 6: The Doorway Decision

```
SHOT 6A. Known vs Unknown. 96 frames (4s).
LAYERS: 6A_track_top (clean path and flag), 6A_track_bottom (same path), 6A_fog (torn paper fog and scribble), 6A_silhouette_top, 6A_silhouette_bottom. Native: mono labels "A LONG WAIT" and "AN UNKNOWN WAIT", and "40 MIN" on the flag.
CAMERA: locked.
ELEMENTS: Labels cut on letter by letter at f0 (2 frames per character). Both silhouettes walk f6-f40 on stepped 2-frame bob. Top: arrives at the flag, sits by pose swap at f44. Bottom: the fog reveals as the path breaks (stepped mask reveal f6-f30). The silhouette stops at the fog edge at f40, holds 8 frames, turns by hard flip at f48, and walks off the left edge by f90.
MARKERS: footsteps f6-f40 on both tracks, bottom track goes silent at f40.
```

```
SHOT 6B. Title. 60 frames (2.5s).
LAYERS: 6B_paper_bg, 6B_flap_left, 6B_flap_right (remnants of the previous scene). Native: "THE DOORWAY DECISION" (large condensed, ink black, misregistration), thin ink rule.
CAMERA: locked.
ELEMENTS: f0-f8 flaps rotate away (Y axis, 0 to -90 and 0 to 90, expo ease-out). f10 title reveals by hard mask wipe top to bottom in 2 steps. f30-f40 the rule draws left to right under the title (trim path, stepped). Hold.
MARKERS: low drone starts f10.
```

```
SHOT 6C. The Question. 84 frames (3.5s).
LAYERS: 6C_door_wide (reference door, wide frame, black surround), 6C_header_hole (dark), 6C_paper_strip (torn strip behind the headline). Native: "WHAT DOES YOUR DOOR TELL THEM?" in ink-black condensed type.
CAMERA: slow pull-back, 105% to 100% over 84 frames.
ELEMENTS: The headline is built letter by letter, one character per frame, f6-f40, cut on (no fades). Hold. At f56 the header hole steps on to a faint ochre glow (#C98A2B at 35%, hard cut, no fade), holds 12 frames. f80-f84 hard cut to black.
MARKERS: a single relay click at f56. Nothing follows it.
```

## 3. Final assembly prompt

```
Assemble the MASTER comp, 1272 frames at 24fps, in this order with hard cuts only:
1A 72, 1B 48, 2A 96, 2B 60, 2C 60, 2D 72, 3A 36, 3B 36, 4A 48, 4B 84, 4C 48, 4D 48, 4E 72, 4F 84, 5A 168, 6A 96, 6B 60, 6C 84.
Check the match cuts: 3B to 4A (tear patch to hole, same position and size) and 4A to 4B (black to light ignition). Render a full low-res preview and report any shots running over or under their frame counts. Do not change durations without asking.
```
