// EX35 How is ZUS so cheap? (Part 3) — Style A in a WHITE world (user 2026-11-10: "let's try white world").
// The EX29/EX31 street, repainted white under daylight; the one real-coloured subject is the ZUS kiosk (royal blue,
// the real white wordmark); the token is a ZUS takeaway cup. Timed to audio/vo_timeline.json (offsets in build/vo.py).
// Street world, materials and props: EX29 (Poly Haven CC0, kit models).
import { AbsoluteFill, Composition, Easing, Img, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { AmbientOcclusion, Bloom, DepthOfField, Environment, Fog, Grade, ImagePlane, Model, Text3D, ToneMapping, manifold, type Solid } from "raea/3d";
import { Cuboid, Cylinder, Mesh3d } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { AmbientLight, DirectionalLight, PointLight, RectLight, Shadows } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
import { Affine2 } from "raea/math";
import { LinearRgba, Srgba } from "raea/color";
import CAPS from "./caps.json";
import { Captions, type CapBlock } from "../../../tools/raea/kit/Captions";

const S = (p: string) => staticFile(p);
const FPS = 60;                                 // user 2026-11-11: "make it 60fps"
const k = (t: number, a: number, b: number, e = Easing.inOut(Easing.cubic)) => interpolate(t, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
const L3 = (a: number[], b: number[], u: number): [number, number, number] => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];
const glow = (hex: string, k: number) => LinearRgba.from(Srgba.hex(hex)).mul(k);
const W = 4.6;                                  // shophouse width
const UNITS = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3];
const AR = 2.2;                                 // five-foot way depth (z 0..AR)
const WHITE = "#ddd6ca", WHITE2 = "#cdc6b9", SHADE = "#bfb8ab";   // user 2026-11-11: "tone down the white"
const BLUE = "#2030a8", NAVY = "#141e6e";
const tiny = (v: number) => Math.max(v, 0.001);   // parts never vanish: hide by scale (raea matches parts in tree order)

// ---------- solids, built once ----------
let SO: Record<string, Solid> | null = null;
const so = () => (SO ??= {
  umbrella: manifold.cone(1.3, 0.02, 0.6).rotate(-90, 0, 0),
  // a takeaway cup: tapered body, rolled rim, domed lid with a sip hole (axis up, base at y 0)
  // (manifold.cone is centred on its length: the body and sleeve are lifted by half their height)
  cup: manifold.union(
    manifold.cone(0.040, 0.054, 0.15).rotate(-90, 0, 0).move(0, 0.075, 0),
    manifold.cylinder(0.057, 0.008).rotate(-90, 0, 0).move(0, 0.148, 0),
    manifold.cone(0.056, 0.044, 0.018).rotate(-90, 0, 0).move(0, 0.165, 0),
    manifold.cylinder(0.026, 0.008).rotate(-90, 0, 0).move(0.018, 0.172, 0)),
  sleeve: manifold.cone(0.047, 0.052, 0.06).rotate(-90, 0, 0).minus(manifold.cone(0.044, 0.049, 0.07).rotate(-90, 0, 0)).move(0, 0.03, 0),
  pings: manifold.sphere(0.22),
});

const T = (n: string) => ({ normal_map_texture: S(`tex/${n}_nor_gl_1k.jpg`), metallic_roughness_texture: S(`tex/${n}_rough_1k.jpg`), perceptual_roughness: 1 });
const TD = (n: string) => ({ base_color_texture: S(`tex/${n}_diff_1k.jpg`), ...T(n) });   // with the photo texture (tinted)
const Plaster = ({ u = 1, v = 1, tint = "#e2dbd0", n = "grey_plaster" }) => <StandardMaterial {...T(n)} base_color={tint} uv_transform={Affine2.fromScale([u, v])} />;   /* relief only: the photo colour went brown */
const Tiles = ({ n, u, v, tint = WHITE }: { n: string; u: number; v: number; tint?: string }) => <StandardMaterial {...T(n)} base_color={tint} uv_transform={Affine2.fromScale([u, v])} />;
const Flat = ({ c = WHITE, r = 0.7, e, m }: { c?: string; r?: number; e?: any; m?: number }) => <StandardMaterial base_color={c} perceptual_roughness={r} emissive={e} metallic={m} />;
const Lit = ({ tex, c = "#ffffff" }: { tex?: string; c?: string }) => <StandardMaterial base_color={c} base_color_texture={tex ? S(tex) : (undefined as any)} unlit />;
const WhiteModel = ({ src, p, r = 0, s = 1, c = WHITE }: { src: string; p: [number, number, number]; r?: number; s?: number | [number, number, number]; c?: string }) =>
  <Model src={S(src)} position={p} rotation={[0, r, 0]} scale={typeof s === "number" ? [s, s, s] : s}><StandardMaterial base_color={c} base_color_texture={null as any} /></Model>;
function B({ p, s, children, rot, name }: { p: [number, number, number]; s: [number, number, number]; children: any; rot?: [number, number, number]; name?: string }) {
  let t = Transform.fromXyz(...p); if (rot) t = t.withRotation(Quat.fromEuler("XYZ", ...rot));
  return <Mesh3d name={name} transform={t}><Cuboid half_size={[s[0] / 2, s[1] / 2, s[2] / 2]} />{children}</Mesh3d>;
}
// roller shutter from slats: h = how much is rolled down from the lintel at y top
function Shutter({ id, x, w, h, z, c, top = 2.95 }: { id: string; x: number; w: number; h: number; z: number; c: string; top?: number }) {
  h = Math.max(h, 0.01);
  const P = [<B key={`${id}p`} name={`${id}p`} p={[x, top - h / 2, z]} s={[w, h, 0.04]}><Flat c={c} r={0.5} /></B>];
  for (let r = 0; r < 20; r++) { const y = top - h + 0.07 + r * 0.14; P.push(<B key={`${id}s${r}`} name={`${id}s${r}`} p={[x, Math.min(y, top - 0.05), z + 0.03]} s={[w, 0.03, 0.03]}><Flat c={c} r={0.35} /></B>); }
  return <>{P}</>;
}

