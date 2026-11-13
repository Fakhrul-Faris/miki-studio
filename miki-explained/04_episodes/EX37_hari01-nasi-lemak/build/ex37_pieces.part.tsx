// =====================================================================================================================
// EX37 pieces — the nasi lemak stall (the one real-coloured subject, the warm light), its price board, the inflation
// level along the signboards, the mamak's board, the town's "average" plane. Times from audio/vo_timeline.json (Nathan).
// =====================================================================================================================
const WT = (VO as any).words as Record<string, [string, number][]>;
const at = (L: string, frag: string, n = 0) => WT[L].filter((x) => x[0].toLowerCase().includes(frag.toLowerCase()))[n][1];
const TT = {
  y2011: at("L01", "2011"), now: at("L01", "Now"), p368: at("L01", "RM3.68"), infl: at("L02", "Inflation"), p29: at("L02", "29"),
  p81: at("L03", "81"), roti: at("L03", "Roti"), p71: at("L03", "71"), avg: at("L06", "average"), yours: at("L06", "yours"),
  its: at("L04", "Its"), p739: at("L04", "RM7.39"), p1154: at("L04", "RM11.54"), in5: at("L05", "In"), half: at("L05", "half"), inf6: at("L06", "Inflation"),
  still: at("L07", "Still"), more: at("L08", "more"),
};
const SX = 2.3, SZ = 3.3;                    // the stall: on the road shoulder in front of unit 0, facing the street (+z)
const LEAF = "#3e7b4f", PAPERC = "#e7d7b8", SAMBAL = "#a3321f", RED = "#d9452b", WARM = "#ffc77a";
const Y0 = 2.6, PER = 0.05;                  // price boards start at 2.6 m; 5 cm per percentage point → +29 % lands on the signboard line (4.05)
const lvl = (pct: number) => Y0 + pct * PER;
const Txt = ({ s, p, size, c = "#1b1d22", rx = 0, ry = 0, name }: { s: string; p: [number, number, number]; size: number; c?: string; rx?: number; ry?: number; name?: string }) =>
  <Mesh3d name={name} castShadow={false} transform={Transform.fromXyz(...p).withRotation(Quat.fromEuler("XYZ", rx, ry, 0))}><Text3D size={size} depth={0.01}>{s}</Text3D><StandardMaterial base_color={c} unlit /></Mesh3d>;

// one bungkus: banana leaf skirt, brown-paper pyramid, a crease
function Bungkus({ p, r = 0, id }: { p: [number, number, number]; r?: number; id: string }) {
  return <>
    <Mesh3d key={`${id}l`} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromRotationY(r + 0.4))} shape={so().bkLeaf}><Flat c={LEAF} r={0.6} /></Mesh3d>
    <Mesh3d key={`${id}p`} transform={Transform.fromXyz(p[0], p[1] + 0.011, p[2]).withRotation(Quat.fromRotationY(r))} shape={so().bkPaper}><Flat c={PAPERC} r={0.85} /></Mesh3d>
  </>;
}

