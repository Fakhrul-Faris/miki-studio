// EX24 v3 "The Machine Isn't Broken" — smooth isometric v2 (user 2026-11-07: "stick to what performed … smooth
// isometric … go way and beyond"). EX14's language on raea at 60 fps: one orthographic camera that never stops, the
// green accent on the one subject, Isotype people, pinned infographic labels, real logo on the kiosks. Cues are spoken
// words (../audio/vo_timeline.json at 60 fps). Earlier versions: edit_v1.tsx (flat UI), edit_v2_clay.tsx (clay).
import { AbsoluteFill, Audio, Composition, Easing, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { Entity, Screen, Text3D } from "raea/3d";
import { Cuboid, Cylinder, Mesh3d, Torus } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { Quat, Transform } from "raea/transform";
import { LinearRgba, Srgba } from "raea/color";
import { Box, G, ISO, IsoStage, Person, Pin, Ribbon, glowG, type Cam, type V3 } from "../../../tools/raea/kit/iso";
import { reliefSolid } from "../../../tools/raea/kit/clay";
import { EndCard, words } from "../../../tools/raea/kit/ui";
import { Icon } from "../../../tools/raea/kit/icons";
import { Captions } from "../../../tools/raea/kit/Captions";
import tl from "../audio/vo_timeline.json";
import caps from "./captions60.json";
import usa from "../../../tools/raea/kit/geo/usa.json";
import mys from "../../../tools/raea/kit/geo/malaysia.json";

const FPS = 60, w = words(tl, FPS), N = Math.ceil((tl as any).end * FPS) + 30;
const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const io = Easing.bezier(0.65, 0, 0.35, 1), out = Easing.bezier(0.16, 1, 0.3, 1);       // the signature easing + its settle
const K = (f: number, a: number, d = 24, e = out) => interpolate(f, [a, a + d], [0, 1], { ...CL, easing: e });
const L = (a: number, b: number, t: number) => a + (b - a) * t;
const RED = "#FF5A4E", BLUE = "#5BB4FF";
const glow = (hex: string, k: number) => LinearRgba.from(Srgba.hex(hex)).mul(k);
const MACH: V3 = [2.4, 1.6, -3.25];
const TILE = 0.032, US_C: V3 = [0, 0, 0], MY_C: V3 = [60, 0, 0];
const usAt = (d: number[]): V3 => [US_C[0] + (d[0] - usa.w / 2) * TILE, 0, US_C[2] + (d[1] - usa.h / 2) * TILE];
const KLANG = [87.8, 262.3], myAt = (x: number, y: number): V3 => [MY_C[0] + (x - mys.w / 2) * TILE, 0, MY_C[2] + (y - mys.h / 2) * TILE];

// ---------- cues ----------
const C = {
  broken: w("L01", "broken"), notb: w("L01", "not"), clean: w("L01", "cleaning"),
  s2: w("L02"), heats: w("L02", "heats"), deg: w("L02", "degrees"), frz: w("L02", "freezes"), takes: w("L02", "takes"), hours: w("L02", "hours"),
  s3: w("L03"), fails: w("L03", "fails"), starts: w("L03", "starts"), locked: w("L03", "locked"), so: w("L03", "so"), waitw: w("L03", "wait"),
  s4: w("L04"), checks: w("L04", "checks"), about: w("L04", "about"), mal: w("L04", "malaysia"),
  s5: w("L05"), which: w("L05", "which"), branch: w("L05", "branch"), follow: w("L05", "follow"),
};

// ---------- the camera: one take ----------
function camAt(f: number): Cam {
  const sw = K(f, -24, 110, io);                                              // frame 0 is mid-swoop
  let t: V3 = [0.6, 0.6, -0.4], h = L(26, 19, sw) - 0.004 * f, yaw = ISO.yaw * (0.55 + 0.45 * sw), pitch = L(1.35, ISO.pitch, sw);
  const push = K(f, C.s2 - 10, 70, io);                                       // L02: into the machine
  t = [L(t[0], MACH[0], push), L(t[1], 1.2, push), L(t[2], MACH[2], push)]; h = L(h, 8.6, push) - 0.002 * Math.max(0, f - C.s2);
  const back = K(f, C.so - 10, 110, io);                                      // L03: pull back for the technician's road
  const [tx, tz] = techAt(f), fol = K(f, C.waitw, 40, io);
  t = [L(t[0], L(12, (tx + 6) / 2, fol), back), t[1], L(t[2], L(8, (tz + 4) / 2, fol), back)]; h = L(h, 34, back);
  const morph = K(f, C.s4 - 6, 90, io);                                       // L04: the store becomes one of the US's stores
  t = [L(t[0], US_C[0], morph), L(t[1], 0, morph), L(t[2], US_C[2] + 1, morph)]; h = L(h, 52, morph) + 0.01 * Math.max(0, f - C.s4) * (1 - K(f, C.mal - 30, 60));
  const pan = K(f, C.mal - 26, 70, io);                                       // … then across to Malaysia
  t = [L(t[0], MY_C[0], pan), t[1], L(t[2], MY_C[2] + 1, pan)]; h = L(h, 48, pan);
  const into = K(f, C.s5, 120, io);                                           // L05: down onto the map
  t = [L(t[0], myAt(KLANG[0], KLANG[1])[0] + 6, into), t[1], L(t[2], myAt(KLANG[0], KLANG[1])[2] + 1, into)]; h = L(h, 30, into) - 0.004 * Math.max(0, f - C.s5);
  return { t, yaw, pitch, height: h };
}

// ---------- the store ----------
function Kiosk({ f }: { f: number }) {
  const ok = f >= C.clean;
  return <div style={{ position: "absolute", inset: 0, background: "#F6F3EE", fontFamily: "Inter Display" }}>
    <div style={{ height: 66, background: "#DA291C", display: "flex", alignItems: "center", gap: 10, padding: "0 14px" }}>
      <img src={staticFile("mcdonalds_arches.svg")} style={{ width: 42, height: 36 }} /><span style={{ color: "#fff", fontSize: 24, fontWeight: 700 }}>Desserts</span></div>
    <div style={{ margin: 12, padding: "14px 14px", borderRadius: 12, background: "#fff" }}>
      <div style={{ fontSize: 26, fontWeight: 700, color: "#222" }}>Sundae</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: ok ? "#2E8B00" : "#DA291C", marginTop: 4 }}>{ok ? "Cleaning cycle" : f >= C.broken ? "Unavailable" : "Add"}</div>
    </div>
    {[0, 1].map((i) => <div key={i} style={{ margin: "0 12px 12px", height: 54, borderRadius: 12, background: "#fff" }} />)}
  </div>;
}