// ---------- the street (EX29/EX31), white ----------
const VAR = (i: number) => ["A", "B", "C", "B", "A", "C", "A", "B", "C", "A"][((i % 10) + 10) % 10];
// the app (L03): customers on the street hold their phones up; a phone card floats over each, the order pings fly from it
const CUST: [string, number, number, number][] = [["s_f25", 7.4, AR + 0.05, -0.4], ["s_m30", 10.6, AR + 0.1, 0.5], ["s_f35", 13.2, AR + 0.05, -0.2], ["s_m50", 17.6, AR + 0.1, 0.3], ["s_f25", 0.2, AR + 9.4, 2.9], ["s_m30", 18.6, AR + 9.3, 3.0]];   /* on the kerb, under open sky */
const PHONES: [number, number][] = CUST.map(([, x]) => [x, 2.75]);
const PHZ = CUST.map(([, , z]) => z);
function Unit({ i, t }: { i: number; t: number }) {
  const x0 = i * W, cx = x0 + W / 2;
  const tint = ["#e2dbd0", "#dbd4c8", "#e6e0d5", "#d7d0c4", "#e0d8ca"][((i % 5) + 5) % 5];   /* toned-down whites (user 2026-11-11) */
  const P: any[] = [];
  P.push(<Model key="sh" src={S(`parts/shophouse_${VAR(i)}.glb`)} position={[cx, 0, 0]}>
    <StandardMaterial material="wall" base_color={tint} {...T("grey_plaster")} uv_transform={Affine2.fromScale([2.4, 2.4])} />
    <StandardMaterial material="trim" base_color="#e6dfd3" perceptual_roughness={0.75} />
    <StandardMaterial material="shutter" base_color="#b4aea4" perceptual_roughness={0.6} />
    <StandardMaterial material="tile" base_color={tint} normal_map_texture={S("tex/clay_roof_tiles_02_nor_gl_1k.jpg")} perceptual_roughness={0.85} />
    <StandardMaterial material="floor" base_color="#d8d2c8" {...T("concrete_tiles")} uv_transform={Affine2.fromScale([2, 2])} />
    <StandardMaterial material="party" base_color="#d3cec4" perceptual_roughness={0.8} />
    <StandardMaterial material="dark" base_color="#5f626a" />
  </Model>);
  const SG = ["sg_runcit", "sg_farmasi", "sg_kedai", "sg_makan", "sg_salon", "sg_cetak", "sg_jam", "sg_kain", "sg_motor", "sg_tuisyen"][((i % 10) + 10) % 10];
  P.push(<B key="sg" p={[cx, 4.05, 2.32]} s={[W - 0.5, 0.62, 0.1]}><Flat c="#d9d2c6" r={0.45} /></B>);
  P.push(<Mesh3d key="sgf" castShadow={false} transform={Transform.fromXyz(cx, 4.05, 2.376)}><Cuboid half_size={[(W - 0.6) / 2, 0.28, 0.002]} /><StandardMaterial base_color="#ffffff" base_color_texture={S(`${SG}.png`)} perceptual_roughness={0.6} /></Mesh3d>);
  P.push(<Shutter key="shut" id={`sh${i}`} x={cx} w={W - 0.9} h={[2.8, 1.4, 2.8, 2.1][((i % 4) + 4) % 4]} z={0.3} c="#b9b3a9" />);
  if ((i + 7) % 3 === 0) P.push(<WhiteModel key="ac" src="exterior_aircon_unit/exterior_aircon_unit.gltf" p={[cx - 0.4, 5.3, 2.35]} s={1.0} c="#e1ddd5" />);
  return <>{P}</>;
}
function Phones({ t }: { t: number }) {
  return <>{CUST.map(([src, x, z, r], n) => { const on = k(t, 13.45 + n * 0.16, 13.75 + n * 0.16) * (1 - k(t, 21.0, 21.6));
    return <>
      <Model key={`cu${n}`} name={`cu${n}`} src={S(`people/${src}.glb`)} position={[x, z > 2 && z < 3 ? 0.14 : 0.16, z]} rotation={[0, r, 0]}><StandardMaterial base_color="#bdb6ab" perceptual_roughness={0.7} /></Model>
      <Mesh3d key={`ph${n}`} name={`ph${n}`} castShadow={false} transform={Transform.fromXyz(x, 2.75, z + 0.1).withRotation(Quat.fromRotationY(Math.atan2(5.5 - x, 9 - z))).withScale([tiny(on), tiny(on), 1])}><Cuboid half_size={[0.24, 0.46, 0.012]} /><StandardMaterial base_color="#ffffff" base_color_texture={S("phone.png")} unlit alpha_mode={{ Mask: 0.5 }} /></Mesh3d>
      <Mesh3d key={`pt${n}`} name={`pt${n}`} castShadow={false} transform={Transform.fromXyz(x, 2.22, z + 0.1).withRotation(Quat.mul(Quat.fromRotationY(Math.atan2(5.5 - x, 9 - z)), Quat.fromRotationZ(Math.PI / 4))).withScale([tiny(on), tiny(on), 1])}><Cuboid half_size={[0.07, 0.07, 0.01]} /><Flat c="#1c1c21" /></Mesh3d>
    </>; })}</>;
}

