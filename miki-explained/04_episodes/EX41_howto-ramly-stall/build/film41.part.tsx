
// ================= EX41 film: time hangs on the user's words (tl.json); setups, sets, camera, captions as EX39 =================
const FPS = 30, OFF = 0, RFPS = 30, HUD = false;     // HUD: setup number + timecode (animatic only)
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
const on = (i: number, d = 0.3, off = 0) => ss(T, W(i) + off, W(i) + off + d);
const mixHex = (a: string, b: string, u: number) => { const h = (s: string, i: number) => parseInt(s.slice(1 + i * 2, 3 + i * 2), 16); return "#" + [0, 1, 2].map((i) => Math.round(lerp(h(a, i), h(b, i), u)).toString(16).padStart(2, "0")).join(""); };
const sc3 = (s: number) => { const v = Math.max(0.001, s); return [v, v, v] as [number, number, number]; };
const TX = (n: string) => S(`tx/${n}.png`);
const YEL = "#ffd800", YHOT = "#ffd24a", MAR = "#6e1f1c", BG = "#0d0e11", WARM = "#ffc77a";
// setup k (1-based) runs ST[k-1] .. ST[k]   (word indices: episode.md § Shot list v1, re-timed to the user's voice)
const ST = [0, W(11) - 0.1, W(17) - 0.12, W(23) - 0.1, W(28) - 0.1, W(33) - 0.12, W(38) - 0.1, W(42) - 0.1, W(49) - 0.12, W(58) - 0.1, W(66) - 0.1, W(72) - 0.12, W(77) - 0.1, W(89) - 0.12, W(97) - 0.1, W(107) - 0.12, W(115) - 0.1, DUR];
const NSET = ST.length - 1;

