// EX39 kit (from EX38): shared pieces for the board and the film (assembled into board.tsx / film2.tsx by assemble.py)
import { AbsoluteFill, Composition, registerRoot, staticFile, useCurrentFrame } from "raea";
import { Model, Entity } from "raea/3d";
import { StandardMaterial } from "raea/pbr";
import { Cuboid, Cylinder, Mesh3d, Sphere, manifold, crossSection } from "raea/mesh";
import { AmbientLight, DirectionalLight, Environment, PointLight, SpotLight, RectLight } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
import { Bloom, DepthOfField, MotionBlur, ToneMapping } from "raea/post_process";
import { LinearRgba, Srgba } from "raea/color";
import MAP from "./map39.json";
import TL from "./tl.json";

const S = (p: string) => staticFile(p);
const TX = (n: string) => staticFile(`tx/${n}.png`);
const RED = "#c8202a", HOT = "#ff3b3b", BG = "#0d0e11", GREY = "#c9c5bc";
const glow = (hex: string, k: number) => LinearRgba.from(Srgba.hex(hex)).mul(k);
const rnd = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const cl = (x: number) => Math.max(0, Math.min(1, x));
const ss = (t: number, a: number, b: number) => { const u = cl((t - a) / (b - a)); return u * u * (3 - 2 * u); };
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
const rotY = (r: number) => Quat.fromEuler("XYZ", 0, r, 0);
const at = (p: number[], ry = 0, sc: number | number[] = 1) => Transform.fromXyz(p[0], p[1], p[2]).withRotation(rotY(ry)).withScale(typeof sc === "number" ? [sc, sc, sc] : sc);

// ---------- library products, repainted neutral (one accent rule) ----------
const PRODUCTS = ["bleach_bottle", "multi_cleaner_5_litre", "drain_cleaner", "cleaner_tin_01", "all_purpose_cleaner", "plastic_thermos", "pot_enamel_01", "wooden_bowl_01", "small_plastic_torch", "watering_can_metal_01", "wicker_basket_01", "multi_cleaner_bottle"];
const PSCALE: Record<string, number> = { wicker_basket_01: 0.55, watering_can_metal_01: 0.55, pot_enamel_01: 0.8, wooden_bowl_01: 0.8, plastic_thermos: 0.8, multi_cleaner_5_litre: 0.85 };
function Product({ id, p, ry = 0, sc = 1, k }: { id: string; p: number[]; ry?: number; sc?: number; tone?: number; k: string }) {
  const s = sc * (PSCALE[id] ?? 1);
  return <Model key={k} src={S(`${id}/${id}_g.gltf`)} position={p as any} rotation={[0, ry, 0]} scale={[s, s, s]} />;
}

// ---------- solids, built once ----------
let SO: any = null;
const NS = 26;                         // hero bottle height; 26 slices = 10 sen each of RM2.60
const so = () => (SO ??= (() => {
  const prof = crossSection.polygon([[0, 0], [0.033, 0], [0.038, 0.005], [0.038, 0.128], [0.0365, 0.148], [0.03, 0.168], [0.02, 0.186], [0.0145, 0.194], [0.0145, 0.206], [0, 0.206]]);
  const body = prof.revolve({ segments: 72 }).rotate(-90, 0, 0);
  const ribs: any[] = []; for (let i = 0; i < 36; i++) ribs.push(manifold.box(0.0025, 0.024, 0.004).move(-0.00125, 0, 0.0165).rotate(0, i * 10, 0));
  const cap = manifold.union(manifold.cylinder(0.0172, 0.024).rotate(-90, 0, 0), ...ribs).move(0, 0.204, 0);
  const whole = body.union(cap), BH = whole.bounds().max[1] - 0.0004;                /* slice by the solid's real height */
  const slices: any[] = []; for (let i = 0; i < NS; i++) slices.push(whole.trim(0, 1, 0, (i * BH) / NS).trim(0, -1, 0, -((i + 1) * BH) / NS));
  const coin = manifold.cylinder(0.013, 0.0021).minus(manifold.cylinder(0.0112, 0.001).move(0, 0, 0.0017)).rotate(-90, 0, 0);
  const handle = manifold.torus(0.085, 0.009).trim(0, 1, 0, 0).scale(1, 1.3, 0.6);
  // shipping container: corrugated shell, open at +z
  const corr: any[] = []; for (let i = 0; i < 24; i++) corr.push(manifold.box(0.06, 2.3, 0.03).move(-2.9 + i * 0.25, 0.1, -1.235));
  const shell = manifold.box(6.06, 2.59, 2.44).move(-3.03, 0, -1.22).minus(manifold.box(6.3, 2.4, 2.3).move(-2.9, 0.1, -1.15));        /* open at the +x end */
  return { body, cap, slices, coin, handle, shell, corr: manifold.union(...corr) };
})());

// ---------- hero bottle (ours: a revolved solid, so it can slice); label = an illustration ----------
function Bottle({ p, ry = 0, label = true, k = "bot" }: { p: number[]; ry?: number; label?: boolean; k?: string }) {
  return (
    <Entity key={k} transform={at(p, ry)}>
      <Mesh3d shape={so().body}><StandardMaterial base_color="#e4e1d9" perceptual_roughness={0.38} /></Mesh3d>
      <Mesh3d shape={so().cap}><StandardMaterial base_color="#3a3c41" perceptual_roughness={0.5} /></Mesh3d>
      {label ? <Mesh3d transform={Transform.fromXyz(0, 0.072, 0)}><Cylinder radius={0.0384} half_height={0.043} /><StandardMaterial base_color_texture={TX("bottle_label")} perceptual_roughness={0.7} /></Mesh3d> : null}
    </Entity>
  );
}
// ---------- split-flap price sign: `prev` → `price` as fl goes 0 → 1 (each flap closes, swaps, opens); shv = one shiver ----------
function Sign({ p, ry = 0, price = "2.60", prev, fl = 1, shv = 0, tilt = -0.14, k = "sign", sc = 1, em = 0.85 }: { p: number[]; ry?: number; price?: string; prev?: string; fl?: number; shv?: number; tilt?: number; k?: string; sc?: number; em?: number }) {
  const ch = (c: string) => (c === "." ? "dot" : c === "?" ? "q" : c);
  const now = ["rm", ...price.split("").map(ch)], old = ["rm", ...(prev ?? price).split("").map(ch)];
  const W = [0.034, 0.034, 0.02, 0.034, 0.034], gap = 0.004, total = W.reduce((a, b) => a + b, 0) + gap * 4;
  let x = -total / 2;
  return (
    <Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromEuler("YXZ", ry, tilt, 0)).withScale([sc, sc, sc])}>
      <Mesh3d transform={Transform.fromXyz(0, 0.06, 0)}><Cuboid half_size={[0.1, 0.054, 0.013]} /><StandardMaterial base_color="#131417" perceptual_roughness={0.4} /></Mesh3d>
      <Mesh3d transform={Transform.fromXyz(0, 0.094, 0.0135)}><Cuboid half_size={[0.094, 0.0145, 0.0008]} /><StandardMaterial base_color_texture={TX("band")} emissive={glow("#ffffff", em)} emissive_texture={TX("band")} perceptual_roughness={0.5} /></Mesh3d>
      {now.map((c1, i) => { const w = W[i]; const cx = x + w / 2; x += w + gap;
        const li = old[i] === c1 ? 1 : cl(fl * 1.5 - (i - 1) * 0.12), c = li < 0.5 ? old[i] : c1;
        const sh = Math.sin(Math.PI * cl(shv * 1.6 - (i - 1) * 0.15)), sy = Math.max(0.03, Math.abs(Math.cos(Math.PI * li))) * (1 - 0.45 * sh);
        return (
        <Mesh3d key={k + i + c} name={k + i + c} transform={Transform.fromXyz(cx, 0.043, 0.0135).withScale([1, sy, 1])}><Cuboid half_size={[w / 2, 0.03, 0.0012]} />
          <StandardMaterial base_color_texture={TX("flap_" + c)} emissive={glow("#ffffff", em)} emissive_texture={TX("flap_" + c)} perceptual_roughness={0.45} /></Mesh3d>); })}
      <Mesh3d transform={Transform.fromXyz(0, 0.003, -0.01)}><Cuboid half_size={[0.085, 0.003, 0.03]} /><StandardMaterial base_color="#101114" perceptual_roughness={0.35} metallic={0.4} /></Mesh3d>
    </Entity>
  );
}

// ---------- coins: n may be fractional (the top coin is still dropping); the top `hot` of `total` glow ----------
function Coins({ p, n, k, hot = 0, total }: { p: number[]; n: number; k: string; hot?: number; total?: number }) {
  const P: any[] = [], N = total ?? Math.ceil(n), full = Math.floor(n + 1e-6), fr = n - full;
  for (let i = 0; i < Math.min(N, full + (fr > 0.02 ? 1 : 0)); i++) { const drop = i === full ? (1 - fr) * (1 - fr) * 0.045 : 0;
    P.push(<Mesh3d key={k + i} name={k + i} shape={so().coin} transform={Transform.fromXyz(p[0] + (rnd(i * 7 + N) - 0.5) * 0.0016, p[1] + i * 0.0022 + drop, p[2] + (rnd(i * 13 + N) - 0.5) * 0.0016)}>
      <StandardMaterial base_color={i >= N - hot ? "#e9584f" : "#d9dadd"} emissive={i >= N - hot ? glow(HOT, 1.4) : glow("#000000", 0)} metallic={0.7} perceptual_roughness={0.3} /></Mesh3d>); }
  return <>{P}</>;
}