function Stall({ t }: { t: number }) {
  const P: any[] = [];
  P.push(<Model key="tb" src={S("small_wooden_table_01/small_wooden_table_01.gltf")} position={[SX, 0.0, SZ]} scale={[1.6, 1.25, 1.3]} />);
  const top = 0.95;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) P.push(<Bungkus key={`bk${r}${c}`} id={`bk${r}${c}`} p={[SX - 0.45 + c * 0.19, top, SZ + 0.15 - r * 0.17]} r={(r * 4 + c) * 0.37} />);
  P.push(<Model key="pot" src={S("pot_enamel_01/pot_enamel_01.gltf")} position={[SX + 0.55, top, SZ - 0.05]} scale={[2.2, 2.2, 2.2]} />);   // rice
  P.push(<Model key="pot2" src={S("pot_enamel_01/pot_enamel_01.gltf")} position={[SX + 0.55, top, SZ + 0.32]} scale={[1.4, 1.4, 1.4]} />);   // sambal
  P.push(<Mesh3d key="smb" transform={Transform.fromXyz(SX + 0.55, top + 0.13, SZ + 0.32)}><Cylinder radius={0.075} half_height={0.01} /><Flat c={SAMBAL} r={0.5} /></Mesh3d>);
  P.push(<Model key="th" src={S("plastic_thermos/plastic_thermos.gltf")} position={[SX - 0.7, top, SZ - 0.25]} scale={[1.4, 1.4, 1.4]} />);
  P.push(<Model key="wb" src={S("wicker_basket_01/wicker_basket_01.gltf")} position={[SX - 0.2, top, SZ - 0.44]} scale={[0.9, 0.9, 0.9]} />);
  for (let e = 0; e < 6; e++) P.push(<Mesh3d key={`eg${e}`} transform={Transform.fromXyz(SX - 0.29 + (e % 3) * 0.05, top + 0.09, SZ - 0.47 + Math.floor(e / 3) * 0.06).withScale([1, 1.25, 1])}><Sphere radius={0.025} /><Flat c="#f2ecdf" r={0.5} /></Mesh3d>);
  P.push(<Model key="gas" src={S("small_lpg_tank/small_lpg_tank.gltf")} position={[SX - 1.05, 0.0, SZ - 0.35]} scale={[1.2, 1.2, 1.2]} />);
  P.push(<Model key="cb" src={S("wooden_cutting_board/wooden_cutting_board.gltf")} position={[SX - 0.2, top, SZ + 0.35]} scale={[1.2, 1.2, 1.2]} />);
  // the canopy: a big stall umbrella on a pole; the bulb hangs under it (the warm light of the street)
  P.push(<Mesh3d key="umb" transform={Transform.fromXyz(SX, 2.55, SZ)} shape={so().umbrella}><StandardMaterial base_color="#2f7a5a" perceptual_roughness={0.7} /></Mesh3d>);
  for (let s = 0; s < 8; s++) P.push(<B key={`us${s}`} p={[SX + Math.cos(s * Math.PI / 4) * 0.62, 2.28, SZ + Math.sin(s * Math.PI / 4) * 0.62]} s={[0.05, 0.02, 1.25]} rot={[0.42, -s * Math.PI / 4 + Math.PI / 2, 0]}><Flat c="#f2ece0" r={0.7} /></B>);
  P.push(<Mesh3d key="upole" transform={Transform.fromXyz(SX + 0.95, 1.3, SZ + 0.05)}><Cylinder radius={0.025} half_height={1.3} /><Flat c="#7a7d84" r={0.4} /></Mesh3d>);
  P.push(<Mesh3d key="bulb" transform={Transform.fromXyz(SX, 2.05, SZ)}><Sphere radius={0.06} /><StandardMaterial base_color="#fff3d6" emissive={glow("#ffd59a", 18)} /></Mesh3d>);
  P.push(<Mesh3d key="cord" transform={Transform.fromXyz(SX, 2.3, SZ)}><Cylinder radius={0.005} half_height={0.22} /><Flat c="#222" /></Mesh3d>);
  // seats: two red plastic stools, a wooden one
  for (const [x, z, r, red] of [[SX - 1.25, SZ + 0.5, 0.4, 1], [SX + 1.35, SZ + 0.7, -0.5, 1], [SX - 1.0, SZ - 0.5, 0.9, 0]] as [number, number, number, number][])
    P.push(red ? <Model key={`st${x}`} src={S("plastic_monobloc_chair_01/plastic_monobloc_chair_01.gltf")} position={[x, 0.0, z]} rotation={[0, r, 0]}><StandardMaterial base_color="#c8352b" perceptual_roughness={0.45} /></Model>
               : <Model key={`st${x}`} src={S("wooden_stool_01/wooden_stool_01.gltf")} position={[x, 0.0, z]} rotation={[0, r, 0]} />);
  // HARI 1/30 on a standing chalkboard on the five-foot way (frame 0)
  { const cx0 = SX - 1.75, cz0 = SZ + 0.9, ry = 0.45, lean = -0.16;   // an A-frame chalk sign at the stall's front, facing the street and the camera
    const q = Quat.fromEuler("XYZ", lean, ry, 0), F = (d: [number, number, number]) => { const v = Quat.mulVec3(q, d); return [cx0 + v[0], v[1], cz0 + v[2]] as [number, number, number]; };
    P.push(<Mesh3d key="cf" transform={Transform.fromXyz(...F([0, 0.62, 0])).withRotation(q)}><Cuboid half_size={[0.36, 0.5, 0.02]} /><Flat c="#6b4a2e" r={0.6} /></Mesh3d>);
    P.push(<Mesh3d key="cs" transform={Transform.fromXyz(...F([0, 0.64, 0.022])).withRotation(q)}><Cuboid half_size={[0.31, 0.43, 0.004]} /><Flat c="#26332d" r={0.8} /></Mesh3d>);
    P.push(<Mesh3d key="cb2" transform={Transform.fromXyz(cx0 - Math.sin(ry) * 0.25, 0.6, cz0 - Math.cos(ry) * 0.25).withRotation(Quat.fromEuler("XYZ", -lean, ry, 0))}><Cuboid half_size={[0.36, 0.5, 0.02]} /><Flat c="#5a3d26" r={0.6} /></Mesh3d>);
    P.push(<Mesh3d key="h1" castShadow={false} transform={Transform.fromXyz(...F([0, 0.82, 0.03])).withRotation(q)}><Text3D size={0.15} depth={0.005}>HARI</Text3D><StandardMaterial base_color="#f4f1e8" unlit /></Mesh3d>);
    P.push(<Mesh3d key="h2" castShadow={false} transform={Transform.fromXyz(...F([0, 0.6, 0.03])).withRotation(q)}><Text3D size={0.19} depth={0.005}>1/30</Text3D><StandardMaterial base_color="#f4f1e8" unlit /></Mesh3d>);
    P.push(<Mesh3d key="h3" castShadow={false} transform={Transform.fromXyz(...F([0, 0.36, 0.03])).withRotation(q)}><Text3D size={0.055} depth={0.005}>30 bisnes Malaysia</Text3D><StandardMaterial base_color="#d9d6cc" unlit /></Mesh3d>); }
  return <>{P}</>;
}

