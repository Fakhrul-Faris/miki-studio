# MKG-04 After Effects build guide

Matches `MKG-04.md` v4.5. Times are on the 30 s master timeline.

## 1. Project setup

- **Comp settings:** 1920x1080, 30 fps, 30 s, colour depth 16 bpc, linear compositing off, working space sRGB. Generated clips are 1280x720 at 60 fps: drop to 30 fps by placing them in the 30 fps comp with frame blending off.
- **Folders:** `01_Source_clips`, `02_Stills`, `03_UI`, `04_Precomps`, `05_Audio`, `06_Main`.
- **Naming:** keep the clip names from the tracker (S1, S2, S3B, N1, N2A, N2B, R1, R3, D1, D2, D3).
- **Colour:** one adjustment layer on top of everything for the shared look (slight contrast, warm 5600K balance, fine grain). Grain: add the same Add Grain preset on a top adjustment layer so all clips match, instead of grading each clip.
- **Badge:** every generated clip has a corner badge top-left. Scale each clip to 105% anchored to the bottom-right, or put a 120x120 px patch mask over the corner. Do it once in each clip's precomp.

## 2. Comp structure

Make one precomp per scene, then assemble in `Main`.

| Comp | Length | Contents |
|---|---|---|
| `S1_Hook` | 3.0 s | N1 clip, text layer, SFX |
| `S2_Bubbles` | 2.0 s | Bubble animation (Figma export or AE shapes), text layer |
| `S3_Sheet` | 2.0 s | N2A (1.2 s) then N2B (0.8 s), hard cut |
| `S4_Logo` | 2.0 s | Logo reveal, text layer |
| `S5_Phone` | 5.0 s | S1 clip (3 s), D1 dive (2 s), UI-P, glare plate |
| `S6_Tablet` | 5.0 s | R1 reversed (1 s), S2 (2 s), D2 (2 s), UI-T, glare |
| `S7_Laptop` | 6.0 s | R3 reversed (1.2 s), S3B (2.4 s), D3 (2.4 s), UI-L, glare |
| `S8_EndCard` | 5.0 s | Flat colour, text states, logo, URL |
| `Main` | 30 s | All scene precomps back to back, music, VO, SFX, global adjustment layer |

Place scene precomps in `Main` at: S1 0, S2 3, S3 5, S4 7, S5 9, S6 14, S7 19, S8 25.

## 3. Prepare each generated clip

1. **Trim** to the used length in the scene precomp (see the master timeline). Keep the 1 s of handles outside the visible range.
2. **Reverse R1 and R3:** right-click the layer > Time > Time-Reverse Layer. Trim first (R1 used 1.0 s, R3 used 1.2 s), then reverse. After reversing, check that the last frame is S2-KF-START (R1) and S3-KF-LAND (R3).
3. **Retime D1, D2, D3** (the push-in arrives too late):
   - Enable Time Remap. Put a keyframe at 0 s and at about 1.0 s, set the 1.0 s keyframe to the clip's real "green fills the frame" moment. Then Easy Ease the two keyframes so the push-in accelerates in and settles out.
   - Where the green never fully fills the frame: add a Scale animation over the last 0.4 s (for example 100% to 130%) to push past the bezel. Check no phone edge, camera island or finger is visible by the 1.0 s mark. Remember the source is 720p, so keep scale at or below about 140%.
4. **Fix the 60 to 30 fps** by leaving frame blending off. If motion looks strobed, turn it on only for the slow dive moves.

## 4. UI on the holds (S1 5b, S2 6b, S3B 7b)

For each clip the UI goes under the footage, and the green is keyed out of the footage on top. That keeps the hand and the bezel in front of the UI.

