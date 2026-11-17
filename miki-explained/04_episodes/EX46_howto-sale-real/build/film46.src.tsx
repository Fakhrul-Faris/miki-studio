
// ================= EX46 film: time hangs on the user's words (tl.json); camera, captions, board machinery from EX45 =================
const FPS = 30, OFF = 0, RFPS = 30, HUD = false;
const CAPS = (TL as any).caps as { L: string; w: string; key: boolean; t: number }[];
const DUR = (TL as any).dur as number, FRAMES = Math.round(DUR * RFPS);
const W = (i: number) => CAPS[i].t;
let T = 0;
const cl = (x: number) => Math.max(0, Math.min(1, x));
const ss = (t: number, a: number, b: number) => { const u = cl((t - a) / (b - a)); return u * u * (3 - 2 * u); };
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
const rnd = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const rotY = (r: number) => Quat.fromEuler("XYZ", 0, r, 0);
const lin = (a: number, b: number) => cl((T - a) / (b - a));
const sm = (a: number, b: number) => ss(T, a, b);
const glow = (hex: string, k: number) => LinearRgba.from(Srgba.hex(hex)).mul(k);
const sc3 = (s: number) => { const v = Math.max(0.001, s); return [v, v, v] as [number, number, number]; };
const TX = (n: string) => S(`tx/${n}.png`);
const G = (id: string) => S(`${id}/${id}_g.gltf`);
const eo = (x: number) => 1 - Math.pow(1 - cl(x), 5);
const onO = (i: number, d = 0.3, off = 0) => eo((T - (W(i) + off)) / d);
const BG = "#0d0e11", PAPER = "#f2f3f5", INK = "#1b1d22", MUTE = "#9aa0a8", RED = "#c8161d", RHOT = "#ff3b3b", WARM = "#ffd9a8", PINK = RED;
const PS = "'Public Sans', 'Helvetica Neue', Arial, sans-serif";
const TAB = { fontVariantNumeric: "tabular-nums" } as const;

// setup boundaries, each on a word (see episode.md shot list v2)
const ST = [0, W(5) - 0.1, W(7) - 0.1, W(10) - 0.1, W(16) - 0.1, W(20) - 0.1, W(23) - 0.1, W(28) - 0.1, W(42) - 0.1, W(55) - 0.1, W(61) - 0.1,
  W(69) - 0.1, W(72) - 0.1, W(76) - 0.1, W(80) - 0.1, W(93) - 0.15, W(95) - 0.1, W(99) - 0.1, W(110) - 0.1, W(115) - 0.1, W(126) - 0.1, W(132) - 0.1, W(136) - 0.1, DUR];
const NSET = ST.length - 1;

// ================= the sale tag (hero): a red card on a string, a separate "dari RM299" sticker, a strike line =================
// pivot = the hook point; the card hangs 2.5 cm below on its string. split: the sticker lifts off the card (cutaway).
function Tag({ k, p, ry = 0, sw = 0, swz = 0, split = 0, strike = 1, tex = "tag_front", sticker = true, flat = false, s = 1 }: { k: string; p: number[]; ry?: number; sw?: number; swz?: number; split?: number; strike?: number; tex?: string; sticker?: boolean; flat?: boolean; s?: number }) {
  const q = flat ? Quat.fromEuler("YXZ", ry, -Math.PI / 2, 0) : Quat.fromEuler("YXZ", ry, sw, swz), cy = flat ? 0 : -0.07;
  return (<Entity key={k} name={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(q).withScale(sc3(s))}>
    {flat ? null : <Mesh3d name={k + "str"} transform={Transform.fromXyz(0, -0.0125, 0)}><Cylinder radius={0.0005} half_height={0.0125} /><StandardMaterial base_color="#e9e4da" perceptual_roughness={0.8} /></Mesh3d>}
    <Mesh3d name={k + "cd"} transform={Transform.fromXyz(0, cy, 0)}><Cuboid half_size={[0.03, 0.045, 0.0005]} /><StandardMaterial base_color_texture={TX(tex)} perceptual_roughness={0.7} emissive={glow("#ff6a5a", 0.05)} emissive_texture={TX(tex)} /></Mesh3d>
    {sticker ? <Mesh3d name={k + "sk"} transform={Transform.fromXyz(0, cy + 0.011, 0.0007 + split * 0.014).withRotation(Quat.fromEuler("XYZ", -split * 0.18, 0, 0))}><Cuboid half_size={[0.024, 0.0085, 0.0002]} /><StandardMaterial base_color_texture={TX("was_sticker")} perceptual_roughness={0.5} emissive={glow("#ff6a5a", 0.06)} emissive_texture={TX("was_sticker")} /></Mesh3d> : null}
    {sticker ? <Mesh3d name={k + "ln"} transform={Transform.fromXyz(-0.021 + 0.021 * strike, cy + 0.011, 0.001 + split * 0.014).withScale([Math.max(0.001, strike), 1, 1])}><Cuboid half_size={[0.021, 0.0008, 0.0001]} /><StandardMaterial base_color="#ffffff" emissive={glow("#ffffff", 0.6)} /></Mesh3d> : null}
  </Entity>);
}
const swingOn = (i: number, a = 0.22, d = 2.4) => { const x = T - W(i); return x < 0 ? 0 : a * Math.exp(-x * 1.6) * Math.sin(x * 6.5) * (x < d ? 1 : 0); };

