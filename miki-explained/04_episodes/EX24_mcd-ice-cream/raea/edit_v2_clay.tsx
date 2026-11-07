// EX24 v2 "The Machine Isn't Broken" — clay maquette in raea (user 2026-11-07: clay, real things, real logo, less generic).
// Real objects on a clay set; interface only on real screens (the kiosk, the machine's display, a phone); the real
// Golden Arches file on the kiosk. Cues are spoken words (../audio/vo_timeline.json). 1080x1920, 30 fps.
// Motion: one personality (premium: no overshoot), one easing (kit `out`), 3 durations (8 / 14 / 24 f); three layers
// (the action, secondary moves, ambient drift). v1 (flat UI) is edit_v1.tsx.
import { AbsoluteFill, Audio, Composition, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { Screen, manifold, type Solid, Text3D } from "raea/3d";
import { Cylinder, Mesh3d, Torus } from "raea/mesh";
import { Transform } from "raea/transform";
import { C, EndCard, Headline, MONO, SANS, Scrim, k, lerp, words } from "../../../tools/raea/kit/ui";
import { CLAY, Clay, ClayStage, GREEN, PALE, Pin, RED, BLUE, drift, geoAt, glow, reliefSolid, rot, type V3 } from "../../../tools/raea/kit/clay";
import { Captions } from "../../../tools/raea/kit/Captions";
import tl from "../audio/vo_timeline.json";
import caps from "./captions.json";
import usa from "../../../tools/raea/kit/geo/usa.json";
import mys from "../../../tools/raea/kit/geo/malaysia.json";

const w = words(tl);
const N = Math.ceil((tl as any).end * 30);
const HAS_VOICE = !(tl as any).estimated;

// ---------- solids, built once ----------
let S: Record<string, Solid> | null = null;
const solids = () => (S ??= {
  counter: manifold.roundedBox(3.4, 1.0, 0.9, 0.06),
  kiosk: manifold.roundedBox(0.95, 1.9, 0.14, 0.05),
  body: manifold.roundedBox(0.78, 0.95, 0.62, 0.08),
  hopper: manifold.roundedBox(0.66, 0.16, 0.5, 0.05),
  tray: manifold.roundedBox(0.62, 0.05, 0.26, 0.02),
  lockBody: manifold.roundedBox(0.24, 0.2, 0.09, 0.03),
  phone: manifold.roundedBox(0.62, 1.26, 0.07, 0.07),
});

// ---------- the screens' pages (interface lives only on real screens) ----------
function KioskPage({ f }: { f: number }) {
  const off = k(f, w("L01", "broken"), 8), peel = k(f, w("L01", "not"), 10), clean = k(f, w("L01", "cleaning"), 14);
  const tiles: [string, string][] = [["Sundae", "#E9E5DC"], ["Cone", "#C98B4E"], ["Apple Pie", "#C98B4E"], ["Float", "#7A4A2A"]];
  return (
    <div style={{ position: "absolute", inset: 0, background: "#F6F3EE", fontFamily: SANS }}>
      <div style={{ height: 120, background: "#DA291C", display: "flex", alignItems: "center", gap: 18, padding: "0 30px" }}>
        <img src={staticFile("mcdonalds_arches.svg")} style={{ width: 74, height: 65 }} />
        <span style={{ color: "#fff", fontSize: 40, fontWeight: 700 }}>Desserts</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18, padding: 24, transform: `translateY(${lerp(60, 0, k(f, -16, 30))}px)` }}>
        {tiles.map(([n, col], i) => {
          const g = i === 0 ? off * (1 - clean) : 0;
          return <div key={i} style={{ width: 237, height: 300, borderRadius: 20, background: "#fff", position: "relative", boxShadow: "0 2px 6px rgba(0,0,0,0.08)", opacity: 1 - 0.5 * g }}>
            <div style={{ position: "absolute", left: 78, top: 40, width: 80, height: 130, borderRadius: "40px 40px 12px 12px", background: col, filter: `grayscale(${g})` }} />
            <div style={{ position: "absolute", left: 20, bottom: 22, fontSize: 30, fontWeight: 600, color: "#222" }}>{n}</div>
            {i === 0 && g > 0.05 && <div style={{ position: "absolute", left: 10, top: 120, padding: "6px 12px", border: "4px solid #DA291C", borderRadius: 10, color: "#DA291C",
              fontWeight: 900, fontSize: 30, transform: `rotate(${-10 + 40 * peel}deg) translate(${120 * peel}px, ${-60 * peel}px)`, opacity: 1 - peel }}>Unavailable</div>}
            {i === 0 && clean > 0 && <div style={{ position: "absolute", right: 12, top: 12, padding: "6px 14px", borderRadius: 24, background: GREEN, color: "#0E0E10",
              fontWeight: 800, fontSize: 24, opacity: clean }}>Cleaning</div>}
          </div>;
        })}
      </div>
    </div>
  );
}

