// EX00V16 style test (user 2026-11-07: "test it with raea, we want to measure the capability"): one taman street corner
// (a 99 Speedmart shophouse row next to terrace houses), lit and coloured two ways:
//   iso   — ref 3: white world, one colour (green), orthographic iso camera, tiny people, a dashboard standing in the city
//   warm  — ref 2: warm-white miniature town, terracotta roads/roofs/trees, low golden sun, long shadows, depth of field
// One still each (frame 0) plus a slow camera drift so motion can be judged later.
import { AbsoluteFill, Composition, registerRoot, staticFile, useCurrentFrame } from "raea";
import { AmbientOcclusion, Bloom, Grade, ImagePlane, Look as PaintLook, Model, ToneMapping, manifold, type Solid, DepthOfField } from "raea/3d";
import { Cuboid, Cylinder, Mesh3d, Sphere } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { AmbientLight, DirectionalLight } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
import { Shadows } from "raea/light";

type Look = "iso" | "warm" | "flat";
const PAL = {
  iso: { bg: "#EEF0F4", ground: "#F4F5F7", road: "#E2E5EA", mark: "#FFFFFF", wall: "#F7F8FA", trim: "#E6E9EE", roof: "#ECEEF2", glass: "#C9D2DE",
    tree: "#57D100", trunk: "#DADDE3", car: "#F5F6F8", carAccent: "#57D100", person: ["#57D100", "#2C2F36", "#9AA1AC"], kerb: "#FFFFFF" },
  warm: { bg: "#F0E6DA", ground: "#F4EEE6", road: "#C8634A", mark: "#F4E9DC", wall: "#F3ECE2", trim: "#E8DCCD", roof: "#C65D45", glass: "#8C9BA8",
    tree: "#D9663F", trunk: "#EADFD2", car: "#F3ECE2", carAccent: "#C65D45", person: ["#C65D45", "#3A3330", "#EADFD2"], kerb: "#F6EFE6" },
  // ref 1 (illustrated): indigo / lilac / peach / coral, cream paper
  flat: { bg: "#B9A7E0", ground: "#8F86C9", road: "#6E62B8", mark: "#F6E7D8", wall: "#F6E7D8", trim: "#C9B9EE", roof: "#E57C5A", glass: "#5A4FA0",
    tree: "#5FA9A4", trunk: "#3C3A7A", car: "#F6E7D8", carAccent: "#E57C5A", person: ["#E57C5A", "#3C3A7A", "#5FA9A4"], kerb: "#A79BD9" },
};

// ---------- solids (built once) ----------
let S: Record<string, Solid> | null = null;
const solid = () => (S ??= (() => {
  const unitW = 6, depth = 13, h = 8.2;
  // a two-storey shophouse unit: body, recessed five-foot-way arcade, upper windows, parapet, rooftop tank
  const body = manifold.box(unitW, h, depth).move(0, h / 2, -depth / 2);
  const arcade = manifold.box(unitW - 0.6, 3.6, 2.2).move(0, 1.8, -1.1);
  const cols = manifold.union(...[-unitW / 2 + 0.3, unitW / 2 - 0.3].map((x) => manifold.box(0.45, 3.6, 0.45).move(x, 1.8, -0.25)));
  const winCut = manifold.union(...[-1.6, 0, 1.6].map((x) => manifold.box(1.1, 1.9, 0.6).move(x, 5.6, 0.0)));
  const parapet = manifold.box(unitW, 0.7, 0.35).move(0, h + 0.35, -0.18);
  const unit = body.minus(arcade).minus(winCut).union(cols).union(parapet);
  // terrace house: box + gable roof (hull of two ridges) + porch canopy
  const hw = 5, hd = 9, hh = 3.4;
  const house = manifold.box(hw - 0.2, hh, hd).move(0, hh / 2, -hd / 2).minus(manifold.union(...[-1.2, 1.2].map((x) => manifold.box(1.0, 1.3, 0.4).move(x, 2.0, 0))));
  const roof = manifold.hull(
    [[-hw / 2, hh, 0.4], [hw / 2, hh, 0.4], [-hw / 2, hh, -hd - 0.4], [hw / 2, hh, -hd - 0.4], [-hw / 2, hh + 2.2, -hd / 2], [hw / 2, hh + 2.2, -hd / 2]] as any);
  const tank = manifold.cylinder(0.7, 1.2).rotate(-90, 0, 0);
  return {
    unit, house, roof, tank,
    porch: manifold.box(hw - 0.4, 0.15, 1.6).move(0, 2.7, 0.8),
    fence: manifold.union(...Array.from({ length: 9 }, (_, i) => manifold.box(0.08, 0.9, 0.08).move(-2.2 + i * 0.55, 0.45, 2.6)), manifold.box(4.6, 0.08, 0.08).move(0, 0.8, 2.6)),
    fascia: manifold.box(unitW, 0.9, 0.25),
    cone: manifold.cone(1.0, 0, 3.4).rotate(-90, 0, 0),
    ball: manifold.sphere(1.1, 7),
    blob: manifold.sphere(1.25, 9).scale(1, 0.85, 1),
    lampPole: manifold.cylinder(0.08, 6).rotate(-90, 0, 0).union(manifold.box(1.6, 0.12, 0.2).move(0.75, 6, 0)),
    ac: manifold.box(0.9, 0.6, 0.6),
  };
})());

