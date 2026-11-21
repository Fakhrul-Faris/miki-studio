Target: `cards/05_Camera_Raea_Pipeline/camera-parented-to-moving-platform--eevee-animation-blender5.md`

## New variant: two-empty rig (look-target empty + separate push empty) via Track To, not parenting alone
Fern's rig differs from the card's single-platform-parent approach: one empty sits at the exact framing centre
(placed using the camera's composition-guide overlay) and the camera gets a Track To constraint aimed at it — so the
frame never drifts off that point regardless of camera position. A second, separate empty is parented to the camera
itself and animated forward (push) across two more keyframes, giving a push that still tracks the same fixed point.

### New steps
1. Turn on the camera's composition-guide overlay (Center) to place the look-target empty precisely at the frame's centre.
2. Add an empty (Cube display) at that position; keep its own location/rotation unkeyed — it is a static aim point for this setup.
3. Select the camera, add a Track To constraint, target = this empty; the frame now stays centred on it however the camera moves.
4. Separately, add a second empty, parent the camera to it (Ctrl+P, Parent Object), and keyframe that empty's position for the push — the Track To constraint keeps the aim correct throughout the push automatically.
5. To intensify the ease (not just shape single handles), select the move's start/end keyframes together, set the Graph Editor pivot point to Individual Centers (not Bounding Box Center), then scale on the X axis — this exaggerates each key's own ramp independently, producing a stronger slow-in/slow-out than scaling the whole set about one shared centre.

### Why this is a new value, not a duplicate
The master's rig anchors the camera to a moving platform directly; it doesn't need a Track To aim point because the
platform's own path is the move. Fern's variant needs both: a fixed look-target implemented via constraint (not
baked into the move) and a separate push empty — useful whenever the move must always reframe back onto one point even
as the camera's own position keys are adjusted later. The individual-centers pivot detail for keyframe scaling is also
new (the master's step 8 scales keys without specifying a pivot point).

## Source timestamp
23:56–25:20, 27:23–28:52

## Notes
- No rule conflict; both variants must still land within ~130°/s and ~40 m/s and ease in-out per house rules.
