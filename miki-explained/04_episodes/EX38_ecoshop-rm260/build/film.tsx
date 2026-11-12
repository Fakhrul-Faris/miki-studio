// EX38 Eco-Shop RM2.60 — Style D (macro object): one continuous camera through one dark world, a new event on the word.
import { AbsoluteFill, Composition, registerRoot, staticFile, useCurrentFrame } from "raea";
import { Model, Entity } from "raea/3d";
import { StandardMaterial } from "raea/pbr";
import { Cuboid, Cylinder, Mesh3d, Sphere } from "raea/mesh";
import { AmbientLight, PointLight, SpotLight, RectLight } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
import { Bloom, DepthOfField, MotionBlur, ToneMapping } from "raea/post_process";
import { LinearRgba, Srgba } from "raea/color";
import { manifold } from "raea/mesh";
import TL from "./tl.json";

const S = (p: string) => staticFile(p);
const FPS = 60, FRAMES = 3568;
const RED = "#c8202a", BG = "#0d0e11";
const glow = (hex: string, k: number) => LinearRgba.from(Srgba.hex(hex)).mul(k);
const rnd = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const cl = (x: number) => Math.max(0, Math.min(1, x));
const ss = (t: number, a: number, b: number) => { const u = cl((t - a) / (b - a)); return u * u * (3 - 2 * u); };
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
const M = (id: string) => S(`${id}/${id}.gltf`);
const LN = (TL as any).lines as Record<string, { start: number; end: number }>;
const CAPS = (TL as any).caps as { L: string; w: string; key: boolean; t: number; p: number }[];
const DUR = (TL as any).dur as number;
const t0 = (L: string) => LN[L].start;
const wt = (L: string, word: string) => (CAPS.find((c) => c.L === L && c.w.replace(/[.,?]/g, "") === word) ?? { t: LN[L].start }).t;   /* time a word is spoken */

// ---------- places ----------
const CY = 0.9;                                   // counter top
const SIGN = [-0.02, CY + 0.034, 0.36], BOT = [0.17, CY, 0.12], BAG = [0.0, CY, -0.16], BAR = [0.29, CY, 0.2], BOX = [1.05, CY, -0.05];
const SHZ = -1.5, LEVELS = [0.5, 0.95, 1.4, 1.85];
const BRD = [6, 1.6, 0];                          // the board of 462 labels
const COLS = 14, ROWS = 33, PX = 0.125, PY = 0.062;