1. **Duplicate the footage** to a tracking layer. Run Mocha AE (Animation > Track in Mocha) on the screen: make a four-point spline around the green screen only (exclude the bezel and the hand), choose Perspective, track forwards, then export the corner-pin data and apply it to the UI layer.
2. **Apply Corner Pin** to the UI precomp (the exported data replaces the four corner points). The UI precomp is face-on at the device's screen aspect (see the UI spec).
3. **Key the green:** on the footage layer apply Keylight (1.2). Screen Colour: pick the middle of the green. Screen Gain 100, Screen Balance 50. Clip White around 85 and Clip Black around 20. Set View to Screen Matte and check the screen is solid and the edge of the bezel is clean. Add Simple Choker (-1) if a green fringe shows.
4. **Despill:** in Keylight, set Despill Bias to the colour of the skin and the sleeve (sample the hand), or add a Spill Suppressor. Check the sleeve and the finger edges nearest the screen.
5. **Layer order:** UI (corner pinned) at the bottom, keyed footage above it.
6. **S3B only:** the laptop moves while the finger pulls it. Track the screen for the whole clip. If a perspective track is unstable, split the clip into the pull (0 to 1.4 s) and the rest, and track them separately.
7. **Realism pass on the UI** (a precomp over each screen):
   - Add a glass glare: place MACRO-STILL, mask the highlight diagonal using Levels (output the bright diagonal), set the layer to Screen at 10 to 20% opacity, corner pin it to the same track.
   - Add a faint pixel texture and the same grain.
   - Match brightness: lower the UI's whites slightly so it does not look pasted on.
   - Screen glow on the hand: duplicate the UI, Gaussian Blur 80, Screen mode at 10 to 15%, masked loosely to the hand and the sleeve near the screen.

## 5. Macro dives (D1, D2, D3)

The generated clip supplies the real push-in, the glass glare and the light. The UI plays full frame under the glare.

1. **Place the full-frame UI dive plate** (a tall UI strip, see the UI spec) under the footage layer. It is already face-on and scaled to fill the frame width.
2. **Key the green** of the footage as in section 4. Because the screen fills the frame, the key should be solid.
3. **Animate the plate:** Position Y moves bottom to top across the plate during the dive (Easy Ease), starting the moment the green fills the frame. The camera move in the footage and the plate move should agree in direction (upward).
4. **Glare on top:** keep the footage's own reflections. If the keyed footage loses them, put a glare layer (MACRO-STILL, Levels isolated, Screen mode) above the UI.
5. **Dust specks:** keep them, they sell the glass.
6. **Final frame of each dive:** hold UI-P4, UI-T4, UI-L4 steady for the last 0.3 s.

## 6. The two reveals (R1 into the tablet, R3 into the laptop)

Both follow the same recipe.

1. Place the reversed clip. The first frame is a full-frame green (the end of the push-in, reversed).
2. **The dissolve in the first 0.3 s:** the outgoing UI (UI-P4 for R1, UI-T4 for R3) is on top and fades to 0% while the incoming UI (UI-T1 for R1, UI-L1 for R3) fades up beneath it, both full frame, face-on. Use opacity keyframes with Easy Ease.
3. **Pull-back:** the incoming UI is corner pinned to the reversed clip's tracked screen. Because the clip moves from face-on to 3/4, track the whole reversed clip in Mocha and apply the data. The UI starts full frame and ends as a 3/4 screen on the tablet or laptop.
4. **Handoff:** the incoming UI then stays on the device through S2 (6b) and S3B (7b), so continue the same UI precomp into the next clip's tracking data without a visible jump. Match the UI state at the cut.
5. **SFX:** one whoosh over the reveal; keep voice out of it.

## 7. Handwriting and N1 / N2A / N2B

No UI. Treat only for polish:
- Fix any garbled letters by overlaying hand-lettered text drawn with the Pen tool and a Write-On: add a Stroke effect on a path shaped like the word, animate End 0 to 100% following the pen tip, ink colour #1B2A6B, size matched to the real handwriting. Track it to the notebook or sheet with the Mocha planar data.
- N2B: trim at the crush; cut to scene 4 on the beat.
- Keep the corner badge patched.

## 8. Figma animation (bubbles, logo, UI)