function machineState(f: number) {
  if (f < C.clean) return "idle";
  if (f < C.heats) return "clean";
  if (f < C.frz) return "hot";
  if (f < C.s3) return "cold";
  if (f >= C.fails && f < C.starts + 20) return "fault";
  if (f >= C.locked) return "locked";
  return "clean";
}

function Dial({ f }: { f: number }) {
  // the signature: 48 ticks round the machine fill as the 4 hours run; a failed cycle empties them red, then restarts
  const fill = f < C.takes ? 0 : f < C.fails ? K(f, C.takes, 90, io) : f < C.starts ? 1 - K(f, C.fails + 6, 40) : f < C.locked ? 0.45 * K(f, C.starts, 120, io) : 0.45;
  const red = f >= C.fails && f < C.starts + 10;
  const vis = K(f, C.takes - 12, 18) * (1 - K(f, C.so + 40, 30));
  if (vis <= 0) return null;
  const ticks: any[] = [];
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2, x = MACH[0] + Math.sin(a) * 1.15, z = MACH[2] + Math.cos(a) * 1.15, lit = i / 48 < fill;
    const nm = `tk${i}${lit ? (red ? "r" : "g") : ""}`;
    ticks.push(<Mesh3d key={nm} name={nm} transform={Transform.fromXyz(x, 1.1, z).withRotation(Quat.fromEuler("XYZ", 0, a, 0)).withScale([0.06, 0.04 * vis, 0.22])}>
      <Cuboid half_size={[0.5, 0.5, 0.5]} />
      <StandardMaterial base_color={lit ? (red ? RED : G.green) : G.wall} perceptual_roughness={0.5} emissive={lit ? glow(red ? RED : G.green, 1.6) : undefined} /></Mesh3d>);
  }
  return <>{ticks}</>;
}

