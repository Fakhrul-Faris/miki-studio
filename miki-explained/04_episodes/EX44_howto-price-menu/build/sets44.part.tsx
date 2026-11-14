// ================= sets (EX44: price a nasi lemak — Bahasa Melayu; costing-sheet UI + food macro) =================
const INK = "#1C2430", PAPER = "#EEF1F4", TEAL = "#1F6F78", SAMBAL = "#B8321F", LEAF = "#2d6a36", ICE = "#8EC9F0", GOLD = "#E8B53A", FLAG = "#D6452E";
const PS = "'Public Sans', 'Helvetica Neue', Arial, sans-serif";
const eo = (x: number) => 1 - Math.pow(1 - cl(x), 5);                                   // strong ease-out ≈ cubic-bezier(0.23, 1, 0.32, 1)
const onO = (i: number, d = 0.3, off = 0) => eo((T - (W(i) + off)) / d);
// ---------- the food: a banana leaf on a stall counter; each ingredient drops in on its word ----------
const VT = [300, 0, 0], TY = 0.9, LF = [VT[0], TY + 0.004, VT[2]], LT = TY + 0.0085;    // LT: the leaf's top face
const drop = (u: number) => (1 - u) * (1 - u) * 0.12;
const lay = (yaw: number, tilt = 0) => Quat.fromEuler("YXZ", yaw, 0, Math.PI / 2 + tilt);   // a capsule (along y) laid on its side, axis turned by yaw, raised by tilt
const kraft = () => <StandardMaterial base_color="#a8794a" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([4, 4])} perceptual_roughness={0.92} />;
// the getah: a red rubber band round the packet, hugging the four paper faces (bkPaper's local units)
const getah = (k: string) => { const y = 0.028, w = 0.07 * (1 - y / 0.085) + 0.0012, m = <StandardMaterial base_color="#c8323c" perceptual_roughness={0.45} />;
  return [[w, 0, 0.0014, w], [-w, 0, 0.0014, w], [0, w, w, 0.0014], [0, -w, w, 0.0014]].map(([x, z, hx, hz], i) =>
    <Mesh3d key={k + i} name={k + i} transform={Transform.fromXyz(x, y, z)}><Cuboid half_size={[hx, 0.0016, hz]} />{m}</Mesh3d>); };
const PTAGS: [string, number, number, number][] = [["beras", -0.051, 0.085, 21], ["santan", -0.017, 0.085, 22], ["telur", 0.017, 0.085, 24], ["bilis", 0.051, 0.085, 25],
  ["kacang", -0.051, -0.075, 27], ["timun", -0.017, -0.075, 28], ["sambal", 0.017, -0.075, 29], ["bungkus", 0.051, -0.075, 31]];   // [tex, dx, dz (camera-facing rows: front, behind the rice), the word it lands on]