// ---------- the bag everyone knows: x = 0 solid … 1 x-ray (shell and print fade out, outline edges glow) ----------
function Bag({ p, ry = 0.16, x = 0, k = "bag" }: { p: number[]; ry?: number; x?: number; k?: string }) {
  const H = [0.225, 0.2, 0.085], al = lerp(1, 0.06, x);
  return (
    <Entity key={k} transform={at(p, ry)}>
      <Mesh3d name={k + "s"} transform={Transform.fromXyz(0, 0.2, 0)}><Cuboid half_size={H as any} />{x > 0 ? <StandardMaterial base_color={Srgba.hex("#c8202a").with_alpha(al)} alpha_mode="Blend" perceptual_roughness={0.3} /> : <StandardMaterial base_color="#b81d26" perceptual_roughness={0.38} />}</Mesh3d>
      {x < 0.98 ? <Mesh3d name={k + "f"} transform={Transform.fromXyz(0, 0.2, 0.0856)}><Cuboid half_size={[0.225, 0.2, 0.0012]} />{x > 0 ? <StandardMaterial base_color={Srgba.hex("#ffffff").with_alpha(1 - x)} alpha_mode="Blend" base_color_texture={TX("../bag_front")} perceptual_roughness={0.34} /> : <StandardMaterial base_color_texture={TX("../bag_front")} perceptual_roughness={0.34} />}</Mesh3d> : null}
      {x < 0.5 ? <Mesh3d name={k + "t"} transform={Transform.fromXyz(0, 0.401, 0)}><Cuboid half_size={[0.21, 0.001, 0.072]} /><StandardMaterial base_color="#3a0a0d" perceptual_roughness={0.9} /></Mesh3d> : null}
      {x > 0.02 ? [0, 1, 2].flatMap((ax) => [-1, 1].flatMap((a) => [-1, 1].map((b) => { const o = [0, 0.2, 0]; const idx = [0, 1, 2].filter((i) => i !== ax); o[idx[0]] += a * H[idx[0]]; o[idx[1]] += b * H[idx[1]];
        const hs = [0.0016, 0.0016, 0.0016]; hs[ax] = H[ax];
        return <Mesh3d key={"e" + ax + a + b} name={k + "e" + ax + a + b} transform={Transform.fromXyz(o[0], o[1], o[2])}><Cuboid half_size={hs as any} /><StandardMaterial base_color={RED} emissive={glow(HOT, 3 * x)} /></Mesh3d>; }))) : null}
      <Mesh3d shape={so().handle} transform={Transform.fromXyz(0, 0.395, -0.078)}><StandardMaterial base_color={RED} perceptual_roughness={0.6} /></Mesh3d>
      {x > 0.5 ? <Mesh3d name={k + "h2"} shape={so().handle} transform={Transform.fromXyz(0, 0.395, 0.078)}><StandardMaterial base_color={RED} perceptual_roughness={0.6} /></Mesh3d> : null}
    </Entity>
  );
}
// a flat card with a picture (tags, pages, displays); children ride on it in the card's own x/y (underlines)
function Card({ p, size, tex, rx = 0, ry = 0, rz = 0, em = 0, sc = 1, k, children }: { p: number[]; size: number[]; tex: string; rx?: number; ry?: number; rz?: number; em?: number; sc?: number; k: string; children?: any }) {
  return (
    <Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromEuler("YXZ", ry, rx, rz)).withScale([sc, sc, sc])}>
      <Mesh3d name={k}><Cuboid half_size={[size[0] / 2, size[1] / 2, 0.0012]} />
        <StandardMaterial base_color_texture={TX(tex)} emissive={glow("#ffffff", em)} emissive_texture={TX(tex)} perceptual_roughness={0.75} /></Mesh3d>
      {children}
    </Entity>
  );
}
// a red line that draws on from the left, on a card: u0..u1 and v are fractions of the card's picture
function Under({ size, u0, u1, v, a, k }: { size: number[]; u0: number; u1: number; v: number; a: number; k: string }) {
  const len = (u1 - u0) * size[0], x0 = (u0 - 0.5) * size[0];
  return <Mesh3d name={k} transform={Transform.fromXyz(x0 + (len * Math.max(a, 0.001)) / 2, (0.5 - v) * size[1], 0.0016).withScale([Math.max(a, 0.001), 1, 1])}><Cuboid half_size={[len / 2, 0.0014, 0.0003]} /><StandardMaterial base_color={RED} emissive={glow(HOT, 2.2)} /></Mesh3d>;
}

// ================= EX39 — KK Mart vs 7-Eleven vs FamilyMart. Time hangs on the spoken words (tl.json) =================
const FPS = 30, OFF = 0, RFPS = 30, HUD = false;     // HUD: setup number + timecode (animatic only)
const CAPS = (TL as any).caps as { L: string; w: string; key: boolean; t: number }[];
const DUR = (TL as any).dur as number, FRAMES = Math.round(DUR * RFPS);
const W = (i: number) => CAPS[i].t;
let T = 0;
const lin = (a: number, b: number) => cl((T - a) / (b - a));
const sm = (a: number, b: number) => ss(T, a, b);
const on = (i: number, d = 0.3, off = 0) => ss(T, W(i) + off, W(i) + off + d);
// setup k (1-based) runs ST[k-1] .. ST[k]   (word indices: see episode.md § Shot list v1)
const ST = [0, W(5) - 0.1, W(9) - 0.05, W(13) - 0.05, W(16), W(23) - 0.1, W(24), W(26) - 0.05, W(31), W(45), W(50) - 0.1, W(52), W(56) - 0.1, W(63), W(68), W(73) - 0.05, W(79) - 0.05, W(89) - 0.05, W(95) - 0.05, W(107), W(111) + 0.45, DUR];
const NSET = ST.length - 1;
const mixHex = (a: string, b: string, u: number) => { const h = (s: string, i: number) => parseInt(s.slice(1 + i * 2, 3 + i * 2), 16); return "#" + [0, 1, 2].map((i) => Math.round(lerp(h(a, i), h(b, i), u)).toString(16).padStart(2, "0")).join(""); };