const M = (look: Look, key: keyof typeof PAL.iso, rough = 0.85) => <StandardMaterial base_color={(PAL[look] as any)[key]} perceptual_roughness={rough} />;
const T = (x: number, y: number, z: number, ry = 0) => Transform.fromXyz(x, y, z).withRotation(Quat.fromEuler("XYZ", 0, ry, 0));

function Street({ look, ox = 0, oz = 0, id = "" }: { look: Look; ox?: number; oz?: number; id?: string }) {
  const s = solid(), P = PAL[look];
  const parts: any[] = [];
  const T = (x: number, y: number, z: number, ry = 0) => Transform.fromXyz(x + ox, y, z + oz).withRotation(Quat.fromEuler("XYZ", 0, ry, 0));
  // ground blocks (raised pavements) and roads
  parts.push(<Mesh3d key="roadX" transform={T(0, 0.01, 0)}><Cuboid half_size={[120, 0.02, 4]} />{M(look, "road", 0.9)}</Mesh3d>);
  parts.push(<Mesh3d key="roadZ" transform={T(0, 0.012, -40)}><Cuboid half_size={[4, 0.02, 36]} />{M(look, "road", 0.9)}</Mesh3d>);
  for (const [cx, cz, hx, hz] of [[34, -30, 29.6, 25.6], [-34, -30, 29.6, 25.6], [0, 30, 120, 25.6]] as number[][])
    parts.push(<Mesh3d key={`blk${cx}${cz}`} transform={T(cx, 0.1, cz)}><Cuboid half_size={[hx, 0.1, hz]} />{M(look, "kerb")}</Mesh3d>);
  for (let i = -12; i <= 12; i++) parts.push(<Mesh3d key={`dx${i}`} transform={T(i * 4 + 2, 0.035, 0)}><Cuboid half_size={[1.1, 0.01, 0.12]} />{M(look, "mark")}</Mesh3d>);
  for (let i = 0; i < 8; i++) parts.push(<Mesh3d key={`dz${i}`} transform={T(0, 0.036, -7 - i * 4)}><Cuboid half_size={[0.12, 0.01, 1.1]} />{M(look, "mark")}</Mesh3d>);
  for (let i = 0; i < 6; i++) parts.push(<Mesh3d key={`zeb${i}`} transform={T(-2.5 + i, 0.036, -5.5)}><Cuboid half_size={[0.3, 0.01, 1.2]} />{M(look, "mark")}</Mesh3d>);
  // the shophouse row (back-right block), the corner unit is 99 Speedmart
  for (let u = 0; u < 4; u++) {
    const x = 8 + u * 6;
    parts.push(<Mesh3d key={`unit${u}`} transform={T(x, 0.2, -6)} shape={s.unit}>{M(look, "wall")}</Mesh3d>);
    parts.push(<Mesh3d key={`fascia${u}`} transform={T(x, 4.05, -6.05)} shape={s.fascia}><StandardMaterial base_color={u === 0 && id === "" ? "#0E7A3B" : P.trim} perceptual_roughness={0.6} /></Mesh3d>);
    if (u === 0 && id === "") parts.push(<Mesh3d key="stripe" transform={T(x, 3.55, -5.95)}><Cuboid half_size={[3, 0.09, 0.14]} /><StandardMaterial base_color="#FFD200" perceptual_roughness={0.5} /></Mesh3d>);
    parts.push(<Mesh3d key={`tank${u}`} transform={T(x - 1.4, 8.4, -14)} shape={s.tank}>{M(look, "trim")}</Mesh3d>);
    parts.push(<Mesh3d key={`ac${u}`} transform={T(x + 1.6, 8.7, -10)} shape={s.ac}>{M(look, "trim")}</Mesh3d>);
    for (const wx of [-1.6, 0, 1.6]) parts.push(<Mesh3d key={`gl${u}${wx}`} transform={T(x + wx, 5.6, -6.25)}><Cuboid half_size={[0.55, 0.95, 0.02]} />{M(look, "glass", 0.25)}</Mesh3d>);
  }
  parts.push(id === "" ? <ImagePlane key="logo" src={staticFile("logo99.png")} width={4.6} position={[8 + ox, 4.05, -5.9 + oz]} /> : null);
  // terrace houses (back-left block) with porches and fences
  for (let u = 0; u < 5; u++) {
    const x = -8 - u * 5;
    parts.push(<Mesh3d key={`h${u}`} transform={T(x, 0.2, -8)} shape={s.house}>{M(look, "wall")}</Mesh3d>);
    parts.push(<Mesh3d key={`r${u}`} transform={T(x, 0.2, -8)} shape={s.roof}>{M(look, "roof", 0.7)}</Mesh3d>);
    parts.push(<Mesh3d key={`p${u}`} transform={T(x, 0.2, -8)} shape={s.porch}>{M(look, "trim")}</Mesh3d>);
    parts.push(<Mesh3d key={`f${u}`} transform={T(x, 0.2, -8)} shape={s.fence}>{M(look, "trim")}</Mesh3d>);
  }
  // front block: more houses facing the road (turned around)
  for (let u = 0; u < 6; u++) {
    const x = -14 + u * 5;
    parts.push(<Mesh3d key={`hf${u}`} transform={T(x, 0.2, 9, Math.PI)} shape={s.house}>{M(look, "wall")}</Mesh3d>);
    parts.push(<Mesh3d key={`rf${u}`} transform={T(x, 0.2, 9, Math.PI)} shape={s.roof}>{M(look, "roof", 0.7)}</Mesh3d>);
  }
  // trees: cones, balls and blobs along the pavements (ref 2's shapes; ref 3's colour accents)
  const trees = [[-4.8, -6], [5.2, -5.3], [30, -5.3], [-30, -5.6], [-18, 5.4], [12, 5.4], [26, 5.4], [-5.5, -20], [5.5, -26], [-5.5, -32], [40, -5.3]];
  trees.forEach(([x, z], i) => {
    const kind = i % 3, y = kind === 0 ? 1.9 : 2.6;
    parts.push(<Mesh3d key={`tt${i}`} transform={T(x, 0.9, z)}><Cylinder radius={0.12} half_height={0.9} />{M(look, "trunk")}</Mesh3d>);
    parts.push(<Mesh3d key={`tc${i}`} transform={T(x, kind === 0 ? 1.0 : y, z)} shape={kind === 0 ? s.cone : kind === 1 ? s.ball : s.blob}>{M(look, "tree", 0.7)}</Mesh3d>);
  });
  // street lights
  [[-6, -4.6], [16, -4.6], [-20, 4.6], [6, 4.6], [-4.6, -18]].forEach(([x, z], i) =>
    parts.push(<Mesh3d key={`lp${i}`} transform={T(x, 0.2, z, z > 0 ? Math.PI : 0)} shape={s.lampPole}>{M(look, "trim", 0.5)}</Mesh3d>));
  // cars (Quaternius, CC0), recoloured to the palette
  [[-14, -2, Math.PI / 2], [10, 2, -Math.PI / 2], [26, -2, Math.PI / 2], [-2, -18, 0], [2, -30, Math.PI]].forEach(([x, z, r], i) =>
    parts.push(<Model key={`car${i}`} src={staticFile("car_b.glb")} position={[x + ox, 0.05, z + oz]} rotation={[0, r, 0]}>
      <StandardMaterial material="Blue" base_color={i % 2 ? P.carAccent : P.car} perceptual_roughness={0.5} />
      <StandardMaterial material="Grey" base_color={P.trim} />
    </Model>));
  // tiny people (ref 3): a body and a head
  for (let i = 0; i < 14; i++) {
    const x = -20 + ((i * 37) % 46), z = i % 2 ? -4.8 - (i % 3) * 0.4 : 4.9 + (i % 3) * 0.4, c = P.person[i % 3];
    parts.push(<Mesh3d key={`pb${i}`} transform={T(x, 0.75, z)}><Cylinder radius={0.18} half_height={0.45} /><StandardMaterial base_color={c} perceptual_roughness={0.7} /></Mesh3d>);
    parts.push(<Mesh3d key={`ph${i}`} transform={T(x, 1.38, z)}><Sphere radius={0.15} /><StandardMaterial base_color={c} perceptual_roughness={0.7} /></Mesh3d>);
  }
  return <>{parts.map((p: any) => p && { ...p, key: id + p.key })}</>;
}

