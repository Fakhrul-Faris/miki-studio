---
title: Lights with jobs — top area for base light, side spots to carve form, hidden back point lights for a silhouette in haze
bucket: 04_Shading_Lighting
source: "Cyber Japan Art Breakdown  Blender.txt"
source_time: "27:28–28:21, 31:33–34:27"
blender_version_source: 3.x
tool_target: Blender bpy | raea
tier: full
style_fit: "The backlight-through-haze silhouette suits the hero's dark room well. Partial conflict: Style D is ONE soft top light. Keep the top light as the key, add at most one grazing side spot and one backlight, and drop the rest."
---

## METADATA
04_Shading_Lighting | 3.x source (Cycles) → raea | Blender bpy (layout), raea

## CREATIVE_INTENT
Give every light one job and judge it by toggling it. One big area light from above gives general downward light, so
anything reads at all. Side spotlights graze the roof edges "not to add light so much as to emphasise the form of the
main object". Several point lights hidden behind the subject light the volume haze, so the hero stands out as a bold
backlit silhouette. The source admits this rig grew more complicated than usual: its normal advice is to simplify to one
or two lights.

## STE_PROCEDURE
1. Before you add lights, turn off every light and every emissive decoration, then bring them back one by one.
2. Add one Area light above the subject, pointing down, for general base light.
3. Add Spot lights from the side, aimed to graze the hero's edges and overhangs; judge them by how much shape they reveal, not brightness.
4. Before you add backlights, make sure a volume-scatter cube encloses the background (see the volume haze card).
5. Place bright Point lights far behind the subject, hidden from the camera, so they light the volume behind it.
6. Toggle each backlight on and off; keep the ones that make the silhouette read. Together they add up even when none is clear on its own.
7. Optionally keep one light only for a nice reflection on a nearby surface.
8. If the rig grows past 3–4 lights, try removing lights until only the jobs that matter remain.

## AGENT_EXECUTION
### Blender (layout)
```python
import bpy, math
def light(name, kind, loc, rot, energy, **kw):
    d = bpy.data.lights.new(name, kind); d.energy = energy
    for k, v in kw.items(): setattr(d, k, v)
    o = bpy.data.objects.new(name, d); o.location = loc; o.rotation_euler = rot
    bpy.context.scene.collection.objects.link(o); return o
light("top_area", 'AREA', (0, 0, 25), (0, 0, 0), 3000, size=15)                          # ~ base light, points -Z
light("side_spot", 'SPOT', (14, -4, 9), (math.radians(70), 0, math.radians(75)), 8000,
      spot_size=math.radians(25), spot_blend=0.3)                                         # ~ grazes the roof edges
for i, x in enumerate((-6, 0, 7)):                                                        # ~ hidden behind the subject
    light(f"back_{i}", 'POINT', (x, 30, 6), (0, 0, 0), 20000, shadow_soft_size=0.5)
```
All values are `~` (none are spoken).

### raea
```tsx
<VolumetricFog />
<FogVolume name="air" position={[0, 4, -6]} scale={[30, 12, 30]} density={0.03} scattering={0.5} anisotropy={0.7} />
{/* base light: soft from above. RectLight casts no shadows, so pair it with a soft shadow-casting key */}
<SpotLight transform={Transform.fromXyz(0, 8, 1).lookingAt([0, 0, 0])} intensity={2700000} outer_angle={0.6} inner_angle={0.3}
  shadow_maps_enabled soft_shadows_enabled radius={1} />
{/* side spot: grazing, to show form */}
<SpotLight transform={Transform.fromXyz(6, 2.5, 0).lookingAt([0, 1.2, 0])} intensity={900000} outer_angle={0.35} inner_angle={0.15} />
{/* backlight: behind the hero, aimed at the camera through the haze -> silhouette */}
<SpotLight volumetric transform={Transform.fromXyz(0, 3, -10).lookingAt(CAM_POS)} intensity={3600000} outer_angle={0.5} inner_angle={0.2} shadow_maps_enabled />
```
- Use a volumetric SpotLight for the backlight rather than PointLights: a shadowed point light pays six shadow maps, and
  only the first two volumetric spots get exact hero shafts (post.md). `anisotropy` near 1 makes the haze glow when the
  camera looks toward the light, which is the backlit look.
- The hero's shadow inside the haze carves the silhouette, so the backlight needs `shadow_maps_enabled`.
- A big soft top panel with no shadows: `<RectLight transform={...lookingAt(...)} intensity width height />` (lights.md).
- Toggle test in raea: render one still per light (`raea render EDIT.tsx --frame N -o F.png`) with the others' intensity at 0.

## NOTES
- Visual gaps: every light's position, power and size is on screen only. The camera sits low in a corner looking up (31:37–31:54).
- Cycles has no equivalent of the backlit "volume glow"; raea's froxel fog scatters single-bounce, so raise `scattering` or
  `<VolumetricFog ambient ambientColor />` if the halo is thin.
- Rule conflicts: Style D is one soft top light plus at most a subtle rim. Keep the backlight's colour neutral (not the
  brand accent unless the line is about it). Never animate a light sweep faster than the camera rules allow.
- STT fix: "silting" = silhouetting.

## ADDENDUM — Creative Lighting Set Ups for Portrait Photography in the Studio
Source: "Studio Lighting, Silhouettes & Color Theory/Creative Lighting Set Ups for Portrait Photography in the Studio.txt" — 01:40–02:25; 12:40–12:58.

Subtractive variant for shadow-side control: this card carves form with an additive side spot. This source instead
uses a single key light (softbox + grid, camera right) plus a polyboard flag on the opposite side (camera left) with
no added light there at all — the flag alone creates the shadow side. Variant: shadow-side control can also be a
flag/polyboard blocking ambient bounce, not only an added side spot.

Workflow discipline: max three lights, one variable at a time. "I tried to keep them all really simple. Max three
lights... having setups that you can really easily adapt to, make small changes that have big effects." Added as a
procedure note: cap a rig at ≤3 lights; iterate by changing one light's colour/position/output at a time to generate
variations from the same rig, rather than rebuilding.