// ================= set "a": the shop aisle (steel shelves, boxed goods, fluorescent tube), the hero tag hangs on its hook =================
const SHB = [0.12, 0.62, 1.13, 1.64, 2.13];                // board tops (steel_frame_shelves_01 at 0.1 scale)
const HOOK = [0.0, 1.11, 0.3];                             // hero hook point
const TAGC = [HOOK[0], HOOK[1] - 0.07, HOOK[2]];          // the card's centre
const STK = [0.62, SHB[1], 0.12];                          // the stack of tags the stamp prints
function Aisle({ n }: { n: number }) {
  const P: any[] = [];
  P.push(<Mesh3d key="fl" transform={Transform.fromXyz(0, -0.02, 0)}><Cuboid half_size={[8, 0.02, 8]} /><StandardMaterial base_color="#0b0c0e" normal_map_texture={S("tex/floor_tiles_06_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([16, 16])} perceptual_roughness={0.18} /></Mesh3d>);
  for (const x of [-1.1, 0, 1.1]) P.push(<Model key={"sh" + x} src={G("steel_frame_shelves_01")} position={[x, 0, 0]} scale={[0.1, 0.1, 0.1]} />);
  // the back row (soft, out of focus): a second run across the aisle, seen in the wide
  for (const x of [-1.1, 0, 1.1]) P.push(<Model key={"bk" + x} src={G("steel_frame_shelves_01")} position={[x, 0, -1.9]} scale={[0.1, 0.1, 0.1]} />);
  // boxed goods: two per board, a little turned; the hero box sits behind the tag
  let i = 0;
  for (const by of [SHB[0], SHB[1], SHB[2], SHB[3]]) for (const x of [-1.35, -0.85, -0.2, 0.35, 0.85, 1.35]) {
    if (by === SHB[1] && Math.abs(x - 0.35) < 0.3) { i++; continue; }      // the stamp's spot stays clear
    if (by === SHB[1] && Math.abs(x + 0.2) < 0.01) { i++; continue; }      // the hero box goes here (below)
    P.push(<Model key={"bx" + i} src={G("cardboard_box_01")} position={[x, by, 0.02 + (rnd(i) - 0.5) * 0.06]} rotation={[0, (rnd(i + 9) - 0.5) * 0.3, 0]} scale={[0.9, 0.9, 0.9]} />);
    if (rnd(i + 3) > 0.45) P.push(<Mesh3d key={"bl" + i} transform={Transform.fromXyz(x, by + 0.16, 0.02 + (rnd(i) - 0.5) * 0.06 + 0.207).withRotation(rotY((rnd(i + 9) - 0.5) * 0.3))}><Cuboid half_size={[0.12, 0.09, 0.001]} /><StandardMaterial base_color_texture={TX("box_print")} perceptual_roughness={0.8} /></Mesh3d>);
    i++;
  }
  // the hero box (the air fryer the tag prices), front print facing the aisle
  P.push(<Model key="hbx" src={G("cardboard_box_01")} position={[0.0, SHB[1], 0.0]} scale={[1.05, 1.05, 1.05]} />);
  P.push(<Mesh3d key="hbl" transform={Transform.fromXyz(0.0, SHB[1] + 0.19, 0.31)}><Cuboid half_size={[0.16, 0.12, 0.001]} /><StandardMaterial base_color_texture={TX("box_print")} perceptual_roughness={0.8} /></Mesh3d>);
  // hook rail along the 1.13 board's lip + the hero's peg hook
  P.push(<Mesh3d key="rail" transform={Transform.fromXyz(0, SHB[2] - 0.01, 0.262)}><Cuboid half_size={[1.65, 0.012, 0.004]} /><StandardMaterial base_color="#7d828b" metallic={0.6} perceptual_roughness={0.35} /></Mesh3d>);
  P.push(<Mesh3d key="peg" transform={Transform.fromXyz(HOOK[0], HOOK[1], 0.28).withRotation(Quat.fromEuler("XYZ", Math.PI / 2, 0, 0))}><Cylinder radius={0.0018} half_height={0.022} /><StandardMaterial base_color="#c3c7ce" metallic={0.7} perceptual_roughness={0.25} /></Mesh3d>);
  // more tags along the rail (plain prices, out of focus): the hero is one of many
  [-0.9, -0.55, 0.45, 0.8, 1.25].forEach((x, j) => P.push(<Tag key={"ot" + j} k={"ot" + j} p={[x, HOOK[1], HOOK[2] - 0.01]} sw={Math.sin(T * 1.1 + j) * 0.03} ry={(rnd(j + 40) - 0.5) * 0.5} tex="tag_blank" sticker={false} />));
  // the hero tag: strike draws at frame 0; swings on "untung"; turns side-on and splits on "RM299" (n 5–6)
  const strike = n === 1 ? eo((T - 0.35) / 1.1) : 1;
  const turn = n === 5 ? eo((T - (W(16) - 0.15)) / 0.6) : n === 6 ? 1 : 0, split = n === 5 ? eo((T - (W(16) + 0.25)) / 0.6) : n === 6 ? 1 : 0;
  const swing = (n <= 4 ? swingOn(10) + swingOn(7, 0.08) : 0) + Math.sin(T * 0.9) * 0.015;
  P.push(<Tag key="hero" k="hero" p={HOOK} sw={swing} swz={swing * 0.3} ry={turn * -1.1} split={split} strike={strike} />);
  // the stamp and the stack (n 7): it comes down on "reka", prints, lifts; ink dust puffs
  const down = n === 7 ? eo((T - (W(23) - 0.25)) / 0.25) * (1 - eo((T - (W(23) + 0.2)) / 0.4)) : 0;
  for (let j = 0; j < 9; j++) P.push(<Tag key={"sk" + j} k={"st" + j} p={[STK[0] + (rnd(j) - 0.5) * 0.008, STK[1] + 0.001 + j * 0.0011, STK[2] + (rnd(j + 2) - 0.5) * 0.008]} ry={(rnd(j + 5) - 0.5) * 0.12} flat tex="tag_front" strike={0} />);
  P.push(<Mesh3d key="stp" name="stp" transform={Transform.fromXyz(STK[0], STK[1] + 0.0115, STK[2]).withRotation(Quat.fromEuler("YXZ", (rnd(13) - 0.5) * 0.12, -Math.PI / 2, 0)).withScale(sc3(n === 7 && T > W(23) ? 1 : 0))}><Cuboid half_size={[0.024, 0.0085, 0.0003]} /><StandardMaterial base_color_texture={TX("was_stamped")} perceptual_roughness={0.6} /></Mesh3d>);
  P.push(<Model key="stamp" src={S("parts/stamp.glb")} position={[STK[0], STK[1] + 0.012 + (1 - down) * 0.12, STK[2]]} scale={[0.22, 0.22, 0.22]} />);
  if (n === 7) for (let j = 0; j < 14; j++) { const x = T - W(23); const a = x > 0 && x < 0.9 ? (1 - x / 0.9) : 0, r = 0.03 + x * 0.09 * (0.6 + rnd(j));
    P.push(<Mesh3d key={"ink" + j} name={"ink" + j} transform={Transform.fromXyz(STK[0] + Math.cos(j * 2.4) * r, STK[1] + 0.02 + x * 0.05 * rnd(j + 1), STK[2] + Math.sin(j * 2.4) * r).withScale(sc3(a * (0.6 + rnd(j + 7))))}><Sphere radius={0.0025} /><StandardMaterial base_color={RED} emissive={glow(RHOT, 1.5)} /></Mesh3d>); }
  // the tube light over the aisle
  P.push(<Model key="fluo" src={G("mounted_fluorescent_lights")} position={[0, 2.7, 0.55]} />);
  return (<>{P}
    <RectLight transform={Transform.fromXyz(0, 2.6, 0.6).lookingAt([0, 0.9, 0.3])} intensity={26000} width={0.9} height={0.2} color="#e8eefc" range={6} />
    <SpotLight transform={Transform.fromXyz(0.5, 1.9, 1.3).lookingAt([TAGC[0], TAGC[1], TAGC[2]])} intensity={9000} outer_angle={0.32} inner_angle={0.12} color={WARM} shadows_enabled range={4} />
    <SpotLight transform={Transform.fromXyz(-0.9, 1.4, 1.2).lookingAt([0, 1.0, 0.2])} intensity={2600} outer_angle={0.6} inner_angle={0.3} color="#9db4e0" range={5} />
    <SpotLight transform={Transform.fromXyz(STK[0] + 0.3, STK[1] + 0.8, STK[2] + 0.6).lookingAt(STK as any)} intensity={5000} outer_angle={0.35} inner_angle={0.15} color={WARM} range={3} />
    <RectLight transform={Transform.fromXyz(0, 2.4, -1.4).lookingAt([0, 1, -1.9])} intensity={4000} width={2.4} height={0.3} color="#8fa6cf" range={4} />
    <PointLight transform={Transform.fromXyz(TAGC[0], TAGC[1] + 0.02, TAGC[2] + 0.12)} intensity={60} color="#ff4a4a" range={0.5} />
    <AmbientLight brightness={10} color="#b4bccb" />
    <Environment src={S("sky.hdr")} intensity={0.08} />
  </>);
}

// ================= set "c": the checkout counter (register, thermal printer that goes see-through, the receipt, a bag, the law card, the folder) =================
const CX = 30, CTOP = 0.92;
const PR = [CX + 0.18, CTOP, 0.1];                      // thermal printer base centre
const RC = [CX - 0.05, CTOP + 0.0012, 0.22];            // receipt lying on the counter (n 15+)
const TG = [CX + 0.12, CTOP + 0.0012, 0.24];            // the shelf tag lying beside it
const RROW = 0.07 - 0.14 * 0.205;                       // the 169.00 row, local z from the receipt's centre (top edge = -0.07)
function Counter({ n }: { n: number }) {
  const P: any[] = [];
  P.push(<Mesh3d key="cfl" transform={Transform.fromXyz(CX, -0.02, 0)}><Cuboid half_size={[6, 0.02, 6]} /><StandardMaterial base_color="#0b0c0e" normal_map_texture={S("tex/floor_tiles_06_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([12, 12])} perceptual_roughness={0.2} /></Mesh3d>);
  P.push(<Mesh3d key="cbd" transform={Transform.fromXyz(CX, CTOP / 2 - 0.01, 0)}><Cuboid half_size={[0.8, CTOP / 2 - 0.01, 0.4]} /><StandardMaterial base_color="#2a2c31" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} perceptual_roughness={0.6} /></Mesh3d>);
  P.push(<Mesh3d key="ctp" transform={Transform.fromXyz(CX, CTOP - 0.01, 0)}><Cuboid half_size={[0.84, 0.01, 0.44]} /><StandardMaterial base_color_texture={S("tex/marble_01_diff_1k.jpg")} base_color="#8a8d93" normal_map_texture={S("tex/marble_01_nor_gl_1k.jpg")} perceptual_roughness={0.25} /></Mesh3d>);
  // conveyor strip in front (dark rubber, ribbed)
  P.push(<Mesh3d key="cnv" transform={Transform.fromXyz(CX - 0.45, CTOP + 0.004, 0.05)}><Cuboid half_size={[0.32, 0.004, 0.3]} /><StandardMaterial base_color="#16171a" normal_map_texture={S("tex/concrete_tiles_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([1, 8])} perceptual_roughness={0.75} /></Mesh3d>);
  P.push(<Model key="reg" src={G("CashRegister_01")} position={[CX + 0.45, CTOP, -0.18]} rotation={[0, -0.45, 0]} />);
  // the hero box rides the conveyor in on "Step dua" (n 12)
  const ride = n === 12 ? eo((T - W(69)) / 0.9) : 1;
  P.push(<Model key="cbx" src={G("cardboard_box_01")} position={[CX - 0.75 + 0.3 * ride, CTOP + 0.008, -0.02]} rotation={[0, 0.2, 0]} scale={[0.85, 0.85, 0.85]} />);
  P.push(<Mesh3d key="cbl" transform={Transform.fromXyz(CX - 0.75 + 0.3 * ride + 0.035, CTOP + 0.17, 0.235).withRotation(rotY(0.2))}><Cuboid half_size={[0.13, 0.1, 0.001]} /><StandardMaterial base_color_texture={TX("box_print")} perceptual_roughness={0.8} /></Mesh3d>);
  // the thermal printer: dark body, its shell turns see-through on "kaunter" (n 13)
  const xr = n === 13 ? eo((T - W(72)) / 0.5) : n === 14 ? 1 - eo((T - (W(78) - 0.2)) / 0.5) : 0;
  const shell = <StandardMaterial base_color={Srgba.hex("#2b2d33").with_alpha(lerp(1, 0.14, xr))} alpha_mode="Blend" perceptual_roughness={0.45} metallic={0.2} />;
  P.push(<Mesh3d key="pb" name="pb" transform={Transform.fromXyz(PR[0], PR[1] + 0.045, PR[2])}><Cuboid half_size={[0.065, 0.045, 0.08]} />{shell}</Mesh3d>);
  P.push(<Mesh3d key="pl" name="pl" transform={Transform.fromXyz(PR[0], PR[1] + 0.094, PR[2] - 0.02).withRotation(Quat.fromEuler("XYZ", -0.15, 0, 0))}><Cuboid half_size={[0.066, 0.006, 0.062]} />{shell}</Mesh3d>);
  P.push(<Mesh3d key="pled" name="pled" transform={Transform.fromXyz(PR[0] + 0.045, PR[1] + 0.06, PR[2] + 0.081)}><Cuboid half_size={[0.004, 0.004, 0.001]} /><StandardMaterial base_color="#3ad17a" emissive={glow("#3ad17a", 3)} /></Mesh3d>);
  // inside: the paper roll (shows when see-through), turning while it prints
  const feed = n === 13 ? eo((T - W(74)) / 1.1) : n === 14 ? 1 : 0;
  P.push(<Mesh3d key="roll" name="roll" transform={Transform.fromXyz(PR[0], PR[1] + 0.045, PR[2] - 0.015).withRotation(Quat.fromEuler("XYZ", feed * 9, 0, Math.PI / 2))}><Cylinder radius={0.032} half_height={0.029} /><StandardMaterial base_color="#efede6" perceptual_roughness={0.6} /></Mesh3d>);
  // the receipt coming out of the slot (n 13–14): grows up out of the lid, top of the print first; n 14 it lifts toward the bag and stops
  const lift = n === 14 ? eo((T - W(76)) / 0.9) : 0;
  if (n === 13 || n === 14) { const L = Math.max(0.002, 0.14 * feed);
    P.push(<Mesh3d key="rcp" name="rcp" transform={Transform.fromXyz(PR[0] - 0.12 * lift, PR[1] + 0.1 + L / 2 + 0.06 * lift, PR[2] + 0.03 + 0.05 * lift).withRotation(Quat.fromEuler("XYZ", -0.35 + 0.25 * lift, 0.3 * lift, 0))}>
      <Cuboid half_size={[0.026, L / 2, 0.0003]} /><StandardMaterial base_color_texture={TX("receipt")} uv_transform={Affine2.fromScale([1, Math.max(0.02, feed)])} perceptual_roughness={0.6} emissive={glow("#ffffff", 0.08)} emissive_texture={TX("receipt")} /></Mesh3d>); }
  // the paper bag (kraft-grey), open at the top
  const bag = <StandardMaterial base_color="#6f6a61" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} perceptual_roughness={0.85} />;
  const BGP = [CX - 0.15, CTOP, -0.05];
  [[0, 0.15, 0.07, 0.12, 0.15, 0.002], [0, 0.15, -0.07, 0.12, 0.15, 0.002], [0.12, 0.15, 0, 0.002, 0.15, 0.07], [-0.12, 0.15, 0, 0.002, 0.15, 0.07], [0, 0.002, 0, 0.12, 0.002, 0.07]].forEach(([x, y, z, a, b, c], j) =>
    P.push(<Mesh3d key={"bg" + j} transform={Transform.fromXyz(BGP[0] + x, BGP[1] + y, BGP[2] + z)}><Cuboid half_size={[a, b, c]} />{bag}</Mesh3d>));
  // n 15+: the receipt and the shelf tag side by side on the counter; the 169 row lights; RM169 struck; RM149 stamped on "murah" (n 16)
  if (n >= 15) {
    P.push(<Mesh3d key="rcf" name="rcf" transform={Transform.fromXyz(RC[0], RC[1], RC[2]).withRotation(Quat.fromEuler("YXZ", 0.06, 0, 0))}><Cuboid half_size={[0.026, 0.0003, 0.07]} /><StandardMaterial base_color_texture={TX("receipt")} perceptual_roughness={0.6} emissive={glow("#ffffff", 0.06)} emissive_texture={TX("receipt")} /></Mesh3d>);
    const hl = n === 15 ? onO(84, 0.35, -0.05) : 1;
    P.push(<Mesh3d key="rhl" name="rhl" transform={Transform.fromXyz(RC[0], RC[1] + 0.0004, RC[2] - RROW).withRotation(rotY(0.06)).withScale([Math.max(0.001, hl), 1, 1])}><Cuboid half_size={[0.025, 0.0001, 0.0028]} /><StandardMaterial base_color={Srgba.hex(RED).with_alpha(0.28)} alpha_mode="Blend" emissive={glow(RHOT, 0.6)} /></Mesh3d>);
    const st = n === 16 ? eo((T - (W(93) - 0.1)) / 0.3) : n > 16 ? 1 : 0;
    P.push(<Mesh3d key="rst" name="rst" transform={Transform.fromXyz(RC[0] + 0.012 - 0.008 * (1 - st), RC[1] + 0.0006, RC[2] - RROW).withRotation(rotY(0.06)).withScale([Math.max(0.001, st), 1, 1])}><Cuboid half_size={[0.009, 0.0001, 0.0005]} /><StandardMaterial base_color={RED} emissive={glow(RHOT, 1.2)} /></Mesh3d>);
    const pr = n === 16 ? eo((T - W(93)) / 0.18) : n > 16 ? 1 : 0;
    P.push(<Mesh3d key="r149" name="r149" transform={Transform.fromXyz(RC[0] + 0.006, RC[1] + 0.0007, RC[2] - RROW + 0.011).withRotation(Quat.fromEuler("YXZ", 0.06, -Math.PI / 2, 0)).withScale(sc3(pr))}><Cuboid half_size={[0.017, 0.0075, 0.0001]} /><StandardMaterial base_color_texture={TX("stamp149")} alpha_mode="Blend" emissive={glow(RHOT, 0.5)} emissive_texture={TX("stamp149")} /></Mesh3d>);
    P.push(<Tag key="ctag" k="ctag" p={TG} ry={-0.12} flat />);
    // the stamp drops on the receipt on "murah" (n 16)
    const down = n === 16 ? eo((T - (W(93) - 0.25)) / 0.22) * (1 - eo((T - (W(93) + 0.15)) / 0.35)) : 0;
    P.push(<Model key="cstamp" src={S("parts/stamp.glb")} position={[RC[0] + 0.006, RC[1] + 0.001 + (1 - down) * 0.14 + (n === 16 ? 0 : 0.5), RC[2] - RROW + 0.011]} scale={[0.15, 0.15, 0.15]} />);
    if (n === 16) for (let j = 0; j < 16; j++) { const x = T - W(93); const a = x > 0 && x < 0.8 ? 1 - x / 0.8 : 0, r = 0.02 + x * 0.08 * (0.6 + rnd(j + 50));
      P.push(<Mesh3d key={"cd" + j} name={"cd" + j} transform={Transform.fromXyz(RC[0] + Math.cos(j * 2.4) * r, RC[1] + 0.01 + x * 0.04 * rnd(j + 51), RC[2] - RROW + Math.sin(j * 2.4) * r).withScale(sc3(a * (0.5 + rnd(j + 52))))}><Sphere radius={0.002} /><StandardMaterial base_color="#e8e4dc" emissive={glow("#ffffff", 0.4)} /></Mesh3d>); }
  }
  // the law card on its acrylic stand (n 17)
  P.push(<Entity key="law" transform={Transform.fromXyz(CX - 0.32, CTOP, 0.2).withRotation(rotY(0.25))}>
    <Mesh3d name="lawc" transform={Transform.fromXyz(0, 0.065, 0).withRotation(Quat.fromEuler("XYZ", -0.2, 0, 0))}><Cuboid half_size={[0.09, 0.06, 0.0008]} /><StandardMaterial base_color_texture={TX("lawcard")} perceptual_roughness={0.5} emissive={glow("#ffffff", 0.1)} emissive_texture={TX("lawcard")} /></Mesh3d>
    <Mesh3d name="laws" transform={Transform.fromXyz(0, 0.004, -0.012)}><Cuboid half_size={[0.08, 0.004, 0.025]} /><StandardMaterial base_color={Srgba.hex("#cfe3ff").with_alpha(0.25)} alpha_mode="Blend" perceptual_roughness={0.05} /></Mesh3d></Entity>);
  // the folder (n 18–19): tag photo + receipt slide in on "simpan"
  const FO = [CX + 0.35, CTOP + 0.004, 0.24];
  P.push(<Mesh3d key="fol" transform={Transform.fromXyz(FO[0], FO[1], FO[2]).withRotation(rotY(-0.1))}><Cuboid half_size={[0.115, 0.004, 0.16]} /><StandardMaterial base_color="#a7a294" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} perceptual_roughness={0.8} /></Mesh3d>);
  P.push(<Mesh3d key="foll" transform={Transform.fromXyz(FO[0], FO[1] + 0.0045, FO[2] - 0.11).withRotation(rotY(-0.1))}><Cuboid half_size={[0.07, 0.0003, 0.02]} /><StandardMaterial base_color_texture={TX("folder_label")} perceptual_roughness={0.7} /></Mesh3d>);
  if (n === 19) { const u = eo((T - W(113)) / 0.6);
    P.push(<Mesh3d key="fpr" name="fpr" transform={Transform.fromXyz(lerp(RC[0], FO[0] - 0.03, u), FO[1] + 0.006, lerp(RC[2], FO[2] + 0.03, u)).withRotation(rotY(lerp(0.06, -0.1, u)))}><Cuboid half_size={[0.026, 0.0003, 0.07]} /><StandardMaterial base_color_texture={TX("receipt")} perceptual_roughness={0.6} /></Mesh3d>); }
  // red spill at the stamp moment (the one red flash)
  const fl = n === 16 ? Math.max(0, 1 - Math.abs(T - W(93)) / 0.35) : 0;
  return (<>{P}
    <RectLight transform={Transform.fromXyz(CX, CTOP + 1.1, 0.35).lookingAt([CX, CTOP, 0.1])} intensity={22000} width={1.0} height={0.35} color={WARM} range={4} />
    <SpotLight transform={Transform.fromXyz(CX + 0.6, CTOP + 0.9, 0.9).lookingAt([CX, CTOP, 0.15])} intensity={7000} outer_angle={0.45} inner_angle={0.2} color="#ffe6c8" shadows_enabled range={4} />
    <SpotLight transform={Transform.fromXyz(CX - 1.0, CTOP + 0.7, 0.8).lookingAt([CX, CTOP, 0.1])} intensity={2200} outer_angle={0.5} inner_angle={0.2} color="#9db4e0" range={5} />
    <RectLight transform={Transform.fromXyz(CX, 2.2, -1.5).lookingAt([CX, 1, -1])} intensity={3000} width={2} height={0.4} color="#8fa6cf" range={4} />
    <PointLight transform={Transform.fromXyz(RC[0], RC[1] + 0.08, RC[2] - RROW)} intensity={900 * fl} color="#ff3b3b" range={1.2} />
    <AmbientLight brightness={10} color="#b4bccb" />
    <Environment src={S("sky.hdr")} intensity={0.08} />
  </>);
}

// ================= set "f": the fine (a void: the document on a lit floor, the tag beside it) =================
const FX = 60;
function Fine({ n }: { n: number }) {
  const up = eo((T - (ST[19] + 0.05)) / 0.5);
  return (<>
    <Mesh3d key="ffl" transform={Transform.fromXyz(FX, -0.02, 0)}><Cuboid half_size={[4, 0.02, 4]} /><StandardMaterial base_color="#101115" normal_map_texture={S("tex/concrete_tiles_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([6, 6])} perceptual_roughness={0.3} /></Mesh3d>
    <Mesh3d key="fdoc" name="fdoc" transform={Transform.fromXyz(FX, 0.002 + 0.06 * (1 - up), 0).withRotation(Quat.fromEuler("YXZ", 0.08 - 0.2 * (1 - up), 0, 0))}><Cuboid half_size={[0.105, 0.0006, 0.145]} /><StandardMaterial base_color_texture={TX("fine_doc")} perceptual_roughness={0.6} emissive={glow("#ffffff", 0.08)} emissive_texture={TX("fine_doc")} /></Mesh3d>
    <Tag key="ftag" k="ftag" p={[FX + 0.15, 0.0025, 0.1]} ry={0.5} flat />
    <SpotLight transform={Transform.fromXyz(FX + 0.2, 0.9, 0.5).lookingAt([FX, 0, 0])} intensity={9000} outer_angle={0.4} inner_angle={0.15} color={WARM} shadows_enabled range={3} />
    <PointLight transform={Transform.fromXyz(FX + 0.15, 0.05, 0.12)} intensity={120} color="#ff3b3b" range={0.6} />
    <AmbientLight brightness={8} color="#b4bccb" />
    <Environment src={S("sky.hdr")} intensity={0.06} />
  </>);
}

// ================= set "w": a wall of 50% tags (pegboard), each swings once on "50%" =================
const WX = 90, WROWS = 6, WCOLS = 5;
function Wall({ n }: { n: number }) {
  const P: any[] = [];
  P.push(<Mesh3d key="wfl" transform={Transform.fromXyz(WX, -0.02, 0)}><Cuboid half_size={[4, 0.02, 4]} /><StandardMaterial base_color="#0b0c0e" perceptual_roughness={0.2} /></Mesh3d>);
  P.push(<Mesh3d key="wpb" transform={Transform.fromXyz(WX, 1.1, -0.01)}><Cuboid half_size={[0.75, 0.75, 0.008]} /><StandardMaterial base_color="#2c2f35" normal_map_texture={S("tex/concrete_tiles_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([3, 3])} perceptual_roughness={0.6} /></Mesh3d>);
  for (let r = 0; r < WROWS; r++) for (let c = 0; c < WCOLS; c++) { const i = r * WCOLS + c, x = WX - 0.6 + c * 0.3 + (r % 2) * 0.05, y = 1.72 - r * 0.24;
    const sw = swingOn(131, 0.18) * (T > W(131) + (rnd(i) * 0.25) ? 1 : 0) + Math.sin(T * 1.2 + i) * 0.012;
    P.push(<Mesh3d key={"wp" + i} transform={Transform.fromXyz(x, y, 0.012).withRotation(Quat.fromEuler("XYZ", Math.PI / 2, 0, 0))}><Cylinder radius={0.0016} half_height={0.012} /><StandardMaterial base_color="#c3c7ce" metallic={0.7} perceptual_roughness={0.25} /></Mesh3d>);
    P.push(<Tag key={"wt" + i} k={"wt" + i} p={[x, y, 0.024]} sw={sw} swz={sw * 0.4} ry={(rnd(i + 20) - 0.5) * 0.3} tex="tag_50" sticker={false} s={1.6} />); }
  return (<>{P}
    <RectLight transform={Transform.fromXyz(WX, 2.6, 1.2).lookingAt([WX, 1.1, 0])} intensity={14000} width={1.6} height={0.3} color="#f0f3ff" range={5} />
    <SpotLight transform={Transform.fromXyz(WX + 0.9, 1.6, 1.4).lookingAt([WX, 1.1, 0])} intensity={4000} outer_angle={0.5} inner_angle={0.2} color={WARM} shadows_enabled range={4} />
    <AmbientLight brightness={10} color="#b4bccb" />
    <Environment src={S("sky.hdr")} intensity={0.08} />
  </>);
}

//@@PHONE@@
// ================= the phone screens (W2): step rail, screenshot, compare, price chart =================
const roll = (from: number, to: number, u: number, d = 0) => lerp(from, to, eo(u)).toFixed(d);
function Steps({ n }: { n: number }) {
  const R = [["Screenshot harga", "sebelum sale start"], ["Semak resit", "di kaunter"], ["Report KPDN", "gambar tag + resit"]];
  return (<div style={{ position: "absolute", left: 100, top: 520, width: 880, fontFamily: PS }}>
    {R.map(([t, s], i) => { const v = onO(39, 0.4, -0.25 + i * 0.12), lit = onO(39 + Math.min(i, 2), 0.25, 0.1);
      return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 40, padding: "30px 0", borderTop: i ? "2px solid rgba(255,255,255,0.12)" : "none", opacity: v, transform: `translateY(${(1 - v) * 26}px)` }}>
        <div style={{ width: 120, height: 120, borderRadius: 60, background: lit > 0.5 ? RED : "rgba(255,255,255,0.08)", fontSize: 76, fontWeight: 800, lineHeight: "120px", color: "#fff", textAlign: "center", transform: `scale(${0.9 + 0.1 * lit})` }}>{i + 1}</div>
        <div><div style={{ fontSize: 58, fontWeight: 700, color: "#fff" }}>{t}</div><div style={{ fontSize: 36, color: MUTE, marginTop: 6 }}>{s}</div></div></div>); })}
  </div>);
}
function ProductPage({ price, was, date, sale = false }: { price: string; was?: string; date: string; sale?: boolean }) {
  return (<div style={{ padding: "60px 56px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, color: MUTE, ...TAB }}><span>{date}</span><span>●●● 82%</span></div>
    <div style={{ marginTop: 40, borderRadius: 36, overflow: "hidden", background: "#d9dbe0", height: 560, display: "flex", alignItems: "center", justifyContent: "center" }}><img src={TX("box_print")} style={{ width: "92%" }} /></div>
    <div style={{ fontSize: 50, fontWeight: 700, marginTop: 40 }}>Penggoreng udara 5L</div>
    {sale ? <div style={{ display: "inline-block", marginTop: 24, padding: "8px 20px", borderRadius: 12, background: RED, color: "#fff", fontSize: 38, fontWeight: 800 }}>11.11 SALE</div> : null}
    <div style={{ display: "flex", alignItems: "baseline", gap: 26, marginTop: 20 }}>
      <div style={{ fontSize: 120, fontWeight: 800, color: sale ? RED : INK, ...TAB }}>{price}</div>
      {was ? <div style={{ fontSize: 56, color: MUTE, textDecoration: "line-through", ...TAB }}>{was}</div> : null}</div>
    <div style={{ marginTop: 30, height: 110, borderRadius: 55, background: INK, color: "#fff", fontSize: 44, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>Tambah ke troli</div>
  </div>);
}
function Shot({ n }: { n: number }) {
  // the product page at its normal price (3 Nov); shutter on "screenshot"; the page shrinks into the gallery on "Simpan"
  const fl = Math.max(0, 1 - Math.abs(T - (W(47) + 0.05)) / 0.12), g = onO(52, 0.6, -0.1);
  return (<>
    <div style={{ position: "absolute", left: lerp(110, 90, g), top: lerp(380, 1060, g), width: 860, transformOrigin: "0 0", transform: `scale(${lerp(1, 0.28, g)})` }}>
      <Phone x={0} y={0} w={860}><ProductPage price="RM199" date="3 Nov" /></Phone></div>
    {g > 0.01 ? <div style={{ position: "absolute", left: 90, top: 1060, display: "grid", gridTemplateColumns: "repeat(3, 280px)", gap: 20, opacity: g }}>
      {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{ width: 280, height: 500, borderRadius: 24, background: i === 0 ? "transparent" : "#22252b", border: i === 0 ? `4px solid ${RED}` : "none" }} />)}</div> : null}
    {g > 0.3 ? <div style={{ position: "absolute", left: 100, top: 980, fontSize: 40, fontWeight: 700, color: "#fff", fontFamily: PS, opacity: g }}>Galeri · 3 Nov · RM199</div> : null}
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: "#fff", opacity: fl * 0.85 }} />
  </>);
}
function Cmp({ n }: { n: number }) {
  const a = onO(59, 0.4, -0.15), hi = onO(62, 0.3, -0.05);
  return (<div style={{ position: "absolute", left: 0, top: 420, width: 1080, display: "flex", justifyContent: "center", gap: 30, fontFamily: PS }}>
    {[["3 Nov", "RM199", undefined, false], ["11 Nov", "RM149", "RM299", true]].map(([d, p, w, s], i) => (
      <div key={i} style={{ width: 480, transform: `translateY(${(1 - (i ? a : 1)) * 60}px)`, opacity: i ? a : 1 }}>
        <div style={{ fontSize: 40, fontWeight: 700, color: i ? RED : "#fff", marginBottom: 18 }}>{i ? "Sekarang (sale)" : "Screenshot anda"}</div>
        <div style={{ width: 960, transformOrigin: "0 0", transform: "scale(0.5)" }}><Phone x={0} y={0} w={960}><ProductPage price={p as string} was={w as any} date={d as string} sale={s as boolean} /></Phone></div>
      </div>))}
    {hi > 0.01 ? <div style={{ position: "absolute", left: 830, top: 685, width: 180, height: 60, border: `5px solid ${RED}`, borderRadius: 14, opacity: hi, transform: `scale(${0.8 + 0.2 * hi})` }} /> : null}
  </div>);
}
function Chart({ n }: { n: number }) {
  // price per day 1–11 Nov (illustrative): flat RM199, up to RM299 on 9–10 Nov, the sale RM149 on 11 Nov
  const V = [199, 199, 199, 199, 199, 199, 199, 199, 299, 299, 149], X0 = 120, X1 = 960, Y = (v: number) => 1240 - (v - 100) * 3.2;
  const draw = n === 11 ? onO(61, 1.0, -0.2) : 1, spike = onO(64, 0.35, -0.1), off = onO(66, 0.4, -0.1);
  const pts = V.map((v, i) => [X0 + (i / 10) * (X1 - X0), Y(i >= 8 && spike < 1 ? lerp(199, v, spike) : v)]);
  const N = 1 + Math.floor(draw * 10), d = pts.slice(0, N + 1).map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  return (<div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, fontFamily: PS }}>
    <div style={{ position: "absolute", left: 120, top: 470, fontSize: 30, letterSpacing: 4, fontWeight: 700, color: MUTE }}>HARGA · 1–11 NOV</div>
    <svg style={{ position: "absolute", left: 0, top: 0 }} width={1080} height={1920}>
      {[149, 199, 299].map((v) => <g key={v}><line x1={X0} x2={X1} y1={Y(v)} y2={Y(v)} stroke="rgba(255,255,255,0.1)" strokeWidth={2} strokeDasharray="8 10" /><text x={X0 - 20} y={Y(v) + 10} fill={MUTE} fontSize={30} textAnchor="end" fontFamily="Outfit">{v}</text></g>)}
      <path d={d} fill="none" stroke="#e6e8ec" strokeWidth={6} strokeLinejoin="round" />
      {draw >= 1 ? <circle cx={pts[10][0]} cy={pts[10][1]} r={14} fill={RED} /> : null}
      {spike > 0.05 ? <circle cx={pts[9][0]} cy={pts[9][1]} r={12} fill="#fff" opacity={spike} /> : null}
      {off > 0.01 ? <g opacity={off}><line x1={pts[10][0] + 40} x2={pts[10][0] + 40} y1={Y(199)} y2={Y(149)} stroke={RED} strokeWidth={5} /><text x={pts[10][0] - 10} y={Y(174) + 12} fill={RED} fontSize={44} fontWeight={800} textAnchor="end" fontFamily="Outfit">−RM50 je</text></g> : null}
    </svg>
    {spike > 0.05 ? <div style={{ position: "absolute", left: pts[8][0] - 280, top: Y(299) - 120, fontSize: 30, letterSpacing: 3, fontWeight: 700, color: "#fff", opacity: spike }}>NAIK SEHARI DUA<br />SEBELUM SALE</div> : null}
    <div style={{ position: "absolute", left: X0, top: 1290, width: X1 - X0, display: "flex", justifyContent: "space-between", fontSize: 28, color: MUTE, ...TAB }}><span>1 Nov</span><span>9</span><span>11 Nov</span></div>
  </div>);
}
function Ui({ n }: { n: number }) {
  const c = SETUPS[n - 1]; if (!c.ui) return null;
  const view = (k: number) => { const cu = SETUPS[k - 1].ui!, x = cl((T - ST[k - 1]) / (ST[k] - ST[k - 1])), u = 0.55 * x + 0.45 * ss(x, 0, 1);
    return { s: lerp(cu.a[0], cu.b[0], u), fx: lerp(cu.a[1], cu.b[1], u), fy: lerp(cu.a[2], cu.b[2], u), rz: cu.rz ?? 0 }; };
  const bodyOf = (k: number) => { const sc = SETUPS[k - 1].ui!.screen;
    return sc === "steps" ? <Steps n={k} /> : sc === "shot" ? <Shot n={k} /> : sc === "cmp" ? <Cmp n={k} /> : <Chart n={k} />; };
  const page = (k: number, dx: number, blur = 0, op = 1) => { const v = view(k);
    return <div key={"pg" + k} style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, transformOrigin: "0 0", transform: `translate(${540 - v.fx * v.s + dx}px, ${1000 - v.fy * v.s}px) scale(${v.s}) rotate(${v.rz}deg)`, filter: `blur(${blur}px)`, opacity: op }}>{bodyOf(k)}</div>; };
  const prev = n > 1 ? SETUPS[n - 2].ui : undefined, same = !!prev && prev.screen === c.ui.screen;
  const push = !!prev && !same && T < ST[n - 1] + 0.42 ? eo((T - ST[n - 1]) / 0.42) : -1;
  // 3D → screen: through the tag's hole (a red ring that opens and blurs away)
  const enter = same || prev ? 1 : eo((T - ST[n - 1]) / 0.42);
  const layers = push >= 0 ? [page(n - 1, -1080 * push), page(n, 1080 * (1 - push))] : [page(n, 0, (1 - enter) * 12, 0.3 + 0.7 * enter)];
  return (<div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, overflow: "hidden", background: `radial-gradient(ellipse at 50% 30%, rgba(232,238,252,0.10) 0%, rgba(232,238,252,0) 50%), radial-gradient(ellipse at 50% 60%, #1c1f25 0%, ${BG} 75%)` }}>
    {layers}
    {!prev && enter < 1 ? <div style={{ position: "absolute", left: 540 - 2400 * enter - 40, top: 1000 - 2400 * enter - 40, width: 4800 * enter + 80, height: 4800 * enter + 80, borderRadius: "50%", boxShadow: `0 0 0 3000px ${RED}`, opacity: 1 - enter }} /> : null}
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 330, background: BG }} /><div style={{ position: "absolute", left: 0, top: 330, width: 1080, height: 2, background: "rgba(255,255,255,0.08)" }} />
  </div>);
}

