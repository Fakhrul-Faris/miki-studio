---
title: Build lights as a stack of layers — key, then fill, then supports, then bounce — each in its own collection
bucket: 04_Shading_Lighting
source: "How to Make DARK Environments in Blender.txt"
source_time: "01:47–03:03, 07:48–08:21, 14:44–14:47, 16:37–16:40"
blender_version_source: 4.x
tool_target: Blender bpy | raea
tier: full
style_fit: Gives Style D's "one soft top light" a fixed build order; every later light is judged by toggling its layer against the key.
---

## METADATA
04_Shading_Lighting | 4.x (Cycles shown) → 4.2+ / raea | Blender bpy + raea

## CREATIVE_INTENT
A dark shot is lit in layers ordered by how much ground each covers: the key does the heavy lifting, a dim area fill gets the image to ~80 % of the final, narrow supports and faked bounces are the optional last 20 %. Keeping each layer separate lets you solo any one and see exactly what it adds. The key need not be a lamp — a glowing object, screen or neon sign can be the key.

## STE_PROCEDURE
1. Create three light collections: "Key", "Supporting", "Bounce" (video's names; add "Fill" if you want it separate).
2. Before adding anything else, light the shot with the key alone and settle it (see the key-light card).
3. If the main source is an emissive object (screen, sign, glow), treat it as the key and settle it first the same way.
4. Add the area fill next; it should bring the image to roughly 80 % of the intended final.
5. Only after the fill is right, add narrow support spots, then bounce lights.
6. Solo each collection (hide the others) to check what that layer alone contributes.
7. Toggle each optional layer (bounce) on/off; drop it if the difference does not earn its place.

## AGENT_EXECUTION
Blender (check .blend):
```python
import bpy
scene = bpy.context.scene
for name in ("Key", "Fill", "Supporting", "Bounce"):
    if name not in bpy.data.collections:
        col = bpy.data.collections.new(name); scene.collection.children.link(col)
def solo(layer):
    for name in ("Key", "Fill", "Supporting", "Bounce"):
        lc = bpy.context.view_layer.layer_collection.children[name]
        lc.exclude = (name != layer)
solo("Key")   # then "Fill", ... ; set all exclude=False for the full stack
```
raea: no collections — keep each layer a named group in the TSX and gate it with a constant so a still can be rendered per layer:
```tsx
const LAYERS = { key: true, fill: true, support: false, bounce: false }; // flip, re-render a still
{LAYERS.key && <SpotLight name="key" transform={Transform.fromXyz(0, 3, 0.6).lookingAt([0, 0, 0])} intensity={2_700_000} outer_angle={0.45} inner_angle={0.22} shadow_maps_enabled soft_shadows_enabled radius={0.6} />}
{LAYERS.fill && <RectLight name="fill" transform={Transform.fromXyz(0, 2.2, 3).lookingAt([0, 0, 0])} intensity={60_000} width={2} height={2} />}
```
An emissive key: `emissive={LinearRgba.from(Srgba.hex(c)).mul(6)}` plus a `PointLight` at the object (emissive surfaces don't light neighbours in raea).
Render one still per layer combination: `raea render EDIT.tsx --frame N -o key_only.png`.

## NOTES
- Deprecated: none.
- Visual gaps: the outliner collection layout is shown, not narrated beyond the three names.
- Rule conflicts: none. Layer toggles are a look-dev tool only; in the film, lights never pop on — fade intensity over ~0.4 s if a layer must change on a word.
