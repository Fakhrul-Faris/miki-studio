---
title: Keyframed emission colour as a state change (inner light + tinted glass)
bucket: 04_Shading_Lighting
source: "How to Make Perfect Product Animations in Blender.txt"
source_time: "14:28–16:06"
blender_version_source: 4.x (~4.4)
tool_target: Blender bpy
tier: full
style_fit: strong — an object changing state on the word; conflict: the source's 2-frame black blink is a pop, house fades ~0.4 s
---

## METADATA
04_Shading_Lighting | Blender 4.4 (source), 4.2+/5.x code | Blender bpy + raea

## CREATIVE_INTENT
A small emissive part inside a translucent body changes colour (blue → green → red) to signal a mode or state. Tinting the surrounding glass the same colour on the same frames makes the glow read saturated. For explainers: the object "answers" the line by changing colour (ok → warning → loss).

## STE_PROCEDURE
1. Select the inner emitter mesh (a small disc inside the glass).
2. In its material, set Emission Strength to 10 and Emission Color to blue.
3. Select the glass body; set its Base Color to the same blue.
4. Insert a key on Emission Color at frame 0 and again at frame 25.
5. At frame 27, set Emission Color to black (off); insert a key.
6. At frame 29, set Emission Color to green; insert a key.
7. On the same frames, key the glass Base Color: blue to 25, white at 27, green at 29.
8. Duplicate the key pair later in the timeline to switch again (source: to red at the end).

## AGENT_EXECUTION
```python
import bpy
emi = bpy.data.objects["InnerDisc"].active_material.node_tree.nodes["Principled BSDF"]
gls = bpy.data.objects["Body"].active_material.node_tree.nodes["Principled BSDF"]
emi.inputs["Emission Strength"].default_value = 10.0
def key(bsdf, sock, rgba, f):
    bsdf.inputs[sock].default_value = rgba
    bsdf.inputs[sock].keyframe_insert("default_value", frame=f)
BLUE, GREEN, BLACK, WHITE, RED = (0.05,0.25,1,1), (0.05,1,0.2,1), (0,0,0,1), (1,1,1,1), (1,0.05,0.05,1)
for f, e, g in [(0, BLUE, BLUE), (25, BLUE, BLUE), (27, BLACK, WHITE), (29, GREEN, GREEN)]:
    key(emi, "Emission Color", e, f); key(gls, "Base Color", g, f)
# later switch to red: same pattern at ~(50, 52, 54) — frames not given
```
raea (house version: a ~0.4 s cross-fade on the word instead of a 2-frame blink):
```tsx
// hue change: mix the two colours yourself per frame (track's emissive keys must share one colour)
const k = interpolate(f, [25, 37], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const A = [0.12, 0.36, 1], B = [0.12, 1, 0.36];             // sRGB 0..1 of #1f5cff / #1fff5c
const hex = A.map((a, i) => Math.round(255 * (a + (B[i] - a) * k)).toString(16).padStart(2, "0")).join("");
<Mesh3d name="inner-disc">
  <Cylinder radius={0.05} half_height={0.005} />
  <StandardMaterial base_color="#111111" emissive={LinearRgba.from(Srgba.hex("#" + hex)).mul(4)} />
</Mesh3d>
<Mesh3d name="glass-body">{/* shape */}
  <StandardMaterial base_color={Srgba.hex("#1f5cff").with_alpha(0.35)} alpha_mode="Blend" perceptual_roughness={0.05}
    animate={{ base_color: track({ 25: "#1f5cff", 37: "#1fff5c" }, "in-out-cubic") }} />
</Mesh3d>
<Bloom intensity={1} threshold={0.9} />
```
`base_color` tracks blend hex keys in Oklab, so the glass can use `track` directly. Emissive surfaces don't light neighbours — add a small `PointLight` at the disc if the glow should spill.

## NOTES
- Deprecated: Principled v1 socket "Emission" → "Emission Color" (4.0+).
- Visual gaps: red-switch frames are not given.
- Rule conflicts: frames 25→27→29 make a hard blink (pop). House rule: colour states change on the word with a ~0.4 s eased fade (12 frames at 30 fps); use one accent colour per line — a three-colour cycle is only valid when each colour carries a meaning.