// ================= parts =================
let SO40: any = null;
const so40 = () => (SO40 ??= (() => {
  const rev = (pts: number[][]) => crossSection.polygon(pts as any).revolve({ segments: 64 }).rotate(-90, 0, 0);
  return {
    patty: rev([[0, 0], [0.046, 0], [0.05, 0.004], [0.05, 0.010], [0.046, 0.014], [0, 0.014]]),
    bunTop: rev([[0, 0], [0.055, 0], [0.056, 0.008], [0.05, 0.025], [0.035, 0.037], [0, 0.042]]),
    bunBot: rev([[0, 0], [0.054, 0], [0.055, 0.012], [0.05, 0.018], [0, 0.018]]),
    egg: rev([[0, 0], [0.058, 0], [0.061, 0.003], [0.057, 0.006], [0, 0.006]]),
  };
})());
const meat = (c = "#5c2f0e") => <StandardMaterial base_color={c} normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([3, 3])} perceptual_roughness={0.6} />;
// a patty lying flat; tilt turns it up to face the camera (rx), glow = the yellow rim (accent)
function Patty({ p, k, rx = 0, ry = 0, sc = 1, glowK = 0 }: { p: number[]; k: string; rx?: number; ry?: number; sc?: number; glowK?: number }) {
  return (
    <Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromEuler("YXZ", ry, rx, 0)).withScale(sc3(sc))}>
      <Mesh3d name={k + "m"} shape={so40().patty}>{meat()}</Mesh3d>
      {[-0.024, 0, 0.024].map((z) => <Mesh3d key={k + "gm" + z} name={k + "gm" + z} transform={Transform.fromXyz(0, 0.0141, z)}><Cuboid half_size={[Math.sqrt(0.0023 - z * z) * 0.9, 0.0004, 0.0025]} /><StandardMaterial base_color="#2a1608" perceptual_roughness={0.8} /></Mesh3d>)}
      {glowK > 0.01 ? <Mesh3d name={k + "g"} transform={Transform.fromXyz(0, 0.007, 0)}><Cylinder radius={0.0505} half_height={0.0015} /><StandardMaterial base_color={YEL} emissive={glow(YHOT, 3 * glowK)} /></Mesh3d> : null}
    </Entity>
  );
}
// the burger, built bottom-up: each layer drops 6 cm onto the stack as its u goes 0 → 1
function Burger({ p, k, u }: { p: number[]; k: string; u: { patty: number; egg: number; cab: number; sauce: number; top: number } }) {
  const P: any[] = [], drop = (x: number) => (1 - x) * (1 - x) * 0.06;
  P.push(<Mesh3d key={k + "bb"} name={k + "bb"} shape={so40().bunBot} transform={Transform.fromXyz(p[0], p[1], p[2])}><StandardMaterial base_color="#d39048" perceptual_roughness={0.6} /></Mesh3d>);
  if (u.patty > 0.01) P.push(<Patty key={k + "pt"} k={k + "pt"} p={[p[0], p[1] + 0.018 + drop(u.patty), p[2]]} sc={1.06} />);
  if (u.egg > 0.01) P.push(<Mesh3d key={k + "eg"} name={k + "eg"} shape={so40().egg} transform={Transform.fromXyz(p[0], p[1] + 0.031 + drop(u.egg), p[2]).withRotation(rotY(0.6)).withScale([1, 1, 0.92])}><StandardMaterial base_color="#f3dc86" perceptual_roughness={0.5} /></Mesh3d>);
  if (u.cab > 0.01) for (let i = 0; i < 46; i++) { const a = rnd(i) * 6.283, r = Math.sqrt(rnd(i * 3)) * 0.05, y = p[1] + 0.039 + rnd(i * 5) * 0.006 + drop(cl(u.cab * 1.4 - rnd(i * 7) * 0.4));
    P.push(<Mesh3d key={k + "c" + i} name={k + "c" + i} transform={Transform.fromXyz(p[0] + Math.cos(a) * r, y, p[2] + Math.sin(a) * r).withRotation(Quat.fromEuler("YXZ", rnd(i * 11) * 3.14, (rnd(i * 13) - 0.5) * 0.4, 0))}><Cuboid half_size={[0.016, 0.0012, 0.0022]} /><StandardMaterial base_color={i % 3 ? "#9fc46a" : "#7fae4c"} perceptual_roughness={0.55} /></Mesh3d>); }
  if (u.sauce > 0.01) [["#b8321f", 0], ["#f2ead2", 0.012]].forEach(([c, o]: any, j) => { for (let s = 0; s < 7; s++) { const x0 = -0.042 + s * 0.012, z0 = (s % 2 ? 0.03 : -0.03) + o, x1 = x0 + 0.012, z1 = (s % 2 ? -0.03 : 0.03) + o, L = Math.hypot(x1 - x0, z1 - z0) * cl(u.sauce * 7 - s);
    if (L > 0.001) P.push(<Mesh3d key={k + "s" + j + s} name={k + "s" + j + s} transform={Transform.fromXyz(p[0] + x0 + (x1 - x0) * cl(u.sauce * 7 - s) / 2, p[1] + 0.048 + j * 0.001, p[2] + z0 + (z1 - z0) * cl(u.sauce * 7 - s) / 2).lookingAt([p[0] + x1, p[1] + 0.048 + j * 0.001, p[2] + z1])}><Cuboid half_size={[0.0018, 0.0016, L / 2]} /><StandardMaterial base_color={c} perceptual_roughness={0.3} /></Mesh3d>); } });
  if (u.top > 0.01) { const y = p[1] + 0.05 + drop(u.top);
    P.push(<Mesh3d key={k + "bt"} name={k + "bt"} shape={so40().bunTop} transform={Transform.fromXyz(p[0], y, p[2])}><StandardMaterial base_color="#cd8436" perceptual_roughness={0.5} /></Mesh3d>);
    for (let i = 0; i < 26; i++) { const a = rnd(i + 40) * 6.283, r = Math.sqrt(rnd(i + 70)) * 0.044, h = 0.042 * Math.sqrt(Math.max(0, 1 - (r / 0.057) ** 2));
      P.push(<Mesh3d key={k + "se" + i} name={k + "se" + i} transform={Transform.fromXyz(p[0] + Math.cos(a) * r, y + h, p[2] + Math.sin(a) * r).withRotation(rotY(a)).withScale([1.6, 0.6, 1])}><Sphere radius={0.0024} /><StandardMaterial base_color="#f3e6c4" perceptual_roughness={0.5} /></Mesh3d>); } }
  return <>{P}</>;
}
// a flat card with a picture; children ride on it in the card's own x/y
function Card({ p, size, tex, rx = 0, ry = 0, rz = 0, em = 0, sc = 1, k, children, blend = false }: { p: number[]; size: number[]; tex: string; rx?: number; ry?: number; rz?: number; em?: number; sc?: number; k: string; children?: any; blend?: boolean }) {
  return (
    <Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromEuler("YXZ", ry, rx, rz)).withScale(sc3(sc))}>
      <Mesh3d name={k}><Cuboid half_size={[size[0] / 2, size[1] / 2, 0.0012]} />
        <StandardMaterial base_color_texture={TX(tex)} emissive={glow("#ffffff", em)} emissive_texture={TX(tex)} perceptual_roughness={0.75} alpha_mode={blend ? "Blend" : "Opaque"} /></Mesh3d>
      {children}
    </Entity>
  );
}
// a yellow line that draws on from the left, on a card (u0..u1, v: fractions of the card's picture)
function Under({ size, u0, u1, v, a, k }: { size: number[]; u0: number; u1: number; v: number; a: number; k: string }) {
  const len = (u1 - u0) * size[0], x0 = (u0 - 0.5) * size[0];
  return <Mesh3d name={k} transform={Transform.fromXyz(x0 + (len * Math.max(a, 0.001)) / 2, (0.5 - v) * size[1], 0.0016).withScale([Math.max(a, 0.001), 1, 1])}><Cuboid half_size={[len / 2, 0.0016, 0.0003]} /><StandardMaterial base_color={YEL} emissive={glow(YHOT, 2.4)} /></Mesh3d>;
}
// a picture that writes in from the left on a card (value text on the form)
function WriteIn({ size, cx, cy, w, h, tex, a, k }: { size: number[]; cx: number; cy: number; w: number; h: number; tex: string; a: number; k: string }) {
  const x = (cx - 0.5) * size[0] - (w * size[0]) / 2, ww = w * size[0] * Math.max(a, 0.001);
  return <Mesh3d name={k} transform={Transform.fromXyz(x + ww / 2, (0.5 - cy) * size[1], 0.0015).withScale([Math.max(a, 0.001), 1, 1])}><Cuboid half_size={[(w * size[0]) / 2, (h * size[1]) / 2, 0.0002]} /><StandardMaterial base_color_texture={TX(tex)} alpha_mode="Blend" perceptual_roughness={0.8} /></Mesh3d>;
}
// split-flap price: `prev` → `price` (same length) as fl goes 0 → 1
function Sign({ p, ry = 0, price, prev, fl = 1, tilt = -0.14, k, sc = 1, em = 0.85 }: { p: number[]; ry?: number; price: string; prev?: string; fl?: number; tilt?: number; k: string; sc?: number; em?: number }) {
  const ch = (c: string) => (c === "." ? "dot" : c === "+" ? "plus" : c === " " ? "sp" : c);
  const now = ["rm", ...price.split("").map(ch)], old = ["rm", ...(prev ?? price).split("").map(ch)];
  const WD = now.map((c) => (c === "dot" ? 0.02 : 0.034)), gap = 0.004, total = WD.reduce((a, b) => a + b, 0) + gap * (WD.length - 1);
  let x = -total / 2;
  return (
    <Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromEuler("YXZ", ry, tilt, 0)).withScale(sc3(sc))}>
      <Mesh3d transform={Transform.fromXyz(0, 0.045, 0)}><Cuboid half_size={[total / 2 + 0.012, 0.04, 0.013]} /><StandardMaterial base_color="#131417" perceptual_roughness={0.4} /></Mesh3d>
      {now.map((c1, i) => { const w = WD[i]; const cx = x + w / 2; x += w + gap;
        const li = old[i] === c1 ? 1 : cl(fl * 1.5 - (i - 1) * 0.12), c = li < 0.5 ? old[i] : c1, sy = Math.max(0.03, Math.abs(Math.cos(Math.PI * li)));
        return (
          <Mesh3d key={k + i + c} name={k + i + c} transform={Transform.fromXyz(cx, 0.045, 0.0135).withScale([1, sy, 1])}><Cuboid half_size={[w / 2, 0.03, 0.0012]} />
            <StandardMaterial base_color_texture={TX("flap_" + c)} emissive={glow("#ffffff", em)} emissive_texture={TX("flap_" + c)} perceptual_roughness={0.45} /></Mesh3d>); })}
    </Entity>
  );
}
// the patty pack (6 × 70 g, the user's Jaya Grocer photo on the front); x = 0 solid … 1 x-ray with the six patties inside
const PW = 0.2, PKH = 0.25, PD = 0.035;
function Pack({ p, ry = 0, rx = 0, x = 0, k, sc = 1, glowK = 0 }: { p: number[]; ry?: number; rx?: number; x?: number; k: string; sc?: number; glowK?: number }) {
  const al = lerp(1, 0.07, x);
  return (
    <Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromEuler("YXZ", ry, rx, 0)).withScale(sc3(sc))}>
      <Mesh3d name={k + "b"} transform={Transform.fromXyz(0, PKH / 2, 0)}><Cuboid half_size={[PW / 2, PKH / 2, PD / 2]} />{x > 0 ? <StandardMaterial base_color={Srgba.hex("#e9ecf5").with_alpha(al)} alpha_mode="Blend" perceptual_roughness={0.25} /> : <StandardMaterial base_color="#e9ecf5" perceptual_roughness={0.25} />}</Mesh3d>
      {x < 0.98 ? <Mesh3d name={k + "f"} transform={Transform.fromXyz(0, PKH / 2, PD / 2 + 0.0004)}><Cuboid half_size={[PW / 2, PKH / 2, 0.0004]} />{x > 0 ? <StandardMaterial base_color={Srgba.hex("#ffffff").with_alpha(1 - x)} alpha_mode="Blend" base_color_texture={TX("pack_front")} perceptual_roughness={0.22} /> : <StandardMaterial base_color_texture={TX("pack_front")} perceptual_roughness={0.22} />}</Mesh3d> : null}
      {x > 0.02 ? [0, 1, 2, 3, 4, 5].map((i) => <Patty key={k + "q" + i} k={k + "q" + i} p={[(i % 2 ? 0.045 : -0.045), 0.05 + Math.floor(i / 2) * 0.075, 0.007]} rx={Math.PI / 2} sc={0.82} glowK={glowK} />) : null}
      {x > 0.02 ? [0, 1, 2].flatMap((ax) => [-1, 1].flatMap((a) => [-1, 1].map((b) => { const H = [PW / 2, PKH / 2, PD / 2], o = [0, PKH / 2, 0], idx = [0, 1, 2].filter((i) => i !== ax); o[idx[0]] += a * H[idx[0]]; o[idx[1]] += b * H[idx[1]];
        const hs = [0.0012, 0.0012, 0.0012]; hs[ax] = H[ax];
        return <Mesh3d key={k + "e" + ax + a + b} name={k + "e" + ax + a + b} transform={Transform.fromXyz(o[0], o[1], o[2])}><Cuboid half_size={hs as any} /><StandardMaterial base_color={YEL} emissive={glow(YHOT, 2.2 * x)} /></Mesh3d>; }))) : null}
    </Entity>
  );
}
// the stall: the library cart (its coffee things hidden), a griddle, the yellow-and-maroon canopy with the logo, the tube light
const CT = 1.057;                                 // cart top: Bottom_Cart max y in CoffeeCart_01.gltf
function Stall({ o, ry = 0, real = 1, canopy = 1, lamp = 1, k = "st" }: { o: number[]; ry?: number; real?: number; canopy?: number; lamp?: number; k?: string }) {
  const tint = mixHex("#4a4c54", "#b9bdc5", real), P: any[] = [];
  P.push(<Model key={k + "cart"} src={S("CoffeeCart_01/CoffeeCart_01.gltf")} position={[0, 0, 0]}>
    <StandardMaterial material="CoffeeCart_01_cart" base_color={tint} />
    <StandardMaterial material="CoffeeCart_01_props" base_color={Srgba.hex("#000000").with_alpha(0)} alpha_mode="Blend" />
    <StandardMaterial material="CoffeeCart_01_mugs" base_color={Srgba.hex("#000000").with_alpha(0)} alpha_mode="Blend" />
  </Model>);
  P.push(<Mesh3d key={k + "gr"} transform={Transform.fromXyz(-0.3, CT + 0.012, 0.15)}><Cuboid half_size={[0.32, 0.012, 0.2]} /><StandardMaterial base_color={mixHex("#3a3c41", "#26272b", real)} metallic={0.55} perceptual_roughness={0.35} /></Mesh3d>);
  if (canopy > 0.01) { const h = lerp(CT + 0.02, 2.3, canopy), cs = Math.max(0.001, canopy);
    for (const [px, pz] of [[-0.66, -0.2], [0.76, -0.2], [-0.66, 0.5], [0.76, 0.5]]) P.push(<Mesh3d key={k + "po" + px + pz} name={k + "po" + px + pz} transform={Transform.fromXyz(px, (CT + h) / 2, pz).withScale([1, Math.max(0.001, (h - CT) / 1.3), 1])}><Cylinder radius={0.014} half_height={0.65} /><StandardMaterial base_color="#c9ccd1" metallic={0.5} perceptual_roughness={0.35} /></Mesh3d>);
    P.push(<Mesh3d key={k + "rf"} name={k + "rf"} transform={Transform.fromXyz(0.05, h, 0.15).withScale([cs, 1, cs])}><Cuboid half_size={[0.86, 0.02, 0.56]} /><StandardMaterial base_color_texture={TX("stripes")} perceptual_roughness={0.7} emissive={glow("#ffffff", 0.12 * lamp)} emissive_texture={TX("stripes")} /></Mesh3d>);
    P.push(<Mesh3d key={k + "va"} name={k + "va"} transform={Transform.fromXyz(0.05, h - 0.13, 0.715).withScale([cs, cs, 1])}><Cuboid half_size={[0.86, 0.12, 0.004]} /><StandardMaterial base_color_texture={TX("valance")} emissive={glow("#ffffff", 0.35 * lamp)} emissive_texture={TX("valance")} perceptual_roughness={0.6} /></Mesh3d>);
    P.push(<Mesh3d key={k + "tb"} name={k + "tb"} transform={Transform.fromXyz(0.05, h - 0.05, 0.15).withScale([cs, 1, 1])}><Cuboid half_size={[0.5, 0.012, 0.012]} /><StandardMaterial base_color="#fff4dc" emissive={glow("#fff1d6", 7 * lamp)} /></Mesh3d>);
    P.push(<Card key={k + "mn"} k={k + "mn"} p={[0.35, lerp(CT, 1.5, canopy), -0.19]} size={[0.36, 0.48]} tex="menu" em={0.35 * lamp} sc={cs} />); }
  // what's on the cart: buns, eggs, two sauce bottles, patties on the griddle
  if (real > 0.5) {
    for (let i = 0; i < 4; i++) P.push(<Mesh3d key={k + "bn" + i} shape={so40().bunTop} transform={Transform.fromXyz(0.55 + (i % 2) * 0.12, CT + 0.002 + Math.floor(i / 2) * 0.0, -0.08 + Math.floor(i / 2) * 0.12)}><StandardMaterial base_color="#cd8436" perceptual_roughness={0.5} /></Mesh3d>);
    for (let e = 0; e < 6; e++) P.push(<Mesh3d key={k + "eg" + e} transform={Transform.fromXyz(0.15 + (e % 3) * 0.05, CT + 0.025, -0.12 + Math.floor(e / 3) * 0.055).withScale([1, 1.25, 1])}><Sphere radius={0.022} /><StandardMaterial base_color="#f2ecdf" perceptual_roughness={0.5} /></Mesh3d>);
    for (const [bx, c] of [[0.02, "#b8321f"], [0.08, "#f2ead2"]] as [number, string][]) P.push(<Mesh3d key={k + "sb" + bx} transform={Transform.fromXyz(bx, CT + 0.1, -0.05)}><Cylinder radius={0.025} half_height={0.09} /><StandardMaterial base_color={c} perceptual_roughness={0.35} /></Mesh3d>);
  }
  return <Entity key={k} transform={Transform.fromXyz(o[0], o[1], o[2]).withRotation(rotY(ry))}>{P}</Entity>;
}

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

