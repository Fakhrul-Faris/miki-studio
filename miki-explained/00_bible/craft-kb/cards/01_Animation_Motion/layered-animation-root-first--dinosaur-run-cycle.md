---
title: Layered animation — root first, then one control at a time outward
bucket: 01_Animation_Motion
source: "Animation Masterclass- How to Create a Dinosaur Run Cycle in Maya.txt"
source_time: "3:36–4:07, 7:31–8:00, 18:33–20:31, 32:47–33:14, 42:25–42:53, 54:25–54:57, 1:36:25"
blender_version_source: n/a (Maya)
tool_target: principle-only
tier: principle
style_fit: Matches our shot-first gates (camera map → animatic → preview): block the camera flight and hero move first, then add secondary motion pass by pass.
---

## METADATA
01_Animation_Motion | n/a (Maya source; Blender 4.2+ / raea translation) | principle-only

## CREATIVE_INTENT
Principle: build motion in layers — the root's main move first (timing, weight), then the parts that ride on it (chest, then feet, hips, head/neck, tail, arms, fingers, toes), each added on top and judged in play. Early passes look wrong; trust the process and let the motion you see dictate pose changes rather than locking poses up front.
Ideas for us: in a shot, key the camera flight and the hero object's state change first and play them; only then add the secondary layers (a lid lagging the box, a label settling, light sweep, dust), each as its own pass. Re-pose the hero after seeing the move, not before.

## STE_PROCEDURE
1. Before animating, set a rough start pose only; do not polish it.
2. Animate the root's primary channel alone (vertical weight) and play it until the timing feels right.
3. Add the root's rotation as the second layer and play again.
4. Add the next control in the hierarchy (chest) using the root's curves as a base (see the copy-and-flip card).
5. Lock down the contact parts next (feet) — anything that should be fixed in space makes all other motion readable.
6. Add followers (head/neck, tail, arms, fingers, toes) only after the main body moves, deriving them from what the body does.
7. After each layer, play the loop and revise earlier poses if the motion asks for it.
8. Polish last: penetrations, small pops, extra in-between keys.
9. Choose the intent before posing (source: an aggressive "combat" run is hunched and engaged; an ambient run is relaxed) — the intent sets every layer.

## AGENT_EXECUTION
### Source tool (Maya)
- Auto Key on; 30 fps; all controls in a quick-select set "all" (AnimBot) so every layer starts with a key on every control.
- Order used: COG translate Y → COG rotate X → chest rotate X / translate Y → chest rotate Y/Z → right foot → left foot (copied) → hips rotate X/Y/Z → head follow off → head translate Y / rotate X → neck chain → hips/chest translate X → tail (FK) → arms → fingers → foot X lock / foot twist / knee / toes → hip fix → forward translation.
- Graph Editor docked under the viewport to watch curves while scrubbing.

### Blender / raea translation
- Blender: one Action per object; key the camera rig and the hero first; add secondary objects in later passes; NLA tracks if a layer must be muted for comparison (`track.mute = True`).
- raea: write the composition as stacked functions of the frame — `const base = cameraFlight(f)` first, render the check frames (`raea render EDIT.tsx --frame N -o F.png`), then add `secondary(f)` offsets on child `<Entity transform>`s. Each layer is one function added to the transform, so a layer can be removed by deleting one term.

## NOTES
- Transfers: order of passes, judging in play, revising poses after motion. Dropped: the character-specific control order (locomotion; figures hold poses in our films).
- Visual gaps: none essential.
- Rule conflicts: none; it is the same idea as our board → animatic → preview gates.

## ADDENDUM — Hierarchy of motion (lead then secondary), from Perfect Shape Morphs After Effects
Source: "Motion Feel, Easing & Camera Choreography/Perfect Shape Morphs After Effects Transcript.txt" (19:29–20:48,
23:08–23:18, 32:50–36:06); also documented as its own set-2 card,
`cards/01_Animation_Motion/hierarchy-of-motion-lead-then-secondary--perfect-shape-morphs-after-effects.md`.
- Same root-first discipline, applied to a multi-part object/icon state change: put the single lead move (e.g. a
  rotation) on one driver/parent transform; animate and judge it alone until it reads right before anything else.
- Find the driver's fastest moment (steepest point on its speed graph) — this is where secondary pieces (recolour,
  a new shape fading in, a part disappearing) can be triggered without the eye catching the "pop," because fast
  motion is where the eye has the least time to scrutinise detail.
- Add a final, smaller secondary motion (e.g. a Y-position dip) strictly after the lead motion and state-change
  pieces already read correctly — it should reinforce the read, never compete with it.
- If a secondary piece creates an unwanted artifact, retime that one layer rather than re-timing the whole driver.
- raea: every child transform reads from the same driver value; gate secondary state changes by the driver's speed
  window, not by an independently authored timeline — see the sibling card's worked example (a receipt fold → loyalty
  card icon) for the full snippet.
