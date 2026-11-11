// text-to-cad trial (2026-11-11): EX35's primitive espresso set (left, its own sizes) vs the CAD machine + grinder (right, true size)
import { AbsoluteFill, Composition, registerRoot, staticFile } from "raea";
import { Model } from "raea/3d";
import { StandardMaterial } from "raea/pbr";
import { Cuboid, Cylinder, Mesh3d } from "raea/mesh";
import { AmbientLight, DirectionalLight } from "raea/light";
import { Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
const F = ({ c, r = 0.5, m = 0 }: { c: string; r?: number; m?: number }) => <StandardMaterial base_color={c} perceptual_roughness={r} metallic={m} />;
const B = ({ p, s, children }: { p: [number, number, number]; s: [number, number, number]; children: any }) =>
  <Mesh3d transform={Transform.fromXyz(...p)}><Cuboid half_size={[s[0] / 2, s[1] / 2, s[2] / 2]} />{children}</Mesh3d>;
const TOP = 1.04;                                   // back-counter top
function Old({ x }: { x: number }) {               // ex35.tsx:187-195, same offsets from the counter top
  const P: any[] = [];
  P.push(<B key="em" p={[x, TOP + 0.31, 0]} s={[1.1, 0.6, 0.5]}><F c="#d5d9df" r={0.22} m={0.9} /></B>);
  P.push(<B key="emt" p={[x, TOP + 0.63, 0]} s={[1.0, 0.04, 0.42]}><F c="#9aa0a8" r={0.3} m={0.9} /></B>);
  for (let g = 0; g < 2; g++) {
    P.push(<B key={`gh${g}`} p={[x - 0.28 + g * 0.56, TOP + 0.12, 0.3]} s={[0.12, 0.06, 0.12]}><F c="#2b2d33" r={0.3} /></B>);
    P.push(<B key={`pf${g}`} p={[x - 0.28 + g * 0.56, TOP + 0.08, 0.43]} s={[0.04, 0.03, 0.16]}><F c="#1c1c21" r={0.3} /></B>);
  }
  P.push(<B key="dt" p={[x, TOP + 0.02, 0.32]} s={[0.9, 0.025, 0.16]}><F c="#30323a" r={0.3} m={0.6} /></B>);
  return <>{P}</>;
}
function Cmp() {
  return (
    <AbsoluteFill style={{ background: "#d9d4cb" }}>
      <Camera3d transform={Transform.fromXyz(0.9, 2.35, 3.0).lookingAt([0.9, 1.2, 0])} projection={{ Perspective: { fov: 0.62 } }} />
      <AmbientLight brightness={350} />
      <DirectionalLight transform={Transform.fromXyz(-2, 6, 4).lookingAt([0, 0, 0])} illuminance={9000} shadow_maps_enabled />
      <B p={[0.9, 0.5, 0.1]} s={[3.6, 1.0, 0.75]}><F c="#141e6e" r={0.5} /></B>
      <B p={[0.9, TOP - 0.02, 0.1]} s={[3.62, 0.04, 0.77]}><F c="#f4f0ea" r={0.35} /></B>
      <B p={[0.9, 1.5, -0.35]} s={[3.6, 3, 0.1]}><F c="#e6e0d5" r={0.8} /></B>
      <Old x={0} />
      <Model src={staticFile("espresso.glb")} position={[1.55, TOP, 0]} />
      <Model src={staticFile("grinder.glb")} position={[2.25, TOP, -0.05]} />
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="cmp" component={Cmp} width={1600} height={900} fps={30} durationInFrames={1} />);