// ---------- camera: keys joined by a Hermite spline (no stops between keys) ----------
type Key = { t: number; p: number[]; l: number[]; f?: number };
const KEYS: Key[] = [
  { t: 0, p: [0.04, 1.02, 0.9], l: [SIGN[0], CY + 0.04, SIGN[2]] },
  { t: 2.6, p: [0.22, 1.32, 2.25], l: [0.04, 1.1, 0.0] },
  { t: t0("L02") + 2.5, p: [0.0, 1.26, 1.95], l: [0.04, 1.09, 0.05] },
  { t: t0("L03") + 0.9, p: [0.42, 1.14, 1.0], l: [0.17, 1.05, 0.12] },
  { t: wt("L03", "RM2.60") + 0.2, p: [0.16, 1.06, 0.95], l: [-0.02, 0.97, 0.36] },
  { t: wt("L03", "87") + 0.9, p: [0.3, 1.14, 1.42], l: [0.2, 1.04, 0.24] },
  { t: t0("L04") + 1.0, p: [0.3, 1.1, 0.55], l: [0.17, 1.05, 0.12] },
  { t: t0("L05") + 1.6, p: [-0.05, 1.36, 1.5], l: [0.0, 1.2, SHZ], f: 3.0 },
  { t: t0("L05") + 4.6, p: [0.2, 1.4, 1.2], l: [0.15, 1.2, SHZ], f: 2.7 },
  { t: t0("L06") + 1.7, p: [0.8, 1.42, 1.95], l: [1.12, 1.12, -0.05] },
  { t: t0("L06") + 5.2, p: [0.95, 1.36, 1.7], l: [1.12, 1.12, -0.05] },
  { t: t0("L07") + 1.6, p: [0.3, 1.06, 1.05], l: [SIGN[0], CY + 0.04, SIGN[2]] },
  { t: t0("L08") + 0.8, p: [0.06, 1.0, 0.86], l: [SIGN[0], CY + 0.036, SIGN[2]] },
  { t: t0("L09") + 2.0, p: [-0.12, 1.06, 1.0], l: [SIGN[0], CY + 0.06, SIGN[2]] },
  { t: t0("L09") + 5.5, p: [0.1, 1.08, 1.05], l: [SIGN[0], CY + 0.06, SIGN[2]] },
  { t: t0("L09") + 8.6, p: [0.12, 1.03, 0.95], l: [SIGN[0], CY + 0.04, SIGN[2]] },
  { t: t0("L10") + 2.2, p: [0.0, 1.5, 2.7], l: [0.0, 1.2, SHZ], f: 3.6 },
  { t: t0("L11") - 0.5, p: [0.25, 1.52, 2.85], l: [0.2, 1.2, SHZ], f: 3.8 },
  { t: t0("L11") + 0.35, p: [BRD[0], BRD[1], 6.2], l: [BRD[0], BRD[1], 0] },
  { t: t0("L11") + 3.6, p: [BRD[0] + 0.03, BRD[1], 5.6], l: [BRD[0] + 0.0625, BRD[1], 0] },
  { t: DUR, p: [BRD[0] + 0.0625, BRD[1], 0.5], l: [BRD[0] + 0.0625, BRD[1], 0] },
];
const herm = (get: (k: Key) => number, t: number) => {
  const K = KEYS; let i = 0; while (i < K.length - 2 && t > K[i + 1].t) i++;
  const a = K[i], b = K[i + 1], h = b.t - a.t, u = cl((t - a.t) / h);
  const m = (j: number) => { const p = K[Math.max(0, j - 1)], n = K[Math.min(K.length - 1, j + 1)]; return j === 0 || j === K.length - 1 ? 0 : (0.6 * (get(n) - get(p))) / (n.t - p.t); };
  const u2 = u * u, u3 = u2 * u;
  return (2 * u3 - 3 * u2 + 1) * get(a) + (u3 - 2 * u2 + u) * h * m(i) + (-2 * u3 + 3 * u2) * get(b) + (u3 - u2) * h * m(i + 1);
};
const dist = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const cam = (t: number) => {
  const p = [0, 1, 2].map((c) => herm((k) => k.p[c], t)), l = [0, 1, 2].map((c) => herm((k) => k.l[c], t));
  const f = herm((k) => k.f ?? dist(k.p, k.l), t);
  return { p, l, f };
};
const FOV = (30 * Math.PI) / 180;
// world point -> frame pixels (1080 x 1920), for leader lines
const proj = (c: { p: number[]; l: number[] }, w: number[]) => {
  const sub = (a: number[], b: number[]) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a: number[], b: number[]) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const nrm = (a: number[]) => { const n = Math.hypot(a[0], a[1], a[2]); return [a[0] / n, a[1] / n, a[2] / n]; };
  const fw = nrm(sub(c.l, c.p)), rt = nrm(cross(fw, [0, 1, 0])), up = cross(rt, fw), d = sub(w, c.p);
  const z = dot(d, fw), k = 960 / Math.tan(FOV / 2);
  return { x: 540 + (dot(d, rt) / z) * k, y: 960 - (dot(d, up) / z) * k, ok: z > 0.05 };
};

// ---------- solids ----------
let SO: any = null;
const so = () => (SO ??= { handle: manifold.torus(0.085, 0.011).trim(0, 1, 0, 0).scale(1, 1.25, 1) });