// ================= camera (EX39: drift inside a setup; flight on the same set; push / pull / slide to another set) =================
type Cam = { p: number[]; l: number[]; fov: number; up: number[]; fs: number; fd: number };
const l3 = (a: number[], b: number[], u: number) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];
function camOf(k: number): Cam {
  const c = SETUPS[k], x = cl((T - ST[k]) / (ST[k + 1] - ST[k])), u = k === NSET - 1 ? ss(x, 0, 0.55) : 0.55 * x + 0.45 * ss(x, 0, 1);
  const p = l3(c.a.p, c.b.p, u), l = l3(c.a.l, c.b.l, u);
  return { p, l, fov: c.fov ?? 30, up: c.up ?? [0, 1, 0], fs: c.fs ?? 2.4, fd: c.fd?.() ?? dist3(p, l) };
}
const mixCam = (a: Cam, b: Cam, w: number): Cam => ({ p: l3(a.p, b.p, w), l: l3(a.l, b.l, w), fov: lerp(a.fov, b.fov, w), up: l3(a.up, b.up, w), fs: lerp(a.fs, b.fs, w), fd: lerp(a.fd, b.fd, w) });
const dolly = (c: Cam, k: number): Cam => ({ ...c, p: l3(c.p, c.l, -k) });
const OUT = 0.2, IN = 0.26;
function filmCam(k: number): { cam: Cam; dark: number; fast: boolean } {
  let cam = camOf(k), dk = 0;
  const same = (i: number) => i >= 0 && i < NSET - 1 && SETUPS[i].set === SETUPS[i + 1].set && !SETUPS[i + 1].tr;
  if (same(k - 1) && T < ST[k] + 0.32) cam = mixCam(camOf(k - 1), cam, sm(ST[k] - 0.2, ST[k] + 0.32));
  else if (same(k) && T > ST[k + 1] - 0.2) cam = mixCam(cam, camOf(k + 1), sm(ST[k + 1] - 0.2, ST[k + 1] + 0.32));
  if (k > 0 && !same(k - 1) && T < ST[k] + IN) { const q = 1 - (T - ST[k]) / IN, tr = SETUPS[k].tr; cam = tr === "side" ? { ...cam, p: [cam.p[0] + q * q * 0.5 * dist3(cam.p, cam.l), cam.p[1], cam.p[2]] } : dolly(cam, tr === "in" ? q * q * 1.6 : -q * q * 0.6); dk = 0.35 * q * q * q; }
  if (k < NSET - 1 && !same(k) && T > ST[k + 1] - OUT) { const q = (T - (ST[k + 1] - OUT)) / OUT, tr = SETUPS[k + 1].tr; cam = tr === "side" ? { ...cam, p: [cam.p[0] - q * q * 0.5 * dist3(cam.p, cam.l), cam.p[1], cam.p[2]] } : dolly(cam, tr === "in" ? -q * q * 0.6 : q * q * 1.6); dk = 0.35 * q * q * q; }
  return { cam, dark: dk, fast: (k > 0 && T < ST[k] + 0.34) || (k < NSET - 1 && T > ST[k + 1] - 0.22) };
}
const projS = (c: Cam, w: number[]) => {
  const sub = (a: number[], b: number[]) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a: number[], b: number[]) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const nrm = (a: number[]) => { const k = Math.hypot(a[0], a[1], a[2]); return [a[0] / k, a[1] / k, a[2] / k]; };
  const fw = nrm(sub(c.l, c.p)), rt = nrm(cross(fw, c.up)), up = cross(rt, fw), d = sub(w, c.p), z = dot(d, fw), k = 960 / Math.tan((c.fov * Math.PI) / 360);
  return { x: 540 + (dot(d, rt) / z) * k, y: 960 - (dot(d, up) / z) * k };
};

