// EX25 v2 "How Is 99 Speedmart So Cheap? (Part 1)" — smooth isometric v2 (EX24 v3's language) pushed further:
// the real logo flat over the opening and on the sign; a taman street (99 Speedmart next to the houses); the store
// network growing out of Klang (1987); the signature RM1 coin that splits 95 / 5; brand money you can follow (green
// tokens off the trucks, one per fee the voice names); a profit pillar that fills about half green. 60 fps.
// Facts: episode.md § Sources. v1 (flat UI) is edit_v1.tsx.
import { AbsoluteFill, Audio, Composition, Easing, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { Entity, ImagePlane, Text3D, manifold, type Solid } from "raea/3d";
import { Cuboid, Cylinder, Mesh3d } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { Quat, Transform } from "raea/transform";
import { Box, G, ISO, IsoStage, Person, Pin, Ribbon, glowG, type Cam, type V3 } from "../../../tools/raea/kit/iso";
import { reliefSolid } from "../../../tools/raea/kit/clay";
import { EndCard, words } from "../../../tools/raea/kit/ui";
import { Icon } from "../../../tools/raea/kit/icons";
import { Captions } from "../../../tools/raea/kit/Captions";
import tl from "../audio/vo_timeline.json";
import caps from "./captions60.json";
import mys from "../../../tools/raea/kit/geo/malaysia.json";

const FPS = 60, w = words(tl, FPS), N = Math.ceil((tl as any).end * FPS) + 30;
const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const io = Easing.bezier(0.65, 0, 0.35, 1), out = Easing.bezier(0.16, 1, 0.3, 1);
const K = (f: number, a: number, d = 24, e = out) => interpolate(f, [a, a + d], [0, 1], { ...CL, easing: e });
const L = (a: number, b: number, t: number) => a + (b - a) * t;
const L3 = (a: V3, b: V3, t: number): V3 => [L(a[0], b[0], t), L(a[1], b[1], t), L(a[2], b[2], t)];

const C = {
  not: w("L01", "not"), cust: w("L01", "customer"),
  s2: w("L02"), house: w("L02", "house"), next: w("L02", "next"), cheap: w("L02", "cheap"), layout: w("L02", "layout"), every: w("L02", "everywhere"),
  s3: w("L03"), keeps: w("L03", "keeps"), five: w("L03", "five"),
  s4: w("L04"), brands: w("L04", "brands"), shelf: w("L04", "shelf"), targets: w("L04", "targets"), ware: w("L04", "warehouses"), y2024: w("L04", "2024"), half: w("L04", "half"),
  s5: w("L05"), twice: w("L05", "twice"), part: w("L05", "part"), follow: w("L05", "follow"),
};

// ---------- places ----------
const STORE: V3 = [0, 0, -1.5];                     // the 99 Speedmart unit, cut away (floor x -5..5, z -6..3; front faces +z)
const DC: V3 = [-14, 0, -15];                       // the warehouse at the end of the back lane
const COIN: V3 = [2.5, 0, 7];                       // the coin lies on the road in front
const PILLAR: V3 = [9.5, 0, 6];
const TILE = 0.032, MY: V3 = [70, 0, 0], KL = [87.8, 262.3];
const myAt = (x: number, y: number): V3 => [MY[0] + (x - mys.w / 2) * TILE, 0, MY[2] + (y - mys.h / 2) * TILE];

// ---------- the camera: one take ----------
function camAt(f: number): Cam {
  const sw = K(f, -24, 120, io);
  let t: V3 = [0, 0.5, 0.5], h = L(34, 24, sw) - 0.006 * f, yaw = ISO.yaw * (0.55 + 0.45 * sw), pitch = L(1.35, ISO.pitch, sw);
  const toMap = K(f, C.s2 - 6, 70, io), back = K(f, C.next - 20, 80, io);            // out to the country … and back to the street
  t = L3(t, L3([MY[0], 0, MY[2] + 0.5], [0, 0.5, 3], back), toMap); h = L(h, L(50, 24, back), toMap);
  const coin = K(f, C.s3 - 6, 60, io);                                              // down onto the coin
  t = L3(t, [COIN[0] - 0.5, 0.3, COIN[2] - 0.5], coin); h = L(h, 12, coin) - 0.004 * Math.max(0, f - C.s3) * (1 - K(f, C.s4, 30));
  const lane = K(f, C.s4 - 6, 80, io);                                              // the back lane, the trucks, the warehouse, the shelves
  t = L3(t, [-5, 0.5, -7], lane); h = L(h, 28, lane) - 0.003 * Math.max(0, f - C.s4) * (1 - K(f, C.y2024, 30));
  const pil = K(f, C.y2024 - 10, 60, io);
  t = L3(t, [5, 2, 2], pil); h = L(h, 22, pil);
  const end = K(f, C.s5 - 6, 70, io);                                               // the shelves, paid twice
  t = L3(t, [0, 0.8, -1.5], end); h = L(h, 14, end) - 0.004 * Math.max(0, f - C.s5);
  return { t, yaw, pitch, height: h };
}

// ---------- solids ----------
let S: Record<string, Solid> | null = null;
const pie = (a0: number, a1: number, r: number, h: number) => {
  const pts: [number, number][] = [[0, 0]];
  for (let i = 0; i <= 48; i++) { const a = a0 + (a1 - a0) * (i / 48); pts.push([Math.cos(a) * r, Math.sin(a) * r]); }
  return manifold.extrude([pts], h).rotate(-90, 0, 0);
};
const solids = () => (S ??= {
  keep: pie(0, 0.05 * Math.PI * 2, 2.4, 0.32),
  rest: pie(0.05 * Math.PI * 2, Math.PI * 2, 2.4, 0.32),
  truck: manifold.roundedBox(1.6, 1.5, 3.4, 0.08).move(0, 0.75, 0).union(manifold.roundedBox(1.5, 1.1, 1.1, 0.08).move(0, 0.55, 2.3)),
  token: manifold.cylinder(0.32, 0.1, 32).rotate(-90, 0, 0),
});

// ---------- the street: three cut-away units (one layout, copied), houses across the road, the back lane ----------
function Unit({ id, x, f, hero }: { id: string; x: number; f: number; hero?: boolean }) {
  const p: any[] = [], z0 = STORE[2], hl = !hero && f >= C.layout ? K(f, C.layout + (x > 0 ? 8 : 0), 20) : 0;
  p.push(<Box key="fl" name={`${id}fl`} x={x} z={z0} w={10} h={0.12} d={9} col={G.floor} />);
  p.push(<Box key="wb" name={`${id}wb`} x={x} z={z0 - 4.5} w={10} h={1.4} d={0.25} col={G.wall} />);
  p.push(<Box key="wl" name={`${id}wl`} x={x - 5} z={z0} w={0.25} h={1.4} d={9} col={G.wall} />);
  p.push(<Box key="wf1" name={`${id}wf1`} x={x - 3.2} z={z0 + 4.5} w={3.6} h={0.5} d={0.15} col={G.top} />);
  p.push(<Box key="wf2" name={`${id}wf2`} x={x + 3.2} z={z0 + 4.5} w={3.6} h={0.5} d={0.15} col={G.top} />);
  // aisles of shelves with stock on them; the hero's shelves glow green when the brands pay (L04-L05)
  const paid = hero && f >= C.shelf ? K(f, C.shelf, 30) : 0;
  [-3, -1.2, 0.6].forEach((dz, i) => {
    p.push(<Box key={`sh${i}`} name={`${id}sh${i}${paid > 0 ? "g" : ""}`} x={x - 0.6} z={z0 + dz} w={6.4} h={1.5} d={0.6} col={paid > 0 ? "#2F4A1F" : G.body} glow={paid > 0 ? 0.25 * paid : hl ? 0.18 * hl : undefined} />);
    for (let k = 0; k < 6; k++) p.push(<Box key={`st${i}${k}`} name={`${id}st${i}${k}`} x={x - 3.4 + k * 1.12} z={z0 + dz} w={0.8} h={0.32} d={0.5} y0={1.5} col={k % 3 === 0 ? G.light : G.top} />);
  });
  p.push(<Box key="co" name={`${id}co`} x={x + 3.4} z={z0 + 2.6} w={1.4} h={1.0} d={0.8} col={G.top} />);
  return <>{p}</>;
}
function Street({ f }: { f: number }) {
  const p: any[] = [];
  p.push(<Box key="road" name="road" x={0} z={7} w={60} h={0.04} d={5} col={"#141518"} />);
  for (let i = -6; i <= 6; i++) p.push(<Box key={`dash${i}`} name={`dash${i}`} x={i * 4} z={7} w={1.6} h={0.05} d={0.14} col={G.light} />);
  p.push(<Box key="lane" name="lane" x={-4} z={-8.6} w={40} h={0.04} d={3.2} col={"#141518"} />);
  p.push(<Unit key="ua" id="ua" x={-10.5} f={f} />);
  p.push(<Unit key="u99" id="u99" x={0} f={f} hero />);
  p.push(<Unit key="ub" id="ub" x={10.5} f={f} />);
  // the 99 sign board with the real logo, standing on the front
  p.push(<Box key="board" name="board" x={0} z={3.15} w={6.2} h={1.25} d={0.18} y0={1.0} col={"#0E7A3B"} />);
  p.push(<ImagePlane key="sign" src={staticFile("logo99.png")} width={5.4} position={[0, 1.62, 3.26]} />);
  // houses across the road ("right next to your house")
  [-13, -7.5, -2, 3.5, 9, 14.5].forEach((x, i) => {
    p.push(<Box key={`h${i}`} name={`h${i}`} x={x} z={12.5} w={4.6} h={1.7} d={4.2} col={G.wall} />);
    p.push(<Box key={`hr${i}`} name={`hr${i}`} x={x} z={12.5} w={4.9} h={0.35} d={4.5} y0={1.7} col={G.body} />);
    p.push(<Box key={`hd${i}`} name={`hd${i}`} x={x + 1.2} z={14.65} w={0.9} h={1.2} d={0.1} col={G.top} />);
  });
  // the warehouse (DC) at the end of the back lane
  p.push(<Box key="dc" name="dc" x={DC[0]} z={DC[2]} w={8} h={3.2} d={5} col={G.body} />);
  [-2, 0, 2].forEach((dx, i) => p.push(<Box key={`dcd${i}`} name={`dcd${i}`} x={DC[0] + dx} z={DC[2] + 2.55} w={1.4} h={1.8} d={0.08} col={G.wall} />));
  // shoppers walking along the road and in at the door; the green "you" among them
  for (let i = 0; i < 8; i++) {
    const ph = (f / 360 + i / 8) % 1, x = L(-18 + i * 3, 0, ph), z = ph < 0.8 ? L(9.5, 4.6, ph / 0.8) : L(4.6, 2.2, (ph - 0.8) / 0.2);
    p.push(<Person key={`sp${i}`} name={`sp${i}`} x={x} z={z} s={1.5} col={i === 3 ? G.green : G.person} glow={i === 3 ? 0.2 : undefined} />);
  }
  // brand trucks on the back lane: they light up as the brands are named
  [[-15, -8.6], [-4, -8.6], [6, -8.6]].forEach(([x, z], i) => {
    const lit = K(f, C.cust - 30 + i * 8, 20);
    p.push(<Mesh3d key={`tr${i}${lit > 0 ? "g" : ""}`} name={`tr${i}${lit > 0 ? "g" : ""}`} transform={Transform.fromXyz(x + 0.4 * Math.sin(f / 50 + i), 0.04, z).withRotation(Quat.fromEuler("XYZ", 0, Math.PI / 2, 0))} shape={solids().truck}>
      <StandardMaterial base_color={lit > 0 ? "#3E5A2A" : G.light} perceptual_roughness={0.6} emissive={lit > 0 ? glowG(0.35 * lit) : undefined} /></Mesh3d>);
  });
  return <>{p}</>;
}

// ---------- the coin ----------
function Coin({ f }: { f: number }) {
  if (f < C.s3 - 30 || f > C.s4 + 60) return null;
  const app = K(f, C.s3 - 20, 30), split = K(f, C.keeps, 50, io), five = K(f, C.five, 40, io);
  const restAt: V3 = L3([COIN[0], 0.05, COIN[2]], [COIN[0] - 2.2, 0.05, COIN[2] + 0.4], split);
  const keepAt: V3 = L3(L3([COIN[0], 0.05, COIN[2]], [COIN[0] + 1.0, 0.05, COIN[2] - 0.6], split), [STORE[0] + 0.5, 0.05, 3.4], five);
  return <>
    <Mesh3d name="coinrest" transform={Transform.fromXyz(...restAt).withScale([app, app, app])} shape={solids().rest}><StandardMaterial base_color={G.light} perceptual_roughness={0.4} metallic={0.5} /></Mesh3d>
    <Mesh3d name="coinkeep" transform={Transform.fromXyz(...keepAt).withScale([app, app, app])} shape={solids().keep}><StandardMaterial base_color={G.green} emissive={glowG(0.4 + 1.6 * five)} /></Mesh3d>
    <Mesh3d name="rm1" transform={Transform.fromXyz(restAt[0] - 0.2, 0.42, restAt[2]).withRotation(Quat.fromEuler("XYZ", -Math.PI / 2, 0, 0)).withScale([app, app, app])}>
      <Text3D size={1.0} depth={0.06}>RM1</Text3D><StandardMaterial base_color={G.ink} /></Mesh3d>
  </>;
}

// ---------- brand money: green tokens from the trucks into the store, one stream per fee ----------
function Tokens({ f }: { f: number }) {
  if (f < C.shelf - 20 || f > C.s5 + 200) return null;
  const streams = [C.shelf, C.targets, C.ware];
  const src: V3[] = [[-15, 1.6, -8.6], [-4, 1.6, -8.6], [DC[0], 3.4, DC[2]]];
  const out: any[] = [];
  streams.forEach((at, s) => {
    for (let i = 0; i < 6; i++) {
      const t0 = at + i * 9, u = K(f, t0, 46, io);
      if (u <= 0 || u >= 1) continue;
      const a = src[s], b: V3 = [STORE[0] - 3 + i * 1.1, 2.1, STORE[2] + [-3, -1.2, 0.6][s]];
      const p = L3(a, b, u); p[1] += Math.sin(u * Math.PI) * 3;
      out.push(<Mesh3d key={`tk${s}${i}`} name={`tk${s}${i}`} transform={Transform.fromXyz(...p).withRotation(Quat.fromEuler("XYZ", 0, f * 0.1, 0))} shape={solids().token}>
        <StandardMaterial base_color={G.green} emissive={glowG(1.6)} /></Mesh3d>);
    }
  });
  return <>{out}</>;
}

// ---------- the profit pillar: about half from the brands (2Q FY2024, The Edge) ----------
function Pillar({ f }: { f: number }) {
  const app = K(f, C.y2024, 30, io), half = K(f, C.half, 40, io);
  if (app <= 0 || f > C.s5 + 60) return null;
  const H = 6 * app, g = H * 0.48 * half;
  return <>
    <Mesh3d name="pilgrey" transform={Transform.fromXyz(PILLAR[0], g + (H - g) / 2, PILLAR[2]).withScale([1.6, Math.max(0.01, H - g), 1.6])}><Cuboid half_size={[0.5, 0.5, 0.5]} /><StandardMaterial base_color={G.top} perceptual_roughness={0.6} /></Mesh3d>
    {g > 0.01 && <Mesh3d name="pilgreen" transform={Transform.fromXyz(PILLAR[0], g / 2, PILLAR[2]).withScale([1.6, g, 1.6])}><Cuboid half_size={[0.5, 0.5, 0.5]} />
      <StandardMaterial base_color={G.green} emissive={glowG(0.9)} /></Mesh3d>}
  </>;
}

// ---------- the country: stores out of Klang ----------
function Country({ f }: { f: number }) {
  if (f < C.s2 - 20 || f > C.next + 100) return null;
  const k = TILE * 200, kl = myAt(KL[0], KL[1]);
  return <>
    <Mesh3d name="mys" transform={Transform.fromXyz(MY[0], -0.02, MY[2]).withScale([k, 0.3, k])} shape={reliefSolid(mys)}><StandardMaterial base_color={G.body} perceptual_roughness={0.8} /></Mesh3d>
    {mys.dots.map((d: number[], i: number) => {
      const p = myAt(d[0], d[1]), dist = Math.hypot(p[0] - kl[0], p[2] - kl[2]), g = K(f, C.s2 + 20 + dist * 3.2, 14);
      if (g <= 0) return null;
      return <Mesh3d key={i} name={`st${i}`} transform={Transform.fromXyz(p[0], 0.16 * g, p[2]).withScale([0.22, 0.3 * g, 0.22])}><Cuboid half_size={[0.5, 0.5, 0.5]} />
        <StandardMaterial base_color={G.green} emissive={glowG(0.5 + 1.4 * Math.max(0, 1 - (f - (C.s2 + 20 + dist * 3.2)) / 30))} /></Mesh3d>;
    })}
  </>;
}

function Headline({ f, at, a, b }: { f: number; at: number; a: string; b: string }) {
  const t = K(f, at, 18);
  return <div style={{ position: "absolute", left: 72, right: 140, top: 200, fontFamily: "Inter Display", fontWeight: 800, fontSize: 88, lineHeight: "98px", letterSpacing: -2, color: G.ink,
    opacity: t, transform: `translateY(${L(20, 0, t)}px)` }}>{a} <span style={{ color: G.green }}>{b}</span></div>;
}

function Piece() {
  const f = useCurrentFrame(), cam = camAt(f), end = C.follow;
  const ic = (n: string, col = G.green) => <Icon name={n} size={44} color={col} />;
  const away = K(f, C.s2 - 6, 50), backT = K(f, C.next - 20, 60);
  const streetScale = f < C.s2 ? 1 : L(L(1, 0.04, away), 1, backT);
  const count = Math.round(L(0, 3151, K(f, C.s2 + 20, Math.max(30, C.house - C.s2 - 40), (x) => x)));
  const head = f < C.s2 ? ["Not its only", "customer.", f < C.not ? -12 : C.not] : f < C.next ? [count.toLocaleString("en-US"), "stores.", C.s2]
    : f < C.s3 ? ["Next to", "your house.", C.next] : f < C.s4 ? ["5 sen of", "every RM1.", C.s3] : f < C.y2024 ? ["Brands", "pay too.", C.s4]
    : f < C.s5 ? ["Nearly half", "its profit.", C.y2024] : ["Every shelf,", "paid twice.", C.s5];
  return (
    <AbsoluteFill style={{ background: G.ground }}>
      {f < end + 10 && <IsoStage cam={cam}>
        <Entity transform={Transform.fromXyz(0, 0, 0).withScale([streetScale, streetScale, streetScale])}><Street f={f} /></Entity>
        <Country f={f} />
        <Coin f={f} />
        <Tokens f={f} />
        <Pillar f={f} />
      </IsoStage>}
      {/* the brand, flat, over the opening (as in EX24) */}
      {f < C.not + 30 && <img src={staticFile("logo99.png")} style={{ position: "absolute", left: 540 - 300, top: 640, width: 600, height: 121,
        opacity: 1 - K(f, C.not, 24), transform: `scale(${L(1.06, 1, K(f, -20, 60))})`, filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.6))" }} />}
      {/* pins */}
      {f >= C.s2 + 30 && f < C.next - 10 && <Pin cam={cam} at={myAt(KL[0], KL[1])} dx={60} dy={-240} t={K(f, C.s2 + 30, 16)} title="Klang, 1987" sub="the first shop" icon={ic("store")} />}
      {f >= C.next && f < C.s3 && <Pin cam={cam} at={[2, 2.0, 12.5]} dx={-60} dy={-300} t={K(f, C.next, 16)} title="Next to your house" sub="neighbourhood shophouses" icon={ic("map-pin")} align="right" />}
      {f >= C.cheap && f < C.s3 && <Pin cam={cam} at={[STORE[0] - 3, 1.4, STORE[2] - 4.5]} dx={-40} dy={-240} t={K(f, C.cheap, 16)} title="Cheap rent" sub="neighbourhood shophouse units" icon={ic("badge-percent")} align="right" />}
      {f >= C.layout && f < C.s3 && <Pin cam={cam} at={[10.5, 1.6, STORE[2]]} dx={-30} dy={-220} t={K(f, C.layout, 16)} title="One layout" sub="copied 3,151 times" icon={ic("check")} align="right" />}
      {f >= C.keeps && f < C.s4 && <Pin cam={cam} at={[COIN[0] - 2.2, 0.5, COIN[2] + 0.4]} dx={-40} dy={-240} t={K(f, C.keeps, 16)} title="95 sen" sub="stock, rent, staff, trucks" icon={ic("truck", G.ink)} align="right" />}
      {f >= C.five && f < C.s4 && <Pin cam={cam} at={[STORE[0] + 0.5, 0.4, 3.4]} dx={40} dy={-300} t={K(f, C.five, 16)} title="5 sen kept" sub="net margin 5.3%, 2Q 2026" icon={ic("coins")} />}
      {f >= C.shelf && f < C.targets && <Pin cam={cam} at={[STORE[0] - 0.6, 1.8, STORE[2] - 3]} dx={40} dy={-260} t={K(f, C.shelf, 14)} title="Display fee" sub="to sit on the shelf" icon={ic("tag")} />}
      {f >= C.targets && f < C.ware && <Pin cam={cam} at={[-4, 2, -8.6]} dx={40} dy={-260} t={K(f, C.targets, 14)} title="Sales-target bonus" sub="paid by the brand" icon={ic("hand-coins")} />}
      {f >= C.ware && f < C.y2024 + 30 && <Pin cam={cam} at={[DC[0], 3.4, DC[2]]} dx={40} dy={-240} t={K(f, C.ware, 14)} title="Warehouse fee" sub="to use its 22 warehouses" icon={ic("warehouse")} />}
      {f >= C.half && f < C.s5 && <Pin cam={cam} at={[PILLAR[0], 2.0, PILLAR[2]]} dx={-60} dy={-260} t={K(f, C.half, 16)} title="≈ half from brands" sub="operating profit, 2Q FY2024" icon={ic("coins")} align="right" />}
      {f >= C.part && f < end && <Pin cam={cam} at={[10.5, 1.6, STORE[2]]} dx={-40} dy={-280} t={K(f, C.part, 16)} title="Part 2: Mr DIY" sub="follow so you don't miss it" icon={ic("arrow-right")} align="right" />}
      {f < end && <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 540, background: "linear-gradient(to bottom, rgba(10,10,12,0.92), rgba(10,10,12,0))" }} />}
      {f < end && <Headline key={head[1] as string} f={f} at={head[2] as number} a={head[0] as string} b={head[1] as string} />}
      {f >= end - 4 && <EndCard f={Math.floor(f / 2)} at={Math.floor(end / 2)} next="Part 2: Mr DIY →" />}
      {f < end && <Captions blocks={caps as any} frame={f} fps={FPS} />}
      <Audio src={staticFile("mix.wav")} />
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="ex25" component={Piece} width={1080} height={1920} fps={FPS} durationInFrames={N} />);
