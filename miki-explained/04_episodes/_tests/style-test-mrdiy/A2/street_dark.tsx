// Style A test v3 · S1 still (WORKING-RULES §1 Style A): high three-quarter view over a dense WHITE model shophouse block
// at dusk; Mr DIY the one real-coloured shop; the coin (token) rolls on the five-foot way toward it.
// Models: Poly Haven (CC0), kit models (02_kit/models, credits.json). Textures: Poly Haven plaster, tiles, roof tiles.
import { AbsoluteFill, Composition, registerRoot, staticFile, useCurrentFrame } from "raea";
import { AmbientOcclusion, Bloom, DepthOfField, Environment, Fog, Grade, ImagePlane, Model, ToneMapping, manifold, type Solid } from "raea/3d";
import { Cuboid, Cylinder, Mesh3d } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { AmbientLight, DirectionalLight, PointLight, RectLight, Shadows, SpotLight } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
import { Affine2 } from "raea/math";
import { LinearRgba, Srgba } from "raea/color";

const S = (p: string) => staticFile(p);
const glow = (hex: string, k: number) => LinearRgba.from(Srgba.hex(hex)).mul(k);
const W = 4.6;                                  // shophouse width
const UNITS = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4];
const DIY = 0, SPD = -1;
const AR = 2.2;                                 // five-foot way depth (z 0..AR), the upper floor overhangs it
const WHITE = "#3b3d44", WHITE2 = "#2f3138", SHADE = "#cfc9be";

// ---------- solids, built once ----------
let SO: Record<string, Solid> | null = null;
const so = () => (SO ??= {
  arch: manifold.box(W - 0.4, 1.2, 0.3).move(-(W - 0.4) / 2, 0, -0.15).minus(manifold.cylinder(2.3, 2).move(0, -1.75, -1)),
  pillar: manifold.roundedBox(0.36, 3.2, 0.36, 0.03),
  cap: manifold.roundedBox(0.5, 0.18, 0.5, 0.03),
  gableRound: manifold.cylinder(1.1, 0.25).move(0, 0, -0.125).intersect(manifold.box(2.4, 1.2, 0.4).move(-1.2, 0, -0.2)),
  gableStep: manifold.union(manifold.box(2.2, 0.4, 0.25).move(-1.1, 0, -0.125), manifold.box(1.3, 0.8, 0.25).move(-0.65, 0, -0.125)),
  coin: manifold.cylinder(0.4, 0.1).move(0, 0, -0.05).minus(manifold.cylinder(0.31, 0.04).move(0, 0, 0.03)).minus(manifold.cylinder(0.31, 0.04).move(0, 0, -0.07)).union(manifold.cylinder(0.18, 0.09).move(0, 0, -0.045)),
  tank: manifold.cylinder(0.45, 1.1).rotate(-90, 0, 0),
  umbrella: manifold.cone(1.3, 0.02, 0.6).rotate(-90, 0, 0),
});

const TC = (n: string) => ({ base_color_texture: S(`tex/${n}_diff_1k.jpg`), ...T(n) });
const T = (n: string) => ({ normal_map_texture: S(`tex/${n}_nor_gl_1k.jpg`), metallic_roughness_texture: S(`tex/${n}_rough_1k.jpg`), perceptual_roughness: 1 });
const Plaster = ({ u = 1, v = 1, tint = WHITE }) => <StandardMaterial {...T("grey_plaster")} base_color={tint} uv_transform={Affine2.fromScale([u, v])} />;
const Roof = ({ u = 3, v = 3 }) => <StandardMaterial {...T("clay_roof_tiles_02")} base_color={WHITE} uv_transform={Affine2.fromScale([u, v])} />;
const Tiles = ({ n, u, v, tint = WHITE, real = false }: { n: string; u: number; v: number; tint?: string; real?: boolean }) => <StandardMaterial {...(real ? TC(n) : T(n))} base_color={tint} uv_transform={Affine2.fromScale([u, v])} />;
const Flat = ({ c = WHITE, r = 0.7, e }: { c?: string; r?: number; e?: any }) => <StandardMaterial base_color={c} perceptual_roughness={r} emissive={e} />;
const WhiteModel = ({ src, p, r = 0, s = 1, c = WHITE }: { src: string; p: [number, number, number]; r?: number; s?: number | [number, number, number]; c?: string }) =>
  <Model src={S(src)} position={p} rotation={[0, r, 0]} scale={typeof s === "number" ? [s, s, s] : s}><StandardMaterial base_color={c} base_color_texture={null as any} /></Model>;

