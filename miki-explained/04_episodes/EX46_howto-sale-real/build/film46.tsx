// EX46 — Sale ni betul ke tipu? (S16 How to, Bahasa Melayu). Shop aisle, phone, counter, fine, tag wall; sale red the one accent.
// Style D motion (RECIPE-D). Assembled: head46 + film46 + cammap → film46.tsx (assemble.sh)
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
import TL from "./tl.json";
const S = (p: string) => staticFile(p);

// ================= EX46 film: time hangs on the user's words (tl.json); camera, captions, board machinery from EX45 =================
const FPS = 30, OFF = 0, RFPS = 30, HUD = false;
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
const glow = (hex: string, k: number) => LinearRgba.from(Srgba.hex(hex)).mul(k);
const sc3 = (s: number) => { const v = Math.max(0.001, s); return [v, v, v] as [number, number, number]; };
const TX = (n: string) => S(`tx/${n}.png`);
const G = (id: string) => S(`${id}/${id}_g.gltf`);
const GSO: [string, number, number][] = [["Threshold_Porcelain_Teapot_White", 0.187, 0.184], ["Threshold_Porcelain_Pitcher_White", 0.239, 0.169], ["Cole_Hardware_Mug_Classic_Blue", 0.166, 0.126], ["Room_Essentials_Mug_White_Yellow", 0.137, 0.102], ["Chefmate_8_Frypan", 0.356, 0.204], ["Room_Essentials_Dish_Drainer_Collapsible_White", 0.316, 0.368], ["Bradshaw_International_11642_7_Qt_MP_Plastic_Bowl", 0.283, 0.285], ["Ecoforms_Plant_Container_12_Pot_Nova", 0.297, 0.297], ["Threshold_Porcelain_Serving_Bowl_Coupe_White", 0.208, 0.209], ["Black_Decker_Stainless_Steel_Toaster_4_Slice", 0.288, 0.318], ["Cole_Hardware_Deep_Bowl_Good_Earth_1075", 0.284, 0.284]];   /* id, width x, depth z (m), Google Scanned Objects CC-BY 4.0 */
const GS = (id: string) => S(`gso/${id}_g.glb`), HERO_P = GS("TriStar_Products_PPC_Power_Pressure_Cooker_XL_in_Black");
const eo = (x: number) => 1 - Math.pow(1 - cl(x), 5);
const onO = (i: number, d = 0.3, off = 0) => eo((T - (W(i) + off)) / d);
const BG = "#0d0e11", PAPER = "#f2f3f5", INK = "#1b1d22", MUTE = "#9aa0a8", RED = "#c8161d", RHOT = "#ff3b3b", WARM = "#ffd9a8", PINK = RED;
const PS = "'Public Sans', 'Helvetica Neue', Arial, sans-serif";
const TAB = { fontVariantNumeric: "tabular-nums" } as const;

// setup boundaries, each on a word (see episode.md shot list v2)
const ST = [0, W(5) - 0.1, W(7) - 0.1, W(10) - 0.1, W(16) - 0.1, W(20) - 0.1, W(23) - 0.1, W(28) + 0.15, W(42) - 0.1, W(55) - 0.1, W(61) - 0.1,
  W(69) - 0.1, W(72) - 0.1, W(76) - 0.1, W(80) - 0.1, W(93) - 0.15, W(95) - 0.1, W(99) - 0.1, W(110) - 0.45, W(115) - 0.45, W(121) - 0.1, W(126) - 0.45, W(132) - 0.1, W(136) - 0.1, DUR];
const NSET = ST.length - 1;

// ================= the sale tag (hero): a red card on a string, a separate "dari RM299" sticker, a strike line =================
// pivot = the hook point; the card hangs 2.5 cm below on its string. split: the sticker lifts off the card (cutaway).
function Tag({ k, p, ry = 0, sw = 0, swz = 0, split = 0, strike = 1, tex = "tag_front", sticker = true, flat = false, s = 1 }: { k: string; p: number[]; ry?: number; sw?: number; swz?: number; split?: number; strike?: number; tex?: string; sticker?: boolean; flat?: boolean; s?: number }) {
  const q = flat ? Quat.fromEuler("YXZ", ry, -Math.PI / 2, 0) : Quat.fromEuler("YXZ", ry, sw, swz), cy = flat ? 0 : -0.07;
  return (<Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(q).withScale(sc3(s))}>
    {flat ? null : <Mesh3d name={k + "str"} transform={Transform.fromXyz(0, -0.0125, 0)}><Cylinder radius={0.0005} half_height={0.0125} /><StandardMaterial base_color="#e9e4da" perceptual_roughness={0.8} /></Mesh3d>}
    <Mesh3d name={k + "cd"} transform={Transform.fromXyz(0, cy, 0)}><Cuboid half_size={[0.03, 0.045, 0.0005]} /><StandardMaterial base_color_texture={TX(tex)} perceptual_roughness={0.7} emissive={glow("#ff6a5a", 0.05)} emissive_texture={TX(tex)} /></Mesh3d>
    {sticker ? <Entity transform={Transform.fromXyz(0, cy + 0.0195, 0.0007).withRotation(Quat.fromEuler("XYZ", -split * 1.25, 0, 0))}>
      <Mesh3d name={k + "sk"} transform={Transform.fromXyz(0, -0.0085, 0.0002 * split)}><Cuboid half_size={[0.024, 0.0085, 0.0002]} /><StandardMaterial base_color_texture={TX("was_sticker")} perceptual_roughness={0.5} emissive={glow("#ff6a5a", 0.06)} emissive_texture={TX("was_sticker")} /></Mesh3d>
      <Mesh3d name={k + "bk"} transform={Transform.fromXyz(0, -0.0085, -0.00025)}><Cuboid half_size={[0.0242, 0.0087, 0.0001]} /><StandardMaterial base_color="#e9e2d6" perceptual_roughness={0.85} /></Mesh3d>
      <Mesh3d name={k + "ln"} transform={Transform.fromXyz(-0.021 + 0.021 * strike, -0.0085, 0.0004).withScale([Math.max(0.001, strike), 1, 1])}><Cuboid half_size={[0.021, 0.0008, 0.0001]} /><StandardMaterial base_color="#ffffff" emissive={glow("#ffffff", 0.6)} /></Mesh3d>
    </Entity> : null}
  </Entity>);
}
const swingOn = (i: number, a = 0.22, d = 2.4) => { const x = T - W(i); return x < 0 ? 0 : a * Math.exp(-x * 1.6) * Math.sin(x * 6.5) * (x < d ? 1 : 0); };

