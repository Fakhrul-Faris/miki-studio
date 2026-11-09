// Style test v2 · A · S1 (SHOTLIST.md): a coin rolls along a Malaysian five-foot way at dusk, past 99 Speedmart, to
// Mr DIY; on "cheap" its roller shutter rolls up and its lights come on. White plaster world with real texture, Mr DIY
// the one real-coloured shop. Models: Poly Haven (CC0); Vespa by Jasmine Roberts via Poly Pizza (CC-BY 3.0).
import { AbsoluteFill, Composition, Easing, interpolate, registerRoot, staticFile, useCurrentFrame } from "raea";
import { AmbientOcclusion, Bloom, DepthOfField, Environment, Grade, ImagePlane, Model, ToneMapping, manifold, type Solid } from "raea/3d";
import { Cuboid, Cylinder, Mesh3d } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { AmbientLight, DirectionalLight, PointLight, RectLight, Shadows, SpotLight } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
import { Affine2 } from "raea/math";
import { LinearRgba, Srgba } from "raea/color";

const FPS = 30;
const S = (p: string) => staticFile(p);
const glow = (hex: string, k: number) => LinearRgba.from(Srgba.hex(hex)).mul(k);
const ez = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });

// ---------- layout (metres; y up; the five-foot way runs along +x, shopfronts at z = -2.6, pillars at z = 0) ----------
const UW = 5;                                   // unit width
const UNITS = [-3, -2, -1, 0, 1, 2];            // unit i spans x = i*UW .. (i+1)*UW ; Mr DIY = 0, 99 Speedmart = -1
const DIY = 0, SPD = -1;
const FRONT = -2.6, CEIL = 3.7;

// ---------- solids (built once) ----------
let SO: Record<string, Solid> | null = null;
const so = () => (SO ??= {
  // segmental arch between two pillars: a slab with a big circle cut out of its underside (cylinder runs along z)
  arch: manifold.box(UW - 0.5, 1.5, 0.42).move(-(UW - 0.5) / 2, 0, -0.21)
    .minus(manifold.cylinder(2.6, 2).move(0, -1.6, -1)),
  pillar: manifold.roundedBox(0.46, 2.9, 0.46, 0.03),
  plinth: manifold.roundedBox(0.62, 0.35, 0.62, 0.03),
  capital: manifold.roundedBox(0.62, 0.22, 0.62, 0.03),
  coin: manifold.cylinder(0.085, 0.022).move(0, 0, -0.011).minus(manifold.cylinder(0.062, 0.03).move(0, 0, 0.004)).union(manifold.cylinder(0.064, 0.016).move(0, 0, -0.008)),
});

// ---------- materials ----------
const T = (n: string) => ({ base_color_texture: S(`tex/${n}_diff_1k.jpg`), normal_map_texture: S(`tex/${n}_nor_gl_1k.jpg`), metallic_roughness_texture: S(`tex/${n}_rough_1k.jpg`), perceptual_roughness: 1 });
function Plaster({ u = 2, v = 2, tint = "#f2efe9" }) { return <StandardMaterial {...T("grey_plaster")} base_color={tint} uv_transform={Affine2.fromScale([u, v])} />; }
function Worn({ u = 2, v = 2, tint = "#efe9df" }) { return <StandardMaterial {...T("damaged_plaster")} base_color={tint} uv_transform={Affine2.fromScale([u, v])} />; }
function Tiles({ name, u, v, tint = "#ffffff" }: { name: string; u: number; v: number; tint?: string }) { return <StandardMaterial {...T(name)} base_color={tint} uv_transform={Affine2.fromScale([u, v])} />; }
const CLAYW = "#e9e5de";

function Box({ p, s, children, name }: { p: [number, number, number]; s: [number, number, number]; children: any; name?: string }) {
  return <Mesh3d name={name} transform={Transform.fromXyz(...p)}><Cuboid half_size={[s[0] / 2, s[1] / 2, s[2] / 2]} />{children}</Mesh3d>;
}

