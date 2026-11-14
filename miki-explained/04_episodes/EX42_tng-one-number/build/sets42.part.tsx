// ================= sets (EX42: Touch 'n Go, one number — RM43). Style C painted night; brand surfaces in the "ui" pass =================
const BLUE = "#2b5ba8", BLUEH = "#4f86e8";
// the kopitiam table: marble round top, the phone, the card, the flap sign, coins, the fund jar, 365 day tiles round the rim
const VT = [300, 0, 3.4], TY = 0.75, TR = 0.46;
const TX0 = (x: number, y = TY, z = 0) => [VT[0] + x, y, VT[2] + z];
const PHN = TX0(0, TY + 0.006, 0.04), CARD = TX0(0.16, TY + 0.0015, 0.1), SGN = TX0(-0.06, TY, -0.22), JAR = TX0(0.24, TY, -0.12);
const LAND = [TX0(-0.17, TY + 0.0015, 0.26), TX0(0, TY + 0.0015, 0.3), TX0(0.17, TY + 0.0015, 0.26)];
function Coin({ p, k, s = 1 }: { p: number[]; k: string; s?: number }) {        // the street kit's sen coin: reeded edge, raised rim, the flower
  const c = 0.027 * s;
  return <Mesh3d key={k} name={k} shape={sob().coin} transform={Transform.fromXyz(p[0], p[1] + 0.0019 * s, p[2]).withRotation(Quat.fromEuler("XYZ", -Math.PI / 2, 0, 0)).withScale([c, c, c])}><StandardMaterial base_color="#d6c48a" metallic={0.7} perceptual_roughness={0.3} /></Mesh3d>;
}
function Phone({ p, scr, k, ry = 0.2 }: { p: number[]; scr: string; k: string; ry?: number }) {
  return (<Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromEuler("YXZ", ry, -Math.PI / 2, 0))}>
    <Mesh3d name={k + "b"}><Cuboid half_size={[0.038, 0.078, 0.004]} /><StandardMaterial base_color="#16171b" metallic={0.4} perceptual_roughness={0.3} /></Mesh3d>
    <Entity pass="ui" transform={Transform.fromXyz(0, 0, 0)}><Card unlit k={k + scr} p={[0, 0, 0.0042]} size={[0.068, 0.145]} tex={scr} em={1.0} /></Entity>
  </Entity>);
}
function TableSet({ n }: { n: number }) {
  const P: any[] = [];
  SHUT0.v = 0.5;                                                          // the kopitiam's shutter mostly up: its light spills out
  P.push(<Entity key="shops" transform={Transform.fromXyz(VT[0] - SW / 2, 0, 0)}>{[-1, 0, 1].map((i) => <Unit key={"ku" + i} i={i} t={0} />)}</Entity>);
  P.push(<Mesh3d key="tt" transform={Transform.fromXyz(VT[0], TY - 0.015, VT[2])}><Cylinder radius={TR} half_height={0.015} /><StandardMaterial base_color_texture={S("tex/marble_01_diff_1k.jpg")} base_color="#e8e4dc" normal_map_texture={S("tex/marble_01_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([0.45, 0.45])} perceptual_roughness={0.25} /></Mesh3d>);
  P.push(<Model key="tea" src={S("tea_set_01/tea_set_01.gltf")} position={[VT[0] - 0.12, TY, VT[2] - 0.2]} rotation={[0, 0.6, 0]} scale={[0.75, 0.75, 0.75]} />);
  P.push(<Mesh3d key="tl" transform={Transform.fromXyz(VT[0], (TY - 0.03) / 2, VT[2])}><Cylinder radius={0.035} half_height={(TY - 0.03) / 2} /><StandardMaterial base_color="#2a2c31" metallic={0.5} perceptual_roughness={0.4} /></Mesh3d>);
  P.push(<Mesh3d key="fl" transform={Transform.fromXyz(VT[0], -0.02, VT[2])}><Cuboid half_size={[6, 0.02, 6]} /><StandardMaterial base_color_texture={S("tex/asphalt_02_diff_1k.jpg")} base_color="#7a7d85" normal_map_texture={S("tex/asphalt_02_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([10, 10])} perceptual_roughness={0.8} /></Mesh3d>);
  P.push(<Mesh3d key="fwy" transform={Transform.fromXyz(VT[0], 0.07, 1.1)}><Cuboid half_size={[7, 0.07, 1.1]} /><StandardMaterial base_color_texture={S("tex/floor_tiles_06_diff_1k.jpg")} normal_map_texture={S("tex/floor_tiles_06_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([14, 2.2])} perceptual_roughness={0.5} /></Mesh3d>);
  for (const [x, z, r] of [[-0.75, 0.25, 0.8], [0.7, -0.45, 2.6], [-0.35, -0.8, 3.8]] as [number, number, number][]) P.push(<Model key={"ch" + x} src={S("plastic_monobloc_chair_01/plastic_monobloc_chair_01.gltf")} position={[VT[0] + x, 0, VT[2] + z]} rotation={[0, r, 0]}><StandardMaterial base_color="#c8352a" /></Model>);
  P.push(<Phone key="ph" k="ph" p={PHN} scr={n >= 10 && n <= 12 ? "scr_go" : "scr_pay"} />);
  // 2: the prepaid card slides out and lifts on "prepaid card"
  { const u = n < 2 ? 0 : n === 2 ? on(12, 0.45, -0.2) : 1;
    if (u > 0.01) P.push(<Entity key="cd" pass="ui" transform={Transform.fromXyz(0, 0, 0)}><Card unlit k="card" p={[CARD[0], CARD[1] + Math.sin(Math.PI * Math.min(1, u)) * 0.04 * (n === 2 ? 1 : 0), lerp(CARD[2] + 0.2, CARD[2], u)]} size={[0.0856, 0.054]} tex="tng_card" rx={-Math.PI / 2} ry={-0.35} em={0.35} /></Entity>); }
  // 3: the flap sign 43 → 33 with the year tab
  { const fl = n === 3 ? on(25, 0.5, -0.25) : n > 3 ? 1 : 0;
    P.push(<Entity key="sge" pass="ui" transform={Transform.fromXyz(0, 0, 0)}><Sign unlit k="sg" p={SGN} price={fl > 0 ? "33" : "43"} prev="43" fl={n === 3 ? fl : 1} ry={0.15} sc={1.6} /></Entity>);
    P.push(<Entity key="yre" pass="ui" transform={Transform.fromXyz(0, 0, 0)}><Card unlit k={"yr" + (fl > 0.5)} p={[SGN[0] + 0.1, TY + 0.03, SGN[2] + 0.03]} size={[0.06, 0.03]} tex={fl > 0.5 ? "yr2024" : "yr2025"} ry={0.15} em={0.6} /></Entity>); }
  // 8: coins grow on "bigger"; 9: three cards land, one per word
  { const g = n === 8 ? on(43, 0.5, -0.2) : n > 8 ? 1 : 0;
    for (let i = 0; i < 7; i++) P.push(<Coin key={"cn" + i} k={"cn" + i} p={TX0(-0.2 + (i % 4) * 0.035, TY + Math.floor(i / 4) * 0.0026 * lerp(1, 3, g), 0.06 + (i % 3) * 0.01)} s={lerp(1, 3, g)} />); }
  if (n >= 9) ["c_loan", "c_ins", "c_fund"].forEach((t, i) => { const u = n === 9 ? on([46, 47, 50][i], 0.35, -0.2) : 1;
    if (u > 0.01) P.push(<Entity key={"lc" + i} pass="ui" transform={Transform.fromXyz(0, 0, 0)}><Card unlit k={"lc" + i} p={[LAND[i][0], LAND[i][1] + (1 - u) * 0.15, LAND[i][2]]} size={[0.128, 0.08]} tex={t} rx={-Math.PI / 2} ry={(i - 1) * 0.18} em={0.3} sc={Math.max(0.001, u)} /></Entity>); });
  // 11–12: the fund jar: coins pour from the phone into it; 12: a day strip, one tick lights per day
  { P.push(<Mesh3d key="jar" transform={Transform.fromXyz(JAR[0], TY + 0.07, JAR[2])}><Cylinder radius={0.05} half_height={0.07} /><StandardMaterial base_color={Srgba.hex("#cfe0f5").with_alpha(0.32)} alpha_mode="Blend" perceptual_roughness={0.08} /></Mesh3d>);
    P.push(<Entity key="jle" pass="ui" transform={Transform.fromXyz(0, 0, 0)}><Card unlit k="jlab" p={[JAR[0], TY + 0.07, JAR[2] + 0.051]} size={[0.08, 0.04]} tex="jar_label" em={0.4} /></Entity>);
    const pour = n === 11 ? lin(W(59), W(63) + 0.2) : n > 11 ? 1 : 0;
    for (let i = 0; i < 14; i++) { const f = cl(pour * 2 - i * 0.07); if (f <= 0) continue; const done = f >= 1;
      const a = [PHN[0], TY + 0.02, PHN[2]], b = [JAR[0] + (rnd(i) - 0.5) * 0.04, TY + 0.003 + Math.floor(i / 3) * 0.0028, JAR[2] + (rnd(i * 3) - 0.5) * 0.04];
      P.push(<Coin key={"pc" + i} k={"pc" + i} p={done ? b : [lerp(a[0], b[0], f), lerp(a[1], b[1], f) + Math.sin(Math.PI * f) * 0.12, lerp(a[2], b[2], f)]} />); }
    if (n === 12) for (let d = 0; d < 7; d++) { const on_ = lin(W(66) + d * 0.18, W(66) + d * 0.18 + 0.15);
      P.push(<Mesh3d key={"dk" + d} name={"dk" + d} pass="ui" transform={Transform.fromXyz(JAR[0] - 0.09 + d * 0.03, TY + 0.002, JAR[2] + 0.09)}><Cuboid half_size={[0.011, 0.0015, 0.011]} /><StandardMaterial base_color={on_ > 0.5 ? BLUEH : "#3a3c42"} emissive={glow(BLUEH, 2 * on_)} unlit={on_ > 0.5} /></Mesh3d>); } }
  // 13: 365 day tiles round the rim fill up
  { const run = n === 13 ? lin(W(73), W(78)) : n === 14 ? 1 : 0;
    for (let d = 0; d < 365; d += 1) { const a = (d / 365) * Math.PI * 2, lit = run * 365 > d;
      P.push(<Mesh3d key={"yd" + d} name={"yd" + d} pass={lit ? "ui" : undefined} transform={Transform.fromXyz(VT[0] + Math.sin(a) * (TR - 0.02), TY + 0.0012, VT[2] - Math.cos(a) * (TR - 0.02)).withRotation(rotY(-a))}><Cuboid half_size={[0.0028, 0.001, 0.008]} /><StandardMaterial base_color={lit ? BLUEH : "#9a978f"} emissive={lit ? glow(BLUEH, 1.6) : glow("#000000", 0)} /></Mesh3d>); } }
  return (<>{P}
    <DirectionalLight transform={Transform.fromXyz(VT[0] - 3, 6, VT[2] - 4).lookingAt(VT as any)} illuminance={900} color="#8fa6d6" shadow_maps_enabled />
    <PointLight transform={Transform.fromXyz(VT[0] + 0.2, 1.6, VT[2] + 0.3)} intensity={45000} color="#f4efe6" range={4} paint shadow_maps_enabled />
    <PointLight transform={Transform.fromXyz(VT[0], 2.2, 0.4)} intensity={260000} color="#ffb867" range={5} paint />   {/* the kopitiam inside */}
    <PointLight transform={Transform.fromXyz(PHN[0], TY + 0.12, PHN[2])} intensity={350} color={BLUEH} range={0.4} paint />
    <AmbientLight brightness={25} color="#8ea4dc" />
  </>);
}
// the toll plaza (4), a parking gantry (5) and a top-up counter (6) on one night road
const VS = [-300, 0, 300];
function Arm({ p, lift, k, len = 2.6 }: { p: number[]; lift: number; k: string; len?: number }) {
  const a = lift * 1.35;
  return (<Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromEuler("XYZ", 0, 0, a))}>
    <Mesh3d name={k + "a"} transform={Transform.fromXyz(len / 2, 0, 0)}><Cuboid half_size={[len / 2, 0.04, 0.04]} /><StandardMaterial base_color="#e9e6dd" perceptual_roughness={0.5} /></Mesh3d>
    {[0.3, 0.9, 1.5, 2.1].filter((x) => x < len).map((x) => <Mesh3d key={k + x} name={k + "s" + x} transform={Transform.fromXyz(x, 0, 0.041)}><Cuboid half_size={[0.14, 0.041, 0.002]} /><StandardMaterial base_color="#c8352a" /></Mesh3d>)}
  </Entity>);
}
function TollSet({ n }: { n: number }) {
  const cx = VS[0], cz = VS[2], P: any[] = [];
  P.push(<B key="rd" p={[cx, -0.02, cz]} s={[60, 0.04, 40]}><Tiles n="asphalt_02" u={20} v={14} tint="#4a4c54" real /></B>);
  for (const x of [-4.5, -1.5, 1.5, 4.5]) P.push(<B key={"ln" + x} p={[cx + x, 0.005, cz + 6]} s={[0.12, 0.01, 6]}><Flat c="#d9d6cf" /></B>);
  P.push(<B key="cnp" p={[cx, 5.4, cz]} s={[13, 0.35, 4]}><Plaster u={4} v={1} tint="#3b3d44" /></B>);
  for (const x of [-6.2, -3, 0, 3, 6.2]) P.push(<Mesh3d key={"pl" + x} transform={Transform.fromXyz(cx + x, 2.7, cz)}><Cylinder radius={0.22} half_height={2.7} /><Plaster u={1} v={2} tint="#45474e" /></Mesh3d>);
  for (const x of [-3, 0, 3]) { P.push(<B key={"bt" + x} p={[cx + x, 1.1, cz]} s={[1.0, 2.2, 1.4]}><Plaster u={1} v={1} tint="#40424a" /></B>);
    P.push(<B key={"bw" + x} p={[cx + x, 1.45, cz + 0.71]} s={[0.7, 0.6, 0.02]}><Flat c="#ffe2b0" e={glow("#ffcf8a", 1.2)} /></B>);
    for (const dz of [-6, 3.5]) P.push(<Model key={"cb" + x + dz} src={S("concrete_road_barrier/concrete_road_barrier.gltf")} position={[cx + x, 0, cz + dz]} rotation={[0, Math.PI / 2, 0]} />); }
  for (const [x, z] of [[-4.5, 7], [1.5, 9.5]] as [number, number][]) P.push(<WhiteModel key={"car" + x} src="car_b.glb" p={[cx + x, 0, cz + z]} r={Math.PI} s={1.0} c="#4a4c54" />);
  for (const x of [-4.5, -1.5, 1.5]) P.push(<Entity key={"tsg" + x} pass="ui" transform={Transform.fromXyz(0, 0, 0)}><Card unlit k={"tsg" + x} p={[cx + x, 4.7, cz + 2.02]} size={[2.4, 0.6]} tex="s_toll" em={1.2} /></Entity>);
  const lift = n === 4 ? on(29, 0.6, -0.25) : n > 4 ? 1 : 0;
  for (const x of [-2.5, 0.5]) P.push(<Arm key={"arm" + x} k={"arm" + x} p={[cx + x, 1.0, cz + 1.2]} lift={x === 0.5 ? lift : 0} />);
  P.push(<Entity key="rdr" pass="ui" transform={Transform.fromXyz(0, 0, 0)}><Mesh3d name="rdr" transform={Transform.fromXyz(cx + 0.35, 1.15, cz + 1.0)}><Cuboid half_size={[0.12, 0.16, 0.02]} /><StandardMaterial base_color={BLUEH} emissive={glow(BLUEH, 1.5 + 2 * lift)} /></Mesh3d></Entity>);
  // parking gantry at +14 m
  const pk = n === 5 ? on(30, 0.5, -0.2) : n > 5 ? 1 : 0, px = cx + 14;
  P.push(<B key="pkb" p={[px, 0.75, cz]} s={[0.7, 1.5, 0.7]}><Plaster u={1} v={1} tint="#40424a" /></B>);
  P.push(<Arm key="parm" k="parm" p={[px + 0.35, 1.0, cz + 0.2]} lift={pk} len={3} />);
  P.push(<Entity key="psg" pass="ui" transform={Transform.fromXyz(0, 0, 0)}><Card unlit k="psg" p={[px, 2.6, cz + 0.36]} size={[1.6, 0.4]} tex="s_park" em={0.8} /></Entity>);
  P.push(<Mesh3d key="ppl" transform={Transform.fromXyz(px, 2.1, cz + 0.3)}><Cylinder radius={0.05} half_height={0.7} /><StandardMaterial base_color="#55585e" /></Mesh3d>);
  // top-up counter at −14 m: a red reload sign, a counter, a card and a few small coins
  const kx = cx - 14;
  P.push(<B key="kc" p={[kx, 0.5, cz]} s={[2.4, 1.0, 0.8]}><Plaster u={1} v={1} tint="#8a8d95" /></B>);
  P.push(<B key="kw" p={[kx, 1.6, cz - 0.6]} s={[2.6, 3.2, 0.2]}><Plaster u={1} v={1} tint="#34363d" /></B>);
  P.push(<Entity key="ksg" pass="ui" transform={Transform.fromXyz(0, 0, 0)}><Card unlit k="ksg" p={[kx, 1.75, cz - 0.48]} size={[2.2, 0.55]} tex="s_reload" em={1.0} /></Entity>);
  P.push(<Entity key="kcd" pass="ui" transform={Transform.fromXyz(0, 0, 0)}><Card unlit k="kcd" p={[kx + 0.4, 1.0015, cz + 0.1]} size={[0.0856 * 3, 0.054 * 3]} tex="tng_card" rx={-Math.PI / 2} ry={0.3} em={0.3} /></Entity>);
  for (let i = 0; i < 5; i++) P.push(<Coin key={"kco" + i} k={"kco" + i} p={[kx - 0.35 + i * 0.06, 1.0, cz + 0.15]} s={2} />);
  return (<>{P}
    <DirectionalLight transform={Transform.fromXyz(cx - 20, 18, cz + 14).lookingAt(VS as any)} illuminance={700} color="#7d92c6" shadow_maps_enabled />
    <PointLight transform={Transform.fromXyz(cx, 5.0, cz + 1.0)} intensity={2.5e6} color="#e8f0ff" range={12} paint shadow_maps_enabled />
    <PointLight transform={Transform.fromXyz(cx + 0.4, 1.4, cz + 1.4)} intensity={60000} color={BLUEH} range={3} paint />
    <PointLight transform={Transform.fromXyz(px, 2.5, cz + 1.0)} intensity={500000} color="#ffd9a8" range={6} paint />
    <PointLight transform={Transform.fromXyz(kx, 2.2, cz + 1.0)} intensity={500000} color="#ffb59a" range={6} paint />
    <AmbientLight brightness={18} color="#8ea4dc" />
    <Fog color="#14161c" near={25} far={80} />
  </>);
}
// the central bank (7): a clay civic front (EX41's council, re-signed; an illustration)
const VC = [-300, 0, -300];
function BankSet() {
  const P: any[] = [], cx = VC[0], cz = VC[2];
  for (let s = 0; s < 4; s++) P.push(<B key={"cs" + s} p={[cx, 0.09 + s * 0.18, cz + 2.4 - s * 0.35]} s={[12 - s * 0.6, 0.18, 1.6]}><Plaster u={4} v={1} tint="#3b3d44" /></B>);
  P.push(<B key="cwall" p={[cx, 4.2, cz - 0.6]} s={[10, 7, 0.6]}><Plaster u={4} v={3} tint="#34363d" /></B>);
  for (let c = 0; c < 6; c++) P.push(<Mesh3d key={"col" + c} transform={Transform.fromXyz(cx - 3.75 + c * 1.5, 3.6, cz + 0.9)}><Cylinder radius={0.32} half_height={2.9} /><Plaster u={1} v={3} tint="#4a4c54" /></Mesh3d>);
  P.push(<B key="ent" p={[cx, 6.75, cz + 0.9]} s={[10.4, 0.5, 1.2]}><Plaster u={4} v={1} tint="#40424a" /></B>);
  P.push(<Entity key="bsg" pass="ui" transform={Transform.fromXyz(0, 0, 0)}><Card unlit k="bsg" p={[cx, 5.9, cz + 1.52]} size={[6.4, 0.95]} tex="s_bank" em={0.9} /></Entity>);
  for (let w = 0; w < 5; w++) P.push(<B key={"cwin" + w} p={[cx - 3 + w * 1.5, 3.3, cz - 0.28]} s={[0.9, 2.2, 0.05]}><Flat c="#6b4a22" e={glow("#ffb45c", 0.5)} /></B>);
  P.push(<B key="cfloor" p={[cx, -0.05, cz + 4]} s={[60, 0.1, 30]}><Tiles n="asphalt_02" u={20} v={10} tint="#4a4c54" real /></B>);
  return (<>{P}
    <DirectionalLight color="#7d92c6" transform={Transform.fromXyz(cx - 18, 16, cz + 14).lookingAt(VC as any)} illuminance={900} shadow_maps_enabled />
    <SpotLight transform={Transform.fromXyz(cx + 4, 1.0, cz + 9).lookingAt([cx, 5.5, cz + 1])} intensity={3.5e6} outer_angle={0.45} inner_angle={0.25} color="#ffe6c2" range={25} paint />
    <AmbientLight brightness={22} color="#8ea4dc" />
    <Fog color="#14161c" near={30} far={90} /></>);
}

// ================= the 14 setups =================
type Pose = { p: number[]; l: number[] };
type Tag = { at: number[]; x: number; y: number; cap: string; big?: string; sub?: string; t: number };
type Setup = { set: string; a: Pose; b: Pose; fov?: number; fs?: number; up?: number[]; tr?: "in" | "out" | "side"; fd?: () => number | null; tags?: Tag[];
  count?: { v: () => string; unit: string; t?: number }; note?: string; src?: string; step?: number };
const fromT = (l: number[], dir: number[], d: number) => { const k = Math.hypot(dir[0], dir[1], dir[2]); return [l[0] + (dir[0] / k) * d, l[1] + (dir[1] / k) * d, l[2] + (dir[2] / k) * d]; };
const dist3 = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const C = (p: number[], l: number[]): Pose => ({ p, l });
const num = (a: number, b: number, t0: number, t1: number, d = 0) => lerp(a, b, cl((T - t0) / (t1 - t0))).toFixed(d);
const SRC = "Bank Negara Malaysia, Annual Report 2025";
const P1A = C(fromT(PHN, [0.3, 1.3, 0.75], 0.62), PHN);
const SETUPS: Setup[] = [
  /* 1 */ { set: "t", a: P1A, b: C(fromT(PHN, [0.25, 1.4, 0.6], 0.5), PHN), fov: 26, fs: 4, src: SRC },
  /* 2 */ { set: "t", a: C(fromT([PHN[0] + 0.08, TY, PHN[2] + 0.06], [0.9, 0.6, 1], 0.7), [PHN[0] + 0.08, TY, PHN[2] + 0.06]), b: C(fromT([PHN[0] + 0.1, TY, PHN[2] + 0.06], [0.6, 0.55, 1], 0.6), [PHN[0] + 0.1, TY, PHN[2] + 0.06]), fov: 26, fs: 4,
            tags: [{ at: [CARD[0], TY + 0.01, CARD[2]], x: 620, y: 1330, cap: "PREPAID CARD", sub: "e-money too", t: W(13) }] },
  /* 3 */ { set: "t", a: C([SGN[0] + 0.05, TY + 0.1, SGN[2] + 0.75], [SGN[0], TY + 0.06, SGN[2]]), b: C([SGN[0] + 0.04, TY + 0.1, SGN[2] + 0.66], [SGN[0], TY + 0.06, SGN[2]]), fov: 26, fs: 2.8, src: SRC,
            count: { v: () => "RM" + num(43, 33, W(25) - 0.3, W(25) + 0.2), unit: "average e-money payment, 2024", t: W(23) } },
  /* 4 */ { set: "s", tr: "out", a: C([VS[0] + 3, 6, VS[2] + 22], [VS[0], 3.2, VS[2]]), b: C([VS[0] + 2.4, 4.8, VS[2] + 18], [VS[0], 2.9, VS[2]]), fov: 34, fs: 8 },
  /* 5 */ { set: "s", a: C([VS[0] + 11.6, 1.0, VS[2] + 6.4], [VS[0] + 14.4, 1.7, VS[2]]), b: C([VS[0] + 12.1, 0.9, VS[2] + 5.8], [VS[0] + 14.5, 1.7, VS[2]]), fov: 30, fs: 5.6, up: [0.1, 1, 0] },
  /* 6 */ { set: "s", a: C([VS[0] - 12.4, 2.3, VS[2] + 4.8], [VS[0] - 14, 1.55, VS[2]]), b: C([VS[0] - 12.7, 2.2, VS[2] + 4.3], [VS[0] - 14, 1.5, VS[2]]), fov: 30, fs: 4,
            tags: [{ at: [VS[0] - 14.25, 1.02, VS[2] + 0.15], x: 70, y: 1330, cap: "SMALL MONEY", sub: "tolls · parking · top-up", t: W(33) }] },
  /* 7 */ { set: "b", tr: "out", a: C([VC[0] + 1.5, 1.6, VC[2] + 22], [VC[0], 4.6, VC[2]]), b: C([VC[0] + 3.5, 2.6, VC[2] + 26], [VC[0], 4.4, VC[2]]), fov: 34, fs: 8, src: SRC, note: "building: an illustration" },
  /* 8 */ { set: "t", tr: "in", a: C(fromT(TX0(-0.15, TY, 0.08), [-0.3, 0.6, 1], 0.6), TX0(-0.15, TY, 0.08)), b: C(fromT(TX0(-0.15, TY, 0.08), [-0.25, 0.5, 1], 0.48), TX0(-0.15, TY, 0.08)), fov: 26, fs: 4 },
  /* 9 */ { set: "t", a: C(TX0(0, TY + 0.95, 0.55), TX0(0, TY, 0.27)), b: C(TX0(0, TY + 0.85, 0.48), TX0(0, TY, 0.27)), fov: 30, fs: 5.6, src: SRC,
            note: "BNM: e-money now also pays for micro-financing, money-market funds, micro-insurance/takaful" },
  /* 10 */ { set: "t", a: C(fromT(PHN, [-0.2, 1.4, 0.5], 0.36), PHN), b: C(fromT(PHN, [-0.1, 1.5, 0.4], 0.3), PHN), fov: 26, fs: 4, src: "Principal Malaysia: GO+ (Principal e-Cash Fund), live 29 Mar 2021", note: "screen: an illustration" },
  /* 11 */ { set: "t", a: C([PHN[0] + 0.12, TY + 0.14, PHN[2] + 0.62], [PHN[0] + 0.14, TY + 0.06, PHN[2] - 0.08]), b: C([PHN[0] + 0.16, TY + 0.13, PHN[2] + 0.55], [PHN[0] + 0.16, TY + 0.06, PHN[2] - 0.08]), fov: 30, fs: 4, src: "Principal Malaysia" },
  /* 12 */ { set: "t", a: C(fromT([JAR[0], TY + 0.05, JAR[2]], [0.8, 0.5, 1], 0.5), [JAR[0], TY + 0.05, JAR[2]]), b: C(fromT([JAR[0], TY + 0.05, JAR[2]], [0.3, 0.5, 1], 0.46), [JAR[0], TY + 0.05, JAR[2]]), fov: 26, fs: 4,
            note: "returns credited daily · not guaranteed" },
  /* 13 */ { set: "t", a: C(TX0(0.05, TY + 1.1, 0.9), TX0(0, TY, 0)), b: C(TX0(0.04, TY + 1.5, 0.75), TX0(0, TY, 0)), fov: 34, fs: 8, src: SRC,
            count: { v: () => num(432, 538, W(73), W(75)), unit: "e-payments per Malaysian in 2025 (2024: 432)", t: W(72) } },
  /* 14 */ { set: "t", a: C(fromT(PHN, [0.5, 1.6, 1.2], 1.3), PHN), b: P1A, fov: 26, fs: 4 },
];
function World({ n }: { n: number }) {
  const s = SETUPS[n - 1].set;
  if (s === "t") return <TableSet n={n} />;
  if (s === "s") return <TollSet n={n} />;
  return <BankSet />;
}
