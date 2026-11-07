// ui — the Meikigo UI-motion kit for raea (user, 2026-11-07: "make proper ui and animate the ui so you have a better
// script-to-video representation"). Dark interface, one green accent, Inter Display + IBM Plex Mono; every element
// eases in and out (~0.4 s, no harsh cuts, no bounce); everything is a function of the frame.
import { Easing, interpolate, staticFile } from "raea";

export const C = {
  bg: "#0E0E10", panel: "#17181C", panel2: "#1F2026", line: "#2C2E36", ink: "#EDE7DC", dim: "#8C8C96",
  green: "#57D100", red: "#E5484D", blue: "#59A8FF", paper: "#F3EFE6", paperInk: "#1A1A1E",
};
export const SANS = "Inter Display", MONO = "IBM Plex Mono";
export const W = 1080, H = 1920;
const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const out = Easing.bezier(0.16, 1, 0.3, 1);          // fast in, gentle settle (no overshoot)
export const inOut = Easing.bezier(0.65, 0, 0.35, 1);
/** 0→1 from frame a over d frames */
export const k = (f: number, a: number, d = 12, e = out) => interpolate(f, [a, a + d], [0, 1], { ...CL, easing: e });
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** visible window with a soft entrance and exit (no pops): returns 0..1 */
export const vis = (f: number, a: number, b: number, d = 10) => Math.min(k(f, a, d), 1 - k(f, b - d, d, inOut));

/** words timeline: w("L02") = the line's first word, w("L02", 3) = its 4th, w("L02", "cleaning") = the first word
 *  containing that text (case-insensitive; survives Whisper splitting numbers differently), as a frame at `fps`. */
export function words(tl: any, fps = 30) {
  return (line: string, i: number | string = 0) => {
    const ws = tl.words[line];
    let j = typeof i === "number" ? (i < 0 ? ws.length + i : i)
      : ws.findIndex((x: any) => String(x[0]).toLowerCase().replace(/[^a-z0-9]/g, "").includes(i.toLowerCase().replace(/[^a-z0-9]/g, "")));
    if (j < 0) j = 0;
    return Math.floor(ws[Math.min(j, ws.length - 1)][1] * fps);
  };
}
/** the scene for frame f from cut frames [{at, id}] */
export const sceneAt = (cuts: { at: number; id: string }[], f: number) => [...cuts].reverse().find((c) => f >= c.at) ?? cuts[0];

/** a soft dark band behind the headline so it reads over any set (light clay included) */
export const Scrim = () => <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 560,
  background: "linear-gradient(to bottom, rgba(10,11,13,0.78) 0%, rgba(10,11,13,0.55) 55%, rgba(10,11,13,0) 100%)" }} />;

/** the top keyword headline: sound-off viewers and TikTok's text reading both see the keyword (≥ 76 px) */
export function Headline({ f, at, text, sub, accent }: { f: number; at: number; text: string; sub?: string; accent?: string }) {
  const parts = text.split(" ");
  return (
    <div style={{ position: "absolute", left: 70, right: 140, top: 210, display: "flex", flexWrap: "wrap", gap: "0 22px" }}>
      {parts.map((p, i) => {
        const t = k(f, at + i * 2, 10);
        return <div key={i} style={{ fontFamily: SANS, fontWeight: 800, fontSize: 84, lineHeight: "96px", letterSpacing: -1,
          color: accent && p.includes(accent) ? C.green : C.ink, opacity: t, transform: `translateY(${lerp(28, 0, t)}px)` }}>{p}</div>;
      })}
      {sub && <div style={{ width: "100%", marginTop: 14, fontFamily: MONO, fontSize: 34, color: C.dim, opacity: k(f, at + 8, 12) }}>{sub}</div>}
    </div>
  );
}

/** a rounded card that slides up and fades in at `at`, out at `until` */
export function Card({ f, at, until = 1e9, x, y, w, h, children, bg = C.panel, r = 36, border = C.line }:
  { f: number; at: number; until?: number; x: number; y: number; w: number; h: number; children?: any; bg?: string; r?: number; border?: string }) {
  const v = vis(f, at, until, 12);
  return <div style={{ position: "absolute", left: x, top: y + lerp(40, 0, k(f, at, 14)), width: w, height: h, borderRadius: r,
    background: bg, border: `2px solid ${border}`, opacity: v, overflow: "hidden" }}>{children}</div>;
}

/** a big number that counts up from `from` to `to` between frames a and b */
export function Count({ f, a, b, from = 0, to, prefix = "", suffix = "", size = 150, color = C.ink, decimals = 0 }:
  { f: number; a: number; b: number; from?: number; to: number; prefix?: string; suffix?: string; size?: number; color?: string; decimals?: number }) {
  const v = lerp(from, to, k(f, a, Math.max(1, b - a), inOut));
  const s = v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: size, color, letterSpacing: -3 }}>{prefix}{s}{suffix}</span>;
}

