// EX38 kit: shared pieces for the board and the film (assembled into board.tsx / film2.tsx by assemble.py)
import { AbsoluteFill, Composition, registerRoot, staticFile, useCurrentFrame } from "raea";
import { Model, Entity } from "raea/3d";
import { StandardMaterial } from "raea/pbr";
import { Cuboid, Cylinder, Mesh3d, Sphere, manifold, crossSection } from "raea/mesh";
import { AmbientLight, DirectionalLight, Environment, PointLight, SpotLight, RectLight } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
import { Bloom, DepthOfField, MotionBlur, ToneMapping } from "raea/post_process";
import { LinearRgba, Srgba } from "raea/color";
import MAP from "./map.json";
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
