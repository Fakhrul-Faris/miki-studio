// EX31 Grab's cut — Style A (WORKING-RULES §1; from the EX29 baseline, _tests/style-test-mrdiy/A2/video_a.tsx).
// The dark model world; the one real-coloured subject is the Grab car; the token is the fare (a drawn RM20 note) that
// gets cut. Timed to audio/vo_timeline.json. Street world, materials and props: EX29 (Poly Haven CC0, kit models).
import { AbsoluteFill, Composition, Easing, Img, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { AmbientOcclusion, Bloom, DepthOfField, Environment, Fog, FogVolume, Grade, ImagePlane, Model, Text3D, ToneMapping, VolumetricFog, manifold, type Solid } from "raea/3d";
import { Cuboid, Cylinder, Mesh3d } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { AmbientLight, DirectionalLight, PointLight, RectLight, Shadows, SpotLight } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
import { Affine2 } from "raea/math";
import { LinearRgba, Srgba } from "raea/color";
import CAPS from "./caps.json";
import PATHS from "./paths.json";   // vehicle paths, written and collision-checked by paths.py (never edit by hand)
import { Captions, type CapBlock } from "../../../tools/raea/kit/Captions";

const S = (p: string) => staticFile(p);
const FPS = 60;                                 // 60 fps from 2026-11-11 (EX35 rule)
const k = (t: number, a: number, b: number, e = Easing.inOut(Easing.cubic)) => interpolate(t, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
const L3 = (a: number[], b: number[], u: number): [number, number, number] => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];
const glow = (hex: string, k: number) => LinearRgba.from(Srgba.hex(hex)).mul(k);
const W = 4.6;                                  // shophouse width
const UNITS = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
const DIY = 99, SPD = 99;                       // no featured shop on this street (EX31: the Grab car is the subject)
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
  // the token: reeded edge (120 ridges), raised rim, raised flower + ring of dots on both faces; axis along z
  coin: (() => {
    const R = 0.42, T = 0.13, cut: Solid[] = [];
    for (let i = 0; i < 120; i++) cut.push(manifold.box(0.009, 0.03, T + 0.02).move(-0.0045, R - 0.012, -T / 2 - 0.01).rotate(0, 0, i * 3));
    const P: Solid[] = [manifold.difference(manifold.cylinder(R, T).move(0, 0, -T / 2), ...cut)];   // reeded edge: 120 grooves
    for (const s of [1, -1]) {
      const z = s > 0 ? T / 2 : -T / 2 - 0.022, zl = s > 0 ? T / 2 : -T / 2 - 0.016;
      P.push(manifold.cylinder(R - 0.016, 0.022).minus(manifold.cylinder(R - 0.06, 0.06).move(0, 0, -0.02)).move(0, 0, z));      // raised rim
      for (let k = 0; k < 5; k++) P.push(manifold.cylinder(0.05, 0.016).scale(2, 1, 1).move(0.12, 0, 0).rotate(0, 0, 90 + k * 72).move(0, 0, zl));   // petals
      P.push(manifold.cylinder(0.045, 0.024).move(0, 0, s > 0 ? T / 2 : -T / 2 - 0.024));                                            // centre boss
      for (let k = 0; k < 28; k++) P.push(manifold.cylinder(0.017, 0.016).move(0.3, 0, zl).rotate(0, 0, k * 360 / 28));  // ring of beads
    }
    return manifold.union(...P);
  })(),
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
  h = Math.max(h, 0.01);   // every part exists on every frame: raea matches parts in tree order, so a count that changes makes models swap (flicker)
  const P = [<B key={`${id}p`} p={[x, 2.95 - h / 2, z]} s={[w, h, 0.04]}><Flat c={c} r={0.5} /></B>];
  for (let r = 0; r < 20; r++) { const y = 2.95 - h + 0.07 + r * 0.14; P.push(<B key={`${id}s${r}`} p={[x, Math.min(y, 2.9), z + 0.03]} s={[w, 0.03, 0.03]}><Flat c={c} r={0.35} /></B>); }
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
  const amber = [-5, -2, 2, 4].includes(i);       // a few neighbours still up: their windows glow amber (Style A locked light trait)
  const P: any[] = [];
  P.push(<Model key="sh" src={S(src)} position={[cx, 0, 0]}>
    <StandardMaterial material="wall" base_color={diy ? "#a86a00" : tint} normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} metallic_roughness_texture={S("tex/grey_plaster_rough_1k.jpg")} perceptual_roughness={1} uv_transform={Affine2.fromScale([2.4, 2.4])} />
    <StandardMaterial material="trim" base_color={diy ? "#fff3cf" : "#4a4c54"} perceptual_roughness={0.75} />
    <StandardMaterial material="shutter" base_color={diy ? "#2f7a4a" : amber ? "#5a4326" : "#2c2e34"} perceptual_roughness={0.6} emissive={amber ? glow("#ffae55", 0.32) : undefined} />   {/* lamplight through the louvres */}
    <StandardMaterial material="tile" base_color={tint} normal_map_texture={S("tex/clay_roof_tiles_02_nor_gl_1k.jpg")} perceptual_roughness={0.85} />
    <StandardMaterial material="floor" base_color={diy ? "#c9a77a" : "#45474e"} normal_map_texture={S("tex/concrete_tiles_nor_gl_1k.jpg")} perceptual_roughness={0.8} />
    <StandardMaterial material="party" base_color="#2b2d33" perceptual_roughness={0.8} />
    <StandardMaterial material="dark" base_color={diy ? "#ffd9a0" : amber ? "#6b4a22" : "#15161a"} emissive={diy ? glow("#ffc070", 1.2) : amber ? glow("#ffb45c", 0.55) : undefined} />
  </Model>);
  // signboard on the façade over the arcade
  P.push(<B key="sg" p={[cx, 4.05, 2.32]} s={[W - 0.5, 0.62, 0.1]}>
    <Flat c={diy ? "#d92128" : spd ? "#2c2e34" : ["#2a2c33", "#33302d", "#2a313c"][((i % 3) + 3) % 3]} r={0.45} e={diy ? glow("#ff2a2a", 2.6) : undefined} /></B>);
  // L05 "Part three: you pick": three shops to the right light a "?" on their signboards, one by one
  if (i >= 1 && i <= 3) { const on = k(TNOW, [33.45, 34.35, 34.5][i - 1], [33.75, 34.65, 34.8][i - 1]);
    P.push(<Mesh3d key="qm" castShadow={false} transform={Transform.fromXyz(cx, 3.8, 2.38)}><Text3D size={0.72} depth={0.04}>?</Text3D><Flat c="#3a3c44" e={glow("#ffd27a", 4 * on)} /></Mesh3d>); }
  if (diy) P.push(<ImagePlane key="lg" src={S("mrdiy_logo.png")} width={W - 0.8} position={[cx, 4.05, 2.38]} />);
  if (spd) P.push(<ImagePlane key="lg" src={S("99_grey.png")} width={2.4} position={[cx, 4.05, 2.38]} />);
  if (diy) {
    const up = k(TNOW, 0.5, 1.5);
    // stock is wheeled out onto the five-foot way once the shutter is up (on "cheap")
    const out = (a: number) => -1.7 * (1 - k(TNOW, a, a + 0.7, Easing.out(Easing.cubic)));
    const oR = out(1.4), oH = out(1.6) - 0.2 * (1 - k(TNOW, 1.6, 2.3, Easing.out(Easing.cubic))), oC = out(1.8);   // hardware starts deeper (behind the shutter)
    const GC = ["#e3262b", "#ffd400", "#2f6fd6", "#3bb273", "#f28c28", "#ffffff", "#7a4fd1"];
    for (const sx of [x0 + 1.0, x0 + 2.3, x0 + 3.6]) P.push(<Model key={`shv${sx}`} src={S("parts/shelves.glb")} position={[sx, 0.15, -2.6]} scale={[0.75, 0.9, 0.75]} />);
    for (let r = 0; r < 4; r++) for (let j = 0; j < 12; j++) P.push(<B key={`bw${r}${j}`} p={[x0 + 0.55 + j * 0.32, 0.45 + r * 0.7, -3.95]} s={[0.25, 0.42, 0.28]}><Flat c={GC[(r * 5 + j) % GC.length]} r={0.5} /></B>);
    for (const [rx] of [[x0 + 1.05], [x0 + 3.4]] as [number][]) {
      P.push(<B key={`rk${rx}`} p={[rx, 0.95, 0.75 + oR]} s={[1.1, 1.6, 0.4]}><Flat c="#2a2c31" r={0.5} /></B>);
      for (let lv = 0; lv < 4; lv++) for (let j = 0; j < 5; j++) P.push(<B key={`rg${rx}${lv}${j}`} p={[rx - 0.44 + j * 0.22, 0.35 + lv * 0.38, 1.0 + oR]} s={[0.18, 0.28, 0.1]}><Flat c={GC[(lv * 3 + j + (rx > x0 + 2 ? 2 : 0)) % GC.length]} r={0.45} /></B>);
      // price tags hang under each pack: blank, they swing up to show "?" on "never checked the price" (L02);
      // on "Cheap for you" (L05) the middle one swings on round again to RM2. Pivot = the tag's top edge; it swings outward.
      if (rx < x0 + 2) for (let lv = 1; lv < 4; lv++) for (let j = 0; j < 5; j++) {   // not the bottom shelf: its tags would touch the floor
        const n = (lv - 1) * 5 + j, mid = lv === 2 && j === 2;
        const a = Math.PI * k(TNOW, 10.75 + n * 0.035, 11.05 + n * 0.035, Easing.inOut(Easing.cubic)) + (mid ? Math.PI * k(TNOW, 31.05, 31.4, Easing.inOut(Easing.cubic)) : 0);
        const pv: [number, number, number] = [rx - 0.44 + j * 0.22, 0.35 + lv * 0.38 - 0.145, 1.0 + oR + 0.065], pq = Quat.fromRotationX(-a);
        const q = (dx: number, dy: number, dz: number, r: [number, number, number, number], sc = 1) => { const o = Quat.mulVec3(pq, [dx, dy, dz]);
          return Transform.fromXyz(pv[0] + o[0], pv[1] + o[1], pv[2] + o[2]).withRotation(Quat.mul(pq, r)).withScale([sc, sc, sc]); };
        P.push(<Mesh3d key={`tg${n}`} name={`tag${n}`} transform={q(0, -0.065, 0, Quat.IDENTITY)}><Cuboid half_size={[0.085, 0.06, 0.003]} /><Flat c="#f2efe6" r={0.8} /></Mesh3d>);
        P.push(<Mesh3d key={`tq${n}`} name={`tagq${n}`} castShadow={false} transform={q(0, -0.1, -0.0035, Quat.fromRotationX(Math.PI))}><Text3D size={0.1} depth={0.002}>?</Text3D><Flat c="#d92128" /></Mesh3d>);
        if (mid) P.push(<Mesh3d key="trm" name="tagrm" castShadow={false} transform={q(0, -0.09, 0.0035, Quat.IDENTITY, TNOW > 30 ? 1 : 0.001)}><Text3D size={0.06} depth={0.002}>RM2</Text3D><Flat c="#d92128" /></Mesh3d>);
      }
    }
    for (const [m, x, z, r, sc] of [["watering_can_metal_01", x0 + 1.0, 1.75, 0.4, 1.6], ["metal_toolbox", x0 + 1.7, 1.8, -0.3, 1.4], ["plastic_container", x0 + 2.4, 1.85, 0.2, 0.7], ["spray_paint_bottles", x0 + 3.1, 1.85, 0.6, 1.5], ["Drill_01", x0 + 3.8, 1.8, 1.2, 1.6], ["cardboard_box_01", x0 + 4.0, 1.55, 0.3, 1.2]] as [string, number, number, number, number][])
      P.push(<Model key={`hw${m}`} src={S(`${m}/${m}.gltf`)} position={[x, 0.15, z + oH]} rotation={[0, r, 0]} scale={[sc, sc, sc]} />);
    for (let c = 0; c < 6; c++) P.push(<Model key={`pc${c}`} src={S("plastic_crate_01/plastic_crate_01.gltf")} position={[x0 + 3.9 - (c % 2) * 0.5, 0.15 + Math.floor(c / 2) * 0.29, 0.5 + oC]} rotation={[0, 0.1 * c, 0]}><StandardMaterial base_color={["#2f6fd6", "#e3262b", "#3bb273"][c % 3]} /></Model>);
    P.push(<Shutter key="dshut" id="dsh" x={cx} w={W - 0.9} h={2.8 * (1 - up)} z={0.3} c="#5a5d66" />);
    for (let t = 0; t < 3; t++) { const on = k(TNOW, 1.2 + t * 0.15, 1.3 + t * 0.15, Easing.linear);
      P.push(<B key={`tube${t}`} p={[cx, 3.4, -0.6 - t * 1.3]} s={[2.6, 0.05, 0.1]}><Flat c="#ffffff" e={glow("#f2f8ff", 0.2 + 9 * on)} /></B>); }
    for (let b = 0; b < 5; b++) P.push(<B key={`bk${b}`} p={[x0 + 3.0, 0.21 + b * 0.12, 1.25 + oR]} s={[0.45, 0.11, 0.32]}><Flat c="#e3262b" r={0.45} /></B>);
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
  P.push(<B key="kerb" p={[xm, 0.07, AR + 0.15]} s={[L + 30, 0.14, 0.28]}>   {/* inside the shophouse kerbs (y 0–0.15, z 2.2–2.5): coplanar faces z-fought */}
    <Flat c={WHITE2} /></B>);
  P.push(<B key="road" p={[xm, -0.02, AR + 4.6]} s={[L + 60, 0.04, 8.6]}><Tiles n="asphalt_02" u={30} v={4} tint="#5b5e66" real /></B>);   // real asphalt colour (aggregate, patches) under the tint, not relief only
  for (let k = -10; k < 12; k++) P.push(<B key={`ln${k}`} p={[k * 4, 0.005, AR + 4.6]} s={[2, 0.01, 0.14]}><Flat c="#ffffff" /></B>);
  P.push(<B key="pv" p={[xm, 0.08, AR + 10]} s={[L + 60, 0.16, 2.2]}><Tiles n="concrete_tiles" u={40} v={2} /></B>);
  P.push(<B key="gr" p={[xm, -0.06, -10]} s={[L + 80, 0.1, 60]}><Flat c={WHITE2} /></B>);
  // parked cars, trees, lamps, poles and wires, a stall, chairs and crates — all white model
  for (const [x, f] of [[-15, 0], [-11.5, 0], [6, 0], [13, 0]] as [number, number][]) P.push(<WhiteModel key={`car${x}`} src="car_b.glb" p={[x, 0, AR + 1.75]} r={Math.PI / 2 + f} s={1.0} />);
  for (const x of [-22, -13, 32, 38]) P.push(<WhiteModel key={`tr${x}`}   /* clear of L03's tracking camera */ src="island_tree_02/island_tree_02.gltf" p={[x, 0.16, AR + 10]} s={1.6} c={WHITE2} />);
  for (const x of [34]) P.push(<WhiteModel key={`lp${x}`} src="street_light.glb" p={[x, 0.16, AR + 9.4]} r={Math.PI} s={1.1} />);
  for (const x of [-26, 20]) P.push(<WhiteModel key={`tp${x}`} src="tele_pole.glb" p={[x, 0.16, AR + 0.5]} s={1.2} />);
  for (let w = 0; w < 0; w++) P.push(<Mesh3d key={`wi${w}`} transform={Transform.fromXyz(-3, 8.4 - w * 0.25, AR + 0.5).withRotation(Quat.fromEuler("XYZ", 0, 0, Math.PI / 2))}><Cylinder radius={0.018} half_height={30} /><Flat c="#8e877c" /></Mesh3d>);
  P.push(<Mesh3d key="umb" transform={Transform.fromXyz(-9.5, 2.5, AR + 9.6)} shape={so().umbrella}><Flat c={WHITE} /></Mesh3d>);
  P.push(<B key="stall" p={[-9.5, 0.6, AR + 9.6]} s={[1.8, 0.9, 1.0]}><Flat c={WHITE} /></B>);
  P.push(<Mesh3d key="pole" transform={Transform.fromXyz(-9.5, 1.4, AR + 9.6)}><Cylinder radius={0.03} half_height={1.2} /><Flat c={WHITE2} /></Mesh3d>);
  for (const [x, z, r] of [[-3.6, 0.8, 0.5], [-3.0, 0.85, -0.3], [-12.4, 0.9, 0.2], [9.8, 0.7, 0.8]] as [number, number, number][])
    P.push(<WhiteModel key={`ch${x}`} src="plastic_monobloc_chair_01/plastic_monobloc_chair_01.gltf" p={[x, 0.12, z]} r={r} />);
  for (let c = 0; c < 3; c++) P.push(<WhiteModel key={`cr${c}`} src="plastic_crate_01/plastic_crate_01.gltf" p={[-6.6, 0.12 + c * 0.29, 0.6]} r={c * 0.2} />);
  for (const x of [-14.6, -5.1, 9.4]) P.push(<WhiteModel key={`pp${x}`} src="potted_plant_02/potted_plant_02.gltf" p={[x, 0.12, x === -5.1 ? 0.55 : AR - 0.55]} s={1.3} c={WHITE2} />);
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
  for (let c = 0; c < 4; c++) P.push(<WhiteModel key={`cr2${c}`} src="plastic_crate_01/plastic_crate_01.gltf" p={[-2.6 + (c % 2) * 0.45, 0.12 + Math.floor(c / 2) * 0.29, 0.85]} r={c * 0.3} />);
  P.push(<WhiteModel key="ht2" src="hand_truck/hand_truck.gltf" p={[4.2, 0.12, 1.4]} r={-0.6} />);
  P.push(<Model key="vs" src={S("parts/vespa.glb")} position={[-6.5, 0.12, 1.4]} rotation={[0, 1.2, 0]}><StandardMaterial base_color={WHITE2} /></Model>);
  P.push(<Model key="vsp" src={S("parts/vespa.glb")} position={[-1.6, 0.15, 1.0]} rotation={[0, 1.3, 0]}>   {/* on the five-foot way, out of the Grab car's path */}<StandardMaterial base_color={WHITE2} /></Model>);
  // people hold poses (house rule): MPFB figures, faceless, charcoal clay
  for (const [src, x, z, r] of [["s_m30", 0.7, 2.6, 2.4], ["s_f25", 3.9, 1.6, -2.6], ["s_m50", -9.0, AR + 9.0, 0.3], ["s_f35", -8.3, AR + 9.4, -2.4], ["s_m30", -4.2, 0.75, 0.9], ["s_f25", 10.8, AR + 9.6, -0.4]] as [string, number, number, number][])
    P.push(<Model key={`pp${src}${x}`} src={S(`people/${src}.glb`)} position={[x, 0.12, z]} rotation={[0, r, 0]}><StandardMaterial base_color="#55585f" perceptual_roughness={0.7} /></Model>);
  return <>{P}</>;
}