// ================= the 23 setups =================
//@@TYPES@@
const HC = [TAGC[0], TAGC[1] + 0.005, TAGC[2]], SKW = [TAGC[0], TAGC[1] + 0.011, TAGC[2]];
const P1A = C(fromT(HC, [0.35, 0.12, 1], 0.27), HC), P1B = C(fromT(HC, [0.28, 0.1, 1], 0.2), [HC[0], HC[1] + 0.004, HC[2]]);   // setup 23 lands on P1B (loop)
const STC = [STK[0], STK[1] + 0.01, STK[2]], CC = [CX, CTOP + 0.05, 0.1], RCC = [RC[0] + 0.03, RC[1], RC[2] - 0.01];
const NOCAM = C([0, 3, 3], [0, 0, 0]);
const U = (screen: string, a: number[], b: number[], rz = 0) => ({ ui: { screen, a, b, rz }, set: "u", a: NOCAM, b: NOCAM });
const SETUPS: Setup[] = [
  /* 1 macro, tag, already pushing; strike draws */ { set: "a", a: P1A, b: P1B, fov: 30, fs: 2.8 },
  /* 2 rack focus to the sticker, low */ { set: "a", a: C(fromT(SKW, [-0.4, -0.15, 1], 0.16), SKW), b: C(fromT(SKW, [-0.35, -0.12, 1], 0.13), SKW), fov: 30, fs: 2.2, src: "Harga & produk: ilustrasi",
    tags: [{ at: [SKW[0] - 0.02, SKW[1], SKW[2] + 0.002], x: 90, y: 1250, cap: "HARGA ASAL", big: "RM299?", t: W(5) }] },
  /* 3 pull back: the whole tag, the box behind */ { set: "a", a: C(fromT(HC, [0.1, 0.05, 1], 0.34), [HC[0], HC[1] - 0.06, HC[2]]), b: C(fromT(HC, [0.15, 0.08, 1], 0.5), [HC[0], HC[1] - 0.1, HC[2]]), fov: 30, fs: 4,
    tags: [{ at: [HC[0], HC[1] - 0.025, HC[2] + 0.002], x: 640, y: 1200, cap: "HARGA SALE", big: "RM149", t: W(7) }] },
  /* 4 wide: the aisle, the tag swings on "untung" */ { set: "a", tr: "out", a: C([0.9, 1.25, 1.9], [0.1, 1.0, 0.2]), b: C([0.75, 1.2, 1.7], [0.05, 1.0, 0.2]), fov: 34, fs: 5.6 },
  /* 5 side-on cutaway: the sticker lifts off the card */ { set: "a", a: C(fromT(HC, [1, 0.15, 0.2], 0.22), HC), b: C(fromT(HC, [1, 0.2, 0.5], 0.18), HC), fov: 30, fs: 2.8,
    tags: [{ at: [HC[0] + 0.012, SKW[1], HC[2] + 0.014], x: 560, y: 1180, cap: "STIKER", big: "dari RM299", t: W(16) + 0.35 }, { at: [HC[0], HC[1] - 0.03, HC[2]], x: 90, y: 1320, cap: "KAD", t: W(17) }] },
  /* 6 macro into the gap: nothing printed under it */ { set: "a", a: C(fromT(SKW, [0.7, 0.35, 1], 0.12), SKW), b: C(fromT(SKW, [0.6, 0.3, 1], 0.095), SKW), fov: 28, fs: 2.2,
    tags: [{ at: [SKW[0], SKW[1], SKW[2] + 0.001], x: 560, y: 1250, cap: "BAWAH STIKER", big: "tiada rekod", sub: "tiada harga asal", t: W(20) }] },
  /* 7 stamp from above, crane up to the stack */ { set: "a", a: C(fromT(STC, [0.3, 1.2, 0.6], 0.32), STC), b: C(fromT(STC, [0.25, 1.4, 0.7], 0.5), STC), fov: 32, fs: 4, note: "ilustrasi" },
  /* 8 W2: through the hole → three steps */ { ...U("steps", [1.0, 540, 900], [1.06, 540, 910]), tr: "in" },
  /* 9 step 1: screenshot the normal price */ { ...U("shot", [1.0, 540, 1000], [1.05, 540, 1040], -2), step: 1 },
  /* 10 compare: screenshot vs the sale page */ { ...U("cmp", [1.0, 540, 900], [1.1, 600, 880]), step: 1 },
  /* 11 the price line: up just before the sale */ { ...U("chart", [1.0, 540, 1000], [1.18, 700, 940], 2), step: 1, note: "harga ilustrasi" },
  /* 12 W3 wide: the counter, the box rides in */ { set: "c", tr: "side", a: C([CX - 0.9, CTOP + 0.65, 1.3], [CX - 0.15, CTOP, 0]), b: C([CX - 0.7, CTOP + 0.6, 1.2], [CX - 0.05, CTOP, 0]), fov: 34, fs: 5.6, step: 2 },
  /* 13 push to the printer; it goes see-through; the receipt prints */ { set: "c", a: C(fromT([PR[0], PR[1] + 0.08, PR[2]], [-0.6, 0.35, 1], 0.5), [PR[0], PR[1] + 0.08, PR[2]]), b: C(fromT([PR[0], PR[1] + 0.12, PR[2]], [-0.5, 0.3, 1], 0.42), [PR[0], PR[1] + 0.12, PR[2]]), fov: 30, fs: 4, step: 2,
    tags: [{ at: [PR[0] - 0.04, PR[1] + 0.06, PR[2]], x: 90, y: 1250, cap: "PENCETAK RESIT", t: W(72) + 0.3 }] },
  /* 14 the receipt lifts toward the bag, stops */ { set: "c", a: C([PR[0] - 0.25, PR[1] + 0.45, 0.65], [PR[0] - 0.12, PR[1] + 0.2, 0.1]), b: C([PR[0] - 0.3, PR[1] + 0.42, 0.6], [PR[0] - 0.15, PR[1] + 0.18, 0.08]), fov: 30, fs: 4, step: 2 },
  /* 15 top-down: receipt beside the tag */ { set: "c", a: C([RCC[0] + 0.02, RCC[1] + 0.42, RCC[2] + 0.08], [RCC[0] + 0.03, RCC[1], RCC[2]]), b: C([RCC[0] + 0.03, RCC[1] + 0.36, RCC[2] + 0.06], [RCC[0] + 0.035, RCC[1], RCC[2]]), fov: 34, fs: 5.6, step: 2,
    tags: [{ at: [RC[0], RC[1], RC[2] - RROW], x: 70, y: 1240, cap: "RESIT", big: "RM169", t: W(83) }, { at: [TG[0], TG[1], TG[2] - 0.01], x: 650, y: 1240, cap: "TAG RAK", big: "RM149", t: W(86) }] },
  /* 16 macro: RM169 struck, RM149 stamps in (the red flash) */ { set: "c", a: C(fromT([RC[0] + 0.006, RC[1], RC[2] - RROW], [0.3, 1, 0.7], 0.2), [RC[0] + 0.006, RC[1], RC[2] - RROW]), b: C(fromT([RC[0] + 0.006, RC[1], RC[2] - RROW], [0.25, 1, 0.6], 0.15), [RC[0] + 0.006, RC[1], RC[2] - RROW]), fov: 30, fs: 2.8, step: 2 },
  /* 17 pull back, top light: the law card */ { set: "c", a: C([CX - 0.1, CTOP + 0.38, 0.75], [CX - 0.3, CTOP + 0.06, 0.2]), b: C([CX - 0.05, CTOP + 0.42, 0.85], [CX - 0.28, CTOP + 0.06, 0.2]), fov: 32, fs: 4, step: 2, src: "Perintah Kawalan Harga dan Antipencatutan (Penandaan Harga) 2020" },
  /* 18 step 3: the folder, KPDN */ { set: "c", a: C([CX + 0.35, CTOP + 0.55, 0.62], [CX + 0.3, CTOP, 0.22]), b: C([CX + 0.32, CTOP + 0.5, 0.58], [CX + 0.3, CTOP, 0.22]), fov: 32, fs: 4, step: 3,
    tags: [{ at: [CX + 0.35, CTOP + 0.01, 0.13], x: 600, y: 1240, cap: "ADUAN", big: "KPDN", t: W(108) }] },
  /* 19 snap the tag, the receipt goes into the folder */ { set: "c", a: C([CX + 0.15, CTOP + 0.5, 0.42], [CX + 0.15, CTOP, 0.23]), b: C([CX + 0.2, CTOP + 0.56, 0.44], [CX + 0.22, CTOP, 0.23]), fov: 34, fs: 5.6, step: 3 },
  /* 20 W4: the fine */ { set: "f", tr: "in", a: C([FX + 0.05, 0.42, 0.28], [FX + 0.02, 0, 0.0]), b: C([FX + 0.03, 0.34, 0.24], [FX + 0.02, 0, 0.0]), fov: 32, fs: 4, src: "Akta Perlindungan Pengguna 1999, s145",
    count: { v: () => "RM" + Math.round(lerp(0, 100000, eo((T - (W(123) - 0.2)) / 0.75))).toLocaleString("en-US"), unit: "denda maksimum · syarikat", t: W(123) - 0.2 } },
  /* 21 W5 wide: a wall of 50% tags */ { set: "w", tr: "out", a: C([WX + 0.5, 1.3, 2.4], [WX, 1.1, 0]), b: C([WX + 0.4, 1.25, 2.2], [WX, 1.1, 0]), fov: 34, fs: 8 },
  /* 22 push toward one tag, the rest go soft */ { set: "w", a: C([WX + 0.2, 1.28, 1.0], [WX + 0.01, 1.2, 0]), b: C([WX + 0.08, 1.24, 0.6], [WX + 0.01, 1.2, 0]), fov: 30, fs: 2.4 },
  /* 23 back on the hero tag, frame-0 framing (loop) */ { set: "a", tr: "in", a: C(fromT(HC, [0.35, 0.12, 1], 0.4), HC), b: P1B, fov: 30, fs: 2.8 },
];
function World({ n }: { n: number }) {
  const s = SETUPS[n - 1].set;
  return s === "a" ? <Aisle n={n} /> : s === "c" ? <Counter n={n} /> : s === "f" ? <Fine n={n} /> : s === "w" ? <Wall n={n} /> : null;
}

