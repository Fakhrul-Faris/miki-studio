# Review checklists

## Script (gate 1) — cold-read
- [ ] Did you snort before the end?
- [ ] Would a stranger get it with no source video and no sound?
- [ ] Remove the last line/image — does the short die? (it should)
- [ ] The object that carries the joke reads instantly at phone size
- [ ] Any assumption the punchline needs is *shown* (a reaction shot), not said
- [ ] Every line is English; no line explains the joke

## Assets (gate 2)
- [ ] Characters look nothing alike, and nothing like earlier leads
- [ ] No text, labels or logos in the sheets or the plate
- [ ] Props the joke needs are in the location plate, where the script needs them

## Storyboard (gate 3)
- [ ] The story reads in the 9 panels with the sound off
- [ ] Characters stay distinct in every panel
- [ ] Props stay where the continuity says (who holds what, which side of the counter)
- [ ] The setup shot that makes the punchline work is clear

## Each segment (gate 4)
- [ ] Identity holds (hair, outfit, face) in every shot
- [ ] No speech audio, no music, no burned-in subtitles
- [ ] Mouths move only in the talking windows
- [ ] Props keep their material and position; people stay on their side
- [ ] Phone screens show the right state

## Final cut (gate 7)
- [ ] Hook reads in the first 1.5s with the sound off
- [ ] Voice lines line up with mouths within ~2 frames
- [ ] Sound bed has no stray vocals or music
- [ ] Button lands, holds, then the end card

## Common failures and fixes

| Symptom | Fix |
|---------|-----|
| Two characters blend | Add "They look nothing alike." and one distinguishing feature each in that shot; if persistent, redesign one character's silhouette in `0_assets.md` |
| A prop changes material/shape | "Never changes: <prop> is <X> — never <Y>." in the segment; repeat the exact noun ("the white latte cup") in each shot; last resort: make the prop its own asset (@Latte) |
| Someone on the wrong side of the counter | "Never changes:" line + say the side in each shot they appear |
| A moved object comes back | State its new place in every later shot |
| Seedance speaks / adds music | Remove any quoted dialogue; keep "No speech, no voices, no music."; strip in post with remove-vocals |
| Burned-in subtitles | Regenerate the shot; keep "No subtitles, captions, on-screen text" |
| Short voice line comes out flat | Take it from the dialogue-mode render; change the tag, not the words |
| A shot is broken mid-segment | Cut at its boundary; regenerate only that shot (segment prompt with other shots deleted, ≥4s, trim) |
