---
title: Location-scout the built 3D world at object level before choosing setups
bucket: 06_Art_Direction
source: "Explainer Visual Metaphors & Art Direction Critiques/2D:3D STORYBOARDING MASTERCLASS - Creating Animatics in BLENDER.txt"
source_time: "04:59–05:20, 10:10–10:53, 12:14–12:42"
tool_target: frame-brief
tier: principle
use_when: "once the grey-box world exists, before locking each frame brief's camera"
style_fit: Fits Style D macro: scouting at the object's scale finds the unusual angles (under the rim, along the edge) the camera bar asks for. Rehearsal-of-actors part adapted to animated objects (no people).
---

## METADATA
06_Art_Direction | Blender walk/fly mode → raea check render or Blender viewport | frame brief, check .blend

## CREATIVE_INTENT
Treat the virtual environment "exactly the same way as a location scout would treat a live action shoot". Drop to
ground level (walk mode) and ask: "What does this space feel like? What are the opportunities it can provide?" Then loop
the blocked action and walk around it "like a director on set with the actors" — "I need you over there a bit more, or I
need to come in a little slower there".

## STE_PROCEDURE
1. Before writing a frame brief's camera, put a viewport camera at the hero object's scale (eye at ~object height).
2. Walk around the hero for a full circle; note 3 angles that surprise you.
3. Loop the setup's state change (open, slice, multiply) and watch it from each noted angle.
4. Pick the angle where the state change reads clearest; write why in "Decision".
5. Adjust object placement or timing from what you saw, then lock the camera.

## AGENT_EXECUTION
Frame brief: "Ref" cites the scout screenshot; "Decision" names the chosen angle among the three noted; "Moves" lists
any placement/timing change found while looping. Use Blender's Walk/Fly navigation on the check .blend (build stage) or
a looping raea preview with a slow orbit camera; save the 3 scout stills as `scout_<shot>_a/b/c.png`.

### Worked example
Frame brief BEFORE: `Idea: show the coin piling. Decision: front view, mid shot.`
AFTER (kedai runcit savings how-to): `Ref: scout_04_b. Idea: daily RM5 savings piling into RM150 by month end (5 × 30).
Decision: angle b, lens at coin height looking up the stack against the dark room — the stack grows past the top of
frame on "seratus lima puluh". Moves: stack moved 4 cm left so the jar rim frames it; growth slowed to 0.4 s per coin.`

### Check
- Were at least 3 object-level angles scouted before locking?
- Does "Decision" say why the chosen angle reads the state change best?
- Was the state change watched looping from the chosen angle?

## NOTES
- Visual gaps: scouting footage is shown only on screen.
- Covered elsewhere: recording a camera live in fly/walk mode (`cards/05_Camera_Raea_Pipeline/fly-mode-autokey-camera-capture-smooth--eevee-animation-blender5.md`); Track-To aim constraint (`cards/05_Camera_Raea_Pipeline/two-empty-aim-and-focus-rig--blender-camera-rig.md`); Full-Copy scene for alternate layouts (`cards/05_Camera_Raea_Pipeline/duplicate-cameras-audition-angles--nice-camera-angles.md`).
