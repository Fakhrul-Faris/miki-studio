---
title: Audio first — time shots to the beat (for us, the spoken word)
bucket: 05_Camera_Raea_Pipeline
type: master
members:
  - cards/05_Camera_Raea_Pipeline/beat-counted-shot-timing--product-animation-masterclass.md
  - cards/05_Camera_Raea_Pipeline/soundtrack-first-shot-timing--car-animation.md
sources: ["Full 3.5 Hour Product Animation Masterclass [Blender 4.3].txt", "Making a Car Animation in Blender!.txt"]
use_when: "locking setup changes to voice/music beats"
style_fit: Core Style D rule — the voice (vo_timeline.json) is the master clock; every setup and state change lands on a word. Conflict: no generic editor transitions ("spicy transitions") — joins are built from scene objects; music is never the clock; licensed beds only.
---

## METADATA
05_Camera_Raea_Pipeline | Blender 4.3 (masterclass) / unknown (car) → 5.x API | principle + Blender bpy (timing reference) + raea

## CREATIVE_INTENT
It is far easier to build shots to a finished soundtrack than to find audio that fits finished shots: the audio's structure
decides the film's length, the number of shots and where each one changes, and each key action is placed on a counted beat.
- Car animation: lock the audio first, split it into segments, one shot (one job) per segment, last segment = logo/end card.
- Product masterclass: count frames from the cut to the next beat in the edit and place the "arrival" keyframe there,
  ~2 frames early because an action reads before it lands.

## STE_PROCEDURE
1. Before planning shots, list what the reference/competitor version is missing (design emphasis, the unique feature, a real hero shot).
2. Lock the audio first (for us: the user's recorded voice, processed, with word timings in `audio/vo_timeline.json`).
3. Count the audio's segments and their lengths (car video: 7 segments of ~6–7 s in a 41 s track; for us: a new setup every 2–3 s on a word).
4. Reserve the last segment for the logo / end card (for us: Meikigo end card + the one signature sound).
5. Assign one shot per remaining segment and give each shot one job (car video: shots 1–3 build intrigue, 4–6 show the product).
6. End on a quieter shot after the busiest ones.
7. Load the audio into Blender before animating so events (lights switching on, a lid opening) land on the beat/word.
8. From each planned cut point, count frames to the next beat (or hi-hat/snare; for us the stressed word) frame by frame.
9. Put the key "arrival" keyframe at that count minus ~2 frames (masterclass: camera settles at frame 7; swing ends at 37 = 39 − 2).
10. Render, drop into the edit, and nudge by single frames; shift the audio rather than re-render when possible.
11. Before final export, set the edit's Out point one frame back from the last frame (Resolve places it one frame late → a black frame).
12. For a looping ad, cut the music back to its start at the end so it feels looped.

## VALUES BY SOURCE
| parameter | Product masterclass | Car animation | recommended for Style D (+ why) |
|---|---|---|---|
| clock | music beat | music segments | spoken word (vo_timeline.json) — the voice exists before the shot list |
| frame rate | 24 fps | unknown | 30 fps build, 60 fps final export (house pipeline) |
| shot length | beat-counted (7 f move, 39 f drop) | ~6–7 s per segment | 2–3 s per setup, on a word |
| lead offset | −2 frames before the beat | — | land 0–2 frames before the word (reads on the word) |
| end | loop music back to start | last segment = logo | Meikigo end card + the single signature sound |
| audio track | licensed music bed | AI-generated ambient track | voice only + sparse SFX; licensed bed only if used |

## AGENT_EXECUTION
Blender 5.x (timing reference only; Blender never renders the final):
```python
import bpy
scn = bpy.context.scene
scn.render.fps = 30
if not scn.sequence_editor: scn.sequence_editor_create()
scn.sequence_editor.strips.new_sound("VO", "//audio/vo.wav", channel=1, frame_start=1)   # 5.x: .strips (was .sequences)
scn.use_audio_scrub = True
beat = 39                                   # counted frames from the cut to the beat/word
cam = scn.camera
cam.keyframe_insert("location", frame=beat - 2)   # arrival ~2 frames early
```
raea (the voice is the soundtrack): build the shot list from `audio/vo_timeline.json`; kit `words()` / `sceneAt()`
(`tools/raea/kit/ui.tsx`) give word frames and the active setup.
```tsx
const wf = w("L03", "profit");                         // frame of the word (w = kit words(tl) timeline)
<Sequence from={wf} durationInFrames={n} layout="none">{/* setup */}</Sequence>
const t = interpolate(f, [wf - 12, wf - 2], [0, 1], { easing: inOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
```

## NOTES
- Deprecated: VSE `sequence_editor.sequences` → `.strips` in 5.x (`strips.new_sound`).
- Visual gaps: beat positions are audible only; the car video's storyboard sketch is shown only.
- Rule conflicts: "add spicy transitions in the editor" — not allowed; joins are camera flights / object morphs from the
  scene. Music downloaded from YouTube (ytmp3) must not be used — licensed beds only; SFX stay sparse (outro = the one
  Meikigo signature sound). Music is not the master clock; the voice is.
