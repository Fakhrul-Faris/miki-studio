
// ================= EX40 film: time hangs on the user's words (tl.json); setups, sets, camera, captions as EX39 =================
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
const ST = [0, W(8) - 0.1, W(12) - 0.1, W(18) - 0.05, W(23) - 0.1, W(26) - 0.1, W(34) - 0.05, W(40) - 0.12, W(47) - 0.1, W(51) - 0.08, W(53) - 0.1, W(57) - 0.05, W(64) - 0.05, W(72) - 0.12, W(77) - 0.12, W(83) - 0.1, W(90) - 0.05, W(95) - 0.05, DUR];
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
const meat = (c = "#55301a") => <StandardMaterial base_color={c} normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([3, 3])} perceptual_roughness={0.72} />;
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
    for (const [bx, c] of [[0.02, "#b8321f"], [0.08, "#f2ead2"]] as [number, string][]) P.push(<Mesh3d key={k + "sb" + bx} transform={Transform.fromXyz(bx, CT + 0.09, -0.12)}><Cylinder radius={0.025} half_height={0.09} /><StandardMaterial base_color={c} perceptual_roughness={0.35} /></Mesh3d>);
  }
  return <Entity key={k} transform={Transform.fromXyz(o[0], o[1], o[2]).withRotation(rotY(ry))}>{P}</Entity>;
}