// ---------- one shophouse unit on the five-foot way ----------
function Unit({ i, f }: { i: number; f: number }) {
  const x0 = i * UW, cx = x0 + UW / 2, diy = i === DIY, spd = i === SPD;
  const up = diy ? ez(f, 0.55 * FPS, 1.45 * FPS) : spd ? 0.58 : 0;          // shutter raised share
  const lit = diy ? ez(f, 1.1 * FPS, 1.9 * FPS) : 0;
  const parts: any[] = [];
  // the shopfront wall with its opening (two piers + a lintel), plaster with real grain
  parts.push(<Box key="pl" p={[x0 + 0.35, 1.6, FRONT - 0.15]} s={[0.7, 3.2, 0.3]}>{diy ? <Worn u={0.6} v={2} tint="#f4e9c8" /> : <Plaster u={0.6} v={2} />}</Box>);
  parts.push(<Box key="pr" p={[x0 + UW - 0.35, 1.6, FRONT - 0.15]} s={[0.7, 3.2, 0.3]}>{diy ? <Worn u={0.6} v={2} tint="#f4e9c8" /> : <Plaster u={0.6} v={2} />}</Box>);
  parts.push(<Box key="li" p={[cx, 3.45, FRONT - 0.15]} s={[UW, 0.5, 0.3]}>{diy ? <Worn u={2} v={0.4} tint="#f4e9c8" /> : <Plaster u={2} v={0.4} />}</Box>);
  // fascia signboard over the opening (on the shopfront, facing the five-foot way)
  parts.push(<Box key="sg" p={[cx, 3.0, FRONT + 0.05]} s={[UW - 1.6, 0.62, 0.1]}>
    <StandardMaterial base_color={diy ? "#d92128" : CLAYW} perceptual_roughness={0.5} emissive={diy ? glow("#ff2a2a", 0.15 + 1.4 * lit) : undefined} /></Box>);
  if (diy) parts.push(<ImagePlane key="lg" src={S("mrdiy_logo.png")} width={UW - 1.9} position={[cx, 3.0, FRONT + 0.11]} />);
  if (spd) parts.push(<ImagePlane key="lg" src={S("99speedmart_logo.png")} width={2.4} position={[cx, 3.0, FRONT + 0.11]} />);
  // the roller shutter (real model), sliding up into the box under the lintel
  const sh = 3.6 / 1.08;
  parts.push(<Model key="shut" src={S("parts/shutter.glb")} position={[cx, up * 2.45, FRONT - 0.02]} scale={[sh, 1.12, 0.6]}>
    <StandardMaterial base_color={diy ? "#d8dde2" : "#ece8e1"} /></Model>);
  // interior: Mr DIY bright and packed; 99 Speedmart dim and cool; others closed
  if (diy || spd) {
    parts.push(<Box key="if" p={[cx, 0.01, FRONT - 3.5]} s={[UW - 1.4, 0.02, 6.6]}><StandardMaterial base_color={diy ? "#b9ab92" : "#5b6170"} perceptual_roughness={0.4} /></Box>);
    parts.push(<Box key="ib" p={[cx, 1.6, FRONT - 6.8]} s={[UW - 1.4, 3.2, 0.1]}><StandardMaterial base_color={diy ? "#cdb98f" : "#3d4250"} emissive={diy ? glow("#fff1d8", 0.12 * lit) : undefined} /></Box>);
    parts.push(<Box key="iwl" p={[x0 + 0.72, 1.6, FRONT - 3.5]} s={[0.06, 3.2, 6.6]}><StandardMaterial base_color={diy ? "#d3c29c" : "#3d4250"} /></Box>);
    parts.push(<Box key="iwr" p={[x0 + UW - 0.72, 1.6, FRONT - 3.5]} s={[0.06, 3.2, 6.6]}><StandardMaterial base_color={diy ? "#d3c29c" : "#3d4250"} /></Box>);
    parts.push(<Box key="ic" p={[cx, 3.2, FRONT - 3.5]} s={[UW - 1.4, 0.05, 6.6]}><StandardMaterial base_color={diy ? "#f6f1e6" : "#2c3039"} /></Box>);
  }
  if (diy) {
    for (const [sx, sz] of [[x0 + 1.15, -4.0], [x0 + 3.85, -4.0], [x0 + 1.15, -6.0], [x0 + 3.85, -6.0]] as [number, number][]) {
      parts.push(<Model key={`sh${sx}${sz}`} src={S("parts/shelves.glb")} position={[sx, 0, sz]} rotation={[0, Math.PI / 2, 0]} scale={[0.95, 0.95, 0.95]} />);
    }
    // goods on the shelves: real tools and bright packaging
    const goods = ["Drill_01", "metal_toolbox", "spray_paint_bottles", "plastic_container", "cardboard_box_01", "watering_can_metal_01"];
    let n = 0;
    for (const sx of [x0 + 1.15, x0 + 3.85]) for (const sz of [-4.0, -6.0]) for (const lv of [0.45, 1.15]) for (const dz of [-0.45, 0.0, 0.45]) {
      const g = goods[n % goods.length]; n++;
      parts.push(<Model key={`g${n}`} src={S(`${g}/${g}.gltf`)} position={[sx, lv, sz + dz]} rotation={[0, (n % 4) * 0.7, 0]} />);
    }
    const PACK = ["#e3262b", "#ffd400", "#2f6fd6", "#f28c28", "#3bb273", "#ffffff", "#7a4fd1", "#1f2a44"];
    let q = 0;
    for (const sx of [x0 + 1.15, x0 + 3.85]) for (const sz of [-4.0, -6.0]) for (const lv of [0.12, 0.82, 1.52]) for (let j = 0; j < 7; j++) {
      const hgt = 0.18 + ((q * 37) % 5) * 0.04; q++;
      parts.push(<Box key={`pk${q}`} p={[sx + (sx < x0 + 2 ? 0.28 : -0.28), lv + hgt / 2 + 0.02, sz - 0.78 + j * 0.24]} s={[0.22, hgt, 0.2]}><StandardMaterial base_color={PACK[(q * 5) % PACK.length]} perceptual_roughness={0.5} /></Box>);
    }
    parts.push(<Model key="ht" src={S("hand_truck/hand_truck.gltf")} position={[x0 + 2.5, 0, -7.2]} rotation={[0, 0.4, 0]} />);
    parts.push(<Model key="cr" src={S("CashRegister_01/CashRegister_01.gltf")} position={[x0 + 1.0, 0.95, -3.0]} />);
    parts.push(<Box key="ct" p={[x0 + 1.0, 0.47, -3.0]} s={[1.1, 0.94, 0.6]}><StandardMaterial base_color="#ffd400" perceptual_roughness={0.45} /></Box>);
    // red baskets stacked by the door (a Mr DIY detail)
    for (let b = 0; b < 6; b++) parts.push(<Box key={`bk${b}`} p={[x0 + 4.2, 0.1 + b * 0.13, FRONT + 0.6]} s={[0.46, 0.12, 0.32]}><StandardMaterial base_color="#e3262b" perceptual_roughness={0.45} /></Box>);
    // fluorescent tubes on the ceiling switch on in turn
    for (let r = 0; r < 4; r++) {
      const on = ez(f, (1.1 + r * 0.18) * FPS, (1.25 + r * 0.18) * FPS);
      parts.push(<Box key={`tb${r}`} p={[cx, 3.12, FRONT - 1.2 - r * 1.5]} s={[2.4, 0.05, 0.08]}><StandardMaterial base_color="#ffffff" emissive={glow("#f4fbff", 0.05 + 4 * on)} /></Box>);
    }
  }
  if (diy) {
    parts.push(<Box key="bl" p={[x0 + 0.3, CEIL - 0.75, -1.0]} s={[0.16, 0.72, 1.7]}><StandardMaterial base_color="#d92128" emissive={glow("#ff2a2a", 0.2 + 1.6 * lit)} /></Box>);
    parts.push(<ImagePlane key="blg" src={S("mrdiy_logo.png")} width={1.6} position={[x0 + 0.21, CEIL - 0.75, -1.0]} rotation={[0, -Math.PI / 2, 0]} />);
    parts.push(<Box key="blh" p={[x0 + 0.3, CEIL - 0.2, -1.0]} s={[0.03, 0.4, 0.03]}><StandardMaterial base_color="#333" /></Box>);
  }
  if (spd) {
    parts.push(<Box key="bl" p={[x0 + 0.3, CEIL - 0.75, -1.0]} s={[0.16, 0.6, 1.4]}><StandardMaterial base_color="#e9e5de" /></Box>);
    parts.push(<ImagePlane key="blg" src={S("99speedmart_logo.png")} width={1.2} position={[x0 + 0.21, CEIL - 0.75, -1.0]} rotation={[0, -Math.PI / 2, 0]} />);
  }
  if (spd) parts.push(<Box key="sb" p={[cx, 1.2, FRONT - 3.5]} s={[3.2, 2.4, 0.4]}><StandardMaterial base_color="#4a505e" /></Box>);
  return <>{parts}</>;
}

