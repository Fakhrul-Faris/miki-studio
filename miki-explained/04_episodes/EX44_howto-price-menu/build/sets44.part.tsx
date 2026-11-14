// ================= sets (EX44: price a nasi lemak — Bahasa Melayu; costing-sheet UI + food macro) =================
const INK = "#1C2430", PAPER = "#EEF1F4", TEAL = "#1F6F78", SAMBAL = "#B8321F", LEAF = "#3e7b4f", ICE = "#8EC9F0", GOLD = "#E8B53A", FLAG = "#D6452E";
const PS = "'Public Sans', 'Helvetica Neue', Arial, sans-serif";
const eo = (x: number) => 1 - Math.pow(1 - cl(x), 5);                                   // strong ease-out ≈ cubic-bezier(0.23, 1, 0.32, 1)
const onO = (i: number, d = 0.3, off = 0) => eo((T - (W(i) + off)) / d);
// ---------- the food: a banana leaf on a stall counter; each ingredient drops in on its word ----------
const VT = [300, 0, 0], TY = 0.9, LF = [VT[0], TY + 0.004, VT[2]];
const drop = (u: number) => (1 - u) * (1 - u) * 0.12;
function Food({ n }: { n: number }) {
  const P: any[] = [];
  P.push(<Mesh3d key="ct" transform={Transform.fromXyz(VT[0], TY - 0.02, VT[2])}><Cuboid half_size={[0.9, 0.02, 0.6]} /><StandardMaterial base_color="#6b4a2e" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([3, 1])} perceptual_roughness={0.6} /></Mesh3d>);
  P.push(<Mesh3d key="fl" transform={Transform.fromXyz(VT[0], -0.02, VT[2])}><Cuboid half_size={[5, 0.02, 5]} /><StandardMaterial base_color="#14181f" perceptual_roughness={0.8} /></Mesh3d>);
  P.push(<Mesh3d key="leaf" shape={sob().bkLeaf} transform={Transform.fromXyz(LF[0], TY + 0.001, LF[2]).withRotation(rotY(0.3)).withScale([1.9, 0.6, 1.9])}><StandardMaterial base_color={LEAF} perceptual_roughness={0.4} /></Mesh3d>);
  // which ingredients are on the leaf, by time (the loop shots 1 and 15 show the full packet)
  const full = n === 1 || n >= 12, at = (i: number) => (full ? 1 : n < 3 ? 0 : onO(i, 0.35, -0.25));
  const paper = n === 1 ? 1 - onO(4, 0.6, -0.2) : n === 15 ? onO(94, 0.6, -0.2) : 0;
  const rice = at(21), san = at(22), egg = n >= 4 || full ? 1 : 0, bil = n >= 5 || full ? at(25) : 0, kac = n >= 5 || full ? at(27) : 0, tim = n >= 5 || full ? at(28) : 0, smb = n >= 6 || full ? at(29) : 0;
  if (rice > 0.01) { const y0 = TY + 0.006 + drop(rice);
    P.push(<Mesh3d key="rice" name="rice" transform={Transform.fromXyz(LF[0], y0, LF[2]).withScale([1, 0.5, 1])}><Sphere radius={0.07} /><StandardMaterial base_color="#d9d2c2" perceptual_roughness={0.9} /></Mesh3d>);
    for (let i = 0; i < 180; i++) { const a = rnd(i + 200) * 6.283, r = Math.sqrt(rnd(i + 400)) * 0.068, h = 0.035 * Math.sqrt(Math.max(0, 1 - (r / 0.072) ** 2));      // grains on the dome
      P.push(<Mesh3d key={"rg" + i} name={"rg" + i} transform={Transform.fromXyz(LF[0] + Math.cos(a) * r, y0 + h, LF[2] + Math.sin(a) * r).withRotation(Quat.fromEuler("XYZ", rnd(i) * 3, rnd(i * 7) * 3, 0))}><Cuboid half_size={[0.0042, 0.0012, 0.0013]} /><StandardMaterial base_color={i % 5 ? "#ebe5d6" : "#e2dccb"} perceptual_roughness={0.6} /></Mesh3d>); } }
  if (san > 0.01) P.push(<Mesh3d key="san" name="san" transform={Transform.fromXyz(LF[0], TY + 0.013, LF[2]).withScale([1.02, 0.52 * san, 1.02])}><Sphere radius={0.074} /><StandardMaterial base_color={Srgba.hex("#f6ead0").with_alpha(0.22)} alpha_mode="Blend" perceptual_roughness={0.12} /></Mesh3d>);
  if (egg > 0.01) { const u = n === 4 ? onO(24, 0.35, -0.25) : 1, e = [LF[0] + 0.07, TY + 0.012 + drop(u), LF[2] + 0.05];
    P.push(<Mesh3d key="egw" name="egw" transform={Transform.fromXyz(e[0], e[1], e[2]).withScale([1, 0.55, 1.25])}><Sphere radius={0.026} /><StandardMaterial base_color="#f6f3ec" perceptual_roughness={0.35} /></Mesh3d>);
    P.push(<Mesh3d key="egy" name="egy" transform={Transform.fromXyz(e[0], e[1] + 0.011, e[2]).withScale([1, 0.45, 1])}><Sphere radius={0.014} /><StandardMaterial base_color="#f2a51c" perceptual_roughness={0.4} /></Mesh3d>); }
  if (bil > 0.01) for (let i = 0; i < 14; i++) { const a = rnd(i) * 6.28, r = 0.012 + rnd(i * 3) * 0.022;
    P.push(<Mesh3d key={"bl" + i} name={"bl" + i} transform={Transform.fromXyz(LF[0] - 0.07 + Math.cos(a) * r, TY + 0.006 + drop(cl(bil * 1.3 - rnd(i) * 0.3)), LF[2] + 0.06 + Math.sin(a) * r).withRotation(rotY(a * 2))}><Cuboid half_size={[0.008, 0.0016, 0.002]} /><StandardMaterial base_color="#b9874a" perceptual_roughness={0.5} /></Mesh3d>); }
  if (kac > 0.01) for (let i = 0; i < 10; i++) { const a = rnd(i + 30) * 6.28, r = 0.008 + rnd(i * 5) * 0.016;
    P.push(<Mesh3d key={"kc" + i} name={"kc" + i} transform={Transform.fromXyz(LF[0] - 0.08 + Math.cos(a) * r, TY + 0.007 + drop(cl(kac * 1.3 - rnd(i + 3) * 0.3)), LF[2] - 0.04 + Math.sin(a) * r).withScale([1.3, 0.8, 0.9])}><Sphere radius={0.0045} /><StandardMaterial base_color="#c9925a" perceptual_roughness={0.45} /></Mesh3d>); }
  if (tim > 0.01) for (let i = 0; i < 3; i++) { const p = [LF[0] + 0.09 - i * 0.012, TY + 0.006 + i * 0.002 + drop(tim), LF[2] - 0.05 + i * 0.012];
    P.push(<Mesh3d key={"tr" + i} name={"tr" + i} transform={Transform.fromXyz(p[0], p[1], p[2])}><Cylinder radius={0.017} half_height={0.0025} /><StandardMaterial base_color="#3f7a3a" perceptual_roughness={0.4} /></Mesh3d>);
    P.push(<Mesh3d key={"tf" + i} name={"tf" + i} transform={Transform.fromXyz(p[0], p[1] + 0.0004, p[2])}><Cylinder radius={0.0145} half_height={0.0025} /><StandardMaterial base_color="#dfe9b8" perceptual_roughness={0.4} /></Mesh3d>); }
  if (smb > 0.01) P.push(<Mesh3d key="smb" name="smb" transform={Transform.fromXyz(LF[0] + 0.01, TY + 0.03 + drop(smb), LF[2] - 0.02).withScale([1, 0.45, 1])}><Sphere radius={0.03} /><StandardMaterial base_color={SAMBAL} perceptual_roughness={0.22} /></Mesh3d>);
  // the paper, folded up over the packet (unwraps in 1, closes again in 15)
  if (paper > 0.01) P.push(<Mesh3d key="ppr" name="ppr" shape={sob().bkPaper} transform={Transform.fromXyz(LF[0], TY + 0.002 + (1 - paper) * 0.2, LF[2]).withRotation(rotY(0.3)).withScale([1.7 * Math.max(0.001, paper), 1.6 * Math.max(0.001, paper), 1.7 * Math.max(0.001, paper)])}><StandardMaterial base_color="#b98e5e" perceptual_roughness={0.9} /></Mesh3d>);
  // 12: the stall: more packets, the price card
  if (n === 12) { for (let i = 0; i < 6; i++) P.push(<Mesh3d key={"bk" + i} shape={sob().bkPaper} transform={Transform.fromXyz(VT[0] - 0.42 + (i % 3) * 0.14, TY, VT[2] - 0.22 - Math.floor(i / 3) * 0.13).withRotation(rotY(i)).withScale([1.4, 1.3, 1.4])}><StandardMaterial base_color="#b98e5e" perceptual_roughness={0.9} /></Mesh3d>);
    P.push(<Card key="tag" k="tag" p={[LF[0] + 0.2, TY + 0.06, LF[2] + 0.08]} size={[0.13, 0.081]} tex="tag368" ry={-0.35} rx={-0.25} em={0.35} sc={onO(76, 0.3, -0.25)} />); }
  return (<>{P}
    <SpotLight transform={Transform.fromXyz(VT[0] - 0.3, TY + 0.9, VT[2] + 0.55).lookingAt([VT[0], TY, VT[2]])} intensity={15000} outer_angle={0.7} inner_angle={0.3} color="#ffe2b8" shadow_maps_enabled range={4} />
    <RectLight transform={Transform.fromXyz(VT[0] + 0.7, TY + 0.8, VT[2] - 0.4).lookingAt([VT[0], TY, VT[2]])} intensity={9000} width={1.2} height={0.5} color="#b9c9e6" range={4} />
    <PointLight transform={Transform.fromXyz(VT[0] - 0.6, TY + 0.5, VT[2] - 0.8)} intensity={4000} color="#ffb867" range={3} />
    <AmbientLight brightness={30} color="#9fb0d0" />
    <Environment src={S("sky.hdr")} intensity={0.15} />
  </>);
}

