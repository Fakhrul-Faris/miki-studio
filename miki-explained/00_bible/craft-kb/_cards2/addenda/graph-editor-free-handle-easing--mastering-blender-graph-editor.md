Target file: `../cards/01_Animation_Motion/graph-editor-free-handle-easing--product-animation-masterclass.md`

Source: "Motion Feel, Easing & Camera Choreography/Mastering Blender Graph Editor.txt", 12:19–15:27 (fish-flip
anticipation + overshoot), 25:55–28:51 (motion-path-checked refinement pass).

## New values/steps the master card lacks

1. **Anticipation and overshoot as extra hand-placed keyframes, not just handle shaping on two keys.** The master
   card's bezier-handle examples all shape the curve *between* a start and end key. This source adds a different,
   complementary method: insert a *third* keyframe before the main move (dropping the pan down a little = anticipation,
   ~frame 15 after a start at frame 12) and a *fourth* keyframe after it (an exaggerated overshoot value past the
   rest pose, ~frame 25, before settling back to the rest value) — i.e., anticipation and overshoot are built from
   real intermediate poses with their own values, then the handles of all four keys are shaped smooth with no sharp
   pivots. Add as an alternate/complementary method: "hand-key an anticipation pose and an overshoot pose, then shape
   handles across all of them," for shots where a single two-key bezier S-curve isn't expressive enough (e.g. a flip,
   a slap-down, a lid snap).
2. **Diagnose a curve by how much value change happens between adjacent frames, not just by eye on the full curve.**
   "You can see there's not much difference in the value from frame 19 to frame 20 to frame 18" — the fix was to
   rotate the handle down and pull it out so the curve spends less time flat near the peak. Add as an explicit
   check: scrub frame-by-frame near a suspected "dead" stretch and compare values directly, not just the curve's
   silhouette.
3. **Iterate the whole curve against a Motion Path pass (see motion-path-visualize-debug-arc), not blind.** Once pose-keyed, the source recalculates the object's Motion Path and re-adjusts individual key values/timing (e.g. moving an "almost there" moment from frame 24 to between 22–26) by comparing the plotted 3D arc to what it should look like — a second refinement pass on top of the initial handle-shaping pass.

## NOTES
- No change to the card's CREATIVE_INTENT, Check section, or worked example — these are additive steps for
  multi-keyframe pose-to-pose motion (anticipation/overshoot as real poses) rather than the two-key bezier-only case
  the master card worked through.
- Rule conflicts: none beyond what the master card already flags (keep peak speed within the house camera-move caps;
  for *camera* moves keep an eased start even when an object's anticipation pose would otherwise start at full value).