// ================= parts =================
const CY = 0.9;
const dark = (c = "#1c1e22", r = 0.42) => <StandardMaterial base_color={c} perceptual_roughness={r} />;
function Slab({ p, half, c, r, k }: { p: number[]; half: number[]; c?: string; r?: number; k: string }) {
  return <Mesh3d key={k} transform={Transform.fromXyz(p[0], p[1] - half[1], p[2])}><Cuboid half_size={half as any} />{dark(c, r)}</Mesh3d>;
}
// a bundle of notes: paper-edge sides, a note on top, a paper band (red = KK, the money that stays)
const BW = 0.145, BD = 0.068, BH = 0.012;
function Bundle({ p, ry = 0, kk = false, k, sc = 1, heat = 0 }: { p: number[]; ry?: number; kk?: boolean; k: string; sc?: number; heat?: number }) {
  return (
    <Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(rotY(ry)).withScale([sc, sc, sc])}>
      <Mesh3d name={k + "b"} transform={Transform.fromXyz(0, BH / 2, 0)}><Cuboid half_size={[BW / 2, BH / 2 - 0.0004, BD / 2]} /><StandardMaterial base_color_texture={TX("bundle_side")} perceptual_roughness={0.85} /></Mesh3d>
      <Mesh3d name={k + "t"} transform={Transform.fromXyz(0, BH - 0.0003, 0).withRotation(Quat.fromEuler("XYZ", -Math.PI / 2, 0, 0))}><Cuboid half_size={[BW / 2, BD / 2, 0.0003]} /><StandardMaterial base_color_texture={TX(kk ? "note_rm1_kk" : "note_rm1")} perceptual_roughness={0.8} /></Mesh3d>
      <Mesh3d name={k + "w"} transform={Transform.fromXyz(-0.02, BH / 2, 0)}><Cuboid half_size={[0.013, BH / 2 + 0.0006, BD / 2 + 0.0006]} /><StandardMaterial base_color={kk ? RED : "#9a9ea4"} emissive={kk ? glow(HOT, 0.25 + 1.6 * heat) : glow("#000000", 0)} perceptual_roughness={0.6} /></Mesh3d>
    </Entity>
  );
}
// a pile: layers of 2 bundles side by side, alternate layers turned 90° (a square footprint); n may be fractional (top bundle still dropping)
function Pile({ p, n, kk = false, k, heat = 0, sink = 0, total }: { p: number[]; n: number; kk?: boolean; k: string; heat?: number; sink?: number; total?: number }) {
  const P: any[] = [], full = Math.floor(n + 1e-6), fr = n - full, N = Math.min(total ?? 99, full + (fr > 0.02 ? 1 : 0));
  for (let i = 0; i < N; i++) { const L = Math.floor(i / 2), a = (i % 2) - 0.5, rot = L % 2 === 1, o = a * (BD + 0.003);
    const drop = i === full ? (1 - fr) * (1 - fr) * 0.06 : 0, y = p[1] + L * (BH + 0.0004) + drop - sink;
    if (y < p[1] - BH * 0.98) continue;
    P.push(<Bundle key={k + i} k={k + i} p={[p[0] + (rot ? o : 0) + (rnd(i + 3) - 0.5) * 0.003, y, p[2] + (rot ? 0 : o) + (rnd(i + 9) - 0.5) * 0.003]} ry={(rot ? Math.PI / 2 : 0) + (rnd(i) - 0.5) * 0.05} kk={kk} heat={heat} />); }
  return <>{P}</>;
}
// receipt lying on the counter (picture 640×1100)
const RC = [0.084, 0.144];
function Receipt({ p, tex, ry = 0, k, rx = -Math.PI / 2, sc = 1 }: { p: number[]; tex: string; ry?: number; k: string; rx?: number; sc?: number }) {
  return <Card k={k} p={p} size={RC} tex={tex} rx={rx} ry={ry} em={0.18} sc={sc} />;
}
// a drink can: shell (goes x-ray), lid, label
function Can({ p, x = 0, k }: { p: number[]; x?: number; k: string }) {
  const al = lerp(1, 0.12, x);
  return (
    <Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(rotY(0.3))}>
      <Mesh3d name={k + "s"} transform={Transform.fromXyz(0, 0.061, 0)}><Cylinder radius={0.033} half_height={0.061} />
        {x > 0 ? <StandardMaterial base_color={Srgba.hex("#ffffff").with_alpha(al)} alpha_mode="Blend" base_color_texture={TX("can")} perceptual_roughness={0.3} metallic={0.3} /> : <StandardMaterial base_color_texture={TX("can")} perceptual_roughness={0.3} metallic={0.35} />}</Mesh3d>
      <Mesh3d name={k + "l"} transform={Transform.fromXyz(0, 0.1235, 0)}><Cylinder radius={0.029} half_height={0.0015} /><StandardMaterial base_color={x > 0 ? Srgba.hex("#c9ccd1").with_alpha(al) : "#c9ccd1"} alpha_mode={x > 0 ? "Blend" : "Opaque"} metallic={0.6} perceptual_roughness={0.25} /></Mesh3d>
      {x > 0.02 ? [0, 0.122].map((y) => <Mesh3d key={k + "r" + y} name={k + "r" + y} transform={Transform.fromXyz(0, y, 0)}><Cylinder radius={0.0335} half_height={0.0008} /><StandardMaterial base_color="#e9e6dd" emissive={glow("#ffffff", 1.4 * x)} /></Mesh3d>) : null}
    </Entity>
  );
}