function Store({ f }: { f: number }) {
  const parts: any[] = [];
  parts.push(<Box key="floor" name="floor" x={0} z={0} w={16} h={0.12} d={12} col={G.floor} />);
  for (const [n, x, z, ww, d] of [["wN", 0, -6, 16, 0.25], ["wW", -8, 0, 0.25, 12], ["wE", 8, -1.5, 0.25, 9]] as [string, number, number, number, number][])
    parts.push(<Box key={n} name={n} x={x} z={z} w={ww} h={1.1} d={d} col={G.wall} />);
  parts.push(<Box key="glass" name="glass" x={-1} z={6} w={14} h={0.5} d={0.12} col={G.top} />);
  parts.push(<Box key="ctr" name="ctr" x={-2.5} z={-3.2} w={7.5} h={1.05} d={1.0} col={G.body} />);
  parts.push(<Box key="ctr2" name="ctr2" x={-6.2} z={-1.2} w={1.0} h={1.05} d={3.0} col={G.body} />);
  [-5, -3, -1].forEach((x, i) => {
    parts.push(<Box key={`reg${i}`} name={`reg${i}`} x={x} z={-3.1} w={0.5} h={0.35} d={0.4} y0={1.05} col={G.light} />);
    parts.push(<Box key={`mb${i}`} name={`mb${i}`} x={x} z={-5.7} w={1.6} h={0.9} d={0.08} y0={2.0} col={G.top} />);
  });
  [-6, -4.5, -3].forEach((x, i) => parts.push(<Box key={`kit${i}`} name={`kit${i}`} x={x} z={-5.0} w={1.2} h={1.0} d={0.9} col={G.wall} />));
  // dessert station + the machine (its states are separate parts: one glow colour per part)
  const st = machineState(f), pulse = 0.85 + 0.3 * Math.sin(f / 9);
  const em: Record<string, any> = { clean: glowG(0.22 * pulse), hot: glow(RED, 0.25 + 0.9 * K(f, C.heats, Math.max(10, C.deg - C.heats), (x) => x)), cold: glow(BLUE, 0.7 * K(f, C.frz, 20)),
    fault: glow(RED, 0.5 + 0.4 * Math.sin(f / 3)), locked: undefined, idle: undefined };
  const col: Record<string, string> = { clean: G.top, hot: "#7A4A48", cold: "#56708A", fault: "#6A3E3C", locked: G.top, idle: G.top };
  parts.push(<Box key="dst" name="dst" x={2.4} z={-3.2} w={2.4} h={1.05} d={1.0} col={G.body} />);
  parts.push(<Box key={`mach-${st}`} name={`mach-${st}`} x={MACH[0]} z={MACH[2]} w={0.95} h={1.15} d={0.75} y0={1.05} col={col[st]} />);
  if (em[st]) parts.push(<Mesh3d key={`machglow-${st}`} name={`machglow-${st}`} transform={Transform.fromXyz(MACH[0], 1.62, MACH[2] + 0.38)}>
    <Cuboid half_size={[0.42, 0.5, 0.01]} /><StandardMaterial base_color={col[st]} emissive={em[st]} /></Mesh3d>);
  parts.push(<Box key="hop" name="hop" x={2.4} z={-3.3} w={0.8} h={0.2} d={0.6} y0={2.2} col={G.light} />);
  [2.2, 2.6].forEach((x, i) => parts.push(<Mesh3d key={`sp${i}`} name={`sp${i}`} transform={Transform.fromXyz(x, 1.3, -2.85)}><Cylinder radius={0.06} half_height={0.1} /><StandardMaterial base_color={G.light} /></Mesh3d>));
  if (f >= C.clean && f < C.takes) parts.push(<Mesh3d key="ring" name="ring" transform={Transform.fromXyz(2.4, 1.08, -3.2).withRotation(Quat.fromEuler("XYZ", Math.PI / 2, 0, f * 0.03)).withScale([K(f, C.clean, 20), K(f, C.clean, 20), 1])}>
    <Torus major_radius={0.85} minor_radius={0.035} /><StandardMaterial base_color={G.green} emissive={glowG(2.0 * pulse)} /></Mesh3d>);
  parts.push(<Dial key="dial" f={f} />);
  // the padlock drops on "locked"
  const lk = K(f, C.locked, 22);
  if (lk > 0) {
    parts.push(<Box key="lockb" name="lockb" x={MACH[0]} z={MACH[2] + 0.42} w={0.36} h={0.3} d={0.14} y0={L(3.4, 1.25, lk)} col={"#D4A72C"} rough={0.4} />);
    parts.push(<Mesh3d key="locks" name="locks" transform={Transform.fromXyz(MACH[0], L(3.4, 1.25, lk) + 0.36, MACH[2] + 0.42)}><Torus major_radius={0.11} minor_radius={0.028} /><StandardMaterial base_color="#C9CDD4" perceptual_roughness={0.3} metallic={0.6} /></Mesh3d>);
  }
  // kiosks with live screens (the real logo)
  [[-1.5, 2.2], [0.3, 2.2], [2.1, 2.2]].forEach(([x, z], i) => {
    parts.push(<Box key={`k${i}`} name={`k${i}`} x={x} z={z} w={0.7} h={1.7} d={0.25} col={G.body} />);
    parts.push(<Screen key={`ks${i}`} name={`ks${i}`} crt={false} resolution={[200, 300]} size={[0.56]} position={[x, 1.2, z + 0.135]}><Kiosk f={f} /></Screen>);
  });
  [[4.5, 0.5], [6.4, 0.5], [4.5, 3.4], [6.4, 3.4], [-5.5, 3.6], [-3.6, 4.3]].forEach(([x, z], i) => {
    parts.push(<Box key={`t${i}`} name={`t${i}`} x={x} z={z} w={1.2} h={0.75} d={1.2} col={G.body} />);
    [[-0.85, 0], [0.85, 0], [0, -0.85], [0, 0.85]].forEach(([a, b], j) => parts.push(<Box key={`s${i}${j}`} name={`s${i}${j}`} x={x + a} z={z + b} w={0.42} h={0.45} d={0.42} col={G.wall} />));
  });
  [[-7.3, 5.3], [7.3, 5.3]].forEach(([x, z], i) => parts.push(<Box key={`bin${i}`} name={`bin${i}`} x={x} z={z} w={0.6} h={0.9} d={0.6} col={G.top} />));
  // people (ambient life: the queue shuffles a little), the green "you" walks to the machine on the path
  [[-1.5, 3.3], [0.3, 3.4], [0.3, 4.4], [2.1, 3.3], [4.5, 1.4], [6.4, -0.4], [-5.5, 4.5], [-3.6, 5.2]].forEach(([x, z], i) =>
    parts.push(<Person key={`p${i}`} name={`p${i}`} x={x + 0.06 * Math.sin(f / 40 + i)} z={z} />));
  const pathPts: [number, number][] = [[0.3, 5.6], [0.3, 0.6], [2.4, 0.6], [2.4, -1.6]];
  const walk = K(f, 8, 220, io), drawn = K(f, 0, 160, io);
  const segL = [5, 2.1, 2.2], tot = 9.3; let s = walk * tot, px = 0.3, pz = 5.6;
  for (let i = 0; i < 3; i++) { const a = pathPts[i], b = pathPts[i + 1], l = Math.min(s, segL[i]); px = a[0] + (b[0] - a[0]) * (l / segL[i]); pz = a[1] + (b[1] - a[1]) * (l / segL[i]); s -= l; if (s <= 0) break; }
  parts.push(<Ribbon key="path" name="path" pts={pathPts} drawn={drawn} y={0.15} />);
  parts.push(<Person key="you" name="you" x={px} z={pz} col={G.green} glow={0.25} />);
  return <>{parts}</>;
}

