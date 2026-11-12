
// ================= sets =================
const CY = 0.9;
const SIGN = [0.62, CY, 0.3], BAGP = [0, CY, -0.16];
const V1 = [20, 0, 0], V2 = [-20, 0, 0], V3 = [-20, 0, -10], V4 = [-20, 0, -20], V5 = [14, 0, 0], V6 = [-40, 0, 0];
const dark = (c = "#1c1e22", r = 0.42) => <StandardMaterial base_color={c} perceptual_roughness={r} />;
function Slab({ p, half, c, r, k }: { p: number[]; half: number[]; c?: string; r?: number; k: string }) {
  return <Mesh3d key={k} transform={Transform.fromXyz(p[0], p[1] - half[1], p[2])}><Cuboid half_size={half as any} />{dark(c, r)}</Mesh3d>;
}
const RING = PRODUCTS.map((id, i) => { const a = (-150 + i * (300 / 11)) * Math.PI / 180; return { id, x: BAGP[0] + Math.sin(a) * 0.46, z: BAGP[2] + 0.02 - Math.cos(a) * -0.42, a }; });

function CounterSet({ n }: { n: number }) {
  const P: any[] = [];
  P.push(<Slab key="ct" k="ct" p={[0.6, CY, 0]} half={[3.2, 0.02, 1.1]} />);
  P.push(<Slab key="fl" k="fl" p={[0, 0, 0]} half={[9, 0.02, 7]} c="#101114" r={0.6} />);
  P.push(<Mesh3d key="bw" transform={Transform.fromXyz(0, 1.5, -2.6)}><Cuboid half_size={[9, 2.2, 0.02]} />{dark("#15161a", 0.9)}</Mesh3d>);
  // a dim shelf run behind for depth (blurred)
  for (let i = 0; i < 18; i++) for (const y of [0.55, 1.0, 1.45]) P.push(<Product key={"bg" + i + y} k={"bg" + i + y} id={PRODUCTS[(i * 5 + Math.round(y * 7)) % 12]} p={[-2.6 + i * 0.3, y, -2.3]} ry={rnd(i + y) - 0.5} tone={(i + Math.round(y * 3)) % 5} />);
  for (const y of [0.55, 1.0, 1.45]) { P.push(<Slab key={"bs" + y} k={"bs" + y} p={[0, y, -2.3]} half={[3, 0.012, 0.2]} c="#24262b" />); P.push(<Mesh3d key={"bl" + y} transform={Transform.fromXyz(0, y - 0.025, -2.095)}><Cuboid half_size={[3, 0.012, 0.003]} /><StandardMaterial base_color="#3a0c10" emissive={glow(RED, 0.5)} /></Mesh3d>); }
  const xr = n === 2;
  if ([1, 2, 3, 4, 17, 18, 19, 23, 27].includes(n)) P.push(<Bag key="bag" p={BAGP} xray={xr} />);
  if (xr) { PRODUCTS.forEach((id, i) => P.push(<Product key={"in" + i} k={"in" + i} id={id} p={[BAGP[0] - 0.17 + (i % 4) * 0.11, CY + 0.01 + Math.floor(i / 4) * 0.115, BAGP[2] + (rnd(i) - 0.5) * 0.06]} sc={0.42} ry={i} tone={3} />)); }
  if (n === 3 || n === 4) RING.forEach((r, i) => { P.push(<Product key={"rg" + i} k={"rg" + i} id={r.id} p={[r.x, CY, r.z]} ry={-r.a} tone={i} sc={0.8} />); P.push(<Card key={"tg" + i} k={"tg" + i} p={[r.x + Math.sin(r.a) * 0.13, CY + 0.0025, r.z + Math.cos(r.a) * 0.13 * (r.z > BAGP[2] ? 1 : -1)]} size={[0.075, 0.05]} tex="tag" rx={-Math.PI / 2} ry={-r.a} em={0.5} />); });
  if (n === 4) { const r = RING[2]; P.push(<Card key="tgs" k="tgs" p={[r.x - 0.02, CY + 0.032, r.z + 0.17]} size={[0.09, 0.06]} tex="tag" rx={-0.25} ry={0.6} em={0.7} />); P.push(<Coins key="c4" k="c4" p={[r.x + 0.075, CY, r.z + 0.2]} n={14} hot={5} />); }
  const price = n === 19 ? "2.40" : n === 23 ? "2.??" : "2.60";
  P.push(<Sign key="sg" p={SIGN} price={price} />);
  if (n === 19) { P.push(<Card key="cal" k="cal" p={[SIGN[0] - 0.31, CY + 0.13, 0.27]} size={[0.24, 0.24]} tex="calendar" rx={-0.2} ry={0.25} em={0.25} />); P.push(<Mesh3d key="calb" transform={Transform.fromXyz(SIGN[0] - 0.315, CY + 0.12, 0.25).withRotation(Quat.fromEuler("YXZ", 0.25, -0.2, 0))}><Cuboid half_size={[0.125, 0.125, 0.004]} />{dark("#101114")}</Mesh3d>); }
  if (n === 20) P.push(<Card key="pay" k="pay" p={[1.25, CY + 0.002, 0.3]} size={[0.21, 0.225]} tex="payslip" rx={-Math.PI / 2} ry={0.18} />);
  if (n === 21) { P.push(<Card key="fx" k="fx" p={[1.8, CY + 0.09, 0.1]} size={[0.3, 0.15]} tex="fx" rx={-0.1} ry={-0.2} em={0.8} />); P.push(<Mesh3d key="fxb" transform={Transform.fromXyz(1.805, CY + 0.09, 0.085).withRotation(Quat.fromEuler("YXZ", -0.2, -0.1, 0))}><Cuboid half_size={[0.165, 0.09, 0.012]} />{dark("#131417")}</Mesh3d>); }
  if (n === 22) P.push(<Card key="note" k="note" p={[2.4, CY + 0.002, 0.3]} size={[0.21, 0.297]} tex="note" rx={-Math.PI / 2} ry={-0.12} />);
  return <>{P}</>;
}
function CounterLights({ n }: { n: number }) {
  const spot = n === 20 ? [1.25, 0.3] : n === 22 ? [2.4, 0.3] : null;
  return (<>
    <RectLight transform={Transform.fromXyz(0.1, CY + 1.1, 0.4).lookingAt([0.05, CY, 0.05])} intensity={spot ? 9000 : 46000} width={1.6} height={1.0} color="#fff3e2" range={5} />
    <SpotLight transform={Transform.fromXyz(0.6, CY + 1.0, 0.9).lookingAt([0.0, CY + 0.1, 0.1])} intensity={spot ? 2000 : 15000} outer_angle={0.6} inner_angle={0.1} color="#fff1dc" shadow_maps_enabled range={5} />
    <RectLight transform={Transform.fromXyz(0, 2.6, -1.2).lookingAt([0, 1.0, -2.3])} intensity={11000} width={5} height={0.5} color="#aebbd4" range={6} />
    {spot ? <SpotLight transform={Transform.fromXyz(spot[0] + 0.25, CY + 0.7, spot[1] + 0.2).lookingAt([spot[0], CY, spot[1] - 0.02])} intensity={30000} outer_angle={0.2} inner_angle={0.08} color="#fff3e2" shadow_maps_enabled range={3} /> : null}
    {n === 21 ? <RectLight transform={Transform.fromXyz(1.8, CY + 0.8, 0.7).lookingAt([1.8, CY + 0.08, 0.1])} intensity={22000} width={0.6} height={0.4} color="#fff3e2" range={3} /> : null}
        <RectLight transform={Transform.fromXyz(SIGN[0] + 0.1, CY + 0.9, SIGN[2] + 0.5).lookingAt([SIGN[0], CY + 0.05, SIGN[2]])} intensity={spot || n === 21 ? 2000 : 14000} width={0.7} height={0.5} color="#fff3e2" range={3} />
    {n === 2 ? <PointLight transform={Transform.fromXyz(BAGP[0], CY + 0.2, BAGP[2])} intensity={5200} color={HOT} range={0.7} /> : null}
  </>);
}
function Void({ o, children, key2, hi = false, dim = 1, spill }: { o: number[]; children?: any; key2: string; hi?: boolean; dim?: number; spill?: number[] }) {
  return (<>
    <Slab k={key2 + "f"} p={[o[0], 0, o[2]]} half={[6, 0.02, 6]} c="#2a2c31" r={0.32} />
    {spill ? <PointLight transform={Transform.fromXyz(spill[0], spill[1], spill[2])} intensity={spill[3] ?? 500} color={HOT} range={0.6} /> : null}
    {hi ? <DirectionalLight transform={Transform.fromXyz(o[0] + 2, 8, o[2] + 4).lookingAt([o[0], 0, o[2]])} illuminance={2400} color="#fff3e2" shadow_maps_enabled soft_shadow_size={3} /> : <RectLight transform={Transform.fromXyz(o[0] + 0.15, 1.3, o[2] + 0.5).lookingAt([o[0], 0, o[2]])} intensity={52000 * dim} width={1.6} height={1.0} color="#fff3e2" range={5} />}
    <SpotLight transform={Transform.fromXyz(o[0] + 0.7, 1.1, o[2] + 0.9).lookingAt([o[0], 0.05, o[2]])} intensity={hi ? 0 : 15000 * dim} outer_angle={0.6} inner_angle={0.1} color="#fff1dc" shadow_maps_enabled range={5} />
    {children}
  </>);
}
// a gondola: shelves both sides, neutral products, a red lip line on every shelf
const LV = [0.32, 0.72, 1.12, 1.52];
function Gondola({ x, k, full, lip }: { x: number; k: string; full: boolean; lip: number }) {
  const P: any[] = []; const Z0 = -24, Z1 = -16.6;
  P.push(<Mesh3d key={k + "sp"} transform={Transform.fromXyz(x, 0.95, (Z0 + Z1) / 2)}><Cuboid half_size={[0.02, 0.95, (Z1 - Z0) / 2]} />{dark("#1a1b1f", 0.6)}</Mesh3d>);
  P.push(<Mesh3d key={k + "cap"} transform={Transform.fromXyz(x, 0.95, Z1 + 0.02)}><Cuboid half_size={[0.45, 0.95, 0.02]} />{dark("#1a1b1f", 0.6)}</Mesh3d>);
  for (const sd of [-1, 1]) for (const [j, y] of LV.entries()) {
    P.push(<Mesh3d key={k + sd + "b" + j} transform={Transform.fromXyz(x + sd * 0.235, y - 0.012, (Z0 + Z1) / 2)}><Cuboid half_size={[0.215, 0.012, (Z1 - Z0) / 2]} />{dark("#26282d", 0.45)}</Mesh3d>);
    P.push(<Mesh3d key={k + sd + "l" + j} transform={Transform.fromXyz(x + sd * 0.452, y - 0.024, (Z0 + Z1) / 2)}><Cuboid half_size={[0.003, 0.013, (Z1 - Z0) / 2]} /><StandardMaterial base_color="#3a0c10" emissive={glow(HOT, lip)} /></Mesh3d>);
    if (!full && j < 3) continue;
    for (let z = Z0 + 0.2, i = 0; z < Z1 - 0.1; z += 0.3, i++) {
      const id = PRODUCTS[(i * 7 + j * 3 + (sd > 0 ? 5 : 0) + Math.round(x * 3) + 120) % 12];
      P.push(<Product key={k + sd + "p" + j + "_" + i} k={k + sd + "p" + j + "_" + i} id={id} p={[x + sd * 0.27, y, z + (rnd(i * 3 + j) - 0.5) * 0.04]} ry={sd * Math.PI / 2 + (rnd(i + j * 9) - 0.5) * 0.4} tone={(i + j) % 5} sc={id === "multi_cleaner_5_litre" ? 0.8 : 0.9} />);
    }
  }
  return <>{P}</>;
}
const HEROSHELF = [0.63, LV[2], -17.35];
function StoreSet({ n }: { n: number }) {
  const lip = n === 24 || n === 25 ? 3.2 : 0.35, top = false;
  const P: any[] = [<Slab key="sf" k="sf" p={[0, 0, -20]} half={[7, 0.02, 6]} c="#15161a" r={0.35} />];
  for (const x of top ? [-2.7, -0.9, 0.9, 2.7] : [-0.9, 0.9]) P.push(<Gondola key={"g" + x} k={"g" + x} x={x} full={!top} lip={lip} />);
  if (n === 7 || n === 8 || n === 25) { P.push(<Bottle key="hb" k="hb" p={HEROSHELF} ry={-Math.PI / 2 + 0.25} />); P.push(<Sign key="hs" k="hs" p={[HEROSHELF[0] - 0.19, HEROSHELF[1] - 0.085, HEROSHELF[2]]} ry={-Math.PI / 2} sc={0.42} tilt={0} />); }
  if (n === 12) for (let i = 0; i < 10; i++) if ((i * 7) % 10 < 6) P.push(<Mesh3d key={"st" + i} name={"st" + i} transform={Transform.fromXyz(0.9 - 0.455, LV[2] - 0.024, -19.9 + i * 0.3 + 0.2).withRotation(rotY(-Math.PI / 2))}><Cuboid half_size={[0.12, 0.014, 0.002]} /><StandardMaterial base_color={RED} emissive={glow(HOT, 4)} /></Mesh3d>);
  return (<>
    {P}
    {top ? <DirectionalLight transform={Transform.fromXyz(5, 9, -13).lookingAt([0, 0, -20.3])} illuminance={2200} color="#dfe6f2" shadow_maps_enabled soft_shadow_size={3} />
      : [-23, -20.5, -18, -16].map((z) => <RectLight key={"sl" + z} transform={Transform.fromXyz(0, 2.5, z).lookingAt([0, 0, z - 0.01])} intensity={n === 24 ? 30000 : 42000} width={0.5} height={1.6} color="#dfe6f2" range={5} />)}
    {n === 7 || n === 8 ? <SpotLight transform={Transform.fromXyz(0.1, 1.9, -17.1).lookingAt(HEROSHELF as any)} intensity={26000} outer_angle={0.28} inner_angle={0.08} color="#fff3e2" shadow_maps_enabled range={4} /> : null}
  </>);
}
function QuaySet() {
  const P: any[] = [<Slab key="qf" k="qf" p={[V5[0], 0, 0]} half={[14, 0.02, 12]} c="#16171b" r={0.5} />];
  P.push(<Mesh3d key="cs" shape={so().shell} transform={Transform.fromXyz(V5[0], 0, 0)}><StandardMaterial base_color="#a8232c" perceptual_roughness={0.6} /></Mesh3d>);
  P.push(<Mesh3d key="cc" shape={so().corr} transform={Transform.fromXyz(V5[0], 0, 0)}><StandardMaterial base_color="#8f1d25" perceptual_roughness={0.6} /></Mesh3d>);
  P.push(<Card key="lg" k="lg" p={[V5[0], 1.9, 1.262]} size={[2.6, 0.406]} tex="band" em={0.7} />);
  let i = 0;
  for (let lv = 0; lv < 3; lv++) for (let a = 0; a < 9; a++) { i++; const x = V5[0] + 3.5 + (a % 3) * 0.62 + lv * 0.25 + (rnd(i) - 0.5) * 0.1, z = -0.7 + Math.floor(a / 3) * 0.62 + (rnd(i * 3) - 0.5) * 0.1; if (lv > 0 && rnd(i * 5) > 0.6 - lv * 0.2) continue;
    P.push(<Model key={"qb" + i} src={S("cardboard_box_01/cardboard_box_01.gltf")} position={[x, lv * 0.4, z]} rotation={[0, (rnd(i * 7) - 0.5) * 0.5, 0]} scale={[1.25, 1.25, 1.25]}><StandardMaterial base_color="#cfd6e2" /></Model>); }
  P.push(<Model key="qhero" src={S("cardboard_box_01/cardboard_box_01.gltf")} position={[V5[0] + 5.6, 0, 2.2]} rotation={[0, 0.5, 0]} scale={[1.5, 1.5, 1.5]}><StandardMaterial base_color="#cfd6e2" /></Model>);
  P.push(<Mesh3d key="qlab" transform={Transform.fromXyz(V5[0] + 5.6, 0.3, 2.2).withRotation(rotY(0.5))}><Cuboid half_size={[0.2, 0.07, 0.33]} /><StandardMaterial base_color={RED} emissive={glow(HOT, 1.6)} /></Mesh3d>);
  return (<>{P}
    <DirectionalLight transform={Transform.fromXyz(V5[0] + 8, 9, 7).lookingAt([V5[0] + 3, 0, 0])} illuminance={3200} color="#fff3e2" shadow_maps_enabled soft_shadow_size={3} />
    <PointLight transform={Transform.fromXyz(V5[0] + 6.8, 1.8, 3.9)} intensity={520000} color="#fff3e2" range={8} />
    <PointLight transform={Transform.fromXyz(V5[0] + 6, 2.5, 5)} intensity={3000000} color="#aebbd4" range={30} />
  </>);
}
const MX = (lon: number) => V6[0] + (lon - 109.5) * 0.1, MZ = (lat: number) => -(lat - 4.2) * 0.1;
function MapSet({ lit, flip }: { lit: number; flip: number }) {
  const D = (MAP as any).dots as number[][], B = (MAP as any).border as number[][], P: any[] = [<Slab key="mf" k="mf" p={[V6[0], 0, 0]} half={[5, 0.02, 4]} c="#25272c" r={0.35} />];
  B.forEach((b, i) => P.push(<Mesh3d key={"mb" + i} transform={Transform.fromXyz(MX(b[0]), 0.001, MZ(b[1]))}><Cuboid half_size={[0.0035, 0.001, 0.0035]} /><StandardMaterial base_color="#4a4d54" emissive={glow("#aab0bb", 1.6)} /></Mesh3d>));
  D.forEach((d, i) => { const u = (d[0] - 99.6) / 19.8, on = u <= lit, fl = u <= flip;
    P.push(<Mesh3d key={"md" + i + (on ? "a" : "") + (fl ? "f" : "")} name={"md" + i + (on ? "a" : "") + (fl ? "f" : "")} transform={Transform.fromXyz(MX(d[0]), 0.004, MZ(d[1]))}><Cylinder radius={0.0075} half_height={0.004} />
      <StandardMaterial base_color={on ? RED : "#6a6d75"} emissive={fl ? glow("#ffffff", 3.5) : on ? glow(HOT, 3.2) : glow("#8a8f99", 0.7)} /></Mesh3d>); });
  return (<>{P}<RectLight transform={Transform.fromXyz(V6[0], 2.2, 1.2).lookingAt([V6[0], 0, 0])} intensity={90000} width={3} height={1.5} color="#dfe6f2" range={7} /></>);
}

