// EX45 — Terima QR di gerai (S16 How to, Bahasa Melayu, X1 test #1). Night-market stall + phone interfaces, DuitNow pink the one accent.
// Style D motion (RECIPE-D). Assembled: head45 + film45 + cammap → film45.tsx (assemble.sh)
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
import PHYS from "./media/phys45.json";
const S = (p: string) => staticFile(p);

// ================= EX45 film: time hangs on the user's words (tl.json); camera, captions, board machinery from EX44 =================
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
const glow = (hex: string, k: number) => LinearRgba.from(Srgba.hex(hex)).mul(k);
const sc3 = (s: number) => { const v = Math.max(0.001, s); return [v, v, v] as [number, number, number]; };
const TX = (n: string) => S(`tx/${n}.png`);
const eo = (x: number) => 1 - Math.pow(1 - cl(x), 5);                                   // strong ease-out (feedback)
const onO = (i: number, d = 0.3, off = 0) => eo((T - (W(i) + off)) / d);
// X1 art bible: void · grey set · UI paper · UI ink · muted rows · accent DuitNow pink (the logo file's own #dd195c)
const BG = "#0d0e11", GREY = "#3a3d44", PAPER = "#f2f3f5", INK = "#1b1d22", MUTE = "#9aa0a8", PINK = "#dd195c", PHOT = "#ff3d82", WARM = "#ffc77a";
const PS = "'Public Sans', 'Helvetica Neue', Arial, sans-serif";
const TAB = { fontVariantNumeric: "tabular-nums" } as const;
// setup k (1-based) runs ST[k-1] .. ST[k]   (word indices: episode.md § Shot list v1 → 20 setups, re-timed to the Malay voice)
const ST = [0, W(5) - 0.1, W(10) - 0.12, W(14) - 0.1, W(24) - 0.1, W(29) - 0.12, W(34) - 0.1, W(42) - 0.12, W(49) - 0.6, W(53) - 0.12, W(64) - 0.1,
  W(70) - 0.1, W(80) - 0.12, W(85) - 0.1, W(96) - 0.1, W(98) - 0.12, W(108) - 0.1, W(115) - 0.12, W(132) - 0.12, W(143) - 0.4, DUR];
const NSET = ST.length - 1;

// ================= the stall (set "s"): a grey night-market cart, one warm bulb, the standee =================
const CT = 1.057;                                  // cart top: Bottom_Cart max y in CoffeeCart_01.gltf
const STD = [0.32, CT, 0.42];                      // the standee's place: front edge, customer side (+z)
const STB = [-0.12, CT, 0.12];                      // where it lands in setup 16 before it slides to the front
const TIN = [0.14, CT, 0.4];
const G = (id: string) => S(`${id}/${id}_g.gltf`);
const coin = (k: string, p: number[], rx = 0, rz = 0) => <Mesh3d key={k} name={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromEuler("XYZ", rx, 0, rz))}><Cylinder radius={0.0115} half_height={0.0011} /><StandardMaterial base_color_texture={TX("coin_edge")} uv_transform={Affine2.fromScale([24, 1])} metallic={0.9} perceptual_roughness={0.3} /></Mesh3d>;
// the face: a thin disc on top carrying the 50 sen relief picture (generic, not a BNM design)
const coinF = (k: string, p: number[], rx = 0, rz = 0) => <Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromEuler("XYZ", rx, 0, rz))}>
  <Mesh3d name={k + "e"}><Cylinder radius={0.0115} half_height={0.0011} /><StandardMaterial base_color_texture={TX("coin_edge")} uv_transform={Affine2.fromScale([60, 1])} metallic={0.9} perceptual_roughness={0.3} /></Mesh3d>
  <Mesh3d name={k + "f"} transform={Transform.fromXyz(0, 0.00112, 0)}><Cylinder radius={0.0109} half_height={0.00002} /><StandardMaterial base_color_texture={TX("coin50")} metallic={0.85} perceptual_roughness={0.35} /></Mesh3d></Entity>;
// the standee: a pink card in a clear acrylic stand; rise 0→1 grows it up out of the counter (setup 1), at = where it stands
// S16 drop baked in Blender (phys45.py → media/phys45.json): [x, y, z, qx, qy, qz, qw] per frame at 30 fps
const PB = PHYS as { f0: number; bodies: Record<string, { release: number; frames: number[][] }> };
// sampled between baked frames so the 60 fps final moves smoothly (positions lerped, quaternion nlerped)
const phys = (n: string) => { const fr = PB.bodies[n].frames, x = Math.max(0, Math.min(fr.length - 1.001, T * 30 - PB.f0)), i = Math.floor(x), u = x - i, a = fr[i], b = fr[i + 1];
  const s = a[3] * b[3] + a[4] * b[4] + a[5] * b[5] + a[6] * b[6] < 0 ? -1 : 1, v = a.map((c, j) => lerp(c, j > 2 ? s * b[j] : b[j], u)), k = Math.hypot(v[3], v[4], v[5], v[6]);
  return { p: [v[0], v[1], v[2]], q: [v[3] / k, v[4] / k, v[5] / k, v[6] / k] as [number, number, number, number] }; };
