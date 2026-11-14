// ================= sets (EX43: how to check an investment scam — 80 % interface, 20 % physical) =================
const INK = "#1C2430", PAPER = "#EEF1F4", TEAL = "#1F6F78", FLAG = "#D6452E", GOLD = "#E8B53A", ICE = "#8EC9F0";
const PS = "'Public Sans', 'Helvetica Neue', Arial, sans-serif", ANT = "Anton, Impact, sans-serif";
// ---------- the physical desk (setups 1, 9, 13, 18): the flyer, the phone ----------
const VT = [300, 0, 0], TY = 0.75;
const FLY = [VT[0] - 0.08, TY + 0.0015, VT[2] + 0.02], PHN = [VT[0] + 0.17, TY + 0.006, VT[2] + 0.08];
function Phone({ p, scr, k, ry = -0.25 }: { p: number[]; scr: string; k: string; ry?: number }) {
  return (<Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromEuler("YXZ", ry, -Math.PI / 2, 0))}>
    <Mesh3d name={k + "b"}><Cuboid half_size={[0.038, 0.078, 0.004]} /><StandardMaterial base_color="#16171b" metallic={0.4} perceptual_roughness={0.3} /></Mesh3d>
    <Mesh3d name={k + "r"}><Cuboid half_size={[0.0386, 0.0786, 0.0032]} /><StandardMaterial base_color="#8a8f98" metallic={0.8} perceptual_roughness={0.25} /></Mesh3d>
    <Card k={k + scr} p={[0, 0, 0.0042]} size={[0.068, 0.145]} tex={scr} em={1.0} />
  </Entity>);
}
function DeskSet({ n }: { n: number }) {
  const P: any[] = [];
  P.push(<Mesh3d key="dt" transform={Transform.fromXyz(VT[0], TY - 0.02, VT[2])}><Cuboid half_size={[0.9, 0.02, 0.55]} /><StandardMaterial base_color="#2b313b" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([2, 2])} perceptual_roughness={0.55} /></Mesh3d>);
  P.push(<Mesh3d key="fl" transform={Transform.fromXyz(VT[0], -0.02, VT[2])}><Cuboid half_size={[5, 0.02, 5]} /><StandardMaterial base_color="#14181f" perceptual_roughness={0.8} /></Mesh3d>);
  const drop = n === 1 ? on(1, 0.5, -0.4) : 1;                       // the flyer lands, already moving at frame 0
  P.push(<Card key="fly" k="fly" p={[FLY[0], FLY[1] + (1 - drop) * 0.25, FLY[2] - (1 - drop) * 0.1]} size={[0.21, 0.297]} tex="flyer" rx={-Math.PI / 2 + (1 - drop) * 0.5} rz={0.12 - (1 - drop) * 0.3} em={0.15} />);
  if (n === 18) { const st = on(118, 0.3, -0.2);
    P.push(<Mesh3d key="chk" name="chk" transform={Transform.fromXyz(FLY[0], TY + 0.004, FLY[2]).withRotation(Quat.fromEuler("XYZ", -Math.PI / 2, 0, 0.3)).withScale(sc3(st))}><Cuboid half_size={[0.08, 0.012, 0.0004]} /><StandardMaterial base_color={TEAL} unlit /></Mesh3d>); }
  const scr = n === 9 ? "scr_transfer" : n === 13 ? `scr_dial${T >= W(92) - 0.05 ? 3 : T >= W(92) - 0.25 ? 2 : T >= W(91) ? 1 : 0}` : "scr_transfer";
  P.push(<Phone key="ph" k="ph" p={PHN} scr={scr} />);
  return (<>{P}
    <SpotLight transform={Transform.fromXyz(VT[0] - 0.4, TY + 1.0, VT[2] + 0.5).lookingAt([VT[0], TY, VT[2]])} intensity={26000} outer_angle={0.75} inner_angle={0.3} color="#ffe9cc" shadow_maps_enabled range={4} />
    <RectLight transform={Transform.fromXyz(VT[0] + 0.8, TY + 0.9, VT[2] - 0.4).lookingAt([VT[0], TY, VT[2]])} intensity={9000} width={1.2} height={0.5} color="#b9c9e6" range={4} />
    <AmbientLight brightness={30} color="#9fb0d0" />
    <Environment src={S("sky.hdr")} intensity={0.15} />
  </>);
}

