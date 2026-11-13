// EX37 Hari 1/30 — Nasi lemak, Style A (art-direction-A.md; WORKING-RULES §1; from the EX29 baseline via EX31's street).
// The dark model world; the one real-coloured subject is the nasi lemak stall (the warm light); the token is the bungkus.
// Assembled by build/assemble.py from ex37_base.part.tsx (EX31's street) + ex37_pieces.part.tsx + ex37_film.part.tsx.
import { AbsoluteFill, Composition, Easing, Img, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { AmbientOcclusion, Bloom, DepthOfField, Environment, Fog, FogVolume, Grade, ImagePlane, Model, Text3D, ToneMapping, VolumetricFog, manifold, type Solid } from "raea/3d";
import { Cuboid, Cylinder, Sphere, Mesh3d } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { AmbientLight, DirectionalLight, PointLight, RectLight, Shadows, SpotLight } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
import { Affine2 } from "raea/math";
import { LinearRgba, Srgba } from "raea/color";
import CAPS from "./caps60.json";
import VO from "../audio/vo_timeline.json";
import { Captions, type CapBlock } from "../../../tools/raea/kit/Captions";

const S = (p: string) => staticFile(p);
const FPS = 60;                                 // 60 fps from 2026-11-11 (EX35 rule)
const k = (t: number, a: number, b: number, e = Easing.inOut(Easing.cubic)) => interpolate(t, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
const L3 = (a: number[], b: number[], u: number): [number, number, number] => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];
const glow = (hex: string, k: number) => LinearRgba.from(Srgba.hex(hex)).mul(k);
const W = 4.6;                                  // shophouse width
const UNITS = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
const SIGN_RISE = { v: 0 }, SHUT0 = { v: 2.8 };   // SHUT0: unit 0's shutter (rolls up for L04's kitchen cutaway)   // set per frame by Film: how far every shop's signboard has risen (L02: the +29 % level)
const DIY = 99, SPD = 99;                       // no featured shop: the nasi lemak stall (a stall, not a unit) is the subject
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
  // the bungkus: a brown-paper pyramid (folded square, apex up) and its banana-leaf skirt (irregular, flat)
  bkPaper: manifold.hull([[-0.07, 0, -0.07], [0.07, 0, -0.07], [0.07, 0, 0.07], [-0.07, 0, 0.07], [0.008, 0.085, -0.006]]),
  bkLeaf: manifold.hull([[-0.1, 0, -0.06], [-0.03, 0, -0.11], [0.08, 0, -0.095], [0.11, 0, 0.01], [0.06, 0, 0.1], [-0.05, 0, 0.105], [-0.11, 0, 0.03],
                         [-0.1, 0.012, -0.06], [0.08, 0.012, -0.095], [0.06, 0.012, 0.1], [-0.11, 0.012, 0.03]]),
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
  P.push(<B key="sg" p={[cx, 4.05 + SIGN_RISE.v, 2.32]} s={[W - 0.5, 0.62, 0.1]}>
    <Flat c={diy ? "#d92128" : spd ? "#2c2e34" : ["#2a2c33", "#33302d", "#2a313c"][((i % 3) + 3) % 3]} r={0.45} e={diy ? glow("#ff2a2a", 2.6) : undefined} /></B>);
  // L05 "Part three: you pick": three shops to the right light a "?" on their signboards, one by one
  if (false) { const on = k(TNOW, [33.45, 34.35, 34.5][i - 1], [33.75, 34.65, 34.8][i - 1]);
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
    P.push(<Shutter key="shut" id={`sh${i}`} x={cx} w={W - 0.9} h={i === 0 ? SHUT0.v : spd ? 1.55 : 2.8} z={0.3} c={spd ? "#4e5058" : "#3e4047"} />);
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
  for (const [x, f] of [[-15, 0], [-11.5, 0], [13, 0]] as [number, number][])   /* the car at x 6 blocked the stall */ P.push(<WhiteModel key={`car${x}`} src="car_b.glb" p={[x, 0, AR + 1.75]} r={Math.PI / 2 + f} s={1.0} />);
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
  // people hold poses (house rule): MPFB figures, faceless, charcoal clay
  for (const [src, x, z, r] of [["s_m30", 0.7, 2.6, 2.4], ["s_f25", 3.9, 1.6, -2.6], ["s_m50", -9.0, AR + 9.0, 0.3], ["s_f35", -8.3, AR + 9.4, -2.4], ["s_m30", -4.2, 0.75, 0.9], ["s_f25", 10.8, AR + 9.6, -0.4]] as [string, number, number, number][])
    P.push(<Model key={`pp${src}${x}`} src={S(`people/${src}.glb`)} position={[x, 0.12, z]} rotation={[0, r, 0]}><StandardMaterial base_color="#55585f" perceptual_roughness={0.7} /></Model>);
  return <>{P}</>;
}


// =====================================================================================================================
// EX37 pieces — the nasi lemak stall (the one real-coloured subject, the warm light), its price board, the inflation
// level along the signboards, the mamak's board, the town's "average" plane. Times from audio/vo_timeline.json (Nathan).
// =====================================================================================================================
const WT = (VO as any).words as Record<string, [string, number][]>;
const at = (L: string, frag: string, n = 0) => WT[L].filter((x) => x[0].toLowerCase().includes(frag.toLowerCase()))[n][1];
const TT = {
  y2011: at("L01", "2011"), now: at("L01", "Now"), p368: at("L01", "RM3.68"), infl: at("L02", "Inflation"), p29: at("L02", "29"),
  p81: at("L03", "81"), roti: at("L03", "Roti"), p71: at("L03", "71"), avg: at("L06", "average"), yours: at("L06", "yours"),
  its: at("L04", "Its"), p739: at("L04", "RM7.39"), p1154: at("L04", "RM11.54"), in5: at("L05", "In"), half: at("L05", "half"), inf6: at("L06", "Inflation"),
  still: at("L07", "Still"), more: at("L08", "more"),
};
const SX = 2.3, SZ = 3.3;                    // the stall: on the road shoulder in front of unit 0, facing the street (+z)
const LEAF = "#3e7b4f", PAPERC = "#e7d7b8", SAMBAL = "#a3321f", RED = "#d9452b", WARM = "#ffc77a";
const Y0 = 2.6, PER = 0.05;                  // price boards start at 2.6 m; 5 cm per percentage point → +29 % lands on the signboard line (4.05)
const lvl = (pct: number) => Y0 + pct * PER;
const Txt = ({ s, p, size, c = "#1b1d22", rx = 0, ry = 0, name }: { s: string; p: [number, number, number]; size: number; c?: string; rx?: number; ry?: number; name?: string }) =>
  <Mesh3d name={name} castShadow={false} transform={Transform.fromXyz(...p).withRotation(Quat.fromEuler("XYZ", rx, ry, 0))}><Text3D size={size} depth={0.01}>{s}</Text3D><StandardMaterial base_color={c} unlit /></Mesh3d>;

// one bungkus: banana leaf skirt, brown-paper pyramid, a crease
function Bungkus({ p, r = 0, id }: { p: [number, number, number]; r?: number; id: string }) {
  return <>
    <Mesh3d key={`${id}l`} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromRotationY(r + 0.4))} shape={so().bkLeaf}><Flat c={LEAF} r={0.6} /></Mesh3d>
    <Mesh3d key={`${id}p`} transform={Transform.fromXyz(p[0], p[1] + 0.011, p[2]).withRotation(Quat.fromRotationY(r))} shape={so().bkPaper}><Flat c={PAPERC} r={0.85} /></Mesh3d>
  </>;
}