function MachineDisplay({ f }: { f: number }) {
  const s2 = w("L02"), s3 = w("L03");
  const heat = k(f, w("L02", "heats"), Math.max(8, w("L02", "degrees") - w("L02", "heats")), (t) => t);
  const frz = k(f, w("L02", "freezes"), 14), hrs = w("L02", "takes");
  const left = Math.max(0, 4 * 3600 * (1 - k(f, hrs + 6, 50, (t) => t)));
  const clock = `${Math.floor(left / 3600)}:${String(Math.floor((left % 3600) / 60)).padStart(2, "0")}:${String(Math.floor(left % 60)).padStart(2, "0")}`;
  let line1 = "READY", line2 = "", col = C.dim;
  if (f >= w("L01", "cleaning")) { line1 = "CLEANING"; line2 = "heat cycle"; col = GREEN; }
  if (f >= s2) { line1 = `${Math.round(lerp(4, 66, heat))}°C`; line2 = "heating"; col = RED; }
  if (frz > 0.3) { line1 = "FREEZING"; line2 = f >= hrs ? clock : ""; col = BLUE; }
  if (f >= s3) { line1 = "ERROR"; line2 = "call service"; col = RED; }
  if (f >= w("L03", "starts") && f < w("L03", "and")) { line1 = "RESTART"; line2 = "cycle 2 of 2"; col = RED; }
  if (f >= w("L03", "wait")) { line1 = "ERROR"; line2 = "waiting for technician"; col = RED; }
  return (
    <div style={{ position: "absolute", inset: 0, background: "#07080A", fontFamily: MONO, color: col, padding: "18px 26px" }}>
      <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: 2 }}>{line1}</div>
      <div style={{ fontSize: 32, opacity: 0.85 }}>{line2}</div>
    </div>
  );
}

