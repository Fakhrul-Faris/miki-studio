
// ================= EX43 film: time hangs on the user's words (tl.json); setups, sets, camera, captions as EX39 =================
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
const ST = [0, W(13) - 0.1, W(17) - 0.12, W(29) - 0.1, W(32) - 0.1, W(34) - 0.12, W(45) - 0.1, W(49) - 0.1, W(53) - 0.12, W(58) - 0.1, W(71) - 0.12, W(77) - 0.1, W(85) - 0.12, W(93) - 0.1, W(97) - 0.1, W(107) - 0.12, W(115) - 0.1, W(120) + 0.7, DUR];
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
function Card({ p, size, tex, rx = 0, ry = 0, rz = 0, em = 0, sc = 1, k, children, blend = false, unlit = false }: { p: number[]; size: number[]; tex: string; rx?: number; ry?: number; rz?: number; em?: number; sc?: number; k: string; children?: any; blend?: boolean; unlit?: boolean }) {
  return (
    <Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromEuler("YXZ", ry, rx, rz)).withScale(sc3(sc))}>
      <Mesh3d name={k} pass={unlit ? "ui" : undefined}><Cuboid half_size={[size[0] / 2, size[1] / 2, 0.0012]} />
        <StandardMaterial base_color_texture={TX(tex)} emissive={glow("#ffffff", em)} emissive_texture={TX(tex)} perceptual_roughness={0.75} alpha_mode={blend ? "Blend" : "Opaque"} unlit={unlit} /></Mesh3d>
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
function Sign({ p, ry = 0, price, prev, fl = 1, tilt = -0.14, k, sc = 1, em = 0.85, unlit = false }: { p: number[]; ry?: number; price: string; prev?: string; fl?: number; tilt?: number; k: string; sc?: number; em?: number; unlit?: boolean }) {
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
          <Mesh3d key={k + i + c} name={k + i + c} pass={unlit ? "ui" : undefined} transform={Transform.fromXyz(cx, 0.045, 0.0135).withScale([1, sy, 1])}><Cuboid half_size={[w / 2, 0.03, 0.0012]} />
            <StandardMaterial base_color_texture={TX("flap_" + c)} emissive={glow("#ffffff", em)} emissive_texture={TX("flap_" + c)} perceptual_roughness={0.45} unlit={unlit} /></Mesh3d>); })}
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
      {x < 0.98 ? <Mesh3d name={k + "f"} transform={Transform.fromXyz(0, PKH / 2, PD / 2 + 0.0004)}><Cuboid half_size={[PW / 2, PKH / 2, 0.0004]} />{x > 0 ? <StandardMaterial base_color={Srgba.hex("#ffffff").with_alpha(1 - x)} alpha_mode="Blend" base_color_texture={TX("pack_front")} perceptual_roughness={0.45} /> : <StandardMaterial base_color_texture={TX("pack_front")} perceptual_roughness={0.45} />}</Mesh3d> : null}
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

