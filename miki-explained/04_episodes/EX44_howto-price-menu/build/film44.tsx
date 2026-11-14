// EX44 — Harga sebenar nasi lemak (S16 How to, Bahasa Melayu test). Costing-sheet UI + food macro. Style A world (EX37/EX31 street, the stall the one real-coloured light) with
// Style D motion (RECIPE-D Part 2). Assembled: head40 + base40 (EX37's street, renamed) + film40 + cammap → film40.tsx
import { AbsoluteFill, Composition, Easing, Img, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { AmbientOcclusion, Entity, Fog, Grade, ImagePlane, Look, Model, Text3D, type Solid } from "raea/3d";
import { Capsule3d, Cuboid, Cylinder, Sphere, Mesh3d, manifold, crossSection } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { AmbientLight, DirectionalLight, Environment, PointLight, RectLight, Shadows, SpotLight } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
import { Bloom, DepthOfField, MotionBlur, ToneMapping } from "raea/post_process";
import { Affine2 } from "raea/math";
import { LinearRgba, Srgba } from "raea/color";
import MAP from "./map39.json";
import TL from "./tl.json";
const S = (p: string) => staticFile(p);
const k = (t: number, a: number, b: number, e = Easing.inOut(Easing.cubic)) => interpolate(t, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
const lerpB = (a: number, b: number, u: number) => a + (b - a) * u;
const L3 = (a: number[], b: number[], u: number): [number, number, number] => [lerpB(a[0], b[0], u), lerpB(a[1], b[1], u), lerpB(a[2], b[2], u)];
const glow = (hex: string, k: number) => LinearRgba.from(Srgba.hex(hex)).mul(k);
const SW = 4.6;                                  // shophouse width
const UNITS = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
const SIGN_RISE = { v: 0 }, SHUT0 = { v: 2.8 };   // SHUT0: unit 0's shutter (rolls up for L04's kitchen cutaway)   // set per frame by Film: how far every shop's signboard has risen (L02: the +29 % level)
const DIY = 99, SPD = 99;                       // no featured shop: the nasi lemak stall (a stall, not a unit) is the subject
const AR = 2.2;                                 // five-foot way depth (z 0..AR), the upper floor overhangs it
const WHITE = "#3b3d44", WHITE2 = "#2f3138", SHADE = "#cfc9be";

// ---------- solids, built once ----------
let SOB: Record<string, Solid> | null = null;
const sob = () => (SOB ??= {
  arch: manifold.box(SW - 0.4, 1.2, 0.3).move(-(SW - 0.4) / 2, 0, -0.15).minus(manifold.cylinder(2.3, 2).move(0, -1.75, -1)),
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
  // the bungkus: a brown-paper pyramid (folded square, apex up) and its banana-leaf skirt (irregular, flat)
  bkPaper: manifold.hull([[-0.07, 0, -0.07], [0.07, 0, -0.07], [0.07, 0, 0.07], [-0.07, 0, 0.07], [0.008, 0.085, -0.006]]),
  bkLeaf: manifold.hull([[-0.1, 0, -0.06], [-0.03, 0, -0.11], [0.08, 0, -0.095], [0.11, 0, 0.01], [0.06, 0, 0.1], [-0.05, 0, 0.105], [-0.11, 0, 0.03],
                         [-0.1, 0.012, -0.06], [0.08, 0.012, -0.095], [0.06, 0.012, 0.1], [-0.11, 0.012, 0.03]]),
});

const TC = (n: string) => ({ base_color_texture: S(`tex/${n}_diff_1k.jpg`), ...TXR(n) });
const TXR = (n: string) => ({ normal_map_texture: S(`tex/${n}_nor_gl_1k.jpg`), metallic_roughness_texture: S(`tex/${n}_rough_1k.jpg`), perceptual_roughness: 1 });
const Plaster = ({ u = 1, v = 1, tint = WHITE }) => <StandardMaterial {...TXR("grey_plaster")} base_color={tint} uv_transform={Affine2.fromScale([u, v])} />;
const Roof = ({ u = 3, v = 3 }) => <StandardMaterial {...TXR("clay_roof_tiles_02")} base_color={WHITE} uv_transform={Affine2.fromScale([u, v])} />;
const Tiles = ({ n, u, v, tint = WHITE, real = false }: { n: string; u: number; v: number; tint?: string; real?: boolean }) => <StandardMaterial {...(real ? TC(n) : TXR(n))} base_color={tint} uv_transform={Affine2.fromScale([u, v])} />;
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
  const x0 = i * SW, cx = x0 + SW / 2, diy = i === DIY, spd = i === SPD;
  const src = diy || i === 0 ? "parts/shophouse_A_open.glb" : `parts/shophouse_${VAR(i)}.glb`;   // unit 0 is open: its shutter rolls up on the stall's kitchen (L04)
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
  P.push(<B key="sg" p={[cx, 4.05 + SIGN_RISE.v, 2.32]} s={[SW - 0.5, 0.62, 0.1]}>
    <Flat c={diy ? "#d92128" : spd ? "#2c2e34" : ["#2a2c33", "#33302d", "#2a313c"][((i % 3) + 3) % 3]} r={0.45} e={diy ? glow("#ff2a2a", 2.6) : undefined} /></B>);
  // L05 "Part three: you pick": three shops to the right light a "?" on their signboards, one by one
  if (false) { const on = k(TNOW, [33.45, 34.35, 34.5][i - 1], [33.75, 34.65, 34.8][i - 1]);
    P.push(<Mesh3d key="qm" castShadow={false} transform={Transform.fromXyz(cx, 3.8, 2.38)}><Text3D size={0.72} depth={0.04}>?</Text3D><Flat c="#3a3c44" e={glow("#ffd27a", 4 * on)} /></Mesh3d>); }
  if (diy) P.push(<ImagePlane key="lg" src={S("mrdiy_logo.png")} width={SW - 0.8} position={[cx, 4.05, 2.38]} />);
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
    P.push(<Shutter key="dshut" id="dsh" x={cx} w={SW - 0.9} h={2.8 * (1 - up)} z={0.3} c="#5a5d66" />);
    for (let t = 0; t < 3; t++) { const on = k(TNOW, 1.2 + t * 0.15, 1.3 + t * 0.15, Easing.linear);
      P.push(<B key={`tube${t}`} p={[cx, 3.4, -0.6 - t * 1.3]} s={[2.6, 0.05, 0.1]}><Flat c="#ffffff" e={glow("#f2f8ff", 0.2 + 9 * on)} /></B>); }
    for (let b = 0; b < 5; b++) P.push(<B key={`bk${b}`} p={[x0 + 3.0, 0.21 + b * 0.12, 1.25 + oR]} s={[0.45, 0.11, 0.32]}><Flat c="#e3262b" r={0.45} /></B>);
  } else {
    P.push(<Shutter key="shut" id={`sh${i}`} x={cx} w={SW - 0.9} h={i === 0 ? SHUT0.v : spd ? 1.55 : 2.8} z={0.3} c={spd ? "#4e5058" : "#3e4047"} />);
    if (spd) P.push(<B key="sin" p={[cx, 1.5, -0.6]} s={[SW - 0.9, 2.8, 0.1]}><Flat c="#1a1c22" e={glow("#7f9cff", 0.1)} /></B>);
  }
  if ((i + 7) % 3 === 0 && !diy) P.push(<WhiteModel key="ac" src="exterior_aircon_unit/exterior_aircon_unit.gltf" p={[cx - 0.4, 5.3, 2.35]} s={1.0} c="#4a4c53" />);
  return <>{P}</>;
}
const x1 = (x0: number) => x0 + SW;

function Street() {
  const L = UNITS.length * SW, xm = UNITS[0] * SW + L / 2;
  const P: any[] = [];
  P.push(<B key="kerb" p={[xm, 0.07, AR + 0.15]} s={[L + 30, 0.14, 0.28]}>   {/* inside the shophouse kerbs (y 0–0.15, z 2.2–2.5): coplanar faces z-fought */}
    <Flat c={WHITE2} /></B>);
  P.push(<B key="road" p={[xm, -0.02, AR + 4.6]} s={[L + 60, 0.04, 8.6]}><Tiles n="asphalt_02" u={30} v={4} tint="#5b5e66" real /></B>);   // real asphalt colour (aggregate, patches) under the tint, not relief only
  for (let k = -10; k < 12; k++) P.push(<B key={`ln${k}`} p={[k * 4, 0.005, AR + 4.6]} s={[2, 0.01, 0.14]}><Flat c="#ffffff" /></B>);
  P.push(<B key="pv" p={[xm, 0.08, AR + 10]} s={[L + 60, 0.16, 2.2]}><Tiles n="concrete_tiles" u={40} v={2} /></B>);
  P.push(<B key="gr" p={[xm, -0.06, -10]} s={[L + 80, 0.1, 60]}><Flat c={WHITE2} /></B>);
  // parked cars, trees, lamps, poles and wires, a stall, chairs and crates — all white model
  for (const [x, f] of [[-15, 0], [-11.5, 0], [13, 0]] as [number, number][])   /* the car at x 6 blocked the stall */ P.push(<WhiteModel key={`car${x}`} src="car_b.glb" p={[x, 0, AR + 1.75]} r={Math.PI / 2 + f} s={1.0} />);
  for (const x of [-22, -13, 32, 38]) P.push(<WhiteModel key={`tr${x}`}   /* clear of L03's tracking camera */ src="island_tree_02/island_tree_02.gltf" p={[x, 0.16, AR + 10]} s={1.6} c={WHITE2} />);
  for (const x of [34]) P.push(<WhiteModel key={`lp${x}`} src="street_light.glb" p={[x, 0.16, AR + 9.4]} r={Math.PI} s={1.1} />);
  for (const x of [-26, 20]) P.push(<WhiteModel key={`tp${x}`} src="tele_pole.glb" p={[x, 0.16, AR + 0.5]} s={1.2} />);
  for (let w = 0; w < 0; w++) P.push(<Mesh3d key={`wi${w}`} transform={Transform.fromXyz(-3, 8.4 - w * 0.25, AR + 0.5).withRotation(Quat.fromEuler("XYZ", 0, 0, Math.PI / 2))}><Cylinder radius={0.018} half_height={30} /><Flat c="#8e877c" /></Mesh3d>);
  P.push(<Mesh3d key="umb" transform={Transform.fromXyz(-9.5, 2.5, AR + 9.6)} shape={sob().umbrella}><Flat c={WHITE} /></Mesh3d>);
  P.push(<B key="stall" p={[-9.5, 0.6, AR + 9.6]} s={[1.8, 0.9, 1.0]}><Flat c={WHITE} /></B>);
  P.push(<Mesh3d key="pole" transform={Transform.fromXyz(-9.5, 1.4, AR + 9.6)}><Cylinder radius={0.03} half_height={1.2} /><Flat c={WHITE2} /></Mesh3d>);
  for (const [x, z, r] of [[-3.6, 0.8, 0.5], [-3.0, 0.85, -0.3], [-12.4, 0.9, 0.2], [9.8, 0.7, 0.8]] as [number, number, number][])
    P.push(<WhiteModel key={`ch${x}`} src="plastic_monobloc_chair_01/plastic_monobloc_chair_01.gltf" p={[x, 0.12, z]} r={r} />);
  for (let c = 0; c < 3; c++) P.push(<WhiteModel key={`cr${c}`} src="plastic_crate_01/plastic_crate_01.gltf" p={[-6.6, 0.12 + c * 0.29, 0.6]} r={c * 0.2} />);
  for (const x of [-14.6, -5.1, 9.78]) P.push(<WhiteModel key={`pp${x}`} src="potted_plant_02/potted_plant_02.gltf" p={[x, 0.12, x === -5.1 ? 0.55 : AR - 0.35]} s={1.3} c={WHITE2} />);
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
  // EX40: no people (user 2026-11-13: "remove the person")
  return <>{P}</>;
}


