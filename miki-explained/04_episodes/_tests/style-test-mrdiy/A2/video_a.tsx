// Style A test v3 · S1 still (WORKING-RULES §1 Style A): high three-quarter view over a dense WHITE model shophouse block
// at dusk; Mr DIY the one real-coloured shop; the coin (token) rolls on the five-foot way toward it.
// Models: Poly Haven (CC0), kit models (02_kit/models, credits.json). Textures: Poly Haven plaster, tiles, roof tiles.
import { AbsoluteFill, Composition, Easing, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { AmbientOcclusion, Bloom, DepthOfField, Environment, Fog, FogVolume, Grade, ImagePlane, Model, Text3D, ToneMapping, VolumetricFog, manifold, type Solid } from "raea/3d";
import { Cuboid, Cylinder, Mesh3d } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { AmbientLight, DirectionalLight, PointLight, RectLight, Shadows, SpotLight } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
import { Affine2 } from "raea/math";
import { LinearRgba, Srgba } from "raea/color";

const S = (p: string) => staticFile(p);
const FPS = 30;
const k = (t: number, a: number, b: number, e = Easing.inOut(Easing.cubic)) => interpolate(t, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
const L3 = (a: number[], b: number[], u: number): [number, number, number] => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];
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
  coin: manifold.cylinder(0.42, 0.13).move(0, 0, -0.065).minus(manifold.cylinder(0.34, 0.05).move(0, 0, 0.04)).minus(manifold.cylinder(0.34, 0.05).move(0, 0, -0.09)).union(manifold.cylinder(0.2, 0.11).move(0, 0, -0.055)).union(manifold.torus(0.27, 0.018).move(0, 0, 0.03)).union(manifold.torus(0.27, 0.018).move(0, 0, -0.03)),
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

// roller shutter from slats (parts/shutter.glb doesn't draw in raea): h = how much is rolled down from the lintel at y 2.95
function Shutter({ id, x, w, h, z, c }: { id: string; x: number; w: number; h: number; z: number; c: string }) {
  if (h < 0.02) return null;
  const P = [<B key={`${id}p`} p={[x, 2.95 - h / 2, z]} s={[w, h, 0.04]}><Flat c={c} r={0.5} /></B>];
  for (let r = 0; r < 20; r++) { const y = 2.95 - h + 0.07 + r * 0.14; if (y < 2.92) P.push(<B key={`${id}s${r}`} p={[x, y, z + 0.03]} s={[w, 0.03, 0.03]}><Flat c={c} r={0.35} /></B>); }
  return <>{P}</>;
}

function B({ p, s, children, rot }: { p: [number, number, number]; s: [number, number, number]; children: any; rot?: [number, number, number] }) {
  let t = Transform.fromXyz(...p); if (rot) t = t.withRotation(Quat.fromEuler("XYZ", ...rot));
  return <Mesh3d transform={t}><Cuboid half_size={[s[0] / 2, s[1] / 2, s[2] / 2]} />{children}</Mesh3d>;
}

// one shophouse = a modelled unit (shophouse.py: A arched / B two wide windows / C pediment), its materials re-covered
// here: charcoal clay with plaster relief; Mr DIY's in brand colours. Signboard, shutters, stock and lights stay in raea.
const VAR = (i: number) => ["A", "B", "C", "B", "A", "C", "A", "B", "C", "A"][((i % 10) + 10) % 10];
function Unit({ i, t: TNOW }: { i: number; t: number }) {
  const x0 = i * W, cx = x0 + W / 2, diy = i === DIY, spd = i === SPD;
  const src = diy ? "parts/shophouse_A_open.glb" : `parts/shophouse_${VAR(i)}.glb`;
  const right = i === DIY + 1;
  const tint = ["#3b3d44", "#36383f", "#40414a", "#393b43"][((i % 4) + 4) % 4];
  const P: any[] = [];
  P.push(<Model key="sh" src={S(src)} position={[cx, 0, 0]}>
    <StandardMaterial material="wall" base_color={diy ? "#a86a00" : tint} normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} metallic_roughness_texture={S("tex/grey_plaster_rough_1k.jpg")} perceptual_roughness={1} uv_transform={Affine2.fromScale([2.4, 2.4])} />
    <StandardMaterial material="trim" base_color={diy ? "#fff3cf" : "#4a4c54"} perceptual_roughness={0.75} />
    <StandardMaterial material="shutter" base_color={diy ? "#2f7a4a" : "#2c2e34"} perceptual_roughness={0.6} />
    <StandardMaterial material="tile" base_color={tint} normal_map_texture={S("tex/clay_roof_tiles_02_nor_gl_1k.jpg")} perceptual_roughness={0.85} />
    <StandardMaterial material="floor" base_color={diy ? "#c9a77a" : "#45474e"} normal_map_texture={S("tex/concrete_tiles_nor_gl_1k.jpg")} perceptual_roughness={0.8} />
    <StandardMaterial material="party" base_color="#2b2d33" perceptual_roughness={0.8} />
    <StandardMaterial material="dark" base_color={diy ? "#ffd9a0" : "#15161a"} emissive={diy ? glow("#ffc070", 1.2) : undefined} />
  </Model>);
  // signboard on the façade over the arcade
  P.push(<B key="sg" p={[cx, 4.05, 2.32]} s={[W - 0.5, 0.62, 0.1]}>
    <Flat c={diy ? "#d92128" : spd ? "#2c2e34" : ["#2a2c33", "#33302d", "#2a313c"][((i % 3) + 3) % 3]} r={0.45} e={diy ? glow("#ff2a2a", 2.6) : undefined} /></B>);
  if (diy) P.push(<ImagePlane key="lg" src={S("mrdiy_logo.png")} width={W - 0.8} position={[cx, 4.05, 2.38]} />);
  if (spd) P.push(<ImagePlane key="lg" src={S("99_grey.png")} width={2.4} position={[cx, 4.05, 2.38]} />);
  if (diy) {
    const up = k(TNOW, 0.5, 1.5);
    // stock is wheeled out onto the five-foot way once the shutter is up (on "cheap")
    const out = (a: number) => -1.7 * (1 - k(TNOW, a, a + 0.7, Easing.out(Easing.cubic)));
    const oR = out(1.4), oH = out(1.6), oC = out(1.8);
    const GC = ["#e3262b", "#ffd400", "#2f6fd6", "#3bb273", "#f28c28", "#ffffff", "#7a4fd1"];
    for (const sx of [x0 + 1.0, x0 + 2.3, x0 + 3.6]) P.push(<Model key={`shv${sx}`} src={S("parts/shelves.glb")} position={[sx, 0.15, -2.6]} scale={[0.75, 0.9, 0.75]} />);
    for (let r = 0; r < 4; r++) for (let j = 0; j < 12; j++) P.push(<B key={`bw${r}${j}`} p={[x0 + 0.55 + j * 0.32, 0.45 + r * 0.7, -4.1]} s={[0.25, 0.42, 0.28]}><Flat c={GC[(r * 5 + j) % GC.length]} r={0.5} /></B>);
    for (const [rx] of [[x0 + 1.2], [x0 + 3.4]] as [number][]) {
      P.push(<B key={`rk${rx}`} p={[rx, 0.95, 0.75 + oR]} s={[1.1, 1.6, 0.4]}><Flat c="#2a2c31" r={0.5} /></B>);
      for (let lv = 0; lv < 4; lv++) for (let j = 0; j < 5; j++) P.push(<B key={`rg${rx}${lv}${j}`} p={[rx - 0.44 + j * 0.22, 0.35 + lv * 0.38, 0.98 + oR]} s={[0.18, 0.28, 0.1]}><Flat c={GC[(lv * 3 + j + (rx > x0 + 2 ? 2 : 0)) % GC.length]} r={0.45} /></B>);
    }
    for (const [m, x, z, r, sc] of [["watering_can_metal_01", x0 + 1.0, 1.75, 0.4, 1.6], ["metal_toolbox", x0 + 1.7, 1.8, -0.3, 1.4], ["plastic_container", x0 + 2.4, 1.85, 0.2, 0.7], ["spray_paint_bottles", x0 + 3.1, 1.85, 0.6, 1.5], ["Drill_01", x0 + 3.8, 1.8, 1.2, 1.6], ["cardboard_box_01", x0 + 4.1, 1.3, 0.3, 1.2]] as [string, number, number, number, number][])
      P.push(<Model key={`hw${m}`} src={S(`${m}/${m}.gltf`)} position={[x, 0.15, z + oH]} rotation={[0, r, 0]} scale={[sc, sc, sc]} />);
    for (let c = 0; c < 6; c++) P.push(<Model key={`pc${c}`} src={S("plastic_crate_01/plastic_crate_01.gltf")} position={[x0 + 4.0 - (c % 2) * 0.5, 0.15 + Math.floor(c / 2) * 0.29, 0.5 + oC]} rotation={[0, 0.1 * c, 0]}><StandardMaterial base_color={["#2f6fd6", "#e3262b", "#3bb273"][c % 3]} /></Model>);
    P.push(<Shutter key="dshut" id="dsh" x={cx} w={W - 0.9} h={2.8 * (1 - up)} z={0.3} c="#5a5d66" />);
    for (let t = 0; t < 3; t++) { const on = k(TNOW, 1.2 + t * 0.15, 1.3 + t * 0.15, Easing.linear);
      P.push(<B key={`tube${t}`} p={[cx, 3.4, -0.6 - t * 1.3]} s={[2.6, 0.05, 0.1]}><Flat c="#ffffff" e={glow("#f2f8ff", 0.2 + 9 * on)} /></B>); }
    for (let b = 0; b < 5; b++) P.push(<B key={`bk${b}`} p={[x0 + 0.75, 0.21 + b * 0.12, 1.2 + oC]} s={[0.45, 0.11, 0.32]}><Flat c="#e3262b" r={0.45} /></B>);
  } else {
    P.push(<Shutter key="shut" id={`sh${i}`} x={cx} w={W - 0.9} h={spd ? 1.55 : 2.8} z={0.3} c={spd ? "#4e5058" : "#3e4047"} />);
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
  for (let w = 0; w < 0; w++) P.push(<Mesh3d key={`wi${w}`} transform={Transform.fromXyz(-3, 8.4 - w * 0.25, AR + 0.5).withRotation(Quat.fromEuler("XYZ", 0, 0, Math.PI / 2))}><Cylinder radius={0.018} half_height={30} /><Flat c="#8e877c" /></Mesh3d>);
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
        P.push(<B key={`cw${bx}${r}${c}`} p={[bx - w / 2 + 0.9 + c * 1.6, 2.6 + r * 2.6, bz + 5.02]} s={[0.8, 1.0, 0.05]}><Flat c={lit ? "#6f82aa" : "#20222a"} e={lit ? glow("#8fb0ff", 0.18) : undefined} /></B>); }
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
  P.push(<Model key="vsp" src={S("parts/vespa.glb")} position={[-1.6, 0.0, AR + 1.3]} rotation={[0, 1.3, 0]}><StandardMaterial base_color={WHITE2} /></Model>);
  // people hold poses (house rule): MPFB figures, faceless, charcoal clay
  for (const [src, x, z, r] of [["s_m30", 0.7, 2.6, 2.4], ["s_f25", 3.9, 1.6, -2.6], ["s_m50", -9.0, AR + 9.0, 0.3], ["s_f35", -8.3, AR + 9.4, -2.4], ["s_m30", -4.2, 1.1, 0.9], ["s_f25", 10.8, AR + 9.6, -0.4]] as [string, number, number, number][])
    P.push(<Model key={`pp${src}${x}`} src={S(`people/${src}.glb`)} position={[x, 0.12, z]} rotation={[0, r, 0]}><StandardMaterial base_color="#55585f" perceptual_roughness={0.7} /></Model>);
  return <>{P}</>;
}

