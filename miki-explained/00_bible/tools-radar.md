# Tools radar (2026-11-07)

What we tried or read on 2026-11-07, what it is good for in a Miki Explained shot, and whether it runs on this Mac.

## In use or ready

| Tool | Status | Use it for |
|---|---|---|
| **Google Scanned Objects** (1,033 real products, CC BY 4.0) | `lib3d.scanned(name)` / `scanned_find(category, text)`; metadata in `02_kit/models/gso_metadata.jsonl` | shelves, counters, products in a shop; clay over the scan hides the packaging logos. Credit "Google Research" |
| **sand3d** 1.6.3 | in `02_kit/pylib` (no deps, uses Blender's own bpy); `import lib3d` then `import sand3d as s3d; s3d.units("m")`; API: `02_kit/pylib/sand3d_api.md` | bespoke props written as short programs with named parts and joints: tags, meters, signs, doors that open, drawers that slide. Test: `_tests` price tag, 9 lines |
| **raea** 0.1.0-canary.2 | `~/.local/bin/raea`; skills `raea`, `raea-bevy` | ~25 ms a 1080x1920 frame vs EEVEE ~1.5 s (EX23 shot 1, `_tests/EX00V13_raea`). Close to the clay look with a soft spot key, AO, Bloom and a dim HDRI; flatter than EEVEE. `raea check` = free export QA (clipped text, safe areas, freezes, loudness). Canary: changes daily |
| **HyperFrames** skills (9, project) | telemetry off; `style-sampling` and `reverse-any-video` need Pro | `npx hyperframes measure cuts <video>`: every cut of a reference with its frame (free) |
| **UniMate** (text → motion for any rig) | `~/Private/tools/UniMate` (.venv, MPS patch in `unimate/models/flow/integrators.py`, `.shim/blender`) | 2 s motions from a prompt ("An object turns around and looks up."). MPFB rig must be slimmed to <= 71 joints (`slim_rig.py` approach: drop face/toe/outer-finger bones, weights to the kept parent). Slow on MPS (~13 min a take). Export with `export_apply=True` so the MPFB masks hide the helper skirt/hair geometry (without it the figure looks like a robed, hooded monk). Test: `_tests/EX00V14_unimate` |

## Learned from the "free Houdini" / "motion studio" lists

Already inside Blender 5.2 (nothing to install):

- **Rigid bodies (Bullet)**: drop and pile things for real, then *Bake to Keyframes* so renders are deterministic. EX23 shot 16 (rent bills piling on the doormat), coins pouring onto a counter, boxes stacking. Objects still fade in/out (no harsh cuts).
- **Mantaflow** (fluid modifier): liquid and smoke. Slow to bake; for one hero pour only (coffee in an F&B episode). raea's `<Goo>` (sph/mpm, baked) is a faster alternative.
- **OpenVDB volumes**: fog rolling over the clay floor, a mist that "fills" an empty store. EEVEE draws them.
- **Geometry Nodes simulation zones + 5.2 physics** (cloth, colliders, forces): the built-in route Sverchok used to cover (see the `scenario-blender-geometry-nodes` skill). A procedural city or a crowd of identical clay shoppers.
- **Cycles**: a hero still or thumbnail at higher quality than EEVEE, same scene.

Free to add:

- **Cell Fracture** (Blender extension, not installed): Voronoi-shatter a model, then rigid bodies drop the shards. A store or a piggy bank breaking; a price sign cracking. Install from extensions.blender.org when an episode needs it.
- **Pedalboard** (Spotify, Python): reverb, compression, limiter in `sfxsynth` mixes.
- **Flubber** (shape morphing): a 2D icon morph for a card; check EffectCraft's own morph first.

Not for this Mac or this look: Newton / Warp (CPU only on macOS; GPU sims need NVIDIA), Effekseer, Pixelorama, Bark (ElevenLabs is better), OBS, Shotcut.

## Trial approved 2026-11-11: text-to-cad (earthtojake/text-to-cad, MIT, 26k stars)

The agent writes a part as a Python script (build123d on OpenCASCADE), runs it, exports **GLB** (also STEP/STL) → raea
loads it. For precise hard-surface props no library has: espresso machine, printer and ink cartridge, POS terminal,
kiosk, vending machine, shutter mechanism. Not for organic shapes, people or textures; its own Blender render skill is
not used (raea renders). Cautions: the official installer (`curl … | sh`) adds itself to **every** agent app and
installs its own Blender 5.2 bpy; usage stats are **on by default** (turn off). Status: see below.

**Installed 2026-11-11, project-only:** `tools/cad/.venv` holds `cad[build123d,trimesh]==0.11.8` (the library only; its
telemetry hook stays `None` without the `cad-server`, which is not installed; no agent apps touched). First prop:
`tools/cad/props/espresso.py` → `tools/cad/out/espresso.glb` + `grinder.glb` (4 s build, 39 + 8 named parts, true size).
Comparison with EX35's primitive set: `04_episodes/_tests/cad-trial/compare.png`. Gotcha: OCCT's glTF writer already
converts Z up → Y up (model in build123d with the front at −Y; it lands at +Z); don't rotate again.
Second set (EX32's hero props, reusable): `tools/cad/props/printer_ink.py` → `printer.glb` (tray out, page), 
`printer_door_open.glb` (ink bay cut open, carriage, black + colour cartridges, door hinged down), `cartridge.glb` (label
recess for the ml/price, nozzle plate, contacts). No brand marks modelled: logos go on as textures from official files.
Look still: `04_episodes/_tests/cad-trial/printer.png`. Lessons: an open door needs a real cavity cut behind it, or the
parts inside are buried in the solid; hinge a flap at its edge with an aligned box, never float it.

**CADCraft (ArtCraft, checked 2026-11-11, not installed):** a 2D drafting app (DXF/DWG, dimensions, layers, headless CLI;
exports PDF/SVG/PNG, no 3D solids or GLB listed). Not a prop modeller; possible later for 2D plans or sign outlines as DXF
that build123d extrudes.