// ---------- the world ----------
function World({ T }: { T: number }) {
  const P: any[] = [];
  const dark = <StandardMaterial base_color="#1c1e22" perceptual_roughness={0.42} metallic={0.1} />;
  // counter
  P.push(<Mesh3d key="ct" transform={Transform.fromXyz(0.3, CY - 0.02, 0.1)}><Cuboid half_size={[2.2, 0.02, 0.62]} />{dark}</Mesh3d>);
  P.push(<Mesh3d key="cf" transform={Transform.fromXyz(0.3, CY - 0.5, 0.7)}><Cuboid half_size={[2.2, 0.46, 0.02]} /><StandardMaterial base_color="#141518" perceptual_roughness={0.7} /></Mesh3d>);
  P.push(<Mesh3d key="fl" transform={Transform.fromXyz(0, -0.02, 0)}><Cuboid half_size={[12, 0.02, 8]} /><StandardMaterial base_color="#101114" perceptual_roughness={0.55} /></Mesh3d>);
  P.push(<Mesh3d key="bw" transform={Transform.fromXyz(0, 1.5, SHZ - 0.34)}><Cuboid half_size={[12, 2, 0.02]} /><StandardMaterial base_color="#15161a" perceptual_roughness={0.9} /></Mesh3d>);
  // the bag everyone knows (front panel = the real bag's print)
  P.push(<Entity key="bag" transform={Transform.fromXyz(BAG[0], BAG[1], BAG[2]).withRotation(Quat.fromEuler("XYZ", 0, 0.16, 0))}>
    <Mesh3d transform={Transform.fromXyz(0, 0.2, 0)}><Cuboid half_size={[0.225, 0.2, 0.085]} /><StandardMaterial base_color="#b81d26" perceptual_roughness={0.38} /></Mesh3d>
    <Mesh3d transform={Transform.fromXyz(0, 0.2, 0.0855)}><Cuboid half_size={[0.225, 0.2, 0.0012]} /><StandardMaterial base_color_texture={S("bag_front.png")} perceptual_roughness={0.34} /></Mesh3d>
    <Mesh3d transform={Transform.fromXyz(0, 0.401, 0)}><Cuboid half_size={[0.21, 0.001, 0.072]} /><StandardMaterial base_color="#3a0a0d" perceptual_roughness={0.9} /></Mesh3d>
    <Mesh3d shape={so().handle} transform={Transform.fromXyz(0, 0.395, -0.08)}><StandardMaterial base_color="#c8202a" perceptual_roughness={0.6} /></Mesh3d>
  </Entity>);
  // the bottle
  P.push(<Model key="hero" src={M("multi_cleaner_bottle")} position={[BOT[0], BOT[1], BOT[2]]} rotation={[0, 0.2, 0]} scale={[1.15, 1.15, 1.15]} />);
  // the price sign: three faces, one shown (2.60 / 2.40 / 2.??), flipping by a squash
  const a240 = wt("L08", "RM2.40") - 0.25, b240 = t0("L09") + 0.2, aq = wt("L09", "move") - 0.1, bq = t0("L10") + 0.3;
  const v240 = ss(T, a240, a240 + 0.22) * (1 - ss(T, b240, b240 + 0.22)), vq = ss(T, aq, aq + 0.22) * (1 - ss(T, bq, bq + 0.22));
  const v260 = (1 - ss(T, a240 - 0.2, a240)) + ss(T, b240 + 0.2, b240 + 0.42) * (1 - ss(T, aq - 0.2, aq)) + ss(T, bq + 0.2, bq + 0.42);
  const hot = 1.3 + 1.2 * ss(T, wt("L03", "RM2.60") - 0.2, wt("L03", "RM2.60") + 0.2) * (1 - ss(T, t0("L04"), t0("L04") + 0.5));
  for (const [name, tex, v] of [["s260", "label_rm260.png", v260], ["s240", "label_rm240.png", v240], ["sq", "label_q.png", vq]] as [string, string, number][])
    P.push(<Mesh3d key={name} name={name} transform={Transform.fromXyz(SIGN[0], SIGN[1], SIGN[2]).withRotation(Quat.fromEuler("XYZ", -0.3, 0.12, 0)).withScale([1, Math.max(0.001, v), 1])}>
      <Cuboid half_size={[0.085, 0.032, 0.003]} /><StandardMaterial base_color_texture={S(tex)} emissive={glow("#ffffff", hot)} emissive_texture={S(tex)} perceptual_roughness={0.5} /></Mesh3d>);
  P.push(<Mesh3d key="sfoot" transform={Transform.fromXyz(SIGN[0] - 0.004, CY + 0.004, SIGN[2] - 0.012).withRotation(Quat.fromEuler("XYZ", 0, 0.12, 0))}><Cuboid half_size={[0.085, 0.004, 0.02]} /><StandardMaterial base_color="#2c2e33" perceptual_roughness={0.3} metallic={0.7} /></Mesh3d>);
  // L03: RM2.60 as a 26 cm stack (1 mm a sen): cost of goods below, the 87 sen that stays on top, glowing
  const aBar = wt("L03", "87") - 0.5, bBar = t0("L04") + 0.3, gB = ss(T, aBar, aBar + 0.45) * (1 - ss(T, bBar, bBar + 0.4)), gR = ss(T, aBar + 0.25, aBar + 0.7) * (1 - ss(T, bBar, bBar + 0.4));
  P.push(<Mesh3d key="barG" name="barG" transform={Transform.fromXyz(BAR[0], CY + 0.0865 * gB, BAR[2]).withScale([Math.min(1, gB * 8) + 0.0001, Math.max(0.001, gB), Math.min(1, gB * 8) + 0.0001])}><Cuboid half_size={[0.03, 0.0865, 0.03]} /><StandardMaterial base_color="#9ea3ab" perceptual_roughness={0.5} /></Mesh3d>);
  P.push(<Mesh3d key="barR" name="barR" transform={Transform.fromXyz(BAR[0], CY + 0.173 * gB + 0.0435 * gR, BAR[2]).withScale([Math.min(1, gR * 8) + 0.0001, Math.max(0.001, gR), Math.min(1, gR * 8) + 0.0001])}><Cuboid half_size={[0.03, 0.0435, 0.03]} /><StandardMaterial base_color={RED} emissive={glow(RED, 3.2 * gR)} perceptual_roughness={0.4} /></Mesh3d>);
  // cartons (L06)
  for (const [i, x, y, z, r, sc] of [[0, 0, 0, 0, 0.2, 1.0], [1, 0.5, 0, -0.12, -0.25, 0.9], [2, 0.08, 0.33, -0.03, 0.5, 0.8]] as number[][])
    P.push(<Model key={"bx" + i} src={M("cardboard_box_01")} position={[BOX[0] + x, CY + y, BOX[2] + z]} rotation={[0, r, 0]} scale={[sc, sc, sc]} />);
  // shelves behind: boards, lips, bottles; 6 in 10 of the middle rows are house brands (L05); every lip a red line (L10)
  const g60 = ss(T, wt("L05", "60%") - 0.3, wt("L05", "60%") + 0.5) * (1 - ss(T, t0("L06") + 0.2, t0("L06") + 1.0));
  const gLip = 0.25 + 2.6 * ss(T, wt("L10", "number") - 0.3, wt("L10", "number") + 0.8);
  let n = 0;
  for (const [j, y] of LEVELS.entries()) {
    P.push(<Mesh3d key={"sb" + j} transform={Transform.fromXyz(0, y - 0.015, SHZ - 0.1)}><Cuboid half_size={[3.2, 0.015, 0.24]} /><StandardMaterial base_color="#26282d" perceptual_roughness={0.45} metallic={0.6} /></Mesh3d>);
    P.push(<Mesh3d key={"sl" + j} transform={Transform.fromXyz(0, y - 0.03, SHZ + 0.142)}><Cuboid half_size={[3.2, 0.014, 0.003]} /><StandardMaterial base_color="#3a0c10" emissive={glow(RED, gLip)} perceptual_roughness={0.5} /></Mesh3d>);
    for (let x = -3.0; x <= 3.0; x += 0.24) {
      n++;
      const id = ["bleach_bottle", "multi_cleaner_bottle", "drain_cleaner", "multi_cleaner_5_litre", "multi_cleaner_bottle", "cleaner_tin_01", "all_purpose_cleaner"][Math.floor(rnd(n * 3 + Math.floor((x + 4) / 0.76) * 11 + j * 5) * 7) % 7];
      P.push(<Model key={"n" + n} src={M(id)} position={[x + (rnd(n) - 0.5) * 0.02, y, SHZ + (rnd(n * 3) - 0.5) * 0.03]} rotation={[0, (rnd(n * 5) - 0.5) * 0.5, 0]} />);
      const house = (n * 7) % 10 < 6;
      if (house && (j === 1 || j === 2)) P.push(<Mesh3d key={"h" + n} name={"h" + n} transform={Transform.fromXyz(x, y - 0.03, SHZ + 0.147)}><Cuboid half_size={[0.08, 0.014, 0.003]} /><StandardMaterial base_color="#200608" emissive={glow("#ff4a4a", 9 * g60 * ss(T, wt("L05", "60%") - 0.3 + (x + 3) * 0.08, wt("L05", "60%") + (x + 3) * 0.08))} /></Mesh3d>);
    }
  }
  // far aisle lights (bokeh)
  for (let i = 0; i < 30; i++) P.push(<Mesh3d key={"bk" + i} transform={Transform.fromXyz(-3 + rnd(i * 9) * 6, 2.25 + rnd(i * 13) * 0.5, SHZ - 0.2 + rnd(i * 17) * 0.1)}><Sphere radius={0.012 + rnd(i) * 0.01} /><StandardMaterial base_color="#000000" emissive={glow(i % 4 === 0 ? RED : "#ffd9a0", 5)} /></Mesh3d>);
  // the board: 462 labels, one a store; they flip to "?" on "changes" and back to RM2.60 at the end
  const aF = wt("L11", "change") - 0.2, bF = DUR - 1.5;
  P.push(<Mesh3d key="brd" transform={Transform.fromXyz(BRD[0], BRD[1], -0.03)}><Cuboid half_size={[1.2, 1.25, 0.01]} /><StandardMaterial base_color="#141518" perceptual_roughness={0.8} /></Mesh3d>);
  if (T > t0("L11") - 1.2) for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const x = BRD[0] + (c - (COLS - 1) / 2) * PX, y = BRD[1] + (r - (ROWS - 1) / 2) * PY, d = Math.hypot(c - 7, (r - 16) * 0.5) * 0.05;
    const u = ss(T, aF + d, aF + d + 0.3) - ss(T, bF + d * 0.5, bF + d * 0.5 + 0.3);                 /* 0 = RM2.60 face, 1 = ? face */
    const face = u > 0.5 ? "label_q.png" : "label_rm260.png", sq = Math.abs(1 - 2 * u);
    P.push(<Mesh3d key={"L" + r + "_" + c + (u > 0.5 ? "q" : "a")} name={"L" + r + "_" + c + (u > 0.5 ? "q" : "a")} transform={Transform.fromXyz(x, y, 0).withScale([1, Math.max(0.02, sq), 1])}>
      <Cuboid half_size={[0.055, 0.0206, 0.002]} /><StandardMaterial base_color_texture={S(face)} emissive={glow("#ffffff", 0.9)} emissive_texture={S(face)} perceptual_roughness={0.5} /></Mesh3d>);
  }
  return <>{P}</>;
}