// ================= sets =================
const PK = [-0.11, CY, -0.04], P7 = [0.11, CY, -0.04];            // the two piles on the counter
const CK = [-0.065, CY, 0.2], C7 = [0.065, CY, 0.2];                // the two cans (setups 8–9)
const NK = [-0.08, CY + 0.001, 0.27], N7 = [0.08, CY + 0.001, 0.27]; // the RM1 notes (19–21)
const kkN = () => 36, seN = () => 12;
function CounterSet({ n }: { n: number }) {
  const P: any[] = [];
  P.push(<Slab key="ct" k="ct" p={[0, CY, 0]} half={[3, 0.02, 1.1]} c="#24262b" r={0.38} />);
  P.push(<Slab key="fl" k="fl" p={[0, 0, 0]} half={[9, 0.02, 7]} c="#101114" r={0.6} />);
  P.push(<Mesh3d key="bw" transform={Transform.fromXyz(0, 1.5, -2.6)}><Cuboid half_size={[9, 2.2, 0.02]} />{dark("#17181c", 0.9)}</Mesh3d>);
  // a chiller wall behind, out of focus: shelves, bottles, lit edge strips
  for (const y of [0.55, 0.95, 1.35, 1.75]) {
    P.push(<Slab key={"cs" + y} k={"cs" + y} p={[0, y, -2.25]} half={[2.6, 0.01, 0.22]} c="#2a2c31" />);
    P.push(<Mesh3d key={"cl" + y} transform={Transform.fromXyz(0, y + 0.012, -2.03)}><Cuboid half_size={[2.6, 0.004, 0.003]} /><StandardMaterial base_color="#dfe6f2" emissive={glow("#dfe6f2", 1.6)} /></Mesh3d>);
    for (let i = 0; i < 26; i++) P.push(<Mesh3d key={"cb" + y + i} transform={Transform.fromXyz(-2.5 + i * 0.2, y + 0.11, -2.2)}><Cylinder radius={0.035} half_height={0.1} /><StandardMaterial base_color={["#7d8187", "#a9acb1", "#5f6369", "#c4c6c9"][(i * 3 + Math.round(y * 10)) % 4]} perceptual_roughness={0.35} /></Mesh3d>);
  }
  // the two piles. 1–3: they grow; 10–12: 7-Eleven's drains through the counter
  const gk = n === 1 ? 32 + 4 * on(3, 0.35) : n === 2 ? 36 : 36;
  const g7 = n <= 2 ? 11 : n === 3 ? lerp(11, 12, on(11, 0.3)) : 12;
  const sink = n === 10 ? 0.06 * lin(W(47), ST[10] + 0.4) : n === 11 || n === 12 ? lerp(0.06, 0.1, lin(ST[10], ST[12])) : 0;
  P.push(<Pile key="pk" k="pk" p={PK} n={gk} kk heat={n === 2 ? on(5, 0.5) : n === 19 ? on(105, 0.35) : 0} />);
  if (g7 > 0.01) P.push(<Pile key="p7" k="p7" p={P7} n={g7} sink={sink} total={12} />);
  P.push(<Receipt key="rk" k="rk" p={[PK[0] - 0.03, CY + 0.0015, PK[2] + 0.16]} tex="rc_kk" ry={0.1} />);
  P.push(<Receipt key="r7" k="r7" p={[P7[0] + 0.03, CY + 0.0015, P7[2] + 0.16]} tex="rc_7e" ry={-0.1} />);
  // 8–9 the cans: same can, same price; x-ray shows the coins each keeps at the till
  if (n === 8 || n === 9) {
    const xr = n === 9 ? on(35, 0.35) : 0, u = n === 8 ? on(27, 0.4, -0.3) : 1;
    for (const [c, kk] of [[CK, true], [C7, false]] as [number[], boolean][]) {
      P.push(<Entity key={"ce" + kk} transform={Transform.fromXyz(c[0], c[1], c[2]).withScale([Math.max(0.001, u), Math.max(0.001, u), Math.max(0.001, u)])}><Can k={"can" + kk} p={[0, 0, 0]} x={xr} /></Entity>);
      P.push(<Card key={"pt" + kk} k={"pt" + kk} p={[c[0], CY + 0.0015, c[2] + 0.075]} size={[0.06, 0.04]} tex="price" rx={-Math.PI / 2} em={0.3} sc={Math.max(0.001, u)} />);
      if (xr > 0.02) P.push(<Coins key={"cc" + kk} k={"cc" + kk} p={[c[0], CY + 0.004, c[2]]} n={(kk ? 13 : 14) * lin(W(36), W(39) + 0.2)} total={kk ? 13 : 14} hot={0} />);
    }
  }
  // 11: two cost tags stand up beside the draining pile, on their words
  if (n === 11 || n === 12) {
    const a = n === 11 ? on(50, 0.35, -0.15) : 1, b = n === 11 ? on(51, 0.35, -0.15) : 1;
    P.push(<Card key="trent" k="trent" p={[P7[0] + 0.04, CY + 0.032 * a, P7[2] + 0.16]} size={[0.11, 0.055]} tex="t_rent" rx={lerp(-Math.PI / 2, -0.35, a)} ry={-0.5} em={0.25} />);
    P.push(<Entity key="mt" transform={Transform.fromXyz(P7[0] + 0.15, CY, P7[2] + 0.12).withRotation(Quat.fromEuler("YXZ", -0.35, lerp(-Math.PI / 2, -0.15, b), 0))}>
      <Mesh3d name="mtb" transform={Transform.fromXyz(0, 0.04, -0.012)}><Cuboid half_size={[0.055, 0.04, 0.012]} />{dark("#2a2c31", 0.5)}</Mesh3d>
      <Card k="mtf" p={[0, 0.045, 0.0005]} size={[0.08, 0.05]} tex="meter" em={0.9 * b} /></Entity>);
  }
  // 19–21 the RM1 notes: they split; 6 sen (KK, red) and 1 sen (7-Eleven) lift out
  if (n >= 19) {
    const NOTEW = 0.12, NOTEH = 0.0552;
    const note = (c: number[], keep: number, cut: number, lift: number, kk: boolean, k: string) => {
      const x0 = c[0] - NOTEW / 2, sw = NOTEW / 100, nk = Math.round(keep * 100), out: any[] = [];
      out.push(<Card key={k + "m"} k={k + "m"} p={[c[0] - (nk * sw * lift) / 2, c[1], c[2]]} size={[NOTEW * (1 - keep * lift), NOTEH]} tex={kk ? "note_rm1_kk" : "note_rm1"} rx={-Math.PI / 2} em={0.08} />);
      if (cut > 0.01) for (let i = 1; i < 100; i += 3) out.push(<Mesh3d key={k + "c" + i} name={k + "c" + i} transform={Transform.fromXyz(x0 + i * sw, c[1] + 0.0013, c[2]).withScale([1, 1, Math.max(0.001, cut)])}><Cuboid half_size={[0.00012, 0.0001, NOTEH / 2]} /><StandardMaterial base_color="#3a3c41" /></Mesh3d>);
      if (lift > 0.01) for (let j = 0; j < nk; j++) { const xs = x0 + NOTEW - (nk - j - 0.5) * sw + 0.004;
        out.push(<Mesh3d key={k + "s" + j} name={k + "s" + j} transform={Transform.fromXyz(xs + j * 0.0025 * lift, c[1] + 0.001 + lift * (0.02 + j * 0.002), c[2])}><Cuboid half_size={[sw / 2 - 0.00005, 0.0004, NOTEH / 2]} /><StandardMaterial base_color={kk ? RED : "#d9dce0"} emissive={kk ? glow(HOT, 2.2 * lift) : glow("#ffffff", 0.5 * lift)} /></Mesh3d>); }
      return out;
    };
    const kc = n === 19 ? on(103, 0.3) : 1, kl = n === 19 ? on(105, 0.4, -0.1) : 1, sc_ = n === 20 ? on(108, 0.3, 0.3) : n > 20 ? 1 : 0, sl = n === 20 ? on(110, 0.4, -0.1) : n > 20 ? 1 : 0;
    P.push(...note(NK, 0.06, kc, kl, true, "nk"), ...note(N7, 0.01, sc_, sl, false, "n7"));
  }
  return <>{P}</>;
}
function CounterLights({ n }: { n: number }) {
  return (<>
    <RectLight transform={Transform.fromXyz(0, CY + 1.1, 0.5).lookingAt([0, CY, 0])} intensity={46000} width={1.6} height={1.0} color="#fff3e2" range={5} />
    <SpotLight transform={Transform.fromXyz(0.7, CY + 1.0, 0.9).lookingAt([0.0, CY + 0.05, 0.05])} intensity={15000} outer_angle={0.6} inner_angle={0.1} color="#fff1dc" shadow_maps_enabled range={5} />
    <RectLight transform={Transform.fromXyz(0, 2.6, -1.0).lookingAt([0, 1.1, -2.2])} intensity={16000} width={5} height={0.5} color="#aebbd4" range={6} />
    <PointLight transform={Transform.fromXyz(PK[0], CY + 0.16, PK[2] + 0.1)} intensity={n <= 3 || n === 19 || n === 21 ? 260 : 120} color={HOT} range={0.5} />
  </>);
}
const V1 = [20, 0, 0], V2 = [-20, 0, 0];
function Void({ o, children, key2, spill }: { o: number[]; children?: any; key2: string; spill?: number[] }) {
  return (<>
    <Slab k={key2 + "f"} p={[o[0], 0, o[2]]} half={[6, 0.02, 6]} c="#30333a" r={0.5} />
    {spill ? <PointLight transform={Transform.fromXyz(spill[0], spill[1], spill[2])} intensity={spill[3] ?? 500} color={HOT} range={0.7} /> : null}
    <RectLight transform={Transform.fromXyz(o[0] + 0.15, 1.3, o[2] + 0.5).lookingAt([o[0], 0, o[2]])} intensity={52000} width={1.6} height={1.0} color="#fff3e2" range={5} />
    <SpotLight transform={Transform.fromXyz(o[0] + 0.7, 1.1, o[2] + 0.9).lookingAt([o[0], 0.05, o[2]])} intensity={15000} outer_angle={0.6} inner_angle={0.1} color="#fff1dc" shadow_maps_enabled range={5} />
    {children}
  </>);
}
// 4: KK's pile (9 layers) splits into three piles of 3 layers = 7-Eleven's height; 5: they shrink to two map markers
function SplitPiles({ n }: { n: number }) {
  const u = n === 4 ? on(13, 0.6, 0.05) : 1, gone = n === 5 ? 0.75 * sm(W(17), W(21)) : 0, P: any[] = [];
  for (let g = 0; g < 3; g++) { const gx = (g - 1) * 0.17 * u, gy = -g * 6 * (BH + 0.0004) * u, s = Math.max(0.001, 1 - gone);
    P.push(<Entity key={"sg" + g} transform={Transform.fromXyz(V1[0] + gx * s, 0, V1[2]).withScale([s, s, s])}><Pile k={"sp" + g} p={[0, g * 6 * (BH + 0.0004) + gy, 0]} n={12} kk /></Entity>); }
  const ref = n === 4 ? on(13, 0.4, -0.35) : 1;                                  // a grey 7-Eleven pile appears beside them for scale
  P.push(<Entity key="sg7" transform={Transform.fromXyz(V1[0] + 0.39, 0, V1[2] - 0.03).withScale([Math.max(0.001, ref * (1 - gone)), Math.max(0.001, ref * (1 - gone)), Math.max(0.001, ref * (1 - gone))])}><Pile k="sp7" p={[0, 0, 0]} n={12} /></Entity>);
  if (n === 5) for (const [x, c, h] of [[0.02, RED, 0.12], [0.2, "#9ea3ab", 0.12]] as [number, string, number][]) { const d = sm(W(18), W(22));
    P.push(<Entity key={"pin" + x} transform={Transform.fromXyz(V1[0] + x, 0, V1[2] + 0.12).withScale([Math.max(0.001, d), Math.max(0.001, d), Math.max(0.001, d)])}>
      <Mesh3d name={"pin" + x + "s"} transform={Transform.fromXyz(0, h * 0.5, 0)}><Cylinder radius={0.004} half_height={h * 0.5} /><StandardMaterial base_color="#c9ccd1" metallic={0.5} perceptual_roughness={0.3} /></Mesh3d>
      <Mesh3d name={"pin" + x + "h"} transform={Transform.fromXyz(0, h, 0)}><Sphere radius={0.024} /><StandardMaterial base_color={c} emissive={glow(c === RED ? HOT : "#b0b4ba", c === RED ? 1.6 : 0.4)} perceptual_roughness={0.35} /></Mesh3d></Entity>); }
  return <Void o={V1} key2="v1" spill={[V1[0], 0.2, V1[2] + 0.15, 220]}>{P}</Void>;
}
// 18: FamilyMart's pile on its receipt: drops 54 %
function FmPile({ n }: { n: number }) {
  const left = n === 18 ? lerp(12, 5.5, on(93, 0.5, -0.1)) : 5.5, fall = n === 18 ? on(93, 0.6, -0.1) : 1, P: any[] = [];
  P.push(<Pile key="fm" k="fm" p={[V2[0], 0, V2[2]]} n={left} />);
  for (let i = Math.ceil(left); i < 12; i++) if (fall < 0.99) { const L = Math.floor(i / 2); P.push(<Bundle key={"ff" + i} k={"ff" + i} p={[V2[0] + 0.05 * (i % 2 ? 1 : -1) * fall * 4, L * BH - fall * fall * 0.5, V2[2] + 0.05 * fall]} sc={Math.max(0.001, 1 - fall)} />); }
  P.push(<Receipt key="rf" k="rf" p={[V2[0] + 0.01, 0.002, V2[2] + 0.17]} tex="rc_fm" />);
  return <Void o={V2} key2="v2">{P}</Void>;
}
// map of Malaysia: KK dots (red) then 7-Eleven dots (grey) light west to east
const V6 = [-40, 0, 0], MX = (lon: number) => V6[0] + (lon - 109.5) * 0.1, MZ = (lat: number) => -(lat - 4.2) * 0.1;
function MapSet({ kk, se }: { kk: number; se: number }) {
  const A = MAP as any, P: any[] = [<Slab key="mf" k="mf" p={[V6[0], 0, 0]} half={[5, 0.02, 4]} c="#25272c" r={0.85} />];
  (A.border as number[][]).forEach((b, i) => P.push(<Mesh3d key={"mb" + i} transform={Transform.fromXyz(MX(b[0]), 0.001, MZ(b[1]))}><Cuboid half_size={[0.0035, 0.001, 0.0035]} /><StandardMaterial base_color="#4a4d54" emissive={glow("#aab0bb", 1.6)} /></Mesh3d>));
  const dots = (arr: number[][], lit: number, red: boolean, tag: string) => arr.forEach((d, i) => { const u = (d[0] - 99.6) / 19.8; if (u > lit) return;
    P.push(<Mesh3d key={tag + i} name={tag + i} transform={Transform.fromXyz(MX(d[0]) + (red ? 0 : 0.004), red ? 0.005 : 0.003, MZ(d[1]) + (red ? 0 : 0.003))}><Cuboid half_size={red ? [0.0036, 0.003, 0.0036] : [0.003, 0.002, 0.003]} />
      <StandardMaterial base_color={red ? RED : "#dfe3ea"} emissive={red ? glow(HOT, 2.4) : glow("#eef2f8", 1.8)} /></Mesh3d>); });
  dots(A.se, se, false, "se"); dots(A.kk, kk, true, "kk");
  return (<>{P}<RectLight transform={Transform.fromXyz(V6[0], 2.2, 1.2).lookingAt([V6[0], 0, 0])} intensity={90000} width={3} height={1.5} color="#dfe6f2" range={7} /></>);
}
// 12: a field of small lit 7-Eleven shops, every one pulling a coin thread from the pile in the middle
const VF = [0, 0, 40];
function FieldSet() {
  const P: any[] = [<Slab key="ff" k="ff" p={VF} half={[8, 0.02, 8]} c="#1a1c20" r={0.7} />], th = sm(W(53) - 0.2, W(54));
  P.push(<Entity key="fpe" transform={Transform.fromXyz(VF[0], 0, VF[2]).withScale([1.8, 1.8, 1.8])}><Pile k="fp" p={[0, 0, 0]} n={12} /></Entity>);
  let i = 0;
  for (let a = -6; a <= 6; a++) for (let b = -6; b <= 6; b++) { if (Math.abs(a) < 2 && Math.abs(b) < 2) continue; i++;
    const x = VF[0] + a * 0.32 + (rnd(i) - 0.5) * 0.08, z = VF[2] + b * 0.32 + (rnd(i * 3) - 0.5) * 0.08, ry = (rnd(i * 5) - 0.5) * 0.5;
    P.push(<Mesh3d key={"fs" + i} transform={Transform.fromXyz(x, 0.045, z).withRotation(rotY(ry))}><Cuboid half_size={[0.07, 0.045, 0.05]} />{dark("#3a3d43", 0.6)}</Mesh3d>);
    P.push(<Mesh3d key={"fw" + i} transform={Transform.fromXyz(x + Math.sin(ry) * 0.0505, 0.035, z + Math.cos(ry) * 0.0505).withRotation(rotY(ry))}><Cuboid half_size={[0.06, 0.025, 0.001]} /><StandardMaterial base_color="#fff3e2" emissive={glow("#fff3e2", 1.8)} /></Mesh3d>);
    P.push(<Mesh3d key={"fb" + i} transform={Transform.fromXyz(x + Math.sin(ry) * 0.051, 0.078, z + Math.cos(ry) * 0.051).withRotation(rotY(ry))}><Cuboid half_size={[0.07, 0.006, 0.001]} /><StandardMaterial base_color="#ff6e00" emissive={glow("#ff6e00", 0.8)} /></Mesh3d>);
    if (i % 9 === 0 && th > 0.01) { const dx = x - VF[0], dz = z - VF[2], L = Math.hypot(dx, dz) * th;
      P.push(<Mesh3d key={"ft" + i} name={"ft" + i} transform={Transform.fromXyz(VF[0] + (dx / Math.hypot(dx, dz)) * L / 2, 0.004, VF[2] + (dz / Math.hypot(dx, dz)) * L / 2).withRotation(rotY(Math.atan2(dx, dz)))}><Cuboid half_size={[0.0008, 0.0008, Math.max(0.001, L / 2)]} /><StandardMaterial base_color="#c9ccd1" emissive={glow("#e9e6dd", 0.6)} /></Mesh3d>); } }
  return (<>{P}
    <DirectionalLight transform={Transform.fromXyz(VF[0] + 2, 8, VF[2] + 4).lookingAt(VF as any)} illuminance={1700} color="#e9edf3" shadow_maps_enabled soft_shadow_size={3} /></>);
}
// 13–17: a model street of shop lots (EX31's shophouses at 1:10); KK Mart in the middle; night falls in 16
const VS = [0, 0, -20], SHX = [-1.0, -0.5, 0, 0.5, 1.0], SHM = ["shophouse_B", "shophouse_C", "shophouse_B", "shophouse_C", "shophouse_B"], SGN = ["sign_x1", "sign_7e", "sign_kk", "sign_x2", "sign_7e"];
const FZ = VS[2] + 0.255;
const nightOf = (n: number) => (n === 16 ? on(76, 0.6, -0.3) : n === 17 ? 1 : 0);
function StreetSet({ n }: { n: number }) {
  const P: any[] = [<Slab key="sr" k="sr" p={[0, 0, VS[2]]} half={[6, 0.02, 5]} c="#26282d" r={0.55} />, <Slab key="sw" k="sw" p={[0, 0.012, FZ + 0.12]} half={[3, 0.012, 0.12]} c="#3a3d43" r={0.6} />];
  const night = nightOf(n);
  SHX.forEach((x, i) => {
    P.push(<Model key={"sh" + i} src={S(`parts/${SHM[i]}.glb`)} position={[VS[0] + x, 0, VS[2]]} rotation={[0, 0, 0]} scale={[0.1, 0.1, 0.1]} />);
    P.push(<Card key={"sg" + i} k={"sg" + i} p={[VS[0] + x, 0.37, FZ + 0.012]} size={[0.44, 0.0915]} tex={SGN[i]} em={i === 2 ? 0.9 : lerp(0.45, 0.06, night)} />);
    if (i !== 2) { const d = n === 16 ? on(77, 0.5, (i % 2) * 0.12) : n === 17 ? 1 : 0;        // neighbours' shutters roll down
      if (d > 0.01) P.push(<Mesh3d key={"st" + i} name={"st" + i} transform={Transform.fromXyz(VS[0] + x, 0.32 - 0.16 * d, FZ + 0.006)}><Cuboid half_size={[0.2, 0.16 * d, 0.002]} /><StandardMaterial base_color="#55585e" perceptual_roughness={0.6} metallic={0.3} /></Mesh3d>); }
    else { P.push(<Mesh3d key="kkin" transform={Transform.fromXyz(VS[0] + x, 0.16, FZ - 0.12)}><Cuboid half_size={[0.19, 0.15, 0.001]} /><StandardMaterial base_color="#e9e6dd" emissive={glow("#fff3e2", lerp(0.15, 0.6, night))} /></Mesh3d>);
      for (let r = 0; r < 3; r++) for (const y of [0.05, 0.1, 0.15, 0.2]) { P.push(<Mesh3d key={"ks" + r + y} transform={Transform.fromXyz(VS[0] + x - 0.12 + r * 0.12, y, FZ - 0.06 - r * 0.015)}><Cuboid half_size={[0.04, 0.002, 0.03]} />{dark("#3a3d43")}</Mesh3d>);
        for (let q = 0; q < 5; q++) P.push(<Mesh3d key={"kp" + r + y + q} transform={Transform.fromXyz(VS[0] + x - 0.152 + r * 0.12 + q * 0.016, y + 0.012, FZ - 0.05 - r * 0.015)}><Cuboid half_size={[0.006, 0.01, 0.006]} /><StandardMaterial base_color={["#c9ccd1", "#8d9196", "#e9e6dd", "#6d7177"][(q + r) % 4]} perceptual_roughness={0.5} /></Mesh3d>); } }
  });
  // 14: a small rent tag lands on KK's roof; three staff cards, two dim
  if (n === 14 || n === 15) { const a = n === 14 ? on(64, 0.4, -0.25) : 1;
    P.push(<Card key="kr" k="kr" p={[VS[0], 0.955 + (1 - a) * 0.3, VS[2] + 0.05]} size={[0.22, 0.11]} tex="t_kkrent" rx={-Math.PI / 2} em={0.6} sc={Math.max(0.001, a)} />);
    [0, 1, 2].forEach((j) => { const dim = j > 0 ? (n === 14 ? on(66, 0.3, j * 0.12) : 1) : 0;
      P.push(<Card key={"ly" + j} k={"ly" + j} p={[VS[0] - 0.08 + j * 0.08, 0.956, VS[2] - 0.12]} size={[0.06, 0.09]} tex="lanyard" rx={-Math.PI / 2} em={lerp(0.5, 0.0, dim)} sc={lerp(1, 0.75, dim)} />); }); }
  // 15: the same floor plan stamps itself across the road, again and again
  if (n === 15) for (let j = 0; j < 12; j++) { const u = sm(W(69) - 0.1 + j * 0.07, W(69) + 0.15 + j * 0.07); if (u < 0.01) continue;
    const px = VS[0] - 1.1 + (j % 6) * 0.44, pz = FZ + 0.55 + Math.floor(j / 6) * 0.62, sc = lerp(1.25, 1, u), yy = 0.026 + (1 - u) * 0.05;
    P.push(<Entity key={"pl" + j} transform={Transform.fromXyz(px, yy, pz).withScale([sc, Math.max(0.001, u), sc])}>
      <Mesh3d name={"plf" + j}><Cuboid half_size={[0.16, 0.002, 0.24]} />{dark("#2b2e34", 0.6)}</Mesh3d>
      {[[-0.16, 0, 0.002, 0.24], [0.16, 0, 0.002, 0.24], [0, -0.24, 0.16, 0.002]].map((w, q) => <Mesh3d key={"plw" + j + q} name={"plw" + j + q} transform={Transform.fromXyz(w[0], 0.02, w[1])}><Cuboid half_size={[Math.max(w[2], 0.002), 0.02, Math.max(w[3], 0.002)]} /><StandardMaterial base_color="#d9d6ce" perceptual_roughness={0.6} /></Mesh3d>)}
      {[0, 1, 2, 3].map((q) => <Mesh3d key={"pls" + j + q} name={"pls" + j + q} transform={Transform.fromXyz(0.04, 0.014, -0.16 + q * 0.1)}><Cuboid half_size={[0.08, 0.012, 0.016]} /><StandardMaterial base_color="#8d9196" perceptual_roughness={0.5} /></Mesh3d>)}
      <Mesh3d name={"plc" + j} transform={Transform.fromXyz(-0.1, 0.012, 0.17)}><Cuboid half_size={[0.045, 0.012, 0.025]} /><StandardMaterial base_color={RED} emissive={glow(HOT, 0.6)} /></Mesh3d>
    </Entity>); }
  // 16–17: a 24-hour clock on KK's pillar; the night half fills red
  if (n >= 16) { const cx = VS[0] + 0.21, cy = 0.2, cz = FZ + 0.03, fill = n === 17 ? lin(W(84) - 0.1, W(88) + 0.1) : 0, hand = 22 + 12 * fill;
    P.push(<Mesh3d key="ckr" transform={Transform.fromXyz(cx, cy, cz - 0.004).withRotation(Quat.fromEuler("XYZ", Math.PI / 2, 0, 0))}><Cylinder radius={0.039} half_height={0.005} /><StandardMaterial base_color="#1d1f23" metallic={0.5} perceptual_roughness={0.3} /></Mesh3d>);
    P.push(<Card key="ck" k="ck" p={[cx, cy, cz + 0.0015]} size={[0.07, 0.07]} tex="clock" em={0.12} />);
    for (let h = 0; h < 12; h++) { const lit = fill * 12 > h, a = ((22 + h + 0.5) * 15 * Math.PI) / 180;
      if (lit) P.push(<Mesh3d key={"cr" + h} name={"cr" + h} transform={Transform.fromXyz(cx + Math.sin(a) * 0.03, cy + Math.cos(a) * 0.03, cz + 0.0035).withRotation(Quat.fromEuler("XYZ", 0, 0, -a))}><Cuboid half_size={[0.0075, 0.0035, 0.0006]} /><StandardMaterial base_color={RED} emissive={glow(HOT, 1.1)} /></Mesh3d>); }
    const ha = (hand * 15 * Math.PI) / 180;
    P.push(<Mesh3d key="hd" transform={Transform.fromXyz(cx + Math.sin(ha) * 0.008, cy + Math.cos(ha) * 0.008, cz + 0.004).withRotation(Quat.fromEuler("XYZ", 0, 0, -ha))}><Cuboid half_size={[0.0012, 0.009, 0.0006]} /><StandardMaterial base_color="#17181b" /></Mesh3d>); }
  return (<>{P}
    <DirectionalLight transform={Transform.fromXyz(VS[0] + 2, 6, VS[2] + 5).lookingAt(VS as any)} illuminance={lerp(2600, 250, night)} color={mixHex("#fff3e2", "#7d8db0", night)} shadow_maps_enabled soft_shadow_size={3} />
    <PointLight transform={Transform.fromXyz(VS[0], 0.2, FZ + 0.25)} intensity={lerp(300, 650, night)} color="#f1efe9" range={1.0} />
    <PointLight transform={Transform.fromXyz(VS[0], 0.4, FZ + 0.1)} intensity={(60 + 120 * night) * (n >= 16 ? 0 : 1)} color={HOT} range={0.4} /></>);
}