function Street() {
  const L = 140, xm = 8;
  const P: any[] = [];
  P.push(<B key="kerb" p={[xm, 0.07, AR + 0.15]} s={[L, 0.14, 0.28]}><Flat c={WHITE2} /></B>);
  P.push(<B key="road" p={[xm, -0.02, AR + 4.6]} s={[L + 40, 0.04, 8.6]}><Tiles n="asphalt_02" u={30} v={4} tint="#c9c5bd" /></B>);
  for (let q = -10; q < 18; q++) if (q * 4 < 30 || q * 4 > 38) P.push(<B key={`ln${q}`} p={[q * 4, 0.005, AR + 4.6]} s={[2, 0.01, 0.14]}><Flat c="#ffffff" /></B>);
  P.push(<B key="pv" p={[xm, 0.08, AR + 10]} s={[L + 40, 0.16, 2.2]}><Tiles n="concrete_tiles" u={40} v={2} /></B>);
  P.push(<B key="gr" p={[xm, -0.06, -30]} s={[L + 120, 0.1, 140]}><Flat c={WHITE2} /></B>);
  // the cross street at x 30–38 (between the lane's corner plaza and the mall)
  P.push(<B key="xr" p={[34, -0.015, -18]} s={[8, 0.04, 40]}><Tiles n="asphalt_02" u={2} v={10} tint="#c9c5bd" /></B>);
  for (let q = 0; q < 8; q++) P.push(<B key={`xl${q}`} p={[34, 0.006, -2 - q * 4.5]} s={[0.14, 0.01, 2]}><Flat c="#ffffff" /></B>);
  // the corner plaza (the kiosk's lot)
  P.push(<B key="pz" p={[24.2, 0.075, -2.0]} s={[11.6, 0.15, 8.4]}><Tiles n="concrete_tiles" u={6} v={4} tint="#e4e0d8" /></B>);
  for (const [x, f] of [[-15, 0], [-11.5, 0], [6, 0], [13, 0]] as [number, number][]) P.push(<WhiteModel key={`car${x}`} src="car_b.glb" p={[x, 0, AR + 1.75]} r={Math.PI / 2 + f} s={1.0} />);
  for (const x of [-22, -13, 40, 46]) P.push(<WhiteModel key={`tr${x}`} src="island_tree_02/island_tree_02.gltf" p={[x, 0.16, AR + 10]} s={1.6} c="#c4bdaf" />);
  for (const x of [-26]) P.push(<WhiteModel key={`tp${x}`} src="tele_pole.glb" p={[x, 0.16, AR + 0.5]} s={1.2} />);
  P.push(<Mesh3d key="umb" transform={Transform.fromXyz(-9.5, 2.5, AR + 9.6)} shape={so().umbrella}><Flat c={WHITE} /></Mesh3d>);
  P.push(<B key="stall" p={[-9.5, 0.6, AR + 9.6]} s={[1.8, 0.9, 1.0]}><Flat c={WHITE} /></B>);
  P.push(<Mesh3d key="pole" transform={Transform.fromXyz(-9.5, 1.4, AR + 9.6)}><Cylinder radius={0.03} half_height={1.2} /><Flat c={WHITE2} /></Mesh3d>);
  for (const [x, z, r] of [[-3.6, 0.8, 0.5], [-3.0, 0.85, -0.3], [-12.4, 0.9, 0.2], [9.8, 0.7, 0.8]] as [number, number, number][])
    P.push(<WhiteModel key={`ch${x}`} src="plastic_monobloc_chair_01/plastic_monobloc_chair_01.gltf" p={[x, 0.12, z]} r={r} />);
  for (let c = 0; c < 3; c++) P.push(<WhiteModel key={`cr${c}`} src="plastic_crate_01/plastic_crate_01.gltf" p={[-6.6, 0.12 + c * 0.29, 0.6]} r={c * 0.2} />);
  for (const x of [-14.6, -5.1, 9.4]) P.push(<WhiteModel key={`pp${x}`} src="potted_plant_02/potted_plant_02.gltf" p={[x, 0.12, x === -5.1 ? 0.55 : AR - 0.55]} s={1.3} c={WHITE2} />);
  P.push(<WhiteModel key="ht2" src="hand_truck/hand_truck.gltf" p={[4.2, 0.12, 1.4]} r={-0.6} />);
  P.push(<Model key="vs" src={S("parts/vespa.glb")} position={[-6.5, 0.12, 1.4]} rotation={[0, 1.2, 0]}><StandardMaterial base_color={WHITE2} /></Model>);
  P.push(<Model key="vs2" src={S("parts/vespa.glb")} position={[19.6, 0.15, 1.2]} rotation={[0, 1.4, 0]}><StandardMaterial base_color={WHITE2} /></Model>);   // a rider waiting for a pickup
  P.push(<B key="dbox" p={[19.15, 1.15, 1.3]} s={[0.55, 0.5, 0.5]}><Flat c="#e9e3d8" r={0.5} /></B>);                 // the delivery box on its back
  for (const [x, r] of [[-20, 1.5], [-17.8, 1.6], [-8.5, 1.4], [2.2, 1.55], [3.4, 1.65], [15.6, 1.5]] as [number, number][])   // scooters parked along the kerb
    P.push(<Model key={`sc${x}`} src={S("parts/vespa.glb")} position={[x, 0.0, AR + 0.75]} rotation={[0, r, 0]}><StandardMaterial base_color={["#d1cabd", "#bdb6aa", "#c8c1b4"][Math.abs(Math.round(x)) % 3]} /></Model>);
  for (const x of [-11, 5.5, 29.2]) { P.push(<Mesh3d key={`bin${x}`} transform={Transform.fromXyz(x, 0.55, AR - 0.25)}><Cylinder radius={0.26} half_height={0.42} /><Flat c="#a8a296" r={0.6} /></Mesh3d>); }
  P.push(<B key="bsr" p={[8, 2.6, AR + 10.4]} s={[4.2, 0.1, 1.6]}><Flat c="#d6cfc3" /></B>);                         // a bus stop on the far pavement
  for (const dx of [-1.9, 1.9]) P.push(<B key={`bsp${dx}`} p={[8 + dx, 1.35, AR + 10.9]} s={[0.1, 2.5, 0.1]}><Flat c="#8f8a80" /></B>);
  P.push(<B key="bsb" p={[8, 1.4, AR + 11.05]} s={[3.8, 1.9, 0.05]}><Flat c="#c9d2d8" r={0.1} /></B>);
  P.push(<B key="bss" p={[8, 0.55, AR + 10.75]} s={[3.2, 0.08, 0.4]}><Flat c="#8f8a80" /></B>);
  for (const x of [-30, 1, 20, 52, 60]) P.push(<WhiteModel key={`tr2${x}`} src="island_tree_02/island_tree_02.gltf" p={[x, 0.16, AR + 10.2]} s={1.5} c="#c4bdaf" />);
  for (const [src, x, z, r] of [["s_m30", 0.7, 2.6, 2.4], ["s_f25", -1.6, 1.6, -2.6], ["s_m50", -9.0, AR + 9.0, 0.3], ["s_f35", -8.3, AR + 9.4, -2.4], ["s_m30", 28.9, -3.9, -1.9], ["s_f25", 10.8, AR + 9.6, -0.4],
      ["s_f35", -18.5, 1.2, 1.2], ["s_m50", -14.2, 0.9, -0.8], ["s_m50", 30.4, AR + 9.4, 2.0], ["s_f35", 44.0, -0.6, 3.0], ["s_m30", 50.5, -0.9, -2.7], ["s_f25", 55.0, -1.2, 0.4], ["s_m50", -4.0, AR + 9.5, 1.6]] as [string, number, number, number][])
    P.push(<Model key={`pp${src}${x}`} src={S(`people/${src}.glb`)} position={[x, 0.12, z]} rotation={[0, r, 0]}><StandardMaterial base_color="#cfcac1" perceptual_roughness={0.7} /></Model>);
  // the city behind and around (white blocks with window rows; roofs carry the L04 lights)
  for (const [bx, bz, w, h] of CITY) {
    const d = w * 0.8, key = `${bx}_${bz}`, tone = ["#efe7da", "#e6dfd2", "#f2ece1", "#e1d9cb"][Math.abs(bx + bz) % 4];
    P.push(<B key={`blk${key}`} p={[bx, h / 2, bz]} s={[w, h, d]}><Plaster u={w / 4} v={h / 4} tint={["#e4ddd2", "#dbd4c9", "#e8e2d8", "#d6cfc3"][Math.abs(bx + bz) % 4]} /></B>);
    P.push(<B key={`rf${key}`} p={[bx, h + 0.06, bz]} s={[w - 0.5, 0.12, d - 0.5]}><StandardMaterial {...T("concrete_tiles")} base_color="#aaa59d" uv_transform={Affine2.fromScale([3, 3])} /></B>);
    for (const [px, pz, sx, sz] of [[0, d / 2 - 0.15, w, 0.3], [0, -d / 2 + 0.15, w, 0.3], [w / 2 - 0.15, 0, 0.3, d - 0.6], [-w / 2 + 0.15, 0, 0.3, d - 0.6]] as [number, number, number, number][])
      P.push(<B key={`pp${key}${px}${pz}`} p={[bx + px, h + 0.45, bz + pz]} s={[sx, 0.9, sz]}><Flat c={tone} /></B>);
    P.push(<Mesh3d key={`wt${key}`} transform={Transform.fromXyz(bx - w * 0.22, h + 1.3, bz - d * 0.15)}><Cylinder radius={0.9} half_height={1.1} /><Flat c="#9e988c" r={0.5} /></Mesh3d>);
    P.push(<B key={`sh${key}`} p={[bx + w * 0.2, h + 1.2, bz + d * 0.1]} s={[2.4, 2.2, 2.0]}><Flat c={tone} /></B>);
    for (let a = 0; a < 3; a++) P.push(<B key={`ac${key}${a}`} p={[bx - w * 0.3 + a * 1.3, h + 0.5, bz + d * 0.32]} s={[0.9, 0.7, 0.6]}><Flat c="#a39d91" r={0.6} /></B>);
    for (let r = 0; r < Math.min(7, Math.floor(h / 2.8)); r++) P.push(<B key={`wb${key}_${r}`} p={[bx, 2.2 + r * 2.8, bz + d / 2 + 0.02]} s={[w - 1.2, 1.2, 0.06]}><Flat c="#7d8590" r={0.15} m={0.2} /></B>);
  }
  for (let gz = 0; gz <= 4; gz++) P.push(<B key={`crd${gz}`} p={[8, -0.008, -6 - gz * 16]} s={[180, 0.03, 5]}><Tiles n="asphalt_02" u={40} v={1} tint="#8e8a83" /></B>);   // the city's roads
  for (let gx = -4; gx <= 6; gx++) if (gx * 17 - 14.5 < 32 || gx * 17 - 14.5 > 90) P.push(<B key={`ccd${gx}`} p={[gx * 17 - 14.5, -0.009, -46]} s={[5, 0.03, 80]}><Tiles n="asphalt_02" u={1} v={18} tint="#8e8a83" /></B>);
  for (const [src, x, z, sc, r] of [["skyscraper_k.glb", -16, -75, 11, 0.3], ["skyscraper_k.glb", 22, -82, 12.5, 0], ["skyscraper_k.glb", -4, -95, 15, 0.6]] as [string, number, number, number, number][])
    P.push(<WhiteModel key={`bg${x}`} src={src} p={[x, 0, z]} r={r} s={sc} />);
  return <>{P}</>;
}
// city blocks: a grid behind the street, the mall's plot left free
const CITY: [number, number, number, number][] = [];
for (let gx = -4; gx <= 5; gx++) for (let gz = 1; gz <= 4; gz++) {
  const bx = gx * 17 - 6, bz = -14 - gz * 16;
  if (bx > 36 && bx < 90 && bz > -40) continue;                            // the mall
  const h = 8 + ((gx * 37 + gz * 53 + 400) % 23);
  CITY.push([bx, bz, 11, h]);
}

