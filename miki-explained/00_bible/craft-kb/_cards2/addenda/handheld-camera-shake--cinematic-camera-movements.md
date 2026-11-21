# Addendum → masters/01_Animation_Motion/handheld-camera-shake.md
Source: "Motion Feel, Easing & Camera Choreography/Cinematic Camera Movements Blender Tutorial.txt" (06:15–06:58)

## New VALUES BY SOURCE row(s)
| parameter | Cinematic Camera Movements | recommended for Style D (+ why) |
|---|---|---|
| method | Noise F-modifier on each rotation channel (X, then Y, then Z) of an already animated camera | same; layered on top of the eased move |
| strength | "0.03 tends to be good" (after lowering from the default) | ⚠ far above the house ≤ ~0.002 rad; Style D default = no shake |
| scale | "increase the scale a bit" (value not given) | ~40 f base (master) |
| purpose | intensify mood or add realism | only if the user asks for a documentary feel |

## Extra steps / variants
1. Add the Noise modifier per rotation channel separately (X, Y, Z), not location.
2. Raise scale first, then lower strength until the shake is barely visible.