function B({ p, s, children, rot }: { p: [number, number, number]; s: [number, number, number]; children: any; rot?: [number, number, number] }) {
  let t = Transform.fromXyz(...p); if (rot) t = t.withRotation(Quat.fromEuler("XYZ", ...rot));
  return <Mesh3d transform={t}><Cuboid half_size={[s[0] / 2, s[1] / 2, s[2] / 2]} />{children}</Mesh3d>;
}

// one shophouse = a modelled unit (shophouse.py: A arched / B two wide windows / C pediment), its materials re-covered
// here: charcoal clay with plaster relief; Mr DIY's in brand colours. Signboard, shutters, stock and lights stay in raea.
const VAR = (i: number) => ["A", "B", "C", "B", "A", "C", "A", "B", "C", "A"][((i % 10) + 10) % 10];
function Unit({ i }: { i: number }) {
  const x0 = i * W, cx = x0 + W / 2, diy = i === DIY, spd = i === SPD;
  const src = diy ? "parts/shophouse_A_open.glb" : `parts/shophouse_${VAR(i)}.glb`;
  const tint = ["#3b3d44", "#36383f", "#40414a", "#393b43"][((i % 4) + 4) % 4];
  const P: any[] = [];
  P.push(<Model key="sh" src={S(src)} position={[cx, 0, 0]}>
    <StandardMaterial material="wall" base_color={diy ? "#e3a800" : tint} normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} metallic_roughness_texture={S("tex/grey_plaster_rough_1k.jpg")} perceptual_roughness={1} uv_transform={Affine2.fromScale([0.6, 0.6])} />
    <StandardMaterial material="trim" base_color={diy ? "#fff3cf" : "#4a4c54"} perceptual_roughness={0.75} />
    <StandardMaterial material="shutter" base_color={diy ? "#2f7a4a" : "#2c2e34"} perceptual_roughness={0.6} />
    <StandardMaterial material="tile" base_color={tint} normal_map_texture={S("tex/clay_roof_tiles_02_nor_gl_1k.jpg")} perceptual_roughness={0.85} />
    <StandardMaterial material="floor" base_color={diy ? "#c9a77a" : "#45474e"} normal_map_texture={S("tex/concrete_tiles_nor_gl_1k.jpg")} perceptual_roughness={0.8} />
    <StandardMaterial material="party" base_color="#2b2d33" perceptual_roughness={0.8} />
    <StandardMaterial material="dark" base_color={diy ? "#ffd9a0" : "#15161a"} emissive={diy ? glow("#ffc070", 1.2) : undefined} />
  </Model>);
  // signboard on the façade over the arcade
  P.push(<B key="sg" p={[cx, 4.05, 2.32]} s={[W - 0.5, 0.62, 0.1]}>
    <Flat c={diy ? "#d92128" : spd ? "#4a4c53" : ["#2a2c33", "#33302d", "#2a313c"][((i % 3) + 3) % 3]} r={0.45} e={diy ? glow("#ff2a2a", 2.6) : undefined} /></B>);
  if (diy) P.push(<ImagePlane key="lg" src={S("mrdiy_logo.png")} width={W - 0.8} position={[cx, 4.05, 2.38]} />);
  if (spd) P.push(<ImagePlane key="lg" src={S("99_grey.png")} width={2.8} position={[cx, 4.05, 2.38]} />);
  if (diy) {
    const GC = ["#e3262b", "#ffd400", "#2f6fd6", "#3bb273", "#f28c28", "#ffffff", "#7a4fd1"];
    for (const sx of [x0 + 1.0, x0 + 2.3, x0 + 3.6]) P.push(<Model key={`shv${sx}`} src={S("parts/shelves.glb")} position={[sx, 0.15, -2.6]} scale={[0.75, 0.9, 0.75]} />);
    for (let r = 0; r < 4; r++) for (let j = 0; j < 12; j++) P.push(<B key={`bw${r}${j}`} p={[x0 + 0.55 + j * 0.32, 0.45 + r * 0.7, -4.1]} s={[0.25, 0.42, 0.28]}><Flat c={GC[(r * 5 + j) % GC.length]} r={0.5} /></B>);
    for (const [rx] of [[x0 + 1.2], [x0 + 3.4]] as [number][]) {
      P.push(<B key={`rk${rx}`} p={[rx, 0.95, 0.75]} s={[1.1, 1.6, 0.4]}><Flat c="#2a2c31" r={0.5} /></B>);
      for (let lv = 0; lv < 4; lv++) for (let j = 0; j < 5; j++) P.push(<B key={`rg${rx}${lv}${j}`} p={[rx - 0.44 + j * 0.22, 0.35 + lv * 0.38, 0.98]} s={[0.18, 0.28, 0.1]}><Flat c={GC[(lv * 3 + j + (rx > x0 + 2 ? 2 : 0)) % GC.length]} r={0.45} /></B>);
    }
    for (let k = 0; k < 4; k++) P.push(<Mesh3d key={`bin${k}`} transform={Transform.fromXyz(x0 + 0.9 + k * 0.95, 0.43, 1.7)}><Cylinder radius={0.28} half_height={0.27} /><Flat c={["#2f6fd6", "#e3262b", "#3bb273", "#ffd400"][k]} r={0.5} /></Mesh3d>);
    for (let b = 0; b < 5; b++) P.push(<B key={`bk${b}`} p={[x0 + 0.75, 0.21 + b * 0.12, 1.2]} s={[0.45, 0.11, 0.32]}><Flat c="#e3262b" r={0.45} /></B>);
  } else {
    P.push(<WhiteModel key="shut" src="parts/shutter.glb" p={[cx, spd ? 1.4 : 0.15, 0.02]} s={[(W - 0.9) / 1.08, 1.17, 0.5]} c={spd ? "#4e5058" : "#3e4047"} />);
    if (spd) P.push(<B key="sin" p={[cx, 1.5, -0.6]} s={[W - 0.9, 2.8, 0.1]}><Flat c="#1a1c22" e={glow("#7f9cff", 0.1)} /></B>);
  }
  if ((i + 7) % 3 === 0 && !diy) P.push(<WhiteModel key="ac" src="exterior_aircon_unit/exterior_aircon_unit.gltf" p={[cx - 0.4, 5.3, 2.35]} s={1.0} c="#4a4c53" />);
  return <>{P}</>;
}
const x1 = (x0: number) => x0 + W;

