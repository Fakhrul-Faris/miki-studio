// MKG-05 test shot S7 (~4 s): "And every commission adds up… on its own." A salon reception counter, the owner's laptop; the
// camera pushes into its screen and dives into the commission page, where each staff row fills and the total counts to RM 420.
// Placeholder UI (MKG-04 numbers) until the user's screen recording arrives. Compositions: film (9:16), screen (the laptop texture).
import { AbsoluteFill, Composition, registerRoot, staticFile, useCurrentFrame } from "raea";
import { AmbientOcclusion, Entity, Model } from "raea/3d";
import { Cuboid, Cylinder, Mesh3d } from "raea/mesh";
import { StandardMaterial } from "raea/pbr";
import { AmbientLight, Environment, PointLight, RectLight, SpotLight } from "raea/light";
import { Quat, Transform } from "raea/transform";
import { Camera3d } from "raea/camera";
import { Bloom, DepthOfField, MotionBlur, ToneMapping } from "raea/post_process";
import { Affine2 } from "raea/math";

const S = (p: string) => staticFile(p);
const FPS = 30, DUR = 4.2;
let T = 0;
const cl = (x: number) => Math.max(0, Math.min(1, x));
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
const ss = (t: number, a: number, b: number) => { const u = cl((t - a) / (b - a)); return u * u * (3 - 2 * u); };
const eo = (x: number) => 1 - Math.pow(1 - cl(x), 5);                     // strong ease-out ≈ cubic-bezier(0.23, 1, 0.32, 1)
const ei = (x: number) => Math.pow(cl(x), 2.4);                           // ease-in for the dive (it accelerates into the glass)
const on = (t: number, d = 0.35) => eo((T - t) / d);
const FACE = `@font-face { font-family: "Public Sans"; src: url(${S("fonts/PublicSans.ttf")}); font-weight: 100 900; }`;