// ================= the 21 setups =================
type Pose = { p: number[]; l: number[] };
type Tag = { at: number[]; x: number; y: number; cap: string; big?: string; sub?: string; t: number };
type Setup = { set: string; a: Pose; b: Pose; fov?: number; fs?: number; up?: number[]; tr?: "in" | "out" | "side"; fd?: () => number | null; tags?: Tag[];
  count?: { v: () => string; unit: string; t?: number }; note?: string; src?: string };
const fromT = (l: number[], dir: number[], d: number) => { const k = Math.hypot(dir[0], dir[1], dir[2]); return [l[0] + (dir[0] / k) * d, l[1] + (dir[1] / k) * d, l[2] + (dir[2] / k) * d]; };
const dist3 = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const C = (p: number[], l: number[]): Pose => ({ p, l });
const num = (a: number, b: number, t0: number, t1: number, d = 0) => lerp(a, b, cl((T - t0) / (t1 - t0))).toFixed(d);
const rm = (a: number, b: number, t0: number, t1: number) => "RM" + num(a, b, t0, t1) + "m";
const thou = (a: number, b: number, t0: number, t1: number) => Math.round(lerp(a, b, cl((T - t0) / (t1 - t0)))).toLocaleString("en-US");
const MID = [0, CY + 0.02, 0.04], LK = [PK[0], CY + 0.06, PK[2]], L7 = [P7[0], CY + 0.03, P7[2]];
const P1A = C(fromT(MID, [0.06, 0.42, 1], 1.4), MID);
const SRC1 = "KK Mart prospectus · 7-Eleven 4Q25 report";
const SETUPS: Setup[] = [
  /* 1 */ { set: "c", a: P1A, b: C(fromT(MID, [0.1, 0.42, 1], 1.3), MID), fov: 30, fs: 4, src: SRC1 },
  /* 2 */ { set: "c", a: C(fromT(LK, [-0.35, 0.25, 1], 0.62), LK), b: C(fromT([PK[0], CY + 0.09, PK[2]], [-0.25, 0.45, 1], 0.6), [PK[0], CY + 0.08, PK[2]]), fov: 26, fs: 2.4, src: SRC1,
            count: { v: () => rm(0, 97, W(5) - 0.2, W(6) + 0.1), unit: "KK Mart net profit, FY2025", t: W(5) - 0.25 } },
  /* 3 */ { set: "c", a: C(fromT(L7, [1, 0.06, 0.25], 0.72), L7), b: C(fromT(L7, [1, 0.04, 0.05], 0.66), L7), fov: 26, fs: 2.4, src: SRC1,
            count: { v: () => rm(0, 32, W(10) - 0.1, W(11) + 0.15), unit: "7-Eleven net profit, FY2025", t: W(9) }, note: "financial years end in June (KK Mart) and December (7-Eleven)" },
  /* 4 */ { set: "v1", tr: "out", a: C([V1[0] + 0.1, 0.8, 2.0], [V1[0] + 0.07, 0.05, -0.02]), b: C([V1[0] + 0.12, 0.88, 2.2], [V1[0] + 0.07, 0.05, -0.02]), fov: 26, fs: 5.6,
            tags: [{ at: [V1[0] - 0.17, 0.09, 0], x: 70, y: 1330, cap: "KK MART", big: "× 3", sub: "three 7-Eleven-sized piles", t: W(14) }, { at: [V1[0] + 0.39, 0.09, -0.03], x: 640, y: 1330, cap: "7-ELEVEN", big: "RM32m", t: W(13) + 0.1 }] },
  /* 5 */ { set: "v1", a: C([V1[0] + 0.1, 0.5, 1.2], [V1[0] + 0.1, 0.06, 0.08]), b: C([V1[0] + 0.1, 1.0, 1.1], [V1[0] + 0.1, 0.03, 0.08]), fov: 30, fs: 8 },
  /* 6 */ { set: "m", tr: "out", a: C([MX(102.05), 1.75, MZ(4.0) + 0.001], [MX(102.05), 0, MZ(4.0)]), b: C([MX(102.05), 1.6, MZ(4.0) + 0.001], [MX(102.05), 0, MZ(4.0)]), up: [0, 0, -1], fov: 34, fs: 11, src: "store counts: KK Mart prospectus (996, Feb 2026) · 7-Eleven 4Q25 report (2,735)",
            count: { v: () => "~" + thou(0, 1000, W(23) - 0.3, W(23) + 0.35), unit: "KK Mart stores (996)" }, note: "one dot = one store · positions are illustrative" },
  /* 7 */ { set: "m", a: C([MX(109.2), 4.0, MZ(4.0) + 0.001], [MX(109.2), 0, MZ(4.0)]), b: C([MX(109.2), 4.25, MZ(4.0) + 0.001], [MX(109.2), 0, MZ(4.0)]), up: [-1, 0, -0.12], fov: 34, fs: 11, src: "store counts: KK Mart prospectus (996, Feb 2026) · 7-Eleven 4Q25 report (2,735)",
            count: { v: () => "~" + thou(0, 2700, W(24), W(25) + 0.35), unit: "7-Eleven stores (2,735)" }, note: "one dot = one store · positions are illustrative" },
  /* 8 */ { set: "c", tr: "in", a: C(fromT([0, CY + 0.05, 0.2], [0, 0.2, 1], 0.85), [0, CY + 0.05, 0.2]), b: C(fromT([0, CY + 0.05, 0.2], [0, 0.18, 1], 0.78), [0, CY + 0.05, 0.2]), fov: 30, fs: 4,
            tags: [{ at: [0, CY + 0.004, 0.275], x: 340, y: 1380, cap: "SAME CAN", big: "same price", sub: "an illustration", t: W(29) }] },
  /* 9 */ { set: "c", a: C(fromT([0, CY + 0.05, 0.2], [0.3, 0.75, 0.6], 0.6), [0, CY + 0.03, 0.2]), b: C(fromT([0, CY + 0.05, 0.2], [0.35, 0.8, 0.5], 0.55), [0, CY + 0.03, 0.2]), fov: 26, fs: 5.6, src: "gross margin: 7-Eleven 4Q25 report · KK Mart prospectus",
            tags: [{ at: [C7[0], CY + 0.035, C7[2]], x: 640, y: 1380, cap: "7-ELEVEN, AT THE TILL", big: "30.1%", sub: "gross margin", t: W(36) }, { at: [CK[0], CY + 0.033, CK[2]], x: 70, y: 1380, cap: "KK MART, AT THE TILL", big: "28.8%", sub: "gross margin", t: W(38) }] },
  /* 10 */ { set: "c", a: C(fromT(L7, [0.2, 0.35, 1], 0.75), [P7[0], CY + 0.04, P7[2] + 0.1]), b: C(fromT(L7, [0.35, 0.3, 1], 0.6), L7), fov: 26, fs: 2.8 },
  /* 11 */ { set: "c", a: C(fromT([P7[0] + 0.08, CY + 0.04, P7[2] + 0.1], [0.3, 0.3, 1], 0.62), [P7[0] + 0.08, CY + 0.04, P7[2] + 0.1]), b: C(fromT([P7[0] + 0.08, CY + 0.04, P7[2] + 0.1], [0.45, 0.32, 1], 0.58), [P7[0] + 0.08, CY + 0.04, P7[2] + 0.1]), fov: 30, fs: 4, up: [0.12, 1, 0],
            src: "costs named in 7-Eleven's 4Q25 report" },
  /* 12 */ { set: "f", tr: "out", a: C([VF[0] + 0.5, 0.45, VF[2] + 1.3], [VF[0], 0.05, VF[2]]), b: C([VF[0] + 0.45, 0.85, VF[2] + 1.6], [VF[0], 0.0, VF[2] - 0.2]), fov: 34, fs: 5.6,
            count: { v: () => "~" + thou(0, 2700, W(52), W(54)), unit: "7-Eleven stores to run" }, note: "an illustration" },
  /* 13 */ { set: "s", tr: "side", a: C([VS[0] - 0.35, 0.3, FZ + 2.1], [VS[0], 0.28, FZ]), b: C([VS[0] - 0.12, 0.3, FZ + 1.95], [VS[0], 0.28, FZ]), fov: 30, fs: 5.6, src: "KK Mart prospectus, April 2026",
            note: "KK Mart's own description. Model street: an illustration" },
  /* 14 */ { set: "s", a: C([VS[0] + 0.15, 2.0, VS[2] + 0.9], [VS[0], 0.9, VS[2]]), b: C([VS[0] + 0.05, 2.3, VS[2] + 0.4], [VS[0], 0.9, VS[2]]), fov: 30, fs: 8,
            tags: [{ at: [VS[0], 0.96, VS[2] + 0.05], x: 70, y: 1380, cap: "RENT", big: "non-prime lots", sub: "as KK Mart describes it", t: W(64) }, { at: [VS[0] + 0.08, 0.96, VS[2] - 0.12], x: 640, y: 1380, cap: "FEWER STAFF", t: W(66) }] },
  /* 15 */ { set: "s", a: C([VS[0] + 0.3, 2.2, FZ + 2.2], [VS[0], 0, FZ + 0.85]), b: C([VS[0] + 0.3, 3.0, FZ + 2.0], [VS[0], 0, FZ + 0.85]), fov: 34, fs: 11,
            note: "one standard layout (KK Mart prospectus) · floor plan is an illustration", src: "KK Mart prospectus, April 2026" },
  /* 16 */ { set: "s", tr: "side", a: C([VS[0] + 1.45, 0.02, FZ + 0.8], [VS[0] + 0.05, 0.22, FZ]), b: C([VS[0] + 1.35, 0.025, FZ + 0.75], [VS[0], 0.22, FZ]), fov: 26, fs: 5.6, up: [0.12, 1, 0] },
  /* 17 */ { set: "s", a: C([VS[0] + 0.25, 0.22, FZ + 0.32], [VS[0] + 0.21, 0.2, FZ + 0.03]), b: C([VS[0] + 0.23, 0.205, FZ + 0.25], [VS[0] + 0.21, 0.2, FZ + 0.03]), fov: 26, fs: 2.8, src: "KK Mart prospectus: 50.6% of FY2025 sales",
            count: { v: () => num(0, 50.6, W(84), W(88), 1) + "%", unit: "of KK Mart's sales, 10 p.m.–10 a.m.", t: W(79) } },
  /* 18 */ { set: "v2", tr: "side", a: C([V2[0], 0.3, 1.25], [V2[0], 0.04, 0.06]), b: C([V2[0], 0.28, 1.1], [V2[0], 0.04, 0.06]), fov: 16, fs: 5.6, src: "The Edge, 26–27 Aug 2026",
            count: { v: () => "−" + num(0, 54, W(93), W(94) + 0.2) + "%", unit: "FamilyMart profit before tax, Apr–Jun 2026", t: W(92) }, note: "convenience-store segment of QL Resources, vs a year earlier" },
  /* 19 */ { set: "c", tr: "in", a: C(fromT([NK[0] + 0.035, NK[1], NK[2]], [-0.25, 0.75, 0.6], 0.34), [NK[0] + 0.035, NK[1], NK[2]]), b: C(fromT([NK[0] + 0.035, NK[1], NK[2]], [-0.15, 0.8, 0.55], 0.3), [NK[0] + 0.035, NK[1], NK[2]]), fov: 26, fs: 4, src: "net profit ÷ revenue, FY2025",
            tags: [{ at: [NK[0] + 0.06, CY + 0.03, NK[2]], x: 600, y: 1380, cap: "KK MART KEEPS", big: "about 6 sen", t: W(105) }], note: "RM97.0m ÷ RM1.57b ≈ 6.2% · note is an illustration" },
  /* 20 */ { set: "c", a: C(fromT([N7[0] + 0.04, N7[1], N7[2]], [0.6, 0.35, 0.5], 0.36), [N7[0] + 0.04, N7[1] + 0.01, N7[2]]), b: C(fromT([N7[0] + 0.04, N7[1], N7[2]], [0.7, 0.3, 0.45], 0.32), [N7[0] + 0.04, N7[1] + 0.01, N7[2]]), fov: 30, fs: 4, src: "net profit ÷ revenue, FY2025",
            tags: [{ at: [N7[0] + 0.06, CY + 0.025, N7[2]], x: 70, y: 1380, cap: "7-ELEVEN KEEPS", big: "about 1 sen", t: W(110) }], note: "RM32.4m ÷ RM3.18b ≈ 1.0% · note is an illustration" },
  /* 21 */ { set: "c", a: C(fromT(MID, [0.1, 0.9, 0.7], 1.1), MID), b: P1A, fov: 30, fs: 4 },
];
function World({ n }: { n: number }) {
  const s = SETUPS[n - 1].set;
  if (s === "c") return <><CounterSet n={n} /><CounterLights n={n} /></>;
  if (s === "v1") return <SplitPiles n={n} />;
  if (s === "v2") return <FmPile n={n} />;
  if (s === "m") return <MapSet kk={n === 6 ? lerp(-0.01, 1, lin(W(23) - 0.3, W(23) + 0.35)) : 1} se={n === 6 ? -1 : lerp(-0.01, 1, lin(W(24), W(25) + 0.35))} />;
  if (s === "f") return <FieldSet />;
  return <StreetSet n={n} />;
}