// ---------- the ZUS kiosk: 200 sq ft (4.3 × 4.3 m), on the corner plaza, facing the street ----------
const KX = 24.0, KZ = -1.0, KS = 4.3, KF = KZ + KS / 2;   // front face z
function Kiosk({ t }: { t: number }) {
  const P: any[] = [];
  const shut = k(t, 32.2, 34.0, Easing.inOut(Easing.quad));                 // the shutter rolls down at closing (L06)
  const lights = 1 - 0.85 * k(t, 33.6, 34.6);
  P.push(<B key="kb" p={[KX, 0.19, KZ]} s={[KS, 0.1, KS]}><StandardMaterial {...T("brown_floor_tiles")} base_color="#e7e2da" uv_transform={Affine2.fromScale([3, 3])} /></B>);   {/* sunk 1 cm into the plaza: its bottom face sat on the plaza top (flicker) */}
  P.push(<B key="kbw" p={[KX, 1.55, KZ - KS / 2 + 0.06]} s={[KS, 2.7, 0.12]}><StandardMaterial {...T("grey_plaster")} base_color={BLUE} perceptual_roughness={0.55} uv_transform={Affine2.fromScale([2, 2])} /></B>);
  for (const sx of [-1, 1]) P.push(<B key={`ksw${sx}`} p={[KX + sx * (KS / 2 - 0.06), 1.55, KZ]} s={[0.12, 2.7, KS]}><StandardMaterial {...T("grey_plaster")} base_color={BLUE} perceptual_roughness={0.55} uv_transform={Affine2.fromScale([2, 2])} /></B>);
  for (let n = 0; n < 9; n++) for (const sx of [-1, 1]) P.push(<B key={`kpan${n}${sx}`} p={[KX + sx * (KS / 2 + 0.005), 1.55, KZ - KS / 2 + 0.25 + n * 0.48]} s={[0.01, 2.6, 0.03]}><Flat c={NAVY} r={0.5} /></B>);   {/* panel seams */}
  P.push(<B key="kroof" p={[KX, 2.98, KZ + 0.1]} s={[KS + 0.3, 0.16, KS + 0.5]}><StandardMaterial {...T("concrete_tiles")} base_color="#e9e5de" uv_transform={Affine2.fromScale([2, 2])} /></B>);
  // fascia with the real wordmark (front, lit) — the logo on screen from the first wide shot
  P.push(<B key="kfas" p={[KX, 2.62, KF + 0.12]} s={[KS + 0.2, 0.62, 0.14]}><Flat c={BLUE} r={0.4} e={glow(BLUE, 0.35 * lights)} /></B>);
  P.push(<ImagePlane key="klogo" src={S("zus_white.png")} width={KS - 0.6} position={[KX, 2.62, KF + 0.2]} />);
  for (const sx of [-1, 1]) P.push(<ImagePlane key={`klogos${sx}`} src={S("zus_white.png")} width={KS - 1.0} position={[KX + sx * (KS / 2 + 0.01), 2.25, KZ]} rotation={[0, sx * Math.PI / 2, 0]} />);
  // the counter: white top, blue front; till on it; pickup shelf at the right
  P.push(<B key="kct" p={[KX - 0.35, 1.06, KF - 0.35]} s={[KS - 1.2, 0.06, 0.7]}><StandardMaterial {...T("concrete_tiles")} base_color="#f4f0ea" perceptual_roughness={0.35} uv_transform={Affine2.fromScale([4, 1])} /></B>);
  P.push(<B key="kcf" p={[KX - 0.35, 0.6, KF - 0.06]} s={[KS - 1.2, 0.86, 0.08]}><Flat c={NAVY} r={0.5} /></B>);
  P.push(<ImagePlane key="kplq" src={S("plaque.png")} width={0.9} position={[KX - 1.55, 0.62, KF - 0.01]} />);
  // espresso machine and grinder behind the counter
  P.push(<B key="kbk" p={[KX, 0.55, KZ - 1.65]} s={[KS - 0.4, 0.9, 0.7]}><Flat c={NAVY} r={0.5} /></B>);                      // the back counter
  P.push(<B key="kbkt" p={[KX, 1.02, KZ - 1.65]} s={[KS - 0.4, 0.05, 0.72]}><StandardMaterial {...T("concrete_tiles")} base_color="#f4f0ea" perceptual_roughness={0.35} uv_transform={Affine2.fromScale([4, 1])} /></B>);
  P.push(<B key="kem" p={[KX - 0.4, 1.35, KZ - 1.7]} s={[1.1, 0.6, 0.5]}><Flat c="#d5d9df" r={0.22} m={0.9} /></B>);             // the espresso machine
  P.push(<B key="kemt" p={[KX - 0.4, 1.67, KZ - 1.7]} s={[1.0, 0.04, 0.42]}><Flat c="#9aa0a8" r={0.3} m={0.9} /></B>);
  for (let c = 0; c < 4; c++) P.push(<Mesh3d key={`kemc${c}`} transform={Transform.fromXyz(KX - 0.75 + c * 0.22, 1.73, KZ - 1.7)}><Cylinder radius={0.04} half_height={0.04} /><Flat c="#fbfaf7" r={0.4} /></Mesh3d>);
  for (let g = 0; g < 2; g++) { P.push(<B key={`kgh${g}`} p={[KX - 0.68 + g * 0.56, 1.16, KZ - 1.4]} s={[0.12, 0.06, 0.12]}><Flat c="#2b2d33" r={0.3} /></B>);
    P.push(<B key={`kpf${g}`} p={[KX - 0.68 + g * 0.56, 1.12, KZ - 1.27]} s={[0.04, 0.03, 0.16]}><Flat c="#1c1c21" r={0.3} /></B>); }
  P.push(<B key="kdt" p={[KX - 0.4, 1.06, KZ - 1.38]} s={[0.9, 0.025, 0.16]}><Flat c="#30323a" r={0.3} m={0.6} /></B>);          // drip tray
  P.push(<Mesh3d key="ksw" transform={Transform.fromXyz(KX + 0.12, 1.2, KZ - 1.39).withRotation(Quat.fromRotationZ(0.25))}><Cylinder radius={0.012} half_height={0.12} /><Flat c="#d5d9df" r={0.2} m={0.9} /></Mesh3d>);
  P.push(<Mesh3d key="khop" transform={Transform.fromXyz(KX + 0.6, 2.0, KZ - 1.65)} shape={manifold.cone(0.07, 0.13, 0.26).rotate(-90, 0, 0)}><Flat c="#6b4a2f" r={0.6} /></Mesh3d>);   // beans in the hopper
  P.push(<B key="kqrb" p={[KX - 1.05, 1.24, KF - 0.215]} s={[0.21, 0.29, 0.01]}><Flat c="#f4f0ea" /></B>);                     // "order on the app" standee
  P.push(<ImagePlane key="kqr" src={S("qr.png")} width={0.2} position={[KX - 1.05, 1.24, KF - 0.205]} />);
  P.push(<B key="kcr" p={[KX + 0.15, 1.105, KF - 0.25]} s={[0.09, 0.03, 0.15]}><Flat c="#1c1c21" r={0.3} /></B>);            // card reader
  P.push(<B key="knap" p={[KX - 1.6, 1.15, KF - 0.55]} s={[0.18, 0.12, 0.12]}><Flat c="#e9e3d8" r={0.6} /></B>);
  P.push(<Mesh3d key="kgr" transform={Transform.fromXyz(KX + 0.6, 1.45, KZ - 1.65)}><Cylinder radius={0.11} half_height={0.4} /><Flat c="#30323a" r={0.4} /></Mesh3d>);
  // menu board on the back wall
  P.push(<Mesh3d key="kmnA" castShadow={false} transform={Transform.fromXyz(KX, 2.15, KZ - KS / 2 + 0.13)}><Cuboid half_size={[1.3, 0.69, 0.006]} /><Lit tex="menu.png" /></Mesh3d>);
  // the A-board on the paving: grows in on "billion" (L05)
  const ab = k(t, 29.2, 29.8, Easing.out(Easing.cubic));
  P.push(<Mesh3d key="kab" name="kab" transform={Transform.fromXyz(KX - 1.15, 0.15 + 0.52 * ab, KF + 1.35).withRotation(Quat.fromRotationX(-0.12)).withScale([tiny(ab), tiny(ab), 1])}><Cuboid half_size={[0.42, 0.49, 0.02]} /><Lit tex="aboard.png" /></Mesh3d>);
  for (const sx of [-1, 1]) P.push(<B key={`kabl${sx}`} name={`kabl${sx}`} p={[KX - 1.15 + sx * 0.36, 0.15 + 0.03, KF + 1.38]} s={[0.04, 0.06 * ab + 0.001, 0.04]}><Flat c="#8a8d95" /></B>);
  // detail behind the counter (on the back counter top, y 1.045): cup towers, syrup bottles on a two-tier rack; a pastry case;
  // three pendant lamps; the "order on the app" sticker on the side wall
  for (let n = 0; n < 4; n++) P.push(<Mesh3d key={`kcs${n}`} transform={Transform.fromXyz(KX - 1.75 + n * 0.16, 1.045 + 0.28 + (n % 2) * 0.08, KZ - 1.62)}><Cylinder radius={0.055} half_height={0.28 + (n % 2) * 0.08} /><Flat c="#fbfaf7" r={0.4} /></Mesh3d>);
  for (let n = 0; n < 6; n++) P.push(<Mesh3d key={`kbt${n}`} transform={Transform.fromXyz(KX + 1.1 + (n % 3) * 0.14, 1.215 + Math.floor(n / 3) * 0.5, KZ - 1.88)}><Cylinder radius={0.04} half_height={0.15} /><Flat c={["#7a4a2a", "#c98a3a", "#e9d9b8"][n % 3]} r={0.2} /></Mesh3d>);
  P.push(<B key="kbsh2" p={[KX + 1.24, 1.55, KZ - 1.88]} s={[0.6, 0.03, 0.22]}><Flat c={NAVY} /></B>);
  P.push(<B key="kpcase" p={[KX - 1.25, 1.27, KF - 0.4]} s={[0.9, 0.36, 0.5]}><StandardMaterial base_color={Srgba.hex("#dfe7ef").with_alpha(0.45)} alpha_mode="Blend" perceptual_roughness={0.05} /></B>);
  for (let n = 0; n < 4; n++) P.push(<Mesh3d key={`kpst${n}`} transform={Transform.fromXyz(KX - 1.55 + n * 0.2, 1.125, KF - 0.4)}><Cylinder radius={0.07} half_height={0.035} /><Flat c="#c98a3a" r={0.6} /></Mesh3d>);
  for (let n = 0; n < 3; n++) { P.push(<Mesh3d key={`klc${n}`} transform={Transform.fromXyz(KX - 1.1 + n * 1.1, 2.6, KZ + 0.2)}><Cylinder radius={0.006} half_height={0.2} /><Flat c="#30323a" /></Mesh3d>);
    P.push(<Mesh3d key={`klp${n}`} transform={Transform.fromXyz(KX - 1.1 + n * 1.1, 2.34, KZ + 0.2)}><Cylinder radius={0.12} half_height={0.06} /><Flat c="#fff4e0" e={glow("#ffd9a0", 3.5 * lights)} /></Mesh3d>); }
  P.push(<ImagePlane key="kapp" src={S("app.png")} width={0.42} position={[KX + KS / 2 + 0.015, 1.5, KZ + 1.1]} rotation={[0, Math.PI / 2, 0]} />);
  // the till: on "Fewer cashiers" its screen goes dark (the app took the queue)
  const tillOn = 1 - k(t, 16.6, 17.1);
  P.push(<Model key="ktill" src={S("CashRegister_01/CashRegister_01.gltf")} position={[KX + 0.55, 1.09, KF - 0.4]} rotation={[0, Math.PI, 0]} scale={[1.1, 1.1, 1.1]} />);
  P.push(<B key="ktsc" name="ktsc" p={[KX + 0.55, 1.42, KF - 0.28]} s={[0.24, 0.15, 0.01]} rot={[-0.35, 0, 0]}><Flat c="#1a1c22" e={glow("#7fb0ff", 1.6 * tillOn)} /></B>);
  // pickup shelf (app orders): cups appear as the pings land
  for (const sx of [-1, 1]) P.push(<B key={`kpsw${sx}`} p={[KX + 1.62 + sx * 0.39, 0.95, KF - 0.3]} s={[0.03, 1.5, 0.5]}><Flat c="#f3f0ea" r={0.5} /></B>);
  P.push(<B key="kpsb" p={[KX + 1.62, 0.95, KF - 0.54]} s={[0.8, 1.5, 0.03]}><Flat c="#f3f0ea" r={0.5} /></B>);
  for (let sh = 0; sh < 3; sh++) P.push(<B key={`kpss${sh}`} p={[KX + 1.62, 0.43 + sh * 0.45, KF - 0.3]} s={[0.75, 0.03, 0.47]}><Flat c={NAVY} r={0.5} /></B>);
  // the "200 sq ft" square, drawn on the paving round the kiosk on "200" (L02)
  const d = k(t, 8.75, 10.2, Easing.inOut(Easing.cubic)) * (1 - k(t, 13.0, 13.6)), half = KS / 2 + 0.25;
  const edges: [number, number, number, number][] = [[KX - half, KZ + half, 1, 0], [KX + half, KZ + half, 0, -1], [KX + half, KZ - half, -1, 0], [KX - half, KZ - half, 0, 1]];
  edges.forEach(([x, z, dx, dz], n) => { const u = Math.min(1, Math.max(0, d * 4 - n)), len = 2 * half * u;
    P.push(<B key={`ksq${n}`} name={`ksq${n}`} p={[x + dx * len / 2, 0.16, z + dz * len / 2]} s={[dx ? tiny(len) : 0.2, 0.014, dz ? tiny(len) : 0.2]}><Flat c={BLUE} r={0.6} /></B>); });
  const lab = k(t, 9.6, 10.1) * (1 - k(t, 13.0, 13.5));   /* only for its line */
  P.push(<Mesh3d key="ksql" name="ksql" castShadow={false} transform={Transform.fromXyz(KX - 0.9, 0.165, KF + 0.75).withRotation(Quat.fromRotationX(-Math.PI / 2)).withScale([tiny(lab), tiny(lab), 1])}><Cuboid half_size={[1.3, 0.42, 0.001]} /><StandardMaterial base_color="#ffffff" base_color_texture={S("sqft.png")} unlit alpha_mode={{ Mask: 0.5 }} /></Mesh3d>);
  // lights inside (lit by day too: the subject is the light) and the roller shutter
  P.push(<Shutter key="ksh" id="ksh" x={KX} w={KS - 0.25} h={2.45 * shut} z={KF + 0.04} c="#c9ccd6" top={2.3} />);
  return <>{P}</>;
}
// cups on the pickup shelf (L03) — one per landed ping
const PING_T = [14.05, 14.35, 14.6, 14.9, 15.2, 15.45];
function Pickup({ t }: { t: number }) {
  return <>{PING_T.map((t0, n) => { const g = k(t, t0 + 0.75, t0 + 1.0, Easing.out(Easing.cubic)); const sh = n % 3, col = Math.floor(n / 3);
    return <Mesh3d key={`pc${n}`} name={`pc${n}`} transform={Transform.fromXyz(KX + 1.47 + col * 0.3, 0.45 + sh * 0.45, KF - 0.22).withScale([tiny(g * 1.6), tiny(g * 1.6), tiny(g * 1.6)])} shape={so().cup}><Flat c="#fbfaf7" r={0.5} /></Mesh3d>; })}</>;
}
// order pings: from each lit phone down to the kiosk's counter, on an arc
function Pings({ t }: { t: number }) {
  return <>{PING_T.map((t0, n) => { const [px, py] = PHONES[n], u = k(t, t0, t0 + 0.8, Easing.inOut(Easing.quad)), vis = u > 0 && u < 1 ? 1 : 0;
    const a: [number, number, number] = [px, py, PHZ[n] + 0.15], b: [number, number, number] = [KX + 1.6, 1.4, KF + 0.2];
    const p = L3(a, b, u); p[1] += Math.sin(Math.PI * u) * 2.2;
    return <Mesh3d key={`pg${n}`} name={`pg${n}`} castShadow={false} transform={Transform.fromXyz(...p).withScale([tiny(vis), tiny(vis), tiny(vis)])} shape={so().pings}><Flat c="#5a6cff" e={glow("#6f80ff", 6)} /></Mesh3d>; })}</>;
}
// "No seats" (L02): a café's chairs and tables appear round the kiosk, then fold away
function GhostSeats({ t }: { t: number }) {
  const on = k(t, 11.25, 11.7, Easing.out(Easing.cubic)) * (1 - k(t, 12.15, 12.65, Easing.in(Easing.cubic)));
  const P: any[] = [];
  for (const [x, z] of [[27.9, -2.6], [27.9, 0.1], [26.8, 1.75]] as [number, number][]) {   /* the side the camera sees (user 2026-11-11) */
    P.push(<Mesh3d key={`gt${x}${z}`} name={`gt${x}${z}`} transform={Transform.fromXyz(x, 0.15 + 0.37 * on, z).withScale([tiny(on), tiny(on), tiny(on)])}><Cylinder radius={0.38} half_height={0.37} /><Flat c="#f6f4ef" r={0.5} /></Mesh3d>);
    for (const [dx, dz, r] of [[-0.75, 0, 1.57], [0.75, 0, -1.57]] as [number, number, number][])
      P.push(<Model key={`gc${x}${z}${dx}`} name={`gc${x}${z}${dx}`} src={S("plastic_monobloc_chair_01/plastic_monobloc_chair_01.gltf")} position={[x + dx, 0.15, z + dz]} rotation={[0, r, 0]} scale={[tiny(on), tiny(on), tiny(on)]}><StandardMaterial base_color="#f6f4ef" base_color_texture={null as any} /></Model>);
  }
  return <>{P}</>;
}