const SDEND = () => { const fr = PB.bodies.sd.frames, v = fr[fr.length - 1]; return [v[0], v[1], v[2]]; };
function Standee({ at, rise = 1, k = "sd", ry = 0, q }: { at: number[]; rise?: number; k?: string; ry?: number; q?: [number, number, number, number] }) {
  const h = 0.17, w = 0.118, r = Math.max(0.001, rise);
  return (
    <Entity key={k} transform={Transform.fromXyz(at[0], at[1], at[2]).withRotation(q ?? rotY(ry))}>
      <Mesh3d name={k + "sh"} transform={Transform.fromXyz(0.012, 0.0008, -0.05)}><Cuboid half_size={[w / 2 + 0.03, 0.0004, 0.08]} /><StandardMaterial base_color={Srgba.hex("#000000").with_alpha(0.45)} alpha_mode="Blend" unlit /></Mesh3d>
      <Mesh3d name={k + "b"} transform={Transform.fromXyz(0, 0.006, -0.012)}><Cuboid half_size={[w / 2 + 0.008, 0.006, 0.03]} /><StandardMaterial base_color={Srgba.hex("#cfe0f0").with_alpha(0.3)} alpha_mode="Blend" perceptual_roughness={0.03} /></Mesh3d>
      <Entity transform={Transform.fromXyz(0, 0.012, 0).withRotation(Quat.fromEuler("XYZ", -0.2, 0, 0)).withScale([1, r, 1])}>
        <Mesh3d name={k + "c"} transform={Transform.fromXyz(0, h / 2, 0)}><Cuboid half_size={[w / 2, h / 2, 0.0012]} />
          <StandardMaterial base_color_texture={TX("qr_card")} emissive={glow("#ffffff", 0.18)} emissive_texture={TX("qr_card")} perceptual_roughness={0.5} /></Mesh3d>
        <Mesh3d name={k + "a"} transform={Transform.fromXyz(0, h / 2, 0.004)}><Cuboid half_size={[w / 2 + 0.004, h / 2 + 0.004, 0.003]} /><StandardMaterial base_color={Srgba.hex("#eef4fa").with_alpha(0.16)} alpha_mode="Blend" perceptual_roughness={0.03} /></Mesh3d>
      </Entity>
    </Entity>
  );
}
function Sticker({ p, ry, rx, k, s = 1, q }: { p: number[]; ry: number; rx: number; k: string; s?: number; q?: [number, number, number, number] }) {
  return <Mesh3d key={k} name={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(q ?? Quat.fromEuler("YXZ", ry, rx, 0)).withScale(sc3(s))}><Cuboid half_size={[0.035, 0.0006, 0.05]} /><StandardMaterial base_color_texture={TX("sticker")} perceptual_roughness={0.4} /></Mesh3d>;
}
// standee + stickers fall onto the counter in setup 16 (u 0→1: a drop with one small bounce, then still)
const fall = (u: number) => { const x = cl(u); return x < 0.6 ? 0.22 * (1 - (x / 0.6) ** 2) : 0.012 * Math.sin(((x - 0.6) / 0.4) * Math.PI) * (1 - x) * 2.5; };
function Stall({ n }: { n: number }) {
  const P: any[] = [];
  P.push(<Mesh3d key="fl" transform={Transform.fromXyz(0, -0.02, 0)}><Cuboid half_size={[6, 0.02, 6]} /><StandardMaterial base_color="#08090b" normal_map_texture={S("tex/concrete_tiles_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([10, 10])} perceptual_roughness={0.22} /></Mesh3d>);
  P.push(<Model key="cart" src={S("CoffeeCart_01/CoffeeCart_01.gltf")} position={[0, 0, 0]}>
    <StandardMaterial material="CoffeeCart_01_cart" base_color="#4a4c54" />
    <StandardMaterial material="CoffeeCart_01_props" base_color={Srgba.hex("#000000").with_alpha(0)} alpha_mode="Blend" />
    <StandardMaterial material="CoffeeCart_01_mugs" base_color={Srgba.hex("#000000").with_alpha(0)} alpha_mode="Blend" />
  </Model>);
  // wet counter top: a thin glossy slab (night-market rain)
  P.push(<Mesh3d key="top" transform={Transform.fromXyz(0.05, CT + 0.003, 0.15)}><Cuboid half_size={[0.72, 0.003, 0.36]} /><StandardMaterial base_color="#3d3a36" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([2, 1])} perceptual_roughness={0.4} metallic={0.4} /></Mesh3d>);
  P.push(<Model key="pot" src={G("pot_enamel_01")} position={[-0.45, CT + 0.006, 0.02]} />);
  P.push(<Model key="lpg" src={G("small_lpg_tank")} position={[-0.5, 0, 0.75]} />);
  P.push(<Model key="crate" src={G("plastic_crate_01")} position={[0.75, 0, 0.75]} />);
  P.push(<Model key="stool" src={G("metal_stool_01")} position={[-1.05, 0, 0.9]} />);
  P.push(<Model key="crate2" src={G("wooden_crate_01")} position={[1.0, 0, -0.5]} />);
  // the canopy: grey canvas on four poles, a valance at the front edge; a price card hangs from it and swings
  for (const [px, pz] of [[-0.66, -0.2], [0.76, -0.2], [-0.66, 0.52], [0.76, 0.52]]) P.push(<Mesh3d key={"po" + px + pz} transform={Transform.fromXyz(px, (CT + 2.3) / 2, pz)}><Cylinder radius={0.014} half_height={(2.3 - CT) / 2} /><StandardMaterial base_color="#6b6f78" metallic={0.5} perceptual_roughness={0.35} /></Mesh3d>);
  const canvas = <StandardMaterial base_color="#55585f" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([3, 2])} perceptual_roughness={0.85} />;
  P.push(<Mesh3d key="rf" transform={Transform.fromXyz(0.05, 2.3, 0.16)}><Cuboid half_size={[0.86, 0.015, 0.58]} />{canvas}</Mesh3d>);
  P.push(<Mesh3d key="va" transform={Transform.fromXyz(0.05, 2.18, 0.735)}><Cuboid half_size={[0.86, 0.12, 0.004]} />{canvas}</Mesh3d>);
  const pc = Math.sin(T * 1.7) * 0.06;
  P.push(<Entity key="pcard" transform={Transform.fromXyz(-0.3, 1.95, 0.72).withRotation(Quat.fromEuler("XYZ", pc, 0, pc * 0.4))}>
    <Mesh3d transform={Transform.fromXyz(0, -0.12, 0)}><Cuboid half_size={[0.16, 0.11, 0.003]} /><StandardMaterial base_color_texture={TX("pricecard")} emissive={glow("#ffffff", 0.25)} emissive_texture={TX("pricecard")} perceptual_roughness={0.85} /></Mesh3d></Entity>);
  P.push(<Model key="crate3" src={G("plastic_crate_01")} position={[0.75, 0.26, 0.75]} />);
  P.push(<Entity key="spc" transform={Transform.fromXyz(-0.02, CT + 0.006, 0.05).withRotation(rotY(0.35))}>
    <Mesh3d transform={Transform.fromXyz(0, 0.075, 0).withRotation(Quat.fromEuler("XYZ", -0.18, 0, 0))}><Cuboid half_size={[0.11, 0.075, 0.002]} /><StandardMaterial base_color_texture={TX("pricecard")} emissive={glow("#ffffff", 0.12)} emissive_texture={TX("pricecard")} perceptual_roughness={0.85} /></Mesh3d>
    <Mesh3d transform={Transform.fromXyz(0, 0.006, -0.02)}><Cuboid half_size={[0.1, 0.006, 0.025]} /><StandardMaterial base_color="#5a4a38" perceptual_roughness={0.7} /></Mesh3d></Entity>);
  // steam off the pot: soft rising puffs (environment pressure)
  for (let i = 0; i < 7; i++) { const ph = (T * 0.35 + i / 7) % 1, a = 0.18 * Math.sin(Math.PI * ph);
    P.push(<Mesh3d key={"st" + i} name={"st" + i} transform={Transform.fromXyz(-0.45 + Math.sin(i * 2.1 + T * 0.8) * 0.03 * ph, CT + 0.2 + ph * 0.45, 0.02 + Math.cos(i * 1.7) * 0.03).withScale(sc3(1.2 + ph * 2.2))}><Sphere radius={0.05} /><StandardMaterial base_color={Srgba.hex("#eef1f5").with_alpha(a)} emissive={glow("#ffe2c0", 0.4 * a)} alpha_mode="Blend" perceptual_roughness={1} /></Mesh3d>); }
  // the cash tin: grey container, coins inside; the top coins shiver in setup 1 as the standee rises (micro-action)
  // the cash tray: an open steel tray, a pile of 50 sen coins in it (visible at frame 0)
  const tray = <StandardMaterial base_color="#8a8e96" metallic={0.8} perceptual_roughness={0.35} />;
  P.push(<Entity key="tin" transform={Transform.fromXyz(TIN[0], CT + 0.006, TIN[2]).withRotation(rotY(0.25))}>
    <Mesh3d name="trb"><Cuboid half_size={[0.08, 0.002, 0.055]} />{tray}</Mesh3d>
    {[[0.08, 0, 0.002, 0.055], [-0.08, 0, 0.002, 0.055], [0, 0.055, 0.08, 0.002], [0, -0.055, 0.08, 0.002]].map(([x, z, hx, hz], i) => <Mesh3d key={"tw" + i} name={"tw" + i} transform={Transform.fromXyz(x, 0.012, z)}><Cuboid half_size={[hx, 0.012, hz]} />{tray}</Mesh3d>)}</Entity>);
  const shv = n === 1 ? Math.sin(T * 60) * 0.004 * (1 - sm(W(4) + 0.4, W(4) + 0.9)) * sm(0, 0.2) : 0;
  for (let i = 0; i < 22; i++) P.push(coinF("cn" + i, [TIN[0] - 0.06 + rnd(i) * 0.12, CT + 0.012 + Math.floor(i / 8) * 0.0024 + (i > 15 ? shv * rnd(i + 3) : 0), TIN[2] - 0.04 + rnd(i + 5) * 0.08], (rnd(i + 2) - 0.5) * 0.12 + (i > 15 ? shv * 8 : 0), (rnd(i + 4) - 0.5) * 0.12));
  // the bulb on its pull chain (the key light), swinging a little
  const sw = Math.sin(T * 1.3) * 0.03;
  P.push(<Entity key="bulb" transform={Transform.fromXyz(0.0, CT + 0.95, 0.2).withRotation(Quat.fromEuler("XYZ", sw, 0, sw * 0.5))}>
    <Mesh3d name="cord" transform={Transform.fromXyz(0, 0.5, 0)}><Cylinder radius={0.003} half_height={0.5} /><StandardMaterial base_color="#111" /></Mesh3d>
    <Model src={G("pull_chain_light_socket")} position={[0, -0.02, 0]} />
    <Mesh3d name="glb" transform={Transform.fromXyz(0, -0.07, 0)}><Sphere radius={0.03} /><StandardMaterial base_color="#fff2d8" emissive={glow(WARM, 6)} /></Mesh3d>
  </Entity>);
  // the standee: setups 1–2 and 19–20 at the front edge; 16 falls in at the back; 17 slides to the front on "Letak"
  if (n === 1) P.push(<Standee key="sd" at={STD} rise={eo((T + 0.25) / 1.1)} />);
  else if (n === 2 || n >= 19) P.push(<Standee key="sd" at={STD} />);
  else if (n === 16) { const b = phys("sd");
    P.push(<Standee key="sd" at={b.p} q={b.q} />);
    [[0.12, 0.2, 0.4, 104], [-0.02, 0.24, -0.5, 106]].forEach((_, i) => { const b = phys("sk" + i); P.push(<Sticker key={"sk" + i} k={"sk" + i} p={[b.p[0], b.p[1] + 0.0006, b.p[2]]} q={b.q} ry={0} rx={0} />); }); }
  else if (n === 17) { const u = eo((T - W(108)) / 0.9);
    const e = SDEND(); P.push(<Standee key="sd" at={[lerp(e[0], STD[0], u), e[1], lerp(e[2], STD[2], u)]} />);
    [0, 1].forEach((i) => { const fr = PB.bodies["sk" + i].frames, v = fr[fr.length - 1]; P.push(<Sticker key={"sk" + i} k={"sk" + i} p={[v[0], v[1] + 0.0006, v[2]]} q={[v[3], v[4], v[5], v[6]]} ry={0} rx={0} />); }); }
  // 17: the customer side lights up on "pelanggan": a pink dashed strip on the ground in front of the counter
  if (n === 17) { const v = onO(111, 0.4, -0.1);
    for (let i = 0; i < 9; i++) P.push(<Mesh3d key={"cz" + i} name={"cz" + i} transform={Transform.fromXyz(-0.6 + i * 0.16, CT + 0.008, 0.47).withScale([Math.max(0.001, v), 1, 1])}><Cuboid half_size={[0.05, 0.002, 0.008]} /><StandardMaterial base_color={PINK} emissive={glow(PHOT, 3 * v)} /></Mesh3d>); }
  return (<>{P}
    <SpotLight transform={Transform.fromXyz(0.0, CT + 0.86, 0.2).lookingAt([0.2, CT, 0.35])} intensity={32000} outer_angle={0.95} inner_angle={0.45} color="#ffbf7a" shadows_enabled range={4} />
    <PointLight transform={Transform.fromXyz(0.0, CT + 0.8, 0.2)} intensity={6000} color="#ffd29a" range={3} />
    <SpotLight transform={Transform.fromXyz(STD[0] + 0.3, CT + 0.45, STD[2] - 0.9).lookingAt([STD[0], CT + 0.16, STD[2]])} intensity={9000} outer_angle={0.18} inner_angle={0.1} color="#ffe2c4" range={3} />
    <PointLight transform={Transform.fromXyz(0.2, 0.5, 1.2)} intensity={2000} color="#ffb070" range={2.5} />
    <SpotLight transform={Transform.fromXyz(-1.2, 1.9, 1.6).lookingAt([0.1, CT, 0.3])} intensity={2500} outer_angle={0.5} inner_angle={0.2} color="#9db4e0" range={6} />
    <RectLight transform={Transform.fromXyz(1.6, 2.2, -1.6).lookingAt([0, CT, 0])} intensity={5000} width={2} height={0.6} color="#8fa6cf" range={6} />
    <AmbientLight brightness={14} color="#b8a48c" />
    <Environment src={S("sky.hdr")} intensity={0.08} />
  </>);
}

// ================= the data void (set "d"): one payment as a roll of coins, the shop's cut as one coin =================
const DV = [40, 0, 0], NC = 20, CH = 0.12;   // CH: the stack top (20 coins × 2.3 mm × 2.6)
function Void({ n }: { n: number }) {
  const P: any[] = [];
  P.push(<Mesh3d key="dfl" transform={Transform.fromXyz(DV[0], -0.02, DV[2])}><Cylinder radius={1.6} half_height={0.02} /><StandardMaterial base_color="#34373d" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([4, 4])} perceptual_roughness={0.38} metallic={0.6} /></Mesh3d>);
  // the roll travels from the customer side (−x) to the shop side (+x) in setup 8; then it rests
  const x0 = n === 8 ? lerp(-0.12, 0, eo((T - (ST[7] + 0.1)) / 1.6)) : 0;
  // 9: the last coin lifts off on "potongan" (the shop's fee); 10: the pink chip lands, the coin seats back on "kecualikan"
  const lift = n === 9 ? eo((T - (W(49) - 0.05)) / 0.4) : n === 10 ? 1 - eo((T - (W(61) - 0.1)) / 0.45) : 0;
  const RC: any[] = [];   // coin stack at 2.6× (a 6 cm coin pile next to a 15 cm phone: a diorama, scale stated by the props)
  for (let i = 0; i < NC; i++) { const last = i === NC - 1;
    RC.push(coinF("rc" + i, [last ? 0.012 * lift : 0, 0.0011 + i * 0.0023 + (last ? 0.025 * lift : 0), 0], last ? 0.5 * lift : 0, 0)); }
  P.push(<Entity key="rcs" transform={Transform.fromXyz(DV[0] + x0, 0, DV[2]).withScale(sc3(2.6))}>{RC}</Entity>);
  // the two ends: a grey phone (customer) and a small grey cart (shop)
  P.push(<Mesh3d key="ph" transform={Transform.fromXyz(DV[0] - 0.17, 0.075, DV[2]).withRotation(rotY(0.5))}><Cuboid half_size={[0.036, 0.075, 0.004]} /><StandardMaterial base_color="#2a2c31" perceptual_roughness={0.3} /></Mesh3d>);
  P.push(<Entity key="mcart" transform={Transform.fromXyz(DV[0] + 0.19, 0, DV[2] - 0.02).withRotation(rotY(-0.5)).withScale(sc3(0.1))}><Model src={S("CoffeeCart_01/CoffeeCart_01.gltf")} position={[0, 0, 0]}>
    <StandardMaterial material="CoffeeCart_01_cart" base_color="#5a5d66" /><StandardMaterial material="CoffeeCart_01_props" base_color={Srgba.hex("#000000").with_alpha(0)} alpha_mode="Blend" /><StandardMaterial material="CoffeeCart_01_mugs" base_color={Srgba.hex("#000000").with_alpha(0)} alpha_mode="Blend" /></Model></Entity>);
  // 10: the "mikro & kecil" chip drops onto the roll
  if (n === 10) { const v = onO(56, 0.45, -0.15);
    P.push(<Mesh3d key="chip" name="chip" transform={Transform.fromXyz(DV[0] + 0.0, CH + 0.004 + (1 - v) * 0.12, DV[2] + 0.0).withScale(sc3(v))}><Cuboid half_size={[0.04, 0.003, 0.025]} /><StandardMaterial base_color={PINK} emissive={glow(PHOT, 1.6)} /></Mesh3d>); }
  return (<>{P}
    <SpotLight transform={Transform.fromXyz(DV[0] - 0.3, 1.6, DV[2] + 0.6).lookingAt([DV[0], 0, DV[2]])} intensity={140000} outer_angle={0.45} inner_angle={0.15} color="#ffe2b8" shadows_enabled range={4} />
    <PointLight transform={Transform.fromXyz(DV[0] + 0.15, 0.25, DV[2] + 0.3)} intensity={n === 10 ? 2500 * onO(56, 0.5) : 0} color={PHOT} range={1.5} />
    <SpotLight transform={Transform.fromXyz(DV[0] + 0.1, 0.35, DV[2] - 0.7).lookingAt([DV[0], 0.06, DV[2]])} intensity={12000} outer_angle={0.3} inner_angle={0.1} color="#ffd2a0" range={2} />
    <AmbientLight brightness={6} color="#9fb0d0" />
    <Environment src={S("sky.hdr")} intensity={0.35} />
  </>);
}

