
// ================= EX44 film: time hangs on the user's words (tl.json); setups, sets, camera, captions as EX39 =================
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
const ST = [0, W(11) - 0.1, W(13) - 0.12, W(23) - 0.1, W(25) - 0.1, W(29) - 0.1, W(32) - 0.12, W(41) - 0.12, W(47) - 0.1, W(54) - 0.12, W(63) - 0.1, W(67) - 0.12, W(77) - 0.1, W(85) - 0.12, W(93) - 0.1, DUR];
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

// ================= sets (EX44: price a nasi lemak — Bahasa Melayu; costing-sheet UI + food macro) =================
const INK = "#1C2430", PAPER = "#EEF1F4", TEAL = "#1F6F78", SAMBAL = "#B8321F", LEAF = "#3e7b4f", ICE = "#8EC9F0", GOLD = "#E8B53A", FLAG = "#D6452E";
const PS = "'Public Sans', 'Helvetica Neue', Arial, sans-serif";
const eo = (x: number) => 1 - Math.pow(1 - cl(x), 5);                                   // strong ease-out ≈ cubic-bezier(0.23, 1, 0.32, 1)
const onO = (i: number, d = 0.3, off = 0) => eo((T - (W(i) + off)) / d);
// ---------- the food: a banana leaf on a stall counter; each ingredient drops in on its word ----------
const VT = [300, 0, 0], TY = 0.9, LF = [VT[0], TY + 0.004, VT[2]];
const drop = (u: number) => (1 - u) * (1 - u) * 0.12;
function Food({ n }: { n: number }) {
  const P: any[] = [];
  P.push(<Mesh3d key="ct" transform={Transform.fromXyz(VT[0], TY - 0.02, VT[2])}><Cuboid half_size={[0.9, 0.02, 0.6]} /><StandardMaterial base_color="#6b4a2e" normal_map_texture={S("tex/grey_plaster_nor_gl_1k.jpg")} uv_transform={Affine2.fromScale([3, 1])} perceptual_roughness={0.6} /></Mesh3d>);
  P.push(<Mesh3d key="fl" transform={Transform.fromXyz(VT[0], -0.02, VT[2])}><Cuboid half_size={[5, 0.02, 5]} /><StandardMaterial base_color="#14181f" perceptual_roughness={0.8} /></Mesh3d>);
  P.push(<Mesh3d key="leaf" shape={sob().bkLeaf} transform={Transform.fromXyz(LF[0], TY + 0.001, LF[2]).withRotation(rotY(0.3)).withScale([1.9, 0.6, 1.9])}><StandardMaterial base_color={LEAF} perceptual_roughness={0.4} /></Mesh3d>);
  // which ingredients are on the leaf, by time (the loop shots 1 and 15 show the full packet)
  const full = n === 1 || n >= 12, at = (i: number) => (full ? 1 : n < 3 ? 0 : onO(i, 0.35, -0.25));
  const paper = n === 1 ? 1 - onO(4, 0.6, -0.2) : n === 15 ? onO(94, 0.6, -0.2) : 0;
  const rice = at(21), san = at(22), egg = n >= 4 || full ? 1 : 0, bil = n >= 5 || full ? at(25) : 0, kac = n >= 5 || full ? at(27) : 0, tim = n >= 5 || full ? at(28) : 0, smb = n >= 6 || full ? at(29) : 0;
  if (rice > 0.01) { const y0 = TY + 0.006 + drop(rice);
    P.push(<Mesh3d key="rice" name="rice" transform={Transform.fromXyz(LF[0], y0, LF[2]).withScale([1, 0.5, 1])}><Sphere radius={0.07} /><StandardMaterial base_color="#d9d2c2" perceptual_roughness={0.9} /></Mesh3d>);
    for (let i = 0; i < 180; i++) { const a = rnd(i + 200) * 6.283, r = Math.sqrt(rnd(i + 400)) * 0.068, h = 0.035 * Math.sqrt(Math.max(0, 1 - (r / 0.072) ** 2));      // grains on the dome
      P.push(<Mesh3d key={"rg" + i} name={"rg" + i} transform={Transform.fromXyz(LF[0] + Math.cos(a) * r, y0 + h, LF[2] + Math.sin(a) * r).withRotation(Quat.fromEuler("XYZ", rnd(i) * 3, rnd(i * 7) * 3, 0))}><Cuboid half_size={[0.0042, 0.0012, 0.0013]} /><StandardMaterial base_color={i % 5 ? "#ebe5d6" : "#e2dccb"} perceptual_roughness={0.6} /></Mesh3d>); } }
  if (san > 0.01) P.push(<Mesh3d key="san" name="san" transform={Transform.fromXyz(LF[0], TY + 0.013, LF[2]).withScale([1.02, 0.52 * san, 1.02])}><Sphere radius={0.074} /><StandardMaterial base_color={Srgba.hex("#f6ead0").with_alpha(0.22)} alpha_mode="Blend" perceptual_roughness={0.12} /></Mesh3d>);
  if (egg > 0.01) { const u = n === 4 ? onO(24, 0.35, -0.25) : 1, e = [LF[0] + 0.07, TY + 0.012 + drop(u), LF[2] + 0.05];
    P.push(<Mesh3d key="egw" name="egw" transform={Transform.fromXyz(e[0], e[1], e[2]).withScale([1, 0.55, 1.25])}><Sphere radius={0.026} /><StandardMaterial base_color="#f6f3ec" perceptual_roughness={0.35} /></Mesh3d>);
    P.push(<Mesh3d key="egy" name="egy" transform={Transform.fromXyz(e[0], e[1] + 0.011, e[2]).withScale([1, 0.45, 1])}><Sphere radius={0.014} /><StandardMaterial base_color="#f2a51c" perceptual_roughness={0.4} /></Mesh3d>); }
  if (bil > 0.01) for (let i = 0; i < 14; i++) { const a = rnd(i) * 6.28, r = 0.012 + rnd(i * 3) * 0.022;
    P.push(<Mesh3d key={"bl" + i} name={"bl" + i} transform={Transform.fromXyz(LF[0] - 0.07 + Math.cos(a) * r, TY + 0.006 + drop(cl(bil * 1.3 - rnd(i) * 0.3)), LF[2] + 0.06 + Math.sin(a) * r).withRotation(rotY(a * 2))}><Cuboid half_size={[0.008, 0.0016, 0.002]} /><StandardMaterial base_color="#b9874a" perceptual_roughness={0.5} /></Mesh3d>); }
  if (kac > 0.01) for (let i = 0; i < 10; i++) { const a = rnd(i + 30) * 6.28, r = 0.008 + rnd(i * 5) * 0.016;
    P.push(<Mesh3d key={"kc" + i} name={"kc" + i} transform={Transform.fromXyz(LF[0] - 0.08 + Math.cos(a) * r, TY + 0.007 + drop(cl(kac * 1.3 - rnd(i + 3) * 0.3)), LF[2] - 0.04 + Math.sin(a) * r).withScale([1.3, 0.8, 0.9])}><Sphere radius={0.0045} /><StandardMaterial base_color="#c9925a" perceptual_roughness={0.45} /></Mesh3d>); }
  if (tim > 0.01) for (let i = 0; i < 3; i++) { const p = [LF[0] + 0.09 - i * 0.012, TY + 0.006 + i * 0.002 + drop(tim), LF[2] - 0.05 + i * 0.012];
    P.push(<Mesh3d key={"tr" + i} name={"tr" + i} transform={Transform.fromXyz(p[0], p[1], p[2])}><Cylinder radius={0.017} half_height={0.0025} /><StandardMaterial base_color="#3f7a3a" perceptual_roughness={0.4} /></Mesh3d>);
    P.push(<Mesh3d key={"tf" + i} name={"tf" + i} transform={Transform.fromXyz(p[0], p[1] + 0.0004, p[2])}><Cylinder radius={0.0145} half_height={0.0025} /><StandardMaterial base_color="#dfe9b8" perceptual_roughness={0.4} /></Mesh3d>); }
  if (smb > 0.01) P.push(<Mesh3d key="smb" name="smb" transform={Transform.fromXyz(LF[0] + 0.01, TY + 0.03 + drop(smb), LF[2] - 0.02).withScale([1, 0.45, 1])}><Sphere radius={0.03} /><StandardMaterial base_color={SAMBAL} perceptual_roughness={0.22} /></Mesh3d>);
  // the paper, folded up over the packet (unwraps in 1, closes again in 15)
  if (paper > 0.01) P.push(<Mesh3d key="ppr" name="ppr" shape={sob().bkPaper} transform={Transform.fromXyz(LF[0], TY + 0.002 + (1 - paper) * 0.2, LF[2]).withRotation(rotY(0.3)).withScale([1.7 * Math.max(0.001, paper), 1.6 * Math.max(0.001, paper), 1.7 * Math.max(0.001, paper)])}><StandardMaterial base_color="#b98e5e" perceptual_roughness={0.9} /></Mesh3d>);
  // 12: the stall: more packets, the price card
  if (n === 12) { for (let i = 0; i < 6; i++) P.push(<Mesh3d key={"bk" + i} shape={sob().bkPaper} transform={Transform.fromXyz(VT[0] - 0.42 + (i % 3) * 0.14, TY, VT[2] - 0.22 - Math.floor(i / 3) * 0.13).withRotation(rotY(i)).withScale([1.4, 1.3, 1.4])}><StandardMaterial base_color="#b98e5e" perceptual_roughness={0.9} /></Mesh3d>);
    P.push(<Card key="tag" k="tag" p={[LF[0] + 0.2, TY + 0.06, LF[2] + 0.08]} size={[0.13, 0.081]} tex="tag368" ry={-0.35} rx={-0.25} em={0.35} sc={onO(76, 0.3, -0.25)} />); }
  return (<>{P}
    <SpotLight transform={Transform.fromXyz(VT[0] - 0.3, TY + 0.9, VT[2] + 0.55).lookingAt([VT[0], TY, VT[2]])} intensity={15000} outer_angle={0.7} inner_angle={0.3} color="#ffe2b8" shadow_maps_enabled range={4} />
    <RectLight transform={Transform.fromXyz(VT[0] + 0.7, TY + 0.8, VT[2] - 0.4).lookingAt([VT[0], TY, VT[2]])} intensity={9000} width={1.2} height={0.5} color="#b9c9e6" range={4} />
    <PointLight transform={Transform.fromXyz(VT[0] - 0.6, TY + 0.5, VT[2] - 0.8)} intensity={4000} color="#ffb867" range={3} />
    <AmbientLight brightness={30} color="#9fb0d0" />
    <Environment src={S("sky.hdr")} intensity={0.15} />
  </>);
}

