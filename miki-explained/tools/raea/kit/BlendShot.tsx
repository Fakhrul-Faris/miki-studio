// BlendShot — plays one shot exported by tools/raea/blend2raea.py in the house clay look (V4), as close to the EEVEE
// render as raea gets (user, 2026-11-07: "all raea … closer to eevee"). The set (media/NAME.glb, one clip "shot" on the
// episode clock), the per-frame camera and the set's area lights come from the export; the backdrop, ground, tone
// mapping and contrast are the V4 look.
//   <BlendShot data={s01} frame={useCurrentFrame()} />   // frame = the episode frame (data.f0 … data.f1)
import { staticFile } from "raea";
import { AmbientOcclusion, Bloom, Canvas3D, Environment, Grade, Model, ToneMapping } from "raea/3d";
import { Cuboid, Mesh3d } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { AmbientLight, RectLight, Shadows, SpotLight } from "raea/light";
import { Transform } from "raea/transform";
import { Camera3d } from "raea/camera";

export type V3 = [number, number, number];
export type ShotData = {
  name: string; fps: number; f0: number; f1: number;
  camera: { p: V3; t: V3; fov: number }[];
  lights: { type: string; p: V3; aim: V3; watts: number; size: number; color: number[] }[];
};

// the look's dials (calibrated against EX23 EEVEE stills, _tests/EX00V15_raea-look)
export const LOOK = {
  keyGain: 1100,          // Blender area watts -> raea spot lumens: the key's shadow-casting share
  keyPanelGain: 500,     // … and its soft, shadowless share (a big area light's shadows are mostly lit)
  fillGain: 400,          // Blender area watts -> raea panel lumens, the two fills
  ambient: 55,            // cd/m², the room's bounce EEVEE's fast GI gives
  exposure: 0,            // stops
  contrast: 1.12,         // AgX "Medium High Contrast"
  ground: "#3E424A", groundRough: 0.45,
  skyTop: "#050608", skyHorizon: "#1d2026",
};

const hex = (c: number[]) => "#" + c.slice(0, 3).map((v) => Math.round(255 * Math.min(1, Math.pow(v, 1 / 2.2))).toString(16).padStart(2, "0")).join("");

export function BlendShot({ data, frame, look = LOOK }: { data: ShotData; frame: number; look?: typeof LOOK }) {
  const i = Math.max(0, Math.min(data.camera.length - 1, frame - data.f0));
  const cam = data.camera[i];
  const byPower = [...data.lights].sort((a, b) => b.watts - a.watts);
  const [key, ...fills] = byPower;
  return (
    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, ${look.skyTop} 0%, ${look.skyHorizon} 55%, ${look.skyHorizon} 100%)` }}>
      <Canvas3D layered>
        <Camera3d transform={Transform.fromXyz(...cam.p).lookingAt(cam.t)} projection={{ Perspective: { fov: cam.fov } }} />
        <Shadows distance={260} firstCascade={60} mapSize={4096} bias={0.2} />
        <ToneMapping mode="agx" exposure={look.exposure} />
        <Grade midtones={{ contrast: look.contrast }} />
        <AmbientOcclusion quality="high" />
        <Bloom intensity={0.45} threshold={0.85} />
        <AmbientLight brightness={look.ambient} />
        {key && (
          <SpotLight transform={Transform.fromXyz(...key.p).lookingAt(key.aim)} intensity={key.watts * look.keyGain}
            color={hex(key.color)} range={400} outer_angle={1.1} inner_angle={0.2} radius={key.size / 2}
            soft_shadows_enabled shadow_maps_enabled />
        )}
        {key && <RectLight transform={Transform.fromXyz(...key.p).lookingAt(key.aim)} intensity={key.watts * look.keyPanelGain} width={key.size} height={key.size} color={hex(key.color)} range={400} />}
        {fills.map((l, k) => (
          <RectLight key={k} transform={Transform.fromXyz(...l.p).lookingAt(l.aim)} intensity={l.watts * look.fillGain}
            width={l.size} height={l.size} color={hex(l.color)} range={400} />
        ))}
        <Mesh3d transform={Transform.fromXyz(cam.t[0], -0.05, cam.t[2])}>
          <Cuboid half_size={[600, 0.05, 600]} />
          <StandardMaterial base_color={look.ground} perceptual_roughness={look.groundRough} />
        </Mesh3d>
        <Model src={staticFile(`${data.name}.glb`)} animation="shot" time={frame / data.fps} />
      </Canvas3D>
    </div>
  );
}
