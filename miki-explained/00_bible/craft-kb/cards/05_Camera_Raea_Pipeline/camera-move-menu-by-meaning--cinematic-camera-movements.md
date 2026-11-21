---
title: Camera move menu by meaning — static, pan, push/pull, truck, pedestal, tilt, zoom, tracking, arc, crane
bucket: 05_Camera_Raea_Pipeline
source: "Motion Feel, Easing & Camera Choreography/Cinematic Camera Movements Blender Tutorial.txt"
source_time: "00:19–01:03, 01:24–03:13, 04:12–04:34, 05:20–06:15"
tool_target: shot-list
tier: full
use_when: "filling the 'Setup and camera' column; choosing a different move type for consecutive setups"
style_fit: "⚠ conflict: the source's whip pan (La La Land), dolly zoom, POV walk and handheld are excluded (no whip pans/crash zooms; no handheld by default; no people). → adapted: the menu keeps the 10 calm moves, all eased in-out, under ~130°/s and ~40 m/s."
---

## METADATA
05_Camera_Raea_Pipeline | Blender (source) → raea `Camera3d` transform per frame | shot-list vocabulary + raea

## CREATIVE_INTENT
The video names the shots blockbusters use, each with its purpose. A named vocabulary lets a shot list say exactly what
the camera does and why, and stops consecutive setups repeating the same move.

## STE_PROCEDURE
1. Before writing a setup's camera cell, name what the line needs (suspense, connection, scale, reveal, follow).
2. Pick the move from the menu below by that purpose.
3. Do not reuse the previous setup's move type.
4. Ease every move in-out; keep tilts slow ("to add suspense and not take the viewer away from what's important").

| move | what the camera does | source purpose | raea |
|---|---|---|---|
| static | no movement (rotation X 90°, raised a bit) | suspense through absence of movement; enhance the focal point, no distractions | fixed transform; let an object event carry the beat |
| pan | stays put, rotates horizontally (R Z) | follow/scan across | rotate `lookingAt` target sideways |
| push in / pull out | moves toward / away | feel more connected to the subject / a sense of loneliness | `z` eased |
| truck | moves sideways with the subject | follow a moving subject (WarGames run) | `x` eased; linear if the subject moves at constant speed |
| pedestal | moves straight up or down | "same as the truck shot but up and down" | `y` eased, target y follows |
| tilt | rotates up/down in place | reveal the scale of something; keep it slow | target y eased, position fixed |
| zoom | focal length change | slow zoom builds suspense (Get Out); or "practical" phone-style zoom | `fov` eased (see zoom-vs-move-compression) |
| tracking | camera moves anywhere but always looks at the subject (Track To) | the unnoticed workhorse of "almost every movie" | `.lookingAt(subjectPos)` each frame |
| arc | moves along a curve around the subject (spiral path + Follow Path + Track To) | the Matrix bullet-dodge orbit | orbit/spiral (see orbit-camera-rig) |
| crane / jib | big high-to-low arcs (Extra Camera Rigs add-on, crane rig) | "breaks all rules of normal home filming", big-budget feel | rise/descend + arc combined (see jib-down-opens-a-story) |

## AGENT_EXECUTION
Shot-list: write the move name first, then the framing: `tilt up (scale reveal): tag → full shelf`. Board/animatic: no
two consecutive setups with the same move name.

### Worked example
Topic: "Kalau korang nak jual kuih online, ni caranya. 3 step je." (S16, illustrative)
- BEFORE: rows 3–5 all `slow push on the kuih`.
- AFTER: `| 3 | "Step satu: gambar cantik" | static over the kuih tray, phone shutter frame appears | shutter event on "gambar" |`
  `| 4 | "Step dua: letak harga RM1.20 sebiji" | tilt up from one kuih to the full 50-piece tray (scale) | "RM1.20" tag fades in |`
  `| 5 | "Step tiga: hantar sebelum pukul 10" | tracking: camera follows the boxed order sliding to a delivery bag, always looking at it | clock face shows 10:00 |`

### Check
- Does each setup name a move from the menu and its purpose?
- Is the move different from the previous setup's?
- Are whip pan, dolly zoom, POV and handheld absent?

## NOTES
- Visual gaps: menu navigation and rig placement (00:00–00:47) are visual only.
- Dropped: whip pan via dolly rig tracking point (house ban), dolly zoom ("add a lot of emotion … or just make it look silly"; house ban, see cards/05_Camera_Raea_Pipeline/dolly-zoom--cinematography-next-level.md), POV walk navigation with gravity (G) + auto-keying, handheld.
- STT fixes: "bike club" = Fight Club, "wargs" = WarGames (`~`), "Su spent" = suspense, "crl p" = Ctrl+P.
