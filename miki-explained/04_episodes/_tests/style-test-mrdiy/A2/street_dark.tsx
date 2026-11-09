// Style A test v3 · S1 still (WORKING-RULES §1 Style A): high three-quarter view over a dense WHITE model shophouse block
// at dusk; Mr DIY the one real-coloured shop; the coin (token) rolls on the five-foot way toward it.
// Models: Poly Haven (CC0), kit models (02_kit/models, credits.json). Textures: Poly Haven plaster, tiles, roof tiles.
import { AbsoluteFill, Composition, registerRoot, staticFile, useCurrentFrame } from "raea";
import { AmbientOcclusion, Bloom, DepthOfField, Environment, Fog, Grade, ImagePlane, Model, ToneMapping, manifold, type Solid } from "raea/3d";
import { Cuboid, Cylinder, Mesh3d } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { AmbientLight, DirectionalLight, PointLight, RectLight, Shadows } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
import { Affine2 } from "raea/math";
import { LinearRgba, Srgba } from "raea/color";

const S = (p: string) => staticFile(p);
const glow = (hex: string, k: number) => LinearRgba.from(Srgba.hex(hex)).mul(k);
const W = 4.6;                                  // shophouse width
const UNITS = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4];
const DIY = 0, SPD = -2;
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
  coin: manifold.cylinder(0.62, 0.12).move(0, 0, -0.06).minus(manifold.cylinder(0.48, 0.08).move(0, 0, 0.03)),
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

// louvred window: frame, two shutter leaves of slats, a hood moulding, a sill
function Window({ x, y, z, diy }: { x: number; y: number; z: number; diy: boolean }) {
  const frame = diy ? "#f7f2e4" : WHITE2, leaf = diy ? "#3f8f5a" : WHITE;
  const warm = diy || Math.abs(Math.sin(x * 3.7)) > 0.8;
  const out: any[] = [<B key="fr" p={[x, y, z]} s={[0.95, 1.55, 0.12]}><Flat c={frame} e={warm ? glow("#ffb867", 0.9) : undefined} /></B>,
    <B key="hd" p={[x, y + 0.9, z + 0.08]} s={[1.2, 0.14, 0.28]}><Flat c={frame} /></B>,
    <B key="sl" p={[x, y - 0.84, z + 0.08]} s={[1.1, 0.08, 0.24]}><Flat c={frame} /></B>];
  for (const side of [-1, 1]) for (let k = 0; k < 9; k++)
    out.push(<B key={`s${side}${k}`} p={[x + side * 0.22, y - 0.62 + k * 0.155, z + 0.09]} s={[0.4, 0.1, 0.03]} rot={[-0.5, 0, 0]}><Flat c={leaf} r={0.6} /></B>);
  return <>{out}</>;
}