function Stall({ t }: { t: number }) {
  const P: any[] = [];
  P.push(<Model key="tb" src={S("small_wooden_table_01/small_wooden_table_01.gltf")} position={[SX, 0.0, SZ]} scale={[1.6, 1.25, 1.3]} />);
  const top = 0.95;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) P.push(<Bungkus key={`bk${r}${c}`} id={`bk${r}${c}`} p={[SX - 0.45 + c * 0.19, top, SZ + 0.15 - r * 0.17]} r={(r * 4 + c) * 0.37} />);
  P.push(<Model key="pot" src={S("pot_enamel_01/pot_enamel_01.gltf")} position={[SX + 0.55, top, SZ - 0.05]} scale={[2.2, 2.2, 2.2]} />);   // rice
  P.push(<Model key="pot2" src={S("pot_enamel_01/pot_enamel_01.gltf")} position={[SX + 0.55, top, SZ + 0.32]} scale={[1.4, 1.4, 1.4]} />);   // sambal
  P.push(<Mesh3d key="smb" transform={Transform.fromXyz(SX + 0.55, top + 0.13, SZ + 0.32)}><Cylinder radius={0.075} half_height={0.01} /><Flat c={SAMBAL} r={0.5} /></Mesh3d>);
  P.push(<Model key="th" src={S("plastic_thermos/plastic_thermos.gltf")} position={[SX - 0.7, top, SZ - 0.25]} scale={[1.4, 1.4, 1.4]} />);
  P.push(<Model key="wb" src={S("wicker_basket_01/wicker_basket_01.gltf")} position={[SX - 0.2, top, SZ - 0.44]} scale={[0.9, 0.9, 0.9]} />);
  for (let e = 0; e < 6; e++) P.push(<Mesh3d key={`eg${e}`} transform={Transform.fromXyz(SX - 0.29 + (e % 3) * 0.05, top + 0.09, SZ - 0.47 + Math.floor(e / 3) * 0.06).withScale([1, 1.25, 1])}><Sphere radius={0.025} /><Flat c="#f2ecdf" r={0.5} /></Mesh3d>);
  P.push(<Model key="gas" src={S("small_lpg_tank/small_lpg_tank.gltf")} position={[SX - 1.05, 0.0, SZ - 0.35]} scale={[1.2, 1.2, 1.2]} />);
  P.push(<Model key="cb" src={S("wooden_cutting_board/wooden_cutting_board.gltf")} position={[SX - 0.2, top, SZ + 0.35]} scale={[1.2, 1.2, 1.2]} />);
  // the canopy: a big stall umbrella on a pole; the bulb hangs under it (the warm light of the street)
  P.push(<Mesh3d key="umb" transform={Transform.fromXyz(SX, 2.55, SZ)} shape={so().umbrella}><StandardMaterial base_color="#2f7a5a" perceptual_roughness={0.7} /></Mesh3d>);
  for (let s = 0; s < 8; s++) P.push(<B key={`us${s}`} p={[SX + Math.cos(s * Math.PI / 4) * 0.62, 2.28, SZ + Math.sin(s * Math.PI / 4) * 0.62]} s={[0.05, 0.02, 1.25]} rot={[0.42, -s * Math.PI / 4 + Math.PI / 2, 0]}><Flat c="#f2ece0" r={0.7} /></B>);
  P.push(<Mesh3d key="upole" transform={Transform.fromXyz(SX + 0.95, 1.3, SZ + 0.05)}><Cylinder radius={0.025} half_height={1.3} /><Flat c="#7a7d84" r={0.4} /></Mesh3d>);
  P.push(<Mesh3d key="bulb" transform={Transform.fromXyz(SX, 2.05, SZ)}><Sphere radius={0.06} /><StandardMaterial base_color="#fff3d6" emissive={glow("#ffd59a", 18)} /></Mesh3d>);
  P.push(<Mesh3d key="cord" transform={Transform.fromXyz(SX, 2.3, SZ)}><Cylinder radius={0.005} half_height={0.22} /><Flat c="#222" /></Mesh3d>);
  // seats: two red plastic stools, a wooden one
  for (const [x, z, r, red] of [[SX - 1.25, SZ + 0.5, 0.4, 1], [SX + 1.35, SZ + 0.7, -0.5, 1], [SX - 1.0, SZ - 0.5, 0.9, 0]] as [number, number, number, number][])
    P.push(red ? <Model key={`st${x}`} src={S("plastic_monobloc_chair_01/plastic_monobloc_chair_01.gltf")} position={[x, 0.0, z]} rotation={[0, r, 0]}><StandardMaterial base_color="#c8352b" perceptual_roughness={0.45} /></Model>
               : <Model key={`st${x}`} src={S("wooden_stool_01/wooden_stool_01.gltf")} position={[x, 0.0, z]} rotation={[0, r, 0]} />);
  // HARI 1/30 on a standing chalkboard on the five-foot way (frame 0)
  { const cx0 = SX - 1.75, cz0 = SZ + 0.9, ry = 0.45, lean = -0.16;   // an A-frame chalk sign at the stall's front, facing the street and the camera
    const q = Quat.fromEuler("XYZ", lean, ry, 0), F = (d: [number, number, number]) => { const v = Quat.mulVec3(q, d); return [cx0 + v[0], v[1], cz0 + v[2]] as [number, number, number]; };
    P.push(<Mesh3d key="cf" transform={Transform.fromXyz(...F([0, 0.62, 0])).withRotation(q)}><Cuboid half_size={[0.36, 0.5, 0.02]} /><Flat c="#6b4a2e" r={0.6} /></Mesh3d>);
    P.push(<Mesh3d key="cs" transform={Transform.fromXyz(...F([0, 0.64, 0.022])).withRotation(q)}><Cuboid half_size={[0.31, 0.43, 0.004]} /><Flat c="#26332d" r={0.8} /></Mesh3d>);
    P.push(<Mesh3d key="cb2" transform={Transform.fromXyz(cx0 - Math.sin(ry) * 0.25, 0.6, cz0 - Math.cos(ry) * 0.25).withRotation(Quat.fromEuler("XYZ", -lean, ry, 0))}><Cuboid half_size={[0.36, 0.5, 0.02]} /><Flat c="#5a3d26" r={0.6} /></Mesh3d>);
    P.push(<Mesh3d key="h1" castShadow={false} transform={Transform.fromXyz(...F([0, 0.82, 0.03])).withRotation(q)}><Text3D size={0.15} depth={0.005}>HARI</Text3D><StandardMaterial base_color="#f4f1e8" unlit /></Mesh3d>);
    P.push(<Mesh3d key="h2" castShadow={false} transform={Transform.fromXyz(...F([0, 0.6, 0.03])).withRotation(q)}><Text3D size={0.19} depth={0.005}>1/30</Text3D><StandardMaterial base_color="#f4f1e8" unlit /></Mesh3d>);
    P.push(<Mesh3d key="h3" castShadow={false} transform={Transform.fromXyz(...F([0, 0.36, 0.03])).withRotation(q)}><Text3D size={0.055} depth={0.005}>30 bisnes Malaysia</Text3D><StandardMaterial base_color="#d9d6cc" unlit /></Mesh3d>); }
  return <>{P}</>;
}