function Street() {
  const L = UNITS.length * W, xm = UNITS[0] * W + L / 2;
  const P: any[] = [];
  P.push(<B key="kerb" p={[xm, 0.08, AR + 0.15]} s={[L + 30, 0.16, 0.3]}><Flat c={WHITE2} /></B>);
  P.push(<B key="road" p={[xm, -0.02, AR + 4.6]} s={[L + 60, 0.04, 8.6]}><Tiles n="asphalt_02" u={30} v={4} tint="#34363d" /></B>);
  for (let k = -10; k < 12; k++) P.push(<B key={`ln${k}`} p={[k * 4, 0.005, AR + 4.6]} s={[2, 0.01, 0.14]}><Flat c="#ffffff" /></B>);
  P.push(<B key="pv" p={[xm, 0.08, AR + 10]} s={[L + 60, 0.16, 2.2]}><Tiles n="concrete_tiles" u={40} v={2} /></B>);
  P.push(<B key="gr" p={[xm, -0.06, -10]} s={[L + 80, 0.1, 60]}><Flat c={WHITE2} /></B>);
  // parked cars, trees, lamps, poles and wires, a stall, chairs and crates — all white model
  for (const [x, f] of [[-15, 0], [-7.5, 0], [6, 0], [13, 0]] as [number, number][]) P.push(<WhiteModel key={`car${x}`} src="car_b.glb" p={[x, 0, AR + 1.6]} r={Math.PI / 2 + f} s={1.0} />);
  for (const x of [-22, -13, 11, 20]) P.push(<WhiteModel key={`tr${x}`} src="island_tree_02/island_tree_02.gltf" p={[x, 0.16, AR + 10]} s={1.6} c={WHITE2} />);
  for (const x of [13]) P.push(<WhiteModel key={`lp${x}`} src="street_light.glb" p={[x, 0.16, AR + 9.4]} r={Math.PI} s={1.1} />);
  for (const x of [-26, 20]) P.push(<WhiteModel key={`tp${x}`} src="tele_pole.glb" p={[x, 0.16, AR + 0.5]} s={1.2} />);
  for (let w = 0; w < 3; w++) P.push(<Mesh3d key={`wi${w}`} transform={Transform.fromXyz(-3, 8.4 - w * 0.25, AR + 0.5).withRotation(Quat.fromEuler("XYZ", 0, 0, Math.PI / 2))}><Cylinder radius={0.018} half_height={30} /><Flat c="#8e877c" /></Mesh3d>);
  P.push(<Mesh3d key="umb" transform={Transform.fromXyz(-9.5, 2.5, AR + 9.6)} shape={so().umbrella}><Flat c={WHITE} /></Mesh3d>);
  P.push(<B key="stall" p={[-9.5, 0.6, AR + 9.6]} s={[1.8, 0.9, 1.0]}><Flat c={WHITE} /></B>);
  P.push(<Mesh3d key="pole" transform={Transform.fromXyz(-9.5, 1.4, AR + 9.6)}><Cylinder radius={0.03} half_height={1.2} /><Flat c={WHITE2} /></Mesh3d>);
  for (const [x, z, r] of [[-3.6, 0.8, 0.5], [-3.0, 1.2, -0.3], [-12.4, 0.9, 0.2], [9.8, 0.7, 0.8]] as [number, number, number][])
    P.push(<WhiteModel key={`ch${x}`} src="plastic_monobloc_chair_01/plastic_monobloc_chair_01.gltf" p={[x, 0.12, z]} r={r} />);
  for (let c = 0; c < 3; c++) P.push(<WhiteModel key={`cr${c}`} src="plastic_crate_01/plastic_crate_01.gltf" p={[-6.6, 0.12 + c * 0.29, 0.6]} r={c * 0.2} />);
  for (const x of [-14.6, -5.1, 9.4]) P.push(<WhiteModel key={`pp${x}`} src="potted_plant_02/potted_plant_02.gltf" p={[x, 0.12, AR - 0.55]} s={1.3} c={WHITE2} />);
  // the white city behind: real library buildings, repainted white, fading into the haze
  for (const [src, x, z, sc, r] of [["skyscraper_k.glb", -16, -75, 11, 0.3], ["skyscraper_k.glb", 22, -82, 12.5, 0], ["skyscraper_k.glb", -4, -95, 15, 0.6]] as [string, number, number, number, number][])
    P.push(<WhiteModel key={`bg${x}`} src={src} p={[x, 0, z]} r={r} s={sc} />);
  for (const [bx, bz, w, h] of [[-34, -60, 12, 24], [4, -64, 14, 30], [36, -58, 12, 20], [-52, -70, 12, 34], [50, -72, 12, 26]] as [number, number, number, number][]) {
    P.push(<B key={`blk${bx}`} p={[bx, h / 2, bz]} s={[w, h, 10]}><Plaster u={w / 3} v={h / 3} /></B>);
    for (let r = 0; r < Math.floor(h / 2.6); r++) {
      P.push(<B key={`bal${bx}${r}`} p={[bx, 1.6 + r * 2.6, bz + 5.15]} s={[w - 0.4, 0.14, 0.4]}><Flat c={WHITE2} /></B>);
      for (let c = 0; c < Math.floor(w / 1.6); c++) { const lit = ((r * 7 + c * 3 + bx) % 5) === 0;
        P.push(<B key={`cw${bx}${r}${c}`} p={[bx - w / 2 + 0.9 + c * 1.6, 2.6 + r * 2.6, bz + 5.02]} s={[0.8, 1.0, 0.05]}><Flat c={lit ? "#9fb7e8" : "#20222a"} e={lit ? glow("#8fb0ff", 0.5) : undefined} /></B>); }
    }
  }
  for (let k = 0; k < 0; k++) {
    const bx = [-34, -16, 4, 22, 36, -52, 50, -4][k % 8], bz = [-60, -75, -66, -82, -58, -70, -72, -95][k % 8];
    const wx = bx - 4 + ((k * 37) % 9), wy = 2 + ((k * 53) % 26), on = (k * 7) % 3 !== 0;
    if (on) P.push(<B key={`lw${k}`} p={[wx, wy, bz + 5.6]} s={[0.9, 0.6, 0.05]}><Flat c="#ffcf8a" e={glow("#ffb867", 1.4)} /></B>);
  }
  for (let c = 0; c < 4; c++) P.push(<WhiteModel key={`cr2${c}`} src="plastic_crate_01/plastic_crate_01.gltf" p={[-2.6 + (c % 2) * 0.45, 0.12 + Math.floor(c / 2) * 0.29, 1.2]} r={c * 0.3} />);
  P.push(<WhiteModel key="ht2" src="hand_truck/hand_truck.gltf" p={[4.2, 0.12, 1.4]} r={-0.6} />);
  P.push(<Model key="vs" src={S("parts/vespa.glb")} position={[-6.5, 0.12, 1.4]} rotation={[0, 1.2, 0]}><StandardMaterial base_color={WHITE2} /></Model>);
  // people hold poses (house rule): MPFB figures, faceless, charcoal clay
  for (const [src, x, z, r] of [["s_m30", 1.6, 1.3, Math.PI], ["s_f25", 3.0, 1.0, 2.6], ["s_m50", -9.0, AR + 9.0, 0.3], ["s_f35", -8.3, AR + 9.4, -2.4], ["s_m30", -4.2, 1.1, 0.9], ["s_f25", 10.8, AR + 9.6, -0.4]] as [string, number, number, number][])
    P.push(<Model key={`pp${src}${x}`} src={S(`people/${src}.glb`)} position={[x, 0.12, z]} rotation={[0, r, 0]}><StandardMaterial base_color="#55585f" perceptual_roughness={0.7} /></Model>);
  return <>{P}</>;
}

