# Addendum → cards/09_UI_Motion/word-based-ramp-text-reveal--smooth-saas-creatorly.md
Source: "Motion Feel, Easing & Camera Choreography/Cleanest Match-Cut Transition for SaaS.txt" (01:32–02:52)

## New VALUES BY SOURCE row(s)
| parameter | Cleanest Match-Cut (Resolve Fusion) | recommended for Style D (+ why) |
|---|---|---|
| per-word property | Offset Y (start lower), opacity 0 → 1 | y offset + opacity; blur optional |
| duration per word | 15 frames (frame 0 → 15) | ~0.5 s per word @30 fps (≥ 0.4 s house fade) |
| stagger | Follower "Delay" = 1 frame per word | 1–3 f per word; 1 f reads as a near-unison ripple |
| easing | Spline: ease → **Out Cubic** on all keys | `Easing.out(Easing.cubic)` |
| unit | Follower transform set to **words**, not characters | words |
| styling | character-level styling: gradient on word 1 only, word 2 solid | ⚠ house: one accent colour, flat — accent on the one key word, no gradient |

## Extra steps / variants
1. Key the per-word offset at frame 0 and frame 15; move the first key's Y down; ease Out Cubic.
2. Key opacity 0 at frame 0 and 1 at frame 15 on the same layer.
3. Set the per-word delay to 1 frame.
4. Begin the next swap (zoom-through or slide) a few frames before this reveal ends, so motion never stops (see cards/09_UI_Motion/sharp-peak-curve-zoom-through-text-swap--saas-match-cut-resolve.md).
