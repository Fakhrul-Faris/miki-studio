---
title: Hold the on-screen line through the whole voice line, whatever the voice's pacing
bucket: 09_UI_Motion
source: "Minimalist Tech & SaaS 3D Staging/Animated SaaS Videos Transcript.md"
source_time: "1:39–2:02"
tool_target: raea
tier: full
use_when: "animating frame-0 text or any designed on-screen line that must still be readable when the voice finishes"
style_fit: Fits "fade/grow/slide in ~0.4 s, never pop"; EX15 captions are untouched — this is for designed text, not captions.
---

## METADATA
09_UI_Motion | general | raea text-layer timing

## CREATIVE_INTENT
With the hook coded in boxes, the director "wanted them to come on in a way that I would hold the line despite the way
he was speaking in his voice-over and people could still see the text." Words enter with the voice, but nothing leaves
until the whole line is read, so a slow or fast read never strands half a sentence.

## STE_PROCEDURE
1. Before you animate, load the line's word timings.
2. Bring each word or box in on its spoken word over ~0.4 s (fade plus small slide or grow).
3. Keep every word on screen until the last spoken word plus ≥ ~0.5 s.
4. Exit the whole line together, or hand it to the next setup's object.
5. Never remove words one by one while the line is still being spoken.

## AGENT_EXECUTION
raea, 30 fps: for word `i` with spoken frame `w[i]`,
`opacity = interpolate(f, [w[i], w[i] + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })`
(12 f = 0.4 s; 24 f at 60 fps). Wrap the line in one `<Sequence from={w[0]} durationInFrames={wEnd - w[0] + 15}>`
and drive the exit with one interpolate on the group. Shot-list row: "words build on the voice, hold to line end".

### Worked example
Frame-0 text "Diskaun 50%… dari harga apa?" (EX46 style).
- BEFORE: each word fades 0.6 s after it lands; when the voice lingers on "dari harga apa", "Diskaun 50%" is gone.
- AFTER: words land on their spoken frames, all hold until "apa" + 0.5 s, then the group slides off as the tag turns.

### Check
- Is any word removed before the line's last spoken word?
- Does each entry take ≥ ~0.4 s?
- Is the full line visible together for ≥ ~0.5 s?

## NOTES
- Visual gaps: the exact entry animation ("the smoothest animation for that intro") is visual only.
