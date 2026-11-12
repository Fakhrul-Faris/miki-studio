
// ================= time: everything hangs on the spoken words (tl.json, rebuilt when the voice changes) =================
const FPS = 30, OFF = 0, RFPS = 30;      // FPS = the unit caption timings are written in; RFPS = frames rendered per second
const CAPS = (TL as any).caps as { L: string; w: string; key: boolean; t: number }[];
const DUR = (TL as any).dur as number, FRAMES = Math.round(DUR * RFPS);
const W = (i: number) => CAPS[i].t;
let T = 0;                                                    // seconds, set once per frame
const lin = (a: number, b: number) => cl((T - a) / (b - a));
const sm = (a: number, b: number) => ss(T, a, b);
const on = (i: number, d = 0.3, off = 0) => ss(T, W(i) + off, W(i) + off + d);
// setup k (1-based) runs ST[k-1] .. ST[k]
const ST = [0, W(2) - 0.05, W(4) - 0.05, W(9), W(15), W(23), W(31), W(37), W(40), W(50), W(54), W(59), W(68), W(77) - 0.3, W(86), W(95), W(101), W(109), W(113), W(120), W(128) - 0.45, W(134) - 0.5, W(144), W(150), W(161), W(172), W(178) - 0.3, DUR];
const mixHex = (a: string, b: string, u: number) => { const h = (s: string, i: number) => parseInt(s.slice(1 + i * 2, 3 + i * 2), 16); return "#" + [0, 1, 2].map((i) => Math.round(lerp(h(a, i), h(b, i), u)).toString(16).padStart(2, "0")).join(""); };

// ================= sets =================
const CY = 0.9;
const SIGN = [0.62, CY, 0.3], BAGP = [0, CY, -0.16];
const V1 = [20, 0, 0], V2 = [-20, 0, 0], V3 = [-20, 0, -10], V4 = [-20, 0, -20], V5 = [14, 0, 0], V6 = [-40, 0, 0];
const dark = (c = "#1c1e22", r = 0.42) => <StandardMaterial base_color={c} perceptual_roughness={r} />;
function Slab({ p, half, c, r, k }: { p: number[]; half: number[]; c?: string; r?: number; k: string }) {
  return <Mesh3d key={k} transform={Transform.fromXyz(p[0], p[1] - half[1], p[2])}><Cuboid half_size={half as any} />{dark(c, r)}</Mesh3d>;
}
const RING = PRODUCTS.map((id, i) => { const a = (-150 + i * (300 / 11)) * Math.PI / 180; return { id, x: BAGP[0] + Math.sin(a) * 0.46, z: BAGP[2] + 0.02 - Math.cos(a) * -0.42, a }; });
const NOTE = [0.21, 0.297], PAY = [0.21, 0.225];