// ================= set "a": the shop aisle (steel shelves, boxed goods, fluorescent tube), the hero tag hangs on its hook =================
const SHB = [0.125, 0.642, 1.143, 1.64, 2.13];             /* measured tops + 4 mm */                // board tops (steel_frame_shelves_01 at 0.1 scale)
const HOOK = [0.0, 1.11, 0.3];                             // hero hook point
const TAGC = [HOOK[0], HOOK[1] - 0.07, HOOK[2]];          // the card's centre
const STK = [0.42, SHB[1], 0.14];                          // the stack of tags the stamp prints
function Aisle({ n }: { n: number }) {
  const P: any[] = [];
  P.push(<Mesh3d key="fl" transform={Transform.fromXyz(0, -0.02, 0)}><Cuboid half_size={[8, 0.02, 8]} /><StandardMaterial base_color="#0b0c0e" normal_map_texture={S("tex/floor_tiles_06_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([16, 16])} perceptual_roughness={0.18} /></Mesh3d>);
  const shm = <StandardMaterial material="steel_frame_shelves_01" base_color="#5d6067" />;
  for (const x of [-1.1, 0, 1.1]) P.push(<Model key={"sh" + x} src={G("steel_frame_shelves_01")} position={[x, 0, 0]} scale={[0.1, 0.1, 0.1]}>{shm}</Model>);
  // the back row (soft, out of focus): a second run across the aisle, seen in the wide
  for (const x of [-1.1, 0, 1.1]) P.push(<Model key={"bk" + x} src={G("steel_frame_shelves_01")} position={[x, 0, -1.9]} scale={[0.1, 0.1, 0.1]}>{shm}</Model>);
  // real products (Google Scanned Objects, greyed): a seeded packer per board, clear of the posts, the hero and the stamp stack
  const POSTS = [-1.65, -0.55, 0.55, 1.65];
  let pk = 0;
  SHB.slice(0, 4).forEach((by, bi) => { let x = -1.6;
    const keep: number[][] = bi === 1 ? [[-0.2, 0.2], [STK[0] - 0.08, STK[0] + 0.08]] : [];
    while (x < 1.6) { const g = GSO[Math.floor(rnd(pk * 3 + bi * 17) * GSO.length)], w = g[1], x0 = x + 0.015, x1 = x0 + w;
      const hit = POSTS.some((q) => x1 > q - 0.035 && x0 < q + 0.035) || keep.some(([a0, a1]) => x1 > a0 && x0 < a1);
      if (x1 > 1.6) break;
      if (hit) { x += 0.04; continue; }
      P.push(<Model key={"gp" + pk} src={GS(g[0])} position={[(x0 + x1) / 2, by, 0.03 + (0.2 - g[2] / 2) * rnd(pk + 70) * 0.5]} rotation={[0, (rnd(pk + 90) - 0.5) * 0.6, 0]} />);
      pk++; x = x1 + 0.02 + rnd(pk + 30) * 0.05; } });
  // the hero product: the pressure cooker behind the tag
  P.push(<Model key="hero_p" src={HERO_P} position={[0.0, SHB[1], 0.02]} rotation={[0, 0, 0]} />);
  // hook rail along the 1.13 board's lip + the hero's peg hook
  P.push(<Mesh3d key="rail" transform={Transform.fromXyz(0, SHB[2] - 0.01, 0.262)}><Cuboid half_size={[1.65, 0.012, 0.004]} /><StandardMaterial base_color="#7d828b" metallic={0.6} perceptual_roughness={0.35} /></Mesh3d>);
  P.push(<Mesh3d key="peg" transform={Transform.fromXyz(HOOK[0], HOOK[1], 0.28).withRotation(Quat.fromEuler("XYZ", Math.PI / 2, 0, 0))}><Cylinder radius={0.0018} half_height={0.022} /><StandardMaterial base_color="#c3c7ce" metallic={0.7} perceptual_roughness={0.25} /></Mesh3d>);
  // more tags along the rail (plain prices, out of focus): the hero is one of many
  [-0.9, -0.55, 0.45, 0.8, 1.25].forEach((x, j) => P.push(<Tag key={"ot" + j} k={"ot" + j} p={[x, HOOK[1], HOOK[2] - 0.01]} sw={Math.sin(T * 1.1 + j) * 0.03} ry={(rnd(j + 40) - 0.5) * 0.5} tex="tag_blank" sticker={false} />));
  // the hero tag: strike draws at frame 0; swings on "untung"; turns side-on and splits on "RM299" (n 5–6)
  const strike = n === 1 ? 0.3 + 0.7 * eo(T / 1.1) : 1;
  const turn = 0, split = n === 5 ? eo((T - (W(16) + 0.1)) / 0.7) : n === 6 ? 1 : 0;
  const swing = (n <= 4 ? swingOn(10) + swingOn(7, 0.08) : 0) + Math.sin(T * 0.9) * 0.015;
  P.push(<Tag key="hero" k="hero" p={HOOK} sw={swing} swz={swing * 0.3} ry={turn * -1.1} split={split} strike={strike} s={n === 8 ? Math.max(0.001, 1 - eo((T - (W(39) - 0.45)) / 0.35)) : 1} />);
  // the stamp and the stack (n 7): it comes down on "reka", prints, lifts; ink dust puffs
  const down = n === 7 ? eo((T - (W(23) - 0.25)) / 0.25) * (1 - eo((T - (W(23) + 0.2)) / 0.4)) : 0;
  for (let j = 0; j < 9; j++) P.push(<Tag key={"sk" + j} k={"st" + j} p={[STK[0] + (rnd(j) - 0.5) * 0.008, STK[1] + 0.001 + j * 0.0011, STK[2] + (rnd(j + 2) - 0.5) * 0.008]} ry={(rnd(j + 5) - 0.5) * 0.12} flat tex="tag_front" sticker={false} />);
  P.push(<Mesh3d key="stp" name="stp" transform={Transform.fromXyz(STK[0], STK[1] + 0.0115, STK[2]).withRotation(Quat.fromEuler("YXZ", (rnd(13) - 0.5) * 0.12, -Math.PI / 2, 0)).withScale(sc3(n === 7 && T > W(23) ? 1 : 0))}><Cuboid half_size={[0.024, 0.0085, 0.0003]} /><StandardMaterial base_color_texture={TX("was_stamped")} perceptual_roughness={0.6} /></Mesh3d>);
  P.push(<Model key="stamp" src={S("parts/stamp.glb")} position={[STK[0], STK[1] + 0.012 + (1 - down) * 0.12 + (n === 7 ? 0.5 * eo((T - (W(23) + 0.45)) / 0.6) : 0.6), STK[2]]} scale={[0.22, 0.22, 0.22]} />);
  if (n === 7) for (let j = 0; j < 14; j++) { const x = T - W(23); const a = x > 0 && x < 0.9 ? (1 - x / 0.9) : 0, r = 0.03 + x * 0.09 * (0.6 + rnd(j));
    P.push(<Mesh3d key={"ink" + j} name={"ink" + j} transform={Transform.fromXyz(STK[0] + Math.cos(j * 2.4) * r, STK[1] + 0.02 + x * 0.05 * rnd(j + 1), STK[2] + Math.sin(j * 2.4) * r).withScale(sc3(a * (0.6 + rnd(j + 7))))}><Sphere radius={0.0025} /><StandardMaterial base_color={RED} emissive={glow(RHOT, 1.5)} /></Mesh3d>); }
  // shot 8: three step tags hang from a rail in front of the hero box, each swings in on its number
  if (n === 8) [0, 1, 2].forEach((j) => { const x = T - (W(39) - 0.3 + j * 0.25), v = eo(x / 0.45);
    P.push(<Tag key={"sp" + j} k={"sp" + j} p={[-0.11 + j * 0.11, HOOK[1], HOOK[2] + 0.06]} sw={(1 - v) * -1.2 + (x > 0 ? 0.15 * Math.exp(-x * 2) * Math.sin(x * 7) : 0)} tex={"step" + (j + 1)} sticker={false} s={1.25 * Math.max(0.001, v)} />); });
  // the tube light over the aisle
  P.push(<Model key="fluo" src={G("mounted_fluorescent_lights")} position={[0, 2.7, 0.55]} />);
  return (<>{P}
    <RectLight transform={Transform.fromXyz(0, 2.6, 0.6).lookingAt([0, 0.9, 0.3])} intensity={26000} width={0.9} height={0.2} color="#e8eefc" range={6} />
    <SpotLight transform={Transform.fromXyz(0.5, 1.9, 1.3).lookingAt([TAGC[0], TAGC[1], TAGC[2]])} intensity={9000} outer_angle={0.32} inner_angle={0.12} color={WARM} shadows_enabled range={4} />
    <SpotLight transform={Transform.fromXyz(-0.9, 1.4, 1.2).lookingAt([0, 1.0, 0.2])} intensity={2600} outer_angle={0.6} inner_angle={0.3} color="#9db4e0" range={5} />
    <SpotLight transform={Transform.fromXyz(STK[0] + 0.3, STK[1] + 0.8, STK[2] + 0.6).lookingAt(STK as any)} intensity={5000} outer_angle={0.35} inner_angle={0.15} color={WARM} range={3} />
    <RectLight transform={Transform.fromXyz(0, 2.4, -1.4).lookingAt([0, 1, -1.9])} intensity={4000} width={2.4} height={0.3} color="#8fa6cf" range={4} />
    <PointLight transform={Transform.fromXyz(TAGC[0], TAGC[1] + 0.02, TAGC[2] + 0.12)} intensity={60} color="#ff4a4a" range={0.5} />
    <AmbientLight brightness={10} color="#b4bccb" />
    <Environment src={S("sky.hdr")} intensity={0.08} />
  </>);
}

// ================= set "c": the checkout counter (register, thermal printer that goes see-through, the receipt, a bag, the law card, the folder) =================
const CX = 30, CTOP = 0.92;
const PR = [CX + 0.18, CTOP, 0.1];                      // thermal printer base centre
const RC = [CX - 0.05, CTOP + 0.0012, 0.22];            // receipt lying on the counter (n 15+)
const TG = [CX + 0.04, CTOP + 0.0012, 0.23];            // the shelf tag lying beside it
const RROW = 0.07 - 0.14 * 0.205;                       // the 169.00 row, local z from the receipt's centre (top edge = -0.07)
function Counter({ n }: { n: number }) {
  const P: any[] = [];
  P.push(<Mesh3d key="cfl" transform={Transform.fromXyz(CX, -0.02, 0)}><Cuboid half_size={[6, 0.02, 6]} /><StandardMaterial base_color="#0b0c0e" normal_map_texture={S("tex/floor_tiles_06_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([12, 12])} perceptual_roughness={0.2} /></Mesh3d>);
  P.push(<Mesh3d key="cbd" transform={Transform.fromXyz(CX, CTOP / 2 - 0.01, 0)}><Cuboid half_size={[0.8, CTOP / 2 - 0.01, 0.4]} /><StandardMaterial base_color="#2a2c31" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} perceptual_roughness={0.6} /></Mesh3d>);
  P.push(<Mesh3d key="ctp" transform={Transform.fromXyz(CX, CTOP - 0.01, 0)}><Cuboid half_size={[0.84, 0.01, 0.44]} /><StandardMaterial base_color_texture={S("tex/marble_01_diff_1k.jpg")} base_color="#55585e" normal_map_texture={S("tex/marble_01_nor_gl_1k.jpg")} perceptual_roughness={0.25} /></Mesh3d>);
  // conveyor strip in front (dark rubber, ribbed)
  P.push(<Mesh3d key="cnv" transform={Transform.fromXyz(CX - 0.45, CTOP + 0.004, 0.05)}><Cuboid half_size={[0.32, 0.004, 0.3]} /><StandardMaterial base_color="#16171a" normal_map_texture={S("tex/concrete_tiles_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([1, 8])} perceptual_roughness={0.75} /></Mesh3d>);
  P.push(<Model key="reg" src={G("CashRegister_01")} position={[CX + 0.62, CTOP, -0.3]} rotation={[0, -0.45, 0]} />);
  // the hero box rides the conveyor in on "Step dua" (n 12)
  const ride = n === 12 ? eo((T - W(69)) / 0.9) : 1;
  P.push(<Model key="cbx" src={HERO_P} position={[CX - 0.85 + 0.42 * ride - (n >= 13 ? 3 : 0), CTOP + 0.008, -0.02]} rotation={[0, 0.3, 0]} />);
  // the thermal printer: dark body, its shell turns see-through on "kaunter" (n 13)
  const xr = n === 13 ? eo((T - W(72)) / 0.5) : n === 14 ? 1 - eo((T - (W(78) - 0.2)) / 0.5) : 0;
  const shell = <StandardMaterial base_color={Srgba.hex("#2b2d33").with_alpha(1)} alpha_mode="Blend" perceptual_roughness={0.45} metallic={0.2} />;
  P.push(<Mesh3d key="pb" name="pb" transform={Transform.fromXyz(PR[0], PR[1] + 0.045, PR[2])}><Cuboid half_size={[0.065, 0.043, 0.08]} />{shell}</Mesh3d>);
  P.push(<Mesh3d key="pcav" transform={Transform.fromXyz(PR[0], PR[1] + 0.086, PR[2] - 0.015)}><Cuboid half_size={[0.05, 0.002, 0.045]} /><StandardMaterial base_color="#0a0b0d" perceptual_roughness={0.9} /></Mesh3d>);
  P.push(<Entity key="plh" transform={Transform.fromXyz(PR[0], PR[1] + 0.092, PR[2] - 0.08).withRotation(Quat.fromEuler("XYZ", -0.12 - 1.15 * xr, 0, 0))}><Mesh3d name="pl" transform={Transform.fromXyz(0, 0.004, 0.062)}><Cuboid half_size={[0.066, 0.006, 0.062]} />{shell}</Mesh3d></Entity>);
  P.push(<Mesh3d key="pled" name="pled" transform={Transform.fromXyz(PR[0] + 0.045, PR[1] + 0.06, PR[2] + 0.081)}><Cuboid half_size={[0.004, 0.004, 0.001]} /><StandardMaterial base_color="#3ad17a" emissive={glow("#3ad17a", 3)} /></Mesh3d>);
  // inside: the paper roll (shows when see-through), turning while it prints
  const feed = n === 13 ? eo((T - W(74)) / 1.1) : n === 14 ? 1 : 0;
  P.push(<Mesh3d key="roll" name="roll" allowOverlap transform={Transform.fromXyz(PR[0], PR[1] + 0.07, PR[2] - 0.015).withRotation(Quat.fromEuler("XYZ", feed * 9, 0, Math.PI / 2))}><Cylinder radius={0.032} half_height={0.029} /><StandardMaterial base_color="#efede6" perceptual_roughness={0.6} /></Mesh3d>);
  // the receipt coming out of the slot (n 13–14): grows up out of the lid, top of the print first; n 14 it lifts toward the bag and stops
  const lift = n === 14 ? eo((T - W(76)) / 0.9) : 0;
  if (n === 13 || n === 14) { const L = Math.max(0.002, 0.14 * feed);
    P.push(<Mesh3d key="rcp" name="rcp" transform={Transform.fromXyz(PR[0] - 0.12 * lift, PR[1] + 0.1 + L / 2 + 0.06 * lift, PR[2] + 0.03 + 0.05 * lift).withRotation(Quat.fromEuler("XYZ", -0.35 + 0.25 * lift, 0.3 * lift, 0))}>
      <Cuboid half_size={[0.026, L / 2, 0.0003]} /><StandardMaterial base_color_texture={TX("receipt")} uv_transform={Affine2.fromScale([1, Math.max(0.02, feed)])} perceptual_roughness={0.6} emissive={glow("#ffffff", 0.08)} emissive_texture={TX("receipt")} /></Mesh3d>); }
  // the paper bag (kraft-grey), open at the top
  const bag = <StandardMaterial base_color="#8a7458" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} perceptual_roughness={0.85} />;
  const BGP = [CX - 0.15, CTOP, -0.05];
  [[0, 0.15, 0.07, 0.12, 0.15, 0.002], [0, 0.15, -0.07, 0.12, 0.15, 0.002], [0.12, 0.15, 0, 0.002, 0.15, 0.07], [-0.12, 0.15, 0, 0.002, 0.15, 0.07], [0, 0.002, 0, 0.12, 0.002, 0.07]].forEach(([x, y, z, a, b, c], j) =>
    P.push(<Mesh3d key={"bg" + j} transform={Transform.fromXyz(BGP[0] + x, BGP[1] + y, BGP[2] + z)}><Cuboid half_size={[a, b, c]} />{bag}</Mesh3d>));
  [-0.05, 0.05].forEach((hx, j) => [[-0.025, 0.33, 0.0015, 0.03], [0.025, 0.33, 0.0015, 0.03], [0, 0.36, 0.027, 0.0015]].forEach(([x, y, a, b], m) =>
    P.push(<Mesh3d key={"bh" + j + m} transform={Transform.fromXyz(BGP[0] + hx * 0 + x, BGP[1] + y, BGP[2] + (j ? 0.07 : -0.07))}><Cuboid half_size={[a, b, 0.0015]} />{bag}</Mesh3d>)));
  // n 15+: the receipt and the shelf tag side by side on the counter; the 169 row lights; RM169 struck; RM149 stamped on "murah" (n 16)
  if (n >= 15) {
    P.push(<Mesh3d key="rcf" name="rcf" transform={Transform.fromXyz(RC[0], RC[1], RC[2]).withRotation(Quat.fromEuler("YXZ", 0.06, 0, 0))}><Cuboid half_size={[0.026, 0.0003, 0.07]} /><StandardMaterial base_color_texture={TX("receipt")} perceptual_roughness={0.6} emissive={glow("#ffffff", 0.06)} emissive_texture={TX("receipt")} /></Mesh3d>);
    const hl = n === 15 ? onO(84, 0.35, -0.05) : 1;
    P.push(<Mesh3d key="rhl" name="rhl" transform={Transform.fromXyz(RC[0], RC[1] + 0.0004, RC[2] - RROW).withRotation(rotY(0.06)).withScale([Math.max(0.001, hl), 1, 1])}><Cuboid half_size={[0.025, 0.0001, 0.0028]} /><StandardMaterial base_color={Srgba.hex(RED).with_alpha(0.28)} alpha_mode="Blend" emissive={glow(RHOT, 0.6)} /></Mesh3d>);
    const st = n === 16 ? eo((T - (W(93) - 0.1)) / 0.3) : n > 16 ? 1 : 0;
    P.push(<Mesh3d key="rst" name="rst" transform={Transform.fromXyz(RC[0] + 0.012 - 0.008 * (1 - st), RC[1] + 0.0006, RC[2] - RROW).withRotation(rotY(0.06)).withScale([Math.max(0.001, st), 1, 1])}><Cuboid half_size={[0.009, 0.0001, 0.0005]} /><StandardMaterial base_color={RED} emissive={glow(RHOT, 1.2)} /></Mesh3d>);
    const pr = n === 16 ? eo((T - W(93)) / 0.18) : n > 16 ? 1 : 0;
    P.push(<Mesh3d key="r149" name="r149" transform={Transform.fromXyz(RC[0] + 0.006, RC[1] + 0.0007, RC[2] - RROW + 0.011).withRotation(Quat.fromEuler("YXZ", 0.06, -Math.PI / 2, 0)).withScale(sc3(pr))}><Cuboid half_size={[0.017, 0.0075, 0.0001]} /><StandardMaterial base_color_texture={TX("stamp149")} alpha_mode="Blend" emissive={glow(RHOT, 0.5)} emissive_texture={TX("stamp149")} /></Mesh3d>);
    P.push(<Tag key="ctag" k="ctag" p={TG} ry={-0.12} flat />);
    // the stamp drops on the receipt on "murah" (n 16)
    const down = n === 16 ? eo((T - (W(93) - 0.25)) / 0.22) * (1 - eo((T - (W(93) + 0.15)) / 0.35)) : 0;
    P.push(<Model key="cstamp" src={S("parts/stamp.glb")} position={[RC[0] + 0.006, RC[1] + 0.001 + (1 - down) * 0.14 + (n === 16 ? 0 : 0.5), RC[2] - RROW + 0.011]} scale={[0.15, 0.15, 0.15]} />);
    if (n === 16) for (let j = 0; j < 16; j++) { const x = T - W(93); const a = x > 0 && x < 0.8 ? 1 - x / 0.8 : 0, r = 0.02 + x * 0.08 * (0.6 + rnd(j + 50));
      P.push(<Mesh3d key={"cd" + j} name={"cd" + j} transform={Transform.fromXyz(RC[0] + Math.cos(j * 2.4) * r, RC[1] + 0.01 + x * 0.04 * rnd(j + 51), RC[2] - RROW + Math.sin(j * 2.4) * r).withScale(sc3(a * (0.5 + rnd(j + 52))))}><Sphere radius={0.002} /><StandardMaterial base_color="#e8e4dc" emissive={glow("#ffffff", 0.4)} /></Mesh3d>); }
  }
  // the law card on its acrylic stand (n 17)
  P.push(<Entity key="law" transform={Transform.fromXyz(CX - 0.32, CTOP, 0.2).withRotation(rotY(0.25))}>
    <Mesh3d name="lawc" transform={Transform.fromXyz(0, 0.065, 0).withRotation(Quat.fromEuler("XYZ", -0.2, 0, 0))}><Cuboid half_size={[0.09, 0.06, 0.0008]} /><StandardMaterial base_color_texture={TX("lawcard")} perceptual_roughness={0.5} emissive={glow("#ffffff", 0.1)} emissive_texture={TX("lawcard")} /></Mesh3d>
    <Mesh3d name="laws" transform={Transform.fromXyz(0, 0.004, -0.012)}><Cuboid half_size={[0.08, 0.004, 0.025]} /><StandardMaterial base_color={Srgba.hex("#cfe3ff").with_alpha(0.25)} alpha_mode="Blend" perceptual_roughness={0.05} /></Mesh3d></Entity>);
  // the folder (n 18–19): tag photo + receipt slide in on "simpan"
  const FO = [CX + 0.35, CTOP + 0.004, 0.24];
  P.push(<Mesh3d key="fol" transform={Transform.fromXyz(FO[0], FO[1], FO[2]).withRotation(rotY(-0.1))}><Cuboid half_size={[0.115, 0.004, 0.16]} /><StandardMaterial base_color="#a7a294" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} perceptual_roughness={0.8} /></Mesh3d>);
  P.push(<Mesh3d key="foll" transform={Transform.fromXyz(FO[0], FO[1] + 0.0045, FO[2] - 0.11).withRotation(rotY(-0.1))}><Cuboid half_size={[0.07, 0.0003, 0.02]} /><StandardMaterial base_color_texture={TX("folder_label")} perceptual_roughness={0.7} /></Mesh3d>);
  if (n === 19) { const u = eo((T - W(113)) / 0.6);
    P.push(<Mesh3d key="fpr" name="fpr" transform={Transform.fromXyz(lerp(RC[0], FO[0] - 0.03, u), FO[1] + 0.006, lerp(RC[2], FO[2] + 0.03, u)).withRotation(rotY(lerp(0.06, -0.1, u)))}><Cuboid half_size={[0.026, 0.0003, 0.07]} /><StandardMaterial base_color_texture={TX("receipt")} perceptual_roughness={0.6} /></Mesh3d>); }
  // red spill at the stamp moment (the one red flash)
  const fl = n === 16 ? Math.max(0, 1 - Math.abs(T - W(93)) / 0.35) : 0;
  return (<>{P}
    <RectLight transform={Transform.fromXyz(CX, CTOP + 1.1, 0.35).lookingAt([CX, CTOP, 0.1])} intensity={5000} width={1.0} height={0.35} color={WARM} range={4} />
    <SpotLight transform={Transform.fromXyz(CX + 0.9, CTOP + 0.55, 0.75).lookingAt([CX, CTOP, 0.15])} intensity={9000} outer_angle={0.5} inner_angle={0.2} color="#ffd9a8" shadows_enabled range={4} />
    <SpotLight transform={Transform.fromXyz(CX - 1.0, CTOP + 0.7, 0.8).lookingAt([CX, CTOP, 0.1])} intensity={2200} outer_angle={0.5} inner_angle={0.2} color="#9db4e0" range={5} />
    <RectLight transform={Transform.fromXyz(CX, 2.2, -1.5).lookingAt([CX, 1, -1])} intensity={3000} width={2} height={0.4} color="#8fa6cf" range={4} />
    <PointLight transform={Transform.fromXyz(RC[0], RC[1] + 0.08, RC[2] - RROW)} intensity={900 * fl} color="#ff3b3b" range={1.2} />
    <AmbientLight brightness={10} color="#b4bccb" />
    <Environment src={S("sky.hdr")} intensity={0.08} />
  </>);
}

// ================= set "f": the fine (a void: the document on a lit floor, the tag beside it) =================
const FX = 60;
function Fine({ n }: { n: number }) {
  const up = n === 20 ? eo((T - (ST[19] + 0.05)) / 0.5) : 1, num = n === 21 ? eo((T - (W(125) - 0.06)) / 0.16) : 0, hit = n === 21 ? T - W(125) : -1;
  return (<>
    <Mesh3d key="ffl" transform={Transform.fromXyz(FX, -0.02, 0)}><Cuboid half_size={[4, 0.02, 4]} /><StandardMaterial base_color="#101115" normal_map_texture={S("tex/concrete_tiles_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([6, 6])} perceptual_roughness={0.3} /></Mesh3d>
    <Mesh3d key="fdoc" name="fdoc" transform={Transform.fromXyz(FX, 0.002 + 0.06 * (1 - up), 0).withRotation(Quat.fromEuler("YXZ", 0.08 - 0.2 * (1 - up), 0, 0))}><Cuboid half_size={[0.105, 0.0006, 0.145]} /><StandardMaterial base_color_texture={TX("fine_doc")} perceptual_roughness={0.6} emissive={glow("#ffffff", 0.08)} emissive_texture={TX("fine_doc")} /></Mesh3d>
    <Mesh3d key="fnum" name="fnum" transform={Transform.fromXyz(FX - 0.018, 0.0034, -0.012).withRotation(Quat.fromEuler("YXZ", 0.08, -Math.PI / 2, 0)).withScale(sc3(n === 21 ? lerp(1.6, 1, num) * (num > 0.01 ? 1 : 0.001) : 0.001))}><Cuboid half_size={[0.08, 0.0186, 0.0001]} /><StandardMaterial base_color_texture={TX("fine_num")} alpha_mode="Blend" emissive={glow(RHOT, 0.4)} emissive_texture={TX("fine_num")} /></Mesh3d>
    {Array.from({ length: 14 }, (_, j) => { const a = hit > 0 && hit < 0.8 ? 1 - hit / 0.8 : 0, r = 0.02 + Math.max(0, hit) * 0.1 * (0.6 + rnd(j + 80));
      return <Mesh3d key={"fd" + j} name={"fd" + j} transform={Transform.fromXyz(FX - 0.018 + Math.cos(j * 2.4) * r, 0.006 + Math.max(0, hit) * 0.03 * rnd(j + 81), -0.012 + Math.sin(j * 2.4) * r * 0.5).withScale(sc3(a * (0.5 + rnd(j + 82))))}><Sphere radius={0.0018} /><StandardMaterial base_color="#e8e4dc" emissive={glow("#ffffff", 0.4)} /></Mesh3d>; })}
    <Tag key="ftag" k="ftag" p={[FX + 0.12, 0.0025, 0.07]} ry={0.5} flat />
    <SpotLight transform={Transform.fromXyz(FX + 0.35, 0.7, 0.45).lookingAt([FX, 0, 0])} intensity={16000} outer_angle={0.4} inner_angle={0.15} color={WARM} shadows_enabled range={3} />
    <RectLight transform={Transform.fromXyz(FX - 0.6, 0.5, -0.4).lookingAt([FX, 0, 0])} intensity={2500} width={0.8} height={0.3} color="#9db4e0" range={3} />
    <AmbientLight brightness={8} color="#b4bccb" />
    <Environment src={S("sky.hdr")} intensity={0.06} />
  </>);
}

// ================= set "w": a wall of 50% tags (pegboard), each swings once on "50%" =================
const WX = 90, WROWS = 7, WCOLS = 8;
function Wall({ n }: { n: number }) {
  const P: any[] = [];
  P.push(<Mesh3d key="wfl" transform={Transform.fromXyz(WX, -0.02, 0)}><Cuboid half_size={[4, 0.02, 4]} /><StandardMaterial base_color="#0b0c0e" perceptual_roughness={0.2} /></Mesh3d>);
  P.push(<Mesh3d key="wpb" transform={Transform.fromXyz(WX, 1.15, -0.01)}><Cuboid half_size={[1.3, 1.1, 0.008]} /><StandardMaterial base_color_texture={TX("pegboard")} uv_transform={Affine2.fromScale([104, 88])} perceptual_roughness={0.7} /></Mesh3d>);
  for (let r = 0; r < WROWS; r++) for (let c = 0; c < WCOLS; c++) { const i = r * WCOLS + c, x = WX - 0.85 + c * 0.25 + (r % 2) * 0.05, y = 1.85 - r * 0.24, hero = r === 3 && c === 3, zf = hero ? (n === 23 ? 0.3 : 0) : 0;
    const sw = swingOn(131, 0.3) * (T > W(131) + (rnd(i) * 0.25) ? 1 : 0) + Math.sin(T * 1.2 + i) * 0.012;
    P.push(<Mesh3d key={"wp" + i} allowOverlap transform={Transform.fromXyz(x, y, 0.012 + zf / 2).withScale([1, hero ? 14 : 1, 1]).withRotation(Quat.fromEuler("XYZ", Math.PI / 2, 0, 0))}><Cylinder radius={0.0016} half_height={0.012} /><StandardMaterial base_color="#c3c7ce" metallic={0.7} perceptual_roughness={0.25} /></Mesh3d>);
    P.push(<Tag key={"wt" + i} k={"wt" + i} p={[x, y, 0.04 + zf]} sw={sw} swz={sw * 0.4} ry={(rnd(i + 20) - 0.5) * 0.3} tex="tag_50" sticker={false} s={hero ? 1.8 : 1.55} />); }
  return (<>{P}
    <RectLight transform={Transform.fromXyz(WX, 2.6, 1.4).lookingAt([WX, 1.1, 0])} intensity={16000} width={1.6} height={0.3} color="#f0f3ff" range={5} />
    <SpotLight transform={Transform.fromXyz(WX - 1.2, 1.5, 1.0).lookingAt([WX, 1.1, 0])} intensity={9000} outer_angle={0.45} inner_angle={0.15} color="#9db4e0" range={4} />
    <SpotLight transform={Transform.fromXyz(WX + 0.3, 1.5, 1.4).lookingAt([WX + 0.0, 1.2, 0.3])} intensity={14000} outer_angle={0.2} inner_angle={0.08} color={WARM} shadows_enabled range={4} />
    <SpotLight transform={Transform.fromXyz(WX + 0.9, 1.6, 1.4).lookingAt([WX, 1.1, 0])} intensity={4000} outer_angle={0.5} inner_angle={0.2} color={WARM} shadows_enabled range={4} />
    <AmbientLight brightness={10} color="#b4bccb" />
    <Environment src={S("sky.hdr")} intensity={0.08} />
  </>);
}

function Phone({ x = 140, y = 260, w = 860, children }: { x?: number; y?: number; w?: number; children: any }) {
  return (<div style={{ position: "absolute", left: x, top: y, width: w, height: 1900, borderRadius: 110, background: "#15171b", padding: 26, boxSizing: "border-box", boxShadow: "0 50px 120px rgba(0,0,0,0.6), inset 0 0 0 4px #4a4e57, inset 0 0 0 8px #1e2025, 0 0 0 2px #5a5f69" }}>
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 86, overflow: "hidden", background: PAPER, fontFamily: PS, color: INK }}>{children}</div>
  </div>);
}
// ================= the phone screens (W2): step rail, screenshot, compare, price chart =================
const roll = (from: number, to: number, u: number, d = 0) => lerp(from, to, eo(u)).toFixed(d);
function ProductPage({ price, was, date, sale = false }: { price: string; was?: string; date: string; sale?: boolean }) {
  return (<div style={{ padding: "60px 56px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, color: MUTE, ...TAB }}><span>{date}</span><span>●●● 82%</span></div>
    <div style={{ marginTop: 40, borderRadius: 36, overflow: "hidden", background: "#d9dbe0", height: 560, display: "flex", alignItems: "center", justifyContent: "center" }}><img src={TX("hero_product")} style={{ height: "96%" }} /></div>
    <div style={{ fontSize: 50, fontWeight: 700, marginTop: 40 }}>Periuk tekanan elektrik 6L</div>
    {sale ? <div style={{ display: "inline-block", marginTop: 24, padding: "8px 20px", borderRadius: 12, background: RED, color: "#fff", fontSize: 38, fontWeight: 800 }}>11.11 SALE</div> : null}
    <div style={{ display: "flex", alignItems: "baseline", gap: 26, marginTop: 20 }}>
      <div style={{ fontSize: 120, fontWeight: 800, color: sale ? RED : INK, ...TAB }}>{price}</div>
      {was ? <div style={{ fontSize: 56, color: MUTE, textDecoration: "line-through", ...TAB }}>{was}</div> : null}</div>
    <div style={{ marginTop: 30, height: 110, borderRadius: 55, background: INK, color: "#fff", fontSize: 44, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>Tambah ke troli</div>
  </div>);
}
function Shot({ n }: { n: number }) {
  // the product page at its normal price (3 Nov); shutter on "screenshot"; the page shrinks into the gallery on "Simpan"
  const fl = Math.max(0, 1 - Math.abs(T - (W(47) + 0.05)) / 0.12), g = onO(52, 0.6, -0.1);
  return (<>
    <div style={{ position: "absolute", left: lerp(110, 90, g), top: lerp(380, 1060, g), width: 860, transformOrigin: "0 0", transform: `scale(${lerp(1, 0.28, g)})` }}>
      <Phone x={0} y={0} w={860}><ProductPage price="RM199" date="3 Nov" /></Phone></div>
    {g > 0.01 ? <div style={{ position: "absolute", left: 90, top: 1060, display: "grid", gridTemplateColumns: "repeat(3, 280px)", gap: 20, opacity: g }}>
      {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{ width: 280, height: 500, borderRadius: 24, background: i === 0 ? "transparent" : "#22252b", border: i === 0 ? `4px solid ${RED}` : "none" }} />)}</div> : null}
    {g > 0.3 ? <div style={{ position: "absolute", left: 100, top: 980, fontSize: 40, fontWeight: 700, color: "#fff", fontFamily: PS, opacity: g }}>Galeri · 3 Nov · RM199</div> : null}
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: "#fff", opacity: fl * 0.85 }} />
  </>);
}
function Cmp({ n }: { n: number }) {
  const a = onO(59, 0.4, -0.15), hi = onO(62, 0.3, -0.05);
  return (<div style={{ position: "absolute", left: 0, top: 420, width: 1080, display: "flex", justifyContent: "center", gap: 30, fontFamily: PS }}>
    {[["3 Nov", "RM199", undefined, false], ["11 Nov", "RM149", "RM299", true]].map(([d, p, w, s], i) => (
      <div key={i} style={{ width: 480, transform: `translateY(${(1 - (i ? a : 1)) * 60}px)`, opacity: i ? a : 1 }}>
        <div style={{ fontSize: 40, fontWeight: 700, color: i ? RED : "#fff", marginBottom: 18 }}>{i ? "Sekarang (sale)" : "Screenshot anda"}</div>
        <div style={{ width: 960, transformOrigin: "0 0", transform: "scale(0.5)" }}><Phone x={0} y={0} w={960}><ProductPage price={p as string} was={w as any} date={d as string} sale={s as boolean} /></Phone></div>
      </div>))}
    {hi > 0.01 ? <div style={{ position: "absolute", left: 830, top: 685, width: 180, height: 60, border: `5px solid ${RED}`, borderRadius: 14, opacity: hi, transform: `scale(${0.8 + 0.2 * hi})` }} /> : null}
  </div>);
}
function Chart({ n }: { n: number }) {
  // price per day 1–11 Nov (illustrative): flat RM199, up to RM299 on 9–10 Nov, the sale RM149 on 11 Nov
  const V = [199, 199, 199, 199, 199, 199, 199, 199, 299, 299, 149], X0 = 190, X1 = 880, Y = (v: number) => 1240 - (v - 100) * 3.2;
  const draw = n === 11 ? onO(61, 1.0, -0.2) : 1, spike = onO(64, 0.35, -0.1), off = onO(66, 0.4, -0.1);
  const pts = V.map((v, i) => [X0 + (i / 10) * (X1 - X0), Y(i >= 8 && spike < 1 ? lerp(199, v, spike) : v)]);
  const N = 1 + Math.floor(draw * 10), d = pts.slice(0, N + 1).map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  return (<div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, fontFamily: PS }}>
    <div style={{ position: "absolute", left: 140, top: 470, fontSize: 30, letterSpacing: 4, fontWeight: 700, color: MUTE }}>HARGA (RM) · 1–11 NOV</div>
    <svg style={{ position: "absolute", left: 0, top: 0 }} width={1080} height={1920}>
      {[149, 199, 299].map((v) => <g key={v}><line x1={X0} x2={X1} y1={Y(v)} y2={Y(v)} stroke="rgba(255,255,255,0.1)" strokeWidth={2} strokeDasharray="8 10" /><text x={X0 - 34} y={Y(v) + 10} fill={MUTE} fontSize={30} textAnchor="end" fontFamily="Outfit">{v}</text></g>)}
      <path d={d} fill="none" stroke="#e6e8ec" strokeWidth={6} strokeLinejoin="round" />
      {draw >= 1 ? <circle cx={pts[10][0]} cy={pts[10][1]} r={14} fill={RED} /> : null}
      {spike > 0.05 ? <circle cx={pts[9][0]} cy={pts[9][1]} r={12} fill="#fff" opacity={spike} /> : null}
      {off > 0.01 ? <g opacity={off}><line x1={pts[10][0] + 40} x2={pts[10][0] + 40} y1={Y(199)} y2={Y(149)} stroke={RED} strokeWidth={5} /></g> : null}
    </svg>
    {off > 0.01 ? <div style={{ position: "absolute", left: pts[10][0] - 470, top: Y(174) - 52, width: 400, textAlign: "right", fontSize: 88, fontWeight: 800, color: RED, opacity: off, fontFamily: FF }}>−RM50 je</div> : null}
    {spike > 0.05 ? <div style={{ position: "absolute", left: pts[8][0] - 330, top: Y(299) + 40, textAlign: "right", fontSize: 30, letterSpacing: 3, fontWeight: 700, color: "#fff", opacity: spike }}>NAIK SEHARI<br />SEBELUM SALE</div> : null}
    {[[0, "1 Nov"], [8, "9 Nov"], [10, "11 Nov"]].map(([i, t]) => <div key={t as string} style={{ position: "absolute", left: pts[i as number][0] - 60, width: 120, textAlign: "center", top: 1290, fontSize: 30, color: MUTE }}>{t}</div>)}
  </div>);
}
function Ui({ n }: { n: number }) {
  const c = SETUPS[n - 1]; if (!c.ui) return null;
  const view = (k: number) => { const cu = SETUPS[k - 1].ui!, x = cl((T - ST[k - 1]) / (ST[k] - ST[k - 1])), u = 0.55 * x + 0.45 * ss(x, 0, 1);
    return { s: lerp(cu.a[0], cu.b[0], u), fx: lerp(cu.a[1], cu.b[1], u), fy: lerp(cu.a[2], cu.b[2], u), rz: cu.rz ?? 0 }; };
  const bodyOf = (k: number) => { const sc = SETUPS[k - 1].ui!.screen;
    return sc === "shot" ? <Shot n={k} /> : sc === "cmp" ? <Cmp n={k} /> : <Chart n={k} />; };
  const page = (k: number, dx: number, blur = 0, op = 1) => { const v = view(k);
    return <div key={"pg" + k} style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, transformOrigin: "0 0", transform: `translate(${540 - v.fx * v.s + dx}px, ${1000 - v.fy * v.s}px) scale(${v.s}) rotate(${v.rz}deg)`, filter: `blur(${blur}px)`, opacity: op }}>{bodyOf(k)}</div>; };
  const prev = n > 1 ? SETUPS[n - 2].ui : undefined, same = !!prev && prev.screen === c.ui.screen;
  const push = !!prev && !same && T < ST[n - 1] + 0.42 ? eo((T - ST[n - 1]) / 0.42) : -1;
  // 3D → screen: through the tag's hole (a red ring that opens and blurs away)
  const enter = same || prev ? 1 : eo((T - ST[n - 1]) / 0.42);
  const layers = push >= 0 ? [page(n - 1, -1080 * push), page(n, 1080 * (1 - push))] : [page(n, 0, (1 - enter) * 12, 0.3 + 0.7 * enter)];
  return (<div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, overflow: "hidden", background: `radial-gradient(ellipse at 50% 30%, rgba(232,238,252,0.10) 0%, rgba(232,238,252,0) 50%), radial-gradient(ellipse at 50% 60%, #1c1f25 0%, ${BG} 75%)` }}>
    {layers}
    {!prev && enter < 1 ? <div style={{ position: "absolute", left: 540 - 2400 * enter - 40, top: 1000 - 2400 * enter - 40, width: 4800 * enter + 80, height: 4800 * enter + 80, borderRadius: "50%", boxShadow: `0 0 0 3000px ${RED}`, opacity: 1 - enter }} /> : null}
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 330, background: BG }} /><div style={{ position: "absolute", left: 0, top: 330, width: 1080, height: 2, background: "rgba(255,255,255,0.08)" }} />
  </div>);
}

