// EX25 "How Is 99 Speedmart So Cheap? (Part 1)" — raea, UI + motion translate each line (episode.md § Shot list).
// 1080x1920, 30 fps. Cues are spoken words from ../audio/vo_timeline.json. No invented prices: amounts are masked.
import { AbsoluteFill, Audio, Composition, registerRoot, staticFile, useCurrentFrame } from "raea";
import { Backdrop, C, Card, Count, DotMap, EndCard, Headline, MONO, SANS, Stamp, k, lerp, vis, words } from "../../../tools/raea/kit/ui";
import { Captions } from "../../../tools/raea/kit/Captions";
import tl from "../audio/vo_timeline.json";
import caps from "./captions.json";
import mys from "../../../tools/raea/kit/geo/malaysia.json";

const w = words(tl);
const N = Math.ceil((tl as any).end * 30);
const HAS_VOICE = !(tl as any).estimated;
const KLANG = [87.8, 262.3];                       // where it started (1987), in malaysia.json's pixels

function Receipt({ f, at, x, title, payer, lines, tint }: { f: number; at: number; x: number; title: string; payer: string; lines: string[]; tint: string }) {
  const print = k(f, at, 26), h = lerp(80, 720, print);
  return (
    <div style={{ position: "absolute", left: x, top: 470, width: 400, height: h, overflow: "hidden", borderRadius: "6px 6px 0 0", background: C.paper,
      boxShadow: "0 30px 60px rgba(0,0,0,0.45)", opacity: k(f, at, 6) }}>
      <div style={{ padding: "26px 28px", fontFamily: MONO, color: C.paperInk }}>
        <div style={{ fontSize: 30, fontWeight: 700, textAlign: "center" }}>{title}</div>
        <div style={{ fontSize: 24, textAlign: "center", marginTop: 6, color: "#55555c" }}>— — — — — — — — —</div>
        {lines.map((l, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 26, marginTop: 18, opacity: k(f, at + 6 + i * 4, 6) }}>
            <span>{l}</span><span style={{ color: "#8a8a90" }}>RM ••••</span></div>
        ))}
        <div style={{ marginTop: 30, padding: "12px 0", borderTop: "3px dashed #9a9aa0", fontSize: 30, fontWeight: 700, display: "flex", justifyContent: "space-between",
          opacity: k(f, at + 22, 8) }}><span>PAID BY</span><span style={{ color: tint }}>{payer}</span></div>
      </div>
    </div>
  );
}