function CounterSet({ n }: { n: number }) {
  const P: any[] = [];
  P.push(<Slab key="ct" k="ct" p={[0.6, CY, 0]} half={[3.2, 0.02, 1.1]} c="#22242a" r={0.4} />);
  P.push(<Slab key="fl" k="fl" p={[0, 0, 0]} half={[9, 0.02, 7]} c="#101114" r={0.6} />);
  P.push(<Mesh3d key="bw" transform={Transform.fromXyz(0, 1.5, -2.6)}><Cuboid half_size={[9, 2.2, 0.02]} />{dark("#1b1d22", 0.9)}</Mesh3d>);
  // a dim shelf run behind for depth (blurred)
  for (let i = 0; i < 18; i++) for (const y of [0.55, 1.0, 1.45]) P.push(<Product key={"bg" + i + y} k={"bg" + i + y} id={PRODUCTS[(i * 5 + Math.round(y * 7)) % 12]} p={[-2.6 + i * 0.3, y, -2.3]} ry={rnd(i + y) - 0.5} />);
  for (const y of [0.55, 1.0, 1.45]) { P.push(<Slab key={"bs" + y} k={"bs" + y} p={[0, y, -2.3]} half={[3, 0.012, 0.2]} c="#24262b" />); P.push(<Mesh3d key={"bl" + y} transform={Transform.fromXyz(0, y - 0.025, -2.095)}><Cuboid half_size={[3, 0.012, 0.003]} /><StandardMaterial base_color="#3a0c10" emissive={glow(RED, 0.5)} /></Mesh3d>); }
  // the bag: solid → x-ray on "everything" → solid again once the products have left it
  const xr = n === 2 ? on(3, 0.35) : n === 3 ? 1 - sm(ST[2] + 0.95, ST[2] + 1.3) : 0;
  P.push(<Bag key="bag" p={BAGP} x={xr} />);
  if (n >= 2 && n <= 4) RING.forEach((r, i) => {
    const u = n === 2 ? 0 : n === 3 ? sm(ST[2] + 0.12 + i * 0.055, ST[2] + 0.62 + i * 0.055) : 1;
    const a = [BAGP[0] - 0.17 + (i % 4) * 0.11, CY + 0.01 + Math.floor(i / 4) * 0.115, BAGP[2] + (rnd(i) - 0.5) * 0.06], b = [r.x, CY, r.z];
    const sc = n === 2 ? 0.42 * Math.max(0.001, on(3, 0.3, i * 0.02)) : lerp(0.42, 0.8, u);
    P.push(<Product key={"in" + i} k={"in" + i} id={r.id} p={[lerp(a[0], b[0], u), lerp(a[1], b[1], u) + Math.sin(Math.PI * u) * 0.3, lerp(a[2], b[2], u)]} sc={sc} ry={lerp(i, -r.a, u)} />);
    const tg = n === 3 ? sm(ST[2] + 0.66 + i * 0.055, ST[2] + 0.86 + i * 0.055) : n === 4 ? 1 : 0;
    if (tg > 0.01) P.push(<Card key={"tg" + i} k={"tg" + i} p={[r.x + Math.sin(r.a) * 0.13, CY + 0.0025, r.z + Math.cos(r.a) * 0.13 * (r.z > BAGP[2] ? 1 : -1)]} size={[0.075, 0.05]} tex="tag" rx={-Math.PI / 2} ry={-r.a} em={0.5} sc={tg} />);
  });
  if (n === 4) { const r = RING[2]; P.push(<Card key="tgs" k="tgs" p={[r.x - 0.02, CY + 0.032, r.z + 0.17]} size={[0.09, 0.06]} tex="tag" rx={-0.25} ry={0.6} em={0.7} />); P.push(<Coins key="c4" k="c4" p={[r.x + 0.075, CY, r.z + 0.2]} n={14 * lin(W(10), W(14))} total={14} hot={5} />); }
  // the sign and what its flaps do
  let price = "2.60", prev = "2.60", fl = 1, shv = 0;
  if (n === 18) shv = lin(W(112), W(112) + 0.55);
  if (n === 19) { price = "2.40"; fl = lin(W(117), W(117) + 0.45); }
  if (n === 23) { price = "2.??"; fl = lin(W(146), W(146) + 0.5); }
  if (n === 27) { const back = lin(DUR - 0.5, DUR - 0.12); if (back > 0) { prev = "2.80"; fl = back; } else { price = "2.80"; fl = lin(W(180), W(180) + 0.45); } }
  P.push(<Sign key="sg" p={SIGN} price={price} prev={prev} fl={fl} shv={shv} />);
  if (n >= 19 && n <= 23) { const u = n === 19 ? on(114, 0.4, -0.25) : 1;
    P.push(<Card key="cal" k="cal" p={[SIGN[0] - 0.31, CY + 0.13 * u, 0.27]} size={[0.24, 0.24]} tex="calendar" rx={lerp(-Math.PI / 2, -0.2, u)} ry={0.25} em={0.25} />); }
  if (n >= 17 && n <= 23) {
    P.push(<Card key="pay" k="pay" p={[1.25, CY + 0.002, 0.3]} size={PAY} tex="payslip" rx={-Math.PI / 2} ry={0.18}><Under k="payu" size={PAY} u0={0.27} u1={0.87} v={0.635} a={n === 20 ? on(126, 0.3) : n > 20 ? 1 : 0} /></Card>);
    P.push(<Card key="fx" k="fx" p={[1.8, CY + 0.09, 0.1]} size={[0.3, 0.15]} tex="fx" rx={-0.1} ry={-0.2} em={n === 21 ? 0.55 + 0.45 * on(129, 0.25) : 0.5} />);
    P.push(<Mesh3d key="fxb" transform={Transform.fromXyz(1.805, CY + 0.09, 0.085).withRotation(Quat.fromEuler("YXZ", -0.2, -0.1, 0))}><Cuboid half_size={[0.165, 0.09, 0.012]} />{dark("#131417")}</Mesh3d>);
    P.push(<Card key="note" k="note" p={[2.4, CY + 0.002, 0.3]} size={NOTE} tex="note" rx={-Math.PI / 2} ry={-0.12}>
      <Under k="nu1" size={NOTE} u0={0.09} u1={0.84} v={0.312} a={n === 22 ? on(139, 0.3) : n > 22 ? 1 : 0} /><Under k="nu2" size={NOTE} u0={0.09} u1={0.79} v={0.354} a={n === 22 ? on(141, 0.3) : n > 22 ? 1 : 0} /></Card>);
  }
  return <>{P}</>;
}
function CounterLights() {
  const s20 = sm(ST[19] - 0.2, ST[19] + 0.3) * (1 - sm(ST[20] - 0.2, ST[20] + 0.3)), s21 = sm(ST[20] - 0.2, ST[20] + 0.3) * (1 - sm(ST[21] - 0.2, ST[21] + 0.3)), s22 = sm(ST[21] - 0.2, ST[21] + 0.3) * (1 - sm(ST[22] - 0.2, ST[22] + 0.3));
  const doc = Math.max(s20, s22), off = Math.max(doc, s21), xg = sm(W(3), W(3) + 0.35) * (1 - sm(ST[2] + 0.95, ST[2] + 1.3));
  return (<>
    <RectLight transform={Transform.fromXyz(0.1, CY + 1.1, 0.4).lookingAt([0.05, CY, 0.05])} intensity={lerp(46000, 9000, doc)} width={1.6} height={1.0} color="#fff3e2" range={5} />
    <SpotLight transform={Transform.fromXyz(0.6, CY + 1.0, 0.9).lookingAt([0.0, CY + 0.1, 0.1])} intensity={lerp(15000, 2000, doc)} outer_angle={0.6} inner_angle={0.1} color="#fff1dc" shadow_maps_enabled range={5} />
    <RectLight transform={Transform.fromXyz(0, 2.6, -1.2).lookingAt([0, 1.0, -2.3])} intensity={14000} width={5} height={0.5} color="#aebbd4" range={6} />
    <SpotLight transform={Transform.fromXyz(1.5, CY + 0.7, 0.5).lookingAt([1.25, CY, 0.28])} intensity={30000 * s20} outer_angle={0.2} inner_angle={0.08} color="#fff3e2" shadow_maps_enabled range={3} />
    <SpotLight transform={Transform.fromXyz(2.62, CY + 0.75, 0.5).lookingAt([2.4, CY, 0.3])} intensity={34000 * s22} outer_angle={0.22} inner_angle={0.1} color="#fff3e2" shadow_maps_enabled range={3} />
    <RectLight transform={Transform.fromXyz(1.8, CY + 0.8, 0.7).lookingAt([1.8, CY + 0.08, 0.1])} intensity={22000 * s21} width={0.6} height={0.4} color="#fff3e2" range={3} />
    <RectLight transform={Transform.fromXyz(SIGN[0] + 0.1, CY + 0.9, SIGN[2] + 0.5).lookingAt([SIGN[0], CY + 0.05, SIGN[2]])} intensity={lerp(14000, 2000, off)} width={0.7} height={0.5} color="#fff3e2" range={3} />
    <PointLight transform={Transform.fromXyz(BAGP[0], CY + 0.2, BAGP[2])} intensity={5200 * xg} color={HOT} range={0.7} />
  </>);
}
function Void({ o, children, key2, hi = false, dim = 1, spill }: { o: number[]; children?: any; key2: string; hi?: boolean; dim?: number; spill?: number[] }) {
  return (<>
    <Slab k={key2 + "f"} p={[o[0], 0, o[2]]} half={[6, 0.02, 6]} c="#30333a" r={0.5} />
    {spill ? <PointLight transform={Transform.fromXyz(spill[0], spill[1], spill[2])} intensity={spill[3] ?? 500} color={HOT} range={0.6} /> : null}
    {hi ? <DirectionalLight transform={Transform.fromXyz(o[0] + 2, 8, o[2] + 4).lookingAt([o[0], 0, o[2]])} illuminance={2400} color="#fff3e2" shadow_maps_enabled soft_shadow_size={3} /> : <RectLight transform={Transform.fromXyz(o[0] + 0.15, 1.3, o[2] + 0.5).lookingAt([o[0], 0, o[2]])} intensity={52000 * dim} width={1.6} height={1.0} color="#fff3e2" range={5} />}
    <SpotLight transform={Transform.fromXyz(o[0] + 0.7, 1.1, o[2] + 0.9).lookingAt([o[0], 0.05, o[2]])} intensity={hi ? 0 : 15000 * dim} outer_angle={0.6} inner_angle={0.1} color="#fff1dc" shadow_maps_enabled range={5} />
    {children}
  </>);
}
// the bottle as 26 discs of 10 sen: gap opens, the top 8.7 lift and heat up
function Sliced({ p, gap, lift, heat, hot = 8.7, k = "sl" }: { p: number[]; gap: number; lift: number; heat: number; hot?: number; k?: string }) {
  const P: any[] = [];
  for (let i = 0; i < NS; i++) { const h = i >= NS - Math.ceil(hot);
    P.push(<Mesh3d key={k + i} name={k + i} shape={so().slices[i]} transform={Transform.fromXyz(p[0], p[1] + i * gap + (h ? lift : 0), p[2])}>
      <StandardMaterial base_color={h ? mixHex("#dcd9d1", RED, heat) : "#dcd9d1"} emissive={glow(HOT, h ? 2.2 * heat : 0)} perceptual_roughness={0.4} /></Mesh3d>); }
  return <>{P}</>;
}
// a gondola: shelves both sides, neutral products, a red lip line on every shelf
const LV = [0.32, 0.72, 1.12, 1.52];
function Gondola({ x, k, lip }: { x: number; k: string; lip: (i: number) => number }) {
  const P: any[] = []; const Z0 = -24, Z1 = -16.6;
  P.push(<Mesh3d key={k + "sp"} transform={Transform.fromXyz(x, 0.95, (Z0 + Z1) / 2)}><Cuboid half_size={[0.02, 0.95, (Z1 - Z0) / 2]} />{dark("#1a1b1f", 0.6)}</Mesh3d>);
  P.push(<Mesh3d key={k + "cap"} transform={Transform.fromXyz(x, 0.95, Z1 + 0.02)}><Cuboid half_size={[0.45, 0.95, 0.02]} />{dark("#1a1b1f", 0.6)}</Mesh3d>);
  for (const sd of [-1, 1]) for (const [j, y] of LV.entries()) {
    P.push(<Mesh3d key={k + sd + "b" + j} transform={Transform.fromXyz(x + sd * 0.235, y - 0.012, (Z0 + Z1) / 2)}><Cuboid half_size={[0.215, 0.012, (Z1 - Z0) / 2]} />{dark("#26282d", 0.45)}</Mesh3d>);
    P.push(<Mesh3d key={k + sd + "l" + j} transform={Transform.fromXyz(x + sd * 0.452, y - 0.024, (Z0 + Z1) / 2)}><Cuboid half_size={[0.003, 0.013, (Z1 - Z0) / 2]} /><StandardMaterial base_color="#3a0c10" emissive={glow(HOT, lip((3 - j) * 2 + (sd * x < 0 ? 0 : 1)))} /></Mesh3d>);
    for (let z = Z0 + 0.2, i = 0; z < Z1 - 0.1; z += 0.3, i++) {
      const id = PRODUCTS[(i * 7 + j * 3 + (sd > 0 ? 5 : 0) + Math.round(x * 3) + 120) % 12];
      P.push(<Product key={k + sd + "p" + j + "_" + i} k={k + sd + "p" + j + "_" + i} id={id} p={[x + sd * 0.27, y, z + (rnd(i * 3 + j) - 0.5) * 0.04]} ry={sd * Math.PI / 2 + (rnd(i + j * 9) - 0.5) * 0.4} sc={id === "multi_cleaner_5_litre" ? 0.8 : 0.9} />);
    }
  }
  return <>{P}</>;
}
const HEROSHELF = [0.63, LV[2], -17.35];
function StoreSet({ n }: { n: number }) {
  const lip = (i: number) => (n === 25 ? 3.2 : n === 24 ? lerp(0.35, 3.2, on(158, 0.3, -0.25 + i * 0.09)) : 0.35);
  const P: any[] = [<Slab key="sf" k="sf" p={[0, 0, -20]} half={[7, 0.02, 6]} c="#1b1d22" r={0.35} />];
  for (const x of [-0.9, 0.9]) P.push(<Gondola key={"g" + x} k={"g" + x} x={x} lip={lip} />);
  const lit = n === 7 ? on(33, 0.35) : 1;
  P.push(<Bottle key="hb" k="hb" p={HEROSHELF} ry={-Math.PI / 2 + 0.25} />); P.push(<Sign key="hs" k="hs" p={[HEROSHELF[0] - 0.19, HEROSHELF[1] - 0.085, HEROSHELF[2]]} ry={-Math.PI / 2} sc={0.42} tilt={0} em={lerp(0.12, 0.85, lit)} />);
  if (n === 12) { let q = 0; for (let i = 0; i < 10; i++) if ((i * 7) % 10 < 6) { const u = on(65, 0.16, q++ * 0.09); if (u > 0.01) P.push(<Mesh3d key={"st" + i} name={"st" + i} transform={Transform.fromXyz(0.9 - 0.455 - (1 - u) * 0.05, LV[2] - 0.024, -19.9 + i * 0.3 + 0.2).withRotation(rotY(-Math.PI / 2)).withScale([lerp(1.8, 1, u), lerp(1.8, 1, u), 1])}><Cuboid half_size={[0.12, 0.014, 0.002]} /><StandardMaterial base_color={RED} emissive={glow(HOT, 4 * u)} /></Mesh3d>); } }
  return (<>
    {P}
    {[-23, -20.5, -18, -16].map((z) => <RectLight key={"sl" + z} transform={Transform.fromXyz(0, 2.5, z).lookingAt([0, 0, z - 0.01])} intensity={n === 24 ? 34000 : 46000} width={0.5} height={1.6} color="#dfe6f2" range={5} />)}
    <SpotLight transform={Transform.fromXyz(0.1, 1.9, -17.1).lookingAt(HEROSHELF as any)} intensity={n === 7 || n === 8 ? 3000 + 23000 * lit : 0} outer_angle={0.28} inner_angle={0.08} color="#fff3e2" shadow_maps_enabled range={4} />
  </>);
}
const BOX = S("cardboard_box_01/cardboard_box_01_g.gltf");
function QuaySet() {
  const P: any[] = [<Slab key="qf" k="qf" p={[V5[0], 0, 0]} half={[14, 0.02, 12]} c="#202227" r={0.55} />];
  const wall = (k: string, p: number[], h: number[]) => P.push(<Mesh3d key={k} transform={Transform.fromXyz(V5[0] + p[0], p[1], p[2])}><Cuboid half_size={h as any} /><StandardMaterial base_color="#a8232c" perceptual_roughness={0.6} /></Mesh3d>);
  wall("cw1", [0, 1.3, 1.19], [3.03, 1.3, 0.03]); wall("cw2", [0, 1.3, -1.19], [3.03, 1.3, 0.03]); wall("cw3", [0, 2.57, 0], [3.03, 0.03, 1.22]); wall("cw4", [0, 0.05, 0], [3.03, 0.05, 1.22]); wall("cw5", [-3.0, 1.3, 0], [0.03, 1.3, 1.22]);
  for (let i = 0; i < 24; i++) for (const z of [1.235, -1.235]) P.push(<Mesh3d key={"cr" + i + z} transform={Transform.fromXyz(V5[0] - 2.87 + i * 0.25, 1.3, z)}><Cuboid half_size={[0.03, 1.15, 0.015]} /><StandardMaterial base_color="#8f1d25" perceptual_roughness={0.6} /></Mesh3d>);
  P.push(<Card key="lg" k="lg" p={[V5[0] + 1.4, 1.75, 1.256]} size={[2.6, 0.406]} tex="band" em={0.7} />);
  let i = 0;
  for (let lv = 0; lv < 3; lv++) for (let a = 0; a < 9; a++) { i++; const x = V5[0] + 3.7 + (a % 3) * 0.62 + lv * 0.2 + (rnd(i) - 0.5) * 0.1, z = -0.62 + Math.floor(a / 3) * 0.62 + (rnd(i * 3) - 0.5) * 0.1; if (lv > 0 && rnd(i * 5) > 0.6 - lv * 0.2) continue;
    const u = sm(ST[14] + 0.1 + (a % 3) * 0.22 + lv * 0.12, ST[14] + 0.75 + (a % 3) * 0.22 + lv * 0.12);            /* slide out of the container, the far column last */
    P.push(<Model key={"qb" + i} src={BOX} position={[lerp(x - 3.4, x, u), 0.33 + lv * 0.43, z]} rotation={[0, (rnd(i * 7) - 0.5) * 0.5 * u, 0]} scale={[1.25, 1.25, 1.25]} />); }
  const hu = sm(ST[14] + 0.05, ST[14] + 0.7), hp = [V5[0] + lerp(3.4, 6.3, hu), 0.375, 1.25];
  P.push(<Model key="qhero" src={BOX} position={hp as any} rotation={[0, 0.5, 0]} scale={[1.5, 1.5, 1.5]} />);
  P.push(<Card key="qlab" k="qlab" p={[hp[0] + 0.14, 0.4, hp[2] + 0.36]} size={[0.44, 0.22]} tex="carton" ry={0.5} em={0.12} />);
  return (<>{P}
    <DirectionalLight transform={Transform.fromXyz(V5[0] + 8, 9, 7).lookingAt([V5[0] + 3, 0, 0])} illuminance={3600} color="#fff3e2" shadow_maps_enabled soft_shadow_size={3} />
    <PointLight transform={Transform.fromXyz(V5[0] + 7.4, 1.8, 3.0)} intensity={520000} color="#fff3e2" range={8} />
    <PointLight transform={Transform.fromXyz(V5[0] + 6, 2.5, 5)} intensity={3000000} color="#aebbd4" range={30} />
  </>);
}
const MX = (lon: number) => V6[0] + (lon - 109.5) * 0.1, MZ = (lat: number) => -(lat - 4.2) * 0.1;
function MapSet({ lit, flip }: { lit: number; flip: number }) {
  const D = (MAP as any).dots as number[][], B = (MAP as any).border as number[][], P: any[] = [<Slab key="mf" k="mf" p={[V6[0], 0, 0]} half={[5, 0.02, 4]} c="#25272c" r={0.85} />];
  B.forEach((b, i) => P.push(<Mesh3d key={"mb" + i} transform={Transform.fromXyz(MX(b[0]), 0.001, MZ(b[1]))}><Cuboid half_size={[0.0035, 0.001, 0.0035]} /><StandardMaterial base_color="#4a4d54" emissive={glow("#aab0bb", 1.6)} /></Mesh3d>));
  D.forEach((d, i) => { const u = (d[0] - 99.6) / 19.8, o = u <= lit, fl = flip > 0 && u <= flip && u > flip - 0.14;
    P.push(<Mesh3d key={"md" + i + (o ? "a" : "") + (fl ? "f" : "")} name={"md" + i + (o ? "a" : "") + (fl ? "f" : "")} transform={Transform.fromXyz(MX(d[0]), 0.004 + (fl ? 0.006 : 0), MZ(d[1]))}><Cylinder radius={fl ? 0.0105 : 0.0075} half_height={0.004} />
      <StandardMaterial base_color={o ? RED : "#6a6d75"} emissive={fl ? glow("#ffffff", 3.5) : o ? glow(HOT, 3.2) : glow("#8a8f99", 0.7)} /></Mesh3d>); });
  return (<>{P}<RectLight transform={Transform.fromXyz(V6[0], 2.2, 1.2).lookingAt([V6[0], 0, 0])} intensity={90000} width={3} height={1.5} color="#dfe6f2" range={7} /></>);
}