// ---------- the technician's long road (L03) ----------
const ROAD: [number, number][] = [[30, 30], [30, 9], [0.3, 9], [0.3, 6.2]];
function techAt(f: number): [number, number] {
  const walk = K(f, C.waitw, 150, (x) => x), segs = [21, 29.7, 2.8], tot = 53.5; let s = walk * tot, x = 30, z = 30;
  for (let i = 0; i < 3; i++) { const a = ROAD[i], b = ROAD[i + 1], l = Math.min(s, segs[i]); x = a[0] + (b[0] - a[0]) * (l / segs[i]); z = a[1] + (b[1] - a[1]) * (l / segs[i]); s -= l; if (s <= 0) break; }
  return [x, z];
}
function Road({ f }: { f: number }) {
  if (f < C.so - 20 || f > C.s4 + 90) return null;
  const [x, z] = techAt(f);
  return <><Ribbon name="road" pts={ROAD} drawn={K(f, C.so, 70, io)} y={0.03} w={0.3} glow={0.9} /><Person name="tech" x={x} z={z} col="#C9CDD4" s={1.8} /></>;
}

// ---------- the maps (L04-L05) ----------
function USMap({ f }: { f: number }) {
  if (f < C.s4 - 10) return null;
  const k = TILE * 200, o = K(f, C.s4, 40);
  return <><Mesh3d name="usa" transform={Transform.fromXyz(US_C[0], -0.02, US_C[2]).withScale([k, 0.3 * o + 0.01, k])} shape={reliefSolid(usa)}><StandardMaterial base_color={G.floor} perceptual_roughness={0.8} /></Mesh3d>
  {usa.dots.map((d: number[], i: number) => {
    const p = usAt(d), g = K(f, C.s4 + 10 + (i % 60), 20);
    if (g <= 0) return null;
    const sweep = C.checks + (d[0] / usa.w) * 70, pinged = f >= sweep, bad = f >= C.about + (i % 9) * 2 && i % 10 === 3;
    const nm = `us${i}${bad ? "r" : pinged ? "g" : ""}`;
    return <Mesh3d key={nm} name={nm} transform={Transform.fromXyz(p[0], 0.18 * g, p[2]).withScale([0.24, 0.3 * g, 0.24])}>
      <Cuboid half_size={[0.5, 0.5, 0.5]} />
      <StandardMaterial base_color={bad ? RED : pinged ? G.green : G.top} perceptual_roughness={0.6}
        emissive={bad ? glow(RED, 1.5) : pinged ? glowG(0.5 + 1.2 * Math.max(0, 1 - (f - sweep) / 40)) : undefined} /></Mesh3d>;
  })}</>;
}
function MYMap({ f }: { f: number }) {
  if (f < C.mal - 40) return null;
  const k = TILE * 200;                                                       // reliefSolid is 200 px per metre
  const pin = K(f, C.branch, 16), kp = myAt(KLANG[0], KLANG[1]);
  return <>
    <Mesh3d name="mys" transform={Transform.fromXyz(MY_C[0], 0, MY_C[2]).withScale([k, 0.4, k])} shape={reliefSolid(mys)}><StandardMaterial base_color={G.floor} perceptual_roughness={0.8} /></Mesh3d>
    {f < C.branch + 24 && <Mesh3d name="qmark" transform={Transform.fromXyz(MY_C[0] + 2, 2.2 + 0.15 * Math.sin(f / 30), MY_C[2] - 1).withScale([1 - K(f, C.branch, 24), 1 - K(f, C.branch, 24), 1 - K(f, C.branch, 24)])}><Text3D size={3.2} depth={0.4}>?</Text3D>
      <StandardMaterial base_color={G.green} emissive={glowG(0.9 * K(f, C.mal, 20))} /></Mesh3d>}
    {pin > 0 && <Mesh3d name="first" transform={Transform.fromXyz(kp[0], 0.25 * pin, kp[2]).withScale([0.45, 0.6 * pin, 0.45])}><Cuboid half_size={[0.5, 0.5, 0.5]} />
      <StandardMaterial base_color={G.green} emissive={glowG(2)} /></Mesh3d>}
  </>;
}

