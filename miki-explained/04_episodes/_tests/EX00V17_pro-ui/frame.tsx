// EX00V17 — the professional UI look, two style frames for EX24 (hook, mechanism). Cards are slabs with pages on their
// faces in a dark studio; real McDonald's photos (Wikimedia Commons, CC BY / CC BY-SA, credited) and the real logo.
import { AbsoluteFill, Composition, Easing, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { Card3D, PX, ProStage, T, surface } from "../../../tools/raea/kit/pro";
import { Icon } from "../../../tools/raea/kit/icons";

const CL = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const k = (f: number, a: number, d = 14) => interpolate(f, [a, a + d], [0, 1], { ...CL, easing: ease });

// ---------- pages ----------
function AppPage({ f, w, h }: { f: number; w: number; h: number }) {
  const clean = k(f, 20, 16);
  return (
    <div style={surface({ fontFamily: T.sans, color: T.ink })}>
      <div style={{ height: 64, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 40px", fontSize: 26, color: T.ink2 }}>
        <span>9:41</span><span style={{ display: "flex", gap: 10 }}><Icon name="map-pin" size={26} color={T.ink2} />Desserts</span></div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "16px 40px 24px" }}>
        <img src={staticFile("mcdonalds_arches.svg")} style={{ width: 64, height: 56 }} />
        <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -0.5 }}>Desserts</div>
      </div>
      <div style={{ margin: "0 32px", height: h * PX * 0.42, borderRadius: 24, overflow: "hidden", position: "relative" }}>
        <img src={staticFile("mcd_sundae.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", filter: `grayscale(${1 - clean}) brightness(${0.75 + 0.25 * clean})` }} />
        <div style={{ position: "absolute", left: 24, bottom: 24, display: "flex", alignItems: "center", gap: 12, padding: "12px 22px", borderRadius: 40,
          background: clean > 0.5 ? "rgba(87,209,0,0.16)" : "rgba(255,90,78,0.18)", border: `2px solid ${clean > 0.5 ? T.green : T.red}`, backdropFilter: "blur(8px)" }}>
          <Icon name={clean > 0.5 ? "refresh-cw" : "triangle-alert"} size={30} color={clean > 0.5 ? T.green : T.red}
            style={{ transform: clean > 0.5 ? `rotate(${f * 6}deg)` : undefined }} />
          <span style={{ fontSize: 30, fontWeight: 600, color: clean > 0.5 ? T.green : T.red }}>{clean > 0.5 ? "Cleaning cycle" : "Unavailable"}</span>
        </div>
      </div>
      <div style={{ padding: "28px 40px 0" }}>
        <div style={{ fontSize: 48, fontWeight: 700 }}>Sundae</div>
        <div style={{ fontSize: 28, color: T.ink2, marginTop: 8 }}>Soft serve, chocolate topping</div>
      </div>
      {["Cone", "Apple pie", "Float"].map((n, i) => (
        <div key={n} style={{ margin: `${i ? 12 : 30}px 32px 0`, padding: "22px 26px", borderRadius: 20, background: T.surface2, display: "flex", justifyContent: "space-between",
          fontSize: 32, fontWeight: 600 }}><span>{n}</span><Icon name="arrow-right" size={30} color={T.ink3} /></div>
      ))}
    </div>
  );
}