// ================= the 27 setups =================
type Pose = { p: number[]; l: number[] };
type Tag = { at: number[]; x: number; y: number; cap: string; big?: string; sub?: string; t: number };
type Setup = { set: string; a: Pose; b: Pose; fov?: number; fs?: number; up?: number[]; tr?: "in" | "out" | "side"; fd?: () => number | null; tags?: Tag[];
  count?: { v: () => string; unit: string; t?: number }; note?: string; src?: string; cap: [string, number] };
const SG = [SIGN[0], CY + 0.05, SIGN[2]];
const fromT = (l: number[], dir: number[], d: number) => { const k = Math.hypot(dir[0], dir[1], dir[2]); return [l[0] + (dir[0] / k) * d, l[1] + (dir[1] / k) * d, l[2] + (dir[2] / k) * d]; };
const dist3 = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const C = (p: number[], l: number[]): Pose => ({ p, l });
const R9 = RING[2], T4 = [R9.x + 0.03, CY + 0.05, R9.z + 0.16], B2 = [0, 1.1, -0.16];
const c5 = [20, 0.045, 0], l8 = [0.45, 1.06, -17.35], c9 = [-20, 0.2, 0], l11 = [-20, 0.078, -10], l14 = [-20, 0.06, -19.72], HB = [0.5, 1.2, -17.35];
const num = (a: number, b: number, t0: number, t1: number, d = 0) => lerp(a, b, cl((T - t0) / (t1 - t0))).toFixed(d);
const P1A = C(fromT(SG, [0.12, 0.06, 1], 1.25), SG);
const SETUPS: Setup[] = [
  /* 1 */ { set: "c", a: P1A, b: C(fromT(SG, [0.12, 0.06, 1], 1.05), SG), fov: 26, fs: 2.8, cap: ["*Eco-Shop sells", 0], src: "FY2026 results · The Edge, 14 Aug 2026" },
  /* 2 */ { set: "c", a: C([0.5, 1.06, 1.6], [0.3, 1.0, 0.1]), b: C(fromT(B2, [0.12, 0.05, 1], 2.15), B2), fov: 30, fs: 2, cap: ["almost *everything", 1],
            fd: () => lerp(1.2, 2.15, sm(ST[1] + 0.05, ST[1] + 0.45)), tags: [{ at: [-0.2, 1.25, -0.08], x: 70, y: 1380, cap: "INSIDE THE BAG", big: "12 kinds of product", sub: "an illustration", t: W(3) + 0.25 }] },
  /* 3 */ { set: "c", a: C([0.3, 2.5, 2.0], [0, CY + 0.1, -0.1]), b: C([0.0, 4.25, 0.5], [0, CY, -0.1]), fov: 34, fs: 8, cap: ["for *RM2.60,", 1],
            count: { v: () => num(1, 12, ST[2] + 0.55, ST[2] + 1.25), unit: "items, one price" }, note: "products are library models in grey, not Eco-Shop stock" },
  /* 4 */ { set: "c", a: C(fromT(T4, [-0.3, 0.5, 0.85], 1.7), T4), b: C(fromT(T4, [-0.45, 0.16, 0.85], 1.2), T4), fov: 26, fs: 2.4, cap: ["more *money per item.", 1],
            tags: [{ at: [R9.x + 0.075, CY + 0.034, R9.z + 0.2], x: 70, y: 1400, cap: "PER ITEM", big: "more than ever", t: W(13) }] },
  /* 5 */ { set: "v1", tr: "in", a: C(fromT(c5, [0.25, 0.2, 1], 0.62), c5), b: C(fromT(c5, [0.06, 0.26, 1], 1.0), c5), fov: 26, fs: 4, cap: ["a record *33%,", 2], src: "The Edge, 14 Aug 2026 · The Star, 30 Jul 2025",
            count: { v: () => num(19.6, 33.3, ST[4] + 0.2, W(22) + 0.3, 1) + "%", unit: "gross margin" },
            tags: [{ at: [19.93, 0.046, 0], x: 70, y: 1400, cap: "FY2022", big: "19.6%", t: ST[4] + 0.6 }, { at: [20.0, 0.063, 0], x: 400, y: 1400, cap: "FY2025", big: "28.2%", t: W(19) }, { at: [20.07, 0.075, 0], x: 640, y: 660, cap: "FY2026", big: "33.3%", sub: "one coin = one point of margin", t: W(22) + 0.1 }] },
  /* 6 */ { set: "v1", a: C([19.8, 0.035, 0.56], [19.98, 0.045, 0.0]), b: C([19.6, 0.03, 0.44], [20.0, 0.04, 0.0]), fov: 30, fs: 4, up: [0.2, 1, 0], cap: ["just *four years ago.", 1],
            tags: [{ at: [19.93, 0.046, 0], x: 70, y: 640, cap: "FY2022", big: "19.6%", t: W(25) }, { at: [20.07, 0.075, 0], x: 620, y: 640, cap: "FY2026", big: "33.3%", t: ST[5] + 0.3 }] },
  /* 7 */ { set: "s", tr: "out", a: C([-0.32, 1.36, -14.8], HB), b: C([-0.32, 1.3, -15.6], HB), fov: 30, fs: 2, cap: ["one *bottle on that shelf.", 1], note: "an illustration: the bottle and its label are ours",
            fd: () => lerp(0.9, dist3([-0.32, 1.3, -15.6], HB), sm(W(32) - 0.1, W(33) + 0.15)) },
  /* 8 */ { set: "s", a: C(fromT(l8, [-1, 0.12, 0.5], 0.78), l8), b: C(fromT(l8, [-1, 0.05, 0.32], 0.54), l8), fov: 26, fs: 2.8, cap: ["You pay *RM2.60.", 2], tags: [{ at: [0.45, 1.075, -17.35], x: 70, y: 1400, cap: "SHELF PRICE", big: "RM2.60", t: W(39) }] },
  /* 9 */ { set: "v2", tr: "in", a: C(fromT(c9, [0.1, 0.3, 1], 1.45), [-20, 0.13, 0]), b: C(fromT(c9, [0.4, 0.55, 0.75], 1.35), c9), fov: 26, fs: 5.6, cap: ["about *87 sen", 1],
            count: { v: () => num(0, 87, W(43), W(43) + 0.45) + " sen", unit: "stays with Eco-Shop (average)", t: W(42) }, tags: [{ at: [-20, 0.1, 0.03], x: 640, y: 1330, cap: "26 SLICES", big: "10 sen each", t: W(42) + 0.3 }],
            note: "33.3% gross margin × RM2.60 = about 87 sen, a company-wide average" },
  /* 10 */ { set: "v2", a: C(fromT(c9, [0.45, 0.3, 0.9], 1.4), c9), b: C(fromT(c9, [0.5, 0.08, 1], 1.3), [-20, 0.21, 0]), fov: 26, fs: 5.6, up: [-0.1, 1, 0], cap: ["before rent and *wages.", 3],
            tags: [{ at: [-19.965, 0.33, 0], x: 70, y: 620, cap: "STAYS", big: "about 87 sen", t: ST[9] + 0.2 }, { at: [-19.962, 0.12, 0], x: 600, y: 1400, cap: "COST OF THE GOODS", big: "about RM1.73", t: W(51) }] },
  /* 11 */ { set: "v3", tr: "side", a: C(fromT(l11, [0.36, 0.03, 1], 0.44), l11), b: C(fromT(l11, [0.14, 0.03, 1], 0.4), l11), fov: 26, fs: 4, up: [-0.16, 1, 0], cap: ["Look at the *label.", 3], note: "illustrative label, not a real product" },
  /* 12 */ { set: "s", tr: "out", a: C([-0.3, 1.32, -18.5], [0.45, 1.1, -19.4]), b: C([-0.36, 1.42, -17.5], [0.45, 1.1, -19.2]), fov: 30, fs: 2.8, cap: ["It's Eco-Shop's *own.", 2],
            tags: [{ at: [0.44, 1.1, -19.1], x: 70, y: 1400, cap: "HOUSE BRAND", sub: "shelf is an illustration", t: W(66) }] },
  /* 13 */ { set: "v4", tr: "out", a: C([-20.0, 3.5, -19.1], [-20, 0, -20]), b: C([-20.0, 4.3, -19.45], [-20, 0, -20]), fov: 26, fs: 8, cap: ["now *60% of its sales,", 1],
            count: { v: () => num(0, 60, W(71), W(72) + 0.35) + "%", unit: "of sales are house brands, FY2026" }, src: "The Edge, 14 Aug 2026" },
  /* 14 */ { set: "v4", a: C(fromT(l14, [0.1, 0.7, 1], 2.0), l14), b: C(fromT(l14, [0.1, 0.2, 1], 1.5), l14), fov: 26, fs: 4, cap: ["they earn Eco-Shop *more", 3],
            tags: [{ at: [-20.07, 0.045, -19.7], x: 70, y: 1400, cap: "HOUSE BRAND", big: "higher margin", sub: "as the company describes it", t: W(80) }, { at: [-19.94, 0.026, -19.7], x: 620, y: 1400, cap: "A NAME YOU KNOW", t: W(83) }], note: "stack heights are not data" },
  /* 15 */ { set: "q", tr: "out", a: C([V5[0] + 8.3, 1.0, 3.3], [V5[0] + 6.0, 0.4, 1.2]), b: C([V5[0] + 10.6, 2.3, 3.6], [V5[0] + 4.4, 1.5, 0.5]), fov: 36, fs: 5.6, cap: ["come from *China,", 2],
            count: { v: () => num(0, 65, W(87), W(88) + 0.35) + "%+", unit: "of products sourced from China" }, src: "The Edge, 14 Aug 2026", note: "an illustration: container and cartons are models" },
  /* 16 */ { set: "m", tr: "out", a: C([-40.12, 4.9, -0.05], [-40.12, 0.0, -0.3]), b: C([-40.12, 5.9, -0.05], [-40.12, 0.0, -0.3]), up: [-0.64, 0, -0.77], fov: 34, fs: 11, cap: ["for *462 stores at once.", 1],
            count: { v: () => num(1, 462, W(95), W(98) + 0.3), unit: "stores" }, note: "dot positions are illustrative", src: "462 outlets · The Edge, 14 Aug 2026" },
  /* 17 */ { set: "c", tr: "in", a: C([SIGN[0] - 0.42, 0.935, SIGN[2] + 0.3], [SIGN[0] + 0.02, 0.955, SIGN[2] + 0.01]), b: C([SIGN[0] - 0.27, 0.96, SIGN[2] + 0.52], [SIGN[0], 0.955, SIGN[2]]), fov: 26, fs: 2.4, cap: ["the sign *doesn't say.", 2] },
  /* 18 */ { set: "c", a: C([SIGN[0], 0.955, SIGN[2] + 1.55], [SIGN[0], 0.95, SIGN[2]]), b: C([SIGN[0], 0.955, SIGN[2] + 1.34], [SIGN[0], 0.95, SIGN[2]]), fov: 16, fs: 4, cap: ["Fixed doesn't mean *forever.", 3] },
  /* 19 */ { set: "c", a: C([SIGN[0] - 0.1, 1.04, SIGN[2] + 1.75], [SIGN[0] - 0.14, 0.99, SIGN[2]]), b: C([SIGN[0] - 0.2, 1.08, SIGN[2] + 2.05], [SIGN[0] - 0.2, 1.0, SIGN[2]]), fov: 30, fs: 2.8, cap: ["it was *RM2.40.", 2],
            tags: [{ at: [SIGN[0] - 0.31, 1.1, 0.28], x: 70, y: 1400, cap: "RM2.60 SINCE", big: "14 April 2025", t: W(114) + 0.15 }], src: "The Edge, 29 Apr 2025" },
  /* 20 */ { set: "c", a: C([1.3, 1.42, 1.0], [1.22, CY, 0.3]), b: C([1.38, 1.56, 0.98], [1.25, CY, 0.3]), fov: 26, fs: 4, up: [0.22, 1, 0], cap: ["rising to *RM2,000,", 2], note: "payslip is an illustration", src: "The Star, 29 Oct 2026" },
  /* 21 */ { set: "c", a: C([1.56, 1.12, 1.44], [1.8, 0.99, 0.1]), b: C([1.43, 1.08, 1.52], [1.8, 0.99, 0.1]), fov: 26, fs: 2.8, cap: ["the Chinese *yuan", 2],
            tags: [{ at: [1.8, 1.068, 0.1], x: 70, y: 600, cap: "YUAN VS RINGGIT", big: "stronger", t: W(131) }], note: "direction only; no rate is quoted" },
  /* 22 */ { set: "c", a: C([2.52, 1.62, 0.86], [2.4, CY, 0.3]), b: C([2.45, 1.78, 0.82], [2.4, CY, 0.29]), fov: 26, fs: 5.6, up: [-0.1, 1, 0], cap: ["to *move again", 1], note: "a summary of analyst notes as reported, not the original document", src: "The Star, 29 Oct 2026" },
  /* 23 */ { set: "c", a: C(fromT(SG, [0.32, 0.1, 1], 1.45), SG), b: C(fromT(SG, [0.2, 0.07, 1], 1.2), SG), fov: 26, fs: 2.8, cap: ["pencilled in *20 sen.", 2],
            tags: [{ at: [SIGN[0] + 0.05, CY + 0.045, SIGN[2]], x: 70, y: 1420, cap: "ONE ANALYST'S FORECAST", sub: "not announced by Eco-Shop", t: W(148) + 0.2 }] },
  /* 24 */ { set: "s", tr: "out", a: C([0.0, 1.3, -15.7], [0, 1.08, -20]), b: C([0.0, 1.38, -14.7], [0, 1.08, -20]), fov: 34, fs: 4, cap: ["The *promise is.", 1] },
  /* 25 */ { set: "s", a: C([0.0, 2.3, -14.3], [0, 0.9, -19.4]), b: C([0.0, 3.6, -14.0], [0, 0.8, -19.0]), fov: 34, fs: 5.6, cap: ["on *every shelf,", 1] },
  /* 26 */ { set: "m", tr: "out", a: C([-41.0, 2.1, 1.6], [-40.5, 0.0, -0.05]), b: C([-41.25, 2.7, 2.0], [-40.55, 0.0, -0.05]), fov: 34, fs: 8, cap: ["that number *changes,", 2], count: { v: () => "462", unit: "stores" }, note: "dot positions are illustrative" },
  /* 27 */ { set: "c", tr: "in", a: C(fromT(SG, [0.12, 0.4, 1], 2.3), SG), b: P1A, fov: 26, fs: 2.8, cap: ["Would you still go at *RM2.80?", 5], tags: [{ at: [SIGN[0] + 0.07, CY + 0.045, SIGN[2]], x: 560, y: 640, cap: "IF ONE ANALYST IS RIGHT", sub: "a forecast, not announced by Eco-Shop", t: W(180) + 0.3 }] },
];
function World({ n }: { n: number }) {
  const s = SETUPS[n - 1].set;
  if (s === "c") return <><CounterSet n={n} /><CounterLights /></>;
  if (s === "v1") { const f = n === 6;
    return <Void o={V1} key2="v1" spill={[20.07, 0.12, 0.1, 90 * (f ? 1 : lin(W(21), W(22) + 0.25))]}>
      <Coins k="m22" p={[19.93, 0, 0]} n={f ? 20 : 20 * lin(ST[4] + 0.1, W(17) + 0.1)} total={20} /><Coins k="m25" p={[20.0, 0, 0]} n={f ? 28 : 28 * lin(W(17), W(19) + 0.2)} total={28} /><Coins k="m26" p={[20.07, 0, 0]} n={f ? 33 : 33 * lin(W(19) + 0.1, W(22) + 0.25)} total={33} hot={13} /></Void>; }
  if (s === "s") return <StoreSet n={n} />;
  if (s === "v2") { const f = n === 10, h = f ? 1 : on(43, 0.4);
    return <Void o={V2} key2="v2" spill={[-19.9, 0.2, 0.12, 900 * h]}><Sliced p={[-20, 0, 0]} gap={0.0032 * (f ? 1 : on(42, 0.4))} lift={0.035 * h} heat={h} /></Void>; }
  if (s === "v3") { const x = lerp(-0.2, 0.22, lin(ST[10], ST[11]));
    return <Void o={V3} key2="v3" dim={0.32}><Bottle p={[-20, 0, -10]} ry={0.1} /><SpotLight transform={Transform.fromXyz(-20 + x * 2.2, 0.16, -9.55).lookingAt([-20 + x * 0.2, 0.078, -10])} intensity={5200} outer_angle={0.13} inner_angle={0.03} color="#fff3e2" range={2} /></Void>; }
  if (s === "v4") { const P: any[] = [], gone = n === 14 ? sm(ST[13] - 0.1, ST[13] + 0.3) : 0;
    if (gone < 0.99) for (let i = 0; i < 10; i++) { const x = -20 + (i % 5 - 2) * 0.2, z = -20 + (i < 5 ? -0.14 : 0.14), house = (i * 7) % 10 < 6, q = [0, 2, 3, 5, 7, 9].indexOf(i);
      P.push(<Product key={"t" + i} k={"t" + i} id={PRODUCTS[(i * 5 + 2) % 12]} p={[x, 0, z]} ry={i} sc={0.75 * Math.max(0.001, 1 - gone)} />);
      const u = house ? (n === 13 ? on(71, 0.25, -0.2 + Math.max(0, q) * 0.1) : 1 - gone) : 0;
      if (u > 0.01) P.push(<Mesh3d key={"td" + i} name={"td" + i} transform={Transform.fromXyz(x, 0.002, z).withScale([u, 1, u])}><Cylinder radius={0.07} half_height={0.002} /><StandardMaterial base_color={RED} emissive={glow(HOT, 2.6)} /></Mesh3d>); }
    if (n === 14) { const g = Math.max(0.001, gone); P.push(<Entity key="e14a" transform={Transform.fromXyz(-20.16, 0, -19.74).withScale([g, g, g])}><Bottle k="b14" p={[0, 0, 0]} ry={0.3} /></Entity>); P.push(<Coins key="ch" k="ch" p={[-20.07, 0, -19.7]} n={18 * lin(W(78), W(80) + 0.3)} total={18} hot={18} />);
      P.push(<Product key="p14" k="p14" id="bleach_bottle" p={[-19.84, 0, -19.74]} ry={-0.4} sc={0.85 * g} />); P.push(<Coins key="ck" k="ck" p={[-19.94, 0, -19.7]} n={11 * lin(W(78), W(79) + 0.3)} total={11} />); }
    return <Void o={V4} key2="v4" hi={n === 13} spill={n === 14 ? [-20.07, 0.12, -19.6, 90 * lin(W(78), W(80))] : undefined}>{P}</Void>; }
  if (s === "q") return <QuaySet />;
  return <MapSet lit={n === 16 ? lerp(-0.01, 1, lin(W(95), W(98) + 0.3)) : 1} flip={n === 26 ? lerp(0, 1.14, lin(W(176) - 0.2, W(178))) : 0} />;
}

