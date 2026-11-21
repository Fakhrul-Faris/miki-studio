# Addendum: path-evaluation-time-speed-ramps ← Speed Ramping in After Effects
Target: `cards/01_Animation_Motion/path-evaluation-time-speed-ramps--blender-camera-rig.md`
Source: "Motion Feel, Easing & Camera Choreography/Speed Ramping in After Effects.txt" (00:29–00:59, 04:10–08:08, 08:28–11:28)

## New VALUES BY SOURCE row
| parameter | Speed Ramping (AE time remap, speed graph) | recommended for Style D |
|---|---|---|
| speed scale | 1 = normal, 2/3 = faster, 0 = frozen | ramp the route parameter's rate, never through 0 mid-move (a dead stop reads as a stall) |
| curve shape | "hill" — like a snowboarder: up in speed, fire down again; both ends dragged back to exactly 1 and smoothed | normal → peak → normal, eased both sides; peak within ~40 m/s / ~130°/s |
| subject | gimbal shot, subject kept "100 % centred" at all times (stabilised so the logo never drifts) | aim locked on the hero through the ramp so only the world streams |
| timing | keys snapped to audio-waveform beat changes; full motion lands on the drop | peak of the ramp lands on the stressed word / beat |
| motion blur | applied only because the clip is sped up ("with high speed we should see motion blur") | `{fast ? <MotionBlur shutterAngle={0.5} samples={4} /> : null}` during the peak only |
| exit | next clip continues the same direction of motion | covered by `cards/01_Animation_Motion/motion-continuity-across-cuts--cinematography-next-level.md` |

## Extra steps
- A ramp only reads smooth if the base move is smooth and eased; linear or laggy curves "won't look good".
- Grade (contrast) before judging the ramp. AE-only steps dropped: Mocha track + anchor-point stabilise, pre-compose, black-frame fix by offsetting the remap key a few frames back.