function Piece() {
  const f = useCurrentFrame();
  const s2 = w("L02"), s3 = w("L03"), s4 = w("L04"), s5 = w("L05"), end = w("L05", "follow");
  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden" }}>
      <Backdrop f={f} />

      {/* 1 — two receipts: you pay, and the brands pay (frame 0: the first is already printing) */}
      {f < s2 + 10 && (() => {
        const v = vis(f, -20, s2 + 6, 10), two = w("L01", "not");
        return <div style={{ position: "absolute", inset: 0, opacity: v }}>
          <Headline f={f} at={-8} text={f >= two ? "99 SPEEDMART: 2 CUSTOMERS" : "99 SPEEDMART"} accent="2" />
          <div style={{ position: "absolute", inset: 0, transform: `translateX(${lerp(240, 0, k(f, two, 14))}px)` }}>
            <Receipt f={f} at={-14} x={110} title="99 SPEEDMART" payer="YOU" lines={["Basket", "Drinks", "Snacks", "Household"]} tint={C.paperInk} />
            {f >= two - 2 && <Receipt f={f} at={two} x={570} title="99 SPEEDMART" payer="BRANDS" lines={["Display fee", "Sales target", "Warehouse fee", "Promotion"]} tint={C.green} />}
          </div>
        </div>;
      })()}

      {/* 2 — 3,151 stores spreading out from Klang; why they're cheap to run */}
      {f >= s2 - 6 && f < s3 + 10 && (() => {
        const v = vis(f, s2, s3 + 6, 10), a = w("L02", "3"), b = w("L02", "house");
        const dist = (d: number[]) => Math.hypot(d[0] - KLANG[0], d[1] - KLANG[1]);
        const card = w("L02", "cheap");
        const ticks = [["Next to your house", w("L02", "house")], ["Cheap rent", w("L02", "rent")], ["One layout, copied everywhere", w("L02", "everywhere")]] as [string, number][];
        return <div style={{ position: "absolute", inset: 0, opacity: v }}>
          <Headline f={f} at={s2} text="3,151 STORES" accent="3,151" sub="99 Speedmart · June 2026" />
          <div style={{ position: "absolute", inset: 0, transform: `translateY(${-160 * k(f, card, 16)}px)` }}>
            <DotMap f={f} geo={mys} x={90} y={560} at={s2 - 4} reveal={(d) => a + (dist(d) / 900) * (b - a) * 1.4} />
            <div style={{ position: "absolute", left: 90, top: 1000, opacity: k(f, a, 8) }}>
              <Count f={f} a={a} b={b} to={3151} size={120} color={C.green} /><span style={{ fontFamily: SANS, fontSize: 44, color: C.dim, marginLeft: 18 }}>stores</span>
            </div>
          </div>
          <Card f={f} at={card} x={90} y={1000} w={900} h={300}>
            <div style={{ padding: "26px 36px", fontFamily: SANS }}>
              {ticks.map(([t, at], i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 46, fontWeight: 600, color: C.ink, marginTop: i ? 18 : 0, opacity: 0.35 + 0.65 * k(f, at, 8) }}>
                <span style={{ width: 52, height: 52, borderRadius: 14, background: k(f, at, 8) > 0.5 ? C.green : C.panel2, color: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>✓</span>{t}</div>)}
            </div>
          </Card>
        </div>;
      })()}

      {/* 3 — RM1: 95 sen covers costs, 5 sen stays */}
      {f >= s3 - 6 && f < s4 + 10 && (() => {
        const v = vis(f, s3, s4 + 6, 10), split = k(f, w("L03", "keeps"), 16), five = w("L03", "five");
        const R = 260, a0 = -Math.PI / 2, a1 = a0 + 2 * Math.PI * 0.05;
        const wedge = `M0 0 L${R * Math.cos(a0)} ${R * Math.sin(a0)} A${R} ${R} 0 0 1 ${R * Math.cos(a1)} ${R * Math.sin(a1)} Z`;
        const rest = `M0 0 L${R * Math.cos(a1)} ${R * Math.sin(a1)} A${R} ${R} 0 1 1 ${R * Math.cos(a0)} ${R * Math.sin(a0)} Z`;
        return <div style={{ position: "absolute", inset: 0, opacity: v }}>
          <Headline f={f} at={s3} text="5 SEN OF EVERY RM1" accent="5" />
          <svg width={1080} height={800} style={{ position: "absolute", left: 0, top: 480 }}>
            <g transform={`translate(${540 - 60 * split} ${380}) rotate(${f * 0.3})`}><path d={rest} fill={C.panel2} stroke={C.line} strokeWidth={3} /></g>
            <g transform={`translate(${540 + 220 * split} ${380 - 120 * split})`}><path d={wedge} fill={C.green} /></g>
            <text x={540 - 60 * split} y={400} textAnchor="middle" fill={C.ink} style={{ fontFamily: SANS, fontWeight: 800, fontSize: 110 }}>RM1</text>
          </svg>
          <div style={{ position: "absolute", left: 90, top: 1150, fontFamily: SANS, fontSize: 44, color: C.dim, opacity: split }}>95 sen: stock, rent, staff, trucks</div>
          <div style={{ position: "absolute", left: 640, top: 1000, opacity: k(f, five, 8) }}><Count f={f} a={five} b={five + 1} from={5} to={5} suffix=" sen" size={100} color={C.green} /></div>
        </div>;
      })()}

      {/* 4 — brands pay too: fee chips fly off the shelf into the profit bar (≈ half, 2Q 2024) */}
      {f >= s4 - 6 && f < s5 + 10 && (() => {
        const v = vis(f, s4, s5 + 6, 10), year = w("L04", "2024"), half = w("L04", "half");
        const fees = [["DISPLAY FEE", w("L04", "shelf")], ["SALES TARGET", w("L04", "targets")], ["WAREHOUSE FEE", w("L04", "warehouses")]] as [string, number][];
        const bar = k(f, half, 18);
        return <div style={{ position: "absolute", inset: 0, opacity: v }}>
          <Headline f={f} at={s4} text="BRANDS PAY TOO" accent="BRANDS" />
          {[0, 1, 2].map((r) => <div key={r} style={{ position: "absolute", left: 90, top: 640 + r * 190, width: 560, height: 16, borderRadius: 8, background: "#3A3D46" }} />)}
          {Array.from({ length: 9 }).map((_, i) => {
            const r = Math.floor(i / 3), c = i % 3, t = k(f, s4 + 4 + i * 5, 14);
            return <div key={i} style={{ position: "absolute", left: 110 + c * 180 + lerp(700, 0, t), top: 640 + r * 190 - 140, width: 140, height: 140, borderRadius: 14,
              background: ["#3D6B8C", "#8C5A3D", "#5A8C3D"][c], opacity: t }} />;
          })}
          {fees.map(([t, at], i) => {
            const fly = k(f, at, 16);
            return <div key={i} style={{ position: "absolute", left: lerp(160, 700, fly), top: lerp(560 + i * 190, 520 + i * 90, fly), padding: "12px 22px", borderRadius: 30,
              background: C.green, color: C.bg, fontFamily: SANS, fontWeight: 800, fontSize: 32, opacity: k(f, at, 6), whiteSpace: "nowrap" }}>{t}</div>;
          })}
          <div style={{ position: "absolute", left: 740, top: 820, width: 120, height: 420, borderRadius: 18, background: C.panel2, border: `2px solid ${C.line}`, opacity: k(f, year, 10), overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 420 * 0.48 * bar, background: C.green }} />
          </div>
          <div style={{ position: "absolute", left: 880, top: 1110, width: 150, fontFamily: SANS, fontWeight: 800, fontSize: 40, color: C.green, opacity: bar }}>≈ half</div>
          <div style={{ position: "absolute", left: 690, top: 1250, width: 300, fontFamily: MONO, fontSize: 30, lineHeight: "38px", color: C.dim, opacity: k(f, year, 10) }}>operating profit<br />Q2 2024</div>
        </div>;
      })()}

      {/* 5 — paid twice; part 2 */}
      {f >= s5 - 6 && f < end + 20 && (() => {
        const v = vis(f, s5, end + 16, 10), you = k(f, w("L05", "every"), 14), br = k(f, w("L05", "gets"), 14);
        return <div style={{ position: "absolute", inset: 0, opacity: v }}>
          <Headline f={f} at={s5} text="PAID TWICE" accent="TWICE" />
          <div style={{ position: "absolute", left: 340, top: 700, width: 400, height: 16, borderRadius: 8, background: "#3A3D46" }} />
          {[0, 1, 2].map((c) => <div key={c} style={{ position: "absolute", left: 360 + c * 130, top: 590, width: 110, height: 110, borderRadius: 12, background: ["#3D6B8C", "#8C5A3D", "#5A8C3D"][c] }} />)}
          <div style={{ position: "absolute", left: 470, top: lerp(1250, 820, you), fontFamily: SANS, fontWeight: 800, fontSize: 48, color: C.ink, opacity: you }}>↑ YOU</div>
          <div style={{ position: "absolute", left: lerp(1100, 780, br), top: 620, fontFamily: SANS, fontWeight: 800, fontSize: 48, color: C.green, opacity: br }}>← BRANDS</div>
          <Stamp f={f} at={w("L05", "twice")} text="PAID TWICE" color={C.green} x={540} y={1040} size={78} rot={-6} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 1180, textAlign: "center", fontFamily: MONO, fontSize: 44, color: C.ink, opacity: k(f, w("L05", "part"), 10) }}>PART 2: MR DIY →</div>
        </div>;
      })()}

      {f >= end - 2 && <EndCard f={f} at={end} next="Part 2: Mr DIY →" />}
      {f < end && <Captions blocks={caps as any} frame={f} />}
      {HAS_VOICE && <Audio src={staticFile("voice.wav")} />}
    </AbsoluteFill>
  );
}

registerRoot(() => <Composition id="ex25" component={Piece} width={1080} height={1920} fps={30} durationInFrames={N} />);