// =====================================================================================================================
// EX31 pieces
// =====================================================================================================================
const GREEN = "#00b14f", ORANGE = "#e8892b", PAPER = "#f1ece2", AMBER = "#ffb347";
const rotY = (yaw: number) => Quat.fromRotationY(yaw);
const place = (o: [number, number, number], yaw: number, d: [number, number, number]): [number, number, number] => { const v = Quat.mulVec3(rotY(yaw), d); return [o[0] + v[0], o[1] + v[1], o[2] + v[2]]; };
const Lit = ({ tex, c = "#ffffff" }: { tex?: string; c?: string }) => <StandardMaterial base_color={c} base_color_texture={tex ? S(tex) : (undefined as any)} unlit />;

// the Grab car: car_b repainted white (its "Blue" body), the real Grab logo on both front doors; it faces +x at yaw 0
function GrabCar({ p, yaw, id, on = 1, sc = 1 }: { p: [number, number, number]; yaw: number; id: string; on?: number; sc?: number }) {
  const g = Math.max(sc, 0.001);
  return <>
    <Model name={`${id}m`} src={S("car_b.glb")} position={p} rotation={[0, yaw + Math.PI / 2, 0]} scale={[g, g, g]}>
      <StandardMaterial material="Blue" base_color="#e9edf1" perceptual_roughness={0.38} clearcoat={1} clearcoat_perceptual_roughness={0.12} />   {/* car paint: lacquer over the white */}
    </Model>
    {[-1, 1].map((sd) => <Mesh3d key={`${id}d${sd}`} name={`${id}d${sd}`} transform={Transform.fromXyz(...place(p, yaw, [0.25, 0.62, sd * 0.915])).withRotation(Quat.mul(rotY(yaw), rotY(sd > 0 ? 0 : Math.PI))).withScale([g, g, g])}>
      <Cuboid half_size={[0.62, 0.22, 0.002]} /><Lit tex="grab_white.png" /></Mesh3d>)}
    <Mesh3d name={`${id}r`} transform={Transform.fromXyz(...place(p, yaw, [-0.2, 1.21 * g, 0])).withScale([g, g, g])}><Cuboid half_size={[0.28, 0.05, 0.12]} /><StandardMaterial base_color={GREEN} emissive={glow(GREEN, 2.2 * on)} /></Mesh3d>
  </>;
}