// ================= EX44 film: time hangs on the user's words (tl.json); setups, sets, camera, captions as EX39 =================
const FPS = 30, OFF = 0, RFPS = 30, HUD = false;     // HUD: setup number + timecode (animatic only)
const CAPS = (TL as any).caps as { L: string; w: string; key: boolean; t: number }[];
const DUR = (TL as any).dur as number, FRAMES = Math.round(DUR * RFPS);
const W = (i: number) => CAPS[i].t;
let T = 0;
const cl = (x: number) => Math.max(0, Math.min(1, x));
const ss = (t: number, a: number, b: number) => { const u = cl((t - a) / (b - a)); return u * u * (3 - 2 * u); };
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
const rnd = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const rotY = (r: number) => Quat.fromEuler("XYZ", 0, r, 0);
const lin = (a: number, b: number) => cl((T - a) / (b - a));
const sm = (a: number, b: number) => ss(T, a, b);
const on = (i: number, d = 0.3, off = 0) => ss(T, W(i) + off, W(i) + off + d);
const mixHex = (a: string, b: string, u: number) => { const h = (s: string, i: number) => parseInt(s.slice(1 + i * 2, 3 + i * 2), 16); return "#" + [0, 1, 2].map((i) => Math.round(lerp(h(a, i), h(b, i), u)).toString(16).padStart(2, "0")).join(""); };
const sc3 = (s: number) => { const v = Math.max(0.001, s); return [v, v, v] as [number, number, number]; };
const TX = (n: string) => S(`tx/${n}.png`);
const YEL = "#ffd800", YHOT = "#ffd24a", MAR = "#6e1f1c", BG = "#0d0e11", WARM = "#ffc77a";
// setup k (1-based) runs ST[k-1] .. ST[k]   (word indices: episode.md § Shot list v1, re-timed to the user's voice)
const ST = [0, W(11) - 0.1, W(13) - 0.12, W(23) - 0.1, W(25) - 0.1, W(29) - 0.1, W(32) - 0.12, W(41) - 0.12, W(47) - 0.1, W(54) - 0.12, W(63) - 0.1, W(67) - 0.12, W(77) - 0.1, W(85) - 0.12, W(93) - 0.1, DUR];
const NSET = ST.length - 1;

