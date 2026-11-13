// ================= sets (EX41: how to open a Ramly Burger stall, four steps) =================
const SX = 2.3, SZ = 3.3;                                                  // EX40's stall on the road shoulder
function StreetSet41() {
  const P: any[] = [<Street key="street" />, ...UNITS.map((i) => <Unit key={"u" + i} i={i} t={0} />)];
  P.push(<Stall key="stall" o={[SX, 0, SZ]} />);
  P.push(<Model key="lpg" src={S("small_lpg_tank/small_lpg_tank.gltf")} position={[SX - 0.95, 0, SZ + 0.05]} scale={[1.2, 1.2, 1.2]} />);
  P.push(<Model key="stl" src={S("wooden_stool_01/wooden_stool_01.gltf")} position={[SX + 0.4, 0, SZ + 1.05]} rotation={[0, 0.4, 0]} />);
  for (const [x, z, r] of [[SX + 1.5, SZ + 0.9, 2.6], [SX + 2.1, SZ + 0.5, 3.4], [SX - 1.6, SZ + 1.2, 0.4]] as [number, number, number][]) P.push(<WhiteModel key={"rc" + x} src="plastic_monobloc_chair_01/plastic_monobloc_chair_01.gltf" p={[x, 0, z]} r={r} c="#4a4c54" />);
  for (let c = 0; c < 4; c++) P.push(<WhiteModel key={"rk" + c} src="plastic_crate_01/plastic_crate_01.gltf" p={[SX - 1.5 + (c % 2) * 0.45, Math.floor(c / 2) * 0.29, SZ - 0.5]} r={c * 0.25} c="#4a4c54" />);
  P.push(<Model key="rvs" src={S("parts/vespa.glb")} position={[SX - 3.0, 0, SZ + 0.9]} rotation={[0, 1.1, 0]}><StandardMaterial base_color={WHITE2} /></Model>);
  P.push(<Model key="rvs2" src={S("parts/vespa.glb")} position={[SX + 3.4, 0, SZ + 1.4]} rotation={[0, -1.3, 0]}><StandardMaterial base_color={WHITE2} /></Model>);
  for (let i = 0; i < 4; i++) P.push(<Patty key={"gp" + i} k={"gp" + i} p={[SX - 0.3 + [0, -0.13, -0.16, 0.1][i], CT + 0.026, SZ + 0.15 + [0, 0.06, -0.08, -0.09][i]]} ry={i} />);
  return (<>{P}
    <Environment src={S("sky.hdr")} intensity={0.14} rotation={2.6} />
    <AmbientLight brightness={22} color="#8ea4dc" />
    <DirectionalLight color="#a7bdff" transform={Transform.fromXyz(-22, 18, 6).lookingAt([0, 0, 0])} illuminance={3600} shadow_maps_enabled soft_shadow_size={0.5} />
    <Shadows distance={60} firstCascade={6} mapSize={8192} bias={0.04} normalBias={1.5} />
    <PointLight transform={Transform.fromXyz(SX, 2.0, SZ + 0.15)} intensity={900000} color={WARM} range={9} shadow_maps_enabled />
    <SpotLight transform={Transform.fromXyz(SX + 1.2, 2.6, SZ + 2.2).lookingAt([SX + 0.1, CT, SZ + 0.2])} intensity={260000} outer_angle={0.5} inner_angle={0.3} color="#ffe6c2" range={8} />
    <Fog color="#14161c" near={45} far={140} /></>);
}
// the desk: one long dark table for the paper steps; a calendar wall behind it
const VD = [300, 0, 0], FY = 0.75;
const DX = (x: number, y = FY, z = 0) => [VD[0] + x, y, VD[2] + z];
const CERT = DX(-0.9), SLOT = DX(-0.9, FY, -0.22), CLK = DX(-0.55, FY + 0.13, -0.24), VAX = DX(-0.1, FY + 0.012), RING = DX(0.75, FY + 0.002), PHONE = DX(1.3, FY, 0.02);
const LIC = DX(-0.5, FY, 0.22), WALLZ = VD[2] - 0.55, MONTH = (i: number) => [VD[0] + 0.05 + (i % 4) * 0.14, FY + 0.48 - Math.floor(i / 4) * 0.14, WALLZ + 0.01];
const ROWX = [-0.33, -0.11, 0.11, 0.33], GRD = [[-0.13, 0.16], [0.13, 0.16], [-0.13, 0.42], [0.13, 0.42]];
function DeskSet({ n }: { n: number }) {
  const P: any[] = [];
  P.push(<Mesh3d key="top" transform={Transform.fromXyz(VD[0] + 0.2, FY - 0.02, VD[2])}><Cuboid half_size={[1.9, 0.02, 0.62]} /><StandardMaterial base_color="#1d1f23" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} perceptual_roughness={0.5} /></Mesh3d>);
  P.push(<Mesh3d key="wall" transform={Transform.fromXyz(VD[0] + 0.2, FY + 0.6, WALLZ - 0.02)}><Cuboid half_size={[1.9, 0.62, 0.02]} /><StandardMaterial base_color="#17181c" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} perceptual_roughness={0.9} /></Mesh3d>);
  // 2: four step tiles on the front edge flip up, one by one
  if (n <= 2) ROWX.forEach((x, i) => { const u = n === 2 ? on(11, 0.3, i * 0.12 - 0.1) : 0;
    P.push(<Card key={"tl" + i + (u > 0.5)} k={"tl" + i + (u > 0.5)} p={DX(x, FY + 0.035 * u + 0.0012, 0.3)} size={[0.08, 0.08]} tex={u > 0.5 ? `tile${i + 1}_on` : `tile${i + 1}`} rx={lerp(-Math.PI / 2, -0.35, u)} em={u > 0.5 ? 0.4 : 0.05} />); });
  if (n === 2) P.push(<Card key="rm0" k="rm0" p={DX(0.5, FY + 0.03, 0.3)} size={[0.12, 0.06]} tex="v_fee" rx={-0.35} sc={on(15, 0.3, -0.15)} blend />);
  // 3–5 step 1: the certificate slides out of a dark slot, the stamp lands, a clock sweeps four hours
  P.push(<Mesh3d key="slot" transform={Transform.fromXyz(SLOT[0], FY + 0.03, SLOT[2] - 0.06)}><Cuboid half_size={[0.2, 0.03, 0.1]} /><StandardMaterial base_color="#2a2c31" metallic={0.4} perceptual_roughness={0.35} /></Mesh3d>);
  P.push(<Mesh3d key="slotl" transform={Transform.fromXyz(SLOT[0], FY + 0.061, SLOT[2] + 0.035)}><Cuboid half_size={[0.16, 0.0015, 0.004]} /><StandardMaterial base_color={YEL} emissive={glow(YHOT, n === 3 ? 2.5 : 0.6)} /></Mesh3d>);
  const out = n < 3 ? 0 : n === 3 ? on(22, 0.6, -0.3) : 1, stamp = n < 4 ? 0 : n === 4 ? on(26, 0.25, -0.1) : 1;
  if (out > 0.01) P.push(<Card key="cert" k="cert" p={[CERT[0], FY + 0.0015, lerp(SLOT[2] + 0.02, CERT[2] + 0.04, out)]} size={[0.297, 0.21]} tex="cert" rx={-Math.PI / 2} rz={0.06} em={0.08}>
    {stamp > 0.01 ? <Mesh3d name="stamp" transform={Transform.fromXyz(0.07, -0.05, 0.0015 + (1 - stamp) * 0.06).withScale(sc3(lerp(1.4, 1, stamp)))}><Cuboid half_size={[0.065, 0.033, 0.0002]} /><StandardMaterial base_color_texture={TX("stamp_kkm")} alpha_mode="Blend" emissive={glow(YHOT, 0.6)} emissive_texture={TX("stamp_kkm")} /></Mesh3d> : null}</Card>);
  { const sw = n === 5 ? lin(W(30) - 0.1, W(32) + 0.2) : n > 5 ? 1 : 0, ang = sw * 4 * Math.PI / 6;
    P.push(<Card key="clk" k="clk" p={CLK} size={[0.18, 0.18]} tex="clockface" em={0.15} />);
    P.push(<Mesh3d key="hand" transform={Transform.fromXyz(CLK[0] + Math.sin(ang) * 0.03, CLK[1] + Math.cos(ang) * 0.03, CLK[2] + 0.004).withRotation(Quat.fromEuler("XYZ", 0, 0, -ang))}><Cuboid half_size={[0.003, 0.035, 0.001]} /><StandardMaterial base_color="#17181b" /></Mesh3d>);
    if (sw > 0.01) for (let h = 0; h < 4; h++) if (sw * 4 > h) { const a = (h + 0.5) * Math.PI / 6;
      P.push(<Mesh3d key={"cw" + h} name={"cw" + h} transform={Transform.fromXyz(CLK[0] + Math.sin(a) * 0.06, CLK[1] + Math.cos(a) * 0.06, CLK[2] + 0.003).withRotation(Quat.fromEuler("XYZ", 0, 0, -a))}><Cuboid half_size={[0.012, 0.006, 0.0006]} /><StandardMaterial base_color={YEL} emissive={glow(YHOT, 1.4)} /></Mesh3d>); } }
  // 6–8 step 2: the vaccination card flips face up on a tray; three price tags; a 36-month ring
  P.push(<Mesh3d key="tray" transform={Transform.fromXyz(VAX[0], FY + 0.005, VAX[2])}><Cuboid half_size={[0.16, 0.005, 0.11]} /><StandardMaterial base_color="#a9adb4" metallic={0.6} perceptual_roughness={0.3} /></Mesh3d>);
  { const fl = n < 6 ? 0 : n === 6 ? on(36, 0.45, -0.2) : 1;
    P.push(<Card key={"vax" + (fl > 0.5)} k={"vax" + (fl > 0.5)} p={[VAX[0], FY + 0.012 + Math.sin(Math.PI * fl) * 0.05, VAX[2]]} size={[0.1712, 0.108]} tex={fl > 0.5 ? "vax" : "pack_side"} rx={lerp(Math.PI / 2, -Math.PI / 2, fl)} rz={0.1} em={0.15} />); }
  ["rm50", "rm80", "rm120"].forEach((t, i) => { const u = n < 7 ? 0 : n === 7 ? on(i === 0 ? 39 : i === 1 ? 40 : 41, 0.3, -0.15) : 1;
    if (u > 0.01) P.push(<Card key={"pt" + t} k={"pt" + t} p={DX(0.16 + i * 0.12, FY + 0.028 * u, 0.06)} size={[0.1, 0.05]} tex={`tag_${t}`} rx={lerp(-Math.PI / 2, -0.4, u)} ry={-0.2 + i * 0.1} em={0.3} />); });
  { const run = n === 8 ? lin(W(46) - 0.2, W(48) + 0.1) : n > 8 ? 1 : 0;
    for (let m = 0; m < 36; m++) { const a = (m / 36) * Math.PI * 2, lit = run * 36 >= m + 1, last = m === 35;
      P.push(<Mesh3d key={"rg" + m} name={"rg" + m} transform={Transform.fromXyz(RING[0] + Math.sin(a) * 0.13, FY + 0.004 + (last && lit ? 0.01 : 0), RING[2] - Math.cos(a) * 0.13).withRotation(rotY(-a))}><Cuboid half_size={[0.009, 0.004, 0.006]} /><StandardMaterial base_color={lit ? (last ? YEL : "#c9ccd1") : "#3a3c42"} emissive={lit ? glow(last ? YHOT : "#ffffff", last ? 2.5 : 0.3) : glow("#000000", 0)} /></Mesh3d>); }
    P.push(<Card key="vxr" k="vxr" p={DX(0.75, FY + 0.0015)} size={[0.1712 * 0.6, 0.108 * 0.6]} tex="vax" rx={-Math.PI / 2} em={0.2} />); }
  // 9 "without both, no licence": the two documents slide in beside a grey licence; it takes colour on "licence"
  if (n === 9) { const a = on(50, 0.5, -0.2), lit = on(57, 0.3, -0.1);
    P.push(<Card key={"lic" + (lit > 0.5)} k={"lic" + (lit > 0.5)} p={[LIC[0], FY + 0.0015, LIC[2]]} size={[0.0856 * 1.4, 0.054 * 1.4]} tex={lit > 0.5 ? "licence" : "licence_grey"} rx={-Math.PI / 2} em={lit * 0.35} />);
    P.push(<Card key="lc1" k="lc1" p={[lerp(CERT[0], LIC[0] - 0.11, a), FY + 0.0018, lerp(CERT[2], LIC[2], a)]} size={[0.297 * 0.4, 0.21 * 0.4]} tex="cert" rx={-Math.PI / 2} em={0.1} />);
    P.push(<Card key="lc2" k="lc2" p={[lerp(VAX[0], LIC[0] + 0.11, a), FY + 0.0018, lerp(VAX[2], LIC[2], a)]} size={[0.1712 * 0.7, 0.108 * 0.7]} tex="vax" rx={-Math.PI / 2} em={0.1} />); }
  // 11 the phone: an online licence form fills in on the words (an illustration, not e-Lesen's design)
  { const st = n < 11 ? 0 : n > 11 ? 3 : T >= W(71) - 0.1 ? 3 : T >= W(70) - 0.1 ? 2 : T >= W(69) - 0.1 ? 1 : 0;
    P.push(<Entity key="ph" transform={Transform.fromXyz(PHONE[0], FY + 0.06, PHONE[2]).withRotation(Quat.fromEuler("YXZ", -0.25, -0.55, 0))}>
      <Mesh3d name="phb"><Cuboid half_size={[0.038, 0.078, 0.004]} /><StandardMaterial base_color="#1a1b1f" metallic={0.4} perceptual_roughness={0.3} /></Mesh3d>
      <Card k={"phs" + st} p={[0, 0, 0.0042]} size={[0.068, 0.145]} tex={`scr${st}`} em={0.9} />
    </Entity>);
    P.push(<Mesh3d key="phst" transform={Transform.fromXyz(PHONE[0], FY + 0.02, PHONE[2] - 0.03)}><Cuboid half_size={[0.03, 0.02, 0.03]} /><StandardMaterial base_color="#2a2c31" /></Mesh3d>); }
  // 12–13 the calendar wall: one window (June 2025) lights; a shutter rolls down over it on "Miss it"
  for (let i = 0; i < 12; i++) { const m = MONTH(i), jun = i === 5, onU = jun && (n === 12 ? on(76, 0.3, -0.15) : n > 12 ? 1 : 0) > 0.5;
    P.push(<Card key={"mo" + i + onU} k={"mo" + i + onU} p={m} size={[0.12, 0.12]} tex={onU ? `m${i}_on` : `m${i}`} em={onU ? 0.6 : 0.05} />); }
  { const sh = n === 13 ? on(84, 0.5, -0.15) : n > 13 ? 1 : 0, j = MONTH(5);
    if (sh > 0.01) P.push(<Mesh3d key="shut" name="shut" transform={Transform.fromXyz(j[0], j[1] + 0.065 - 0.065 * sh, j[2] + 0.006).withScale([1, Math.max(0.001, sh), 1])}><Cuboid half_size={[0.064, 0.065, 0.002]} /><StandardMaterial base_color="#3e4047" metallic={0.4} perceptual_roughness={0.5} /></Mesh3d>);
    for (let r = 0; r < 9; r++) { const y = j[1] + 0.065 - r * 0.0145; if (y < j[1] + 0.065 - 0.13 * sh) continue; P.push(<Mesh3d key={"sl" + r} name={"sl" + r} transform={Transform.fromXyz(j[0], y, j[2] + 0.0085)}><Cuboid half_size={[0.064, 0.0016, 0.0016]} /><StandardMaterial base_color="#5d6068" metallic={0.4} perceptual_roughness={0.4} /></Mesh3d>); } }
  // 16 the whole list: certificate, card, licence, pack in a row at the front; each lights on its word
  if (n === 16) { const lit = [on(111, 0.3, -0.25), on(111, 0.3, -0.1), on(111, 0.3, 0.05), on(114, 0.3, -0.15)];
    P.push(<Card key="r0" k="r0" p={DX(GRD[0][0], FY + 0.0015, GRD[0][1])} size={[0.297 * 0.55, 0.21 * 0.55]} tex="cert" rx={-Math.PI / 2} em={0.05 + 0.4 * lit[0]} />);
    P.push(<Card key="r1" k="r1" p={DX(GRD[1][0], FY + 0.0015, GRD[1][1])} size={[0.1712, 0.108]} tex="vax" rx={-Math.PI / 2} em={0.05 + 0.4 * lit[1]} />);
    P.push(<Card key="r2" k="r2" p={DX(GRD[2][0], FY + 0.0015, GRD[2][1])} size={[0.0856 * 1.8, 0.054 * 1.8]} tex="licence" rx={-Math.PI / 2} em={0.05 + 0.4 * lit[2]} />);
    P.push(<Pack key="r3" k="r3" p={DX(GRD[3][0], FY, GRD[3][1] - 0.04)} ry={-0.2} sc={0.55} />);
    lit.forEach((l, i) => { if (l > 0.01) P.push(<Mesh3d key={"rl" + i} name={"rl" + i} transform={Transform.fromXyz(VD[0] + GRD[i][0], FY + 0.001, VD[2] + GRD[i][1] + 0.075).withScale([Math.max(0.001, l), 1, 1])}><Cuboid half_size={[0.09, 0.0008, 0.004]} /><StandardMaterial base_color={YEL} emissive={glow(YHOT, 2.4)} /></Mesh3d>); }); }
  return (<>{P}
    <RectLight transform={Transform.fromXyz(VD[0] + 0.2, FY + 1.3, VD[2] + 0.7).lookingAt([VD[0] + 0.2, FY, VD[2]])} intensity={70000} width={3.2} height={1.0} color="#fff3e2" range={5} />
    <SpotLight transform={Transform.fromXyz(VD[0] + 0.9, FY + 1.1, VD[2] + 1.0).lookingAt([VD[0] + 0.1, FY + 0.05, VD[2]])} intensity={22000} outer_angle={0.8} inner_angle={0.2} color="#fff1dc" shadow_maps_enabled range={5} />
    <RectLight transform={Transform.fromXyz(VD[0] + 0.3, FY + 1.6, VD[2] - 0.1).lookingAt([VD[0] + 0.3, FY + 0.4, WALLZ])} intensity={14000} width={2.5} height={0.4} color="#aebbd4" range={4} />
    <AmbientLight brightness={30} color="#b4bccb" />
    <Environment src={S("sky.hdr")} intensity={0.25} />
  </>);
}
// the council (10): a clay civic front built from the street's parts: steps, six columns, pediment, the sign
const VC = [-300, 0, 300];
function CouncilSet() {
  const P: any[] = [], cx = VC[0], cz = VC[2];
  for (let s = 0; s < 4; s++) P.push(<B key={"cs" + s} p={[cx, 0.09 + s * 0.18, cz + 2.4 - s * 0.35]} s={[12 - s * 0.6, 0.18, 1.6]}><Plaster u={4} v={1} tint="#3b3d44" /></B>);
  P.push(<B key="cwall" p={[cx, 4.2, cz - 0.6]} s={[10, 7, 0.6]}><Plaster u={4} v={3} tint="#34363d" /></B>);
  for (let c = 0; c < 6; c++) P.push(<Mesh3d key={"col" + c} transform={Transform.fromXyz(cx - 3.75 + c * 1.5, 3.6, cz + 0.9)}><Cylinder radius={0.32} half_height={2.9} /><Plaster u={1} v={3} tint="#4a4c54" /></Mesh3d>);
  P.push(<B key="ent" p={[cx, 6.75, cz + 0.9]} s={[10.4, 0.5, 1.2]}><Plaster u={4} v={1} tint="#40424a" /></B>);
  P.push(<Mesh3d key="ped" shape={sob().gableStep} transform={Transform.fromXyz(cx, 7.0, cz + 0.9).withScale([4.4, 1.6, 4])}><Plaster u={2} v={1} tint="#3b3d44" /></Mesh3d>);
  P.push(<Card key="csg" k="csg" p={[cx, 5.9, cz + 1.52]} size={[5.2, 0.98]} tex="council_sign" em={0.9} />);
  for (let w = 0; w < 5; w++) P.push(<B key={"cwin" + w} p={[cx - 3 + w * 1.5, 3.3, cz - 0.28]} s={[0.9, 2.2, 0.05]}><Flat c="#6b4a22" e={glow("#ffb45c", 0.5)} /></B>);
  P.push(<B key="cfloor" p={[cx, -0.05, cz + 4]} s={[60, 0.1, 30]}><Tiles n="asphalt_02" u={20} v={10} tint="#4a4c54" real /></B>);
  return (<>{P}
    <DirectionalLight color="#a7bdff" transform={Transform.fromXyz(cx - 18, 16, cz + 14).lookingAt(VC as any)} illuminance={2600} shadow_maps_enabled soft_shadow_size={0.5} />
    <SpotLight transform={Transform.fromXyz(cx + 4, 1.0, cz + 9).lookingAt([cx, 5.5, cz + 1])} intensity={3.5e6} outer_angle={0.45} inner_angle={0.25} color="#ffe6c2" range={25} />
    <AmbientLight brightness={24} color="#8ea4dc" />
    <Environment src={S("sky.hdr")} intensity={0.14} />
    <Fog color="#14161c" near={30} far={90} /></>);
}
// step 4 (14–15): EX40's parts of a stall: the clay cart rolls in, the griddle and stock land, it lights up as a stall
const VV = [300, 0, 300], CART2 = [VV[0] + 0.2, 0, VV[2] - 0.15];
function CartSet({ n }: { n: number }) {
  const P: any[] = [<Mesh3d key="vf" transform={Transform.fromXyz(VV[0], -0.02, VV[2])}><Cuboid half_size={[6, 0.02, 6]} /><StandardMaterial base_color="#30333a" normal_map_texture={S("tex/concrete_tiles_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([8, 8])} perceptual_roughness={0.55} /></Mesh3d>];
  const cartIn = n === 14 ? on(92, 0.6, -0.35) : 1, can = n === 15 ? on(99, 0.6, -0.3) : 0, real = n === 15 ? on(106, 0.4, -0.25) : 0;
  const pk = n === 14 ? on(96, 0.5, -0.25) : 1, top = [CART2[0] + 0.45, CT + 0.012, CART2[2] + 0.3];
  P.push(<Stall key="c2" k="c2" o={[CART2[0] + 1.8 * (1 - ss(cartIn, 0, 1)), 0, CART2[2]]} real={real} canopy={can} lamp={real} />);
  if (pk > 0.01) P.push(<Pack key="pk" k="pk" p={[top[0], top[1] + (1 - ss(pk, 0, 1)) * 0.5, top[2]]} ry={0.62} glowK={n === 15 ? on(103, 0.3, -0.1) : 0} x={n === 15 ? 0.25 * on(103, 0.3, -0.1) : 0} />);
  if (n === 15) P.push(<Card key="ctag" k="ctag" p={[CART2[0] + 0.05, 0.62, CART2[2] + 0.53]} size={[0.2, 0.08]} tex="carttag" em={0.3} sc={on(99, 0.3, -0.2)} />);
  return (<>{P}
    <RectLight transform={Transform.fromXyz(VV[0] + 0.2, 2.6, VV[2] + 1.4).lookingAt([VV[0], 0.4, VV[2]])} intensity={160000} width={2.2} height={1.2} color="#fff3e2" range={7} />
    <SpotLight transform={Transform.fromXyz(VV[0] + 1.4, 2.4, VV[2] + 2.0).lookingAt([VV[0], 0.5, VV[2]])} intensity={120000} outer_angle={0.6} inner_angle={0.2} color="#fff1dc" shadow_maps_enabled range={7} />
    <PointLight transform={Transform.fromXyz(CART2[0] + 0.05, 2.0, CART2[2] + 0.15)} intensity={600000 * real} color={WARM} range={6} />
    <AmbientLight brightness={30} color="#8ea4dc" />
    <Environment src={S("sky.hdr")} intensity={0.2} />
  </>);
}

// ================= the 17 setups =================
type Pose = { p: number[]; l: number[] };
type Tag = { at: number[]; x: number; y: number; cap: string; big?: string; sub?: string; t: number };
type Setup = { set: string; a: Pose; b: Pose; fov?: number; fs?: number; up?: number[]; tr?: "in" | "out" | "side"; fd?: () => number | null; tags?: Tag[];
  count?: { v: () => string; unit: string; t?: number }; note?: string; src?: string; step?: number };
const fromT = (l: number[], dir: number[], d: number) => { const k = Math.hypot(dir[0], dir[1], dir[2]); return [l[0] + (dir[0] / k) * d, l[1] + (dir[1] / k) * d, l[2] + (dir[2] / k) * d]; };
const dist3 = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const C = (p: number[], l: number[]): Pose => ({ p, l });
const num = (a: number, b: number, t0: number, t1: number, d = 0) => lerp(a, b, cl((T - t0) / (t1 - t0))).toFixed(d);
const SL0 = [SX - 0.6, 1.5, SZ - 0.4];
const P1A = C([SX + 8.6, 8.2, SZ + 15.5], SL0);
const G0 = [SX - 0.3, CT + 0.03, SZ + 0.15];
const RW = DX(0, FY, 0.3), CERTL = [CERT[0], FY, CERT[2] + 0.02];
const SRC_REG = "Food Hygiene Regulations 2009, reg. 30–31", SRC_PR = "prices: course providers, Nov 2026 (vary)", SRC_DB = "Malaysia Gazette, 21 May 2025 · DBKL e-Lesen";
const SETUPS: Setup[] = [
  /* 1 */ { set: "s", a: P1A, b: C(fromT(G0, [0.5, 1.0, 1.4], 1.6), G0), fov: 34, fs: 8 },
  /* 2 */ { set: "d", tr: "in", a: C([RW[0] - 0.95, FY + 0.06, RW[2] + 0.45], [RW[0] + 0.05, FY + 0.03, RW[2]]), b: C([RW[0] - 0.8, FY + 0.09, RW[2] + 0.62], [RW[0] + 0.1, FY + 0.03, RW[2]]), fov: 26, fs: 2.8, up: [0.12, 1, 0],
            tags: [{ at: DX(0.5, FY + 0.03, 0.3), x: 620, y: 1330, cap: "FRANCHISE FEE", big: "RM0", sub: "blog sources (see EX40)", t: W(15) }] },
  /* 3 */ { set: "d", step: 1, a: C(fromT(CERTL, [0.3, 0.9, 0.6], 0.95), CERTL), b: C(fromT(CERTL, [0.12, 1, 0.3], 0.82), CERTL), fov: 30, fs: 5.6, up: [0, 1, 0], src: SRC_REG },
  /* 4 */ { set: "d", step: 1, a: C(fromT([CERT[0] + 0.07, FY, CERT[2] + 0.09], [0.2, 0.9, 0.5], 0.62), [CERT[0] + 0.07, FY, CERT[2] + 0.09]), b: C(fromT([CERT[0] + 0.07, FY, CERT[2] + 0.09], [0.1, 1, 0.42], 0.54), [CERT[0] + 0.07, FY, CERT[2] + 0.09]), fov: 26, fs: 4, src: SRC_REG },
  /* 5 */ { set: "d", step: 1, a: C([CLK[0] - 0.2, FY + 0.12, CLK[2] + 0.75], [CLK[0] - 0.12, FY + 0.05, CERT[2]]), b: C([CLK[0] - 0.15, FY + 0.14, CLK[2] + 0.68], [CLK[0], CLK[1], CLK[2]]), fov: 26, fs: 2.4, src: SRC_PR,
            fd: () => lerp(0.62, 0.7, on(30, 0.4, -0.2)), count: { v: () => "RM" + num(0, 50, W(29) - 0.3, W(29) + 0.2), unit: "food handler course · about half a day", t: W(28) } },
  /* 6 */ { set: "d", step: 2, a: C(fromT(VAX, [-0.2, 1.4, 0.6], 1.0), VAX), b: C(fromT(VAX, [-0.15, 1.0, 0.75], 0.78), VAX), fov: 26, fs: 4, up: [0, 1, 0] },
  /* 7 */ { set: "d", step: 2, a: C([VD[0] + 0.24, FY + 0.2, VD[2] + 0.9], DX(0.26, FY + 0.03, 0.06)), b: C([VD[0] + 0.3, FY + 0.26, VD[2] + 1.1], DX(0.27, FY + 0.03, 0.06)), fov: 30, fs: 4, src: SRC_PR,
            count: { v: () => "RM50–RM120", unit: "typhoid jab (clinics vary)", t: W(41) } },
  /* 8 */ { set: "d", step: 2, a: C(fromT(RING, [0.5, 1.2, 0.8], 0.75), RING), b: C(fromT(RING, [0.3, 1.4, 0.5], 0.62), RING), fov: 30, fs: 5.6,
            tags: [{ at: [RING[0], FY + 0.01, RING[2] - 0.13], x: 640, y: 1330, cap: "RENEW", big: "every 3 years", t: W(47) }] },
  /* 9 */ { set: "d", step: 3, a: C([LIC[0] - 0.05, FY + 0.38, LIC[2] + 0.55], [LIC[0], FY, LIC[2]]), b: C([LIC[0], FY + 0.5, LIC[2] + 0.42], [LIC[0], FY, LIC[2]]), fov: 26, fs: 4, src: SRC_REG,
            note: "both are required by law: fine up to RM10,000" },
  /* 10 */ { set: "c", step: 3, tr: "out", a: C([VC[0] + 1.5, 1.2, VC[2] + 17], [VC[0], 5.4, VC[2]]), b: C([VC[0] + 3.5, 2.4, VC[2] + 21], [VC[0], 5.0, VC[2]]), fov: 34, fs: 8, note: "a council building: an illustration" },
  /* 11 */ { set: "d", step: 3, tr: "in", a: C(fromT([PHONE[0], FY + 0.06, PHONE[2]], [-0.25, 0.55, 1], 0.42), [PHONE[0], FY + 0.06, PHONE[2]]), b: C(fromT([PHONE[0], FY + 0.06, PHONE[2]], [-0.18, 0.5, 1], 0.32), [PHONE[0], FY + 0.06, PHONE[2]]), fov: 26, fs: 2.8, src: SRC_DB, note: "screen: an illustration" },
  /* 12 */ { set: "d", step: 3, a: C([VD[0] + 0.3, FY + 0.35, VD[2] + 0.75], [VD[0] + 0.26, FY + 0.34, WALLZ]), b: C([VD[0] + 0.27, FY + 0.36, VD[2] + 0.62], [VD[0] + 0.26, FY + 0.34, WALLZ]), fov: 30, fs: 5.6 },
  /* 13 */ { set: "d", step: 3, a: C([MONTH(5)[0] - 0.14, MONTH(5)[1] + 0.03, WALLZ + 0.62], MONTH(5)), b: C([MONTH(5)[0] - 0.06, MONTH(5)[1], WALLZ + 0.52], MONTH(5)), fov: 26, fs: 2.8, src: "Malaysia Gazette, 21 May 2025",
            tags: [{ at: MONTH(5), x: 640, y: 1330, cap: "DBKL WINDOW", big: "1–30 Jun 2025", sub: "results in August", t: W(82) }] },
  /* 14 */ { set: "v", step: 4, tr: "out", a: C([VV[0] + 3.0, 2.2, VV[2] + 4.0], [VV[0] + 0.35, 0.8, VV[2]]), b: C([VV[0] + 2.4, 1.6, VV[2] + 3.3], [VV[0] + 0.4, 0.9, VV[2]]), fov: 30, fs: 5.6 },
  /* 15 */ { set: "v", step: 4, a: C([VV[0] + 2.2, 1.6, VV[2] + 3.6], [VV[0] + 0.3, 1.3, VV[2]]), b: C([VV[0] + 1.6, 3.0, VV[2] + 4.4], [VV[0] + 0.35, 1.3, VV[2]]), fov: 30, fs: 5.6, src: "blog and forum estimates (EX40)",
            tags: [{ at: [CART2[0] + 0.05, 0.62, CART2[2] + 0.53], x: 70, y: 1330, cap: "CART + STOCK", big: "a few thousand ringgit", t: W(99) }] },
  /* 16 */ { set: "d", tr: "in", a: C(DX(0.05, FY + 1.7, 1.25), DX(0, FY, 0.29)), b: C(DX(0.02, FY + 1.55, 1.12), DX(0, FY, 0.29)), fov: 26, fs: 5.6,
            count: { v: () => "~RM200", unit: "course + jab + licence fee (council fees vary)", t: W(109) - 0.2 }, note: "an estimate: course ≈ RM50, jab RM50–120" },
  /* 17 */ { set: "s", tr: "out", a: C([SX + 15, 16, SZ + 26], SL0), b: P1A, fov: 34, fs: 8 },
];
function World({ n }: { n: number }) {
  const s = SETUPS[n - 1].set;
  if (s === "s") return <StreetSet41 />;
  if (s === "d") return <DeskSet n={n} />;
  if (s === "c") return <CouncilSet />;
  return <CartSet n={n} />;
}