// the fare: a drawn RM20 note (not a banknote replica); `cut` is Grab's share (its last part, behind the dashed line),
// `sep` pulls that slice away; the note faces +z (toward the near-iso camera)
function Note({ p, cut, sep = 0, s = 1, id, slice }: { p: [number, number, number]; cut: number; sep?: number; s?: number; id: string; slice?: [number, number, number] }) {
  const Wn = 0.92 * s, H = 0.42 * s, wm = Wn * (1 - cut), ws = Math.max(0.001, Wn * cut);
  const sp: [number, number, number] = slice ?? [p[0] - Wn / 2 + wm + ws / 2 + sep * 0.25, p[1] + sep * 0.15, p[2]];
  return <>
    <Mesh3d name={`${id}a`} castShadow={false} transform={Transform.fromXyz(p[0] - Wn / 2 + wm / 2, p[1], p[2])}><Cuboid half_size={[wm / 2, H / 2, 0.003]} /><Lit tex="note_main.png" /></Mesh3d>
    <Mesh3d name={`${id}b`} castShadow={false} transform={Transform.fromXyz(...sp)}><Cuboid half_size={[ws / 2, H / 2, 0.003]} /><Lit tex="note_slice.png" /></Mesh3d>
  </>;
}

// Grab's tower behind the row: window grid, the real logo on top, "MAX 20%" under it, an LED line for "170,000"
const TW: [number, number, number] = [14, 0, -34];
function Tower({ t }: { t: number }) {
  const P: any[] = [];
  P.push(<B key="tw" p={[TW[0], 22, TW[2]]} s={[11, 44, 10]}><Plaster u={4} v={14} tint="#2c2f37" /></B>);
  for (let r = 0; r < 18; r++) for (let c = 0; c < 6; c++) { const lit = ((r * 5 + c * 3) % 7) === 0;
    P.push(<B key={`tww${r}${c}`} p={[TW[0] - 4.2 + c * 1.68, 3 + r * 2.1, TW[2] + 5.03]} s={[1.0, 1.2, 0.05]}><Flat c={lit ? "#7c8fb3" : "#1b1e26"} e={lit ? glow("#9fb6ff", 0.3) : undefined} /></B>); }
  P.push(<Mesh3d key="tws" transform={Transform.fromXyz(TW[0], 47.4, TW[2] + 5.1)}><Cuboid half_size={[5.2, 1.85, 0.05]} /><StandardMaterial base_color="#ffffff" base_color_texture={S("grab_green.png")} unlit /></Mesh3d>);
  P.push(<B key="twc" p={[TW[0], 42.6, TW[2] + 5.1]} s={[8.4, 2.6, 0.12]}><Flat c="#121418" /></B>);
  P.push(<Mesh3d key="twct" transform={Transform.fromXyz(TW[0], 42.55, TW[2] + 5.2)}><Text3D size={1.7} depth={0.04}>MAX 20%</Text3D><StandardMaterial base_color={AMBER} unlit /></Mesh3d>);
  const led = k(t, 19.6, 20.2);
  P.push(<B key="twl" p={[TW[0], 38.4, TW[2] + 5.1]} s={[10.8, 2.6, 0.12]}><Flat c="#121418" /></B>);
  P.push(<Mesh3d key="twlt" transform={Transform.fromXyz(TW[0], 38.55, TW[2] + 5.2).withScale([led + 0.001, 1, 1])}><Text3D size={1.5} depth={0.04}>170,000 DRIVERS</Text3D><StandardMaterial base_color="#3dff8f" unlit /></Mesh3d>);
  return <>{P}</>;
}

