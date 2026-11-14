
// ================= camera map (review tool, RECIPE-D § 8.1): one page per set, seen from above =================
// Each setup's camera path (start ○ → end ▶, sampled through its drift), a thin line to where it looks, the setup number,
// and a table: time, lens, height and distance start → end, and the move in words. Needs SETUPS, ST, camOf, NSET, dist3.
// Render: raea render film42.tsx --composition cammap -o media/_cm   (one PNG per set)
const SETNAMES: Record<string, string> = { t: "Kopitiam table", s: "Toll · parking · top-up", b: "Bank" };
const SETORDER = SETUPS.map((s) => s.set).filter((s, i, a) => a.indexOf(s) === i);
const PAL = ["#ff5a5a", "#ffb03a", "#f5e663", "#7be37b", "#4fd2e8", "#6f8cff", "#c57bff", "#ff7bd1"];
function movesOf(k: number) {
  const c = SETUPS[k], a = c.a, b = c.b, da = dist3(a.p, a.l), db = dist3(b.p, b.l), w: string[] = [];
  const ang = (p: number[], l: number[]) => Math.atan2(p[0] - l[0], p[2] - l[2]) * 180 / Math.PI;
  const el = (p: number[], l: number[]) => Math.atan2(p[1] - l[1], Math.hypot(p[0] - l[0], p[2] - l[2])) * 180 / Math.PI;
  const dAz = ((ang(b.p, b.l) - ang(a.p, a.l) + 540) % 360) - 180, dEl = el(b.p, b.l) - el(a.p, a.l), dd = (db - da) / da, dl = dist3(a.l, b.l);
  if (Math.abs(dd) > 0.04) w.push(`${dd < 0 ? "push in" : "pull out"} ${Math.abs(dd * 100).toFixed(0)}%`);
  if (Math.abs(dAz) > 3) w.push(`orbit ${dAz > 0 ? "→" : "←"} ${Math.abs(dAz).toFixed(0)}°`);
  if (Math.abs(dEl) > 3) w.push(`${dEl > 0 ? "crane up" : "crane down"} ${Math.abs(dEl).toFixed(0)}°`);
  if (dl > 0.15 * da) w.push("look-at travels");
  if (c.fd) w.push("rack focus");
  if (c.up && Math.abs(c.up[0]) + Math.abs(c.up[2]) > 0.05 && Math.abs(c.up[1]) > 0.5) w.push("tilted horizon");
  if (!w.length) w.push("drift");
  return { w: w.join(", "), da, db, ha: a.p[1], hb: b.p[1], el: el(a.p, a.l) };
}
function CamMap() {
  const set = SETORDER[useCurrentFrame()] ?? SETORDER[0], ks = SETUPS.map((s, k) => k).filter((k) => SETUPS[k].set === set);
  // sample each camera path through its own setup time (the film's drift; flights between setups are not drawn)
  const paths = ks.map((k) => { const pts: number[][] = []; for (let i = 0; i <= 12; i++) { T = lerp(ST[k], ST[k + 1] - 1e-3, i / 12); const c = camOf(k); pts.push([c.p[0], c.p[2], c.l[0], c.l[2]]); } return pts; });
  const xs = paths.flat().flatMap((p) => [p[0], p[2]]), zs = paths.flat().flatMap((p) => [p[1], p[3]]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), z0 = Math.min(...zs), z1 = Math.max(...zs), span = Math.max(x1 - x0, z1 - z0, 0.2) * 1.15;
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, S_ = 960 / span, X = (x: number) => 540 + (x - cx) * S_, Y = (z: number) => 600 + (z - cz) * S_;
  const fmt = (t: number) => `${Math.floor(t / 60)}:${(t % 60).toFixed(1).padStart(4, "0")}`;
  return (
    <AbsoluteFill style={{ background: "#111214", fontFamily: "Menlo, monospace", color: "#e6e6e6" }}>
      <div style={{ position: "absolute", left: 50, top: 40, fontSize: 44, fontWeight: 700 }}>Camera map · {SETNAMES[set] ?? set}</div>
      <div style={{ position: "absolute", left: 50, top: 100, fontSize: 24, color: "#9a9da4" }}>from above · ○ start ▶ end · dashed = where it looks · grid {(span / 8).toFixed(2)} m</div>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1080} height={1920}>
        {[...Array(9)].map((_, i) => <line key={"gx" + i} x1={60 + i * 120} y1={120} x2={60 + i * 120} y2={1080} stroke="#24262b" />)}
        {[...Array(9)].map((_, i) => <line key={"gy" + i} x1={60} y1={120 + i * 120} x2={1020} y2={120 + i * 120} stroke="#24262b" />)}
        {paths.map((pts, j) => { const col = PAL[ks[j] % PAL.length], e = pts[pts.length - 1], s0 = pts[0], ang = Math.atan2(Y(e[1]) - Y(pts[10][1]), X(e[0]) - X(pts[10][0]));
          return (<g key={j}>
            <line x1={X(e[0])} y1={Y(e[1])} x2={X(e[2])} y2={Y(e[3])} stroke={col} strokeWidth={1.5} strokeDasharray="6 6" opacity={0.6} />
            <circle cx={X(e[2])} cy={Y(e[3])} r={5} fill={col} opacity={0.7} />
            <polyline points={pts.map((p) => `${X(p[0])},${Y(p[1])}`).join(" ")} fill="none" stroke={col} strokeWidth={5} />
            <circle cx={X(s0[0])} cy={Y(s0[1])} r={10} fill="none" stroke={col} strokeWidth={3} />
            <polygon points={[0, 1, 2].map((q) => { const a = ang + [0, 2.5, -2.5][q], r = q ? 16 : 0; return `${X(e[0]) + (q ? Math.cos(a) * r : Math.cos(ang) * 6)},${Y(e[1]) + (q ? Math.sin(a) * r : Math.sin(ang) * 6)}`; }).join(" ")} fill={col} />
            <text x={X(s0[0]) + 14} y={Y(s0[1]) - 12} fill={col} fontSize={30} fontWeight={700}>{ks[j] + 1}</text>
          </g>); })}
      </svg>
      <div style={{ position: "absolute", left: 40, top: 1110, width: 1010, fontSize: 21, lineHeight: 1.45, whiteSpace: "pre-wrap" }}>
        <div style={{ color: "#9a9da4" }}>{"#   time         lens height m   dist m      move"}</div>
        {ks.map((k) => { const m = movesOf(k), c = SETUPS[k];
          return <div key={k} style={{ color: PAL[k % PAL.length] }}>{`${String(k + 1).padEnd(3, " ")} ${fmt(ST[k])}–${fmt(ST[k + 1])}  ${String(c.fov ?? 30).padStart(2, " ")}° ${m.ha.toFixed(2)}→${m.hb.toFixed(2)}  ${m.da.toFixed(2)}→${m.db.toFixed(2)}  ${m.w}${c.tr ? ` (arrives: ${c.tr})` : ""}`}</div>; })}
      </div>
    </AbsoluteFill>
  );
}