// ---------- the arcade: pillars, arches, ceiling, floor, kerb, road ----------
function Arcade() {
  const p: any[] = [];
  for (const i of [...UNITS, 3]) {
    const x = i * UW;
    p.push(<Mesh3d key={`pb${i}`} transform={Transform.fromXyz(x, 0.175, 0)} shape={so().plinth}><Plaster u={0.3} v={0.2} /></Mesh3d>);
    p.push(<Mesh3d key={`pc${i}`} transform={Transform.fromXyz(x, 1.8, 0)} shape={so().pillar}><Plaster u={0.3} v={1.4} /></Mesh3d>);
    p.push(<Mesh3d key={`pk${i}`} transform={Transform.fromXyz(x, 3.36, 0)} shape={so().capital}><Plaster u={0.3} v={0.2} /></Mesh3d>);
    if (i !== 3) p.push(<Mesh3d key={`ar${i}`} transform={Transform.fromXyz(x + UW / 2, 2.95, 0)} shape={so().arch}><Plaster u={2} v={0.6} /></Mesh3d>);
    // the arcade's cross beams over each pillar line
    p.push(<Box key={`bm${i}`} p={[x, CEIL - 0.15, FRONT / 2]} s={[0.36, 0.3, -FRONT + 0.4]}><Plaster u={0.3} v={1} /></Box>);
  }
  const x0 = UNITS[0] * UW, x1 = (UNITS[UNITS.length - 1] + 1) * UW, xm = (x0 + x1) / 2, L = x1 - x0;
  p.push(<Box key="ceil" p={[xm, CEIL + 0.1, FRONT / 2]} s={[L, 0.2, -FRONT + 0.5]}><Plaster u={L / 2} v={1.4} /></Box>);
  p.push(<Box key="upper" p={[xm, CEIL + 1.8, 0.2]} s={[L, 3.4, 0.4]}><Worn u={L / 3} v={1.2} /></Box>);
  // five-foot way floor: Mr DIY's section in its own brown tiles, the rest in grey concrete tiles
  p.push(<Box key="fl" p={[xm, -0.03, FRONT / 2]} s={[L, 0.06, -FRONT + 0.46]}><Tiles name="concrete_tiles" u={L / 1.2} v={2.4} tint="#e8e4dc" /></Box>);
  p.push(<Box key="fld" p={[DIY * UW + UW / 2, -0.025, FRONT / 2]} s={[UW - 0.1, 0.06, -FRONT + 0.2]}><Tiles name="brown_floor_tiles" u={UW / 0.9} v={3} /></Box>);
  p.push(<Box key="kb" p={[xm, -0.12, 0.42]} s={[L, 0.24, 0.4]}><Plaster u={L / 2} v={0.2} tint="#d9d4cb" /></Box>);
  p.push(<Box key="rd" p={[xm, -0.3, 6]} s={[L + 20, 0.1, 11]}><Tiles name="asphalt_02" u={20} v={6} tint="#9a978f" /></Box>);
  // overhead wiring and a power box on a pillar, plants and crates along the way, a parked scooter
  for (let w = 0; w < 3; w++) p.push(<Mesh3d key={`w${w}`} transform={Transform.fromXyz(xm, CEIL - 0.02 - w * 0.05, -0.6 - w * 0.35).withRotation(Quat.fromEuler("XYZ", 0, 0, Math.PI / 2))}><Cylinder radius={0.012} half_height={L / 2} /><StandardMaterial base_color="#2a2a2a" /></Mesh3d>);
  p.push(<Model key="pbx" src={S("power_box_01/power_box_01.gltf")} position={[-5 + 0.25, 1.4, -0.15]} rotation={[0, Math.PI / 2, 0]} />);
  p.push(<Model key="pot1" src={S("potted_plant_02/potted_plant_02.gltf")} position={[-9.6, 0, -0.5]} scale={[1.6, 1.6, 1.6]} />);
  p.push(<Model key="pot2" src={S("potted_plant_02/potted_plant_02.gltf")} position={[5.4, 0, -0.45]} scale={[1.3, 1.3, 1.3]} />);
  for (let c = 0; c < 3; c++) p.push(<Model key={`cr${c}`} src={S("plastic_crate_01/plastic_crate_01.gltf")} position={[-1.2, c * 0.29, FRONT + 0.5]} rotation={[0, c * 0.2, 0]} />);
  p.push(<Model key="ch1" src={S("plastic_monobloc_chair_01/plastic_monobloc_chair_01.gltf")} position={[-2.2, 0, FRONT + 0.7]} rotation={[0, 0.6, 0]} />);
  p.push(<Model key="ch2" src={S("plastic_monobloc_chair_01/plastic_monobloc_chair_01.gltf")} position={[-7.0, 0, FRONT + 0.6]} rotation={[0, -0.3, 0]} />);
  p.push(<Model key="lamp" src={S("street_lamp_01/street_lamp_01.gltf")} position={[3.0, -0.3, 1.2]} scale={[1.6, 1.6, 1.6]} />);
  return <>{p}</>;
}