// ---------- the mall across the cross street: a front-row café (white), the RENT boards (L03) ----------
const MX = 60;
function Mall({ t }: { t: number }) {
  const P: any[] = [];
  P.push(<B key="mb" p={[MX, 9, -20]} s={[44, 18, 32]}><Plaster u={10} v={5} /></B>);
  P.push(<B key="mcan" p={[MX, 6.2, -3.6]} s={[44, 0.3, 1.2]}><Flat c="#f7f5f1" /></B>);
  for (let n = 0; n < 6; n++) P.push(<B key={`mgl${n}`} p={[MX - 18.3 + n * 7.3, 3.0, -4.05]} s={[6.6, 5.6, 0.08]}><Flat c="#b9c3cf" r={0.1} m={0.2} /></B>);
  P.push(<B key="msign" p={[MX, 13.5, -3.95]} s={[18, 2.6, 0.2]}><Flat c="#f2efe9" /></B>);
  P.push(<Mesh3d key="msignt" transform={Transform.fromXyz(MX - 6.2, 12.85, -3.8)}><Text3D size={1.6} depth={0.05}>THE MALL</Text3D><Flat c="#8a8d95" /></Mesh3d>);
  // the front-row café: a white awning, its name, outdoor seats
  P.push(<B key="cfa" p={[MX - 16.0, 3.3, -3.2]} s={[9, 0.12, 2.2]} rot={[0.18, 0, 0]}><Flat c="#fbfaf7" /></B>);
  P.push(<B key="cfs" p={[MX - 16.0, 4.6, -4.0]} s={[7, 0.9, 0.12]}><Flat c="#e9e6e0" /></B>);
  P.push(<Mesh3d key="cfst" transform={Transform.fromXyz(MX - 19.0, 4.33, -3.9)}><Text3D size={0.58} depth={0.03}>STARBUCKS</Text3D><Flat c="#6f727a" /></Mesh3d>);
  for (const [x, z] of [[MX - 19, -1.6], [MX - 16, -1.4], [MX - 13, -1.7]] as [number, number][]) {
    P.push(<Mesh3d key={`cft${x}`} transform={Transform.fromXyz(x, 0.52, z)}><Cylinder radius={0.4} half_height={0.37} /><Flat c="#f6f4ef" /></Mesh3d>);
    for (const dx of [-0.8, 0.8]) P.push(<WhiteModel key={`cfc${x}${dx}`} src="plastic_monobloc_chair_01/plastic_monobloc_chair_01.gltf" p={[x + dx, 0.15, z]} r={dx > 0 ? -1.57 : 1.57} />);
  }
  P.push(<B key="mpv" p={[MX, 0.075, -1.2]} s={[44, 0.15, 5.6]}><Tiles n="concrete_tiles" u={22} v={3} tint="#e4e0d8" /></B>);
  // the RENT boards: the mall's front row vs the side street (shown on "side streets … front row")
  const rb = k(t, 17.75, 18.3, Easing.out(Easing.cubic)), rm = k(t, 19.6, 20.15, Easing.out(Easing.cubic));
  P.push(<Mesh3d key="rbl" name="rbl" castShadow={false} transform={Transform.fromXyz(KX - 3.8, 2.0 + 0.7 * rb, KF + 0.2).withScale([tiny(rb), tiny(rb), 1])}><Cuboid half_size={[1.35, 0.66, 0.02]} /><Lit tex="rent_lane.png" /></Mesh3d>);
  P.push(<Mesh3d key="rbm" name="rbm" castShadow={false} transform={Transform.fromXyz(MX - 16.0, 7.6 + 0.6 * rm, -3.0).withScale([tiny(rm), tiny(rm), 1])}><Cuboid half_size={[2.7, 1.32, 0.02]} /><Lit tex="rent_mall.png" /></Mesh3d>);
  for (const [x, y, z, s, on] of [[KX - 3.8, 0.7, KF + 0.2, 1.3, rb]] as [number, number, number, number, number][])
    P.push(<B key={`rpost${x}`} name={`rpost${x}`} p={[x, (y + 0.7 * on) / 2 + 0.15, z - 0.03]} s={[0.08, tiny(y + 0.7 * on), 0.08]}><Flat c="#8a8d95" /></B>);
  return <>{P}</>;
}