// the price boards on telescoping poles: the stall's (2011 RM2.03 → 2024 RM3.68; rises to +81 % on "81"), the mamak's (+71 %)
function Board({ id, x, z, y, c, glowK, lines, tag }: { id: string; x: number; z: number; y: number; c: string; glowK: number; lines: [string, number, string, number, number?][]; tag?: [string, string] }) {
  const P: any[] = [];
  P.push(<Mesh3d key={`${id}pl`} transform={Transform.fromXyz(x, Math.max(y, 0.02) / 2, z - 0.05)}><Cylinder radius={0.035} half_height={Math.max(y, 0.02) / 2} /><Flat c="#6d7077" r={0.4} /></Mesh3d>);
  P.push(<B key={`${id}bd`} p={[x, y + 0.42, z]} s={[1.5, 0.84, 0.08]}><StandardMaterial base_color={c} perceptual_roughness={0.5} emissive={glow("#fff0d0", glowK)} /></B>);
  // a text's content is fixed per part (raea): every variant is its own named part, shown by scale (row, visible 0..1)
  lines.forEach(([s, size, col, row, vis = 1], n) => P.push(<Mesh3d key={`${id}t${n}`} name={`${id}t${n}`} castShadow={false} transform={Transform.fromXyz(x, y + 0.66 - row * 0.27, z + 0.05).withScale([Math.max(vis, 0.001), Math.max(vis, 0.001), 1])}><Text3D size={size} depth={0.01}>{s}</Text3D><StandardMaterial base_color={col} unlit /></Mesh3d>));
  if (tag) P.push(<B key={`${id}tg`} p={[x + 1.05, y + 0.42, z + 0.02]} s={[0.62, 0.4, 0.05]}><Flat c={tag[1]} r={0.5} /></B>, <Txt key={`${id}tgt`} name={`${id}tgt`} s={tag[0]} p={[x + 1.05, y + 0.36, z + 0.06]} size={0.2} c="#ffffff" />);
  return <>{P}</>;
}