// ================= parts =================
let SO40: any = null;
const so40 = () => (SO40 ??= (() => {
  const rev = (pts: number[][]) => crossSection.polygon(pts as any).revolve({ segments: 64 }).rotate(-90, 0, 0);
  return {
    patty: rev([[0, 0], [0.046, 0], [0.05, 0.004], [0.05, 0.010], [0.046, 0.014], [0, 0.014]]),
    bunTop: rev([[0, 0], [0.055, 0], [0.056, 0.008], [0.05, 0.025], [0.035, 0.037], [0, 0.042]]),
    bunBot: rev([[0, 0], [0.054, 0], [0.055, 0.012], [0.05, 0.018], [0, 0.018]]),
    egg: rev([[0, 0], [0.058, 0], [0.061, 0.003], [0.057, 0.006], [0, 0.006]]),
  };
})());
const meat = (c = "#5c2f0e") => <StandardMaterial base_color={c} normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([3, 3])} perceptual_roughness={0.6} />;
// a patty lying flat; tilt turns it up to face the camera (rx), glow = the yellow rim (accent)
function Patty({ p, k, rx = 0, ry = 0, sc = 1, glowK = 0 }: { p: number[]; k: string; rx?: number; ry?: number; sc?: number; glowK?: number }) {
  return (
    <Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromEuler("YXZ", ry, rx, 0)).withScale(sc3(sc))}>
      <Mesh3d name={k + "m"} shape={so40().patty}>{meat()}</Mesh3d>
      {[-0.024, 0, 0.024].map((z) => <Mesh3d key={k + "gm" + z} name={k + "gm" + z} transform={Transform.fromXyz(0, 0.0141, z)}><Cuboid half_size={[Math.sqrt(0.0023 - z * z) * 0.9, 0.0004, 0.0025]} /><StandardMaterial base_color="#2a1608" perceptual_roughness={0.8} /></Mesh3d>)}
      {glowK > 0.01 ? <Mesh3d name={k + "g"} transform={Transform.fromXyz(0, 0.007, 0)}><Cylinder radius={0.0505} half_height={0.0015} /><StandardMaterial base_color={YEL} emissive={glow(YHOT, 3 * glowK)} /></Mesh3d> : null}
    </Entity>
  );
}
// the burger, built bottom-up: each layer drops 6 cm onto the stack as its u goes 0 → 1
function Burger({ p, k, u }: { p: number[]; k: string; u: { patty: number; egg: number; cab: number; sauce: number; top: number } }) {
  const P: any[] = [], drop = (x: number) => (1 - x) * (1 - x) * 0.06;
  P.push(<Mesh3d key={k + "bb"} name={k + "bb"} shape={so40().bunBot} transform={Transform.fromXyz(p[0], p[1], p[2])}><StandardMaterial base_color="#d39048" perceptual_roughness={0.6} /></Mesh3d>);
  if (u.patty > 0.01) P.push(<Patty key={k + "pt"} k={k + "pt"} p={[p[0], p[1] + 0.018 + drop(u.patty), p[2]]} sc={1.06} />);
  if (u.egg > 0.01) P.push(<Mesh3d key={k + "eg"} name={k + "eg"} shape={so40().egg} transform={Transform.fromXyz(p[0], p[1] + 0.031 + drop(u.egg), p[2]).withRotation(rotY(0.6)).withScale([1, 1, 0.92])}><StandardMaterial base_color="#f3dc86" perceptual_roughness={0.5} /></Mesh3d>);
  if (u.cab > 0.01) for (let i = 0; i < 46; i++) { const a = rnd(i) * 6.283, r = Math.sqrt(rnd(i * 3)) * 0.05, y = p[1] + 0.039 + rnd(i * 5) * 0.006 + drop(cl(u.cab * 1.4 - rnd(i * 7) * 0.4));
    P.push(<Mesh3d key={k + "c" + i} name={k + "c" + i} transform={Transform.fromXyz(p[0] + Math.cos(a) * r, y, p[2] + Math.sin(a) * r).withRotation(Quat.fromEuler("YXZ", rnd(i * 11) * 3.14, (rnd(i * 13) - 0.5) * 0.4, 0))}><Cuboid half_size={[0.016, 0.0012, 0.0022]} /><StandardMaterial base_color={i % 3 ? "#9fc46a" : "#7fae4c"} perceptual_roughness={0.55} /></Mesh3d>); }
  if (u.sauce > 0.01) [["#b8321f", 0], ["#f2ead2", 0.012]].forEach(([c, o]: any, j) => { for (let s = 0; s < 7; s++) { const x0 = -0.042 + s * 0.012, z0 = (s % 2 ? 0.03 : -0.03) + o, x1 = x0 + 0.012, z1 = (s % 2 ? -0.03 : 0.03) + o, L = Math.hypot(x1 - x0, z1 - z0) * cl(u.sauce * 7 - s);
    if (L > 0.001) P.push(<Mesh3d key={k + "s" + j + s} name={k + "s" + j + s} transform={Transform.fromXyz(p[0] + x0 + (x1 - x0) * cl(u.sauce * 7 - s) / 2, p[1] + 0.048 + j * 0.001, p[2] + z0 + (z1 - z0) * cl(u.sauce * 7 - s) / 2).lookingAt([p[0] + x1, p[1] + 0.048 + j * 0.001, p[2] + z1])}><Cuboid half_size={[0.0018, 0.0016, L / 2]} /><StandardMaterial base_color={c} perceptual_roughness={0.3} /></Mesh3d>); } });
  if (u.top > 0.01) { const y = p[1] + 0.05 + drop(u.top);
    P.push(<Mesh3d key={k + "bt"} name={k + "bt"} shape={so40().bunTop} transform={Transform.fromXyz(p[0], y, p[2])}><StandardMaterial base_color="#cd8436" perceptual_roughness={0.5} /></Mesh3d>);
    for (let i = 0; i < 26; i++) { const a = rnd(i + 40) * 6.283, r = Math.sqrt(rnd(i + 70)) * 0.044, h = 0.042 * Math.sqrt(Math.max(0, 1 - (r / 0.057) ** 2));
      P.push(<Mesh3d key={k + "se" + i} name={k + "se" + i} transform={Transform.fromXyz(p[0] + Math.cos(a) * r, y + h, p[2] + Math.sin(a) * r).withRotation(rotY(a)).withScale([1.6, 0.6, 1])}><Sphere radius={0.0024} /><StandardMaterial base_color="#f3e6c4" perceptual_roughness={0.5} /></Mesh3d>); } }
  return <>{P}</>;
}
// a flat card with a picture; children ride on it in the card's own x/y
function Card({ p, size, tex, rx = 0, ry = 0, rz = 0, em = 0, sc = 1, k, children, blend = false, unlit = false }: { p: number[]; size: number[]; tex: string; rx?: number; ry?: number; rz?: number; em?: number; sc?: number; k: string; children?: any; blend?: boolean; unlit?: boolean }) {
  return (
    <Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromEuler("YXZ", ry, rx, rz)).withScale(sc3(sc))}>
      <Mesh3d name={k} pass={unlit ? "ui" : undefined}><Cuboid half_size={[size[0] / 2, size[1] / 2, 0.0012]} />
        <StandardMaterial base_color_texture={TX(tex)} emissive={glow("#ffffff", em)} emissive_texture={TX(tex)} perceptual_roughness={0.75} alpha_mode={blend ? "Blend" : "Opaque"} unlit={unlit} /></Mesh3d>
      {children}
    </Entity>
  );
}
// a yellow line that draws on from the left, on a card (u0..u1, v: fractions of the card's picture)
function Under({ size, u0, u1, v, a, k }: { size: number[]; u0: number; u1: number; v: number; a: number; k: string }) {
  const len = (u1 - u0) * size[0], x0 = (u0 - 0.5) * size[0];
  return <Mesh3d name={k} transform={Transform.fromXyz(x0 + (len * Math.max(a, 0.001)) / 2, (0.5 - v) * size[1], 0.0016).withScale([Math.max(a, 0.001), 1, 1])}><Cuboid half_size={[len / 2, 0.0016, 0.0003]} /><StandardMaterial base_color={YEL} emissive={glow(YHOT, 2.4)} /></Mesh3d>;
}
// a picture that writes in from the left on a card (value text on the form)
function WriteIn({ size, cx, cy, w, h, tex, a, k }: { size: number[]; cx: number; cy: number; w: number; h: number; tex: string; a: number; k: string }) {
  const x = (cx - 0.5) * size[0] - (w * size[0]) / 2, ww = w * size[0] * Math.max(a, 0.001);
  return <Mesh3d name={k} transform={Transform.fromXyz(x + ww / 2, (0.5 - cy) * size[1], 0.0015).withScale([Math.max(a, 0.001), 1, 1])}><Cuboid half_size={[(w * size[0]) / 2, (h * size[1]) / 2, 0.0002]} /><StandardMaterial base_color_texture={TX(tex)} alpha_mode="Blend" perceptual_roughness={0.8} /></Mesh3d>;
}
// split-flap price: `prev` → `price` (same length) as fl goes 0 → 1
function Sign({ p, ry = 0, price, prev, fl = 1, tilt = -0.14, k, sc = 1, em = 0.85, unlit = false }: { p: number[]; ry?: number; price: string; prev?: string; fl?: number; tilt?: number; k: string; sc?: number; em?: number; unlit?: boolean }) {
  const ch = (c: string) => (c === "." ? "dot" : c === "+" ? "plus" : c === " " ? "sp" : c);
  const now = ["rm", ...price.split("").map(ch)], old = ["rm", ...(prev ?? price).split("").map(ch)];
  const WD = now.map((c) => (c === "dot" ? 0.02 : 0.034)), gap = 0.004, total = WD.reduce((a, b) => a + b, 0) + gap * (WD.length - 1);
  let x = -total / 2;
  return (
    <Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromEuler("YXZ", ry, tilt, 0)).withScale(sc3(sc))}>
      <Mesh3d transform={Transform.fromXyz(0, 0.045, 0)}><Cuboid half_size={[total / 2 + 0.012, 0.04, 0.013]} /><StandardMaterial base_color="#131417" perceptual_roughness={0.4} /></Mesh3d>
      {now.map((c1, i) => { const w = WD[i]; const cx = x + w / 2; x += w + gap;
        const li = old[i] === c1 ? 1 : cl(fl * 1.5 - (i - 1) * 0.12), c = li < 0.5 ? old[i] : c1, sy = Math.max(0.03, Math.abs(Math.cos(Math.PI * li)));
        return (
          <Mesh3d key={k + i + c} name={k + i + c} pass={unlit ? "ui" : undefined} transform={Transform.fromXyz(cx, 0.045, 0.0135).withScale([1, sy, 1])}><Cuboid half_size={[w / 2, 0.03, 0.0012]} />
            <StandardMaterial base_color_texture={TX("flap_" + c)} emissive={glow("#ffffff", em)} emissive_texture={TX("flap_" + c)} perceptual_roughness={0.45} unlit={unlit} /></Mesh3d>); })}
    </Entity>
  );
}
// the patty pack (6 × 70 g, the user's Jaya Grocer photo on the front); x = 0 solid … 1 x-ray with the six patties inside
const PW = 0.2, PKH = 0.25, PD = 0.035;
function Pack({ p, ry = 0, rx = 0, x = 0, k, sc = 1, glowK = 0 }: { p: number[]; ry?: number; rx?: number; x?: number; k: string; sc?: number; glowK?: number }) {
  const al = lerp(1, 0.07, x);
  return (
    <Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromEuler("YXZ", ry, rx, 0)).withScale(sc3(sc))}>
      <Mesh3d name={k + "b"} transform={Transform.fromXyz(0, PKH / 2, 0)}><Cuboid half_size={[PW / 2, PKH / 2, PD / 2]} />{x > 0 ? <StandardMaterial base_color={Srgba.hex("#e9ecf5").with_alpha(al)} alpha_mode="Blend" perceptual_roughness={0.25} /> : <StandardMaterial base_color="#e9ecf5" perceptual_roughness={0.25} />}</Mesh3d>
      {x < 0.98 ? <Mesh3d name={k + "f"} transform={Transform.fromXyz(0, PKH / 2, PD / 2 + 0.0004)}><Cuboid half_size={[PW / 2, PKH / 2, 0.0004]} />{x > 0 ? <StandardMaterial base_color={Srgba.hex("#ffffff").with_alpha(1 - x)} alpha_mode="Blend" base_color_texture={TX("pack_front")} perceptual_roughness={0.45} /> : <StandardMaterial base_color_texture={TX("pack_front")} perceptual_roughness={0.45} />}</Mesh3d> : null}
      {x > 0.02 ? [0, 1, 2, 3, 4, 5].map((i) => <Patty key={k + "q" + i} k={k + "q" + i} p={[(i % 2 ? 0.045 : -0.045), 0.05 + Math.floor(i / 2) * 0.075, 0.007]} rx={Math.PI / 2} sc={0.82} glowK={glowK} />) : null}
      {x > 0.02 ? [0, 1, 2].flatMap((ax) => [-1, 1].flatMap((a) => [-1, 1].map((b) => { const H = [PW / 2, PKH / 2, PD / 2], o = [0, PKH / 2, 0], idx = [0, 1, 2].filter((i) => i !== ax); o[idx[0]] += a * H[idx[0]]; o[idx[1]] += b * H[idx[1]];
        const hs = [0.0012, 0.0012, 0.0012]; hs[ax] = H[ax];
        return <Mesh3d key={k + "e" + ax + a + b} name={k + "e" + ax + a + b} transform={Transform.fromXyz(o[0], o[1], o[2])}><Cuboid half_size={hs as any} /><StandardMaterial base_color={YEL} emissive={glow(YHOT, 2.2 * x)} /></Mesh3d>; }))) : null}
    </Entity>
  );
}
// the stall: the library cart (its coffee things hidden), a griddle, the yellow-and-maroon canopy with the logo, the tube light
const CT = 1.057;                                 // cart top: Bottom_Cart max y in CoffeeCart_01.gltf
function Stall({ o, ry = 0, real = 1, canopy = 1, lamp = 1, k = "st" }: { o: number[]; ry?: number; real?: number; canopy?: number; lamp?: number; k?: string }) {
  const tint = mixHex("#4a4c54", "#b9bdc5", real), P: any[] = [];
  P.push(<Model key={k + "cart"} src={S("CoffeeCart_01/CoffeeCart_01.gltf")} position={[0, 0, 0]}>
    <StandardMaterial material="CoffeeCart_01_cart" base_color={tint} />
    <StandardMaterial material="CoffeeCart_01_props" base_color={Srgba.hex("#000000").with_alpha(0)} alpha_mode="Blend" />
    <StandardMaterial material="CoffeeCart_01_mugs" base_color={Srgba.hex("#000000").with_alpha(0)} alpha_mode="Blend" />
  </Model>);
  P.push(<Mesh3d key={k + "gr"} transform={Transform.fromXyz(-0.3, CT + 0.012, 0.15)}><Cuboid half_size={[0.32, 0.012, 0.2]} /><StandardMaterial base_color={mixHex("#3a3c41", "#26272b", real)} metallic={0.55} perceptual_roughness={0.35} /></Mesh3d>);
  if (canopy > 0.01) { const h = lerp(CT + 0.02, 2.3, canopy), cs = Math.max(0.001, canopy);
    for (const [px, pz] of [[-0.66, -0.2], [0.76, -0.2], [-0.66, 0.5], [0.76, 0.5]]) P.push(<Mesh3d key={k + "po" + px + pz} name={k + "po" + px + pz} transform={Transform.fromXyz(px, (CT + h) / 2, pz).withScale([1, Math.max(0.001, (h - CT) / 1.3), 1])}><Cylinder radius={0.014} half_height={0.65} /><StandardMaterial base_color="#c9ccd1" metallic={0.5} perceptual_roughness={0.35} /></Mesh3d>);
    P.push(<Mesh3d key={k + "rf"} name={k + "rf"} transform={Transform.fromXyz(0.05, h, 0.15).withScale([cs, 1, cs])}><Cuboid half_size={[0.86, 0.02, 0.56]} /><StandardMaterial base_color_texture={TX("stripes")} perceptual_roughness={0.7} emissive={glow("#ffffff", 0.12 * lamp)} emissive_texture={TX("stripes")} /></Mesh3d>);
    P.push(<Mesh3d key={k + "va"} name={k + "va"} transform={Transform.fromXyz(0.05, h - 0.13, 0.715).withScale([cs, cs, 1])}><Cuboid half_size={[0.86, 0.12, 0.004]} /><StandardMaterial base_color_texture={TX("valance")} emissive={glow("#ffffff", 0.35 * lamp)} emissive_texture={TX("valance")} perceptual_roughness={0.6} /></Mesh3d>);
    P.push(<Mesh3d key={k + "tb"} name={k + "tb"} transform={Transform.fromXyz(0.05, h - 0.05, 0.15).withScale([cs, 1, 1])}><Cuboid half_size={[0.5, 0.012, 0.012]} /><StandardMaterial base_color="#fff4dc" emissive={glow("#fff1d6", 7 * lamp)} /></Mesh3d>);
    P.push(<Card key={k + "mn"} k={k + "mn"} p={[0.35, lerp(CT, 1.5, canopy), -0.19]} size={[0.36, 0.48]} tex="menu" em={0.35 * lamp} sc={cs} />); }
  // what's on the cart: buns, eggs, two sauce bottles, patties on the griddle
  if (real > 0.5) {
    for (let i = 0; i < 4; i++) P.push(<Mesh3d key={k + "bn" + i} shape={so40().bunTop} transform={Transform.fromXyz(0.55 + (i % 2) * 0.12, CT + 0.002 + Math.floor(i / 2) * 0.0, -0.08 + Math.floor(i / 2) * 0.12)}><StandardMaterial base_color="#cd8436" perceptual_roughness={0.5} /></Mesh3d>);
    for (let e = 0; e < 6; e++) P.push(<Mesh3d key={k + "eg" + e} transform={Transform.fromXyz(0.15 + (e % 3) * 0.05, CT + 0.025, -0.12 + Math.floor(e / 3) * 0.055).withScale([1, 1.25, 1])}><Sphere radius={0.022} /><StandardMaterial base_color="#f2ecdf" perceptual_roughness={0.5} /></Mesh3d>);
    for (const [bx, c] of [[0.02, "#b8321f"], [0.08, "#f2ead2"]] as [number, string][]) P.push(<Mesh3d key={k + "sb" + bx} transform={Transform.fromXyz(bx, CT + 0.1, -0.05)}><Cylinder radius={0.025} half_height={0.09} /><StandardMaterial base_color={c} perceptual_roughness={0.35} /></Mesh3d>);
  }
  return <Entity key={k} transform={Transform.fromXyz(o[0], o[1], o[2]).withRotation(rotY(ry))}>{P}</Entity>;
}

// ================= sets (EX44: price a nasi lemak — Bahasa Melayu; costing-sheet UI + food macro) =================
const INK = "#1C2430", PAPER = "#EEF1F4", TEAL = "#1F6F78", SAMBAL = "#B8321F", LEAF = "#2d6a36", ICE = "#8EC9F0", GOLD = "#E8B53A", FLAG = "#D6452E";
const PS = "'Public Sans', 'Helvetica Neue', Arial, sans-serif";
const eo = (x: number) => 1 - Math.pow(1 - cl(x), 5);                                   // strong ease-out ≈ cubic-bezier(0.23, 1, 0.32, 1)
const onO = (i: number, d = 0.3, off = 0) => eo((T - (W(i) + off)) / d);
// ---------- the food: a banana leaf on a stall counter; each ingredient drops in on its word ----------
const VT = [300, 0, 0], TY = 0.9, LF = [VT[0], TY + 0.004, VT[2]], LT = TY + 0.0085;    // LT: the leaf's top face
const drop = (u: number) => (1 - u) * (1 - u) * 0.12;
const lay = (yaw: number, tilt = 0) => Quat.fromEuler("YXZ", yaw, 0, Math.PI / 2 + tilt);   // a capsule (along y) laid on its side, axis turned by yaw, raised by tilt
const kraft = () => <StandardMaterial base_color="#a8794a" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([4, 4])} perceptual_roughness={0.92} />;
// the getah: a red rubber band round the packet, hugging the four paper faces (bkPaper's local units)
const getah = (k: string) => { const y = 0.028, w = 0.07 * (1 - y / 0.085) + 0.0012, m = <StandardMaterial base_color="#c8323c" perceptual_roughness={0.45} />;
  return [[w, 0, 0.0014, w], [-w, 0, 0.0014, w], [0, w, w, 0.0014], [0, -w, w, 0.0014]].map(([x, z, hx, hz], i) =>
    <Mesh3d key={k + i} name={k + i} transform={Transform.fromXyz(x, y, z)}><Cuboid half_size={[hx, 0.0016, hz]} />{m}</Mesh3d>); };