// ---------- the coin (the episode's token) ----------
const coinAt = (t: number) => { const u = interpolate(t, [0, 3.0], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }); return { u, x: -6.2 + 8.0 * u, z: -1.05 - 0.55 * u }; };
function Coin({ f }: { f: number }) {
  const t = f / FPS;
  const { u, x, z } = coinAt(t);
  const roll = -(x + 6.2) / 0.085;                               // rolling without slipping
  const wob = (1 - u) * 0.05 * Math.sin(t * 9) + u * u * 0.25;   // wobbles more as it slows
  return <Mesh3d name="coin" transform={Transform.fromXyz(x, 0.085, z).withRotation(Quat.fromEuler("YXZ", -0.2, wob, roll))} shape={so().coin}>
    <StandardMaterial base_color="#d9a63a" metallic={1} perceptual_roughness={0.28} /></Mesh3d>;
}

function Shot() {
  const f = useCurrentFrame(), t = f / FPS;
  const lit = ez(f, 1.1 * FPS, 1.9 * FPS);
  const c = coinAt(t);
  const k = interpolate(t, [0, 3.4], [0, 1], { easing: Easing.inOut(Easing.cubic) });
  const cam: [number, number, number] = [-7.6 + 4.2 * k, 0.32 + 0.12 * k, -0.55];
  const look: [number, number, number] = [2.6, 1.15 + 0.15 * k, -2.2];
  return (
    <AbsoluteFill style={{ background: "#2a3346" }}>
      <Camera3d transform={Transform.fromXyz(...cam).lookingAt(look)} projection={{ Perspective: { fov: 0.9 } }}>
        <DepthOfField focal_distance={Math.hypot(c.x - cam[0], c.z - cam[2]) + 0.3} aperture_f_stops={5.6} />
      </Camera3d>
      <Environment src={S("sky.hdr")} intensity={0.32} rotation={2.2} background />
      <AmbientLight brightness={12} />
      {/* low dusk sun from the street side: the arches cut its light into shapes on the five-foot way */}
      <DirectionalLight color="#ff9a4d" transform={Transform.fromXyz(-5, 1.8, 14).lookingAt([0, 0, -1.6])} illuminance={5200} shadow_maps_enabled soft_shadow_size={0.6} />
      <Shadows distance={40} firstCascade={6} mapSize={4096} bias={0.03} normalBias={1.5} />
      {/* Mr DIY's own light: spills out of the open shutter onto the tiles */}
      <RectLight transform={Transform.fromXyz(UW / 2, 2.4, FRONT - 0.5).lookingAt([UW / 2, 0, 0.5])} intensity={70000 * lit} width={3.6} height={2.2} color="#fff2dc" range={14} />
      <PointLight transform={Transform.fromXyz(UW / 2, 2.6, FRONT - 3)} intensity={300000 * lit} color="#ffe9c8" range={12} />
      <PointLight transform={Transform.fromXyz(SPD * UW + UW / 2, 2.0, FRONT - 2.5)} intensity={180000} color="#b9d0ff" range={8} />
      <SpotLight transform={Transform.fromXyz(3.0, 5.2, 1.4).lookingAt([3.0, 0, 0.6])} intensity={900000} outer_angle={0.6} inner_angle={0.3} color="#ffc98a" />
      <Bloom intensity={0.55} threshold={0.95} />
      <AmbientOcclusion quality="high" />
      <ToneMapping mode="agx" exposure={0.95} />
      <Grade temperature={0.02} vignette={0.25} />
      <Arcade />
      {UNITS.map((i) => <Unit key={i} i={i} f={f} />)}
      <Coin f={f} />
    </AbsoluteFill>
  );
}

registerRoot(() => <Composition id="s1" component={Shot} width={1080} height={1920} fps={FPS} durationInFrames={102} />);
