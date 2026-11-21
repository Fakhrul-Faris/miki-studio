Target: `masters/05_Camera_Raea_Pipeline/dof-focus-fstop.md`

## New VALUES BY SOURCE row
| parameter | fern-3d-edits (RED style) |
|---|---|
| focus target | a dedicated empty (sphere) placed by eye near the hero, used as Focus Object instead of the hero mesh itself |
| hero f-stop | 1.4 (very shallow — "this is going to control the depth of field of the camera... let's lower this to 1.4") |

## New step (not in the master's STE_PROCEDURE)
- When the hero object's own origin/pivot is inconvenient to use as a focus target (off-centre, animated, or part of a
  larger linked mesh), add a plain empty positioned exactly where focus should land, and set it as Focus Object instead
  of the object itself. The empty can then be keyframed independently of the hero's own animation.

## Source timestamp
17:06–17:41

## Notes
- No rule conflict; this is a practical variant of "Focus Object = hero" for cases where a separate focus-target empty is cleaner than targeting the mesh directly.