// ================= camera: a drift inside each setup; a flight to the next one on the same set; a push/pull through the dark to another set =================
type Cam = { p: number[]; l: number[]; fov: number; up: number[]; fs: number; fd: number };
const l3 = (a: number[], b: number[], u: number) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];
function camOf(k: number): Cam {                                 // k is 0-based
  const c = SETUPS[k], x = cl((T - ST[k]) / (ST[k + 1] - ST[k])), u = k === 26 ? ss(x, 0, 0.55) : 0.55 * x + 0.45 * ss(x, 0, 1);
  const p = l3(c.a.p, c.b.p, u), l = l3(c.a.l, c.b.l, u);
  return { p, l, fov: c.fov ?? 30, up: c.up ?? [0, 1, 0], fs: c.fs ?? 2.4, fd: c.fd?.() ?? dist3(p, l) };
}
const mixCam = (a: Cam, b: Cam, w: number): Cam => ({ p: l3(a.p, b.p, w), l: l3(a.l, b.l, w), fov: lerp(a.fov, b.fov, w), up: l3(a.up, b.up, w), fs: lerp(a.fs, b.fs, w), fd: lerp(a.fd, b.fd, w) });
const dolly = (c: Cam, k: number): Cam => ({ ...c, p: l3(c.p, c.l, -k) });       // k > 0 pulls back from the target, k < 0 pushes in
const OUT = 0.2, IN = 0.26;
function filmCam(k: number): { cam: Cam; dark: number; fast: boolean } {
  let cam = camOf(k), dk = 0;
  const same = (i: number) => i >= 0 && i < 26 && SETUPS[i].set === SETUPS[i + 1].set;
  if (same(k - 1) && T < ST[k] + 0.32) cam = mixCam(camOf(k - 1), cam, sm(ST[k] - 0.2, ST[k] + 0.32));
  else if (same(k) && T > ST[k + 1] - 0.2) cam = mixCam(cam, camOf(k + 1), sm(ST[k + 1] - 0.2, ST[k + 1] + 0.32));
  if (k > 0 && !same(k - 1) && T < ST[k] + IN) { const q = 1 - (T - ST[k]) / IN, tr = SETUPS[k].tr; cam = tr === "side" ? { ...cam, p: [cam.p[0] + q * q * 0.5 * dist3(cam.p, cam.l), cam.p[1], cam.p[2]] } : dolly(cam, tr === "in" ? q * q * 1.6 : -q * q * 0.6); dk = 0.9 * q * q * q; }
  if (k < 26 && !same(k) && T > ST[k + 1] - OUT) { const q = (T - (ST[k + 1] - OUT)) / OUT, tr = SETUPS[k + 1].tr; cam = tr === "side" ? { ...cam, p: [cam.p[0] - q * q * 0.5 * dist3(cam.p, cam.l), cam.p[1], cam.p[2]] } : dolly(cam, tr === "in" ? -q * q * 0.6 : q * q * 1.6); dk = 0.9 * q * q * q; }
  return { cam, dark: dk, fast: (k > 0 && T < ST[k] + 0.34) || (k < 26 && T > ST[k + 1] - 0.22) };
}
const projS = (c: Cam, w: number[]) => {
  const sub = (a: number[], b: number[]) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a: number[], b: number[]) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const nrm = (a: number[]) => { const k = Math.hypot(a[0], a[1], a[2]); return [a[0] / k, a[1] / k, a[2] / k]; };
  const fw = nrm(sub(c.l, c.p)), rt = nrm(cross(fw, c.up)), up = cross(rt, fw), d = sub(w, c.p), z = dot(d, fw), k = 960 / Math.tan((c.fov * Math.PI) / 360);
  return { x: 540 + (dot(d, rt) / z) * k, y: 960 - (dot(d, up) / z) * k };
};

