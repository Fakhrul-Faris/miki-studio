# Addendum → cards/01_Animation_Motion/camera-relative-motion-not-locked--car-animation.md
Source: "Motion Feel, Easing & Camera Choreography/Cinematic Camera Movements Blender Tutorial.txt" (01:34–02:33)

## New VALUES BY SOURCE row(s)
| parameter | Cinematic Camera Movements (truck shot) | recommended for Style D (+ why) |
|---|---|---|
| subject at constant speed | key camera point A and point B; set both keys **Linear** (Graph Editor → T → Linear), else the default Bézier makes the subject drift in frame | linear only while the move runs through the setup; ease at on-screen starts/stops (house) |
| subject moving unpredictably | parent camera to subject (select camera, Shift-select subject, Ctrl+P → Object): holds the distance | parent only for a rigid top view; otherwise add a small lag (this card's catch-up rule) |

## Extra steps / variants
1. If the subject moves at one speed, key the camera A → B and set Linear so the camera matches it.
2. If the subject's speed varies, parent the camera to it, then add the catch-up/drift offset from this card so it isn't locked.