// ---------- the costing sheet (Bahasa Melayu) ----------
const ROWS44 = [["Beras", "100 g", 0.32, 21], ["Santan", "25 g", 0.25, 22], ["Telur", "½ biji", 0.25, 24], ["Ikan bilis", "10 g · anggaran", 0.30, 25], ["Kacang", "10 g", 0.09, 27], ["Timun", "20 g", 0.09, 28], ["Sambal", "cili, bawang, minyak, gula", 0.21, 29], ["Pembungkus", "kertas + daun · anggaran", 0.10, 31]] as [string, string, number, number][];
function Sheet({ n }: { n: number }) {
  const shown = (r: [string, string, number, number], i: number) => n >= 7 ? 1 : n === 4 ? (i < 2 ? 1 : i === 2 ? onO(24, 0.3, -0.2) : 0) : n === 6 ? (i < 3 ? 1 : i < 6 ? onO(28, 0.3, -0.6 + (i - 3) * 0.18) : onO(r[3], 0.3, -0.2)) : 0;
  const total = n === 7 ? 1.61 * eo(lin(W(37), W(40) + 0.2)) : 1.61;
  return (<div style={{ position: "absolute", left: 70, top: 380, width: 940, boxSizing: "border-box", borderRadius: 30, background: PAPER, color: INK, fontFamily: PS, padding: "40px 46px", boxShadow: "0 30px 80px rgba(0,0,0,0.55)" }}>
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}><div style={{ fontSize: 50, fontWeight: 700 }}>Kos sebungkus</div><div style={{ fontSize: 28, color: "#4a5361" }}>contoh resipi</div></div>
    <div style={{ marginTop: 26 }}>{ROWS44.map((r, i) => { const v = shown(r, i); if (v < 0.01) return null;
      return (<div key={i} style={{ display: "flex", alignItems: "baseline", fontSize: 36, padding: `${14 * v}px 0`, maxHeight: 74 * v, overflow: "hidden", borderBottom: "1px solid #d5dbe2", opacity: v, transform: `translateX(${(1 - v) * 30}px)` }}>
        <span style={{ fontWeight: 600, width: 250 }}>{r[0]}</span><span style={{ flex: 1, fontSize: 26, color: "#5d6673" }}>{r[1]}</span><span style={{ fontWeight: 600 }}>RM{r[2].toFixed(2)}</span></div>); })}</div>
    {n >= 7 ? <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, fontSize: 48, fontWeight: 800 }}><span>Jumlah</span><span style={{ color: SAMBAL }}>RM{total.toFixed(2)}</span></div> : null}
    <div style={{ marginTop: 18, fontSize: 26, color: "#4a5361" }}>Harga: PriceCatcher (KPDN), Okt 2026 · median nasional</div>
  </div>);
}
function Slider({ n }: { n: number }) {
  const band = n === 9 ? onO(49, 0.4, -0.2) : 0, k = n === 8 ? 0.2 + 0.15 * onO(44, 0.6, -0.2) : 0.35 - 0.0 * band;
  const X = (p: number) => 70 + p / 0.6 * 800;
  return (<div style={{ position: "absolute", left: 70, top: 560, width: 940, fontFamily: PS, color: "#fff" }}>
    <div style={{ fontSize: 46, fontWeight: 700 }}>Kos makanan</div><div style={{ fontSize: 30, color: "#c3cad4", marginTop: 8 }}>bahagian harga untuk bahan</div>
    <div style={{ position: "relative", marginTop: 70, height: 140 }}>
      <div style={{ position: "absolute", left: 70, top: 50, width: 800, height: 16, borderRadius: 8, background: "#2a3340" }} />
      <div style={{ position: "absolute", left: X(0.30), top: 40, width: X(0.35) - X(0.30), height: 36, borderRadius: 8, background: TEAL, opacity: band }} />
      <div style={{ position: "absolute", left: X(k) - 26, top: 32, width: 52, height: 52, borderRadius: 26, background: "#fff", boxShadow: "0 6px 20px rgba(0,0,0,0.5)" }} />
      {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6].map((p) => <div key={p} style={{ position: "absolute", left: X(p) - 30, top: 96, width: 60, textAlign: "center", fontSize: 26, color: "#9aa6b6" }}>{Math.round(p * 100)}%</div>)}
      <div style={{ position: "absolute", left: X(0.30) - 60, top: -26, fontSize: 30, fontWeight: 700, color: ICE, opacity: band }}>30–35% · kebanyakan restoran</div>
    </div>
    <div style={{ fontSize: 26, color: "#c3cad4", marginTop: 20 }}>Panduan industri restoran (bukan peraturan)</div>
  </div>);
}
function Calc({ n }: { n: number }) {
  const second = n === 11, ans = second ? onO(66, 0.35, -0.3) : onO(62, 0.35, -0.3), ex = second ? "RM1.61 ÷ 0.30" : "RM1.61 ÷ 0.35", res = second ? "RM5.37" : "RM4.60";
  return (<div style={{ position: "absolute", left: 90, top: 480, width: 900, fontFamily: PS, color: "#fff" }}>
    <div style={{ borderRadius: 30, background: "#232b37", padding: "50px 50px 40px" }}>
      <div style={{ fontSize: 46, color: "#9aa6b6" }}>{ex} =</div>
      <div style={{ fontSize: 150, fontWeight: 800, letterSpacing: -4, opacity: ans, transform: `translateY(${(1 - ans) * 20}px)` }}>{res}</div>
    </div>
    {second ? <div style={{ marginTop: 40, display: "inline-block", padding: "20px 40px", borderRadius: 20, background: "#f4f1e8", color: INK, fontSize: 76, fontWeight: 800, opacity: onO(66, 0.3, 0.2), transform: `rotate(-3deg) scale(${0.9 + 0.1 * onO(66, 0.3, 0.2)})` }}>RM5.40</div>
      : <div style={{ marginTop: 34, fontSize: 32, color: "#c3cad4" }}>harga minimum pada kos makanan 35%</div>}
  </div>);
}
function Bar({ n }: { n: number }) {
  const f = n === 13 ? 0.438 * eo(lin(W(80) - 0.2, W(84))) : 0.438, split = n === 14 ? [onO(88, 0.3, -0.2), onO(89, 0.3, -0.2), onO(91, 0.3, -0.2)] : [0, 0, 0];
  return (<div style={{ position: "absolute", left: 70, top: 560, width: 940, fontFamily: PS, color: "#fff" }}>
    <div style={{ fontSize: 40, color: "#c3cad4" }}>Sebungkus dijual <span style={{ color: "#fff", fontWeight: 800 }}>RM3.68</span></div>
    <div style={{ marginTop: 40, height: 120, borderRadius: 22, background: "#2a3340", overflow: "hidden", display: "flex" }}>
      <div style={{ width: `${f * 100}%`, background: SAMBAL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50, fontWeight: 800 }}>{f > 0.3 ? `${Math.round(f * 100)}%` : ""}</div>
      {["gas", "sewa", "masa anda"].map((w, i) => <div key={w} style={{ flex: 1, borderLeft: "4px solid #1C2430", background: `rgba(142,201,240,${0.35 * split[i]})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 700, color: ICE, opacity: split[i] }}>{w}</div>)}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18, fontSize: 30, color: "#c3cad4" }}><span>bahan makanan RM1.61</span><span>{n === 14 ? "baki RM2.07" : ""}</span></div>
    <div style={{ marginTop: 26, fontSize: 26, color: "#9aa6b6" }}>RM1.61 ÷ RM3.68 ≈ 44% · purata 2024 (DOSM)</div>
  </div>);
}
function Rail({ n }: { n: number }) {
  return (<div style={{ position: "absolute", left: 90, top: 620, width: 900, fontFamily: PS }}>
    {["Kira kos bahan", "Pilih kos makanan %", "Bahagi", "Semak harga"].map((t, i) => { const v = onO(11, 0.35, -0.3 + i * 0.1);
      return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 26, padding: "28px 32px", marginBottom: 16, borderRadius: 20, background: PAPER, color: INK, opacity: v, transform: `translateX(${(1 - v) * 50}px)` }}>
        <div style={{ width: 62, height: 62, borderRadius: 31, background: TEAL, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 800 }}>{i + 1}</div>
        <div style={{ fontSize: 38, fontWeight: 600 }}>{t}</div></div>); })}
  </div>);
}
function Ui({ n }: { n: number }) {
  const c = SETUPS[n - 1]; if (!c.ui) return null;
  const x = cl((T - ST[n - 1]) / (ST[n] - ST[n - 1])), u = 0.55 * x + 0.45 * ss(x, 0, 1);
  const s = lerp(c.ui.a[0], c.ui.b[0], u), fx = lerp(c.ui.a[1], c.ui.b[1], u), fy = lerp(c.ui.a[2], c.ui.b[2], u);
  const prev = n > 1 ? SETUPS[n - 2].ui : undefined, same = !!prev && prev.screen === c.ui.screen;
  const enter = same ? 1 : eo((T - (ST[n - 1] - 0.05)) / 0.33), blur = (1 - enter) * 10;
  const sc = c.ui.screen, body = sc === "rail" ? <Rail n={n} /> : sc === "sheet" ? <Sheet n={n} /> : sc === "slider" ? <Slider n={n} /> : sc === "calc" ? <Calc n={n} /> : <Bar n={n} />;
  return (<div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: `radial-gradient(ellipse at 50% 40%, #273141 0%, ${INK} 55%, #10151d 100%)` }}>
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
  /* 6 */ { ...U("sheet", [1.0, 540, 980], [1.04, 540, 1000]), step: 1 },
  /* 7 */ { ...U("sheet", [1.0, 540, 1000], [1.03, 540, 1030]), step: 1 },
  /* 8 */ { ...U("slider", [1.0, 540, 900], [1.04, 540, 880]), step: 2 },
  /* 9 */ { ...U("slider", [1.04, 540, 880], [1.08, 540, 860]), step: 2 },
  /* 10 */ { ...U("calc", [1.0, 540, 900], [1.05, 540, 860]), step: 3 },
  /* 11 */ { ...U("calc", [1.0, 540, 980], [1.04, 540, 1000]), step: 3 },
  /* 12 */ { set: "f", tr: "out", a: C(fromT([LF[0] + 0.08, TY + 0.04, LF[2]], [0.6, 0.4, 1], 1.05), [LF[0] + 0.08, TY + 0.04, LF[2]]), b: C(fromT([LF[0] + 0.1, TY + 0.05, LF[2] + 0.03], [0.5, 0.35, 1], 0.92), [LF[0] + 0.1, TY + 0.05, LF[2] + 0.03]), fov: 30, fs: 4, step: 4, src: "Purata 2024: DOSM (Indeks Harga Pengguna)" },
  /* 13 */ { ...U("bar", [1.0, 540, 900], [1.05, 540, 880]), step: 4 },
  /* 14 */ { ...U("bar", [1.05, 540, 880], [1.03, 540, 900]), step: 4 },
  /* 15 */ { set: "f", tr: "in", a: C(fromT(LFC, [0.4, 1.4, 1.1], 0.9), LFC), b: P1A, fov: 30, fs: 4 },
];
function World({ n }: { n: number }) {
  return <Food n={n} />;
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
          <span key={i} style={{ display: "inline-block", position: "relative", margin: "0 9px", padding: c.key ? "0 9px" : "0px", background: `rgba(22,35,60,${c.key ? cl(b - 3) : 0})`, fontWeight: curr && !fresh ? 700 : 300, color: curr && !fresh ? "#ffffff" : "#c9ccd2", transform: `translateY(${fresh ? 7 : 0}px)`, filter: `blur(${fresh ? 5 : 0}px)`, opacity: fresh ? 0.7 : 1 }}>
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
    {c.src ? <div style={{ position: "absolute", left: 60, top: 372, display: "flex", alignItems: "center", gap: 12, fontFamily: FF, fontSize: 32, fontWeight: 500, color: "#e6e8ec", opacity: life * fade(t0 + 0.2, 0.3) }}>{LOGO(34)}<span>{c.src}</span></div> : null}
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
    {c.step ? <div style={{ position: "absolute", left: 60, top: 1520, display: "flex", gap: 12, fontFamily: FF, opacity: still ? 1 : fade(t0 + 0.05, 0.2) }}>{["KIRA", "KOS MAKANAN", "BAHAGI", "SEMAK"].map((w, i) => { const lit = n === 16 || c.step === i + 1, done = (c.step ?? 0) > i + 1;
      return <div key={i} style={{ padding: "8px 14px", borderRadius: 8, background: lit ? YEL : done ? "rgba(255,216,0,0.22)" : "rgba(255,255,255,0.08)", color: lit ? "#17181b" : done ? "#ffd800" : "#8a8d93", fontSize: 26, fontWeight: 700, letterSpacing: 2 }}>{i + 1} · {w}</div>; })}</div> : null}
    {c.note ? <div style={{ position: "absolute", left: 60, top: 1630, width: 960, fontFamily: FF, fontSize: 33, fontWeight: 400, color: "#b9bcc2", opacity: life }}>{c.note}</div> : null}
    {h0 > 0.01 ? <div style={{ ...BIG, top: 1180, opacity: h0 }}>
      <div style={{ marginBottom: 22 }}>{LOGO(120)}</div>
      Harga sebenar<br />nasi lemak<br /><span style={{ color: SAMBAL }}>anda?</span></div> : null}
    {end > 0.01 ? <div style={{ ...BIG, top: 1330, opacity: end * (1 - logoEnd), transform: `translateY(${(1 - end) * 14}px)` }}>Anda jual<br /><span style={{ color: SAMBAL }}>berapa?</span></div> : null}
    {logoEnd > 0.01 ? <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, background: `rgba(13,14,17,${0.98 * logoEnd})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
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
