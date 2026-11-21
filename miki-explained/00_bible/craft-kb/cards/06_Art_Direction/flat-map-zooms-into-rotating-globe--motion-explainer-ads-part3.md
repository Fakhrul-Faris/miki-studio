---
title: A flat map masks-and-zooms into a rotating 3D globe as the scene transition
bucket: 06_Art_Direction
source: "Minimalist Tech & SaaS 3D Staging/Motion Explainer Ads Part 3.md"
source_time: "22:47–29:06 (CC Sphere build + key framed rotation/radius), 34:04–35:11 (zoom-in through the sphere then crossfade back to the flat illustrator map)"
tool_target: raea
tier: principle
use_when: "visualising reach, spread, or scale across places (branches, delivery zones, a network) — the literal object for 'everywhere' is a globe, not a generic world icon"
style_fit: "⚠ source builds the globe with the After Effects CC Sphere plugin (not available in raea) → adapted: build the globe as a real small 3D object (a point-cloud or textured sphere) in raea-bevy, same beat structure (flat map → zoom → sphere → zoom back to flat)."
---

## METADATA
06_Art_Direction | After Effects (CC Sphere wrapping a traced flat map, keyed radius/offset/rotation) → raea 3D globe mesh with the same zoom-through beat | raea

## CREATIVE_INTENT
A flat vector world map is wrapped onto a sphere (radius, rotation and internal-shadow keyed for a slow spin), zoomed
into closely enough that the screen reads as the 3D globe, then the comp crossfades back to the original flat map layer
(opacity keys crossed 100→0 / 0→100) so the "transition" is really a seamless swap disguised by the zoom — the viewer
never sees the cut, only a flat map becoming a globe becoming a flat map again.

## STE_PROCEDURE
1. Start on the flat 2D map/illustration (the literal, readable version of the idea).
2. Zoom the camera into it while simultaneously spinning up a 3D globe version underneath, radius/rotation keyed.
3. At the moment of closest zoom, crossfade flat layer → globe layer (or the reverse) — hidden by the zoom's motion blur.
4. Continue the globe's spin as the real content of the scene (flight lines, flags, etc. — see the dashed-flight-lines card).
5. To return, reverse the same zoom+crossfade to land back on a flat, readable framing.

## AGENT_EXECUTION
Shot-list row: `| 13 | "Meikigo sampai seluruh Malaysia" | flat map → globe zoom | map zooms into a spinning globe on 'seluruh', crossfades | this card`.
raea: a flat 2D map layer and a 3D `<Mesh3d>` globe (UV-mapped with the same map texture, or a point-cloud of dots if a
flatter look is wanted) cross-dissolved at peak camera zoom:
```tsx
const t = k(f, word("seluruh"), 24, inOut);
<Camera3d position={lerpVec3(farCam, closeCam, t)} />
<FlatMapLayer opacity={lerp(1, 0, t)} />
<Mesh3d /* globe */ material={<StandardMaterial map={mapTexture} />} opacity={lerp(0, 1, t)}
  transform={Transform.fromXyz(0,0,0).rotatedY(f * 0.01)} />
```

### Worked example
Topic: a delivery service that now reaches every state in Malaysia (illustrative generic claim, not a real company's coverage data).
- BEFORE: a static "Malaysia map, all states highlighted" graphic appears.
- AFTER: the flat map zooms in and becomes a slowly spinning globe centred on Malaysia exactly on "seluruh", then zooms
  back out to a flat, readable map with the highlighted states.

### Check
- Is the globe literal for the idea (reach/spread/everywhere), not decoration?
- Does the crossfade happen at peak zoom, so the swap is invisible?
- Does the scene return to a flat, readable framing rather than ending mid-spin?

## NOTES
- raea check (2026-11-21): `<FlatMapLayer>` in the code above is a stand-in for a component the episode builds (from raea primitives such as `Cuboid`, `ImagePlane`, `Text3D`), not a raea built-in. Define it before use.
- Visual gaps: exact CC Sphere radius/light/shading parameter values are shown on screen only, not describable from
  speech alone — the final composited look needs the video re-checked if an exact match is wanted.
- AE dropped: CC Sphere + CC Ball Action (paid/plugin-adjacent native effects) — translated to a real UV-mapped or
  point-cloud 3D globe mesh built in Blender/raea-bevy, consistent with the use-library-3d-models and no-generated-video rules.