// ================= the 23 setups =================
type Pose = { p: number[]; l: number[] };
type Tag = { at: number[]; x: number; y: number; cap: string; big?: string; sub?: string; t: number; noLine?: boolean };
type Setup = { set: string; a: Pose; b: Pose; fov?: number; fs?: number; up?: number[]; tr?: "in" | "out" | "side"; fd?: () => number | null; tags?: Tag[];
  count?: { v: () => string; unit: string; t?: number }; note?: string; src?: string; step?: number; ui?: { screen: string; a: number[]; b: number[]; rz?: number } };
const fromT = (l: number[], dir: number[], d: number) => { const k = Math.hypot(dir[0], dir[1], dir[2]); return [l[0] + (dir[0] / k) * d, l[1] + (dir[1] / k) * d, l[2] + (dir[2] / k) * d]; };
const dist3 = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const C = (p: number[], l: number[]): Pose => ({ p, l });
const HC = [TAGC[0], TAGC[1] + 0.005, TAGC[2]], SKW = [TAGC[0], TAGC[1] + 0.011, TAGC[2]];
const HL = [HC[0], HC[1] - 0.05, HC[2]];
const P1A = C(fromT(HL, [0.35, 0.12, 1], 0.6), HL), P1B = C(fromT(HL, [0.28, 0.1, 1], 0.5), HL);   // setup 23 lands on P1B (loop)
const STC = [STK[0], STK[1] + 0.01, STK[2]], CC = [CX, CTOP + 0.05, 0.1], RCC = [(RC[0] + TG[0]) / 2, RC[1], RC[2] - 0.005];
const NOCAM = C([0, 3, 3], [0, 0, 0]);
const U = (screen: string, a: number[], b: number[], rz = 0) => ({ ui: { screen, a, b, rz }, set: "u", a: NOCAM, b: NOCAM });
const SETUPS: Setup[] = [
  /* 1 macro, tag, already pushing; strike draws */ { set: "a", a: P1A, b: P1B, fov: 30, fs: 2.8 },
  /* 2 rack focus to the sticker, low */ { set: "a", a: C(fromT([SKW[0] + 0.02, SKW[1] - 0.03, SKW[2]], [-0.4, -0.15, 1], 0.5), [SKW[0] + 0.02, SKW[1] - 0.03, SKW[2]]), b: C(fromT([SKW[0] + 0.02, SKW[1] - 0.03, SKW[2]], [-0.35, -0.12, 1], 0.44), [SKW[0] + 0.02, SKW[1] - 0.03, SKW[2]]), fov: 30, fs: 2.4, fd: () => lerp(1.3, 0.45, sm(ST[1] + 0.05, W(5) + 0.1)), note: "harga & produk: ilustrasi",
    tags: [{ at: [SKW[0] + 0.022, SKW[1], SKW[2] + 0.002], x: 760, y: 720, cap: "HARGA ASAL", big: "RM299?", t: W(5) }] },
  /* 3 pull back: the whole tag, the box behind */ { set: "a", a: C(fromT(HC, [-0.8, -0.45, 1], 0.42), [HC[0], HC[1] - 0.02, HC[2]]), b: C(fromT(HC, [-0.7, -0.5, 1], 0.5), [HC[0], HC[1] - 0.03, HC[2]]), fov: 30, fs: 4,
    tags: [{ at: [HC[0], HC[1] - 0.025, HC[2] + 0.002], x: 640, y: 1380, cap: "HARGA SALE", big: "RM149", t: W(7) }] },
  /* 4 wide: the aisle, the tag swings on "untung" */ { set: "a", tr: "out", a: C([1.0, 1.2, 1.0], [0.4, 1.02, 0.25]), b: C([0.45, 1.18, 1.0], [0.0, 1.02, 0.25]), fov: 34, fs: 5.6 },
  /* 5 side-on cutaway: the sticker lifts off the card */ { set: "a", a: C(fromT(SKW, [-0.25, 0.3, 1], 0.33), SKW), b: C(fromT(SKW, [0.8, 0.3, 1], 0.3), SKW), fov: 30, fs: 2.8,
    tags: [{ at: [SKW[0] + 0.02, SKW[1] + 0.016, SKW[2] + 0.012], x: 760, y: 560, cap: "STIKER", big: "RM299", t: W(16) + 0.5 }, { at: [HC[0] - 0.02, HC[1] - 0.035, HC[2] + 0.001], x: 60, y: 1560, cap: "KAD", big: "di bawah", t: W(17) + 0.1 }] },
  /* 6 macro into the gap: nothing printed under it */ { set: "a", a: C(fromT([SKW[0], SKW[1] - 0.03, SKW[2]], [0.15, 0.75, 1], 0.62), [SKW[0] + 0.025, SKW[1] - 0.03, SKW[2]]), b: C(fromT([SKW[0] + 0.025, SKW[1] - 0.03, SKW[2]], [0.12, 0.06, 1], 0.56), [SKW[0], SKW[1] - 0.03, SKW[2]]), fov: 28, fs: 2.8,
    tags: [{ at: [SKW[0], SKW[1], SKW[2] + 0.001], x: 750, y: 600, cap: "BAWAH STIKER", big: "tiada rekod", t: W(20) }] },
  /* 7 stamp, low front 3/4, crane up a little */ { set: "a", a: C(fromT(STC, [-0.35, 0.55, 1], 0.38), STC), b: C(fromT(STC, [-0.3, 0.75, 1], 0.46), STC), fov: 32, fs: 4, note: "ilustrasi" },
  /* 8 three step tags (physical) */ { set: "a", a: C(fromT([0, HOOK[1] - 0.08, HOOK[2] + 0.06], [-0.6, 0.05, 1], 0.9), [0, HOOK[1] - 0.08, HOOK[2] + 0.06]), b: C(fromT([0, HOOK[1] - 0.08, HOOK[2] + 0.06], [0.15, 0.0, 1], 0.85), [0, HOOK[1] - 0.08, HOOK[2] + 0.06]), fov: 30, fs: 4 },
  /* 9 step 1: through tag 1 into the phone, screenshot */ { ...U("shot", [1.0, 540, 1000], [1.05, 540, 1040], -2), tr: "in", step: 1 },
  /* 10 compare: screenshot vs the sale page */ { ...U("cmp", [1.0, 540, 900], [1.1, 600, 880]), step: 1 },
  /* 11 the price line: up just before the sale */ { ...U("chart", [0.95, 540, 950], [1.04, 560, 950], 1.5), step: 1, note: "harga ilustrasi" },
  /* 12 W3 wide: the counter, the box rides in */ { set: "c", tr: "side", a: C([CX - 1.2, CTOP + 0.75, 1.6], [CX - 0.1, CTOP, 0]), b: C([CX - 1.0, CTOP + 0.7, 1.45], [CX, CTOP, 0]), fov: 34, fs: 5.6, step: 2 },
  /* 13 push to the printer; it goes see-through; the receipt prints */ { set: "c", a: C(fromT([PR[0], PR[1] + 0.08, PR[2]], [-1.3, 0.45, 0.25], 0.7), [PR[0], PR[1] + 0.08, PR[2]]), b: C(fromT([PR[0], PR[1] + 0.12, PR[2]], [-0.5, 0.4, 1], 0.58), [PR[0], PR[1] + 0.12, PR[2]]), fov: 30, fs: 4, step: 2,
    tags: [{ at: [PR[0], PR[1] + 0.09, PR[2] - 0.015], x: 90, y: 1250, cap: "GULUNG KERTAS", big: "pencetak resit", t: W(72) + 0.3 }] },
  /* 14 the receipt lifts toward the bag, stops */ { set: "c", a: C([CX + 0.25, CTOP + 0.78, 0.8], [CX - 0.02, CTOP + 0.16, 0.0]), b: C([CX + 0.2, CTOP + 0.38, 0.8], [CX - 0.05, CTOP + 0.15, 0.0]), fov: 30, fs: 4, step: 2 },
  /* 15 top-down: receipt beside the tag */ { set: "c", a: C([RCC[0] + 0.16, RCC[1] + 0.5, RCC[2] + 0.04], [RCC[0], RCC[1], RCC[2]]), b: C([RCC[0], RCC[1] + 0.44, RCC[2] + 0.1], [RCC[0], RCC[1], RCC[2]]), fov: 34, fs: 5.6, step: 2,
    tags: [{ at: [RC[0], RC[1], RC[2] - RROW], x: 70, y: 1240, cap: "RESIT", big: "RM169", t: W(83) }, { at: [TG[0], TG[1], TG[2] - 0.01], x: 650, y: 1240, cap: "TAG RAK", big: "RM149", t: W(86) }] },
  /* 16 macro: RM169 struck, RM149 stamps in (the red flash) */ { set: "c", a: C(fromT([RC[0] + 0.006, RC[1], RC[2] - RROW], [0.3, 1, 0.7], 0.2), [RC[0] + 0.006, RC[1], RC[2] - RROW]), b: C(fromT([RC[0] + 0.006, RC[1], RC[2] - RROW], [0.25, 1, 0.6], 0.15), [RC[0] + 0.006, RC[1], RC[2] - RROW]), fov: 30, fs: 2.8, step: 2 },
  /* 17 pull back, top light: the law card */ { set: "c", a: C([CX - 0.1, CTOP + 0.38, 0.75], [CX - 0.3, CTOP + 0.06, 0.2]), b: C([CX - 0.05, CTOP + 0.42, 0.85], [CX - 0.28, CTOP + 0.06, 0.2]), fov: 32, fs: 4, step: 2 },
  /* 18 step 3: the folder, KPDN */ { set: "c", a: C([CX + 0.3, CTOP + 0.75, 0.95], [CX + 0.33, CTOP, 0.2]), b: C([CX + 0.33, CTOP + 0.34, 0.42], [CX + 0.35, CTOP, 0.14]), fov: 32, fs: 4, step: 3, up: [0.16, 1, 0],
    tags: [{ at: [CX + 0.35, CTOP + 0.006, 0.13], x: 600, y: 1260, cap: "ADUAN", big: "KPDN", t: W(108) }] },
  /* 19 snap the tag, the receipt goes into the folder */ { set: "c", a: C([TG[0] - 0.38, CTOP + 0.14, TG[2] - 0.08], [TG[0], CTOP, TG[2]]), b: C([TG[0] - 0.28, CTOP + 0.2, TG[2] + 0.2], [TG[0], CTOP, TG[2]]), fov: 34, fs: 5.6, step: 3 },
  /* 20 W4: macro across the document heading */ { set: "f", tr: "in", a: C([FX - 0.12, 0.2, 0.05], [FX - 0.02, 0, -0.1]), b: C([FX - 0.04, 0.18, 0.02], [FX + 0.04, 0, -0.1]), fov: 30, fs: 2.8, src: "Akta Perlindungan Pengguna 1999, s145" },
  /* 21 crane down: the figure stamps in */ { set: "f", a: C([FX + 0.0, 0.8, 0.36], [FX - 0.01, 0, -0.02]), b: C([FX - 0.01, 0.7, 0.44], [FX - 0.005, 0, -0.01]), fov: 32, fs: 4, src: "Akta Perlindungan Pengguna 1999, s145" },
  /* 21 W5: the wall at a raking angle, depth falloff */ { set: "w", tr: "out", a: C([WX + 1.25, 1.15, 0.95], [WX + 0.15, 1.18, 0.05]), b: C([WX + 0.8, 1.13, 1.32], [WX - 0.2, 1.18, 0.05]), fov: 32, fs: 3.2 },
  /* 22 push toward one tag, the rest go soft */ { set: "w", a: C([WX - 0.02, 1.2, 1.3], [WX - 0.05, 0.99, 0.32]), b: C([WX - 0.04, 1.16, 0.98], [WX - 0.05, 0.99, 0.32]), fov: 30, fs: 1.2 },
  /* 23 back on the hero tag, frame-0 framing (loop) */ { set: "a", tr: "in", a: C(fromT(HL, [0.35, 0.12, 1], 0.75), HL), b: P1B, fov: 30, fs: 2.8 },
];
function World({ n }: { n: number }) {
  const s = SETUPS[n - 1].set;
  return s === "a" ? <Aisle n={n} /> : s === "c" ? <Counter n={n} /> : s === "f" ? <Fine n={n} /> : s === "w" ? <Wall n={n} /> : null;
}