function StatusPage({ f }: { f: number }) {
  const left = Math.max(0, 3 * 3600 + 12 * 60 - f * 37);
  const hh = Math.floor(left / 3600), mm = String(Math.floor((left % 3600) / 60)).padStart(2, "0");
  return (
    <div style={surface({ fontFamily: T.sans, color: T.ink, padding: "30px 34px", display: "flex", gap: 24, alignItems: "center" })}>
      <div style={{ width: 92, height: 92, borderRadius: 24, background: "rgba(87,209,0,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="refresh-cw" size={48} color={T.green} style={{ transform: `rotate(${f * 6}deg)` }} /></div>
      <div>
        <div style={{ fontSize: 26, color: T.ink2 }}>Ice cream machine</div>
        <div style={{ fontSize: 38, fontWeight: 700, marginTop: 4 }}>Heat-treat cycle</div>
        <div style={{ fontSize: 28, color: T.green, marginTop: 6, fontFamily: T.mono }}>{hh}h {mm}m left</div>
      </div>
    </div>
  );
}

function PhotoPage() {
  return <div style={surface()}><img src={staticFile("mcd_machine.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>;
}

function ChartPage({ f, w, h }: { f: number; w: number; h: number }) {
  // one night: 4 °C → heat to 66 °C (pasteurise) → hold → cool back to frozen; drawn on as the frame advances
  const W = w * PX - 80, H = h * PX * 0.52;
  const pts = [[0, 4], [0.12, 4], [0.38, 66], [0.55, 66], [0.85, -6], [1, -6]];
  const X = (t: number) => 40 + t * W, Y = (c: number) => 40 + (1 - (c + 10) / 80) * H;
  const prog = k(f, 4, 70);
  const d = pts.map(([t, c], i) => `${i ? "L" : "M"}${X(t)},${Y(c)}`).join(" ");
  const ring = k(f, 30, 60), R = 90, circ = 2 * Math.PI * R;
  return (
    <div style={surface({ fontFamily: T.sans, color: T.ink })}>
      <div style={{ padding: "34px 40px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div><div style={{ fontSize: 28, color: T.ink2 }}>Every night</div><div style={{ fontSize: 52, fontWeight: 700, letterSpacing: -0.5 }}>Heat, then refreeze</div></div>
        <div style={{ display: "flex", gap: 14 }}><Icon name="thermometer" size={44} color={T.red} /><Icon name="snowflake" size={44} color={T.blue} /></div>
      </div>
      <svg width={w * PX} height={H + 120} style={{ position: "absolute", left: 0, top: 150 }}>
        {[66, 4].map((c) => <g key={c}><line x1={40} x2={40 + W} y1={Y(c)} y2={Y(c)} stroke={T.line} strokeWidth={2} strokeDasharray="6 8" />
          <text x={40 + W} y={Y(c) - 12} fill={T.ink3} fontSize={24} textAnchor="end" fontFamily={T.mono}>{c} °C</text></g>)}
        <path d={d} fill="none" stroke={T.ink3} strokeWidth={4} opacity={0.25} />
        <path d={d} fill="none" stroke="url(#heat)" strokeWidth={8} strokeLinecap="round" strokeDasharray={`${prog * 2400} 2400`} />
        <defs><linearGradient id="heat" x1="0" x2="1"><stop offset="0.1" stopColor={T.amber} /><stop offset="0.45" stopColor={T.red} /><stop offset="0.75" stopColor={T.blue} /></linearGradient></defs>
        {prog > 0.45 && <g><circle cx={X(0.46)} cy={Y(66)} r={12} fill={T.red} /><text x={X(0.46)} y={Y(66) - 28} fill={T.ink} fontSize={30} fontWeight={700} textAnchor="middle" fontFamily={T.sans}>66 °C</text></g>}
      </svg>
      <div style={{ position: "absolute", left: 40, bottom: 40, display: "flex", alignItems: "center", gap: 28 }}>
        <svg width={2 * R + 24} height={2 * R + 24}><circle cx={R + 12} cy={R + 12} r={R} stroke={T.surface2} strokeWidth={14} fill="none" />
          <circle cx={R + 12} cy={R + 12} r={R} stroke={T.green} strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={`${ring * circ} ${circ}`} transform={`rotate(-90 ${R + 12} ${R + 12})`} /></svg>
        <div><div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -1 }}>4 hours</div><div style={{ fontSize: 28, color: T.ink2 }}>out of service, every night</div></div>
      </div>
    </div>
  );
}

// ---------- the frames ----------
function Headline({ a, b }: { a: string; b: string }) {
  return <div style={{ position: "absolute", left: 72, right: 140, top: 200, fontFamily: T.sans, fontWeight: 800, fontSize: 88, lineHeight: "98px", letterSpacing: -2, color: T.ink }}>
    {a} <span style={{ color: T.green }}>{b}</span></div>;
}

function Hook() {
  const f = useCurrentFrame(), dz = f * 0.004;
  return (
    <AbsoluteFill style={{ background: T.bg0 }}>
      <ProStage cam={{ p: [0.3 - f * 0.002, 0.1, 4.9 - dz], t: [0.05, 0.02, 0] }} focus={4.85 - dz} aperture={1.4}>
        <Card3D name="photo" p={[-0.75, 0.55, -1.5]} w={1.6} h={1.2} ry={0.25}><PhotoPage /></Card3D>
        <Card3D name="app" p={[-0.08, -0.12, 0]} w={0.95} h={1.75} ry={-0.2}><AppPage f={f} w={0.95} h={1.75} /></Card3D>
        <Card3D name="status" p={[0.36, -0.86, 0.75]} w={0.9} h={0.3} ry={-0.32}><StatusPage f={f} /></Card3D>
      </ProStage>
      <Headline a="Not broken." b="Cleaning." />
    </AbsoluteFill>
  );
}

function Mechanism() {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: T.bg0 }}>
      <ProStage cam={{ p: [-0.4 + f * 0.003, 0.1, 4.5], t: [0, 0.0, 0] }} focus={4.5} aperture={1.4} keyAt={[3, 5, 6]}>
        <Card3D name="photo2" p={[0.85, 0.75, -1.6]} w={1.6} h={1.2} ry={-0.3}><PhotoPage /></Card3D>
        <Card3D name="chart" p={[0, -0.2, 0]} w={1.05} h={1.45} ry={0.18}><ChartPage f={f} w={1.05} h={1.45} /></Card3D>
      </ProStage>
      <Headline a="66 °C, then" b="4 hours." />
    </AbsoluteFill>
  );
}

registerRoot(() => <>
  <Composition id="hook" component={Hook} width={1080} height={1920} fps={30} durationInFrames={90} />
  <Composition id="mech" component={Mechanism} width={1080} height={1920} fps={30} durationInFrames={90} />
</>);