const PTAGS: [string, number, number, number][] = [["beras", -0.051, 0.085, 21], ["santan", -0.017, 0.085, 22], ["telur", 0.017, 0.085, 24], ["bilis", 0.051, 0.085, 25],
  ["kacang", -0.051, -0.075, 27], ["timun", -0.017, -0.075, 28], ["sambal", 0.017, -0.075, 29], ["bungkus", 0.051, -0.075, 31]];   // [tex, dx, dz (camera-facing rows: front, behind the rice), the word it lands on]
function Food({ n }: { n: number }) {
  const P: any[] = [];
  P.push(<Mesh3d key="ct" transform={Transform.fromXyz(VT[0], TY - 0.02, VT[2])}><Cuboid half_size={[0.9, 0.02, 0.6]} /><StandardMaterial base_color="#6b4a2e" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([3, 1])} perceptual_roughness={0.6} /></Mesh3d>);
  P.push(<Mesh3d key="fl" transform={Transform.fromXyz(VT[0], -0.02, VT[2])}><Cuboid half_size={[5, 0.02, 5]} /><StandardMaterial base_color="#14181f" perceptual_roughness={0.8} /></Mesh3d>);
  // the banana leaf: waxy, a pale midrib and the fine parallel veins that make it read as daun pisang
  const V: any[] = [<Mesh3d key="leaf" shape={sob().bkLeaf} transform={Transform.fromXyz(0, 0, 0).withScale([1.9, 0.6, 1.9])}><StandardMaterial base_color={LEAF} perceptual_roughness={0.28} /></Mesh3d>,
    <Mesh3d key="mrib" transform={Transform.fromXyz(0, 0.0074, 0).withRotation(lay(0))}><Capsule3d radius={0.0022} half_length={0.18} /><StandardMaterial base_color="#a9c27a" perceptual_roughness={0.35} /></Mesh3d>];
  for (let i = 0; i < 31; i++) { const s = -0.165 + i * 0.011, L = Math.sqrt(Math.max(0, 0.185 ** 2 - s * s)) * 0.92;
    V.push(<Mesh3d key={"vn" + i} transform={Transform.fromXyz(s, 0.0073, 0).withRotation(rotY(0.12))}><Cuboid half_size={[0.0005, 0.00025, L]} /><StandardMaterial base_color="#3f7d45" perceptual_roughness={0.3} /></Mesh3d>); }
  P.push(<Entity key="leafset" transform={Transform.fromXyz(LF[0], TY + 0.001, LF[2]).withRotation(rotY(0.3))}>{V}</Entity>);
  // which ingredients are on the leaf, by time (the loop shots 1 and 15 show the full packet)
  const paper = n === 1 ? 1 - ss(T, W(4) - 0.35, W(4) + 0.75) : n === 15 ? ss(T, W(94) - 0.3, W(94) + 0.7) : 0;
  // 1 and 15: under the closed packet nothing shows; the food lands as the paper lifts off (and leaves as it closes in 15)
  const cf = n === 1 || n === 15 ? ss(1 - paper, 0.2, 0.75) : 1;
  const full = n === 1 || n >= 12, at = (i: number) => (full ? cf : n < 3 ? 0 : onO(i, 0.35, -0.25));
  const rice = at(21), san = at(22), egg = full ? cf : n >= 4 ? 1 : 0, bil = n >= 5 || full ? at(25) : 0, kac = n >= 5 || full ? at(27) : 0, tim = n >= 5 || full ? at(28) : 0, smb = n >= 6 || full ? at(29) : 0;
  if (rice > 0.01) { const y0 = TY + 0.006 + drop(rice);
    P.push(<Mesh3d key="rice" name="rice" transform={Transform.fromXyz(LF[0], y0, LF[2]).withScale([1, 0.5, 1])}><Sphere radius={0.07} /><StandardMaterial base_color="#e3d9c2" perceptual_roughness={0.7} /></Mesh3d>);
    for (let i = 0; i < 420; i++) { const a = rnd(i + 200) * 6.283, q = Math.sqrt(rnd(i + 400)) * 0.97, r = q * 0.07, k = Math.sqrt(Math.max(0.02, 1 - q * q));
      const h = 0.035 * k, slope = Math.atan(0.5 * q / k), radial = i % 3 === 0, yaw = radial ? -a : rnd(i * 7) * 6.283;   // a third follow the slope, the rest lie any way
      P.push(<Mesh3d key={"rg" + i} name={"rg" + i} transform={Transform.fromXyz(LF[0] + Math.cos(a) * r, y0 + h - 0.0006, LF[2] + Math.sin(a) * r).withRotation(lay(yaw, radial ? -slope : (rnd(i * 3) - 0.5) * 0.5))}>
        <Capsule3d radius={0.0017} half_length={0.0029} /><StandardMaterial base_color={i % 4 ? "#f4efe3" : "#ebe2cd"} perceptual_roughness={0.42} /></Mesh3d>); } }
  if (san > 0.01) P.push(<Mesh3d key="san" name="san" transform={Transform.fromXyz(LF[0], TY + 0.013, LF[2]).withScale([1.02, 0.55 * san, 1.02])}><Sphere radius={0.074} /><StandardMaterial base_color={Srgba.hex("#f6ead0").with_alpha(0.2)} alpha_mode="Blend" perceptual_roughness={0.1} /></Mesh3d>);
  if (egg > 0.01) { const u = n === 4 ? onO(24, 0.35, -0.25) : full ? egg : 1, e = [LF[0] + 0.07, TY + 0.012 + drop(u), LF[2] + 0.05];
    P.push(<Mesh3d key="egw" name="egw" transform={Transform.fromXyz(e[0], e[1], e[2]).withScale([1, 0.55, 1.25])}><Sphere radius={0.026} /><StandardMaterial base_color="#f6f3ec" perceptual_roughness={0.3} /></Mesh3d>);
    P.push(<Mesh3d key="egy" name="egy" transform={Transform.fromXyz(e[0], e[1] + 0.011, e[2]).withScale([1, 0.4, 1.05])}><Sphere radius={0.0145} /><StandardMaterial base_color="#f0a21a" perceptual_roughness={0.45} /></Mesh3d>); }
  // ikan bilis: slim golden fish, piled; kacang: skin-on fried peanuts, reddish brown
  if (bil > 0.01) for (let i = 0; i < 22; i++) { const a = rnd(i) * 6.28, r = rnd(i * 3) * 0.026;
    P.push(<Mesh3d key={"bl" + i} name={"bl" + i} transform={Transform.fromXyz(LF[0] - 0.075 + Math.cos(a) * r, LT + 0.0018 + rnd(i * 5) * 0.004 * (1 - r / 0.03) + drop(cl(bil * 1.3 - rnd(i) * 0.3)), LF[2] + 0.06 + Math.sin(a) * r).withRotation(lay(a * 3, (rnd(i * 9) - 0.5) * 0.4))}>
      <Capsule3d radius={0.0015} half_length={0.0058} /><StandardMaterial base_color={i % 3 ? "#c9964f" : "#b07d3c"} perceptual_roughness={0.38} /></Mesh3d>); }
  if (kac > 0.01) for (let i = 0; i < 16; i++) { const a = rnd(i + 30) * 6.28, r = rnd(i * 5) * 0.02;
    P.push(<Mesh3d key={"kc" + i} name={"kc" + i} transform={Transform.fromXyz(LF[0] - 0.085 + Math.cos(a) * r, LT + 0.0035 + rnd(i + 8) * 0.003 + drop(cl(kac * 1.3 - rnd(i + 3) * 0.3)), LF[2] - 0.04 + Math.sin(a) * r).withRotation(rotY(a * 2)).withScale([1.15, 0.85, 0.9])}>
      <Sphere radius={0.004} /><StandardMaterial base_color={["#8a4a2c", "#9c5a36", "#b06a42"][i % 3]} perceptual_roughness={0.32} /></Mesh3d>); }
  if (tim > 0.01) for (let i = 0; i < 3; i++) { const p = [LF[0] + 0.09 - i * 0.012, LT + 0.0026 + i * 0.002 + drop(tim), LF[2] - 0.05 + i * 0.012];
    P.push(<Mesh3d key={"tr" + i} name={"tr" + i} transform={Transform.fromXyz(p[0], p[1], p[2])}><Cylinder radius={0.017} half_height={0.0025} /><StandardMaterial base_color="#2f5f2c" perceptual_roughness={0.35} /></Mesh3d>);
    P.push(<Mesh3d key={"tf" + i} name={"tf" + i} transform={Transform.fromXyz(p[0], p[1] + 0.0004, p[2])}><Cylinder radius={0.0148} half_height={0.0025} /><StandardMaterial base_color="#dfe9b8" perceptual_roughness={0.3} /></Mesh3d>);
    P.push(<Mesh3d key={"ts" + i} name={"ts" + i} transform={Transform.fromXyz(p[0], p[1] + 0.0006, p[2])}><Cylinder radius={0.0075} half_height={0.0025} /><StandardMaterial base_color="#c9d79a" perceptual_roughness={0.3} /></Mesh3d>); }
  // sambal: a glossy dark-red spoonful with chilli and onion bits in it
  if (smb > 0.01) { const sy = TY + 0.03 + drop(smb);
    P.push(<Mesh3d key="smb" name="smb" transform={Transform.fromXyz(LF[0] + 0.01, sy, LF[2] - 0.02).withScale([1, 0.45, 1])}><Sphere radius={0.03} /><StandardMaterial base_color="#a3200f" perceptual_roughness={0.16} /></Mesh3d>);
    for (let i = 0; i < 12; i++) { const a = rnd(i + 60) * 6.28, r = Math.sqrt(rnd(i + 70)) * 0.024, h = 0.0135 * Math.sqrt(Math.max(0, 1 - (r / 0.03) ** 2));
      P.push(<Mesh3d key={"sf" + i} name={"sf" + i} transform={Transform.fromXyz(LF[0] + 0.01 + Math.cos(a) * r, sy + h, LF[2] - 0.02 + Math.sin(a) * r).withScale([1.4, 0.5, 1])}><Sphere radius={0.0022} /><StandardMaterial base_color={i % 3 ? "#d4552a" : "#5c140a"} perceptual_roughness={0.2} /></Mesh3d>); } }
  // the paper, folded up over the packet (unwraps in 1, closes again in 15)
  if (paper > 0.01) { const u = 1 - paper;     // the paper lifts up and tips away, whole (no shrinking)
    // it slides back and up, away from the lens (the camera sits above and in front, +z): never towards it
    P.push(<Entity key="pkt" transform={Transform.fromXyz(LF[0] - 0.04 * u, TY + 0.002 + 0.1 * u, LF[2] - 0.45 * u).withRotation(Quat.fromEuler("YXZ", 0.3 + 0.3 * u, -0.6 * u, 0.1 * u)).withScale([1.7, 1.6, 1.7])}>
      <Mesh3d name="ppr" shape={sob().bkPaper} transform={Transform.fromXyz(0, 0, 0)}>{kraft()}</Mesh3d>{getah("pg")}</Entity>); }
  // 3 and 5: a price tag stands where each ingredient will land (in on "Kira harga setiap bahan"); it bows out as its food lands
  if (n === 3 || n === 5) PTAGS.forEach(([k, dx, dz, wi], i) => { const inn = n === 5 ? 1 : eo((T - (W(15) + i * 0.13)) / 0.35), out = 1 - eo((T - (W(wi) - 0.3)) / 0.3), s = inn * out;
    if (s > 0.01) P.push(<Card key={"pt" + k} k={"pt" + k} p={[LF[0] + dx, TY + (dz < 0 ? 0.058 : 0.03) + (1 - inn) * 0.03, LF[2] + dz]} size={[0.032, 0.02]} tex={"pt_" + k} rx={-0.55} ry={-0.15} em={0.3} sc={s} />); });
  // 12: the stall: more packets, the price card
  if (n === 12) { for (let i = 0; i < 6; i++) P.push(<Entity key={"bk" + i} transform={Transform.fromXyz(VT[0] - 0.42 + (i % 3) * 0.14, TY, VT[2] - 0.22 - Math.floor(i / 3) * 0.13).withRotation(rotY(i)).withScale([1.4, 1.3, 1.4])}><Mesh3d name={"bkp" + i} shape={sob().bkPaper} transform={Transform.fromXyz(0, 0, 0)}>{kraft()}</Mesh3d>{getah("g" + i)}</Entity>);
    P.push(<Card key="tag" k="tag" p={[LF[0] + 0.2, TY + 0.06, LF[2] + 0.08]} size={[0.13, 0.081]} tex="tag368" ry={-0.35} rx={-0.25} em={0.35} sc={onO(76, 0.3, -0.25)} />); }
  return (<>{P}
    <SpotLight transform={Transform.fromXyz(VT[0] - 0.3, TY + 0.9, VT[2] + 0.55).lookingAt([VT[0], TY, VT[2]])} intensity={15000} outer_angle={0.7} inner_angle={0.3} color="#ffe2b8" shadow_maps_enabled range={4} />
    <RectLight transform={Transform.fromXyz(VT[0] + 0.7, TY + 0.8, VT[2] - 0.4).lookingAt([VT[0], TY, VT[2]])} intensity={9000} width={1.2} height={0.5} color="#b9c9e6" range={4} />
    <PointLight transform={Transform.fromXyz(VT[0] - 0.6, TY + 0.5, VT[2] - 0.8)} intensity={4000} color="#ffb867" range={3} />
    <AmbientLight brightness={30} color="#9fb0d0" />
    <Environment src={S("sky.hdr")} intensity={0.15} />
  </>);
}