// ================= camera (EX39/EX44: drift inside a setup; flight on the same set; push / pull / slide to another set) =================
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
// ================= captions (EX39, unchanged) =================
const FF = "Outfit, 'Inter Display', Inter, 'Helvetica Neue', Arial, sans-serif";
const CT2 = CAPS.map((c, i) => (i + 1 < CAPS.length && CAPS[i + 1].L === c.L && /^(dan|di|untuk|yang|ia|pada|ini|itu|and|the|at|for|to|of|a)$/i.test(c.w) && W(i + 1) - c.t > 0.3 ? W(i + 1) - 2 / FPS : c.t));
const PH: { i0: number; i1: number; t0: number; t1: number }[] = (() => {
  const g: number[][] = []; let cur: number[] = [];
  CAPS.forEach((c, i) => { cur.push(i); const last = i + 1 >= CAPS.length || CAPS[i + 1].L !== c.L; if (/[.,?:…]$/.test(c.w) || cur.length >= 4 || last) { g.push(cur); cur = []; } });
  const m: number[][] = [];
  for (const x of g) { const pv = m[m.length - 1]; if (pv && x.length === 1 && pv.length <= 4 && CAPS[pv[0]].L === CAPS[x[0]].L && !/[.?]$/.test(CAPS[pv[pv.length - 1]].w)) pv.push(x[0]); else m.push(x); }
  return m.map((x, j) => ({ i0: x[0], i1: x[x.length - 1], t0: CT2[x[0]], t1: j + 1 < m.length ? CT2[m[j + 1][0]] - 2 / FPS : Math.min(DUR, W(x[x.length - 1]) + 1.1) }));
})();
const CW = (w: string, bold: boolean) => w.length * (bold ? 36 : 33) + 18;
function Caption() {
  const ph = PH.find((p) => T >= p.t0 - 0.001 && T < p.t1); if (!ph) return null;
  const out = cl((ph.t1 - T) * FPS / 3), ws: number[] = []; for (let i = ph.i0; i <= ph.i1; i++) if (T >= CT2[i] - 0.001) ws.push(i);
  let wNow = 0; for (let i = ph.i0; i <= ph.i1; i++) wNow += CW(CAPS[i].w, false);
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
function Overlay({ n, cam, still }: { n: number; cam: Cam; still?: boolean }) {
  const c = SETUPS[n - 1], t0 = ST[n - 1], t1 = ST[n];
  const life = still ? 1 : fade(t0 + 0.12) * (1 - ss(T, t1 - 0.2, t1 - 0.04));
  const end = n === NSET ? fade(W(138) + 0.4, 0.25) : 0, logoEnd = n === NSET ? fade(DUR - 2.6, 0.4) : 0, h0 = n === 1 ? 1 : n === 2 ? 1 - sm(ST[1] + 0.15, ST[1] + 0.45) : 0;
  const BIG = { position: "absolute", left: 60, top: 1290, fontFamily: FF, fontWeight: 800, fontSize: 80, lineHeight: 1.06, letterSpacing: -1.5, color: "#ffffff", textShadow: "0 2px 18px rgba(0,0,0,0.9)" } as any;
  return (<>
    {c.ui ? null : <><div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 470, background: "linear-gradient(#0d0e11 34%, rgba(13,14,17,0))" }} />
    <div style={{ position: "absolute", left: 0, top: 1480, width: 1080, height: 440, background: "linear-gradient(rgba(13,14,17,0), #0d0e11 70%)" }} /></>}
    {c.src ? <div style={{ position: "absolute", left: 60, top: 372, width: 960, fontFamily: FF, fontSize: 30, fontWeight: 500, color: "#c9ccd2", opacity: life * fade(t0 + 0.2, 0.3) }}>{c.src}</div> : null}
    {c.note ? <div style={{ position: "absolute", left: 60, top: 1700, fontFamily: FF, fontSize: 26, fontWeight: 400, color: "#7d828b", opacity: life }}>{c.note}</div> : null}
    {c.count ? (() => { const a = life * fade(c.count.t ?? t0, 0.2); return <div style={{ position: "absolute", left: 60, top: 430, fontFamily: FF, color: "#fff", opacity: a, textShadow: "0 2px 18px rgba(0,0,0,0.9)" }}>
      <div style={{ fontSize: 150, fontWeight: 800, letterSpacing: -3, lineHeight: 1, color: RED, ...TAB }}>{c.count.v()}</div><div style={{ fontSize: 34, color: "#c9ccd2", marginTop: 8 }}>{c.count.unit}</div></div>; })() : null}
    {(c.tags ?? []).map((g, i) => { const a = life * fade(g.t, 0.22); if (a < 0.01) return null; const q = projS(cam, g.at), ly = g.y < q.y ? g.y + (g.big ? 112 : 44) : g.y - 8, x1 = q.x < g.x ? g.x - 14 : g.x + 50, d = fade(g.t, 0.3); return (
      <div key={i} style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, opacity: a }}>
        {g.noLine ? null : <svg style={{ position: "absolute", left: 0, top: 0 }} width={1080} height={1920}><line x1={q.x} y1={q.y} x2={lerp(q.x, x1, d)} y2={lerp(q.y, ly, d)} stroke="#ffffff" strokeWidth={2} opacity={0.75} /><circle cx={q.x} cy={q.y} r={5} fill="#ffffff" /></svg>}
        <div style={{ position: "absolute", left: g.x, top: g.y, fontFamily: FF, color: "#ffffff", textShadow: "0 2px 14px rgba(0,0,0,0.9)", opacity: fade(g.t + 0.12, 0.2), transform: `translateY(${(1 - fade(g.t + 0.12, 0.2)) * 10}px)` }}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 4 }}>{g.cap}</div>
          {g.big ? <div style={{ fontSize: 54, fontWeight: 600, letterSpacing: -0.5, marginTop: 2 }}>{g.big}</div> : null}
          {g.sub ? <div style={{ fontSize: 27, fontWeight: 400, color: "#c3c6cc", marginTop: 4 }}>{g.sub}</div> : null}
        </div>
      </div>); })}
    {c.step && (n === 9 || n === 12 || n === 18) ? <div style={{ position: "absolute", left: 36, top: 1576, display: "flex", gap: 10, padding: 14, borderRadius: 18, background: "rgba(13,14,17,0.92)", fontFamily: FF, opacity: still ? 1 : fade(t0 + 0.05, 0.2) * (1 - ss(T, t1 - 0.2, t1 - 0.04)) }}>{["SCREENSHOT", "RESIT", "REPORT"].map((w, i) => { const lit = c.step === i + 1, done = (c.step ?? 0) > i + 1;
      return <div key={i} style={{ padding: "8px 14px", borderRadius: 8, background: lit ? RED : done ? "rgba(200,22,29,0.22)" : "rgba(255,255,255,0.08)", color: lit ? "#fff" : done ? "#ff8d8d" : "#8a8d93", fontSize: 34, fontWeight: 700, letterSpacing: 2 }}>{i + 1} · {w}</div>; })}</div> : null}
    {/* step 3's snap: a viewfinder closes on the tag and the shutter flashes on "gambar" */}
    {n === 19 ? (() => { const v = onO(110, 0.35, -0.1), fl = Math.max(0, 1 - Math.abs(T - (W(111) + 0.05)) / 0.12), q = projS(cam, TG), r = lerp(330, 150, v);
      return <><svg style={{ position: "absolute", left: 0, top: 0, opacity: v * (1 - fade(W(113), 0.3)) }} width={1080} height={1920}>{[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy], i) => <path key={i} d={`M${q.x + sx * r},${q.y + sy * r - sy * 50} L${q.x + sx * r},${q.y + sy * r} L${q.x + sx * r - sx * 50},${q.y + sy * r}`} stroke="#fff" strokeWidth={6} fill="none" />)}</svg>
        <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: "#fff", opacity: fl * 0.8 }} /></>; })() : null}
    {h0 > 0.01 ? <div style={{ ...BIG, top: 1250, opacity: h0 }}>RM299 tu?<br /><span style={{ color: RED }}>Tak pernah</span> wujud pun.</div> : null}
    {end > 0.01 ? <div style={{ ...BIG, top: 1290, opacity: end * (1 - logoEnd), transform: `translateY(${(1 - end) * 14}px)` }}>Diskaun dari harga<br /><span style={{ color: RED }}>apa sebenarnya?</span></div> : null}
    {logoEnd > 0.01 ? <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: `rgba(13,14,17,${0.98 * logoEnd})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img src={S("meikigo-logo.png")} style={{ height: 300, opacity: logoEnd, transform: `scale(${0.94 + 0.06 * logoEnd})` }} /></div> : null}
  </>);
}
const FACE = `@font-face { font-family: "Outfit"; src: url(${S("fonts/Outfit.ttf")}); font-weight: 100 900; } @font-face { font-family: "Public Sans"; src: url(${S("fonts/PublicSans.ttf")}); font-weight: 100 900; }`;
function Frame({ n, cam, dk, still, fast }: { n: number; cam: Cam; dk: number; still?: boolean; fast?: boolean }) {
  const d = dist3(cam.p, cam.l);
  return (
    <AbsoluteFill style={{ background: BG }}>
      <style>{FACE}</style>
      <Camera3d transform={Transform.fromXyz(cam.p[0], cam.p[1], cam.p[2]).lookingAt(cam.l as any, cam.up as any)} projection={{ Perspective: { fov: (cam.fov * Math.PI) / 180 } }}>
        <DepthOfField focal_distance={cam.fd} aperture_f_stops={cam.fs} mode="Gaussian" max_circle_of_confusion_diameter={lerp(14, 48, ss(d, 0.55, 0.95))} />
      </Camera3d>
      {fast ? <MotionBlur shutterAngle={1} samples={6} /> : null}
      <Bloom intensity={0.6} threshold={0.9} />
      <AmbientOcclusion quality="high" />
      <ToneMapping mode="agx" exposure={0.65} />
      <Grade temperature={0.0} vignette={0.28} midtones={{ saturation: 1.05, contrast: 1.12, gamma: 1, gain: 1, lift: 0 }} />
      <World n={n} />
      <Ui n={n} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: BG, opacity: dk * 0.45 }} />
      <Overlay n={n} cam={cam} still={still} />
      <Caption />
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
const BT = SETUPS.map((_, k) => (k === 0 ? 1.6 : k === NSET - 1 ? DUR - 2.8 : ST[k + 1] - 0.22));
function Board() {
  const k = useCurrentFrame(); T = BT[k];
  return <Frame n={k + 1} cam={camOf(k)} dk={0} still />;
}
registerRoot(() => <><Composition id="film" component={Film} width={1080} height={1920} fps={RFPS} durationInFrames={FRAMES} /><Composition id="board" component={Board} width={1080} height={1920} fps={FPS} durationInFrames={NSET} /><Composition id="cammap" component={CamMap} width={1080} height={1920} fps={FPS} durationInFrames={SETUPS.map((s) => s.set).filter((s, i, a) => a.indexOf(s) === i).length} /></>);

// ================= camera map (review tool, RECIPE-D § 8.1): one page per set, seen from above =================
// Each setup's camera path (start ○ → end ▶, sampled through its drift), a thin line to where it looks, the setup number,
// and a table: time, lens, height and distance start → end, and the move in words. Needs SETUPS, ST, camOf, NSET, dist3.
// Render: raea render film44.tsx --composition cammap -o media/_cm   (one PNG per set)
const SETNAMES: Record<string, string> = { a: "Aisle", u: "Phone", c: "Counter", f: "Fine", w: "Tag wall" };
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
