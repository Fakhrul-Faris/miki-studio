
// ================= EX42 film: time hangs on the user's words (tl.json); setups, sets, camera, captions as EX39 =================
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
const ST = [0, W(9) - 0.1, W(20) - 0.1, W(26) - 0.1, W(30) - 0.1, W(32) - 0.1, W(35) - 0.1, W(43) - 0.1, W(45) - 0.1, W(51) - 0.1, W(57) - 0.1, W(64) - 0.1, W(71) - 0.1, W(79) - 0.1, DUR];
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
const LOGO = (h: number) => <img src={S("tng_ewallet_logo.png")} style={{ height: h, borderRadius: 4 }} />;
function Overlay({ n, cam, still }: { n: number; cam: Cam; still?: boolean }) {
  const c = SETUPS[n - 1], t0 = ST[n - 1], t1 = ST[n];
  const life = still ? 1 : fade(t0 + 0.12) * (1 - ss(T, t1 - 0.2, t1 - 0.04));
  const end = n === NSET ? fade(W(90) + 0.5, 0.25) : 0, logoEnd = n === NSET ? fade(DUR - 2.6, 0.4) : 0, h0 = n === 1 ? 1 - sm(ST[1] - 0.25, ST[1] - 0.05) : 0;
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
      <span style={{ color: BLUEH, fontSize: 150 }}>RM43.</span><br />average e-money<br />payment, 2025</div> : null}
    {end > 0.01 ? <div style={{ ...BIG, top: 1330, opacity: end * (1 - logoEnd), transform: `translateY(${(1 - end) * 14}px)` }}>How much<br />sits in <span style={{ color: BLUEH }}>yours?</span></div> : null}
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
      <Look mode="paint" bands={4} shadow="#1b2233" mid="#4a5670" grain={0.35} rag={1.4} skip={["ui"]} />   {/* Style C: painted night; brand surfaces in the "ui" pass stay exact */}
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
const BT = SETUPS.map((_, k) => (k === 0 ? 0.9 : k === NSET - 1 ? W(90) + 1.0 : ST[k + 1] - 0.22));
function Board() {
  const k = useCurrentFrame(); T = BT[k];
  return <Frame n={k + 1} cam={camOf(k)} dk={0} still />;
}
registerRoot(() => <><Composition id="film" component={Film} width={1080} height={1920} fps={RFPS} durationInFrames={FRAMES} /><Composition id="board" component={Board} width={1080} height={1920} fps={FPS} durationInFrames={NSET} /><Composition id="cammap" component={CamMap} width={1080} height={1920} fps={FPS} durationInFrames={SETUPS.map((s) => s.set).filter((s, i, a) => a.indexOf(s) === i).length} /></>);