// "only the weekly average": a rooftop billboard (on unit 3's ridge), seven day bars and the average line at 20%
const BBX = 3 * W + W / 2;
function WeekBoard({ t }: { t: number }) {
  const g = k(t, 16.2, 17.4), line = k(t, 17.6, 18.2), z = -5.4, H = [0.9, 1.45, 0.75, 1.2, 1.6, 0.95, 1.05];
  const P: any[] = [<B key="wbp" p={[BBX, 10.8, z]} s={[5.2, 3.1, 0.16]}><Flat c="#15171c" /></B>];
  for (const dx of [-1.9, 1.9]) P.push(<B key={`wbl${dx}`} p={[BBX + dx, 9.6, z]} s={[0.14, 1.2, 0.14]}><Flat c="#2a2c31" /></B>);
  H.forEach((h, n) => { const hh = Math.max(0.01, h * g);
    P.push(<B key={`wbb${n}`} p={[BBX - 2.0 + n * 0.62, 9.55 + hh / 2, z + 0.1]} s={[0.4, hh, 0.04]}><Flat c={GREEN} e={glow(GREEN, 0.9)} /></B>);
    P.push(<Mesh3d key={`wbd${n}`} transform={Transform.fromXyz(BBX - 2.0 + n * 0.62, 9.38, z + 0.1)}><Text3D size={0.17} depth={0.01}>{["I", "S", "R", "K", "J", "S", "A"][n]}</Text3D><StandardMaterial base_color="#c9ccd4" unlit /></Mesh3d>); });
  P.push(<B key="wba" p={[BBX - 0.15, 9.55 + 1.1, z + 0.14]} s={[4.4 * Math.max(line, 0.001), 0.06, 0.03]}><Flat c={AMBER} e={glow(AMBER, 2)} /></B>);
  P.push(<Mesh3d key="wbat" transform={Transform.fromXyz(BBX + 2.25, 10.65, z + 0.14).withScale([line + 0.001, line + 0.001, 1])}><Text3D size={0.3} depth={0.01}>20%</Text3D><StandardMaterial base_color={AMBER} unlit /></Mesh3d>);
  P.push(<Mesh3d key="wbh" transform={Transform.fromXyz(BBX, 12.0, z + 0.1)}><Text3D size={0.3} depth={0.01}>MINGGU INI</Text3D><StandardMaterial base_color="#c9ccd4" unlit /></Mesh3d>);
  return <>{P}</>;
}

