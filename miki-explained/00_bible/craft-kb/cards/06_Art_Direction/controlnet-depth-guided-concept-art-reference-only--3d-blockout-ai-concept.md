---
title: "ControlNet depth-guided AI concept art from a 3D blockout — reference only"
bucket: 06_Art_Direction
source: "Procedural Mograph & 3D-to-AI Render Passes/3D Blockout to AI Concept Art - tyDiffusion and 3ds Max workflow.txt"
source_time: "06:56–12:47"
tool_target: principle-only
tier: principle
use_when: "a 3D blockout's composition is locked and a mood/style reference image is wanted before committing to full modelling and lighting"
style_fit: "⚠ conflict: generated images are references only, never finished footage, per house rule — usable strictly as a labelled mood-board/frame-brief reference to compare against, never rendered output."
---

## METADATA
06_Art_Direction | TyFlow + Stable Diffusion + ControlNet (depth) | principle for a reference-only concept pass

## CREATIVE_INTENT
Once a 3D blockout's composition is locked (camera-only detail, see the human-scale/camera-only card), a depth pass
from that blockout can guide an AI image generator (via ControlNet) to produce a concept-art image that follows the
blockout's exact composition and silhouettes, while taking its colour/lighting mood from a text prompt or a
reference image (IP-adapter style transfer). It is explicitly a fast way to explore mood/style before committing to
full modelling — never a substitute for the final build.

## STE_PROCEDURE
1. Lock the 3D blockout's composition and camera first (see human-scale/camera-only blockout card).
2. Render or capture a depth pass from that blockout.
3. Feed the depth pass into an AI generator's depth-guided mode (ControlNet depth), with a text prompt describing the target mood/style.
4. Tune the guidance weight: higher weight keeps the output closer to the blockout's exact composition; lower weight lets the AI deviate more.
5. Add negative prompts to exclude unwanted artifacts (blur, noise, low quality, watermarks).
6. Iterate the prompt in passes, refining wording based on what the previous generation got wrong.
7. Optionally feed a style-reference image (IP-adapter-style) to transfer an existing piece of art's colour/lighting mood onto the new generation.
8. Treat every output as a labelled reference/mood-board image only — never use it as finished footage or a frame in the episode.

## AGENT_EXECUTION
Use this only during the look-development/reference-gathering stage of an episode (alongside GPT-image look refs),
never in the build pipeline itself: the depth-guided generations help settle "what mood/style are we building toward"
before a modeller/raea builder starts on the real assets. Log the generation as a reference in the episode's asset
notes, explicitly marked "AI reference, not used in final."
### Worked example
Topic: deciding the mood/lighting direction for a "closed-down shoplot" backdrop before building it for real (illustrative).
BEFORE: jump straight into modelling the backdrop and lighting it, discovering late that the mood doesn't match the script's tone.
AFTER: a quick blockout + depth-guided AI concept pass (with negative prompts and a style reference) settles the
mood direction fast, labelled explicitly as reference-only; the actual backdrop is then built and lit for real from that direction.
### Check
- Is the blockout's composition locked before generating, so the depth pass is meaningful?
- Are negative prompts used to exclude obvious artifacts?
- Is every generated image explicitly logged as reference-only, never placed in the actual render/edit?

## NOTES
- Rule conflict: this is a generative-AI step; house rule treats generated images/video as references only, never
  finished footage — the procedure above is written so the output never leaves the look-development stage.
- Visual gaps: the exact ControlNet weight values and prompt wording are shown on screen per generation; none are stated as fixed numbers — tune by eye per the source's own iterative method.