// ================= sets (EX43: how to check an investment scam — 80 % interface, 20 % physical) =================
const INK = "#1C2430", PAPER = "#EEF1F4", TEAL = "#1F6F78", FLAG = "#D6452E", GOLD = "#E8B53A", ICE = "#8EC9F0";
const PS = "'Public Sans', 'Helvetica Neue', Arial, sans-serif", ANT = "Anton, Impact, sans-serif";
// ---------- the physical desk (setups 1, 9, 13, 18): the flyer, the phone ----------
const VT = [300, 0, 0], TY = 0.75;
const FLY = [VT[0] - 0.08, TY + 0.0015, VT[2] + 0.02], PHN = [VT[0] + 0.17, TY + 0.006, VT[2] + 0.08];
function Phone({ p, scr, k, ry = -0.25 }: { p: number[]; scr: string; k: string; ry?: number }) {
  return (<Entity key={k} transform={Transform.fromXyz(p[0], p[1], p[2]).withRotation(Quat.fromEuler("YXZ", ry, -Math.PI / 2, 0))}>
    <Mesh3d name={k + "b"}><Cuboid half_size={[0.038, 0.078, 0.004]} /><StandardMaterial base_color="#16171b" metallic={0.4} perceptual_roughness={0.3} /></Mesh3d>
    <Mesh3d name={k + "r"}><Cuboid half_size={[0.0386, 0.0786, 0.0032]} /><StandardMaterial base_color="#8a8f98" metallic={0.8} perceptual_roughness={0.25} /></Mesh3d>
    <Card k={k + scr} p={[0, 0, 0.0042]} size={[0.068, 0.145]} tex={scr} em={1.0} />
  </Entity>);
}
function DeskSet({ n }: { n: number }) {
  const P: any[] = [];
  P.push(<Mesh3d key="dt" transform={Transform.fromXyz(VT[0], TY - 0.02, VT[2])}><Cuboid half_size={[0.9, 0.02, 0.55]} /><StandardMaterial base_color="#2b313b" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([2, 2])} perceptual_roughness={0.55} /></Mesh3d>);
  P.push(<Mesh3d key="fl" transform={Transform.fromXyz(VT[0], -0.02, VT[2])}><Cuboid half_size={[5, 0.02, 5]} /><StandardMaterial base_color="#14181f" perceptual_roughness={0.8} /></Mesh3d>);
  const drop = n === 1 ? on(1, 0.5, -0.4) : 1;                       // the flyer lands, already moving at frame 0
  P.push(<Card key="fly" k="fly" p={[FLY[0], FLY[1] + (1 - drop) * 0.25, FLY[2] - (1 - drop) * 0.1]} size={[0.21, 0.297]} tex="flyer" rx={-Math.PI / 2 + (1 - drop) * 0.5} rz={0.12 - (1 - drop) * 0.3} em={0.15} />);
  if (n === 18) { const st = on(118, 0.3, -0.2);
    P.push(<Mesh3d key="chk" name="chk" transform={Transform.fromXyz(FLY[0], TY + 0.004, FLY[2]).withRotation(Quat.fromEuler("XYZ", -Math.PI / 2, 0, 0.3)).withScale(sc3(st))}><Cuboid half_size={[0.08, 0.012, 0.0004]} /><StandardMaterial base_color={TEAL} unlit /></Mesh3d>); }
  const scr = n === 9 ? "scr_transfer" : n === 13 ? `scr_dial${T >= W(92) - 0.05 ? 3 : T >= W(92) - 0.25 ? 2 : T >= W(91) ? 1 : 0}` : "scr_transfer";
  P.push(<Phone key="ph" k="ph" p={PHN} scr={scr} />);
  return (<>{P}
    <SpotLight transform={Transform.fromXyz(VT[0] - 0.4, TY + 1.0, VT[2] + 0.5).lookingAt([VT[0], TY, VT[2]])} intensity={26000} outer_angle={0.75} inner_angle={0.3} color="#ffe9cc" shadow_maps_enabled range={4} />
    <RectLight transform={Transform.fromXyz(VT[0] + 0.8, TY + 0.9, VT[2] - 0.4).lookingAt([VT[0], TY, VT[2]])} intensity={9000} width={1.2} height={0.5} color="#b9c9e6" range={4} />
    <AmbientLight brightness={30} color="#9fb0d0" />
    <Environment src={S("sky.hdr")} intensity={0.15} />
  </>);
}