// ---------- L04: the city from above — 1 light = 10 stores: 57 blue (566), 41 white (411) ----------
const LIGHTS: [number, number, number, number][] = (() => {
  let s = 35; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647); const out: [number, number, number, number][] = [];
  const roofs = CITY.map(([x, z, w, h]) => [x, z, w, h]);
  let tries = 0; while (out.length < 98 && tries++ < 5000) { const r = roofs[Math.floor(rnd() * roofs.length)], x = r[0] + (rnd() - 0.5) * r[2] * 0.7, z = r[1] + (rnd() - 0.5) * r[2] * 0.55; if (out.some(([a, , c]) => Math.hypot(a - x, c - z) < 4.6)) continue; out.push([x, r[3] + 3.4, z, out.length < 57 ? 1 : 0]); }   /* hover over the roof like map pins: clear of tanks, huts and ACs */
  return out;
})();
function CityLights({ t }: { t: number }) {
  let bi = 0, wi = 0;
  return <>{LIGHTS.map(([x, y, z, blue], n) => { const i = blue ? bi++ : wi++;
    const on = blue ? k(t, 22.6 + i * 0.028, 22.85 + i * 0.028, Easing.out(Easing.cubic)) : k(t, 24.9 + i * 0.035, 25.15 + i * 0.035, Easing.out(Easing.cubic));
    const off = 1 - k(t, 28.0, 28.6);
    return <Mesh3d key={`cl${n}`} name={`cl${n}`} castShadow={false} transform={Transform.fromXyz(x, y, z).withScale([tiny(on * off), tiny(on * off), tiny(on * off)])}><Cylinder radius={1.8} half_height={0.25} />
      <Flat c={blue ? BLUE : "#2b2d33"} e={blue ? glow(BLUE, 1.6) : undefined} />   {/* the other chain in charcoal: white on a white city disappears */}</Mesh3d>; })}</>;
}
// the two counts, flat on the biggest roofs (they read from above), and the legend
function Counts({ t }: { t: number }) {
  const z1 = k(t, 24.1, 24.6, Easing.out(Easing.cubic)), s1 = k(t, 26.35, 26.85, Easing.out(Easing.cubic)), lg = k(t, 22.4, 22.9);
  const fl = Quat.fromRotationX(-Math.PI / 2);
  return <>
    <Mesh3d name="cz" castShadow={false} transform={Transform.fromXyz(15.5, 40, -40).withRotation(fl).withScale([tiny(z1), tiny(z1), 1])}><Cuboid half_size={[9.5, 4.94, 0.02]} /><Lit tex="bb_zus.png" /></Mesh3d>
    <Mesh3d name="cs" castShadow={false} transform={Transform.fromXyz(15.5, 40, -26).withRotation(fl).withScale([tiny(s1), tiny(s1), 1])}><Cuboid half_size={[9.5, 4.94, 0.02]} /><Lit tex="bb_sb.png" /></Mesh3d>
    <Mesh3d name="clg" castShadow={false} transform={Transform.fromXyz(15.5, 40, -16.5).withRotation(fl).withScale([tiny(lg), tiny(lg), 1])}><Cuboid half_size={[6.0, 1.33, 0.02]} /><Lit tex="legend.png" /></Mesh3d>
  </>;
}