// ---------- 2D on top: headline, the comment ----------
function Headline({ f, at, a, b }: { f: number; at: number; a: string; b: string }) {
  const t = K(f, at, 18);
  return <div style={{ position: "absolute", left: 72, right: 140, top: 200, fontFamily: "Inter Display", fontWeight: 800, fontSize: 88, lineHeight: "98px", letterSpacing: -2, color: G.ink,
    opacity: t, transform: `translateY(${L(20, 0, t)}px)` }}>{a} <span style={{ color: G.green }}>{b}</span></div>;
}
function Comment({ f }: { f: number }) {
  const t = K(f, C.which, 20), typed = "machine rosak at my branch";
  const n = Math.floor(interpolate(f, [C.which + 30, C.which + 30 + typed.length * 2.4], [0, typed.length], CL));
  if (t <= 0) return null;
  return <div style={{ position: "absolute", left: 90, right: 90, top: 1060, opacity: t, transform: `translateY(${L(30, 0, t)}px)`, padding: "28px 32px", borderRadius: 28,
    background: "rgba(14,14,16,0.9)", border: "2px solid rgba(255,255,255,0.08)", fontFamily: "Inter Display" }}>
    <div style={{ display: "flex", gap: 14, alignItems: "center", fontSize: 30, color: G.dim }}><Icon name="message-circle" size={34} color={G.dim} />Comments</div>
    <div style={{ marginTop: 18, fontSize: 40, color: G.ink }}>{typed.slice(0, n)}<span style={{ color: G.green, opacity: Math.floor(f / 24) % 2 ? 0 : 1 }}>|</span></div>
  </div>;
}

