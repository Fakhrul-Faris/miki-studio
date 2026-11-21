# Addendum → cards/01_Animation_Motion/graph-editor-free-handle-easing--product-animation-masterclass.md
Source: "Motion Feel, Easing & Camera Choreography/Smooth Blender Animations Tutorial.txt" — 00:00–03:37.

## New VALUES BY SOURCE column (smooth-blender-animations: the "big three" named + the Easer plugin presets)
| parameter | smooth-blender-animations |
|---|---|
| Naming | calls the three base shapes explicitly "the big three": **ease out** (smooth ending, scale the end key's incoming handle), **ease in-out** (both ends scaled, reads as a quick whip), **ease in** (slow start, quick end) |
| Duration link | same key values moved closer together in time = same eased SHAPE but reads much quicker — duration and easing are separate controls, both change perceived smoothness |
| Camera-switch transition recipe | scale camera A's first key to almost full (slow start held), scale A's last key down to almost zero (quick exit); match B's first key to almost zero (quick entry), scale B's last key to full (settles) — produces a slow-start/quick-swap/settle feel across the cut |
| Third-party tool | **Easer** plugin (Blender extension, N-panel): select all keys (A) in Graph Editor → apply a named preset |
| Presets named | **super smooth**, **overshoot**, **spring** |

## Extra steps
- The master card already gives the free-handle mechanics and raea `Easing.bezier(...)` equivalents; this adds the
  Easer plugin as a one-click preset tool for the same shapes, and the specific camera-switch-via-easing recipe
  (scale first/last keys per-side to near-full/near-zero to fake a whip-cut purely from curve shape, no extra keys).

## Notes
- ⚠ Rule conflict: Easer's **overshoot** and **spring** presets contradict the house no-bounce/no-spring rule
  (overshoot capped at 3–5% over ≥0.4s, no bouncy springs) — do not use these two presets for Style D; only
  **super smooth** (≈ the master's S-curve / `Easing.inOut`) is usable as-is.
- The camera-switch-via-easing recipe (scale keys per side) is fine and already covered in spirit by
  `masters/01_Animation_Motion/two-keyframe-camera-move.md`; useful here as a concrete "almost full / almost zero"
  handle-scaling instruction for achieving a quick-cut feel from curve shape alone.