// ---------- the token: a ZUS cup, and the other café's cup (L01) ----------
function Cup({ id, p, zus, s = 1 }: { id: string; p: [number, number, number]; zus: boolean; s?: number }) {
  const g = tiny(s);
  return <>
    <Mesh3d name={`${id}c`} transform={Transform.fromXyz(...p).withScale([g, g, g])} shape={so().cup}><Flat c={zus ? "#fbfaf7" : "#f4f1ea"} r={0.45} /></Mesh3d>
    <Mesh3d name={`${id}s`} transform={Transform.fromXyz(p[0], p[1] + 0.045 * g, p[2]).withScale([g, g, g])} shape={so().sleeve}><Flat c={zus ? BLUE : "#d8d2c6"} r={0.5} /></Mesh3d>
    {zus ? <ImagePlane key={`${id}l`} src={S("zus_white.png")} width={0.085} position={[p[0], p[1] + 0.075, p[2] + 0.052]} /> : <></>}
  </>;
}

// traffic on the far lane: three cars, timed so none crosses the kiosk's reads (L01 pull-back, L02 square, L03 street, L06)
const LANE = AR + 6.9;
function Traffic({ t }: { t: number }) {
  const cars: [string, number, number, string][] = [["ta", -70 + 9 * t, 0, "#8f939b"], ["tb", 160 - 9 * t, Math.PI, "#c2bbb0"], ["tc", -70 + 9 * Math.max(0, t - 19.5), 0, "#6f737b"]];
  return <>{cars.map(([id, x, yaw, c]) => <Model key={id} name={id} src={S("car_b.glb")} position={[Math.max(-80, Math.min(110, x)), 0, LANE + (yaw ? -0.9 : 0)]} rotation={[0, yaw + Math.PI / 2, 0]}><StandardMaterial material="Blue" base_color={c} perceptual_roughness={0.35} /></Model>)}</>;
}
// the Meikigo end card (silent; house rule: no sound on the logo)
function EndCard({ t }: { t: number }) {
  const u = k(t, 34.95, 35.5, Easing.out(Easing.cubic));
  if (u <= 0) return null;
  return <div style={{ position: "absolute", inset: 0, background: "#f2ede4", opacity: u, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    <Img src={S("meikigo-logo.png")} style={{ height: 420, transform: `scale(${0.92 + 0.08 * u})` }} />
    <div style={{ marginTop: 40, fontFamily: "Inter Display", fontWeight: 700, fontSize: 76, color: "#2a2c31", letterSpacing: -1 }}>Meikigo</div>
  </div>;
}

// ---------------------------------------------------------------------------------------------------------------------
// the film, on the voice: L01 0.3 · L02 7.95 · L03 13.35 · L04 21.4 · L05 28.45 · L06 31.5 · end 35.8
const END = 37.4;   // +1.6 s: the Meikigo end card
const CT = 1.09;                                         // counter-top height (cups stand on it)
function Film() {
  const F = useCurrentFrame(), T = F / FPS;
  const io = Easing.inOut(Easing.cubic), K = (a: number, b: number) => k(T, a, b, io);
  // L01: the two cups slide in along the counter from opposite ends, already moving on frame 1; they stop with weight
  const slide = k(T, -1.4, 1.1, Easing.out(Easing.cubic));   /* mid-slide on frame 1 */
  const cz = KF - 0.32;
  const zusCup: [number, number, number] = [KX - 0.35 - lerp(0.9, 0.1, slide), CT, cz];
  const sbCup: [number, number, number] = [KX - 0.35 + lerp(0.9, 0.1, slide), CT, cz];
  const tagZ = k(T, 1.45, 1.85, Easing.out(Easing.cubic)), tagS = k(T, 4.55, 4.95, Easing.out(Easing.cubic));
  const sbGone = 1 - k(T, 7.3, 7.9);                    // the other café's cup leaves once the question is asked
  let cam: [number, number, number], look: [number, number, number], fov = 0.6;
  if (T < 7.4) {                    // L01: close on the counter → pull back to the kiosk on "How is ZUS so cheap?"
    const back = K(5.75, 7.4);
    cam = L3([KX - 0.35, CT + 0.3, cz + 1.25], [KX + 6.5, 4.8, KF + 11], back); look = L3([KX - 0.35, CT + 0.17, cz], [KX, 1.7, KZ], back);
    fov = lerp(0.5, 0.62, back);
  } else if (T < 13.3) {            // L02: near-iso over the plaza: the 200 sq ft square, the seats that aren't there
    const u = K(7.4, 9.0);
    cam = L3([KX + 6.5, 4.8, KF + 11], [KX + 8.5, 11.5, KF + 13.5], u); look = L3([KX, 1.7, KZ], [KX + 0.7, 0.2, KZ + 1.2], u);   /* the label above the caption band; the seats' side in view */
    cam[0] += -1.2 * K(9.0, 13.3);
  } else if (T < 21.1) {            // L03: up to the phones in the windows, the pings down; the till; then the lane vs the mall
    const up = K(13.3, 14.2), till = K(16.2, 16.8), wide = K(17.3, 18.3), mall = K(19.35, 20.4);
    const cA: [number, number, number] = [5.5, 7.2, 9.0], lA: [number, number, number] = [19.5, 2.6, 0.8];   /* down the street: the phones near, the kiosk further on; the pings run between (portrait) */
    const cB: [number, number, number] = [KX + 2.6, 2.3, KF + 3.6], lB: [number, number, number] = [KX + 0.6, 1.3, KF - 0.5];
    const cC: [number, number, number] = [KX - 2.2, 4.2, KF + 8.5], lC: [number, number, number] = [KX - 3.1, 2.3, KF];
    const cD: [number, number, number] = [MX - 16, 9.2, 15], lD: [number, number, number] = [MX - 16, 6.2, -3];
    cam = L3(L3(L3(L3([KX + 7.3, 11.5, KF + 13.5], cA, up), cB, till), cC, wide), cD, mall);
    look = L3(L3(L3(L3([KX - 0.8, 0.2, KZ + 1.4], lA, up), lB, till), lC, wide), lD, mall);
  } else if (T < 28.3) {            // L04: up above the city: blue lights outnumber the white ones; the two counts
    const up = K(21.1, 22.6);
    cam = L3([MX - 16, 9.2, 15], [15.5, 128, 2], up); look = L3([MX - 16, 6.2, -3], [15.5, 0, -30], up);
    fov = lerp(0.62, 0.68, up);
    cam[1] -= 6 * K(22.6, 28.3);
  } else if (T < 31.4) {            // L05: down to the kiosk's menu board: it flips to the year's revenue
    const dn = K(28.3, 29.3);
    cam = L3([15.5, 122, 2], [KX - 0.4, 1.35, KF + 3.6], dn); look = L3([15.5, 0, -30], [KX - 1.0, 0.85, KF + 1.3], dn);
    fov = lerp(0.68, 0.62, dn);
  } else {                          // L06: out to the kiosk at closing; the shutter rolls down; silent end
    const out = K(31.4, 33.2);
    cam = L3([KX - 0.4, 1.35, KF + 3.6], [KX + 5.5, 5.2, KF + 12], out); look = L3([KX - 1.0, 0.85, KF + 1.3], [KX, 1.5, KZ], out);
    cam[0] += 0.5 * K(33.2, END);
  }
  const focus = Math.hypot(cam[0] - look[0], cam[1] - look[1], cam[2] - look[2]);
  return (
    <AbsoluteFill style={{ background: "#cdd6e3" }}>
      <Camera3d transform={Transform.fromXyz(...cam).lookingAt(look)} projection={{ Perspective: { fov } }}>
        <DepthOfField focal_distance={focus} aperture_f_stops={focus < 3 ? 4 : 8} />
      </Camera3d>
      <Environment src={S("sky.hdr")} intensity={0.55} rotation={2.6} />
      <AmbientLight brightness={12} color="#eef2ff" />
      <DirectionalLight color="#fff0dc" transform={Transform.fromXyz(-26, 22, 18).lookingAt([6, 0, -4])} illuminance={11000} shadow_maps_enabled soft_shadow_size={0.4} />
      <Shadows distance={90} firstCascade={22} mapSize={4096} bias={0.04} normalBias={1.5} />
      {/* the kiosk is the light: warm inside, its blue fascia glowing onto the paving */}
      <RectLight transform={Transform.fromXyz(KX, 2.75, KZ + 0.4).lookingAt([KX, 0, KZ + 0.6])} intensity={70000} width={KS - 0.6} height={KS - 0.8} color="#ffe6c2" range={9} />
      <PointLight transform={Transform.fromXyz(KX, 2.6, KF + 1.0)} intensity={140000} color="#7f8cff" range={6} />
      <Fog color="#d9dee7" near={160} far={420} />
      <Bloom intensity={0.5} threshold={0.95} />
      <AmbientOcclusion quality="high" />
      <ToneMapping mode="agx" exposure={0.52} />
      <Grade temperature={0.02} vignette={0.2} midtones={{ saturation: 1.08, contrast: 1.22, gamma: 1, gain: 1, lift: 0 }} />
      <Street />
      {UNITS.map((i) => <Unit key={i} i={i} t={T} />)}
      <Phones t={T} />
      <Kiosk t={T} />
      <Pickup t={T} />
      <Pings t={T} />
      <GhostSeats t={T} />
      <Mall t={T} />
      <CityLights t={T} />
      <Counts t={T} />
      <Cup id="zc" p={zusCup} zus s={1} />
      <Cup id="sc" p={sbCup} zus={false} s={sbGone} />
      <Mesh3d name="tgz" castShadow={false} transform={Transform.fromXyz(zusCup[0], CT + 0.3, cz).withScale([tiny(tagZ), tiny(tagZ), 1])}><Cuboid half_size={[0.075, 0.044, 0.002]} /><Lit tex="tag_zus.png" /></Mesh3d>
      <Mesh3d name="tgs" castShadow={false} transform={Transform.fromXyz(sbCup[0], CT + 0.3, cz).withScale([tiny(tagS * sbGone), tiny(tagS * sbGone), 1])}><Cuboid half_size={[0.075, 0.044, 0.002]} /><Lit tex="tag_sb.png" /></Mesh3d>
      <Traffic t={T} />
      <Captions blocks={CAPS as CapBlock[]} frame={F} fps={FPS} />
      <EndCard t={T} />
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="ex35" component={Film} width={1080} height={1920} fps={FPS} durationInFrames={2244} />);