function PhonePage({ f }: { f: number }) {
  const at = w("L05", "which"), typed = "machine rosak at my branch";
  const n = Math.floor(interpolate(f, [at + 6, at + 6 + typed.length * 1.3], [0, typed.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <div style={{ position: "absolute", inset: 0, background: "#121316", fontFamily: SANS, padding: "70px 34px" }}>
      <div style={{ fontSize: 30, color: C.dim, fontWeight: 600 }}>Comments</div>
      <div style={{ fontSize: 40, color: C.ink, fontWeight: 700, marginTop: 24, lineHeight: "50px" }}>Which McD near you always has a "broken" machine?</div>
      <div style={{ marginTop: 40, background: "#1F2026", borderRadius: 26, padding: "20px 24px", fontSize: 36, color: C.ink, minHeight: 46 }}>
        {typed.slice(0, n)}<span style={{ color: GREEN, opacity: Math.floor(f / 12) % 2 ? 0 : 1 }}>|</span></div>
    </div>
  );
}

// ---------- the sets ----------
const A: V3 = [0, 0, 0];          // the McDonald's counter: kiosk + machine
const B: V3 = [60, 0, 0];         // the US map
const M: V3 = [120, 0, 0];        // Malaysia

function Counter({ f }: { f: number }) {
  const s2 = w("L02"), heat = k(f, w("L02", "heats"), 40, (t) => t), frz = k(f, w("L02", "freezes"), 14);
  const lockT = k(f, w("L03", "locked"), 14), fail = f >= w("L03");
  // the machine's body: clay, heating red, then frosting blue (the signature moment), then a red fault pulse.
  // raea keeps one colour per glowing part (LinearRgba keys of one colour), so each state is its own named part.
  const state = f < s2 ? "clay" : fail ? "fault" : frz > 0 ? "cold" : "hot";
  const body = { clay: [PALE, undefined], hot: ["#F2D3D3", glow(RED, 2.6 * heat)], cold: ["#C9DCEB", glow(BLUE, 0.9 * frz)],
    fault: [PALE, glow(RED, 0.25 + 0.2 * Math.sin(f / 4))] }[state] as [string, any];
  const mx = 0.75, my = 1.0 + 0.475;
  return <>
    <Mesh3d name="counter" transform={Transform.fromXyz(0, 0.5, 0)} shape={solids().counter}><Clay color={CLAY} /></Mesh3d>
    {/* kiosk, front-left, facing the camera */}
    <Mesh3d name="kiosk-body" transform={Transform.fromXyz(-1.15, 0.95, 1.05)} shape={solids().kiosk}><Clay color={"#3A3D46"} /></Mesh3d>
    <Screen name="kiosk" crt={false} resolution={[540, 960]} size={[0.8]} position={[-1.15, 1.0, 1.125]}><KioskPage f={f} /></Screen>
    {/* soft-serve machine on the counter */}
    <Mesh3d name={`machine-body-${state}`} transform={Transform.fromXyz(mx, my, -0.05)} shape={solids().body}><Clay color={body[0]} emissive={body[1]} /></Mesh3d>
    <Mesh3d name="hopper" transform={Transform.fromXyz(mx, my + 0.55, -0.05)} shape={solids().hopper}><Clay color={CLAY} /></Mesh3d>
    {[-0.17, 0.17].map((dx) => <Mesh3d key={dx} transform={Transform.fromXyz(mx + dx, my - 0.18, 0.3)}><Cylinder radius={0.045} half_height={0.08} /><Clay color={"#7D828B"} /></Mesh3d>)}
    <Mesh3d transform={Transform.fromXyz(mx, 1.03, 0.36)} shape={solids().tray}><Clay color={"#7D828B"} /></Mesh3d>
    <Screen name="display" crt={false} resolution={[480, 160]} size={[0.56]} position={[mx, my + 0.24, 0.265]}><MachineDisplay f={f} /></Screen>
    {/* the padlock drops onto the machine when the codes are locked */}
    {lockT > 0 && <>
      <Mesh3d name="lockbody" transform={Transform.fromXyz(mx, lerp(my + 0.7, my - 0.22, lockT), 0.32)} shape={solids().lockBody}><Clay color={"#D4A72C"} rough={0.4} /></Mesh3d>
      <Mesh3d name="shackle" transform={Transform.fromXyz(mx, lerp(my + 0.82, my - 0.1, lockT), 0.32)}><Torus major_radius={0.075} minor_radius={0.018} /><Clay color={"#B8BCC4"} rough={0.35} /></Mesh3d>
    </>}
  </>;
}

function USMap({ f }: { f: number }) {
  const chk = w("L04", "checks"), one = w("L04", "about");
  const sweep = (d: number[]) => chk + (d[0] / usa.w) * 30;
  return <>
    <Mesh3d transform={Transform.fromXyz(...B)} shape={reliefSolid(usa)}><Clay color={PALE} /></Mesh3d>
    {usa.dots.slice(0, 260).map((d: number[], i: number) => <Pin key={i} name={`us${i}`} p={geoAt(usa, d[0], d[1], B)} t={k(f, sweep(d), 8)} red={f >= one + (i % 7) && i % 10 === 3} />)}
  </>;
}

function MYMap({ f, pin }: { f: number; pin?: number }) {
  return <>
    <Mesh3d transform={Transform.fromXyz(...M)} shape={reliefSolid(mys)}><Clay color={PALE} /></Mesh3d>
    {pin !== undefined && <Pin name="first" p={geoAt(mys, 150, 250, M)} t={k(f, pin, 8)} />}
  </>;
}

function Piece() {
  const f = useCurrentFrame();
  const s2 = w("L02"), s3 = w("L03"), s4 = w("L04"), s5 = w("L05"), my = w("L04", "malaysia"), end = w("L05", "follow");
  // one camera, cut on the word; it keeps moving inside every shot
  let cam, c: V3 = A, s = 6, set: any;
  if (f < s2) {          // 1: the kiosk close, pulling back to reveal the machine
    cam = drift(f, -20, s2, { p: [-1.15, 1.25, 3.3], t: [-1.15, 1.42, 1.0] }, { p: [-0.25, 1.75, 6.0], t: [-0.2, 1.55, 0.4] });
    set = <Counter f={f} />;
  } else if (f < s3) {   // 2: the machine heats and freezes (signature)
    cam = drift(f, s2, s3, { p: [2.2, 1.9, 2.4], t: [0.75, 1.45, 0] }, { p: [1.5, 1.7, 2.0], t: [0.75, 1.45, 0] });
    set = <Counter f={f} />;
  } else if (f < s4) {   // 3: error, restart, the padlock
    cam = drift(f, s3, s4, { p: [0.75, 1.6, 2.6], t: [0.75, 1.45, 0] }, { p: [0.6, 1.5, 2.0], t: [0.75, 1.42, 0] });
    set = <Counter f={f} />;
  } else if (f < my) {   // 4: the US map, checked every 30 minutes
    c = B; s = 9;
    cam = drift(f, s4, my, { p: [B[0] - 0.6, 7.0, 10.6], t: [B[0], 0.4, 0.2] }, { p: [B[0] + 0.6, 6.6, 9.8], t: [B[0], 0.4, 0.2] });
    set = <USMap f={f} />;
  } else if (f < s5) {   // 4b: Malaysia: nobody checked
    c = M; s = 9;
    cam = drift(f, my, s5, { p: [M[0] - 0.3, 7.0, 11.6], t: [M[0], 0.6, 0.2] }, { p: [M[0] + 0.2, 6.6, 10.8], t: [M[0], 0.6, 0.2] });
    set = <><MYMap f={f} /><Mesh3d name="qmark" transform={Transform.fromXyz(M[0] - 0.9, 1.1, 0.4)}><Text3D size={1.1} depth={0.22}>?</Text3D><Clay color={GREEN} emissive={glow(GREEN, 0.4)} /></Mesh3d></>;
  } else {               // 5: your turn: the phone, the first pin
    c = M; s = 9;
    cam = drift(f, s5, end, { p: [M[0] + 0.15, 2.1, 6.4], t: [M[0] + 0.1, 0.95, 1.2] }, { p: [M[0] + 0.05, 2.0, 5.9], t: [M[0] + 0.1, 0.95, 1.2] });
    set = <>
      <MYMap f={f} pin={w("L05", "branch")} />
      <Mesh3d transform={Transform.fromXyz(M[0] + 0.1, 0.95, 3.0).withRotation(rot(-0.12, 0, 0))} shape={solids().phone}><Clay color={"#22242A"} rough={0.4} /></Mesh3d>
      <Screen name="phone" crt={false} resolution={[540, 1100]} size={[0.56]} position={[M[0] + 0.1, 0.955, 3.04]} rotation={[-0.12, 0, 0]}><PhonePage f={f} /></Screen>
    </>;
  }
  const head = f < s2 ? ["NOT BROKEN. CLEANING.", -8, "CLEANING"] : f < s3 ? [f >= w("L02", "takes") ? "66°C → 4 HOURS" : "66°C", s2, "HOURS"]
    : f < s4 ? ["ERROR · LOCKED", s3, "LOCKED"] : f < my ? [f >= w("L04", "about") ? "1 IN 10" : "EVERY 30 MIN", s4, "10"] : f < s5 ? ["MALAYSIA?", my, "MALAYSIA"] : ["DROP THE BRANCH ↓", s5, "BRANCH"];
  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden" }}>
      {f < end && <ClayStage cam={cam} c={c} s={s}>{set}</ClayStage>}
      {f < end && <Scrim />}
      {f < end && <Headline f={f} at={head[1] as number} text={head[0] as string} accent={head[2] as string} />}
      {f >= end - 2 && <EndCard f={f} at={end} />}
      {f < end && <Captions blocks={caps as any} frame={f} />}
      {HAS_VOICE && <Audio src={staticFile("voice.wav")} />}
    </AbsoluteFill>
  );
}

registerRoot(() => <Composition id="ex24" component={Piece} width={1080} height={1920} fps={30} durationInFrames={N} />);