// ---------- the interfaces (illustrations of the real tools; the address bar names where to go) ----------
const typed = (s: string, t0: number, d: number) => s.slice(0, Math.round(s.length * cl((T - t0) / d)));
function Browser({ url, children }: { url: string; children: any }) {
  return (<div style={{ position: "absolute", left: 60, top: 330, width: 960, height: 1330, borderRadius: 34, overflow: "hidden", background: PAPER, boxShadow: "0 30px 80px rgba(0,0,0,0.55)", fontFamily: PS, color: INK }}>
    <div style={{ height: 96, background: "#dfe4ea", display: "flex", alignItems: "center", padding: "0 30px", gap: 18 }}>
      <svg width={26} height={30}><rect x={3} y={13} width={20} height={15} rx={3} fill="#5d6673" /><path d="M7 13 V9 a6 6 0 0 1 12 0 V13" stroke="#5d6673" strokeWidth={3} fill="none" /></svg>
      <div style={{ fontSize: 32, color: "#3a4452" }}>{url}</div>
    </div>
    <div style={{ padding: "44px 50px" }}>{children}</div>
    <div style={{ position: "absolute", right: 30, bottom: 22, fontSize: 22, color: "#8a93a0" }}>illustration of the site</div>
  </div>);
}
function Search({ text, t0, d = 0.9, label }: { text: string; t0: number; d?: number; label: string }) {
  const s = typed(text, t0, d), caret = Math.floor(T * 2) % 2 === 0 && s.length < text.length;
  return (<div style={{ marginTop: 34 }}>
    <div style={{ fontSize: 28, color: "#5d6673", marginBottom: 12 }}>{label}</div>
    <div style={{ height: 96, borderRadius: 16, border: `3px solid ${s ? TEAL : "#c4ccd6"}`, background: "#fff", display: "flex", alignItems: "center", padding: "0 28px", fontSize: 42, gap: 18 }}>
      <svg width={36} height={36}><circle cx={15} cy={15} r={11} stroke={TEAL} strokeWidth={4} fill="none" /><line x1={23} y1={23} x2={33} y2={33} stroke={TEAL} strokeWidth={4} /></svg>
      <span>{s}</span>{caret ? <span style={{ width: 3, height: 46, background: INK }} /> : null}
    </div>
  </div>);
}
const ROWS = [["Asia Profit Hub", "2026"], ["Profit Emas Club", "2026"], ["Golden Lot FX", "2025"], ["Kaya Cepat Digital", "2025"]];
function ResultTable({ hit, show, stamp = 0 }: { hit: number; show: number; stamp?: number }) {
  return (<div style={{ marginTop: 40 }}>
    <div style={{ display: "flex", fontSize: 26, color: "#5d6673", padding: "0 20px 12px", borderBottom: "2px solid #c4ccd6" }}><span style={{ flex: 1 }}>Name</span><span>Added</span></div>
    {ROWS.map(([nm, yr], i) => { const isHit = nm === "Profit Emas Club", vis = isHit ? 1 : 1 - hit;
      if (vis < 0.02) return null;
      return (<div key={i} style={{ position: "relative", display: "flex", alignItems: "center", fontSize: 38, padding: "26px 20px", borderBottom: "1px solid #d5dbe2", opacity: vis * show, background: isHit ? `rgba(214,69,46,${0.12 * hit})` : "transparent", borderLeft: isHit ? `${Math.round(10 * hit)}px solid ${FLAG}` : "none", transform: `translateY(${(1 - show) * 20}px)` }}>
        <span style={{ flex: 1, fontWeight: isHit ? 700 : 400 }}>{nm}</span><span style={{ color: "#5d6673" }}>{yr}</span>
        {isHit && stamp > 0.01 ? <span style={{ position: "absolute", right: 120, top: 8, padding: "6px 20px", border: `5px solid ${FLAG}`, color: FLAG, fontWeight: 800, fontSize: 40, borderRadius: 10, transform: `rotate(-8deg) scale(${lerp(1.6, 1, stamp)})`, opacity: stamp }}>LISTED</span> : null}
      </div>); })}
    <div style={{ fontSize: 22, color: "#8a93a0", marginTop: 16 }}>names on this page are invented examples</div>
  </div>);
}
function UiBnm({ n }: { n: number }) {
  const close = n === 5 ? on(33, 0.4, -0.1) : 0, hit = n === 3 ? 0 : n === 4 ? on(30, 0.35, -0.2) : 1;
  return (<div style={{ position: "absolute", inset: 0, transform: `translateX(${-close * 260}px) scale(${1 - 0.08 * close})`, opacity: 1 - close * 0.55 }}>   {/* "walk away": the page backs off, the stamp stays readable */}
    <Browser url="bnm.gov.my/financial-consumer-alert-list">
      <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.1 }}>Financial Consumer Alert List</div>
      <div style={{ fontSize: 30, color: "#4a5361", marginTop: 16, lineHeight: 1.35 }}>Companies and schemes that may be wrongly presented as licensed or regulated by Bank Negara Malaysia.</div>
      <Search text="Profit Emas" t0={W(19) - 0.1} d={1.2} label="Search the list" />
      <ResultTable hit={hit} show={n === 3 ? on(25, 0.4, -0.2) : 1} stamp={n === 5 ? on(32, 0.3, -0.2) : 0} />
    </Browser></div>);
}
function UiSc({ n }: { n: number }) {
  const lic = n >= 7;
  return (<Browser url={lic ? "sc.com.my/licensed-and-registered-persons" : "sc.com.my/investor-alert-list"}>
    <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.1 }}>{lic ? "Licensed and registered persons" : "Investor Alert List"}</div>
    <div style={{ fontSize: 30, color: "#4a5361", marginTop: 16, lineHeight: 1.35 }}>{lic ? "Firms the Securities Commission has licensed or registered." : "Unauthorised entities and individuals. Do not deal with or invest through them."}</div>
    <Search text="Profit Emas" t0={lic ? W(45) - 0.2 : W(38) - 0.2} d={0.9} label={lic ? "Search licensed firms" : "Search the list"} />
    {lic ? <div style={{ marginTop: 60, padding: "50px 40px", borderRadius: 20, border: "3px dashed #b4bcc7", textAlign: "center", opacity: on(47, 0.35, -0.2) }}>
      <div style={{ fontSize: 46, fontWeight: 700 }}>No match found</div><div style={{ fontSize: 30, color: "#4a5361", marginTop: 12 }}>"Profit Emas Club" is not a licensed firm.</div></div>
      : <ResultTable hit={on(41, 0.35, -0.2)} show={on(40, 0.4, -0.3)} />}
  </Browser>);
}
function UiFlyerButton() {
  const g = on(51, 0.35, -0.2), x = on(52, 0.35, -0.1);
  return (<div style={{ position: "absolute", left: 90, top: 340, width: 900, height: 1272 * 0.9 / 0.9, transformOrigin: "50% 0" }}>
    <img src={S("tx/flyer.png")} style={{ width: 900, height: 1272, borderRadius: 18, filter: `saturate(${1 - 0.7 * g})`, boxShadow: "0 30px 80px rgba(0,0,0,0.55)" }} />
    <div style={{ position: "absolute", left: 170, top: 830, width: 560, height: 130, borderRadius: 60, background: `rgba(120,126,136,${g})` }} />
    <div style={{ position: "absolute", left: 150, top: 893, width: 600 * x, height: 10, background: INK, transform: "rotate(-6deg)", transformOrigin: "0 50%" }} />
    <div style={{ position: "absolute", left: 250, top: 990, padding: "10px 26px", borderRadius: 40, background: TEAL, color: "#fff", fontFamily: PS, fontSize: 36, fontWeight: 700, opacity: x }}>Not licensed: don't invest</div>
  </div>);
}
function UiSemak({ n }: { n: number }) {
  const res = n >= 11;
  return (<Browser url="semakmule.rmp.gov.my">
    <div style={{ fontSize: 58, fontWeight: 700 }}>Semak Mule</div>
    <div style={{ fontSize: 30, color: "#4a5361", marginTop: 12 }}>Check a bank account, phone number or company against police reports.</div>
    <Search text="5621 0098 4412" t0={W(60) - 0.1} d={0.9} label="Bank account number" />
    <Search text="012-345 6789" t0={W(63) - 0.1} d={0.7} label="Phone number" />
    <div style={{ marginTop: 36, height: 96, borderRadius: 48, background: TEAL, color: "#fff", fontSize: 40, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${n === 10 ? lerp(1, 0.96, on(68, 0.12)) : 1})` }}>Search</div>
    {res ? <div style={{ marginTop: 40, padding: "36px 40px", borderRadius: 20, background: "#fff", border: "3px solid #c4ccd6", opacity: n === 11 ? on(72, 0.3, -0.2) : 1 }}>
      <div style={{ fontSize: 42, fontWeight: 700 }}>No record found</div>
      <div style={{ fontSize: 32, color: FLAG, marginTop: 14, fontWeight: 600, opacity: n === 11 ? on(75, 0.3, -0.15) : 1 }}>This is not proof the account is safe.</div>
      {n >= 12 ? <div style={{ marginTop: 26, display: "flex", alignItems: "baseline", gap: 18, opacity: on(79, 0.3, -0.2) }}><span style={{ fontSize: 120, fontWeight: 800 }}>0</span><span style={{ fontSize: 32, color: "#4a5361" }}>reports so far: maybe nobody has reported it yet</span></div> : null}
    </div> : null}
  </Browser>);
}
function UiRing() {
  const f = lin(W(94) - 0.1, W(95) + 0.3), R = 300, c = 2 * Math.PI * R;
  return (<div style={{ position: "absolute", left: 0, top: 380, width: 1080, height: 1200, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: PS }}>
    <svg width={760} height={760} style={{ position: "absolute" }}><circle cx={380} cy={380} r={R} stroke="#2a3340" strokeWidth={34} fill="none" />
      <circle cx={380} cy={380} r={R} stroke={ICE} strokeWidth={34} fill="none" strokeDasharray={`${c * f} ${c}`} transform="rotate(-90 380 380)" strokeLinecap="round" /></svg>
    <div style={{ textAlign: "center", color: "#fff" }}><div style={{ fontSize: 190, fontWeight: 800, letterSpacing: -4 }}>997</div><div style={{ fontSize: 46, color: ICE }}>{Math.round(24 * f)} hours a day</div>
      <div style={{ fontSize: 28, color: "#9aa6b6", marginTop: 14 }}>National Scam Response Centre</div></div>
  </div>);
}
function UiFreeze() {
  const run = lin(W(98), W(105)), stop = on(106, 0.3, -0.15), p = Math.min(run, 0.62) ;
  return (<div style={{ position: "absolute", left: 90, top: 560, width: 900, fontFamily: PS, color: "#fff" }}>
    <div style={{ fontSize: 40, color: "#9aa6b6" }}>RM 5,000 leaving your account</div>
    <div style={{ marginTop: 26, height: 70, borderRadius: 35, background: "#2a3340", overflow: "hidden" }}>
      <div style={{ width: `${p * 100}%`, height: 70, background: stop > 0.5 ? ICE : FLAG, boxShadow: stop > 0.5 ? `0 0 40px ${ICE}` : "none" }} /></div>
    <div style={{ marginTop: 34, fontSize: 76, fontWeight: 800, color: stop > 0.5 ? ICE : "#fff", opacity: 0.4 + 0.6 * stop }}>{stop > 0.5 ? "Frozen" : "Sending…"}</div>
    <div style={{ marginTop: 18, fontSize: 30, color: "#9aa6b6" }}>The sooner you call, the more can be frozen.</div>
    <div style={{ marginTop: 10, fontSize: 22, color: "#6b7686" }}>illustration</div>
  </div>);
}
function UiStats() {
  const m = lerp(0, 34.05, lin(W(110) - 0.2, W(112) + 0.2)), a = on(113, 0.3, -0.1), b = on(114, 0.3, 0.1);
  const card = (big: string, small: string, o: number) => <div style={{ flex: 1, padding: "34px 30px", borderRadius: 22, background: "#232b37", opacity: o, transform: `translateY(${(1 - o) * 18}px)` }}><div style={{ fontSize: 60, fontWeight: 800 }}>{big}</div><div style={{ fontSize: 28, color: "#9aa6b6", marginTop: 6 }}>{small}</div></div>;
  return (<div style={{ position: "absolute", left: 80, top: 500, width: 920, fontFamily: PS, color: "#fff" }}>
    <div style={{ fontSize: 34, color: "#9aa6b6" }}>Kept from scammers in 2025</div>
    <div style={{ fontSize: 170, fontWeight: 800, letterSpacing: -5, lineHeight: 1.05, marginTop: 10 }}>RM{m.toFixed(2)}<span style={{ fontSize: 80 }}>m</span></div>
    <div style={{ display: "flex", gap: 24, marginTop: 50 }}>{card("146,167", "calls to 997", a)}{card("138,915", "accounts frozen", b)}</div>
    <div style={{ marginTop: 30, fontSize: 24, color: "#6b7686" }}>The Star, 3 Mar 2026, quoting the Home Minister</div>
  </div>);
}
const CHECKS = ["Bank Negara's alert list", "SC alert list + licensed firms", "Semak Mule: account and phone", "Paid already? Call 997"];
function UiChecklist({ n }: { n: number }) {
  return (<div style={{ position: "absolute", left: 90, top: 470, width: 900, fontFamily: PS }}>
    <div style={{ fontSize: 44, fontWeight: 700, color: "#fff", marginBottom: 30 }}>{n === 17 ? "Before you invest" : "Four free checks"}</div>
    {CHECKS.map((c, i) => { const inn = n === 2 ? on(13 + Math.min(i, 3), 0.3, -0.25 + i * 0.12) : 1, tick = n === 17 ? on(116 + i, 0.3, -0.2) : 0;
      return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 26, padding: "30px 32px", marginBottom: 18, borderRadius: 20, background: PAPER, color: INK, opacity: inn, transform: `translateX(${(1 - inn) * 60}px)` }}>
        <div style={{ width: 66, height: 66, borderRadius: 33, background: tick > 0.5 ? TEAL : "#d5dbe2", color: tick > 0.5 ? "#fff" : INK, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 800 }}>{tick > 0.5 ? "✓" : i + 1}</div>
        <div style={{ fontSize: 38, fontWeight: 600 }}>{c}</div></div>); })}
  </div>);
}
// the interface camera: zoom s around a focus point (fx, fy), drifting a → b inside the setup
function Ui({ n }: { n: number }) {
  const c = SETUPS[n - 1]; if (!c.ui) return null;
  const x = cl((T - ST[n - 1]) / (ST[n] - ST[n - 1])), u = 0.55 * x + 0.45 * ss(x, 0, 1);
  const s = lerp(c.ui.a[0], c.ui.b[0], u), fx = lerp(c.ui.a[1], c.ui.b[1], u), fy = lerp(c.ui.a[2], c.ui.b[2], u);
  const enter = ss(T, ST[n - 1] - 0.05, ST[n - 1] + 0.28), blur = (1 - enter) * 10;
  const sc = c.ui.screen, body = sc === "bnm" ? <UiBnm n={n} /> : sc === "sc" ? <UiSc n={n} /> : sc === "fly" ? <UiFlyerButton /> : sc === "semak" ? <UiSemak n={n} /> : sc === "ring" ? <UiRing /> : sc === "freeze" ? <UiFreeze /> : sc === "stats" ? <UiStats /> : <UiChecklist n={n} />;
  return (<div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: `radial-gradient(ellipse at 50% 40%, #273141 0%, ${INK} 55%, #10151d 100%)` }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, transformOrigin: "0 0", transform: `translate(${540 - fx * s}px, ${1000 - fy * s}px) scale(${s})`, filter: `blur(${blur}px)`, opacity: 0.4 + 0.6 * enter }}>{body}</div>
  </div>);
}

// ================= the 18 setups =================
type Pose = { p: number[]; l: number[] };
type Tag = { at: number[]; x: number; y: number; cap: string; big?: string; sub?: string; t: number };
type Setup = { set: string; a: Pose; b: Pose; fov?: number; fs?: number; up?: number[]; tr?: "in" | "out" | "side"; fd?: () => number | null; tags?: Tag[];
  count?: { v: () => string; unit: string; t?: number }; note?: string; src?: string; step?: number; ui?: { screen: string; a: number[]; b: number[] } };
const fromT = (l: number[], dir: number[], d: number) => { const k = Math.hypot(dir[0], dir[1], dir[2]); return [l[0] + (dir[0] / k) * d, l[1] + (dir[1] / k) * d, l[2] + (dir[2] / k) * d]; };
const dist3 = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const C = (p: number[], l: number[]): Pose => ({ p, l });
const num = (a: number, b: number, t0: number, t1: number, d = 0) => lerp(a, b, cl((T - t0) / (t1 - t0))).toFixed(d);
const DESKC = [VT[0] + 0.03, TY, VT[2] + 0.04];
const P1A = C(fromT(DESKC, [0.25, 1.3, 0.9], 0.85), DESKC);
const NOCAM = C([VT[0], 3, VT[2] + 3], [VT[0], 0, VT[2]]);           // UI setups: the 3D camera rests on the empty desk room
const U = (screen: string, a: number[], b: number[]) => ({ ui: { screen, a, b }, set: "u", a: NOCAM, b: NOCAM });
const SRC_BNM = "bnm.gov.my/financial-consumer-alert-list", SRC_SC = "sc.com.my/investor-alert-list", SRC_SM = "semakmule.rmp.gov.my (PDRM)";
const SETUPS: Setup[] = [
  /* 1 */ { set: "d", a: P1A, b: C(fromT(DESKC, [0.2, 1.4, 0.7], 0.7), DESKC), fov: 30, fs: 4 },
  /* 2 */ { ...U("check", [1.0, 540, 900], [1.04, 540, 880]) },
  /* 3 */ { ...U("bnm", [1.0, 540, 980], [1.1, 540, 900]) },
  /* 4 */ { ...U("bnm", [1.04, 540, 1000], [1.08, 540, 1020]) },
  /* 5 */ { ...U("bnm", [1.08, 540, 1020], [1.03, 540, 1000]) },
  /* 6 */ { ...U("sc", [1.0, 540, 980], [1.1, 540, 920]) },
  /* 7 */ { ...U("sc", [1.1, 540, 960], [1.12, 540, 1020]) },
  /* 8 */ { ...U("fly", [0.95, 540, 980], [1.25, 540, 1240]) },
  /* 9 */ { set: "d", tr: "out", a: C(fromT(PHN, [-0.15, 1.6, 0.7], 0.42), PHN), b: C(fromT(PHN, [-0.1, 1.7, 0.55], 0.34), PHN), fov: 26, fs: 4 },
  /* 10 */ { ...U("semak", [1.0, 540, 980], [1.08, 540, 940]) },
  /* 11 */ { ...U("semak", [1.04, 540, 1000], [1.07, 540, 1025]) },
  /* 12 */ { ...U("semak", [1.07, 540, 1025], [1.08, 540, 1035]) },
  /* 13 */ { set: "d", tr: "in", a: C(fromT(PHN, [0.2, 1.8, 0.5], 0.36), PHN), b: C(fromT(PHN, [0.1, 1.9, 0.4], 0.3), PHN), fov: 26, fs: 4, src: "NSRC hotline 997" },
  /* 14 */ { ...U("ring", [1.0, 540, 980], [1.08, 540, 980]), src: "The Star, 3 Mar 2026: NSRC now 24/7" },
  /* 15 */ { ...U("freeze", [1.0, 540, 900], [1.12, 540, 820]) },
  /* 16 */ { ...U("stats", [1.0, 540, 900], [1.06, 540, 880]) },
  /* 17 */ { ...U("check", [1.04, 540, 880], [1.0, 540, 900]) },
  /* 18 */ { set: "d", tr: "in", a: C(fromT(DESKC, [0.4, 1.6, 1.2], 1.2), DESKC), b: P1A, fov: 30, fs: 4 },
];
function World({ n }: { n: number }) {
  return <DeskSet n={n} />;
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
const LOGO = (h: number) => null;   // no brand in a how-to about public tools
function Overlay({ n, cam, still }: { n: number; cam: Cam; still?: boolean }) {
  const c = SETUPS[n - 1], t0 = ST[n - 1], t1 = ST[n];
  const life = still ? 1 : fade(t0 + 0.12) * (1 - ss(T, t1 - 0.2, t1 - 0.04));
  const end = n === NSET ? fade(ST[NSET - 1] + 0.2, 0.25) : 0, logoEnd = n === NSET ? fade(DUR - 2.6, 0.4) : 0, h0 = n === 1 ? 1 - sm(ST[1] - 0.25, ST[1] - 0.05) : 0;
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
    {c.step ? <div style={{ position: "absolute", left: 60, top: 1520, display: "flex", gap: 12, fontFamily: FF, opacity: still ? 1 : fade(t0 + 0.05, 0.2) }}>{["COURSE", "JAB", "LICENCE", "CART"].map((w, i) => { const lit = n === 16 || c.step === i + 1, done = (c.step ?? 0) > i + 1;
      return <div key={i} style={{ padding: "8px 14px", borderRadius: 8, background: lit ? YEL : done ? "rgba(255,216,0,0.22)" : "rgba(255,255,255,0.08)", color: lit ? "#17181b" : done ? "#ffd800" : "#8a8d93", fontSize: 26, fontWeight: 700, letterSpacing: 2 }}>{i + 1} · {w}</div>; })}</div> : null}
    {c.note ? <div style={{ position: "absolute", left: 60, top: 1630, width: 960, fontFamily: FF, fontSize: 33, fontWeight: 400, color: "#b9bcc2", opacity: life }}>{c.note}</div> : null}
    {h0 > 0.01 ? <div style={{ ...BIG, top: 1180, opacity: h0 }}>
      <div style={{ marginBottom: 22 }}>{LOGO(120)}</div>
      Scam or not?<br /><span style={{ color: GOLD }}>4 free checks.</span></div> : null}
    {end > 0.01 ? <div style={{ ...BIG, top: 1330, opacity: end * (1 - logoEnd), transform: `translateY(${(1 - end) * 14}px)` }}>Which check<br /><span style={{ color: ICE }}>first?</span></div> : null}
    {logoEnd > 0.01 ? <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: `rgba(13,14,17,${0.82 * logoEnd})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img src={S("meikigo-logo.png")} style={{ height: 300, opacity: logoEnd, transform: `scale(${0.94 + 0.06 * logoEnd})` }} /></div> : null}
  </>);
}
const FACE = `@font-face { font-family: "Outfit"; src: url(${S("fonts/Outfit.ttf")}); font-weight: 100 900; } @font-face { font-family: "Public Sans"; src: url(${S("fonts/PublicSans.ttf")}); font-weight: 100 900; } @font-face { font-family: "Anton"; src: url(${S("fonts/Anton.ttf")}); }`;
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
      <Ui n={n} />
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
const BT = SETUPS.map((_, k) => (k === 0 ? 0.9 : k === NSET - 1 ? ST[NSET - 1] + 1.0 : ST[k + 1] - 0.22));
function Board() {
  const k = useCurrentFrame(); T = BT[k];
  return <Frame n={k + 1} cam={camOf(k)} dk={0} still />;
}
registerRoot(() => <><Composition id="film" component={Film} width={1080} height={1920} fps={RFPS} durationInFrames={FRAMES} /><Composition id="board" component={Board} width={1080} height={1920} fps={FPS} durationInFrames={NSET} /><Composition id="cammap" component={CamMap} width={1080} height={1920} fps={FPS} durationInFrames={SETUPS.map((s) => s.set).filter((s, i, a) => a.indexOf(s) === i).length} /></>);