// ================= the interfaces (Bahasa Melayu): a phone cropped off an edge, 3–7 real strings per screen =================
const roll = (from: number, to: number, u: number, d = 0) => lerp(from, to, eo(u)).toFixed(d);
function Phone({ x = 140, y = 260, w = 860, children }: { x?: number; y?: number; w?: number; children: any }) {
  return (<div style={{ position: "absolute", left: x, top: y, width: w, height: 1900, borderRadius: 110, background: "#15171b", padding: 26, boxSizing: "border-box", boxShadow: "0 50px 120px rgba(0,0,0,0.6), inset 0 0 0 4px #4a4e57, inset 0 0 0 8px #1e2025, 0 0 0 2px #5a5f69" }}>
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 86, overflow: "hidden", background: PAPER, fontFamily: PS, color: INK }}>{children}</div>
  </div>);
}
const Row = ({ a, b, hot = false, sub }: { a: string; b: string; hot?: boolean; sub?: string }) => (
  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "34px 0", borderBottom: "2px solid #e1e3e7" }}>
    <div><div style={{ fontSize: 44, fontWeight: 600 }}>{a}</div>{sub ? <div style={{ fontSize: 30, color: MUTE, marginTop: 4 }}>{sub}</div> : null}</div>
    <div style={{ fontSize: 64, fontWeight: 800, color: hot ? PINK : INK, ...TAB }}>{b}</div></div>);