// ================= sets =================
const SX = 2.3, SZ = 3.3;                                                  // the stall on the road shoulder in front of unit 0 (EX37's spot)
const G = [SX - 0.3, CT + 0.026, SZ + 0.15];                               // the griddle's middle
const PKP = [SX + 0.55, CT, SZ + 0.26], LBL = [SX + 0.66, CT + 0.035, SZ + 0.46];
const GRID = [0, 1, 2, 3, 4, 5].map((i) => [SX + 0.06 + (i % 3) * 0.13, CT, SZ + 0.31 + Math.floor(i / 3) * 0.14]);
const BGP = [SX + 0.19, CT, SZ + 0.36], SGN = [SX + 0.42, CT, SZ + 0.44];
function StreetSet({ n }: { n: number }) {
  const P: any[] = [<Street key="street" />, ...UNITS.map((i) => <Unit key={"u" + i} i={i} t={0} />)];
  P.push(<Stall key="stall" o={[SX, 0, SZ]} />);
  P.push(<Model key="lpg" src={S("small_lpg_tank/small_lpg_tank.gltf")} position={[SX - 0.95, 0, SZ + 0.05]} scale={[1.2, 1.2, 1.2]} />);
  P.push(<Model key="stl" src={S("wooden_stool_01/wooden_stool_01.gltf")} position={[SX + 0.4, 0, SZ + 1.05]} rotation={[0, 0.4, 0]} />);
  // patties on the griddle; the hero (index 0) lifts out in 2 and flies into the pack in 3
  const lift = n === 2 ? on(11, 0.45, -0.25) : 0, fly = n === 3 ? lin(ST[2], ST[2] + 0.55) : n > 3 ? 1 : 0;
  [[0, 0], [-0.13, 0.06], [-0.16, -0.08], [0.1, -0.09]].forEach(([dx, dz], i) => {
    if (i === 0) { if (fly >= 1) return; const f = ss(fly, 0, 1), a = [G[0], G[1] + 0.12 * lift, G[2]], b = [PKP[0], CT + 0.13, PKP[2]];
      P.push(<Patty key="hero" k="hero" p={[lerp(a[0], b[0], f), lerp(a[1], b[1], f) + Math.sin(Math.PI * f) * 0.12, lerp(a[2], b[2], f)]} rx={lerp(0, 0.85, lift) + f * 0.3} glowK={n <= 3 ? Math.max(lift, 1 - f) * (n === 1 ? 0 : 1) : 0} sc={lerp(1, 0.4, f * f)} />); }
    else P.push(<Patty key={"gp" + i} k={"gp" + i} p={[G[0] + dx, G[1], G[2] + dz]} ry={i} />); });
  // 3–5 the pack, the shelf label; 5: x-ray, the six fan out into a grid, each gets RM1.57
  if (n >= 3 && n <= 5) {
    const xr = n === 5 ? on(23, 0.35, -0.2) : n === 3 ? 0.35 * on(15, 0.3) * (1 - on(17, 0.3)) : 0;
    const out = n === 5 ? on(24, 0.5, -0.1) : 0;
    P.push(<Pack key="pack" k="pack" p={PKP} ry={-0.28} x={xr} glowK={n === 3 ? 1 : 0.4} sc={1 - 0.0 * out} />);
    if (n >= 4) P.push(<Card key="lbl" k="lbl" p={LBL} size={[0.16, 0.08]} tex="shelf_label" rx={-0.35} ry={-0.2} em={0.25} sc={n === 4 ? on(18, 0.3, -0.2) : 1} />);
    if (n === 5) GRID.forEach((g, i) => { const u = cl(out * 1.6 - i * 0.12), f = ss(u, 0, 1), s = [PKP[0] + (i % 2 ? 0.045 : -0.045), CT + 0.05 + Math.floor(i / 2) * 0.075, PKP[2]];
      if (u < 0.01) return;
      P.push(<Patty key={"fp" + i} k={"fp" + i} p={[lerp(s[0], g[0], f), lerp(s[1], g[1], f) + Math.sin(Math.PI * f) * 0.06, lerp(s[2], g[2], f)]} rx={lerp(Math.PI / 2, 0, f)} sc={lerp(0.82, 1, f)} />);
      const tg = cl(u * 1.2 - 0.6) * 2.5; if (tg > 0.01) P.push(<Card key={"tg" + i} k={"tg" + i} p={[g[0], CT + 0.0145, g[2]]} size={[0.08, 0.04]} tex="tag157" rx={-Math.PI / 2} em={0.3} sc={Math.min(1, tg)} />); });
  }
  // 6–7 the burger builds on the cart; 7: the split-flap tag flips RM1.57 → RM5.00
  if (n === 6 || n === 7) {
    const u = n === 6 ? { patty: on(28, 0.3, -0.15), egg: on(30, 0.3, -0.15), cab: on(31, 0.35, -0.15), sauce: on(33, 0.4, -0.15), top: 0 } : { patty: 1, egg: 1, cab: 1, sauce: 1, top: on(34, 0.35, -0.3) };
    P.push(<Burger key="bg" k="bg" p={BGP} u={u} />);
    if (n === 7) P.push(<Sign key="sg" k="sg" p={SGN} ry={-0.3} price="5.00" prev="1.57" fl={on(37, 0.45, -0.2)} />);
  }
  return <>{P}</>;
}
function StreetLights({ n }: { n: number }) {
  const dim = n === 8 ? lerp(1, 0.18, on(44, 0.9, -0.5)) : 1;            // "most people don't know": the street goes dark round the stall
  return (<>
    <Environment src={S("sky.hdr")} intensity={0.14 * dim} rotation={2.6} />
    <AmbientLight brightness={22 * dim} color="#8ea4dc" />
    <DirectionalLight color="#a7bdff" transform={Transform.fromXyz(-22, 18, 6).lookingAt([0, 0, 0])} illuminance={3600 * dim} shadow_maps_enabled soft_shadow_size={0.5} />
    <Shadows distance={60} firstCascade={6} mapSize={8192} bias={0.04} normalBias={1.5} />
    <PointLight transform={Transform.fromXyz(SX, 2.0, SZ + 0.15)} intensity={900000} color={WARM} range={9} shadow_maps_enabled />
    <SpotLight transform={Transform.fromXyz(SX + 1.2, 2.6, SZ + 2.2).lookingAt([SX + 0.1, CT, SZ + 0.2])} intensity={260000 * dim} outer_angle={0.5} inner_angle={0.3} color="#ffe6c2" range={8} />
    <Fog color="#14161c" near={45} far={140} />
  </>);
}
// the document table: dark top, one narrow spot on the form (9–10)
const VD = [300, 0, 0], FY = 0.75, FS = [0.21, 0.297];
function DocSet({ n }: { n: number }) {
  const fee = n === 9 ? on(50, 0.35, -0.2) : 1, roy = n === 10 ? on(52, 0.35, -0.2) : 0, ufee = n === 9 ? on(50, 0.3, 0.12) : 1;
  return (<>
    <Mesh3d transform={Transform.fromXyz(VD[0], FY - 0.02, VD[2])}><Cuboid half_size={[1.4, 0.02, 0.9]} /><StandardMaterial base_color="#1c1e22" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} perceptual_roughness={0.55} /></Mesh3d>
    <Card k="form" p={[VD[0], FY + 0.0013, VD[2]]} size={FS} tex="form" rx={-Math.PI / 2} rz={0.14} em={0.05}>
      <WriteIn k="vfee" size={FS} cx={346 / 1024} cy={428 / 1448} w={0.5} h={128 / 1448} tex="v_fee" a={fee} />
      <WriteIn k="vroy" size={FS} cx={346 / 1024} cy={618 / 1448} w={0.5} h={128 / 1448} tex="v_roy" a={roy} />
      <Under k="ufee" size={FS} u0={90 / 1024} u1={0.42} v={455 / 1448} a={ufee} />
      <Under k="uroy" size={FS} u0={90 / 1024} u1={0.42} v={645 / 1448} a={n === 10 ? on(52, 0.3, 0.12) : 0} />
    </Card>
    <SpotLight transform={Transform.fromXyz(VD[0] + 0.25, FY + 1.1, VD[2] + 0.35).lookingAt([VD[0], FY, VD[2]])} intensity={60000} outer_angle={0.32} inner_angle={0.12} color="#fff1dc" shadow_maps_enabled range={4} />
    <RectLight transform={Transform.fromXyz(VD[0] - 0.6, FY + 1.2, VD[2] - 0.8).lookingAt([VD[0], FY, VD[2]])} intensity={5000} width={1.2} height={0.4} color="#aebbd4" range={4} />
    <AmbientLight brightness={18} color="#8ea4dc" />
  </>);
}
// the parts of a stall (11–14): a stool with the pack and the licence, a bare clay cart that becomes the stall
const VV = [300, 0, 300], STH = 0.45, STOOL = [VV[0] - 0.55, 0, VV[2] + 0.1];
const PK2 = [STOOL[0] - 0.05, STH, STOOL[2] + 0.02], LIC = [STOOL[0] + 0.12, STH + 0.0015, STOOL[2] + 0.08], CART2 = [VV[0] + 0.55, 0, VV[2] - 0.15];
function PartsSet({ n }: { n: number }) {
  const P: any[] = [<Mesh3d key="vf" transform={Transform.fromXyz(VV[0], -0.02, VV[2])}><Cuboid half_size={[6, 0.02, 6]} /><StandardMaterial base_color="#30333a" normal_map_texture={S("tex/concrete_tiles_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([8, 8])} perceptual_roughness={0.55} /></Mesh3d>];
  P.push(<Model key="stool" src={S("wooden_stool_01/wooden_stool_01.gltf")} position={STOOL as any} scale={[1, 1, 1]}><StandardMaterial material="wooden_stool_01" base_color="#6a6d75" /></Model>);
  const slide = n === 11 ? on(56, 0.45, -0.35) : 1, fly = n === 14 ? on(72, 0.6, -0.2) : 0;
  const cartIn = n === 13 ? on(66, 0.6, -0.35) : n > 13 ? 1 : 0, can = n === 14 ? on(74, 0.6, -0.25) : 0, real = n === 14 ? on(76, 0.4, -0.2) : 0;
  const top = [CART2[0] + 0.45, CT, CART2[2] + 0.25];
  const arc = (a: number[], b: number[], f: number, hgt: number) => [lerp(a[0], b[0], f), lerp(a[1], b[1], f) + Math.sin(Math.PI * f) * hgt, lerp(a[2], b[2], f)];
  P.push(<Pack key="pk2" k="pk2" p={arc([PK2[0] - 0.4 * (1 - slide), PK2[1], PK2[2]], top, ss(fly, 0, 1), 0.4)} ry={0.3} />);
  const tip = n === 12 ? on(60, 0.4, -0.25) : n > 12 ? 1 : 0;
  if (n >= 12) P.push(<Card key="lic" k="lic" p={arc([LIC[0], LIC[1] + 0.027 * tip, LIC[2]], [top[0] - 0.2, CT + 0.05, top[2] + 0.1], ss(cl(fly * 1.2 - 0.15), 0, 1), 0.45)} size={[0.0856, 0.054]} tex="licence" rx={lerp(-Math.PI / 2, -0.35, tip)} ry={-0.25} em={0.25} sc={n === 12 ? Math.max(0.001, ss(tip * 3, 0, 1)) : 1} />);
  P.push(<Stall key="cart2" k="c2" o={[CART2[0] + 1.6 * (1 - ss(cartIn, 0, 1)), 0, CART2[2]]} real={real} canopy={can} lamp={real} />);
  if (n === 13) P.push(<Card key="ctag" k="ctag" p={[CART2[0] + 0.05 + 1.6 * (1 - ss(cartIn, 0, 1)), 0.62, CART2[2] + 0.53]} size={[0.2, 0.08]} tex="carttag" em={0.3} sc={on(70, 0.3, -0.2)} />);
  return (<>{P}
    <RectLight transform={Transform.fromXyz(VV[0] + 0.2, 2.6, VV[2] + 1.4).lookingAt([VV[0], 0.4, VV[2]])} intensity={160000} width={2.2} height={1.2} color="#fff3e2" range={7} />
    <SpotLight transform={Transform.fromXyz(VV[0] + 1.4, 2.4, VV[2] + 2.0).lookingAt([VV[0], 0.5, VV[2]])} intensity={120000} outer_angle={0.6} inner_angle={0.2} color="#fff1dc" shadow_maps_enabled range={7} />
    <PointLight transform={Transform.fromXyz(CART2[0] + 0.05, 1.9, CART2[2] + 0.15)} intensity={600000 * real} color={WARM} range={6} />
    <AmbientLight brightness={30} color="#8ea4dc" />
    <Environment src={S("sky.hdr")} intensity={0.2} />
  </>);
}
// Malaysia: one dot ≈ 8 stalls (positions illustrative: EX39's store points), lighting west to east; 16: threads rise to Ramly
const VM = [-300, 0, 0], MX = (lon: number) => VM[0] + (lon - 109.5) * 0.1, MZ = (lat: number) => VM[2] - (lat - 4.2) * 0.1;
const HUB = [MX(109.2), 0.9, MZ(4.0)];
const DOTS = (() => { const A = MAP as any; return ([...A.kk, ...A.se] as number[][]).filter((_, i) => i % 1 === 0); })();
function MapSet({ n }: { n: number }) {
  const A = MAP as any, P: any[] = [<Mesh3d key="mf" transform={Transform.fromXyz(VM[0], -0.02, VM[2])}><Cuboid half_size={[5, 0.02, 4]} /><StandardMaterial base_color="#25272c" perceptual_roughness={0.85} /></Mesh3d>];
  (A.border as number[][]).forEach((b, i) => P.push(<Mesh3d key={"mb" + i} transform={Transform.fromXyz(MX(b[0]), 0.001, MZ(b[1]))}><Cuboid half_size={[0.0035, 0.001, 0.0035]} /><StandardMaterial base_color="#4a4d54" emissive={glow("#aab0bb", 1.6)} /></Mesh3d>));
  const lit = n === 15 ? lerp(-0.01, 1, lin(W(78) - 0.3, W(79) + 0.3)) : 1, th = n === 16 ? lin(W(84) - 0.2, W(89)) : 0;
  DOTS.forEach((d, i) => { const u = (d[0] - 99.6) / 19.8; if (u > lit) return;
    P.push(<Mesh3d key={"d" + i} name={"d" + i} transform={Transform.fromXyz(MX(d[0]) + (i % 2) * 0.003, 0.004, MZ(d[1]) + (i % 3) * 0.002)}><Cuboid half_size={[0.003, 0.003, 0.003]} /><StandardMaterial base_color={YEL} emissive={glow(YHOT, 2.2)} /></Mesh3d>);
    if (th > 0.01 && i % 23 === 0) { const a = [MX(d[0]), 0.004, MZ(d[1])], L = Math.hypot(HUB[0] - a[0], HUB[1] - a[1], HUB[2] - a[2]) * cl(th * 1.5 - rnd(i) * 0.5);
      if (L > 0.002) P.push(<Mesh3d key={"t" + i} name={"t" + i} transform={(() => { const D = Math.hypot(HUB[0] - a[0], HUB[1] - a[1], HUB[2] - a[2]), f = L / 2 / D; return Transform.fromXyz(a[0] + (HUB[0] - a[0]) * f, a[1] + (HUB[1] - a[1]) * f, a[2] + (HUB[2] - a[2]) * f).lookingAt(HUB as any); })()}><Cuboid half_size={[0.0009, 0.0009, L / 2]} /><StandardMaterial base_color={YEL} emissive={glow(YHOT, 1.1)} /></Mesh3d>); } });
  if (n === 16) P.push(<Card key="hub" k="hub" p={HUB} size={[0.3, 0.183]} tex="../ramly_burger_logo" ry={0.45} rx={-0.25} em={0.6} sc={on(84, 0.4, -0.3)} blend />);
  return (<>{P}
    <RectLight transform={Transform.fromXyz(VM[0], 2.2, VM[2] + 1.2).lookingAt(VM as any)} intensity={90000} width={3} height={1.5} color="#dfe6f2" range={7} />
    <AmbientLight brightness={40} color="#b4bccb" /></>);
}
// the factory (17): a library factory in the dark, its sign lit; the money arrives as a counter
const VF = [0, 0, -300];
function FactorySet() {
  return (<>
    <Mesh3d transform={Transform.fromXyz(VF[0], -0.02, VF[2])}><Cuboid half_size={[60, 0.02, 60]} /><StandardMaterial base_color="#26282d" normal_map_texture={S("tex/asphalt_02_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([30, 30])} perceptual_roughness={0.7} /></Mesh3d>
    <Model src={S("factory_a.glb")} position={VF as any} scale={[0.012, 0.012, 0.012]}><StandardMaterial base_color="#3b3d44" base_color_texture={null as any} normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} perceptual_roughness={0.9} /></Model>
    <Card k="fsg" p={[VF[0] + 0.3, 3.0, VF[2] + 2.75]} size={[3.2, 0.8]} tex="factory_sign" em={1.1 * on(91, 0.4, -0.3)} />
    <DirectionalLight color="#a7bdff" transform={Transform.fromXyz(VF[0] - 20, 18, VF[2] + 12).lookingAt(VF as any)} illuminance={2600} shadow_maps_enabled soft_shadow_size={0.5} />
    <SpotLight transform={Transform.fromXyz(VF[0] + 4, 9, VF[2] + 18).lookingAt([VF[0] + 0.7, 3, VF[2] + 2.7])} intensity={4e6 * (0.3 + 0.7 * on(91, 0.4, -0.3))} outer_angle={0.35} inner_angle={0.2} color="#ffe6c2" range={30} />
    <AmbientLight brightness={22} color="#8ea4dc" />
    <Environment src={S("sky.hdr")} intensity={0.12} />
  </>);
}

// ================= the 18 setups =================
type Pose = { p: number[]; l: number[] };
type Tag = { at: number[]; x: number; y: number; cap: string; big?: string; sub?: string; t: number };
type Setup = { set: string; a: Pose; b: Pose; fov?: number; fs?: number; up?: number[]; tr?: "in" | "out" | "side"; fd?: () => number | null; tags?: Tag[];
  count?: { v: () => string; unit: string; t?: number }; note?: string; src?: string; ex?: number };
const fromT = (l: number[], dir: number[], d: number) => { const k = Math.hypot(dir[0], dir[1], dir[2]); return [l[0] + (dir[0] / k) * d, l[1] + (dir[1] / k) * d, l[2] + (dir[2] / k) * d]; };
const dist3 = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const C = (p: number[], l: number[]): Pose => ({ p, l });
const num = (a: number, b: number, t0: number, t1: number, d = 0) => lerp(a, b, cl((T - t0) / (t1 - t0))).toFixed(d);
const thou = (a: number, b: number, t0: number, t1: number) => Math.round(lerp(a, b, cl((T - t0) / (t1 - t0)))).toLocaleString("en-US");
const SL = [SX + 0.1, 1.0, SZ];
const P1A = C([SX + 8.6, 8.2, SZ + 15.5], [SX - 0.6, 1.5, SZ - 0.4]);
const PKL = [PKP[0], CT + 0.12, PKP[2]], GC = [SX + 0.19, CT, SZ + 0.38], BGL = [BGP[0], CT + 0.045, BGP[2]];
const FEE = [VD[0] - 0.01, FY, VD[2] - 0.05], ROY = [VD[0] - 0.035, FY, VD[2] - 0.02];
const SRC_JG = "price: Jaya Grocer online, 13 Nov 2026", SRC_BL = "source: CompareHero · franchise-info.my (blogs)", SRC_VP = "Vulcan Post, 19 Nov 2020 (company figures)";
const SETUPS: Setup[] = [
  /* 1 */ { set: "s", a: P1A, b: C([SX + 7.0, 6.6, SZ + 12.8], [SX - 0.4, 1.4, SZ - 0.3]), fov: 34, fs: 8 },
  /* 2 */ { set: "s", tr: "in", a: C(fromT(G, [0.35, 1.6, 0.5], 0.9), G), b: C(fromT([G[0], G[1] + 0.04, G[2]], [0.2, 1.15, 0.8], 0.72), [G[0], G[1] + 0.04, G[2]]), fov: 26, fs: 4, ex: 0.45 },
  /* 3 */ { set: "s", a: C(fromT(PKL, [-1, 0.05, 0.3], 1.05), PKL), b: C(fromT(PKL, [-1, 0.08, 0.55], 0.92), PKL), fov: 26, fs: 2.4, up: [0.08, 1, 0], ex: 0.45,
            tags: [{ at: [PKP[0] - 0.05, CT + 0.2, PKP[2]], x: 70, y: 1330, cap: "RAMLY BURGER AYAM", big: "6 patties", sub: "420 g pack", t: W(15) }] },
  /* 4 */ { set: "s", a: C([SX + 0.64, CT + 0.11, SZ + 2.45], [SX + 0.63, CT + 0.08, SZ + 0.38]), b: C([SX + 0.64, CT + 0.11, SZ + 2.3], [SX + 0.63, CT + 0.08, SZ + 0.4]), fov: 16, fs: 2.8, ex: 0.45, src: SRC_JG,
            fd: () => lerp(2.1, 1.88, on(19, 0.4, -0.25)), count: { v: () => "RM" + num(0, 9.4, W(19) - 0.3, W(19) + 0.3, 2), unit: "6 chicken patties, 420 g", t: W(19) - 0.35 } },
  /* 5 */ { set: "s", a: C([GC[0] + 0.1, CT + 0.7, GC[2] + 0.95], GC), b: C([GC[0] + 0.04, CT + 1.25, GC[2] + 0.28], GC), fov: 30, fs: 8, src: SRC_JG, up: [0, 1, 0],
            count: { v: () => "RM" + num(9.4, 1.57, W(24) - 0.2, W(24) + 0.4, 2), unit: "each: RM9.40 ÷ 6", t: W(23) }, note: "shop price; stalls buy wholesale", ex: 0.42 },
  /* 6 */ { set: "s", a: C(fromT(BGL, [1, 0.14, 0.3], 0.66), BGL), b: C(fromT(BGL, [1, 0.1, 0.5], 0.6), BGL), fov: 26, fs: 4, up: [-0.1, 1, 0], ex: 0.45,
            tags: [{ at: [BGP[0] + 0.05, CT + 0.034, BGP[2] + 0.03], x: 640, y: 1360, cap: "EGG", t: W(30) }, { at: [BGP[0] - 0.04, CT + 0.043, BGP[2] + 0.04], x: 70, y: 1300, cap: "CABBAGE", t: W(31) }, { at: [BGP[0], CT + 0.05, BGP[2] + 0.02], x: 640, y: 1250, cap: "SAUCE", t: W(33) }] },
  /* 7 */ { set: "s", a: C([SX + 0.3, CT + 0.14, SZ + 1.25], [SX + 0.4, CT + 0.08, SZ + 0.42]), b: C([SX + 0.28, CT + 0.24, SZ + 1.3], [SX + 0.37, 1.42, SZ - 0.15]), fov: 26, fs: 2.4,
            fd: () => lerp(0.84, 1.48, on(38, 0.5, -0.1)), ex: 0.45, tags: [{ at: [SGN[0], CT + 0.09, SGN[2]], x: 620, y: 1330, cap: "AT THE STALL", big: "RM5 or more", t: W(37) }] },
  /* 8 */ { set: "s", a: C([SX + 1.1, 1.45, SZ + 2.3], [SX, 0.95, SZ]), b: C([SX + 3.6, 3.9, SZ + 8.4], [SX, 0.8, SZ]), fov: 30, fs: 8 },
  /* 9 */ { set: "d", tr: "in", a: C(fromT(FEE, [0.12, 1, 0.55], 0.72), FEE), b: C(fromT(FEE, [0.1, 1, 0.45], 0.62), FEE), fov: 34, fs: 5.6, up: [0.15, 0, -1], src: SRC_BL, note: "form: an illustration" },
  /* 10 */ { set: "d", a: C([VD[0] + 0.3, FY + 0.07, VD[2] + 0.14], ROY), b: C([VD[0] + 0.18, FY + 0.17, VD[2] + 0.32], ROY), fov: 30, fs: 2.8, up: [0.14, 1, 0], src: SRC_BL },
  /* 11 */ { set: "v", tr: "out", a: C(fromT([PK2[0], STH + 0.1, PK2[2]], [-0.4, 0.3, 1], 0.85), [PK2[0], STH + 0.1, PK2[2]]), b: C(fromT([PK2[0], STH + 0.1, PK2[2]], [-0.3, 0.24, 1], 0.74), [PK2[0], STH + 0.1, PK2[2]]), fov: 26, fs: 2.8, src: SRC_BL,
            tags: [{ at: [PK2[0], STH + 0.2, PK2[2]], x: 640, y: 1330, cap: "1 · PATTIES", sub: "from Ramly", t: W(56) }] },
  /* 12 */ { set: "v", a: C(fromT([LIC[0], STH + 0.03, LIC[2]], [0.2, 1, 0.3], 0.46), [LIC[0], STH + 0.03, LIC[2]]), b: C(fromT([LIC[0], STH + 0.03, LIC[2]], [0.1, 1, 0.45], 0.38), [LIC[0], STH + 0.03, LIC[2]]), fov: 26, fs: 4, up: [0.25, 0, -1], src: SRC_BL,
            tags: [{ at: [LIC[0], STH + 0.05, LIC[2]], x: 70, y: 1330, cap: "2 · HAWKER LICENCE", sub: "from your local council", t: W(60) }], note: "card: an illustration" },
  /* 13 */ { set: "v", a: C([VV[0] + 3.6, 2.6, VV[2] + 4.8], [VV[0] + 0.25, 0.7, VV[2]]), b: C([VV[0] + 3.2, 2.4, VV[2] + 4.3], [VV[0] + 0.3, 0.7, VV[2]]), fov: 34, fs: 5.6, src: SRC_BL,
            tags: [{ at: [CART2[0] + 0.3, CT + 0.01, CART2[2] + 0.4], x: 70, y: 1330, cap: "3 · A CART", big: "a few thousand ringgit", sub: "blog and forum estimates: RM2,000–6,000", t: W(70) }] },
  /* 14 */ { set: "v", a: C([VV[0] + 3.2, 1.8, VV[2] + 4.6], [VV[0] + 0.55, 1.35, VV[2]]), b: C([VV[0] + 2.8, 3.5, VV[2] + 5.2], [VV[0] + 0.6, 1.3, VV[2]]), fov: 30, fs: 5.6,
            tags: [{ at: [CART2[0] + 0.05, 2.1, CART2[2] + 0.72], x: 70, y: 1330, cap: "= A RAMLY BURGER STALL", t: W(76) }] },
  /* 15 */ { set: "m", tr: "out", a: C([MX(109.2) - 0.35, 4.5, MZ(4.0) + 0.001], [MX(109.2) - 0.35, 0, MZ(4.0)]), b: C([MX(109.2) - 0.35, 4.8, MZ(4.0) + 0.001], [MX(109.2) - 0.35, 0, MZ(4.0)]), up: [-1, 0, -0.12], fov: 34, fs: 11, src: SRC_VP,
            count: { v: () => "~" + thou(0, 30000, W(78) - 0.3, W(79) + 0.3), unit: "people selling Ramly burgers", t: W(77) }, note: "one dot ≈ 8 stalls · positions are illustrative" },
  /* 16 */ { set: "m", a: C([MX(109.2) + 2.2, 1.0, MZ(4.0) + 2.6], [HUB[0], 0.45, HUB[2]]), b: C([MX(109.2) + 0.3, 1.5, MZ(4.0) + 3.2], [HUB[0], 0.5, HUB[2]]), fov: 34, fs: 8, src: SRC_VP,
            tags: [{ at: [HUB[0], HUB[1] - 0.15, HUB[2]], x: 70, y: 1330, cap: "RAMLY", big: "sells to all of them", t: W(86) }] },
  /* 17 */ { set: "f", tr: "out", a: C([VF[0] + 7, 4.6, VF[2] + 21], [VF[0] + 0.4, 3.6, VF[2] + 1.5]), b: C([VF[0] + 3.2, 3.6, VF[2] + 12], [VF[0] + 0.3, 3.1, VF[2] + 2.7]), fov: 36, fs: 8, src: "Vulcan Post 2020 · Malay Mail 2016",
            count: { v: () => { const x = lerp(0, 1000, lin(W(91) - 0.35, W(92) + 0.2)); return x < 999.5 ? "RM" + Math.round(x) + "m" : "RM1 billion"; }, unit: "a year in sales (2019, company figure)", t: W(90) } },
  /* 18 */ { set: "s", tr: "in", a: C([SX + 15, 16, SZ + 26], [SX - 0.6, 1.5, SZ - 0.4]), b: P1A, fov: 34, fs: 8 },
];
function World({ n }: { n: number }) {
  const s = SETUPS[n - 1].set;
  if (s === "s") return <><StreetSet n={n} /><StreetLights n={n} /></>;
  if (s === "d") return <DocSet n={n} />;
  if (s === "v") return <PartsSet n={n} />;
  if (s === "m") return <MapSet n={n} />;
  return <FactorySet />;
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
  const end = n === NSET ? fade(W(102) + 0.5, 0.25) : 0, logoEnd = n === NSET ? fade(DUR - 2.6, 0.4) : 0, h0 = n === 1 ? 1 - sm(ST[1] - 0.25, ST[1] - 0.05) : 0;
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
    {c.note ? <div style={{ position: "absolute", left: 60, top: 1630, width: 960, fontFamily: FF, fontSize: 33, fontWeight: 400, color: "#b9bcc2", opacity: life }}>{c.note}</div> : null}
    {h0 > 0.01 ? <div style={{ ...BIG, top: 1180, opacity: h0 }}>
      <div style={{ marginBottom: 22 }}>{LOGO(120)}</div>
      Ramly Burger<br />doesn't sell<br /><span style={{ color: YEL }}>burgers.</span></div> : null}
    {end > 0.01 ? <div style={{ ...BIG, top: 1330, opacity: end * (1 - logoEnd), transform: `translateY(${(1 - end) * 14}px)` }}>Would you<br /><span style={{ color: YEL }}>open one?</span></div> : null}
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
      <ToneMapping mode="agx" exposure={SETUPS[n - 1].ex ?? (street ? 0.65 : 0.55)} />
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
const BT = SETUPS.map((_, k) => (k === 0 ? 0.9 : k === NSET - 1 ? W(102) + 1.0 : ST[k + 1] - 0.22));
function Board() {
  const k = useCurrentFrame(); T = BT[k];
  return <Frame n={k + 1} cam={camOf(k)} dk={0} still />;
}
registerRoot(() => <><Composition id="film" component={Film} width={1080} height={1920} fps={RFPS} durationInFrames={FRAMES} /><Composition id="board" component={Board} width={1080} height={1920} fps={FPS} durationInFrames={NSET} /><Composition id="cammap" component={CamMap} width={1080} height={1920} fps={FPS} durationInFrames={SETUPS.map((s) => s.set).filter((s, i, a) => a.indexOf(s) === i).length} /></>);
