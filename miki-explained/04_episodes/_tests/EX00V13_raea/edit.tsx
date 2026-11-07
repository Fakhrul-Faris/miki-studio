// EX23 shot 1 in raea: the same world exported from EX23_check.blend at frame 30 (media/shot1.glb), the same camera
// (40 mm, 9:16) and the V4 clay lighting translated: one soft key from the big area light's side, two soft panels as
// fills, ambient + AO for the contact shading the clay look leans on.
import { AbsoluteFill, Composition, Easing, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { Bloom, Entity, Environment, Model, AmbientOcclusion, ToneMapping } from "raea/3d";
import { Cuboid, Mesh3d } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { AmbientLight, RectLight, Shadows, SpotLight } from "raea/light";
import { Transform } from "raea/transform";
import { Camera3d } from "raea/camera";

const CAM: [number, number, number] = [21.16, 22.81, 65.11];
const TGT: [number, number, number] = [2.80, 14.26, 8.63];
const VFOV = 0.8457; // Blender 40 mm on a 36 mm sensor fitted to the frame's height

function Shot1() {
  const f = useCurrentFrame();
  const sink = interpolate(f, [0, 105], [0, -20], { easing: Easing.inOut(Easing.cubic), extrapolateRight: "clamp" }); // as in the .blend: 0 → -20 m by frame ~105
  return (
    <AbsoluteFill style={{ background: "#101216" }}>
      <Camera3d transform={Transform.fromXyz(...CAM).lookingAt(TGT)} projection={{ Perspective: { fov: VFOV } }} />
      <Shadows distance={140} firstCascade={40} mapSize={4096} bias={0.2} />
      <ToneMapping mode="tony" exposure={0} />
      <AmbientOcclusion quality="high" />
      <Bloom intensity={0.6} threshold={0.8} />
      <Environment src={staticFile("sky.hdr")} intensity={0.25} />
      <AmbientLight brightness={40} />
      <SpotLight transform={Transform.fromXyz(-32, 52, 28).lookingAt([4, 4, 0])} intensity={2.6e9} range={200} outer_angle={0.55} inner_angle={0.1} radius={6} soft_shadows_enabled shadow_maps_enabled />
      <RectLight transform={Transform.fromXyz(20, 12, -20).lookingAt([0, 8, 0])} intensity={4000000} width={12} height={12} color="#ffffff" />
      <RectLight transform={Transform.fromXyz(18, 8, 18).lookingAt([0, 6, 0])} intensity={3000000} width={24} height={24} color="#ffffff" />
      <Mesh3d transform={Transform.fromXyz(0, -0.05, 0)}>
        <Cuboid half_size={[300, 0.05, 300]} />
        <StandardMaterial base_color="#8a8e96" perceptual_roughness={0.9} />
      </Mesh3d>
      <Entity transform={Transform.fromXyz(0, sink, 0)}><Model src={staticFile("shot1.glb")} /></Entity>
    </AbsoluteFill>
  );
}

registerRoot(() => <Composition id="shot1" component={Shot1} width={1080} height={1920} fps={30} durationInFrames={150} />);