// ================= captions (STUDY-D § 6): word blurs in over 2 frames, earlier words go light grey, the key word's box draws on, the phrase dims out =================
const FF = "Outfit, 'Inter Display', Inter, 'Helvetica Neue', Arial, sans-serif";
const CT = CAPS.map((c, i) => (i + 1 < CAPS.length && CAPS[i + 1].L === c.L && /^(and|the|at|for|to|of|a|its|it|is)$/i.test(c.w) && W(i + 1) - c.t > 0.3 ? W(i + 1) - 2 / FPS : c.t));
const PH: { i0: number; i1: number; t0: number; t1: number }[] = (() => {
  const g: number[][] = []; let cur: number[] = [];
  CAPS.forEach((c, i) => { cur.push(i); const last = i + 1 >= CAPS.length || CAPS[i + 1].L !== c.L; if (/[.,?]$/.test(c.w) || cur.length >= 4 || last) { g.push(cur); cur = []; } });
  const m: number[][] = [];
  for (const x of g) { const pv = m[m.length - 1]; if (pv && x.length === 1 && pv.length <= 4 && CAPS[pv[0]].L === CAPS[x[0]].L && !/[.?]$/.test(CAPS[pv[pv.length - 1]].w)) pv.push(x[0]); else m.push(x); }
  return m.map((x, j) => ({ i0: x[0], i1: x[x.length - 1], t0: CT[x[0]], t1: Math.min(j + 1 < m.length ? CT[m[j + 1][0]] - 2 / FPS : DUR, W(x[x.length - 1]) + 1.1) }));
})();
function Caption() {
  const ph = PH.find((p) => T >= p.t0 - 0.001 && T < p.t1); if (!ph) return null;
  const out = cl((ph.t1 - T) * FPS / 3), ws: number[] = []; for (let i = ph.i0; i <= ph.i1; i++) if (T >= CT[i] - 0.001) ws.push(i);
  const BL = "#4f8df7";
  return (
    <div style={{ position: "absolute", top: 172, left: 70, width: 940, textAlign: "center", fontFamily: FF, fontSize: 66, lineHeight: 1.2, letterSpacing: -0.5, opacity: out < 1 ? 0.25 + 0.75 * out * out : 1 }}>
      {ws.map((i, j) => { const c = CAPS[i], f = (T - CT[i]) * FPS, fresh = f < 0.99, curr = j === ws.length - 1, b = f - 1, e = cl((b - 1) / 2), sd = cl(b - 3);
        return (
          <span key={i} style={{ display: "inline-block", position: "relative", margin: "0 9px", padding: c.key ? "0 9px" : "0px", background: `rgba(22,35,60,${c.key ? cl(b - 3) : 0})`, fontWeight: curr && !fresh ? 700 : 300, color: curr && !fresh ? "#ffffff" : "#9a9da4", transform: `translateY(${fresh ? 7 : 0}px)`, filter: `blur(${fresh ? 5 : 0}px)`, opacity: fresh ? 0.7 : 1 }}>
            {c.key && b >= 0 ? <>
              <span style={{ position: "absolute", left: 0, top: 0, height: 2, width: `${e * 100}%`, background: BL }} />
              <span style={{ position: "absolute", left: 0, bottom: 0, height: 2, width: `${e * 100}%`, background: BL }} />
              <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: BL, opacity: sd }} />
              <span style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 2, background: BL, opacity: sd }} />
              <span style={{ position: "absolute", left: -6, top: -6, width: 12, height: 12, borderRadius: 6, background: BL }} />
              <span style={{ position: "absolute", right: -6, bottom: -6, width: 12, height: 12, borderRadius: 6, background: BL }} />
            </> : null}
            <span style={{ position: "relative" }}>{c.w}</span>
          </span>); })}
    </div>
  );
}