/** a stamp (UNAVAILABLE, PAID TWICE…): scales down onto the page and settles, no bounce */
export function Stamp({ f, at, until = 1e9, text, color = C.red, x, y, size = 64, rot = -8 }:
  { f: number; at: number; until?: number; text: string; color?: string; x: number; y: number; size?: number; rot?: number }) {
  const t = k(f, at, 9), o = vis(f, at, until, 8);
  return <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${lerp(1.6, 1, t)})`,
    opacity: o, border: `6px solid ${color}`, borderRadius: 16, padding: "8px 26px", color, fontFamily: SANS, fontWeight: 900,
    fontSize: size, letterSpacing: 2, whiteSpace: "nowrap" }}>{text}</div>;
}

/** a map from tools/raea/kit/geo (outline + seeded dots); dots appear by `reveal(dot) -> frame` and may turn red */
export function DotMap({ f, geo, x, y, scale = 1, at, until = 1e9, reveal, red, ping }:
  { f: number; geo: any; x: number; y: number; scale?: number; at: number; until?: number;
    reveal: (d: number[], i: number) => number; red?: (d: number[], i: number) => boolean; ping?: (d: number[], i: number) => number }) {
  const o = vis(f, at, until, 12);
  return (
    <svg width={geo.w * scale} height={geo.h * scale} viewBox={`0 0 ${geo.w} ${geo.h}`}
      style={{ position: "absolute", left: x, top: y, opacity: o, overflow: "visible" }}>
      <path d={geo.path} fill={C.panel2} stroke={C.line} strokeWidth={2} />
      {geo.dots.map((d: number[], i: number) => {
        const t = k(f, reveal(d, i), 8);
        if (t <= 0) return null;
        const bad = red ? red(d, i) : false, p = ping ? ping(d, i) : -1;
        const pr = p >= 0 ? k(f, p, 14) : 0;
        return <g key={i}>
          {p >= 0 && pr > 0 && pr < 1 && <circle cx={d[0]} cy={d[1]} r={4 + 18 * pr} fill="none" stroke={bad ? C.red : C.green} strokeWidth={2} opacity={1 - pr} />}
          <circle cx={d[0]} cy={d[1]} r={4.2 * t} fill={bad ? C.red : C.green} opacity={0.9} />
        </g>;
      })}
    </svg>
  );
}

/** a comment sheet with a reply typing itself (the ending question) */
export function CommentBox({ f, at, until = 1e9, prompt, typed }: { f: number; at: number; until?: number; prompt: string; typed: string }) {
  const n = Math.floor(interpolate(f, [at + 10, at + 10 + typed.length * 1.4], [0, typed.length], CL));
  const caret = Math.floor(f / 12) % 2 === 0;
  return (
    <Card f={f} at={at} until={until} x={90} y={760} w={900} h={420} bg={C.panel}>
      <div style={{ padding: "34px 40px", fontFamily: SANS }}>
        <div style={{ fontSize: 34, color: C.dim, fontWeight: 600 }}>Comments</div>
        <div style={{ fontSize: 50, color: C.ink, fontWeight: 700, marginTop: 26, lineHeight: "62px" }}>{prompt}</div>
        <div style={{ marginTop: 40, background: C.panel2, borderRadius: 26, padding: "22px 28px", fontSize: 44, color: C.ink, minHeight: 56 }}>
          {typed.slice(0, n)}<span style={{ color: C.green, opacity: caret ? 1 : 0 }}>|</span>
        </div>
      </div>
    </Card>
  );
}

/** the silent end card: logo, the follow line, an optional "next part" line */
export function EndCard({ f, at, next }: { f: number; at: number; next?: string }) {
  const t = k(f, at, 14);
  return (
    <div style={{ position: "absolute", inset: 0, background: C.bg, opacity: t, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 520 }}>
      <img src={staticFile("logo.png")} style={{ width: 200, height: 256, opacity: k(f, at + 4, 14), transform: `translateY(${lerp(24, 0, k(f, at + 4, 16))}px)` }} />
      <div style={{ marginTop: 56, width: 840, textAlign: "center", fontFamily: SANS, fontWeight: 800, fontSize: 70, lineHeight: "82px", color: C.ink,
        opacity: k(f, at + 10, 14) }}>Follow for more <span style={{ color: C.green }}>hidden business models</span></div>
      {next && <div style={{ marginTop: 44, fontFamily: MONO, fontSize: 40, color: C.dim, opacity: k(f, at + 18, 14) }}>{next}</div>}
    </div>
  );
}

/** a soft vignette + grain-free backdrop with a slow drifting glow, so no frame is ever dead still */
export function Backdrop({ f }: { f: number }) {
  const x = 50 + 12 * Math.sin(f / 90), y = 42 + 8 * Math.cos(f / 110);
  return <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${x}% ${y}%, #1b1d22 0%, ${C.bg} 62%)` }} />;
}
