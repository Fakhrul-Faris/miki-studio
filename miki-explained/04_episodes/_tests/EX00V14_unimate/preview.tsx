// UniMate test: two motions generated on the Mac (MPS) for the m35 figure (slim 46-joint rig), played twice.
// left: "An object turns around and looks up."  right: "An object stands still and shifts its weight."
import { AbsoluteFill, Composition, registerRoot, staticFile, useCurrentFrame, useVideoConfig } from "raea";
import { Model, AmbientOcclusion } from "raea/3d";
import { Cuboid, Mesh3d } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { AmbientLight, DirectionalLight } from "raea/light";
import { Transform } from "raea/transform";
import { Camera3d } from "raea/camera";

function Preview() {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const t = (f / fps) % 1.97;
  return (
    <AbsoluteFill style={{ background: "#1a1c20" }}>
      <Camera3d transform={Transform.fromXyz(0, 1.3, 6.5).lookingAt([0, 0.9, 0])} projection={{ Perspective: { fov: (35 * Math.PI) / 180 } }} />
      <AmbientOcclusion />
      <AmbientLight brightness={250} />
      <DirectionalLight transform={Transform.fromXyz(-3, 6, 5).lookingAt([0, 0, 0])} illuminance={9000} soft_shadow_size={3} shadow_maps_enabled />
      <Mesh3d transform={Transform.fromXyz(0, -0.05, 0)}><Cuboid half_size={[20, 0.05, 20]} /><StandardMaterial base_color="#8a8e96" perceptual_roughness={0.9} /></Mesh3d>
      <Model src={staticFile("turn_look_up.glb")} animations={[{ clip: "Reconstructed_Action", time: t, weight: 1 }]} position={[-1.2, 0, 0]} />
      <Model src={staticFile("shift_weight.glb")} animations={[{ clip: "Reconstructed_Action", time: t, weight: 1 }]} position={[1.2, 0, 0]} />
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="preview" component={Preview} width={1920} height={1080} fps={30} durationInFrames={118} />);
