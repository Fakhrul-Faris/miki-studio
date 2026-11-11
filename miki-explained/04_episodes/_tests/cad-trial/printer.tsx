// text-to-cad trial (2026-11-11): EX32's hero props from tools/cad/props/printer_ink.py, true size on a desk
import { AbsoluteFill, Composition, registerRoot, staticFile } from "raea";
import { Model } from "raea/3d";
import { StandardMaterial } from "raea/pbr";
import { Cuboid, Mesh3d } from "raea/mesh";
import { AmbientLight, DirectionalLight } from "raea/light";
import { Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
const DESK = 0.75;
function Pr() {
  return (
    <AbsoluteFill style={{ background: "#d9d4cb" }}>
      <Camera3d transform={Transform.fromXyz(0.25, 1.4, 1.45).lookingAt([0.25, 0.83, 0])} projection={{ Perspective: { fov: 0.6 } }} />
      <AmbientLight brightness={350} />
      <DirectionalLight transform={Transform.fromXyz(-2, 5, 3).lookingAt([0, 0, 0])} illuminance={9000} shadow_maps_enabled />
      <Mesh3d transform={Transform.fromXyz(0.2, DESK - 0.02, 0)}><Cuboid half_size={[1.2, 0.02, 0.5]} /><StandardMaterial base_color="#b98f63" perceptual_roughness={0.6} /></Mesh3d>
      <Mesh3d transform={Transform.fromXyz(0.2, 1.2, -0.55)}><Cuboid half_size={[1.6, 1.2, 0.05]} /><StandardMaterial base_color="#e6e0d5" perceptual_roughness={0.85} /></Mesh3d>
      <Model src={staticFile("printer.glb")} position={[-0.32, DESK, -0.05]} rotation={[0, 0.35, 0]} />
      <Model src={staticFile("printer_door_open.glb")} position={[0.38, DESK, -0.05]} rotation={[0, -0.3, 0]} />
      {[0, 1, 2, 3, 4].map((i) => <Model key={i} src={staticFile("cartridge.glb")} position={[0.72 + (i % 3) * 0.055, DESK + Math.floor(i / 3) * 0.061, 0.2]} rotation={[0, -0.4, 0]} />)}
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="pr" component={Pr} width={1600} height={900} fps={30} durationInFrames={1} />);