// ---------- 2D over the 3D ----------
const FF = "Outfit, Inter, 'Helvetica Neue', Arial, sans-serif";
function Captions({ T }: { T: number }) {
  let cur = -1; for (let i = 0; i < CAPS.length; i++) if (CAPS[i].t <= T) cur = i;
  if (cur < 0 || T > LN.L11.end + 0.5) return null;
  const ph = CAPS.filter((c, i) => c.p === CAPS[cur].p && i <= cur), last = ph.length - 1;
  return (
    <div style={{ position: "absolute", top: 300, left: 90, width: 900, textAlign: "center", fontFamily: FF, fontSize: 62, lineHeight: 1.22, letterSpacing: -0.5 }}>
      {ph.map((c, i) => (
        <span key={i} style={{ display: "inline-block", position: "relative", margin: "0 9px", padding: c.key ? "0 8px" : 0, fontWeight: i === last ? 700 : 400, color: i === last ? "#ffffff" : "#8f9299",
          border: c.key ? "2px solid #4f8df7" : "none", background: c.key ? "#16233c" : "transparent" }}>
          {c.w}
          {c.key ? <span style={{ position: "absolute", left: -8, top: -8, width: 12, height: 12, borderRadius: 6, background: "#4f8df7" }} /> : null}
          {c.key ? <span style={{ position: "absolute", right: -8, bottom: -8, width: 12, height: 12, borderRadius: 6, background: "#4f8df7" }} /> : null}
        </span>
      ))}
    </div>
  );
}
type Tag = { a: number; b: number; at: number[]; x: number; y: number; big?: string | ((T: number) => string); cap: string; sub?: string };
const num = (T: number, a: number, b: number, v0: number, v1: number, d = 1) => lerp(v0, v1, ss(T, a, b)).toFixed(d);
const TAGS: Tag[] = [
  { a: t0("L02") + 0.5, b: t0("L03") - 0.1, at: [SIGN[0], CY + 0.07, SIGN[2]], x: 70, y: 1380, cap: "GROSS MARGIN", big: (T) => num(T, wt("L02", "33%") - 0.5, wt("L02", "33%") + 0.5, 19.6, 33.3) + "%", sub: "FY2022 → FY2026 (year to May)" },
  { a: wt("L03", "87") - 0.1, b: t0("L04") + 0.2, at: [BAR[0], CY + 0.22, BAR[2]], x: 70, y: 660, cap: "STAYS WITH ECO-SHOP", big: "about 87 sen", sub: "average: 33.3% gross margin × RM2.60" },
  { a: wt("L03", "87") + 0.4, b: t0("L04") + 0.2, at: [BAR[0], CY + 0.08, BAR[2]], x: 70, y: 1420, cap: "COST OF THE GOODS", big: "about RM1.73" },
  { a: wt("L04", "label") - 0.1, b: t0("L05") - 0.1, at: [0.17, 1.02, 0.17], x: 70, y: 1420, cap: "HOUSE BRAND", sub: "illustrative label, not a real product" },
  { a: wt("L05", "60%") - 0.2, b: t0("L06") + 0.1, at: [0.4, 1.42, SHZ], x: 70, y: 1330, cap: "HOUSE BRANDS", big: (T) => num(T, wt("L05", "60%") - 0.3, wt("L05", "60%") + 0.4, 0, 60, 0) + "% of sales", sub: "FY2026 · shelf is an illustration" },
  { a: wt("L06", "65%") - 0.2, b: t0("L07") + 0.1, at: [1.1, 1.22, -0.05], x: 70, y: 700, cap: "SOURCED FROM CHINA", big: "over 65%", sub: "of products" },
  { a: wt("L06", "462") - 0.2, b: t0("L07") + 0.1, at: [1.25, 1.02, -0.1], x: 70, y: 1380, cap: "STORES", big: (T) => num(T, wt("L06", "462") - 0.3, wt("L06", "462") + 0.6, 1, 462, 0), sub: "Aug 2026" },
  { a: wt("L08", "RM2.40") - 0.2, b: t0("L09") + 0.2, at: [SIGN[0], CY + 0.07, SIGN[2]], x: 70, y: 1400, cap: "UNTIL 14 APRIL 2025", big: "RM2.40" },
  { a: wt("L09", "RM2,000") - 0.3, b: t0("L10") - 0.1, at: [SIGN[0] - 0.07, CY + 0.06, SIGN[2]], x: 70, y: 620, cap: "MINIMUM WAGE", big: "RM1,700 → RM2,000" },
  { a: wt("L09", "yuan") - 0.2, b: t0("L10") - 0.1, at: [SIGN[0] + 0.07, CY + 0.06, SIGN[2]], x: 640, y: 720, cap: "CHINESE YUAN", big: "stronger" },
  { a: wt("L09", "20") - 0.2, b: t0("L10") - 0.1, at: [SIGN[0], CY + 0.01, SIGN[2]], x: 70, y: 1400, cap: "ONE ANALYST'S FORECAST", big: "+20 sen", sub: "not announced by Eco-Shop" },
  { a: wt("L10", "number") - 0.1, b: t0("L11") - 0.3, at: [0.6, 1.37, SHZ + 0.14], x: 70, y: 1420, cap: "ONE NUMBER", big: "every shelf" },
  { a: t0("L11") + 0.9, b: DUR - 1.7, at: [BRD[0] - 0.5, BRD[1] - 0.9, 0], x: 70, y: 1560, cap: "STORES", big: "462", sub: "one label each" },
];
function Tags({ T, c }: { T: number; c: { p: number[]; l: number[] } }) {
  return <>{TAGS.filter((g) => T >= g.a && T <= g.b).map((g, i) => {
    const o = ss(T, g.a, g.a + 0.25) * (1 - ss(T, g.b - 0.25, g.b)), q = proj(c, g.at), big = typeof g.big === "function" ? g.big(T) : g.big;
    const ly = g.y < q.y ? g.y + (big ? 120 : 60) : g.y - 8;
    return (
      <div key={g.cap + g.a} style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, opacity: o }}>
        {q.ok ? <svg style={{ position: "absolute", left: 0, top: 0 }} width={1080} height={1920}><line x1={g.x + 60} y1={ly} x2={q.x} y2={q.y} stroke="#ffffff" strokeWidth={2} opacity={0.75} /><circle cx={q.x} cy={q.y} r={5} fill="#ffffff" /></svg> : null}
        <div style={{ position: "absolute", left: g.x, top: g.y, fontFamily: FF, color: "#ffffff", textShadow: "0 2px 14px rgba(0,0,0,0.85)" }}>
          <div style={{ fontSize: 27, fontWeight: 800, letterSpacing: 4 }}>{g.cap}</div>
          {big ? <div style={{ fontSize: 54, fontWeight: 700, letterSpacing: -0.5, marginTop: 2 }}>{big}</div> : null}
          {g.sub ? <div style={{ fontSize: 23, fontWeight: 400, color: "#b9bcc2", marginTop: 4 }}>{g.sub}</div> : null}
        </div>
      </div>
    );
  })}</>;
}
const SRC: [number, number, string][] = [
  [0, t0("L07"), "FY2026 results · The Edge, 14 Aug 2026"],
  [t0("L07"), t0("L09"), "The Edge, 29 Apr 2025"],
  [t0("L09"), t0("L10"), "Analyst notes · The Star, 29 Oct 2026"],
  [t0("L10"), DUR, "FY2026 results · The Edge, 14 Aug 2026"],
];
function Film() {
  const F = useCurrentFrame(), T = F / FPS;
  const c = cam(T), src = SRC.find((s) => T >= s[0] && T < s[1]) ?? SRC[0];
  const whip = T > t0("L11") - 0.6 && T < t0("L11") + 0.6;
  const h0 = 1 - ss(T, 2.3, 2.9), end = ss(T, LN.L11.end + 0.4, LN.L11.end + 0.8);
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Camera3d transform={Transform.fromXyz(c.p[0], c.p[1], c.p[2]).lookingAt(c.l as any)} projection={{ Perspective: { fov: FOV } }}>
        <DepthOfField focal_distance={c.f} aperture_f_stops={lerp(2.0, 11, ss(T, t0("L11") - 0.3, t0("L11") + 0.3))} mode="Bokeh" />
      </Camera3d>
      {whip ? <MotionBlur shutterAngle={0.9} samples={6} /> : null}
      <Bloom intensity={0.8} threshold={0.9} />
      <ToneMapping mode="aces" exposure={0.35} />
      <AmbientLight brightness={70} color="#b4bccb" />
      {/* one soft top light over the counter, a small spot for grounded shadows */}
      <RectLight transform={Transform.fromXyz(0.1, CY + 1.0, 0.3).lookingAt([0.05, CY, 0.1])} intensity={42000} width={1.3} height={0.8} color="#fff3e2" range={4} />
      <SpotLight transform={Transform.fromXyz(0.5, CY + 0.9, 0.7).lookingAt([0.1, CY + 0.1, 0.1])} intensity={16000} outer_angle={0.55} inner_angle={0.1} color="#fff1dc" shadow_maps_enabled range={4} />
      {/* the shelves: dim cool light so shapes hold, brighter while the story is there */}
      <RectLight transform={Transform.fromXyz(0, 2.5, SHZ + 1.2).lookingAt([0, 1.2, SHZ])} intensity={lerp(15000, 90000, Math.max(ss(T, t0("L05"), t0("L05") + 1.2) * (1 - ss(T, t0("L06"), t0("L06") + 1.2)), ss(T, t0("L10") + 0.6, t0("L10") + 2)))} width={5} height={0.6} color="#aebbd4" range={6} />
      <RectLight transform={Transform.fromXyz(1.1, CY + 0.9, 0.5).lookingAt([1.1, CY, -0.05])} intensity={lerp(3000, 30000, ss(T, t0("L06"), t0("L06") + 1.2) * (1 - ss(T, t0("L07"), t0("L07") + 1)))} width={0.8} height={0.6} color="#fff3e2" range={3} />
      <PointLight transform={Transform.fromXyz(BRD[0] - 2.6, BRD[1] + 0.4, 2.0)} intensity={260000} color="#dfe6f2" range={7} />
      <PointLight transform={Transform.fromXyz(BRD[0] + 2.6, BRD[1] - 0.4, 2.0)} intensity={260000} color="#dfe6f2" range={7} />
      <World T={T} />
      {/* fades to the dark at the top and bottom, as the reference */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 600, background: "linear-gradient(#0d0e11 38%, rgba(13,14,17,0))" }} />
      <div style={{ position: "absolute", left: 0, top: 1500, width: 1080, height: 420, background: "linear-gradient(rgba(13,14,17,0), #0d0e11 70%)" }} />
      <div style={{ position: "absolute", left: 60, top: 452, display: "flex", alignItems: "center", gap: 14, fontFamily: FF, fontSize: 28, fontWeight: 500, color: "#d6d8dc", opacity: 1 - end }}>
        <img src={S("ecoshop_logo.jpg")} style={{ height: 34, borderRadius: 4 }} /> <span>{src[2]}</span>
      </div>
      <Captions T={T} />
      <Tags T={T} c={c} />
      {/* frame-0 text */}
      <div style={{ position: "absolute", left: 60, top: 1420, fontFamily: FF, fontWeight: 800, fontSize: 86, lineHeight: 1.04, letterSpacing: -1.5, color: "#ffffff", opacity: h0, textShadow: "0 2px 18px rgba(0,0,0,0.9)" }}>
        Everything <span style={{ color: "#ff3b3b" }}>RM2.60.</span><br />Record profit margin.
      </div>
      {/* end text */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 640, background: "linear-gradient(#0d0e11 72%, rgba(13,14,17,0))", opacity: end }} />
      <div style={{ position: "absolute", left: 0, top: 300, width: 1080, textAlign: "center", fontFamily: FF, fontWeight: 800, fontSize: 70, letterSpacing: -1, color: "#ffffff", opacity: end, textShadow: "0 2px 18px rgba(0,0,0,0.9)" }}>
        Would you still go<br />at <span style={{ color: "#ff3b3b" }}>RM2.80?</span>
      </div>
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="ex38" component={Film} width={1080} height={1920} fps={FPS} durationInFrames={3568} />);
