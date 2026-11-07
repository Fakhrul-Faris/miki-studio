// EX24 "The Machine Isn't Broken" — raea, UI + motion translate each line (episode.md § Shot list). 1080x1920, 30 fps.
// Every cue is a spoken word from ../audio/vo_timeline.json (estimated until the voice lands, then tools/vo_tighten.py).
import { AbsoluteFill, Audio, Composition, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { Backdrop, C, Card, CommentBox, Count, DotMap, EndCard, Headline, MONO, SANS, Stamp, k, lerp, vis, words } from "../../../tools/raea/kit/ui";
import { Captions } from "../../../tools/raea/kit/Captions";
import tl from "../audio/vo_timeline.json";
import caps from "./captions.json";
import usa from "../../../tools/raea/kit/geo/usa.json";
import mys from "../../../tools/raea/kit/geo/malaysia.json";

const w = words(tl);
const N = Math.ceil((tl as any).end * 30);
const HAS_VOICE = !(tl as any).estimated;

// ---------- dessert icons (flat) ----------
function Icon({ kind, col }: { kind: string; col: string }) {
  const swirl = <path d="M30 70 Q60 20 90 70 Q75 52 60 58 Q45 52 30 70 Z M38 60 Q60 10 82 60" fill="#F3EFE6" stroke="#D9D2C3" strokeWidth={3} />;
  const g = { position: "absolute" as const, left: 119, top: 40 };
  if (kind === "Cone") return <svg width={120} height={170} style={g}>{swirl}<path d="M32 72 L88 72 L60 165 Z" fill="#C98B4E" /></svg>;
  if (kind === "Sundae") return <svg width={120} height={170} style={g}>{swirl}<path d="M28 76 Q30 70 92 70 L84 140 Q60 150 36 140 Z" fill="#E9E5DC" /><path d="M32 82 Q60 96 88 82" stroke="#7A3B1E" strokeWidth={8} fill="none" /></svg>;
  if (kind === "Apple pie") return <svg width={140} height={170} style={g}><rect x={10} y={60} width={120} height={70} rx={14} fill={col} /><path d="M30 80 L110 80 M30 100 L110 100" stroke="#A86B33" strokeWidth={6} /></svg>;
  return <svg width={120} height={170} style={g}><path d="M30 40 L90 40 L82 160 L38 160 Z" fill={col} /><ellipse cx={60} cy={40} rx={32} ry={14} fill="#F3EFE6" /><rect x={66} y={6} width={6} height={50} fill="#57D100" /></svg>;
}

// ---------- the soft-serve machine, flat (shared by scenes 2–3) ----------
function Machine({ f, x, y, light, screen }: { f: number; x: number; y: number; light: string; screen: any }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 420, height: 560 }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 420, height: 470, borderRadius: 34, background: "#2A2C33", border: `2px solid ${C.line}` }} />
      <div style={{ position: "absolute", left: 40, top: 40, width: 340, height: 150, borderRadius: 18, background: "#0B0C0F", border: `2px solid ${C.line}`, overflow: "hidden" }}>{screen}</div>
      <div style={{ position: "absolute", left: 360, top: 22, width: 22, height: 22, borderRadius: 11, background: light, boxShadow: `0 0 ${18 + 8 * Math.sin(f / 5)}px ${light}` }} />
      {[110, 270].map((sx) => <div key={sx} style={{ position: "absolute", left: sx, top: 250, width: 40, height: 120, borderRadius: 10, background: "#3A3D46" }} />)}
      <div style={{ position: "absolute", left: 60, top: 470, width: 300, height: 26, borderRadius: 8, background: "#22242A" }} />
    </div>
  );
}