// ---------- the interfaces (Bahasa Melayu): the hawker's own tools, on a banana-leaf green ground ----------
// receipt = the costing sheet (prints as the rows are said) · a ruler slider · a shop calculator with an LCD · the price tag split.
// Type: IBM Plex Mono (the receipt), Anton (big numbers), DSEG7 (the LCD), Public Sans (labels). Kunyit yellow marks the
// choice being made, sambal red the money that matters.
const MONO = "'Plex Mono', Menlo, monospace", ANT = "Anton, Impact, sans-serif", LCDF = "DSEG7, monospace";
const GRD = "#173020", GRD2 = "#0e1f15", RCPT = "#FBF9F3", RINK = "#22261f", KUNYIT = "#F2B705", MUTE = "#b8cbb9";
const TAB = { fontVariantNumeric: "tabular-nums" } as const;
const ROWS44 = [["Beras", "100 g", 0.32, 21], ["Santan", "25 g", 0.25, 22], ["Telur", "½ biji", 0.25, 24], ["Ikan bilis*", "10 g", 0.30, 25], ["Kacang", "10 g", 0.09, 27], ["Timun", "20 g", 0.09, 28], ["Sambal", "campuran", 0.21, 29], ["Pembungkus*", "kertas + daun", 0.10, 31]] as [string, string, number, number][];
const zig = (c: string) => ({ height: 22, backgroundImage: `linear-gradient(135deg, ${c} 50%, transparent 50%), linear-gradient(225deg, ${c} 50%, transparent 50%)`, backgroundSize: "44px 22px", backgroundRepeat: "repeat-x" });
function Sheet({ n }: { n: number }) {
  const shown = (r: [string, string, number, number], i: number) => n >= 7 ? 1 : n === 4 ? (i < 2 ? 1 : i === 2 ? onO(24, 0.3, -0.2) : 0) : n === 6 ? (i < 3 ? 1 : i < 6 ? onO(28, 0.3, -0.6 + (i - 3) * 0.18) : onO(r[3], 0.3, -0.2)) : 0;
  const tot = n === 7 ? eo(lin(ST[6] + 0.3, W(40) + 0.2)) : 1, total = 1.61 * tot;
  return (<div style={{ position: "absolute", left: 80, top: 300, width: 920 }}>
    {/* the printer's mouth the receipt hangs from */}
    <div style={{ height: 34, borderRadius: 17, background: "#0b1710", boxShadow: "inset 0 6px 10px rgba(0,0,0,0.7), 0 2px 0 rgba(255,255,255,0.06)" }} />
    <div style={{ margin: "-16px 30px 0", boxSizing: "border-box", background: RCPT, color: RINK, fontFamily: MONO, padding: "44px 44px 26px", boxShadow: "0 30px 60px rgba(0,0,0,0.45)" }}>
      <div style={{ textAlign: "center", fontSize: 44, fontWeight: 700, letterSpacing: 2 }}>KOS SEBUNGKUS</div>
      <div style={{ textAlign: "center", fontSize: 30, color: "#5f6459", marginTop: 6 }}>nasi lemak · contoh resipi</div>
      <div style={{ borderTop: "3px dashed #b9b6aa", margin: "26px 0 8px" }} />
      {ROWS44.map((r, i) => { const v = shown(r, i); if (v < 0.01) return null;
        return (<div key={i} style={{ maxHeight: 70 * v, overflow: "hidden", opacity: cl(v * 1.4), padding: `${11 * v}px 0` }}>
          <div style={{ display: "flex", alignItems: "baseline", fontSize: 40, fontWeight: 700 }}>
            <span>{r[0]}</span><span style={{ fontSize: 28, fontWeight: 500, color: "#6c7065", marginLeft: 16 }}>{r[1]}</span><span style={{ flex: 1, margin: "0 14px", borderBottom: "4px dotted #c9c5b8", transform: "translateY(-10px)" }} /><span style={TAB}>{r[2].toFixed(2)}</span></div></div>); })}
      {n >= 7 ? <div style={{ borderTop: "3px dashed #b9b6aa", marginTop: 14, paddingTop: 18, display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <span style={{ fontSize: 44, fontWeight: 700 }}>JUMLAH</span>
        <span style={{ fontFamily: ANT, fontSize: 120, lineHeight: 1, color: SAMBAL, ...TAB }}>RM{total.toFixed(2)}</span></div> : null}
      <div style={{ fontSize: 28, color: "#5f6459", marginTop: 18, lineHeight: 1.35 }}>Harga: PriceCatcher (KPDN), Okt 2026,<br />median nasional · * anggaran</div>
    </div>
    <div style={{ margin: "0 30px", ...zig(RCPT) }} />
  </div>);
}
function Slider({ n }: { n: number }) {
  const band = n === 9 ? onO(49, 0.4, -0.2) : 0, k = n === 8 ? 0.2 + 0.15 * onO(44, 0.7, -0.2) : 0.35;
  const X0 = 30, WR = 860, X = (p: number) => X0 + (p / 0.6) * WR;
  const ticks = Array.from({ length: 13 }, (_, i) => i * 0.05);
  return (<div style={{ position: "absolute", left: 80, top: 400, width: 920, fontFamily: PS, color: "#fff" }}>
    <div style={{ fontSize: 58, fontWeight: 700 }}>Kos makanan</div>
    <div style={{ fontSize: 36, color: MUTE, marginTop: 8 }}>bahagian harga yang pergi ke bahan</div>
    <div style={{ fontFamily: ANT, fontSize: 280, lineHeight: 1, color: KUNYIT, marginTop: 40, ...TAB }}>{Math.round(k * 100)}%</div>
    <div style={{ position: "relative", height: 260, marginTop: 40 }}>
      {/* the 30–35 % band most restaurants aim for */}
      <div style={{ position: "absolute", left: X(0.30), top: 20, width: X(0.35) - X(0.30), height: 150, borderRadius: 12, background: KUNYIT, opacity: 0.28 * band }} />
      <div style={{ position: "absolute", left: X(0.30) - 120, top: -44, width: 400, textAlign: "center", fontSize: 34, fontWeight: 700, color: KUNYIT, opacity: band, transform: `translateY(${(1 - band) * 12}px)` }}>kebanyakan restoran</div>
      <div style={{ position: "absolute", left: X0, top: 82, width: WR, height: 22, borderRadius: 11, background: "#2a4a35" }} />
      <div style={{ position: "absolute", left: X0, top: 82, width: X(k) - X0, height: 22, borderRadius: 11, background: "#e9efe4" }} />
      {ticks.map((p, i) => <div key={i} style={{ position: "absolute", left: X(p) - 2, top: i % 2 ? 124 : 116, width: 4, height: i % 2 ? 18 : 30, background: "#7f9a84" }} />)}
      {ticks.filter((_, i) => i % 2 === 0).map((p) => <div key={p} style={{ position: "absolute", left: X(p) - 40, top: 160, width: 80, textAlign: "center", fontSize: 32, color: MUTE, ...TAB }}>{Math.round(p * 100)}</div>)}
      <div style={{ position: "absolute", left: X(k) - 38, top: 55, width: 76, height: 76, boxSizing: "border-box", borderRadius: 38, background: "#fff", border: `8px solid ${KUNYIT}`, boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }} />
    </div>
    <div style={{ fontSize: 30, color: MUTE, marginTop: 10 }}>Panduan industri restoran, bukan peraturan</div>
  </div>);
}
// the calculator: keys pressed on the spoken numbers; the LCD shows exactly what a real one would
const KEYS = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "−", "0", ".", "=", "+"];
function Calc({ n }: { n: number }) {
  const second = n === 11;
  const seq: [string, number][] = second
    ? [..."1.61÷0.3="].map((c, i) => [c, ST[10] + 0.12 + i * 0.1] as [string, number])
    : [..."1.61"].map((c, i) => [c, W(57) + i * 0.16] as [string, number]).concat([["÷", W(58) + 0.05]], [..."0.35"].map((c, i) => [c, W(59) + i * 0.16] as [string, number]), [["=", W(60)]]);
  const done = seq.filter(([, t]) => T >= t), typed = done.map(([c]) => c).join("");
  const eq = typed.endsWith("="), last = typed.split("÷").pop() || "";
  const lcd = eq ? (second ? "5.371428" : "4.6") : (last.replace("=", "") || "0");
  const expr = typed.includes("÷") ? typed.replace("÷", " ÷ ").replace("=", " =") : "";
  const ans = second ? onO(66, 0.35, -0.25) : onO(62, 0.35, -0.25);
  return (<div style={{ position: "absolute", left: 130, top: 330, width: 820 }}>
    <div style={{ boxSizing: "border-box", borderRadius: 64, padding: "48px 50px 54px", background: "linear-gradient(170deg, #3a3e3b 0%, #262927 60%, #1d201e 100%)", boxShadow: "0 40px 80px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.08)" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginBottom: 26 }}>{[0, 1, 2, 3].map((i) => <div key={i} style={{ width: 54, height: 40, background: "#2b2620", border: "2px solid #4a443a" }} />)}</div>
      <div style={{ position: "relative", height: 270, boxSizing: "border-box", borderRadius: 20, overflow: "hidden", background: "linear-gradient(180deg, #a9b596 0%, #bcc6a8 100%)", boxShadow: "inset 0 8px 18px rgba(0,0,0,0.35)", padding: "22px 34px" }}>
        <div style={{ fontFamily: MONO, fontSize: 40, fontWeight: 700, color: "#2a3322", height: 52, textAlign: "right" }}>{expr}</div>
        <div style={{ position: "absolute", right: 34, bottom: 26, fontFamily: LCDF, fontSize: 104, color: "#1b2216", opacity: 0.07 }}>88888888</div>
        <div style={{ position: "absolute", right: 34, bottom: 26, fontFamily: LCDF, fontSize: 104, color: "#1b2216" }}>{lcd}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22, marginTop: 40 }}>
        {KEYS.map((c) => { const hit = done.filter(([d]) => d === c).map(([, t]) => t).pop(), p = hit !== undefined && T - hit < 0.16 ? 1 - (T - hit) / 0.16 : 0, op = "÷×−+".includes(c), eqk = c === "=";
          return (<div key={c} style={{ height: 116, borderRadius: 26, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: PS, fontSize: 56, fontWeight: 600,
            background: eqk ? KUNYIT : op ? "#4d5550" : "#3d423e", color: eqk ? "#1b1b14" : "#f1f2ec", boxShadow: `0 ${8 - 6 * p}px 0 ${eqk ? "#a67c00" : "#151816"}`,
            transform: `translateY(${6 * p}px) scale(${1 - 0.04 * p})`, filter: `brightness(${1 + 0.35 * p})` }}>{c}</div>); })}
      </div>
    </div>
    {/* the price sticker slapped on when the voice says it */}
    <div style={{ position: "absolute", right: -40, top: 930, width: 360, borderRadius: 14, overflow: "hidden", background: RCPT, boxShadow: "0 18px 40px rgba(0,0,0,0.5)", opacity: ans, transform: `rotate(${-6 + 2 * (1 - ans)}deg) scale(${1.15 - 0.15 * ans})` }}>
      <div style={{ background: SAMBAL, color: "#fff", fontFamily: PS, fontWeight: 700, fontSize: 30, textAlign: "center", padding: "8px 0" }}>{second ? "pada 30%" : "pada 35%"}</div>
      <div style={{ fontFamily: ANT, fontSize: 104, color: RINK, textAlign: "center", lineHeight: 1.25 }}>{second ? "RM5.40" : "RM4.60"}</div>
    </div>
  </div>);
}
function Bar({ n }: { n: number }) {
  const f = n === 13 ? 0.438 * eo(lin(W(80) - 0.2, W(84))) : 0.438, split = n === 14 ? [onO(88, 0.3, -0.2), onO(89, 0.3, -0.2), onO(91, 0.3, -0.2)] : [0, 0, 0];
  const rest = n === 14 ? onO(85, 0.4, -0.1) : 0;
  return (<div style={{ position: "absolute", left: 80, top: 330, width: 920, fontFamily: PS, color: "#fff" }}>
    {/* the stall's price tag, the same card as on the counter */}
    <div style={{ width: 560, margin: "0 auto", borderRadius: 18, overflow: "hidden", background: RCPT, boxShadow: "0 24px 50px rgba(0,0,0,0.45)", transform: "rotate(-2deg)" }}>
      <div style={{ background: SAMBAL, textAlign: "center", fontSize: 40, fontWeight: 700, padding: "12px 0", letterSpacing: 1 }}>NASI LEMAK</div>
      <div style={{ fontFamily: ANT, fontSize: 170, color: RINK, textAlign: "center", lineHeight: 1.2 }}>RM3.68</div>
      <div style={{ textAlign: "center", fontSize: 30, color: "#5f6459", paddingBottom: 18 }}>purata 2024 (DOSM)</div>
    </div>
    <div style={{ fontSize: 40, color: MUTE, marginTop: 70 }}>Ke mana RM3.68 pergi</div>
    <div style={{ position: "relative", marginTop: 22, height: 170, borderRadius: 24, background: "#22402c", overflow: "hidden", display: "flex" }}>
      <div style={{ width: `${f * 100}%`, background: SAMBAL, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ANT, fontSize: 96, ...TAB }}>{f > 0.25 ? `${Math.round(f * 100)}%` : ""}</div>
      {["gas", "sewa", "masa anda"].map((w, i) => <div key={w} style={{ flex: 1, borderLeft: `6px solid ${GRD}`, background: `rgba(242,183,5,${0.22 * split[i]})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 700, color: KUNYIT, textAlign: "center", lineHeight: 1.05, opacity: split[i], transform: `translateY(${(1 - split[i]) * 16}px)` }}>{w}</div>)}
    </div>
    <div style={{ position: "relative", height: 110, marginTop: 18, fontSize: 36, ...TAB }}>
      <div style={{ position: "absolute", left: 0 }}>bahan makanan<br /><b>RM1.61</b></div>
      <div style={{ position: "absolute", right: 0, textAlign: "right", opacity: rest }}>baki<br /><b>RM2.07</b></div>
    </div>
    <div style={{ marginTop: 20, fontSize: 30, color: MUTE }}>RM1.61 ÷ RM3.68 ≈ 44%</div>
  </div>);
}
function Rail({ n }: { n: number }) {
  const R = [["Kira kos bahan", "harga setiap bahan sebungkus"], ["Pilih kos makanan", "berapa peratus untuk bahan"], ["Bahagi", "kos ÷ peratus = harga"], ["Semak", "banding dengan harga pasaran"]];
  return (<div style={{ position: "absolute", left: 100, top: 470, width: 880, fontFamily: PS }}>
    {R.map(([t, s], i) => { const v = onO(11, 0.4, -0.35 + i * 0.09);
      return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 40, padding: "30px 0", borderTop: i ? "2px solid rgba(255,255,255,0.12)" : "none", opacity: v, transform: `translateY(${(1 - v) * 26}px)` }}>
        <div style={{ width: 110, fontFamily: ANT, fontSize: 150, lineHeight: 1, color: KUNYIT, textAlign: "center" }}>{i + 1}</div>
        <div><div style={{ fontSize: 60, fontWeight: 700, color: "#fff" }}>{t}</div><div style={{ fontSize: 34, color: MUTE, marginTop: 6 }}>{s}</div></div></div>); })}
  </div>);
}
function Ui({ n }: { n: number }) {
  const c = SETUPS[n - 1]; if (!c.ui) return null;
  const x = cl((T - ST[n - 1]) / (ST[n] - ST[n - 1])), u = 0.55 * x + 0.45 * ss(x, 0, 1);
  const s = lerp(c.ui.a[0], c.ui.b[0], u), fx = lerp(c.ui.a[1], c.ui.b[1], u), fy = lerp(c.ui.a[2], c.ui.b[2], u);
  const prev = n > 1 ? SETUPS[n - 2].ui : undefined, same = !!prev && prev.screen === c.ui.screen;
  const enter = same ? 1 : eo((T - (ST[n - 1] - 0.05)) / 0.33), blur = (1 - enter) * 10;
  const sc = c.ui.screen, body = sc === "rail" ? <Rail n={n} /> : sc === "sheet" ? <Sheet n={n} /> : sc === "slider" ? <Slider n={n} /> : sc === "calc" ? <Calc n={n} /> : <Bar n={n} />;
  // the ground: banana-leaf green with its fine parallel veins, so the screens and the food shots share one world
  return (<div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: `repeating-linear-gradient(104deg, rgba(255,255,255,0.028) 0px, rgba(255,255,255,0.028) 2px, transparent 2px, transparent 38px), radial-gradient(ellipse at 50% 42%, #24452f 0%, ${GRD} 50%, ${GRD2} 100%)` }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, transformOrigin: "0 0", transform: `translate(${540 - fx * s}px, ${1000 - fy * s}px) scale(${s})`, filter: `blur(${blur}px)`, opacity: 0.4 + 0.6 * enter }}>{body}</div>
  </div>);
}

// ================= the 15 setups =================
type Pose = { p: number[]; l: number[] };
type Tag = { at: number[]; x: number; y: number; cap: string; big?: string; sub?: string; t: number };
type Setup = { set: string; a: Pose; b: Pose; fov?: number; fs?: number; up?: number[]; tr?: "in" | "out" | "side"; fd?: () => number | null; tags?: Tag[];
  count?: { v: () => string; unit: string; t?: number }; note?: string; src?: string; step?: number; ui?: { screen: string; a: number[]; b: number[] } };
const fromT = (l: number[], dir: number[], d: number) => { const k = Math.hypot(dir[0], dir[1], dir[2]); return [l[0] + (dir[0] / k) * d, l[1] + (dir[1] / k) * d, l[2] + (dir[2] / k) * d]; };
const dist3 = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const C = (p: number[], l: number[]): Pose => ({ p, l });
const num = (a: number, b: number, t0: number, t1: number, d = 0) => lerp(a, b, cl((T - t0) / (t1 - t0))).toFixed(d);
const LFC = [LF[0], TY + 0.02, LF[2]];
const P1A = C(fromT(LFC, [0.3, 1.2, 0.9], 0.75), LFC);
const NOCAM = C([VT[0], 3, VT[2] + 3], [VT[0], 0, VT[2]]);
const U = (screen: string, a: number[], b: number[]) => ({ ui: { screen, a, b }, set: "u", a: NOCAM, b: NOCAM });
const SETUPS: Setup[] = [
  /* 1 */ { set: "f", a: P1A, b: C(fromT(LFC, [0.25, 1.3, 0.8], 0.52), LFC), fov: 30, fs: 4 },
  /* 2 */ { ...U("rail", [1.0, 540, 900], [1.04, 540, 880]) },
  /* 3 */ { set: "f", tr: "in", a: C(fromT(LFC, [-0.3, 0.75, 1], 0.7), LFC), b: C(fromT(LFC, [-0.2, 0.65, 1], 0.6), LFC), fov: 26, fs: 4 },
  /* 4 */ { ...U("sheet", [1.0, 540, 900], [1.04, 540, 860]), step: 1 },
  /* 5 */ { set: "f", tr: "in", a: C(fromT([LF[0] - 0.02, TY + 0.01, LF[2]], [0.1, 1.6, 0.6], 0.66), [LF[0] - 0.02, TY + 0.01, LF[2]]), b: C(fromT([LF[0] - 0.02, TY + 0.01, LF[2]], [0.05, 1.7, 0.45], 0.58), [LF[0] - 0.02, TY + 0.01, LF[2]]), fov: 26, fs: 5.6 },
  /* 6 */ { ...U("sheet", [1.0, 540, 900], [1.03, 540, 920]), step: 1 },
  /* 7 */ { ...U("sheet", [1.0, 540, 920], [1.03, 540, 945]), step: 1 },
  /* 8 */ { ...U("slider", [1.0, 540, 900], [1.04, 540, 880]), step: 2 },
  /* 9 */ { ...U("slider", [1.04, 540, 880], [1.08, 540, 860]), step: 2 },
  /* 10 */ { ...U("calc", [1.0, 540, 950], [1.04, 540, 970]), step: 3 },
  /* 11 */ { ...U("calc", [1.0, 540, 980], [1.04, 540, 1000]), step: 3 },
  /* 12 */ { set: "f", tr: "out", a: C(fromT([LF[0] + 0.08, TY + 0.04, LF[2]], [0.6, 0.4, 1], 1.05), [LF[0] + 0.08, TY + 0.04, LF[2]]), b: C(fromT([LF[0] + 0.1, TY + 0.05, LF[2] + 0.03], [0.5, 0.35, 1], 0.92), [LF[0] + 0.1, TY + 0.05, LF[2] + 0.03]), fov: 30, fs: 4, step: 4, src: "Purata 2024: DOSM (Indeks Harga Pengguna)" },
  /* 13 */ { ...U("bar", [1.0, 540, 900], [1.05, 540, 880]), step: 4 },
  /* 14 */ { ...U("bar", [1.05, 540, 880], [1.03, 540, 900]), step: 4 },
  /* 15 */ { set: "f", tr: "in", a: C(fromT(LFC, [0.4, 1.4, 1.1], 0.9), LFC), b: P1A, fov: 30, fs: 4 },
];
function World({ n }: { n: number }) {
  return <Food n={n} />;
}

// ================= camera (EX39: drift inside a setup; flight on the same set; push / pull / slide to another set) =================
type Cam = { p: number[]; l: number[]; fov: number; up: number[]; fs: number; fd: number };
const l3 = (a: number[], b: number[], u: number) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];
function camOf(k: number): Cam {
  const c = SETUPS[k], x = cl((T - ST[k]) / (ST[k + 1] - ST[k])), u = k === NSET - 1 ? ss(x, 0, 0.55) : 0.55 * x + 0.45 * ss(x, 0, 1);
  const p = l3(c.a.p, c.b.p, u), l = l3(c.a.l, c.b.l, u);
  return { p, l, fov: c.fov ?? 30, up: c.up ?? [0, 1, 0], fs: c.fs ?? 2.4, fd: c.fd?.() ?? dist3(p, l) };
}
const mixCam = (a: Cam, b: Cam, w: number): Cam => ({ p: l3(a.p, b.p, w), l: l3(a.l, b.l, w), fov: lerp(a.fov, b.fov, w), up: l3(a.up, b.up, w), fs: lerp(a.fs, b.fs, w), fd: lerp(a.fd, b.fd, w) });
const dolly = (c: Cam, k: number): Cam => ({ ...c, p: l3(c.p, c.l, -k) });
const OUT = 0.2, IN = 0.26;
function filmCam(k: number): { cam: Cam; dark: number; fast: boolean } {
  let cam = camOf(k), dk = 0;
  const same = (i: number) => i >= 0 && i < NSET - 1 && SETUPS[i].set === SETUPS[i + 1].set && !SETUPS[i + 1].tr;
  if (same(k - 1) && T < ST[k] + 0.32) cam = mixCam(camOf(k - 1), cam, sm(ST[k] - 0.2, ST[k] + 0.32));
  else if (same(k) && T > ST[k + 1] - 0.2) cam = mixCam(cam, camOf(k + 1), sm(ST[k + 1] - 0.2, ST[k + 1] + 0.32));
  if (k > 0 && !same(k - 1) && T < ST[k] + IN) { const q = 1 - (T - ST[k]) / IN, tr = SETUPS[k].tr; cam = tr === "side" ? { ...cam, p: [cam.p[0] + q * q * 0.5 * dist3(cam.p, cam.l), cam.p[1], cam.p[2]] } : dolly(cam, tr === "in" ? q * q * 1.6 : -q * q * 0.6); dk = 0.35 * q * q * q; }
  if (k < NSET - 1 && !same(k) && T > ST[k + 1] - OUT) { const q = (T - (ST[k + 1] - OUT)) / OUT, tr = SETUPS[k + 1].tr; cam = tr === "side" ? { ...cam, p: [cam.p[0] - q * q * 0.5 * dist3(cam.p, cam.l), cam.p[1], cam.p[2]] } : dolly(cam, tr === "in" ? -q * q * 0.6 : q * q * 1.6); dk = 0.35 * q * q * q; }
  return { cam, dark: dk, fast: (k > 0 && T < ST[k] + 0.34) || (k < NSET - 1 && T > ST[k + 1] - 0.22) };
}
const projS = (c: Cam, w: number[]) => {
  const sub = (a: number[], b: number[]) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a: number[], b: number[]) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const nrm = (a: number[]) => { const k = Math.hypot(a[0], a[1], a[2]); return [a[0] / k, a[1] / k, a[2] / k]; };
  const fw = nrm(sub(c.l, c.p)), rt = nrm(cross(fw, c.up)), up = cross(rt, fw), d = sub(w, c.p), z = dot(d, fw), k = 960 / Math.tan((c.fov * Math.PI) / 360);
  return { x: 540 + (dot(d, rt) / z) * k, y: 960 - (dot(d, up) / z) * k };
};

// ================= captions (EX39) =================
const FF = "Outfit, 'Inter Display', Inter, 'Helvetica Neue', Arial, sans-serif";
const CT2 = CAPS.map((c, i) => (i + 1 < CAPS.length && CAPS[i + 1].L === c.L && /^(and|the|at|for|to|of|a|its|it|is|in|on|with)$/i.test(c.w) && W(i + 1) - c.t > 0.3 ? W(i + 1) - 2 / FPS : c.t));
const PH: { i0: number; i1: number; t0: number; t1: number }[] = (() => {
  const g: number[][] = []; let cur: number[] = [];
  CAPS.forEach((c, i) => { cur.push(i); const last = i + 1 >= CAPS.length || CAPS[i + 1].L !== c.L; if (/[.,?:…]$/.test(c.w) || cur.length >= 4 || last) { g.push(cur); cur = []; } });
  const m: number[][] = [];
  for (const x of g) { const pv = m[m.length - 1]; if (pv && x.length === 1 && pv.length <= 4 && CAPS[pv[0]].L === CAPS[x[0]].L && !/[.?]$/.test(CAPS[pv[pv.length - 1]].w)) pv.push(x[0]); else m.push(x); }
  return m.map((x, j) => ({ i0: x[0], i1: x[x.length - 1], t0: CT2[x[0]], t1: Math.min(j + 1 < m.length ? CT2[m[j + 1][0]] - 2 / FPS : DUR, W(x[x.length - 1]) + 1.1) }));
})();
const CW = (w: string, bold: boolean) => w.length * (bold ? 36 : 33) + 18;
function Caption() {
  const ph = PH.find((p) => T >= p.t0 - 0.001 && T < p.t1); if (!ph) return null;
  const out = cl((ph.t1 - T) * FPS / 3), ws: number[] = []; for (let i = ph.i0; i <= ph.i1; i++) if (T >= CT2[i] - 0.001) ws.push(i);
  const width = (k: number) => ws.slice(0, k).reduce((a, i) => a + CW(CAPS[i].w, false), 0);
  const prevW = width(ws.length - 1), nowW = width(ws.length), age = cl((T - CT2[ws[ws.length - 1]]) * FPS / 3), wNow = lerp(prevW + CW(CAPS[ws[ws.length - 1]].w, false) * 0.35, nowW, ss(age, 0, 1));
  const BL = "#4f8df7";
  return (
    <div style={{ position: "absolute", top: 172, left: 540 - Math.min(940, wNow) / 2, width: 940, textAlign: "left", fontFamily: FF, fontSize: 66, lineHeight: 1.2, letterSpacing: -0.5, whiteSpace: wNow > 940 ? "normal" : "nowrap", opacity: out < 1 ? 0.25 + 0.75 * out * out : 1 }}>
      {ws.map((i, j) => { const c = CAPS[i], f = (T - CT2[i]) * FPS, fresh = f < 0.99, curr = j === ws.length - 1, b = f - 1, e = cl((b - 1) / 2), sd = cl(b - 3);
        return (
          <span key={i} style={{ display: "inline-block", position: "relative", margin: "0 9px", padding: c.key ? "0 9px" : "0px", background: `rgba(22,35,60,${c.key ? cl(b - 3) : 0})`, fontWeight: curr && !fresh ? 700 : 300, color: curr && !fresh ? "#ffffff" : "#c9ccd2", transform: `translateY(${fresh ? 7 : 0}px)`, filter: `blur(${fresh ? 5 : 0}px)`, opacity: fresh ? 0.7 : 1 }}>
            {c.key && b >= 0 ? <>
              <span style={{ position: "absolute", left: 0, top: 0, height: 2, width: `${e * 100}%`, background: BL }} />
              <span style={{ position: "absolute", left: 0, bottom: 0, height: 2, width: `${e * 100}%`, background: BL }} />
              <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: BL, opacity: sd }} />
              <span style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 2, background: BL, opacity: sd }} />
              <span style={{ position: "absolute", left: -6, top: -6, width: 12, height: 12, borderRadius: 6, background: BL }} />
              <span style={{ position: "absolute", right: -6, bottom: -6, width: 12, height: 12, borderRadius: 6, background: BL }} />
            </> : null}
            <span style={{ position: "relative" }}>{c.w}</span>
          </span>); })}
    </div>
  );
}