// the inflation level: one cool line running along every signboard at +29 %, labelled on the left
function Level({ t, y, w = 60 }: { t: number; y: number; w?: number }) {
  const u = k(t, TT.infl - 0.1, TT.p29 + 0.3), L = UNITS.length * W, xm = UNITS[0] * W + L / 2; w = L;   // the line runs the whole row
  return <>
    <B key="lvl" p={[xm, y, 2.62]} s={[Math.max(0.01, w * u), 0.05, 0.05]}><StandardMaterial base_color="#cfe0ff" emissive={glow("#a9c4ff", 3)} /></B>
    {(() => { const g = Math.max(0.001, k(t, TT.p29 - 0.2, TT.p29 + 0.2)); return <Mesh3d key="lvlt" name="lvlt" castShadow={false} transform={Transform.fromXyz(SX - 0.3, y + 0.26, 2.66).withScale([g, g, 1])}><Text3D size={0.32} depth={0.01}>INFLATION +29%</Text3D><StandardMaterial base_color="#cfe0ff" unlit /></Mesh3d>; })()}
  </>;
}

// L04: inside exactly one thing — unit 0's shutter rolls up on the stall's back kitchen: the stove, the santan pot, its price label
function Kitchen({ t }: { t: number }) {
  const P: any[] = [], kz = -0.9, flip = t >= TT.p1154 - 0.1 ? 1 : 0;
  const KY = 0.3;   // the shop's floor height (raea: the counter passed 0.30 m into shophouse_A's floor)
  P.push(<B key="kc" p={[SX, 0.45+KY, kz]} s={[2.6, 0.9, 0.7]}><Flat c="#8a6a4a" r={0.6} /></B>);                       // the counter (real colour: the subject's kitchen)
  P.push(<B key="kt" p={[SX, 0.92+KY, kz]} s={[2.7, 0.05, 0.75]}><Flat c="#b9bdb8" r={0.35} /></B>);                     // steel top
  P.push(<B key="ks" p={[SX - 0.5, 1.0+KY, kz]} s={[0.7, 0.1, 0.5]}><Flat c="#2b2b2b" r={0.4} /></B>);                  // the gas stove
  P.push(<Mesh3d key="kf" transform={Transform.fromXyz(SX - 0.5, 1.06+KY, kz)}><Cylinder radius={0.12} half_height={0.01} /><StandardMaterial base_color="#3f7bff" emissive={glow("#4f8bff", 3)} /></Mesh3d>);
  P.push(<Model key="kp" src={S("pot_enamel_01/pot_enamel_01.gltf")} position={[SX - 0.5, 1.07+KY, kz]} scale={[3.2, 3.2, 3.2]} />);   // the santan pot on the flame
  P.push(<Mesh3d key="km" transform={Transform.fromXyz(SX - 0.5, 1.38+KY, kz)}><Cylinder radius={0.16} half_height={0.01} /><Flat c="#f7f3ea" r={0.3} /></Mesh3d>);   // santan, white
  P.push(<Model key="kb" src={S("plastic_container/plastic_container.gltf")} position={[SX + 0.55, 0.95+KY, kz - 0.12]} scale={[1.6, 1.6, 1.6]} />);   // the santan tub
  P.push(<B key="kl" p={[SX + 0.55, 1.62+KY + 0.32, kz + 0.36]} s={[0.95, 0.62, 0.03]}><Flat c="#f6efe0" r={0.6} /></B>);      // its label, on the wall above
  for (const [s, y, size, c, vis] of [["SANTAN / kg", 1.82, 0.09, "#1b1d22", 1], ["RM7.39", 1.6, 0.2, "#1b1d22", 1 - flip], ["RM11.54", 1.6, 0.2, RED, flip], ["2011", 1.43, 0.07, "#5a5d66", 1 - flip], ["2024", 1.43, 0.07, "#5a5d66", flip]] as [string, number, number, string, number][])
    P.push(<Mesh3d key={`kl${s}`} name={`kl${s}`} castShadow={false} transform={Transform.fromXyz(SX + 0.55, y + KY + 0.32, kz + 0.39).withScale([Math.max(vis, 0.001), Math.max(vis, 0.001), 1])}><Text3D size={size} depth={0.006}>{s}</Text3D><StandardMaterial base_color={c} unlit /></Mesh3d>);
  for (const [x, c] of [[SX - 1.1, "#c9a06b"], [SX + 1.1, "#e2d8c3"]] as [number, string][]) P.push(<Model key={`kj${x}`} src={S("plastic_container/plastic_container.gltf")} position={[x, 0.95 + KY, kz - 0.22]} scale={[1.0, 1.0, 1.0]}><StandardMaterial base_color={c} /></Model>);
  P.push(<B key="kw" p={[SX, 1.5+KY, -1.8]} s={[4.0, 3.0, 0.1]}><Flat c="#5a4a3a" r={0.8} /></B>);                       // the back wall, warm-lit
  return <>{P}</>;
}
// L05: across the street, a hand truck stacked with crates of coconuts; on "half" the top half go; chalk: LATE 2024
const CX5 = SX + 4.0, CZ5 = AR + 9.4;
function Coconuts({ t }: { t: number }) {
  const P: any[] = [];
  P.push(<Model key="ht" src={S("hand_truck/hand_truck.gltf")} position={[CX5 - 0.85, 0.16, CZ5]} rotation={[0, 0.3, 0]} />);
  for (let c = 0; c < 2; c++) P.push(<Model key={`wc${c}`} src={S("wooden_crate_01/wooden_crate_01.gltf")} position={[CX5 + 0.1, 0.16 + c * 0.42, CZ5]} scale={[1.1, 1.0, 1.1]} />);
  let n = 0;
  for (let lay = 0; lay < 4; lay++) for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) {
    const top = lay >= 2, r = ((n * 7919) % 100) / 100, u = top ? k(t, TT.half - 0.3 + r * 0.4, TT.half + 0.1 + r * 0.4) : 0, s = Math.max(0.001, 1 - u);
    const y = 0.25 + (lay < 2 ? lay * 0.13 : 0.42 + (lay - 2) * 0.13) + 0.07;
    P.push(<Mesh3d key={`co${n}`} name={`co${n}`} transform={Transform.fromXyz(CX5 + 0.1 - 0.21 + i * 0.14, y, CZ5 - 0.14 + j * 0.14).withScale([s, s * 0.9, s])}><Sphere radius={0.068} /><StandardMaterial base_color={n % 2 ? "#6b4a2e" : "#7d5a38"} perceptual_roughness={0.85} /></Mesh3d>);
    n++;
  }
  P.push(<B key="cbd" p={[CX5 + 1.0, 0.75, CZ5 + 0.2]} s={[0.8, 0.6, 0.04]} rot={[0, -0.35, 0]}><Flat c="#2f3a33" r={0.85} /></B>);
  P.push(<Mesh3d key="cbt" castShadow={false} transform={Transform.fromXyz(CX5 + 1.0, 0.8, CZ5 + 0.23).withRotation(Quat.fromRotationY(-0.35))}><Text3D size={0.13} depth={0.005}>LATE 2024</Text3D><StandardMaterial base_color="#efede4" unlit /></Mesh3d>);
  P.push(<Mesh3d key="cbk" castShadow={false} transform={Transform.fromXyz(CX5 + 1.0, 0.63, CZ5 + 0.23).withRotation(Quat.fromRotationY(-0.35))}><Text3D size={0.08} depth={0.005}>KELAPA</Text3D><StandardMaterial base_color="#d9d6cc" unlit /></Mesh3d>);
  return <>{P}</>;
}