const Muted = ({ n = 3 }: { n?: number }) => <>{Array.from({ length: n }, (_, i) => <div key={i} style={{ height: 30, width: `${70 - i * 15}%`, borderRadius: 15, background: "#e3e5e9", margin: "26px 0" }} />)}</>;
const Tick = ({ v }: { v: number }) => <div style={{ width: 70, height: 70, borderRadius: 35, background: v > 0.5 ? PINK : "#e3e5e9", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 44, fontWeight: 800, transform: `scale(${0.7 + 0.3 * v})` }}>{v > 0.5 ? "✓" : ""}</div>;
function Rail({ n }: { n: number }) {
  const R = [["Muat turun aplikasi", "aplikasi peniaga"], ["Daftar dengan IC", "lulus serta-merta"], ["Pasang QR", "standee percuma"], ["Semak setiap bayaran", "di telefon anda"]];
  const z = n === 3 ? onO(12, 0.6, -0.1) : 1, gone = T > ST[3] - 0.36;
  return (<div style={{ position: "absolute", left: 100, top: 420, width: 880, fontFamily: PS }}>
    {R.map(([t, s], i) => { const v = onO(10, 0.4, -0.3 + i * 0.09);
      return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 40, padding: "28px 0", borderTop: i ? "2px solid rgba(255,255,255,0.12)" : "none", opacity: v, transform: `translateY(${(1 - v) * 26}px)` }}>
        <div style={{ width: 100, fontSize: 120, fontWeight: 800, lineHeight: 1, color: "#fff", textAlign: "center" }}>{i + 1}</div>
        <div><div style={{ fontSize: 56, fontWeight: 700, color: "#fff" }}>{t}</div><div style={{ fontSize: 34, color: MUTE, marginTop: 6 }}>{s}</div></div></div>); })}
    {/* the RM0 tag: the film's motif, rolls down to zero on "kosong" */}
    <div style={{ position: "absolute", right: -20, top: -150, opacity: gone ? 0 : 1, padding: "14px 34px 18px", borderRadius: 22, background: PINK, color: "#fff", fontWeight: 800, fontSize: 110, transform: `rotate(-5deg) scale(${0.85 + 0.15 * z})`, boxShadow: "0 20px 50px rgba(221,25,92,0.35)", ...TAB }}>RM{roll(9, 0, z)}</div>
  </div>);
}
function Post({ n }: { n: number }) {
  const likes = n === 4 ? roll(1.2, 12.4, lin(ST[3], ST[4]), 1) : "12.4", date = n >= 5 ? onO(27, 0.4, -0.15) : 0, wob = n === 5 ? Math.sin(T * 9) * 3 * onO(25, 0.3) : 0;
  const back = n === 6 ? onO(31, 0.5, -0.3) : 0;
  return (<div style={{ position: "absolute", left: 90, top: 330, width: 900, fontFamily: PS, filter: `blur(${14 * back}px)`, transform: `scale(${1 - 0.08 * back})`, opacity: 1 - 0.4 * back }}>
    <div style={{ borderRadius: 40, background: "#fff", padding: "40px 46px", color: INK, boxShadow: "0 40px 90px rgba(0,0,0,0.5)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}><div style={{ width: 84, height: 84, borderRadius: 42, background: "#cfd3da" }} /><div style={{ flex: 1 }}><div style={{ height: 26, width: "55%", borderRadius: 13, background: "#d9dce1" }} /><div style={{ height: 22, width: "30%", borderRadius: 11, background: "#e6e8ec", marginTop: 12 }} /></div></div>
      <div style={{ fontSize: 86, fontWeight: 900, lineHeight: 1.02, marginTop: 36, letterSpacing: -1 }}>CAJ QR<br />MULA <span style={{ display: "inline-block", padding: "0 14px", borderRadius: 14, background: date > 0.01 ? `rgba(27,29,34,${date})` : "transparent", color: date > 0.5 ? "#fff" : INK, transform: `scale(${1 + 0.12 * Math.sin(Math.PI * date)})` }}>1 NOV</span>!</div>
      <div style={{ marginTop: 26, display: "inline-block", fontSize: 64, fontWeight: 800, color: "#8a8f98", transform: `rotate(${wob}deg)` }}>RM ? setiap imbasan</div>
      <div style={{ display: "flex", gap: 40, marginTop: 34, fontSize: 36, color: MUTE, ...TAB }}><span>♥ {likes}K</span><span>↗ 3.1K kongsi</span></div>
    </div>
    <div style={{ fontSize: 30, color: MUTE, marginTop: 20 }}>hantaran tular, Okt 2026 · ilustrasi</div>
  </div>);
}
function Statement({ n }: { n: number }) {
  const v = onO(29, 0.45, -0.2), st = onO(33, 0.25, -0.12);
  return (<><Post n={n} />
    <div style={{ position: "absolute", left: 100, top: 760, width: 880, height: 470, boxSizing: "border-box", borderRadius: 34, background: PAPER, padding: "44px 50px", fontFamily: PS, color: INK, opacity: v, transform: `translateY(${(1 - v) * 40}px)`, boxShadow: "0 40px 90px rgba(0,0,0,0.55)" }}>
      <div style={{ fontSize: 34, fontWeight: 700, color: MUTE, letterSpacing: 2 }}>KENYATAAN</div>
      <div style={{ fontSize: 58, fontWeight: 800, marginTop: 10 }}>Kementerian Kewangan</div>
      <div style={{ fontSize: 34, color: MUTE, marginTop: 6 }}>19 Okt 2026</div>
      <div style={{ position: "absolute", right: 60, top: 250, padding: "10px 30px", border: `8px solid ${INK}`, borderRadius: 18, fontSize: 96, fontWeight: 900, letterSpacing: 4, transform: `rotate(-9deg) scale(${lerp(1.6, 1, st)})`, opacity: st }}>PALSU</div>
    </div></>);
}
function Pay({ n }: { n: number }) {
  const v = onO(37, 0.5, -0.1);
  return (<Phone x={-120} y={430} w={980}>
    <div style={{ padding: "150px 90px 0 150px" }}>
      <img src={S("duitnow_qr.svg")} style={{ height: 120 }} />
      <div style={{ fontSize: 36, color: MUTE, marginTop: 40 }}>Bayar kepada</div>
      <div style={{ fontSize: 56, fontWeight: 800, marginTop: 6 }}>Gerai contoh</div>
      <div style={{ marginTop: 50, borderTop: "2px solid #e1e3e7" }} />
      <Row a="Jumlah" b="RM5.00" />
      <Row a="Caj pelanggan" b={`RM${roll(0.5, 0, v, 2)}`} hot={v > 0.6} />
      <div style={{ marginTop: 50, height: 120, borderRadius: 60, background: PINK, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50, fontWeight: 800 }}>Bayar RM5.00</div>
      <div style={{ fontSize: 28, color: MUTE, marginTop: 24, textAlign: "center" }}>ilustrasi</div>
    </div>
  </Phone>);
}
function App({ n }: { n: number }) {
  const ring = eo(lin(W(66) - 0.1, W(69) + 0.2));
  return (<Phone x={80} y={430} w={960}>
    <div style={{ padding: "170px 80px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        <div style={{ position: "relative", width: 230, height: 230, borderRadius: 56, background: "#2a2d33", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 76, fontWeight: 900 }}>QR
          <svg style={{ position: "absolute", left: -18, top: -18 }} width={266} height={266}><circle cx={133} cy={133} r={124} stroke={PINK} strokeWidth={10} fill="none" strokeDasharray={`${779 * ring} 779`} transform="rotate(-90 133 133)" strokeLinecap="round" /></svg></div>
        <div><div style={{ fontSize: 56, fontWeight: 800 }}>QRPayBiz</div><div style={{ fontSize: 34, color: MUTE, marginTop: 6 }}>Maybank · aplikasi peniaga</div></div></div>
      <div style={{ marginTop: 60, height: 120, borderRadius: 60, background: ring > 0.98 ? PINK : INK, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, fontWeight: 800 }}>{ring > 0.98 ? "Buka" : `Muat turun ${Math.round(ring * 100)}%`}</div>
      <Muted n={3} />
      <div style={{ fontSize: 28, color: MUTE }}>ilustrasi, bukan skrin sebenar</div>
    </div>
  </Phone>);
}
function Fees({ n }: { n: number }) {
  const r = (i: number) => (n === 12 ? onO(77 + i, 0.6, -0.4 + i * 0.12) : 1);
  return (<Phone x={80} y={430} w={960}>
    <div style={{ padding: "160px 80px" }}>
      <div style={{ fontSize: 34, fontWeight: 700, color: MUTE, letterSpacing: 2 }}>CAJ PENIAGA</div>
      <div style={{ fontSize: 60, fontWeight: 800, marginTop: 8 }}>QRPayBiz</div>
      <div style={{ marginTop: 30, borderTop: "2px solid #e1e3e7" }} />
      <Row a="Yuran daftar" b={`RM${roll(50, 0, r(0))}`} hot={r(0) > 0.9} />
      <Row a="Yuran bulanan" b={`RM${roll(20, 0, r(1))}`} hot={r(1) > 0.9} />
      <Row a="Setiap bayaran" b={`${roll(0.5, 0, r(2), 1)}%`} hot={r(2) > 0.9} sub="MDR" />
      <div style={{ marginTop: 50, height: 120, borderRadius: 60, background: INK, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, fontWeight: 800 }}>Daftar sekarang</div>
      <div style={{ fontSize: 28, color: MUTE, marginTop: 30 }}>Sumber: Maybank, via SAYS (Nov 2024) · ilustrasi</div>
    </div>
  </Phone>);
}
function Ic({ n }: { n: number }) {
  const card = n === 13 ? eo((T - (W(82) - 0.1)) / 0.7) : 1, fill = n === 13 ? onO(84, 0.5, -0.1) : 1;
  const chk = (i: number, w: number) => (n === 14 ? onO(w, 0.3, -0.1) : n > 14 ? 1 : 0);
  const ok = n === 15 ? onO(96, 0.45, -0.15) : 0;
  return (<>
    <Phone x={80} y={430} w={960}>
      <div style={{ padding: "160px 80px" }}>
        <div style={{ fontSize: 34, fontWeight: 700, color: MUTE, letterSpacing: 2 }}>DAFTAR PENIAGA</div>
        <div style={{ marginTop: 28, fontSize: 34, color: MUTE }}>No. kad pengenalan</div>
        <div style={{ marginTop: 10, height: 100, borderRadius: 20, border: `4px solid ${fill > 0.5 ? PINK : "#d5d8de"}`, display: "flex", alignItems: "center", padding: "0 30px", fontSize: 50, fontWeight: 700, letterSpacing: 4, ...TAB }}>{"••••••-••-••••".slice(0, Math.round(14 * fill))}</div>
        <div style={{ marginTop: 40 }}>
          {[["18 tahun ke atas", 88], ["Perniagaan sah", 92], ["Akaun bank", 95]].map(([t, w], i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 30, padding: "22px 0" }}><Tick v={chk(i, w as number)} /><div style={{ fontSize: 46, fontWeight: 600 }}>{t}</div></div>)}
        </div>
        {/* the submit button morphs into "Diluluskan" on "Kelulusan" */}
        <div style={{ marginTop: 40, height: 130, width: `${lerp(100, 100, ok)}%`, borderRadius: lerp(24, 65, ok), background: ok > 0.02 ? PINK : INK, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, fontWeight: 800, transform: `scale(${1 + 0.06 * Math.sin(Math.PI * ok)})` }}>{ok > 0.5 ? "✓ Diluluskan" : "Hantar"}</div>
      </div>
    </Phone>
    {n === 13 ? <div style={{ position: "absolute", left: 170, top: lerp(1950, 1240, card), width: 640, height: 400, borderRadius: 30, background: "linear-gradient(135deg, #8d939c, #5f646d)", boxShadow: "0 30px 70px rgba(0,0,0,0.6)", transform: "rotate(-4deg)", padding: 34, boxSizing: "border-box", fontFamily: PS, color: "#eef0f3" }}>
      <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 3 }}>KAD PENGENALAN</div><div style={{ display: "flex", gap: 30, marginTop: 30 }}><div style={{ width: 150, height: 190, borderRadius: 12, background: "#4c5058" }} /><div style={{ flex: 1 }}><Muted n={3} /></div></div>
      <div style={{ position: "absolute", right: 30, bottom: 20, fontSize: 24, color: "#d0d3d8" }}>ilustrasi</div></div> : null}
  </>);
}
function Alerts({ n }: { n: number }) {
  const a1 = onO(117, 0.45, -0.1), a2 = onO(121, 0.45, -0.1), bal = 5 * eo(lin(W(117) + 0.1, W(117) + 0.8)) + 3.5 * eo(lin(W(121) + 0.1, W(121) + 0.8)), mine = onO(127, 0.4, -0.2);
  const Al = ({ v, amt, t }: { v: number; amt: string; t: string }) => v < 0.01 ? null : <div style={{ maxHeight: 190 * v, overflow: "hidden", transform: `translateY(${(1 - v) * -40}px)`, opacity: v }}>
    <div style={{ display: "flex", alignItems: "center", gap: 26, padding: 30, margin: "14px 0", borderRadius: 30, background: "#fff", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
      <img src={S("duitnow_qr.svg")} style={{ height: 70 }} /><div style={{ flex: 1 }}><div style={{ fontSize: 40, fontWeight: 800 }}>Diterima {amt}</div><div style={{ fontSize: 30, color: MUTE }}>DuitNow QR · {t}</div></div></div></div>;
  return (<Phone x={80} y={430} w={960}>
    <div style={{ padding: "150px 70px 0", outline: mine > 0.01 ? `${8 * mine}px solid ${PINK}` : "none", outlineOffset: -8, height: "100%", boxSizing: "border-box" }}>
      <div style={{ fontSize: 36, color: MUTE }}>Baki hari ini</div>
      <div style={{ fontSize: 150, fontWeight: 900, lineHeight: 1.05, color: bal > 0.01 ? PINK : INK, ...TAB }}>RM{bal.toFixed(2)}</div>
      <div style={{ marginTop: 30 }}><div style={{ display: "flex", alignItems: "center", gap: 20, padding: 26, margin: "14px 0", borderRadius: 30, border: "3px dashed #d5d8de", color: MUTE, fontSize: 36, fontWeight: 600 }}>Menunggu bayaran seterusnya…</div><Al v={a2} amt="RM3.50" t="baru sahaja" /><Al v={a1} amt="RM5.00" t={a2 > 0.5 ? "1 min lalu" : "baru sahaja"} /></div>
      <div style={{ fontSize: 28, color: MUTE, marginTop: 20 }}>ilustrasi</div>
    </div>
  </Phone>);
}
function Zero({ n }: { n: number }) {
  const R = [["Yuran daftar", 134], ["Yuran bulanan", 137], ["Potongan jualan", 140]] as [string, number][];
  return (<div style={{ position: "absolute", left: 60, top: 1290, width: 960, padding: "0px 40px", boxSizing: "border-box", borderRadius: 30, background: "rgba(13,14,17,0.72)", fontFamily: PS }}>
    {R.map(([t, w], i) => { const v = onO(w, 0.4, -0.15);
      return (<div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0", borderTop: i ? "2px solid rgba(255,255,255,0.12)" : "none", opacity: 0.3 + 0.7 * v }}>
        <div style={{ fontSize: 64, fontWeight: 700, color: "#fff" }}>{t}</div>
        <div style={{ padding: "8px 26px 12px", borderRadius: 18, background: v > 0.5 ? PINK : "transparent", border: `4px solid ${PINK}`, color: "#fff", fontSize: 80, fontWeight: 800, transform: `rotate(${-4 * v}deg) scale(${0.85 + 0.15 * v})`, ...TAB }}>RM{roll(9, 0, v)}</div></div>); })}
  </div>);
}
function Ui({ n }: { n: number }) {
  const c = SETUPS[n - 1]; if (!c.ui) return null;
  // one screen as seen by setup k's own push-in (a scale + pan of the page)
  const view = (k: number) => { const cu = SETUPS[k - 1].ui!, x = cl((T - ST[k - 1]) / (ST[k] - ST[k - 1])), u = 0.55 * x + 0.45 * ss(x, 0, 1);
    return { s: lerp(cu.a[0], cu.b[0], u), fx: lerp(cu.a[1], cu.b[1], u), fy: lerp(cu.a[2], cu.b[2], u), rz: cu.rz ?? 0 }; };
  const bodyOf = (k: number) => { const sc = SETUPS[k - 1].ui!.screen;
    return sc === "rail" ? <Rail n={k} /> : sc === "post" ? <Post n={k} /> : sc === "stmt" ? <Statement n={k} /> : sc === "pay" ? <Pay n={k} /> : sc === "app" ? <App n={k} /> : sc === "fees" ? <Fees n={k} /> : sc === "ic" ? <Ic n={k} /> : sc === "alerts" ? <Alerts n={k} /> : <Zero n={k} />; };
  const page = (k: number, dx: number, blur = 0, op = 1) => { const v = view(k);
    return <div key={"pg" + k} style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, transformOrigin: "0 0", transform: `translate(${540 - v.fx * v.s + dx}px, ${1000 - v.fy * v.s}px) scale(${v.s}) rotate(${v.rz}deg)`, filter: `blur(${blur}px)`, opacity: op }}>{bodyOf(k)}</div>; };
  const prev = n > 1 ? SETUPS[n - 2].ui : undefined, same = !!prev && prev.screen === c.ui.screen;
  // seams: screen → another screen = the phone's own push (the new screen carries the old one off to the left);
  // 3D → screen = a focus pull (blur clears); same screen = the camera simply keeps moving
  const push = !!prev && !same && T < ST[n - 1] + 0.42 ? eo((T - ST[n - 1]) / 0.42) : -1;
  const enter = same || prev || n === 11 ? 1 : eo((T - (ST[n - 1] - 0.05)) / 0.33);
  const layers = push >= 0 ? [page(n - 1, -1080 * push), page(n, 1080 * (1 - push))] : [page(n, 0, (1 - enter) * 10, 0.4 + 0.6 * enter)];
  // the ground: the night-market dark with the bulb's warm pool and a faint wet sheen, so screens and stall share one world
  return (<div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, overflow: "hidden", background: `radial-gradient(ellipse at 30% 18%, rgba(255,199,122,0.16) 0%, rgba(255,199,122,0) 45%), radial-gradient(ellipse at 50% 60%, #1c1f25 0%, ${BG} 75%)` }}>
    {layers}
    {/* the caption band stays dark: screens never pass under it (readability) */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 330, background: BG }} /><div style={{ position: "absolute", left: 0, top: 330, width: 1080, height: 2, background: "rgba(255,255,255,0.08)" }} />
  </div>);
}

