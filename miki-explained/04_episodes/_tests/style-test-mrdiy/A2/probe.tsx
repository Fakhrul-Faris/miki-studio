import { AbsoluteFill, Composition, registerRoot, staticFile } from "raea";
import { Model } from "raea/3d";
import { StandardMaterial } from "raea/pbr";
import { Cuboid, Mesh3d } from "raea/mesh";
import { AmbientLight, DirectionalLight } from "raea/light";
import { Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
const M = ["rollershutter_door", "rollershutter_window_01", "exterior_aircon_unit", "plastic_crate_01", "plastic_monobloc_chair_01",
  "potted_plant_02", "steel_frame_shelves_01", "CashRegister_01", "cardboard_box_01", "hand_truck", "mounted_fluorescent_lights",
  "power_box_01", "street_lamp_01", "Drill_01", "metal_toolbox", "spray_paint_bottles", "plastic_container", "folding_wooden_stool"];
function P() {
  return (
    <AbsoluteFill style={{ background: "#bcc4cc" }}>
      <Camera3d transform={Transform.fromXyz(9, 9, 22).lookingAt([9, 1, 0])} projection={{ Perspective: { fov: 0.75 } }} />
      <AmbientLight brightness={300} />
      <DirectionalLight transform={Transform.fromXyz(3, 8, 6).lookingAt([0, 0, 0])} illuminance={9000} shadow_maps_enabled />
      <Mesh3d transform={Transform.fromXyz(9, -0.05, 0)}><Cuboid half_size={[30, 0.05, 20]} /><StandardMaterial base_color="#8d939b" /></Mesh3d>
      {M.map((m, i) => <Model key={m} src={staticFile(`${m}/${m}.gltf`)} position={[(i % 6) * 3.5, 0, Math.floor(i / 6) * -4]} />)}
      <Model src={staticFile("vespa.glb")} position={[22, 0, 0]} />
      <Model src={staticFile("scooter.glb")} position={[22, 0, -4]} />
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="probe" component={P} width={1600} height={900} fps={30} durationInFrames={1} />);