// "over 170,000 drivers": a fleet along both lanes; each car's green roof light comes on in turn
const FLEET = (PATHS.fleet as [number, number][]).map(([x, z], n) => [x, z, n % 2 ? 0 : Math.PI] as [number, number, number]);   // lanes checked clear by paths.py
function Fleet({ t }: { t: number }) {
  return <>{FLEET.map(([x, z, yaw], n) => <GrabCar key={`fl${n}`} id={`fl${n}`} p={[x, 0, z]} yaw={yaw} on={k(t, 19.9 + n * 0.07, 20.1 + n * 0.07)} sc={k(t, 19.3 + n * 0.03, 19.8 + n * 0.03) * (1 - k(t, 25.9, 26.3))} />)}</>;
}

// Parliament (set at x = 60): the tower with its lattice facade, the low hall with pyramid roofs; in front, on a desk,
// the cap document stamped DALAM SEMAKAN · UNDER REVIEW on "reviewing"
const PX = 60;
function Parliament({ t }: { t: number }) {
  const P: any[] = [];
  P.push(<B key="pg" p={[PX, -0.05, 0]} s={[90, 0.1, 90]}><Flat c="#23252c" /></B>);
  P.push(<B key="pt" p={[PX + 6, 26, -30]} s={[13, 52, 9]}><Flat c="#d8d6cf" /></B>);
  for (let r = 0; r < 24; r++) for (let c = 0; c < 6; c++) P.push(<B key={`pl${r}${c}`} p={[PX + 6 - 5.2 + c * 2.08, 3 + r * 2.1, -25.45]} s={[1.3, 1.3, 0.12]} rot={[0, 0, Math.PI / 4]}><Flat c="#8d8f96" /></B>);
  P.push(<B key="ph" p={[PX - 8, 4, -20]} s={[30, 8, 16]}><Flat c="#cfccc4" /></B>);
  for (let n = 0; n < 8; n++) P.push(<Mesh3d key={`pr${n}`} transform={Transform.fromXyz(PX - 21 + n * 3.7, 8.9, -20).withRotation(Quat.fromRotationY(Math.PI / 4))}><Cylinder radius={1.75} half_height={0.9} />   {/* spaced: 2.2 overlapped its neighbours */}<Flat c="#9a8f7c" /></Mesh3d>);
  // the desk and the document (words on the object); the stamp lands on "reviewing"
  P.push(<B key="dk" p={[PX, 0.75, 10]} s={[3.6, 0.1, 2.2]}><Flat c="#3a2f28" /></B>);
  P.push(<B key="dkl" p={[PX, 0.36, 10]} s={[3.2, 0.72, 1.8]}><Flat c="#2a221d" /></B>);
  P.push(<B key="doc" p={[PX, 0.81, 10]} s={[1.5, 0.01, 2.0]}><StandardMaterial base_color={PAPER} unlit /></B>);
  const T3 = (txt: string, x: number, z: number, sz: number, c = "#1b1d22", key = txt) =>
    <Mesh3d key={key} castShadow={false} transform={Transform.fromXyz(PX + x, 0.818, 10 + z).withRotation(Quat.fromRotationX(-Math.PI / 2))}><Text3D size={sz} depth={0.002}>{txt}</Text3D><StandardMaterial base_color={c} unlit /></Mesh3d>;
  P.push(T3("KEMENTERIAN PENGANGKUTAN", 0, -0.82, 0.07), T3("HAD KOMISEN E-HAILING", 0, -0.55, 0.09), T3("20%", 0, -0.15, 0.36, ORANGE));
  for (let n = 0; n < 4; n++) P.push(<B key={`dl${n}`} p={[PX - 0.1 + (n % 2) * 0.1, 0.817, 10 + 0.25 + n * 0.13]} s={[1.05 - (n % 3) * 0.15, 0.003, 0.03]}><StandardMaterial base_color="#b9b3a6" unlit /></B>);
  const st = k(t, 24.55, 24.75, Easing.in(Easing.quad));
  P.push(<Mesh3d key="stp" castShadow={false} transform={Transform.fromXyz(PX, 0.822, 10 + 0.3).withRotation(Quat.mul(Quat.fromRotationY(0.1), Quat.fromRotationX(-Math.PI / 2))).withScale([lerp(1.6, 1, st) * Math.max(st, 0.001), lerp(1.6, 1, st) * Math.max(st, 0.001), 1])}>
    <Text3D size={0.062} depth={0.002}>DALAM SEMAKAN · UNDER REVIEW</Text3D><StandardMaterial base_color="#d1262c" unlit /></Mesh3d>);
  return <>{P}</>;
}