function Piece() {
  const f = useCurrentFrame();
  const s2 = w("L02"), s3 = w("L03"), s4 = w("L04"), s5 = w("L05"), end = w("L05", "follow");
  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden" }}>
      <Backdrop f={f} />

      {/* 1 — the kiosk: frame 0 already scrolling; "broken" stamps UNAVAILABLE; "cleaning" turns it into a cycle */}
      {f < s2 + 10 && (() => {
        const v = vis(f, -20, s2 + 6, 10), scroll = lerp(90, 0, k(f, -14, 30));
        const peel = k(f, w("L01", "not"), 10), clean = k(f, w("L01", "cleaning"), 12);
        const tiles = [["Sundae", "#E9DCC4"], ["Cone", "#E9DCC4"], ["Apple pie", "#C98B4E"], ["Float", "#7A4A2A"]];
        return <div style={{ position: "absolute", inset: 0, opacity: v }}>
          <Headline f={f} at={-8} text="NOT BROKEN. CLEANING." accent="CLEANING" />
          <Card f={f} at={-30} x={130} y={460} w={820} h={790}>
            <div style={{ padding: "34px 40px", fontFamily: SANS }}>
              <div style={{ fontSize: 40, fontWeight: 700, color: C.ink }}>Desserts</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginTop: 30, transform: `translateY(${scroll}px)` }}>
                {tiles.map(([name, col], i) => {
                  const off = i === 0 ? k(f, w("L01", "broken"), 8) * (1 - clean) : 0;
                  return <div key={i} style={{ width: 358, height: 300, borderRadius: 26, background: C.panel2, position: "relative",
                    filter: `grayscale(${off})`, opacity: 1 - 0.45 * off }}>
                    <Icon kind={name} col={col} />
                    <div style={{ position: "absolute", left: 30, bottom: 30, fontSize: 38, fontWeight: 600, color: C.ink }}>{name}</div>
                    {i === 0 && clean > 0 && <div style={{ position: "absolute", right: 22, top: 22, padding: "8px 18px", borderRadius: 30, background: C.green,
                      color: C.bg, fontWeight: 800, fontSize: 30, opacity: clean, display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ display: "inline-block", transform: `rotate(${f * 9}deg)` }}>⟳</span>CLEANING</div>}
                  </div>;
                })}
              </div>
            </div>
          </Card>
          <Stamp f={f} at={w("L01", "broken")} until={w("L01", "not") + 10} text="UNAVAILABLE" x={330 + 260 * peel} y={700 - 120 * peel} rot={-8 + 30 * peel} />
        </div>;
      })()}

      {/* 2 — heat to 66 °C, freeze, four hours */}
      {f >= s2 - 6 && f < s3 + 10 && (() => {
        const v = vis(f, s2, s3 + 6, 10), heat = k(f, w("L02", "heats"), Math.max(8, w("L02", "degrees") - w("L02", "heats")), (t) => t);
        const frz = k(f, w("L02", "freezes"), 14), temp = lerp(4, 66, heat) * (1 - frz);
        const col = frz > 0.5 ? C.blue : interpolate(heat, [0, 1], [0, 1]) > 0.2 ? C.red : C.dim;
        const t4 = k(f, w("L02", "takes"), 8), left = Math.max(0, 4 * 3600 * (1 - k(f, w("L02", "takes") + 6, 60, (t) => t)));
        const hh = Math.floor(left / 3600), mm = Math.floor((left % 3600) / 60), ss = Math.floor(left % 60);
        return <div style={{ position: "absolute", inset: 0, opacity: v }}>
          <Headline f={f} at={s2} text={f >= w("L02", "takes") ? "66°C → 4 HOURS" : "66°C"} accent="HOURS" />
          <Machine f={f} x={330} y={560} light={col} screen={<div style={{ fontFamily: MONO, fontSize: 40, color: col, padding: "50px 30px" }}>{frz > 0.5 ? "FREEZING…" : "HEAT CYCLE"}</div>} />
          <div style={{ position: "absolute", left: 120, top: 560, width: 90, height: 600, borderRadius: 45, background: C.panel2, border: `2px solid ${C.line}` }}>
            <div style={{ position: "absolute", left: 18, right: 18, bottom: 18, height: `${(temp / 66) * 540}px`, borderRadius: 27, background: col }} />
          </div>
          <div style={{ position: "absolute", left: 90, top: 1190, width: 160, textAlign: "center", fontFamily: SANS, fontWeight: 800, fontSize: 56, color: col }}>
            {frz > 0.5 ? "❄" : `${Math.round(temp)}°C`}</div>
          <div style={{ position: "absolute", left: 790, top: 600, opacity: t4, transform: `translateY(${lerp(30, 0, t4)}px)`, fontFamily: MONO, fontWeight: 700, fontSize: 64,
            color: C.ink, writingMode: "vertical-rl" }}>{`${hh}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`}</div>
        </div>;
      })()}

      {/* 3 — fails, restarts, locked, waits */}
      {f >= s3 - 6 && f < s4 + 10 && (() => {
        const v = vis(f, s3, s4 + 6, 10), err = k(f, w("L03", "fails"), 8), rs = k(f, w("L03", "starts"), 10);
        const lock = k(f, w("L03", "locked"), 10), wait = k(f, w("L03", "wait"), 10);
        return <div style={{ position: "absolute", inset: 0, opacity: v }}>
          <Headline f={f} at={s3} text={lock > 0 ? "ERROR · LOCKED" : "ERROR"} accent="LOCKED" />
          <Machine f={f} x={330} y={560} light={C.red} screen={<div style={{ fontFamily: MONO, fontSize: 38, color: C.red, padding: "32px 30px", opacity: err }}>ERROR<br />CALL SERVICE</div>} />
          <div style={{ position: "absolute", left: 770, top: 520, fontSize: 130, opacity: lock, transform: `translateY(${lerp(-80, 0, lock)}px)` }}>🔒</div>
          <div style={{ position: "absolute", left: 120, top: 1160, fontFamily: SANS, fontWeight: 700, fontSize: 44, color: C.ink, opacity: rs, display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ display: "inline-block", fontSize: 64, color: C.red, transform: `rotate(${f * 8}deg)` }}>⟳</span>restart cycle</div>
          <div style={{ position: "absolute", left: 760, top: 1130, width: 160, height: 160, borderRadius: 80, border: `6px solid ${C.ink}`, opacity: wait }}>
            <div style={{ position: "absolute", left: 77, top: 20, width: 6, height: 60, background: C.ink, transformOrigin: "3px 60px", transform: `rotate(${f * 24}deg)` }} />
            <div style={{ position: "absolute", left: 76, top: 40, width: 8, height: 40, background: C.green, transformOrigin: "4px 40px", transform: `rotate(${f * 2}deg)` }} />
          </div>
        </div>;
      })()}

      {/* 4 — a US map checked every 30 minutes; about 1 in 10 red; Malaysia: nobody checked */}
      {f >= s4 - 6 && f < s5 + 10 && (() => {
        const v = vis(f, s4, s5 + 30, 10), chk = w("L04", "checks"), one = w("L04", "about"), my = w("L04", "malaysia");
        const away = k(f, my - 4, 14);
        const sweep = (d: number[]) => chk + (d[0] / usa.w) * 24;
        return <div style={{ position: "absolute", inset: 0, opacity: v }}>
          <Headline f={f} at={s4} text={away > 0 ? "MALAYSIA?" : f >= one ? "1 IN 10" : "EVERY 30 MIN"} accent={away > 0 ? "MALAYSIA" : "10"} />
          <div style={{ position: "absolute", inset: 0, transform: `translateX(${-1100 * away}px)` }}>
            <DotMap f={f} geo={usa} x={90} y={620} at={s4 - 4} reveal={(d) => sweep(d)} red={(d, i) => f >= one && i % 10 === 3}
              ping={(d) => { const p = f - sweep(d); return p >= 0 ? sweep(d) + Math.floor(p / 30) * 30 : -1; }} />
            <div style={{ position: "absolute", left: 90, top: 1240, opacity: k(f, one, 10) }}>
              <Count f={f} a={one} b={one + 1} from={1} to={1} suffix=" in 10 say no" size={88} color={C.red} />
            </div>
          </div>
          <div style={{ position: "absolute", inset: 0, transform: `translateX(${1100 * (1 - away)}px)` }}>
            <DotMap f={f} geo={mys} x={90} y={700} at={my - 4} reveal={() => 1e9} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 1170, textAlign: "center", fontFamily: SANS, fontWeight: 900, fontSize: 160, color: C.ink, opacity: k(f, my + 4, 10) }}>?</div>
          </div>
        </div>;
      })()}

      {/* 5 — your turn: drop the branch; the first dot on Malaysia's map */}
      {f >= s5 - 6 && f < end + 20 && (() => {
        const v = vis(f, s5, end + 16, 10), dot = k(f, w("L05", "branch"), 10);
        return <div style={{ position: "absolute", inset: 0, opacity: v }}>
          <Headline f={f} at={s5} text="DROP THE BRANCH ↓" accent="BRANCH" />
          <svg width={900} height={420} viewBox={`0 0 ${mys.w} ${mys.h}`} style={{ position: "absolute", left: 90, top: 440 }}>
            <path d={mys.path} fill={C.panel2} stroke={C.line} strokeWidth={2} />
            <circle cx={150} cy={250} r={10 * dot} fill={C.green} />
            <circle cx={150} cy={250} r={10 + 30 * k(f, w("L05", "branch"), 20)} fill="none" stroke={C.green} strokeWidth={3} opacity={1 - k(f, w("L05", "branch"), 20)} />
          </svg>
          <CommentBox f={f} at={w("L05", "which")} prompt={'Which McD near you always has a "broken" machine?'} typed="machine rosak at my branch 😩" />
        </div>;
      })()}

      {f >= end - 2 && <EndCard f={f} at={end} />}
      {f < end && <Captions blocks={caps as any} frame={f} />}
      {HAS_VOICE && <Audio src={staticFile("voice.wav")} />}
    </AbsoluteFill>
  );
}

registerRoot(() => <Composition id="ex24" component={Piece} width={1080} height={1920} fps={30} durationInFrames={N} />);
