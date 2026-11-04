# EX20 postmortem — The Janitor Who Owned Everything

Final: `export/EX20.mp4`, 58.6 s, 1,758 frames at 30 fps, −18.9 LUFS. Pushed to Telegram 2026-11-05 (msg 349).
Built five times before it landed. This note records why, so the next episode gets there in one or two.

## The five builds

| Build | Look | Outcome | Why it failed or passed |
|---|---|---|---|
| v1 `episode_v1_primitive.py` | v4 primitives, grey-box animatic | rejected | rectangle car, cube companies, an empty gas station: primitives read as placeholders |
| v2 `episode_v2a.py`, `episode_v2b_real.py` | real library models, MPFB Ronald, Poly Haven + HDRI | rejected after 2 rounds of fixes | realism exposed every physics flaw (reversing car, floating mop, superhuman walk, floating branches, stack physics); the user changed direction instead |
| v3 `episode_v3_clay_first.py` | the approved clay look (EX00V11) on the v2 world | style approved, world rejected | a new look painted onto an old layout; the shots were never designed for it |
| v4 `episode_v4_blocking.py` → `episode.py` | clay, a world rebuilt from a new shot list | approved through 3 gates, then 6 bug spots fixed with hard cuts | designed shot-first; the remaining bugs were camera clips and swoops I hadn't checked for |

## What went wrong

1. **Building before the shots were agreed.** v1–v3 all built a world first and placed cameras in it afterwards. Every
   round of notes was a composition problem in disguise (subjects too small, the frame full of dead space, the camera
   fighting the layout). The v4 gates fixed this: reference study → shot list on paper → grey-box board → world.
2. **A wide layout in a tall frame.** The first v4 blocking spread the town east–west; map shots couldn't hold home, gas
   station and store at a readable size. Re-laid north–south, the 9:16 frame filled at once.
3. **Wasted renders.** 144 identical frames from a look test, and animatic MP4s the user had to wait for. Now stills only
   for look tests, and a check .blend for motion.
4. **Library models with surprise proportions.** The rails model, scaled by length, came out 25 m wide and swallowed the
   bank vault (a black frame on the board). The gas station shipped with its own grass plate. Every model now gets a
   dimension probe before use; flat ground plates are dropped automatically.
5. **Camera clips and swoops I didn't catch.** The user found "errors and bugs" in the check file without naming them.
   A per-frame scan then found the camera inside a street lamp, the house walls and the bank slabs, and three swoops of
   70–100 m in about a second. That scan should have run before hand-off, not after.
6. **Motion blur smeared every hard cut.** The shutter sampled between the frame before a cut and the cut itself. Fixed
   with the shutter opening on the frame and stepped (constant) keys on the frame before each cut.
7. **Interpolation between distant keys.** Ronald slid from the car to the tree inside the pin close-up because his two
   placements were 0.4 s apart with nothing holding him. A character's last pose must hold until the cut.
8. **Overwrote an untracked file.** `cp episode.py episode_v2b_real.py` replaced an existing untracked file without a
   look. Its content matched the committed round-2 file, so likely nothing was lost, but it can't be proven.
9. **Voice tightening chopped pauses.** The 0.45 s pause rule cut natural breaths; `vo_tighten.py --long/--keep/--gap`
   now keeps them for long-edu.

## What worked

- **The gate method** (study → shot list → blocking board → world → check .blend). Each gate was approved first time
  once it existed.
- **Matching the reference by measurement**: clay and light tones read off `Main Edit.mp4` frames, not by eye.
- **Design rules from the reference**: one hero per shot, dollhouse cutaways, the tall frame used vertically, grey map
  mode, accent only on the person, his route and his pieces.
- **Hard cuts on spoken words** where a continuous move broke; six in 58 s, each hiding a jump the camera couldn't make.
- **Hand-written caption phrases**: the mechanical split produced "HE DROVE A / USED TOYOTA".
- **The full render ran unattended**: 1.9 s/frame, 56 min, no failures.

## Actions

| # | Action | Where |
|---|---|---|
| 1 | Run a camera-clip scan (camera inside any visible mesh, every 2nd frame) before every check .blend hand-off | a `camscan.py` in `tools/blender/` (scratch version used here) |
| 2 | Probe a library model's dimensions before placing it; drop flat ground plates | `lib3d` / the episode's `model()` wrapper (done here) |
| 3 | Hard-cut helper: shutter on frame + stepped keys before each cut | `camkit` (done here inline in `episode.py`) |
| 4 | Gate method as the standard for any new world | the episode skill and `00_bible/visual-system.md` |
| 5 | Lay the world out along the frame's long axis (north–south for 9:16 maps) | `visual-system.md` |
| 6 | Look before overwriting any file, tracked or not | standing rule |