// ---------------------------------------------------------------------------------------------------------------------
// the film, on the voice: L01 0.3 · L02 4.78 · L03 9.21 · L04 19.43 · L05 26.55 · end 32.6
const STOP = -3;                         // where the car meets the rider (kerb lane)
const RIDER: [number, number, number] = [STOP - 0.4, 0.15, AR + 0.2];   // on the kerb
function carAt(T: number): { p: [number, number, number]; yaw: number } {
  const fr = PATHS.frames as number[][], v = fr[Math.max(0, Math.min(fr.length - 1, Math.round(T * FPS)))];
  return { p: [v[0], 0, v[1]], yaw: v[2] };
}
const jamAt = (T: number, n: number) => { const fr = PATHS.frames as number[][]; return fr[Math.max(0, Math.min(fr.length - 1, Math.round(T * FPS)))][3 + n]; };
const NEXT_RIDER: [number, number, number] = [26.5, 0.15, AR + 0.2];
function cutAt(T: number) {             // Grab's share of the note, trip by trip (L03), settling to 20% on "weekly average"
  return interpolate(T, [0, 11.2, 11.6, 13.0, 13.4, 13.7, 14.1, 14.9, 15.3, 16.6, 17.2, 26.5, 27.8, 28.2],
                        [0.2, 0.2, 0.27, 0.27, 0.13, 0.13, 0.23, 0.23, 0.17, 0.17, 0.2, 0.2, 0.2, 0.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
}

const CAPS60 = (CAPS as CapBlock[]).map((b: any) => ({ ...b, in: b.in * 2, out: b.out * 2, words: b.words.map((w: any) => ({ ...w, f: w.f * 2 })) })) as CapBlock[];   // caps.json is in 30 fps frames
const END = 32.6;                                // the voice's end; +1.6 s Meikigo end card (silent)
function EndCard({ t }: { t: number }) {
  const u = k(t, END + 0.1, END + 0.65, Easing.out(Easing.cubic));
  if (u <= 0) return null;
  return <div style={{ position: "absolute", inset: 0, background: "#14161c", opacity: u, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    <Img src={S("meikigo-logo.png")} style={{ height: 420, transform: `scale(${0.92 + 0.08 * u})` }} />
    <div style={{ marginTop: 40, fontFamily: "Inter Display", fontWeight: 700, fontSize: 76, color: "#eef0f4", letterSpacing: -1 }}>Meikigo</div>
  </div>;
}

function Film() {
  const F = useCurrentFrame(), T = F / FPS;
  const car = carAt(T), cut = cutAt(T), cx = car.p[0];
  const io = Easing.inOut(Easing.cubic), K = (a: number, b: number) => k(T, a, b, io);
  let cam: [number, number, number], look: [number, number, number], fov: number;
  // the note: L01 from the rider to above the car; rides above the car through L03; L05 a new fare, same RM20
  const above: [number, number, number] = [cx + 0.2, 2.35, car.p[2] + 0.6];
  let note: [number, number, number] = L3([RIDER[0] + 0.2, 1.5, RIDER[2] + 0.4], above, K(2.9, 3.8));
  let slice: [number, number, number] | undefined, noteS = 1;
  if (T >= 5.4 && T < 9.2) {            // L02: the slice leaves for Grab's tower and lands in its "MAX 20%" sign
    const fly = K(5.5, 7.4); const wm = 0.92 * (1 - cut);
    slice = L3([above[0] - 0.46 + wm + 0.092, above[1], above[2]], [TW[0] + 3.2, 42.6, TW[2] + 5.3], fly);
  }
  if (T >= 26.4) note = L3([RIDER[0] + 0.2, 1.5, RIDER[2] + 0.4], [STOP + 0.2, 2.35, AR + 2.2], K(26.6, 27.4));
  const sliceGrow = T >= 9.2 && T < 26.4 ? k(T, 9.2, 9.8) : 1;
  // the camera is data (paths.py): eased in-out moves, the L03 track on a smoothed car, smoothed between the cuts
  { const c = (PATHS.cam as number[][])[Math.max(0, Math.min(PATHS.cam.length - 1, F))]; cam = [c[0], c[1], c[2]]; look = [c[3], c[4], c[5]]; fov = c[6]; }
  const focus = Math.hypot(cam[0] - look[0], cam[1] - look[1], cam[2] - look[2]);
  return (
    <AbsoluteFill style={{ background: "#14161c" }}>
      <Camera3d transform={Transform.fromXyz(...cam).lookingAt(look)} projection={{ Perspective: { fov } }}>
        <DepthOfField focal_distance={focus} aperture_f_stops={7} />
      </Camera3d>
      <Environment src={S("sky.hdr")} intensity={0.12} rotation={2.6} />
      <AmbientLight brightness={16} color="#8ea4dc" />
      <DirectionalLight color="#a7bdff" transform={Transform.fromXyz(-22, 18, 6).lookingAt([0, 0, 0])} illuminance={3200} shadow_maps_enabled soft_shadow_size={0.5} />   {/* 1.2: its dithered penumbra crawled on the road as the camera tracked (flicker ~14 s) */}
      <Shadows distance={45} firstCascade={14} mapSize={8192} bias={0.04} normalBias={1.5} />
      <SpotLight name="hl" transform={Transform.fromXyz(...place(car.p, car.yaw, [2.2, 0.7, 0])).lookingAt(place(car.p, car.yaw, [12, 0, 0]))} intensity={2600000} outer_angle={0.45} inner_angle={0.2} color="#fff1d6" range={22} shadow_maps_enabled />
      <PointLight name="cg" transform={Transform.fromXyz(cx, 2.6, car.p[2])} intensity={180000} color="#7dffb4" range={5} />
      <PointLight name="tg" transform={Transform.fromXyz(TW[0], 44, TW[2] + 9)} intensity={9000000} color="#5dff9a" range={20} />
      <PointLight transform={Transform.fromXyz(34, 6.5, AR + 9.4)} intensity={700000} color="#cfe0ff" range={14} />
      <SpotLight name="pk" transform={Transform.fromXyz(PX - 4, 6, 16).lookingAt([PX, 0.8, 10])} intensity={1600000} outer_angle={0.5} inner_angle={0.3} color="#ffe4c4" range={14} shadow_maps_enabled />
      <SpotLight name="pf" transform={Transform.fromXyz(PX - 6, 1, 0).lookingAt([PX + 6, 30, -26])} intensity={30000000} outer_angle={0.5} inner_angle={0.3} color="#fff2dc" range={60} />
      <Fog color="#14161c" near={60} far={150} />
      <Bloom intensity={0.7} threshold={0.9} />
      <AmbientOcclusion quality="high" />
      <ToneMapping mode="agx" exposure={0.6} />
      <Grade temperature={0.0} vignette={0.3} midtones={{ saturation: 1.05, contrast: 1.12, gamma: 1, gain: 1, lift: 0 }} />
      <Street />
      {UNITS.map((i) => <Unit key={i} i={i} t={T} />)}
      <Tower t={T} />
      <WeekBoard t={T} />
      <Fleet t={T} />
      <Parliament t={T} />
      {/* the traffic: three cars in the far lane, holding the Grab car on "traffic", then moving on */}
      {[0, 1, 2].map((n) => <Model key={`jam${n}`} name={`jam${n}`} src={S("car_b.glb")} position={[jamAt(T, n), 0, AR + 5.2]} rotation={[0, Math.PI / 2, 0]}><StandardMaterial material="Blue" base_color={["#5a2a2a", "#2d3b52", "#4a4a4a"][n]} /></Model>)}
      <Model name="rider" src={S("people/s_f35.glb")} position={RIDER} rotation={[0, Math.PI, 0]}><StandardMaterial base_color="#55585f" perceptual_roughness={0.7} /></Model>
      <Model name="rider2" src={S("people/s_m50.glb")} position={NEXT_RIDER} rotation={[0, Math.PI, 0]}><StandardMaterial base_color="#55585f" perceptual_roughness={0.7} /></Model>
      <GrabCar id="gc" p={car.p} yaw={car.yaw} />
      <Note id="nt" p={note} cut={cut * sliceGrow + (1 - sliceGrow) * 0.001} s={noteS} slice={slice} />
      <Captions blocks={CAPS60} frame={F} fps={FPS} />
      <EndCard t={T} />
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="ex31" component={Film} width={1080} height={1920} fps={FPS} durationInFrames={2052} />);