// the price boards on telescoping poles: the stall's (2011 RM2.03 → 2024 RM3.68; rises to +81 % on "81"), the mamak's (+71 %)
function Board({ id, x, z, y, c, glowK, lines, tag }: { id: string; x: number; z: number; y: number; c: string; glowK: number; lines: [string, number, string, number, number?][]; tag?: [string, string] }) {
  const P: any[] = [];
  P.push(<Mesh3d key={`${id}pl`} transform={Transform.fromXyz(x, Math.max(y, 0.02) / 2, z - 0.05)}><Cylinder radius={0.035} half_height={Math.max(y, 0.02) / 2} /><Flat c="#6d7077" r={0.4} /></Mesh3d>);
  P.push(<B key={`${id}bd`} p={[x, y + 0.42, z]} s={[1.5, 0.84, 0.08]}><StandardMaterial base_color={c} perceptual_roughness={0.5} emissive={glow("#fff0d0", glowK)} /></B>);
  // a text's content is fixed per part (raea): every variant is its own named part, shown by scale (row, visible 0..1)
  lines.forEach(([s, size, col, row, vis = 1], n) => P.push(<Mesh3d key={`${id}t${n}`} name={`${id}t${n}`} castShadow={false} transform={Transform.fromXyz(x, y + 0.66 - row * 0.27, z + 0.05).withScale([Math.max(vis, 0.001), Math.max(vis, 0.001), 1])}><Text3D size={size} depth={0.01}>{s}</Text3D><StandardMaterial base_color={col} unlit /></Mesh3d>));
  if (tag) P.push(<B key={`${id}tg`} p={[x + 1.05, y + 0.42, z + 0.02]} s={[0.62, 0.4, 0.05]}><Flat c={tag[1]} r={0.5} /></B>, <Txt key={`${id}tgt`} name={`${id}tgt`} s={tag[0]} p={[x + 1.05, y + 0.36, z + 0.06]} size={0.2} c="#ffffff" />);
  return <>{P}</>;
}