function Unit({ i }: { i: number }) {
  const x0 = i * W, cx = x0 + W / 2, diy = i === DIY, spd = i === SPD;
  const wall = diy ? "#f4e7c1" : WHITE;
  const P: any[] = [];
  P.push(<B key="body" p={[cx, 5.6, -5]} s={[W, 3.2, 14.4]}><Plaster u={2} v={1} tint={wall} /></B>);           // upper floor (overhangs the way)
  P.push(diy ? <B key="gw" p={[cx, 2.0, -7.95]} s={[W, 4.0, 7.9]}><Plaster u={2} v={1} tint={WHITE2} /></B> : <B key="gw" p={[cx, 2.0, -5.9]} s={[W, 4.0, 12]}><Plaster u={2} v={1} tint={WHITE2} /></B>);           // ground floor behind the way
  P.push(<B key="cor" p={[cx, 7.3, AR + 0.08]} s={[W, 0.22, 0.4]}><Flat c={diy ? "#fbf3dc" : WHITE} /></B>);   // cornice
  P.push(<B key="par" p={[cx, 7.8, AR - 0.05]} s={[W, 0.8, 0.25]}><Plaster u={2} v={0.4} tint={wall} /></B>);  // parapet
  P.push(<Mesh3d key="gab" transform={Transform.fromXyz(cx, 8.2, AR - 0.05)} shape={(i % 2 ? so().gableRound : so().gableStep)}><Plaster u={1} v={0.5} tint={wall} /></Mesh3d>);
  // pitched roof behind the parapet (two slopes, white roof tiles)
  P.push(<B key="r1" p={[cx, 8.4, -1.4]} s={[W, 0.12, 7.2]} rot={[0.38, 0, 0]}><Roof u={2} v={3} /></B>);
  P.push(<B key="r2" p={[cx, 8.4, -8.4]} s={[W, 0.12, 7.2]} rot={[-0.38, 0, 0]}><Roof u={2} v={3} /></B>);
  // signboard band above the five-foot way
  P.push(<B key="sg" p={[cx, 4.45, AR + 0.12]} s={[W - 0.3, 0.8, 0.12]}>
    <Flat c={diy ? "#d92128" : spd ? "#e4dfd6" : WHITE} r={0.45} e={diy ? glow("#ff2a2a", 1.1) : undefined} /></B>);
  if (diy) P.push(<ImagePlane key="lg" src={S("mrdiy_logo.png")} width={W - 0.6} position={[cx, 4.45, AR + 0.19]} />);
  if (spd) P.push(<ImagePlane key="lg" src={S("99_grey.png")} width={2.6} position={[cx, 4.45, AR + 0.19]} />);
  // windows and pilasters on the upper façade
  for (let k = 0; k < 3; k++) P.push(<Window key={`w${k}`} x={x0 + 0.85 + k * 1.45} y={5.85} z={AR + 0.02} diy={diy} />);
  for (let k = 0; k < 4; k++) P.push(<B key={`pi${k}`} p={[x0 + 0.12 + k * 1.45, 5.85, AR + 0.05]} s={[0.16, 2.6, 0.12]}><Flat c={diy ? "#fbf3dc" : WHITE2} /></B>);
  // arcade: pillar at the unit's left edge, arch to the next, the five-foot way floor
  P.push(<Mesh3d key="pl" transform={Transform.fromXyz(x0, 1.6, AR - 0.2)} shape={so().pillar}><Plaster u={0.3} v={1.4} tint={diy ? "#ffd400" : WHITE} /></Mesh3d>);
  P.push(<Mesh3d key="pc" transform={Transform.fromXyz(x0, 3.25, AR - 0.2)} shape={so().cap}><Flat c={diy ? "#ffd400" : WHITE} /></Mesh3d>);
  P.push(<Mesh3d key="ar" transform={Transform.fromXyz(cx, 3.6, AR - 0.2)} shape={so().arch}><Plaster u={2} v={0.4} tint={wall} /></Mesh3d>);
  P.push(<B key="fl" p={[cx, 0.06, AR / 2]} s={[W, 0.12, AR]}><Tiles n={diy ? "brown_floor_tiles" : "concrete_tiles"} u={W / 0.9} v={AR / 0.9} tint={diy ? "#ffffff" : WHITE} real={diy} /></B>);
  // shopfront: Mr DIY open and lit; the others behind white roller shutters
  if (diy) {
    P.push(<B key="in" p={[cx, 1.8, -3.95]} s={[W - 0.2, 3.6, 0.2]}><Flat c="#fff2d6" e={glow("#ffe7bf", 1.6)} /></B>);
    for (const sx of [x0 + 1.2, x0 + 3.4]) {
      P.push(<Model key={`shv${sx}`} src={S("parts/shelves.glb")} position={[sx, 0.12, -2.7]} scale={[0.9, 0.9, 0.9]} />);
      for (let lv = 0; lv < 3; lv++) for (let j = 0; j < 4; j++) P.push(<B key={`pk${sx}${lv}${j}`} p={[sx - 0.45 + j * 0.3, 0.42 + lv * 0.68, -2.55]} s={[0.24, 0.3, 0.3]}><Flat c={["#e3262b", "#ffd400", "#2f6fd6", "#3bb273", "#f28c28", "#ffffff"][(lv * 4 + j + (sx > x0 + 2 ? 3 : 0)) % 6]} r={0.5} /></B>);
    }
    for (let b = 0; b < 5; b++) P.push(<B key={`bk${b}`} p={[x0 + 0.7, 0.2 + b * 0.12, 0.9]} s={[0.45, 0.11, 0.32]}><Flat c="#e3262b" r={0.45} /></B>);
  } else {
    P.push(<WhiteModel key="sh" src="parts/shutter.glb" p={[cx, 0.12, -0.1]} s={[(W - 0.6) / 1.08, 1.3, 0.6]} />);
  }
  // aircon units on some façades, a water tank on some roofs
  if ((i + 7) % 3 === 0) P.push(<WhiteModel key="ac" src="exterior_aircon_unit/exterior_aircon_unit.gltf" p={[x1(x0) - 0.55, 6.3, AR + 0.25]} s={1.0} />);
  if ((i + 9) % 4 === 0) { P.push(<Mesh3d key="tk" transform={Transform.fromXyz(cx + 1, 9.6, -6)} shape={so().tank}><Flat c={WHITE} /></Mesh3d>); }
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
  for (const x of [-22, -13, 11, 20]) P.push(<WhiteModel key={`tr${x}`} src="island_tree_02/island_tree_02.gltf" p={[x, 0.16, AR + 10]} s={1.6} c="#eeeae3" />);
  for (const x of [-12, 13]) P.push(<WhiteModel key={`lp${x}`} src="street_light.glb" p={[x, 0.16, AR + 9.4]} r={Math.PI} s={1.1} />);
  for (const x of [-26, 20]) P.push(<WhiteModel key={`tp${x}`} src="tele_pole.glb" p={[x, 0.16, AR + 0.5]} s={1.2} />);
  for (let w = 0; w < 3; w++) P.push(<Mesh3d key={`wi${w}`} transform={Transform.fromXyz(-3, 8.4 - w * 0.25, AR + 0.5).withRotation(Quat.fromEuler("XYZ", 0, 0, Math.PI / 2))}><Cylinder radius={0.018} half_height={30} /><Flat c="#8e877c" /></Mesh3d>);
  P.push(<Mesh3d key="umb" transform={Transform.fromXyz(-9.5, 2.5, AR + 9.6)} shape={so().umbrella}><Flat c={WHITE} /></Mesh3d>);
  P.push(<B key="stall" p={[-9.5, 0.6, AR + 9.6]} s={[1.8, 0.9, 1.0]}><Flat c={WHITE} /></B>);
  P.push(<Mesh3d key="pole" transform={Transform.fromXyz(-9.5, 1.4, AR + 9.6)}><Cylinder radius={0.03} half_height={1.2} /><Flat c={WHITE2} /></Mesh3d>);
  for (const [x, z, r] of [[-3.6, 0.8, 0.5], [-3.0, 1.2, -0.3], [-12.4, 0.9, 0.2], [9.8, 0.7, 0.8]] as [number, number, number][])
    P.push(<WhiteModel key={`ch${x}`} src="plastic_monobloc_chair_01/plastic_monobloc_chair_01.gltf" p={[x, 0.12, z]} r={r} />);
  for (let c = 0; c < 3; c++) P.push(<WhiteModel key={`cr${c}`} src="plastic_crate_01/plastic_crate_01.gltf" p={[-6.6, 0.12 + c * 0.29, 0.6]} r={c * 0.2} />);
  for (const x of [-14.6, -5.1, 9.4]) P.push(<WhiteModel key={`pp${x}`} src="potted_plant_02/potted_plant_02.gltf" p={[x, 0.12, AR - 0.55]} s={1.3} c="#e9e5dc" />);
  // the white city behind: real library buildings, repainted white, fading into the haze
  for (const [src, x, z, sc, r] of [["apartment.glb", -34, -60, 1.3, 0], ["skyscraper_k.glb", -16, -75, 11, 0.3], ["apartment.glb", 4, -66, 1.2, Math.PI], ["skyscraper_k.glb", 22, -82, 12.5, 0], ["brown_bldg.glb", 36, -58, 2.0, 0], ["kenney_big.glb", -52, -70, 2.2, 0], ["apartment.glb", 50, -72, 1.4, 0.4], ["skyscraper_k.glb", -4, -95, 15, 0.6]] as [string, number, number, number, number][])
    P.push(<WhiteModel key={`bg${x}`} src={src} p={[x, 0, z]} r={r} s={sc} />);
  return <>{P}</>;
}