// ================= overlay: labels on leader lines, counters, source, notes =================
const fade = (t: number, d = 0.2) => ss(T, t, t + d);
function Overlay({ n, cam, still }: { n: number; cam: Cam; still?: boolean }) {
  const c = SETUPS[n - 1], t0 = ST[n - 1], t1 = ST[n];
  const life = still ? 1 : fade(t0 + 0.12) * (1 - ss(T, t1 - 0.2, t1 - 0.04));         // everything of a setup leaves just before the next one
  const end = n === 27 ? fade(W(179), 0.25) * (1 - sm(DUR - 0.3, DUR - 0.1)) : 0, h0 = n === 1 ? 1 - sm(ST[1] - 0.25, ST[1] - 0.05) : 0;
  return (<>
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 470, background: "linear-gradient(#0d0e11 34%, rgba(13,14,17,0))" }} />
    <div style={{ position: "absolute", left: 0, top: 1480, width: 1080, height: 440, background: "linear-gradient(rgba(13,14,17,0), #0d0e11 70%)" }} />
    {c.src ? <div style={{ position: "absolute", left: 60, top: 372, display: "flex", alignItems: "center", gap: 14, fontFamily: FF, fontSize: 27, fontWeight: 400, color: "#d6d8dc", opacity: life * fade(t0 + (n === 1 ? 0.6 : 0.2), 0.3) }}><img src={S("ecoshop_logo.jpg")} style={{ height: 32, borderRadius: 4 }} /><span>{c.src}</span></div> : null}
    {c.count ? <div style={{ position: "absolute", left: 60, top: 440, fontFamily: FF, color: "#ffffff", opacity: life * fade(c.count.t ?? t0 + 0.15), transform: `translateY(${(1 - fade(c.count.t ?? t0 + 0.15)) * 14}px)` }}><div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -2, lineHeight: 1 }}>{c.count.v()}</div><div style={{ fontSize: 30, fontWeight: 400, color: "#c9ccd2", marginTop: 4 }}>{c.count.unit}</div></div> : null}
    {(c.tags ?? []).map((g, i) => { const a = life * fade(g.t, 0.22); if (a < 0.01) return null; const q = projS(cam, g.at), ly = g.y < q.y ? g.y + (g.big ? 112 : 44) : g.y - 8, x1 = g.x + 50, d = fade(g.t, 0.3); return (
      <div key={i} style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, opacity: a }}>
        <svg style={{ position: "absolute", left: 0, top: 0 }} width={1080} height={1920}><line x1={q.x} y1={q.y} x2={lerp(q.x, x1, d)} y2={lerp(q.y, ly, d)} stroke="#ffffff" strokeWidth={2} opacity={0.75} /><circle cx={q.x} cy={q.y} r={5} fill="#ffffff" /></svg>
        <div style={{ position: "absolute", left: g.x, top: g.y, fontFamily: FF, color: "#ffffff", textShadow: "0 2px 14px rgba(0,0,0,0.9)", opacity: fade(g.t + 0.12, 0.2), transform: `translateY(${(1 - fade(g.t + 0.12, 0.2)) * 10}px)` }}>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 4 }}>{g.cap}</div>
          {g.big ? <div style={{ fontSize: 52, fontWeight: 600, letterSpacing: -0.5, marginTop: 2 }}>{g.big}</div> : null}
          {g.sub ? <div style={{ fontSize: 23, fontWeight: 400, color: "#b9bcc2", marginTop: 4 }}>{g.sub}</div> : null}
        </div>
      </div>); })}
    {n === 23 ? <div style={{ position: "absolute", left: 600, top: 1190, padding: "6px 18px", border: "3px dashed #ff3b3b", borderRadius: 10, fontFamily: FF, fontSize: 60, fontWeight: 600, color: "#ff6b6b", opacity: life * fade(W(148), 0.2), transform: `translateY(${(1 - fade(W(148), 0.2)) * 12}px)` }}>+20 sen?</div> : null}
    {c.note ? <div style={{ position: "absolute", left: 60, top: 1660, width: 900, fontFamily: FF, fontSize: 22, fontWeight: 400, color: "#8f9299", opacity: life }}>{c.note}</div> : null}
    {h0 > 0.01 ? <div style={{ position: "absolute", left: 60, top: 1330, fontFamily: FF, fontWeight: 800, fontSize: 86, lineHeight: 1.04, letterSpacing: -1.5, color: "#ffffff", textShadow: "0 2px 18px rgba(0,0,0,0.9)", opacity: h0 }}>Everything <span style={{ color: HOT }}>RM2.60.</span><br />Record profit margin.</div> : null}
    {end > 0.01 ? <div style={{ position: "absolute", left: 60, top: 1330, fontFamily: FF, fontWeight: 800, fontSize: 86, lineHeight: 1.04, letterSpacing: -1.5, color: "#ffffff", textShadow: "0 2px 18px rgba(0,0,0,0.9)", opacity: end, transform: `translateY(${(1 - end) * 14}px)` }}>Would you still go<br />at <span style={{ color: HOT }}>RM2.80?</span></div> : null}
  </>);
}
const FACE = `@font-face { font-family: "Outfit"; src: url(${S("fonts/Outfit.ttf")}); font-weight: 100 900; }`;
function Frame({ n, cam, dk, still, fast }: { n: number; cam: Cam; dk: number; still?: boolean; fast?: boolean }) {
  const d = dist3(cam.p, cam.l);
  return (
    <AbsoluteFill style={{ background: BG }}>
      <style>{FACE}</style>
      <Camera3d transform={Transform.fromXyz(cam.p[0], cam.p[1], cam.p[2]).lookingAt(cam.l as any, cam.up as any)} projection={{ Perspective: { fov: (cam.fov * Math.PI) / 180 } }}>
        <DepthOfField focal_distance={cam.fd} aperture_f_stops={cam.fs} mode="Gaussian" max_circle_of_confusion_diameter={lerp(14, 48, ss(d, 0.55, 0.95))} />
      </Camera3d>
      {fast ? <MotionBlur shutterAngle={1} samples={6} /> : null}
      <Bloom intensity={0.7} threshold={0.9} />
      <ToneMapping mode="aces" exposure={0.35} />
      <AmbientLight brightness={95} color="#b4bccb" />
      <Environment src={S("sky.hdr")} intensity={0.3} />
      <World n={n} />
      <Overlay n={n} cam={cam} still={still} />
      <Caption />
      <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: BG, opacity: dk }} />
    </AbsoluteFill>
  );
}
function Film() {
  T = (useCurrentFrame() + OFF) / RFPS;
  let k = 0; while (k < 26 && T >= ST[k + 1]) k++;
  const { cam, dark: dk, fast } = filmCam(k);
  return <Frame n={k + 1} cam={cam} dk={dk} fast={fast} />;
}
// the board: one frame per setup, at the moment its events have landed
const BT = SETUPS.map((_, k) => (k === 0 ? 0.9 : k === 26 ? W(182) + 0.5 : ST[k + 1] - 0.22));
function Board() {
  const k = useCurrentFrame(); T = BT[k];
  return <Frame n={k + 1} cam={camOf(k)} dk={0} still />;
}
registerRoot(() => <><Composition id="film" component={Film} width={1080} height={1920} fps={RFPS} durationInFrames={FRAMES} /><Composition id="board" component={Board} width={1080} height={1920} fps={FPS} durationInFrames={27} /></>);