// ---------- S3 set: the till drawers, away from the street (x = 60; at x = 200 frames rendered black) ----------
const DX = 60;
function Drawers({ t }: { t: number }) {
  const P: any[] = [];
  P.push(<B key="ctr" p={[DX + 0.9, 0.9, -0.7]} s={[4.6, 0.1, 3.8]}><Tiles n="concrete_tiles" u={3} v={2} tint="#3a3c43" /></B>);
  const drawer = (x: number, zz: number, warm: boolean, n: number, t0: number, label: string, name: string) => {
    const g: any[] = [];
    g.push(<B key={`${name}b`} p={[x, 1.05, zz]} s={[1.5, 0.22, 1.1]}><Flat c={warm ? "#2a2c31" : "#24262c"} /></B>);
    g.push(<B key={`${name}in`} p={[x, 1.165, zz]} s={[1.36, 0.02, 0.96]}><Flat c={warm ? "#ffd9a0" : "#3a4258"} e={warm ? glow("#ffbf6a", 1.1) : glow("#7f9cff", 0.12)} /></B>);
    for (const dx of [-0.34, 0.34]) g.push(<B key={`${name}d${dx}`} p={[x + dx, 1.2, zz]} s={[0.03, 0.08, 0.96]}><Flat c="#1b1c20" /></B>);
    g.push(<B key={`${name}fr`} p={[x, 1.05, zz + 0.58]} s={[1.5, 0.26, 0.06]}><Flat c={warm ? "#d92128" : "#3c3f47"} e={warm ? glow("#ff3a2a", 0.6) : undefined} /></B>);
    g.push(<Mesh3d key={`${name}lb`} transform={Transform.fromXyz(x, 1.05, zz + 0.62)}><Text3D size={0.11} depth={0.01}>{label}</Text3D><Flat c={warm ? "#ffe600" : "#b9bcc4"} e={warm ? glow("#ffe600", 1.4) : undefined} /></Mesh3d>);
    for (let i = 0; i < n; i++) { const u = k(t, t0 + i * 0.09, t0 + i * 0.09 + 0.18, Easing.out(Easing.quad));
      if (u > 0) g.push(<Mesh3d key={`${name}c${i}`} transform={Transform.fromXyz(x + 0.2, lerp(2.2, 1.2 + i * 0.035, u), zz - 0.05).withRotation(Quat.fromEuler("XYZ", 0, i, 0))}><Cylinder radius={0.11} half_height={0.016} /><StandardMaterial base_color="#c9cbd1" metallic={1} perceptual_roughness={0.3} /></Mesh3d>); }
    return g;
  };
  P.push(...drawer(DX, 0, true, 11, 20.6, "MR DIY  11 SEN", "a"));
  const sl = k(t, 22.45, 22.95, Easing.out(Easing.cubic));
  P.push(...drawer(DX + lerp(4.5, 0, sl), -1.45, false, 5, 24.05, "99 SPEEDMART  5 SEN", "b"));
  return <>{P}</>;
}