// ---------- the costing sheet (Bahasa Melayu) ----------
const ROWS44 = [["Beras", "100 g", 0.32, 21], ["Santan", "25 g", 0.25, 22], ["Telur", "½ biji", 0.25, 24], ["Ikan bilis", "10 g · anggaran", 0.30, 25], ["Kacang", "10 g", 0.09, 27], ["Timun", "20 g", 0.09, 28], ["Sambal", "cili, bawang, minyak, gula", 0.21, 29], ["Pembungkus", "kertas + daun · anggaran", 0.10, 31]] as [string, string, number, number][];
function Sheet({ n }: { n: number }) {
  const shown = (r: [string, string, number, number], i: number) => n >= 7 ? 1 : n === 4 ? (i < 2 ? 1 : i === 2 ? onO(24, 0.3, -0.2) : 0) : n === 6 ? (i < 3 ? 1 : i < 6 ? onO(28, 0.3, -0.6 + (i - 3) * 0.18) : onO(r[3], 0.3, -0.2)) : 0;
  const total = n === 7 ? 1.61 * eo(lin(W(37), W(40) + 0.2)) : 1.61;
  return (<div style={{ position: "absolute", left: 70, top: 380, width: 940, boxSizing: "border-box", borderRadius: 30, background: PAPER, color: INK, fontFamily: PS, padding: "40px 46px", boxShadow: "0 30px 80px rgba(0,0,0,0.55)" }}>
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}><div style={{ fontSize: 50, fontWeight: 700 }}>Kos sebungkus</div><div style={{ fontSize: 28, color: "#4a5361" }}>contoh resipi</div></div>
    <div style={{ marginTop: 26 }}>{ROWS44.map((r, i) => { const v = shown(r, i); if (v < 0.01) return null;
      return (<div key={i} style={{ display: "flex", alignItems: "baseline", fontSize: 36, padding: `${14 * v}px 0`, maxHeight: 74 * v, overflow: "hidden", borderBottom: "1px solid #d5dbe2", opacity: v, transform: `translateX(${(1 - v) * 30}px)` }}>
        <span style={{ fontWeight: 600, width: 250 }}>{r[0]}</span><span style={{ flex: 1, fontSize: 26, color: "#5d6673" }}>{r[1]}</span><span style={{ fontWeight: 600 }}>RM{r[2].toFixed(2)}</span></div>); })}</div>
    {n >= 7 ? <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, fontSize: 48, fontWeight: 800 }}><span>Jumlah</span><span style={{ color: SAMBAL }}>RM{total.toFixed(2)}</span></div> : null}
    <div style={{ marginTop: 18, fontSize: 26, color: "#4a5361" }}>Harga: PriceCatcher (KPDN), Okt 2026 · median nasional</div>
  </div>);
}
function Slider({ n }: { n: number }) {
  const band = n === 9 ? onO(49, 0.4, -0.2) : 0, k = n === 8 ? 0.2 + 0.15 * onO(44, 0.6, -0.2) : 0.35 - 0.0 * band;
  const X = (p: number) => 70 + p / 0.6 * 800;
  return (<div style={{ position: "absolute", left: 70, top: 560, width: 940, fontFamily: PS, color: "#fff" }}>
    <div style={{ fontSize: 46, fontWeight: 700 }}>Kos makanan</div><div style={{ fontSize: 30, color: "#c3cad4", marginTop: 8 }}>bahagian harga untuk bahan</div>
    <div style={{ position: "relative", marginTop: 70, height: 140 }}>
      <div style={{ position: "absolute", left: 70, top: 50, width: 800, height: 16, borderRadius: 8, background: "#2a3340" }} />
      <div style={{ position: "absolute", left: X(0.30), top: 40, width: X(0.35) - X(0.30), height: 36, borderRadius: 8, background: TEAL, opacity: band }} />
      <div style={{ position: "absolute", left: X(k) - 26, top: 32, width: 52, height: 52, borderRadius: 26, background: "#fff", boxShadow: "0 6px 20px rgba(0,0,0,0.5)" }} />
      {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6].map((p) => <div key={p} style={{ position: "absolute", left: X(p) - 30, top: 96, width: 60, textAlign: "center", fontSize: 26, color: "#9aa6b6" }}>{Math.round(p * 100)}%</div>)}
      <div style={{ position: "absolute", left: X(0.30) - 60, top: -26, fontSize: 30, fontWeight: 700, color: ICE, opacity: band }}>30–35% · kebanyakan restoran</div>
    </div>
    <div style={{ fontSize: 26, color: "#c3cad4", marginTop: 20 }}>Panduan industri restoran (bukan peraturan)</div>
  </div>);
}
function Calc({ n }: { n: number }) {
  const second = n === 11, ans = second ? onO(66, 0.35, -0.3) : onO(62, 0.35, -0.3), ex = second ? "RM1.61 ÷ 0.30" : "RM1.61 ÷ 0.35", res = second ? "RM5.37" : "RM4.60";
  return (<div style={{ position: "absolute", left: 90, top: 480, width: 900, fontFamily: PS, color: "#fff" }}>
    <div style={{ borderRadius: 30, background: "#232b37", padding: "50px 50px 40px" }}>
      <div style={{ fontSize: 46, color: "#9aa6b6" }}>{ex} =</div>
      <div style={{ fontSize: 150, fontWeight: 800, letterSpacing: -4, opacity: ans, transform: `translateY(${(1 - ans) * 20}px)` }}>{res}</div>
    </div>
    {second ? <div style={{ marginTop: 40, display: "inline-block", padding: "20px 40px", borderRadius: 20, background: "#f4f1e8", color: INK, fontSize: 76, fontWeight: 800, opacity: onO(66, 0.3, 0.2), transform: `rotate(-3deg) scale(${0.9 + 0.1 * onO(66, 0.3, 0.2)})` }}>RM5.40</div>
      : <div style={{ marginTop: 34, fontSize: 32, color: "#c3cad4" }}>harga minimum pada kos makanan 35%</div>}
  </div>);
}
function Bar({ n }: { n: number }) {
  const f = n === 13 ? 0.438 * eo(lin(W(80) - 0.2, W(84))) : 0.438, split = n === 14 ? [onO(88, 0.3, -0.2), onO(89, 0.3, -0.2), onO(91, 0.3, -0.2)] : [0, 0, 0];
  return (<div style={{ position: "absolute", left: 70, top: 560, width: 940, fontFamily: PS, color: "#fff" }}>
    <div style={{ fontSize: 40, color: "#c3cad4" }}>Sebungkus dijual <span style={{ color: "#fff", fontWeight: 800 }}>RM3.68</span></div>
    <div style={{ marginTop: 40, height: 120, borderRadius: 22, background: "#2a3340", overflow: "hidden", display: "flex" }}>
      <div style={{ width: `${f * 100}%`, background: SAMBAL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50, fontWeight: 800 }}>{f > 0.3 ? `${Math.round(f * 100)}%` : ""}</div>
      {["gas", "sewa", "masa anda"].map((w, i) => <div key={w} style={{ flex: 1, borderLeft: "4px solid #1C2430", background: `rgba(142,201,240,${0.35 * split[i]})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 700, color: ICE, opacity: split[i] }}>{w}</div>)}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18, fontSize: 30, color: "#c3cad4" }}><span>bahan makanan RM1.61</span><span>{n === 14 ? "baki RM2.07" : ""}</span></div>
    <div style={{ marginTop: 26, fontSize: 26, color: "#9aa6b6" }}>RM1.61 ÷ RM3.68 ≈ 44% · purata 2024 (DOSM)</div>
  </div>);
}
function Rail({ n }: { n: number }) {
  return (<div style={{ position: "absolute", left: 90, top: 620, width: 900, fontFamily: PS }}>
    {["Kira kos bahan", "Pilih kos makanan %", "Bahagi", "Semak harga"].map((t, i) => { const v = onO(11, 0.35, -0.3 + i * 0.1);
      return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 26, padding: "28px 32px", marginBottom: 16, borderRadius: 20, background: PAPER, color: INK, opacity: v, transform: `translateX(${(1 - v) * 50}px)` }}>
        <div style={{ width: 62, height: 62, borderRadius: 31, background: TEAL, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 800 }}>{i + 1}</div>
        <div style={{ fontSize: 38, fontWeight: 600 }}>{t}</div></div>); })}
  </div>);
}
function Ui({ n }: { n: number }) {
  const c = SETUPS[n - 1]; if (!c.ui) return null;
  const x = cl((T - ST[n - 1]) / (ST[n] - ST[n - 1])), u = 0.55 * x + 0.45 * ss(x, 0, 1);
  const s = lerp(c.ui.a[0], c.ui.b[0], u), fx = lerp(c.ui.a[1], c.ui.b[1], u), fy = lerp(c.ui.a[2], c.ui.b[2], u);
  const prev = n > 1 ? SETUPS[n - 2].ui : undefined, same = !!prev && prev.screen === c.ui.screen;
  const enter = same ? 1 : eo((T - (ST[n - 1] - 0.05)) / 0.33), blur = (1 - enter) * 10;
  const sc = c.ui.screen, body = sc === "rail" ? <Rail n={n} /> : sc === "sheet" ? <Sheet n={n} /> : sc === "slider" ? <Slider n={n} /> : sc === "calc" ? <Calc n={n} /> : <Bar n={n} />;
  return (<div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: `radial-gradient(ellipse at 50% 40%, #273141 0%, ${INK} 55%, #10151d 100%)` }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, transformOrigin: "0 0", transform: `translate(${540 - fx * s}px, ${1000 - fy * s}px) scale(${s})`, filter: `blur(${blur}px)`, opacity: 0.4 + 0.6 * enter }}>{body}</div>
  </div>);
}

// ================= the 15 setups =================
type Pose = { p: number[]; l: number[] };
type Tag = { at: number[]; x: number; y: number; cap: string; big?: string; sub?: string; t: number };
type Setup = { set: string; a: Pose; b: Pose; fov?: number; fs?: number; up?: number[]; tr?: "in" | "out" | "side"; fd?: () => number | null; tags?: Tag[];
  count?: { v: () => string; unit: string; t?: number }; note?: string; src?: string; step?: number; ui?: { screen: string; a: number[]; b: number[] } };
const fromT = (l: number[], dir: number[], d: number) => { const k = Math.hypot(dir[0], dir[1], dir[2]); return [l[0] + (dir[0] / k) * d, l[1] + (dir[1] / k) * d, l[2] + (dir[2] / k) * d]; };
const dist3 = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const C = (p: number[], l: number[]): Pose => ({ p, l });
const num = (a: number, b: number, t0: number, t1: number, d = 0) => lerp(a, b, cl((T - t0) / (t1 - t0))).toFixed(d);
const LFC = [LF[0], TY + 0.02, LF[2]];
const P1A = C(fromT(LFC, [0.3, 1.2, 0.9], 0.75), LFC);
const NOCAM = C([VT[0], 3, VT[2] + 3], [VT[0], 0, VT[2]]);
const U = (screen: string, a: number[], b: number[]) => ({ ui: { screen, a, b }, set: "u", a: NOCAM, b: NOCAM });
const SETUPS: Setup[] = [
  /* 1 */ { set: "f", a: P1A, b: C(fromT(LFC, [0.25, 1.3, 0.8], 0.52), LFC), fov: 30, fs: 4 },
  /* 2 */ { ...U("rail", [1.0, 540, 900], [1.04, 540, 880]) },
  /* 3 */ { set: "f", tr: "in", a: C(fromT(LFC, [-0.3, 0.75, 1], 0.7), LFC), b: C(fromT(LFC, [-0.2, 0.65, 1], 0.6), LFC), fov: 26, fs: 4 },
  /* 4 */ { ...U("sheet", [1.0, 540, 900], [1.04, 540, 860]), step: 1 },
  /* 5 */ { set: "f", tr: "in", a: C(fromT([LF[0] - 0.02, TY + 0.01, LF[2]], [0.1, 1.6, 0.6], 0.66), [LF[0] - 0.02, TY + 0.01, LF[2]]), b: C(fromT([LF[0] - 0.02, TY + 0.01, LF[2]], [0.05, 1.7, 0.45], 0.58), [LF[0] - 0.02, TY + 0.01, LF[2]]), fov: 26, fs: 5.6 },
  /* 6 */ { ...U("sheet", [1.0, 540, 980], [1.04, 540, 1000]), step: 1 },
  /* 7 */ { ...U("sheet", [1.0, 540, 1000], [1.03, 540, 1030]), step: 1 },
  /* 8 */ { ...U("slider", [1.0, 540, 900], [1.04, 540, 880]), step: 2 },
  /* 9 */ { ...U("slider", [1.04, 540, 880], [1.08, 540, 860]), step: 2 },
  /* 10 */ { ...U("calc", [1.0, 540, 900], [1.05, 540, 860]), step: 3 },
  /* 11 */ { ...U("calc", [1.0, 540, 980], [1.04, 540, 1000]), step: 3 },
  /* 12 */ { set: "f", tr: "out", a: C(fromT([LF[0] + 0.08, TY + 0.04, LF[2]], [0.6, 0.4, 1], 1.05), [LF[0] + 0.08, TY + 0.04, LF[2]]), b: C(fromT([LF[0] + 0.1, TY + 0.05, LF[2] + 0.03], [0.5, 0.35, 1], 0.92), [LF[0] + 0.1, TY + 0.05, LF[2] + 0.03]), fov: 30, fs: 4, step: 4, src: "Purata 2024: DOSM (Indeks Harga Pengguna)" },
  /* 13 */ { ...U("bar", [1.0, 540, 900], [1.05, 540, 880]), step: 4 },
  /* 14 */ { ...U("bar", [1.05, 540, 880], [1.03, 540, 900]), step: 4 },
  /* 15 */ { set: "f", tr: "in", a: C(fromT(LFC, [0.4, 1.4, 1.1], 0.9), LFC), b: P1A, fov: 30, fs: 4 },
];
function World({ n }: { n: number }) {
  return <Food n={n} />;
}
