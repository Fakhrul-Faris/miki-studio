// EX27 "The 10% Off That Costs More" (Shopee 11.11) — smooth isometric v2 (EX16 greys, clay bevels), 60 fps, raea.
// Signature: the price as a physical column of ringgit blocks: 500 → raised to 600 → "10% off" → 540 still stands above
// the ghost of the real 500, the extra RM40 glowing red. Real Shopee logo flat over the opening. The fake discount is
// SOME sellers' trick (the law firm's illustrative example); Shopee is named for its sale and its own rule against it.
import { AbsoluteFill, Audio, Composition, Easing, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { Screen, Text3D, manifold, type Solid } from "raea/3d";
import { Cuboid, Mesh3d } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { Quat, Transform } from "raea/transform";
import { LinearRgba, Srgba } from "raea/color";
import { Box, G, ISO, IsoStage, Pin, glowG, type Cam, type V3 } from "../../../tools/raea/kit/iso";
import { EndCard, words } from "../../../tools/raea/kit/ui";
import { Icon } from "../../../tools/raea/kit/icons";
import { Captions } from "../../../tools/raea/kit/Captions";
import tl from "../audio/vo_timeline.json";
import caps from "./captions60.json";

const FPS = 60, w = words(tl, FPS), N = Math.ceil((tl as any).end * FPS) + 30;
const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const io = Easing.bezier(0.65, 0, 0.35, 1), out = Easing.bezier(0.16, 1, 0.3, 1);
const K = (f: number, a: number, d = 24, e = out) => interpolate(f, [a, a + d], [0, 1], { ...CL, easing: e });
const L = (a: number, b: number, t: number) => a + (b - a) * t;
const L3 = (a: V3, b: V3, t: number): V3 => [L(a[0], b[0], t), L(a[1], b[1], t), L(a[2], b[2], t)];
const RED = "#FF5A4E", ORANGE = "#EE4D2D";
const glow = (hex: string, k: number) => LinearRgba.from(Srgba.hex(hex)).mul(k);

const C = {
  million: w("L01", "million"), costs: w("L01", "costs"),
  s2: w("L02"), vac: w("L02", "vacuum"), five: w("L02", "500"), right: w("L02", "right"), cal: w("L02", "11"), lifts: w("L02", "lifts"), six: w("L02", "600"),
  s3: w("L03"), ten: w("L03", "10"), pay: w("L03", "pay"), feels: w("L03", "feels"),
  s4: w("L04"), illegal: w("L04", "illegal"), act: w("L04", "act"), susp: w("L04", "suspends"),
  s5: w("L05"), check: w("L05", "check"), seen: w("L05", "seen"), follow: w("L05", "follow"),
};
const PHONE: V3 = [-3.2, 0, 1.2], COL: V3 = [1.6, 0, -0.6], BLK = 0.32;     // one block = RM20 → 500 is 25 blocks

function camAt(f: number): Cam {
  const sw = K(f, -24, 110, io);
  let t: V3 = [-2.6, 0.4, 0.8];
  let h = L(16, 9, sw) - f * 0.002;
  const yaw = ISO.yaw * (0.55 + 0.45 * sw);
  const pitch = L(1.35, ISO.pitch, sw);
  const col = K(f, C.s2 - 6, 70, io); t = L3(t, [0.4, 3.2, -0.4], col); h = L(h, 14, col);
  const tall = K(f, C.lifts - 10, 60, io); t = L3(t, [0.8, 4.2, -0.4], tall); h = L(h, 15.5, tall) - 0.002 * Math.max(0, f - C.s3) * (1 - K(f, C.s4, 20));
  const law = K(f, C.s4 - 6, 60, io); t = L3(t, [-0.6, 3.4, 0], law); h = L(h, 16, law);
  const back = K(f, C.s5 - 6, 60, io); t = L3(t, [-2.8, 0.5, 1.0], back); h = L(h, 8.5, back) - 0.002 * Math.max(0, f - C.s5);
  return { t, yaw, pitch, height: h };
}

let S: Record<string, Solid> | null = null;
const solids = () => (S ??= {
  phone: manifold.roundedBox(2.4, 0.16, 4.6, 0.14),
  ticket: manifold.roundedBox(0.7, 0.04, 0.36, 0.05),
  gavel: manifold.roundedBox(2.6, 0.5, 1.4, 0.12),
});

function ListingPage({ f }: { f: number }) {
  const susp = f >= C.susp, price = f < C.lifts ? 500 : f < C.ten ? 600 : 540, raised = f >= C.lifts && f < C.ten;
  const hist = K(f, C.check, 60, io);
  return <div style={{ position: "absolute", inset: 0, background: "#F5F5F5", fontFamily: "Inter Display", filter: susp && f < C.s5 ? "grayscale(1)" : undefined }}>
    <div style={{ height: 120, background: ORANGE, display: "flex", alignItems: "center", padding: "0 40px", color: "#fff", fontSize: 52, fontWeight: 800 }}>11.11 Big Sale</div>
    <div style={{ margin: 36, height: 520, borderRadius: 28, background: "#E6E6E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 200, height: 360, borderRadius: 60, background: "#C9C9C9" }} /></div>
    <div style={{ padding: "0 44px", fontSize: 54, fontWeight: 700, color: "#222" }}>Vacuum cleaner</div>
    <div style={{ padding: "18px 44px", display: "flex", alignItems: "baseline", gap: 24 }}>
      <span style={{ fontSize: 96, fontWeight: 800, color: raised ? RED : ORANGE }}>RM{price}</span>
      {f >= C.ten && <span style={{ fontSize: 48, color: "#999", textDecoration: "line-through" }}>RM600</span>}
      {f >= C.ten && <span style={{ fontSize: 44, fontWeight: 800, color: "#fff", background: ORANGE, padding: "4px 14px", borderRadius: 10 }}>-10%</span>}
    </div>
    {susp && f < C.s5 && <div style={{ margin: "30px 44px", padding: 30, borderRadius: 20, background: "#333", color: "#fff", fontSize: 46, fontWeight: 800, textAlign: "center" }}>Listing suspended</div>}
    {f >= C.s5 && <svg width={900} height={420} style={{ marginLeft: 50, marginTop: 30 }}>
      <text x={0} y={36} fill="#555" fontSize={36} fontWeight={700} fontFamily="Inter Display">Price, last 2 weeks</text>
      <polyline fill="none" stroke="#222" strokeWidth={10} strokeDasharray={`${hist * 1400} 1400`} points="0,300 380,300 420,180 640,180 680,216 900,216" />
      <line x1={0} x2={900} y1={300} y2={300} stroke="#2E8B00" strokeWidth={4} strokeDasharray="12 10" />
      <text x={0} y={350} fill="#2E8B00" fontSize={34} fontWeight={700} fontFamily="Inter Display">RM500 usual</text>
      {hist > 0.8 && <text x={640} y={160} fill={RED} fontSize={34} fontWeight={800} fontFamily="Inter Display">RM540 "deal"</text>}
    </svg>}
  </div>;
}

function Desk({ f }: { f: number }) {
  const p: any[] = [];
  p.push(<Box key="desk" name="desk" x={-1} z={0.4} w={10} h={0.12} d={7} col={G.floor} />);
  p.push(<Mesh3d key="phone" name="phone" transform={Transform.fromXyz(PHONE[0], 0.2, PHONE[2])} shape={solids().phone}><StandardMaterial base_color="#16171B" perceptual_roughness={0.35} /></Mesh3d>);
  p.push(<Screen key="ps" name="ps" crt={false} resolution={[1000, 1900]} size={[2.2]} position={[PHONE[0], 0.29, PHONE[2]]} rotation={[-Math.PI / 2, 0, 0]}><ListingPage f={f} /></Screen>);
  // vouchers rain onto the phone (L01): RM11 million in vouchers
  for (let i = 0; i < 14; i++) {
    const t0 = C.million - 30 + i * 5, u = K(f, t0, 34, io);
    if (u <= 0) continue;
    const x = PHONE[0] - 1 + (i % 5) * 0.5, z = PHONE[2] - 1.6 + Math.floor(i / 5) * 1.1;
    const fade = 1 - K(f, C.s2 + 20, 30);
    if (fade <= 0) continue;
    p.push(<Mesh3d key={`v${i}`} name={`v${i}`} transform={Transform.fromXyz(x, L(4, 0.34 + (i % 3) * 0.05, u), z).withRotation(Quat.fromEuler("XYZ", 0, i * 0.7, 0)).withScale([fade, fade, fade])} shape={solids().ticket}>
      <StandardMaterial base_color={G.green} emissive={glowG(1.1)} /></Mesh3d>);
  }
  return <>{p}</>;
}

// the price column: 25 blocks (RM500), +5 (RM600) right before 11.11, then 3 slide off (10%) → 27 blocks (RM540)
function Column({ f }: { f: number }) {
  if (f < C.s2 - 10) return null;
  const out: any[] = [], base = K(f, C.vac, 50, io), add = K(f, C.lifts, 30, io), off = K(f, C.ten, 40, io);
  const n500 = Math.round(25 * base), shown = n500 + Math.round(5 * add);
  for (let i = 0; i < 30; i++) {
    if (i >= shown) break;
    const top3 = i >= 27, extra = i >= 25 && i < 27 && f >= C.pay;          // the 2 blocks above the real price glow red after "pay"
    let x = COL[0], y = 0.12 + BLK * i + BLK / 2, z = COL[2];
    if (top3 && off > 0) { x += 2.4 * off; y -= 1.2 * off * (i - 26); z += 1.2 * off; }
    if (top3 && off >= 1) continue;
    const nm = `b${i}${extra ? "r" : i >= 25 ? "a" : ""}`;
    out.push(<Mesh3d key={nm} name={nm} transform={Transform.fromXyz(x, y, z)}><Cuboid half_size={[0.6, BLK / 2 - 0.015, 0.6]} />
      <StandardMaterial base_color={extra ? RED : i >= 25 ? "#6B4B3A" : G.top} perceptual_roughness={0.85} emissive={extra ? glow(RED, 1.4) : undefined} /></Mesh3d>);
  }
  // the ghost of the real price: a thin outline at RM500
  const ghost = K(f, C.pay - 20, 30);
  if (ghost > 0) out.push(<Mesh3d key="ghost" name="ghost" transform={Transform.fromXyz(COL[0], 0.12 + BLK * 25, COL[2]).withScale([1, ghost, 1])}><Cuboid half_size={[0.95, 0.02, 0.95]} />
    <StandardMaterial base_color={G.green} emissive={glowG(1.4)} /></Mesh3d>);
  // the calendar tile flips to 11.11
  const cal = K(f, C.cal - 6, 20);
  if (cal > 0) {
    out.push(<Box key="cal" name="cal" x={COL[0] + 2.2} z={COL[2] - 1.4} w={1.6} h={1.7} d={0.2} col={G.light} />);
    out.push(<Mesh3d key="calt" name="calt" transform={Transform.fromXyz(COL[0] + 2.2, 0.9, COL[2] - 1.28).withScale([cal, cal, 1])}><Text3D size={0.5} depth={0.05}>11.11</Text3D>
      <StandardMaterial base_color={ORANGE} emissive={glow(ORANGE, 0.6)} /></Mesh3d>);
  }
  // the law stamps the column (L04)
  const st = K(f, C.illegal, 22);
  if (st > 0) out.push(<Mesh3d key="law" name="law" transform={Transform.fromXyz(COL[0], L(14, 0.12 + BLK * 27 + 0.28, st), COL[2])} shape={solids().gavel}>
    <StandardMaterial base_color={G.light} perceptual_roughness={0.6} /></Mesh3d>);
  return <>{out}</>;
}

function Headline({ f, at, a, b }: { f: number; at: number; a: string; b: string }) {
  const t = K(f, at, 18);
  return <div style={{ position: "absolute", left: 72, right: 140, top: 200, fontFamily: "Inter Display", fontWeight: 800, fontSize: 88, lineHeight: "98px", letterSpacing: -2, color: G.ink,
    opacity: t, transform: `translateY(${L(20, 0, t)}px)` }}>{a} <span style={{ color: G.green }}>{b}</span></div>;
}

function Piece() {
  const f = useCurrentFrame(), cam = camAt(f), end = C.follow;
  const ic = (n: string, col = G.green) => <Icon name={n} size={44} color={col} />;
  const colTop = (n: number): V3 => [COL[0], 0.12 + BLK * n, COL[2]];
  const head = f < C.s2 ? ["Shopee 11.11:", "10% off = more?", -12] : f < C.lifts ? ["Usually", "RM500.", C.s2] : f < C.s3 ? ["Raised to", "RM600.", C.lifts]
    : f < C.s4 ? ["10% off.", "You pay RM540.", C.s3] : f < C.s5 ? ["Illegal in", "Malaysia.", C.s4] : ["Check last", "week's price.", C.s5];
  return (
    <AbsoluteFill style={{ background: G.ground }}>
      {f < end + 10 && <IsoStage cam={cam}><Desk f={f} /><Column f={f} /></IsoStage>}
      {f < C.million + 30 && <img src={staticFile("shopee.svg")} style={{ position: "absolute", left: 540 - 260, top: 660, width: 520, height: 166,
        opacity: 1 - K(f, C.million, 24), transform: `scale(${L(1.06, 1, K(f, -20, 60))})`, filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.6))" }} />}
      {f >= C.million && f < C.s2 + 10 && <Pin cam={cam} at={[PHONE[0], 0.6, PHONE[2] - 1]} dx={60} dy={-260} t={K(f, C.million, 14)} title="RM11 million" sub="in Shopee 11.11 vouchers" icon={ic("tag")} />}
      {f >= C.five && f < C.lifts && <Pin cam={cam} at={colTop(25)} dx={60} dy={-200} t={K(f, C.five, 14)} title="RM500" sub="the usual price" icon={ic("tag", G.ink)} />}
      {f >= C.lifts && f < C.s3 && <Pin cam={cam} at={colTop(30)} dx={60} dy={-200} t={K(f, C.lifts, 14)} title="RM600" sub="raised right before 11.11" icon={ic("triangle-alert", RED)} />}
      {f >= C.pay && f < C.s4 && <Pin cam={cam} at={colTop(27)} dx={60} dy={-220} t={K(f, C.pay, 14)} title="RM540 after 10% off" sub="RM40 MORE than usual" icon={ic("triangle-alert", RED)} />}
      {f >= C.act && f < C.s5 && <Pin cam={cam} at={colTop(28)} dx={-60} dy={-240} t={K(f, C.act, 14)} title="Consumer Protection Act 1999" sub="s.12 misleading price · s.145 up to RM50,000" icon={ic("lock", G.ink)} align="right" />}
      {f >= C.check && f < end && <Pin cam={cam} at={[PHONE[0], 0.4, PHONE[2] + 0.6]} dx={80} dy={-280} t={K(f, C.check, 14)} title="Check last week's price" sub="before you use your vouchers" icon={ic("clock")} />}
      {f < end && <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 540, background: "linear-gradient(to bottom, rgba(14,14,16,0.92), rgba(14,14,16,0))" }} />}
      {f < end && <Headline key={head[1] as string} f={f} at={head[2] as number} a={head[0] as string} b={head[1] as string} />}
      {f >= end - 4 && <EndCard f={Math.floor(f / 2)} at={Math.floor(end / 2)} />}
      {f < end && <Captions blocks={caps as any} frame={f} fps={FPS} />}
      <Audio src={staticFile("mix.wav")} />
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="ex27" component={Piece} width={1080} height={1920} fps={FPS} durationInFrames={N} />);
