// EX26 "The Bank That Sells Coffee" — smooth isometric v2 (EX16 greys, clay bevels), 60 fps, raea.
// Signature: your top-up goes into a VAULT, not the till; the vault's coins build the next stores; a stack that never
// moves lights up as the breakage. Real Starbucks sign (a crop of a CC BY 4.0 photo) flat over the opening.
// Facts: episode.md § Sources (Starbucks FY2025 10-K).
import { AbsoluteFill, Audio, Composition, Easing, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { Screen, manifold, type Solid } from "raea/3d";
import { Cuboid, Cylinder, Mesh3d, Torus } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { Quat, Transform } from "raea/transform";
import { Box, G, ISO, IsoStage, Person, Pin, glowG, type Cam, type V3 } from "../../../tools/raea/kit/iso";
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

const C = {
  bil: w("L01", "billion"), money: w("L01", "money"),
  s2: w("L02"), top: w("L02", "top"), pay: w("L02", "pay"), coffee: w("L02", "coffee"),
  s3: w("L03"), works: w("L03", "works"), noint: w("L03", "interest"), due: w("L03", "due"),
  s4: w("L04"), nev: w("L04", "never"), y2025: w("L04", "2025"), earned: w("L04", "earned"),
  s5: w("L05"), ask: w("L05", "ask"), follow: w("L05", "follow"),
};
const VAULT: V3 = [4.6, 0, -3.6], PHONE: V3 = [-2.2, 1.5, 2.6], TILL: V3 = [-3, 1.1, -2.4], PILE: V3 = [6.6, 0, -1.2];
const SITES = [[16, -3], [22, 1], [28, -4], [34, 0]];                       // new stores down the street (L03)

function camAt(f: number): Cam {
  const sw = K(f, -24, 110, io);
  let t: V3 = [1, 0.8, -0.5];
  let h = L(30, 19, sw) - f * 0.005;
  const yaw = ISO.yaw * (0.55 + 0.45 * sw);
  const pitch = L(1.35, ISO.pitch, sw);
  const ph = K(f, C.s2 - 8, 60, io); t = L3(t, [0.4, 1.4, -0.4], ph); h = L(h, 12.5, ph) - 0.003 * Math.max(0, f - C.s2) * (1 - K(f, C.s3, 20));
  const st = K(f, C.works - 30, 90, io); t = L3(t, [17, 0.8, -1.5], st); h = L(h, 26, st);
  const pl = K(f, C.s4 - 10, 70, io); t = L3(t, [5.6, 1.4, -2.2], pl); h = L(h, 11, pl) - 0.004 * Math.max(0, f - C.s4) * (1 - K(f, C.s5, 20));
  const bk = K(f, C.s5 - 6, 60, io); t = L3(t, [-1.4, 1.3, 1.6], bk); h = L(h, 10, bk) - 0.003 * Math.max(0, f - C.s5);
  return { t, yaw, pitch, height: h };
}

let S: Record<string, Solid> | null = null;
const solids = () => (S ??= {
  coin: manifold.cylinder(0.18, 0.06, 32).rotate(-90, 0, 0),
  door: manifold.cylinder(1.25, 0.25, 64).rotate(-90, 0, 0).rotate(90, 0, 0),
  phone: manifold.roundedBox(0.5, 0.06, 0.95, 0.03),
  cup: manifold.cylinder(0.16, 0.42, 32).rotate(-90, 0, 0).minus(manifold.cylinder(0.13, 0.4, 32).rotate(-90, 0, 0).move(0, 0.04, 0)),
});

function AppPage({ f }: { f: number }) {
  const pulse = 0.5 + 0.5 * Math.sin(f / 7), topped = f >= C.top;
  return <div style={{ position: "absolute", inset: 0, background: "#101113", fontFamily: "Inter Display", color: G.ink, padding: "40px 28px" }}>
    <div style={{ fontSize: 30, color: G.dim }}>Card balance</div>
    <div style={{ fontSize: 64, fontWeight: 800, marginTop: 6 }}>{topped ? "Topped up" : "Low"}</div>
    <div style={{ marginTop: 40, padding: "26px 0", borderRadius: 40, textAlign: "center", fontSize: 40, fontWeight: 800,
      background: G.green, color: "#0E0E10", opacity: f >= C.s5 ? 0.6 + 0.4 * pulse : 1 }}>Top up</div>
  </div>;
}

function Cafe({ f }: { f: number }) {
  const p: any[] = [];
  p.push(<Box key="fl" name="fl" x={1} z={-0.5} w={14} h={0.12} d={10} col={G.floor} />);
  p.push(<Box key="wb" name="wb" x={1} z={-5.5} w={14} h={1.6} d={0.25} col={G.wall} />);
  p.push(<Box key="wl" name="wl" x={-6} z={-0.5} w={0.25} h={1.6} d={10} col={G.wall} />);
  p.push(<Box key="wv" name="wv" x={3.2} z={-3} w={0.25} h={1.6} d={5} col={G.wall} />);                  // the back room's wall
  p.push(<Box key="ctr" name="ctr" x={-2.4} z={-2.4} w={5.6} h={1.05} d={1.0} col={G.body} />);
  [-4.2, -3.1].forEach((x, i) => p.push(<Box key={`esp${i}`} name={`esp${i}`} x={x} z={-2.5} w={0.8} h={0.55} d={0.6} y0={1.05} col={G.top} />));
  p.push(<Box key="till" name="till" x={TILL[0]} z={TILL[2]} w={0.5} h={0.3} d={0.4} y0={1.05} col={G.light} />);
  [[1.5, 1.5], [1.5, 3.4], [-4.2, 2.6], [4.5, 2.4]].forEach(([x, z], i) => {
    p.push(<Box key={`t${i}`} name={`t${i}`} x={x} z={z} w={1.1} h={0.75} d={1.1} col={G.body} />);
    [[-0.8, 0], [0.8, 0]].forEach(([a], j) => p.push(<Box key={`s${i}${j}`} name={`s${i}${j}`} x={x + a} z={z} w={0.42} h={0.45} d={0.42} col={G.wall} />));
  });
  // the empty cup on the counter: paid for, not made
  const cupT = K(f, C.coffee, 20);
  if (cupT > 0) p.push(<Mesh3d key="cup" name="cup" transform={Transform.fromXyz(-1.4, 1.06, -2.2).withScale([cupT, cupT, cupT])} shape={solids().cup}><StandardMaterial base_color={G.light} perceptual_roughness={0.7} /></Mesh3d>);
  // the vault in the back room: a round door that glows green as the money arrives
  const vg = 0.3 + 1.2 * K(f, C.bil - 40, 50) + 0.25 * Math.sin(f / 10);
  p.push(<Box key="vbody" name="vbody" x={VAULT[0]} z={VAULT[2] - 0.8} w={3} h={2.8} d={1.4} col={G.body} />);
  p.push(<Mesh3d key="vdoor" name="vdoor" transform={Transform.fromXyz(VAULT[0], 1.45, VAULT[2] - 0.05).withRotation(Quat.fromEuler("XYZ", Math.PI / 2, 0, 0))}>
    <Cylinder radius={1.15} half_height={0.12} /><StandardMaterial base_color={G.top} perceptual_roughness={0.5} metallic={0.4} /></Mesh3d>);
  p.push(<Mesh3d key="vring" name="vring" transform={Transform.fromXyz(VAULT[0], 1.45, VAULT[2] + 0.1).withRotation(Quat.fromEuler("XYZ", 0, 0, f * 0.01))}>
    <Torus major_radius={0.75} minor_radius={0.05} /><StandardMaterial base_color={G.green} emissive={glowG(vg)} /></Mesh3d>);
  // queue + the phone holder
  [[-2.2, 1.2], [-2.2, 3.6], [-1.2, 4.6]].forEach(([x, z], i) => p.push(<Person key={`q${i}`} name={`q${i}`} x={x + 0.04 * Math.sin(f / 40 + i)} z={z} />));
  p.push(<Person key="you" name="you" x={PHONE[0]} z={PHONE[2]} col={G.green} glow={0.22} />);
  p.push(<Mesh3d key="phone" name="phone" transform={Transform.fromXyz(PHONE[0] + 0.45, 1.55, PHONE[2] + 0.2).withRotation(Quat.fromEuler("XYZ", -0.9, 0.6, 0))} shape={solids().phone}>
    <StandardMaterial base_color="#16171B" perceptual_roughness={0.3} /></Mesh3d>);
  p.push(<Screen key="ps" name="ps" crt={false} resolution={[300, 560]} size={[0.42]} position={[PHONE[0] + 0.45 + 0.0, 1.585, PHONE[2] + 0.2 + 0.02]} rotation={[-0.9 - Math.PI / 2 + Math.PI / 2, 0.6, 0]}><AppPage f={f} /></Screen>);
  return <>{p}</>;
}

// coins: phone → vault on each top-up beat (L02); vault → new stores (L03)
function Coins({ f }: { f: number }) {
  const out: any[] = [];
  const fly = (key: string, a: V3, b: V3, t0: number, dur = 44, lift = 2.2) => {
    const u = K(f, t0, dur, io); if (u <= 0 || u >= 1) return;
    const q = L3(a, b, u); q[1] += Math.sin(u * Math.PI) * lift;
    out.push(<Mesh3d key={key} name={key} transform={Transform.fromXyz(...q).withRotation(Quat.fromEuler("XYZ", 0, f * 0.12, 0))} shape={solids().coin}>
      <StandardMaterial base_color={G.green} emissive={glowG(1.6)} /></Mesh3d>);
  };
  for (let i = 0; i < 6; i++) fly(`in${i}`, [PHONE[0] + 0.45, 1.7, PHONE[2]], [VAULT[0], 1.4, VAULT[2] + 0.3], C.top + i * 9);
  for (let i = 0; i < 4; i++) fly(`miss${i}`, [PHONE[0] + 0.45, 1.7, PHONE[2]], [VAULT[0], 1.4, VAULT[2] + 0.3], C.pay + i * 9);
  SITES.forEach(([x, z], s) => { for (let i = 0; i < 4; i++) fly(`out${s}${i}`, [VAULT[0], 1.6, VAULT[2]], [x, 1.2, z], C.works + s * 14 + i * 7, 60, 4); });
  return <>{out}</>;
}

// new stores rising down the street, built with the float (L03)
function NewStores({ f }: { f: number }) {
  if (f < C.works - 30 || f > C.s4 + 80) return null;
  return <>{SITES.map(([x, z], i) => {
    const g = K(f, C.works + 30 + i * 14, 40, io);
    if (g <= 0) return null;          // a fixed unit box grown by scale (a part's shape is fixed from its first frame)
    return <Mesh3d key={`ns${i}`} name={`ns${i}`} transform={Transform.fromXyz(x, 1.1 * g, z).withScale([4 * (0.6 + 0.4 * g), 2.2 * g, 3.4 * (0.6 + 0.4 * g)])}>
      <Cuboid half_size={[0.5, 0.5, 0.5]} /><StandardMaterial base_color={G.top} perceptual_roughness={0.9} emissive={glowG(0.25 * (1 - g) + 0.05)} /></Mesh3d>;
  })}</>;
}

// the stack that never moves (breakage), lit on "2025"
function Pile({ f }: { f: number }) {
  if (f < C.s3) return null;
  const lit = K(f, C.y2025, 40), n = 14;
  return <>{Array.from({ length: n }).map((_, i) => {
    const col = lit > 0 && i / n < lit ? "g" : "";
    return <Mesh3d key={`pc${i}${col}`} name={`pc${i}${col}`} transform={Transform.fromXyz(PILE[0] + (i % 2) * 0.02, 0.12 + i * 0.065, PILE[2])} shape={solids().coin}>
      <StandardMaterial base_color={col ? G.green : G.light} perceptual_roughness={0.5} emissive={col ? glowG(1.2) : undefined} /></Mesh3d>;
  })}</>;
}

function Headline({ f, at, a, b }: { f: number; at: number; a: string; b: string }) {
  const t = K(f, at, 18);
  return <div style={{ position: "absolute", left: 72, right: 140, top: 200, fontFamily: "Inter Display", fontWeight: 800, fontSize: 88, lineHeight: "98px", letterSpacing: -2, color: G.ink,
    opacity: t, transform: `translateY(${L(20, 0, t)}px)` }}>{a} <span style={{ color: G.green }}>{b}</span></div>;
}

function Piece() {
  const f = useCurrentFrame(), cam = camAt(f), end = C.follow;
  const ic = (n: string, col = G.green) => <Icon name={n} size={44} color={col} />;
  const bil = L(0, 1.75, K(f, C.bil - 60, 60, (x) => x));
  const head = f < C.s2 ? ["$1.75B of", "your money.", -12] : f < C.s3 ? ["Paid before", "you order.", C.s2] : f < C.s4 ? ["No interest.", "No due date.", C.s3]
    : f < C.s5 ? ["$222M", "never spent.", C.s4] : ["Who's lending", "to whom?", C.s5];
  return (
    <AbsoluteFill style={{ background: G.ground }}>
      {f < end + 10 && <IsoStage cam={cam}><Cafe f={f} /><Coins f={f} /><NewStores f={f} /><Pile f={f} /></IsoStage>}
      {f < C.bil + 30 && <img src={staticFile("starbucks_sign_crop.png")} style={{ position: "absolute", left: 540 - 140, top: 620, width: 280, height: 280,
        opacity: 1 - K(f, C.bil, 24), transform: `scale(${L(1.06, 1, K(f, -20, 60))})`, filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.6))" }} />}
      {f >= C.bil - 10 && f < C.s2 + 20 && <Pin cam={cam} at={[VAULT[0], 2.6, VAULT[2]]} dx={-40} dy={-260} t={K(f, C.bil - 10, 16)} title={"US$" + bil.toFixed(2) + " billion"} sub="customers' balances, Sep 2025" icon={ic("hand-coins")} align="right" />}
      {f >= C.top && f < C.s3 && <Pin cam={cam} at={[VAULT[0], 2.2, VAULT[2]]} dx={-40} dy={-280} t={K(f, C.top, 14)} title="Into the vault" sub="not the till" icon={ic("lock")} align="right" />}
      {f >= C.coffee && f < C.s3 && <Pin cam={cam} at={[-1.4, 1.5, -2.2]} dx={-40} dy={-200} t={K(f, C.coffee, 14)} title="Your coffee" sub="not ordered yet" icon={ic("clock", G.ink)} align="right" />}
      {f >= C.noint && f < C.s4 && <Pin cam={cam} at={[SITES[1][0], 2.4, SITES[1][1]]} dx={-40} dy={-280} t={K(f, C.noint, 14)} title={f >= C.due ? "0% interest · no due date" : "0% interest"} sub="the float builds new stores" icon={ic("store")} align="right" />}
      {f >= C.nev && f < C.s5 && <Pin cam={cam} at={[PILE[0], 1.1, PILE[2]]} dx={-60} dy={-260} t={K(f, C.nev, 14)} title={f >= C.earned ? "US$222.4 million" : "Never spent"} sub={f >= C.earned ? "breakage, fiscal 2025" : "balances nobody uses"} icon={ic("coins")} align="right" />}
      {f >= C.ask && f < end && <Pin cam={cam} at={[PHONE[0] + 0.45, 1.6, PHONE[2] + 0.2]} dx={60} dy={-300} t={K(f, C.ask, 14)} title="Who's lending to whom?" sub="your top-up, their loan" icon={ic("hand-coins")} />}
      {f < end && <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 540, background: "linear-gradient(to bottom, rgba(14,14,16,0.92), rgba(14,14,16,0))" }} />}
      {f < end && <Headline key={head[1] as string} f={f} at={head[2] as number} a={head[0] as string} b={head[1] as string} />}
      {f >= end - 4 && <EndCard f={Math.floor(f / 2)} at={Math.floor(end / 2)} />}
      {f < end && <Captions blocks={caps as any} frame={f} fps={FPS} />}
      <Audio src={staticFile("mix.wav")} />
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="ex26" component={Piece} width={1080} height={1920} fps={FPS} durationInFrames={N} />);
