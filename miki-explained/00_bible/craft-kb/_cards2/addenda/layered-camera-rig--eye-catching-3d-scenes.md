Target: `masters/05_Camera_Raea_Pipeline/layered-camera-rig.md`
Source: "Minimalist Tech & SaaS 3D Staging/How to actually make eye-catching 3D Scenes | After Effects.txt" (01:50–07:44)

## New VALUES BY SOURCE row
| parameter | this source ("eye-catching 3D Scenes", AE) |
|---|---|
| layers | two-node camera ("cam control one" null, parented camera) → duplicate the null (Ctrl+D), delete its last keyframe, parent duplicate-1 to duplicate-2, for a second overlapping move |
| move 1 | push position closer + lower Y, ~2.5 s, Easy Ease then graph-editor peak pulled left (fast-in) |
| move 2 | on the second (duplicated/parented) null: zoom back out, starting slightly earlier than move 1 ends, so the two moves overlap instead of stopping dead on one frame |
| why duplicate-and-parent | "the reason we used the null object — because now we can overlap the key frames... if I just used the camera, I wouldn't have the ability to connect the layers, and our movement would have to stop at one frame" |

## Extra step the master lacks
A quick two-null variant of the same overlap idea the master's Houdini/Blender example builds as a full follow→move→
camera stack: duplicate the move-null itself (rather than adding a new empty), delete its stray last keyframe, and
parent the duplicate to the original — gives the same "layer another move in" result with fewer new objects when
only two sequential moves (not a follow layer) are needed.

## NOTES
- Timestamps: 01:50–02:30 (two-node camera + null setup), 05:30–07:44 (duplicate-null overlap technique).
- Visual gap: the exact graph-editor handle drag amounts are shown on screen only.
