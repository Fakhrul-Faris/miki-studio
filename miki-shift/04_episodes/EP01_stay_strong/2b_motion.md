# EP01 — Stay Strong — Motion clips (optional, Seedance image-to-video)

Short clips that replace a still in the edit. Everything else stays stills + zoom/pan.
Generate **after** the finals in `2_frames.md` are approved — every clip starts from a finished frame.

## Rules for every clip

| Rule | Why |
|------|-----|
| **Image-to-video only.** First frame = an approved still (plus last frame where listed) | Miki can't drift off-model; Seedance only animates between drawings we already like |
| **Locked camera.** No zoom, pan, orbit or shake | Orbits and dollies force a flat drawing into fake 3D. The push-in is added in the edit, and a still phone makes the notification screen-replace trivial |
| **Character acting only** — small, readable moves (glance, wince, blink, nod) | Limited-animation look; big moves warp outlines |
| **No speaking, mouth closed** | Dialogue is ElevenLabs audio laid in the edit — generated lip movement would never sync |
| **Phone screen stays blank and dark** | Stock notifications are composited in the edit |
| **Discard generated audio** | Voice and SFX come from `3_voice.md` |
| **Duration:** the shortest the tool allows (aim 4–5s). Action finishes by ~2.5s, then holds | The edit slot is 1.2–3s; trim or speed-ramp in the edit |

Prompt order, adapted from Seedance's own structure: **preserve → deliverable → style lock →
camera → exclusions → timed beats → end state.** Live-action parts of that structure (lens, ISO,
shutter, white balance, rigs, orbits, focus pulls) are dropped: they don't apply to flat 2D and they
push the model toward a 3D/photoreal look.

---

## C1 — Hook: the notification lands · replaces F01 + F02 (0.0–3.2s)
First frame: `stills/F01.png` · Last frame: `stills/F02.png`
```text
Strictly preserve the barista's identity, face, black neck-length hair, freckles, pink nose, cream short-sleeve T-shirt, dark brown apron, the green-tile counter, the black phone on its charging stand, the cafe background and the overall composition of the first frame. Create a 4-second vertical 9:16 clip in one continuous take with no cuts, transitions, flashes or morphing.
Style: flat 2D limited animation like a TV sitcom (Bob's Burgers). The drawing style never changes: uniform black outlines, flat colours, no added shading, no 3D rotation, no camera depth effects.
Camera: completely locked off. No zoom, pan, tilt, orbit or shake. The background does not move.
The phone screen stays blank and dark the whole time. No text, subtitles, logos, extra people, speech or lip movement; his mouth stays closed.
0:00–0:01 — He wipes the counter with the white rag in small circles, deadpan and half-lidded.
0:01–0:02 — The rag slows. His eyes slide sideways to the phone.
0:02–0:03 — His eyebrows rise high and his lips press into a tight wince. The rag stops.
0:03–0:04 — Hold the wince, completely still except one slow blink. End exactly on the last frame.
```

## C2 — "Stay strong." · replaces F11 (17.0–20.0s)
First frame: `stills/F11.png`
```text
Strictly preserve the barista's identity, face, black neck-length hair, freckles, pink nose, cream short-sleeve T-shirt, dark brown apron, the black phone in his hand, the cafe background and the overall composition of the first frame. Create a 4-second vertical 9:16 clip in one continuous take with no cuts, transitions, flashes or morphing.
Style: flat 2D limited animation like a TV sitcom (Bob's Burgers). The drawing style never changes: uniform black outlines, flat colours, no added shading, no 3D rotation, no camera depth effects.
Camera: completely locked off. No zoom, pan, tilt, orbit or shake. The background does not move.
The phone screen faces the camera and stays blank and dark the whole time. The phone stays at the same size and position in frame. No text, subtitles, logos, extra people, speech or lip movement; his mouth stays closed.
0:00–0:01 — He holds the phone out toward the camera with a soft, pitying smile.
0:01–0:02 — His head tilts slightly to one side and his brows lift a little higher in sympathy.
0:02–0:03 — One slow, kind blink. The smile softens further.
0:03–0:04 — Hold perfectly still in that pose.
```

## C3 — He knows, we know · replaces F12 (20.0–23.0s)
First frame: `stills/F12.png`
```text
Strictly preserve the barista's identity, face, black neck-length hair, freckles, pink nose, cream short-sleeve T-shirt, dark brown apron, the green-tile counter, the empty charging stand with its loose cable, the still white rag, the cafe background and the overall composition of the first frame. Create a 4-second vertical 9:16 clip in one continuous take with no cuts, transitions, flashes or morphing.
Style: flat 2D limited animation like a TV sitcom (Bob's Burgers). The drawing style never changes: uniform black outlines, flat colours, no added shading, no 3D rotation, no camera depth effects.
Camera: completely locked off. No zoom, pan, tilt, orbit or shake. The background does not move.
No phone appears. No text, subtitles, logos, extra people, speech or lip movement; his mouth stays closed.
0:00–0:02 — He keeps looking off to the left toward the door with a soft, pitying smile. His shoulders drop slightly in a slow exhale.
0:02–0:03 — One slow blink. The corners of his smile sink a little.
0:03–0:04 — Hold completely still. The framing stays identical to the first frame.
```

## C4 (optional) — Customer eating cake · replaces F04 (5.4–7.2s)
First frame: `stills/F04.png`
```text
Strictly preserve both characters' identities and outfits — the barista in the foreground in profile and the stocky customer with a buzz cut and thick black-framed glasses at the table in the background — plus the cafe and the overall composition of the first frame. Create a 4-second vertical 9:16 clip in one continuous take with no cuts, transitions, flashes or morphing.
Style: flat 2D limited animation like a TV sitcom (Bob's Burgers). The drawing style never changes: uniform black outlines, flat colours, no added shading, no 3D rotation, no camera depth effects.
Camera: completely locked off. No zoom, pan, tilt, orbit or shake.
No phone appears. No text, subtitles, logos, extra people or speech.
0:00–0:02 — In the background, the customer happily takes a forkful of cake and chews, swaying a little with joy. In the foreground the barista stays still, watching him with pity.
0:02–0:03 — The barista's brows tilt up a little more.
0:03–0:04 — Hold. The customer keeps chewing contentedly.
```

---

## Using clips in the edit

- Drop each clip into its slot in `4_edit.md`; trim to the slot length. Keep the push-in from the timeline on top.
- **C1:** the notification (N1) is screen-replaced on the phone exactly as on the still — the phone never moves.
- **C2:** track the phone screen if it drifts; if it drifts a lot, fall back to the F11 still.
- **C3** must keep the exact framing of F12 (= F01's angle), so the hard cut back to F01 reads as a loop.
- A clip that warps Miki's face or outlines is worse than a still. Don't keep a bad one.