function Shot() {
  const f = useCurrentFrame(), t = f / FPS;
  const lit = Math.max(0.04, k(t, 1.1, 1.9));
  // timed to the voice (EX29 audio, words.json): L01 0.3 s · L03 7.05 s · L04 17.01 s
  const s1 = t < 7.05, s2 = t >= 7.05 && t < 17.01, s3 = t >= 17.01;
  const doorX = DIY * W + W / 2;
  // the coin: S1 rolls along the five-foot way to the door and through it; S2 rolls down the aisle and drops; S3 falls into the drawer
  let coin: [number, number, number] = [0, 0, 0], roll = 0, yaw = -Math.PI / 2, tilt = 0;
  if (s1) { const u = k(t, 0, 6.6, Easing.inOut(Easing.quad)); const x = lerp(-9.5, doorX, Math.min(1, u * 1.25)); const z = u < 0.8 ? AR + 0.75 : lerp(AR + 0.75, 0.6, (u - 0.8) / 0.2);
    coin = [x, 0.57, z]; roll = -x / 0.48; yaw = u < 0.8 ? 0 : -Math.PI / 2 * ((u - 0.8) / 0.2); }
  if (s2) { const u = k(t, 7.05, 16.4, Easing.inOut(Easing.quad)); coin = [doorX - 0.35, 0.72, lerp(0.6, -1.5, u)]; roll = lerp(0, 9, u); yaw = -Math.PI / 2;
    const d = k(t, 16.4, 16.9, Easing.in(Easing.quad)); coin = [doorX - 0.35, lerp(0.72, -0.8, d), -1.5]; tilt = d * 1.2; }
  if (s3) { const d = k(t, 17.01, 17.5, Easing.out(Easing.cubic)); coin = [DX - 0.5, lerp(2.4, 1.2, d), -0.05]; yaw = 0; roll = 0; tilt = Math.PI / 2 * d; }
  // camera per shot
  let cam: [number, number, number], look: [number, number, number], focus = 20;
  if (s1) { const u = k(t, 0, 7.05); cam = L3([-8.6, 15.5, 16.5], [doorX - 2.5, 4.2, 8.5], u); look = L3([1.0, 2.2, 1.6], [doorX, 1.3, 0.0], u); focus = lerp(21, 9, u); }
  else if (s2) { const u = k(t, 7.05, 17.01); cam = L3([doorX + 2.0, 3.4, 1.6], [doorX + 1.5, 2.8, 0.4], u); look = L3([doorX + 0.2, 0.5, -1.6], [doorX + 0.1, 0.3, -2.6], u); focus = lerp(4.1, 3.6, u);
    }
  else { const u = k(t, 17.01, 22.2), v = k(t, 22.3, 23.2); cam = L3(L3([DX - 0.25, 3.5, 3.25], [DX - 0.1, 3.2, 3.1], u), [DX + 0.3, 5.0, 3.2], v); /* stay > 3 m from the drawer light: inside its range the frame renders black */ look = L3([DX, 1.1, 0.05], [DX, 1.0, -0.65], v); focus = lerp(2.9, 4.6, v); }
  // the carton and the own-brand stamp (S2)
  const cartonIn = k(t, 7.3, 7.9, Easing.out(Easing.cubic)), stamp = k(t, 13.75, 14.0, Easing.in(Easing.quad)) - k(t, 14.1, 14.45), label = k(t, 13.95, 14.05, Easing.linear);
  return (
    <AbsoluteFill style={{ background: "#14161c" }}>
      <Camera3d transform={Transform.fromXyz(...cam).lookingAt(look)} projection={{ Perspective: { fov: s1 ? 0.62 : 0.75 } }}>
        <DepthOfField focal_distance={focus} aperture_f_stops={s1 ? 7 : 4} />
      </Camera3d>
      <Environment src={S("sky.hdr")} intensity={0.12} rotation={2.6} />
      <AmbientLight brightness={14} color="#8ea4dc" />
      <DirectionalLight color="#a7bdff" transform={Transform.fromXyz(-22, 18, 6).lookingAt([0, 0, 0])} illuminance={3000} shadow_maps_enabled soft_shadow_size={1.2} />
      <Shadows distance={45} firstCascade={14} mapSize={4096} bias={0.04} normalBias={1.5} />
      <RectLight transform={Transform.fromXyz(doorX, 3.3, -1.6).lookingAt([doorX, 0, -1.2])} intensity={260000 * lit * (s2 ? 0.4 : 1)} width={3.4} height={3.0} color="#ffe9cc" range={8} />
      <PointLight transform={Transform.fromXyz(doorX, 2.6, -2.4)} intensity={900000 * lit * (s2 ? 0.4 : 1)} color="#ffe3bd" range={8} shadow_maps_enabled soft_shadows_enabled radius={0.6} />
      <SpotLight transform={Transform.fromXyz(doorX, 3.0, -0.4).lookingAt([doorX, 0, AR + 3.5])} intensity={3200000 * lit} outer_angle={1.3} inner_angle={0.02} color="#ffcf92" range={18} shadow_maps_enabled soft_shadows_enabled radius={1.2} volumetric />
      <PointLight transform={Transform.fromXyz(doorX, 4.0, AR + 0.9)} intensity={420000} color="#ff4a3a" range={4.5} />
      <PointLight transform={Transform.fromXyz(SPD * W + W / 2, 1.2, -0.8)} intensity={260000} color="#8fb0ff" range={6} />
      <PointLight transform={Transform.fromXyz(13, 6.5, AR + 9.4)} intensity={700000} color="#cfe0ff" range={14} />
      {/* S3 drawer light: warm from Mr DIY's drawer, cool key over the counter */}
      <PointLight transform={Transform.fromXyz(DX, 2.0, 0.2)} intensity={300000} color="#ffcf8a" range={3} />
      <SpotLight transform={Transform.fromXyz(DX + 0.8, 4.5, 1.5).lookingAt([DX + 0.8, 1, 0])} intensity={900000} outer_angle={0.6} inner_angle={0.2} color="#b9c9ff" range={8} shadow_maps_enabled />
      <VolumetricFog ambient={0.02} ambientColor="#2a3550" />
      <FogVolume name="haze" position={[2, 2.5, AR + 2]} scale={[30, 5, 12]} density={0.035} color="#c9d4ff" scattering={0.6} anisotropy={0.6} falloff={0.6} />
      <Fog color="#14161c" near={40} far={120} />
      <Bloom intensity={0.9} threshold={0.9} />
      <AmbientOcclusion quality="high" />
      <ToneMapping mode="agx" exposure={0.55} />
      <Grade temperature={0.0} vignette={0.3} midtones={{ saturation: 1.05, contrast: 1.12, gamma: 1, gain: 1, lift: 0 }} />
      <Street />
      {UNITS.map((i) => <Unit key={i} i={i} t={t} />)}
      {/* S2: carton slides in on the hand truck line, the stamp drops OWN BRAND on it */}
      <B p={[lerp(doorX + 2.6, doorX + 0.5, cartonIn), 0.45, -1.8]} s={[0.6, 0.5, 0.5]}><StandardMaterial base_color="#c9a26a" perceptual_roughness={0.8} /></B>
      <B p={[doorX + 0.5, lerp(2.4, 0.86, Math.max(0, stamp)), -1.8]} s={[0.3, 0.2, 0.3]}><Flat c="#d92128" r={0.4} /></B>
      <Mesh3d transform={Transform.fromXyz(doorX + 0.5, 0.705, -1.8).withRotation(Quat.fromEuler("XYZ", -Math.PI / 2, 0, 0)).withScale([label, label, label])}><Text3D size={0.09} depth={0.004}>OWN BRAND</Text3D><Flat c="#d92128" e={glow("#ff3a2a", 0.4)} /></Mesh3d>
      <Drawers t={t} />
      <Mesh3d name="coin" transform={Transform.fromXyz(...coin).withRotation(Quat.fromEuler("YXZ", yaw, tilt, roll)).withScale([s3 ? 0.55 : 1.15, s3 ? 0.55 : 1.15, s3 ? 0.55 : 1.15])} shape={so().coin}>
        <StandardMaterial base_color="#e3b04a" metallic={1} perceptual_roughness={0.22} emissive={glow("#ffb347", 0.25)} /></Mesh3d>
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="ex29a" component={Shot} width={1080} height={1920} fps={FPS} durationInFrames={780} />);