// the inflation level: one cool line running along every signboard at +29 %, labelled on the left
function Level({ t, y, w = 60 }: { t: number; y: number; w?: number }) {
  const u = k(t, TT.infl - 0.1, TT.p29 + 0.3), L = UNITS.length * W, xm = UNITS[0] * W + L / 2; w = L;   // the line runs the whole row
  return <>
    <B key="lvl" p={[xm, y, 2.62]} s={[Math.max(0.01, w * u), 0.05, 0.05]}><StandardMaterial base_color="#cfe0ff" emissive={glow("#a9c4ff", 3)} /></B>
    {(() => { const g = Math.max(0.001, k(t, TT.p29 - 0.2, TT.p29 + 0.2)); return <Mesh3d key="lvlt" name="lvlt" castShadow={false} transform={Transform.fromXyz(SX - 0.3, y + 0.26, 2.66).withScale([g, g, 1])}><Text3D size={0.32} depth={0.01}>INFLATION +29%</Text3D><StandardMaterial base_color="#cfe0ff" unlit /></Mesh3d>; })()}
  </>;
}

// L04: inside exactly one thing — unit 0's shutter rolls up on the stall's back kitchen: the stove, the santan pot, its price label
function Kitchen({ t }: { t: number }) {
  const P: any[] = [], kz = -0.9, flip = t >= TT.p1154 - 0.1 ? 1 : 0;
  const KY = 0.3;   // the shop's floor height (raea: the counter passed 0.30 m into shophouse_A's floor)
  P.push(<B key="kc" p={[SX, 0.45+KY, kz]} s={[2.6, 0.9, 0.7]}><Flat c="#8a6a4a" r={0.6} /></B>);                       // the counter (real colour: the subject's kitchen)
  P.push(<B key="kt" p={[SX, 0.92+KY, kz]} s={[2.7, 0.05, 0.75]}><Flat c="#b9bdb8" r={0.35} /></B>);                     // steel top
  P.push(<B key="ks" p={[SX - 0.5, 1.0+KY, kz]} s={[0.7, 0.1, 0.5]}><Flat c="#2b2b2b" r={0.4} /></B>);                  // the gas stove
  P.push(<Mesh3d key="kf" transform={Transform.fromXyz(SX - 0.5, 1.06+KY, kz)}><Cylinder radius={0.12} half_height={0.01} /><StandardMaterial base_color="#3f7bff" emissive={glow("#4f8bff", 3)} /></Mesh3d>);
  P.push(<Model key="kp" src={S("pot_enamel_01/pot_enamel_01.gltf")} position={[SX - 0.5, 1.07+KY, kz]} scale={[3.2, 3.2, 3.2]} />);   // the santan pot on the flame
  P.push(<Mesh3d key="km" transform={Transform.fromXyz(SX - 0.5, 1.38+KY, kz)}><Cylinder radius={0.16} half_height={0.01} /><Flat c="#f7f3ea" r={0.3} /></Mesh3d>);   // santan, white
  P.push(<Model key="kb" src={S("plastic_container/plastic_container.gltf")} position={[SX + 0.55, 0.95+KY, kz - 0.12]} scale={[1.6, 1.6, 1.6]} />);   // the santan tub
  P.push(<B key="kl" p={[SX + 0.55, 1.62+KY + 0.32, kz + 0.36]} s={[0.95, 0.62, 0.03]}><Flat c="#f6efe0" r={0.6} /></B>);      // its label, on the wall above
  for (const [s, y, size, c, vis] of [["SANTAN / kg", 1.82, 0.09, "#1b1d22", 1], ["RM7.39", 1.6, 0.2, "#1b1d22", 1 - flip], ["RM11.54", 1.6, 0.2, RED, flip], ["2011", 1.43, 0.07, "#5a5d66", 1 - flip], ["2024", 1.43, 0.07, "#5a5d66", flip]] as [string, number, number, string, number][])
    P.push(<Mesh3d key={`kl${s}`} name={`kl${s}`} castShadow={false} transform={Transform.fromXyz(SX + 0.55, y + KY + 0.32, kz + 0.39).withScale([Math.max(vis, 0.001), Math.max(vis, 0.001), 1])}><Text3D size={size} depth={0.006}>{s}</Text3D><StandardMaterial base_color={c} unlit /></Mesh3d>);
  for (const [x, c] of [[SX - 1.1, "#c9a06b"], [SX + 1.1, "#e2d8c3"]] as [number, string][]) P.push(<Model key={`kj${x}`} src={S("plastic_container/plastic_container.gltf")} position={[x, 0.95 + KY, kz - 0.22]} scale={[1.0, 1.0, 1.0]}><StandardMaterial base_color={c} /></Model>);
  P.push(<B key="kw" p={[SX, 1.5+KY, -1.8]} s={[4.0, 3.0, 0.1]}><Flat c="#5a4a3a" r={0.8} /></B>);                       // the back wall, warm-lit
  return <>{P}</>;
}
// L05: across the street, a hand truck stacked with crates of coconuts; on "half" the top half go; chalk: LATE 2024
const CX5 = SX + 4.0, CZ5 = AR + 9.4;
function Coconuts({ t }: { t: number }) {
  const P: any[] = [];
  P.push(<Model key="ht" src={S("hand_truck/hand_truck.gltf")} position={[CX5 - 0.85, 0.16, CZ5]} rotation={[0, 0.3, 0]} />);
  for (let c = 0; c < 2; c++) P.push(<Model key={`wc${c}`} src={S("wooden_crate_01/wooden_crate_01.gltf")} position={[CX5 + 0.1, 0.16 + c * 0.42, CZ5]} scale={[1.1, 1.0, 1.1]} />);
  let n = 0;
  for (let lay = 0; lay < 4; lay++) for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) {
    const top = lay >= 2, r = ((n * 7919) % 100) / 100, u = top ? k(t, TT.half - 0.3 + r * 0.4, TT.half + 0.1 + r * 0.4) : 0, s = Math.max(0.001, 1 - u);
    const y = 0.25 + (lay < 2 ? lay * 0.13 : 0.42 + (lay - 2) * 0.13) + 0.07;
    P.push(<Mesh3d key={`co${n}`} name={`co${n}`} transform={Transform.fromXyz(CX5 + 0.1 - 0.21 + i * 0.14, y, CZ5 - 0.14 + j * 0.14).withScale([s, s * 0.9, s])}><Sphere radius={0.068} /><StandardMaterial base_color={n % 2 ? "#6b4a2e" : "#7d5a38"} perceptual_roughness={0.85} /></Mesh3d>);
    n++;
  }
  P.push(<B key="cbd" p={[CX5 + 1.0, 0.75, CZ5 + 0.2]} s={[0.8, 0.6, 0.04]} rot={[0, -0.35, 0]}><Flat c="#2f3a33" r={0.85} /></B>);
  P.push(<Mesh3d key="cbt" castShadow={false} transform={Transform.fromXyz(CX5 + 1.0, 0.8, CZ5 + 0.23).withRotation(Quat.fromRotationY(-0.35))}><Text3D size={0.13} depth={0.005}>LATE 2024</Text3D><StandardMaterial base_color="#efede4" unlit /></Mesh3d>);
  P.push(<Mesh3d key="cbk" castShadow={false} transform={Transform.fromXyz(CX5 + 1.0, 0.63, CZ5 + 0.23).withRotation(Quat.fromRotationY(-0.35))}><Text3D size={0.08} depth={0.005}>KELAPA</Text3D><StandardMaterial base_color="#d9d6cc" unlit /></Mesh3d>);
  return <>{P}</>;
}