function Scene({ look }: { look: Look }) {
  const f = useCurrentFrame(), P = PAL[look], dx = f * 0.02;
  const target: [number, number, number] = [4 + dx, 2.5, -8];
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      {look === "flat" ? <>
        <Camera3d transform={Transform.fromXyz(-9 + dx, 3.2, 2.5).lookingAt([10 + dx, 4.6, -7])} projection={{ Perspective: { fov: 1.0 } }} />
        <PaintLook mode="paint" bands={3} shadow="#5B4F9A" mid="#C99BB8" grain={0.35} rag={1.4} sky={["#9C8AD6", "#F4C3A0"]}
          palette={["#3C3A7A", "#5B4F9A", "#6E62B8", "#8F86C9", "#A79BD9", "#C9B9EE", "#F6E7D8", "#F4C3A0", "#F2B48E", "#E57C5A", "#C95F48", "#5FA9A4", "#2E7D6B", "#0E7A3B", "#FFD200", "#FFFFFF"]} />
        <DirectionalLight transform={Transform.fromXyz(-40, 30, 30).lookingAt([0, 0, 0])} illuminance={9600} shadow_maps_enabled />
        <Shadows distance={80} firstCascade={60} cascades={1} mapSize={4096} />
      </> : look === "iso" ? <>
        <Camera3d transform={Transform.fromXyz(4 + dx + 40, 2.5 + 38, -8 + 40).lookingAt(target)}
          projection={{ Orthographic: { scaling_mode: { FixedVertical: { viewport_height: 62 } } } }} />
        <ToneMapping mode="agx" exposure={0.85} />
        <Grade midtones={{ contrast: 1.18 }} />
        <AmbientLight brightness={700} color="#DCE6F5" />
        <DirectionalLight transform={Transform.fromXyz(25, 60, 35).lookingAt([0, 0, 0])} illuminance={6500} color="#FFFFFF" soft_shadow_size={3.5} shadow_maps_enabled />
      </> : <>
        <Camera3d transform={Transform.fromXyz(4 + dx + 44, 2.5 + 38, -8 + 50).lookingAt(target)} projection={{ Perspective: { fov: 0.62 } }}>
          <DepthOfField focal_distance={73} aperture_f_stops={0.9} />
        </Camera3d>
        <ToneMapping mode="agx" exposure={0.7} />
        <Grade temperature={0.04} midtones={{ contrast: 1.05 }} />
        <AmbientLight brightness={520} color="#C9D6EC" />
        <DirectionalLight transform={Transform.fromXyz(-55, 22, 25).lookingAt([0, 0, 0])} illuminance={9000} color="#FFE2C2" soft_shadow_size={1.4} shadow_maps_enabled />
      </>}
      {look !== "flat" && <><Shadows distance={140} firstCascade={40} mapSize={4096} bias={0.2} /><AmbientOcclusion quality="high" /><Bloom intensity={0.2} threshold={0.95} /></>}
      <Mesh3d transform={Transform.fromXyz(0, -0.05, 0)}><Cuboid half_size={[400, 0.05, 400]} /><StandardMaterial base_color={P.ground} perceptual_roughness={0.85} /></Mesh3d>
      {[[0, 0], [-80, 0], [80, 0], [0, -76], [-80, -76], [80, -76], [0, 76], [-80, 76], [80, 76], [160, 0], [160, -76], [-160, -76]].map(([ox, oz], i) =>
        <Street key={i} look={look} ox={ox} oz={oz} id={i === 0 ? "" : `t${i}-`} />)}
      {look === "flat" && <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        {[0, 1, 2].map((i) => <polygon key={i} points={`${-200 + i * 260},0 ${40 + i * 260},0 ${760 + i * 200},1920 ${420 + i * 200},1920`} fill="#FFF3E6" opacity={0.07 + 0.03 * Math.sin(f / 30 + i)} />)}
        {[120, 190, 270].map((r, i) => <circle key={i} cx={240} cy={330} r={r} fill="none" stroke="#FFF3E6" strokeWidth={10 - i * 3} opacity={0.12} />)}
      </svg>}
      {look === "iso" && <ImagePlane src={staticFile("dashboard.png")} width={13} position={[-14, 9, -24]} rotation={[0, Math.PI / 4, 0]} unlit />}
    </AbsoluteFill>
  );
}

const Iso = () => <Scene look="iso" />;
const Warm = () => <Scene look="warm" />;
const Flat = () => <Scene look="flat" />;
registerRoot(() => <>
  <Composition id="iso" component={Iso} width={1080} height={1920} fps={30} durationInFrames={90} />
  <Composition id="warm" component={Warm} width={1080} height={1920} fps={30} durationInFrames={90} />
  <Composition id="flat" component={Flat} width={1080} height={1920} fps={30} durationInFrames={90} />
</>);