- **Chat bubbles:** export from Figma as PNG or SVG per bubble and animate in AE: Scale 0% to 108% to 100% with the overshoot expression below, staggered by 3 frames, each Position Y rising 20 px.
- **Logo reveal:** animate in AE, Scale 85% to 100%, Opacity 0 to 100, with a 3% push-in on the comp.
- **UI:** import each Figma frame as a layer-per-component PSD or SVG so numbers and chips can be animated.

### Expressions to reuse

Overshoot pop (apply to Scale after setting two keyframes):
```
freq = 3; decay = 6;
n = 0;
if (numKeys > 0) { n = nearestKey(time).index; if (key(n).time > time) n--; }
if (n == 0) { value } else {
  t = time - key(n).time;
  v = velocityAtTime(key(n).time - 0.001);
  value + v * Math.sin(freq * t * 2 * Math.PI) / Math.exp(decay * t) / 10
}
```

Count-up number (Source Text on a text layer, slider "Value" and "Format" in an effects controls null):
```
v = Math.round(effect("Value")("Slider"));
"RM " + v.toFixed(2);
```
Animate the slider from 0 to the target over 0.7 s with Easy Ease. For whole numbers (customers, queue) use `v.toFixed(0)`. For the total use `v.toFixed(0)` with a thousands separator if needed.

Smooth easing on positions (inertial, add to Position after keyframes):
```
amp = 0.04; freq = 2.5; decay = 5;
n = 0;
if (numKeys > 0) { n = nearestKey(time).index; if (key(n).time > time) n--; }
if (n == 0) { value } else {
  t = time - key(n).time;
  v = velocityAtTime(key(n).time - 0.001);
  value + v * amp * Math.sin(freq * t * 2 * Math.PI) / Math.exp(decay * t)
}
```

## 9. Audio

- **Layers in `Main`:** `VO` (nine takes placed at the windows in the script), `SFX`, `Music`.
- **VO:** each take on its own layer, trimmed head and tail, placed at its window. Add a small audio Levels fade (0.05 s) at each edge.
- **Music:** one bed, a steady light pulse at around 100 BPM so cuts can land on the beat. Duck 8 to 10 dB under the voice with keyframes (or an Audio Levels expression linked to the VO envelope), lift to 0 dB on the logo at 0:29.
- **SFX cues (from the UI spec):** page flip and pen scratch (scene 1), four pops (scene 2), paper rustle and crush (scene 3), soft chime on the logo (scene 4), whoosh and ticks (scene 5), whoosh on the reveals (6a, 7a), counter chime on payment, ping on totals, resolve chime on the logo (scene 8).
- **Markers:** add a layer marker in `Main` at every VO window start and every SFX hit so you can ripple-edit and keep them in sync.

## 10. End card (S8)

- Background: the colour that the last dive floods into (match the exact RGB value from UI-L4, put it in a solid layer).
- Text states: ease in with a 12 px upward drift over 0.4 s. Type: one clean sans, large, centred, ends with a period.
- Logo with the URL beneath. Hold 1 s.
- Keep a calm text-safe zone: centred, 80% width.

## 11. Output

| Deliverable | Comp | Settings |
|---|---|---|
| 16:9 master | `Main` | 1920x1080, H.264 high bitrate, AAC 320 kbps, or ProRes 422 for the master |
| 9:16 | `Main_9x16` | 1080x1920, a duplicate of Main with each scene precomp repositioned (see the 9:16 notes in `MKG-04.md`); scene 6 scaled to fit the width |
| 15 s | `Main_15s` | A duplicate of Main with the cutdown from `MKG-04.md` |

Render each through Adobe Media Encoder.

## 12. QA checklist before export

- [ ] No corner badge visible on any clip
- [ ] No green fringe on hands, sleeves or bezels
- [ ] No readable logos or garbled letters on any clip
- [ ] UI never covers the hand or the bezel
- [ ] Every cut lands on a music beat or a UI action
- [ ] VO is clean and the line windows match the on-screen text
- [ ] The dives end on the held UI frames and the colour flood matches the end card
- [ ] The tablet scene works in 9:16
- [ ] 15 s cutdown plays without gaps