// ================= overlay =================
const fade = (t: number, d = 0.2) => ss(T, t, t + d);
const LOGO = (h: number) => null;   // no brand in a how-to about public tools
function Overlay({ n, cam, still }: { n: number; cam: Cam; still?: boolean }) {
  const c = SETUPS[n - 1], t0 = ST[n - 1], t1 = ST[n];
  const life = still ? 1 : fade(t0 + 0.12) * (1 - ss(T, t1 - 0.2, t1 - 0.04));
  const end = n === NSET ? fade(ST[NSET - 1] + 0.2, 0.25) : 0, logoEnd = n === NSET ? fade(DUR - 2.6, 0.4) : 0, h0 = n === 1 ? 1 - sm(ST[1] - 0.25, ST[1] - 0.05) : 0;
  const BIG = { position: "absolute", left: 60, top: 1290, fontFamily: FF, fontWeight: 800, fontSize: 80, lineHeight: 1.06, letterSpacing: -1.5, color: "#ffffff", textShadow: "0 2px 18px rgba(0,0,0,0.9)" } as any;
  return (<>
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 470, background: "linear-gradient(#0d0e11 34%, rgba(13,14,17,0))" }} />
    <div style={{ position: "absolute", left: 0, top: 1480, width: 1080, height: 440, background: "linear-gradient(rgba(13,14,17,0), #0d0e11 70%)" }} />
    {c.src ? <div style={{ position: "absolute", left: 60, top: 372, display: "flex", alignItems: "center", gap: 12, fontFamily: FF, fontSize: 32, fontWeight: 500, color: "#e6e8ec", opacity: life * fade(t0 + 0.2, 0.3) }}>{LOGO(34)}<span>{c.src}</span></div> : null}
    {c.count ? <div style={{ position: "absolute", left: 44, top: 430, padding: "8px 16px 10px", borderRadius: 10, background: "rgba(13,14,17,0.62)", fontFamily: FF, color: "#ffffff", opacity: life * fade(c.count.t ?? t0 + 0.15), transform: `translateY(${(1 - fade(c.count.t ?? t0 + 0.15)) * 14}px)` }}><div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -2, lineHeight: 1 }}>{c.count.v()}</div><div style={{ fontSize: 30, fontWeight: 400, color: "#c9ccd2", marginTop: 4 }}>{c.count.unit}</div></div> : null}
    {(c.tags ?? []).map((g, i) => { const a = life * fade(g.t, 0.22); if (a < 0.01) return null; const q = projS(cam, g.at), ly = g.y < q.y ? g.y + (g.big ? 112 : 44) : g.y - 8, x1 = g.x + 50, d = fade(g.t, 0.3); return (
      <div key={i} style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, opacity: a }}>
        <svg style={{ position: "absolute", left: 0, top: 0 }} width={1080} height={1920}><line x1={q.x} y1={q.y} x2={lerp(q.x, x1, d)} y2={lerp(q.y, ly, d)} stroke="#ffffff" strokeWidth={2} opacity={0.75} /><circle cx={q.x} cy={q.y} r={5} fill="#ffffff" /></svg>
        <div style={{ position: "absolute", left: g.x, top: g.y, fontFamily: FF, color: "#ffffff", textShadow: "0 2px 14px rgba(0,0,0,0.9)", opacity: fade(g.t + 0.12, 0.2), transform: `translateY(${(1 - fade(g.t + 0.12, 0.2)) * 10}px)` }}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 4 }}>{g.cap}</div>
          {g.big ? <div style={{ fontSize: 54, fontWeight: 600, letterSpacing: -0.5, marginTop: 2 }}>{g.big}</div> : null}
          {g.sub ? <div style={{ fontSize: 27, fontWeight: 400, color: "#c3c6cc", marginTop: 4 }}>{g.sub}</div> : null}
        </div>
      </div>); })}
    {c.step ? <div style={{ position: "absolute", left: 60, top: 1520, display: "flex", gap: 12, fontFamily: FF, opacity: still ? 1 : fade(t0 + 0.05, 0.2) }}>{["KIRA", "KOS MAKANAN", "BAHAGI", "SEMAK"].map((w, i) => { const lit = n === 16 || c.step === i + 1, done = (c.step ?? 0) > i + 1;
      return <div key={i} style={{ padding: "8px 14px", borderRadius: 8, background: lit ? YEL : done ? "rgba(255,216,0,0.22)" : "rgba(255,255,255,0.08)", color: lit ? "#17181b" : done ? "#ffd800" : "#8a8d93", fontSize: 26, fontWeight: 700, letterSpacing: 2 }}>{i + 1} · {w}</div>; })}</div> : null}
    {c.note ? <div style={{ position: "absolute", left: 60, top: 1630, width: 960, fontFamily: FF, fontSize: 33, fontWeight: 400, color: "#b9bcc2", opacity: life }}>{c.note}</div> : null}
    {h0 > 0.01 ? <div style={{ ...BIG, top: 1180, opacity: h0 }}>
      <div style={{ marginBottom: 22 }}>{LOGO(120)}</div>
      Harga sebenar<br />nasi lemak<br /><span style={{ color: SAMBAL }}>anda?</span></div> : null}
    {end > 0.01 ? <div style={{ ...BIG, top: 1330, opacity: end * (1 - logoEnd), transform: `translateY(${(1 - end) * 14}px)` }}>Anda jual<br /><span style={{ color: SAMBAL }}>berapa?</span></div> : null}
    {logoEnd > 0.01 ? <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: `rgba(13,14,17,${0.98 * logoEnd})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img src={S("meikigo-logo.png")} style={{ height: 300, opacity: logoEnd, transform: `scale(${0.94 + 0.06 * logoEnd})` }} /></div> : null}
  </>);
}
const FACE = `@font-face { font-family: "Outfit"; src: url(${S("fonts/Outfit.ttf")}); font-weight: 100 900; } @font-face { font-family: "Public Sans"; src: url(${S("fonts/PublicSans.ttf")}); font-weight: 100 900; } @font-face { font-family: "Anton"; src: url(${S("fonts/Anton.ttf")}); } @font-face { font-family: "Plex Mono"; src: url(${S("fonts/PlexMono.ttf")}); font-weight: 500; } @font-face { font-family: "Plex Mono"; src: url(${S("fonts/PlexMonoB.ttf")}); font-weight: 700; } @font-face { font-family: "DSEG7"; src: url(${S("fonts/DSEG7.ttf")}); }`;
function Frame({ n, cam, dk, still, fast }: { n: number; cam: Cam; dk: number; still?: boolean; fast?: boolean }) {
  const d = dist3(cam.p, cam.l), street = SETUPS[n - 1].set === "s";
  return (
    <AbsoluteFill style={{ background: BG }}>
      <style>{FACE}</style>
      <Camera3d transform={Transform.fromXyz(cam.p[0], cam.p[1], cam.p[2]).lookingAt(cam.l as any, cam.up as any)} projection={{ Perspective: { fov: (cam.fov * Math.PI) / 180 } }}>
        <DepthOfField focal_distance={cam.fd} aperture_f_stops={cam.fs} mode="Gaussian" max_circle_of_confusion_diameter={lerp(14, 48, ss(d, 0.55, 0.95))} />
      </Camera3d>
      {fast ? <MotionBlur shutterAngle={1} samples={6} /> : null}
      <Bloom intensity={0.6} threshold={0.9} />
      <AmbientOcclusion quality="high" />
      <ToneMapping mode="agx" exposure={0.65} />   {/* effects are fixed at a render's first frame (raea): brightness per setup lives in the lights */}
      <Grade temperature={0.0} vignette={0.28} midtones={{ saturation: 1.05, contrast: 1.12, gamma: 1, gain: 1, lift: 0 }} />
      <World n={n} />
      <Ui n={n} />
      <Overlay n={n} cam={cam} still={still} />
      <Caption />
      <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: BG, opacity: dk }} />
      {HUD ? <div style={{ position: "absolute", right: 24, bottom: 24, padding: "6px 14px", borderRadius: 8, background: "#ffd400", color: "#000", fontFamily: "Menlo, monospace", fontSize: 40, fontWeight: 700 }}>S{n} · {Math.floor(T / 60)}:{(T % 60).toFixed(1).padStart(4, "0")}</div> : null}
    </AbsoluteFill>
  );
}
function Film() {
  T = (useCurrentFrame() + OFF) / RFPS;
  let k = 0; while (k < NSET - 1 && T >= ST[k + 1]) k++;
  const { cam, dark: dk, fast } = filmCam(k);
  return <Frame n={k + 1} cam={cam} dk={dk} fast={fast} />;
}
// the board: one frame per setup, when its events have landed
const BT = SETUPS.map((_, k) => (k === 0 ? 0.9 : k === NSET - 1 ? ST[NSET - 1] + 1.0 : ST[k + 1] - 0.22));
function Board() {
  const k = useCurrentFrame(); T = BT[k];
  return <Frame n={k + 1} cam={camOf(k)} dk={0} still />;
}
registerRoot(() => <><Composition id="film" component={Film} width={1080} height={1920} fps={RFPS} durationInFrames={FRAMES} /><Composition id="board" component={Board} width={1080} height={1920} fps={FPS} durationInFrames={NSET} /><Composition id="cammap" component={CamMap} width={1080} height={1920} fps={FPS} durationInFrames={SETUPS.map((s) => s.set).filter((s, i, a) => a.indexOf(s) === i).length} /></>);

// ================= camera map (review tool, RECIPE-D § 8.1): one page per set, seen from above =================
// Each setup's camera path (start ○ → end ▶, sampled through its drift), a thin line to where it looks, the setup number,
// and a table: time, lens, height and distance start → end, and the move in words. Needs SETUPS, ST, camOf, NSET, dist3.
// Render: raea render film44.tsx --composition cammap -o media/_cm   (one PNG per set)
const SETNAMES: Record<string, string> = { f: "Food", u: "Interface" };
const SETORDER = SETUPS.map((s) => s.set).filter((s, i, a) => a.indexOf(s) === i);
const PAL = ["#ff5a5a", "#ffb03a", "#f5e663", "#7be37b", "#4fd2e8", "#6f8cff", "#c57bff", "#ff7bd1"];
function movesOf(k: number) {
  const c = SETUPS[k], a = c.a, b = c.b, da = dist3(a.p, a.l), db = dist3(b.p, b.l), w: string[] = [];
  const ang = (p: number[], l: number[]) => Math.atan2(p[0] - l[0], p[2] - l[2]) * 180 / Math.PI;
  const el = (p: number[], l: number[]) => Math.atan2(p[1] - l[1], Math.hypot(p[0] - l[0], p[2] - l[2])) * 180 / Math.PI;
  const dAz = ((ang(b.p, b.l) - ang(a.p, a.l) + 540) % 360) - 180, dEl = el(b.p, b.l) - el(a.p, a.l), dd = (db - da) / da, dl = dist3(a.l, b.l);
  if (Math.abs(dd) > 0.04) w.push(`${dd < 0 ? "push in" : "pull out"} ${Math.abs(dd * 100).toFixed(0)}%`);
  if (Math.abs(dAz) > 3) w.push(`orbit ${dAz > 0 ? "→" : "←"} ${Math.abs(dAz).toFixed(0)}°`);
  if (Math.abs(dEl) > 3) w.push(`${dEl > 0 ? "crane up" : "crane down"} ${Math.abs(dEl).toFixed(0)}°`);
  if (dl > 0.15 * da) w.push("look-at travels");
  if (c.fd) w.push("rack focus");
  if (c.up && Math.abs(c.up[0]) + Math.abs(c.up[2]) > 0.05 && Math.abs(c.up[1]) > 0.5) w.push("tilted horizon");
  if (!w.length) w.push("drift");
  return { w: w.join(", "), da, db, ha: a.p[1], hb: b.p[1], el: el(a.p, a.l) };
}
function CamMap() {
  const set = SETORDER[useCurrentFrame()] ?? SETORDER[0], ks = SETUPS.map((s, k) => k).filter((k) => SETUPS[k].set === set);
  // sample each camera path through its own setup time (the film's drift; flights between setups are not drawn)
  const paths = ks.map((k) => { const pts: number[][] = []; for (let i = 0; i <= 12; i++) { T = lerp(ST[k], ST[k + 1] - 1e-3, i / 12); const c = camOf(k); pts.push([c.p[0], c.p[2], c.l[0], c.l[2]]); } return pts; });
  const xs = paths.flat().flatMap((p) => [p[0], p[2]]), zs = paths.flat().flatMap((p) => [p[1], p[3]]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), z0 = Math.min(...zs), z1 = Math.max(...zs), span = Math.max(x1 - x0, z1 - z0, 0.2) * 1.15;
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, S_ = 960 / span, X = (x: number) => 540 + (x - cx) * S_, Y = (z: number) => 600 + (z - cz) * S_;
  const fmt = (t: number) => `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, "0")}`;
  return (
    <AbsoluteFill style={{ background: "#111214", fontFamily: "Menlo, monospace", color: "#e6e6e6" }}>
      <div style={{ position: "absolute", left: 50, top: 40, fontSize: 44, fontWeight: 700 }}>Camera map · {SETNAMES[set] ?? set}</div>
      <div style={{ position: "absolute", left: 50, top: 100, fontSize: 24, color: "#9a9da4" }}>from above · ○ start ▶ end · dashed = where it looks · grid {(span / 8).toFixed(2)} m</div>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1080} height={1920}>
        {[...Array(9)].map((_, i) => <line key={"gx" + i} x1={60 + i * 120} y1={120} x2={60 + i * 120} y2={1080} stroke="#24262b" />)}
        {[...Array(9)].map((_, i) => <line key={"gy" + i} x1={60} y1={120 + i * 120} x2={1020} y2={120 + i * 120} stroke="#24262b" />)}
        {paths.map((pts, j) => { const col = PAL[ks[j] % PAL.length], e = pts[pts.length - 1], s0 = pts[0], ang = Math.atan2(Y(e[1]) - Y(pts[10][1]), X(e[0]) - X(pts[10][0]));
          return (<g key={j}>
            <line x1={X(e[0])} y1={Y(e[1])} x2={X(e[2])} y2={Y(e[3])} stroke={col} strokeWidth={1.5} strokeDasharray="6 6" opacity={0.6} />
            <circle cx={X(e[2])} cy={Y(e[3])} r={5} fill={col} opacity={0.7} />
            <polyline points={pts.map((p) => `${X(p[0])},${Y(p[1])}`).join(" ")} fill="none" stroke={col} strokeWidth={5} />
            <circle cx={X(s0[0])} cy={Y(s0[1])} r={10} fill="none" stroke={col} strokeWidth={3} />
            <polygon points={[0, 1, 2].map((q) => { const a = ang + [0, 2.5, -2.5][q], r = q ? 16 : 0; return `${X(e[0]) + (q ? Math.cos(a) * r : Math.cos(ang) * 6)},${Y(e[1]) + (q ? Math.sin(a) * r : Math.sin(ang) * 6)}`; }).join(" ")} fill={col} />
            <text x={X(s0[0]) + 14} y={Y(s0[1]) - 12} fill={col} fontSize={30} fontWeight={700}>{ks[j] + 1}</text>
          </g>); })}
      </svg>
      <div style={{ position: "absolute", left: 40, top: 1110, width: 1010, fontSize: 21, lineHeight: 1.45, whiteSpace: "pre-wrap" }}>
        <div style={{ color: "#9a9da4" }}>{"#   time         lens height m   dist m      move"}</div>
        {ks.map((k) => { const m = movesOf(k), c = SETUPS[k];
          return <div key={k} style={{ color: PAL[k % PAL.length] }}>{`${String(k + 1).padEnd(3, " ")} ${fmt(ST[k])}–${fmt(ST[k + 1])}  ${String(c.fov ?? 30).padStart(2, " ")}° ${m.ha.toFixed(2)}→${m.hb.toFixed(2)}  ${m.da.toFixed(2)}→${m.db.toFixed(2)}  ${m.w}${c.tr ? ` (arrives: ${c.tr})` : ""}`}</div>; })}
      </div>
    </AbsoluteFill>
  );
}