function Piece() {
  const f = useCurrentFrame(), cam = camAt(f);
  const morph = K(f, C.s4 - 6, 70, io);                                       // the store shrinks to one tile
  const ic = (n: string, col = G.green, spin = false) => <Icon name={n} size={44} color={col} style={spin ? { transform: `rotate(${f * 4}deg)` } : undefined} />;
  const left = Math.max(0, 4 * 3600 * (1 - K(f, C.takes, 90, io)));
  const head = f < C.s2 ? ["Not broken.", "Cleaning.", -12] : f < C.s3 ? ["66 °C, then", "4 hours.", C.s2] : f < C.s4 ? [f < C.locked ? "One fail," : "Repairs", f < C.locked ? "start over." : "locked.", f < C.locked ? C.s3 : C.locked]
    : f < C.mal ? ["1 in 10", "say no.", C.s4] : f < C.s5 ? ["Malaysia?", "Nobody checked.", C.mal] : ["Drop the", "branch.", C.s5];
  const end = C.follow, [tx, tz] = techAt(f);
  return (
    <AbsoluteFill style={{ background: G.ground }}>
      {f < end + 10 && <IsoStage cam={cam}>
        {morph < 1 && <Entity transform={Transform.fromXyz(0, 0, 0).withScale([L(1, 0.03, morph), L(1, 0.03, morph), L(1, 0.03, morph)])}><Store f={f} /></Entity>}
        <Road f={f} />
        <USMap f={f} />
        <MYMap f={f} />
      </IsoStage>}
      {f < C.s2 && <Pin cam={cam} at={[2.4, 2.4, -3.25]} dx={-60} dy={-300} t={K(f, C.clean, 20)} title="Heat-treat cycle" sub="running, not broken" icon={ic("refresh-cw", G.green, true)} align="right" />}
      {f >= C.heats && f < C.frz && <Pin cam={cam} at={MACH} dx={-120} dy={-260} t={K(f, C.heats, 16)} title={`${Math.round(L(4, 66, K(f, C.heats, Math.max(10, C.deg - C.heats), (x) => x)))} °C`} sub="pasteurising the mix" icon={ic("thermometer", RED)} align="right" />}
      {f >= C.frz && f < C.takes && <Pin cam={cam} at={MACH} dx={-120} dy={-260} t={K(f, C.frz, 16)} title="Refreezing" sub="back to serving temperature" icon={ic("snowflake", BLUE)} align="right" />}
      {f >= C.takes && f < C.s3 && <Pin cam={cam} at={MACH} dx={-120} dy={-260} t={K(f, C.takes, 16)} title="4 hours" sub={`${Math.floor(left / 3600)}:${String(Math.floor((left % 3600) / 60)).padStart(2, "0")} left · every night`} icon={ic("timer")} align="right" />}
      {f >= C.fails && f < C.locked && <Pin cam={cam} at={MACH} dx={-120} dy={-260} t={K(f, C.fails, 14)} title="Cycle failed" sub={f >= C.starts ? "starting over" : "fault"} icon={ic("triangle-alert", RED)} align="right" />}
      {f >= C.locked && f < C.so + 30 && <Pin cam={cam} at={[MACH[0], 1.4, MACH[2] + 0.42]} dx={-120} dy={-240} t={K(f, C.locked, 14)} title="Repair codes locked" sub="only the maker's technician" icon={ic("lock", "#D4A72C")} align="right" />}
      {f >= C.waitw && f < C.s4 && <Pin cam={cam} at={[tx, 1.6, tz]} dx={-80} dy={-200} t={K(f, C.waitw, 14)} title="Technician" sub="on the way" icon={ic("wrench", G.ink)} align="right" />}
      {f >= C.checks && f < C.mal - 10 && <Pin cam={cam} at={usAt([450, 120])} dx={-40} dy={-260} t={K(f, C.checks, 16)} title={f >= C.about ? "1 in 10 say no" : "Checked every 30 min"} sub={f >= C.about ? "sundae unavailable" : "every McDonald's in the US"} icon={f >= C.about ? ic("triangle-alert", RED) : ic("clock")} align="left" />}
      {f >= C.mal && f < C.s5 && <Pin cam={cam} at={myAt(450, 200)} dx={-40} dy={-280} t={K(f, C.mal, 16)} title="Malaysia" sub="not checked by anyone" icon={ic("map-pin")} align="left" />}
      {f >= C.branch && f < end && <Pin cam={cam} at={myAt(KLANG[0], KLANG[1])} dx={60} dy={-220} t={K(f, C.branch, 16)} title="Your branch?" sub="drop it in the comments" icon={ic("map-pin")} align="left" />}
      {/* the brand, flat (user 2026-11-07: "a plain flat mcdonald for a while … just an image"): the real arches over the opening */}
      {f < C.notb + 20 && <img src={staticFile("mcdonalds_arches.svg")} style={{ position: "absolute", left: 540 - 150, top: 640, width: 300, height: 262,
        opacity: 1 - K(f, C.notb - 10, 24), transform: `scale(${L(1.06, 1, K(f, -20, 60))})`, filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.6))" }} />}
      {f < end && <Comment f={f} />}
      {f < end && <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 540, background: "linear-gradient(to bottom, rgba(10,10,12,0.92), rgba(10,10,12,0))" }} />}
      {f < end && <Headline key={head[0] as string} f={f} at={head[2] as number} a={head[0] as string} b={head[1] as string} />}
      {f >= end - 4 && <EndCard f={Math.floor(f / 2)} at={Math.floor(end / 2)} />}
      {f < end && <Captions blocks={caps as any} frame={f} fps={FPS} />}
      <Audio src={staticFile("mix.wav")} />
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="ex24" component={Piece} width={1080} height={1920} fps={FPS} durationInFrames={N} />);