// ================= the 27 setups =================
type Tag = { at: number[]; x: number; y: number; cap: string; big?: string; sub?: string };
type Setup = { p: number[]; l: number[]; fov?: number; f?: number; fs?: number; up?: number[]; cap: [string, number]; tags?: Tag[]; count?: [string, string]; note?: string; src?: string; ghost?: string; h0?: boolean; end?: boolean };
const SG = [SIGN[0], CY + 0.05, SIGN[2]];
const fromT = (l: number[], dir: number[], d: number) => { const k = Math.hypot(dir[0], dir[1], dir[2]); return [l[0] + (dir[0] / k) * d, l[1] + (dir[1] / k) * d, l[2] + (dir[2] / k) * d]; };
const R9 = RING[2], T4 = [R9.x + 0.03, CY + 0.05, R9.z + 0.16];
const SETUPS: Setup[] = [
  /* 1 */ { p: fromT(SG, [0.12, 0.06, 1], 1.1), l: SG, fov: 26, fs: 2.8, cap: ["*Eco-Shop sells", 0], src: "FY2026 results · The Edge, 14 Aug 2026", h0: true },
  /* 2 */ { p: fromT([0, 1.1, -0.16], [0.12, 0.05, 1], 2.15), l: [0, 1.1, -0.16], fov: 30, fs: 2, cap: ["almost *everything", 1], tags: [{ at: [-0.2, 1.25, -0.08], x: 70, y: 480, cap: "INSIDE THE BAG", big: "12 kinds of product", sub: "an illustration" }] },
  /* 3 */ { p: [0.0, 4.25, 0.5], l: [0, CY, -0.1], fov: 34, fs: 8, cap: ["for *RM2.60,", 1], count: ["12", "items, one price"], note: "products are neutral models, not Eco-Shop stock" },
  /* 4 */ { p: fromT(T4, [-0.45, 0.16, 0.85], 1.25), l: T4, fov: 26, fs: 2.4, cap: ["more *money per item.", 1], tags: [{ at: [R9.x + 0.075, CY + 0.034, R9.z + 0.2], x: 70, y: 1400, cap: "PER ITEM", big: "more than ever" }] },
  /* 5 */ { p: fromT([20, 0.045, 0], [0.06, 0.26, 1], 1.0), l: [20, 0.045, 0], fov: 26, fs: 4, cap: ["a record *33%,", 2], count: ["33.3%", "gross margin, FY2026"], tags: [{ at: [19.93, 0.046, 0], x: 70, y: 1400, cap: "FY2022", big: "19.6%" }, { at: [20.07, 0.075, 0], x: 640, y: 640, cap: "FY2026", big: "33.3%", sub: "one coin = one point of margin" }], src: "The Edge, 14 Aug 2026" },
  /* 6 */ { p: [19.6, 0.03, 0.44], l: [20.0, 0.04, 0.0], fov: 30, fs: 16, up: [0.2, 1, 0], cap: ["just *four years ago.", 1], tags: [{ at: [19.93, 0.046, 0], x: 70, y: 640, cap: "FY2022", big: "19.6%" }, { at: [20.07, 0.075, 0], x: 620, y: 640, cap: "FY2026", big: "33.3%" }] },
  /* 7 */ { p: [-0.32, 1.3, -15.6], l: [0.5, 1.2, -17.35], fov: 30, fs: 2, cap: ["one *bottle on that shelf.", 1], note: "an illustration: the bottle and its label are ours" },
  /* 8 */ { p: fromT([0.45, 1.06, -17.35], [-1, 0.05, 0.32], 0.56), l: [0.45, 1.06, -17.35], fov: 26, fs: 2.8, cap: ["You pay *RM2.60.", 2], tags: [{ at: [0.45, 1.075, -17.35], x: 70, y: 1400, cap: "SHELF PRICE", big: "RM2.60" }] },
  /* 9 */ { p: fromT([-20, 0.2, 0], [0.4, 0.55, 0.75], 1.55), l: [-20, 0.2, 0], fov: 26, fs: 5.6, cap: ["about *87 sen", 1], count: ["87 sen", "stays with Eco-Shop (average)"], tags: [{ at: [-20, 0.1, 0.03], x: 640, y: 1330, cap: "26 SLICES", big: "10 sen each" }], note: "33.3% gross margin × RM2.60 = about 87 sen, a company-wide average" },
  /* 10 */ { p: [-19.78, 0.2, 0.52], l: [-20, 0.262, 0], fov: 26, fs: 5.6, up: [-0.22, 1, 0], cap: ["before rent and *wages.", 3], tags: [{ at: [-19.965, 0.33, 0], x: 70, y: 620, cap: "STAYS", big: "about 87 sen" }, { at: [-19.965, 0.19, 0], x: 600, y: 1400, cap: "COST OF THE GOODS", big: "about RM1.73" }] },
  /* 11 */ { p: fromT([-20, 0.078, -10], [0.22, 0.03, 1], 0.4), l: [-20, 0.078, -10], fov: 26, fs: 4, up: [-0.16, 1, 0], cap: ["Look at the *label.", 3], note: "illustrative label, not a real product" },
  /* 12 */ { p: [-0.36, 1.42, -17.5], l: [0.45, 1.1, -19.2], fov: 30, fs: 2.8, cap: ["It's Eco-Shop's *own.", 2], tags: [{ at: [0.44, 1.1, -19.1], x: 70, y: 1400, cap: "HOUSE BRAND", sub: "shelf is an illustration" }] },
  /* 13 */ { p: [-20.0, 4.3, -19.45], l: [-20, 0, -20], fov: 26, fs: 8, cap: ["now *60% of its sales,", 1], count: ["60%", "of sales are house brands, FY2026"], src: "The Edge, 14 Aug 2026" },
  /* 14 */ { p: fromT([-20, 0.06, -19.72], [0.1, 0.2, 1], 1.5), l: [-20, 0.06, -19.72], fov: 26, fs: 4, cap: ["they earn Eco-Shop *more", 3], tags: [{ at: [-20.07, 0.045, -19.7], x: 70, y: 1400, cap: "HOUSE BRAND", big: "higher margin", sub: "as the company describes it" }, { at: [-19.94, 0.026, -19.7], x: 620, y: 1400, cap: "A NAME YOU KNOW" }], note: "stack heights are not data" },
  /* 15 */ { p: [V5[0] + 7.6, 1.5, 4.9], l: [V5[0] + 5.3, 0.55, 1.9], fov: 30, fs: 2.8, cap: ["come from *China,", 2], count: ["65%+", "of products sourced from China"], src: "The Edge, 14 Aug 2026" },
  /* 16 */ { p: [-40.0, 6.2, 0.3], l: [-40.0, 0.0, 0.0], up: [-0.64, 0, -0.77], fov: 34, fs: 11, cap: ["for *462 stores at once.", 1], count: ["277", "of 462 stores"], note: "dot positions are illustrative" },
  /* 17 */ { p: [SIGN[0] - 0.42, 0.935, SIGN[2] + 0.3], l: [SIGN[0] + 0.02, 0.955, SIGN[2] + 0.01], fov: 26, fs: 2.4, cap: ["the sign *doesn't say.", 2] },
  /* 18 */ { p: [SIGN[0], 0.955, SIGN[2] + 1.34], l: [SIGN[0], 0.95, SIGN[2]], fov: 16, fs: 4, cap: ["Fixed doesn't mean *forever.", 3] },
  /* 19 */ { p: [SIGN[0] - 0.2, 1.08, SIGN[2] + 2.05], l: [SIGN[0] - 0.2, 1.0, SIGN[2]], fov: 30, fs: 2.8, cap: ["it was *RM2.40.", 2], tags: [{ at: [SIGN[0] - 0.31, 1.1, 0.28], x: 70, y: 1400, cap: "UNTIL", big: "14 April 2025" }], src: "The Edge, 29 Apr 2025" },
  /* 20 */ { p: [1.38, 1.56, 0.98], l: [1.25, CY, 0.3], fov: 26, fs: 4, up: [0.22, 1, 0], cap: ["rising to *RM2,000,", 2], note: "payslip is an illustration", src: "The Star, 29 Oct 2026" },
  /* 21 */ { p: [1.43, 1.08, 1.52], l: [1.8, 0.99, 0.1], fov: 26, fs: 2.8, cap: ["the Chinese *yuan", 2], tags: [{ at: [1.8, 1.068, 0.1], x: 70, y: 600, cap: "YUAN VS RINGGIT", big: "stronger" }], note: "direction only; no rate is quoted" },
  /* 22 */ { p: [2.62, 1.32, 0.88], l: [2.4, CY, 0.29], fov: 26, fs: 4, up: [-0.12, 1, 0], cap: ["to *move again", 1], note: "a summary of analyst notes as reported, not the original document", src: "The Star, 29 Oct 2026" },
  /* 23 */ { p: fromT(SG, [0.2, 0.07, 1], 1.2), l: SG, fov: 26, fs: 2.8, cap: ["pencilled in *20 sen.", 2], ghost: "+20 sen?", tags: [{ at: [SIGN[0] + 0.05, CY + 0.045, SIGN[2]], x: 70, y: 1420, cap: "ONE ANALYST'S FORECAST", sub: "not announced by Eco-Shop" }] },
  /* 24 */ { p: [0.0, 1.38, -14.7], l: [0, 1.08, -20], fov: 34, fs: 4, cap: ["The *promise is.", 1] },
  /* 25 */ { p: [0.0, 3.6, -14.0], l: [0, 0.8, -19.0], fov: 34, fs: 5.6, cap: ["on *every shelf,", 1], count: ["1", "number, on every shelf"] },
  /* 26 */ { p: [-41.25, 2.7, 2.0], l: [-40.55, 0.0, -0.05], fov: 34, fs: 8, cap: ["that number *changes,", 2], count: ["462", "stores"], note: "dot positions are illustrative" },
  /* 27 */ { p: fromT(SG, [0.12, 0.06, 1], 1.1), l: SG, fov: 26, fs: 2.8, cap: ["Would you still go at *RM2.80?", 5], end: true },
];
const dist3 = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
function World({ n }: { n: number }) {
  if ([1, 2, 3, 4, 17, 18, 19, 20, 21, 22, 23, 27].includes(n)) return <><CounterSet n={n} /><CounterLights n={n} /></>;
  if (n === 5 || n === 6) return <Void o={V1} key2="v1" spill={[20.07, 0.12, 0.1, 90]}><Coins k="m22" p={[19.93, 0, 0]} n={20} /><Coins k="m24" p={[20.0, 0, 0]} n={26} /><Coins k="m26" p={[20.07, 0, 0]} n={33} hot={13} /></Void>;
  if ([7, 8, 12, 24, 25].includes(n)) return <StoreSet n={n} />;
  if (n === 9 || n === 10) return <Void o={V2} key2="v2" spill={[-19.9, 0.2, 0.12, 900]}><Sliced p={[-20, 0, 0]} gap={0.0032} lift={0.035} /></Void>;
  if (n === 11) return <Void o={V3} key2="v3" dim={0.5}><Bottle p={[-20, 0, -10]} ry={0.1} /></Void>;
  if (n === 13 || n === 14) { const P: any[] = [];
    if (n === 13) for (let i = 0; i < 10; i++) { const x = -20 + (i % 5 - 2) * 0.2, z = -20 + (i < 5 ? -0.14 : 0.14), house = (i * 7) % 10 < 6; P.push(<Product key={"t" + i} k={"t" + i} id={PRODUCTS[(i * 5 + 2) % 12]} p={[x, 0, z]} ry={i} tone={i} sc={0.75} />);
      if (house) P.push(<Mesh3d key={"td" + i} transform={Transform.fromXyz(x, 0.002, z)}><Cylinder radius={0.07} half_height={0.002} /><StandardMaterial base_color={RED} emissive={glow(HOT, 2.6)} /></Mesh3d>); }
    if (n === 14) { P.push(<Bottle key="b14" k="b14" p={[-20.16, 0, -19.74]} ry={0.3} />); P.push(<Coins key="ch" k="ch" p={[-20.07, 0, -19.7]} n={18} hot={18} />); P.push(<Product key="p14" k="p14" id="bleach_bottle" p={[-19.84, 0, -19.74]} ry={-0.4} tone={2} sc={0.85} />); P.push(<Coins key="ck" k="ck" p={[-19.94, 0, -19.7]} n={11} />); }
    return <Void o={V4} key2="v4" hi={n === 13} spill={n === 14 ? [-20.07, 0.12, -19.6, 90] : undefined}>{P}</Void>; }
  if (n === 15) return <QuaySet />;
  return <MapSet lit={n === 16 ? 0.6 : 1} flip={n === 26 ? 0.12 : 0} />;
}
const FF = "Outfit, Inter, 'Helvetica Neue', Arial, sans-serif";
const projS = (c: Setup, w: number[]) => {
  const sub = (a: number[], b: number[]) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a: number[], b: number[]) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const nrm = (a: number[]) => { const k = Math.hypot(a[0], a[1], a[2]); return [a[0] / k, a[1] / k, a[2] / k]; };
  const fw = nrm(sub(c.l, c.p)), rt = nrm(cross(fw, c.up ?? [0, 1, 0])), up = cross(rt, fw), d = sub(w, c.p), z = dot(d, fw), k = 960 / Math.tan(((c.fov ?? 30) * Math.PI) / 360);
  return { x: 540 + (dot(d, rt) / z) * k, y: 960 - (dot(d, up) / z) * k };
};
function Caption({ text, bold }: { text: string; bold: number }) {
  const ws = text.split(" ");
  return (
    <div style={{ position: "absolute", top: 172, left: 70, width: 940, textAlign: "center", fontFamily: FF, fontSize: 66, lineHeight: 1.2, letterSpacing: -0.5 }}>
      {ws.map((w0, i) => { const key = w0.startsWith("*"), w = w0.replace("*", ""); return (
        <span key={i} style={{ display: "inline-block", position: "relative", margin: "0 9px", padding: key ? "0 9px" : 0, fontWeight: i === bold ? 700 : 300, color: i === bold ? "#ffffff" : "#9a9da4", border: key ? "2px solid #4f8df7" : "none", background: key ? "#16233c" : "transparent" }}>
          {w}
          {key ? <span style={{ position: "absolute", left: -8, top: -8, width: 12, height: 12, borderRadius: 6, background: "#4f8df7" }} /> : null}
          {key ? <span style={{ position: "absolute", right: -8, bottom: -8, width: 12, height: 12, borderRadius: 6, background: "#4f8df7" }} /> : null}
        </span>); })}
    </div>
  );
}
function Board() {
  const n = useCurrentFrame() + 1, c = SETUPS[n - 1];
  let tr = Transform.fromXyz(c.p[0], c.p[1], c.p[2]).lookingAt(c.l as any, (c.up ?? [0, 1, 0]) as any);
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Camera3d transform={tr} projection={{ Perspective: { fov: ((c.fov ?? 30) * Math.PI) / 180 } }}>
        <DepthOfField focal_distance={c.f ?? dist3(c.p, c.l)} aperture_f_stops={c.fs ?? 2.4} mode="Gaussian" max_circle_of_confusion_diameter={dist3(c.p, c.l) < 0.7 ? 14 : 48} />
      </Camera3d>
      <Bloom intensity={0.7} threshold={0.9} />
      <ToneMapping mode="aces" exposure={0.35} />
      <AmbientLight brightness={75} color="#b4bccb" />
      <Environment src={S("sky.hdr")} intensity={0.22} />
      <World n={n} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 470, background: "linear-gradient(#0d0e11 34%, rgba(13,14,17,0))" }} />
      <div style={{ position: "absolute", left: 0, top: 1480, width: 1080, height: 440, background: "linear-gradient(rgba(13,14,17,0), #0d0e11 70%)" }} />
      {c.end ? null : <Caption text={c.cap[0]} bold={c.cap[1]} />}
      {c.src ? <div style={{ position: "absolute", left: 60, top: 372, display: "flex", alignItems: "center", gap: 14, fontFamily: FF, fontSize: 27, fontWeight: 400, color: "#d6d8dc" }}><img src={S("ecoshop_logo.jpg")} style={{ height: 32, borderRadius: 4 }} /><span>{c.src}</span></div> : null}
      {c.count ? <div style={{ position: "absolute", left: 60, top: 440, fontFamily: FF, color: "#ffffff" }}><div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -2, lineHeight: 1 }}>{c.count[0]}</div><div style={{ fontSize: 30, fontWeight: 400, color: "#c9ccd2", marginTop: 4 }}>{c.count[1]}</div></div> : null}
      {(c.tags ?? []).map((g, i) => { const q = projS(c, g.at), ly = g.y < q.y ? g.y + (g.big ? 112 : 44) : g.y - 8; return (
        <div key={i} style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920 }}>
          <svg style={{ position: "absolute", left: 0, top: 0 }} width={1080} height={1920}><line x1={g.x + 50} y1={ly} x2={q.x} y2={q.y} stroke="#ffffff" strokeWidth={2} opacity={0.75} /><circle cx={q.x} cy={q.y} r={5} fill="#ffffff" /></svg>
          <div style={{ position: "absolute", left: g.x, top: g.y, fontFamily: FF, color: "#ffffff", textShadow: "0 2px 14px rgba(0,0,0,0.9)" }}>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 4 }}>{g.cap}</div>
            {g.big ? <div style={{ fontSize: 52, fontWeight: 600, letterSpacing: -0.5, marginTop: 2 }}>{g.big}</div> : null}
            {g.sub ? <div style={{ fontSize: 23, fontWeight: 400, color: "#b9bcc2", marginTop: 4 }}>{g.sub}</div> : null}
          </div>
        </div>); })}
      {c.ghost ? <div style={{ position: "absolute", left: 600, top: 1190, padding: "6px 18px", border: "3px dashed #ff3b3b", borderRadius: 10, fontFamily: FF, fontSize: 60, fontWeight: 600, color: "#ff6b6b" }}>{c.ghost}</div> : null}
      {c.note ? <div style={{ position: "absolute", left: 60, top: 1660, width: 900, fontFamily: FF, fontSize: 22, fontWeight: 400, color: "#8f9299" }}>{c.note}</div> : null}
      {c.h0 ? <div style={{ position: "absolute", left: 60, top: 1330, fontFamily: FF, fontWeight: 800, fontSize: 86, lineHeight: 1.04, letterSpacing: -1.5, color: "#ffffff", textShadow: "0 2px 18px rgba(0,0,0,0.9)" }}>Everything <span style={{ color: HOT }}>RM2.60.</span><br />Record profit margin.</div> : null}
      {c.end ? <div style={{ position: "absolute", left: 0, top: 150, width: 1080, textAlign: "center", fontFamily: FF, fontWeight: 800, fontSize: 74, lineHeight: 1.1, letterSpacing: -1, color: "#ffffff" }}>Would you still go<br />at <span style={{ color: HOT }}>RM2.80?</span></div> : null}
    </AbsoluteFill>
  );
}
registerRoot(() => <Composition id="board" component={Board} width={1080} height={1920} fps={30} durationInFrames={27} />);