// ---------- brand + the commission page (one design, drawn twice: the laptop texture and the full-frame UI) ----------
const GREEN = "#38CE87", GDEEP = "#1F9E62", INKC = "#14201A", MUTED = "#66736C", SURF = "#F4F6F3", LINE = "#E3E8E4";
const PS = "'Public Sans', Arial, sans-serif", TAB = { fontVariantNumeric: "tabular-nums" } as const;
const STAFF = [["AM", "Aiman", "Barber", 7, 140], ["RJ", "Raj", "Barber", 5, 105], ["WL", "Wei Ling", "Stylist", 6, 175]] as [string, string, string, number, number][];
const t0 = 1.55;                                                          // the page's own clock starts as the dive lands
function Page({ live }: { live: boolean }) {
  const row = (i: number) => (live ? on(t0 + i * 0.28, 0.4) : 0), cnt = (i: number) => (live ? eo((T - (t0 + 0.15 + i * 0.28)) / 0.75) : 0);
  const totU = live ? eo((T - (t0 + 0.75)) / 0.8) : 0, flood = live ? eo((T - (t0 + 1.55)) / 0.45) : 0;
  const total = 420 * totU;
  return (<div style={{ width: 1080, height: 1920, background: SURF, fontFamily: PS, color: INKC, boxSizing: "border-box", padding: "380px 70px 0" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 22 }}><img src={S("meikigo-logo.png")} style={{ height: 70 }} /><span style={{ fontSize: 34, fontWeight: 600, color: MUTED }}>Demo Salon</span></div>
    <div style={{ fontSize: 86, fontWeight: 800, letterSpacing: -2, marginTop: 50 }}>Commission</div>
    <div style={{ fontSize: 36, color: MUTED, marginTop: 6 }}>Today · 3 staff</div>
    <div style={{ marginTop: 50, background: "#fff", borderRadius: 40, padding: "16px 44px", boxShadow: "0 2px 0 rgba(20,32,26,0.04), 0 20px 50px rgba(20,32,26,0.07)" }}>
      {STAFF.map(([ini, name, role, svc, rm], i) => { const v = live ? row(i) : 1, c = cnt(i);
        return (<div key={i} style={{ padding: "34px 0", borderTop: i ? `2px solid ${LINE}` : "none", opacity: live ? 0.25 + 0.75 * v : 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <div style={{ width: 96, height: 96, borderRadius: 48, background: "#E2F7EC", color: GDEEP, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 800 }}>{ini}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 46, fontWeight: 700 }}>{name}</div><div style={{ fontSize: 32, color: MUTED, marginTop: 2 }}>{role} · {live ? Math.round(svc * c) : 0} services</div></div>
            <div style={{ fontSize: 50, fontWeight: 800, ...TAB }}>RM {live ? Math.round(rm * c) : 0}</div>
          </div>
          <div style={{ marginTop: 26, height: 16, borderRadius: 8, background: "#EEF2EF", overflow: "hidden" }}>
            <div style={{ width: `${(live ? c : 0) * (rm / 175) * 100}%`, height: 16, borderRadius: 8, background: GREEN }} /></div>
        </div>); })}
    </div>
    <div style={{ position: "relative", marginTop: 40, borderRadius: 40, overflow: "hidden", background: "#fff", padding: "44px 44px", boxShadow: "0 20px 50px rgba(20,32,26,0.07)" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${flood * 100}%`, background: GREEN }} />
      <div style={{ position: "relative", fontSize: 38, fontWeight: 600, color: flood > 0.5 ? "#0E3A25" : MUTED }}>Total commission today</div>
      <div style={{ position: "relative", fontSize: 150, fontWeight: 800, letterSpacing: -4, lineHeight: 1.1, color: flood > 0.5 ? "#fff" : INKC, ...TAB }}>RM {Math.round(total)}</div>
    </div>
  </div>);
}
// the laptop's screen: a desktop dashboard with the same page as its centre column (so the dive lands on the same layout)
function Screen() {
  T = 0;
  return (<AbsoluteFill style={{ background: "#E9EDEA", fontFamily: PS }}><style>{FACE}</style>
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 300, background: INKC, padding: 40, boxSizing: "border-box" }}>
      <img src={S("meikigo-logo.png")} style={{ height: 60, filter: "brightness(1.1)" }} />
      {["Bookings", "Queue", "Commission", "Staff", "Reports"].map((m, i) => <div key={m} style={{ marginTop: i ? 18 : 60, padding: "16px 20px", borderRadius: 14, fontSize: 30, fontWeight: 600, color: i === 2 ? INKC : "#c9d3cd", background: i === 2 ? GREEN : "transparent" }}>{m}</div>)}
    </div>
    <div style={{ position: "absolute", left: 300 + (1300 - 563) / 2, top: 0, width: 1080, height: 1920, transformOrigin: "0 0", transform: "scale(0.521)" }}><Page live={false} /></div>
  </AbsoluteFill>);
}

// ---------- the set: a salon reception counter, the laptop, a notebook, a plant ----------
const HINGE = [0, 0.927, -0.108], TILT = -0.35;                         // the lid leans back ~20° past vertical
const UP = [0, Math.cos(TILT), Math.sin(TILT)], NRM = [0, -Math.sin(TILT), Math.cos(TILT)];
const SC = [HINGE[0], HINGE[1] + UP[1] * 0.107 + NRM[1] * 0.0046, HINGE[2] + UP[2] * 0.107 + NRM[2] * 0.0046];   // screen centre (world)
const alu = (c = "#c8cbd0") => <StandardMaterial base_color={c} metallic={0.9} perceptual_roughness={0.32} />;
function World() {
  return (<>
    <Mesh3d transform={Transform.fromXyz(0, 0.9, 0)}><Cuboid half_size={[1.1, 0.02, 0.45]} />
      <StandardMaterial base_color="#ffffff" base_color_texture={S("tex/wood_diff.jpg")} normal_map_texture={S("tex/wood_nor.jpg")} uv_transform={Affine2.fromScale([3, 1.2])} perceptual_roughness={0.55} /></Mesh3d>
    <Mesh3d transform={Transform.fromXyz(0, 0.45, 0.05)}><Cuboid half_size={[1.08, 0.43, 0.4]} /><StandardMaterial base_color="#e9e4dc" normal_map_texture={S("tex/plaster_nor.jpg")} perceptual_roughness={0.85} /></Mesh3d>
    <Mesh3d transform={Transform.fromXyz(0, 1.5, -1.3)}><Cuboid half_size={[3, 1.5, 0.02]} /><StandardMaterial base_color="#2c3a33" perceptual_roughness={0.9} /></Mesh3d>
    <Mesh3d transform={Transform.fromXyz(0, -0.01, 0)}><Cuboid half_size={[4, 0.01, 4]} /><StandardMaterial base_color="#1b1f1d" perceptual_roughness={0.7} /></Mesh3d>
    {/* the laptop */}
    <Mesh3d transform={Transform.fromXyz(0, 0.927, 0)}><Cuboid half_size={[0.155, 0.007, 0.108]} />{alu()}</Mesh3d>
    <Mesh3d transform={Transform.fromXyz(0, 0.9342, 0.02)}><Cuboid half_size={[0.135, 0.0004, 0.055]} /><StandardMaterial base_color="#202326" perceptual_roughness={0.6} /></Mesh3d>
    <Mesh3d transform={Transform.fromXyz(0, 0.9342, 0.09)}><Cuboid half_size={[0.05, 0.0004, 0.014]} /><StandardMaterial base_color="#b7bbc0" metallic={0.8} perceptual_roughness={0.25} /></Mesh3d>
    <Entity transform={Transform.fromXyz(HINGE[0], HINGE[1], HINGE[2]).withRotation(Quat.fromEuler("XYZ", TILT, 0, 0))}>
      <Mesh3d transform={Transform.fromXyz(0, 0.105, 0)}><Cuboid half_size={[0.155, 0.105, 0.004]} />{alu()}</Mesh3d>
      <Mesh3d transform={Transform.fromXyz(0, 0.107, 0.0042)}><Cuboid half_size={[0.149, 0.097, 0.0004]} /><StandardMaterial base_color="#0c0d0e" perceptual_roughness={0.15} /></Mesh3d>
      <Mesh3d transform={Transform.fromXyz(0, 0.108, 0.0047)}><Cuboid half_size={[0.142, 0.0888, 0.0002]} />
        <StandardMaterial base_color_texture={S("screen.png")} emissive_texture={S("screen.png")} emissive="#ffffff" unlit /></Mesh3d>
    </Entity>
    {/* the booking notebook it replaced, closed; a pen; a plant in the bokeh */}
    <Mesh3d transform={Transform.fromXyz(-0.33, 0.926, 0.06).withRotation(Quat.fromEuler("XYZ", 0, 0.35, 0))}><Cuboid half_size={[0.075, 0.006, 0.105]} /><StandardMaterial base_color="#7a2f2a" perceptual_roughness={0.7} /></Mesh3d>
    <Mesh3d transform={Transform.fromXyz(-0.28, 0.934, 0.1).withRotation(Quat.fromEuler("XYZ", 0, 0.9, Math.PI / 2))}><Cylinder radius={0.0045} half_height={0.07} /><StandardMaterial base_color="#1d2a4a" perceptual_roughness={0.3} /></Mesh3d>
    <Model src={S("potted_plant_01/potted_plant_01.gltf")} position={[0.55, 0.92, -0.25]} scale={[1.1, 1.1, 1.1]} />
    <SpotLight transform={Transform.fromXyz(-0.6, 1.9, 0.8).lookingAt([0, 0.95, 0])} intensity={60000} outer_angle={0.6} inner_angle={0.25} color="#ffe0b8" shadow_maps_enabled range={5} />
    <RectLight transform={Transform.fromXyz(0.9, 1.4, -0.6).lookingAt([0, 1, 0])} intensity={20000} width={1.2} height={0.6} color="#b8d6ff" range={4} />
    <PointLight transform={Transform.fromXyz(0.4, 1.3, -0.9)} intensity={3000} color="#7fe0b0" range={2} />
    <AmbientLight brightness={40} color="#c9d4cf" />
    <Environment src={S("sky.hdr")} intensity={0.2} />
  </>);
}

// ---------- camera: a 3/4 push past the counter that accelerates into the glass ----------
function cam() {
  const u = ss(T, 0, 1.45), d = ei(T / 1.45);
  const A = [0.34, 1.16, 0.62], far = [SC[0] + NRM[0] * 0.42, SC[1] + NRM[1] * 0.42, SC[2] + NRM[2] * 0.42], B = [SC[0] + NRM[0] * 0.06, SC[1] + NRM[1] * 0.06, SC[2] + NRM[2] * 0.06];
  const mid = [lerp(A[0], far[0], u), lerp(A[1], far[1], u), lerp(A[2], far[2], u)];
  const p = [lerp(mid[0], B[0], d), lerp(mid[1], B[1], d), lerp(mid[2], B[2], d)];
  return { p, l: [SC[0], lerp(SC[1] - 0.03, SC[1], u), SC[2]] };
}
// ---------- the caption (word by word, the house look: white panel text, the key word boxed) ----------
const WORDS: [string, number, boolean?][] = [["And", 0.15], ["every", 0.32], ["commission", 0.55, true], ["adds", 1.35], ["up…", 1.55], ["on", 2.35], ["its", 2.5], ["own.", 2.65, true]];
function Caption() {
  return (<div style={{ position: "absolute", left: 70, right: 70, top: 130, textAlign: "center", fontFamily: PS, fontSize: 54, lineHeight: 1.3, padding: "22px 26px", borderRadius: 28, background: `rgba(14,22,18,${0.82 * on(0.1, 0.25)})` }}>
    {WORDS.map(([w, t, key], i) => { const v = on(t, 0.18); return <span key={i} style={{ display: "inline-block", marginRight: 16, opacity: v, fontWeight: key ? 800 : 500, color: "#fff",
      padding: key ? "0 10px" : 0, borderRadius: 8, background: key ? `rgba(31,158,98,${0.95 * v})` : "transparent", textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}>{w}</span>; })}
  </div>);
}
function Film() {
  T = useCurrentFrame() / FPS;
  const c = cam(), dive = eo((T - 1.2) / 0.35);                          // the UI takes over as the camera hits the glass
  const ui = dive > 0.001, k = lerp(0.62, 1, dive), sec = ss(T, 2.6, 4.2); // second framing: drift toward the total
  return (<AbsoluteFill style={{ background: "#0d100e" }}><style>{FACE}</style>
    <Camera3d transform={Transform.fromXyz(c.p[0], c.p[1], c.p[2]).lookingAt(c.l as any)} projection={{ Perspective: { fov: (34 * Math.PI) / 180 } }}>
      <DepthOfField focal_distance={Math.hypot(c.p[0] - SC[0], c.p[1] - SC[1], c.p[2] - SC[2])} aperture_f_stops={2.8} mode="Gaussian" />
    </Camera3d>
    <MotionBlur shutterAngle={1} samples={6} />
    <Bloom intensity={0.25} threshold={1} />
    <AmbientOcclusion quality="high" />
    <ToneMapping mode="agx" exposure={1.25} />
    <World />
    {ui ? <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, overflow: "hidden", opacity: dive, filter: `blur(${(1 - dive) * 12}px)` }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, transformOrigin: "540px 1560px", transform: `scale(${k * (1 + 0.06 * sec)})` }}><Page live /></div>
    </div> : null}
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 420, background: "linear-gradient(rgba(0,0,0,0.55), transparent)", opacity: 1 - 0.6 * dive }} />
    <Caption />
  </AbsoluteFill>);
}
registerRoot(() => <><Composition id="film" component={Film} width={1080} height={1920} fps={FPS} durationInFrames={Math.round(DUR * FPS)} />
  <Composition id="screen" component={Screen} width={1600} height={1000} fps={FPS} durationInFrames={1} /></>);