// ================= camera (as EX38: drift inside a setup; flight on the same set; push / pull / slide to another set) =================
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
  const same = (i: number) => i >= 0 && i < NSET - 1 && SETUPS[i].set === SETUPS[i + 1].set;
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

// ================= captions (STUDY-D § 6); EX38 gap fixed: the line eases when it re-centres =================
const FF = "Outfit, 'Inter Display', Inter, 'Helvetica Neue', Arial, sans-serif";
const CT = CAPS.map((c, i) => (i + 1 < CAPS.length && CAPS[i + 1].L === c.L && /^(and|the|at|for|to|of|a|its|it|is|in|on|with)$/i.test(c.w) && W(i + 1) - c.t > 0.3 ? W(i + 1) - 2 / FPS : c.t));
const PH: { i0: number; i1: number; t0: number; t1: number }[] = (() => {
  const g: number[][] = []; let cur: number[] = [];
  CAPS.forEach((c, i) => { cur.push(i); const last = i + 1 >= CAPS.length || CAPS[i + 1].L !== c.L; if (/[.,?:…]$/.test(c.w) || cur.length >= 4 || last) { g.push(cur); cur = []; } });
  const m: number[][] = [];
  for (const x of g) { const pv = m[m.length - 1]; if (pv && x.length === 1 && pv.length <= 4 && CAPS[pv[0]].L === CAPS[x[0]].L && !/[.?]$/.test(CAPS[pv[pv.length - 1]].w)) pv.push(x[0]); else m.push(x); }
  return m.map((x, j) => ({ i0: x[0], i1: x[x.length - 1], t0: CT[x[0]], t1: Math.min(j + 1 < m.length ? CT[m[j + 1][0]] - 2 / FPS : DUR, W(x[x.length - 1]) + 1.1) }));
})();
const CW = (w: string, bold: boolean) => w.length * (bold ? 36 : 33) + 18;                     // rough word width at 66 px
function Caption() {
  const ph = PH.find((p) => T >= p.t0 - 0.001 && T < p.t1); if (!ph) return null;
  const out = cl((ph.t1 - T) * FPS / 3), ws: number[] = []; for (let i = ph.i0; i <= ph.i1; i++) if (T >= CT[i] - 0.001) ws.push(i);
  // ease the re-centre: words sit on a left-aligned run whose offset glides (3 frames) to centre the visible words
  const width = (k: number) => ws.slice(0, k).reduce((a, i) => a + CW(CAPS[i].w, false), 0);
  const prevW = width(ws.length - 1), nowW = width(ws.length), age = cl((T - CT[ws[ws.length - 1]]) * FPS / 3), wNow = lerp(prevW + CW(CAPS[ws[ws.length - 1]].w, false) * 0.35, nowW, ss(age, 0, 1));
  const BL = "#4f8df7";
  return (
    <div style={{ position: "absolute", top: 172, left: 540 - Math.min(940, wNow) / 2, width: 940, textAlign: "left", fontFamily: FF, fontSize: 66, lineHeight: 1.2, letterSpacing: -0.5, whiteSpace: wNow > 940 ? "normal" : "nowrap", opacity: out < 1 ? 0.25 + 0.75 * out * out : 1 }}>
      {ws.map((i, j) => { const c = CAPS[i], f = (T - CT[i]) * FPS, fresh = f < 0.99, curr = j === ws.length - 1, b = f - 1, e = cl((b - 1) / 2), sd = cl(b - 3);
        return (
          <span key={i} style={{ display: "inline-block", position: "relative", margin: "0 9px", padding: c.key ? "0 9px" : "0px", background: `rgba(22,35,60,${c.key ? cl(b - 3) : 0})`, fontWeight: curr && !fresh ? 700 : 300, color: curr && !fresh ? "#ffffff" : "#9a9da4", transform: `translateY(${fresh ? 7 : 0}px)`, filter: `blur(${fresh ? 5 : 0}px)`, opacity: fresh ? 0.7 : 1 }}>
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
const LOGOS = (h: number) => <><img src={S("kk_logo.jpg")} style={{ height: h, borderRadius: 4 }} /><img src={S("se_logo.png")} style={{ height: h * 1.25, borderRadius: 4, background: "#fff" }} /></>;
function Overlay({ n, cam, still }: { n: number; cam: Cam; still?: boolean }) {
  const c = SETUPS[n - 1], t0 = ST[n - 1], t1 = ST[n];
  const life = still ? 1 : fade(t0 + 0.12) * (1 - ss(T, t1 - 0.2, t1 - 0.04));
  const end = n === NSET ? fade(ST[NSET - 1] + 0.15, 0.25) * (1 - sm(DUR - 0.3, DUR - 0.1)) : 0, h0 = n === 1 ? 1 - sm(ST[1] - 0.25, ST[1] - 0.05) : 0;
  const BIG = { position: "absolute", left: 60, top: 1290, fontFamily: FF, fontWeight: 800, fontSize: 80, lineHeight: 1.06, letterSpacing: -1.5, color: "#ffffff", textShadow: "0 2px 18px rgba(0,0,0,0.9)" } as any;
  return (<>
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 470, background: "linear-gradient(#0d0e11 34%, rgba(13,14,17,0))" }} />
    <div style={{ position: "absolute", left: 0, top: 1480, width: 1080, height: 440, background: "linear-gradient(rgba(13,14,17,0), #0d0e11 70%)" }} />
    {c.src ? <div style={{ position: "absolute", left: 60, top: 372, display: "flex", alignItems: "center", gap: 12, fontFamily: FF, fontSize: 27, fontWeight: 400, color: "#d6d8dc", opacity: life * fade(t0 + (n === 1 ? 0.6 : 0.2), 0.3) }}>{LOGOS(30)}<span>{c.src}</span></div> : null}
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
    {c.note ? <div style={{ position: "absolute", left: 60, top: 1630, width: 960, fontFamily: FF, fontSize: 33, fontWeight: 400, color: "#b9bcc2", opacity: life }}>{c.note}</div> : null}
    {h0 > 0.01 ? <div style={{ ...BIG, opacity: h0 }}>
      <div style={{ display: "inline-block", fontSize: 30, fontWeight: 700, letterSpacing: 5, color: "#0d0e11", background: "#ffffff", padding: "6px 14px", borderRadius: 6, marginBottom: 18, textShadow: "none" }}>HARI 2/30</div><br />
      <span style={{ color: HOT }}>RM97 million</span> vs<br />RM32 million.<br />Fewer shops.</div> : null}
    {end > 0.01 ? <div style={{ ...BIG, top: 1400, opacity: end, transform: `translateY(${(1 - end) * 14}px)` }}>7-Eleven or<br /><span style={{ color: HOT }}>KK Mart</span>:<br />which is yours?</div> : null}
  </>);
}
const FACE = `@font-face { font-family: "Outfit"; src: url(${S("fonts/Outfit.ttf")}); font-weight: 100 900; }`;
function Frame({ n, cam, dk, still, fast }: { n: number; cam: Cam; dk: number; still?: boolean; fast?: boolean }) {
  const d = dist3(cam.p, cam.l), nightAmb = SETUPS[n - 1].set === "s" ? lerp(1, 0.35, nightOf(n)) : 1;
  return (
    <AbsoluteFill style={{ background: BG }}>
      <style>{FACE}</style>
      <Camera3d transform={Transform.fromXyz(cam.p[0], cam.p[1], cam.p[2]).lookingAt(cam.l as any, cam.up as any)} projection={{ Perspective: { fov: (cam.fov * Math.PI) / 180 } }}>
        <DepthOfField focal_distance={cam.fd} aperture_f_stops={cam.fs} mode="Gaussian" max_circle_of_confusion_diameter={lerp(14, 48, ss(d, 0.55, 0.95))} />
      </Camera3d>
      {fast ? <MotionBlur shutterAngle={1} samples={6} /> : null}
      <Bloom intensity={0.7} threshold={0.9} />
      <ToneMapping mode="aces" exposure={0.42} />
      <AmbientLight brightness={110 * nightAmb} color="#b4bccb" />
      <Environment src={S("sky.hdr")} intensity={0.35 * nightAmb} />
      <World n={n} />
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
const BT = SETUPS.map((_, k) => (k === 0 ? 0.9 : k === NSET - 1 ? DUR - 0.4 : ST[k + 1] - 0.22));
function Board() {
  const k = useCurrentFrame(); T = BT[k];
  return <Frame n={k + 1} cam={camOf(k)} dk={0} still />;
}
registerRoot(() => <><Composition id="film" component={Film} width={1080} height={1920} fps={RFPS} durationInFrames={FRAMES} /><Composition id="board" component={Board} width={1080} height={1920} fps={FPS} durationInFrames={NSET} /><Composition id="cammap" component={CamMap} width={1080} height={1920} fps={FPS} durationInFrames={SETUPS.map((s) => s.set).filter((s, i, a) => a.indexOf(s) === i).length} /></>);

// ================= camera map (review tool, RECIPE-D § 8.1): one page per set, seen from above =================
// Each setup's camera path (start ○ → end ▶, sampled through its drift), a thin line to where it looks, the setup number,
// and a table: time, lens, height and distance start → end, and the move in words. Needs SETUPS, ST, camOf, NSET, dist3.
// Render: raea render film39.tsx --composition cammap -o media/_cm   (one PNG per set)
const SETNAMES: Record<string, string> = { c: "Counter", v1: "Void 1", v2: "Void 2", m: "Map", f: "Field of shops", s: "Street" };
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