function Food({ n }: { n: number }) {
  const P: any[] = [];
  P.push(<Mesh3d key="ct" transform={Transform.fromXyz(VT[0], TY - 0.02, VT[2])}><Cuboid half_size={[0.9, 0.02, 0.6]} /><StandardMaterial base_color="#6b4a2e" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([3, 1])} perceptual_roughness={0.6} /></Mesh3d>);
  P.push(<Mesh3d key="fl" transform={Transform.fromXyz(VT[0], -0.02, VT[2])}><Cuboid half_size={[5, 0.02, 5]} /><StandardMaterial base_color="#14181f" perceptual_roughness={0.8} /></Mesh3d>);
  // the banana leaf: waxy, a pale midrib and the fine parallel veins that make it read as daun pisang
  const V: any[] = [<Mesh3d key="leaf" shape={sob().bkLeaf} transform={Transform.fromXyz(0, 0, 0).withScale([1.9, 0.6, 1.9])}><StandardMaterial base_color={LEAF} perceptual_roughness={0.28} /></Mesh3d>,
    <Mesh3d key="mrib" transform={Transform.fromXyz(0, 0.0074, 0).withRotation(lay(0))}><Capsule3d radius={0.0022} half_length={0.18} /><StandardMaterial base_color="#a9c27a" perceptual_roughness={0.35} /></Mesh3d>];
  for (let i = 0; i < 31; i++) { const s = -0.165 + i * 0.011, L = Math.sqrt(Math.max(0, 0.185 ** 2 - s * s)) * 0.92;
    V.push(<Mesh3d key={"vn" + i} transform={Transform.fromXyz(s, 0.0073, 0).withRotation(rotY(0.12))}><Cuboid half_size={[0.0005, 0.00025, L]} /><StandardMaterial base_color="#3f7d45" perceptual_roughness={0.3} /></Mesh3d>); }
  P.push(<Entity key="leafset" transform={Transform.fromXyz(LF[0], TY + 0.001, LF[2]).withRotation(rotY(0.3))}>{V}</Entity>);
  // which ingredients are on the leaf, by time (the loop shots 1 and 15 show the full packet)
  const paper = n === 1 ? 1 - ss(T, W(4) - 0.35, W(4) + 0.75) : n === 15 ? ss(T, W(94) - 0.3, W(94) + 0.7) : 0;
  // 1 and 15: under the closed packet nothing shows; the food lands as the paper lifts off (and leaves as it closes in 15)
  const cf = n === 1 || n === 15 ? ss(1 - paper, 0.2, 0.75) : 1;
  const full = n === 1 || n >= 12, at = (i: number) => (full ? cf : n < 3 ? 0 : onO(i, 0.35, -0.25));
  const rice = at(21), san = at(22), egg = full ? cf : n >= 4 ? 1 : 0, bil = n >= 5 || full ? at(25) : 0, kac = n >= 5 || full ? at(27) : 0, tim = n >= 5 || full ? at(28) : 0, smb = n >= 6 || full ? at(29) : 0;
  if (rice > 0.01) { const y0 = TY + 0.006 + drop(rice);
    P.push(<Mesh3d key="rice" name="rice" transform={Transform.fromXyz(LF[0], y0, LF[2]).withScale([1, 0.5, 1])}><Sphere radius={0.07} /><StandardMaterial base_color="#e3d9c2" perceptual_roughness={0.7} /></Mesh3d>);
    for (let i = 0; i < 420; i++) { const a = rnd(i + 200) * 6.283, q = Math.sqrt(rnd(i + 400)) * 0.97, r = q * 0.07, k = Math.sqrt(Math.max(0.02, 1 - q * q));
      const h = 0.035 * k, slope = Math.atan(0.5 * q / k), radial = i % 3 === 0, yaw = radial ? -a : rnd(i * 7) * 6.283;   // a third follow the slope, the rest lie any way
      P.push(<Mesh3d key={"rg" + i} name={"rg" + i} transform={Transform.fromXyz(LF[0] + Math.cos(a) * r, y0 + h - 0.0006, LF[2] + Math.sin(a) * r).withRotation(lay(yaw, radial ? -slope : (rnd(i * 3) - 0.5) * 0.5))}>
        <Capsule3d radius={0.0017} half_length={0.0029} /><StandardMaterial base_color={i % 4 ? "#f4efe3" : "#ebe2cd"} perceptual_roughness={0.42} /></Mesh3d>); } }
  if (san > 0.01) P.push(<Mesh3d key="san" name="san" transform={Transform.fromXyz(LF[0], TY + 0.013, LF[2]).withScale([1.02, 0.55 * san, 1.02])}><Sphere radius={0.074} /><StandardMaterial base_color={Srgba.hex("#f6ead0").with_alpha(0.2)} alpha_mode="Blend" perceptual_roughness={0.1} /></Mesh3d>);
  if (egg > 0.01) { const u = n === 4 ? onO(24, 0.35, -0.25) : full ? egg : 1, e = [LF[0] + 0.07, TY + 0.012 + drop(u), LF[2] + 0.05];
    P.push(<Mesh3d key="egw" name="egw" transform={Transform.fromXyz(e[0], e[1], e[2]).withScale([1, 0.55, 1.25])}><Sphere radius={0.026} /><StandardMaterial base_color="#f6f3ec" perceptual_roughness={0.3} /></Mesh3d>);
    P.push(<Mesh3d key="egy" name="egy" transform={Transform.fromXyz(e[0], e[1] + 0.011, e[2]).withScale([1, 0.4, 1.05])}><Sphere radius={0.0145} /><StandardMaterial base_color="#f0a21a" perceptual_roughness={0.45} /></Mesh3d>); }
  // ikan bilis: slim golden fish, piled; kacang: skin-on fried peanuts, reddish brown
  if (bil > 0.01) for (let i = 0; i < 22; i++) { const a = rnd(i) * 6.28, r = rnd(i * 3) * 0.026;
    P.push(<Mesh3d key={"bl" + i} name={"bl" + i} transform={Transform.fromXyz(LF[0] - 0.075 + Math.cos(a) * r, LT + 0.0018 + rnd(i * 5) * 0.004 * (1 - r / 0.03) + drop(cl(bil * 1.3 - rnd(i) * 0.3)), LF[2] + 0.06 + Math.sin(a) * r).withRotation(lay(a * 3, (rnd(i * 9) - 0.5) * 0.4))}>
      <Capsule3d radius={0.0015} half_length={0.0058} /><StandardMaterial base_color={i % 3 ? "#c9964f" : "#b07d3c"} perceptual_roughness={0.38} /></Mesh3d>); }
  if (kac > 0.01) for (let i = 0; i < 16; i++) { const a = rnd(i + 30) * 6.28, r = rnd(i * 5) * 0.02;
    P.push(<Mesh3d key={"kc" + i} name={"kc" + i} transform={Transform.fromXyz(LF[0] - 0.085 + Math.cos(a) * r, LT + 0.0035 + rnd(i + 8) * 0.003 + drop(cl(kac * 1.3 - rnd(i + 3) * 0.3)), LF[2] - 0.04 + Math.sin(a) * r).withRotation(rotY(a * 2)).withScale([1.15, 0.85, 0.9])}>
      <Sphere radius={0.004} /><StandardMaterial base_color={["#8a4a2c", "#9c5a36", "#b06a42"][i % 3]} perceptual_roughness={0.32} /></Mesh3d>); }
  if (tim > 0.01) for (let i = 0; i < 3; i++) { const p = [LF[0] + 0.09 - i * 0.012, LT + 0.0026 + i * 0.002 + drop(tim), LF[2] - 0.05 + i * 0.012];
    P.push(<Mesh3d key={"tr" + i} name={"tr" + i} transform={Transform.fromXyz(p[0], p[1], p[2])}><Cylinder radius={0.017} half_height={0.0025} /><StandardMaterial base_color="#2f5f2c" perceptual_roughness={0.35} /></Mesh3d>);
    P.push(<Mesh3d key={"tf" + i} name={"tf" + i} transform={Transform.fromXyz(p[0], p[1] + 0.0004, p[2])}><Cylinder radius={0.0148} half_height={0.0025} /><StandardMaterial base_color="#dfe9b8" perceptual_roughness={0.3} /></Mesh3d>);
    P.push(<Mesh3d key={"ts" + i} name={"ts" + i} transform={Transform.fromXyz(p[0], p[1] + 0.0006, p[2])}><Cylinder radius={0.0075} half_height={0.0025} /><StandardMaterial base_color="#c9d79a" perceptual_roughness={0.3} /></Mesh3d>); }
  // sambal: a glossy dark-red spoonful with chilli and onion bits in it
  if (smb > 0.01) { const sy = TY + 0.03 + drop(smb);
    P.push(<Mesh3d key="smb" name="smb" transform={Transform.fromXyz(LF[0] + 0.01, sy, LF[2] - 0.02).withScale([1, 0.45, 1])}><Sphere radius={0.03} /><StandardMaterial base_color="#a3200f" perceptual_roughness={0.16} /></Mesh3d>);
    for (let i = 0; i < 12; i++) { const a = rnd(i + 60) * 6.28, r = Math.sqrt(rnd(i + 70)) * 0.024, h = 0.0135 * Math.sqrt(Math.max(0, 1 - (r / 0.03) ** 2));
      P.push(<Mesh3d key={"sf" + i} name={"sf" + i} transform={Transform.fromXyz(LF[0] + 0.01 + Math.cos(a) * r, sy + h, LF[2] - 0.02 + Math.sin(a) * r).withScale([1.4, 0.5, 1])}><Sphere radius={0.0022} /><StandardMaterial base_color={i % 3 ? "#d4552a" : "#5c140a"} perceptual_roughness={0.2} /></Mesh3d>); } }
  // the paper, folded up over the packet (unwraps in 1, closes again in 15)
  if (paper > 0.01) { const u = 1 - paper;     // the paper lifts up and tips away, whole (no shrinking)
    // it slides back and up, away from the lens (the camera sits above and in front, +z): never towards it
    P.push(<Entity key="pkt" transform={Transform.fromXyz(LF[0] - 0.04 * u, TY + 0.002 + 0.1 * u, LF[2] - 0.45 * u).withRotation(Quat.fromEuler("YXZ", 0.3 + 0.3 * u, -0.6 * u, 0.1 * u)).withScale([1.7, 1.6, 1.7])}>
      <Mesh3d name="ppr" shape={sob().bkPaper} transform={Transform.fromXyz(0, 0, 0)}>{kraft()}</Mesh3d>{getah("pg")}</Entity>); }
  // 3 and 5: a price tag stands where each ingredient will land (in on "Kira harga setiap bahan"); it bows out as its food lands
  if (n === 3 || n === 5) PTAGS.forEach(([k, dx, dz, wi], i) => { const inn = n === 5 ? 1 : eo((T - (W(15) + i * 0.13)) / 0.35), out = 1 - eo((T - (W(wi) - 0.3)) / 0.3), s = inn * out;
    if (s > 0.01) P.push(<Card key={"pt" + k} k={"pt" + k} p={[LF[0] + dx, TY + (dz < 0 ? 0.058 : 0.03) + (1 - inn) * 0.03, LF[2] + dz]} size={[0.032, 0.02]} tex={"pt_" + k} rx={-0.55} ry={-0.15} em={0.3} sc={s} />); });
  // 12: the stall: more packets, the price card
  if (n === 12) { for (let i = 0; i < 6; i++) P.push(<Entity key={"bk" + i} transform={Transform.fromXyz(VT[0] - 0.42 + (i % 3) * 0.14, TY, VT[2] - 0.22 - Math.floor(i / 3) * 0.13).withRotation(rotY(i)).withScale([1.4, 1.3, 1.4])}><Mesh3d name={"bkp" + i} shape={sob().bkPaper} transform={Transform.fromXyz(0, 0, 0)}>{kraft()}</Mesh3d>{getah("g" + i)}</Entity>);
    P.push(<Card key="tag" k="tag" p={[LF[0] + 0.2, TY + 0.06, LF[2] + 0.08]} size={[0.13, 0.081]} tex="tag368" ry={-0.35} rx={-0.25} em={0.35} sc={onO(76, 0.3, -0.25)} />); }
  return (<>{P}
    <SpotLight transform={Transform.fromXyz(VT[0] - 0.3, TY + 0.9, VT[2] + 0.55).lookingAt([VT[0], TY, VT[2]])} intensity={15000} outer_angle={0.7} inner_angle={0.3} color="#ffe2b8" shadow_maps_enabled range={4} />
    <RectLight transform={Transform.fromXyz(VT[0] + 0.7, TY + 0.8, VT[2] - 0.4).lookingAt([VT[0], TY, VT[2]])} intensity={9000} width={1.2} height={0.5} color="#b9c9e6" range={4} />
    <PointLight transform={Transform.fromXyz(VT[0] - 0.6, TY + 0.5, VT[2] - 0.8)} intensity={4000} color="#ffb867" range={3} />
    <AmbientLight brightness={30} color="#9fb0d0" />
    <Environment src={S("sky.hdr")} intensity={0.15} />
  </>);
}