// ================= captions (EX39) =================
const FF = "Outfit, 'Inter Display', Inter, 'Helvetica Neue', Arial, sans-serif";
const CT2 = CAPS.map((c, i) => (i + 1 < CAPS.length && CAPS[i + 1].L === c.L && /^(and|the|at|for|to|of|a|its|it|is|in|on|with)$/i.test(c.w) && W(i + 1) - c.t > 0.3 ? W(i + 1) - 2 / FPS : c.t));
const PH: { i0: number; i1: number; t0: number; t1: number }[] = (() => {
  const g: number[][] = []; let cur: number[] = [];
  CAPS.forEach((c, i) => { cur.push(i); const last = i + 1 >= CAPS.length || CAPS[i + 1].L !== c.L; if (/[.,?:…]$/.test(c.w) || cur.length >= 4 || last) { g.push(cur); cur = []; } });
  const m: number[][] = [];
  for (const x of g) { const pv = m[m.length - 1]; if (pv && x.length === 1 && pv.length <= 4 && CAPS[pv[0]].L === CAPS[x[0]].L && !/[.?]$/.test(CAPS[pv[pv.length - 1]].w)) pv.push(x[0]); else m.push(x); }
  return m.map((x, j) => ({ i0: x[0], i1: x[x.length - 1], t0: CT2[x[0]], t1: Math.min(j + 1 < m.length ? CT2[m[j + 1][0]] - 2 / FPS : DUR, W(x[x.length - 1]) + 1.1) }));
})();
const CW = (w: string, bold: boolean) => w.length * (bold ? 36 : 33) + 18;
function Caption() {
  const ph = PH.find((p) => T >= p.t0 - 0.001 && T < p.t1); if (!ph) return null;
  const out = cl((ph.t1 - T) * FPS / 3), ws: number[] = []; for (let i = ph.i0; i <= ph.i1; i++) if (T >= CT2[i] - 0.001) ws.push(i);
  const width = (k: number) => ws.slice(0, k).reduce((a, i) => a + CW(CAPS[i].w, false), 0);
  const prevW = width(ws.length - 1), nowW = width(ws.length), age = cl((T - CT2[ws[ws.length - 1]]) * FPS / 3), wNow = lerp(prevW + CW(CAPS[ws[ws.length - 1]].w, false) * 0.35, nowW, ss(age, 0, 1));
  const BL = "#4f8df7";
  return (
    <div style={{ position: "absolute", top: 172, left: 540 - Math.min(940, wNow) / 2, width: 940, textAlign: "left", fontFamily: FF, fontSize: 66, lineHeight: 1.2, letterSpacing: -0.5, whiteSpace: wNow > 940 ? "normal" : "nowrap", opacity: out < 1 ? 0.25 + 0.75 * out * out : 1 }}>
      {ws.map((i, j) => { const c = CAPS[i], f = (T - CT2[i]) * FPS, fresh = f < 0.99, curr = j === ws.length - 1, b = f - 1, e = cl((b - 1) / 2), sd = cl(b - 3);
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

// ================= overlay =================
const fade = (t: number, d = 0.2) => ss(T, t, t + d);
const LOGO = (h: number) => <img src={S("ramly_burger_logo.png")} style={{ height: h, borderRadius: 4 }} />;
function Overlay({ n, cam, still }: { n: number; cam: Cam; still?: boolean }) {
  const c = SETUPS[n - 1], t0 = ST[n - 1], t1 = ST[n];
  const life = still ? 1 : fade(t0 + 0.12) * (1 - ss(T, t1 - 0.2, t1 - 0.04));
  const end = n === NSET ? fade(W(118) + 0.5, 0.25) : 0, logoEnd = n === NSET ? fade(DUR - 2.6, 0.4) : 0, h0 = n === 1 ? 1 - sm(ST[1] - 0.25, ST[1] - 0.05) : 0;
  const BIG = { position: "absolute", left: 60, top: 1290, fontFamily: FF, fontWeight: 800, fontSize: 80, lineHeight: 1.06, letterSpacing: -1.5, color: "#ffffff", textShadow: "0 2px 18px rgba(0,0,0,0.9)" } as any;
  return (<>
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 470, background: "linear-gradient(#0d0e11 34%, rgba(13,14,17,0))" }} />
    <div style={{ position: "absolute", left: 0, top: 1480, width: 1080, height: 440, background: "linear-gradient(rgba(13,14,17,0), #0d0e11 70%)" }} />
    {c.src ? <div style={{ position: "absolute", left: 60, top: 372, display: "flex", alignItems: "center", gap: 12, fontFamily: FF, fontSize: 27, fontWeight: 400, color: "#d6d8dc", opacity: life * fade(t0 + 0.2, 0.3) }}>{LOGO(34)}<span>{c.src}</span></div> : null}
    {c.count ? <div style={{ position: "absolute", left: 44, top: 430, padding: "8px 16px 10px", borderRadius: 10, background: "rgba(13,14,17,0.62)", fontFamily: FF, color: "#ffffff", opacity: life * fade(c.count.t ?? t0 + 0.15), transform: `translateY(${(1 - fade(c.count.t ?? t0 + 0.15)) * 14}px)` }}><div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -2, lineHeight: 1 }}>{c.count.v()}</div><div style={{ fontSize: 30, fontWeight: 400, color: "#c9ccd2", marginTop: 4 }}>{c.count.unit}</div></div> : null}
    {(c.tags ?? []).map((g, i) => { const a = life * fade(g.t, 0.22); if (a < 0.01) return null; const q = projS(cam, g.at), ly = g.y < q.y ? g.y + (g.big ? 112 : 44) : g.y - 8, x1 = g.x + 50, d = fade(g.t, 0.3); return (
      <div key={i} style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, opacity: a }}>
        <svg style={{ position: "absolute", left: 0, top: 0 }} width={1080} height={1920}><line x1={q.x} y1={q.y} x2={lerp(q.x, x1, d)} y2={lerp(q.y, ly, d)} stroke="#ffffff" strokeWidth={2} opacity={0.75} /><circle cx={q.x} cy={q.y} r={5} fill="#ffffff" /></svg>
        <div style={{ position: "absolute", left: g.x, top: g.y, fontFamily: FF, color: "#ffffff", textShadow: "0 2px 14px rgba(0,0,0,0.9)", opacity: fade(g.t + 0.12, 0.2), transform: `translateY(${(1 - fade(g.t + 0.12, 0.2)) * 10}px)` }}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 4 }}>{g.cap}</div>
          {g.big ? <div style={{ fontSize: 54, fontWeight: 600, letterSpacing: -0.5, marginTop: 2 }}>{g.big}</div> : null}
          {g.sub ? <div style={{ fontSize: 27, fontWeight: 400, color: "#c3c6cc", marginTop: 4 }}>{g.sub}</div> : null}
        </div>
      </div>); })}
    {c.step || n === 16 ? <div style={{ position: "absolute", left: 60, top: 1520, display: "flex", gap: 12, fontFamily: FF, opacity: still ? 1 : fade(t0 + 0.05, 0.2) }}>{["COURSE", "JAB", "LICENCE", "CART"].map((w, i) => { const lit = n === 16 || c.step === i + 1, done = (c.step ?? 0) > i + 1;
      return <div key={i} style={{ padding: "8px 14px", borderRadius: 8, background: lit ? YEL : done ? "rgba(255,216,0,0.22)" : "rgba(255,255,255,0.08)", color: lit ? "#17181b" : done ? "#ffd800" : "#8a8d93", fontSize: 26, fontWeight: 700, letterSpacing: 2 }}>{i + 1} · {w}</div>; })}</div> : null}
    {c.note ? <div style={{ position: "absolute", left: 60, top: 1630, width: 960, fontFamily: FF, fontSize: 33, fontWeight: 400, color: "#b9bcc2", opacity: life }}>{c.note}</div> : null}
    {h0 > 0.01 ? <div style={{ ...BIG, top: 1180, opacity: h0 }}>
      <div style={{ marginBottom: 22 }}>{LOGO(120)}</div>
      Want a<br />Ramly Burger stall?<br /><span style={{ color: YEL }}>4 steps.</span></div> : null}
    {end > 0.01 ? <div style={{ ...BIG, top: 1330, opacity: end * (1 - logoEnd), transform: `translateY(${(1 - end) * 14}px)` }}>Which step<br /><span style={{ color: YEL }}>stops you?</span></div> : null}
    {logoEnd > 0.01 ? <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: `rgba(13,14,17,${0.82 * logoEnd})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img src={S("meikigo-logo.png")} style={{ height: 300, opacity: logoEnd, transform: `scale(${0.94 + 0.06 * logoEnd})` }} /></div> : null}
  </>);
}
const FACE = `@font-face { font-family: "Outfit"; src: url(${S("fonts/Outfit.ttf")}); font-weight: 100 900; }`;
function Frame({ n, cam, dk, still, fast }: { n: number; cam: Cam; dk: number; still?: boolean; fast?: boolean }) {
  const d = dist3(cam.p, cam.l), street = SETUPS[n - 1].set === "s";
  return (
    <AbsoluteFill style={{ background: BG }}>
      <style>{FACE}</style>
      <Camera3d transform={Transform.fromXyz(cam.p[0], cam.p[1], cam.p[2]).lookingAt(cam.l as any, cam.up as any)} projection={{ Perspective: { fov: (cam.fov * Math.PI) / 180 } }}>
        <DepthOfField focal_distance={cam.fd} aperture_f_stops={cam.fs} mode="Gaussian" max_circle_of_confusion_diameter={lerp(14, 48, ss(d, 0.55, 0.95))} />
      </Camera3d>
      {fast ? <MotionBlur shutterAngle={1} samples={6} /> : null}
      <Bloom intensity={0.6} threshold={0.9} />
      <AmbientOcclusion quality="high" />
      <ToneMapping mode="agx" exposure={0.65} />   {/* effects are fixed at a render's first frame (raea): brightness per setup lives in the lights */}
      <Grade temperature={0.0} vignette={0.28} midtones={{ saturation: 1.05, contrast: 1.12, gamma: 1, gain: 1, lift: 0 }} />
      <World n={n} />
      <Overlay n={n} cam={cam} still={still} />
      <Caption />
      <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: BG, opacity: dk }} />
      {HUD ? <div style={{ position: "absolute", right: 24, bottom: 24, padding: "6px 14px", borderRadius: 8, background: "#ffd400", color: "#000", fontFamily: "Menlo, monospace", fontSize: 40, fontWeight: 700 }}>S{n} · {Math.floor(T / 60)}:{(T % 60).toFixed(1).padStart(4, "0")}</div> : null}
    </AbsoluteFill>
  );
}
function Film() {
  T = (useCurrentFrame() + OFF) / RFPS;
  let k = 0; while (k < NSET - 1 && T >= ST[k + 1]) k++;
  const { cam, dark: dk, fast } = filmCam(k);
  return <Frame n={k + 1} cam={cam} dk={dk} fast={fast} />;
}
// the board: one frame per setup, when its events have landed
const BT = SETUPS.map((_, k) => (k === 0 ? 0.9 : k === NSET - 1 ? W(118) + 1.0 : ST[k + 1] - 0.22));
function Board() {
  const k = useCurrentFrame(); T = BT[k];
  return <Frame n={k + 1} cam={camOf(k)} dk={0} still />;
}
registerRoot(() => <><Composition id="film" component={Film} width={1080} height={1920} fps={RFPS} durationInFrames={FRAMES} /><Composition id="board" component={Board} width={1080} height={1920} fps={FPS} durationInFrames={NSET} /><Composition id="cammap" component={CamMap} width={1080} height={1920} fps={FPS} durationInFrames={SETUPS.map((s) => s.set).filter((s, i, a) => a.indexOf(s) === i).length} /></>);