function Shot() {
  const f = useCurrentFrame();
  const coinX = DIY * W + W / 2 - 0.4, coinZ = AR + 0.9;
  return (
    <AbsoluteFill style={{ background: "#15171c" }}>
      <Camera3d transform={Transform.fromXyz(-17, 14, 23).lookingAt([0.4, 3.0, 0.4])} projection={{ Perspective: { fov: 0.6 } }}>
        <DepthOfField focal_distance={30} aperture_f_stops={9} />
      </Camera3d>
      <Environment src={S("sky.hdr")} intensity={0.25} rotation={2.6} />
      <AmbientLight brightness={22} color="#9fb4ff" />
      {/* low dusk sun from the west: long shadows of every pillar, car and tree across the white street */}
      <DirectionalLight color="#a9c0ff" transform={Transform.fromXyz(26, 16, -6).lookingAt([0, 0, 2])} illuminance={3800} shadow_maps_enabled soft_shadow_size={0.5} />
      <Shadows distance={70} firstCascade={25} mapSize={4096} bias={0.04} normalBias={1.5} />
      {/* Mr DIY's own light spills onto its five-foot way and the kerb */}
      <RectLight transform={Transform.fromXyz(DIY * W + W / 2, 2.6, 0.2).lookingAt([DIY * W + W / 2, 0, AR + 1])} intensity={140000} width={W - 0.8} height={2.4} color="#ffe2b8" range={16} />
      <PointLight transform={Transform.fromXyz(DIY * W + W / 2, 4.45, AR + 1.6)} intensity={160000} color="#ff7a5a" range={6} />
      <PointLight transform={Transform.fromXyz(DIY * W + W / 2, 3.4, -1.8)} intensity={1500000} color="#ffe2b8" range={10} shadow_maps_enabled />
      <PointLight transform={Transform.fromXyz(DIY * W + 1.0, 2.2, -3.2)} intensity={700000} color="#fff1dc" range={6} />
      <SpotLight transform={Transform.fromXyz(DIY * W + W / 2, 3.2, -1.0).lookingAt([DIY * W + W / 2, 0, AR + 5])} intensity={3000000} outer_angle={0.95} inner_angle={0.05} color="#ffd29a" range={22} shadow_maps_enabled />
      <Fog color="#15171c" near={50} far={150} />
      <Bloom intensity={1.0} threshold={0.85} />
      <AmbientOcclusion quality="high" />
      <ToneMapping mode="agx" exposure={0.6} />
      <Grade temperature={0.02} vignette={0.22} midtones={{ saturation: 1.05, contrast: 1.18, gamma: 1, gain: 1, lift: 0 }} />
      <Street />
      {UNITS.map((i) => <Unit key={i} i={i} />)}
      <Mesh3d name="coin" transform={Transform.fromXyz(coinX, 0.41, coinZ).withRotation(Quat.fromEuler("YXZ", -0.75, -0.1, 0))} shape={so().coin}>
        <StandardMaterial base_color="#d9a63a" metallic={1} perceptual_roughness={0.25} emissive={glow("#ffb347", 0.6)} /></Mesh3d>
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="street" component={Shot} width={1080} height={1920} fps={30} durationInFrames={1} />);