//@@CAMERA@@
//@@CAPTION@@

// ================= overlay =================
const fade = (t: number, d = 0.2) => ss(T, t, t + d);
function Overlay({ n, cam, still }: { n: number; cam: Cam; still?: boolean }) {
  const c = SETUPS[n - 1], t0 = ST[n - 1], t1 = ST[n];
  const life = still ? 1 : fade(t0 + 0.12) * (1 - ss(T, t1 - 0.2, t1 - 0.04));
  const end = n === NSET ? fade(W(138) + 0.4, 0.25) : 0, logoEnd = n === NSET ? fade(DUR - 2.6, 0.4) : 0, h0 = n === 1 ? 1 : n === 2 ? 1 - sm(ST[1] + 0.15, ST[1] + 0.45) : 0;
  const BIG = { position: "absolute", left: 60, top: 1290, fontFamily: FF, fontWeight: 800, fontSize: 80, lineHeight: 1.06, letterSpacing: -1.5, color: "#ffffff", textShadow: "0 2px 18px rgba(0,0,0,0.9)" } as any;
  return (<>
    {c.ui ? null : <><div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 470, background: "linear-gradient(#0d0e11 34%, rgba(13,14,17,0))" }} />
    <div style={{ position: "absolute", left: 0, top: 1480, width: 1080, height: 440, background: "linear-gradient(rgba(13,14,17,0), #0d0e11 70%)" }} /></>}
    {c.src ? <div style={{ position: "absolute", left: 60, top: 372, width: 960, fontFamily: FF, fontSize: 30, fontWeight: 500, color: "#c9ccd2", opacity: life * fade(t0 + 0.2, 0.3) }}>{c.src}</div> : null}
    {c.note ? <div style={{ position: "absolute", left: 60, top: 1700, fontFamily: FF, fontSize: 26, fontWeight: 400, color: "#7d828b", opacity: life }}>{c.note}</div> : null}
    {c.count ? (() => { const a = life * fade(c.count.t ?? t0, 0.2); return <div style={{ position: "absolute", left: 60, top: 1180, fontFamily: FF, color: "#fff", opacity: a, textShadow: "0 2px 18px rgba(0,0,0,0.9)" }}>
      <div style={{ fontSize: 150, fontWeight: 800, letterSpacing: -3, lineHeight: 1, color: RED, ...TAB }}>{c.count.v()}</div><div style={{ fontSize: 34, color: "#c9ccd2", marginTop: 8 }}>{c.count.unit}</div></div>; })() : null}
    {(c.tags ?? []).map((g, i) => { const a = life * fade(g.t, 0.22); if (a < 0.01) return null; const q = projS(cam, g.at), ly = g.y < q.y ? g.y + (g.big ? 112 : 44) : g.y - 8, x1 = g.x + 50, d = fade(g.t, 0.3); return (
      <div key={i} style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, opacity: a }}>
        {g.noLine ? null : <svg style={{ position: "absolute", left: 0, top: 0 }} width={1080} height={1920}><line x1={q.x} y1={q.y} x2={lerp(q.x, x1, d)} y2={lerp(q.y, ly, d)} stroke="#ffffff" strokeWidth={2} opacity={0.75} /><circle cx={q.x} cy={q.y} r={5} fill="#ffffff" /></svg>}
        <div style={{ position: "absolute", left: g.x, top: g.y, fontFamily: FF, color: "#ffffff", textShadow: "0 2px 14px rgba(0,0,0,0.9)", opacity: fade(g.t + 0.12, 0.2), transform: `translateY(${(1 - fade(g.t + 0.12, 0.2)) * 10}px)` }}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 4 }}>{g.cap}</div>
          {g.big ? <div style={{ fontSize: 54, fontWeight: 600, letterSpacing: -0.5, marginTop: 2 }}>{g.big}</div> : null}
          {g.sub ? <div style={{ fontSize: 27, fontWeight: 400, color: "#c3c6cc", marginTop: 4 }}>{g.sub}</div> : null}
        </div>
      </div>); })}
    {c.step ? <div style={{ position: "absolute", left: 36, top: 1576, display: "flex", gap: 10, padding: 14, borderRadius: 18, background: "rgba(13,14,17,0.92)", fontFamily: FF, opacity: still || (n > 1 && SETUPS[n - 2].step) ? 1 : fade(t0 + 0.05, 0.2) }}>{["SCREENSHOT", "RESIT", "REPORT"].map((w, i) => { const lit = c.step === i + 1, done = (c.step ?? 0) > i + 1;
      return <div key={i} style={{ padding: "8px 14px", borderRadius: 8, background: lit ? RED : done ? "rgba(200,22,29,0.22)" : "rgba(255,255,255,0.08)", color: lit ? "#fff" : done ? "#ff8d8d" : "#8a8d93", fontSize: 34, fontWeight: 700, letterSpacing: 2 }}>{i + 1} · {w}</div>; })}</div> : null}
    {/* step 3's snap: a viewfinder closes on the tag and the shutter flashes on "gambar" */}
    {n === 19 ? (() => { const v = onO(110, 0.35, -0.1), fl = Math.max(0, 1 - Math.abs(T - (W(111) + 0.05)) / 0.12), q = projS(cam, TG), r = lerp(330, 150, v);
      return <><svg style={{ position: "absolute", left: 0, top: 0, opacity: v * (1 - fade(W(113), 0.3)) }} width={1080} height={1920}>{[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy], i) => <path key={i} d={`M${q.x + sx * r},${q.y + sy * r - sy * 50} L${q.x + sx * r},${q.y + sy * r} L${q.x + sx * r - sx * 50},${q.y + sy * r}`} stroke="#fff" strokeWidth={6} fill="none" />)}</svg>
        <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: "#fff", opacity: fl * 0.8 }} /></>; })() : null}
    {h0 > 0.01 ? <div style={{ ...BIG, top: 1250, opacity: h0 }}>RM299 tu?<br /><span style={{ color: RED }}>Tak pernah</span> wujud pun.</div> : null}
    {end > 0.01 ? <div style={{ ...BIG, top: 1290, opacity: end * (1 - logoEnd), transform: `translateY(${(1 - end) * 14}px)` }}>Diskaun dari harga<br /><span style={{ color: RED }}>apa sebenarnya?</span></div> : null}
    {logoEnd > 0.01 ? <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: `rgba(13,14,17,${0.98 * logoEnd})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img src={S("meikigo-logo.png")} style={{ height: 300, opacity: logoEnd, transform: `scale(${0.94 + 0.06 * logoEnd})` }} /></div> : null}
  </>);
}
//@@FRAME@@
