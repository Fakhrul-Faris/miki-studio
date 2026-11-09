// EX30 Mixue — Style C built locally (no generated plates: user has no Seedream/Dreamina, 2026-11-09).
// BIBLE-C: Malaysia at night, the business is the only warm light, painterly grain, faceless figures holding poses,
// real motion inside the scene. raea's <Look mode="paint">: flat tones, hard shadow shapes, grain, ragged edges, a
// locked palette; Mixue's lights are `paint` lights, so its red is the only warm paint in the frame. The real logo
// sits in its own pass ("ui"), skipped by the look, so the brand stays exact.
// Assets: the EX29 street (build/media → _tests/style-test-mrdiy/A2/media), the official Mixue logo (02_kit/brand/logos).
import { AbsoluteFill, Composition, Easing, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { Entity, ImagePlane, Look, Model, Text3D, manifold, type Solid } from "raea/3d";
import { Cuboid, Cylinder, Mesh3d } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { DirectionalLight, PointLight, Shadows, SpotLight } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";

const S = (p: string) => staticFile(p);
const FPS = 30;
const k = (t: number, a: number, b: number, e = Easing.inOut(Easing.cubic)) => interpolate(t, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
const L3 = (a: number[], b: number[], u: number): [number, number, number] => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];

// night palette: one cool teal-navy family + Mixue's red/white/cone gold (the only warm colours)
const N0 = "#0b1820", N1 = "#10232e", N2 = "#173241", N3 = "#21465a", N4 = "#2f6177", N5 = "#4d8698";
const RED = "#e60012", RED2 = "#9e0f1a", CREAM = "#fff3e2", GOLD = "#f3b24a", PINK = "#ff7a6a";
const PALETTE = [N0, N1, N2, N3, N4, N5, "#7fb3bf", RED, RED2, PINK, CREAM, GOLD, "#ffffff", "#5a1a22"];

const W = 4.6, AR = 2.2, MX = 0;                 // shophouse width, five-foot way depth, the Mixue unit
const VAR = (i: number) => ["A", "B", "C", "B", "A", "C", "A", "B", "C", "A"][((i % 10) + 10) % 10];
const B = ({ p, s, c, rot }: { p: [number, number, number]; s: [number, number, number]; c: string; rot?: [number, number, number] }) => {
  let t = Transform.fromXyz(...p); if (rot) t = t.withRotation(Quat.fromEuler("XYZ", ...rot));
  return <Mesh3d transform={t}><Cuboid half_size={[s[0] / 2, s[1] / 2, s[2] / 2]} /><StandardMaterial base_color={c} perceptual_roughness={0.9} /></Mesh3d>;
};

let SO: Record<string, Solid> | null = null;
const so = () => (SO ??= {
  cone: manifold.cone(0.0, 0.32, 0.9).rotate(-90, 0, 0),                                       // the waffle cone, tip down
  swirl: manifold.union(manifold.sphere(0.36), manifold.sphere(0.27).move(0, 0.3, 0), manifold.sphere(0.16).move(0, 0.55, 0)),
});

function Row({ closing = 0 }: { closing?: number }) {
  const P: any[] = [];
  for (let i = -3; i <= 3; i++) {
    const cx = i * W + W / 2, mx = i === MX, tint = [N2, N3, N2, N1][((i % 4) + 4) % 4];
    P.push(<Model key={`sh${i}`} src={S(mx ? "parts/shophouse_A_open.glb" : `parts/shophouse_${VAR(i)}.glb`)} position={[cx, 0, 0]}>
      <StandardMaterial material="wall" base_color={mx ? "#f4efe8" : tint} perceptual_roughness={1} />
      <StandardMaterial material="trim" base_color={mx ? RED : N4} perceptual_roughness={0.9} />
      <StandardMaterial material="shutter" base_color={mx ? CREAM : N2} perceptual_roughness={0.9} />
      <StandardMaterial material="tile" base_color={N1} perceptual_roughness={0.9} />
      <StandardMaterial material="floor" base_color={mx ? "#e9ded0" : N2} perceptual_roughness={0.9} />
      <StandardMaterial material="party" base_color={N1} perceptual_roughness={0.9} />
      <StandardMaterial material="dark" base_color={mx ? CREAM : N0} />
    </Model>);
    // signboards: dark for the neighbours; Mixue's red fascia with the real logo on a white lightbox
    P.push(<B key={`sg${i}`} p={[cx, 4.05, 2.32]} s={[W - 0.5, 0.62, 0.1]} c={mx ? RED : N1} />);
    const h = mx ? 2.8 * closing : 2.8;                                       // a shutter rolled down from the lintel (2.95)
    P.push(<B key={`shut${i}`} p={[cx, 2.95 - Math.max(h, 0.01) / 2, mx ? 0.55 : 0.3]} s={[W - 0.9, Math.max(h, 0.01), 0.06]} c={mx ? N4 : N2} />);
  }
  return <>{P}</>;
}

function Kiosk() {
  const cx = MX * W + W / 2;
  return <>
    {/* the real logo, its own pass: the paint look leaves it exact */}
    <Mesh3d pass="ui" transform={Transform.fromXyz(cx, 4.05, 2.39)}><Cuboid half_size={[1.8, 0.59, 0.005]} /><StandardMaterial base_color="#ffffff" base_color_texture={S("mixue_box.png")} unlit /></Mesh3d>
    {/* counter at the shopfront, menu board above it (RM2), the soft-serve machine */}
    <B p={[cx, 0.6, 0.15]} s={[3.6, 0.9, 0.6]} c={RED} />
    <B p={[cx, 1.07, 0.15]} s={[3.7, 0.06, 0.66]} c={CREAM} />
    <B p={[cx - 0.9, 2.45, -0.4]} s={[1.5, 0.9, 0.06]} c={CREAM} />
    <B p={[cx + 0.9, 2.45, -0.4]} s={[1.5, 0.9, 0.06]} c={CREAM} />
    <Mesh3d pass="ui" transform={Transform.fromXyz(cx + 0.9, 2.42, -0.35)}><Text3D size={0.42} depth={0.02}>RM2</Text3D><StandardMaterial base_color={RED} unlit /></Mesh3d>
    <B p={[cx - 0.2, 1.45, -0.6]} s={[0.5, 0.75, 0.45]} c="#d9dde2" />
    {/* the big cone sign on the five-foot way: the kiosk's own light box */}
    <Mesh3d transform={Transform.fromXyz(cx + 1.75, 1.35, 1.6)} shape={so().cone}><StandardMaterial base_color={GOLD} perceptual_roughness={0.9} /></Mesh3d>
    <Mesh3d transform={Transform.fromXyz(cx + 1.75, 1.75, 1.6)} shape={so().swirl}><StandardMaterial base_color={CREAM} perceptual_roughness={0.9} /></Mesh3d>
    <B p={[cx + 1.75, 0.45, 1.6]} s={[0.12, 0.9, 0.12]} c={N1} />
  </>;
}

function Street() {
  return <>
    <B p={[0, -0.02, AR + 4.6]} s={[80, 0.04, 8.6]} c={N3} />
    <B p={[0, 0.07, AR + 0.15]} s={[80, 0.14, 0.28]} c={N3} />
    <B p={[0, 0.08, AR + 10]} s={[80, 0.16, 2.2]} c={N2} />
    {/* rain puddles: flat dark sheets the kiosk's light paints red */}
    {[[1.2, 4.4, 2.2, 0.9], [3.6, 5.6, 1.6, 0.6], [-1.6, 6.2, 2.6, 0.8], [2.6, 7.4, 1.4, 0.5]].map(([x, z, w, d], n) =>
      <Mesh3d key={`pd${n}`} transform={Transform.fromXyz(x, 0.005, z).withScale([w / 2, 1, d / 2]).withRotation(Quat.fromEuler("XYZ", 0, n * 0.7, 0))}><Cylinder radius={1} half_height={0.005} /><StandardMaterial base_color={N5} perceptual_roughness={0.9} /></Mesh3d>)}
    <Model src={S("parts/vespa.glb")} position={[-3.4, 0.12, 1.3]} rotation={[0, 1.2, 0]}><StandardMaterial base_color={N2} /></Model>
    <Model src={S("plastic_monobloc_chair_01/plastic_monobloc_chair_01.gltf")} position={[-2.2, 0.15, 0.9]} rotation={[0, 0.5, 0]}><StandardMaterial base_color={N3} /></Model>
  </>;
}

// ---------- a Mixue supply lorry (box truck): cab, box, wheels; the real logo on the box side
function Lorry({ x, z, r = 0, logo = true, k: key }: { x: number; z: number; r?: number; logo?: boolean; k: string }) {
  const q = Quat.fromEuler("XYZ", 0, r, 0), at = (dx: number, dy: number, dz: number): [number, number, number] => { const o = Quat.mulVec3(q, [dx, dy, dz]); return [x + o[0], o[1], z + o[2]]; };
  const box = (n: string, d: [number, number, number], s: [number, number, number], c: string) =>
    <Mesh3d key={key + n} transform={Transform.fromXyz(...at(...d)).withRotation(q)}><Cuboid half_size={[s[0] / 2, s[1] / 2, s[2] / 2]} /><StandardMaterial base_color={c} perceptual_roughness={0.9} /></Mesh3d>;
  return <>
    {box("b", [0, 1.75, 0], [4.2, 2.3, 2.1], "#eef0f2")}
    {box("st", [0, 0.82, 0], [4.22, 0.22, 2.12], RED)}
    {box("c", [2.75, 1.25, 0], [1.4, 1.9, 2.0], "#e4e6ea")}
    {box("w", [3.42, 1.7, 0], [0.06, 0.7, 1.7], N1)}
    {[-1.4, 1.2, 2.75].flatMap((dx) => [-1, 1].map((sz) => <Mesh3d key={`${key}wh${dx}${sz}`} transform={Transform.fromXyz(...at(dx, 0.42, sz * 1.0)).withRotation(Quat.mul(q, Quat.fromRotationX(Math.PI / 2)))}><Cylinder radius={0.42} half_height={0.15} /><StandardMaterial base_color={N0} /></Mesh3d>))}
    {logo && <Mesh3d key={key + "lg"} pass="ui" transform={Transform.fromXyz(...at(0, 1.85, 1.06)).withRotation(q)}><Cuboid half_size={[1.5, 0.5, 0.004]} /><StandardMaterial base_color="#ffffff" base_color_texture={S("mixue_box.png")} unlit /></Mesh3d>}
  </>;
}

// ---------- L02: the town from above — rows of shoplots; Mixue fronts glow red one by one (unlit "ui" boxes: they stay pure red)
const TOWN = (() => { const out: [number, number, number][] = []; let n = 0;           // [x, z, order]
  for (let r = 0; r < 5; r++) for (let i = -6; i <= 6; i++) { const h = (i * 7 + r * 13 + 5) % 11; if (h < 3 || (r === 2 && i === 0)) out.push([i * W + W / 2, -r * 26, n++]); }
  return out; })();
function Town({ on }: { on: number }) {
  const P: any[] = [];
  for (let r = 1; r < 5; r++) for (let i = -6; i <= 6; i++) {
    const cx = i * W + W / 2, z = -r * 26;
    P.push(<Model key={`t${r}${i}`} src={S(`parts/shophouse_${VAR(i + r)}.glb`)} position={[cx, 0, z]}>
      <StandardMaterial material="wall" base_color={[N3, N4, N3, N2][((i + r) % 4 + 4) % 4]} /><StandardMaterial material="tile" base_color={[N3, N4][((i + r) % 2 + 2) % 2]} />
      <StandardMaterial material="trim" base_color={N3} /><StandardMaterial material="dark" base_color={N0} /><StandardMaterial material="floor" base_color={N1} />
      <StandardMaterial material="shutter" base_color={N1} /><StandardMaterial material="party" base_color={N1} /></Model>);
    P.push(<B key={`tr${r}${i}`} p={[cx, -0.02, z + 6.5]} s={[W, 0.04, 9]} c={N1} />);
  }
  TOWN.forEach(([x, z, n]) => { const u = k(on, n * 0.06, n * 0.06 + 0.25);
    P.push(<Mesh3d key={`tl${n}`} name={`tl${n}`} pass="ui" transform={Transform.fromXyz(x, 4.05, z + 2.45).withScale([Math.max(u, 0.001), 1, 1])}><Cuboid half_size={[2.05, 0.4, 0.06]} /><StandardMaterial base_color={RED} unlit /></Mesh3d>);
    P.push(<Mesh3d key={`tp${n}`} name={`tp${n}`} pass="ui" transform={Transform.fromXyz(x, 0.03, z + 4.4).withScale([Math.max(u, 0.001) * 2.4, 1, Math.max(u, 0.001) * 1.3])}><Cylinder radius={1} half_height={0.01} /><StandardMaterial base_color="#b0101c" unlit /></Mesh3d>); });
  return <>{P}</>;
}

// ---------- L03: the back lane behind the shop (set at x = 80): rear wall, one fluorescent tube, the lorry, cartons, owner
const LX = 80;
function Lane({ t }: { t: number }) {
  const P: any[] = [];
  P.push(<B key="lw" p={[LX, 3, -1]} s={[16, 6, 0.4]} c={N2} />);                                   // the row's back walls
  for (const dx of [-5.5, 0, 5.5]) P.push(<B key={`ld${dx}`} p={[LX + dx, 1.2, -0.75]} s={[1.2, 2.4, 0.1]} c={dx === 0 ? CREAM : N1} />);   // back doors (Mixue's open)
  P.push(<B key="lt" p={[LX, 2.9, -0.7]} s={[1.3, 0.08, 0.12]} c="#ffffff" />);                      // the tube
  P.push(<B key="lg" p={[LX, -0.02, 4]} s={[20, 0.04, 10]} c={N2} />);                               // lane floor
  P.push(<B key="ldr" p={[LX, 0.01, 1.4]} s={[20, 0.02, 0.4]} c={N0} />);                            // drain
  for (let n = 0; n < 3; n++) P.push(<B key={`lp${n}`} p={[LX - 7 + n * 0.3, 3.5 + n * 0.5, -0.6]} s={[0.12, 7, 0.12]} c={N1} />);   // pipes
  // cartons: on the tailgate at first, they slide down onto the trolley (L03 motion)
  for (let n = 0; n < 4; n++) { const u = k(t, n * 0.25, n * 0.25 + 0.6);
    P.push(<Model key={`lc${n}`} src={S("cardboard_box_01/cardboard_box_01.gltf")} position={L3([LX + 2.7 + (n % 2) * 0.4, 0.95 + Math.floor(n / 2) * 0.5, 2.8 + (n % 2) * 0.3], [LX + 0.9, 0.2 + n * 0.5, 1.9], u)} scale={[1.2, 1.2, 1.2]}><StandardMaterial base_color="#c99a62" /></Model>); }
  P.push(<Model key="ltr" src={S("hand_truck/hand_truck.gltf")} position={[LX + 0.9, 0, 1.6]} rotation={[0, -1.4, 0]}><StandardMaterial base_color={N4} /></Model>);
  P.push(<Model key="low" src={S("people/s_m30.glb")} position={[LX - 0.2, 0, 2.6]} rotation={[0, Math.PI / 2, 0]}><StandardMaterial base_color={N0} /></Model>);
  P.push(<Lorry key="lry" k="lry" x={LX + 4.9} z={3.0} r={0} />);
  return <>{P}</>;
}

// ---------- L04: the factory (set at x = 160): a giant lit gate, lorries streaming out; a tiny cone on a wall in front
const FX = 160;
function Factory({ t }: { t: number }) {
  const P: any[] = [];
  P.push(<B key="fb" p={[FX, 9, -14]} s={[60, 18, 4]} c={N2} />);
  P.push(<Mesh3d key="fg" pass="ui" transform={Transform.fromXyz(FX, 4, -11.9)}><Cuboid half_size={[6, 4, 0.1]} /><StandardMaterial base_color="#ffe8cf" unlit /></Mesh3d>);   // the lit gate
  P.push(<Mesh3d key="f97" pass="ui" transform={Transform.fromXyz(FX, 12.2, -11.85)}><Text3D size={3.6} depth={0.1}>97%</Text3D><StandardMaterial base_color={RED} unlit /></Mesh3d>);
  P.push(<B key="fr" p={[FX, -0.02, 10]} s={[80, 0.04, 50]} c={N1} />);
  for (let n = 0; n < 7; n++) { const z = -9 + ((n * 4.6 + t * 6) % 30);                             // the stream of lorries toward us
    P.push(<Lorry key={`fl${n}`} k={`fl${n}`} x={FX + (n % 2 ? 2.2 : -2.2)} z={z} r={-Math.PI / 2} logo={false} />); }
  P.push(<B key="fw" p={[FX - 1.0, 0.5, 31]} s={[3, 1, 0.5]} c={N3} />);                              // the low wall, near camera
  P.push(<Mesh3d key="fcn" transform={Transform.fromXyz(FX - 1.0, 1.28, 31).withScale([0.22, 0.22, 0.22])} shape={so().cone}><StandardMaterial base_color={GOLD} /></Mesh3d>);
  P.push(<Mesh3d key="fsw" transform={Transform.fromXyz(FX - 1.0, 1.38, 31).withScale([0.22, 0.22, 0.22])} shape={so().swirl}><StandardMaterial base_color={CREAM} /></Mesh3d>);
  return <>{P}</>;
}

// a beat's camera (stills: one frame per beat; the film maps the voice timeline onto these later)
type Beat = { cam: [number, number, number]; look: [number, number, number]; fov: number };
const CX = MX * W + W / 2;
const BEATS: Beat[] = [
  { cam: [CX - 1.6, 2.1, AR + 12], look: [CX + 0.2, 1.7, 1.0], fov: 0.85 },                // L01 the kiosk across the wet road
  { cam: [CX + 4, 78, 38], look: [CX, 0, -52], fov: 0.8 },                                 // L02 the town from above
  { cam: [LX - 6.5, 1.6, 4.6], look: [LX + 2.2, 1.3, 2.0], fov: 0.8 },                   // L03 the back lane
  { cam: [FX - 1.6, 0.9, 34.5], look: [FX - 0.3, 4.2, -10], fov: 0.9 },                        // L04 worm's-eye at the factory gate
  { cam: [CX - 1.2, 2.0, AR + 11], look: [CX + 0.2, 1.6, 1.0], fov: 0.85 },                // L05 the kiosk closing
];

function Shot({ beat, t }: { beat: number; t: number }) {
  const b = BEATS[beat], closing = beat === 4 ? 0.55 : 0;
  return (
    <AbsoluteFill style={{ background: N0 }}>
      <Camera3d transform={Transform.fromXyz(...b.cam).lookingAt(b.look)} projection={{ Perspective: { fov: b.fov } }} />
      <Look mode="paint" bands={3} shadow="#33475e" mid="#5d7488" grain={0.4} rag={1.6} sky={[N0, N2]} palette={PALETTE} skip={["ui"]} />
      <DirectionalLight transform={Transform.fromXyz(-8, 9, -6).lookingAt([0, 0, 2])} illuminance={2400} color="#9fc3d0" shadow_maps_enabled />
      <Shadows distance={beat === 1 ? 160 : 45} firstCascade={beat === 1 ? 150 : 35} cascades={1} mapSize={4096} />
      {/* the 8 paint lights (raea's limit), always present: Mixue's four at the kiosk, the lane's two, the factory's two */}
      <PointLight name="k1" transform={Transform.fromXyz(CX, 2.0, -1.4)} intensity={1500000 * (1 - closing)} color="#ff8a7a" range={4.6} paint shadow_maps_enabled />
      <SpotLight name="k2" transform={Transform.fromXyz(CX, 2.6, 0.4).lookingAt([CX + 0.4, 0, 7])} intensity={5200000 * (1 - closing * 0.8)} outer_angle={0.75} inner_angle={0.4} color="#ff5a4a" range={16} paint />
      <PointLight name="k3" transform={Transform.fromXyz(CX, 4.05, 2.9)} intensity={300000} color="#ff3b3b" range={1.6} paint />
      <PointLight name="k4" transform={Transform.fromXyz(CX + 1.75, 1.6, 2.3)} intensity={300000} color="#ffd59a" range={3} paint />
      <PointLight name="l1" transform={Transform.fromXyz(LX, 2.7, -0.3)} intensity={900000} color="#d8f4ff" range={9} paint shadow_maps_enabled />
      <PointLight name="l2" transform={Transform.fromXyz(LX, 1.3, -1.6)} intensity={500000} color="#ff8a7a" range={4} paint />
      <SpotLight name="f1" transform={Transform.fromXyz(FX, 6, -11.5).lookingAt([FX, 0, 10])} intensity={60000000} outer_angle={0.6} inner_angle={0.35} color="#ffd2b0" range={60} paint />
      <PointLight name="f2" transform={Transform.fromXyz(FX, 9, -10)} intensity={9000000} color="#ff5a4a" range={14} paint />
      <Row closing={closing} />
      <Kiosk />
      <Street />
      {beat === 0 && <Model src={S("people/s_f25.glb")} position={[CX - 0.5, 0.15, 1.15]} rotation={[0, Math.PI, 0]}><StandardMaterial base_color={N1} /></Model>}
      {[0, 1, 2].map((n) => <Model key={`dc${n}`} src={S("cardboard_box_01/cardboard_box_01.gltf")} position={[CX - 1.4 + (n % 2) * 0.55, 0.15 + Math.floor(n / 2) * 0.5, 1.2]} scale={beat === 4 ? [1.2, 1.2, 1.2] : [0.001, 0.001, 0.001]}><StandardMaterial base_color="#c99a62" /></Model>)}
      <Town on={beat === 1 ? 3 : 0} />
      <Lane t={beat === 2 ? 0.6 : 0} />
      <Factory t={t} />
    </AbsoluteFill>
  );
}
const Stills = () => { const f = useCurrentFrame(); return <Shot beat={Math.min(4, f)} t={1} />; };
registerRoot(() => <Composition id="ex30stills" component={Stills} width={1080} height={1920} fps={FPS} durationInFrames={5} />);