function Shot() {
  const f = useCurrentFrame();
  const coinX = -2.6, coinZ = 3.0;
  return (
    <AbsoluteFill style={{ background: "#15171c" }}>
      <Camera3d transform={Transform.fromXyz(-14, 17.5, 35).lookingAt([0.4, 3.6, 0.6])} projection={{ Perspective: { fov: 0.62 } }}>
        <DepthOfField focal_distance={40} aperture_f_stops={9} />
      </Camera3d>
      <Environment src={S("sky.hdr")} intensity={0.25} rotation={2.6} />
      <AmbientLight brightness={10} color="#9fb4ff" />
      {/* low dusk sun from the west: long shadows of every pillar, car and tree across the white street */}
      <DirectionalLight color="#c9d6ff" transform={Transform.fromXyz(-30, 14, 16).lookingAt([0, 0, 0])} illuminance={2600} shadow_maps_enabled soft_shadow_size={0.5} />
      <Shadows distance={70} firstCascade={25} mapSize={4096} bias={0.04} normalBias={1.5} />
      {/* Mr DIY's own light spills onto its five-foot way and the kerb */}
      <RectLight transform={Transform.fromXyz(DIY * W + W / 2, 2.6, 0.2).lookingAt([DIY * W + W / 2, 0, AR + 1])} intensity={140000} width={W - 0.8} height={2.4} color="#ffe2b8" range={16} />
      <PointLight transform={Transform.fromXyz(DIY * W + W / 2, 4.45, AR + 1.6)} intensity={160000} color="#ff7a5a" range={6} />
      <Fog color="#15171c" near={50} far={150} />
      <Bloom intensity={0.6} threshold={0.95} />
      <AmbientOcclusion quality="high" />
      <ToneMapping mode="agx" exposure={0.6} />
      <Grade temperature={0.02} vignette={0.22} midtones={{ saturation: 1.05, contrast: 1.18, gamma: 1, gain: 1, lift: 0 }} />
      <Street />
      {UNITS.map((i) => <Unit key={i} i={i} />)}
      <Mesh3d name="coin" transform={Transform.fromXyz(coinX, 0.64, coinZ).withRotation(Quat.fromEuler("YXZ", -0.25, 0.12, f * 0.2))} shape={so().coin}>
        <StandardMaterial base_color="#d9a63a" metallic={1} perceptual_roughness={0.25} emissive={glow("#ffb347", 0.15)} /></Mesh3d>
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="street" component={Shot} width={1080} height={1920} fps={30} durationInFrames={1} />);