// ================= the 20 setups =================
type Pose = { p: number[]; l: number[] };
type Tag = { at: number[]; x: number; y: number; cap: string; big?: string; sub?: string; t: number; noLine?: boolean };
type Setup = { set: string; a: Pose; b: Pose; fov?: number; fs?: number; up?: number[]; tr?: "in" | "out" | "side"; fd?: () => number | null; tags?: Tag[];
  count?: { v: () => string; unit: string; t?: number }; note?: string; src?: string; step?: number; ui?: { screen: string; a: number[]; b: number[]; rz?: number } };
const fromT = (l: number[], dir: number[], d: number) => { const k = Math.hypot(dir[0], dir[1], dir[2]); return [l[0] + (dir[0] / k) * d, l[1] + (dir[1] / k) * d, l[2] + (dir[2] / k) * d]; };
const dist3 = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const C = (p: number[], l: number[]): Pose => ({ p, l });
const SDC = [STD[0], CT + 0.08, STD[2]], CTR = [0.05, CT - 0.1, 0.2], DVC = [DV[0], 0.02, DV[2]];
const P1A = C(fromT(SDC, [-0.55, 0.1, 1], 0.7), [SDC[0] - 0.1, SDC[1] + 0.03, SDC[2]]);
const P1B = C(fromT(SDC, [-0.5, 0.1, 1], 0.55), [SDC[0] - 0.08, SDC[1] - 0.01, SDC[2]]);   // where setup 1 settles; setup 20 lands here (seamless loop)
const NOCAM = C([0, 3, 3], [0, 0, 0]);
const U = (screen: string, a: number[], b: number[], rz = 0) => ({ ui: { screen, a, b, rz }, set: "u", a: NOCAM, b: NOCAM });
const SETUPS: Setup[] = [
  /* 1 macro, low grazing  */ { set: "s", a: P1A, b: P1B, fov: 30, fs: 8 },
  /* 2 crane up, pull out  */ { set: "s", a: C(fromT(SDC, [-0.3, 0.4, 1], 0.6), SDC), b: C(fromT([0.18, CT + 0.1, 0.36], [-0.4, 0.35, 1], 1.0), [0.18, CT + 0.1, 0.36]), fov: 34, fs: 8 },
  /* 3 step rail + RM0     */ { ...U("rail", [1.0, 540, 900], [1.05, 560, 880]) },
  /* 4 tilted viral post   */ { ...U("post", [1.0, 540, 820], [1.06, 540, 800], -6) },
  /* 5 macro on the date   */ { ...U("post", [2.0, 560, 560], [2.3, 560, 545], 4) },
  /* 6 rack focus: PALSU   */ { ...U("stmt", [1.0, 540, 1000], [1.05, 560, 1080]) },
  /* 7 customer pay screen */ { ...U("pay", [1.22, 360, 1050], [1.28, 360, 1070]) },
  /* 8 orbit to top-down   */ { set: "d", tr: "in", a: C(fromT(DVC, [0, 0.45, 1], 0.7), DVC), b: C(fromT(DVC, [0.3, 1.6, 0.45], 0.68), DVC), fov: 50, fs: 5.6,
    tags: [{ at: [DV[0] - 0.17, 0.15, DV[2]], x: 70, y: 1300, cap: "PELANGGAN", t: W(42) }, { at: [DV[0] + 0.19, 0.12, DV[2]], x: 760, y: 1300, cap: "PENIAGA", t: W(47) }] },
  /* 9 low macro, the cut  */ { set: "d", a: C(fromT([DV[0], 0.1, DV[2]], [0.3, 0.35, 1], 0.6), [DV[0], 0.1, DV[2]]), b: C(fromT([DV[0], 0.1, DV[2]], [0.2, 0.3, 1], 0.52), [DV[0], 0.1, DV[2]]), fov: 30, fs: 5.6,
    tags: [{ at: [DV[0] + 0.03, 0.18, DV[2]], x: 600, y: 700, cap: "MDR", big: "caj peniaga", sub: "potongan kecil setiap bayaran", t: W(50) }] },
  /* 10 pull out, waived   */ { set: "d", a: C(fromT([DV[0], 0.08, DV[2]], [0.3, 1.0, 1], 0.55), [DV[0], 0.08, DV[2]]), b: C(fromT([DV[0], 0.08, DV[2]], [0.25, 0.8, 1], 0.7), [DV[0], 0.08, DV[2]]), fov: 30, fs: 5.6,
    tags: [{ at: [DV[0], CH + 0.01, DV[2]], x: 90, y: 1250, cap: "MIKRO & KECIL", big: "dikecualikan", sub: "kebanyakan bank besar (BNM, 2023)", t: W(61) }] },
  /* 11 download the app   */ { ...U("app", [1.2, 560, 1000], [1.27, 540, 980]), step: 1 },
  /* 12 fees roll to 0     */ { ...U("fees", [1.15, 520, 1060], [1.24, 520, 1090], 3), step: 1 },
  /* 13 tilted close-up on the IC field */ { ...U("ic", [1.55, 420, 900], [1.65, 420, 910], -4), step: 2 },
  /* 14 checklist ticks    */ { ...U("ic", [1.45, 470, 1060], [1.55, 470, 1090], -3), step: 2 },
  /* 15 snap push: approved*/ { ...U("ic", [1.7, 560, 1330], [2.05, 560, 1340], 5), step: 2 },
  /* 16 low grazing: drop  */ { set: "s", tr: "out", a: C(fromT([STB[0], CT + 0.06, STB[2]], [1, 0.08, 0.55], 0.75), [STB[0], CT + 0.06, STB[2]]), b: C(fromT([STB[0], CT + 0.06, STB[2]], [1, 0.1, 0.8], 0.68), [STB[0], CT + 0.06, STB[2]]), fov: 30, fs: 5.6, step: 3 },
  /* 17 high plan view     */ { set: "s", tr: "in", a: C([0.24, CT + 0.9, 0.5], [0.24, CT, 0.27]), b: C([0.25, CT + 0.86, 0.5], [0.25, CT, 0.27]), fov: 40, fs: 8, step: 3,
    tags: [{ at: [0.2, CT + 0.01, 0.47], x: 600, y: 1000, cap: "PELANGGAN", big: "di sini ↓", noLine: true, t: W(111) }] },
  /* 18 your phone: alerts */ { ...U("alerts", [1.15, 520, 1080], [1.2, 520, 1070]), step: 4 },
  /* 19 low, from the left, RM0 rows */ { set: "s", tr: "out", a: C(fromT(SDC, [-1, 0.15, 0.7], 0.95), [SDC[0], SDC[1] + 0.0, SDC[2]]), b: C(fromT(SDC, [-1, 0.12, 0.85], 0.85), [SDC[0], SDC[1] + 0.0, SDC[2]]), fov: 30, fs: 8 },
  /* 20 pull back to frame 0 (loop) */ { set: "s", tr: "out", a: C(fromT([0.18, CT + 0.1, 0.36], [-0.4, 0.35, 1], 1.0), [0.18, CT + 0.1, 0.36]), b: P1B, fov: 30, fs: 8 },
];
function World({ n }: { n: number }) {
  const s = SETUPS[n - 1].set;
  return s === "s" ? <Stall n={n} /> : s === "d" ? <Void n={n} /> : null;
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
const LOGO = (h: number) => <div style={{ display: "inline-flex", padding: "12px 16px", borderRadius: 18, background: "#ffffff" }}><img src={S("duitnow_qr.svg")} style={{ height: h }} /></div>;   // the real DuitNow mark from frame 1 (brand-logo-first)
function Overlay({ n, cam, still }: { n: number; cam: Cam; still?: boolean }) {
  const c = SETUPS[n - 1], t0 = ST[n - 1], t1 = ST[n];
  const life = still ? 1 : fade(t0 + 0.12) * (1 - ss(T, t1 - 0.2, t1 - 0.04));
  const end = n === NSET ? fade(W(151) + 0.4, 0.25) : 0, logoEnd = n === NSET ? fade(DUR - 2.6, 0.4) : 0, h0 = n === 1 ? 1 : n === 2 ? 1 - sm(ST[1] + 0.15, ST[1] + 0.45) : 0;
  const BIG = { position: "absolute", left: 60, top: 1290, fontFamily: FF, fontWeight: 800, fontSize: 80, lineHeight: 1.06, letterSpacing: -1.5, color: "#ffffff", textShadow: "0 2px 18px rgba(0,0,0,0.9)" } as any;
  return (<>
    {c.ui ? null : <><div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 470, background: "linear-gradient(#0d0e11 34%, rgba(13,14,17,0))" }} />
    <div style={{ position: "absolute", left: 0, top: 1480, width: 1080, height: 440, background: "linear-gradient(rgba(13,14,17,0), #0d0e11 70%)" }} /></>}
    {c.src ? <div style={{ position: "absolute", left: 60, top: 372, fontFamily: FF, fontSize: 32, fontWeight: 500, color: "#e6e8ec", opacity: life * fade(t0 + 0.2, 0.3) }}>{c.src}</div> : null}
    {(c.tags ?? []).map((g, i) => { const a = life * fade(g.t, 0.22); if (a < 0.01) return null; const q = projS(cam, g.at), ly = g.y < q.y ? g.y + (g.big ? 112 : 44) : g.y - 8, x1 = g.x + 50, d = fade(g.t, 0.3); return (
      <div key={i} style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, opacity: a }}>
        {g.noLine ? null : <svg style={{ position: "absolute", left: 0, top: 0 }} width={1080} height={1920}><line x1={q.x} y1={q.y} x2={lerp(q.x, x1, d)} y2={lerp(q.y, ly, d)} stroke="#ffffff" strokeWidth={2} opacity={0.75} /><circle cx={q.x} cy={q.y} r={5} fill="#ffffff" /></svg>}
        <div style={{ position: "absolute", left: g.x, top: g.y, fontFamily: FF, color: "#ffffff", textShadow: "0 2px 14px rgba(0,0,0,0.9)", opacity: fade(g.t + 0.12, 0.2), transform: `translateY(${(1 - fade(g.t + 0.12, 0.2)) * 10}px)` }}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 4 }}>{g.cap}</div>
          {g.big ? <div style={{ fontSize: 54, fontWeight: 600, letterSpacing: -0.5, marginTop: 2 }}>{g.big}</div> : null}
          {g.sub ? <div style={{ fontSize: 27, fontWeight: 400, color: "#c3c6cc", marginTop: 4 }}>{g.sub}</div> : null}
        </div>
      </div>); })}
    {c.step ? <div style={{ position: "absolute", left: 36, top: 1576, display: "flex", gap: 10, padding: 14, borderRadius: 18, background: "rgba(13,14,17,0.92)", fontFamily: FF, opacity: still || (n > 1 && SETUPS[n - 2].step) ? 1 : fade(t0 + 0.05, 0.2) }}>{["MUAT TURUN", "DAFTAR", "PASANG", "SEMAK"].map((w, i) => { const lit = c.step === i + 1, done = (c.step ?? 0) > i + 1;
      return <div key={i} style={{ padding: "8px 14px", borderRadius: 8, background: lit ? PINK : done ? "rgba(221,25,92,0.22)" : "rgba(255,255,255,0.08)", color: lit ? "#fff" : done ? "#ff8db4" : "#8a8d93", fontSize: 34, fontWeight: 700, letterSpacing: 2 }}>{i + 1} · {w}</div>; })}</div> : null}
    {n === 19 ? <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920 }}><Zero n={n} /></div> : null}
    {/* carry 1: the RM0 tag leaves the step rail (end of 3), waits small in the corner through the rumour (4–6), and lands on the customer's fee in 7 */}
    {n >= 3 && n <= 7 ? (() => { const S0 = [845, 433, 1], C0 = [925, 1470, 0.42], E0 = [835, 1035, 0.3];
      const a = n === 3 ? eo((T - (ST[3] - 0.36)) / 0.36) : 1, b = n === 7 ? eo((T - (W(37) - 0.3)) / 0.45) : 0, gone = n === 7 && T > W(37) + 0.2;
      if (n === 3 && a <= 0) return null; if (gone) return null;
      const P0 = b > 0 ? C0.map((c, i) => lerp(c, E0[i], b)) : S0.map((c, i) => lerp(c, C0[i], a)), bob = n >= 4 && n <= 6 ? Math.sin(T * 2.2) * 6 : 0, arc = -Math.sin(Math.PI * (b > 0 ? b : a)) * 120;
      return <div style={{ position: "absolute", left: P0[0], top: P0[1] + bob + arc, transform: `translate(-50%, -50%) scale(${P0[2]}) rotate(${-5 + 10 * (b > 0 ? b : a)}deg)`, padding: "14px 34px 18px", borderRadius: 22, background: PINK, color: "#fff", fontFamily: PS, fontWeight: 800, fontSize: 110, boxShadow: "0 20px 50px rgba(221,25,92,0.35)", opacity: 1 - 0.6 * cl((b - 0.85) / 0.15) }}>RM0</div>; })() : null}
    {/* carry 2: the coin stack becomes the phone (end of 10 → 11): its outline grows out of the stack into the phone body */}
    {n === 10 && T > ST[10] - 0.45 ? (() => { const g = eo((T - (ST[10] - 0.45)) / 0.45), q = projS(cam, [DV[0], 0.06, DV[2]]);
      const x = lerp(q.x - 30, -36, g), y = lerp(q.y - 55, 316, g), w = lerp(60, 1152, g), h = lerp(110, 1800, g);
      return <div style={{ position: "absolute", left: x, top: y, width: w, height: h, boxSizing: "border-box", borderRadius: lerp(14, 130, g), border: `${lerp(6, 31, g)}px solid #15171b`, background: `rgba(242,243,245,${cl((g - 0.55) / 0.45)})`, boxShadow: "0 0 0 2px #5a5f69" }} />; })() : null}
    {h0 > 0.01 ? <div style={{ ...BIG, top: 1150, opacity: h0 }}>
      <div style={{ marginBottom: 22 }}>{LOGO(110)}</div>
      Caj QR mula 1 Nov?<br />Anda bayar <span style={{ color: PINK }}>RM0.</span></div> : null}
    {end > 0.01 ? <div style={{ ...BIG, top: 1330, opacity: end * (1 - logoEnd), transform: `translateY(${(1 - end) * 14}px)` }}>Masih tunai<br /><span style={{ color: PINK }}>sahaja?</span></div> : null}
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