// ---------------------------------------------------------------------------------------------------------------------
// the film (stills first): L01 the block, the stall the only warm thing · L02–L03 the level and the boards · L06 the town
const CAPS60 = CAPS as CapBlock[];
const ENDT = (VO as any).end as number;
function camAt(T: number): { cam: [number, number, number]; look: [number, number, number]; fov: number } {
  const io = Easing.inOut(Easing.cubic);
  const K0 = { cam: [SX + 5.5, 10.5, 20.5], look: [SX + 0.4, 1.6, 2.0], fov: 0.7 };      // L01 frame 0: the block, high three-quarter
  const K1 = { cam: [SX + 2.0, 2.4, SZ + 3.2], look: [SX + 0.6, 1.3, SZ], fov: 0.55 };    // down to the counter and the board
  const K2 = { cam: [SX + 3.6, 6.4, 22.5], look: [SX + 2.6, 4.4, 2.2], fov: 0.72 };       // L02–L03: the level and both boards
  const K4 = { cam: [SX + 0.4, 1.85, 2.35], look: [SX + 0.4, 1.8, -0.9], fov: 0.82 };   // L04: from the five-foot way into the open shutter: pot, flame, tub, the label above      // L04: from the five-foot way, beside the stall, into the open shutter       // L04: through the rolled-up shutter into the kitchen
  const K5 = { cam: [CX5 + 1.6, 2.3, CZ5 + 3.6], look: [CX5 + 0.3, 0.7, CZ5], fov: 0.6 }; // L05: the coconut crates across the street
  const K6 = { cam: [SX + 12, 30, 44], look: [SX, 3, -2], fov: 0.55 };                     // L06: the whole town from high
  const K7 = { cam: [SX + 3.0, 8.6, 19.5], look: [SX + 1.4, 4.9, 1.6], fov: 0.6 };        // L06 settle: the row on the line, your board above it, readable
  const seg = (a: any, b: any, u: number) => ({ cam: L3(a.cam, b.cam, u), look: L3(a.look, b.look, u), fov: lerp(a.fov, b.fov, u) });
  const u = (a: number, b: number) => k(T, a, b, io);
  if (T < TT.infl - 0.3) return seg(K0, K1, u(TT.now - 0.6, TT.p368 + 0.4)) as any;
  if (T < TT.its - 0.4) return seg(K1, K2, u(TT.infl - 0.3, TT.infl + 1.0)) as any;
  if (T < TT.in5 - 0.4) return seg(K2, K4, u(TT.its - 0.4, TT.its + 0.6)) as any;
  if (T < TT.inf6 - 0.3) return seg(K4, K5, u(TT.in5 - 0.4, TT.in5 + 0.6)) as any;
  if (T < TT.yours - 0.5) return seg(K5, K6, u(TT.inf6 - 0.3, TT.avg + 0.2)) as any;
  if (T < TT.still - 0.3) return seg(K6, K7, u(TT.yours - 0.5, TT.yours + 0.8)) as any;
  return seg(K7, K1, u(TT.still - 0.3, TT.still + 0.7)) as any;
}
function EndCard({ t }: { t: number }) {   // the Meikigo end card (silent; house rule)
  const u = k(t, TT.more + 0.55, TT.more + 1.05, Easing.out(Easing.cubic));
  if (u <= 0) return null;
  return <div style={{ position: "absolute", inset: 0, background: "#14161c", opacity: u, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    <Img src={S("meikigo-logo.png")} style={{ height: 420, transform: `scale(${0.92 + 0.08 * u})` }} />
    <div style={{ marginTop: 40, fontFamily: "Inter Display", fontWeight: 700, fontSize: 76, color: "#eef0f4", letterSpacing: -1 }}>Meikigo</div>
  </div>;
}
function Film() {
  const F = useCurrentFrame(), T = F / FPS;
  const { cam, look, fov } = camAt(T);
  const focus = Math.hypot(cam[0] - look[0], cam[1] - look[1], cam[2] - look[2]);
  const nowU = T >= TT.p368 - 0.15 ? 1 : 0;
  const stallY = lerp(Y0, lvl(81), k(T, TT.p81 - 0.35, TT.p81 + 0.35, Easing.out(Easing.cubic)));
  const mamU = k(T, TT.roti - 0.3, TT.roti + 0.3) * (1 - k(T, TT.avg - 0.8, TT.avg)), mamY = lerp(Y0, lvl(71), k(T, TT.p71 - 0.35, TT.p71 + 0.35, Easing.out(Easing.cubic)) * (1 - k(T, TT.avg - 0.8, TT.avg)));   // the mamak settles back for the payoff
  SHUT0.v = 2.8 * (1 - k(T, TT.its - 0.3, TT.its + 0.5)) + 2.8 * k(T, TT.in5 - 0.4, TT.in5 + 0.2);   // rolls up for L04, back down after
  const kit = T > TT.its - 0.4 && T < TT.in5 + 0.4 ? 1 : 0;
  return (
    <AbsoluteFill style={{ background: "#14161c" }}>
      <Camera3d transform={Transform.fromXyz(...cam).lookingAt(look)} projection={{ Perspective: { fov } }}>
        <DepthOfField focal_distance={focus} aperture_f_stops={8} />
      </Camera3d>
      <Environment src={S("sky.hdr")} intensity={0.14} rotation={2.6} />
      <AmbientLight brightness={22} color="#8ea4dc" />
      <DirectionalLight color="#a7bdff" transform={Transform.fromXyz(-22, 18, 6).lookingAt([0, 0, 0])} illuminance={3600} shadow_maps_enabled soft_shadow_size={0.5} />
      <Shadows distance={60} firstCascade={14} mapSize={8192} bias={0.04} normalBias={1.5} />
      {/* the stall is the warm light: the bulb, plus an even key on the counter so what's on it reads (user, 11 Nov) */}
      <PointLight name="sb" transform={Transform.fromXyz(SX, 2.0, SZ)} intensity={900000} color={WARM} range={9} shadow_maps_enabled />
      <SpotLight name="sk" transform={Transform.fromXyz(SX + 1.6, 3.6, SZ + 3.0).lookingAt([SX, 0.95, SZ])} intensity={700000} outer_angle={0.6} inner_angle={0.45} color="#ffe6c2" range={10} />
      <PointLight name="mm" transform={Transform.fromXyz(1 * W + W / 2, 2.2, 1.2)} intensity={500000 * mamU} color="#ffb867" range={8} />
      <Fog color="#14161c" near={T > 26 ? 40 : 60} far={T > 26 ? 120 : 150} />
      <Bloom intensity={0.6} threshold={0.9} />
      <AmbientOcclusion quality="high" />
      <ToneMapping mode="agx" exposure={0.65} />
      <Grade temperature={0.0} vignette={0.28} midtones={{ saturation: 1.05, contrast: 1.12, gamma: 1, gain: 1, lift: 0 }} />
      <Street />
      {UNITS.map((i) => <Unit key={i} i={i} t={T} />)}
      <Stall t={T} />
      <Kitchen t={T} />
      <Coconuts t={T} />
      <Board id="sb" x={SX + 1.7} z={SZ + 0.6} y={stallY} c="#f6efe0" glowK={0.6}
        lines={[["NASI LEMAK", 0.17, "#1b1d22", 0], ["RM2.03", 0.24, "#1b1d22", 1, 1 - nowU], ["RM3.68", 0.24, RED, 1, nowU], ["2011", 0.12, "#5a5d66", 2, 1 - nowU], ["2024", 0.12, "#5a5d66", 2, nowU]]}
        tag={T > TT.p81 - 0.2 ? ["+81%", RED] : undefined} />
      <Board id="mb" x={1 * W + W / 2 - 0.6} z={2.9} y={lerp(-1.6, mamY, Math.min(1, mamU * 3))} c={mamU > 0.5 ? "#f6efe0" : "#3b3d44"} glowK={0.6 * mamU}
        lines={[["ROTI CANAI", 0.15, "#1b1d22", 0, mamU], ["MAMAK", 0.12, "#5a5d66", 1, mamU]]}
        tag={T > TT.p71 - 0.2 && mamU > 0.5 ? ["+71%", "#e8892b"] : undefined} />
      <Level t={T} y={lvl(29)} />
      {/* L06: the town's average, one cool plane over every roof; your stall's board stands above it */}
      <PointLight name="kl" transform={Transform.fromXyz(SX, 2.4, -0.6)} intensity={600000 * kit} color={WARM} range={6} />
      <SpotLight name="cl" transform={Transform.fromXyz(CX5 + 2, 4, CZ5 + 3).lookingAt([CX5, 0.6, CZ5])} intensity={900000 * k(T, TT.in5 - 0.6, TT.in5)} outer_angle={0.5} inner_angle={0.35} color="#e8ecff" range={10} />
      <Captions blocks={CAPS60} frame={F} fps={FPS} />
      <EndCard t={T} />
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="ex37" component={Film} width={1080} height={1920} fps={FPS} durationInFrames={2239} />);
