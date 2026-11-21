# Addendum → masters/04_Shading_Lighting/light-linking.md
Source: "Studio Lighting, Silhouettes & Color Theory/Lighting With Only HDRIs? You're Doing it Wrong!.txt" — 03:32–04:25.

## New VALUES BY SOURCE column (lighting-with-only-hdris: Octane object-tag variant)
| parameter | lighting-with-only-hdris (Octane) |
|---|---|
| Software | Cinema 4D + Octane (not Blender's native Light Linking panel the master covers) |
| Mechanism | create an Octane **Object Tag** on the receiver (e.g. the floor) telling it to **ignore lights from ID 2** |
| Light side | set the offending lights (e.g. strong lights meant only to focus attention on a product) to **ID 2** |
| Trigger case | "these strong lights are meant to focus our attention on the chip in the shot, but they're blasting the floor and it's super distracting" |
| Result | floor stops receiving those lights entirely while the product keeps the strong focus light |

## Extra steps
- Where a render engine has no Blender-style per-light receiver-collection panel, the same outcome (one light
  excluded from one object) can be reached via ID-tagging: tag the excluded object to ignore a numbered light ID, and
  assign that ID to the offending light(s).
- This is a second, software-specific route to the same "rim on the hero but not the floor" problem the master
  already solves for Blender; it confirms the raea fallback (narrow SpotLight cone / short range / floor roughness,
  already in the master) is the right substitute since raea has neither panel.

## Notes
- No raea implication beyond what the master already states (no documented per-light include list in raea); this
  only adds the Octane-specific mechanism as a second real-world precedent for the same craft problem.
