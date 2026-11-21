---
title: "AI-generated 3D base mesh from a 2D concept — block-in reference only"
bucket: 06_Art_Direction
source: "Motion Feel, Easing & Camera Choreography/Japanese Studios CG 2D Animation.txt"
source_time: "03:22–04:51"
tool_target: principle-only
tier: principle
use_when: "a hand-painted 2D concept exists and a fast 3D volume/block-in is needed before proper modelling"
style_fit: "⚠ conflict: generated 3D/images are references only, never finished footage, per house rule — adapted here as explicitly a disposable block-in stage that a real modeller (or our own blockout process) then rebuilds properly, never shipped as-is."
---

## METADATA
06_Art_Direction | Tripo AI (2D concept → 3D volumetric mesh) | principle for blockout-stage reference only

## CREATIVE_INTENT
Feeding a clean, precise, orthographic 2D hand-painted concept into a 3D-generation engine produces a fast,
accurate volumetric block-in matching the concept's silhouette — eliminating the tedious initial blocking phase.
The source is explicit that this is a rapid base mesh only (like a ZBrush dynamesh block-in), not a production-ready
asset: it still needs a technical artist to clean topology and establish proper edge flow before real use.

## STE_PROCEDURE
1. Start from a clean, precise, orthographic (not perspective) 2D concept painting — ambiguity in the source image degrades the 3D result.
2. Generate a 3D volumetric base mesh from that concept.
3. Confirm the silhouette matches the 2D concept.
4. Treat the output strictly as a disposable block-in: clean up topology and establish proper edge flow in normal modelling tools before it is used for anything beyond blocking.
5. Never present or render the raw AI-generated mesh as a finished asset.

## AGENT_EXECUTION
If a hand-drawn 2D concept exists for a prop that needs fast 3D blocking (e.g. to test a composition before full
modelling), this can speed up the blockout stage only — the resulting mesh is a reference for a modeller to rebuild
properly in Blender, not an asset that goes into any raea scene. Label it explicitly "reference only (AI block-in,
to be rebuilt)" in the build log/asset-sources note, per `ASSET-SOURCES.md` practice.
### Worked example
Topic: blocking a hero prop's rough silhouette from a hand sketch before full modelling (illustrative).
BEFORE: skip straight from a sketch to final modelling, guessing proportions from the 2D image alone.
AFTER: generate a quick 3D block-in from the orthographic sketch to confirm the silhouette and proportions read
correctly from the intended camera angle, then rebuild it as a proper asset — the generated mesh itself never ships.
### Check
- Was the AI-generated mesh used only to confirm silhouette/proportion, never rendered or shipped as-is?
- Is there a logged note that it is a disposable reference, matching our generated-reference-only house rule?
- Was the final asset rebuilt with proper topology by a real modelling pass?

## NOTES
- Rule conflict: this is a generative-AI asset-creation step; house rule treats generated images/video as references
  only, never finished footage — adapted above so the output is explicitly disposable and never enters a render.
- Visual gaps: none needed beyond the stated workflow; exact tool settings (Tripo AI specifics) are source-specific and not part of our pipeline.