// ---------- the interfaces (Bahasa Melayu): the hawker's own tools, on a banana-leaf green ground ----------
// receipt = the costing sheet (prints as the rows are said) · a ruler slider · a shop calculator with an LCD · the price tag split.
// Type: IBM Plex Mono (the receipt), Anton (big numbers), DSEG7 (the LCD), Public Sans (labels). Kunyit yellow marks the
// choice being made, sambal red the money that matters.
const MONO = "'Plex Mono', Menlo, monospace", ANT = "Anton, Impact, sans-serif", LCDF = "DSEG7, monospace";
const GRD = "#173020", GRD2 = "#0e1f15", RCPT = "#FBF9F3", RINK = "#22261f", KUNYIT = "#F2B705", MUTE = "#b8cbb9";
const TAB = { fontVariantNumeric: "tabular-nums" } as const;
const ROWS44 = [["Beras", "100 g", 0.32, 21], ["Santan", "25 g", 0.25, 22], ["Telur", "½ biji", 0.25, 24], ["Ikan bilis*", "10 g", 0.30, 25], ["Kacang", "10 g", 0.09, 27], ["Timun", "20 g", 0.09, 28], ["Sambal", "campuran", 0.21, 29], ["Pembungkus*", "kertas + daun", 0.10, 31]] as [string, string, number, number][];
const zig = (c: string) => ({ height: 22, backgroundImage: `linear-gradient(135deg, ${c} 50%, transparent 50%), linear-gradient(225deg, ${c} 50%, transparent 50%)`, backgroundSize: "44px 22px", backgroundRepeat: "repeat-x" });
function Sheet({ n }: { n: number }) {
  const shown = (r: [string, string, number, number], i: number) => n >= 7 ? 1 : n === 4 ? (i < 2 ? 1 : i === 2 ? onO(24, 0.3, -0.2) : 0) : n === 6 ? (i < 3 ? 1 : i < 6 ? onO(28, 0.3, -0.6 + (i - 3) * 0.18) : onO(r[3], 0.3, -0.2)) : 0;
  const tot = n === 7 ? eo(lin(ST[6] + 0.3, W(40) + 0.2)) : 1, total = 1.61 * tot;
  return (<div style={{ position: "absolute", left: 80, top: 300, width: 920 }}>
    {/* the printer's mouth the receipt hangs from */}
    <div style={{ height: 34, borderRadius: 17, background: "#0b1710", boxShadow: "inset 0 6px 10px rgba(0,0,0,0.7), 0 2px 0 rgba(255,255,255,0.06)" }} />
    <div style={{ margin: "-16px 30px 0", boxSizing: "border-box", background: RCPT, color: RINK, fontFamily: MONO, padding: "44px 44px 26px", boxShadow: "0 30px 60px rgba(0,0,0,0.45)" }}>
      <div style={{ textAlign: "center", fontSize: 44, fontWeight: 700, letterSpacing: 2 }}>KOS SEBUNGKUS</div>
      <div style={{ textAlign: "center", fontSize: 30, color: "#5f6459", marginTop: 6 }}>nasi lemak · contoh resipi</div>
      <div style={{ borderTop: "3px dashed #b9b6aa", margin: "26px 0 8px" }} />
      {ROWS44.map((r, i) => { const v = shown(r, i); if (v < 0.01) return null;
        return (<div key={i} style={{ maxHeight: 70 * v, overflow: "hidden", opacity: cl(v * 1.4), padding: `${11 * v}px 0` }}>
          <div style={{ display: "flex", alignItems: "baseline", fontSize: 40, fontWeight: 700 }}>
            <span>{r[0]}</span><span style={{ fontSize: 28, fontWeight: 500, color: "#6c7065", marginLeft: 16 }}>{r[1]}</span><span style={{ flex: 1, margin: "0 14px", borderBottom: "4px dotted #c9c5b8", transform: "translateY(-10px)" }} /><span style={TAB}>{r[2].toFixed(2)}</span></div></div>); })}
      {n >= 7 ? <div style={{ borderTop: "3px dashed #b9b6aa", marginTop: 14, paddingTop: 18, display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <span style={{ fontSize: 44, fontWeight: 700 }}>JUMLAH</span>
        <span style={{ fontFamily: ANT, fontSize: 120, lineHeight: 1, color: SAMBAL, ...TAB }}>RM{total.toFixed(2)}</span></div> : null}
      <div style={{ fontSize: 28, color: "#5f6459", marginTop: 18, lineHeight: 1.35 }}>Harga: PriceCatcher (KPDN), Okt 2026,<br />median nasional · * anggaran</div>
    </div>
    <div style={{ margin: "0 30px", ...zig(RCPT) }} />
  </div>);
}
function Slider({ n }: { n: number }) {
  const band = n === 9 ? onO(49, 0.4, -0.2) : 0, k = n === 8 ? 0.2 + 0.15 * onO(44, 0.7, -0.2) : 0.35;
  const X0 = 30, WR = 860, X = (p: number) => X0 + (p / 0.6) * WR;
  const ticks = Array.from({ length: 13 }, (_, i) => i * 0.05);
  return (<div style={{ position: "absolute", left: 80, top: 400, width: 920, fontFamily: PS, color: "#fff" }}>
    <div style={{ fontSize: 58, fontWeight: 700 }}>Kos makanan</div>
    <div style={{ fontSize: 36, color: MUTE, marginTop: 8 }}>bahagian harga yang pergi ke bahan</div>
    <div style={{ fontFamily: ANT, fontSize: 280, lineHeight: 1, color: KUNYIT, marginTop: 40, ...TAB }}>{Math.round(k * 100)}%</div>
    <div style={{ position: "relative", height: 260, marginTop: 40 }}>
      {/* the 30–35 % band most restaurants aim for */}
      <div style={{ position: "absolute", left: X(0.30), top: 20, width: X(0.35) - X(0.30), height: 150, borderRadius: 12, background: KUNYIT, opacity: 0.28 * band }} />
      <div style={{ position: "absolute", left: X(0.30) - 120, top: -44, width: 400, textAlign: "center", fontSize: 34, fontWeight: 700, color: KUNYIT, opacity: band, transform: `translateY(${(1 - band) * 12}px)` }}>kebanyakan restoran</div>
      <div style={{ position: "absolute", left: X0, top: 82, width: WR, height: 22, borderRadius: 11, background: "#2a4a35" }} />
      <div style={{ position: "absolute", left: X0, top: 82, width: X(k) - X0, height: 22, borderRadius: 11, background: "#e9efe4" }} />
      {ticks.map((p, i) => <div key={i} style={{ position: "absolute", left: X(p) - 2, top: i % 2 ? 124 : 116, width: 4, height: i % 2 ? 18 : 30, background: "#7f9a84" }} />)}
      {ticks.filter((_, i) => i % 2 === 0).map((p) => <div key={p} style={{ position: "absolute", left: X(p) - 40, top: 160, width: 80, textAlign: "center", fontSize: 32, color: MUTE, ...TAB }}>{Math.round(p * 100)}</div>)}
      <div style={{ position: "absolute", left: X(k) - 38, top: 55, width: 76, height: 76, boxSizing: "border-box", borderRadius: 38, background: "#fff", border: `8px solid ${KUNYIT}`, boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }} />
    </div>
    <div style={{ fontSize: 30, color: MUTE, marginTop: 10 }}>Panduan industri restoran, bukan peraturan</div>
  </div>);
}
// the calculator: keys pressed on the spoken numbers; the LCD shows exactly what a real one would
const KEYS = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "−", "0", ".", "=", "+"];
function Calc({ n }: { n: number }) {
  const second = n === 11;
  const seq: [string, number][] = second
    ? [..."1.61÷0.3="].map((c, i) => [c, ST[10] + 0.12 + i * 0.1] as [string, number])
    : [..."1.61"].map((c, i) => [c, W(57) + i * 0.16] as [string, number]).concat([["÷", W(58) + 0.05]], [..."0.35"].map((c, i) => [c, W(59) + i * 0.16] as [string, number]), [["=", W(60)]]);
  const done = seq.filter(([, t]) => T >= t), typed = done.map(([c]) => c).join("");
  const eq = typed.endsWith("="), last = typed.split("÷").pop() || "";
  const lcd = eq ? (second ? "5.371428" : "4.6") : (last.replace("=", "") || "0");
  const expr = typed.includes("÷") ? typed.replace("÷", " ÷ ").replace("=", " =") : "";
  const ans = second ? onO(66, 0.35, -0.25) : onO(62, 0.35, -0.25);
  return (<div style={{ position: "absolute", left: 130, top: 330, width: 820 }}>
    <div style={{ boxSizing: "border-box", borderRadius: 64, padding: "48px 50px 54px", background: "linear-gradient(170deg, #3a3e3b 0%, #262927 60%, #1d201e 100%)", boxShadow: "0 40px 80px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.08)" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginBottom: 26 }}>{[0, 1, 2, 3].map((i) => <div key={i} style={{ width: 54, height: 40, background: "#2b2620", border: "2px solid #4a443a" }} />)}</div>
      <div style={{ position: "relative", height: 270, boxSizing: "border-box", borderRadius: 20, overflow: "hidden", background: "linear-gradient(180deg, #a9b596 0%, #bcc6a8 100%)", boxShadow: "inset 0 8px 18px rgba(0,0,0,0.35)", padding: "22px 34px" }}>
        <div style={{ fontFamily: MONO, fontSize: 40, fontWeight: 700, color: "#2a3322", height: 52, textAlign: "right" }}>{expr}</div>
        <div style={{ position: "absolute", right: 34, bottom: 26, fontFamily: LCDF, fontSize: 104, color: "#1b2216", opacity: 0.07 }}>88888888</div>
        <div style={{ position: "absolute", right: 34, bottom: 26, fontFamily: LCDF, fontSize: 104, color: "#1b2216" }}>{lcd}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22, marginTop: 40 }}>
        {KEYS.map((c) => { const hit = done.filter(([d]) => d === c).map(([, t]) => t).pop(), p = hit !== undefined && T - hit < 0.16 ? 1 - (T - hit) / 0.16 : 0, op = "÷×−+".includes(c), eqk = c === "=";
          return (<div key={c} style={{ height: 116, borderRadius: 26, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: PS, fontSize: 56, fontWeight: 600,
            background: eqk ? KUNYIT : op ? "#4d5550" : "#3d423e", color: eqk ? "#1b1b14" : "#f1f2ec", boxShadow: `0 ${8 - 6 * p}px 0 ${eqk ? "#a67c00" : "#151816"}`,
            transform: `translateY(${6 * p}px) scale(${1 - 0.04 * p})`, filter: `brightness(${1 + 0.35 * p})` }}>{c}</div>); })}
      </div>
    </div>
    {/* the price sticker slapped on when the voice says it */}
    <div style={{ position: "absolute", right: -40, top: 930, width: 360, borderRadius: 14, overflow: "hidden", background: RCPT, boxShadow: "0 18px 40px rgba(0,0,0,0.5)", opacity: ans, transform: `rotate(${-6 + 2 * (1 - ans)}deg) scale(${1.15 - 0.15 * ans})` }}>
      <div style={{ background: SAMBAL, color: "#fff", fontFamily: PS, fontWeight: 700, fontSize: 30, textAlign: "center", padding: "8px 0" }}>{second ? "pada 30%" : "pada 35%"}</div>
      <div style={{ fontFamily: ANT, fontSize: 104, color: RINK, textAlign: "center", lineHeight: 1.25 }}>{second ? "RM5.40" : "RM4.60"}</div>
    </div>
  </div>);
}
function Bar({ n }: { n: number }) {
  const f = n === 13 ? 0.438 * eo(lin(W(80) - 0.2, W(84))) : 0.438, split = n === 14 ? [onO(88, 0.3, -0.2), onO(89, 0.3, -0.2), onO(91, 0.3, -0.2)] : [0, 0, 0];
  const rest = n === 14 ? onO(85, 0.4, -0.1) : 0;
  return (<div style={{ position: "absolute", left: 80, top: 330, width: 920, fontFamily: PS, color: "#fff" }}>
    {/* the stall's price tag, the same card as on the counter */}
    <div style={{ width: 560, margin: "0 auto", borderRadius: 18, overflow: "hidden", background: RCPT, boxShadow: "0 24px 50px rgba(0,0,0,0.45)", transform: "rotate(-2deg)" }}>
      <div style={{ background: SAMBAL, textAlign: "center", fontSize: 40, fontWeight: 700, padding: "12px 0", letterSpacing: 1 }}>NASI LEMAK</div>
      <div style={{ fontFamily: ANT, fontSize: 170, color: RINK, textAlign: "center", lineHeight: 1.2 }}>RM3.68</div>
      <div style={{ textAlign: "center", fontSize: 30, color: "#5f6459", paddingBottom: 18 }}>purata 2024 (DOSM)</div>
    </div>
    <div style={{ fontSize: 40, color: MUTE, marginTop: 70 }}>Ke mana RM3.68 pergi</div>
    <div style={{ position: "relative", marginTop: 22, height: 170, borderRadius: 24, background: "#22402c", overflow: "hidden", display: "flex" }}>
      <div style={{ width: `${f * 100}%`, background: SAMBAL, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ANT, fontSize: 96, ...TAB }}>{f > 0.25 ? `${Math.round(f * 100)}%` : ""}</div>
      {["gas", "sewa", "masa anda"].map((w, i) => <div key={w} style={{ flex: 1, borderLeft: `6px solid ${GRD}`, background: `rgba(242,183,5,${0.22 * split[i]})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 700, color: KUNYIT, textAlign: "center", lineHeight: 1.05, opacity: split[i], transform: `translateY(${(1 - split[i]) * 16}px)` }}>{w}</div>)}
    </div>
    <div style={{ position: "relative", height: 110, marginTop: 18, fontSize: 36, ...TAB }}>
      <div style={{ position: "absolute", left: 0 }}>bahan makanan<br /><b>RM1.61</b></div>
      <div style={{ position: "absolute", right: 0, textAlign: "right", opacity: rest }}>baki<br /><b>RM2.07</b></div>
    </div>
    <div style={{ marginTop: 20, fontSize: 30, color: MUTE }}>RM1.61 ÷ RM3.68 ≈ 44%</div>
  </div>);
}
function Rail({ n }: { n: number }) {
  const R = [["Kira kos bahan", "harga setiap bahan sebungkus"], ["Pilih kos makanan", "berapa peratus untuk bahan"], ["Bahagi", "kos ÷ peratus = harga"], ["Semak", "banding dengan harga pasaran"]];
  return (<div style={{ position: "absolute", left: 100, top: 470, width: 880, fontFamily: PS }}>
    {R.map(([t, s], i) => { const v = onO(11, 0.4, -0.35 + i * 0.09);
      return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 40, padding: "30px 0", borderTop: i ? "2px solid rgba(255,255,255,0.12)" : "none", opacity: v, transform: `translateY(${(1 - v) * 26}px)` }}>
        <div style={{ width: 110, fontFamily: ANT, fontSize: 150, lineHeight: 1, color: KUNYIT, textAlign: "center" }}>{i + 1}</div>
        <div><div style={{ fontSize: 60, fontWeight: 700, color: "#fff" }}>{t}</div><div style={{ fontSize: 34, color: MUTE, marginTop: 6 }}>{s}</div></div></div>); })}
  </div>);
}
function Ui({ n }: { n: number }) {
  const c = SETUPS[n - 1]; if (!c.ui) return null;
  const x = cl((T - ST[n - 1]) / (ST[n] - ST[n - 1])), u = 0.55 * x + 0.45 * ss(x, 0, 1);
  const s = lerp(c.ui.a[0], c.ui.b[0], u), fx = lerp(c.ui.a[1], c.ui.b[1], u), fy = lerp(c.ui.a[2], c.ui.b[2], u);
  const prev = n > 1 ? SETUPS[n - 2].ui : undefined, same = !!prev && prev.screen === c.ui.screen;
  const enter = same ? 1 : eo((T - (ST[n - 1] - 0.05)) / 0.33), blur = (1 - enter) * 10;
  const sc = c.ui.screen, body = sc === "rail" ? <Rail n={n} /> : sc === "sheet" ? <Sheet n={n} /> : sc === "slider" ? <Slider n={n} /> : sc === "calc" ? <Calc n={n} /> : <Bar n={n} />;
  // the ground: banana-leaf green with its fine parallel veins, so the screens and the food shots share one world
  return (<div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: `repeating-linear-gradient(104deg, rgba(255,255,255,0.028) 0px, rgba(255,255,255,0.028) 2px, transparent 2px, transparent 38px), radial-gradient(ellipse at 50% 42%, #24452f 0%, ${GRD} 50%, ${GRD2} 100%)` }}>
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
  /* 6 */ { ...U("sheet", [1.0, 540, 900], [1.03, 540, 920]), step: 1 },
  /* 7 */ { ...U("sheet", [1.0, 540, 920], [1.03, 540, 945]), step: 1 },
  /* 8 */ { ...U("slider", [1.0, 540, 900], [1.04, 540, 880]), step: 2 },
  /* 9 */ { ...U("slider", [1.04, 540, 880], [1.08, 540, 860]), step: 2 },
  /* 10 */ { ...U("calc", [1.0, 540, 950], [1.04, 540, 970]), step: 3 },
  /* 11 */ { ...U("calc", [1.0, 540, 980], [1.04, 540, 1000]), step: 3 },
  /* 12 */ { set: "f", tr: "out", a: C(fromT([LF[0] + 0.08, TY + 0.04, LF[2]], [0.6, 0.4, 1], 1.05), [LF[0] + 0.08, TY + 0.04, LF[2]]), b: C(fromT([LF[0] + 0.1, TY + 0.05, LF[2] + 0.03], [0.5, 0.35, 1], 0.92), [LF[0] + 0.1, TY + 0.05, LF[2] + 0.03]), fov: 30, fs: 4, step: 4, src: "Purata 2024: DOSM (Indeks Harga Pengguna)" },
  /* 13 */ { ...U("bar", [1.0, 540, 900], [1.05, 540, 880]), step: 4 },
  /* 14 */ { ...U("bar", [1.05, 540, 880], [1.03, 540, 900]), step: 4 },
  /* 15 */ { set: "f", tr: "in", a: C(fromT(LFC, [0.4, 1.4, 1.1], 0.9), LFC), b: P1A, fov: 30, fs: 4 },
];
function World({ n }: { n: number }) {
  return <Food n={n} />;
}