// ---------- the interfaces (illustrations of the real tools; the address bar names where to go) ----------
const typed = (s: string, t0: number, d: number) => s.slice(0, Math.round(s.length * cl((T - t0) / d)));
function Browser({ url, children }: { url: string; children: any }) {
  return (<div style={{ position: "absolute", left: 60, top: 330, width: 960, height: 1330, borderRadius: 34, overflow: "hidden", background: PAPER, boxShadow: "0 30px 80px rgba(0,0,0,0.55)", fontFamily: PS, color: INK }}>
    <div style={{ height: 96, background: "#dfe4ea", display: "flex", alignItems: "center", padding: "0 30px", gap: 18 }}>
      <svg width={26} height={30}><rect x={3} y={13} width={20} height={15} rx={3} fill="#5d6673" /><path d="M7 13 V9 a6 6 0 0 1 12 0 V13" stroke="#5d6673" strokeWidth={3} fill="none" /></svg>
      <div style={{ fontSize: 32, color: "#3a4452" }}>{url}</div>
    </div>
    <div style={{ padding: "44px 50px" }}>{children}</div>
    <div style={{ position: "absolute", right: 30, bottom: 22, fontSize: 22, color: "#8a93a0" }}>illustration of the site</div>
  </div>);
}
function Search({ text, t0, d = 0.9, label }: { text: string; t0: number; d?: number; label: string }) {
  const s = typed(text, t0, d), caret = Math.floor(T * 2) % 2 === 0 && s.length < text.length;
  return (<div style={{ marginTop: 34 }}>
    <div style={{ fontSize: 28, color: "#5d6673", marginBottom: 12 }}>{label}</div>
    <div style={{ height: 96, borderRadius: 16, border: `3px solid ${s ? TEAL : "#c4ccd6"}`, background: "#fff", display: "flex", alignItems: "center", padding: "0 28px", fontSize: 42, gap: 18 }}>
      <svg width={36} height={36}><circle cx={15} cy={15} r={11} stroke={TEAL} strokeWidth={4} fill="none" /><line x1={23} y1={23} x2={33} y2={33} stroke={TEAL} strokeWidth={4} /></svg>
      <span>{s}</span>{caret ? <span style={{ width: 3, height: 46, background: INK }} /> : null}
    </div>
  </div>);
}
const ROWS = [["Asia Profit Hub", "2026"], ["Profit Emas Club", "2026"], ["Golden Lot FX", "2025"], ["Kaya Cepat Digital", "2025"]];
function ResultTable({ hit, show, stamp = 0 }: { hit: number; show: number; stamp?: number }) {
  return (<div style={{ marginTop: 40 }}>
    <div style={{ display: "flex", fontSize: 26, color: "#5d6673", padding: "0 20px 12px", borderBottom: "2px solid #c4ccd6" }}><span style={{ flex: 1 }}>Name</span><span>Added</span></div>
    {ROWS.map(([nm, yr], i) => { const isHit = nm === "Profit Emas Club", vis = isHit ? 1 : 1 - hit;
      if (vis < 0.02) return null;
      return (<div key={i} style={{ position: "relative", display: "flex", alignItems: "center", fontSize: 38, padding: "26px 20px", borderBottom: "1px solid #d5dbe2", opacity: vis * show, background: isHit ? `rgba(214,69,46,${0.12 * hit})` : "transparent", borderLeft: isHit ? `${Math.round(10 * hit)}px solid ${FLAG}` : "none", transform: `translateY(${(1 - show) * 20}px)` }}>
        <span style={{ flex: 1, fontWeight: isHit ? 700 : 400 }}>{nm}</span><span style={{ color: "#5d6673" }}>{yr}</span>
        {isHit && stamp > 0.01 ? <span style={{ position: "absolute", right: 120, top: 8, padding: "6px 20px", border: `5px solid ${FLAG}`, color: FLAG, fontWeight: 800, fontSize: 40, borderRadius: 10, transform: `rotate(-8deg) scale(${lerp(1.6, 1, stamp)})`, opacity: stamp }}>LISTED</span> : null}
      </div>); })}
    <div style={{ fontSize: 22, color: "#8a93a0", marginTop: 16 }}>names on this page are invented examples</div>
  </div>);
}
function UiBnm({ n }: { n: number }) {
  const close = n === 5 ? on(33, 0.4, -0.1) : 0, hit = n === 3 ? 0 : n === 4 ? on(30, 0.35, -0.2) : 1;
  return (<div style={{ position: "absolute", inset: 0, transform: `translateX(${-close * 260}px) scale(${1 - 0.08 * close})`, opacity: 1 - close * 0.55 }}>   {/* "walk away": the page backs off, the stamp stays readable */}
    <Browser url="bnm.gov.my/financial-consumer-alert-list">
      <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.1 }}>Financial Consumer Alert List</div>
      <div style={{ fontSize: 30, color: "#4a5361", marginTop: 16, lineHeight: 1.35 }}>Companies and schemes that may be wrongly presented as licensed or regulated by Bank Negara Malaysia.</div>
      <Search text="Profit Emas" t0={W(19) - 0.1} d={1.2} label="Search the list" />
      <ResultTable hit={hit} show={n === 3 ? on(25, 0.4, -0.2) : 1} stamp={n === 5 ? on(32, 0.3, -0.2) : 0} />
    </Browser></div>);
}
function UiSc({ n }: { n: number }) {
  const lic = n >= 7;
  return (<Browser url={lic ? "sc.com.my/licensed-and-registered-persons" : "sc.com.my/investor-alert-list"}>
    <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.1 }}>{lic ? "Licensed and registered persons" : "Investor Alert List"}</div>
    <div style={{ fontSize: 30, color: "#4a5361", marginTop: 16, lineHeight: 1.35 }}>{lic ? "Firms the Securities Commission has licensed or registered." : "Unauthorised entities and individuals. Do not deal with or invest through them."}</div>
    <Search text="Profit Emas" t0={lic ? W(45) - 0.2 : W(38) - 0.2} d={0.9} label={lic ? "Search licensed firms" : "Search the list"} />
    {lic ? <div style={{ marginTop: 60, padding: "50px 40px", borderRadius: 20, border: "3px dashed #b4bcc7", textAlign: "center", opacity: on(47, 0.35, -0.2) }}>
      <div style={{ fontSize: 46, fontWeight: 700 }}>No match found</div><div style={{ fontSize: 30, color: "#4a5361", marginTop: 12 }}>"Profit Emas Club" is not a licensed firm.</div></div>
      : <ResultTable hit={on(41, 0.35, -0.2)} show={on(40, 0.4, -0.3)} />}
  </Browser>);
}
function UiFlyerButton() {
  const g = on(51, 0.35, -0.2), x = on(52, 0.35, -0.1);
  return (<div style={{ position: "absolute", left: 90, top: 340, width: 900, height: 1272 * 0.9 / 0.9, transformOrigin: "50% 0" }}>
    <img src={S("tx/flyer.png")} style={{ width: 900, height: 1272, borderRadius: 18, filter: `saturate(${1 - 0.7 * g})`, boxShadow: "0 30px 80px rgba(0,0,0,0.55)" }} />
    <div style={{ position: "absolute", left: 170, top: 830, width: 560, height: 130, borderRadius: 60, background: `rgba(120,126,136,${g})` }} />
    <div style={{ position: "absolute", left: 150, top: 893, width: 600 * x, height: 10, background: INK, transform: "rotate(-6deg)", transformOrigin: "0 50%" }} />
    <div style={{ position: "absolute", left: 250, top: 990, padding: "10px 26px", borderRadius: 40, background: TEAL, color: "#fff", fontFamily: PS, fontSize: 36, fontWeight: 700, opacity: x }}>Not licensed: don't invest</div>
  </div>);
}
function UiSemak({ n }: { n: number }) {
  const res = n >= 11;
  return (<Browser url="semakmule.rmp.gov.my">
    <div style={{ fontSize: 58, fontWeight: 700 }}>Semak Mule</div>
    <div style={{ fontSize: 30, color: "#4a5361", marginTop: 12 }}>Check a bank account, phone number or company against police reports.</div>
    <Search text="5621 0098 4412" t0={W(60) - 0.1} d={0.9} label="Bank account number" />
    <Search text="012-345 6789" t0={W(63) - 0.1} d={0.7} label="Phone number" />
    <div style={{ marginTop: 36, height: 96, borderRadius: 48, background: TEAL, color: "#fff", fontSize: 40, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${n === 10 ? lerp(1, 0.96, on(68, 0.12)) : 1})` }}>Search</div>
    {res ? <div style={{ marginTop: 40, padding: "36px 40px", borderRadius: 20, background: "#fff", border: "3px solid #c4ccd6", opacity: n === 11 ? on(72, 0.3, -0.2) : 1 }}>
      <div style={{ fontSize: 42, fontWeight: 700 }}>No record found</div>
      <div style={{ fontSize: 32, color: FLAG, marginTop: 14, fontWeight: 600, opacity: n === 11 ? on(75, 0.3, -0.15) : 1 }}>This is not proof the account is safe.</div>
      {n >= 12 ? <div style={{ marginTop: 26, display: "flex", alignItems: "baseline", gap: 18, opacity: on(79, 0.3, -0.2) }}><span style={{ fontSize: 120, fontWeight: 800 }}>0</span><span style={{ fontSize: 32, color: "#4a5361" }}>reports so far: maybe nobody has reported it yet</span></div> : null}
    </div> : null}
  </Browser>);
}
function UiRing() {
  const f = lin(W(94) - 0.1, W(95) + 0.3), R = 300, c = 2 * Math.PI * R;
  return (<div style={{ position: "absolute", left: 0, top: 380, width: 1080, height: 1200, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: PS }}>
    <svg width={760} height={760} style={{ position: "absolute" }}><circle cx={380} cy={380} r={R} stroke="#2a3340" strokeWidth={34} fill="none" />
      <circle cx={380} cy={380} r={R} stroke={ICE} strokeWidth={34} fill="none" strokeDasharray={`${c * f} ${c}`} transform="rotate(-90 380 380)" strokeLinecap="round" /></svg>
    <div style={{ textAlign: "center", color: "#fff" }}><div style={{ fontSize: 190, fontWeight: 800, letterSpacing: -4 }}>997</div><div style={{ fontSize: 46, color: ICE }}>{Math.round(24 * f)} hours a day</div>
      <div style={{ fontSize: 28, color: "#9aa6b6", marginTop: 14 }}>National Scam Response Centre</div></div>
  </div>);
}
function UiFreeze() {
  const run = lin(W(98), W(105)), stop = on(106, 0.3, -0.15), p = Math.min(run, 0.62) ;
  return (<div style={{ position: "absolute", left: 90, top: 560, width: 900, fontFamily: PS, color: "#fff" }}>
    <div style={{ fontSize: 40, color: "#9aa6b6" }}>RM 5,000 leaving your account</div>
    <div style={{ marginTop: 26, height: 70, borderRadius: 35, background: "#2a3340", overflow: "hidden" }}>
      <div style={{ width: `${p * 100}%`, height: 70, background: stop > 0.5 ? ICE : FLAG, boxShadow: stop > 0.5 ? `0 0 40px ${ICE}` : "none" }} /></div>
    <div style={{ marginTop: 34, fontSize: 76, fontWeight: 800, color: stop > 0.5 ? ICE : "#fff", opacity: 0.4 + 0.6 * stop }}>{stop > 0.5 ? "Frozen" : "Sending…"}</div>
    <div style={{ marginTop: 18, fontSize: 30, color: "#9aa6b6" }}>The sooner you call, the more can be frozen.</div>
    <div style={{ marginTop: 10, fontSize: 22, color: "#6b7686" }}>illustration</div>
  </div>);
}
function UiStats() {
  const m = lerp(0, 34.05, lin(W(110) - 0.2, W(112) + 0.2)), a = on(113, 0.3, -0.1), b = on(114, 0.3, 0.1);
  const card = (big: string, small: string, o: number) => <div style={{ flex: 1, padding: "34px 30px", borderRadius: 22, background: "#232b37", opacity: o, transform: `translateY(${(1 - o) * 18}px)` }}><div style={{ fontSize: 60, fontWeight: 800 }}>{big}</div><div style={{ fontSize: 28, color: "#9aa6b6", marginTop: 6 }}>{small}</div></div>;
  return (<div style={{ position: "absolute", left: 80, top: 500, width: 920, fontFamily: PS, color: "#fff" }}>
    <div style={{ fontSize: 34, color: "#9aa6b6" }}>Kept from scammers in 2025</div>
    <div style={{ fontSize: 170, fontWeight: 800, letterSpacing: -5, lineHeight: 1.05, marginTop: 10 }}>RM{m.toFixed(2)}<span style={{ fontSize: 80 }}>m</span></div>
    <div style={{ display: "flex", gap: 24, marginTop: 50 }}>{card("146,167", "calls to 997", a)}{card("138,915", "accounts frozen", b)}</div>
    <div style={{ marginTop: 30, fontSize: 24, color: "#6b7686" }}>The Star, 3 Mar 2026, quoting the Home Minister</div>
  </div>);
}
const CHECKS = ["Bank Negara's alert list", "SC alert list + licensed firms", "Semak Mule: account and phone", "Paid already? Call 997"];
function UiChecklist({ n }: { n: number }) {
  return (<div style={{ position: "absolute", left: 90, top: 470, width: 900, fontFamily: PS }}>
    <div style={{ fontSize: 44, fontWeight: 700, color: "#fff", marginBottom: 30 }}>{n === 17 ? "Before you invest" : "Four free checks"}</div>
    {CHECKS.map((c, i) => { const inn = n === 2 ? on(13 + Math.min(i, 3), 0.3, -0.25 + i * 0.12) : 1, tick = n === 17 ? on(116 + i, 0.3, -0.2) : 0;
      return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 26, padding: "30px 32px", marginBottom: 18, borderRadius: 20, background: PAPER, color: INK, opacity: inn, transform: `translateX(${(1 - inn) * 60}px)` }}>
        <div style={{ width: 66, height: 66, borderRadius: 33, background: tick > 0.5 ? TEAL : "#d5dbe2", color: tick > 0.5 ? "#fff" : INK, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 800 }}>{tick > 0.5 ? "✓" : i + 1}</div>
        <div style={{ fontSize: 38, fontWeight: 600 }}>{c}</div></div>); })}
  </div>);
}
// the interface camera: zoom s around a focus point (fx, fy), drifting a → b inside the setup
function Ui({ n }: { n: number }) {
  const c = SETUPS[n - 1]; if (!c.ui) return null;
  const x = cl((T - ST[n - 1]) / (ST[n] - ST[n - 1])), u = 0.55 * x + 0.45 * ss(x, 0, 1);
  const s = lerp(c.ui.a[0], c.ui.b[0], u), fx = lerp(c.ui.a[1], c.ui.b[1], u), fy = lerp(c.ui.a[2], c.ui.b[2], u);
  const enter = ss(T, ST[n - 1] - 0.05, ST[n - 1] + 0.28), blur = (1 - enter) * 10;
  const sc = c.ui.screen, body = sc === "bnm" ? <UiBnm n={n} /> : sc === "sc" ? <UiSc n={n} /> : sc === "fly" ? <UiFlyerButton /> : sc === "semak" ? <UiSemak n={n} /> : sc === "ring" ? <UiRing /> : sc === "freeze" ? <UiFreeze /> : sc === "stats" ? <UiStats /> : <UiChecklist n={n} />;
  return (<div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: `radial-gradient(ellipse at 50% 40%, #273141 0%, ${INK} 55%, #10151d 100%)` }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, transformOrigin: "0 0", transform: `translate(${540 - fx * s}px, ${1000 - fy * s}px) scale(${s})`, filter: `blur(${blur}px)`, opacity: 0.4 + 0.6 * enter }}>{body}</div>
  </div>);
}

// ================= the 18 setups =================
type Pose = { p: number[]; l: number[] };
type Tag = { at: number[]; x: number; y: number; cap: string; big?: string; sub?: string; t: number };
type Setup = { set: string; a: Pose; b: Pose; fov?: number; fs?: number; up?: number[]; tr?: "in" | "out" | "side"; fd?: () => number | null; tags?: Tag[];
  count?: { v: () => string; unit: string; t?: number }; note?: string; src?: string; step?: number; ui?: { screen: string; a: number[]; b: number[] } };
const fromT = (l: number[], dir: number[], d: number) => { const k = Math.hypot(dir[0], dir[1], dir[2]); return [l[0] + (dir[0] / k) * d, l[1] + (dir[1] / k) * d, l[2] + (dir[2] / k) * d]; };
const dist3 = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const C = (p: number[], l: number[]): Pose => ({ p, l });
const num = (a: number, b: number, t0: number, t1: number, d = 0) => lerp(a, b, cl((T - t0) / (t1 - t0))).toFixed(d);
const DESKC = [VT[0] + 0.03, TY, VT[2] + 0.04];
const P1A = C(fromT(DESKC, [0.25, 1.3, 0.9], 0.85), DESKC);
const NOCAM = C([VT[0], 3, VT[2] + 3], [VT[0], 0, VT[2]]);           // UI setups: the 3D camera rests on the empty desk room
const U = (screen: string, a: number[], b: number[]) => ({ ui: { screen, a, b }, set: "u", a: NOCAM, b: NOCAM });
const SRC_BNM = "bnm.gov.my/financial-consumer-alert-list", SRC_SC = "sc.com.my/investor-alert-list", SRC_SM = "semakmule.rmp.gov.my (PDRM)";
const SETUPS: Setup[] = [
  /* 1 */ { set: "d", a: P1A, b: C(fromT(DESKC, [0.2, 1.4, 0.7], 0.7), DESKC), fov: 30, fs: 4 },
  /* 2 */ { ...U("check", [1.0, 540, 900], [1.04, 540, 880]) },
  /* 3 */ { ...U("bnm", [1.0, 540, 980], [1.1, 540, 900]) },
  /* 4 */ { ...U("bnm", [1.04, 540, 1000], [1.08, 540, 1020]) },
  /* 5 */ { ...U("bnm", [1.08, 540, 1020], [1.03, 540, 1000]) },
  /* 6 */ { ...U("sc", [1.0, 540, 980], [1.1, 540, 920]) },
  /* 7 */ { ...U("sc", [1.1, 540, 960], [1.12, 540, 1020]) },
  /* 8 */ { ...U("fly", [0.95, 540, 980], [1.25, 540, 1240]) },
  /* 9 */ { set: "d", tr: "out", a: C(fromT(PHN, [-0.15, 1.6, 0.7], 0.42), PHN), b: C(fromT(PHN, [-0.1, 1.7, 0.55], 0.34), PHN), fov: 26, fs: 4 },
  /* 10 */ { ...U("semak", [1.0, 540, 980], [1.08, 540, 940]) },
  /* 11 */ { ...U("semak", [1.04, 540, 1000], [1.07, 540, 1025]) },
  /* 12 */ { ...U("semak", [1.07, 540, 1025], [1.08, 540, 1035]) },
  /* 13 */ { set: "d", tr: "in", a: C(fromT(PHN, [0.2, 1.8, 0.5], 0.36), PHN), b: C(fromT(PHN, [0.1, 1.9, 0.4], 0.3), PHN), fov: 26, fs: 4, src: "NSRC hotline 997" },
  /* 14 */ { ...U("ring", [1.0, 540, 980], [1.08, 540, 980]), src: "The Star, 3 Mar 2026: NSRC now 24/7" },
  /* 15 */ { ...U("freeze", [1.0, 540, 900], [1.12, 540, 820]) },
  /* 16 */ { ...U("stats", [1.0, 540, 900], [1.06, 540, 880]) },
  /* 17 */ { ...U("check", [1.04, 540, 880], [1.0, 540, 900]) },
  /* 18 */ { set: "d", tr: "in", a: C(fromT(DESKC, [0.4, 1.6, 1.2], 1.2), DESKC), b: P1A, fov: 30, fs: 4 },
];
function World({ n }: { n: number }) {
  return <DeskSet n={n} />;
}
