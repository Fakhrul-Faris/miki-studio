Target file: `../masters/01_Animation_Motion/cycles-fmodifier-loops.md`

Source: "Motion Feel, Easing & Camera Choreography/Mastering Blender Graph Editor.txt", 17:50–19:26 (Cycles modifier
overview, count-limited repeat), 29:04–30:39 (fish-flip repeat with a reset gap, and stacking with Stepped
Interpolation).

## New VALUES BY SOURCE column (mastering-blender-graph-editor, bounded-repeat + stepped-loop variant)
| parameter | mastering-blender-graph-editor |
|---|---|
| Cycles mode | "No Cycles" with an explicit **Count** (e.g. 3) instead of infinite Repeat/Repeat with Offset — for a shot that should flip/loop a *fixed* number of times, then stop |
| reset gap | copy the value at the end of one cycle (e.g. frame 32) and paste it onto a **later** frame (e.g. frame 40, "a little bit of a break") so the object holds before the next repeat, rather than snapping straight into the next cycle "like a lunatic" |
| stack order | **Cycles modifier first, Stepped Interpolation second** on the same channel, when a loop should also read as stop-motion — reversing the order was flagged as mattering, though the exact broken result wasn't demoed |
| per-channel setup | add the Cycles modifier to one channel, then **copy it (Copy F-Modifiers) and paste (Paste F-Modifiers) onto every other channel of the same object**, rather than re-adding it channel by channel |

## Variant
- Bounded, resettable loop: use `mode_after = 'REPEAT'` with `bpy.types.FModifierCycles` — but note Blender's own
  Count field only bounds the *displayed* repeats; achieving a hard stop with a settle/reset gap still needs the
  "hold value, paste it further out" key-frame step above, done per channel.
- In raea there's no modifier stack, so reproduce the bounded-repeat-with-gap directly in the frame function:
  ```tsx
  const cycleLen = 20, gap = 8, repeats = 3;               // ~ matches the 3-flip, 8-frame-gap source values
  const period = cycleLen + gap;
  const cycleIndex = Math.min(Math.floor(f / period), repeats - 1);
  const localF = f - cycleIndex * period;
  const t = Math.min(localF, cycleLen);                    // holds flat during the gap
  ```
- Values beyond the named parameters (exact pasted-frame numbers, 32/40) are from this specific fish-flip shot; treat
  as `~` starting points, not fixed constants.

## NOTES
- Rule conflicts: none beyond the master's existing union (loops stay small-amplitude hold-shot ornaments, never a
  transition); a *bounded* repeat count is additionally useful for Style D's "do X exactly N times" beats (e.g. "tiga
  kali" — three flips, then stop), where an infinite Repeat with Offset would be wrong.
