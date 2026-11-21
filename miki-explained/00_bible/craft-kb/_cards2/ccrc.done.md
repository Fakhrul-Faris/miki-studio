# ccrc done-list

## Cards (9)
- cards/02_Geometry_Nodes/index-compare-select-single-instance-and-animate--index-position-nodes.md — Index+Compare isolates one instance by number; keyframe it alone (fall/rise-into-place hero reveal)
- cards/02_Geometry_Nodes/index-modulo-alternate-instance-offset--index-position-nodes.md — Index+Modulo selects every Nth instance to offset, interlocking a hex/brick grid
- cards/02_Geometry_Nodes/position-node-directional-rotation-wave--index-position-nodes.md — Position (vs Index) node drives a rotation wave that travels along a chosen physical axis, matched to camera direction
- cards/02_Geometry_Nodes/position-node-delete-geometry-isolate-strip--index-position-nodes.md — Position+Delete Geometry pulls one coordinate strip from an existing grid for a secondary prop (rail/rod)
- cards/02_Geometry_Nodes/attribute-handoff-gn-to-shader-random-and-highlight--index-position-nodes.md — Store Named Attribute → Shader Attribute(Instancer) hands a GN value to materials: random per-instance colour, or a single hero's emission
- cards/02_Geometry_Nodes/geometry-proximity-empty-driven-displacement--proximity-animations.md — Geometry Proximity + Map Range, driven by an empty, displaces/scales/rotates a reacting field; visible prop parented to the empty reads as the cause
- cards/04_Shading_Lighting/proximity-attribute-shader-glow-mask--proximity-animations.md — same proximity distance handed to the shader via Store Named Attribute, so material glows only near the cause (independent falloff from the displacement)
- cards/02_Geometry_Nodes/gn-bevel-node-double-bevel-wireframe--blender-finally-did-it.md — new Blender 5.2 Mesh Bevel node inside Geometry Nodes; double-bevel + Delete Geometry(Outer Edge) for a wireframe-cage look
- cards/02_Geometry_Nodes/mesh-to-volume-grid-noise-scale-reveal--blender-finally-did-it.md — Mesh to Volume → Distribute Points in Volume (Grid mode) fills a solid with an even instance field; Noise→Color Ramp scales instances for an organic erosion/reveal

## Addenda (5)
- _cards2/addenda/light-blockers-flags--only-product-lighting-video.md — blocker planes used in-frame as a deliberate one-sided gradient shadow on the product (not off-screen spill control)
- _cards2/addenda/image-textured-light--only-product-lighting-video.md — Gradient Texture (procedural, not a photo) driving a light's own Strength via a Color Ramp
- _cards2/addenda/hdri-for-bright-plain-world-for-dark--why-your-lighting-looks-flat.md — desaturate the HDRI (Hue/Saturation) before it hits the World background, so reflections keep detail without fighting the scene's accent colour
- _cards2/addenda/cycles-fmodifier-loops--blender-finally-did-it.md — seamless loop via duplicated/offset noise sample + animated Mix crossfade (25 f, linear), as an alternative to the F-modifier method
- _cards2/addenda/simplicity-first-one-light-one-colour--blender-finally-did-it.md — concrete two-light worked instance: one white emissive plane key + one coloured disc accent, nothing else

## Covered by (no card/addendum needed — already thoroughly covered)
- Three-point lighting key/fill/rim roles, light-linking to isolate a light to one plane/backdrop, white emissive
  backdrop as bounce/background light → masters/04_Shading_Lighting/three-point-lighting.md, light-linking.md,
  photo-textured-light-shapers.md (Only Product Lighting video)
- One-light-first before adding fill/rim; textured-gobo rim softening; light spread/softness shifting photoreal→anime
  look → set1 one-dominant-light.md, gobo-shadow-patterns.md, light-softness-size-distance.md (Why your lighting
  looks flat)
- Three-point key/fill/rim role definitions and softening fill by increasing physical size → set1
  three-point-lighting.md, duplicate-key-support-lights.md (Why your lighting looks flat)

## Skipped
- Procedural "N-point lighting" rig (GeoLights Pro, Only Product Lighting video): paid add-on UI only, no transferable
  node recipe or values given — no card.
- Reference-curation workflow (Pinterest/Behance/ZCOOL/Eagle tagging, Why your lighting looks flat, 14:25–20:57): a
  generic creative-process habit, not a render/craft technique with values; close enough in spirit to the existing
  `always-be-collecting-swipe-file--ideas-in-motion-design.md` card that a separate card would be redundant.
- Cycles "crunch" final-render settings (300 samples, denoiser on, caustics/volume/transmission off, Blender Finally
  Did It): generic render-settings housekeeping, not a visual technique; raea renders in real-time Bevy so this has
  no equivalent step to translate.
- Sponsor/Patreon/course-upsell segments and channel outros across all five sources.

## Notes
- No pre-existing cards or addenda were found for these five sources (RESUME MODE grep on all five filenames against
  ../cards and ../_cards2/addenda returned nothing); all cards/addenda above are new, none overwritten.
