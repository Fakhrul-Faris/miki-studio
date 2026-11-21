---
title: Floating dust / debris volume emitter with turbulence (ambient secondary motion)
bucket: 01_Animation_Motion
source: "How to Easily Animate Still Renders in Blender.txt"
source_time: "06:11–13:13"
blender_version_source: 3.x/4.x (no version markers)
tool_target: Blender bpy
tier: full
style_fit: good — a few slow, tiny particles in the top light give a still macro set life without moving the hero; keep sparse and never let them compete with the one accent
---

## METADATA
01_Animation_Motion | Blender 3.x/4.x (source), 4.2+/5.x code | Blender bpy (legacy particles) + raea

## CREATIVE_INTENT
When only the camera moves, the rest of the set reads "100% still … fake and plasticky". A thin layer of small things drifting slowly (dust, snow, tiny rocks, emissive specks) gives the flight through the set texture and parallax. Particles barely need to move; small size plus random turbulence is what makes it read.

## STE_PROCEDURE
1. Add a Cube over the part of the set the camera will see; this is the spawn domain.
2. Set the domain's Viewport Display > Display As to Bounds.
3. Add a Particle System of type Emitter to the domain.
4. Set Emission > Source > Emit From to Volume.
5. Set Field Weights > Gravity to 0.
6. Set Velocity > Normal to 0, so particles spawn still.
7. Set Lifetime to 400 frames (longer than the shot).
8. Before you render, set Frame Start to a negative value (−1 or earlier), so particles are fully spawned on frame 1 (no half-visible "ghosting" on the first frame).
9. Add a Force Field > Turbulence object near the domain.
10. Set the Turbulence field's Flow to 1 for smoother drift (0 also works).
11. Enable Rotation, enable Dynamic, and raise the rotation Randomize / Phase Randomize values.
12. Set Render > Render As to Object (or Collection for random picks) and choose a small mesh.
13. Raise Scale Randomness.

## AGENT_EXECUTION
```python
import bpy
sc = bpy.context.scene
bpy.ops.mesh.primitive_cube_add(size=2, location=(0, 2, 1))            # ~ cover the camera's view
dom = bpy.context.object; dom.name = "dust_domain"; dom.display_type = 'BOUNDS'
dom.modifiers.new("dust", 'PARTICLE_SYSTEM')
ps = dom.particle_systems[-1].settings
ps.type = 'EMITTER'; ps.emit_from = 'VOLUME'
ps.count = 300                                                         # ~ not given
ps.frame_start = -1; ps.frame_end = -1                                 # all present at frame 1
ps.lifetime = 400
ps.normal_factor = 0.0
ps.effector_weights.gravity = 0.0
ps.use_rotations = True; ps.use_dynamic_rotation = True
ps.rotation_factor_random = 1.0; ps.phase_factor_random = 2.0          # ~ "turn all those up"
ps.render_type = 'OBJECT'
ps.instance_object = bpy.data.objects.get("dust_ico")                   # tiny low-poly icosphere
ps.particle_size = 0.01; ps.size_random = 0.6                          # ~
bpy.ops.object.effector_add(type='TURBULENCE', location=dom.location)
turb = bpy.context.object; turb.field.flow = 1.0
turb.field.strength = 1.0; turb.field.size = 1.0                        # ~ defaults, not given
```
Before exporting for raea, bake the particles (`bpy.ops.ptcache.bake_all(bake=True)`) or convert to instanced meshes; legacy particles do not export to GLB as moving objects.

raea (render time): raea has no particle system (limits.md: keep particles/debris under ~300, fake the rest with an ImagePlane or fog). Draw seeded specks whose drift is a function of the frame:
```tsx
const rnd = (i: number, k: number) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
{Array.from({ length: 120 }, (_, i) => {
  const t = f / fps;
  const p: [number, number, number] = [
    -1 + 2 * rnd(i, 1) + 0.03 * Math.sin(t * 0.4 + i),
     0.1 + 1.2 * rnd(i, 2) + 0.02 * Math.sin(t * 0.3 + i * 1.7),
    -1 + 2 * rnd(i, 3) + 0.03 * Math.cos(t * 0.35 + i)];
  return (
    <Mesh3d key={i} name={`dust-${i}`} transform={Transform.fromXyz(...p).withScale(0.004 + 0.004 * rnd(i, 4))}>
      <Sphere radius={1} />
      <StandardMaterial base_color="#d8d4cc" perceptual_roughness={0.9} />
    </Mesh3d>);
})}
```
For glowing specks use `emissive={LinearRgba.from(Srgba.hex(c)).mul(3)}` with `<Bloom threshold={0.9} />`. A `<FogVolume density={0.02}>` under a `volumetric` SpotLight gives the "dust in a beam" read for free.

## NOTES
- Deprecated: none in the settings named; legacy particles still exist in 4.x/5.x. A Geometry Nodes version (Distribute Points in Volume + noise-offset Set Position) is the modern route but is not in the video.
- Visual gaps: exact count, size, turbulence strength/size, and which rotation randomize field is which ("I don't really know which one is which") are not given — marked `~`.
- Rule conflicts: none if motion is slow; keep specks out of the hero's silhouette and never in the accent colour. Fade the layer in/out over ~0.4 s when a setup changes — never pop the field on/off.
